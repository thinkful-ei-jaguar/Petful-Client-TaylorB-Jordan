import React, { Component} from 'react';
import './NextAvail.css'

export default class NextAvail extends Component {
  render() {
    return (
      <>
        <img src={this.props.image} alt='available pet' className='Next_avail_image'/>

        <div className='Next_info_container'>
          <p className='Next_info'> 
            Name: {this.props.name}
          </p>
          <p className='Next_info'> 
            Age: {this.props.age}
          </p>
          <p className='Next_info'>
            Breed: {this.props.breed}
          </p>
          <p className='Next_info'>
            {this.props.description}
          </p>
          <p className='Next_info'>
            Sex: {this.props.gender}
          </p>
          <p className='Next_info'>
            {this.props.name}'s Story: {this.props.story}
          </p>
        </div>
      </>
    )
  }
}