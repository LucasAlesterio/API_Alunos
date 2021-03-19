import { Router } from 'express';
import { ClassController } from './controller/classController';
import { GradeController } from './controller/gradeController';
import { StudentController } from './controller/studentController';

const studentController = new StudentController();
const classController = new ClassController();
const gradeController = new GradeController();

const router = Router();
router.post('/students', studentController.create);
router.put('/students', studentController.update);
router.delete('/students', studentController.delete);
router.get('/students', studentController.list);

router.post('/classes', classController.create);
router.put('/classes', classController.update);
router.delete('/classes', classController.delete);
router.get('/classes', classController.list);

router.post('/grades',gradeController.create);
router.put('/grades',gradeController.update);
router.delete('/grades',gradeController.delete);
router.get('/grades',gradeController.list);

export { router };