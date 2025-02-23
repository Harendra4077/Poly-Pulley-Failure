"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pulleyController_1 = require("../controllers/pulleyController");
const router = express_1.default.Router();
router.get('/', pulleyController_1.getPulleys);
router.post('/', pulleyController_1.createPulley);
exports.default = router;
