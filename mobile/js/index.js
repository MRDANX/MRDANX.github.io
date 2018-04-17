if (!/iPad|Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
  window.location.href = "../index.html";
}

window.onload = function() {
  var html = document.documentElement;
  var clientWidth = html.getBoundingClientRect().width;
  html.style.fontSize = clientWidth / 15 + 'px';
  $('#carousel').Marquee({
    distance: clientWidth,
    time:3,
    duration: 18,
    navId:'#navList',
    eventNav:'click'
  });


  function menuToggle(e) {
    console.log(e.getAttribute('isShowing'))
    if (e.getAttribute('isShowing') == 'false') {
      logo.style.backgroundImage = 'url("img/logo_hover.png")';
      e.setAttribute('class', 'fa fa-close');
      header.style.height = (1000 / 50) + 'rem';
      header.style.backgroundColor = 'white';
      header.style.boderBottom = '1px solid #eee';
      hideLink.style.display = 'flex';
      hideLinkList = hideLink.children;
      setTimeout(function() {
        for (var i = 0; i < hideLinkList.length; i++) {
          hideLinkList[i].style.transition = 'all ' + (1 - i * 0.1) + 's linear';
          hideLinkList[i].style.top = '0';
          hideLinkList[i].style.opacity = '1';
        }
      }, 200);
      e.setAttribute('isShowing', 'true');
    } else if (e.getAttribute('isShowing') == 'true') {
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      e.setAttribute('class', 'fa fa-navicon');
      header.style.height = (100 / 50) + 'rem';
      if (scrollTop > 0) {
        header.style.backgroundColor = 'white';
        header.style.boderBottom = '1px solid #eee';
        logo.style.backgroundImage = 'url("img/logo_hover.png")';
      } else {
        header.style.backgroundColor = 'transparent';
        logo.style.backgroundImage = 'url("img/logo.png")';
      }
      hideLink.style.display = 'none';
      hideLinkList = hideLink.children;
      setTimeout(function() {
        for (var i = 0; i < hideLinkList.length; i++) {
          hideLinkList[i].style.top = '-1rem';
          hideLinkList[i].style.opacity = '0';
        }
      }, 200);
      e.setAttribute('isShowing', 'false');
    }

  }
  var toggleMenu = document.getElementById('toggleMenu'),
    header = document.querySelector('.meizu-header'),
    logo = document.querySelector('.meizu-logo'),
    hideLink = document.querySelector('.meizu-header-link');
  toggleMenu.onclick = function() {
    menuToggle(this)
  };
  window.onscroll = function() {
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollTop > 0 && toggleMenu.getAttribute('isShowing') == 'false') {
      header.style.backgroundColor = 'white';
      header.style.borderBottom = '1px solid #aaa';
      logo.style.backgroundImage = 'url("img/logo_hover.png")';
    } else {
      header.style.backgroundColor = 'transparent';
      header.style.borderBottom = 'none';
      logo.style.backgroundImage = 'url("img/logo.png")';
    }
  };

  var contactList = document.querySelectorAll('.contact-list>li');
  contactList.forEach(function(e) {
    e.onclick = function() {
      var isShowing = e.getAttribute('isShowing');
      var sublist = e.children[2],
        listIcon = e.children[1],
        sublistItems = sublist.children;
      if (isShowing == 'false') {
        e.style.height = (425 / 50) + 'rem';
        listIcon.setAttribute('class', 'fa fa-angle-up')
        sublist.style.display = 'block';
        setTimeout(function() {
          for (var i = 0; i < sublistItems.length; i++) {
            sublistItems[i].style.transition = 'all ' + (1 - i * 0.2) + 's';
            sublistItems[i].style.transform = 'translateX(0)';
            sublistItems[i].style.opacity = '1';
          }
        }, 50);
        e.setAttribute('isShowing', 'true');
      } else if (isShowing == 'true') {
        e.style.height = (80 / 50) + 'rem';
        listIcon.setAttribute('class', 'fa fa-angle-down')
        sublist.style.display = 'none';
        for (var i = 0; i < sublistItems.length; i++) {
          sublistItems[i].style.transform = 'translateX(-1rem)';
          sublistItems[i].style.opacity = '0';

        }
        e.setAttribute('isShowing', 'false');
      }
    };
  });

  document.getElementById('scrollToTop').onclick = function() {
    $('html,body').animate({
      'scrollTop': 0
    }, 1000)
  }
}
