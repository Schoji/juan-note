import Topbar from "./components/topbar/topbar";
import Sidebar from "./components/sidebar/sidebar";
import Notes from "./components/notes/notes";
import React from "react";

export default function Main() {

  return (
    <div>
        <Topbar/>
        <div className="flex">       
          <Sidebar/>
          <div className="flex-4/5 h-auto">
            <Notes />
          </div>
        </div>
    </div>
  );
}
