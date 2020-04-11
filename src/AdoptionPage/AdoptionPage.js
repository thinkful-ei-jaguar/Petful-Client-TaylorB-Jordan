/* eslint-disable eqeqeq */
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
      nameSubmitted: false,
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
      setAvailCat,
      setAvailDog,
      setAllOtherCats,
      setAllOtherDogs,
      setPeople,
    } = this.context;

    const nextCat = await CatService.getNextAvailCat();
    const nextDog = await DogService.getNextAvailDog();
    const allCats = await CatService.getAllOtherCats();
    const allDogs = await DogService.getAllOtherDogs();
    const peopleInLine = await PeopleService.getUsersInline();

    setAvailCat(nextCat);
    setAvailDog(nextDog);
    setAllOtherCats(allCats);
    setAllOtherDogs(allDogs);
    setPeople(peopleInLine);

    this.setState({
      people: peopleInLine,
    });
  }

  async handleNameSubmit(ev) {
    ev.preventDefault();
    const { setPerson, setPersonPosition, setPeople } = this.context;
    const person = ev.target.name.value;
    const newPerson = { person };

    ev.target.name.value = "";
    //makes post request to server to add the new person to the queue
    await PeopleService.postNewPerson(newPerson);
    const addedPerson = await PeopleService.getUsersPlace(newPerson.person);
    await setPerson(addedPerson.name);
    await setPersonPosition(addedPerson.position);

    const peopleInLine = await PeopleService.getUsersInline();
    await setPeople(peopleInLine);

    this.setState({
      nameSubmitted: true,
      person: addedPerson.name,
      personPosition: addedPerson.position,
      people: peopleInLine,
    });

    this.startInterval1();
  }

  async startInterval1() {
    const { setInterval1 } = this.context;
    const interval1 = setInterval(() => {
      this.incrementNextCat();
    }, 2000);
    await setInterval1(interval1);
  }

  // generates randomized string for 'new people' in queue
  makeId(length) {
    let result = "";
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    // console.log(result, "result from makeId");
    return result;
  }

  async addPeopleToQueue() {
    const { setPeople } = this.context;
    const person = this.makeId(7);
    const newPerson = { person };
    console.log(newPerson, "new person being added in interval 2");
    await PeopleService.postNewPerson(newPerson);
    const peopleInLine = await PeopleService.getUsersInline();
    console.log(peopleInLine, "people in line in add ppl to queue interval");
    setPeople(peopleInLine);
    this.setState({
      people: peopleInLine,
    });
  }

  async startInterval2() {
    console.log("setting interval 2");
    const { setInterval2 } = this.context;
    const interval2 = setInterval(() => {
      this.addPeopleToQueue();
    }, 2000);
    await setInterval2(interval2);
  }

  async incrementNextCat() {
    const { setAvailCat, setAllOtherCats } = this.context;
    this.setState({
      adoptionOccurring: true,
    });

    //Uses service to make a request to remove the adopted cat from the queue
    await CatService.adoptedCat();

    const availCat = await CatService.getNextAvailCat();
    setAvailCat(availCat);

    const allCats = await CatService.getAllOtherCats();
    setAllOtherCats(allCats);

    await this.updatePeople();
  }

  async updatePeople() {
    const { setPersonPosition, setPeople } = this.context;
    //Get users incremented position in line
    const personPosition = await PeopleService.getUsersPlace(this.state.person);
    await setPersonPosition(personPosition.position);

    //Get people in line from the server
    const peopleInLine = await PeopleService.getUsersInline();
    console.log(peopleInLine, "people in line from server in update people");
    await setPeople(peopleInLine);

    this.setState({
      personPosition: personPosition.position,
      adoptionOccurring: false,
      people: peopleInLine,
    });

    if (this.state.personPosition == 1 || peopleInLine.length == 1) {
      console.log("setting interval 2 - adding ppl to list");
      this.startInterval2();
    }
  }

  async handlePetActuallyClicked(petKind) {
    const {
      setAvailCat,
      setAllOtherCats,
      setAvailDog,
      setAllOtherDogs,
      setPerson,
      setPersonPosition,
      setPeople,
    } = this.context;
    if (petKind === "cat") {
      const adoption = await CatService.adoptedCat();
      console.log(petKind, adoption, "kind and adoption details");
      this.setState({
        successfulAdopt: true,
        adoptee: adoption.adoptee,
        human: adoption.human,
      });

      const nextCat = await CatService.getNextAvailCat();
      const allCats = await CatService.getAllOtherCats();
      console.log(nextCat, allCats, "!!!");
      await setAvailCat(nextCat);
      await setAllOtherCats(allCats);
    } else if (petKind === "dog") {
      const adoption = await DogService.adoptedDog();
      console.log(petKind, adoption, "kind and adoption details - DOG");
      this.setState({
        successfulAdopt: true,
        adoptee: adoption.adoptee,
        human: adoption.human,
      });

      const nextDog = await DogService.getNextAvailDog();
      const allDogs = await DogService.getAllOtherDogs();
      console.log(nextDog, allDogs, "!!!");
      await setAvailDog(nextDog);
      await setAllOtherDogs(allDogs);
    } else {
      console.log("error occuring in handlePetActuallyClicked");
    }

    const people = await PeopleService.getUsersInline();
    console.log(people, "people in petActuallyClicked!!!");
    await setPerson("");
    await setPersonPosition("");
    await setPeople(people);
    this.setState({
      person: "",
      personPosition: null,
      people,
      nameSubmitted: false,
    });
    // this.startInterval2();
  }

  renderNameInput = () => {
    return (
      <section className="AP_name_input">
        <form
          onSubmit={(e) => this.handleNameSubmit(e)}
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
  };

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

  render() {
    const {
      availDog,
      allOtherDogs,
      availCat,
      allOtherCats,
      interval1,
      interval2,
    } = this.context;

    const { person, personPosition, people } = this.state;

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
        {this.state.nameSubmitted ? (
          <div>
            <UsersPlace
              name={this.state.person}
              position={this.state.personPosition}
              key={person}
            />
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
        {this.state.successfulAdopt &&
          this.renderSuccessAdopt(this.state.human, this.state.adoptee.name)}

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

            {!!person && personPosition == 1 && (
              <div className="AP_adopt_button">
                <button
                  className="AP_adopt_button"
                  type="button"
                  onClick={() => this.handlePetActuallyClicked("cat")}
                >
                  Adopt!
                </button>
              </div>
            )}

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
                  onClick={() => this.handlePetActuallyClicked("dog")}
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
