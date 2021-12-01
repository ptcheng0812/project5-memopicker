import { useState } from 'react'
import Link from 'next/link'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'

import CompsLayout from '@/components/layouts/Layout'
import CompsModalsThreadsUpdate from '@/components/modals/threads/update'

import useUser from '@/_hooks/user'
import useMyThreads from '@/_hooks/myThreads'
import useThread from '@/_hooks/thread'

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

export default function PagesMyThreads() {
  const [openMyThreadsUpdate, setOpenMyThreadsUpdate] = useState(false)
  const [selectedMyThread, setSelectedMyThread] = useState({})

  const { currentUser } = useUser()
  const { myThreads } = useMyThreads()
  const { updateThread, destroyThread } = useThread(selectedMyThread.id)

  console.log('>>>>>>>currentUser', currentUser)
  console.log('>>>>>>>myThreads', myThreads)
  console.log('>>>>>>>selectedMyThread', selectedMyThread)

  return (
    <CompsLayout>
      <div id="pages-my-threads" className="text-center">
        <h1>My Threads</h1>
        <Grid container spacing={2} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} id="pages-my-thread-main-grid">
          <Grid item xs={4} id="pages-my-thread-avatar-grid">
            <div className="border rounded d-flex justify-content-center" id="pages-my-thread-avatar-grid-wrap">
              <div id="pages-my-thread-avatar">
                <Avatar src={currentUser?.avatar} alt="avatar" sx={{ width: 200, height: 200 }} />
                <Typography variant="h5" gutterBottom component="div" id="pages-my-thread-avatar-name">
                  {currentUser?.name}
                </Typography>
              </div>
            </div>
            <div className="border rounded d-flex justify-content-center" id="pages-my-threads-in-pages-nav">
              <CardContent className="d-flex flex-column">
                <Link href="/my/profile">Profile</Link>
                <Link href="/my/threads">My Threads</Link>
                <Link href="/my/posts">My Posts</Link>
                <Link href="/my/notifications">My Notifications</Link>
                <Link href="/my/favourites">My Favourites</Link>
              </CardContent>
            </div>
          </Grid>
          <Grid item xs={8} id="pages-my-thread-grid" className="d-flex justify-content-center">
            <div className="d-flex flex-column" id="pages-my-thread-grid-inside">
              {
          myThreads?.map((myThread) => (
            <>
              <div key={myThread.id} className="card  rounded border" id="pages-my-thread-grid-inside-card">
                <div className="card-body">
                  <div className="card-title" id="pages-my-thread-grid-inside-card-card-title">
                    {myThread.title}
                  </div>
                  <ColoredLine color="black" />

                  <div className="card-text d-flex flex-column">
                    category: {myThread.category}
                    <Link href={`/threads/${myThread.id}`}>View Thread</Link>
                    <div className="btn-container d-flex justify-content-around">
                      <button
                        className="btn btn-primary btn-sm"
                        type="button"
                        onClick={() => {
                          setSelectedMyThread(myThread)
                          setOpenMyThreadsUpdate(true)
                        }}
                      >Edit My Thread</button>
                      <button
                        className="btn btn-danger btn-sm"
                        type="button"
                        onClick={() => {
                          setSelectedMyThread(myThread)
                          destroyThread(myThread)
                        }}
                      >Delete My Thread</button>
                    </div>
                  </div>
                </div>
              </div>
              <CompsModalsThreadsUpdate
                show={openMyThreadsUpdate}
                initialValues={selectedMyThread}
                handleClose={() => setOpenMyThreadsUpdate(false)}
                handleSubmit={(values) => {
                  updateThread(values).then(() => {
                    setOpenMyThreadsUpdate(false)
                  })
                }}
              />
            </>
          ))
        }
            </div>
          </Grid>
        </Grid>

      </div>

    </CompsLayout>
  )
}
