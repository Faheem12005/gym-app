import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface UserPayload extends JwtPayload {
      userId: string;
    }

    interface Request {
      user?: UserPayload;
    }
  }
}
