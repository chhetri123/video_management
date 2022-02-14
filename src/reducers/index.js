import { combineReducers } from "redux";

const songsReducers = () => {
  return [
    {
      title: "mutu xhune lumkeko",
      singer: "ram bahadur ",
      duration: "5:50",
    },
    {
      title: "pari to dadama ",
      singer: "Hari bahadur",
      duration: "3:00",
    },
    {
      title: "ek sarbanam",
      singer: "sajjan Raj ",
      duration: "3:00",
    },
  ];
};

const selectedSongReducer = (selectedSong = null, action) => {
  if (action.type === "SONG_SELECTED") return action.payLoad;
  return selectedSong;
};

export default combineReducers({
  songs: songsReducers,
  selectedSong: selectedSongReducer,
});
