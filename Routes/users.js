const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middlewares/auth');

const connection = require('../BD/connectionBD');
const schemaUser = require('../BD/model/schemaUser');

const createToken = (userId) => {
    return jwt.sign({ id: userId }, 'jwtNodeProjet2019', { expiresIn: '1m' });
}
router.get('/', auth, async (req, res) => {

    console.log(res.locals.local_auth);

    try {
        const users = await schemaUser.find({});
        res.send(users);
    } catch (e) {
        res.status(500).send({ error: 'Erro ao consultar usuários' });
    }
});

router.get('/', async (req, res) => {
    try {
        const user = await schemaUser.find({});
        res.send(user);
    } catch (err) {
        return res.status(500).send({ error: 'Erro ao consultar usuarios' });
    }
});

router.post('/', async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) return res.status(400).send({ error: 'Dados insuficientes' });

    try {
        if (await schemaUser.findOne({ email })) return res.status(404).send({ error: 'Usuário já cadastrado' });

        const user = await schemaUser.create(req.body);

        user.password = undefined;
        res.send({ user, token: createToken(user.id) });

    } catch (err) {
        return res.status(500).send({ error: 'Erro ao criar usuário' });
    }

});


router.post('/auth', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.send({ error: 'Dados insuficientes!' });

    try {

        const user = await schemaUser.findOne({ email }).select('+password');

        if (!user) return res.status(404).send({ error: 'Usuário não encontrado' });

        const pass_ok = await bcrypt.compare(password, user.password);

        if (!pass_ok)
            return res.status(401).send({ error: 'Usuário ou senha incorretos, por favor verifique e tente novamente' });

            user.password = undefined;
        return res.send({ user, token: createToken(user.id) });

    } catch (err) {
        console.log(err);
        return res.status(500).send({ error: 'Erro ao procurar usuário' });
    }
});

module.exports = router;