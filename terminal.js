// Terminal-like interface for Sudhanshu Kumar's DevOps Portfolio

document.addEventListener('DOMContentLoaded', () => {
    // Create terminal overlay with improved opacity and z-index
    const terminalOverlay = document.createElement('div');
    terminalOverlay.className = 'terminal-overlay';
    terminalOverlay.style.opacity = '1';
    terminalOverlay.style.zIndex = '10000'; // Ensure it's on top
    document.body.appendChild(terminalOverlay);
    
    // Create terminal container with improved visibility
    const terminal = document.createElement('div');
    terminal.className = 'terminal';
    terminal.style.width = '90%';
    terminal.style.maxWidth = '1000px';
    terminal.style.height = '80vh';
    terminal.style.backgroundColor = '#1a1a1a'; // Darker background for better contrast
    terminal.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)'; // More prominent shadow
    terminalOverlay.appendChild(terminal);
    
    // Terminal header with improved styling
    const terminalHeader = document.createElement('div');
    terminalHeader.className = 'terminal-header';
    terminalHeader.style.padding = '12px';
    terminalHeader.style.backgroundColor = '#333333';
    terminalHeader.innerHTML = `
        <div class="terminal-buttons">
            <span class="terminal-button close" style="width: 14px; height: 14px; background-color: #ff5f56;"></span>
            <span class="terminal-button minimize" style="width: 14px; height: 14px; background-color: #ffbd2e;"></span>
            <span class="terminal-button maximize" style="width: 14px; height: 14px; background-color: #27c93f;"></span>
        </div>
        <div class="terminal-title" style="color: #f0f0f0; font-size: 16px; font-weight: bold;">sudhanshu@devops:~</div>
    `;
    terminal.appendChild(terminalHeader);
    
    // Terminal content with improved visibility
    const terminalContent = document.createElement('div');
    terminalContent.className = 'terminal-content';
    terminalContent.style.padding = '20px';
    terminalContent.style.color = '#f0f0f0';
    terminalContent.style.fontSize = '16px';
    terminalContent.style.lineHeight = '1.6';
    terminalContent.style.fontFamily = 'Consolas, monospace';
    terminalContent.style.height = 'calc(100% - 50px)';
    terminalContent.style.overflowY = 'auto';
    terminal.appendChild(terminalContent);
    
    // Add click event to close button
    const closeButton = terminalHeader.querySelector('.terminal-button.close');
    closeButton.addEventListener('click', exitTerminalMode);
    
    // Initial loading animation with more visible text
    let loadingText = 'Initializing DevOps Portfolio';
    let dots = '';
    let loadingInterval;
    
    function updateLoading() {
        dots = dots.length >= 3 ? '' : dots + '.';
        terminalContent.innerHTML = `<div class="command-line" style="color: #61dafb; font-size: 18px; margin-bottom: 15px;">$ ${loadingText}${dots}</div>`;
        
        // Add some "hacker-like" random logs with improved visibility
        if (Math.random() > 0.7) {
            const logs = [
                'Loading Kubernetes configurations...',
                'Initializing Docker containers...',
                'Checking AWS credentials...',
                'Connecting to GCP services...',
                'Verifying Terraform modules...',
                'Running CI/CD pipeline checks...',
                'Scanning infrastructure as code...',
                'Initializing Ray Serve clusters...',
                'Checking Prometheus metrics...',
                'Validating GitOps workflows...'
            ];
            const randomLog = logs[Math.floor(Math.random() * logs.length)];
            const logElement = document.createElement('div');
            logElement.className = 'log-line';
            logElement.style.color = '#8bc34a';
            logElement.style.marginBottom = '8px';
            logElement.style.paddingLeft = '20px';
            logElement.style.fontSize = '14px';
            logElement.textContent = randomLog;
            terminalContent.appendChild(logElement);
        }
    }
    
    // Start loading animation
    loadingInterval = setInterval(updateLoading, 300);
    
    // After 3 seconds, show "Press any key to continue" with improved visibility
    setTimeout(() => {
        clearInterval(loadingInterval);
        
        terminalContent.innerHTML += `
            <div class="command-line success" style="color: #8bc34a; font-size: 18px; margin-bottom: 20px;">Portfolio loaded successfully!</div>
            <div class="prompt" style="color: #ff9800; font-size: 20px; margin: 30px 0; text-align: center; font-weight: bold;">Press any key to continue...</div>
        `;
        
        // Listen for keypress
        document.addEventListener('keydown', showPortfolioMenu);
        // Also allow clicks
        terminalContent.addEventListener('click', showPortfolioMenu);
    }, 3000);
    
    // Hide all sections initially
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Hide header initially
    document.querySelector('header').style.display = 'none';
    
    // Hide footer initially
    document.querySelector('footer').style.display = 'none';
    
    // Portfolio sections for pagination
    const portfolioSections = [
        { id: 'about', title: 'About Me', command: 'cat about.md' },
        { id: 'skills', title: 'Skills', command: 'ls -la skills/' },
        { id: 'projects', title: 'Projects', command: 'find ./projects -type f -name "*.md"' },
        { id: 'experience', title: 'Experience', command: 'grep -r "DevOps" ./experience/' },
        { id: 'education', title: 'Education', command: 'cat education.txt' }
    ];
    
    let currentSectionIndex = -1;
    
    function showPortfolioMenu(event) {
        // Remove event listeners to prevent multiple triggers
        document.removeEventListener('keydown', showPortfolioMenu);
        terminalContent.removeEventListener('click', showPortfolioMenu);
        
        // Show menu with improved styling
        terminalContent.innerHTML = `
            <div class="command-line" style="color: #61dafb; font-size: 18px; margin-bottom: 15px;">$ ls -la portfolio/</div>
            <div class="menu-title" style="color: #ff9800; font-size: 22px; font-weight: bold; margin: 20px 0; text-align: center; border-bottom: 1px solid #555; padding-bottom: 10px;">DevOps Portfolio - Navigation</div>
            <div class="menu" style="margin: 25px 0;">
                ${portfolioSections.map((section, index) => 
                    `<div class="menu-item" data-index="${index}" style="padding: 12px 20px; cursor: pointer; margin-bottom: 10px; border-radius: 5px; transition: all 0.3s ease; font-size: 18px; color: #f0f0f0;">${index + 1}. ${section.title}</div>`
                ).join('')}
            </div>
            <div class="prompt" style="color: #ff9800; font-size: 18px; margin: 30px 0 15px;">Enter section number (1-${portfolioSections.length}) or 'q' to quit terminal mode:</div>
            <div class="command-input" style="display: flex; align-items: center; font-size: 18px; color: #f0f0f0;">$ <span class="cursor" style="display: inline-block; width: 10px; height: 20px; background-color: #f0f0f0; margin-left: 5px;">█</span></div>
        `;
        
        // Add hover effects to menu items
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.backgroundColor = 'rgba(97, 218, 251, 0.2)';
                this.style.transform = 'translateX(10px)';
                this.style.boxShadow = '0 0 10px rgba(97, 218, 251, 0.3)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.backgroundColor = 'transparent';
                this.style.transform = 'translateX(0)';
                this.style.boxShadow = 'none';
            });
        });
        
        // Add blinking cursor effect
        const cursor = document.querySelector('.cursor');
        setInterval(() => {
            cursor.style.visibility = cursor.style.visibility === 'hidden' ? 'visible' : 'hidden';
        }, 500);
        
        // Listen for section selection
        document.addEventListener('keydown', handleMenuSelection);
        
        // Also make menu items clickable
        menuItems.forEach(item => {
            item.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                showSection(index);
            });
        });
    }
    
    function handleMenuSelection(event) {
        // Check if input is a number between 1 and portfolioSections.length
        const keyPressed = event.key;
        const sectionNumber = parseInt(keyPressed);
        
        if (!isNaN(sectionNumber) && sectionNumber >= 1 && sectionNumber <= portfolioSections.length) {
            showSection(sectionNumber - 1);
        } else if (keyPressed.toLowerCase() === 'q') {
            // Exit terminal mode and show full portfolio
            exitTerminalMode();
        }
    }
    
    function showSection(index) {
        // Remove menu selection listener
        document.removeEventListener('keydown', handleMenuSelection);
        
        currentSectionIndex = index;
        const section = portfolioSections[index];
        
        // Show terminal command for this section with improved visibility
        terminalContent.innerHTML = `
            <div class="command-line" style="color: #61dafb; font-size: 18px; margin-bottom: 20px;">$ ${section.command}</div>
            <div class="section-loading" style="color: #ff9800; font-size: 20px; text-align: center; margin-top: 40px;">Loading ${section.title}...</div>
        `;
        
        // Simulate loading with a more visible progress indicator
        const progressBar = document.createElement('div');
        progressBar.style.width = '100%';
        progressBar.style.height = '4px';
        progressBar.style.backgroundColor = '#333';
        progressBar.style.marginTop = '20px';
        progressBar.style.position = 'relative';
        progressBar.style.overflow = 'hidden';
        progressBar.style.borderRadius = '2px';
        terminalContent.appendChild(progressBar);
        
        const progress = document.createElement('div');
        progress.style.position = 'absolute';
        progress.style.left = '0';
        progress.style.top = '0';
        progress.style.height = '100%';
        progress.style.width = '0%';
        progress.style.backgroundColor = '#61dafb';
        progress.style.transition = 'width 0.8s linear';
        progressBar.appendChild(progress);
        
        // Animate progress bar
        setTimeout(() => {
            progress.style.width = '100%';
        }, 100);
        
        // After progress completes, show the section
        setTimeout(() => {
            // Hide terminal overlay smoothly
            terminalOverlay.style.opacity = '0';
            terminalOverlay.style.pointerEvents = 'none';
            
            // Show only the selected section
            sections.forEach(sectionElement => {
                sectionElement.style.display = 'none';
            });
            
            // Show header
            document.querySelector('header').style.display = 'block';
            
            // Show the selected section
            const sectionElement = document.querySelector(`section:nth-of-type(${index + 1})`);
            if (sectionElement) {
                sectionElement.style.display = 'block';
            }
            
            // Show navigation controls
            showNavigationControls();
            
            // Show footer
            document.querySelector('footer').style.display = 'block';
        }, 1000);
    }
    
    function showNavigationControls() {
        // Remove existing nav controls if they exist
        const existingNav = document.querySelector('.portfolio-nav');
        if (existingNav) {
            existingNav.remove();
        }
        
        // Create navigation controls with improved styling
        const navControls = document.createElement('div');
        navControls.className = 'portfolio-nav';
        navControls.style.position = 'fixed';
        navControls.style.bottom = '20px';
        navControls.style.left = '50%';
        navControls.style.transform = 'translateX(-50%)';
        navControls.style.display = 'flex';
        navControls.style.gap = '15px';
        navControls.style.zIndex = '1000';
        
        navControls.innerHTML = `
            <button class="nav-btn prev-btn" ${currentSectionIndex <= 0 ? 'disabled' : ''} 
            style="padding: 10px 20px; border-radius: 5px; border: none; background-color: #343a40; color: #f8f9fa; cursor: pointer; font-weight: bold; transition: all 0.3s ease;">&lt; Previous</button>
            
            <button class="nav-btn terminal-btn" 
            style="padding: 10px 20px; border-radius: 5px; border: none; background-color: #1a1a1a; color: #f0f0f0; cursor: pointer; font-weight: bold; transition: all 0.3s ease;">Terminal</button>
            
            <button class="nav-btn next-btn" ${currentSectionIndex >= portfolioSections.length - 1 ? 'disabled' : ''} 
            style="padding: 10px 20px; border-radius: 5px; border: none; background-color: #343a40; color: #f8f9fa; cursor: pointer; font-weight: bold; transition: all 0.3s ease;">Next &gt;</button>
        `;
        document.body.appendChild(navControls);
        
        // Add hover effects to buttons
        const buttons = navControls.querySelectorAll('.nav-btn:not([disabled])');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                if (!this.hasAttribute('disabled')) {
                    if (this.classList.contains('terminal-btn')) {
                        this.style.backgroundColor = '#333';
                        this.style.boxShadow = '0 0 10px rgba(240, 240, 240, 0.3)';
                    } else {
                        this.style.backgroundColor = '#495057';
                        this.style.boxShadow = '0 0 10px rgba(248, 249, 250, 0.3)';
                    }
                    this.style.transform = 'translateY(-3px)';
                }
            });
            
            button.addEventListener('mouseleave', function() {
                if (!this.hasAttribute('disabled')) {
                    if (this.classList.contains('terminal-btn')) {
                        this.style.backgroundColor = '#1a1a1a';
                    } else {
                        this.style.backgroundColor = '#343a40';
                    }
                    this.style.boxShadow = 'none';
                    this.style.transform = 'translateY(0)';
                }
            });
        });
        
        // Add event listeners
        document.querySelector('.prev-btn').addEventListener('click', showPreviousSection);
        document.querySelector('.next-btn').addEventListener('click', showNextSection);
        document.querySelector('.terminal-btn').addEventListener('click', showTerminal);
    }
    
    function showPreviousSection() {
        if (currentSectionIndex > 0) {
            showTerminal();
            setTimeout(() => showSection(currentSectionIndex - 1), 500);
        }
    }
    
    function showNextSection() {
        if (currentSectionIndex < portfolioSections.length - 1) {
            showTerminal();
            setTimeout(() => showSection(currentSectionIndex + 1), 500);
        }
    }
    
    function showTerminal() {
        // Show terminal overlay with smooth transition
        terminalOverlay.style.opacity = '1';
        terminalOverlay.style.pointerEvents = 'auto';
        
        // Hide all sections
        sections.forEach(section => {
            section.style.display = 'none';
        });
        
        // Hide header
        document.querySelector('header').style.display = 'none';
        
        // Hide footer
        document.querySelector('footer').style.display = 'none';
        
        // Show portfolio menu
        showPortfolioMenu();
    }
    
    function exitTerminalMode() {
        // Hide terminal overlay with smooth transition
        terminalOverlay.style.opacity = '0';
        terminalOverlay.style.pointerEvents = 'none';
        
        // Show all sections
        sections.forEach(section => {
            section.style.display = 'block';
        });
        
        // Show header
        document.querySelector('header').style.display = 'block';
        
        // Show footer
        document.querySelector('footer').style.display = 'block';
        
        // Remove navigation controls
        const navControls = document.querySelector('.portfolio-nav');
        if (navControls) {
            navControls.remove();
        }
    }
    
    // Add 3D animations specifically for terminal elements
    function addTerminal3DEffects() {
        // Make terminal appear with 3D perspective
        terminal.style.transform = 'perspective(1000px) rotateX(5deg) scale(0.98)';
        terminal.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        
        // Add hover effects
        terminal.addEventListener('mouseenter', () => {
            terminal.style.transform = 'perspective(1000px) rotateX(0) scale(1)';
            terminal.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.6)';
        });
        
        terminal.addEventListener('mouseleave', () => {
            terminal.style.transform = 'perspective(1000px) rotateX(5deg) scale(0.98)';
            terminal.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
        });
    }
    
    addTerminal3DEffects();
});