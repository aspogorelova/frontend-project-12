import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/App.jsx';

createRoot(document.getElementById('chat')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
