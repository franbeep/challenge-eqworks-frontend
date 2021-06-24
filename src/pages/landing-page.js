import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

import Layout from '../components/layout';
import Typography from '../components/typography';
import DataFilter from '../components/data-filter';
import LineChart from '../components/line-chart';
import Table, { placeholder } from '../components/table';
import GeoMap from '../components/geomap';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4em;
`;

const Section = styled.div`
  border-radius: 0.7em;
  background: white;
  padding: 0.5em 2em 1em 2em;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  width: ${props => (props.width ? props.width : 'inherit')};
  margin-bottom: 1em;
`;

// backend
const BaseURI = `https://lucky-neat-bamboo.glitch.me`;

// reducer for data management
const createReducer = postDataProcessing => {
  return (state, action) => {
    const newState = { ...state };

    switch (action.inst) {
      case 'set/raw':
        newState.raw = action.payload;
        break;
      case 'set/error':
        newState.error = action.payload;
        break;
      case 'set/orderBy':
        newState.orderBy = action.payload;
        break;
      case 'set/searchWith':
        newState.searchWith = action.payload;
        break;
      default:
        console.error('Invalid dispatch action');
        return;
    }

    newState.data = newState.raw
      .filter(newState.searchWith.filter)
      .sort(newState.orderBy.sort);

    return postDataProcessing(newState);
  };
};

// initial state
const initialState = {
  raw: [],
  labels: [],
  data: [],
  error: null,
  orderBy: { sort: (a, b) => (a > b ? 1 : -1), asc: 1 },
  searchWith: { filter: () => true },
};

// default selectors
const defaultSelectors = [
  {
    label: 'Daily',
    value: 'daily',
  },
  {
    label: 'Hourly',
    value: 'hourly',
  },
];

/**
 * Landing Page Component to aggregate and show most or all developed components
 */
