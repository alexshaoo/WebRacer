import express from 'express';
import signin from '../auth/signin';
const router = express.Router();

router.route('/signin')
    .post(signin)

export default router;

