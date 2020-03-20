import React, { Component} from 'react';
import './InlinePets.css'

export default class InlinePets extends Component {
  render() {
    return (
      <>
        <div className='InlinePets_container'>
          <div className='InlinePets_info name'>
            <p className='title'>
              Name: 
            </p>
            <div className='content'>
            {this.props.name}
            </div>
          </div>

          <div className='InlinePets_info'>
            <p className='title'>
              Breed: 
            </p>
            <div className='content'>
            {this.props.breed}
            </div>
          </div>

          <div className='InlinePets_info age' >
            <p className='title'>
              Age: 
            </p>
            <div className='content'>
              {this.props.age}
            </div>
          </div>
        </div>
      </>
    )
  }
}