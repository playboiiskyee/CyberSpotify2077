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

    // 2. HARDWARE OVERRIDE INTERFACE BUTTON INJECTION
    function injectOverrideControl() {
        // Target the absolute static pill bar layout (Where Home and Search icons sit)
        const targetPillContainer = document.querySelector('.main-navBar-entryPoints');
        if (!targetPillContainer || document.getElementById('cyber-override-btn')) return;

        // Build the standalone tactical switch module
        const overrideBtn = document.createElement('button');
        overrideBtn.id = 'cyber-override-btn';
        overrideBtn.innerText = '⚡ [ OVERRIDE ]';
        overrideBtn.title = 'Purge UI Engine / Deploy Night Skyline';
        
        overrideBtn.onclick = (e) => {
            e.stopPropagation();
            
            // Toggle active state rules globally across body classes
            const isCinemaActive = document.body.classList.toggle('cyber-cinema-active');
            playToggleSound(isCinemaActive);
            
            overrideBtn.innerText = isCinemaActive ? '🌐 [ RESTORE ]' : '⚡ [ OVERRIDE ]';
            overrideBtn.style.borderColor = isCinemaActive ? '#ff003c' : '#00F0FF';
            overrideBtn.style.color = isCinemaActive ? '#ff003c' : '#00F0FF';
        };

        // Inject button directly inside the pill framework navigation stream
        targetPillContainer.appendChild(overrideBtn);
    }

    // 3. HARDWARE SLIDE CONTROLLER SIDEBAR FLAPS
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

    // Monitor interface changes loops
    setInterval(() => {
        injectOverrideControl();
        initializeSidebarToggles();
    }, 1000);
})();
