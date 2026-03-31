import React from 'react'
import Button from '../ui/Button'

const PostHeader = ({onCreate}) => {
  return (
    <header className='post-header'>
        <h2 className='post-title'>세 매모를 작성하시오.</h2>
        <Button text='세 매모 작성' className='primary' onClick={onCreate} icons/>
    </header>
  )
}

export default PostHeader