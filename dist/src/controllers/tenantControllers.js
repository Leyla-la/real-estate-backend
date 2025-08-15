"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTenant = exports.createTenant = exports.getTenant = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getTenant = async (req, res) => {
    try {
        const { cognitoId } = req.params;
        if (!cognitoId) {
            res.status(400).json({ message: "cognitoId is required" });
            return;
        }
        const tenant = await prisma.tenant.findUnique({
            where: { cognitoId },
            include: {
                favorites: true,
            }
        });
        if (tenant) {
            res.json(tenant);
        }
        else {
            res.status(404).json({ message: "Tenant not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: `Error retrieving tenant: ${error.message}` });
    }
};
exports.getTenant = getTenant;
const createTenant = async (req, res) => {
    try {
        const { cognitoId, name, email, phoneNumber } = req.body;
        const tenant = await prisma.tenant.create({
            data: {
                cognitoId,
                name,
                email,
                phoneNumber,
            },
        });
        res.status(200).json(tenant);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: `Error creating tenant: ${error.message}` });
    }
};
exports.createTenant = createTenant;
const updateTenant = async (req, res) => {
    try {
        const { cognitoId } = req.params;
        if (!cognitoId) {
            res.status(400).json({ message: "cognitoId is required" });
            return;
        }
        const { name, email, phoneNumber } = req.body;
        const updateTenant = await prisma.tenant.update({
            where: { cognitoId },
            data: {
                name,
                email,
                phoneNumber,
            },
        });
        res.json(updateTenant);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: `Error updating tenant: ${error.message}` });
    }
};
exports.updateTenant = updateTenant;
//# sourceMappingURL=tenantControllers.js.map