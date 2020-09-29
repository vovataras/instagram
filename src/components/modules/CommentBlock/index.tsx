import { Button, Paper, TextField } from '@material-ui/core'
import React from 'react'
import * as Yup from 'yup'
import { FormikHelpers, useFormik } from 'formik'
import Preloader from '../../elements/Preloader'

import styles from './style.module.scss'

const SigninSchema = Yup.object().shape({
  comment: Yup.string().max(300).required('Required')
})

export interface FormValues {
  comment: string
}

const initialValues: FormValues = {
  comment: ''
}

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
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: SigninSchema,
    onSubmit: handleSubmit
  })

  const {
    touched,
    errors,
    handleChange,
    values,
    handleBlur,
    isSubmitting
  } = formik

  return (
    <div>
      <div className={styles.comments}>
        {!isCommentsLoaded && <Preloader />}
        {isCommentsLoaded && commentsContent}
      </div>
      <Paper className={styles.inputBlock} elevation={3}>
        <form onSubmit={formik.handleSubmit} className={styles.form}>
          <TextField
            id="comment"
            label="Comment"
            variant="outlined"
            multiline
            fullWidth
            onBlur={handleBlur('comment')}
            // error={!!(errors['comment'] && touched['comment'])}
            helperText={
              errors.comment && touched.comment ? errors.comment : null
            }
            onChange={handleChange}
            value={values.comment}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            Send
          </Button>
        </form>
      </Paper>
    </div>
  )
}

export default CommentBlock
