"use strict";

const STORAGE_KEY = "ket-guardians-v1";
const WORD_MASTER_REWARD = 10;
const WORD_QUIZ_REWARD = 5;
const GAME_ENTRY_COST = 15;
const TOTAL_EQUIPMENT = 60;
const OFFICIAL_SOURCE_LABEL = "Cambridge A2 Key Vocabulary List · August 2025";
const OFFICIAL_WORD_DATA = window.__OFFICIAL_WORD_DATA__ || [];

const WORD_CATEGORIES = [
  {
    id: "food",
    name: "食物派对",
    emoji: "🍎",
    words: [
      ["apple", "苹果"], ["banana", "香蕉"], ["orange", "橙子"], ["pear", "梨"], ["grape", "葡萄"],
      ["chocolate", "巧克力"], ["lemon", "柠檬"], ["mango", "芒果"], ["melon", "甜瓜"], ["strawberry", "草莓"],
      ["pizza", "披萨"], ["carrot", "胡萝卜"], ["potato", "土豆"], ["tomato", "西红柿"], ["onion", "洋葱"],
      ["rice", "米饭"], ["bread", "面包"], ["cake", "蛋糕"], ["cookie", "饼干"], ["milk", "牛奶"],
      ["juice", "果汁"], ["egg", "鸡蛋"], ["coffee", "咖啡"], ["sandwich", "三明治"], ["yoghurt", "酸奶"]
    ]
  },
  {
    id: "animals",
    name: "动物朋友",
    emoji: "🐻",
    words: [
      ["cat", "猫"], ["dog", "狗"], ["bird", "鸟"], ["duck", "鸭子"], ["camel", "骆驼"],
      ["rabbit", "兔子"], ["mouse", "老鼠"], ["horse", "马"], ["cow", "奶牛"], ["crocodile", "鳄鱼"],
      ["sheep", "羊"], ["goat", "山羊"], ["monkey", "猴子"], ["tiger", "老虎"], ["lion", "狮子"],
      ["elephant", "大象"], ["giraffe", "长颈鹿"], ["panda", "熊猫"], ["bear", "熊"], ["donkey", "驴"],
      ["frog", "青蛙"], ["snake", "蛇"], ["fish", "小鱼"], ["bee", "蜜蜂"], ["butterfly", "蝴蝶"]
    ]
  },
  {
    id: "family",
    name: "家庭时光",
    emoji: "👨‍👩‍👧",
    words: [
      ["family", "家庭"], ["father", "爸爸"], ["mother", "妈妈"], ["dad", "爸爸"], ["mum", "妈妈"],
      ["brother", "哥哥"], ["sister", "姐姐"], ["grandfather", "爷爷"], ["grandmother", "奶奶"], ["grandpa", "爷爷"],
      ["grandma", "奶奶"], ["uncle", "叔叔"], ["aunt", "阿姨"], ["cousin", "表亲"], ["baby", "宝宝"],
      ["boy", "男孩"], ["girl", "女孩"], ["friend", "朋友"], ["child", "孩子"], ["parent", "家长"],
      ["son", "儿子"], ["daughter", "女儿"], ["name", "名字"], ["home", "家"], ["love", "爱"]
    ]
  },
  {
    id: "school",
    name: "校园冒险",
    emoji: "🎒",
    words: [
      ["school", "学校"], ["class", "班级"], ["lesson", "课程"], ["teacher", "老师"], ["student", "学生"],
      ["book", "书"], ["pen", "钢笔"], ["pencil", "铅笔"], ["ruler", "尺子"], ["eraser", "橡皮"],
      ["bag", "书包"], ["desk", "书桌"], ["chair", "椅子"], ["board", "黑板"], ["paper", "纸"],
      ["page", "书页"], ["story", "故事"], ["question", "问题"], ["answer", "答案"], ["spell", "拼写"],
      ["read", "阅读"], ["write", "书写"], ["draw", "画画"], ["test", "测试"], ["learn", "学习"]
    ]
  },
  {
    id: "body",
    name: "身体认知",
    emoji: "🦶",
    words: [
      ["head", "头"], ["face", "脸"], ["eye", "眼睛"], ["ear", "耳朵"], ["nose", "鼻子"],
      ["mouth", "嘴巴"], ["tooth", "牙齿"], ["neck", "脖子"], ["arm", "手臂"], ["hand", "手"],
      ["finger", "手指"], ["leg", "腿"], ["foot", "脚"], ["toe", "脚趾"], ["hair", "头发"],
      ["body", "身体"], ["back", "背"], ["stomach", "肚子"], ["pain", "疼痛"], ["medicine", "药"],
      ["heart", "心"], ["healthy", "健康的"], ["cold", "感冒"], ["hurt", "疼"], ["well", "健康的"]
    ]
  },
  {
    id: "clothes",
    name: "穿搭衣橱",
    emoji: "👕",
    words: [
      ["shirt", "衬衫"], ["T-shirt", "T恤"], ["coat", "外套"], ["jacket", "夹克"], ["dress", "连衣裙"],
      ["skirt", "裙子"], ["trousers", "裤子"], ["shorts", "短裤"], ["sock", "袜子"], ["shoe", "鞋子"],
      ["boot", "靴子"], ["hat", "帽子"], ["cap", "鸭舌帽"], ["glove", "手套"], ["scarf", "围巾"],
      ["sweater", "毛衣"], ["pocket", "口袋"], ["watch", "手表"], ["belt", "腰带"], ["uniform", "校服"],
      ["wear", "穿"], ["put", "放上"], ["take", "拿走"], ["pretty", "好看的"], ["new", "新的"]
    ]
  },
  {
    id: "home",
    name: "家里角落",
    emoji: "🏠",
    words: [
      ["room", "房间"], ["bed", "床"], ["door", "门"], ["window", "窗户"], ["table", "桌子"],
      ["lamp", "台灯"], ["clock", "时钟"], ["sofa", "沙发"], ["box", "盒子"], ["toy", "玩具"],
      ["kitchen", "厨房"], ["bathroom", "浴室"], ["garden", "花园"], ["floor", "地板"], ["wall", "墙"],
      ["picture", "图画"], ["phone", "电话"], ["cup", "杯子"], ["plate", "盘子"], ["spoon", "勺子"],
      ["fork", "叉子"], ["knife", "小刀"], ["blanket", "毯子"], ["cupboard", "橱柜"], ["living room", "客厅"]
    ]
  },
  {
    id: "places",
    name: "城市地图",
    emoji: "🏙️",
    words: [
      ["park", "公园"], ["zoo", "动物园"], ["shop", "商店"], ["market", "市场"], ["farm", "农场"],
      ["library", "图书馆"], ["hospital", "医院"], ["street", "街道"], ["road", "道路"], ["bridge", "桥"],
      ["river", "河流"], ["lake", "湖"], ["beach", "海滩"], ["sea", "大海"], ["mountain", "山"],
      ["forest", "森林"], ["city", "城市"], ["town", "小镇"], ["village", "村庄"], ["station", "车站"],
      ["bus stop", "公交站"], ["playground", "操场"], ["cinema", "电影院"], ["museum", "博物馆"], ["square", "广场"]
    ]
  },
  {
    id: "transport",
    name: "出行工具",
    emoji: "🚗",
    words: [
      ["car", "汽车"], ["bus", "公交车"], ["bike", "自行车"], ["train", "火车"], ["aeroplane", "飞机"],
      ["boat", "小船"], ["ship", "大船"], ["taxi", "出租车"], ["tram", "有轨电车"], ["helicopter", "直升机"],
      ["motorbike", "摩托车"], ["underground", "地铁"], ["ticket", "车票"], ["seat", "座位"], ["driver", "司机"],
      ["ride", "乘坐"], ["walk", "走路"], ["run", "跑步"], ["stop", "停下"], ["start", "开始"],
      ["slow", "慢的"], ["fast", "快的"], ["left", "左边"], ["right", "右边"], ["straight", "直走"]
    ]
  },
  {
    id: "time",
    name: "时间天气",
    emoji: "⏰",
    words: [
      ["day", "白天"], ["night", "夜晚"], ["morning", "早上"], ["afternoon", "下午"], ["evening", "傍晚"],
      ["today", "今天"], ["tomorrow", "明天"], ["yesterday", "昨天"], ["week", "星期"], ["month", "月份"],
      ["year", "年"], ["spring", "春天"], ["summer", "夏天"], ["autumn", "秋天"], ["winter", "冬天"],
      ["sunny", "晴朗的"], ["foggy", "有雾的"], ["windy", "有风的"], ["cloudy", "多云的"], ["storm", "暴风雨"],
      ["hot", "热的"], ["warm", "温暖的"], ["cool", "凉爽的"], ["weather", "天气"], ["time", "时间"]
    ]
  },
  {
    id: "colors",
    name: "颜色数字形状",
    emoji: "🎨",
    words: [
      ["red", "红色"], ["blue", "蓝色"], ["yellow", "黄色"], ["green", "绿色"], ["pink", "粉色"],
      ["purple", "紫色"], ["gold", "金色"], ["black", "黑色"], ["white", "白色"], ["brown", "棕色"],
      ["one", "一"], ["two", "二"], ["three", "三"], ["four", "四"], ["five", "五"],
      ["six", "六"], ["seven", "七"], ["eight", "八"], ["nine", "九"], ["ten", "十"],
      ["circle", "圆形"], ["square", "正方形"], ["zero", "零"], ["line", "线"], ["point", "点"]
    ]
  },
  {
    id: "hobbies",
    name: "兴趣乐园",
    emoji: "⚽",
    words: [
      ["play", "玩"], ["game", "游戏"], ["ball", "球"], ["football", "足球"], ["basketball", "篮球"],
      ["badminton", "羽毛球"], ["swim", "游泳"], ["dance", "跳舞"], ["sing", "唱歌"], ["music", "音乐"],
      ["piano", "钢琴"], ["drum", "鼓"], ["song", "歌曲"], ["guitar", "吉他"], ["puzzle", "拼图"],
      ["jump", "跳跃"], ["chess", "国际象棋"], ["kite", "风筝"], ["paint", "绘画"], ["watch", "观看"],
      ["TV", "电视"], ["movie", "电影"], ["party", "派对"], ["fun", "乐趣"], ["happy", "开心的"]
    ]
  },
  {
    id: "daily-verbs",
    name: "日常动作",
    emoji: "✍️",
    words: [
      ["get", "得到"], ["go", "去"], ["come", "来"], ["eat", "吃"], ["drink", "喝"],
      ["sleep", "睡觉"], ["wake", "醒来"], ["wash", "清洗"], ["open", "打开"], ["close", "关闭"],
      ["sit", "坐下"], ["stand", "站立"], ["look", "看"], ["see", "看见"], ["hear", "听见"],
      ["say", "说"], ["tell", "告诉"], ["ask", "询问"], ["help", "帮助"], ["carry", "搬运"],
      ["make", "制作"], ["use", "使用"], ["show", "展示"], ["need", "需要"], ["keep", "保持"]
    ]
  },
  {
    id: "action-verbs",
    name: "冒险动作",
    emoji: "🚀",
    words: [
      ["climb", "攀爬"], ["throw", "扔"], ["catch", "接住"], ["kick", "踢"], ["push", "推"],
      ["pull", "拉"], ["move", "移动"], ["turn", "转动"], ["follow", "跟随"], ["find", "找到"],
      ["lose", "丢失"], ["win", "赢"], ["begin", "开始"], ["finish", "结束"], ["visit", "参观"],
      ["travel", "旅行"], ["drive", "驾驶"], ["fly", "飞行"], ["sail", "航行"], ["laugh", "大笑"],
      ["cry", "哭"], ["share", "分享"], ["bring", "带来"], ["build", "建造"], ["grow", "生长"]
    ]
  },
  {
    id: "adjectives",
    name: "常用形容词",
    emoji: "🌟",
    words: [
      ["big", "大的"], ["small", "小的"], ["long", "长的"], ["short", "短的"], ["tall", "高的"],
      ["little", "小小的"], ["young", "年轻的"], ["old", "老的"], ["good", "好的"], ["bad", "坏的"],
      ["nice", "友好的"], ["beautiful", "漂亮的"], ["lovely", "可爱的"], ["kind", "善良的"], ["busy", "忙碌的"],
      ["easy", "容易的"], ["hard", "困难的"], ["bright", "明亮的"], ["dark", "黑暗的"], ["tidy", "整洁的"],
      ["dirty", "脏的"], ["strong", "强壮的"], ["useful", "有用的"], ["quiet", "安静的"], ["loud", "大声的"]
    ]
  },
  {
    id: "feelings",
    name: "心情表达",
    emoji: "😊",
    words: [
      ["glad", "高兴的"], ["sad", "伤心的"], ["angry", "生气的"], ["tired", "累的"], ["hungry", "饿的"],
      ["thirsty", "渴的"], ["excited", "兴奋的"], ["afraid", "害怕的"], ["brave", "勇敢的"], ["careful", "小心的"],
      ["friendly", "友好的"], ["funny", "有趣的"], ["clever", "聪明的"], ["sweet", "甜甜的"], ["worried", "担心的"],
      ["better", "更好的"], ["best", "最好的"], ["ready", "准备好的"], ["sorry", "抱歉的"], ["sure", "确定的"],
      ["welcome", "受欢迎的"], ["free", "自由的"], ["safe", "安全的"], ["special", "特别的"], ["lucky", "幸运的"]
    ]
  },
  {
    id: "jobs",
    name: "人物职业",
    emoji: "👩‍🚀",
    words: [
      ["people", "人们"], ["man", "男人"], ["woman", "女人"], ["person", "人"], ["classmate", "同学"],
      ["doctor", "医生"], ["nurse", "护士"], ["police officer", "警察"], ["journalist", "记者"], ["cook", "厨师"],
      ["farmer", "农民"], ["coach", "教练"], ["worker", "工人"], ["player", "运动员"], ["singer", "歌手"],
      ["dancer", "舞者"], ["painter", "画家"], ["writer", "作家"], ["visitor", "访客"], ["manager", "经理"],
      ["pilot", "飞行员"], ["king", "国王"], ["queen", "女王"], ["secretary", "秘书"], ["team", "队伍"]
    ]
  },
  {
    id: "nature",
    name: "自然世界",
    emoji: "🌳",
    words: [
      ["tree", "树"], ["flower", "花"], ["grass", "草"], ["star", "星星"], ["wood", "树林"],
      ["sky", "天空"], ["cloud", "云"], ["sun", "太阳"], ["moon", "月亮"], ["space", "太空"],
      ["rain", "雨"], ["snow", "雪"], ["wind", "风"], ["north", "北方"], ["west", "西方"],
      ["south", "南方"], ["fire", "火"], ["water", "水"], ["country", "乡村"], ["air", "空气"],
      ["animal", "动物"], ["plant", "植物"], ["field", "田野"], ["island", "岛"], ["world", "世界"]
    ]
  },
  {
    id: "shopping",
    name: "购物小站",
    emoji: "🛍️",
    words: [
      ["money", "钱"], ["cash", "现金"], ["shop assistant", "店员"], ["price", "价格"], ["buy", "购买"],
      ["sell", "出售"], ["gift", "礼物"], ["shopper", "购物者"], ["card", "卡片"], ["customer", "顾客"],
      ["department store", "百货商店"], ["shop assistant", "店员"], ["bookshop", "书店"], ["supermarket", "超市"], ["store", "商店"],
      ["cheap", "便宜的"], ["expensive", "贵的"], ["receipt", "小票"], ["change", "零钱"], ["choose", "选择"],
      ["pay", "支付"], ["for sale", "出售中"], ["favourite", "最喜欢的"], ["present", "礼物"], ["cent", "分币"]
    ]
  },
  {
    id: "grammar",
    name: "基础功能词",
    emoji: "🔤",
    words: [
      ["I", "我"], ["you", "你"], ["he", "他"], ["she", "她"], ["we", "我们"],
      ["they", "他们"], ["it", "它"], ["my", "我的"], ["your", "你的"], ["his", "他的"],
      ["her", "她的"], ["our", "我们的"], ["this", "这个"], ["that", "那个"], ["these", "这些"],
      ["those", "那些"], ["in", "在里面"], ["on", "在上面"], ["under", "在下面"], ["behind", "在后面"],
      ["with", "和"], ["for", "为了"], ["and", "和"], ["because", "因为"], ["before", "在之前"]
    ]
  }
];

