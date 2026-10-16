
(function(){
/* headline letter mixing: alternate chunks switch to the serif italic */
var pat=[2,1,3,1,2];
document.querySelectorAll('[data-mix]').forEach(function(el){
  var txt=el.textContent,out='',k=0,left=pat[0],it=false,pi=0;
  el.setAttribute('aria-label',txt);
  for(var i=0;i<txt.length;i++){
    var ch=txt[i];
    if(ch===' '||ch==='.'){if(it){out+='</i>';it=false}out+=ch;continue}
    if(left===0){pi=(pi+1)%pat.length;left=pat[pi];if(it){out+='</i>';it=false}else{out+='<i>';it=true}}
    out+=ch;left--;
  }
  if(it)out+='</i>';
  el.innerHTML='<span aria-hidden="true">'+out+'</span>';
});
})();
