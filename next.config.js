/** @type {import('next').NextConfig} */

const DEVELOPMENT = 0;
const PRODUCTION = 1;

// Choose your environment
const CURRENT_ENVIRONMENT = PRODUCTION;

// Development and production export paths
const developmentBasePathUrl = "";
const productionBasePathUrl = "/~ist179089/projects/tsbOfficialDemo";
let basePathUrl = "";

if (CURRENT_ENVIRONMENT === DEVELOPMENT) {
  basePathUrl = developmentBasePathUrl;
} else {
  basePathUrl = productionBasePathUrl;
}

module.exports = {
  env: {
    BASE_PATH: basePathUrl,
  },
  reactStrictMode: true,
  basePath: basePathUrl,
  images: {
    domains: ["tsb.tecnico.ulisboa.pt", "tecnicosolarboat.tecnico.ulisboa.pt"],
    loader: "custom",
  },
};
