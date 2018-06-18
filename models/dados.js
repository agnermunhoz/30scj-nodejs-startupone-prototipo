module.exports = function (app) {

    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;

    var dado = Schema({
        fluxo: {type: Schema.Types.ObjectId, ref: 'Fluxo'},
        itens: [{type: String}]
    });

    return mongoose.model('dados', dado);
};