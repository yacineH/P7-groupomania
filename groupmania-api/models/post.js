//importation du module monggose
const mongoose= require('mongoose');

//definition de notre modele sauce avec le module mongoose
//definition des champs du module avec leur type de donnés ,et puis tous les champs sont required
const postShema = mongoose.Schema({
 employeeId : { type : String, required : true},
 message : { type : String, required : true},
 title : {type : String ,default :""},
 datePost : {type : Number , default: Date.now()},
 imageUrl : { type : String,required : true},
 likes : { type : Number ,required :true, default : 0},
 dislikes : { type : Number, required : true, default: 0},
 usersLiked : { type : [String], required : true, default: []},
 usersDisliked :{ type : [String], required : true, default : []},
});

//export du modele sauce
module.exports = mongoose.model('Post', postShema);