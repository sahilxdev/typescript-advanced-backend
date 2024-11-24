import express, { Application, Request, Response } from "express";
import { UserService } from "./services/UserService";
import bodyParser from "body-parser";



const app: Application = express();
const PORT = 3000;
const userService = new UserService();

app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript!");
});

app.get("/users", (req, res) => {
  res.json(userService.getUsers());
});

app.post("/users", (req, res) => {
  const { name, email } = req.body;
  const user = userService.createUser(name, email);
  res.status(201).json(user);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
