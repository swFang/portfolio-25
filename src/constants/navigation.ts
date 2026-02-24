export const MAIN_SECTIONS = [
  { id: "about", label: "About" },
  { id: "career", label: "Career" },
  { id: "photography", label: "Photography" },
  { id: "contact", label: "Contact" },
  { id: "apps", label: "Apps" },
] as const;

export type MainSectionId = (typeof MAIN_SECTIONS)[number]["id"];

export const CAREER_SECTIONS = [
  { id: "arista", label: "Arista Networks" },
  { id: "arista-intern", label: "Arista Networks - Intern" },
  { id: "sap-intern", label: "SAP - Intern" },
] as const;

export type CareerSectionId = (typeof CAREER_SECTIONS)[number]["id"];

export const APP_SECTIONS = [{ id: "siteup", label: "SiteUp" }] as const;

export type AppSectionId = (typeof APP_SECTIONS)[number]["id"];

const mainSectionSet = new Set<MainSectionId>(MAIN_SECTIONS.map(({ id }) => id));
const careerSectionSet = new Set<CareerSectionId>(
  CAREER_SECTIONS.map(({ id }) => id)
);
const appSectionSet = new Set<AppSectionId>(APP_SECTIONS.map(({ id }) => id));

export interface RouteState {
  section: MainSectionId | null;
  careerRole?: CareerSectionId;
  appId?: AppSectionId;
}

export const HOME_PATH = "/";
export const CAREER_PATH = "/career";
export const APPS_PATH = "/apps";

export const isMainSectionId = (value: string): value is MainSectionId =>
  mainSectionSet.has(value as MainSectionId);

export const isCareerSectionId = (value: string): value is CareerSectionId =>
  careerSectionSet.has(value as CareerSectionId);

export const isAppSectionId = (value: string): value is AppSectionId =>
  appSectionSet.has(value as AppSectionId);

export const getHashPath = (hash: string): string => {
  const rawPath = hash.startsWith("#") ? hash.slice(1) : hash;

  if (!rawPath) {
    return HOME_PATH;
  }

  return rawPath.startsWith("/") ? rawPath : `/${rawPath}`;
};

const normalizePath = (path: string): string => {
  const collapsed = path.toLowerCase().replace(/\/+/g, "/");

  if (collapsed === "/") {
    return HOME_PATH;
  }

  return collapsed.endsWith("/") ? collapsed.slice(0, -1) : collapsed;
};

export const parsePath = (path: string): RouteState => {
  const normalizedPath = normalizePath(path);
  const segments = normalizedPath.split("/").filter(Boolean);

  if (segments.length === 0) {
    return { section: null };
  }

  const [section, subsection] = segments;

  if (!isMainSectionId(section)) {
    return { section: null };
  }

  if (section === "career") {
    return {
      section,
      careerRole: subsection && isCareerSectionId(subsection) ? subsection : undefined,
    };
  }

  if (section === "apps") {
    return {
      section,
      appId: subsection && isAppSectionId(subsection) ? subsection : undefined,
    };
  }

  return { section };
};

export const getSectionPath = (section: MainSectionId): string => `/${section}`;

export const getCareerPath = (roleId?: CareerSectionId): string =>
  roleId ? `${CAREER_PATH}/${roleId}` : CAREER_PATH;

export const getAppsPath = (appId?: AppSectionId): string =>
  appId ? `${APPS_PATH}/${appId}` : APPS_PATH;
