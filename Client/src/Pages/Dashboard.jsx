import React from "react";
import Sidenav from "../Components/Sidenav";

const Dashboard = () => {
  return (
    <>
      <Sidenav />
      <section className="lg:ml-[250px] lg:p-8 p-4 h-screen">
        <h1 className="font-bold text-3xl">Passwords</h1>
        
      </section>
    </>
  );
};

export default Dashboard;
