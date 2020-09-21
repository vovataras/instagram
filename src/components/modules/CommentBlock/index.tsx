import React from 'react'
import Comment from './Comment'

import styles from './style.module.scss'

const CommentBlock = () => {
  return (
    <div>
      <div className={styles.comments}>
        <Comment username="Tom" comment="I'ts cool!" />
        <Comment username="Jerry" comment="Nice" />
        <Comment username="Mike" comment="Test comment" />
        <Comment username="Emma" comment="Lorem ipsum!!!" />
        <Comment
          username="Lucy"
          comment="Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quod quaerat vel enim voluptas, beatae dignissimos quis illum ea ipsa ex accusantium animi laboriosam quidem dolorum consequatur! Minima non natus eum animi assumenda hic aspernatur iure commodi officiis, enim recusandae, eligendi nesciunt alias. Commodi quisquam quod, eaque culpa ab laborum fugit corporis aliquid, dolores iusto expedita nulla ex quis alias officia quidem neque ipsa! Reprehenderit eveniet velit provident possimus ipsum illum saepe qui fuga aperiam! Tenetur ut iure autem qui voluptatem et, porro aperiam doloremque veritatis nemo magnam accusamus sit ducimus minus dignissimos, dolores a! Voluptatum harum rem laudantium necessitatibus."
        />
      </div>
      <div className={styles.input}></div>
    </div>
  )
}

export default CommentBlock
