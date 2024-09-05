import { Component } from 'react'
import { v4 as uuidv4 } from 'uuid' // Importing uuidv4 for generating unique IDs
import CommentItem from '../CommentItem/index'
import './index.css'

const initialContainerBackgroundClassNames = [
    'amber',
    'blue',
    'orange',
    'emerald',
    'teal',
    'red',
    'light-blue',
]

class Comments extends Component {
    constructor(props) {
        super(props)
        this.state = {
            commentsList: [],
            name: '',
            commentText: '',
        }
    }

    handleInputChange = event => {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    addComment = () => {
        const { name, commentText, commentsList } = this.state
        if (name.trim() !== '' && commentText.trim() !== '') {
            const backgroundColorClass = initialContainerBackgroundClassNames[
                Math.floor(Math.random() * initialContainerBackgroundClassNames.length)
            ]

            const newComment = {
                id: uuidv4(), // Generate a unique ID using uuidv4
                name,
                comment: commentText,
                liked: false,
                createdAt: new Date(),
                backgroundColorClass,
            }

            this.setState({
                commentsList: [...commentsList, newComment],
                name: '',
                commentText: '',
            })
        }
    }

    toggleLike = id => {
        this.setState(prevState => ({
            commentsList: prevState.commentsList.map(eachComment =>
                eachComment.id === id ? { ...eachComment, liked: !eachComment.liked } : eachComment,
            ),
        }))
    }

    deleteComment = id => {
        this.setState(prevState => ({
            commentsList: prevState.commentsList.filter(eachComment => eachComment.id !== id),
        }))
    }

    render() {
        const { commentsList, name, commentText } = this.state

        return (
            
            <div className="comments-container">
                <div className='image-container'>
                <img src='https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png'
                 alt="comments" />
                </div>
                <h1 className="heading">Comments</h1>
                <p className='comment-description'>Say something about 4.0 Technologies</p>
                <form className="form-container" onSubmit={e => e.preventDefault()}>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={this.handleInputChange}
                        placeholder="Your Name"
                        className="input"
                    />
                    <textarea
                        name="commentText"
                        value={commentText}
                        onChange={this.handleInputChange}
                        placeholder="Your Comment"
                        className="textarea"
                    />
                    <button
                        type="button"
                        className="btnComment"
                        onClick={this.addComment}
                    >
                        Add Comment
                    </button>
                </form>
                <ul className="comments-list">
                    {commentsList.map(eachComment => (
                        <CommentItem
                            key={eachComment.id} // Unique key prop using uuidv4
                            comment={eachComment}
                            toggleLike={this.toggleLike}
                            deleteComment={this.deleteComment}
                        />
                    ))}
                </ul>
            </div>
        )
    }
}

export default Comments
