/**
 * Going through all the various potential problems with youtube link formats
 */
class VideoSanitizer {
    /* Return iframe source */
    static getVideo = link => {
        const getVideoType = link => {
            if ((link.includes("youtube") || link.includes("/youtu.be")) && !link.includes("https://www.youtube.com/channel/")) {
                return "YOUTUBE";
            } else if (link.includes("vimeo")) {
                return "VIMEO";
            } else {
                return false;
            }
        };
        const getVimeoLink = link => {
            let id = link.split(".com/")[1];
            if (id.includes("&")) {
                id = id.split("&")[1]; //split of on & if there are other parameters
            }
            //Vimeo video ids are numbers eg 123424
            if (Number.isInteger(id)) {
                return `https://player.vimeo.com/video/${id}`;
            } else {
                return false;
            }
        };
        const getYoutubeLink = link => {
            let id;
            if (link.includes("https://youtu.be/") && !link.includes("&feature=youtu.be")) {
                id = link.split(".be/")[1];
                if (id.includes("?")) {
                    id = id.split("?")[0];
                }
            } else if (link.includes("/embed/")) {
                id = link.split("/embed/")[1];
            } else {
                id = link.split("watch?v=")[1];
                if (id.length < 2) {
                    //split failed try &v=
                    id = link.split("&v=")[1];
                }
                if (id.length < 2) {
                    //still won't split?  dodgy link
                    this.setState({ valid: false });
                    //console.log(link);
                    return null;
                }
                if (id.includes("&")) {
                    //now we've got an id
                    //The video id isn't the end of the url so cut it at the parameter after
                    id = id.split("&")[0];
                }
            }
            return `https://www.youtube.com/embed/${id}?enablejsapi=1`;
        };

        try {
            let type = getVideoType(link);
            if (!type) {
                return false;
            }
            if (type === "YOUTUBE") {
                return getYoutubeLink(link);
            } else if (type === "VIMEO") {
                return getVimeoLink(link);
            }
        } catch (error) {
            console.error("Video Source Invalid ", error);
            return false;
        }
    };
}
export default VideoSanitizer;
