const typescript = require('@rollup/plugin-typescript');

module.exports = {
  input: 'src/index.tsx',
  output: [
    {
      file: 'dist/index.esm.js',
      format: 'es',
      exports: 'named',
      sourcemap: true,
    },
  ],
  plugins: [typescript()],
  external: [
    'react',
    'react/jsx-runtime',
    '@mui/material',
    '@mui/icons-material',
    '@tiptap/extension-image',
    '@tiptap/extension-link',
    '@tiptap/extension-underline',
    '@tiptap/react',
    '@tiptap/starter-kit',
    '@tiptap/core',
  ],
};
