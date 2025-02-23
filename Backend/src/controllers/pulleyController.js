"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPulley = exports.getPulleys = void 0;
const Pulley_1 = __importDefault(require("../models/Pulley"));
const getPulleys = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pulleys = yield Pulley_1.default.find();
        res.json(pulleys);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.getPulleys = getPulleys;
const createPulley = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pulley = new Pulley_1.default(req.body);
    try {
        const newPulley = yield pulley.save();
        res.status(201).json(newPulley);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
exports.createPulley = createPulley;
// Add more controller methods as needed
