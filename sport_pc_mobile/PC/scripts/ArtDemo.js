//彈跳視窗設定
function OpenPopupCenter(pageURL, title, w, h) {
    var left = (screen.width - w) / 2;
    var top = (screen.height - h) / 2;  // for 25% - devide by 4  |  for 33% - devide by 3
    var targetWin = window.open(pageURL, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
}

//啟動手機active狀態
document.addEventListener("touchstart", function () { }, true);

$(document).ready(function () {
    //判斷裝置是否為觸控
    var touch = 'ontouchstart' in document.documentElement
        || navigator.maxTouchPoints > 0
        || navigator.msMaxTouchPoints > 0;

    //捲軸控制
    if ($('.scrollbar-macosx').length > 0) {
        $('.scrollbar-macosx').scrollbar();
    }

    if (touch) {
        $('.scrollbar-macosx > .scroll-element div.scroll-bar').css('background-color', 'transparent');
    }

    //hoverDelay (懸停後再執行，避免hover立即執行)
    (function (a) {
        a.fn.hoverDelay = function (c, f, g, b) {
            var g = g || 150,   //hover entry time
                b = b || 150,       //hover departure time
                f = f || c;
            var e = [],
                d = [];
            return this.each(function (h) {
                a(this).mouseenter(function () {
                    var i = this;
                    clearTimeout(d[h]);
                    e[h] = setTimeout(function () {
                        c.apply(i)
                    },
                        g)
                }).mouseleave(function () {
                    var i = this;
                    clearTimeout(e[h]);
                    d[h] = setTimeout(function () {
                        f.apply(i)
                    },
                        b)
                })
            })
        }
    })(jQuery);

    //select    
    if (touch) {
        $('select').on('touchstart', function (e) {
            $(this).addClass('noActive');
        });
    } else {
        $('select').click(function () {
            var thisSel = $(this);
            $(this).toggleClass('on');
            $(document).bind('click', function (e) {
                var target = $(e.target);
                if (target.closest(thisSel).length == 0) {
                    $(thisSel).removeClass('on');
                }
            });
        });        
    }

    //今日or滾球
    if ($('.SM_T_menuIn li').eq(1).hasClass('on')) {
        $('.gameStruc_L').addClass('rollLive');
        if ($('#favorite').hasClass('on') == false) {
            $('.gameList,.gameDetail').addClass('rollLive');
        }
    }

    //抬頭選單-維護樣式
    if (touch) {
        $('.btn_navTop.off').click(function () {
            $('.navTop_info').fadeOut(200);
            $('.navTop_infoBox').slideUp(200);
            if ($('.navTop_info').css('display') == 'none') {
                $(this).find('.navTop_info').show();
                $(this).find('.navTop_infoBox').slideDown(200);
            } else {
                $(this).find('.navTop_info').fadeOut(200);
                $(this).find('.navTop_infoBox').slideUp(200);
            }
        });
    } else {
        $('.btn_navTop.off').hoverDelay(function () {
            $(this).find('.navTop_info').show();
            $(this).find('.navTop_infoBox').slideDown(200);
        }, function () {
            $(this).find('.navTop_info').fadeOut(200);
            $(this).find('.navTop_infoBox').slideUp(200);
        });
    }
    $(document).bind('click touchend', function (e) {
        var target = $(e.target);
        if (target.closest('.btn_navTop.off').length == 0) {
            $('.navTop_info').fadeOut(200);
            $('.navTop_infoBox').slideUp(200);
        }
    });

    //自動接收最佳賠率
    $('.btn_autoOdds').click(function () {
        $(this).toggleClass('on');
    });

    //皮膚
    $('.btn_sun,.btn_moon').click(function () {
        $(this).addClass('on').siblings().removeClass('on');
    });

    $('.btn_sun,.btn_moon').hoverDelay(function () {
        $(this).find('.skin_prompt').fadeIn(150);
    }, function () {
        $(this).find('.skin_prompt').fadeOut(150);
    });

    $(document).bind('click touchend', function (e) {
        var target = $(e.target);
        if (target.closest('.btn_sun,.btn_moon').length == 0) {
            $('.skin_prompt').fadeOut(150);
        }
    });

    //上方設定下拉
    $('.btn_setUpMenu_list').click(function () {
        if ($(this).find('.SUM_In').css('display') == 'none') {
            $('.btn_setUpMenu_list').removeClass('on');
            $('.SUM_In').fadeOut(200);
            $('.SUM_InBox').slideUp(200);
            $(this).addClass('on');
            $(this).find('.SUM_In').show();
            $(this).find('.SUM_InBox').slideDown(200);
        } else {
            $(this).removeClass('on');
            $(this).find('.SUM_In').fadeOut(200);
            $(this).find('.SUM_InBox').slideUp(200);
        }
    });

    $(document).bind('click touchend', function (e) {
        var target = $(e.target);
        if (target.closest('.btn_setUpMenu_list').length == 0) {
            $('.btn_setUpMenu_list').removeClass('on');
            $('.SUM_In').fadeOut(200);
            $('.SUM_InBox').slideUp(200);
        }
    });

    $('.SUM_InBox a').click(function () {
        $(this).siblings('a').removeClass('on');
        $(this).addClass('on');
        $(this).parents('.SUM_InBox').delay(150).slideUp(200);
        $(this).parents('.SUM_In').delay(150).fadeOut(200);
        var SUM_T = $(this).html();
        $(this).closest('.btn_setUpMenu_list').find('.SUM_T').html(SUM_T);
    });

    //系統訊息
    $('#btn_popSysMsg').click(function () {
        $('.mask,.popUp_sysMsg').show();
    });
    $('.btn_closeSM').click(function () {
        $('.mask,.popUp_sysMsg').hide();
    });

    //快速投注開關
    $('.btn_FB_switch').click(function () {
        if ($('.btn_FB_switch.on').length == 0) {
            $(this).text('ON')
            $(this).addClass('on');
            $('.FB_input').parent('li').show();
            $('.betInfoBlock,.newbetBlock,.betInfo_mask,#betInfo_blank').hide();
            $('#betInfo_fastBet').show();
            $('.BIT_list').removeClass('on');
            $('#btn_betInfoBlock').addClass('on');
            $('.btn_GLOdds,.btn_GSOdds').removeClass('on');
            if ($('.FB_input').val() == '') {
                setTimeout(function () {
                    $('.FBI_prompt').fadeIn();
                }, 150);
            }
        } else {
            $(this).text('OFF')
            $(this).removeClass('on');
            $('.FB_input').parent('li').hide();
            $('#betInfo_fastBet').hide();
            $('.betInfoBlock').show();
            $('.FBI_prompt').hide();
        }
    });

    $('.FB_input').on('click keyup', function () {
        if ($(this).val() == '') {
            $('.FBI_prompt').show();
        } else {
            $('.FBI_prompt').hide();
        }
    });

    //快速投注提示
    if (touch) {
        $('.btn_FB_prompt').click(function () {
            if ($('.FBP_In').css('display') == 'none') {
                $('.FBP_In').show();
                $('.FBP_InBox').slideDown(200);
            } else {
                $('.FBP_In').fadeOut(200);
                $('.FBP_InBox').slideUp(200);
            }
        });
    } else {
        $('.btn_FB_prompt').hoverDelay(function () {
            $('.FBP_In').show();
            $('.FBP_InBox').slideDown(200);
        }, function () {
            $('.FBP_In').fadeOut(200);
            $('.FBP_InBox').slideUp(200);
        });
    }
    $(document).bind('click touchend', function (e) {
        var target = $(e.target);
        if (target.closest('.btn_FB_prompt').length == 0) {
            $('.FBP_In').fadeOut(200);
            $('.FBP_InBox').slideUp(200);
        }
    });

    //快速投注彈跳視窗(跟著賠率定位)
    $('.btn_GLOdds,.btn_GSOdds').click(function (e) {
        if ($('.btn_FB_switch.on').length > 0) {
            if ($('.FB_input').val() == '') {
                $('.FBI_prompt').show();
                e.stopPropagation();
            } else {
                var popFB_betMoney = $('.FB_input').val();
                $('.mask').show();
                $('.popFB_money').find('span').text(popFB_betMoney).css('color', '');
                $('.popFB_prompt').hide();
                $('.popFB_info_bet .t_red').removeClass('t_oddsChange');
                $('.btn_popFB_confirm').show();
                $('.btn_popFB_loading,.btn_popFB_change,.btn_popFB_confirmOK,.btn_popFB_close').hide();
                var popUp_FastBet_W = $('.popUp_FastBet').innerWidth() / 2;
                var OddsBox_W = $(this).width() / 2;
                var OddsBox_H = $(this).innerHeight();
                var OddsBox_X = $(this).offset().left + $('.mainStruc').scrollLeft() + OddsBox_W - popUp_FastBet_W + 'px';
                var OddsBox_Y = $(this).offset().top - 5 + 'px'; //Firefox 當滑鼠點擊下方超出螢幕範圍的按鈕，if判斷有問題，因此-5px修正
                var windowH;
                if ($(window).width() >= 1200 || touch) {
                    windowH = $(window).height();
                } else {
                    windowH = $(window).height() - 17; //低於1200視窗下方出現橫式捲軸高度須扣除
                }                    
                var viewH = windowH - 200 + 'px';
                var OddsBox_Y_top = $(this).offset().top + OddsBox_H + 12 + 'px';
                var OddsBox_Y_bottom = windowH - $(this).offset().top + 12 + 'px';
                if (viewH > OddsBox_Y) {
                    $('.popUp_FastBet').show().removeClass('bottom').css({ 'left': OddsBox_X, 'top': OddsBox_Y_top, 'bottom': '' });
                } else {
                    $('.popUp_FastBet').show().addClass('bottom').css({ 'left': OddsBox_X, 'bottom': OddsBox_Y_bottom, 'top': '' });
                }
                //關閉IOS捲軸
                $('.scrollbar-macosx').not('.mainStruc').css('-webkit-overflow-scrolling', 'initial');
            }
        }
    });

    //裝置尺寸變動-關閉(快速投注)彈跳視窗
    $(window).resize(function () {
        if ($('.popUp_FastBet').css('display') == 'block') {
            $('.mask,.popUp_FastBet').hide();
            $('.btn_GLOdds,.btn_GSOdds').removeClass('on');
            //開啟IOS捲軸
            $('.scrollbar-macosx').css('-webkit-overflow-scrolling', 'touch');
        }
    });

    var FB_loading
    $('.btn_popFB_confirm').click(function () {
        if ($('.FB_input').val() < 100) {
            $('.popFB_prompt').show().text('投注金額過低，已更改為最低金額');
            $('.popFB_money').find('span').text('100').css('color', '#f00');
            $('.FB_input').val('100');
        } else if ($('.FB_input').val() > 15000) {
            $('.popFB_prompt').show().text('投注金額過高，已更改為最高金額');
            $('.popFB_money').find('span').text('15000').css('color', '#f00');
            $('.FB_input').val('15000');
        } else {
            $('.popFB_prompt').hide();
            $('.popFB_money').find('span').css('color', '');
            $('.btn_popFB_confirm').hide();
            $('.btn_popFB_loading').show();
            FB_loading = setTimeout(function () {
                $('.btn_popFB_loading').hide();
                $('.btn_popFB_change').show();
                $('.popFB_info_bet .t_red').addClass('t_oddsChange');
            }, 2000);
        }
    });

    $('.btn_popFB_change').click(function () {
        $('.btn_popFB_change').hide();
        $('.btn_popFB_confirmOK').show();
        $('.popFB_info_bet .t_red').removeClass('t_oddsChange');
    });

    $('.btn_popFB_confirmOK').click(function () {
        $('.btn_popFB_confirmOK').hide();
        $('.btn_popFB_close').show();
    });

    $('.btn_popFB_close,.btn_closeFB').click(function () {
        clearTimeout(FB_loading);
        $('.btn_popFB_change,.btn_popFB_confirmOK,.btn_popFB_close').hide();
        $('.btn_popFB_confirm').show();
        $('.mask,.popUp_FastBet').hide();
        $('.btn_GLOdds,.btn_GSOdds').removeClass('on');
        //開啟IOS捲軸
        $('.scrollbar-macosx').css('-webkit-overflow-scrolling', 'touch');
    });

    //demo預設(只為demo顯示用)
    $('.ZoomShow').addClass('on').hide().siblings('a').removeClass('on').closest('.btn_GT_sel').hide();
    $('.BIL_NG_text').css('display', 'table');
    $('.btn_GDListT').addClass('show');

    //左-運動列表開關
    if ($(window).width() > 1400) {
        $('.sportMenu').removeClass('ZoomOut');
    } else {
        $('.sportMenu').addClass('ZoomOut');
    }

    $(window).resize(function () {
        $('.SM_listIn').removeClass('bottom');
        if ($(window).width() > 1400) {
            $('.sportMenu').removeClass('ZoomOut');
            $('.SM_listIn').hide();
            $('.SM_list.on').find('.SM_listIn').show();
            $('.SM_T_menuIn').css('display', 'table');
        } else {
            $('.sportMenu').addClass('ZoomOut');
            $('.SM_listIn,.SM_T_menuIn').hide();
        }
        if ($('.gamePanel_R').css('display') == 'none') {
            $('[class*="screenOff"]').show().css('display', 'table-cell');
            //全場/上半場(切換)
            $('.GT_selInBox a').removeClass('on');
            $('.ZoomShow').addClass('on').closest('.btn_GT_sel').hide();
            $('.GT_selT').each(function () {
                var GT_selText = $(this).next('.GT_selIn').find('a.on').html().split('<')[0];
                $(this).text(GT_selText);
            });
        }
    });

    $('.btn_sportMenu_switch').click(function () {
        $('.SM_listIn').removeClass('bottom');
        $('.sportMenu').toggleClass('ZoomOut');
        if ($('.sportMenu.ZoomOut').length > 0) {
            $('.SM_T_menuIn,.SM_listIn').hide();
            if ($(window).width() <= 1400) {
                $('[class*="screenOff"]').not($('.GLOddsSingle').parent('[class*="screenOff"]')).show();
                //全場/上半場(切換)
                if ($('[class*="ZoomOutShow"].on').length > 0) {
                    $('.GT_selInBox a').removeClass('on');
                    $('.ZoomShow').addClass('on').closest('.btn_GT_sel').hide();
                    $('.GT_selT').each(function () {
                        var GT_selText = $(this).next('.GT_selIn').find('a.on').html().split('<')[0];
                        $(this).text(GT_selText);
                    });
                }
            }
        } else {
            $('.SM_T_menuIn').show().css('display', 'table');
            $('.SM_listIn').not($('.SM_list.on').find('.SM_listIn')).hide();
            $('.SM_list.on').find('.SM_listIn').slideDown();
            if ($(window).width() <= 1400) {
                $('.btn_GT_sel').show();
                $('.gamePanel_R').hide();
                $('.GLIL_More').removeClass('on');
                $('.gamePanel_L').removeClass('ZoomOut')

                if ($('.ZoomShow.on').length > 0) {
                    $('[class*="screenOff"]').hide();
                    $('.gameTitle,.GLInList').find('.screenOff_1').show();
                } else if ($('.ZoomShow.on').length == 0 && $('.gameTitle:not([class*="bg_FAV_"]) td.screenOff_1').css('display') == 'table-cell') {//針對冰球(今日)
                    $('[class*="screenOff"]').hide();
                    $('.gameTitle,.GLInList').find('.screenOff_1').show();
                } else {
                    $('.gameTitle').each(function () {
                        var className = $(this).find('td[style*="table-cell"]').attr('class');
                        $(this).find('.' + className).show();
                        $(this).next().find('.' + className).show();
                    });
                }
                //全場/上半場(切換);
                if ($('.ZoomShow.on').length > 0) {
                    $('.GT_selInBox a').removeClass('on');
                    $('.GT_selInBox').find('[class*="ZoomOutShow"]:first').addClass('on');
                    $('.GT_selT').each(function () {
                        var GT_selText = $(this).next('.GT_selIn').find('a.on').html().split('<')[0];
                        $(this).text(GT_selText);
                    });
                }
            }
        }
    });

    //左-運動列表-(今日/滾球/早盤)按鈕切換
    $('.SM_T_menu li').click(function () {
        $('.SM_T_menu li').removeClass('on');
        $(this).addClass('on');
    });

    //左-運動列表-(今日/滾球/早盤)按鈕-收合版
    $('.mainStruc').scroll(function () {
        var windowsX_Scroll = '-' + $('.mainStruc').scrollLeft() + 'px';
        $('.SM_T_menuIn,.AD_listIn,.SM_listIn').css('left', windowsX_Scroll);
    });

    if (touch) {
        $('.SM_T_menuT').click(function () {
            if ($('.sportMenu.ZoomOut').length > 0) {
                $('.SM_T_menuIn').fadeIn('fast');
            } else {
                $('.SM_T_menuIn').fadeOut('fast');
            }
        });
    } else {
        $('.SM_T_menu').hoverDelay(function () {
            if ($('.sportMenu.ZoomOut').length > 0) {
                $('.SM_T_menuIn').fadeIn('fast');
            } else {
                $('.SM_T_menuIn').show().css('display', 'table');
            }
        }, function () {
            if ($('.sportMenu.ZoomOut').length > 0) {
                $('.SM_T_menuIn').hide();
            }
        });
    }

    $(document).bind('click touchmove touchend touchstart', function (e) {
        if ($('.sportMenu.ZoomOut').length > 0) {
            var target = $(e.target);
            if (target.closest('.SM_T_menu').length == 0) {
                $('.SM_T_menuIn').fadeOut('fast');
            }
        }
    });

    $('.SM_T_menuIn li').click(function () {
        $('.SM_T_menuIn li').removeClass('on');
        $(this).addClass('on');
        var SM_T_menuT = $(this).html();
        if ($('.sportMenu.ZoomOut').length > 0) {
            $('.SM_T_menuIn').delay(150).stop(false, true).fadeOut('fast');
            $('.SM_T_menuT').html(SM_T_menuT);
        } else {
            $('.SM_T_menuIn').show().css('display', 'table');
            $('.SM_T_menuT').html(SM_T_menuT);
        }
        if ($('#btn_advanceDay').hasClass('on')) {
            $('.advanceDay').show();
            $('#timelyGame').hide();
        }
    });

    //左-運動列表-(list展開)控制
    $('.btn_SM_listT').click(function () {
        if ($('.sportMenu.ZoomOut').length == 0) {
            //正常版
            $('.SM_listIn').slideUp();
            if ($(this).next('.SM_listIn').css('display') == 'none' && $(this).next('.SM_listIn').find('li').length > 1) {
                $(this).next('.SM_listIn').slideDown('fast');
            } else {
                $(this).next('.SM_listIn').slideUp('fast');
            }
        }
    });

    //左-運動列表-(list展開)控制-收合版
    if (touch) {
        $('.SM_scroll').addClass('SM_hoverNo');
    } else {
        $('.SM_scroll').removeClass('SM_hoverNo');
    }
    if (touch) {
        $('.btn_SM_listT').removeAttr('onclick');
        $('.btn_SM_listT').click(function () {
            if ($('.sportMenu.ZoomOut').length > 0) {
                $('.SM_listIn').hide();
                if ($(this).next('.SM_listIn').css('display') == 'none') {
                    var SM_listIn_Y = $(this).offset().top + 'px';
                    $(this).next('.SM_listIn').stop().fadeIn('fast').css('top', SM_listIn_Y);
                    $(this).parent().addClass('on');
                } else {
                    $(this).next('.SM_listIn').stop().fadeOut('fast');
                    $(this).parent().removeClass('on');
                }

                var SM_scrollJSList = $(this).parent('.SM_list').position().top + (($(this).next('.SM_listIn').find('li').length) * 36);
                if (SM_scrollJSList >= $('.SM_scroll').height()) {
                    var SM_listH = '-' + (((($(this).next('.SM_listIn').find('li').length) - 1) * 36) + 2) + 'px';
                    $(this).next('.SM_listIn').css('margin-top', SM_listH).addClass('bottom');
                } else {
                    $(this).next('.SM_listIn').removeClass('bottom');
                }
            }
        });
        $(document).bind('touchstart touchmove touchend', function (e) {
            if ($('.sportMenu.ZoomOut').length > 0) {
                var target = $(e.target);
                if (target.closest('.SM_listIn').length == 0) {
                    $('.SM_listIn').fadeOut('fast');
                    $('.SM_listIn').each(function () {
                        if ($(this).find('li').length <= 1) {
                            $('.SM_list').not($(this).closest('.SM_list')).not($('.SM_listIn li.on').closest('.SM_list')).removeClass('on');
                        }
                    });
                }
            }
        });
    } else {
        $('.SM_list').hoverDelay(function () {
            if ($('.sportMenu.ZoomOut').length > 0) {
                $('.SM_listIn').hide();
                if ($(this).find('.SM_listIn').css('display') == 'none') {
                    var SM_listIn_Y = $(this).find('.btn_SM_listT').offset().top + 'px';
                    $(this).find('.SM_listIn').fadeIn('fast').css('top', SM_listIn_Y);
                } else {
                    $(this).find('.SM_listIn').fadeOut('fast');
                }

                var SM_scrollJSList = $(this).position().top + ($(this).find('.SM_listIn li').length * 36);
                if (SM_scrollJSList >= $('.SM_scroll').height()) {
                    var SM_listH = '-' + (((($(this).find('.SM_listIn li').length) - 1) * 36) + 2) + 'px';
                    $(this).find('.SM_listIn').css('margin-top', SM_listH).addClass('bottom');
                } else {
                    $(this).find('.SM_listIn').removeClass('bottom');
                }
            }
        }, function () {
            if ($('.sportMenu.ZoomOut').length > 0) {
                $('.SM_listIn').removeClass('bottom').css('margin-top', '').hide();
            }
        });
    }

    //左-運動列表(當列表沒內容時)
    $('.SM_list').click(function () {
        if ($(this).find('.SM_listIn').length == 0) {
            $('.SM_list,.SM_listIn li').removeClass('on');
            $(this).addClass('on');
        }
    });

    $('.SM_listIn li[onclick]').not('.SM_listIn_title').click(function () {
        $('.SM_list,.SM_listIn li').removeClass('on');
        $(this).parents('.SM_list').addClass('on');
        $(this).addClass('on');
        if ($('.sportMenu.ZoomOut').length > 0) {
            $(this).parents('.SM_listIn').delay(150).stop(false, true).fadeOut('fast');
        }
    });

    //左-即將開賽checkbox
    $('.icon_SM_checkboxAll').parent('li').click(function () {
        $(this).find('.icon_SM_checkboxAll').toggleClass('on');
        if ($(this).find('.icon_SM_checkboxAll.on').length > 0) {
            $(this).closest('.SM_listIn').find('.icon_SM_checkbox').addClass('on')
        } else {
            $(this).closest('.SM_listIn').find('.icon_SM_checkbox').removeClass('on')
        }
    });
    $('.icon_SM_checkbox').parent('li').click(function () {
        $(this).find('.icon_SM_checkbox').toggleClass('on');

        $('.icon_SM_checkboxAll').each(function () {
            var SM_checkbox_num = $(this).closest('.SM_listIn').find('.icon_SM_checkbox').length;
            var SM_checkbox_on = $(this).closest('.SM_listIn').find('.icon_SM_checkbox.on').length;
            if (SM_checkbox_num == SM_checkbox_on) {
                $(this).addClass('on');
            } else {
                $(this).removeClass('on');
            }
        });
    });

    //列表初始狀態
    $('.gameTitle').find('[class*="screenOff"]').show();
    $('.GLInList').find('[class*="screenOff"]').show().css('display', 'table-cell');
    if ($(window).width() <= 1400) {
        //表頭標題寬度(電競-特別投注)
        if ($('.GT_T').nextUntil().length == 1 && $('.GT_T').next().text().length == 0) {
            $('.GT_T').css('width', '330px');
        }
    }
    $(window).resize(function () {
        if ($(window).width() > 1400) {
            //表頭標題寬度(電競-特別投注)
            if ($('.GT_T').nextUntil().length == 1 && $('.GT_T').next().text().length == 0) {
                $('.GT_T').css('width', '');
            }
        } else {
            //表頭標題寬度(電競-特別投注)
            if ($('.GT_T').nextUntil().length == 1 && $('.GT_T').next().text().length == 0) {
                $('.GT_T').css('width', '330px');
            }
        }
    });
    $(window).resize(function () {
        if ($('.gamePanel_R').css('display') == 'block') {
            if ($(window).width() > 1400) {
                $('.gameTitle').each(function () {
                    var className = $(this).find('td[style*="table-cell"]').attr('class');
                    $(this).find('[class*="screenOff"]').hide();
                    $(this).find('.' + className).show();
                    $(this).next().find('[class*="screenOff"]').hide();
                    $(this).next().find('.' + className).show().css('display', 'table-cell');
                });
            } else {
                $('.gameTitle').each(function () {
                    var className = $(this).find('td[style*="table-cell"]').attr('class');
                    $(this).find('[class*="screenOff"]').hide();
                    $(this).find('.' + className + ':first').show();
                    $(this).next().find('[class*="screenOff"]').hide();
                    $(this).next().find('.GLInList').find('.' + className + ':first').show().css('display', 'table-cell');
                });
            }
        }
    });

    //列表-下拉切換
    $('.btn_GT_sel').click(function () {
        if ($(this).find('.GT_selIn').css('display') == 'none') {
            $(this).addClass('on');
            $('.GT_selIn').fadeOut(200);
            $('.GT_selInBox').slideUp(200);
            $(this).find('.GT_selIn').show();
            $(this).find('.GT_selInBox').slideDown(200);
        } else {
            $(this).removeClass('on');
            $(this).find('.GT_selIn').fadeOut(200);
            $(this).find('.GT_selInBox').slideUp(200);
        }
    });

    $(document).bind('click touchend', function (e) {
        var target = $(e.target);
        if (target.closest('.btn_GT_sel').length == 0) {
            $('.btn_GT_sel').removeClass('on');
            $('.GT_selIn').fadeOut(200);
            $('.GT_selInBox').slideUp(200);
        }
    });

    $('.GT_selT').each(function () {
        var GT_selText = $(this).next('.GT_selIn').find('a.on').html().split('<')[0];
        $(this).text(GT_selText);
    });

    $('.GT_selInBox a').click(function () {
        var GT_selText = $(this).html().split('<')[0];
        $(this).parents('.GT_selIn').prev('.GT_selT').text(GT_selText);
        $(this).parents('.GT_selInBox').delay(150).slideUp(200);
        $(this).parents('.GT_selIn').delay(150).fadeOut(200);
        $(this).siblings('a').removeClass('on');
        $(this).addClass('on');
        var GLNum = $(this).attr('class').split(/(\d+)/)[1];
        switch (true) {
            //一般+我的最愛(按鈕切換)
            case $(this).hasClass('ZoomOutShow_' + GLNum):
                if ($('.GLIL_More.on').length == 0) {
                    $(this).closest('.gameTitle').next().find('.GLInList:first .GLIL_More').addClass('on');
                }

                if ($('.gamePanel_R').css('display') == 'none') {
                    $('.GT_selInBox a').removeClass('on');
                    $('.gameTitle').find('[class*="ZoomOutShow"]:first').not($(this).siblings('a')).addClass('on');
                    $(this).addClass('on');
                    $('.gamePanel_L').addClass('ZoomOut')
                    $('.gamePanel_R').show();

                    $('[class*="screenOff"]').hide();
                    if ($(window).width() > 1400) {
                        $('.screenOff_1').show();
                    } else {
                        $('.gameTitle,.GLInList').find('.screenOff_1:first').show();
                        $('.sportMenu').addClass('ZoomOut');
                        $('.SM_listIn,.SM_T_menuIn').hide();
                    }
                    //當右側視窗尚未開啟時，細目列表動作如下
                    $('.gameStyle_T').removeClass('on');
                    $('.gameStyle_In').hide();
                    $('.gameDetail').find('.gameStyle_list:first .gameStyle_T').addClass('on');
                    $('.gameDetail').find('.gameStyle_list:first .gameStyle_In').show();

                } else {
                    $(this).siblings('a').removeClass('on');
                    $(this).addClass('on');
                    //當右側視窗已開啟時，細目列表動作如下                    
                    $('.gameStyle_T').removeClass('on');
                    $('.gameStyle_In').hide();
                    $('.gameDetail').find('.gameStyle_list:first .gameStyle_T').addClass('on');
                    $('.gameDetail').find('.gameStyle_list:first .gameStyle_In').show();
                }

                if ($(window).width() > 1400) {
                    $(this).parents('.gameTitle').find('.screenOff_' + GLNum).each(function () {
                        $(this).siblings('[class*="screenOff"]').hide();
                        $(this).parents('.gameTitle').find('.screenOff_' + GLNum).show();
                    });
                    $(this).parents('.gameTitle').next('.gameFAVbox,.gameList_scroll').find('.screenOff_' + GLNum).each(function () {
                        $(this).siblings('[class*="screenOff"]').hide();
                        $(this).parents('.GLInList').find('.screenOff_' + GLNum).show().css('display', 'table-cell');
                    });
                } else {
                    $(this).parents('.gameTitle').find('.screenOff_' + GLNum).each(function () {
                        $(this).siblings('[class*="screenOff"]').hide();
                        $(this).parents('.gameTitle').find('.screenOff_' + GLNum + ':first').show();
                    });
                    $(this).parents('.gameTitle').next('.gameFAVbox,.gameList_scroll').find('.screenOff_' + GLNum).each(function () {
                        $(this).siblings('[class*="screenOff"]').hide();
                        $(this).parents('.GLInList').find('.screenOff_' + GLNum + ':first').show().css('display', 'table-cell');
                    });
                }

                break;

            //case $(this).hasClass('ZoomShow'):
            //    $('.GT_selInBox a,.GLIL_More').removeClass('on');
            //    $('.ZoomShow').addClass('on');
            //    $('.gamePanel_R').hide();
            //    $('.gamePanel_L').removeClass('ZoomOut')
            //    $('[class*="screenOff"]').show();
            //    if ($(window).width() <= 1400) {
            //        $('.sportMenu').addClass('ZoomOut');
            //        $('.SM_T_menuIn,.SM_listIn').hide();
            //    }
            //    break;

            //單盤+單節+單局(按鈕切換)
            case $(this).hasClass('singleShow_' + GLNum):
                $(this).siblings('a').removeClass('on');
                $(this).addClass('on');
                $(this).parents('.gameTitle').next('.gameList_scroll').find('[class*="screenOff"]').not($('.screenOff_' + GLNum)).hide();
                $(this).parents('.gameTitle').next('.gameList_scroll').find('.screenOff_' + GLNum).show();
                $(this).parents('.gameTitle').next('.gameList_scroll').find('.GLOddsSingle_T').hide();
                $('.gameList,.GLInList').each(function () {
                    if ($(this).find($('.screenOff_' + GLNum)).length == 0) {
                        $(this).hide();
                    } else {
                        $(this).show();
                    }
                });
                if ($('#basketballSPscore,#footballSPscore').length > 0) {
                    $('.GLInTBox_Score').show();
                }
                break;

            case $(this).hasClass('singleShowAll'):
                $('.GT_selInBox a').removeClass('on');
                $('.singleShowAll').addClass('on');
                $('.gameList,.GLInList,[class*="screenOff"],.GLOddsSingle_T').show();
                if ($('#basketballSPscore,#footballSPscore').length > 0) {
                    $('.GLInTBox_Score').hide();
                }
                break;

            //波膽(按鈕切換)
            case $(this).hasClass('correctScore_' + GLNum):
                $(this).siblings('a').removeClass('on');
                $(this).addClass('on');
                $(this).parents('.gameTitle').next('.gameList_scroll').find('.GLInList td').not($('.screenOff_' + GLNum)).hide();
                $(this).parents('.gameTitle').next('.gameList_scroll').find('.screenOff_' + GLNum).show();
                break;

            case $(this).hasClass('correctScoreAll'):
                $('.GT_selInBox a').removeClass('on');
                $('.correctScoreAll').addClass('on');
                $('.GLInList td').show();
                break;
        }

        $('.GT_selT').each(function () {
            var GT_selText = $(this).next('.GT_selIn').find('a.on').html().split('<')[0];
            $(this).text(GT_selText);
        });

    });

    //單盤+單節+單局(預設-全開)
    $('.singleShowAll').parents('.gameTitle').next('.gameList_scroll').find('[class*="screenOff"]').css('display', 'block');
    if ($('#basketballSPscore,#footballSPscore').length > 0) {
        $('.GLInTBox_Score').hide();
    }
    //波膽(預設-全開)
    $('.correctScoreAll').parents('.gameTitle').next('.gameList_scroll').find('.GLInList td').show();

    //列表展開
    //全開關
    $('.GT_T').on('mouseover', function (e) {
        $(this).addClass('hover');
    }).on('mouseover', '.btn_GT_sel', function (e) {
        e.stopPropagation();
    }).on('mouseover', '.GT_T_nameIn', function (e) {
        if ($(this).width() >= $(this).parent('.GT_T_name').width() && (touch)) {
            e.stopPropagation();
        }
    });
    $('.GT_T').on('mouseout', function (e) {
        $(this).removeClass('hover');
    });
    $('.GT_T').on('click', function (e) {
        if ($(this).parents('.gameTitle').next('.gameFAVbox').length > 0) {
            //我的最愛列表開關
            if ($(this).parents('.gameTitle').find('.btn_gameList_all.off').length == 0) {
                $(this).parents('.gameTitle').next('.gameFAVbox').find('.GLIn').hide();
                $(this).find('.btn_gameList_all').addClass('off')
                $(this).parents('.gameTitle').next('.gameFAVbox').find('.btn_GLT').addClass('off')
            } else {
                $(this).parents('.gameTitle').next('.gameFAVbox').find('.GLIn').show();
                $(this).find('.btn_gameList_all').removeClass('off')
                $(this).parents('.gameTitle').next('.gameFAVbox').find('.btn_GLT').removeClass('off')
            }
        } else {
            //一般列表開關
            if ($('.btn_gameList_all.off').length == 0) {
                $('.GLIn').hide();
                $(this).find('.btn_gameList_all').addClass('off')
                $('.btn_GLT').addClass('off')
            } else {
                $('.GLIn').show();
                $(this).find('.btn_gameList_all').removeClass('off')
                $('.btn_GLT').removeClass('off')
            }
        }
    }).on('click', '.btn_GT_sel', function (e) {
        e.stopPropagation();
        //收回其它下拉選單
        $('.btn_setUpMenu_list,.btn_GDListT_menu').removeClass('on');
        $('.SUM_In,.GDLT_In').fadeOut(200);
        $('.SUM_InBox,.GDLT_InBox').slideUp(200);
    }).on('click', '.GT_T_nameIn', function (e) {
        if ($(this).width() >= $(this).parent('.GT_T_name').width() && (touch)) {
            e.stopPropagation();
        }
    });

    //各列
    $('.btn_GLT').click(function () {
        if ($(this).next('.GLIn').css('display') == 'block') {
            $(this).next('.GLIn').hide();
            $(this).addClass('off')
        } else {
            $(this).next('.GLIn').show();
            $(this).removeClass('off')
        }
        $('.btn_gameList_all').each(function () {
            var gameList_list = $(this).closest('.gameTitle').next().find('.btn_GLT').length;
            var gameListOff_list = $(this).closest('.gameTitle').next().find('.btn_GLT.off').length;
            if (gameListOff_list == gameList_list) {
                $(this).addClass('off');
            } else if (gameListOff_list == 0) {
                $(this).removeClass('off');
            }
        });
    });

    //加入最愛
    $('.btn_GLIn_star').click(function () {
        $(this).toggleClass('on').next('.MS_prompt').hide();
        $('.popFavMsg').finish().fadeIn(800).delay(800).fadeOut(800);
        if ($(this).hasClass('on')) {
            $(this).next('.MS_prompt').text('取消');            
            if ($('link[href*="th.css"]').length > 0) {
                $('.popFavMsg_In').text('เก็บสำเร็จ');
            } else if ($('link[href*="vi.css"]').length > 0) {
                $('.popFavMsg_In').text('Thêm mục yêu thích!');
            } else {
                $('.popFavMsg_In').text('收藏成功!');
            }
        } else {
            $(this).next('.MS_prompt').text('收藏夾');
            if ($('link[href*="th.css"]').length > 0) {
                $('.popFavMsg_In').text('ยกเลิกการเก็บ');
            } else if ($('link[href*="vi.css"]').length > 0) {
                $('.popFavMsg_In').text('Bỏ mục yêu thích!');
            } else {
                $('.popFavMsg_In').text('取消收藏!');
            }
        }
    });

    //列表-賠率選取
    $('.btn_GLOdds').click(function () {
        $(this).toggleClass('on');
    });

    //列表詳細資料-開關
    $('.GLIL_More').each(function () {
        if ($(this).find('.GLIL_MoreNum').length == 0) {
            $(this).css('cursor', 'default').siblings('.GLIL_T').find('.GLInTBox').css('cursor', 'default');
        }
    });
    $('.GLIL_MoreNum').parents('.GLInList').find('.GLInTBox,.GLIL_More').on('click', function () {
        $('.btn_GT_sel').show();
        $('.GLIL_More').not($(this)).removeClass('on');
        $('.btn_GDV_scoreBoard').addClass('on').siblings().not('.btn_fixed').removeClass('on');
        $('.scoreBoard').show().siblings().not('.GDView_T').hide();
        $(this).parents('.GLInList').find('.GLIL_More').addClass('on');
        if ($('.gamePanel_R').css('display') == 'none') {
            $('.gamePanel_L').addClass('ZoomOut')
            $('.gamePanel_R').show();
            //全場/上半場(切換);
            if ($('.ZoomShow.on').length > 0) {
                $('.GT_selInBox a').removeClass('on');
                $('.GT_selInBox').find('[class*="ZoomOutShow"]:first').addClass('on');
                $('.GT_selT').each(function () {
                    var GT_selText = $(this).next('.GT_selIn').find('a.on').html().split('<')[0];
                    $(this).text(GT_selText);
                });
            }
            if ($(window).width() > 1400) {
                $('[class*="screenOff"]').not('.screenOff_1').hide();
            } else {
                $('[class*="screenOff"]').each(function () {
                    if ($(this).css('display') == 'table-cell') {
                        var screenOff_Num = $(this).attr('class');
                        $(this).siblings('[class*="screenOff"]').hide();
                        $(this).parents('.gameTitle').find(screenOff_Num + ':first').show();
                        $(this).parents('.GLInList').find(screenOff_Num + ':first').show().css('display', 'table-cell');
                    }
                });
                $('.sportMenu').addClass('ZoomOut');
                $('.SM_listIn,.SM_T_menuIn').hide();
            }
            //當右側視窗尚未開啟時，細目列表動作如下
            $('.gameStyle_T').removeClass('on');
            $('.gameStyle_In').hide();
            $('.gameDetail').find('.gameStyle_list:first .gameStyle_T').addClass('on');
            $('.gameDetail').find('.gameStyle_list:first .gameStyle_In').show();

            //聊天室-沒有投注項目時(預設全展開)
            if ($('.gamePanel_R').hasClass('chatroomOpenAll')) {
                var chatroomH = $('.gameDetail').height() - $('.gameDetail_T').outerHeight() - $('.GDView').height();
                $('.chatroom').css('height', chatroomH);
                $('.btn_chatroom').addClass('on');
                $('.btn_fixed').hide();
                $('.btn_CR_openAll ').addClass('off on');
                $('.gameDetail_scroll').addClass('scroll_off');
                $('.gameStyle_scroll').removeClass('scroll_off');
                
            }
            //聊天室維護中(全展開)
            if ($('.chatroom').hasClass('off') && $('.gamePanel_R').hasClass('chatroomOpenAll')) {
                var chatroomH = $('.gameDetail').height() - $('.gameDetail_T').outerHeight() - $('.GDView').height();
                $('.chatroom').css('height', chatroomH);
                $('.btn_chatroom').addClass('on');
                $('.btn_fixed').hide();
            }
        } else {
            //當右側視窗已開啟時，細目列表動作如下
            $('.gameStyle_T').removeClass('on');
            $('.gameStyle_In').hide();
            $('.gameDetail').find('.gameStyle_list:first .gameStyle_T').addClass('on');
            $('.gameDetail').find('.gameStyle_list:first .gameStyle_In').show();
            //假如聊天室已開啟，聊天室高度需重新計算
            if ($('.gamePanel_R ').hasClass('chatroomOpenAll')) {
                $('.gameDetail').each(function () {
                    var position = $(this),
                        chatroomH = position.height() - position.find('.gameDetail_T').outerHeight() - position.find('.GDView').height();
                    $('.chatroom').css('height', chatroomH);
                    $('.btn_CR_openAll').addClass('on');
                });
            }
        }
    }).on('click', '.btn_liveData,.btn_GLIn_star', function (e) {
        e.stopPropagation();
    });

    $(window).resize(function () {
    /*IOS跳頁切回時聊天室高度會跑，因此延遲秒數重新計算聊天室高度,試過$(window).load在ios平板橫直式切換效果不彰*/
        setTimeout(function () {
            var chatroomH = $('.gameDetail').height() - $('.gameDetail_T').outerHeight() - $('.GDView').height();
            $('.chatroomOpenAll').find('.chatroom').css('height', chatroomH);
        }, 50);
    });

    $('.btn_GDT_close').click(function () {
        $('.gamePanel_R').hide();
        $('.GLIL_More').removeClass('on');
        $('.gamePanel_L').removeClass('ZoomOut')
        $('[class*="screenOff"]').show().css('display', 'table-cell');
        //全場/上半場(切換)
        if ($('[class*="ZoomOutShow"].on').length > 0) {
            $('.GT_selInBox a').removeClass('on');
            $('.ZoomShow').addClass('on').closest('.btn_GT_sel').hide();
            $('.GT_selT').each(function () {
                var GT_selText = $(this).next('.GT_selIn').find('a.on').html().split('<')[0];
                $(this).text(GT_selText);
            });
        }
    });

    //(更多)隊伍名稱
    if (touch) {
        $('.GDT_textBox').click(function () {
            var GDT_textBox = $(this).html()
            if ($(this)[0].getBoundingClientRect().width >= $(this).parent('div')[0].getBoundingClientRect().width) {
                $('.GDT_textShow').hide();
                $(this).next('.GDT_textShow').fadeIn(200).html(GDT_textBox);
            } else {
                $(this).next('.GDT_textShow').fadeOut(200);
            }
        });
    } else {
        $('.GDT_textBox').hoverDelay(function () {
            var GDT_textBox = $(this).html()
            if ($(this)[0].getBoundingClientRect().width >= $(this).parent('div')[0].getBoundingClientRect().width) {
                $(this).next('.GDT_textShow').fadeIn(200).html(GDT_textBox);
            } else {
                $(this).next('.GDT_textShow').fadeOut(200);
            }
        }, function () {
            $(this).next('.GDT_textShow').fadeOut(200);
        });
    }

    $(document).bind('click touchmove touchend touchstart', function (e) {
        var target = $(e.target);
        if (target.closest('.GDT_textL,.GDT_textR').length == 0) {
            $('.GDT_textShow').fadeOut('fast');
        }
    });

    //列表詳細資料-標題切換
    $('.btn_GDListT').click(function () {
        $(this).parent().find('.btn_GDListT').removeClass('on');
        $(this).addClass('on');
    });

    //列表詳細資料-標題下拉
    $('.btn_GDListT_menu').click(function () {
        if ($('.GDLT_In').css('display') == 'none') {
            $('.GDLT_In').show();
            $('.GDLT_InBox').slideDown(200);
        } else {
            $('.GDLT_In').fadeOut(200);
            $('.GDLT_InBox').slideUp(200);
        }
    });
    $(document).bind('click touchend', function (e) {
        var target = $(e.target);
        if (target.closest('.btn_GDListT_menu').length == 0) {
            $('.btn_GDListT_menu').removeClass('on');
            $('.GDLT_In').fadeOut(200);
            $('.GDLT_InBox').slideUp(200);
        }
    });
    $('.GDLT_InBox a').click(function () {
        $(this).siblings('a').removeClass('on');
        $(this).addClass('on');
        $(this).parents('.GDLT_InBox').delay(150).slideUp(200);
        $(this).parents('.GDLT_In').delay(150).fadeOut(200);
    });

    //列表詳細資料-細目列表開關
    $('.gameDetail').find('.gameStyle_list:first .gameStyle_T').addClass('on');
    $('.gameDetail').find('.gameStyle_list:first .gameStyle_In').show();
    $('.gameStyle_T').on('click', function () {
        if ($(this).next('.gameStyle_In').css('display') == 'none') {
            $(this).next('.gameStyle_In').show();
            $(this).addClass('on');
        } else {
            $(this).next('.gameStyle_In').hide();
            $(this).removeClass('on');
        }

        $('.btn_gameStyle_all').each(function () {
            var gameStyle_list = $(this).closest('.GDList_T').next().find('.gameStyle_T').length;
            var gameStyleOn_list = $(this).closest('.GDList_T').next().find('.gameStyle_T.on').length;
            if (gameStyleOn_list == gameStyle_list) {
                $(this).removeClass('off');
            } else if (gameStyleOn_list == 0) {
                $(this).addClass('off');
            }
        });
    }).on('click', '.btn_GST_i', function (e) {
        e.stopPropagation();
    });
    $('.btn_gameStyle_all').click(function () {
        if ($('.btn_gameStyle_all.off').length == 0) {
            $(this).addClass('off');
            $(this).closest('.GDList_T').next().find('.gameStyle_In').hide();
            $(this).closest('.GDList_T').next().find('.gameStyle_T').removeClass('on');
        } else {
            $(this).removeClass('off');
            $(this).closest('.GDList_T').next().find('.gameStyle_In').show();
            $(this).closest('.GDList_T').next().find('.gameStyle_T').addClass('on');
        }
    });

    //列表詳細資料-標題(i)註解
    if (touch) {
        $('.btn_GST_i').click(function () {
            var x37 = $('.GDList_In').width() * 0.37,
                x60 = $('.GDList_In').width() * 0.60,
                x_GST = $(this).position().left;
            if (x_GST >= x37 && x_GST <= x60) {
                $(this).find('.GST_InBox').removeClass('boxRight').addClass('boxCenter');
            } else if (x_GST > x60) {
                $(this).find('.GST_InBox').removeClass('boxCenter').addClass('boxRight');
            } else {
                $(this).find('.GST_InBox').removeClass('boxCenter boxRight');
            }

            var GDListT_top = $('.GDList_T').offset().top + $('.GDList_T').outerHeight(true),
                GSTInBox_H = $(this).find('.GST_InBox').outerHeight(true),
                GSTInBox_top = $(this).closest('.gameStyle_T').offset().top - 5 - GSTInBox_H;
            if (GDListT_top > GSTInBox_top) {
                $(this).addClass('boxBottom');
            } else {
                $(this).removeClass('boxBottom');
            }

            $('.btn_GST_i').removeClass('on');
            $('.GST_InBox').slideUp(200);
            if ($(this).find('.GST_InBox').css('display') == 'none') {
                $(this).addClass('on');
                $(this).find('.GST_InBox').slideDown(200);
            } else {
                $(this).removeClass('on');
                $(this).find('.GST_InBox').slideUp(200);
            }
        });
    } else {
        $('.btn_GST_i').hoverDelay(function () {
            var x37 = $('.GDList_In').width() * 0.37,
                x60 = $('.GDList_In').width() * 0.60,
                x_GST = $(this).position().left;
            if (x_GST >= x37 && x_GST <= x60) {
                $(this).find('.GST_InBox').removeClass('boxRight').addClass('boxCenter');
            } else if (x_GST > x60) {
                $(this).find('.GST_InBox').removeClass('boxCenter').addClass('boxRight');
            } else {
                $(this).find('.GST_InBox').removeClass('boxCenter boxRight');
            }

            var GDListT_top = $('.GDList_T').offset().top + $('.GDList_T').outerHeight(true),
                GSTInBox_H = $(this).find('.GST_InBox').outerHeight(true),
                GSTInBox_top = $(this).closest('.gameStyle_T').offset().top - 5 - GSTInBox_H;
            if (GDListT_top > GSTInBox_top) {
                $(this).addClass('boxBottom');
            } else {
                $(this).removeClass('boxBottom');
            }

            $(this).addClass('on');
            $(this).find('.GST_InBox').slideDown(200);
        }, function () {
            $(this).removeClass('on');
            $(this).find('.GST_InBox').slideUp(200);
        });
    }

    $(document).bind('click touchend', function (e) {
        var target = $(e.target);
        if (target.closest('.btn_GST_i').length == 0) {
            $('.btn_GST_i').removeClass('on');
            $('.GST_InBox').slideUp(200);
        }
    });

    //列表詳細資料-賠率選取
    $('.btn_GSOdds').click(function () {
        $(this).toggleClass('on');
    });

    //投注資訊按鈕切換
    $('.BIT_list').click(function () {
        $('.BIT_list').removeClass('on');
        $(this).addClass('on');
    });

    //投注資訊主按鈕
    $('#btn_betInfoBlock').click(function () {
        if ($('#newbet_blank').is(':visible') || $('#betInfo_blank').is(':visible')) {
            $('#newbet_blank').hide();
            $('#betInfo_blank').show();
        } else {
            $('.betInfoBlock').show();
            $('.newbetBlock').hide();
            $('[class*="betInfo_step"],[class*="betInfoMulti_step"],#betInfo_blank').hide();
            $('.betInfo_step1').show();
            $('.BIST_single').addClass('on');
            $('.BIST_multi').removeClass('on');
            $('.betInfo_prompt').hide();
        }        
    });
    $('#btn_newbetBlock').click(function () {
        if ($('#betInfo_blank').is(':visible') || $('#newbet_blank').is(':visible')) {
            $('#betInfo_blank').hide();
            $('#newbet_blank').show();
        } else {
            $('.newbetBlock').show();
            $('.betInfoBlock,#betInfo_blank,#newbetCash').hide();
            $('#newbet').show();
            $('.BIST_unsettled').addClass('on');
            $('.BIST_cash').removeClass('on');
            $('.betInfo_prompt').hide();
        }
    });

    //投注資訊_次按鈕
    $('.betInfo_SubT li').click(function () {
        $(this).siblings().removeClass('on');
        $(this).addClass('on');
    });
    $('.BIST_single').click(function () {
        $('[class*="betInfo_step"],[class*="betInfoMulti_step"],#betInfo_blank').hide();
        $('.betInfo_step1').show();
    });
    $('.BIST_multi').click(function () {
        $('[class*="betInfo_step"],[class*="betInfoMulti_step"],#betInfo_blank').hide();
        $('.betInfoMulti_step1').show();
    });
    $('.BIST_unsettled').click(function () {
        $('#newbet,#newbetCash').hide();
        $('#newbet').show();
    });
    $('.BIST_cash').click(function () {
        $('#newbet,#newbetCash').hide();
        $('#newbetCash').show();
    });

    //投注資訊input focus
    $('input[type="text"]').not('.FB_input').click(function () {
        $('input[type="text"]').removeClass('focus');
        $(this).addClass('focus');
    });

    $(document).bind('click touchend', function (e) {
        var target = $(e.target);
        if (target.closest('input[type="text"]').length == 0) {
            $('input[type="text"]').removeClass('focus');
        }
    });

    //複式串關
    $('.betComplex_T').click(function () {
        if ($('.betComplex_In').css('display') == 'none') {
            $('.betComplex_In').slideDown(200);
            $('.betComplex_T').addClass('on');
            $('.betInfoMulti_step1 .betPlay_In,.betInfoMulti_step2 .betPlay_In').hide();
        } else {
            $('.betComplex_In').slideUp(200);
            $('.betComplex_T').removeClass('on');
            $('.betInfoMulti_step1 .betPlay_In,.betInfoMulti_step2 .betPlay_In').show();
        }
    });

    //可兌現注單
    $('.btn_BIL_cash').click(function () {
        $(this).hide().next().show();
    });

    $('.btn_BIL_cashConfirm').click(function () {
        $(this).closest('.BIL_cashBox').hide().next().show();
        let betInfo_List = $(this).closest('.betInfo_List');
        setTimeout(function () {
            betInfo_List.find('.BIL_cashLoad').hide().next().show();
            if (betInfo_List.find('.BIL_cashOk').length > 0) {
                let secID, secFun = 0, cashOk_s = 3;
                secID = secFun++;
                secID = setInterval(function () {
                    if (cashOk_s > 0) {
                        cashOk_s--;
                    } else if (cashOk_s == 0) {
                        betInfo_List.fadeOut(300);
                        clearInterval(secID);
                    }
                }, 1000);
            }
        }, 2000);
    });

    $('.btn_BIL_cashBack').click(function () {
        $(this).closest('.BIL_cashBox').hide().next().show();
        let betInfo_List = $(this).closest('.betInfo_List');
        if (betInfo_List.find('.BIL_cashStop').length > 0) {
            let cashStop_s = 3
            setInterval(function () {
                if (cashStop_s > 0) {
                    cashStop_s--
                } else if (cashStop_s == 0 && $('.BIST_cash').hasClass('on') == true) {
                    betInfo_List.fadeOut(300);
                } else if (cashStop_s == 0) {
                    betInfo_List.find('.BIL_cashStop').hide();   
                }
            }, 1000);
        }
    });

    //類別名稱...(提示氣泡)
    if (touch) {
        $('.GT_T_nameIn').click(function () {
            if ($(this).innerWidth() >= $(this).parent('.GT_T_name').width()) {
                let GT_nameText = $(this).text(),
                    GT_nameShow_X = $(this).offset().left - 5 + $('.mainStruc').scrollLeft() + 'px',
                    GT_nameShow_Y = $(this).offset().top - $('.GT_nameShow').html(GT_nameText).height() - 3 + 'px';
                $('.GT_nameShow').css({ 'left': GT_nameShow_X, 'top': GT_nameShow_Y }).fadeIn(200);
            }
        });
    } else {
        $('.GT_T_nameIn').hoverDelay(function () {
            let GT_nameText = $(this).text(),
                GT_nameShow_X = $(this).offset().left - 5 + $('.mainStruc').scrollLeft() + 'px',
                GT_nameShow_Y = $(this).offset().top - $('.GT_nameShow').html(GT_nameText).height() - 3 + 'px';

            if ($(this).innerWidth() >= $(this).parent('.GT_T_name').width()) {
                $('.GT_nameShow').css({ 'left': GT_nameShow_X, 'top': GT_nameShow_Y }).fadeIn(200);
            }
        }, function () {
            $('.GT_nameShow').hide();
        });
    }

    $('.mainStruc,.gameListAll_scroll,.gameList_scroll').scroll(function () {
        $('.GT_nameShow').hide();
    });

    //玩法名稱...(提示氣泡)
    if (touch) {
        $('.GT_nameT').parents('td').click(function () {
            if ($(this).find('.GT_nameT').innerWidth() > $(this).width()) {
                let GT_nameText = $(this).text(),
                    GT_nameShow_X = $(this).offset().left - 5 + $('.mainStruc').scrollLeft() + 'px',
                    GT_nameShow_Y = $(this).offset().top - $('.GT_nameShow').html(GT_nameText).height() - 3 + 'px';
                $('.GT_nameShow').css({ 'left': GT_nameShow_X, 'top': GT_nameShow_Y }).fadeIn(200);
            }
        });
    } else {
        $('.GT_nameT').parents('td').hoverDelay(function () {
            let GT_nameText = $(this).text(),
                GT_nameShow_X = $(this).offset().left - 5 + $('.mainStruc').scrollLeft() + 'px',
                GT_nameShow_Y = $(this).offset().top - $('.GT_nameShow').html(GT_nameText).height() - 3 + 'px';

            if ($(this).find('.GT_nameT').innerWidth() > $(this).width()) {
                $('.GT_nameShow').css({ 'left': GT_nameShow_X, 'top': GT_nameShow_Y }).fadeIn(200);
            }
        }, function () {
            $('.GT_nameShow').hide();
        });
    }

    $('.mainStruc,.gameListAll_scroll,.gameList_scroll').scroll(function () {
        $('.GT_nameShow').hide();
    });

    $(document).bind('click touchmove touchend touchstart', function (e) {
        var target = $(e.target);
        if (target.closest('.GT_nameT').parents('td').length == 0 || $('.GT_T_nameIn').length == 0) {
            $('.GT_nameShow').hide();
        }
    });

    //隊伍名稱...(提示氣泡)
    if (touch) {
        $('.GLInTBox_nameT').click(function () {
            var GLInTBox_nameT = $(this).html()
            if ($(this).width() >= $(this).parents('.GLInTBox_nameBox').width() - 15) {
                $('.GLInTBox_nameShow').hide();
                $(this).siblings('.GLInTBox_nameShow').fadeIn(200).html(GLInTBox_nameT);
            } else {
                $(this).siblings('.GLInTBox_nameShow').fadeOut(200);
            }
        });
    } else {
        $('.GLInTBox_nameT').hoverDelay(function () {
            var GLInTBox_nameT = $(this).html()
            if ($(this).width() >= $(this).parents('.GLInTBox_nameBox').width() - 15) {
                $(this).siblings('.GLInTBox_nameShow').fadeIn(200).html(GLInTBox_nameT);
            } else {
                $(this).siblings('.GLInTBox_nameShow').fadeOut(200);
            }
        }, function () {
            $(this).siblings('.GLInTBox_nameShow').fadeOut(200);
        });
    }

    $(document).bind('click touchmove touchend touchstart', function (e) {
        var target = $(e.target);
        if (target.closest('.GLInTBox_nameT').length == 0) {
            $('.GLInTBox_nameShow').fadeOut('fast');
        }
    });

    //網球滾球分數
    $('.roundScore').parent('.GLInTBox_round').css('cursor', 'pointer');
    if (touch) {
        $('.GLInTBox_round').click(function () {
            var GLInTBox_round_H = $(this).height() / 2 + 'px';
            if ($(this).find('.roundScore').css('display') == 'none') {
                $('.roundScore').hide();
                $(this).find('.roundScore').fadeIn(200).css('top', GLInTBox_round_H);
            } else {
                $(this).find('.roundScore').fadeOut(200);
            }
        });
    } else {
        $('.GLInTBox_round').hoverDelay(function () {
            var GLInTBox_round_H = $(this).height() / 2 + 'px';
            if ($(this).find('.roundScore').css('display') == 'none') {
                $('.roundScore').hide();
                $(this).find('.roundScore').fadeIn(200).css('top', GLInTBox_round_H);
            } else {
                $(this).find('.roundScore').fadeOut(200);
            }
        }, function () {
            $('.roundScore').fadeOut(200);
        });
    }

    $(document).bind('click touchmove touchend touchstart', function (e) {
        var target = $(e.target);
        if (target.closest('.GLInTBox_round').length == 0) {
            $('.roundScore').fadeOut(200);
        }
    });

    $('.gameList_scroll').scroll(function () {
        $('.roundScore').fadeOut(200);
    });

    //滾球(跑 icon)轉播(TV icon) 提示字
    if (touch) {
        $('.GLIL_MoreStatus').click(function () {
            $('.MS_prompt').hide();
            $(this).find('.MS_prompt').fadeIn(200);
        });
    } else {
        $('.GLIL_MoreStatus').hoverDelay(function () {
            $(this).find('.MS_prompt').fadeIn(200);
        }, function () {
            $(this).find('.MS_prompt').fadeOut(200);
        });
    }

    $(document).bind('click touchmove touchend touchstart', function (e) {
        var target = $(e.target);
        if (target.closest('.GLIL_MoreStatus').length == 0) {
            $('.MS_prompt').fadeOut('fast');
        }
    });

    //等待中提示/i提示
    if (touch) {
        $('.btn_BIL_wait,.btn_BIL_i,.btn_BIL_iR,.btn_BIL_iG').click(function () {
            $('.BIL_waitIn,.BIL_i_In,.BIL_iR_In,.BIL_iG_In').fadeOut(150);
            $('.BIL_waitInBox,.BIL_i_InBox,.BIL_iR_InBox,.BIL_iG_InBox').slideUp(150);
            if ($(this).find('.BIL_waitIn,.BIL_i_In,.BIL_iR_In,.BIL_iG_In').css('display') == 'none') {
                $(this).find('.BIL_waitIn,.BIL_i_In,.BIL_iR_In,.BIL_iG_In').show();
                $(this).find('.BIL_waitInBox,.BIL_i_InBox,.BIL_iR_InBox,.BIL_iG_InBox').slideDown(150);
            } else {
                $(this).find('.BIL_waitIn,.BIL_i_In,.BIL_iR_In,.BIL_iG_In').fadeOut(150);
                $(this).find('.BIL_waitInBox,.BIL_i_InBox,.BIL_iR_InBox,.BIL_iG_InBox').slideUp(150);
            }
        });
    } else {
        $('.btn_BIL_wait,.btn_BIL_i,.btn_BIL_iR,.btn_BIL_iG').hoverDelay(function () {
            $(this).find('.BIL_waitIn,.BIL_i_In,.BIL_iR_In,.BIL_iG_In').show();
            $(this).find('.BIL_waitInBox,.BIL_i_InBox,.BIL_iR_InBox,.BIL_iG_InBox').slideDown(150);
        }, function () {
            $(this).find('.BIL_waitIn,.BIL_i_In,.BIL_iR_In,.BIL_iG_In').fadeOut(150);
            $(this).find('.BIL_waitInBox,.BIL_i_InBox,.BIL_iR_InBox,.BIL_iG_InBox').slideUp(150);
        });
    }

    $(document).bind('click touchmove touchend touchstart', function (e) {
        var target = $(e.target);
        if (target.closest('.btn_BIL_wait').length == 0) {
            $('.BIL_waitIn').fadeOut(150);
            $('.BIL_waitInBox').slideUp(150);
        }
        if (target.closest('.btn_BIL_i').length == 0) {
            $('.BIL_i_In').fadeOut(150);
            $('.BIL_i_InBox').slideUp(150);
        }
        if (target.closest('.btn_BIL_iR').length == 0) {
            $('.BIL_iR_In').fadeOut(150);
            $('.BIL_iR_InBox').slideUp(150);
        }
        if (target.closest('.btn_BIL_iG').length == 0) {
            $('.BIL_iG_In').fadeOut(150);
            $('.BIL_iG_InBox').slideUp(150);
        }
    });

    //最新注單-過關下拉
    $('.NB_Complex').on('click', function () {
        if ($(this).find('.NB_Complex_In').css('display') == 'none') {
            $(this).find('.NB_Complex_In').slideDown(200);
            $(this).addClass('on');
        } else {
            $(this).find('.NB_Complex_In').slideUp(200);
            $(this).removeClass('on');
        }
    }).on('click', '.icon_BIL_ok,.icon_BIL_no,.btn_BIL_wait,.btn_BIL_i,.btn_link', function (e) {
        e.stopPropagation();
    });

    //過關計算器
    var count_click = 0
    if (touch) {
        $('.btn_count').click(function () {
            if (count_click == 0) {
                $(this).addClass('on').find('.count_prompt').fadeIn(150);
                count_click++
            } else if (count_click == 1) {
                $(this).find('.count_prompt').fadeOut(150);
                $('.calculator').parents('.bg_popUpBox_scroll').show();
                $('.calculator').show();
                $('.bg_popUpBox').addClass('bg_popUpBox_Y');
                count_click = 0
            }
        });
        $(document).bind('click touchend', function (e) {
            var target = $(e.target);
            if (target.closest('.btn_count').length == 0 && count_click == 1) {
                $('.btn_count').removeClass('on').find('.count_prompt').fadeOut(150);
                count_click = 0
            }
        })
    } else {
        $('.btn_count').hoverDelay(function () {
            $(this).addClass('on').find('.count_prompt').fadeIn(150);
        }, function () {
            if (count_click == 0) {
                $(this).removeClass('on').find('.count_prompt').fadeOut(150);
            }
        });

        $('.btn_count').click(function () {
            $(this).find('.count_prompt').hide();
            $('.calculator').parents('.bg_popUpBox_scroll').show();
            $('.calculator').show();
            $('.bg_popUpBox').addClass('bg_popUpBox_Y');
            count_click++
        });
    }
    $('.btn_calculator_close').click(function () {
        $('.btn_count').removeClass('on');
        $('.calculator').parents('.bg_popUpBox_scroll').hide();
        $('.calculator,.formula').hide();
        $('.bg_popUpBox').removeClass('bg_popUpBox_Y');
        count_click = 0
    });
    $('.calcPassCount_ratio').each(function () {
        if ($(this).prev('.calcPassCount_select').val() == 'CPC_selWin') {
            $(this).prev('.calcPassCount_select').css('color', '#0371fe');
            $(this).addClass('off').attr('disabled', 'disabled').val('100');
        } else if ($(this).prev('.calcPassCount_select').val() == 'CPC_selLose') {
            $(this).prev('.calcPassCount_select').css('color', '#f00');
            $(this).addClass('off').attr('disabled', 'disabled').val('100');
        } else if ($(this).prev('.calcPassCount_select').val() == 'CPC_selFlat') {
            $(this).prev('.calcPassCount_select').css('color', '#000');
            $(this).addClass('off').attr('disabled', 'disabled').val('0');
        } else if ($(this).prev('.calcPassCount_select').val() == 'CPC_selPlus') {
            $(this).prev('.calcPassCount_select').css('color', '#0371fe');
            $(this).removeClass('off').removeAttr('disabled').val('');
        } else {
            $(this).prev('.calcPassCount_select').css('color', '#f00');
            $(this).removeClass('off').removeAttr('disabled').val('');
        }
    });
    $('.calcPassCount_select').change(function () {
        if ($(this).val() == 'CPC_selWin') {
            $(this).css('color', '#0371fe');
            $(this).next('.calcPassCount_ratio').addClass('off').attr('disabled', 'disabled').val('100');
        } else if ($(this).val() == 'CPC_selLose') {
            $(this).css('color', '#f00');
            $(this).next('.calcPassCount_ratio').addClass('off').attr('disabled', 'disabled').val('100');
        } else if ($(this).val() == 'CPC_selFlat') {
            $(this).css('color', '#000');
            $(this).next('.calcPassCount_ratio').addClass('off').attr('disabled', 'disabled').val('0');
        } else if ($(this).val() == 'CPC_selPlus') {
            $(this).css('color', '#0371fe');
            $(this).next('.calcPassCount_ratio').removeClass('off').removeAttr('disabled').val('');
        } else {
            $(this).css('color', '#f00');
            $(this).next('.calcPassCount_ratio').removeClass('off').removeAttr('disabled').val('');
        }
    });

    //過關計算器(操作說明)
    if (touch) {
        $('.btn_calcPrompt').click(function () {
            $('.calcPromptIn').fadeOut(200);
            $('.calcPromptInBox').slideUp(200);
            if ($(this).find('.calcPromptIn').css('display') == 'none') {
                $(this).find('.calcPromptIn').show();
                $(this).find('.calcPromptInBox').slideDown(200).delay(200);
            } else {
                $(this).find('.BPP_In').fadeOut(200);
                $(this).find('.calcPromptInBox').slideUp(200);
            }
        });
    } else {
        $('.btn_calcPrompt').hoverDelay(function () {
            $(this).find('.calcPromptIn').show();
            $(this).find('.calcPromptInBox').slideDown(200).delay(200);
        }, function () {
            $(this).find('.calcPromptIn').fadeOut(200);
            $(this).find('.calcPromptInBox').slideUp(200);
        });
    }
    $(document).bind('click touchend', function (e) {
        var target = $(e.target);
        if (target.closest('.btn_calcPrompt').length == 0) {
            $('.calcPromptIn').fadeOut(200);
            $('.calcPromptInBox').slideUp(200);
        }
    });

    //過關計算器(計算過程)
    $('.btn_calc_run').click(function () {
        $('.formula').slideDown(200);
    });
    if (touch) {
        $('.btn_formulaPrompt').click(function () {
            $(this).removeClass('on');
            $('.formulaPromptBox').fadeOut(200);
            if ($(this).find('.formulaPromptBox').css('display') == 'none') {
                $(this).addClass('on');
                $(this).find('.formulaPromptBox').slideDown(200).delay(200);
            } else {
                $(this).removeClass('on');
                $(this).find('.formulaPromptBox').slideUp(200);
            }
        });
    } else {
        $('.btn_formulaPrompt').hoverDelay(function () {
            $(this).addClass('on');
            $(this).find('.formulaPromptBox').slideDown(200).delay(200);
        }, function () {
            $(this).removeClass('on');
            $(this).find('.formulaPromptBox').slideUp(200);
        });
    }
    $(document).bind('click touchend', function (e) {
        var target = $(e.target);
        if (target.closest('.btn_formulaPrompt').length == 0) {
            $('.btn_formulaPrompt').removeClass('on');
            $('.formulaPromptBox').slideUp(200);
        }
    });

    //功能設定
    var funSet_click = 0
    if (touch) {
        $('.btn_funSet').click(function () {
            if (funSet_click == 0) {
                $(this).addClass('on').find('.funSet_prompt').fadeIn(150);
                funSet_click++
            } else if (funSet_click == 1) {
                $(this).find('.funSet_prompt').fadeOut(150);
                $('.functionSet').parents('.bg_popUpBox_scroll').show();
                $('.functionSet').show();
                $('.bg_popUpBox').addClass('bg_popUpBox_Y');
                funSet_click = 0
            }
        });
        $(document).bind('click touchend', function (e) {
            var target = $(e.target);
            if (target.closest('.btn_funSet').length == 0 && count_click == 1) {
                $('.btn_funSet').removeClass('on').find('.funSet_prompt').fadeOut(150);
                funSet_click = 0
            }
        })
    } else {
        $('.btn_funSet').hoverDelay(function () {
            $(this).addClass('on').find('.funSet_prompt').fadeIn(150);
        }, function () {
            if (funSet_click == 0) {
                $(this).removeClass('on').find('.funSet_prompt').fadeOut(150);
            }
        });

        $('.btn_funSet').click(function () {
            $(this).find('.funSet_prompt').hide();
            $('.functionSet').parents('.bg_popUpBox_scroll').show();
            $('.functionSet').show();
            $('.bg_popUpBox').addClass('bg_popUpBox_Y');
            funSet_click++
        });
    }

    $('.btn_funSet_close,.funSet_button').click(function () {
        $('.btn_funSet').removeClass('on');
        $('.functionSet').parents('.bg_popUpBox_scroll').hide();
        $('.functionSet').hide();
        $('.bg_popUpBox').removeClass('bg_popUpBox_Y');
        funSet_click = 0
        if ($(this).is('.funSet_button')) {
            $('.popFavMsg').finish().fadeIn(800).delay(800).fadeOut(800).find('.popFavMsg_In').text('修改成功');
        }
    });

    //功能設定-按鈕切換
    $('.btn_funSel').click(function () {
        $(this).siblings('.btn_funSel').removeClass('on');
        $(this).addClass('on');
        $(this).nextAll('.defaultMoney').hide();
        $('#defaultMoney,#defaultMoney_multi').each(function () {
            if ($(this).hasClass('on')) {
                $(this).nextAll('.defaultMoney').show();
            }
        });
        if ($('#funSel_today').hasClass('on')) {
            $('#funSel_timelyGame').show();
        } else {
            $('#funSel_timelyGame').hide();
        }
        if ($('#funSel_default').hasClass('on')) {
            $('#funSel_ball').hide();            
        } else {
            $('#funSel_ball').show();
        }
    });

    //功能設定-籌碼(最多設置6個)
    $('.btn_chip').click(function () {
        if ($('.btn_chip.on').length < 6) {
            $(this).toggleClass('on');
        } else {
            $(this).removeClass('on');
        }
    });
    if (touch) {
    } else {
        $('.btn_chip').hover(function () {
            $(this).addClass('hover');
        }, function () {
            $(this).removeClass('hover');
        });
    }

    //功能設定(操作說明)
    if (touch) {
        $('.btn_funSetPrompt').click(function () {
            $('.funSetPromptIn').fadeOut(200);
            $('.funSetPromptInBox').slideUp(200);
            if ($(this).find('.funSetPromptIn').css('display') == 'none') {
                $(this).find('.funSetPromptIn').show();
                $(this).find('.funSetPromptInBox').slideDown(200).delay(200);
            } else {
                $(this).find('.funSetPromptIn').fadeOut(200);
                $(this).find('.funSetPromptInBox').slideUp(200);
            }
        });
    } else {
        $('.btn_funSetPrompt').hoverDelay(function () {
            $(this).find('.funSetPromptIn').show();
            $(this).find('.funSetPromptInBox').slideDown(200).delay(200);
        }, function () {
            $(this).find('.funSetPromptIn').fadeOut(200);
            $(this).find('.funSetPromptInBox').slideUp(200);
        });
    }
    $(document).bind('click touchend', function (e) {
        var target = $(e.target);
        if (target.closest('.btn_funSetPrompt').length == 0) {
            $('.funSetPromptIn').fadeOut(200);
            $('.funSetPromptInBox').slideUp(200);
        }
    });

    //聯盟選擇
    $('.btn_alliance,.btn_OW_alliance').click(function () {
        $('.allianceSel').parents('.bg_popUpBox_scroll').show();
        $('.allianceSel').show();
    });
    $('.btn_alliance_close').click(function () {
        $('.allianceSel').parents('.bg_popUpBox_scroll').hide();
        $('.allianceSel').hide();
    });

    $('.alliance_scroll li').click(function () {
        $('.AL_nameShow').not($(this).find('.AL_nameShow')).hide();
        $(this).toggleClass('on');
        if ($('.btn_AL_showSel').hasClass('on')) {
            $(this).not('[class*="AL_li_"]').toggle();
            $('[class*="AL_li_"]').each(function () {
                let listOn_Num = $(this).nextUntil('[class*="AL_li_"]', '.on').length;
                if (listOn_Num == 0) {
                    $(this).hide();
                }
            });
        }
        //(收藏夾)分類總開關判斷
        if ($(this).is('[class*="AL_li_"]')) {
            if ($(this).hasClass('on')) {
                $(this).nextUntil('[class*="AL_li_"]').addClass('on').show();
            } else {
                if ($('.btn_AL_showSel').hasClass('on')) {
                    $(this).hide().nextUntil('[class*="AL_li_"]').removeClass('on').hide();
                } else {
                    $(this).nextUntil('[class*="AL_li_"]').removeClass('on');
                }
            }
        } else {
            if ($('.allianceFAV').length > 0) {
                let AL_className = $(this).prevAll('[class*="AL_li_"]').attr('class').split(' ')[0],
                    li_Num = $('.' + AL_className).nextUntil('[class*="AL_li_"]').length,
                    liOn_Num = $('.' + AL_className).nextUntil('[class*="AL_li_"]').filter('.on').length;
                if (liOn_Num == li_Num) {
                    $('.' + AL_className).addClass('on');
                } else if (liOn_Num < li_Num) {
                    $('.' + AL_className).removeClass('on');
                }
            }
        }
        //聯盟全(開/關)
        let list_Num = $('.alliance_scroll li').length,
            listOn_Num = $('.alliance_scroll li.on').length;
        if (listOn_Num == list_Num) {
            $('.btn_AL_allSel').addClass('on');
            $('.btn_AL_showSel').removeClass('on').addClass('off');

        } else if (listOn_Num < list_Num) {
            $('.btn_AL_allSel').removeClass('on');
            $('.btn_AL_showSel').removeClass('off');
        }
    });

    //全選
    $('.btn_AL_allSel').click(function () {
        $(this).toggleClass('on');
        if ($(this).hasClass('on')) {
            $('.alliance_scroll li').addClass('on');
            $('.btn_AL_showSel').removeClass('on').addClass('off');
            $('.alliance_scroll li').css('display', 'block');
        } else {
            $('.alliance_scroll li').removeClass('on');
            $('.btn_AL_showSel').removeClass('off');
        }
    });
    //只顯示已勾選
    $('.btn_AL_showSel').click(function () {
        if ($('.btn_AL_showSel.off').length == 0) {
            $(this).toggleClass('on');
            if ($(this).hasClass('on')) {
                $('.alliance_scroll li').not($('[class*="AL_li_"],.alliance_scroll li.on')).hide();
                $('[class*="AL_li_"]').each(function () {
                    let listOn_Num = $(this).nextUntil('[class*="AL_li_"]', '.on').length;
                    if (listOn_Num == 0) {
                        $(this).hide();
                    }
                });
                //前6個氣泡框方向
                $('.alliance_scroll li.on:lt(6)').addClass('boxDown');
            } else {
                $('.alliance_scroll li').css('display', 'block').removeClass('boxDown');
            }
        }
    });

    //聯盟選擇(提交)按鈕
    $('.btn_AL_confirm').click(function () {
        if ($('.btn_AL_allSel').hasClass('on')) {
            $('.btn_alliance,.btn_OW_alliance').removeClass('on');
        } else {
            $('.btn_alliance,.btn_OW_alliance').addClass('on');
        }
    });

    //聯盟選擇-排序
    $('.btn_AL_setMenu').click(function () {
        if ($(this).find('.ALSM_In').css('display') == 'none') {
            $(this).addClass('on');
            $(this).find('.ALSM_In').show();
            $(this).find('.ALSM_InBox').slideDown(200);
        } else {
            $(this).removeClass('on');
            $(this).find('.ALSM_In').fadeOut(200);
            $(this).find('.ALSM_InBox').slideUp(200);
        }
    });

    $(document).bind('click touchend', function (e) {
        var target = $(e.target);
        if (target.closest('.btn_AL_setMenu').length == 0) {
            $('.btn_AL_setMenu').removeClass('on');
            $('.ALSM_In').fadeOut(200);
            $('.ALSM_InBox').slideUp(200);
        }
    });

    $('.ALSM_InBox a').click(function () {
        var ALSM_name = $(this).text();
        $('.ALSM_T').text(ALSM_name);
        $(this).siblings('a').removeClass('on');
        $(this).addClass('on');
        $(this).parents('.ALSM_InBox').delay(150).slideUp(200);
        $(this).parents('.ALSM_In').delay(150).fadeOut(200);
        if ($('#btn_AL_A-Z').hasClass('on')) {
            $('.allianceSel').addClass('alliance_A-Z');
            $('.btn_A-Z').show();
        } else {
            $('.allianceSel').removeClass('alliance_A-Z');
            $('.btn_A-Z').hide();
        }
    });

    $('.btn_A-Z td').click(function () {
        $('.btn_A-Z td').removeClass('on');
        $(this).addClass('on');
    });

    //聯盟選擇-名稱
    if (touch) {
        $('.AL_nameT').click(function () {
            var AL_nameT = $(this).html()
            $('.AL_nameShow').hide();
            if ($(this).width() >= $(this).parents('li').width() - 2) {
                $(this).siblings('.AL_nameShow').stop().fadeIn(200).delay(2000).fadeOut(200).html(AL_nameT);
            } else {
                $(this).siblings('.AL_nameShow').fadeOut(200);
            }
        });
    } else {
        $('.AL_nameT').hoverDelay(function () {
            var AL_nameT = $(this).html()
            if ($(this).width() >= $(this).parents('li').width() - 2) {
                $(this).siblings('.AL_nameShow').fadeIn(200).html(AL_nameT);
            } else {
                $(this).siblings('.AL_nameShow').fadeOut(200);
            }
        }, function () {
            $(this).siblings('.AL_nameShow').fadeOut(200);
        });
    }

    $(document).bind('click touchmove touchend touchstart', function (e) {
        var target = $(e.target);
        if (target.closest('.AL_nameT').length == 0) {
            $('.AL_nameShow').fadeOut('fast');
        }
    });

    //平台轉帳
    $('.btn_IDPoint,.btn_transfer').click(function () {
        $('.fastTransfer').parents('.bg_popUpBox_scroll').show();
        $('.fastTransfer').show()
    });

    $('.btn_fastTransfer_close').click(function () {
        $('.fastTransfer').parents('.bg_popUpBox_scroll').hide();
        $('.fastTransfer').hide();
    });

    //投注記錄-checkbox
    $('.btn_OW_checkbox').click(function () {
        $(this).toggleClass('on');
    });

    //投注記錄-設定下拉(基本款)
    $('.btn_OW_setMenu').click(function () {
        if ($(this).find('.OSM_In').css('display') == 'none') {
            $('.btn_OW_setMenu').removeClass('on');
            $('.OSM_In').fadeOut(200);
            $('.OSM_InBox').slideUp(200);
            $(this).addClass('on');
            $(this).find('.OSM_In').show();
            $(this).find('.OSM_InBox').slideDown(200);
        } else {
            $(this).removeClass('on');
            $(this).find('.OSM_In').fadeOut(200);
            $(this).find('.OSM_InBox').slideUp(200);
        }
    });

    $(document).bind('click touchend', function (e) {
        var target = $(e.target);
        if (target.closest('.btn_OW_setMenu').length == 0) {
            $('.btn_OW_setMenu').removeClass('on');
            $('.OSM_In').fadeOut(200);
            $('.OSM_InBox').slideUp(200);
        }
    });

    $('.OSM_InBox a').click(function () {
        $(this).siblings('a').removeClass('on');
        $(this).addClass('on');
        $(this).parents('.OSM_InBox').delay(150).slideUp(200);
        $(this).parents('.OSM_In').delay(150).fadeOut(200);
    });

    //投注記錄(過關串關內頁)底部固定
    if ($('.RT_holdTop').length > 1 && $('.RT_holdBtm').length > 0) {
        var complexTop = $('.recordTable.RT_holdTop').next('.recordTable').offset().top + $('.RT_holdBtm').height(),
            pageH = $('body').height();
    }
    if (complexTop > pageH) {
        $('.recordTable.RT_total').removeClass('RT_holdBtm');
    }

    $('.openWindows_scroll.scrollbar-macosx').scroll(function () {
        var openWindowsTop = $(this).scrollTop() + $('body').height();
        if (openWindowsTop > complexTop) {
            $('.recordTable.RT_total').addClass('RT_holdBtm');
        } else {
            $('.recordTable.RT_total').removeClass('RT_holdBtm');
        }
    });

    //投注記錄(過關串關內頁)次目錄
    $('.openWindows_set a').click(function () {
        $(this).addClass('on').siblings('a').removeClass('on');
        switch ($(this).attr('id')) {
            case 'btn_betRecord_pass':
                $('#open_betRecord_pass').show();
                $('#open_betRecord_passImmed').hide();
                break;
            case 'btn_betRecord_passImmed':
                $('#open_betRecord_passImmed').show();
                $('#open_betRecord_pass').hide();
                break;
        }
    });

    //投注記錄-分類項目(列表開關)
    $('.btn_classifyName').click(function () {
        if ($(this).closest('.classify_T').next('.classify_In').css('display') == 'none') {
            $(this).closest('.classify_T').next('.classify_In').show();
            $(this).addClass('on');
        } else {
            $(this).closest('.classify_T').next('.classify_In').hide();
            $(this).removeClass('on');
        }
        $('.btn_RT_arrow').each(function () {
            var classify_list = $('.classify_T').length;
            var classifyOn_list = $('.btn_classifyName.on').length;
            if (classifyOn_list == classify_list) {
                $(this).addClass('on');
            } else if (classifyOn_list == 0) {
                $(this).removeClass('on');
            }
        });
    });

    //投注記錄-分類項目(列表總開關)
    $('.btn_RT_arrow').click(function () {
        $(this).toggleClass('on');
        if ($(this).hasClass('on')) {
            $('.btn_classifyName').addClass('on');
            $('.classify_In').show();
        } else {
            $('.btn_classifyName').removeClass('on');
            $('.classify_In').hide();
        }
    });

    $('.btn_GT_confirm,.btn_GT_confirm2').click(function () {
        $('.btn_OW_gameMenu').removeClass('on');
        $('.OGM_In').fadeOut(200);
        $('.OGM_InBox').slideUp(200);
    });

    $(document).bind('click touchend', function (e) {
        var target = $(e.target);
        if (target.closest('.btn_OW_gameMenu').length == 0) {
            $('.btn_OW_gameMenu').removeClass('on');
            $('.OGM_In').fadeOut(200);
            $('.OGM_InBox').slideUp(200);
        }
    });

    $('.icon_GT_checkbox').parent('.btn_GT_allSel').click(function () {
        $(this).toggleClass('on');
        if ($(this).hasClass('on')) {
            $('.gameType_list td').addClass('on');
        } else {
            $('.gameType_list td').removeClass('on');
        }
    });
    $('.icon_GT_checkbox').parent().click(function () {
        $(this).toggleClass('on');
        var GT_checkbox_num = $('.gameType_list').find('.icon_GT_checkbox').length;
        var GT_checkbox_on = $('.gameType_list td.on').length;
        if (GT_checkbox_num == GT_checkbox_on) {
            $('.btn_GT_allSel').addClass('on');
        } else {
            $('.btn_GT_allSel').removeClass('on');
        }
    });

    //回到最上層
    $('.openWindows_scroll,.GR_listIn_scroll,.liveScore_scroll,.ruleBox_In_scroll,.ANC_scroll,.tutorials_scroll').scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('.btn_OW_goTop').fadeIn();
        } else {
            $('.btn_OW_goTop').fadeOut();
        }
    });

    if (touch) {
        $('.btn_OW_goTop').removeClass('hover');
    } else {
        $('.btn_OW_goTop').on('mouseover', function () {
            $(this).addClass('hover');
        })
        $('.btn_OW_goTop').on('mouseout', function () {
            $(this).removeClass('hover');
        });
    }

    $('.btn_OW_goTop').on('click touchend', function () {
        $('.openWindows_scroll,.GR_listIn_scroll,.liveScore_scroll,.ruleBox_In_scroll,.ANC_scroll,.tutorials_scroll').animate({
            scrollTop: 0
        }, 300);
    });

    //投注記錄-(i)提示/(等待)提示
    if (touch) {
        $('.btn_RT_i,.btn_RT_iR,.btn_RT_iG,.btn_RT_wait').click(function () {
            $('.RT_i_In,.RT_iR_In,.RT_iG_In,.RT_wait_In').fadeOut(200);
            $('.RT_i_InBox,.RT_iR_InBox,.RT_iG_InBox,.RT_wait_InBox').slideUp(200);
            if ($(this).find('.RT_i_In,.RT_iR_In,.RT_iG_In,.RT_wait_In').css('display') == 'none') {
                $(this).find('.RT_i_In,.RT_iR_In,.RT_iG_In,.RT_wait_In').show();
                $(this).find('.RT_i_InBox,.RT_iR_InBox,.RT_iG_InBox,.RT_wait_InBox').slideDown(200).delay(200);
            } else {
                $(this).find('.RT_i_In,.RT_iR_In,.RT_iG_In,.RT_wait_In').fadeOut(200);
                $(this).find('.RT_i_InBox,.RT_iR_InBox,.RT_iG_InBox,.RT_wait_InBox').slideUp(200);
            }
        });
    } else {
        $('.btn_RT_i,.btn_RT_iR,.btn_RT_iG,.btn_RT_wait').hoverDelay(function () {
            $(this).find('.RT_i_In,.RT_iR_In,.RT_iG_In,.RT_wait_In').show();
            $(this).find('.RT_i_InBox,.RT_iR_InBox,.RT_iG_InBox,.RT_wait_InBox').slideDown(200).delay(200);
        }, function () {
            $(this).find('.RT_i_In,.RT_iR_In,.RT_iG_In,.RT_wait_In').fadeOut(200);
            $(this).find('.RT_i_InBox,.RT_iR_InBox,.RT_iG_InBox,.RT_wait_InBox').slideUp(200);
        });
    }

    $(document).bind('click touchmove touchend touchstart', function (e) {
        var target = $(e.target);
        if (target.closest('.btn_RT_i,.btn_RT_iR,.btn_RT_iG,.btn_RT_wait').length == 0) {
            $('.RT_i_In,.RT_iR_In,.RT_iG_In,.RT_wait_In').fadeOut(150);
            $('.RT_i_InBox,.RT_iR_InBox,.RT_iG_InBox,.RT_wait_InBox').slideUp(150);
        }
    });

    //投注記錄-兌現按鈕步驟
    $('.btn_RT_cash').click(function () {
        $(this).hide().next().show();
    });

    $('.btn_RT_cashConfirm').click(function () {
        $(this).closest('.RT_cashBox').hide().next().show();
        $(this).closest('.RT_cash').addClass('cashLoad');
        let tdCash_tr = $(this).closest('tr');
        let tdCash = $(this).closest('.RT_cash');
        setTimeout(function () {
            tdCash.removeClass('cashLoad');
            tdCash_tr.find('.RT_cashLoad').hide();
            if (tdCash.find('.RT_cashNo').length > 0) {
                tdCash.addClass('cashNo').find('.RT_cashNo,.btn_RT_cashBack').show();
            } else {
                tdCash.addClass('cashOk').find('.RT_cashOk').show();
                let secID, secFun = 0, cashOk_s = 3;
                secID = secFun++;
                secID = setInterval(function () {
                    if (cashOk_s > 0) {
                        cashOk_s--;
                    } else if (cashOk_s == 0) {
                        tdCash.closest('tr').fadeOut(300);
                        clearInterval(secID);
                    }
                }, 1000);
            }            
        }, 2000);        
    });

    $('.btn_RT_cashBack').click(function () {
        let tdCash = $(this).closest('.RT_cash');
        if (tdCash.find('.btn_RT_cashChange').length > 0) {
            $(this).hide().prev('.RT_cashNo').hide();
            $(this).next().show();
            tdCash.removeClass('cashNo').addClass('cashChange');
        } else {
            $(this).hide().prev('.RT_cashNo').hide();
            $(this).next().show();
            tdCash.removeClass('cashNo').find('.RT_cashText').hide();
            let cashStop_s = 3
            setInterval(function () {
                if (cashStop_s > 0) {
                    cashStop_s--
                } else if (cashStop_s == 0) {
                    tdCash.find('.RT_cashStop').hide();
                }
            }, 1000);
        }
    });

    //賽果-日期下拉
    $('.btn_date_sel').click(function () {
        if ($(this).find('.DT_In').css('display') == 'none') {
            $('.btn_date_sel').removeClass('on');
            $('.DT_In').fadeOut(200);
            $('.DT_InBox').slideUp(200);
            $(this).addClass('on');
            $(this).find('.DT_In').show();
            $(this).find('.DT_InBox').slideDown(200);
        } else {
            $(this).removeClass('on');
            $(this).find('.DT_In').fadeOut(200);
            $(this).find('.DT_InBox').slideUp(200);
        }
    });

    $(document).bind('click touchend', function (e) {
        var target = $(e.target);
        if (target.closest('.btn_date_sel').length == 0) {
            $('.btn_date_sel').removeClass('on');
            $('.DT_In').fadeOut(200);
            $('.DT_InBox').slideUp(200);
        }
    });

    $('.DT_InBox a').click(function () {
        $('.DT_T').text($(this).text());
        $('.DT_InBox a').removeClass('on');
        $(this).addClass('on');
    });

    //賽果-上方設定下拉
    $('.btn_update_sel').click(function () {
        if ($(this).find('.UD_In').css('display') == 'none') {
            $('.btn_update_sel').removeClass('on');
            $('.UD_In').fadeOut(200);
            $('.UD_InBox').slideUp(200);
            $(this).addClass('on');
            $(this).find('.UD_In').show();
            $(this).find('.UD_InBox').slideDown(200);
        } else {
            $(this).removeClass('on');
            $(this).find('.UD_In').fadeOut(200);
            $(this).find('.UD_InBox').slideUp(200);
        }
    });

    $(document).bind('click touchend', function (e) {
        var target = $(e.target);
        if (target.closest('.btn_update_sel').length == 0) {
            $('.btn_update_sel').removeClass('on');
            $('.UD_In').fadeOut(200);
            $('.UD_InBox').slideUp(200);
        }
    });

    //賽果-倒數
    $('.UD_InBox a').click(function () {
        $('.UD_T').text($(this).text());
        $('.UD_InBox a').removeClass('on');
        $(this).addClass('on');
        var update = $(this).attr('class').split(/(\d+)/)[1];
        switch (true) {
            case $(this).hasClass('updateNo'):
                $('.UD_reciprocal').hide();
                break;
            case $(this).hasClass('update30s'):
                $('.UD_reciprocal').show().text('30');
                break;
            case $(this).hasClass('update60s'):
                $('.UD_reciprocal').show().text('60');
                break;
        }
    });

    //賽果-球類左側Menu
    $('.GR_menuIn_scroll li').click(function () {
        $('.GR_menuIn_scroll li').removeClass('on');
        $(this).addClass('on');
    });

    //賽果-列表欄位數判斷
    var GR_listNum = $('.GRLT_name').nextUntil('.GRLT_more').length;
    if (GR_listNum <= 5) {
        $('.GRLT_name,.GR_BoxT_name').css('width', 'auto');
        $('.GR_listTitle').find('td').not('[class*="GRLT_"]').css('width', '75px');
        $('.GR_BoxT').find('td').not('[class*="GR_BoxT_"]').css('width', '74px');
    }

    //賽果-列表總開關
    $('.GRLT_name').click(function () {
        if ($('.btn_GRL_all.off').length == 0) {
            $('.GRL_In').hide();
            $(this).find('.btn_GRL_all').addClass('off')
            $('.btn_GRL_T').addClass('off')
        } else {
            $('.GRL_In').show();
            $(this).find('.btn_GRL_all').removeClass('off')
            $('.btn_GRL_T').removeClass('off')
        }
    });

    //賽果-各列開關
    $('.btn_GRL_T').click(function () {
        if ($(this).hasClass('off')) {
            $(this).next('.GRL_In').show();
            $(this).removeClass('off');
        } else {
            $(this).next('.GRL_In').hide();
            $(this).addClass('off');
        }
    });

    //賽果-球類細目開關
    $('.GR_infoNum').closest('.GR_BoxT').find('.GR_BoxT_name,.GR_BoxT_info').css('cursor', 'pointer')
    $('.GR_infoNum').closest('.GR_BoxT').find('.GR_BoxT_name,.GR_BoxT_info').click(function () {
        if ($(this).closest('.GR_BoxT').find('.GR_BoxT_info').hasClass('on')) {
            $(this).closest('.GR_BoxT').next('.GR_BoxIn').hide();
            $(this).closest('.GR_BoxT').find('.GR_BoxT_info').removeClass('on');
        } else {
            $('.GR_BoxIn').hide();
            $('.GR_BoxT_info').removeClass('on');
            $(this).closest('.GR_BoxT').next('.GR_BoxIn').show();
            $(this).closest('.GR_BoxT').find('.GR_BoxT_info').addClass('on');
        }
    });

    //賽果-名稱
    if (touch) {
        $('.GRBox_nameT').click(function () {
            var GRBox_nameT = $(this).html()
            $('.GRBox_nameShow').hide();
            if ($(this).width() >= $(this).parents('.GRBox_nameBox').width() - 2) {
                $(this).siblings('.GRBox_nameShow').stop().fadeIn(200).delay(2000).fadeOut(200).html(GRBox_nameT);
            } else {
                $(this).siblings('.GRBox_nameShow').fadeOut(200);
            }
        });
    } else {
        $('.GRBox_nameT').hoverDelay(function () {
            var GRBox_nameT = $(this).html()
            if ($(this).width() >= $(this).parents('.GRBox_nameBox').width() - 2) {
                $(this).siblings('.GRBox_nameShow').fadeIn(200).html(GRBox_nameT);
            } else {
                $(this).siblings('.GRBox_nameShow').fadeOut(200);
            }
        }, function () {
            $(this).siblings('.GRBox_nameShow').fadeOut(200);
        });
    }

    $(document).bind('click touchmove touchend touchstart', function (e) {
        var target = $(e.target);
        if (target.closest('.GRBox_nameT').length == 0) {
            $('.GRBox_nameShow').fadeOut('fast');
        }
    });

    //更多玩法menu
    $('[class*="btn_GDV_"]').click(function () {
        $('[class*="btn_GDV_"]').removeClass('on');
        $(this).addClass('on');
        function mcSet() {
            $('.chatroom').removeClass('chatroomMc');
            if ($('.CR_loading').css('display') == 'none') {
                $('.talk_InForm').closest('[class*="talk_LV"],.talk_USER').show();
            }
            $('.giftBox,.giftPopup').hide();
            $('.giftBox_footer').removeClass('bg_black');
            $('.btn_gift').removeClass('on');
            if ($('link[href*="th.css"]').length > 0) {
                $('.CRB_keyIn_Text_prompt').text('คุณสามารถสนทนาได้แล้ว');
            } else if ($('link[href*="vi.css"]').length > 0) {
                $('.CRB_keyIn_Text_prompt').text('Cùng trò chuyện nào!');
            } else {
                $('.CRB_keyIn_Text_prompt').text('一起聊聊吧~');
            }
        }
        $('.GDView').find('.liveTv_view,.liveMc_view').each(function () {
            this.pause();
        });
        if ($('.GDView').find('.liveTv_NG').hasClass('on')) {
            $('.GDView').find('.liveTv_mask').removeClass('on');
        } else {
            $('.GDView').find('.liveTv_mask').addClass('on');
        }
        switch (true) {
            case $(this).hasClass('btn_GDV_scoreBoard'):
                $('.scoreBoard').show().siblings().not('.GDView_T').hide();
                mcSet();
                break;
            case $(this).hasClass('btn_GDV_runData'):
                $('.runData').show().siblings().not('.GDView_T').hide();
                mcSet();
                break;
            case $(this).hasClass('btn_GDV_liveTv'):
                $('.GDView .liveTv').removeClass('liveMc').show().siblings().not('.GDView_T').hide();
                mcSet();
                if ($('.liveTv.popUp').length > 0 && $('.liveTv.popUp.liveMc').length == 0) {
                    $('.liveTv.popUp').removeClass('on').hide();
                    $('.GDView .liveTv').removeClass('on');
                }
                break;
            case $(this).hasClass('btn_GDV_liveMc'):
                $('.GDView .liveTv').addClass('liveMc').show().siblings().not('.GDView_T').hide();
                $('.chatroom').addClass('chatroomMc');
                $('.talk_InForm').closest('[class*="talk_LV"],.talk_USER').hide();
                if ($('.liveTv.popUp.liveMc').length > 0) {
                    $('.liveTv.popUp').removeClass('on').hide();
                    $('.GDView .liveMc').removeClass('on');
                }
                if ($('link[href*="th.css"]').length > 0) {
                    $('.CRB_keyIn_Text_prompt').text('สนทนากับ MC');
                } else if ($('link[href*="vi.css"]').length > 0) {
                    $('.CRB_keyIn_Text_prompt').text('Trò chuyện với MC nào');
                } else if ($('link[href*="green.css"]').length > 0) {
                    $('.CRB_keyIn_Text_prompt').text('与主播聊聊吧~');
                } else {
                    $('.CRB_keyIn_Text_prompt').text('與主播聊聊吧~');
                }
                if ($('.CRB_keyIn_Text_NG').css('display') == '-webkit-box' || $('.CRB_keyIn_Text_loading').css('display') == '-webkit-box') {
                    $('.btn_gift').hide();
                }
                break;
            case $(this).hasClass('btn_GDV_gameData'):
                //$('.gameData').show().siblings().not('.GDView_T').hide();
                $('.scoreBoard,.runData,.liveTv:not(.liveTv.popUp)').hide();
                mcSet();
                break;
        }
        //聊天室全展開狀態-需重新計算高度
        var chatroomH = $('.gameDetail').height() - $('.gameDetail_T').outerHeight() - $('.GDView').height();
        if ($('.gamePanel_R ').hasClass('chatroomOpenAll')) {
            $('.chatroom').css('height', chatroomH);
        }

        if ($('.btn_fixed.on').length > 0) {
            $('.gameDetail_scroll').addClass('scroll_off');
            $('.gameStyle_scroll').removeClass('scroll_off');
        }
    });

    //滾球-雷達時間軸開關
    $('.btn_radarTime').click(function () {
        $(this).toggleClass('on');
        if ($('.btn_radarTime').hasClass('on')) {
            $('.runData_timeBox,.RDTB_Loading').show();
            setTimeout(function () {
                $('.RDTB_Loading').hide();
                $('.RDTB_time').show();
            }, 1500);
        } else {
            $('.runData_timeBox,.RDTB_Loading,.RDTB_time').hide();
        }
    });

    //更多玩法menu 提示字
    if (touch) {
        $('.GDView_T li').click(function () {
            $('.GDV_prompt').hide();
            $(this).find('.GDV_prompt').fadeIn(200);
        });
    } else {
        $('.GDView_T li').hoverDelay(function () {
            $(this).find('.GDV_prompt').fadeIn(200);
        }, function () {
            $(this).find('.GDV_prompt').fadeOut(200);
        });
    }

    $(document).bind('click touchmove touchend touchstart', function (e) {
        var target = $(e.target);
        if (target.closest('.GDView_T li').length == 0) {
            $('.GDV_prompt').fadeOut('fast');
        }
    });

    //釘-固定
    $('.gameStyle_scroll').addClass('scroll_off');
    $('.btn_fixed').click(function () {
        var innerY = $('.gameStyle_scroll').scrollTop();//內頁滾輪原始位置
        if ($(this).hasClass('on')) {//取消釘選
            $('.gameDetail_scroll').removeClass('scroll_off').scrollTop(innerY);
            $('.gameStyle_scroll').addClass('scroll_off');            
            $(this).removeClass('on');
            $(this).find('.GDV_prompt').text('釘選');
        } else {//釘選
            $('.gameDetail_scroll').addClass('scroll_off')
            $('.gameStyle_scroll').removeClass('scroll_off');
            $(this).addClass('on');
            $(this).find('.GDV_prompt').text('取消釘選');
        }
    });

    $('.gameDetail_scroll').scroll(function () {
        var leftP = $('.mainStruc').scrollLeft();
        var scrollP = $('.GDView').height();
        if ($(this).scrollTop() > scrollP) {
            $('.GDList_T').addClass('sticky').css('-ms-transform', 'translateX(-' + leftP + 'px)');
        } else {
            $('.GDList_T').removeClass('sticky');
            $('.GDList_T').removeAttr('style');
        }
    });

    $('.mainStruc').scroll(function () {
        var leftP = $('.mainStruc').scrollLeft();
        if ($('.GDList_T.sticky').length > 0) {
            $('.GDList_T').css('-ms-transform', 'translateX(-' + leftP + 'px)');
        } else {
            $('.GDList_T').css('-ms-transform', '');
        }
    });

    //會員暱稱/平台轉帳/客服中心/公告專區
    $('.IDInfo [class*="btn_"]').hoverDelay(function () {
        $(this).find('.IDInfo_prompt').fadeIn(150);
    }, function () {
        $(this).find('.IDInfo_prompt').fadeOut(150);
    });

    $(document).bind('click touchend', function (e) {
        var target = $(e.target);
        if (target.closest('.IDInfo [class*="btn_"]').length == 0) {
            $('.IDInfo_prompt').fadeOut(150);
        }
    });

    //贈禮點數
    if (touch) {
        $('.btn_giftPoint').click(function () {
            if ($('.GP_In').css('display') == 'none') {
                $(this).addClass('on');
                $('.GP_In').show();
                $('.GP_InBox').slideDown(200);
            } else {
                $(this).removeClass('on');
                $('.GP_In').fadeOut(200);
                $('.GP_InBox').slideUp(200);
            }
        });
    } else {
        $('.btn_giftPoint').hoverDelay(function () {
            $(this).addClass('on');
            $('.GP_In').show();
            $('.GP_InBox').slideDown(200);
        }, function () {
            $(this).removeClass('on');
            $('.GP_In').fadeOut(200);
            $('.GP_InBox').slideUp(200);
        });
    }
    $(document).bind('click touchend', function (e) {
        var target = $(e.target);
        if (target.closest('.btn_giftPoint').length == 0) {
            $('.btn_giftPoint').removeClass('on');
            $('.GP_In').fadeOut(200);
            $('.GP_InBox').slideUp(200);
        }
    });

    //規則
    $('.RB_menuList_In a').click(function () {
        $('.RB_menuList_In a').removeClass('on');
        $(this).addClass('on');
        var IDname = $(this).attr('id');
        $('.ruleBox_T,.ruleBox_In_scroll [id^="RB_"][id$="_In"]').hide();
        $('#' + IDname + '_T').show();
        $('#' + IDname + '_In').show();
        $('.ruleBox_In_scroll').scrollTop(0);
    });

    //即時比分
    $('.btn_liveScore_T').click(function () {
        $(this).toggleClass('off')
        if ($(this).hasClass('off')) {
            $(this).next('.liveScore_In').slideUp(200);
        } else {
            $(this).next('.liveScore_In').slideDown(200);
        }
    });

    //現場轉播-影音撥放
    $('.liveTv_view,.liveMc_view').click(function () {
        this.paused ? this.play() : this.pause();
        if (touch) {
            setTimeout(function () {
                $('.liveTv_console').slideUp(300);
            }, 3000);
        }
    });

    function videoStop() {
        $('.liveTv_view,.liveMc_view').each(function () {
            this.pause();
        });
        if ($('.liveTv_NG').hasClass('on')) {
            $('.liveTv_mask').removeClass('on');
        } else {
            $('.liveTv_mask').addClass('on');
        }
    }

    $('.btn_play').click(function () {
        $(this).parent('.liveTv_mask').removeClass('on');
        if ($('.liveTv_view').css('display') == 'block') {
            $('.liveTv_view').each(function () {
                this.play();
            });
        } else {
            $('.liveMc_view').each(function () {
                this.play();
            });
        }
    });

    //現場轉播-影音控制
    var videoConsole;
    function videoConsole_up() {
        videoConsole = setTimeout(function () {
            $('.LT_prompt').hide();
            $('.liveTv_console').slideUp(300);
            $('.liveTv_team').fadeOut(200);
            $('.changeMC').removeClass('on');
            clickMC_num = 0;
        }, 3000);
    }
    function videoConsole_up_stop() {
        clearTimeout(videoConsole);
    }
    if (touch) {
        $('.liveTv').on('click', function () {
            videoConsole_up_stop();
            $(this).find('.liveTv_console').slideToggle(300);
            $(this).find('.changeMC').removeClass('on');
            $(this).find('.btn_popUpTv_close').fadeToggle(200);
            $(this).find('.liveTv_team').fadeToggle(200);
            if ($('.liveTv.popUp').css('display') == 'block') {
                $('.liveTv').removeClass('on');
                $(this).addClass('on');
                $('.liveTv_view,.liveMc_view').not($(this).find('.liveTv_view,.liveMc_view')).each(function () {
                    this.pause();
                });
            }
            $(this).parent('.liveTv_mask').removeClass('on');
        }).on('click', '.btn_liveTv_unmute,.liveTv_console,.liveTv_maskB,.btn_popUpTv_close', function (e) {
            e.stopPropagation();
        });
        //全屏
        $('.liveTv.full').find('.liveTv_console,.liveTv_team').show();
        videoConsole_up();
    } else {
        $('.liveTv:not(.full)').hoverDelay(function () {
            if ($('.liveTv_maskB.on').length == 0) {
                videoConsole_up_stop();
                $(this).find('.liveTv_console').slideDown(300);
                $(this).find('.btn_popUpTv_close').fadeIn(200);
                $(this).find('.liveTv_team').fadeIn(200);                
            }
        }, function () {
                $('.LT_prompt').hide();
                $(this).find('.liveTv_console').slideUp(300);
                $(this).find('.btn_popUpTv_close').fadeOut(200);
                $(this).find('.liveTv_team').fadeOut(200);
                $('.changeMC').removeClass('on');
                clickMC_num = 0;
        });
        
        $('.liveTv:not(.full)').on('click', function () {
            if ($('.liveTv.popUp').css('display') == 'block') {
                $('.liveTv').removeClass('on');
                $(this).addClass('on');
                $('.liveTv_view,.liveMc_view').not($(this).find('.liveTv_view,.liveMc_view')).each(function () {
                    this.pause();
                });
            }
            $(this).parent('.liveTv_mask').removeClass('on');
        }).on('click', '.btn_liveTv_unmute,.liveTv_console,.liveTv_maskB,.btn_popUpTv_close', function (e) {
            e.stopPropagation();
        });
        //全屏
        $('.liveTv.full').find('.liveTv_console,.liveTv_team').show();
        videoConsole_up();
        $('.liveTv.full').mousemove(function () {
            if ($('.liveTv_maskB.on').length == 0) {
                $(this).find('.liveTv_console').slideDown(300);
                $(this).find('.btn_popUpTv_close').fadeIn(200);
                $(this).find('.liveTv_team').fadeIn(200);
            }
            videoConsole_up_stop();
            videoConsole_up();
        });
    }

    $('.btn_liveTv_unmute').click(function () {
        $(this).removeClass('on');
        $('.btn_LT_volume,.LTVB_Bar').toggleClass('off');
    });

    $('.btn_LT_volume').click(function () {
        $(this).toggleClass('off')
        if ($(this).hasClass('off')) {
            $('.LTVB_Bar').addClass('off');
            if ($('link[href*="th.css"]').length > 0) {
                $(this).find('.LT_prompt').text('ยกเลิกปิดเสียง');
            } else if ($('link[href*="vi.css"]').length > 0) {
                $(this).find('.LT_prompt').text('Bật tiếng');
            } else {
                $(this).find('.LT_prompt').text('取消靜音');
            }
        } else {
            $('.LTVB_Bar').removeClass('off');
            $('.btn_liveTv_unmute').removeClass('on');
            if ($('link[href*="th.css"]').length > 0) {
                $(this).find('.LT_prompt').text('ปิดเสียง');
            } else if ($('link[href*="vi.css"]').length > 0) {
                $(this).find('.LT_prompt').text('Tắt tiếng');
            } else {
                $(this).find('.LT_prompt').text('靜音');
            }
        }
    });

    //現場轉播-開關獨立視頻
    if (touch) {
        $('.btn_popupScreen').not('.popUp .btn_popupScreen').click(function () {            
            if ($(this).closest('.liveTv.liveMc').length > 0) {
                $('.liveTv.popUp').addClass('liveMc');
            } else {
                $('.liveTv.popUp').removeClass('liveMc');
            }
            setTimeout(function () {
                $('.GDView').find('.liveTv').removeClass('on').hide();
                $('.btn_GDV_liveTv,.btn_GDV_liveMc').removeClass('on');
                $('.liveTv.popUp').addClass('on').show();
                if ($('.gamePanel_R ').hasClass('chatroomOpenAll')) {
                    var chatroomH = $('.gameDetail').height() - $('.gameDetail_T').outerHeight() - $('.GDView').height();
                    $('.chatroom').css('height', chatroomH);
                }
            }, 300);
            $('.btn_bulletScreen').removeClass('half,all').addClass('off');
            $('.bulletArea_half,.bulletArea_all').hide();
            $('#bulletScreen').attr('class', 'bulletArea_all active');
            videoStop();
        });
    } else {
        $('.btn_popupScreen').not('.popUp .btn_popupScreen').click(function () {            
            if ($(this).closest('.liveTv.liveMc').length > 0) {
                $('.liveTv.popUp').addClass('liveMc');
            } else {
                $('.liveTv.popUp').removeClass('liveMc');
            }
            $('.GDView').find('.liveTv').removeClass('on').hide();
            $('.btn_GDV_liveTv,.btn_GDV_liveMc').removeClass('on');
            $('.liveTv.popUp').addClass('on').show();
            if ($('.gamePanel_R ').hasClass('chatroomOpenAll')) {
                var chatroomH = $('.gameDetail').height() - $('.gameDetail_T').outerHeight() - $('.GDView').height();
                $('.chatroom').css('height', chatroomH);
            }
            $('.btn_bulletScreen').removeClass('half all').addClass('off');
            $('.bulletArea_half,.bulletArea_all').hide();
            $('#bulletScreen').attr('class', 'bulletArea_all active');
            videoStop();
        });
    }

    function backTv() {
        $('.liveTv').removeClass('on');
        $('.liveTv.popUp').hide();
        if ($('.GDView_T > li.on').not('.btn_fixed').length == 0) {
            $('.GDView').find('.liveTv').removeClass('on').show();
            if ($('.btn_popUpTv_close').closest('.liveTv.popUp.liveMc').length == 0) {
                $('.btn_GDV_liveTv').addClass('on');
            } else {
                $('.btn_GDV_liveMc').addClass('on');
            }
        }
        if ($('.gamePanel_R ').hasClass('chatroomOpenAll')) {
            var chatroomH = $('.gameDetail').height() - $('.gameDetail_T').outerHeight() - $('.GDView').height();
            $('.chatroom').css('height', chatroomH);
        }
    }
    $('.popUp .btn_popupScreen').click(function () {        
        if (touch) {
            setTimeout(function () {
                backTv();
            }, 300);
        } else {
            backTv();
        }
        videoStop();
    });
    
    $('.btn_popUpTv_close').on('click touchend', function (e) {
        e.preventDefault();
        backTv();
        videoStop();
    });

    //現場轉播-按鈕氣泡框
    if (touch) {
        $('.LT_line [class*="btn_"],.btn_LT_volume').not('.btn_changeMC').click(function () {
            $('.LT_prompt').hide();
            $(this).find('.LT_prompt').fadeIn(200);
            $('.changeMC').removeClass('on');
            clickMC_num = 0;
        });

        var clickMC_num = 0;
        $('.btn_changeMC').click(function () {
            if (clickMC_num == 0) {
                $('.LT_prompt').hide();
                $(this).siblings('.LT_prompt').fadeIn(200);
                clickMC_num = 1;
            } else if (clickMC_num == 1) {
                $('.LT_prompt').finish().fadeOut(200);
                $('.changeMC').addClass('on');
            } else {
                $('.changeMC').removeClass('on');
                clickMC_num = 0;
            }
        });

        $('.changeMC_list li').click(function () {
            let changeMCBox = $(this).parents('.changeMC');
            $(this).addClass('on').siblings('li').removeClass('on');
            setTimeout(function () {
                changeMCBox.removeClass('on');
                clickMC_num = 0;
            }, 100);            
        });

        $('.btn_bulletScreen').click(function () {
            bulletMcStatus();
            if ($(this).hasClass('off')) {
                $(this).removeClass('off').addClass('half');
                bulletPopShow('half');
            }else if ($(this).hasClass('half')) {
                $(this).removeClass('half').addClass('all');
                bulletPopShow('all');
            }else if ($(this).hasClass('all')) {
                $(this).removeClass('all').addClass('off');                
                bulletPopShow('off');
            }
        })
        $('.btn_blockgift').click(function () {            
            $(this).toggleClass('off');
            if ($(this).hasClass('off')) {
                $(this).find('.LT_prompt').text('開啟贈禮動畫');
                $(this).closest('.liveTv').find('.livePopup').text('屏蔽贈禮動畫').finish().fadeIn(800).delay(800).fadeOut(800);
            } else {
                $(this).find('.LT_prompt').text('屏蔽贈禮動畫');
                $(this).closest('.liveTv').find('.livePopup').text('開啟贈禮動畫').finish().fadeIn(800).delay(800).fadeOut(800);
            }
        });
        $('.liveTv:not(.full)').find('.btn_fullScreen').click(function () {
            if ($(this).closest('.liveTv.liveMc').length > 0) {
                setTimeout(function () {
                    window.open('videoFullScreen_MC.html');
                }, 300);
            } else {
                setTimeout(function () {
                    window.open('videoFullScreen.html');
                }, 300);
            }
            videoStop();
        });
        $('.liveTv.full').find('.btn_fullScreen').click(function () {
            setTimeout(function () {
                window.close();
            }, 300);
        });
    } else {
        $('.LT_line [class*="btn_"],.btn_LT_volume').not('.btn_changeMC').hoverDelay(function () {
            $(this).find('.LT_prompt').fadeIn(200);
        }, function () {
            $(this).find('.LT_prompt').fadeOut(200);
        });

        $('.btn_changeMC').hoverDelay(function () {
            if ($(this).parent('.changeMC').hasClass('on') == false) {
                $(this).siblings('.LT_prompt').fadeIn(200);
            }
        }, function () {
            $(this).siblings('.LT_prompt').fadeOut(200);
        });

        $('.btn_changeMC').on('click', function () {
            $(this).parent('.changeMC').toggleClass('on').find('.LT_prompt').hide();
        });

        $('.changeMC_list li').click(function () {
            let changeMCBox = $('.changeMC_list li').parents('.changeMC')
            $(this).addClass('on').siblings('li').removeClass('on');
            setTimeout(function () {
                changeMCBox.removeClass('on');
            }, 100);
        });

        $('.btn_bulletScreen').click(function () {
            bulletMcStatus();
            if ($(this).hasClass('off')) {
                $(this).removeClass('off').addClass('half');                
                bulletPopShow('half');
            }else if ($(this).hasClass('half')) {
                $(this).removeClass('half').addClass('all');                
                bulletPopShow('all');
            }else if ($(this).hasClass('all')) {
                $(this).removeClass('all').addClass('off');
                bulletPopShow('off');
            }
        })
        $('.btn_blockgift').click(function () {
            $('.btn_blockgift').toggleClass('off');
            if ($('.btn_blockgift').hasClass('off')) {
                $('.btn_blockgift').find('.LT_prompt').text('開啟贈禮動畫');
                $(this).closest('.liveTv').find('.livePopup').text('屏蔽贈禮動畫').finish().fadeIn(800).delay(800).fadeOut(800);
            } else {
                $('.btn_blockgift').find('.LT_prompt').text('屏蔽贈禮動畫');
                $(this).closest('.liveTv').find('.livePopup').text('開啟贈禮動畫').finish().fadeIn(800).delay(800).fadeOut(800);
            }
        });
        $('.liveTv:not(.full)').find('.btn_fullScreen').click(function () {
            if ($(this).closest('.liveTv.liveMc').length > 0) {
                window.open('videoFullScreen_MC.html');
            } else {
                window.open('videoFullScreen.html');
            }
            videoStop();
        });
        $('.liveTv.full').find('.btn_fullScreen').click(function () {
            window.close();
        });
    }

    $(document).bind('click touchmove touchend touchstart', function (e) {
        var target = $(e.target);
        if (target.closest('.LT_line [class*="btn_"],.btn_LT_volume').length == 0) {
            $('.LT_prompt').fadeOut('fast');
        }
    });

    //彈幕設定
    function bulletPopShow(status) {
        let pop = $('.livePopup'),
            btn_prompt = $('.btn_bulletScreen').find('.LT_prompt');
        if (status == 'half') {
            $('#bulletScreen').hide();
            setTimeout(function () {
                $('#bulletScreen').toggleClass('bulletArea_half bulletArea_all').show();
            }, 200);
            if ($('link[href*="th.css"]').length > 0) {
                pop.text('เปิดแชทหน้าจอแบบย่อ');
                btn_prompt.text('เปิดแชทหน้าจอแบบมาตรฐาน');
            } else if ($('link[href*="vi.css"]').length > 0) {
                pop.text('Mở bình luận thu gọn');
                btn_prompt.text('Mở bình luận tiêu chuẩn');
            } else if ($('link[href*="green.css"]').length > 0) {
                pop.text('开启精简弹幕');
                btn_prompt.text('开启标准弹幕');
            } else {
                pop.text('開啟精簡彈幕');
                btn_prompt.text('開啟標準彈幕');
            }
        } else if (status == 'all') {
            $('#bulletScreen').hide();
            setTimeout(function () {
                $('#bulletScreen').toggleClass('bulletArea_half bulletArea_all').show();
            }, 200);
            if ($('link[href*="th.css"]').length > 0) {
                pop.text('เปิดแชทหน้าจอแบบมาตรฐาน');
                btn_prompt.text('ปิดแชทหน้าจอ');
            } else if ($('link[href*="vi.css"]').length > 0) {
                pop.text('Mở bình luận tiêu chuẩn');
                btn_prompt.text('Tắt bình luận');
            } else if ($('link[href*="green.css"]').length > 0) {
                pop.text('开启标准弹幕');
                btn_prompt.text('关闭弹幕');
            } else {
                pop.text('開啟標準彈幕');
                btn_prompt.text('關閉彈幕');
            }
        } else if (status == 'off') {
            $('[class *= "bulletArea_"]').hide();
            if ($('link[href*="th.css"]').length > 0) {
                pop.text('ปิดแชทหน้าจอ');
                btn_prompt.text('เปิดแชทหน้าจอแบบย่อ');
            } else if ($('link[href*="vi.css"]').length > 0) {
                pop.text('Tắt bình luận');
                btn_prompt.text('Mở bình luận thu gọn');
            } else if ($('link[href*="green.css"]').length > 0) {
                pop.text('关闭弹幕');
                btn_prompt.text('开启精简弹幕');
            } else {
                pop.text('關閉彈幕');
                btn_prompt.text('開啟精簡彈幕');
            }
        }
        pop.finish().fadeIn(800).delay(800).fadeOut(800);
        return pop;
    }
    function bulletMcStatus() {
        if ($('.liveMc.popUp,.liveMc.full').css('display') == 'block') {
            $('.bulletTxt.mc').show();
        } else {
            $('.bulletTxt.mc').hide();
        }
    }

    //數據-判斷是drag拖曳還是click點擊
    $('.gameData .item').on('mousedown', function (evt) {
        $('.gameData .item').on('mouseup mousemove', function handler(evt) {
            if (evt.type === 'mouseup') {
                // click
                $('.GD_moreDate').show();
            }
            $('.gameData .item').off('mouseup mousemove', handler);
        });
    });

    $('.GD_moreDate').on('click', function () {
        $('.GD_moreDate').hide();
    });
        
    //聊天室維護中(尚未展開前)
    if ($('.CRB_keyIn_Text_NG').css('display') == 'block') {
        $('.chatroom').addClass('off');
        $('.chatroom_btm').addClass('off');
        $('.btn_chatroomOpen').css('cursor', 'default');
    }

    //聊天室禁言
    if ($('.CRB_keyIn_Text_stop').css('display') == '-webkit-box' || $('.CRB_keyIn_Text_stop').css('display') == 'block') {
        $('.chatroom_btm').addClass('off');
    }

    $('.CRB_keyIn_Text_stop').click(function () {
        if ($(this).next('.CRB_keyIn_Text_stop').length > 0) {
            $(this).hide().next('.CRB_keyIn_Text_stop').show();
        } else {
            $(this).hide();
            $('.CRB_keyIn_Text_stop:first').show();
        }
    });

    //聊天室連結中
    if ($('.CRB_keyIn_Text_loading').css('display') == 'block') {
        $('.chatroom_btm').addClass('off');
        $('.CR_loading').show();
    }

    //半開聊天室
    if (touch) {
        $('.btn_chatroomOpen').on('touchstart', function () {
            if ($('.CRB_keyIn_Text_NG').css('display') == 'none') {
                $('.btn_chatroom').addClass('active');
            }
        });
    } else {        
        $('.btn_chatroomOpen').hoverDelay(function () {
            if ($('.CRB_keyIn_Text_NG').css('display') == 'none') {
                $('.btn_chatroom').addClass('active');
            }
        }, function () {
            $('.btn_chatroom').removeClass('active');
        });
    }

    $('.btn_chatroomOpen').on('click touchend', function (e) {
        e.preventDefault();
        $('.btn_chatroom').removeClass('active');
        if ($('.CRB_keyIn_Text_NG').css('display') == 'none') {
            $('.gamePanel_R').addClass('chatroomOpen');
            $('.btn_chatroom').addClass('on');
            if ($('.CRB_keyIn_Text_prompt').css('display') == 'block') {
                if ($('.btn_fixed.on').length == 1) {
                    $('.gameDetail_scroll').addClass('scroll_off');
                    $('.gameStyle_scroll').removeClass('scroll_off');
                }
                $('.CRB_keyIn_Text_prompt').hide();
                $('.CRB_keyIn_Text').show();
            } else if ($('.CRB_keyIn_Text_loading').css('display') == 'block') {
                $('[class*="talk_LV"],.talk_USER,.talk_AD,.talk_MC,.talkMsg_like,.talkMsg_gift,.btn_CR_slideDown,.chatAnnounce').hide();
            }
            if (touch) {
                $('.scrollbar-macosx > .scroll-element div.scroll-bar').css('background-color', 'transparent');
            } else {
                $('.scrollbar-macosx > .scroll-element div.scroll-bar').css('background-color', '');
            }
        }
    });

    //全開/縮小聊天室+按鈕提示
    if ($('.gameStyle_Table').length == 0) {
        $('.btn_CR_openAll').addClass('off');
    }
    if (touch) {
        $('.btn_CR_openAll').click(function () {
            var chatroomH = $('.gameDetail').height() - $('.gameDetail_T').outerHeight() - $('.GDView').height();
            if ($(this).hasClass('on') && $(this).hasClass('off')) {
                if ($(this).find('.CR_openAll_text').css('display') == 'none') {
                    $(this).find('.CR_openAll_text').show();
                    $(this).find('.CR_openAll_textBox').slideDown(200).delay(200);
                } else {
                    $(this).find('.CR_openAll_text').fadeOut(200);
                    $(this).find('.CR_openAll_textBox').slideUp(200);
                }
            } else if ($(this).hasClass('on')) {
                $(this).removeClass('on');
                $('.gamePanel_R').removeClass('chatroomOpenAll').addClass('chatroomOpen');
                $('.btn_fixed').show();
                if ($('.btn_fixed.on').length == 0) {
                    $('.gameDetail_scroll').removeClass('scroll_off');
                }
                $('.GDList').parent('ul').show();
                $(this).closest('.chatroom').removeAttr('style');
            } else {
                $(this).addClass('on');
                $('.gamePanel_R').removeClass('chatroomOpen').addClass('chatroomOpenAll');
                if ($('.btn_fixed.on').length == 0) {
                    $('.gameDetail_scroll').addClass('scroll_off');
                }
                $('.btn_fixed').hide();
                $('.GDList').parent('ul').hide();
                $('.chatroom').css('height', chatroomH);
            }
        });
    } else {
        $('.btn_CR_openAll').click(function () {
            var chatroomH = $('.gameDetail').height() - $('.gameDetail_T').outerHeight() - $('.GDView').height();
            if ($(this).hasClass('on') && $(this).hasClass('off')) {
            } else if ($(this).hasClass('on')) {
                $(this).removeClass('on');
                $('.gamePanel_R').removeClass('chatroomOpenAll').addClass('chatroomOpen');
                $('.btn_fixed').show();
                if ($('.btn_fixed.on').length == 0) {
                    $('.gameDetail_scroll').removeClass('scroll_off');
                }
                $('.GDList').parent('ul').show();
                $(this).closest('.chatroom').removeAttr('style');
            } else {
                $(this).addClass('on');
                $('.gamePanel_R').removeClass('chatroomOpen').addClass('chatroomOpenAll');
                if ($('.btn_fixed.on').length == 0) {
                    $('.gameDetail_scroll').addClass('scroll_off');
                }
                $('.btn_fixed').hide();
                $('.GDList').parent('ul').hide();
                $('.chatroom').css('height', chatroomH);
            }
        });
        $('.btn_CR_openAll.off').hoverDelay(function () {
            if ($(this).hasClass('on')) {
                $('.CR_openAll_text').show();
                $('.CR_openAll_textBox').slideDown(200).delay(200);
            }
        }, function () {
            $('.CR_openAll_text').fadeOut(200);
            $('.CR_openAll_textBox').slideUp(200);
        });
    }
    $(document).bind('click touchend', function (e) {
        var target = $(e.target);
        if (target.closest('.btn_CR_openAll.off').length == 0) {
            $('.CR_openAll_text').fadeOut(200);
            $('.CR_openAll_textBox').slideUp(200);
        }
    });

    //關閉聊天室(X)
    $('.btn_chatroom,.btn_CR_close').on('click touchend', function (e) {
        e.preventDefault();
        $('.gamePanel_R').removeClass('chatroomOpen chatroomOpenAll');
        $('.btn_chatroom').removeClass('on');
        $('.btn_fixed').show();
        $('.GDList').parent('ul').show();
        $('.chatroom').removeAttr('style');
        $('.btn_CR_openAll').removeClass('on');
        //判斷btn_fixed是否有啟動
        if ($('.btn_fixed.on').length > 0) {
            $('.gameDetail_scroll').addClass('scroll_off');
            $('.gameStyle_scroll').removeClass('scroll_off');
        } else {
            $('.gameDetail_scroll').removeClass('scroll_off');
            $('.gameStyle_scroll').addClass('scroll_off');
        }
        //正常關閉聊天室
        if ($('.CRB_keyIn_Text').css('display') == 'block') {
            $('.CRB_keyIn_Text').hide();
            $('.CRB_keyIn_Text_prompt').show();
        }
        //維護中時關閉聊天室
        if ($('.chatroom').hasClass('off')) {
            $('.chatroom_btm').addClass('off');
            $('.CRB_keyIn_Text_prompt').hide();
            $('.CRB_keyIn_Text_NG').show();
            $('.btn_chatroomOpen').css('cursor', 'default');
            $('.btn_CRB_submit').removeClass('on');
        }
    });

    //聊天室-屏蔽/解除
    if (touch) {
        $('.btn_CR_level,.btn_CR_blockade,.btn_CR_remove').click(function () {
            if ($(this).closest('[class*="talk_LV"]').find('.btn_CR_blockade').css('display') == 'none' && $(this).closest('[class*="talk_LV"]').find('.btn_CR_remove').css('display') == 'none'){
                $('.btn_CR_remove,.btn_CR_blockade').hide();
                if ($(this).closest('[class*="talk_LV"]').find('.btn_CR_level').hasClass('off')) {
                    $(this).closest('[class*="talk_LV"]').find('.btn_CR_remove').show();
                } else {
                    $(this).closest('[class*="talk_LV"]').find('.btn_CR_blockade').show();
                }
            } else if ($(this).closest('[class*="talk_LV"]').find('.btn_CR_remove').css('display') == 'block') {
                $(this).closest('[class*="talk_LV"]').find('.btn_CR_level').removeClass('off');
                $(this).closest('[class*="talk_LV"]').find('.btn_CR_remove').hide();
                $('.CR_removePrompt').stop().fadeIn(800).delay(800).fadeOut(800);
            } else {
                $(this).closest('[class*="talk_LV"]').find('.btn_CR_level').toggleClass('off');
                $(this).closest('[class*="talk_LV"]').find('.btn_CR_remove,.btn_CR_blockade').hide();
            }
        });
        $(document).bind('click touchend', function (e) {
            var target = $(e.target);
            if (target.closest('.btn_CR_level,.btn_CR_blockade,.btn_CR_remove').length == 0) {
                $('.btn_CR_remove,.btn_CR_blockade').hide();
            }
        });

    } else {
        $('.btn_CR_level,.btn_CR_blockade,.btn_CR_remove').hover(function () {
            if ($(this).closest('[class*="talk_LV"]').find('.btn_CR_level').hasClass('off')) {
                $(this).closest('[class*="talk_LV"]').find('.btn_CR_remove').show();
            } else {
                $(this).closest('[class*="talk_LV"]').find('.btn_CR_blockade').show();
            }
        }, function () {
            $('.btn_CR_remove,.btn_CR_blockade').hide();
        });

        $('.btn_CR_level,.btn_CR_blockade,.btn_CR_remove').click(function () {
            $(this).closest('[class*="talk_LV"]').find('.btn_CR_level').toggleClass('off');
            $(this).closest('[class*="talk_LV"]').find('.btn_CR_remove').toggle();
            $(this).closest('[class*="talk_LV"]').find('.btn_CR_blockade').toggle();
            if ($(this).closest('[class*="talk_LV"]').find('.btn_CR_blockade').css('display') == 'block') {
                $('.CR_removePrompt').stop().fadeIn(800).delay(800).fadeOut(800);
            }
        });
    }

    //貢獻榜_排名
    if (touch) {        
        $('[class*="icon_ranking"]').click(function () {
            $('[class*="icon_ranking"] span').hide();
            $(this).find('span').show().delay(1500).fadeOut(400);
        });
        $(document).bind('click touchend', function (e) {
            var target = $(e.target);
            if (target.closest('[class*="icon_ranking"]').length == 0) {
                $('[class*="icon_ranking"] span').hide();
            }
        });
    }

    //@暱稱
    $('[class*="talk_LV"],.talk_MC').find('.talk_name').click(function () {
        let name = '@' + $(this).text();
        $('.CRB_keyIn_Text').append('<input class="takeName" type="button" value="' + name + '">');
        $('.CRB_keyIn_Text').scrollLeft(99999999);/*讓捲軸靠右*/
        $('.btn_CRB_submit').addClass('on');
    });

    //聊天室(滑到最底)
    $('.chatroom_scroll').scrollbar({
        "onScroll": function (y, x) {
            if (y.scroll >= y.maxScroll - 20) {
                $('.btn_CR_slideDown').stop(false, true).fadeOut(200);
            } else {
                $('.btn_CR_slideDown').stop(false, true).fadeIn(200);
            }
        }
    });
    $('.btn_CR_slideDown').click(function () {
        var chatroomScroll = $('.chatroom_scroll .scroll-content').prop('scrollHeight'),/*捲軸內容高*/
            chatroomH = $('.chatroom_scroll').outerHeight(),/*視窗高*/
            maxCRScrollH = chatroomScroll - chatroomH;/*捲軸可捲動的範圍高*/
        $('.chatroom_scroll').animate({
            scrollTop: maxCRScrollH
        }, 300);
    });
    $(window).on('mousewheel', function () {
        $('.chatroom_scroll').stop(false, true);
    });

    //贈禮按鈕
    $('.btn_gift').not('.off').on('click touchend', function (e) {
        e.preventDefault();
        $(this).toggleClass('on');
        if ($(this).hasClass('on')) {
            $('.giftBox').show();
        } else {
            $('.giftBox').hide();
        }
    });

    $('.btn_giftBox_close').click( function () {
        $('.giftBox').hide();
        $('.btn_gift').removeClass('on')
    });

    //贈禮列表
    var GL_ID, GL_iframeSrc, GL_img, GL_name, GL_point, GL_delay;    
    $('.giftList_scroll li').click(function () {
        GL_ID = $(this).attr('id');
        if (GL_ID.indexOf('_VN') >= 0) {
            GL_iframeSrc = 'ANI/vn/'
        } else if (GL_ID.indexOf('_TH') >= 0) {
            GL_iframeSrc = 'ANI/th/'
        } else {
            GL_iframeSrc = 'ANI/tw/'
        }
        GL_img = $(this).find('img').attr('src');
        GL_name = $(this).find('.giftList_name').text();
        if (touch) {
        }
        GL_point = $(this).find('.giftList_point').text();        
        $('.GP_info img').attr('src', GL_img);
        $('.GP_infoName').text(GL_name);
        $('.GP_infoPoint').text(GL_point);
        $('.GP_num input').val(1);
        $('.GP_num .btn_minus').addClass('off');
        $('#giftPopup_step02').hide().prev('#giftPopup_step01').show();
        $('.giftPopup').css('display','flex');
        $('.giftBox_footer').addClass('bg_black');

        switch (GL_ID) {
            case 'ANI01':
            case 'ANI19':
            case 'ANI23':
            case 'ANI27':
            case 'ANI31':
            case 'ANI35':
            case 'ANI_TH01':
            case 'ANI_VN15':
            case 'ANI_VN19':
            case 'ANI_VN23':
            case 'ANI_VN27':
            case 'ANI_VN31':
            case 'ANI_VN35':
                GL_delay = 1350;
                break;
            case 'ANI02':
            case 'ANI20':
            case 'ANI24':
            case 'ANI28':
            case 'ANI32':
            case 'ANI36':
            case 'ANI_VN02':
            case 'ANI_TH02':
            case 'ANI_VN16':
            case 'ANI_VN20':
            case 'ANI_VN24':
            case 'ANI_VN28':
            case 'ANI_VN32':
            case 'ANI_VN36':
                GL_delay = 1550;
                break;
            case 'ANI03':
            case 'ANI11':
            case 'ANI15':
            case 'ANI_VN03':
                GL_delay = 2100;
                break;
            case 'ANI04':
            case 'ANI_VN04':
                GL_delay = 3880;
                break;
            case 'ANI05':
            case 'ANI12':
                GL_delay = 4450;
                break;
            case 'ANI06':
            case 'ANI_VN06':
                GL_delay = 4800;
                break;
            case 'ANI07':
                GL_delay = 5500;
                break;
            case 'ANI08':
            case 'ANI17':
            case 'ANI_VN08':
                GL_delay = 6150;
                break;
            case 'ANI09':
            case 'ANI13':
            case 'ANI21':
            case 'ANI25':
            case 'ANI29':
            case 'ANI33':
            case 'ANI37':
            case 'ANI_VN09':
            case 'ANI_TH03':
            case 'ANI_VN17':
            case 'ANI_VN21':
            case 'ANI_VN25':
            case 'ANI_VN29':
            case 'ANI_VN33':
            case 'ANI_VN37':
                GL_delay = 6400;
                break;
            case 'ANI10':
            case 'ANI14':
            case 'ANI_VN10':
                GL_delay = 7170;
                break;
            case 'ANI16':
                GL_delay = 4110;
                break;
            case 'ANI18':
                GL_delay = 8000;
                break;
            case 'ANI22':
            case 'ANI26':
            case 'ANI30':
            case 'ANI34':
            case 'ANI38':
            case 'ANI_TH04':
            case 'ANI_VN22':
            case 'ANI_VN26':
            case 'ANI_VN30':
            case 'ANI_VN34':
            case 'ANI_VN38':
                GL_delay = 7300;
                break;
            case 'ANI_VN18':
                GL_delay = 8100;
                break;
            //
            case 'ANI_VN01':
                GL_delay = 1100;
                break;
            case 'ANI_VN05':
                GL_delay = 4500;
                break;
            case 'ANI_VN07':
                GL_delay = 5550;
                break;
            case 'ANI_VN11':
                GL_delay = 1380;
                break;
            case 'ANI_VN12':
                GL_delay = 1500;
                break;
            case 'ANI_VN13':
                GL_delay = 6200;
                break;
            case 'ANI_VN14':
                GL_delay = 7220;
                break;
        }

        //禮品名稱(氣泡)touch裝置
        $('.giftList_longT').hide();
        if (touch && $(this).find('.giftList_name')[0].getBoundingClientRect().width.toFixed(2) >= $(this).find('.giftList_point')[0].getBoundingClientRect().width.toFixed(2)) {
            $(this).find('.giftList_longT').text(GL_name).fadeIn(200);
        }
    });

    //禮品名稱(氣泡)PC裝置
    $('.giftList_scroll li').hoverDelay(function () {
        let GL_name = $(this).find('.giftList_name').text();
        if ($(this).find('.giftList_name')[0].getBoundingClientRect().width.toFixed(2) >= $(this).find('.giftList_point')[0].getBoundingClientRect().width.toFixed(2)) {
            $(this).find('.giftList_longT').text(GL_name).fadeIn(200);
        }
    }, function () {
        $(this).find('.giftList_longT').fadeOut(200);
    });

    $(document).bind('click touchmove touchend touchstart', function (e) {
        var target = $(e.target);
        if (target.closest('.giftList_scroll li').length == 0) {
            $('.giftList_longT').fadeOut('fast');
        }
    });

    //贈禮列表(彈跳訊息)
    $('.btn_GP_close').click(function () {
        $('.giftPopup').hide();
        $('.giftBox_footer').removeClass('bg_black');
        GP_num = 1; //關閉贈禮視窗，禮品基礎值恢復1
        $('.GP_num .btn_plus').removeClass('off'); //關閉贈禮視窗，+符號恢復可按狀態
    });

    var GP_num = $('.GP_num input').val();
    function GP_numIf() {
        if (GP_num <= 1) {
            $('.GP_num .btn_minus').addClass('off');
        } else {
            $('.GP_num .btn_minus').removeClass('off');
        }

        if (GP_num >= 99) {
            GP_num = 99;
            $('.GP_num input').val(99);
            $('.GP_num .btn_plus').addClass('off');
        } else {
            $('.GP_num .btn_plus').removeClass('off');
        }
    };
    function GP_sum() {
        let GP_pointNum = GL_point.replace(/,/g, ""), //去除贈禮點數,號
            GP_calc = GP_pointNum * GP_num,//計算
            GP_sumNum = GP_calc.toString().replace(/(-?\d+)(\d{3})/, "$1,$2"); // 將計算出來的值補回,號
        $('.GP_infoPoint').text(GP_sumNum);
    };
    $('.GP_num .btn_minus').click(function () {
        if ($(this).hasClass('off') != true) {
            $('.GP_num input').val(--GP_num);
        }
        GP_numIf();
        GP_sum();
    });
    $('.GP_num .btn_plus').click(function () { 
        if ($(this).hasClass('off') != true) {
            $('.GP_num input').val(++GP_num);
        }
        GP_numIf();
        GP_sum();
    });
    $('.GP_num input').keyup(function () {
        GP_num = $(this).val();
        GP_numIf();
        GP_sum();
    });

    //贈禮動畫相關設定
    var giftAT, giftAT_text;
    function giftAT_play() {
        giftAT = setTimeout(function () {
            $('.giftATBox').css('display', 'flex');
            $('.giftAT').attr('src', GL_iframeSrc + GL_ID + '.html').css('visibility', 'hidden');/*iframe load完成前先隱藏(解決IOS閃白)*/
            $('.giftAT').load(function () {
                $(this).removeAttr('style');/*iframe load完成後移除隱藏*/
                $('.giftAT_text').addClass('on');
                $('.GAT_giftName').html(GL_name);
            });
        }, 1400);
        giftAT_text = setTimeout(function () {
            $('.giftAT_text').removeClass('on');
            $('.giftATBox').hide();
        }, 1400 + GL_delay);
    }
    function giftAT_stop() {
        clearTimeout(giftAT);
        clearTimeout(giftAT_text);
    }

    $('.btn_GPSend').click(function () {
        if ($('#giftPopup_step01').css('display') == 'block') {
            $('#giftPopup_step01').hide().next('#giftPopup_step02').show();
        } else {
            $('.giftPopup').hide();
            $('.giftBox_footer').removeClass('bg_black');
            $('.giftResult').fadeIn(200).delay(1000).fadeOut(200);
            giftAT_stop();
            giftAT_play();
        }
    });

    //贈禮點數(提示氣泡)
    if (touch) {
        $('.GBF_IDInfo > div').click(function () {
            $('.GBF_prompt').hide();
            $(this).find('.GBF_prompt').fadeIn(200);
        });
    } else {
        $('.GBF_IDInfo > div').hoverDelay(function () {
            $(this).find('.GBF_prompt').fadeIn(200);
        }, function () {
            $(this).find('.GBF_prompt').fadeOut(200);
        });
    }

    $(document).bind('click touchmove touchend touchstart', function (e) {
        var target = $(e.target);
        if (target.closest('.GBF_IDInfo > div').length == 0) {
            $('.GBF_prompt').fadeOut('fast');
        }
    });

    //快捷訊息
    $('.btn_quickMsg').not('.chatroom_btm.off .btn_quickMsg').on('click touchend', function (e) {
        e.preventDefault();
        $(this).toggleClass('on');
        if ($(this).hasClass('on')) {
            $('.quickMsg_scroll').show();
        } else {
            $('.quickMsg_scroll').hide();
        }
        if ($('.chatroomMc').length > 0) {
            $('.btn_chatroom').addClass('displayNone');
        }
    });

    //快捷訊息-判斷是drag拖曳還是click點擊
    if (touch) {
        $('.quickMsg_scroll li').on('mousedown', function (evt) {
            $('.quickMsg_scroll li').on('mouseup mousemove', function handler(evt) {
                if (evt.type === 'mouseup') {
                    // click
                    $('.btn_quickMsg').removeClass('on');
                    $('.quickMsg_scroll').hide();
                }
                $('.quickMsg_scroll li').off('mouseup mousemove', handler);
            });
        });
    } else {
        $('.quickMsg_scroll li').click(function () {
            $('.btn_quickMsg').removeClass('on');
            $('.quickMsg_scroll').hide();
        });
    }

    $(document).bind('click touchend', function (e) {
        var target = $(e.target);
        if (target.closest('.btn_quickMsg,.quickMsg_scroll').length == 0) {
            $('.btn_quickMsg').removeClass('on');
            $('.quickMsg_scroll').hide();
        }
    });

    //聊天室輸入框
    if (touch) {
        $('.CRB_keyIn_Box').on('click touchend', function () {
            if ($('.chatroom_btm.off').length == 0) {
                $('.CRB_keyIn_Text').focus();
                if ($('.chatroomMc').length > 0) {
                    $('.btn_chatroom').addClass('displayNone');
                }
            }
        }).on('click touchend', '.btn_showForm,.btn_faceIcon', function (e) {
            e.stopPropagation();
        });

        //避免手機focus動作被取消
        $('.chatroom_btm').on('touchstart', function (e) {
            e.preventDefault();
        }).on('touchstart', '.CRB_keyIn_Box,.btn_faceIcon,.faceIconBox,.CRB_keyIn_Box .takeName', function (e) {
            e.stopPropagation();
        });

    } else {
        $('.CRB_keyIn_Box').on('click', function () {
            if ($('.chatroom_btm.off').length == 0) {
                $('.CRB_keyIn_Text').focus();
                if ($('.chatroomMc').length > 0) {
                    $('.btn_chatroom').addClass('displayNone');
                }
            }
        }).on('click', '.btn_showForm', function (e) {
            e.stopPropagation();
        });
    }
    $(document).bind('click touchend', function (e) {
        var target = $(e.target);
        if (target.closest('.chatroom_btm,.showFormBox,.giftBox,.quickMsg_scroll').length == 0) {
            $('.CRB_keyIn_Text').blur();
            $('.btn_chatroom').removeClass('displayNone');
        }
    });

    //聊天室faceIcon
    $('.btn_faceIcon').not('.chatroom_btm.off .btn_faceIcon').on('click touchend', function (e) {
        e.preventDefault();
        $(this).toggleClass('on');
        $('.faceIconBox').toggle();        
    });

    $('.faceIconBox_scroll > ul').hide();
    $('.faceIconBox_scroll > ul:first').show();
    $('.faceList > li').removeClass('on');
    $('.faceList > li:first').addClass('on');

    $('.faceList > li').click(function () {
        $('.faceIconBox_scroll > ul').hide();
        $('.faceList > li').removeClass('on');
        $(this).addClass('on');
        $('.faceIconBox_scroll').scrollTop(0);
        switch (true) {
            case $(this).hasClass('btn_faceIcon_emoji'):
                $('#faceIcon_emoji').show();
                break;
            case $(this).hasClass('btn_sticker_soccer'):
                $('#sticker_soccer').show()
                break;
            case $(this).hasClass('btn_sticker_soccer2'):
                $('#sticker_soccer2').show()
                break;
            case $(this).hasClass('btn_sticker_baseball'):
                $('#sticker_baseball').show();
                break;
            case $(this).hasClass('btn_sticker_baseball2'):
                $('#sticker_baseball2').show()
                break;
            case $(this).hasClass('btn_sticker_basketball'):
                $('#sticker_basketball').show()
                break;
            case $(this).hasClass('btn_sticker_mixSports'):
                $('#sticker_mixSports').show();
                break;
            case $(this).hasClass('btn_sticker_browndog'):
                $('#sticker_browndog').show();
                break;
            case $(this).hasClass('btn_sticker_boy'):
                $('#sticker_boy').show();
                break;
            case $(this).hasClass('btn_sticker_oldman'):
                $('#sticker_oldman').show();
                break;
            case $(this).hasClass('btn_sticker_dog'):
                $('#sticker_dog').show();
                break;
            case $(this).hasClass('btn_sticker_newyear'):
                $('#sticker_newyear').show();
                break;
            case $(this).hasClass('btn_sticker_xmas'):
                $('#sticker_xmas').show();
                break;
            case $(this).hasClass('btn_sticker_lovingcat'):
                $('#sticker_lovingcat').show();
                break;
            case $(this).hasClass('btn_sticker_lovingrabbit'):
                $('#sticker_lovingrabbit').show();
                break;
            case $(this).hasClass('btn_sticker_halloween'):
                $('#sticker_halloween').show();
                break;
        }
    });   

    //聊天室faceIcon-左右切換
    $('.btn_faceList_next').click(function () {
        let face_scroll = $('.faceList').scrollLeft();
        $('.btn_faceList_back').addClass('on');        
        if ($('.btn_faceList_back').hasClass('on')) {
            $('.faceList').scrollLeft(face_scroll + 350);
        } else {
            $('.faceList').scrollLeft(face_scroll + 300);
        }
    });

    $('.btn_faceList_back').click(function () {
        let face_scroll = $('.faceList').scrollLeft();
        if (face_scroll < 351) {
            $('.btn_faceList_back').removeClass('on');
            $('.faceList').scrollLeft(0);
        } else {
            $('.faceList').scrollLeft(face_scroll - 300);
        }
    });

    //判斷是drag拖曳還是click點擊
    $('.faceIconBox_scroll li').on('mousedown', function (evt) {
        $('.faceIconBox_scroll li').on('mouseup mousemove', function handler(evt) {
            if (evt.type === 'mouseup') {
                // click
                $('.btn_faceIcon').removeClass('on');
                setTimeout(function () {
                    $('.faceIconBox').hide();
                }, 50);
            }
            $('.faceIconBox_scroll li').off('mouseup mousemove', handler);
        });
    });

    $(document).bind('click touchend', function (e) {
        var target = $(e.target);
        if (target.closest('.btn_faceIcon,.faceIconBox').length == 0) {
            $('.btn_faceIcon').removeClass('on');
            $('.faceIconBox').hide();
        }
    });

    //聊天室秀單
    $('.btn_showForm').not('.chatroom_btm.off .btn_showForm').on('click touchend', function (e) {
        e.preventDefault();
        $('.btn_faceIcon,.btn_quickMsg').removeClass('on');
        $('.faceIconBox,.quickMsg_scroll').hide();
        $(this).addClass('on');
        $('.showFormBox').show();        
        $('.showFormBox_scroll.scrollbar-macosx').scrollbar('destroy');//移除卷軸
        $('.SFBIn_prompt').show();
        $('.SFBIn_list,.btn_showForm_send').hide();
    });

    $('.showFormBox_scroll').click(function () {
        if ($('.SFBIn_prompt').length > 0) {
            $('.showFormBox_scroll.scrollbar-macosx').scrollbar();//恢復卷軸
            $('.SFBIn_prompt').hide();
            $('.SFBIn_list').show();
        }
        if ($('.SFBIn_list').hasClass('on')) {
            $('.btn_showForm_send').show();
        }
    });

    $('.btn_closeSFB,.btn_showForm_send').on('click touchend', function (e) {
        e.preventDefault();
        $('.btn_showForm').removeClass('on');
        $('.showFormBox').hide();
    });

    //聊天室秀單-判斷是drag拖曳還是click點擊
    if (touch) {
        $('.SFBIn_list').on('mousedown', function (evt) {
            $('.SFBIn_list').on('mouseup mousemove', function handler(evt) {
                if (evt.type === 'mouseup') {
                    // click
                    $(this).toggleClass('on');
                    if ($('.SFBIn_list').hasClass('on')) {
                        $('.btn_showForm_send').addClass('on');
                    } else {
                        $('.btn_showForm_send').removeClass('on');
                    }
                }
                $('.SFBIn_list').off('mouseup mousemove', handler);
            });
        });
    } else {
        $('.SFBIn_list').click(function () {
            $(this).toggleClass('on');
            if ($('.SFBIn_list').hasClass('on')) {
                $('.btn_showForm_send').addClass('on');
            } else {
                $('.btn_showForm_send').removeClass('on');
            }
        });
    }

    $(document).bind('click touchend', function (e) {
        var target = $(e.target);
        if (target.closest('.showFormBox').length == 0) {
            $('.btn_showForm').removeClass('on');
            $('.showFormBox').hide();
        }
    });

    //聊天室-底部(提示氣泡)
    var openCR_prompt, closeCR_prompt, openCR_Msg, closeCR_Msg, openCR_faceIcon, closeCR_faceIcon;
    if ($('link[href*="green.css"]').length > 0) {
        openCR_prompt = '開啟聊天室';
        closeCR_prompt = '關閉聊天室';
        openCR_Msg = '快捷訊息';
        closeCR_Msg = '關閉快捷訊息';
        openCR_faceIcon = '貼圖';
        closeCR_faceIcon = '關閉貼圖';
    } else {
        openCR_prompt = '開啟聊天室';
        closeCR_prompt = '關閉聊天室';
        openCR_Msg = '快捷訊息';
        closeCR_Msg = '關閉快捷訊息';
        openCR_faceIcon = '貼圖';
        closeCR_faceIcon = '關閉貼圖';
    }

    function textChange(btn, openText, closeText) {
        if (btn.hasClass('on')) {
            btn.find('.CRB_in_prompt').text(closeText);
        } else {
            btn.find('.CRB_in_prompt').text(openText);
        }
    }

    if (touch) {
        $('.btn_chatroomOpen,.btn_chatroom').on('click touchend', function () {
            $('.CRB_in_prompt').hide();
            textChange($('.btn_chatroom'), openCR_prompt, closeCR_prompt);
            $('.btn_chatroom').find('.CRB_in_prompt').stop().fadeIn(200);
        });
        $('.CRB_in_prompt').parent().not('.btn_chatroom').on('click touchend', function () {
            $('.CRB_in_prompt').hide();
            switch (true) {
                case $(this).is('.btn_quickMsg'):
                    textChange($('.btn_quickMsg'), openCR_Msg, closeCR_Msg);
                    break;
                case $(this).is('.btn_faceIcon'):
                    textChange($('.btn_faceIcon'), openCR_faceIcon, closeCR_faceIcon);
                    break;
            }
            $(this).find('.CRB_in_prompt').stop().fadeIn(200);
        });
        
    } else {
        $('.btn_chatroomOpen,.btn_chatroom').hoverDelay(function () {
            textChange($('.btn_chatroom'), openCR_prompt, closeCR_prompt);
            $('.btn_chatroom').find('.CRB_in_prompt').stop().fadeIn(200);
        }, function () {
            $('.btn_chatroom').find('.CRB_in_prompt').stop().fadeOut(200);
        });
        $('.CRB_in_prompt').parent().not('.btn_chatroom').hoverDelay(function () {
            $(this).click(function () {
                switch (true) {
                    case $(this).is('.btn_quickMsg'):
                        textChange($('.btn_quickMsg'), openCR_Msg, closeCR_Msg);
                        break;
                    case $(this).is('.btn_faceIcon'):
                        textChange($('.btn_faceIcon'), openCR_faceIcon, closeCR_faceIcon);
                        break;
                }
            });
            $(this).find('.CRB_in_prompt').stop().fadeIn(200);
        }, function () {
            $(this).find('.CRB_in_prompt').stop().fadeOut(200);
        });
    }

    $(document).bind('click touchend', function (e) {
        var target = $(e.target);
        if (target.closest($('.CRB_in_prompt').parent()).length == 0 && target.closest('.btn_chatroomOpen').length == 0) {
            $('.CRB_in_prompt').stop().fadeOut(150);
        }
    });

    //聊天室-送出鈕(狀態)
    $('.CRB_keyIn_Text').not('.chatroom_btm.off .CRB_keyIn_Text').each( function () {
        if ($(this).text() == '' && $(this).find('img') == '') {
            $('.btn_CRB_submit').removeClass('on');
        } else {
            $('.btn_CRB_submit').addClass('on');
        }
    });
    $('.CRB_keyIn_Text').not('.chatroom_btm.off .CRB_keyIn_Text').on('keyup', function (e) {
        $(this).find('br,p').remove();
        if ($(this).text() == '') {
            //$('.btn_CRB_submit').removeClass('on');
            $(this).empty();
        } else {
            $('.btn_CRB_submit').addClass('on');
            if (e.keyCode == 8 || e.keyCode == 37 || e.keyCode == 39 || e.keyCode == 46) {
                return false;
            } else {
                $('.CRB_keyIn_Text').scrollLeft(99999999);/*讓捲軸靠右*/
            }
        }
    });

    //發言過快提示(目前設定5s)
    var CRB_submit_s = 0
    setInterval(function () {
        if (CRB_submit_s > 0) {
            CRB_submit_s--;
        }
    }, 100);

    var CRB_promptFast, CRB_promptBlank, CRB_promptLength;
    if ($('link[href*="green.css"]').length > 0) {
        CRB_promptFast = '发言速度过快!!';
        CRB_promptBlank = '发送消息不能为空，请输入文字';
        CRB_promptLength = '发送讯息不能超过50字';
    } else {
        CRB_promptFast = '發言速度過快!!';
        CRB_promptBlank = '發送消息不能為空，請輸入文字';
        CRB_promptLength = '發送訊息不能超過50字';
    }

    $('.btn_CRB_submit').on('click touchend', function (e) {
        e.preventDefault();
        let textlength = $('.CRB_keyIn_Text').text().length + $('.CRB_keyIn_Text img').length;
        if ($(this).hasClass('on') && $('.CRB_keyIn_Text').html() != '' && textlength <= 50) {
            if (CRB_submit_s == 0) {
                $('.CRB_keyIn_Text').html('');
                //$('.btn_CRB_submit').removeClass('on');
                CRB_submit_s = 50;
                $('.CRB_keyIn_Text').blur();
            } else {
                $('.CRB_prompt').text(CRB_promptFast).finish().show().delay(CRB_submit_s + '00').fadeOut(200);
            }
        } else if ($(this).hasClass('on') && $('.CRB_keyIn_Text').html() == '') {
            $('.CRB_prompt').text(CRB_promptBlank).finish().fadeIn(50).delay(2000).fadeOut(200);
        } else if ($(this).hasClass('on') && textlength > 50) {
            $('.CRB_prompt').text(CRB_promptLength).finish().fadeIn(50).delay(2000).fadeOut(200);
        }
    });

    $(document).bind('click touchend', function (e) {
        var target = $(e.target);
        if (target.closest('.btn_CRB_submit').length == 0) {
            $('.CRB_prompt').hide();
        }
    });

    //優勝冠軍-隊伍名稱過長
    if (touch) {
        $('.GLOdds_L').click(function () {
            var GLOdds_L_name = $(this).html()
            if ($(this).width() >= $(this).parent('li').width() - 75) {
                $('.GLOdds_textShow').hide();
                $(this).siblings('.GLOdds_textShow').fadeIn(200).html(GLOdds_L_name);
            } else {
                $(this).siblings('.GLOdds_textShow').fadeOut(200);
            }
        });
    } else {
        $('.GLOdds_L').hoverDelay(function () {
            var GLOdds_L_name = $(this).html()
            if ($(this).width() >= $(this).parent('li').width() - 75) {
                $(this).siblings('.GLOdds_textShow').fadeIn(200).html(GLOdds_L_name);
            } else {
                $(this).siblings('.GLOdds_textShow').fadeOut(200);
            }
        }, function () {
                $(this).siblings('.GLOdds_textShow').fadeOut(200);
        });
    }

    $(document).bind('click touchmove touchend touchstart', function (e) {
        var target = $(e.target);
        if (target.closest('.GLOdds_L').length == 0) {
            $('.GLOdds_textShow').fadeOut('fast');
        }
    });

    //盤口教程
    $('.btn_tutorials').click(function () {
        $('.tutorials').parents('.bg_popUpBox_scroll').show();
        $('.tutorials').show()
    });

    $('.btn_tutorials_close').click(function () {
        $('.tutorials').parents('.bg_popUpBox_scroll').hide();
        $('.tutorials').hide();
    });

    function siblingsChange(me) {
        me.addClass('on').siblings().removeClass('on');
    }

    //盤口_主項
    $('.tutorials_nav li').click(function () {
        siblingsChange($(this))
        switch (true) {
            case $(this).is('#pankou'):
                siblingsChange($('#pankou_navIn,#tutorials_pankou_ball'));
                break;
            case $(this).is('#pankou_per'):
                siblingsChange($('#pankou_per_navIn,#tutorials_pankou_per_ball'));
                break;
            case $(this).is('#pankou_demo'):
                siblingsChange($('#pankou_demo_navIn,#tutorials_pankou_demo_ball'));
                break;
            case $(this).is('#pankou_demoPer'):
                siblingsChange($('#pankou_demoPer_navIn,#tutorials_pankou_demoPer_ball'));
                break;
        }
        siblingsChange($('.tutorialsIn_nav .ball'));
    })

    //盤口_次項
    $('.tutorialsIn_nav li').click(function () {
        siblingsChange($(this))
        let myID;
        if ($(this).parent().is('#pankou_navIn')) {
            myID = '#tutorials_pankou_';
        } else if ($(this).parent().is('#pankou_per_navIn')) {
            myID = '#tutorials_pankou_per_';
        } else if ($(this).parent().is('#pankou_demo_navIn')) {
            myID = '#tutorials_pankou_demo_';
        } else if ($(this).parent().is('#pankou_demoPer_navIn')) {
            myID = '#tutorials_pankou_demoPer_';
        }
        switch (true) {
            case $(this).hasClass('ball'):
                siblingsChange($(myID + 'ball'));
                break;
            case $(this).hasClass('bigAndsmall'):
                siblingsChange($(myID + 'bigAndsmall'));
                break;
            case $(this).hasClass('soloWin'):
                siblingsChange($(myID + 'soloWin'));
                break;
            case $(this).hasClass('even'):
                siblingsChange($(myID + 'even'));
                break;
        }
    })

    //盤口_模擬投注
    function clearFatherSi(meFa) {
        meFa.siblings('[class*="_team"]').find('.team_list li').removeClass('on')
    }

    $('.demo .team_list li').click(function () {
        siblingsChange($(this))
        let meFa = $(this).parents('[class*="_team"]')
        clearFatherSi(meFa)

        let meId = $(`#${$(this).attr('id')+'_in'}.tutorials_bottom`);
        siblingsChange(meId)
    })

	
	var oBtn=document.getElementById("btn");
var oLink =document.getElementById("link");
oBtn.onclick=function(){
    if(oLink.href=="./green/styles/green.css")
    {
        oLink.href="./green/styles/green.css";
    }
    else
    {
        oLink.href="./styles/main.css";
    }
}
var oBtn=document.getElementById("btn2");
var oLink =document.getElementById("link");
oBtn.onclick=function(){
    if(oLink.href=="./styles/main.css")
    {
        oLink.href="./styles/main.css";
    }
    else
    {
        oLink.href="./green/styles/green.css";
    }
}


});