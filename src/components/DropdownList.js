import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

class DropdownList extends Component {
  render() {
    const { open, list } = this.props;
    if (!open) {
      return null
    }

    return (
      <>
        {list.map(l => (
            <li><Link to={`/${_.snakeCase(l)}`}><span>{l}</span></Link></li>
        ))}
      </>
    );
  }
}

export default DropdownList;
