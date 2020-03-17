import React, { Component} from 'react';

export default class InlinePets extends Component {
  render() {
    return (
      <>
        <div className='UserList_container'>
          <p className='UserList_info' style={{margin:'5px 0', 'textAlign': 'center'}}>
            {this.props.name}
          </p>
        </div>
      </>
    )
  }
}