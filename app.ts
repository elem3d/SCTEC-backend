import express from "express";
import clientsRouter from "./Routes/clients";
import path from "path";
import db from "./db"

const app = express();

app.use(express.urlencoded({extended: true}))

//Lê a pasta public:
app.use(express.static(path.join(__dirname, 'public')));

//Lê as rotas:
app.use(clientsRouter);


//Seta as views:
app.set('view engine', 'pug');
app.set('views', './Views');


//Sync com o banco de dados:
db.sync().then(() =>{
    console.log("Conectado com o Banco:" + process.env.DB_NAME)
}).then(() =>{
     app.listen(process.env.PORT, () =>{
    console.log("Servidor sendo criado...")
})
})

