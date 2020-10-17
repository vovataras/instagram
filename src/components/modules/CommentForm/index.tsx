import React from 'react'
import { Button, Paper, TextField } from '@material-ui/core'
import { FormikHelpers, useFormik } from 'formik'
import * as Yup from 'yup'

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
  className?: string
  elevation?: number
  inputMargin?: 'none' | 'dense' | 'normal'
  handleSubmit: (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => void
}

const CommentForm: React.FC<Props> = ({
  className,
  elevation,
  inputMargin,
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
    <Paper
      className={`${styles.inputBlock} ${className}`}
      elevation={elevation}
    >
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <TextField
          id="comment"
          label="Comment"
          variant="outlined"
          margin={inputMargin ? inputMargin : 'dense'}
          multiline
          fullWidth
          onBlur={handleBlur('comment')}
          helperText={errors.comment && touched.comment ? errors.comment : null}
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
  )
}

export default CommentForm
