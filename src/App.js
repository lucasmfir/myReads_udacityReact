import React from 'react'
import * as BooksAPI from './BooksAPI'
import SearchPage from './SearchPage'
import BookShelf from './BookShelf'
import {Route, Link} from 'react-router-dom'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount(){
    this.updateState()
  }

  updateState = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({books : books})
    })
  }

  changeShelf = (bookId, newShelf) => {
    BooksAPI.get(bookId)
      .then( book => {
        BooksAPI.update(book, newShelf)
          .then(() => this.updateState())
      })
  }

  render(){

    const {books} = this.state 

    const currentlyReadingBooks = books.filter(book => book.shelf === "currentlyReading")

    const wantToReadBooks = books.filter(book => book.shelf === "wantToRead")

    const readBooks = books.filter(book => book.shelf === "read")

    return (
      <div className="app">
        <Route path="/search" render={() => (
            <SearchPage
              myBooks={books}
              changeShelf={this.changeShelf}
            />
          )}
        />
          
        <Route exact path="/" render={() => (
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>

                <BookShelf
                  title={"Currently Reading"}
                  books={currentlyReadingBooks}
                  changeShelf={this.changeShelf}
                />

                <BookShelf
                  title={"Want to Read"}
                  books={wantToReadBooks}
                  changeShelf={this.changeShelf}
                />

                <BookShelf
                  title={"Read"}
                  books={readBooks}
                  changeShelf={this.changeShelf}
                />

              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>

          )}/>
          
      </div>
    )
  }
}

export default BooksApp
