import React from 'react';
import './App.css';
import { getElementDataList } from './model';
import ElementsView from './components/ElementsView';
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <ElementsView elements={getElementDataList()} currentPage={1} showPerPage={4} />
    </Provider>
  );
}

export default App;
