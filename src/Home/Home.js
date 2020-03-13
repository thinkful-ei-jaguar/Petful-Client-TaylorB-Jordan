import React, { Component} from 'react';
import { Link } from 'react-router-dom';

export default class Home extends Component {
  render() {
    return (
      <>
        <header>Welcome to Petful</header>
        <p>description of how Petful works</p>

        <img src='' alt=''/>

        <button type='button' className='Home_button'>
          <Link to='/adoption-page'>
            Adoptable Pets
          </Link>
        </button>
      </>
    )
  }
}