function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;
    
    result = input.match(/^([.0-9]+)*([\/]{0,1})([.0-9]+)*([a-zA-Z]+)$/);
    //console.log(result);
    if(result){
      if(!isNaN(result[1]*1) && !result.includes('/')) result = result[1]*1;
      else if(result.includes('/')){
        result = result[1] / result[3];
      }
      else if(result[0]==result[4]){
        result=1;
      }
      else result = null;
    }
    
    return result;
  };
  
  this.getUnit = function(input) {
    let result;

    result = input.match(/[a-zA-Z]+/);
    if(result.length) result = result[0];
    else result = null;
    
    if(result && result.toLowerCase()=='l') result = 'L';
    else if(result) result = result.toLowerCase();

    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    switch(initUnit){
      case 'mi':
        result = 'km';
        break;
      case 'km':
        result = 'mi';
        break;
      case 'gal':
        result = 'L';
        break;
      case 'L':
        result = 'gal';
        break;
      case 'lbs':
        result = 'kg';
        break;
      case 'kg':
        result = 'lbs';
        break;
      default:
        result = null;
    }
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    switch(unit){
      case 'L':
        result = 'liters';
        break;
      case 'gal':
        result = 'gallons';
        break;
      case 'lbs':
        result = 'pounds';
        break;
      case 'kg':
        result = 'kilograms';
        break;
      case 'mi':
        result = 'miles';
        break;
      case 'km':
        result = 'kilometers';
        break;
      default:
        result = null;
    }
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch(initUnit){
      case 'gal':
        result = initNum * galToL;
        break;
      case 'L':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      default:
        result = null;
    }
    if(result) result = result.toFixed(5);
    return result*1;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    if(!returnUnit) return 'invalid unit';
    result = initNum + ' ' + this.spellOutUnit(initUnit) + ' converts to ' + returnNum + ' ' + this.spellOutUnit(returnUnit);
    return result;
  };
  
}

module.exports = ConvertHandler;
