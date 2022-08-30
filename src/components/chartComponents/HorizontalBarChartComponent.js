import React from 'react';
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
import { CREDENTIALS_KEY, ISSUES_KEY } from '../../helpers/localStorageKeys';
import { defaultGrey } from '../../theme/hexCodes';

export default function HorizontalBarChartComponent() {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  const options = {
    scales: {
      xAxis: {
        ticks: {
          precision: 0,
          font: {
            size: 16
          }
        },
        title: {
          display: true,
          text: 'Number of Issues',
          font: {
            size: 24
          }
        }
      },
      yAxis: {
        title: {
          display: true,
          text: 'Issue Status',
          font: {
            size: 24
          }
        }
      }
    },
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2
      }
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'right'
      },
      title: {
        display: true,
        text: 'Issue Progress Overview',
        font: {
          size: 24
        }
      }
    }
  };

  const hexToRgb = (hex, opacity) => {
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;

    return 'rgba(' + r + ', ' + g + ', ' + b + ',' + opacity + ')';
  };

  const labels = [
    'Unassigned Status',
    repoLabels.unresolvedHCILabel.name,
    repoLabels.resolvingHCILabel.name,
    repoLabels.resolvedHCILabel.name
  ];

  const getProgressCount = () => {
    return [
      getCount(null),
      getCount(repoLabels.unresolvedHCILabel.name),
      getCount(repoLabels.resolvingHCILabel.name),
      getCount(repoLabels.resolvedHCILabel.name)
    ];
  };

  const getCount = (labelName) => {
    let count = 0;
    const issues = JSON.parse(localStorage.getItem(ISSUES_KEY));
    issues.forEach((issue) => {
      if (issue.progressTag.name == labelName) {
        count += 1;
      }
    });
    return count;
  };

  const data = {
    labels,
    datasets: [
      {
        label:
          'Issues in ' +
          JSON.parse(localStorage.getItem(CREDENTIALS_KEY)).repoName,
        data: getProgressCount(),
        borderColor: 'white',
        backgroundColor: [
          `#${defaultGrey}`,
          hexToRgb(repoLabels.unresolvedHCILabel.color, 0.7),
          hexToRgb(repoLabels.resolvingHCILabel.color, 0.7),
          hexToRgb(repoLabels.resolvedHCILabel.color, 0.7)
        ]
      }
    ]
  };
  return (
    <div style={{ width: '70%' }}>
      <Bar options={options} data={data}></Bar>
    </div>
  );
}
