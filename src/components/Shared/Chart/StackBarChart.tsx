import React from 'react';
import { useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import { BubbleDataPoint, ChartData, ChartOptions, ScatterDataPoint } from 'chart.js';
import { AppState } from '../../../store/store';

interface Props {
  data: any;
  selectedFilter: string;
}

const StackBarChart: React.FC<Props> = ({ data, selectedFilter }) => {
  const state: AppState = useSelector((appState: AppState) => appState);

  const [areaData, setAreaData] = React.useState<any[]>();
  const [wonData, setWonData] = React.useState<any[]>();
  const [lostData, setLostData] = React.useState<any[]>();
  const [inProgressData, setInProgressData] = React.useState<any[]>();

  const getUserName = (str: string) => {
    if (str) {
      const userObj = state.users.users.find((obj) => obj.user === str);
      return userObj?.description;
    }
    return '';
  };

  const getAreaData = () => {
    if (data) {
      const areaDataArr: any[] = [];
      const wonDataArr: any[] = [];
      const lostDataArr: any[] = [];
      const inprogressDataArr: any[] = [];
      data.forEach((item: any) => {
        if (selectedFilter === 'regions') {
          areaDataArr.push(item.area);
        }
        if (selectedFilter === 'industry') {
          const industry = item.industry.split(' ')[0];
          areaDataArr.push(industry);
        }
        if (selectedFilter === 'type') {
          const type = item.oppRecordType.split(' ')[0];
          areaDataArr.push(type);
        }
        if (selectedFilter === 'salesPerson') {
          const userName = getUserName(item.user);
          areaDataArr.push(userName);
        }
        wonDataArr.push(item.won);
        lostDataArr.push(item.lost);
        inprogressDataArr.push(item.inProgress);
      });
      setAreaData(areaDataArr);
      setWonData(wonDataArr);
      setLostData(lostDataArr);
      setInProgressData(inprogressDataArr);
    }
  };

  React.useEffect(() => {
    getAreaData();
  }, [data]);

  const arbitraryStackKey = 'stack1';
  const chartData: ChartData = {
    labels: areaData,
    datasets: [
      {
        label: 'Won',
        data: wonData as (number | ScatterDataPoint | BubbleDataPoint | null)[],
        backgroundColor: '#91D3D3',
        stack: arbitraryStackKey,
      },
      {
        label: 'Lost',
        data: lostData as (number | ScatterDataPoint | BubbleDataPoint | null)[],
        backgroundColor: '#EB617C',
        stack: arbitraryStackKey,
      },
      {
        label: 'In progress',
        data: inProgressData as (number | ScatterDataPoint | BubbleDataPoint | null)[],
        backgroundColor: '#506574',
        stack: arbitraryStackKey,
      },
    ],
  };

  const options: ChartOptions = {
    responsive: true,
    animation: false,
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
