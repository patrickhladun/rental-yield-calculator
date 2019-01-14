var rentalIncome = '';
var propertyValue = '';
var form = document.getElementById('ryc__form');
var results = document.getElementById('ryc__result');
var inputs = document.querySelectorAll('.currency');

for(var i = 0; i < inputs.length; i++) {

    inputs[i].addEventListener("keyup", function() {
        formatCurrency(this);
    });

}

function formatNumber(n) {
    return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

function formatCurrency(input) {
    var inputValue = input.value;
    var inputLenght = inputValue.length;
    var iCaretPos = input.selectionStart;

    if(inputValue === '') { return };

    if(inputValue.indexOf('.') >= 0) {
        var decimalPosition = inputValue.indexOf('.');

        var leftSide = inputValue.substring(0, decimalPosition);
        var rightSide = inputValue.substring(decimalPosition);

        rightSide = rightSide.substring(0,3);

        leftSide = formatNumber(leftSide);
        rightSide = formatNumber(rightSide);

        inputValue = '£' + leftSide + '.' + rightSide;
    } else {
        inputValue = formatNumber(inputValue);
        inputValue = '£' + inputValue;
    }

    input.value = inputValue;

    var inputUpdatedLength = inputValue.length;
    iCaretPos = inputUpdatedLength - inputLenght + iCaretPos;
    input.setSelectionRange(iCaretPos, iCaretPos);
}

form.addEventListener('submit', function(e) {
    e.preventDefault();

    rentalIncome = form['ryc__rental-income'].value.replace(/[£,]/g, '');
    propertyValue = form['ryc__property-value'].value.replace(/[£,]/g, '');

    console.log(rentalIncome);
    console.log(propertyValue);

    if(rentalIncome <= 0 || propertyValue <= 0 ) {
        results.innerHTML = '0';
    } else {
        var calc;
        calc = (rentalIncome * 52) / propertyValue * 100;
        console.log(calc);
        calc = calc.toFixed(1);
        calc = calc.split('.');
        results.innerHTML = '<p>Rental Yield:</p><p><span class="ryc__result-num">'
            + calc[0]
            + '</span><span class="ryc__result-decimal">. '
            + calc[1]
            + '%</span></p>';
    }
});

