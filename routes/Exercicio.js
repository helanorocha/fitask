module.exports = function(app){

	function verificaAutenticacao(req, res, next) {
		//if (req.isAuthenticated()) {
			return next();
	//	} else {
	//		res.status('401').json('Não autorizado');
	//	}
	}

	var exercicio = app.controllers.Exercicio;
	app.get('/exercicio/all', verificaAutenticacao, exercicio.list);
	app.get('/exercicio/one/:id', verificaAutenticacao, exercicio.show);
	app.post('/exercicio/create', verificaAutenticacao, exercicio.create);
	app.put('/exercicio/update/:id', verificaAutenticacao, exercicio.edit);
	app.delete('/exercicio/remove/:id', verificaAutenticacao, exercicio.destroy);
	app.get('/exercicio/search', verificaAutenticacao, exercicio.page);
	app.get('/exercicio/count', verificaAutenticacao, exercicio.count);
}
