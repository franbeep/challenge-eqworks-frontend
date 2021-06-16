import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import moment from 'moment';
import '@fontsource/roboto';

const Container = styled.table`
  padding: 1em;
  font-family: 'Roboto';
  width: 100%;
`;
const Header = styled.thead`
  //
  border-bottom: 1px solid;
`;
const HeaderData = styled.th`
  //
  border-bottom: rgba(5, 150, 105, 0.8) 2px solid;
  color: rgba(5, 150, 105, 0.8);
  /* padding: 1em 1em 0 1em; */
  min-width: 100px;
  padding: 0.3em 0.5em 0 0.5em;
  text-align: ${props => props.alignText};
  transition: 0.2s;
  &:hover {
    background-color: rgba(5, 150, 105, 0.2);
    /* color: white; */
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }
  &:first-letter {
    text-transform: capitalize;
  }
`;
const Body = styled.tbody`
  //
  color: rgba(0, 0, 0, 0.7);
  tr:nth-child(2n) {
    background-color: rgba(0, 0, 0, 0.02);
  }
  tr {
    transition: 0.2s;
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
`;
const Row = styled.tr`
  //
`;
const Data = styled.td`
  //
`;

/**
 * Table component for data visualization
 */
function Table({ labels, data }) {
  const header = labels.map((item, index) => (
    <HeaderData key={index} alignText="left">
      {item.label}
    </HeaderData>
  ));
  const rows = data.map((values, row) => (
    <Row key={row}>
      {values.map((value, data) => (
        <Data key={data}>{value}</Data>
      ))}
    </Row>
  ));

  return (
    <Container>
      <Header>
        <Row>{header}</Row>
      </Header>
      <Body>{rows}</Body>
    </Container>
  );
}

Table.propTypes = {
  labels: PropTypes.arrayOf(
    PropTypes.shape({ label: PropTypes.string, key: PropTypes.string })
  ),
  data: PropTypes.arrayOf(PropTypes.any),
};

export default Table;
