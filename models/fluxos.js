module.exports = function (app) {

    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    var fluxo = Schema({
        nome: { type: String, require: true },
        descricao: { type: String }
    });

    return mongoose.model('fluxos', fluxo);
};