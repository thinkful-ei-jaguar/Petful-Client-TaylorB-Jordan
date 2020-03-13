import config from '../config'

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

  },

}

export default CatService