let levelsData = [];
(async () => {
  levelsData = await getLevelsData();
})()
function getLevelsData() {
  return new Promise(resolve => {
    $.getJSON('js/levels-data.json', data => {
    resolve(data);
  });
  });
}

function prevLevel() {
  let itemIndex = $('.levels-slider__content > .active').index();
  if (itemIndex == 0) return;

  toLevel(itemIndex - 1);
}
function nextLevel() {
  let itemIndex = $('.levels-slider__content > .active').index();
  if (itemIndex == levelsData.length-1) return;

  toLevel(itemIndex + 1);
}
function toLevel(itemIndex, data=false) {
  if (data) levelsData = data;

  $('.levels-slider__content > *').removeClass('active');
  $('.levels-slider__content > *').eq(itemIndex).addClass('active');

  let slide = parseInt(itemIndex / ITEMS_IN_SLIDE);
  $('.levels-slider__dot').removeClass('active');
  $('.levels-slider__dot').eq(slide).addClass('active');

  $('[data-slider-arrow]').removeClass('disable');
  if (itemIndex == 0) {
    $('[data-slider-arrow="prev"]').addClass('disable');
  }
  if (itemIndex == levelsData.length-1) {
    $('[data-slider-arrow="next"]').addClass('disable');
  }
  if (slide == 0) {
    $('[data-slider-arrow="prev-page"]').addClass('disable');
  }
  if (slide == parseInt(levelsData.length / ITEMS_IN_SLIDE)-1) {
    $('[data-slider-arrow="next-page"]').addClass('disable');
  }

  let wContent = $('.levels-slider__content').width();
  if ($(window).outerWidth() > 767) {
    if ($('.levels-slider__content').scrollLeft() != wContent * slide)
      $('.levels-slider__content').animate({scrollLeft: wContent * slide}, 400, 'linear');
   } else {
    let wBlock = $('.level-block').outerWidth();
    $('.levels-slider__content').animate({scrollLeft: (wBlock * itemIndex) - (wContent / 2) + (wBlock / 2)}, 200, 'linear');
   }
  
  updateData(itemIndex, data);
}
function updateData(itemIndex, data=false) {
  if (data) levelsData = data;

  let level = levelsData[itemIndex];
  
  // main img
  $('.loyality-program__main-img .image').remove();
  $('.loyality-program__main-img').append(`
    <img src="/img/${level.img}" class="image">
  `);

  // level
  $('.loyality-program__level').text('Level ' + level.level);

  // info
  $('.level-reward').text(level.reward);
  $('.level-type').text(level.type);
  $('.level-wager').text(level.wager);
  $('.level-more').text(level.more);
  $('.more-info__text').text(level.moreInfo);
  let textBtn = `Level ${level.level} more info`;
  $('.btn-level-more-info').data('text', textBtn).text(textBtn);


  $('.level-type').closest('li').show();
  if (level.type == '') $('.level-type').closest('li').hide();

  $('.level-wager').closest('li').show();
  if (level.wager == '') $('.level-wager').closest('li').hide();

  $('.level-more').closest('.loyality-program__more-block').show();
  if (level.more == '') $('.level-more').closest('.loyality-program__more-block').hide();

  $('.more-info').show();
  if (level.moreInfo == '') {
    $('.more-info').hide();
  }

  // animate
  $('.loyality-program__main-img .image').css('opacity', 0).animate({
    opacity: 1,
  }, 'fast', 'linear');
  $('.loyality-program__info-block')
    .css({
      transition: '0s',
      opacity: '0',
      transform: 'translateX(-70px)'
    })
    .delay(10)
    .queue((next) => {
      $('.loyality-program__info-block').css({
        transition: '0.7s',
        opacity: '1',
        transform: 'translateX(0)'
      })
      next();
    });

  // height main img
  // let h = $('.loyality-program__info-block').outerHeight();
  // $('.loyality-program__main-img').outerHeight(h);
}

$('.levels-slider__content').on('click', function(e) {
  let $item = $(e.target).closest('.level-block');
  if ($item.hasClass('active')) return;

  toLevel($item.data('index'));
});
$('[data-slider-arrow]').on('click', function() {
  let direction = $(this).data('sliderArrow');
  switch (direction) {
    case 'prev':
      prevLevel();
      break;
    case 'next':
      nextLevel();
      break;
    case 'prev-page':
      $('.levels-slider__dot.active').prev().trigger('click');
      break;
    case 'next-page':
      $('.levels-slider__dot.active').next().trigger('click');
      break;
    case 'start':
      toLevel(0);
      break;
    case 'end':
      toLevel(levelsData.length-1);
      break;
    default:
      let lvl = $(this).data('sliderArrow');
      toLevel(lvl);
      break;
  }
});
$('.levels-slider__dots').on('click', function(e) {
  let $item = $(e.target).closest('.levels-slider__dot');
  if ($item.hasClass('active')) return;

  toLevel($item.data('index') * ITEMS_IN_SLIDE);
});