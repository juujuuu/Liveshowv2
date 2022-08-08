/**
 *
 * @param {string} url - the URL to check
 * @returns sanitized url for hyperlinks.
 */
export default function sanitizeUrl(url) {
    if (!url.includes("http://") && !url.includes("https://")) {
        return "http://" + url;
    }
    return url;
}
