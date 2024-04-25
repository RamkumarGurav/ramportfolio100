const BASE_URL =
  process.env.NODE_ENV === "production"
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : "http://localhost:3000";

const INCLUDES_FORWARD_SLASH_AT_START_REGEX = /^\/(.|\n)*$/;
const INCLUDES_FORWARD_SLASH_AT_START = (string: string) =>
  INCLUDES_FORWARD_SLASH_AT_START_REGEX.test(string);

export const getUrl1 = (path: string) =>
  `${BASE_URL}${!INCLUDES_FORWARD_SLASH_AT_START(path) ? "/" : ""}${path}`;

export {
  BASE_URL,
  INCLUDES_FORWARD_SLASH_AT_START_REGEX,
  INCLUDES_FORWARD_SLASH_AT_START,
};

export const getBaseUrl2 = () => {
  if (process.env.NODE_ENV === "development") {
    return `${process.env.NEXT_PUBLIC_SITE_URL}`;
  }

  return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
};
