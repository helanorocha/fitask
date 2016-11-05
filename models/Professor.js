module.exports = function(){

		var mongoose = require('mongoose')
	,	Schema = mongoose.Schema;

	var findOrCreate = require('mongoose-findorcreate');

	var ProfessorSchema = Schema({
		profileId: {type: String, require: false},
		provider: {type: String, require: false},
		name: {type: String, default:'', require: true},
		email: {type: String, default:'', require: true},
		birth: {type: Date, default:'', require: false},
		photo: {type: String, default:'', require: false},
		login: {type: String, default:'', require: true},
		password: {type: String, default:'', require: true},
		alunos: [{type: Schema.Types.ObjectId,ref: 'Aluno'}]
	});

	ProfessorSchema.plugin(findOrCreate);
	return mongoose.model('Professor', ProfessorSchema);
}
