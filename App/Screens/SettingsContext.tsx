import react from "react";
// Give initial values and types for the varaibles that will be passed to the children components
const SettingsContext = react.createContext({
  showSettings: true,
  setShowSettings: (showSettings: boolean) => {},
  reps: 3,
  setReps: (reps: number) => {},
  sets: 3,
  setSets: (sets: number) => {},
  repTime: 10,
  setRepTime: (setRepTime: number) => {},
  repRestTime: 30,
  setRepRestTime: (setRepRestTime: number) => {},
  setRestTime: 100,
  setSetRestTime: (setRestTime: number) => {},
});

export default SettingsContext;
