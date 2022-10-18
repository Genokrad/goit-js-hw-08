import Player from '@vimeo/player';

const currentVideoTime = 'videoplayer-current-time';
const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('timeupdate', function (event) {
  // console.log(event);
  localStorage.setItem(currentVideoTime, event.seconds);
});

player.setCurrentTime(localStorage.getItem(currentVideoTime) || 0);
