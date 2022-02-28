import { useState } from 'react'
import { useRouter } from 'next/router'
import { Grid, GridItem } from '@chakra-ui/react'

import useDate from '@/_hooks/myDate'
import useUser from '@/_hooks/user'

import CompsLayout from '@/components/layouts/Layout'
import CompsModalsTasksCreate from '@/components/modals/my-tasks/create'
import CompsModalsTasksUpdate from '@/components/modals/my-tasks/update'

export default function PagesThreadShow() {
  const { query: { dateId } } = useRouter()
  const { date, createTasks, updateTasks, destroyTasks } = useDate(dateId)
  const { currentUser } = useUser()

  const [openTasksCreate, setOpenTasksCreate] = useState(false)
  const [openTaskUpdate, setOpenTaskUpdate] = useState(false)
  const [ selectedTask, setSelectedTasks] = useState({})

  console.log("date>>>>>>>>>>", date)
  console.log('currentUser>>>>', currentUser)

  return (
    <CompsLayout>
      <aside class="sidebar">
        <nav class="nav">
          <ul>
            <li class="active"><a href="#">Welcome</a></li>
            <li><a href="/my/dates">Calendar</a></li>
            <li><a href="#">Profile</a></li>
            <li><a href="#">Get In Touch</a></li>
          </ul>
        </nav>
      </aside>
      <div id="page-my-date-show">
        <Grid
        h='200px'
        templateRows='repeat(2, 1fr)'
        templateColumns='repeat(5, 1fr)'
        gap={4}
        >
          <GridItem rowSpan={2} colSpan={1}>
            <h1>{date?.date}</h1>
          </GridItem>
          <GridItem colSpan={4}>
            <div class="board">
              <div class="board-header">
                <div class="left">
                  <div class="board-header-text">Board Title</div>
                  <div class="button">Star</div>
                  <div class="button">Personal</div>
                  <div class="button">Private</div>
                </div>
                <div class="right">
                  <div class="button">Show menu</div>
                </div>
              </div>
              <div class="board-list">
            <div class="list-title">
              List title
            </div>
            {
              date?.Tasks?.map((task) => (
                <>
                  <div class="card">
                    <div class="d-flex justify-content-between align-items-center">
                      <div>{task?.duty}</div>
                      <div>
                        <button
                        className="btn btn-outline-primary btn-lg border-0"
                        id="pages-my-date-show-edit-btn"
                        type="button"
                        onClick={() => {
                          setOpenTaskUpdate(true)
                          setSelectedTasks(task)
                        }}
                        ><i className="fas fa-edit" /></button>
                        <button
                          className="btn btn-danger btn-sm"
                          type="button"
                          onClick={() => {
                          destroyTasks(task)
                        }}
                        ><i className="fas fa-trash-alt" /></button>
                      </div>

                    </div>
                  </div>
                </>
              ))
            }
            <div class="add-card">
              <button
              className="btn btn-success btn-sm"
              id="pages-date-show-new-btn"
              type="button"
              onClick={() => setOpenTasksCreate(true)}
              > + Add another card</button>
            </div>
              </div>
            </div>
          </GridItem>
        </Grid>
      </div>





      <CompsModalsTasksCreate
        show={openTasksCreate}
        handleClose={() => setOpenTasksCreate(false)}
        handleSubmit={(values) => {
          createTasks(values).then(() => {
            setOpenTasksCreate(false)
          })
        }}
      />

      <CompsModalsTasksUpdate
        show={openTaskUpdate}
        initialValues={selectedTask}
        handleClose={() => setOpenTaskUpdate(false)}
        handleSubmit={(values) => {
          updateTasks(values).then(() => {
            setOpenTaskUpdate(false)
          })
        }}
      />
    </CompsLayout>

  )
}
