import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FilterBarComponent from './components/FilterBarComponent';
import CardComponent from './components/CardComponent';

function App() {
  return (
    <div className="App">
      <FilterBarComponent></FilterBarComponent>
      <CardComponent></CardComponent>
      <CardComponent></CardComponent>
      <CardComponent></CardComponent>
      <CardComponent></CardComponent>
    </div>
  );
}

export default App;
