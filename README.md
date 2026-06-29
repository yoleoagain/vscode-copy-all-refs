# Copy All Reference Paths

A VS Code extension that copies all file paths and line numbers from "Find All References" results.

## Usage

1. **Find all references** - Click on a symbol and press `Shift+F12` (or right-click → "Find All References")
2. **Open Command Palette** - Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (macOS)
3. **Run command** - Type `Copy All Reference Paths` and press Enter

## Example

After finding references to a function, the extension will copy:
```
src/components/Header.tsx:15
src/components/Header.tsx:23
src/utils/helpers.ts:8
src/pages/Home.tsx:42
src/pages/Home.tsx:56
src/services/api.ts:34
```


## Installation

1. Download the `.vsix` file
2. Open VS Code
3. Press `Ctrl+Shift+P` → "Extensions: Install from VSIX..."
4. Select the downloaded file
5. Reload VS Code

## Development

```bash
# Install dependencies
pnpm install

# Compile TypeScript
pnpm run compile

# Watch mode (auto-compile on changes)
pnpm run watch

# Package extension to .vsix file
pnpm run package
# or
vsce package