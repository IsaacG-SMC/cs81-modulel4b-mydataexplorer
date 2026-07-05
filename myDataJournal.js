// Isaac Garcia
// CS81, sect. 1233
// https://github.com/IsaacG-SMC/cs81-modulel4b-mydataexplorer

// Weekly Journal
const weekData = [
    {day: "Sunday", sleepHours: 7, screenTime: 6.5, mood: "Joyful", caffineIntake: 0, focusLevel: 6},
    {day: "Monday", sleepHours: 6, screenTime: 8.83, mood: "Anxious", caffineIntake: 0, focusLevel: 4},
    {day: "Tuesday", sleepHours: 7, screenTime: 8, mood: "Relieved", caffineIntake: 0, focusLevel: 3},
    {day: "Wednesday", sleepHours: 7, screenTime: 4.25, mood: "Joyful", caffineIntake: 0, focusLevel: 4},
    {day: "Thursday", sleepHours: 9, screenTime: 9.16, mood: "Fine", caffineIntake: 0, focusLevel: 5},
    {day: "Friday", sleepHours: 5, screenTime: 8.66, mood: "Anxious", caffineIntake: 0, focusLevel: 3},
    {day: "Saturday", sleepHours: 9, screenTime: 7.16, mood: "Tired", caffineIntake: 0, focusLevel: 4}
];

/* --- PREDICTIONS ---
*   1. Thursday had the most screen time.
*   2. Sunday was the best focus day.
*   3. Who's to say, because I don't drink caffeine at all.
*/

function findHighestScreenTime(log){
    let screenTimeMax = 0;
    let maxDay;
    for(let current of log){
        if(current.screenTime > screenTimeMax) {
            screenTimeMax = current.screenTime;
            maxDay = current.day;
        }
    }
    return maxDay;
}

function averageSleep(log){
    let totalSleepTime = 0;
    let totalDays = 0;
    for(let current of log){
        totalSleepTime += current.sleepHours;
        totalDays++;
    }
    return totalSleepTime/totalDays;
}

function mostFrequencyMood(log){
    const moods = {};   // object to store moods and their frequency
    for(let current of log){    // loop through each entry in log
        if(!moods[current.mood]){   // If the current mood is not in moods{}...
            moods[current.mood] = 1;    // moods{current.mood: 1}
        } else {
            moods[current.mood]++;  // moods{current.mood: n+1}
        }
    }

    let moodCount = 0;
    let frequentMood;
    for(let current in moods){  // loop through each mood in moods
        if(moods[current] > moodCount){ // If # of times current mood > moodCount
            frequentMood = current;     // frequentMood stores string of current mood (key)
            moodCount = moods[current]; // moodCount stores # of times that move appeared (value)
        }
    }
    return frequentMood;
}

function correlateCaffeineToFocus(log){
    // We'll define [1, 4] as unfocused and [5, 10] as focused

    // 00: no caffeine, unfocused; 01: no caffeine, focused; 10: caffeine, unfocused; 11: caffeine, focused
    let table = [0,0,0,0];
    for(let current of log){    // loop through all objects in log array
        if(current.caffineIntake > 0){  // If there is caffeine...
            if(current.focusLevel > 4){ // ...and focused...
                table[3]++;             // 1 tally for 11: caffeine, focused
            } else {
                table[2]++;             // else, 1 tally for 10: caffeine, unfocused
            }
        } else {                        // No caffeine
            if(current.focusLevel > 4){ // and focused
                table[1]++;             // tally for 01: no caffeine, focused
            } else {
                table[0]++;             // else, tally for 00: no caffeine, unfocused
            }
        }
    }
    // table = [5, 2, 0, 0]

    // Taken from textbook, chapter 4 - sect. Computing Correlation - phi coefficient formula
    return (table[3] * table[0] - table[2] * table[1]) /
        Math.sqrt((table[2] + table[3]) *
            (table[0] + table[1]) *
            (table[1] + table[3]) *
            (table[0] + table[2]));
}

console.log(findHighestScreenTime(weekData)); // Thursday
console.log(averageSleep(weekData)); // 7.14
console.log(mostFrequencyMood(weekData)); // Joyful
console.log(correlateCaffeineToFocus(weekData)); // NaN, because it divides by 0