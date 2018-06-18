'use strict';

// https://tc39.github.io/ecma262/#sec-array.prototype.find
if (!Array.prototype.find) {
    Object.defineProperty(Array.prototype, 'find', {
        value: function value(predicate) {
            // 1. Let O be ? ToObject(this value).
            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }

            var o = Object(this);

            // 2. Let len be ? ToLength(? Get(O, "length")).
            var len = o.length >>> 0;

            // 3. If IsCallable(predicate) is false, throw a TypeError exception.
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }

            // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
            var thisArg = arguments[1];

            // 5. Let k be 0.
            var k = 0;

            // 6. Repeat, while k < len
            while (k < len) {
                // a. Let Pk be ! ToString(k).
                // b. Let kValue be ? Get(O, Pk).
                // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
                // d. If testResult is true, return kValue.
                var kValue = o[k];
                if (predicate.call(thisArg, kValue, k, o)) {
                    return kValue;
                }
                // e. Increase k by 1.
                k++;
            }

            // 7. Return undefined.
            return undefined;
        },
        configurable: true,
        writable: true
    });
}

(function () {
    var rangeHolders = document.querySelectorAll(".rangeHolder");
    var triggerChange = function triggerChange(element) {
        var legends = element.querySelectorAll(".legend");
        var value = parseInt(element.dataset.value, 10) + 1;
        if (!!navigator.userAgent.match(/Trident.*rv\:11\./)) {
            element.classList.add("redraw");
            element.classList.remove("redraw");
        }
        for (var a = 0; a < legends.length; a++) {
            if (parseInt(legends[a].className.split(' ').find(function (c) {
                return (/legend-\d/.test(c)
                );
            }).replace(/^\D+/g, ''), 10) < value) {
                legends[a].classList.remove("deselected");
            } else {
                legends[a].classList.add("deselected");
            }
        }
    };

    var _loop = function _loop(a) {

        var dragging = false;
        var startX = null;
        var startY = null;

        var rangeHolder = rangeHolders[a];
        var arrowPointer = rangeHolder.querySelector(".arrowPointerFront");
        var sliderHolder = rangeHolder.querySelector(".sliderHolder");
        var pseudoSlider = rangeHolder.querySelector(".pseudoSlider");
        var pseudoDrag = rangeHolder.querySelector(".pseudoDrag");
        triggerChange(rangeHolder);
        arrowPointer.addEventListener("click", function (event) {
            event.stopPropagation();
            var currentValue = parseInt(rangeHolder.dataset.value, 10);
            if (currentValue > 1 && event.offsetX < 20) {
                currentValue--;
            }
            if (currentValue < 7 && event.offsetX > 20) {
                currentValue++;
            }
            rangeHolder.dataset.value = currentValue.toString();;
            triggerChange(rangeHolder);
        });
        var headers = rangeHolder.querySelectorAll("header");
        for (var b = 0; b < headers.length; b++) {
            headers[b].addEventListener("click", function (event) {
                rangeHolder.dataset.value = parseInt(event.target.textContent, 10);
                triggerChange(rangeHolder);
            });
        }

        var mouseUp = function mouseUp(event) {
            pseudoDrag.parentNode.parentNode.removeEventListener('mousemove', mouseMove);
            sliderHolder.removeAttribute("style");
            rangeHolder.dataset.value = Math.round(event.clientX / 140).toString();
            triggerChange(rangeHolder);
        };
        var mouseMove = function mouseMove(event) {
            sliderHolder.style.left = event.clientX + 'px';
            rangeHolder.dataset.value = Math.round(event.clientX / 140).toString();
            triggerChange(rangeHolder);
        };
        var mouseDown = function mouseDown(event) {
            pseudoDrag.parentNode.parentNode.addEventListener('mousemove', mouseMove);
            pseudoDrag.parentNode.parentNode.addEventListener('mouseup', mouseUp);
        };
        console.log(pseudoDrag);
        pseudoDrag.addEventListener("mousedown", mouseDown);
    };

    for (var a = 0; a < rangeHolders.length; a++) {
        _loop(a);
    }
})();
//# sourceMappingURL=range-input.js.map