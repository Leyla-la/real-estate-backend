"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateManager = exports.createManager = exports.getManager = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getManager = async (req, res) => {
    try {
        const { cognitoId } = req.params;
        if (!cognitoId) {
            res.status(400).json({ message: "cognitoId is required" });
            return;
        }
        const manager = await prisma.manager.findUnique({
            where: { cognitoId },
        });
        if (manager) {
            res.json(manager);
        }
        else {
            res.status(404).json({ message: "manager not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: `Error retrieving manager: ${error.message}` });
    }
};
exports.getManager = getManager;
const createManager = async (req, res) => {
    try {
        const { cognitoId, name, email, phoneNumber } = req.body;
        const manager = await prisma.manager.create({
            data: {
                cognitoId,
                name,
                email,
                phoneNumber,
            },
        });
        res.status(200).json(manager);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: `Error creating manager: ${error.message}` });
    }
};
exports.createManager = createManager;
const updateManager = async (req, res) => {
    try {
        const { cognitoId } = req.params;
        if (!cognitoId) {
            res.status(400).json({ message: "cognitoId is required" });
            return;
        }
        const { name, email, phoneNumber } = req.body;
        const updateManager = await prisma.manager.update({
            where: { cognitoId },
            data: {
                name,
                email,
                phoneNumber,
            },
        });
        res.json(updateManager);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: `Error updating manager: ${error.message}` });
    }
};
exports.updateManager = updateManager;
//# sourceMappingURL=managerControllers.js.map