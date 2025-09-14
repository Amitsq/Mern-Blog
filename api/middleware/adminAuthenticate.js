// import jwt from 'jsonwebtoken'

// export const adminAuthenticate = async(req, res, next) =>{
//    try {
//      const token = req.cookies.access_token
//     if(!token){
//        return next(403,'Unauthorized')
//     }

//     const decodeToken = jwt.verify(token,process.env.JWT_SECRET)
//     if(decodeToken.role ==='admin'){
//         req.user = decodeToken
//         next()
//     }else{
//         return next(403,'Unauthorized')
//     }
    
//    } catch (error) {
//         next(500,error.message)
//    }
// }

import jwt from 'jsonwebtoken'

export const adminAuthenticate = async (req, res, next) => {
  try {
    const token = req.cookies.access_token
    if (!token) {
      return res.status(403).json({ message: 'Unauthorized: No token' })
    }

    const decodeToken = jwt.verify(token, process.env.JWT_SECRET)
    if (decodeToken.role === 'admin') {
      req.user = decodeToken
      next()
    } else {
      return res.status(403).json({ message: 'Unauthorized: Not admin' })
    }
  } catch (error) {
    console.error('JWT Error:', error)
    return res.status(401).json({ message: 'Invalid or expired token' })
  }
}
