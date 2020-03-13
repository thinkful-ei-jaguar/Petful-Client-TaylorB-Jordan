import React, { Component} from 'react';

export default class InlinePets extends Component {
  render() {
    return (
      <>
        <div className='InlinePets_container'>
          <p className='InlinePets_info'>
            Name
          </p>
          <p className='InlinePets_info'>
            Breed
          </p>
          <p className='InlinePets_info'>
            Age
          </p>
        </div>
      </>
    )
  }
}