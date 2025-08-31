
const keyName_SavedPost = "SavedPost";
/* --------------------------------------------------- */
class DEF_SavedPostEntry
{
    postLink = "";
    imgLinks = [];
}
/* --------------------------------------------------- */
function ThumbNailLinkCheck()
{
    try
    {
        //const img = document.getElementById(".img_thumbnails");
        const targetTagName = ".img_thumbnails";
        const img = $(targetTagName);
        console.assert(img.length > 0, "Failed: img.length>0", img);


        img.each(function ()
        {
            if (this.complete && this.naturalWidth !== 0)
            {
                $(targetTagName).show();
            } else
            {
                $(targetTagName).hide();

                $(this).on("load", function ()
                {
                    $(targetTagName).show();
                });

                $(this).on("error", function ()
                {

                    $(targetTagName).hide();
                });
            }
        });


    } catch (error)
    {
        console.error(`${error}.\n ${error.stack}`);
    }
}
/* --------------------------------------------------- */
/** @return {Array<DEF_SavedPostEntry>} */
function getSavedPostArray()
{
    try
    {
        let data_savedPost = JSON.parse(localStorage.getItem(keyName_SavedPost));

        if (typeof data_savedPost === "undefined" || data_savedPost == null  )
        {
            // console.log("ddd");
            data_savedPost=[];
        }
        
        console.assert(!(typeof data_savedPost === "undefined"  || data_savedPost == null )
        ,"Failed: !(typeof data_savedPost === undefined)"
        ,data_savedPost);

        // console.log(data_savedPost);

        return data_savedPost;
    } catch (error)
    {
        console.error(`${error}.\n ${error.stack}`);
    }
}
/* --------------------------------------------------- */
function removePostInSavedPost(link_post)
{
    try
    {

        let data_savedPost = getSavedPostArray();

        let data_new = [];

        let found = false;
        for (let i = 0; i < data_savedPost.length; i++)
        {
            let post_now = data_savedPost[i];
            if (post_now.postLink != link_post)
            {
                data_new.push(post_now);
            }
        }

        localStorage.setItem(keyName_SavedPost, JSON.stringify(data_new));


    } catch (error)
    {
        console.error(`${error}.\n ${error.stack}`);
    }
}
/* --------------------------------------------------- */
function ShowSavedPost()
{
    try
    {
        /** only work on test */
         return;
        const divName_panel = "panel_SavedPost";
        let $panel = $("#" + divName_panel);

        if ($panel.length == 0)
        {
            $("<div>", {
                id: divName_panel
                , class: "entryContainer"
            })
                .appendTo("body");
            $panel = $("#" + divName_panel);
            // console.log("add panel");
        }

        $panel.empty();

        let data_savedPost = getSavedPostArray();

        for (let index = 0; index < data_savedPost.length; index++)
        {
            /** @type {DEF_SavedPostEntry} */
            const postData = data_savedPost[index];

            // console.log("postData", postData);

            let template = $("#example_entryDiv").clone();
            template.removeAttr("id");
            template.appendTo($panel);
            template.find("a").attr("href", postData.postLink);
            var $gallery = template.find(".gallery").empty();
            var $closeButton = template.find(".closeIcon");
            console.assert($closeButton.length == 1, "Failed: $closeButton.length==1", template);
            $closeButton.on("click", function ()
            {
                var $link_post = $(this).parent().find("a");
                console.assert($link_post.length == 1, "Failed: $link_post.length==1", $(this).parent());
                var href_post = $link_post.attr("href");
                removePostInSavedPost(href_post);
                ShowSavedPost();
            });


            for (let index_img = 0; index_img < postData.imgLinks.length; index_img++)
            {
                const imgUrl = postData.imgLinks[index_img];
                let img_new = $("<img>", { src: imgUrl })
                    .appendTo($gallery);
            }

        }


    } catch (error)
    {
        console.error(`${error}.\n ${error.stack}`);
    }
}
/* --------------------------------------------------- */
function checkLinksExist()
{
    try
    {
        function hideNotExistLink(id_link)
        {
            const $link_next = $(id_link);
            const url_test = $link_next.attr("href");

            fetch(url_test)
                .then(res =>
                {
                    if (res.ok)
                    {
                        // console.log("Exist ✅");
                        $link_next.show();
                    } else
                    {
                        // console.log("Not Exist ❌");
                        $link_next.hide();
                    }
                })
                .catch(() =>
                {
                    $("#" + id_link).hide();
                    // console.log("Error ❌");
                });
        }

        hideNotExistLink(".link_next_page");;
        hideNotExistLink(".link_previous_page");;

    } catch (error)
    {
        console.error(`${error}.\n ${error.stack}`);
    }

}
/* --------------------------------------------------- */
function AddSavedPost(tag_link)
{
    try
    {


        console.assert((tag_link instanceof HTMLAnchorElement)
            , "Failed:  (tag_link instanceof HTMLAnchorElement)"
            , tag_link);

        const $tag_link = $(tag_link);
        let href = $tag_link.attr("href");


        var $imgs = $tag_link.find("img");
        console.assert($imgs.length > 0, "Failed: $imgs.length>0", $tag_link);
        let imgLinks = $imgs.map(function ()
        {
            return $(this).attr("src");
        }).get();  // .get() 把 jQuery 物件轉成普通陣列

        console.assert(imgLinks.length > 0, "Failed: imgLinks.length>0", $tag_link);

        //var entry = { postLink: {}, imgLinks: [] };
        var entry = new DEF_SavedPostEntry();
        Object.preventExtensions(entry);
        entry.postLink = href;
        entry.imgLinks = imgLinks;



        if (!(keyName_SavedPost in localStorage))
        {
            localStorage.setItem(keyName_SavedPost, JSON.stringify([]));
        }



        removePostInSavedPost(entry.postLink);


        let data_savedPost = getSavedPostArray();
        data_savedPost.push(entry);

        localStorage.setItem(keyName_SavedPost, JSON.stringify(data_savedPost));
        ShowSavedPost();




    } catch (error)
    {
        console.error(`${error}.\n ${error.stack}`);
    }
}
/* --------------------------------------------------- */
function UpdateSaveButtonColor(entryDiv)
{
    try
    {


        $div_this = $(entryDiv);

        console.assert($div_this.hasClass("entryDiv"), "Failed: $div_this.hasClass(.entryDiv)", entryDiv);


        let href = $div_this.find("a").attr("href");

        let list_savedPost = getSavedPostArray();


        $div_this.find(".saveIcon svg").attr("fill", "gray");
        // console.log(`${href}`,list_savedPost);
        for (let index = 0; index < list_savedPost.length; index++)
        {
            const post = list_savedPost[index];
            if (post.postLink == href)
            {
                $div_this.find(".saveIcon svg").attr("fill", "red");
                // console.log("red");
                break;
            }
        }


    } catch (error)
    {
        console.error(`${error}.\n ${error.stack}`);
    }
}
/* --------------------------------------------------- */
function Adjust_EntryDiv()
{
    try
    {
        var list_entryDiv = $(".entryContainer .entryDiv");






        // 建立觀察器
        let observer = new IntersectionObserver((entries) =>
        {
            entries.forEach(entry =>
            {
                if (entry.isIntersecting)
                {
                    UpdateSaveButtonColor(entry.target);

                }
            });
        }, {
            root: null,       // null = 以 viewport 為基準
            threshold: 0.1    // 目標有 10% 出現在畫面就觸發
        });




        /** add save icon */
        list_entryDiv.each((index) =>
        {


            // 啟動 可視 監聽
            observer.observe(list_entryDiv.get(index));



            var newIcon = $("#Icon_Heart")
                .clone()
                .attr({ class: "saveIcon" })
                .removeAttr("id", "")
                .appendTo($(list_entryDiv.eq(index)));

            newIcon.on("click", function ()
            {
                $div_this = $(this);
                var href = $(this).parent().find("a").get(0);

                let list_savedPost = getSavedPostArray();
                let isSaved = false;
                for (let index = 0; index < list_savedPost.length; index++)
                {
                    const post = list_savedPost[index];
                    if (post.postLink == href)
                    {
                        isSaved = true;
                        break;
                    }
                }

                if (isSaved)
                {
                    removePostInSavedPost(href);
                    ShowSavedPost();
                }
                else
                {
                    AddSavedPost(href);
                }

                UpdateSaveButtonColor($(this).parent());


            });
        });

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
        ThumbNailLinkCheck();
        checkLinksExist();
        Adjust_EntryDiv();
    } catch (error)
    {
        console.error(`${error}.\n ${error.stack}`);
    }

})();
