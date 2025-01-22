'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    const input = req.query.input;
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    
    if(!initNum && !returnUnit) res.send('invalid number and unit');
    if(!initNum) res.send('invalid number');
    if(!returnUnit) res.send('invalid unit');

    const returnNum = convertHandler.convert(initNum, initUnit);

    const data = {
      initNum: initNum*1,
      initUnit,
      returnNum,
      returnUnit,
      string: convertHandler.getString(initNum*1, initUnit, returnNum, returnUnit)
    };
    res.json(data);
  });
};
