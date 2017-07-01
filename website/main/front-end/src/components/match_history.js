import React from 'react';
import Match from './match';

const MatchHistory = (props)=>{
    const {stats} = props;
    if (!props.stats) {return <h3>loading</h3>}
   return (

       <div>
           <h3>Match History</h3><br/>
           <div>
               games won: {stats.won}<br/>
               games lost: {stats.lost}<br/>
               games played: {stats.played}
           </div>
       </div>
   )
};

export default MatchHistory;