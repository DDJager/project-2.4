import React from 'react';
import Match from './match';

const MatchHistory = ()=>{
   return (
       <div className="content-section z-depth-2 grey lighten-5">
           <div className="row">
               <div className="col s10 offset-s1">
                    <div className="content-text-section">
                       <h4><b>Match History</b></h4><br/>
                       <div>
                           <Match name="game" result="result"/>
                           {/*
                           *for every match in the matchhistory place an match object with the right parameters
                           */}
                       </div>
                    </div>
                </div>
            </div>
       </div>
   )
};

export default MatchHistory;
