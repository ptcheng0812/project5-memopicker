import { useState } from 'react'
import Link from 'next/link'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'

import useUser from '@/_hooks/user'
import CompsModalsAuthSignUp from '@/components/modals/auth/signup'
import CompsModalsAuthLogin from '@/components/modals/auth/login'
import CompsModalsImmediateHelp from '@/components/modals/immediate'

export default function CompsLayoutsNavbar() {
  const [openAuthSignUp, setAuthSignUp] = useState(false)
  const [openAuthLogin, setAuthLogin] = useState(false)
  const [openImmediate, setOpenImmediate] = useState(false)

  const { currentUser, authSignUp, authLogin, authLogout } = useUser()

  return (
    <>
      <Navbar id="comps-layouts-navbar" bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand as={Link} href="/"><a className="navbar-brand">Home</a></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto d-flex justify-content-between">
              {!currentUser
                && (
                <>
                  <button
                    id="nav-bar-signup-login-btn"
                    className="btn btn-success btn-sm"
                    type="button"
                    onClick={() => setAuthSignUp(true)}
                  >SignUp</button>
                  <button
                    id="nav-bar-signup-login-btn"
                    className="btn btn-success btn-sm"
                    type="button"
                    onClick={() => setAuthLogin(true)}
                  >LogIn</button>
                  <a
                    className="nav-link nav-link-faded has-icon"
                    onClick={() => {
                      setOpenImmediate(true)
                    }}
                  >Immediate Help</a>
                </>
                )}
              {currentUser
                && (
                  <>
                    <Nav.Link href="/categories">Category</Nav.Link>
                    <Nav.Link href="/my/profile">Profile</Nav.Link>
                    <a
                      className="nav-link nav-link-faded has-icon"
                      onClick={() => {
                        setOpenImmediate(true)
                      }}
                    >Immediate Help</a>
                    <button
                      className="btn btn-danger btn-sm"
                      id="nav-bar-logout-btn"
                      type="button"
                      onClick={() => authLogout()}
                    >Logout</button>
                  </>
                )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <CompsModalsAuthSignUp
        show={openAuthSignUp}
        handleClose={() => setAuthSignUp(false)}
        handleSubmit={(values) => {
          authSignUp(values).then(() => {
            setAuthSignUp(false)
          })
        }}
      />

      <CompsModalsAuthLogin
        show={openAuthLogin}
        handleClose={() => setAuthLogin(false)}
        handleSubmit={(values) => {
          authLogin(values).then(() => {
            setAuthLogin(false)
          })
        }}
      />

      <CompsModalsImmediateHelp
        show={openImmediate}
        handleClose={() => setOpenImmediate(false)}
      />

    </>
  )
}
