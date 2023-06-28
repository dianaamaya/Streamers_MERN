export const streamerMiddleware = (schema) => { 

    return (req, res, next) => { 
    const { error } = schema.validate(req.body); 
    
    if (error == null) { 
      next(); 
    } else { 
      const { details } = error; 
      const message = details.map(i => i.message).join(',');
   
      console.log("error", message); 
     res.status(422).json({ error: message }) } 
    } 
} 