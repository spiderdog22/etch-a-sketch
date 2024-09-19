let gridContainer = document.querySelector('.grid-container');

gridContainer.addEventListener('mouseover', (event) => {
    if (event.target.classList.contains('gc-box'))
    {
        let box = event.target;
        let newOpacity = parseFloat(box.style.opacity) + 0.1;
        box.style.opacity = '' + newOpacity;
    }
});

const createBox = (width, height) => {
    let box = document.createElement('div');
    box.style['width'] = width + 'px';
    box.style['height'] = height + 'px';
    box.style['opacity'] = '' + 0.0;
    box.classList.add('gc-box');
    return box;
};

const cleanGridContainer = () => {
    let toRemove = [];

    for (let element of gridContainer.childNodes)
        toRemove.push(element);

    for (let element of toRemove)
        element.remove();
};

const setupGrid = (rows, cols) => {
    cleanGridContainer();

    let gridContainerWidth = gridContainer.clientWidth;
    let gridContainerHeight = gridContainer.clientHeight;

    let boxWidth = gridContainerWidth / rows;
    let boxHeight = gridContainerHeight / cols;

    console.log(boxWidth, boxHeight);
    
    for (let i = 0; i < rows * cols; i++) {
        let box = createBox(boxWidth, boxHeight);
        gridContainer.appendChild(box);
    }

};