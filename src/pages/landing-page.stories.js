import LandingPage from './landing-page';

export default {
  title: 'Pages/LandingPage',
  component: LandingPage,
};

const Template = args => <LandingPage {...args} />;

export const Default = Template.bind({});
Default.args = {};
