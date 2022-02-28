/* eslint-disable @next/next/no-html-link-for-pages */
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Avatar from '@mui/material/Avatar'
import Grid from '@mui/material/Grid'

import useThread from '@/_hooks/thread'
import useUser from '@/_hooks/user'
import useFavourites from '@/_hooks/favourites'
import usePublicUsers from '@/_hooks/publicUsers'

import CompsLayout from '@/components/layouts/Layout'
import CompsModalsThreadsUpdate from '@/components/modals/threads/update'
import CompsModalsPostsCreate from '@/components/modals/posts/create'
import CompsModalsPostsUpdate from '@/components/modals/posts/update'
import CompsModalsImmediateHelp from '@/components/modals/immediate'

const ColoredLine = ({ color }) => (
  <hr
    style={{
      color,
      backgroundColor: color,
      height: 1
    }}
    id="pages-my-threads-coloured-line"
  />
)

export default function PagesThreadShow() {
  const [openThreadsUpdate, setOpenThreadsUpdate] = useState(false)
  const [openPostsCreate, setOpenPostsCreate] = useState(false)
  const [openPostsUpdate, setOpenPostsUpdate] = useState(false)
  const [openImmediate, setOpenImmediate] = useState(false)
  const [selectedPost, setSelectedPost] = useState({})
  const [page, setPage] = useState(1)
  const { query: { threadId } } = useRouter()

  const { thread, postsIds, updateThread, destroyThread, createPost, updatePost, destroyPost } = useThread(threadId)
  const { currentUser } = useUser()
  const { users } = usePublicUsers()
  const { favourites, createFavourite, destroyFavourite } = useFavourites()
  const myFavouritesPostsIds = favourites?.map((favourite) => favourite.PostId)
  const pageOffset = page * 5
  // const pageLimitInArray = Array.from({ length: pageOffset }, (_, i) => i + 1)
  const filteredThreadPosts = thread?.Posts?.slice(0, pageOffset)

  console.log('>>>>>>>>>thread', thread)
  console.log('>>>>>>>>thread.Posts>', thread?.Posts)
  console.log('>>>>>>>>>>currentUser', currentUser)
  console.log('>>>>>>>>>>favourites', favourites)
  console.log('>>>>>>>>>>>myFavouritesPostsIds', myFavouritesPostsIds)
  console.log('>>>>>>>>>>>>All the Users', users)
  console.log('>>>>>>>>>>>>page', page)
  console.log('>>>>>>>>>>>>pageOffset', pageOffset)
  console.log('>>>>>>>>>>>>filteredThreadPosts', filteredThreadPosts)
  // console.log('>>>>>>>>>>>>pageLimitInArray', pageLimitInArray)

  return (
    <CompsLayout>
      <div id="pages-threads-show" className="text-center">
        <div className="d-flex justify-content-around" id="pages-threads-show-header-container">
          {/* <div id="pages-threads-show-thread-header-pic" /> */}
          <div className="border" id="pages-threads-show-thread-info">
            <h3 id="pages-threads-show-thread-info-title"> {thread?.title} </h3>
            {/* <h5 id="pages-threads-show-thread-info-category"> Category: {thread?.category} </h5> */}
            <Link href={`/categories/${thread?.category.toLowerCase()}`} passHref><button type="button" id="pages-threads-show-thread-info-category-btn"><i className="fas fa-arrow-left" />  Back</button></Link>
            <ColoredLine color="black" />
            <div className="d-flex justify-content-around" id="pages-threads-show-header-btn-group">
              <button
                className="btn btn-outline-primary btn-lg border-0"
                id="pages-threads-show-header-edit-btn"
                type="button"
                onClick={() => setOpenThreadsUpdate(true)}
              ><i className="fas fa-edit" /></button>
              <button
                className="btn btn-success btn-sm"
                id="pages-threads-show-header-new-btn"
                type="button"
                onClick={() => setOpenPostsCreate(true)}
              ><i className="fas fa-pen-square" />  Respond</button>
              <button
                className="btn btn-outline-danger btn-lg border-0"
                id="pages-threads-show-header-delete-btn"
                type="button"
                onClick={() => destroyThread()}
              ><i className="fas fa-trash-alt" /></button>
            </div>
          </div>
        </div>
      </div>

      <main id="thread-main-group" className="thread-main-group d-flex justify-content-center">
        <Grid id="pages-my-favourites-main-grid">
          <Grid item lg={4} id="pages-my-favourites-avatar-grid">
            <div className="inner-sidebar-body p-0">
              <div className="p-3 h-100" data-simplebar="init">
                <div className="simplebar-wrapper">
                  <div className="simplebar-height-auto-observer-wrapper"><div className="simplebar-height-auto-observer" /></div>
                  <div className="simplebar-mask">
                    <div className="simplebar-offset">
                      <div className="simplebar-content-wrapper">
                        <div className="simplebar-content">
                          <nav className="nav nav-pills nav-gap-y-1 flex-column">
                            <a href={`/categories/${thread?.category.toLowerCase()}`} className="nav-link nav-link-faded has-icon active">View Threads of {thread?.category}</a>
                            <a href="/categories" className="nav-link nav-link-faded has-icon">View All Categories</a>
                            <a href="/my/profile" className="nav-link nav-link-faded has-icon">Profile</a>
                            <a href="https://shielded-falls-80328.herokuapp.com/" className="nav-link nav-link-faded has-icon">Anonymous Chat</a>
                            <a
                              className="nav-link nav-link-faded has-icon"
                              onClick={() => {
                                setOpenImmediate(true)
                              }}
                            >Immediate Help</a>
                          </nav>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="simplebar-placeholder" />
                </div>
                <div className="simplebar-track simplebar-horizontal"><div className="simplebar-scrollbar" /></div>
                <div className="simplebar-track simplebar-vertical"><div className="simplebar-scrollbar" /></div>
              </div>
            </div>
          </Grid>
          <Grid item lg={8} id="pages-my-favourites-grid" className="d-flex justify-content-center">
            <div className="d-flex flex-column forum-content">
              {
            filteredThreadPosts?.map((post) => (
              <div className="card" id="pages-threads-show-posts-card">
                <div className="card-body">
                  <div key={post.id} className="card-title">
                    <div className="d-flex justify-content-start       align-items-center">
                      <Avatar src={users?.find(({ id }) => id === post.UserId)?.avatar} alt="avatar" sx={{ width: 50, height: 50 }} />
                      <a href={`/users/${users?.find(({ id }) => id === post.UserId)?.id}`} id="pages-threads-show-posts-card-card-title-avatar-name">{ users?.find(({ id }) => id === post.UserId)?.name }</a>
                    </div>
                    <div id="pages-threads-show-posts-card-card-title-post-content">{post?.content}</div>
                  </div>
                  <ColoredLine color="black" />
                  <div className="card-text" id="pages-threads-show-posts-card-card-text">
                    {post?.UserId === currentUser?.id
                        && (
                        <div className="btn-container d-flex justify-content-end">
                          <button
                            className="btn btn-primary btn-sm"
                            type="button"
                            id="pages-threads-show-posts-edit-btn"
                            onClick={() => {
                              setSelectedPost(post)
                              setOpenPostsUpdate(true)
                            }}
                          >Edit Post</button>
                          <button
                            className="btn btn-danger btn-sm"
                            type="button"
                            id="pages-threads-show-posts-delete-btn"
                            disabled={postsIds.includes(post.id)}
                            onClick={() => {
                              destroyPost(post)
                            }}
                          >Delete Post</button>
                        </div>
                        )}
                    {myFavouritesPostsIds?.includes(post.id)
                      && (
                        <button
                          className="btn btn-info btn-sm"
                          type="button"
                          onClick={() => {
                            destroyFavourite(post)
                          }}
                        >Marked</button>
                      )}
                    {!myFavouritesPostsIds?.includes(post.id)
                      && (
                        <button
                          className="btn btn-info btn-sm"
                          type="button"
                          onClick={() => {
                            createFavourite(post)
                          }}
                        >Mark as Favourite</button>
                      )}
                  </div>
                </div>
              </div>
            ))
          }
            </div>
          </Grid>
        </Grid>
      </main>

      <div id="page-my-favourites-pagination-btn" className="d-flex justify-content-around">
        {
            page > 1 && <button type="button" className="btn btn-info btn-spacing" id="page-my-favourites-pagination-btn-btn" onClick={() => setPage(page - 1)}>Roll Back</button>
          }

        {
            true && <button type="button" className="btn btn-info" id="page-my-favourites-pagination-btn-btn" onClick={() => setPage(page + 1)}>Load More</button>
          }
      </div>

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
