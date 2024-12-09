let audio = null;
let isShuffleEnabled = false;
let isLoopEnabled = false;
let selectedTracks = new Set();

document.addEventListener('DOMContentLoaded', async function() {
    const playButton = document.getElementById('playButton');
    const pauseButton = document.getElementById('pauseButton');
    const nextButton = document.getElementById('nextButton');
    const shuffleButton = document.getElementById('shuffleButton');
    const loopButton = document.getElementById('loopButton');
    const volumeSlider = document.getElementById('volumeSlider');
    const popoutButton = document.getElementById('popoutButton');
    const currentTrackDisplay = document.getElementById('currentTrack');
    const trackSelect = document.getElementById('trackSelect');

    const response = await chrome.runtime.sendMessage({ action: 'getTracks' });
    
    const selectAllContainer = document.createElement('div');
    selectAllContainer.className = 'select-all-container';
    selectAllContainer.innerHTML = `
        <button id="selectAllBtn" class="select-btn">Select All</button>
        <button id="deselectAllBtn" class="select-btn">Deselect All</button>
    `;
    trackSelect.insertBefore(selectAllContainer, trackSelect.firstChild);

    const selectAllBtn = document.getElementById('selectAllBtn');
    const deselectAllBtn = document.getElementById('deselectAllBtn');

    selectAllBtn.addEventListener('click', () => {
        const checkboxes = trackSelect.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = true;
            selectedTracks.add(parseInt(checkbox.value));
        });
        chrome.runtime.sendMessage({ 
            action: 'updateSelectedTracks', 
            selectedTracks: Array.from(selectedTracks) 
        });
    });

    deselectAllBtn.addEventListener('click', () => {
        const checkboxes = trackSelect.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
            selectedTracks.delete(parseInt(checkbox.value));
        });
        chrome.runtime.sendMessage({ 
            action: 'updateSelectedTracks', 
            selectedTracks: Array.from(selectedTracks) 
        });
    });
    
    response.tracks.forEach((track, index) => {
        const div = document.createElement('div');
        div.className = 'track-option';
        div.innerHTML = `
            <input type="checkbox" id="track-${index}" value="${index}">
            <label for="track-${index}" class="track-label">${track.title}</label>
        `;
        trackSelect.appendChild(div);

        selectedTracks.add(index);
        div.querySelector('input').checked = true;

        const label = div.querySelector('label');
        label.addEventListener('click', (e) => {
            e.preventDefault();
            const checkbox = div.querySelector('input');
            checkbox.checked = !checkbox.checked;
            
            if (checkbox.checked) {
                selectedTracks.add(index);
            } else {
                selectedTracks.delete(index);
            }
            
            chrome.runtime.sendMessage({ 
                action: 'updateSelectedTracks', 
                selectedTracks: Array.from(selectedTracks) 
            });
        });

        div.querySelector('input').addEventListener('change', (e) => {
            if (e.target.checked) {
                selectedTracks.add(index);
            } else {
                selectedTracks.delete(index);
            }
            chrome.runtime.sendMessage({ 
                action: 'updateSelectedTracks', 
                selectedTracks: Array.from(selectedTracks) 
            });
        });
    });

    playButton.addEventListener('click', async () => {
        const response = await chrome.runtime.sendMessage({ action: 'play' });
        if (audio) {
            audio.pause();
        }
        audio = new Audio(response.track.url);
        audio.volume = volumeSlider.value / 100;
        audio.play();
        currentTrackDisplay.textContent = response.track.title;
        
        audio.addEventListener('ended', async () => {
            if (isLoopEnabled) {
                audio.currentTime = 0;
                audio.play();
            } else {
                const nextResponse = await chrome.runtime.sendMessage({ action: 'next' });
                audio = new Audio(nextResponse.track.url);
                audio.volume = volumeSlider.value / 100;
                audio.play();
                currentTrackDisplay.textContent = nextResponse.track.title;
            }
        });
    });

    pauseButton.addEventListener('click', () => {
        if (audio) {
            audio.pause();
            chrome.runtime.sendMessage({ action: 'pause' });
        }
    });

    nextButton.addEventListener('click', async () => {
        const response = await chrome.runtime.sendMessage({ action: 'next' });
        if (audio) {
            audio.pause();
        }
        audio = new Audio(response.track.url);
        audio.volume = volumeSlider.value / 100;
        audio.play();
        currentTrackDisplay.textContent = response.track.title;
    });

    loopButton.addEventListener('click', () => {
        isLoopEnabled = !isLoopEnabled;
        loopButton.textContent = `Loop: ${isLoopEnabled ? 'On' : 'Off'}`;
        loopButton.classList.toggle('active', isLoopEnabled);
    });

    shuffleButton.addEventListener('click', async () => {
        const response = await chrome.runtime.sendMessage({ action: 'toggleShuffle' });
        isShuffleEnabled = !isShuffleEnabled;
        shuffleButton.textContent = `Shuffle: ${isShuffleEnabled ? 'On' : 'Off'}`;
        shuffleButton.classList.toggle('active', isShuffleEnabled);
        if (audio && !audio.paused) {
            audio.pause();
            audio = new Audio(response.track.url);
            audio.volume = volumeSlider.value / 100;
            audio.play();
            currentTrackDisplay.textContent = response.track.title;
        }
    });

    volumeSlider.addEventListener('input', () => {
        if (audio) {
            audio.volume = volumeSlider.value / 100;
        }
    });

    popoutButton.addEventListener('click', () => {
        chrome.windows.create({
            url: 'popup.html',
            type: 'popup',
            width: 350,
            height: 600
        });
    });
});