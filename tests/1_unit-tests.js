const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    // #1
    test('whole number', () => {
        assert.isNumber(convertHandler.getNum('1234mi'), '1234 is a whole number');
    });

    // #2
    test('decimal number', () => {
        assert.isNumber(convertHandler.getNum('12.34mi'), '12.34 is a decimal number');
    });

    // #3
    test('fractional number', () => {
        assert.isNumber(convertHandler.getNum('12/34mi'), '12/34 is a fractional input');
    });

    // #4
    test('fractional number with decimal', () => {
        assert.isNumber(convertHandler.getNum('12/3.4mi'), '12/3.4 is a fractional input with decimal');
    });

    // #5
    test('double fractional not accepted', () => {
        assert.isNotNumber(convertHandler.getNum('12/3/4mi'), '12/3/4 (double fraction) is not accepted');
    });

    // #6
    test('default number 1', () => {
        assert.equal(convertHandler.getNum('mi'), 1, '1 is the default value');
    });

    // #7
    test('real valid input unit', () => {
        assert.equal(convertHandler.getUnit('1234mi'),'mi','get mi unit');
        assert.equal(convertHandler.getUnit('1234km'),'km','get km unit');
        assert.equal(convertHandler.getUnit('1234L'),'L','get L unit');
        assert.equal(convertHandler.getUnit('1234gal'),'gal','get gal unit');
        assert.equal(convertHandler.getUnit('1234lbs'),'lbs','get lbs unit');
        assert.equal(convertHandler.getUnit('1234kg'),'kg','get kg unit');
    });

    // #8
    test('error on invalid input unit', () => {
        assert.isNull(convertHandler.getReturnUnit(convertHandler.getUnit('1234x')),'x is not a valid unit');
    });

    // #9
    test('return correct unit to valid input unit', () => {
        assert.equal(convertHandler.getReturnUnit(convertHandler.getUnit('123mi')),'km','converts mi unit to km unit');
        assert.equal(convertHandler.getReturnUnit(convertHandler.getUnit('123km')),'mi','converts km unit to mi unit');
        assert.equal(convertHandler.getReturnUnit(convertHandler.getUnit('123lbs')),'kg','converts lbs unit to kg unit');
        assert.equal(convertHandler.getReturnUnit(convertHandler.getUnit('123kg')),'lbs','converts kg unit to lbs unit');
        assert.equal(convertHandler.getReturnUnit(convertHandler.getUnit('123gal')),'L','converts gal unit to L unit');
        assert.equal(convertHandler.getReturnUnit(convertHandler.getUnit('123L')),'gal','converts L unit to gal unit');
    });

    // #10
    test('spell out correctly', () => {
        assert.equal(convertHandler.spellOutUnit('L'),'liters','Spell out L to liters');
        assert.equal(convertHandler.spellOutUnit('gal'),'gallons','Spell out gal to gallons');
        assert.equal(convertHandler.spellOutUnit('lbs'),'pounds','Spell out lbs to pounds');
        assert.equal(convertHandler.spellOutUnit('kg'),'kilograms','Spell out kg to kilograms');
        assert.equal(convertHandler.spellOutUnit('mi'),'miles','Spell out mi to miles');
        assert.equal(convertHandler.spellOutUnit('km'),'kilometers','Spell out km to kilometers');
    });

    // #11
    test('convert gal to L', () => {
        assert.equal(convertHandler.getReturnUnit('gal'),'L','converts gal unit to L unit');
    });

    // #12
    test('convert L to gal', () => {
        assert.equal(convertHandler.getReturnUnit('L'),'gal','converts L unit to gal unit');
    });

    // #13
    test('convert mi to km', () => {
        assert.equal(convertHandler.getReturnUnit('mi'),'km','converts mi unit to km unit');
    });

    // #14
    test('convert km to mi', () => {
        assert.equal(convertHandler.getReturnUnit('km'),'mi','converts km unit to mi unit');
    });

    // #15
    test('convert lbs to kg', () => {
        assert.equal(convertHandler.getReturnUnit('lbs'),'kg','converts lbs unit to kg unit');
    });

    // #16
    test('convert kg to lbs', () => {
        assert.equal(convertHandler.getReturnUnit('kg'),'lbs','converts kg unit to lbs unit');
    });
});