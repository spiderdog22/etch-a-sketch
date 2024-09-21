let gridContainer = document.querySelector('.grid-container');

let genGridBtn = document.querySelector('#gen-grid');
genGridBtn.addEventListener('click', () => {
    let numRowInput = document.querySelector('#set-row');
    let numColInput = document.querySelector('#set-col');

    let rowValue = Number.parseInt(numRowInput.value);
    let colValue = Number.parseInt(numColInput.value);

    if (Number.isInteger(rowValue) && Number.isInteger(colValue)) {

        if (rowValue >= 0 && rowValue <= 100 && colValue >= 0 && colValue <= 100) {
            if (!gridContainer.hasChildNodes())
                toggleModes();
            setupGrid(rowValue, colValue);
        } else {
            alert('Error: Entered values out of range.\n Only allowed between 0 and 100.');
            numRowInput.value = '';
            numColInput.value = '';
            numRowInput.focus();
        }
    } else {
        alert('Set valid values: integers.')
        numRowInput.value = '';
        numColInput.value = '';
        numRowInput.focus();
    }
});

const GRIDBOX_DEFAULTCOLOR = '#dcdcdc';
const DEFAULT_SOLID_COLOR = '#000000';
let gridActualColor = GRIDBOX_DEFAULTCOLOR;
let actualSolidColor = DEFAULT_SOLID_COLOR;

let gridColorInput = document.querySelector('#set-grid-color');
gridColorInput.value = GRIDBOX_DEFAULTCOLOR;
gridColorInput.addEventListener('change', (event) => {
    gridActualColor = event.target.value;

    if (gridContainer.hasChildNodes()) {
        gridContainer.childNodes.forEach((element)=>{
            element.style['outline-color'] = gridActualColor;
        })
    }
});

let solidColorInput = document.querySelector('#set-solid-color');
solidColorInput.addEventListener('input', (event) => {
    actualSolidColor = event.target.value;
});

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

let modesPanel = document.querySelector('.modes');

const toggleModes = () => {
    modesPanel.childNodes.forEach((element) => {
        if (element.nodeName === 'BUTTON') {
            element.disabled = !element.disabled;
        }
    });
};

const defaultMode = (event) => {
    // Do nothing
}

const solidColorMode = (event) => {
    if (event.target.classList.contains('gc-box'))
    {
        let box = event.target;
        box.style.backgroundColor = actualSolidColor;
        box.style.opacity = '1.0';
    }
};

const randomColorMode = (event) => {
    if (event.target.classList.contains('gc-box'))
    {
        let box = event.target;
        box.style.backgroundColor = 'rgba(' + randCssRGB() + ', 1.0)';
    }
};

const darkeningMode = (event) => {
    if (event.target.classList.contains('gc-box'))
    {
        let box = event.target;
        let bcStyle = box.style['background-color'];
        let alpha = parseFloat(getCssAlpha(bcStyle));
        let newRgba = 'rgba(0, 0, 0, ' + (alpha > 1.0 ? 1.0 : alpha + 0.1) + ')';
        box.style['background-color'] = newRgba;
    }
};

let selectedMode = defaultMode;

modesPanel.addEventListener('click', (event) => {
    const id = event.target.id;

    switch(id) {
        case 'mode-solid-color': selectedMode = solidColorMode; break;
        case 'mode-darkening': selectedMode = darkeningMode; break;
        case 'mode-random': selectedMode = randomColorMode; break;
    }
});

gridContainer.addEventListener('mouseover', (event) => {
    selectedMode(event);
});

// gridContainer.addEventListener('mouseover', solidColor);
// gridContainer.addEventListener('mousemove', randomColorEffect);

const createBox = (width, height) => {
    let box = document.createElement('div');
    box.style['width'] = width + 'px';
    box.style['height'] = height + 'px';
    box.style['background-color'] = 'rgba(0, 0, 0, 0.0)';
    box.style['outline'] = gridActualColor + ' solid 1px';
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
    
    for (let i = 0; i < rows * cols; i++) {
        let box = createBox(boxWidth, boxHeight);
        gridContainer.appendChild(box);
    }

};