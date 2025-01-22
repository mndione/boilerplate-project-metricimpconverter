const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    this.timeout(5000);

    // #1
    test('Test GET /api/convert?input=10L', function (done) {
        chai
          .request(server)
          .keepOpen()
          .get('/api/convert?input=10L')
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, '{"initNum":10,"initUnit":"L","returnNum":2.6417217685798895,"returnUnit":"gal","string":"10 liters converts to 2.6417217685798895 gallons"}');
            done();
          });
      });
    
     // #2
     test('Test GET /api/convert?input=32g', function (done) {
        chai
          .request(server)
          .keepOpen()
          .get('/api/convert?input=32g')
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, "invalid unit");
            done();
          });
      });

     // #3
     test('Test GET /api/convert?input=3/7.2/4kg', function (done) {
        chai
          .request(server)
          .keepOpen()
          .get('/api/convert?input=3/7.2/4kg')
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, "invalid number");
            done();
          });
      });

       // #3
     test('Test GET /api/convert?input=3/7.2/4kilomegagram', function (done) {
        chai
          .request(server)
          .keepOpen()
          .get('/api/convert?input=3/7.2/4kilomegagram')
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.equal(res.text, "invalid number and unit");
            done();
          });
      });
});
