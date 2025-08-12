import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { encodeChar, decodeChar } from "./lib/tokenizers/char.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const vocabPath = path.join(__dirname, "public", "vocab.json");

fs.mkdirSync(path.dirname(vocabPath), { recursive: true });

const vocab = JSON.parse(fs.readFileSync(vocabPath, "utf8"));

const args = process.argv.slice(2).reduce((acc, arg) => {
  const [key, value] = arg.split("=");
  if (key && value !== undefined) acc[key] = value;
  return acc;
}, {});

if (args.encode) {
  const encoded = encodeChar(args.encode, vocab);
  console.log("Tokens:", encoded.tokens);
  console.log("IDs:", encoded.ids);

} else if (args.decode) {
  const ids = args.decode
    .split(/[\s,]+/)
    .map(Number)
    .filter((n) => Number.isFinite(n));
  console.log("Decoded:", decodeChar(ids, vocab));

} else {
  console.log(
    'Usage:\n  node tokenizer-cli.js encode="your text"\n  node tokenizer-cli.js decode="0,1,2"'
  );
}
