import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { Provider } from 'react-redux';
import store from './store/store.js';
import { createRoot } from 'react-dom/client';
import App from './components/App.jsx';
import { I18nextProvider } from 'react-i18next';
import i18next from './i18next.js';

const mountNode = document.getElementById('chat');
const root = createRoot(mountNode);
root.render(
  <Provider store={store}>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </Provider>,
)
