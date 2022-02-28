import Link from 'next/link'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'

import CompsLayout from '@/components/layouts/Layout'

import useUser from '@/_hooks/user'
import usePublicUsers from '@/_hooks/publicUsers'
import useNotifications from '@/_hooks/notifications'

const ColoredLine = ({ color }) => (
  <hr
    style={{
      color,
      backgroundColor: color,
      height: 2
    }}
    id="pages-my-threads-coloured-line"
  />
)

export default function PagesMyNotifications() {
  const { currentUser } = useUser()
  const { users } = usePublicUsers()
  const { myNotifications, destroyNotification } = useNotifications()

  console.log('>>>>>>>currentUser', currentUser)
  console.log('>>>>>>>>>>publicUsers', users)
  console.log('>>>>>>>>myNotifications', myNotifications)

  return (
    <CompsLayout>
      <div id="pages-my-notifications" className="text-center">

        <Grid id="pages-my-notifications-main-grid">
          <Grid item lg={4} id="pages-my-notifications-avatar-grid">
            <div className="border rounded d-flex justify-content-center" id="pages-my-notifications-avatar-grid-wrap">
              <div id="pages-my-notifications-avatar">
                <Avatar src={currentUser?.avatar} alt="avatar" sx={{ width: 200, height: 200 }} />
                <Typography variant="h5" gutterBottom component="div" id="pages-my-notifications-avatar-name">
                  {currentUser?.name}
                </Typography>
              </div>
            </div>
            <div className="border rounded d-flex justify-content-center" id="pages-my-notifications-in-pages-nav">
              <CardContent className="d-flex flex-column">
                <Link href="/my/profile">Profile</Link>
                <Link href="/my/threads">My Threads</Link>
                <Link href="/my/posts">My Posts</Link>
                <Link href="/my/notifications">My Notifications</Link>
                <Link href="/my/favourites">My Favourites</Link>
              </CardContent>
            </div>
          </Grid>
          <Grid item lg={8} id="pages-my-notifications-grid" className="d-flex justify-content-center">
            <div className="d-flex flex-column" id="pages-my-notifications-grid-inside">
              <h1>My Notifications</h1>
              {
          myNotifications?.map((notification) => (
            <div key={notification.id} className="card border-2" id="pages-my-notifications-grid-card">
              <div className="card-body">
                <div className="card-title d-flex justify-content-start align-items-center">
                  <Avatar src={users?.find(({ id }) => id === notification.UserId)?.avatar} alt="avatar" sx={{ width: 50, height: 50 }} />
                  <a href={`/users/${users?.find(({ id }) => id === notification.UserId)?.id}`} id="pages-my-notifications-grid-inside-card-title-link">{users?.find(({ id }) => id === notification.UserId)?.name}</a>
                </div>
                <ColoredLine color="black" />
                <div className="card-text" id="pages-my-notifications-grid-card-card-text">{notification.message}</div>
                <ColoredLine color="black" />
                <button
                  className="btn btn-danger btn-sm"
                  type="button"
                  onClick={() => {
                    destroyNotification(notification)
                  }}
                ><i className="fas fa-trash-alt" />  Viewed and Delete</button>
              </div>
            </div>
          ))
        }
            </div>
          </Grid>
        </Grid>
      </div>
    </CompsLayout>
  )
}
