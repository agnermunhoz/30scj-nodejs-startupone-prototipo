module.exports = function (app) {

    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    var item = Schema({
        fluxo: {type: Schema.Types.ObjectId, ref: 'Fluxo'},
        nome: {type: String, require: true},
        descricao: {type: String},
        tipo: {type: String},
        metodo: {type: String}
    });

    return mongoose.model('itens', item);
};