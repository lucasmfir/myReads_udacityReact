import React from 'react'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
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

  componentDidUpdate(){
    console.log("up")
    this.updateState() 
  }

  updateState = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({books : books})
    })
  }

  changeShelf = (bookId, newShelf) => {
    BooksAPI.get(bookId)
      .then( b => {
        const book = b
        BooksAPI.update(book, newShelf)
          .then(() => this.updateState())
      })
  }

  render(){

    const {books} = this.state 

    const currentlyReadingBooks = books.filter((book, i) =>  
                        book.shelf === "currentlyReading" ? book : null
                      )

    const wantToReadBooks = books.filter((book, i) => { 
                        return (book.shelf === "wantToRead") ? book : null
                      })

    const readBooks = books.filter((book, i) => { 
                        return (book.shelf === "read") ? book : null
                      })
   
    return (
      <div className="app">
        <Route path="/search" render={() => (
            <ListBooks/>
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
                />

                <BookShelf
                  title={"Want to Read"}
                  books={wantToReadBooks}
                />

                <BookShelf
                  title={"Read"}
                  books={readBooks}
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
