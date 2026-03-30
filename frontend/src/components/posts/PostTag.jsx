import React from 'react'

const PostTag = ({tag}) => {
  return (
    <div className = 'post-tag'>
      {tag}
      <button className = 'post-tag-delete'>X</button>
      </div>
  )
}

export default PostTag