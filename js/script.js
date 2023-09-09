// more-info
$(".more-info").each((i, el) => {
  let text = $(el).text();
  $(el).html(`
    <img src="img/question.png" class="more-info__img">
    <span class="more-info__text">${text}</span>
  `);
});

// levels data
$.getJSON("js/levels-data.json", (data) => {
  let levelsHtml = "";
  let dotsHtml = "";
  data.forEach((level, i) => {
    levelsHtml += `
      <div class="level-block ${i == 0 ? "active" : ""}" data-index="${i}">
        <div class="level-block__img">
          <img src="img/icons/${level.icon}">
          <div class="level-block__count">${level.count}</div>
        </div>
        <div class="level-block__level">${level.level}</div>
        <div class="level-block__line"></div>
      </div>
    `;
    if (i % ITEMS_IN_SLIDE == 0) {
      dotsHtml += `
        <div class="levels-slider__dot ${
          i == 0 ? "active" : ""
        }" data-index="${parseInt(i / ITEMS_IN_SLIDE)}"></div>
      `;
    }
  });
  $(".levels-slider__content").html(levelsHtml);
  $(".levels-slider__dots").html(dotsHtml);

  let wSliderContent = $(".levels-slider__content").width();
  if ($(window).outerWidth() > 767)
    $(".levels-slider__content > *").css(
      "min-width",
      wSliderContent / ITEMS_IN_SLIDE
    );
  else $(".levels-slider__content > *").css("min-width", 80);

  let wImg = $(".level-block__img").outerWidth();
  $(".level-block__img").outerHeight(wImg);

  let hArr = $(".levels-slider__arrow").outerHeight();
  $(".levels-slider__arrow").css("top", (wImg - hArr) / 2 + 5 + "px");

  let bLine =
    ($(".level-block__level").outerHeight() -
      $(".level-block__line").outerHeight()) /
      2 +
    5;
  $(".level-block__line").css("bottom", bLine);
  $(".level-block__line").last().remove();

  toLevel(0, data);
});

$(".btn-level-more-info").on("click", function () {
  $(".loyality-program__info-block").slideToggle();
  if ($(this).hasClass("hide-block")) {
    $(this).text($(this).data("text"));
  } else {
    $(this).text("Hide info");
  }
  $(this).toggleClass("hide-block");
});

// height main img
// let h = $('.loyality-program__info-block').outerHeight();
// $('.loyality-program__main-img').outerHeight(h);
