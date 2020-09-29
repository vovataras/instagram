import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import withAuthorization from '../../../hocs/withAuthorization'
import { comments } from '../../../services/database'
import { AuthUser, CommentArray } from '../../../typings'
import LayoutPreloader from '../../modules/LayoutPreloader'
import PostView from './view'
import { Comment as CommentType } from '../../../typings'
import { FormValues } from '../../modules/CommentBlock'
import { FormikHelpers } from 'formik'
import Comment from '../../elements/Comment'
import { posts as postsServices } from '../../../services/database'

interface Props extends RouteComponentProps<{ id: string }> {}

const Post: React.FC<Props> = ({ match, ...props }) => {
  const postId = match.params.id

  const posts = useSelector((state) => state.posts.items)
  const users = useSelector((state) => state.users.items)
  const currentUid = useSelector((state) => state.auth.user?.uid)

  const [isCommentsLoaded, setIsCommentsLoaded] = useState(false)
  const [postComments, setPostComments] = useState(null as CommentArray | null)

  useEffect(() => {
    comments.on(postId, 'value', (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        const entries = Object.entries(data)
        setPostComments(entries as CommentArray)
        setIsCommentsLoaded(true)
      } else {
        console.log('No data available!')
        setIsCommentsLoaded(true)
      }
    })

    return () => {
      comments.off(postId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (posts && users) {
    const postEntry = posts.find((value) => value[0] === postId!)
    const post = postEntry![1]
    const userData = users![post.uid!]

    const handleLikeClick = () => {
      postsServices.toggleLike(post.id!, currentUid!, post.uid!)
    }

    const handleSubmit = (
      values: FormValues,
      formikHelpers: FormikHelpers<FormValues>
    ) => {
      const comment: CommentType = {
        uid: currentUid!,
        commentText: values.comment
      }
      comments.create(post.id!, comment)
      formikHelpers.setSubmitting(false)
      formikHelpers.resetForm()
    }

    let commentsContent = null as JSX.Element | JSX.Element[] | null

    if (postComments) {
      commentsContent = postComments.map((value) => {
        const commentsD = value[1]
        const { uid, commentText } = commentsD

        const userData = users[uid!]
        const { username, avatar } = userData

        return (
          <Comment
            key={value[0]}
            username={username!}
            avatar={avatar!}
            comment={commentText}
          />
        )
      })
    }

    return (
      <PostView
        post={post}
        currentUid={currentUid}
        user={userData}
        handleSubmit={handleSubmit}
        isCommentsLoaded={isCommentsLoaded}
        commentsContent={commentsContent}
        handleLikeClick={handleLikeClick}
      />
    )
  } else {
    return <LayoutPreloader />
  }
}

const condition = (authUser: AuthUser) => !authUser

export default withAuthorization(condition)(withRouter(Post))
