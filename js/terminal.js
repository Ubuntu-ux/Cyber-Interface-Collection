class Terminal {
    constructor() {
        this.terminal = document.querySelector('.terminal-window');
        this.output = document.querySelector('.terminal-output');
        this.input = document.querySelector('.terminal-input');
        this.prompt = document.querySelector('.prompt');
        
        this.history = [];
        this.historyIndex = -1;
        this.currentDirectory = '~';
        
        this.commands = {
            help: this.showHelp.bind(this),
            clear: this.clear.bind(this),
            echo: this.echo.bind(this),
            date: this.showDate.bind(this),
            ls: this.listDirectory.bind(this),
            cd: this.changeDirectory.bind(this),
            whoami: this.showUser.bind(this),
            matrix: this.enterMatrix.bind(this),
            hack: this.hackSystem.bind(this),
            exit: () => window.location.href = '../index.html'
        };

        this.fileSystem = {
            '~': {
                type: 'dir',
                contents: {
                    'documents': { type: 'dir', contents: {} },
                    'projects': { type: 'dir', contents: {} },
                    'readme.txt': { type: 'file', content: 'Welcome to the system!' }
                }
            }
        };

        this.initTerminal();
        this.startStatusUpdates();
    }

    initTerminal() {
        // Приветственное сообщение
        this.writeOutput('Terminal v2.0 [Version 1.0.0]', 'info');
        this.writeOutput('Type "help" for available commands\n');

        // Обработчик ввода
        this.input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const command = this.input.value.trim();
                if (command) {
                    this.history.push(command);
                    this.historyIndex = this.history.length;
                    this.executeCommand(command);
                }
                this.input.value = '';
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                this.navigateHistory('up');
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                this.navigateHistory('down');
            }
        });

        // Автофокус на input
        this.terminal.addEventListener('click', () => {
            this.input.focus();
        });
    }

    executeCommand(commandLine) {
        const [command, ...args] = commandLine.split(' ');
        this.writeOutput(`${this.prompt.textContent} ${commandLine}`);

        if (this.commands[command]) {
            this.commands[command](args);
        } else {
            this.writeOutput(`Command not found: ${command}`, 'error');
        }
    }

    writeOutput(text, type = '') {
        const line = document.createElement('div');
        line.textContent = text;
        if (type) line.classList.add(type);
        this.output.appendChild(line);
        this.terminal.scrollTop = this.terminal.scrollHeight;
    }

    navigateHistory(direction) {
        if (direction === 'up' && this.historyIndex > 0) {
            this.historyIndex--;
            this.input.value = this.history[this.historyIndex];
        } else if (direction === 'down' && this.historyIndex < this.history.length) {
            this.historyIndex++;
            this.input.value = this.history[this.historyIndex] || '';
        }
    }

    // Команды
    showHelp() {
        const commands = [
            'Available commands:',
            'help    - Show this help message',
            'clear   - Clear terminal',
            'echo    - Print text',
            'date    - Show current date and time',
            'ls      - List directory contents',
            'cd      - Change directory',
            'whoami  - Show current user',
            'matrix  - Enter the Matrix',
            'hack    - Initiate system hack',
            'exit    - Exit terminal'
        ];
        commands.forEach(cmd => this.writeOutput(cmd));
    }

    clear() {
        this.output.innerHTML = '';
    }

    echo(args) {
        this.writeOutput(args.join(' '));
    }

    showDate() {
        this.writeOutput(new Date().toLocaleString());
    }

    listDirectory() {
        const currentDir = this.getCurrentDir();
        if (currentDir.type !== 'dir') {
            this.writeOutput('Not a directory', 'error');
            return;
        }

        Object.entries(currentDir.contents).forEach(([name, item]) => {
            const prefix = item.type === 'dir' ? 'd ' : '- ';
            this.writeOutput(prefix + name, item.type === 'dir' ? 'info' : '');
        });
    }

    changeDirectory(args) {
        const path = args[0] || '~';
        if (path === '..') {
            // Implement going up in directory tree
            this.writeOutput('Changed to parent directory');
        } else if (this.fileSystem[path]) {
            this.currentDirectory = path;
            this.prompt.textContent = `visitor@system:${this.currentDirectory}$`;
        } else {
            this.writeOutput(`Directory not found: ${path}`, 'error');
        }
    }

    showUser() {
        this.writeOutput('Current user: visitor');
        this.writeOutput('Access level: restricted');
    }

    enterMatrix() {
        this.writeOutput('Entering the Matrix...', 'success');
        setTimeout(() => {
            window.location.href = 'matrix.html';
        }, 1500);
    }

    hackSystem() {
        const steps = [
            'Initializing hack sequence...',
            'Bypassing security...',
            'Accessing mainframe...',
            'Downloading data...',
            'HACK COMPLETE!'
        ];

        let i = 0;
        const interval = setInterval(() => {
            if (i < steps.length) {
                this.writeOutput(steps[i], i === steps.length - 1 ? 'success' : 'warning');
                i++;
            } else {
                clearInterval(interval);
            }
        }, 1000);
    }

    getCurrentDir() {
        return this.fileSystem[this.currentDirectory];
    }

    startStatusUpdates() {
        let startTime = Date.now();
        
        setInterval(() => {
            // Update uptime
            const uptime = Math.floor((Date.now() - startTime) / 1000);
            const hours = Math.floor(uptime / 3600);
            const minutes = Math.floor((uptime % 3600) / 60);
            const seconds = uptime % 60;
            document.querySelector('.uptime').textContent = 
                `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

            // Update memory usage
            const memoryUsage = Math.floor(Math.random() * 30 + 40);
            document.querySelector('.memory-usage').textContent = `${memoryUsage}%`;
        }, 1000);
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    new Terminal();
}); 