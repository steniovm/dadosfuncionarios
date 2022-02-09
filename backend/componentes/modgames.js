/*const modelo = {
	"id": "",
	"game": "",
	"year": "",
	"genre": "",
	"multiplayer": "",
	"offline": "",
	"crossplataform": ""
}*/
function includes(catalog, newitem){
    if (newitem.id && newitem.game){
        catalog.push(newitem);
        return catalog;
    }else return false;
}

module.exports = {includes};