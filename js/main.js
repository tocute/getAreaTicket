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
	
	var onBtnSubmit2Click = function (e)
	{
		var area_id = $("#area_id").val();
		
		if(area_id != undefined)
		{
			if(checkFieldFormat())
			{
				Parse.Cloud.run('GetAreaTicket', 
					{ areaId: area_id}, 
					{
	  					success: function(result) 
	  					{
    						// result is 'Hello world!'
    						$("#popupText").html("Area : "+ result.areaId+" 白："+result.whiteTicketNum +" \n 藍："+result.blueTicketNum);
    					},
  						error: function(error) 
  						{
  							/*{
								"code":141,
								"message":"密碼錯誤  請再次確認投票所編號與密碼"
							}*/
							$("#popupText").html("");
  							alert(error.message);
  						}
					});
			}
			else
			{
				alert("格式錯誤");
			}
		}	
		else	
		{
			alert("有欄位尚未填寫");
		}
	}

	$("#btn_submit").on("click",onBtnSubmit2Click);

});