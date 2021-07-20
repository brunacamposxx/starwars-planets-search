import React from 'react';
import './App.css';
import { BrowserRouter, Switch } from 'react-router-dom';
import MyProvider from './context/MyProvider';
import Table from './components/Table';

function App() {
  return (
    <MyProvider>
      <BrowserRouter>
        <Switch>
          <Table />
        </Switch>
      </BrowserRouter>
    </MyProvider>
  );
}
export default App;
