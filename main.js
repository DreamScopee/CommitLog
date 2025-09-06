document.addEventListener('DOMContentLoaded', () => {
    const floatingDockContainer = document.getElementById('floating-dock');
    const interactiveOrb = document.getElementById('interactive-orb');
    const body = document.body;
    const pageType = body.getAttribute('data-page');

    let curX = 0, curY = 0, tgX = 0, tgY = 0;
    function move() {
        curX += (tgX - curX) / 20;
        curY += (tgY - curY) / 20;
        if (interactiveOrb) {
            interactiveOrb.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
        }
        requestAnimationFrame(move);
    }
    window.addEventListener('mousemove', (event) => {
        tgX = event.clientX;
        tgY = event.clientY;
    });
    move();

    const categories = ['startups', 'ai', 'developers', 'agents', 'programming-languages'];
    const categoryIcons = {
        'startups': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 19.5l15-15m-10.5 0l10.5 10.5m-4.5-15h6v6m-12 6v6h6"/></svg>`,
        'ai': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 0 0-10 10c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69a3.6 3.6 0 0 1 .1-2.64s.84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.37.2 2.4.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.72c0 .27.16.59.67.5A10 10 0 0 0 12 2z"/></svg>`,
        'developers': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`,
        'agents': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0l-2.5 5H6.5L4 16"/></svg>`,
        'programming-languages': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>`
    };

    function renderFloatingDock() {
        const dockLinks = [
            { title: 'Home', href: 'index.html', icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>` },
            ...categories.map(cat => ({
                title: cat.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                href: `${cat}.html`,
                icon: categoryIcons[cat]
            }))
        ];
        dockLinks.forEach(link => {
            const item = document.createElement('a');
            item.href = link.href;
            item.className = 'dock-item';
            item.innerHTML = `${link.icon}<span class="dock-title">${link.title}</span>`;
            floatingDockContainer.appendChild(item);
        });
        const dockItems = floatingDockContainer.querySelectorAll('.dock-item');
        floatingDockContainer.addEventListener('mousemove', (e) => {
            const dockRect = floatingDockContainer.getBoundingClientRect();
            const mouseX = e.clientX - dockRect.left;
            dockItems.forEach(item => {
                const itemRect = item.getBoundingClientRect();
                const itemCenterX = itemRect.left + itemRect.width / 2 - dockRect.left;
                const distance = Math.abs(mouseX - itemCenterX);
                const maxDistance = 150;
                const scale = Math.max(1, 1.4 - distance / maxDistance);
                item.style.transform = `scale(${scale})`;
                item.style.transition = 'transform 0.1s';
            });
        });
        floatingDockContainer.addEventListener('mouseleave', () => {
            dockItems.forEach(item => { item.style.transform = 'scale(1)'; item.style.transition = 'transform 0.2s'; });
        });
    }

    if (pageType === 'home') {
        const featuresGrid = document.getElementById('features-grid');
        const features = [
            { title: "Always Open Source", description: "This entire platform is public. Contribute, fork, or just browse the code.", icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>` },
            { title: "Community Driven", description: "All news and resources are curated and submitted by a community of tech enthusiasts.", icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>` },
            { title: "Blazing Fast", description: "No heavy frameworks or backend. Just pure HTML, CSS, and JS for a speedy experience.", icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>` },
            { title: "Easy to Contribute", description: "Updating content is as simple as editing a JSON file. No complex setup required.", icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg>` },
        ];
        features.forEach((feature, index) => {
            const featureCard = document.createElement('div');
            featureCard.className = 'feature-card border-r border-b border-gray-800';
            const gradientDirection = index < 4 ? 'bg-gradient-to-t' : 'bg-gradient-to-b';
            featureCard.innerHTML = `<div class="feature-gradient ${gradientDirection} from-gray-800 to-transparent"></div><div class="feature-icon">${feature.icon}</div><div class="feature-title-container"><div class="feature-title-bar"></div><span class="feature-title">${feature.title}</span></div><p class="feature-description">${feature.description}</p>`;
            featuresGrid.appendChild(featureCard);
        });
    }

    if (pageType === 'category') {
        const postsContainer = document.getElementById('posts-container');
        const searchBar = document.getElementById('search-bar');
        const categoryTitle = document.getElementById('category-title');
        const category = document.body.getAttribute('data-category');
        let allPosts = [];

        async function fetchPosts() {
            try {
                const response = await fetch(`data/${category}.json`);
                allPosts = await response.json();
                allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
                renderPosts();
            } catch (error) {
                console.error("Failed to fetch posts:", error);
                postsContainer.innerHTML = `<p class="text-center text-red-400">Error loading content.</p>`;
            }
        }

        function renderPosts() {
            let postsToRender = allPosts;
            if (searchBar.value) {
                const searchTerm = searchBar.value.toLowerCase();
                postsToRender = allPosts.filter(post => {
                    const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });
                    return post.title.toLowerCase().includes(searchTerm) ||
                           post.date.includes(searchTerm) || 
                           formattedDate.toLowerCase().includes(searchTerm);
                });
            }
            postsContainer.innerHTML = '';
            if (postsToRender.length === 0) {
                postsContainer.innerHTML = '<p class="text-center text-gray-400">No posts found.</p>';
                return;
            }
            postsToRender.forEach((post, index) => {
                const card = createPostCard(post);
                postsContainer.appendChild(card);
            });
        }

        // --- THIS IS THE UPDATED FUNCTION ---
        function createPostCard(post) {
            const card = document.createElement('a');
            card.href = post.link;
            card.target = '_blank';
            card.rel = 'noopener noreferrer';
            card.className = 'glassmorphism-card relative flex flex-col overflow-hidden';

            const formattedDate = new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

            // Create the image container regardless of whether there is an image
            const imageHtml = `
                <div class="card-image-container">
                    ${post.image ? `<img src="${post.image}" alt="${post.title}" class="card-image" onerror="this.parentElement.style.display='none'">` : ''}
                </div>
            `;

            // Check for a description
            const descriptionHtml = post.description
                ? `<p class="card-description">${post.description}</p>`
                : '<div class="flex-grow"></div>'; // Adds an empty spacer if no description

            card.innerHTML = `
                ${imageHtml}
                <div class="card-content">
                    <h3 class="card-title">${post.title}</h3>
                    ${descriptionHtml}
                    <p class="card-date">${formattedDate}</p>
                </div>
            `;
            
            return card;
        }
        
        categoryTitle.textContent = category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        searchBar.addEventListener('input', renderPosts);
        fetchPosts();
    }
    
    renderFloatingDock();
    feather.replace();
});