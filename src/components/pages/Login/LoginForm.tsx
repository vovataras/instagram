import React from 'react'
import { useFormik } from 'formik'
import { Button, TextField } from '@material-ui/core'
import styles from '../../modules/AuthPage/style.module.scss'
import * as Yup from 'yup'
import { signIn } from '../../../services/auth'

const SigninSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required')
})

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  setMessage: React.Dispatch<React.SetStateAction<string>>
}

const LoginForm: React.FC<Props> = ({ setOpen, setMessage }) => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: SigninSchema,
    onSubmit: async (values, formikHelpers) => {
      let result = await signIn(values.email, values.password)
      if (!result.success) {
        setMessage(result.errorMessage)
        setOpen(true)
      }
      formikHelpers.setSubmitting(false)
    }
  })

  const {
    touched,
    errors,
    handleChange,
    values,
    handleSubmit,
    handleBlur,
    isSubmitting
  } = formik

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <TextField
        id="email"
        label="Email"
        variant="outlined"
        required
        onBlur={handleBlur('email')}
        error={!!(errors['email'] && touched['email'])}
        helperText={errors.email && touched.email ? errors.email : null}
        onChange={handleChange}
        value={values.email}
      />
      <TextField
        id="password"
        type="password"
        label="Password"
        required
        onBlur={handleBlur('password')}
        error={!!(errors['password'] && touched['password'])}
        helperText={
          errors.password && touched.password ? errors.password : null
        }
        variant="outlined"
        onChange={handleChange}
        value={values.password}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={styles.submit}
        disabled={isSubmitting}
      >
        Log in
      </Button>
    </form>
  )
}

export default LoginForm
