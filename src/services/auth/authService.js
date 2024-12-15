const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const logger = require('../../utils/logger');

const prisma = new PrismaClient();

class AuthService {
  async hashPassword(password) {
    return bcrypt.hash(password, 10);
  }

  async comparePasswords(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  }

  generateToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
  }

  async login(email, password) {
    const driver = await prisma.driver.findUnique({ where: { email } });
    if (!driver) {
      throw new Error('Invalid credentials');
    }

    const isValid = await this.comparePasswords(password, driver.password);
    if (!isValid) {
      throw new Error('Invalid credentials');
    }

    const token = this.generateToken({ id: driver.id, email: driver.email });
    logger.info(`Driver logged in: ${driver.id}`);
    
    return { token, driver: { id: driver.id, email: driver.email, name: driver.name } };
  }
}

module.exports = new AuthService();