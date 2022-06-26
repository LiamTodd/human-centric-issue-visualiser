import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FilterBarComponent from './components/FilterBarComponent';
import IssueList from './components/IssueList';
import TestComponent from './components/TestComponent';
import Navbar from './components/Navbar';
import AuthenticateComponent from './components/AuthenticateComponent';
import { HashRouter, Routes, Route } from 'react-router-dom';
import OverviewComponent from './components/OverviewComponent';
import PrioritiseViewComponent from './components/PrioritiseViewComponent';
import ProgressViewComponent from './components/ProgressViewComponent';
import ListViewComponent from './components/ListViewComponent';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Navbar></Navbar>
        <div className="content">
          <Routes>
            <Route
              exact
              path="/"
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
          </Routes>
        </div>
      </HashRouter>
      <AuthenticateComponent></AuthenticateComponent>
      <FilterBarComponent></FilterBarComponent>
      <IssueList></IssueList>
      {/* <TestComponent></TestComponent> */}
    </div>
  );
}

export default App;
