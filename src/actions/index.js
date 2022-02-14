export const selectSong = (song) => {
  return {
    type: "SONG_SELECTED",
    payLoad: song,
  };
};
