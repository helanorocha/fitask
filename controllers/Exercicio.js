module.exports = function(app){
	var model = app.models.Exercicio;
	var modelCategoria = app.models.Categoria;

	var controller = {};

	controller.create = function(req, res){
		var Exercicio = new model(req.body);
		Exercicio.save(function(err, data){
			if(err) {
				console.log(err);
				res.sendStatus(500)
			}else{
				modelCategoria.findById(data.categoria).exec(function(err, cat){
					if(err) {
						console.log(err);
						res.sendStatus(500)
					}else{
						cat.exercicios.push(data)
						var Categoria = new modelCategoria(cat)
						Categoria.save();
					}
				})
				res.json(data);
			}
		})
	}

	controller.show = function(req, res){
		var id = req.params.id;
		model.findById(id).populate("categoria").exec(function(err, Exercicio){
			if(err){
				res.sendStatus(500)
			}else if(Exercicio){
				res.json(Exercicio);
			}else{
				res.sendStatus(404)
			}
		})
	}

	controller.edit = function(req, res){
		var id = req.params.id;
		var currentExercicio = req.body;
		model.findByIdAndUpdate(id, {$set : currentExercicio}).populate('categoria').exec(function(err, Exercicio){
		if(err){
			console.log(err)
			res.sendStatus(500)
		}else if(Exercicio){
			modelCategoria.findById(Exercicio.categoria).exec(function(err, cat){
				if(err) {
					console.log(err);
					res.sendStatus(500)
				}else{
					cat.exercicios.push(Exercicio)
					var Categoria = new modelCategoria(cat)
					Categoria.save();
				}
			})
			currentExercicio._id = Exercicio._id;
			res.json(currentExercicio);
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
		var list = model.find({}).populate("categoria").exec(function(err, Exercicios){
			if(err){
				console.log(err)
				res.sendStatus(500)
			}if(Exercicios){
				res.json(Exercicios);
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
