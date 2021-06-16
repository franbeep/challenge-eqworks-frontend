import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
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
  background: transparent;
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
  &:hover,
  &:focus {
    border: rgba(5, 150, 105, 0.8) 1px solid;
  }
`;

const SearchField = styled.div`
  align-self: flex-end;
`;
const SearchFieldInput = styled(DateRangeInput)``;
const SearchFieldSubmitButton = styled(Button)``;

function DataFilter({
  actualSelector,
  selectors = [],
  selectorPressed,
  dateRange = false,
  dateRangeUpdated,
  searchField = false,
  searchFieldSubmit,
}) {
  const [search, setSearch] = React.useState('');
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(null);
  const onChangeDate = dates => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    if (end != null) dateRangeUpdated({ startDate: start, endDate: end });
  };

  const handleSelectClick = evt => selectorPressed(evt.target.value);

  const buttons = selectors.map((selector, index) => {
    return (
      <Button
        key={index}
        onClick={handleSelectClick}
        value={selector.value}
        active={actualSelector == selector.value}
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
            onChange={onChangeDate}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            // inline
            customInput={<DateRangeInput />}
            // includeDates={[new Date(), addDays(new Date(), 1)]}
            // calendarClassName="rasta-stripes"
          />
        </DateRange>
      )}
      {searchField && (
        <SearchField>
          <SearchFieldInput
            value={search}
            onChange={evt => setSearch(evt.target.value)}
          />
          <SearchFieldSubmitButton onClick={() => searchFieldSubmit(search)}>
            Submit
          </SearchFieldSubmitButton>
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
};

export default DataFilter;
