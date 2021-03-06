// $$('input:-webkit-autofill')

new (function(window, document, $){
    $(document).ready(function(){    
        // Auto relogin if timed out.
        if (window.location.pathname.match(/\/courses\/login\//)){
            var autofill = $('input:-webkit-autofill');
            if (autofill.length > 0){
                // <span class="error">Your session has timed out.  Please login
                // again.</span>
                var error_msg = $('span[class="error"]').first();
                if (error_msg.text().search("Please login again.") > 0){
                    $("form:first[method='post']").submit();
                    $('.subcontent.loginsub').after(
                        $('<div class="subcontent autologinsub"><h1>Auto-Logging in</h1></div>'))
                }
            }
        }

        // Psuedodirectlinkify all document URLs
        // Prepend a clone of the current week to the top
        // Position-fixed the sidebars
        if (window.location.pathname == "/courses/course/view.php"){        
            // Find all onclick elements in anchor links of such elements and
            // remove them. Append &inpopup=true to all of them.
            //
            $(".activity.resource > a").each(function(a){
                // Remove the onclick
                this.removeAttribute("onclick");
                // Psuedo-Direct link to the page. At least it's a 
                // transparent redirect now.
                var newurl = this.href.concat("&inpopup=true");
                this.setAttribute("href", newurl);
            });

            // Faux Current Week""
            var seperator = $(".section.separator").first().clone();
            var current_week = $(".current").first()
            var faux_current_week = current_week.clone();
            faux_current_week.addClass("fauxWeek");
            faux_current_week.attr('id', 'faux-section');
            $(".weeks tbody").prepend(faux_current_week);
            faux_current_week.after(seperator);
            // Jump to Context
            var gotocontext = $('<h3 class="goto-context">Go to Context</h3>')
            current_week.addClass("realCurrentWeek");
            gotocontext.click(function(){
                // From Cookbook
                var viewportWidth = jQuery(window).width(),
                viewportHeight = jQuery(window).height(),
                $real_current_week = $('.realCurrentWeek').first(),
                elWidth = $real_current_week.width(),
                elHeight = $real_current_week.height(),
                elOffset = $real_current_week.offset();
            jQuery(window)
                .scrollTop(elOffset.top + (elHeight/2) - (viewportHeight/2))
                .scrollLeft(elOffset.left + (elWidth/2) - (viewportWidth/2));
            });
            $('.fauxWeek .weekdates').before(gotocontext)

            // Scroll To Fix
            var left_column = $("#left-column > div");
            var right_column = $("#right-column > div");

            left_column.scrollToFixed({
                limit: $("#footer").offset().top - left_column.outerHeight()
            });
        }
        
        // Psuedodirectlinkify all document URLs in resource listing
        if (window.location.pathname.match(/\/courses\/mod\/resource\//)){        
            // Find all onclick elements in anchor links of such elements and
            // remove them. Append &inpopup=true to all of them.

            $(".generaltable .c1 a").each(function(a){
                // Remove the onclick
                this.removeAttribute("onclick");
                // Psuedo-Direct link to the page. At least it's a 
                // transparent redirect now.
                var newurl = this.href.concat("&inpopup=true");
                this.setAttribute("href", newurl);
            });
        }

        // Add quick course links for easier clicking after logging in instead
        // of scrolling down or moving down the mouse.
        if (window.location.pathname == "/courses/"){        
            var lcol = $('#left-column');                        

            var quick_list = $('<ul>', {'class':'list'});

            $('.name > a').each(function(a,b){
                var short_name = b.text.split(' (')[0];
                var new_link = $(b).clone();
                new_link.text(short_name);
                new_link_item = new_link.wrap('<li>').parent();
                quick_list.append(new_link_item);
            })

            // quick_list.append("<p>Why click down there when you can click up here? :)</p>");

            quick_list = quick_list.wrap($('<div>', {'class':'content'})).parent();
            quick_list = quick_list.wrap($('<div>', {'class':'sideblock'})).parent();
            quick_list.prepend($('<div>', {'class': 'header', 'text': 'QuickClick Menu'}));
            quick_list = quick_list.wrap($('<div>', {"class":"quickclick"})).parent();
            quick_list = quick_list.wrap($('<div>')).parent();
            $(quick_list).prependTo(lcol);            
            
            localStorage["quicklist"] = escape($(quick_list).html());
        }

        if (window.location.pathname == "/"){
            var quick_list = unescape(localStorage["quicklist"]);
            quick_list_elem = $(quick_list);
            $(quick_list_elem).find(".header").wrapInner($("<h3>"));
            $(quick_list_elem).append('<p>If this menu is out of date, <a href="https://gauchospace.ucsb.edu/courses/">visit the <span class="mycoursebutton">My Courses</span> page while logged in to refresh</a>.</p>');
            $(quick_list_elem).append("<p>This is cached from the last logged in user. If auto-login works for you, clicking will auto-log you in through these links if you were logged out from inactivity.</p>");
            $(quick_list_elem).append("<p>If you have an issue with this extension, please make an account on <a href='http://github.com'>Github</a> and submit an issue <a href='https://github.com/crazysim/gauchospace-lasso/issues'>here</a>.");
            $("#left > a").after(quick_list_elem);
            // $(quick_list).appendTo($("#left"));
        }

        $('#menubar').prepend('<li><a href="//gauchospace.ucsb.edu">Front');

    });
})(window, document, jQuery);

