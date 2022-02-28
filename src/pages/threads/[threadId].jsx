/* eslint-disable @next/next/no-html-link-for-pages */
// import Link from 'next/link'
// import { useState } from 'react'
// import { useRouter } from 'next/router'
// import Avatar from '@mui/material/Avatar'
// import Grid from '@mui/material/Grid'

// import useThread from '@/_hooks/thread'
// import useUser from '@/_hooks/user'
// import useFavourites from '@/_hooks/favourites'
// import usePublicUsers from '@/_hooks/publicUsers'

import CompsLayout from '@/components/layouts/Layout'
import CompsModalsThreadsUpdate from '@/components/modals/threads/update'
import CompsModalsPostsCreate from '@/components/modals/posts/create'
import CompsModalsPostsUpdate from '@/components/modals/posts/update'
import CompsModalsImmediateHelp from '@/components/modals/immediate'

// const ColoredLine = ({ color }) => (
//   <hr
//     style={{
//       color,
//       backgroundColor: color,
//       height: 1
//     }}
//     id="pages-my-threads-coloured-line"
//   />
// )

export default function PagesThreadShow() {
  // const [openThreadsUpdate, setOpenThreadsUpdate] = useState(false)
  // const [openPostsCreate, setOpenPostsCreate] = useState(false)
  // const [openPostsUpdate, setOpenPostsUpdate] = useState(false)
  // const [openImmediate, setOpenImmediate] = useState(false)
  // const [selectedPost, setSelectedPost] = useState({})
  // const [page, setPage] = useState(1)
  // const { query: { threadId } } = useRouter()

  // const { thread, postsIds, updateThread, destroyThread, createPost, updatePost, destroyPost } = useThread(threadId)
  // const { currentUser } = useUser()
  // const { users } = usePublicUsers()
  // const { favourites, createFavourite, destroyFavourite } = useFavourites()
  // const myFavouritesPostsIds = favourites?.map((favourite) => favourite.PostId)
  // const pageOffset = page * 5
  // // const pageLimitInArray = Array.from({ length: pageOffset }, (_, i) => i + 1)
  // const filteredThreadPosts = thread?.Posts?.slice(0, pageOffset)

  // console.log('>>>>>>>>>thread', thread)
  // console.log('>>>>>>>>thread.Posts>', thread?.Posts)
  // console.log('>>>>>>>>>>currentUser', currentUser)
  // console.log('>>>>>>>>>>favourites', favourites)
  // console.log('>>>>>>>>>>>myFavouritesPostsIds', myFavouritesPostsIds)
  // console.log('>>>>>>>>>>>>All the Users', users)
  // console.log('>>>>>>>>>>>>page', page)
  // console.log('>>>>>>>>>>>>pageOffset', pageOffset)
  // console.log('>>>>>>>>>>>>filteredThreadPosts', filteredThreadPosts)
  // // console.log('>>>>>>>>>>>>pageLimitInArray', pageLimitInArray)

  return (
    <CompsLayout>

      <CompsModalsThreadsUpdate
        show={openThreadsUpdate}
        initialValues={thread}
        handleClose={() => setOpenThreadsUpdate(false)}
        handleSubmit={(values) => {
          updateThread(values).then(() => {
            setOpenThreadsUpdate(false)
          })
        }}
      />

      <CompsModalsPostsCreate
        show={openPostsCreate}
        handleClose={() => setOpenPostsCreate(false)}
        handleSubmit={(values) => {
          createPost(values).then(() => {
            setOpenPostsCreate(false)
          })
        }}
      />

      <CompsModalsPostsUpdate
        show={openPostsUpdate}
        initialValues={selectedPost}
        handleClose={() => setOpenPostsUpdate(false)}
        handleSubmit={(values) => {
          updatePost(values).then(() => {
            setOpenPostsUpdate(false)
          })
        }}
      />

      <CompsModalsImmediateHelp
        show={openImmediate}
        handleClose={() => setOpenImmediate(false)}
      />


    </CompsLayout>

  )
}
