import React, { Component} from 'react';
import './InlinePets.css'

export default class InlinePets extends Component {
  render() {
    return (
      <>
        <div className='InlinePets_container'>
          <p className='InlinePets_info name'>
            Name: {this.props.name}
          </p>
          <p className='InlinePets_info breed'>
            Breed: {this.props.breed}
          </p>
          <p className='InlinePets_info age'>
            Age: {this.props.age}
          </p>
        </div>
      </>
    )
  }
}