const express = require("express");
const cors = require("cors");
const service = express();

service.use(cors());
service.use(express.json());
 
let customers = [
    {id: 1, nome: "DevSamurai", site:"http://devsamurai.com.br"},
    {id: 2, nome: "Google", site:"http://google.com"},
    {id: 3, nome: "Uol", site: "http://uol.com.br"}
];

//retornando os customers individul.
service.get("/customers/:id", (req, res)=>{
    const id = parseInt(req.params.id);
    const customer = customers.find(item => item.id === id);
    const status = customer ? 201 : 404;

    return res.status(status).json(customer);
} );

//para criar novo postar novo customers.
service.post("/customers", (req, res) =>{
    const {nome, site} = req.body;
    const id = customers[customers.length - 1].id + 1;
    const newPost = {id, nome, site};
    customers.push(newPost);

    return res.status(201).json(newPost);
});

//Atualização de registro.
service.put("/customers/:id", (req, res)=>{
    const id = parseInt(req.params.id);
    const {nome, site} = req.body;
    const index = customers.findIndex(item => item.id === id);
    const status = index >= 0 ? 200 : 404;

    if(index >= 0 ){
        customers[index] = {id: parseInt(id), nome, site};
    };
    return res.status(status).json(customers[index]);
});

//Excluir um registro.
service.delete("/customers/:id", (req, res)=>{
    const id = parseInt(req.params.id);
    const index = customers.findIndex(item => item.id === id);
    const status =  index >= 0 ? 200 : 404;

    if(index >= 0){
        customers.splice(index, 1);
    }
    return res.status(status).json();
});

service.get("/customers", (req, res) =>{
    return res.json(customers)
})

service.listen(3000, () => console.log("Rodando..."))