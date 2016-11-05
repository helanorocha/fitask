module.exports = function(){

		var mongoose = require('mongoose')
	,	Schema = mongoose.Schema
	,relationship = require("mongoose-relationship");

	var findOrCreate = require('mongoose-findorcreate');

	var ExercicioScheme = Schema({
		name: {type: String, default:'', require: true},
		categoria: { type:Schema.ObjectId, ref:"Categoria"},
		aluno: { type:Schema.ObjectId, ref:"Aluno", childPath:"Exercicios" }
	});

	ExercicioScheme.plugin(findOrCreate);
	ExercicioScheme.plugin(relationship, { relationshipPathName:'aluno' });
	return mongoose.model('Exercicio', ExercicioScheme);
}
