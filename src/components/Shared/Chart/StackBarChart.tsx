import React from 'react';
import { Bar } from 'react-chartjs-2';

const StackBarChart: React.FC = () => {
  const arbitraryStackKey = 'stack1';
  const chartData = {
    labels: ['ASIA', 'EUR', 'AUS', 'NA', 'SA', 'ME'],
    datasets: [
      {
        label: 'Won',
        data: [33, 10, 13, 15, 22, 30],
        backgroundColor: '#91D3D3',
        stack: arbitraryStackKey,
      },
      {
        label: 'Lost',
        data: [24, 3, 20, 56, 14, 43],
        backgroundColor: '#EB617C',
        stack: arbitraryStackKey,
      },
      {
        label: 'In progress',
        data: [12, 19, 36, 58, 22, 31],
        backgroundColor: '#506574',
        stack: arbitraryStackKey,
      },
    ],
  };

  const options = {
    responsive: true,
    animation: false,
    scales: {
      yAxes: [
        {
          stacked: true,
        },
      ],
      xAxes: [
        {
          stacked: true,
        },
      ],
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        align: 'end',
      },
    },
  };

  return (
    <>
      <Bar data={chartData} options={options} />
    </>
  );
};

export default StackBarChart;
