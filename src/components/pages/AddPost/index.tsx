import React, { useState } from 'react'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Layout from '../../modules/Layout'

import FirstStep from './FirstStep'
import SecondStep from './SecondStep'
import FinalStep from './FinalStep'

import styles from './style.module.scss'
import { useMediaQuery, useTheme } from '@material-ui/core'
import Routes from '../../../constants/routes'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { AuthUser, Post } from '../../../typings'
import withAuthorization from '../../../hocs/withAuthorization'
import { posts } from '../../../services/database'

const getSteps = () => {
  return ['Select photo', 'Add description', 'Share a post']
}

interface Props extends RouteComponentProps {}

const HorizontalLinearStepper: React.FC<Props> = ({ history, ...props }) => {
  const [activeStep, setActiveStep] = useState(0)
  const [skipped, setSkipped] = useState(new Set<number>())
  const [image, setImage] = useState(null as string | null)
  const [description, setDescription] = useState('')
  const steps = getSteps()

  const theme = useTheme()
  const desktop = useMediaQuery(theme.breakpoints.up('sm'))

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <FirstStep image={image} setImage={setImage} />
      case 1:
        return (
          <SecondStep
            description={description}
            setDescription={setDescription}
            image={image}
          />
        )
      case 2:
        return (
          <FinalStep
            username="Tonny"
            avatar="https://picsum.photos/200/200"
            image={image ? image : ''}
            description={!skipped.size ? description : ''}
          />
        )
      default:
        return (
          <Typography className={styles.instructions}>
            'Unknown step'
          </Typography>
        )
    }
  }

  const isStepOptional = (step: number) => {
    return step === 1
  }

  const isStepSkipped = (step: number) => {
    return skipped.has(step)
  }

  const handleNext = () => {
    let newSkipped = skipped
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values())
      newSkipped.delete(activeStep)
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    setSkipped(newSkipped)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.")
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values())
      newSkipped.add(activeStep)
      return newSkipped
    })
  }

  const handleShare = async () => {
    const post: Post = {
      image: image!,
      date: new Date(),
      description: !description ? null : description,
      commentsCount: 0,
      likesCount: 0
    }
    await posts.create(post)

    handleNext()
  }

  const handleFinal = () => {
    setTimeout(() => {
      history.push(Routes.FEED)
    }, 2000)

    return (
      <Typography className={styles.instructions}>
        You have successfully shared the post.
      </Typography>
    )
  }

  return (
    <Layout>
      <div className={styles.root}>
        <Stepper
          activeStep={activeStep}
          orientation={desktop ? 'horizontal' : 'vertical'}
        >
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {}
            const labelProps: { optional?: React.ReactNode } = {}
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              )
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            )
          })}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            handleFinal()
          ) : (
            <div>
              {getStepContent(activeStep)}
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={styles.button}
                >
                  Back
                </Button>
                {isStepOptional(activeStep) && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSkip}
                    className={styles.button}
                  >
                    Skip
                  </Button>
                )}
                {activeStep === steps.length - 1 ? (
                  <Button
                    disabled={!image}
                    variant="contained"
                    color="primary"
                    onClick={handleShare}
                    className={styles.button}
                  >
                    Share
                  </Button>
                ) : (
                  <Button
                    disabled={!image || (activeStep === 1 && !description)}
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={styles.button}
                  >
                    Next
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

const condition = (authUser: AuthUser) => !authUser

export default withAuthorization(condition)(withRouter(HorizontalLinearStepper))
