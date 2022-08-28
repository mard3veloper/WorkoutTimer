import { Text, View, StyleSheet, TextInput, Pressable } from "react-native";
import React, { useContext } from "react";

import SettingsContext from "./SettingsContext";
import colors from "../config/colors";

const Settings = () => {
  //Pulling in all the parent variables
  const settingsInfo = useContext(SettingsContext);

  //this makes sure that it can't update the input numbers to an empty or invalid value
  const numericInputHandler = (val: number, updateFunction: Function) => {
    if (val > 0) {
      updateFunction(val);
    }
  };

  return (
    <View style={styles.Container}>
      <View style={styles.Row}>
        {/* Dynamically update the reps to show default values and entered values */}
        <Text style={styles.TextLabel}>Reps: {settingsInfo.reps}</Text>
        <TextInput
          keyboardType="numeric"
          style={styles.TextInput}
          // Convert the oncoming values to the correct data type, and call checker function
          onChangeText={(newValue) =>
            numericInputHandler(parseInt(newValue), settingsInfo.setReps)
          }
        />
      </View>
      <View style={styles.Row}>
        <Text style={styles.TextLabel}>Rep Time: {settingsInfo.repTime}s</Text>
        <TextInput
          keyboardType="numeric"
          style={styles.TextInput}
          onChangeText={(newValue) =>
            numericInputHandler(parseInt(newValue), settingsInfo.setRepTime)
          }
        />
      </View>
      <View style={styles.Row}>
        <Text style={styles.TextLabel}>
          Rep Rest Time: {settingsInfo.repRestTime}s
        </Text>
        <TextInput
          keyboardType="numeric"
          style={styles.TextInput}
          onChangeText={(newValue) =>
            numericInputHandler(parseInt(newValue), settingsInfo.setRepRestTime)
          }
        />
      </View>
      <View style={styles.Row}>
        <Text style={styles.TextLabel}>Sets: {settingsInfo.sets}</Text>
        <TextInput
          keyboardType="numeric"
          style={styles.TextInput}
          onChangeText={(newValue) =>
            numericInputHandler(parseInt(newValue), settingsInfo.setSets)
          }
        />
      </View>
      <View style={styles.Row}>
        <Text style={styles.TextLabel}>
          Set Rest Time: {settingsInfo.setRestTime}s
        </Text>
        <TextInput
          keyboardType="numeric"
          style={styles.TextInput}
          onChangeText={(newValue) =>
            numericInputHandler(parseInt(newValue), settingsInfo.setSetRestTime)
          }
        />
      </View>
      {/* Update and rerender the views depending on the boolean from settings context */}
      <Pressable
        style={styles.button}
        onPress={() => settingsInfo.setShowSettings(false)}
      >
        <Text style={styles.textButton}>Start</Text>
      </Pressable>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  Container: {
    flexGrow: 1,
    justifyContent: "center",
  },
  Row: { flexDirection: "row", alignItems: "center" },
  TextInput: {
    height: 70,
    width: 150,
    borderWidth: 1,
    borderRadius: 30,
    margin: 10,
    fontSize: 25,
    textAlign: "center",
    justifyContent: "flex-end",
    color: colors.dark,
  },
  TextLabel: {
    fontSize: 25,
    justifyContent: "flex-start",
    width: 150,
    color: colors.dark,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 30,
    elevation: 3,
    backgroundColor: colors.primary,
    marginTop: 40,
    marginLeft: 80,
    marginRight: 80,
  },
  textButton: {
    fontSize: 25,
    color: colors.light,
  },
});
