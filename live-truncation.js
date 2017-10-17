function getHeight(el){
  // find and return the element's height
  return el.getBoundingClientRect().height;
}
function getStyle(el,style) {
  // get the current computed styles for el
  var computedNode = window.getComputedStyle(el,null);
  // find and return the value for the property === style
  return computedNode.getPropertyValue(style);
}

function truncateCopy(el,lines){
  // check if el is DOM node or querySelector
  if(typeof el === 'string'){
    // if querySelector, elements = corresponding DOM node
    var elements = document.querySelectorAll(el);
  } else {
    // if DOM node, elements = [el]
    var elements = [el];
  }
  // for each el in elements array
  elements.forEach(function(el){
    // wrap el.innerHTML with two span tags
    el.innerHTML = '<span><span>' + el.innerHTML + '</span></span>';
    var spanContainer = el.querySelector('span');
    var span = spanContainer.querySelector('span');
    // create and assign styles to spanContainer
    var styles = '';
    styles 
      += 'height:' + parseFloat(getStyle(el,'line-height')) * lines + 'px;'
      + 'display:block;'
      + 'overflow-y:hidden;';

    spanContainer.setAttribute('style',styles);
    // if span is taller than spanContainer
    if(getHeight(span) > getHeight(spanContainer)){
      // while span height > spancontainer height
      while(getHeight(span) > getHeight(spanContainer)){
        // replace last word in string with "...", if not last word in string
        if( !(/(^\s*[^ ]*?\s*?$)/.test(span.innerHTML)) ){
          span.innerHTML = span.innerHTML.replace(/(\s*[^ ]*?\s*?$)/,"...");
        }else{
        // else replace last character in string with "..."
          span.innerHTML = span.innerHTML.replace(/([^ ]\s*?$)/,"...");
        }
      }
    }
  });
}
