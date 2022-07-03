import React from 'react';
import LineChartComponent from './chartComponents/LineChartComponent';
import PolarAreaChartComponent from './chartComponents/PolarAreaChartComponent';
import StackedBarChartComponent from './chartComponents/StackedBarChartComponent';

export default function OverviewComponent() {
  return (
    <>
      <PolarAreaChartComponent></PolarAreaChartComponent>
      <StackedBarChartComponent></StackedBarChartComponent>
      <LineChartComponent></LineChartComponent>
    </>
  );
}
