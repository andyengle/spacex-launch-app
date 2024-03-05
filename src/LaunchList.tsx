import { useContext } from "react";

import { type LaunchPadType } from "./Types";

import { AppContext } from "./App";

const LaunchList = () => {
  const appContext = useContext(AppContext);
  const { launchData } = appContext;

  return (
    <div>
      <h3>Launch List</h3>

      {launchData?.length ? (
        <ul>
          {launchData.map((launchEntry: LaunchPadType) => (
            <li>{launchEntry.full_name}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default LaunchList;
