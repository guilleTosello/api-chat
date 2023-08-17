const express = require('express');
const router = express.Router();

const Usuario = require('../models/Usuario')

const { requiredScopes } = require("express-oauth2-jwt-bearer");

//endpoint para obtener todos los usuarios 
router.get("/", requiredScopes("read:usuarios"), async (req, res) => {
    try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
    } catch (error) {
    res.status(500).json({ error: "Error al obtener los usuarios" });
    }
    })

//endpoint para crear un nuevo Usuario
router.post('/', requiredScopes('write:usuarios'), async(req, res)=> {
    try{
        const nuevoUsuario = new Usuario(req.body);
        await nuevoUsuario.save();
        res.json(nuevoUsuario)
    }catch(error){
        res.status(500).json({error: 'Error al crear el Usuario'})
    }
})

//endpoint para actualizar un Usuario
router.put('/:id', requiredScopes('write:usuarios'), async(req, res)=> {
    try{
        const UsuarioUpd = await Usuario.findByIdAndUpdate(req.params.id, req.body, 
            {
                new: true,
        });
        res.json(UsuarioUpd)
    }catch(error){
        res.status(500).json({error: 'error al actualizar el Usuario'})
    }
})


//endpoint para eliminar un Usuario

router.delete('/:id', requiredScopes('write:usuarios'), async(req, res) => {
    try{
        await Usuario.findByIdAndDelete(req.params.id);
        res.json({message: 'Usuario eliminado correctamente'})
    }catch(error){
        res.status(500).json({error: 'Error al eliminar el Usuario'})
    }
});

module.exports = router;