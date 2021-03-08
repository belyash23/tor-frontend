const options = $.modal.defaults;
options.fadeDuration =  100;
options.fadeDelay = 1.0;
options.closeClass = 'modal-close';





let rotated = false;
function rotate() {
    let deg=180

    if(rotated) {
        deg = 0
        rotated = false;
    }
    else {
        rotated = true;
    }
    $('.support-form__arrow').css('transform', `rotate(${deg}deg)`);
}

$('.support-form__error-type').click(rotate);

$('.support-form__error-type').blur(() => {
    $('.support-form__arrow').css('transform', `rotate(0deg)`);
})

