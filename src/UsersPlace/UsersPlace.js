import React, { Component} from 'react';

export default class UsersPlace extends Component {
  render() {
    return (
      <>
        <h3 className='UsersPlace_name'>
          Users Name
        </h3>
        <p className='UsersPlace_place'>
          Your place in line: 
        </p>
      </>
    )
  }
}