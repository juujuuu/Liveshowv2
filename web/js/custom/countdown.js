$(function () {
	$(document).ready(function () {
		const targetTime = new Date($(".ss-countdown").attr("data-target-time")); //format ('mm/dd/yyyy/hh:mm')

		setInterval(() => {
			let nowTime = new Date(Date.now()).toLocaleString("en-US", { timeZone: getTimeZone() });
			nowTime = new Date(nowTime);
			const differenceTimeSeconds = (targetTime - nowTime) / 1000;

			const days = Math.floor(differenceTimeSeconds / 86400); //86400 seconds in a day
			let remainder = differenceTimeSeconds % 86400;

			const hours = Math.floor(remainder / 3600); //3,600 seconds in an hour
			remainder = remainder % 3600;

			const minutes = Math.floor(remainder / 60);
			remainder = remainder % 60;

			const seconds = Math.floor(remainder);

			$(".ss-countdown__days").find("h1").text(days);
			$(".ss-countdown__hours").find("h1").text(hours);
			$(".ss-countdown__minutes").find("h1").text(minutes);
			$(".ss-countdown__seconds").find("h1").text(seconds);
		}, 1000);
	});
	const getTimeZone = () => {
		const site = window.location.host;
		switch (site) {
			case "www.ceramicsexpousa.com":
				return "America/Detroit";
			case "www.thermalmanagementexpo.com":
				return "America/Detroit";
			case "www.highperformanceplasticsexpo.com":
				return "America/Detroit";
			case "www.adhesivesandbondingexpo.com":
				return "America/Detroit";
			case "www.foam-expo.com":
				return "America/Detroit";
			case "www.netzerobuildsummit.com":
				return "America/Detroit";
			case "www.spacetechexpo.com":
				return "America/Los_Angeles";
			case "www.spacetechexpo.eu":
				return "Europe/Berlin";
			case "www.foam-expo.eu":
				return "Europe/Berlin";
			case "www.adhesivesandbondingexpo.eu":
				return "Europe/Berlin";
			case "www.onboardconnectivitysummit.com":
				return "Europe/Berlin";
			case "www.satelliteconnectivitysummit.com":
				return "Europe/Berlin";
			default:
				break;
		}
	};
});
