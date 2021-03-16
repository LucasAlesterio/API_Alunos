import { Router } from 'express';
import { ClassController } from './controller/classController';
import { GradeController } from './controller/gradeController';
import { StudentController } from './controller/studentController';

const studentController = new StudentController();
const classController = new ClassController();
const gradeController = new GradeController();

const router = Router();
router.post('/student', studentController.create);
router.put('/student', studentController.update);
router.delete('/student', studentController.delete);
router.get('/student', studentController.list);

router.post('/class', classController.create);
router.put('/class', classController.update);
router.delete('/class', classController.delete);
router.get('/class', classController.list);

router.post('/grade',gradeController.create);
router.put('/grade',gradeController.update);
router.delete('/grade',gradeController.delete);
router.get('/grade',gradeController.list);

export { router };