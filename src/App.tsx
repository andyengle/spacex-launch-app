import { createContext, useCallback, useEffect, useState } from "react";

import LaunchList from "./LaunchList";

import "./App.css";

import { type LaunchPadType } from "./Types";

export type AppContextType = {
  isLoading: boolean;
  launchData: LaunchPadType[] | null;
  loadLaunchData: () => void;
};

export const AppContext = createContext<AppContextType>({
  isLoading: false,
  launchData: null,
  loadLaunchData: () => null,
});

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [launchData, setLaunchData] = useState<LaunchPadType[] | null>(null);

  const loadLaunchData = useCallback(() => {
    setIsLoading(true);
    fetch("https://api.spacexdata.com/v4/launchpads")
      .then((response) => response.json())
      .then((data) => {
        setLaunchData(data);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    loadLaunchData();
  }, [loadLaunchData]);

  const contextPayload = {
    // Objects
    isLoading,
    launchData,
    loadLaunchData,
  };

  return (
    <>
      <AppContext.Provider value={contextPayload}>
        <LaunchList />
      </AppContext.Provider>
    </>
  );
}

export default App;
