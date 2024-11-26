import { eventEmitter } from '../events/eventEmitter';
import { USER_EVENTS } from '../events/userEvents';

export class NotificationService {
  constructor() {
    this.registerListeners();
  }

  private registerListeners() {
    eventEmitter.on(USER_EVENTS.REGISTERED, this.sendWelcomeEmail);
    eventEmitter.on(USER_EVENTS.LOGIN, this.logUserLogin);
    eventEmitter.on(USER_EVENTS.PASSWORD_RESET, this.sendPasswordResetNotification);
  }

  private sendWelcomeEmail(user: any) {
    console.log(`Sending welcome email to ${user.email}`);
    // Implement email sending logic
  }

  private logUserLogin(user: any) {
    console.log(`User logged in: ${user.email} at ${new Date().toISOString()}`);
  }

  private sendPasswordResetNotification(user: any) {
    console.log(`Password reset notification sent to ${user.email}`);
  }
}