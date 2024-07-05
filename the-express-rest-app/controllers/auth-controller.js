import express, {Router} from 'express';
import jwt from 'jsonwebtoken';

export const authRouter = Router();


authRouter.use(express.json());
authRouter.post('/login', (req, res) => {

    const user = req.body;
    try {
        
        if(user.username === 'abc' && user.password === 'abc'){
                jwt.sign({name: user.username}, "secretkey", {expiresIn: '10m'}, (err, token) => {
                    if(err){
                        res.status(500).send();
                        return;
                    }
                    res.json({accessToken: token});
                })
        }
        else{
            res.status(401).send();
        }

    } catch (error) {
        res.status(500).send();
    }
})
