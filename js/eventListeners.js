document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

const initializeApp = () => {
    fetchPage(state.currentPage);
    loadHachuras();
    attachEventListeners();
}

const attachEventListeners = () => {
    attachDrawingEventListeners();
    attachNavigationEventListeners();
}

const attachDrawingEventListeners = () => {
    elements.toggleButton.addEventListener('click', toggleDrawMode);
    elements.mainImage.addEventListener('load', onImageLoad);
    elements.imageContainer.addEventListener('mousedown', onMouseDown);
    elements.imageContainer.addEventListener('mousemove', onMouseMove);
    elements.imageContainer.addEventListener('mouseup', onMouseUp);
    elements.imageContainer.addEventListener('wheel', onWheel);
}
const navigationButtons = [
    { element: elements.navigationButtons.back10, offset: -10 },
    { element: elements.navigationButtons.back1, offset: -1 },
    { element: elements.navigationButtons.forward1, offset: 1 },
    { element: elements.navigationButtons.forward10, offset: 10 },
];
const attachNavigationEventListeners = () => {
    navigationButtons.forEach(button => {
        button.element.addEventListener('click', () => navigatePages(button.offset));
    });
}
