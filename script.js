let gridContainer = document.querySelector('.grid-container');

const randCssRGB = () => {
    let red = Math.trunc((Math.random() * 1000) % 256);
    let green = Math.trunc((Math.random() * 1000) % 256);
    let blue = Math.trunc((Math.random() * 1000) % 256);

    return '' + red + ', ' + green + ', ' + blue;
};

const getCssAlpha = (css) => {
    if (css.split(',').length < 4)
        return '1.0';
    return css.slice(css.lastIndexOf(',') + 1, css.lastIndexOf(')'));
};

const solidColor = (event) => {
    if (event.target.classList.contains('gc-box'))
    {
        let box = event.target;
        box.style.opacity = '1.0';
    }
};

const randomColorEffect = (event) => {
    if (event.target.classList.contains('gc-box'))
    {
        let box = event.target;
        box.style.backgroundColor = 'rgba(' + randCssRGB() + ', 1.0)';
    }
};

const darkeningEffect = (event) => {
    if (event.target.classList.contains('gc-box'))
    {
        let box = event.target;
        let bcStyle = box.style['background-color'];
        let alpha = parseFloat(getCssAlpha(bcStyle));
        let newRgba = 'rgba(0, 0, 0, ' + (alpha > 1.0 ? 1.0 : alpha + 0.1) + ')';
        box.style['background-color'] = newRgba;
    }
};

gridContainer.addEventListener('mouseover', darkeningEffect);
// gridContainer.addEventListener('mousemove', randomColorEffect);

const createBox = (width, height) => {
    let box = document.createElement('div');
    box.style['width'] = width + 'px';
    box.style['height'] = height + 'px';
    box.style['background-color'] = 'rgba(0, 0, 0, 0.0)';
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