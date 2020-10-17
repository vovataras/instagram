import React from 'react'
import { FormikHelpers } from 'formik'
import Preloader from '../../elements/Preloader'
import CommentForm, { FormValues } from '../CommentForm'

import styles from './style.module.scss'

interface Props {
  commentsContent: JSX.Element | JSX.Element[] | null
  isCommentsLoaded: boolean
  handleSubmit: (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => void
}

const CommentBlock: React.FC<Props> = ({
  commentsContent,
  isCommentsLoaded,
  handleSubmit
}) => {
  return (
    <div>
      <div className={styles.comments}>
        {!isCommentsLoaded && <Preloader />}
        {isCommentsLoaded && commentsContent}
      </div>
      <CommentForm className={styles.inputBlock} elevation={3} handleSubmit={handleSubmit} />
    </div>
  )
}

export type { FormValues }

export default CommentBlock
