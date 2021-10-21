const { expect } = require('chai');
const { count, peopleData } = require('../src/etl');
const path = require('path');
let peopleInstance = peopleData();

describe('Process pepople data', () => {

  describe('Calculate BMI', () => {
    it('should be correct BMI', () => {
      let data = { HeightCm: 175, WeightKg: 75};
      let bmi = peopleInstance.calculateBMI(data);
      expect(bmi).to.equal(24.49);
    });
    it('should not be correct BMI', () => {
      let data = { HeightCm: 175, WeightKg: 75};
      let bmi = peopleInstance.calculateBMI(data);
      expect(bmi).to.not.equal(24.48);
    });
  });

  describe('Validate Category based on BMI range', () => {
    describe('valid range', () => {
      it('should be Underweight', () => {
        let result1 = peopleInstance.generateBMIData(18.4);
        let result2 = peopleInstance.generateBMIData(1);
        expect(result1.Category).to.equal('Underweight');
        expect(result2.Category).to.equal('Underweight');
      });
      it('should be Normal weight', () => {
        let result1 = peopleInstance.generateBMIData(18.5);
        let result2 = peopleInstance.generateBMIData(24.9);
        expect(result1.Category).to.equal('Normal weight');
        expect(result2.Category).to.equal('Normal weight');
      });
      it('should be Overweight', () => {
        let result1 = peopleInstance.generateBMIData(25);
        let result2 = peopleInstance.generateBMIData(29.9);
        expect(result1.Category).to.equal('Overweight');
        expect(result2.Category).to.equal('Overweight');
      });

      it('should be Moderately obese', () => {
        let result1 = peopleInstance.generateBMIData(30);
        let result2 = peopleInstance.generateBMIData(34.9);
        expect(result1.Category).to.equal('Moderately obese');
        expect(result2.Category).to.equal('Moderately obese');
      });
      it('should be Severely obese', () => {
        let result1 = peopleInstance.generateBMIData(35);
        let result2 = peopleInstance.generateBMIData(39.9);
        expect(result1.Category).to.equal('Severely obese');
        expect(result2.Category).to.equal('Severely obese');
      });
      it('should be Very severely obese', () => {
        let result1 = peopleInstance.generateBMIData(40);
        expect(result1.Category).to.equal('Very severely obese');
      });
    });
    describe('Invalid range', () => {
      it('should not be Underweight', () => {
        let result1 = peopleInstance.generateBMIData(18.5);
        let result2 = peopleInstance.generateBMIData(20);
        expect(result1.Category).to.not.equal('Underweight');
        expect(result2.Category).to.not.equal('Underweight');
      });
      it('should not be Normal weight', () => {
        let result1 = peopleInstance.generateBMIData(25);
        expect(result1.Category).to.not.equal('Normal weight');
      });

      it('should not be Overweight', () => {
        let result1 = peopleInstance.generateBMIData(30);
        expect(result1.Category).to.not.equal('Overweight');
      });

      it('should not be Moderately obese', () => {
        let result1 = peopleInstance.generateBMIData(35);
        expect(result1.Category).to.not.equal('Moderately obese');
      });

      it('should not be Severely obese', () => {
        let result1 = peopleInstance.generateBMIData(40);
        expect(result1.Category).to.not.equal('Severely obese');
      });
      it('should not be Very severely obese', () => {
        let result1 = peopleInstance.generateBMIData(6);
        expect(result1.Category).to.not.equal('Very severely obese');
      });
    });
  });

  describe('Validate Heath Risk based on BMI range', () => {
    describe('valid range', () => {
      it('should be Malnutrition risk', () => {
        let result1 = peopleInstance.generateBMIData(18.4);
        let result2 = peopleInstance.generateBMIData(1);
        expect(result1.HealthRish).to.equal('Malnutrition risk');
        expect(result2.HealthRish).to.equal('Malnutrition risk');
      });
      it('should be Low risk', () => {
        let result1 = peopleInstance.generateBMIData(18.5);
        let result2 = peopleInstance.generateBMIData(24.9);
        expect(result1.HealthRish).to.equal('Low risk');
        expect(result2.HealthRish).to.equal('Low risk');
      });
      it('should be Enhanced risk', () => {
        let result1 = peopleInstance.generateBMIData(25);
        let result2 = peopleInstance.generateBMIData(29.9);
        expect(result1.HealthRish).to.equal('Enhanced risk');
        expect(result2.HealthRish).to.equal('Enhanced risk');
      });

      it('should be Medium risk', () => {
        let result1 = peopleInstance.generateBMIData(30);
        let result2 = peopleInstance.generateBMIData(34.9);
        expect(result1.HealthRish).to.equal('Medium risk');
        expect(result2.HealthRish).to.equal('Medium risk');
      });
      it('should be High risk', () => {
        let result1 = peopleInstance.generateBMIData(35);
        let result2 = peopleInstance.generateBMIData(39.9);
        expect(result1.HealthRish).to.equal('High risk');
        expect(result2.HealthRish).to.equal('High risk');
      });
      it('should be Very high risk', () => {
        let result1 = peopleInstance.generateBMIData(40);
        expect(result1.HealthRish).to.equal('Very high risk');
      });
    });
    describe('Invalid range', () => {
      it('should not be Malnutrition risk', () => {
        let result1 = peopleInstance.generateBMIData(18.5);
        let result2 = peopleInstance.generateBMIData(20);
        expect(result1.HealthRish).to.not.equal('Malnutrition risk');
        expect(result2.HealthRish).to.not.equal('UnderweMalnutrition riskight');
      });
      it('should not be Low risk', () => {
        let result1 = peopleInstance.generateBMIData(25);
        expect(result1.HealthRish).to.not.equal('Low risk');
      });

      it('should not be Enhanced risk', () => {
        let result1 = peopleInstance.generateBMIData(30);
        expect(result1.HealthRish).to.not.equal('Enhanced risk');
      });

      it('should not be Medium risk', () => {
        let result1 = peopleInstance.generateBMIData(35);
        expect(result1.HealthRish).to.not.equal('Medium risk');
      });

      it('should not be High risk', () => {
        let result1 = peopleInstance.generateBMIData(40);
        expect(result1.HealthRish).to.not.equal('High risk');
      });
      it('should not be Very high risk', () => {
        let result1 = peopleInstance.generateBMIData(6);
        expect(result1.HealthRish).to.not.equal('Very high risk');
      });
    });
  });

  describe('Validate parsed data counts based on BMI Category', () => {
    it('should return valid count', async() => {
      let res = [];
      res[0] = await count('Overweight', path.join(__dirname , 'data.json'));
      res[1] = await count('Underweight', path.join(__dirname , 'data.json'));
      res[2] = await count('Normal weight', path.join(__dirname , 'data.json'));
      res[3] = await count('Moderately obese', path.join(__dirname , 'data.json'));
      res[4] = await count('Severely obese', path.join(__dirname , 'data.json'));
      res[5] = await count('Very severely obese', path.join(__dirname , 'data.json'));
      let resultCount = res.map( r => r.count);
      expect(resultCount).to.eql([1,1,1,1,1,1])
    });
  });
});
