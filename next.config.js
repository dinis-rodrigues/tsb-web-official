/** @type {import('next').NextConfig} */

// Development and production export paths
const developmentBasePathUrl = "";
// const productionBasePathUrl = "/~ist179089/projects/tsbOfficialDemo";
const productionBasePathUrl = "";
let basePathUrl = "";

if (process.env.NODE_ENV === "development") {
  console.log(process.env.NODE_ENV);
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
  },
};
