import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
   return (
       <div className="header">
           <Link to="/authenticate"><div className="btn">Authenticate</div></Link>
       </div>
   )
};

export default Header;