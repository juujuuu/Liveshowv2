var srcArray = [];
var srcElement = [];
$(document).ready(function () {
    let heightOffset = 0;
    let Y1 = 0;
    let Y2 = 0;
    let height = 0;
    buildAssets();
    function buildAssets() {
        if ($("#placeholder").attr("logo") == "none") {
            let string = '<p style="font-weight: bold;">You have not yet uploaded a company logo.  Please fill out your stand form <a href="' + $("#placeholder").attr("standform") + '" target="blank">here</a>.</p>'
            $(".marketingAssets").prepend(string);
            return;
        }
        $(".marketingAssets").prepend("<p id='loading-msg'>Your assets are now being generated.  This may take up to 30 seconds.</p>");
        srcArray.forEach(function (element, index) {
            if (window.location.href.split("?exhibitorid")[1] == undefined) {
                element[0] = element[0].concat($("#placeholder").attr("backupid"));
            }
            let name = 'asset-' + (index + 1) + '.jpg';
            //Y1 = heightOffset;
            Y2 = element[1];
            //Y1 = (parseInt(Y1)).toString();
            Y2 = (element[1]).toString();
            height = (parseInt(Y2) + heightOffset).toString();
            element[0] = element[0].replace("Y1", (parseInt(heightOffset)).toString());
            element[0] = element[0].replace("Y2", Y2);
            element[0] = element[0].replace("HEIGHT_INPUT", height);
            element[0] = element[0].replace("NAME", name);
            let imgTitle = element[2] + " X " + element[1] + "px";
            let tempString = '<div class="repeating-block ' + "asset-" + (index + 1) + '"><h3 style="font-weight: bold;">' + imgTitle + '</h3><a href="" style="cursor: default;" title="Loading..." ><img src="../assets/files/images/media-load.gif" alt="Loading..."/></a></div><div style="margin-bottom: 100px;"></div>';
            $("#img-holder").append(tempString);

            //force filestack caching so the image 
            //doesn't take ages in the dom
            $.ajax({
                type: "GET",
                url: element[0],
                //async: false,
                success: function (result) {
                    console.log(element[0] + " cached");
                    tempString = '<div class="repeating-block"><h3 style="font-weight: bold;">' + imgTitle + '</h3><a title="Click to download" href="' + element[0] + '"><img src="' + element[0] + '"/></a></div><div style="margin-bottom: 100px;"></div>';
                    $("#img-holder .repeating-block.asset-" + (index + 1) + " img").attr("src", element[0]);
                    $("#img-holder .repeating-block.asset-" + (index + 1) + " a").attr("href", element[0]);
                    $("#img-holder .repeating-block.asset-" + (index + 1) + " a").attr("title", "Click to download");
                    $("#img-holder .repeating-block.asset-" + (index + 1) + " a").attr("style", "");
                    $("#loading-msg").hide();
                }
            });

            heightOffset += 1000;
        });
    }
});