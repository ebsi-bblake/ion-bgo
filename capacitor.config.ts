import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "io.ionic.bgo",
  appName: "ion-bgo",
  webDir: "docs",
  ios: {
    webContentsDebuggingEnabled: true,
  },
  // server: {
  //   url: "http://localhost:8100",
  //   cleartext: true,
  //   allowNavigation: ["*"],
  // },
};

export default config;
