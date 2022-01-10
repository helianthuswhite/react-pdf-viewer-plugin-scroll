/**
 * @file rollup.config.js
 * @author helianthuswhite(hyz19960229@gmail.com)
 */

import typescript from '@rollup/plugin-typescript';

export default {
    input: 'src/index.tsx',
    output: {
        exports: 'named',
        file: 'dist/index.js',
        format: 'cjs',
    },
    external: ['react', 'react-dom', '@react-pdf-viewer/core', 'react-custom-scrollbars'],
    plugins: [typescript()],
};
