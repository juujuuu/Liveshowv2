
$(function () {
	$(document).ready(function () {
		const targetTime = new Date($(".ss-countdown").attr("data-target-time"));//format ('mm/dd/yyyy/hh:mm')
		
		setInterval(() => {
			const nowTime = Date.now();
			const differenceTimeSeconds = (targetTime - nowTime) / 1000;
	
			const days = Math.floor(differenceTimeSeconds/86400);//86400 seconds in a day 
			let remainder = differenceTimeSeconds % 86400;

			const hours = Math.floor(remainder/3600);//3,600 seconds in an hour 
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
});
