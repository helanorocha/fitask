module.exports = function(app){
	var model = app.models.Categoria;

	var controller = {};

	controller.create = function(req, res){
		var Categoria = new model(req.body);
		Categoria.save(function(err, data){
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
		model.findById(id).populate("exercicios").exec(function(err, Categoria){
			if(err){
				res.sendStatus(500)
			}else if(Categoria){
				res.json(Categoria);
			}else{
				res.sendStatus(404)
			}
		})
	}

	controller.edit = function(req, res){
		var id = req.params.id;
		var currentCategoria = req.body;
		model.findByIdAndUpdate(id, {$set : currentCategoria}).populate('cidade').exec(function(err, Categoria){
		if(err){
			console.log(err)
			res.sendStatus(500)
		}else if(Categoria){
			currentCategoria._id = Categoria._id;
			res.json(currentCategoria);
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
		var list = model.find({}).populate("exercicios").exec(function(err, Categories){
			if(err){
				console.log(err)
				res.sendStatus(500)
			}if(Categories){
				res.json(Categories);
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
