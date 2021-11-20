import { BubbleDataPoint, ChartOptions, ScatterDataPoint } from 'chart.js';
import React from 'react';
import { Line } from 'react-chartjs-2';
import { getMonthName, getMonthsLists } from '../../../helpers/utilities/lib';

interface Props {
  minDate: string;
  maxDate: string;
  closeDateData: any;
  group: string;
  filter: string;
}

const LineChart: React.FC<Props> = ({ closeDateData, group, filter }) => {
  const [wonData, setWonData] = React.useState<any[]>();
  const [lostData, setLostData] = React.useState<any[]>();
  const [dateList, setDateList] = React.useState<any[]>();

  const getWonDataDetails = () => {
    const monthArr: any[] = [];
    const wonDataArr: any[] = [];

    if (closeDateData) {
      const months = getMonthsLists(0, 11);
      months.forEach((month) => {
        const selectedMonth = closeDateData.find((ele: any) => month === getMonthName(ele.closeDate));
        if (selectedMonth) {
          const allSelectedMonthDate = closeDateData.filter((obj: any) => obj.closeDate.substr(0, 7) === selectedMonth.closeDate.substr(0, 7));
          monthArr.push(allSelectedMonthDate);
        }
      });
      if (monthArr) {
        monthArr.forEach((arr) => {
          if (filter === 'revenue') {
            // eslint-disable-next-line no-lonely-if
            if (group === 'year') {
              const wonValueTotal = arr.reduce((prev: any, cur: any) => {
                return prev + cur.wonValue;
              }, 0);
              wonDataArr.push(wonValueTotal);
            } else {
              arr.forEach((obj: any) => {
                wonDataArr.push(obj.wonValue);
              });
            }
          } else {
            // eslint-disable-next-line no-lonely-if
            if (group === 'year') {
              const wonTotal = arr.reduce((prev: any, cur: any) => {
                return prev + cur.won;
              }, 0);
              wonDataArr.push(wonTotal);
            } else {
              arr.forEach((obj: any) => {
                wonDataArr.push(obj.won);
              });
            }
          }
        });
      }
      setWonData(wonDataArr);
    }
  };

  const getLostDataDetails = () => {
    const monthArr: any[] = [];
    const lostDataArr: any[] = [];
    if (closeDateData) {
      const months = getMonthsLists(0, 11);
      months.forEach((month) => {
        const selectedMonth = closeDateData.find((ele: any) => month === getMonthName(ele.closeDate));
        if (selectedMonth) {
          const allSelectedMonthDate = closeDateData.filter((obj: any) => obj.closeDate.substr(0, 7) === selectedMonth.closeDate.substr(0, 7));
          monthArr.push(allSelectedMonthDate);
        }
      });
      if (monthArr) {
        monthArr.forEach((arr) => {
          if (filter === 'revenue') {
            if (group === 'year') {
              const lostValueTotal = arr.reduce((prev: any, cur: any) => {
                return prev + cur.lostValue;
              }, 0);
              lostDataArr.push(lostValueTotal);
            } else {
              arr.forEach((obj: any) => {
                lostDataArr.push(obj.lostValue);
              });
            }
          } else {
            // eslint-disable-next-line no-lonely-if
            if (group === 'year') {
              const lostTotal = arr.reduce((prev: any, cur: any) => {
                return prev + cur.lost;
              }, 0);
              lostDataArr.push(lostTotal);
            } else {
              arr.forEach((obj: any) => {
                lostDataArr.push(obj.lost);
              });
            }
          }
        });
      }
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
    labels: group === 'month' || group === 'week' ? dateList : getMonthsLists(0, 11),
    datasets: [
      {
        label: 'Won',
        fill: false,
        backgroundColor: '#00A3A5',
        borderColor: '#00A3A5',
        data: wonData as (number | ScatterDataPoint | BubbleDataPoint | null)[],
      },
      {
        label: 'Lost',
        fill: false,
        backgroundColor: '#EB617C',
        borderColor: '#EB617C',
        data: lostData as (number | ScatterDataPoint | BubbleDataPoint | null)[],
      },
    ],
  };

  return (
    <>
      <Line
        data={chartData}
        options={
          {
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
          } as ChartOptions
        }
      />
    </>
  );
};

export default LineChart;
