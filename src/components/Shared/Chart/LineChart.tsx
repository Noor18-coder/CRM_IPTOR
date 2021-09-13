import React from 'react';
import { Line } from 'react-chartjs-2';
import { getMonthName, getMonthsList } from '../../../helpers/utilities/lib';

interface Props {
  minDate: string;
  maxDate: string;
  closeDateData: any;
  group: string;
  filter: string;
}

const LineChart: React.FC<Props> = ({ minDate, maxDate, closeDateData, group, filter }) => {
  const startMonth = getMonthName(minDate);
  const endMonth = getMonthName(maxDate);
  const [wonData, setWonData] = React.useState<any[]>();
  const [lostData, setLostData] = React.useState<any[]>();
  const [dateList, setDateList] = React.useState<any[]>();

  const getWonDataDetails = () => {
    if (closeDateData) {
      const wonDataArr: any[] = [];
      closeDateData.forEach((item: any) => {
        if (filter === 'revenue') {
          wonDataArr.push(item.wonValue);
        } else {
          wonDataArr.push(item.won);
        }
      });
      setWonData(wonDataArr);
    }
  };

  const getLostDataDetails = () => {
    if (closeDateData) {
      const lostDataArr: any[] = [];
      closeDateData.forEach((item: any) => {
        if (filter === 'revenue') {
          lostDataArr.push(item.lostValue);
        } else {
          lostDataArr.push(item.lost);
        }
      });
      setLostData(lostDataArr);
    }
  };

  React.useEffect(() => {
    getWonDataDetails();
    getLostDataDetails();
    if (closeDateData && (group === 'month' || group === 'week')) {
      const dateArr: any[] = [];
      closeDateData.forEach((item: any) => {
        const date = item.closeDate.slice(5, 10).replace('-', '/');
        dateArr.push(date);
      });
      setDateList(dateArr);
    }
  }, [closeDateData]);

  const chartData = {
    labels: group === 'month' || group === 'week' ? dateList : getMonthsList(startMonth, endMonth),
    datasets: [
      {
        label: 'Won',
        fill: false,
        lineTension: 0,
        backgroundColor: '#00A3A5',
        borderColor: '#00A3A5',
        data: wonData,
      },
      {
        label: 'Lost',
        fill: false,
        lineTension: 0,
        backgroundColor: '#EB617C',
        borderColor: '#EB617C',
        data: lostData,
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