const GRAMMAR_QUESTIONS = [
  { stem: "I ___ a student.", options: ["am", "is", "are"], answer: "am", gold: 15, grammarTag: "be verb", level: 1 },
  { stem: "She ___ my sister.", options: ["am", "is", "are"], answer: "is", gold: 15, grammarTag: "be verb", level: 1 },
  { stem: "We ___ happy today.", options: ["am", "is", "are"], answer: "are", gold: 15, grammarTag: "be verb", level: 1 },
  { stem: "This is ___ apple.", options: ["a", "an", "the"], answer: "an", gold: 15, grammarTag: "articles", level: 1 },
  { stem: "My father is ___ doctor.", options: ["a", "an", "the"], answer: "a", gold: 15, grammarTag: "articles", level: 1 },
  { stem: "It is ___ old bike.", options: ["a", "an", "the"], answer: "an", gold: 15, grammarTag: "articles", level: 1 },
  { stem: "The cat is ___ the box.", options: ["in", "on", "under"], answer: "in", gold: 15, grammarTag: "prepositions", level: 1 },
  { stem: "The book is ___ the desk.", options: ["on", "under", "behind"], answer: "on", gold: 15, grammarTag: "prepositions", level: 1 },
  { stem: "The ball is ___ the chair.", options: ["under", "with", "for"], answer: "under", gold: 15, grammarTag: "prepositions", level: 1 },
  { stem: "Please ___ the window.", options: ["open", "opens", "opening"], answer: "open", gold: 15, grammarTag: "imperatives", level: 1 },
  { stem: "What ___ your name?", options: ["am", "is", "are"], answer: "is", gold: 15, grammarTag: "questions", level: 1 },
  { stem: "___ are my shoes.", options: ["This", "That", "These"], answer: "These", gold: 15, grammarTag: "demonstratives", level: 1 },
  { stem: "___ is your teacher?", options: ["Who", "What", "Where"], answer: "Who", gold: 15, grammarTag: "question words", level: 1 },
  { stem: "How ___ are you?", options: ["old", "big", "many"], answer: "old", gold: 15, grammarTag: "question patterns", level: 1 },
  { stem: "He ___ to school every day.", options: ["go", "goes", "going"], answer: "goes", gold: 15, grammarTag: "present simple", level: 2 },
  { stem: "They ___ football after class.", options: ["play", "plays", "playing"], answer: "play", gold: 15, grammarTag: "present simple", level: 2 },
  { stem: "My mother ___ tea in the morning.", options: ["drink", "drinks", "drinking"], answer: "drinks", gold: 15, grammarTag: "present simple", level: 2 },
  { stem: "We ___ books at school.", options: ["read", "reads", "reading"], answer: "read", gold: 15, grammarTag: "present simple", level: 2 },
  { stem: "I ___ two brothers.", options: ["have", "has", "having"], answer: "have", gold: 15, grammarTag: "have / has", level: 2 },
  { stem: "She ___ a blue dress.", options: ["have", "has", "having"], answer: "has", gold: 15, grammarTag: "have / has", level: 2 },
  { stem: "There ___ a cat in the room.", options: ["is", "are", "am"], answer: "is", gold: 15, grammarTag: "there is / are", level: 2 },
  { stem: "There ___ three apples on the table.", options: ["is", "are", "am"], answer: "are", gold: 15, grammarTag: "there is / are", level: 2 },
  { stem: "Where ___ the pencils?", options: ["am", "is", "are"], answer: "are", gold: 15, grammarTag: "questions", level: 2 },
  { stem: "Can you ___ the answer?", options: ["tell", "tells", "telling"], answer: "tell", gold: 15, grammarTag: "modal + verb", level: 2 },
  { stem: "The bird can ___ high.", options: ["fly", "flies", "flying"], answer: "fly", gold: 15, grammarTag: "modal + verb", level: 2 },
  { stem: "We ___ lunch at twelve.", options: ["have", "has", "having"], answer: "have", gold: 15, grammarTag: "present simple", level: 2 },
  { stem: "She ___ very kind.", options: ["am", "is", "are"], answer: "is", gold: 15, grammarTag: "be verb", level: 2 },
  { stem: "They are ___ the playground.", options: ["in", "at", "with"], answer: "at", gold: 15, grammarTag: "prepositions", level: 2 },
  { stem: "This toy is ___ my friend.", options: ["for", "under", "behind"], answer: "for", gold: 15, grammarTag: "prepositions", level: 2 },
  { stem: "___ colour is the kite?", options: ["Who", "What", "How"], answer: "What", gold: 15, grammarTag: "question words", level: 2 },
  { stem: "How ___ apples do you have?", options: ["much", "many", "old"], answer: "many", gold: 15, grammarTag: "quantifiers", level: 2 },
  { stem: "I can see ___ sun.", options: ["a", "an", "the"], answer: "the", gold: 15, grammarTag: "articles", level: 3 },
  { stem: "I like ___ music.", options: ["listen", "listens", "listening to"], answer: "listening to", gold: 15, grammarTag: "verb patterns", level: 3 },
  { stem: "Let us ___ a game.", options: ["play", "plays", "playing"], answer: "play", gold: 15, grammarTag: "verb patterns", level: 3 },
  { stem: "My bag is ___ the door.", options: ["behind", "before", "for"], answer: "behind", gold: 15, grammarTag: "prepositions", level: 3 },
  { stem: "My sister is ___ than me.", options: ["tall", "taller", "tallest"], answer: "taller", gold: 15, grammarTag: "comparatives", level: 3 },
  { stem: "This is the ___ toy in the shop.", options: ["small", "smaller", "smallest"], answer: "smallest", gold: 15, grammarTag: "superlatives", level: 3 },
  { stem: "I am hungry ___ I want bread.", options: ["because", "and", "before"], answer: "and", gold: 15, grammarTag: "linking words", level: 3 },
  { stem: "We wear coats ___ winter.", options: ["in", "on", "with"], answer: "in", gold: 15, grammarTag: "time prepositions", level: 3 },
  { stem: "Please wash your hands ___ dinner.", options: ["before", "behind", "under"], answer: "before", gold: 15, grammarTag: "time prepositions", level: 3 }
];

const EQUIPMENT_SOURCE_MAP = {
  tank: {
    m1: { name: "M1 Abrams主战坦克", image: "assets/equipment/tank-m1-baike.jpg", credit: "百度百科 · M1主战坦克" },
    t90: { name: "T-90主战坦克", image: "assets/equipment/tank-t90-baike.jpg", credit: "百度百科 · T-90主战坦克" },
    leopard2: { name: "豹2主战坦克", image: "assets/equipment/tank-leopard2-baike.jpg", credit: "百度百科 · 豹2主战坦克" },
    challenger2: { name: "挑战者2主战坦克", image: "assets/equipment/tank-challenger2-baike.jpg", credit: "百度百科 · 挑战者2主战坦克" },
    m1a1: { name: "M1A1 Abrams主战坦克", image: "assets/equipment/tank-m1a1-abrams.jpg", credit: "Wikimedia Commons / U.S. Army photo" },
    type99a: { name: "99A式主战坦克", image: "assets/equipment/tank-99a-baike.jpg", credit: "百度百科 · 99A式主战坦克" },
    type10: { name: "10式主战坦克", image: "assets/equipment/tank-type10-baike.jpg", credit: "百度百科 · 10式主战坦克" },
    leclerc: { name: "勒克莱尔主战坦克", image: "assets/equipment/tank-leclerc-baike.jpg", credit: "百度百科 · 勒克莱尔主战坦克" },
    merkava: { name: "梅卡瓦主战坦克", image: "assets/equipment/tank-merkava-baike.jpg", credit: "百度百科 · 梅卡瓦主战坦克" },
    vt4: { name: "VT-4主战坦克", image: "assets/equipment/tank-vt4-baike.jpg", credit: "百度百科 · VT-4主战坦克" },
    m60: { name: "M60主战坦克", image: "assets/equipment/tank-m60-baike.jpg", credit: "百度百科 · M60主战坦克" },
    amx30: { name: "AMX-30主战坦克", image: "assets/equipment/tank-amx30-baike.jpg", credit: "百度百科 · AMX-30主战坦克" },
    t72: { name: "T-72主战坦克", image: "assets/equipment/tank-t72-baike.jpg", credit: "百度百科 · T-72主战坦克" },
    t80: { name: "T-80主战坦克", image: "assets/equipment/tank-t80-baike.jpg", credit: "百度百科 · T-80主战坦克" },
    type15: { name: "15式轻型坦克", image: "assets/equipment/tank-type15-baike.jpg", credit: "百度百科 · 15式轻型坦克" }
  },
  weapon: {
    m4: { name: "M4卡宾枪", image: "assets/equipment/weapon-m4-baike.png", credit: "百度百科 · M4卡宾枪" },
    awm: { name: "AWM狙击步枪", image: "assets/equipment/weapon-awm-baike.jpg", credit: "百度百科 · AWM狙击步枪" },
    desertEagle: { name: "沙漠之鹰手枪", image: "assets/equipment/weapon-desert-eagle-baike.jpg", credit: "百度百科 · 沙漠之鹰" },
    m16: { name: "M16步枪", image: "assets/equipment/weapon-m16-baike.jpg", credit: "百度百科 · M16步枪" },
    ak47: { name: "AK-47自动步枪", image: "assets/equipment/weapon-ak47-baike.jpg", credit: "百度百科 · AK-47自动步枪" },
    qbz95: { name: "95式自动步枪", image: "assets/equipment/weapon-qbz95-baike.jpg", credit: "百度百科 · 95式自动步枪" },
    scar: { name: "SCAR突击步枪", image: "assets/equipment/weapon-scar-baike.jpg", credit: "百度百科 · SCAR突击步枪" },
    g36: { name: "G36自动步枪", image: "assets/equipment/weapon-g36-baike.jpg", credit: "百度百科 · G36自动步枪" },
    mp5: { name: "MP5冲锋枪", image: "assets/equipment/weapon-mp5-baike.jpg", credit: "百度百科 · MP5冲锋枪" },
    p90: { name: "P90冲锋枪", image: "assets/equipment/weapon-p90-baike.jpg", credit: "百度百科 · P90冲锋枪" },
    m82a1: { name: "M82A1狙击步枪", image: "assets/equipment/weapon-m82a1-baike.jpg", credit: "百度百科 · M82A1狙击步枪" },
    glock17: { name: "格洛克17手枪", image: "assets/equipment/weapon-glock17-baike.jpg", credit: "百度百科 · 格洛克17型手枪" },
    f2000: { name: "FN F2000突击步枪", image: "assets/equipment/weapon-f2000-baike.jpg", credit: "百度百科 · FN F2000突击步枪" },
    sg550: { name: "SG550突击步枪", image: "assets/equipment/weapon-sg550-baike.jpg", credit: "百度百科 · SG550突击步枪" },
    m249: { name: "M249班用机枪", image: "assets/equipment/weapon-m249-baike.jpg", credit: "百度百科 · M249机枪" },
    uzi: { name: "乌兹冲锋枪", image: "assets/equipment/weapon-uzi-baike.jpg", credit: "百度百科 · 乌兹冲锋枪" }
  },
  air: {
    j20: { name: "歼-20战斗机", image: "assets/equipment/air-j20-baike.jpg", credit: "百度百科 · 歼-20战斗机" },
    f22: { name: "F-22猛禽战斗机", image: "assets/equipment/air-f22-baike.jpg", credit: "百度百科 · F-22猛禽战斗机" },
    su57: { name: "苏-57战斗机", image: "assets/equipment/air-su57-baike.jpg", credit: "百度百科 · 苏-57战斗机" },
    b2: { name: "B-2隐形轰炸机", image: "assets/equipment/air-b2-baike.jpg", credit: "百度百科 · B-2隐形轰炸机" },
    f35: { name: "F-35战斗机", image: "assets/equipment/air-f35-baike.jpg", credit: "百度百科 · F-35战斗机" },
    su35: { name: "苏-35战斗机", image: "assets/equipment/air-su35-baike.jpg", credit: "百度百科 · 苏-35战斗机" },
    j16: { name: "歼-16战斗机", image: "assets/equipment/air-j16-baike.jpg", credit: "百度百科 · 歼-16" },
    rafale: { name: "阵风战斗机", image: "assets/equipment/air-rafale-baike.jpg", credit: "百度百科 · 阵风战斗机" },
    typhoon: { name: "台风战斗机", image: "assets/equipment/air-typhoon-baike.jpg", credit: "百度百科 · 台风战斗机" },
    mig29: { name: "米格-29战斗机", image: "assets/equipment/air-mig29-baike.jpg", credit: "百度百科 · 米格-29战斗机" },
    gripen: { name: "鹰狮战斗机", image: "assets/equipment/air-gripen-baike.jpg", credit: "百度百科 · JAS-39战斗机" },
    mig31: { name: "米格-31战斗机", image: "assets/equipment/air-mig31-baike.jpg", credit: "百度百科 · 米格-31战斗机" },
    tu160: { name: "图-160战略轰炸机", image: "assets/equipment/air-tu160-baike.jpg", credit: "百度百科 · 图-160轰炸机" },
    b1b: { name: "B-1B战略轰炸机", image: "assets/equipment/air-b1b-baike.jpg", credit: "百度百科 · B-1轰炸机" },
    f15: { name: "F-15战斗机", image: "assets/equipment/air-f15-baike.jpg", credit: "百度百科 · F-15战斗机" }
  },
  ship: {
    liaoning: { name: "辽宁舰航空母舰", image: "assets/equipment/ship-liaoning-baike.jpg", credit: "百度百科 · 中国人民解放军海军辽宁舰" },
    shandong: { name: "山东舰航空母舰", image: "assets/equipment/ship-shandong-baike.jpg", credit: "百度百科 · 中国人民解放军海军山东舰" },
    fujian: { name: "福建舰航空母舰", image: "assets/equipment/ship-fujian-baike.jpg", credit: "百度百科 · 中国人民解放军海军福建舰" },
    type055: { name: "055型驱逐舰", image: "assets/equipment/ship-type055-baike.jpg", credit: "百度百科 · 055型驱逐舰" },
    type052d: { name: "052D型驱逐舰", image: "assets/equipment/ship-type052d-baike.jpg", credit: "百度百科 · 052D型驱逐舰" },
    arleighBurke: { name: "阿利·伯克级驱逐舰", image: "assets/equipment/ship-arleigh-burke-baike.jpg", credit: "百度百科 · 阿利·伯克级驱逐舰" },
    zumwalt: { name: "朱姆沃尔特级驱逐舰", image: "assets/equipment/ship-zumwalt-baike.jpg", credit: "百度百科 · 朱姆沃尔特级驱逐舰" },
    ticonderoga: { name: "提康德罗加级巡洋舰", image: "assets/equipment/ship-ticonderoga-baike.jpg", credit: "百度百科 · 提康德罗加级巡洋舰" },
    kirov: { name: "基洛夫级巡洋舰", image: "assets/equipment/ship-kirov-baike.jpg", credit: "百度百科 · 1144型巡洋舰" },
    nimitz: { name: "尼米兹级航空母舰", image: "assets/equipment/ship-nimitz-baike.jpg", credit: "百度百科 · 尼米兹级航空母舰" },
    ford: { name: "福特级航空母舰", image: "assets/equipment/ship-ford-baike.jpg", credit: "百度百科 · 福特级航空母舰" },
    yamato: { name: "大和号战列舰", image: "assets/equipment/ship-yamato-baike.jpg", credit: "百度百科 · 大和号战列舰" },
    bismarck: { name: "俾斯麦号战列舰", image: "assets/equipment/ship-bismarck-baike.jpg", credit: "百度百科 · 俾斯麦号战列舰" },
    slava: { name: "光荣级巡洋舰", image: "assets/equipment/ship-slava-baike.jpg", credit: "百度百科 · 1164型巡洋舰" },
    type45: { name: "45型驱逐舰", image: "assets/equipment/ship-type45-baike.jpg", credit: "百度百科 · 45型驱逐舰" }
  }
};

