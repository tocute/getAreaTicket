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
                    temp_list.append("<li>"+"District : "+ result.districtId+" 白："+result.candidate7 +" \n 藍："+result.candidate6+"</li>");
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

    var onBtnGetAllTicketClick = function (e)
    {
        var temp_list = $("#ticketList");
        temp_list.empty();
        Parse.Cloud.run("GetAllDistrictTicket",null, 
            {
                success: function(result) 
                {
                    for(var i = 0; i<result.length; i++)
                    {
                        var entiry = result[i];
                        temp_list.append("<li>"+"District : "+ entiry.districtId+" 白："+entiry.candidate7 +" 藍："+entiry.candidate6+"<br/> 未開票完成: "+entiry.unfinished_district+"  投票所個數: "+entiry.total_count+"</li>");
                        temp_list.listview("refresh");
                    }
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
    var onBtnGetDistrict1 = function ()
    {
        getTicketDistrict("湖山里",136,137);
    }
    
    var onBtnGetDistrict2 = function ()
    {
        getTicketDistrict("天玉里",279,283);
    }

    var getTicketDistrict = function (districtName,voteHouseMin,voteHouseMax)
    {
        var VoteHouseObject = Parse.Object.extend("TicketInfoObject");
        var query = new Parse.Query(VoteHouseObject);
        // Restricts to wins <= voteHouseMax
        query.lessThanOrEqualTo("voteHouseId", voteHouseMax.toString());
        // Restricts to wins >= voteHouseMin
        query.greaterThanOrEqualTo("voteHouseId", voteHouseMin.toString());
 
        query.find({
            success: function(results)
            {
                var candidate6 = 0;
                var candidate7 = 0;
                for (var i = 0; i < results.length; i++) 
                { 
                    candidate6 += parseInt(results[i].get("candidate6"));
                    candidate7 += parseInt(results[i].get("candidate7"));
                }

                var temp_list = $("#ticketList");
                temp_list.empty();
                temp_list.append("<li>"+districtName+" :  白:"+candidate7 +" \n 藍:"+candidate6+"</li>");
                temp_list.listview("refresh");
            },
            error: function(error) 
            {
                alert("Error: " + error.code + " " + error.message);
            }

        }); 
    }   
    $("#btn_submit").on("click",onBtnGetAllTicketClick);
    $("#btn_district1").on("click",onBtnGetDistrict1);
    $("#btn_district2").on("click",onBtnGetDistrict2);

});