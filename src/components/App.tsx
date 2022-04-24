import React from "react";
import { useSelector } from "react-redux";

import Metrics from "./Metrics";
import RepositoryGraph from "./RepositoryGraph";
import SearchRepository from "./SearchRepository";
import Sidebar from "./Sidebar";
import { selectRepository } from "../store/selectors";

const App = () => {
  const { branches, status, error } = useSelector(selectRepository);
  
  return (
    <div className="bg-gray-100 flex-col h-screen">
      <div className="flex flex-col md:flex-row w-full mx-auto h-full">
        <SearchRepository />
        <Sidebar />
        <div className="flex h-[33%] repositoryGraphContainer">
          <RepositoryGraph status={status} branches={branches} error={error} />
        </div>
        <div className="flex h-[67%] metricsContainer">
          <Metrics />
        </div>
      </div>
    </div>
  );
};

export default App;
