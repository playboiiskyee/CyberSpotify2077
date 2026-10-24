(function CyberTranslucentSuite() {
    // 1. DIGITAL HAPTIC SOUND ENGINE
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    function playToggleSound(highFreq) {
        if (!audioCtx) return;
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(highFreq ? 800 : 500, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.02, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.12);
        
        osc.start();
        osc.stop(audioCtx.currentTime + 0.12);
    }

    // CYBER TERMINAL MATRIX MODULE
    let terminalInterval = null;
    const terminalLogs = [
        { t: "SYS_INIT", msg: "OVERRIDE STACK TRACE ACTIVE: OVERWRITING CACHE POOL...", c: "#00F0FF" },
        { t: "MEM_HEX", msg: "0x7FFF5FBFFD98 -> ALLOCATING VIRTUAL MEMORY CHANNELS", c: "#ff007f" },
        { t: "UI_HOOK", msg: "HOOKING XPUI DOM TREE - REJECTING STANDARD STYLESHEETS", c: "#FFD700" },
        { t: "CORE_ENG", msg: "SYNAPSE RE-ROUTING COMPCOMPLETE. LATENCY 0.42ms", c: "#00F0FF" },
        { t: "NET_KILL", msg: "BYPASSING SPECTRAL SHIELD... HANDSHAKE ACKNOWLEDGED", c: "#ff007f" },
        { t: "KERNEL", msg: "ALERT: OVERCLOCK RE-BUFFER TRIGGERED AT 1.21GW", c: "#FFD700" },
        { t: "SYS_DUMP", msg: "CRITICAL: RE-INDEXING DOMNODES [/main-view/tracklist]", c: "#00F0FF" },
        { t: "CIPHER", msg: "DECRYPTING KEY [AES-256-GCM] - ACCESS MANIFEST VERIFIED", c: "#ff007f" },
        { t: "HARDWARE", msg: "GPU DEPLOYMENT MAP: MEMORY BUFFER REFLECTS SUB-ATOMIC CHANNELS", c: "#FFD700" }
    ];

    function initializeCyberTerminal() {
        if (document.getElementById('cyber-terminal-overlay')) return;

        const term = document.createElement('div');
        term.id = 'cyber-terminal-overlay';
        term.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            background: #05050a; border: none;
            z-index: 99999; font-family: 'Courier New', monospace; font-size: 13px;
            padding: 30px; overflow-y: hidden; display: flex; flex-direction: column;
            pointer-events: auto; box-sizing: border-box;
        `;

        const header = document.createElement('div');
        header.style.cssText = "color: #00F0FF; border-bottom: 2px solid #00F0FF; padding-bottom: 8px; margin-bottom: 15px; font-weight: bold; font-size: 16px; letter-spacing: 1px;";
        header.innerText = "■ DEPLOY_OVERRIDE_SHELL v4.2 // INITIALIZING SYSTEM BOOT SEQUENCE";
        term.appendChild(header);

        const body = document.createElement('div');
        body.style.cssText = "flex: 1; overflow-y: hidden; display: flex; flex-direction: column; justify-content: flex-end;";
        term.appendChild(body);

        document.body.appendChild(term);
        playToggleSound(true);

        // Dynamically compute lines to fill full screen resolution safely
        const maxLines = Math.floor(window.innerHeight / 22);

        terminalInterval = setInterval(() => {
            const entry = terminalLogs[Math.floor(Math.random() * terminalLogs.length)];
            const hex = Math.random().toString(16).substring(2, 8).toUpperCase();
            
            const logLine = document.createElement('div');
            logLine.style.cssText = `color: ${entry.c}; margin-bottom: 6px; line-height: 16px; text-shadow: 0 0 5px ${entry.c}44; white-space: nowrap;`;
            logLine.innerText = `[${entry.t}][0x${hex}] ${entry.msg}`;
            
            body.appendChild(logLine);
            if (body.childNodes.length > maxLines) {
                body.removeChild(body.firstChild);
            }
        }, 15);

        // Force sequence self-destruct mechanism after exactly 5 seconds
        setTimeout(() => {
            clearInterval(terminalInterval);
            term.remove();
            playToggleSound(false);
        }, 5000);
    }

    // 2. HARDWARE SLIDE CONTROLLER SIDEBAR FLAPS
    function initializeSidebarToggles() {
        const leftSidebar = document.querySelector('.Root__left-sidebar');
        const rightSidebar = document.querySelector('.Root__right-sidebar');

        if (leftSidebar && !document.getElementById('cyber-left-toggle')) {
            const leftBtn = document.createElement('button');
            leftBtn.id = 'cyber-left-toggle';
            leftBtn.className = 'cyber-toggle-btn';
            leftBtn.innerText = '◀';
            leftBtn.onclick = (e) => {
                e.stopPropagation();
                const isCollapsed = leftSidebar.classList.toggle('panel-collapsed');
                leftBtn.innerText = isCollapsed ? '▶' : '◀';
                playToggleSound(!isCollapsed);
            };
            leftSidebar.appendChild(leftBtn);
        }

        if (rightSidebar && !document.getElementById('cyber-right-toggle')) {
            const rightBtn = document.createElement('button');
            rightBtn.id = 'cyber-right-toggle';
            rightBtn.className = 'cyber-toggle-btn';
            rightBtn.innerText = '▶';
            rightBtn.onclick = (e) => {
                e.stopPropagation();
                const isCollapsed = rightSidebar.classList.toggle('panel-collapsed');
                rightBtn.innerText = isCollapsed ? '◀' : '▶';
                playToggleSound(!isCollapsed);
            };
            rightSidebar.appendChild(rightBtn);
        }
    }

    // Run terminal injection once DOM elements are ready
    const launchCheck = setInterval(() => {
        if (document.body) {
            initializeCyberTerminal();
            clearInterval(launchCheck);
        }
    }, 100);

    // Keep monitoring sidebar elements
    setInterval(() => {
        initializeSidebarToggles();
    }, 1000);
})();
