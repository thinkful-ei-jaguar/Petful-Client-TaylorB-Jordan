import React, { Component} from 'react';
import './UsersPlace.css'

export default class UsersPlace extends Component {
  render() {
    return (
      <div className='UsersPlace_container'>  
        <h3 className='UsersPlace_header'>
          Keep track of how long until you can adopt
        </h3>
        <p className='UsersPlace_name'>
          Name: {this.props.name}  
        </p>
        <span className='UsersPlace_place'>
          Your place in line: {this.props.position}
        </span>
      </div>
    )
  }
}