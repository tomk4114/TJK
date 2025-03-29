//
//  Function to return the value of the cookie specified by "name".
//    name - String object containing the cookie name.
//    returns - String object containing the cookie value, or null if
//      the cookie does not exist.
//
function GetCookie (name) {
  var arg = name + "=";
  var alen = arg.length;
  var clen = document.cookie.length;
  var i = 0;
  while (i < clen) {
    var j = i + alen;
    if (document.cookie.substring(i, j) == arg)
      return getCookieVal (j);
    i = document.cookie.indexOf(" ", i) + 1;
    if (i == 0) break;
  }
  return null;
}

//
// "Internal" function to return the decoded value of a cookie
//
function getCookieVal (offset) {
  var endstr = document.cookie.indexOf (";", offset);
  if (endstr == -1)
    endstr = document.cookie.length;
  return unescape(document.cookie.substring(offset, endstr));
}

//
//  Function to create or update a cookie.
//    name - String object containing the cookie name.
//    value - String object containing the cookie value.  May contain
//      any valid string characters.
//    [expires] - Date object containing the expiration data of the cookie.  If
//      omitted or null, expires the cookie at the end of the current session.
//    [path] - String object indicating the path for which the cookie is valid.
//      If omitted or null, uses the path of the calling document.
//    [domain] - String object indicating the domain for which the cookie is
//      valid.  If omitted or null, uses the domain of the calling document.
//    [secure] - Boolean (true/false) value indicating whether cookie
//      transmission requires a secure channel (HTTPS).
//
//  The first two parameters are required.  The others, if supplied, must
//  be passed in the order listed above.  To omit an unused optional field,
//  use null as a place holder.  For example, to call SetCookie using name,
//  value and path, you would code:
//
//      SetCookie ("myCookieName", "myCookieValue", null, "/");
//
//  Note that trailing omitted parameters do not require a placeholder.
//
//  To set a secure cookie for path "/myPath", that expires after the
//  current session, you might code:
//
//      SetCookie (myCookieVar, cookieValueVar, null, "/myPath", null, true);
//
function SetCookie (name,value,expires,path,domain,secure) {
  document.cookie = name + "=" + escape (value) +
    ((expires) ? "; expires=" + expires.toGMTString() : "") +
    ((path) ? "; path=" + path : "") +
    ((domain) ? "; domain=" + domain : "") +
    ((secure) ? "; secure" : "");
}

//  Function to delete a cookie. (Sets expiration date to start of epoch)
//    name -   String object containing the cookie name
//    path -   String object containing the path of the cookie to delete.  This
//             MUST be the same as the path used to create the cookie, or
//             null/omitted if no path was specified when creating the cookie.
//    domain - String object containing the domain of the cookie to delete.
//             This MUST be the same as the domain used to create the cookie,
//             or null/omitted if no domain was specified when creating the
//             cookie.
//
function DeleteCookie (name,path,domain) {
  if (GetCookie(name)) {
    document.cookie = name + "=" +
      ((path) ? "; path=" + path : "") +
      ((domain) ? "; domain=" + domain : "") +
      "; expires=Thu, 01-Jan-70 00:00:01 GMT";
  }
}

// function to see if a cookie was successfully created:
function TestCookie(name,setvalue) {
  var testvalue = GetCookie(name);
  if (setvalue == testvalue) {
      return "Enabled";
  }
  else {
  	return "Disabled";
  }
}

