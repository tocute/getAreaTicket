$(document).on("mobileinit",function(e)
{

});

$(document).on("pageinit","#page-1",function(e)
{
	var SHEET_DOC_URL = "https://docs.google.com/forms/d/1W7qUQzgpdtVXQTwYLpqgbMx8gBWfWB_XVrZpi9P7yOw/formResponse";
	
	var SHEET_ITEM_HOUSE    = "entry.1944352540";
	var SHEET_ITEM_PASSWORD = "entry.370169595";
	var SHEET_ITEM_BLUE     = "entry.355362974";
	var SHEET_ITEM_WHITE    = "entry.695483925";

	var checkPasswordValid = function (id, pw)
	{
		if(id != pw)
		{
			$("#pw_id").val("");
			return false;
		}	
		else
			return true;
	}
	
	var checkFieldFormat = function ()
	{
		var is_valid = true;

		if(!$.isNumeric($("#house_id").val()))
		{
			$("#house_id").val("");
			is_valid = false;
		}	
		if(!$.isNumeric($("#white_ticket_id").val()))
		{
			$("#white_ticket_id").val("");
			is_valid = false;
		}	
		if(!$.isNumeric($("#blue_ticket_id").val()))
		{
			$("#blue_ticket_id").val("");
			is_valid = false;
		}	

		return is_valid;
	}

	var onBtnSubmitClick = function (e)
	{
		var house_id = $("#house_id").val();
		var password = $("#pw_id").val();
		var white_ticket_num = $("#white_ticket_id").val();
		var blue_ticket_num = $("#blue_ticket_id").val();
		

		if(house_id != undefined && password != undefined && white_ticket_num != undefined && blue_ticket_num != undefined)
		{
			if(checkFieldFormat())
			{
				if(checkPasswordValid(house_id,password))  //edit2=2_ABaOnueH6H1RPV-5YVsgyXMOEu_8Aw5pq1Q2CjNnCY3VJJs2n5n5y07gnQ&
				{
					$.getScript(SHEET_DOC_URL+"?"+SHEET_ITEM_HOUSE+"="+house_id+"&"+SHEET_ITEM_PASSWORD+"="+password+"&"+SHEET_ITEM_WHITE+"="+white_ticket_num+"&"+SHEET_ITEM_BLUE+"="+blue_ticket_num+"&submit=Submit");
				}
				else
				{
					alert("密碼錯誤  請再次確認投票所編號與密碼");
				}	
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

	$("#btn_submit").on("click",onBtnSubmitClick);
});