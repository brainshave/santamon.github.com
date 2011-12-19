(function () {
  function createCookie(name,value,days) {
	  if (days) {
		  var date = new Date();
		  date.setTime(date.getTime()+(days*24*60*60*1000));
		  var expires = "; expires="+date.toGMTString();
	  }
	  else var expires = "";
	  document.cookie = name+"="+value+expires+"; path=/";
  }

  function readCookie(name) {
	  var nameEQ = name + "=";
	  var ca = document.cookie.split(';');
	  for(var i=0;i < ca.length;i++) {
		  var c = ca[i];
		  while (c.charAt(0)==' ') c = c.substring(1,c.length);
		  if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	  }
	  return null;
  }

  function eraseCookie(name) {
	  createCookie(name,"",-1);
  }
  
  var hideshow = function (node, state) {
    var i;
    if (node.length > 0) {
      for (i = 0; i < node.length; ++i) {
        hideshow(node[i], state);
      }
    } else if (node.style) {
      node.style.display = state ? 'block' : 'none';
    }
  };
  
  var toggler = function (controllerId, subject, state, use_cookie) {
    var controller = document.getElementById(controllerId);

    if (use_cookie) {
      var cookie = readCookie(controllerId);
      state =
        cookie == 'on' ? true :
        cookie == 'off' ? false :
        state;
    }
    
    hideshow(subject, state);

    controller.onclick = function (event) {
      event = event || window.event;
      state = !state;

      if (use_cookie) {
        eraseCookie(controllerId);
        createCookie(controllerId, state ? 'on' : 'off');
      }
      
      hideshow(subject, state);

      if (event.preventDefault) event.preventDefault();
      else return false;

    };
  };
  
  window.onload = function() {
    toggler('tags_toggler', document.getElementById('tags'), false, false);
    toggler('hide_intros', document.querySelectorAll('.introduction'), true, true);
  };
})();
