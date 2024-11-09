import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <>
      {/* TODO: can implement navbar if want */}
      <header></header>
      <main>
        <Outlet />
      </main>
      {/* TODO: can implement footer if want */}
      <footer></footer>
    </>
  )
}

export default MainLayout
