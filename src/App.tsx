import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Books } from './views/books.view'
import { Issues } from './views/issues.view'
import { Members } from './views/members.view'
import { Registry } from './views/registry.view'
import { Returns } from './views/returns.view'
import { Nav } from './features/app/nav.app'
import { AppProvider } from './utils/context'
import './global.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Nav />,
    children: [
      { index: true, element: <Books /> },
      { path: 'members', element: <Members /> },
      { path: 'registry', element: <Registry /> },
      { path: 'returns', element: <Returns /> },
      { path: 'issues', element: <Issues /> }
    ]
  }
])

export const App = () => {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  )
}
