import  { Router } from  'express';


const authRouter = Router();

authRouter.post('/sign-up', (req, res) => res.send({title: "SIGN-UP"}));
authRouter.post("/sign-in", (req, res) => res.send({title: "SIGN IN"}));
authRouter.post("/sign-out", (req, res) => res.send({title: "SIGN OUT"}));

export default authRouter;