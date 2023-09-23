import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Books } from './views/books.view'
import { Issues } from './views/issues.view'
import { Members } from './views/members.view'
import { Returns } from './views/returns.view'
import { Nav } from './features/app/nav.app'
import './global.css'
import './responsiveGlobal.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Nav />,
    children: [
      { index: true, element: <Books /> },
      { path: 'members', element: <Members /> },
      { path: 'issues', element: <Issues /> },
      { path: 'returns', element: <Returns /> }
    ]
  }
])

export const App = () => {
  return <RouterProvider router={router} />
}
