import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import SettingsContext from "./App/Screens/SettingsContext";
import Settings from "./App/Screens/Settings";
import Timer from "./App/Screens/Timer";

export default function App() {
  const [showSettings, setShowSettings] = useState(true);
  const [reps, setReps] = useState(3);
  const [sets, setSets] = useState(3);
  const [repTime, setRepTime] = useState(5);
  const [repRestTime, setRepRestTime] = useState(100);
  const [setRestTime, setSetRestTime] = useState(300);
  return (
    <SafeAreaView style={styles.container}>
      <SettingsContext.Provider
        value={{
          showSettings,
          setShowSettings,
          reps,
          setReps,
          sets,
          setSets,
          repTime,
          setRepTime,
          repRestTime,
          setRepRestTime,
          setRestTime,
          setSetRestTime,
        }}
      >
        {/* <Text>aasdf</Text> */}
        {showSettings ? <Settings /> : <Timer />}
      </SettingsContext.Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
