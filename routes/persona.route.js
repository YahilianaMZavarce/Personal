const express = require('express');
const router = express.Router();
const Persona = require('../models/persona.model');

router.get('/', async (req, res) => {
    try {
        const { edad, region } = req.query;
        let query = {};

        
        if (edad) {
            const edadNumero = parseInt(edad, 10); 
            if (!isNaN(edadNumero)) {
                query.edad = edadNumero; 
            } else {
                return res.status(400).json({ message: "Edad debe ser un número válido." });
            }
        }

        
        if (region) {
            if (typeof region === 'string') {
                query.region = region;
            } else {
                return res.status(400).json({ message: "Región debe ser una cadena de texto." });
            }
        }

        
        const personas = await Persona.find(query);
        res.json(personas);

    } catch (err) {
        console.error("Error en la consulta:", err);  
        res.status(500).json({ message: err.message });
    }
});


router.get('/:id', async(req, res) => {
    try {
        const persona = await Persona.findById(req.params.id);
        if(!persona){
            return res.status(404).json({ message: 'Persona no encontrada'});

        }
        res.json(persona);
    } catch (err) {
        res.status(500).json({ message: err.message});
    }   
});


router.post('/', async (req, res) =>{
    console.log("Received POST request to /api/personas"); 
    console.log(req.body);
    const persona = new Persona({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        genero: req.body.genero,
        telefono: req.body.telefono,
        edad: req.body.edad,
        region: req.body.region
    });

    try {
        const newPersona= await persona.save();
        res.status(201).json(newPersona);

    } catch (err) {
        console.error(err); 
        if(err.name === 'ValidationError'){
            const errors = {};
            for (const field in err.errors) {
                errors[field] = err.errors[field].message;
            }
            return res.status(400).json({ message: 'Error de validación: ', errors});
        }
        res.status(400).json({ message: err.message });
    }
});


router.put('/:id', async (req, res) => {
    try {
        const persona = await Persona.findByIdAndUpdate(req.params.id, req.body, {
            new: true, runValidators: true
        })
        if (!persona){
            return res.status.apply(404).json({ message: 'Persona no encontrada'});
        }
        res.json(persona);
    } catch (err){
        if( err.name === 'ValidationError') {
            const errors = {};
            for(const field in err.errors) {
                errors[field] = err.errors[field].message;
            }
            return res.status(400).json({message: 'Error de validación', errors });
        }
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const persona = await Persona.findByIdAndDelete(req.params.id);
        if(!persona){
            return res.status(404).json({ message: 'Persona no encontrado'});
        }
        res.json({ message: 'Persona eliminada exitosamente'});
    }catch (err) {
        res.status(500).json({ message: err.message });
    }
});



module.exports = router;