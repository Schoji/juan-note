import React from "react";
import { AuthGuard } from "./core/auth/AuthGuard";
import { AlreadyLogged } from "./login/components/alreadyLogged";
import LoadingPage from "./loading/page";


export default function Main() {

  return (
    <div className='h-screen flex justify-center items-center'>
      <AuthGuard />
      <AlreadyLogged />
      <LoadingPage/>
      
    </div>
  );
}
