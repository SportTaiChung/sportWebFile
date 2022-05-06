$(document).ready(function () {
    var imgName, total, i, location;
    location = 'green/images/';
    imgName = [
        'icon_moreCount.svg',
        'icon_sportMenu_baseball.svg',
        'icon_sportMenu_champion.svg',
        'icon_sportMenu_liveTv.svg',
        'icon_sportMenu_olympic_20210531.svg',
        'icon_sportMenu_other2.svg',
        'icon_sportMenu_time_20210729.svg',
        'icon_sportMenu_UEFA.svg',
        'icon_sportMenu_volleyball.svg',
        'icon_sportMenu_winner.svg',
        'icon_sportMenu_worldCup.svg',
        'icon_noGame.svg',
        'icon_noMore.svg',
        'icon_onInfo.svg',
        'icon_noCash.svg',
        'btn_GDV_scoreBoard.svg',
        'pic_runData_basketball1.jpg',
        'pic_runData_basketballT.jpg',
        'pic_runData_basketballB.jpg',
        'pic_runData_soccer1.jpg',
        'pic_runData_soccerT.jpg',
        'pic_runData_soccerB.jpg',
        'pic_runData_tennis1.jpg',
        'pic_runData_tennisT.jpg',
        'pic_runData_tennisB.jpg',
    ];
    total = imgName.length;
    for (i = 0; i < total; i++) {
        $('img[src*="' + imgName[i] + '"]').attr('src', location + imgName[i]);
    }
    $('img[src*="green.svg"]').attr('src', 'images/icon_noBet.svg');
}); 