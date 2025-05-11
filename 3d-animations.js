// 3D Animations for Sudhanshu Kumar's Bio Website using Three.js

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Three.js scene
    const canvas = document.getElementById('bg-canvas');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Set camera position
    camera.position.z = 30;
    
    // Create particles for background
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);
    
    // Fill with random positions
    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 50;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    // Create material based on theme
    const getParticleMaterial = () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const color = isDark ? 0x61dafb : 0x0366d6;
        return new THREE.PointsMaterial({
            size: 0.1,
            color: color,
            transparent: true,
            opacity: 0.8
        });
    };
    
    let particlesMaterial = getParticleMaterial();
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    // Update particles on theme change
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', () => {
        setTimeout(() => {
            scene.remove(particlesMesh);
            particlesMaterial = getParticleMaterial();
            const updatedParticlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
            scene.add(updatedParticlesMesh);
            particlesMesh = updatedParticlesMesh;
        }, 500); // Wait for theme transition
    });
    
    // Animation loop
    const animate = () => {
        requestAnimationFrame(animate);
        
        particlesMesh.rotation.x += 0.0005;
        particlesMesh.rotation.y += 0.0005;
        
        renderer.render(scene, camera);
    };
    
    animate();
    
    // Add 3D effects to DOM elements
    add3DEffectsToElements();
});

// Function to add 3D effects to DOM elements
function add3DEffectsToElements() {
    // 3D effect for profile image
    const profileImg = document.querySelector('.profile-img');
    profileImg.style.animation = 'float 6s ease-in-out infinite';
    
    // Add mouse movement parallax effect to profile image
    const profileContainer = document.querySelector('.profile-img-container');
    document.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
        profileImg.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });
    
    // Reset on mouse leave
    document.addEventListener('mouseleave', () => {
        profileImg.style.transform = 'rotateY(0) rotateX(0)';
    });
    
    // Add 3D flip effect to project cards
    const projectCards = document.querySelectorAll('.project');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) rotateX(5deg) rotateY(5deg)';
            card.style.boxShadow = '0 15px 30px var(--card-shadow-hover)';
            card.style.borderLeft = '3px solid var(--border-color)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
            card.style.boxShadow = '0 1px 3px var(--card-shadow)';
            card.style.borderLeft = '3px solid transparent';
        });
    });
    
    // Add 3D effect to skill tags
    const skillTags = document.querySelectorAll('.skill');
    skillTags.forEach((tag, index) => {
        // Add staggered animation
        setTimeout(() => {
            tag.style.animation = 'pulse3D 3s ease infinite';
            tag.style.animationDelay = `${index * 0.1}s`;
        }, index * 100);
        
        // Add interactive 3D effect on hover
        tag.addEventListener('mouseenter', () => {
            tag.style.animation = 'none';
            tag.style.transform = 'scale(1.2) rotateY(15deg)';
            tag.style.boxShadow = '0 10px 20px var(--card-shadow-hover)';
            tag.style.backgroundColor = 'var(--skill-hover)';
            tag.style.zIndex = '10';
        });
        
        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'scale(1) rotateY(0)';
            tag.style.boxShadow = 'none';
            tag.style.backgroundColor = 'var(--skill-bg)';
            tag.style.zIndex = '1';
            tag.style.animation = 'pulse3D 3s ease infinite';
            tag.style.animationDelay = `${index * 0.1}s`;
        });
    });
    
    // Add 3D effect to section headings
    const sectionHeadings = document.querySelectorAll('section h2');
    sectionHeadings.forEach(heading => {
        heading.style.animation = 'swing 5s ease infinite';
        heading.style.transformOrigin = 'left';
    });
    
    // Add 3D flip-in animation for social links
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach((link, index) => {
        link.style.opacity = '0';
        link.style.animation = 'flipIn 0.5s ease forwards';
        link.style.animationDelay = `${1.5 + (index * 0.2)}s`;
        
        // Add hover effect
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-5px) rotateY(15deg)';
            link.style.color = 'var(--link-hover)';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0) rotateY(0)';
            link.style.color = 'var(--link-color)';
        });
    });
}