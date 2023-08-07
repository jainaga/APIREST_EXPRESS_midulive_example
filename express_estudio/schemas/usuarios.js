const z = require('zod');


const usuarioSchema = z.object({
    nombre: z.string(),
    nacimiento: z.number().int().min(1900).max(2024),
    email: z.string().email()
   
})




function validateUsuario(object) {
    return usuarioSchema.safeParse(object) //usa el schema para validar el objeto
}

function partialvalidateUsuario(object) {
    return usuariosSchema.partial().safeParse(object) //usa el schema para validar el objeto
}



module.exports = {validateUsuario, partialvalidateUsuario}; // esto es para exportar la funcion validateMovie