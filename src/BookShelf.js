import React, {Component} from "react"
import PropTypes from "prop-types"
import Book from "./Book"

class BookShelf extends Component{

	static propTypes = {
		title: PropTypes.string,
		books: PropTypes.array,
        changeShelf: PropTypes.func
	}

	render(){

		const {title, books, changeShelf} = this.props

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
	                              bookCover={book.imageLinks}
	                              onChangeShelf={changeShelf}
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
