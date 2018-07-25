module.exports = function (app) {

    var Fluxo = app.models.fluxos;
    var Itens = app.models.itens;
   
    var FluxosController = {
        //chamadas a páginas via get
        home: function (request, response) {

            Fluxo.find(function (erro, fluxos) {
                if (erro) {
                    response.render('/');
                }
                else {
                    var params = { fluxos: fluxos };
                    response.render('fluxos/home', params);
                }
            });

        },
        novo: function (request, response) {

            var nome = request.body.fluxo.nome;
            
            if (nome.trim().length == 0) {
                response.redirect('/');
            }
            else {

                var fluxo = request.body.fluxo;
                Fluxo.create(fluxo, function (erro, fluxo) {
                    if (erro) {
                        //response.redirect('/novocurso');
                        console.log("Erro ao gravas o fluxo!");
                    }
                    else {
                        // response.redirect('/menu');
                        console.log("Fluxo gravado com sucesso!");
                    }
                });
                Fluxo.save;
            }
            response.redirect('/');
        },
        delete: function (request, response) {

            Fluxo.remove({ _id: request.query.id }, function (erro) {
                if (erro) {
                    console.log("Erro ao deletar o fluxo!");
                }
                else {
                    console.log("Fluxo deletado com sucesso!");
                }
            });

            response.redirect('/');
        },
        settings: function (request, response) {

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
                                var params = { fluxo: fluxo, itens: itens };
                                response.render('fluxos/settings', params);
                            }
                        });
                    }
                });
            } else {
                if (!request.session.fluxo) {
                    response.redirect('/');
                }
            }
        },
        novoitem: function (request, response) {

            if (request.query.id) { 
                //request.session.fluxo = null;

                Fluxo.findById(request.query.id, function (erro, fluxo) {
                    if (erro) {
                        response.redirect('/');
                    }
                    else {
                        
                        var item = request.body.item;
                        item.fluxo = fluxo;
                        Itens.create(item, function (erro, item) {
                            if (erro) {
                                //response.redirect('/novocurso');
                                console.log("Erro ao gravas o item!");
                            }
                            else {
                                // response.redirect('/menu');
                                console.log("Item gravado com sucesso!");
                            }
                        });
                        Itens.save;

                        response.redirect('/settings?id='+fluxo._id);
                    }
                });
            } else {
                if (!request.session.fluxo) {
                    response.redirect('/');
                }
            }
        },
        deleteitem: function (request, response) {

            Fluxo.remove({ _id: request.query.id }, function (erro) {
                if (erro) {
                    console.log("Erro ao deletar o fluxo!");
                }
                else {
                    console.log("Fluxo deletado com sucesso!");
                }
            });

            response.redirect('/');
        }
    };
    return FluxosController;
};