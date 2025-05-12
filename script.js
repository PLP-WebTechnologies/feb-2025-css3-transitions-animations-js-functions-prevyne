document.addEventListener('DOMContentLoaded', () => {
    const actionButton = document.getElementById('actionButton');
    const animatedBox = document.getElementById('animatedBox');
    const themeColorInput = document.getElementById('themeColor');
    const savePreferenceButton = document.getElementById('savePreferenceButton');
    const resetPreferenceButton = document.getElementById('resetPreferenceButton');

    const PREFERENCE_KEY = 'userBoxThemeColor';

    // Function to save preference to localStorage
    const saveUserPreference = (color) => {
        try {
            localStorage.setItem(PREFERENCE_KEY, color);
            console.log(`Preference saved: ${color}`);
            applyPreference(color); 
        } catch (e) {
            console.error("Error saving to localStorage", e);
            alert("Could not save your preference. Local storage might be disabled or full.");
        }
    };

    // Function to retrieve preference from localStorage
    const loadUserPreference = () => {
        try {
            const savedColor = localStorage.getItem(PREFERENCE_KEY);
            if (savedColor) {
                console.log(`Preference loaded: ${savedColor}`);
                themeColorInput.value = savedColor; 
                return savedColor;
            }
            return themeColorInput.value; 
        } catch (e) {
            console.error("Error reading from localStorage", e);
            return themeColorInput.value; // Default on error
        }
    };

    // Function to apply the stored preference to the box
    const applyPreference = (color) => {
        if (animatedBox) {
            animatedBox.style.backgroundColor = color;
        }
    };

    // Function to reset (remove) preference from localStorage
    const resetUserPreference = () => {
        try {
            localStorage.removeItem(PREFERENCE_KEY);
            console.log('Preference reset.');
            themeColorInput.value = '#3498db'; 
            applyPreference('#e74c3c'); 
        } catch (e) {
            console.error("Error removing from localStorage", e);
        }
    };

    // Event listener for the save preference button
    if (savePreferenceButton) {
        savePreferenceButton.addEventListener('click', () => {
            const selectedColor = themeColorInput.value;
            saveUserPreference(selectedColor);
        });
    }

    // Event listener for the reset preference button
    if (resetPreferenceButton) {
        resetPreferenceButton.addEventListener('click', () => {
            resetUserPreference();
        });
    }

    // Load and apply preference when the page loads
    const initialColor = loadUserPreference();
    applyPreference(initialColor);

    // Function to trigger CSS animation on the box
    const triggerBoxAnimation = () => {
        if (animatedBox) {
            // Remove class first to allow re-triggering if already applied
            animatedBox.classList.remove('pulsate');
            // This ensures the animation restarts if clicked multiple times quickly.
            void animatedBox.offsetWidth;
            animatedBox.classList.add('pulsate');

            setTimeout(() => {
                animatedBox.classList.remove('pulsate');
            }, 2000); // Matches animation-duration * iteration-count
        }
    };

    // Event listener for the action button to trigger the box animation
    if (actionButton) {
        actionButton.addEventListener('click', () => {
            console.log('Action button clicked - triggering box animation.');
            triggerBoxAnimation();

            // Example of another animation on the button itself
            actionButton.classList.add('spin-once');
            setTimeout(() => {
                actionButton.classList.remove('spin-once');
            }, 800); // Duration of spinAnimation
        });
    }

        if (animatedBox) {
        animatedBox.addEventListener('mouseenter', () => {
            // animatedBox.classList.add('some-hover-animation');
            console.log('Mouse entered the box.');
        });
        animatedBox.addEventListener('mouseleave', () => {
            
            // animatedBox.classList.remove('some-hover-animation');
            console.log('Mouse left the box.');
        });
    }
});
