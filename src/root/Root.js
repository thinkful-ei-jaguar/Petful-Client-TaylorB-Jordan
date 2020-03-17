import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from '../Home/Home';
import AdoptionPage from '../AdoptionPage/AdoptionPage';
import '../Home/Home.css'
// import AddPet from '';

class Root extends Component {

  render() {
    return (
      <main className='App'>
        <header className='Root_header'>
          <div>
            Petful
          </div>
        </header>
        
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