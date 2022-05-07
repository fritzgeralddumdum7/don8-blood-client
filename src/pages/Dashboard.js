import logo from '../logo.svg';
import { Button } from '@mantine/core';
import { Test } from '@/services';

const Dashboard = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Button onClick={() => {
          Test.getTest()
        }}>CLICK FOR API</Button>
      </header>
    </div>
  );
}

export default Dashboard;