const EQUIPMENT_LAYOUT = {
  tank: [
    ["m1", "normal"], ["t90", "normal"], ["leopard2", "normal"], ["challenger2", "normal"], ["m1a1", "normal"],
    ["type99a", "normal"], ["type10", "normal"], ["leclerc", "normal"], ["merkava", "normal"], ["vt4", "normal"],
    ["m60", "rare"], ["amx30", "rare"], ["t72", "rare"], ["t80", "rare"], ["type15", "legend"]
  ],
  weapon: [
    ["m4", "normal"], ["awm", "normal"], ["desertEagle", "normal"], ["m16", "normal"], ["ak47", "normal"],
    ["m249", "normal"], ["qbz95", "normal"], ["scar", "normal"], ["g36", "normal"], ["mp5", "normal"],
    ["p90", "rare"], ["m82a1", "rare"], ["glock17", "rare"], ["f2000", "rare"], ["sg550", "legend"]
  ],
  air: [
    ["j20", "normal"], ["f22", "normal"], ["su57", "normal"], ["b2", "normal"], ["f35", "normal"],
    ["su35", "normal"], ["j16", "normal"], ["rafale", "normal"], ["typhoon", "normal"], ["mig29", "normal"],
    ["gripen", "rare"], ["mig31", "rare"], ["tu160", "rare"], ["b1b", "rare"], ["f15", "legend"]
  ],
  ship: [
    ["liaoning", "normal"], ["shandong", "normal"], ["fujian", "normal"], ["type055", "normal"], ["type052d", "normal"],
    ["arleighBurke", "normal"], ["zumwalt", "normal"], ["ticonderoga", "normal"], ["kirov", "normal"], ["nimitz", "normal"],
    ["ford", "rare"], ["yamato", "rare"], ["bismarck", "rare"], ["slava", "rare"], ["type45", "legend"]
  ]
};

const EQUIPMENT_SYMBOL_PREFIX = {
  tank: "T",
  weapon: "W",
  air: "A",
  ship: "S"
};

const EQUIPMENT_BANK = Object.entries(EQUIPMENT_LAYOUT).flatMap(([category, layout]) =>
  layout.map(([key, rarity], index) => {
    const source = EQUIPMENT_SOURCE_MAP[category][key];
    const prefix = EQUIPMENT_SYMBOL_PREFIX[category];
    return {
      id: `${category}-${index + 1}`,
      category,
      name: source.name,
      rarity,
      symbol: `${prefix}-${String(index + 1).padStart(2, "0")}`,
      image: source.image,
      credit: source.credit
    };
  })
);

const EQUIPMENT_CATEGORY_META = {
  tank: { short: "坦克", title: "坦克装备图鉴", completeTitle: "恭喜集齐坦克装备图鉴！", emoji: "🛡️" },
  weapon: { short: "枪械", title: "枪械装备图鉴", completeTitle: "恭喜集齐枪械装备图鉴！", emoji: "🎯" },
  air: { short: "飞机", title: "飞机装备图鉴", completeTitle: "恭喜集齐飞机装备图鉴！", emoji: "✈️" },
  ship: { short: "军舰", title: "军舰装备图鉴", completeTitle: "恭喜集齐军舰装备图鉴！", emoji: "🚢" }
};

const EQUIPMENT_CATEGORY_ORDER = ["tank", "weapon", "air", "ship"];

const uiState = {
  screen: "home",
  studyMode: "learn",
  collectionTab: "all",
  studyCategory: "all",
  studyTier: "all"
};

const state = loadState();
const WORD_BANK = buildWordBank();
const WORD_MAP = new Map(WORD_BANK.map((item) => [item.id, item]));
const WORD_IDS = new Set(WORD_BANK.map((item) => item.id));
const WORD_CATEGORY_META = buildWordCategoryMeta();
const WORD_TIER_META = buildWordTierMeta();
const QUESTION_BANK = buildQuestionBank();
const QUESTION_MAP = new Map(QUESTION_BANK.map((item) => [item.id, item]));
const QUESTION_IDS = new Set(QUESTION_BANK.map((item) => item.id));
const EQUIPMENT_IDS = new Set(EQUIPMENT_BANK.map((item) => item.id));

const dom = {
  loadingScreen: document.getElementById("loadingScreen"),
  goldStat: document.getElementById("goldStat"),
  equipmentStat: document.getElementById("equipmentStat"),
  wordStat: document.getElementById("wordStat"),
  questionStat: document.getElementById("questionStat"),
  homeScreen: document.getElementById("homeScreen"),
  studyScreen: document.getElementById("studyScreen"),
  questionScreen: document.getElementById("questionScreen"),
  gameScreen: document.getElementById("gameScreen"),
  collectionScreen: document.getElementById("collectionScreen"),
  homeView: document.getElementById("homeView"),
  studyView: document.getElementById("studyView"),
  questionView: document.getElementById("questionView"),
  collectionView: document.getElementById("collectionView"),
  gameHud: document.getElementById("gameHud"),
  gameSidePanel: document.getElementById("gameSidePanel"),
  gameCanvas: document.getElementById("gameCanvas"),
  toast: document.getElementById("toast"),
  modalBackdrop: document.getElementById("modalBackdrop"),
  modalTag: document.getElementById("modalTag"),
  modalTitle: document.getElementById("modalTitle"),
  modalBody: document.getElementById("modalBody"),
  modalActions: document.getElementById("modalActions")
};

let currentStudyWordId = null;
let currentWordQuiz = null;
let currentQuestionSession = null;
let toastTimer = null;
let modalActionHandlers = [];

const game = createGameController(dom.gameCanvas);

init();

function init() {
  repairState();
  registerDailyActivity();
  currentStudyWordId = pickNextStudyWordId();
  bindGlobalEvents();
  render();
  if (state.dataResetNotice) {
    showToast("数据已恢复默认，可重新开始学习。");
    state.dataResetNotice = false;
    saveState();
  }
  if (!state.guideSeen) {
    openGuide();
  }
  window.setTimeout(() => {
    dom.loadingScreen.classList.add("hidden");
  }, 260);
}

function bindGlobalEvents() {
  document.addEventListener("click", handleClick);
  dom.modalActions.addEventListener("click", (event) => {
    const button = event.target.closest("[data-modal-index]");
    if (!button) {
      return;
    }
    const index = Number(button.dataset.modalIndex);
    const handler = modalActionHandlers[index];
    if (handler) {
      handler();
    }
  });

  dom.gameCanvas.addEventListener("click", (event) => {
    if (!game.active) {
      return;
    }
    const rect = dom.gameCanvas.getBoundingClientRect();
    const scaleX = dom.gameCanvas.width / rect.width;
    const scaleY = dom.gameCanvas.height / rect.height;
    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;
    placeTower(x, y);
  });

  window.addEventListener("beforeunload", () => {
    saveState();
  });
}

function handleClick(event) {
  const target = event.target.closest("button");
  if (!target) {
    return;
  }

  if (target.dataset.nav) {
    navigateTo(target.dataset.nav);
  }

  if (target.dataset.homeAction) {
    navigateTo(target.dataset.homeAction);
  }

  if (target.dataset.studyTab) {
    uiState.studyMode = target.dataset.studyTab;
    if (uiState.studyMode === "quiz") {
      ensureWordQuiz();
    }
    renderStudyView();
  }

  if (target.dataset.studyCategory) {
    uiState.studyCategory = target.dataset.studyCategory;
    currentStudyWordId = pickNextStudyWordId();
    renderStudyView();
  }

  if (target.dataset.studyTier) {
    uiState.studyTier = target.dataset.studyTier;
    currentStudyWordId = pickNextStudyWordId();
    currentWordQuiz = null;
    renderStudyView();
  }

  if (target.dataset.studyAction) {
    handleStudyAction(target.dataset.studyAction);
  }

  if (target.dataset.wordOption) {
    selectWordOption(target.dataset.wordOption);
  }

  if (target.dataset.questionMode) {
    startQuestionSession(target.dataset.questionMode);
  }

  if (target.dataset.questionOption) {
    selectQuestionOption(target.dataset.questionOption);
  }

  if (target.dataset.questionAction) {
    handleQuestionAction(target.dataset.questionAction);
  }

  if (target.dataset.collectionTab) {
    uiState.collectionTab = target.dataset.collectionTab;
    renderCollectionView();
  }

  if (target.dataset.gameAction) {
    handleGameAction(target.dataset.gameAction);
  }

  if (target.dataset.rewardCard) {
    claimRewardCard(Number(target.dataset.rewardCard));
  }

  if (target.dataset.recommendAction) {
    handleRecommendAction(target.dataset.recommendAction);
  }

  if (target.dataset.resetModule) {
    openResetModal(target.dataset.resetModule);
  }
}

function render() {
  renderStats();
  renderHomeView();
  renderStudyView();
  renderQuestionView();
  renderGameView();
  renderCollectionView();
  updateScreenVisibility();
}

function renderStats() {
  dom.goldStat.textContent = state.gold;
  dom.equipmentStat.textContent = `${state.unlockedEquipment.length}/${TOTAL_EQUIPMENT}`;
  dom.wordStat.textContent = `${state.learnedWords.length}/${WORD_BANK.length}`;
  dom.questionStat.textContent = `${state.doneQuestions.length}/${QUESTION_BANK.length}`;
}

function renderHomeView() {
  const wordProgress = getPercent(state.learnedWords.length, WORD_BANK.length);
  const assessProgress = getPercent(state.assessedWords.length, Math.max(state.learnedWords.length, 1));
  const questionProgress = getPercent(state.doneQuestions.length, QUESTION_BANK.length);
  const wrongCount = state.wrongQuestions.length;
  const recentReward = state.lastRewardName || "下一件装备等你来抽取";
  const topGrammar = getGrammarTagStats().sort((left, right) => right.donePercent - left.donePercent)[0];
  const recommendation = getRecommendedNextStep();
  const streakDays = state.streakDays || 1;

  dom.homeView.innerHTML = `
    <div class="hero-panel">
      <div class="hero-grid">
        <div class="hero-copy">
          <p class="eyebrow">学习赚金币 · 闯关掉装备</p>
          <h2>先学单词，再守基地，<br>把 KET 练成每日小胜利。</h2>
          <p class="body-copy">每次背会单词、完成题目都会自动存档。金币够了就去玩一局塔防，闯关成功还能解锁真实军备图鉴里的坦克、枪械和飞机。</p>

          <div class="menu-grid">
            <button class="menu-btn" data-home-action="study">
              <div class="menu-icon icon-word">A</div>
              <strong>KET单词背诵</strong>
              <span>单页大卡片，点一下“我会了”就能赚金币。</span>
            </button>
            <button class="menu-btn" data-home-action="question">
              <div class="menu-icon icon-question">Q</div>
              <strong>KET专项答题</strong>
              <span>按 Part 1 看图选词和 Part 4 基础单选练习，也支持错题重练。</span>
            </button>
            <button class="menu-btn" data-home-action="game">
              <div class="menu-icon icon-game">G</div>
              <strong>塔防闯关游戏</strong>
              <span>每局消耗 15 金币，点击草地就能摆放炮塔。</span>
            </button>
            <button class="menu-btn" data-home-action="collection">
              <div class="menu-icon icon-collection">B</div>
              <strong>我的装备图鉴</strong>
              <span>普通、稀有、限定都会保存在本机图鉴里。</span>
            </button>
          </div>
        </div>

        <div class="hero-sticker">
          <article class="sticker-card sticker-blue">
            <div class="sticker-icon">💰</div>
            <strong>金币储备</strong>
            <span>当前有 ${state.gold} 枚金币，够不够再玩一局？</span>
          </article>
          <article class="sticker-card sticker-pink">
            <div class="sticker-icon">📚</div>
            <strong>单词考核</strong>
            <span>已考核 ${state.assessedWords.length} 个，词汇范围对齐 ${OFFICIAL_SOURCE_LABEL}。</span>
          </article>
          <article class="sticker-card sticker-mint">
            <div class="sticker-icon">🛡️</div>
            <strong>装备收集</strong>
            <span>最近奖励：${recentReward}</span>
          </article>
          <article class="sticker-card sticker-orange">
            <div class="sticker-icon">🎯</div>
            <strong>错题数量</strong>
            <span>${wrongCount} 道待回顾，点开专项答题就能马上重练。</span>
          </article>
          <article class="sticker-card sticker-blue sticker-priority">
            <div class="sticker-icon">🧭</div>
            <strong>${recommendation.label}</strong>
            <span>${recommendation.detail}</span>
            <button class="action-btn ghost-btn" style="margin-top:12px;" data-recommend-action="${recommendation.action}">${recommendation.actionLabel}</button>
          </article>
          <article class="sticker-card sticker-mint">
            <div class="sticker-icon">🔥</div>
            <strong>连续学习 ${streakDays} 天</strong>
            <span>${state.lastActiveDate ? `最近一次学习日：${state.lastActiveDate}` : "今天开始建立你的学习节奏。"}</span>
          </article>
        </div>
      </div>

      <div class="overview-grid">
        <article class="section-card">
          <p class="eyebrow">单词进度</p>
          <h3>${state.learnedWords.length}/${WORD_BANK.length} 个</h3>
          <div class="progress-row"><span class="tiny-note">已背诵</span><span class="tiny-note">${wordProgress}%</span></div>
          <div class="progress-track"><div class="progress-fill" style="width:${wordProgress}%"></div></div>
          <div class="progress-row"><span class="tiny-note">已考核</span><span class="tiny-note">${assessProgress}%</span></div>
          <div class="progress-track"><div class="progress-fill gold-fill" style="width:${assessProgress}%"></div></div>
        </article>
        <article class="section-card">
          <p class="eyebrow">答题进度</p>
          <h3>${state.doneQuestions.length}/${QUESTION_BANK.length} 题</h3>
          <div class="progress-row"><span class="tiny-note">随机刷题覆盖率</span><span class="tiny-note">${questionProgress}%</span></div>
          <div class="progress-track"><div class="progress-fill green-fill" style="width:${questionProgress}%"></div></div>
          <p class="stat-line">题目按 Part 1 和 Part 4 组织，错题本里还有 ${wrongCount} 题可单独重练。${topGrammar ? `当前推进最快的语法点是 ${topGrammar.tag}。` : ""}</p>
        </article>
        <article class="section-card">
          <p class="eyebrow">图鉴进度</p>
          <h3>${state.unlockedEquipment.length}/${TOTAL_EQUIPMENT} 件</h3>
          <div class="progress-row"><span class="tiny-note">坦克 + 枪械 + 飞机 + 军舰</span><span class="tiny-note">${getPercent(state.unlockedEquipment.length, TOTAL_EQUIPMENT)}%</span></div>
          <div class="progress-track"><div class="progress-fill pink-fill" style="width:${getPercent(state.unlockedEquipment.length, TOTAL_EQUIPMENT)}%"></div></div>
          <ul class="tip-list">
            <li>词库来源：${OFFICIAL_SOURCE_LABEL}。</li>
            <li>游戏失败不会额外扣金币。</li>
            <li>闯关成功后翻 1 张卡牌抽奖励。</li>
            <li>收集满一整套会自动弹出提醒。</li>
          </ul>
          <div class="option-stack" style="margin-top:16px;">
            <button class="option-btn" data-reset-module="words">重置单词进度</button>
            <button class="option-btn" data-reset-module="questions">重置答题进度</button>
            <button class="option-btn" data-reset-module="collection">重置图鉴进度</button>
          </div>
        </article>
      </div>
    </div>
  `;
}

