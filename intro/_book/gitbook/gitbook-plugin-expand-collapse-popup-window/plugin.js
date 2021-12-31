var my_text="Hello this is an example of customize content.<br>\
if you want to wrap ,you have to type a '&lt;br&gt;',and '\\r\\n' is no use.";
var Tom_info = "\
Tel:18938862457<br>\
Mail:tommy@abcd.com<br>\
Addr:16 Romm,Amazing Street,Mars Province\
";

function expand_collapse(id,id_head){
    var open="▼";close="►";//▷▽ ►▼ ▸▾ ▹▿
    if(document.getElementById(id).style.maxHeight == "0px") 
    {
        document.getElementById(id_head).innerHTML = document.getElementById(id_head).innerHTML.replace(close,open);
        document.getElementById(id).style.maxHeight="900px";
        setTimeout('document.getElementById("'+id+'").style.overflow = "visible"',250);//目的：不让popup window超出父元素范围时不显示
    }
    else if(document.getElementById(id).style.maxHeight == "900px")
    {
        document.getElementById(id).style.overflow = "hidden";
        document.getElementById(id).style.maxHeight="0px"; 
        document.getElementById(id_head).innerHTML = document.getElementById(id_head).innerHTML.replace(open,close);
    }
    else    //value of maxHeight is null on first load,so add this
    {
        
        document.getElementById(id_head).innerHTML = document.getElementById(id_head).innerHTML.replace(close,open);
        document.getElementById(id).style.maxHeight="900px";
        setTimeout('document.getElementById("'+id+'").style.overflow = "visible"',250);
    }    
}