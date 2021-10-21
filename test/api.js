let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
chai.use(chaiHttp);
// chai.use(should);

describe('API Test', () => {
  describe('/GET :category', () => {
    
    it('it should not GET BMI count', (done) => {
      chai.request(server)
        .get('/underweight1')
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });

    it('it should GET a Underweight BMI count', (done) => {
      chai.request(server)
        .get('/underweight')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('result');
          res.body.result.should.have.property('category');
          res.body.result.should.have.property('count');
          res.body.result.category.should.be.equal('Underweight');
          res.body.result.count.should.be.equal(1);
          done();
        })
    });

    it('it should GET a Normal weight BMI count', (done) => {
      chai.request(server)
        .get('/normal_weight')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('result');
          res.body.result.should.have.property('category');
          res.body.result.should.have.property('count');
          res.body.result.category.should.be.equal('Normal weight');
          res.body.result.count.should.be.equal(1);
          done();
        })
    });

    it('it should GET a Overweight BMI count', (done) => {
      chai.request(server)
        .get('/overweight')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('result');
          res.body.result.should.have.property('category');
          res.body.result.should.have.property('count');
          res.body.result.category.should.be.equal('Overweight');
          res.body.result.count.should.be.equal(1);
          done();
        })
    });

    it('it should GET a Moderately obese BMI count', (done) => {
      chai.request(server)
        .get('/moderately_obese')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('result');
          res.body.result.should.have.property('category');
          res.body.result.should.have.property('count');
          res.body.result.category.should.be.equal('Moderately obese');
          res.body.result.count.should.be.equal(1);
          done();
        })
    });

    it('it should GET a Severely obese BMI count', (done) => {
      chai.request(server)
        .get('/severely_obese')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('result');
          res.body.result.should.have.property('category');
          res.body.result.should.have.property('count');
          res.body.result.category.should.be.equal('Severely obese');
          res.body.result.count.should.be.equal(1);
          done();
        })
    });

    it('it should GET a Very severely obese BMI count', (done) => {
      chai.request(server)
        .get('/very_severely_obese')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('result');
          res.body.result.should.have.property('category');
          res.body.result.should.have.property('count');
          res.body.result.category.should.be.equal('Very severely obese');
          res.body.result.count.should.be.equal(1);
          done();
        })
    });

  });
});

