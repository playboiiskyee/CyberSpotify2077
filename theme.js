(function CyberPunkCompleteSuite() {
    // 1. SYNTH UI SOUND FX GENERATOR
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    function playBeep(frequency, duration, type = 'sine', volume = 0.04) {
        if (!audioCtx) return;
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        osc.type = type;
        osc.frequency.value = frequency;
        gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + duration);
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
    }

    // 2. INITIALIZE BOOT SEQUENCE OVERLAY
    const overlay = document.createElement("div");
    overlay.id = "cyber-boot-overlay";
    overlay.innerHTML = `
        <div class="scanline-hud"></div>
        <div class="boot-matrix">
            <div class="cyber-warning-header">BIOMONITOR STATUS: CONNECTED</div>
            <p class="yellow">>>> ACCESSING COGNITIVE RECEPTORS... V_4.62</p>
            <p class="cyan">LINK DIRECTORY: spotify</p>
            <p>SYNCING NETTSPEND TYPE SHIT......................... [ OK ]</p>
            <p>GOOD AS FUCK MUSIC..................... [ SECURE ]</p>
            <p class="magenta">BYPASSING NETWATCH SUBNETS.............. [ COMPLETED ]</p>
            <p>DECRYPTING NEURAL AUDIO BUFFER.......... [ 100% ]</p>
            <div class="cyber-final-prompt">Welcome to Spotify.</div>
        </div>
    `;
    document.body.appendChild(overlay);

    // Audio triggers for boot text
    setTimeout(() => playBeep(880, 0.08, 'square'), 100);
    setTimeout(() => playBeep(880, 0.08, 'square'), 350);
    setTimeout(() => playBeep(600, 0.1, 'sine'), 600);
    setTimeout(() => playBeep(600, 0.1, 'sine'), 850);
    setTimeout(() => playBeep(1200, 0.05, 'square'), 1100);
    setTimeout(() => playBeep(900, 0.08, 'sine'), 1350);
    setTimeout(() => {
        playBeep(180, 0.4, 'sawtooth', 0.06);
        playBeep(220, 0.3, 'sawtooth', 0.06); 
    }, 1800);

    setTimeout(() => {
        overlay.classList.add("fade-out");
        setTimeout(() => overlay.remove(), 600);
    }, 3200);

    // 3. CREATE THE CUSTOM "DECK" QUICK-SWAPPER BUTTON
    function injectThemeSwitcher() {
        // Target the main top bar search and entry point container block
        const targetHeader = document.querySelector('.main-navBar-entryPoints');
        if (!targetHeader || document.getElementById('cyber-deck-btn')) return;

        // Create the tactical button
        const deckBtn = document.createElement('button');
        deckBtn.id = 'cyber-deck-btn';
        deckBtn.innerText = '⚙️ [ DECK ]';
        deckBtn.title = 'Cyberware Theme Deck';
        
        deckBtn.style.alignSelf = 'center';
        deckBtn.style.height = '32px';
        deckBtn.style.borderRadius = '0px';
        
        // Create the theme selector dropdown menu container
        const menuContainer = document.createElement('div');
        menuContainer.id = 'cyber-deck-menu';
        menuContainer.style.display = 'none';

        // ADD YOUR CUSTOM THEMES HERE
        const myThemes = ['CyberPunk77', 'marketplace'];

        myThemes.forEach(themeName => {
            const item = document.createElement('div');
            item.className = 'cyber-deck-item';
            item.innerText = `>> LOAD: ${themeName}`;
            item.onclick = (e) => {
                e.stopPropagation();
                playBeep(1000, 0.1, 'square', 0.05);
                localStorage.setItem("spicetify:current_theme", themeName);
                localStorage.setItem("spicetify:color_scheme", "Base");
                location.reload(); 
            };
            menuContainer.appendChild(item);
        });

        // Toggle dropdown on click with UI sound effect
        deckBtn.onclick = (e) => {
            e.stopPropagation();
            playBeep(600, 0.05, 'sine', 0.03);
            menuContainer.style.display = menuContainer.style.display === 'none' ? 'block' : 'none';
        };

        // Close menu if user clicks anywhere else
        document.addEventListener('click', () => {
            menuContainer.style.display = 'none';
        });

        deckBtn.appendChild(menuContainer);
        targetHeader.parentNode.insertBefore(deckBtn, targetHeader.nextSibling);
    }

    // Run layout loop checks
    setInterval(injectThemeSwitcher, 1000);
})();
