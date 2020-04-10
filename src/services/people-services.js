import config from "../config";

const PeopleService = {
  postNewPerson(newPerson) {
    return fetch(`${config.API_ENDPOINT}/people`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newPerson),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((e) => Promise.reject(e));
        }
        return res.json();
      })
      .catch((err) => {
        console.error({ err });
      });
  },

  getUsersInline() {
    return fetch(`${config.API_ENDPOINT}/people`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((e) => Promise.reject(e));
        }
        return res.json();
      })
      .catch((err) => {
        console.error({ err });
      });
  },

  getUsersPlace(user) {
    return fetch(`${config.API_ENDPOINT}/people/${user}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((e) => Promise.reject(e));
        }
        return res.json();
      })
      .catch((err) => {
        console.error({ err });
      });
  },
};

export default PeopleService;
