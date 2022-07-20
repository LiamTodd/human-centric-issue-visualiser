import React from 'react';
import { READY_KEY } from '../helpers/localStorageKeys';
import HorizontalBarChartComponent from './chartComponents/HorizontalBarChartComponent';
import PolarAreaChartComponent from './chartComponents/PolarAreaChartComponent';
import PriorityBarChartComponent from './chartComponents/PriorityBarChartComponent';
import StackedBarChartComponent from './chartComponents/StackedBarChartComponent';
import UnAuthenticatedDefault from './UnAuthenticatedDefault';

export default function OverviewComponent() {
  const polarChartDescription =
    'This chart provides a visualisation of the relative amounts of different Human Centric Issues identified in the GitHub repository. The colours correspond to the different Human Centric Issue categories, while the radius corresponds to the number of times a type of Human Centric Issue has been identified within the repository. Note that each issue in the repository may be assigned more than one Human Centric Issue tag.';
  const polarChartUseCase =
    'This chart can be used to identify what types of Human Centric Issues are/are not appearing frequently in the repository, and thus can help lead discussions regarding how to focus development efforts towards creating an application which is conscious of Human Centric Issues.';

  const horizontalChartDescription =
    'This chart provides an overview of the progress status of each issue in the repository. Each bar corresponds to one of the four possible statuses (including "unassigned"), and the length of each bar corresponds to the number of issues in the GitHub repository with said progress status.';
  const horizontalChartUseCase =
    'This chart can be used to monitor whether the issues in the repository are being attended to or not, and can help ensure that there is not a pile-up of issues which are not being attended to.';

  const stackedBarChartDescription =
    'This chart provides a comprehensive summary of how the different Human Centric Issue categories have been identified in the GitHub repository over time. The horizontal axis corresponds to the dates at which issues have been raised in the GitHub repository, while the colours and length of the bars show how many of each Human Centric Issue tag has been applied to said issue(s) on each day. Colour is used to distinguish between the various Human Centric Issue categorisations.';
  const stackedBarChartUseCase =
    'This chart can be used to analyse how, at different stages of the software lifecycle, different types of Human Centric Issues become more and less relevant. For example, during the maintentance phase, there may be an increase in "User Reaction" Human Centric Issues. This information can help guide the focus of the team(s), behind the software throughout the software lifecycle.';

  const verticalBarChartDescription =
    'This chart provides a simple overview of the prioritisation levels of all issues in the GitHub repository. Each bar corresponds to one of the four possible priority levels (including "unassigned"), and the height of each bar corresponds to the number of issues in the GitHub repository with said prioritisation level.';
  const verticalBarChartUseCase =
    "This chart can be used to easily gauge the level of urgency with which the repository's issues need to be attended to.";

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
                width: '30%',
                paddingRight: '5%'
              }}
            >
              <div style={{ fontSize: 'larger' }}>{polarChartDescription}</div>
              <p></p>
              {polarChartUseCase}
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
                width: '70%'
              }}
            >
              <HorizontalBarChartComponent></HorizontalBarChartComponent>
            </div>
            <div
              style={{ width: '30%', paddingTop: '5vh', paddingRight: '5%' }}
            >
              <div style={{ fontSize: 'larger' }}>
                {horizontalChartDescription}
              </div>
              <p></p>
              {horizontalChartUseCase}
            </div>
          </div>

          <div
            style={{
              // display: 'flex',
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
                width: '90%'
              }}
            >
              <StackedBarChartComponent></StackedBarChartComponent>
            </div>
            <div
              style={{
                paddingTop: '5vh',
                paddingLeft: '5%',
                paddingRight: '5%'
              }}
            >
              <div style={{ fontSize: 'larger' }}>
                {stackedBarChartDescription}
              </div>
              <p></p>
              {stackedBarChartUseCase}
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
            <div
              style={{ width: '30%', paddingTop: '5vh', paddingRight: '5%' }}
            >
              <div style={{ fontSize: 'larger' }}>
                {verticalBarChartDescription}
              </div>
              <p></p>
              {verticalBarChartUseCase}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
