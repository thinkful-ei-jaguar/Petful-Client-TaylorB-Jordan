import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import PeopleService from '../services/people-services'
import ApiContext from '../ApiContext'

export default class Home extends Component {
  static contextType = ApiContext
  handleAdoptClick = (e) => {
    const {setPerson, people} = this.context
    const newPerson = {name: 'Thinkful'}
    PeopleService.postNewPerson(newPerson)

    const lastPerson = people.filter(human => human.name !== newPerson.name)
    setPerson(lastPerson)
  }
  render() {
    return (
      <>
        <header>Welcome to Petful</header>
        <p>description of how Petful works</p>

        <img src='' alt=''/>

        <button type='button' className='Home_button' onClick={(e) => this.handleAdoptClick(e)}>
          <Link to='/adoption-page'>
            Adoptable Pets
          </Link>
        </button>
      </>
    )
  }
}