function renderStudyView() {
  const learnedCount = state.learnedWords.length;
  const assessedCount = state.assessedWords.length;
  const currentWord = WORD_MAP.get(currentStudyWordId) || WORD_BANK[0];
  const wordProgress = getPercent(learnedCount, WORD_BANK.length);
  const assessProgress = getPercent(assessedCount, Math.max(learnedCount, 1));
  const categoryStats = getWordCategoryStats();
  const tierStats = getWordTierStats();
  const currentTierLabel = getCurrentTierLabel();

  if (uiState.studyMode === "quiz") {
    ensureWordQuiz();
  }

  dom.studyView.innerHTML = `
    <div class="section-shell">
      <div class="section-head">
        <div>
          <p class="eyebrow">单词背诵与考核</p>
          <h2>一张词卡，一次进步</h2>
        </div>
        <button class="action-btn ghost-btn" data-nav="home">返回首页</button>
      </div>

      <div class="toolbar-row">
        <div class="pill">已背单词 ${learnedCount}/${WORD_BANK.length}</div>
        <div class="pill">已考核 ${assessedCount}/${Math.max(learnedCount, 0)}</div>
        <div class="pill">当前金币 ${state.gold}</div>
      </div>

      <div class="feedback-box">
        ${!state.learnedWords.length ? "新手默认先学“核心必学”层，先把最常用、最容易上手的词背熟。" : `当前学习层级：${currentTierLabel}。可以先稳住核心必学，再切到进阶拓展和短语功能词。`}
      </div>

      <div class="progress-row"><span class="tiny-note">背词进度</span><span class="tiny-note">${wordProgress}%</span></div>
      <div class="progress-track"><div class="progress-fill" style="width:${wordProgress}%"></div></div>
      <div class="progress-row"><span class="tiny-note">考核覆盖</span><span class="tiny-note">${assessProgress}%</span></div>
      <div class="progress-track"><div class="progress-fill gold-fill" style="width:${assessProgress}%"></div></div>

      <div class="subnav-row" style="margin-top:18px;">
        <button class="tab-btn ${uiState.studyMode === "learn" ? "is-active" : ""}" data-study-tab="learn">KET单词背诵</button>
        <button class="tab-btn ${uiState.studyMode === "quiz" ? "is-active" : ""}" data-study-tab="quiz">单词考核</button>
      </div>

      <details class="fold-panel" open>
        <summary>学习分层选择</summary>
        <div class="option-stack fold-body">
          <button class="option-btn ${uiState.studyTier === "all" ? "is-selected" : ""}" data-study-tier="all">全部层级</button>
          ${tierStats
            .map((item) => `<button class="option-btn ${uiState.studyTier === item.id ? "is-selected" : ""}" data-study-tier="${item.id}">${item.emoji} ${item.name} · 已背 ${item.learned}/${item.total}</button>`)
            .join("")}
        </div>
      </details>

      <details class="fold-panel" open>
        <summary>主题词包选择</summary>
        <div class="option-stack fold-body">
          <button class="option-btn ${uiState.studyCategory === "all" ? "is-selected" : ""}" data-study-category="all">全部主题</button>
          ${categoryStats
            .map((item) => `<button class="option-btn ${uiState.studyCategory === item.id ? "is-selected" : ""}" data-study-category="${item.id}">${item.emoji} ${item.name} · 已背 ${item.learned}/${item.total}</button>`)
            .join("")}
        </div>
      </details>

      ${
        uiState.studyMode === "learn"
          ? `
            <div class="study-layout">
              <article class="study-card">
                <div class="illustration-card">
                  <div class="word-card-main">
                    <div class="illustration-emoji">${currentWord.visual}</div>
                    <p class="eyebrow">${currentWord.categoryName}</p>
                    <h3>${currentWord.word}</h3>
                    <p class="body-copy">${currentWord.chinese}</p>
                    <div class="word-meta">
                      <span class="meta-chip">${getTierEmoji(currentWord.tier)} ${currentWord.tierName}</span>
                      <span class="meta-chip">简易拼读 ${currentWord.phonetic}</span>
                      <span class="meta-chip">词库编号 ${currentWord.order}</span>
                      ${currentWord.pos ? `<span class="meta-chip">词性 ${currentWord.pos}</span>` : ""}
                    </div>
                    <div class="word-card-actions">
                      <button class="action-btn secondary-btn word-speak-btn" data-study-action="speak">播放单词发音</button>
                    </div>
                  </div>
                </div>
              </article>

              <article class="study-card">
                <p class="eyebrow">操作面板</p>
                <h3>背会了就领奖励</h3>
                <p class="section-copy">点击“我会了”会自动把单词加入已背清单，并奖励 10 金币。点“再看一次”不会扣分，也不会重复奖励。</p>
                <div class="feedback-box" style="margin-bottom:16px;">
                  当前层级：${currentTierLabel} · 当前主题：${uiState.studyCategory === "all" ? "全部主题" : currentWord.categoryName}
                </div>
                <div class="action-grid">
                  <button class="action-btn success-btn" data-study-action="master">我会了</button>
                  <button class="action-btn ghost-btn" data-study-action="review">再看一次</button>
                  <button class="action-btn secondary-btn" data-study-action="topic-quiz">主题考核</button>
                </div>
                <div class="feedback-box">
                  ${state.learnedWords.includes(currentWord.id) ? "这个单词已经记住啦，可以切到单词考核继续拿金币。" : `${currentWord.chinese ? "看图、读英文、看中文，再点一下发音按钮。" : "这个词来自官方完整词表，当前先提供英文、词性和发音。"} 当前词库对齐 ${OFFICIAL_SOURCE_LABEL}。`}
                </div>
              </article>
            </div>
          `
          : renderWordQuizCard()
      }
    </div>
  `;
}

function renderWordQuizCard() {
  if (!state.learnedWords.length) {
    return `
      <div class="study-card" style="margin-top:18px;">
        <p class="eyebrow">单词考核</p>
        <h3>先背几个单词再来挑战</h3>
        <p class="section-copy">考核只会从“已背单词”里抽题。先去点几次“我会了”，金币和题目都会准备好。</p>
      </div>
    `;
  }

  const quiz = currentWordQuiz;
  const currentWord = WORD_MAP.get(quiz.wordId);
  const isPictureMode = quiz.type === "picture";

  return `
    <div class="study-layout">
      <article class="study-card">
        <div class="illustration-card">
          <div class="word-card-main">
            <div class="illustration-emoji">${currentWord.visual}</div>
            <p class="eyebrow">${isPictureMode ? "看图选单词" : "英文选中文"}</p>
            <h3>${isPictureMode ? "这张图是哪一个单词？" : currentWord.word}</h3>
            <p class="body-copy">${isPictureMode ? "选出正确英文单词" : "选出正确中文意思"}${uiState.studyCategory === "all" ? "" : ` · 当前主题 ${currentWord.categoryName}`}${uiState.studyTier === "all" ? "" : ` · 当前层级 ${currentWord.tierName}`}</p>
            <div class="word-meta">
              <span class="meta-chip">优先抽未考核单词</span>
              <span class="meta-chip">答对奖励 5 金币</span>
            </div>
          </div>
        </div>
      </article>

      <article class="study-card">
        <p class="eyebrow">考核第 ${quiz.round}</p>
        <h3>${isPictureMode ? "从 3 个英文里选 1 个" : "从 3 个中文里选 1 个"}</h3>
        <div class="option-stack">
          ${quiz.options
            .map((option) => {
              const selected = quiz.selected === option ? "is-selected" : "";
              const correctClass = quiz.revealed && quiz.revealAnswer && option === quiz.answer ? "is-correct" : "";
              const wrongClass = quiz.revealed && quiz.selected === option && option !== quiz.answer ? "is-wrong" : "";
              return `<button class="option-btn ${selected} ${correctClass} ${wrongClass}" data-word-option="${escapeAttr(option)}">${option}</button>`;
            })
            .join("")}
        </div>
        <div class="question-actions">
          <button class="action-btn success-btn" data-study-action="submit-word-quiz">提交答案</button>
          <button class="action-btn ghost-btn" data-study-action="skip-word-quiz">换一题</button>
        </div>
        <div class="feedback-box">${quiz.feedback}</div>
      </article>
    </div>
  `;
}

function renderQuestionView() {
  const questionProgress = getPercent(state.doneQuestions.length, QUESTION_BANK.length);
  const wrongCount = state.wrongQuestions.length;
  const part1Count = QUESTION_BANK.filter((item) => item.part === "part1").length;
  const part4Count = QUESTION_BANK.filter((item) => item.part === "part4").length;
  const part4Tags = [...new Set(QUESTION_BANK.filter((item) => item.part === "part4").map((item) => item.grammarTag))];
  const grammarStats = getGrammarTagStats();

  dom.questionView.innerHTML = `
    <div class="section-shell">
      <div class="section-head">
        <div>
          <p class="eyebrow">专项答题</p>
          <h2>按 A2 Key 常见 Part 练习</h2>
        </div>
        <button class="action-btn ghost-btn" data-nav="home">返回首页</button>
      </div>

      <div class="toolbar-row">
        <div class="pill">已做 ${state.doneQuestions.length}/${QUESTION_BANK.length}</div>
        <div class="pill">错题 ${wrongCount}</div>
        <div class="pill">当前金币 ${state.gold}</div>
      </div>

      <div class="progress-row"><span class="tiny-note">题库覆盖</span><span class="tiny-note">${questionProgress}%</span></div>
      <div class="progress-track"><div class="progress-fill green-fill" style="width:${questionProgress}%"></div></div>

      ${
        currentQuestionSession
          ? renderQuestionCard()
          : `
            <div class="question-layout">
              <article class="question-card">
                <p class="eyebrow">开始方式</p>
                <h3>选一个官方题型方向开练</h3>
                <p class="section-copy">Part 1 练图片词汇识别，Part 4 练句子补全选择。系统会优先抽取当前 Part 里还没做过的题，错题重练只从错题本里抽。</p>
                <div class="action-grid">
                  <button class="action-btn success-btn" data-question-mode="part1-random">Part 1 看图选词 · ${part1Count}题</button>
                  <button class="action-btn secondary-btn" data-question-mode="part4-random">Part 4 句子补全 · ${part4Count}题</button>
                  <button class="action-btn ghost-btn" data-question-mode="wrong">错题重练</button>
                </div>
                <details class="fold-panel" open>
                  <summary>Part 4 语法专题</summary>
                  <div class="option-stack fold-body">
                    ${part4Tags
                      .map((tag) => `<button class="option-btn" data-question-mode="part4-tag:${escapeAttr(tag)}">专题练习 · ${tag}</button>`)
                      .join("")}
                  </div>
                </details>
              </article>
              <article class="question-card">
                <p class="eyebrow">练习提示</p>
                <h3>答题逻辑</h3>
                <ul class="tip-list">
                  <li>题目词汇限定在官方 A2 Key 词表范围内。</li>
                  <li>Part 1 对应图片词汇识别，Part 4 对应句子补全选择。</li>
                  <li>Part 4 会优先按从易到难的顺序出新题。</li>
                  <li>Part 4 也可以按语法点进入专题练习。</li>
                  <li>Part 1 的错误选项会优先来自同主题词。</li>
                  <li>第一次答错会提示“再试一次吧”。</li>
                  <li>第二次再错会显示正确答案，并加入错题本。</li>
                  <li>每做满 10 道题会自动弹出鼓励提示。</li>
                </ul>
                <details class="fold-panel" open>
                  <summary>语法掌握进度</summary>
                  <div class="option-stack fold-body">
                    ${grammarStats
                      .map((item) => `<button class="option-btn" disabled>${item.tag} · ${item.done}/${item.total}题 · 正确率 ${item.accuracy}%</button>`)
                      .join("")}
                  </div>
                </details>
              </article>
            </div>
          `
      }
    </div>
  `;
}

function renderQuestionCard() {
  const question = QUESTION_MAP.get(currentQuestionSession.questionId);
  const isPicture = question.type === "picture";
  const partLabel = question.part === "part1" ? "Part 1 看图选词" : "Part 4 基础单选";
  const counter = currentQuestionSession.mode === "wrong"
    ? `错题模式 · 待重练 ${state.wrongQuestions.length} 题`
    : `当前第 ${state.doneQuestions.length}/${QUESTION_BANK.length} 题`;

  return `
    <div class="question-layout" style="margin-top:18px;">
      <article class="question-card">
        <div class="question-tag">${partLabel}</div>
        <p class="eyebrow">${counter}</p>
        ${question.part === "part4" ? `<p class="eyebrow">语法点：${question.grammarTag}</p>` : `<p class="eyebrow">主题词包：${question.topicLabel}</p>`}
        <h3 class="question-body">${question.question}</h3>
        ${
          isPicture
            ? `
              <div class="illustration-card" style="min-height:180px;">
                <div class="word-card-main">
                  <div class="illustration-emoji">${question.image}</div>
                  <p class="body-copy">${question.pictureHint}</p>
                </div>
              </div>
            `
            : ""
        }
      </article>

      <article class="question-card">
        <p class="eyebrow">${currentQuestionSession.mode === "wrong" ? "错题重练" : partLabel}</p>
        <h3>选择正确答案</h3>
        <div class="option-stack">
          ${question.options
            .map((option) => {
              const selected = currentQuestionSession.selected === option ? "is-selected" : "";
              const correctClass = currentQuestionSession.revealed && currentQuestionSession.revealAnswer && option === question.answer ? "is-correct" : "";
              const wrongClass = currentQuestionSession.revealed && currentQuestionSession.selected === option && option !== question.answer ? "is-wrong" : "";
              return `<button class="option-btn ${selected} ${correctClass} ${wrongClass}" data-question-option="${escapeAttr(option)}">${option}</button>`;
            })
            .join("")}
        </div>
        <div class="question-actions">
          <button class="action-btn success-btn" data-question-action="submit">提交答案</button>
          <button class="action-btn ghost-btn" data-question-action="exit">返回首页</button>
        </div>
        <div class="feedback-box">${currentQuestionSession.feedback}</div>
        ${
          currentQuestionSession.revealed
            ? `
              <div class="explain-box">
                <strong>${currentQuestionSession.revealAnswer ? "知识点解析" : "答题提示"}</strong>
                <p>${currentQuestionSession.revealAnswer ? (question.explanation || "先看句子里的主语和语法线索，再判断最合适的答案。") : (question.hint || "先观察句子里的主语、时间词和固定搭配，再试一次。")}</p>
              </div>
            `
            : ""
        }
      </article>
    </div>
  `;
}

