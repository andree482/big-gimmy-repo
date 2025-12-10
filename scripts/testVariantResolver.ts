import { resolveOptionId } from "../client/src/utils/variantResolver";

const options = [
  { id: 123, flavor: "Frutti di Bosco", size: "75g" },
  { id: 456, flavor: "Cookies Crisp", size: "45g" },
];

const display = "Frutti di Bosco 75g";
const resolved = resolveOptionId(options as any[], display);
console.log(JSON.stringify({ resolved }, null, 2));
