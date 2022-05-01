import React, { FC } from "react"
import { Outlet, NavLink } from "react-router-dom"

const navigate = [
  {
    id: 1,
    to: '/',
    name: 'Home',
  },
  {
    id: 2,
    to: '/chats',
    name: 'Chat',
  },
]

export const Header: FC = () => (
  <>
    <header className="header">
      <ul>
        {navigate.map((link) => (
          <li key={link.id}>
            <NavLink
              to={link.to}
              style={({ isActive }) => ({ color: isActive ? 'green' : 'black' })}
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </header>

    <main className="container">
      <Outlet />
    </main>
  </>
)