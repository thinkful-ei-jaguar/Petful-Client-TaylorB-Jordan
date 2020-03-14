import config from '../config'

const DogService = {
  getNextAvailDog() {
    return fetch(`${config.API_ENDPOINT}/pets/dog`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(res => {
      if (!res.ok) {
        return res.json().then(e => Promise.reject(e))
      }
      return res.json()
    })
    .catch(err => {
      console.error({err})
    })
  },

  getAllOtherDogs(){
    return fetch(`${config.API_ENDPOINT}/pets/dogs`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(res => {
      if (!res.ok) {
        return res.json().then(e => Promise.reject(e))
      }
      return res.json()
    })
    .catch(err => {
      console.error({err})
    })
  },

  adoptedDog() {
    return fetch(`${config.API_ENDPOINT}/pets/dog/adopt`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(res => {
      if(!res.ok) {
        return res.json().then(e => Promise.reject(e))
      }
      return res.json()
    })
    .then(res => {
      return this.getNextAvailDog();
    })
    .catch(err => {
      console.error({err})
    })
  }
}

export default DogService