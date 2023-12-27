import path from "path";
import { fileURLToPath } from "url";

const _filename = fileURLToPath(import.meta.url)

const _dirname = path.dirname(_filename)

export default _dirname