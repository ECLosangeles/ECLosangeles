export { ANNUAL_REPORTS, BYLAWS, FINANCIALS } from './documents';
export type { DocumentEntry, DocumentLibrary } from './documents';
export { EVENT_GALLERIES, findGalleryBySlug } from './galleries';
export type { EventGallery, GalleryImage } from './galleries';
export { getHomePageContent, getProgramBySlug, getProgramsContent } from './home';
export type { HomePageContent } from './home';
export { PROGRAMS, findProgramBySlug } from './programs';
export { STORIES, findStoryBySlug } from './stories';
export { TIMELINE } from './timeline';
// Still read by the About page, which has not moved to the CMS yet. The home
// page now gets this same copy from Sanity — so until About migrates, the
// mission and vision text lives in two places and can drift.
export { MISSION_STATEMENT, VISION_STATEMENT } from './statements';
export { VALUES } from './values';
