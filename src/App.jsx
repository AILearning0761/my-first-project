import React from "react";
import ModuleLoader from "./ModuleLoader.jsx";
import config from "../config/config.json";

const App = () => {
  return (
    <div className="mirror-shell">
      <ModuleLoader layout={config.layout} modules={config.modules} />
    </div>
  );
};

export default App;
