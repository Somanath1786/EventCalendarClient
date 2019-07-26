import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './store'
import MainPage from './MainPage';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <MainPage/>
      </Provider>
    </div>
  );
}

export default App;
