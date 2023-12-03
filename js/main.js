"use strict";
/*jslint devel: true, browser: true, white: true */
/*global $, jQuery, alert*/
jQuery(function ($) {
   jQuery(document).ready(function ($) {
      const body = document.body;
      const overlay = document.querySelector(".overlay");
      const popups = document.querySelectorAll(".popup");
      const mobNav = document.querySelector(".mob-nav");
      const overlayExtra = document.querySelector(".overlay-extra");

      // ---- Скрипт для формы поиска ----
      const navList = document.querySelector(".nav__list");
      const headers = document.querySelectorAll(".header");
      const searchCross = document.querySelector(".search__cross");
      const main = document.querySelector(".main");
      const searchResult = document.querySelector(".search-result");
      const searchResultYes = document.querySelector(".search-result__yes");
      const searchResultNo = document.querySelector(".search-result__no");

      headers.forEach(function (header) {
         const searchForms = header.querySelectorAll(".search");

         const headerProfileRow = header.querySelector(".header__profile");
         const headerSubNav = header.querySelector(".header__subnav");
         const navItemOne = header.querySelector(".nav__item-one");
         const navItems = header.querySelectorAll(".nav__item");
         const headerLogo = document.querySelector(".header__logo");

         searchForms.forEach(function (searchForm) {
            const searchBtn = searchForm.querySelector(".search__btn");
            const searchInput = searchForm.querySelector(".search__input");
            searchBtn.addEventListener("click", function (e) {
               if (window.innerWidth > 1099) {
                  if (searchForm.classList.contains("search--visible")) {
                     e.preventDefault();

                     // Если в input пусто или пробелы
                     if (searchInput.value.trim() === "") {
                        // Закрываем форму, сбрасываем ввод
                        searchForm.classList.remove("search--visible");
                        searchInput.value = "";

                        headerProfileRow.style.width = "unset";
                        headerSubNav.style.marginRight = "auto";

                        navItems.forEach((item) => {
                           item.classList.remove("none");
                        });

                        navItemOne.classList.remove("nav__item-one--visible");
                     } else {
                        // Иначе, отправляем форму
                        // searchForm.submit();
                        // headerProfileRow.style.width = "unset";
                        // navItems.forEach((item) => {
                        //    item.classList.remove("none");
                        // });
                        // searchForm.classList.remove("search--visible");
                        // navItemOne.classList.remove("nav__item-one--visible");
                        searchForm.classList.add("search--result");
                        navItemOne.classList.remove("nav__item-one--visible");
                        headerLogo.style.marginRight = "unset";

                        main.classList.add("none");
                        searchResult.classList.add("active");

                        if (searchInput.value === "Nike") {
                           searchResultNo.classList.remove("active");
                           searchResultYes.classList.add("active");
                        } else {
                           searchResultYes.classList.remove("active");
                           searchResultNo.classList.add("active");
                        }

                        searchCross.addEventListener("click", function (e) {
                           e.preventDefault();
                           searchForm.classList.remove("search--result");
                           searchForm.classList.remove("search--visible");
                           navItemOne.classList.remove("nav__item-one--visible");

                           searchInput.value = "";

                           headerProfileRow.style.width = "unset";
                           headerSubNav.style.marginRight = "auto";
                           headerLogo.style.marginRight = "6rem";

                           navItems.forEach((item) => {
                              item.classList.remove("none");
                           });

                           main.classList.remove("none");
                           searchResult.classList.remove("active");
                        });
                     }
                  } else {
                     e.preventDefault();
                     searchForm.classList.add("search--visible");

                     headerProfileRow.style.width = "100%";
                     headerSubNav.style.marginRight = "37px";

                     navItems.forEach((item) => {
                        item.classList.add("none");
                     });

                     navItemOne.classList.add("nav__item-one--visible");

                     navItemOne.addEventListener("click", function () {
                        searchForm.classList.remove("search--visible");

                        headerProfileRow.style.width = "unset";
                        headerSubNav.style.marginRight = "auto";

                        navItems.forEach((item) => {
                           item.classList.remove("none");
                        });

                        navItemOne.classList.remove("nav__item-one--visible");
                     });
                  }
               } else {
                  e.preventDefault();
                  body.classList.add("overflow");
                  mobNav.classList.add("mob-nav--visible");
               }
            });

            // Всплытие моб навигации
            const burgerOpen = header.querySelector(".header__nav-burger");
            const burgerCLose = mobNav.querySelector(".mob-nav__burger");
            burgerOpen.addEventListener("click", (e) => {
               e.preventDefault();
               body.classList.add("overflow");
               mobNav.classList.add("mob-nav--visible");
            });

            burgerCLose.addEventListener("click", (e) => {
               e.preventDefault();
               mobNav.classList.remove("mob-nav--visible");
               searchForm.classList.remove("search--visible");
               body.classList.remove("overflow");
            });
         });
      });

      // Функция для accordeon
      function toggleActive(elem) {
         elem.classList.toggle("active");
      }

      // Функция появление попапов
      function openPopup(popup, overlay) {
         popup.classList.add("active");
         overlay.classList.add("active");
      }

      // Функция закрытия попапов
      function closePopup(popup, overlay) {
         popup.classList.remove("active");
         overlay.classList.remove("active");
      }

      // popupCross close popup
      popups.forEach((popup) => {
         const popupCross = popup.querySelector(".popup__cross");
         popupCross.addEventListener("click", function () {
            closePopup(popupCross.parentNode.parentNode, overlay);
         });
      });

      // Появление sublist
      const headerItemRow = document.querySelector(".nav__item-row");
      const navSubList = document.querySelector(".nav__sublist");

      headerItemRow.addEventListener("click", function () {
         navSubList.classList.toggle("active");
      });

      // Аккордеон мобильной навигации
      const mobNavList = document.querySelector(".mob-nav__list");
      mobNavList.addEventListener("click", function (e) {
         const clicked = e.target.closest(".mob-nav__item-row");

         if (clicked) {
            toggleActive(clicked.parentNode);
         }
      });

      // Форма поиска в моб навигации
      const mobSearchForms = mobNav.querySelectorAll(".mob-nav__search");
      mobSearchForms.forEach(function (mobSearchForm) {
         const mobSearchBtn = mobSearchForm.querySelector(".search__btn");

         mobSearchBtn.addEventListener("click", function (e) {
            e.preventDefault();
            const mobSearchInput = mobSearchForm.querySelector(".search__input");
            if (mobSearchInput.value.trim() === "") {
            } else {
               mobNav.classList.remove("mob-nav--visible");
               body.classList.remove("overflow");

               // content
               main.classList.add("none");
               searchResult.classList.add("active");

               if (mobSearchInput.value === "Nike") {
                  searchResultNo.classList.remove("active");
                  searchResultYes.classList.add("active");
               } else {
                  searchResultYes.classList.remove("active");
                  searchResultNo.classList.add("active");
               }
            }
         });
      });

      if (window.location.toString().indexOf("ordering.html") > 0) {
         // Ordering Form
         $("#orderingForm").validate({
            rules: {
               cost: {
                  required: true,
               },
               delivery: {
                  required: true,
               },
               weight: {
                  required: true,
               },
               country: {
                  required: true,
               },
            },
            messages: {
               cost: {
                  required: "*",
               },
               delivery: {
                  required: "*",
               },
               weight: {
                  required: "*",
               },
               country: {
                  required: "*",
               },
               required: "*",
               remote: "*",
               email: "@",
            },
            submitHandler: function (form) {
               // ajaxFormSubmit();
            },
         });

         const orderingBtn = document.querySelector(".ordering__btn");
         const popupCount = document.querySelector(".popup-count");
         orderingBtn.addEventListener("click", () => {
            openPopup(popupCount, overlay);
         });

         overlay.addEventListener("click", () => {
            closePopup(popupCount, overlay);
         });

         // popup questions
         const btnQuestion = document.querySelector(".questions__btn");
         const popupQuestion = document.querySelector(".popup-question");

         // Open popup
         btnQuestion.addEventListener("click", function (e) {
            openPopup(popupQuestion, overlay);
         });

         // overlay close
         overlay.addEventListener("click", function () {
            closePopup(popupQuestion, overlay);
         });

         // popup feedback
         const popupQuestionBtn = document.querySelector(".popup-question__btn");
         const popupFeedback = document.querySelector(".popup-feedback");
         const popupFeedbackBtns = document.querySelectorAll(".popup-feedback__btn");
         const feedbackForms = document.querySelectorAll(".feedback-form");

         popupQuestionBtn.addEventListener("click", function (e) {
            popupQuestion.classList.remove("active");
            popupFeedback.classList.add("active");
         });

         popupFeedbackBtns.forEach(function (btn) {
            btn.addEventListener("click", function () {
               popupFeedbackBtns.forEach(function (popupFeedbackBtn) {
                  popupFeedbackBtn.classList.remove("active");
               });
               btn.classList.add("active");

               const form = document.querySelector(
                  `.feedback-form[data-form="${btn.getAttribute("data-btn")}"`
               );

               feedbackForms.forEach(function (feedbackForm) {
                  feedbackForm.classList.add("none");
               });
               form.classList.remove("none");
            });
         });

         const popupAlert = document.querySelector(".popup-alert");
         // feedbackFormCall validate
         $(".feedback-form--cal").validate({
            rules: {
               name: {
                  required: true,
               },
               tel: {
                  required: true,
               },
               time: {
                  required: true,
               },
            },
            messages: {
               name: {
                  required: "*",
               },
               tel: {
                  required: "*",
               },
               time: {
                  required: "*",
               },
               required: "*",
               remote: "*",
               email: "@",
            },
            submitHandler: function (form) {
               closePopup(popupFeedback, overlay);
               openPopup(popupAlert, overlay);
            },
         });

         // feedbackFormEmail validate
         $(".feedback-form--email").validate({
            rules: {
               name: {
                  required: true,
               },
               email: {
                  required: true,
               },
               message: {
                  required: true,
               },
            },
            messages: {
               name: {
                  required: "*",
               },
               email: {
                  required: "*",
               },
               message: {
                  required: "*",
               },
               required: "*",
               remote: "*",
               email: "@",
            },
            submitHandler: function (form) {
               closePopup(popupFeedback, overlay);
               openPopup(popupAlert, overlay);
            },
         });

         feedbackForms.forEach(function (feedbackForm) {
            feedbackForm.addEventListener("submit", function (e) {
               e.preventDefault();
            });
         });

         // overlay close
         overlay.addEventListener("click", function () {
            closePopup(popupFeedback, overlay);
         });

         // overlay close
         overlay.addEventListener("click", function () {
            closePopup(popupAlert, overlay);
         });

         // Input Time
         const inputTimes = document.querySelectorAll(".input-time");
         inputTimes.forEach((inputTime) => {
            inputTime.addEventListener("focus", () => {
               inputTime.type = "time";
            });
            inputTime.addEventListener("blur", () => {
               inputTime.type = "text";
            });
         });

         // Input Mask
         $(".input-tel").mask("+7 999 999-99-99");
      } else if (window.location.toString().indexOf("feedback-m.html") > 0) {
         const popupFeedbackBtns = document.querySelectorAll(".popup-feedback__btn");
         const feedbackForms = document.querySelectorAll(".feedback-form");

         popupFeedbackBtns.forEach(function (btn) {
            btn.addEventListener("click", function () {
               popupFeedbackBtns.forEach(function (popupFeedbackBtn) {
                  popupFeedbackBtn.classList.remove("active");
               });
               btn.classList.add("active");

               const form = document.querySelector(
                  `.feedback-form[data-form="${btn.getAttribute("data-btn")}"`
               );

               feedbackForms.forEach(function (feedbackForm) {
                  feedbackForm.classList.add("none");
               });
               form.classList.remove("none");
            });
         });

         // feedbackFormCall validate
         $(".feedback-form--cal").validate({
            rules: {
               name: {
                  required: true,
               },
               tel: {
                  required: true,
               },
               time: {
                  required: true,
               },
            },
            messages: {
               name: {
                  required: "*",
               },
               tel: {
                  required: "*",
               },
               time: {
                  required: "*",
               },
               required: "*",
               remote: "*",
               email: "@",
            },
         });

         // feedbackFormEmail validate
         $(".feedback-form--email").validate({
            rules: {
               name: {
                  required: true,
               },
               email: {
                  required: true,
               },
               message: {
                  required: true,
               },
            },
            messages: {
               name: {
                  required: "*",
               },
               email: {
                  required: "*",
               },
               message: {
                  required: "*",
               },
               required: "*",
               remote: "*",
               email: "@",
            },
         });
      } else if (window.location.toString().indexOf("tariff.html") > 0) {
         const tarifBtns = document.querySelectorAll(".tariff__type");

         tarifBtns.forEach(function (tarifBtn) {
            tarifBtn.addEventListener("click", () => {
               tarifBtns.forEach((btn) => {
                  btn.classList.remove("active");
               });
               tarifBtn.classList.add("active");
            });
         });
      } else if (window.location.toString().indexOf("catalog-shops.html") > 0) {
         // Brand carousel
         const brandSlider = $("#brandSlider");
         brandSlider.owlCarousel({
            dots: false,
            nav: false,

            responsive: {
               0: {
                  items: 2,
                  margin: 10,
               },

               319: {
                  items: 2,
                  margin: 15,
               },

               599: {
                  items: 3,
                  margin: 20,
               },
               899: {
                  items: 4,
                  margin: 22,
               },
            },
         });

         const arrowLeft = $(".brand-slider__left");
         arrowLeft.click(function () {
            brandSlider.trigger("prev.owl.carousel");
         });
         const arrowRight = $(".brand-slider__right");
         arrowRight.click(function () {
            brandSlider.trigger("next.owl.carousel");
         });

         // receipts btn
         const receiptsRows = document.querySelectorAll(".receipts__row");
         receiptsRows.forEach((receiptsRow) => {
            receiptsRow.addEventListener("click", (e) => {
               const clicked = e.target.closest(".receipts__item");

               if (clicked) {
                  clicked.classList.toggle("active");
               }
            });
         });

         // accordeons для секций accordeons
         const accordeons = document.querySelectorAll(".accordeon__list");
         accordeons.forEach((accordeon) => {
            accordeon.addEventListener("click", function (e) {
               const clicked = e.target.closest(".accordeon__row");

               if (clicked) {
                  toggleActive(clicked.parentNode);
               }
            });
         });
         // Фильтры
         const filters = document.querySelectorAll(".filter");
         filters.forEach((filter) => {
            // accordeons для секции filter
            const accordeonsFilter = filter.querySelectorAll(".filter__list");
            accordeonsFilter.forEach((accordeon) => {
               accordeon.addEventListener("click", function (e) {
                  const clicked = e.target.closest(".filter__box");

                  if (clicked) {
                     toggleActive(clicked.parentNode);
                  }
               });
            });
         });

         // mob filter
         const btnFilterOpen = document.querySelector(".filter-btn");
         const filterMob = document.querySelector(".filter-mob");
         const btnCross = document.querySelector(".filter__cross");
         const filterMobBtn = document.querySelector(".filter-mob__btn");

         // Open filter mob
         btnFilterOpen.addEventListener("click", () => {
            filterMob.classList.add("active");
            body.classList.add("overflow");
         });

         // filtered mob btn
         filterMobBtn.addEventListener("click", () => {
            filterMob.classList.remove("active");
            body.classList.remove("overflow");
         });

         // CLose filter mob
         btnCross.addEventListener("click", () => {
            filterMob.classList.remove("active");
            body.classList.remove("overflow");
         });

         const filterForm = document.querySelector(".filter__form");
         const filterFormMob = document.querySelector(".filter__form-m");

         filterForm.addEventListener("submit", (e) => {
            e.preventDefault();
         });
         filterFormMob.addEventListener("submit", (e) => {
            e.preventDefault();
         });
      } else if (window.location.toString().indexOf("catalog-brands.html") > 0) {
         // Brand carousel
         const brandSlider = $("#brandSlider");
         brandSlider.owlCarousel({
            dots: false,
            nav: false,

            responsive: {
               0: {
                  items: 2,
                  margin: 10,
               },

               319: {
                  items: 2,
                  margin: 15,
               },

               599: {
                  items: 3,
                  margin: 20,
               },
               899: {
                  items: 4,
                  margin: 22,
               },
            },
         });

         const arrowLeft = $(".brand-slider__left");
         arrowLeft.click(function () {
            brandSlider.trigger("prev.owl.carousel");
         });
         const arrowRight = $(".brand-slider__right");
         arrowRight.click(function () {
            brandSlider.trigger("next.owl.carousel");
         });

         // receipts btn
         const receiptsRows = document.querySelectorAll(".receipts__row");
         receiptsRows.forEach((receiptsRow) => {
            receiptsRow.addEventListener("click", (e) => {
               const clicked = e.target.closest(".receipts__item");

               if (clicked) {
                  clicked.classList.toggle("active");
               }
            });
         });

         // accordeons для секций accordeons
         const accordeons = document.querySelectorAll(".accordeon__list");
         accordeons.forEach((accordeon) => {
            accordeon.addEventListener("click", function (e) {
               const clicked = e.target.closest(".accordeon__row");

               if (clicked) {
                  toggleActive(clicked.parentNode);
               }
            });
         });

         // Brand filter btn slider
         const brandFilterSlides = $("#brandFilterSlides");
         brandFilterSlides.owlCarousel({
            dots: false,
            nav: false,
            margin: 0,
            slideBy: 2,
            autoWidth: true,
         });

         // Btn filter usual
         const btnsUsuals = document.querySelectorAll(".btn-usual");
         btnsUsuals.forEach((btnsUsual) => {
            btnsUsual.addEventListener("click", () => {
               btnsUsual.classList.toggle("active");
            });
         });

         const arrowSlideLeft = $(".catalog-brand__left");
         arrowSlideLeft.click(function () {
            brandFilterSlides.trigger("prev.owl.carousel");
         });
         const arrowSlideRight = $(".catalog-brand__right");
         arrowSlideRight.click(function () {
            brandFilterSlides.trigger("next.owl.carousel");
         });
      } else if (window.location.toString().indexOf("shop.html") > 0) {
         // Brand carousel
         const brandSlider = $("#brandSlider");
         brandSlider.owlCarousel({
            dots: false,
            nav: false,

            responsive: {
               0: {
                  items: 2,
                  margin: 10,
               },

               319: {
                  items: 2,
                  margin: 15,
               },

               599: {
                  items: 3,
                  margin: 20,
               },
               899: {
                  items: 4,
                  margin: 22,
               },
            },
         });

         const arrowLeft = $(".brand-slider__left");
         arrowLeft.click(function () {
            brandSlider.trigger("prev.owl.carousel");
         });
         const arrowRight = $(".brand-slider__right");
         arrowRight.click(function () {
            brandSlider.trigger("next.owl.carousel");
         });

         // accordeons для секций accordeons
         const accordeons = document.querySelectorAll(".accordeon__list");
         accordeons.forEach((accordeon) => {
            accordeon.addEventListener("click", function (e) {
               const clicked = e.target.closest(".accordeon__row");

               if (clicked) {
                  toggleActive(clicked.parentNode);
               }
            });
         });

         // about btn add more
         const btnMore = document.querySelector(".about__descr-more");
         const aboutTexts = document.querySelectorAll(".about__text");
         const textDisplay = document.querySelector(".about__descr-display");
         const textHide = document.querySelector(".about__descr-hide");
         btnMore.addEventListener("click", () => {
            aboutTexts.forEach((text) => {
               if (!text.classList.contains("display")) {
                  text.classList.add("display");
                  textDisplay.classList.add("none");
                  textHide.classList.remove("none");
               } else {
                  text.classList.remove("display");
                  textDisplay.classList.remove("none");
                  textHide.classList.add("none");
               }
            });
         });
      } else if (window.location.toString().indexOf("brand.html") > 0) {
         // Brand carousel
         const brandSlider = $("#brandSlider");
         brandSlider.owlCarousel({
            dots: false,
            nav: false,

            responsive: {
               0: {
                  items: 2,
                  margin: 10,
               },

               319: {
                  items: 2,
                  margin: 15,
               },

               599: {
                  items: 3,
                  margin: 20,
               },
               899: {
                  items: 4,
                  margin: 22,
               },
            },
         });

         const arrowLeft = $(".brand-slider__left");
         arrowLeft.click(function () {
            brandSlider.trigger("prev.owl.carousel");
         });
         const arrowRight = $(".brand-slider__right");
         arrowRight.click(function () {
            brandSlider.trigger("next.owl.carousel");
         });

         // accordeons для секций accordeons
         const accordeons = document.querySelectorAll(".accordeon__list");
         accordeons.forEach((accordeon) => {
            accordeon.addEventListener("click", function (e) {
               const clicked = e.target.closest(".accordeon__row");

               if (clicked) {
                  toggleActive(clicked.parentNode);
               }
            });
         });

         // about btn add more
         const btnMore = document.querySelector(".about__descr-more");
         const aboutTexts = document.querySelectorAll(".about__text");
         const textDisplay = document.querySelector(".about__descr-display");
         const textHide = document.querySelector(".about__descr-hide");
         btnMore.addEventListener("click", () => {
            aboutTexts.forEach((text) => {
               if (!text.classList.contains("display")) {
                  text.classList.add("display");
                  textDisplay.classList.add("none");
                  textHide.classList.remove("none");
               } else {
                  text.classList.remove("display");
                  textDisplay.classList.remove("none");
                  textHide.classList.add("none");
               }
            });
         });
      } else if (window.location.toString().indexOf("news-one.html") > 0) {
         // popup questions
         const btnQuestion = document.querySelector(".questions__btn");
         const popupQuestion = document.querySelector(".popup-question");

         // Open popup
         btnQuestion.addEventListener("click", function (e) {
            openPopup(popupQuestion, overlay);
         });

         // overlay close
         overlay.addEventListener("click", function () {
            closePopup(popupQuestion, overlay);
         });

         // popup feedback
         const popupQuestionBtn = document.querySelector(".popup-question__btn");
         const popupFeedback = document.querySelector(".popup-feedback");
         const popupFeedbackBtns = document.querySelectorAll(".popup-feedback__btn");
         const feedbackForms = document.querySelectorAll(".feedback-form");

         popupQuestionBtn.addEventListener("click", function (e) {
            popupQuestion.classList.remove("active");
            popupFeedback.classList.add("active");
         });

         popupFeedbackBtns.forEach(function (btn) {
            btn.addEventListener("click", function () {
               popupFeedbackBtns.forEach(function (popupFeedbackBtn) {
                  popupFeedbackBtn.classList.remove("active");
               });
               btn.classList.add("active");

               const form = document.querySelector(
                  `.feedback-form[data-form="${btn.getAttribute("data-btn")}"`
               );

               feedbackForms.forEach(function (feedbackForm) {
                  feedbackForm.classList.add("none");
               });
               form.classList.remove("none");
            });
         });

         const popupAlert = document.querySelector(".popup-alert");
         // feedbackFormCall validate
         $(".feedback-form--cal").validate({
            rules: {
               name: {
                  required: true,
               },
               tel: {
                  required: true,
               },
               time: {
                  required: true,
               },
            },
            messages: {
               name: {
                  required: "*",
               },
               tel: {
                  required: "*",
               },
               time: {
                  required: "*",
               },
               required: "*",
               remote: "*",
               email: "@",
            },
            submitHandler: function (form) {
               closePopup(popupFeedback, overlay);
               openPopup(popupAlert, overlay);
            },
         });

         // feedbackFormEmail validate
         $(".feedback-form--email").validate({
            rules: {
               name: {
                  required: true,
               },
               email: {
                  required: true,
               },
               message: {
                  required: true,
               },
            },
            messages: {
               name: {
                  required: "*",
               },
               email: {
                  required: "*",
               },
               message: {
                  required: "*",
               },
               required: "*",
               remote: "*",
               email: "@",
            },
            submitHandler: function (form) {
               closePopup(popupFeedback, overlay);
               openPopup(popupAlert, overlay);
            },
         });

         feedbackForms.forEach(function (feedbackForm) {
            feedbackForm.addEventListener("submit", function (e) {
               e.preventDefault();
            });
         });

         // overlay close
         overlay.addEventListener("click", function () {
            closePopup(popupFeedback, overlay);
         });

         // overlay close
         overlay.addEventListener("click", function () {
            closePopup(popupAlert, overlay);
         });

         // Input Time
         const inputTimes = document.querySelectorAll(".input-time");
         inputTimes.forEach((inputTime) => {
            inputTime.addEventListener("focus", () => {
               inputTime.type = "time";
            });
            inputTime.addEventListener("blur", () => {
               inputTime.type = "text";
            });
         });

         // Input Mask
         $(".input-tel").mask("+7 999 999-99-99");
      } else if (window.location.toString().indexOf("faq.html") > 0) {
         const btnChooses = document.querySelectorAll(".btn-choose");
         btnChooses.forEach((btnChoose) => {
            btnChoose.addEventListener("click", () => {
               btnChooses.forEach((btnChoose) => {
                  btnChoose.classList.remove("active");
               });
               btnChoose.classList.add("active");
            });
         });

         // accordeons для секций accordeons
         const accordeons = document.querySelectorAll(".accordeon__list");
         accordeons.forEach((accordeon) => {
            accordeon.addEventListener("click", function (e) {
               const clicked = e.target.closest(".accordeon__row");

               if (clicked) {
                  toggleActive(clicked.parentNode);
               }
            });
         });

         // popup questions
         const btnQuestion = document.querySelector(".qa__btn-login");
         const popupQuestion = document.querySelector(".popup-question");

         // Open popup
         btnQuestion.addEventListener("click", function (e) {
            openPopup(popupQuestion, overlay);
         });

         // overlay close
         overlay.addEventListener("click", function () {
            closePopup(popupQuestion, overlay);
         });

         // popup feedback
         const popupQuestionBtn = document.querySelector(".popup-question__btn");
         const popupFeedback = document.querySelector(".popup-feedback");
         const popupFeedbackBtns = document.querySelectorAll(".popup-feedback__btn");
         const feedbackForms = document.querySelectorAll(".feedback-form");

         popupQuestionBtn.addEventListener("click", function (e) {
            popupQuestion.classList.remove("active");
            popupFeedback.classList.add("active");
         });

         popupFeedbackBtns.forEach(function (btn) {
            btn.addEventListener("click", function () {
               popupFeedbackBtns.forEach(function (popupFeedbackBtn) {
                  popupFeedbackBtn.classList.remove("active");
               });
               btn.classList.add("active");

               const form = document.querySelector(
                  `.feedback-form[data-form="${btn.getAttribute("data-btn")}"`
               );

               feedbackForms.forEach(function (feedbackForm) {
                  feedbackForm.classList.add("none");
               });
               form.classList.remove("none");
            });
         });

         const popupAlert = document.querySelector(".popup-alert");
         // feedbackFormCall validate
         $(".feedback-form--cal").validate({
            rules: {
               name: {
                  required: true,
               },
               tel: {
                  required: true,
               },
               time: {
                  required: true,
               },
            },
            messages: {
               name: {
                  required: "*",
               },
               tel: {
                  required: "*",
               },
               time: {
                  required: "*",
               },
               required: "*",
               remote: "*",
               email: "@",
            },
            submitHandler: function (form) {
               closePopup(popupFeedback, overlay);
               openPopup(popupAlert, overlay);
            },
         });

         // feedbackFormEmail validate
         $(".feedback-form--email").validate({
            rules: {
               name: {
                  required: true,
               },
               email: {
                  required: true,
               },
               message: {
                  required: true,
               },
            },
            messages: {
               name: {
                  required: "*",
               },
               email: {
                  required: "*",
               },
               message: {
                  required: "*",
               },
               required: "*",
               remote: "*",
               email: "@",
            },
            submitHandler: function (form) {
               closePopup(popupFeedback, overlay);
               openPopup(popupAlert, overlay);
            },
         });

         feedbackForms.forEach(function (feedbackForm) {
            feedbackForm.addEventListener("submit", function (e) {
               e.preventDefault();
            });
         });

         // overlay close
         overlay.addEventListener("click", function () {
            closePopup(popupFeedback, overlay);
         });

         // overlay close
         overlay.addEventListener("click", function () {
            closePopup(popupAlert, overlay);
         });

         // Input Time
         const inputTimes = document.querySelectorAll(".input-time");
         inputTimes.forEach((inputTime) => {
            inputTime.addEventListener("focus", () => {
               inputTime.type = "time";
            });
            inputTime.addEventListener("blur", () => {
               inputTime.type = "text";
            });
         });

         // Input Mask
         $(".input-tel").mask("+7 999 999-99-99");
      } else if (window.location.toString().indexOf("offer.html") > 0) {
         const brandItems = document.querySelectorAll(".popular-brands__item");
         brandItems.forEach((brandItem) => {
            brandItem.addEventListener("click", () => {
               toggleActive(brandItem);
            });
         });

         // Sale carousel
         const saleCarousel = $("#saleCarousel");
         saleCarousel.owlCarousel({
            dots: false,
            nav: false,
            margin: 10,

            responsive: {
               0: {
                  items: 1,
               },
               389: {
                  items: 2,
                  margin: 16,
               },

               1099: {
                  items: 3,
                  margin: 20,
               },
               1219: {
                  margin: 41,
               },
            },
         });

         const saleNext = $("#saleNext");
         saleNext.click(function () {
            salePrev.addClass("active");
            saleCarousel.trigger("next.owl.carousel");
         });

         const salePrev = $("#salePrev");
         salePrev.click(function () {
            saleCarousel.trigger("prev.owl.carousel");
         });

         if (window.innerWidth > 599) {
            // Popular carousel
            const popularSLider = $("#popularSLider");
            popularSLider.owlCarousel({
               dots: false,
               nav: false,
               margin: 10,

               responsive: {
                  0: {
                     items: 1,
                  },
                  389: {
                     items: 2,
                     margin: 16,
                  },

                  1099: {
                     items: 3,
                     margin: 20,
                  },
                  1219: {
                     margin: 40,
                  },
               },
            });

            const popularNext = $("#popularNext");
            popularNext.click(function () {
               popularPrev.addClass("active");
               popularSLider.trigger("next.owl.carousel");
            });

            const popularPrev = $("#popularPrev");
            popularPrev.click(function () {
               popularSLider.trigger("prev.owl.carousel");
            });
         }

         window.addEventListener("resize", function (event) {
            if (window.innerWidth > 599) {
               // Popular carousel
               const popularSLider = $("#popularSLider");
               popularSLider.owlCarousel({
                  dots: false,
                  nav: false,
                  margin: 10,

                  responsive: {
                     0: {
                        items: 2,
                     },
                     389: {
                        items: 2,
                        margin: 16,
                     },

                     1099: {
                        items: 3,
                        margin: 20,
                     },
                     1219: {
                        margin: 40,
                     },
                  },
               });

               const popularNext = $("#popularNext");
               popularNext.click(function () {
                  popularPrev.addClass("active");
                  popularSLider.trigger("next.owl.carousel");
               });

               const popularPrev = $("#popularPrev");
               popularPrev.click(function () {
                  popularSLider.trigger("prev.owl.carousel");
               });
            }
         });
      } else if (window.location.toString().indexOf("reviews.html") > 0) {
         // Popup reviews
         const reviewsBtn = document.querySelector(".testimonials__btn");
         const popupReviews = document.querySelector(".popup-reviews");

         reviewsBtn.addEventListener("click", () => {
            openPopup(popupReviews, overlay);
         });
         overlay.addEventListener("click", () => {
            closePopup(popupReviews, overlay);
         });

         // Рейтинг в попапе
         const rating = document.querySelector(".stars"),
            ratingItem = document.querySelectorAll(".stars__star");
         rating.onclick = function (e) {
            let target = e.target.closest(".stars__star");
            if (target.classList.contains("stars__star")) {
               removeClass(ratingItem, "current-active");
               target.classList.add("active", "current-active");
            }
         };

         rating.onmouseover = function (e) {
            let target = e.target.closest(".stars__star");
            if (target.classList.contains("stars__star")) {
               removeClass(ratingItem, "active");
               target.classList.add("active");
               mouseOverActiveClass(ratingItem);
            }
         };
         rating.onmouseout = function () {
            addClass(ratingItem, "active");
            mouseOutActiveClas(ratingItem);
         };

         function removeClass(arr) {
            for (let i = 0, iLen = arr.length; i < iLen; i++) {
               for (let j = 1; j < arguments.length; j++) {
                  ratingItem[i].classList.remove(arguments[j]);
               }
            }
         }
         function addClass(arr) {
            for (let i = 0, iLen = arr.length; i < iLen; i++) {
               for (let j = 1; j < arguments.length; j++) {
                  ratingItem[i].classList.add(arguments[j]);
               }
            }
         }

         function mouseOverActiveClass(arr) {
            for (let i = 0, iLen = arr.length; i < iLen; i++) {
               if (arr[i].classList.contains("active")) {
                  break;
               } else {
                  arr[i].classList.add("active");
               }
            }
         }

         function mouseOutActiveClas(arr) {
            for (let i = arr.length - 1; i >= 1; i--) {
               if (arr[i].classList.contains("current-active")) {
                  break;
               } else {
                  arr[i].classList.remove("active");
               }
            }
         }

         // sort btns
         const sortBtns = document.querySelectorAll(".testimonials__filter-var");
         sortBtns.forEach(function (sortBtn) {
            sortBtn.addEventListener("click", function () {
               sortBtns.forEach(function (sortBtn2) {
                  sortBtn2.classList.remove("active");
               });
               sortBtn.classList.add("active");
            });
         });

         // img open
         const imgWrappers = document.querySelectorAll(".testimonial-card__img");
         const popupMedia = document.querySelector(".popup-media");
         const popupMediaImg = document.querySelector(".popup-media img");
         const btnCloseMedia = document.querySelector(".popup-media__cross");
         imgWrappers.forEach(function (imgWrapper) {
            imgWrapper.addEventListener("click", function () {
               popupMedia.classList.add("active");
            });
            popupMediaImg.addEventListener("click", function (e) {
               e.stopPropagation();
            });
            btnCloseMedia.addEventListener("click", function () {
               popupMedia.classList.remove("active");
            });
            popupMedia.addEventListener("click", function () {
               popupMedia.classList.remove("active");
            });
         });

         const popupReviewCallback = document.querySelector(".popup-review-callback");
         const feedbackForms = document.querySelectorAll(".feedback-form");

         // Review Form
         $("#reviewsForm").validate({
            rules: {
               name: {
                  required: true,
               },
               email: {
                  required: true,
               },
               comment: {
                  required: true,
               },
               file: {
                  required: true,
               },
            },
            messages: {
               name: {
                  required: "*",
               },
               email: {
                  required: "*",
               },
               comment: {
                  required: "*",
               },
               file: {
                  required: "*",
               },
               required: "*",
               remote: "*",
               email: "@",
            },
            submitHandler: function (form) {
               closePopup(popupReviews, overlay);
               openPopup(popupReviewCallback, overlay);
            },
         });

         feedbackForms.forEach(function (feedbackForm) {
            feedbackForm.addEventListener("submit", function (e) {
               e.preventDefault();
            });
         });

         const fileInput = document.querySelector("#file-input");
         const fileInputWrapper = document.querySelector(".input-file__outer");
         const fileInputCloud = document.querySelector(".input-file__cloud");

         fileInput.addEventListener("change", function (e) {
            let fileInputOut = document.createElement("span");
            fileInputOut.classList.add("input-file__item");

            let inputData = document.createElement("span");
            let inputImg = document.createElement("img");
            inputData.classList.add("input-file__data");
            inputImg.src = "./img/svg/reviews/union.svg";

            inputData.innerHTML = fileInput.files[0].name;
            fileInputOut.append(inputData, inputImg);
            fileInputWrapper.append(fileInputOut);
            fileInputCloud.classList.add("none");

            inputImg.addEventListener("click", function (e) {
               e.stopPropagation();
               this.parentNode.remove();
               let outArr = [];
               let allInputOuter = fileInputWrapper.querySelectorAll(".input-file__item");
               allInputOuter.forEach(function (allInputItem, key, arr) {
                  outArr = arr;
               });

               if (outArr.length == 0) {
                  fileInputCloud.classList.remove("none");
                  let allInputtems = fileInputWrapper.querySelectorAll(".input-file__item");
                  allInputtems.forEach(function (allInputItem2) {
                     allInputItem2.remove();
                  });
               }
            });
         });

         // input file

         // overlay close
         overlay.addEventListener("click", function () {
            closePopup(popupReviewCallback, overlay);
         });
      } else if (window.location.toString().indexOf("businessmans.html") > 0) {
         const popupAlert = document.querySelector(".popup-alert");
         const articleForm = document.querySelector(".article-form__form");
         // article form
         $("#article-form").validate({
            rules: {
               name: {
                  required: true,
               },
               tel: {
                  required: true,
               },
               email: {
                  required: true,
               },
               feedback: {
                  required: true,
               },
            },
            messages: {
               name: {
                  required: "*",
               },
               tel: {
                  required: "*",
               },
               email: {
                  required: "*",
               },
               feedback: {
                  required: "*",
               },
               required: "*",
               remote: "*",
               email: "@",
            },
            submitHandler: function (form) {
               openPopup(popupAlert, overlay);
            },
         });

         // Input Mask
         $(".input-tel").mask("+7 999 999-99-99");

         articleForm.addEventListener("submit", function (e) {
            e.preventDefault();
         });

         // overlay close
         overlay.addEventListener("click", function () {
            closePopup(popupAlert, overlay);
         });
      } else if (window.location.toString().indexOf("discounts.html") > 0) {
         // Sale carousel
         const saleCarousel = $("#saleCarousel");
         saleCarousel.owlCarousel({
            dots: false,
            nav: false,
            margin: 10,

            responsive: {
               0: {
                  items: 1,
               },
               389: {
                  items: 2,
                  margin: 16,
               },

               1099: {
                  items: 3,
                  margin: 20,
               },
               1219: {
                  margin: 41,
               },
            },
         });

         const saleNext = $("#saleNext");
         saleNext.click(function () {
            salePrev.addClass("active");
            saleCarousel.trigger("next.owl.carousel");
         });

         const salePrev = $("#salePrev");
         salePrev.click(function () {
            saleCarousel.trigger("prev.owl.carousel");
         });
         // accordeons для секций accordeons
         const accordeons = document.querySelectorAll(".accordeon__list");
         accordeons.forEach((accordeon) => {
            accordeon.addEventListener("click", function (e) {
               const clicked = e.target.closest(".accordeon__row");

               if (clicked) {
                  toggleActive(clicked.parentNode);
               }
            });
         });
      } else if (window.location.toString().indexOf("profile.html") > 0) {
         // Profile catlog
         const dataProfileItems = document.querySelectorAll("[data-profile-item]");
         const dataProfileContents = document.querySelectorAll("[data-profile-content]");
         dataProfileItems.forEach(function (dataProfileItem) {
            dataProfileItem.addEventListener("click", function () {
               dataProfileItems.forEach(function (dataProfileItem) {
                  dataProfileItem.classList.remove("active");
               });
               dataProfileItem.classList.add("active");
               const contentId = document.querySelector("#" + dataProfileItem.dataset.profileItem);
               dataProfileContents.forEach(function (dataProfileContent) {
                  dataProfileContent.classList.add("none");
               });
               contentId.classList.remove("none");
            });
         });

         const userPersonalForm = document.querySelector(".user-personal__form");
         //  Form
         $(".user-personal__form").validate({
            rules: {
               surname: {
                  required: true,
               },
               name: {
                  required: true,
               },
               thirdname: {
                  required: true,
               },
               tel: {
                  required: true,
               },
               email: {
                  required: true,
               },
            },
            messages: {
               surname: {
                  required: "*",
               },
               name: {
                  required: "*",
               },
               thirdname: {
                  required: "*",
               },
               tel: {
                  required: "*",
               },
               email: {
                  required: "*",
               },
               required: "*",
               remote: "*",
               email: "@",
            },
         });
         // Input File Avatr Image view
         const profileSection = document.querySelector(".profile");
         const avatarImgSmall = profileSection.querySelector("[data-avatar-img-small]");
         const avatarImg = userPersonalForm.querySelector("[data-avatar-img]");
         const inputFile = userPersonalForm.querySelector(".avatar-label__input");

         inputFile.addEventListener("change", function () {
            avatarImg.src = URL.createObjectURL(inputFile.files[0]);
            avatarImgSmall.src = URL.createObjectURL(inputFile.files[0]);
         });

         // Input Mask
         $(".profile-tel").mask("+7 999 999-99-99");

         const userParcelBtns = document.querySelectorAll(".user-parcel__btn");
         userParcelBtns.forEach(function (userParcelBtn) {
            userParcelBtn.addEventListener("click", function () {
               userParcelBtns.forEach(function (userParcelBtn2) {
                  userParcelBtn2.classList.remove("active");
               });
               userParcelBtn.classList.add("active");
            });
         });

         // btn change password popup
         const btnPassword = document.querySelector(".user-personal__btn-password");
         const popupPassword = document.querySelector(".popup-password");
         const popupPasswordForm = document.querySelector(".popup-password__form");
         const popupPassAlert = document.querySelector(".popup-passalert");
         const popupPassAlertBtn = document.querySelector(".popup-passalert__btn");
         btnPassword.addEventListener("click", function (e) {
            openPopup(popupPassword, overlay);
         });
         overlay.addEventListener("click", function () {
            if (popupPassword.classList.contains("active")) {
               popupPassword.classList.remove("active");
            }
            if (popupPassAlert.classList.contains("active")) {
               popupPassAlert.classList.remove("active");
            }
         });
         popupPassAlertBtn.addEventListener("click", function () {
            closePopup(popupPassAlert, overlay);
         });

         const btnSave = document.querySelector("[data-btn-save]");
         const btnChange = document.querySelector("[data-btn-change]");
         const btnRemove = document.querySelector("[data-btn-remove]");
         const userPersonalBottom = document.querySelector(".user-personal__bottom");

         btnSave.addEventListener("click", function () {
            if (btnChange.classList.contains("none")) {
               btnChange.classList.remove("none");
               btnRemove.classList.add("none");
               userPersonalBottom.classList.add("none");
            }
         });

         btnChange.addEventListener("click", function () {
            btnChange.classList.add("none");
            btnRemove.classList.remove("none");
            userPersonalBottom.classList.remove("none");
         });

         // footer Form
         $(".popup-password__form").validate({
            rules: {
               password: {
                  required: true,
               },
               newpassword: {
                  required: true,
               },
               renewpassword: {
                  required: true,
               },
            },
            messages: {
               password: {
                  required: "*",
               },
               newpassword: {
                  required: "*",
               },
               renewpassword: {
                  required: "*",
               },
               required: "*",
               remote: "*",
               email: "@",
            },
            submitHandler: function (form) {
               comparison();
            },
         });

         popupPasswordForm.addEventListener("submit", function (e) {
            e.preventDefault();
         });

         function comparison() {
            let inputNew = document.querySelector(".input-new");
            let inputReNew = document.querySelector(".input-renew");

            if (inputNew.value === inputReNew.value) {
               closePopup(popupPassword, overlay);
               openPopup(popupPassAlert, overlay);
            }
         }

         // footer Form
         $("#footerForm3").validate({
            rules: {
               email: {
                  required: true,
               },
            },
            messages: {
               email: {
                  required: "*",
               },
               required: "*",
               remote: "*",
               email: "@",
            },
            submitHandler: function (form) {
               openPopup(popupGratitude, overlayExtra);
            },
         });
      } else if (window.location.toString().indexOf("authorization.html") > 0) {
         function toProfilePage() {
            window.location.href = "./profile.html";
         }

         // footer Form
         $("#account-form-reg").validate({
            rules: {
               name: {
                  required: true,
               },
               email: {
                  required: true,
               },
               tel: {
                  required: true,
               },
               password: {
                  required: true,
               },
            },
            messages: {
               name: {
                  required: "*",
               },
               email: {
                  required: "*",
               },
               tel: {
                  required: "*",
               },
               password: {
                  required: "*",
               },
               required: "*",
               remote: "*",
               email: "@",
            },
            submitHandler: function () {
               toProfilePage();
            },
         });
         $(".account-tel").mask("+7 999 999-99-99");

         // footer Form
         $("#account-form-log").validate({
            rules: {
               email: {
                  required: true,
               },
               password: {
                  required: true,
               },
            },
            messages: {
               email: {
                  required: "*",
               },
               password: {
                  required: "*",
               },
               required: "*",
               remote: "*",
               email: "@",
            },
            submitHandler: function () {
               toProfilePage();
            },
         });

         const accountForms = document.querySelectorAll(".account__form");
         accountForms.forEach(function (accountForm) {
            accountForm.addEventListener("submit", function (e) {
               e.preventDefault();
            });
         });

         // btns
         const btnToLog = document.querySelector(".account__btn-tolog");
         const btnToReg = document.querySelector(".account__btn-toreg");
         const regForm = document.querySelector(".account__form-reg");
         const logForm = document.querySelector(".account__form-log");
         btnToLog.addEventListener("click", () => {
            regForm.classList.add("none");
            logForm.classList.remove("none");

            const accImg = document.querySelector(".account__img");
            accImg.style.maxHeight = "565px";
         });
         btnToReg.addEventListener("click", () => {
            logForm.classList.add("none");
            regForm.classList.remove("none");

            const accImg = document.querySelector(".account__img");
            accImg.style.maxHeight = "unset";
         });
      } else if (window.location.toString().indexOf("restore.html") > 0) {
         // btns
         const btnSend = document.querySelector(".account__btn-send");
         const btnRestore = document.querySelector(".account__btn-restore");
         const formRestore = document.querySelector(".account__form-restore");
         const formConfirm = document.querySelector(".account__form-confirm");
         const popupPassalert = document.querySelector(".popup-passalert");

         function toggleForm(formClose, formOpen) {
            formClose.classList.add("none");
            formOpen.classList.remove("none");
         }

         // form restore
         $("#account-form-restore").validate({
            rules: {
               email: {
                  required: true,
               },
            },
            messages: {
               email: {
                  required: "*",
               },
               required: "*",
               remote: "*",
               email: "@",
            },
            submitHandler: function () {
               toggleForm(formRestore, formConfirm);
            },
         });

         // form restore
         $("#account-form-confirm").validate({
            rules: {
               confirmPass: {
                  required: true,
               },
               password: {
                  required: true,
               },
               rePass: {
                  required: true,
               },
            },
            messages: {
               confirmPass: {
                  required: "*",
               },
               password: {
                  required: "*",
               },
               rePass: {
                  required: "*",
               },
               required: "*",
               remote: "*",
               email: "@",
            },
            submitHandler: function () {
               openPopup(popupPassalert, overlay);
            },
         });

         overlay.addEventListener("click", function () {
            popupPassalert.classList.remove("active");
         });

         const accountForms = document.querySelectorAll(".account__form");
         accountForms.forEach(function (accountForm) {
            accountForm.addEventListener("submit", function (e) {
               e.preventDefault();
            });
         });
      } else if (window.location.toString().indexOf("basket.html") > 0) {
         const basketForm = document.querySelector(".basket__form");
         basketForm.addEventListener("submit", function (e) {
            e.preventDefault();
         });

         // del btn
         const btnDels = document.querySelectorAll(".basket-card__del");
         btnDels.forEach(function (btnDel) {
            btnDel.addEventListener("click", function (e) {
               btnDel.parentNode.classList.add("none");
            });
         });
      } else if (window.location.toString().indexOf("order.html") > 0) {
         // grtitute window
         const orderSection = document.querySelector(".order");
         const gratitudeOrder = document.querySelector(".gratitude-order");
         const gratitudeBtns = document.querySelectorAll(".gratitude-order__btn");

         function gratituteWindow() {
            orderSection.classList.add("none");
            gratitudeOrder.classList.remove("none");
         }

         // footer Form
         $(".order__form").validate({
            rules: {
               name: {
                  required: true,
               },
               secondName: {
                  required: true,
               },
               thirdName: {
                  required: true,
               },
               tel: {
                  required: true,
               },
               email: {
                  required: true,
               },
               town: {
                  required: true,
               },
               region: {
                  required: true,
               },
               street: {
                  required: true,
               },
               house: {
                  required: true,
               },
               apartment: {
                  required: true,
               },
               agree1: {
                  required: true,
               },
               agree2: {
                  required: true,
               },
            },
            messages: {
               name: {
                  required: "*",
               },
               secondName: {
                  required: "*",
               },
               thirdName: {
                  required: "*",
               },
               tel: {
                  required: "*",
               },
               email: {
                  required: "*",
               },
               town: {
                  required: "*",
               },
               region: {
                  required: "*",
               },
               street: {
                  required: "*",
               },
               house: {
                  required: "*",
               },
               apartment: {
                  required: "*",
               },
               agree1: {
                  required: "*",
               },
               agree2: {
                  required: "*",
               },
               required: "*",
               remote: "*",
               email: "@",
            },
            submitHandler: function (form) {
               gratituteWindow();
            },
         });

         $(".order-tel").mask("+7 999 999-99-99");

         const orderForm = document.querySelector(".order__form");
         orderForm.addEventListener("submit", function (e) {
            e.preventDefault();
         });

         // btn moves
         gratitudeBtns.forEach(function (gratitudeBtn) {
            gratitudeBtn.addEventListener("click", function () {
               orderSection.classList.remove("none");
               gratitudeOrder.classList.add("none");
            });
         });
      }
      // footer Form
      $("#footerForm").validate({
         rules: {
            email: {
               required: true,
            },
         },
         messages: {
            email: {
               required: "*",
            },
            required: "*",
            remote: "*",
            email: "@",
         },
         submitHandler: function (form) {
            openPopup(popupGratitude, overlay);
         },
      });
      // footer Form
      $("#footerForm2").validate({
         rules: {
            email: {
               required: true,
            },
         },
         messages: {
            email: {
               required: "*",
            },
            required: "*",
            remote: "*",
            email: "@",
         },
         submitHandler: function (form) {
            openPopup(popupGratitude, overlay);
         },
      });

      const footerForms = document.querySelectorAll(".footer__form");
      footerForms.forEach(function (footerForm) {
         footerForm.addEventListener("submit", function (e) {
            e.preventDefault();
         });
      });

      // footer form btn
      const btnForm = document.querySelector(".footer__btn");
      const popupGratitude = document.querySelector(".popup-gratitude");

      const popupBtnBacks = document.querySelectorAll(".popup__btn--back");
      popupBtnBacks.forEach(function (popupBtnBack) {
         popupBtnBack.addEventListener("click", function () {
            closePopup(popupBtnBack.closest(".popup"), overlay);
         });
      });

      overlay.addEventListener("click", function () {
         closePopup(popupGratitude, overlay);
      });

      // accordeon для footer
      const footerAccordeons = document.querySelectorAll(".footer__mob-item");
      footerAccordeons.forEach((accordeon) => {
         accordeon.addEventListener("click", function (e) {
            const clicked = e.target.closest(".footer__mob-row");
            if (clicked) {
               toggleActive(clicked.parentNode);
            }
         });
      });
   });
});