function renderGameView() {
  dom.gameHud.innerHTML = `
    <article class="hud-card">
      <span class="stat-label">门票金币</span>
      <strong>${GAME_ENTRY_COST} 金币/局</strong>
    </article>
    <article class="hud-card">
      <span class="stat-label">基地耐久</span>
      <strong>${game.baseHp}/${game.maxBaseHp}</strong>
    </article>
    <article class="hud-card">
      <span class="stat-label">已放炮塔</span>
      <strong>${game.towers.length}/${game.maxTowers}</strong>
    </article>
    <article class="hud-card">
      <span class="stat-label">波次进度</span>
      <strong>${game.defeatedEnemies}/${game.totalEnemies}</strong>
    </article>
  `;

  dom.gameSidePanel.innerHTML = `
    <div class="mini-panel">
      <p class="eyebrow">玩法说明</p>
      <h3>点草地，放炮塔</h3>
      <p class="section-copy">开局点击“开始游戏”会先扣 15 金币。游戏开始后点击绿色区域摆放炮塔，炮塔会自动攻击路径上的怪物。</p>
    </div>
    <div class="mini-panel">
      <p class="eyebrow">局内状态</p>
      <h3>${game.active ? "正在闯关" : "等待开局"}</h3>
      <div class="action-grid" style="grid-template-columns:1fr; margin-top:10px;">
        <button class="action-btn success-btn" data-game-action="start" ${game.active ? "disabled" : ""}>开始游戏</button>
        <button class="action-btn secondary-btn" data-game-action="restart" ${game.active || game.lastResult === "idle" ? "disabled" : ""}>再玩一局</button>
        <button class="action-btn ghost-btn" data-nav="home">返回首页</button>
      </div>
      <p class="tiny-note" style="margin-top:12px;">${state.gold < GAME_ENTRY_COST && !game.active ? "金币不够啦，先去背单词或答题赚金币吧。" : "击败怪物会额外掉落 1 到 5 金币。"}</p>
    </div>
    <div class="mini-panel">
      <p class="eyebrow">战斗日志</p>
      <div class="log-box">${game.log.slice(-8).map((line) => `<p>${line}</p>`).join("") || "<p>还没有战斗记录。</p>"}</div>
    </div>
  `;

  drawGame();
}

function renderCollectionView() {
  const unlocked = new Set(state.unlockedEquipment);
  const collection = EQUIPMENT_BANK.filter((item) => {
    if (uiState.collectionTab === "all") {
      return true;
    }
    return item.category === uiState.collectionTab;
  });
  const categoryCounts = EQUIPMENT_CATEGORY_ORDER.map((category) => {
    const total = EQUIPMENT_BANK.filter((item) => item.category === category).length;
    const count = EQUIPMENT_BANK.filter((item) => item.category === category && unlocked.has(item.id)).length;
    return { category, total, count, meta: EQUIPMENT_CATEGORY_META[category] };
  });

  dom.collectionView.innerHTML = `
    <div class="collection-shell">
      <div class="section-head">
        <div>
          <p class="eyebrow">我的装备图鉴</p>
          <h2>收集越多，基地越闪亮</h2>
        </div>
        <button class="action-btn ghost-btn" data-nav="home">返回首页</button>
      </div>

      <div class="toolbar-row">
        <div class="pill">总收集 ${state.unlockedEquipment.length}/${TOTAL_EQUIPMENT}</div>
        ${categoryCounts.map(({ count, total, meta }) => `<div class="pill">${meta.short} ${count}/${total}</div>`).join("")}
      </div>

      <div class="collection-tabs">
        <button class="tab-btn ${uiState.collectionTab === "all" ? "is-active" : ""}" data-collection-tab="all">全部装备</button>
        ${EQUIPMENT_CATEGORY_ORDER.map((category) => `<button class="tab-btn ${uiState.collectionTab === category ? "is-active" : ""}" data-collection-tab="${category}">${EQUIPMENT_CATEGORY_META[category].short}</button>`).join("")}
      </div>

      <div class="collection-grid">
        ${collection
          .map((item) => {
            const unlockedClass = unlocked.has(item.id) ? "" : "locked";
            const rarityClass = getRarityClass(item.rarity);
            const rarityText = item.rarity === "normal" ? "普通" : item.rarity === "rare" ? "稀有" : "限定";
            const art = getEquipmentArt(item);
            const categoryMeta = EQUIPMENT_CATEGORY_META[item.category] || { title: "装备图鉴" };
            return `
              <article class="equipment-card ${rarityClass} ${unlockedClass}">
                ${
                  item.image
                    ? `
                      <div class="equipment-photo-wrap">
                        <img class="equipment-photo" src="${item.image}" alt="${item.name}">
                        <div class="equipment-photo-badge">${art.tag}</div>
                      </div>
                    `
                    : `
                      <div class="equipment-art" aria-hidden="true">
                        <div class="equipment-glow"></div>
                        <div class="equipment-emoji">${art.emoji}</div>
                        <div class="equipment-mini-tag">${art.tag}</div>
                      </div>
                    `
                }
                <div class="equipment-symbol">${item.symbol}</div>
                <p class="eyebrow">${categoryMeta.title}</p>
                <h3>${unlocked.has(item.id) ? item.name : "未解锁"}</h3>
                <p class="section-copy">${unlocked.has(item.id) ? "已收录到图鉴，可继续抽取下一件。" : "继续守住基地，就有机会翻牌解锁这件装备。"}</p>
                ${item.image ? `<p class="tiny-note equipment-credit">${unlocked.has(item.id) ? `图片来源：${item.credit}` : "图片已准备，解锁后可查看真实装备图。"}</p>` : ""}
                <span class="rarity-badge">${rarityText}</span>
              </article>
            `;
          })
          .join("")}
      </div>
    </div>
  `;
}

function updateScreenVisibility() {
  const screens = {
    home: dom.homeScreen,
    study: dom.studyScreen,
    question: dom.questionScreen,
    game: dom.gameScreen,
    collection: dom.collectionScreen
  };

  Object.entries(screens).forEach(([key, element]) => {
    element.classList.toggle("is-active", uiState.screen === key);
  });
}

function navigateTo(screen) {
  if (screen === uiState.screen) {
    return;
  }

  if (game.active && screen !== "game") {
    openModal({
      tag: "退出提醒",
      title: "确定要离开塔防游戏吗？",
      body: "<p>本局进度不会保留，但金币已经扣除。你可以留在这里继续守基地，也可以现在返回首页。</p>",
      actions: [
        { label: "继续游戏", className: "ghost-btn", handler: closeModal },
        {
          label: "确认离开",
          className: "warn-btn",
          handler: () => {
            stopGame("manual-exit");
            closeModal();
            uiState.screen = screen;
            render();
          }
        }
      ]
    });
    return;
  }

  if (currentQuestionSession && screen !== "question") {
    openModal({
      tag: "退出提醒",
      title: "确定要退出答题吗？",
      body: "<p>答题记录已经保存到本地。退出后下次还能从未做题和错题本继续练习。</p>",
      actions: [
        { label: "继续答题", className: "ghost-btn", handler: closeModal },
        {
          label: "返回首页",
          className: "secondary-btn",
          handler: () => {
            currentQuestionSession = null;
            closeModal();
            uiState.screen = screen;
            render();
          }
        }
      ]
    });
    return;
  }

  uiState.screen = screen;
  if (screen === "study" && !state.learnedWords.length) {
    uiState.studyTier = "core";
  }
  if (screen === "study" && uiState.studyMode === "quiz") {
    ensureWordQuiz();
  }
  render();
}

function handleStudyAction(action) {
  switch (action) {
    case "master":
      learnCurrentWord();
      break;
    case "review":
      showToast("再看一次也没关系，读一读再点发音按钮。");
      renderStudyView();
      break;
    case "speak":
      speakCurrentWord();
      break;
    case "submit-word-quiz":
      submitWordQuiz();
      break;
    case "skip-word-quiz":
      currentWordQuiz = createWordQuiz();
      renderStudyView();
      break;
    case "topic-quiz":
      uiState.studyMode = "quiz";
      currentWordQuiz = createWordQuiz();
      renderStudyView();
      break;
    default:
      break;
  }
}

function learnCurrentWord() {
  const currentWord = WORD_MAP.get(currentStudyWordId);
  if (!currentWord) {
    return;
  }

  if (state.learnedWords.includes(currentWord.id)) {
    showToast("这个单词已经会啦，去挑战单词考核吧。");
    currentStudyWordId = pickNextStudyWordId();
    render();
    return;
  }

  state.learnedWords.push(currentWord.id);
  addGold(WORD_MASTER_REWARD, `背会 ${currentWord.word}`);
  state.lastStudyWordId = currentWord.id;
  state.lastRewardName = `${currentWord.word} 学会啦`;
  saveState();

  if (state.learnedWords.length === WORD_BANK.length) {
    openModal({
      tag: "全部背完",
      title: "太棒啦，词库已经全部点亮",
      body: `<p>你已经把 ${WORD_BANK.length} 个基础词都背过一遍了。接下来可以重点刷“单词考核”和“专项答题”。</p>`,
      actions: [{ label: "继续考核", className: "success-btn", handler: () => { uiState.studyMode = "quiz"; ensureWordQuiz(); closeModal(); render(); } }]
    });
  } else {
    showToast(`太棒啦！${currentWord.word} 已加入已背单词，获得 ${WORD_MASTER_REWARD} 金币。`);
  }

  currentStudyWordId = pickNextStudyWordId();
  render();
}

function speakCurrentWord() {
  const word = uiState.studyMode === "quiz" && currentWordQuiz
    ? WORD_MAP.get(currentWordQuiz.wordId)
    : WORD_MAP.get(currentStudyWordId);

  if (!word) {
    return;
  }

  if (!("speechSynthesis" in window)) {
    showToast("当前浏览器不支持发音功能，可以先跟着单词拼读。");
    return;
  }

  const utterance = new SpeechSynthesisUtterance(word.word);
  utterance.lang = "en-US";
  utterance.rate = 0.9;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
  showToast(`正在播放 ${word.word} 的发音。`);
}

function ensureWordQuiz() {
  if (!state.learnedWords.length) {
    currentWordQuiz = null;
    return;
  }
  if (!currentWordQuiz) {
    currentWordQuiz = createWordQuiz();
  }
}

function createWordQuiz() {
  const studyPool = getStudyWordPool();
  const studyIds = new Set(studyPool.map((item) => item.id));
  const learned = state.learnedWords
    .map((id) => WORD_MAP.get(id))
    .filter((item) => item && (uiState.studyCategory === "all" || studyIds.has(item.id)));
  const quizEligible = learned.filter((item) => item.word && item.chinese);
  if (!quizEligible.length) {
    return {
      wordId: learned[0]?.id || WORD_BANK[0].id,
      type: "translation",
      answer: "",
      options: [],
      selected: "",
      attempts: 0,
      feedback: "当前已背词里还没有可用于中英考核的词，请先学习带中文释义的核心词。",
      revealed: false,
      revealAnswer: false,
      round: state.wordQuizRounds + 1
    };
  }
  const learnedIds = new Set(state.learnedWords);
  const unassessed = quizEligible.map((item) => item.id).filter((id) => !state.assessedWords.includes(id));
  const poolIds = unassessed.length ? unassessed : quizEligible.length ? quizEligible.map((item) => item.id) : [...learnedIds];
  const wordId = sample(poolIds);
  const word = WORD_MAP.get(wordId);
  const type = Math.random() > 0.5 ? "picture" : "translation";
  const answer = type === "picture" ? word.word : word.chinese;
  const distractorPool = shuffle(
    (quizEligible.length ? quizEligible : WORD_BANK.filter((item) => item.word && item.chinese)).filter((item) => item.id !== wordId)
      .map((item) => (type === "picture" ? item.word : item.chinese))
      .filter((value) => value !== answer)
  );
  const options = [answer];
  for (const value of distractorPool) {
    if (!options.includes(value)) {
      options.push(value);
    }
    if (options.length === 3) {
      break;
    }
  }
  return {
    wordId,
    type,
    answer,
    options: shuffle(options),
    selected: "",
    attempts: 0,
    feedback: "答对可获得 5 金币，系统会优先抽还没考核过的词。",
    revealed: false,
    revealAnswer: false,
    round: state.wordQuizRounds + 1
  };
}

function selectWordOption(option) {
  if (!currentWordQuiz) {
    return;
  }
  currentWordQuiz.selected = option;
  renderStudyView();
}

function submitWordQuiz() {
  if (!currentWordQuiz || !currentWordQuiz.selected) {
    showToast("先选一个答案再提交。");
    return;
  }

  currentWordQuiz.attempts += 1;
  const wordId = currentWordQuiz.wordId;
  const stats = state.wordQuizStats[wordId] || { attempts: 0, correct: 0 };
  stats.attempts += 1;

  if (currentWordQuiz.selected === currentWordQuiz.answer) {
    stats.correct += 1;
    state.wordQuizStats[wordId] = stats;
    if (!state.assessedWords.includes(wordId)) {
      state.assessedWords.push(wordId);
    }
    state.wordQuizRounds += 1;
    addGold(WORD_QUIZ_REWARD, "单词考核通过");
    currentWordQuiz.revealed = true;
    currentWordQuiz.revealAnswer = true;
    currentWordQuiz.feedback = `考核通过！${WORD_QUIZ_REWARD} 金币已经到账，下一题继续。`;
    saveState();
    render();
    window.setTimeout(() => {
      currentWordQuiz = createWordQuiz();
      renderStudyView();
    }, 900);
  } else {
    state.wordQuizStats[wordId] = stats;
    currentWordQuiz.revealed = true;
    currentWordQuiz.revealAnswer = false;
    currentWordQuiz.feedback = "再试一次吧，不扣分，选对就能拿到金币。";
    saveState();
    renderStudyView();
  }
}

function startQuestionSession(mode) {
  repairState();
  if (mode === "wrong" && !state.wrongQuestions.length) {
    showToast("错题本还是空的，先去做 Part 1 或 Part 4 吧。");
    return;
  }
  currentQuestionSession = createQuestionSession(mode);
  uiState.screen = "question";
  render();
}

function createQuestionSession(mode) {
  let poolIds;
  if (mode === "wrong") {
    poolIds = [...state.wrongQuestions];
  } else {
    const isTaggedPart4 = mode.startsWith("part4-tag:");
    const part = mode === "part1-random" ? "part1" : "part4";
    const targetTag = isTaggedPart4 ? mode.replace("part4-tag:", "") : "";
    const basePool = QUESTION_BANK.filter((item) => item.part === part);
    const filteredPool = targetTag ? basePool.filter((item) => item.grammarTag === targetTag) : basePool;
    const orderedPool = part === "part4"
      ? filteredPool.slice().sort((left, right) => (left.level || 1) - (right.level || 1))
      : filteredPool;
    const partPool = orderedPool.map((item) => item.id);
    const unseenPartPool = orderedPool
      .filter((item) => !state.doneQuestions.includes(item.id))
      .map((item) => item.id);
    poolIds = unseenPartPool.length ? unseenPartPool : partPool;
  }
  const questionId = sample(poolIds);
  return {
    mode,
    questionId,
    selected: "",
    attempts: 0,
    feedback: mode === "wrong"
      ? "这道题曾经答错过，答对后会从错题本移除。"
      : "答对会获得金币，系统会优先覆盖当前 Part 里还没做过的题。",
    revealed: false,
    revealAnswer: false
  };
}

