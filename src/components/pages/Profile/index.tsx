import React from 'react'
import Layout from '../../modules/Layout'
import ProfileCard from '../../modules/ProfileCard'
import PostCard from '../../modules/PostCard'
import { AuthUser } from '../../../typings'
import withAuthorization from '../../../hocs/withAuthorization'

import styles from './style.module.scss'
import { RootState } from '../../../redux/store'
import { connect, ConnectedProps } from 'react-redux'

interface Props extends PropsFromRedux {}

const Profile: React.FC<Props> = ({ user }) => {
  return (
    <Layout>
      <div className={styles.profile}>
        <ProfileCard
          username={user?.displayName ? user.displayName : 'NULL'}
          avatar="https://picsum.photos/200/200"
          description="Instagram status"
        />
        <PostCard
          username="Tonny"
          avatar="https://picsum.photos/200/200"
          image="https://picsum.photos/1920/1080"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi dolor
          tempore repudiandae, dignissimos, totam numquam vero magni consectetur
          placeat non, error libero? Consectetur, error officia!"
          likesCount={5}
          commentsCount={0}
        />
        <PostCard
          username="Tonny"
          avatar="https://picsum.photos/200/200"
          image="https://picsum.photos/1900/1080"
          date="September 16, 2020"
          likesCount={1}
          commentsCount={1}
        />
      </div>
    </Layout>
  )
}

let mapState = (state: RootState) => ({
  user: state.auth.user
})

const connector = connect(mapState, {})

type PropsFromRedux = ConnectedProps<typeof connector>

const condition = (authUser: AuthUser) => !authUser

export default withAuthorization(condition)(connector(Profile))