//======================================================================
// New CBT related functions:
//======================================================================
var ipagecurrent;
var strpage;

 // delete all CBT related cookies
 function DeleteCookies() {
	var cnt = 0; var tmpStr = ""; var tmpChr = ""; var myLength = 0; myStr = "";

	myLength = document.cookie.length;
	myStr = document.cookie;

	while (cnt < myLength) {
		tmpChr = myStr.charAt(cnt);
		if (tmpChr == '=') {
			DeleteCookie (tmpStr, "/");
			tmpStr = "";
		}
		if (tmpChr == ';') {
			tmpStr = "";
		}
		if (tmpChr != '=' && tmpChr != ';' && tmpChr != " ") {
			tmpStr += tmpChr;
		}
		cnt += 1;
 	}
 }


 function GoToPage(s)
 {
 	ipagecurrent = s.value;
 	SetCookie ("PageCurrent", ipagecurrent, null, "/");
 	strpage = GetCookie("CBT_pre") + s.value + GetCookie("CBT_ext") + "?CBT_default=1";
 	SetCookie ("action", strpage, null, "/");
	location.href = strpage;
	return true;
 }

 function myPrev1()
 {
 	ipagecurrent = parseInt(GetCookie("PageCurrent"),10);
 	ipagecurrent = ipagecurrent -1;
 	SetCookie ("PageCurrent", ipagecurrent, null, "/");
 	strpage = GetCookie("CBT_pre") + ipagecurrent + GetCookie("CBT_ext") + "?CBT_default=1";
 	SetCookie ("action", strpage, null, "/");
	location.href = strpage
	return true;
 }

 function myNext1()
 {
 	ipagecurrent = parseInt(GetCookie("PageCurrent"),10);
 	ipagecurrent = ipagecurrent +1;
 	SetCookie ("PageCurrent", ipagecurrent, null, "/");
 	strpage = GetCookie("CBT_pre") + ipagecurrent + GetCookie("CBT_ext") + "?CBT_default=1";
 	SetCookie ("action", strpage, null, "/");
	location.href = strpage
	return true;
 }

 function myExit1()
 {
 	strpage = "default" + GetCookie("CBT_ext") + "?CBT_default=1";
 	SetCookie ("action", strpage, null, "/");
	location.href = strpage;
	return true;
 }

 // Gather information for CBT_Complete
 function getCBT_comp(p)
 {
 	myLength = parseInt(GetCookie("Q2pages"),10) + parseInt(GetCookie("Ipages"),10) + parseInt(GetCookie("Apages"),10) +7;
	var CBT_comp = GetCookie ("CBT_Comp");
	if (CBT_comp == null || CBT_comp == "")
	{
		CBT_comp = "0";
		for (var i=0; i < myLength; i++)
		{
   			CBT_comp = CBT_comp.concat("0");
		}
	}
	else
    {
    	var tmpStr = CBT_comp.slice(0,p);
    	var tmpStr1 = CBT_comp.slice(p+1);
    	CBT_comp = tmpStr.concat("1");
    	CBT_comp = CBT_comp.concat(tmpStr1);
    }
    var expires = new Date ();
    var days = 5;
    expires.setTime(expires.getTime() + days * (24 * 60 * 60 * 1000));
	SetCookie ("CBT_Comp", CBT_comp, expires, "/");

	// Check to see if every page has been visited
	if (CBT_comp.indexOf("0") == -1){
		var expires = new Date ();
    	var days = 5;
    	expires.setTime(expires.getTime() + days * (24 * 60 * 60 * 1000));
		SetCookie ("CBT_Passed", "True", expires, "/");
	}
	//alert(CBT_comp);
 }

  function opacity(id, opacStart, opacEnd, millisec) {
    //speed for each frame
    var speed = Math.round(millisec / 100);
    var timer = 0;

    //determine the direction for the blending, if start and end are the same nothing happens
    if(opacStart > opacEnd) {
        for(i = opacStart; i >= opacEnd; i--) {
            setTimeout("changeOpac(" + i + ",'" + id + "')",(timer * speed));
            timer++;
        }
    } else if(opacStart < opacEnd) {
        for(i = opacStart; i <= opacEnd; i++)
            {
            setTimeout("changeOpac(" + i + ",'" + id + "')",(timer * speed));
            timer++;
        }
    }
 }

 //change the opacity for different browsers
 function changeOpac(opacity, id) {
    var object = document.getElementById(id).style;
    object.opacity = (opacity / 100);
    object.MozOpacity = (opacity / 100);
    object.KhtmlOpacity = (opacity / 100);
    object.filter = "alpha(opacity=" + opacity + ")";
 }

//-----------------------------------------------------------------------------
//	javascript client side code to Parse Query String:
//-----------------------------------------------------------------------------
function PageQuery(q) {
	if(q.length > 1) this.q = q.substring(1, q.length);
	else this.q = null;
	this.keyValuePairs = new Array();
	if(q) {
		for(var i=0; i < this.q.split("&").length; i++) {
			this.keyValuePairs[i] = this.q.split("&")[i];
		}
	}
	this.getKeyValuePairs = function() { return this.keyValuePairs; }
	this.getValue = function(s) {
		for(var j=0; j < this.keyValuePairs.length; j++) {
			if(this.keyValuePairs[j].split("=")[0] == s)
				return this.keyValuePairs[j].split("=")[1];
		}
		return false;
	}
	this.getParameters = function() {
		var a = new Array(this.getLength());
		for(var j=0; j < this.keyValuePairs.length; j++) {
			a[j] = this.keyValuePairs[j].split("=")[0];
		}
		return a;
	}
	this.getLength = function() { return this.keyValuePairs.length; }
}

