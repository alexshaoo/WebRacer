import express from 'express';
import postJavascript from '../code/javascript';
import postPython from '../code/python';
import postHtml from '../code/html';
const router = express.Router();

router.route('/javascript')
    .post(postJavascript)

router.route('/html')
    .post(postHtml)

router.route('/python')
    .post(postPython)

export default router;

