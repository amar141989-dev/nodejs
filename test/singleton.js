/* global jest, beforeEach */
const { mockDeep, mockReset } = require('jest-mock-extended')
const prisma = require("../db/prisma");
const prismaMock = prisma

jest.mock('../db/prisma', () => mockDeep())

beforeEach(() => {
  mockReset(prismaMock)
})

module.exports = { prismaMock }