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
	                		books.map((book) => {
	                        return (
	                          <li key={book.id}>
	                            <Book
	                              id={book.id}
	                              title={book.title}
	                              author={book.authors}
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
