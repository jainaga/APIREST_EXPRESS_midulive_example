var express = require('express');
var router = express.Router();
const movies = require('./movies.json')
const crypto = require('node:crypto'); // esto es para generar un id aleatorio, no es necesario el require, funciona igual
const { validateMovie, partialvalidateMovie } = require('../schemas/movies.js');

/* GET users listing. */
// router.get('/movies', (req, res, next) => {
//     res.send('hola que hace')
// })

router.get('/', (req, res) => {
    const { genre } = req.query;
    const { title } = req.query;
    if (genre) {
      const filteredMovies = movies.filter(
        movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase()));
      if (filteredMovies.length === 0) {
        return res.status(404).json({ error: 'There are no movies with these genre' });
      }
      return res.json(filteredMovies);
    }
    else if (title) {
      const movie = movies.find(movie => movie.title.toLowerCase() === title.toLowerCase());
      if (movie) return res.json(movie);

      res.status(404).json({ error: 'Movie not found' });
  }
  
    res.json(movies);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const movie = movies.find(movie => movie.id === id);
  if (movie) return res.json(movie);

  res.status(404).json({ error: 'Movie not found' });
}
);

router.post('/', (req, res) => { // esto no funciona pero no valida nada, entonces usamos zod
  const result = validateMovie(req.body);
  if (result.error) {
    return res.status(400).json({ error: result.error.issues });
  }

  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data,
  };


    // const { title, director, year, rate, genre, duration } = req.body;
    // if (!title || !director || !year || !genre || !duration) {
    //   return res.status(400).json({ error: 'Some fields are missing' });
    // }
    // const id = crypto.randomUUID();
    // const newMovie = { id, title, director, year, rate: rate ?? 0  , /// esto es para poner por defecto rate 0 si no se pone nada
    //   genre, duration };
    movies.push(newMovie);
    res.status(201).json(newMovie);
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const result = partialvalidateMovie(req.body);
  if (result.error) {
    return res.status(400).json({ error: result.error.issues });
  }
  // const movie = movies.find(movie => movie.id === id); //se puede hacer la busqueda de index directamente
  // if (!movie) {
  //   return res.status(404).json({ error: 'Movie not found' });
  // }
  // const updatedMovie = {
  //   ...movie,
  //   ...result.data,
  // };
  // movies[movies.indexOf(movie)] = updatedMovie;
  // res.json(updatedMovie);

  const movie = movies.findIndex(movie => movie.id === id);
  if (movie === -1) {
    return res.status(404).json({ error: 'Movie not found' });
  }

  const updatedMovie = {
    ...movies[movie],
    ...result.data
  }
  movies[movie] = updatedMovie;
  res.json(updatedMovie);
});
  




module.exports = router;
