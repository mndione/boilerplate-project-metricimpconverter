const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    // #1
    test('input valid number or not', () => {
        assert.isNumber(convertHandler.getNum('1234mi'), '1234 is a whole number');
        assert.isNumber(convertHandler.getNum('12.34mi'), '12.34 is a decimal number');
        assert.isNumber(convertHandler.getNum('12/34mi'), '12/34 is a fractional input');
        assert.isNumber(convertHandler.getNum('12/3.4mi'), '12/3.4 is a fractional input with decimal');
        assert.isNotNumber(convertHandler.getNum('12/3/4mi'), '12/3/4 (double fraction) is not accepted');
        assert.equal(convertHandler.getNum('mi'), 1, '1 is the default value');
    });

    // #2
    test('test valid unit or not', () => {
        assert.equal(convertHandler.getUnit('1234mi'),'mi','get mi unit');
        assert.equal(convertHandler.getUnit('1234km'),'km','get km unit');
        assert.equal(convertHandler.getUnit('1234L'),'L','get L unit');
        assert.equal(convertHandler.getUnit('1234gal'),'gal','get gal unit');
        assert.equal(convertHandler.getUnit('1234lbs'),'lbs','get lbs unit');
        assert.equal(convertHandler.getUnit('1234kg'),'kg','get kg unit');
        assert.isNull(convertHandler.getReturnUnit(convertHandler.getUnit('1234x')),'x is not a valid unit');
        assert.equal(convertHandler.getReturnUnit(convertHandler.getUnit('123mi')),'km','converts mi unit to km unit');
        assert.equal(convertHandler.getReturnUnit(convertHandler.getUnit('123km')),'mi','converts km unit to mi unit');
        assert.equal(convertHandler.getReturnUnit(convertHandler.getUnit('123lbs')),'kg','converts lbs unit to kg unit');
        assert.equal(convertHandler.getReturnUnit(convertHandler.getUnit('123kg')),'lbs','converts kg unit to lbs unit');
        assert.equal(convertHandler.getReturnUnit(convertHandler.getUnit('123gal')),'L','converts gal unit to L unit');
        assert.equal(convertHandler.getReturnUnit(convertHandler.getUnit('123L')),'gal','converts L unit to gal unit');
        assert.equal(convertHandler.spellOutUnit('L'),'liters','Spell out L to liters');
        assert.equal(convertHandler.spellOutUnit('gal'),'gallons','Spell out gal to gallons');
        assert.equal(convertHandler.spellOutUnit('lbs'),'pounds','Spell out lbs to pounds');
        assert.equal(convertHandler.spellOutUnit('kg'),'kilograms','Spell out kg to kilograms');
        assert.equal(convertHandler.spellOutUnit('mi'),'miles','Spell out mi to miles');
        assert.equal(convertHandler.spellOutUnit('km'),'kilometers','Spell out km to kilometers');
    });
});