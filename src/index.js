import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css';
import Chat from './components/Chat/Chat';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className="app">
      <header className="app-header">
        <h1>Joshua Project Chat</h1>
      </header>
      <main>
        <Chat />
      </main>
    </div>
  </React.StrictMode>
); 