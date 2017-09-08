var res = {
    HelloWorld_png : "res/HelloWorld.png",
    shoot_background_plist:"res/ui/shoot_background.plist",
    shoot_background_png:"res/ui/shoot_background.png",
    shoot_plist:"res/ui/shoot.plist",
    shoot_png:"res/ui/shoot.png",

    achievement_wav :"res/sound/achievement.wav",
    big_spaceship_flying_wav :"res/sound/big_spaceship_flying.wav",

    bullet_wav :"res/sound/bullet.wav",

    button_wav :"res/sound/button.wav",

    enemy1_down_wav :"res/sound/enemy1_down.wav",

    enemy2_down_wav :"res/sound/enemy2_down.wav",

    enemy3_down_wav :"res/sound/enemy3_down.wav",

    game_music_wav :"res/sound/game_music.wav",

    game_over_wav :"res/sound/game_over.wav",
    get_bomb_wav :"res/sound/get_bomb.wav",
    get_double_laser_wav :"res/sound/get_double_laser.wav",
    out_porp_wav :"res/sound/out_porp.wav",
    use_bomb_wav :"res/sound/use_bomb.wav"



};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
