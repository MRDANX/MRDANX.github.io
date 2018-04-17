if (/iPad|Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
  window.location.href = "mobile/index.html";
}
window.onload = function() {
  //获取客户端宽度，并根据宽度设置banner的宽
  var clientWidth = document.documentElement.getBoundingClientRect().width;
  document.querySelectorAll('body>div').forEach(function(current) {
    current.style.width = clientWidth + 'px';
    current.style.margin = '0 auto';
  })
  var carousel = document.querySelector('.carousel'),
    carouselController = document.querySelectorAll('.carousel-controller>li');
  carousel.style.width = clientWidth + 'px';
  var carouselUl = carousel.firstElementChild,
    carouselLi = carouselUl.children;
  carouselUl.style.left = (-clientWidth) + 'px';
  carouselUl.style.width = (clientWidth * 3) + 'px';
  for (var i = 0; i < carouselLi.length; i++) {
    carouselLi[i].style.width = clientWidth + 'px';
  }

  function carouseling() {
    carouselUl.animate({
      left: [0, (-clientWidth) + 'px']
    }, {
      duration: 500,
      fill: 'forwards'
    });
    var nextActiveController = document.querySelector('.carousel-controller>li.banner-active').nextElementSibling;
    for (var i = 0; i < carouselController.length; i++) {
      carouselController[i].className = '';
    }
    if (nextActiveController !== null) {
      nextActiveController.setAttribute('class', 'banner-active');
    } else {
      carouselController[0].setAttribute('class', 'banner-active');
    }
    carouselUl.append(carouselUl.firstElementChild);
  }
  //设置图片轮播
  var carouselInterval = setInterval(carouseling, 5000);
  carouselController.forEach(function(controller) {
    controller.onclick = function() {
      //清除间隔循环
      clearInterval(carouselInterval)
      for (var i = 0; i < carouselController.length; i++) {
        carouselController[i].className = '';
      }
      this.setAttribute('class', 'banner-active');
      var index = this.getAttribute('banner');
      carouselUl.animate({
        left: [0, (-clientWidth) + 'px']
      }, {
        duration: 500,
        fill: 'forwards'
      });
      clickBanner = document.querySelector('.carousel>ul>li[banner="' + index + '"]');
      if (clickBanner == carouselLi[2]) { //插入第二个元素之前
        carouselUl.insertBefore(clickBanner, carouselLi[1]);
      } else { //插入最后一个元素之前
        carouselUl.insertBefore(clickBanner, carouselLi[2]);
      }
      carouselInterval = setInterval(carouseling, 5000)
    }
  })
  //显示/隐藏商品列表
  function showAndHideList(list, distance, opacity, quick) {
    setTimeout(function() {
      for (var i = 0; i < list.length; i++) {
        list[i].style.transition = 'all ' + (0.8 + 0.2 * i - quick) + 's';
        list[i].style.transform = 'translateX(' + distance + 'px)';
        list[i].style.opacity = opacity;
      }
    }, 100);
  }
  //根据不同情况更改头部背景颜色
  function changeHeaderBg() {
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollTop >= 500) {
      for (var i = 0; i < anchors.length; i++) {
        anchors[i].style.color = 'black';
      }
      header.style.backgroundColor = 'white';
      meizuLogo.style.background = 'url("img/logo_hover.png")';
    } else if (scrollTop == 0 && !isHovering) {
      for (var i = 0; i < anchors.length; i++) {
        anchors[i].style.color = 'white';
      }
      header.style.backgroundColor = 'transparent';
      meizuLogo.style.background = 'url("img/logo.png")';
    }
  }
  var productList = document.querySelectorAll('li[class^="meizu-header-link-product"]'),
    header = document.querySelector('.meizu-header'),
    meizuLogo = document.querySelector('.meizu-logo'),
    anchors = document.querySelectorAll('.meizu-header-link>li>a'),
    hideLists = document.querySelectorAll('ul[class^="meizu-header-hide-list"]'),
    isHovering = false;
  //顶部鼠标悬浮显示商品列表
  productList.forEach(function(self) {
    self.onmouseover = function() {
      isHovering = true;
      for (var i = 0; i < anchors.length; i++) {
        anchors[i].style.color = 'black';
      }
      //隐藏商品列表并重置
      for (var i = 0; i < hideLists.length; i++) {
        hideLists[i].style.display = 'none';
        showAndHideList(hideLists[i].children, 50, 0, 0);
      }
      header.style.backgroundColor = 'white';
      header.style.height = '220px';
      meizuLogo.style.background = 'url("img/logo_hover.png")';
      switch (this.className) {
        case 'meizu-header-link-product-mx':
          hideLists[0].style.display = 'flex';
          showAndHideList(hideLists[0].children, 0, 1, 0);
          break;
        case 'meizu-header-link-product-meilan':
          hideLists[1].style.display = 'flex';
          showAndHideList(hideLists[1].children, 0, 1, 0);
          break;
        case 'meizu-header-link-product-accessory':
          hideLists[2].style.display = 'flex';
          showAndHideList(hideLists[2].children, 0, 1, 0);
          break;
        default:
          console.log('something wrong! passed the switch block');
      }
    };
    self.onmouseleave = function() {
      this.style.display = 'flex';
    };
  });

  //鼠标移除头部隐藏商品列表
  header.onmouseleave = function() {
    isHovering = false;
    header.style.height = '82px';
    // header.style.backgroundColor = 'transparent';
    // meizuLogo.style.background = 'url("img/logo.png")';
    // for (var i = 0; i < anchors.length; i++) {
    //   anchors[i].style.color = 'white';
    // }
    for (var i = 0; i < hideLists.length; i++) {
      hideLists[i].style.display = 'none';
      showAndHideList(hideLists[i].children, 50, 0, 0);
    }
    changeHeaderBg()
  };
  changeHeaderBg()
  window.onscroll = function() {
    changeHeaderBg()
  }

}
