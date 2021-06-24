import styled from 'styled-components';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from '@monsonjeremy/react-leaflet';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

const MapRoot = styled.div`
  & > div:first-child {
    width: 100%;
    height: 100%;
  }
`;

function MarkerWrapper({ index, location, color }) {
  return (
    <Marker key={`marker-${index}`} position={[location.lat, location.lon]}>
      <Popup>
        <div>{location.name}</div>
      </Popup>
    </Marker>
  );
}

function GeoMap({ data, ...rest }) {
  const defaultCenter = [43.700644, -79.468929];

  return (
    <MapRoot {...rest}>
      <MapContainer center={defaultCenter} zoom={12}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data.map((d, index) => (
          <MarkerWrapper key={index} location={d} color="#fff" />
        ))}
      </MapContainer>
    </MapRoot>
  );
}

export default GeoMap;
