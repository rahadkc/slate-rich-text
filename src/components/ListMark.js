
import React from 'react';

const ListMark = (props) => {
  return <ul {...props.attributes}>
      <li>{props.children}</li>
    </ul>

}

export default ListMark;