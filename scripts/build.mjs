import { spawn } from "node:child_process";

function run(command, args) {
  return new Promise((resolve, reject) => {
    const executable = process.platform === "win32" && command === "npx" ? "npx.cmd" : command;
    const child =
      process.platform === "win32"
        ? spawn(process.env.ComSpec || "cmd.exe", ["/d", "/s", "/c", `${executable} ${args.join(" ")}`], {
            stdio: "inherit",
            shell: false,
          })
        : spawn(executable, args, {
            stdio: "inherit",
            shell: false,
          });

    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
        return;
      }
      reject(new Error(`${executable} ${args.join(" ")} failed with exit code ${code ?? "unknown"}`));
    });

    child.on("error", reject);
  });
}

const shouldGeneratePrisma =
  process.platform !== "win32" ||
  process.env.VERCEL === "1" ||
  process.env.CI === "true";

if (shouldGeneratePrisma) {
  await run("npx", ["prisma", "generate"]);
}

await run("npx", ["next", "build"]);
