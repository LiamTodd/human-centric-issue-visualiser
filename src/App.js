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

function App() {
  const [linkStatus, setLinkStatus] = useState(linkStatuses.unlinkedState);

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
            </Routes>
          </div>
        </HashRouter>
      }
    </div>
  );
}

export default App;
