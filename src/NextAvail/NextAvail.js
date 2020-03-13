import React, { Component} from 'react';

export default class NextAvail extends Component {
  render() {
    return (
      <>
        <h2 className='NA_pet_name'>Pet's Name</h2>
        <img src='' alt=''/>

        <div className='Next_info_container'>
          <p className='Next_info'>
            Age
          </p>
          <p className='Next_info'>
            Breed
          </p>
          <p className='Next_info'>
            Description
          </p>
          <p className='Next_info'>
            Gender
          </p>
          <p className='Next_info'>
            Story
          </p>
        </div>
      </>
    )
  }
}