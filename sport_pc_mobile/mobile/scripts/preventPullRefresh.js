//----------------禁止手機下拉刷新 start-----------------------------
(function () {
    this.Prevent = {
        TOUCH_INFO_FROM_LAST_EVENT: undefined,
        TOUCH_ANIMATION_INTERVAL: 0,
        TOUCH_ANIMATION_TIMER: null,
        onTouchStart: null,
        onTouchMove: null,
        onTouchEnd: null
    };

    // 禁止手機下拉刷新的動作(應該只在 GameMain_m.js 呼叫)
    Prevent.PreventPullToRefresh = function (touchStart, touchMove, touchEnd) {
        // 移除曾綁定過的事件處理
        if (Prevent['TOUCH_INFO_FROM_LAST_EVENT'] !== undefined) {
            document.removeEventListener("touchstart", Prevent.TouchToScroll, { capture: false });
            document.removeEventListener("touchmove", Prevent.TouchToScroll, { capture: false });
            document.removeEventListener("touchend", Prevent.TouchToScroll, { capture: false });
        }

        Prevent['TOUCH_INFO_FROM_LAST_EVENT'] = {};
        Prevent['TOUCH_ANIMATION_INTERVAL'] = 16;  // 60 fps
        Prevent['TOUCH_ANIMATION_TIMER'] = null;

        document.addEventListener("touchstart", Prevent.TouchToScroll, { capture: false, passive: false });
        document.addEventListener("touchmove", Prevent.TouchToScroll, { capture: false, passive: false });
        document.addEventListener("touchend", Prevent.TouchToScroll, { capture: false, passive: false });

        if (touchStart && typeof (touchStart) == 'function') {
            Prevent['onTouchStart'] = touchStart;
        }

        if (touchMove && typeof (touchMove) == 'function') {
            Prevent['onTouchMove'] = touchMove;
        }

        if (touchEnd && typeof (touchEnd) == 'function') {
            Prevent['onTouchEnd'] = touchEnd;
        }
    }

    // 取得指定目標(jQuery元素物件)的捲動資訊
    Prevent.GetScrollInfo = function (jqElm) {
        // 初始化資訊
        var jqTarget = null, jqTargetTop = null, jqTargetLeft = null;
        var bIsTopScrollable = false, bIsLeftScrollable = false;
        var iScrollTopMax = 0, iScrollLeftMax = 0;

        if ((jqElm instanceof jQuery) && (jqElm.get(0) instanceof HTMLElement)) {
            var iContentHeight, iViewHeight, iContentWidth, iViewWidth;

            jqTarget = jqElm.eq(0);

            // 檢查指定目標(持續往上)可捲動性(最高層為<html>)
            // 檢查 y軸可捲動性
            jqTargetTop = jqTarget;
            while (!(jqTargetTop.is("html"))) {
                switch (jqTargetTop.css("overflow-y")) {
                    case "auto": case "scroll": case "overlay":
                        iContentHeight = jqTargetTop.prop("scrollHeight");
                        iViewHeight = jqTargetTop.innerHeight();
                        bIsTopScrollable = (iContentHeight > iViewHeight);
                        break;
                    default:
                        bIsTopScrollable = false;
                        break;
                }

                if (bIsTopScrollable) {
                    iScrollTopMax = iContentHeight - iViewHeight;
                    break;
                } else {
                    jqTargetTop = jqTargetTop.parent();
                }
            }

            // 檢查 x軸可捲動性
            jqTargetLeft = jqTarget;
            while (!(jqTargetLeft.is("html"))) {
                // 檢查 x軸可捲動性
                switch (jqTargetLeft.css("overflow-x")) {
                    case "auto": case "scroll": case "overlay":
                        iContentWidth = jqTargetLeft.prop("scrollWidth");
                        iViewWidth = jqTargetLeft.innerWidth();
                        bIsLeftScrollable = (iContentWidth > iViewWidth);
                        break;
                    default:
                        bIsLeftScrollable = false;
                        break;
                }

                if (bIsLeftScrollable) {
                    iScrollLeftMax = iContentWidth - iViewWidth;
                    break;
                } else {
                    jqTargetLeft = jqTargetLeft.parent();
                }
            }

            // 無法捲動再檢查<html>可捲動性
            // 檢查 y軸可捲動性
            if (bIsTopScrollable == false) {
                switch (jqTargetTop.css("overflow-y")) {
                    case "auto": case "scroll": case "overlay":
                        bIsTopScrollable = true;
                        break;
                    case "hidden":
                        bIsTopScrollable = false;
                        break;
                    default:
                        bIsTopScrollable = ($(document.body).css("overflow-y") !== "hidden");
                        break;
                }

                if (bIsTopScrollable) {
                    iContentHeight = jqTargetTop.prop("scrollHeight");
                    iViewHeight = $(window).height();
                    iScrollTopMax = iContentHeight - iViewHeight;
                }
            }

            // 檢查 x軸可捲動性
            if (bIsLeftScrollable == false) {
                switch (jqTargetLeft.css("overflow-x")) {
                    case "auto": case "scroll": case "overlay":
                        bIsLeftScrollable = true;
                        break;
                    case "hidden":
                        bIsLeftScrollable = false;
                        break;
                    default:
                        bIsLeftScrollable = ($(document.body).css("overflow-x") !== "hidden");
                        break;
                }

                if (bIsLeftScrollable) {
                    iContentWidth = jqTargetLeft.prop("scrollWidth");
                    iViewWidth = $(window).width();
                    iScrollLeftMax = iContentWidth - iViewWidth;
                }
            }
        }

        // 回傳資訊
        oInfo = {
            "targetTop": jqTargetTop,
            "targetLeft": jqTargetLeft,
            // 上下拉資訊
            "isTopScrollable": bIsTopScrollable,
            "scrollTop": jqTargetTop ? jqTargetTop.scrollTop() : 0,
            "scrollTopMax": iScrollTopMax,
            // 左右拉資訊
            "isLeftScrollable": bIsLeftScrollable,
            "scrollLeft": jqTargetLeft ? jqTargetLeft.scrollLeft() : 0,
            "scrollLeftMax": iScrollLeftMax
        };
        return oInfo;
    }

    // 停止掉預設的觸控捲動控制，進行程式碼控制的捲動
    Prevent.TouchToScroll = function (evt) {
        var aTouchesOnScreen = evt.touches, aTouchesOnChanged = evt.changedTouches;
        var touchNow = null;

        //判斷是否為單點觸控觸發的事件
        if (aTouchesOnScreen) {
            switch (evt.type) {
                case "touchstart":
                        if (aTouchesOnScreen.length === 1) {
                            touchNow = aTouchesOnScreen[0];
                        }
                        break;
                case "touchmove":
                    if (aTouchesOnScreen.length === 1) {
                        touchNow = aTouchesOnScreen[0];
                    }
                    break;
                case "touchend":
                    if (aTouchesOnScreen.length === 0) {
                        touchNow = aTouchesOnChanged[0];
                    }
                    break;
                default: break;
            }
        } else {
            return;
        }

        // 只允許單點觸控的動作
        if (touchNow) {
            var iTouchYNow = touchNow.clientY, iTouchXNow = touchNow.clientX;
            var fTimeStamp = evt.timeStamp; // 時間戳，單位應該是毫秒
            var oScrollInfo;
            var jqTargetTop, jqTargetLeft;

            switch (evt.type) {
                case "touchstart":
                    if (typeof (Prevent['onTouchStart']) == 'function') {
                        Prevent['onTouchStart']();
                    }

                    if (Prevent['TOUCH_ANIMATION_TIMER'] !== null) { clearTimeout(Prevent['TOUCH_ANIMATION_TIMER']); Prevent['TOUCH_ANIMATION_TIMER'] = null; }

                    // 紀錄狀態，以提供下次事件做參考
                    $.extend(Prevent['TOUCH_INFO_FROM_LAST_EVENT'], {
                        "clientY": iTouchYNow,
                        "clientX": iTouchXNow,
                        "scrollInfo": Prevent.GetScrollInfo($(touchNow.target)),
                        "timeStamp": fTimeStamp
                    });
                    break;
                case "touchmove":
                    var isEventPrevent = false;

                    if (typeof (Prevent['onTouchMove']) == 'function') {
                        Prevent['onTouchMove']();
                    }

                    // 取得判斷可否捲動的資料
                    oScrollInfo = Prevent['TOUCH_INFO_FROM_LAST_EVENT']["scrollInfo"] ? Prevent['TOUCH_INFO_FROM_LAST_EVENT']["scrollInfo"] : {};

                    // y軸判斷可捲動(防止下拉刷新後，所需要做的卷軸控制)
                    if (oScrollInfo["isTopScrollable"]) {
                        var iTouchYLast, iScrollTopNow, iScrollTopMax, iScrollTopFinal;

                        // 取得計算捲動位置的資料
                        iTouchYLast = Prevent['TOUCH_INFO_FROM_LAST_EVENT']["clientY"];
                        jqTargetTop = oScrollInfo["targetTop"];
                        iScrollTopNow = oScrollInfo["scrollTop"];
                        iScrollTopMax = oScrollInfo["scrollTopMax"];

                        // 計算捲動位置
                        iScrollTopFinal = iScrollTopNow + (iTouchYLast - iTouchYNow);
                        if (iScrollTopFinal < 0) {
                            iScrollTopFinal = 0;
                        } else if (iScrollTopFinal > iScrollTopMax) {
                            iScrollTopFinal = iScrollTopMax;
                        }

                        if (iScrollTopFinal == 0 && evt.cancelable) {
                            evt.preventDefault();
                            isEventPrevent = true;
                        }

                        // 紀錄狀態，以提供下次事件做參考
                        $.extend(oScrollInfo, {
                            "scrollTop": iScrollTopFinal
                        });
                        $.extend(Prevent['TOUCH_INFO_FROM_LAST_EVENT'], {
                            "timeStampLast": Prevent['TOUCH_INFO_FROM_LAST_EVENT']["timeStamp"],
                            "timeStamp": fTimeStamp,
                            "clientYLast": iTouchYLast,
                            "clientY": iTouchYNow
                        });
                    }

                    // x軸判斷可捲動(上下拉的情況下，需要左右拉所做的控制)
                    if (oScrollInfo["isLeftScrollable"]) {
                        var iTouchXLast, iScrollLeftNow, iScrollLeftMax, iScrollLeftFinal;

                        // 取得計算捲動位置的資料
                        iTouchXLast = Prevent['TOUCH_INFO_FROM_LAST_EVENT']["clientX"];
                        jqTargetLeft = oScrollInfo["targetLeft"];
                        iScrollLeftNow = oScrollInfo["scrollLeft"];
                        iScrollLeftMax = oScrollInfo["scrollLeftMax"];

                        // 計算捲動位置
                        iScrollLeftFinal = iScrollLeftNow + (iTouchXLast - iTouchXNow);
                        if (iScrollLeftFinal < 0) {
                            iScrollLeftFinal = 0;
                        } else if (iScrollLeftFinal > iScrollLeftMax) {
                            iScrollLeftFinal = iScrollLeftMax;
                        }

                        if (isEventPrevent) {
                            jqTargetLeft.scrollLeft(iScrollLeftFinal);
                        }

                        // 紀錄狀態，以提供下次事件做參考
                        $.extend(oScrollInfo, {
                            "scrollLeft": iScrollLeftFinal
                        });
                        $.extend(Prevent['TOUCH_INFO_FROM_LAST_EVENT'], {
                            "clientXLast": iTouchXLast,
                            "clientX": iTouchXNow
                        });
                    }
                    break;
                case "touchend":
                    if (typeof (Prevent['onTouchEnd']) == 'function') {
                        Prevent['onTouchEnd']();
                    }

                    // 有滑動過才準備觸發後續的捲動動畫(y軸)
                    if (Prevent['TOUCH_INFO_FROM_LAST_EVENT'].hasOwnProperty("clientYLast")) {
                        var fTimeStampDiffForEnd, fTimeStampDiff;
                        var oAnimationInfo;

                        fTimeStampLast = Prevent['TOUCH_INFO_FROM_LAST_EVENT']["timeStamp"];
                        fTimeStampDiff = fTimeStampLast - Prevent['TOUCH_INFO_FROM_LAST_EVENT']["timeStampLast"];
                        fTimeStampDiffForEnd = fTimeStamp - fTimeStampLast;

                        oAnimationInfo = {};

                        // 觸控結束少於100毫秒，才進行滑動動畫
                        if (fTimeStampDiffForEnd < 100) {
                            oScrollInfo = Prevent['TOUCH_INFO_FROM_LAST_EVENT']["scrollInfo"] ? Prevent['TOUCH_INFO_FROM_LAST_EVENT']["scrollInfo"] : {};

                            // y軸判斷可捲動
                            if (oScrollInfo["isTopScrollable"]) {
                                var iClientYLast, iClientY;
                                var fMoveYSpeed;

                                iClientYLast = Prevent['TOUCH_INFO_FROM_LAST_EVENT']["clientYLast"];
                                iClientY = Prevent['TOUCH_INFO_FROM_LAST_EVENT']["clientY"];
                                fMoveYSpeed = (iClientYLast - iClientY) / fTimeStampDiff;
                                jqTargetTop = oScrollInfo["targetTop"];
                                $.extend(oAnimationInfo, {
                                    "targetTop": jqTargetTop,
                                    "animateTop": false,
                                    "scrollTop": oScrollInfo["scrollTop"],
                                    "scrollTopDiff": Math.floor(fMoveYSpeed * Prevent['TOUCH_ANIMATION_INTERVAL']),
                                    "scrollTopMax": oScrollInfo["scrollTopMax"]
                                });
                            }

                            // x軸判斷可捲動
                            if (oScrollInfo["isLeftScrollable"]) {
                                var iClientXLast, iClientX;
                                var fMoveXSpeed;

                                iClientXLast = Prevent['TOUCH_INFO_FROM_LAST_EVENT']["clientXLast"];
                                iClientX = Prevent['TOUCH_INFO_FROM_LAST_EVENT']["clientX"];
                                fMoveXSpeed = (iClientXLast - iClientX) / fTimeStampDiff;
                                jqTargetLeft = oScrollInfo["targetLeft"];
                                $.extend(oAnimationInfo, {
                                    "targetLeft": jqTargetLeft,
                                    "animateLeft": false,
                                    "scrollLeft": oScrollInfo["scrollLeft"],
                                    "scrollLeftDiff": Math.floor(fMoveXSpeed * Prevent['TOUCH_ANIMATION_INTERVAL']),
                                    "scrollLeftMax": oScrollInfo["scrollLeftMax"]
                                });
                            }

                            // 開始捲動動畫
                            //TIMER = setTimeout(Prevent.TouchToScrollEndAnimation, Prevent['TOUCH_ANIMATION_INTERVAL'], oAnimationInfo);
                        }
                    }

                    // 清空紀錄的狀態
                    Prevent['TOUCH_INFO_FROM_LAST_EVENT'] = {};
                    break;
                default: break;
            }
        } else {
            // 預防瀏覽器預設的動作
            evt.preventDefault();
        }
    }

    // 觸控結束的捲動動畫
    Prevent.TouchToScrollEndAnimation = function (oAnimationInfo) {
        if (Prevent['TOUCH_ANIMATION_TIMER'] !== null) { clearTimeout(Prevent['TOUCH_ANIMATION_TIMER']); Prevent['TOUCH_ANIMATION_TIMER'] = null; }

        var jqTargetTop = oAnimationInfo["targetTop"], jqTargetLeft = oAnimationInfo["targetLeft"];
        var iScrollTop, iScrollTopDiff, iScrollTopFinal, iScrollTopMax;
        var iScrollLeft, iScrollLeftDiff, iScrollLeftFinal, iScrollLeftMax;
        var bTopContinue = oAnimationInfo["animateTop"], bLeftContinue = oAnimationInfo["animateLeft"];

        // y軸動畫控制
        if (bTopContinue) {
            // 取得動畫相關訊息
            iScrollTop = oAnimationInfo["scrollTop"];
            iScrollTopDiff = oAnimationInfo["scrollTopDiff"];
            iScrollTopFinal = iScrollTop + iScrollTopDiff;
            iScrollTopMax = oAnimationInfo["scrollTopMax"];

            // 捲動差距漸漸縮短
            if (iScrollTopDiff > 0) {
                iScrollTopDiff--;
            } else if (iScrollTopDiff < 0) {
                iScrollTopDiff++;
            }

            // 取得捲動的最後位置，並判斷動畫是否要繼續
            if (iScrollTopFinal <= 0) {
                iScrollTopFinal = 0;
                bTopContinue = false;
            } else if (iScrollTopFinal >= iScrollTopMax) {
                iScrollTopFinal = iScrollTopMax;
                bTopContinue = false;
            } else {
                bTopContinue = (iScrollTopDiff !== 0);
            }

            jqTargetTop.scrollTop(iScrollTopFinal);
        }

        // x軸動畫控制
        if (bLeftContinue) {
            // 取得動畫相關訊息
            iScrollLeft = oAnimationInfo["scrollLeft"];
            iScrollLeftDiff = oAnimationInfo["scrollLeftDiff"];
            iScrollLeftFinal = iScrollLeft + iScrollLeftDiff;
            iScrollLeftMax = oAnimationInfo["scrollLeftMax"];

            // 捲動差距漸漸縮短
            if (iScrollLeftDiff > 0) {
                iScrollLeftDiff--;
            } else if (iScrollLeftDiff < 0) {
                iScrollLeftDiff++;
            }

            // 取得捲動的最後位置，並判斷動畫是否要繼續
            if (iScrollLeftFinal <= 0) {
                iScrollLeftFinal = 0;
                bLeftContinue = false;
            } else if (iScrollLeftFinal >= iScrollLeftMax) {
                iScrollLeftFinal = iScrollLeftMax;
                bLeftContinue = false;
            } else {
                bLeftContinue = (iScrollLeftDiff !== 0);
            }

            jqTargetLeft.scrollLeft(iScrollLeftFinal);
        }

        // 動畫判斷繼續
        if (bTopContinue || bLeftContinue) {
            $.extend(oAnimationInfo, {
                "animateTop": bTopContinue,
                "animateLeft": bLeftContinue
            });

            // y軸當前資料更新
            if (bTopContinue) {
                $.extend(oAnimationInfo, {
                    "scrollTop": iScrollTopFinal,
                    "scrollTopDiff": iScrollTopDiff
                });
            }

            // x軸當前資料更新
            if (bLeftContinue) {
                $.extend(oAnimationInfo, {
                    "scrollLeft": iScrollLeftFinal,
                    "scrollLeftDiff": iScrollLeftDiff
                });
            }

            Prevent['TOUCH_ANIMATION_TIMER'] = setTimeout(Prevent.TouchToScrollEndAnimation, Prevent['TOUCH_ANIMATION_INTERVAL'], oAnimationInfo);
        }
    }
})();
//----------------禁止手機下拉刷新 end-----------------------------