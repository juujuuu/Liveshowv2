/**
 * Countdoen timer code
 */
$(function () {
    $(document).ready(function () {
        //Get the end time of the countdown timer from the countdown timer element.
        const targetTime = new Date($(".ss-countdown").attr("data-target-time")); //format ('mm/dd/yyyy/hh:mm')

        //Every second.
        setInterval(() => {
            let nowTime = new Date(Date.now()).toLocaleString("en-US", { timeZone: getTimeZone() }); //Get the time right now and convert to a Date object.
            nowTime = new Date(nowTime);

            const differenceTimeSeconds = (targetTime - nowTime) / 1000; //Get the difference in time between now and the target and convert from milliseconds to seconds.

            let days,
                hours,
                minutes,
                seconds = 0;

            if (differenceTimeSeconds <= 0) {
                setTimes({ days, hours, minutes, seconds });
            } else {
                //Still time to go

                //Get the highest unit, then pass on the remainder to the next one
                days = Math.floor(differenceTimeSeconds / 86400); //86400 seconds in a day
                let remainder = differenceTimeSeconds % 86400;

                hours = Math.floor(remainder / 3600); //3,600 seconds in an hour
                remainder = remainder % 3600;

                minutes = Math.floor(remainder / 60); //60 seconds in a minute
                remainder = remainder % 60;

                seconds = Math.floor(remainder);
                setTimes({ days, hours, minutes, seconds });
            }
        }, 1000);
    });

    /**
     * Update the timer values on the DOM.
     * @param {object} time object, containing days, hours, minutes, seconds
     */
    const setTimes = ({ days, hours, minutes, seconds }) => {
        $(".ss-countdown__days").find("h1").text(days);
        $(".ss-countdown__hours").find("h1").text(hours);
        $(".ss-countdown__minutes").find("h1").text(minutes);
        $(".ss-countdown__seconds").find("h1").text(seconds);
    };

    /**
     *
     * @returns The timezone for use in a Date object based off of the current url.
     */
    const getTimeZone = () => {
        const site = window.location.host;
        switch (site) {
            case "www.ceramicsexpousa.com":
            case "www.thermalmanagementexpo.com":
            case "www.highperformanceplasticsexpo.com":
            case "www.adhesivesandbondingexpo.com":
            case "www.foam-expo.com":
                return "America/Detroit";
            case "www.spacetechexpo.com":
                return "America/Los_Angeles";
            case "www.spacetechexpo-europe.com":
            case "www.foam-expo-europe.com":
            case "www.adhesivesandbondingexpo-europe.com":
            case "www.onboardconnectivitysummit.com":
            case "www.satelliteconnectivitysummit.com":
                return "Europe/Berlin";
            default:
                break;
        }
    };
});
