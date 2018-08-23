import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
import PropTypes from "prop-types"
import {DebounceInput} from 'react-debounce-input';

class SearchPage extends Component {
	
	state = {
		query: '',
		books: []
	}

	static propTypes = {
		myBooks: PropTypes.array,
        changeShelf: PropTypes.func
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

	render() {

		const {query, books} = this.state
		const {myBooks, changeShelf} = this.props

		let showingBooks

		if(books.length){
			showingBooks = books

		} else {
			showingBooks = []			
		}

		showingBooks = showingBooks.map(showingBook => {
            const myBook = myBooks.find(book => book.id === showingBook.id)
				if(myBook){
					return {
						...showingBook,
						shelf: myBook.shelf
					}
				}
			return showingBook
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
	                	showingBooks.map((book) => {
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
                		})
            		) : ("No books to show")
                }
              </ol>
            </div>
          </div>
		)
	}
}


export default SearchPage

