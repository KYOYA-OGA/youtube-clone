import React, { useState } from 'react'
import './_header.scss'
import { Link, useHistory } from 'react-router-dom'

// import ytIcon from ''

import { FaBars } from 'react-icons/fa'
import { AiOutlineSearch, AiFillYoutube } from 'react-icons/ai'
import { MdNotifications, MdApps } from 'react-icons/md'
import { useSelector } from 'react-redux'

const Header = ({ handleToggleSidebar }) => {
  const [input, setInput] = useState('')

  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()

    history.push(`/search/${input}`)
  }

  const user = useSelector((state) => state.auth?.user)
  return (
    <div className="border border-dark header">
      <FaBars
        className="header__menu"
        size={26}
        onClick={() => handleToggleSidebar()}
      />
      <Link to="/">
        <AiFillYoutube className="header__logo" size={30} />
      </Link>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">
          <AiOutlineSearch size={22} />
        </button>
      </form>

      <div className="header__icons">
        <MdNotifications size={28} />
        <MdApps size={28} />
        <img src={user?.photoURL} alt="avatar" className="header__icon" />
      </div>
    </div>
  )
}

export default Header
