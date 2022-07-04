import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';
import * as repoLabels from '../../helpers/labels';
import { ISSUES_KEY } from '../../helpers/setupLocalStorage';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const hexToRgb = (hex) => {
  var bigint = parseInt(hex, 16);
  var r = (bigint >> 16) & 255;
  var g = (bigint >> 8) & 255;
  var b = bigint & 255;

  return 'rgba(' + r + ', ' + g + ', ' + b + ', 0.5)';
};

const getHCICount = () => {
  return [
    getCount(repoLabels.appUsageLabel.name),
    getCount(repoLabels.inclusivenessLabel.name),
    getCount(repoLabels.userReactionLabel.name)
  ];
};

const getCount = (labelName) => {
  let count = 0;
  const issues = JSON.parse(localStorage.getItem(ISSUES_KEY));
  issues.forEach((issue) => {
    if (issue.HCILabels.includes(labelName)) {
      console.log(issue.HCILabels, labelName);
      count += 1;
    }
  });
  return count;
};

const data = {
  labels: [
    repoLabels.appUsageLabel.name,
    repoLabels.inclusivenessLabel.name,
    repoLabels.userReactionLabel.name
  ],
  datasets: [
    {
      label: 'Distribution of HCI Categories',
      data: getHCICount(),
      backgroundColor: [
        hexToRgb(repoLabels.appUsageLabel.color),
        hexToRgb(repoLabels.inclusivenessLabel.color),
        hexToRgb(repoLabels.userReactionLabel.color)
      ],
      borderWidth: 1
    }
  ]
};

const options = {
  scales: {
    r: {
      ticks: {
        precision: 0
      }
    }
  }
};

export default function PolarAreaChartComponent() {
  return <PolarArea data={data} options={options}></PolarArea>;
}
