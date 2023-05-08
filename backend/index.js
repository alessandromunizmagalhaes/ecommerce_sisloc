// dependencias
const express = require('express')
const cors = require('cors')

// configuracao express
const app = express();
app.use(cors())
app.use(express.json())


// definindo constantes
const db_sql = require("mssql/msnodesqlv8");
const db_config  = {
    database: "ecommerce_sisloc",
    server: "localhost",
    options: {
        trustedConnection: true
    }
};

// endpoint teste
app.get('/', (request, response) => {
    console.log('endpoint funcionando');
});


// endpoint login com jwt
const jsonwebtoken = require("jsonwebtoken");
const {user, PRIVATE_KEY, tokenValidated} = require("./auth.js");
app.post('/login', (req, res) => {
    
    const email = req.body ? req.body.email : '';
    const password = req.body ? req.body.senha : '';

    try{
        const correctPassword = email === 'fredx@sisloc.com.br' && password === '123Fred';
        console.log(req.body);
        
        if(!correctPassword) return res.status(401).send('E-mail ou senha inválidos');

        const token = jsonwebtoken.sign(
            { user: JSON.stringify(user) },
            PRIVATE_KEY,
            {expiresIn: '60m'}
        );

        return res.status(200).json({data: {access : token}})

    }catch(error){
        console.log(error);
        return res.send(error);
    }
});

// endpoint - produtos
app.get('/produtos', async (request, response) => {

    var pesquisa = request.query.pesquisa || '';

    await db_sql.connect(db_config);
    try{
        const result = await db_sql.query(`select * from produtos where prod_nome LIKE '%${pesquisa}%' order by prod_id`);
        if(result) {
            retorno = result.recordset;
        }

        response.send(retorno);
    } catch(e) {
        console.log(e);
        response.send('Erro interno na requisição SQL');
    }
});


// endpoint - produto/:prod_id
app.get('/produto', async (request, response) => {

    var prod_id = request.query.prod_id || '';

    await db_sql.connect(db_config);
    try{
        const result = await db_sql.query(`select * from produtos where prod_id = '${prod_id}'`);
        if(result) {
            retorno = result.recordset;
        }

        response.send(retorno);
    } catch(e) {
        console.log(e);
        response.send('Erro interno na requisição SQL');
    }
});

// escutando
app.listen(3000, () => {
  console.log(`Escutando na porta 3000`)
});