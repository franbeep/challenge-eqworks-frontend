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

const BaseURI = `${process.env.BACKEND}`;

function LandingPage() {
  const [selector, setSelector] = React.useState(null);
  const [chartRawData, setChartRawData] = React.useState([]);
  const [tableRawData, setTableRawData] = React.useState([]);
  // eslint-disable-next-line no-unused-vars
  const [range, setRange] = React.useState({ startDate: null, endDate: null });

  React.useEffect(() => {
    if (selector == null) return;

    async function updateData() {
      const data = await axios.get(`${BaseURI}/events/${selector}`);
      setChartRawData(data);
    }
    updateData();
  }, [selector]);

  React.useEffect(() => {
    async function updateData() {
      const data = await axios.get(`${BaseURI}/stats/daily`);
      setTableRawData(data);
    }
    updateData();
  }, []);

  const handleSelectorSelected = value => setSelector(value);

  const handleDateRangeChanged = ({ startDate, endDate }) =>
    setRange({ startDate, endDate });

  let chartData = [],
    chartLabels = [];
  let tableData = [],
    tableLabels = [];

  if (chartRawData.length > 0) {
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
  }

  if (tableRawData.length > 0) {
    tableLabels = Object.keys(tableRawData[0]).map(key => ({
      label: key.replace(/([A-Z])/g, ' $1'),
      key,
    }));
    tableLabels = tableRawData.map(item => [
      new Date(item.date).toLocaleDateString('en-US'),
      item.hour,
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
          />
          {/* LineChart */}
          <LineChart
            pointLabel={'# of Events:'}
            labels={chartLabels}
            data={chartData}
            color="green"
            // labels,
            // data: dataTwo,
            // color: 'indigo',
            // dashed: true,
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
