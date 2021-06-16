import Layout from './layout';

export default {
  title: 'Components/Layout',
  component: Layout,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    Story => (
      <div style={{ height: '100vh' }}>
        <Story />
      </div>
    ),
  ],
};

const Template = args => <Layout {...args} />;

export const Default = Template.bind({});
Default.args = {};
