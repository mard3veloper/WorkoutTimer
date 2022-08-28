import { Text, StyleSheet, View, Pressable } from "react-native";
import React, {
  useEffect,
  useState,
  useContext,
  useRef,
  useDebugValue,
} from "react";
import ProgressCircle from "react-native-progress-circle";

import SettingsContext from "./SettingsContext";
import colors from "../config/colors";

const Timer = () => {
  //pulling in parent variables
  const settingsInfo = useContext(SettingsContext);

  // Values for states and references. References are necessary for passing the current value
  // of the state into the increment function
  const [secondsLeft, setSecondsLeft] = useState(0);
  const secondsLeftRef = useRef(secondsLeft);
  const [isPaused, setIsPaused] = useState(false);
  const isPausedRef = useRef(isPaused);
  const [timeVal, setTimeVal] = useState(0);
  const timeValRef = useRef(timeVal);
  const totalTimeRef = useRef(1);
  const currentTimeRef = useRef(0);
  const workoutArray: number[] = [];
  const [workingState, setWorkingState] = useState(true);
  const workingStateRef = useRef(true);

  const sets: number = settingsInfo.sets;
  const reps: number = settingsInfo.reps;
  const repTime: number = settingsInfo.repTime;
  const repRestTime: number = settingsInfo.repRestTime;
  const setRestTime: number = settingsInfo.setRestTime;

  useEffect(() => {
    //generate an array based on the workout parameters
    for (let currentSet = 1; currentSet <= sets; currentSet++) {
      for (let currentRep = 1; currentRep <= reps; currentRep++) {
        workoutArray.push(repTime);
        if (!(currentRep === reps)) {
          workoutArray.push(repRestTime);
        }
      }
      if (currentSet != sets) {
        workoutArray.push(setRestTime);
      }
    }

    console.log("Generated Workout:");
    console.log(workoutArray);

    //track current position in workout array
    let workoutIndex = 0;

    //set the values for the current seconds left, set the overall time for that part of the
    //workout
    secondsLeftRef.current = workoutArray[workoutIndex];
    setSecondsLeft(secondsLeftRef.current);
    setTimeVal(workoutArray[0]);

    //Caculate the total amount of time the workout will take for the outer bar
    totalTimeRef.current = workoutArray.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      0
    );

    //Add to the time value every defined amount of time (10/1000)f, and update
    //the values tracking the time outside of the array
    const interval = setInterval(() => {
      //only increment if it is not paused
      if (isPausedRef.current) {
        return;
      }

      secondsLeftRef.current -= 0.01;
      currentTimeRef.current += 0.01;

      //If timer reaches zero or below, move on to the next phase of the workout,
      //set the timers to match that phase of the workout
      if (secondsLeftRef.current <= 0) {
        workoutIndex++;
        secondsLeftRef.current = workoutArray[workoutIndex];

        //if they reach the end of the workout, show the other screen
        if (workoutIndex >= workoutArray.length) {
          settingsInfo.setShowSettings(true);
        }

        //update the time values being tracked in GUI
        setTimeVal(workoutArray[workoutIndex]);
        timeValRef.current = workoutArray[workoutIndex];

        //Check if they are on a rep or a rest, and send to GUI
        //(Alternates between working (rep) or not (rest))
        setWorkingState(!workingStateRef.current);
        workingStateRef.current = !workingStateRef.current;
      }
      setSecondsLeft(secondsLeftRef.current);
    }, 10);
    return () => clearInterval(interval);
  }, [settingsInfo]);

  return (
    <View style={styles.container}>
      {/* Creating inner and outer timed circles to track overall and task progress */}
      <View style={styles.circles}>
        <ProgressCircle
          percent={(currentTimeRef.current / totalTimeRef.current) * 100}
          radius={180}
          borderWidth={30}
          color={colors.tertiary}
          shadowColor={colors.dark}
          bgColor={colors.light}
        >
          <ProgressCircle
            percent={100 - (secondsLeft / timeVal) * 100}
            radius={150}
            borderWidth={50}
            color={workingStateRef.current ? colors.primary : colors.secondary}
            shadowColor={colors.dark}
            bgColor={colors.light}
          >
            <Text style={styles.InnerText}>{Math.ceil(secondsLeft)}</Text>
          </ProgressCircle>
        </ProgressCircle>
      </View>

      {/* Playing and pausing, and updating state based on current state */}
      <Pressable
        style={styles.buttonStart}
        onPress={() => {
          setIsPaused(!isPaused);
          isPausedRef.current = !isPausedRef.current;
        }}
      >
        <Text style={styles.textButton}>
          {isPausedRef.current ? "Play" : "Pause"}
        </Text>
      </Pressable>

      {/* Ability to go back */}
      <Pressable
        style={styles.buttonBack}
        onPress={() => {
          settingsInfo.setShowSettings(true);
        }}
      >
        <Text style={styles.textButtonBack}>Back</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", alignContent: "center" },
  InnerText: {
    fontSize: 80,
    color: colors.dark,
  },
  circles: {
    top: 20,
  },
  buttonStart: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 50,
    elevation: 3,
    width: 150,
    // marginLeft: 80,
    // marginRight: 80,
    backgroundColor: colors.dark,
    marginTop: 80,
    bottom: 10,
    right: 10,
    position: "absolute",
  },
  buttonBack: {
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    padding: 10,
    borderRadius: 50,
    bottom: 10,
    left: 10,
    backgroundColor: colors.primary,
    position: "absolute",
  },
  textButton: {
    fontSize: 40,
    color: colors.light,
  },
  textButtonBack: {
    fontSize: 40,
    color: colors.light,
  },
});

export default Timer;
