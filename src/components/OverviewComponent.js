import React from 'react';
import HorizontalBarChartComponent from './chartComponents/HorizontalBarChartComponent';
import PolarAreaChartComponent from './chartComponents/PolarAreaChartComponent';
import StackedBarChartComponent from './chartComponents/StackedBarChartComponent';

export default function OverviewComponent() {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <PolarAreaChartComponent></PolarAreaChartComponent>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <HorizontalBarChartComponent></HorizontalBarChartComponent>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <StackedBarChartComponent></StackedBarChartComponent>
      </div>
    </div>
  );
}
