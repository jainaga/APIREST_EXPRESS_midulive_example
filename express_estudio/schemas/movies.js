const z = require('zod');
const mongoose = require('mongoose');

const movieSchema = z.object({
    title: z.string(),
    year: z.number().int().min(1900).max(2024),
    director: z.string(),
    duration: z.number().int(),
    genre: z.array(
        z.enum(['Action', 'Adventure', 'Comedy', 
        'Drama', 'Fantasy', 'Horror', 'Mystery', 'Thriller', 'Western',
        'Animation', 'Crime', 'Sci-Fi', 'Romance', 'Family', 'War', 'Musical', 'Biography', 
        'History', 'Sport', 'Music', 'Documentary', 'name'])
    ),
    rate: z.number().min(0).max(10).default(0)
})

//const movie = mongoose.model('Movie', movieSchema);


function validateMovie(object) {
    return movieSchema.safeParse(object) //usa el schema para validar el objeto
}

function partialvalidateMovie(object) {
    return movieSchema.partial().safeParse(object) //usa el schema para validar el objeto
}



module.exports = {validateMovie, partialvalidateMovie}; // esto es para exportar la funcion validateMovie