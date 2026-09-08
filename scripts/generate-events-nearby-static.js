"use strict";

const fs = require("node:fs/promises");
const path = require("node:path");

const rootDir = path.resolve(__dirname, "..");
process.env.AIRBNB_LIVRET_RUNTIME_DIR ||= path.join(rootDir, ".runtime");
process.env.EVENTS_FORCE_REFRESH ||= "1";

const { ensureConfig, getEventsNearby } = require("../server.js");

async function main() {
  const config = ensureConfig();
  const outputDir = path.join(rootDir, "api");
  await fs.mkdir(outputDir, { recursive: true });

  const locations = Object.keys(config.locations || {});
  const index = {
    updatedAt: new Date().toISOString(),
    defaultLocation: config.defaultLocation,
    locations: {}
  };

  for (const locationKey of locations) {
    const payload = await getEventsNearby(locationKey);
    index.locations[locationKey] = `events-nearby-${encodeURIComponent(locationKey)}.json`;
    await fs.writeFile(
      path.join(outputDir, index.locations[locationKey]),
      `${JSON.stringify(payload, null, 2)}\n`,
      "utf8"
    );
  }

  await fs.writeFile(
    path.join(outputDir, "events-nearby.json"),
    `${JSON.stringify(index, null, 2)}\n`,
    "utf8"
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