function selectQuestionOption(option) {
  if (!currentQuestionSession) {
    return;
  }
  currentQuestionSession.selected = option;
  renderQuestionView();
}

function handleQuestionAction(action) {
  switch (action) {
    case "submit":
      submitQuestion();
      break;
    case "exit":
      navigateTo("home");
      break;
    default:
      break;
  }
}

function handleRecommendAction(action) {
  if (action === "practice-core") {
    uiState.studyTier = "core";
    uiState.studyCategory = "all";
    uiState.studyMode = "learn";
    currentStudyWordId = pickNextStudyWordId();
    uiState.screen = "study";
    render();
    return;
  }

  if (action.startsWith("practice-grammar:")) {
    const tag = action.replace("practice-grammar:", "");
    uiState.screen = "question";
    currentQuestionSession = createQuestionSession(`part4-tag:${tag}`);
    render();
    return;
  }

  if (action.startsWith("practice-category:")) {
    const categoryId = action.replace("practice-category:", "");
    uiState.studyCategory = categoryId;
    uiState.studyTier = "all";
    uiState.studyMode = "learn";
    currentStudyWordId = pickNextStudyWordId();
    uiState.screen = "study";
    render();
    return;
  }

  if (action === "practice-review") {
    uiState.screen = "question";
    startQuestionSession(state.wrongQuestions.length ? "wrong" : "part4-random");
  }
}

function openResetModal(moduleName) {
  const labels = {
    words: "单词进度",
    questions: "答题进度",
    collection: "图鉴进度"
  };
  openModal({
    tag: "重置确认",
    title: `确定要重置${labels[moduleName]}吗？`,
    body: "<p>这个操作只会清空对应模块的本地记录，不会影响其他模块。</p>",
    actions: [
      { label: "取消", className: "ghost-btn", handler: closeModal },
      {
        label: "确认重置",
        className: "warn-btn",
        handler: () => {
          resetModuleProgress(moduleName);
          closeModal();
          showToast(`${labels[moduleName]}已经重置。`);
        }
      }
    ]
  });
}

function submitQuestion() {
  if (!currentQuestionSession || !currentQuestionSession.selected) {
    showToast("先选一个答案再提交。");
    return;
  }

  const question = QUESTION_MAP.get(currentQuestionSession.questionId);
  currentQuestionSession.attempts += 1;
  const stats = state.questionStats[question.id] || { attempts: 0, correct: 0 };
  stats.attempts += 1;
  state.questionStats[question.id] = stats;

  if (!state.doneQuestions.includes(question.id)) {
    state.doneQuestions.push(question.id);
    if (state.doneQuestions.length % 10 === 0) {
      showToast(`太棒啦！已经完成 ${state.doneQuestions.length} 题，继续加油。`);
    }
  }

  if (currentQuestionSession.selected === question.answer) {
    stats.correct += 1;
    addGold(question.gold, `答对题目 ${question.id}`);
    currentQuestionSession.revealed = true;
    currentQuestionSession.revealAnswer = true;
    currentQuestionSession.feedback = `答对啦！获得 ${question.gold} 金币。`;
    if (currentQuestionSession.mode === "wrong") {
      state.wrongQuestions = state.wrongQuestions.filter((id) => id !== question.id);
    }
    saveState();
    render();
    window.setTimeout(() => {
      if (currentQuestionSession.mode === "wrong" && !state.wrongQuestions.length) {
        currentQuestionSession = null;
        showToast("错题本已经清空啦。");
        render();
        return;
      }
      currentQuestionSession = createQuestionSession(currentQuestionSession.mode);
      renderQuestionView();
    }, 900);
    return;
  }

  if (!state.wrongQuestions.includes(question.id)) {
    state.wrongQuestions.push(question.id);
  }

  currentQuestionSession.revealed = true;
  if (currentQuestionSession.attempts === 1) {
    currentQuestionSession.revealAnswer = false;
    currentQuestionSession.feedback = `再试一次吧，不扣分。${question.hint ? `提示：${question.hint}` : "第二次还答错会告诉你正确答案。"}`;
  } else {
    currentQuestionSession.revealAnswer = true;
    currentQuestionSession.feedback = `正确答案是 ${question.answer}。这道题已经加入错题本。`;
    saveState();
    renderQuestionView();
    window.setTimeout(() => {
      if (currentQuestionSession.mode === "wrong" && !state.wrongQuestions.length) {
        currentQuestionSession = null;
      } else {
        currentQuestionSession = createQuestionSession(currentQuestionSession.mode);
      }
      render();
    }, 1200);
    return;
  }

  saveState();
  renderQuestionView();
}

function handleGameAction(action) {
  switch (action) {
    case "start":
      startGame();
      break;
    case "restart":
      restartGame();
      break;
    default:
      break;
  }
}

function startGame() {
  if (game.active) {
    return;
  }
  if (state.gold < GAME_ENTRY_COST) {
    showToast("金币不够啦，快去背单词、答题赚金币吧。");
    return;
  }

  addGold(-GAME_ENTRY_COST, "进入塔防闯关");
  resetGameState();
  game.active = true;
  game.lastResult = "playing";
  game.log.unshift("本局开始，扣除 15 金币。");
  saveState();
  renderGameView();
  gameLoop();
}

function restartGame() {
  if (game.active) {
    return;
  }
  startGame();
}

function resetGameState() {
  game.towers = [];
  game.enemies = [];
  game.bullets = [];
  game.baseHp = game.maxBaseHp;
  game.spawnedEnemies = 0;
  game.defeatedEnemies = 0;
  game.spawnTimer = 0;
  game.lastTimestamp = 0;
  game.pendingReward = false;
  game.rewardChoices = [];
  game.rewardResolved = false;
  game.log = ["点击绿色草地区域可以放置炮塔。"];
}

function placeTower(x, y) {
  if (!game.active) {
    return;
  }
  if (game.towers.length >= game.maxTowers) {
    showToast("本局炮塔已经放满啦。");
    return;
  }
  if (isPointOnPath(x, y)) {
    showToast("炮塔要放在草地上，不能挡住怪物的路。");
    return;
  }
  const tooClose = game.towers.some((tower) => distance(tower.x, tower.y, x, y) < 62);
  if (tooClose) {
    showToast("这里离别的炮塔太近了，换个位置试试。");
    return;
  }
  game.towers.push({
    x,
    y,
    range: 140,
    cooldown: 0,
    fireRate: 0.72
  });
  game.log.unshift(`放置第 ${game.towers.length} 个炮塔。`);
  renderGameView();
}

function gameLoop(timestamp = 0) {
  if (!game.active) {
    drawGame();
    return;
  }
  if (!game.lastTimestamp) {
    game.lastTimestamp = timestamp;
  }
  const delta = Math.min((timestamp - game.lastTimestamp) / 1000, 0.033);
  game.lastTimestamp = timestamp;

  updateGame(delta);
  drawGame();
  renderGameView();

  if (game.active) {
    game.frameId = window.requestAnimationFrame(gameLoop);
  }
}

function updateGame(delta) {
  game.spawnTimer += delta;
  if (game.spawnedEnemies < game.totalEnemies && game.spawnTimer >= game.spawnInterval) {
    game.spawnTimer = 0;
    spawnEnemy();
  }

  game.enemies.forEach((enemy) => moveEnemy(enemy, delta));
  const escaped = game.enemies.filter((enemy) => enemy.finished);
  game.enemies = game.enemies.filter((enemy) => enemy.hp > 0 && !enemy.finished);

  game.towers.forEach((tower) => {
    tower.cooldown -= delta;
    if (tower.cooldown > 0) {
      return;
    }
    const target = findEnemyInRange(tower);
    if (target) {
      tower.cooldown = tower.fireRate;
      game.bullets.push(createBullet(tower, target));
    }
  });

  game.bullets.forEach((bullet) => {
    const target = game.enemies.find((enemy) => enemy.id === bullet.targetId);
    if (!target) {
      bullet.dead = true;
      return;
    }
    const dx = target.x - bullet.x;
    const dy = target.y - bullet.y;
    const len = Math.max(Math.hypot(dx, dy), 1);
    bullet.x += (dx / len) * bullet.speed * delta;
    bullet.y += (dy / len) * bullet.speed * delta;
    if (distance(bullet.x, bullet.y, target.x, target.y) < 14) {
      target.hp -= bullet.damage;
      bullet.dead = true;
      if (target.hp <= 0) {
        const reward = randomInt(1, 5);
        addGold(reward, "击败怪物");
        game.defeatedEnemies += 1;
        game.log.unshift(`击败怪物，获得 ${reward} 金币。`);
      }
    }
  });
  game.bullets = game.bullets.filter((bullet) => !bullet.dead);

  if (escaped.length) {
    game.baseHp = Math.max(0, game.baseHp - escaped.length);
    escaped.forEach(() => game.log.unshift("有怪物冲到基地了。"));
  }

  if (game.baseHp <= 0) {
    finishGame(false);
    return;
  }

  if (game.defeatedEnemies >= game.totalEnemies && !game.enemies.length) {
    finishGame(true);
  }
}

function finishGame(isWin) {
  game.active = false;
  game.lastResult = isWin ? "win" : "lose";
  if (game.frameId) {
    window.cancelAnimationFrame(game.frameId);
  }
  if (!isWin) {
    game.log.unshift("基地被攻破了，本局失败。");
    openModal({
      tag: "闯关结果",
      title: "没关系，再试一次吧",
      body: "<p>这局已经自动结束，不会额外扣金币。回到塔防模块后可以直接再开一局。</p>",
      actions: [{ label: "知道了", className: "ghost-btn", handler: closeModal }]
    });
    render();
    return;
  }

  game.log.unshift("闯关成功，准备翻牌抽奖。");
  prepareRewardChoices();
  openRewardModal();
  render();
}

function stopGame(reason) {
  if (game.frameId) {
    window.cancelAnimationFrame(game.frameId);
  }
  game.active = false;
  game.lastResult = reason === "manual-exit" ? "idle" : game.lastResult;
  renderGameView();
}

function prepareRewardChoices() {
  game.pendingReward = true;
  game.rewardResolved = false;
  game.rewardChoices = [0, 1, 2].map(() => drawReward());
}

function openRewardModal() {
  openModal({
    tag: "翻牌抽奖",
    title: "闯关成功！选 1 张卡牌",
    body: `
      <div class="action-grid" style="grid-template-columns:repeat(3,minmax(0,1fr)); margin-top:8px;">
        <button class="card-choice" data-reward-card="0"><div class="illustration-emoji">?</div><strong>卡牌 A</strong></button>
        <button class="card-choice" data-reward-card="1"><div class="illustration-emoji">?</div><strong>卡牌 B</strong></button>
        <button class="card-choice" data-reward-card="2"><div class="illustration-emoji">?</div><strong>卡牌 C</strong></button>
      </div>
    `,
    actions: [{ label: "稍后再抽", className: "ghost-btn", handler: closeModal }]
  });
}

function claimRewardCard(index) {
  if (!game.pendingReward || game.rewardResolved) {
    return;
  }
  const reward = game.rewardChoices[index];
  game.rewardResolved = true;
  game.pendingReward = false;

  if (reward.type === "equipment") {
    if (!state.unlockedEquipment.includes(reward.item.id)) {
      state.unlockedEquipment.push(reward.item.id);
      state.lastRewardName = reward.item.name;
    }
    saveState();
    closeModal();
    render();
    showToast(`获得 ${reward.item.name}！已自动收录到装备图鉴。`);
    checkCollectionMilestones(reward.item.category);
    return;
  }

  addGold(reward.gold, "图鉴已满奖励");
  state.lastRewardName = `${reward.gold} 金币补给`;
  saveState();
  closeModal();
  render();
  showToast(`图鉴已经收满，本次改为奖励 ${reward.gold} 金币补给。`);
}

function drawReward() {
  const locked = EQUIPMENT_BANK.filter((item) => !state.unlockedEquipment.includes(item.id));
  if (!locked.length) {
    return { type: "gold", gold: 20 };
  }

  const roll = Math.random();
  let rarity = "normal";
  if (roll > 0.95) {
    rarity = "legend";
  } else if (roll > 0.7) {
    rarity = "rare";
  }

  let pool = locked.filter((item) => item.rarity === rarity);
  if (!pool.length) {
    pool = locked;
  }
  return { type: "equipment", item: sample(pool) };
}

function checkCollectionMilestones(category) {
  const categoryItems = EQUIPMENT_BANK.filter((item) => item.category === category);
  const unlocked = categoryItems.filter((item) => state.unlockedEquipment.includes(item.id)).length;
  if (unlocked === categoryItems.length) {
    const title = EQUIPMENT_CATEGORY_META[category]?.completeTitle || "恭喜集齐装备图鉴！";
    openModal({
      tag: "图鉴完成",
      title,
      body: "<p>这一整套已经点亮。继续闯关，就能冲击另一套图鉴。</p>",
      actions: [{ label: "继续收集", className: "success-btn", handler: closeModal }]
    });
  }
}

function createGameController(canvas) {
  return {
    canvas,
    ctx: canvas.getContext("2d"),
    active: false,
    lastResult: "idle",
    maxBaseHp: 5,
    baseHp: 5,
    maxTowers: 6,
    towers: [],
    enemies: [],
    bullets: [],
    totalEnemies: 12,
    spawnedEnemies: 0,
    defeatedEnemies: 0,
    spawnInterval: 1.25,
    spawnTimer: 0,
    lastTimestamp: 0,
    frameId: 0,
    pendingReward: false,
    rewardResolved: false,
    rewardChoices: [],
    log: ["点击开始游戏，准备守住基地。"],
    path: [
      { x: 30, y: 250 },
      { x: 190, y: 250 },
      { x: 260, y: 155 },
      { x: 430, y: 155 },
      { x: 530, y: 300 },
      { x: 715, y: 300 },
      { x: 860, y: 220 }
    ]
  };
}

function spawnEnemy() {
  game.spawnedEnemies += 1;
  const start = game.path[0];
  const maxHp = 30 + game.spawnedEnemies * 3;
  game.enemies.push({
    id: `enemy-${Date.now()}-${game.spawnedEnemies}`,
    x: start.x,
    y: start.y,
    hp: maxHp,
    maxHp,
    speed: 46 + game.spawnedEnemies,
    segment: 0,
    progress: 0,
    finished: false
  });
}

function moveEnemy(enemy, delta) {
  const from = game.path[enemy.segment];
  const to = game.path[enemy.segment + 1];
  if (!to) {
    enemy.finished = true;
    return;
  }
  const segLen = distance(from.x, from.y, to.x, to.y);
  enemy.progress += (enemy.speed * delta) / segLen;
  if (enemy.progress >= 1) {
    enemy.segment += 1;
    enemy.progress = 0;
    if (enemy.segment >= game.path.length - 1) {
      enemy.finished = true;
      return;
    }
  }
  const currentFrom = game.path[enemy.segment];
  const currentTo = game.path[enemy.segment + 1];
  enemy.x = lerp(currentFrom.x, currentTo.x, enemy.progress);
  enemy.y = lerp(currentFrom.y, currentTo.y, enemy.progress);
}

function createBullet(tower, target) {
  return {
    x: tower.x,
    y: tower.y,
    targetId: target.id,
    speed: 260,
    damage: 12,
    dead: false
  };
}

