const autoBind = require("auto-bind");
const bookService = require("../book/book.service");

class BookController {
    #service
    constructor(){
        autoBind(this)
        this.#service = bookService
    }

}

module.exports = new BookController()