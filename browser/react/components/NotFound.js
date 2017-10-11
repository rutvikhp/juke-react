import React from 'react';
import { Link } from 'react-router-dom';

// You'll see this component if you try to visit /foo

const NotFound = () => (
  <div>
    <h1>That page doesn't exist!</h1>
    <p>Try checking out <Link to="/albums">Albums</Link> or <Link to="/artists">Artists</Link>.</p>
  </div>
)

export default NotFound;
