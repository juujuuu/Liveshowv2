export default function sanitizeUrl (url) {
    if(!url.includes("http://") && !url.includes("https://")){
        return "http://" + url;
    }
    return url;
}