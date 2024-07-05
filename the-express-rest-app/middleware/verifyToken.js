import jwt from 'jsonwebtoken';

export const verifyMiddleware = (req, resp, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        console.log("authorizationHeader", authorizationHeader);
        if(!authorizationHeader){
            return resp.status(401).send();
        }
        else{
            jwt.verify(authorizationHeader, "secretkey", (err) => {

                if(err){
                    resp.status(403).send();
                    return;
                }
                next()
            })
        }
    } catch (error) {
        resp.status(500).send();
    }
}