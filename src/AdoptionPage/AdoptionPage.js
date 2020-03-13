import React, { Component} from 'react';
import config from '../config'

import NextAvail from '../NextAvail/NextAvail'
import UsersPlace from '../UsersPlace/UsersPlace'
import InlinePets from '../InlinePets/InlinePets'
import DogService from '../services/dog-services';
import CatService from '../services/cat-services'
// import PeopleService from '../services/people-services'
import ApiContext from '../ApiContext'

export default class AdoptionPage extends Component {
  static contextType = ApiContext;

  componentDidMount() {
    const {setAvailDog, setAllOtherDogs, setAvailCat, setAllOtherCats} = this.context;
    // DogService.getNextAvailDog()
    //   .then(res => {
    //     setAvailDog(res)
    //   })

    // DogService.getAllOtherDogs()
    //   .then(res => {
    //     setAllOtherDogs(res)
    //   })

    CatService.getNextAvailCat()
      .then(res => {
        setAvailCat(res)
      })

    // CatService.getAllOtherCats()
    //   .then(res => {
    //     setAllOtherCats(res)
    //   })
  }

  render() {
    const { availDog, allOtherDogs, availCat, allOtherCats } = this.context;

    
    return (
      <>
        <h1>Adoptable Pets</h1>
        <p>description of how adoption pets works</p>

        <div className='AP_cats'>
          <NextAvail 
            name={availCat.name} 
            age={availCat.age} 
            breed={availCat.breed} 
            desc={availCat.description} 
            gender={availCat.gender} 
            story={availCat.story} 
            image={availCat.imageURL}
          />
          <button className='AP_adopt_button' type='button'>
            Adopt!
          </button>

          <InlinePets 
            name='' 
            breed='' 
            age=''
          />
        </div>

        <div className='AP_dogs'>
          <NextAvail 
            name={availDog.name} 
            age={availDog.age} 
            breed={availDog.breed} 
            desc={availDog.description}
            gender={availDog.gender} 
            story={availDog.story}
          />
          <button className='AP_adopt_button' type='button'>
            Adopt!
          </button>

          <InlinePets 
            name='' 
            breed='' 
            age=''
          />
        </div >

        <div className='AP_people'>
          <UsersPlace 
            name='' 
            position=''
          />

          <p>People in line before you: </p>
          {/* List of people in line before the user */}
        </div>
      </>
    )
  }
}

 