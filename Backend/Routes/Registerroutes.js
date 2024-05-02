import express from "express";
import { Login, Register,  vote, getVote } from "../Controller/Register.js";
const router=express.Router();
router.post('/register',Register)
router.post('/login',Login)
router.post('/voting',vote)

router.get('/get-vote',getVote)
export default router;