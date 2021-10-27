const { CompanyService } = require('../../../src/core/services');
const { CompanyRepositoryMock } = require('../../mocks');
const { CompanyModelMock: { company, companies } } = require('../../mocks');

describe("Company Services Test", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })

    it("Should find a company by id", async () => {
        const CompanyRepository = CompanyRepositoryMock;
        CompanyRepository.get.mockReturnValue(company);

        const _companyService = new CompanyService({ CompanyRepository });
        const expected = await _companyService.get(company._id);
        expect(expected).toMatchObject(company);
    });

    it("Should return a company collection", async () => {
        const CompanyRepository = CompanyRepositoryMock;
        CompanyRepository.getAll.mockReturnValue(companies);

        const _companyService = new CompanyService({
            CompanyRepository
        });
        const expected = await _companyService.getAll();
        expect(expected).toMatchObject(companies);
    });

    it("Should update a company by id", async () => {
        const CompanyRepository = CompanyRepositoryMock;
        CompanyRepository.update.mockReturnValue(company);

        const _companyService = new CompanyService({ CompanyRepository });
        const expected = await _companyService.update(company._id, company);
        expect(expected).toMatchObject(company);
    });

    it("Should delete a company by id", async () => {
        const CompanyRepository = CompanyRepositoryMock;
        CompanyRepository.delete.mockReturnValue(true);

        const _companyService = new CompanyService({ CompanyRepository });
        const expected = await _companyService.repository.delete(company._id);
        expect(expected).toEqual(true);
    });
})