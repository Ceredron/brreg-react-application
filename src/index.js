import React from 'react';
import ReactDOM from 'react-dom';
import MainScreen from './MainScreen';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<MainScreen />, document.getElementById('root'));
registerServiceWorker();
