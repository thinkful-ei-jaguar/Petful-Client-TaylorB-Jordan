import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from '../Home/Home';
import AdoptionPage from '../AdoptionPage/AdoptionPage';
// import AddPet from '';

class Root extends Component {

  render() {
    return (
      <main className='App'>
        <h1 className='Root_header'>
          Petful
        </h1>
        <Switch>
          <Route 
          exact path='/'
          component={Home}
          />
          <Route 
          path='/adoption-page'
          component={AdoptionPage}
          />
          {/* <Route 
          path='add-pet'
          component={AddPet}
          /> */}
        </Switch>
      </main>
    )
  }
}

export default Root