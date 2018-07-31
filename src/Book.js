import React, {Component} from "react"
import PropTypes from "prop-types"

class Book extends Component{

	static propTypes = {
		title: PropTypes.string,
		author: PropTypes.string,
		bookCover: PropTypes.string,
		shelf: PropTypes.string
	}

	handleChange = (e) => {
		const newShelf = e.target.value
		const bookId = e.target.id

		this.props.onChangeShelf(bookId, newShelf)
	}

	render(){

		const {title, bookCover, author, id, shelf} = this.props

		return(
			<div className="book">
              <div className="book-top">
                <div className="book-cover" style={{backgroundImage:`url(${bookCover})`}}></div>
                <div className="book-shelf-changer">
                  <select defaultValue={shelf ? shelf : 'none'} onChange={this.handleChange} id={id}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{title}</div>
              <div className="book-authors">{author}</div>
            </div>		
		)
	}
}

export default Book