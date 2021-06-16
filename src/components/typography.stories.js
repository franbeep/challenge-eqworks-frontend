import Typography from './typography';

export default {
  title: 'Components/Typography',
  component: Typography,
};

const Template = args => <Typography {...args} />;

export const Heading = Template.bind({});
Heading.args = {
  type: 'heading',
  children: 'Hi Heading 😴!',
};

export const Title = Template.bind({});
Title.args = {
  type: 'title',
  children: 'Greetings Title 🙃!',
};

export const Paragraph = Template.bind({});
Paragraph.args = {
  type: 'paragraph',
  children: 'Hello Paragraph 👀!',
};
