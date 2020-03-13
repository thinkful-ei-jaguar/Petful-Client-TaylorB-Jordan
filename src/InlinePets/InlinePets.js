import React, { Component} from 'react';

export default class InlinePets extends Component {
  render() {
    return (
      <>
        <div className='InlinePets_container'>
          <p className='InlinePets_info'>
            {this.props.name}
          </p>
          <p className='InlinePets_info'>
            {this.props.breed}
          </p>
          <p className='InlinePets_info'>
            {this.props.age}
          </p>
        </div>
      </>
    )
  }
}