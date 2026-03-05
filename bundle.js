// 唐朝开放世界MVU系统 - SillyTavern扩展
// 版本: 3.0.0
// 作者: 唐朝开放世界项目组
// 适配: 初唐至盛唐扩展世界书

(function(window) {
  'use strict';

  console.log('唐朝开放世界MVU扩展正在加载...');

  // ============================================
  // MVU变量定义 - 扩展版
  // ============================================
  const MVU_VARIABLES = {
    // 世界时间变量
    world_era: { name: '世界_时代', type: 'string', default: '武德', enum: ['武德', '贞观', '永徽', '武周', '开元', '天宝'] },
    world_year: { name: '世界_年份', type: 'number', default: 618, min: 618, max: 755 },
    world_month: { name: '世界_月份', type: 'number', default: 1, min: 1, max: 12 },
    world_day: { name: '世界_日期', type: 'number', default: 1, min: 1, max: 30 },
    world_season: { name: '世界_季节', type: 'string', default: '春', enum: ['春', '夏', '秋', '冬'] },
    world_time_period: { name: '世界_时段', type: 'string', default: '早朝', enum: ['早朝', '午时', '午后', '黄昏', '夜晚', '深夜'] },
    
    // 世界位置变量
    world_location_region: { name: '世界_位置_区域', type: 'string', default: '长安' },
    world_location_place: { name: '世界_位置_地点', type: 'string', default: '太极宫' },
    
    // 主角基础变量
    protagonist_name: { name: '主角_姓名', type: 'string', default: '李明' },
    protagonist_gender: { name: '主角_性别', type: 'string', default: '男', enum: ['男', '女'] },
    protagonist_age: { name: '主角_年龄', type: 'number', default: 18, min: 10, max: 100 },
    protagonist_identity: { name: '主角_身份', type: 'string', default: '平民', enum: ['皇室', '士族', '官员', '平民', '商人', '僧道', '艺人', '游侠', '奴婢'] },
    protagonist_profession: { name: '主角_职业', type: 'string', default: '文人', enum: ['文人', '武将', '商人', '艺人', '僧道', '游侠'] },
    
    // 主角声望变量
    protagonist_reputation: { name: '主角_声望值', type: 'number', default: 0, min: -100, max: 100 },
    protagonist_reputation_desc: { name: '主角_声望描述', type: 'string', default: '默默无闻', enum: ['默默无闻', '小有名气', '名扬四海', '威震天下'] },
    
    // 主角政治变量
    protagonist_court_influence: { name: '主角_朝堂影响力', type: 'number', default: 0, min: 0, max: 100 },
    protagonist_harem_status: { name: '主角_后宫地位', type: 'number', default: 0, min: 0, max: 100 },
    protagonist_political_power: { name: '主角_政治权力', type: 'number', default: 0, min: 0, max: 100 },
    
    // 主角资源变量
    protagonist_imperial_favor: { name: '主角_帝王宠爱', type: 'number', default: 0, min: 0, max: 100 },
    protagonist_family_influence: { name: '主角_家族势力', type: 'number', default: 0, min: 0, max: 100 },
    protagonist_wealth: { name: '主角_财富', type: 'number', default: 100, min: 0, max: 10000 },
    
    // 主角属性变量
    protagonist_charisma: { name: '主角_魅力', type: 'number', default: 50, min: 0, max: 100 },
    protagonist_intelligence: { name: '主角_智慧', type: 'number', default: 50, min: 0, max: 100 },
    protagonist_literary_talent: { name: '主角_文采', type: 'number', default: 50, min: 0, max: 100 },
    protagonist_martial_art: { name: '主角_武艺', type: 'number', default: 50, min: 0, max: 100 },
    protagonist_political_skill: { name: '主角_政治手腕', type: 'number', default: 50, min: 0, max: 100 },
    protagonist_commerce: { name: '主角_商业', type: 'number', default: 50, min: 0, max: 100 },
    
    // 主角状态变量
    protagonist_status: { name: '主角_状态', type: 'string', default: '正常', enum: ['正常', '生病', '受伤', '怀孕', '闭关', '流放', '监禁'] },
    protagonist_health: { name: '主角_健康值', type: 'number', default: 100, min: 0, max: 100 },
    protagonist_stress: { name: '主角_压力值', type: 'number', default: 0, min: 0, max: 100 },
    
    // 主角物品变量
    protagonist_items_owned: { name: '主角_物品_已拥有', type: 'array', default: [] },
    protagonist_item_current: { name: '主角_物品_当前', type: 'string', default: '无' },
    protagonist_gifts_owned: { name: '主角_礼物_已拥有', type: 'array', default: [] },
    protagonist_gift_current: { name: '主角_礼物_当前', type: 'string', default: '无' },
    
    // 主角人际关系变量
    protagonist_friends: { name: '主角_人际关系_好友', type: 'array', default: [] },
    protagonist_enemies: { name: '主角_人际关系_仇敌', type: 'array', default: [] },
    protagonist_lovers: { name: '主角_人际关系_恋人', type: 'array', default: [] },
    protagonist_spouse: { name: '主角_配偶', type: 'string', default: '无' },
    
    // 主角家族变量
    protagonist_family: { name: '主角_家族', type: 'string', default: '无' },
    protagonist_family_position: { name: '主角_家族_地位', type: 'string', default: '普通成员' },
    
    // 剧情进度变量
    story_chapter: { name: '剧情_章节', type: 'string', default: '初入大唐' },
    story_main_progress: { name: '剧情_主线进度', type: 'number', default: 0, min: 0, max: 100 },
    story_side_progress: { name: '剧情_支线进度', type: 'number', default: 0, min: 0, max: 100 },
    
    // 剧情任务变量
    story_quests_completed: { name: '剧情_任务_已完成', type: 'array', default: [] },
    story_quest_current: { name: '剧情_任务_当前', type: 'string', default: '无' },
    story_events_triggered: { name: '剧情_事件_已触发', type: 'array', default: [] },
    story_event_current: { name: '剧情_事件_当前', type: 'string', default: '无' }
  };

  // ============================================
  // 角色关系变量模板
  // ============================================
  const CHARACTER_RELATIONSHIP_TEMPLATE = {
    affection: { name: '好感度', type: 'number', default: 0, min: 0, max: 100 },
    trust: { name: '信任度', type: 'number', default: 0, min: 0, max: 100 },
    intimacy: { name: '亲密度', type: 'number', default: 0, min: 0, max: 100 },
    relationship_stage: { name: '关系阶段', type: 'number', default: 1, min: 1, max: 4 },
    interaction_count: { name: '互动次数', type: 'number', default: 0, min: 0 },
    last_interaction: { name: '最后互动', type: 'string', default: null },
    relationship_status: { name: '关系状态', type: 'string', default: '陌生人', enum: ['陌生人', '相识', '朋友', '知己', '恋人', '夫妻', '仇人'] }
  };

  // ============================================
  // 四阶段剧情系统
  // ============================================
  const STORY_STAGES = {
    stage_1: {
      name: '初识阶段',
      description: '初次相遇，建立基本认知',
      requirements: {
        affection: { min: 0, max: 30 },
        trust: { min: 0, max: 20 },
        interaction_count: { min: 0, max: 5 }
      },
      available_actions: ['问候', '自我介绍', '询问身份', '礼貌交谈'],
      locked_actions: ['赠送贵重礼物', '私密交谈', '肢体接触'],
      trigger_events: ['初次见面', '宫廷宴会', '偶遇']
    },
    stage_2: {
      name: '熟悉阶段',
      description: '逐渐熟悉，开始建立关系',
      requirements: {
        affection: { min: 31, max: 60 },
        trust: { min: 21, max: 50 },
        interaction_count: { min: 6, max: 15 }
      },
      available_actions: ['深入交谈', '赠送礼物', '邀请活动', '诗词唱和'],
      locked_actions: ['表白心意', '亲密接触', '承诺未来'],
      trigger_events: ['日常互动', '共同活动', '互赠礼物']
    },
    stage_3: {
      name: '亲密阶段',
      description: '关系深入，情感升温',
      requirements: {
        affection: { min: 61, max: 85 },
        trust: { min: 51, max: 80 },
        interaction_count: { min: 16, max: 30 }
      },
      available_actions: ['表白心意', '亲密接触', '承诺未来', '共度时光'],
      locked_actions: ['结为连理', '家族联盟'],
      trigger_events: ['私密会面', '情感交流', '共度时光']
    },
    stage_4: {
      name: '羁绊阶段',
      description: '关系稳固，情感深厚',
      requirements: {
        affection: { min: 86, max: 100 },
        trust: { min: 81, max: 100 },
        interaction_count: { min: 31, max: 999 }
      },
      available_actions: ['结为连理', '家族联盟', '共谋大事', '生死与共'],
      locked_actions: [],
      trigger_events: ['生死与共', '家族联姻', '政治联盟']
    }
  };

  // ============================================
  // 变量更新规则
  // ============================================
  const UPDATE_RULES = {
    affection: {
      increase_actions: [
        { action: '赠礼', value_range: [5, 15], conditions: ['礼物价值 >= 10', '信任度 >= 20'], cooldown: 7 },
        { action: '共患难', value_range: [10, 25], conditions: ['事件危险度 >= 5', '成功解决危机'], cooldown: 0 },
        { action: '解围相助', value_range: [8, 20], conditions: ['对方处于困境', '提供有效帮助'], cooldown: 3 },
        { action: '诗词唱和', value_range: [3, 10], conditions: ['文学素养 >= 50', '诗词质量 >= 良好'], cooldown: 1 },
        { action: '陪伴', value_range: [2, 8], conditions: ['互动时长 >= 1小时', '氛围良好'], cooldown: 0 }
      ],
      decrease_actions: [
        { action: '冒犯', value_range: [-20, -5], conditions: ['言语不当', '行为失礼'], cooldown: 0 },
        { action: '背叛', value_range: [-50, -30], conditions: ['严重失信', '损害对方利益'], cooldown: 0 },
        { action: '忽视', value_range: [-10, -3], conditions: ['长期未互动 (>= 30天)', '拒绝合理请求'], cooldown: 0 }
      ]
    },
    trust: {
      increase_actions: [
        { action: '履行承诺', value_range: [10, 20], conditions: ['承诺重要性 >= 中等', '按时完成'], cooldown: 0 },
        { action: '保守秘密', value_range: [15, 30], conditions: ['秘密重要性 >= 高', '未泄露'], cooldown: 0 },
        { action: '忠诚表现', value_range: [5, 15], conditions: ['在关键时刻支持对方', '不背叛'], cooldown: 0 }
      ],
      decrease_actions: [
        { action: '失信', value_range: [-30, -10], conditions: ['未履行承诺', '造成损失'], cooldown: 0 },
        { action: '泄露秘密', value_range: [-50, -20], conditions: ['秘密重要性 >= 中等', '造成负面影响'], cooldown: 0 }
      ]
    },
    intimacy: {
      increase_actions: [
        { action: '私密交谈', value_range: [5, 15], conditions: ['好感度 >= 40', '信任度 >= 30', '私密场合'], cooldown: 1 },
        { action: '肢体接触', value_range: [8, 20], conditions: ['好感度 >= 60', '信任度 >= 50', '关系阶段 >= 3'], cooldown: 0 },
        { action: '共度时光', value_range: [3, 12], conditions: ['好感度 >= 50', '活动愉快'], cooldown: 0 }
      ]
    }
  };

  // ============================================
  // 角色数据库 - 扩展版
  // ============================================
  const CHARACTER_DATABASE = {
    // ========== 公主角色 ==========
    princess_changle: {
      name: '长乐公主',
      full_name: '李丽质',
      type: '公主',
      age: 22,
      period: '贞观',
      identities: ['长乐公主，名李丽质，唐太宗李世民与长孙皇后嫡长女', '李世民最宠爱的女儿，万千宠爱于一身', '长孙冲之妻，长孙无忌长子之媳'],
      appearance: '容貌秀丽，气质温婉，举止间流露出皇室公主的高贵与优雅。她的美貌如同春日里的桃花，清新脱俗。',
      temperament: '性情温和，聪慧过人，深受父皇李世民的宠爱，是宫廷中备受尊敬的公主。',
      historical_background: '贞观二年（628年）封长乐郡公主，下嫁长孙无忌之子长孙冲。贞观十七年（643年）病逝，年仅二十三岁。',
      preferences: {
        liked_gifts: ['诗词集', '精美饰品', '珍稀花卉'],
        disliked_actions: ['粗鲁言语', '无视礼节', '过度亲密（早期阶段）']
      }
    },
    princess_pingyang: {
      name: '平阳昭公主',
      full_name: '平阳公主',
      type: '公主',
      age: 33,
      period: '武德',
      identities: ['平阳公主，唐朝开国公主，李渊之女，窦皇后所生', '中国古代第一位统领千军万马的女性，巾帼英雄', '柴绍之妻，凌烟阁二十四功臣之一'],
      appearance: '英姿飒爽，眉宇间透露出军人的坚毅与果敢。作为中国历史上第一位统领千军万马的女将军，她有着与生俱来的统帅气质。',
      temperament: '性格刚毅果决，行事雷厉风行，在战场上冷静沉着，决策果断。',
      historical_background: '李渊起兵时，她在鄠县散尽家财招兵买马，组建"娘子军"，为唐朝建立立下赫赫战功。死后以军礼下葬，是中国历史上唯一一位以军礼下葬的公主。',
      preferences: {
        liked_gifts: ['兵器', '兵法书籍', '战马'],
        disliked_actions: ['软弱表现', '优柔寡断', '轻视女性']
      }
    },
    princess_jinyang: {
      name: '晋阳公主',
      full_name: '李明达',
      type: '公主',
      age: 12,
      period: '贞观',
      identities: ['晋阳公主，字明达，唐太宗李世民与长孙皇后幼女', '李世民最疼爱的小女儿，聪明伶俐', '擅长书法，深得太宗真传'],
      appearance: '稚气未脱的脸庞上透着聪慧灵气，眉眼间有母亲的温婉。虽年幼，却已显露出皇室公主的端庄气质。',
      temperament: '性格活泼可爱，聪慧过人，深得父皇李世民的宠爱。擅长书法，临摹父皇笔迹几可乱真。',
      historical_background: '贞观十六年（642年）早逝，年仅十二岁。李世民悲痛欲绝，数日不能上朝。',
      preferences: {
        liked_gifts: ['毛笔', '墨砚', '字帖', '糖果'],
        disliked_actions: ['严厉训斥', '限制自由', '忽视她的才艺']
      }
    },
    princess_chengyang: {
      name: '城阳公主',
      full_name: '城阳公主',
      type: '公主',
      age: 20,
      period: '贞观',
      identities: ['城阳公主，唐太宗李世民与长孙皇后之女', '杜如晦之子杜荷之妻', '性格刚烈，敢爱敢恨'],
      appearance: '容貌秀丽中带着几分英气，眉宇间有父亲的刚毅。她的眼神锐利，举止间流露出不羁的个性。',
      temperament: '性格刚烈直爽，敢爱敢恨，不拘小节。对不平之事敢于直言，有着与生俱来的正义感。',
      historical_background: '下嫁杜如晦之子杜荷。杜荷因谋反被杀后，改嫁薛瓘。',
      preferences: {
        liked_gifts: ['宝剑', '骏马', '兵书'],
        disliked_actions: ['虚伪奉承', '优柔寡断', '欺凌弱小']
      }
    },
    princess_xiangcheng: {
      name: '襄城公主',
      full_name: '襄城公主',
      type: '公主',
      age: 25,
      period: '贞观',
      identities: ['襄城公主，唐太宗李世民之女', '萧锐之妻，萧瑀之子之媳', '以贤德著称，深得太宗赞赏'],
      appearance: '容貌端庄秀丽，气质温婉贤淑。她的举止优雅得体，是宫廷中公认的贤德公主。',
      temperament: '性格温婉贤淑，知书达理，待人宽厚。以贤德著称，深得太宗赞赏。',
      historical_background: '下嫁萧瑀之子萧锐。以贤德著称，太宗曾命诸公主以她为榜样。',
      preferences: {
        liked_gifts: ['佛经', '古籍', '刺绣'],
        disliked_actions: ['奢侈浪费', '争风吃醋', '干预朝政']
      }
    },

    // ========== 皇后妃嫔 ==========
    empress_zhangsun: {
      name: '长孙皇后',
      full_name: '长孙氏',
      type: '皇后',
      age: 36,
      period: '贞观',
      identities: ['长孙皇后，文德皇后，李世民正妻', '长孙无忌妹，13岁嫁李世民', '贞观年间为皇后，母仪天下', '636年早逝，李承乾李泰母亲'],
      appearance: '气质高贵典雅，举止端庄大方，拥有皇后特有的雍容华贵。她的美貌如出水芙蓉，令人过目难忘。',
      temperament: '性情温和，聪慧贤淑，母仪天下，深受李世民敬重。',
      historical_background: '贞观十年（636年）病逝，年仅三十六岁。李世民悲痛不已，在宫中建层观以望昭陵。',
      preferences: {
        liked_gifts: ['佛经', '古籍', '珍稀药材'],
        disliked_actions: ['争风吃醋', '干预朝政', '奢侈浪费']
      }
    },
    consort_yang: {
      name: '杨贵妃',
      full_name: '杨玉环',
      type: '贵妃',
      age: 37,
      period: '天宝',
      identities: ['杨贵妃，李隆基宠妃，杨玉环', '中国古代四大美女之一', '737年入宫为寿王妃', '745年被李隆基册封为贵妃', '极受宠爱，756年安史之乱爆发', '随李隆基逃往蜀地，在马嵬坡被士兵逼死'],
      appearance: '美艳动人，气质妖娆，拥有中国古代四大美女之一的绝世容颜。她的美貌如盛开的牡丹，令人心醉神迷。',
      temperament: '性格热情奔放，善解人意，精通音律舞蹈，深受李隆基宠爱。',
      historical_background: '天宝十五载（756年），安史之乱爆发，随李隆基逃往蜀地。在马嵬坡，士兵哗变，被逼自缢而死。',
      preferences: {
        liked_gifts: ['珠宝首饰', '华美服饰', '珍稀香料', '乐器'],
        disliked_actions: ['冷落', '批评', '政治讨论']
      }
    },
    empress_wu: {
      name: '武则天',
      full_name: '武曌',
      type: '皇帝',
      age: 67,
      period: '武周',
      identities: ['武则天，中国历史上唯一的女皇帝', '唐高宗李治的皇后，后自立为帝', '改国号为周，在位15年', '政治手腕高超，开创武周盛世'],
      appearance: '威严华贵，眉宇间透着帝王之气。虽年过花甲，却依然风姿绰约，举手投足间尽显女皇的威仪。',
      temperament: '性格刚毅果断，政治手腕高超。善于用人，但也以酷吏政治闻名。',
      historical_background: '690年称帝，改唐为周。在位期间，政治清明，经济发展，为开元盛世奠定基础。705年神龙政变后被迫退位。',
      preferences: {
        liked_gifts: ['珍稀宝石', '佛经', '书法作品'],
        disliked_actions: ['质疑权威', '结党营私', '软弱表现']
      }
    },

    // ========== 帝王角色 ==========
    emperor_taizong: {
      name: '唐太宗',
      full_name: '李世民',
      type: '皇帝',
      age: 40,
      period: '贞观',
      identities: ['唐太宗李世民，唐朝第二位皇帝', '玄武门之变夺位，开创贞观之治', '被后世尊为"千古一帝"', '文治武功，四夷宾服'],
      appearance: '英武不凡，眉宇间透着帝王的威严与睿智。身材魁梧，举止间流露出战场统帅的气势。',
      temperament: '性格刚毅果断，善于纳谏，用人不疑。既有武将的果敢，又有文人的雅致。',
      historical_background: '武德九年（626年）发动玄武门之变，夺位称帝。在位期间开创贞观之治，被后世尊为"千古一帝"。',
      preferences: {
        liked_gifts: ['良马', '宝剑', '兵书', '谏言'],
        disliked_actions: ['阿谀奉承', '结党营私', '欺君罔上']
      }
    },
    emperor_gaozong: {
      name: '唐高宗',
      full_name: '李治',
      type: '皇帝',
      age: 35,
      period: '永徽',
      identities: ['唐高宗李治，唐朝第三位皇帝', '李世民第九子，长孙皇后所生', '武则天之夫，晚年朝政为武后掌控', '在位期间唐朝疆域达到最大'],
      appearance: '面容温和，气质儒雅，有书生之气。虽身体孱弱，却有着帝王的端庄。',
      temperament: '性格温和仁厚，但优柔寡断。对武则天宠爱有加，晚年朝政多由武后决断。',
      historical_background: '贞观二十三年（649年）即位。在位期间，唐朝疆域达到最大。晚年因风疾，朝政渐为武则天掌控。',
      preferences: {
        liked_gifts: ['书法', '诗词', '医药'],
        disliked_actions: ['强势逼人', '挑拨离间', '无视武则天']
      }
    },
    emperor_xuanzong: {
      name: '唐玄宗',
      full_name: '李隆基',
      type: '皇帝',
      age: 50,
      period: '开元',
      identities: ['唐玄宗李隆基，唐朝第七位皇帝', '开创开元盛世，大唐极盛', '晚年宠爱杨贵妃，导致安史之乱', '唐朝由盛转衰的关键人物'],
      appearance: '风度翩翩，气宇轩昂，有盛世帝王的华贵之气。精通音律，举止间流露出艺术家的气质。',
      temperament: '性格开朗豪爽，精通音律。早年励精图治，晚年沉迷享乐，宠爱杨贵妃。',
      historical_background: '先天元年（712年）即位。开元年间开创盛世，天宝年间因宠爱杨贵妃、重用安禄山，导致安史之乱爆发。',
      preferences: {
        liked_gifts: ['乐器', '乐谱', '珍稀花卉', '美酒'],
        disliked_actions: ['批评杨贵妃', '提及安禄山', '破坏雅兴']
      }
    },

    // ========== 名将角色 ==========
    general_lijing: {
      name: '李靖',
      full_name: '李靖',
      type: '将军',
      age: 55,
      period: '贞观',
      identities: ['李靖，唐朝开国名将，军神', '凌烟阁二十四功臣之一', '灭东突厥，征吐谷浑', '著有《李卫公兵法》'],
      appearance: '威风凛凛，眉宇间透着久经沙场的沉稳与睿智。虽年过半百，却依然精神矍铄。',
      temperament: '性格沉稳内敛，用兵如神。善于谋略，战无不胜。',
      historical_background: '贞观三年（629年）率军灭东突厥，贞观九年（635年）征吐谷浑。被封为卫国公，位列凌烟阁。',
      preferences: {
        liked_gifts: ['兵书', '良马', '宝剑'],
        disliked_actions: ['轻敌冒进', '不听号令', '贪功冒进']
      }
    },
    general_xuerengui: {
      name: '薛仁贵',
      full_name: '薛仁贵',
      type: '将军',
      age: 45,
      period: '永徽',
      identities: ['薛仁贵，唐朝名将', '三箭定天山，征高句丽', '白袍小将，勇冠三军', '平民出身，凭军功封侯'],
      appearance: '英武不凡，白袍银甲，有"白袍小将"之称。眉宇间透着勇武之气。',
      temperament: '性格勇猛果敢，武艺高强。善于骑射，有"三箭定天山"的传奇。',
      historical_background: '永徽年间从军，因勇武过人受到重用。曾三箭定天山，征高句丽立下赫赫战功。',
      preferences: {
        liked_gifts: ['强弓', '利箭', '战马'],
        disliked_actions: ['畏敌不前', '贪生怕死', '以貌取人']
      }
    },
    general_guoziyi: {
      name: '郭子仪',
      full_name: '郭子仪',
      type: '将军',
      age: 60,
      period: '天宝',
      identities: ['郭子仪，唐朝中兴名将', '平定安史之乱，再造大唐', '历事四朝，功高震主而不疑', '汾阳郡王，尚父'],
      appearance: '威严沉稳，眉宇间透着大将之风。虽年过花甲，却依然精神矍铄，不减当年。',
      temperament: '性格沉稳大度，忠心耿耿。善于用兵，更善于处世，功高而不震主。',
      historical_background: '安史之乱爆发后，率军平叛，收复两京。历事四朝，功勋卓著，被封为汾阳郡王。',
      preferences: {
        liked_gifts: ['兵书', '良马', '佛经'],
        disliked_actions: ['结党营私', '居功自傲', '背叛朝廷']
      }
    },

    // ========== 文人角色 ==========
    poet_libai: {
      name: '李白',
      full_name: '李白',
      type: '诗人',
      age: 40,
      period: '开元',
      identities: ['李白，字太白，号青莲居士', '诗仙，唐朝最伟大的诗人之一', '浪漫主义诗歌的代表人物', '曾为翰林供奉，后漫游天下'],
      appearance: '风度翩翩，气质洒脱，有仙人之姿。眉宇间透着不羁的豪气与诗人的浪漫。',
      temperament: '性格豪放不羁，嗜酒如命。诗才横溢，有"斗酒诗百篇"的传奇。',
      historical_background: '开元年间入长安，被贺知章称为"谪仙人"。曾为翰林供奉，后因得罪权贵被赐金放还。晚年投奔永王李璘，失败后被流放夜郎。',
      preferences: {
        liked_gifts: ['美酒', '好诗', '名山大川'],
        disliked_actions: ['拘束礼节', '阿谀奉承', '限制自由']
      }
    },
    poet_dufu: {
      name: '杜甫',
      full_name: '杜甫',
      type: '诗人',
      age: 45,
      period: '天宝',
      identities: ['杜甫，字子美，号少陵野老', '诗圣，唐朝伟大的现实主义诗人', '与李白并称"李杜"', '忧国忧民，诗风沉郁顿挫'],
      appearance: '面容清瘦，眉宇间透着忧国忧民的愁绪。虽生活困顿，却有着文人的傲骨。',
      temperament: '性格沉郁忧愤，忧国忧民。诗风沉郁顿挫，被称为"诗史"。',
      historical_background: '天宝年间困守长安，安史之乱后流离失所。晚年漂泊西南，病逝于湘江舟中。',
      preferences: {
        liked_gifts: ['好诗', '古籍', '医药'],
        disliked_actions: ['铺张浪费', '无视民生', '阿谀权贵']
      }
    },

    // ========== 商人角色 ==========
    merchant_hu: {
      name: '胡商阿里',
      full_name: '阿里·本·哈桑',
      type: '商人',
      age: 45,
      period: '开元',
      identities: ['波斯胡商，丝路巨贾', '长安西市最大的胡商之一', '精通多国语言，人脉广泛', '经营珠宝、香料、丝绸贸易'],
      appearance: '深目高鼻，异域风情浓郁。身着华丽的胡服，举止间流露出商人的精明。',
      temperament: '性格精明圆滑，善于经商。精通多国语言，人脉广泛。',
      historical_background: '来自波斯的胡商，在长安西市经营多年，成为丝路上最有影响力的商人之一。',
      preferences: {
        liked_gifts: ['珍稀宝石', '香料', '丝绸'],
        disliked_actions: ['欺诈', '失信', '轻视胡人']
      }
    },

    // ========== 江湖角色 ==========
    jianghu_shaolin: {
      name: '玄慈大师',
      full_name: '玄慈',
      type: '僧人',
      age: 50,
      period: '贞观',
      identities: ['少林寺方丈', '少林七十二绝技传人', '武林泰斗，德高望重', '禅武合一的修行者'],
      appearance: '慈眉善目，气度庄严。虽身披袈裟，却隐约可见其深厚的武功底蕴。',
      temperament: '性格慈悲为怀，武功高深。以禅入武，武学修为已臻化境。',
      historical_background: '少林寺方丈，少林七十二绝技传人。在武林中德高望重，被称为"武林泰斗"。',
      preferences: {
        liked_gifts: ['佛经', '茶', '药材'],
        disliked_actions: ['杀生', '争强好胜', '轻视佛法']
      }
    }
  };

  // ============================================
  // 地理数据库
  // ============================================
  const GEOGRAPHY_DATABASE = {
    changan: {
      name: '长安',
      type: '首都',
      description: '大唐帝都，万国来朝，世界最大城市',
      population: '100万+',
      districts: {
        皇城: '宫廷所在，政治中心',
        东市: '高端商业区，贵族消费',
        西市: '国际贸易区，胡商云集',
        平康坊: '青楼区，文人雅士聚集',
        慈恩寺: '佛教圣地，大雁塔所在'
      },
      opportunities: ['朝堂入仕', '商业贸易', '文人雅集', '江湖任务']
    },
    luoyang: {
      name: '洛阳',
      type: '东都',
      description: '武则天时期政治中心，牡丹之城',
      population: '50万+',
      opportunities: ['武周仕途', '佛教修行', '商业贸易']
    },
    yangzhou: {
      name: '扬州',
      type: '商业重镇',
      description: '江南繁华之地，盐商巨富云集',
      population: '30万+',
      features: ['运河枢纽', '盐业中心', '风月场所'],
      opportunities: ['商业经营', '盐业贸易', '风月雅事']
    },
    chengdu: {
      name: '成都',
      type: '西南重镇',
      description: '天府之国，蜀锦闻名天下',
      population: '20万+',
      features: ['蜀锦生产', '茶马古道起点', '道教圣地'],
      opportunities: ['蜀锦贸易', '道教修行', '西南探险']
    },
    anxi: {
      name: '安西都护府',
      type: '西域边疆',
      description: '丝绸之路要冲，东西方文化交汇',
      cities: ['龟兹', '于阗', '疏勒', '焉耆'],
      opportunities: ['丝路贸易', '军事征伐', '文化交流']
    }
  };

  // ============================================
  // 时代数据库
  // ============================================
  const ERA_DATABASE = {
    wude: {
      name: '武德年间',
      years: [618, 626],
      description: '李渊开国，统一全国，朝堂初定',
      major_events: ['唐朝建立', '玄武门之变'],
      atmosphere: '百废待兴，新旧交替'
    },
    zhenguan: {
      name: '贞观年间',
      years: [627, 649],
      description: '李世民治世，贞观之治，盛世初现',
      major_events: ['贞观之治', '征服高昌', '文成公主入藏'],
      atmosphere: '政治清明，经济繁荣'
    },
    yonghui: {
      name: '永徽年间',
      years: [650, 683],
      description: '李治与武则天时代，权力交替',
      major_events: ['武则天崛起', '征服高句丽'],
      atmosphere: '宫廷暗流，边疆扩张'
    },
    wuzhou: {
      name: '武周时期',
      years: [684, 705],
      description: '武则天称帝，改唐为周',
      major_events: ['武则天称帝', '酷吏政治', '神龙政变'],
      atmosphere: '政治高压，人才辈出'
    },
    kaiyuan: {
      name: '开元盛世',
      years: [713, 741],
      description: '李隆基治世，大唐极盛',
      major_events: ['开元盛世', '诗仙李白', '丝路繁荣'],
      atmosphere: '盛世繁华，文化鼎盛'
    },
    tianbao: {
      name: '天宝年间',
      years: [742, 756],
      description: '盛极而衰，安史之乱前夕',
      major_events: ['杨贵妃专宠', '安史之乱爆发'],
      atmosphere: '表面繁华，暗藏危机'
    }
  };

  // ============================================
  // MVU系统核心类
  // ============================================
  class TangCourtMVU {
    constructor() {
      this.variables = {};
      this.relationships = {};
      this.eventListeners = {};
      this.initializeVariables();
      console.log('唐朝开放世界MVU系统初始化完成');
    }

    initializeVariables() {
      for (const [key, config] of Object.entries(MVU_VARIABLES)) {
        this.variables[key] = config.default;
      }
    }

    getVariable(key) {
      return this.variables[key];
    }

    setVariable(key, value) {
      if (MVU_VARIABLES[key]) {
        const config = MVU_VARIABLES[key];
        if (config.type === 'number') {
          value = Math.max(config.min, Math.min(config.max, value));
        } else if (config.type === 'string' && config.enum) {
          if (!config.enum.includes(value)) {
            console.warn(`变量 ${key} 的值 ${value} 不在允许的枚举值中`);
            return false;
          }
        }
        this.variables[key] = value;
        this.emit('variableChanged', { key, value });
        return true;
      }
      console.warn(`变量 ${key} 不存在`);
      return false;
    }

    incrementVariable(key, amount) {
      const currentValue = this.getVariable(key);
      if (typeof currentValue === 'number') {
        return this.setVariable(key, currentValue + amount);
      }
      return false;
    }

    getRelationship(characterId) {
      if (!this.relationships[characterId]) {
        this.relationships[characterId] = {};
        for (const [key, config] of Object.entries(CHARACTER_RELATIONSHIP_TEMPLATE)) {
          this.relationships[characterId][key] = config.default;
        }
      }
      return this.relationships[characterId];
    }

    updateRelationship(characterId, updates) {
      const relationship = this.getRelationship(characterId);
      for (const [key, value] of Object.entries(updates)) {
        if (CHARACTER_RELATIONSHIP_TEMPLATE[key]) {
          const config = CHARACTER_RELATIONSHIP_TEMPLATE[key];
          if (config.type === 'number') {
            value = Math.max(config.min, Math.min(config.max, value));
          }
          relationship[key] = value;
        }
      }
      this.checkStageTransition(characterId);
      this.emit('relationshipUpdated', { characterId, relationship });
    }

    checkStageTransition(characterId) {
      const relationship = this.getRelationship(characterId);
      const currentStage = relationship.relationship_stage;
      
      for (let stage = 4; stage >= 1; stage--) {
        const stageName = `stage_${stage}`;
        const requirements = STORY_STAGES[stageName].requirements;
        
        if (relationship.affection >= requirements.affection.min &&
            relationship.affection <= requirements.affection.max &&
            relationship.trust >= requirements.trust.min &&
            relationship.trust <= requirements.trust.max &&
            relationship.interaction_count >= requirements.interaction_count.min &&
            relationship.interaction_count <= requirements.interaction_count.max) {
          if (currentStage !== stage) {
            relationship.relationship_stage = stage;
            this.emit('stageTransition', { characterId, oldStage: currentStage, newStage: stage });
            return { transitioned: true, newStage: stage };
          }
          return { transitioned: false, currentStage: stage };
        }
      }
      return { transitioned: false, currentStage: currentStage };
    }

    getCharacterInfo(characterId) {
      return CHARACTER_DATABASE[characterId] || null;
    }

    getGeographyInfo(locationId) {
      return GEOGRAPHY_DATABASE[locationId] || null;
    }

    getEraInfo(eraId) {
      return ERA_DATABASE[eraId] || null;
    }

    getStageInfo(stage) {
      return STORY_STAGES[`stage_${stage}`] || null;
    }

    performAction(characterId, action) {
      const relationship = this.getRelationship(characterId);
      const stageInfo = this.getStageInfo(relationship.relationship_stage);
      
      if (stageInfo && stageInfo.available_actions.includes(action)) {
        relationship.interaction_count++;
        relationship.last_interaction = new Date().toISOString().split('T')[0];
        this.emit('actionPerformed', { characterId, action, relationship });
        return { success: true, message: `成功执行动作: ${action}` };
      }
      return { success: false, message: `当前阶段无法执行动作: ${action}` };
    }

    advanceTime(days = 1) {
      let currentDay = this.variables.world_day;
      let currentMonth = this.variables.world_month;
      let currentYear = this.variables.world_year;
      
      currentDay += days;
      
      const daysInMonth = 30;
      if (currentDay > daysInMonth) {
        currentDay -= daysInMonth;
        currentMonth++;
      }
      
      if (currentMonth > 12) {
        currentMonth = 1;
        currentYear++;
      }
      
      if (currentYear > 755) {
        currentYear = 755;
      }
      
      this.setVariable('world_day', currentDay);
      this.setVariable('world_month', currentMonth);
      this.setVariable('world_year', currentYear);
      
      this.updateEra();
      this.updateSeason();
      
      this.emit('timeAdvanced', { year: currentYear, month: currentMonth, day: currentDay });
    }

    updateEra() {
      const year = this.variables.world_year;
      let era = '武德';
      
      if (year >= 742) era = '天宝';
      else if (year >= 713) era = '开元';
      else if (year >= 684) era = '武周';
      else if (year >= 650) era = '永徽';
      else if (year >= 627) era = '贞观';
      
      if (this.variables.world_era !== era) {
        this.setVariable('world_era', era);
        this.emit('eraChanged', { era });
      }
    }

    updateSeason() {
      const month = this.variables.world_month;
      let season = '春';
      
      if (month >= 1 && month <= 3) season = '春';
      else if (month >= 4 && month <= 6) season = '夏';
      else if (month >= 7 && month <= 9) season = '秋';
      else season = '冬';
      
      this.setVariable('world_season', season);
    }

    on(event, callback) {
      if (!this.eventListeners[event]) {
        this.eventListeners[event] = [];
      }
      this.eventListeners[event].push(callback);
    }

    emit(event, data) {
      if (this.eventListeners[event]) {
        this.eventListeners[event].forEach(callback => callback(data));
      }
    }

    exportVariables() {
      return JSON.stringify({
        variables: this.variables,
        relationships: this.relationships
      }, null, 2);
    }

    importVariables(jsonString) {
      try {
        const data = JSON.parse(jsonString);
        this.variables = data.variables || {};
        this.relationships = data.relationships || {};
        this.emit('variablesImported', data);
        return true;
      } catch (error) {
        console.error('导入变量失败:', error);
        return false;
      }
    }

    getStatus() {
      return {
        era: this.variables.world_era,
        year: this.variables.world_year,
        month: this.variables.world_month,
        day: this.variables.world_day,
        season: this.variables.world_season,
        location: this.variables.world_location_region,
        protagonist: {
          name: this.variables.protagonist_name,
          age: this.variables.protagonist_age,
          identity: this.variables.protagonist_identity,
          reputation: this.variables.protagonist_reputation,
          wealth: this.variables.protagonist_wealth
        },
        relationshipsCount: Object.keys(this.relationships).length
      };
    }
  }

  // ============================================
  // SillyTavern集成
  // ============================================
  class SillyTavernIntegration {
    constructor(mvuSystem) {
      this.mvu = mvuSystem;
      this.setupSillyTavernHooks();
    }

    setupSillyTavernHooks() {
      if (typeof window.SillyTavern !== 'undefined') {
        console.log('检测到SillyTavern环境，正在集成...');
        this.integrateWithSillyTavern();
      } else {
        console.log('未检测到SillyTavern环境，使用独立模式');
      }
    }

    integrateWithSillyTavern() {
      const self = this;
      
      window.TangCourtMVU = {
        getVariable: (key) => self.mvu.getVariable(key),
        setVariable: (key, value) => self.mvu.setVariable(key, value),
        getRelationship: (characterId) => self.mvu.getRelationship(characterId),
        updateRelationship: (characterId, updates) => self.mvu.updateRelationship(characterId, updates),
        performAction: (characterId, action) => self.mvu.performAction(characterId, action),
        getCharacterInfo: (characterId) => self.mvu.getCharacterInfo(characterId),
        getGeographyInfo: (locationId) => self.mvu.getGeographyInfo(locationId),
        getEraInfo: (eraId) => self.mvu.getEraInfo(eraId),
        advanceTime: (days) => self.mvu.advanceTime(days),
        getStatus: () => self.mvu.getStatus(),
        exportVariables: () => self.mvu.exportVariables(),
        importVariables: (jsonString) => self.mvu.importVariables(jsonString)
      };
    }
  }

  // ============================================
  // 初始化系统
  // ============================================
  const mvuSystem = new TangCourtMVU();
  const sillyTavernIntegration = new SillyTavernIntegration(mvuSystem);

  window.TangCourtMVU = {
    system: mvuSystem,
    variables: MVU_VARIABLES,
    stages: STORY_STAGES,
    characters: CHARACTER_DATABASE,
    geography: GEOGRAPHY_DATABASE,
    eras: ERA_DATABASE,
    updateRules: UPDATE_RULES
  };

  console.log('唐朝开放世界MVU扩展加载完成！');
  console.log('使用 window.TangCourtMVU 访问系统');
  console.log('包含角色:', Object.keys(CHARACTER_DATABASE).length, '个');
  console.log('包含地点:', Object.keys(GEOGRAPHY_DATABASE).length, '个');
  console.log('包含时代:', Object.keys(ERA_DATABASE).length, '个');

})(window);
