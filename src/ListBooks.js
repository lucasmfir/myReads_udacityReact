import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
import PropTypes from "prop-types"
import {DebounceInput} from 'react-debounce-input';

class ListBooks extends Component {
	
	state = {
		query: '',
		books: []
	}

	static propTypes = {
		myBooks: PropTypes.array
	}

	updateQuery = (query) => {
        this.setState({ query: query.trim() })
		if(query.length){
			BooksAPI.search(query).then((books) => {
	      		this.setState({books : books})
			})	
		} else {
			this.setState({books : []})
		}
	}

	changeShelf = (bookId, newShelf) => {
	    BooksAPI.get(bookId)
	      .then( b => {
	        const book = b
	        BooksAPI.update(book, newShelf)
	     })
  	}	

	render() {

		const {query, books} = this.state
		const {myBooks} = this.props

		let showingBooks

		if(books.length){
			showingBooks = books

		} else {
			showingBooks = []			
		}

		showingBooks = showingBooks
			.map(b => {
				myBooks.
					map(mb => {
						if(mb.id === b.id){
							b.shelf = mb.shelf
						}
					})
				return b
			})

		return(
			<div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
				  <DebounceInput
			        debounceTimeout={300}
					type='text'
					placeholder='search books'
					value={query}
					onChange={(event) => this.updateQuery(event.target.value)}
                />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {	
                	showingBooks.length ? ( 
	                	showingBooks.map((book, i) => {      
	                        return (
	                          <li key={i}>
	                            <Book
	                              id={book.id}
	                              title={book.title}
	                              bookCover={book.imageLinks && (book.imageLinks.thumbnail)}
	                              onChangeShelf={(bookId, newShelf) => this.changeShelf(bookId, newShelf)}
	                              shelf={book.shelf}
	                            />
	                          </li>
                        	)    
                		})
            		) : ("No books to show")
                }
              </ol>
            </div>
          </div>
		)
	}
}


export default ListBooks

