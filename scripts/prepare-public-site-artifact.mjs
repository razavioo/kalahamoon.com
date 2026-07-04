import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const outputDir = join(process.cwd(), "out");
const customDomain = process.env.PUBLIC_SITE_CUSTOM_DOMAIN || "kalahamoon.com";

await mkdir(outputDir, { recursive: true });
await writeFile(join(outputDir, ".nojekyll"), "");
await writeFile(join(outputDir, "CNAME"), `${customDomain}\n`);
