import React from "react";
import Content from "./content";
import Sidebar from "./sidebar";

export default function Layout() {
   return (
      <div className="layout">
         <div className="container-fluid">
            <div className="row c">
               <div className="col-3 p-0">
                  <div className="sidebar-wrapper">
                     <Sidebar />
                  </div>
               </div>
               <div className="col-9 p-0">
                  <div className="content-wrapper">
                     <Content />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
