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

function App() {
  return (
    <div className="App">
      {
        <HashRouter>
          <Navbar></Navbar>
          <div className="content">
            <Routes>
              <Route
                path="/overview"
                element={<OverviewComponent></OverviewComponent>}
              />
              <Route
                path="/list"
                element={<ListViewComponent></ListViewComponent>}
              />
              <Route
                path="/prioritise"
                element={<PrioritiseViewComponent></PrioritiseViewComponent>}
              />
              <Route
                path="/progress"
                element={<ProgressViewComponent></ProgressViewComponent>}
              />
              <Route
                path="/"
                element={<AuthenticateComponent></AuthenticateComponent>}
              />
              <Route
                path="/correction"
                element={
                  <ManualCorrectionViewComponent></ManualCorrectionViewComponent>
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
