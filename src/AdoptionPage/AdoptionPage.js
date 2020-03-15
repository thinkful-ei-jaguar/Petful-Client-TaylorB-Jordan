import React, { Component} from 'react';

import NextAvail from '../NextAvail/NextAvail'
import UserList from '../UserList/UserList'
import UsersPlace from '../UsersPlace/UsersPlace'
import InlinePets from '../InlinePets/InlinePets'
import DogService from '../services/dog-services';
import CatService from '../services/cat-services'
import PeopleService from '../services/people-services'
import ApiContext from '../ApiContext'
import './AdoptionPage.css'

export default class AdoptionPage extends Component {
  static contextType = ApiContext;
  constructor(props) {
    super(props)
    this.state ={ 
      availDog : {},
      allOtherDogs: [],
      availCat: {},
      allOtherCats: [],
      person: ''
    }
  }

  componentDidMount() {
    const {setAvailDog, setAllOtherDogs, setAvailCat, setAllOtherCats, setPeople, person, setPerson, setPersonPosition} = this.context;
    console.log(person, 'person from context')

    DogService.getNextAvailDog()
      .then(res => {
        setAvailDog(res)
      })

    DogService.getAllOtherDogs()
      .then(res => {
        setAllOtherDogs(res)
      })

    CatService.getNextAvailCat()
      .then(res => {
        setAvailCat(res)
      })

    CatService.getAllOtherCats()
      .then(res => {
        setAllOtherCats(res)
      })

    PeopleService.getUsersInline()
    .then(res => {
      setPeople(res)
    })

    PeopleService.getUser()
      .then(res => {
        setPerson(res)
      })

    PeopleService.getUsersPlace(person)
      .then(res => {
        console.log(res, 'res from position endpoint')
        setPersonPosition(res)
      }) 
  }

  handleCatAdoptClick(setAvailCat, setAllOtherCats) {
    CatService.adoptedCat()
    .then(res=> {
      setAvailCat(res)
    })

    CatService.getAllOtherCats()
      .then(res => {
        setAllOtherCats(res)
      })
  }

  handleDogAdoptClick(setAvailDog, setAllOtherDogs) {
    DogService.adoptedDog()
    .then(res => {
      setAvailDog(res)
    })

    DogService.getAllOtherDogs()
    .then(res => {
      setAllOtherDogs(res)
    })
  }

  render() {
    const { availDog, allOtherDogs, availCat, allOtherCats, person, personPosition, people, setAvailCat, setAllOtherCats, setAvailDog, setAllOtherDogs } = this.context;
    
    return (
      <>
        <h2 className='AP_header'>Adoptable Pets</h2>
        <h3 className='AP_description'>description of how adoption pets works</h3>

        <div className='AP_pets_container'>
          <div className='AP_cats'>
            <p className='AP_next_avail'>Adoptable Cat</p> 
            <NextAvail 
              name={availCat.name} 
              age={availCat.age} 
              breed={availCat.breed} 
              desc={availCat.description} 
              gender={availCat.gender} 
              story={availCat.story} 
              image={availCat.imageURL}
              key={availCat.name}
            />
            <button className='AP_adopt_button' type='button' onClick={() => this.handleCatAdoptClick(setAvailCat, setAllOtherCats)}>
              Adopt!
            </button>
            <p className='AP_next_avail'>Next Available Cats</p> 
            {allOtherCats.map(cat => 
              <InlinePets 
                name={cat.name} 
                breed={cat.breed} 
                age={cat.age}
                key={cat.name}
              />
            )}
          </div>
          
          <div className='AP_dogs'>
          <p className='AP_next_avail'>Adoptable Dog</p> 
            <NextAvail 
              name={availDog.name} 
              age={availDog.age} 
              breed={availDog.breed} 
              desc={availDog.description}
              gender={availDog.gender} 
              story={availDog.story}
              image={availDog.imageURL}
              key={availDog.name}
            />
            <button className='AP_adopt_button' type='button' onClick={() => this.handleDogAdoptClick(setAvailDog, setAllOtherDogs)}>
              Adopt!
            </button>

            <p className='AP_next_avail'>Next Available Dogs</p> 
            {allOtherDogs.map(dog => 
              <InlinePets 
                name={dog.name} 
                breed={dog.breed} 
                age={dog.age}
                key={dog.name}
              />
            )}
          </div >
        </div>
        
        <div className='AP_people'>
          <UsersPlace 
            name={person} 
            position={personPosition}
            key={person}
          />

          <div className='AP_people_inline'>
            <p>People in line before you: </p>
            {people.map(human => 
              <UserList
                name={human}
              />
            )}
          </div>
        </div>
      </>
    )
  }
}

 