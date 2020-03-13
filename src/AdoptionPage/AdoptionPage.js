import React, { Component} from 'react';
import NextAvailable from '../NextAvail/NextAvail'
import UsersPlace from '../UsersPlace/UsersPlace'
import InlinePets from '../InlinePets/InlinePets'

export default class AdoptionPage extends Component {
  render() {
    return (
      <>
        <h1>Adoptable Pets</h1>
        <p>description of how adoption pets works</p>

        <div className='AP_cats'>
          <NextAvailable />
          <button className='AP_adopt_button' type='button'>
            Adopt!
          </button>

          <InlinePets />
        </div>

        <div className='AP_dogs'>
          <NextAvailable />
          <button className='AP_adopt_button' type='button'>
            Adopt!
          </button>

          <InlinePets />
        </div >

        <div className='AP_people'>
          <UsersPlace />
          <p>People in line before you: </p>
          {/* List of people in line before the user */}
        </div>
      </>
    )
  }
}

 