function queryString(key)
{
	var page = new PageQuery(window.location.search);
	return unescape(page.getValue(key));
}

function displayItem(key)
{
	if(queryString(key)=='false')
	{
		result.innerHTML="you didn't enter a ?name=value querystring item.";
	}
	else
	{
		result.innerHTML+=queryString(key)+"<BR>";
	}
}


 function getBrowser()
 {
 	var browser_OK = "False";
 	var browser_version = 0;
 	var browser_type = "N/A";
 	var height = 0;
 	var width = 0;
	var ua = window.navigator.userAgent.toLowerCase();
	if (ua.indexOf('opera') != -1)
	{
		i = ua.indexOf('opera');
		browser_type = "Opera";
		browser_version = parseFloat('0' + ua.substr(i+6), 4);
		if (browser_version >= 8)
			//browser_OK = "False";
			browser_OK = "True";
	}
	else if (ua.indexOf('msie') != -1)
	{
		i = ua.indexOf('msie');
		browser_type = "IE";
		browser_version = parseFloat('0' + ua.substr(i+5), 4);
		if (browser_version >= 6)
			browser_OK = "True";
	}
	else if (ua.indexOf('netscape') != -1)
	{
		i = ua.indexOf('netscape');
		browser_type = "Netscape";
		browser_version = parseFloat('0' + ua.substr(i+9), 3);
		if (browser_version >= 7)
			browser_OK = "True";
	}
	else if (ua.indexOf('firefox') != -1)
	{
		i = ua.indexOf('firefox');
		browser_type = "Firefox";
		browser_version = parseFloat('0' + ua.substr(i+8), 3);
		if (browser_version >= 1)
			browser_OK = "True";
	}
	else
	{
	}
	if (parseInt(navigator.appVersion)>3) {
 		width = screen.width;
 		height = screen.height;
	}
	SetCookie ("browser_OK", browser_OK, null, "/");
	SetCookie ("browser_type", browser_type, null, "/");
	SetCookie ("browser_version", browser_version, null, "/");
	//SetCookie ("User_Agent", window.navigator.userAgent, null, "/");
	SetCookie ("screenH", height, null, "/");
	SetCookie ("screenW", width, null, "/");
 }

var astring=":aAb`BcVCd/eX'DfEYg FZhi?jGk|HlmI,nJo@TKpqL.WMrsNt!uvwOx<yPz>0QR12~3S4;^567U89%$#*()-_=+" + '"È‚‰Â‡ÁÍÎÓÏ≈…Ê∆ÙˆÚ˚˘÷‹¢£•É·Ì«¸Ò—™∫ø¨Ωº°´ª¶'

// This function decrypts strings.
function decrypt(lstring){
     retstr=""
     for (var i=0;i<lstring.length;i++){
         aNum=astring.indexOf(lstring.substring(i,i+1),0)
         aNum=aNum^25
         retstr=retstr+astring.substring(aNum,aNum+1)}
     return retstr
}

// This function encrypts strings.
function encrypt(lstring){
     retstr=""
     document.CBT_form.etext.value = retstr
     for (var i=0;i<lstring.length;i++){
         aNum=astring.indexOf(lstring.substring(i,i+1),0)
         aNum=aNum^25
         retstr=retstr+astring.substring(aNum,aNum+1)}
     return retstr
}

// This function returns a random integer between 0 - i.
function get_random(i)
{
    var ranNum= Math.round(Math.random()*i);
    return ranNum;
}


// This function returns true if item is present in array.
function inArray(myArray,item)
{
	for (var i=0; i < myArray.length; i++) {
         if (myArray[i] == item) {
         	return true
         }
    }
	return false
}

// This function returns the available content height in browser window
function getInsideWindowHeight()
{
	if (window.innerHeight) {
    	return window.innerHeight;
    }
    else  {
      	// measure the html element's clientHeight
        return document.body.clientHeight;
    }
    return 0;
}

// This function enables/disables the Sound
function SetSound(onoff)
{
 	SetCookie ("CBT_Sound", onoff, null, "/");
}

// This function plays the Sound, workaround for IE KB9129945
function PlaySound(myStr) {
 	if (GetCookie('CBT_Sound')=="1") {
		document.write("<embed src=" + myStr + " AUTOSTART=true HIDDEN=true>");
	}
}

