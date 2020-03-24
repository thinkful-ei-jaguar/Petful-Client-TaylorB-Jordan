import React, {Component} from 'react'
import PeopleService from '../src/services/people-services'

const ApiContext = React.createContext({
  nameSubmitted: null,
  availDog : {},
  allOtherDogs: [],
  availCat: {},
  allOtherCats: [],
  person: '',
  personPosition: '',
  people: [],
  succesfulAdopt: null,
  adoptee: {},
  human: '',
  interval1: null,
  interval2: null,
  setAvailDog: () => {},
  setAllOtherDogs : () => {},
  setAvailCat: () => {},
  setAllOtherCats: () => {},
  setPerson: () => {},
  setPeople: () => {},
  setInterval1: () => {},
  setInterval2: () => {}
});

export class ApiContextProvider extends Component {
  state = {
    availDog : {},
    allOtherDogs: [],
    availCat: {},
    allOtherCats: [],
    person: '',
    personPosition: '',
    people: [],
    interval1: null,
    interval2: null,
  };

  setAvailDog = (dog) => {
    this.setState({
      availDog: dog
    })
  }

  setAllOtherDogs = (dogs) => {
    this.setState({
      allOtherDogs: dogs
    })
  }

  setAvailCat = (cat) => {
    this.setState({
      availCat: cat
    })
  }

  setAllOtherCats = (cats) => {
    this.setState({
      allOtherCats: cats
    })
  }

  makeid(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

  addPeopleToQueue() {
    const name = this.makeid(7)
      PeopleService.postNewPerson({name})
      PeopleService.getUsersInline()
      .then(res => {
        this.setPeople(res)
        this.setState({
          people: res
        })
      })
  }

  setPerson = (human) => {
    this.setState({
      person: human
    })
  }

  setPersonPosition = (position) => {
    this.setState({
      personPosition : position
    })
  }

  setPeople = (humans) => {
    this.setState({
      people: humans
    })
  }

  setInterval1 = (interval1) => {
    this.setState({
      interval1
    })
  }

  setInterval2 = () => {
    const interval2 = setInterval(() => {
      this.addPeopleToQueue(this.setPeople)
    }, 5000);
    this.setState({
      interval2
    })
  }

  render() {
    const value = {
      availDog: this.state.availDog,
      allOtherDogs: this.state.allOtherDogs,
      availCat: this.state.availCat,
      allOtherCats: this.state.allOtherCats,
      person: this.state.person,
      personPosition: this.state.personPosition,
      people: this.state.people,
      interval1: this.state.interval1,
      interval2: this.state.interval2,
      setAvailDog: this.setAvailDog,
      setAllOtherDogs: this.setAllOtherDogs,
      setAvailCat: this.setAvailCat,
      setAllOtherCats: this.setAllOtherCats,
      setPerson: this.setPerson,
      setPersonPosition: this.setPersonPosition,
      setPeople: this.setPeople,
      setInterval1: this.setInterval1,
      setInterval2: this.setInterval2
    }
    return(
      <ApiContext.Provider value={value}>
        {this.props.children}
      </ApiContext.Provider>
    )
  }
}


export default ApiContext;