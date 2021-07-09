import React from 'react';
import './App.css';
import { BrowserRouter, Switch } from 'react-router-dom';
import MyProvider from './context/MyProvider';
import Table from './components/Table';
// import Filter from './components/Filter';

function App() {
  return (
    <MyProvider>
      <BrowserRouter>
        <Switch>
          {/* se tiver router, colocar aqui */}
          <Table />
        </Switch>
      </BrowserRouter>
    </MyProvider>
  );
}
export default App;
