const mongoose = require('mongoose');
const { default: isURL } = require('validator/lib/isURL');

const { ObjectId } = mongoose.Schema.Types;

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: [isURL, 'Неправильный формат ссылки'],
  },
  trailerLink: {
    type: String,
    required: true,
    validate: [isURL, 'Неправильный формат ссылки'],
  },
  thumbnail: {
    type: String,
    required: true,
    validate: [isURL, 'Неправильный формат ссылки'],
  },
  owner: {
    type: ObjectId,
    required: true,
    ref: 'user',
  },
  movieId: {
    type: ObjectId,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
