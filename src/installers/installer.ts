export interface Installer {
  install(version: string): Promise<void>;
}
