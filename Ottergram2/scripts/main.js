var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';
var ESC_KEY = 27;



function setDetails(imageUrl, titleText, index_value) {
    'use strict';

    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src', imageUrl);
    detailImage.setAttribute('detail-image-index', index_value)

    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;
}

function imageFromThumb(thumb) {
    'use strict';
    return thumb.getAttribute('data-image-url');
}

function titleFromThumb(thumb) {
    'use strict';
    return thumb.getAttribute('data-image-title');
}

function indexFromThumb(thumb) {
    'use strict';
    return thumb.getAttribute('data-index-value')
}

function setDetailsFromThumb(thumb) {
    setDetails(imageFromThumb(thumb), titleFromThumb(thumb), indexFromThumb(thumb));
}

function addThumbClickHandler(thumb) {
    'use strict';
    thumb.addEventListener('click', function (event){
        event.preventDefault();
        setDetailsFromThumb(thumb);
        showDetails();
    });
}

function getThumbnailsArray() {
    'use strict';
    var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    var thumbnailArray = [].slice.call(thumbnails);
    return thumbnailArray;
}

function hideDetails() {
    'use strict';
    document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetails() {
    'use strict';
    var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
    document.body.classList.remove(HIDDEN_DETAIL_CLASS);

    frame.classList.add(TINY_EFFECT_CLASS);
    setTimeout(function() {
        frame.classList.remove(TINY_EFFECT_CLASS);
    }, 50);
}

function addKeyPressHandler() {
    'user strict';
    document.body.addEventListener('keyup', function(event) {
        event.preventDefault();
        console.log(event.keyCode)
        if (event.keyCode === ESC_KEY) {
            hideDetails();
        }
    });
}

function NextButton() {
    var thumbnails = getThumbnailsArray();
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    if(detailImage.getAttribute("detail-image-index") === thumbnails[thumbnails.length-1].getAttribute("data-index-value")) {
        setDetailsFromThumb(thumbnails[0])
        showDetails();
    } else {
        for(var n = 0; n < thumbnails.length; n++){
            if(thumbnails[n].getAttribute("data-index-value") === detailImage.getAttribute("detail-image-index")) {
                setDetailsFromThumb(thumbnails[n+1]);
                showDetails();
                n = thumbnails.length;
            }
        }
    }
}

function PreviousButton() {
    var thumbnails = getThumbnailsArray();
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    if(detailImage.getAttribute("detail-image-index") === thumbnails[0].getAttribute("data-index-value")) {
        setDetailsFromThumb(thumbnails[thumbnails.length-1])
        showDetails();
    } else {
        for(var n = 0; n < thumbnails.length; n++){
            if(thumbnails[n].getAttribute("data-index-value") === detailImage.getAttribute("detail-image-index")) {
                setDetailsFromThumb(thumbnails[n-1]);
                showDetails();
                n = thumbnails.length;
            }
        }
    }
}

function initializeEvents() {
    'use strict';
    var thumbnails = getThumbnailsArray();
    thumbnails.forEach(addThumbClickHandler);
    addKeyPressHandler();
}

initializeEvents();
