import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FilterBarComponent from './components/FilterBarComponent';
import IssueList from './components/IssueList';
import { mockIssueData } from './helpers/mockData';

function App() {
  //mocking API response
  const issuesResponse = mockIssueData.items;

  return (
    <div className="App">
      <FilterBarComponent></FilterBarComponent>
      <IssueList issues={issuesResponse}></IssueList>
    </div>
  );
}

export default App;
