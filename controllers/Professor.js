module.exports = function(app){
	var model = app.models.Professor;

	var controller = {};

	controller.create = function(req, res){
		var Professor = new model(req.body);
		Professor.save(function(err, data){
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
		model.findById(id,function(err, Professor){
			if(err){
				res.sendStatus(500)
			}else if(Professor){
				res.json(Professor);
			}else{
				res.sendStatus(404)
			}
		})
	}

	controller.edit = function(req, res){
		var id = req.params.id;
		var currentProfessor = req.body;
		model.findByIdAndUpdate(id, {$set : currentProfessor}).populate('alunos').exec(function(err, Professor){
		if(err){
			console.log(err)
			res.sendStatus(500)
		}else if(Professor){
			currentProfessor._id = Professor._id;
			res.json(currentProfessor);
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
		var list = model.find({}).populate('alunos').exec(function(err, Professors){
			if(err){
				console.log(err)
				res.sendStatus(500)
			}if(Professors){
				res.json(Professors);
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
