import React from 'react'
import './_sidebar.scss'

import {
  MdSubscriptions,
  MdExitToApp,
  MdThumbUp,
  MdHistory,
  MdLibraryBooks,
  MdHome,
  MdSentimentDissatisfied,
} from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { log_out } from '../../redux/actions/auth.action'
import { Link } from 'react-router-dom'

const Sidebar = ({ sidebar, handleToggleSidebar }) => {
  const dispatch = useDispatch()

  const logOutHandler = () => {
    dispatch(log_out())
  }

  return (
    <nav
      className={sidebar ? 'sidebar open' : 'sidebar'}
      onClick={() => handleToggleSidebar(false)}
    >
      <ul>
        <li>
          <Link to="/">
            <MdHome size={23} />
            <span>Home</span>
          </Link>
        </li>

        <li>
          <Link to="/feed/subscriptions">
            <MdSubscriptions size={23} />
            <span>Subscriptions</span>
          </Link>
        </li>

        <li>
          <MdThumbUp size={23} />
          <span>Liked Video</span>
        </li>
        <li>
          <MdHistory size={23} />
          <span>History</span>
        </li>
        <li>
          <MdLibraryBooks size={23} />
          <span>Library</span>
        </li>
        <li>
          <MdSentimentDissatisfied size={23} />
          <span>I don't know</span>
        </li>
        <hr />
        <li onClick={logOutHandler}>
          <MdExitToApp size={23} />
          <span>Log Out</span>
        </li>
        <hr />
      </ul>
    </nav>
  )
}

export default Sidebar
