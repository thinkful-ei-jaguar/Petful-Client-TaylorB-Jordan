import React, { Component } from "react";
import NextAvail from "../NextAvail/NextAvail";
import UserList from "../UserList/UserList";
import UsersPlace from "../UsersPlace/UsersPlace";
import InlinePets from "../InlinePets/InlinePets";
import DogService from "../services/dog-services";
import CatService from "../services/cat-services";
import PeopleService from "../services/people-services";
import ApiContext from "../ApiContext";
import "./AdoptionPage.css";

export default class AdoptionPage extends Component {
  static contextType = ApiContext;
  constructor(props) {
    super(props);
    this.state = {
      nameSubmitted: null,
      // availDog: {},
      // allOtherDogs: [],
      // availCat: {},
      // allOtherCats: [],
      person: "",
      personPosition: null,
      people: [],
      successfulAdopt: false,
      adoptee: {},
      human: "",
    };
  }

  async componentDidMount() {
    const {
      setAvailDog,
      setAllOtherDogs,
      setAvailCat,
      setAllOtherCats,
      setPeople,
      // setPerson,
      // setPersonPosition,
    } = this.context;

    // get person from local storage
    // let currentPerson = localStorage.getItem("Person");
    // let personPosition = localStorage.getItem( 'Position' );

    const nextDog = await DogService.getNextAvailDog();
    setAvailDog(nextDog);

    const nextCat = await CatService.getNextAvailCat();
    setAvailCat(nextCat);

    const allDogs = await DogService.getAllOtherDogs();
    setAllOtherDogs(allDogs);

    const allCats = await CatService.getAllOtherCats();
    setAllOtherCats(allCats);

    const peopleInLine = await PeopleService.getUsersInline();
    setPeople(peopleInLine);

    // If there is a Person in local storage, then we know that user has submitted their name to adopt. Therefore we want to get and keep track of that person's place in line
    // if (!!currentPerson) {
    //   PeopleService.getUsersPlace(currentPerson).then((res) => {
    //     setPerson(res.name);
    //     setPersonPosition(res.position);
    //     this.setState({
    //       person: res.name,
    //       personPosition: res.position,
    //       nameSubmitted: true,
    //     });
    //   });
    // }
  }

  // startInterval2() {
  //   const { personPosition, setInterval2 } = this.context;
  //   if (personPosition === 1) {
  //     console.log("setting interval 2");
  //     setInterval2();
  //   }
  // }

