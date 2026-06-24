/// <reference types="astro/client" />

// @fontsource-variable/* packages are imported for their CSS side effect and ship
// no type declarations; this ambient module keeps `astro check` (strict) happy.
declare module '@fontsource-variable/*';
