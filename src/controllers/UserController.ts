import { inject, injectable } from 'inversify';
import { TYPES } from '../config/types';
import { UserService } from '../services/UserService';
import { AuthService } from '../services/AuthService';

@injectable()
export class UserController {
  constructor(
    @inject(TYPES.UserService) private userService: UserService,
    @inject(TYPES.AuthService) private authService: AuthService
  ) {}

  async registerUser(email: string, password: string) {
    // Use services with dependency injection
    return this.authService.register(email, password);
  }
}