import { existsSync, readFileSync } from "fs";
import * as path from "path";

type Config = {
  completionFile: string;
  port: number;
};

export function loadConfig(): Config {
  const possiblePaths = [
    path.join(process.cwd(), "config.json"),
    path.join(path.dirname(process.execPath), "config.json"),
    path.join(__dirname, "config.json"),
    "./config.json"
  ];

  const configPath = possiblePaths.find(testPath => existsSync(testPath));

  if (!configPath) {
    console.error("Config file not found. Searched in:");
    possiblePaths.forEach(p => console.error(`  - ${p}`));
    process.exit(1);
  }

  console.log(`Loading config from: ${configPath}`);

  try {
    const configData = readFileSync(configPath, "utf8");
    const config = JSON.parse(configData) as Config;

    if (!config.completionFile || typeof config.port !== "number") {
      throw new Error("Invalid config: missing completionFile or port");
    }

    if (!path.isAbsolute(config.completionFile)) {
      config.completionFile = path.resolve(path.dirname(configPath), config.completionFile);
    }

    return config;
  } catch (error) {
    console.error(`Failed to load config: ${error}`);
    process.exit(1);
  }
};
