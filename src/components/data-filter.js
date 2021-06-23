import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import { interval, Subject } from 'rxjs';
import { debounce } from 'rxjs/operators';
import 'react-datepicker/dist/react-datepicker.css';
import '@fontsource/roboto';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0.5em;
  justify-content: space-between;
`;

const ButtonGroup = styled.div`
  /* margin-right: 2em; */
  button:first-child {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
  button:last-child {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`;
const Button = styled.button`
  font-family: 'Roboto';
  font-weight: bold;
  padding: 1em;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  background: ${props =>
    props.active ? 'rgba(5, 150, 105, 0.8)' : 'transparent'};
  border: rgba(75, 85, 99, 0.15) 1px solid;
  color: rgba(0, 0, 0, 0.6);
  margin-left: -1px;
  transition: 0.2s;
  &:hover {
    border: rgba(5, 150, 105, 0.8) 1px solid;
    background: rgba(5, 150, 105, 0.8);
    color: rgba(255, 255, 255, 1);
  }
`;

const DateRange = styled.div``;
const DateRangeInput = styled.input`
  font-family: 'Roboto';
  font-weight: bold;
  padding: 1em;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  background: transparent;
  border: rgba(75, 85, 99, 0.15) 1px solid;
  color: rgba(0, 0, 0, 0.6);
  margin-left: -1px;
  transition: 0.3s;
  border-radius: 4px;
  &:hover,
  &:focus {
    border: rgba(5, 150, 105, 0.8) 1px solid;
  }
`;

const SearchField = styled.div`
  align-self: flex-end;
`;
const SearchFieldInput = styled(DateRangeInput)``;
const SearchFieldSubmitButton = styled(Button)`
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
`;

const subject = new Subject();
const DEBOUNCE_INTERVAL = 100;
// create a stream to debounce in case of many refreshes
const stream = subject.pipe(debounce(() => interval(DEBOUNCE_INTERVAL)));
stream.subscribe(f => f());

/**
 * Multi visualization widget to filter data
 */
function DataFilter({
  actualSelector,
  selectors = [],
  selectorPressed,
  dateRange = false,
  dateRangeUpdated,
  searchField = false,
  searchFieldSubmit,
  selectsRange = true,
}) {
  const [search, setSearch] = React.useState('');
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);

  // handler for date range filtering
  const onChangeDateRange = dates => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    if (end != null) dateRangeUpdated({ startDate: start, endDate: end });
  };

  // handler for single date filtering
  const onChangeDate = date => {
    setStartDate(date);
    dateRangeUpdated({ startDate: date, endDate: null });
  };

  // handler for selector pressed
  const handleSelectClick = evt => selectorPressed(evt.target.value);

  const buttons = selectors.map((selector, index) => {
    return (
      <Button
        key={index}
        onClick={handleSelectClick}
        value={selector.value}
        active={actualSelector === selector.value}
      >
        {selector.label}
      </Button>
    );
  });

  return (
    <Container>
      {selectors && <ButtonGroup>{buttons}</ButtonGroup>}
      {dateRange && (
        <DateRange>
          <DatePicker
            selected={startDate}
            onChange={selectsRange ? onChangeDateRange : onChangeDate}
            startDate={startDate}
            endDate={endDate}
            selectsRange={selectsRange}
            placeholderText={
              selectsRange ? 'Select a date range' : 'Select a date'
            }
            customInput={<DateRangeInput />}
          />
        </DateRange>
      )}
      {searchField && (
        <SearchField>
          <SearchFieldInput
            placeholder="Search by keyword..."
            onChange={evt =>
              subject.next(() => {
                searchFieldSubmit(evt.target.value);
              })
            }
          />
        </SearchField>
      )}
    </Container>
  );
}

DataFilter.propTypes = {
  actualSelector: PropTypes.string,
  selectors: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.any,
    })
  ),
  selectorPressed: PropTypes.func,
  dateRange: PropTypes.bool,
  dateRangeUpdated: PropTypes.func,
  searchField: PropTypes.bool,
  searchFieldSubmit: PropTypes.func,
  selectsRange: PropTypes.bool,
};

export default DataFilter;
