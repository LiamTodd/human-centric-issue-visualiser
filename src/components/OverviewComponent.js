import React from 'react';
import HorizontalBarChartComponent from './chartComponents/HorizontalBarChartComponent';
import LineChartComponent from './chartComponents/LineChartComponent';
import PolarAreaChartComponent from './chartComponents/PolarAreaChartComponent';
import StackedBarChartComponent from './chartComponents/StackedBarChartComponent';

export default function OverviewComponent() {
  return (
    <>
      <PolarAreaChartComponent></PolarAreaChartComponent>
      <HorizontalBarChartComponent></HorizontalBarChartComponent>
      <StackedBarChartComponent></StackedBarChartComponent>
      <LineChartComponent></LineChartComponent>
    </>
  );
}
