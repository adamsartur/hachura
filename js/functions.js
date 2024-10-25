function toggleDrawMode() {
    state.drawMode = !state.drawMode;
    elements.toggleButton.textContent = state.drawMode ? 'Desativar modo desenho' : 'Ativar modo desenho';
    elements.toggleButton.classList.toggle('active', state.drawMode);
}

function onImageLoad() {
    initializeImageState();
    displayImageAndCanvas();
    renderHachurasAfterLoad();
    setIsLoading(false);
}

function initializeImageState() {
    state.imageBaseWidth = elements.mainImage.naturalWidth;
    state.imageBaseHeight = elements.mainImage.naturalHeight;
    state.scale = 1;
    updateImageAndCanvasSize();
}

function displayImageAndCanvas() {
    elements.mainImage.style.display = 'block';
    elements.canvas.style.display = 'block';
}

function renderHachurasAfterLoad() {
    renderHachuras();
}

function updateImageAndCanvasSize() {
    // Ensure aspect ratio is preserved by scaling both dimensions uniformly
    const imageWidth = state.imageBaseWidth * state.scale;
    const imageHeight = state.imageBaseHeight * state.scale;

    // Apply scaled dimensions to image
    elements.mainImage.style.width = `${imageWidth}px`;
    elements.mainImage.style.height = `${imageHeight}px`;

    // Keep canvas's internal size at base dimensions
    elements.canvas.width = state.imageBaseWidth;
    elements.canvas.height = state.imageBaseHeight;

    // Scale the canvas display size uniformly
    elements.canvas.style.width = `${imageWidth}px`;
    elements.canvas.style.height = `${imageHeight}px`;

    // Position the canvas over the image
    elements.canvas.style.left = elements.mainImage.offsetLeft + 'px';
    elements.canvas.style.top = elements.mainImage.offsetTop + 'px';

    renderHachuras();
}

function getMousePos(event) {
    const rect = elements.canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left) * (elements.canvas.width / elements.canvas.clientWidth);
    const y = (event.clientY - rect.top) * (elements.canvas.height / elements.canvas.clientHeight);
    return { x, y };
}

function shouldDraw(event) {
    return state.drawMode && (event.button === 0 || event.button === 1);
}

function onMouseDown(event) {
    const { x, y } = getMousePos(event);

    const hachura = findHachuraAt(x, y);
    if (hachura && shouldDraw(event)) {
        deleteHachura(hachura);
        renderHachuras();
        state.isDrawing = false;
        return;
    }

    if (!state.drawMode) return;
    state.isDrawing = true;
    state.startX = x;
    state.startY = y;
}

function onMouseMove(event) {
    if (!state.isDrawing) return;

    const { x, y } = getMousePos(event);

    renderHachuras();

    const rect = getNormalizedRect(state.startX, state.startY, x, y);
    drawRect(rect.x, rect.y, rect.width, rect.height, DRAW_COLOR);
}

function onMouseUp(event) {
    if (!state.isDrawing) return;
    state.isDrawing = false;

    const { x, y } = getMousePos(event);

    const rect = getNormalizedRect(state.startX, state.startY, x, y);

    const newHachura = {
        page: state.currentPage,
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
    };
    state.hachuras.push(newHachura);
    saveHachuras();
    renderHachuras();
}

function onWheel(event) {
    event.preventDefault();
    const delta = Math.sign(event.deltaY) * -SCALE_STEP;
    state.scale += delta;
    state.scale = Math.min(Math.max(MIN_SCALE, state.scale), MAX_SCALE);
    updateImageAndCanvasSize();
}

function getNormalizedRect(x1, y1, x2, y2) {
    const x = Math.min(x1, x2);
    const y = Math.min(y1, y2);
    const width = Math.abs(x2 - x1);
    const height = Math.abs(y2 - y1);
    return { x, y, width, height };
}

function navigatePages(delta) {
    const newPage = state.currentPage + delta;
    if (newPage >= 1 && newPage <= state.totalPages) {
        state.currentPage = newPage;
        fetchPage(state.currentPage);
        updatePageIndicator();
    }
}

function updatePageIndicator() {
    elements.pageIndicator.textContent = `${state.currentPage} / ${state.totalPages}`;
}

function loadImage(base64Image) {
    try {
        elements.mainImage.src = base64Image;
    } catch (error) {
        console.error('Error loading image:', error);
        alert('There was an error loading the image. Please try again.');
    }
}


function setIsLoading(isLoading) {
    if (isLoading) {
        elements.loader.classList.remove('hidden');
    } else {
        elements.loader.classList.add('hidden');
    }
}