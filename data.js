// =====================================================================
//  ВСЁ СОДЕРЖИМОЕ САЙТА — ЗДЕСЬ. Меняйте текст, ссылки и проекты.
//  Языки: en (основной), ja, ru. Текст пишется так: { en: "...", ja: "...", ru: "..." }.
//  Если перевода нет, показывается английский.
//  Картинки кладите в папку img/ и указывайте путь, например "img/engine.png".
//  Если image пустой — показывается сгенерированная обложка.
//  link: куда ведёт карточка. Карточки движка ведут на нужный раздел features.html.
// =====================================================================
window.SITE = {
  defaultLang: "en",
  languages: { en: "EN", ja: "日本語", ru: "RU" },

  name: "エリ",

  // Подписи интерфейса
  ui: {
    "nav.work":      { en: "Work", ja: "作品", ru: "Работы" },
    "nav.features":  { en: "Engine features", ja: "エンジン機能", ru: "Фичи движка" },
    "nav.about":     { en: "About", ja: "プロフィール", ru: "Обо мне" },
    "nav.contact":   { en: "Contact", ja: "連絡先", ru: "Контакты" },
    "hero.tag":      { en: "// portfolio · 2026", ja: "// ポートフォリオ · 2026", ru: "// портфолио · 2026" },
    "hero.hiPre":    { en: "Hi, I'm ", ja: "こんにちは、", ru: "Привет, я " },
    "hero.hiPost":   { en: ".", ja: "です。", ru: "." },
    "cta.work":      { en: "See my work", ja: "作品を見る", ru: "Смотреть работы" },
    "cta.contact":   { en: "Get in touch", ja: "連絡する", ru: "Написать мне" },
    "sec.work":      { en: "Work", ja: "作品", ru: "Работы" },
    "sec.about":     { en: "About", ja: "プロフィール", ru: "Обо мне" },
    "about.stack":   { en: "Tools and tech I work with:", ja: "使っている技術・ツール：", ru: "Стек и инструменты, с которыми работаю:" },
    "sec.contact":   { en: "Contact", ja: "連絡先", ru: "Контакты" },
    "contact.lead":  { en: "Looking for interesting projects and a team. Drop me a line.", ja: "面白いプロジェクトとチームを探しています。お気軽にご連絡ください。", ru: "Ищу интересные проекты и команду. Пишите — отвечу." },
    "filter.all":    { en: "all", ja: "すべて", ru: "все" },
    "footer.made":   { en: "handmade", ja: "手作り", ru: "сделано вручную" },
    "title":         { en: "portfolio", ja: "ポートフォリオ", ru: "портфолио" },
  },

  roles: {
    en: ["my own DirectX 12 engine", "PS1 retro shaders", "HD-2D and stylized rendering", "a no-code scene editor"],
    ja: ["DirectX 12の自作エンジン", "PS1風レトロシェーダ", "HD-2Dとスタイライズ描画", "コード不要のシーンエディタ"],
    ru: ["свой движок на DirectX 12", "PS1-ретро-шейдеры", "HD-2D и стилизация", "редактор сцен без кода"],
  },

  lead: {
    en: "I build EriEngine, a game engine in C++ and DirectX 12: renderer, editor and stylized graphics. Here's what it can do.",
    ja: "C++とDirectX 12でゲームエンジン「EriEngine」を作っています。レンダラー、エディタ、スタイライズ表現。ここではその機能を紹介します。",
    ru: "Пишу игровой движок EriEngine на C++ и DirectX 12: рендер, редактор, стилизованная графика. Здесь — что он умеет.",
  },

  about: {
    en: [
      "EriEngine is my learning-project game engine for 2D and 3D on DirectX 12. It has an editor: you can build a scene with the mouse, and write your own logic in C++ in a single folder.",
      "I love stylized graphics most: the look of the first PlayStation, HD-2D, painterly images. Each style is one button away.",
    ],
    ja: [
      "EriEngineは、DirectX 12で作っている2D/3D対応の学習用ゲームエンジンです。エディタ付きで、シーンはマウスだけで組み立てられ、独自のロジックはひとつのフォルダにC++で書けます。",
      "特に好きなのはスタイライズされたグラフィック。初代PlayStation風、HD-2D、油絵風など、どのスタイルもボタンひとつで切り替えられます。",
    ],
    ru: [
      "EriEngine — мой учебный игровой движок для 2D и 3D на DirectX 12. В нём есть редактор: сцену можно собрать мышью, а свою логику написать на C++ в одной папке.",
      "Больше всего люблю стилизованную графику: вид первой PlayStation, HD-2D, картинку «маслом». Каждый стиль включается одной кнопкой.",
    ],
  },

  skills: ["C++", "DirectX 12", "HLSL", "Dear ImGui", "glTF", "Blender", "Visual Studio 2022", "PowerShell", "GitHub Actions"],

  terminal: {
    project: "EriEngine",
    stack: "C++ · DirectX 12 · HLSL",
    focus:  { en: "stylized rendering", ja: "スタイライズ描画", ru: "стилизованный рендер" },
    status: { en: "open to offers", ja: "お仕事募集中", ru: "ищу предложения" },
  },

  projects: [
    {
      title: "EriEngine",
      tags: ["engine", "C++", "DX12"],
      year: 2026,
      desc: {
        en: "A DirectX 12 engine with an editor: Hierarchy, Inspector, prefabs, undo, and one-click export of a finished game into a single folder.",
        ja: "エディタ付きのDirectX 12エンジン。Hierarchy、Inspector、プレハブ、Undo、完成したゲームをひとつのフォルダに書き出すエクスポート機能。",
        ru: "Движок на DirectX 12 с редактором: Hierarchy, Inspector, префабы, Undo, экспорт готовой игры в одну папку.",
      },
      image: "img/editor_outdoor.png",
      link: "features.html",
    },
    {
      title: { en: "PS1 retro shader", ja: "PS1風レトロシェーダ", ru: "PS1-ретро-шейдер" },
      tags: ["shaders", "retro"],
      year: 2026,
      desc: {
        en: "The first-PlayStation look in HLSL: vertices snapped to a 320×240 grid, wobbly affine textures, 4×4 dithering. Normal render on the left, PS1 on the right.",
        ja: "HLSLで再現した初代PlayStationの見た目。頂点を320×240グリッドにスナップ、揺れるアフィンテクスチャ、4×4ディザリング。左が通常描画、右がPS1風。",
        ru: "Вид первой PlayStation на HLSL: вершины привязаны к сетке 320×240, «плавающие» affine-текстуры, дизеринг 4×4. Слева обычный рендер, справа PS1.",
      },
      image: "img/retrocat.png",
      link: "features.html#ps1-retro",
    },
    {
      title: { en: "HD-2D town", ja: "HD-2Dの町", ru: "HD-2D городок" },
      tags: ["render", "HD-2D"],
      year: 2026,
      desc: {
        en: "Pixel-art sprites in a 3D world, tilt-shift “diorama” blur, changing time of day and fog.",
        ja: "3D空間に置いたドット絵スプライト、ジオラマ風の被写界深度、時間帯と霧の切り替え。",
        ru: "Пиксельные спрайты в 3D-мире, размытие «макета», смена времени суток и тумана.",
      },
      image: "img/hd2d_town.png",
      link: "features.html#hd2d-mood",
    },
    {
      title: "Painterly",
      tags: ["render", "shaders"],
      year: 2026,
      desc: {
        en: "A painted 2.5D illustration: painted textures projected from the camera onto simple 3D, cloud cards and a lens.",
        ja: "絵画風の2.5Dイラスト。カメラから描いたテクスチャをシンプルな3Dに投影し、雲のカードとレンズ効果を重ねています。",
        ru: "Рисованная 2.5D-иллюстрация: нарисованные текстуры проецируются из камеры на простое 3D, плюс карточки облаков и линза.",
      },
      image: "img/painterly.png",
      link: "features.html#painterly",
    },
    {
      title: "Colossus",
      tags: ["game", "render"],
      year: 2026,
      desc: {
        en: "A giant enemy you can climb, an enemy swarm and glowing grass.",
        ja: "よじ登れる巨大な敵、敵の群れ、光る草。",
        ru: "Огромный противник, на которого можно забраться, рой врагов и светящаяся трава.",
      },
      image: "img/colossus.png",
      link: "features.html#colossus",
    },
    {
      title: { en: "Combat", ja: "バトル", ru: "Бой" },
      tags: ["game"],
      year: 2026,
      desc: {
        en: "Combat system demo: arena, enemies, hit effects.",
        ja: "バトルシステムのデモ：アリーナ、敵、ヒットエフェクト。",
        ru: "Демо боевой системы: арена, противники, эффекты ударов.",
      },
      image: "img/combat.png",
      link: "features.html#combat",
    },
    {
      title: "CoinRush",
      tags: ["game"],
      year: 2026,
      desc: {
        en: "A small finished game made with the engine: grab the gold, dodge the red, three lives.",
        ja: "エンジンで作った小さなゲーム。金を集めて赤をよけろ、ライフは3つ。",
        ru: "Маленькая готовая игра на движке: собери золото, увернись от красного, три жизни.",
      },
      image: "img/coinrush.png",
      link: "img/coinrush.png",
    },
  ],

  links: [
    { label: "GitHub", url: "https://github.com/LinsapHurma" },
    // Почта хранится по частям и задом наперёд, чтобы спам-боты не нашли её в коде.
    // Сменить: впишите имя (до @) и домен (после @), каждое задом наперёд.
    { label: { en: "Email", ja: "メール", ru: "Почта" }, email: ["ved.pasnil", "moc.liamg"] },
  ],
};
