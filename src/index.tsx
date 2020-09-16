import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './components/App'
import * as serviceWorker from './serviceWorker'

import { ThemeProvider } from '@material-ui/core'
import theme from './styles/theme'

import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
