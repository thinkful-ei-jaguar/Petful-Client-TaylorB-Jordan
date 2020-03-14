import React, { Component} from 'react';

export default class InlinePets extends Component {
  render() {
    return (
      <>
        <div className='UserList_container'>
          <p className='UserList_info'>
            {this.props.name}
          </p>
        </div>
      </>
    )
  }
}