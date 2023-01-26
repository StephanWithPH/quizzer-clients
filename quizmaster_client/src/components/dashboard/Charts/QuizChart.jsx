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
        chart: {
          toolbar: {
            show: false,
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
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
        },
        stroke: {
          curve: 'smooth',
        },
      }}
      series={
        [
          {
            name: 'Gespeeld',
            data: [20, 30, 20, 40, 30, 50, 60, 80, 100],
          },
        ]
      }
    />
  );
}

export default QuizChart;
