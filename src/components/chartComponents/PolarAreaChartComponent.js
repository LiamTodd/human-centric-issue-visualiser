import React, { useState, useEffect } from 'react';
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

export default function PolarAreaChartComponent() {
  ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

  const hexToRgb = (hex) => {
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return 'rgba(' + r + ', ' + g + ', ' + b + ', 0.5)';
  };

  const getHCICount = () => {
    return [
      getCount(repoLabels.noHCIIdentifiedLabel.name),
      getCount(repoLabels.appUsageLabel.name),
      getCount(repoLabels.inclusivenessLabel.name),
      getCount(repoLabels.userReactionLabel.name)
    ];
  };

  const getCount = (labelName) => {
    let count = 0;
    const issues = JSON.parse(localStorage.getItem(ISSUES_KEY));
    issues.forEach((issue) => {
      if (
        issue.HCILabels.map((label) => {
          return label.name;
        }).includes(labelName)
      ) {
        count += 1;
      }
    });
    return count;
  };

  const [data, setData] = useState({
    labels: [
      repoLabels.noHCIIdentifiedLabel.name,
      repoLabels.appUsageLabel.name,
      repoLabels.inclusivenessLabel.name,
      repoLabels.userReactionLabel.name
    ],
    datasets: [
      {
        label: 'Distribution of HCI Categories',
        data: getHCICount(),
        backgroundColor: [
          hexToRgb(repoLabels.noHCIIdentifiedLabel.color),
          hexToRgb(repoLabels.appUsageLabel.color),
          hexToRgb(repoLabels.inclusivenessLabel.color),
          hexToRgb(repoLabels.userReactionLabel.color)
        ],
        borderWidth: 1
      }
    ]
  });

  useEffect(() => {
    const interval = setInterval(
      () =>
        setData({
          labels: [
            repoLabels.noHCIIdentifiedLabel.name,
            repoLabels.appUsageLabel.name,
            repoLabels.inclusivenessLabel.name,
            repoLabels.userReactionLabel.name
          ],
          datasets: [
            {
              label: 'Distribution of HCI Categories',
              data: getHCICount(),
              backgroundColor: [
                hexToRgb(repoLabels.noHCIIdentifiedLabel.color),
                hexToRgb(repoLabels.appUsageLabel.color),
                hexToRgb(repoLabels.inclusivenessLabel.color),
                hexToRgb(repoLabels.userReactionLabel.color)
              ],
              borderWidth: 1
            }
          ]
        }),
      1000
    );
    return () => {
      clearInterval(interval);
    };
  }, []);

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'HCI Categorisation Count'
      }
    },
    scales: {
      r: {
        ticks: {
          precision: 0
        }
      }
    }
  };
  return (
    <div style={{ width: '50%' }}>
      <PolarArea data={data} options={options}></PolarArea>
    </div>
  );
}
