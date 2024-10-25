function renderHachuras() {
    ctx.clearRect(0, 0, elements.canvas.width, elements.canvas.height);
    state.hachuras.forEach(hachura => {
        if (hachura.page === state.currentPage) {
            drawRect(hachura.x, hachura.y, hachura.width, hachura.height, DRAW_COLOR);
        }
    });
}

function drawRect(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function isPointWithinHachura(hachura, x, y) {
    return (
        hachura.page === state.currentPage &&
        x >= hachura.x &&
        x <= hachura.x + hachura.width &&
        y >= hachura.y &&
        y <= hachura.y + hachura.height
    );
}

function findHachuraAt(x, y) {
    return state.hachuras.find(hachura => isPointWithinHachura(hachura, x, y));
}

function deleteHachura(hachura) {
    if (!hachura) return;
    const index = state.hachuras.indexOf(hachura);
    if (index !== -1) {
        state.hachuras.splice(index, 1);
        saveHachuras();
    }
}