// Terminal-like startup animation for Sudhanshu Kumar's Bio Website

document.addEventListener('DOMContentLoaded', () => {
    const terminal = document.getElementById('terminal-startup');
    if (!terminal) return;
    const lines = [
        'Welcome to Sudhanshu Kumar\'s Portfolio!',
        '',
        'user@sudhanshu:~$ whoami',
        'Sudhanshu Kumar',
        'user@sudhanshu:~$ echo "DevOps | MLOps Engineer"',
        'DevOps | MLOps Engineer',
        'user@sudhanshu:~$ cat skills.txt',
        'AWS, GCP, Azure, Jenkins, GitLab, GitHub Actions, Vertex AI, KubeRay, Ray Serve, Docker, Kubernetes, Terraform, Ansible, Prometheus, Grafana, Python, Golang, Bash',
        'user@sudhanshu:~$'
    ];
    let lineIdx = 0;
    let charIdx = 0;
    let output = '';
    terminal.style.display = 'block';
    function typeLine() {
        if (lineIdx >= lines.length) {
            setTimeout(() => {
                terminal.style.display = 'none';
            }, 1200);
            return;
        }
        if (charIdx < lines[lineIdx].length) {
            output += lines[lineIdx][charIdx];
            terminal.innerHTML = output + '<span class="blinker">█</span>';
            charIdx++;
            setTimeout(typeLine, 30);
        } else {
            output += '\n';
            terminal.innerHTML = output.replace(/\n/g, '<br>') + '<span class="blinker">█</span>';
            lineIdx++;
            charIdx = 0;
            setTimeout(typeLine, 400);
        }
    }
    typeLine();
});

// Optional: Add blinking cursor effect
const style = document.createElement('style');
style.innerHTML = `.blinker { animation: blink 1s steps(1) infinite; }
@keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }`;
document.head.appendChild(style);