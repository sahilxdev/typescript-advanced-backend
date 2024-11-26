import LaunchDarkly from 'launchdarkly-node-server-sdk';

export class FeatureFlagService {
  private client: LaunchDarkly.LDClient;
  private static instance: FeatureFlagService;

  private constructor() {
    this.client = LaunchDarkly.init(process.env.LAUNCHDARKLY_SDK_KEY || '');
  }

  public static async getInstance(): Promise<FeatureFlagService> {
    if (!this.instance) {
      this.instance = new FeatureFlagService();
      await this.instance.client.waitForInitialization();
    }
    return this.instance;
  }

  async isFeatureEnabled(
    flagKey: string, 
    user: LaunchDarkly.LDUser, 
    defaultValue: boolean = false
  ): Promise<boolean> {
    return this.client.variation(flagKey, user, defaultValue);
  }

  async getFeatureFlagVariation<T>(
    flagKey: string, 
    user: LaunchDarkly.LDUser, 
    defaultValue: T
  ): Promise<T> {
    return this.client.variation(flagKey, user, defaultValue);
  }
}


export async function featureFlagMiddleware(req: Request, res: Response, next: NextFunction) {
  const featureFlagService = await FeatureFlagService.getInstance();
  
  const user: LaunchDarkly.LDUser = {
    key: req.user?.id.toString() || 'anonymous',
    email: req.user?.email
  };

  req.featureFlags = {
    newUserRegistration: await featureFlagService.isFeatureEnabled('new-user-registration', user),
    betaFeatures: await featureFlagService.getFeatureFlagVariation('beta-features', user, [])
  };

  next();
}