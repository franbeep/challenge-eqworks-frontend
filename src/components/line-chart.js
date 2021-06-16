import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const getColorSet = color => {
  switch (color) {
    case 'red':
      return {
        colorValue: 'rgb(220, 38, 38)',
        gradientFrom: 'rgba(220, 38, 38, 0.7)',
        gradientTo: 'rgba(220, 38, 38, 0)',
      };
    case 'yellow':
      return {
        colorValue: 'rgb(217, 119, 6)',
        gradientFrom: 'rgba(217, 119, 6, 0.7)',
        gradientTo: 'rgba(217, 119, 6, 0)',
      };
    case 'green':
      return {
        colorValue: 'rgb(5, 150, 105)',
        gradientFrom: 'rgba(5, 150, 105, 0.7)',
        gradientTo: 'rgba(5, 150, 105, 0)',
      };
    case 'blue':
      return {
        colorValue: 'rgb(37, 99, 235)',
        gradientFrom: 'rgba(37, 99, 235, 0.7)',
        gradientTo: 'rgba(37, 99, 235, 0)',
      };
    case 'indigo':
      return {
        colorValue: 'rgb(79, 70, 229)',
        gradientFrom: 'rgba(79, 70, 229, 0.7)',
        gradientTo: 'rgba(79, 70, 229, 0)',
      };
    case 'purple':
      return {
        colorValue: 'rgb(124, 58, 237)',
        gradientFrom: 'rgba(124, 58, 237, 0.7)',
        gradientTo: 'rgba(124, 58, 237, 0)',
      };
    case 'pink':
      return {
        colorValue: 'rgb(219, 39, 119)',
        gradientFrom: 'rgba(219, 39, 119, 0.7)',
        gradientTo: 'rgba(219, 39, 119, 0)',
      };
    case 'grey':
      return {
        colorValue: 'rgb(75, 85, 99)',
        gradientFrom: 'rgba(75, 85, 99, 0.7)',
        gradientTo: 'rgba(75, 85, 99, 0)',
      };
    default:
      return {
        colorValue: 'rgb(220, 38, 38)',
        gradientFrom: 'rgba(220, 38, 38, 0.7)',
        gradientTo: 'rgba(220, 38, 38, 0)',
      };
  }
};

const Container = styled.div``;

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
`;

function LineChart({
  pointLabel,
  labels,
  data,
  altData = null,
  color,
  altColor = 'grey',
  dashed = false,
}) {
  const chartRef = React.useRef(null);

  React.useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    const datasets = [];

    // first dataset
    {
      const { colorValue, gradientFrom, gradientTo } = getColorSet(color);
      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, gradientFrom);
      gradient.addColorStop(1, gradientTo);

      datasets.push({
        // dynamic props
        label: pointLabel,
        data,
        borderColor: colorValue,
        HoverBorderColor: colorValue,
        fill: {
          target: 'origin',
          above: gradient,
        },
        // static props
        tension: 0.3,
        borderWidth: 3,
        pointBorderWidth: 3,
        pointHoverBorderWidth: 3,
        pointBackgroundColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointRadius: 6,
        // conditional props
        borderDash: dashed ? [10, 7] : [],
      });
    }

    if (altData) {
      const { colorValue, gradientFrom, gradientTo } = getColorSet(altColor);
      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, gradientFrom);
      gradient.addColorStop(1, gradientTo);

      datasets.push({
        // dynamic props
        label: pointLabel,
        data: altData,
        borderColor: colorValue,
        HoverBorderColor: colorValue,
        fill: {
          target: 'origin',
          above: gradient,
        },
        // static props
        tension: 0.3,
        borderWidth: 3,
        pointBorderWidth: 3,
        pointHoverBorderWidth: 3,
        pointBackgroundColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointRadius: 6,
      });
    }

    const chartData = {
      labels,
      datasets,
    };

    new Chart(ctx, {
      type: 'line',
      data: chartData,
    });
  }, []);

  return (
    <Container>
      <Canvas ref={chartRef} />
    </Container>
  );
}

LineChart.propTypes = {
  pointLabel: PropTypes.string,
  labels: PropTypes.arrayOf(PropTypes.string),
  data: PropTypes.arrayOf(PropTypes.any),
  altData: PropTypes.arrayOf(PropTypes.any),
  altColor: PropTypes.oneOf([
    'red',
    'yellow',
    'green',
    'blue',
    'indigo',
    'purple',
    'pink',
  ]),
  color: PropTypes.oneOf([
    'red',
    'yellow',
    'green',
    'blue',
    'indigo',
    'purple',
    'pink',
  ]),
  dashed: PropTypes.bool,
};

export default LineChart;
