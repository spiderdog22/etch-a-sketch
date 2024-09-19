let gridContainer = document.querySelector('.grid-container');

gridContainer.addEventListener('mousemove', (event) => {
    if (event.target.classList.contains('gc-box'))
    {
        let box = event.target;
        box.style['background-color'] = 'black';
    }
});

const createBox = (width, height) => {
    let box = document.createElement('div');
    box.style['width'] = width + 'px';
    box.style['height'] = height + 'px';
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