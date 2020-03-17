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
      person: '',
      personPosition: '',
      successfulAdopt : false,
      adoptee: {},
      human: ''
    }
  }

  componentDidMount() {
    const {setAvailDog, setAllOtherDogs, setAvailCat, setAllOtherCats, setPeople, person, setPerson, setPersonPosition} = this.context;

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

    PeopleService.getUsersPlace(person)
      .then(res => {
        setPerson(res.name)
        setPersonPosition(res.position)
        this.setState({
          person: res.name,
          personPosition: res.position
        })
      }) 
  }

  handleCatAdoptClick(setAvailCat, setAllOtherCats, person, setPerson, setPersonPosition, setPeople) {
    
    CatService.adoptedCat()
    .then(res=> {
      console.log(res, 'res from adoptedCat')
      this.setState({
        successfulAdopt: true,
        adoptee: res.adoptee,
        human: res.human
      })
    })

    CatService.getNextAvailCat()
    .then(res => {
      setAvailCat(res)
    })

    CatService.getAllOtherCats()
      .then(res => {
        setAllOtherCats(res)
      })

      PeopleService.getUsersPlace(this.state.person)
      .then(res => {
        console.log(res, 'res from people service')
        setPerson(res.name)
        setPersonPosition(res.position)
        this.setState({
          person: res.name,
          personPosition: res.position
        })
      }) 

      PeopleService.getUsersInline()
        .then(res => {
          setPeople(res)
        })
  }

  handleDogAdoptClick(setAvailDog, setAllOtherDogs, person, setPerson, setPersonPosition, setPeople) {
    DogService.adoptedDog()
    .then(res => {
      setAvailDog(res)
    })

    DogService.getAllOtherDogs()
    .then(res => {
      setAllOtherDogs(res)
    })

    PeopleService.getUsersPlace(this.state.person)
      .then(res => {
        setPerson(res.name)
        setPersonPosition(res.position)
        this.setState({
          person: res.name,
          personPosition: res.position
        })
      }) 

    PeopleService.getUsersInline()
      .then(res => {
        setPeople(res)
      })
  }

  handleClearSuccess() {
    this.setState({
      successfulAdopt: false
    })
  }

  renderSuccessAdopt(human, pet) {
    return (
      <div className='AP_success_adopt'>
        <p>Yay! {pet} was adopted by {human}!</p><span onClick={this.handleClearSuccess}> X </span>
      </div>
    )
  }

  render() {
    const { availDog, allOtherDogs, availCat, allOtherCats, people, person, personPosition, setPerson, setPersonPosition, setPeople, setAvailCat, setAllOtherCats, setAvailDog, setAllOtherDogs } = this.context;

    
    return (
      <>
        <header className='AP_header_container'>
          <h2 className='AP_header'>Adoptable Pets</h2>
          <h3 className='AP_description'>The Cats and Dogs who have been here the longest get adopted first. Adopters first in line get paired with a pet first.</h3>
        </header>

        <div className='AP_people'>
          <div >
            <UsersPlace 
              name={person} 
              position={personPosition}
              key={person}
            />
          </div>

          <div className='AP_people_inline'>
            <h4 className='AP_people_inline_header' style={{color: '#8CBCB9'}}>People in line: </h4>
            {people.map(human => 
              <UserList
                name={human}
              />
            )}
          </div>
        </div>

        {/* render success message if successful adoption  */}
        {this.state.successfulAdopt ? 
        this.renderSuccessAdopt(this.state.human, this.state.adoptee.name) 
        : null}
        
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
            <div className='AP_adopt_button'>
              <button className='AP_adopt_button' type='button' onClick={() => this.handleCatAdoptClick(setAvailCat, setAllOtherCats, person, setPerson, setPersonPosition, setPeople)}>
                Adopt!
              </button>
            </div>
           
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

            <div className='AP_adopt_button'>
              <button className='AP_adopt_button' type='button' onClick={() => this.handleDogAdoptClick(setAvailDog, setAllOtherDogs, person, setPerson, setPersonPosition, setPeople)}>
                Adopt!
              </button>
            </div>
            

            <p className='AP_next_avail'>Next Available Dogs</p> 
            {allOtherDogs.map(dog => 
              <InlinePets 
                name={dog.name} 
                breed={dog.breed} 
                age={dog.age}
                key={dog.name}
              />
            )}
          </div>
        </div>
        
      </>
    )
  }
}

 