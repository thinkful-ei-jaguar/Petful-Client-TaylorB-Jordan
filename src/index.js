import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import Root from './root/Root'
import { ApiContextProvider } from './ApiContext'
import './index.css'

ReactDOM.render(
  <BrowserRouter>
    <ApiContextProvider>
      <Root />
    </ApiContextProvider>
  </BrowserRouter>
  , 
  document.getElementById('root')
);
