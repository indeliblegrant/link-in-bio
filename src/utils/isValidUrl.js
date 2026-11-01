// Only allows http:// or https:// followed by something, with no spaces.
// This blocks javascript:, data:, ftp: and similar.
export function isValidUrl(value) {
  return /^https?:\/\/\S+$/i.test(value.trim())
}