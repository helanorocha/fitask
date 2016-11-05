module.exports = function(){

		var mongoose = require('mongoose')
	,	Schema = mongoose.Schema;

	var findOrCreate = require('mongoose-findorcreate');

	var CategoriaScheme = Schema({
		name: {type: String, default:'', require: true},
		exercicios: [{type: Schema.Types.ObjectId,ref: 'Exercicio'}]
	});

	CategoriaScheme.plugin(findOrCreate);
	return mongoose.model('Categoria', CategoriaScheme);
}
