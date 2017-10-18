function cargoNumberValidate(string) {
    const data = string;
    if (typeof(string) != "string"){
        console.log("Input must be a string!")
        return "Input must be a string!";
    }
    
    const registration_number_validate = /^[0-9]+$/;
    const product_group_validate = /[J|U|Z]/;
    const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    const values = [10,12,13,14,15,16,17,18,19,20,21,23,24,25,26,27,28,29,30,31,32,34,35,36,37,38];
    const stringarr = data.toUpperCase().split('');
    var owner_code = stringarr.slice(1, 4);
    var product_group_code = stringarr.slice(3,4);
    var registration_number = stringarr.slice(4, 10);
    const test_reg = registration_number_validate.test(registration_number.join(''));
    const test_product = product_group_validate.test(product_group_code.join(''));
    var check_digit = stringarr.slice(-1).join('');
    var aprefix = stringarr.slice(0, 4);
    var check_calculated = registrationCalc(data); 
  
    if (data.length !== 11) {
        return "Invalid string length, please check the container id and try again.";
    } 
    if (test_product === false){
        return "Product group code must be a J, U, or Z..";
    }
    if (test_reg !== true || registration_number.length !== 6){
        return 'Registration number must be all numbers and be 6 digits long. Zeros may proceed a number to make it 6 digits in length..';
    }

    function registrationCalc(data) {
        const powers = [1,2,4,8,16,32,64,128,256,512];
        let alpha_calc = aprefix.map((element, index) => {
            return values[alphabet.indexOf(element)] * powers[index];
        });
 
        let digit_calc = registration_number.map((element, index) => {
            return element * powers[index + 4];
        });

        let x = alpha_calc.reduce((a, b) => {
            return a + b;
        });

        let y = digit_calc.reduce((a, b) => {
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

cargoNumberValidate("SuDU3070079");