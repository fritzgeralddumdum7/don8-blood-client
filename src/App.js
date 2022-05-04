import { BrowserRouter as Router } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import './styles/global.css';

import Routes from './routes';

const App = () => {
  return (
    <MantineProvider>
      <Router>
        <Routes />
      </Router>
    </MantineProvider>
  );
}

export default App;
