import React, {Component} from 'react'

const ApiContext = React.createContext({
  availDog : {},
  allOtherDogs: [],
  availCat: {},
  allOtherCats: [],
  setAvailDog: () => {},
  setAllOtherDogs : () => {},
  setAvailCat: () => {},
  setAllOtherCats: () => {},
});

export class ApiContextProvider extends Component {
  state = {
    availDog : {},
    allOtherDogs: [],
    availCat: {},
    allOtherCats: [],
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

  handleCatAdopted = () => {
    
  }

  render() {
    const value = {
      availDog: this.state.availDog,
      allOtherDogs: this.state.allOtherDogs,
      availCat: this.state.availCat,
      allOtherCats: this.state.allOtherCats,
      setAvailDog: this.setAvailDog,
      setAllOtherDogs: this.setAllOtherDogs,
      setAvailCat: this.setAvailCat,
      setAllOtherCats: this.setAllOtherCats,
    }
    return(
      <ApiContext.Provider value={value}>
        {this.props.children}
      </ApiContext.Provider>
    )
  }
}


export default ApiContext;