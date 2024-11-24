export class UserService {
    private users: { id: number; name: string; email: string }[] = [];
  
    getUsers() {
      return this.users;
    }
  
    createUser(name: string, email: string) {
      const newUser = { id: this.users.length + 1, name, email };
      this.users.push(newUser);
      return newUser;
    }
  }
  