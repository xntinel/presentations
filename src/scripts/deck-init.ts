// Client entry for every deck: initializes reveal.js and wires the fullscreen
// control (the floating button rendered by DeckNav.astro, plus the F key).
// Imported once from RevealLayout.astro's <script>.
import Reveal from 'reveal.js';
import Notes from 'reveal.js/plugin/notes';
import Search from 'reveal.js/plugin/search';
import Zoom from 'reveal.js/plugin/zoom';

// --- Fullscreen: floating button + F key as a toggle ------------------
// reveal.js ships F, but only to ENTER (you exit with Esc). Here F
// toggles enter/exit and shares logic with the button.
// Vendor-prefixed Fullscreen API (Safari/iOS) typed as optional, so the
// feature checks below are meaningful (iOS Safari has no element fullscreen).
type FullscreenApiElement = {
  requestFullscreen?: (options?: FullscreenOptions) => Promise<void>;
  webkitRequestFullscreen?: () => Promise<void> | void;
};
type FullscreenApiDocument = {
  fullscreenElement: Element | null;
  webkitFullscreenElement?: Element | null;
  exitFullscreen?: () => Promise<void>;
  webkitExitFullscreen?: () => Promise<void> | void;
};
const fsRoot = document.documentElement;
const fsApi = fsRoot as unknown as FullscreenApiElement;
const fsDoc = document as unknown as FullscreenApiDocument;
const requestFs = fsApi.requestFullscreen ?? fsApi.webkitRequestFullscreen;

function isFullscreen() {
  return !!(fsDoc.fullscreenElement || fsDoc.webkitFullscreenElement);
}
function toggleFullscreen() {
  if (isFullscreen()) {
    const exit = fsDoc.exitFullscreen ?? fsDoc.webkitExitFullscreen;
    exit?.call(document);
  } else {
    requestFs?.call(fsRoot);
  }
}

const deck = new Reveal({
  plugins: [Notes, Search, Zoom],

  // Logical canvas: the content scales to any screen.
  width: 1280,
  height: 720,
  margin: 0.06,
  minScale: 0.2,
  maxScale: 2.0,

  hash: true, // the URL reflects the slide (deep-linking)
  autoSlide: 0, // no auto-advance: the speaker controls the pace
  loop: false,
  slideNumber: false,
  controls: false, // no on-screen arrows: keyboard-only navigation
  progress: true,
  center: true,
  transition: 'fade', // none | fade | slide | convex | concave | zoom
  backgroundTransition: 'fade',
  overview: true,

  // Override the native F (enter-only) with an enter/exit toggle.
  keyboard: {
    70: () => toggleFullscreen(), // 70 = F key
  },
});

deck.initialize();

// --- Fullscreen item: same toggle as the F key ------------------------
// The menu expansion (hover/focus) is handled by CSS; here only the
// fullscreen action and the icon/state synchronization.
const fsBtn = document.getElementById('fs-toggle');
if (fsBtn && requestFs) {
  fsBtn.addEventListener('click', () => {
    toggleFullscreen();
    // Drop focus so the menu collapses after the action and so that
    // Space/Enter do not re-trigger the button instead of advancing.
    fsBtn.blur();
  });
  const sync = () => {
    const on = isFullscreen();
    fsBtn.classList.toggle('is-fullscreen', on);
    fsBtn.setAttribute('aria-pressed', String(on));
    fsBtn.setAttribute(
      'title',
      on ? 'Salir de pantalla completa (F)' : 'Pantalla completa (F)',
    );
  };
  document.addEventListener('fullscreenchange', sync);
  document.addEventListener('webkitfullscreenchange', sync);
} else if (fsBtn) {
  // Browser without the Fullscreen API (e.g. iPhone): hide just this item.
  fsBtn.hidden = true;
}
