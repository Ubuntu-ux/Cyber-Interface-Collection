class HackerInterface {
    constructor() {
        this.terminal = document.querySelector('.terminal-content');
        this.input = document.querySelector('.terminal-input');
        this.output = document.querySelector('.output');
        this.codeText = document.querySelector('.code-text');
        this.logContent = document.querySelector('.log-content');
        
        this.commands = {
            'help': this.showHelp.bind(this),
            'clear': this.clearTerminal.bind(this),
            'scan': this.scanSystem.bind(this),
            'hack': this.initiateHack.bind(this),
            'status': this.showStatus.bind(this),
            'exit': () => window.location.href = '../index.html'
        };

        this.initTerminal();
        this.updateStats();
        this.updateDateTime();
        this.simulateCode();
        this.initSystemLog();
    }

    initTerminal() {
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const command = this.input.value.trim().toLowerCase();
                this.executeCommand(command);
                this.input.value = '';
            }
        });

        this.writeToTerminal('Инициализация системы...');
        this.writeToTerminal('Введите "help" для списка команд');
    }

    executeCommand(command) {
        this.writeToTerminal(`root@system:~# ${command}`);
        
        if (this.commands[command]) {
            this.commands[command]();
        } else {
            this.writeToTerminal('Команда не распознана. Введите "help"');
        }
    }

    writeToTerminal(text) {
        const line = document.createElement('div');
        line.textContent = text;
        this.output.appendChild(line);
        this.terminal.scrollTop = this.terminal.scrollHeight;
    }

    showHelp() {
        const commands = [
            'help   - показать команды',
            'clear  - очистить терминал',
            'scan   - сканировать систему',
            'hack   - начать взлом',
            'status - показать статус',
            'exit   - выйти'
        ];
        commands.forEach(cmd => this.writeToTerminal(cmd));
    }

    clearTerminal() {
        this.output.innerHTML = '';
    }

    scanSystem() {
        const steps = [
            'Инициализация сканирования...',
            'Проверка портов...',
            'Анализ уязвимостей...',
            'Сбор информации...',
            'Сканирование завершено.'
        ];

        let i = 0;
        const interval = setInterval(() => {
            if (i < steps.length) {
                this.writeToTerminal(steps[i]);
                i++;
            } else {
                clearInterval(interval);
            }
        }, 500);
    }

    initiateHack() {
        const steps = [
            'ВНИМАНИЕ: Начало взлома...',
            'Подбор пароля...',
            'Обход защиты...',
            'Внедрение в систему...',
            'Доступ получен!'
        ];

        let i = 0;
        const interval = setInterval(() => {
            if (i < steps.length) {
                this.writeToTerminal(steps[i]);
                i++;
            } else {
                clearInterval(interval);
                this.simulateHack();
            }
        }, 1000);
    }

    showStatus() {
        const stats = [
            'Статус системы: АКТИВНА',
            `CPU: ${document.getElementById('cpuValue').textContent}`,
            `RAM: ${document.getElementById('ramValue').textContent}`,
            `Network: ${document.getElementById('netValue').textContent}`
        ];
        stats.forEach(stat => this.writeToTerminal(stat));
    }

    updateStats() {
        setInterval(() => {
            // CPU
            const cpu = Math.floor(Math.random() * 30 + 70);
            document.getElementById('cpuBar').style.width = `${cpu}%`;
            document.getElementById('cpuValue').textContent = `${cpu}%`;

            // RAM
            const ram = Math.floor(Math.random() * 20 + 60);
            document.getElementById('ramBar').style.width = `${ram}%`;
            document.getElementById('ramValue').textContent = `${ram}%`;

            // Network
            const net = Math.floor(Math.random() * 1000);
            document.getElementById('netBar').style.width = `${net/10}%`;
            document.getElementById('netValue').textContent = `${net} KB/s`;
        }, 1000);
    }

    updateDateTime() {
        setInterval(() => {
            const now = new Date();
            document.querySelector('.time').textContent = 
                now.toLocaleTimeString('en-GB');
            document.querySelector('.date').textContent = 
                now.toLocaleDateString('ru-RU');
        }, 1000);
    }

    simulateCode() {
        const code = [
            'class SystemHack {',
            '    constructor() {',
            '        this.access = false;',
            '        this.security = new SecuritySystem();',
            '    }',
            '',
            '    async hack() {',
            '        await this.bypassSecurity();',
            '        this.injectPayload();',
            '        return this.gainAccess();',
            '    }',
            '',
            '    bypassSecurity() {',
            '        return new Promise(resolve => {',
            '            setTimeout(() => {',
            '                this.security.disable();',
            '                resolve(true);',
            '            }, 1000);',
            '        });',
            '    }',
            '}'
        ].join('\n');

        let i = 0;
        const interval = setInterval(() => {
            if (i < code.length) {
                this.codeText.textContent += code[i];
                i++;
            } else {
                clearInterval(interval);
            }
        }, 50);
    }

    initSystemLog() {
        const logs = [
            'System initialized',
            'Security protocols active',
            'Monitoring started',
            'Network connection established'
        ];

        logs.forEach(log => {
            this.writeToLog(log);
        });

        setInterval(() => {
            this.writeToLog(`Process check: ${new Date().toLocaleTimeString()}`);
        }, 5000);
    }

    writeToLog(text) {
        const line = document.createElement('div');
        line.textContent = `[${new Date().toLocaleTimeString()}] ${text}`;
        this.logContent.appendChild(line);
        this.logContent.scrollTop = this.logContent.scrollHeight;
    }

    simulateHack() {
        const glitchEffect = document.createElement('div');
        glitchEffect.className = 'hack-glitch';
        document.body.appendChild(glitchEffect);

        setTimeout(() => {
            glitchEffect.remove();
            this.writeToTerminal('Система взломана успешно!');
        }, 2000);
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    new HackerInterface();
}); 