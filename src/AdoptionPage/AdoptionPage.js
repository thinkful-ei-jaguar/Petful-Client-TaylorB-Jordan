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
      nameSubmitted : null,
      availDog : {},
      allOtherDogs: [],
      availCat: {},
      allOtherCats: [],
      person: '',
      personPosition: '',
      people: [],
      successfulAdopt : false,
      adoptee: {},
      human: ''
    }
  }

  componentDidMount() {
    const {setAvailDog, setAllOtherDogs, setAvailCat, setAllOtherCats, setPeople, setPerson, setPersonPosition} = this.context;

    // get person from local storage 
    let person = localStorage.getItem( 'Person' );

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

    // If there is a Person in local storage, then we know that user has submitted their name to adopt. Therefore we want to get and keep track of that person's place in line
    if(!!person){
      PeopleService.getUsersPlace(person)
      .then(res => {
        setPerson(res.name)
        setPersonPosition(res.position)
        this.setState({
          person: res.name,
          personPosition: res.position,
          nameSubmitted: true
        })
      }) 
    } 
  }

  handleCatAdoptClick(setAvailCat, setAllOtherCats, person, setPerson, setPersonPosition, setPeople) {
    //Uses service to make a request to remove the adopted cat from the queue
    CatService.adoptedCat()
    .then(res=> {
      console.log(res, 'res from adoptedCat')
      this.setState({
        successfulAdopt: true,
        adoptee: res.adoptee,
        human: res.human
      })
    })
    //sets the new next avail cat
    CatService.getNextAvailCat()
    .then(res => {
      setAvailCat(res)
    })
    //resets all other cats in the queue
    CatService.getAllOtherCats()
      .then(res => {
        setAllOtherCats(res)
      })
      //increments the persons place in line everytime a cat is adopted
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
      //updates the people in the line
      PeopleService.getUsersInline()
        .then(res => {
          setPeople(res)
        })
  }

  handleDogAdoptClick(setAvailDog, setAllOtherDogs, person, setPerson, setPersonPosition, setPeople) {
    //Uses service to make a request to remove the adopted dog from the queue
    DogService.adoptedDog()
    .then(res => {
      setAvailDog(res)
    })
    //resets all other dogs in the queue
    DogService.getAllOtherDogs()
    .then(res => {
      setAllOtherDogs(res)
    })
    
    //increments the persons place in line everytime a dog is adopted
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

  // handleClearSuccess() {
  //   this.setState({
  //     successfulAdopt: false
  //   })
  // }

  // renderSuccessAdopt(human, pet) {
  //   return (
  //     <div className='AP_success_adopt'>
  //       <p>Yay! {pet} was adopted by {human}!</p><span onClick={this.handleClearSuccess}> X </span>
  //     </div>
  //   )
  // }

  hanldeNameSubmit(e, setPerson, setPeople, setPersonPosition) {
    e.preventDefault();
    console.log('firing!')
    const name = e.target.name.value;
    //sets local storage with the person name just submitted
    localStorage.setItem( 'Person', name )
    //clears input value
    e.target.name.value = ''
    console.log(name, 'name from handle form')
    const newPerson = {name};
    //makes post request to server to add the new person to the queue
    PeopleService.postNewPerson(newPerson)
    this.setState({
      person: newPerson.name,
      nameSubmitted: true
    })
    setPerson(newPerson.name)
    console.log(this.context.person, 'person in context')

    //resets the people in line so the new person is included
    PeopleService.getUsersInline()
    .then(res => {
      setPeople(res)
    })
    //gets new person position in line to set 
    PeopleService.getUsersPlace(newPerson.name)
      .then(res => {
        setPerson(res.name)
        setPersonPosition(res.position)
        this.setState({
          person: res.name,
          personPosition: res.position
        })
        localStorage.setItem( 'Position', res.position )
      }) 
  }

  renderNameInput(){
    const {setPerson, setPeople, setPersonPosition} = this.context
    return (
      <section className='AP_name_input'>
        <form onSubmit={e => this.hanldeNameSubmit(e, setPerson, setPeople, setPersonPosition)} className='Name_input_form'>
          <label>Submit your name below to be added to the adoption line</label>
          <input type='text' name='name'>
          </input>
          <button type='submit' className='AP_adopt_button'>Submit</button>
        </form>
      </section>
    )
  }

  render() {
    const { availDog, allOtherDogs, availCat, allOtherCats, people, person, personPosition, setPerson, setPersonPosition, setPeople, setAvailCat, setAllOtherCats, setAvailDog, setAllOtherDogs } = this.context;

    
    return (
      <>
        <header className='AP_header_container'>
          <h2 className='AP_header'>Adoptable Pets</h2>
          <h3 className='AP_description'>Only the first human in line will be able to adopt a dog or cat. Once they have adopted their new furry friend, they will be removed from the line. Any humans not first in line will be unable to adopt until it is their turn. </h3>
        </header>

        {/* if there is a person logged in local storage, that means they have submitted their name, therefore do not show the input form - show the tracking of their place in line */}
        {!!person 
          ?  <div >
                <UsersPlace 
                  name={person} 
                  position={personPosition}
                  key={person}
                />
            </div>
          :  this.renderNameInput()
        }
           
         

        <div className='AP_people'>

          <div className='AP_people_inline'>
            <h4 className='AP_people_inline_header' style={{color: '#8CBCB9'}}>People in line: </h4>
            {people.map((human, idx) => 
              <UserList
                key={idx}
                name={human}
              />
            )}
          </div>
        </div>

        {/* render success message if successful adoption 
        {this.state.successfulAdopt ? 
        this.renderSuccessAdopt(this.state.human, this.state.adoptee.name) 
        : null} */}
        
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
              key={cat.name}
                name={cat.name} 
                breed={cat.breed} 
                age={cat.age}
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

 