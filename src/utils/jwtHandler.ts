// import { NextFunction } from "express";
// import { AppError } from "./errorHandler";

// export const authenticateJWT = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const authHeader = req.headers.authorization;

//     if (authHeader) {
//       const token = authHeader.split(" ")[1]; // Bearer <token>

//       jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
//         if (err) {
//           throw new AppError("Forbidden", 403, 1001); // Custom error code
//         }

//         req.user = user;
//         next();
//       });
//     } else {
//       throw new AppError("Unauthorized", 401, 1000); // Custom error code
//     }
//   } catch (error) {
//     handleError(error, res);
//   }
// };
