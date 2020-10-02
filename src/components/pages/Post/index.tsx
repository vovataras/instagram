import React from 'react'
import { connect, ConnectedProps, useSelector } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import withAuthorization from '../../../hocs/withAuthorization'
import { comments as commentsServices } from '../../../services/database'
import { AuthUser, RootState } from '../../../typings'
import LayoutPreloader from '../../modules/LayoutPreloader'
import PostView from './view'
import { Comment as CommentType } from '../../../typings'
import { FormValues } from '../../modules/CommentBlock'
import { FormikHelpers } from 'formik'
import Comment from '../../elements/Comment'
import { posts as postsServices } from '../../../services/database'
import LayoutError from '../../modules/LayoutError'
import Routes from '../../../constants/routes'

interface Props extends PropsFromRedux, RouteComponentProps<{ id: string }> {}

const Post: React.FC<Props> = ({
  isUsersLoaded,
  isPostsLoaded,
  isCommentsLoaded,
  users,
  posts,
  comments,
  match,
  history,
  ...props
}) => {
  const postId = match.params.id
  const currentUid = useSelector((state) => state.auth.user?.uid)

  let content: JSX.Element[] | JSX.Element | null = null

  if (!isUsersLoaded && !isPostsLoaded && !isCommentsLoaded)
    return <LayoutPreloader />

  if (posts && users && postId) {
    const setContent = () => {
      const postEntry = posts.find((value) => value[0] === postId)

      if (!postEntry) {
        history.push(Routes.PAGE404)
        return
      }

      const post = postEntry![1]
      const userData = users![post.uid!]

      if (!userData || !currentUid) {
        content = <LayoutError error="User data not found!" />
        return
      }

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
        commentsServices.create(post.id!, comment)
        formikHelpers.setSubmitting(false)
        formikHelpers.resetForm()
      }

      let commentsContent = null as JSX.Element | JSX.Element[] | null

      if (comments && !!post.id) {
        let commentsArray = comments[post.id]

        if (commentsArray) {
          commentsContent = commentsArray.map((value) => {
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
      }

      content = (
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
    }

    setContent()
  } else {
    content = <LayoutError error={'Something went wrong'} />
  }

  return content
}

let mapState = (state: RootState) => ({
  isUsersLoaded: state.users.isLoaded,
  users: state.users.items,
  isPostsLoaded: state.posts.isLoaded,
  posts: state.posts.items,
  isCommentsLoaded: state.comments.isLoaded,
  comments: state.comments.items
})

const connector = connect(mapState, {})

type PropsFromRedux = ConnectedProps<typeof connector>

const condition = (authUser: AuthUser) => !authUser

export default withAuthorization(condition)(connector(withRouter(Post)))
