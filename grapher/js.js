var xmin;
var xmax;
var ymin;
var ymax;
var animate = false;
var animaterunning = false;
var animatespeed = false;
var finaldata;
var r;
var scalefactor;
var dataforselector;
var highestkey;

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

$(document).on('paste', function(e) {
    e.preventDefault();
    var text = '';
    if (e.clipboardData || e.originalEvent.clipboardData) {
      text = (e.originalEvent || e).clipboardData.getData('text/plain');
    } else if (window.clipboardData) {
      text = window.clipboardData.getData('Text');
    }
    if (document.queryCommandSupported('insertText')) {
      document.execCommand('insertText', false, text);
    } else {
      document.execCommand('paste', false, text);
    }
    $('#textarea').val(text);
});

$(function(){

	$('#graph').on('load', function(){
		$('#loading').hide();
	});

	$( "#left" ).scroll(function() {
		$(".tabletop td, .tabletop th").css("top",$("#left").scrollTop()-2+"px");
	});

	// This must be a hyperlink
	$("#download").on('click', function (event) {
		try {
			ga('send', 'event', 'Function', 'Data - download', ipaddress);
		} catch(err) {
			console.log(err.message);
		}
		// CSV
		exportTableToCSV.apply(this, [$('#data'), 'data.csv']);

		// IF CSV, don't do event.preventDefault() or return false
		// We actually need this to be a typical hyperlink
	});
	
	$("#downloadnzgrapher").on('click', function (event) {
		try {
			ga('send', 'event', 'Function', 'Data - download NZGrapher', ipaddress);
		} catch(err) {
			console.log(err.message);
		}
		// CSV
		exportNZGrapher.apply(this, [$('#data'), 'data.nzgrapher']);

		// IF CSV, don't do event.preventDefault() or return false
		// We actually need this to be a typical hyperlink
	});
	
	var menu='hidden';

	$( ".abutton" ).on('click',function() {
		if(menu=='show'){
			menu='hidden'
		} else {
			menu='show'
		}
	});
	
	$( ".abutton" ).on('click mouseover',function() {
		$("#rowbox").hide();
		$("#colbox").hide();
		$("#sambox").hide();
		$("#teachingtoolsbox").hide();
		$("#filepop").hide();
		$("#helppopup").hide();
		$(".abutton" ).css("background","none");
		$(this).css("background-color","rgba(0,100,200,0.85)");
	});
	
	$( "#buttons" ).on('mouseout',function() {
		$( ".abutton" ).css('background','none');
	});
	
	$( "#rowbox" ).on('mouseover',function() {
		$("#rowshowhide").css("background-color","rgba(0,100,200,0.85)");
	});
	
	$( "#colbox" ).on('mouseover',function() {
		$("#colshowhide").css("background-color","rgba(0,100,200,0.85)");
	});
	
	$( "#sambox" ).on('mouseover',function() {
		$("#samshowhide").css("background-color","rgba(0,100,200,0.85)");
	});
	
	$( "#teachingtoolsbox" ).on('mouseover',function() {
		$("#teachingtoolsshowhide").css("background-color","rgba(0,100,200,0.85)");
	});
	
	$( "#filepop" ).on('mouseover',function() {
		$("#fileshowhide").css("background-color","rgba(0,100,200,0.85)");
	});
	
	$( "#helppopup" ).on('mouseover',function() {
		$("#helper").css("background-color","rgba(0,100,200,0.85)");
	});
	
	$('.popup li').on('click',function() {
		$(".abutton" ).css("background","none");
		$(".popup" ).hide();
		menu='hidden';
	});
	
	$('#pastelinkclick').click(function() {
		try {
			ga('send', 'event', 'Function', 'Data - pastelinkclick', ipaddress);
		} catch(err) {
			console.log(err.message);
		}
		document.getElementById("pastelink").style.display="block";
		document.getElementById("linkarea").value="";
		document.getElementById("linkarea").focus();
	});
	
	$('#pastetableclick').click(function() {
		try {
			ga('send', 'event', 'Function', 'Data - pastetableclick', ipaddress);
		} catch(err) {
			console.log(err.message);
		}
		document.getElementById("pastetext").style.display="block";
		document.getElementById("textarea").value="";
		document.getElementById("textarea").focus();
	});

	$( "#fileshowhide" ).on('click mouseover',function() {
		$("#rowbox").hide();
		$("#colbox").hide();
		$("#sambox").hide();
		$("#teachingtoolsbox").hide();
		$("#helppopup").hide();
		$("#showhideleftbottom").hide();
		var left = $( "#fileshowhide" )[0].getBoundingClientRect().left;
		$("#filepop").css("left",left+"px");
		if(menu=="show"){
			$("#filepop").show();
		} else {
			$("#filepop").hide();
		}
	});

	$( "#helper" ).on('click mouseover',function() {
		$("#rowbox").hide();
		$("#colbox").hide();
		$("#sambox").hide();
		$("#teachingtoolsbox").hide();
		$("#helppopup").hide();
		$("#showhideleftbottom").hide();
		var left = $( "#helper" )[0].getBoundingClientRect().left;
		$("#helppopup").css("left",left+"px");
		if(menu=="show"){
			$("#helppopup").show();
		} else {
			$("#helppopup").hide();
		}
	});

	$( "#rowshowhide" ).on('click mouseover',function() {
		$("#colbox").hide();
		$("#sambox").hide();
		$("#teachingtoolsbox").hide();
		$("#filepop").hide();
		$("#helppopup").hide();
		$("#showhideleftbottom").hide();
		var left = $( "#rowshowhide" )[0].getBoundingClientRect().left;
		$("#rowbox").css("left",left+"px");
		if(menu=="show"){
			$("#rowbox").show();
		} else {
			$("#rowbox").hide();
		}
	});

	$( "#colshowhide" ).on('click mouseover',function() {
		$("#rowbox").hide();
		$("#sambox").hide();
		$("#teachingtoolsbox").hide();
		$("#filepop").hide();
		$("#helppopup").hide();
		$("#showhideleftbottom").hide();
		var left = $( "#colshowhide" )[0].getBoundingClientRect().left;
		$("#colbox").css("left",left+"px");
		if(menu=="show"){
			$("#colbox").show();
		} else {
			$("#colbox").hide();
		}
	});

	$( "#samshowhide" ).on('click mouseover',function() {
		$("#rowbox").hide();
		$("#colbox").hide();
		$("#filepop").hide();
		$("#helppopup").hide();
		$("#teachingtoolsbox").hide();
		$("#showhideleftbottom").hide();
		var left = $( "#samshowhide" )[0].getBoundingClientRect().left;
		$("#sambox").css("left",left+"px");
		if(menu=="show"){
			$("#sambox").show();
		} else {
			$("#sambox").hide();
		}
	});

	$( "#teachingtoolsshowhide" ).on('click mouseover',function() {
		$("#rowbox").hide();
		$("#colbox").hide();
		$("#filepop").hide();
		$("#sambox").hide();
		$("#helppopup").hide();
		$("#showhideleftbottom").hide();
		var left = $( "#teachingtoolsshowhide" )[0].getBoundingClientRect().left;
		$("#teachingtoolsbox").css("left",left+"px");
		if(menu=="show"){
			$("#teachingtoolsbox").show();
		} else {
			$("#teachingtoolsbox").hide();
		}
	});

	$( "#3dots" ).click(function() {
		try {
			ga('send', 'event', 'Function', '3dots', ipaddress);
		} catch(err) {
			console.log(err.message);
		}
		$("#rowbox").hide();
		$("#colbox").hide();
		$("#sambox").hide();
		$("#filepop").hide();
		$("#helppopup").hide();
		$("#showhideleftbottom").toggle();
	});

	$("#data td div").keypress(function(e){ return e.which != 13; });
	$("#data td div").keypress(function(e){ return e.which != 44; });
	$("#data td div").keypress(function(e){ if(e.which == 44){alert("You entered a comma... you can't to this.");} });

	$( "#addcol" ).click(function() {
		try {
			ga('send', 'event', 'Function', 'Column - addcol', ipaddress);
		} catch(err) {
			console.log(err.message);
		}
		$("#data tr").append("<td><div><br></div></td>");
		$('#data td div').attr('contenteditable','true');
		updatebox();
	});
	$( "#addrow" ).click(function() {
		try {
			ga('send', 'event', 'Function', 'Row - addrow', ipaddress);
		} catch(err) {
			console.log(err.message);
		}
		var col=$("#data").find("tr:first td").length;
		var row=$('#data tr').length;
		var add="<tr><th>"+(row);
		for ( var i = 0; i < col; i++ ) {
			add=add+"<td><div><br></div></td>";
		}
		$('#data').append(add);
		$('#data td div').attr('contenteditable','true');
		updatebox();
		$("#rowshowhide").click();
	});
	$( "#delrow" ).click(function() {
		try {
			ga('send', 'event', 'Function', 'Row - delrow', ipaddress);
		} catch(err) {
			console.log(err.message);
		}
		if($('#data tr').length>1){
			$('#data tr:last').remove();
		};
		updatebox();
	});
	$( "#delcol" ).click(function() {
		try {
			ga('send', 'event', 'Function', 'Column - delcol', ipaddress);
		} catch(err) {
			console.log(err.message);
		}
		$('#data tr td:last-child').remove();
		$('#type').val('newabout');
		updatebox();
	});

	$( "#delspecrow" ).click(function() {
		try {
			ga('send', 'event', 'Function', 'Row - delspecrow', ipaddress);
		} catch(err) {
			console.log(err.message);
		}
		var row;
		row=prompt("Which row do you want to delete?");
		$('#data tr:eq('+row+')').remove();
		var i=0;
		$('#data tr th:first-child').each(function() {
			if(i!=0){$(this).html(i);}
			i++;
		});
		$("#rowbox").hide();
		$("#colbox").hide();
		$("#sambox").hide();
		updatebox();
	});
	
	$( "#deletecolgo" ).click(function() {
		try {
			ga('send', 'event', 'Function', 'Column - deletecolgo', ipaddress);
		} catch(err) {
			console.log(err.message);
		}
		col=$('#columndel').val();
		$('#data tr').each(function(){
			$(this).find('td:eq('+col+')').remove();
		})
		var xselindex = document.getElementById("xvar").selectedIndex;
		var yselindex = document.getElementById("yvar").selectedIndex;
		var zselindex = document.getElementById("zvar").selectedIndex;
		var colselindex = document.getElementById("color").selectedIndex;
		if(xselindex>col){document.getElementById("xvar").selectedIndex=xselindex-1;}
		if(yselindex>col){document.getElementById("yvar").selectedIndex=yselindex-1;}
		if(zselindex>col){document.getElementById("zvar").selectedIndex=zselindex-1;}
		if(colselindex>col){document.getElementById("color").selectedIndex=colselindex-1;}
		updatebox();
		$ ("#deletecoldiv").hide();
	});
	
	$( "#delspeccol" ).click(function() {
		try {
			ga('send', 'event', 'Function', 'Column - delspeccol', ipaddress);
		} catch(err) {
			console.log(err.message);
		}
		$("#rowbox").hide();
		$("#colbox").hide();
		$("#sambox").hide();
		$ ("#deletecoldiv").show();
		var col=0;
		var options=[];
		$('#data tr:first td').each( function(){
			options.push('<option value="' + col + '">' + $(this).text() + '</option>');
			col++;
		});
		//finally empty the select and append the items from the array
		$('#columndel').empty().append( options.join() );
	});
	
	$( "#highlightdatatable" ).click(function() {
		try {
			ga('send', 'event', 'Function', 'Data - highlightdatatable', ipaddress);
		} catch(err) {
			console.log(err.message);
		}
		$('#filepop').hide();
		selectText($('#data')[0]);
	});

	$( "#reorder").click(function(){
		try {
			ga('send', 'event', 'Function', 'Sample and More - reorder', ipaddress);
		} catch(err) {
			console.log(err.message);
		}
		$("#rowbox").hide();
		$("#colbox").hide();
		$("#sambox").hide();
		$ ("#orderdiv").show();
		$ ("#sampling").show();
		var col=2;
		var options=[];
		options.push('<option value=""></option>');
		$('#data tr:first td').each( function(){
			var items=[];
			//Iterate all td's in second column
			$('#data tr td:nth-child('+col+')').each( function(){
			   //add item to array
			   items.push( $(this).text() );
			});
			var values=[];
			var a=0;
			var optionname;
			//iterate unique array and build array of select options
			$.each( items, function(i, item){
				if(a==0){
					optionname=item.trim();
				} else {
					values.push(item.trim());
				}
				a=a+1;
			})
			var allvals=values;
			uniquevalues=unique( values );
			if(uniquevalues.length<10){
				uniquevalues.sort(sortorder);
				var value="";
				$.each(uniquevalues, function( index, val ) {
					var num=countval(allvals,val);
					value=value+val+','+num+',';
				});
				options.push('<option value="' + value + '">' + optionname + '</option>');
			}
			col++;
		});
		//finally empty the select and append the items from the array
		$('#orderby').empty().append( options.join() );
		$('#orderingtable').empty();
	});

	$ ("#orderby").change(function(){
		try {
			ga('send', 'event', 'Function', 'Sample and More - orderby', ipaddress);
		} catch(err) {
			console.log(err.message);
		}
		var sampleon = $('#orderby option:selected').text();
		var options = this.value.split(',');
		options.pop();
		if($.inArray( sampleon, options )>-1){
			alert('Title of column matches some of the contents... this will cause issues when ordering. Please change the name of the column');
		}
		$('#orderingtable').empty();
		for(var i=0;i<options.length;i++) {
			$('#orderingtable').append('<tr><td style="font-size:14px;">'+options[i]+'<td><input id="order-'+options[i]+'"><td>');
			i++;
		}
	});

	$ ("#ordergo").click(function(){
		try {
			ga('send', 'event', 'Function', 'Sample and More - ordergo', ipaddress);
		} catch(err) {
			console.log(err.message);
		}
		$ ("#sampling").hide();
		window.setTimeout(function(){
		var orderby = $('#orderby option:selected').text();
		var index = $("#data td:contains('"+orderby.split("'")[0]+"')").filter(function() {
					return $(this).text() === orderby;
				}).index() + 1;
		var num = $('[id^="order-"]').length;
		for(var i=0;i<num;i++){
			var  ordernum = $('[id^="order-"]')[i].value;
			var  ordername = $('[id^="order-"]')[i].id;
			ordername = ordername.slice(6);
			if(ordername!=''){
				//$("#data td:nth-child(" + index + "):contains('"+ordername+"')").html('<div contenteditable="true">'+ordernum+'. '+ordername+'<br></div>');
				$("#data td:nth-child(" + index + "):contains('"+ordername.split("'")[0]+"')").filter(function() {
					return $(this).text() === ordername;
				}).html('<div contenteditable="true">'+ordernum+'. '+ordername+'<br></div>');
			}
		}
		}, 0.0001);
		$ ("#orderdiv").hide();
		updatebox();
	});

	$( "#sort" ).click(function() {
		try {
			ga('send', 'event', 'Function', 'Sample and More - sort', ipaddress);
		} catch(err) {
			console.log(err.message);
		}
		$ ("#sortdiv").show();
		$ ("#sampling").show();
		$("#rowbox").hide();
		$("#colbox").hide();
		$("#sambox").hide();
		var col=2;
		var options=[];
		options.push('<option></option>');
		$('#data tr:first td').each( function(){
			options.push('<option value="'+(col-2)+'">' + $(this).text() + '</option>');
			col++;
		});
		//finally empty the select and append the items from the array
		$('#sortby').empty().append( options.join() );
	});

	$( "#filter" ).click(function() {
		try {
			ga('send', 'event', 'Function', 'Sample and More - filter', ipaddress);
		} catch(err) {
			console.log(err.message);
		}
		$ ("#filterdiv").show();
		$ ("#sampling").show();
		$("#rowbox").hide();
		$("#colbox").hide();
		$("#sambox").hide();
		var col=2;
		var options=[];
		options.push('<option></option>');
		$('#data tr:first td').each( function(){
			options.push('<option value="'+(col-2)+'">' + $(this).text() + '</option>');
			col++;
		});
		//finally empty the select and append the items from the array
		$('#filterby').empty().append( options.join() );
	});

	$ ("#sortgo").click(function(){
		try {
			ga('send', 'event', 'Function', 'Sample and More - sortgo', ipaddress);
		} catch(err) {
			console.log(err.message);
		}
		var col = $('#sortby').val();
		sortTable(col);
		$ ("#sampling").hide();
		$ ("#sortdiv").hide();
	});

	$( "#samvar" ).click(function() {
		try {
			ga('send', 'event', 'Function', 'Teaching Tools - samvar', ipaddress);
		} catch(err) {
			console.log(err.message);
		}
		$("#rowbox").hide();
		$("#colbox").hide();
		$("#sambox").hide();
		$("#samvardiv").show();
		$("#rerandteachdiv").hide();
		$("#bsteachdiv").hide();
		var col=2;
		var options=[];
		options.push('<option value=",,">Simple Random</option>');
		$('#data tr:first td').each( function(){
			var items=[];
			//Iterate all td's in second column
			$('#data tr td:nth-child('+col+')').each( function(){
			   //add item to array
			   items.push( $(this).text() );
			});
			var values=[];
			var a=0;
			var optionname;
			//iterate unique array and build array of select options
			$.each( items, function(i, item){
				if(a==0){
					optionname=item.trim();
				} else {
					values.push(item.trim());
				}
				a=a+1;
			})
			var allvals=values;
			uniquevalues=unique( values );
			if(uniquevalues.length<500){
				uniquevalues.sort(sortorder);
				var value="";
				$.each(uniquevalues, function( index, val ) {
					var num=countval(allvals,val);
					value=value+val+','+num+',';
				});
				options.push('<option value="' + value + '">' + optionname + '</option>');
			}
			col++;
		});
		//finally empty the select and append the items from the array
		$('#samvaron').empty().append( options.join() );
		$('#samvartable').empty();
		$('#samvartable').append('<tr><td> <td><input id="samvar-">');
		$('#presampledataholder').html($('#data').html());
		$('#left').scrollTop(0);
	});

	$( "#rerand" ).click(function() {
		try {
			ga('send', 'event', 'Function', 'Teaching Tools - rerand', ipaddress);
		} catch(err) {
			console.log(err.message);
		}
		$("#rowbox").hide();
		$("#colbox").hide();
		$("#sambox").hide();
		$("#samvardiv").hide();
		$("#rerandteachdiv").show();
		$("#bsteachdiv").hide();
		$("#type").val("newrerandteach");
		$('#left').scrollTop(0);
		updatebox();
	});

	$( "#bs" ).click(function() {
		try {
			ga('send', 'event', 'Function', 'Teaching Tools - bs', ipaddress);
		} catch(err) {
			console.log(err.message);
		}
		$("#rowbox").hide();
		$("#colbox").hide();
		$("#sambox").hide();
		$("#samvardiv").hide();
		$("#rerandteachdiv").hide();
		$("#bsteachdiv").show();
		$("#type").val("newbsteach");
		$('#left').scrollTop(0);
		updatebox();
	});
	
	$( "#regroup" ).click(function() {
		try {
			ga('send', 'event', 'Function', 'Sample and More - regroup', ipaddress);
		} catch(err) {
			console.log(err.message);
		}
		$("#rowbox").hide();
		$("#colbox").hide();
		$("#sambox").hide();
		$ ("#sampling").show();
		$ ("#regroupdiv").show();
		var col=2;
		var options=[];
		options.push('<option value=",,">-</option>');
		$('#data tr:first td').each( function(){
			var items=[];
			//Iterate all td's in second column
			$('#data tr td:nth-child('+col+')').each( function(){
			   //add item to array
			   items.push( $(this).text() );
			});
			var values=[];
			var a=0;
			var optionname;
			//iterate unique array and build array of select options
			$.each( items, function(i, item){
				if(a==0){
					optionname=item.trim();
				} else {
					values.push(item.trim());
				}
				a=a+1;
			})
			var allvals=values;
			uniquevalues=unique( values );
			if(uniquevalues.length<500){
				uniquevalues.sort(sortorder);
				var value="";
				$.each(uniquevalues, function( index, val ) {
					var num=countval(allvals,val);
					value=value+val+','+num+',';
				});
				options.push('<option value="' + value + '">' + optionname + '</option>');
			}
			col++;
		});
		//finally empty the select and append the items from the array
		$('#regroupwith').empty().append( options.join() );
		$('#regrouptable').empty();
		$('#regrouptable').append('<tr><td> <td><input id="regroup-">');
	});

	$ ("#regroupwith").change(function(){
		var regroupwith = $('#regroupwith option:selected').text();
		var options = this.value.split(',');
		options.pop();
		if($.inArray( regroupwith, options )>-1){
			alert('Title of column matches some of the contents... this will cause issues when sampling. Please change the name of the column');
		}
		$('#regrouptable').empty();
		for(var i=0;i<options.length;i++) {
			$('#regrouptable').append('<tr><td style="font-size:14px;">'+options[i]+' ('+options[i+1]+')'+'<td><input id="regroup-'+options[i]+'"><td>');
			i++;
		}
	});

	$ ("#regroupgo").click(function(){
		try {
			ga('send', 'event', 'Function', 'Sample and More - regroupgo', ipaddress);
		} catch(err) {
			console.log(err.message);
		}
		$ ("#regroupdiv").hide();
		var variable = $('#regroupwith option:selected').text();
		var index = $("#data td:contains('"+variable.split("'")[0]+"')").filter(function() {
			return $(this).text() === variable;
		}).index() - 1;
		var a=0;
		var num = $('[id^="regroup-"]').length;
		var regroups = {};
		for(var i=0;i<num;i++){
			var  regroupto = $('[id^="regroup-"]')[i].value;
			var  regroupfrom = $('[id^="regroup-"]')[i].id;
			regroupfrom = regroupfrom.slice(8);
			regroups[regroupfrom]=regroupto;
		}
		$('#data tr').each(function(){
			if(a==0){
				$(this).append("<td><div>" + variable + " (Re-Grouped)<br></div></td>");
			} else {
				val="";
				currentval = $(this).children('td').eq(index).text();
				val = regroups[currentval];
				$(this).append("<td><div>" + val + "<br></div></td>");
			}
			a++;
		});
		$('#data td div').attr('contenteditable','true');
		updatebox();
		$ ("#sampling").hide();
	});

	$( "#sample" ).click(function() {
		try {
			ga('send', 'event', 'Function', 'Sample and More - sample', ipaddress);
		} catch(err) {
			console.log(err.message);
		}
		$("#rowbox").hide();
		$("#colbox").hide();
		$("#sambox").hide();
		$ ("#sampling").show();
		$ ("#samplediv").show();
		var col=2;
		var options=[];
		options.push('<option value=",,">Simple Random</option>');
		$('#data tr:first td').each( function(){
			var items=[];
			//Iterate all td's in second column
			$('#data tr td:nth-child('+col+')').each( function(){
			   //add item to array
			   items.push( $(this).text() );
			});
			var values=[];
			var a=0;
			var optionname;
			//iterate unique array and build array of select options
			$.each( items, function(i, item){
				if(a==0){
					optionname=item.trim();
				} else {
					values.push(item.trim());
				}
				a=a+1;
			})
			var allvals=values;
			uniquevalues=unique( values );
			if(uniquevalues.length<500){
				uniquevalues.sort(sortorder);
				var value="";
				$.each(uniquevalues, function( index, val ) {
					var num=countval(allvals,val);
					value=value+val+','+num+',';
				});
				options.push('<option value="' + value + '">' + optionname + '</option>');
			}
			col++;
		});
		//finally empty the select and append the items from the array
		$('#sampleon').empty().append( options.join() );
		$('#samplingtable').empty();
		$('#samplingtable').append('<tr><td> <td><input id="sample-">');
	});

	$ ("#sampleon").change(function(){
		var sampleon = $('#sampleon option:selected').text();
		var options = this.value.split(',');
		options.pop();
		if($.inArray( sampleon, options )>-1){
			alert('Title of column matches some of the contents... this will cause issues when sampling. Please change the name of the column');
		}
		$('#samplingtable').empty();
		for(var i=0;i<options.length;i++) {
			$('#samplingtable').append('<tr><td style="font-size:14px;">'+options[i]+' ('+options[i+1]+')'+'<td><input id="sample-'+options[i]+'"><td>');
			i++;
		}
	});
	
	$ ("#samvaron").change(function(){
		var sampleon = $('#samvaron option:selected').text();
		var options = this.value.split(',');
		options.pop();
		if($.inArray( sampleon, options )>-1){
			alert('Title of column matches some of the contents... this will cause issues when sampling. Please change the name of the column');
		}
		$('#samvartable').empty();
		for(var i=0;i<options.length;i++) {
			$('#samvartable').append('<tr><td style="font-size:14px;">'+options[i]+' ('+options[i+1]+')'+'<td><input id="samvar-'+options[i]+'"><td>');
			i++;
		}
	});

	$ ("#samplego").click(function(){
		try {
			ga('send', 'event', 'Function', 'Sample and More - samplego', ipaddress);
		} catch(err) {
			console.log(err.message);
		}
		$("#samplediv").hide();
		window.setTimeout(function(){
		console.log($('[id^="sample-"]').length);
		if($('[id^="sample-"]').length==1){
			$("#updating").css({"display": "block"});
			var  samplesize=$('[id^="sample-"]')[0].value;
			if(samplesize){
				samplesize=Number(samplesize)+1;
				var rows = $('#data tr').slice(1);
				var i = rows.length;
				while (i >= samplesize){
					row = Math.floor(i * Math.random());
					rem = rows[row];
					rem.parentNode.removeChild(rem);
					delete rows[row];
					rows.splice(row,1);
					i--;
				}
				i=0;
				$('#data tr th:first-child').each(function() {
					if(i!=0){$(this).html(i);}
					i++;
				});
			}
			document.getElementById('updating').style.display = "none";
			updatebox();
			$("#sampling").hide();
		} else {
			var sampleon = $('#sampleon option:selected').text();
			var index = $("#data td:contains('"+sampleon.split("'")[0]+"')").filter(function() {
					return $(this).text() === sampleon;
				}).index() + 1;
			var num = $('[id^="sample-"]').length;
			for(var i=0;i<num;i++){
				var  samplesize = $('[id^="sample-"]')[i].value;
				var  samplename = $('[id^="sample-"]')[i].id;
				samplename = samplename.slice(7);
				var rows = $("#data td:nth-child(" + index + "):contains('"+samplename.split("'")[0]+"')").filter(function() {
					return $(this).text() === samplename;
				});
				var parentrows = rows.parent();
				var okCount = parentrows.length;

				var z;
				var rem;

				while (okCount>samplesize){
					var row = Math.floor(okCount * Math.random());
					rem = parentrows[row];
					rem.parentNode.removeChild(rem);
					delete parentrows[row];
					parentrows.splice(row,1);
					okCount = okCount-1;
				}
			}
			i=0;
			$('#data tr th:first-child').each(function() {
				if(i!=0){$(this).html(i);}
				i++;
			});
			document.getElementById('updating').style.display = "none";
			updatebox();
			$("#sampling").hide();
		}
		}, 0.0001);
		updatebox();
	});

	$ ("#samvargo").click(function(){
		try {
			ga('send', 'event', 'Function', 'Sample and More - samvargo', ipaddress);
		} catch(err) {
			console.log(err.message);
		}
		$('#data').html($('#presampledataholder').html());
		window.setTimeout(function(){
		if($('[id^="samvar-"]').length==1){
			var samplesize=$('[id^="samvar-"]')[0].value;
			if(samplesize){
				samplesize=Number(samplesize)+1;
				var rows = $('#data tr').slice(1);
				var i = rows.length;
				while (i >= samplesize){
					row = Math.floor(i * Math.random());
					rem = rows[row];
					rem.parentNode.removeChild(rem);
					delete rows[row];
					rows.splice(row,1);
					i--;
				}
				i=0;
				$('#data tr th:first-child').each(function() {
					if(i!=0){$(this).html(i);}
					i++;
				});
			}
			updatebox();
		} else {
			var sampleon = $('#samvaron option:selected').text();
			var index = $("#data td:contains('"+sampleon.split("'")[0]+"')").filter(function() {
					return $(this).text() === sampleon;
				}).index() + 1;
			var num = $('[id^="samvar-"]').length;
			for(var i=0;i<num;i++){
				var  samplesize = $('[id^="samvar-"]')[i].value;
				var  samplename = $('[id^="samvar-"]')[i].id;
				samplename = samplename.slice(7);
				var rows = $("#data td:nth-child(" + index + "):contains('"+samplename.split("'")[0]+"')").filter(function() {
					return $(this).text() === samplename;
				});
				var parentrows = rows.parent();
				var okCount = parentrows.length;

				var z;
				var rem;

				while (okCount>samplesize){
					var row = Math.floor(okCount * Math.random());
					rem = parentrows[row];
					rem.parentNode.removeChild(rem);
					delete parentrows[row];
					parentrows.splice(row,1);
					okCount = okCount-1;
				}
			}
			i=0;
			$('#data tr th:first-child').each(function() {
				if(i!=0){$(this).html(i);}
				i++;
			});
			updatebox();
		}
		}, 0.0001);
	});

	function animatefunction(){
		if(animaterunning && !animate){
			clearTimeout(animatetimeout);
		}
		if(animate){
			animaterunning = true;
			$("#samvargo").click();
			animatetimeout = setTimeout(animatefunction,animatespeed);
		}
	}

	$ ("#samvarreset").click(function(){
		$('#samvarstop').click();
		$('#data').html($('#presampledataholder').html());
		updatebox();
	});

	$ ("#samvaranimateslow").click(function(){
		console.log('samvaranimateslow');
		animate = true;
		animatespeed = 1000;
		animatefunction();
	});

	$ ("#samvaranimatefast").click(function(){
		console.log('samvaranimateslow');
		animate = true;
		animatespeed = 200;
		animatefunction();
	});

	$ ("#samvarstop").click(function(){
		console.log('samvarstop');
		animate = false;
		animatespeed = false;
		updatebox();
	});
	
	$('#rereandteachoneslow').click(function(){
		console.log('rereandteachoneslow');
		animate = true;
		currentrerandspeed = 'oneslow';
		updategraph();
	});
	
	$('#rereandteachonefast').click(function(){
		console.log('rereandteachonefast');
		animate = true;
		currentrerandspeed = 'onefast';
		updategraph();
	});
	
	$('#rereandteachrestslow').click(function(){
		console.log('rereandteachrestslow');
		animate = true;
		currentrerandspeed = 'restslow';
		updategraph();
	});
	
	$('#rereandteachrestmedium').click(function(){
		console.log('rereandteachrestmedium');
		animate = true;
		currentrerandspeed = 'restmedium';
		updategraph();
	});
	
	$('#rereandteachrestfast').click(function(){
		console.log('rereandteachrestfast');
		animate = true;
		currentrerandspeed = 'restfast';
		updategraph();
	});
	
	$('#rerandteachpause').click(function(){
		console.log('rerandteachpause');
		animate = false;
		currentrerandspeed = 'stopped';
		updategraph();
	});
	
	$('#rerandteachreset').click(function(){
		console.log('rerandteachreset');
		animate = false;
		currentrerandteachstep = 'presample';
		currentrerandteachypoints = [];
		currentrerandteachopoints = [];
		currentrerandteachygroups = [];
		currentrerandteachsample = {};
		currentrerandteachdiffs = [];
		currentrerandteachsamplepoints = [];
		currentrerandspeed = 'stopped';
		lastxpixel = 0;
		lastypixel = 0;
		lastkey = 0;
		$('#rerandteachremaining').html("1000");
		updategraph();
	});
	
	$('#bsteachoneslow').click(function(){
		console.log('bsteachoneslow');
		animate = true;
		currentbsspeed = 'oneslow';
		updategraph();
	});
	
	$('#bsteachonefast').click(function(){
		console.log('bsteachonefast');
		animate = true;
		currentbsspeed = 'onefast';
		updategraph();
	});
	
	$('#bsteachrestslow').click(function(){
		console.log('bsteachrestslow');
		animate = true;
		currentbsspeed = 'restslow';
		updategraph();
	});
	
	$('#bsteachrestmedium').click(function(){
		console.log('bsteachrestmedium');
		animate = true;
		currentbsspeed = 'restmedium';
		updategraph();
	});
	
	$('#bsteachrestfast').click(function(){
		console.log('bsteachrestfast');
		animate = true;
		currentbsspeed = 'restfast';
		updategraph();
	});
	
	$('#bsteachpause').click(function(){
		console.log('bsteachpause');
		animate = false;
		currentbsspeed = 'stopped';
		updategraph();
	});
	
	$('#bsteachreset').click(function(){
		console.log('bsteachreset');
		animate = false;
		currentbsteachstep = 'presample';
		currentbsteachypoints = [];
		currentbsteachopoints = [];
		currentbsteachygroups = [];
		currentbsteachsample = {};
		currentbsteachdiffs = [];
		currentbsteachsamplepoints = [];
		currentbsspeed = 'stopped';
		lastxpixel = 0;
		lastypixel = 0;
		lastkey = 0;
		$('#bsteachremaining').html("1000");
		updategraph();
	});
		
	$ ("#filtergo").click(function(){
		try {
			ga('send', 'event', 'Function', 'Sample and More - filtergo', ipaddress);
		} catch(err) {
			console.log(err.message);
		}
		var filtermin = parseFloat($('#filtermin').val());
		var filtermax = parseFloat($('#filtermax').val());
		if(isNaN(filtermin) || isNaN(filtermax)){
			alert('The min and max must be set');
			return false;
		}
		var filterby = $('#filterby option:selected').text();
		if (filterby.length==0){
			alert('The variable to filter by must be set');
			return false;
		}
		$("#filterdiv").hide();
		var index = $("#data td:contains('"+filterby.split("'")[0]+"')").filter(function() {
				return $(this).text() === filterby;
			}).index() - 1;
		var a=0;
		$('#data tr').each(function(){
			if(a!=0){
				val = parseFloat($(this).children('td').eq(index).text());
				if (val < filtermin || val > filtermax){
					$(this).remove();
				}
			}
			a++;
		});
		i=0;
		$('#data tr th:first-child').each(function() {
			if(i!=0){$(this).html(i);}
			i++;
		});
		$("#sampling").hide();
		updatebox();
	});


	$( "#reset" ).click(function() {
		try {
			ga('send', 'event', 'Function', 'reset', ipaddress);
		} catch(err) {
			console.log(err.message);
		}
		$('#progressdescription')[0].innerHTML = 'Resetting';
		$('#progressbarholder').show();
		loaddata();
	});

	$( "#newvarc2" ).click(function(){
		try {
			ga('send', 'event', 'Function', 'Sample and More - newvarc2', ipaddress);
		} catch(err) {
			console.log(err.message);
		}
		$("#rowbox").hide();
		$("#colbox").hide();
		$("#sambox").hide();
		$("#sampling").show();
		$("#newvarcdiv").show();
		var col=2;
		var options=[];
		options.push('<option></option>');
		$('#data tr:first td').each( function(){
			options.push('<option>' + $(this).text() + '</option>');
			col++;
		});
		//finally empty the select and append the items from the array
		$('#newvarcx').empty().append( options.join() );
	});

	$( "#newvarc3" ).click(function(){
		try {
			ga('send', 'event', 'Function', 'Sample and More - newvarc3', ipaddress);
		} catch(err) {
			console.log(err.message);
		}
		$("#rowbox").hide();
		$("#colbox").hide();
		$("#sambox").hide();
		$("#sampling").show();
		$("#newvarc3div").show();
		var col=2;
		var options=[];
		options.push('<option></option>');
		$('#data tr:first td').each( function(){
			options.push('<option>' + $(this).text() + '</option>');
			col++;
		});
		//finally empty the select and append the items from the array
		$('#newvarc3var').empty().append( options.join() );
		$('#newvarc3conds').html("");
		addnewcond();
	});

	$( "#newvar" ).click(function(){
		try {
			ga('send', 'event', 'Function', 'Sample and More - newvar', ipaddress);
		} catch(err) {
			console.log(err.message);
		}
		$("#rowbox").hide();
		$("#colbox").hide();
		$("#sambox").hide();
		$("#sampling").show();
		$("#newvardiv").show();
		var col=2;
		var options=[];
		options.push('<option></option>');
		$('#data tr:first td').each( function(){
			options.push('<option>' + $(this).text() + '</option>');
			col++;
		});
		//finally empty the select and append the items from the array
		$('#newvar1').empty().append( options.join() );
		$('#newvar2').empty().append( options.join() );
	});

	$( "#creatego" ).click(function(){
		try {
			ga('send', 'event', 'Function', 'Sample and More - creatego', ipaddress);
		} catch(err) {
			console.log(err.message);
		}
		$ ("#newvardiv").hide();
		var type = encodeURIComponent($('#newvarcom option:selected').text());
		var var1 = $('#newvar1 option:selected').text();
		var var2 = $('#newvar2 option:selected').text();
		var index1 = $("#data td:contains('"+var1.split("'")[0]+"')").filter(function() {
			return $(this).text() === var1;
		}).index() - 1;
		var index2 = $("#data td:contains('"+var2.split("'")[0]+"')").filter(function() {
			return $(this).text() === var2;
		}).index() - 1;
		var a=0;
		$('#data tr').each(function(){
			if(a==0){
				$(this).append("<td><div>" + var1 + " " + decodeURIComponent(type) + " " + var2 + "<br></div></td>");
			} else {
				if(type=="%2B"){
					var val = ((parseFloat($(this).children('td').eq(index1).text()) + parseFloat($(this).children('td').eq(index2).text())).toPrecision(5)*1).toString();
				} else if (type=="-"){
					var val = ((parseFloat($(this).children('td').eq(index1).text()) - parseFloat($(this).children('td').eq(index2).text())).toPrecision(5)*1).toString();
				} else if (type=="%C3%97"){
					var val = ((parseFloat($(this).children('td').eq(index1).text()) * parseFloat($(this).children('td').eq(index2).text())).toPrecision(5)*1).toString();
				} else if (type=="%C3%B7"){
					var val = ((parseFloat($(this).children('td').eq(index1).text()) / parseFloat($(this).children('td').eq(index2).text())).toPrecision(5)*1).toString();
				} else {
					var val="";
				}
				$(this).append("<td><div>" + val + "<br></div></td>");
			}
			a++;
		});
		$('#data td div').attr('contenteditable','true');
		updatebox();
		$ ("#sampling").hide();
	});

	$( "#createcgo" ).click(function(){
		try {
			ga('send', 'event', 'Function', 'Sample and More - createcgo', ipaddress);
		} catch(err) {
			console.log(err.message);
		}
		$ ("#newvarcdiv").hide();
		var cx = $('#newvarcx option:selected').text();
		var md = encodeURIComponent($('#newvarcmd option:selected').text());
		var a = parseFloat($('#newvarca').val());
		var as = encodeURIComponent($('#newvarcas option:selected').text());
		var b = parseFloat($('#newvarcb').val());
		var index = $("#data td:contains('"+cx.split("'")[0]+"')").filter(function() {
			return $(this).text() === cx;
		}).index() - 1;
		var i=0;
		$('#data tr').each(function(){
			if(i==0){
				title = cx;
				if(a){
					title = title + " " + decodeURIComponent(md) + " " + a;
				}
				if(b){
					title = title + " " + decodeURIComponent(as) + " " + b;
				}
				$(this).append("<td><div>" + title + "<br></div></td>");
			} else {
				val = $(this).children('td').eq(index).text();
				if(a){
					if(md=="%C3%97"){
						val = val * a;
					}
					if(md=="%C3%B7"){
						val = val / a;
					}
				}
				if(b){
					if(as=="%2B"){
						val = add(val,b);
					}
					if(as=="-"){
						val = add(val,-b);
					}
				}
				val = (parseFloat(val).toPrecision(10)*1).toString();
				$(this).append("<td><div>" + val + "<br></div></td>");
			}
			i++;
		});
		$('#data td div').attr('contenteditable','true');
		updatebox();
		$ ("#sampling").hide();
	});

	$( "#createc3go" ).click(function(){
		try {
			ga('send', 'event', 'Function', 'Sample and More - createc3go', ipaddress);
		} catch(err) {
			console.log(err.message);
		}
		$ ("#newvarc3div").hide();
		var cx = $('#newvarc3var option:selected').text();
		var index = $("#data td:contains('"+cx.split("'")[0]+"')").filter(function() {
			return $(this).text() === cx;
		}).index() - 1;
		var i=0;
		$('#data tr').each(function(){
			if(i==0){
				title = cx;
				title = title + " (Conditions)";
				$(this).append("<td><div>" + title + "<br></div></td>");
			} else {
				val = $(this).children('td').eq(index).text();
				if($.isNumeric( val )){val = parseFloat(val);}
				value = 'Other';
				$('.condition').each(function(){
					symbol = $(this).find('.newvarc3gle').val();
					cond = $(this).find('.newvarc3cond').val();
					if($.isNumeric( cond )){cond = parseFloat(cond);}
					if(symbol=="<"){
						if(val<cond){
							value=$(this).find('.newvarc3newval').val();
							return false;
						}
					} else if (symbol=="≤"){
						if(val<=cond){
							value=$(this).find('.newvarc3newval').val();
							return false;
						}
					} else if (symbol=="="){
						if(val==cond){
							value=$(this).find('.newvarc3newval').val();
							return false;
						}
					} else if (symbol=="≥"){
						if(val>=cond){
							value=$(this).find('.newvarc3newval').val();
							return false;
						}
					} else if (symbol==">"){
						if(val>cond){
							value=$(this).find('.newvarc3newval').val();
							return false;
						}
					}
				})
				$(this).append("<td><div>" + value + "<br></div></td>");
			}
			i++;
		});
		$('#data td div').attr('contenteditable','true');
		updatebox();
		$ ("#sampling").hide();
	});

	$ (".close").click(function(){
		$ ("#sampling").hide();
		$ ("#regroupdiv").hide();
		$ ("#filterdiv").hide();
		$ ("#newvardiv").hide();
		$ ("#newvarcdiv").hide();
		$ ("#orderdiv").hide();
		$ ("#sortdiv").hide();
		$ ("#samplediv").hide();
		$ ("#converttimediv").hide();
		$ ("#encodetimediv").hide();
		$ ("#deletecoldiv").hide();
		$ ("#newvarc3div").hide();
	});

	$( "#update" ).click(function(){
		try {
			ga('send', 'event', 'Function', 'update', ipaddress);
		} catch(err) {
			console.log(err.message);
		}
		updatebox()
	});

	$( "#importlink" ).click(function() {
		try {
			ga('send', 'event', 'Function', 'Data - importlink', ipaddress);
		} catch(err) {
			console.log(err.message);
		}
		var link = document.getElementById("linkarea").value;
		document.location = document.location.origin + document.location.pathname + '?url=' + encodeURIComponent(link);
	});
	
	$( "#import" ).click(function() {
		try {
			ga('send', 'event', 'Function', 'Data - import', ipaddress);
		} catch(err) {
			console.log(err.message);
		}
		var data = document.getElementById("textarea").value;
		csv_data = data;
		console.timeEnd("Loading Pasted Data");
		$('#progressdescription')[0].innerHTML = 'Creating Table';
		loaddata();
	});

});

function addnewcond(){
	$('#newvarc3conds').append("<span class=condition>If <select style='width:50px' class=newvarc3gle><option><</option><option>&le;</option><option>=</option><option>&ge;</option><option>></option></select> <input style='width:100px;position:relative;top:1px;' class=newvarc3cond> then <input style='width:100px;position:relative;top:1px;' class=newvarc3newval></span><br>");
}

function moreoptions(){
	try {
		ga('send', 'event', 'Function', 'moreoptions', ipaddress);
	} catch(err) {
		console.log(err.message);
	}
	$("#cover").show();
	$("#options").show();
}

function graphchange(obj){
	document.getElementById('sum').style.display='none';
	document.getElementById('reg').style.display='none';
	document.getElementById('for').style.display='none';
	document.getElementById('regshow').style.display='none';
	document.getElementById('boxplotshow').style.display='none';
	document.getElementById('intervalshow').style.display='none';
	document.getElementById('labelshow').style.display='none';
	document.getElementById('arrowsshow').style.display='none';
	document.getElementById('xvar').style.display='none';
	document.getElementById('yvar').style.display='none';
	document.getElementById('zvar').style.display='none';
	document.getElementById('color').style.display='none';
	document.getElementById('colorname').style.display='none';
	document.getElementById('sizediv').style.display='none';
	document.getElementById('transdiv').style.display='none';
	document.getElementById('quadraticshow').style.display='none';
	document.getElementById('cubicshow').style.display='none';
	document.getElementById('expshow').style.display='none';
	document.getElementById('logshow').style.display='none';
	document.getElementById('powshow').style.display='none';
	document.getElementById('yxshow').style.display='none';
	document.getElementById('differentaxisshow').style.display='none';
	document.getElementById('highboxplotshow').style.display='none';
	document.getElementById('jittershow').style.display='none';
	document.getElementById('regtypeshow').style.display='none';
	document.getElementById('btypeshow').style.display='none';
	document.getElementById('addmultshow').style.display='none';
	document.getElementById('longtermtrendshow').style.display='none';
	document.getElementById('startfinishshow').style.display='none';
	document.getElementById('gridlinesshow').style.display='none';
	document.getElementById('seasonalshow').style.display='none';
	document.getElementById('boxnowhiskershow').style.display='none';
	document.getElementById('boxnooutliershow').style.display='none';
	document.getElementById('meandotshow').style.display='none';
	document.getElementById('invertshow').style.display='none';
	document.getElementById('thicklinesshow').style.display='none';
	document.getElementById('relativefrequencyshow').style.display='none';
	document.getElementById('relativewidthshow').style.display='none';
	document.getElementById('percent100show').style.display='none';
	document.getElementById('normalshow').style.display='none';
	document.getElementById('poissonshow').style.display='none';
	document.getElementById('binomialshow').style.display='none';
	document.getElementById('rectangularshow').style.display='none';
	document.getElementById('triangularshow').style.display='none';
	document.getElementById('residualsforcexshow').style.display='none';
	document.getElementById('weightedaverageshow').style.display='none';
	document.getElementById('stackdotsshow').style.display='none';
	document.getElementById('stripgraphshow').style.display='none';
	document.getElementById('donutshow').style.display='none';
	$('#removedpointsshow').hide();
	updategraph();
}

function exportTableToCSV($table, filename) {

	var $rows = $table.find('tr:has(td)'),

		// Temporary delimiter characters unlikely to be typed by keyboard
		// This is to avoid accidentally splitting the actual contents
		tmpColDelim = String.fromCharCode(11), // vertical tab character
		tmpRowDelim = String.fromCharCode(0), // null character

		// actual delimiter characters for CSV format
		colDelim = '","',
		rowDelim = '"\r\n"',

		// Grab text from table into CSV formatted string
		csv = '"' + $rows.map(function (i, row) {
			var $row = $(row),
				$cols = $row.find('td');

			return $cols.map(function (j, col) {
				var $col = $(col),
					text = $col.text();

				return text.replace('"', '""'); // escape double quotes

			}).get().join(tmpColDelim);

		}).get().join(tmpRowDelim)
			.split(tmpRowDelim).join(rowDelim)
			.split(tmpColDelim).join(colDelim) + '"',

		// Data URI
		csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);

	$(this)
		.attr({
		'download': filename,
			'href': csvData,
			'target': '_blank'
	});
}

function exportNZGrapher($table, filename) {
	
	setvals = {};
	$('#variable select, #controls select, #controls input[type=text], #controls input[type=range]').each(function(){
		setvals[$(this).attr('id')]=$(this).val();
	})
	
	checkboxes = {};
	$('#controls input[type=checkbox]').each(function(){
		checkboxes[$(this).attr('id')]=$(this).is(':checked');
	})
	
	toexport = {
		datatable:$('#data').html(),
		csv_data:csv_data,
		setval:setvals,
		checkboxes:checkboxes,
	};
	
	console.log(toexport);
		
	// Data URI
	exporturl = 'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(toexport));

	$(this)
		.attr({
		'download': filename,
			'href': exporturl,
			'target': '_blank'
	});
}

function updategraph(){
	if(animate){
		updategraphgo();
	} else {
		$('#loading').show();
		setTimeout(updategraphgo,80);
	}
	
}

$.expr[':'].textEquals = $.expr.createPseudo(function(arg) {
    return function( elem ) {
        return $(elem).text().match("^" + arg + "$");
    };
});

function updategraphgo(){
	$('#graphmap').html("");
	$('#var1label').html("variable 1:");
	$('#var2label').html("variable 2:");
	$('#var3label').html("variable 3:");
	$('.highlight').removeClass('highlight');
    $('#tooltip').css('display','none');
	if($('#type').val()=='newabout'){
		try {
			ga('send', 'event', 'Load', 'About', ipaddress);
		} catch(err) {
			console.log(err.message);
		}
	} else {
		try {
			ga('send', 'event', 'Graph Draw', $('#type').val(), ipaddress);
		} catch(err) {
			console.log(err.message);
		}
	}
	if(!$('#xvar').length){
		alert('NZGrapher is not loaded properly... please load again with a valid dataset.');
		window.location = './';
		return false;
	}
	scalefactor=1;
	if(document.getElementById('standardsize').value=='Standard'){
		document.getElementById('width').value=800;
		document.getElementById('height').value=600;
	} else if (document.getElementById('standardsize').value=='Short'){
		document.getElementById('width').value=800;
		document.getElementById('height').value=300;
	} else if (document.getElementById('standardsize').value=='Small'){
		document.getElementById('width').value=500;
		document.getElementById('height').value=400;
	} else if (document.getElementById('standardsize').value=='Auto - High Res') {
		document.getElementById('width').value=document.getElementById('graphdiv').offsetWidth*5;
		document.getElementById('height').value=document.getElementById('graphdiv').offsetHeight*5;
		scalefactor=5;
	} else {
    document.getElementById('width').value=document.getElementById('graphdiv').offsetWidth;
  	document.getElementById('height').value=document.getElementById('graphdiv').offsetHeight;
  }
  $('#scalefactor').val(scalefactor);
	w=$('#type').val();
	if(animate){
		$('#graph').hide();
		$('#jsgraph').hide();
		$('#myCanvas').show();
		$('#loading').hide();
		dataURL = window[w]();
	} else {
		$('#graph').hide();
		$('#jsgraph').show();
		$('#myCanvas').hide();
		dataURL = window[w]();
		jsgraphtoimage(dataURL);
	}
	desaturate();
	$('area').mousemove(function(e) {
		$('.highlight').removeClass('highlight');
		$('#tooltip').show();
		if(e.pageX>document.body.scrollWidth/2){
			$('#tooltip').css('left','auto');
			$('#tooltip').css('right',document.body.scrollWidth-e.pageX+15);
			$('#tooltiparrow').css('left','auto');
			$('#tooltiparrow').css('right','-8px');
			$('#tooltiparrow').css('border-left','8px solid #000');
			$('#tooltiparrow').css('border-right','none');
		} else {
			$('#tooltip').css('right','auto');
			$('#tooltip').css('left',e.pageX+15);
			$('#tooltiparrow').css('right','auto');
			$('#tooltiparrow').css('left','-8px');
			$('#tooltiparrow').css('border-right','8px solid #000');
			$('#tooltiparrow').css('border-left','none');
		}
		$('#tooltip').css('top',e.pageY);
		$('#tooltiparrow').css('margin-top','-8px');
		$('#tooltip span').html($(this).attr('desc'));
		if($('#type').val()!='newpairsplot' && $(this).is('[alt]')){
			id = $(this).attr('alt');
			$('#left').scrollTop(0);
			$('#left').scrollTop($('#data').find("th:textEquals('"+id+"')").position().top-100);
			$('#data').find("th:textEquals('"+id+"')").closest('tr').addClass('highlight');
		}
	}).mouseout(function(){
		$('.highlight').removeClass('highlight');
		$('#tooltip').hide();
	});

}

function desaturate(){
	if($('#grayscale').is(":checked")){
		$('body').css('-webkit-filter','grayscale(100%)');
		$('body').css('filter','grayscale(100%)');
	} else {
		$('body').css('-webkit-filter','none');
		$('body').css('filter','none');
	}
}

function jsgraphtoimage(dataURL) {
	var error = dataURL.substr(0, 5);
	if(error == 'Error') {
		$('#jsgraph').html('<br><br>'+dataURL);
		$('#loading').hide();
	} else if(error == "DISPL"){
		$('#jsgraph').html(dataURL.substr(5));
		$('#loading').hide();
  } else {
    highres='no';
    if (document.getElementById('standardsize').value=='Auto - High Res'){
      highres='yes';
    }
		$.ajax({
			type: "POST",
			url: "saveimagefromjs.php",
			data: {
				imgBase64: dataURL,
        highres: highres
			},
			success: function(data){
				$('#jsgraph').html(data);
			}
		}).done(function(o) {
			console.log('saved');
			$('#loading').hide();
		}).fail(function(o){
			console.log('nointernet');
			$('#jsgraph').html('<img src="'+dataURL+'" usemap="#graphmap">');
			$('#loading').hide();
		});
	}
}

var rtime = new Date(1, 1, 2000, 12,00,00);
var timeout = false;
var delta = 200;
$(window).resize(function() {
    rtime = new Date();
    if (timeout === false) {
        timeout = true;
        setTimeout(resizeend, delta);
    }
});

function resizeend() {
    if (new Date() - rtime < delta) {
        setTimeout(resizeend, delta);
    } else {
        timeout = false;
        updategraph();
    }
}

function unique(array){
    return array.filter(function(el,index,arr){
        return index == arr.indexOf(el);
    });
}

function countval(array, value) {
  var counter = 0;
  for(var i=0;i<array.length;i++) {
    if (array[i] === value) counter++;
  }
  return counter;
}

function updatebox(){
	if(!$('#xvar').length){
		alert('NZGrapher is not loaded properly... please load again with a valid dataset.');
		window.location = './';
		return false;
	}
	var col=2;
	var options=[];
	dataforselector={' ':[]};
	options.push('<option value=" "> </option>');
	$('#data tr:first td').each( function(){
		var items=[];
		//Iterate all td's in second column
		$('#data tr td:nth-child('+col+')').each( function(){
		   //add item to array
		   items.push( $(this).text() );
		});
		var value="";
		var a=0;
		var optionname;
		var forselector = [];
		//iterate unique array and build array of select options
		$.each( items, function(i, item){
			if(a==0){
				optionname=item.trim();
			} else {
				forselector.push(item.trim());
			}
			a=a+1;
		})
		dataforselector[optionname]=forselector;
		options.push('<option>' + optionname + '</option>');
		col++;
	});
	//finally empty the select and append the items from the array
	var xselindex = document.getElementById("xvar").selectedIndex;
	var yselindex = document.getElementById("yvar").selectedIndex;
	var zselindex = document.getElementById("zvar").selectedIndex;
	var colselindex = document.getElementById("color").selectedIndex;
	if(xselindex==-1){xselindex=0;}
	if(yselindex==-1){yselindex=0;}
	if(zselindex==-1){zselindex=0;}
	if(colselindex==-1){colselindex=0;}
	
	optionsforboxes = options.join();
	
	$('#xvar').empty().append( optionsforboxes );
	$('#yvar').empty().append( optionsforboxes );
	$('#zvar').empty().append( optionsforboxes );
	$('#color').empty().append( optionsforboxes );

	if(xselindex < document.getElementById("xvar").length && xselindex > -1){document.getElementById("xvar").selectedIndex = xselindex;} else {$("#xvar")[0].selectedIndex = 0;$('#type').val('newabout');console.log('resetx');}
	if(yselindex < document.getElementById("yvar").length && yselindex > -1){document.getElementById("yvar").selectedIndex = yselindex;} else {$("#yvar")[0].selectedIndex = 0;$('#type').val('newabout');console.log('resety');}
	if(zselindex < document.getElementById("zvar").length && zselindex > -1){document.getElementById("zvar").selectedIndex = zselindex;} else {$("#zvar")[0].selectedIndex = 0;$('#type').val('newabout');console.log('resetz');}
	if(colselindex < document.getElementById("color").length && colselindex > -1){document.getElementById("color").selectedIndex = colselindex;} else {$("#color")[0].selectedIndex = 0;$('#type').val('newabout');console.log('resetcol');}
	
	graphchange(document.getElementById('type'));
}

function updatereset(){
	var $rows = $('#data').find('tr:has(td)'),

		// Temporary delimiter characters unlikely to be typed by keyboard
		// This is to avoid accidentally splitting the actual contents
		tmpColDelim = String.fromCharCode(11), // vertical tab character
		tmpRowDelim = String.fromCharCode(0), // null character

		// actual delimiter characters for CSV format
		colDelim = '","',
		rowDelim = '"\r\n"',

		// Grab text from table into CSV formatted string
		csv = '"' + $rows.map(function (i, row) {
			var $row = $(row),
				$cols = $row.find('td');

			return $cols.map(function (j, col) {
				var $col = $(col),
					text = $col.text();

				return text.replace('"', '""'); // escape double quotes

			}).get().join(tmpColDelim);

		}).get().join(tmpRowDelim)
			.split(tmpRowDelim).join(rowDelim)
			.split(tmpColDelim).join(colDelim) + '"';

	// Data URI
	csv_data = csv;
}

function showhideleft(){
	try {
		ga('send', 'event', 'Function', 'showhideleft', ipaddress);
	} catch(err) {
		console.log(err.message);
	}
	var button=document.getElementById('showhideleft');
	var li=document.getElementById('showhideleftli');
	var buttons=document.getElementById('buttons');
	var left=document.getElementById('left');
	var graph=document.getElementById('graphdiv');
	if(button.innerHTML.charCodeAt(0)==9664){
		button.style.left='0';
		buttons.style.left='-100%';
		left.style.left='-100%';
		left.style.right='150%';
		graph.style.left='0';
		button.innerHTML="&#9654;"
		li.innerHTML="Show Left Section";
	} else {
		button.style.left='40%';
		buttons.style.left='0';
		left.style.left='0';
		left.style.right='60%';
		graph.style.left='40%';
		button.innerHTML="&#9664;"
		li.innerHTML="Hide Left Section";
	}
	updategraph();
}

function showhidebottom(){
	try {
		ga('send', 'event', 'Function', 'showhidebottom', ipaddress);
	} catch(err) {
		console.log(err.message);
	}
	var button=document.getElementById('showhidebottom');
	var li=document.getElementById('showhidebottomli');
	var variable=document.getElementById('variable');
	var controls=document.getElementById('controls');
	var graph=document.getElementById('graphdiv');
	var left=document.getElementById('left');
	if(button.innerHTML.charCodeAt(0)==9660){
		button.style.bottom='31px';
		variable.style.bottom='-100%';
		controls.style.bottom='-100%';
		graph.style.bottom='30px';
		left.style.bottom='30px';
		button.innerHTML="&#9650;"
		li.innerHTML="Show Bottom Section";
	} else {
		button.style.bottom='131px';
		variable.style.bottom='30px';
		controls.style.bottom='30px';
		graph.style.bottom='170px';
		left.style.bottom='170px';
		button.innerHTML="&#9660;"
		li.innerHTML="Hide Bottom Section";
	}
	updategraph();
}

function escapeHtml(text) {
  var map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };

  return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

function sortTable(x){
  var rows = $('#data tbody  tr:not(:first)').get();
  var firstrow = $('#data tbody  tr:first').get();

  rows.sort(function(a, b) {

  var A = $(a).children('td').eq(x).text().toUpperCase();
  if($.isNumeric(A)){A = parseFloat(A);}
  var B = $(b).children('td').eq(x).text().toUpperCase();
  if($.isNumeric(B)){B = parseFloat(B);}

  if(A < B) {
    return -1;
  }

  if(A > B) {
    return 1;
  }

  return 0;

  });
  $('#data tbody').empty();
  $('#data').children('tbody').append(firstrow);
  $.each(rows, function(index, row) {
    $('#data').children('tbody').append(row);
  });
	i=0;
	$('#data tr th:first-child').each(function() {
		if(i!=0){$(this).html(i);}
		i++;
	});
	updatebox();
}


function split(points,values,max,variable){
	differentgroups={}
	for(index in points){
		index = points[index];
		group = values[index];
		if(differentgroups[group] === undefined){
			differentgroups[group]=[];
		}
		differentgroups[group].push(index);
	}
	var groups = Object.keys(differentgroups);
	if(groups.length>max && !$.isNumeric(groups[0])){
		return 'Error: You must select a categorical variable for variable '+ variable + ' with ' + max + ' or fewer groups, or a numerical variable (you have '+groups.length+' groups)';
	}
	if(groups.length>max && max<4){
		return 'Error: You must select a categorical or numerical variable for variable '+ variable + ' with ' + max + ' or fewer groups (you have '+groups.length+' groups)';
	}
	if(groups.length>max && $.isNumeric(groups[0])){
		var pointsforminmax=[];
		for (var index in points){
			index = points[index];
			if($.isNumeric(values[index])){
				pointsforminmax.push(values[index]);
			}
		}
		split0=Math.min.apply(null, pointsforminmax);
		split4=Math.max.apply(null, pointsforminmax);
		c1max=parseFloat(Number(split0+(split4-split0)/4).toPrecision(2));
		c2max=parseFloat(Number(split0+(split4-split0)/4*2).toPrecision(2));
		c3max=parseFloat(Number(split0+(split4-split0)/4*3).toPrecision(2));
		differentgroups={}
		for (index in points){
			index = points[index];
			group = values[index];
			if(!$.isNumeric(group)){
				group = "invalid";
			} else if (group<c1max){
				group="a: < "+c1max;
			} else if (group<c2max){
				group="b: "+c1max+" - "+c2max;
			} else if (group<c3max){
				group="c: "+c2max+" - "+c3max;
			} else {
				group="d: > "+c3max;
			}
			if(differentgroups[group] === undefined){
				differentgroups[group]=[];
			}
			differentgroups[group].push(index);
		}
		var groups = Object.keys(differentgroups);
	}
	groups.sort(sortorder).reverse();
	
	toreturn = {};
	for (index in groups){
		group = groups[index];
		toreturn[group]=differentgroups[group];
	}
	return toreturn;
}

function convertvaltopixel(point,min,max,minpix,maxpix){
	return (point-min)/(max-min)*(maxpix-minpix)+minpix;
}

function ColorHSLaToRGBa(h,s,l,a){
	var r,g,b;
	r = l;
	g = l;
	b = l;
	if(l <= 0.5) {
		v = l * (1.0 + s);
	} else {
		v = add(l,s) - l * s;
	}
	if (v > 0){
		  var m, sv, sextant, fract, vsf, mid1, mid2;
		  m = 2*l-v;
		  sv = (v - m ) / v;
		  h *= 6.0;
		  sextant = Math.floor(h);
		  fract = h - sextant;
		  vsf = v * sv * fract;
		  mid1 = m + vsf;
		  mid2 = v - vsf;
		  switch (sextant)
		  {
				case 0:
					  r = v;
					  g = mid1;
					  b = m;
					  break;
				case 1:
					  r = mid2;
					  g = v;
					  b = m;
					  break;
				case 2:
					  r = m;
					  g = v;
					  b = mid1;
					  break;
				case 3:
					  r = m;
					  g = mid2;
					  b = v;
					  break;
				case 4:
					  r = mid1;
					  g = m;
					  b = v;
					  break;
				case 5:
					  r = v;
					  g = m;
					  b = mid2;
					  break;
		  }
	}
	return 'rgba('+(r*255).toFixed(0)+','+(g*255).toFixed(0)+','+(b*255).toFixed(0)+','+a.toFixed(3)+')';
}

function add(a,b){
	return parseFloat(a)+parseFloat(b);
}

function line(ctx,x1,y1,x2,y2){
	ctx.beginPath();
	ctx.moveTo(x1,y1);
	ctx.lineTo(x2,y2);
	ctx.stroke();
}

function horaxis(ctx,x1,x2,y,min,max,step,gridlinetop){
  ctx.strokeStyle = '#000000';
  if (typeof gridlinetop === 'undefined') { gridlinetop = 50; }
	ctx.fillStyle = '#000000';
	ctx.lineWidth = 1*scalefactor;
	line(ctx,add(x1,-10*scalefactor),y,add(x2,10*scalefactor),y);
  fontsize = 13*scalefactor;
	ctx.font = fontsize+"px Roboto";
	ctx.textAlign="center";
	var curx = parseFloat(min.toPrecision(8));
  gridlines = false;
  if($('#gridlines').is(':checked')){
    gridlines=true;
  }
	while (curx<=max){
		var xpixel = convertvaltopixel(curx,min,max,x1,x2);
		line(ctx,xpixel,y,xpixel,add(y,6*scalefactor));
		ctx.fillText(curx,xpixel,add(y,18*scalefactor));
    if(gridlines){
      ctx.strokeStyle="#ddd";
      line(ctx,xpixel,gridlinetop,xpixel,y);
      ctx.strokeStyle="#000";
    }
		curx=parseFloat(add(curx,step).toPrecision(8));
	}
}

function vertaxis(ctx,y1,y2,x,min,max,step,gridlinetop,append){
  min = parseFloat(parseFloat(min.toFixed(10)).toPrecision(8));
  max = parseFloat(parseFloat(max.toFixed(10)).toPrecision(8));
  ctx.strokeStyle = '#000000';
  if (typeof gridlinetop === 'undefined') { gridlinetop = $('#graphdiv').width()-50; }
  if (typeof append === 'undefined') { append = ''; }
	ctx.fillStyle = '#000000';
	ctx.lineWidth = 1*scalefactor;
	line(ctx,x,add(y1,-10*scalefactor),x,add(y2,10*scalefactor));
  fontsize = 13*scalefactor;
	ctx.font = fontsize+"px Roboto";
	ctx.textAlign="right";
  gridlines = false;
  if($('#gridlines').is(':checked')){
    gridlines=true;
  }
	var cury = min;
	while (cury<=max){
		var ypixel = convertvaltopixel(cury,min,max,y2,y1);
		line(ctx,x,ypixel,add(x,-6*scalefactor),ypixel);
		if(gridlines){
			ctx.strokeStyle="#ddd";
			line(ctx,gridlinetop,ypixel,x,ypixel);
			ctx.strokeStyle="#000";
		}
		fsize=13*scalefactor;
		ctx.font = fsize+"px Roboto";
		width = ctx.measureText(cury).width;
		while(width>30*scalefactor){
			fsize=fsize-1;
			ctx.font = fsize+"px Roboto";
			width = ctx.measureText(cury).width;
		}
		ctx.fillText(cury+append,add(x,-7*scalefactor),add(ypixel,4*scalefactor));
		cury=parseFloat(parseFloat(add(cury,step).toFixed(10)).toPrecision(8));
	}

}

function rvertaxis(ctx,y1,y2,x,min,max,step,gridlinetop){
  if (typeof gridlinetop === 'undefined') { gridlinetop = 50; }
	ctx.fillStyle = '#000000';
	ctx.lineWidth = 1*scalefactor;
	line(ctx,x,add(y1,-10*scalefactor),x,add(y2,10*scalefactor));
  fontsize = 13*scalefactor;
	ctx.font = fontsize+"px Roboto";
	ctx.textAlign="left";
  if($('#gridlines').is(':checked')){
    gridlines=true;
  }
	var cury = parseFloat(min.toPrecision(8));
	while (cury<=max){
		var ypixel = convertvaltopixel(cury,min,max,y2,y1);
		line(ctx,x,ypixel,add(x,6*scalefactor),ypixel);
		if(gridlines){
			ctx.strokeStyle="#ddd";
			console.log(1);
			line(ctx,gridlinetop,ypixel,x,ypixel);
			ctx.strokeStyle="#000";
		}
		fsize=13*scalefactor;
		ctx.font = fsize+"px Roboto";
		width = ctx.measureText(cury).width;
		while(width>30*scalefactor){
			fsize=fsize-1;
			ctx.font = fsize+"px Roboto";
			width = ctx.measureText(cury).width;
		}
		ctx.fillText(cury,add(x,7*scalefactor),add(ypixel,4*scalefactor));
		cury=parseFloat(add(cury,step).toPrecision(10));
	}

}

function FirstSF(number) {
    var multiplier = 1;
	if (number==0){
		return 0;
	} else {
		while (number < 0.1) {
			number *= 10;
			multiplier /= 10;
		}
		while (number >= 1) {
			number /= 10;
			multiplier *= 10;
		}
		number = number * 10;
		return number.toFixed(0);
	}
}

function axisminmaxstep(min,max){
	if(min==max){
		min=add(min,1);
		max=add(max,1);
	}
	var range=max-min;
	var rangeround=range.toPrecision(1);
	var steps=FirstSF(rangeround);
	if(steps<2) {
		steps=steps*10;
	}
	if(steps<3) {
		steps=steps*5;
	}
	if(steps<5) {
		steps=steps*2;
	}
	var step=parseFloat((rangeround/steps).toPrecision(15));
	if(step==0){step=1;}
	var mintick=(min/step).toFixed(0)*step;
	if(mintick>min){
		mintick=mintick-step;
	}
	var maxtick=(max/step).toFixed(0)*step;
	if(maxtick<max){
		maxtick=maxtick+step;
	}
	if(maxtick==mintick){
		maxtick++;
		mintick--;
	}
	return [mintick, maxtick, step];
}

function makecolors(alpha,ctx){
	ctx.lineWidth = 2*scalefactor;
	if($('#thicklines').is(":checked")){
		ctx.lineWidth = 5*scalefactor;
	}
	var colors = [];
	if($('#color option:selected').text()!="" && $('#color option:selected').text()!=" "){
		var colorpoints = dataforselector[$('#color option:selected').text()].slice();
	} else {
		var colorpoints = [];
	}
	if(colorpoints.length<1){
		var xpoints = (dataforselector[$('#xvar option:selected').text()]).slice();
		for (var index in xpoints){
			color = 'rgba(80,80,80,'+alpha+')';
			colors.push(color);
		}
	} else if($.isNumeric(colorpoints[0])){
		var colpointsforminmax=[];
		for (var index in colorpoints){
			if ($.isNumeric(colorpoints[index])){
				colpointsforminmax.push(colorpoints[index]);
			}
		}
		var min = Math.min.apply(null, colpointsforminmax);
		var max = Math.max.apply(null, colpointsforminmax);
		var end=0.8;
		var s=0.75;
		var l=0.6;
		for (var index in colorpoints){
			if($.isNumeric(colorpoints[index])){
				var n = (colorpoints[index]-min)/(max-min);
				colors[index]=ColorHSLaToRGBa(n*end,s,l,alpha);
			} else {
				colors[index]='rgba(80,80,80,'+alpha+')';
			}
		}
		var left=40*scalefactor;
		var rad = $('#size').val()/2*scalefactor;
		ctx.fillStyle = 'rgba(0,0,0,1)';
		ctx.font = 12*scalefactor+"px Roboto";
		ctx.textAlign="left";
		var txt = 'Coloured by '+$('#colorlabel').val()+': '+min;
		ctx.fillText(txt,left,48*scalefactor);
		left = left + ctx.measureText(txt).width + 5*scalefactor + rad;
		var colz=0;
		while(colz<=1){
			ctx.beginPath();
			ctx.strokeStyle = ColorHSLaToRGBa(colz*end,s,l,alpha);
			ctx.arc(left,48*scalefactor-rad,rad,0,2*Math.PI);
			ctx.stroke();
			left = left + rad*2 + 2;
			colz=colz+0.1;
		}
		ctx.fillText(max,left,48*scalefactor);
	} else {
		var colorindexs = []; // An new empty array
		for (var i in colorpoints) {
			colorindexs[i] = colorpoints[i];
		}
		colorindexs.sort(sortorder);
		$.unique(colorindexs);
		var thecolors=[];
		var colorcount = colorindexs.length;
		var end=colorcount/add(colorcount,1)*0.8;
		var s=0.75;
		var l=0.6;
		for (var index in colorindexs){
			var n = index/(colorcount-1);
			thecolors[index]=ColorHSLaToRGBa(n*end,s,l,alpha);
		}
		for (var index in colorpoints){
			var point = colorindexs.indexOf(colorpoints[index]);
			colors[index]=thecolors[point];
		}
		var left=40*scalefactor;
		var rad = $('#size').val()/2*scalefactor;
		ctx.fillStyle = 'rgba(0,0,0,1)';
		ctx.font = 12*scalefactor+"px Roboto";
		ctx.textAlign="left";
		var txt = 'Coloured by '+$('#colorlabel').val()+': ';
		ctx.fillText(txt,left,48*scalefactor);
		left = left + ctx.measureText(txt).width + 5*scalefactor + rad;
		for (var index in colorindexs){
			var name = colorindexs[index];
			ctx.beginPath();
			ctx.strokeStyle = thecolors[index];
			ctx.arc(left,48*scalefactor-rad,rad,0,2*Math.PI);
			ctx.stroke();
			ctx.fillText(name,left+rad+2*scalefactor,48*scalefactor);
			left = left + ctx.measureText(name).width + 10*scalefactor + rad*2;
		}
	}
	return colors;
}

function makeblankcolors(num,alpha){
	var colors = [];
	i=0;
	color = 'rgba(80,80,80,'+alpha+')';
	while(i<num){
		colors.push(color);
		i++;
	}
	return colors;
}

function makebscolors(num,alpha,points){
	var colors = [];
	thesepoints = points.slice();
	thesepoints.sort(function(a, b){return a-b});
	
	i=0;
	while(i<num){
		v = points[i];
		if(v<thesepoints[25] || v>thesepoints[974]){
			color = 'rgba(80,80,80,'+alpha*0.4+')';
		} else {
			color = 'rgba(80,80,80,'+alpha+')';
		}
		colors.push(color);
		i++;
	}
	return colors;
}

function lowerquartile(values){
 count = values.length;
 values.sort(function(a, b){return a-b});
 n = (Math.floor(count/2))/2-0.5;
 if(n<0) {quart = median(values);}
 else if (Math.ceil(n) == n) {quart = values[n];}
 else {quart = add(values[n-0.5],values[n+0.5])/2;}
 return parseFloat(Number(quart).toPrecision(10));
}
function upperquartile(values){
 count = values.length;
 values.sort(function(a, b){return b-a});
 n = (Math.floor(count/2))/2-0.5;
 if(n<0) {quart = median(values);}
 else if (Math.ceil(n) == n) {quart = values[n];}
 else {quart = add(values[n-0.5],values[n+0.5])/2;}
 return parseFloat(Number(quart).toPrecision(10));
}

function median(values){
 count = values.length;
 values.sort(function(a, b){return a-b});
 n = count/2-0.5;
 if(Math.ceil(n)==n){
	 themedian = values[n];
 } else {
	 themedian = add(values[n-0.5],values[n+0.5])/2;
 }
 return parseFloat(Number(themedian).toPrecision(10));
}

function calculatemean(values){
 count = values.length;
 sum=0;
 for (var index in values){
	 sum = add(sum,values[index]);
 }
 return parseFloat((sum/count).toPrecision(5));
}

function standarddeviation(values){
  var avg = averageforsd(values,0);

  var squareDiffs = values.map(function(value){
    var diff = value - avg;
    var sqrDiff = diff * diff;
    return sqrDiff;
  });

  var avgSquareDiff = averageforsd(squareDiffs,1);

  var stdDev = Math.sqrt(avgSquareDiff);
  return parseFloat(stdDev).toPrecision(5);
}

function averageforsd(values,d){
 count = values.length;
 sum=0;
 for (var index in values){
	 sum = add(sum,values[index]);
 }
 return parseFloat(sum/(count-d));
}

function maxnooutliers(values,lq,uq){
	values.sort(function(a, b){return b-a});
	newmax = values[0];
	i=0;
	while(i<values.length && newmax>uq+1.5*(uq-lq)){
		newmax=values[i];
		i++;
	}
	return newmax;
}

function minnooutliers(values,lq,uq){
	values.sort(function(a, b){return a-b});
	newmin = values[0];
	i=0;
	while(i<values.length && newmin<lq-1.5*(uq-lq)){
		newmin=values[i];
		i++;
	}
	return newmin;
}

function newabout(){
	$('#var1label').html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
	$('#var2label').html("");
	$('#var3label').html("");
	$.get('./about.php').done(function(data){
		var width = $('#width').val()-22;
		var height = $('#height').val()-22;
		$('#jsgraph').html("<div style='width:"+width+"px;height:"+height+"px;overflow-y:scroll;padding:10px;text-align:left;'>"+data+"</div>");
	});
	return "DISPLLoading...";
}

function newdotplot(){
	$('#regshow').show();
	$('#invertshow').show();
	$('#stackdotsshow').show();
	$('#labelshow').show();
	$('#sum').show();
	$('#highboxplotshow').show();
	$('#boxnowhiskershow').show();
	$('#boxnooutliershow').show();
	$('#boxplotshow').show();
	$('#thicklinesshow').show();
	$('#intervalshow').show();
	$('#sizediv').show();
	$('#meandotshow').show();
	$('#pointsizename').html('Point Size:');
	$('#transdiv').show();
	$('#xvar').show();
	$('#yvar').show();
	$('#zvar').show();
	$('#color').show();
	$('#colorname').show();
	$('#greyscaleshow').show();
	$('#gridlinesshow').show();
		$('#removedpointsshow').show();
		$('#stripgraphshow').show();
	$('#var1label').html("Numerical 1:<br><small>required</small>");
	$('#var2label').html("Category 1:<br><small>optional</small>");
	$('#var3label').html("Category 2:<br><small>optional</small>");

	var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');

	//set size
	var width = $('#width').val();
	var height = $('#height').val();

	ctx.canvas.width = width;
	ctx.canvas.height = height;

	ctx.fillStyle = "#ffffff";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	//get points
	var xpoints = (dataforselector[$('#xvar option:selected').text()]).slice();
	var ypoints = (dataforselector[$('#yvar option:selected').text()]).slice();
	var zpoints = (dataforselector[$('#zvar option:selected').text()]).slice();

	//check for numeric value
	var points=[];
	var allpoints=[];
	var pointsremoved=[];
	var pointsforminmax=[];
	for (var index in xpoints){
		if($.isNumeric(xpoints[index])){
			points.push(index);
			allpoints.push(index);
			pointsforminmax.push(xpoints[index]);
		} else {
			pointsremoved.push(add(index,1));
		}
	}

	if(points.length==0){
		return 'Error: You must select a numeric variable for "Numerical 1"';
	}

	if(pointsremoved.length!=0 && $('#removedpoints').is(":checked")){
		ctx.fillStyle = '#000000';
		fontsize = 13*scalefactor;
		ctx.font = fontsize+"px Roboto";
		ctx.textAlign="right";
		ctx.fillText("ID(s) of Points Removed: "+pointsremoved.join(", "),width-48*scalefactor,48*scalefactor);
	}

	var oypixel=height-60*scalefactor;
	var maxheight=height-120*scalefactor;
	var left=90*scalefactor;
	var right=width-60*scalefactor;

	xmin = Math.min.apply(null, pointsforminmax);
	xmax = Math.max.apply(null, pointsforminmax);
	if($.isNumeric($('#boxplotmin').val())){
		xmin=$('#boxplotmin').val();
	}
	if($.isNumeric($('#boxplotmax').val())){
		xmax=$('#boxplotmax').val();
	}
	var minmaxstep = axisminmaxstep(xmin,xmax);
	var minxtick=minmaxstep[0];
	var maxxtick=minmaxstep[1];
	var xstep=minmaxstep[2];

	var alpha = 1-$('#trans').val()/100;
	var colors = makecolors(alpha,ctx);

	if(ypoints.length>0){
		allydifferentgroups = split(allpoints,ypoints,10,'"Category 1"');
		if(typeof allydifferentgroups === 'object'){
			allygroups = Object.keys(allydifferentgroups);
			allygroups.sort(sortorder).reverse();
			for (index in allydifferentgroups){
				group = index;
				depoints=allydifferentgroups[index];
				for (index in depoints){
					point=depoints[index];
					ypoints[point]=group;
				}

			}
		} else {
			return allydifferentgroups;
		}
	} else {
		allygroups=''
	}

	if(zpoints.length>0){
		zdifferentgroups = split(points,zpoints,4,'"Category 2"');
		if(typeof zdifferentgroups === 'object'){
			zgroups = Object.keys(zdifferentgroups);
			zgroups.sort(sortorder);
			thisleft=60*scalefactor;
			eachwidth=(width-40*scalefactor)/zgroups.length;
			for (index in zgroups){
				group = zgroups[index];
				points = zdifferentgroups[group];

				thisright = add(thisleft,eachwidth);

				ctx.fillStyle = '#000000';
				fontsize = 15*scalefactor;
				ctx.font = "bold "+fontsize+"px Roboto";
				ctx.textAlign="center";
				ctx.fillText(group,add(thisleft,thisright-50*scalefactor)/2,oypixel-maxheight);

				var error = plotysplit(ctx,add(thisleft,30*scalefactor),thisright-50*scalefactor,oypixel,minxtick,maxxtick,xstep,maxheight,points,xpoints,ypoints,colors,allygroups);
				if(error != 'good'){return error;}


				thisleft = add(thisleft,eachwidth);
			}
		} else {
			return zdifferentgroups;
		}
	} else {
		var error = plotysplit(ctx,left,right,oypixel,minxtick,maxxtick,xstep,maxheight,points,xpoints,ypoints,colors,allygroups);
		if(error != 'good'){return error;}
	}

	//graph title
	ctx.fillStyle = '#000000';
	fontsize = 20*scalefactor;
	ctx.font = "bold "+fontsize+"px Roboto";
	ctx.textAlign="center";
	ctx.fillText($('#title').val(),width/2,30*scalefactor);

	//x-axis title
	ctx.fillStyle = '#000000';
	fontsize = 15*scalefactor;
	ctx.font = "bold "+fontsize+"px Roboto";
	ctx.textAlign="center";
	ctx.fillText($('#xaxis').val(),width/2,height-10*scalefactor);

	//y-axis title
	if($('#yaxis').val() != "Y Axis Title"){
		var x, y;
		x=20*scalefactor;
		y=height/2;
		ctx.save();
		ctx.fillStyle = '#000000';
		fontsize = 15*scalefactor;
		ctx.font = "bold "+fontsize+"px Roboto";
		ctx.translate(x, y);
		ctx.rotate(-Math.PI/2);
		ctx.textAlign = "center";
		ctx.fillText($('#yaxis').val(), 0, 0);
		ctx.restore();
	}


	labelgraph(ctx,width,height);
  if($('#invert').is(":checked")){
    invert(ctx)
  }

	var dataURL = canvas.toDataURL();
	return dataURL;
}

function invert(ctx){
  var imageData = ctx.getImageData(0, 0, $('#width').val(), $('#height').val());
  var data = imageData.data;

  for(var i = 0; i < data.length; i += 4) {
    // red
    data[i] = 255 - data[i];
    // green
    data[i + 1] = 255 - data[i + 1];
    // blue
    data[i + 2] = 255 - data[i + 2];
  }

  // overwrite original image
  ctx.putImageData(imageData, 0, 0);
}

function labelgraph(ctx,width,height){
	//label the graph as from mathsnz
	ctx.fillStyle = '#000000';
  fontsize = 13*scalefactor;
	ctx.font = fontsize+"px Roboto";
	ctx.textAlign="left";
	ctx.fillText("Made with NZGrapher",10*scalefactor,height-10*scalefactor);
	ctx.textAlign="right";
	ctx.fillText("www.grapher.nz",width-10*scalefactor,height-10*scalefactor);
}

function plotysplit(ctx,left,right,oypixel,minxtick,maxxtick,xstep,maxheight,points,xpoints,ypoints,colors,allygroups){
	ctx.strokeStyle = '#000000';
	horaxis(ctx,left,right,add(oypixel,10*scalefactor),minxtick,maxxtick,xstep);
	if(ypoints.length>0){
		ydifferentgroups = split(points,ypoints,10,'"Category 1"');
		if(typeof ydifferentgroups === 'object'){
			ygroups = Object.keys(ydifferentgroups);
			ygroups.sort(sortorder).reverse();
			thismaxheight = maxheight/allygroups.length;
			for (index in allygroups){
				group = allygroups[index];
				points = ydifferentgroups[group];
				if(points){
					plotdotplot(ctx,points,xpoints,minxtick,maxxtick,oypixel,left,right,thismaxheight,colors,2,1);
				}
				ctx.fillStyle = '#000000';
				fontsize = 15*scalefactor;
				ctx.font = "bold "+fontsize+"px Roboto";
				ctx.textAlign="right";
				ctx.fillText(group,right+10*scalefactor,oypixel-thismaxheight/2);
				oypixel = oypixel-thismaxheight;
			}
		} else {
			return ydifferentgroups;
		}
	} else {
		plotdotplot(ctx,points,xpoints,minxtick,maxxtick,oypixel,left,right,maxheight,colors,2,1);
	}
	return 'good';
}

function plotdotplot(ctx,indexes,values,minxtick,maxxtick,oypixel,left,right,maxheight,colors,sort,hovers){

	ctx.lineWidth = 2*scalefactor;
	if($('#thicklines').is(":checked")){
		ctx.lineWidth = 5*scalefactor;
	}
	stripgraph = 0;
	if($('#stripgraph').is(":checked")){
		stripgraph = 1;
	}
	var rad = $('#size').val()/2*scalefactor;
	var thisvalues = [];
	var xpixels = [];
	for (var index in indexes){
		var index = indexes[index];
		var value = values[index];
		thisvalues.push(value);
		var rawxpixel = convertvaltopixel(value,minxtick,maxxtick,left,right);
		xpixel = Math.floor(rawxpixel/(rad*3))*rad*3;
		if($('#stackdots').is(':checked')){
			xpixel = Math.floor(rawxpixel/(rad*2))*rad*2;
		} else {
			xpixel = Math.floor(rawxpixel/(rad*3))*rad*3;
		}
		xpixels.push([index,xpixel,rawxpixel,value]);
	}	
	var minval = parseFloat(Math.min.apply(null, thisvalues).toPrecision(10));
	var lq = lowerquartile(thisvalues);
	var med = median(thisvalues);
	var mean = calculatemean(thisvalues);
	var uq = upperquartile(thisvalues);
	var maxval = parseFloat(Math.max.apply(null, thisvalues).toPrecision(10));
	var minnooutliersval = minnooutliers(thisvalues,lq,uq);
	var maxnooutliersval = maxnooutliers(thisvalues,lq,uq);
	var sd = standarddeviation(thisvalues);
	var num = thisvalues.length;

	var counts = {};
	$.each(xpixels, function( key, value ) {
		key = value[0];
		xpixel = value [1];
		if(counts[xpixel]){
			counts[xpixel]=add(counts[xpixel],1);
		} else {
			counts[xpixel]=1;
		}
	});
	var maxpoints = 0;
	$.each( counts, function( i, v ){
	  if(v>maxpoints){
		  maxpoints=v;
	  }
	});
	var ypixel=oypixel;
	var lastxpixel=0;
	var yheight = rad*2;
	if ((maxheight-10*scalefactor)/maxpoints<yheight){yheight=(maxheight-10*scalefactor)/maxpoints;}
	xpixels.sort(function(a, b) {return a[sort] - b[sort]})
	if($('#labels').is(":checked")){var labels="yes";} else {var labels = "no";}
	highestkey = -1;
	$.each(xpixels, function( key, value ) {
		key = value[0];
		xpixel = value [1];
		rawxpixel = value [2];
		val = value[3];
		if($('#stackdots').is(':checked')){
			rawxpixel = xpixel;
		}
		ctx.beginPath();
		if(lastxpixel==xpixel){
			ypixel = ypixel - yheight;
		} else {
			ypixel = oypixel-10*scalefactor;
		}
		if(stripgraph==1){
			ypixel = randint(oypixel-10*scalefactor,oypixel-maxheight+10*scalefactor+maxheight*0.5)
		}
		lastxpixel = xpixel;
		if(Number.parseInt(key)>highestkey){
			lastypixel = ypixel;
			highestkey = Number.parseInt(key);
		}
		ctx.strokeStyle = colors[key];
		ctx.arc(rawxpixel,ypixel,rad,0,2*Math.PI);
		ctx.stroke();
		if(hovers==1 || hovers=='Difference'){
			xaxislabel = $('#xaxis').val();
			if(hovers=='Difference'){xaxislabel = "Difference";}
			$('#graphmap').append('<area shape="circle" coords="'+(rawxpixel/scalefactor)+','+(ypixel/scalefactor)+','+(rad/scalefactor)+'" alt="'+parseInt(add(key,1))+'" desc="Point ID: '+parseInt(add(key,1))+'<br>'+xaxislabel+': '+val+'">');
		}
		//text
		if(labels == "yes"){
			ctx.fillStyle = 'rgba(0,0,255,1)';
			fontsize = 10*scalefactor;
			ctx.font = fontsize+"px Roboto";
			ctx.textAlign="left";
			ctx.fillText(parseInt(add(key,1)),add(add(rawxpixel,rad),2*scalefactor),add(ypixel,4*scalefactor));
		}
	});
	var mingraph = convertvaltopixel(minval,minxtick,maxxtick,left,right);
	var lqgraph = convertvaltopixel(lq,minxtick,maxxtick,left,right);
	var medgraph = convertvaltopixel(med,minxtick,maxxtick,left,right);
	var uqgraph = convertvaltopixel(uq,minxtick,maxxtick,left,right);
	var maxgraph = convertvaltopixel(maxval,minxtick,maxxtick,left,right);
	var minnooutliersgraph = convertvaltopixel(minnooutliersval,minxtick,maxxtick,left,right);
	var maxnooutliersgraph = convertvaltopixel(maxnooutliersval,minxtick,maxxtick,left,right);
	var y = oypixel - maxheight*0.1;
	if($('#boxplot').is(":checked")){
		var y = oypixel - maxheight*0.1;
		var h = maxheight*0.1;
		ctx.strokeStyle = 'rgb(0,0,0)';
		ctx.lineWidth = 1*scalefactor;
		line(ctx,mingraph,add(y,-5*scalefactor),mingraph,add(y,5*scalefactor));
		line(ctx,lqgraph,add(y,-h),lqgraph,add(y,h));
		line(ctx,medgraph,add(y,-h),medgraph,add(y,h));
		line(ctx,uqgraph,add(y,-h),uqgraph,add(y,h));
		line(ctx,maxgraph,add(y,-5*scalefactor),maxgraph,add(y,5*scalefactor));
		line(ctx,mingraph,y,lqgraph,y);
		line(ctx,lqgraph,add(y,h),uqgraph,add(y,h));
		line(ctx,lqgraph,add(y,-h),uqgraph,add(y,-h));
		line(ctx,uqgraph,y,maxgraph,y);
	}
	if($('#highboxplot').is(":checked")){
		var y = oypixel - maxheight*0.8;
		var h = maxheight*0.1;
		ctx.strokeStyle = 'rgb(0,0,0)';
		ctx.lineWidth = 1*scalefactor;
		line(ctx,mingraph,add(y,-5*scalefactor),mingraph,add(y,5*scalefactor));
		line(ctx,lqgraph,add(y,-h),lqgraph,add(y,h));
		line(ctx,medgraph,add(y,-h),medgraph,add(y,h));
		line(ctx,uqgraph,add(y,-h),uqgraph,add(y,h));
		line(ctx,maxgraph,add(y,-5*scalefactor),maxgraph,add(y,5*scalefactor));
		line(ctx,mingraph,y,lqgraph,y);
		line(ctx,lqgraph,add(y,h),uqgraph,add(y,h));
		line(ctx,lqgraph,add(y,-h),uqgraph,add(y,-h));
		line(ctx,uqgraph,y,maxgraph,y);
	}
	if($('#boxnowhisker').is(":checked")){
		var y = oypixel - maxheight*0.1;
		var h = maxheight*0.1;
		ctx.strokeStyle = 'rgb(0,0,0)';
		ctx.lineWidth = 1*scalefactor;
		line(ctx,lqgraph,add(y,-h),lqgraph,add(y,h));
		line(ctx,medgraph,add(y,-h),medgraph,add(y,h));
		line(ctx,uqgraph,add(y,-h),uqgraph,add(y,h));
		line(ctx,lqgraph,add(y,h),uqgraph,add(y,h));
		line(ctx,lqgraph,add(y,-h),uqgraph,add(y,-h));
	}
	if($('#boxnooutlier').is(":checked")){
		var y = oypixel - maxheight*0.1;
		var h = maxheight*0.1;
		ctx.strokeStyle = 'rgb(0,0,0)';
		ctx.lineWidth = 1*scalefactor;
		line(ctx,minnooutliersgraph,add(y,-5*scalefactor),minnooutliersgraph,add(y,5*scalefactor));
		line(ctx,lqgraph,add(y,-h),lqgraph,add(y,h));
		line(ctx,medgraph,add(y,-h),medgraph,add(y,h));
		line(ctx,uqgraph,add(y,-h),uqgraph,add(y,h));
		line(ctx,maxnooutliersgraph,add(y,-5*scalefactor),maxnooutliersgraph,add(y,5*scalefactor));
		line(ctx,minnooutliersgraph,y,lqgraph,y);
		line(ctx,lqgraph,add(y,h),uqgraph,add(y,h));
		line(ctx,lqgraph,add(y,-h),uqgraph,add(y,-h));
		line(ctx,uqgraph,y,maxnooutliersgraph,y);
	}

	if($('#regression').is(":checked")){
		ctx.fillStyle = 'rgba(255,0,0,1)';
		fontsize = 11*scalefactor;
		ctx.font = fontsize+"px Roboto";
		ctx.textAlign="left";
		var ypix=oypixel-maxheight/2;
		ctx.fillText('min: '+minval,left-60*scalefactor,ypix-44*scalefactor);
		ctx.fillText('lq: '+lq,left-60*scalefactor,ypix-33*scalefactor);
		ctx.fillText('med: '+med,left-60*scalefactor,ypix-22*scalefactor);
		ctx.fillText('mean: '+mean,left-60*scalefactor,ypix-11*scalefactor);
		ctx.fillText('uq: '+uq,left-60*scalefactor,ypix);
		ctx.fillText('max: '+maxval,left-60*scalefactor,ypix+11*scalefactor);
		ctx.fillText('sd: '+sd,left-60*scalefactor,ypix+22*scalefactor);
		ctx.fillText('num: '+num,left-60*scalefactor,ypix+33*scalefactor);
	}

	if($('#interval').is(":checked") || $('#intervallim').is(":checked")){
		intervalhalfwidth = 1.5*(uq-lq)/Math.sqrt(num);
		intervalmin = parseFloat(add(med,-intervalhalfwidth).toPrecision(5));
		intervalmax = parseFloat(add(med,intervalhalfwidth).toPrecision(5));
		intervalmingraph = convertvaltopixel(intervalmin,minxtick,maxxtick,left,right);
		intervalmaxgraph = convertvaltopixel(intervalmax,minxtick,maxxtick,left,right);
		if($('#interval').is(":checked")){
			ctx.lineWidth = 10*scalefactor;
			ctx.strokeStyle = 'rgb(0,0,255)';
			line(ctx,intervalmingraph,y,intervalmaxgraph,y);
		}
		if($('#intervallim').is(":checked")){
			fontsize = 10*scalefactor;
			ctx.font = "bold "+fontsize+"px Roboto";
			ctx.fillStyle = 'rgba(0,0,255,1)';
			ctx.textAlign="right";
			ctx.fillText(intervalmin,intervalmingraph,add(y,maxheight*0.1+8*scalefactor));
			ctx.textAlign="left";
			ctx.fillText(intervalmax,intervalmaxgraph,add(y,maxheight*0.1+8*scalefactor));
		}
	}

	if($('#meandot').is(":checked")){
		var meangraph = convertvaltopixel(mean,minxtick,maxxtick,left,right);
		ctx.fillStyle = 'rgba(255,0,0,1)';
		ctx.beginPath();
		ctx.arc(meangraph, oypixel-5*scalefactor, 7*scalefactor, 0, Math.PI*2, true);
		ctx.closePath();
		ctx.fill();
	}

}

function checkforts(xpoints){
	if(xpoints.length==0){
		return 'Error: You must select a time series variable for variable 1<br> eg: 2001 or 2001M01 or 2001Q1 or 2001D1 or 2001W1 or 2001H01';
	}

/*
	if(!$.isNumeric(xpoints[0].substr(0,1)) || !($.isNumeric(xpoints[0]) && xpoints[0].length==4) && xpoints[0].substr(4,1)!="Q" && xpoints[0].substr(4,1)!="M" && xpoints[0].substr(4,1)!="D" && xpoints[0].substr(4,1)!="W" && xpoints[0].substr(4,1)!="H"){
		return 'Error: You must select a time series variable for variable 1<br> eg: 2001 or 2001M01 or 2001Q1 or 2001D1 or 2001W1 or 2001H01';
	}
*/
	if($.isNumeric(xpoints[0])){
		return '1';
	}
	checker=xpoints[0].split('Q')
	if($.isNumeric(checker[0]) && $.isNumeric(checker[1])){
		return '4';
	}
	checker=xpoints[0].split('M')
	if($.isNumeric(checker[0]) && $.isNumeric(checker[1])){
		return '12';
	}
	checker=xpoints[0].split('D')
	if($.isNumeric(checker[0]) && $.isNumeric(checker[1])){
		return '7';
	}
	checker=xpoints[0].split('W')
	if($.isNumeric(checker[0]) && $.isNumeric(checker[1])){
		return '5';
	}
	checker=xpoints[0].split('H')
	if($.isNumeric(checker[0]) && $.isNumeric(checker[1])){
		return '24';
	}
	checker=xpoints[0].split('C')
	if($.isNumeric(checker[0]) && $.isNumeric(checker[1])){
    s=0;
    for (var j in xpoints){
      ts = parseFloat(xpoints[j].split('C')[1]);
      if(ts>s){s=ts};
    }
    return s+"";
	}

	return "Error: You must select a time series variable for variable 1<br> eg: 2001 or 2001M01 or 2001Q1 or 2001D1 or 2001W1 or 2001H01 or 2001C05";
}

function maketsxpoints(xpoints,seasons){
	tsxpoints=[];

	if($.isNumeric(xpoints[0])){
		split="none"
	}
	checker=xpoints[0].split('Q')
	if($.isNumeric(checker[0]) && $.isNumeric(checker[1])){
		split="Q"
	}
	checker=xpoints[0].split('M')
	if($.isNumeric(checker[0]) && $.isNumeric(checker[1])){
		split="M"
	}
	checker=xpoints[0].split('D')
	if($.isNumeric(checker[0]) && $.isNumeric(checker[1])){
		split="D"
	}
	checker=xpoints[0].split('W')
	if($.isNumeric(checker[0]) && $.isNumeric(checker[1])){
		split="W"
	}
	checker=xpoints[0].split('H')
	if($.isNumeric(checker[0]) && $.isNumeric(checker[1])){
		split="H"
	}
	checker=xpoints[0].split('C')
	if($.isNumeric(checker[0]) && $.isNumeric(checker[1])){
		split="C"
	}


	for (index in xpoints){
		xpoint = xpoints[index];
		point = xpoint.split(split);
		year = point[0];
		if (split=="none"){
			season=1;
		} else {
			season=point[1];
		}
		newxpoint = add(year,(season-1)/seasons).toFixed(4);
		tsxpoints[index]=newxpoint;
	}
	return tsxpoints;
}

function newbootstrapcimedian(){
	return bootstrap('median');
}

function newbootstrapcimean(){
	return bootstrap('mean');
}

function bootstrap(mm){
	$('#xvar').show();
	$('#yvar').show();
	$('#thicklinesshow').show();
	$('#labelshow').show();
	$('#transdiv').show();
	$('#sizediv').show();
	$('#greyscaleshow').show();
	$('#stackdotsshow').show();
	$('#pointsizename').html('Point Size:');
	$('#boxplot').prop('checked', true);
	$('#meandot').prop('checked', false);
	$('#highboxplot').prop('checked', false);
	$('#boxnowhisker').prop('checked', false);
	$('#boxnooutlier').prop('checked', false);
	$('#interval').prop('checked', false);
	$('#intervallim').prop('checked', false);
	$('#regression').prop('checked', false);
	$('#gridlinesshow').show();
	$('#removedpointsshow').show();
	$('#stripgraphshow').show();

	if(mm=='mean'){
		$('#boxplot').prop('checked', false);
		$('#meandot').prop('checked', true);
	}

	var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');

	//set size
	var width = $('#width').val();
	var height = $('#height').val();

	ctx.canvas.width = width;
	ctx.canvas.height = height;

	ctx.fillStyle = "#ffffff";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	//get points
	var xpoints = (dataforselector[$('#xvar option:selected').text()]).slice();
	var ypoints = (dataforselector[$('#yvar option:selected').text()]).slice();

	//check for numeric value
	var points=[];
	var allpoints=[];
	var pointsremoved=[];
	var pointsforminmax=[];
	for (var index in xpoints){
		if($.isNumeric(xpoints[index])){
			points.push(index);
			allpoints.push(index);
			pointsforminmax.push(xpoints[index]);
		} else {
			pointsremoved.push(add(index,1));
		}
	}

	if(points.length==0){
		return 'Error: You must select a numeric variable for variable 1';
	}

	if(ypoints.length>0){
		allydifferentgroups = split(allpoints,ypoints,2,2);
		if(typeof allydifferentgroups === 'object'){
			allygroups = Object.keys(allydifferentgroups);
			allygroups.sort(sortorder).reverse();
			for (index in allydifferentgroups){
				group = index;
				depoints=allydifferentgroups[index];
				for (index in depoints){
					point=depoints[index];
					ypoints[point]=group;
				}

			}
		} else {
			return allydifferentgroups;
		}
	} else {
		return 'Error: you must select a variable with only 2 values for variable 2';
	}

	if(pointsremoved.length!=0 && $('#removedpoints').is(":checked")){
		ctx.fillStyle = '#000000';
		fontsize = 13*scalefactor;
		ctx.font = fontsize+"px Roboto";
		ctx.textAlign="right";
		ctx.fillText("ID(s) of Points Removed: "+pointsremoved.join(", "),width-48*scalefactor,48*scalefactor);
	}

	var oypixel=height*0.5-60*scalefactor;
	var maxheight=height*0.25-60*scalefactor;
	var left=60*scalefactor;
	var right=width-60*scalefactor;

	xmin = Math.min.apply(null, pointsforminmax);
	xmax = Math.max.apply(null, pointsforminmax);
	if($.isNumeric($('#boxplotmin').val())){
		xmin=$('#boxplotmin').val();
	}
	if($.isNumeric($('#boxplotmax').val())){
		xmax=$('#boxplotmax').val();
	}
	var minmaxstep = axisminmaxstep(xmin,xmax);
	var minxtick=minmaxstep[0];
	var maxxtick=minmaxstep[1];
	var xstep=minmaxstep[2];

	horaxis(ctx,left,right,add(oypixel,10*scalefactor),minxtick,maxxtick,xstep);

	var alpha = 1-$('#trans').val()/100;

	colors = makeblankcolors(xpoints.length,alpha);

	for (var index in allydifferentgroups){
		plotdotplot(ctx,allydifferentgroups[index],xpoints,minxtick,maxxtick,oypixel,left,right,maxheight,colors,2,1);
		ctx.fillStyle = '#000000';
		fontsize = 15*scalefactor;
		ctx.font = "bold "+fontsize+"px Roboto";
		ctx.textAlign="right";
		ctx.fillText(index,right+10,oypixel-maxheight/2);
		oypixel = oypixel-maxheight;
	}


	//graph title
	ctx.fillStyle = '#000000';
	fontsize = 20*scalefactor;
	ctx.font = "bold "+fontsize+"px Roboto";
	ctx.textAlign="center";
	ctx.fillText($('#title').val(),width/2,30*scalefactor);

	//x-axis title
	ctx.fillStyle = '#000000';
	fontsize = 15*scalefactor;
	ctx.font = "bold "+fontsize+"px Roboto";
	ctx.textAlign="center";
	ctx.fillText($('#xaxis').val(),width/2,height*0.5-10*scalefactor);

	//y-axis title
	if($('#yaxis').val() != "Y Axis Title"){
		var x, y;
		x=20*scalefactor;
		y=height/4;
		ctx.save();
		ctx.fillStyle = '#000000';
		fontsize = 15*scalefactor;
		ctx.font = "bold "+fontsize+"px Roboto";
		ctx.translate(x, y);
		ctx.rotate(-Math.PI/2);
		ctx.textAlign = "center";
		ctx.fillText($('#yaxis').val(), 0, 0);
		ctx.restore();
	}

	var depoints=[];

	for (var index in allydifferentgroups){
		depoints[index]=[];
		thesepoints = allydifferentgroups[index];
		for (var p in thesepoints){
			zp = xpoints[thesepoints[p]];
			depoints[index].push(zp);
		}
	}

	medians=[];
	cnames=[];

	var i=0;
	for (var index in depoints){
		cnames[i] = index;
		if(mm=='median'){
			medians[i] = median(depoints[index]);
		} else {
			medians[i] = calculatemean(depoints[index]);
		}
		i++;
	}

	diff = parseFloat(Number(medians[0]-medians[1]).toPrecision(10));

	if(diff<0){
		diff=-diff;
		reverse=-1;
	} else {
		reverse=1;
	}

	if(mm=='median'){
		if(reverse==1){
			title="Difference Between Medians (" + cnames[0] + " - " + cnames[1] + ")";
		} else {
			title="Difference Between Medians (" + cnames[1] + " - " + cnames[0] + ")";
		}
	} else {
		if(reverse==1){
			title="Difference Between Means (" + cnames[0] + " - " + cnames[1] + ")";
		} else {
			title="Difference Between Means (" + cnames[1] + " - " + cnames[0] + ")";
		}
	}

	//bootstrap x-axis title
	ctx.fillStyle = '#000000';
	fontsize = 15*scalefactor;
	ctx.font = "bold "+fontsize+"px Roboto";
	ctx.textAlign="center";
	ctx.fillText(title,width/2,height-10*scalefactor);

	// create the bootstrap

	bootstrapdifs=[];
	num=points.length;
	b=0;
	while(b<1000){
		bootstrap1=[];
		bootstrap2=[];
		for (index in points){
			sel=randint(0,num-1);
			point=points[sel];
			xval=xpoints[point];
			group=ypoints[point];
			if(cnames[0]==group){
				bootstrap1.push(xval);
			} else {
				bootstrap2.push(xval);
			}
		}
		if(mm=='median'){
			med1=median(bootstrap1);
			med2=median(bootstrap2);
		} else {
			med1=calculatemean(bootstrap1);
			med2=calculatemean(bootstrap2);

		}
		dif=(med1-med2)*reverse;
		dif = parseFloat(Number(dif).toPrecision(10));
		bootstrapdifs.push(dif);
		b++;
	}

	colors = makebscolors(1000,alpha,bootstrapdifs);

	$('#boxplot').prop('checked', false);
	$('#meandot').prop('checked', false);

	bspoints=[];
	i=0;
	while(i<1000){
		bspoints.push(i);
		i++;
	}
	
	bootstrapdifsforsort = bootstrapdifs.slice();
	bootstrapdifsforsort.sort(function(a, b){return a-b});
	
	// set up axis for bootstrap
	steps=(maxxtick-minxtick)/xstep;
	offset=minxtick+xstep*Math.floor(steps/2);
	offset=diff-offset;
	offset=Math.min(bootstrapdifsforsort[25],offset);
	offset=Math.floor(offset/xstep);
	offset=xstep*offset;
	minxtick=minxtick+offset;
	maxxtick=maxxtick+offset;

	oypixel = height - 90*scalefactor;
	horaxis(ctx,left,right,add(oypixel,30*scalefactor),minxtick,maxxtick,xstep);

	maxheight=height*0.5-100*scalefactor;

	if($('#labels').is(":checked")){var waslabels="yes";} else {var waslabels = "no";}
	$('#labels')[0].checked=false;
	plotdotplot(ctx,bspoints,bootstrapdifs,minxtick,maxxtick,oypixel,left,right,maxheight,colors,1,0);
	if(waslabels=="yes"){$('#labels')[0].checked=true;}

	bootstrapdifs.sort(function(a, b){return a-b});
	
	y=oypixel-3*scalefactor;
	ctx.lineWidth = 2*scalefactor;
	ctx.strokeStyle = 'rgb(0,0,255)';
	ctx.fillStyle = '#0000ff';
	fontsize = 11*scalefactor;
	ctx.font = "bold "+fontsize+"px Roboto";
	ctx.textAlign = "center";
	diffpix=convertvaltopixel(diff,minxtick,maxxtick,left,right);
	zeropix=convertvaltopixel(0,minxtick,maxxtick,left,right);
	line(ctx,zeropix,y,diffpix,y);
	line(ctx,diffpix-5*scalefactor,y-5*scalefactor,diffpix,y);
	line(ctx,diffpix-5*scalefactor,add(y,5*scalefactor),diffpix,y);
	ctx.fillText(diff,diffpix,add(y,15*scalefactor));
	intervalmin=bootstrapdifs[25];
	intervalminpix=convertvaltopixel(intervalmin,minxtick,maxxtick,left,right);
	intervalmax=bootstrapdifs[974];
	intervalmaxpix=convertvaltopixel(intervalmax,minxtick,maxxtick,left,right);
	ctx.textAlign = "right";
	line(ctx,intervalminpix,add(y,18*scalefactor),intervalminpix,y-20*scalefactor);
	ctx.fillText(intervalmin,intervalminpix-3*scalefactor,add(y,30*scalefactor));
	ctx.textAlign = "left";
	line(ctx,intervalmaxpix,add(y,18*scalefactor),intervalmaxpix,y-20*scalefactor);
	ctx.fillText(intervalmax,intervalmaxpix+3*scalefactor,add(y,30*scalefactor));
	y=y-15*scalefactor;
	ctx.lineWidth = 10*scalefactor;
	line(ctx,intervalminpix,y,intervalmaxpix,y);

	labelgraph(ctx,width,height);

	var dataURL = canvas.toDataURL();
	return dataURL;
}


function randint(min,max) {
	return Math.floor((Math.random() * (max-min+1)) + min);
}


function reload_js()
   {
      var head= document.getElementsByTagName('head')[0];
      var script= document.createElement('script');
      script.type= 'text/javascript';
      script.src= 'js.js?cachebuster='+ new Date().getTime();
      head.appendChild(script);
      var script= document.createElement('script');
      script.type= 'text/javascript';
      script.src= 'jsnew.js?cachebuster='+ new Date().getTime();
      head.appendChild(script);
	  updategraph();
   }
function newtimeseries(){
	$('#labelshow').show();
	$('#longtermtrendshow').show();
	$('#addmultshow').show();
	$('#startfinishshow').show();
	$('#seasonalshow').show();
	$('#xvar').show();
	$('#yvar').show();
	$('#zvar').show();
	$('#differentaxisshow').show();
	$('#gridlinesshow').show();

	var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');

	//set size
	var width = $('#width').val();
	var height = $('#height').val();

	ctx.canvas.width = width;
	ctx.canvas.height = height;

	ctx.fillStyle = "#ffffff";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	if($('#longtermtrend').is(":checked")){var longtermtrend="yes";} else {var longtermtrend = "no";}
	if($('#seasonal').is(":checked")){var seasonal="yes";} else {var seasonal = "no";}
	if($('#addmult option:selected').text()=="Multiplicative"){var multiplicative="yes";} else {var multiplicative = "no";}

	//graph title
	ctx.fillStyle = '#000000';
	fontsize = 20*scalefactor;
	ctx.font = "bold "+fontsize+"px Roboto";
	ctx.textAlign="center";
	ctx.fillText($('#title').val(),width/2,30*scalefactor);

	if(seasonal=='yes'){
		width=width*0.7;
	}

	//get points
	var xpoints = (dataforselector[$('#xvar option:selected').text()]).slice();
	var ypoints = (dataforselector[$('#yvar option:selected').text()]).slice();
	var zpoints = (dataforselector[$('#zvar option:selected').text()]).slice();

	seasons = checkforts(xpoints);

	if(seasons.substr(0,5)=="Error"){
		return seasons;
	}

	if(ypoints.length==0){
		return 'Error: You must select a numeric variable for variable 2';
	}

	tsxpoints = maketsxpoints(xpoints,seasons);

	// order the time series from smallest to largest
	//check if zpoints
	if(zpoints.length==0){
		//1) combine the arrays:
		var list = [];
		for (var j in tsxpoints)
			list.push({'tsxpoint': tsxpoints[j], 'ypoint': ypoints[j]});

		//2) sort:
		list.sort(function(a, b) {
			return ((a.tsxpoint < b.tsxpoint) ? -1 : ((a.tsxpoint == b.tsxpoint) ? 0 : 1));
		});

		if($.isNumeric(list[0].tsxpoint)){
			list.sort(function(a, b) {
				return (a.tsxpoint - b.tsxpoint);
			});
		}

		//3) separate them back out:
		for (var k = 0; k < list.length; k++) {
			tsxpoints[k] = list[k].tsxpoint;
			ypoints[k] = list[k].ypoint;
		}
	} else {
		//1) combine the arrays:
		var list = [];
		for (var j in tsxpoints)
			list.push({'tsxpoint': tsxpoints[j], 'ypoint': ypoints[j], 'zpoint': zpoints[j]});

		//2) sort:
		list.sort(function(a, b) {
			return ((a.tsxpoint < b.tsxpoint) ? -1 : ((a.tsxpoint == b.tsxpoint) ? 0 : 1));
		});

		if($.isNumeric(list[0].tsxpoint)){
			list.sort(function(a, b) {
				return (a.tsxpoint - b.tsxpoint);
			});
		}

		//3) separate them back out:
		for (var k = 0; k < list.length; k++) {
			tsxpoints[k] = list[k].tsxpoint;
			ypoints[k] = list[k].ypoint;
			zpoints[k] = list[k].zpoint;
		}
	}

	ctx.lineWidth = 1*scalefactor;
	ctx.strokeStyle = 'rgba(0,0,0,1)';
	ctx.rect(50*scalefactor,50*scalefactor,width-100*scalefactor,height-100*scalefactor);
	ctx.stroke();

	//x-axis title
	ctx.fillStyle = '#000000';
	fontsize = 15*scalefactor;
	ctx.font = "bold "+fontsize+"px Roboto";
	ctx.textAlign="center";
	ctx.fillText($('#xaxis').val(),width/2,height-10*scalefactor);

	//y-axis title
	if($('#yaxis').val() != "Y Axis Title"){
		var x, y;
		x=12*scalefactor;
		y=height/2;
		ctx.save();
		ctx.fillStyle = '#000000';
		fontsize = 15*scalefactor;
		ctx.font = "bold "+fontsize+"px Roboto";
		ctx.translate(x, y);
		ctx.rotate(-Math.PI/2);
		ctx.textAlign = "center";
		ctx.fillText($('#yaxis').val(), 0, 0);
		ctx.restore();
	}

	xmin = Math.min.apply(null, tsxpoints);
	xmax = Math.max.apply(null, tsxpoints);

	var minmaxstep = axisminmaxstep(xmin,xmax);
	var minxtick=minmaxstep[0];
	var maxxtick=minmaxstep[1];
	var xstep=minmaxstep[2];
	if(xstep<1){xstep=1;}

	left = 60*scalefactor;
	right = width-60*scalefactor;
	gtop = 60*scalefactor;
	gbottom = height-60*scalefactor;

	horaxis(ctx,left,right,add(gbottom,10*scalefactor),minxtick,maxxtick,xstep);

	var pointsforminmax=[];
	for (var index in ypoints){
		pointsforminmax.push(ypoints[index]);
	}

	if($('#differentaxis').is(":checked")){var differentaxis="yes";} else {var differentaxis = "no";}
	if($('#startfinish').is(":checked")){var startfinish="yes";} else {var startfinish = "no";}

	if(longtermtrend=='yes' || multiplicative=="yes"){
		stlresponse=stl(tsxpoints,ypoints,seasons);
		if(typeof stlresponse == 'string'){return stlresponse;}
		trend = stlresponse[0];
		fitted = stlresponse[1];
		s = stlresponse[2];
		r = stlresponse[3];
	}

	if(zpoints.length>0){
		if(differentaxis=="yes"){
			pointsforzminmax=[];
			for (var index in zpoints){
				pointsforzminmax.push(zpoints[index]);
			}
			var zmin = Math.min.apply(null, pointsforzminmax);
			var zmax = Math.max.apply(null, pointsforzminmax);

			var minmaxstep = axisminmaxstep(zmin,zmax);
			var minztick=minmaxstep[0];
			var maxztick=minmaxstep[1];
			var zstep=minmaxstep[2];

			rvertaxis(ctx,gtop,gbottom,right+10*scalefactor,minztick,maxztick,zstep,left);
		} else {
			for (var index in zpoints){
				pointsforminmax.push(zpoints[index]);
			}
		}
	}

	ymin = Math.min.apply(null, pointsforminmax);
	ymax = Math.max.apply(null, pointsforminmax);
	
	if($.isNumeric($('#timeseriesminy').val())){
		ymin=$('#timeseriesminy').val();
	}
	if($.isNumeric($('#timeseriesmaxy').val())){
		ymax=$('#timeseriesmaxy').val();
	}

	var minmaxstep = axisminmaxstep(ymin,ymax);
	var minytick=minmaxstep[0];
	var maxytick=minmaxstep[1];
	var ystep=minmaxstep[2];

	vertaxis(ctx,gtop,gbottom,left-10*scalefactor,minytick,maxytick,ystep,right+10*scalefactor);
	if(seasonal=="yes"){
		seasonright=width/0.7*0.3+right;
		seasonleft=right+90*scalefactor;
		ctx.lineWidth = 1*scalefactor;
		ctx.strokeStyle = 'rgba(0,0,0,1)';
		ctx.beginPath();
		ctx.rect(seasonleft-10*scalefactor,gtop-10*scalefactor,seasonright-seasonleft+20*scalefactor,gbottom-gtop+20*scalefactor);
		ctx.stroke();
		horaxis(ctx,seasonleft,seasonright,add(gbottom,10*scalefactor),1,seasons,1);
		if(multiplicative=="yes"){
			smult=[];
			pointsforminmax=[];
			for (var index in fitted){
				smult[index]=fitted[index]/trend[index];
				pointsforminmax.push(smult[index]);
			}
			if(zpoints.length>0 && differentaxis!="yes"){
				stlresponse=stl(tsxpoints,zpoints,seasons);
				if(typeof stlresponse == 'string'){return stlresponse;}
				trendz = stlresponse[0];
				fittedz = stlresponse[1];
				for (var index in fittedz){
					pointsforminmax.push(fittedz[index]/trendz[index]);
				}
			}
			var smin = Math.min.apply(null, pointsforminmax);
			var smax = Math.max.apply(null, pointsforminmax);
			var minmaxstep = axisminmaxstep(smin,smax);
			var minstick=minmaxstep[0];
			var maxstick=minmaxstep[1];
			var sstep=minmaxstep[2];
			vertaxis(ctx,gtop,gbottom,right+80*scalefactor,minstick,maxstick,sstep,seasonright+10*scalefactor);
			if(differentaxis!="yes"){
				//0 Line
				ypixel = convertvaltopixel(1,maxstick,minstick,gtop,gbottom);
				ctx.beginPath();
				ctx.setLineDash([5, 5]);
				ctx.moveTo(seasonleft-10*scalefactor, ypixel);
				ctx.lineTo(seasonright+10*scalefactor, ypixel);
				ctx.stroke();
				ctx.setLineDash([]);
			}
		} else {
			shiftforseasonal=Math.ceil((maxytick+minytick)/2/ystep)*ystep;
			vertaxis(ctx,gtop,gbottom,right+80*scalefactor,minytick-shiftforseasonal,maxytick-shiftforseasonal,ystep,seasonright+10*scalefactor);
			if(differentaxis!="yes"){
				//0 Line
				ypixel = convertvaltopixel(0,maxytick-shiftforseasonal,minytick-shiftforseasonal,gtop,gbottom);
				ctx.beginPath();
				ctx.setLineDash([5, 5]);
				ctx.moveTo(seasonleft-10*scalefactor, ypixel);
				ctx.lineTo(seasonright+10*scalefactor, ypixel);
				ctx.stroke();
				ctx.setLineDash([]);
			}
		} 
		//x-axis title
		ctx.fillStyle = '#000000';
		fontsize = 15*scalefactor;
		ctx.font = "bold "+fontsize+"px Roboto";
		ctx.textAlign="center";
		ctx.fillText("Season",(seasonleft+seasonright)/2,height-10*scalefactor);
		//y-axis title
		var x, y;
		x=seasonleft-40*scalefactor;
		y=height/2;
		ctx.save();
		ctx.fillStyle = '#000000';
		fontsize = 15*scalefactor;
		ctx.font = "bold "+fontsize+"px Roboto";
		ctx.translate(x, y);
		ctx.rotate(-Math.PI/2);
		ctx.textAlign = "center";
		ctx.fillText("Seasonal Effect", 0, 0);
		ctx.restore();
	}

	if($('#labels').is(":checked")){var labels="yes";} else {var labels = "no";}
	ytrendpts=[];
	for (index in tsxpoints){
		if(zpoints.length>0){
			ctx.strokeStyle = 'rgba(48,145,255,1)';
		}
		xpixel=convertvaltopixel(tsxpoints[index],minxtick,maxxtick,left,right);
		ypixel=convertvaltopixel(ypoints[index],maxytick,minytick,gtop,gbottom);
		$('#graphmap').append('<area shape="circle" coords="'+(xpixel/scalefactor)+','+(ypixel/scalefactor)+','+3+'" alt="'+parseInt(add(index,1))+'" desc="Point ID: '+parseInt(add(index,1))+'<br>'+xpoints[index]+'<br>'+$("#yvar option:selected").text()+': '+parseFloat(ypoints[index]).toPrecision(5)+'">');
		if(index != 0){
			line(ctx,xpixel,ypixel,lastxpixel,lastypixel);
		}
		if(longtermtrend=='yes'){
			trendpixel=convertvaltopixel(trend[index],maxytick,minytick,gtop,gbottom);
			$('#graphmap').append('<area shape="circle" coords="'+(xpixel/scalefactor)+','+(trendpixel/scalefactor)+','+3+'" alt="'+parseInt(add(index,1))+'" desc="Point ID: '+parseInt(add(index,1))+'<br>'+xpoints[index]+'<br>'+$("#yvar option:selected").text()+' Trend: '+trend[index].toPrecision(5)+'">');
			ytrendpts.push(xpixel,trendpixel);
			if(startfinish=="yes" && (index==0 || index==tsxpoints.length-1)){
				ctx.textAlign="left";
				if(index==0){
					ctx.textAlign="right";
				}
				ctx.fillStyle = 'rgba(255,255,255,1)';
				ctx.fillText(parseFloat(trend[index].toPrecision(3)),xpixel-2,trendpixel-2);
				ctx.fillText(parseFloat(trend[index].toPrecision(3)),xpixel+2,trendpixel-2);
				ctx.fillText(parseFloat(trend[index].toPrecision(3)),xpixel-2,trendpixel+2);
				ctx.fillText(parseFloat(trend[index].toPrecision(3)),xpixel+2,trendpixel+2);
				if(zpoints.length>0){
					ctx.fillStyle = 'rgba(48,145,255,1)';
				} else {
					ctx.fillStyle = 'rgba(0,0,0,1)';
				}
				fontsize = 12*scalefactor;
				ctx.font = "bold "+fontsize+"px Roboto";
				ctx.fillText(parseFloat(trend[index].toPrecision(3)),xpixel,trendpixel);
			}
			lasttrendpixel=trendpixel;
			if(seasonal=='yes'){
				if(multiplicative=="yes"){
					seasonypixel=convertvaltopixel(smult[index],maxstick,minstick,gtop,gbottom);
					seasonalvalue=smult[index];
				} else {
					seasonypixel=convertvaltopixel(s[index],maxytick-shiftforseasonal,minytick-shiftforseasonal,gtop,gbottom);
					seasonalvalue=s[index];
				}
				point=parseFloat(tsxpoints[index]);
				season=Math.round((point-Math.floor(point))*seasons+1);
				seasonxpixel=convertvaltopixel(season,1,seasons,seasonleft,seasonright);
				$('#graphmap').append('<area shape="circle" coords="'+(seasonxpixel/scalefactor)+','+(seasonypixel/scalefactor)+','+3+'" desc="Season: '+season+'<br>'+$("#yvar option:selected").text()+' Seasonal Value: '+seasonalvalue.toPrecision(5)+'">');
				if(season!=1 && index!=0){
					if(parseFloat(index)<=parseFloat(seasons)){
						line(ctx,seasonxpixel,seasonypixel,lastseasonxpixel,lastseasonypixel);
					}
				}
				ctx.beginPath();
				ctx.arc(seasonxpixel,seasonypixel,2,0,2*Math.PI);
				ctx.stroke();
				lastseasonxpixel=seasonxpixel;
				lastseasonypixel=seasonypixel;
			}
		}
		if(labels == "yes"){
			ctx.fillStyle = 'rgba(0,0,255,1)';
			fontsize = 10*scalefactor;
			ctx.font = fontsize+"px Roboto";
			ctx.textAlign="left";
			ctx.fillText(parseInt(add(index,1)),add(add(xpixel,2),2),add(ypixel,4));
		}
		lastxpixel = xpixel;
		lastypixel = ypixel;
	}
	if(longtermtrend=="yes"){
		ctx.lineWidth = 3*scalefactor;
		drawSpline(ctx,ytrendpts,0.5);
	}

	if(zpoints.length>0){
		if(longtermtrend=='yes' || multiplicative=="yes"){
			stlresponse=stl(tsxpoints,zpoints,seasons);
			if(typeof stlresponse == 'string'){return stlresponse;}
			trend = stlresponse[0];
			fitted = stlresponse[1];
			s = stlresponse[2];
			r = stlresponse[3];
		}
		if(multiplicative=="yes"){
			smult=[];
			pointsforminmax=[];
			for (var index in fitted){
				smult[index]=fitted[index]/trend[index];
				pointsforminmax.push(smult[index]);
			}
			if(differentaxis=="yes"){
				var smin = Math.min.apply(null, pointsforminmax);
				var smax = Math.max.apply(null, pointsforminmax);
				var minmaxstep = axisminmaxstep(smin,smax);
				var minstick=minmaxstep[0];
				var maxstick=minmaxstep[1];
				var sstep=minmaxstep[2];
			}
		}
		if(differentaxis=="yes"){
			if(multiplicative=="yes"){
				ctx.strokeStyle = 'rgba(0,0,0,1)';
				seasonleft=right+90*scalefactor;
				rvertaxis(ctx,gtop,gbottom,right+width/0.7*0.3+10*scalefactor,minstick,maxstick,sstep,seasonleft);
			} else {
				ctx.strokeStyle = 'rgba(0,0,0,1)';
				zshiftforseasonal=Math.ceil((maxztick+minztick)/2/zstep)*zstep;
				seasonleft=right+90*scalefactor;
				rvertaxis(ctx,gtop,gbottom,right+width/0.7*0.3+10*scalefactor,minztick-zshiftforseasonal,maxztick-zshiftforseasonal,zstep,seasonleft);
			}
		}
		ctx.strokeStyle = 'rgba(191,108,36,1)';
		ztrendpts=[]
		for (index in tsxpoints){
			xpixel=convertvaltopixel(tsxpoints[index],minxtick,maxxtick,left,right);
			if(differentaxis=="yes"){
				ypixel=convertvaltopixel(zpoints[index],maxztick,minztick,gtop,gbottom);
			} else {
				ypixel=convertvaltopixel(zpoints[index],maxytick,minytick,gtop,gbottom);
			}
			if(index != 0){
				line(ctx,xpixel,ypixel,lastxpixel,lastypixel);
			}
			$('#graphmap').append('<area shape="circle" coords="'+(xpixel/scalefactor)+','+(ypixel/scalefactor)+','+3+'" alt="'+parseInt(add(index,1))+'" desc="Point ID: '+parseInt(add(index,1))+'<br>'+xpoints[index]+'<br>'+$("#zvar option:selected").text()+': '+parseFloat(zpoints[index]).toPrecision(5)+'">');
			if(longtermtrend=='yes'){
				if(differentaxis=="yes"){
					trendpixel=convertvaltopixel(trend[index],maxztick,minztick,gtop,gbottom);
				} else {
					trendpixel=convertvaltopixel(trend[index],maxytick,minytick,gtop,gbottom);
				}
				$('#graphmap').append('<area shape="circle" coords="'+(xpixel/scalefactor)+','+(trendpixel/scalefactor)+','+3+'" alt="'+parseInt(add(index,1))+'" desc="Point ID: '+parseInt(add(index,1))+'<br>'+xpoints[index]+'<br>'+$("#zvar option:selected").text()+' Trend: '+trend[index].toPrecision(5)+'">');
				ztrendpts.push(xpixel,trendpixel);
				ctx.lineWidth = 1*scalefactor;
				if(startfinish=="yes" && (index==0 || index==tsxpoints.length-1)){
					ctx.textAlign="left";
					if(index==0){
						ctx.textAlign="right";
					}
					ctx.fillStyle = 'rgba(255,255,255,1)';
					ctx.fillText(parseFloat(trend[index].toPrecision(3)),xpixel-2,trendpixel-2);
					ctx.fillText(parseFloat(trend[index].toPrecision(3)),xpixel+2,trendpixel-2);
					ctx.fillText(parseFloat(trend[index].toPrecision(3)),xpixel-2,trendpixel+2);
					ctx.fillText(parseFloat(trend[index].toPrecision(3)),xpixel+2,trendpixel+2);
					ctx.fillStyle = 'rgba(191,108,36,1)';
					fontsize = 12*scalefactor;
					ctx.font = "bold "+fontsize+"px Roboto";
					ctx.fillText(parseFloat(trend[index].toPrecision(3)),xpixel,trendpixel);
				}
				lasttrendpixel=trendpixel;
				if(seasonal=='yes'){
					if(multiplicative=="yes"){
						seasonypixel=convertvaltopixel(smult[index],maxstick,minstick,gtop,gbottom);
						seasonalvalue=smult[index];
					} else {
						seasonalvalue=s[index];
						if(differentaxis=="yes"){
							seasonypixel=convertvaltopixel(s[index],maxztick-zshiftforseasonal,minztick-zshiftforseasonal,gtop,gbottom);
						} else {
							seasonypixel=convertvaltopixel(s[index],maxytick-shiftforseasonal,minytick-shiftforseasonal,gtop,gbottom);
						}
					}
					
					point=parseFloat(tsxpoints[index]);
					season=Math.round((point-Math.floor(point))*seasons+1);
					seasonxpixel=convertvaltopixel(season,1,seasons,seasonleft,seasonright);
					$('#graphmap').append('<area shape="circle" coords="'+(seasonxpixel/scalefactor)+','+(seasonypixel/scalefactor)+','+3+'" desc="Season: '+season+'<br>'+$("#zvar option:selected").text()+' Seasonal Value: '+seasonalvalue.toPrecision(5)+'">');
					if(season!=1 && index!=0){
						
						if(parseFloat(index)<=parseFloat(seasons)){
							line(ctx,seasonxpixel,seasonypixel,lastseasonxpixel,lastseasonypixel);
						}
					}
					ctx.beginPath();
					ctx.arc(seasonxpixel,seasonypixel,2,0,2*Math.PI);
					ctx.stroke();
					lastseasonxpixel=seasonxpixel;
					lastseasonypixel=seasonypixel;
				}
			}
			if(labels == "yes"){
				ctx.fillStyle = 'rgba(0,0,255,1)';
				fontsize = 10*scalefactor;
				ctx.font = fontsize+"px Roboto";
				ctx.textAlign="left";
				ctx.fillText(parseInt(add(index,1)),add(xpixel,4),add(ypixel,4));
			}
			lastxpixel = xpixel;
			lastypixel = ypixel;
		}
		if(longtermtrend=="yes"){
			ctx.lineWidth = 3*scalefactor;
			drawSpline(ctx,ztrendpts,0.5);
		}
		if(differentaxis=="yes"){
			lefta=" (left axis)";
			righta=" (right axis)";
		} else {
			lefta="";
			righta="";
		}
		ctx.lineWidth = 2*scalefactor;
		ctx.textAlign="left";
		fontsize = 13*scalefactor;
		ctx.font = fontsize+"px Roboto";
		ctx.strokeStyle = 'rgba(48,145,255,1)';
		ctx.fillStyle = 'rgba(48,145,255,1)';
		line(ctx,left,gtop,add(left,10*scalefactor),gtop);
		ctx.fillText($("#yvar option:selected").text()+lefta,add(left,15*scalefactor),add(gtop,5*scalefactor));
		ctx.strokeStyle = 'rgba(191,108,36,1)';
		ctx.fillStyle = 'rgba(191,108,36,1)';
		line(ctx,left,add(gtop,15*scalefactor),add(left,10*scalefactor),add(gtop,15*scalefactor));
		ctx.fillText($("#zvar option:selected").text()+righta,add(left,15*scalefactor),add(gtop,20*scalefactor));
	}

	if(seasonal=='yes'){
		width=width/0.7;
	}
	labelgraph(ctx,width,height);

	var dataURL = canvas.toDataURL();
	return dataURL;
}

function newtimeseriesrecomp(){

	$('#labelshow').show();
	$('#addmultshow').show();
	$('#startfinishshow').show();
	$('#xvar').show();
	$('#yvar').show();
	$('#gridlinesshow').show();

	var canvas = document.getElementById('myCanvas');
	var ctx = canvas.getContext('2d');

	//set size
	var width = $('#width').val();
	var height = $('#height').val();

	ctx.canvas.width = width;
	ctx.canvas.height = height;

	ctx.fillStyle = "#ffffff";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	//graph title
	ctx.fillStyle = '#000000';
	fontsize=20*scalefactor;
	ctx.font = "bold "+fontsize+"px Roboto";
	ctx.textAlign="center";
	ctx.fillText($('#title').val(),width/2,30*scalefactor);

	//get points
	var xpoints = (dataforselector[$('#xvar option:selected').text()]).slice();
	var ypoints = (dataforselector[$('#yvar option:selected').text()]).slice();

	seasons = checkforts(xpoints);

	if(seasons.substr(0,5)=="Error"){
		return seasons;
	}

	if(ypoints.length==0){
		return 'Error: You must select a numeric variable for variable 2';
	}

	tsxpoints = maketsxpoints(xpoints,seasons);

	// order the time series from smallest to largest
	//1) combine the arrays:
	var list = [];
	for (var j in tsxpoints)
		list.push({'tsxpoint': tsxpoints[j], 'ypoint': ypoints[j]});

	//2) sort:
	list.sort(function(a, b) {
		return ((parseFloat(a.tsxpoint) < parseFloat(b.tsxpoint)) ? -1 : ((a.tsxpoint == b.tsxpoint) ? 0 : 1));
	});

	//3) separate them back out:
	for (var k = 0; k < list.length; k++) {
		tsxpoints[k] = list[k].tsxpoint;
		ypoints[k] = list[k].ypoint;
	}

	ctx.lineWidth = 1*scalefactor;
	ctx.strokeStyle = 'rgba(0,0,0,1)';
	ctx.rect(50*scalefactor,50*scalefactor,width-100*scalefactor,height-100*scalefactor);
	ctx.stroke();

	//x-axis title
	ctx.fillStyle = '#000000';
	fontsize = 15*scalefactor;
	ctx.font = "bold "+fontsize+"px Roboto";
	ctx.textAlign="center";
	ctx.fillText($('#xaxis').val(),width/2,height-10*scalefactor);

	//y-axis title
	if($('#yaxis').val() != "Y Axis Title"){
		var x, y;
		x=12*scalefactor;
		y=height/2;
		ctx.save();
		ctx.fillStyle = '#000000';
		ctx.font = "bold "+fontsize+"px Roboto";
		ctx.translate(x, y);
		ctx.rotate(-Math.PI/2);
		ctx.textAlign = "center";
		ctx.fillText($('#yaxis').val(), 0, 0);
		ctx.restore();
	}

	xmin = Math.min.apply(null, tsxpoints);
	xmax = Math.max.apply(null, tsxpoints);

	var minmaxstep = axisminmaxstep(xmin,xmax);
	var minxtick=minmaxstep[0];
	var maxxtick=minmaxstep[1];
	var xstep=minmaxstep[2];

	left = 60*scalefactor;
	right = width-60*scalefactor;
	gtop = 60*scalefactor;
	gbottom = height-60*scalefactor;

	horaxis(ctx,left,right,add(gbottom,10*scalefactor),minxtick,maxxtick,xstep);

	var pointsforminmax=[];
	for (var index in ypoints){
		pointsforminmax.push(ypoints[index]);
	}

	var abslowest = Math.min.apply(null, pointsforminmax);
	var abshighest = Math.max.apply(null, pointsforminmax);

	if($('#startfinish').is(":checked")){var startfinish="yes";} else {var startfinish = "no";}

	stlresponse=stl(tsxpoints,ypoints,seasons);
	if(typeof stlresponse == 'string'){return stlresponse;}
	trend = stlresponse[0];
	fitted = stlresponse[1];
	s = stlresponse[2];
	r = stlresponse[3];

	for (var index in trend){
		pointsforminmax.push(trend[index]);
	}

	for (var index in fitted){
		pointsforminmax.push(fitted[index]);
	}

	pointsforsminmax=[]
	for (var index in s){
		pointsforsminmax.push(s[index]);
	}

	pointsforrminmax=[]
	for (var index in r){
		pointsforrminmax.push(r[index]);
	}

	ymin = Math.min.apply(null, pointsforminmax);
	ymax = Math.max.apply(null, pointsforminmax);
	var smin = Math.min.apply(null, pointsforsminmax);
	var smax = Math.max.apply(null, pointsforsminmax);
	var rmin = Math.min.apply(null, pointsforrminmax);
	var rmax = Math.max.apply(null, pointsforrminmax);
	
	if($.isNumeric($('#timeseriesminy').val())){
		ymin=$('#timeseriesminy').val();
	}
	if($.isNumeric($('#timeseriesmaxy').val())){
		ymax=$('#timeseriesmaxy').val();
	}

	var minmaxstep = axisminmaxstep(ymin,ymax);
	var minytick=minmaxstep[0];
	var maxytick=minmaxstep[1];
	var ystep=minmaxstep[2];
	var minstick=Math.floor(smin/ystep)*ystep;
	var maxstick=Math.ceil(smax/ystep)*ystep;
	var minrtick=Math.floor(rmin/ystep)*ystep;
	var maxrtick=Math.ceil(rmax/ystep)*ystep;

	ysteps = (maxytick-minytick)/ystep;
	ssteps = Math.abs(minstick/ystep)+Math.abs(maxstick/ystep);
	rsteps = Math.abs(minrtick/ystep)+Math.abs(maxrtick/ystep);

	totalsteps = ysteps + ssteps + rsteps;

	gbottom = (height-160*scalefactor)*ysteps/totalsteps+gtop;

	vertaxis(ctx,gtop,gbottom,left-10*scalefactor,minytick,maxytick,ystep);

	ctx.lineWidth = 2*scalefactor;
	ctx.strokeStyle = 'rgba(0,200,0,1)';
	for (index in tsxpoints){
		xpixel=convertvaltopixel(tsxpoints[index],minxtick,maxxtick,left,right);
		ypixel=convertvaltopixel(fitted[index],maxytick,minytick,gtop,gbottom);
		$('#graphmap').append('<area shape="circle" coords="'+(xpixel/scalefactor)+','+(ypixel/scalefactor)+','+3+'" alt="'+parseInt(add(index,1))+'" desc="Point ID: '+parseInt(add(index,1))+'<br>'+xpoints[index]+'<br>'+$("#yvar option:selected").text()+' Fitted Value: '+fitted[index].toPrecision(5)+'">');
		if(index != 0){
			line(ctx,xpixel,ypixel,lastxpixel,lastypixel);
		}
		lastxpixel = xpixel;
		lastypixel = ypixel;
	}

	if($('#addmult option:selected').text()=="Multiplicative"){var multiplicative="yes";} else {var multiplicative = "no";}
	if($('#labels').is(":checked")){var labels="yes";} else {var labels = "no";}
	trendpts=[];
	for (index in tsxpoints){
		xpixel=convertvaltopixel(tsxpoints[index],minxtick,maxxtick,left,right);
		ypixel=convertvaltopixel(ypoints[index],maxytick,minytick,gtop,gbottom);
		$('#graphmap').append('<area shape="circle" coords="'+(xpixel/scalefactor)+','+(ypixel/scalefactor)+','+3+'" alt="'+parseInt(add(index,1))+'" desc="Point ID: '+parseInt(add(index,1))+'<br>'+xpoints[index]+'<br>'+$("#yvar option:selected").text()+': '+parseFloat(ypoints[index]).toPrecision(5)+'">');
		trendpixel=convertvaltopixel(trend[index],maxytick,minytick,gtop,gbottom);
		trendpts.push(xpixel,trendpixel);
		$('#graphmap').append('<area shape="circle" coords="'+(xpixel/scalefactor)+','+(trendpixel/scalefactor)+','+3+'" alt="'+parseInt(add(index,1))+'" desc="Point ID: '+parseInt(add(index,1))+'<br>'+xpoints[index]+'<br>'+$("#yvar option:selected").text()+' Trend: '+trend[index].toPrecision(5)+'">');
		if(startfinish=="yes" && (index==0 || index==tsxpoints.length-1)){
			ctx.textAlign="left";
			if(index==0){
				ctx.textAlign="right";
			}
			ctx.fillStyle = 'rgba(255,255,255,1)';
			ctx.fillText(parseFloat(trend[index].toPrecision(3)),xpixel-2,trendpixel-2);
			ctx.fillText(parseFloat(trend[index].toPrecision(3)),xpixel+2,trendpixel-2);
			ctx.fillText(parseFloat(trend[index].toPrecision(3)),xpixel-2,trendpixel+2);
			ctx.fillText(parseFloat(trend[index].toPrecision(3)),xpixel+2,trendpixel+2);
			ctx.fillStyle = 'rgba(0,0,255,1)';
			ctx.font = "bold 12px Roboto";
			ctx.fillText(parseFloat(trend[index].toPrecision(3)),xpixel,trendpixel);
		}
		if(index != 0){
			ctx.strokeStyle = 'rgba(0,0,0,1)';
			line(ctx,xpixel,ypixel,lastxpixel,lastypixel);
			ctx.lineWidth = 1*scalefactor;
		}
		if(labels == "yes"){
			ctx.fillStyle = 'rgba(0,0,255,1)';
			ctx.font = "10px Roboto";
			ctx.textAlign="left";
			ctx.fillText(parseInt(add(index,1)),add(add(xpixel,2),2),add(ypixel,4));
		}
		lasttrendpixel=trendpixel;
		lastfittedpixel=fitted;
		lastxpixel = xpixel;
		lastypixel = ypixel;
	}

	ctx.strokeStyle = 'rgba(0,0,255,1)';
	ctx.lineWidth = 2*scalefactor;
	drawSpline(ctx,trendpts,0.5)

	fontsize=12*scalefactor;

	ctx.strokeStyle = 'rgba(0,0,0,1)';
	line (ctx,left,gtop,left+20*scalefactor,gtop);
	ctx.fillStyle = 'rgba(0,0,0,1)';
	ctx.font = fontsize+"px Roboto";
	ctx.textAlign="left";
	ctx.fillText("Raw Data",left+25*scalefactor,gtop+5*scalefactor);

	gtop+=15*scalefactor;
	ctx.lineWidth = 3*scalefactor;
	ctx.strokeStyle = 'rgba(0,0,255,1)';
	line (ctx,left,gtop,left+20*scalefactor,gtop);
	ctx.fillStyle = 'rgba(0,0,0,1)';
	ctx.font = fontsize+"px Roboto";
	ctx.textAlign="left";
	ctx.fillText("Trend",left+25*scalefactor,gtop+5*scalefactor);

	gtop+=15*scalefactor;
	ctx.lineWidth = 2*scalefactor;
	ctx.strokeStyle = 'rgba(0,200,0,1)';
	line (ctx,left,gtop,left+20*scalefactor,gtop);
	ctx.fillStyle = 'rgba(0,0,0,1)';
	ctx.font = fontsize+"px Roboto";
	ctx.textAlign="left";
	ctx.fillText("Trend + Seasonal",left+25*scalefactor,gtop+5*scalefactor);

	ctx.lineWidth = 1*scalefactor;
	ctx.strokeStyle = 'rgba(0,0,0,1)';
	line(ctx,left-10*scalefactor,gbottom+10*scalefactor,right+10*scalefactor,gbottom+10*scalefactor);

	gtop = gbottom+20*scalefactor;
	gbottom = (height-160*scalefactor)*ssteps/totalsteps+gtop;

	rvertaxis(ctx,gtop,gbottom,right+10*scalefactor,minstick,maxstick,ystep);
	ctx.strokeStyle = 'rgba(0,0,0,0.3)';
	zero = convertvaltopixel(0,minstick,maxstick,gbottom,gtop);
	line(ctx,left,zero,right,zero)
	ctx.strokeStyle = 'rgba(255,100,0,1)';
	for (index in tsxpoints){
		xpixel=convertvaltopixel(tsxpoints[index],minxtick,maxxtick,left,right);
		ypixel=convertvaltopixel(s[index],maxstick,minstick,gtop,gbottom);
		$('#graphmap').append('<area shape="circle" coords="'+(xpixel/scalefactor)+','+(ypixel/scalefactor)+','+3+'" alt="'+parseInt(add(index,1))+'" desc="Point ID: '+parseInt(add(index,1))+'<br>'+xpoints[index]+'<br>'+$("#yvar option:selected").text()+' Seasonal Value: '+s[index].toPrecision(5)+'">');
		if(index != 0){
			line(ctx,xpixel,ypixel,lastxpixel,lastypixel);
		}
		if(labels == "yes"){
			fontsize = 10*scalefactor;
			ctx.fillStyle = 'rgba(0,0,255,1)';
			ctx.font = fontsize+"px Roboto";
			ctx.textAlign="left";
			ctx.fillText(parseInt(add(index,1)),add(add(xpixel,2),2),add(ypixel,4));
		}
		lastxpixel = xpixel;
		lastypixel = ypixel;
	}
	line (ctx,left,gtop,left+20*scalefactor,gtop);
	ctx.fillStyle = 'rgba(0,0,0,1)';
	fontsize = 12*scalefactor;
	ctx.font = fontsize+"px Roboto";
	ctx.textAlign="left";
	ctx.fillText("Seasonal",left+25*scalefactor,gtop+5*scalefactor);

	ctx.strokeStyle = 'rgba(0,0,0,1)';
	line(ctx,left-10*scalefactor,gbottom+10*scalefactor,right+10*scalefactor,gbottom+10*scalefactor);

	gtop = gbottom+20*scalefactor;
	gbottom = (height-160*scalefactor)*rsteps/totalsteps+gtop;

	vertaxis(ctx,gtop,gbottom,left-10*scalefactor,minrtick,maxrtick,ystep);
	ctx.strokeStyle = 'rgba(0,0,0,0.3)';
	zero = convertvaltopixel(0,minrtick,maxrtick,gbottom,gtop);
	limit=(abshighest-abslowest)/10;
	lowlimit = convertvaltopixel(-limit,minrtick,maxrtick,gbottom,gtop);
	highlimit = convertvaltopixel(limit,minrtick,maxrtick,gbottom,gtop);
	line(ctx,left,zero,right,zero);
	if(limit<maxrtick){
		line(ctx,left,highlimit,right,highlimit);
	}
	if(limit>minrtick){
		line(ctx,left,lowlimit,right,lowlimit);
	}
	ctx.strokeStyle = 'rgba(255,0,0,1)';
	line (ctx,left,gtop,left+20*scalefactor,gtop);
	for (index in tsxpoints){
		xpixel=convertvaltopixel(tsxpoints[index],minxtick,maxxtick,left,right);
		ypixel=convertvaltopixel(r[index],maxrtick,minrtick,gtop,gbottom);
		$('#graphmap').append('<area shape="circle" coords="'+(xpixel/scalefactor)+','+(ypixel/scalefactor)+','+3+'" alt="'+parseInt(add(index,1))+'" desc="Point ID: '+parseInt(add(index,1))+'<br>'+xpoints[index]+'<br>'+$("#yvar option:selected").text()+' Residual Value: '+r[index].toPrecision(5)+'">');
		if(index != 0){
			line(ctx,xpixel,ypixel,lastxpixel,lastypixel);
		}
		if(labels == "yes"){
			fontsize = 10*scalefactor;
			ctx.fillStyle = 'rgba(0,0,255,1)';
			ctx.font = fontsize+"px Roboto";
			ctx.textAlign="left";
			ctx.fillText(parseInt(add(index,1)),add(add(xpixel,2),2),add(ypixel,4));
		}
		lastxpixel = xpixel;
		lastypixel = ypixel;
	}
	fontsize = 12*scalefactor;
	ctx.fillStyle = 'rgba(0,0,0,1)';
	ctx.font = fontsize+"px Roboto";
	ctx.textAlign="left";
	ctx.fillText("Residual",left+25*scalefactor,gtop+5*scalefactor);

	labelgraph(ctx,width,height);

	var dataURL = canvas.toDataURL();
	return dataURL;
}


function stl(xpoints,ypoints,seasons){
	if($('#addmult option:selected').text()=="Multiplicative"){var multiplicative="yes";} else {var multiplicative = "no";}
	if (multiplicative=="yes"){
		for(index in ypoints){
			if(ypoints[index]==0){ypoints[index]=0.0000001;}
			ypoints[index]=Math.log(ypoints[index]);
		}
	}
	T=[];
	S=[];
	raw=[];
	for (index in xpoints){
		xpoint=xpoints[index].toString();
		raw[xpoint]=ypoints[index];
		T[xpoint]=0;
		S[xpoint]=0;
	}
	n_l=nextodd(seasons);//next odd number after number in trend
	n_s=7;
	n_t=nextodd(1.5*seasons/(1-1.5/n_s));
	il=innerloop(xpoints,raw,T,n_s,n_l,n_t);
	if(typeof il == 'string'){return il+", Loop 1";}
	T=il[0];
	S=il[1];
	il=innerloop(xpoints,raw,T,n_s,n_l,n_t);
	if(typeof il == 'string'){return il+", Loop 2";}
	T=il[0];
	S=il[1];

	var fitted=[];
	var r=[];
	var trend=[];
	var s=[];
	if (multiplicative=="yes"){
		for(index in ypoints){
			ypoints[index]=Math.exp(ypoints[index]);
			ypoint=ypoints[index];
			xpoint=xpoints[index].toString();
			trend[index]=Math.exp(T[xpoint]);
			fitted[index]=Math.exp(T[xpoint]+S[xpoint]);
			s[index]=fitted[index]-trend[index];
			r[index]=ypoint-fitted[index];
		}
	} else {
		for(index in ypoints){
			ypoint=ypoints[index];
			xpoint=xpoints[index].toString();
			trend[index]=T[xpoint];
			fitted[index]=T[xpoint]+S[xpoint];
			s[index]=S[xpoint];
			r[index]=ypoint-fitted[index];
		}
	}
	return [trend,fitted,s,r];
}

function nextodd(n){
	n=Math.ceil(n);
	if(Math.floor(n/2)==n/2){n++;}
	return n;
}

function innerloop(xpoints,raw,T,n_s,n_l,n_t){

	detrended=[];
	for (index in xpoints){
		xpoint=xpoints[index].toString();
		detrended[xpoint]=raw[xpoint]-T[xpoint];
	}
	if(n_l==1){
		for(index in T){
			S[index]=0;
		}
		n_t=nextodd(xpoints.length/3);
	} else {
		cyclesubseries=[];
		for (index in xpoints){
			xpoint=xpoints[index];
			year=Math.floor(xpoint);
			season=(xpoint-year).toFixed(4);
			xpoint=xpoint.toString();
			if(cyclesubseries[season] === undefined){cyclesubseries[season]=[];}
			cyclesubseries[season][xpoint]=detrended[xpoint];
		}
		for (index in cyclesubseries){
			season=index;
			values=cyclesubseries[season];
			minkey=99999999;
			maxkey=0;
			forpoints=[];
			keys=[];
			vals=[];
			for (key in values){
				keys.push(key);
				vals.push(values[key])
				forpoints.push(key);
				keyf = parseFloat(key);
				if(keyf<minkey){minkey=keyf;}
				if(keyf>maxkey){maxkey=keyf;}
			}
			forpoints.push((parseFloat(maxkey)+1).toFixed(4));
			forpoints.push((minkey-1).toFixed(4));
			cyclesubseries[season]=loess(keys,vals,n_s,forpoints,75);
		}
		C=[];
		for (index in cyclesubseries){
			for (x in cyclesubseries[index]){
				C[parseFloat(x).toFixed(4)]=cyclesubseries[index][x];
			}

		}

		Ckeys=[];
		for (index in C){
			Ckeys.push(parseFloat(index).toFixed(4));
		}
		Ckeys.sort(function(a, b){return a-b});
		L=[];
		for (index in Ckeys){
			key=Ckeys[index];
			L[parseFloat(key).toFixed(4)]=C[key];
		}
		L=movingaverage(L,seasons);
		L=movingaverage(L,seasons);
		keys=[]
		vals=[];
		for (key in L){
			keys.push(key);
			vals.push(L[key]);
		}
		L=loess(keys,vals,n_l,keys,88);
		S=[];
		for (index in xpoints){
			xpoint=xpoints[index].toString();
			if(C[xpoint] === undefined || L[xpoint] === undefined){
				return "Error: with Data array key "+xpoint+" doesn't exist in C or L (stl)";
			} else {
				S[xpoint]=C[xpoint]-L[xpoint];
			}
		}
		S2=[];

		for (index in xpoints){
			xpoint=xpoints[index];
			year=Math.floor(xpoint);
			season=(xpoint-year).toFixed(4);
			if(S2[season] === undefined){S2[season]=[];}
			S2[season][xpoint]=S[xpoint.toString()];
		}

		S=[];

		for (index in S2){
			values = S2[index];
			total=0;
			i=0;
			for (index in values){
				total+=values[index];
				i++;
			}
			mean = total/i;
			for (index in values){
				value=values[index];
				S[index.toString()]=mean;
			}
		}

		Skeys=[];
		Svals=[];
		for (index in S){
			Skeys.push(parseFloat(index).toFixed(4));
			Svals[index]=S[index];
		}
		Skeys.sort(function(a, b){return a-b});

		S=[];
		for (index in Skeys){
			key=Skeys[index];
			S[parseFloat(key).toFixed(4)]=Svals[key];
		}
	}
	deseasonalised=[];
	deseasonalisedkey=[];
	deseasonalisedval=[];
	for (index in xpoints){
		xpoint=xpoints[index].toString();
		deseasonalisedkey.push(xpoint);
		deseasonalisedval.push(raw[xpoint]-S[xpoint]);
		deseasonalised[xpoint]=(raw[xpoint]-S[xpoint]);
	}

	T=loess(deseasonalisedkey,deseasonalisedval,n_t,deseasonalisedkey,123);
	return [T,S];
}

function movingaverage(array,length){
	i=Math.ceil((parseFloat(length)+1)/2-1);
	xs=[];
	ys=[];
	for (index in array){
		xs.push(index);
		ys.push(array[index]);
	}
	max=xs.length-i;
	cmms=[];
	while(i<max){
		a=i-(length-1)/2;
		b=i+(length-1)/2;
		if(a!=Math.floor(a)){
			//need to center
			cmm1=0;
			cmm2=0;
			z=0;
			while(z<length){
				cmm1+=ys[a+z-0.5];
				cmm1+=ys[a+z+0.5];
				z++;
			}
			cmm1/=length;
			cmm2/=length;
			cmm=(cmm1+cmm2)/2;
		} else {
			//already centered
			cmm=0;
			z=0;
			a=i-length/2;
			while(z<length){
				cmm+=ys[a+z+0.5];
				z++;
			}
			cmm/=length;
		}
		cmms[parseFloat(xs[i]).toFixed(4)]=cmm;
		i++;
	}
	return cmms;
}

function loess(xpoints,ypoints,nPts,xvals,row){
	row = row || "na";
	nPts=Math.min(xpoints.length,nPts);
	yreturn=[];
	for (index in xvals){
		currentx = parseFloat(xvals[index]);
		distances=[];
		i=0;
		for (index in xpoints){
			xpoint=parseFloat(xpoints[index]);
			distances[i]=Math.abs(xpoint-currentx);
			i++;
		}

		smallestndistances=[];
		for (index in distances){
			if(smallestndistances.length<nPts){
				smallestndistances.push(distances[index]);
			} else {
				smallestndistances.sort(function(a, b){return a-b});
				biggest=smallestndistances[smallestndistances.length-1];
				distance=distances[index];
				if(distance<biggest){
					smallestndistances.pop();
					smallestndistances.push(distance);
				}
			}
		}
		points=[];
		for (index in smallestndistances){
			distance=smallestndistances[index];
			point = distances.indexOf(distance);
			if (point > -1) {
				distances.splice(point, 1, "DELETED");
			}
			points.push(point);
		}

		distances=smallestndistances;
		distances.sort(function(a, b){return a-b});
		maxdis=distances[distances.length-1];
		if(nPts<=3){maxdis+=0.001;}
		weights=[];
		// work out the weights
		for (index in points){
			i=points[index];
			distance=distances[index];
			u=Math.abs(distance)/maxdis;
			weights[i]=Math.pow((1-Math.pow(u,3)),3);
		}

		SumWts = 0;
		SumWtX = 0;
		SumWtX2 = 0;
		SumWtY = 0;
		SumWtXY = 0;

		for(index in points){
			i=points[index];
			SumWts = SumWts + weights[i];
			SumWtX = SumWtX + parseFloat(xpoints[i]) * weights[i];
			SumWtX2 = SumWtX2 + Math.pow(parseFloat(xpoints[i]),2)	* weights[i];
			SumWtY = SumWtY + parseFloat(ypoints[i]) * weights[i];
			SumWtXY = SumWtXY + parseFloat(xpoints[i]) * parseFloat(ypoints[i]) * weights[i];
		}
		Denom = SumWts * SumWtX2 - Math.pow(SumWtX,2);
		if(Denom==0){
			console.log('oh dear - invalid denominator for LOESS row... setting to 0.0001 instead');
			Denom=0.0001;
		}
		//calculate the regression coefficients, and finally the loess value
		WLRSlope = (SumWts * SumWtXY - SumWtX * SumWtY) / Denom;
		WLRIntercept = (SumWtX2 * SumWtY - SumWtX * SumWtXY) / Denom;
		yreturn[currentx.toFixed(4)] = WLRSlope * currentx + WLRIntercept;
	}
	return yreturn;
}

function getControlPoints(x0,y0,x1,y1,x2,y2,t){
    //  x0,y0,x1,y1 are the coordinates of the end (knot) pts of this segment
    //  x2,y2 is the next knot -- not connected here but needed to calculate p2
    //  p1 is the control point calculated here, from x1 back toward x0.
    //  p2 is the next control point, calculated here and returned to become the
    //  next segment's p1.
    //  t is the 'tension' which controls how far the control points spread.

    //  Scaling factors: distances from this knot to the previous and following knots.
    var d01=Math.sqrt(Math.pow(x1-x0,2)+Math.pow(y1-y0,2));
    var d12=Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2));

    var fa=t*d01/(d01+d12);
    var fb=t-fa;

    var p1x=x1+fa*(x0-x2);
    var p1y=y1+fa*(y0-y2);

    var p2x=x1-fb*(x0-x2);
    var p2y=y1-fb*(y0-y2);

    return [p1x,p1y,p2x,p2y]
}

function drawSpline(ctx,pts,t){
    ctx.save();
    var cp=[];   // array of control points, as x0,y0,x1,y1,...
    var n=pts.length;

	// Draw an open curve, not connected at the ends
	for(var i=0;i<n-4;i+=2){
		cp=cp.concat(getControlPoints(pts[i],pts[i+1],pts[i+2],pts[i+3],pts[i+4],pts[i+5],t));
	}
	for(var i=2;i<pts.length-5;i+=2){
		ctx.beginPath();
		ctx.moveTo(pts[i],pts[i+1]);
		ctx.bezierCurveTo(cp[2*i-2],cp[2*i-1],cp[2*i],cp[2*i+1],pts[i+2],pts[i+3]);
		ctx.stroke();
		ctx.closePath();
	}
	//  For open curves the first and last arcs are simple quadratics.
	ctx.beginPath();
	ctx.moveTo(pts[0],pts[1]);
	ctx.quadraticCurveTo(cp[0],cp[1],pts[2],pts[3]);
	ctx.stroke();
	ctx.closePath();

	ctx.beginPath();
	ctx.moveTo(pts[n-2],pts[n-1]);
	ctx.quadraticCurveTo(cp[2*n-10],cp[2*n-9],pts[n-4],pts[n-3]);
	ctx.stroke();
	ctx.closePath();
    ctx.restore();
}

function newscatter(){
	$('#reg').show();
	$('#regshow').show();
	$('#gridlinesshow').show();
	$('#labelshow').show();
	$('#jittershow').show();
	$('#quadraticshow').show();
	$('#cubicshow').show();
	$('#expshow').show();
	$('#logshow').show();
	$('#powshow').show();
	$('#yxshow').show();
	$('#invertshow').show();
	$('#thicklinesshow').show();
	$('#xvar').show();
	$('#yvar').show();
	$('#zvar').show();
	$('#color').show();
	$('#colorname').show();
	$('#greyscaleshow').show();
	$('#sizediv').show();
	$('#removedpointsshow').show();
	$('#pointsizename').html('Point Size:');
	$('#transdiv').show();

	var canvas = document.getElementById('myCanvas');
	var ctx = canvas.getContext('2d');
	
	//set size
	var width = $('#width').val();
	var height = $('#height').val();

	ctx.canvas.width = width;
	ctx.canvas.height = height;

	ctx.fillStyle = "#ffffff";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	//graph title
	ctx.fillStyle = '#000000';
	fontsize=20*scalefactor;
	ctx.font = "bold "+fontsize+"px Roboto";
	ctx.textAlign="center";
	ctx.fillText($('#title').val(),width/2,30*scalefactor);
	
	//x-axis title
	ctx.fillStyle = '#000000';
	ctx.font = "bold "+15*scalefactor+"px Roboto";
	ctx.textAlign="center";
	ctx.fillText($('#xaxis').val(),width/2,height-10*scalefactor);
	
	//y-axis title
	x=20*scalefactor;
	y=height/2;
	ctx.save();
	ctx.fillStyle = '#000000';
	ctx.font = "bold "+15*scalefactor+"px Roboto";
	ctx.translate(x, y);
	ctx.rotate(-Math.PI/2);
	ctx.textAlign = "center";
	ctx.fillText($('#yaxis').val(), 0, 0);
	ctx.restore();
	
	//get points
	var xpoints = (dataforselector[$('#xvar option:selected').text()]).slice();
	var ypoints = (dataforselector[$('#yvar option:selected').text()]).slice();
	var zpoints = (dataforselector[$('#zvar option:selected').text()]).slice();

	//check for numeric value
	var points=[];
	var allpoints=[];
	var pointsremoved=[];
	var pointsforminmax=[];
	var pointsforminmaxy=[];
	countx=0;
	county=0;
	for (var index in xpoints){
		if($.isNumeric(xpoints[index])){countx++;}
		if($.isNumeric(ypoints[index])){county++;}
		if($.isNumeric(xpoints[index]) && $.isNumeric(ypoints[index])){
			points.push(index);
			allpoints.push(index);
			pointsforminmax.push(xpoints[index]);
			pointsforminmaxy.push(ypoints[index]);
		} else {
			pointsremoved.push(add(index,1));
		}
	}

	if(countx==0){
		return 'Error: You must select a numeric variable for variable 1';
	}

	if(county==0){
		return 'Error: You must select a numeric variable for variable 2';
	}

	if(pointsremoved.length!=0 && $('#removedpoints').is(":checked")){
		ctx.fillStyle = '#000000';
		ctx.font = 13*scalefactor+"px Roboto";
		ctx.textAlign="right";
		ctx.fillText("ID(s) of Points Removed: "+pointsremoved.join(", "),width-48*scalefactor,48*scalefactor);
	}

	if(points.length==0){
		return 'Error: You must select a numeric variable for variable 1';
	}

	var oypixel=height-60*scalefactor;
	var maxheight=height-120*scalefactor;
	var left=90*scalefactor;
	var right=width-60*scalefactor;
	var gtop=90*scalefactor;
	var bottom=height-60*scalefactor;

	xmin = Math.min.apply(null, pointsforminmax);
	xmax = Math.max.apply(null, pointsforminmax);
	ymin = Math.min.apply(null, pointsforminmaxy);
	ymax = Math.max.apply(null, pointsforminmaxy);
	if($.isNumeric($('#scatplotminx').val())){
		xmin=$('#scatplotminx').val();
	}
	if($.isNumeric($('#scatplotmaxx').val())){
		xmax=$('#scatplotmaxx').val();
	}
	if($.isNumeric($('#scatplotminy').val())){
		ymin=$('#scatplotminy').val();
	}
	if($.isNumeric($('#scatplotmaxy').val())){
		ymax=$('#scatplotmaxy').val();
	}
	var minmaxstep = axisminmaxstep(xmin,xmax);
	var minxtick=minmaxstep[0];
	var maxxtick=minmaxstep[1];
	var xstep=minmaxstep[2];
	var minmaxstep = axisminmaxstep(ymin,ymax);
	var minytick=minmaxstep[0];
	var maxytick=minmaxstep[1];
	var ystep=minmaxstep[2];

	var alpha = 1-$('#trans').val()/100;
	var colors = makecolors(alpha,ctx);
	
	if(zpoints.length>0){
		zdifferentgroups = split(points,zpoints,4,3);
		if(typeof zdifferentgroups === 'object'){
			zgroups = Object.keys(zdifferentgroups);
			zgroups.sort(sortorder);
			thisleft=60*scalefactor;
			eachwidth=(width-40*scalefactor)/zgroups.length;
			for (index in zgroups){
				group = zgroups[index];
				points = zdifferentgroups[group];

				thisright = add(thisleft,eachwidth);

				ctx.fillStyle = '#000000';
				ctx.font = "bold "+15*scalefactor+"px Roboto";
				ctx.textAlign="center";
				ctx.fillText(group,add(thisleft,thisright-50*scalefactor)/2,oypixel-maxheight);
				
				plotscatter(ctx,points,xpoints,ypoints,minxtick,maxxtick,xstep,minytick,maxytick,ystep,gtop,bottom,add(thisleft,30*scalefactor),thisright-50*scalefactor,colors);

				thisleft = add(thisleft,eachwidth);
			}
		} else {
			return zdifferentgroups;
		}
	} else {
		plotscatter(ctx,points,xpoints,ypoints,minxtick,maxxtick,xstep,minytick,maxytick,ystep,gtop,bottom,left,right,colors);
	}
	
	labelgraph(ctx,width,height);
	
	if($('#invert').is(":checked")){
		invert(ctx)
	}

	var dataURL = canvas.toDataURL();
	return dataURL;
}

function plotscatter(ctx,indexes,xpoints,ypoints,minxtick,maxxtick,xstep,minytick,maxytick,ystep,gtop,bottom,left,right,colors){
	horaxis(ctx,left,right,add(bottom,10*scalefactor),minxtick,maxxtick,xstep);
	vertaxis (ctx,gtop,bottom,left-10*scalefactor,minytick,maxytick,ystep);
	ctx.lineWidth = 2*scalefactor;
	if($('#thicklines').is(":checked")){
		ctx.lineWidth = 5*scalefactor;
	}
	if($('#labels').is(":checked")){var labels="yes";} else {var labels = "no";}
	var rad = $('#size').val()/2*scalefactor;
	num = 0;
	pointstofit = [];
	xcurvefit="";
	ycurvefit="";
	for (var index in indexes){
		var index = indexes[index];
		var xpoint = xpoints[index];
		var ypoint = ypoints[index];
		if(xpoint==0){xpoint = xpoint + 0.0000000000001;}
		if(ypoint==0){ypoint = ypoint + 0.0000000000001;}
		pointstofit.push([parseFloat(xpoint),parseFloat(ypoint)]);
		xcurvefit+=xpoint+",";
		ycurvefit+=ypoint+",";
		var xpixel = convertvaltopixel(xpoint,minxtick,maxxtick,left,right);
		var ypixel = convertvaltopixel(ypoint,minytick,maxytick,bottom,gtop);
		if($('#jitter').is(":checked") && $('#jittershow').is(':visible')){
			xpixel = add(xpixel,randint(-3*scalefactor,3*scalefactor));
			ypixel = add(ypixel,randint(-3*scalefactor,3*scalefactor));
		}
		ctx.beginPath();
		ctx.strokeStyle = colors[index];
		ctx.arc(xpixel,ypixel,rad,0,2*Math.PI);
		ctx.stroke();
		$('#graphmap').append('<area shape="circle" coords="'+(xpixel/scalefactor)+','+(ypixel/scalefactor)+','+rad+'" alt="'+parseInt(add(index,1))+'" desc="Point ID: '+parseInt(add(index,1))+'<br>'+$('#xaxis').val()+': '+xpoint+'<br>'+$('#yaxis').val()+': '+ypoint+'">');
		if(labels == "yes"){
			ctx.fillStyle = 'rgba(0,0,255,1)';
			ctx.font = 10*scalefactor+"px Roboto";
			ctx.textAlign="left";
			ctx.fillText(parseInt(add(index,1)),add(add(xpixel,rad*scalefactor),2*scalefactor),add(ypixel,4*scalefactor));
		}
		num++;
	}

	equationtop = gtop;
	ctx.textAlign="left";
	ctx.fillStyle = '#000';
	ctx.font = 13*scalefactor+"px Roboto";
	ctx.lineWidth = 1*scalefactor;
	if($('#thicklines').is(":checked")){
		ctx.lineWidth = 3*scalefactor;
	}
	
	var equations = [];
	
	if($('#regression').is(":checked") && $('#regshow').is(':visible')){
		ctx.fillStyle='#f00';
		ctx.strokeStyle='#f00';
		
		res = regression.linear(pointstofit,{
		  precision: 7,
		});
		
		equations['Linear'] = {};
		equations['Linear']['Equation'] = res.string;
		equations['Linear']['r2'] = res.r2;
		
		c = res.equation[1].toPrecision(5);
		m = res.equation[0].toPrecision(5);
		if(m<0){
			r = -Math.sqrt(res.r2).toPrecision(5);
		} else {
			r = Math.sqrt(res.r2).toPrecision(5);
		}
		
		x = minxtick;
		lasty=0;
		step = (maxxtick - minxtick)/100;
		while(x<maxxtick){
			y = add(m * x,c);
			xpixel = convertvaltopixel(x,minxtick,maxxtick,left,right);
			ypixel = convertvaltopixel(y,minytick,maxytick,bottom,gtop);
			if(x>minxtick && y>=minytick && y<=maxytick && lasty>=minytick && lasty<=maxytick){
				line(ctx,lastxpixel,lastypixel,xpixel,ypixel);
			}
			lastxpixel=xpixel;
			lastypixel=ypixel;
			lasty = y;
			x = add(x,step);
		}
		if(parseFloat(c)<0){
			c = " - " + -1*c;
		} else {
			c = " + " + c;
		}
		ctx.fillText($('#yaxis').val()+" = "+m+" * "+$('#xaxis').val()+c,left, equationtop);
		equationtop = add(equationtop,15*scalefactor);
		ctx.fillText("r = "+r,left, equationtop);
		equationtop = add(equationtop,15*scalefactor);
	}
	
	if($('#quadratic').is(":checked") && $('#quadraticshow').is(':visible')){
		ctx.fillStyle='#00f';
		ctx.strokeStyle='#00f';
		
		res = regression.polynomial(pointstofit,{
		  order: 2,
		  precision: 7,
		});
		
		equations['Quadratic'] = {};
		equations['Quadratic']['Equation'] = res.string;
		equations['Quadratic']['r2'] = res.r2;
		
		a = res.equation[0].toPrecision(5);
		b = res.equation[1].toPrecision(5);
		c = res.equation[2].toPrecision(5);
		
		x = minxtick;
		lasty=0;
		step = (maxxtick - minxtick)/100;
		while(x<maxxtick){
			y = add(add(a * Math.pow(x,2),b * x),c);
			xpixel = convertvaltopixel(x,minxtick,maxxtick,left,right);
			ypixel = convertvaltopixel(y,minytick,maxytick,bottom,gtop);
			if(x>minxtick && y>=minytick && y<=maxytick && lasty>=minytick && lasty<=maxytick){
				line(ctx,lastxpixel,lastypixel,xpixel,ypixel);
			}
			lastxpixel=xpixel;
			lastypixel=ypixel;
			lasty = y;
			x = add(x,step);
		}
		if(parseFloat(b)<0){
			b = " - " + -1*b;
		} else {
			b = " + " + b;
		}
		if(parseFloat(c)<0){
			c = " - " + -1*c;
		} else {
			c = " + " + c;
		}
		ctx.fillText($('#yaxis').val()+" = "+a+" * "+$('#xaxis').val()+"^2"+b+" * "+$('#xaxis').val()+c,left, equationtop);
		equationtop = add(equationtop,15*scalefactor);
	}
	
	if($('#cubic').is(":checked") && $('#cubicshow').is(':visible')){
		ctx.fillStyle='#0f0';
		ctx.strokeStyle='#0f0';
		
		res = regression.polynomial(pointstofit,{
		  order: 3,
		  precision: 10,
		});
		
		equations['Cubic'] = {};
		equations['Cubic']['Equation'] = res.string;
		equations['Cubic']['r2'] = res.r2;
		
		a = res.equation[0];
		b = res.equation[1];
		c = res.equation[2];
		d = res.equation[3];
		
		x = minxtick;
		lasty=0;
		step = (maxxtick - minxtick)/100;
		while(x<maxxtick){
			y = add(add(add(a * Math.pow(x,3),b * Math.pow(x,2)),c * x),d);
			xpixel = convertvaltopixel(x,minxtick,maxxtick,left,right);
			ypixel = convertvaltopixel(y,minytick,maxytick,bottom,gtop);
			if(x>minxtick && y>=minytick && y<=maxytick && lasty>=minytick && lasty<=maxytick){
				line(ctx,lastxpixel,lastypixel,xpixel,ypixel);
			}
			lastxpixel=xpixel;
			lastypixel=ypixel;
			lasty = y;
			x = add(x,step);
		}
		if(parseFloat(b)<0){
			b = " - " + -1*b;
		} else {
			b = " + " + b;
		}
		if(parseFloat(c)<0){
			c = " - " + -1*c;
		} else {
			c = " + " + c;
		}
		if(parseFloat(d)<0){
			d = " - " + -1*d;
		} else {
			d = " + " + d;
		}
		ctx.fillText($('#yaxis').val()+" = "+a+" * "+$('#xaxis').val()+"^3"+b+" * "+$('#xaxis').val()+"^2"+c+" * "+$('#xaxis').val()+d,left, equationtop);
		equationtop = add(equationtop,15*scalefactor);
	}
	
	if($('#exp').is(":checked") && $('#expshow').is(':visible')){
		ctx.fillStyle='#952BFF';
		ctx.strokeStyle='#952BFF';
		
		res = regression.exponential(pointstofit,{
		  precision: 7,
		});
		
		equations['Exponential'] = {};
		equations['Exponential']['Equation'] = res.string;
		equations['Exponential']['r2'] = res.r2;
		
		a = res.equation[0].toPrecision(5);
		b = res.equation[1].toPrecision(5);
		
		x = minxtick;
		lasty=0;
		step = (maxxtick - minxtick)/100;
		while(x<maxxtick){
			y = a * Math.exp(b*x);
			xpixel = convertvaltopixel(x,minxtick,maxxtick,left,right);
			ypixel = convertvaltopixel(y,minytick,maxytick,bottom,gtop);
			if(x>minxtick && y>=minytick && y<=maxytick && lasty>=minytick && lasty<=maxytick){
				line(ctx,lastxpixel,lastypixel,xpixel,ypixel);
			}
			lastxpixel=xpixel;
			lastypixel=ypixel;
			lasty = y;
			x = add(x,step);
		}
		ctx.fillText($('#yaxis').val()+" = "+a+" * exp("+b+" * "+$('#xaxis').val()+")",left, equationtop);
		equationtop = add(equationtop,15*scalefactor);
	}
	
	if($('#log').is(":checked") && $('#logshow').is(':visible')){
		ctx.fillStyle='#FF972E';
		ctx.strokeStyle='#FF972E';
		
		res = regression.logarithmic(pointstofit,{
		  precision: 7,
		});
		
		equations['Logarithmic'] = {};
		equations['Logarithmic']['Equation'] = res.string;
		equations['Logarithmic']['r2'] = res.r2;
		
		a = res.equation[1].toPrecision(5);
		b = res.equation[0].toPrecision(5);
		
		x = minxtick;
		lasty=0;
		step = (maxxtick - minxtick)/100;
		while(x<maxxtick){
			y = add(a * Math.log(x),b);
			xpixel = convertvaltopixel(x,minxtick,maxxtick,left,right);
			ypixel = convertvaltopixel(y,minytick,maxytick,bottom,gtop);
			if(x>minxtick && y>=minytick && y<=maxytick && lasty>=minytick && lasty<=maxytick){
				line(ctx,lastxpixel,lastypixel,xpixel,ypixel);
			}
			lastxpixel=xpixel;
			lastypixel=ypixel;
			lasty = y;
			x = add(x,step);
		}
		console.log(b);
		if(parseFloat(b)<0){
			b = " - " + -1*b;
		} else {
			b = " + " + b;
		}
		ctx.fillText($('#yaxis').val()+" = "+a+" * ln("+$('#xaxis').val()+")"+b,left, equationtop);
		equationtop = add(equationtop,15*scalefactor);
	}
	
	if($('#pow').is(":checked") && $('#powshow').is(':visible')){
		ctx.fillStyle='#3ED2D2';
		ctx.strokeStyle='#3ED2D2';
		
		res = regression.power(pointstofit,{
		  precision: 7,
		});
		
		equations['Power'] = {};
		equations['Power']['Equation'] = res.string;
		equations['Power']['r2'] = res.r2;
		
		a = res.equation[0].toPrecision(5);
		b = res.equation[1].toPrecision(5);
		
		x = minxtick;
		lasty=0;
		step = (maxxtick - minxtick)/100;
		while(x<maxxtick){
			y = a * Math.pow(x,b);
			xpixel = convertvaltopixel(x,minxtick,maxxtick,left,right);
			ypixel = convertvaltopixel(y,minytick,maxytick,bottom,gtop);
			if(x>minxtick && y>=minytick && y<=maxytick && lasty>=minytick && lasty<=maxytick){
				line(ctx,lastxpixel,lastypixel,xpixel,ypixel);
			}
			lastxpixel=xpixel;
			lastypixel=ypixel;
			lasty = y;
			x = add(x,step);
		}
		ctx.fillText($('#yaxis').val()+" = "+a+" * "+$('#xaxis').val()+" ^ "+b,left, equationtop);
		equationtop = add(equationtop,15*scalefactor);
	}
	
	if($('#yx').is(":checked") && $('#yxshow').is(':visible')){
		ctx.fillStyle = '#000';
		ctx.strokeStyle='#000';
		ctx.setLineDash([5, 5]);
		min = minxtick;
		if(min<minytick){min=minytick;}
		max = maxxtick;
		if(max>maxytick){max=maxytick;}
		if(min<max){
			var mnx = convertvaltopixel(min,minxtick,maxxtick,left,right);
			var mny = convertvaltopixel(min,minytick,maxytick,bottom,gtop);
			var mxx = convertvaltopixel(max,minxtick,maxxtick,left,right);
			var mxy = convertvaltopixel(max,minytick,maxytick,bottom,gtop);
			line(ctx,mnx,mny,mxx,mxy);
		}
		ctx.fillText("- - - y = x",left, equationtop);
		equationtop = add(equationtop,15*scalefactor);
		ctx.setLineDash([]);
	}
	
	if($('#regression, #cubic, #quadratic, #yx, #exp, #pow, #log').is(":checked") && $('#regshow, #cubicshow, #quadraticshow, #yxshow, #expshow, #powshow, #logshow').is(':visible')){
		ctx.fillText("n = "+num,left, equationtop);
	}
	
	if($('#type').val()=='newresiduals'){
		ctx.fillStyle = '#000';
		ctx.strokeStyle = '#000';
		ctx.setLineDash([5, 5]);
		var zero = convertvaltopixel(0,minytick,maxytick,bottom,gtop);
		line(ctx,left,zero,right,zero);
		ctx.setLineDash([]);
	}
	
	if($('#weightedaverage').is(":checked") && $('#weightedaverageshow').is(':visible')){
		ctx.fillStyle = '#00f';
		ctx.strokeStyle = '#00f';
		xpointsforminmax = [];
		for (var index in indexes){
			var index = indexes[index];
			var pointx = xpoints[index];
			var pointy = ypoints[index];
			xpointsforminmax.push(pointx);
		}
		xmin = Math.min.apply(null, xpointsforminmax);
		xmax = Math.max.apply(null, xpointsforminmax);
		xpoint = xmin;
		range = xmax-xmin;
		step = range/200;
		curve = [];
		while(xpoint<xmax){
			total=0;
			totalweight=0;
			for (var index in indexes){
				var index = indexes[index];
				var pointx = xpoints[index];
				var pointy = ypoints[index];
				weight = Math.pow((1-Math.abs(xpoint-pointx)/range),10);
				total+=pointy*weight;
				totalweight+=weight;
			}
			xpoint+=step;
			curve.push([xpoint,total/totalweight])
		}
		lasty=0;
		lastxpixel=0;
		for (var point in curve){
			x = curve[point][0];
			y = curve[point][1];
			xpixel = convertvaltopixel(x,minxtick,maxxtick,left,right);
			ypixel = convertvaltopixel(y,minytick,maxytick,bottom,gtop);
			if(x>minxtick && y>=minytick && y<=maxytick && lasty>=minytick && lasty<=maxytick & lastxpixel>0){
				line(ctx,lastxpixel,lastypixel,xpixel,ypixel);
			}
			lastxpixel=xpixel;
			lastypixel=ypixel;
			lasty = y;
		}
	}
	console.table(equations);

}

function selectText(element) {
  if (/INPUT|TEXTAREA/i.test(element.tagName)) {
    element.focus();
    if (element.setSelectionRange) {
      element.setSelectionRange(0, element.value.length);
    } else {
      element.select();
    }
    return;
  }
  
  if (window.getSelection) { // All browsers, except IE <=8
    window.getSelection().selectAllChildren(element);
  } else if (document.body.createTextRange) { // IE <=8
    var range = document.body.createTextRange();
    range.moveToElementText(element);
    range.select();
  }
}

function newtimeseriesseasonaleffects(){
	$('#labelshow').show();
	$('#addmultshow').show();
	$('#xvar').show();
	$('#yvar').show();

	var canvas = document.getElementById('myCanvas');
	var ctx = canvas.getContext('2d');
	
	//set size
	var width = $('#width').val();
	var height = $('#height').val();

	ctx.canvas.width = width;
	ctx.canvas.height = height;

	ctx.fillStyle = "#ffffff";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	//graph title
	ctx.fillStyle = '#000000';
	fontsize=20*scalefactor;
	ctx.font = "bold "+fontsize+"px Roboto";
	ctx.textAlign="center";
	ctx.fillText($('#title').val(),width/2,30*scalefactor);
	
	//x-axis title
	ctx.fillStyle = '#000000';
	fontsize = 15*scalefactor;
	ctx.font = "bold "+fontsize+"px Roboto";
	ctx.textAlign="center";
	ctx.fillText($('#xaxis').val(),width/4,height-10*scalefactor);
	
	ctx.font = "bold "+fontsize+"px Roboto";
	ctx.textAlign="center";
	ctx.fillText($('#xaxis').val(),width/4*3,height-10*scalefactor);
	
	var x, y;
	x=12*scalefactor;
	y=height/2;
	ctx.save();
	ctx.fillStyle = '#000000';
	fontsize = 15*scalefactor;
	ctx.font = "bold "+fontsize+"px Roboto";
	ctx.translate(x, y);
	ctx.rotate(-Math.PI/2);
	ctx.textAlign = "center";
	ctx.fillText($('#yaxis').val(), 0, 0);
	ctx.restore();
	
	x=12+width/2*scalefactor;
	y=height/2;
	ctx.save();
	ctx.fillStyle = '#000000';
	fontsize = 15*scalefactor;
	ctx.font = "bold "+fontsize+"px Roboto";
	ctx.translate(x, y);
	ctx.rotate(-Math.PI/2);
	ctx.textAlign = "center";
	ctx.fillText("Seasonal Effect", 0, 0);
	ctx.restore();

	
	//get points
	var xpoints = (dataforselector[$('#xvar option:selected').text()]).slice();
	var ypoints = (dataforselector[$('#yvar option:selected').text()]).slice();
	
	seasons = checkforts(xpoints);

	if(seasons.substr(0,5)=="Error"){
		return seasons;
	}

	if(ypoints.length==0){
		return 'Error: You must select a numeric variable for variable 2';
	}
	
	tsxpoints = maketsxpoints(xpoints,seasons);
	
	// order the time series from smallest to largest
	//1) combine the arrays:
	var list = [];
	for (var j in tsxpoints)
		list.push({'tsxpoint': tsxpoints[j], 'ypoint': ypoints[j]});

	//2) sort:
	list.sort(function(a, b) {
		return ((a.tsxpoint < b.tsxpoint) ? -1 : ((a.tsxpoint == b.tsxpoint) ? 0 : 1));
	});

	if($.isNumeric(list[0].tsxpoint)){
		list.sort(function(a, b) {
			return (a.tsxpoint - b.tsxpoint);
		});
	}

	//3) separate them back out:
	for (var k = 0; k < list.length; k++) {
		tsxpoints[k] = list[k].tsxpoint;
		ypoints[k] = list[k].ypoint;
	}
	
	ctx.lineWidth = 1*scalefactor;
	ctx.strokeStyle = 'rgba(0,0,0,1)';
	ctx.rect(50*scalefactor,50*scalefactor,width/2-100*scalefactor,height-100*scalefactor);
	ctx.stroke();
	
	ctx.strokeStyle = 'rgba(0,0,0,1)';
	ctx.rect(width/2+50*scalefactor,50*scalefactor,width/2-100*scalefactor,height-100*scalefactor);
	ctx.stroke();
	
	left = 60*scalefactor;
	right = width/2-60*scalefactor;
	gtop = 60*scalefactor;
	gbottom = height-60*scalefactor;

	horaxis(ctx,left,right,add(gbottom,10*scalefactor),1,seasons,1);
	
	stlresponse=stl(tsxpoints,ypoints,seasons);
	if(typeof stlresponse == 'string'){return stlresponse;}
	trend = stlresponse[0];
	fitted = stlresponse[1];
	s = stlresponse[2];
	r = stlresponse[3];
	
	var pointsforminmax=[];
	var pointsfortminmax=[];
	for (var index in ypoints){
		pointsforminmax.push(ypoints[index]);
		pointsfortminmax.push(parseFloat(tsxpoints[index]));
	}
	
	ymin = Math.min.apply(null, pointsforminmax);
	ymax = Math.max.apply(null, pointsforminmax);
	
	if($.isNumeric($('#timeseriesminy').val())){
		ymin=$('#timeseriesminy').val();
	}
	if($.isNumeric($('#timeseriesmaxy').val())){
		ymax=$('#timeseriesmaxy').val();
	}
	
	var minmaxstep = axisminmaxstep(ymin,ymax);
	var minytick=minmaxstep[0];
	var maxytick=minmaxstep[1];
	var ystep=minmaxstep[2];
	
	vertaxis(ctx,gtop,gbottom,left-10*scalefactor,minytick,maxytick,ystep,right+10*scalefactor);
	
	if($('#addmult option:selected').text()=="Multiplicative"){var multiplicative="yes";} else {var multiplicative = "no";}
	
	seasonleft = width/2+60*scalefactor;
	seasonright = width-60*scalefactor;

	horaxis(ctx,seasonleft,seasonright,add(gbottom,10*scalefactor),1,seasons,1);
	
	if(multiplicative=="yes"){
		smult=[];
		pointsforminmax=[];
		for (var index in fitted){
			smult[index]=fitted[index]/trend[index];
			pointsforminmax.push(smult[index]);
		}
		var smin = Math.min.apply(null, pointsforminmax);
		var smax = Math.max.apply(null, pointsforminmax);
		var minmaxstep = axisminmaxstep(smin,smax);
		var minstick=minmaxstep[0];
		var maxstick=minmaxstep[1];
		var sstep=minmaxstep[2];
		vertaxis(ctx,gtop,gbottom,seasonleft-10*scalefactor,minstick,maxstick,sstep,seasonright+10*scalefactor);
		//0 Line
		ypixel = convertvaltopixel(1,maxstick,minstick,gtop,gbottom);
		ctx.beginPath();
		ctx.setLineDash([5, 5]);
		ctx.moveTo(seasonleft-10*scalefactor, ypixel);
		ctx.lineTo(seasonright+10*scalefactor, ypixel);
		ctx.stroke();
		ctx.setLineDash([]);
	} else {
		sadd=[];
		pointsforminmax=[];
		for (var index in fitted){
			sadd[index]=fitted[index]-trend[index];
			pointsforminmax.push(sadd[index]);
		}
		var smin = Math.min.apply(null, pointsforminmax);
		var smax = Math.max.apply(null, pointsforminmax);
		shiftforseasonala=Math.ceil((maxytick+minytick)/2/ystep)*ystep;
		shiftforseasonalb=Math.floor((maxytick-smax)/ystep)*ystep;
		shiftforseasonal=Math.min(shiftforseasonala,shiftforseasonalb);
		vertaxis(ctx,gtop,gbottom,seasonleft-10*scalefactor,minytick-shiftforseasonal,maxytick-shiftforseasonal,ystep,seasonright+10*scalefactor);
		//0 Line
		ypixel = convertvaltopixel(0,maxytick-shiftforseasonal,minytick-shiftforseasonal,gtop,gbottom);
		ctx.beginPath();
		ctx.setLineDash([5, 5]);
		ctx.moveTo(seasonleft-10*scalefactor, ypixel);
		ctx.lineTo(seasonright+10*scalefactor, ypixel);
		ctx.stroke();
		ctx.setLineDash([]);
	} 
	
	if($('#labels').is(":checked")){var labels="yes";} else {var labels = "no";}
	ytrendpts=[];
	firstyear = Math.floor(Math.min.apply(null,pointsfortminmax));
	lastyear = Math.floor(Math.max.apply(null,pointsfortminmax));
	for (index in tsxpoints){
		point=parseFloat(tsxpoints[index]);
		year = Math.floor(point);
		n = (year-firstyear)/(lastyear-firstyear);
		color=ColorHSLaToRGBa(n*0.8,0.75,0.6,0.8);
		ctx.strokeStyle=color;
		ctx.fillStyle=color;
		season=Math.round((point-year)*seasons+1);
		xpixel=convertvaltopixel(season,1,seasons,left,right);
		ypixel=convertvaltopixel(ypoints[index],maxytick,minytick,gtop,gbottom);
		$('#graphmap').append('<area shape="circle" coords="'+(xpixel/scalefactor)+','+(ypixel/scalefactor)+','+3+'" alt="'+parseInt(add(index,1))+'" desc="Point ID: '+parseInt(add(index,1))+'<br>'+xpoints[index]+'<br>'+$("#yvar option:selected").text()+': '+parseFloat(ypoints[index]).toPrecision(5)+'">');
		if(season != 1 && index!=0){
			line(ctx,xpixel,ypixel,lastxpixel,lastypixel);
		} 
		if(season==1 || season==seasons){
			fontsize = 10*scalefactor;
			ctx.font = fontsize+"px Roboto";
			ctx.textAlign="left";
			ctx.fillText(year,add(xpixel,3*scalefactor),add(ypixel,4*scalefactor));
		}
		if(multiplicative=="yes"){
			seasonypixel=convertvaltopixel(smult[index],maxstick,minstick,gtop,gbottom);
		} else {
			seasonypixel=convertvaltopixel(s[index],maxytick-shiftforseasonal,minytick-shiftforseasonal,gtop,gbottom);
		}
		seasonxpixel=convertvaltopixel(season,1,seasons,seasonleft,seasonright);
		ctx.strokeStyle='#000000';
		if(season!=1 && index!=0){
			if(parseFloat(index)<=parseFloat(seasons)){
				line(ctx,seasonxpixel,seasonypixel,lastseasonxpixel,lastseasonypixel);
			}
		}
		ctx.beginPath();
		ctx.arc(seasonxpixel,seasonypixel,2,0,2*Math.PI);
		ctx.stroke();
		$('#graphmap').append('<area shape="circle" coords="'+(seasonxpixel/scalefactor)+','+(seasonypixel/scalefactor)+','+5+'" desc="Season: '+season+'<br>'+$("#yvar option:selected").text()+' Seasonal Value: '+s[index].toPrecision(5)+'">');
		lastseasonxpixel=seasonxpixel;
		lastseasonypixel=seasonypixel;

		if(labels == "yes"){
			ctx.fillStyle = 'rgba(0,0,255,1)';
			fontsize = 10*scalefactor;
			ctx.font = fontsize+"px Roboto";
			ctx.textAlign="left";
			ctx.fillText(parseInt(add(index,1)),add(add(xpixel,2),2),add(ypixel,4));
		}
		lastxpixel = xpixel;
		lastypixel = ypixel;
	}
	
	
	labelgraph(ctx,width,height);
	
	if($('#invert').is(":checked")){
		invert(ctx)
	}

	var dataURL = canvas.toDataURL();
	return dataURL;
}

function newtimeseriessforecasts(){
	$('#regshow').show();
	$('#labelshow').show();
	$('#addmultshow').show();
	$('#xvar').show();
	$('#yvar').show();
	$('#for').show();
	$('#invertshow').show();

	var canvas = document.getElementById('myCanvas');
	var ctx = canvas.getContext('2d');
	
	//set size
	var width = $('#width').val();
	var height = $('#height').val();

	ctx.canvas.width = width;
	ctx.canvas.height = height;

	ctx.fillStyle = "#ffffff";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	//graph title
	ctx.fillStyle = '#000000';
	fontsize=20*scalefactor;
	ctx.font = "bold "+fontsize+"px Roboto";
	ctx.textAlign="center";
	ctx.fillText($('#title').val(),width/2,30*scalefactor);
	
	//x-axis title
	ctx.fillStyle = '#000000';
	fontsize = 15*scalefactor;
	ctx.font = "bold "+fontsize+"px Roboto";
	ctx.textAlign="center";
	ctx.fillText($('#xaxis').val(),width/2,height-10*scalefactor);
	
	var x, y;
	x=12*scalefactor;
	y=height/2;
	ctx.save();
	ctx.fillStyle = '#000000';
	fontsize = 15*scalefactor;
	ctx.font = "bold "+fontsize+"px Roboto";
	ctx.translate(x, y);
	ctx.rotate(-Math.PI/2);
	ctx.textAlign = "center";
	ctx.fillText($('#yaxis').val(), 0, 0);
	ctx.restore();
	
	//get points
	var xpoints = (dataforselector[$('#xvar option:selected').text()]).slice();
	var ypoints = (dataforselector[$('#yvar option:selected').text()]).slice();
	
	seasons = checkforts(xpoints);

	if(seasons.substr(0,5)=="Error"){
		return seasons;
	}

	if(ypoints.length==0){
		return 'Error: You must select a numeric variable for variable 2';
	}
	
	tsxpoints = maketsxpoints(xpoints,seasons);
	
	if($('#addmult option:selected').text()=="Multiplicative"){var multiplicative="yes";} else {var multiplicative = "no";}
	
	pointsforminmax = [];
	for(index in ypoints){
		pointsforminmax.push(ypoints[index]);
		if(multiplicative=="yes"){
			if(ypoints[index]==0){ypoints[index]=0.0000001;}
			ypoints[index]=Math.log(ypoints[index]);
		}
	}
	
	// order the time series from smallest to largest
	//1) combine the arrays:
	var list = [];
	for (var j in tsxpoints)
		list.push({'tsxpoint': tsxpoints[j], 'ypoint': ypoints[j]});

	//2) sort:
	list.sort(function(a, b) {
		return ((a.tsxpoint < b.tsxpoint) ? -1 : ((a.tsxpoint == b.tsxpoint) ? 0 : 1));
	});

	if($.isNumeric(list[0].tsxpoint)){
		list.sort(function(a, b) {
			return (a.tsxpoint - b.tsxpoint);
		});
	}
	
	pointsforxminmax = [];
	//3) separate them back out:
	for (var k = 0; k < list.length; k++) {
		tsxpoints[k] = list[k].tsxpoint;
		ypoints[k] = list[k].ypoint;
		pointsforxminmax.push(tsxpoints[k]);
	}
	
	// This is where the calculations need to happen.
	
	[alphamin,alphamax,betamin,betamax,gammamin,gammamax,alpha,beta,gamma]=hwoptim(ypoints,seasons,0,1,0,1,0,1);
	[alphamin,alphamax,betamin,betamax,gammamin,gammamax,alpha,beta,gamma]=hwoptim(ypoints,seasons,alphamin,alphamax,betamin,betamax,gammamin,gammamax);
	[alphamin,alphamax,betamin,betamax,gammamin,gammamax,alpha,beta,gamma]=hwoptim(ypoints,seasons,alphamin,alphamax,betamin,betamax,gammamin,gammamax);
	[a,b,s] = hwinit(ypoints,seasons);
	
	error=0;
	fitted=[];
	for(i in ypoints){
		ypoint = ypoints[i];
		a[i]=add(alpha*(ypoint-s[i-seasons]),(1-alpha)*add(a[i-1],b[i-1]));		
		b[i]=add(beta*(a[i]-a[i-1]),(1-beta)*b[i-1]);
		s[i]=add(gamma*(ypoint-a[i]),(1-gamma)*s[i-seasons]);
		fitted[i]=add(add(a[i-1],s[i-seasons]),b[i-1]);
		e = ypoint-add(add(a[i-1],b[i-1]),s[i-seasons]);
		error+=e*e;
		i++;
	}
	error=Math.sqrt(error/ypoints.length);
	
	trend=[];
	trendmin=[];
	trendmax=[];
	forecasts=[];
	forecastsmin=[];
	forecastsmax=[];
	trend[-1]=a[i-1];
	trendmin[-1]=a[i-1];
	trendmax[-1]=a[i-1];
	c=0;
	x=Math.max.apply(null,pointsforxminmax);
	while(c<seasons*2){
		season=add(i,c-seasons);
		x=add(x,1/seasons);
		while(season>i-1){season=season-seasons;}
		t=add(trend[c-1],b[i-1]);
		trend[c]=t;
		forecasts[c]=[x,add(t,s[season])];
		c++;
	}
	
	bsforecasts=[];
	c=0;
	while(c<seasons*2){
		bsforecasts[c]=[];
		c++;
	}

	z=0;
	while(z<1000){
		bstrend=[];
		bstrend[-1]=a[i-1];
		c=0;
		while(c<seasons*2){
			season=i+c-seasons;
			while(season>i-1){season=season-seasons;}
			t=add(add(bstrend[c-1],b[i-1]),purebell(error));
			bstrend[c]=t;
			bsforecasts[c].push(add(t,s[season]));
			c++;
		}
		z++;
	}
	
	x=Math.max.apply(null,pointsforxminmax);
	c=0;
	while(c<seasons*2){
		x=x+1/seasons;
		bsforecasts[c].sort(function(a, b){return a-b});
		forecastsmin[c]=bsforecasts[c][25];
		forecastsmax[c]=bsforecasts[c][975];
		c++;
	}
	
	if(multiplicative=="yes"){
		for(index in forecasts){
			forecasts[index][1]=Math.exp(forecasts[index][1]);
			forecastsmin[index]=Math.exp(forecastsmin[index]);
			forecastsmax[index]=Math.exp(forecastsmax[index]);
		}
		for(index in ypoints){
			fitted[index]=Math.exp(fitted[index]);
			ypoints[index]=Math.exp(ypoints[index]);
		}
	}
	
	for(index in forecasts){
		pointsforminmax.push(forecasts[index][1]);
		pointsforxminmax.push(forecasts[index][0]);
		pointsforminmax.push(forecastsmin[index]);
		pointsforminmax.push(forecastsmax[index]);
	}
	
	
	// end the calculations
	
	// start thinking about graphing or split into table display.
	
	xmin = Math.min.apply(null, pointsforxminmax);
	xmax = Math.max.apply(null, pointsforxminmax);
	var minmaxstep = axisminmaxstep(xmin,xmax);
	var minxtick=minmaxstep[0];
	var maxxtick=minmaxstep[1];
	var xstep=minmaxstep[2];
	
	ymin = Math.min.apply(null, pointsforminmax);
	ymax = Math.max.apply(null, pointsforminmax);
	
	if($.isNumeric($('#timeseriesminy').val())){
		ymin=$('#timeseriesminy').val();
	}
	if($.isNumeric($('#timeseriesmaxy').val())){
		ymax=$('#timeseriesmaxy').val();
	}
	
	var minmaxstep = axisminmaxstep(ymin,ymax);
	var minytick=minmaxstep[0];
	var maxytick=minmaxstep[1];
	var ystep=minmaxstep[2];
	
	ctx.lineWidth = 1*scalefactor;
	ctx.strokeStyle = 'rgba(0,0,0,1)';
	ctx.rect(50*scalefactor,50*scalefactor,width-100*scalefactor,height-100*scalefactor);
	ctx.stroke();
	
	left = 60*scalefactor;
	right = width-60*scalefactor;
	gtop = 60*scalefactor;
	gbottom = height-60*scalefactor;

	horaxis(ctx,left,right,add(gbottom,10*scalefactor),minxtick,maxxtick,xstep);

	vertaxis(ctx,gtop,gbottom,left-10*scalefactor,minytick,maxytick,ystep,right+10*scalefactor);	
	
	if($('#labels').is(":checked")){var labels="yes";} else {var labels = "no";}
	
	if($('#regression').is(":checked")){
		toreturn = "Error:";
		toreturn+="<style>"+
"				#forecastoutput {"+
"					position:absolute;"+
"					top:0px;"+
"					left:0px;"+
"					width:"+(width-20)+"px;"+
"					height:"+(height-20)+"px;"+
"					overflow-y:scroll;"+
"					padding:10px;"+
"					background-color:#fff;"+
"				}"+
"				#forecastoutput table {"+
"					border-collapse:collapse;"+
"				}"+
"				#forecastoutput table td, #forecastoutput table th {"+
"					border:1px solid #000;"+
"					padding-left:4px;"+
"					padding-right:4px;"+
"					width:80px;"+
"				}"+
"				#forecastoutput *.minmax {"+
"					color:#bbb;"+
"				}"+
"			</style>"+
"			<div id=forecastoutput>"+
"			<table><tr><th>Time<th>Min<th>Prediction<th>Max";
		c=0;
		x = Math.max.apply(null,tsxpoints);
		while(c<seasons*2){
			x=forecasts[c][0];
			min = parseFloat(forecastsmin[c].toPrecision(5));
			pred = parseFloat(forecasts[c][1].toPrecision(5));
			max = parseFloat(forecastsmax[c].toPrecision(5));
			year = Math.floor(x);
			month=Math.round((x-year)*seasons)+1;
			if(month>seasons){
				month=1;
				year++;
			}

			if(seasons==1){
				split=""
			} else if(seasons==4){
				split="Q"
			} else if(seasons==12){
				split="M"
			} else if(seasons==7){
				split="D"
			} else if(seasons==5){
				split="W"
			} else if(seasons==24){
				split="H"
			} else {
				split="C"
			}
			if(seasons==1){
				month="";
			} else {
				i=0;
				pad="";
				while(i<seasons.length){
					pad+="0";
					i++;
				}
				month = (pad+month).slice(-seasons.length);
				month = split+month;
			}
			toreturn+= "<tr><td align=center>"+year+month+"<td align=center class=minmax>"+min+"<td align=center>"+pred+"<td align=center class=minmax>"+max;
			c++;
		}

		toreturn+="</table></div>";
		return toreturn;
	} else {
		
		// This is where the graphing needs to happen	
		ctx.lineWidth = 2*scalefactor;
		ctx.strokeStyle='rgb(0,200,200)';
		
		for (index in tsxpoints){
			point=parseFloat(tsxpoints[index]);
			xpixel=convertvaltopixel(point,minxtick,maxxtick,left,right);
			ypixel=convertvaltopixel(fitted[index],maxytick,minytick,gtop,gbottom);
			$('#graphmap').append('<area shape="circle" coords="'+(xpixel/scalefactor)+','+(ypixel/scalefactor)+','+3+'" alt="'+parseInt(add(index,1))+'" desc="Point ID: '+parseInt(add(index,1))+'<br>'+xpoints[index]+'<br>'+$("#yvar option:selected").text()+' Historial Prediction: '+fitted[index].toPrecision(5)+'">');
			if(index != 0){
				line(ctx,xpixel,ypixel,lastxpixel,lastypixel);
			}
			if(labels == "yes"){
				ctx.fillStyle = 'rgba(0,0,255,1)';
				fontsize = 10*scalefactor;
				ctx.font = fontsize+"px Roboto";
				ctx.textAlign="left";
				ctx.fillText(parseInt(add(index,1)),add(add(xpixel,2),2),add(ypixel,4));
			}
			lastxpixel = xpixel;
			lastypixel = ypixel;	
		}
		
		lastxpixelfitted = lastxpixel;
		lastypixelfitted = lastypixel;
		
		ctx.lineWidth = 1*scalefactor;
		ctx.strokeStyle='#000';
		
		for (index in tsxpoints){
			point=parseFloat(tsxpoints[index]);
			xpixel=convertvaltopixel(point,minxtick,maxxtick,left,right);
			ypixel=convertvaltopixel(ypoints[index],maxytick,minytick,gtop,gbottom);
			$('#graphmap').append('<area shape="circle" coords="'+(xpixel/scalefactor)+','+(ypixel/scalefactor)+','+3+'" alt="'+parseInt(add(index,1))+'" desc="Point ID: '+parseInt(add(index,1))+'<br>'+xpoints[index]+'<br>'+$("#yvar option:selected").text()+': '+parseFloat(ypoints[index]).toPrecision(5)+'">');
			if(index != 0){
				line(ctx,xpixel,ypixel,lastxpixel,lastypixel);
			}
			if(labels == "yes"){
				ctx.fillStyle = 'rgba(0,0,255,1)';
				fontsize = 10*scalefactor;
				ctx.font = fontsize+"px Roboto";
				ctx.textAlign="left";
				ctx.fillText(parseInt(add(index,1)),add(add(xpixel,2),2),add(ypixel,4));
			}
			lastxpixel = xpixel;
			lastypixel = ypixel;	
		}
		
		lastxpixel = lastxpixelfitted;
		lastypixel = lastypixelfitted;
		
		ctx.strokeStyle='#f00';
		
		for(index in forecasts){
			point=parseFloat(forecasts[index][0]);
			year = Math.floor(point);
			month=Math.round((point-year)*seasons)+1;

			if(seasons==1){
				split=""
			} else if(seasons==4){
				split="Q"
			} else if(seasons==12){
				split="M"
			} else if(seasons==7){
				split="D"
			} else if(seasons==5){
				split="W"
			} else if(seasons==24){
				split="H"
			} else {
				split="C"
			}
			if(seasons==1){
				month="";
			} else {
				i=0;
				pad="";
				while(i<seasons.length){
					pad+="0";
					i++;
				}
				month = (pad+month).slice(-seasons.length);
				month = split+month;
			}
			min = parseFloat(forecastsmin[index].toPrecision(5));
			pred = parseFloat(forecasts[index][1].toPrecision(5));
			max = parseFloat(forecastsmax[index].toPrecision(5));
			
			xpixel=convertvaltopixel(point,minxtick,maxxtick,left,right);
			ypixel=convertvaltopixel(forecasts[index][1],maxytick,minytick,gtop,gbottom);
			$('#graphmap').append('<area shape="circle" coords="'+(xpixel/scalefactor)+','+(ypixel/scalefactor)+','+3+'" desc="'+year+month+'<br>'+$("#yvar option:selected").text()+' Forecast: '+pred+' ('+min+' - '+max+')">');
			line(ctx,xpixel,ypixel,lastxpixel,lastypixel);
			lastxpixel = xpixel;
			lastypixel = ypixel;
		}
		
		ctx.fillStyle='rgba(255,0,0,0.2)';
		ctx.beginPath();
		
		for(index in forecasts){
			point=parseFloat(forecasts[index][0]);
			xpixel=convertvaltopixel(point,minxtick,maxxtick,left,right);
			ypixel=convertvaltopixel(forecastsmin[index],maxytick,minytick,gtop,gbottom);
			if(index == -1){
				ctx.moveTo(xpixel, ypixel);
			} else {
				ctx.lineTo(xpixel, ypixel);
			}
		}
		forecasts.reverse();
		forecastsmax.reverse();
		for(index in forecasts){
			point=parseFloat(forecasts[index][0]);
			xpixel=convertvaltopixel(point,minxtick,maxxtick,left,right);
			ypixel=convertvaltopixel(forecastsmax[index],maxytick,minytick,gtop,gbottom);
			ctx.lineTo(xpixel, ypixel);
		}
		ctx.fill();
		forecasts.reverse();
		forecastsmax.reverse();
		
		// This is the end of the graphing.
		
		ctx.fillStyle = 'rgba(0,0,0,1)';
		fontsize = 12*scalefactor;
		ctx.font = fontsize+"px Roboto";
		ctx.textAlign="left";
		
		ctx.strokeStyle='#000';
		ctx.lineWidth = 1*scalefactor;
		line(ctx,60*scalefactor,60*scalefactor,80*scalefactor,60*scalefactor);
		ctx.fillText("Raw Data",85*scalefactor,65*scalefactor);
		
		
		ctx.strokeStyle='rgb(0,200,200)';
		ctx.lineWidth = 2*scalefactor;
		line(ctx,60*scalefactor,75*scalefactor,80*scalefactor,75*scalefactor);
		ctx.fillText("Historic Predictions",85*scalefactor,80*scalefactor);
		
		ctx.fillStyle='rgba(255,0,0,0.2)';
		ctx.fillRect(60*scalefactor, 85*scalefactor, 20*scalefactor, 10*scalefactor);
		ctx.strokeStyle='#f00';
		line(ctx,60*scalefactor,90*scalefactor,80*scalefactor,90*scalefactor);
		ctx.fillStyle = 'rgba(0,0,0,1)';
		ctx.fillText("Predictions",85*scalefactor,95*scalefactor);
		
		ctx.lineWidth = 1*scalefactor;
		
		labelgraph(ctx,width,height);
		
		if($('#invert').is(":checked")){
			invert(ctx)
		}

		var dataURL = canvas.toDataURL();
		return dataURL;
	}
}

function hwinit(ypoints,seasons){
	//create a centered moving mean for the first two years of the data.
	mm=[];
	i=0;
	ioffset=Math.floor(seasons/2);
	while(i<seasons){
		a1=0;
		a=0;
		while(a<seasons){
			a1=add(a1,ypoints[a+i]);
			a++;
		}
		a2=0;
		a=0;
		while(a<seasons){
			a++;
			a2=add(a2,ypoints[a+i]);
		}
		mm[i+ioffset+1]=(a1+a2)/(seasons*2);
		i++;
	}
	
	if(mm.length>1){
		// fit a regression line to it
		
		xcurvefit = "";
		ycurvefit = "";
		pointstofit = [];
		for (index in mm){
			xcurvefit+=index+",";
			ycurvefit+=mm[index]+",";
			pointstofit.push([parseFloat(index),parseFloat(mm[index])]);
		}
		
		res = regression.linear(pointstofit,{
		  precision: 7,
		});
		
		ap=res.equation[1]; // x-intercept is starting value
		bp=res.equation[0]; // gradient is the initial trend value

		//get inital seasonal effects.
		i=0;
		s=[];
		while (i<seasons){
			s[i-seasons]=ypoints[i]-(add(ap,bp*i));
			i++;
		}	
		
		a=[];
		b=[];
		a[-1]=ap;
		b[-1]=bp;
		return [a,b,s];
	} else {
		// fit a regression line to the first three points

		// Add all the data to the regression analysis. 
		i=0;
		xcurvefit = "";
		ycurvefit = "";
		pointstofit = [];
		while(i<3){
			xcurvefit+=index+",";
			ycurvefit+=mm[index]+",";
			pointstofit.push([parseFloat(index),parseFloat(mm[index])]);
		}
		
		res = regression.linear(pointstofit,{
		  precision: 7,
		});
		
		ap=res.equation[1]; // x-intercept is starting value
		bp=res.equation[0]; // gradient is the initial trend value

		a=[];
		b=[];
		s=[];
		a[-1]=ap;
		b[-1]=bp;
		s[-1]=0;
		return [a,b,s];
	}
}

function hwoptim(ypoints,seasons,alphamin,alphamax,betamin,betamax,gammamin,gammamax){
	split=9;
	hw = hwinit(ypoints,seasons);
	a = hw[0];
	b = hw[1];
	s = hw[2];
	results=[];
	alpha=alphamin;
	while(alpha<alphamax){
		beta=betamin;
		while(beta<betamax){
			gamma=gammamin;
			while(gamma<gammamax){
				i=0;
				error=0;
				for(index in ypoints){
					ypoint = ypoints[index];
					a[i]=alpha*(ypoint-s[i-seasons])+(1-alpha)*(add(a[i-1],b[i-1]));
					b[i]=beta*(a[i]-a[i-1])+(1-beta)*b[i-1];
					s[i]=gamma*(ypoint-a[i])+(1-gamma)*s[i-seasons];
					e = ypoint-(add(add(a[i-1],b[i-1]),s[i-seasons]));
					error+=e*e;
					i++;
				}
				results.push([error,alpha,beta,gamma]);
				gamma=add(gamma,(gammamax-gammamin)/split);
			}
			beta=add(beta,(betamax-betamin)/split);
		}
		alpha=add(alpha,(alphamax-alphamin)/split);
	}
	
	
	results.sort(function(a, b) {
		return ((a[0] < b[0]) ? -1 : ((a[0] == b[0]) ? 0 : 1));
	});
	
	alphas=[];
	betas=[];
	gammas=[];
	i=0;
	while(i<20){
		result = results[i];
		alphas.push(result[1]);
		betas.push(result[2]);
		gammas.push(result[3]);
		i++;
	}
	
	ralphamin=Math.max(Math.min.apply(null,alphas)-(alphamax-alphamin)/split,0);
	ralphamax=Math.min(Math.max.apply(null,alphas)-(-(alphamax-alphamin)/split),1);
	rbetamin=Math.max(Math.min.apply(null,betas)-(betamax-betamin)/split,0);
	rbetamax=Math.min(Math.max.apply(null,betas)-(-(betamax-betamin)/split),1);
	rgammamin=Math.max(Math.min.apply(null,gammas)-(gammamax-gammamin)/split,0);
	rgammamax=Math.min(Math.max.apply(null,gammas)-(-(gammamax-gammamin)/split),1);
	
	//and this
	return [ralphamin,ralphamax,rbetamin,rbetamax,rgammamin,rgammamax,results[0][1],results[0][2],results[0][3]];
}

function purebell(std_deviation) {
	rand1 = Math.random();
	rand2 = Math.random();
	gaussian_number = Math.sqrt(-2 * Math.log(rand1)) * Math.cos(2 * 3.14159 * rand2);
	random_number = (gaussian_number * std_deviation);
	return random_number;
}

function addindex(){
	$("#rowbox").hide();
	$("#colbox").hide();
	$("#sambox").hide();
	i=0;
	$('#data tr').each(function(){
		if(i==0){
			val = 'Index';
		} else {
			val = i;
		}
		$("<td><div>" + val + "<br></div></td>").insertAfter($(this).children('th'));
		i++;
	})
	$('#data td div').attr('contenteditable','true');
	updatebox();
}
function converttimeshow(){
	$('#converttimediv').show();
	$("#sampling").show();
	$("#rowbox").hide();
	$("#colbox").hide();
	$("#sambox").hide();
	var col=2;
	var options=[];
	options.push('<option></option>');
	$('#data tr:first td').each( function(){
		options.push('<option value="'+(col)+'">' + $(this).text() + '</option>');
		col++;
	});
	//finally empty the select and append the items from the array
	$('#converttimecol').empty().append( options.join() );
}

function converttimego(){
	var col = $('#converttimecol').val();
	var convertto = $('#converttimeto').val();
	i=0;
	items=[];
	minmax=[];
	$('#data tr td:nth-child('+col+')').each( function(){
		if(i!=0){
			test = Date.parse($(this).text());
			if($.isNumeric(test)){
				items.push(test);
				minmax.push(test);
			} else{
				test = Date.parse('1 Jan '+$(this).text());
				if($.isNumeric(test)){
					minmax.push(test);
				}
				items.push(test);
			}
		}
		i++;
	});
	lowesttime = Math.min.apply(null,minmax);
	i=0;
	divideby = 1;
	if(convertto == 'Seconds'){divideby=1000;}
	if(convertto == 'Minutes'){divideby=60000;}
	if(convertto == 'Hours'){divideby=3600000;}
	if(convertto == 'Days'){divideby=86400000;}
	$('#data tr').each(function(){
		if(i==0){
			val = convertto;
		} else {
			val = (items[i-1]-lowesttime)/divideby;
		}
		$("<td><div>" + val + "<br></div></td>").insertAfter($(this).children(':eq('+(col-1)+')'));
		i++;
	})
	$('#data td div').attr('contenteditable','true');
	$ ("#sampling").hide();
	$ ("#converttimediv").hide();
}

function encodetimeshow(){
	customshowhide();
	$('#encodetimediv').show();
	$("#sampling").show();
	$("#rowbox").hide();
	$("#colbox").hide();
	$("#sambox").hide();
	var col=2;
	var options=[];
	options.push('<option></option>');
	$('#data tr:first td').each( function(){
		options.push('<option value="'+(col)+'">' + $(this).text() + '</option>');
		col++;
	});
	//finally empty the select and append the items from the array
	$('#encodetimecol').empty().append( options.join() );
}

function customshowhide(){
	if($('#encodetimetype').val()=='Custom'){
		$('.encodecustomshow').show();
	} else {
		$('.encodecustomshow').hide();
	}
}

function encodetimego(){
	var col = $('#encodetimecol').val();
	var sumavg = $('#encodetimesumavg').val();
	var type = $('#encodetimetype').val();
	i=0;
	items=[];
	$('#data tr td:nth-child('+col+')').each( function(){
		if(i!=0){
			items.push( Date.parse($(this).text()) );
		}
		i++;
	});
	lowesttime = Math.min.apply(null,items);
	highesttime = Math.max.apply(null,items);
	if(type=='Quarter'){
		length = 0;
		start = 0;
		seasons = 4;
		split="Q";
		pad="0";
	} else if(type=='Month'){
		length = 0;
		start = 0;
		seasons = 12;
		split="M";
		pad="00";
	} else if(type=='Day'){
		length = 0;
		start = 0;
		seasons = 7;
		split="D";
		pad="0";
	} else if(type=='Hour'){
		length = 0;
		start = 0;
		seasons = 24;
		split="H";
		pad="00";
	} else {
		length = $('#encodelength').val()*$('#encodemult').val();
		seasons = $('#encodeseasons').val();
		start = Date.parse($('#encodestart').val());
		split="C";
		pad="";
		i=0;
		while(i<seasons.toString().length){
			pad+="0";
			i++;
		}
	}
	data = [];
	data['0000']=['TS'];
	firstseason = converttots(lowesttime-start,seasons,length);
	firstseason = firstseason.split(split);
	currentyear=firstseason[0];
	firstyear=firstseason[0];
	firstseason=firstseason[1];
	lastseason = converttots(highesttime-start,seasons,length);
	lastseason = lastseason.split(split);
	lastyear=lastseason[0];
	lastseason=lastseason[1];
	while(currentyear<=lastyear){
		if(currentyear==firstyear){
			currentseason=firstseason;
		} else {
			currentseason=1;
		}
		while((currentseason<=seasons && currentyear<lastyear) || (currentseason<=lastseason && currentyear==lastyear)){
			timestamp = currentyear + split + (pad + currentseason).slice(-pad.length)
			data[timestamp]=[];
			data[timestamp][0]=[timestamp];
			c=1;
			$('#data tr:first td').each( function(){
				data[timestamp][c]=[];
				c++;
			});
			currentseason++;
		}
		currentyear++;
	}
	i=0;
	$('#data tr').each( function(){
		time = Date.parse($(this).children().eq(col-1).text());
		time = converttots(time-start,seasons,length);
		c = 1;
		$(this).children('td').each(function(){
			if(i==0){
				data['0000'][c]=$(this).text();
			} else {
				data[time][c].push($(this).text());
			}
			c++;
		});
		i++;
	});
	for (key in data){
		value = data[key];
		for (vkey in value){
			val = value[vkey];
			if(typeof val == "object"){
				if(val.length==0){
					data[key][vkey]="-";
				} else if(val.length==1){
					data[key][vkey]=val[0];
				} else {
					if($.isNumeric(data[key][vkey][0])){
						sum=0;
						for (var index in val){
							sum = add(sum,val[index]);
						}
						if(sumavg=="avg"){
							sum = parseFloat((sum/val.length).toPrecision(5));
						}
						data[key][vkey]=sum;
					} else {
						data[key][vkey]=mode(val);
					}
				}
				
			}
		}
	}
	var newtable="";
	i=0;
	console.log(data);
	for (index in data) {
		var cells = data[index];
		if(i==0){
			newtable += "<tr class=tabletop><th>id";
		} else {
			newtable += "<tr><th>" + i;
		}
		for (c = 0; c < cells.length; c++) {
			cell = cells[c];
			if(cell==''){cell="-";}
			if(c==0 && split=="H" && i!=0){
				cutup = cell.split(split);
				first = cutup[0]-firstyear;
				second = cutup[1];
				cell = first + "H" + second;
			}
			newtable += "<td><div>" + cell + "<br></div></td>"
		}
		i++;
	}
	document.getElementById("data").innerHTML = newtable;
	$('#data td div').attr('contenteditable','true');
	$('#type').val('newabout');
	updatebox();
	$('#data td div').attr('contenteditable','true');
	$ ("#sampling").hide();
	$ ("#encodetimediv").hide();
}

//length is length of the "year", not the season

function converttots(time,seasons,length){
	date = new Date(time);
	if(seasons==12 && length==0){
		return date.getFullYear()+"M"+("00"+add(1,date.getMonth())).slice(-2);
	} else if(seasons==4 && length==0){
		return date.getFullYear()+"Q"+add(1,Math.floor(date.getMonth()/3));
	} else if(seasons==7 && length==0){
		week = getWeekNumber(date);
		return week+"D"+add(date.getDay(),1);
	} else if(seasons==24 && length==0){
		day = getDayNumber(date);
		return day+"H"+("00"+add(1,date.getHours())).slice(-2);
	} else {
		part1=Math.floor(time/length);
		part2=add(Math.floor((time/length-part1)*seasons),1);
		pad="";
		l=0;
		while(l<seasons.toString().length){
			pad+="0";
			l++;
		}
		part2 = (pad+part2).slice(-seasons.toString().length);
		return part1+"C"+part2;
	}
}

function getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    d.setDate(d.getDate() - d.getDay());
    var weekNo = Math.ceil(( ( (d) / 86400000) + 1)/7);
    // Return week number
    return weekNo;
}

function getDayNumber(d) {
    // Copy date so don't modify original
    d = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    var dayNo = Math.ceil( ( d / 86400000) + 1);
    // Return array of year and week number
    return dayNo;
}

function mode(values){
	counts = [];
	for(var i=0;i< values.length;i++)
	{
	  var key = values[i];
	  counts[key] = (counts[key])? counts[key] + 1 : 1 ;

	}
	return Object.keys(counts).reduce(function(a, b){ return counts[a] > counts[b] ? a : b })
}
function sortorder(as, bs)
{
    var a, b, a1, b1, i= 0, n, L,
    rx=/(\.\d+)|(\d+(\.\d+)?)|([^\d.]+)|(\.\D+)|(\.$)/g;
    if(as=== bs) return 0;
    a= as.toLowerCase().match(rx);
    b= bs.toLowerCase().match(rx);
	if(a == null){
		L=0;
	} else {
		L = a.length;
	}
    while(i<L){
		if(b == null) return 1;
        if(!b[i]) return 1;
        a1= a[i],
        b1= b[i++];
        if(a1!== b1){
            n= a1-b1;
            if(!isNaN(n)) return n;
            return a1>b1? 1:-1;
        }
    }
    return b[i]? -1:0;
}
function newpairsplot(){
	
	$("#invertshow").show();
	
	$('#var1label').html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
	$('#var2label').html("");
	$('#var3label').html("");
	
	var canvas = document.getElementById('myCanvas');
	var ctx = canvas.getContext('2d');
	
	//set size
	var width = $('#width').val();
	var height = $('#height').val();

	ctx.canvas.width = width;
	ctx.canvas.height = height;

	ctx.fillStyle = "#ffffff";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	data = [];
	$.each(dataforselector,function(index,value){
		if(index != ' '){
			data.push(value);
		}
	})
	
	//set font
	ctx.fillStyle = '#000000';
	fontsize=14*scalefactor;
	ctx.textAlign="center";
	ctx.font = fontsize+"px Roboto";
	
	ctx.strokeStyle = '#000000';
	ctx.lineWidth = 1*scalefactor;
	
	rows = data.length;
	hstep = (width-10*scalefactor)/rows;
	vstep = (height-30*scalefactor)/rows;
	t = 5*scalefactor;
	
	r=0;
	while(r<rows){
		c=0;
		left = 5*scalefactor;
		center = hstep/2;
		while(c<rows){
			bleft = left+5*scalefactor
			bright = left+hstep-5*scalefactor
			btop = t+5*scalefactor
			bbottom = t+vstep-5*scalefactor
			line(ctx,bleft,btop,bright,btop);
			line(ctx,bleft,btop,bleft,bbottom);
			line(ctx,bright,btop,bright,bbottom);
			line(ctx,bleft,bbottom,bright,bbottom);
			if(r==c){
				ctx.fillText($('#xvar option:eq('+(r+1)+')').text(),center,t+20*scalefactor);
				if($.isNumeric(data[r][0])){
					drawminihistogram(ctx,data[r],bleft,bright,btop,bbottom,r,$('#xvar option:eq('+(r+1)+')').text());
				} else {
					drawminibarchart(ctx,data[r],bleft,bright,btop,bbottom,r,$('#xvar option:eq('+(r+1)+')').text());
				}
			} else {
				title = $('#xvar option:eq('+(c+1)+')').text()+' vs '+$('#xvar option:eq('+(r+1)+')').text()
				if($.isNumeric(data[r][0])){
					if($.isNumeric(data[c][0])){
						drawminiscatter(ctx,data[c],data[r],bleft,bright,btop,bbottom,c,r,title);
					} else {
						drawminivboxes(ctx,data[c],data[r],bleft,bright,btop,bbottom,c,r,title);
					}
				} else {
					if($.isNumeric(data[c][0])){
						drawminihboxes(ctx,data[c],data[r],bleft,bright,btop,bbottom,c,r,title);
					} else {
						drawminiareagraphs(ctx,data[c],data[r],bleft,bright,btop,bbottom,c,r,title);
					}
				}
			}
			left += hstep;
			center += hstep;
			c++;
		}
		t += vstep;
		r++;
	}
	
	labelgraph(ctx,width,height);
	
	if($('#invert').is(":checked")){
		invert(ctx)
	}

	var dataURL = canvas.toDataURL();
	return dataURL;
}

function drawminihistogram(ctx,data,bleft,bright,btop,bbottom,r,title){
	min = Math.min.apply(null, data);
	max = Math.max.apply(null, data);
	range=max-min;
	point1=range/5+min;
	point2=range/5*2+min;
	point3=range/5*3+min;
	point4=range/5*4+min;
	
	bwidth = bright-bleft;
	bheight = bbottom-btop-30*scalefactor;
		
	sec1=0;
	sec2=0;
	sec3=0;
	sec4=0;
	sec5=0;
	
	$(data).each(function(index,value){
		if(value<point1){sec1++;}
		else if (value<point2){sec2++;}
		else if (value<point3){sec3++;}
		else if (value<point4){sec4++;}
		else {sec5++;}
	});
	
	max = Math.max(sec1,sec2,sec3,sec4,sec5);
	
	ctx.fillStyle = '#267BD0';
	ctx.rect(bleft, bbottom, bwidth/5, -bheight*sec1/max);ctx.fill();ctx.stroke();
	ctx.rect(bleft+bwidth/5*1, bbottom, bwidth/5, -bheight*sec2/max);ctx.fill();ctx.stroke();
	ctx.rect(bleft+bwidth/5*2, bbottom, bwidth/5, -bheight*sec3/max);ctx.fill();ctx.stroke();
	ctx.rect(bleft+bwidth/5*3, bbottom, bwidth/5, -bheight*sec4/max);ctx.fill();ctx.stroke();
	ctx.rect(bleft+bwidth/5*4, bbottom, bwidth/5, -bheight*sec5/max);ctx.fill();ctx.stroke();
	ctx.fillStyle = '#000';
	
	$('#graphmap').append("<area shape='rect' coords='"+(bleft/scalefactor)+","+(btop/scalefactor)+","+(bright/scalefactor)+","+(bbottom/scalefactor)+"' href=\"javascript:document.getElementById('xvar').selectedIndex="+r+"+1;document.getElementById('yvar').selectedIndex=0;document.getElementById('type').value='newhistogram';document.getElementById('xaxis').value=document.getElementById('xvar').options[document.getElementById('xvar').selectedIndex].text;document.getElementById('yaxis').value=document.getElementById('yvar').options[document.getElementById('yvar').selectedIndex].text;graphchange(document.getElementById('type'));updategraph();\" alt='"+bleft+","+btop+"' desc='"+title+"'>");
}

function drawminibarchart(ctx,data,bleft,bright,btop,bbottom,r,title){
	var counts = {};
	$.each(data, function( index, value ) {
		if(counts[value]){
			counts[value]=add(counts[value],1);
		} else {
			counts[value]=1;
		}
	});
	var maxpoints = 0;
	num = 0;
	$.each( counts, function( index, value ){
	  if(value>maxpoints){
		  maxpoints=value;
	  }
	  num++;
	});
	bwidth = bright-bleft-5*scalefactor;
	bheight = bbottom-btop-30*scalefactor;
	bleft += 5*scalefactor;
	i=0;
	ctx.fillStyle = '#267BD0';
	$.each(counts, function(index,value){
		ctx.rect(bleft+bwidth/num*i, bbottom, bwidth/num-5*scalefactor, -bheight*value/maxpoints);ctx.fill();ctx.stroke();
		i++;
	});
	ctx.fillStyle = '#000';
	
	$('#graphmap').append("<area shape='rect' coords='"+(bleft/scalefactor)+","+(btop/scalefactor)+","+(bright/scalefactor)+","+(bbottom/scalefactor)+"' href=\"javascript:document.getElementById('xvar').selectedIndex="+r+"+1;document.getElementById('yvar').selectedIndex=0;document.getElementById('type').value='newbargraph';document.getElementById('xaxis').value=document.getElementById('xvar').options[document.getElementById('xvar').selectedIndex].text;document.getElementById('yaxis').value=document.getElementById('yvar').options[document.getElementById('yvar').selectedIndex].text;graphchange(document.getElementById('type'));updategraph();\" alt='"+bleft+","+btop+"' desc='"+title+"'>");
}

function drawminiscatter(ctx,xdata,ydata,bleft,bright,btop,bbottom,c,r,title){
	minx = Math.min.apply(null,xdata);
	maxx = Math.max.apply(null,xdata);
	miny = Math.min.apply(null,ydata);
	maxy = Math.max.apply(null,ydata);
	ctx.strokeStyle = 'rgba(0,0,0,0.5)';
	$.each(xdata,function(index,value){
		var xpoint = value;
		var ypoint = ydata[index];
		var xpixel = convertvaltopixel(xpoint,minx,maxx,bleft+10*scalefactor,bright-10*scalefactor);
		var ypixel = convertvaltopixel(ypoint,miny,maxy,bbottom-10*scalefactor,btop+10*scalefactor);
		ctx.beginPath();
		ctx.arc(xpixel,ypixel,2*scalefactor,0,2*Math.PI);
		ctx.stroke();
	})
	ctx.strokeStyle = '#000';
	$('#graphmap').append("<area shape='rect' coords='"+(bleft/scalefactor)+","+(btop/scalefactor)+","+(bright/scalefactor)+","+(bbottom/scalefactor)+"' href=\"javascript:document.getElementById('xvar').selectedIndex="+c+"+1;document.getElementById('yvar').selectedIndex="+r+"+1;document.getElementById('type').value='newscatter';document.getElementById('xaxis').value=document.getElementById('xvar').options[document.getElementById('xvar').selectedIndex].text;document.getElementById('yaxis').value=document.getElementById('yvar').options[document.getElementById('yvar').selectedIndex].text;graphchange(document.getElementById('type'));updategraph();\" alt='"+bleft+","+btop+"' desc='"+title+"'>");
}

function drawminivboxes(ctx,xdata,ydata,bleft,bright,btop,bbottom,c,r,title){
	miny = Math.min.apply(null,ydata);
	maxy = Math.max.apply(null,ydata);
	thisdata={};
	count=0;
	$.each(xdata,function(index,value){
		var xpoint = value;
		var ypoint = ydata[index];
		if(thisdata[xpoint]){
			thisdata[xpoint].push(ypoint);
		} else {
			count++;
			thisdata[xpoint]=[];
			thisdata[xpoint].push(ypoint);
		}
	})
	i=0;
	w = (bright-bleft)/count;
	$.each(thisdata,function(index,thisvalues){
		var minval = Math.min.apply(null, thisvalues);
		var lq = lowerquartile(thisvalues);
		var med = median(thisvalues);
		var uq = upperquartile(thisvalues);
		var maxval = Math.max.apply(null, thisvalues);
		minval = convertvaltopixel(minval,miny,maxy,bbottom-10*scalefactor,btop+10*scalefactor);
		lq = convertvaltopixel(lq,miny,maxy,bbottom-10*scalefactor,btop+10*scalefactor);
		med = convertvaltopixel(med,miny,maxy,bbottom-10*scalefactor,btop+10*scalefactor);
		uq = convertvaltopixel(uq,miny,maxy,bbottom-10*scalefactor,btop+10*scalefactor);
		maxval = convertvaltopixel(maxval,miny,maxy,bbottom-10*scalefactor,btop+10*scalefactor);
		cen = bleft+i*w+w/2;
		line(ctx,cen,minval,cen,lq);
		line(ctx,cen-w/4,lq,cen+w/4,lq);
		line(ctx,cen-w/4,uq,cen-w/4,lq);
		line(ctx,cen-w/4,med,cen+w/4,med);
		line(ctx,cen+w/4,uq,cen+w/4,lq);
		line(ctx,cen-w/4,uq,cen+w/4,uq);
		line(ctx,cen,maxval,cen,uq);
		i++;
	})
	$('#graphmap').append("<area shape='rect' coords='"+(bleft/scalefactor)+","+(btop/scalefactor)+","+(bright/scalefactor)+","+(bbottom/scalefactor)+"' href=\"javascript:document.getElementById('xvar').selectedIndex="+r+"+1;document.getElementById('yvar').selectedIndex="+c+"+1;document.getElementById('type').value='newdotplot';document.getElementById('xaxis').value=document.getElementById('xvar').options[document.getElementById('xvar').selectedIndex].text;document.getElementById('yaxis').value=document.getElementById('yvar').options[document.getElementById('yvar').selectedIndex].text;graphchange(document.getElementById('type'));updategraph();\" alt='"+bleft+","+btop+"' desc='"+title+"'>");
}

function drawminihboxes(ctx,xdata,ydata,bleft,bright,btop,bbottom,c,r,title){
	minx = Math.min.apply(null,xdata);
	maxx = Math.max.apply(null,xdata);
	thisdata={};
	count=0;
	$.each(ydata,function(index,value){
		var xpoint = value;
		var ypoint = xdata[index];
		if(thisdata[xpoint]){
			thisdata[xpoint].push(ypoint);
		} else {
			count++;
			thisdata[xpoint]=[];
			thisdata[xpoint].push(ypoint);
		}
	})
	i=0;
	w = (bbottom-btop)/count;
	$.each(thisdata,function(index,thisvalues){
		var minval = Math.min.apply(null, thisvalues);
		var lq = lowerquartile(thisvalues);
		var med = median(thisvalues);
		var uq = upperquartile(thisvalues);
		var maxval = Math.max.apply(null, thisvalues);
		minval = convertvaltopixel(minval,minx,maxx,bleft+10*scalefactor,bright-10*scalefactor);
		lq = convertvaltopixel(lq,minx,maxx,bleft+10*scalefactor,bright-10*scalefactor);
		med = convertvaltopixel(med,minx,maxx,bleft+10*scalefactor,bright-10*scalefactor);
		uq = convertvaltopixel(uq,minx,maxx,bleft+10*scalefactor,bright-10*scalefactor);
		maxval = convertvaltopixel(maxval,minx,maxx,bleft+10*scalefactor,bright-10*scalefactor);
		cen = btop+i*w+w/2;
		line(ctx,minval,cen,lq,cen);
		line(ctx,lq,cen-w/4,lq,cen+w/4);
		line(ctx,uq,cen-w/4,lq,cen-w/4);
		line(ctx,med,cen-w/4,med,cen+w/4);
		line(ctx,uq,cen+w/4,lq,cen+w/4);
		line(ctx,uq,cen-w/4,uq,cen+w/4);
		line(ctx,uq,cen,maxval,cen);
		i++;
	})
	$('#graphmap').append("<area shape='rect' coords='"+(bleft/scalefactor)+","+(btop/scalefactor)+","+(bright/scalefactor)+","+(bbottom/scalefactor)+"' href=\"javascript:document.getElementById('xvar').selectedIndex="+c+"+1;document.getElementById('yvar').selectedIndex="+r+"+1;document.getElementById('type').value='newdotplot';document.getElementById('xaxis').value=document.getElementById('xvar').options[document.getElementById('xvar').selectedIndex].text;document.getElementById('yaxis').value=document.getElementById('yvar').options[document.getElementById('yvar').selectedIndex].text;graphchange(document.getElementById('type'));updategraph();\" alt='"+bleft+","+btop+"' desc='"+title+"'>");
}

function drawminiareagraphs(ctx,ydata,xdata,bleft,bright,btop,bbottom,c,r,title){
	bwidth = bright-bleft;
	bheight = bbottom-btop;
	thisdata={};
	ycats={};
	count=xdata.length;
	$.each(ydata,function(index,value){
		var xpoint = value;
		var ypoint = xdata[index];
		if(!thisdata[xpoint]){
			thisdata[xpoint]={};
		}
		if(!thisdata[xpoint][ypoint]){
			thisdata[xpoint][ypoint]=0;
		}
		if(!ycats[ypoint]){
			ycats[ypoint]=0;
		}
		thisdata[xpoint][ypoint]=add(thisdata[xpoint][ypoint],1);
	})
	l=0;
	ctx.fillStyle = 'rgba(0,0,0,0.12)';	
	$.each(thisdata,function(index,thisvalues){
		h=0;
		total = 0;
		$.each(thisvalues,function(index,value){
			total+=value;
		});
		$.each(ycats,function(index,value){
			if(thisvalues[index]){
				ctx.beginPath();
				ctx.rect(bleft+l, bbottom+h, bwidth*total/count, -bheight*thisvalues[index]/total);
				ctx.fill();
				ctx.stroke();
			}
			h = h-bheight*thisvalues[index]/total;
		});
		l=add(l,bwidth*total/count);
	});
	ctx.fillStyle = '#000';
	$('#graphmap').append("<area shape='rect' coords='"+(bleft/scalefactor)+","+(btop/scalefactor)+","+(bright/scalefactor)+","+(bbottom/scalefactor)+"' href=\"javascript:document.getElementById('xvar').selectedIndex="+c+"+1;document.getElementById('yvar').selectedIndex="+r+"+1;document.getElementById('type').value='bar and area graph';document.getElementById('xaxis').value=document.getElementById('xvar').options[document.getElementById('xvar').selectedIndex].text;document.getElementById('yaxis').value=document.getElementById('yvar').options[document.getElementById('yvar').selectedIndex].text;graphchange(document.getElementById('type'));updategraph();\" alt='"+bleft+","+btop+"' desc='"+title+"'>");
}

function lockaxis(){
	if(xmin == null){xmin = 'auto';}
	if(xmax == null){xmax = 'auto';}
	if(ymin == null){ymin = 'auto';}
	if(ymax == null){ymax = 'auto';}

	$('#boxplotmin').val(xmin);
	$('#boxplotmax').val(xmax);
	$('#scatplotminx').val(xmin);
	$('#scatplotmaxx').val(xmax);
	$('#scatplotminy').val(ymin);
	$('#scatplotmaxy').val(ymax);
}

function newresiduals(){

	$('#xvar').show();
	$('#yvar').show();
	$('#color').show();
	$('#colorname').show();
	$('#labelshow').show();
	$('#greyscaleshow').show();
	$('#sizediv').show();
	$('#removedpointsshow').show();
	$('#pointsizename').html('Point Size:');
	$('#transdiv').show();
	$('#residualsforcexshow').show();
	$('#regtypeshow').show();
	$('#weightedaverageshow').show();
	//$('#color')[0].selectedIndex = 0;
	
	var canvas = document.getElementById('myCanvas');
	var ctx = canvas.getContext('2d');
	
	//set size
	var width = $('#width').val();
	var height = $('#height').val();

	ctx.canvas.width = width;
	ctx.canvas.height = height;

	ctx.fillStyle = "#ffffff";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	//graph title
	ctx.fillStyle = '#000000';
	fontsize=20*scalefactor;
	ctx.font = "bold "+fontsize+"px Roboto";
	ctx.textAlign="center";
	ctx.fillText($('#title').val(),width/2,30*scalefactor);
	
	if($('#residualsforcex').is(":checked")){
		xtitle="Explanatory";
		residualsforcex="yes";
	} else {
		xtitle="Fitted";
		residualsforcex="no";
	}
	
	//x-axis title
	ctx.fillStyle = '#000000';
	ctx.font = "bold "+15*scalefactor+"px Roboto";
	ctx.textAlign="center";
	ctx.fillText(xtitle,width/2,height-10*scalefactor);
	
	//y-axis title
	x=20*scalefactor;
	y=height/2;
	ctx.save();
	ctx.fillStyle = '#000000';
	ctx.font = "bold "+15*scalefactor+"px Roboto";
	ctx.translate(x, y);
	ctx.rotate(-Math.PI/2);
	ctx.textAlign = "center";
	ctx.fillText("Residual", 0, 0);
	ctx.restore();
	
	//get points
	var xpoints = (dataforselector[$('#xvar option:selected').text()]).slice();
	var ypoints = (dataforselector[$('#yvar option:selected').text()]).slice();

	//check for numeric value
	var points=[];
	var pointsremoved=[];
	var pointsforminmax=[];
	var pointsforminmaxy=[];
	countx=0;
	county=0;
	for (var index in xpoints){
		if($.isNumeric(xpoints[index])){countx++;}
		if($.isNumeric(ypoints[index])){county++;}
		if($.isNumeric(xpoints[index]) && $.isNumeric(ypoints[index])){
			points.push(index);
			pointsforminmax.push(xpoints[index]);
			pointsforminmaxy.push(ypoints[index]);
		} else {
			pointsremoved.push(add(index,1));
		}
	}

	if(countx==0){
		return 'Error: You must select a numeric variable for variable 1';
	}

	if(county==0){
		return 'Error: You must select a numeric variable for variable 2';
	}

	if(pointsremoved.length!=0 && $('#removedpoints').is(":checked")){
		ctx.fillStyle = '#000000';
		ctx.font = 13*scalefactor+"px Roboto";
		ctx.textAlign="right";
		ctx.fillText("ID(s) of Points Removed: "+pointsremoved.join(", "),width-40*scalefactor,40*scalefactor);
	}

	if(points.length==0){
		return 'Error: You must select a numeric variable for variable 1';
	}
	
	pointstofit = [];
	for (var index in points){
		var index = points[index];
		var xpoint = xpoints[index];
		var ypoint = ypoints[index];
		if(xpoint==0){xpoint = xpoint + 0.0000000000001;}
		if(ypoint==0){ypoint = ypoint + 0.0000000000001;}
		pointstofit.push([parseFloat(xpoint),parseFloat(ypoint)]);
	}
	
	regtype = $('#regtype').val();
	
	fitted = [];
	
	if(regtype=="Linear"){
		
		res = regression.linear(pointstofit,{
		  precision: 7,
		});
		console.log(res);
		
		c = res.equation[1].toPrecision(5);
		m = res.equation[0].toPrecision(5);
		
		for (var index in points){
			var index = points[index];
			var xpoint = xpoints[index];
			fitted[index] = add(m*xpoint,c).toPrecision(5);
		}
	} else if (regtype=="Quadratic"){
		
		res = regression.polynomial(pointstofit,{
		  order: 2,
		  precision: 7,
		});
		console.log(res);
		
		a = res.equation[0].toPrecision(5);
		b = res.equation[1].toPrecision(5);
		c = res.equation[2].toPrecision(5);
		
		for (var index in points){
			var index = points[index];
			var xpoint = xpoints[index];
			fitted[index] = add(add(a*xpoint*xpoint,b*xpoint),c).toPrecision(5);
		}
		
	} else if (regtype=="Cubic"){
		
		res = regression.polynomial(pointstofit,{
		  order: 3,
		  precision: 10,
		});
		console.log(res);
		
		a = res.equation[0];
		b = res.equation[1];
		c = res.equation[2];
		d = res.equation[3];
		
		for (var index in points){
			var index = points[index];
			var xpoint = xpoints[index];
			fitted[index] = add(add(add(a*xpoint*xpoint*xpoint,b*xpoint*xpoint),c*xpoint),d).toPrecision(5);
		}
		
	} else if (regtype=="y=a*exp(b*x)"){
		
		res = regression.exponential(pointstofit,{
		  precision: 7,
		});
		console.log(res);
		
		a = res.equation[0].toPrecision(5);
		b = res.equation[1].toPrecision(5);
		
		for (var index in points){
			var index = points[index];
			var xpoint = xpoints[index];
			fitted[index] = (a * Math.exp(b*xpoint)).toPrecision(5);
		}
		
	} else if (regtype=="y=a*ln(x)+b"){
		
		res = regression.logarithmic(pointstofit,{
		  precision: 7,
		});
		console.log(res);
		
		a = res.equation[1].toPrecision(5);
		b = res.equation[0].toPrecision(5);
		
		for (var index in points){
			var index = points[index];
			var xpoint = xpoints[index];
			if(xpoint==0){xpoint = xpoint + 0.0000000000001;}
			fitted[index] = add(a * Math.log(xpoint),b).toPrecision(5);
		}
		
	} else if (regtype=="y=a*x^b"){
		
		res = regression.power(pointstofit,{
		  precision: 7,
		});
		console.log(res);
		
		a = res.equation[0].toPrecision(5);
		b = res.equation[1].toPrecision(5);
		
		for (var index in points){
			var index = points[index];
			var xpoint = xpoints[index];
			fitted[index] = (a * Math.pow(xpoint,b)).toPrecision(5);
		}
		
	}
	
	residuals=[];
	var pointsforminmax=[];
	var pointsforminmaxy=[];
		
	for (var index in points){
		var index = points[index];
		var ypoint = ypoints[index];
		var fit = fitted[index];
		residuals[index] = (ypoint-fit).toPrecision(5);
		pointsforminmaxy.push(ypoint-fit);
		if(residualsforcex=="yes"){
			fitted[index] = xpoints[index];
			fit = xpoints[index];
		}
		pointsforminmax.push(fit);
	}
	
	var alpha = 1-$('#trans').val()/100;
	var colors = makecolors(alpha,ctx);

	xmin = Math.min.apply(null, pointsforminmax);
	xmax = Math.max.apply(null, pointsforminmax);
	ymin = Math.min.apply(null, pointsforminmaxy);
	ymax = Math.max.apply(null, pointsforminmaxy);
	
	var minmaxstep = axisminmaxstep(xmin,xmax);
	var minxtick=minmaxstep[0];
	var maxxtick=minmaxstep[1];
	var xstep=minmaxstep[2];
	var minmaxstep = axisminmaxstep(ymin,ymax);
	var minytick=minmaxstep[0];
	var maxytick=minmaxstep[1];
	var ystep=minmaxstep[2];

	var left=90*scalefactor;
	var right=width-60*scalefactor;
	var gtop=90*scalefactor;
	var bottom=height-60*scalefactor;
	
	plotscatter(ctx,points,fitted,residuals,minxtick,maxxtick,xstep,minytick,maxytick,ystep,gtop,bottom,left,right,colors);
	
	labelgraph(ctx,width,height);
	
	if($('#invert').is(":checked")){
		invert(ctx)
	}

	var dataURL = canvas.toDataURL();
	return dataURL;
	
}

function newchangelog(){
	$('#var1label').html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
	$('#var2label').html("");
	$('#var3label').html("");
	$.get('./change log.php').done(function(data){
		var width = $('#width').val()-22;
		var height = $('#height').val()-22;
		$('#jsgraph').html("<div style='width:"+width+"px;height:"+height+"px;overflow-y:scroll;padding:10px;text-align:left;'>"+data+"</div>");
	});
	return "DISPLLoading...";
}

function newupdate(){
	$('#var1label').html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
	$('#var2label').html("");
	$('#var3label').html("");
	$.get('./update.php').done(function(data){
		var width = $('#width').val()-22;
		var height = $('#height').val()-22;
		$('#jsgraph').html("<div style='width:"+width+"px;height:"+height+"px;overflow-y:scroll;padding:10px;text-align:left;'>"+data+"</div>");
	});
	return "DISPLLoading...";
}

function newpiechart(){
	$('#xvar').show();
	$('#yvar').show();
	$('#zvar').show();
	$('#var1label').html("Category 1:<br><small>required</small>");
	$('#var2label').html("Category 2:<br><small>optional</small>");
	$('#var3label').html("Frequency:<br><small>optional</small>");
	
	if(document.getElementById("color").selectedIndex != document.getElementById("xvar").selectedIndex){
		document.getElementById("color").selectedIndex = document.getElementById("xvar").selectedIndex
	};
	
	$('#colorlabel').val($('#xaxis').val());
	
	$('#regshow').show();
	$('#sum').show();
	$('#greyscaleshow').show();
	$('#donutshow').show();
	
	var canvas = document.getElementById('myCanvas');
	var ctx = canvas.getContext('2d');
	
	//set size
	var width = $('#width').val();
	var height = $('#height').val();

	ctx.canvas.width = width;
	ctx.canvas.height = height;

	var colors = makecolors(1,ctx);
	
	ctx.fillStyle = "#ffffff";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	//graph title
	ctx.fillStyle = '#000000';
	fontsize=20*scalefactor;
	ctx.font = "bold "+fontsize+"px Roboto";
	ctx.textAlign="center";
	ctx.fillText($('#title').val(),width/2,30*scalefactor);
	
	//get points
	var xpoints = (dataforselector[$('#xvar option:selected').text()]).slice();
	var ypoints = (dataforselector[$('#yvar option:selected').text()]).slice();
	var zpoints = (dataforselector[$('#zvar option:selected').text()]).slice();
	
	if(xpoints.length==0){
		return 'Error: You must select a variable for "Category 1"';
	}
	
	var points=[];
	var allpoints=[];
	var pointsremoved=[];
	var pointsforminmax=[];
	for (var index in xpoints){
		allpoints.push(index);
	}
	allydifferentgroups = [];
	
	if(ypoints.length>0){
		allydifferentgroups = split(allpoints,ypoints,10,2);
		if(typeof allydifferentgroups === 'object'){
			allygroups = Object.keys(allydifferentgroups);
			allygroups.sort(sortorder).reverse();
			for (index in allydifferentgroups){
				group = index;
				depoints=allydifferentgroups[index];
				for (index in depoints){
					point=depoints[index];
					ypoints[point]=group;
				}

			}
		} else {
			return allydifferentgroups;
		}
	} else {
		allygroups=''
		allydifferentgroups={};
		allydifferentgroups['']=allpoints;
	}
	
	numgraphs=Object.keys(allydifferentgroups).length;
	if(numgraphs<=3){
		numwidth=numgraphs;
	} else {
		numwidth=Math.ceil(Math.sqrt(numgraphs));
	}
	
	numheight=Math.ceil(numgraphs/numwidth);
	
	graphwidth=(width-50*scalefactor)/numwidth;
	graphheight=(height-80*scalefactor)/numheight;
	
	left=25*scalefactor;
	datop=50*scalefactor;
	
	$.each(allydifferentgroups,function(group,keys){
		if($('#regression').is(":checked")){
			group += " (num: " + keys.length + ")";
		}
		
		if(left>width-30*scalefactor){
			left=25*scalefactor;
			datop=datop+graphheight;
		}
		
		centerx=graphwidth/2+left;
		centery=graphheight/2+datop-20*scalefactor;
		
		diameter=Math.min(graphheight-50*scalefactor,graphwidth-10*scalefactor);
		
		drawpie(ctx,keys,colors,diameter,centerx,centery,xpoints,zpoints,group);
				
		ctx.fillStyle = '#000000';
		fontsize=14*scalefactor;
		ctx.font = "bold "+fontsize+"px Roboto";
		ctx.textAlign="center";
		ctx.fillText(group,centerx,centery+diameter/2+30*scalefactor);
		
		left+=graphwidth;
			
	});
	
	labelgraph(ctx,width,height);
	
	if($('#invert').is(":checked")){
		invert(ctx)
	}

	var dataURL = canvas.toDataURL();
	return dataURL;
}

function drawpie(ctx,keys,colors,diameter,centerx,centery,xpoints,zpoints,group){
	if(zpoints.length>0){
		total = 0;
		$.each(keys,function(i,key){
			total = add(total,zpoints[key]);
		})
	} else {
		total = keys.length;
	}
	if(total==0){total=1;}
	angleperitem = 2*Math.PI / total;
	
	var counts = {};
	
	$.each(keys,function(i,key){
		value = xpoints[key];
		if(counts[value]){
			if(zpoints.length>0){
				counts[value]['count']=add(counts[value]['count'],zpoints[key]);
			} else {
				counts[value]['count']+=1;
			}
		} else {
			counts[value]=[];
			if(zpoints.length>0){
				counts[value]['count']=zpoints[key];
			} else {
				counts[value]['count']=1;
			}
			counts[value]['color']=colors[key];
			counts[value]['name']=value;
		}
	})
	
	angle = -Math.PI/2;
	ctx.strokeStyle = 'rgb(0,0,0)';
	ctx.lineWidth = 1*scalefactor;
	
	const ordered = {};
	Object.keys(counts).sort().forEach(function(key) {
	  ordered[key] = counts[key];
	});
	
	$.each(ordered,function(i,data){
		thisangle = data.count*angleperitem;
		ctx.fillStyle = data.color;
		ctx.beginPath();
		ctx.moveTo(centerx,centery);
		ctx.arc(centerx,centery,diameter/2,angle,angle+thisangle);
		ctx.moveTo(centerx,centery);
		ctx.closePath();
		ctx.fill();
		angle += thisangle;
		
	});
	
	
	$.each(ordered,function(i,data){
		thisangle = data.count*angleperitem;
		ctx.fillStyle = data.color;
		ctx.beginPath();
		ctx.moveTo(centerx,centery);
		ctx.arc(centerx,centery,diameter/2,angle,angle+thisangle);
		ctx.moveTo(centerx,centery);
		ctx.closePath();
		ctx.stroke();
		
		half=(angle+angle+thisangle)/2;
		pix_x=diameter*0.4*Math.cos(half)+centerx;
		pix_y=diameter*0.4*Math.sin(half)+centery;
		
		ctx.fillStyle = '#000000';
		fontsize=11*scalefactor;
		ctx.font = "bold "+fontsize+"px Roboto";
		ctx.textAlign="center";
		ctx.fillText(data.name,pix_x,pix_y);
		if($('#regression').is(":checked")){
			display = "(num: " + data.count + ")";
			ctx.fillText(display,pix_x,pix_y+fontsize);
		}
		
		points = centerx/scalefactor+","+centery/scalefactor;
		startangle = angle;
		i=0;
		while(i<=10){
			l=(diameter*0.5*Math.cos(startangle)+centerx)/scalefactor;
			t=(diameter*0.5*Math.sin(startangle)+centery)/scalefactor;
			ctx.lineTo(l,t);
			points+=","+l+","+t;
			startangle+=thisangle/10;
			i++;
		}
		points += ","+centerx/scalefactor+","+centery/scalefactor;
		desc=$('#xaxis').val()+": "+data.name + "<br>"+$('#yaxis').val()+": "+group + "<br>num: " + data.count + "<br>" + (data.count/keys.length*100).toFixed(1) + "% of "+group;
		$('#graphmap').append('<area shape="poly" coords="'+points+'" desc="'+desc+'">');
		
		angle += thisangle;
	});
	
	
	if($('#donut').is(":checked")){
		ctx.fillStyle = 'rgb(255,255,255)';
		ctx.beginPath();
		ctx.arc(centerx,centery,diameter*0.3,0,2*Math.PI);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
	}
		
	ctx.beginPath();
	ctx.arc(centerx,centery,diameter/2,0,2*Math.PI);
	ctx.stroke();
	
}

function newrerandmedian(){
	return rerand('median');
}

function newrerandmean(){
	return rerand('mean');
}

function rerand(mm){
	$('#xvar').show();
	$('#yvar').show();
	$('#thicklinesshow').show();
	$('#labelshow').show();
	$('#transdiv').show();
	$('#sizediv').show();
	$('#greyscaleshow').show();
	$('#stackdotsshow').show();
	$('#pointsizename').html('Point Size:');
	$('#boxplot').prop('checked', true);
	$('#meandot').prop('checked', false);
	$('#highboxplot').prop('checked', false);
	$('#boxnowhisker').prop('checked', false);
	$('#boxnooutlier').prop('checked', false);
	$('#interval').prop('checked', false);
	$('#intervallim').prop('checked', false);
	$('#regression').prop('checked', false);
	$('#gridlinesshow').show();
	$('#removedpointsshow').show();
	$('#stripgraphshow').show();
	$('#var1label').html("Numerical 1:<br><small>required</small>");
	$('#var2label').html("Category 1:<br><small>required</small>");
	$('#var3label').html("");

	if(mm=='mean'){
		$('#boxplot').prop('checked', false);
		$('#meandot').prop('checked', true);
	}

	var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');

	//set size
	var width = $('#width').val();
	var height = $('#height').val();

	ctx.canvas.width = width;
	ctx.canvas.height = height;

	ctx.fillStyle = "#ffffff";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	//get points
	var xpoints = (dataforselector[$('#xvar option:selected').text()]).slice();
	var ypoints = (dataforselector[$('#yvar option:selected').text()]).slice();

	//check for numeric value
	var points=[];
	var allpoints=[];
	var pointsremoved=[];
	var pointsforminmax=[];
	for (var index in xpoints){
		if($.isNumeric(xpoints[index])){
			points.push(index);
			allpoints.push(index);
			pointsforminmax.push(xpoints[index]);
		} else {
			pointsremoved.push(add(index,1));
		}
	}

	if(points.length==0){
		return 'Error: You must select a numeric variable for "Numerical 1"';
	}

	if(ypoints.length>0){
		allydifferentgroups = split(allpoints,ypoints,2,2);
		if(typeof allydifferentgroups === 'object'){
			allygroups = Object.keys(allydifferentgroups);
			allygroups.sort(sortorder).reverse();
			for (index in allydifferentgroups){
				group = index;
				depoints=allydifferentgroups[index];
				for (index in depoints){
					point=depoints[index];
					ypoints[point]=group;
				}

			}
		} else {
			return allydifferentgroups;
		}
	} else {
		return 'Error: you must select a variable with only 2 values for "Category 1"';
	}

	if(pointsremoved.length!=0 && $('#removedpoints').is(":checked")){
		ctx.fillStyle = '#000000';
		fontsize = 13*scalefactor;
		ctx.font = fontsize+"px Roboto";
		ctx.textAlign="right";
		ctx.fillText("ID(s) of Points Removed: "+pointsremoved.join(", "),width-48*scalefactor,48*scalefactor);
	}

	var oypixel=height*0.5-60*scalefactor;
	var maxheight=height*0.25-60*scalefactor;
	var left=60*scalefactor;
	var right=width-60*scalefactor;

	xmin = Math.min.apply(null, pointsforminmax);
	xmax = Math.max.apply(null, pointsforminmax);
	if($.isNumeric($('#boxplotmin').val())){
		xmin=$('#boxplotmin').val();
	}
	if($.isNumeric($('#boxplotmax').val())){
		xmax=$('#boxplotmax').val();
	}
	
	//graph title
	ctx.fillStyle = '#000000';
	fontsize = 20*scalefactor;
	ctx.font = "bold "+fontsize+"px Roboto";
	ctx.textAlign="center";
	ctx.fillText($('#title').val(),width/2,30*scalefactor);

	//x-axis title
	ctx.fillStyle = '#000000';
	fontsize = 15*scalefactor;
	ctx.font = "bold "+fontsize+"px Roboto";
	ctx.textAlign="center";
	ctx.fillText($('#xaxis').val(),width/2,height*0.5-10*scalefactor);

	//y-axis title
	if($('#yaxis').val() != "Y Axis Title"){
		var x, y;
		x=20*scalefactor;
		y=height/4;
		ctx.save();
		ctx.fillStyle = '#000000';
		fontsize = 15*scalefactor;
		ctx.font = "bold "+fontsize+"px Roboto";
		ctx.translate(x, y);
		ctx.rotate(-Math.PI/2);
		ctx.textAlign = "center";
		ctx.fillText($('#yaxis').val(), 0, 0);
		ctx.restore();
	}

	var depoints=[];

	for (var index in allydifferentgroups){
		depoints[index]=[];
		thesepoints = allydifferentgroups[index];
		for (var p in thesepoints){
			zp = xpoints[thesepoints[p]];
			depoints[index].push(zp);
		}
	}

	medians=[];
	cnames=[];

	var i=0;
	for (var index in depoints){
		cnames[i] = index;
		if(mm=='median'){
			medians[i] = median(depoints[index]);
		} else {
			medians[i] = calculatemean(depoints[index]);
		}
		i++;
	}

	diff = parseFloat(Number(medians[0]-medians[1]).toPrecision(10));

	if(diff<0){
		diff=-diff;
		reverse=-1;
	} else {
		reverse=1;
	}
	
	var minmaxstep = axisminmaxstep(xmin,xmax);
	var minxtick=minmaxstep[0];
	var maxxtick=minmaxstep[1];
	var xstep=minmaxstep[2];
	
	// set up axis for bootstrap
	steps=(maxxtick-minxtick)/xstep;
	
	offset=minxtick+xstep*Math.floor(steps/2);
	offset=-offset;
	offset=Math.floor(offset/xstep);
	offset=xstep*offset;
	bottomminxtick=minxtick+offset;
	bottommaxxtick=maxxtick+offset;
	
	if(bottommaxxtick<diff){
		console.log(diff);
		maxxtick += Math.ceil((diff-bottommaxxtick)/xstep+1)*xstep;
		minxtick -= Math.ceil((diff-bottommaxxtick)/xstep+1)*xstep;
	}

	horaxis(ctx,left,right,add(oypixel,10*scalefactor),minxtick,maxxtick,xstep);

	var alpha = 1-$('#trans').val()/100;

	colors = makeblankcolors(xpoints.length,alpha);

	for (var index in allydifferentgroups){
		plotdotplot(ctx,allydifferentgroups[index],xpoints,minxtick,maxxtick,oypixel,left,right,maxheight,colors,2,1);
		ctx.fillStyle = '#000000';
		fontsize = 15*scalefactor;
		ctx.font = "bold "+fontsize+"px Roboto";
		ctx.textAlign="right";
		ctx.fillText(index,right+10,oypixel-maxheight/2);
		oypixel = oypixel-maxheight;
	}

	if(mm=='median'){
		if(reverse==1){
			title="Difference Between Medians (" + cnames[0] + " - " + cnames[1] + ")";
		} else {
			title="Difference Between Medians (" + cnames[1] + " - " + cnames[0] + ")";
		}
	} else {
		if(reverse==1){
			title="Difference Between Means (" + cnames[0] + " - " + cnames[1] + ")";
		} else {
			title="Difference Between Means (" + cnames[1] + " - " + cnames[0] + ")";
		}
	}

	//rerandomisation x-axis title
	ctx.fillStyle = '#000000';
	fontsize = 15*scalefactor;
	ctx.font = "bold "+fontsize+"px Roboto";
	ctx.textAlign="center";
	ctx.fillText(title,width/2,height-10*scalefactor);

	// create the rerandomisation

	rerandomiseddifs=[];
	num=points.length;
	b=0;
	while(b<1000){
		group1=[];
		group2=[];
		ypointsforthis = ypoints.slice();
		shuffle(ypointsforthis);
		for (index in points){
			point=points[index];
			xval=xpoints[point];
			group=ypointsforthis[point];
			if(cnames[0]==group){
				group1.push(xval);
			} else {
				group2.push(xval);
			}
		}
		if(mm=='median'){
			med1=median(group1);
			med2=median(group2);
		} else {
			med1=calculatemean(group1);
			med2=calculatemean(group2);

		}
		dif=(med1-med2)*reverse;
		dif = parseFloat(Number(dif).toPrecision(10));
		rerandomiseddifs.push(dif);
		b++;
	}

	colors = makererandcolors(alpha,rerandomiseddifs,diff);

	$('#boxplot').prop('checked', false);
	$('#meandot').prop('checked', false);

	bspoints=[];
	i=0;
	while(i<1000){
		bspoints.push(i);
		i++;
	}
	
	rerandomiseddifsforsort = rerandomiseddifs.slice();
	rerandomiseddifsforsort.sort(function(a, b){return a-b});
	
	// set up axis for bootstrap
	steps=(maxxtick-minxtick)/xstep;
	
	offset=minxtick+xstep*Math.floor(steps/2);
	offset=-offset;
	offset=Math.floor(offset/xstep);
	offset=xstep*offset;
	minxtick=minxtick+offset;
	maxxtick=maxxtick+offset;

	oypixel = height - 90*scalefactor;
	horaxis(ctx,left,right,add(oypixel,30*scalefactor),minxtick,maxxtick,xstep);

	maxheight=height*0.5-100*scalefactor;

	if($('#labels').is(":checked")){var waslabels="yes";} else {var waslabels = "no";}
	$('#labels')[0].checked=false;
	plotdotplot(ctx,bspoints,rerandomiseddifs,minxtick,maxxtick,oypixel,left,right,maxheight,colors,1,0);
	if(waslabels=="yes"){$('#labels')[0].checked=true;}
	
	y=oypixel-3*scalefactor;
	ctx.lineWidth = 2*scalefactor;
	ctx.strokeStyle = 'rgb(0,0,255)';
	ctx.fillStyle = '#0000ff';
	fontsize = 11*scalefactor;
	ctx.font = "bold "+fontsize+"px Roboto";
	ctx.textAlign = "center";
	diffpix=convertvaltopixel(diff,minxtick,maxxtick,left,right);
	zeropix=convertvaltopixel(0,minxtick,maxxtick,left,right);
	line(ctx,zeropix,y,diffpix,y);
	line(ctx,diffpix-5*scalefactor,y-5*scalefactor,diffpix,y);
	line(ctx,diffpix-5*scalefactor,add(y,5*scalefactor),diffpix,y);
	ctx.fillText(diff,diffpix,add(y,15*scalefactor));
	
	p=0;
	for (index in rerandomiseddifs){
		value = rerandomiseddifs[index];
		if(value<diff){
		} else {
			p++;
		}
	}
	
	line(ctx,diffpix,y+5*scalefactor,diffpix,y-maxheight);
	ctx.textAlign = "left";
	ctx.fillText("p",diffpix+5*scalefactor,y-maxheight+10*scalefactor);
	ctx.fillText("= "+p+"/1000",diffpix+15*scalefactor,y-maxheight+10*scalefactor);
	ctx.fillText("= "+(p/1000),diffpix+15*scalefactor,y-maxheight+20*scalefactor);
	ctx.fillText("= "+(p/10)+"%",diffpix+15*scalefactor,y-maxheight+30*scalefactor);

	labelgraph(ctx,width,height);

	var dataURL = canvas.toDataURL();
	return dataURL;
}

function shuffle(array) {
  var tmp, current, top = array.length;

  if(top) while(--top) {
    current = Math.floor(Math.random() * (top + 1));
    tmp = array[current];
    array[current] = array[top];
    array[top] = tmp;
  }

  return array;
}

function makererandcolors(alpha,rerandomiseddifs,odifference){
	var colors = [];
	i=0;
	for (index in rerandomiseddifs){
		value = rerandomiseddifs[index];
		if(value<odifference){
			color = 'rgba(80,80,80,'+alpha*0.4+')';
		} else {
			color = 'rgba(80,80,80,'+alpha+')';
		}
		colors.push(color);
	}
	return colors;
}

var currentrerandteachstep = 'presample';
var currentrerandteachypoints = [];
var currentrerandteachopoints = [];
var currentrerandteachygroups = [];
var currentrerandteachsample = {};
var currentrerandteachdiffs = [];
var currentrerandteachsamplepoints = [];
var currentrerandspeed = 'stopped';

var currentbsteachstep = 'presample';
var currentbsteachxpoints = [];
var currentbsteachypoints = [];
var currentbsteachopoints = [];
var currentbsteachygroups = [];
var currentbsteachsample = {};
var currentbsteachdiffs = [];
var currentbsteachsamplepoints = [];
var currentbsspeed = 'stopped';

var lastxpixel = 0;
var lastypixel = 0;
var lastkey = 0;

function newrerandteachstep(){
	
	if(typeof timer !== "undefined"){
		clearTimeout(timer);
	}

	var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');
	
	if(currentrerandspeed == 'stopped' && currentrerandteachstep!='presample'){
		var dataURL = canvas.toDataURL();
		return dataURL;
	}
	
	if(currentbsteachstep=='finished'){
		currentbsspeed = 'stopped';
	}

	//set size
	var width = $('#width').val();
	var height = $('#height').val();

	ctx.canvas.width = width;
	ctx.canvas.height = height;

	ctx.fillStyle = "#ffffff";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	//get points
	var xpoints = (dataforselector[$('#xvar option:selected').text()]).slice();
	var ypoints = (dataforselector[$('#yvar option:selected').text()]).slice();

	//check for numeric value
	var points=[];
	var allpoints=[];
	var pointsremoved=[];
	var pointsforminmax=[];
	for (var index in xpoints){
		if($.isNumeric(xpoints[index])){
			points.push(index);
			allpoints.push(index);
			pointsforminmax.push(xpoints[index]);
		} else {
			pointsremoved.push(add(index,1));
		}
	}

	if(points.length==0){
		return 'Error: You must select a numeric variable for "Numerical 1"';
	}

	if(ypoints.length>0){
		allydifferentgroups = split(allpoints,ypoints,2,2);
		if(typeof allydifferentgroups === 'object'){
			for (index in allydifferentgroups){
				group = index;
				depoints=allydifferentgroups[index];
				for (index in depoints){
					point=depoints[index];
					ypoints[point]=group;
				}

			}
		} else {
			return allydifferentgroups;
		}
	} else {
		return 'Error: you must select a variable with only 2 values for "Category 1"';
	}

	if(pointsremoved.length!=0 && $('#removedpoints').is(":checked")){
		ctx.fillStyle = '#000000';
		fontsize = 13*scalefactor;
		ctx.font = fontsize+"px Roboto";
		ctx.textAlign="right";
		ctx.fillText("ID(s) of Points Removed: "+pointsremoved.join(", "),width-48*scalefactor,48*scalefactor);
	}

	var oypixel=height*0.3-60*scalefactor;
	var maxheight=height*0.3-160*scalefactor;
	var left=60*scalefactor;
	var right=width-60*scalefactor;

	//Original Data Title
	ctx.fillStyle = '#000000';
	fontsize = 20*scalefactor;
	ctx.font = "bold "+fontsize+"px Roboto";
	ctx.textAlign="left";
	ctx.fillText('Original Data',30*scalefactor,30*scalefactor);

	//This Randomisation Title
	ctx.fillStyle = '#000000';
	fontsize = 20*scalefactor;
	ctx.font = "bold "+fontsize+"px Roboto";
	ctx.textAlign="left";
	ctx.fillText('This Randomisation',30*scalefactor,height*0.3+30*scalefactor);

	//Re-randomisation distribution
	ctx.fillStyle = '#000000';
	fontsize = 20*scalefactor;
	ctx.font = "bold "+fontsize+"px Roboto";
	ctx.textAlign="left";
	ctx.fillText('Re-randomisation Distribution',30*scalefactor,height*0.6+30*scalefactor);

	xmin = Math.min.apply(null, pointsforminmax);
	xmax = Math.max.apply(null, pointsforminmax);
	if($.isNumeric($('#boxplotmin').val())){
		xmin=$('#boxplotmin').val();
	}
	if($.isNumeric($('#boxplotmax').val())){
		xmax=$('#boxplotmax').val();
	}

	//x-axis title
	ctx.fillStyle = '#000000';
	fontsize = 15*scalefactor;
	ctx.font = "bold "+fontsize+"px Roboto";
	ctx.textAlign="center";
	ctx.fillText($('#xaxis').val(),width/2,height*0.3-10*scalefactor);

	//y-axis title
	if($('#yaxis').val() != "Y Axis Title"){
		var x, y;
		x=20*scalefactor;
		y=height*0.15;
		ctx.save();
		ctx.fillStyle = '#000000';
		fontsize = 15*scalefactor;
		ctx.font = "bold "+fontsize+"px Roboto";
		ctx.translate(x, y);
		ctx.rotate(-Math.PI/2);
		ctx.textAlign = "center";
		ctx.fillText($('#yaxis').val(), 0, 0);
		ctx.restore();
	}

	//x-axis title
	ctx.fillStyle = '#000000';
	fontsize = 15*scalefactor;
	ctx.font = "bold "+fontsize+"px Roboto";
	ctx.textAlign="center";
	ctx.fillText($('#xaxis').val(),width/2,height*0.6-10*scalefactor);

	//y-axis title
	if($('#yaxis').val() != "Y Axis Title"){
		var x, y;
		x=20*scalefactor;
		y=height*0.45;
		ctx.save();
		ctx.fillStyle = '#000000';
		fontsize = 15*scalefactor;
		ctx.font = "bold "+fontsize+"px Roboto";
		ctx.translate(x, y);
		ctx.rotate(-Math.PI/2);
		ctx.textAlign = "center";
		ctx.fillText($('#yaxis').val(), 0, 0);
		ctx.restore();
	}

	var depoints=[];

	for (var index in allydifferentgroups){
		depoints[index]=[];
		thesepoints = allydifferentgroups[index];
		for (var p in thesepoints){
			zp = xpoints[thesepoints[p]];
			depoints[index].push(zp);
		}
	}

	medians=[];
	cnames=[];

	var i=0;
	for (var index in depoints){
		cnames[i] = index;
		medians[i] = median(depoints[index]);
		i++;
	}

	diff = parseFloat(Number(medians[0]-medians[1]).toPrecision(10));

	if(diff<0){
		diff=-diff;
		reverse=-1;
	} else {
		reverse=1;
	}
	odiff = diff;
	
	var minmaxstep = axisminmaxstep(xmin,xmax);
	var minxtick=minmaxstep[0];
	var maxxtick=minmaxstep[1];
	var xstep=minmaxstep[2];
	
	// set up axis for bootstrap
	steps=(maxxtick-minxtick)/xstep;
	
	offset=minxtick+xstep*Math.floor(steps/2);
	offset=-offset;
	offset=Math.floor(offset/xstep);
	offset=xstep*offset;
	bottomminxtick=minxtick+offset;
	bottommaxxtick=maxxtick+offset;
	
	if(bottommaxxtick<diff){
		maxxtick += Math.ceil((diff-bottommaxxtick)/xstep+1)*xstep;
		minxtick -= Math.ceil((diff-bottommaxxtick)/xstep+1)*xstep;
	}

	horaxis(ctx,left,right,add(oypixel,10*scalefactor),minxtick,maxxtick,xstep);
	horaxis(ctx,left,right,add(oypixel+height*0.3,10*scalefactor),minxtick,maxxtick,xstep);

	var alpha = 1-$('#trans').val()/100;

	colors = makecolors(alpha,ctx);

	for (var index in allydifferentgroups){
		plotdotplot(ctx,allydifferentgroups[index],xpoints,minxtick,maxxtick,oypixel,left,right,maxheight,colors,2,1);
		ctx.fillStyle = '#000000';
		fontsize = 15*scalefactor;
		ctx.font = "bold "+fontsize+"px Roboto";
		ctx.textAlign="right";
		ctx.fillText(index,right+10,oypixel-maxheight/2);
		oypixel = oypixel-maxheight;
	}
	
	ctx.lineWidth = 2*scalefactor;
	ctx.strokeStyle = 'rgb(0,0,255)';
	y = height*0.15+5*scalefactor;
	if(reverse==1){
		med1=medians[1];
		med2=medians[0];
	} else {
		med2=medians[1];
		med1=medians[0];
	}
	leftxpixel = convertvaltopixel(med1,minxtick,maxxtick,left,right);
	rightxpixel = convertvaltopixel(med2,minxtick,maxxtick,left,right);
	line(ctx,leftxpixel,y,rightxpixel,y);
	line(ctx,rightxpixel-5*scalefactor,y-5*scalefactor,rightxpixel,y);
	line(ctx,rightxpixel-5*scalefactor,add(y,5*scalefactor),rightxpixel,y);
	
	// Create this randomisation
	if(currentrerandteachstep=='presample'){
		currentrerandteachsamplepoints = allpoints.slice();
		currentrerandteachsample = {};
		currentrerandteachygroups = [];
		currentrerandteachypoints = ypoints.slice();
		shuffle(currentrerandteachypoints);
		currentrerandteachopoints = currentrerandteachypoints.slice();
		for (var index in allydifferentgroups){
			currentrerandteachsample[index]=[];
			currentrerandteachygroups.push(index);
		}
		currentrerandteachygroups.sort();
		if(currentrerandspeed != 'stopped'){
			currentrerandteachstep='sample';
		}
		lastkey = -1;
	}
	
	if(currentrerandteachstep=='sample' && (currentrerandspeed=='restfast' || currentrerandspeed=='restmedium' || currentrerandspeed=='restslow')){
		currentrerandteachsample = split(allpoints,currentrerandteachopoints,2,2);
		currentrerandteachstep = 'plotdifference';
	}
	
	if(currentrerandteachstep=='calcdifference' || currentrerandteachstep=='plotdifference'){
		$('#boxplot').prop('checked', true);
		// plot arrow on middle graph
		ctx.lineWidth = 2*scalefactor;
		ctx.strokeStyle = 'rgb(255,0,0)';
		y = height*0.45+5*scalefactor;
		group1=[];
		group2=[];
		for (index in points){
			point=points[index];
			xval=xpoints[point];
			group=currentrerandteachopoints[point];
			if(cnames[0]==group){
				group1.push(xval);
			} else {
				group2.push(xval);
			}
		}
		if(reverse==1){
			med1=median(group2);
			med2=median(group1);
		} else {
			med1=median(group1);
			med2=median(group2);
		}
		leftxpixel = convertvaltopixel(med1,minxtick,maxxtick,left,right);
		rightxpixel = convertvaltopixel(med2,minxtick,maxxtick,left,right);
		if(leftxpixel<rightxpixel){
			line(ctx,leftxpixel,y,rightxpixel,y);
			line(ctx,rightxpixel-5*scalefactor,y-5*scalefactor,rightxpixel,y);
			line(ctx,rightxpixel-5*scalefactor,add(y,5*scalefactor),rightxpixel,y);
		} else {
			line(ctx,leftxpixel,y,rightxpixel,y);
			line(ctx,rightxpixel+5*scalefactor,y-5*scalefactor,rightxpixel,y);
			line(ctx,rightxpixel+5*scalefactor,add(y,5*scalefactor),rightxpixel,y);
		}
	}
	
	
	if(currentrerandteachstep=='plotdifference'){	
		diff = med2-med1;
		currentrerandteachdiffs.push(diff);
		$('#rerandteachremaining').html($('#rerandteachremaining').html()-1);
	}
	
	// Add point to this sample
	if(currentrerandteachstep=='sample'){
		$('#boxplot').prop('checked', false);
		thispoint = currentrerandteachsamplepoints.shift();
		thisgroup = currentrerandteachypoints.shift();
		currentrerandteachsample[thisgroup].push(thispoint);
	}
	
	// graph this randomisation
	lastpoint = -1;
	var oypixel=height*0.6-60*scalefactor;
	for (var index in currentrerandteachsample){
		plotdotplot(ctx,currentrerandteachsample[index],xpoints,minxtick,maxxtick,oypixel,left,right,maxheight,colors,2,1);
		if(highestkey>lastpoint){
			lastpoint = highestkey;
			ypixel = lastypixel;
			if(ypixel<120){
				console.log(ypixel)
				return;
			}
		}
		ctx.fillStyle = '#000000';
		fontsize = 15*scalefactor;
		ctx.font = "bold "+fontsize+"px Roboto";
		ctx.textAlign="right";
		ctx.fillText(index,right+10,oypixel-maxheight/2);
		oypixel = oypixel-maxheight;
	}
	
	// draw dropdown line
	if(currentrerandteachstep=='sample'){
		xpixel = convertvaltopixel(xpoints[thispoint],minxtick,maxxtick,left,right);
		ctx.lineWidth = 2*scalefactor;
		ctx.strokeStyle = 'rgb(255,0,0)';
		ytop = height*0.3-85*scalefactor-maxheight/2+currentrerandteachygroups.indexOf(ypoints[thispoint])*maxheight;
		ybottom = ypixel-5*scalefactor;
		line(ctx,xpixel,ytop,xpixel,ybottom);
		line(ctx,xpixel-5*scalefactor,ybottom-5*scalefactor,xpixel,ybottom);
		line(ctx,xpixel+5*scalefactor,ybottom-5*scalefactor,xpixel,ybottom);
		if(currentrerandteachsamplepoints.length==0){
			currentrerandteachstep = 'calcdifference';
		}
	}

	if(reverse==1){
		title="Difference Between Medians (" + cnames[0] + " - " + cnames[1] + ")";
	} else {
		title="Difference Between Medians (" + cnames[1] + " - " + cnames[0] + ")";
	}

	//rerandomisation x-axis title
	ctx.fillStyle = '#000000';
	fontsize = 15*scalefactor;
	ctx.font = "bold "+fontsize+"px Roboto";
	ctx.textAlign="center";
	ctx.fillText(title,width/2,height-10*scalefactor);

	
	// set up axis for bootstrap
	steps=(maxxtick-minxtick)/xstep;
	
	offset=minxtick+xstep*Math.floor(steps/2);
	offset=-offset;
	offset=Math.floor(offset/xstep);
	offset=xstep*offset;
	minxtick=minxtick+offset;
	maxxtick=maxxtick+offset;

	oypixel = height - 75*scalefactor;
	horaxis(ctx,left,right,add(oypixel,15*scalefactor),minxtick,maxxtick,xstep);

	maxheight=height*0.4-120*scalefactor;
	
	bspoints=[];
	i=0;
	while(i<currentrerandteachdiffs.length){
		bspoints.push(i);
		i++;
	}
	if(currentrerandteachstep=='finished'){
		diff = odiff;
		colors = makererandcolors(alpha,currentrerandteachdiffs,diff);	
	} else {
		colors = makeblankcolors(currentrerandteachdiffs.length,alpha);
	}
	$('#boxplot').prop('checked', false);
	$('#meandot').prop('checked', false);
	plotdotplot(ctx,bspoints,currentrerandteachdiffs,minxtick,maxxtick,oypixel,left,right,maxheight,colors,1,0);
	ypixel = lastypixel;
	
	if(currentrerandteachstep=='plotdifference'){
		// plot arrow on bottom graph
		ctx.lineWidth = 2*scalefactor;
		ctx.strokeStyle = 'rgb(255,0,0)';
		y = ypixel;
		offset=minxtick+xstep*Math.floor(steps/2);
		offset=-offset;
		offset=Math.floor(offset/xstep);
		offset=xstep*offset;
		diffpix=convertvaltopixel(diff,minxtick+offset,maxxtick+offset,left,right);
		zeropix=convertvaltopixel(0,minxtick+offset,maxxtick+offset,left,right);
		if(zeropix<diffpix){
			line(ctx,zeropix,y,diffpix,y);
			line(ctx,diffpix-5*scalefactor,y-5*scalefactor,diffpix,y);
			line(ctx,diffpix-5*scalefactor,add(y,5*scalefactor),diffpix,y);
		} else {
			line(ctx,zeropix,y,diffpix,y);
			line(ctx,diffpix+5*scalefactor,y-5*scalefactor,diffpix,y);
			line(ctx,diffpix+5*scalefactor,add(y,5*scalefactor),diffpix,y);
		}
	}
	
	if(currentrerandteachstep=='finished'){
		y=oypixel-3*scalefactor;
		ctx.lineWidth = 2*scalefactor;
		ctx.strokeStyle = 'rgb(0,0,255)';
		ctx.fillStyle = '#0000ff';
		fontsize = 11*scalefactor;
		ctx.font = "bold "+fontsize+"px Roboto";
		ctx.textAlign = "center";
		diffpix=convertvaltopixel(diff,minxtick,maxxtick,left,right);
		zeropix=convertvaltopixel(0,minxtick,maxxtick,left,right);
		line(ctx,zeropix,y,diffpix,y);
		line(ctx,diffpix-5*scalefactor,y-5*scalefactor,diffpix,y);
		line(ctx,diffpix-5*scalefactor,add(y,5*scalefactor),diffpix,y);
		ctx.fillText(diff,diffpix,add(y,15*scalefactor));
		
		p=0;
		for (index in currentrerandteachdiffs){
			value = currentrerandteachdiffs[index];
			if(value<diff){
			} else {
				p++;
			}
		}
		
		line(ctx,diffpix,y+5*scalefactor,diffpix,y-maxheight);
		ctx.textAlign = "left";
		ctx.fillText("p",diffpix+5*scalefactor,y-maxheight+10*scalefactor);
		ctx.fillText("= "+p+"/1000",diffpix+15*scalefactor,y-maxheight+10*scalefactor);
		ctx.fillText("= "+(p/1000),diffpix+15*scalefactor,y-maxheight+20*scalefactor);
		ctx.fillText("= "+(p/10)+"%",diffpix+15*scalefactor,y-maxheight+30*scalefactor);
	}
	
	if($('#rerandteachremaining').html()==0){
		currentrerandteachstep='finished';
		currentrerandteachsample = {};
	}
	
	if(currentrerandteachstep=='plotdifference'){
		currentrerandteachstep='presample';
	}
	
	if(currentrerandteachstep=='calcdifference'){
		currentrerandteachstep='plotdifference';
	}
	
	if(currentrerandspeed=='oneslow'){
		if(currentrerandteachstep=='presample'){
			animate = false;
			currentrerandspeed = 'stopped';
		} else {
			timer = setTimeout(updategraph,1000);
		}
	}
	
	if(currentrerandspeed=='onefast'){
		if(currentrerandteachstep=='presample'){
			animate = false;
			currentrerandspeed = 'stopped';
		} else {
			timer = setTimeout(updategraph,100);
		}
	}
	
	if(currentrerandspeed=='restslow'){
		timer = setTimeout(updategraph,200);
	}
	
	if(currentrerandspeed=='restmedium'){
		timer = setTimeout(updategraph,50);
	}
	
	if(currentrerandspeed=='restfast'){
		timer = setTimeout(updategraph,0);
	}

	labelgraph(ctx,width,height);

	var dataURL = canvas.toDataURL();
	return dataURL;
}

function newrerandteach(){
	$('#xvar').show();
	$('#yvar').show();
	$('#thicklinesshow').show();
	$('#transdiv').show();
	$('#sizediv').show();
	$('#greyscaleshow').show();
	$('#stackdotsshow').show();
	$('#pointsizename').html('Point Size:');
	$('#boxplot').prop('checked', true);
	$('#meandot').prop('checked', false);
	$('#highboxplot').prop('checked', false);
	$('#boxnowhisker').prop('checked', false);
	$('#boxnooutlier').prop('checked', false);
	$('#interval').prop('checked', false);
	$('#intervallim').prop('checked', false);
	$('#regression').prop('checked', false);
	$('#gridlinesshow').show();
	$('#removedpointsshow').show();
	$('#var1label').html("Numerical 1:<br><small>required</small>");
	$('#var2label').html("Category 1:<br><small>required</small>");
	document.getElementById("color").selectedIndex != document.getElementById("yvar").selectedIndex;
	return newrerandteachstep();
}

function newbargraphf(){
	return newbargraphfnf('f');
}

function newbargraph(){
	return newbargraphfnf('nf');
}

function newbargraphfnf(fnf){
	$('#invertshow').show();
	$('#regshow').show();
	$('#sum').show();
	$('#xvar').show();
	$('#yvar').show();
	$('#color').show();
	$('#colorname').show();
	$('#transdiv').show();
	$('#greyscaleshow').show();
	$('#gridlinesshow').show();
	$('#removedpointsshow').show();
	$('#percent100show').show();
	$('#relativefrequencyshow').show();
	$('#relativewidthshow').show();
	$('#var1label').html("Category:<br><small>required</small>");
	
	if(fnf=='f'){
		$('#var2label').html("Frequency:<br><small>required</small>");
		$('#var3label').html("Split:<br><small>optional</small>");	
		$('#zvar').show();
	} else {
		$('#var2label').html("Split:<br><small>optional</small>");	
		$('#var3label').html("");	
	}

	var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');

	//set size
	var width = $('#width').val();
	var height = $('#height').val();

	ctx.canvas.width = width;
	ctx.canvas.height = height;

	ctx.fillStyle = "#ffffff";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	//get points
	var xpoints = (dataforselector[$('#xvar option:selected').text()]).slice();

	//check x points for number of groups
	if(xpoints.length==0){
		return 'Error: You must select a variable for "Category"';
	}
	
	if(fnf=='f'){
		var ypoints = (dataforselector[$('#yvar option:selected').text()]).slice();
		var zpoints = (dataforselector[$('#zvar option:selected').text()]).slice();
		
		//check for numeric value
		var points=[];
		var allpoints=[];
		var pointsremoved=[];
		for (var index in ypoints){
			if($.isNumeric(ypoints[index])){
				points.push(index);
				allpoints.push(index);
			} else {
				pointsremoved.push(add(index,1));
			}
		}

		if(points.length==0){
			return 'Error: You must select a numeric variable for "Frequency"';
		}
		
	} else {
		var zpoints = (dataforselector[$('#yvar option:selected').text()]).slice();
		
		//add all points as 1
		var points=[];
		var allpoints=[];
		var pointsremoved=[];
		var ypoints=[];
		for (var index in xpoints){
			points.push(index);
			allpoints.push(index);
			ypoints.push(1);
		}
		
	}
	
	var colorpoints = dataforselector[$('#color option:selected').text()].slice();
	
	xdifferentgroups = split(points,xpoints,10,'"Category"');
	if(typeof xdifferentgroups !== 'object'){
		return xdifferentgroups;
	}
	xgroups = Object.keys(xdifferentgroups).sort(sortorder);

	if(pointsremoved.length!=0 && $('#removedpoints').is(":checked")){
		ctx.fillStyle = '#000000';
		fontsize = 13*scalefactor;
		ctx.font = fontsize+"px Roboto";
		ctx.textAlign="right";
		ctx.fillText("ID(s) of Points Removed: "+pointsremoved.join(", "),width-48*scalefactor,48*scalefactor);
	}
	
	relativefrequency = false;
	if($('#relativefrequency').is(":checked")){
		relativefrequency = true;
		$("#percent100"). prop("checked", false);
	}
	
	relativewidth = false;
	if($('#relativewidth').is(":checked")){
		relativewidth = true;
		$("#percent100"). prop("checked", true);
	}
	
	percent100 = false;
	if($('#percent100').is(":checked")){
		percent100 = true;
	}

	var oypixel=60*scalefactor;
	var maxheight=height-60*scalefactor;
	var left=20*scalefactor;
	var right=width-60*scalefactor;

	ymin = 0;
	ymax = 0;
	total = 0;
	
	sumpoints = {};
	
	if(zpoints.length>0){
		zdifferentgroups = split(points,zpoints,4,'"Split"');
		if(typeof zdifferentgroups === 'object'){
			zgroups = Object.keys(zdifferentgroups);
			zgroups.sort(sortorder);
			for (z in zgroups){
				zgroup = zgroups[z];
				zgrouppoints = zdifferentgroups[zgroup];
				for(x in xgroups){
					xgroup = xgroups[x];
					for (i in xdifferentgroups[xgroup]){
						index = xdifferentgroups[xgroup][i];
						if($.inArray(index,zgrouppoints)>-1){
							cat = xgroup+'-~-'+zgroup;
							val = ypoints[index];
							if(sumpoints[cat] === undefined){
								sumpoints[cat]=0;
							}
							sumpoints[cat]-=(-val);
						}	
					}
				}
			}
		} else {
			return zdifferentgroups;
		}
	} else {
		for(g in xgroups){
			for (i in xdifferentgroups[xgroups[g]]){
				index = xdifferentgroups[xgroups[g]][i];
				cat = xgroups[g];
				val = ypoints[index];
				if(sumpoints[cat] === undefined){
					sumpoints[cat]=0;
				}
				sumpoints[cat]-=(-val);
			}
		}
	}
	
	for(index in sumpoints){
		total += sumpoints[index];
		if(sumpoints[index]>ymax){
			ymax = sumpoints[index];
		}
	}
	
	if(relativefrequency){
		ymax = ymax / total;
	}
	
	if(percent100){
		ymax = 100;
	}
	
	var minmaxstep = axisminmaxstep(ymin,ymax);
	var minytick=minmaxstep[0];
	var maxytick=minmaxstep[1];
	var ystep=minmaxstep[2];

	var alpha = 1-$('#trans').val()/100;
	var colors = makecolors(alpha,ctx);
	

	if(zpoints.length>0){
		zgroups = Object.keys(zdifferentgroups);
		zgroups.sort(sortorder);
		thistop=60*scalefactor;
		eachheight=maxheight/zgroups.length;
		for (index in zgroups){
			group = zgroups[index];
			points = zdifferentgroups[group];

			thisbottom = add(thistop,eachheight);

			ctx.fillStyle = '#000000';
			fontsize = 15*scalefactor;
			ctx.font = "bold "+fontsize+"px Roboto";
			ctx.textAlign="left";
			ctx.fillText(group,left,thistop-15*scalefactor);
			
			var error = plotbargraph(ctx,left,right,thistop,minytick,maxytick,ystep,eachheight,points,xdifferentgroups,ypoints,colors,xgroups,colorpoints,relativefrequency,total,percent100,sumpoints,group,relativewidth);
			if(error != 'good'){return error;}
			
			thistop = add(thistop,eachheight);
		}
	} else {
		var error = plotbargraph(ctx,left,right,oypixel,minytick,maxytick,ystep,maxheight,points,xdifferentgroups,ypoints,colors,xgroups,colorpoints,relativefrequency,total,percent100,sumpoints,'~nogroup~',relativewidth);
		if(error != 'good'){return error;}
	}

	//graph title
	ctx.fillStyle = '#000000';
	fontsize = 20*scalefactor;
	ctx.font = "bold "+fontsize+"px Roboto";
	ctx.textAlign="center";
	ctx.fillText($('#title').val(),width/2,30*scalefactor);

	//x-axis title
	ctx.fillStyle = '#000000';
	fontsize = 15*scalefactor;
	ctx.font = "bold "+fontsize+"px Roboto";
	ctx.textAlign="center";
	ctx.fillText($('#xaxis').val(),width/2,height-10*scalefactor);

	labelgraph(ctx,width,height);
	if($('#invert').is(":checked")){
		invert(ctx)
	}

	var dataURL = canvas.toDataURL();
	return dataURL;
}

function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

function plotbargraph(ctx,left,right,gtop,minytick,maxytick,ystep,maxheight,points,groups,frequencys,colors,xgroups,colorpoints,relativefrequency,total,percent100,sumpoints,zgroup,relativewidth){
	
	uniquecolors = colorpoints.filter( onlyUnique ).sort(sortorder);
	if(uniquecolors.length==0){uniquecolors=[''];}
	
	maxheight = maxheight - 60*scalefactor;
	
	gbottom = add(gtop,maxheight);
	
	//y-axis title
	if($('#yaxis').val() != "Y Axis Title"){
		var x, y;
		x=20*scalefactor;
		y=gtop + maxheight/2;
		ctx.save();
		ctx.fillStyle = '#000000';
		fontsize = 15*scalefactor;
		ctx.font = "bold "+fontsize+"px Roboto";
		ctx.translate(x, y);
		ctx.rotate(-Math.PI/2);
		ctx.textAlign = "center";
		ctx.fillText($('#yaxis').val(), 0, 0);
		ctx.restore();
	}
	
	append = '';
	if(percent100){append = '%';}
	
	vertaxis(ctx,gtop,gbottom,add(left,50*scalefactor),minytick,maxytick,ystep,right,append);
	
	line(ctx,add(left,50*scalefactor),gbottom,right,gbottom);
	
	stepsize = (right - add(left,50*scalefactor))/xgroups.length;
	
	thisleft = add(left,50*scalefactor);
	
	ctx.fillStyle = '#000000';
	fontsize = 13*scalefactor;
	ctx.font = fontsize+"px Roboto";
	ctx.textAlign="center";
	
	for (var index in xgroups){
		addforboxleft = 0.1;
		rectanglesize = 0.8;
		group = xgroups[index];
		if(relativewidth){
			if(zgroup!='~nogroup~'){
				selectgroup = group + '-~-' + zgroup;
			} else {
				selectgroup = group;
			}
			stepsize = (right - add(left,50*scalefactor))*sumpoints[selectgroup]/total;
			thisright = add(thisleft,stepsize);
			addforboxleft = 0;
			rectanglesize = 1;
		}
		thisright = add(thisleft,stepsize);
		line(ctx,thisright,gbottom,thisright,add(gbottom,10));
		thiscenter = add(thisleft,thisright)/2;
		ctx.fillStyle = '#000000';
		ctx.fillText(group,thiscenter,add(gbottom,15));
		gtotal = 0;
		boxbottom = gbottom;
		boxtop = boxbottom;
		colordesc = "";
		for(c in uniquecolors){
			thistotal = 0;
			colorname = uniquecolors[c];
			for(p in groups[group]){
				i = groups[group][p];
				if(colorname == colorpoints[i] || uniquecolors.length==1){
					if($.inArray(i,points)>-1){
						thistotal -= -frequencys[i];
						if(colorpoints.length>0){
							colordesc = '<b>'+$('#colorlabel').val()+'</b>: '+colorpoints[i]+'<br>';
						}
						color = colors[i];
					}
				}
			}
			displaytotal = thistotal;
			if(relativefrequency){
				displaytotal = displaytotal/total;
			}
			if(percent100){
				if(zgroup!='~nogroup~'){
					selectgroup = group + '-~-' + zgroup;
				} else {
					selectgroup = group;
				}
				displaytotal = displaytotal/sumpoints[selectgroup]*100;
			}
			
			if(thistotal>0){
				gtotal += displaytotal;
				boxtop = convertvaltopixel(gtotal,minytick,maxytick,gbottom,gtop);
				boxleft = add(thisleft,stepsize*addforboxleft);
				ctx.fillStyle = color;
				ctx.fillRect(boxleft,boxbottom,stepsize*rectanglesize,boxtop-boxbottom);
				ctx.lineWidth = 1*scalefactor;
				ctx.strokeStyle = 'rgba(0,0,0,1)';
				ctx.rect(boxleft,boxbottom,stepsize*rectanglesize,boxtop-boxbottom);
				ctx.stroke();
				ctx.fillStyle = '#000000';
				if(relativefrequency){
					displaytotal = Number.parseFloat(displaytotal.toPrecision(5));
				}
				if(percent100){
					displaytotal = displaytotal.toFixed(1)+"%";
				}
				if(thistotal == displaytotal){
					title = '<b>'+$('#xaxis').val()+'</b>: '+xgroups[index]+'</b><br>'+colordesc+'<b>n</b>: '+ thistotal;
				} else {
					title = '<b>'+$('#xaxis').val()+'</b>: '+xgroups[index]+'</b><br>'+colordesc+'<b>n</b>: '+ thistotal + " (" + displaytotal + ")";
				}
				$('#graphmap').append("<area shape='rect' coords='"+(boxleft/scalefactor)+","+(boxtop/scalefactor)+","+(add(boxleft,stepsize*rectanglesize)/scalefactor)+","+(boxbottom/scalefactor)+"' desc='"+title+"'>");
				if($('#regression').is(":checked")){
					ctx.fillText(displaytotal,thiscenter,(boxtop+boxbottom)/2+4.5*scalefactor);
				}
			}
			boxbottom = boxtop;
		}
		thisleft = thisright;
	}
	
	ctx.lineWidth = 2*scalefactor;
	if($('#thicklines').is(":checked")){
		ctx.lineWidth = 5*scalefactor;
	}
	return 'good';
}

function newhistogramf(){
	return newhistogramfnf('f');
}

function newhistogram(){
	return newhistogramfnf('nf');
}

function newhistogramfnf(fnf){
	$('#invertshow').show();
	$('#regshow').show();
	$('#sum').show();
	$('#xvar').show();
	$('#yvar').show();
	$('#transdiv').show();
	$('#greyscaleshow').show();
	$('#gridlinesshow').show();
	$('#removedpointsshow').show();
	$('#relativefrequencyshow').show();
	$('#var1label').html("Numerical:<br><small>required</small>");
	$('#sizediv').show();
	$('#pointsizename').html('Intervals:');
	$('#highboxplotshow').show();
	$('#normalshow').show();
	$('#poissonshow').show();
	$('#binomialshow').show();
	$('#rectangularshow').show();
	$('#triangularshow').show();
	
	if(fnf=='f'){
		$('#var2label').html("Frequency:<br><small>required</small>");
		$('#var3label').html("Split:<br><small>optional</small>");	
		$('#zvar').show();
	} else {
		$('#var2label').html("Split:<br><small>optional</small>");	
		$('#var3label').html("");	
	}

	var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');

	//set size
	var width = $('#width').val();
	var height = $('#height').val();

	ctx.canvas.width = width;
	ctx.canvas.height = height;

	ctx.fillStyle = "#ffffff";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	//get points
	var xpoints = (dataforselector[$('#xvar option:selected').text()]).slice();
	
	if(fnf=='f'){
		// still need to check from here to the end of this if
		var ypoints = (dataforselector[$('#yvar option:selected').text()]).slice();
		var zpoints = (dataforselector[$('#zvar option:selected').text()]).slice();
		
		//check for numeric value
		var points=[];
		var allpoints=[];
		var pointsremoved=[];
		var pointsforminmax=[];
		for (var index in ypoints){
			if($.isNumeric(ypoints[index]) && $.isNumeric(xpoints[index])){
				points.push(index);
				allpoints.push(index);
				pointsforminmax.push(xpoints[index]);
			} else {
				pointsremoved.push(add(index,1));
			}
		}

		if(points.length==0){
			return 'Error: You must select a numeric variable for "Frequency"';
		}
		
	} else {
		var zpoints = (dataforselector[$('#yvar option:selected').text()]).slice();
		
		//add all points as 1
		var points=[];
		var allpoints=[];
		var pointsremoved=[];
		var ypoints=[];
		var pointsforminmax=[];
		for (var index in xpoints){
			ypoints.push(1);
			if($.isNumeric(xpoints[index])){
				points.push(index);
				allpoints.push(index);
				pointsforminmax.push(xpoints[index]);
			} else {
				pointsremoved.push(add(index,1));
			}
		}
		
	}

	//check x points for numerical
	if(points.length==0){
		return 'Error: You must select a variable for "Numerical"';
	}

	if(pointsremoved.length!=0 && $('#removedpoints').is(":checked")){
		ctx.fillStyle = '#000000';
		fontsize = 13*scalefactor;
		ctx.font = fontsize+"px Roboto";
		ctx.textAlign="right";
		ctx.fillText("ID(s) of Points Removed: "+pointsremoved.join(", "),width-48*scalefactor,48*scalefactor);
	}
	
	xdifferentgroups = split(points,xpoints,10,'"Numerical"');
	if(typeof xdifferentgroups !== 'object'){
		return xdifferentgroups;
	}
	xgroups = Object.keys(xdifferentgroups).sort(sortorder);
	
	
	min=Math.min.apply(null, pointsforminmax);
	max=Math.max.apply(null, pointsforminmax);
	
	if(min==max){
		min=add(xmin,1);
		max=add(xmax,1);
	}
	
	intervals=$('#size').val();
	step = Number.parseFloat(((max-min)/intervals).toPrecision(8));
	stepfirstsf = Number.parseFloat(step.toPrecision(1)).toExponential().substr(0,1);
	stepfirsttwosf = Number.parseFloat(step.toPrecision(2)).toExponential().substr(0,3);
	if(stepfirsttwosf.includes("e")){
		stepfirsttwosf = stepfirstsf;
	}
	
	if(stepfirsttwosf>=1 && stepfirsttwosf<2.3){step = Number.parseFloat(step.toPrecision(1))}
	else if(stepfirsttwosf>=2.3 && stepfirsttwosf<3.5){step = (step/stepfirsttwosf).toPrecision(1)*2.5}
	else if(stepfirsttwosf>=3.5 && stepfirsttwosf<7.5){step = (step/stepfirsttwosf).toPrecision(1)*5}
	else {step = (step/stepfirsttwosf).toPrecision(1)*10}
	xstep = Number.parseFloat(step.toPrecision(8));
	
	xmin = (min/xstep).toFixed(0)*xstep;
	if(xmin>min){xmin-=xstep;}
	xmax = (max/xstep).toFixed(0)*xstep;
	if(xmax<=max){xmax-=-xstep;}
	
	xsteps = ((xmax-xmin)/xstep).toFixed(0);
	
	xdifferentgroups={};
	for (var index in points){
		index = points[index];
		value = xpoints[index];
		leftofvalue = Number.parseFloat((Math.floor(value/xstep)*xstep).toPrecision(8));
		if(xdifferentgroups[leftofvalue] === undefined){
			xdifferentgroups[leftofvalue]=[];
		}
		xdifferentgroups[leftofvalue].push(index)
	}

	xgroups = Object.keys(xdifferentgroups).sort(sortorder);
	
	relativefrequency = false;
	if($('#relativefrequency').is(":checked")){
		relativefrequency = true;
	}

	var oypixel=60*scalefactor;
	var maxheight=height-60*scalefactor;
	var left=20*scalefactor;
	var right=width-60*scalefactor;

	ymin = 0;
	ymax = 0;
	total = 0;
	
	sumpoints = {};
	
	if(zpoints.length>0){
		zdifferentgroups = split(points,zpoints,4,'"Split"');
		if(typeof zdifferentgroups === 'object'){
			zgroups = Object.keys(zdifferentgroups);
			zgroups.sort(sortorder);
			for (z in zgroups){
				zgroup = zgroups[z];
				zgrouppoints = zdifferentgroups[zgroup];
				for(x in xgroups){
					xgroup = xgroups[x];
					for (i in xdifferentgroups[xgroup]){
						index = xdifferentgroups[xgroup][i];
						if($.inArray(index,zgrouppoints)>-1){
							cat = xgroup+'-~-'+zgroup;
							val = ypoints[index];
							if(sumpoints[cat] === undefined){
								sumpoints[cat]=0;
							}
							sumpoints[cat]-=(-val);
						}	
					}
				}
			}
		} else {
			return zdifferentgroups;
		}
	} else {
		for(g in xgroups){
			for (i in xdifferentgroups[xgroups[g]]){
				index = xdifferentgroups[xgroups[g]][i];
				cat = xgroups[g];
				val = ypoints[index];
				if(sumpoints[cat] === undefined){
					sumpoints[cat]=0;
				}
				sumpoints[cat]-=(-val);
			}
		}
	}
	
	for(index in sumpoints){
		total += sumpoints[index];
		if(sumpoints[index]>ymax){
			ymax = sumpoints[index];
		}
	}
	
	if(relativefrequency){
		ymax = ymax / total;
	}
	
	var minmaxstep = axisminmaxstep(ymin,ymax);
	var minytick=minmaxstep[0];
	var maxytick=minmaxstep[1];
	var ystep=minmaxstep[2];

	var alpha = 1-$('#trans').val()/100;
	var colors = makeblankcolors(xpoints.length,alpha);

	if(zpoints.length>0){
		zgroups = Object.keys(zdifferentgroups);
		zgroups.sort(sortorder);
		thistop=60*scalefactor;
		eachheight=maxheight/zgroups.length;
		for (index in zgroups){
			group = zgroups[index];
			points = zdifferentgroups[group];

			thisbottom = add(thistop,eachheight);

			ctx.fillStyle = '#000000';
			fontsize = 15*scalefactor;
			ctx.font = "bold "+fontsize+"px Roboto";
			ctx.textAlign="left";
			ctx.fillText(group,left,thistop-15*scalefactor);
			
			var error = plothistogram(ctx,left,right,thistop,minytick,maxytick,ystep,eachheight,points,xdifferentgroups,ypoints,colors,xgroups,relativefrequency,total,sumpoints,group,xmin,xmax,xstep,xsteps,xpoints);
			if(error != 'good'){return error;}
			
			thistop = add(thistop,eachheight);
		}
	} else {
		var error = plothistogram(ctx,left,right,oypixel,minytick,maxytick,ystep,maxheight,points,xdifferentgroups,ypoints,colors,xgroups,relativefrequency,total,sumpoints,'~nogroup~',xmin,xmax,xstep,xsteps,xpoints);
		if(error != 'good'){return error;}
	}

	//graph title
	ctx.fillStyle = '#000000';
	fontsize = 20*scalefactor;
	ctx.font = "bold "+fontsize+"px Roboto";
	ctx.textAlign="center";
	ctx.fillText($('#title').val(),width/2,30*scalefactor);

	//x-axis title
	ctx.fillStyle = '#000000';
	fontsize = 15*scalefactor;
	ctx.font = "bold "+fontsize+"px Roboto";
	ctx.textAlign="center";
	ctx.fillText($('#xaxis').val(),width/2,height-10*scalefactor);

	labelgraph(ctx,width,height);
	if($('#invert').is(":checked")){
		invert(ctx)
	}

	var dataURL = canvas.toDataURL();
	return dataURL;
}

function plothistogram(ctx,left,right,gtop,minytick,maxytick,ystep,maxheight,points,groups,frequencys,colors,xgroups,relativefrequency,total,sumpoints,zgroup,xmin,xmax,xstep,xsteps,xpoints){
	
	maxheight = maxheight - 60*scalefactor;
	
	if($('#highboxplot').is(":checked")){
		gtop = gtop + maxheight*0.15;
		maxheight = maxheight*0.85;
	}
	
	gbottom = add(gtop,maxheight);
	
	//y-axis title
	$('#yaxis').val("Frequency");
	if(relativefrequency){
		$('#yaxis').val("Relative Frequency");
	}
	if($('#yaxis').val() != "Y Axis Title"){
		var x, y;
		x=20*scalefactor;
		y=gtop + maxheight/2;
		ctx.save();
		ctx.fillStyle = '#000000';
		fontsize = 15*scalefactor;
		ctx.font = "bold "+fontsize+"px Roboto";
		ctx.translate(x, y);
		ctx.rotate(-Math.PI/2);
		ctx.textAlign = "center";
		ctx.fillText($('#yaxis').val(), 0, 0);
		ctx.restore();
	}
	
	append = '';
	
	gleft = add(left,60*scalefactor);
	vertaxis(ctx,gtop,gbottom,add(left,50*scalefactor),minytick,maxytick,ystep,right,append);
	horaxis(ctx,gleft,right,gbottom,xmin,xmax,xstep,gtop);
	
	stepsize = (right - add(left,50*scalefactor))/xsteps;
	
	thisleft = add(left,50*scalefactor);
	
	ctx.fillStyle = '#000000';
	fontsize = 13*scalefactor;
	ctx.font = fontsize+"px Roboto";
	ctx.textAlign="center";
	
	currentx = xmin;
	thisvalues = [];
	totalforthishist = 0;
	tallestmiddle = 0;
	tallestheight = 0;
	while (currentx < xmax){
		boxleft = convertvaltopixel(currentx,xmin,xmax,gleft,right);
		thistotal = 0;
		for(p in groups[currentx]){
			i = groups[currentx][p];
			if($.inArray(i,points)>-1){
				thistotal -= -frequencys[i];
				totalforthishist -= -frequencys[i];
				color = colors[i];
				n=0;
				while(n<frequencys[i]){
					thisvalues.push(xpoints[i]);
					n++;
				}
			}
		}
		displaytotal = thistotal;
		if(relativefrequency){
			displaytotal = displaytotal/total;
		}
		nextx = currentx -(-xstep);
		if(displaytotal>tallestheight){
			tallestheight=displaytotal;
			tallestmiddle=(currentx+nextx)/2;
		}
		boxright = convertvaltopixel(nextx,xmin,xmax,gleft,right);
		stepsize = boxright - boxleft;
		boxbottom = gbottom;
		boxtop = convertvaltopixel(displaytotal,minytick,maxytick,gbottom,gtop);
		ctx.fillStyle = color;
		ctx.fillRect(boxleft,boxbottom,stepsize,boxtop-boxbottom);
		ctx.lineWidth = 1*scalefactor;
		ctx.strokeStyle = 'rgba(0,0,0,1)';
		ctx.rect(boxleft,boxbottom,stepsize,boxtop-boxbottom);ctx.stroke();
		ctx.fillStyle = '#000000';
		if(relativefrequency){
			displaytotal = Number.parseFloat(displaytotal.toPrecision(5));
		}
		if($('#regression').is(":checked") && displaytotal > 0){
			ctx.fillText(displaytotal,(boxleft+boxright)/2,(boxtop+boxbottom)/2+4.5*scalefactor);
		}
		if(thistotal == displaytotal){
			title = '<b>'+$('#xaxis').val()+'</b>: '+currentx+' - '+nextx+'<br><b>n</b>: '+ thistotal;
		} else {
			title = '<b>'+$('#xaxis').val()+'</b>: '+currentx+' - '+nextx+'<br><b>n</b>: '+ thistotal + " (" + displaytotal + ")";
		}
		$('#graphmap').append("<area shape='rect' coords='"+(boxleft/scalefactor)+","+(boxtop/scalefactor)+","+(add(boxleft,stepsize)/scalefactor)+","+(boxbottom/scalefactor)+"' desc='"+title+"'>");
		currentx -= -xstep;
	}
	
	var minval = parseFloat(Math.min.apply(null, thisvalues).toPrecision(10));
	var lq = lowerquartile(thisvalues);
	var med = median(thisvalues);
	var mean = calculatemean(thisvalues);
	var uq = upperquartile(thisvalues);
	var maxval = parseFloat(Math.max.apply(null, thisvalues).toPrecision(10));
	var sd = standarddeviation(thisvalues);
	var num = thisvalues.length;
	
	var mingraph = convertvaltopixel(minval,xmin,xmax,gleft,right);
	var lqgraph = convertvaltopixel(lq,xmin,xmax,gleft,right);
	var medgraph = convertvaltopixel(med,xmin,xmax,gleft,right);
	var uqgraph = convertvaltopixel(uq,xmin,xmax,gleft,right);
	var maxgraph = convertvaltopixel(maxval,xmin,xmax,gleft,right);

	if($('#regression').is(":checked") || $('#normaldist').is(":checked") || $('#poissondist').is(":checked") || $('#binomialdist').is(":checked") || $('#rectangulardist').is(":checked") || $('#triangulardist').is(":checked")){
		ctx.fillStyle = 'rgba(255,0,0,1)';
		fontsize = 11*scalefactor;
		ctx.font = fontsize+"px Roboto";
		ctx.textAlign="left";
		var ypix=gtop+50;
		ctx.fillText('min: '+minval,gleft,ypix-44*scalefactor);
		ctx.fillText('lq: '+lq,gleft,ypix-33*scalefactor);
		ctx.fillText('med: '+med,gleft,ypix-22*scalefactor);
		ctx.fillText('mean: '+mean,gleft,ypix-11*scalefactor);
		ctx.fillText('uq: '+uq,gleft,ypix);
		ctx.fillText('max: '+maxval,gleft,ypix+11*scalefactor);
		ctx.fillText('sd: '+sd,gleft,ypix+22*scalefactor);
		ctx.fillText('num: '+num,gleft,ypix+33*scalefactor);
		equationtop = ypix+33*scalefactor+11*scalefactor;
	}
	
	if($('#normaldist').is(":checked")){
		ctx.fillStyle='#00f';
		ctx.strokeStyle='#00f';	
		ctx.lineWidth = 2*scalefactor;
		stepfordist = (xmax-xmin)/100;
		x=xmin;
		ctx.beginPath();
		while(x<=xmax){
			y=xstep*Math.exp(-Math.pow(x-mean,2)/(2*Math.pow(sd,2)))/Math.sqrt(6.28318*Math.pow(sd,2));
			if(!relativefrequency){
				y = y*totalforthishist;
			} else {
				y = y*totalforthishist/total;
			}
			xpixel = convertvaltopixel(x,xmin,xmax,gleft,right);
			ypixel = convertvaltopixel(y,minytick,maxytick,gbottom,gtop);
			if(x==xmin){
				ctx.moveTo(xpixel,ypixel);
			} else {
				ctx.lineTo(xpixel,ypixel);
			}
			x-=-stepfordist;
		}
		ctx.stroke();
		ctx.fillText("Normal Distribution",gleft,equationtop);
		equationtop = add(equationtop,11*scalefactor);
	}
	
	if($('#rectangulardist').is(":checked")){
		ctx.fillStyle='#fa0';
		ctx.strokeStyle='#fa0';	
		ctx.lineWidth = 2*scalefactor;
		y = 1/(maxval-minval)*xstep;
		if(!relativefrequency){
			y = y*totalforthishist;
		} else {
			y = y*totalforthishist/total;
		}
		boxheight = convertvaltopixel(y,minytick,maxytick,gbottom,gtop);
		line(ctx,gleft,gbottom,mingraph,gbottom);
		line(ctx,mingraph,gbottom,mingraph,boxheight);
		line(ctx,mingraph,boxheight,maxgraph,boxheight);
		line(ctx,maxgraph,gbottom,maxgraph,boxheight);
		line(ctx,maxgraph,gbottom,right,gbottom);
		ctx.fillText("Rectangular Distribution",gleft,equationtop);
		equationtop = add(equationtop,11*scalefactor);
		
	}
	
	if($('#triangulardist').is(":checked")){
		ctx.fillStyle='#0a0';
		ctx.strokeStyle='#0a0';	
		//c=3*mean-minval-maxval;
		c=tallestmiddle;
		if(c<minval){c = minval;}
		if(c>maxval){c = maxval;}
		middlepixel = convertvaltopixel(c,xmin,xmax,gleft,right);
		ctx.lineWidth = 2*scalefactor;
		y = 2/(maxval-minval)*xstep;
		if(!relativefrequency){
			y = y*totalforthishist;
		} else {
			y = y*totalforthishist/total;
		}
		triangleheight = convertvaltopixel(y,minytick,maxytick,gbottom,gtop);
		line(ctx,gleft,gbottom,mingraph,gbottom);
		line(ctx,mingraph,gbottom,middlepixel,triangleheight);
		line(ctx,maxgraph,gbottom,middlepixel,triangleheight);
		line(ctx,maxgraph,gbottom,right,gbottom);
		ctx.fillText("Triangular Distribution",gleft,equationtop);
		equationtop = add(equationtop,11*scalefactor);
		
	}
	
	if($('#poissondist').is(":checked")){
		ctx.fillStyle='#0af';
		ctx.strokeStyle='#0af';	
		stepfordist = 1;
		x=parseFloat(xmin.toFixed(0));
		if(xmax>100){
			ctx.fillText("Poisson Distribution - Not Available with x axis numbers over 100",gleft,equationtop);
			equationtop = add(equationtop,11*scalefactor);
		} else {
			while(x<=xmax){
				var y = xstep*Math.pow(mean,x)*Math.exp(-mean)/factorial(x);
				if(!relativefrequency){
					y = y*totalforthishist;
				} else {
					y = y*totalforthishist/total;
				}
				xpixel = convertvaltopixel(x,xmin,xmax,gleft,right);
				ypixel = convertvaltopixel(y,minytick,maxytick,gbottom,gtop);
				ctx.beginPath();
				ctx.arc(xpixel,ypixel,4*scalefactor,0,2*Math.PI);
				ctx.fill();
				x-=-stepfordist;
			}
			ctx.fillText("Poisson Distribution",gleft,equationtop);
			equationtop = add(equationtop,11*scalefactor);
		}
	}
	
	if($('#binomialdist').is(":checked")){
		ctx.fillStyle='#f0a';
		ctx.strokeStyle='#f0a';	
		stepfordist = 1;
		x=parseFloat(xmin.toFixed(0));
		xmaxr=parseFloat(xmax.toFixed(0));
		if(xmax>100){
			ctx.fillText("Binomial Distribution - Not Available with x axis numbers over 100",gleft,equationtop);
			equationtop = add(equationtop,11*scalefactor);
		} else {
			p = mean/maxval;
			while(x<=xmax){
				var y = xstep*factorial(xmaxr)/(factorial(x)*factorial(xmaxr-x))*Math.pow(p,x)*Math.pow(1-p,xmaxr-x);
				if(!relativefrequency){
					y = y*totalforthishist;
				} else {
					y = y*totalforthishist/total;
				}
				xpixel = convertvaltopixel(x,xmin,xmax,gleft,right);
				ypixel = convertvaltopixel(y,minytick,maxytick,gbottom,gtop);
				ctx.beginPath();
				ctx.arc(xpixel,ypixel,4*scalefactor,0,2*Math.PI);
				ctx.fill();
				x-=-stepfordist;
			}
			ctx.fillText("Binomial Distribution",gleft,equationtop);
			equationtop = add(equationtop,11*scalefactor);
		}
	}
	
	if($('#highboxplot').is(":checked")){
		maxheight = maxheight/0.85;
		gtop = gtop - maxheight*0.15;
		var y = gtop + maxheight*0.05;
		var h = maxheight*0.05;
		ctx.strokeStyle = 'rgb(0,0,0)';
		ctx.lineWidth = 1*scalefactor;
		line(ctx,mingraph,add(y,-5*scalefactor),mingraph,add(y,5*scalefactor));
		line(ctx,lqgraph,add(y,-h),lqgraph,add(y,h));
		line(ctx,medgraph,add(y,-h),medgraph,add(y,h));
		line(ctx,uqgraph,add(y,-h),uqgraph,add(y,h));
		line(ctx,maxgraph,add(y,-5*scalefactor),maxgraph,add(y,5*scalefactor));
		line(ctx,mingraph,y,lqgraph,y);
		line(ctx,lqgraph,add(y,h),uqgraph,add(y,h));
		line(ctx,lqgraph,add(y,-h),uqgraph,add(y,-h));
		line(ctx,uqgraph,y,maxgraph,y);
	}
	
	return 'good';
}

function factorial(n) {
  return n ? n * factorial(n - 1) : 1;
}

$( document ).ready(function() {	
	$('#directimport')[0].addEventListener('click', async event => {
	  $('#progressdescription')[0].innerHTML = 'Starting';
	  console.time("Starting");
	  $('#progressbarholder').show();
	  if (!navigator.clipboard) {
		// Clipboard API not available
		alert('clipboard not accessible');
		console.error('clipboard not accessible');
		$('#progressbarholder').hide();
		return
	  }
	  console.timeEnd("Starting");
	  $('#progressdescription')[0].innerHTML = 'Loading from Clipboard';
	  console.time("Loading from Clipboard");
	  try {
		var data = await navigator.clipboard.readText();
		try {
			ga('send', 'event', 'Function', 'Data - directimport', ipaddress);
		} catch(err) {
			console.log(err.message);
		}
		csv_data = data;
		console.timeEnd("Loading from Clipboard");
		$('#progressdescription')[0].innerHTML = 'Creating Table';
		loaddata();
	  } catch (err) {
		console.error('Failed to copy!', err);
		alert('clipboard not accessible');
		$('#progressbarholder').hide();
	  }
	})
	
  function handleFileSelect(evt) {
	try {
		ga('send', 'event', 'Function', 'Data - filenew', ipaddress);
	} catch(err) {
		console.log(err.message);
	}  
	  
	$('#progressdescription')[0].innerHTML = 'Starting';
	console.time("Starting");
	$('#progressbarholder').show();
	var allowedmimes = ['','application/vnd.ms-excel','application/ms-excel','application/csv','text/plain','text/csv','text/tsv','text/comma-separated-values','application/excel','application/vnd.msexcel','text/anytext','application/octet-stream','application/txt','application/x-csv'];
	var files = evt.target.files; // FileList object
	
	console.timeEnd("Starting");
	$('#progressdescription')[0].innerHTML = 'Loading from File';
	console.time("Loading from File");

    // Loop through the FileList.
    for (var i = 0, f; f = files[i]; i++) {
	
	  console.log(f);

      // Only process correct file types.
	  console.log($.inArray(f.type,allowedmimes));
	  console.log(f.type);
      if ($.inArray(f.type,allowedmimes)==-1) {
		alert('type not allowed: '+f.type);
		console.log('type not allowed: "'+f.type+'"');
		$('#progressbarholder').hide();
        return;
      }

      var reader = new FileReader();
	  
      // Closure to capture the file information.
	  
	  if(f.name.substr(-10)==".nzgrapher"){
		  console.log('.nzgrapher');
		  reader.onload = (function(theFile) {
			return function(e) {
				loadeddata = JSON.parse(e.target.result);
				csv_data = loadeddata.csv_data;
				$('#data').html(loadeddata.datatable);
				$('#progressdescription')[0].innerHTML = 'Updating Boxes';
				loadnzgrapherfile();
			};
		  })(f);  
	  } else {
		  reader.onload = (function(theFile) {
			return function(e) {
				console.timeEnd("Loading from File");
				csv_data = e.target.result;
				loaddata();
			};
		  })(f);
	  }
      

      // Read in the image file as a data URL.
      reader.readAsText(f);
    }
  }

  document.getElementById('filenew').addEventListener('change', handleFileSelect, false);
})

function loaddatafromurl(dataset){
	$('#progressdescription')[0].innerHTML = 'Starting';
	console.time("Starting");
	$('#progressbarholder').show();	
	console.timeEnd("Starting");
	$('#progressdescription')[0].innerHTML = 'Loading File';
	console.time("Loading from URL");
	$.get('./getdata.php',{dataset:dataset}).done(function(data){
		if(dataset.substr(-10)==".nzgrapher"){
			loadeddata = JSON.parse(data);
			csv_data = loadeddata.csv_data;
			$('#data').html(loadeddata.datatable);
			$('#progressdescription')[0].innerHTML = 'Updating Boxes';
			loadnzgrapherfile();
		} else {
			console.timeEnd("Loading from URL");
			csv_data = data;
			loaddata();
		}
	})
}

function loadnzgrapherfile(){
	setTimeout(function(){
		console.timeEnd("Loading from File");
		console.time("Updating Boxes");
		updatebox();
		$('#progressdescription')[0].innerHTML = 'Restoring Options';
		setTimeout(function(){
			console.timeEnd("Updating Boxes");
			console.time("Restoring Options");
			$.each(loadeddata.setval,function(i,v){
				$('#'+i).val(v);
			});
			$.each(loadeddata.checkboxes,function(i,v){
				$('#'+i).prop('checked',v);
			});
			console.timeEnd("Restoring Options");
			$('#progressbarholder').hide();
		},30);
	},30);
}

function loaddata(){
	$('#progressdescription')[0].innerHTML = 'Starting';
	$('#progresssize')[0].innerHTML = '';
	console.time("Starting");
	$('#progressbarholder').show();	
	console.timeEnd("Starting");
	$('#progressdescription')[0].innerHTML = 'Loading File';
	console.time("Creating Array");
	setTimeout(function(){
		data = csv_data;
		len = Math.floor(data.length/1024);
		if(len < 200){
			$('#progresssize')[0].innerHTML = 'Data Size: '+len+'kb';
		} else if(len < 2000) {
			$('#progresssize')[0].innerHTML = 'Data Size: '+len+'kb<br>(This is a little bigger, so may take a little while)';
		} else {
			$('#progresssize')[0].innerHTML = 'Data Size: '+len+'kb<br>(This is a quite big, so may take a little while)';
		}
		console.log(data.length);
		var countcomma = (data.match(/,/g) || []).length;
		var countsemi = (data.match(/;/g) || []).length;
		var counttab = (data.match(/\t/g) || []).length;
		if(countcomma+countsemi+counttab==0){
			console.log('Separator: none');
			if(data.substr(-1) != '\r' && data.substr(-1) != '\n' && data.substr(-1) != '\r\n'){
				csv_data = csv_data+'\r\n';
				data = csv_data;
				console.log('Added extra new line at end');
			}
			try {
				finaldata = $.csv.toArrays(data);
			} catch(err) {
				alert(err.message+'\nIf you continue experiencing issues with this dataset please email jwills@mathsnz with the dataset so we can work out what is going wrong.');
			}
		} else if(countcomma>countsemi){
			if(countcomma>counttab){
				try {
					finaldata = $.csv.toArrays(data,{separator:','});
				} catch(err) {
					try {
						console.log('Separator: comma');
						finaldata = $.csv.toArrays(data.replace(/"/g, "'"),{separator:','});
					} catch(err) {
						console.error(err.message);
						alert(err.message+'\nIf you continue experiencing issues with this dataset please email jwills@mathsnz with the dataset so we can work out what is going wrong.');
					}
				}
			} else {
				try {
						console.log('Separator: tab (1)');
					finaldata = $.csv.toArrays(data,{separator:'\t'});
				} catch(err) {
					try {
						finaldata = $.csv.toArrays(data.replace(/"/g, "'"),{separator:'\t'});
					} catch(err) {
						console.error(err.message);
						alert(err.message+'\nIf you continue experiencing issues with this dataset please email jwills@mathsnz with the dataset so we can work out what is going wrong.');
					}
				}
			}
		} else {
			if(countsemi>counttab){
				try {
					console.log('Separator: semicolon');
					finaldata = $.csv.toArrays(data,{separator:';'});
				} catch(err) {
					try {
						finaldata = $.csv.toArrays(data.replace(/"/g, "'"),{separator:';'});
					} catch(err) {
						console.error(err.message);
						alert(err.message+'\nIf you continue experiencing issues with this dataset please email jwills@mathsnz with the dataset so we can work out what is going wrong.');
					}
				}
			} else {
				try {
					console.log('Separator: tab (2)');
					finaldata = $.csv.toArrays(data,{separator:'\t'});
				} catch(err) {
					try {
						finaldata = $.csv.toArrays(data.replace(/"/g, "'"),{separator:'\t'});
					} catch(err) {
						console.error(err.message);
						alert(err.message+'\nIf you continue experiencing issues with this dataset please email jwills@mathsnz with the dataset so we can work out what is going wrong.');
					}
				}
			}
		}
		$('#progressdescription')[0].innerHTML = 'Creating Table';
		setTimeout(function(){
			console.timeEnd("Creating Array");
			console.time("Creating Table");
			var firstrow=0;
			r = new Array();
			var j = -1;
			for (i = 0; i < finaldata.length; i++) {
				var cells = finaldata[i];
				if(i==0){firstrow=cells.length;}
				if (cells.length >= firstrow){
					if(i==0){
						r[++j] ='<tr class=tabletop><th>id';
					} else {
						r[++j] ='<tr><th>';
						r[++j] =i;
					}
					for (c = 0; c < cells.length; c++) {
						r[++j] = '<td><div contenteditable="true">';
						r[++j] = escapeHtml(cells[c].trim()).replace(',', '-');
						r[++j] = '<br></div></td>';
					}
				}
			}
			postcreatetable();
		},30);
	},30);
}

function postcreatetable(){
	$('#progressdescription')[0].innerHTML = 'Displaying Table';
	setTimeout(function(){
		console.timeEnd("Creating Table");
		console.time("Displaying Table");
		$('#data')[0].innerHTML = r.join(''); 
		$('#progressdescription')[0].innerHTML = 'Resetting to "About" graph';
		setTimeout(function(){
			console.timeEnd("Displaying Table");
			console.time('Resetting to "About" graph');
			$('#type').val('newabout');
			document.getElementById("xvar").selectedIndex = 0;
			document.getElementById("yvar").selectedIndex = 0;
			document.getElementById("zvar").selectedIndex = 0;
			document.getElementById("color").selectedIndex = 0;
			$('#progressdescription')[0].innerHTML = 'Updating Boxes';
			setTimeout(function(){
				console.timeEnd('Resetting to "About" graph');
				console.time("Updating Boxes");
				updatebox();
				console.timeEnd("Updating Boxes");
				$('#progressbarholder').hide();
			},30);
		},30);
	},30);
}

function newpairedexperiment(){
	$('#arrowsshow').show();
	$('#regshow').show();
	$('#sum').show();
	$('#invertshow').show();
	$('#stackdotsshow').show();
	$('#labelshow').show();
	$('#highboxplotshow').show();
	$('#boxnowhiskershow').show();
	$('#boxnooutliershow').show();
	$('#boxplotshow').show();
	$('#intervalshow').show();
	$('#sizediv').show();
	$('#meandotshow').show();
	$('#pointsizename').html('Point Size:');
	$('#transdiv').show();
	$('#xvar').show();
	$('#yvar').show();
	$('#color').show();
	$('#colorname').show();
	$('#greyscaleshow').show();
	$('#gridlinesshow').show();
	$('#removedpointsshow').show();
	$('#stripgraphshow').show();
	$('#var1label').html("Numerical 1:<br><small>required</small>");
	$('#var2label').html("Numerical 2:<br><small>required</small>");
	$('#var3label').html("");

	var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');

	//set size
	var width = $('#width').val();
	var height = $('#height').val();

	ctx.canvas.width = width;
	ctx.canvas.height = height;

	ctx.fillStyle = "#ffffff";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	//get points
	var xpoints = (dataforselector[$('#xvar option:selected').text()]).slice();
	var ypoints = (dataforselector[$('#yvar option:selected').text()]).slice();

	//check for numeric value
	var apoints=[];
	var pointsremoved=[];
	for (var index in xpoints){
		if($.isNumeric(xpoints[index])){
			apoints.push(index);
		} else {
			pointsremoved.push(add(index,1));
		}
	}

	if(apoints.length==0){
		return 'Error: You must select a numeric variable for "Numerical 1"';
	}
	
	var points=[];
	var allpoints=[];
	var pointstoplot=[];
	var pointsforminmax=[];
	for (var i in apoints){
		index = apoints[i];
		if($.isNumeric(ypoints[index])){
			points.push(index);
			allpoints.push(index);
			pointsforminmax.push(ypoints[index]-xpoints[index]);
			pointstoplot[index] = ypoints[index]-xpoints[index];
		} else {
			pointsremoved.push(add(index,1));
		}
	}

	if(points.length==0){
		return 'Error: You must select a numeric variable for "Numerical 2"';
	}

	if(pointsremoved.length!=0 && $('#removedpoints').is(":checked")){
		ctx.fillStyle = '#000000';
		fontsize = 13*scalefactor;
		ctx.font = fontsize+"px Roboto";
		ctx.textAlign="right";
		ctx.fillText("ID(s) of Points Removed: "+pointsremoved.join(", "),width-48*scalefactor,48*scalefactor);
	}
	
	var oypixel=height-60*scalefactor;
	var maxheight=height-120*scalefactor;
	var left=90*scalefactor;
	var right=width-60*scalefactor;

	var alpha = 1-$('#trans').val()/100;
	var colors = makecolors(alpha,ctx);
	
	if($('#arrows').is(":checked")){
		var finalxpoints=[];
		var finalypoints=[];
		var pointsforminmax=[];
		for (var i in apoints){
			index = apoints[i];
			pointsforminmax.push(xpoints[index]);
			pointsforminmax.push(ypoints[index]);
			finalxpoints.push(xpoints[index]);
			finalypoints.push(ypoints[index]);
		}

		xmin = Math.min.apply(null, pointsforminmax);
		xmax = Math.max.apply(null, pointsforminmax);
		if($.isNumeric($('#boxplotmin').val())){
			xmin=$('#boxplotmin').val();
		}
		if($.isNumeric($('#boxplotmax').val())){
			xmax=$('#boxplotmax').val();
		}
		var minmaxstep = axisminmaxstep(xmin,xmax);
		var minxtick=minmaxstep[0];
		var maxxtick=minmaxstep[1];
		var xstep=minmaxstep[2];
		
		ctx.strokeStyle = '#000000';
		horaxis(ctx,left,right,add(oypixel,10*scalefactor),minxtick,maxxtick,xstep);
		
		var topypix=oypixel-3*maxheight/4;
		var bottomypix=oypixel-maxheight/4;
		
		var rad = $('#size').val()/2*scalefactor;
		if($('#labels').is(":checked")){var labels="yes";} else {var labels = "no";}
			
		for (var i in points){
			index = points[i];
			topxpixel = convertvaltopixel(xpoints[index],minxtick,maxxtick,left,right);
			bottomxpixel = convertvaltopixel(ypoints[index],minxtick,maxxtick,left,right);
			ctx.strokeStyle = colors[index];
			ctx.fillStyle = colors[index];
			ctx.beginPath();
			ctx.arc(topxpixel,topypix,rad,0,2*Math.PI);
			ctx.stroke();
			ctx.beginPath();
			ctx.arc(bottomxpixel,bottomypix,rad,0,2*Math.PI);
			ctx.stroke();
			drawArrow(ctx,topxpixel,topypix+rad,bottomxpixel,bottomypix-rad,5*scalefactor)
			if(labels == "yes"){
				ctx.fillStyle = 'rgba(0,0,255,1)';
				fontsize = 10*scalefactor;
				ctx.font = fontsize+"px Roboto";
				ctx.textAlign="left";
				ctx.fillText(parseInt(add(index,1)),add(add(topxpixel,rad),2*scalefactor),add(topypix,4*scalefactor));
				ctx.fillText(parseInt(add(index,1)),add(add(bottomxpixel,rad),2*scalefactor),add(bottomypix,4*scalefactor));
			}
			$('#graphmap').append('<area shape="circle" coords="'+(topxpixel/scalefactor)+','+(topypix/scalefactor)+','+(rad/scalefactor)+'" alt="'+parseInt(add(index,1))+'" desc="Point ID: '+parseInt(add(index,1))+'<br>'+$('#xaxis').val()+': '+xpoints[index]+'<br>'+$('#yaxis').val()+': '+ypoints[index]+'">');
			$('#graphmap').append('<area shape="circle" coords="'+(bottomxpixel/scalefactor)+','+(bottomypix/scalefactor)+','+(rad/scalefactor)+'" alt="'+parseInt(add(index,1))+'" desc="Point ID: '+parseInt(add(index,1))+'<br>'+$('#xaxis').val()+': '+xpoints[index]+'<br>'+$('#yaxis').val()+': '+ypoints[index]+'">');
		}

		if($('#regression').is(":checked")){			
			ctx.fillStyle = '#000000';
			fontsize = 15*scalefactor;
			ctx.font = "bold "+fontsize+"px Roboto";
			ctx.textAlign="left";
			var ypix=oypixel-3*maxheight/4;
			ctx.fillText($('#xaxis').val(),left-60*scalefactor,ypix-60*scalefactor);
			var ypix=oypixel-maxheight/4;
			ctx.fillText($('#yaxis').val(),left-60*scalefactor,ypix-60*scalefactor);
			
			ctx.fillStyle = 'rgba(255,0,0,1)';
			fontsize = 11*scalefactor;
			ctx.font = fontsize+"px Roboto";
			ctx.textAlign="left";
			
			thisvalues = finalxpoints;
			var minval = parseFloat(Math.min.apply(null, thisvalues).toPrecision(10));
			var lq = lowerquartile(thisvalues);
			var med = median(thisvalues);
			var mean = calculatemean(thisvalues);
			var uq = upperquartile(thisvalues);
			var maxval = parseFloat(Math.max.apply(null, thisvalues).toPrecision(10));
			var minnooutliersval = minnooutliers(thisvalues,lq,uq);
			var maxnooutliersval = maxnooutliers(thisvalues,lq,uq);
			var sd = standarddeviation(thisvalues);
			var num = thisvalues.length;
			var ypix=oypixel-3*maxheight/4;
			ctx.fillText('min: '+minval,left-60*scalefactor,ypix-44*scalefactor);
			ctx.fillText('lq: '+lq,left-60*scalefactor,ypix-33*scalefactor);
			ctx.fillText('med: '+med,left-60*scalefactor,ypix-22*scalefactor);
			ctx.fillText('mean: '+mean,left-60*scalefactor,ypix-11*scalefactor);
			ctx.fillText('uq: '+uq,left-60*scalefactor,ypix);
			ctx.fillText('max: '+maxval,left-60*scalefactor,ypix+11*scalefactor);
			ctx.fillText('sd: '+sd,left-60*scalefactor,ypix+22*scalefactor);
			ctx.fillText('num: '+num,left-60*scalefactor,ypix+33*scalefactor);
			
			thisvalues = finalypoints;
			var minval = parseFloat(Math.min.apply(null, thisvalues).toPrecision(10));
			var lq = lowerquartile(thisvalues);
			var med = median(thisvalues);
			var mean = calculatemean(thisvalues);
			var uq = upperquartile(thisvalues);
			var maxval = parseFloat(Math.max.apply(null, thisvalues).toPrecision(10));
			var minnooutliersval = minnooutliers(thisvalues,lq,uq);
			var maxnooutliersval = maxnooutliers(thisvalues,lq,uq);
			var sd = standarddeviation(thisvalues);
			var num = thisvalues.length;
			var ypix=oypixel-maxheight/4;
			ctx.fillText('min: '+minval,left-60*scalefactor,ypix-44*scalefactor);
			ctx.fillText('lq: '+lq,left-60*scalefactor,ypix-33*scalefactor);
			ctx.fillText('med: '+med,left-60*scalefactor,ypix-22*scalefactor);
			ctx.fillText('mean: '+mean,left-60*scalefactor,ypix-11*scalefactor);
			ctx.fillText('uq: '+uq,left-60*scalefactor,ypix);
			ctx.fillText('max: '+maxval,left-60*scalefactor,ypix+11*scalefactor);
			ctx.fillText('sd: '+sd,left-60*scalefactor,ypix+22*scalefactor);
			ctx.fillText('num: '+num,left-60*scalefactor,ypix+33*scalefactor);
		} else {
			ctx.fillStyle = '#000000';
			fontsize = 15*scalefactor;
			ctx.font = "bold "+fontsize+"px Roboto";
			ctx.textAlign="left";
			var ypix=oypixel-3*maxheight/4;
			ctx.fillText($('#xaxis').val(),left-60*scalefactor,ypix+5*scalefactor);
			var ypix=oypixel-maxheight/4;
			ctx.fillText($('#yaxis').val(),left-60*scalefactor,ypix+5*scalefactor);
		}
		
	} else {

		xmin = Math.min.apply(null, pointsforminmax);
		xmax = Math.max.apply(null, pointsforminmax);
		if(xmin==xmax){
			xmin--;
			xmax++;
		}
		if($.isNumeric($('#boxplotmin').val())){
			xmin=$('#boxplotmin').val();
		}
		if($.isNumeric($('#boxplotmax').val())){
			xmax=$('#boxplotmax').val();
		}
		var minmaxstep = axisminmaxstep(xmin,xmax);
		var minxtick=minmaxstep[0];
		var maxxtick=minmaxstep[1];
		var xstep=minmaxstep[2];
		
		ctx.strokeStyle = '#000000';
		horaxis(ctx,left,right,add(oypixel,10*scalefactor),minxtick,maxxtick,xstep);
		plotdotplot(ctx,points,pointstoplot,minxtick,maxxtick,oypixel,left,right,maxheight,colors,2,'Difference');

		//x-axis title
		ctx.fillStyle = '#000000';
		fontsize = 15*scalefactor;
		ctx.font = "bold "+fontsize+"px Roboto";
		ctx.textAlign="center";
		ctx.fillText("Difference ("+$('#yaxis').val()+" - "+$('#xaxis').val()+")",width/2,height-10*scalefactor);
	
	}
	
	//graph title
	ctx.fillStyle = '#000000';
	fontsize = 20*scalefactor;
	ctx.font = "bold "+fontsize+"px Roboto";
	ctx.textAlign="center";
	ctx.fillText($('#title').val(),width/2,30*scalefactor);

	labelgraph(ctx,width,height);
	if($('#invert').is(":checked")){
		invert(ctx)
	}

	var dataURL = canvas.toDataURL();
	return dataURL;
}

function drawArrow(ctx, fromx, fromy, tox, toy, radius) {
	var x_center = tox;
	var y_center = toy;

	var angle;
	var x;
	var y;

	ctx.beginPath();

	angle = Math.atan2(toy - fromy, tox - fromx)
	x_center = -radius * Math.cos(angle) + x_center;
	y_center = -radius * Math.sin(angle) + y_center;
	
	x = radius * Math.cos(angle) + x_center;
	y = radius * Math.sin(angle) + y_center;

	ctx.moveTo(x, y);

	angle += (1.0/3.0) * (2 * Math.PI)
	x = radius * Math.cos(angle) + x_center;
	y = radius * Math.sin(angle) + y_center;

	ctx.lineTo(x, y);

	angle += (1.0/3.0) * (2 * Math.PI)
	x = radius *Math.cos(angle) + x_center;
	y = radius *Math.sin(angle) + y_center;

	ctx.lineTo(x, y);
	ctx.closePath();
	ctx.fill();
	
	angle = Math.atan2(toy - fromy, tox - fromx)
	x = -0.5*radius * Math.cos(angle) + x_center;
	y = -0.5*radius * Math.sin(angle) + y_center;
	
	line(ctx,fromx,fromy,x,y);
}

function newbootstrap(){
	$('#regshow').show();
	$('#sum').show();
	$('#invertshow').show();
	$('#stackdotsshow').show();
	$('#labelshow').show();
	$('#intervalshow').show();
	$('#sizediv').show();
	$('#pointsizename').html('Point Size:');
	$('#transdiv').show();
	$('#xvar').show();
	$('#greyscaleshow').show();
	$('#gridlinesshow').show();
	$('#removedpointsshow').show();
	$('#btypeshow').show();
	$('#var1label').html("Numerical 1:<br><small>required</small>");
	$('#var2label').html("");
	$('#var3label').html("");

	var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');

	//set size
	var width = $('#width').val();
	var height = $('#height').val();

	ctx.canvas.width = width;
	ctx.canvas.height = height;

	ctx.fillStyle = "#ffffff";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	//get points
	var xpoints = (dataforselector[$('#xvar option:selected').text()]).slice();
	
	//check for numeric value
	var points=[];
	var pointsremoved=[];
	var pointsforminmax=[];
	for (var index in xpoints){
		if($.isNumeric(xpoints[index])){
			points.push(index);
			pointsforminmax.push(xpoints[index]);
		} else {
			pointsremoved.push(add(index,1));
		}
	}

	if(points.length==0){
		return 'Error: You must select a numeric variable for "Numerical 1"';
	}

	if(pointsremoved.length!=0 && $('#removedpoints').is(":checked")){
		ctx.fillStyle = '#000000';
		fontsize = 13*scalefactor;
		ctx.font = fontsize+"px Roboto";
		ctx.textAlign="right";
		ctx.fillText("ID(s) of Points Removed: "+pointsremoved.join(", "),width-48*scalefactor,48*scalefactor);
	}
	
	var oypixel=height/2.5-60*scalefactor;
	var maxheight=height/2.5-120*scalefactor;
	var left=90*scalefactor;
	var right=width-60*scalefactor;

	xmin = Math.min.apply(null, pointsforminmax);
	xmax = Math.max.apply(null, pointsforminmax);
	if($.isNumeric($('#boxplotmin').val())){
		xmin=$('#boxplotmin').val();
	}
	if($.isNumeric($('#boxplotmax').val())){
		xmax=$('#boxplotmax').val();
	}
	var minmaxstep = axisminmaxstep(xmin,xmax);
	var minxtick=minmaxstep[0];
	var maxxtick=minmaxstep[1];
	var xstep=minmaxstep[2];
	
	var alpha = 1-$('#trans').val()/100;
	var colors = makeblankcolors(xpoints.length,alpha);
	
	$('#boxplot').prop('checked',false);
	$('#highboxplot').prop('checked',false);
	$('#boxnowhisker').prop('checked',false);
	$('#boxnooutlier').prop('checked',false);
	$('#meandot').prop('checked',false);
	
	if($('#btype').val()=='Median' || $('#btype').val()=='IQR'){
		$('#boxplot').prop('checked',true);
	} else if($('#btype').val()=='Mean' || $('#btype').val()=='Standard Deviation'){
		$('#meandot').prop('checked',true);
	}
	
	ctx.strokeStyle = '#000000';
	horaxis(ctx,left,right,add(oypixel,10*scalefactor),minxtick,maxxtick,xstep);
	plotdotplot(ctx,points,xpoints,minxtick,maxxtick,oypixel,left,right,maxheight,colors,2,1);
	
	if($('#btype').val()=='Median'){
		ctx.strokeStyle = '#ff0000';
		ctx.lineWidth = 3*scalefactor;
		var med = median(pointsforminmax);
		var medgraph = convertvaltopixel(med,minxtick,maxxtick,left,right);
		line(ctx,medgraph,oypixel,medgraph,oypixel-maxheight*0.2)
		dropline = med;
	} else if ($('#btype').val()=='IQR'){
		ctx.strokeStyle = '#ff0000';
		ctx.lineWidth = 3*scalefactor;
		var lq = lowerquartile(pointsforminmax);
		var uq = upperquartile(pointsforminmax);
		var lqgraph = convertvaltopixel(lq,minxtick,maxxtick,left,right);
		var uqgraph = convertvaltopixel(uq,minxtick,maxxtick,left,right);
		line(ctx,lqgraph,oypixel-maxheight*0.1,uqgraph,oypixel-maxheight*0.1);
		dropline = uq - lq;
		shift=((dropline-(minxtick+maxxtick)/2)/xstep).toFixed(0)*xstep;
		minxtick = minxtick+shift;
		maxxtick = maxxtick+shift;
	} else if($('#btype').val()=='Mean'){
		var mean = calculatemean(pointsforminmax);
		dropline = mean;
	} else if ($('#btype').val()=='Standard Deviation'){
		ctx.strokeStyle = '#ff0000';
		ctx.lineWidth = 3*scalefactor;
		var mean = calculatemean(pointsforminmax);
		var sd = standarddeviation(pointsforminmax);	
		var bottomsdgraph = convertvaltopixel(add(mean,sd),minxtick,maxxtick,left,right);
		var topsdgraph = convertvaltopixel(add(mean,-sd),minxtick,maxxtick,left,right);
		line(ctx,bottomsdgraph,oypixel-5*scalefactor,topsdgraph,oypixel-5*scalefactor);
		console.log(bottomsdgraph);
		dropline = sd;
		shift=((dropline-(minxtick+maxxtick)/2)/xstep).toFixed(0)*xstep;
		minxtick = minxtick+shift;
		maxxtick = maxxtick+shift;
	}
	
	var oypixel=height-90*scalefactor;
	var maxheight=height*0.6-120*scalefactor;
	
	horaxis(ctx,left,right,add(oypixel,40*scalefactor),minxtick,maxxtick,xstep);
	
	bootstrapvals=[];
	num=points.length;
	b=0;
	while(b<1000){
		thisbootstrap=[];
		for (index in points){
			sel=randint(0,num-1);
			point=points[sel];
			xval=xpoints[point];
			thisbootstrap.push(xval);
		}
		if($('#btype').val()=='Median'){
			val = median(thisbootstrap);
		} else if ($('#btype').val()=='IQR'){
			lq = lowerquartile(thisbootstrap);
			uq = upperquartile(thisbootstrap);
			val = uq-lq;
		} else if($('#btype').val()=='Mean'){
			val = calculatemean(thisbootstrap);
		} else if ($('#btype').val()=='Standard Deviation'){
			val = standarddeviation(thisbootstrap);	
		}
		val = parseFloat(Number(val).toPrecision(10));
		bootstrapvals.push(val);
		b++;
	}

	colors = makebscolors(1000,alpha,bootstrapvals);

	$('#boxplot').prop('checked', false);
	$('#meandot').prop('checked', false);

	bspoints=[];
	i=0;
	while(i<1000){
		bspoints.push(i);
		i++;
	}

	$('#boxplot').prop('checked', false);
	$('#meandot').prop('checked', false);

	if($('#labels').is(":checked")){var waslabels="yes";} else {var waslabels = "no";}
	if($('#regression').is(":checked")){var wasreg="yes";} else {var wasreg = "no";}
	if($('#interval').is(":checked")){var wasint="yes";} else {var wasint = "no";}
	if($('#intervallim').is(":checked")){var wasintlim="yes";} else {var wasintlim = "no";}
	$('#labels')[0].checked=false;
	$('#regression')[0].checked=false;
	$('#interval')[0].checked=false;
	$('#intervallim')[0].checked=false;
	plotdotplot(ctx,bspoints,bootstrapvals,minxtick,maxxtick,oypixel,left,right,maxheight,colors,1,0);
	if(waslabels=="yes"){$('#labels')[0].checked=true;}
	if(wasreg=="yes"){$('#regression')[0].checked=true;}
	if(wasint=="yes"){$('#interval')[0].checked=true;}
	if(wasintlim=="yes"){$('#intervallim')[0].checked=true;}

	bootstrapvals.sort(function(a, b){return a-b});
	
	y=oypixel-3*scalefactor;
	ctx.lineWidth = 2*scalefactor;
	ctx.strokeStyle = 'rgb(0,0,255)';
	ctx.fillStyle = '#0000ff';
	fontsize = 11*scalefactor;
	ctx.font = "bold "+fontsize+"px Roboto";
	ctx.textAlign = "center";
	droppix=convertvaltopixel(dropline,minxtick,maxxtick,left,right);
	ctx.strokeStyle = 'rgb(255,0,0)';
	ctx.fillStyle = '#ff0000';
	line(ctx,droppix,add(y,-maxheight),droppix,y);
	ctx.fillText(dropline,droppix,add(y,-maxheight-5*scalefactor));
	ctx.strokeStyle = 'rgb(0,0,255)';
	ctx.fillStyle = '#0000ff';
	intervalmin=bootstrapvals[25];
	intervalminpix=convertvaltopixel(intervalmin,minxtick,maxxtick,left,right);
	intervalmax=bootstrapvals[974];
	intervalmaxpix=convertvaltopixel(intervalmax,minxtick,maxxtick,left,right);
	ctx.textAlign = "right";
	line(ctx,intervalminpix,add(y,18*scalefactor),intervalminpix,y-20*scalefactor);
	ctx.fillText(intervalmin,intervalminpix,add(y,30*scalefactor));
	ctx.textAlign = "left";
	line(ctx,intervalmaxpix,add(y,18*scalefactor),intervalmaxpix,y-20*scalefactor);
	ctx.fillText(intervalmax,intervalmaxpix,add(y,30*scalefactor));
	y=y-15*scalefactor;
	ctx.lineWidth = 10*scalefactor;
	line(ctx,intervalminpix,y,intervalmaxpix,y);
	
	//graph title
	ctx.fillStyle = '#000000';
	fontsize = 20*scalefactor;
	ctx.font = "bold "+fontsize+"px Roboto";
	ctx.textAlign="center";
	ctx.fillText($('#title').val(),width/2,30*scalefactor);

	//x-axis title
	ctx.fillStyle = '#000000';
	fontsize = 15*scalefactor;
	ctx.font = "bold "+fontsize+"px Roboto";
	ctx.textAlign="center";
	ctx.fillText($('#xaxis').val(),width/2,height/2.5-10*scalefactor);

	//x-axis title
	ctx.fillStyle = '#000000';
	fontsize = 15*scalefactor;
	ctx.font = "bold "+fontsize+"px Roboto";
	ctx.textAlign="center";
	ctx.fillText('Bootstrap - '+$('#btype').val(),width/2,height-10*scalefactor);

	labelgraph(ctx,width,height);
	if($('#invert').is(":checked")){
		invert(ctx)
	}

	var dataURL = canvas.toDataURL();
	return dataURL;
	
}

function advancedtoolsshow(){
	$('#advanceddiv').show();
}

function tscomponents(){
	let output = [];
	let compare=function(a,b){return(a<b)?-1:1};
	output["Rawdata"]={};
	output['Rawdata']['Min']=ymin;
	output['Rawdata']['Max']=ymax;
	let range=ymax-ymin;
	output['Rawdata']['Range']=range;
	let trenddata=[...trend];
	trenddata.sort(compare);
	output["Trend"]={};
	output['Trend']['Min']=trenddata[0];
	output['Trend']['Max']=trenddata[trenddata.length-1];
	output['Trend']['Range']=(trenddata[trenddata.length-1]-trenddata[0]);
	output['Trend']['Influence']=((trenddata[trenddata.length-1]-trenddata[0])/range*100).toFixed(1)+'%';
	let seasondata=[...s];
	seasondata.sort(compare);
	output["Seasonal"]={};
	output['Seasonal']['Min']=seasondata[0];
	output['Seasonal']['Max']=seasondata[seasondata.length-1];
	output['Seasonal']['Range']=seasondata[seasondata.length-1]-seasondata[0];
	output['Seasonal']['Influence']=((seasondata[seasondata.length-1]-seasondata[0])/range*100).toFixed(1)+'%';
	let residualdata=[...r];
	residualdata.sort(compare);
	output["Residual"]={};
	output['Residual']['Min']=residualdata[0];
	output['Residual']['Max']=residualdata[residualdata.length-1];
	output['Residual']['Range']=(residualdata[residualdata.length-1]-residualdata[0]);
	output['Residual']['Influence']=((residualdata[residualdata.length-1]-residualdata[0])/range*100).toFixed(1)+'%';
	console.table(output)
}

function newbsteachstep(){
	
	if(typeof timer !== "undefined"){
		clearTimeout(timer);
	}

	var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');
	
	if(currentbsspeed == 'stopped' && currentbsteachstep!='presample'){
		var dataURL = canvas.toDataURL();
		return dataURL;
	}
	
	if(currentbsteachstep=='finished'){
		currentbsspeed = 'stopped';
	}

	//set size
	var width = $('#width').val();
	var height = $('#height').val();

	ctx.canvas.width = width;
	ctx.canvas.height = height;

	ctx.fillStyle = "#ffffff";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	//get points
	var xpoints = (dataforselector[$('#xvar option:selected').text()]).slice();
	var ypoints = (dataforselector[$('#yvar option:selected').text()]).slice();

	//check for numeric value
	var points=[];
	var allpoints=[];
	var pointsremoved=[];
	var pointsforminmax=[];
	for (var index in xpoints){
		if($.isNumeric(xpoints[index])){
			points.push(index);
			allpoints.push(index);
			pointsforminmax.push(xpoints[index]);
		} else {
			pointsremoved.push(add(index,1));
		}
	}

	if(points.length==0){
		return 'Error: You must select a numeric variable for "Numerical 1"';
	}

	if(ypoints.length>0){
		allydifferentgroups = split(allpoints,ypoints,2,2);
		if(typeof allydifferentgroups === 'object'){
			for (index in allydifferentgroups){
				group = index;
				depoints=allydifferentgroups[index];
				for (index in depoints){
					point=depoints[index];
					ypoints[point]=group;
				}

			}
		} else {
			return allydifferentgroups;
		}
	} else {
		return 'Error: you must select a variable with only 2 values for "Category 1"';
	}

	if(pointsremoved.length!=0 && $('#removedpoints').is(":checked")){
		ctx.fillStyle = '#000000';
		fontsize = 13*scalefactor;
		ctx.font = fontsize+"px Roboto";
		ctx.textAlign="right";
		ctx.fillText("ID(s) of Points Removed: "+pointsremoved.join(", "),width-48*scalefactor,48*scalefactor);
	}

	var oypixel=height*0.3-60*scalefactor;
	var maxheight=height*0.3-160*scalefactor;
	var left=60*scalefactor;
	var right=width-60*scalefactor;

	//Original Data Title
	ctx.fillStyle = '#000000';
	fontsize = 20*scalefactor;
	ctx.font = "bold "+fontsize+"px Roboto";
	ctx.textAlign="left";
	ctx.fillText('Original Data',30*scalefactor,30*scalefactor);

	//This Randomisation Title
	ctx.fillStyle = '#000000';
	fontsize = 20*scalefactor;
	ctx.font = "bold "+fontsize+"px Roboto";
	ctx.textAlign="left";
	ctx.fillText('This Bootstrap Sample',30*scalefactor,height*0.3+30*scalefactor);

	//Re-randomisation distribution
	ctx.fillStyle = '#000000';
	fontsize = 20*scalefactor;
	ctx.font = "bold "+fontsize+"px Roboto";
	ctx.textAlign="left";
	ctx.fillText('Bootstrap Distribution',30*scalefactor,height*0.6+30*scalefactor);

	xmin = Math.min.apply(null, pointsforminmax);
	xmax = Math.max.apply(null, pointsforminmax);
	if($.isNumeric($('#boxplotmin').val())){
		xmin=$('#boxplotmin').val();
	}
	if($.isNumeric($('#boxplotmax').val())){
		xmax=$('#boxplotmax').val();
	}

	//x-axis title
	ctx.fillStyle = '#000000';
	fontsize = 15*scalefactor;
	ctx.font = "bold "+fontsize+"px Roboto";
	ctx.textAlign="center";
	ctx.fillText($('#xaxis').val(),width/2,height*0.3-10*scalefactor);

	//y-axis title
	if($('#yaxis').val() != "Y Axis Title"){
		var x, y;
		x=20*scalefactor;
		y=height*0.15;
		ctx.save();
		ctx.fillStyle = '#000000';
		fontsize = 15*scalefactor;
		ctx.font = "bold "+fontsize+"px Roboto";
		ctx.translate(x, y);
		ctx.rotate(-Math.PI/2);
		ctx.textAlign = "center";
		ctx.fillText($('#yaxis').val(), 0, 0);
		ctx.restore();
	}

	//x-axis title
	ctx.fillStyle = '#000000';
	fontsize = 15*scalefactor;
	ctx.font = "bold "+fontsize+"px Roboto";
	ctx.textAlign="center";
	ctx.fillText($('#xaxis').val(),width/2,height*0.6-10*scalefactor);

	//y-axis title
	if($('#yaxis').val() != "Y Axis Title"){
		var x, y;
		x=20*scalefactor;
		y=height*0.45;
		ctx.save();
		ctx.fillStyle = '#000000';
		fontsize = 15*scalefactor;
		ctx.font = "bold "+fontsize+"px Roboto";
		ctx.translate(x, y);
		ctx.rotate(-Math.PI/2);
		ctx.textAlign = "center";
		ctx.fillText($('#yaxis').val(), 0, 0);
		ctx.restore();
	}

	var depoints=[];

	for (var index in allydifferentgroups){
		depoints[index]=[];
		thesepoints = allydifferentgroups[index];
		for (var p in thesepoints){
			zp = xpoints[thesepoints[p]];
			depoints[index].push(zp);
		}
	}

	medians=[];
	cnames=[];

	var i=0;
	for (var index in depoints){
		cnames[i] = index;
		medians[i] = median(depoints[index]);
		i++;
	}

	diff = parseFloat(Number(medians[0]-medians[1]).toPrecision(10));

	if(diff<0){
		diff=-diff;
		reverse=-1;
	} else {
		reverse=1;
	}
	odiff = diff;
	
	var minmaxstep = axisminmaxstep(xmin,xmax);
	var minxtick=minmaxstep[0];
	var maxxtick=minmaxstep[1];
	var xstep=minmaxstep[2];
	
	// set up axis for bootstrap
	steps=(maxxtick-minxtick)/xstep;
	
	offset=minxtick+xstep*Math.floor(steps/2)-odiff;
	offset=-offset;
	offset=Math.floor(offset/xstep);
	offset=xstep*offset;
	bottomminxtick=minxtick+offset;
	bottommaxxtick=maxxtick+offset;
	
	if(bottommaxxtick<diff){
		maxxtick += Math.ceil((diff-bottommaxxtick)/xstep+1)*xstep;
		minxtick -= Math.ceil((diff-bottommaxxtick)/xstep+1)*xstep;
	}

	horaxis(ctx,left,right,add(oypixel,10*scalefactor),minxtick,maxxtick,xstep);
	horaxis(ctx,left,right,add(oypixel+height*0.3,10*scalefactor),minxtick,maxxtick,xstep);

	var alpha = 1-$('#trans').val()/100;

	colors = makecolors(alpha,ctx);

	for (var index in allydifferentgroups){
		plotdotplot(ctx,allydifferentgroups[index],xpoints,minxtick,maxxtick,oypixel,left,right,maxheight,colors,2,1);
		ctx.fillStyle = '#000000';
		fontsize = 15*scalefactor;
		ctx.font = "bold "+fontsize+"px Roboto";
		ctx.textAlign="right";
		ctx.fillText(index,right+10,oypixel-maxheight/2);
		oypixel = oypixel-maxheight;
	}
	
	ctx.lineWidth = 2*scalefactor;
	ctx.strokeStyle = 'rgb(0,0,255)';
	y = height*0.15+5*scalefactor;
	if(reverse==1){
		med1=medians[1];
		med2=medians[0];
	} else {
		med2=medians[1];
		med1=medians[0];
	}
	leftxpixel = convertvaltopixel(med1,minxtick,maxxtick,left,right);
	rightxpixel = convertvaltopixel(med2,minxtick,maxxtick,left,right);
	line(ctx,leftxpixel,y,rightxpixel,y);
	line(ctx,rightxpixel-5*scalefactor,y-5*scalefactor,rightxpixel,y);
	line(ctx,rightxpixel-5*scalefactor,add(y,5*scalefactor),rightxpixel,y);
	
	// Create this bootstrap
	if(currentbsteachstep=='presample'){
		currentbsteachsamplepoints = [];
		currentbsteachsample = {};
		currentbsteachygroups = [];
		currentbsteachxpoints = [];
		currentbsteachypoints = [];
		num = points.length;
		for (index in points){
			sel=randint(0,num-1);
			point=points[sel];
			xval=xpoints[point];
			yval=ypoints[point];
			currentbsteachxpoints.push(xval);
			currentbsteachypoints.push(yval);
			currentbsteachsamplepoints.push(index);
		}
		currentbsteachopoints = currentbsteachypoints.slice();
		for (var index in allydifferentgroups){
			currentbsteachsample[index]=[];
			currentbsteachygroups.push(index);
		}
		currentbsteachygroups.sort();
		if(currentbsspeed != 'stopped'){
			currentbsteachstep='sample';
		}
		lastkey = -1;
	}
	
	if(currentbsteachstep=='sample' && (currentbsspeed=='restfast' || currentbsspeed=='restmedium' || currentbsspeed=='restslow')){
		currentbsteachsample = split(allpoints,currentbsteachopoints,2,2);
		currentbsteachstep = 'plotdifference';
	}
	
	if(currentbsteachstep=='calcdifference' || currentbsteachstep=='plotdifference'){
		$('#boxplot').prop('checked', true);
		// plot arrow on middle graph
		ctx.lineWidth = 2*scalefactor;
		ctx.strokeStyle = 'rgb(255,0,0)';
		y = height*0.45+5*scalefactor;
		group1=[];
		group2=[];
		for (point in currentbsteachxpoints){
			xval=currentbsteachxpoints[point];
			group=currentbsteachopoints[point];
			if(cnames[0]==group){
				group1.push(xval);
			} else {
				group2.push(xval);
			}
		}
		if(reverse==1){
			med1=median(group2);
			med2=median(group1);
		} else {
			med1=median(group1);
			med2=median(group2);
		}
		leftxpixel = convertvaltopixel(med1,minxtick,maxxtick,left,right);
		rightxpixel = convertvaltopixel(med2,minxtick,maxxtick,left,right);
		if(leftxpixel<rightxpixel){
			line(ctx,leftxpixel,y,rightxpixel,y);
			line(ctx,rightxpixel-5*scalefactor,y-5*scalefactor,rightxpixel,y);
			line(ctx,rightxpixel-5*scalefactor,add(y,5*scalefactor),rightxpixel,y);
		} else {
			line(ctx,leftxpixel,y,rightxpixel,y);
			line(ctx,rightxpixel+5*scalefactor,y-5*scalefactor,rightxpixel,y);
			line(ctx,rightxpixel+5*scalefactor,add(y,5*scalefactor),rightxpixel,y);
		}
	}
	
	
	if(currentbsteachstep=='plotdifference'){	
		diff = med2-med1;
		currentbsteachdiffs.push(diff);
		$('#bsteachremaining').html($('#bsteachremaining').html()-1);
	}
	
	// Add point to this sample
	if(currentbsteachstep=='sample'){
		$('#boxplot').prop('checked', false);
		thispoint = currentbsteachsamplepoints.shift();
		thisgroup = currentbsteachypoints.shift();
		currentbsteachsample[thisgroup].push(thispoint);
	}
	
	// graph this randomisation
	lastpoint = -1;
	var oypixel=height*0.6-60*scalefactor;
	for (var index in currentbsteachsample){
		plotdotplot(ctx,currentbsteachsample[index],currentbsteachxpoints,minxtick,maxxtick,oypixel,left,right,maxheight,colors,2,1);
		if(highestkey>lastpoint){
			lastpoint = highestkey;
			ypixel = lastypixel;
			if(ypixel<120){
				console.log(ypixel)
				return;
			}
		}
		ctx.fillStyle = '#000000';
		fontsize = 15*scalefactor;
		ctx.font = "bold "+fontsize+"px Roboto";
		ctx.textAlign="right";
		ctx.fillText(index,right+10,oypixel-maxheight/2);
		oypixel = oypixel-maxheight;
	}
	
	// draw dropdown line
	if(currentbsteachstep=='sample'){
		xpixel = convertvaltopixel(currentbsteachxpoints[thispoint],minxtick,maxxtick,left,right);
		ctx.lineWidth = 2*scalefactor;
		ctx.strokeStyle = 'rgb(255,0,0)';
		//ytop = ypixel-5*scalefactor-height*0.3;
		console.log(thispoint);
		console.log(currentbsteachopoints[thispoint]);
		ytop = height*0.3-85*scalefactor-maxheight/2+currentbsteachygroups.indexOf(currentbsteachopoints[thispoint])*maxheight;
		ybottom = ypixel-5*scalefactor;
		line(ctx,xpixel,ytop,xpixel,ybottom);
		line(ctx,xpixel-5*scalefactor,ybottom-5*scalefactor,xpixel,ybottom);
		line(ctx,xpixel+5*scalefactor,ybottom-5*scalefactor,xpixel,ybottom);
		if(currentbsteachsamplepoints.length==0){
			currentbsteachstep = 'calcdifference';
		}
	}

	if(reverse==1){
		title="Difference Between Medians (" + cnames[0] + " - " + cnames[1] + ")";
	} else {
		title="Difference Between Medians (" + cnames[1] + " - " + cnames[0] + ")";
	}

	//bs x-axis title
	ctx.fillStyle = '#000000';
	fontsize = 15*scalefactor;
	ctx.font = "bold "+fontsize+"px Roboto";
	ctx.textAlign="center";
	ctx.fillText(title,width/2,height-10*scalefactor);

	
	// set up axis for bootstrap
	steps=(maxxtick-minxtick)/xstep;
	
	offset=minxtick+xstep*Math.floor(steps/2)-odiff;
	offset=-offset;
	offset=Math.floor(offset/xstep);
	offset=xstep*offset;
	minxtick=minxtick+offset;
	maxxtick=maxxtick+offset;

	oypixel = height - 75*scalefactor;
	horaxis(ctx,left,right,add(oypixel,15*scalefactor),minxtick,maxxtick,xstep);

	maxheight=height*0.4-120*scalefactor;
	
	bspoints=[];
	i=0;
	while(i<currentbsteachdiffs.length){
		bspoints.push(i);
		i++;
	}
	if(currentbsteachstep=='finished'){
		diff = odiff;
		colors = makebscolors(1000,alpha,currentbsteachdiffs);
	} else {
		colors = makeblankcolors(currentbsteachdiffs.length,alpha);
	}
	$('#boxplot').prop('checked', false);
	$('#meandot').prop('checked', false);
	plotdotplot(ctx,bspoints,currentbsteachdiffs,minxtick,maxxtick,oypixel-20*scalefactor,left,right,maxheight,colors,1,0);
	ypixel = lastypixel;
	
	if(currentbsteachstep=='plotdifference'){
		// plot arrow on bottom graph
		ctx.lineWidth = 2*scalefactor;
		ctx.strokeStyle = 'rgb(255,0,0)';
		y = ypixel;
		offset=minxtick+xstep*Math.floor(steps/2)-odiff;
		offset=-offset;
		offset=Math.floor(offset/xstep);
		offset=xstep*offset;
		diffpix=convertvaltopixel(diff,minxtick+offset,maxxtick+offset,left,right);
		zeropix=convertvaltopixel(0,minxtick+offset,maxxtick+offset,left,right);
		if(zeropix<diffpix){
			line(ctx,zeropix,y,diffpix,y);
			line(ctx,diffpix-5*scalefactor,y-5*scalefactor,diffpix,y);
			line(ctx,diffpix-5*scalefactor,add(y,5*scalefactor),diffpix,y);
		} else {
			line(ctx,zeropix,y,diffpix,y);
			line(ctx,diffpix+5*scalefactor,y-5*scalefactor,diffpix,y);
			line(ctx,diffpix+5*scalefactor,add(y,5*scalefactor),diffpix,y);
		}
	}
	
	if(currentbsteachstep=='finished'){
		currentbsteachdiffs.sort(function(a, b){return a-b});
		y=oypixel-20*scalefactor;
		ctx.lineWidth = 2*scalefactor;
		ctx.strokeStyle = 'rgb(0,0,255)';
		ctx.fillStyle = '#0000ff';
		fontsize = 11*scalefactor;
		ctx.font = "bold "+fontsize+"px Roboto";
		ctx.textAlign = "center";
		diffpix=convertvaltopixel(diff,minxtick,maxxtick,left,right);
		zeropix=convertvaltopixel(0,minxtick,maxxtick,left,right);
		line(ctx,zeropix,y,diffpix,y);
		line(ctx,diffpix-5*scalefactor,y-5*scalefactor,diffpix,y);
		line(ctx,diffpix-5*scalefactor,add(y,5*scalefactor),diffpix,y);
		ctx.fillText(diff,diffpix,add(y,15*scalefactor));
		intervalmin=currentbsteachdiffs[25];
		intervalminpix=convertvaltopixel(intervalmin,minxtick,maxxtick,left,right);
		intervalmax=currentbsteachdiffs[974];
		intervalmaxpix=convertvaltopixel(intervalmax,minxtick,maxxtick,left,right);
		ctx.textAlign = "right";
		line(ctx,intervalminpix,add(y,18*scalefactor),intervalminpix,y-20*scalefactor);
		ctx.fillText(intervalmin,intervalminpix,add(y,28*scalefactor));
		ctx.textAlign = "left";
		line(ctx,intervalmaxpix,add(y,18*scalefactor),intervalmaxpix,y-20*scalefactor);
		ctx.fillText(intervalmax,intervalmaxpix,add(y,28*scalefactor));
		y=y-15*scalefactor;
		ctx.lineWidth = 10*scalefactor;
		line(ctx,intervalminpix,y,intervalmaxpix,y);
		animate = false;
	}
	
	if($('#bsteachremaining').html()==0){
		currentbsteachstep='finished';
		currentbsteachsample = {};
	}
	
	if(currentbsteachstep=='plotdifference'){
		currentbsteachstep='presample';
	}
	
	if(currentbsteachstep=='calcdifference'){
		currentbsteachstep='plotdifference';
	}
	
	if(currentbsspeed=='oneslow'){
		if(currentbsteachstep=='presample'){
			animate = false;
			currentbsspeed = 'stopped';
		} else {
			timer = setTimeout(updategraph,1000);
		}
	}
	
	if(currentbsspeed=='onefast'){
		if(currentbsteachstep=='presample'){
			animate = false;
			currentbsspeed = 'stopped';
		} else {
			timer = setTimeout(updategraph,100);
		}
	}
	
	if(currentbsspeed=='restslow'){
		timer = setTimeout(updategraph,200);
	}
	
	if(currentbsspeed=='restmedium'){
		timer = setTimeout(updategraph,50);
	}
	
	if(currentbsspeed=='restfast'){
		timer = setTimeout(updategraph,0);
	}

	labelgraph(ctx,width,height);

	var dataURL = canvas.toDataURL();
	return dataURL;
}

function newbsteach(){
	$('#xvar').show();
	$('#yvar').show();
	$('#thicklinesshow').show();
	$('#transdiv').show();
	$('#sizediv').show();
	$('#greyscaleshow').show();
	$('#stackdotsshow').show();
	$('#pointsizename').html('Point Size:');
	$('#boxplot').prop('checked', true);
	$('#meandot').prop('checked', false);
	$('#highboxplot').prop('checked', false);
	$('#boxnowhisker').prop('checked', false);
	$('#boxnooutlier').prop('checked', false);
	$('#interval').prop('checked', false);
	$('#intervallim').prop('checked', false);
	$('#regression').prop('checked', false);
	$('#gridlinesshow').show();
	$('#removedpointsshow').show();
	$('#var1label').html("Numerical 1:<br><small>required</small>");
	$('#var2label').html("Category 1:<br><small>required</small>");
	document.getElementById("color").selectedIndex != document.getElementById("yvar").selectedIndex;
	return newbsteachstep();
}