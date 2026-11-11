// =====================================================================
//  Страница фич EriEngine (features.html).
//  У каждой фичи: GIF из media/, 2–3 предложения на трёх языках и прямые
//  ссылки на файлы в репозитории. Пути — от корня репозитория.
//  repo.branch — ветка, на которую ведут ссылки.
// =====================================================================
window.FEATURES = {
  repo: { url: "https://github.com/LinsapHurma/Eri-Engine", branch: "master" },

  ui: {
    "f.title":    { en: "EriEngine — features", ja: "EriEngine — 機能一覧", ru: "EriEngine — фичи" },
    "f.tag":      { en: "// C++ · DirectX 12 · HLSL", ja: "// C++ · DirectX 12 · HLSL", ru: "// C++ · DirectX 12 · HLSL" },
    "f.h1":       { en: "EriEngine features", ja: "EriEngine の機能", ru: "Фичи EriEngine" },
    "f.lead":     {
      en: "Each feature: a GIF straight from the engine, what it does, and direct links to the code. Click a file to land on it.",
      ja: "各機能について、エンジンから直接書き出したGIF、仕組みの説明、コードへの直接リンクを載せています。ファイル名をクリックするとそのコードが開きます。",
      ru: "Для каждой фичи — GIF прямо из движка, что она делает и прямые ссылки на код. Клик по файлу открывает его.",
    },
    "f.back":     { en: "← Portfolio", ja: "← ポートフォリオ", ru: "← Портфолио" },
    "f.code":     { en: "Code", ja: "コード", ru: "Код" },
    "f.private":  {
      en: "The repository is private. Want to read the code? Message me and I'll add you as a collaborator.",
      ja: "リポジトリは非公開です。コードをご覧になりたい方はご連絡ください。コラボレーターとして招待します。",
      ru: "Репозиторий закрытый. Хотите посмотреть код — напишите, и я добавлю вас в коллабораторы.",
    },
    "f.contact":  { en: "Contact", ja: "連絡先", ru: "Контакты" },
    "f.toc":      { en: "Contents", ja: "目次", ru: "Содержание" },
  },

  items: [
    {
      id: "volumetric-fog",
      title: { en: "Volumetric fog", ja: "ボリュメトリックフォグ", ru: "Объёмный туман" },
      gif: "media/fog.gif",
      text: {
        en: "Light becomes visible in the air: shafts from the windows, cones under the lamps. The view frustum is cut into froxels (screen/8 × screen/8 × 64 slices); one compute shader injects density and shadowed light per cell, another integrates them front to back, and a full-screen pass composites the result. In the GIF the effect is switched off and back on.",
        ja: "光が空気中で見えるようになります。窓から差す光の柱や、灯りの下の円錐です。視錐台をフロクセル（画面/8 × 画面/8 × 64層）に分割し、1つ目のコンピュートシェーダで各セルに密度と影付きの光を書き込み、2つ目で手前から奥へ積算し、全画面パスで合成します。GIFでは効果をオフにしてから再びオンにしています。",
        ru: "Свет становится видимым в воздухе: столбы из окон, конусы под лампами. Пирамида вида режется на froxel-ячейки (экран/8 × экран/8 × 64 слоя); один compute-шейдер пишет в каждую плотность и свет с тенью, второй накапливает их от камеры вглубь, полноэкранный проход накладывает результат. В GIF эффект выключается и включается обратно.",
      },
      files: [
        "EriEngine/render/VolumetricFog.cpp",
        "EriEngine/render/VolumetricFog.h",
        "EriEngine/shaders/VolumetricInject.CS.hlsl",
        "EriEngine/shaders/VolumetricIntegrate.CS.hlsl",
        "EriEngine/shaders/VolumetricApply.PS.hlsl",
      ],
    },
    {
      id: "ssr",
      title: { en: "Screen-space reflections", ja: "スクリーンスペース反射（SSR）", ru: "Отражения в экранном пространстве (SSR)" },
      gif: "media/ssr.gif",
      text: {
        en: "A wet floor reflects the columns and windows. From every smooth pixel a ray is marched in screen space along the reflected view direction until it passes behind the depth buffer. Off-screen rays fade out to the sky reflection; smoothness comes from the PBR roughness. In the GIF SSR is switched off and on.",
        ja: "濡れた床に柱や窓が映り込みます。滑らかな画素ごとに、反射した視線方向へスクリーン空間でレイを進め、深度バッファの奥に入った所を反射として採用します。画面外に出たレイは空の反射へフェードし、滑らかさはPBRのラフネスから取ります。GIFではSSRをオフにしてからオンに戻しています。",
        ru: "Мокрый пол отражает колонны и окна. Из каждого гладкого пикселя луч идёт по экрану вдоль отражённого направления взгляда, пока не уйдёт за буфер глубины. Лучи, ушедшие за экран, плавно гаснут до отражения неба; гладкость берётся из PBR-шероховатости. В GIF SSR выключается и включается.",
      },
      files: [
        "EriEngine/render/ScreenSpaceReflections.cpp",
        "EriEngine/render/ScreenSpaceReflections.h",
        "EriEngine/shaders/Ssr.PS.hlsl",
      ],
    },
    {
      id: "ps1-retro",
      title: { en: "PS1 retro shader", ja: "PS1風レトロシェーダ", ru: "PS1-ретро-шейдер" },
      gif: "media/retro.gif",
      text: {
        en: "The first-PlayStation look, reproduced from how its GPU worked. Vertices snap to a virtual 320×240 grid so shapes jitter, UVs are interpolated without perspective correction so textures swim, and colour goes through 4×4 ordered dithering. Left: normal render, right: the same cat in PS1 mode.",
        ja: "初代PlayStationのGPUの仕組みから見た目を再現しています。頂点を仮想の320×240グリッドに吸着させて形を震わせ、UVを遠近補正なしで補間してテクスチャを泳がせ、色には4×4の組織的ディザをかけます。左が通常描画、右が同じ猫のPS1モードです。",
        ru: "Вид первой PlayStation, воспроизведённый по тому, как работал её GPU. Вершины привязаны к виртуальной сетке 320×240, поэтому форма дрожит; UV интерполируются без перспективной коррекции, поэтому текстуры «плывут»; цвет проходит упорядоченный дизеринг 4×4. Слева обычный рендер, справа тот же кот в режиме PS1.",
      },
      files: [
        "EriEngine/shaders/Object3dRetro.VS.hlsl",
        "EriEngine/shaders/Object3dRetro.PS.hlsl",
        "EriEngineSandbox/game/RetroCatScene.cpp",
      ],
    },
    {
      id: "hd2d-mood",
      title: { en: "HD-2D moods and time of day", ja: "HD-2Dのムードと時間帯", ru: "HD-2D: настроения и время суток" },
      gif: "media/mood.gif",
      text: {
        en: "Pixel sprites in a 3D town with a tilt-shift “diorama” depth of field. One Mood sets the time of day, sun, haze, colour grading and lens, and Mood::Blender slides between moods over 2.5 s. TimeOfDay derives light and sky from a single continuous number, so there are no jumps between presets.",
        ja: "3Dの町に置いたドット絵スプライトと、ジオラマ風の被写界深度。1つのMoodが時間帯・太陽・霞・カラーグレーディング・レンズをまとめて決め、Mood::Blenderが2.5秒かけて次のムードへ移ります。TimeOfDayは連続した1つの数値から光と空を導くので、プリセット間で色が飛びません。",
        ru: "Пиксельные спрайты в 3D-городке и глубина резкости в стиле «макета». Один Mood задаёт время суток, солнце, дымку, цветокоррекцию и линзу, а Mood::Blender за 2,5 с плавно переводит одно настроение в другое. TimeOfDay выводит свет и небо из одного непрерывного числа, поэтому между пресетами нет скачков.",
      },
      files: [
        "EriEngine/render/Mood.cpp",
        "EriEngine/render/TimeOfDay.cpp",
        "EriEngine/render/DepthOfField.cpp",
        "EriEngine/shaders/DepthOfField.PS.hlsl",
        "EriEngine/shaders/Sky.PS.hlsl",
        "EriEngineSandbox/game/Hd2dTownScene.cpp",
      ],
    },
    {
      id: "painterly",
      title: { en: "Painterly 2.5D", ja: "絵画風2.5D", ru: "Рисованная 2.5D-сцена" },
      gif: "media/painterly.gif",
      text: {
        en: "A painted illustration that still moves in 3D: simple geometry with painted textures projected from the camera, painted cloud cards, light shafts, embers and a lens (colour fringes, grain, wide angle). The camera drifts slowly and the painting stays aligned. In the GIF the painted look is switched off to show the plain 3D underneath.",
        ja: "3Dとして動く絵画風イラストです。シンプルなジオメトリにカメラから描いたテクスチャを投影し、描いた雲のカード、光の筋、火の粉、レンズ効果（色収差・粒子・広角）を重ねています。カメラがゆっくり動いても絵はずれません。GIFでは絵画表現をオフにして、下にある素の3Dを見せています。",
        ru: "Рисованная иллюстрация, которая при этом движется в 3D: простая геометрия с нарисованными текстурами, спроецированными из камеры, карточки облаков, лучи, искры и линза (цветная кайма, зерно, широкий угол). Камера медленно плавает, а рисунок остаётся на месте. В GIF рисованный вид выключается и видно простое 3D под ним.",
      },
      files: [
        "EriEngineSandbox/game/PainterlyScene.cpp",
        "EriEngine/render/CameraBlur.cpp",
        "EriEngine/shaders/CameraBlur.PS.hlsl",
      ],
    },
    {
      id: "screen-style",
      title: { en: "Comic outline and halftone", ja: "漫画風の輪郭線と網点", ru: "Комикс: контур и полутон" },
      gif: "media/style.gif",
      text: {
        en: "A full-screen comic style: ink lines on edges and halftone dots in the shadows. Edges are found from jumps in depth and normals, so no per-model setup is needed and creases inside an object get lines too — unlike inverted-hull toon outlines. In the GIF the style is switched on and off during a fight.",
        ja: "画面全体を漫画風に描きます。物の縁に線を引き、影を網点で刷ります。縁は深度と法線の段差から検出するので、モデルごとの設定は不要で、背面法の輪郭線と違い物の内側の折れ目にも線が入ります。GIFでは戦闘中にスタイルをオン・オフしています。",
        ru: "Полноэкранный стиль комикса: контур по краям и полутоновые точки в тенях. Края находятся по скачкам глубины и нормалей, поэтому модели не нужно настраивать, а линии появляются и на изломах внутри объекта — в отличие от контура через вывернутую оболочку. В GIF стиль включается и выключается прямо во время боя.",
      },
      files: [
        "EriEngine/render/ScreenStyle.cpp",
        "EriEngine/render/ScreenStyle.h",
        "EriEngine/shaders/StylizeOutline.PS.hlsl",
        "EriEngine/shaders/StylizeHalftone.PS.hlsl",
      ],
    },
    {
      id: "combat",
      title: { en: "Combat system", ja: "バトルシステム", ru: "Боевая система" },
      gif: "media/combat.gif",
      text: {
        en: "Moves with active and cancel windows chain into combos through an input buffer; hit stop freezes game time on impact. Hits make bodies flash, squash and get knocked back, and a poise meter decides between a flinch and a broken stance. The scene also runs clustered lighting (dozens of lamps) and TAA.",
        ja: "攻撃判定とキャンセル可能区間を持つ技を、入力バッファ経由でコンボにつなげます。ヒットストップで当たった瞬間にゲーム時間を止めます。被弾した体は白く光り、潰れ、吹き飛び、体幹ゲージがひるみか体勢崩しかを決めます。このシーンではクラスタードライティング（数十個のライト）とTAAも動いています。",
        ru: "Приёмы с окнами атаки и отмены связываются в комбо через буфер ввода; hit stop замораживает игровое время в момент удара. От удара тело вспыхивает, сжимается и отлетает, а шкала стойки решает: вздрог или срыв стойки. В этой же сцене работают кластерное освещение (десятки ламп) и TAA.",
      },
      files: [
        "EriEngine/combat/ActionRunner.cpp",
        "EriEngine/combat/HitFeedback.cpp",
        "EriEngine/combat/Poise.cpp",
        "EriEngine/combat/LockOn.cpp",
        "EriEngine/3d/BladeTrail.cpp",
        "EriEngine/render/ClusteredLights.cpp",
        "EriEngine/render/TemporalAA.cpp",
        "EriEngineSandbox/game/CombatDemoScene.cpp",
      ],
    },
    {
      id: "water",
      title: { en: "Gerstner water", ja: "ゲルストナー波の水面", ru: "Вода на волнах Герстнера" },
      gif: "media/water.gif",
      text: {
        en: "A flat grid moved by four Gerstner waves: points travel in small circles, so crests are sharp and troughs wide, like real sea waves. Normals come from the same formula, so lighting follows every wave exactly, and crates float on the surface. Presets switch between sea, lake and pool.",
        ja: "平らなグリッドを4つのゲルストナー波で動かします。頂点が小さな円を描くので、本物の海のように波頭は鋭く谷は広くなります。法線も同じ式から求めるので光が波に正確に追従し、箱が水面に浮かびます。プリセットで海・湖・プールを切り替えます。",
        ru: "Плоскую сетку двигают четыре волны Герстнера: точки ходят по маленьким кругам, поэтому гребни острые, а впадины широкие, как у настоящего моря. Нормаль считается из той же формулы, свет точно следует за волной, а ящики качаются на поверхности. Пресеты переключают море, озеро и бассейн.",
      },
      files: [
        "EriEngine/shaders/Water.VS.hlsl",
        "EriEngine/shaders/Water.PS.hlsl",
        "EriEngine/3d/WaterObject.cpp",
        "EriEngineSandbox/game/WaterDemoScene.cpp",
      ],
    },
    {
      id: "colossus",
      title: { en: "Night forest: grass, swarm, giant", ja: "夜の森：草・群れ・巨人", ru: "Ночной лес: трава, рой, великан" },
      gif: "media/colossus.gif",
      text: {
        en: "A glowing night forest where only a circle around the hero is visible. Grass is one blade mesh drawn many times with instancing, each copy with its own position, turn, height and tint, swaying in the wind in the vertex shader. A swarm of lights follows the hero and a slow stone giant walks by.",
        ja: "主人公のまわりの円だけが見える、光る夜の森です。草は1枚の葉のメッシュをインスタンシングで大量に描き、コピーごとに位置・向き・高さ・色味を変え、頂点シェーダで風に揺らしています。光の群れが主人公を追い、石の巨人がゆっくり歩いていきます。",
        ru: "Светящийся ночной лес, где виден только круг вокруг героя. Трава — одна травинка, нарисованная множество раз через инстансинг: у каждой копии своё место, поворот, высота и оттенок, а качает её на ветру вершинный шейдер. За героем летит рой огоньков, мимо медленно шагает каменный великан.",
      },
      files: [
        "EriEngine/shaders/Grass.VS.hlsl",
        "EriEngine/shaders/Grass.PS.hlsl",
        "EriEngine/3d/TerrainObject.cpp",
        "EriEngineSandbox/game/ColossusScene.cpp",
      ],
    },
    {
      id: "replay-capture",
      title: { en: "How these GIFs were made: input replay", ja: "このGIFの作り方：入力リプレイ", ru: "Как сделаны эти GIF: реплей ввода" },
      gif: "",
      text: {
        en: "Every GIF on this page was rendered by the engine itself. A replay file scripts the key presses (toggle an effect at frame 120), -fixedstep makes every run identical, and -capture saves frame N to PNG. The same replay system records real play sessions, so a bug that happened once can be watched again frame by frame.",
        ja: "このページのGIFはすべてエンジン自身が書き出しました。リプレイファイルでキー入力を指定し（120フレーム目で効果を切り替えるなど）、-fixedstepで毎回の実行を同一にし、-captureでNフレーム目をPNGに保存します。同じリプレイの仕組みで実際のプレイも記録できるので、一度だけ起きたバグをフレーム単位で見直せます。",
        ru: "Все GIF на этой странице отрендерил сам движок. Файл реплея задаёт нажатия клавиш (переключить эффект на 120-м кадре), -fixedstep делает каждый запуск одинаковым, а -capture сохраняет N-й кадр в PNG. Та же система записывает настоящую игру, поэтому баг, случившийся один раз, можно пересмотреть кадр за кадром.",
      },
      files: [
        "EriEngine/base/InputReplay.cpp",
        "EriEngine/base/InputReplay.h",
        "EriEngine/EriEngine.cpp",
        "tools/check.ps1",
      ],
    },
  ],
};
