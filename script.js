function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

const hexCharacters = [0,1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F"];

function generateColor() {
    let hexColor = "#";

    for (let position = 0; position < 6; position++){
        const randomNumber = Math.floor(Math.random() * hexCharacters.length);
        hexColor += hexCharacters[randomNumber];
    }

    return hexColor;
}

class Figure {
    constructor(type, color) {
        this.figure = null;
        this._type = type;
        this._color = color;
        this._size = 0;
    }

    setParams(containerSize) {
        this.figure = document.createElement('div');
        this._size = getRandomArbitrary(50, 200);
        this.setDimensions();
        this.setClasses();
        this.setPosition(containerSize);
    }

    setDimensions() {
        this.figure.style.width = `${this._size}px`;
        this.figure.style.height = `${this._size}px`;
        this.figure.style.backgroundColor = this._color;
    }

    setPosition(containerSize) {
        const leftPos = getRandomArbitrary(this._size, containerSize.x - this._size);
        const topPos = getRandomArbitrary(this._size, containerSize.y - this._size);
        this.figure.style.left = `${leftPos}px`;
        this.figure.style.top = `${topPos}px`;
    }

    setClasses() {
        this.figure.classList.add(this._type);
        this.figure.classList.add('figure');
    }
}

class Rectangle extends Figure {
    setDimensions() {
        this.figure.style.width = `${this._size}px`;
        this.figure.style.height = `${this._size}px`;
        this.figure.style.backgroundColor = 'red';
    }
}

class Triangle extends Figure {
    setDimensions() {
        this.figure.style.borderColor = 'transparent';
        this.figure.style.borderStyle = 'solid';
        this.figure.style.borderWidth = `${this._size / 2}px`;
        this.figure.style.borderBottomColor = this._color;
        this.figure.style.borderBottomColor = 'blue';
    }
}

class Circle extends Figure {
    setDimensions() {
        this.figure.style.width = `${this._size}px`;
        this.figure.style.height = `${this._size}px`;
        this.figure.style.backgroundColor = 'green';
        this.figure.style.borderRadius='50%';
    }
}

class CanvasActions {
    constructor(canvasEl, inputEl) {
        this.canvas = canvasEl;
        this.input = inputEl;
        this.maxFigures = 100;
    }

    appendFiguresOnClick(btn) {
        btn.addEventListener('click', () => {
            const existingFiguresCount = this.canvas.querySelectorAll('.figure').length;
            const inputNumber = Number(this.input.value);
            
            if (existingFiguresCount >= this.maxFigures || inputNumber > this.maxFigures) {
                return;
            }
            
            let figuresNumber = Math.min(inputNumber, this.maxFigures - existingFiguresCount);
            
            if (figuresNumber < 1) {
                figuresNumber = 1;
            }
            
            const figureColor = generateColor();
            
            for (let i = 0; i < figuresNumber; i++) {
                const figureInstance = this.createFigure(figureColor);
                const containerSize = { x: this.canvas.clientWidth, y: this.canvas.clientHeight };
                figureInstance.setParams(containerSize);
                this.canvas.append(figureInstance.figure);
            }
        });
        
        
    }

    createFigure(figureColor) {}
}

class CanvasRectangleActions extends CanvasActions {
    createFigure(figureColor) {
        return new Rectangle('rectangle', figureColor);
    }
}

class CanvasTriangleActions extends CanvasActions {
    createFigure(figureColor) {
        return new Triangle('triangle', figureColor);
    }
}

class CanvasCircleActions extends CanvasActions {
    createFigure(figureColor) {
        return new Circle('circle', figureColor);
    }
}

const inpField = document.querySelector('.input-field');
const rectangleButton = document.querySelector('.rectangle-button');
const triangleButton = document.querySelector('.triangle-button');
const circleButton = document.querySelector('.circle-button');
const drawable = document.querySelector('.drawable-area');
const canRectangle = new CanvasRectangleActions(drawable, inpField);
const canTriangle = new CanvasTriangleActions(drawable, inpField);
const canCircle = new CanvasCircleActions(drawable, inpField);
canRectangle.appendFiguresOnClick(rectangleButton);
canTriangle.appendFiguresOnClick(triangleButton);
canCircle.appendFiguresOnClick(circleButton);

drawable.addEventListener('click', ($event) => {
    if ($event.target.classList.contains('figure')) {
        const el = $event.target;

        if (el.classList.contains('triangle')) {
            el.style.borderBottomColor = 'yellow';
        } else {
            el.style.backgroundColor = 'yellow';
        }
    }
});

drawable.addEventListener('dblclick', ($event) => {
    if ($event.target.classList.contains('figure')) {
        $event.target.remove();
    }
});
