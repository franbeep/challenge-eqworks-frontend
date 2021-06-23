// YourComponent.stories.js

import DateFilter from './data-filter';

export default {
  title: 'Components/DateFilter',
  component: DateFilter,
  argTypes: {
    selectorPressed: { action: 'selectorPressed' },
    dateRangeUpdated: { action: 'dateRangeUpdated' },
    searchFieldSubmit: { action: 'searchFieldSubmit' },
  },
  decorators: [
    Story => (
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
};

//

const Template = args => <DateFilter {...args} />;

export const OnlyTypeSelectors = Template.bind({});
OnlyTypeSelectors.storyName = '';
OnlyTypeSelectors.args = {
  selectors: [
    {
      label: 'Daily',
      value: 'daily',
    },
    {
      label: 'Hourly',
      value: 'hourly',
    },
    {
      label: 'Weekly',
      value: 'weekly',
    },
    {
      label: 'Monthly',
      value: 'monthly',
    },
  ],
  // selectorPressed: () => {},
};

export const OnlyDateRange = Template.bind({});
OnlyDateRange.storyName = '';
OnlyDateRange.args = {
  dateRange: true,
};

export const OnlySearchField = Template.bind({});
OnlySearchField.storyName = '';
OnlySearchField.args = {
  searchField: true,
};

export const Complete = Template.bind({});
Complete.storyName = '';
Complete.args = {
  selectors: [
    {
      label: 'Daily',
      value: 'daily',
    },
    {
      label: 'Hourly',
      value: 'hourly',
    },
  ],
  dateRange: true,
  searchField: true,
};
