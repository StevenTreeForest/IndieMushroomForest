"use strict"
/* --------------------------------------------------- */
function parseDate()
{
    try
    {
        const userLang = navigator.language || "en-US";

        const formatter = new Intl.DateTimeFormat(userLang, {
            month: "short", day: "numeric"
        });

        var list_savePosts=getSavedPostArray();



        /** convert date */
        var allSpan = $(".date-list span");
        allSpan.each((index) =>
        {
            const $span = allSpan.eq(index);

            /** get the date info */
            const rawDate = $span.text().trim();
            const date = new Date(rawDate);
            $span.attr("data-isoDate", rawDate);

            if (!isNaN(date))
            {
                $span.text(formatter.format(date));
                $span.parent().parent().append("<span class='numSavedPost'>♥" + (99) + "</span>")
                // $span.after("<span class='numSavedPost'>99</span>");
            }
        });

    } catch (error)
    {
        console.error(`${error}.\n ${error.stack}`);
    }
}
/* --------------------------------------------------- */
function parseMonth()
{
    try
    {
        const userLang = navigator.language || "en-US";
        {

            const formatter_month = new Intl.DateTimeFormat(userLang, {
                month: "long"
            });
            /** convert date */
            var allSpan = $(".monthTitle");
            allSpan.each((index) =>
            {
                const $span = allSpan.eq(index);

                /** get the date info */
                const rawDate = $span.text().trim();
                const date = new Date(rawDate);
                if (!isNaN(date))
                {
                    // span.textContent = formatter.format(date);
                    $span.text(formatter_month.format(date));
                }
            });
        }
    } catch (error)
    {
        console.error(`${error}.\n ${error.stack}`);
    }
}
/* --------------------------------------------------- */
(function ()
{
    try
    {
        parseDate();
        parseMonth();

    } catch (error)
    {
        console.error(`${error}.\n ${error.stack}`);
    }
})();
