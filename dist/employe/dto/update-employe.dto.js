"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEmployeDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_employe_dto_1 = require("./create-employe.dto");
class UpdateEmployeDto extends (0, mapped_types_1.PartialType)(create_employe_dto_1.CreateEmployeDto) {
}
exports.UpdateEmployeDto = UpdateEmployeDto;
//# sourceMappingURL=update-employe.dto.js.map