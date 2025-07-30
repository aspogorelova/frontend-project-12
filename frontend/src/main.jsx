import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { Provider } from 'react-redux';
import store from './store/store.js';
//import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App.jsx';

const mountNode = document.getElementById('chat');
const root = createRoot(mountNode);
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
)
