function getID(id)
{
	return document.getElementById(id);
}
// Global object to hold drag information.
var dragObj = new Object();
function dragStart(event, id) {
  var x, y;
  dragObj.elNode = getID(id);
  // Get cursor position with respect to the page.
  try {
    x = window.event.clientX + document.documentElement.scrollLeft
      + document.body.scrollLeft;
    y = window.event.clientY + document.documentElement.scrollTop
      + document.body.scrollTop;
  }
  catch (e) {
    x = event.clientX + window.scrollX;
    y = event.clientY + window.scrollY;
  }
// Save starting positions of cursor and element.
 dragObj.cursorStartX = x;
  dragObj.cursorStartY = y;
  dragObj.elStartLeft  = parseInt(dragObj.elNode.style.left, 10);
  dragObj.elStartTop   = parseInt(dragObj.elNode.style.top,  10);
  if (isNaN(dragObj.elStartLeft)) dragObj.elStartLeft = 0;
  if (isNaN(dragObj.elStartTop))  dragObj.elStartTop  = 0;
  // Capture mousemove and mouseup events on the page.
  try {
    document.attachEvent("onmousemove", dragGo);
    document.attachEvent("onmouseup",   dragStop);
    window.event.cancelBubble = true;
    window.event.returnValue = false;
  }
  catch (e) {
    document.addEventListener("mousemove", dragGo,   true);
    document.addEventListener("mouseup",   dragStop, true);
    event.preventDefault();
  }
}
function dragGo(event) {
 var x, y;
// Get cursor position with respect to the page.
try  {
    x = window.event.clientX + document.documentElement.scrollLeft
      + document.body.scrollLeft;
    y = window.event.clientY + document.documentElement.scrollTop
      + document.body.scrollTop;
  }
  catch (e) {
    x = event.clientX + window.scrollX;
    y = event.clientY + window.scrollY;
  }
  // Move drag element by the same amount the cursor has moved.
  var drLeft = (dragObj.elStartLeft + x - dragObj.cursorStartX);
  var drTop = (dragObj.elStartTop  + y - dragObj.cursorStartY);
  if (drLeft > 0)
  {
     dragObj.elNode.style.left = drLeft  + "px";
  }
  else
  {
	dragObj.elNode.style.left = "1px";
  }
  if (drTop > 0)
  {
     dragObj.elNode.style.top  = drTop + "px";
  }
  else
  {
	dragObj.elNode.style.top  = "1px";
  }
  try {
    window.event.cancelBubble = true;
    window.event.returnValue = false;
  }
  catch(e){
    event.preventDefault();
  }
}
function dragStop(event) {
  // Stop capturing mousemove and mouseup events.
  try {
    document.detachEvent("onmousemove", dragGo);
    document.detachEvent("onmouseup",   dragStop);
  }
  catch (e) {
    document.removeEventListener("mousemove", dragGo,   true);
    document.removeEventListener("mouseup",   dragStop, true);
  }
}