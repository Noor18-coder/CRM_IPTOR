import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';

interface Props {
  data: any;
}

const HorizontalBarChart: React.FC<Props> = ({ data }) => {
  const [customerData, setCustomerData] = React.useState<any[]>();
  const [inProgressData, setInProgressData] = React.useState<any[]>();

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

  const chartData = {
    labels: customerData,
    datasets: [
      {
        data: inProgressData,
        backgroundColor: '#91D3D3',
        borderColor: '#91D3D3',
        borderWidth: 1,
        barPercentage: 0.4,
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 1,
        width: 1,
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
