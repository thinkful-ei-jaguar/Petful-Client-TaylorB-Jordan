import React, { Component } from "react";
import NextAvail from "../NextAvail/NextAvail";
import UserList from "../UserList/UserList";
import UsersPlace from "../UsersPlace/UsersPlace";
import InlinePets from "../InlinePets/InlinePets";
// import DogService from "../services/dog-services";
// import CatService from "../services/cat-services";
// import PeopleService from "../services/people-services";
import ApiContext from "../ApiContext";
import "./AdoptionPage.css";
import PeopleService from "../services/people-services";

export default class AdoptionPage extends Component {
  static contextType = ApiContext;

  async handleNameSubmit(ev) {
    ev.preventDefault();
    const { setPerson, setPersonPosition } = this.context;
    const person = ev.target.name.value;
    const newPerson = { person };
    ev.target.name.value = "";
    //makes post request to server to add the new person to the queue
    await PeopleService.postNewPerson(newPerson);
    const addedPerson = await PeopleService.getUsersPlace(newPerson.person);
    await setPerson(addedPerson.name);
    await setPersonPosition(addedPerson.position);
    console.log(this.context.person, "person in context");
    console.log(this.context.personPosition, "person Position in context");
  }

  renderNameInput = () => {
    return (
      <section className="AP_name_input">
        <form
          onSubmit={(e) =>
            this.handleNameSubmit(
              e
              // setPerson,
              // setPeople,
              // setPersonPosition,
              // setAvailCat,
              // setAllOtherCats,
              // personPosition
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
  };

  render() {
    const {
      availDog,
      allOtherDogs,
      availCat,
      allOtherCats,
      people,
      // person,
      // personPosition,
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

    const { person, personPosition } = this.state;

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
        {!!person || person !== "" ? (
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

            {(personPosition === 1 || personPosition === null) && !!person ? (
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
