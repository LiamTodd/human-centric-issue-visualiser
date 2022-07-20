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
              borderBottom: '2px solid lightgrey',
              paddingBottom: '25px',
              paddingTop: '25px'
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '70%'
              }}
            >
              <PolarAreaChartComponent></PolarAreaChartComponent>
            </div>
            <div
              style={{
                paddingTop: '5vh',
                width: '25%'
              }}
            >
              test test test testtest testtest testtest testtest testtest
              testtest testtest test test testtest testtest testtest testtest
              testtest testtest testtest testtest testtest testtest test
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              paddingTop: '25px',
              paddingBottom: '25px',
              borderBottom: '2px solid lightgrey'
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '80%'
              }}
            >
              <HorizontalBarChartComponent></HorizontalBarChartComponent>
            </div>
            <div style={{ width: '15%', paddingTop: '5vh' }}>
              test test test testtest testtest testtest testtest testtest
              testtest testtest test test testtest testtest testtest testtest
              testtest testtest testtest testtest testtest testtest test
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              borderBottom: '2px solid lightgrey',
              paddingBottom: '25px',
              paddingTop: '25px'
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '75%'
              }}
            >
              <StackedBarChartComponent></StackedBarChartComponent>
            </div>
            <div style={{ width: '20%', paddingTop: '5vh', paddingLeft: '5%' }}>
              test test test testtest testtest testtest testtest testtest
              testtest testtest test test testtest testtest testtest testtest
              testtest testtest testtest testtest testtest testtest test
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              borderBottom: '2px solid lightgrey',
              paddingBottom: '25px',
              paddingTop: '25px'
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '80%'
              }}
            >
              <PriorityBarChartComponent></PriorityBarChartComponent>
            </div>
            <div style={{ width: '15%', paddingTop: '5vh' }}>
              test test test testtest testtest testtest testtest testtest
              testtest testtest test test testtest testtest testtest testtest
              testtest testtest testtest testtest testtest testtest test
            </div>
          </div>
        </div>
      )}
    </>
  );
}
