import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes } from 'react-router';
import RouteConfig from './RouteConfig.jsx';
import './index.css'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <RouteConfig />
  </BrowserRouter>
)
