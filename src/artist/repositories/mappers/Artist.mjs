import Artist from '../../entities/Artist.mjs';

const mapFromDatabase = (artistRaw) => Artist.from(
  artistRaw.id,
  artistRaw.name,
  artistRaw.genre,
  artistRaw.created_at,
  artistRaw.updated_at,
);

const mapToDatabase = (artist) => ({
  id: artist.id,
  name: artist.name,
  genre: artist.genre,
  created_at: artist.createdAt,
  updated_at: artist.updatedAt,
});

export default {
  mapFromDatabase,
  mapToDatabase,
};
