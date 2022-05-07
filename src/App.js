import { BrowserRouter as Router } from 'react-router-dom';
import Main from './components/Main';
import './styles/global.css';

import Routes from './routes';

const App = () => {
  return (
    <Main>
      <Router>
        <Routes />
      </Router>
    </Main>
  );
}

export default App;
