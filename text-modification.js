function getHeight(el){
  return el.getBoundingClientRect().height;
}

function getComputedStyles(el) {
  return document.defaultView.getComputedStyle(el,null);
}

function getStyles(el,styles,computedNode,result) {
  result = {};
  if(typeof style === "string") styles = [styles];
  if(typeof el === "string") el = document.querySelector(el);
  
  computedNode = getComputedStyles(el);
  styles.forEach(function(style,i){
    result[styles[i]] = computedNode[styles[i]];
  });
  return result;
}
function truncateCopy(el,lines,styles,s1,s2,regexp){
  styles = {};
  regex = new RegExp(/(\s*[^ ]*?\s*?$)/)
  el = typeof el === "string" ? document.querySelectorAll(el) : [el];
  el.forEach(function(e){
    styles = getStyles(e,["lineHeight"]);
    e.innerHTML = "<span><span>" + e.innerHTML + "</span></span>";
    s1 = e.querySelector("span");
    s2 = s1.querySelector("span");
    s1.setAttribute("style","".concat(
      "height:" + parseFloat(styles["lineHeight"]) * lines + "px;",
      "display:block;",
      "overflow-y:hidden;"));
    while(getHeight(s2) > getHeight(s1)){
      s2.innerHTML = s2.innerHTML.replace(regex,"...");
    }
    e.innerHTML = s2.innerHTML;
  });
}

function reduceCopy(el,lines,styles,s1,s2){
  styles = {};
  el = typeof el === "string" ? document.querySelectorAll(el) : [el];
  el.forEach(function(e){
    styles = getStyles(e,["fontSize","lineHeight"]);
    styles["fontSize"] = parseFloat(styles["fontSize"]);
    styles["lineHeight"] = parseFloat(styles["lineHeight"]);
    e.innerHTML = "<span><span>" + e.innerHTML + "</span></span>";
    s1 = e.querySelector("span");
    s2 = s1.querySelector("span");
    s1.setAttribute("style","".concat(
      "height:" + styles["lineHeight"] * lines + "px;",
      "display:block;",
      "overflow-y:hidden;"));
    while(getHeight(s2) > getHeight(s1)){
      styles["fontSize"]--;
      styles["lineHeight"]--;
      e.style["fontSize"] = styles["fontSize"] + "px";
      e.style["lineHeight"] = styles["lineHeight"] + "px";
    }
    e.innerHTML = s2.innerHTML;
  });
}
