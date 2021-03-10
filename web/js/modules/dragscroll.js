/**
 * @fileoverview dragscroll - scroll area by dragging
 * @version 0.0.8
 * 
 * @license MIT, see http://github.com/asvd/dragscroll
 * @copyright 2015 asvd <heliosframework@gmail.com> 
 */


(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports !== 'undefined') {
        factory(exports);
    } else {
        factory((root.dragscroll = {}));
    }
}(this, function (exports) {
    var _window = window;
    var _document = document;
    var mousemove = 'mousemove';
    var mouseup = 'mouseup';
    var mousedown = 'mousedown';
    var EventListener = 'EventListener';
    var addEventListener = 'add' + EventListener;
    var removeEventListener = 'remove' + EventListener;
    var newScrollX, newScrollY;

    var dragged = [];
    var reset = function (i, el) {

        for (i = 0; i < [].slice.call(_document.getElementsByClassName('dragscroll')).length;) {
            el = [].slice.call(_document.getElementsByClassName('dragscroll'))[i++];
            el = el.container || el;
            el[removeEventListener](mousedown, el.md, 0);
            _window[removeEventListener](mouseup, el.mu, 0);
            _window[removeEventListener](mousemove, el.mm, 0);
        }

        // cloning into array since HTMLCollection is -updated dynamically
        for (i = 0; i < [].slice.call(_document.getElementsByClassName('dragscroll')).length;) {
            (function (el, lastClientX, lastClientY, pushed, scroller, cont) {
                //if ($("#viewSetter").hasClass("currentView-full") == false) {
                    (cont = el.container || el)[addEventListener](
                        mousedown,
                        cont.md = function (e) {
                            if (!el.hasAttribute('nochilddrag') ||
                                _document.elementFromPoint(
                                    e.pageX
                                ) == cont
                            ) {
                                pushed = 1;
                                if ($("#viewSetter").hasClass("currentView-full")) {
                                    return false;
                                }
                                lastClientX = e.clientX;
                                e.preventDefault();
                            }
                        }, 0
                    );

                    _window[addEventListener](
                        mouseup, cont.mu = function () {
                            pushed = 0;
                            setTimeout(function () {
                                el.classList.remove("dragging");
                            }, 100);
                        }, 0
                    );

                    _window[addEventListener](
                        mousemove,
                        cont.mm = function (e) {
                            if (pushed) {
                                /*setTimeout(function () {
                                    $(".session-holder").addClass("dragging");
                                }, 1000);*/
                                if (lastClientX != e.clientX) {
                                    $(".session-holder").addClass("dragging");
                                }
                                (scroller = el.scroller || el).scrollLeft -=
                                    newScrollX = (-lastClientX + (lastClientX = e.clientX));
                                if (el == _document.body) {
                                    (scroller = _document.documentElement).scrollLeft -= newScrollX;
                                }
                            }
                        }, 0
                    );
                //}
            })([].slice.call(_document.getElementsByClassName('dragscroll'))[i++]);
        }
    }


    if (_document.readyState == 'complete') {
        reset();
    } else {
        _window[addEventListener]('load', reset, 0);
    }

    exports.reset = reset;
}));
