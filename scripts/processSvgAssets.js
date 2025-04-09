const fs = require('fs/promises');
const path = require('path');
const { optimize } = require('svgo');

const sourceDir = 'assets/doc/svg';
const targetDemoDir = 'apps/discovery/assets/svg';
const targetWebsiteDir = 'apps/website/src/svg';

const configPluginsFirstPass = [
  {
    name: 'preset-default',
    params: {
      overrides: {
        convertColors: { currentColor: true },
        minifyStyles: true,
        inlineStyles: { onlyMatchedOnce: false },
        convertStyleToAttrs: true
      }
    }
  }
];

async function optimizeSvgFile(assetName) {
  const sourceFile = path.join(sourceDir, assetName);
  const svg = await fs.readFile(sourceFile);
  const resultPass1 = optimize(svg, {
    multipass: true,
    plugins: configPluginsFirstPass
  });
  if (resultPass1.error) {
    throw new Error(resultPass1.error);
  }

  await fs.mkdir(targetDemoDir, { recursive: true }); // 🔧 ensure folders exist
  await fs.mkdir(targetWebsiteDir, { recursive: true });

  await fs.writeFile(path.join(targetDemoDir, assetName), resultPass1.data);
  await fs.writeFile(path.join(targetWebsiteDir, assetName), resultPass1.data);
}

async function run() {
  try {
    const assets = await fs.readdir(sourceDir);
    const targetDemoTasks = assets.map((asset) => optimizeSvgFile(asset));
    await Promise.all(targetDemoTasks);
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.warn(`[svg-optimize] Skipping: Source folder '${sourceDir}' not found.`);
    } else {
      throw err;
    }
  }
}

run().catch((e) => console.error(e));
