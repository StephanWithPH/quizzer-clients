import React from 'react';
import Chart from 'react-apexcharts';
import { useSelector } from 'react-redux';

function QuizChart() {
  const darkMode = useSelector((state) => state.darkMode);

  return (
    <Chart
      type="area"
      height={545}
      options={{
        colors: ['#6366f1'],
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 0.5,
            opacityFrom: 0.7,
            opacityTo: 0.1,
            stops: [0, 90],
          },
        },
        chart: {
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
          background: 'transparent',
        },
        theme: {
          mode: darkMode ? 'light' : 'dark',
        },
        dataLabels: {
          enabled: false,
        },
        markers: {
          size: 5,
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000],
        },
        stroke: {
          curve: 'smooth',
        },
      }}
      series={
        [
          {
            name: 'Series 1',
            data: [20, 30, 20, 40, 30, 50, 60, 80, 100, 80],
          },
        ]
      }
    />
  );
}

export default QuizChart;
