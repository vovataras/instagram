import React from 'react'
import { useFormik } from 'formik'
import { Button, TextField } from '@material-ui/core'
import styles from '../../modules/AuthPage/style.module.scss'

const LoginForm = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: (values, formikHelpers) => {
      alert(JSON.stringify(values, null, 2))
      formikHelpers.setSubmitting(false)
    }
  })
  return (
    <form onSubmit={formik.handleSubmit} className={styles.form}>
      <TextField
        id="email"
        label="Email"
        variant="outlined"
        required
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      <TextField
        id="password"
        type="password"
        label="Password"
        required
        variant="outlined"
        onChange={formik.handleChange}
        value={formik.values.password}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={styles.submit}
        disabled={formik.isSubmitting}
      >
        Log in
      </Button>
    </form>
  )
}

export default LoginForm
