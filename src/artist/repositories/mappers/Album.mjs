import Album from '../../entities/Album.mjs';

const mapFromDatabase = (albumRaw) => Album.from(
  albumRaw.id,
  albumRaw.artist,
  albumRaw.name,
  albumRaw.year,
  albumRaw.songs,
  albumRaw.created_at,
  albumRaw.updated_at,
);

const mapToDatabase = (artist) => ({
  id: artist.id,
  artist: artist.artist,
  name: artist.name,
  year: artist.year,
  songs: artist.songs,
  created_at: artist.createdAt,
  updated_at: artist.updatedAt,
});

export default {
  mapFromDatabase,
  mapToDatabase,
};
