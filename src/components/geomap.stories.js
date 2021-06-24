import GeoMap from './geomap';

export default {
  title: 'Components/GeoMap',
  component: GeoMap,
};

const raw = [
  { poi_id: 1, name: 'EQ Works', lat: 43.6708, lon: -79.3899 },
  { poi_id: 2, name: 'CN Tower', lat: 43.6426, lon: -79.3871 },
  { poi_id: 3, name: 'Niagara Falls', lat: 43.0896, lon: -79.0849 },
  { poi_id: 4, name: 'Vancouver Harbour', lat: 49.2965, lon: -123.0884 },
];

const Template = args => <GeoMap {...args} />;

export const Default = Template.bind({});
Default.args = {
  data: raw,
  style: {
    height: '500px',
    width: '100%',
  },
};
