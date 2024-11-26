import Queue from 'bull';
import { Job } from 'bull';

export interface EmailJob {
  to: string;
  subject: string;
  body: string;
}

export class JobProcessor {
  private emailQueue: Queue.Queue;

  constructor() {
    this.emailQueue = new Queue('email-queue', {
      redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379')
      }
    });

    this.registerProcessors();
  }

  private registerProcessors() {
    this.emailQueue.process(async (job: Job<EmailJob>) => {
      try {
        await this.sendEmail(job.data);
        return { success: true };
      } catch (error) {
        throw new Error(`Email send failed: ${error}`);
      }
    });
  }

  private async sendEmail(jobData: EmailJob): Promise<void> {
    // Simulate email sending
    console.log(`Sending email to ${jobData.to}`);
    console.log(`Subject: ${jobData.subject}`);
    console.log(`Body: ${jobData.body}`);
    
    // In a real implementation, use a service like SendGrid, Mailgun, etc.
  }

  async addEmailJob(emailJob: EmailJob) {
    await this.emailQueue.add(emailJob, {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 1000
      }
    });
  }
}