const stripProtocol = (url) => url.replace(/^https?:\/\/(www\.)?/, "");
const lastPathSegment = (url) => url.split("/").filter(Boolean).pop();

// Single source of truth for the contact links shown in Contact and Footer.
export function getSocialLinks(profile) {
  return [
    {
      label: "Email",
      icon: "mail",
      href: profile.contact_email && `mailto:${profile.contact_email}`,
      text: profile.contact_email,
    },
    {
      label: "LinkedIn",
      icon: "linkedin",
      href: profile.contact_linkedin,
      text: profile.contact_linkedin && stripProtocol(profile.contact_linkedin),
    },
    {
      label: "GitHub",
      icon: "github",
      href: profile.contact_github,
      text: profile.contact_github && stripProtocol(profile.contact_github),
    },
    {
      label: "Instagram",
      icon: "instagram",
      href: profile.contact_instagram,
      text: profile.contact_instagram && `@${lastPathSegment(profile.contact_instagram)}`,
    },
  ].filter((link) => link.href);
}

export const isExternal = (href) => /^https?:\/\//.test(href);
