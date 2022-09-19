const Genre = require("../models/Genre.model");

module.exports.genresController = {
  addGenre: async (req, res) => {
    try {
      const { name, description } = req.body;
      const genre = await Genre.create({
        name,
        description,
      });
      return res.json(genre);
    } catch (error) {
      return res.json(error.message);
    }
  },
  deleteGenre: async (req, res) => {
    try {
      await Genre.findByIdAndDelete(req.params.id);
      return res.json("Genre deleted");
    } catch (error) {
      return res.json(error.message);
    }
  },
  updateGenre: async (req, res) => {
    try {
      const { name, description } = req.body;
      const genre = await Genre.findByIdAndUpdate(req.params.id, {
        name,
        description,
      });
      return res.json(genre);
    } catch (error) {
      return res.json(error.message);
    }
  },
  getallGenres: async (req, res) => {
    try {
      const genre = await Genre.find({});
      return res.json(genre);
    } catch (error) {
      return res.json(error.message);
    }
  },
};
