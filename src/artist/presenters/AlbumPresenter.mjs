const formatTime = (time) => {
  const hours = Math.trunc(time / 3600).toString();
  const minutes = Math.trunc((time % 3600) / 60).toString();
  const seconds = (time % 3600 % 60).toString();

  return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
};

const presentSong = (song) => ({
  id: song.id,
  name: song.name,
  track: song.track,
  time: formatTime(song.time),
});

const presenter = (album) => ({
  id: album.id,
  name: album.name,
  year: album.year,
  songs: album.songs.map(presentSong),
  created_at: album.createdAt,
  updated_at: album.updatedAt,
});

export default {
  present: presenter,
};
