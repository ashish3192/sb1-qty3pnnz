const asyncHandler = require('../../utils/asyncHandler');
const authService = require('../../services/auth/authService');
const { ValidationError } = require('../../utils/errors');

const authController = {
  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.json(result);
  }),

  register: asyncHandler(async (req, res) => {
    const { password, ...driverData } = req.body;
    const hashedPassword = await authService.hashPassword(password);
    
    const driver = await prisma.driver.create({
      data: { ...driverData, password: hashedPassword },
      select: {
        id: true,
        email: true,
        name: true
      }
    });
    
    const token = authService.generateToken({ id: driver.id, email: driver.email });
    res.status(201).json({ token, driver });
  })
};

module.exports = authController;