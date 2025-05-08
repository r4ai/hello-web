import { $ } from "bun";
import * as fs from "node:fs/promises";

const REPO_NAME = "hello-web";

// ensure `dist` directory exists
await fs.rm("dist", { recursive: true, force: true });
await fs.mkdir("dist", { recursive: true });

// build the slides
await $`bun run slidev build --base=/${REPO_NAME}/slides/ --out=dist/slides`;

// build the app
await $`bun run --cwd=app vite build --base=/${REPO_NAME}/app/ --outDir=../dist/app --emptyOutDir`;
