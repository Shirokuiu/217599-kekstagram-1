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
var ESC_KEYCODE = 27;

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
var exit = bigPicture.querySelector('.big-picture__cancel');

exit.addEventListener('click', function (e) {
  e.preventDefault();
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onEscPress);
});

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

var uploadFile = document.querySelector('#upload-file');
var uploadOverlay = document.querySelector('.img-upload__overlay');
var exitOverlay = uploadOverlay.querySelector('.img-upload__cancel');

var onEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    uploadOverlay.classList.add('hidden');
    bigPicture.classList.add('hidden');
  }
};

uploadFile.addEventListener('change', function () {
  uploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onEscPress);
});

exitOverlay.addEventListener('click', function () {
  uploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onEscPress);
});

var img = uploadOverlay.querySelector('.img-upload__preview');
var effects = uploadOverlay.querySelector('.effects__list');

var addEffect = function (evt) {
  var target = evt.target.closest('.effects__preview');
  if (target !== null) {
    if (target.classList.contains('effects__preview--none')) {
      img.className = 'img-upload__preview';
    }
    if (target.classList.contains('effects__preview--chrome')) {
      img.className = 'img-upload__preview effects__preview--chrome';
    }
    if (target.classList.contains('effects__preview--sepia')) {
      img.className = 'img-uploрad__preview effects__preview--sepia';
    }
    if (target.classList.containsт('effects__preview--marvin')) {
      img.className = 'img-upload__preview effects__preview--marvin';
    }
    if (target.classList.contains('effects__preview--phobos')) {
      img.className = 'img-upload__preview effects__preview--phobos';
    }
    if (target.classList.contains('effects__preview--heat')) {
      img.className = 'img-upload__preview effects__preview--heat';
    }
  }
};

effects.addEventListener('click', addEffect);

var resizeControlMin = uploadOverlay.querySelector('.resize__control--minus');
var resizeControlValue = uploadOverlay.querySelector('.resize__control--value');
var resizeControlPlus = uploadOverlay.querySelector('.resize__control--plus');

resizeControlValue.value = 100 + '%';

resizeControlMin.addEventListener('click', function () {
  if (parseInt(resizeControlValue.value, 10) > 25) {
    img.style.transform = 'scale(' + (parseInt(resizeControlValue.value, 10) / 100 - 0.25) + ')';
    resizeControlValue.value = parseInt(resizeControlValue.value, 10) - 25 + '%';
  }
});

resizeControlPlus.addEventListener('click', function () {
  if (parseInt(resizeControlValue.value, 10) < 100) {
    img.style.transform = 'scale(' + (parseInt(resizeControlValue.value, 10) / 100 + 0.25) + ')';
    resizeControlValue.value = parseInt(resizeControlValue.value, 10) + 25 + ('%');
  }
});

var picture = document.querySelectorAll('.picture__link');

var openPicture = function () {
  for (var i = 0, len = picture.length; i < len; i++) {
    picture[i].addEventListener('click', function (e) {
      var target = e.currentTarget;
      e.preventDefault();
      bigPicture.classList.remove('hidden');
      bigPicture.querySelector('img').src = target.querySelector('.picture__img').src;
      document.addEventListener('keydown', onEscPress);
    });
  }
};

openPicture();
