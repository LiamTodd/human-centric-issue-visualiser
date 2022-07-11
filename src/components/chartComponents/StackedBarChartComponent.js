import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import * as repoLabels from '../../helpers/labels';
import { ISSUES_KEY } from '../../helpers/setupLocalStorage';

export default function StackedBarChartComponent() {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'HCIs against time'
      }
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
        ticks: {
          precision: 0
        }
      },
      y: {
        stacked: true,
        ticks: {
          precision: 0
        }
      }
    }
  };

  const hexToRgb = (hex) => {
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return 'rgba(' + r + ', ' + g + ', ' + b + ', 0.5)';
  };

  const getDatesInRange = (startDate, endDate) => {
    const date = new Date(startDate.getTime());
    const dates = [];

    while (date <= endDate) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const generateDates = () => {
    const issues = JSON.parse(localStorage.getItem(ISSUES_KEY));
    const issueDates = issues.map((issue) => {
      return new Date(issue.created_at);
    });
    // sort in ascending order
    issueDates.sort((first, second) => {
      return first.getTime() - second.getTime();
    });
    // get earliest and latest dates
    const earliestDate = issueDates[0];
    const latestDate = issueDates[issueDates.length - 1];
    return getDatesInRange(earliestDate, latestDate);
  };

  const getCount = (HCILabel, dates) => {
    const issues = JSON.parse(localStorage.getItem(ISSUES_KEY));

    return dates.map((date) => {
      let count = 0;
      issues.forEach((issue) => {
        if (
          date.toDateString() == new Date(issue.created_at).toDateString() &&
          issue.HCILabels.includes(HCILabel)
        ) {
          count++;
        }
      });
      return count;
    });
  };

  const dates = generateDates();
  const labels = dates.map((date) => {
    return date.toDateString();
  });

  const [data, setData] = useState({
    labels: labels,
    datasets: [
      {
        label: repoLabels.noHCIIdentifiedLabel.name,
        data: getCount(repoLabels.noHCIIdentifiedLabel.name, dates),
        backgroundColor: hexToRgb(repoLabels.noHCIIdentifiedLabel.color)
      },
      {
        label: repoLabels.appUsageLabel.name,
        data: getCount(repoLabels.appUsageLabel.name, dates),
        backgroundColor: hexToRgb(repoLabels.appUsageLabel.color)
      },
      {
        label: repoLabels.inclusivenessLabel.name,
        data: getCount(repoLabels.inclusivenessLabel.name, dates),
        backgroundColor: hexToRgb(repoLabels.inclusivenessLabel.color)
      },
      {
        label: repoLabels.userReactionLabel.name,
        data: getCount(repoLabels.userReactionLabel.name, dates),
        backgroundColor: hexToRgb(repoLabels.userReactionLabel.color)
      }
    ]
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const dates = generateDates();
      const labels = dates.map((date) => {
        return date.toDateString();
      });

      setData({
        labels: labels,
        datasets: [
          {
            label: repoLabels.noHCIIdentifiedLabel.name,
            data: getCount(repoLabels.noHCIIdentifiedLabel.name, dates),
            backgroundColor: hexToRgb(repoLabels.noHCIIdentifiedLabel.color)
          },
          {
            label: repoLabels.appUsageLabel.name,
            data: getCount(repoLabels.appUsageLabel.name, dates),
            backgroundColor: hexToRgb(repoLabels.appUsageLabel.color)
          },
          {
            label: repoLabels.inclusivenessLabel.name,
            data: getCount(repoLabels.inclusivenessLabel.name, dates),
            backgroundColor: hexToRgb(repoLabels.inclusivenessLabel.color)
          },
          {
            label: repoLabels.userReactionLabel.name,
            data: getCount(repoLabels.userReactionLabel.name, dates),
            backgroundColor: hexToRgb(repoLabels.userReactionLabel.color)
          }
        ]
      });
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return <Bar options={options} data={data} />;
}
