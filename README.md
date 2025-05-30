# gsps-trylogia-companion

A simple companion app to be used with the [main graphics bundle](https://github.com/GramyPomagamy/gsps-trylogia).

Uses [Bun](https://bun.sh/) to compile the code to a EXE in production.

## Setup (Node.js)

1. Install dependencies with `npm install`.
2. Build with `npm run build`.
3. Adjust `config.json` as needed.
4. Setup the included 100% Checklist to only show percentage, and to output it to file.
5. Run with `node index.js`.

## Setup (Bun)

1. Install dependencies with `bun install`.
2. Build with `bun build .\src\index.ts --compile --sourcemap --outfile companion.exe` (if not running on Windows, specify `bun-windows-x64` as target if building for production).
3. Adjust `config.json` as needed.
4. Setup the included 100% Checklist to only show percentage, and to output it to file.
5. Run `companion.exe` (or whatever name you gave the output file).