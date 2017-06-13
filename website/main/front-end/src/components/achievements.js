import React from 'react';

import Achievement from './achievement';

const Achievements = (props)=> {
   return (
       <div>
           <h3>Achievements</h3>
           <Achievement name="ak" image="favicon.ico"/>
           {/*list of all owned achievements*/}
       </div>
   )
};

export default Achievements;