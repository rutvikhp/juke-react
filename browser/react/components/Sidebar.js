import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = (props) => {

  return (
    <sidebar>
      <img src="juke.svg" className="logo" />
      <section>
        <h4 className="menu-item">
          <NavLink to="/albums">ALBUMS</NavLink>
        </h4>
      </section>
      <section>
        <h4 className="menu-item">
          <NavLink to="/artists">ARTISTS</NavLink>
        </h4>
      </section>
    </sidebar>
  );
}

export default Sidebar;
