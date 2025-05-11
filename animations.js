// Animations for Sudhanshu Kumar's Bio Website

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Fade in header elements one by one
    const headerElements = document.querySelectorAll('header > *');
    headerElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 300 * index);
    });
    
    // Animate section headings when they come into view
    const sectionHeadings = document.querySelectorAll('section h2');
    
    const fadeInOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    };
    
    const headingObserver = new IntersectionObserver(fadeInOnScroll, {
        root: null,
        threshold: 0.1
    });
    
    sectionHeadings.forEach(heading => {
        heading.style.opacity = '0';
        heading.style.transform = 'translateX(-20px)';
        heading.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        headingObserver.observe(heading);
    });
    
    // Add hover effects to skill tags
    const skillTags = document.querySelectorAll('.skill');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'scale(1.1)';
            tag.style.backgroundColor = '#e0e0e0';
        });
        
        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'scale(1)';
            tag.style.backgroundColor = '#f1f1f1';
        });
    });
    
    // Animate project cards on scroll
    const projectCards = document.querySelectorAll('.project');
    
    const fadeInProjects = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    };
    
    const projectObserver = new IntersectionObserver(fadeInProjects, {
        root: null,
        threshold: 0.1
    });
    
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        card.style.transitionDelay = `${index * 0.1}s`;
        projectObserver.observe(card);
    });
});

// Add CSS class for elements that become visible
document.head.insertAdjacentHTML('beforeend', `
<style>
.visible {
    opacity: 1 !important;
    transform: translateY(0) !important;
    transform: translateX(0) !important;
}

.project, .experience, .education {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.project:hover, .experience:hover, .education:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.profile-img {
    transition: transform 0.5s ease;
}

.profile-img:hover {
    transform: scale(1.05);
}

.social-links a {
    transition: color 0.3s ease, transform 0.3s ease;
    display: inline-block;
}

.social-links a:hover {
    color: #0056b3;
    transform: translateY(-3px);
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

@keyframes slideIn {
    from { transform: translateX(-20px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

.skill {
    transition: transform 0.3s ease, background-color 0.3s ease;
}
</style>
`);