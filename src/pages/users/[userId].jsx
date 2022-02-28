import Link from 'next/link'
import Avatar from '@mui/material/Avatar'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'

import { useState } from 'react'
import { useRouter } from 'next/router'

import CompsLayout from '@/components/layouts/Layout'
import CompsModalsNotificationsCreate from '@/components/modals/notifications/create'
import usePublicUser from '@/_hooks/publicUser'
import useNotifications from '@/_hooks/notifications'

const ColoredLine = ({ color }) => (
  <hr
    style={{
      color,
      backgroundColor: color,
      height: 2
    }}
    className="coloured-line"
  />
)

function PagesPublicUser() {
  const [openNotificationsCreate, setOpenNotificationsCreate] = useState(false)
  const { query: { userId } } = useRouter()

  const { user } = usePublicUser(userId)
  const { createNotification } = useNotifications()

  console.log('user>>>>>>>>>>>', user)

  return (
    <CompsLayout>
      <div id="pages-public-user">
        <h1>User Page</h1>
        <Grid id="pages-user-main-grid">
          <Grid item xs={4} id="pages-user-avatar-grid" className="border rounded">
            <div>
              <Avatar src={user?.avatar} alt="avatar" sx={{ width: 200, height: 200 }} id="pages-user-avatar" />
              <div className="d-flex justify-content-center" id="pages-user-message-btn">
                <Button
                  className="btn btn-primary btn-sm"
                  type="button"
                  id="pages-user-message-btn-btn"
                  onClick={() => {
                    setOpenNotificationsCreate(true)
                  }}
                ><i className="fas fa-inbox" />  Message</Button>
              </div>
            </div>
          </Grid>
          <Grid item xs={6} id="pages-user-info-grid">
            <h6>Email: {user?.email}</h6>
            <ColoredLine color="black" />
            <h6>Name: {user?.name}</h6>
            <h6>Full Name: {user?.firstName} {user?.lastName}</h6>
            <h6>Date of Birth: {user?.dateOfBirth}</h6>
            <ColoredLine color="black" />
            <Typography variant="subtitle2" gutterBottom component="div">
              Introduction:
            </Typography>
            <h6>{user?.introduction}</h6>
          </Grid>
          <Grid className="in-pages-nav border rounded">
            <CardContent className="d-flex flex-column">
              <Link href="/my/profile">Profile</Link>
              <Link href="/my/threads">My Threads</Link>
              <Link href="/my/posts">My Posts</Link>
              <Link href="/my/notifications">My Notifications</Link>
              <Link href="/my/favourites">My Favourites</Link>
            </CardContent>
          </Grid>
          <Grid item xs={6} />
        </Grid>
      </div>

      <CompsModalsNotificationsCreate
        show={openNotificationsCreate}
        handleClose={() => setOpenNotificationsCreate(false)}
        initialValues={{
          message: '',
          userId
        }}
        handleSubmit={(values) => {
          createNotification(values, userId).then(() => {
            setOpenNotificationsCreate(false)
          })
        }}
      />
    </CompsLayout>
  )
}

export default PagesPublicUser
