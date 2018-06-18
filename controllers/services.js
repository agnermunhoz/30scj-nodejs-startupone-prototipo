module.exports = function (app) {

    var Fluxo = app.models.fluxos;
    var Itens = app.models.itens;
    var Dados = app.models.dados;

    var ServicesController = {
        list: function (request, response) {

            console.log("list");

            Fluxo.find(function (erro, fluxos) {
                if (erro) {
                    response.status(404).send({ message: 'Service not found!' });
                }
                else {
                    var data = [];
                    /*
                    for(var i=0; i < fluxos.length; i++){
                        data.push({
                            id: fluxos[i]._id,
                            nome: fluxos[i].nome,
                            descricao: fluxos[i].descricao
                        })
                    }
                    */
                    fluxos.forEach(fluxo => {
                        data.push({
                            id: fluxo._id,
                            nome: fluxo.nome,
                            descricao: fluxo.descricao
                        })
                    });
                    console.log("fim");
                    response.status(200).send(data);
                }
            });

        },
        getservice: function (request, response) {
            console.log("getservice");

            var id = request.params.id;

            console.log("get id " + id);

            Fluxo.findById(id, function (erro, fluxo) {
                if (erro) {
                    response.status(404).send({ message: 'Service not found!' });
                }
                else {

                    Itens.find({ 'fluxo': fluxo }, function (erro, itens) {
                        if (erro) {
                            response.status(404).send({ message: 'Service not found!' });
                        }
                        else {
                            fluxo.itens = itens;
                            var data = ({
                                id: fluxo._id,
                                nome: fluxo.nome,
                                descricao: fluxo.descricao,
                                itens: []
                            });
                            itens.forEach(item => {
                                data.itens.push({
                                    nome: item.nome,
                                    descricao: item.descricao,
                                    tipo: item.tipo,
                                    metodo: item.metodo
                                });
                            });
                            response.status(200).send(data);
                        }
                    });

                }
            });
        },
        postservice: function (request, response) {
            console.log("postservice");
            
            var id = request.params.id;

            console.log("get id " + id);

            Fluxo.findById(id, function (erro, fluxoe) {
                if (erro) {
                    response.status(404).send({ message: 'Service not found!' });
                }
                else {
                    console.log("find fluxo");
                    console.log(request.body);
                    var itens = request.body.itens;
                    var dados = { fluxo: fluxoe, itens: itens}
                    console.log(dados)
                    Dados.create(dados, function (erro, dados) {
                        if (erro) {
                            //response.redirect('/novocurso');
                            console.log("Erro ao gravas os dados!");
                            response.send(erro);
                        }
                        else {
                            // response.redirect('/menu');
                            console.log("Dados gravados com sucesso!");
                            response.json(dados);
                        }
                    });
                    Dados.save;
                }
            });
            
            //response.status(404).send({ message: 'Service not found!' });
        },
        getresults: function (request, response) {
            console.log("getresults");
            var id = request.params.id;

            console.log("get id " + id);

            Fluxo.findById(id, function (erro, fluxo) {
                if (erro) {
                    response.send(erro);
                }
                else {
                    
                    Dados.find({ 'fluxo': fluxo }, function (erro, dados) {
                        if (erro) {
                            response.send(erro);
                        }
                        else {
                            response.json(dados);
                        }
                    });
                }
            });
        },
        results: function (request, response) {
            console.log("getservice");

            if (request.query.id) { 
                //request.session.fluxo = null;

                Fluxo.findById(request.query.id, function (erro, fluxo) {
                    if (erro) {
                        response.redirect('/');
                    }
                    else {
                        Itens.find({ 'fluxo': fluxo }, function (erro, itens) {
                            if (erro) {
                                response.redirect('/');
                            }
                            else {
                                fluxo.itens = itens;
                                Dados.find({ 'fluxo': fluxo }, function (erro, dados) {
                                    if (erro) {
                                        response.redirect('/');
                                    }
                                    else {
                                        var params = { fluxo: fluxo, dados: dados };
                                        response.render('fluxos/results', params);
                                    }
                                });
                            }
                        });
                        
                    }
                });
            } else {
                response.sendStatus(404);
            }
        },
    };
    return ServicesController;
};