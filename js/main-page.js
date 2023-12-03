"use strict";
/*jslint devel: true, browser: true, white: true */
/*global $, jQuery, alert*/
jQuery(function ($) {
   jQuery(document).ready(function ($) {
      const mobNav = document.querySelector(".mob-nav");
      const body = document.body;
      const overlay = document.querySelector(".overlay");
      const overlayDark = document.querySelector(".overlay--dark");
      const popups = document.querySelectorAll(".popup");

      // ---- Скрипт для формы поиска ----
      const navList = document.querySelector(".nav__list");
      const headers = document.querySelectorAll(".header");
      const searchCross = document.querySelector(".search__cross");
      const main = document.querySelector(".main");
      const headerMain = document.querySelector(".header-main");
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
                        headerMain.classList.add("none");
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

                           // Content
                           main.classList.remove("none");
                           headerMain.classList.remove("none");
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

      //
      function stopLoad(e) {
         e.preventDefault();
      }

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
               headerMain.classList.add("none");
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

      // popup video
      const reviewCardVideos = document.querySelectorAll(".review-card__video");
      const popupVideo = document.querySelector(".popup-video");
      const popupCrossAccent = popupVideo.querySelector(".popup__cross--accent");

      reviewCardVideos.forEach((reviewCardVideo) => {
         reviewCardVideo.addEventListener("click", function () {
            overlayDark.classList.add("active");
            popupVideo.classList.add("active");
         });
      });

      popupCrossAccent.addEventListener("click", () => {
         overlayDark.classList.remove("active");
         popupVideo.classList.remove("active");
      });

      overlayDark.addEventListener("click", () => {
         overlayDark.classList.remove("active");
         popupVideo.classList.remove("active");
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

      // Input Mask
      $(".input-tel").mask("+7 999 999-99-99");

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

      // footer form btn
      const btnForm = document.querySelector(".footer__btn");
      const popupGratitude = document.querySelector(".popup-gratitude");
      const popupBtnBacks = document.querySelectorAll(".popup__btn--back");

      // close
      overlay.addEventListener("click", function () {
         closePopup(popupGratitude, overlay);
      });

      popupBtnBacks.forEach(function (popupBtnBack) {
         popupBtnBack.addEventListener("click", function () {
            closePopup(popupBtnBack.closest(".popup"), overlay);
         });
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
