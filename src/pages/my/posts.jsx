// import Link from 'next/link'
// import { useState } from 'react'
// import Typography from '@mui/material/Typography'
// import Avatar from '@mui/material/Avatar'
// import Grid from '@mui/material/Grid'
// import CardContent from '@mui/material/CardContent'

import CompsLayout from '@/components/layouts/Layout'
// import CompsModalsPostsUpdate from '@/components/modals/posts/update'
// import CompsModalsMyPostsDelete from '@/components/modals/my-posts/delete'

// import useUser from '@/_hooks/user'
// import useMyPosts from '@/_hooks/myPosts'
// import useThread from '@/_hooks/thread'
// // import useThreads from '@/_hooks/threads'
// import useAllThreads from '@/_hooks/allThreads'

// const ColoredLine = ({ color }) => (
//   <hr
//     style={{
//       color,
//       backgroundColor: color,
//       height: 2
//     }}
//     id="pages-my-threads-coloured-line"
//   />
// )

export default function PagesMyPosts() {
  // const [openMyPostsUpdate, setOpenMyPostsUpdate] = useState(false)
  // const [openMyPostsDelete, setOpenMyPostsDelete] = useState(false)
  // const [selectedMyPost, setSelectedMyPost] = useState({})
  // const [page, setPage] = useState(1)

  // const { currentUser } = useUser()
  // const { myPosts } = useMyPosts(page)
  // const { threads } = useAllThreads()
  // const threadsIds = threads?.map((thread) => thread.id)
  // const { updatePost, destroyPost } = useThread(selectedMyPost.ThreadId)

  // console.log('>>>>>>>currentUser', currentUser)
  // console.log('>>>>>>>myPosts', myPosts)
  // console.log('>>>>>>selectedMyPost', selectedMyPost)
  // console.log('>>>>>>>All the threads', threads)
  // console.log('>>>>>>>>threadsIds', threadsIds)
  // console.log('>>>>>>page', page)

  return (
    <CompsLayout>
      <div id="pages-my-posts" className="text-center">
        {/* <h1>My Posts</h1> */}
        {/* <Grid id="pages-my-posts-main-grid">
          <Grid item lg={4} id="pages-my-posts-avatar-grid">
            <div className="border rounded d-flex justify-content-center" id="pages-my-posts-avatar-grid-wrap">
              <div id="pages-my-posts-avatar">
                <Avatar src={currentUser?.avatar} alt="avatar" sx={{ width: 200, height: 200 }} />
                <Typography variant="h5" gutterBottom component="div" id="pages-my-posts-avatar-name">
                  {currentUser?.name}
                </Typography>
              </div>
            </div>
            <div className="border rounded d-flex justify-content-center" id="pages-my-posts-in-pages-nav">
              <CardContent className="d-flex flex-column">
                <Link href="/my/profile">Profile</Link>
                <Link href="/my/threads">My Threads</Link>
                <Link href="/my/posts">My Posts</Link>
                <Link href="/my/notifications">My Notifications</Link>
                <Link href="/my/favourites">My Favourites</Link>
              </CardContent>
            </div>
          </Grid>
          <Grid item lg={8} id="pages-my-posts-grid" className="d-flex justify-content-center">
            <div className="d-flex flex-column" id="pages-my-posts-grid-inside">
              {
          myPosts?.map((myPost) => (

            threadsIds?.includes(myPost.ThreadId) && (
            <>
              <div key={myPost.id} className="card border-2" id="pages-my-posts-grid-inside-card">
                <div className="card-body">
                  <div className="card-title" id="pages-my-posts-grid-inside-card-card-title">
                    {myPost.content}
                  </div>
                  <ColoredLine color="black" />
                  <div className="card-text d-flex flex-column">
                    <Link href={`/threads/${myPost.ThreadId}`}>View Parent Thread</Link>
                    <div className="btn-container d-flex justify-content-around">
                      <button
                        className="btn btn-primary btn-sm"
                        type="button"
                        onClick={() => {
                          setSelectedMyPost(myPost)
                          setOpenMyPostsUpdate(true)
                        }}
                      ><i className="fas fa-pen" />  Edit My Post</button>
                      <button
                        className="btn btn-danger btn-sm"
                        type="button"
                        onClick={() => {
                          setSelectedMyPost(myPost)
                          // destroyPost(selectedMyPost)
                          setOpenMyPostsDelete(true)
                        }}
                      ><i className="fas fa-trash-alt" />  Delete My Post</button>
                    </div>
                  </div>
                </div>
              </div>

              <CompsModalsPostsUpdate
                show={openMyPostsUpdate}
                initialValues={selectedMyPost}
                handleClose={() => setOpenMyPostsUpdate(false)}
                handleSubmit={(values) => {
                  updatePost(values).then(() => {
                    setOpenMyPostsUpdate(false)
                  })
                }}
              />

              <CompsModalsMyPostsDelete
                show={openMyPostsDelete}
                handleClose={() => setOpenMyPostsDelete(false)}
                handleDelete={() => {
                  destroyPost(selectedMyPost).then(() => {
                    setOpenMyPostsDelete(false)
                  })
                }}
              />
            </>
            )

          ))
        }
            </div>
          </Grid>
        </Grid> */}
        <div id="page-my-posts-pagination-btn" className="d-flex justify-content-around">
          {
            page > 1 && <button type="button" className="btn btn-info btn-spacing" id="page-my-posts-pagination-btn-btn" onClick={() => setPage(page - 1)}>Previous</button>
          }

          {
            true && <button type="button" className="btn btn-info" id="page-my-posts-pagination-btn-btn" onClick={() => setPage(page + 1)}>Load More</button>
          }
        </div>
      </div>

    </CompsLayout>
  )
}
