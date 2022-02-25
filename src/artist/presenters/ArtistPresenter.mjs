const presenter = (artist) => ({
  id: artist.id,
  name: artist.name,
  genre: artist.genre,
  created_at: artist.createdAt,
  updated_at: artist.updatedAt,
});

export default {
  present: presenter,
};
