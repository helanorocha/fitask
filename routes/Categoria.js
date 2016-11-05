module.exports = function(app){

	function verificaAutenticacao(req, res, next) {
		//if (req.isAuthenticated()) {
			return next();
	//	} else {
	//		res.status('401').json('Não autorizado');
	//	}
	}

	var categoria = app.controllers.Categoria;
	app.get('/categoria/all', verificaAutenticacao, categoria.list);
	app.get('/categoria/one/:id', verificaAutenticacao, categoria.show);
	app.post('/categoria/create', verificaAutenticacao, categoria.create);
	app.put('/categoria/update/:id', verificaAutenticacao, categoria.edit);
	app.delete('/categoria/remove/:id', verificaAutenticacao, categoria.destroy);
	app.get('/categoria/search', verificaAutenticacao, categoria.page);
	app.get('/categoria/count', verificaAutenticacao, categoria.count);
}
