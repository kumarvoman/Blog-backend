import express from 'express';
import { getAllUser, login , signup } from '../controllers/user-controller.js';

const router = express.Router(); 

router.get("/", getAllUser); //this is the route to get all the users
router.post("/signup", signup); //this is the route to signup
router.post("/login", login); //this is the route to login

export default router;