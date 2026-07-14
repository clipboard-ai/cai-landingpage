/**
 * Single source of truth for the current Cai release version on this landing page.
 *
 * When shipping a new Cai release, only bump `CAI_VERSION` here. All components
 * (Hero, Navbar, Footer, FooterCTA, DocsSidebar) import from this file and the
 * download URL + version label update together.
 *
 * The appcast.xml in public/ is separate — it's Sparkle's feed and needs the
 * full history of versions, not just the latest.
 */
export const CAI_VERSION = "1.5.3";
export const CAI_DMG_URL = `https://github.com/cai-layer/cai/releases/download/v${CAI_VERSION}/Cai-${CAI_VERSION}-macos.dmg`;
