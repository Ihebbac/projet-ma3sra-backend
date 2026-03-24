"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const all_exceptions_filter_1 = require("./common/filters/all-exceptions.filter");
const path_1 = require("path");
const fs = require("fs");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        cors: {
            origin: '*',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
            credentials: true,
        },
    });
    const uploadsRoot = (0, path_1.join)(process.cwd(), 'uploads');
    const fitouraUploads = (0, path_1.join)(uploadsRoot, 'fitoura');
    if (!fs.existsSync(uploadsRoot)) {
        fs.mkdirSync(uploadsRoot);
    }
    if (!fs.existsSync(fitouraUploads)) {
        fs.mkdirSync(fitouraUploads);
    }
    app.useStaticAssets(uploadsRoot, {
        prefix: '/uploads',
    });
    app.useGlobalFilters(new all_exceptions_filter_1.AllExceptionsFilter());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('ma3sra')
        .setDescription('ma3sra API COllection')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(8170);
}
bootstrap();
//# sourceMappingURL=main.js.map