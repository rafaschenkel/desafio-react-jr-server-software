const { PrismaClient } = require("@prisma/client");

let prisma = new PrismaClient();
const db = prisma;
module.exports = db;
