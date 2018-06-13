(function(){
    // Date inputs
    const dateInputs = document.querySelectorAll("input[type='date']");
    // Mask input
    const dateInputMask = function dateInputMask(elm) {
        elm.addEventListener('keyup', function(e) {
            const target = e.target;
            const ddmmyyyy = /(0[1-9]|[12][0-9]|3[01])[\/](0[1-9]|1[012])[\/](19|20)\d\d/;
            if(e.keyCode < 47 || e.keyCode > 57) {
                e.target.value = e.target.value.substr(0, e.target.value.length - 1);
            }
            const len = elm.value.length;
            if(len !== 1 || len !== 3) {
                if(e.keyCode == 47) {
                    e.preventDefault();
                }
            }
            if(len === 2) {
                elm.value += '/';
            }
            if(len === 5) {
                elm.value += '/';
            }
            if(len > 10){
                e.target.value = e.target.value.substr(0, 10);
            }
            if(elm.value.match(ddmmyyyy)){
                console.log(elm.value);
            }
        });
    };

    // Check for browsers which don't support date input (IE11 and Safari)
    const el = document.createElement("input");
    const invalidVal = "foo";
    el.setAttribute("type", "date");
    el.style.visibility = "hidden";
    el.setAttribute("value", invalidVal);
    if(el.value === invalidVal){
        for (let i = 0; i < dateInputs.length; i++) {
            dateInputs[i].setAttribute("placeholder", "dd/mm/yyyy");
            dateInputMask(dateInputs[i]);
        }
    }else{
        for (let i = 0; i < dateInputs.length; i++) {
            dateInputs[i].addEventListener("change", function(e){
                const val = e.target.value;
                const dateVal = new Date(val);
                
            });
        }
    }
    // Remove the check input
    // document.body.removeChild(el);
})();