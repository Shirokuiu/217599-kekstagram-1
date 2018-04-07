'use strict';

var picturesData = [];
var comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var getRandom = function (from, to) {
  var random = Math.floor((Math.random() * (to - from + 1)) + from);
  return random;
};

var generetaArray = function (elemArray, len) {
  for (var i = 0; i < len; i++) {
    elemArray.push({
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandom(15, 200),
      comments: getRandom(1, 200),
      description: 'Вот это тачка!'
    });
  }
  return elemArray;
};

generetaArray(picturesData, 25);

var generatePictures = function (template, elem, data, container) {
  var pictureTemplate = document.querySelector(template).content.querySelector(elem);
  var div = document.querySelector(container);
  var fragment = document.createDocumentFragment();
  for (var i = 0, len = data.length; i < len; i++) {
    var newPicture = pictureTemplate.cloneNode(true);
    newPicture.querySelector('.picture__img').src = data[i].url;
    newPicture.querySelector('.picture__stat--likes').textContent = data[i].likes;
    newPicture.querySelector('.picture__stat--comments').textContent = data[i].comments;
    fragment.appendChild(newPicture);
  }
  div.appendChild(fragment);
};

generatePictures('#picture', '.picture__link', picturesData, '.pictures');

var bigPicture = document.querySelector('.big-picture');

bigPicture.classList.remove('hidden');

var addDataOverlay = function () {
  var avatar = bigPicture.querySelectorAll('.social__comment');
  bigPicture.querySelector('img').src = picturesData[0].url;
  bigPicture.querySelector('.likes-count').textContent = picturesData[0].likes;
  bigPicture.querySelector('.comments-count').textContent = picturesData[0].comments;
  for (var i = 0, len = avatar.length; i < len; i++) {
    avatar[i].querySelector('.social__picture').src = 'img/avatar-' + getRandom(1, 6) + '.svg';
    avatar[i].replaceChild(document.createTextNode(comments[getRandom(0, comments.length - 1)]), avatar[i].childNodes[2]);
  }
};

addDataOverlay();

bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
bigPicture.querySelector('.social__comment-loadmore').classList.add('visually-hidden');
