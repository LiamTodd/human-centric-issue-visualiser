import React from 'react';
import DoughnutChartComponent from './chartComponents/DoughnutChartComponent';
import LineChartComponent from './chartComponents/LineChartComponent';
import PolarAreaChartComponent from './chartComponents/PolarAreaChartComponent';
import StackedBarChartComponent from './chartComponents/StackedBarChartComponent';

export default function OverviewComponent() {
  return (
    <>
      <PolarAreaChartComponent></PolarAreaChartComponent>
      <DoughnutChartComponent></DoughnutChartComponent>
      <StackedBarChartComponent></StackedBarChartComponent>
      <LineChartComponent></LineChartComponent>
    </>
  );
}
