import { Router } from 'express';
import { registerUser, loginUserController, updateUserController, deleteUserController, getUsers, getUser} from '../controllers/userController';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUserController);
router.put('/update', updateUserController); 
router.delete('/:userId', deleteUserController); 
router.get('/', getUsers);
router.get('/:userId', getUser); 

export default router;
