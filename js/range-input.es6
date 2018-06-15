(() => {
    const rangeHolders = document.querySelectorAll(".rangeHolder");
    for(let a = 0; a < rangeHolders.length; a++){
        let dragging = false;
        const rangeHolder = rangeHolders[a];
        const arrowPointer = rangeHolder.querySelector(".arrowPointerFront");
        const pseudoSlider = rangeHolder.querySelector(".pseudoSlider");
        arrowPointer.addEventListener("click", (event) => {
            let currentValue = parseInt(rangeHolder.dataset.value, 10);
            if(currentValue > 1 && event.offsetX < 20){
                currentValue--;
            }
            if(currentValue < 7 && event.offsetX > 20){
                currentValue++;
            }
            rangeHolder.dataset.value = currentValue;
            triggerIE11(rangeHolder);
        });
        const headers = rangeHolder.querySelectorAll("header");
        for(let b = 0; b < headers.length; b++) {
            headers[b].addEventListener("click", (event) => {
                rangeHolder.dataset.value = parseInt(event.target.textContent, 10);
                triggerIE11(rangeHolder);
            });
        }
        pseudoSlider.addEventListener("mousedown", (event) => {
            const boundingBox = pseudoSlider.getBoundingClientRect();
            const startX = boundingBox.x;
            const startY = boundingBox.y;
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
        pseudoSlider.addEventListener("mouseup", (event) => {
            dragging = false;
            console.log(event);
        });
    }
    const triggerIE11 = (el) => {
        if(!!navigator.userAgent.match(/Trident.*rv\:11\./)){
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
