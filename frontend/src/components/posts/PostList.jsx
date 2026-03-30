import React from 'react'
import PostCard from './PostCard'
import './PostComponentsAll.scss'

const PostList = ({posts}) => {
  return (
    <div className='post-list'>
        {posts.map((post) =>(
            <PostCard key={post.id} post = {post}/>
        ))}
    </div>
  )
}

export default PostList