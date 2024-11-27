$(document).ready(function() {
    if ($("footer i.bi.bi-house-fill").length) {  // Check if element exists in footer
        $("footer i.bi.bi-house-fill").replaceWith("Home"); // Replace <i> with 'Home' only in footer
    }
});
