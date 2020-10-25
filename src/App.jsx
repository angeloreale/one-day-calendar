import React from 'react';
import Calendar from './components/Calendar/Calendar';
import {
  EVENTS,
} from './components/Calendar/constants';

import './styles/main.scss';

function App() {
  return (
    <div className="App">
      <Calendar loadedEvents={EVENTS} />
    </div>
  );
}

export default App;
