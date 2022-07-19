import React from 'react';
import { READY_KEY } from '../helpers/localStorageKeys';
import HorizontalBarChartComponent from './chartComponents/HorizontalBarChartComponent';
import PolarAreaChartComponent from './chartComponents/PolarAreaChartComponent';
import PriorityBarChartComponent from './chartComponents/PriorityBarChartComponent';
import StackedBarChartComponent from './chartComponents/StackedBarChartComponent';
import UnAuthenticatedDefault from './UnAuthenticatedDefault';

export default function OverviewComponent() {
  return (
    <>
      {!JSON.parse(localStorage.getItem(READY_KEY)) && (
        <UnAuthenticatedDefault></UnAuthenticatedDefault>
      )}

      {JSON.parse(localStorage.getItem(READY_KEY)) && (
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
              alignItems: 'center',
              width: '90%'
            }}
          >
            <StackedBarChartComponent></StackedBarChartComponent>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '90%'
            }}
          >
            <PriorityBarChartComponent></PriorityBarChartComponent>
          </div>
        </div>
      )}
    </>
  );
}
