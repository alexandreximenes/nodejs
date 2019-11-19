const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.send({message: 'chamando rota GET do index'}));
router.post('/', (req, res) => res.send({message: 'chamando rota POST do index'}));

module.exports = router;