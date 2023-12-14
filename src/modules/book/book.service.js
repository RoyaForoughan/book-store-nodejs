const autoBind = require("auto-bind");

class BookService{
    constructor(){
        autoBind(this)
    }
}

module.exports = new BookService()