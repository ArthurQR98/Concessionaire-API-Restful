const DistributorDto = require('./distributor');
class CarDto {
    _id = "";
    company = "";
    model = "";
    sold = "";
    price = "";
    year = "";
    extras = "";
    distributor = DistributorDto;
}

module.exports = CarDto;