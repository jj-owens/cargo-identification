function cargoNumberValidate(string) {
    if (typeof(string) != "String"){
        console.log("Input must be a string!")
        return "Input must be a string!";
    } else {
        string.toUpperCase();
    }
    
    const registration_number_validate = /^[0-9]+$/;
    const product_group_validate = /[J|U|Z]/;
    const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    const values = [10,12,13,14,15,16,17,18,19,20,21,23,24,25,26,27,28,29,30,31,32,34,35,36,37,38]
    var owner_code = string.split('').slice(1, 4);
    var product_group_code = string.split('').slice(3,4);
    var registration_number = string.split('').slice(4, 10);
    var check_digit = string.split('').slice(-1).join('');
    var aprefix = string.split('').slice(0, 4);
    var check_calculated = registrationCalc(string); 
  
    if (string.length !== 11){
        return "Invalid string length, please check the container id and try again.";
    } else {
        //return 'Container id is correct length..'; 
    }
    if (owner_code.join('') == /[A-Z]/) {
        //return 'Owner code must have all capital letters. Please check container id and try again..';
    } else {
        //return 'Owner code in correct format..';
    }
    if (product_group_validate.test(product_group_code.join('')) === false){
        //return "Product group code must be a J, U, or Z..";
    } else {
        //return 'Product group code in correct format..';
    }
    if (registration_number_validate.test(registration_number.join('')) === true && registration_number.length === 6){
       //return 'Registration number in the correct format..';
    } else {
        return 'Registration number must be all numbers and be 6 digits long. Zeros may proceed a number to make it 6 digits in length..';
    }


    function registrationCalc(string) {
        const powers = [1,2,4,8,16,32,64,128,256,512];
        let alpha_calc = aprefix.map(function(element, index){
            return values[alphabet.indexOf(element)] * powers[index];
        });
 
        let digit_calc = registration_number.map(function(element, index){
            return element * powers[index + 4];
        });

        let x = alpha_calc.reduce(function(a, b){
            return a + b;
        });

        let y = digit_calc.reduce(function(a, b){
            return a + b;
        }); 

        let sum = x + y;
        return sum - (Math.floor(sum / 11) * 11);
    }

    if (check_digit == check_calculated) {
        console.log("success");
        return 'Check digit matches calculation. Congratulations, this is a valid container id!';
    } else {
        return 'Unfotunately, the container id did not pass validation. Check console log for errors.';
    }
}

cargoNumberValidate(123);