import { useEffect, useMemo, useState } from 'react'

function PostCard({ post }) {
  const formattedDate = useMemo(() => new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), [post.date])
  return (
    <a href={post.link} target="_blank" rel="noopener noreferrer" className="glassmorphism-card relative flex flex-col overflow-hidden">
      <div className="card-image-container">
        {post.image ? (
          <img src={post.image} alt={post.title} className="card-image" onError={(e) => { e.currentTarget.parentElement.style.display = 'none' }} />
        ) : null}
      </div>
      <div className="card-content">
        <h3 className="card-title">{post.title}</h3>
        {post.description ? <p className="card-description">{post.description}</p> : <div className="flex-grow"></div>}
        <p className="card-date">{formattedDate}</p>
      </div>
    </a>
  )
}

export default function CategoryPage({ category }) {
  const [allPosts, setAllPosts] = useState([])
  const [query, setQuery] = useState('')
  const title = useMemo(() => category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), [category])

  useEffect(() => {
    let cancelled = false
    fetch(`/data/${category}.json`)
      .then(r => r.json())
      .then(data => {
        if (cancelled) return
        const sorted = [...data].sort((a, b) => new Date(b.date) - new Date(a.date))
        setAllPosts(sorted)
      })
      .catch(() => setAllPosts([]))
    return () => { cancelled = true }
  }, [category])

  const posts = useMemo(() => {
    if (!query) return allPosts
    const q = query.toLowerCase()
    return allPosts.filter(post => {
      const formattedDate = new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      return (
        post.title.toLowerCase().includes(q) ||
        (post.date || '').includes(q) ||
        formattedDate.toLowerCase().includes(q)
      )
    })
  }, [allPosts, query])

  return (
    <>
      <section className="text-center pt-12 md:pt-20">
        <h1 className="font-jakarta text-4xl sm:text-5xl md:text-7xl font-extrabold mb-12 tracking-tighter text-white/90">{title}</h1>
        <div className="max-w-xl mx-auto mb-12">
          <div className="search-container flex items-center rounded-full p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mx-3 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" placeholder="Search in this category..." className="search-input w-full h-full text-base sm:text-lg" value={query} onChange={(e) => setQuery(e.target.value)} />
            <button className="search-button text-white font-semibold py-2 px-4 sm:px-6 rounded-full text-sm sm:text-base">Search</button>
          </div>
        </div>
      </section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.length === 0 ? (
          <p className="text-center text-gray-400">No posts found.</p>
        ) : (
          posts.map((post) => <PostCard key={post.id || post.link} post={post} />)
        )}
      </div>
    </>
  )
}


