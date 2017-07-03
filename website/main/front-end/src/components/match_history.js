import React from 'react';

const MatchHistory = (props)=>{
    const {stats} = props;
    if (!props.stats) {return <h3>loading</h3>}
   return (
       <div className="content-section z-depth-2 grey lighten-5">
           <div className="row">
               <div className="col s10 offset-s1">
                    <div className="content-text-section">
                       <h4><b>Match History</b></h4><br/>
                       <div>
                          games won: {stats.won}<br/>
                          games lost: {stats.lost}<br/>
                          games played: {stats.played}
                       </div>
                    </div>
                </div>
            </div>
       </div>
   )
};

export default MatchHistory;
