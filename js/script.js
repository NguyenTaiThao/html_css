const SLIDE_SWITCHING_INTERVAL = 5000;

const PAGE_URL = {
  PAGE_1: "/html_css/index.html",
  PAGE_2: "/html_css/page2.html",
  PAGE_3: "/html_css/page3.html",
  PAGE_4: "/html_css/page4.html",
  PAGE_5: "/html_css/page5.html",
  PAGE_6: "/html_css/page6.html",
  PAGE_7: "/html_css/page7.html",
  PAGE_8: "/html_css/page8.html",
  PAGE_9: "/html_css/page9.html",
  PAGE_10: "/html_css/page10.html",
  PAGE_11: "/html_css/page11.html",
};

const PAGE_F_URL = {
  PAGE_1: "/html_css/fullscreen/f_index.html",
  PAGE_2: "/html_css/fullscreen/f_page2.html",
  PAGE_3: "/html_css/fullscreen/f_page3.html",
  PAGE_4: "/html_css/fullscreen/f_page4.html",
  PAGE_5: "/html_css/fullscreen/f_page5.html",
  PAGE_6: "/html_css/fullscreen/f_page6.html",
  PAGE_7: "/html_css/fullscreen/f_page7.html",
  PAGE_8: "/html_css/fullscreen/f_page8.html",
  PAGE_9: "/html_css/fullscreen/f_page9.html",
  PAGE_10: "/html_css/fullscreen/f_page10.html",
  PAGE_11: "/html_css/fullscreen/f_page11.html",
};

const slideUrlMap = [
  PAGE_URL.PAGE_1,
  PAGE_URL.PAGE_2,
  PAGE_URL.PAGE_3,
  PAGE_URL.PAGE_4,
  PAGE_URL.PAGE_5,
  PAGE_URL.PAGE_6,
  PAGE_URL.PAGE_7,
  PAGE_URL.PAGE_8,
  PAGE_URL.PAGE_9,
  PAGE_URL.PAGE_10,
  PAGE_URL.PAGE_11,
];

const fullSlideUrlMap = [
  PAGE_F_URL.PAGE_1,
  PAGE_F_URL.PAGE_2,
  PAGE_F_URL.PAGE_3,
  PAGE_F_URL.PAGE_4,
  PAGE_F_URL.PAGE_5,
  PAGE_F_URL.PAGE_6,
  PAGE_F_URL.PAGE_7,
  PAGE_F_URL.PAGE_8,
  PAGE_F_URL.PAGE_9,
  PAGE_F_URL.PAGE_10,
  PAGE_F_URL.PAGE_11,
];

var intervalObj = null;

const startKeysListener = (
  position,
  isFullScreen = false,
  animationList = []
) => {
  let currentAnimation = 0;
  document.onkeydown = (event) => {
    event = event || window.event;
    const keyCode = event.keyCode;

    switch (keyCode) {
      case 37:
        currentAnimation = previousAction(
          position,
          isFullScreen,
          animationList,
          currentAnimation
        );
        break;
      case 38:
        break;
      case 39:
        currentAnimation = nextAction(
          position,
          isFullScreen,
          animationList,
          currentAnimation
        );
        break;
      case 40:
        console.log("arrow down", position);
        break;
      case 70:
        showFullscreen(position, isFullScreen);
        break;
    }
  };
};

const nextAction = (
  position,
  isFullScreen,
  animationList,
  currentAnimation
) => {
  if (!isFullScreen) {
    moveToNextSlide(position, isFullScreen);
    return 0;
  }

  if (currentAnimation < animationList.length) {
    show(animationList[currentAnimation]);
    return currentAnimation + 1;
  }

  moveToNextSlide(position, isFullScreen);

  return currentAnimation + 1;
};

const previousAction = (
  position,
  isFullScreen,
  animationList,
  currentAnimation
) => {
  if (!isFullScreen) {
    moveToPreviousSlide(position, isFullScreen);
    return 0;
  }

  if (currentAnimation > 0) {
    hide(animationList[currentAnimation - 1]);
    return currentAnimation - 1;
  }

  moveToPreviousSlide(position, isFullScreen);
  return 0;
};

const moveToNextSlide = (currentPosition, isFullScreen) => {
  const urlList = isFullScreen ? fullSlideUrlMap : slideUrlMap;
  let nextPosition = currentPosition + 1;

  if (nextPosition >= urlList.length) {
    nextPosition = 0;
  }

  window.location.replace(urlList[nextPosition]);
};

const moveToPreviousSlide = (currentPosition, isFullScreen) => {
  const urlList = isFullScreen ? fullSlideUrlMap : slideUrlMap;
  let previousPosition = currentPosition - 1;

  if (previousPosition < 0) {
    previousPosition = urlList.length - 1;
  }

  window.location.replace(urlList[previousPosition]);
};

const showFullscreen = (position, isFullScreen) => {
  const urlList = isFullScreen ? slideUrlMap : fullSlideUrlMap;

  window.location.replace(urlList[position]);
};

const scrollToForm = (elementId) => {
  document.querySelector(elementId).scrollIntoView();
};

const hide = (elementId) => {
  let element = document.getElementById(elementId);
  element.classList.add("hidden");
};
const show = (elementId) => {
  let element = document.getElementById(elementId);
  element.classList.remove("hidden");
};
