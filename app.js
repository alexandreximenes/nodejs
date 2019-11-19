const app = require('express')();
const bodyparser = require('body-parser');

const index = require('./Routes/index');
const users = require('./Routes/users');

 app.use(bodyparser.urlencoded({extended: true}));
 app.use(bodyparser.json());


app.use('/', index);
app.use('/users', users);

app.listen(3000);

module.exports = app;