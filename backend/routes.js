const router = require('express').Router();
const authController = require("./controllers/auth-controller")
const activateController = require("./controllers/activate-controller");
const authMiddleware = require('./middlewares/auth-middleware');
const roomsController = require('./controllers/rooms-controller');

router.post('/api/send-otp',authController.sendOtp)
router.post('/api/verify-otp',authController.verifyOtp)
router.post('/api/activate',authMiddleware,activateController.activate)
router.get('/api/refresh',authController.refresh)
router.post("/api/logout",authMiddleware,authController.logout)
router.post("/api/createroom",authMiddleware, roomsController.create)
router.get("/api/getAllRooms",authMiddleware, roomsController.fetch)
router.post("/api/getRoom",authMiddleware, roomsController.fetchRoomTopic)

module.exports = router;