import { Container } from 'inversify';
import { TYPES } from './types';
import { UserService } from '../services/UserService';
import { AuthService } from '../services/AuthService';
import { CacheService } from '../services/CacheService';

const container = new Container();


container.bind<UserService>(TYPES.UserService).to(UserService).inSingletonScope();
container.bind<AuthService>(TYPES.AuthService).to(AuthService).inSingletonScope();
container.bind<CacheService>(TYPES.CacheService).to(CacheService).inSingletonScope();

export function resolve<T>(symbol: symbol): T {
  return container.get<T>(symbol);
}

export { container };