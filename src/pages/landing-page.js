import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

import Layout from '../components/layout';
import Typography from '../components/typography';
import DataFilter from '../components/data-filter';
import LineChart from '../components/line-chart';
import Table from '../components/table';

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

// const BaseURI = `http://127.0.0.1:5555`;
// backend
const BaseURI = `https://lucky-neat-bamboo.glitch.me`;

const LineChartMemoized = React.memo(LineChart);

function LandingPage() {
  const [selector, setSelector] = React.useState('daily');
  const [chartRawData, setChartRawData] = React.useState([]);
  const [tableRawData, setTableRawData] = React.useState([]);
  // eslint-disable-next-line no-unused-vars
  const [range, setRange] = React.useState({ startDate: null, endDate: null });

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

    axios
      .get(`${BaseURI}/events/${selector}`, { params })
      .then(response => setChartRawData(response.data))
      .catch(err => console.error(err));
  }, [selector, range]);

  // table updates
  React.useEffect(() => {
    axios
      .get(`${BaseURI}/stats/daily`)
      .then(response => setTableRawData(response.data))
      .catch(err => console.error(err));
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

  // handler for selecting a date
  const handleDateRangeChanged = ({ startDate, endDate }) =>
    setRange({ startDate, endDate });

  // processes the raw data into labels and data
  let chartData = [],
    chartLabels = [];
  let tableData = [],
    tableLabels = [];

  // ...chart data processing
  switch (selector) {
    case 'daily':
      chartLabels = chartRawData.map(
        d => `${new Date(d.date).toLocaleDateString('en-US')}`
      );
      chartData = chartRawData.map(d => d.events);
      break;
    case 'hourly':
      chartLabels = chartRawData.map(d => `${d.hour}h`);
      chartData = chartRawData.map(d => d.events);
      break;
    default:
      break;
  }

  // ...table data processing
  if (tableRawData.length > 0) {
    tableLabels = Object.keys(tableRawData[0]).map(key => ({
      label: key.replace(/([A-Z])/g, ' $1'),
      key,
    }));
    tableData = tableRawData.map(item => [
      new Date(item.date).toLocaleDateString('en-US'),
      item.impressions,
      item.clicks,
      parseFloat(item.revenue).toFixed(2),
    ]);
  }

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
            selectors={[
              {
                label: 'Daily',
                value: 'daily',
              },
              {
                label: 'Hourly',
                value: 'hourly',
              },
            ]}
            selectorPressed={handleSelectorSelected}
            dateRange
            dateRangeUpdated={handleDateRangeChanged}
            selectsRange={selector === 'daily'}
          />
          <LineChartMemoized
            pointLabel={'# of Events:'}
            labels={chartLabels}
            data={chartData}
            color="green"
          />
        </Section>

        <Section>
          <Typography type="title" style={{ marginBottom: '1em' }}>
            Table Visualization
          </Typography>
          <DataFilter searchField searchFieldSubmit={() => {}} />
          <Table labels={tableLabels} data={tableData} />
        </Section>
      </Content>
    </Layout>
  );
}

export default LandingPage;
