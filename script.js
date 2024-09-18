let gridContainer = document.querySelector('.grid-container');

const createBox = () => {
    let box = document.createElement('div');
    box.classList.add('gc-box');
    return box;
}

const setupGrid = (rows, cols) => {
    
    for (let i = 0; i < rows * cols; i++) {
        let box = createBox();
        gridContainer.appendChild(box);
    }

};