function findEnemyInRange(tower) {
  return game.enemies.find((enemy) => distance(tower.x, tower.y, enemy.x, enemy.y) <= tower.range);
}

function isPointOnPath(x, y) {
  return getDistanceToPath(x, y) < 46 || x > 790;
}

function getDistanceToPath(x, y) {
  let shortest = Infinity;
  for (let index = 0; index < game.path.length - 1; index += 1) {
    shortest = Math.min(shortest, pointToSegmentDistance(x, y, game.path[index], game.path[index + 1]));
  }
  return shortest;
}

function drawGame() {
  const ctx = game.ctx;
  ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);

  ctx.fillStyle = "#bcefff";
  ctx.fillRect(0, 0, game.canvas.width, 200);
  ctx.fillStyle = "#6fc65b";
  ctx.fillRect(0, 200, game.canvas.width, game.canvas.height - 200);

  drawCloud(ctx, 120, 70, 1);
  drawCloud(ctx, 380, 55, 0.8);
  drawCloud(ctx, 690, 78, 1.1);

  ctx.strokeStyle = "#d6b27a";
  ctx.lineWidth = 44;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(game.path[0].x, game.path[0].y);
  for (let index = 1; index < game.path.length; index += 1) {
    ctx.lineTo(game.path[index].x, game.path[index].y);
  }
  ctx.stroke();

  ctx.strokeStyle = "rgba(255,255,255,0.28)";
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(game.path[0].x, game.path[0].y);
  for (let index = 1; index < game.path.length; index += 1) {
    ctx.lineTo(game.path[index].x, game.path[index].y);
  }
  ctx.stroke();

  ctx.fillStyle = "#4f89ff";
  ctx.fillRect(820, 168, 42, 100);
  ctx.fillStyle = "#2b3d63";
  ctx.fillRect(800, 190, 50, 60);
  ctx.fillStyle = "#fff4ae";
  for (let hp = 0; hp < game.baseHp; hp += 1) {
    ctx.fillRect(798 + hp * 12, 150, 8, 16);
  }

  game.towers.forEach((tower) => {
    ctx.fillStyle = "#5b78ff";
    ctx.beginPath();
    ctx.arc(tower.x, tower.y, 24, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#fff4ae";
    ctx.fillRect(tower.x - 6, tower.y - 30, 12, 20);
  });

  game.enemies.forEach((enemy) => {
    ctx.fillStyle = "#ff7b7b";
    ctx.beginPath();
    ctx.arc(enemy.x, enemy.y, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(enemy.x - 14, enemy.y - 30, 28, 6);
    ctx.fillStyle = "#6a2d2d";
    ctx.fillRect(enemy.x - 14, enemy.y - 30, Math.max(4, (enemy.hp / enemy.maxHp) * 28), 6);
  });

  game.bullets.forEach((bullet) => {
    ctx.fillStyle = "#ffd85a";
    ctx.beginPath();
    ctx.arc(bullet.x, bullet.y, 6, 0, Math.PI * 2);
    ctx.fill();
  });

  if (!game.active) {
    ctx.fillStyle = "rgba(19, 37, 54, 0.38)";
    ctx.fillRect(0, 0, game.canvas.width, game.canvas.height);
    ctx.fillStyle = "white";
    ctx.font = '700 32px "Trebuchet MS", "PingFang SC", sans-serif';
    ctx.textAlign = "center";
    ctx.fillText(game.lastResult === "win" ? "闯关成功，等待下一局" : "点击开始游戏，准备守基地", 450, 230);
    ctx.font = '600 18px "Trebuchet MS", "PingFang SC", sans-serif';
    ctx.fillText("绿色区域可放炮塔，路径上不能放。", 450, 265);
  }
}

function openGuide() {
  openModal({
    tag: "新手引导",
    title: "三步开始 KET 守护小队",
    body: `
      <p>1. 先去背单词或做题，赚金币。</p>
      <p>2. 攒够 15 金币后，去塔防游戏守住基地。</p>
      <p>3. 闯关成功就能翻牌抽装备，所有学习记录都会自动保存在本机。</p>
    `,
    actions: [
      {
        label: "开始学习",
        className: "success-btn",
        handler: () => {
          state.guideSeen = true;
          saveState();
          closeModal();
          navigateTo("study");
        }
      }
    ]
  });
}

function openModal({ tag, title, body, actions }) {
  dom.modalTag.textContent = tag;
  dom.modalTitle.textContent = title;
  dom.modalBody.innerHTML = body;
  modalActionHandlers = actions.map((action) => action.handler);
  dom.modalActions.innerHTML = actions
    .map((action, index) => `<button class="action-btn ${action.className || "ghost-btn"}" data-modal-index="${index}">${action.label}</button>`)
    .join("");
  dom.modalBackdrop.classList.remove("hidden");
  dom.modalBackdrop.setAttribute("aria-hidden", "false");
}

function closeModal() {
  dom.modalBackdrop.classList.add("hidden");
  dom.modalBackdrop.setAttribute("aria-hidden", "true");
  dom.modalBody.innerHTML = "";
  dom.modalActions.innerHTML = "";
  modalActionHandlers = [];
}

function showToast(message) {
  dom.toast.textContent = message;
  dom.toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    dom.toast.classList.remove("is-visible");
  }, 2200);
}

function repairState() {
  state.learnedWords = dedupe(state.learnedWords).filter((id) => WORD_IDS.has(id));
  state.assessedWords = dedupe(state.assessedWords).filter((id) => state.learnedWords.includes(id));
  state.doneQuestions = dedupe(state.doneQuestions).filter((id) => QUESTION_IDS.has(id));
  state.wrongQuestions = dedupe(state.wrongQuestions).filter((id) => QUESTION_IDS.has(id));
  state.unlockedEquipment = dedupe(state.unlockedEquipment).filter((id) => EQUIPMENT_IDS.has(id));
  saveState();
}

function getTodayStamp() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getDateDiffDays(startStamp, endStamp) {
  const start = new Date(`${startStamp}T00:00:00`);
  const end = new Date(`${endStamp}T00:00:00`);
  return Math.round((end - start) / 86400000);
}

function registerDailyActivity() {
  const today = getTodayStamp();
  if (!state.lastActiveDate) {
    state.lastActiveDate = today;
    state.streakDays = 1;
    saveState();
    return;
  }
  if (state.lastActiveDate === today) {
    return;
  }
  const diff = getDateDiffDays(state.lastActiveDate, today);
  state.streakDays = diff === 1 ? (state.streakDays || 1) + 1 : 1;
  state.lastActiveDate = today;
  saveState();
}

function resetModuleProgress(moduleName) {
  if (moduleName === "words") {
    state.learnedWords = [];
    state.assessedWords = [];
    state.wordQuizStats = {};
    state.wordQuizRounds = 0;
    currentStudyWordId = pickNextStudyWordId();
    currentWordQuiz = null;
  }
  if (moduleName === "questions") {
    state.doneQuestions = [];
    state.wrongQuestions = [];
    state.questionStats = {};
    currentQuestionSession = null;
  }
  if (moduleName === "collection") {
    state.unlockedEquipment = [];
    state.lastRewardName = "";
  }
  saveState();
  render();
}

function addGold(amount, reason) {
  state.gold = Math.max(0, state.gold + amount);
  if (reason) {
    state.lastGoldReason = reason;
  }
  saveState();
}

function pickNextStudyWordId() {
  const filteredPool = getStudyWordPool();
  const next = filteredPool.find((item) => !state.learnedWords.includes(item.id));
  if (next) {
    return next.id;
  }
  if (filteredPool.length) {
    return sample(filteredPool).id;
  }

  const tierFallback = uiState.studyTier !== "all"
    ? WORD_BANK.filter((item) => item.tier === uiState.studyTier)
    : [];
  if (tierFallback.length) {
    return sample(tierFallback).id;
  }

  const categoryFallback = uiState.studyCategory !== "all"
    ? WORD_BANK.filter((item) => item.categoryId === uiState.studyCategory)
    : [];
  if (categoryFallback.length) {
    return sample(categoryFallback).id;
  }

  return sample(WORD_BANK).id;
}

function getStudyWordPool() {
  return WORD_BANK.filter((item) => {
    const categoryMatch = uiState.studyCategory === "all" || item.categoryId === uiState.studyCategory;
    const tierMatch = uiState.studyTier === "all" || item.tier === uiState.studyTier;
    return categoryMatch && tierMatch;
  });
}

function getWordCategoryStats() {
  return WORD_CATEGORY_META.map((category) => {
    const words = WORD_BANK.filter((item) => item.categoryId === category.id);
    const learned = words.filter((item) => state.learnedWords.includes(item.id)).length;
    const assessed = words.filter((item) => state.assessedWords.includes(item.id)).length;
    return {
      id: category.id,
      name: category.name,
      emoji: category.emoji,
      total: words.length,
      learned,
      assessed,
      learnedPercent: getPercent(learned, words.length),
      assessedPercent: getPercent(assessed, Math.max(learned, 1))
    };
  }).filter((item) => item.total > 0);
}

function buildWordCategoryMeta() {
  const seen = new Map();
  WORD_BANK.forEach((item) => {
    if (!seen.has(item.categoryId)) {
      seen.set(item.categoryId, {
        id: item.categoryId,
        name: item.categoryName,
        emoji: item.emoji
      });
    }
  });
  return [...seen.values()];
}

function getWordTierStats() {
  return WORD_TIER_META.map((tier) => {
    const words = WORD_BANK.filter((item) => item.tier === tier.id);
    const learned = words.filter((item) => state.learnedWords.includes(item.id)).length;
    const assessed = words.filter((item) => state.assessedWords.includes(item.id)).length;
    return {
      ...tier,
      total: words.length,
      learned,
      assessed,
      learnedPercent: getPercent(learned, words.length),
      assessedPercent: getPercent(assessed, Math.max(learned, 1))
    };
  });
}

function buildWordTierMeta() {
  return [
    { id: "core", name: "核心必学", emoji: "🌱" },
    { id: "expand", name: "进阶拓展", emoji: "🚀" },
    { id: "phrase", name: "短语功能词", emoji: "🧩" }
  ];
}

function getCurrentTierLabel() {
  if (uiState.studyTier === "all") {
    return "全部层级";
  }
  return WORD_TIER_META.find((item) => item.id === uiState.studyTier)?.name || "全部层级";
}

function getTierEmoji(tierId) {
  return WORD_TIER_META.find((item) => item.id === tierId)?.emoji || "📘";
}

function getWordTier(word, source, pos) {
  const lowered = word.toLowerCase();
  const posText = (pos || "").toLowerCase();
  const phraseLike = /[()\/-]/.test(word) || word.includes(" ") || lowered.includes("@");
  const functionWord = /(pron|det|prep|conj|mv|av|exclam)/.test(posText);

  if (source === "core" && !phraseLike && !functionWord) {
    return { id: "core", name: "核心必学" };
  }
  if (phraseLike || functionWord) {
    return { id: "phrase", name: "短语功能词" };
  }
  return { id: "expand", name: "进阶拓展" };
}

function getGrammarTagStats() {
  const tags = [...new Set(QUESTION_BANK.filter((item) => item.part === "part4").map((item) => item.grammarTag))];
  return tags.map((tag) => {
    const questions = QUESTION_BANK.filter((item) => item.part === "part4" && item.grammarTag === tag);
    const done = questions.filter((item) => state.doneQuestions.includes(item.id)).length;
    const stats = questions.reduce((acc, item) => {
      const entry = state.questionStats[item.id] || { attempts: 0, correct: 0 };
      acc.attempts += entry.attempts;
      acc.correct += entry.correct;
      return acc;
    }, { attempts: 0, correct: 0 });
    return {
      tag,
      total: questions.length,
      done,
      donePercent: getPercent(done, questions.length),
      accuracy: stats.attempts ? Math.round((stats.correct / stats.attempts) * 100) : 0
    };
  });
}

function getRecommendedNextStep() {
  const coreStats = getWordTierStats().find((item) => item.id === "core");
  if (coreStats && coreStats.learned < coreStats.total) {
    return {
      type: "core-words",
      label: "推荐先学核心必学词",
      detail: `核心必学已背 ${coreStats.learned}/${coreStats.total}`,
      actionLabel: "去学核心词",
      action: "practice-core"
    };
  }

  const grammarStats = getGrammarTagStats()
    .filter((item) => item.done > 0 || item.total > 0)
    .sort((left, right) => {
      if (left.accuracy !== right.accuracy) {
        return left.accuracy - right.accuracy;
      }
      return left.donePercent - right.donePercent;
    });

  const weakestGrammar = grammarStats.find((item) => item.done < item.total || item.accuracy < 80);
  if (weakestGrammar && weakestGrammar.done > 0) {
    return {
      type: "grammar",
      label: `推荐先练语法点：${weakestGrammar.tag}`,
      detail: `当前正确率 ${weakestGrammar.accuracy}%`,
      actionLabel: `去练 ${weakestGrammar.tag}`,
      action: `practice-grammar:${weakestGrammar.tag}`
    };
  }

  const categoryStats = getWordCategoryStats().sort((left, right) => left.learnedPercent - right.learnedPercent);
  const weakestCategory = categoryStats.find((item) => item.learned < item.total);
  if (weakestCategory) {
    return {
      type: "words",
      label: `推荐先背主题：${weakestCategory.name}`,
      detail: `已背 ${weakestCategory.learned}/${weakestCategory.total}`,
      actionLabel: `去背 ${weakestCategory.name}`,
      action: `practice-category:${weakestCategory.id}`
    };
  }

  return {
    type: "review",
    label: "推荐继续做综合复习",
    detail: "可以去错题重练或单词考核继续巩固。",
    actionLabel: "去综合练习",
    action: "practice-review"
  };
}

function getGrammarHint(item) {
  switch (item.grammarTag) {
    case "be verb":
      return "先看主语：I 用 am，he/she/it 用 is，we/you/they 用 are。";
    case "articles":
      return "先看后面名词前面的发音，元音音开头常用 an。";
    case "prepositions":
      return "想一想位置关系，是在里面、在上面，还是在后面。";
    case "imperatives":
      return "祈使句里通常直接用动词原形。";
    case "questions":
      return "先看问句主语是单数还是复数，再选合适的 be 动词。";
    case "demonstratives":
      return "留意后面的名词是不是复数。";
    case "question words":
      return "先判断是问人、问事物，还是问地点。";
    case "question patterns":
      return "固定问法里要看是在问年龄、数量还是大小。";
    case "present simple":
      return "一般现在时里，he/she/it 后面的动词通常要加 -s。";
    case "have / has":
      return "I/you/we/they 用 have，he/she/it 用 has。";
    case "there is / are":
      return "there is 接单数，there are 接复数。";
    case "modal + verb":
      return "can 后面直接接动词原形。";
    case "quantifiers":
      return "how many 常接可数名词复数。";
    case "verb patterns":
      return "注意固定搭配，有的后面接动词原形，有的接 -ing。";
    case "comparatives":
      return "看到 than 时，通常要选比较级。";
    case "superlatives":
      return "表示范围里“最……”时，通常要用最高级。";
    case "linking words":
      return "看前后两部分是并列关系，还是原因、时间关系。";
    case "time prepositions":
      return "先想是表示季节时间，还是表示某个动作之前。";
    default:
      return "先看主语、时间词和固定搭配，再判断答案。";
  }
}

