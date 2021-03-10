$(document).ready(function () {
    $(function () {
        $('[data-toggle="popover"]').popover()
    });
    var tour = new Tour({
        steps: [
            {
                title: " Welcome to the new Exhibitor portal",
                content: "Take a quick tour to walk you through the different sections of the new portal",
                backdrop: true,
                orphan: true
          },
            {
                element: "#cta-showguide",
                title: "Complete Exhibitor Profile",
                content: "Enter your exhibitor information to activate your online profile, complete your onsite show guide listing and answer a few questions that will maximize your visibility at the show",
                placement: "bottom"
          },
            {
                element: "#cta-booth-approval",
                title: "Submit Booth Approval",
                content: "Download the compulsory Booth Information Form to submit your Health & Safety/Risk Assessment declaration, Booth Approval Form and Approval Request Form",
                placement: "bottom"
          },
            {
                element: "#cta-n200",
                title: "Register Staff / Invite Customers ",
                content: "Click here to launch the N200 Partner Portal where you can register your booth staff, upload customer lists to invite, access your unique registration link",
                placement: "bottom"
          },
            {
                element: "#cta-marketing",
                title: "Complimentary Marketing & PR",
                content: "View the free list of marketing and PR opportunities available to exhibitors, download the show logos and start planning your participation with the exhibitor marketing checklist",
                placement: "bottom"
          },
            {
                element: "#sidebar-ressources",
                title: "Event resources",
                content: "All information about the event can be found via the side menu"
          },
            {
                element: "#deadlines",
                title: "Deadlines",
                content: "Important exhibitor deadlines are detailed here",
                placement: "top"
          },
            {
                element: "#home",
                title: "Home/ Deadlines",
                content: "Click here to view all important deadlines, and check/update the status of your planning.",
                placement: "top"
            },
            {
                element: "#exhibitorAZ",
                title: "Important Information",
                content: "Click here to navigate through all of the Exhibiting information by category. ",
                placement: "top"
            }, {
                element: "#resourceCenter",
                title: "Resource Center",
                content: "Click here to view all forms and resources to help you plan a successful Exhibit.",
                placement: "top"
            }, {
                element: "#help",
                title: "Help",
                content: "Click here for frequently asked questions, and your key contacts.",
                placement: "top"
            }, {
                element: "#checklist2",
                title: "Checklist",
                content: "Use the KEY ITEMS CHECKLIST BELOW to work through important tasks.  Once you have completed each item, change the status on the checklist to monitor your progress. These are split into compulsory and optional tasks. If it's not applicable to you then change it's status to reflect that.",
                placement: "top"
            }
  ]
    });
    tour.init();
    // Force start the tour
    tour.start();
    //Begin home slideshow

    $("#tour-launcher").click(function () {
        tour.restart(true);
    });
    //Dynamic classes for resources menu
    var i;
    for (i = 0; i <= $(".wayfinderMenu li").length; i++) {
        $(".wayfinderMenu li:nth-child(" + i + ")").addClass("item" + i);
    }
    //Set contact us
    var contactHTML = {
        fmx: "",
        fme: "",
        tbe: "",
        bre: "",
        spc: "",
        cex: ""
    }
    if ($("body").data("context") == "FMX-PRTL") {
        $("#contact").append(contactHTML["fmx"]);
    } else if ($("body").data("context") == "FME-PRTL") {
        $("#contact").append(contactHTML["fme"]);
    } else if ($("body").data("context") == "TBE-PRTL") {
        $("#contact").append(contactHTML["tbe"]);
    } else if ($("body").data("context") == "BRE-PRTL") {
        $("#contact").append(contactHTML["bre"]);
    } else if ($("body").data("context") == "SPC-PRTL") {
        $("#contact").append(contactHTML["spc"]);
    } else if ($("body").data("context") == "CEX-PRTL") {
        $("#contact").append(contactHTML["cex"]);
    }

    //Search query
    $(".search form").submit(function (event) {
        event.preventDefault();
        let input = $(".search form").serialize();
        console.log(input);
    });
});
