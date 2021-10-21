const fs = require('fs');
const { Writable } = require('stream');
const sa = require('stream-json/streamers/StreamArray');
const util = require('util');
/**
 * Thease are information based on information
 */
const CATEGORY = ['Underweight', 'Normal weight', 'Overweight', 'Moderately obese', 'Severely obese', 'Very severely obese']
const HEATH_RISK = ['Malnutrition risk', 'Low risk', 'Enhanced risk', 'Medium risk', 'High risk', 'Very high risk']
const BMI_RANGE = [[null, 18.4], [18.5, 24.9], [25, 29.9], [30, 34.9], [35, 39.9], [40, null]];


class PeopleStream {

  constructor(name = 'Overweight', data = './data.json') {
    this.categoryName = name;
    this.jsonStream = sa.withParser();
    this.fileStream = fs.createReadStream(data);
    this.peopleData = {};
    this.category = CATEGORY;
    this.healthRish = HEATH_RISK;
    this.bmiRange = BMI_RANGE;
  }

  rangeCheck(range, bmi) {
    let [start, end] = range;
    let isGreater = true, isSmaller = true;
    if (start) {
      isGreater = start <= bmi;
    }
    if (end) {
      isSmaller = bmi <= end;
    }
    return isGreater && isSmaller;
  }

  generateBMIData(bmi) {
    let index = 0;
    this.bmiRange.every((range, i) => {
      if (this.rangeCheck(range, bmi) === false) {
        return true;
      }
      index = i;
    });
    let data = {
      BMI: bmi,
      Category: this.category[index],
      HealthRish: this.healthRish[index]
    }
    return data;
  }

  calculateBMI(data) {
    let { HeightCm, WeightKg } = data;
    let height = HeightCm / 100;
    let bmi = (WeightKg / (height * height))
    return Math.round((bmi + Number.EPSILON) * 100) / 100;
  }

  parser(data, cb) {
    let newData = { ...data };
    let bmi = this.calculateBMI(newData);
    let bmiData = this.generateBMIData(bmi);
    newData = { ...newData, ...bmiData };
    let tempData = this.peopleData[newData.Category] || [];
    tempData.push(newData);
    this.peopleData[newData.Category] = tempData;
    cb();
  }

  init(cb) {
    let that = this;
    const eltStream = new Writable({
      write({ key, value }, encoding, cb) {
        that.parser(value, cb);
      },
      objectMode: true
    });

    this.fileStream.pipe(this.jsonStream.input);
    this.jsonStream.pipe(eltStream);

    eltStream.on('finish', () => {
      let category = that.categoryName;
      let data = {
        category: category,
        count: (that.peopleData[category] || []).length
      }
      cb(null, data);
    });
  }
}

function peopleData(name, filePath) {
  return new PeopleStream(name, filePath);
}

async function getCount(name = 'Overweight', data = './data.json') {
  let etl = peopleData(name, data);
  try {
    return await util.promisify(etl.init).bind(etl)().catch((err) => { throw err });
  } catch (err) {
    throw err;
  }
}

module.exports = {
  count: getCount,
  peopleData: peopleData
}