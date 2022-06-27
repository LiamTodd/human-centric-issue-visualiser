import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import AuthenticateComponent from './components/AuthenticateComponent';
import { HashRouter, Routes, Route } from 'react-router-dom';
import OverviewComponent from './components/OverviewComponent';
import PrioritiseViewComponent from './components/PrioritiseViewComponent';
import ProgressViewComponent from './components/ProgressViewComponent';
import ListViewComponent from './components/ListViewComponent';
import TestComponent from './components/TestComponent';

function App() {
  return (
    <div className="App">
      <AuthenticateComponent></AuthenticateComponent>
      <HashRouter>
        <Navbar></Navbar>
        <div className="content">
          <Routes>
            <Route path="/" element={<OverviewComponent></OverviewComponent>} />
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
      <TestComponent></TestComponent>
    </div>
  );
}

export default App;
