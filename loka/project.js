// ============================================
// PROJECTS DATA
// ============================================

const projectsData = [
    {
        id: 1,
        title: 'AI Medical Diagnosis System',
        category: 'medical',
        technologies: ['Python', 'AI', 'Machine Learning', 'Data Science'],
        description: 'Advanced AI system for early detection of diseases using machine learning algorithms.',
        image: 'assets/images/projects/medical-ai.jpg',
        github: 'https://github.com/malak/medical-ai',
        demo: 'https://medical-ai-demo.com',
        details: {
            overview: 'A machine learning system that analyzes medical data to detect diseases early.',
            problem: 'Delayed diagnosis of diseases leading to worse outcomes.',
            solution: 'AI model trained on large medical datasets for accurate early detection.',
            features: ['Early Detection', 'High Accuracy', 'User-Friendly Interface', 'Real-time Analysis']
        }
    },
    {
        id: 2,
        title: 'Flutter E-Commerce App',
        category: 'mobile',
        technologies: ['Flutter', 'Dart', 'Firebase', 'Stripe'],
        description: 'Full-featured cross-platform e-commerce mobile application with real-time updates.',
        image: 'assets/images/projects/ecommerce.jpg',
        github: 'https://github.com/malak/ecommerce-flutter',
        demo: 'https://ecommerce-demo.com',
        details: {
            overview: 'A complete e-commerce solution built with Flutter for iOS and Android.',
            problem: 'Need for a user-friendly, cross-platform shopping experience.',
            solution: 'Built with Flutter for native performance on both platforms.',
            features: ['Product Catalog', 'Shopping Cart', 'Payment Integration', 'Real-time Updates']
        }
    },
    {
        id: 3,
        title: 'Smart Agriculture IoT System',
        category: 'agriculture',
        technologies: ['IoT', 'Python', 'Arduino', 'Data Analytics'],
        description: 'IoT-based smart farming system for monitoring and optimizing crop growth.',
        image: 'assets/images/projects/agriculture.jpg',
        github: 'https://github.com/malak/smart-agriculture',
        demo: null,
        details: {
            overview: 'IoT system that monitors soil conditions and automates irrigation.',
            problem: 'Water waste and inefficient farming practices.',
            solution: 'Smart sensors and automated irrigation based on real-time data.',
            features: ['Soil Monitoring', 'Automated Irrigation', 'Data Analytics', 'Mobile Alerts']
        }
    },
    {
        id: 4,
        title: 'Biomedical Signal Processing',
        category: 'medical',
        technologies: ['Python', 'Signal Processing', 'AI', 'Biomedical'],
        description: 'Processing and analyzing biomedical signals for health monitoring applications.',
        image: 'assets/images/projects/biomedical.jpg',
        github: 'https://github.com/malak/biomedical-signal',
        demo: null,
        details: {
            overview: 'Processing ECG and other biomedical signals for health monitoring.',
            problem: 'Need for accurate analysis of biomedical signals.',
            solution: 'Advanced signal processing algorithms with AI integration.',
            features: ['Signal Filtering', 'Feature Extraction', 'Health Monitoring', 'Real-time Analysis']
        }
    },
    {
        id: 5,
        title: 'Portfolio Website',
        category: 'web',
        technologies: ['HTML', 'CSS', 'JavaScript', 'GitHub Pages'],
        description: 'Professional portfolio website showcasing projects and skills.',
        image: 'assets/images/projects/portfolio.jpg',
        github: 'https://github.com/malak/portfolio',
        demo: 'https://malak-portfolio.com',
        details: {
            overview: 'A professional portfolio website for showcasing work and skills.',
            problem: 'Need for an online presence for professional opportunities.',
            solution: 'Built a responsive, modern portfolio with interactive features.',
            features: ['Responsive Design', 'Dark Mode', 'Project Search', 'Interactive UI']
        }
    },
    {
        id: 6,
        title: 'AI Chatbot Assistant',
        category: 'ai',
        technologies: ['Python', 'NLP', 'TensorFlow', 'Flask'],
        description: 'Intelligent chatbot for customer service and information retrieval.',
        image: 'assets/images/projects/chatbot.jpg',
        github: 'https://github.com/malak/ai-chatbot',
        demo: 'https://chatbot-demo.com',
        details: {
            overview: 'NLP-based chatbot for automated customer service.',
            problem: 'High volume of customer queries requiring automation.',
            solution: 'Built a deep learning model for natural language understanding.',
            features: ['Natural Language Processing', 'Contextual Responses', 'Multi-language Support']
        }
    }
];

