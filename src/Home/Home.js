import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import homeImg from './petful-cat-dog.jpg'
import PeopleService from '../services/people-services'
import ApiContext from '../ApiContext'
import './Home.css'

export default class Home extends Component {
  static contextType = ApiContext

  handleAdoptClick = (e) => {
    const {setPerson, people} = this.context
    const newPerson = {name: 'Thinkful'}
    PeopleService.postNewPerson(newPerson)
      .then(res => {
        setPerson(res)
      })

    const lastPerson = people.filter(human => human.name !== newPerson.name)
    // setPerson(lastPerson)
    
  }
  render() {
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
          <button type='button' className='Home_button' onClick={(e) => this.handleAdoptClick(e)}>
            <Link to='/adoption-page' className='Home_button'>
              Adoptable Pets
            </Link>
          </button>
        </div>
       
      </>
    )
  }
}