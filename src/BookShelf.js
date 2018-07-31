import React, {Component} from "react"
import PropTypes from "prop-types"
import Book from "./Book"
import * as BooksAPI from "./BooksAPI"

class BookShelf extends Component{

	static propTypes = {
		title: PropTypes.string,
		books: PropTypes.array
	}

	changeShelf = (bookId, newShelf) => {
	    BooksAPI.get(bookId)
	      .then( b => {
	        const book = b
	        BooksAPI.update(book, newShelf)
	     })
  	}

	render(){

		const {title, books} = this.props

		return(
			<div className="bookshelf">
	        	<h2 className="bookshelf-title">{title}</h2>
		        <div className="bookshelf-books">
	                <ol className="books-grid">
	                	{books.length ? (
	                		books.map((book, i) => { 
	                        return (
	                          <li key={i}>
	                            <Book
	                              id={book.id}
	                              title={book.title}
	                              author={book.authors.join("; ")}
	                              bookCover={book.imageLinks.thumbnail}
	                              onChangeShelf={(bookId, newShelf) => {
	                                this.changeShelf(bookId, newShelf)}}
	                              shelf={book.shelf}
	                            />
	                          </li>
	                        )    
	                      }
                        )) : null}
	                </ol>
	            </div>
	        </div>
        )
	}
}

export default BookShelf
