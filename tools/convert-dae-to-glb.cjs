const fs = require("fs");
const path = require("path");
const assimpjsFactory = require("assimpjs");

const root = path.resolve(__dirname, "..");
const sourceDae = path.join(root, "Maison_Roubaix_RDC_v07.dae");
const textureDir = path.join(root, "Maison_Roubaix_RDC_v07");
const outDir = path.join(root, "Assets", "Model");
const outGlb = path.join(outDir, "maison-roubaix-rdc-v07.glb");

function resolveVirtualFile(fileName) {
  const normalized = fileName.replaceAll("\\", "/").replace(/^\.?\//, "");
  const candidates = [
    path.join(root, normalized),
    path.join(root, "Maison_Roubaix_RDC_v07", normalized),
    path.join(textureDir, path.basename(normalized))
  ];
  return candidates.find((candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile());
}

async function main() {
  if (!fs.existsSync(sourceDae)) {
    throw new Error(`Missing source DAE: ${sourceDae}`);
  }
  if (!fs.existsSync(textureDir)) {
    throw new Error(`Missing texture directory: ${textureDir}`);
  }

  console.log("Loading assimpjs...");
  const assimpjs = await assimpjsFactory();
  console.log("Reading source DAE...");
  const daeContent = fs.readFileSync(sourceDae);
  console.log(`Converting ${sourceDae} (${daeContent.length} bytes)...`);
  const result = assimpjs.ConvertFile(
    "Maison_Roubaix_RDC_v07.dae",
    "glb2",
    daeContent,
    (fileName) => Boolean(resolveVirtualFile(fileName)),
    (fileName) => fs.readFileSync(resolveVirtualFile(fileName))
  );
  console.log("Conversion returned.");
  if (!result.IsSuccess()) {
    throw new Error(result.GetErrorCode());
  }

  fs.mkdirSync(outDir, { recursive: true });
  let wrote = false;
  for (let index = 0; index < result.FileCount(); index += 1) {
    const file = result.GetFile(index);
    const name = file.GetPath();
    const content = Buffer.from(file.GetContent());
    if (name.toLowerCase().endsWith(".glb")) {
      fs.writeFileSync(outGlb, content);
      wrote = true;
      console.log(`Wrote ${outGlb} (${content.length} bytes)`);
    } else {
      const target = path.join(outDir, `maison-roubaix-rdc-v07-${name}`);
      fs.writeFileSync(target, content);
      console.log(`Wrote auxiliary ${target} (${content.length} bytes)`);
    }
  }

  if (!wrote) {
    throw new Error("Conversion completed but did not produce a .glb file.");
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
