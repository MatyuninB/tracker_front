/** @type {import("snowpack").SnowpackUserConfig } */
import fs from "fs";

const cert = fs.readFileSync('cert/cert.pem');
const key = fs.readFileSync('cert/key.pem');

export default {
  alias: {
    src: "./src"
  },
  mount: {
    public: { url: '/', static: true },
    src: { url: '/dist' },
  },
  plugins: [
    '@snowpack/plugin-postcss',
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-dotenv',
    [
      '@snowpack/plugin-typescript',
      {
        /* Yarn PnP workaround: see https://www.npmjs.com/package/@snowpack/plugin-typescript */
        ...(process.versions.pnp ? { tsc: 'yarn pnpify tsc' } : {}),
      },
    ],
  ],
  routes: [
    /* Enable an SPA Fallback in development: */
    {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
  optimize: {
    /* Example: Bundle your final build: */
    // "bundle": true,
  },
  packageOptions: {
    /* ... */
  },
  devOptions: {
    secure: {cert, key},
    hostname: 'tracker.ru'
  },
  buildOptions: {
    /* ... */
  },
};
