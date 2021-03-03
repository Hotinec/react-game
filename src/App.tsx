import React from 'react';
import { Route } from 'react-router-dom'
import Game from './pages/Game';
import Statistics from './pages/Statistics';

const App: React.FC = () => {
  return (
    <div className="app">
      <Route path="/" component={Game} exact />
      <Route path="/statistics" component={Statistics} />
    </div>
  );
}

export default App;
