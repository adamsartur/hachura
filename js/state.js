// DOM Elements
const getElement = (id) => {
    const element = document.getElementById(id);
    if (!element) {
        console.warn(`Element with id '${id}' not found.`);
    }
    return element;
};

const elements = {
    toggleButton: getElement('toggle-draw-mode'),
    imageContainer: getElement('image-container'),
    mainImage: getElement('main-image'),
    canvas: getElement('drawing-canvas'),
    pageIndicator: getElement('page-indicator'),
    navigationButtons: {
        back10: getElement('back-10'),
        back1: getElement('back-1'),
        forward1: getElement('forward-1'),
        forward10: getElement('forward-10'),
    },
    loader: getElement('loader'),
};

const ctx = elements.canvas ? elements.canvas.getContext('2d') : null;

if (!ctx) {
    console.error('Unable to get canvas context, drawing functions will be disabled.');
}

function getDefaultState() {
    return {
        currentPage: 1,
        totalPages: 1,
        drawMode: false,
        isDrawing: false,
        hachuras: [],
        scale: 1,
        startX: 0,
        startY: 0,
        imageBaseWidth: 0,
        imageBaseHeight: 0,
    };
}

let state = getDefaultState();