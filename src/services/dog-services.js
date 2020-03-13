import config from '../config'

const DogService = {
  getNextAvailDog() {
    fetch(`${config.API_ENDPOINT}/pets/dog`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(res => {
      if (!res.ok) {
        Promise.reject()
      }
      console.log(res, 'res')
      return res.json()
    })
    .catch(err => {
      console.error({err})
    })
  },

  // getAllOtherDogs = () => {

  // },

  // removeDog =() => {

  // }
}

export default DogService