function loadHachuras() {
    try {
        const data = localStorage.getItem(HACHURAS_STORAGE_KEY);
        if (data) {
            state.hachuras = JSON.parse(data);
        }
    } catch (error) {
        console.error("Error loading hachuras from localStorage:", error);
        state.hachuras = [];
    }
}

function saveHachuras() {
    try {
        localStorage.setItem(HACHURAS_STORAGE_KEY, JSON.stringify(state.hachuras));
    } catch (error) {
        console.error("Error saving hachuras to localStorage:", error);
    }
}
