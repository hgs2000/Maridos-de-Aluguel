window.onload = function () {
    materializeControls();
}

function materializeControls() {
    materializeTextInputs();
}

function materializeTextInputs() {
    var label, parentEl;
    document.querySelectorAll('input[type="text"], textarea').forEach(function (control) {
        parentEl = control.parentElement;
        control.classList.add('mdl-textfield__input');
        if (parentEl.tagName !== 'DIV') {
            return;
        }
        parentEl.classList.add('mdl-textfield', 'mdl-js-textfield');
        label = parentEl.querySelector('label');
        if (label) {
            label.setAttribute('for', control.id || control.name)
            label.classList.add('mdl-textfield__label');
        }
    });
}