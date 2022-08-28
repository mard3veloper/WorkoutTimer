# Workout Timer

A dead simple workout timer, with the ability to change reps, sets, time at each rep, rest between reps, rest between sets. Two workout indicators measure progress, an outer circle for overall progress through the workout, and an inner circle for progress through each rep and rest. The colors change depending on whether in rest or workmode.

I made some basic validation on the input. If bad values are submitted, then it will just use the last valid values used, (or the defaults if none are provided). A colors file has also been included to make changing the color scheme for the app easy.

The library used for renering the circular countdown has an obsolete dependency, so I resolved that and uploaded the node modules (which is why they were not ignored)

Project can be started using either node (npm start) or expo (expo start)
