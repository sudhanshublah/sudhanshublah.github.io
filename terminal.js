// Terminal-like interface for Sudhanshu Kumar's DevOps Portfolio

document.addEventListener('DOMContentLoaded', () => {
    // Create terminal overlay
    const terminalOverlay = document.createElement('div');
    terminalOverlay.className = 'terminal-overlay';
    document.body.appendChild(terminalOverlay);
    
    // Create terminal container
    const terminal = document.createElement('div');
    terminal.className = 'terminal';
    terminalOverlay.appendChild(terminal);
    
    // Terminal header
    const terminalHeader = document.createElement('div');
    terminalHeader.className = 'terminal-header';
    terminalHeader.innerHTML = `
        <div class="terminal-buttons">
            <span class="terminal-button close"></span>
            <span class="terminal-button minimize"></span>
            <span class="terminal-button maximize"></span>
        </div>
        <div class="terminal-title">sudhanshu@devops:~</div>
    `;
    terminal.appendChild(terminalHeader);
    
    // Terminal content
    const terminalContent = document.createElement('div');
    terminalContent.className = 'terminal-content';
    terminal.appendChild(terminalContent);
    
    // Initial loading animation
    let loadingText = 'Initializing DevOps Portfolio';
    let dots = '';
    let loadingInterval;
    
    function updateLoading() {
        dots = dots.length >= 3 ? '' : dots + '.';
        terminalContent.innerHTML = `<div class="command-line">$ ${loadingText}${dots}</div>`;
        
        // Add some "hacker-like" random logs after a few seconds
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
            logElement.textContent = randomLog;
            terminalContent.appendChild(logElement);
        }
    }
    
    // Start loading animation
    loadingInterval = setInterval(updateLoading, 300);
    
    // After 3 seconds, show "Press any key to continue"
    setTimeout(() => {
        clearInterval(loadingInterval);
        
        terminalContent.innerHTML += `
            <div class="command-line success">Portfolio loaded successfully!</div>
            <div class="prompt">Press any key to continue...</div>
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
        
        // Show menu
        terminalContent.innerHTML = `
            <div class="command-line">$ ls -la portfolio/</div>
            <div class="menu-title">DevOps Portfolio - Navigation</div>
            <div class="menu">
                ${portfolioSections.map((section, index) => 
                    `<div class="menu-item" data-index="${index}">${index + 1}. ${section.title}</div>`
                ).join('')}
            </div>
            <div class="prompt">Enter section number (1-${portfolioSections.length}) or 'q' to quit terminal mode:</div>
            <div class="command-input"><span class="cursor">█</span></div>
        `;
        
        // Add blinking cursor effect
        const cursor = document.querySelector('.cursor');
        setInterval(() => {
            cursor.style.visibility = cursor.style.visibility === 'hidden' ? 'visible' : 'hidden';
        }, 500);
        
        // Listen for section selection
        document.addEventListener('keydown', handleMenuSelection);
        
        // Also make menu items clickable
        document.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', () => {
                const index = parseInt(item.getAttribute('data-index'));
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
        
        // Show terminal command for this section
        terminalContent.innerHTML = `
            <div class="command-line">$ ${section.command}</div>
            <div class="section-loading">Loading ${section.title}...</div>
        `;
        
        // Simulate loading
        setTimeout(() => {
            // Hide terminal overlay
            terminalOverlay.style.opacity = '0';
            
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
        // Create navigation controls if they don't exist
        if (!document.querySelector('.portfolio-nav')) {
            const navControls = document.createElement('div');
            navControls.className = 'portfolio-nav';
            navControls.innerHTML = `
                <button class="nav-btn prev-btn" ${currentSectionIndex <= 0 ? 'disabled' : ''}>&lt; Previous</button>
                <button class="nav-btn terminal-btn">Terminal</button>
                <button class="nav-btn next-btn" ${currentSectionIndex >= portfolioSections.length - 1 ? 'disabled' : ''}>Next &gt;</button>
            `;
            document.body.appendChild(navControls);
            
            // Add event listeners
            document.querySelector('.prev-btn').addEventListener('click', showPreviousSection);
            document.querySelector('.next-btn').addEventListener('click', showNextSection);
            document.querySelector('.terminal-btn').addEventListener('click', showTerminal);
        } else {
            // Update button states
            document.querySelector('.prev-btn').disabled = currentSectionIndex <= 0;
            document.querySelector('.next-btn').disabled = currentSectionIndex >= portfolioSections.length - 1;
        }
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
        // Show terminal overlay
        terminalOverlay.style.opacity = '1';
        
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
        // Hide terminal overlay
        terminalOverlay.style.opacity = '0';
        
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
});