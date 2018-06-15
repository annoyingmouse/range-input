"use strict";

(function () {
    var rangeHolders = document.querySelectorAll(".rangeHolder");

    var _loop = function _loop(a) {
        var dragging = false;
        var rangeHolder = rangeHolders[a];
        var arrowPointer = rangeHolder.querySelector(".arrowPointerFront");
        var pseudoSlider = rangeHolder.querySelector(".pseudoSlider");
        arrowPointer.addEventListener("click", function (event) {
            var currentValue = parseInt(rangeHolder.dataset.value, 10);
            if (currentValue > 1 && event.offsetX < 20) {
                currentValue--;
            }
            if (currentValue < 7 && event.offsetX > 20) {
                currentValue++;
            }
            rangeHolder.dataset.value = currentValue;
            triggerIE11(rangeHolder);
        });
        var headers = rangeHolder.querySelectorAll("header");
        for (var b = 0; b < headers.length; b++) {
            headers[b].addEventListener("click", function (event) {
                rangeHolder.dataset.value = parseInt(event.target.textContent, 10);
                triggerIE11(rangeHolder);
            });
        }
        pseudoSlider.addEventListener("mousedown", function (event) {
            var boundingBox = pseudoSlider.getBoundingClientRect();
            var startX = boundingBox.x;
            var startY = boundingBox.y;
            dragging = true;
            // pseudoSlider.addEventListener('mousemove', (event) => {
            //     var pageY = ('pageY' in fix) ? fix.pageY : event.pageY;
            //     if ('startY' in fix) {
            //         startY = fix.startY;
            //     }
            //     if (false === ('skipY' in fix)) {
            //         el.style.top = (pageY - startY) + 'px';
            //     }
            // });

            // dragging = true;
            // var left = el.style.left ? parseInt(el.style.left) : 0;
            // console.log(left)
            // var top = el.style.top ? parseInt(el.style.top) : 0;
            // startX = el.pageX - left;
            // startY = el.pageY - top;
            // console.log(event);
            // window.addEventListener('mousemove', function(){
            //     var fix = {};
            //     var pageY = ('pageY' in fix) ? fix.pageY : event.pageY;
            //     if ('startY' in fix) {
            //         startY = fix.startY;
            //     }
            //     if (false === ('skipY' in fix)) {
            //         el.style.top = (pageY - startY) + 'px';
            //     }
            // });
        });
        pseudoSlider.addEventListener("mouseup", function (event) {
            dragging = false;
            console.log(event);
        });
    };

    for (var a = 0; a < rangeHolders.length; a++) {
        _loop(a);
    }
    var triggerIE11 = function triggerIE11(el) {
        if (!!navigator.userAgent.match(/Trident.*rv\:11\./)) {
            el.classList.add("redraw");
            el.classList.remove("redraw");
        }
    };
})();
// const drag = (event) => {
//     console.log("drag", event);
// };
// const drop = (event) => {
//     console.log("drop", event);
//     event.preventDefault();
//
// };
// const allowDrop = (event) => {
//     console.log("allowDrop", event);
// };
//# sourceMappingURL=range-input.js.map