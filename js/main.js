$(document).on("mobileinit",function(e)
{
    
});

$(document).on("pageinit","#page-1",function(e)
{
    Parse.initialize("CPFQXuoHErkxiN8b3uDFuGuGBnZbLen9jglvAB4p", "qvHqLCDitrqkwAL3bSbMfbdcYlUY9wlfVJZmom3S");
        
    var checkFieldFormat = function ()
    {
        var is_valid = true;
        if(!$.isNumeric($("#area_id").val()))
        {
            $("#area_id").val("");
            is_valid = false;
        }   
        return is_valid;
    }        

    var onBtnGetTicketClick = function (e)
    {
        var area_id = $("#area_id").val();
        
        if(area_id == undefined)
        {
            alert("有欄位尚未填寫");
            return;
        }
        if(!checkFieldFormat())
        {
            alert("格式錯誤");
            return;
        }

        var temp_list = $("#ticketList");
        temp_list.empty();
        Parse.Cloud.run("GetAreaTicket",
            { districtId: ""+area_id}, 
            {
                success: function(result) 
                {
                    temp_list.append("<li>"+"District : "+ result.districtId+" 白："+result.ticketNumSeven +" \n 藍："+result.ticketNumSix+"</li>");
                    temp_list.listview("refresh");
                },
                error: function(error) 
                {
                    /*{
                        "code":141,
                        "message":"密碼錯誤  請再次確認投票所編號與密碼"
                    }*/
                    alert(JSON.stringify(error.message));
                }
            });  
    }

    $("#btn_submit").on("click",onBtnGetTicketClick);

});