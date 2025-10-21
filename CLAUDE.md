# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + TypeScript project that demonstrates how to incorporate React components into Jupyter notebooks using AnyWidget. The project creates interactive JSON visualization widgets that can be used in Jupyter environments.

## Key Commands

### Development
- `pnpm install` - Install all dependencies (run once)
- `pnpm run dev` - Build with watch mode for development using esbuild
- `pnpm run build` - Production build using esbuild

### Build Process
The project uses esbuild to bundle React components into ESM format:
- Entry point: `src/widget.tsx`
- Output: `bundle/widget.js` and `bundle/widget.css`
- Format: ESM (ES modules)

## Architecture

### Core Structure
- **src/widget.tsx**: Main entry point that exports the `render` function for AnyWidget integration. This function creates a React root and renders a JSON viewer component using react-json-view.
- **src/index.css**: Contains CSS styling for the JSON viewer, particularly for preserving line breaks in multi-line strings.

### AnyWidget Integration Pattern
The project follows AnyWidget's standard pattern where:
1. The `render` function in `widget.tsx` receives a view object with an `el` property
2. React creates a root on this element and renders the component
3. The function returns a cleanup function that unmounts the React root
4. Widget data is accessed via `view.model.get('trait_name')` for synchronized traits

### Python Widget Integration
The Python AnyWidget class:
- References bundled files: `_esm` and `_css` from `../bundle/`
- Uses traitlets for data synchronization (`json_data`, `theme`)
- Example usage shows JSON data visualization with configurable themes

### Build Output
- `bundle/widget.js`: Bundled JavaScript in ESM format (~1.2MB)
- `bundle/widget.css`: Compiled CSS styles
- These files are referenced by the Python AnyWidget class using `pathlib.Path`

## Development Workflow

1. Modify React components in `src/`
2. Use `pnpm run dev` for development with hot reload
3. The built files in `bundle/` are consumed by the Python AnyWidget
4. Test changes in Jupyter notebooks using the Python widget class

## Key Dependencies

- **react-json-view**: Provides interactive JSON visualization with theme support
- **React 18**: Modern React with createRoot API
- **esbuild**: Fast bundling for development and production

## Current Implementation

The widget currently renders an interactive JSON viewer with:
- Configurable themes (default: 'rjv-default')
- Data type display disabled for cleaner visualization
- Support for multi-line string preservation through custom CSS