import React, { Suspense } from "react";

const moduleRegistry = {
  DigitalClock: React.lazy(() => import("./modules/DigitalClock/DigitalClock.jsx")),
};

const groupModulesByRegion = (modules = []) =>
  modules.reduce((accumulator, moduleConfig) => {
    const region = moduleConfig.region;
    if (!accumulator[region]) {
      accumulator[region] = [];
    }
    accumulator[region].push(moduleConfig);
    return accumulator;
  }, {});

const Region = ({ name, modules }) => {
  return (
    <section className={`region region-${name}`}>
      {modules.map((moduleConfig) => {
        const ModuleComponent = moduleRegistry[moduleConfig.name];

        if (!ModuleComponent) {
          return (
            <div key={`${moduleConfig.name}-missing`} className="module missing">
              Unknown module: {moduleConfig.name}
            </div>
          );
        }

        return (
          <div key={moduleConfig.name} className="module">
            <Suspense fallback={<div className="module-loading">Loading...</div>}>
              <ModuleComponent config={moduleConfig.config} />
            </Suspense>
          </div>
        );
      })}
    </section>
  );
};

const ModuleLoader = ({ layout, modules }) => {
  const modulesByRegion = groupModulesByRegion(modules);

  return (
    <div className="mirror-layout">
      {layout.regions.map((regionName) => (
        <Region
          key={regionName}
          name={regionName}
          modules={modulesByRegion[regionName] || []}
        />
      ))}
    </div>
  );
};

export default ModuleLoader;
