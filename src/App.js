import logo from './logo.svg';
import './App.css';
import Layout from './components/layout';

function App() {
  window.api = 'https://dev-api.wall.app/api/v1/core/campaigns';

  return (
    <div className="App">
      <Layout />
    </div>
  );
}

export default App;
