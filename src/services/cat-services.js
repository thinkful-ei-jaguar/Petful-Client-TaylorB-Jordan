import config from '../config'
// import {setAvailCat} from '../ApiContext'

const CatService = {
  getNextAvailCat() {
    return fetch(`${config.API_ENDPOINT}/pets/cat`, {
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

  getAllOtherCats() {
    return fetch(`${config.API_ENDPOINT}/pets/cats`, {
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

  adoptedCat() {
    return fetch(`${config.API_ENDPOINT}/pets/cat/adopt`, {
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
    // .then(res => {
    //   return this.getNextAvailCat();
    // })
    .catch(err => {
      console.error({err})
    })
  }

}

export default CatService