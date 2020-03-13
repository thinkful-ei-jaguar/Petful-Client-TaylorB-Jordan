import React, { Component} from 'react';

export default class NextAvail extends Component {
  render() {
    return (
      <>
        <h2 className='NA_pet_name'>
          {this.props.name}
        </h2>

        <img src={this.props.image} alt=''/>

        <div className='Next_info_container'>
          <p className='Next_info'> Age: 
            {this.props.age}
          </p>
          <p className='Next_info'>
            {this.props.breed}
          </p>
          <p className='Next_info'>
            {this.props.description}
          </p>
          <p className='Next_info'>
            {this.props.gender}
          </p>
          <p className='Next_info'>
            {this.props.story}
          </p>
        </div>
      </>
    )
  }
}