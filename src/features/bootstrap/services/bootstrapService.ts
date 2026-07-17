export interface BootstrapConfig {
  maintenance: boolean;
  minimum_version: string;
  latest_version: string;
  force_update: boolean;
  feature_flags: Record<string, boolean>;
  support: string;
  server_time: string;
}
export async function fetchBootstrapConfig(): Promise<{ success: boolean; data: BootstrapConfig }> {
  return new Promise((resolve) => setTimeout(() => resolve({
    success: true,
    data: {
      maintenance: false,
      minimum_version: "1.0.0",
      latest_version: "1.0.0",
      force_update: false,
      feature_flags: {},
      support: "support@blintzy.com",
      server_time: new Date().toISOString()
    }
  }), 800));
}