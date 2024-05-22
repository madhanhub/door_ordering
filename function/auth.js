const jsonwebtoken = require("jsonwebtoken");

const authorization = function (req,res,next){
    console.log(req.headers)
    const authHeader = req.headers['authorization']
    const token  = authHeader && authHeader.split(' ')[1]
   //const token = req.params.token
//    console.log(authHeader)
//    console.log("********")
   if(token==null) return res.sendStatus(401)
   try {
       let tokengen =  jsonwebtoken.verify(token,process.env.SECRET);
       //console.log(tokenResult.iat)
         
       if (tokengen) {
           req.id=tokengen.id
           req._name=tokengen.a_name
           req.a_mailId=tokengen.a_mailId
           
           
        //    req.u_id=tokengen.u_id
           //req.post=tokengen.post
           next()  
       } else {
           res.status(500).json({
               message:"Something wrong"
           })
       }  
   } catch (error) {
       return res.status(401).json({
        message:error.message
    });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
   }
   
   
};
module.exports = authorization;
