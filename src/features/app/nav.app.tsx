import { NavLink, Outlet } from 'react-router-dom'

export const Nav = () => {
  return (
    <>
      <div className='view'>
        <div className='view__banner'>
          <h1>Library Management System</h1>
        </div>
        <div className='view__content'>
          <nav>
            <h2>Menu</h2>
            <NavLink to='/'>Books</NavLink>
            <NavLink to='/members'>Members</NavLink>
            <NavLink to='/issues'>Issues</NavLink>
            <NavLink to='/returns'>Returns</NavLink>
          </nav>
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </>
  )
}
