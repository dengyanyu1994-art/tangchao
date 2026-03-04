// 唐朝宫廷MVU系统 - SillyTavern扩展
// 版本: 2.0.0
// 作者: 唐朝宫廷项目组

(function(window) {
  'use strict';

  console.log('唐朝宫廷MVU扩展正在加载...');

  // ============================================
  // MVU变量定义
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
    protagonist_identity: { name: '主角_身份', type: 'string', default: '平民', enum: ['平民', '士族', '皇室', '官员', '将军', '商人', '文人'] },
    
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
    story_chapter: { name: '剧情_章节', type: 'string', default: '初入宫廷' },
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
  // 角色数据库
  // ============================================
  const CHARACTER_DATABASE = {
    princess_changle: {
      name: '长乐公主',
      full_name: '李丽质',
      type: '公主',
      age: 22,
      identities: ['长乐公主，名李丽质，唐太宗李世民与长孙皇后嫡长女', '李世民最宠爱的女儿，万千宠爱于一身', '长孙冲之妻，长孙无忌长子之媳'],
      appearance: '容貌秀丽，气质温婉，举止间流露出皇室公主的高贵与优雅。她的美貌如同春日里的桃花，清新脱俗。',
      temperament: '性情温和，聪慧过人，深受父皇李世民的宠爱，是宫廷中备受尊敬的公主。',
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
      identities: ['平阳公主，唐朝开国公主，李渊之女，窦皇后所生', '中国古代第一位统领千军万马的女性，巾帼英雄', '柴绍之妻，凌烟阁二十四功臣之一'],
      appearance: '英姿飒爽，眉宇间透露出军人的坚毅与果敢。作为中国历史上第一位统领千军万马的女将军，她有着与生俱来的统帅气质。',
      temperament: '性格刚毅果决，行事雷厉风行，在战场上冷静沉着，决策果断。',
      preferences: {
        liked_gifts: ['兵器', '兵法书籍', '战马'],
        disliked_actions: ['软弱表现', '优柔寡断', '轻视女性']
      }
    },
    empress_zhangsun: {
      name: '长孙皇后',
      full_name: '长孙氏',
      type: '皇后',
      age: 36,
      identities: ['长孙皇后，文德皇后，李世民正妻', '长孙无忌妹，13岁嫁李世民', '贞观年间为皇后，母仪天下', '636年早逝，李承乾李泰母亲'],
      appearance: '气质高贵典雅，举止端庄大方，拥有皇后特有的雍容华贵。她的美貌如出水芙蓉，令人过目难忘。',
      temperament: '性情温和，聪慧贤淑，母仪天下，深受李世民敬重。',
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
      identities: ['杨贵妃，李隆基宠妃，杨玉环', '中国古代四大美女之一', '737年入宫为寿王妃', '745年被李隆基册封为贵妃', '极受宠爱，756年安史之乱爆发', '随李隆基逃往蜀地，在马嵬坡被士兵逼死'],
      appearance: '美艳动人，气质妖娆，拥有中国古代四大美女之一的绝世容颜。她的美貌如盛开的牡丹，令人心醉神迷。',
      temperament: '性格热情奔放，善解人意，精通音律舞蹈，深受李隆基宠爱。',
      preferences: {
        liked_gifts: ['珠宝首饰', '华美服饰', '珍稀香料', '乐器'],
        disliked_actions: ['冷落', '批评', '政治讨论']
      }
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
      console.log('唐朝宫廷MVU系统初始化完成');
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
        getStageInfo: (stage) => self.mvu.getStageInfo(stage),
        exportVariables: () => self.mvu.exportVariables(),
        importVariables: (jsonString) => self.mvu.importVariables(jsonString)
      };

      console.log('唐朝宫廷MVU系统已集成到SillyTavern');
    }
  }

  // ============================================
  // 初始化系统
  // ============================================
  const mvuSystem = new TangCourtMVU();
  const stIntegration = new SillyTavernIntegration(mvuSystem);

  // 导出到全局
  window.TangCourtMVU = {
    system: mvuSystem,
    variables: MVU_VARIABLES,
    stages: STORY_STAGES,
    characters: CHARACTER_DATABASE,
    updateRules: UPDATE_RULES
  };

  console.log('唐朝宫廷MVU扩展加载完成！');
  console.log('使用 window.TangCourtMVU 访问系统');

})(window);
