"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const maintenanceController_js_1 = require("../controllers/maintenanceController.js");
const router = express_1.default.Router();
router.get('/', maintenanceController_js_1.getMaintenanceLogs);
router.post('/', maintenanceController_js_1.createMaintenanceLog);
exports.default = router;
