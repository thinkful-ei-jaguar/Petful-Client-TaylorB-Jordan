import React, { Component} from 'react';
import './UsersPlace.css'

export default class UsersPlace extends Component {
  render() {
    return (
      <div className='UsersPlace_container'>  
        <h3 className='UsersPlace_name'>
          {this.props.name}
        </h3>
        <p className='UsersPlace_place'>
          Your place in line: {this.props.position}
        </p>
      </div>
    )
  }
}