function LandingPage() {
  const [selector, setSelector] = React.useState('daily');
  const [range, setRange] = React.useState({ startDate: null, endDate: null });

  // chart state
  const [chartState, chartDispatch] = React.useReducer(
    createReducer(state => {
      // post processing data for chart component
      return {
        ...state,
        labels:
          selector === 'daily'
            ? state.data.map(
                d => `${new Date(d.date).toLocaleDateString('en-US')}`
              )
            : selector === 'hourly'
            ? state.data.map(d => `${d.hour}h`)
            : [],
        data: state.data.map(d => d.events),
      };
    }),
    {
      ...initialState,
      error: {
        status: 'Loading...',
      },
    }
  );

  // table state
  const [tableState, tableDispatch] = React.useReducer(
    createReducer(state => {
      // post processing data for table component

      const labels =
        state.raw.length > 0
          ? Object.keys(state.raw[0]).map(key => ({
              label: key.replace(/([A-Z])/g, ' $1'),
              key,
            }))
          : state.labels;

      const data =
        state.data.length > 0
          ? state.data.map(item => [
              // per field treatments here
              new Date(item.date).toLocaleDateString('en-US'),
              item.impressions,
              item.clicks,
              parseFloat(item.revenue).toFixed(2),
            ])
          : state.data;

      return {
        ...state,
        labels,
        data,
      };
    }),
    {
      ...initialState,
      labels: placeholder.labels,
      data: placeholder.data,
      error: {
        status: 'Loading...',
      },
    }
  );

  // geomap state
  const [geoMapState, geoMapDispatch] = React.useReducer(
    createReducer(state => state), // no post processing data treatment
    initialState
  );

  // chart updates
  React.useEffect(() => {
    if (selector == null) return;

    const params = {
      startDate: range.startDate
        ? range.startDate.toLocaleDateString('en-CA')
        : undefined,
      endDate: range.endDate
        ? range.endDate.toLocaleDateString('en-CA')
        : undefined,
    };

    // fetches new data
    axios
      .get(`${BaseURI}/events/${selector}`, { params })
      .then(response => {
        chartDispatch({ inst: 'set/raw', payload: response.data });
        chartDispatch({ inst: 'set/error', payload: null });
      })
      .catch(err => {
        if (!err.response)
          return chartDispatch({
            inst: 'set/error',
            payload: {
              status: 'Network Unreachable',
            },
          });
        const status = err.response.status;
        const message = err.response.data.message || err.response.statusText;
        chartDispatch({
          inst: 'set/error',
          payload: {
            status,
            message,
          },
        });
      });
  }, [selector, range]);

  // table updates
  React.useEffect(() => {
    // fetches new data
    axios
      .get(`${BaseURI}/stats/daily`)
      .then(response => {
        tableDispatch({ inst: 'set/raw', payload: response.data });
        tableDispatch({ inst: 'set/error', payload: null });
      })
      .catch(err => {
        if (!err.response)
          return tableDispatch({
            inst: 'set/error',
            payload: {
              status: 'Network Unreachable',
            },
          });
        const status = err.response.status;
        const message = err.response.data.message || err.response.statusText;
        tableDispatch({
          inst: 'set/error',
          payload: {
            status,
            message,
          },
        });
      });
  }, []);

  // geomap updates
  React.useEffect(() => {
    axios
      .get(`${BaseURI}/poi`)
      .then(response => {
        geoMapDispatch({ inst: 'set/raw', payload: response.data });
        geoMapDispatch({ inst: 'set/error', payload: null });
      })
      .catch(err => {
        if (!err.response)
          return geoMapDispatch({
            inst: 'set/error',
            payload: {
              status: 'Network Unreachable',
            },
          });
        const status = err.response.status;
        const message = err.response.data.message || err.response.statusText;
        geoMapDispatch({
          inst: 'set/error',
          payload: {
            status,
            message,
          },
        });
      });
  }, []);

  // handler for when selects a selector
  const handleSelectorSelected = value => {
    const initialDate = new Date('2017-01-05');

    setSelector(value);
    setRange({
      startDate: initialDate,
      endDate: null,
    });
  };

  // handler for filtering data by text search
  const handleTableSearch = searchText => {
    // filter by search text here
    tableDispatch({
      inst: 'set/searchWith',
      payload: {
        filter: el =>
          Object.values(el).some(field => field.includes(searchText)),
      },
    });
  };

  // handler for ordering data by column
  const handleTableOrderBy = columnName => {
    // order by column name here

    const dateSort = (a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      if (dateA > dateB) return 1 * tableState.orderBy.asc;
      else return -1 * tableState.orderBy.asc;
    };

    tableDispatch({
      inst: 'set/orderBy',
      payload: {
        sort:
          columnName === 'date'
            ? dateSort
            : (a, b) => {
                if (a[columnName] > b[columnName])
                  return 1 * tableState.orderBy.asc;
                else return -1 * tableState.orderBy.asc;
              },
        asc: tableState.orderBy.asc * -1,
      },
    });
  };

  // handler for selecting a date
  const handleDateRangeChanged = ({ startDate, endDate }) =>
    setRange({ startDate, endDate });

  return (
    <Layout>
      <Content>
        <Typography type="heading">EQ Works - Challenge! 🎉</Typography>

        <Section>
          <Typography type="title" style={{ marginBottom: '1em' }}>
            Chart Visualization
          </Typography>

          <DataFilter
            actualSelector={selector}
            selectors={defaultSelectors}
            selectorPressed={handleSelectorSelected}
            dateRange
            dateRangeUpdated={handleDateRangeChanged}
            selectsRange={selector === 'daily'}
          />
          <LineChart
            pointLabel={'# of Events:'}
            labels={chartState.labels}
            data={chartState.data}
            color="green"
            error={chartState.error}
          />
        </Section>

        <Section>
          <Typography type="title" style={{ marginBottom: '1em' }}>
            Table Visualization
          </Typography>
          <DataFilter searchField searchFieldSubmit={handleTableSearch} />
          <Table
            labels={tableState.labels}
            data={tableState.data}
            dispatchOrderBy={handleTableOrderBy}
            error={tableState.error}
          />
        </Section>

        <Section>
          <Typography type="title" style={{ marginBottom: '1em' }}>
            Geolocation Map Visualization
          </Typography>

          <GeoMap
            data={geoMapState.data}
            style={{ width: '100%', height: '500px' }}
          />
        </Section>
      </Content>
    </Layout>
  );
}

export default LandingPage;
