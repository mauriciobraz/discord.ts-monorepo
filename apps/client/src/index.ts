import "dotenv/config";
import { NODE_ENV } from "./utils/process-env";

export async function main() {
  console.log(`Hello World! I'm running in ${NODE_ENV} mode.`);
}

if (require.main === module) {
  main();
}
