"use strict";

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
canvas.width = "600";
canvas.height = "400";

class Circle {
    constructor () {

        this.radius = getRandomSize();
        this.x = canvas.width - (canvas.width - this.radius);
        this.y = canvas.height - (canvas.height - this.radius);
        this.color = getRandomColol();
        this.figure = "circle";
        this.speed = 1;
        this.dx = 1;
        this.dy = -1;
        this.show = false
        this.area = Math.PI * Math.pow( this.radius ,2 )
    }
}

class Square {
    constructor () {
        this.width = getRandomSize();
        this.x = 0;
        this.y = 0;
        this.color = getRandomColol();
        this.figure = "square";
        this.speed = 1;
        this.dx = 1;
        this.dy = -1;
        this.show = false
        this.area = Math.pow( this.width,2 )
    }
}

function getRandomSize() {
    let num = Math.round(Math.random() * 50);
    if ( num < 10 ) {
        num += 10
    }
    return num
}

function getRandomColol() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return "rgb(" + r + "," + g + "," + b + ")"
}

let arrFigure = [];
let countSquare = 0;
let countCircle = 0;

(function createFigure () {
    if (Math.random() > 0.5) {
        if(countSquare < 10) {
            arrFigure.push(new Square())
        }
        countSquare++
    } else {
        if( countCircle < 10 ) {
            arrFigure.push(new Circle())
        }
        countCircle++
    }
    if( arrFigure.length !== 20 ) {
        createFigure()
    }
})();

let countFigure = 0;
let showNumber = 1;
function draw() {
    setTimeout( function show() {
        if(countFigure < 20) {
            let elem = arrFigure[countFigure];
            console.log( `${showNumber++}` + ". " + `${elem.figure}` + ", " + `color: ${elem.color}` + ", " + `area: ${elem.area}` )
            if (elem.figure === "circle") {
                context.beginPath();
                context.arc(elem.x, elem.y, elem.radius, 0, Math.PI*2, false);
                context.fillStyle = elem.color;
                context.fill();
                context.closePath();
                elem.show = true;
                countFigure++
            } else {
                context.beginPath();
                context.rect(elem.x, elem.y, elem.width, elem.width);
                context.fillStyle = elem.color;
                context.fill();
                context.closePath();
                elem.show = true;

                countFigure++
            }
            draw()
        } else {
            clearTimeout()
        }
    }, 5000 )
}
draw();

function moveFigure() {
    requestAnimationFrame( function () {
        context.clearRect(0, 0, canvas.width, canvas.height);
        for ( let item of arrFigure) {
            if ( item.show === true ) {
                if( item.figure === "circle" ) {
                    item.x += item.dx;
                    item.y += item.dy;
                    if( item.y + item.dy < item.radius || item.y + item.dy > canvas.height - item.radius) {
                        item.dy = -item.dy
                    }
                    if( item.x + item.dx < item.radius || item.x + item.dx > canvas.width - item.radius) {
                        item.dx = -item.dx
                    }
                    context.beginPath();
                    context.arc(item.x, item.y, item.radius, 0, Math.PI*2, false);
                    context.fillStyle = item.color;
                    context.fill();
                    context.closePath();
                } else {
                    item.x += item.dx;
                    item.y += item.dy;
                    if( item.y < 0  || item.y > canvas.height - item.width ) {
                        item.dy = -item.dy
                    }
                    if ( item.x < 0 || item.x > canvas.width - item.width) {
                        item.dx = -item.dx
                    }
                    context.beginPath();
                    context.rect(item.x, item.y, item.width, item.width);
                    context.fillStyle = item.color;
                    context.fill();
                    context.closePath();
                }
            }
        }
        moveFigure()
    })
}

moveFigure();
