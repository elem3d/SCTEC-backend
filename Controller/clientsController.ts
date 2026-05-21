import {Request, Response} from "express";
import { IClients } from "../Model/clients";
import clientsModel from "../Model/clientsModel";
import {Op} from "sequelize";

async function index(req: Request, res: Response){
    res.render('index');
}

async function clients(req: Request, res: Response){
    //res.render('index');
    const clients = await clientsModel.findAll();
    res.json(clients)
}

async function show(req: Request, res: Response){
    //res.render('index');
    const client = await clientsModel.findByPk(req.params.id as string);
    res.json(client)
}

async function edit(req: Request, res: Response){
    const client = await clientsModel.findByPk(req.params.id as string)
    res.render("edit", {client: client});
}

async function update(req: Request, res: Response){
    const id = req.params.id;
    const dadosAtualizados = req.body as IClients;

    await clientsModel.update(
        dadosAtualizados, { 
        where: { 
            id: req.params.id 
        }
    });
    res.redirect('/');
}

async function del(req: Request, res: Response){
    await clientsModel.destroy({
        where:{
            id: req.params.id
        }
    })
    res.redirect('/')
}

async function create(req: Request, res: Response){
    res.render('create');   
}

function sobre(req: Request, res: Response){
    res.render('sobre');
};

async function store(req: Request, res: Response){

    let clients = req.body as IClients;

    await clientsModel.create({...clients});

    res.redirect('/');
}

async function search(req: Request, res: Response){
    //tentar isso primeiro, se não der certo capturar o erro:
    try {
        //Salva a palavra digitada na busca
        const clientSearch = req.query.busca as string;
        //Fazer a busca no db:
        const clientsFound = await clientsModel.findAll({
            where:{
                // [Op.or] diz pro Sequelize: "Traga se encaixar na regra A OU na regra B"
                [Op.or]: [
                    {nome:{[Op.substring]: clientSearch}},
                    {email:{[Op.substring]: clientSearch}}
                ]
            }
        })
            res.render('index', {clients: clientsFound});
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        res.status(500).json({ erro: "Erro interno ao realizar a busca." });
    };
}
    
     


export default {index, show, edit, sobre, store, create, update, del, search}