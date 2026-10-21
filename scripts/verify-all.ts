#!/usr/bin/env npx tsx
/** Compatibility entrypoint for the real browser suite. See TEST_INFRA.md. */
import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';

const args = process.argv.slice(2);
const retiredFilter = args.find((arg) => arg.startsWith('--tier=') || arg.startsWith('--milestone='));

if (retiredFilter) {
  console.error(`${retiredFilter} belongs to the retired source-text harness. Use a Playwright file or --grep to select browser journeys; see TEST_INFRA.md.`);
  process.exit(1);
}

// Keep the old JSON switch useful, but return Playwright's actual result format.
const forwarded = args.flatMap((arg) => arg === '--json' ? ['--reporter=json'] : [arg]);
const requireFromProject = createRequire(import.meta.url);
const result = spawnSync(process.execPath, [requireFromProject.resolve('@playwright/test/cli'), 'test', ...forwarded], {
  stdio: 'inherit',
  env: process.env,
});

if (result.error) console.error(result.error.message);
process.exit(result.status ?? 1);
