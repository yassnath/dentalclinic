import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { warmupRoutes } from "./warmup-routes.mjs";

function createNextDevCommand(cwd) {
  const nextBin = path.join(cwd, "node_modules", "next", "dist", "bin", "next");
  if (fs.existsSync(nextBin)) {
    return { cmd: process.execPath, args: [nextBin, "dev"] };
  }

  if (process.platform === "win32") {
    return { cmd: "npx.cmd", args: ["next", "dev"], shell: true };
  }
  return { cmd: "npx", args: ["next", "dev"], shell: false };
}

async function main() {
  const cwd = process.cwd();
  const { cmd, args, shell = false } = createNextDevCommand(cwd);
  const child = spawn(cmd, args, {
    cwd,
    env: process.env,
    shell,
    stdio: ["inherit", "pipe", "pipe"],
  });

  let warmed = false;
  let stdoutBuffer = "";
  let detectedBaseUrl = process.env.WARMUP_BASE_URL ?? process.env.APP_URL ?? "http://localhost:3000";

  const handleLine = (line) => {
    const localUrlMatch = line.match(/https?:\/\/localhost:\d+/i);
    if (localUrlMatch?.[0]) {
      detectedBaseUrl = localUrlMatch[0];
    }

    if (warmed) return;
    if (!line.toLowerCase().includes("ready")) return;
    warmed = true;

    // Run warmup asynchronously after dev server is ready.
    setTimeout(() => {
      warmupRoutes(detectedBaseUrl).catch((error) => {
        const message = error instanceof Error ? error.message : String(error);
        console.error(`[warmup] fatal ${message}`);
      });
    }, 200);
  };

  child.stdout.on("data", (chunk) => {
    const text = String(chunk);
    process.stdout.write(text);

    stdoutBuffer += text;
    const lines = stdoutBuffer.split(/\r?\n/);
    stdoutBuffer = lines.pop() ?? "";
    for (const line of lines) {
      if (line.trim().length === 0) continue;
      handleLine(line);
    }
  });
  child.stderr.on("data", (chunk) => {
    process.stderr.write(String(chunk));
  });

  const shutdown = () => {
    if (!child.killed) {
      child.kill("SIGINT");
    }
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);

  child.on("exit", (code, signal) => {
    process.removeListener("SIGINT", shutdown);
    process.removeListener("SIGTERM", shutdown);
    if (signal) {
      process.exit(1);
    }
    process.exit(code ?? 0);
  });
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`[dev-fast] fatal ${message}`);
  process.exit(1);
});
