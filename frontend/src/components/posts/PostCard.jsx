import React from 'react'
import { Link } from 'react-router-dom'
import PostTag from './PostTag'

const PostCard = ({post}) => {
  return (
    <article>
        <div className="post-card-body">
            <p>{post.category}</p>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <div className="tags">
                {(post.tags || []).map((tag, i) => (
                    <MemoTag key={i}  tag={tag}/>
                ))}
            </div>
        </div>
        <div className="img-wrap">
            <img src={post.thumbnail || './images/placeholder.png'} alt={post.title} />
        </div>
    </article>
  )
}

export default PostCard