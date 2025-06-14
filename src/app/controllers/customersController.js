let customers = [
            {id: 1, nome: "DevSamurai", site: "http://devsamurai.com.br"},
            {id: 2, nome: "Google", site: "http://google.com"},
            {id: 3, nome: "Uol", site: "http://uol.com.br"}
        ];

class CustomersController {
    
    //Listagem de registros
    index(req, res){
        res.json(customers);
    };

    //Recupera um registro
    show(req, res){
        const id = parseInt(req.params.id);
        const customer = customers.find(item => item.id === id);
        const status = customer ? 200 : 404;

        return res.status(status).json(customer)
    };

    //Cria um novo registro
    create(req, res){
        const {nome, site} = req.body;
        const id = customers[customers.length - 1].id + 1;
        const newCustomer = {id, nome, site};
        this.customers.push(newCustomer);

        return res.status(201).json(newCustomer)
    };
    
    //Atualiza um registro
    update(req, res){
        const id = parseInt(req.params.id);
        const {nome, site} = req.body;
        const index = customers.findIndex(item => item.id === id);
        const status = index >= 0 ? 200 : 404;
        if(index >= 0){
            customers[index] = {id: parseInt(id), nome, site};
        };

        return res.status(status).json(customers[index])
    };

    //Deleta um registro
    destroy(req, res){
        const id = parseInt(req.params.id);
        const index = customers.findIndex(item => item.id === id);
        const status = index >= 0 ? 200 : 404;
        if(index >=0){
            customers.splice(index, 1);
        }

        return res.status(status).json();
    };

};
module.exports = new CustomersController();