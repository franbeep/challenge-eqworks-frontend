import Table from './table';
// import moment from 'moment';

export default {
  title: 'Components/Table',
  component: Table,
};

const raw = [
  {
    date: '2017-01-01T05:00:00.000Z',
    hour: 0,
    impressions: 10746,
    clicks: 23,
    revenue: '64.9215630000000',
  },
  {
    date: '2017-01-01T05:00:00.000Z',
    hour: 1,
    impressions: 141397,
    clicks: 201,
    revenue: '696.4485960000000',
  },
  {
    date: '2017-01-01T05:00:00.000Z',
    hour: 2,
    impressions: 137464,
    clicks: 217,
    revenue: '732.0955030000000',
  },
  {
    date: '2017-01-01T05:00:00.000Z',
    hour: 3,
    impressions: 109217,
    clicks: 139,
    revenue: '496.6397510000000',
  },
  {
    date: '2017-01-01T05:00:00.000Z',
    hour: 4,
    impressions: 112129,
    clicks: 74,
    revenue: '446.7138830000000',
  },
  {
    date: '2017-01-01T05:00:00.000Z',
    hour: 5,
    impressions: 105182,
    clicks: 76,
    revenue: '435.9536840000000',
  },
  {
    date: '2017-01-01T05:00:00.000Z',
    hour: 6,
    impressions: 111925,
    clicks: 152,
    revenue: '519.1064970000000',
  },
  {
    date: '2017-01-01T05:00:00.000Z',
    hour: 7,
    impressions: 106769,
    clicks: 129,
    revenue: '483.0718670000000',
  },
  {
    date: '2017-01-01T05:00:00.000Z',
    hour: 8,
    impressions: 123464,
    clicks: 135,
    revenue: '561.3373030000000',
  },
  {
    date: '2017-01-01T05:00:00.000Z',
    hour: 9,
    impressions: 145333,
    clicks: 163,
    revenue: '637.8506700000000',
  },
  {
    date: '2017-01-01T05:00:00.000Z',
    hour: 10,
    impressions: 152529,
    clicks: 180,
    revenue: '657.6138580000000',
  },
  {
    date: '2017-01-01T05:00:00.000Z',
    hour: 11,
    impressions: 165321,
    clicks: 200,
    revenue: '647.5332910000000',
  },
  {
    date: '2017-01-01T05:00:00.000Z',
    hour: 12,
    impressions: 152531,
    clicks: 195,
    revenue: '684.3440180000000',
  },
  {
    date: '2017-01-01T05:00:00.000Z',
    hour: 13,
    impressions: 143520,
    clicks: 181,
    revenue: '646.0625610000000',
  },
  {
    date: '2017-01-01T05:00:00.000Z',
    hour: 14,
    impressions: 168021,
    clicks: 314,
    revenue: '886.5780050000000',
  },
  {
    date: '2017-01-01T05:00:00.000Z',
    hour: 15,
    impressions: 127771,
    clicks: 193,
    revenue: '599.0013210000000',
  },
  {
    date: '2017-01-01T05:00:00.000Z',
    hour: 16,
    impressions: 106157,
    clicks: 211,
    revenue: '603.1255660000000',
  },
  {
    date: '2017-01-01T05:00:00.000Z',
    hour: 17,
    impressions: 104870,
    clicks: 191,
    revenue: '563.1118780000000',
  },
  {
    date: '2017-01-01T05:00:00.000Z',
    hour: 18,
    impressions: 86798,
    clicks: 173,
    revenue: '488.8465350000000',
  },
  {
    date: '2017-01-01T05:00:00.000Z',
    hour: 19,
    impressions: 165917,
    clicks: 210,
    revenue: '853.6791170000000',
  },
  {
    date: '2017-01-01T05:00:00.000Z',
    hour: 20,
    impressions: 95662,
    clicks: 99,
    revenue: '452.6468010000000',
  },
  {
    date: '2017-01-01T05:00:00.000Z',
    hour: 21,
    impressions: 60086,
    clicks: 61,
    revenue: '280.0887910000000',
  },
  {
    date: '2017-01-01T05:00:00.000Z',
    hour: 22,
    impressions: 113981,
    clicks: 86,
    revenue: '561.3447040000000',
  },
  {
    date: '2017-01-01T05:00:00.000Z',
    hour: 23,
    impressions: 17819,
    clicks: 24,
    revenue: '94.0077160000000',
  },
];

// {
//   date: '2017-01-01T05:00:00.000Z',
//   hour: 23,
//   impressions: 17819,
//   clicks: 24,
//   revenue: '94.0077160000000',
// },

const labels = Object.keys(raw[0]).map(key => ({
  label: key.replace(/([A-Z])/g, ' $1'),
  key,
}));
const dataOne = raw.map(item => [
  // moment(new Date(item.date)).format('D MMMM YYYY'),
  new Date(item.date).toLocaleDateString('en-US'),
  item.hour,
  item.impressions,
  item.clicks,
  parseFloat(item.revenue).toFixed(2),
]);

const Template = args => <Table {...args} />;

export const Default = Template.bind({});
Default.storyName = 'First Set';
Default.args = {
  labels,
  data: dataOne,
};

export const NoData = Template.bind({});
NoData.storyName = 'No Data';
NoData.args = {
  labels,
  data: [],
};
