import express from 'express';
import {javascriptTest} from '../test/javascript/javascript_test';
import {htmlTest} from '../test/html/html_test';

const router = express.Router();

router.route('/javascript')
    .get(javascriptTest)

router.route('/html')
    .get(htmlTest)

export default router;

