var rentalIncome;
var propertyValue;
var form = document.getElementById('ryc__form');
var results = document.getElementById('ryc__result');

form.addEventListener("keypress", function(e) {
    if (e.keyCode === 46) {
        e.preventDefault();
    }
});

form.addEventListener('submit', function(e) {
    e.preventDefault();
    rentalIncome = form['ryc__rental-income'].value;
    propertyValue = form['ryc__property-value'].value;

    if(rentalIncome <= 0 || propertyValue <= 0 ) {
        results.innerHTML = '0';
    } else {
        var calc;
        calc = (rentalIncome / propertyValue) * 100;
        calc = calc.toFixed(1);
        results.innerHTML = calc + '%';
    }

});


