import React from "react";
import SearchRepository from "./SearchRepository";
import Sidebar from "./Sidebar";

const App = () => {
  return (
    <div className="grid grid-cols-12">
      <Sidebar />
      <div className="col-start-1 col-end-13 mt-[5.5rem] mx-4 md:mt-4 md:col-start-3 md:col-end-11 xl:col-start-4 xl:col-end-10">
        <SearchRepository />
      </div>
    </div>
  );
};

export default App;
