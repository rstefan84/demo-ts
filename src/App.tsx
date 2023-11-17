import React from 'react';
import './App.css';
import { getElementDataList } from './model';
import ElementsView from './components/ElementsView';

function App() {
  return (
    <ElementsView elements={getElementDataList()} currentPage={1} showPerPage={4} />
  );
}

export default App;
