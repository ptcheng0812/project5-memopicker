import Link from 'next/link'
import { useState } from 'react'
import Typography from '@mui/material/Typography'
import CompsLayoutsNavbar from '@/components/layouts/Navbar'
import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';

import CompsModalsHowShow from '@/components/modals/how/how-show'

export default function PagesHome() {
  const [openHow, setOpenHow] = useState(false)

  return (
    <div id="pages-home">
      {/* <CompsLayoutsNavbar />
      <div id="background-img" />
      <Link href="/categories" passHref>
        <button
          className="btn btn btn-outline-primary btn-lg"
          id="pages-home-background-btn"
          type="button"
        ><i className="fas fa-arrow-circle-right" /> Get Started</button>
      </Link>
      <Typography variant="h3" component="div" id="pages-home-text">
        A Place To Connect Your Mentals
      </Typography> */}
      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={6} w={'full'} maxW={'lg'}>
          <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
            <Text
              as={'span'}
              position={'relative'}
              _after={{
                content: "''",
                width: 'full',
                height: useBreakpointValue({ base: '20%', md: '30%' }),
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'purple.400',
                zIndex: -1,
              }}>
              Mark Your Tasks
            </Text>
            <br />{' '}
            <Text color={'purple.400'} as={'span'}>
              MemoPicker
            </Text>{' '}
          </Heading>
          <Image
            src={'https://i0.wp.com/www.cssscript.com/wp-content/uploads/2019/02/Simple-Datepicker-Calendar-In-Vanilla-JavaScript.png?fit=486%2C504&ssl=1'}
          />
          <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
            The MemoPicker is an exclusive resource for tasks management. It's
            perfect for freelancers, agencies, and moonlighters for scheduling their daily tasks.
          </Text>
          <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
            <Button
              rounded={'full'}
              bg={'purple.400'}
              color={'white'}
              _hover={{
                bg: 'purple.500',
              }}>
              <a href="/my/dates">Calendar</a>
            </Button>
            <Button
              rounded={'full'}
              onClick={() => {
                setOpenHow(true)
              }}
            >How It Works</Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={
            'https://www.b2bwritingsuccess.com/wp-content/uploads/2018/05/bigstock-Young-People-Work-In-Modern-Of-214656004.jpg'
          }
        />
      </Flex>
    </Stack>

    <CompsModalsHowShow
        show={openHow}
        handleClose={() => setOpenHow(false)}
      />
    </div>
  )
}
