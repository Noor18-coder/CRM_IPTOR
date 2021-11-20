import React from 'react';
import { useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import { ChartData, ChartOptions, ScatterDataPoint, BubbleDataPoint } from 'chart.js';
import 'chartjs-plugin-datalabels';
import { AppState } from '../../../store/store';

interface Props {
  data: any;
}

const HorizontalBarChart: React.FC<Props> = ({ data }) => {
  const [customerData, setCustomerData] = React.useState<any[]>();
  const [inProgressData, setInProgressData] = React.useState<any[]>();
  const state: AppState = useSelector((appState: AppState) => appState);

  const getAreaData = () => {
    if (data) {
      const customerDataArr: any[] = [];
      const inprogressDataArr: any[] = [];
      data.forEach((item: any) => {
        customerDataArr.push(item.customerName);
        inprogressDataArr.push(item.inProgressValue);
      });
      setCustomerData(customerDataArr);
      setInProgressData(inprogressDataArr);
    }
  };

  React.useEffect(() => {
    getAreaData();
  }, [data]);

  const chartData: ChartData = {
    labels: customerData,
    datasets: [
      {
        data: inProgressData as (number | ScatterDataPoint | BubbleDataPoint | null)[],
        backgroundColor: '#91D3D3',
        borderColor: '#91D3D3',
        borderWidth: 1,
        barPercentage: 0.4,
      },
    ],
  };

  const options: ChartOptions = {
    indexAxis: 'y',
    scales: {
      x: {
        ticks: {
          callback: (value: any) => {
            return `${
              state.enviornmentConfigs.defaultOpprtunityInfo.currencyLDA ? state.enviornmentConfigs.defaultOpprtunityInfo.currencyLDA : ''
            } ${value}`;
          },
        },
      },
    },
    elements: {
      bar: {
        borderWidth: 1,
      },
    },
    responsive: true,
    animation: false,
    plugins: {
      datalabels: {
        display: true,
        color: 'black',
      },
      legend: {
        display: false,
      },
    },
  };

  return (
    <>
      <Bar data={chartData} options={options} />
    </>
  );
};

export default HorizontalBarChart;
