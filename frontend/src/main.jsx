import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import { Provider } from 'react-redux'
import store from './store/store.js'
import { createRoot } from 'react-dom/client'
import App from './components/App.jsx'
import { I18nextProvider } from 'react-i18next'
import i18next from './i18next.js'
import React from 'react'
import rollbar from '../../rollbar.config.js'

rollbar.info('React app started')

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    rollbar.error(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <h1>Что-то пошло не так.</h1>
    }
    return this.props.children
  }
}

const mountNode = document.getElementById('chat')
const root = createRoot(mountNode)
root.render(
  <ErrorBoundary>
    <Provider store={store}>
      <I18nextProvider i18n={i18next}>
        <App />
      </I18nextProvider>
    </Provider>
  </ErrorBoundary>,
)
