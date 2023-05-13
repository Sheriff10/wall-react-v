import React from "react";

export default function NoResult() {
   return (
      <div className="no-result">
         <div className="container-fluid wrap">
            <div className="wrap">
               <div className="alert-wrap">
                <span className="alert alert-warning"> No Result</span>
               </div>
            </div>
         </div>
      </div>
   );
}
