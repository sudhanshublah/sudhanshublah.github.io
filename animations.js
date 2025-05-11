// Animations for Sudhanshu Kumar's Bio Website

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Page reload animation
    const body = document.querySelector('body');
    body.style.opacity = '0';
    body.style.transition = 'opacity 0.8s ease';
    
    setTimeout(() => {
        body.style.opacity = '1';
    }, 100);
    
    // Fade in header elements one by one
    const headerElements = document.querySelectorAll('header > *');
    headerElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 300 * index + 300); // Start after body fade-in
    });
    
    // Animate section headings when they come into view
    const sectionHeadings = document.querySelectorAll('section h2');
    
    const fadeInOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
                
                // Subtle color transition for headings
                const heading = entry.target;
                heading.style.transition = 'color 1.5s ease';
                
                setTimeout(() => {
                    heading.style.color = '#0366d6';
                    
                    setTimeout(() => {
                        heading.style.color = '#333';
                    }, 1500);
                }, 300);
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
    
    // Add hover effects to skill tags with subtle color transitions
    const skillTags = document.querySelectorAll('.skill');
    skillTags.forEach(tag => {
        tag.style.transition = 'transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease';
        
        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'scale(1.1)';
            tag.style.backgroundColor = '#e0e0e0';
            tag.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        });
        
        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'scale(1)';
            tag.style.backgroundColor = '#f1f1f1';
            tag.style.boxShadow = 'none';
        });
    });
    
    // Animate project cards on scroll with subtle color transitions
    const projectCards = document.querySelectorAll('.project');
    
    const fadeInProjects = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                card.classList.add('visible');
                observer.unobserve(card);
                
                // Subtle border color animation
                setTimeout(() => {
                    card.style.borderLeft = '3px solid #0366d6';
                    
                    setTimeout(() => {
                        card.style.borderLeft = '3px solid transparent';
                    }, 1500);
                }, 500);
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
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease, border-left 0.5s ease';
        card.style.transitionDelay = `${index * 0.1}s`;
        projectObserver.observe(card);
    });
    
    // Add refresh/reload animation button
    const footer = document.querySelector('footer');
    const refreshButton = document.createElement('button');
    refreshButton.textContent = '↻ Refresh Animations';
    refreshButton.className = 'refresh-button';
    refreshButton.addEventListener('click', () => {
        // Create overlay for reload animation
        const overlay = document.createElement('div');
        overlay.className = 'reload-overlay';
        document.body.appendChild(overlay);
        
        // Animate overlay
        setTimeout(() => {
            overlay.style.opacity = '1';
            
            setTimeout(() => {
                // Reset animations
                headerElements.forEach((element, index) => {
                    element.style.opacity = '0';
                    element.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    }, 300 * index);
                });
                
                // Fade out overlay
                overlay.style.opacity = '0';
                
                setTimeout(() => {
                    overlay.remove();
                }, 500);
                
                // Reset project cards
                projectCards.forEach((card, index) => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                        
                        // Subtle border color animation
                        setTimeout(() => {
                            card.style.borderLeft = '3px solid #0366d6';
                            
                            setTimeout(() => {
                                card.style.borderLeft = '3px solid transparent';
                            }, 1000);
                        }, 300);
                    }, 300 * index + 500);
                });
                
                // Animate section headings with color
                sectionHeadings.forEach((heading, index) => {
                    heading.style.opacity = '0';
                    heading.style.transform = 'translateX(-20px)';
                    heading.style.color = '#333';
                    
                    setTimeout(() => {
                        heading.style.opacity = '1';
                        heading.style.transform = 'translateX(0)';
                        
                        setTimeout(() => {
                            heading.style.color = '#0366d6';
                            
                            setTimeout(() => {
                                heading.style.color = '#333';
                            }, 1000);
                        }, 300);
                    }, 300 * index + 800);
                });
                
            }, 500);
        }, 10);
    });
    footer.appendChild(refreshButton);
});

// Update the CSS for animations directly to the document with better background colors
document.head.insertAdjacentHTML('beforeend', `
<style>
.visible {
    opacity: 1 !important;
    transform: translateY(0) !important;
    transform: translateX(0) !important;
}

body {
    background-color: #f8f9fa;
}

.project, .experience, .education {
    transition: transform 0.3s ease, box-shadow 0.3s ease, border-left 0.5s ease;
    border-left: 3px solid transparent;
    background-color: #ffffff;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.project:hover, .experience:hover, .education:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    border-left: 3px solid #0366d6;
}

.profile-img {
    transition: transform 0.5s ease, box-shadow 0.5s ease;
}

.profile-img:hover {
    transform: scale(1.05);
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
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
    transition: transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease;
    background-color: #e9ecef;
}

.skill:hover {
    background-color: #dee2e6;
}

.refresh-button {
    background-color: #e9ecef;
    border: none;
    padding: 8px 15px;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 20px;
    transition: background-color 0.3s ease, transform 0.3s ease;
    font-family: inherit;
}

.refresh-button:hover {
    background-color: #dee2e6;
    transform: scale(1.05);
}

.refresh-button:active {
    transform: scale(0.95);
}

.reload-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(3, 102, 214, 0.05);
    opacity: 0;
    transition: opacity 0.5s ease;
    pointer-events: none;
    z-index: 1000;
}

/* Subtle color pulse animation for skills */
@keyframes colorPulse {
    0% { background-color: #e9ecef; }
    50% { background-color: #cfe2ff; }
    100% { background-color: #e9ecef; }
}

/* Apply color pulse to random skills on page load */
.skill.pulse {
    animation: colorPulse 3s ease infinite;
}

/* Subtle border animation for sections */
@keyframes borderPulse {
    0% { border-left-color: transparent; }
    50% { border-left-color: #0366d6; }
    100% { border-left-color: transparent; }
}

section {
    border-left: 3px solid transparent;
    padding-left: 15px;
    margin-left: -18px;
    background-color: transparent;
}

section.pulse {
    animation: borderPulse 4s ease infinite;
}

section h2 {
    color: #212529;
}
</style>
`);

// Additional script to randomly apply pulse animations to skills
document.addEventListener('DOMContentLoaded', () => {
    // Apply pulse animation to random skills
    const skills = document.querySelectorAll('.skill');
    skills.forEach(skill => {
        if (Math.random() > 0.7) { // 30% chance to get the animation
            skill.classList.add('pulse');
        }
    });
    
    // Apply pulse animation to random sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        // Stagger the animations
        setTimeout(() => {
            section.classList.add('pulse');
            // Remove after one cycle
            setTimeout(() => {
                section.classList.remove('pulse');
            }, 4000);
        }, index * 1000);
    });
});