import Topbar from "./components/topbar/topbar";
import Sidebar from "./components/sidebar/sidebar";
import Notes from "./components/notes/notes";
import React from "react";

interface Note {
  owner: string,
  id: number,
  title: string,
}

export default async function Main() {
  const response = await fetch('http://127.0.0.1:8000/notes/first_valid_note/')
  const data: Note = await response.json()

  return (
    <div>
        <Topbar id={data.id}/>
        <div className="flex">       
          <Sidebar/>
          <div className="flex-4/5 h-auto">
            <Notes id={data.id} />
          </div>
        </div>
    </div>
  );
}
