import React from 'react'
import CommentBlock from '../../modules/CommentBlock'
import Layout from '../../modules/Layout'
import PostCard from '../../modules/PostCard'

const Post = () => {
  return (
    <Layout>
      <PostCard
        username="May"
        avatar="https://picsum.photos/101/101"
        image="https://picsum.photos/1930/1080"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi dolor
        tempore repudiandae, dignissimos, totam numquam vero magni consectetur
        placeat non, error libero? Consectetur, error officia!"
        likesCount={3}
        commentsCount={0}
      />
      <CommentBlock />
    </Layout>
  )
}

export default Post
