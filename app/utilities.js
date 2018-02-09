/** *** SOUND LOADER *** **/
import Sound from 'react-native-sound';

export function loadSoundPromise(birdSoundFilename) {
  return new Promise((resolve, reject) => {
    const sound = new Sound(birdSoundFilename, Sound.MAIN_BUNDLE, (err) => {
      if (err) {
        reject(err);
      }

      resolve(sound);
    });
  });
}

/** *** GET RANDOM BIRDS & HELPERS *** **/
function randomIndicesInRange(rangeEnd, numIndices) {
  // assumes range begins at 0
  const indices = [];
  while (indices.length !== numIndices) {
    const i = Math.floor(Math.random() * rangeEnd);
    if (!indices.includes(i)) { indices.push(i); }
  }
  return indices;
}

export function getRandomBirds(birds, number) {
  const randomBirds = [];
  const randomIndices = randomIndicesInRange(birds.length, number);
  for (const index of randomIndices) {
    randomBirds.push(birds[index]);
  }
  return randomBirds;
}

export function indexOfBird(uuid, chorus) {
  const index = chorus.map((b) => {
    if (b === null) return null;
    return b.uuid;
  }).indexOf(uuid);
  return index;
}

/** *** TIME FORMATTER *** **/
export function getTimeStrings(time) {
  let hourString;
  let minuteString;
  let periodString;

  if (time.hour === 0) {
    hourString = '12';
    periodString = 'am';
  } else if (time.hour < 12) {
    hourString = `${time.hour}`;
    periodString = 'am';
  } else if (time.hour === 12) {
    hourString = '12';
    periodString = 'pm';
  } else {
    hourString = `${time.hour - 12}`;
    periodString = 'pm';
  }

  if (time.minute < 10) minuteString = `0${time.minute}`;
  else minuteString = `${time.minute}`;

  return {
    hourString,
    periodString,
    minuteString,
  };
}

export function formatLabel(label) {
  let shortLabel = label;
  if (label.length > 25) {
    shortLabel = label.substring(0, 25);
    shortLabel += "...";
  }
  return shortLabel;
}

export function formatLabelLong(label) {
  let shortLabel = label;
  if (label.length > 40) {
    shortLabel = label.substring(0, 40);
    shortLabel += "...";
  }
  return shortLabel;
}


export function getDayStrings(days) {
  let daysSymbols = ["M", "Tu", "W", "Th", "F", "Sat", "Sun"];
  let daysString = "";
  for (var i = 0; i < days.length; i++) {
    if (days[i]) { 
      daysString += daysSymbols[i];
      daysString += ", ";
    }
  }
  daysString = daysString.slice(0, -2);
  if (daysString === "M") daysString = "Mondays";
  else if (daysString === "Tu") daysString = "Tuesdays";
  else if (daysString === "W") daysString = "Wednesdays";
  else if (daysString === "Th") daysString = "Thursdays";
  else if (daysString === "F") daysString = "Fridays";
  else if (daysString === "Sat") daysString = "Saturdays";
  else if (daysString === "Sun") daysString = "Sundays";
  else if (daysString === "M, Tu, W, Th, F, Sat, Sun") daysString = "Every day";
  else if (daysString === "M, Tu, W, Th, F") daysString = "Weekdays";
  else if (daysString === "Sat, Sun") daysString = "Weekends";

  return daysString;
}

export function getDayNames(days) {
  let dayStrings = ["Mondays, ", "Tuesdays, ", "Wednesdays, ", "Thursdays, ", "Fridays, ", "Saturdays, ", "Sundays, "];
  let dayString = "";
  days.map((day, index) => { if (day) { dayString += dayStrings[index]; }});
  return dayString;
}
