import { Router } from 'express';
import {
	aliasTopTours,
	getAllTours,
	getTour,
	getTourStats,
	createTour,
	updateTour,
	deleteTour,
} from '../controllers/tourController.js';

const router = Router();

// router.param('id', checkID);
router.route('/top-5-cheap').get(aliasTopTours, getAllTours);
router.route('/tour-stats').get(getTourStats);
router.route('/').get(getAllTours).post(createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

export default router;
