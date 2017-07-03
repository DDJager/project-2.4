import React from 'react';

const MatchHistory = (props)=>{
    const {stats} = props;
    if (!props.stats) {
      return (
          <div className="card">
              <div className="content-text-section">
                  <h4>
                    Loading...
                  </h4>
              </div>
          </div>
      )
    }
    return (
        <div className="col s5 offset-s1">
            <div className="content-text-section">
              <h4>
                  Match History
              </h4>
              <br/>
              <div>
                  Games won: {stats.won}<br/>
                  Games lost: {stats.lost}<br/>
                  Games played: {stats.played}
              </div>
            </div>
        </div>
   )
};

export default MatchHistory;
