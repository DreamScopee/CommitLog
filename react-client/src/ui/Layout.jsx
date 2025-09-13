import { NavLink, Outlet, Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { useAuth } from '../contexts/AuthContext'
import UserProfile from '../components/UserProfile'

function Header() {
  const { user } = useAuth()

  return (
    <header className="container mx-auto px-6 pt-8 md:pt-12 relative z-10 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <img src="/devscentral.jpg" alt="DevsCentral Logo" className="w-8 h-8 rounded-lg logo-border" />
        <div className="text-2xl font-jakarta font-bold text-white">DevsCentral</div>
      </div>
      <div className="flex items-center space-x-4">
        {user ? (
          <UserProfile />
        ) : (
          <div className="flex items-center space-x-3">
            <Link
              to="/login"
              className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
            >
              Sign Up
            </Link>
          </div>
        )}
        <a href="https://www.buymeacoffee.com/ameenxv" target="_blank" rel="noopener noreferrer" className="text-white header-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-coffee"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h14v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>
          <span className="header-icon-label">Coffee</span>
        </a>
        <a href="https://github.com/ameen-ansarii/CommitLog" target="_blank" rel="noopener noreferrer" className="text-white header-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          <span className="header-icon-label">GitHub</span>
        </a>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="mt-20 py-10 border-t border-gray-800 relative z-10">
      <div className="container mx-auto px-6 text-center text-gray-400">
        <p>&copy; 2025 TechHub. All rights reserved.</p>
      </div>
    </footer>
  )
}

function FloatingDock() {
  const dockRef = useRef(null)
  useEffect(() => {
    const dock = dockRef.current
    if (!dock) return
    const items = Array.from(dock.querySelectorAll('.dock-item'))
    function onMove(e){
      const rect = dock.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      items.forEach((item) => {
        const r = item.getBoundingClientRect()
        const center = r.left + r.width / 2 - rect.left
        const distance = Math.abs(mouseX - center)
        const maxDistance = 150
        const scale = Math.max(1, 1.2 - distance / maxDistance)
        item.style.transform = `scale(${scale})`
        item.style.transition = 'transform 0.1s'
      })
    }
    function onLeave(){
      items.forEach((item) => {
        item.style.transform = 'scale(1)'
        item.style.transition = 'transform 0.2s'
      })
    }
    dock.addEventListener('mousemove', onMove)
    dock.addEventListener('mouseleave', onLeave)
    return () => {
      dock.removeEventListener('mousemove', onMove)
      dock.removeEventListener('mouseleave', onLeave)
    }
  }, [])
  const links = [
    { title: 'Home', href: '/', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
    )},
    { title: 'Startups', href: '/startups', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 19.5l15-15m-10.5 0l10.5 10.5m-4.5-15h6v6m-12 6v6h6"/></svg>
    )},
    { title: 'AI', href: '/ai', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 0 0-10 10c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69a3.6 3.6 0 0 1 .1-2.64s.84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.37.2 2.4.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.72c0 .27.16.59.67.5A10 10 0 0 0 12 2z"/></svg>
    )},
    { title: 'Developers', href: '/developers', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
    )},
    { title: 'Agents', href: '/agents', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0l-2.5 5H6.5L4 16"/></svg>
    )},
    { title: 'Programming Languages', href: '/programming-languages', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>
    )},
  ]

  return (
    <div id="floating-dock" className="floating-dock" ref={dockRef}>
      {links.map(link => (
        <NavLink key={link.href} to={link.href} className="dock-item">
          {link.icon}
          <span className="dock-title">{link.title}</span>
        </NavLink>
      ))}
    </div>
  )
}

export default function Layout() {
  const orbRef = useRef(null)
  useEffect(() => {
    const orb = document.getElementById('interactive-orb')
    if (!orb) return
    let curX = 0, curY = 0, tgX = 0, tgY = 0
    function move(){
      curX += (tgX - curX) / 20
      curY += (tgY - curY) / 20
      orb.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`
      requestAnimationFrame(move)
    }
    function onMouse(e){ tgX = e.clientX; tgY = e.clientY }
    window.addEventListener('mousemove', onMouse)
    move()
    return () => { window.removeEventListener('mousemove', onMouse) }
  }, [])
  return (
    <div data-page="react">
      <Header />
      <main className="container mx-auto px-6 pb-32 relative z-10">
        <Outlet />
      </main>
      <Footer />
      <FloatingDock />
      <div id="interactive-orb" aria-hidden="true" style={{position:'fixed', top:0, left:0, width:40, height:40, borderRadius:9999, background:'radial-gradient(circle at center, rgba(163,113,247,0.25), rgba(163,113,247,0) 70%)', pointerEvents:'none', transform:'translate(-100px,-100px)', zIndex:5}} />
    </div>
  )
}


