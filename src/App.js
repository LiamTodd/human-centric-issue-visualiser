import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/NavbarComponent';
import AuthenticateComponent from './components/AuthenticateComponent';
import { HashRouter, Routes, Route } from 'react-router-dom';
import OverviewComponent from './components/OverviewComponent';
import PrioritiseViewComponent from './components/PrioritiseViewComponent';
import ProgressViewComponent from './components/ProgressViewComponent';
import ListViewComponent from './components/ListViewComponent';
import ManualCorrectionViewComponent from './components/ManualCorrectionViewComponent';
import { useState } from 'react';
import * as linkStatuses from './helpers/linkStatuses';
import TipPopUpComponent from './components/TipPopUpComponent';
import * as localStorageKeys from './helpers/localStorageKeys';
import CleanRepoViewComponent from './components/CleanRepoViewComponent';

function App() {
  let initStatus = linkStatuses.unlinkedState;
  if (
    localStorage.getItem(localStorageKeys.ISSUES_KEY) != null &&
    localStorage.getItem(localStorageKeys.CREDENTIALS_KEY) != null
  ) {
    initStatus = linkStatuses.readyState;
  }
  const [linkStatus, setLinkStatus] = useState(initStatus);

  return (
    <div className="App">
      <div
        style={{ position: 'fixed', bottom: '5%', right: '5%', zIndex: '100' }}
      >
        <TipPopUpComponent></TipPopUpComponent>
      </div>
      {
        <HashRouter>
          <Navbar></Navbar>
          <div className="content">
            <Routes>
              <Route
                path="/overview"
                element={
                  <OverviewComponent
                    linkStatus={linkStatus}
                  ></OverviewComponent>
                }
              />
              <Route
                path="/list"
                element={
                  <ListViewComponent
                    linkStatus={linkStatus}
                  ></ListViewComponent>
                }
              />
              <Route
                path="/prioritise"
                element={
                  <PrioritiseViewComponent
                    linkStatus={linkStatus}
                  ></PrioritiseViewComponent>
                }
              />
              <Route
                path="/progress"
                element={
                  <ProgressViewComponent
                    linkStatus={linkStatus}
                  ></ProgressViewComponent>
                }
              />
              <Route
                path="/"
                element={
                  <AuthenticateComponent
                    linkStatus={linkStatus}
                    setLinkStatus={setLinkStatus}
                  ></AuthenticateComponent>
                }
              />
              <Route
                path="/correction"
                element={
                  <ManualCorrectionViewComponent
                    linkStatus={linkStatus}
                  ></ManualCorrectionViewComponent>
                }
              />
              <Route
                path="/clear"
                element={
                  <CleanRepoViewComponent
                    linkStatus={linkStatus}
                    setLinkStatus={setLinkStatus}
                  ></CleanRepoViewComponent>
                }
              />
            </Routes>
          </div>
        </HashRouter>
      }
    </div>
  );
}

export default App;
