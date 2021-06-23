// YourComponent.stories.js

import LineChart from './line-chart';

export default {
  title: 'Components/LineChart',
  component: LineChart,
  decorators: [
    Story => (
      <div style={{ maxWidth: '900px' }}>
        <Story />
      </div>
    ),
  ],
};

const raw = [
  { date: '2017-01-09T05:00:00.000Z', hour: 0, events: 8 },
  { date: '2017-01-09T05:00:00.000Z', hour: 3, events: 1 },
  { date: '2017-01-09T05:00:00.000Z', hour: 5, events: 2 },
  { date: '2017-01-09T05:00:00.000Z', hour: 8, events: 2 },
  { date: '2017-01-09T05:00:00.000Z', hour: 11, events: 4 },
  { date: '2017-01-09T05:00:00.000Z', hour: 19, events: 13 },
  { date: '2017-01-09T05:00:00.000Z', hour: 23, events: 4 },
];

const fakeRaw = [
  { date: '2017-01-23T05:00:00.000Z', hour: 18, events: 13 },
  { date: '2017-01-24T05:00:00.000Z', hour: 2, events: 6 },
  { date: '2017-01-24T05:00:00.000Z', hour: 7, events: 8 },
  { date: '2017-01-24T05:00:00.000Z', hour: 8, events: 8 },
  { date: '2017-01-24T05:00:00.000Z', hour: 9, events: 8 },
  { date: '2017-01-24T05:00:00.000Z', hour: 16, events: 7 },
  { date: '2017-01-24T05:00:00.000Z', hour: 20, events: 1 },
];

const labels = raw.map(d => `${d.hour}h`);
const dataOne = raw.map(d => d.events);
const dataTwo = fakeRaw.map(d => d.events);

const Template = args => <LineChart {...args} />;

export const Blue = Template.bind({});
Blue.args = {
  pointLabel: '# of Events:',
  labels,
  data: dataOne,
  color: 'blue',
};

export const Red = Template.bind({});
Red.args = {
  pointLabel: '# of Events:',
  labels,
  data: dataTwo,
  color: 'red',
};

export const Dashed = Template.bind({});
Dashed.args = {
  pointLabel: '# of Events:',
  labels,
  data: dataTwo,
  color: 'indigo',
  dashed: true,
};

export const ComparingNoColor = Template.bind({});
ComparingNoColor.storyName = 'Comparing without color';
ComparingNoColor.args = {
  pointLabel: '# of Events:',
  labels,
  data: dataOne,
  altData: dataTwo,
  color: 'indigo',
  dashed: true,
};

export const ComparingWithColor = Template.bind({});
ComparingWithColor.storyName = 'Comparing with color';
ComparingWithColor.args = {
  pointLabel: '# of Events:',
  labels,
  data: dataOne,
  altData: dataTwo,
  color: 'green',
  altColor: 'yellow',
  dashed: true,
};

export const NoData = Template.bind({});
NoData.storyName = 'No Data';
NoData.args = {
  pointLabel: '# of Events:',
  labels,
  data: [],
  color: 'purple',
};

export const ErrorStory = Template.bind({});
ErrorStory.storyName = 'Error';
ErrorStory.args = {
  pointLabel: '# of Events:',
  labels,
  data: [],
  color: 'pink',
  error: {
    status: '429',
    message: "You're not allowed to do this.",
  },
};
