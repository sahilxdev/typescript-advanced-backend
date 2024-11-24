import { UserService } from "../src/services/UserService";

describe("UserService", () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService();
  });

  it("should create a new user", () => {
    const user = userService.createUser("John Doe", "john@example.com");
    expect(user).toEqual({ id: 1, name: "John Doe", email: "john@example.com" });
  });

  it("should retrieve all users", () => {
    userService.createUser("John Doe", "john@example.com");
    const users = userService.getUsers();
    expect(users.length).toBe(1);
  });
});
