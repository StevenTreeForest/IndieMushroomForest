"use strict"
const keyName_SavedPost = "SavedPost";
/* --------------------------------------------------- */
/** @return {Array<DEF_SavedPostEntry>} */
function getSavedPostArray()
{
    try
    {


        const currentPageDate = GetPageDate().toISOString().split("T")[0];

        /**@type {Array<DEF_SavedPostEntry>} */
        let data_savedPost = JSON.parse(localStorage.getItem(keyName_SavedPost));

        if (typeof data_savedPost === "undefined" || data_savedPost == null)
        {
            // console.log("ddd");
            data_savedPost = [];
        }

        console.assert(!(typeof data_savedPost === "undefined" || data_savedPost == null)
            , "Failed: !(typeof data_savedPost === undefined)"
            , data_savedPost);



        return data_savedPost;
    } catch (error)
    {
        console.error(`${error}.\n ${error.stack}`);
    }
}
/* --------------------------------------------------- */
class DEF_SavedPostEntry
{
    postLink = "";
    imgLinks = [];
    postDate = ""; /** example 2025-01-01 */

    /** @returns {boolean} */
    HasPostDateInfo = function () 
    {
        try
        {
            console.assert(this instanceof DEF_SavedPostEntry, "Failed: this instanceof def_SavedPostEntry", this);
            const d = new Date(this.postDate);
            return !isNaN(d.getTime());
        } catch (error)
        {
            console.error(`${error}.\n ${error.stack}`);
        }
    }
    /* --------------------------------------------------- */
    /**
     * 移除破損檔案 
     * @returns {boolean} 
     * */
    IsValid = function ()
    {
        try
        {
            var result = true;

            result = this.postLink.trim() !== "" && this.imgLinks.length > 0;


            return result;
        } catch (error)
        {
            console.error(`${error}.\n ${error.stack}`);
        }
    }
}