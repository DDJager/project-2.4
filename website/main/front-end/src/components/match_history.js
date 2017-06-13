import React from 'react';
import Match from './match';

const MatchHistory = ()=>{
   return (
       <div>
           <h3>Match History</h3><br/>
           <div>
               <Match name="game" result="result"/>
               {/*
               *for every match in the matchhistory place an match object with the right parameters
               */}
           </div>
       </div>
   )
};

export default MatchHistory;