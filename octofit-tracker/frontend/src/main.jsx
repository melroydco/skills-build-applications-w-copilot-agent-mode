import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App'
import './index.css'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Unable to find the application root element.')
}

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const environment = codespaceName ? `Codespaces (${codespaceName})` : 'Local development'

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App environment={environment} />
    </BrowserRouter>
  </React.StrictMode>,
)
