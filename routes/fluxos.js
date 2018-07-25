module.exports = function (app) {
    var fluxos = app.controllers.fluxos;
    app.get('/', fluxos.home);
    app.get('/home', fluxos.home);
    app.post('/novo', fluxos.novo);
    app.get('/delete', fluxos.delete);
    app.get('/settings', fluxos.settings);
    app.post('/novoitem', fluxos.novoitem);
    app.get('/deleteitem', fluxos.deleteitem);
}; 