module.exports = function(app){

	function verificaAutenticacao(req, res, next) {
		//if (req.isAuthenticated()) {
			return next();
	//	} else {
	//		res.status('401').json('Não autorizado');
	//	}
	}

	var aluno = app.controllers.Aluno;
	app.get('/aluno/all', verificaAutenticacao, aluno.list);
	app.get('/aluno/one/:id', verificaAutenticacao, aluno.show);
	app.post('/aluno/create', verificaAutenticacao, aluno.create);
	app.put('/aluno/update/:id', verificaAutenticacao, aluno.edit);
	app.delete('/aluno/remove/:id', verificaAutenticacao, aluno.destroy);
	app.get('/aluno/search', verificaAutenticacao, aluno.page);
	app.get('/aluno/count', verificaAutenticacao, aluno.count);
}
