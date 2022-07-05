import React from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineLogout } from 'react-icons/ai'
import Logo from '../assets/dark-logo.png'

export default function Header() {
      const handleClick = () => {
            window.localStorage.clear()
      }

      return (
            <div
                  style={{
                        marginBottom: '10px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderBottom: '2px solid #fd2d01',
                  }}
            >
                  <div>
                        <Link to="/home">
                              <img
                                    style={{ height: '150px', width: '200px' }}
                                    src={Logo}
                                    alt="logo-groupomania"
                              />
                        </Link>
                  </div>
                  <div>
                        <Link
                              style={{
                                    color: '#4E5166',
                                    textDecoration: 'none',
                                    fontSize: '20px',
                                    marginRight: '15px',
                              }}
                              to="/"
                              onClick={handleClick}
                        >
                              Logout <AiOutlineLogout />
                        </Link>
                  </div>
            </div>
      )
}
