/**
 * 角色元数据与模型资源名工具（Poppin'Party 版）。
 *
 * 模型目录为 `<standalone编号>_<资源id>`（如 `014_casual-2023`），编号来自
 * 独立版 BANDORI 看板娘的 STANDALONE_CHARS（kasumi=014 / tae=038 / rimi=031 /
 * saaya=034 / arisa=003）。换装面板的显示名由 textureLabel() 把资源段名翻译成
 * 中文（如 `014_live_event_41_sr` → 「活动41 SR」），目录名本身保持不变。
 */

export const CHARACTERS = [
  { id: "kasumi", num: 14, name: "戸山 香澄", en: "Kasumi", color: "#e8485d" },
  { id: "tae",    num: 38, name: "花園 たえ", en: "Tae",    color: "#4caf50" },
  { id: "rimi",   num: 31, name: "牛込 りみ", en: "Rimi",   color: "#5b9bd5" },
  { id: "saaya",  num: 34, name: "山吹 沙綾", en: "Saaya",  color: "#f59e0b" },
  { id: "arisa",  num: 3,  name: "市ヶ谷 有咲", en: "Arisa", color: "#9b59b6" },
];

/**
 * 资源段名（去掉 3 位编号前缀后）→ 中文显示名规则，按顺序匹配，命中即止。
 * `$1` 等为捕获组引用；函数形式可做数值化等处理。
 */
const LABEL_RULES = [
  // 常服 / 校服 / 泳装 / 浴衣（含年份变体）
  [/^casual_summer-2023$/, "夏常服2023"],
  [/^casual_winter-2023$/, "冬常服2023"],
  [/^casual-2023$/, "常服2023"],
  [/^casual_summer$/, "夏常服"],
  [/^casual_winter$/, "冬常服"],
  [/^casual$/, "常服"],
  [/^school_summer-2023$/, "校服夏2023"],
  [/^school_winter-2023$/, "校服冬2023"],
  [/^school_summer$/, "校服夏"],
  [/^school_winter_v3$/, "校服冬V3"],
  [/^school_winter$/, "校服冬"],
  [/^swimsuit-2023$/, "泳装2023"],
  [/^swimsuit$/, "泳装"],
  [/^yukata$/, "浴衣"],
  [/^(\d{4})_furisode$/, "振袖$1"],
  // 生活 / 主题
  [/^arbeit$/, "打工"],
  [/^pajamas-(\d{4})$/, "睡衣$1"],
  [/^pajamas$/, "睡衣"],
  [/^chapter0_pajamas$/, "序章睡衣"],
  [/^chapter0_live$/, "序章演出"],
  [/^gym_clothes$/, "体操服"],
  [/^cafe$/, "咖啡厅"],
  [/^halloween$/, "万圣节"],
  [/^christmas_01$/, "圣诞"],
  [/^birthday_(\d{4})$/, "生日$1"],
  [/^birthday$/, "生日"],
  // 庆典 / 联动
  [/^dream_festival_(\d+)(_ur)?$/, "梦祭$1"],
  [/^dream_festival$/, "梦祭"],
  [/^collabo_d_1_ur$/, "联动D1"],
  [/^4th_general_election_r$/, "第4届总选举"],
  [/^2018_dog$/, "戌年2018"],
  [/^2021af$/, "周年祭2021"],
  [/^girlparty2019$/, "少女派对2019"],
  [/^garupa_t$/, "ガルパT恤"],
  [/^kirameki_festival$/, "闪耀祭"],
  [/^precious_summer$/, "珍贵夏日"],
  [/^special_5th$/, "5周年特别"],
  [/^popipa_fes$/, "PoPiPa祭"],
  [/^delta$/, "Delta"],
  [/^miku_nocturnality$/, "初音联动·夜行性"],
  [/^miku_romecin$/, "初音联动·Romecin"],
  // 演出 / 活动
  [/^live_default$/, "默认演出"],
  [/^live_r_(\d{4})$/, "演出R$1"],
  [/^live_r$/, "演出R"],
  [/^live_sr_(\d+)$/, "演出SR$1"],
  [/^live_ssr_(\d+)$/, "演出SSR$1"],
  [/^live_event_(\d+)_([a-z]+)$/, (m, n, r) => `活动${+n} ${r.toUpperCase()}`],
  [/^live_event_(\d+)$/, (m, n) => `活动${+n}`],
  [/^event_(\d+)_story_(\d+)$/, "活动$1剧情$2"],
];

/**
 * 从模型目录名中提取展示标签（中文）。
 * `014_live_event_41_sr` → 「活动41 SR」；未命中规则的段名回退原始段名。
 */
export function textureLabel(dir) {
  const seg = dir.split("/").pop();
  const body = seg.replace(/^\d{3}_/, "");
  for (const [re, out] of LABEL_RULES) {
    if (re.test(body)) return body.replace(re, out);
  }
  return seg;
}

/** 去掉目录名末尾的中文标签，得到原始资源 id（本版本段名无中文标签，原样返回）。 */
export function stripTextureLabel(dir) {
  return dir.replace(/_\p{Script=Han}[\p{Script=Han}0-9A-Za-z]*$/u, "");
}

/** 由模型目录名得到平铺在 `assets/` 下的资源文件名。 */
export function textureAssetId(dir) {
  return stripTextureLabel(dir);
}

/**
 * 该换装是否有缩略图资源。本版本无逐套缩略图，一律返回 false（面板显示文字标签）。
 */
export function hasTextureAsset(dir) {
  return false;
}
