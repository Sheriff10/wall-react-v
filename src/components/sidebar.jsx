import React from "react";

export default function Sidebar() {
   return (
      <div className="sidebar">
         <div className="menu-data">
            <div className="menu-box">
               <div className="m-link">
                  <a href="#">More</a>
                  <a href="#" className="gr"><img src="verified.png" alt="verified" /> Verified </a>
                  <a href="#"><img src="wait.png" alt="waitlist" /> Waitlist</a>
                  <a href="#" className="gr"><img src="nft.png" alt="NFT" /> NFT </a>
               </div>
            </div>
         </div>
      </div>
   );
}
