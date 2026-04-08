import React from 'react'

const PostTag = ({tag,onClick}) => {
  return (
    <div className = 'post-tag'>
      {tag}
      <button 
      className = 'post-tag-delete' 
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        onClick?.()}}>X</button>
      </div>
  )
}

export default PostTag