import React, {Component} from 'react'

const ApiContext = React.createContext({
  availDog : {},
  allOtherDogs: [],
  availCat: {},
  allOtherCats: [],
  person: {},
  people: [],
  setAvailDog: () => {},
  setAllOtherDogs : () => {},
  setAvailCat: () => {},
  setAllOtherCats: () => {},
  setPerson: () => {},
  setPeople: () => {}
});

export class ApiContextProvider extends Component {
  state = {
    availDog : {},
    allOtherDogs: [],
    availCat: {},
    allOtherCats: [],
    person: '',
    people: []
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

  setPerson = (human) => {
    this.setState({
      person: human
    })
  }

  setPeople = (humans) => {
    this.setState({
      people: humans
    })
  }

  render() {
    const value = {
      availDog: this.state.availDog,
      allOtherDogs: this.state.allOtherDogs,
      availCat: this.state.availCat,
      allOtherCats: this.state.allOtherCats,
      person: this.state.person,
      people: this.state.people,
      setAvailDog: this.setAvailDog,
      setAllOtherDogs: this.setAllOtherDogs,
      setAvailCat: this.setAvailCat,
      setAllOtherCats: this.setAllOtherCats,
      setPerson: this.setPerson,
      setPeople: this.setPeople
    }
    return(
      <ApiContext.Provider value={value}>
        {this.props.children}
      </ApiContext.Provider>
    )
  }
}


export default ApiContext;