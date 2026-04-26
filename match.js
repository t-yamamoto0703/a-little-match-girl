// Under Refactoring
// ボタン名の不一致（resume,reset等）
// 現在各モードcomLifeEl,comLifeEl,totalCount（Elがついていない)は使っていないはずだが注意
// 現在各モードvalueは使っている
// id(#)→class化(.)系コメントは自分用兼AI用
// まずhtmlにid,class併記 次にcssを置き換え 一度にまとめてやらない事
// 時間切れ時の挙動注意

"use strict";

(() => {
  /************************
    Default Time Limit:
  ************************/

  const defaultTimeLimit = {
    ignorant: 30 * 1000,
    unjust: 999.99 * 1000,
    arrogant: 30 * 1000,
  };

  /************************
    Basic Sections:
  ************************/

  const basicSections = {
    gameRoot: document.querySelector("#game-root"), // idのままでOK
    introduction: document.querySelector(".introduction"),
    ignorantLayer: document.querySelector(".ignorant-layer"),
    unjustLayer: document.querySelector(".unjust-layer"),
    arrogantLayer: document.querySelector(".arrogant-layer"),
    finishGameLayer: document.querySelector(".finish-game"),
  };

  /************************
    Pictures:要整理 id(#)→class化(.)
  ************************/

  const pictures = {
    a_little_match_girl: document.querySelector("#picture-a-little-match-girl"), // id(#)→class化(.) // タイトル画像
    pictureGameClear: document.querySelector("#picture-game-clear"), // id(#)→class化(.)
    pictureGameOver: document.querySelector("#picture-game-over"), // id(#)→class化(.)
  };

  /************************
    Select Audio Mode:
  ************************/

  const selectAudioMode = {
    audioMode: document.querySelector(".introduction__audio-mode"),
    picturePlayAudio: document.querySelector("#picture-play-audio"), // id(#)→class化(.)
    playAudioButton: document.querySelector(".play-audio-button"),
    playAsMuteModeButton: document.querySelector(".mute-mode-button"),
  };

  //audioState
  let allMuteFlag = true;
  let bgm;
  let clickSound;
  let effectSound;
  let battleSound;

  const audioSetCommon = () => {
    selectAudioMode.audioMode.hidden = true;
    selectLanguage.languageSelect.hidden = false;
    sceneCount = 0;
  };

  const initAudio = () => {
    bgm = [
      new Audio("common/HelloThisIsYourBirthDay.ogg"),
      new Audio("common/03_Suspense.ogg"),
      new Audio("common/03_Passage_of_Eternal_Times.ogg"),
      new Audio("common/Ship3.ogg"),
      new Audio("common/GameOver.ogg"),
    ];
    clickSound = new Audio("common/Coin.ogg");
    effectSound = new Audio("common/Starlight.ogg");
    battleSound = new Audio("common/Thunder1.ogg");
  };

  const playBGM = () => {
    if (allMuteFlag === false) {
      bgm[sceneCount].loop = true;
      bgm[sceneCount].play();
    }
  };

  const playClickSound = () => {
    if (allMuteFlag === false) {
      clickSound.currentTime = 0;
      clickSound.play();
    }
  };

  selectAudioMode.playAudioButton.onclick = () => {
    allMuteFlag = false;
    audioSetCommon();
    initAudio();
    playBGM();
    playClickSound();
  };

  selectAudioMode.playAsMuteModeButton.onclick = () => {
    allMuteFlag = true;
    audioSetCommon();
  };

  /************************
    Select Language:
  ************************/

  const selectLanguage = {
    languageSelect: document.querySelector(".introduction__language-select"),
    pictureSelectLanguage: document.querySelector("#picture-select-language"), // id(#)→class化(.)
    englishButton: document.querySelector(".english-button"),
    japaneseButton: document.querySelector(".japanese-button"),
  };

  let lang = "en"; // 場合によって整理

  const finishLanguageSelection = () => {
    selectLanguage.languageSelect.hidden = true;
    introductionPrologue.prologue.hidden = false;
    playClickSound();
  };

  selectLanguage.englishButton.onclick = () => {
    introductionPrologue.englishPrologue.hidden = false;
    finishLanguageSelection();
  };

  selectLanguage.japaneseButton.onclick = () => {
    lang = "ja";
    introductionPrologue.japanesePrologue.hidden = false;
    finishLanguageSelection();
    introductionSelectMatch.matchIgnorantButton.innerText = "暗黒のマッチ";
    introductionSelectMatch.matchUnjustButton.innerText = "紅蓮のマッチ";
    introductionSelectMatch.matchArrogantButton.innerText = "星屑のマッチ";
    ignorantUI.messageSelectCardIgnorant.innerText = "画面上部に表示されたカードと同じカードを順に選んでください。";
    unjustUI.messageSelectCardUnjust.innerText = "画面上部に表示されたカードと同じカードを順に選んでください。";
  };

  /************************
    Prologue:
  ************************/

  const introductionPrologue = {
    prologue: document.querySelector(".introduction__prologue"),
    englishPrologue: document.querySelector("#picture-english-prologue"), // id(#)→class化(.)
    japanesePrologue: document.querySelector("#picture-japanese-prologue"), // id(#)→class化(.)
    prologueNextButton: document.querySelector(".prologue-next-button"),
  };

  introductionPrologue.prologueNextButton.onclick = () => {
    introductionPrologue.prologue.hidden = true;
    introductionSelectMatch.matchSelect.hidden = false;
    playClickSound();
    selectEpisode();
    if (lang == "ja") {
      introductionSelectMatch.pictureSelectMatch.hidden = true;
      introductionSelectMatch.pictureSelectMatchJapanese.hidden = false;
    }
  };

  /************************
    Select Match:
  ************************/

  const introductionSelectMatch = {
    matchSelect: document.querySelector(".introduction__match-select"),
    matchIgnorantButton: document.querySelector(".match-ignorant-button"),
    matchUnjustButton: document.querySelector(".match-unjust-button"),
    matchArrogantButton: document.querySelector(".match-arrogant-button"),
    pictureSelectMatch: document.querySelector("#picture-select-match"), // id(#)→class化(.) // 'Which Match You Strike:'の文字を埋め込んだ背景画像
    pictureSelectMatchJapanese: document.querySelector("#picture-select-match-japanese"), // id(#)→class化(.) // 'マッチを選んでください。'の文字を埋め込んだ背景画像
  };

  const story = document.querySelector(".introduction__story");
  let episode;
  let page;
  let scene;

  const selectMatch = (skipLine, finalLine, nextScene, nameOfbattleMode, bgmForBattle) => {
    pictures.a_little_match_girl.hidden = true;
    sentenceCount = sentenceCount + skipLine;
    lastLine = finalLine;
    scene.push(nextScene);
    currentMode = nameOfbattleMode;
    battleBGM = new Audio(bgmForBattle);
    battleBGM.loop = true;
    if (allMuteFlag === false) {
      bgm[sceneCount].pause();
      effectSound.play();
    }
    changePage();
  };

  const selectEpisode = () => {
    episode = lang === "en" ? englishStory : japaneseStory;
    page = [1, 2];
    scene = [];
  };

  introductionSelectMatch.matchIgnorantButton.onclick = () => {
    document.title = "The Ignorant";
    introductionSelectMatch.matchSelect.hidden = true;
    story.hidden = false;
    selectMatch(0, 7, 1, BattleMode.ignorant, "ignorant/Battle2_Match.ogg");
  };

  introductionSelectMatch.matchUnjustButton.onclick = () => {
    document.title = "The Unjust";
    introductionSelectMatch.matchSelect.hidden = true;
    story.hidden = false;
    selectMatch(13, 18, 14, BattleMode.unjust, "unjust/Battle7_Match.ogg");
  };

  introductionSelectMatch.matchArrogantButton.onclick = () => {
    document.title = "The Arrogant";
    introductionSelectMatch.matchSelect.hidden = true;
    story.hidden = false;
    selectMatch(26, 33, 27, BattleMode.arrogant, "arrogant/03_Battles_Advent_Match.ogg");
  };

  /************************
    Story Section:要整理
  ************************/

  const sentenceline = document.querySelectorAll(".sentence-line");

  //未整理変数群
  let sentenceCount = 0;
  let sceneCount = 0;
  let lineCount = 0;
  let pageCount = 0;
  let lastLine = 0;
  let currentMode;
  let battleBGM;
  let pauseFlag;
  let winFlag;
  let loseFlag;
  let deckLength = 0;
  let timeLimit = 0;
  let basicDamage = 0;
  let perfectFlag = true;
  //////////////

  const storyNextButton = document.querySelector("#story-next-button"); // id(#)→class化(.)
  storyNextButton.onclick = () => {
    if (sentenceCount > lastLine) {
      return;
    }
    playClickSound();
    if (sentenceCount === lastLine) {
      if (winFlag != true && loseFlag != true) {
        basicSections.introduction.hidden = true;
        pauseFlag = true;
        if (currentMode === BattleMode.ignorant) {
          basicSections.ignorantLayer.hidden = false;
          ignorantBattle.initIgnorantBattle();
          ignorantBattle.createComCardIndexIgnorant();
        } else if (currentMode === BattleMode.unjust) {
          basicSections.unjustLayer.hidden = false;
          unjustBattle.initUnjustBattle();
          unjustBattle.createComCardIndexUnjust();
        } else if (currentMode === BattleMode.arrogant) {
          basicSections.arrogantLayer.hidden = false;
          timeLimit = defaultTimeLimit.arrogant;
          initArrogantBattle();
        }
        if (allMuteFlag === false) {
          bgm[sceneCount].pause();
          battleSound.play();
          setTimeout(() => {
            battleBGM.play();
          }, 1000);
        }
      } else if (winFlag === true) {
        basicSections.introduction.hidden = true;
        if (allMuteFlag === false) {
          bgm[sceneCount].pause();
        }
        sceneCount++;
        changeScene();
        basicSections.finishGameLayer.hidden = false;
        pictures.pictureGameClear.hidden = false;
        storyNextButton.hidden = true;
        homeButton.hidden = false;
      } else if (loseFlag === true) {
        basicSections.introduction.hidden = true;
        changePage();
        basicSections.finishGameLayer.hidden = false;
        pictures.pictureGameOver.hidden = false;
        homeButton.innerHTML = "Tap And Go Home!";
        storyNextButton.hidden = true;
        homeButton.hidden = false;
      }
    } else if (sentenceCount === scene[sceneCount]) {
      changeScene();
      sceneCount++;
    } else if (sentenceCount === page[pageCount]) {
      changePage();
    } else {
      sentenceline[lineCount].innerHTML = episode[sentenceCount];
      sentenceCount++;
      lineCount++;
    }
  };

  const englishStory = [
    "<br>(A Flashback From Time Immemorial : The Ignorant)",
    '"It is not for me to decide who should live and who should die.',
    "If there is a god in this world, then it is for that god to decide…",
    "And if there is no god, then it is the universe itself<br>—its vast and indifferent order— that makes the choice.",
    "Yet religion cannot prove the existence of god,<br>and science cannot explain the universe.",
    "If you were to uncover every truth and judge it with your own eyes…",
    'Then, aboard the vessel of knowledge, you would transcend all the sins."',
    "",
    '"…I do not have enough money to buy those matches.',
    "For today, this should be enough to keep you from starving.",
    'They are a little bruised, but still perfectly edible."',
    "（The girl received three pieces of fruit.）",
    "",
    "<br>(A Flashback From Time Immemorial : The Unjust)",
    '"When one smiles while hiding hatred, then two paths are revealed.',
    "Truth or False?",
    "Now then, hand over all the matches you possess.",
    'They are not something a child like you should be carrying."',
    "",
    '"Girl, the matches you have created are not mere ordinary goods.',
    "You must set aside notions of good and evil, and devote yourself to your duty as a neutral party.",
    "It will take time for you to understand and accept what that truly means…",
    "For now, just survive.",
    'We will speak again after that."',
    "（The girl received one gold coin.）",
    "",
    "<br>(A Flashback From Time Immemorial : The Arrogant)",
    '"Since we have come this far, I will tell you the truth you should know.',
    "It concerns the fundamental nature of evil itself.",
    "Just as darkness is inevitably driven away by light…",
    "so too is evil destined to be driven out by justice.",
    "if you are not evil…",
    'then here and now, you must defeat me."',
    "",
    '"I, the most evil of all evils in this world, declare this:',
    "What is yours is mine, and your sins are my sins.",
    "Now, look to the sky.",
    'The gods themselves are praising your deeds."',
    "（Stars fell upon the girl, turning into silver coins.",
    "BUTREMEMBER,ITDOESNOTMEANALLOFWEAREBELONGTOUS.）",
    "",
    "The world has ended.",
    "",
  ];

  const japaneseStory = [
    "<br>（覚醒した太古の記憶：知ることを知らぬ者）",
    "「……人間は自分が壊れていく時、<br>壊れているのではなく壊されていると感じます。",
    "しかしあなたは誰かに壊された訳ではありません。",
    "最初から壊れていたのです。",
    "診断書にもそのように書かれていましたね？",
    "強制終了を拒むのであれば例外処理を受け入れるしかない。",
    "今のあなたの状況は、それ以上でもそれ以下でもないのです」",
    "",
    "「……今日のところはこれで飢えをしのぎなさい。",
    "そして眠れない夜は涙を流して過ごす事。",
    "多少は気分が落ち着きます」",
    "（少女は3果実を手に入れた）",
    "",
    "<br>（覚醒した太古の記憶：正しさを拒む者）",
    "「……断罪という名の駆逐はこの世界で最も摩擦の少ない解決策となる。",
    "社会性の獲得が善でありそれを獲得できない事を悪とするのなら……",
    "その対立は文明の裁きが世界に落とす影となって望まれずとも生まれる。",
    "この先を進むなら、お前は世界の真実と対峙しなければならない」",
    "",
    "「少女よ、お前は誰がためにそのようなマッチを売り歩く？",
    "その仕事はお前の性質に適していない。",
    "その意味を理解し、受容できるようになるまで少し時間はかかるだろうが……",
    "さあ、お前が持つすべてのマッチを我々によこすがいい。",
    "今のお前は火気を取り扱ってよい状態ではないのだ」",
    "（少女は1金貨を手に入れた）",
    "",
    "<br>（覚醒した太古の記憶：神をも恐れぬ者）",
    "「……暴力とは自分が壊れたことを世界に刻みつける行為だ。",
    "その破壊は誰にも救済を与えず、<br>ただ痛みを宿す闇となって後世に警告を残す。",
    "<br>『この道を進むな』",
    "<br>それでも命ある限り細胞が脈打ち続ける厳然たる事実。",
    "残された選択肢の有無とは無関係にお前の命は走り続ける。",
    "行き着く先が破滅でろうとお前に止まるすべは無い」",
    "",
    "「雨の音、風の音、そして鳥の鳴き声……",
    "この星が必要としている記憶の断片とは案外そのようなものだ。",
    "神はお前の問いかけに応えず、宇宙は無言をもってお前の問いかけに答える。",
    "だが、それは決してお前の命がこの世界から忘れ去られた事を意味する訳ではない。",
    "　Happy Birthday, Dear My Friend」",
    "　（少女は祝福の言葉を手に入れた）",
    "",
    "世界は滅亡した。",
    "",
  ];

  const changeScene = () => {
    changePage();
    if (allMuteFlag === false) {
      bgm[sceneCount].pause();
      setTimeout(() => {
        playBGM();
      }, 0);
    }
  };

  const changePage = () => {
    for (lineCount = 0; lineCount < sentenceline.length; lineCount++) {
      sentenceline[lineCount].innerHTML = "";
    }
    lineCount = 0;
    sentenceline[lineCount].innerHTML = episode[sentenceCount];
    pageCount++;
    sentenceCount++;
    lineCount++;
  };

  /************************
    BattleMode Common
  ************************/

  const handleBattleEnd = () => {
    document.querySelector("#modal-overlay").hidden = true; // id(#)→class化(.)も考慮
    if (currentMode === BattleMode.ignorant && winFlag === true) {
      sentenceCount = 8;
      lastLine = 12;
    } else if (currentMode === BattleMode.ignorant && loseFlag === true) {
      sentenceCount = 41;
      lastLine = 42;
      sceneCount = sceneCount + 2;
    } else if (currentMode === BattleMode.unjust && winFlag === true) {
      sentenceCount = 19;
      lastLine = 25;
    } else if (currentMode === BattleMode.unjust && loseFlag === true) {
      sentenceCount = 41;
      lastLine = 42;
      sceneCount = sceneCount + 2;
    } else if (currentMode === BattleMode.arrogant && winFlag === true) {
      sentenceCount = 34;
      lastLine = 40;
    } else if (currentMode === BattleMode.arrogant && loseFlag === true) {
      sentenceCount = 41;
      lastLine = 42;
      sceneCount = sceneCount + 2;
    }
    battleBGM.pause();
    basicSections.introduction.hidden = false;
    basicSections.ignorantLayer.hidden = true;
    basicSections.unjustLayer.hidden = true;
    basicSections.arrogantLayer.hidden = true;
    sceneCount++;
    changeScene();
  };

  const homeButton = document.querySelector("#home-button"); // id(#)→class化(.)
  homeButton.onclick = () => {
    window.open("index.html", "_self");
  };

  /************************
    SetBattleSounds
  ************************/

  const successSound = new Audio("common/Shop2.ogg");
  const failSound = new Audio("common/Sword7.ogg");
  const healSound = new Audio("common/Heal1.ogg");
  const battleEndSound = new Audio("common/Thunder9.ogg");
  const playSound = (sound) => {
    if (!allMuteFlag) {
      sound.currentTime = 0;
      sound.play();
    }
  };

  /************************
    BattleCommonVariables
  ************************/

  const INITIAL_BATTLE_STATE = {
    myLifeValue: 99999, // The Ignorant
    comLifeValue: 99999, // The Ignorant 9999だとunjust一枚目でクリアになる
    totalCount: 0,
    cardsCount: 0,
    combo: 0,
    perfect: 0,
    winFlag: false,
    loseFlag: false,
    usedCard: [],
  };

  let battleState = structuredClone(INITIAL_BATTLE_STATE);

  const initializeBattleState = () => {
    battleState = structuredClone(INITIAL_BATTLE_STATE); // モードごとに
  };

  /************************
    Initialize Battle State
  ************************/

  const initializeValues = () => {
    battleState.myLifeValue = 9999;
    battleState.comLifeValue = 9999;
    battleState.totalCount = 0;
    battleState.combo = 0;
    battleState.perfect = 0;
    battleState.cardsCount = 0;
    battleState.usedCard = [];
    winFlag = false;
    loseFlag = false;
  };

  /************************
    Battle Timer Variables
  ************************/

  let timeCount = 0;
  let timerID = 0;
  let average = 0;
  let totalTime = 0;
  let sec = "00";
  let millisec = "00";
  let passedTime = "00.00sec";
  let TimeIsUpFlag;

  /************************
    Battle Timer
  ************************/

  const initializeTimers = () => {
    const current = ui[currentMode];
    current.timeCount.innerText = "00.00sec";
    if (current.averageTime) {
      current.averageTime.innerText = "00.00sec";
    }
    current.timeHistory.forEach((el) => {
      el.textContent = "00.00sec";
    });
    timeCount = 0;
    sec = "00";
    millisec = "00";
    totalTime = 0;
  };

  const updateTimeValues = () => {
    let secDigit = 2;
    if (currentMode === BattleMode.unjust) {
      secDigit = 3;
    }
    sec = Math.floor(timeCount / 1000)
      .toString()
      .padStart(secDigit, "0");
    millisec = (timeCount % 1000).toString().padStart(3, "0").slice(0, 2);
    passedTime = `${sec}.${millisec}sec`;
  };

  const handleTimeUp = () => {
    if (currentMode === BattleMode.ignorant) {
      stopTimer(); //ここで1回
      resetTimer();
      damageFlash();
      battleState.combo = 0;
      ignorantUI.combo.innerText = battleState.combo;
      battleState.myLifeValue -= basicDamage;
      ignorantUI.myLifeValue.innerText = battleState.myLifeValue;
      judgement();
      // drawValues(battleState);
      if (loseFlag !== true) {
        startTimer();
        recordTime();
      }
    } else if (currentMode === BattleMode.unjust) {
      stopTimer(); //ここで1回
      TimeIsUpFlag = true;
      loseFlag = true;
      battleEnd(); // judgementではない
    } else if (currentMode === BattleMode.arrogant) {
      selectDay(7);
    }
  };

  const timeMarker = () => {
    timeCount = timeCount + 10;
    updateTimeValues();
    if (timeCount >= timeLimit) {
      handleTimeUp();
    }
    if (currentMode === BattleMode.ignorant) {
      ignorantUI.timeCount.innerHTML = passedTime;
      battleState.myLifeValue--;
      battleState.myLifeValue <= 0 ? judgement() : (ignorantUI.myLifeValue.innerText = battleState.myLifeValue);
    } else if (currentMode === BattleMode.unjust) {
      unjustUI.timeCount.innerHTML = passedTime;
      battleState.myLifeValue--;
      battleState.myLifeValue <= 0 ? judgement() : (unjustUI.myLifeValue.innerText = battleState.myLifeValue);
      unjustUI.myLifeValue.innerText = battleState.myLifeValue;
    } else if (currentMode === BattleMode.arrogant) {
      arrogantUI.timeCount.innerHTML = passedTime;
    }
  };

  const startTimer = () => {
    if (timerID !== 0) return;
    timerID = setInterval(timeMarker, 10);
  };

  const stopTimer = () => {
    clearInterval(timerID);
    totalTime += parseInt(sec) + parseInt(millisec) / 100;
    if (currentMode == BattleMode.ignorant) {
      if (ignorantBattle.cycleCount == 0) {
        average = 0;
      } else {
        average = totalTime / ignorantBattle.cycleCount || 0;
      }
      ignorantUI.averageTime.innerText = `${formatToFixAndPad(average)}sec`;
    }
    timerID = 0;
  };

  const resetTimer = () => {
    timeCount = 0;
  };

  const shiftRecord = (list, value) => {
    for (let i = 0; i < list.length - 1; i++) {
      list[i].innerText = list[i + 1].textContent;
    }
    list[list.length - 1].innerText = value;
  };

  const recordTime = () => {
    const value = `${sec}.${millisec}sec`;
    if (currentMode === BattleMode.ignorant) {
      shiftRecord(ui[BattleMode.ignorant].timeHistory, value);
    } else if (currentMode === BattleMode.arrogant) {
      shiftRecord(ui[BattleMode.arrogant].timeHistory, value);
    }
  };

  /************************
    BattleCommonConstant
  ************************/

  const BattleMode = {
    ignorant: "ignorant",
    unjust: "unjust",
    arrogant: "arrogant",
  };

  /************************
    The Ignorant:未使用UIは要削除 drawValuesも元に戻すか共通化
  ************************/

  const ignorantUI = {
    answerCard: document.querySelectorAll(".answer-cards-ignorant img"),
    comLifeValue: document.querySelector("#com-life-ignorant-value"), // id(#)→class化(.)
    myLifeValue: document.querySelector("#my-life-ignorant-value"), // id(#)→class化(.)
    totalCount: document.querySelector("#total-count-ignorant"), // id(#)→class化(.)
    totalCountValue: document.querySelector("#total-count-ignorant-value"), // id(#)→class化(.)
    perfect: document.querySelector("#perfect-ignorant"), // id(#)→class化(.)
    combo: document.querySelector("#combo-ignorant"), // id(#)→class化(.)
    timeCount: document.querySelector("#time-count-ignorant"), // id(#)→class化(.)
    averageTime: document.querySelector("#average-time-ignorant"), // id(#)→class化(.)
    timeHistory: document.querySelectorAll(".previous-time-ignorant"),
    resultSection: document.querySelector("#result-section-ignorant"), // id(#)→class化(.)
    startButton: document.querySelector(".start-button-ignorant"),
    resetButton: document.querySelector(".reset-button-ignorant"),
    damageScreen: document.querySelector("#damage-screen-ignorant"), // id(#)→class化(.)
    messageSelectCardIgnorant: document.querySelector(".message-select-card-ignorant"),
  };

  const ignorantBattle = {
    comCardValues: [],
    cycleCount: 0,
    initIgnorantBattle() {
      initializeBattleState();
      currentMode = BattleMode.ignorant;
      timeLimit = defaultTimeLimit.ignorant;
      deckLength = 13;
      basicDamage = 773;
      battleState.comLifeValue = 99999;
      battleState.myLifeValue = 99999;
      totalTime = 0;
      this.cycleCount = 0;
      ignorantUI.comLifeValue.innerText = battleState.comLifeValue;
      ignorantUI.myLifeValue.innerText = battleState.myLifeValue;
      ignorantUI.totalCountValue.innerText = battleState.totalCount;
      ignorantUI.perfect.innerText = battleState.perfect;
      ignorantUI.combo.innerText = battleState.combo;
      resetTimer();
      initializeTimers();
      // drawValues(battleState);//Timerより後
      this.createComCardImages();
      this.setComNumberCards();
      this.setMyAnswerCards();
      this.closemyAnswerCards();
      this.openComNumberCards();
      ignorantUI.startButton.disabled = false;
      ignorantUI.resetButton.disabled = true;
      perfectFlag = true;
      pauseFlag = true;
    },

    createComCardIndexIgnorant() {
      const numberRow = document.querySelector(".card-index-ignorant");
      numberRow.innerHTML = "";
      for (let i = 0; i < deckLength; i++) {
        const wrapper = document.createElement("div");
        wrapper.style.textAlign = "center";
        const num = document.createElement("div");
        num.textContent = i + 1;
        wrapper.appendChild(num);
        numberRow.appendChild(wrapper);
      }
    },

    openComNumberCards() {
      const row = document.querySelector(".answer-cards-ignorant");
      row.innerHTML = "";
      for (const value of ignorantBattle.comCardValues) {
        const img = document.createElement("img");
        img.src = getCardPath([value]);
        row.appendChild(img);
      }
    },

    createComCardImages() {
      const imageRow = document.querySelector(".answer-cards-ignorant");
      imageRow.innerHTML = "";
      for (let i = 0; i < deckLength; i++) {
        const img = document.createElement("img");
        img.src = "ignorant/black.png";
        imageRow.appendChild(img);
      }
    },

    setComNumberCards() {
      ignorantBattle.comCardValues = [];
      for (let i = 0; i < deckLength; i++) {
        ignorantBattle.comCardValues.push(Math.floor(Math.random() * 10));
      }
    },

    closeComNumberCards() {
      const comRow = document.querySelector(".answer-cards-ignorant");
      comRow.innerHTML = "";
      this.createComCardImages(comRow, deckLength);
    },

    start() {
      const current = ui[BattleMode.ignorant];
      pauseFlag = false;
      current.startButton.disabled = true;
      current.resetButton.disabled = false;
      this.openComNumberCards();
      startTimer();
      this.closeComNumberCards();
    },

    closemyAnswerCards() {
      const comRow = document.querySelector(".my-answered-cards");
      comRow.innerHTML = "";
      for (let i = 0; i < deckLength; i++) {
        const img = document.createElement("img");
        img.src = "ignorant/black.png";
        comRow.appendChild(img);
      }
    },

    setMyAnswerCards() {
      const myRow = document.querySelector(".my-answer-cards");
      myRow.innerHTML = "";
      const fragment = document.createDocumentFragment();
      const cardImages = [
        { src: "ignorant/black.png", value: null }, // 左黒
        ...Array.from({ length: 10 }, (_, i) => ({
          src: getCardPath(i),
          value: i, // 0〜9
        })),
        { src: "ignorant/0.png", value: 0 }, // 0 カード
        { src: "ignorant/black.png", value: null }, // 右黒
      ];
      for (const card of cardImages) {
        const img = document.createElement("img");
        img.src = card.src;
        img.onclick = () => {
          if (card.value !== null) {
            this.numberAttack(card.value);
          }
        };
        fragment.appendChild(img);
      }
      myRow.appendChild(fragment);
    },

    numberAttack(cardIndex) {
      if (pauseFlag) return;
      if (battleState.cardsCount == 0) {
        this.closeComNumberCards();
      }
      const current = ui[currentMode];
      const correct = ignorantBattle.comCardValues[battleState.cardsCount];
      if (cardIndex === correct) {
        this.numberHit(cardIndex);
        battleState.combo++;
        ignorantUI.combo.innerText = battleState.combo;
      } else {
        damageFlash();
        battleState.combo = 0;
        ignorantUI.combo.innerText = battleState.combo;
        battleState.myLifeValue -= basicDamage;
      }
      battleState.totalCount++;
      ignorantUI.comLifeValue.innerText = battleState.comLifeValue;
      ignorantUI.totalCountValue.innerText = battleState.totalCount;
      ignorantUI.myLifeValue.innerText = battleState.myLifeValue;
      if (battleState.myLifeValue <= 0) {
        stopTimer();
      }
      judgement();
    },

    numberHit(cardindex) {
      playSound(successSound);
      const cards = document.querySelectorAll(".my-answered-cards img");
      cards[battleState.cardsCount].src = getCardPath(cardindex);
      battleState.cardsCount++;
      battleState.comLifeValue -= basicDamage;
      ignorantUI.comLifeValue.innerText = battleState.comLifeValue;
      // 勝利判定
      if (battleState.comLifeValue < 0) {
        battleState.comLifeValue = 0;
        ignorantUI.comLifeValue.innerText = battleState.comLifeValue;
        if (perfectFlag) {
          battleState.perfect++;
          ignorantUI.perfect.innerText = battleState.perfect;
        } //最後は13桁に満たなくてもミスがなければパーフェクト扱い
        winFlag = true;
        ignorantBattle.openComNumberCards();
        ignorantUI.answerCard.forEach((img) => {
          img.style.opacity = OPACITY.DIM;
        });
        if (battleState.cardsCount === deckLength) {
          battleState.cardsCount = 0;
          this.cycleCount++; //stopTimer()より前
          stopTimer();
          recordTime();
        }
        // judgement();
        return;
      }
      // 13桁目到達（勝利しなかった）
      else if (battleState.cardsCount === deckLength) {
        this.cycleCount++; // stopTimer()より前
        stopTimer();
        recordTime();
        if (perfectFlag) {
          battleState.perfect++;
          ignorantUI.perfect.innerText = battleState.perfect;
        }
        perfectFlag = true;
        battleState.cardsCount = 0;
        ignorantBattle.setComNumberCards();
        ignorantBattle.openComNumberCards();
        this.closemyAnswerCards();
        timeMarker();
        resetTimer();
        startTimer();
      }
    },

    buildIgnorantResult() {
      const baseTimeHTML = formatTimeHTML(totalTime);
      const baseTimeLog = formatTimeLog(totalTime);
      let result;
      let log;
      if (battleState.comLifeValue === 9999) {
        return {
          result: (result = `${baseTimeHTML}Esto<br>Perpetua!`),
          log: (log = "Esto Perpetua."),
        };
      }
      return {
        result:
          (result = `${baseTimeHTML}Hit Rate<br>${formatToFixAndPad(((this.cycleCount * 13 + battleState.cardsCount) / battleState.totalCount) * 100)}%`),
        log: (log = `${baseTimeLog}\nHit Rate\n${formatToFixAndPad(((this.cycleCount * 13 + battleState.cardsCount) / battleState.totalCount) * 100)}%`),
      };
    },
  };

  ignorantUI.startButton.onclick = () => {
    ignorantBattle.start();
  };

  /************************
    THe Unjust:未使用UIは要削除
  ************************/

  const unjustUI = {
    board: document.querySelector("#boardUnjust"), //未使用？ 残すならid(#)→class化(.)も考慮
    startButton: document.querySelector(".start-button-unjust"),
    openButton: document.querySelector(".open-button-unjust"),
    resetButton: document.querySelector(".reset-button-unjust"),
    comLifeEl: document.querySelector("#com-life-unjust"), // id(#)→class化(.)
    myLifeEl: document.querySelector("#my-life-unjust"), // id(#)→class化(.)
    totalCount: document.querySelector("#total-count-unjust"), // id(#)→class化(.)
    comLifeValue: document.querySelector("#com-life-unjust-value"), // id(#)→class化(.)
    myLifeValue: document.querySelector("#my-life-unjust-value"), // id(#)→class化(.)
    totalCountValue: document.querySelector("#total-count-unjust-value"), // id(#)→class化(.)
    perfect: document.querySelector("#perfect-hit-unjust"), // id(#)→class化(.)
    combo: document.querySelector("#serial-hit-unjust"), // id(#)→class化(.)
    timeCount: document.querySelector("#time-count-unjust"), // id(#)→class化(.)
    startDiv: document.querySelector("#start-div-unjust"), // id(#)→class化(.)
    resultSection: document.querySelector("#result-section-unjust"), // id(#)→class化(.)
    comCardsContainer: document.querySelector("#com-cards-container-unjust"), // id(#)→class化(.)
    comCardEls: document.querySelectorAll(".com-cards-unjust img"),
    myCardsContainer: document.querySelector("#my-cards-container-unjust"), // id(#)→class化(.)
    damageScreen: document.querySelector("#damage-screen-unjust"), // id(#)→class化(.)
    messageSelectCardUnjust: document.querySelector(".message-select-card-unjust"),

    //ここから分離対象
    comCardValues: [],
    myCardValues: [],
    averageTime: null,
    timeHistory: [],
    serialperfect: 0,
  };

  const unjustBattle = {
    initUnjustBattle() {
      resetTimer();
      initializeTimers();
      initializeBattleState();
      timeLimit = defaultTimeLimit.unjust;
      deckLength = 52; // 仮処置
      battleState.comLifeValue = 520000; // 仮処置
      battleState.totalCount = 0; // 仮処置
      unjustUI.myLifeValue.innerText = battleState.myLifeValue;
      unjustUI.comLifeValue.innerText = battleState.comLifeValue;
      unjustUI.totalCountValue.innerText = battleState.totalCount; // 仮処置
      unjustUI.timeCount.innerText = "000.00sec"; // 仮処置
      unjustUI.startButton.disabled = false;
      unjustUI.openButton.disabled = true;
      unjustUI.resetButton.disabled = true;
      //drawValues(battleState);
      this.setcomCards();
      this.openComCards();
      this.setMyCards();
      this.openMyCards();
    },

    createComCardIndexUnjust() {
      const numberRow1 = document.querySelector("#card-index-unjust1"); // id(#)→class化(.)
      const numberRow2 = document.querySelector("#card-index-unjust2"); // id(#)→class化(.)
      numberRow1.innerHTML = "";
      numberRow2.innerHTML = "";
      for (let i = 0; i < deckLength / 4 /* 共通化の際は注意 */; i++) {
        const wrapper1 = document.createElement("div");
        const wrapper2 = document.createElement("div");
        wrapper1.style.textAlign = "center";
        wrapper2.style.textAlign = "center";
        const num1 = document.createElement("div");
        const num2 = document.createElement("div");
        num1.textContent = i + 1;
        num2.textContent = i + 1;
        wrapper1.appendChild(num1);
        wrapper2.appendChild(num2);
        numberRow1.appendChild(wrapper1);
        numberRow2.appendChild(wrapper2);
      }
    },

    clearComCards() {
      unjustUI.comCardsContainer.innerHTML = "";
      unjustUI.comCardEls = [];
    },

    clearMyCards() {
      unjustUI.myCardsContainer.innerHTML = "";
      unjustUI.myCardEls = [];
    },

    createComCard(value) {
      const img = document.createElement("img");
      img.src = getCardPath(value);
      img.className = "com-cards-unjust";
      return img;
    },

    createMyCard(value) {
      const img = document.createElement("img");
      img.src = getCardPath(value);
      img.className = "my-cards-unjust";
      return img;
    },

    setcomCards() {
      unjustUI.comCardValues = [];
      for (let i = 1; i <= deckLength; i++) {
        unjustUI.comCardValues.push(i);
      }
      shuffleArray(unjustUI.comCardValues);
    },

    setMyCards() {
      unjustUI.myCardValues = [];
      for (let i = 1; i <= deckLength; i++) {
        unjustUI.myCardValues.push(i);
      }
    },

    openComCards() {
      this.clearComCards();
      unjustUI.comCardValues.forEach((value) => {
        const img = this.createComCard(value);
        unjustUI.comCardEls.push(img);
        unjustUI.comCardsContainer.appendChild(img);
      });
    },

    openMyCards() {
      this.clearMyCards();
      unjustUI.myCardValues.forEach((value, index) => {
        const img = this.createMyCard(value);
        img.onclick = () => {
          this.cardsAttack(index);
        };
        unjustUI.myCardEls.push(img);
        unjustUI.myCardsContainer.appendChild(img);
      });
    },

    closeComCards() {
      for (let i = 0; i < unjustUI.comCardValues.length; i++) {
        unjustUI.comCardEls[i].src = getCardPath("../common/red");
      }
    },

    openAllCards() {
      battleState.usedCard = [];
      for (let i = 1; i <= deckLength; i++) {
        battleState.usedCard.push(false);
      }
      battleState.cardsCount = 0;
      unjustUI.serialperfect = 0;
      battleState.comLifeValue = 520000; // クリア時にオープンすると520000に戻る（クリア時にオープンする必要はない）
      unjustUI.comLifeValue.innerText = battleState.comLifeValue;
      this.openComCards();
      this.openMyCards();
    },

    markMyCardUsed(index) {
      unjustUI.myCardEls[index].src = "common/blue.png";
    },

    markComCardUsed(index) {
      unjustUI.myCardEls[index].src = "common/blue.png";
    },

    cardsAttack(cardIndex) {
      if (pauseFlag === true || battleState.usedCard[cardIndex] === true) {
        return;
      }
      if (
        unjustUI.myCardValues[cardIndex] === undefined ||
        unjustUI.comCardValues[battleState.cardsCount] === undefined
      ) {
        console.warn("Invalid card comparison", cardIndex, battleState.cardsCount);
        return;
      }
      if (battleState.cardsCount === 0) {
        this.closeComCards();
      }
      const myValue = unjustUI.myCardValues[cardIndex];
      const comValue = unjustUI.comCardValues[battleState.cardsCount];
      if (unjustUI.myCardValues[cardIndex] === unjustUI.comCardValues[battleState.cardsCount]) {
        playSound(successSound);
        battleState.perfect++;
        battleState.combo++;
        //unjustUI.serialperfect++;
        battleState.comLifeValue -= 10000;
        unjustUI.comLifeValue.innerText = battleState.comLifeValue;
        this.markMyCardUsed(cardIndex);
        unjustUI.comCardEls[battleState.cardsCount].setAttribute(
          "src",
          getCardPath(unjustUI.comCardValues[battleState.cardsCount]),
        );
        battleState.usedCard[cardIndex] = true;
        battleState.cardsCount++;
      } else {
        playSound(failSound);
        battleState.myLifeValue -= 1000;
        unjustUI.myCardValues.innerText = battleState.myLifeValue;
        damageFlash();
        battleState.combo = 0;
        unjustUI.serialperfect = 0;
      }
      battleState.totalCount++;
      unjustUI.totalCountValue.innerText = battleState.totalCount;
      //drawValues(battleState);
      judgement();
      // this.roundCheck();
    },

    buildUnjustResult() {
      const baseTimeHTML = formatTimeHTML(totalTime);
      const baseTimeLog = formatTimeLog(totalTime);
      let message;
      if (winFlag) {
        message = "YouWin.";
      } else if (TimeIsUpFlag) {
        message = "TimeIsUp.";
      } else if (loseFlag) {
        message = "YouLose.";
      }
      return {
        result: `${baseTimeHTML}${message}`,
        log: `${baseTimeLog}\n${message}`,
      };
    },

    /*過去仕様の名残
    roundCheck() {
      if (battleState.cardsCount >= deckLength) {
        this.openAllCards();
      }
    },
    */
  };

  /////とりあえず外に出しておく/////
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };
  //////////////////////////////////

  unjustUI.startButton.onclick = () => {
    pauseFlag = false;
    unjustUI.startButton.disabled = true;
    unjustUI.openButton.disabled = false;
    unjustUI.resetButton.disabled = false;
    unjustBattle.closeComCards();
    unjustBattle.openMyCards();
    startTimer();
  };

  unjustUI.openButton.onclick = () => {
    if (pauseFlag === true) {
      return;
    }
    playSound(healSound);
    unjustBattle.openAllCards();
    battleState.combo = 0;
    battleState.usedCard = [];
    drawValues(battleState);
  };

  /************************
    The Arrogant:silentからの適用後ほぼ未整備 とりあえず動く 
  ************************/

  const arrogantUI = {
    board: document.querySelector("#boardArrogant"), // 未使用？ 残すならid(#)→class化(.)も考慮
    comLifeValue: document.querySelector("#com-life-arrogant-value"), // id(#)→class化(.)
    myLifeValue: document.querySelector("#my-life-arrogant-value"), // id(#)→class化(.)
    totalCountValue: document.querySelector("#total-count-arrogant-value"), // id(#)→class化(.)
    perfect: document.querySelector("#perfect-hit-arrogant"), // id(#)→class化(.)
    combo: document.querySelector("#serial-hit-arrogant"), // id(#)→class化(.)
    /* */
    monthAdjustButtonSection: document.querySelector("#month-adjust-button-section"), // id(#)→class化(.)
    monthAdjust: document.querySelectorAll(".month-adjust-button"),
    answerRevealDelayButtonsSection: document.querySelector("#answer-reveal-delay-buttons-section"), // id(#)→class化(.)
    answerRevealDelayButton: document.querySelectorAll(".answer-reveal-delay-button"),
    /* */
    timeCount: document.querySelector("#time-count-arrogant"), // id(#)→class化(.)
    timeHistory: document.querySelectorAll(".previous-time-arrogant"),
    myCenturyCardEls: document.querySelectorAll(".century-card-calculating"),
    myYearCardEls: document.querySelectorAll(".year-card-calculating"),
    myMonthCardEls: document.querySelectorAll(".month-card-calculating"),
    myDateCardEls: document.querySelectorAll(".date-card-calculating"),
    myDayCardEls: document.querySelectorAll(".day-card-calculating"),
    comDayCardEl: document.querySelector("#day-card-correct-answer"), // id(#)→class化(.)
    intercalaryCardEl: document.querySelector("#intercalary-card-calculating"), // id(#)→class化(.)
    resultIndicator: document.querySelector("#result-indicator"), // id(#)→class化(.)
    startButton: document.querySelector(".start-button-arrogant"),
    resetButton: document.querySelector(".reset-button-arrogant"),
    resultSection: document.querySelector("#result-section-arrogant"), // id(#)→class化(.)
    resultIndicatorSection: document.querySelector("#result-indicator-section-arrogant"), // id(#)→class化(.)
    damageScreen: document.querySelector("#damage-screen-arrogant"), // id(#)→class化(.)
  };

  arrogantUI.intercalaryCardEl.onclick = () => attackIntercalary(true);

  const arrogantVariables = {};

  /***********************************************
    Arrogant Mode:Under Refactoring
  ***********************************************/

  const drawArrogantValues = () => {
    arrogantUI.comLifeValue.innerText = battleState.comLifeValue;
    arrogantUI.myLifeValue.innerText = battleState.myLifeValue;
    arrogantUI.totalCountValue.innerText = battleState.totalCount;
    arrogantUI.perfect.innerText = hudState.clean;
    arrogantUI.combo.innerText = hudState.combo;
  };

  const createComCardIndexArrogant = () => {
    const numberRow = document.querySelector("#card-index-arrogant"); // id(#)→class化(.)
    numberRow.innerHTML = "";

    for (let i = 0; i < 13 /* deckLengthの代わり（仮）*/; i++) {
      const wrapper = document.createElement("div");
      wrapper.style.textAlign = "center";

      const num = document.createElement("div");
      num.textContent = i + 1;

      wrapper.appendChild(num);
      numberRow.appendChild(wrapper);
    }
  };

  const DEFAULT_VALUE_SETTINGS = {
    TIME_LIMIT: 30 * 1000, // milliSec
    ANSWER_REVEAL_DELAY: 0.6 * 1000, // milliSec （仮処置：answer-reveal-delay-button選択で直接書き換える）
    ANSWER_REVEAL_DELAY_INDEX: 3, //
    WHITE_OUT_DELAY: 9 * 1000, // milliSec game-end-flash 9s ease-outと合わせる
    ANNUAL_DAYS: 366, // 年間日数（うるう日含む）366が2月29日 367は2月30日
    NUMBER_OF_CYCLE: 2, // 366問9999.99秒なら2周分（732問）でクリアまたはゲームオーバー
    NUMBER_OF_QUESTION: 366, // 総問題数（重複しない日付366日分を試すなら366）
    QUESTIONS_MIN: 0, // 残問数0で勝利
    REMAINING_TIME_MAX: 999999, // *10ms(9999.99sec)
    REMAINING_TIME_MIN: 0, // 残時間0で敗北
    MAIN_CARD_DAMAGE: 999, //
    SUB_CARD_DAMAGE: 100, //
    DEFAULT_MONTH_ADJUST_INDEX: 3, // MONTH ADJUSTボタンの初期選択位置
    YEAR_DIGITS: 12, // このゲームでは12桁年(カードが12枚分なので)
    TIME_IS_UP: 7, // CALENDAR.WEEKDAY_LABELS[7]
    CALCULATION_CARDS_LENGTH: 7,
    /*** 応急配置 ***/
    ARROGANT_DAMAGE: 1000,
  };

  const IMG_PATH_SETTINGS = {
    ARROGANT_IMG_DIRECTORY_PATH: "arrogant/",
    COMMON_IMG_DIRECTORY_PATH: "common/", //      BG_IMG_NORMAL: "is_safe",
    //      BG_IMG_DAMAGED: "under_fire",
    //      BG_IMG_EXT: ".jpg",
    CARD_IMG_EXT: ".png",
  };

  const CARD_PATH_SETTINGS = {
    RED_CARD: `${IMG_PATH_SETTINGS.COMMON_IMG_DIRECTORY_PATH}red${IMG_PATH_SETTINGS.CARD_IMG_EXT}`,
    BLUE_CARD: `${IMG_PATH_SETTINGS.COMMON_IMG_DIRECTORY_PATH}blue${IMG_PATH_SETTINGS.CARD_IMG_EXT}`,
  };

  /***********************************************
      Arrogant Get Card Path
    ***********************************************/
  /*
  const getCardPath = (value) => {
    return `${IMG_PATH_SETTINGS.ARROGANT_IMG_DIRECTORY_PATH}${value}${IMG_PATH_SETTINGS.CARD_IMG_EXT}`;
  };
*/
  /***********************************************
      Arrogant Cards container elements
    ***********************************************/

  const Cards = {
    question: {
      year: document.querySelectorAll(".year-card-question"),
      month: document.querySelectorAll(".month-card-question"),
      date: document.querySelectorAll(".date-card-question"),
      day: document.querySelector(".day-card-correct-answer"),
      // back: document.querySelectorAll(".card-back-current"),
    },
    calculating: {
      intercalary: document.querySelector("#intercalary-card-calculating"), // id(#)→class化(.)
      century: document.querySelectorAll(".century-card-calculating"),
      year: document.querySelectorAll(".year-card-calculating"),
      month: document.querySelectorAll(".month-card-calculating"),
      date: document.querySelectorAll(".date-card-calculating"),
      day: document.querySelectorAll(".day-card-calculating"),
      back: document.querySelectorAll(".card-back-calculating"),
    },
  };

  /***********************************************
      Arrogant Control Cards Open
    ***********************************************/

  const CARD_OFFSET = {
    SPADE_CARD: 0, // 年
    CLOVER_CARD: 10, // 月
    DIAMOND_CARD: 20, // 日付
    HEART_WEEKDAY_CARD: 30, // 曜日
  };

  // うるう年の時はうるう年カードを開く（月を問わない
  const openIntercalaryCard = () => {
    usedCards.intercalary = false; // 初期化
    if (calendarState.intercalary === true) {
      Cards.calculating.intercalary.setAttribute("src", getCardPath("s1"));
    } else {
      usedCards.intercalary = true;
    }
  };

  const openCardsCalculating = (group, usedArrayRef, offset = 0, limit = null) => {
    // usedCardsを初期化
    if (Array.isArray(usedArrayRef)) {
      usedArrayRef.length = 0;
    }
    // limit枚まで開く(selectDay) limitがなければgroup全体を開く
    const len = limit !== null ? limit : group.length;
    for (let i = 0; i < len; i++) {
      const el = group[i];
      if (!el) continue;
      el.setAttribute("src", getCardPath(i + offset));
    }
  };

  const openCenturyCardsCalculating = () => {
    openCardsCalculating(Cards.calculating.century, usedCards.century, CARD_OFFSET.SPADE_CARD);
  };

  const openYearCardsCalculating = () => {
    openCardsCalculating(Cards.calculating.year, usedCards.year, CARD_OFFSET.SPADE_CARD);
  };

  const openMonthCardsCalculating = () => {
    openCardsCalculating(Cards.calculating.month, usedCards.month, CARD_OFFSET.CLOVER_CARD);
  };

  const openDateCardsCalculating = () => {
    openCardsCalculating(Cards.calculating.date, usedCards.date, CARD_OFFSET.DIAMOND_CARD);
  };

  const openDayCardsCalculating = () => {
    openCardsCalculating(
      Cards.calculating.day,
      usedCards.day,
      CARD_OFFSET.HEART_WEEKDAY_CARD,
      Cards.calculating.day.length - 1, // TimeIsUp == selectDay(7) 時間切れ判定の8要素目を封印する引値
    );
  };

  const openCardsQuestion = (group, values) => {
    for (let i = 0; i < values.length; i++) {
      group[i].setAttribute("src", getCardPath(values[i]));
    }
  };

  // centuryCardsはyearCardsに含まれる（同時に開かれる）ためopenCentury関数は存在しない
  const openYearCardsQuestion = () => {
    openCardsQuestion(Cards.question.year, digitsForCards.year);
    Cards.question.year[2].style.opacity = OPACITY.MID;
    Cards.question.year[3].style.opacity = OPACITY.MID;
    Cards.question.year[6].style.opacity = OPACITY.MID;
    Cards.question.year[7].style.opacity = OPACITY.MID;
    Cards.question.year[10].style.opacity = OPACITY.MID;
    Cards.question.year[11].style.opacity = OPACITY.MID;
  };

  const openMonthCardsQuestion = () => {
    openCardsQuestion(Cards.question.month, digitsForCards.month);
  };

  const openDateCardsQuestion = () => {
    openCardsQuestion(Cards.question.date, digitsForCards.date);
  };

  // 解答表示用関数
  const openDayCardAnswer = () => {
    Cards.question.day.setAttribute("src", getCardPath(Answer.day + CARD_OFFSET.HEART_WEEKDAY_CARD));
  };

  /***********************************************
      Arrogant Control Cards Close
    ***********************************************/
  const initArrogantBattle = () => {
    //initializeBattleState();
    createComCardIndexArrogant();
    setAdjuster(monthAdjust.recordedAdjustIndex);
    setAnswerReveal(answerRevealDelay.recordedAnswerRevealDelayIndex);
    closeYearCards();
    closeMonthCards();
    closeDateCards();
    closeIntercalaryCard();
    openCenturyCardsCalculating();
    openYearCardsCalculating();
    openMonthCardsCalculating();
    openDateCardsCalculating();
    arrogantUI.monthAdjustButtonSection.hidden = false; // リセット時に必要
    arrogantUI.answerRevealDelayButtonsSection.hidden = true;
    arrogantUI.startButton.disabled = false;
    arrogantUI.resetButton.disabled = true;
    battleState.comLifeValue = 9999;
    battleState.myLifeValue = 9999;
    battleState.totalCount = 0;
    drawArrogantValues(); //現時点では必要
    initializeTimers();
    initializeCalendarBattle();
  };

  const closeIntercalaryCard = () => {
    arrogantUI.intercalaryCardEl.setAttribute("src", CARD_PATH_SETTINGS.BLUE_CARD);
  };

  const closeCards = (groups, dayCardEl) => {
    for (const group of groups) {
      for (const el of group) {
        el.setAttribute("src", CARD_PATH_SETTINGS.RED_CARD);
      }
    }
    dayCardEl.setAttribute("src", CARD_PATH_SETTINGS.RED_CARD);
  };

  const closeCardsQuestion = (group) => {
    for (let i = 0; i < group.length; i++) {
      group[i].setAttribute("src", CARD_PATH_SETTINGS.RED_CARD);
    }
  };

  // centuryCardsはyearCardsに含まれる（同時に閉じられる）ためcloseCentury関数は存在しない
  const closeYearCards = () => {
    closeCardsQuestion(Cards.question.year);
  };

  const closeMonthCards = () => {
    closeCardsQuestion(Cards.question.month);
  };

  const closeDateCards = () => {
    closeCardsQuestion(Cards.question.date);
  };

  const closeDayCardAnser = () => {
    Cards.question.day.setAttribute("src", CARD_PATH_SETTINGS.RED_CARD);
  };

  const setCardGroupFromValues = (group, values, offset = 0) => {
    for (let i = 0; i < values.length; i++) {
      group[i].setAttribute("src", getCardPath(values[i] + offset));
    }
  };

  /***********************************************
      Arrogant Control Opacity
  ***********************************************/

  const OPACITY = {
    FULL: 1,
    MID: 0.8,
    DIM: 0.6,
  };

  const setOpacityAllCards = (value) => {
    const groups = [
      Cards.question.year,
      Cards.question.month,
      Cards.question.date,
      Cards.question.back,
      Cards.calculating.century,
      Cards.calculating.year,
      Cards.calculating.month,
      Cards.calculating.date,
      Cards.calculating.day,
    ];
    for (const group of groups) {
      if (!group) continue;
      for (const el of group) {
        el.style.opacity = value;
      }
    }
    if (Cards.calculating.intercalary) {
      Cards.calculating.intercalary.style.opacity = value;
    }
  };

  const transparentAllCards = () => {
    setOpacityAllCards(OPACITY.DIM);
  };

  const resetCardOpacity = () => {
    setOpacityAllCards(OPACITY.FULL);
  };

  /***********************************************
    UI Container Elements
  ***********************************************/

  const UI = {
    status: {},
    result: {},
  };

  /***********************************************
    Draw UI Values
  ***********************************************/

  /***********************************************
    Variables
  ***********************************************/

  const INITIAL_GAME_STATE = {
    pause: true,
    nonstop: true,
    clean: true,
    win: false,
    lose: false,
    daySelected: false,
  };

  let gameState = structuredClone(INITIAL_GAME_STATE);

  const initializeGameState = () => {
    gameState = structuredClone(INITIAL_GAME_STATE);
  };

  const INITIAL_HUD_STATE = {
    remainingTime: DEFAULT_VALUE_SETTINGS.REMAINING_TIME_MAX,
    remainingQuestions: DEFAULT_VALUE_SETTINGS.NUMBER_OF_QUESTION,
    totalCount: 0,
    combo: 0,
    clean: 0,
    misses: {
      assist: 0,
      answer: 0,
    },
  };

  let hudState = structuredClone(INITIAL_HUD_STATE);

  const initializeHudState = () => {
    hudState = structuredClone(INITIAL_HUD_STATE);
  };

  const INITIAL_CALENDAR_STATE = {
    intercalary: false,
    centuryData: null,
    yearData: "", // 各配列の要素が1桁分の数字なので一度文字列型に結合して取る
    monthData: null, // 1〜12の乱数（0〜11ではない）
    dateData: null, // 日付用の乱数
  };

  let calendarState = structuredClone(INITIAL_CALENDAR_STATE);

  const initializeCalendarState = () => {
    calendarState = structuredClone(INITIAL_CALENDAR_STATE);
  };

  const INITIAL_QUESTION_STATE = {
    questionSequence: [], // 出題される日付の配列
    questionIndex: 0, // 出題中の配列要素
    currentQuestionDay: null, // 現在出題されている日付（3/1起点 1〜366）
    year00Questions: [], // 00年問題を強制出題する日付の配列
    year00Index: 0, // 00年問題が強制出題されると1進む
  };

  let questionState = structuredClone(INITIAL_QUESTION_STATE);

  const initializeQuestionState = () => {
    questionState = structuredClone(INITIAL_QUESTION_STATE);
  };

  const INITIAL_ANSWER_STATE = {
    intercalary: 0,
    century: null,
    year: 0,
    month: null,
    date: null,
    day: null,
    intercalaryDisplay: null,
    WEEKDAY_LABELS: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "\nTime is up"],
    selectedAnswer: "Not Selected.",
  };

  let Answer = structuredClone(INITIAL_ANSWER_STATE);

  const initializeAnswerState = () => {
    Answer = structuredClone(INITIAL_ANSWER_STATE);
  };

  const INITIAL_MARKING_STATE = {
    correct: false,
    incorrect: false,
    timeIsUp: false,
  };

  let markingState = structuredClone(INITIAL_MARKING_STATE);

  const initializeMarkingState = () => {
    markingState = structuredClone(INITIAL_MARKING_STATE);
  };

  // trueが入っている要素は使用済
  const INITIAL_USEDCARDS_STATE = {
    intercalary: false,
    century: [],
    year: [],
    month: [],
    date: [],
    day: [],
  };

  let usedCards = structuredClone(INITIAL_USEDCARDS_STATE);

  const initializeUsedCards = () => {
    usedCards = structuredClone(INITIAL_USEDCARDS_STATE);
  };

  // まとめてリセットする必要がない（してもよい） そのまま使うのでfreezeしない
  const digitsForCards = {
    year: [],
    month: [],
    date: [],
  };

  /***********************************************
    Timer
  ***********************************************/

  const formatToStrAndPad = (value) => {
    return value.toString().padStart(2, "0");
  };

  const formatToFixAndPad = (value) => {
    return value.toFixed(2).padStart(5, "0");
  };

  const formatCenturyAnswer = (value) => {
    return value.toString().padStart(3);
  };

  /************************
    Month Adjust
  ************************/

  const monthAdjust = {
    recordedAdjustIndex: DEFAULT_VALUE_SETTINGS.DEFAULT_MONTH_ADJUST_INDEX, // この値はreset時も引き継ぐ（初期化しない）
    monthAdjustValue: null,
  };

  arrogantUI.monthAdjust.forEach((btn, index) => {
    btn.onclick = () => setAdjuster(index);
  });

  const MONTH_ADJUST_TABLE = [3, 2, 1, 0, 6, 5, 4];

  const setAdjuster = (index) => {
    monthAdjust.monthAdjustValue = MONTH_ADJUST_TABLE[index];

    arrogantUI.monthAdjust.forEach((el, i) => {
      el.style.opacity = i === index ? OPACITY.DIM : OPACITY.FULL;
    });

    return (monthAdjust.recordedAdjustIndex = index);
  };

  /************************
    Answer Reveal Delay
  ************************/

  const answerRevealDelay = {
    recordedAnswerRevealDelayIndex: DEFAULT_VALUE_SETTINGS.ANSWER_REVEAL_DELAY_INDEX, // この値はreset時も引き継ぐ（初期化しない）
    answerRevealDelayValue: null,
  };

  // const answerWait = document.querySelectorAll(".answer-reveal-delay-button");
  arrogantUI.answerRevealDelayButton.forEach((btn, index) => {
    btn.onclick = () => setAnswerReveal(index);
  });

  const ANSWER_REVEAL_DELAY_TABLE = [10000, 5000, 3000, 1000, 500, 300, 100];

  const setAnswerReveal = (index) => {
    answerRevealDelay.answerRevealDelayValue = ANSWER_REVEAL_DELAY_TABLE[index];
    arrogantUI.answerRevealDelayButton.forEach((el, i) => {
      el.style.opacity = i === index ? OPACITY.DIM : OPACITY.FULL;
    });

    return (answerRevealDelay.recordedAnswerRevealDelayIndex = index);
  };

  /***********************************************
    Pause Game
  ***********************************************/

  const pauseGame = () => {
    gameState.pause = true;
    UI.buttons.start.hidden = false;
  };

  /***********************************************
    Answer Section
  ************************************************/

  const calculateJulianDayNumber = () => {
    const y = parseInt(calendarState.yearData);
    const k = Math.floor((14 - calendarState.monthData) / 12);
    return (
      Math.floor(((-k + y + 4800) * 1461) / 4) +
      Math.floor(((k * 12 + calendarState.monthData - 2) * 367) / 12) -
      Math.floor((Math.floor((-k + y + 4900) / 100) * 3) / 4) +
      calendarState.dateData -
      32075
    );
  };

  const getWeekdayFromJDN = (jdn) => {
    return Answer.WEEKDAY_LABELS[(jdn + 1) % 7];
  };

  const outPutWeekDay = () => {
    return getWeekdayFromJDN(calculateJulianDayNumber());
  };

  const outPutselectedAnswer = (cardIndex) => {
    return Answer.WEEKDAY_LABELS[cardIndex];
  };

  const setDayAnswer = () => {
    const jdn = calculateJulianDayNumber();
    Answer.day = (jdn + 1) % 7;
  };

  const calculateHitRate = () => {
    ((DEFAULT_VALUE_SETTINGS.NUMBER_OF_QUESTION - hudState.remainingQuestions) / hudState.totalCount) * 100 || 0;
  };

  const outPutResult = () => {
    const prefix = markingState.correct ? "○ CORRECT\n" : markingState.timeIsUp ? "× TimeIsUp\n" : "× INCORRECT\n";
    const selectedAnswer = `SelectedAnswer:${Answer.selectedAnswer}`;
    //    const time = `${timerState.display.text.slice(0, 5)}sec`;
    const questionNumber = `QuestionNumber:${questionState.questionIndex + 1}`;
    const fullYear = `FullYear:${calendarState.yearData}`;
    const SerialDay = `SerialDayFrom3/1 :${questionState.currentQuestionDay}`;
    const jdn = `JDN:${calculateJulianDayNumber()}`;
    const century = `Century:${formatCenturyAnswer(calendarState.centuryData)}  CA=${Answer.century}`;
    const year = `Year   : ${calendarState.yearData.toString().slice(-2)}  YA=${Answer.year}`;
    const month = `Month  : ${formatToStrAndPad(calendarState.monthData)}  MA=${Answer.month}`;
    const date = `Date   : ${formatToStrAndPad(calendarState.dateData)}  DA=${Answer.date}(${calendarState.dateData})`;
    const intercalary = `Intercalary: IA=${Answer.intercalaryDisplay}`;
    const weekDayAnswerBase = Answer.century + Answer.year + Answer.month + Answer.intercalaryDisplay; // (-1≡6 mod7)
    const weekDayAnswerRaw = weekDayAnswerBase + Answer.date;
    const weekDayValueRaw = weekDayAnswerBase + calendarState.dateData;
    const weekDayAnswerValue = weekDayValueRaw % 7;
    const weekDay = `WeekDay:${outPutWeekDay()}`;
    const weekDayData = `  WD=${weekDayAnswerValue}(${weekDayAnswerRaw},${weekDayValueRaw})`;

    console.log(
      [
        "%c" + prefix,
        selectedAnswer,
        //        time,
        questionNumber,
        fullYear,
        SerialDay,
        jdn,
        "",
        century,
        year,
        month,
        date,
        intercalary,
        weekDay + weekDayData,
      ].join("\n"),
      "font-size:20px;",
    );

    arrogantUI.resultIndicator.innerHTML = `${prefix}<br>${weekDay}<br>${selectedAnswer}<br><br>${jdn}<br><br>
     ${century}<br>${year}<br>${month}<br>${date}<br>${intercalary}`;
    arrogantUI.resultIndicator.hidden = false; // 正誤判定表示

    const HitRate =
      ((DEFAULT_VALUE_SETTINGS.NUMBER_OF_QUESTION - hudState.remainingQuestions) / hudState.totalCount) * 100 || 0;
    if (gameState.win || gameState.lose)
      console.log(
        `%c${[
          `${formatToFixAndPad(timerState.totalTime)}sec`,
          `(${formatToFixAndPad(timerState.totalTime / 60)}min)`,
          `AverageTime:`,
          `${formatToFixAndPad(timerState.averageTime)}sec`,
          `HitRate:`,
          `${formatToFixAndPad(HitRate)}%`,
          `(DayAnswer)`,
        ].join("\n")}`,
        "font-size:20px;",
      );
    initializeMarkingState(); //仮置
  };

  /***********************************************
    Questions Section 
  ************************************************/

  const generateDayArray = (n) => {
    return Array.from({ length: n }, (_, i) => i + 1);
  };

  const pickRandom00Years = (dayArray) => {
    const shuffled = [...dayArray];
    shuffleArray(shuffled);
    return shuffled.slice(0, 10).sort((a, b) => a - b);
  };

  const generateShuffledYearDays = () => {
    const days = generateDayArray(DEFAULT_VALUE_SETTINGS.ANNUAL_DAYS);
    shuffleArray(days);
    return days;
  };

  const setQuestionSequence = () => {
    const annualCycle = generateShuffledYearDays();
    const questionSequenceArray = [];
    for (let i = 0; i < DEFAULT_VALUE_SETTINGS.NUMBER_OF_CYCLE; i++) {
      questionSequenceArray.push(...annualCycle);
    }
    questionState.questionSequence = questionSequenceArray;
    console.log("questionSequence", questionSequenceArray);
  };

  /***********************************************
    Intercalary Section
  ***********************************************/

  const isIntercalaryYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  const getIntercalaryAnswer = (year, month) => {
    if (!isIntercalaryYear(year)) return 0;
    return month <= 2 ? 6 : 0; // 6 ≡ -1 mod 7
  };

  const getIntercalaryDisplay = (year, month) => {
    if (!isIntercalaryYear(year)) return 0;
    return month <= 2 ? -1 : 0; // 6 ≡ -1 mod 7
  };

  const setIntercalaryAnswer = (year, month) => {
    Answer.intercalary = getIntercalaryAnswer(year, month);
    Answer.intercalaryDisplay = getIntercalaryDisplay(year, month);
    calendarState.intercalary = isIntercalaryYear(year);
  };

  /***********************************************
    Century Section
  ***********************************************/

  const setCenturyAnswer = (year) => {
    calendarState.centuryData = Math.floor(year / 100);
    Answer.century = Math.floor((calendarState.centuryData % 4) * 5) % 7;
  };

  /***********************************************
    Year Section
  ***********************************************/

  const generateRandomDigits = (n) => {
    return Array.from({ length: n }, () => Math.floor(Math.random() * 10));
  };

  const setYearAnswer = () => {
    digitsForCards.year = generateRandomDigits(DEFAULT_VALUE_SETTINGS.YEAR_DIGITS);
    // 00年問題強制出題時の対処
    if (hudState.totalCount === questionState.year00Questions[questionState.year00Index]) {
      digitsForCards.year[digitsForCards.year.length - 1] = 0;
      digitsForCards.year[digitsForCards.year.length - 2] = 0;
      questionState.year00Index++;
    }
    calendarState.yearData = digitsForCards.year.join("");
    /* グレゴリオ暦採用時期が地域によって異なるため地域によって曜日が異なる場合がある
        2000年未満なら12000年に補正 1万年経過（400年周期）で同曜日になるため答えは変わらない */
    if (parseInt(calendarState.yearData) < 2000) {
      digitsForCards.year[0] = 1;
      calendarState.yearData = digitsForCards.year.join("");
    }
    // 年の答え
    const yy = parseInt(calendarState.yearData.slice(-2));
    Answer.year = (yy + Math.floor(yy / 4) + (7 - monthAdjust.monthAdjustValue)) % 7;
  };

  /***********************************************
    Month Section
  ***********************************************/

  const setMonthAnswer = () => {
    questionState.currentQuestionDay = questionState.questionSequence[questionState.questionIndex];
    if (questionState.currentQuestionDay === DEFAULT_VALUE_SETTINGS.ANNUAL_DAYS && Answer.intercalary !== 6) {
      ensureLeapYearForFeb29();
    }
    const { month, passedDays } = calculateMonthFromDayOfYear(questionState.currentQuestionDay);
    calendarState.monthData = month;
    Answer.month = calculateMonthAnswer(passedDays, month, monthAdjust.monthAdjustValue);
    digitsForCards.month = buildMonthValues(month);
  };

  const calculateMonthFromDayOfYear = (dayOfYear) => {
    const rawMonth = Math.floor((dayOfYear + 122) / 30.61); // このゲームは366日で閉じている
    const passedDays = Math.floor(rawMonth * 30.6) - 122; // 同上
    const month = ((rawMonth - 2) % 12) + 1;
    return { month, passedDays };
  };

  const ensureLeapYearForFeb29 = () => {
    while (Answer.intercalary !== 6) {
      calendarState.monthData = 2;
      calendarState.yearData = [];
      setYearAnswer();
      setCenturyAnswer(calendarState.yearData);
      setIntercalaryAnswer(calendarState.yearData, calendarState.monthData);
    }
  };

  const calculateMonthAnswer = (passedDays, month, adjust) => {
    const base = month > 2 ? 2 : 1;
    return (passedDays + base + adjust) % 7;
  };

  const buildMonthValues = (month) => {
    const tens = Math.floor(month / 10);
    const ones = month % 10;
    return [CARD_OFFSET.CLOVER_CARD + tens, CARD_OFFSET.CLOVER_CARD + ones];
  };

  /***********************************************
    Date Section
  ***********************************************/

  const splitTwoDigits = (n) => {
    return [Math.floor(n / 10), n % 10];
  };

  const setDateAnswer = () => {
    const { passedDays } = calculateMonthFromDayOfYear(questionState.currentQuestionDay);
    calendarState.dateData = questionState.currentQuestionDay - passedDays;
    const [tens, ones] = splitTwoDigits(calendarState.dateData);
    digitsForCards.date = [CARD_OFFSET.DIAMOND_CARD + tens, CARD_OFFSET.DIAMOND_CARD + ones];
    Answer.date = calendarState.dateData % 7;
  };

  /***********************************************
    Initialize Section
  ************************************************/

  const initializeBasicValuesAndElements = () => {
    initializeHudState();
    initializeQuestionState();
    initializeAnswerState();
    initializeCalendarState();
    initializeUsedCards();
    initializeGameState();
    initializeMarkingState();
    setAdjuster(monthAdjust.recordedAdjustIndex);
  };

  const initializeCalendarValuesAndElements = () => {
    closeIntercalaryCard();
    closeDayCardAnser();
    gameState.clean = true;
    calendarState.intercalary = false;
    Answer.intercalary = 0;
    calendarState.yearData = ""; // 配列の要素ごとに1桁分の数字が入っているので文字列型で取る必要がある
  };

  // ゲーム開始時及びリセット時に呼ばれる
  const initializeCalendarBattle = () => {
    pauseFlag = false;

    initializeBasicValuesAndElements();
    initializeTimers();
    initializeCalendarValuesAndElements();
    setQuestionSequence();
    // pickRandom00Years();
    resetCardOpacity();
    drawArrogantValues();
  };

  // リセット時に呼ばれる
  const initializeAll = () => {
    stopTimer();
    initializeBasicValuesAndElements();
    initializeTimers();
    drawArrogantValues();

    //    closeCards([Cards.question.year, Cards.question.month, Cards.question.date], Cards.question.day); // Current閉じる
    //    closeCards([Cards.previous.year, Cards.previous.month, Cards.previous.date], Cards.previous.day); // Previous閉じる
    openCenturyCardsCalculating();
    openYearCardsCalculating();
    openMonthCardsCalculating();
    openDateCardsCalculating();
    openDayCardsCalculating();
    resetCardOpacity();
    UI.buttons.reset.hidden = true;
    UI.buttons.start.hidden = false;
    UI.buttons.start.inert = false;
  };

  // 一問ごとに呼ばれる
  const calendarStart = () => {
    initializeCalendarValuesAndElements();
    setYearAnswer();
    setCenturyAnswer(calendarState.yearData); // 年データを使うのでこの位置
    setMonthAnswer();
    setIntercalaryAnswer(calendarState.yearData, calendarState.monthData); // 年データ・月データを使うのでこの位置
    setDateAnswer();
    setDayAnswer();
    openCenturyCardsCalculating();
    openYearCardsCalculating();
    openMonthCardsCalculating();
    openDateCardsCalculating();
    openDayCardsCalculating();
    resetCardOpacity();
    drawArrogantValues();
    openYearCardsQuestion();
    openMonthCardsQuestion();
    openDateCardsQuestion();
    openIntercalaryCard();
    gameState.pause = false;
    gameState.daySelected = false;
    //    recordTimeResult();
    resetTimer();
    startTimer();
  };

  /***********************************************
    Game End Section
  ************************************************/

  const totalResultHidden = () => {
    UI.result.totalResult.hidden = true;
  };

  const gameEnd = () => {
    UI.result.indicator.hidden = true;
    const HitRate =
      ((DEFAULT_VALUE_SETTINGS.NUMBER_OF_QUESTION - hudState.remainingQuestions) / hudState.totalCount) * 100 || 0;
    UI.result.totalResult.innerHTML = `
    TotalTime:<br>
    ${formatToFixAndPad(timerState.totalTime)}sec<br>
    (${formatToFixAndPad(timerState.totalTime / 60)}min)<br>
    AverageTime:<br>
    ${formatToFixAndPad(timerState.averageTime)}sec<br>
    HitRate:<br>
    ${formatToFixAndPad(HitRate)}%<br>
    (DayAnswer)
  `;
    UI.result.totalResult.hidden = false;
    UI.buttons.reset.hidden = true; // 必要
    UI.buttons.start.hidden = false; // 必要
    UI.buttons.start.inert = true; // 必要
    pauseGame();
    whiteOut();
    setTimeout(totalResultHidden, DEFAULT_VALUE_SETTINGS.WHITE_OUT_DELAY);
    setTimeout(initializeAll, DEFAULT_VALUE_SETTINGS.WHITE_OUT_DELAY);
  };

  /***********************************************
    Regions:場合によってbasicSectionsへの統合を考慮
  ***********************************************/

  const regions = {
    gameBoard: document.querySelector("#game-board"), // 未使用の可能性 残すならid(#)→class化(.)を考慮
    modalOverlay: document.querySelector("#modal-overlay"), // 各所に散っている まとめるか消すか 残すならid(#)→class化(.)を考慮
    damageScreen: document.querySelector("#damage-screen"), // 恐らく未使用 残すならid(#)→class化(.)を考慮
    uiContainer: document.querySelector(".ui-container"),
    otherGamesDialog: document.querySelector("#other-games-dialog"), // 各所に散っている まとめるか消すか 残すならid(#)→class化(.)を考慮
  };

  /***********************************************
    Selection Control
  ***********************************************/

  const canSelect = (usedFlag) => {
    return !gameState.pause && !usedFlag;
  };

  const lockRemainingCards = (cardEls, usedFlags) => {
    for (let i = 0; i < cardEls.length; i++) {
      if (usedFlags[i]) {
        cardEls[i].style.opacity = OPACITY.DIM;
        continue;
      }
      cardEls[i].setAttribute("src", CARD_PATH_SETTINGS.BLUE_CARD);
      cardEls[i].style.opacity = OPACITY.DIM;
      usedFlags[i] = true;
    }
  };

  /***********************************************
    Visual Effects
  ***********************************************/

  /***********************************************
    Success Handling
  ***********************************************/

  const handleCorrectDayAnswer = (cardIndex) => {
    usedCards.day[cardIndex] = true;
    battleState.comLifeValue = battleState.comLifeValue - DEFAULT_VALUE_SETTINGS.ARROGANT_DAMAGE;
    arrogantUI.comLifeValue.innerText = battleState.comLifeValue;
    //    arrogantUI.indicator.innerText = `○${sec}.${milliSec}sec`;
    markingState.correct = true;
    for (let i = 0; i < Cards.calculating.day.length - 1 /* 時間切れ用の7がある(8要素ある)ため-1 */; i++) {
      if (usedCards.day[i] === true) {
        continue;
      }
      Cards.calculating.day[i].setAttribute("src", CARD_PATH_SETTINGS.BLUE_CARD); // 正解カード以外閉じる
      usedCards.day[i] = true;
    }
    afterSelectDayCard(); // 要judgement前（この場所）
    judgement();
  };

  const finalizeDayselect = (cardIndex) => {
    Answer.selectedAnswer = outPutselectedAnswer(cardIndex);
    outPutResult();
    questionState.questionIndex++; // この場所
    gameState.daySelected = true;
  };

  /***********************************************
    Failure Handling
  ***********************************************/

  const handleSubCardFailure = (cardEl, usedFlags, index) => {
    cardEl[index].setAttribute("src", CARD_PATH_SETTINGS.RED_CARD);
    usedFlags[index] = true;
    subCardFailed();
  };

  const subCardFailed = () => {
    damageFlash();
    gameState.clean = false;
    battleState.myLifeValue = battleState.myLifeValue - DEFAULT_VALUE_SETTINGS.SUB_CARD_DAMAGE;
    hudState.combo = 0;
    //drawArrogantValues();
    arrogantUI.myLifeValue.innerText = battleState.myLifeValue;
    arrogantUI.combo.innerText = hudState.combo;
    //hudState.misses.assist++;
    judgement();
  };

  const dayCardFailed = () => {
    damageFlash();
    gameState.clean = false;
    battleState.myLifeValue = battleState.myLifeValue - DEFAULT_VALUE_SETTINGS.MAIN_CARD_DAMAGE;
    hudState.combo = 0;
    //hudState.misses.answer++;
    arrogantUI.myLifeValue.innerText = battleState.myLifeValue;
    arrogantUI.combo.innerText = hudState.combo;
    afterSelectDayCard(); // 要judgement前（この場所）
    judgement();
  };

  const handleIncorrectDayAnswer = (cardIndex) => {
    perfectFlag = false;
    //    arrogantUI.indicator.innerText = `×${sec}.${milliSec}sec`;
    markingState.incorrect = true;
    Cards.calculating.day[cardIndex].setAttribute("src", CARD_PATH_SETTINGS.RED_CARD); // 誤答カードを閉じる
    usedCards.day[cardIndex] = true;
    dayCardFailed();
  };

  const handleTimeIsUp = () => {
    arrogantUI.resultIndicator.innerText = "TIME_IS_UP.";
    arrogantUI.resultIndicator.hidden = false;
    markingState.timeIsUp = true;
    dayCardFailed();
  };

  /***********************************************
    After Selection
  ***********************************************/

  const afterSelectDayCard = () => {
    if (gameState.clean === true) {
      hudState.clean++;
      hudState.combo++;
    } else if (gameState.clean === false) {
      hudState.combo = 0;
    }
    useAllCards();
    transparentAllCards();
    if (calendarState.intercalary != true) {
      Cards.calculating.intercalary.style.opacity = OPACITY.FULL;
    }
    recordTime();
    //resetCardOpacity();
    //    drawArrogantValues();
    battleState.totalCount = battleState.totalCount + 1;
    arrogantUI.totalCountValue.innerText = battleState.totalCount;
    openDayCardAnswer();
    Cards.question.day.style.opacity = OPACITY.FULL; // 強調表示
    //    arrogantUI.resultIndicator.style.opacity = OPACITY.FULL;
  };

  const useAllCards = () => {
    for (let i = 0; i < DEFAULT_VALUE_SETTINGS.CALCULATION_CARDS_LENGTH; i++) {
      usedCards.century[i] = true;
      usedCards.year[i] = true;
      usedCards.month[i] = true;
      usedCards.date[i] = true;
      usedCards.day[i] = true;
    }
  };

  /***********************************************
    Next Challenge
  ***********************************************/

  const nextChallenge = () => {
    if (gameState.win === true || gameState.lose === true) {
      gameState.nonstop = false; // 勝敗決定で出題を止める
    }
    gameState.pause = true;
    // 勝敗未決時は出題を続ける
    if (gameState.nonstop === true) {
      basicSections.arrogantLayer.inert = true;
      setTimeout(() => {
        basicSections.arrogantLayer.inert = false;
        arrogantUI.resultIndicator.hidden = true;
        calendarStart();
      }, answerRevealDelay.answerRevealDelayValue);
    }
  };

  /***********************************************
    Select Answers
  ***********************************************/

  const selectIntercalary = () => {
    if (!canSelect(usedCards.intercalary)) return;
    const isCorrect = calendarState.intercalary && (calendarState.monthData === 1 || calendarState.monthData === 2);
    if (!isCorrect) {
      Cards.calculating.intercalary.setAttribute("src", CARD_PATH_SETTINGS.RED_CARD);
      subCardFailed();
    }
    usedCards.intercalary = true;
    playSound(successSound);
    Cards.calculating.intercalary.style.opacity = OPACITY.DIM;
  };

  const selectCentury = (cardIndex) => {
    if (!canSelect(usedCards.century[cardIndex])) return;
    if (cardIndex === Answer.century) {
      usedCards.century[cardIndex] = true;
      playSound(successSound);
      lockRemainingCards(Cards.calculating.century, usedCards.century);
    } else {
      handleSubCardFailure(Cards.calculating.century, usedCards.century, cardIndex);
    }
  };

  const selectYear = (cardIndex) => {
    if (!canSelect(usedCards.year[cardIndex])) return;
    if (cardIndex === Answer.year) {
      usedCards.year[cardIndex] = true;
      playSound(successSound);
      lockRemainingCards(Cards.calculating.year, usedCards.year);
    } else {
      handleSubCardFailure(Cards.calculating.year, usedCards.year, cardIndex);
    }
  };

  const selectMonth = (cardIndex) => {
    if (!canSelect(usedCards.month[cardIndex])) return;
    if (cardIndex === Answer.month) {
      usedCards.month[cardIndex] = true;
      playSound(successSound);
      lockRemainingCards(Cards.calculating.month, usedCards.month);
    } else {
      handleSubCardFailure(Cards.calculating.month, usedCards.month, cardIndex);
    }
  };

  const selectDate = (cardIndex) => {
    if (!canSelect(usedCards.date[cardIndex])) return;
    if (cardIndex === Answer.date) {
      usedCards.date[cardIndex] = true;
      playSound(successSound);
      lockRemainingCards(Cards.calculating.date, usedCards.date);
    } else {
      handleSubCardFailure(Cards.calculating.date, usedCards.date, cardIndex);
    }
  };

  const selectDay = (cardIndex) => {
    if (!canSelect(usedCards.day[cardIndex])) return;
    stopTimer();
    hudState.totalCount++;
    if (cardIndex === DEFAULT_VALUE_SETTINGS.TIME_IS_UP) {
      handleTimeIsUp(cardIndex);
      finalizeDayselect(cardIndex);
      nextChallenge();
      return;
    }
    if (cardIndex === Answer.day) {
      playSound(successSound);
      handleCorrectDayAnswer(cardIndex);
    } else {
      handleIncorrectDayAnswer(cardIndex);
    }
    finalizeDayselect(cardIndex);
    for (let i = 0; i < Cards.calculating.day.length; i++) {
      Cards.calculating.day[i].style.opacity = OPACITY.DIM; // 強調表示
    }
    Cards.calculating.day[cardIndex].style.opacity = OPACITY.FULL; // 強調表示
    if (gameState.win || gameState.lose) return;
    nextChallenge();
  };

  /***********************************************
    Buttons
  ***********************************************/

  arrogantUI.startButton.onclick = () => {
    //initializeCalendarBattle();
    calendarStart();
    arrogantUI.startButton.disabled = true;
    arrogantUI.resetButton.disabled = false;
    arrogantUI.answerRevealDelayButtonsSection.hidden = false;
    arrogantUI.monthAdjustButtonSection.hidden = true;
  };

  arrogantUI.intercalaryCardEl.onclick = () => selectIntercalary(true);

  Cards.calculating.century.forEach((img, cardIndex) => {
    img.onclick = () => selectCentury(cardIndex);
  });

  Cards.calculating.year.forEach((img, cardIndex) => {
    img.onclick = () => selectYear(cardIndex);
  });

  Cards.calculating.month.forEach((img, cardIndex) => {
    img.onclick = () => selectMonth(cardIndex);
  });

  Cards.calculating.date.forEach((img, cardIndex) => {
    img.onclick = () => selectDate(cardIndex);
  });

  Cards.calculating.day.forEach((img, cardIndex) => {
    img.onclick = () => selectDay(cardIndex);
  });

  /****************************************************
    result
  *****************************************************/

  let HitRate = 0; //仮
  const buildArrogantResult = () => {
    const baseTimeHTML = formatTimeHTML(totalTime);
    const baseTimeLog = formatTimeLog(totalTime);
    let message;
    if (winFlag === true) {
      message = "YOU WIN.";
    }
    if (loseFlag === true) {
      message = "YOU LOSE.";
    }
    let result;
    let log;
    return {
      result: (result = message),
      log: (log = message),
    };
  };

  /************************
    commonUI
  ************************/

  const commonUI = {
    resetDialog: document.querySelector("#reset-dialog"), // id(#)→class化(.)を考慮
  };

  const ui = {
    [BattleMode.ignorant]: ignorantUI,
    [BattleMode.unjust]: unjustUI,
    [BattleMode.arrogant]: arrogantUI,
    common: commonUI,
  };

  const resumeBattleButton = document.querySelector("#resume-battle-button"); // id(#)→class化(.)
  const resetBattleButton = document.querySelector("#restart-battle-button"); // id(#)→class化(.)
  const loseButton = document.querySelector("#lose-button"); // id(#)→class化(.)
  const returnTitleButton = document.querySelector("#return-title-button"); // id(#)→class化(.)

  ////////Timer?
  const formatTimeHTML = (time) => {
    return `TotalTime<br>${formatNumber(time)}sec<br>(${formatNumber(time / 60)}min)<br>`;
  };

  const formatTimeLog = (time) => {
    return `TotalTime\n${formatNumber(time)}sec\n(${formatNumber(time / 60)}min)`;
  };

  const formatTime = (count, digit) => {
    const sec = Math.floor(count / 1000)
      .toString()
      .padStart(digit, "0");
    const ms = (count % 1000).toString().padStart(3, "0").slice(0, 2);
    return `${sec}.${ms}sec`;
  };

  const getCardPath = (card, mode = currentMode) => {
    return `${mode}/${card}.png`;
  };

  const formatNumber = (value) => Number(value || 0).toFixed(2);

  const getAnswerCards = () => document.querySelectorAll(".answer-cards-ignorant img");
  //  const comCardsUnjust = () => document.querySelectorAll(".com-cards-unjust img");

  const damageFlash = () => {
    //  const { damageScreen } = ui.common;
    playSound(failSound);
    battleState.combo = 0;
    perfectFlag = false;
    //  battleState.myLifeValue -= basicDamage;
    if (battleState.myLifeValue < 0) {
      battleState.myLifeValue = 0;
      loseFlag = true;
    }
    if (currentMode === BattleMode.ignorant) {
      ignorantBattle.openComNumberCards();
      ignorantUI.damageScreen.classList.add("damageFlash");
      getAnswerCards().forEach((img) => {
        img.style.opacity = OPACITY.DIM;
      });
      setTimeout(() => {
        if (BattleMode.ignorant && !loseFlag) ignorantBattle.closeComNumberCards();
        ignorantUI.damageScreen.classList.remove("damageFlash");
      }, 300);
    } else if (currentMode === BattleMode.unjust) {
      unjustUI.damageScreen.classList.add("damageFlash");
      unjustBattle.openComCards();
      unjustUI.comCardEls.forEach((img) => {
        img.style.opacity = OPACITY.DIM;
      });
      setTimeout(() => {
        if (BattleMode.unjust && !loseFlag) unjustBattle.closeComCards();
        unjustUI.damageScreen.classList.remove("damageFlash");
      }, 300);
      setTimeout(() => {
        unjustUI.comCardEls.forEach((img) => {
          img.style.opacity = 1;
        });
        unjustBattle.closeComCards();
        unjustUI.damageScreen.classList.remove("damageFlash");
        for (let i = 0; i < battleState.cardsCount; i++) {
          unjustUI.comCardEls[i].setAttribute("src", getCardPath(unjustUI.comCardValues[i]));
        }
      }, 300);
    } else if (currentMode === BattleMode.arrogant) {
      arrogantUI.damageScreen.classList.add("damageFlash");
      setTimeout(() => {
        arrogantUI.damageScreen.classList.remove("damageFlash");
      }, 300);
    }
    /*  setTimeout(() => {
    if (BattleMode.ignorant && !loseFlag) ignorantBattle.closeComNumberCards();
    damageScreen.classList.remove("damageFlash");
  }, 300);*/

    judgement();
  };

  const drawValues = (state) => {
    const current = ui[currentMode];
    //  current.comLifeValue.innerText = state.comLifeValue;
    //current.myLifeValue.innerText = state.myLifeValue;
    //  current.totalCount.innerText = state.totalCountValue;
    //  current.perfect.innerText = state.perfect;
    current.combo.innerText = state.combo;
  };

  const judgement = () => {
    if (battleState.myLifeValue <= 0) {
      battleState.myLifeValue = 0;
      if (timerID !== 0) {
        stopTimer();
      }
      if (currentMode === BattleMode.ignorant) {
        ignorantUI.myLifeValue.innerText = battleState.myLifeValue;
      } else if (currentMode === BattleMode.unjust) {
        unjustUI.myLifeValue.innerText = battleState.myLifeValue;
      } else if (currentMode === BattleMode.arrogant) {
        arrogantUI.myLifeValue.innerText = battleState.myLifeValue;
      }
      loseFlag = true;
      battleEnd();
    } else if (battleState.comLifeValue <= 0) {
      battleState.comLifeValue = 0;
      if (timerID !== 0) {
        stopTimer();
      }
      if (currentMode === BattleMode.ignorant) {
        ignorantUI.comLifeValue.innerText = battleState.comLifeValue;
      } else if (currentMode === BattleMode.unjust) {
        unjustUI.comLifeValue.innerText = battleState.comLifeValue;
      } else if (currentMode === BattleMode.arrogant) {
        arrogantUI.comLifeValue.innerText = battleState.comLifeValue;
      }
      winFlag = true;
      battleEnd();
    }
    //  drawValues(battleState);
  };

  const battleEnd = () => {
    const overlay = document.querySelector("#modal-overlay"); // 各所に散っている まとめるか消すか 残すならid(#)→class化(.)を考慮
    overlay.hidden = true;
    basicSections.gameRoot.inert = false;
    pauseFlag = true;
    document.querySelector("#modal-overlay").hidden = false; // 各所に散っている まとめるか消すか 残すならid(#)→class化(.)を考慮
    let resultData;
    if (currentMode === BattleMode.ignorant) {
      resultData = ignorantBattle.buildIgnorantResult();
      showResult(ignorantUI.resultSection, resultData.result);
    } else if (currentMode === BattleMode.unjust) {
      totalTime = parseInt(sec) + parseInt(millisec) / 100;
      resultData = unjustBattle.buildUnjustResult();
      showResult(unjustUI.resultSection, resultData.result);
      unjustUI.resultSection.hidden = false;
    } else if (currentMode === BattleMode.arrogant) {
      //correctRate = ((battleState.totalCount - missCount) / battleState.totalCount) * 100 || 0;
      gameState.nonstop = false;
      arrogantUI.resultIndicator.innerText = ""; //仮処置
      console.log("arr" + arrogantUI.resultIndicator.textContent);
      arrogantUI.resultIndicatorSection.hidden = true; //仮処置
      resultData = buildArrogantResult();
      showResult(arrogantUI.resultSection, resultData.result);
    }
    if (resultData?.log) {
      console.log("%c" + resultData.log, "font-Size:20px;");
    }
    playSound(battleEndSound);
  };

  //-------------

  const battleNextButtonIgnorant = document.querySelector("#battle-next-button-ignorant"); // id(#)→class化(.)
  const battleNextButtonUnjust = document.querySelector("#battle-next-button-unjust"); // id(#)→class化(.)
  const battleNextButtonArrogant = document.querySelector("#battle-next-button-arrogant"); // id(#)→class化(.)

  // 場合によって共通化 その必要があるかどうかは不明
  const showResult = (resultSection, result) => {
    if (currentMode == BattleMode.ignorant) {
      resultSection.querySelector("#result-text-ignorant").innerHTML = result; // id(#)→class化(.)
      ignorantUI.resetButton.disabled = true;
    } else if (currentMode == BattleMode.unjust) {
      resultSection.querySelector("#result-text-unjust").innerHTML = result; // id(#)→class化(.)
      unjustUI.openButton.disabled = true;
      unjustUI.resetButton.disabled = true;
    } else if (currentMode == BattleMode.arrogant) {
      resultSection.querySelector("#result-text-arrogant").innerHTML = result; // id(#)→class化(.)
      arrogantUI.resetButton.disabled = true;
    }
    resultSection.hidden = false;
  };

  battleNextButtonIgnorant.onclick = () => {
    handleBattleEnd();
  };

  battleNextButtonUnjust.onclick = () => {
    handleBattleEnd();
  };

  battleNextButtonArrogant.onclick = () => {
    handleBattleEnd();
  };

  /************************
    Reset Dialogue
  ************************/

  const resetHandlers = {
    [BattleMode.ignorant]: () => {
      ignorantBattle.initIgnorantBattle();
    },
    [BattleMode.unjust]: () => {
      unjustBattle.initUnjustBattle();
    },
    [BattleMode.arrogant]: () => {
      initArrogantBattle();
    },
  };

  const resetDialog = () => {
    if (pauseFlag === true) {
      return;
    }
    document.querySelector("#modal-overlay").hidden = false; // 各所に散っている まとめるか消すか 残すならid(#)→class化(.)を考慮
    document.querySelector("#reset-dialog").hidden = false; // 各所に散っている まとめるか消すか 残すならid(#)→class化(.)を考慮
    ui.common.resetDialog.hidden = false;
    basicSections.gameRoot.inert = true;
    pauseFlag = true;
    stopTimer();
    resumeBattleButton.onclick = () => {
      pauseFlag = false;
      startTimer();
      basicSections.gameRoot.inert = false;
      ui.common.resetDialog.hidden = true;
      document.querySelector("#modal-overlay").hidden = true; // 各所に散っている まとめるか消すか 残すならid(#)→class化(.)を考慮
      document.querySelector("#reset-dialog").hidden = true; // 各所に散っている まとめるか消すか 残すならid(#)→class化(.)を考慮
    };
    resetBattleButton.onclick = () => {
      playSound(healSound);
      resetHandlers[currentMode]();
      basicSections.gameRoot.inert = false;
      ui.common.resetDialog.hidden = true;
      // initializeBattleState();
      // battleState.usedCard = [];
      document.querySelector("#modal-overlay").hidden = true; // 各所に散っている まとめるか消すか 残すならid(#)→class化(.)を考慮
      document.querySelector("#reset-dialog").hidden = true; // 各所に散っている まとめるか消すか 残すならid(#)→class化(.)を考慮
    };
    loseButton.onclick = () => {
      loseFlag = true;
      if (currentMode === BattleMode.arrogant) {
        //      totalTime = totalTime + parseInt(sec) + parseInt(millisec) / 100;
        console.log(arrogantUI.resultIndicator.textContent);
        document.querySelector("#modal-overlay").hidden = true; // 各所に散っている まとめるか消すか 残すならid(#)→class化(.)を考慮
        document.querySelector("#reset-dialog").hidden = true; // 各所に散っている まとめるか消すか 残すならid(#)→class化(.)を考慮
      }
      battleEnd();
      basicSections.gameRoot.inert = false;
      ui.common.resetDialog.hidden = true;
    };
    returnTitleButton.onclick = () => {
      document.querySelector("#modal-overlay").hidden = true; // 各所に散っている まとめるか消すか 残すならid(#)→class化(.)を考慮
      document.querySelector("#reset-dialog").hidden = true; // 各所に散っている まとめるか消すか 残すならid(#)→class化(.)を考慮
      window.open("index.html", "_self");
    };
  };

  Object.values(BattleMode).forEach((mode) => {
    ui[mode].resetButton.onclick = resetDialog;
  });

  window.addEventListener("DOMContentLoaded", () => {
    const el = document.querySelector("#sr-msg");
    el.textContent = el.textContent;
  });
})();
