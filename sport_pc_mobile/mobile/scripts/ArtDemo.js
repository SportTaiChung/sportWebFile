$(document).ready(function () {
    //禁止瀏覽器下拉刷新
    Prevent.PreventPullToRefresh(null, null, null);

    //獲取ios版本號
    function getIosVersion(){
        var str = navigator.userAgent.toLowerCase();
        var ver = str.match(/cpu iphone os (.*?) like mac os/);
        return ver ? ver[1].replace('_', '.').split('_')[0] : false
    }
    if (getIosVersion() >= 15 && getIosVersion() < 15.1) {
        $('body').addClass('ios15');
    } else {
        $('body').removeClass('ios15');
    }

    //今日or滾球
    if ($('.btn_roll').hasClass('on') && $('.btn_favorite').hasClass('on') == false) {
        $('.leagueL,.leagueR,.leagueIn').addClass('rollLive');
    } else if ($('.menu_scroll a').hasClass('roll')) { //內頁
        $('body').addClass('rollLive');
    }

    //表頭按鈕
    $('.btn_header,.btn_roll,.menuMore a').click(function () {
        $(this).addClass('on').siblings().removeClass('on');
        if ($('.menuMore a.roll').length > 0) {
            $('.menuMore a').addClass('roll');
        } else {
            $('.menuMore a').removeClass('roll');
        }
    });

    //金額
 
    //menu scroll(只為檢查方便開啟該功能)
    if ($('.menu_scroll').length > 0 && $('.btn_favorite.on').length == 0) {
        $('.menu .menu_scroll,.menuRule .menu_scroll').scrollLeft($('.menu_scroll a.on').offset().left - $('.menu_scroll a.on').prev().innerWidth());
        $('.menuDate .menu_scroll').scrollLeft($('.menu_scroll a.on').offset().left - $('.menu_scroll a.on').prev().innerWidth() - $('.btn_dateMenu').width());
    };

    //全(開/關)
    $('.menu a.on,.menuDate a.on').removeAttr('onclick');

    //JZ經典版(menu開關)
    $('.jz_menu a').not('.btn_favorite').click(function () {
        if ($(this).hasClass('on')) {
            $(this).toggleClass('open');
        }
        if ($(this).hasClass('open')) {
            $('.jz_container:not(.jz_containerFAV)').find('.leagueGame').show();
            $('.leagueL').addClass('on').find('.btn_arrow').addClass('on');
            $('.leagueL').find('.leagueAll ul,.scroll_point > div,.leagueMore li').show();
            $('.leagueR').find('table').addClass('on').find('ul').show();
        } else {
            $('.jz_container:not(.jz_containerFAV)').find('.leagueGame').hide();
            $('.leagueL').removeClass('on').find('.btn_arrow').removeClass('on');
            $('.leagueL').find('.leagueAll ul,.scroll_point > div,.leagueMore li').hide();
            $('.leagueR').find('table').removeClass('on').find('ul').hide();
        }
    });

    //玩法選擇-(展開/收合)全列表
    $('[class*="NAV_T_"]').click(function () {
        $(this).toggleClass('on');
        if ($(this).hasClass('on')) {
            $('.leagueL').addClass('on').find('.btn_arrow').addClass('on');
            $('.leagueL').find('.leagueAll ul,.scroll_point > div,.leagueMore li').show();
            $('.leagueR').find('table:not([class*=NAV_R_])').addClass('on').find('ul').show();
            //足球-波膽/入球數/半全場
            $('.league').addClass('on').find('.btn_arrow').addClass('on');
            $('.leagueIn').show();
        } else {
            $('.leagueL').removeClass('on').find('.btn_arrow').removeClass('on');
            $('.leagueL').find('.leagueAll ul,.scroll_point > div,.leagueMore li').hide();
            $('.leagueR').find('table:not([class*=NAV_R_])').removeClass('on').find('ul').hide();
            //足球-波膽/入球數/半全場
            $('.league').removeClass('on').find('.btn_arrow').removeClass('on');
            $('.leagueIn').hide();
        }
    }).on('click', '.NAV_scroll li', function (e) {
        e.stopPropagation();
    });

    //(收藏夾/即將開賽)預設全開
    $('.containerFAV').find('[class*="FAV_T_"]').addClass('on');
    $('.containerFAV').find('.leagueL').addClass('on').find('.btn_arrow').addClass('on');
    $('.containerFAV').find('.leagueL').find('.leagueAll ul,.scroll_point > div,.leagueMore li').show();
    $('.containerFAV').find('.leagueL_all').next('.leagueR').find('table:not([class*=FAV_R_])').addClass('on').find('ul').show();
    $('.jz_containerFAV').find('.leagueL').addClass('on');
    $('.jz_containerFAV').find('.leagueGame').show();
    $('.containerWinner').find('[class*="FAV_T_"]').addClass('on');
    $('.containerWinner').find('.league').addClass('on').find('.btn_arrow').addClass('on');
    $('.containerWinner').find('.leagueIn').css('display', 'table');

    //聯盟賽事內容下拉(外頁)
    $('.container .leagueL').each(function (i) {
        $(this).find('.leagueTitle,.btn_arrow ').addClass('sportA' + (i + 1));
        $(this).find('.leagueGame,.scroll_point > div,.leagueMore li').addClass('sportB' + (i + 1));
    });

    $('.container .leagueR table:not([class*="FAV_R_"])').each(function (i) {
        $(this).find('tr:first').addClass('sportA' + (i + 1));
        $(this).find('ul').addClass('sportB' + (i + 1));
    });

    $('[class*="sportA"]').click(function () {
        var sportNum = $(this).attr('class').split('sportA')[1].split('on')[0];
        $('.sportA' + sportNum).closest('.container .leagueL,table').toggleClass('on');
        $('.sportB' + sportNum).toggle();
        $('.btn_arrow' + '.sportA' + sportNum).toggleClass('on');

        //JZ經典版-列表(全開/全關)menu箭頭判斷
        let jz_listAll_Num = $('.jz_container .leagueL').length,
            jz_listAllOn_Num = $('.jz_container .leagueL.on').length;
        if (jz_listAllOn_Num == jz_listAll_Num) {
            $('.menu a.on,.menuDate a.on').addClass('open');
        }
        if (jz_listAllOn_Num == 0) {
            $('.menu a.on,.menuDate a.on').removeClass('open');
        }

        //各玩法-列表(全開/全關)menu箭頭判斷
        let listAll_Num = $('.setPlayIn[style*="block"]').find('.leagueL,.league').length,
            listAllOn_Num = $('.setPlayIn[style*="block"]').find('.leagueL.on,.league.on').length;
        if (listAllOn_Num == listAll_Num && $('.setPlayIn').length > 0) {
            $('[class*="NAV_T_"]').addClass('on');
            $('.league').addClass('on').find('.btn_arrow').addClass('on');
        }
        if (listAllOn_Num == 0 && $('.setPlayIn').length > 0) {
            $('[class*="NAV_T_"]').removeClass('on');
            $('.league').removeClass('on').find('.btn_arrow').removeClass('on');
        }

        //收藏夾-列表(全開/全關)menu箭頭判斷
        let listNum = $(this).closest('.leagueL_all,.leagueR').parent('div').find('.leagueL').length,
            listOn_Num = $(this).closest('.leagueL_all,.leagueR').parent('div').find('.leagueL.on').length;
        if (listOn_Num == listNum && $('.setPlayIn').length == 0) {
            $(this).closest('.leagueL_all,.leagueR').parent('div').find('[class*="FAV_T_"],[class*="NAV_T_"]').addClass('on');
        }
        if (listOn_Num == 0 && $('.setPlayIn').length == 0) {
            $(this).closest('.leagueL_all,.leagueR').parent('div').find('[class*="FAV_T_"],[class*="NAV_T_"]').removeClass('on');
        }
    });

    $('[class*="FAV_T_"]').not('.containerWinner [class*="FAV_T_"]').click(function () {
        $(this).toggleClass('on');
        if ($(this).hasClass('on')) {
            $(this).siblings('.leagueL').addClass('on').find('.btn_arrow').addClass('on');
            $(this).siblings('.leagueL').find('.leagueAll ul,.scroll_point > div,.leagueMore li').show();
            $(this).parent('.leagueL_all').next('.leagueR').find('table:not([class*=FAV_R_])').addClass('on').find('ul').show();
        } else {
            $(this).siblings('.leagueL').removeClass('on').find('.btn_arrow').removeClass('on');
            $(this).siblings('.leagueL').find('.leagueAll ul,.scroll_point > div,.leagueMore li').hide();
            $(this).parent('.leagueL_all').next('.leagueR').find('table:not([class*=FAV_R_])').removeClass('on').find('ul').hide();
        }
    });

    $('[class*="FAV_R_"]').click(function () {
        $(this).parent('.leagueR').prev('.leagueL_all').find('[class*="FAV_T_"]').toggleClass('on');
        if ($(this).parent('.leagueR').prev('.leagueL_all').find('[class*="FAV_T_"]').hasClass('on')) {
            $(this).parent('.leagueR').prev('.leagueL_all').find('.leagueL').addClass('on').find('.btn_arrow').addClass('on');
            $(this).parent('.leagueR').prev('.leagueL_all').find('.leagueL').find('.leagueAll ul,.scroll_point > div,.leagueMore li').show();
            $(this).siblings('table:not([class*=FAV_R_])').addClass('on').find('ul').show();
        } else {
            $(this).parent('.leagueR').prev('.leagueL_all').find('.leagueL').removeClass('on').find('.btn_arrow').removeClass('on');
            $(this).parent('.leagueR').prev('.leagueL_all').find('.leagueL').find('.leagueAll ul,.scroll_point > div,.leagueMore li').hide();
            $(this).siblings('table:not([class*=FAV_R_])').removeClass('on').find('ul').hide();
        }
    });

    //優勝冠軍(球類開關)
    $('.containerWinner [class*="FAV_T_"]').click(function () {
        $(this).toggleClass('on');
        if ($(this).hasClass('on')) {
            $(this).siblings('.league').addClass('on').find('.btn_arrow').addClass('on');
            $(this).siblings('.leagueIn').css('display', 'table');
        } else {
            $(this).siblings('.league').removeClass('on').find('.btn_arrow').removeClass('on');
            $(this).siblings('.leagueIn').hide();
        }
    });

    //優勝冠軍(內容列表開關)+足球(入球數/波膽/半全場)
    $('.league').click(function () {
        $(this).toggleClass('on').find('.btn_arrow').toggleClass('on');
        if ($(this).hasClass('on')) {
            $(this).next('.leagueIn').css('display', 'table');
        } else {
            $(this).next('.leagueIn').hide();
        }

        //分類-全(開/關)箭頭判斷
        var winList_Num = $(this).parent('div').find('.league').length;
        var winListOn_Num = $(this).parent('div').find('.league.on').length;
        if (winListOn_Num == winList_Num) {
            $(this).siblings('[class*="FAV_T_"]').addClass('on');
            $('[class*="NAV_T_"]').addClass('on');
        }
        if (winListOn_Num == 0) {
            $(this).siblings('[class*="FAV_T_"]').removeClass('on');
            $('[class*="NAV_T_"]').removeClass('on');
        }
    });

    //聯盟賽事內容下拉(內頁更多玩法)
    $('.gameStyle_Table th').parent().next().children('td').css('border-top', '0');
    $('.gameStyle_list:first .gameStyle_T').addClass('on');
    $('.gameStyle_list:first .gameStyle_In').show();
    $('.gameStyle_T').on('click', function () {
        if ($(this).next('.gameStyle_In').css('display') == 'none') {
            $(this).addClass('on').next('.gameStyle_In').show();
        } else {
            $(this).next('.gameStyle_In').hide();
            $(this).removeClass('on');
        }
        $('.btn_gameStyle_all').each(function () {
            var gameStyle_list = $('.gameStyle_T').length;
            var gameStyleOn_list = $('.gameStyle_T.on').length;
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
            $('.gameStyle_In').hide();
            $('.gameStyle_T').removeClass('on');
        } else {
            $(this).removeClass('off');
            $('.gameStyle_In').show();
            $('.gameStyle_T').addClass('on');
        }
    });

    //內頁更多玩法-標題(i)註解
    $('.btn_GST_i').click(function () {
        var x37 = $('.container').width() * 0.37,
            x60 = $('.container').width() * 0.60,
            x_GST = $(this).position().left;
        if (x_GST >= x37 && x_GST <= x60) {
            $(this).find('.GST_InBox').removeClass('boxRight').addClass('boxCenter');
        } else if (x_GST > x60) {
            $(this).find('.GST_InBox').removeClass('boxCenter').addClass('boxRight');
        } else {
            $(this).find('.GST_InBox').removeClass('boxCenter boxRight');
        }

        var GDListT_top = $('.menuMore').offset().top + $('.menuMore').outerHeight(true),
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

    $(document).bind('click touchend', function (e) {
        var target = $(e.target);
        if (target.closest('.btn_GST_i').length == 0) {
            $('.btn_GST_i').removeClass('on');
            $('.GST_InBox').slideUp(200);
        }
    });

    //聯盟賽事內容點選(目前投注)
    var presentNum = function () {
        if ($('.icon_present').html() > 1) {
            $('.btn_present').css('display', 'flex');
            $('.clickBet_odds').show();
            $('.betList,.clickBet').hide();
            $('.icon_present').parent('a').addClass('on');
        } else if ($('.icon_present').html() == 1) {
            $('.btn_present,.clickBet_odds').hide();
            $('.clickBet').show();
            $('#fastBet_step01').show().find('.betListIn').removeClass('gameBetClose').find('.odd').removeClass('bg_green');
            $('.icon_present').parent('a').addClass('on');
        } else if ($('.icon_present').html() == 0) {
            $('.betList').hide();
            $('.icon_present').parent('a').removeClass('on');
        }
    }
    $('.btn_li').click(function () {
        let x = $('.icon_present').html();
        if ($(this).hasClass('on')) {
            $(this).toggleClass('on');
            $('.icon_present').html(--x);
            presentNum();
        } else {
            $(this).toggleClass('on');
            $('.icon_present').html(++x);
            $('.betListIn').removeClass('hideInfo');
            $('.betMenu li').removeClass('on');
            $('#betSingleNum').closest('li').addClass('on');
            presentNum();
        }
    });

    $(document).bind('click touchend', function () {
        if ($('.chatroomOpen,.chatroomOpenAll').length > 0) {
            $('#open02').css('z-index', '-1');
        } else {
            $('#open02').css('z-index', '');
        }
    });

    //關閉彈窗/彈窗確定/取消/保留投注項目
    var clicks = 0;
    $('.btn_closeP').click(function () {
        $('body').css('-webkit-overflow-scrolling', 'touch');
        $(this).closest('.popup').hide();
        $('.mask,.mask_footer,.popup_scroll').hide();
        $('.popup').find('.odd').removeClass('bg_green');
        $('#betPass').find('.popupC').addClass('off');
        $('#popupEvent05').hide();
        $('#popupEvent04').show();
        $('#open04,#open05').hide().prev().show();
        $('#bet04,#bet05').find('.btn_sure').removeClass('bg_green bg_blue').val('確認下注').prev().val('取 消');
        $('.popup').find('.img_check,.btn_status,.btn_status_iG,.img_refuse').hide();
        $('.popup').find('.popupT').removeAttr('style');
        $('.popupC').removeClass('gameBetClose');
        $('#popupEvent02,#popupEvent03').hide();
        $('#popupEvent01').show();
        $('#bet02').find('.popupC').find('.keyboard:first').addClass('error');
        $('#bet02').find('.error_t').show();
        $('#betSingle').removeClass('hideInfo');
        clicks = 0;
    });

    $('.btn_sure').click(function () {
        if (clicks == 0) {
            $(this).addClass('bg_green').val('接受變化並下注');
            $(this).closest('.popup').find('.odd').addClass('bg_green');
            clicks++;
        } else if (clicks == 1) {
            $(this).closest('.popup').find('.popupT').css('background-color', '#43b100');
            $(this).closest('.popup').find('.img_check,.btn_status,.btn_status_iG,.img_refuse').show();
            if ($('#bet04').css('display') == 'table') {
                $(this).addClass('bg_blue').val('關 閉').prev().val('保留投注項目');
            } else {
                $(this).addClass('bg_blue').val('確 定').prev().val('保留投注項目');
            }
            $(this).closest('.popup').find('.odd').removeClass('bg_green');
            $(this).closest('.popup').find('.popupC.off').show();
            $('#bet02').find('.popupC').find('.keyboard:first').addClass('error');
            $('#bet02').find('.error_t,#popupEvent01').show();
            $('#popupEvent02').hide();
            $('#popupEvent03').show();
            clicks++;
        } else if (clicks == 2) {
            $('.popup').find('.odd').removeClass('bg_green');
            $('#open04,#open05').hide().prev().show();
            $('#bet04,#bet05').find('.btn_sure').removeClass('bg_green bg_blue').val('確認下注').prev().val('取 消');
            $('.popup').find('.img_check,.btn_status,.btn_status_iG,.img_refuse').hide();
            $('.popup').find('.popupT').removeAttr('style');
            $('body').css('-webkit-overflow-scrolling', 'touch');
            if ($('#bet04').css('display') == 'table') {
                $(this).closest('.popup').hide();
                //呼叫系統信息
                $('.popup_scroll').hide();
                $('#popSysMsg').css('display', 'flex');
                $('body').css('-webkit-overflow-scrolling', 'initial');
                clicks = 0;
            } else if ($('#bet05').css('display') == 'table') {
                $('#bet05').hide();
                $('#bet06').css('display', 'table');
                $('#bet06').find('.popupT').css('background-color', '#43b100');
                $('#bet06').find('.btn_status').show();
                clicks++;
            } else {
                $(this).closest('.popup').hide();
                $('.mask,.popup_scroll').hide();
                clicks = 0;
            }
        } else if (clicks == 3) {
            $('#bet06').hide();
            $('#bet07').css('display', 'table');
            $('#bet07').find('.popupT').css('background-color', '#43b100');
            clicks++;
        } else {
            $(this).closest('.popup').hide();
            $('.mask,.popup_scroll').hide();
            clicks = 0;
        }
        console.log(clicks);
    });

    //關閉目前投注
    $('#betSingle .btn_close').click(function () {
        $('body').css('-webkit-overflow-scrolling', 'touch');
        if ($('#betSingle .popupC').length == 1) {
            $('#bet02,.mask,.popup_scroll').hide();
            $(this).closest('.popupC').remove();
        } else {
            $(this).closest('.popupC').remove();
        }
    });

    $('#betPass .btn_close').click(function () {
        $('body').css('-webkit-overflow-scrolling', 'touch');
        if ($('#betPass .popupC').length == 1) {
            $('#bet02,.mask,.popup_scroll').hide();
            $(this).closest('.popupC').remove();
        } else {
            $(this).closest('.popupC').remove();
        }
    });

    //彈窗(固定抬頭)
    $('.popup_scroll').scroll(function () {
        if ($(this).scrollTop() > 30) {
            $('.popupT').addClass('radiusNo');
        } else {
            $('.popupT').removeClass('radiusNo');
        }
    });

    //投注說明     
    $('.btn_status,.btn_status_i,.btn_status_iR,.btn_status_iG').click(function () {
        $('.statusInfo').not($(this).children('.statusInfo')).stop(false, true).slideUp(200);
        $('.btn_status,.btn_status_i,.btn_status_iR,.btn_status_iG').not($(this)).removeClass('on');
        $(this).toggleClass('on').children('.statusInfo').stop(false, true).slideToggle(200);
    });

    //開啟彈窗/開啟頁腳更多
    $('.openBtn').click(function (e) {
        $('body').css('-webkit-overflow-scrolling', 'initial');
        switch ($(this).attr('id')) {
            case 'open02'://點此投注
            case 'CR_open02'://聊天室-點此投注
                $('.betList').hide();
                if ($('.icon_present').html() > 0) {
                    $('#bet02').css('display', 'table');
                    $('.mask,.popup_scroll').show();
                    $('.popup_scroll').scrollTop(0);
                }
                $('.popupBet').find('li').removeClass('on');
                $('.popupBet').find('li:first').addClass('on');
                $('#betSingle').show();
                $('#betPass').hide();
                break;
            case 'open03'://更多                
                $('#bet02,.mask,.popup_scroll,#funSetBox').hide();
                $('#moreBox').show();
                $('.more').stop(false, true);
                if ($('.more').css('right') < '0') {
                    $('.mask_footer').show();
                    $('.more').animate({ 'right': '0' });
                    if ($('link[href*="bgColor_w.css"]').length > 0) {
                        $(this).css('filter', 'brightness(1.5)');
                    } else {
                        $(this).css('filter', 'brightness(2)');
                    }
                } else {
                    $('.mask_footer').hide();
                    $('.more').animate({ 'right': '-72%' });
                    $(this).css('filter', '');
                }
                break;
            case 'open04':
                $('#bet02').hide();
                $('.popupC').removeClass('gameBetClose');
                $('#bet04').css('display', 'table');
                $('#bet04').find('.popupC.off').hide();
                break;
            case 'open05':
                $('#bet02').hide();
                $('.popupC').removeClass('gameBetClose');
                $('#betPass').find('.popupC').addClass('off');
                $('#popupEvent05').hide();
                $('#popupEvent04').show();
                $('#bet05').css('display', 'table');
                break;
            case 'openLeague'://聯盟
                $('.allianceSel').stop(false, true);
                if ($('.allianceSel').css('right') < '0') {
                    $('.mask_footer').show();
                    $('.allianceSel').animate({ 'right': '0' });
                    if ($('#openLeague.on').length == 0) {
                        if ($('link[href*="bgColor_w.css"]').length > 0) {
                            $(this).css('filter', 'brightness(1.5)');
                        } else {
                            $(this).css('filter', 'brightness(2)');
                        }
                    } else {
                        if ($('link[href*="bgColor_w.css"]').length > 0) {
                            $(this).css('color', '#8e8e8e');
                        } else {
                            $(this).css('color', '#fff');
                        }
                    }
                } else {
                    $('.mask_footer').hide();
                    $('.allianceSel').animate({ 'right': '-72%' });
                    $('#openLeague').removeAttr('style');
                }
                break;
            case 'openRecord'://投注記錄
                if ($('.icon_record.off').length > 0) {
                    e.preventDefault();
                }
                break;
            case 'fastTransfer'://快速轉帳
                if ($('#popFastTransfer').css('display') == 'none') {
                    $('.mask_footer').hide();
                    $('.mask').show().css('background-color', 'rgba(0,0,0,0.7)');
                    $('#popFastTransfer').show().find('.numInputArea').show();
                    if ($('link[href*="bgColor_w.css"]').length > 0) {
                        $(this).css('filter', 'brightness(1.5)');
                    } else {
                        $(this).css('filter', 'brightness(2)');
                    }
                } else {
                    $('.mask,#popFastTransfer').hide();
                    $(this).css('filter', '');
                }
                break;
        }
    });

    //投注記錄(等待中)動畫
    setTimeout(function () {
        if ($('.icon_moreRecord').hasClass('off') == false && $('.record_numB').css('display') == 'block') {
            $('.record_numB').hide().next().show();
        }
    }, 4000);

    //快速轉帳-關閉
    $('.btn_fastTransfer_close').click(function () {
        $('body').css('-webkit-overflow-scrolling', 'touch');
        $('.mask,#popFastTransfer').hide().removeAttr('style');
        $('#fastTransfer').removeAttr('style');
    });

    //點擊空白處關閉(聯盟/投注紀錄/更多)
    $(document).bind('mousedown touchend', function (e) {
        var target = $(e.target);
        if (target.closest('#openLeague,.allianceSel').length == 0) {
            $('.allianceSel').stop(false, true);
        }
        if (target.closest('#open03,.more').length == 0) {
            $('.more').stop(false, true);
        }
        if ($('.allianceSel').css('right') == '0px') {
            //聯盟
            setTimeout(function () {
                if (target.closest('#fastTransfer,#openLeague,.allianceSel,#open02,#openRecord,#open03').length == 0) {
                    $('#openLeague').removeAttr('style');
                    $('.allianceSel').stop().animate({ 'right': '-72%' })
                    $('.mask_footer').hide();
                    $('body').css('-webkit-overflow-scrolling', 'touch');
                } else if (target.closest($('.icon_record.off').parent('#openRecord')).length > 0) {
                    $('#openLeague').removeAttr('style');
                    $('.allianceSel').stop().animate({ 'right': '-72%' })
                    $('.mask_footer').hide();
                    $('body').css('-webkit-overflow-scrolling', 'touch');
                } else if (target.closest('#fastTransfer,#openRecord').length > 0) {
                    $('#openLeague').removeAttr('style');
                    $('.allianceSel').removeAttr('style');
                } else if (target.closest('#open02').length > 0 && $('.icon_present').text() > 0) {
                    $('#openLeague').removeAttr('style');
                    $('.allianceSel').removeAttr('style');
                    $('.mask_footer').hide();
                } else if (target.closest('#open02').length > 0 && $('.icon_present').text() == 0) {
                    $('#openLeague').removeAttr('style');
                    $('.allianceSel').stop().animate({ 'right': '-72%' })
                    $('.mask_footer').hide();
                    $('body').css('-webkit-overflow-scrolling', 'touch');
                } else if (target.closest('#open03').length > 0) {
                    $('#openLeague').removeAttr('style');
                    $('.allianceSel').stop().animate({ 'right': '-72%' });
                }
            }, 50);
        } else if ($('.more').css('right') == '0px') {
            //更多
            setTimeout(function () {
                if (target.closest('#fastTransfer,#openLeague,#open02,#openRecord,#open03,.more,#popfunSet').length == 0) {
                    $('#open03').css('filter', '');
                    $('.more').stop().animate({ 'right': '-72%' });
                    $('.mask_footer').hide();
                    $('body').css('-webkit-overflow-scrolling', 'touch');
                } else if (target.closest($('.icon_record.off').parent('#openRecord')).length > 0) {
                    $('#open03').css('filter', '');
                    $('.more').stop().animate({ 'right': '-72%' });
                    $('.mask_footer').hide();
                    $('body').css('-webkit-overflow-scrolling', 'touch');
                } else if (target.closest('#fastTransfer,#openRecord').length > 0) {
                    $('#open03').css('filter', '');
                    $('.more').removeAttr('style');
                } else if (target.closest('#open02').length > 0 && $('.icon_present').text() > 0) {
                    $('#open03').css('filter', '');
                    $('.more').removeAttr('style');
                    $('.mask_footer').hide();
                } else if (target.closest('#open02').length > 0 && $('.icon_present').text() == 0) {
                    $('#open03').css('filter', '');
                    $('.more').stop().animate({ 'right': '-72%' });
                    $('.mask_footer').hide();
                    $('body').css('-webkit-overflow-scrolling', 'touch');
                } else if (target.closest('#openLeague').length > 0) {
                    $('#open03').css('filter', '');
                    $('.more').stop().animate({ 'right': '-72%' });
                }
            }, 50);
        }
    });

    //頁腳更多-維護提示
    $('.moreBT li.off').click(function () {
        $('.moreBT_info').hide();
        $(this).find('.moreBT_info').toggle();
    });
    $(document).bind('touchmove mousedown touchend', function (e) {
        var target = $(e.target);
        if (target.closest('.moreBT li.off').length == 0) {
            $(this).find('.moreBT_info').hide();
        }
    });

    //頁腳更多-贈禮點數說明
    $('.btn_GP_prompt').click(function () {
        $('.GP_In').toggle();
    });

    $(document).bind('touchmove mousedown touchend', function (e) {
        var target = $(e.target);
        if (target.closest('.btn_GP_prompt,.GP_In').length == 0) {
            $(this).find('.GP_In').hide();
        }
    });

    //頁腳更多-單選
    $('.moreBB_radio').not('.defaultMoney .moreBB_radio').click(function () {
        $(this).addClass('on').siblings().removeClass('on');
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
    $('.defaultMoney .moreBB_radio').click(function () {
        $(this).addClass('on').siblings().removeClass('on');
        $('.default_keyNum').removeClass('focus').hide();
        $('.numInputPlus,.numInputArea').hide();
        $('#setMoney,#setMoney_multi').each(function () {
            let location = $(this).closest('.defaultMoney');
            if ($(this).hasClass('on')) {
                location.find('.default_keyNum').addClass('focus').show().siblings('.numInputPlus,.numInputArea').css('display', 'table');
                let moreB_H = $('.moreB').scrollTop(),
                    a = location.find('.default_keyNum').outerHeight(true),
                    b = location.find('.numInputPlus').outerHeight(true),
                    c = location.find('.numInputArea').outerHeight(true),
                    definitMoney_H = a + b + c;
                $('.moreB').scrollTop(moreB_H + definitMoney_H);
            }
        });
    });
    $(document).bind('mousedown touchend', function (e) {
        var target = $(e.target);
        if (target.closest('.defaultMoney').find('.default_keyNum,.numInputPlus,.numInputArea').length == 0) {
            $('.default_keyNum').removeClass('focus');
        }
    });
    $('.default_keyNum').siblings('.numInputPlus,.numInputArea').on('click', function () {
        $('.default_keyNum').addClass('focus');
    });

    //數字鍵盤
    $('.keyboard').not('.FT_form .keyboard,.default_keyNum,.popupB2 .keyboard').on('click', function () {
        if ($(this).hasClass('off')) {
            if ($(this).closest('#fastBet_step01,.popupC').length > 0) {
                $(this).removeClass('off').addClass('focus').siblings('.keyboard').removeClass('focus').addClass('off');
                $(this).siblings('.numInputPlus,.numInputArea').css('display', 'table');
                if ($(this).prev('.keyboard').length > 0) {
                    $(this).siblings('.numInputPlus').find('.t_chipCustom').hide();
                } else {
                    $(this).siblings('.numInputPlus').find('.t_chipCustom').show();
                }
            }
        } else if ($(this).hasClass('focus')) {
            $(this).removeClass('focus');
            if ($(this).closest('.calcTable').length > 0) {
                $(this).closest('.calcList').nextAll('.numInputArea:first').hide();
            } else if ($(this).closest('.calc_totalBet').length > 0) {
                $(this).closest('.calc_totalBet').find('.numInputArea').hide();
            } else {
                $(this).siblings('.numInputPlus,.numInputArea').hide();
            }
        } else {
            if ($(this).closest('.more').length > 0) {
                $('.more').find('.numInputPlus,.numInputArea').hide();
                $('.more').find('.keyboard').removeClass('focus');
            } else {
                $('.numInputPlus,.numInputArea').hide();
                $('.keyboard').removeClass('focus');
            }
            $(this).addClass('focus');
            if ($(this).closest('.calcTable').length > 0) {
                if ($(this).hasClass('calcOdds')) {
                    $(this).closest('.calcList').nextAll('.numInputArea:first').css('display', 'table').removeClass('noPoint');
                } else {
                    $(this).closest('.calcList').nextAll('.numInputArea:first').css('display', 'table').addClass('noPoint');
                }
            } else if ($(this).closest('.calc_totalBet').length > 0) {
                $(this).closest('.calc_totalBet').find('.numInputArea').css('display', 'table');
            } else {
                $(this).siblings('.numInputPlus,.numInputArea').css('display', 'table');
            }
        }
        $('.betTxtPass_tr').hide();
    });

    //過關鍵盤
    $('.popupB2').find('.keyboard').not('.off').on('click', function () {
        $('.numInputPlus,.numInputArea,.betTxtPass_tr').hide();
        $(this).toggleClass('focus');
        if ($(this).hasClass('focus')) {
            $(this).closest('ul').nextAll('.betTxtPass_tr:eq(0)').css('display', 'table-row');
        }
    });

    //關閉鍵盤
    $('#open03').click(function () {
        $('.moreB').scrollTop(0);
    });

    //進階設定
    $('#openFunSet').click(function () {
        setTimeout(function () {
            $('#moreBox').hide();
            $('#funSetBox').show();
        }, 50);
    });
    $('.btn_funSet_close').click(function () {
        $('#funSetBox').hide();
        $('#moreBox').show();
    });

    //進階設定-籌碼(最多設置4個)
    $('.btn_chip').click(function () {
        if ($('.btn_chip.on').length < 4) {
            $(this).toggleClass('on');
        } else {
            $(this).removeClass('on');
        }
    });

    //快速投注-(單項/過關)切換
    $('.betMenu li').click(function () {
        $('.betMenu li').removeClass('on');
        $(this).addClass('on');
        if ($('#betPassNum').closest('li').hasClass('on')) {
            $('.betListIn').addClass('hideInfo');
        } else {
            $('.betListIn').removeClass('hideInfo');
        }
    });
    $('.btn_closeBet').click(function () {
        $('body').css('-webkit-overflow-scrolling', 'touch');
        $('.btn_li').removeClass('on');
        $('.icon_present').html('0').parent('a').removeClass('on');
        $('.betListIn').removeClass('gameBetClose');
        $('#fastBet_step01').hide().find('.odd').removeClass('bg_green');
        $('#fastBet_step01').find('.btn_confirm:eq(0)').show();
        $('#fastBet_step01').find('.btn_confirm:eq(1)').hide();
        $('#fastBet_step01').find('keyboard').removeClass('focus');
        $('#fastBet_step01').find('.numInputPlus,.numInputArea').hide();
    });
    $('.betListPass').find('.btn_closePass').click(function () {
        $('.betListIn').removeClass('hideInfo');
        $('.betMenu li').removeClass('on');
        $('#betSingleNum').closest('li').addClass('on');
    });
    $('.btn_closeFast').click(function () {
        $('body').css('-webkit-overflow-scrolling', 'touch');
        $('#fastBet_step01').hide().find('.odd').removeClass('bg_green');
        $('#fastBet_step01').find('.btn_confirm:eq(0)').show();
        $('#fastBet_step01').find('.btn_confirm:eq(1)').hide();
    });

    //快速投注-(步驟)
    $('#fastBet_step01 .btn_confirm:eq(0)').click(function () {
        $(this).hide().next().show().closest('.betList').find('.odd').addClass('bg_green');
    });
    $('#fastBet_step01 .btn_confirm:eq(1)').click(function () {
        $(this).hide().prev().show().closest('.betList').find('.odd').removeClass('bg_green');
        $('#fastBet_step01').hide();
        $('#fastBet_step02').show();
    });
    $('#fastBet_step02 .btn_cancelFB').click(function () {
        $('#fastBet_step01').show();
        $('#fastBet_step02').hide();
    });
    $('#fastBet_step02 .btn_confirm:eq(0)').click(function () {
        $(this).hide().next().show().closest('.betList').find('.odd').addClass('bg_green');
    });
    $('#fastBet_step02 .btn_confirm:eq(1)').click(function () {
        $(this).hide().prev().show().closest('.betList').find('.odd').removeClass('bg_green');
        $('#fastBet_step02').hide();
        $('#fastBet_step03').show();
    });
    $('#fastBet_step03 .betListT').css('background-color', '#43b100');
    $('#fastBet_step03 .btn_cancelFB').click(function () {
        $('#fastBet_step03').hide();
        $('#fastBet_step01').show();
    });
    $('#fastBet_step03 .btn_confirm').click(function () {
        $('#fastBet_step03').hide();
        $('#fastBet_step04').show();
    });
    $('#fastBet_step04 .img_check').show();
    $('#fastBet_step04 .btn_cancelFB').click(function () {
        $('#fastBet_step04').hide();
        $('#fastBet_step01').show();
    });
    $('#fastBet_step04 .btn_confirm').click(function () {
        $('#fastBet_step04').hide();
    });

    //彈窗單項投注/過關投注
    $('#betPass').hide();
    $('#singleNum').html($('#betSingle .popupC').length);
    $('#passNum').html($('#betSingle .popupC').length);
    $(".popupBet li").click(function () {
        $('.popup_scroll').scrollTop(0);
        $(this).addClass('on').siblings().removeClass('on');
        if ($('#singleNum').closest('li').hasClass('on')) {
            $('#betSingle').show().removeClass('hideInfo').next().hide();
        } else if ($('#passNum').closest('li').hasClass('on') && $('#passNum').html() == 1) {
            $('#betSingle').show().addClass('hideInfo').next().hide();
        } else {
            $('#betPass').show().prev().hide();
            $('.betPassT').removeClass('on').next().hide();
            $('.betTxtOut').removeAttr('style');
        }
    });
    $(".betPassT").click(function () {
        $(this).toggleClass('on');
        if ($(this).hasClass('on')) {
            $(this).next('.betPassC').css('display', 'table');
            $(this).nextAll('.popupB2').find('.betTxtPass').hide();
        } else {
            $(this).next('.betPassC').css('display', 'none');
            $(this).nextAll('.popupB2').find('.betTxtPass').show();
        }
    });
    $('.popupPass').find('.btn_closePass').click(function () {
        $('.popupIn').removeClass('hideInfo');
        $('#passNum').closest('li').removeClass('on');
        $('#singleNum').closest('li').addClass('on');
    });

    //子層點擊不啟動父層動作
    $(".multiply").click(function (e) {
        e.stopPropagation();
    });

    //點擊它處關閉
    $(document).bind('click touchend', function (e) {
        var target = $(e.target);
        setTimeout(function () {
            if (target.closest('.btn_status,.btn_status_i,.btn_status_iR,.btn_status_iG,.moreBB select').length == 0) {
                $('.statusInfo').slideUp(200);
                $('.moreBB li,.btn_status,.btn_status_i,.btn_status_iR,.btn_status_iG').removeClass('on');
            }
        }, 50);
    });

    //聯盟
    $('.alliance_A-Z li').click(function () {
        $('.alliance_A-Z li').removeClass('on');
        $(this).addClass('on')
    });
    $('.alliance_scroll li').not('[class*="AL_li_"]').click(function () {
        $(this).toggleClass('on');
    });
    $('.btn_AL_allSel').click(function () {
        if ($(this).hasClass('on')) {
            $(this).removeClass('on');
            $('.alliance_scroll li').removeClass('on');
        } else {
            $(this).addClass('on');
            $('.alliance_scroll li').addClass('on');
        }
    });
    $('.btn_AL_hot').click(function () {
        $('.btn_AL_A-Z').removeClass('on');
        $(this).addClass('on')
        $('.alliance_A-Z').hide();
    });
    $('.btn_AL_A-Z').click(function () {
        $('.btn_AL_hot').removeClass('on');
        $(this).addClass('on');
        $('.alliance_A-Z').show();
    });

    //收藏夾-聯盟分類開關
    $('[class*="AL_li_"]').click(function () {
        if ($(this).hasClass('on')) {
            $(this).removeClass('on').nextUntil('[class*="AL_li_"]').removeClass('on');
        } else {
            $(this).addClass('on').nextUntil('[class*="AL_li_"]').addClass('on');
        }
        AL_allSel();
    });

    $('.alliance_scroll li').not('[class*="AL_li_"]').click(function () {
        if ($('[class*="AL_li_"]').length == 0) {
            //(一般)總開關判斷
            var list_Num = $('.alliance_scroll li').length,
                listOn_Num = $('.alliance_scroll li.on').length;
            if (listOn_Num == list_Num) {
                $('.btn_AL_allSel').addClass('on');
            } else if (listOn_Num < list_Num) {
                $('.btn_AL_allSel').removeClass('on');
            }
        } else {
            //(收藏夾)分類總開關判斷
            var className = $(this).prevAll('[class*="AL_li_"]').first(),
                li_Num = className.nextUntil('li[class*="AL_li_"]','li').length,
                liOn_Num = className.nextUntil('li[class*="AL_li_"]').filter('.on').length;
            if (liOn_Num == li_Num) {
                className.addClass('on');
            } else if (liOn_Num < li_Num) {
                className.removeClass('on');
            }
            AL_allSel();
        }
    });

    //(收藏夾)總開關判斷
    function AL_allSel() {
        var item_Num = $('[class*="AL_li_"]').length,
            itemOn_num = $('[class*="AL_li_"]').filter('.on').length;
        if (itemOn_num == item_Num) {
            $('.btn_AL_allSel').addClass('on');
        } else {
            $('.btn_AL_allSel').removeClass('on');
        }
    }

    //聯盟選擇(提交)按鈕
    $('.btn_AL_confirm').click(function () {
        $('.allianceSel').css('right', '-72%');
        $('.mask_footer').hide();
        $('#openLeague').removeAttr('style');
        if ($('.btn_AL_allSel').hasClass('on')) {
            $('#openLeague').removeClass('on');
        } else {
            $('#openLeague').addClass('on');
        }
    });

    //過關計算器
    $('.calcPassCount_select').change(function () {
        if ($(this).val() == 'CPC_selWin') {
            $(this).css('color', '#0371fe');
            $(this).next('.calcPassCount_ratio').addClass('off').text('100');
            $(this).closest('.calcList').nextAll('.numInputArea:first').hide();
            $(this).closest('.calcList').find('.keyboard').removeClass('focus');
        } else if ($(this).val() == 'CPC_selLose') {
            $(this).css('color', '#f00');
            $(this).next('.calcPassCount_ratio').addClass('off').text('100');
            $(this).closest('.calcList').nextAll('.numInputArea:first').hide();
            $(this).closest('.calcList').find('.keyboard').removeClass('focus');
        } else if ($(this).val() == 'CPC_selFlat') {
            $(this).css('color', '#000');
            $(this).next('.calcPassCount_ratio').addClass('off').text('0');
            $(this).closest('.calcList').nextAll('.numInputArea:first').hide();
            $(this).closest('.calcList').find('.keyboard').removeClass('focus');
        } else if ($(this).val() == 'CPC_selPlus') {
            $(this).css('color', '#0371fe');
            $(this).next('.calcPassCount_ratio').removeClass('off').text('');
        } else {
            $(this).css('color', '#f00');
            $(this).next('.calcPassCount_ratio').removeClass('off').text('');
        }
    });

    //過關計算器(計算過程)
    $('.btn_calc_run').click(function () {
        $('.formula').slideDown(200);
    });
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
    $(document).bind('click touchend', function (e) {
        var target = $(e.target);
        if (target.closest('.btn_formulaPrompt').length == 0) {
            $('.btn_formulaPrompt').removeClass('on');
            $('.formulaPromptBox').slideUp(200);
        }
    });

    //投注記錄-即時注單(次目錄)
    $('.menuSub li').click(function () {
        $('.menuSub li').removeClass('on');
        $(this).addClass('on');
        function menuSub_nav() {
            $('[id*="open_betRecord"]').hide();
            $('.btn_popupC_arrow').removeClass('on');
            $('.popupC_data').hide();
            $('#btn_popRecord_back').hide();
        }
        switch ($(this).attr('id')) {
            case 'btn_betRecord_cash':
                menuSub_nav();
                $('#open_betRecord_cash').show();
                $('.popRecordC').css('padding-bottom', '0');
                $('#noBet').show();
                $('#noGift').hide();
                break;
            case 'btn_betRecord_immed':
                menuSub_nav();
                $('#open_betRecord_immed').show();
                $('.popRecordC').css('padding-bottom', '');
                $('#noBet').show();
                $('#noGift').hide();
                break;
            case 'btn_betRecord_history':
                menuSub_nav();
                $('#open_betRecord_history,#OBE_step1').show();
                $('#OBE_step2,#OBE_step3,.popRecordB').hide();
                $('#OBE_step1').find('.btn_HT').removeClass('on').next().hide();
                $('#OBE_step1').find('.btn_HT:first').addClass('on').next().show();
                $('.popRecordC').css('padding-bottom', '0');
                $('#noBet').show();
                $('#noGift').hide();
                break;
            case 'btn_betRecord_gift':
                menuSub_nav();
                $('#open_betRecord_gift,#OBG_step1').show();
                $('#OBG_step2,#OBG_step3').hide();
                $('#OBG_step1').find('.btn_HT').removeClass('on').next().hide();
                $('#OBG_step1').find('.btn_HT:first').addClass('on').next().show();
                $('.popRecordC').css('padding-bottom', '0');
                $('#noBet').hide();
                $('#noGift').show();
                break;
            case 'btn_betRecord_pass':
                menuSub_nav();
                $('#open_betRecord_pass').show();
                $('.record_noBet').hide();
                break;
            case 'btn_betRecord_passImmed':
                menuSub_nav();
                $('#open_betRecord_passImmed').show();
                $('.record_noBet').hide();
                break;
            case 'btn_betRecord_passNoBet':
                menuSub_nav();
                $('.record_noBet').show();
                break;
        }
        $('.popRecordC_scroll').scrollTop(0);
        $('.btn_goTop').hide();
    });

    //投注記錄-即時注單(列表展開)
    $('.popRecordC').find('.popupC').on('click', function () {
        $(this).find('.btn_popupC_arrow').toggleClass('on')
        $(this).find('.popupC_data').toggle();
    }).on('click', '.img_refuse,.btn_status_i,.btn_status_iR,.btn_status_iG,.btn_status,.img_check,.cashContent,.btn_sumUpInfo,.btn_link', function (e) {
        e.stopPropagation();
    });

    //投注記錄-兌現步驟
    $('.btn_cash').click(function () {
        $(this).hide().next().show();
    });

    $('.btn_cashConfirm').click(function () {
        $(this).closest('.cashBox').hide().next().show();
        let betInfo_List = $(this).closest('.popupC');
        setTimeout(function () {
            betInfo_List.find('.cashLoad').hide().next().show();
            if (betInfo_List.find('.cashOk').length > 0) {
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

    $('.btn_cashBack').click(function () {
        $(this).closest('.cashBox').hide().next().show();
        let betInfo_List = $(this).closest('.popupC');
        if (betInfo_List.find('.cashStop').length > 0) {
            let cashStop_s = 3;
            setInterval(function () {
                if (cashStop_s > 0) {
                    cashStop_s--
                } else if (cashStop_s == 0 && $('#btn_betRecord_cash').hasClass('on') == true) {
                    betInfo_List.fadeOut(300);
                } else if (cashStop_s == 0) {
                    betInfo_List.find('.cashStop').hide();
                }
            }, 1000);
        }
    });


    //投注記錄-已結算注單(列表展開)
    $('.btn_HT').click(function () {
        if ($(this).next().css('display') == 'none') {
            $('.btn_HT').removeClass('on');
            $('.btn_HT').next().hide();
            $(this).addClass('on');
            $(this).next().show();
        } else {
            $('.btn_HT').removeClass('on');
            $('.btn_HT').next().hide();
        }
    });

    //投注記錄-已結算注單(詳細頁面)
    $('#OBE_step1').find('.historyTable a').not('#historyAdvance a').parents('tr').click(function () {
        $('.popRecordC_scroll').scrollTop(0);
        $('#OBE_step1').hide();
        $('#OBE_step2').show();
        $(this).find('.btn_HT').removeClass('on').next().hide();
        $(this).find('.btn_HT:first').addClass('on').next().show();
        $('#btn_popRecord_back').show();
    });

    $('#OBE_step1').find('#historyAdvance a').parents('tr').click(function () {
        $('.popRecordC_scroll').scrollTop(0);
        $('#OBE_step1').hide();
        $('#OBE_step3,.popRecordB').show();
        $('#OBE_step3').addClass('advance')
        $('.popRecordC').css('padding-bottom', '');
        $('#btn_popRecord_back').show();
    });

    $('#OBE_step2').find('.historyTable a').parents('tr').click(function () {
        $('.popRecordC_scroll').scrollTop(0);
        $('#OBE_step2').hide();
        $('#OBE_step3,.popRecordB').show();
        $('.popRecordC').css('padding-bottom', '');
    });

    //投注記錄-贈禮(詳細頁面)
    $('#OBG_step1').find('.historyTable tr td:nth-child(2) a').parent('td').click(function () {
        $('.popRecordC_scroll').scrollTop(0);
        $('#OBG_step1').hide();
        $('#OBG_step2').show();
        $('#btn_popRecord_back').show();
    });
    $('#OBG_step1').find('.historyTable tr td:nth-child(3) a').parent('td').click(function () {
        $('.popRecordC_scroll').scrollTop(0);
        $('#OBG_step1').hide();
        $('#OBG_step3').show();
        $('#btn_popRecord_back').show();
    });

    $('#btn_popRecord_back').click(function () {
        $('.popRecordC_scroll').scrollTop(0);
        if ($('#OBE_step2').css('display') == 'block') {
            $('#OBE_step2').hide();
            $('#OBE_step1').show();
            $('#OBE_step1').find('.btn_HT').removeClass('on').next().hide();
            $('#OBE_step1').find('.btn_HT:first').addClass('on').next().show();
            $('#btn_popRecord_back').hide();
        } else if ($('#OBE_step3').css('display') == 'block' && $('#OBE_step3.advance').length == 0) {
            $('#OBE_step3,.popRecordB').hide();
            $('#OBE_step2').show();
            $('.popRecordC').find('.btn_popupC_arrow').removeClass('on')
            $('.popRecordC').find('.popupC_data').hide();
            $('.popRecordC').css('padding-bottom', '0');
        } else if ($('#OBE_step3').css('display') == 'block' && $('#OBE_step3.advance').length > 0) {
            $('#OBE_step3,.popRecordB').hide();
            $('#OBE_step3').removeClass('advance');
            $('#OBE_step1').show();
            $('#OBE_step1').find('.btn_HT').removeClass('on').next().hide();
            $('#OBE_step1').find('.btn_HT:first').addClass('on').next().show();
            $('.popRecordC').css('padding-bottom', '0');
            $('#btn_popRecord_back').hide();
        } else if ($('#OBG_step2').css('display') == 'block' || $('#OBG_step3').css('display') == 'block') {
            $('#OBG_step2,#OBG_step3').hide();
            $('#OBG_step1').show();
            $('#OBG_step1').find('.btn_HT').removeClass('on').next().hide();
            $('#OBG_step1').find('.btn_HT:first').addClass('on').next().show();
            $('#btn_popRecord_back').hide();
        } else {
            $('#btn_popRecord_back').hide();
        }
    });

    $('.btn_closeRecord,#btn_passInfo_back').click(function () {
        history.back();
    });

    //加入收藏夾
    $('.btn_star').each(function () {
        if ($('.btn_star').hasClass('on')) {
            $('.btn_favorite').addClass('show');
        }
    });
    $('.btn_star').click(function () {
        $(this).toggleClass('on')
        if ($('.btn_star').hasClass('on')) {
            $('.btn_favorite').addClass('show');
        } else {
            $('.btn_favorite').removeClass('show');
        }
        $('.popFavMsg').finish().fadeIn(800).delay(800).fadeOut(800);
        if ($(this).hasClass('on')) {
            if ($('link[href*="th.css"]').length > 0) {
                $('.popFavMsg_In').text('เก็บสำเร็จ');
            } else if ($('link[href*="vi.css"]').length > 0) {
                $('.popFavMsg_In').text('Thêm mục yêu thích!');
            } else {
                $('.popFavMsg_In').text('收藏成功!');
            }
        } else {
            if ($('link[href*="th.css"]').length > 0) {
                $('.popFavMsg_In').text('ยกเลิกการเก็บ');
            } else if ($('link[href*="vi.css"]').length > 0) {
                $('.popFavMsg_In').text('Bỏ mục yêu thích!');
            } else {
                $('.popFavMsg_In').text('取消收藏!');
            }
        }
    });

    //捲軸point
    $('.leagueR,.ruleTable_R').each(function () {
        var th_w_all = 0
        $(this).find('table:first').find('th').each(function () {
            th_w_all += $(this).width();
        });
        if ($(this).width() + 2 >= th_w_all) {
            $(this).prev('.leagueL_all,.ruleTable_L').find('.scroll_point,.RTL_point').hide();
        } else {
            $(this).prev('.leagueL_all,.ruleTable_L').find('.scroll_point,.RTL_point').show();
        }
    });
    $(window).resize(function () {
        $('.leagueR,.ruleTable_R').each(function () {
            var th_w_all = 0
            $(this).find('table:first').find('th').each(function () {
                th_w_all += $(this).width();
            });
            if ($(this).width() + 2 >= th_w_all) {
                $(this).prev('.leagueL_all,.ruleTable_L').find('.scroll_point,.RTL_point').hide();
            } else {
                $(this).prev('.leagueL_all,.ruleTable_L').find('.scroll_point,.RTL_point').show();
            }
        });
    });
    $('.leagueR,.ruleTable_R').scroll(function () {
        var leagueR_W = $(this).width();
        var leagueR_scrollL = $(this).scrollLeft();
        var th_w_all = 0
        $(this).find('table:first').find('th').each(function () {
            th_w_all += $(this).width();
        });
        $(this).prev('.leagueL_all,.ruleTable_L').find('.scroll_point li,.RTL_point li').removeClass('on');
        if (leagueR_W + leagueR_scrollL + 3 >= th_w_all) {
            $(this).prev('.leagueL_all,.ruleTable_L').find('.scroll_point ul,.RTL_point ul').find('li:last').addClass('on');
        } else {
            $(this).prev('.leagueL_all,.ruleTable_L').find('.scroll_point ul,.RTL_point ul').find('li:first').addClass('on');
        }
    });

    //內頁-抬頭menu
    var viewMoreT;
    function viewMoreT_up() {
        viewMoreT = setTimeout(function () {
            $('.viewMore_T').slideUp();
        }, 2000);
    }
    function viewMoreT_up_stop() {
        clearTimeout(viewMoreT);
    }

    if ($('.btn_VM_scoreBoard').hasClass('on')) {
        $('.viewMore_T').addClass('solid');
    } else if ($('[class*=btn_VM_]').length == 0) {
        $('.viewMore_T').addClass('solid');
    } else {
        $('.viewMore_T').delay(500).slideUp();
    }

    $('.runData').click(function () {
        viewMoreT_up_stop();
        $('.viewMore_T').slideToggle(300);
    }).on('click', '.btn_radarTime', function (e) {
        e.stopPropagation();
    });

    $(document).bind('click touchend', function (e) {
        var target = $(e.target);
        if (target.closest('.viewMore,.liveTv').length == 0 && $('.btn_VM_scoreBoard.on').length == 0) {
            if ($('.scoreBoard').css('display') == 'none') {
                viewMoreT_up_stop();
                $('.viewMore_T,.liveTv_console').slideUp();
                $('.GD_moreDate').hide();
            }
        }
    });

    //內頁-收藏夾
    $('.btn_starMore').click(function () {
        $(this).toggleClass('on');
        $('.popFavMsg').finish().fadeIn(800).delay(800).fadeOut(800);
        if ($(this).hasClass('on')) {
            if ($('link[href*="th.css"]').length > 0) {
                $('.popFavMsg_In').text('เก็บสำเร็จ');
            } else if ($('link[href*="vi.css"]').length > 0) {
                $('.popFavMsg_In').text('Thêm mục yêu thích!');
            } else {
                $('.popFavMsg_In').text('收藏成功!');
            }
        } else {
            if ($('link[href*="th.css"]').length > 0) {
                $('.popFavMsg_In').text('ยกเลิกการเก็บ');
            } else if ($('link[href*="vi.css"]').length > 0) {
                $('.popFavMsg_In').text('Bỏ mục yêu thích!');
            } else {
                $('.popFavMsg_In').text('取消收藏!');
            }
        }
    });

    //視頻
    $('[class*="btn_VM_"]').click(function () {
        $('[class*="btn_VM_"]').removeClass('on');
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
        videoStop();
        switch (true) {
            case $(this).hasClass('btn_VM_scoreBoard'):
                if ($('.scoreBoard').length > 0) {
                    $('.scoreBoard').show().siblings().not('.viewMore_T').hide();
                    $('.viewMore_T').addClass('solid');
                    viewMoreT_up_stop();
                    mcSet();
                } else {
                    mcSet();
                }
                break;
            case $(this).hasClass('btn_VM_runData'):
               if ($('.scoreBoard').length > 0) {
                    $('.scoreBoard').show().siblings().not('.viewMore_T').hide();
                    $('.viewMore_T').addClass('solid');
                    viewMoreT_up_stop();
                    mcSet();
                } else {
                    mcSet();
                }
                break;
            case $(this).hasClass('btn_VM_liveTv'):
                if ($('.liveTv').length > 0) {
                    $('.liveTv').removeClass('liveMc').show().siblings().not('.viewMore_T').hide();
                    $('.viewMore_T').removeClass('solid').slideDown(300);
                    viewMoreT_up_stop();
                    viewMoreT_up();
                    mcSet();
                    if ($('.liveTv_s').css('display') == 'block') {
                        $('.liveTv_s').hide();
                        chatroomClose();
                    }
                } else {
                    mcSet();
                }
                break;
            case $(this).hasClass('btn_VM_liveMc'):
                if ($('.liveTv').length > 0) {
                    $('.liveTv').addClass('liveMc').show().siblings().not('.viewMore_T').hide();
                    $('.viewMore_T').removeClass('solid').slideDown(300);
                    $('.chatroom').addClass('chatroomMc');
                    $('.talk_InForm').closest('[class*="talk_LV"],.talk_USER').hide();
                    viewMoreT_up_stop();
                    viewMoreT_up();
                    if ($('.liveTv_s').css('display') == 'block') {
                        $('.liveTv_s').hide();
                        chatroomClose();
                    }
                } else {
                    $('.chatroom').addClass('chatroomMc');
                    $('.talk_InForm').closest('[class*="talk_LV"],.talk_USER').hide();
                }
                if ($('link[href*="th.css"]').length > 0) {
                    $('.CRB_keyIn_Text_prompt').text('สนทนากับ MC');
                } else if ($('link[href*="vi.css"]').length > 0) {
                    $('.CRB_keyIn_Text_prompt').text('Trò chuyện với MC nào');
                } else if ($('link[href*="bgColor_w.css"]').length > 0) {
                    $('.CRB_keyIn_Text_prompt').text('与主播聊聊吧~');
                } else {
                    $('.CRB_keyIn_Text_prompt').text('與主播聊聊吧~');
                }
                if ($('.CRB_keyIn_Text_NG').css('display') == '-webkit-box' || $('.CRB_keyIn_Text_loading').css('display') == '-webkit-box') {
                    $('.btn_gift').hide();
                }
                break;
            case $(this).hasClass('btn_VM_gameData'):
                if ($('.gameData').length > 0) {
                    $('.gameData').show().siblings().not('.viewMore_T').hide();
                    $('.viewMore_T').removeClass('solid').slideDown(300);
                    viewMoreT_up_stop();
                    viewMoreT_up();
                    mcSet();
                } else {
                    mcSet();
                }
                break;
        }
        $('.liveTv_console,.GD_moreDate').hide();
        btn_CR_slideDown();
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

    //釘-(固定/解除固定，啟動外部捲軸)
    $('.btn_fixed').click(function () {
        $(this).toggleClass('on');
        $('.containerMore').scrollTop(0);
        if ($(this).hasClass('on')) {
            $('.morePage_scroll').removeAttr('style');
            $('.containerMore').removeAttr('style');
        } else {
            $('.morePage_scroll').css('overflow-y', 'auto');
            $('.containerMore').css('overflow', 'visible');
        }
    });

    //{早盤/賽果日期/對戰組合/進階設定(說明)}彈跳視窗
    $('#btn_advanceDay').click(function () {
        $('.menu').addClass('menuDate');
        $('#timelyGame').hide();
        $('body').css('-webkit-overflow-scrolling', 'initial');
    });

    $('.btn_dateMenu').click(function () {
        $('.mask').show();
        $('#popDate').css('display', 'flex');
        $('body').css('-webkit-overflow-scrolling', 'initial');
    });

    $('.NAV_scroll li:first-child').click(function () {
        $('.mask').show();
        $('#setPlay').css('display', 'flex').find('#setPlay_1').show().siblings('.popListBox_scroll').hide();
        $('body').css('-webkit-overflow-scrolling', 'initial');
    });

    $('.NAV_scroll li:nth-child(2)').click(function () {
        $('.mask').show();
        switch (true) {
            case $(this).parent().is('#NAV_2'):
            case $(this).parent().is('#NAV_3'):
            case $(this).parent().is('#NAV_4'):
            case $(this).parent().is('#NAV_5'):
            case $(this).parent().is('#NAV_6'):
                let NAV_Num = '#setPlay_' + $(this).parent().attr('id').split(/_/)[1];
                $('#setPlay').css('display', 'flex').find(NAV_Num).show().siblings('.popListBox_scroll').hide();
                break;
        }
        $('body').css('-webkit-overflow-scrolling', 'initial');
    });

    $('.btn_battleMenu').click(function () {
        $('.mask').show();
        $('#popBattle').css('display', 'flex');
        $('body').css('-webkit-overflow-scrolling', 'initial');
    });



    $('.popLB_list').click(function () {
        $(this).addClass('on').siblings('.popLB_list').removeClass('on');
        switch (true) {
            //早盤/賽果日期
            case $(this).parents('.popList').hasClass('popDate'):
                let advanceDay_Num = $(this).text().split(/-/)[1].split(/\s+/)[0];
                $('.icon_dateMenu').text(advanceDay_Num);
                break;
            //選擇玩法(彈跳視窗)
            case $(this).parent('.popListBox_scroll').is('#setPlay_1'):
                let NAV_Num = '#NAV_' + ($(this).index() + 1),
                    setPlayIn_Num = '#setPlayIn_' + ($(this).index() + 1);
                $(NAV_Num).css('display', 'flex').siblings('.NAV_scroll').hide();
                $('.setPlayIn').hide();
                $(setPlayIn_Num).show();

                //預設列表關閉
                $('[class*="NAV_T_"]').removeClass('on');
                $('.leagueL').removeClass('on').find('.btn_arrow').removeClass('on');
                $('.leagueL').find('.leagueAll ul,.scroll_point > div,.leagueMore li').hide();
                $('.leagueR').find('table:not([class*=NAV_R_])').removeClass('on').find('ul').hide();
                $('.league').removeClass('on').find('.btn_arrow').removeClass('on');
                $('.leagueIn').hide();
                break;
            case $(this).parent('.popListBox_scroll').is('#setPlay_2'):
            case $(this).parent('.popListBox_scroll').is('#setPlay_3'):
            case $(this).parent('.popListBox_scroll').is('#setPlay_4'):
            case $(this).parent('.popListBox_scroll').is('#setPlay_5'):
            case $(this).parent('.popListBox_scroll').is('#setPlay_6'):
                var NAV_Num2 = '#' + $('.NAV_scroll[style*="flex"]').attr('id'),
                    thisName = $($(this).contents().get(0)).text();
                $(NAV_Num2).find('li:nth-child(2)').text(thisName);
                break;
        }
        setTimeout(function () {
            $('.popList').hide();
            $('.mask').removeAttr('style');
            $('body').css('-webkit-overflow-scrolling', 'touch');
        }, 200);
    });

    $('.btn_popListBox_close').click(function () {
        $(this).closest('.popList').hide();
        $('.mask').removeAttr('style');
        $('body').css('-webkit-overflow-scrolling', 'touch');
        //進階設定(說明)-開兩層遮罩，需恢復
        $('.mask_footer').css('background-color', '');
    });

    //(早盤/賽果日期/系統信息/規則次目錄/對戰組合/進階設定(說明))-點空白處消失
    $(document).bind('click touchend', function (e) {
        var target = $(e.target);
        function closePopList() {
            $('.popList').hide();
            $('.mask').removeAttr('style');
            $('body').css('-webkit-overflow-scrolling', 'touch');
        }
        if ($('#popDate').css('display') == 'flex') {
            //早盤日期/賽果日期
            setTimeout(function () {
                if (target.closest('.btn_dateMenu,.popListBox_T,.popListBox_scroll').length == 0) {
                    closePopList();
                }
            }, 50);
        } else if ($('#setPlay').css('display') == 'flex') {
            //選擇玩法
            setTimeout(function () {
                if (target.closest('.NAV_scroll li,.popListBox_T,.popListBox_scroll').length == 0) {
                    closePopList();
                }
            }, 50);
        } else if ($('#popSysMsg').css('display') == 'flex') {
            //系統信息
            setTimeout(function () {
                if (target.closest('input[type="button"],.popListBox_T,.popListBox_In').length == 0) {
                    closePopList();
                }
            }, 50);
        } else if ($('#popRSMenu').css('display') == 'flex') {
            //規則次目錄
            setTimeout(function () {
                if (target.closest('.btn_ruleBox_T,.popListBox_T,.popListBox_scroll').length == 0) {
                    closePopList();
                }
            }, 50);
        } else if ($('#popBattle').css('display') == 'flex') {
            //對戰組合選單
            setTimeout(function () {
                if (target.closest('.btn_battleMenu,.popListBox_T,.popListBox_scroll').length == 0) {
                    closePopList();
                }
            }, 50);
        } else if ($('#popfunSet').css('display') == 'flex') {
            //進階設定(說明)
            setTimeout(function () {
                if (target.closest('.btn_funSet_prompt,.popListBox_T,.popListBox_scroll').length == 0) {
                    $('.mask_footer').css('background-color', '');
                    closePopList();
                }
            }, 50);
        }
    });

    //即時比分+規則 menu
    $('.menuRule a').click(function () {
        $('.menuRule a').removeClass('on');
        $(this).addClass('on');
        if ($('[id*="open_LS_"]').length > 0) {
            var LS_name = $(this).attr('id').split('open_')[1];
            $('.liveScore').hide();
            $('#' + LS_name).show();
        }
    });
    //規則次目錄彈窗
    $('.btn_ruleBox_T').click(function () {
        $('.mask').show();
        $('#popRSMenu').css('display', 'flex');
    });
    $('#popRSMenu .popLB_list').on('click', function () {
        if ($(this).attr('id').length > 0) {
            var RS_name = $(this).attr('id');
            $('.ruleBox').removeClass('on');
            $('#' + RS_name + '_In').addClass('on');
        }
        //規則內表格捲軸
        $('.ruleTable_R').each(function () {
            var th_w_all = 0
            $(this).find('table:first').find('th').each(function () {
                th_w_all += $(this).width();
            });
            if ($(this).width() + 2 >= th_w_all) {
                $(this).prev('.ruleTable_L').find('.RTL_point').hide();
            } else {
                $(this).prev('.ruleTable_L').find('.RTL_point').show();
            }
        });
    });

    //現場轉播-影音控制
    $('.liveTv').on('click', function () {
        viewMoreT_up_stop();
        if ($('.liveTv_console').css('display') == 'none') {
            $('.viewMore_T,.liveTv_console').slideDown(300);
            $('.changeMC').removeClass('on');
        } else {
            $('.viewMore_T,.liveTv_console').slideUp(300);
        }
    }).on('click', '.liveTv_mask,.liveTv_maskB', function () {
        if ($('.liveTv_console').css('display') == 'none') {
            $('.viewMore_T').slideDown(300);
        } else {
            $('.viewMore_T').slideUp(300);
        }
    }).on('click', '.btn_liveTv_unmute,.liveTv_console,.liveTv_mask', function (e) {
        e.stopPropagation();
    });

    $('.btn_liveTv_unmute').click(function () {
        $(this).removeClass('on');
        $('.btn_LT_volume').toggleClass('off');
    });

    $('.btn_LT_volume').click(function () {
        $(this).toggleClass('off');
        if ($('.btn_LT_volume.off').length == 0) {
            $('.btn_liveTv_unmute').removeClass('on');
        }
    });

    $('.liveTv_view,.liveMc_view').click(function () {
        this.paused ? this.play() : this.pause();
        setTimeout(function () {
            $('.viewMore_T,.liveTv_console').not('.solid').slideUp(300);
        }, 3000);
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

    //彈幕設定
    function bulletPopShow(status) {
        let pop = $('.livePopup');
        if (status == 'half') {
            $('#bulletScreen').hide();
            setTimeout(function () {
                $('#bulletScreen').toggleClass('bulletArea_half bulletArea_all').show();
            }, 200);
            if ($('link[href*="th.css"]').length > 0) {
                pop.text('เปิดแชทหน้าจอแบบย่อ');
            } else if ($('link[href*="vi.css"]').length > 0) {
                pop.text('Mở bình luận thu gọn');
            } else if ($('link[href*="bgColor_w.css"]').length > 0) {
                $('.CRB_keyIn_Text_prompt').text('开启精简弹幕');
            } else {
                pop.text('開啟精簡彈幕');
            }
        } else if (status == 'all') {
            $('#bulletScreen').hide();
            setTimeout(function () {
                $('#bulletScreen').toggleClass('bulletArea_half bulletArea_all').show();
            }, 200);
            if ($('link[href*="th.css"]').length > 0) {
                pop.text('เปิดแชทหน้าจอแบบมาตรฐาน');
            } else if ($('link[href*="vi.css"]').length > 0) {
                pop.text('Mở bình luận tiêu chuẩn');
            } else if ($('link[href*="bgColor_w.css"]').length > 0) {
                $('.CRB_keyIn_Text_prompt').text('开启标准弹幕');
            } else {
                pop.text('開啟標準彈幕');
            }
        } else if (status == 'off') {
            $('[class *= "bulletArea_"]').hide();
            if ($('link[href*="th.css"]').length > 0) {
                pop.text('ปิดแชทหน้าจอ');
            } else if ($('link[href*="vi.css"]').length > 0) {
                pop.text('Tắt bình luận');
            } else if ($('link[href*="bgColor_w.css"]').length > 0) {
                $('.CRB_keyIn_Text_prompt').text('关闭弹幕');
            } else {
                pop.text('關閉彈幕');
            }
        }
        pop.finish().fadeIn(800).delay(800).fadeOut(800)
        return pop;
    }
    function bulletMcStatus() {
        if ($('.liveMc.popUp,.liveMc.full').css('display') == 'block') {
            $('.bulletTxt.mc').show();
        } else {
            $('.bulletTxt.mc').hide();
        }
    }
    $('.btn_bulletScreen').click(function () {
        bulletMcStatus();
        if ($(this).hasClass('off')) {
            $(this).removeClass('off').addClass('half');
            bulletPopShow('half');
        } else if ($(this).hasClass('half')) {
            $(this).removeClass('half').addClass('all');
            bulletPopShow('all');
        } else if ($(this).hasClass('all')) {
            $(this).removeClass('all').addClass('off');
            bulletPopShow('off');
        }
    })

    $('.btn_changeMC').click(function () {
        $('.changeMC').toggleClass('on');
    });

    $('.changeMC_list li').click(function () {
        let changeMCBox = $(this).parents('.changeMC');
        $(this).addClass('on').siblings('li').removeClass('on');
        setTimeout(function () {
            changeMCBox.removeClass('on');
        }, 100);
    });

    $('.btn_blockgift').click(function () {
        $(this).toggleClass('off');
        if ($(this).hasClass('off')) {
            $('.liveTv').find('.livePopup').text('屏蔽贈禮動畫').finish().fadeIn(800).delay(800).fadeOut(800);
        } else {
            $('.liveTv').find('.livePopup').text('開啟贈禮動畫').finish().fadeIn(800).delay(800).fadeOut(800);
        }
    });

    $('.btn_MSG').not('.off').click(function () {
        $(this).toggleClass('on');
        if ($(this).hasClass('on')) {
            $('.fullscreen').addClass('fullchatroom');
            $('.chatroom').removeClass('chatroomOpen').addClass('chatroomOpenAll');
            $('.morePage_scroll').removeClass('chatroomOpen');
            $('.chatroom_scroll').scrollTop(0);
            btn_CR_slideDown();
            if ($('.CRB_keyIn_Text_NG').css('display') == '-webkit-box' || $('.CRB_keyIn_Text_loading').css('display') == '-webkit-box') {
                $('.btn_gift').hide();
                $('[class*="talk_LV"],.talk_USER,.talk_AD,.talk_MC,.talkMsg_like,.talkMsg_gift,.btn_CR_slideDown,.chatAnnounce').hide();
            } else if ($('.CRB_keyIn_Text_prompt').css('display') == 'block') {
                $('.CRB_keyIn_Text_prompt').hide();
                $('.CRB_keyIn_Text').show();
            }
        } else {
            $('.fullscreen').removeClass('fullchatroom');
            $('.chatroom').removeClass('chatroomOpenAll')
        }
        submitShow();
    });

    $('.btn_MSG.off').click(function () {
        $(this).toggleClass('on');
    });

    $(document).bind('click touchend', function (e) {
        var target = $(e.target);
        if (target.closest('.btn_MSG.off').length == 0) {
            $('.btn_MSG.off').removeClass('on');
        }
    });

    $('.btn_popupScreen').click(function () {
        if ($('.btn_VM_liveMc').hasClass('on')) {
            $('.liveTv_s').addClass('liveMc_s').show();
        } else {
            $('.liveTv_s').removeClass('liveMc_s').show();
        }
        $('.scoreBoard').show().siblings().not('.viewMore_T').hide();
        $('.viewMore_T').addClass('solid');
        $('.btn_VM_scoreBoard').addClass('on').siblings('[class*="btn_VM_"]').removeClass('on')
        videoStop();
        viewMoreT_up_stop();
        mcSet();
    });

    $('.btn_fullScreen').click(function () {
        SetFullScreenStyle();
        submitShow();
    });

    //設定全螢幕樣式
    function SetFullScreenStyle() {
        if ($('.liveTv').hasClass('full')) {
            //離開全螢幕
            document.body.classList.remove('blackBG');
            $('#innerBlock').add('.mask').add('.header:not(.headerMore)').add('.menu').add('.betList').add('.footer').removeClass('fullscreen fullchatroom');
            $('.liveTv').removeClass('full');
            $('.btn_MSG').removeClass('on');
            $('.chatroom').removeClass('chatroomOpenAll');
            //恢復預設彈幕
            $('#bulletScreen').removeClass('bulletArea_half').addClass('bulletArea_all').hide();
            $('.btn_bulletScreen').removeClass('half all').addClass('off');
            //聊天室恢復關閉狀態            
            $('.menuMore,.containerMore').show();
            $('.morePage_scroll').removeClass('flex0');
            chatroomClose();
        } else {
            //進入全螢幕
            document.body.classList.add('blackBG');
            $('#innerBlock').add('.mask').add('.header:not(.headerMore)').add('.menu').add('.betList').add('.footer').addClass('fullscreen');
            $('.liveTv').addClass('full');
            //$('.chatroom').removeAttr('style');
            $('.menuMore,.containerMore').hide();
            $('.morePage_scroll').addClass('flex0');
        }
    }

    //判斷手機橫式直式
    $(window).bind('orientationchange', function () {
        if (window.orientation == 180 || window.orientation == 0) {
            //直式
            $('#innerBlock').removeClass('fullchatroom');
            $('.btn_MSG').removeClass('on');
        } else if (window.orientation == 90 || window.orientation == -90) {
            //橫式
        }
    });

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

    //數據-判斷是drag拖曳還是click點擊
    $('.gameData .item').on('mousedown', function (evt) {
        $('.gameData .item').on('mouseup mousemove', function handler(evt) {
            if (evt.type === 'mouseup') {
                // click
                viewMoreT_up_stop();
                $('.GD_moreDate').fadeIn(300);
                $('.viewMore_T,.liveTv_console').slideDown(300);
            }
            $('.gameData .item').off('mouseup mousemove', handler);
        });
    });

    $('.GD_moreDate').on('click', function () {
        $('.GD_moreDate').hide();
        $('.viewMore_T,.liveTv_console').slideUp(300);
    });

    //聊天室維護中(尚未展開前)
    if ($('.CRB_keyIn_Text_NG').css('display') == '-webkit-box') {
        $('.chatroom,.chatroom_btm,.btn_MSG').addClass('off');
        $('.btn_chatroomOpen').css('cursor', 'default');
    }

    //聊天室預設(全展開)
    if ($('.chatroom').hasClass('chatroomOpenAll')) {
        $('.btn_chatroom').addClass('on');
        $('.btn_fixed,.menuMore,.containerMore').hide();
        $('.morePage_scroll').addClass('flex0');
    }

    //聊天室禁言
    if ($('.CRB_keyIn_Text_stop').css('display') == '-webkit-box') {
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
    if ($('.CRB_keyIn_Text_loading').css('display') == '-webkit-box') {
        $('.chatroom_btm').addClass('off');
        $('.CR_loading').show();
    }

    //開啟聊天室
    $('.btn_chatroomOpen').on('mousedown touchstart', function (e) {
        e.preventDefault();
        if ($('.CRB_keyIn_Text_NG').css('display') == 'none') {
            $('.btn_chatroom').addClass('active');
        }
    });
    $('.btn_chatroomOpen').on('click touchend', function (e) {
        e.preventDefault();
        $('.btn_chatroom').removeClass('active');
        if ($('.CRB_keyIn_Text_NG').css('display') == 'none') {
            $('.btn_chatroom').addClass('on');
            $('.morePage_scroll,.chatroom').addClass('chatroomOpen');
            if ($('.CRB_keyIn_Text_prompt').css('display') == 'block') {
                $('.CRB_keyIn_Text_prompt').hide();
                $('.CRB_keyIn_Text').show();
            } else if ($('.CRB_keyIn_Text_loading').css('display') == '-webkit-box') {
                $('[class*="talk_LV"],.talk_USER,.talk_AD,.talk_MC,.talkMsg_like,.talkMsg_gift,.btn_CR_slideDown,.chatAnnounce').hide();
            }
            btn_CR_slideDown();
        }
    });

    //判斷聊天室滑至最底按鈕是否顯示
    function btn_CR_slideDown() {
        var chatroomScroll = $('.chatroom_scroll').prop('scrollHeight'),/*捲軸內容高*/
            chatroomH = $('.chatroom_scroll').outerHeight(),/*視窗高*/
            maxCRScrollH = chatroomScroll - chatroomH;/*捲軸可捲動的範圍高*/
        if ($('.chatroom_scroll').scrollTop() >= maxCRScrollH - 5) {
            $('.btn_CR_slideDown').hide();
        } else {
            $('.btn_CR_slideDown').show();
        }
    };

    $('.btn_CR_openAll').on('click touchend', function (e) {
        e.preventDefault();
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
            $('.btn_fixed,.menuMore,.containerMore').show();
            $('.morePage_scroll').removeClass('flex0');
            $('.morePage_scroll,.chatroom').addClass('chatroomOpen');
            $('.chatroom').removeClass('chatroomOpenAll');
            if ($('.btn_fixed.on').length > 0) {
                $('.morePage_scroll').removeAttr('style');
            } else {
                $('.morePage_scroll').css('overflow-y', 'auto');
            }
        } else {
            $(this).addClass('on');
            $('.btn_chatroom').addClass('on');
            $('.btn_fixed,.menuMore,.containerMore').hide();
            $('.morePage_scroll').addClass('flex0');
            $('.morePage_scroll,.chatroom').removeClass('chatroomOpen');
            $('.chatroom').addClass('chatroomOpenAll').removeAttr('style');
            btn_CR_slideDown();
        }
    });
    $(document).bind('click touchend', function (e) {
        var target = $(e.target);
        if (target.closest('.btn_CR_openAll').length == 0) {
            $('.CR_openAll_text').fadeOut(200);
            $('.CR_openAll_textBox').slideUp(200);
        }
    });

    //關閉聊天室(X)
    function chatroomClose() {
        $('.CRB_keyIn_Text').blur();
        $('.btn_chatroom').removeClass('on');
        $('.btn_fixed,.menuMore,.containerMore').show();
        $('.morePage_scroll').removeClass('flex0');
        $('.morePage_scroll').removeClass('chatroomOpen');
        $('.chatroom').removeClass('chatroomOpen chatroomOpenAll').removeAttr('style');
        $('.btn_CR_openAll').removeClass('on');
        if ($('.btn_fixed.on').length > 0) {
            $('.morePage_scroll').removeAttr('style');
        } else {
            $('.morePage_scroll').css('overflow-y', 'auto');
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
            $('.chatroomMask').hide();
        }
    }
    $('.btn_chatroom,.btn_CR_close').on('click touchend', function (e) {
        e.preventDefault();
        chatroomClose();
    });

    //聊天室-屏蔽/解除
    $('.btn_CR_level,.btn_CR_blockade,.btn_CR_remove').click(function () {
        if ($(this).closest('[class*="talk_LV"]').find('.btn_CR_blockade').css('display') == 'none' && $(this).closest('[class*="talk_LV"]').find('.btn_CR_remove').css('display') == 'none') {
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

    //貢獻榜_排名
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

    //@暱稱    
    $('[class*="talk_LV"],.talk_MC').find('.talk_name').click(function () {
        let name = '@' + $(this).text();
        $('.CRB_keyIn_Text').append('<input class="takeName" type="button" value="' + name + '">');
        $('.CRB_keyIn_Text').scrollLeft(99999999);/*讓捲軸靠右*/
        $('.btn_CRB_submit').addClass('on');
    });

    //聊天室(滑到最底)
    $('.chatroom_scroll').scroll(function () {
        var chatroomScroll = $(this).prop('scrollHeight'),/*捲軸內容高*/
            chatroomH = $(this).outerHeight(),/*視窗高*/
            maxCRScrollH = chatroomScroll - chatroomH;/*捲軸可捲動的範圍高*/
        if ($(this).scrollTop() >= maxCRScrollH - 5) {
            $('.btn_CR_slideDown').stop(false, true).fadeOut(200);
        } else {
            $('.btn_CR_slideDown').stop(false, true).fadeIn(200);
        }
    });
    $('.btn_CR_slideDown').click(function () {
        var chatroomScroll = $('.chatroom_scroll').prop('scrollHeight'),/*捲軸內容高*/
            chatroomH = $('.chatroom_scroll').outerHeight(),/*視窗高*/
            maxCRScrollH = chatroomScroll - chatroomH;/*捲軸可捲動的範圍高*/
        $('.chatroom_scroll').animate({
            scrollTop: maxCRScrollH
        }, 500);
    });
    $(window).on('mousewheel', function () {
        $('.chatroom_scroll').stop(false, true);
    });

    //贈禮按鈕
    $('.btn_gift').not('.off').on('click touchend', function (e) {
        e.preventDefault();
        $('#innerBlock').removeClass('keyboard_H');//IOS15-鍵盤底部邊距
        $(this).toggleClass('on');
        if ($(this).hasClass('on')) {
            $('.giftBox').show();
        } else {
            $('.giftBox').hide();
        }
        //小視頻Z軸
        liveTv_s_position();
    });

    $('.btn_giftBox_close').click(function () {
        $('.giftBox').hide();
        $('.btn_gift').removeClass('on');
        //小視頻Z軸
        liveTv_s_position();
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
            $('.giftBox,.giftPopup').hide();
            $('.giftBox_footer').removeClass('bg_black');
            $('.btn_gift').removeClass('on');
            $('.giftResult').fadeIn(200).delay(1000).fadeOut(200);
            giftAT_stop();
            giftAT_play();
        }
    });

    //聊天室(秀單點擊)
    $('.talk_InForm').click(function () {
        let x = $('#CR_open02 .icon_present').html();
        if ($('.fullchatroom').length == 0) {
            $('.btn_present').css('display', 'flex').find('.icon_present').html(++x);
        }
        if ($('.icon_present').html() > 1) {
            $('.clickBet_odds').show();
            $('.clickBet').hide();
        }
    });

    //快捷訊息
    $('.btn_quickMsg').not('.chatroom_btm.off .btn_quickMsg').on('click touchend', function (e) {
        e.preventDefault();
        $(this).toggleClass('on');
        if ($(this).hasClass('on')) {
            $('.quickMsg_scroll').show();
            $('body').css('overflow', 'hidden');//避免IOS因div內捲軸至頂/底時切換至body捲軸，導致div卡頓捲不動
        } else {
            $('.quickMsg_scroll').hide();
            $('body').removeAttr('style');
        }
        //小視頻Z軸
        liveTv_s_position();
    });

    //快捷訊息-判斷是drag拖曳還是click點擊
    $('.quickMsg_scroll li').on('mousedown', function (evt) {
        $('.quickMsg_scroll li').on('mouseup mousemove', function handler(evt) {
            if (evt.type === 'mouseup') {
                // click
                $('.btn_quickMsg').removeClass('on');
                $('.quickMsg_scroll').hide();
                $('body').removeAttr('style');
            }
            $('.quickMsg_scroll li').off('mouseup mousemove', handler);
        });
    });

    $(document).bind('click touchend', function (e) {
        var target = $(e.target);
        if (target.closest('.btn_quickMsg,.quickMsg_scroll').length == 0) {
            $('.btn_quickMsg').removeClass('on');
            $('.quickMsg_scroll').hide();
            $('body').removeAttr('style');
        }
    });

    //聊天室輸入框
    $('.CRB_keyIn_Box').on('click touchend', function () {
        if ($('.chatroom_btm.off').length == 0) {
            $('.btn_chatroom').addClass('displayNone');
            setTimeout(function () {
                //全屏-輸入框(展開)
                chatroom_btm_Full();
            }, 50);
        }
    }).on('click touchend', '.btn_showForm,.btn_faceIcon', function (e) {
        $('.CRB_prompt').hide();
        e.stopPropagation();
    });

    $(document).bind('click touchend', function (e) {
        var target = $(e.target);
        if (target.closest('.chatroom_btm,.showFormBox,.quickMsg_scroll').length == 0) {
            $('.btn_chatroom').removeClass('displayNone');
            $('.CRB_keyIn_Text').scrollLeft(0).blur();
        }
        if (target.closest('.CRB_keyIn_Text img').length > 0) {
            e.preventDefault(); //修正IOS不同版本，系統預設狀態不同
            $('.CRB_keyIn_Text').focus();
        }
        if ($('.CRB_keyIn_Text').is(':focus') == true) {
            $('#innerBlock').not('.fullchatroom').addClass('keyboard_H');//IOS15-鍵盤底部邊距
        } else {
            $('#innerBlock').removeClass('keyboard_H');
        }

        //Android focus
        if (/(Android)/i.test(navigator.userAgent)) {
            if (target.closest('.CRB_keyIn_Text').length == 0) {
                $('.CRB_keyIn_Text').blur();
            } else if (target.closest('.CRB_keyIn_Text .takeName').length > 0) {
                $('.CRB_keyIn_Text').focus();
            }
            if ($('.CRB_keyIn_Text').is(':focus') == true) {
                let chatroomH = $('.headerMore').height() + $('.viewMore').height();
                $('.chatroomOpen.chatroom').css({ 'height': 'calc(100% - ' + chatroomH + 'px)', 'border-top-width': '0', 'transition': '' });
                $('.chatroom_btm').css({ 'position': 'fixed', 'bottom': '0' })
            } else {
                $('.chatroomOpen.chatroom').css({ 'height': '', 'border-top-width': '', 'transition': 'height 0s 0.25s' });
                $('.chatroom_btm').removeAttr('style');
            }
        }
    });

    //Android focus 修正雷達按鈕定位
    $(window).resize(function () {
        let contentH = $('body').height() - $('.chatroom').height() - $('.headerMore').height(),
            position_B = $('.chatroom_btm').height() + 33;
        if (contentH <= $('.runData').height() && $('.CRB_keyIn_Text').is(':focus') == true) {
            $('.btn_radarTime').css({ 'position': 'fixed', 'bottom': position_B });
        } else {
            $('.btn_radarTime').removeAttr('style');
        }
    });
    
    //全屏-輸入框(展開)
    function chatroom_btm_Full() {
        if ($('.liveTv').hasClass('full')) {
            $('.chatroom_btm').addClass('openFull');
            $('.CRB_keyIn_Text_prompt').hide();
            $('.CRB_keyIn_Text').show();
        }
        submitShow();
    }
    //全屏-輸入框(關閉)
    $(document).bind('click touchend', function (e) {
        var target = $(e.target);
        if (target.closest('.chatroom_btm, .quickMsg_scroll').length == 0) {
            $('.chatroom_btm').removeClass('openFull');
            submitShow();
        }
    });

    //聊天室faceIcon
    $('.btn_faceIcon').not('.chatroom_btm.off .btn_faceIcon').on('click touchend', function (e) {
        e.preventDefault();
        $(this).toggleClass('on');
        if ($('.faceIconBox').css('display') == 'none') {
            $('.btn_quickMsg').removeClass('on');
            $('.quickMsg_scroll').hide();
            $('.faceIconBox').show();
            $('body').css('overflow', 'hidden');//避免IOS因div內捲軸至頂/底時切換至body捲軸，導致div卡頓捲不動
        } else {
            $('.faceIconBox').hide();
            $('body').removeAttr('style');
        }
        //全屏-輸入框(展開)
        chatroom_btm_Full();
        //小視頻Z軸
        liveTv_s_position();
    });

    $('.faceIconBox_scroll > ul').hide();
    $('.faceIconBox_scroll > ul:first').show();
    $('.faceIconBox_T > li').removeClass('on');
    $('.faceIconBox_T > li:first').addClass('on');

    $('.faceIconBox_T > li').not('.btn_faceIcon_switch').click(function () {
        $('.faceIconBox_scroll > ul').hide();
        $('.faceIconBox_T > li').removeClass('on');
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

    $('.btn_faceIcon_switch').click(function () {
        $('.faceIconBox_T').toggleClass('open');
    });

    //判斷是drag拖曳還是click點擊
    $('.faceIconBox_scroll li').on('mousedown', function (evt) {
        $('.faceIconBox_scroll li').on('mouseup mousemove', function handler(evt) {
            if (evt.type === 'mouseup') {
                // click
                $('.btn_faceIcon').removeClass('on');
                setTimeout(function () {
                    $('.faceIconBox').hide();
                    $('body').removeAttr('style');
                    //小視頻Z軸
                    liveTv_s_position();
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
            $('body').removeAttr('style');
        }
    });

    //聊天室秀單
    $('.btn_showForm').not('.chatroom_btm.off .btn_showForm').on('click touchend', function (e) {
        e.preventDefault();
        $('#innerBlock').removeClass('keyboard_H');//IOS15-鍵盤底部邊距
        $('.btn_faceIcon,.btn_quickMsg').removeClass('on');
        $('.faceIconBox,.quickMsg_scroll').hide();
        $(this).addClass('on');
        $('.showFormBox').show();
        $('.SFBIn_prompt').show();
        $('.SFBIn_list,.btn_showForm_send').hide();
        $('body').css('overflow', 'hidden');//避免IOS因div內捲軸至頂/底時切換至body捲軸，導致div卡頓捲不動
        //小視頻Z軸
        liveTv_s_position();
    });

    $('.showFormBox_scroll').click(function () {
        if ($('.SFBIn_prompt').length > 0) {
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
        $('body').removeAttr('style');
        //小視頻Z軸
        liveTv_s_position();
    });

    //聊天室秀單-判斷是drag拖曳還是click點擊
    $('.SFBIn_list').on('mousedown', function (evt) {
        $('.SFBIn_list').on('mouseup mousemove', function handler(evt) {
            if (evt.type === 'mouseup') {
                // click
                $(this).toggleClass('on');
                if ($('.SFBIn_list').hasClass('on')) {
                    $('.btn_showForm_send').addClass('on');
                } else {
                    $('.btn_showForm_send').removeClass('on');
                    $('body').removeAttr('style');
                }
            }
            $('.SFBIn_list').off('mouseup mousemove', handler);
        });
    });

    $(document).bind('click touchend', function (e) {
        var target = $(e.target);
        if (target.closest('.showFormBox').length == 0) {
            $('.btn_showForm').removeClass('on');
            $('.showFormBox').hide();
            $('body').removeAttr('style');
        }
    });

    //聊天室-送出鈕(狀態)
    $('.CRB_keyIn_Text').not('.chatroom_btm.off .CRB_keyIn_Text').each(function () {
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
            if (e.keyCode == 8 || e.keyCode == 37 || e.keyCode == 39) {
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
    if ($('link[href*="bgColor_w.css"]').length > 0) {
        CRB_promptFast = '发言速度过快!!';
        CRB_promptBlank = '发送消息不能为空，请输入文字';
        CRB_promptLength = '发送讯息不能超过50字';
    } else {
        CRB_promptFast = '發言速度過快!!';
        CRB_promptBlank = '發送消息不能為空，請輸入文字';
        CRB_promptLength = '發送訊息不能超過50字';
    }

    //送出鈕顯示判斷
    function submitShow() {
        if ($('.CRB_keyIn_Text').html() == '' && $('.fullchatroom').length > 0 && $('.chatroom_btm.openFull').length == 0) {
            $('.CRB_btn').hide();
        } else {
            $('.CRB_btn').show();
        }
    }

    $('.btn_CRB_submit').on('click touchend', function (e) {
        e.preventDefault();
        let textlength = $('.CRB_keyIn_Text').text().length + $('.CRB_keyIn_Text img').length;
        if ($(this).hasClass('on') && $('.CRB_keyIn_Text').html() != '' && textlength <= 50) {
            if (CRB_submit_s == 0) {
                $('.CRB_keyIn_Text').html('').blur();
                submitShow();
                //$('.btn_CRB_submit').removeClass('on');
                CRB_submit_s = 50;
                $('#innerBlock').removeClass('keyboard_H');//IOS15-鍵盤底部邊距
                $('.btn_chatroom').removeClass('displayNone');
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

    //demo預設
    $('.redCard,.redCard_1,.redCard_2').show();
    $('.leagueContent > div .Ball_green').css('visibility', 'visible');

    //(外頁聯盟/賽果)列表-隊伍名稱區塊連結設定
    $('.leagueAll > ul').on('click', function () {
        let leagueNum = $('.leagueAll > ul').index(this);
        let leagueUrl = $('.leagueMore > li').eq(leagueNum).attr('onclick').split("'")[1];
        location.href = leagueUrl;
    }).on('click', '.btn_star', function (e) {
        e.stopPropagation();
    });

    //(外頁波膽/入球數/半全場)列表-隊伍名稱區塊連結設定
    $('caption').on('click', function () {
        let leagueUrl = $('.LT_more').attr('onclick').split("'")[1];
        location.href = leagueUrl;
    }).on('click', '.btn_star', function (e) {
        e.stopPropagation();
    });

    //公告專區
    $('.ANCB_list').click(function () {
        $(this).toggleClass('on').siblings('.ANCB_list').removeClass('on');
    });

    //小視頻(位置)    
    function liveTv_s_position() {
        //下方高度
        let bottomNum, bottomAddNum;
        bottomNum = $('.footer').outerHeight(true) + $('.chatroom_btm').outerHeight(true) + $('.popRecordB').outerHeight(true);
        bottomAddNum = $('.betList[style*="block"]').outerHeight(true);
        if ($('.chatroom_btm').css('display') == 'block' && $('.betList').css('display') == 'block') {
            $('.liveTv_s').css('bottom', bottomAddNum);
        } else {
            $('.liveTv_s').css('bottom', bottomNum + bottomAddNum);
        }
        if ($('#btn_betRecord_cash').hasClass('on') || $('#btn_betRecord_gift').hasClass('on')){
            $('.liveTv_s').css('bottom', '0');
        }
        if ($('#btn_betRecord_history').hasClass('on')) {
            if ($('#OBE_step1').css('display') == 'block' || $('#OBE_step2').css('display') == 'block') {
                $('.liveTv_s').css('bottom', '0');
            }
        }
        //左右
        if ($('.btn_present').css('display') == 'flex') {
            $('.liveTv_s').css({ 'left': '0', 'right': '' });
        } else {
            $('.liveTv_s').css({ 'left': '', 'right': '0' });                     
        }
        //Z軸
        if ($('.showFormBox').css('display') == 'block' || $('.quickMsg_scroll').css('display') == 'block' || $('.faceIconBox').css('display') == 'block' || $('.giftBox').css('display') == 'block') {
            $('.liveTv_s').css('z-index', '-1');
        } else {
            $('.liveTv_s').css('z-index', '6');
        }
    }
    liveTv_s_position();
    $('.liveTv_s').not('#innerBlock ~ .liveTv_s').show();
    $(window).resize(function () {
        liveTv_s_position();
    });
    $(document).bind('click', function () {
        liveTv_s_position();
    });

    $('.liveTv_s').on('click', function () {
        $('.btn_LTs_close').fadeToggle(200);
        $('.LTs_console').fadeToggle(200).css('display','flex');
    }).on('click', '.btn_LTs_close,.btn_LTs_volume,.btn_LTs_refresh,.btn_LTs_backScreen', function (e) {
        e.stopPropagation();
    });

    $(document).bind('click touchend', function (e) {
        var target = $(e.target);
        if (target.closest('.liveTv_s').length == 0) {
            $('.btn_LTs_close,.LTs_console').fadeOut(200);
        }
    });

    $('.btn_LTs_volume').click(function () {
        $(this).toggleClass('off');
    });

    $('.btn_LTs_backScreen').click(function () {
        if ($('.liveMc_s').length > 0) {
            $('.btn_VM_liveMc').addClass('on').siblings('[class*="btn_VM_"]').removeClass('on');
            $('.liveTv').addClass('liveMc').show().siblings().not('.viewMore_T').hide();
            $('.viewMore_T').removeClass('solid').slideDown(300);
            $('.chatroom').addClass('chatroomMc');
            $('.talk_InForm').closest('[class*="talk_LV"],.talk_USER').hide();
            $('.liveTv_s').removeClass('.liveMc_s').hide();
            viewMoreT_up_stop();
            viewMoreT_up();            
        } else {
            $('.btn_VM_liveTv').addClass('on').siblings('[class*="btn_VM_"]').removeClass('on');
            $('.liveTv').removeClass('liveMc').show().siblings().not('.viewMore_T').hide();
            $('.viewMore_T').removeClass('solid').slideDown(300);
            $('.chatroom').removeClass('chatroomMc');
            $('.talk_InForm').closest('[class*="talk_LV"],.talk_USER').show();
            $('.liveTv_s').removeClass('.liveMc_s').hide();
            viewMoreT_up_stop();
            viewMoreT_up();
            mcSet();           
        }        
    });

    $('.btn_LTs_close').click(function () {
        $('.liveTv_s').removeClass('liveMc_s').hide();
    });

    //回到最上層
    function goTop_btm() {
        let bottomH;
        if ($('.footer').length > 0) {
            bottomH = $('.footer').height() + -8 + 'px';
        } else if ($('#open_betRecord_history').css('display') == 'block' && $('.popRecordB').css('display') == 'table' || $('#open_betRecord_passImmed').css('display') == 'block') {
            bottomH = $('.popRecordB').height() + -8 + 'px';
        } else if ($('#open_betRecord_immed,#open_betRecord_pass').css('display') == 'block') {
            bottomH = $('.popRecordB2').height() + -8 + 'px';
        } else {
            bottomH = 0
        }

        if (bottomH == 0) {
            $('.btn_goTop').css('margin-bottom', '');
        } else {
            $('.btn_goTop').css('margin-bottom', bottomH);
        }
    }
    goTop_btm();
    $(window).resize(function () {
        goTop_btm();
    });

    $(document).bind('click', function () {
        goTop_btm();
    });

    $('.popRecordC_scroll,.container').scroll(function () {
        if ($(this).scrollTop() > 0 && $('#pankou_demo').hasClass('on') == false) {
            $('.btn_goTop').fadeIn();
        } else {
            $('.btn_goTop').fadeOut();
        }
    });

    $('.btn_goTop').on('click touchend', function () {
        $('.popRecordC_scroll,.containerRule,.container').animate({
            scrollTop: 0
        }, 300);
    });

    //盤口教程
    function siblingsChange(me) {
        me.addClass('on').siblings().removeClass('on');
    }

    //盤口_主項
    $('.tutorials_nav li').click(function () {
        siblingsChange($(this));
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
        siblingsChange($(this));
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
        $('.containerTutorials').scrollTop(0);
    })

    //盤口_模擬投注
    function clearSib(me) {
        me.parents('.tutorials_main').find('.tutorials_demoList li').removeClass('on');
        me.addClass('on');
    }

    $('.tutorials_demoList li').not('.team_hard').click(function () {
        clearSib($(this));
        let myId = $(`#${$(this).attr('id') + '_in'}.tutorials_demoResult`);
        siblingsChange(myId);
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
//啟動手機active狀態
document.addEventListener('touchstart', function () { }, true);
