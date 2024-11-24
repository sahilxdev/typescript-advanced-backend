import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

export function validateInput(dtoClass: any) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const input = plainToInstance(dtoClass, req.body);

    validate(input).then((errors) => {
      if (errors.length > 0) {
        res.status(400).json({
          message: "Validation failed",
          errors: errors.map((err) => err.constraints),
        });
      } else {
        next();
      }
    }).catch((error) => {
      next(error);
    });
  };
}
