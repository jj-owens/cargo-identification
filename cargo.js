function cargoNumberValidate(string) {
     //print the string used
     console.log(string);
    //set variables to be validated
    var owner_code = string.split('').splice(0, 3);
    var product_group_code = string.split('').splice(3, 1);
    var product_group_validate = /[J|U|Z]/;
    var registration_number = string.split('').splice(4, 6);
    var registration_number_validate = /^[0-9]+$/;
    var check_digit = string.split('').splice(-1, 1).join('');
    var reg = string.split(',').splice(0, 10);
    console.log('the reg is ' + reg);
    console.log(owner_code);
    console.log(product_group_code);
    console.log(registration_number);
    console.log(registration_number.length);
    //validate the string is 11 places long, if not send error message, can change this to a switch statement?
    if (string.length !== 11){
        console.log('invalid string length, please check the container id and try again.');
    } else {
        console.log('container id is correct length');
    }
    if (owner_code.join('') == /[A-Z]/) {
        console.log('owner code must have all capital letters. Please check container id and try again');
    } else {
        console.log('owner code in correct format.');
    }
    if (product_group_validate.test(product_group_code.join('')) === false){
        console.log("product group code must be a J, U, or Z");
    } else {
        console.log('product group code is in correct format.');
    }
    if (registration_number_validate.test(registration_number.join('')) === true && registration_number.length === 6){
        console.log('registration number is in the correct format');
    } else {
        console.log('registration number is must be all numbers and be 6 digits long, zeros may proceed a number to make it 6 digits in length.')
    }
    var check_calculated = registrationCalc(string); 
    function registrationCalc(string) {
        console.log(string + 'here is the strong')
        //set variables for calculations
        var aprefix = string.split('').splice(0, 4);
        var registernum = string.split('').splice(4, 6);
        var alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
        var values = [10,12,13,14,15,16,17,18,19,20,21,23,24,25,26,27,28,29,30,31,32,34,35,36,37,38]
        var alpha_calc = [];
        var digit_calc = [];
    
        //calculate alphabet values of id number
        function position_alpha(){
            aprefix.forEach(function(element, index) {
                alpha_calc.push(values[alphabet.indexOf(element)] * Math.pow(2, index));
         }, this);
         console.log(alpha_calc);
        }
        //calculate registration number portion of id
        function position_digit(){
            console.log(registernum);
            registernum.forEach(function(element, index){
                digit_calc.push(element * Math.pow(2, index + 4));
            }, this);
        console.log(digit_calc);
        }
        //calculate values of the id
        position_alpha();
        position_digit();
        var x = alpha_calc.reduce(function(a, b){
            return a + b;
        });
        var y = digit_calc.reduce(function(a, b){
            return a + b;
        }); 
        var sum = x + y;
        return sum - (Math.floor(sum / 11) * 11);
    }


    //check if the check digit is valid after calculations
    if(check_digit == check_calculated){
        console.log('Congratulations, this is a valid container id!');
    } else {
        console.log('Unfotunately, the container id did not pass validation. Check console log for errors.');
    }
}





cargoNumberValidate("SUDU3070079");



