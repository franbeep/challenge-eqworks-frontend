/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Chart, registerables } from 'chart.js';
import { interval, Subject } from 'rxjs';
import { debounce, debounceTime } from 'rxjs/operators';

import Typography from './typography';

Chart.register(...registerables);

/**
 * Simple utility function for the chart gradient
 * @param {String} color Accepts: red, yellow, green, blue, indigo, purple, pink, grey
 * @returns
 */
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

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
`;
const ErrorModal = styled.div`
  position: absolute;
  border-radius: 4px;
  background: white;
  padding: 16px;
  text-align: center;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
  max-width: 250px;
`;

const subject = new Subject();
const DEBOUNCE_INTERVAL = 500;
// create a stream to debounce in case of many refreshes
const stream = subject.pipe(debounce(() => interval(DEBOUNCE_INTERVAL)));
stream.subscribe(f => f());

/**
 * Chart component that encapsulates Chart.js with some utilities involving date, gradient and more
 */
function LineChart({
  pointLabel,
  labels,
  data,
  altData = null,
  color,
  altColor = 'grey',
  dashed = false,
  error,
}) {
  const chartRef = React.useRef(null);
  const [chart, setChart] = React.useState(null);

  // Updates the chart, destroying the previously created
  const updateChart = () => {
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

    // second dataset, if any
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

    // destroy previous and create a new one
    try {
      if (chart) {
        chart.destroy();
      }
      const newChart = new Chart(ctx, {
        type: 'line',
        data: chartData,
      });
      setChart(newChart);
    } catch (ex) {
      // it can occur the the canvas is already in use, so it will fall on this catch
      console.error(ex);
    }
  };

  // update chart every time labels or data change
  React.useEffect(() => {
    console.log('labels/data/altData changed, updating chart sent');
    subject.next(updateChart);
  }, [labels, data, altData]);

  return (
    <Container>
      <Canvas
        ref={chartRef}
        style={{ filter: Boolean(error) ? 'blur(4px)' : '' }}
      />
      {error && (
        <ErrorModal>
          <Typography type="title">{error.status}</Typography>
          <Typography type="paragraph">{error.message}</Typography>
        </ErrorModal>
      )}
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
    'grey',
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
  error: PropTypes.shape({
    status: PropTypes.string,
    message: PropTypes.string,
  }),
};

export default LineChart;
