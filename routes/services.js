module.exports = function (app) {
    var services = app.controllers.services;
    app.get('/services', services.list);
    app.get('/service/:id', services.getservice);
    app.post('/service/:id', services.postservice);
    app.get('/results', services.results);
    app.get('/results/:id', services.getresults);

}; 