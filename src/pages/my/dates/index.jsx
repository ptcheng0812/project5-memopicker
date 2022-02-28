import React, { useState } from 'react';
import Link from 'next/link';
import { Grid, GridItem } from '@chakra-ui/react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import CompsLayout from '@/components/layouts/Layout'
import CompsFormsMyDate from '@/components/forms/my-dates/create'

import useUser from '@/_hooks/user'
import useMyDates from '@/_hooks/myDates'

export default function PagesMyThreads() {
  const [value, onChange] = useState(null)
  const { dates, createMyDate } = useMyDates()

  function formatDate(timestamp){
    var x=timestamp
    var dd = x?.getDate()
    var mm = x?.getMonth()+1
    var finalMM = 0
    var finalDD = 0
    if (mm < 10) {
      finalMM = "0" + mm
    }
    else {
      finalMM = mm
    }

    if (dd < 10) {
      finalDD = "0" + dd
    }
    else {
      finalDD = dd
    }
    var yy = x?.getFullYear()
    return yy +"-" + finalMM +"-" + finalDD
  }
  // console.log('choseDate>>>>>>>>', formatDate(value).toString())
  // console.log('dates>>>>>>>>>>>', dates)

  // console.log(value)

  return (<CompsLayout>
    <div id="page-my-dates-index">
    <aside className="sidebar">
        <nav className="nav">
          <ul>
            <li className="active"><a href="#">Welcome</a></li>
            <li><a href="/my/dates">Calendar</a></li>
            <li><a href="#">Profile</a></li>
            <li><a href="#">Get In Touch</a></li>
          </ul>
        </nav>
    </aside>
      <Grid
        h='200px'
        templateRows='repeat(2, 1fr)'
        templateColumns='repeat(5, 1fr)'
        gap={4}
      >
        <GridItem rowSpan={2} colSpan={1}>
          <h1>Calendar</h1>
        </GridItem>
        <GridItem colSpan={4}>
          <CompsFormsMyDate
            handleSubmit={(values) => {
              createMyDate(values)
            }}
            // onChange={onChange}
            initialValues={{
              date: ''
            }}
          />
        <div id="page-dates-index-calendar">
          <Calendar
            navigationAriaLabel={"Go up"}
            navigationAriaLive="polite"
            onChange={onChange}
            value={value}
          />
        </div>
        {
          dates?.map((date) => (
            <>
              {
                date?.date === formatDate(value).toString() && (
                  <div>
                    {
                      date?.Tasks !== null && (
                        <button type="button" id="pages-dates-show-view-btn"><a href={`/my/dates/${date?.id}`} passHref><i className="fas fa-arrow-right"/>  View Your Schedule</a></button>
                      )
                    }
                  </div>
                )
              }
            </>
          ))
        }
        </GridItem>
      </Grid>
    </div>
  </CompsLayout>
  )
}
