const { CompanyRepository } = require('../../../src/core/domian/repositories');
const mockingoose = require('mockingoose');
const { Company } = require('../../../src/core/domian/models');
let { CompanyModelMock: { company, companies } } = require('../../mocks');

describe("Company Repository Test", () => {
    beforeEach(() => {
        mockingoose.resetAll();
        jest.clearAllMocks();
    });

    it("Should return a company by id", async () => {
        const _company = { ...company };
        mockingoose(Company).toReturn(company, "findOne");
        const _companyRepository = new CompanyRepository({ Company });
        const expected = await _companyRepository.get(_company._id);

        expect(JSON.parse(JSON.stringify(expected))).toMatchObject(_company);
    });

    it("Should return a company collection", async () => {
        companies = companies.map(company => {
            return company;
        });

        mockingoose(Company).toReturn(companies, "find");
        const _companyRepository = new CompanyRepository({ Company });
        const expected = await _companyRepository.getAll();
        expect(JSON.parse(JSON.stringify(expected))).toMatchObject(companies);
    });

    it("Should update an especific company by id", async () => {
        const _company = { ...company };
        mockingoose(Company).toReturn(_company, "findOneAndUpdate");
        const _companyRepository = new CompanyRepository({ Company });
        const expected = await _companyRepository.update(_company._id, {
            name: "Mercedez",
            country: "Alemania"
        });

        expect(JSON.parse(JSON.stringify(expected))).toMatchObject(_company);
    });

    it("Should delete an especific company by id", async () => {
        mockingoose(Company).toReturn(company, "findOneAndDelete");
        const _companyRepository = new CompanyRepository({ Company });
        const expected = await _companyRepository.delete(company._id);
        expect(JSON.parse(JSON.stringify(expected))).toEqual(true);
    });
})