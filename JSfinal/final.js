document.addEventListener('DOMContentLoaded', () => {
    const volumeDisplay = document.getElementById('volumeDisplay');
    const changeVolumeButton = document.getElementById('changeVolumeButton');
    const resetButton = document.getElementById('resetButton');

    changeVolumeButton.addEventListener('click', () => {
        const volume = Math.random() * 100; // random volume from 0 to 100
        volumeDisplay.textContent = `Volume: ${volume.toFixed(2)}`; 
    });

    resetButton.addEventListener('click', () => { // this resets it to 0 
        volumeDisplay.textContent = 'Volume: 0'; 
    });
});
