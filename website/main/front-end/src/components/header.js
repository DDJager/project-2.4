import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
   return (
       <div className="header">
           <Link to="/authenticate"><div className="btn">Authenticate</div></Link>
           <Link to="/profile"><div className="btn">Profile</div></Link>
       </div>
   )
};

export default Header;