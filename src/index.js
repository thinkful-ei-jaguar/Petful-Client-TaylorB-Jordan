import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import Root from './root/Root'
import './index.css'

ReactDOM.render(
  <BrowserRouter>
    <Root />
  </BrowserRouter>
  , 
  document.getElementById('root')
);