function getGrammarExplanation(item) {
  switch (item.grammarTag) {
    case "be verb":
      return `这题主语和 ${item.answer} 搭配最自然，所以要选 ${item.answer}。`;
    case "articles":
      return item.answer === "an"
        ? "这里后面的单词以元音音开头，所以要用 an。"
        : item.answer === "a"
          ? "这里后面的单词不是元音音开头，所以要用 a。"
          : "这里说的是特指对象，所以要用 the。";
    case "prepositions":
      return `${item.answer} 最符合句子里的位置关系。`;
    case "imperatives":
      return "Please 这类祈使句后面直接接动词原形，所以不能选带 -s 或 -ing 的形式。";
    case "questions":
      return `问句里的主语决定 be 动词形式，这里应选 ${item.answer}。`;
    case "demonstratives":
      return `${item.answer} 用来指代复数名词，和句子搭配正确。`;
    case "question words":
      return `${item.answer} 正好对应这句话要问的信息类型。`;
    case "question patterns":
      return `这是固定问法，所以要选 ${item.answer}。`;
    case "present simple":
      return item.answer.endsWith("s")
        ? `主语是第三人称单数，所以动词要用 ${item.answer} 这种带 -s 的形式。`
        : `主语不是第三人称单数，所以动词保持原形 ${item.answer}。`;
    case "have / has":
      return item.answer === "has"
        ? "主语是第三人称单数，所以要用 has。"
        : "主语不是第三人称单数，所以要用 have。";
    case "there is / are":
      return item.answer === "is"
        ? "后面的名词是单数，所以用 there is。"
        : "后面的名词是复数，所以用 there are。";
    case "modal + verb":
      return `情态动词 can 后面要接动词原形，所以选 ${item.answer}。`;
    case "quantifiers":
      return "apples 是可数名词复数，所以要用 how many。";
    case "verb patterns":
      return item.answer === "listening to"
        ? "like 后面这里用动名词形式更自然，所以选 listening to。"
        : `这是固定搭配，后面应接 ${item.answer} 这种形式。`;
    case "comparatives":
      return "句子里有 than，说明这里要用比较级。";
    case "superlatives":
      return "表示范围里最小的那个玩具，所以要用最高级 smallest。";
    case "linking words":
      return "前后两个部分是并列补充关系，不是在说明原因，所以用 and。";
    case "time prepositions":
      return item.answer === "in"
        ? "季节前通常用 in，所以要说 in winter。"
        : "表示某件事之前，通常用 before。";
    default:
      return `正确答案是 ${item.answer}，因为它最符合句子里的主语、时态或固定搭配。`;
  }
}

function buildWordBank() {
  if (OFFICIAL_WORD_DATA.length) {
    return OFFICIAL_WORD_DATA.map((item, index) => {
      const source = item.source || "official";
      const pos = item.pos || "";
      const tier = getWordTier(item.word, source, pos);
      return {
        id: `word-${index + 1}`,
        order: index + 1,
        word: item.word,
        chinese: item.chinese || "",
        emoji: item.emoji,
        visual: getWordVisual(item.visualKey || item.word, item.emoji),
        categoryId: item.categoryId,
        categoryName: item.categoryName,
        phonetic: makeFriendlyPhonetic(item.word),
        pos,
        source,
        tier: tier.id,
        tierName: tier.name
      };
    });
  }

  let order = 0;
  return WORD_CATEGORIES.flatMap((category) =>
    category.words.map(([word, chinese]) => {
      order += 1;
      const tier = getWordTier(word, "core", "");
      return {
        id: `word-${order}`,
        order,
        word,
        chinese,
        emoji: category.emoji,
        visual: getWordVisual(word, category.emoji),
        categoryId: category.id,
        categoryName: category.name,
        phonetic: makeFriendlyPhonetic(word),
        pos: "",
        source: "core",
        tier: tier.id,
        tierName: tier.name
      };
    })
  );
}

function getWordVisual(word, fallbackEmoji) {
  const visualMap = {
    apple: "🍎", banana: "🍌", orange: "🍊", pear: "🍐", grape: "🍇", chocolate: "🍫", lemon: "🍋", mango: "🥭",
    melon: "🍈", strawberry: "🍓", pizza: "🍕", carrot: "🥕", potato: "🥔", tomato: "🍅", onion: "🧅", rice: "🍚",
    bread: "🍞", cake: "🍰", cookie: "🍪", milk: "🥛", juice: "🧃", egg: "🥚", coffee: "☕", sandwich: "🥪", yoghurt: "🍨",
    cat: "🐱", dog: "🐶", bird: "🐦", duck: "🦆", camel: "🐫", rabbit: "🐰", mouse: "🐭", horse: "🐴", cow: "🐮",
    crocodile: "🐊", sheep: "🐑", goat: "🐐", monkey: "🐵", tiger: "🐯", lion: "🦁", elephant: "🐘", giraffe: "🦒",
    panda: "🐼", bear: "🐻", donkey: "🫏", frog: "🐸", snake: "🐍", fish: "🐟", bee: "🐝", butterfly: "🦋",
    family: "👨‍👩‍👧", father: "👨", mother: "👩", dad: "👨", mum: "👩", brother: "👦", sister: "👧", grandfather: "👴",
    grandmother: "👵", grandpa: "👴", grandma: "👵", uncle: "👨", aunt: "👩", cousin: "🧒", baby: "👶", boy: "👦",
    girl: "👧", friend: "🧑", child: "🧒", parent: "🧑", son: "👦", daughter: "👧", home: "🏠", love: "💛",
    school: "🏫", class: "🧑‍🏫", lesson: "📘", teacher: "🧑‍🏫", student: "🧑‍🎓", book: "📕", pen: "🖊️", pencil: "✏️",
    ruler: "📏", eraser: "🩹", bag: "🎒", desk: "🪑", chair: "🪑", board: "🟩", paper: "📄", page: "📃", story: "📖",
    question: "❓", answer: "✅", spell: "🔤", read: "📚", write: "✍️", draw: "🎨", test: "📝", learn: "🧠",
    head: "🙂", face: "😀", eye: "👁️", ear: "👂", nose: "👃", mouth: "👄", tooth: "🦷", neck: "🧍", arm: "💪",
    hand: "✋", finger: "☝️", leg: "🦵", foot: "🦶", toe: "🦶", hair: "💇", body: "🧍", back: "🔙", stomach: "🫃",
    pain: "😣", medicine: "💊", heart: "❤️", healthy: "💚", cold: "🤧", hurt: "🤕", well: "😊",
    shirt: "👕", "T-shirt": "👕", coat: "🧥", jacket: "🧥", dress: "👗", skirt: "👗", trousers: "👖", shorts: "🩳",
    sock: "🧦", shoe: "👟", boot: "🥾", hat: "👒", cap: "🧢", glove: "🧤", scarf: "🧣", sweater: "🧶", pocket: "👝",
    watch: "⌚", belt: "🪢", uniform: "🥼", wear: "🧥", put: "🫳", take: "🫴", pretty: "✨", new: "🆕",
    room: "🚪", bed: "🛏️", door: "🚪", window: "🪟", table: "🪑", lamp: "💡", clock: "🕒", sofa: "🛋️", box: "📦",
    toy: "🧸", kitchen: "🍳", bathroom: "🛁", garden: "🌷", floor: "🟫", wall: "🧱", picture: "🖼️", phone: "☎️",
    cup: "☕", plate: "🍽️", spoon: "🥄", fork: "🍴", knife: "🔪", blanket: "🛏️", cupboard: "🗄️", "living room": "🏠",
    park: "🌳", zoo: "🦓", shop: "🏪", market: "🛒", farm: "🚜", library: "📚", hospital: "🏥", street: "🛣️",
    road: "🛣️", bridge: "🌉", river: "🏞️", lake: "🏞️", beach: "🏖️", sea: "🌊", mountain: "⛰️", forest: "🌲",
    city: "🏙️", town: "🏘️", village: "🏡", station: "🚉", "bus stop": "🚏", playground: "🛝", cinema: "🎬",
    museum: "🏛️", square: "◻️", car: "🚗", bus: "🚌", bike: "🚲", train: "🚆", aeroplane: "✈️", boat: "⛵",
    ship: "🚢", taxi: "🚕", tram: "🚊", helicopter: "🚁", motorbike: "🏍️", underground: "🚇", ticket: "🎫",
    seat: "💺", driver: "🧑‍✈️", ride: "🚴", walk: "🚶", run: "🏃", stop: "🛑", start: "▶️", slow: "🐢", fast: "⚡",
    left: "⬅️", right: "➡️", straight: "⬆️", day: "🌞", night: "🌙", morning: "🌅", afternoon: "🌤️", evening: "🌆",
    today: "📅", tomorrow: "⏭️", yesterday: "⏮️", week: "🗓️", month: "🗓️", year: "🎆", spring: "🌱", summer: "☀️",
    autumn: "🍂", winter: "❄️", sunny: "☀️", foggy: "🌫️", windy: "💨", cloudy: "☁️", storm: "⛈️", hot: "🔥",
    warm: "🌤️", cool: "🧊", weather: "🌦️", time: "⏰", red: "🔴", blue: "🔵", yellow: "🟡", green: "🟢",
    pink: "🩷", purple: "🟣", gold: "🟨", black: "⚫", white: "⚪", brown: "🟤", one: "1️⃣", two: "2️⃣", three: "3️⃣",
    four: "4️⃣", five: "5️⃣", six: "6️⃣", seven: "7️⃣", eight: "8️⃣", nine: "9️⃣", ten: "🔟", circle: "⚪",
    square: "◼️", zero: "0️⃣", line: "📏", point: "📍"
  };
  return visualMap[word] || fallbackEmoji;
}

function buildQuestionBank() {
  const pictureSeed = WORD_BANK.filter((item) =>
    ["food", "animals", "family", "school", "home", "places", "transport", "nature", "shopping"].includes(item.categoryId)
      && !item.word.includes(" ")
  ).slice(0, 60);

  const pictureQuestions = pictureSeed.map((item, index, list) => {
    const sameCategory = shuffle(
      list.filter((candidate) => candidate.id !== item.id && candidate.categoryId === item.categoryId)
    );
    const crossCategory = shuffle(
      list.filter((candidate) => candidate.id !== item.id && candidate.categoryId !== item.categoryId)
    );
    const distractors = [];
    for (const candidate of sameCategory) {
      if (distractors.length === 2) {
        break;
      }
      distractors.push(candidate);
    }
    for (const candidate of crossCategory) {
      if (distractors.length === 2) {
        break;
      }
      distractors.push(candidate);
    }
    return {
      id: `picture-${index + 1}`,
      part: "part1",
      skill: "picture-vocabulary",
      type: "picture",
      question: "Look at the picture. Which word is correct?",
      image: item.emoji,
      pictureHint: `词汇主题：${item.categoryName}`,
      topicLabel: item.categoryName,
      difficulty: "topic-match",
      options: shuffle([item.word, ...distractors.map((candidate) => candidate.word)]),
      answer: item.word,
      gold: 10,
      hint: `先看图片内容，再想一想它属于“${item.categoryName}”这个主题里的哪个单词。`,
      explanation: `这张图对应的单词是 ${item.word}，它属于“${item.categoryName}”主题词汇。`
    };
  });

  const grammarQuestions = GRAMMAR_QUESTIONS.map((item, index) => ({
    id: `grammar-${index + 1}`,
    part: "part4",
    skill: "gap-fill-choice",
    type: "choice",
    question: `Choose the correct answer.\n${item.stem.replace("___", "_____")}`,
    options: item.options,
    answer: item.answer,
    gold: item.gold,
    grammarTag: item.grammarTag,
    level: item.level,
    hint: getGrammarHint(item),
    explanation: getGrammarExplanation(item)
  }));

  return [...pictureQuestions, ...grammarQuestions];
}

function loadState() {
  const defaults = {
    gold: 40,
    learnedWords: [],
    assessedWords: [],
    doneQuestions: [],
    wrongQuestions: [],
    unlockedEquipment: [],
    wordQuizStats: {},
    questionStats: {},
    wordQuizRounds: 0,
    guideSeen: false,
    lastRewardName: "",
    lastStudyWordId: "",
    lastGoldReason: "",
    streakDays: 0,
    lastActiveDate: "",
    dataResetNotice: false
  };

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return defaults;
    }
    return { ...defaults, ...JSON.parse(raw) };
  } catch (error) {
    console.error(error);
    return { ...defaults, dataResetNotice: true };
  }
}

function saveState() {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function getPercent(value, total) {
  if (!total) {
    return 0;
  }
  return Math.min(100, Math.round((value / total) * 100));
}

function shuffle(items) {
  const copy = items.slice();
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function sample(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function dedupe(items) {
  return [...new Set(items)];
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function distance(x1, y1, x2, y2) {
  return Math.hypot(x2 - x1, y2 - y1);
}

function lerp(start, end, progress) {
  return start + (end - start) * progress;
}

function pointToSegmentDistance(px, py, start, end) {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const lenSq = dx * dx + dy * dy;
  if (!lenSq) {
    return distance(px, py, start.x, start.y);
  }
  let t = ((px - start.x) * dx + (py - start.y) * dy) / lenSq;
  t = Math.max(0, Math.min(1, t));
  const projX = start.x + t * dx;
  const projY = start.y + t * dy;
  return distance(px, py, projX, projY);
}

function drawCloud(ctx, x, y, scale) {
  ctx.fillStyle = "rgba(255,255,255,0.88)";
  ctx.beginPath();
  ctx.arc(x, y, 22 * scale, 0, Math.PI * 2);
  ctx.arc(x + 26 * scale, y - 10 * scale, 18 * scale, 0, Math.PI * 2);
  ctx.arc(x + 50 * scale, y, 22 * scale, 0, Math.PI * 2);
  ctx.fill();
}

function makeFriendlyPhonetic(word) {
  let hint = word.toLowerCase();
  const replacements = [
    [/tion/g, "shun"],
    [/ture/g, "cher"],
    [/igh/g, "ai"],
    [/ph/g, "f"],
    [/kn/g, "n"],
    [/wr/g, "r"],
    [/wh/g, "w"],
    [/qu/g, "kw"],
    [/ck/g, "k"],
    [/ee/g, "ee"],
    [/oo/g, "oo"],
    [/ea/g, "ee"],
    [/ou/g, "ow"],
    [/ow/g, "ow"],
    [/oi/g, "oy"],
    [/ay/g, "ay"],
    [/ai/g, "ai"],
    [/ar/g, "ar"],
    [/or/g, "or"]
  ];
  replacements.forEach(([pattern, value]) => {
    hint = hint.replace(pattern, value);
  });
  hint = hint.replace(/e\b/g, "");
  hint = hint.replace(/([bcdfghjklmnpqrstvwxyz])le\b/g, "$1-ul");
  hint = hint.replace(/([aeiouy]{1,2})([bcdfghjklmnpqrstvwxyz])/g, "$1-$2");
  hint = hint.replace(/-+/g, "-").replace(/^-|-$/g, "");
  return `/${hint}/`;
}

function escapeAttr(value) {
  return value.replace(/"/g, "&quot;");
}

function getRarityClass(rarity) {
  if (rarity === "rare") {
    return "rarity-rare";
  }
  if (rarity === "legend") {
    return "rarity-legend";
  }
  return "rarity-normal";
}

function getEquipmentArt(item) {
  const defaultEmoji = EQUIPMENT_CATEGORY_META[item.category]?.emoji || "🎁";
  const shortTag = item.name
    .replace(/主战坦克|战斗机|隐形轰炸机|自动步枪|狙击步枪|卡宾枪|步枪|手枪/g, "")
    .replace(/\s+/g, " ")
    .trim();
  const tag = shortTag || item.symbol;
  const emoji = defaultEmoji;
  return { emoji, tag };
}
