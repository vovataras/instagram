import React from 'react'
import Layout from '../Layout'
import ErrorPaper from '../../elements/ErrorPaper'

interface Props {
  error?: string | null
}

const LayoutError: React.FC<Props> = ({ error }) => {
  return (
    <Layout>
      <ErrorPaper error={error} />
    </Layout>
  )
}

export default LayoutError
