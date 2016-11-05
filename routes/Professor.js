module.exports = function(app){

	function verificaAutenticacao(req, res, next) {
		//if (req.isAuthenticated()) {
			return next();
	//	} else {
	//		res.status('401').json('Não autorizado');
	//	}
	}

	var professor = app.controllers.Professor;
	app.get('/professor/all', verificaAutenticacao, professor.list);
	app.get('/professor/one/:id', verificaAutenticacao, professor.show);
	app.post('/professor/create', verificaAutenticacao, professor.create);
	app.put('/professor/update/:id', verificaAutenticacao, professor.edit);
	app.delete('/professor/remove/:id', verificaAutenticacao, professor.destroy);
	app.get('/professor/search', verificaAutenticacao, professor.page);
	app.get('/professor/count', verificaAutenticacao, professor.count);
}
