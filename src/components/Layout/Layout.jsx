import React from 'react'
import { Link, Outlet, NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { logout } from '../../redux/action/actionCreator'
import imgAvatar from '../../subsidiary/img/avatar.svg'
import './Layout.scss'

const Authorised = () => {
  const dispatch = useDispatch()

  const { username, pic } = useSelector(({ username, pic }) => ({
    username,
    pic,
  }))

  const avatar = pic || imgAvatar

  const onClick = () => {
    dispatch(logout())
  }

  return (
    <div className="header-wrapper">
      <NavLink to="/new-article" className="header-create-art">
        {' '}
        Create article{' '}
      </NavLink>
      <NavLink to="/profile" className="header-avatar">
        <span>{username}</span>
        <img src={avatar} alt="avatar" className="header-img" />
      </NavLink>
      <button onClick={onClick} className="header-logout">
        Log Out
      </button>
    </div>
  )
}

const NotAuthorised = () => (
  <div className="header-wrapper">
    <NavLink to="/sign-in" className="header-link">
      {' '}
      Sing In{' '}
    </NavLink>
    <NavLink to="/sign-up" className="header-link">
      {' '}
      Sing Up{' '}
    </NavLink>
  </div>
)

const Layout = () => {
  const { isAuth } = useSelector(({ isAuth }) => ({ isAuth }))

  return (
    <>
      <header className="header">
        <div className="header-title">
          <Link to="/articles" className="header-link">
            {' '}
            Realworld Blog{' '}
          </Link>
        </div>
        {isAuth ? <Authorised /> : <NotAuthorised />}
      </header>
      <main className="main-wrapper">
        <Outlet />
      </main>
      <footer />
    </>
  )
}

export default Layout
