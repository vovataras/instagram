import React from 'react'
import Layout from '../../modules/Layout'
import PostCard from '../../modules/PostCard'
import styles from './style.module.scss'

const Feed = () => {
  return (
    <Layout maxWidth="md">
      <div className={styles.feed}>
        <PostCard
          username="Lerome"
          avatar="https://picsum.photos/100/100"
          image="https://picsum.photos/1920/1080"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi dolor
          tempore repudiandae, dignissimos, totam numquam vero magni consectetur
          placeat non, error libero? Consectetur, error officia!"
          likesCount={5}
          commentsCount={0}
        />
        <PostCard
          username="Timodo"
          image="https://picsum.photos/1080/1080"
          date="September 17, 2020"
          likesCount={7}
          commentsCount={2}
        />
        <PostCard
          username="Jeremy"
          image="https://picsum.photos/1900/1080"
          date="September 16, 2020"
          likesCount={1}
          commentsCount={1}
        />
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
      </div>
    </Layout>
  )
}

export default Feed
