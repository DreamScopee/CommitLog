import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Layout from './ui/Layout.jsx'
import HomePage from './views/HomePage.jsx'
import AboutPage from './views/AboutPage.jsx'
import CategoryPage from './views/CategoryPage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'ai', element: <CategoryPage category="ai" /> },
      { path: 'agents', element: <CategoryPage category="agents" /> },
      { path: 'developers', element: <CategoryPage category="developers" /> },
      { path: 'programming-languages', element: <CategoryPage category="programming-languages" /> },
      { path: 'startups', element: <CategoryPage category="startups" /> },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
