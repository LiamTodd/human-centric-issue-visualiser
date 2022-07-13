import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import * as repoLabels from '../../helpers/labels';
import { repo } from '../../helpers/testCredentials';
import { ISSUES_KEY } from '../../helpers/setupLocalStorage';

export default function PriorityBarChartComponent() {
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);
  const options = {
    scales: {
      yAxis: {
        ticks: {
          precision: 0
        },
        title: {
          display: true,
          text: 'Number of Issues'
        }
      },
      xAxis: {
        title: {
          display: true,
          text: 'Issue Priority'
        }
      }
    },
    indexAxis: 'x',
    elements: {
      bar: {
        borderWidth: 2
      }
    },
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Issue Priority Overview'
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
    repoLabels.lowPriorityLabel.name,
    repoLabels.mediumPriorityLabel.name,
    repoLabels.highPriorityLabel.name
  ];

  const getProgressCount = () => {
    return [
      getCount(null),
      getCount(repoLabels.lowPriorityLabel.name),
      getCount(repoLabels.mediumPriorityLabel.name),
      getCount(repoLabels.highPriorityLabel.name)
    ];
  };

  const getCount = (labelName) => {
    let count = 0;
    const issues = JSON.parse(localStorage.getItem(ISSUES_KEY));
    issues.forEach((issue) => {
      if (issue.priority.name == labelName) {
        count += 1;
      }
    });
    return count;
  };

  const data = {
    labels,
    datasets: [
      {
        data: getProgressCount(),
        borderColor: hexToRgb(repoLabels.resolvedHCILabel.color, 1),
        backgroundColor: [
          hexToRgb(repoLabels.resolvedHCILabel.color, 1),
          hexToRgb(repoLabels.lowPriorityLabel.color, 1),
          hexToRgb(repoLabels.mediumPriorityLabel.color, 1),
          hexToRgb(repoLabels.highPriorityLabel.color, 1)
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
