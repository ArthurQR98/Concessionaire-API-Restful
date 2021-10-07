const { createContainer, asValue, asClass, asFunction } = require('awilix');
// config
const config = require('../infrastructure/config');
const app = require('.');
// services 
const { HomeService, CompanyService, CarService, DistributorService, UserService, AuthService, SaleService } = require('../core/services');
// controllers
const { HomeController, CompanyController, CarController, DistributorController, AuthController, UserController, SaleController } = require('../app/controllers');
// routes
const { HomeRoutes, CompanyRoutes, CarRoutes, DistributorRoutes, AuthRoutes, UserRoutes, SaleRoutes } = require('../app/routes/index.routes');
// models
const { Company, Car, User } = require('../core/domian/models');
const { DistributorModel } = require('../core/domian/models/distributor');
const { SaleModel } = require('../core/domian/models/sale');
// repository
const { CompanyRepository, CarRepository, DistributorRepository, UserRepository, SaleRepository } = require('../core/domian/repositories');

const Routes = require('../app/routes');
const container = createContainer();

container
    .register({
        app: asClass(app).singleton(),
        router: asFunction(Routes).singleton(),
        config: asValue(config)
    })
    .register({
        AuthService: asClass(AuthService).singleton(),
        CarService: asClass(CarService).singleton(),
        CompanyService: asClass(CompanyService).singleton(),
        DistributorService: asClass(DistributorService).singleton(),
        HomeService: asClass(HomeService).singleton(),
        SaleService: asClass(SaleService).singleton(),
        UserService: asClass(UserService).singleton(),
    })
    .register({
        AuthController: asClass(AuthController.bind(AuthController)).singleton(),
        CarController: asClass(CarController.bind(CarController)).singleton(),
        CompanyController: asClass(CompanyController.bind(CompanyController)).singleton(),
        DistributorController: asClass(DistributorController.bind(DistributorController)).singleton(),
        HomeController: asClass(HomeController.bind(HomeController)).singleton(),
        SaleController: asClass(SaleController.bind(SaleController)).singleton(),
        UserController: asClass(UserController.bind(UserController)).singleton(),
    })
    .register({
        AuthRoutes: asFunction(AuthRoutes).singleton(),
        CarRoutes: asFunction(CarRoutes).singleton(),
        CompanyRoutes: asFunction(CompanyRoutes).singleton(),
        DistributorRoutes: asFunction(DistributorRoutes).singleton(),
        HomeRoutes: asFunction(HomeRoutes).singleton(),
        SaleRoutes: asFunction(SaleRoutes).singleton(),
        UserRoutes: asFunction(UserRoutes).singleton(),
    }).register({
        Car: asValue(Car),
        Company: asValue(Company),
        Distributor: asValue(DistributorModel),
        Sale: asValue(SaleModel),
        User: asValue(User),
    }).register({
        CarRepository: asClass(CarRepository).singleton(),
        CompanyRepository: asClass(CompanyRepository).singleton(),
        DistributorRepository: asClass(DistributorRepository).singleton(),
        SaleRepository: asClass(SaleRepository).singleton(),
        UserRepository: asClass(UserRepository).singleton(),
    });

module.exports = container;