// import adapter from '@sveltejs/adapter-auto'
import adapter from '@sveltejs/adapter-cloudflare'
import preprocess from 'svelte-preprocess'
import { image } from './image-preprocessor/index.cjs'
import svg from '@poppanator/sveltekit-svg'

const svgPlugin = svg({
  includePaths: ['./src/assets/', './src/lib/shared/assets'],
  svgoOptions: {
    multipass: true,
    plugins: [
      'removeXMLNS',
      'minifyStyles',
      'removeDimensions',
      'prefixIds',
      'convertStyleToAttrs',
      {
        name: 'preset-default',
        params: {
          overrides: {
            removeViewBox: false,
            removeUselessStrokeAndFill: false,
            removeUnknownsAndDefaults: false,
            cleanupIDs: false,
          },
        },
      },
      // { name: 'removeAttrs', params: { attrs: '(fill|stroke)' } },
    ],
  },
})

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    preprocess({
      postcss: true,
      typescript: true,
    }),
    image(
      {
        optimizeAll: false, // optimize all images discovered in img tags

        // Case insensitive. Only files whose extension exist in this array will be
        // processed by the <img> tag (assuming `optimizeAll` above is true). Empty
        // the array to allow all extensions to be processed. However, only jpegs and
        // pngs are explicitly supported.
        imgTagExtensions: ['jpg', 'jpeg', 'png'],

        // Same as the above, except that this array applies to the Image Component.
        // If the images passed to your image component are unknown, it might be a
        // good idea to populate this array.
        componentExtensions: [],

        inlineBelow: 10000, // inline all images in img tags below 10kb

        compressionLevel: 1, // png quality level

        quality: 100, // jpeg/webp quality level

        tagName: 'Image', // default component name

        sizes: [
          Math.floor(640 * 1.3),
          Math.floor(768 * 1.3),
          Math.floor(1024 * 1.3),
          Math.floor(1280 * 1.3),
          Math.floor(1536 * 1.3),
          Math.floor(2560 * 1.3),
        ], // array of sizes for srcset in pixels

        // array of screen size breakpoints at which sizes above will be applied
        breakpoints: [640, 768, 1024, 1280, 1536, 2560],

        outputDir: 'g/',

        // should be ./static for Sapper and ./public for plain Svelte projects
        publicDir: './static/',

        placeholder: 'blur', // or "trace",

        // WebP options [sharp docs](https://sharp.pixelplumbing.com/en/stable/api-output/#webp)
        webpOptions: {
          quality: 100,
          lossless: true,
          smartSubsample: true,
          // effort: 6,
          force: true,
        },

        webp: true,

        // Potrace options for SVG placeholder
        trace: {
          background: '#fff',
          color: '#002fa7',
          threshold: 120,
        },

        // Whether to download and optimize remote images loaded from a url
        optimizeRemote: true,

        //
        // Declared image folder processing
        //
        // The options below are only useful if you'd like to process entire folders
        // of images, regardless of whether or not they appear in any templates in
        // your application (in addition to all the images that are found at build
        // time). This is useful if you build dynamic strings to reference images you
        // know should exist, but that cannot be determined at build time.

        // Relative paths (starting from `/static`) of folders you'd like to process
        // from top to bottom. This is a recursive operation, so all images that match
        // the `processFoldersExtensions` array will be processed. For example, an
        // array ['folder-a', 'folder-b'] will process all images in
        // `./static/folder-a/` and `./static/folder-b`.
        processFolders: [],

        // When true, the folders in the options above will have all subfolders
        // processed recursively as well.
        processFoldersRecursively: false,

        // Only files with these extensions will ever be processed when invoking
        // `processFolders` above.
        processFoldersExtensions: ['jpeg', 'jpg', 'png'],

        // Add image sizes to this array to create different asset sizes for any image
        // that is processed using `processFolders`
        processFoldersSizes: false,
      },
      preprocess({
        postcss: true,
        typescript: true,
      }),
    ),
  ],
  kit: {
    adapter: adapter(),

    vite: {
      plugins: [
        //@ts-ignore
        svgPlugin,
      ],
    },
  },
}

export default config
