module.exports = function(app){
	var model = app.models.Aluno;

	var controller = {};

	controller.create = function(req, res){
		var Aluno = new model(req.body);
		Aluno.save(function(err, data){
			if(err) {
				console.log(err);
				res.sendStatus(500)
			}else{
				res.json(data);
			}
		})
	}

	controller.show = function(req, res){
		var id = req.params.id;
		model.findById(id,function(err, Aluno){
			if(err){
				res.sendStatus(500)
			}else if(Aluno){
				res.json(Aluno);
			}else{
				res.sendStatus(404)
			}
		})
	}

	controller.edit = function(req, res){
		var id = req.params.id;
		var currentAluno = req.body;
		model.findByIdAndUpdate(id, {$set : currentAluno}).populate('exercicios').exec(function(err, Aluno){
		if(err){
			console.log(err)
			res.sendStatus(500)
		}else if(Aluno){
			currentAluno._id = Aluno._id;
			res.json(currentAluno);
			}else{
				res.sendStatus(404);
			}
		})
	}

	controller.destroy = function(req, res){
		var id = req.params.id;
		model.remove({_id : id}, function(err){
			if(err){
				res.sendStatus(500);
			}else{
				res.sendStatus(200);
			}
		})
	}

	controller.list = function(req, res){
		var list = model.find({}).populate('exercicios').exec(function(err, Alunos){
			if(err){
				console.log(err)
				res.sendStatus(500)
			}if(Alunos){
				res.json(Alunos);
			}else{
				res.sendStatus(404)
			}

		})
	}

	controller.page = function(req, res){
		var page = req.params.page;
		var perPage = 10;
		model.find({}).limit(perPage).skip(perPage * (page -1)).exec(function(err, result) {
	    	if(err){
	    		res.sendStatus(500)
	    	}if (result){
	    		res.json(result);
	    	}else{
	    		res.sendStatus(404);
	    	}

		});
	}

	controller.count = function(req, res){
		model.find({}).exec(function(err, result) {
	    	if(err){
	    		res.send(err)
	    	}if (result){
	    		res.json(result.length);
	    	}else{
	    		res.sendStatus(404);
	    	}

		});
	}

	return controller;
}
