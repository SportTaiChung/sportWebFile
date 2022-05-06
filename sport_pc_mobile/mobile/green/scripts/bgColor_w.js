$(document).ready(function () {
    var imgName, total, i, location;
    location = 'bgColor_w/images/';
    imgName = [
        'icon_sportMenu_badminton.svg',
        'icon_sportMenu_baseball.svg',
        'icon_sportMenu_basketball.svg',
        'icon_sportMenu_billiard.svg',
        'icon_sportMenu_champion.svg',
        'icon_sportMenu_fives.svg',
        'icon_sportMenu_football.svg',
        'icon_sportMenu_handball.svg',
        'icon_sportMenu_hockey.svg',
        'icon_sportMenu_olympic_20210531.svg',
        'icon_sportMenu_other2.svg',
        'icon_sportMenu_pcgame_20210630.svg',
        'icon_sportMenu_pingpong.svg',
        'icon_sportMenu_soccer.svg',
        'icon_sportMenu_star.svg',
        'icon_sportMenu_tennis.svg',
        'icon_sportMenu_time_20210729.svg',
        'icon_sportMenu_UEFA.svg',
        'icon_sportMenu_volleyball.svg',
        'icon_sportMenu_waterpolo.svg',
        'icon_sportMenu_worldCup.svg',
        'icon_noGame.svg',
        'icon_noMore.svg',
        'btn_VM_scoreBoard.svg',
        'icon_crown.svg',
        'icon_data.svg',
        'icon_live02.svg',
        'icon_data_live.svg',
        'icon_data_TV_20210305.svg',
        'icon_TV.svg',
        'icon_data_MC_20210817.svg',
        'icon_MC_20210817.svg',
        'icon_warning.svg',
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

    if ($('.menuRule').length == 0) {
        total = imgName.length;
        for (i = 0; i < total; i++) {
            $('img[src*="' + imgName[i] + '"]').attr('src', location + imgName[i]);
        }
    }
}); 