  // generates randomized string for 'new people' in queue
  makeid(length) {
    let result = "";
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  async addPeopleToQueue(setPeople) {
    const name = this.makeid(7);
    // if(this.state.successfulAdopt) {
    await PeopleService.postNewPerson({ name });
    const peopleInLine = await PeopleService.getUsersInline();
    console.log(peopleInLine, "ppl in line form add people to queue");
    setPeople(peopleInLine);
    this.setState({
      people: peopleInLine,
    });
  }

  async handleCatAdoptClick(
    setAvailCat,
    setAllOtherCats,
    // personPosition,
    setPerson,
    setPersonPosition,
    setPeople,
    setInterval2
  ) {
    //Uses service to make a request to remove the adopted cat from the queue
    await CatService.adoptedCat();

    const availCat = await CatService.getNextAvailCat();
    setAvailCat(availCat);
    // console.log(availCat, "next available cat");

    //resets all other cats in the queue
    const allCats = await CatService.getAllOtherCats();
    setAllOtherCats(allCats);
    // console.log(allCats, "all other cats");

    await this.updatePeople(
      setPerson,
      setPersonPosition,
      setPeople,
      setInterval2
    );
  }

  async handleCatAdoptActuallyClicked(
    setAvailCat,
    setAllOtherCats,
    personPosition,
    setPerson,
    setPersonPosition,
    setPeople,
    setInterval2
  ) {
    //Uses service to make a request to remove the adopted cat from the queue
    const adoption = await CatService.adoptedCat();
    console.log(adoption, "res from adoptedCat");

    this.setState({
      successfulAdopt: true,
      adoptee: adoption.adoptee,
      human: adoption.human,
      person: "",
      personPosition: null,
    });

    //sets the new next avail cat
    const nextCat = await CatService.getNextAvailCat();

    setAvailCat(nextCat);

    //resets all other cats in the queue
    const allCats = await CatService.getAllOtherCats();
    setAllOtherCats(allCats);

    await this.context.setPerson("");
    await this.context.setPersonPosition("");
    this.setState({
      person: "",
      personPosition: null,
    });
    const peopleInLine = await PeopleService.getUsersInline();
    setPeople(peopleInLine);

    const interval1 = setInterval(() => {
      this.handleCatAdoptClick(
        setAvailCat,
        setAllOtherCats,
        // personPosition,
        setPerson,
        setPersonPosition,
        setPeople
      );
    }, 2000);
    await this.context.setInterval1(interval1);
  }

  handleDogAdoptActuallyClicked(
    setAvailDog,
    setAllOtherDogs,
    personPosition,
    setPerson,
    setPersonPosition,
    setPeople,
    setInterval2
  ) {
    //Uses service to make a request to remove the adopted dog from the queue
    DogService.adoptedDog().then((res) => {
      this.setState({
        successfulAdopt: true,
        adoptee: res.adoptee,
        human: res.human,
      });
    });
    //sets the new next avail dog
    DogService.getNextAvailDog().then((res) => {
      setAvailDog(res);
    });
    //resets all other dogs in the queue
    DogService.getAllOtherDogs().then((res) => {
      setAllOtherDogs(res);
    });

    setPerson("");
    setPersonPosition("");
    localStorage.clear("Person");
    localStorage.clear("Position");
    PeopleService.getUsersInline().then((res) => {
      setPeople(res);
    });
  }

  handleDogAdoptClick(
    setAvailDog,
    setAllOtherDogs,
    personPosition,
    setPerson,
    setPersonPosition,
    setPeople
  ) {
    console.log("dog adopt firing!");
    //Uses service to make a request to remove the adopted dog from the queue
    DogService.adoptedDog().then((res) => {
      this.setState({
        successfulAdopt: true,
        adoptee: res.adoptee,
        human: res.human,
      });
    });
    //sets the new next avail dog
    DogService.getNextAvailDog().then((res) => {
      setAvailDog(res);
    });
    //resets all other dogs in the queue
    DogService.getAllOtherDogs().then((res) => {
      setAllOtherDogs(res);
    });
    this.updatePeople(setPerson, setPersonPosition, setPeople);
  }

  async updatePeople(setPerson, setPersonPosition, setPeople, setInterval2) {
    const peopleInLine = await PeopleService.getUsersInline();
    setPeople(peopleInLine);
    console.log(peopleInLine, "people in line in update people function");
    console.log(
      this.state.person,
      "person in state being sent to get users place"
    );
    //increments the persons place in line everytime a cat is adopted
    const usersPosition = await PeopleService.getUsersPlace(this.state.person);
    console.log(
      usersPosition,
      "users position from get users place response in update people function"
    );
    await setPerson(usersPosition.name);
    await setPersonPosition(usersPosition.position);
    console.log(this.context.personPosition, "user position from context");
    if (this.context.personPosition == 1 || peopleInLine.length == 1) {
      console.log("setting interval 2");
      // setInterval2();
      const interval2 = setInterval(() => {
        this.addPeopleToQueue(setPeople);
      }, 2000);
      this.context.setInterval2(interval2);
      // this.setState({
      //   interval2,
      // });
    }
    // localStorage.setItem("Position", res.position);
  }

  async handleNameSubmit(
    e,
    setPerson,
    setPeople,
    setPersonPosition,
    setAvailCat,
    setAllOtherCats
    // personPosition
  ) {
    e.preventDefault();
    const { setInterval1 } = this.context;
    const name = e.target.name.value;
    //sets local storage with the person name just submitted
    // localStorage.setItem("Person", name);
    //clears input value
    e.target.name.value = "";
    const newPerson = { name };
    //makes post request to server to add the new person to the queue
    const addedPerson = await PeopleService.postNewPerson(newPerson);
    console.log(addedPerson, "added person from post response");

    await setPerson(addedPerson.name);
    await setPersonPosition(addedPerson.position);
    //gets new person position in line to set
    const userPosition = await PeopleService.getUsersPlace(newPerson.name);
    console.log(userPosition, "added persons position");
    this.setState({
      person: userPosition.name,
      position: userPosition.position,
      nameSubmitted: true,
    });
    console.log(this.state.person, this.state.position);
    // localStorage.setItem("Position", res.position);

    //resets the people in line so the new person is included
    const peopleInLine = await PeopleService.getUsersInline();
    // console.log(peopleInLine, "updated people in line after submitting a name");
    setPeople(peopleInLine);

    //begins interval
    const interval1 = setInterval(() => {
      this.handleCatAdoptClick(
        setAvailCat,
        setAllOtherCats,
        // personPosition,
        setPerson,
        setPersonPosition,
        setPeople
      );
    }, 2000);
    await setInterval1(interval1);
  }

  handleClearSuccess() {
    this.setState({
      successfulAdopt: false,
    });
  }

  renderSuccessAdopt(human, pet) {
    return (
      <div className="AP_success_adopt">
        <p>
          Yay! {pet} was adopted by {human}!
        </p>
        <span onClick={(e) => this.handleClearSuccess()}> X </span>
      </div>
    );
  }

  renderNameInput() {
    const {
      setPerson,
      setPeople,
      setPersonPosition,
      setAvailCat,
      setAllOtherCats,
      personPosition,
    } = this.context;
    return (
      <section className="AP_name_input">
        <form
          onSubmit={(e) =>
            this.handleNameSubmit(
              e,
              setPerson,
              setPeople,
              setPersonPosition,
              setAvailCat,
              setAllOtherCats,
              personPosition
            )
          }
          className="Name_input_form"
        >
          <label>Submit your name below to be added to the adoption line</label>
          <input type="text" name="name"></input>
          <button type="submit" className="AP_adopt_button">
            Submit
          </button>
        </form>
      </section>
    );
  }

  render() {
    const {
      availDog,
      allOtherDogs,
      availCat,
      allOtherCats,
      people,
      person,
      personPosition,
      setPerson,
      setPersonPosition,
      setPeople,
      setAvailCat,
      setAllOtherCats,
      setAvailDog,
      setAllOtherDogs,
      interval1,
      interval2,
      setInterval2,
    } = this.context;

    if (personPosition == 1 || people.length <= 1) {
      clearInterval(interval1);
    }

    if (this.state.people.length >= 5) {
      clearInterval(interval2);
    }

    return (
      <>
        <header className="AP_header_container">
          <h2 className="AP_header">Adoptable Pets</h2>
          <h3 className="AP_description">
            Only the first human in line will be able to adopt a dog or cat.
            Once they have adopted their new furry friend, they will be removed
            from the line. Any humans not first in line will be unable to adopt
            until it is their turn.{" "}
          </h3>
        </header>

        {/* if there is a person logged in local storage, that means they have submitted their name, therefore do not show the input form - show the tracking of their place in line */}
        {!!person || !!this.state.person ? (
          <div>
            <UsersPlace name={person} position={personPosition} key={person} />
          </div>
        ) : (
          this.renderNameInput()
        )}

        <div className="AP_people">
          <div className="AP_people_inline">
            <h4
              className="AP_people_inline_header"
              style={{ color: "#8CBCB9" }}
            >
              People in line:{" "}
            </h4>
            {people.map((human, idx) => (
              <UserList key={idx} name={human} />
            ))}
          </div>
        </div>

        {/* render success message if successful adoption  */}
        {this.state.successfulAdopt
          ? this.renderSuccessAdopt(this.state.human, this.state.adoptee.name)
          : null}

        <div className="AP_pets_container">
          <div className="AP_cats">
            <p className="AP_next_avail">Adoptable Cat</p>
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

            {(personPosition === 1 || personPosition === "") && !!person ? (
              <div className="AP_adopt_button">
                <button
                  className="AP_adopt_button"
                  type="button"
                  onClick={() =>
                    this.handleCatAdoptActuallyClicked(
                      setAvailCat,
                      setAllOtherCats,
                      personPosition,
                      setPerson,
                      setPersonPosition,
                      setPeople,
                      setInterval2
                    )
                  }
                >
                  Adopt!
                </button>
              </div>
            ) : null}

            <p className="AP_next_avail">Next Available Cats</p>
            {allOtherCats.map((cat) => (
              <InlinePets
                key={cat.name}
                name={cat.name}
                breed={cat.breed}
                age={cat.age}
              />
            ))}
          </div>

          <div className="AP_dogs">
            <p className="AP_next_avail">Adoptable Dog</p>
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

            {personPosition === 1 && !!person ? (
              <div className="AP_adopt_button">
                <button
                  className="AP_adopt_button"
                  type="button"
                  onClick={() =>
                    this.handleDogAdoptActuallyClicked(
                      setAvailDog,
                      setAllOtherDogs,
                      person,
                      setPerson,
                      setPersonPosition,
                      setPeople
                    )
                  }
                >
                  Adopt!
                </button>
              </div>
            ) : null}

            <p className="AP_next_avail">Next Available Dogs</p>
            {allOtherDogs.map((dog) => (
              <InlinePets
                name={dog.name}
                breed={dog.breed}
                age={dog.age}
                key={dog.name}
              />
            ))}
          </div>
        </div>
      </>
    );
  }
}
