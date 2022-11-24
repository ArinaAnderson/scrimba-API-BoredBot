import onChange from './node_modules/on-change';
// https://www.boredapi.com/
// https://docs.thecatapi.com/

/*
const renderActivity = (activityName, activityElements, error = false) => {
  activityElements.activityContainer.textContent = activityName;
  if (!error) {
    activityElements.title.textContent = "🦾 HappyBot🦿";
    document.body.classList.add("fun");
  }
};
*/
const renderActivity = (activityName, activityElements) => {
  activityElements.activityContainer.textContent = activityName;
};

const renderLoadStatus = (loadStatus, activityElements) => {
  if (loadStatus) {
    activityElements.titleElem.textContent = '🦾 HappyBot🦿';
    document.body.classList.add('fun');
  } else {
    activityElements.titleElem.textContent = '🤖 Sad Bot 🤖';
    document.body.classList.remove('fun');
  }
  
};

const renderImg = (imgSource, imgBox) => {
  imgBox.innerHTML = '';
  const imgElem = document.createElement('img');
  imgElem.setAttribute('src', imgSource); // srcData[0].url);
  imgBox.appendChild(imgElem); 
};

const state = {
  activitiesState: {
    activity: 'Find something to do',// null,
    loadStatus: null,
    errors: [], 
  },
  catImagesState: {
    imgSource: null,
    imgSources: [],
    countBack: 0,
    countAhead: 0,
    loadStatus: null,
    errors: [],
  },
};

const watchedState = onChange(state, (path, current, previous) => {
  if (path === 'activitiesState.activity') {
    renderActivity(current, activityElements);
  }

  if (path === 'activitiesState.loadStatus') {
    renderLoadStatus(current, activityElements);
  }
  
  if (path === 'catImagesState.imgSource') {
    renderImg(current, catBox);
  }
});

const activityElements = {
  activityContainer: document.querySelector('#idea'),
  titleElem: document.querySelector('#title'),
};
const catBox = document.querySelector('#cat-box');
const activityBtn = document.getElementById("bored-bot");

activityBtn.addEventListener('click', getActivity);
catBox.addEventListener('click', getCatPic); // () => {


const getActivity = () => {
  fetch("https://www.boredapi.com/api/activity")
    .then((payload) => payload.json())
    .then((data) => {
      watchedState.activitiesState.activity = data.activity;
      watchedState.activitiesState.loadStatus = true;
    })
    .catch((e) => {
      watchedState.activitiesState.activity = e.message;
      watchedState.activitiesState.loadStatus = false;
      watchedState.activitiesState.errors.push(e.message)});
};

const getCatPic = () => {
    fetch("https://api.thecatapi.com/v1/images/search")
    .then((payload) => payload.json())
    .then((srcData) => {
      watchedState.catImagesState.imgSources.push(srcData[0].url);
      watchedState.catImagesState.imgSource = srcData[0].url;
    })
};

const initRender = () => {
  // watchedState.activitiesState.activity = 'Find something to do';
  renderActivity(state.activitiesState.activity, activityElements);
  activityElements.titleElem.textContent = '🤖 BoredBot 🤖';
  getCatPic();
};
