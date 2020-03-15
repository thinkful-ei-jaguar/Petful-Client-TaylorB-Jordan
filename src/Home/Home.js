import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import homeImg from './petful-cat-dog.jpg'
import PeopleService from '../services/people-services'
import ApiContext from '../ApiContext'
import './Home.css'

export default class Home extends Component {
  static contextType = ApiContext

  handleAdoptClick = () => {
    const {setPerson} = this.context
    const newPerson = {name: 'Thinkful'}
    PeopleService.postNewPerson(newPerson)
    setPerson(newPerson.name)
  }

  render() {
    const {person} = this.context
    return (
      <>
        <h2 className='Home_header'>Welcome to Petful</h2>
        <p className='Home_description'>description of how Petful works</p>

        <div className='Home_image'>
          <img src={homeImg} alt='cute cat and dog'/>
        </div>


        <div className='Home_button_container'>
          <label className='Home_label'>
            Click  Here to Get In Line and Begin the Adoption Process
          </label>
          <button type='button' className='Home_button' onClick={() => this.handleAdoptClick(person)}>
            <Link to='/adoption-page' className='Home_button'>
              Adoptable Pets
            </Link>
          </button>
        </div>
       
      </>
    )
  }
}