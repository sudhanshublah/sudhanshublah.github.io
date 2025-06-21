// Animations for Sudhanshu Kumar's Bio Website

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Dark mode functionality
    const htmlElement = document.documentElement;
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = document.querySelector('.theme-toggle-icon');
    
    // Function to set theme
    function setTheme(theme) {
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
        
        // Add 3D rotation effect during theme change
        document.body.style.transition = 'all 0.5s ease';
        document.body.style.transform = 'rotateY(5deg)';
        
        setTimeout(() => {
            document.body.style.transform = 'rotateY(0)';
        }, 500);
    }
    
    // Check for saved theme preference or use time-based default
    function getInitialTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme;
        }
        
        // Get current hour in user's timezone
        const currentHour = new Date().getHours();
        // Set dark mode between 7 PM (19) and 7 AM (7)
        return (currentHour >= 19 || currentHour < 7) ? 'dark' : 'light';
    }
    
    // Initialize theme
    setTheme(getInitialTheme());
    
    // Toggle theme when button is clicked
    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        // Add 3D transition animation
        themeIcon.style.transform = 'rotate(360deg) scale(1.2)';
        
        // Set the new theme
        setTheme(newTheme);
        
        // Reset rotation after transition
        setTimeout(() => {
            themeIcon.style.transform = 'rotate(0) scale(1)';
        }, 500);
    });
    
    // Page reload animation with 3D effect
    const body = document.querySelector('body');
    body.style.opacity = '0';
    body.style.transform = 'rotateX(5deg)';
    body.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    
    setTimeout(() => {
        body.style.opacity = '1';
        body.style.transform = 'rotateX(0)';
    }, 100);
    
    // Fade in header elements one by one with 3D effects
    const headerElements = document.querySelectorAll('header > *');
    headerElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px) rotateX(10deg)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0) rotateX(0)';
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
                    heading.style.color = 'var(--link-color)';
                    
                    setTimeout(() => {
                        heading.style.color = 'var(--heading-color)';
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
            tag.style.backgroundColor = 'var(--skill-hover)';
            tag.style.boxShadow = '0 2px 5px var(--card-shadow)';
        });
        
        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'scale(1)';
            tag.style.backgroundColor = 'var(--skill-bg)';
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
                    card.style.borderLeft = '3px solid var(--border-color)';
                    
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
    
    // Add refresh/reload animation button with 3D effect
    const footer = document.querySelector('footer');
    const refreshButton = document.createElement('button');
    refreshButton.textContent = '↻ Refresh Animations';
    refreshButton.className = 'refresh-button';
    refreshButton.addEventListener('click', () => {
        // Create overlay for reload animation
        const overlay = document.createElement('div');
        overlay.className = 'reload-overlay';
        document.body.appendChild(overlay);
        
        // Add 3D rotation to entire page during refresh
        document.body.style.transition = 'transform 0.5s ease';
        document.body.style.transformOrigin = 'center';
        document.body.style.transform = 'rotateY(5deg)';
        
        // Animate overlay
        setTimeout(() => {
            overlay.style.opacity = '1';
            
            setTimeout(() => {
                // Reset animations with 3D effects
                headerElements.forEach((element, index) => {
                    element.style.opacity = '0';
                    element.style.transform = 'translateY(20px) rotateX(10deg)';
                    
                    setTimeout(() => {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0) rotateX(0)';
                    }, 300 * index);
                });
                
                // Reset body transform
                document.body.style.transform = 'rotateY(0)';
                
                // Fade out overlay
                overlay.style.opacity = '0';
                
                setTimeout(() => {
                    overlay.remove();
                }, 500);
                
                // Reset other elements with 3D effects
                projectCards.forEach((card, index) => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                        
                        // Subtle border color animation
                        setTimeout(() => {
                            card.style.borderLeft = '3px solid var(--border-color)';
                            
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
                    heading.style.color = 'var(--heading-color)';
                    
                    setTimeout(() => {
                        heading.style.opacity = '1';
                        heading.style.transform = 'translateX(0)';
                        
                        setTimeout(() => {
                            heading.style.color = 'var(--link-color)';
                            
                            setTimeout(() => {
                                heading.style.color = 'var(--heading-color)';
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

.project, .experience, .education {
    transition: transform 0.5s cubic-bezier(0.4,0,0.2,1), box-shadow 0.5s cubic-bezier(0.4,0,0.2,1), border-left 0.5s cubic-bezier(0.4,0,0.2,1);
    border-left: 3px solid transparent;
    background-color: var(--card-bg);
    box-shadow: 0 1px 3px var(--card-shadow);
}

.project:hover, .experience:hover, .education:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px var(--card-shadow-hover);
    border-left: 3px solid var(--border-color);
}

.profile-img {
    transition: transform 0.6s cubic-bezier(0.4,0,0.2,1), box-shadow 0.6s cubic-bezier(0.4,0,0.2,1);
}

.profile-img:hover {
    transform: scale(1.05);
    box-shadow: 0 5px 15px var(--card-shadow-hover);
}

.social-links a {
    transition: color 0.3s ease, transform 0.3s ease;
    display: inline-block;
}

.social-links a:hover {
    color: var(--link-hover);
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
    background-color: var(--skill-bg);
}

.skill:hover {
    background-color: var(--skill-hover);
}

.refresh-button {
    background-color: var(--button-bg);
    color: var(--text-color);
    border: none;
    padding: 8px 15px;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 20px;
    transition: background-color 0.3s ease, transform 0.3s ease;
    font-family: inherit;
}

.refresh-button:hover {
    background-color: var(--button-hover);
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
    background-color: rgba(var(--border-color), 0.05);
    opacity: 0;
    transition: opacity 0.5s ease;
    pointer-events: none;
    z-index: 1000;
}

/* Subtle color pulse animation for skills */
@keyframes colorPulse {
    0% { background-color: var(--skill-bg); }
    50% { background-color: var(--skill-hover); }
    100% { background-color: var(--skill-bg); }
}

/* Apply color pulse to random skills on page load */
.skill.pulse {
    animation: colorPulse 3s ease infinite;
}

/* Subtle border animation for sections */
@keyframes borderPulse {
    0% { border-left-color: transparent; }
    50% { border-left-color: var(--border-color); }
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

/* Dark mode transition */
html {
    transition: background-color 0.5s ease;
}

/* Theme toggle button animation */
@keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

.theme-toggle-icon {
    display: inline-block;
}

.theme-toggle:hover .theme-toggle-icon {
    animation: rotate 1s ease;
}

/* Pop-in animation for section headings */
@keyframes popIn {
    0% { opacity: 0; transform: scale(0.8) translateY(20px);}
    80% { opacity: 1; transform: scale(1.05) translateY(0);}
    100% { opacity: 1; transform: scale(1) translateY(0);}
}

section h2 {
    opacity: 0;
    animation: popIn 0.8s cubic-bezier(0.4,0,0.2,1) forwards;
}
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
    
    // Check for time-based theme changes every hour
    setInterval(() => {
        // Only change theme automatically if user hasn't manually set it
        if (!localStorage.getItem('theme')) {
            const currentHour = new Date().getHours();
            const shouldBeDark = (currentHour >= 19 || currentHour < 7);
            const currentTheme = document.documentElement.getAttribute('data-theme');
            
            if ((shouldBeDark && currentTheme !== 'dark') || (!shouldBeDark && currentTheme !== 'light')) {
                // Smoothly transition to the new theme
                const newTheme = shouldBeDark ? 'dark' : 'light';
                document.documentElement.setAttribute('data-theme', newTheme);
                document.querySelector('.theme-toggle-icon').textContent = newTheme === 'dark' ? '🌙' : '☀️';
            }
        }
    }, 60 * 60 * 1000); // Check every hour

    // Fade in section headings with pop-in animation
    document.querySelectorAll('section h2').forEach((heading, i) => {
        setTimeout(() => {
            heading.style.opacity = '1';
            heading.style.animation = 'popIn 0.8s cubic-bezier(0.4,0,0.2,1) forwards';
        }, 400 + i * 200);
    });
});

// Additional global styles
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 1s cubic-bezier(0.4,0,0.2,1)';
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
