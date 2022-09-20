import React from "react";

import Metrics from "./Metrics";
import SearchRepository from "components/SearchRepository";
import Sidebar from "components/Sidebar";
import RepositoryPreview from "components/RepositoryPreview/RepositoryPreview";

const App = () => {
  return (
    <div className="bg-gray-100 flex-col h-screen">
      <div className="flex flex-col md:flex-row w-full mx-auto h-full">
        <SearchRepository />
        <Sidebar />
        <div className="flex h-[50%] repositoryGraphContainer">
          <RepositoryPreview />
        </div>
        <div className="flex h-[50%] metricsContainer">
          <Metrics />
        </div>
      </div>
    </div>
  );
};

export default App;
