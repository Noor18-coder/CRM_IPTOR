import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChart: React.FC = () => {
  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Won',
        fill: false,
        lineTension: 0,
        backgroundColor: '#00A3A5',
        borderColor: '#00A3A5',
        data: [65, 59, 80, 81, 56],
      },
      {
        label: 'Lost',
        fill: false,
        lineTension: 0,
        backgroundColor: '#EB617C',
        borderColor: '#EB617C',
        data: [22, 39, 60, 89, 46],
      },
    ],
  };

  return (
    <>
      <Line
        data={chartData}
        options={{
          responsive: true,
          animation: false,
          title: {
            display: false,
          },
          plugins: {
            legend: {
              display: true,
              position: 'top',
              align: 'end',
            },
          },
        }}
      />
    </>
  );
};

export default LineChart;
