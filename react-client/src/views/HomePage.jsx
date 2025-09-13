export default function HomePage() {
  const features = [
    { title: 'Always Open Source', description: 'This entire platform is public. Contribute, fork, or just browse the code.', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
    ) },
    { title: 'Community Driven', description: 'All news and resources are curated and submitted by a community of tech enthusiasts.', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
    ) },
    { title: 'Blazing Fast', description: 'No heavy frameworks or backend. Just pure HTML, CSS, and JS for a speedy experience.', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
    ) },
    { title: 'Easy to Contribute', description: 'Updating content is as simple as editing a JSON file. No complex setup required.', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg>
    ) },
  ]

  return (
    <>
      <section className="text-center py-12 md:py-20">
        <h1 className="font-jakarta text-4xl sm:text-5xl md:text-7xl font-extrabold mb-4 tracking-tighter text-white/90">
          The Tech News <br /> You Need to Know.
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8">
          Curated articles on AI, Startups, and Development. <br /> Straight to the point, no fluff.
        </p>
        <a href="/about" className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300">About Us</a>
      </section>

      <section id="about" className="py-12 md:py-20 scroll-mt-16">
        <div id="features-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto border-t border-l border-gray-800">
          {features.map((feature, index) => (
            <div key={feature.title} className="feature-card border-r border-b border-gray-800">
              <div className={`feature-gradient ${index < 4 ? 'bg-gradient-to-t' : 'bg-gradient-to-b'} from-gray-800 to-transparent`}></div>
              <div className="feature-icon">{feature.icon}</div>
              <div className="feature-title-container">
                <div className="feature-title-bar"></div>
                <span className="feature-title">{feature.title}</span>
              </div>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}


