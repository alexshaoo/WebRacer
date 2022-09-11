import express from 'express';
import userCtrl from '../api/user';
import roomCtrl from '../api/room';
const router = express.Router();

router.route('/user')
    .get(userCtrl.getUser)
    .post(userCtrl.postUser)
    .put(userCtrl.putUser)
    .delete(userCtrl.deleteUser)

router.route('/room')
    .get(roomCtrl.getRoom)
    .post(roomCtrl.postRoom)
    .put(roomCtrl.putRoom)
    .delete(roomCtrl.deleteRoom)

export default router;

