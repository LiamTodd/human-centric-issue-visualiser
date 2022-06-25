import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FilterBarComponent from './components/FilterBarComponent';
import IssueList from './components/IssueList';
import TestComponent from './components/TestComponent';
import { mockIssueData } from './helpers/mockData';

function App() {
  return (
    <div className="App">
      <FilterBarComponent></FilterBarComponent>
      <IssueList></IssueList>
      <TestComponent></TestComponent>
    </div>
  );
}

export default App;
