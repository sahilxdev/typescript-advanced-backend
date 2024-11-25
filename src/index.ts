import express, { Application, Request, Response } from "express";
import { UserService } from "./services/UserService";
import bodyParser from "body-parser";
import { loggingMiddleware } from "./middlewares/loggingMiddleware";
import { errorHandler } from "./middlewares/errorHandler";
import { validateInput } from "./utils/validateInput";
import { UserDTO } from "./dtos/UserDTO";



const app: Application = express();
const PORT = 3000;
const userService = new UserService();

app.use(bodyParser.json());
app.use(errorHandler);
app.use(loggingMiddleware);


app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript!");
});

app.get("/users", (req: Request, res: Response) => {
  res.json(userService.getUsers());
});

app.post("/users", ((req: Request, res: Response) => {
  const { name, email } = req.body;
  const user = userService.createUser(name, email);
  res.status(201).json(user);
}));

app.get("/error", ((req: Request, res: Response) => {
  throw new Error("Test error!");
}));

app.post("/users", validateInput(UserDTO), ((req: Request, res: Response) => {
  const { name, email } = req.body;
  const user = userService.createUser(name, email);
  res.status(201).json(user);
}));


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
