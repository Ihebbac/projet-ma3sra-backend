"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const users_module_1 = require("./apis/users/users.module");
const courses_module_1 = require("./apis/courses/courses.module");
const auth_module_1 = require("./apis/auth/auth.module");
const category_module_1 = require("./apis/category/category.module");
const role_module_1 = require("./apis/role/role.module");
const clients_module_1 = require("./client/clients.module");
const prop_module_1 = require("./proprietaire/prop.module");
const fitoura_module_1 = require("./fitoura/fitoura.module");
const employe_module_1 = require("./employe/employe.module");
const prop_module_2 = require("./transactions/prop.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot("mongodb+srv://ihebbaccouch1999_db_user:zBw4eO4ppBq5XYeq@cluster0.fo8llat.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"),
            auth_module_1.AuthModule, users_module_1.UsersModule, courses_module_1.CoursesModule, category_module_1.CategoryModule, role_module_1.RoleModule, clients_module_1.ClientsModule, prop_module_1.ProprietairesModule, fitoura_module_1.FitouraModule, employe_module_1.EmployeModule, prop_module_2.TransactionsModule,
        ]
    })
], AppModule);
//# sourceMappingURL=app.module.js.map