// ============================================
// RENDER PROJECTS
// ============================================

function renderProjects(projects = projectsData) {
    const container = document.getElementById('projectsContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (projects.length === 0) {
        container.innerHTML = `
            <div class="no-projects">
                <i class="fas fa-search"></i>
                <p>No projects found matching your search.</p>
            </div>
        `;
        return;
    }
    
    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card fade-in';
        card.dataset.category = project.category;
        
        card.innerHTML = `
            <img src="${project.image}" alt="${project.title}" loading="lazy" />
            <div class="card-body">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="tech-tags">
                    ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                </div>
                <div class="card-actions">
                    <button class="btn btn-details" onclick="openProjectDetails(${project.id})">
                        <i class="fas fa-eye"></i> Details
                    </button>
                    ${project.github ? `<a href="${project.github}" target="_blank" class="btn btn-github"><i class="fab fa-github"></i> GitHub</a>` : ''}
                    ${project.demo ? `<a href="${project.demo}" target="_blank" class="btn btn-github"><i class="fas fa-external-link-alt"></i> Demo</a>` : ''}
                </div>
            </div>
        `;
        
        container.appendChild(card);
    });
}
// ============================================
// FILTER PROJECTS (Continued)
// ============================================

function filterProjects(category) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    const activeBtn = document.querySelector(`.filter-btn[data-filter="${category}"]`);
    if (activeBtn) activeBtn.classList.add('active');
    
    if (category === 'all') {
        renderProjects(projectsData);
        return;
    }
    
    const filtered = projectsData.filter(p => p.category === category);
    renderProjects(filtered);
}

// ============================================
// SEARCH PROJECTS
// ============================================

function searchProjects(query) {
    if (!query.trim()) {
        renderProjects(projectsData);
        return;
    }
    
    const lowerQuery = query.toLowerCase().trim();
    const results = projectsData.filter(p => 
        p.title.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery) ||
        p.technologies.some(t => t.toLowerCase().includes(lowerQuery)) ||
        p.category.toLowerCase().includes(lowerQuery)
    );
    
    renderProjects(results);
}

// ============================================
// OPEN PROJECT DETAILS (Modal)
// ============================================

function openProjectDetails(id) {
    const project = projectsData.find(p => p.id === id);
    if (!project) return;
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'project-modal';
    modal.id = 'projectModal';
    
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closeProjectModal()"></div>
        <div class="modal-content">
            <button class="modal-close" onclick="closeProjectModal()">
                <i class="fas fa-times"></i>
            </button>
            
            <div class="modal-header">
                <h2>${project.title}</h2>
                <div class="modal-tech">
                    ${project.technologies.map(t => `<span>${t}</span>`).join('')}
                </div>
            </div>
            
            <div class="modal-body">
                <img src="${project.image}" alt="${project.title}" />
                
                <div class="modal-section">
                    <h3>📋 Project Overview</h3>
                    <p>${project.details.overview}</p>
                </div>
                
                <div class="modal-section">
                    <h3>⚠️ Problem</h3>
                    <p>${project.details.problem}</p>
                </div>
                
                <div class="modal-section">
                    <h3>💡 Solution</h3>
                    <p>${project.details.solution}</p>
                </div>
                
                <div class="modal-section">
                    <h3>⭐ Key Features</h3>
                    <ul>
                        ${project.details.features.map(f => `<li>${f}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="modal-actions">
                    ${project.github ? `<a href="${project.github}" target="_blank" class="btn btn-primary"><i class="fab fa-github"></i> View on GitHub</a>` : ''}
                    ${project.demo ? `<a href="${project.demo}" target="_blank" class="btn btn-outline"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : ''}
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Add animation
    setTimeout(() => {
        modal.querySelector('.modal-content').style.transform = 'scale(1)';
        modal.querySelector('.modal-content').style.opacity = '1';
    }, 50);
}

// ============================================
// CLOSE PROJECT MODAL
// ============================================

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    if (modal) {
        const content = modal.querySelector('.modal-content');
        content.style.transform = 'scale(0.9)';
        content.style.opacity = '0';
        
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// ============================================
// EVENT LISTENERS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initial render
    renderProjects(projectsData);
    
    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.filter;
            filterProjects(category);
        });
    });
    
    // Search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            searchProjects(this.value);
        });
    }
});

// ============================================
// MODAL CLOSE ON ESCAPE
// ============================================

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeProjectModal();
    }
});