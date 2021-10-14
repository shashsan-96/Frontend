import React from 'react';
import { NavLink as Link } from "react-router-dom";

const link = props => {
  return (
    <Link
      className={props.classes}
      style={{ cursor: 'pointer' }}
      activeClass='active'
      to={props.target}
     
    >
      {props.children}
    </Link>
  );
};

export default link;
