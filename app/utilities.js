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
