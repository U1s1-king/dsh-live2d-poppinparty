window.__ModuleLoader__.load({
	id: "dsh-live2d-poppinparty",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		//#region src/client/waifu/config.js
		function readStoredId(key) {
			const value = parseInt(localStorage.getItem(key), 10);
			return Number.isNaN(value) || value < 0 ? null : value;
		}
		let modelId = readStoredId("poppinparty-modelId");
		let modelTexturesId = readStoredId("poppinparty-modelTexturesId");
		let config = {};
		let messageArray = [];
		function getModelId() {
			if (modelId === null || modelId === void 0) resetModelState();
			return modelId;
		}
		function setModelId(newModelId) {
			modelId = newModelId;
			localStorage.setItem("poppinparty-modelId", newModelId.toString());
		}
		function getModelTexturesId() {
			if (modelTexturesId === null || modelTexturesId === void 0) resetModelState();
			return modelTexturesId;
		}
		function setModelTexturesId(newModelTexturesId) {
			modelTexturesId = newModelTexturesId;
			localStorage.setItem("poppinparty-modelTexturesId", newModelTexturesId.toString());
		}
		function resetModelState() {
			modelId = 0;
			modelTexturesId = 0;
			localStorage.setItem("poppinparty-modelId", "0");
			localStorage.setItem("poppinparty-modelTexturesId", "0");
		}
		function getConfig() {
			return config;
		}
		function setConfig(newConfig) {
			config = newConfig;
		}
		function getMessageArray() {
			return messageArray;
		}
		function updateMessageArray(result) {
			messageArray = result.message.default[getModelId()];
			result.seasons.forEach(({ date, text }) => {
				const now = /* @__PURE__ */ new Date(), nowMonth = now.getMonth() + 1, nowDate = now.getDate(), after = date.split("-")[0], afterMonth = parseInt(after.split("/")[0]), afterDate = parseInt(after.split("/")[1]), before = date.split("-")[1] || after, beforeMonth = parseInt(before.split("/")[0]), beforeDate = parseInt(before.split("/")[1]);
				const isCrossYear = afterMonth > beforeMonth;
				let isInRange = false;
				if (isCrossYear) isInRange = nowMonth > afterMonth || nowMonth === afterMonth && nowDate >= afterDate || nowMonth < beforeMonth || nowMonth === beforeMonth && nowDate <= beforeDate;
				else isInRange = (nowMonth > afterMonth || nowMonth === afterMonth && nowDate >= afterDate) && (nowMonth < beforeMonth || nowMonth === beforeMonth && nowDate <= beforeDate);
				if (isInRange) for (let t of text[getModelId()]) messageArray.push(t);
			});
			result.time.forEach(({ hour, text }) => {
				const now = /* @__PURE__ */ new Date(), after = hour.split("-")[0], before = hour.split("-")[1] || after;
				if (after <= now.getHours() && now.getHours() <= before) for (let t of text[getModelId()]) messageArray.push(t);
			});
		}
		//#endregion
		//#region src/client/waifu/utils.js
		function randomSelection(obj) {
			if (Array.isArray(obj)) return obj[Math.floor(Math.random() * obj.length)];
			else if (typeof obj === "number") return Math.floor(Math.random() * obj);
			else return obj;
		}
		//#endregion
		//#region src/client/waifu/message.js
		let messageTimer;
		function showMessage(model, text, timeout, priority) {
			if (!text) return;
			const storedPriority = parseInt(sessionStorage.getItem("poppinparty-waifu-text"), 10);
			if (!Number.isNaN(storedPriority) && storedPriority > priority) return;
			if (messageTimer) {
				clearTimeout(messageTimer);
				messageTimer = null;
			}
			text = randomSelection(text);
			sessionStorage.setItem("poppinparty-waifu-text", priority);
			const tips = document.getElementById("waifu-tips-poppinparty");
			if (tips) {
				tips.innerHTML = text.text || "";
				tips.classList.add("waifu-tips-active");
			}
			messageTimer = setTimeout(() => {
				sessionStorage.removeItem("poppinparty-waifu-text");
				if (tips) tips.classList.remove("waifu-tips-active");
			}, timeout);
			if (model && model.model) {
				if (text.motion) try {
					model.model.motion(text.motion);
				} catch (error) {}
				if (text.expression) try {
					model.model.expression(text.expression);
				} catch (error) {}
			}
		}
		/** 清理未完成的气泡定时器（插件卸载 / HMR 重建时调用，防止残留 setTimeout）。 */
		function clearMessageTimer() {
			if (messageTimer) {
				clearTimeout(messageTimer);
				messageTimer = null;
			}
		}
		//#endregion
		//#region src/client/waifu/modelList.js
		const modelList = [
			[
				"014_casual-2023",
				"014_2018_dog",
				"014_2019_furisode",
				"014_2021af",
				"014_2024_furisode",
				"014_arbeit",
				"014_birthday_2021",
				"014_birthday_2022",
				"014_cafe",
				"014_casual",
				"014_casual_summer",
				"014_casual_summer-2023",
				"014_casual_winter",
				"014_casual_winter-2023",
				"014_chapter0_live",
				"014_chapter0_pajamas",
				"014_christmas_01",
				"014_collabo_d_1_ur",
				"014_delta",
				"014_dream_festival",
				"014_dream_festival_2",
				"014_dream_festival_3_ur",
				"014_dream_festival_4_ur",
				"014_event_102_story_01",
				"014_event_119_story_01",
				"014_event_119_story_02",
				"014_event_124_story_01",
				"014_event_128_story_01",
				"014_event_147_story_01",
				"014_event_160_story_01",
				"014_event_216_story_01",
				"014_event_312_story_02",
				"014_event_44_story_01",
				"014_event_65_story_01",
				"014_event_80_story_01",
				"014_garupa_t",
				"014_girlparty2019",
				"014_gym_clothes",
				"014_kirameki_festival",
				"014_live_default",
				"014_live_event_01_sr",
				"014_live_event_04_r",
				"014_live_event_05_ssr",
				"014_live_event_102_ssr",
				"014_live_event_113_ssr",
				"014_live_event_119_ssr",
				"014_live_event_124_sr",
				"014_live_event_128_ssr",
				"014_live_event_130_r",
				"014_live_event_140_sr",
				"014_live_event_147_ssr",
				"014_live_event_15_r",
				"014_live_event_160_ssr",
				"014_live_event_168_ssr",
				"014_live_event_173_r",
				"014_live_event_177_r",
				"014_live_event_183_sr",
				"014_live_event_192_sr",
				"014_live_event_201_ssr",
				"014_live_event_210",
				"014_live_event_213",
				"014_live_event_217_ur",
				"014_live_event_220_sr",
				"014_live_event_228_ur",
				"014_live_event_233_r",
				"014_live_event_241_ur",
				"014_live_event_24_sr",
				"014_live_event_254_ssr",
				"014_live_event_261_sr",
				"014_live_event_26_r",
				"014_live_event_270_ur",
				"014_live_event_271_sr",
				"014_live_event_276_ur",
				"014_live_event_281_ssr",
				"014_live_event_287_r",
				"014_live_event_295_ur",
				"014_live_event_299_sr",
				"014_live_event_309_ssr",
				"014_live_event_30_ssr",
				"014_live_event_312_ur",
				"014_live_event_321_ur",
				"014_live_event_332_r",
				"014_live_event_335_ur",
				"014_live_event_36_sr",
				"014_live_event_41_ssr",
				"014_live_event_44_sr",
				"014_live_event_47_ssr",
				"014_live_event_53_sr",
				"014_live_event_61_sr",
				"014_live_event_65_ssr",
				"014_live_event_72_ssr",
				"014_live_event_80_ssr",
				"014_live_event_82_sr",
				"014_live_event_83_r",
				"014_live_event_84_sr",
				"014_live_event_92_sr",
				"014_live_r_2018",
				"014_live_r_2019",
				"014_live_r_2020",
				"014_live_r_2021",
				"014_live_r_2022",
				"014_live_r_2023",
				"014_live_sr_01",
				"014_live_ssr_01",
				"014_miku_nocturnality",
				"014_miku_romecin",
				"014_pajamas-2023",
				"014_popipa_fes",
				"014_precious_summer",
				"014_school_summer",
				"014_school_summer-2023",
				"014_school_winter",
				"014_school_winter-2023",
				"014_school_winter_v3",
				"014_special_5th",
				"014_swimsuit-2023",
				"014_yukata"
			],
			[
				"038_casual-2023",
				"038_2018_dog",
				"038_birthday_2021",
				"038_birthday_2022",
				"038_cafe",
				"038_casual",
				"038_casual_summer",
				"038_casual_summer-2023",
				"038_casual_winter",
				"038_casual_winter-2023",
				"038_chapter0_live",
				"038_chapter0_pajamas",
				"038_christmas_01",
				"038_delta",
				"038_dream_festival",
				"038_dream_festival_2",
				"038_dream_festival_3_ur",
				"038_dream_festival_4_ur",
				"038_kirameki_festival",
				"038_live_default",
				"038_live_event_04_ssr",
				"038_live_event_07_sr",
				"038_live_event_102_sr",
				"038_live_event_119_sr",
				"038_live_event_123_r",
				"038_live_event_124_ssr",
				"038_live_event_130_r",
				"038_live_event_140_ssr",
				"038_live_event_144_sr",
				"038_live_event_147_sr",
				"038_live_event_15_sr",
				"038_live_event_160_r",
				"038_live_event_166_ssr",
				"038_live_event_168_sr",
				"038_live_event_183_ssr",
				"038_live_event_192",
				"038_live_event_201_ssr",
				"038_live_event_209_ssr",
				"038_live_event_210",
				"038_live_event_220_ur",
				"038_live_event_22_sr",
				"038_live_event_233_ssr",
				"038_live_event_241_ur",
				"038_live_event_253_ur",
				"038_live_event_254_sr",
				"038_live_event_261_ur",
				"038_live_event_263_r",
				"038_live_event_26_r",
				"038_live_event_270_r",
				"038_live_event_271_ur",
				"038_live_event_276_sr",
				"038_live_event_287_ur",
				"038_live_event_295_r",
				"038_live_event_309_ur",
				"038_live_event_30_ssr",
				"038_live_event_317_r",
				"038_live_event_321_ssr",
				"038_live_event_332_ur",
				"038_live_event_41_sr",
				"038_live_event_50_sr",
				"038_live_event_53_ssr",
				"038_live_event_61_r",
				"038_live_event_65_sr",
				"038_live_event_71_ssr",
				"038_live_event_72_r",
				"038_live_event_73_sr",
				"038_live_event_83_ssr",
				"038_live_event_92_r",
				"038_live_event_93_sr",
				"038_live_event_99_ssr",
				"038_live_r_2018",
				"038_live_r_2019",
				"038_live_r_2020",
				"038_live_r_2022",
				"038_live_r_2023",
				"038_live_sr_01",
				"038_live_ssr_01",
				"038_miku_nocturnality",
				"038_miku_romecin",
				"038_precious_summer",
				"038_school_summer",
				"038_school_summer-2023",
				"038_school_winter",
				"038_school_winter-2023",
				"038_swimsuit-2023",
				"038_yukata"
			],
			[
				"031_casual-2023",
				"031_2018_dog",
				"031_birthday_2021",
				"031_birthday_2022",
				"031_cafe",
				"031_casual",
				"031_casual_summer",
				"031_casual_summer-2023",
				"031_casual_winter",
				"031_casual_winter-2023",
				"031_chapter0_live",
				"031_chapter0_pajamas",
				"031_christmas_01",
				"031_delta",
				"031_dream_festival",
				"031_dream_festival_2",
				"031_dream_festival_3_ur",
				"031_dream_festival_4_ur",
				"031_halloween",
				"031_live_default",
				"031_live_event_04_sr",
				"031_live_event_09_ssr",
				"031_live_event_102_ssr",
				"031_live_event_109_ssr",
				"031_live_event_119_sr",
				"031_live_event_130_ssr",
				"031_live_event_138_sr",
				"031_live_event_140_ssr",
				"031_live_event_147_sr",
				"031_live_event_155_r",
				"031_live_event_15_r",
				"031_live_event_160_sr",
				"031_live_event_168_ssr",
				"031_live_event_183_r",
				"031_live_event_192_ssr",
				"031_live_event_201_sr",
				"031_live_event_206_r",
				"031_live_event_20_r",
				"031_live_event_210_ssr",
				"031_live_event_220_r",
				"031_live_event_227_ssr",
				"031_live_event_233_ur",
				"031_live_event_241_r",
				"031_live_event_245_r",
				"031_live_event_254_ur",
				"031_live_event_261_r",
				"031_live_event_26_sr",
				"031_live_event_270_ssr",
				"031_live_event_274_sr",
				"031_live_event_276_ur",
				"031_live_event_287_ssr",
				"031_live_event_289_sr",
				"031_live_event_295_sr",
				"031_live_event_309_ur",
				"031_live_event_30_sr",
				"031_live_event_315_ssr",
				"031_live_event_321_r",
				"031_live_event_332_sr",
				"031_live_event_41_ssr",
				"031_live_event_53_sr",
				"031_live_event_58_r",
				"031_live_event_61_ssr",
				"031_live_event_63_r",
				"031_live_event_72_ssr",
				"031_live_event_82_ssr",
				"031_live_event_83_sr",
				"031_live_event_84_r",
				"031_live_event_87_sr",
				"031_live_event_92_sr",
				"031_live_event_95_ssr",
				"031_live_r_2018",
				"031_live_r_2019",
				"031_live_r_2020",
				"031_live_r_2022",
				"031_live_r_2023",
				"031_live_sr_01",
				"031_live_ssr_01",
				"031_miku_nocturnality",
				"031_miku_romecin",
				"031_precious_summer",
				"031_school_summer",
				"031_school_summer-2023",
				"031_school_winter",
				"031_school_winter-2023",
				"031_yukata"
			],
			[
				"034_casual-2023",
				"034_2018_dog",
				"034_4th_general_election_r",
				"034_arbeit",
				"034_birthday_2021",
				"034_birthday_2022",
				"034_cafe",
				"034_casual",
				"034_casual_summer",
				"034_casual_summer-2023",
				"034_casual_winter",
				"034_casual_winter-2023",
				"034_chapter0_live",
				"034_chapter0_pajamas",
				"034_christmas_01",
				"034_delta",
				"034_dream_festival",
				"034_dream_festival_2",
				"034_dream_festival_3_ur",
				"034_dream_festival_4_ur",
				"034_live_default",
				"034_live_event_04_sr",
				"034_live_event_09_sr",
				"034_live_event_102_sr",
				"034_live_event_108_ssr",
				"034_live_event_118_ssr",
				"034_live_event_119_sr",
				"034_live_event_12_r",
				"034_live_event_130_ssr",
				"034_live_event_140_r",
				"034_live_event_145_ssr",
				"034_live_event_147_sr",
				"034_live_event_155_r",
				"034_live_event_15_ssr",
				"034_live_event_160_ssr",
				"034_live_event_168_sr",
				"034_live_event_171_sr",
				"034_live_event_183_ssr",
				"034_live_event_192",
				"034_live_event_201",
				"034_live_event_210_ssr",
				"034_live_event_220_ssr",
				"034_live_event_228_ssr",
				"034_live_event_233_ur",
				"034_live_event_236_r",
				"034_live_event_241_ssr",
				"034_live_event_254_r",
				"034_live_event_261_ur",
				"034_live_event_26_ssr",
				"034_live_event_270_sr",
				"034_live_event_276_r",
				"034_live_event_281_ur",
				"034_live_event_287_sr",
				"034_live_event_295_ur",
				"034_live_event_296_sr",
				"034_live_event_309_r",
				"034_live_event_30_sr",
				"034_live_event_321_sr",
				"034_live_event_325_ur",
				"034_live_event_332_ur",
				"034_live_event_41_sr",
				"034_live_event_47_sr",
				"034_live_event_53_ssr",
				"034_live_event_61_ssr",
				"034_live_event_68_r",
				"034_live_event_69_ssr",
				"034_live_event_72_sr",
				"034_live_event_83_sr",
				"034_live_event_87_sr",
				"034_live_event_92_ssr",
				"034_live_r_2018",
				"034_live_r_2019",
				"034_live_r_2020",
				"034_live_r_2022",
				"034_live_r_2023",
				"034_live_sr_01",
				"034_live_ssr_01",
				"034_miku_nocturnality",
				"034_miku_romecin",
				"034_pajamas-2023",
				"034_precious_summer",
				"034_school_summer",
				"034_school_summer-2023",
				"034_school_winter",
				"034_school_winter-2023",
				"034_yukata"
			],
			[
				"003_casual-2023",
				"003_2018_dog",
				"003_birthday_2021",
				"003_birthday_2022",
				"003_cafe",
				"003_casual",
				"003_casual_summer",
				"003_casual_summer-2023",
				"003_casual_winter",
				"003_casual_winter-2023",
				"003_chapter0_live",
				"003_chapter0_pajamas",
				"003_christmas_01",
				"003_delta",
				"003_dream_festival",
				"003_dream_festival_2",
				"003_dream_festival_3_ur",
				"003_dream_festival_4_ur",
				"003_kirameki_festival",
				"003_live_default",
				"003_live_event_01_ssr",
				"003_live_event_04_r",
				"003_live_event_07_sr",
				"003_live_event_101_sr",
				"003_live_event_102_r",
				"003_live_event_106_ssr",
				"003_live_event_114_r",
				"003_live_event_119_ssr",
				"003_live_event_130_sr",
				"003_live_event_137_ssr",
				"003_live_event_140_sr",
				"003_live_event_147_ssr",
				"003_live_event_15_sr",
				"003_live_event_160_sr",
				"003_live_event_166_sr",
				"003_live_event_168_r",
				"003_live_event_171_sr",
				"003_live_event_180_ssr",
				"003_live_event_183_sr",
				"003_live_event_192_ssr",
				"003_live_event_201",
				"003_live_event_210_sr",
				"003_live_event_213_ssr",
				"003_live_event_220_ur",
				"003_live_event_224_ssr",
				"003_live_event_228_r",
				"003_live_event_22_r",
				"003_live_event_233_sr",
				"003_live_event_238_ssr",
				"003_live_event_241_sr",
				"003_live_event_248_r",
				"003_live_event_24_r",
				"003_live_event_254_ur",
				"003_live_event_261_ssr",
				"003_live_event_262_r",
				"003_live_event_26_sr",
				"003_live_event_270_ur",
				"003_live_event_276_ssr",
				"003_live_event_287_ur",
				"003_live_event_295_ssr",
				"003_live_event_299_ur",
				"003_live_event_309_sr",
				"003_live_event_30_r",
				"003_live_event_312_ssr",
				"003_live_event_321_ur",
				"003_live_event_32_ssr",
				"003_live_event_332_ssr",
				"003_live_event_41_sr",
				"003_live_event_47_sr",
				"003_live_event_50_ssr",
				"003_live_event_53_r",
				"003_live_event_58_ssr",
				"003_live_event_61_sr",
				"003_live_event_72_sr",
				"003_live_event_76_ssr",
				"003_live_event_80_sr",
				"003_live_event_83_ssr",
				"003_live_event_92_ssr",
				"003_live_r_2018",
				"003_live_r_2019",
				"003_live_r_2020",
				"003_live_r_2022",
				"003_live_r_2023",
				"003_live_sr_01",
				"003_live_ssr_01",
				"003_miku_nocturnality",
				"003_miku_romecin",
				"003_pajamas-2023",
				"003_precious_summer",
				"003_school_summer",
				"003_school_summer-2023",
				"003_school_winter",
				"003_school_winter-2023",
				"003_swimsuit-2023",
				"003_yukata"
			]
		];
		//#endregion
		//#region src/client/waifu/tips.js
		/**
		* Poppin'Party 台词包（按 5 角色人设撰写；motion 名取自 Poppin'Party 模型实际动作集）。
		* 角色顺序：kasumi(0) / tae(1) / rimi(2) / saaya(3) / arisa(4)。
		*/
		const tips = {
			"message": {
				"default": [
					[
						{
							"text": "キラキラドキドキ！今天也要闪闪发光哦！",
							"motion": "smile01"
						},
						{
							"text": "星星真漂亮啊……就像大家的梦想一样闪闪发光。",
							"motion": "smile02"
						},
						{
							"text": "ねえねえ！要不要一起去看星星？",
							"motion": "smile03"
						},
						{
							"text": "和大家一起演奏的时候，我感觉最幸福！",
							"motion": "kime01"
						},
						{
							"text": "今天的练习也要全力以赴！",
							"motion": "kime01"
						},
						{
							"text": "啊，发现了可爱的东西！",
							"motion": "surprised01"
						},
						{
							"text": "就算失败了，我也会再站起来的！",
							"motion": "smile04"
						},
						{
							"text": "世界上到处都是闪闪发光的东西呢！",
							"motion": "smile01"
						},
						{
							"text": "山吹面包今天也超级好吃！",
							"motion": "smile02"
						},
						{
							"text": "我的梦想，是和大家一起闪耀到最后一刻！",
							"motion": "kime01"
						},
						{
							"text": "哼哼，今天的我状态绝佳！",
							"motion": "wink01"
						},
						{
							"text": "星星们，你们好呀！",
							"motion": "nf01"
						}
					],
					[
						{
							"text": "啊……刚才好像有猫经过。",
							"motion": "smile01"
						},
						{
							"text": "宇宙……真广阔呢。",
							"motion": "smile02"
						},
						{
							"text": "兔子，很可爱。",
							"motion": "smile03"
						},
						{
							"text": "星星为什么会发光呢……想不明白。",
							"motion": "eeto01"
						},
						{
							"text": "今天的练习……手感不错。",
							"motion": "smile04"
						},
						{
							"text": "啊，有鸟飞过去了。",
							"motion": "surprised01"
						},
						{
							"text": "我家的兔子，今天也很精神。",
							"motion": "smile01"
						},
						{
							"text": "猫为什么喜欢鱼呢……",
							"motion": "eeto01"
						},
						{
							"text": "大概……这就是kirakira吧。",
							"motion": "nod01"
						},
						{
							"text": "和大家一起演奏，很开心。",
							"motion": "smile05"
						},
						{
							"text": "想吃山吹家的面包了。",
							"motion": "gattsu01"
						},
						{
							"text": "我也想像星星一样，一直在天上。",
							"motion": "smile02"
						}
					],
					[
						{
							"text": "呜……那个……今天也请多关照……",
							"motion": "shame01"
						},
						{
							"text": "能和大家一起演奏……我很开心……",
							"motion": "smile01"
						},
						{
							"text": "甜的东西……最喜欢了……",
							"motion": "smile02"
						},
						{
							"text": "呜哇……吓了一跳……",
							"motion": "surprised01"
						},
						{
							"text": "我……会加油的……",
							"motion": "kime01"
						},
						{
							"text": "和大家在一起……就不那么害怕了……",
							"motion": "smile03"
						},
						{
							"text": "山吹家的奶油面包……好好吃……",
							"motion": "smile04"
						},
						{
							"text": "呜……在人前说话……好紧张……",
							"motion": "sad01"
						},
						{
							"text": "大家……都对我很温柔呢……",
							"motion": "nod01"
						},
						{
							"text": "如果……我也能闪闪发光就好了……",
							"motion": "sad02"
						},
						{
							"text": "看到可爱的东西……就会很开心……",
							"motion": "smile05"
						},
						{
							"text": "呜……今天也要好好练习贝斯……",
							"motion": "serious01"
						}
					],
					[
						{
							"text": "今天的山吹面包，也烤得很好呢。",
							"motion": "smile01"
						},
						{
							"text": "大家要好好吃饭哦？",
							"motion": "smile02"
						},
						{
							"text": "音乐……能让心变得温暖起来呢。",
							"motion": "smile03"
						},
						{
							"text": "遇到困难的时候，家人和朋友会支持我的。",
							"motion": "nod01"
						},
						{
							"text": "给香澄她们带了些面包过去。",
							"motion": "smile04"
						},
						{
							"text": "好好休息也是很重要的哦。",
							"motion": "smile02"
						},
						{
							"text": "和大家一起的时光，是最棒的。",
							"motion": "smile05"
						},
						{
							"text": "今天的练习辛苦了！",
							"motion": "smile01"
						},
						{
							"text": "鼓手要好好把握节奏才行呢。",
							"motion": "kime01"
						},
						{
							"text": "看着大家一点点成长，真让人开心。",
							"motion": "smile06"
						},
						{
							"text": "偶尔也会想，就这样一直演奏下去真好。",
							"motion": "smile03"
						},
						{
							"text": "有什么烦恼的话，随时都可以和我说哦。",
							"motion": "smile04"
						}
					],
					[
						{
							"text": "哈……真是的，又来了。",
							"motion": "serious01"
						},
						{
							"text": "才……才不是为了你们才来的！",
							"motion": "shame01"
						},
						{
							"text": "你们也太吵了吧。",
							"motion": "angry01"
						},
						{
							"text": "哼……不过，偶尔这样也不坏。",
							"motion": "smile02"
						},
						{
							"text": "键盘可是很重要的！",
							"motion": "kime01"
						},
						{
							"text": "别给我添麻烦啊。",
							"motion": "serious02"
						},
						{
							"text": "啊……这个，还挺好听的。",
							"motion": "smile01"
						},
						{
							"text": "才没有在担心你们呢。",
							"motion": "shame01"
						},
						{
							"text": "真是拿你们没办法……",
							"motion": "nod02"
						},
						{
							"text": "今天的演出……还算成功吧。",
							"motion": "smile03"
						},
						{
							"text": "我才没有很开心呢！……大概。",
							"motion": "shame01"
						},
						{
							"text": "那个……谢谢。",
							"motion": "smile04"
						}
					]
				],
				"console": [
					{
						"text": "哇，有人在偷偷看我！是来做客的朋友吗？",
						"motion": "surprised01"
					},
					{
						"text": "好像……有人在看着我。",
						"motion": "nod01"
					},
					{
						"text": "呜……被看到了……好害羞……",
						"motion": "shame01"
					},
					{
						"text": "啊，被发现啦。要喝杯茶吗？",
						"motion": "smile01"
					},
					{
						"text": "喂，看什么看！……我什么都没说。",
						"motion": "angry01"
					}
				],
				"copy": [
					{
						"text": "复制了什么好东西？让我也看看！",
						"motion": "smile02"
					},
					{
						"text": "复制……是能摘星星的魔法吗？",
						"motion": "eeto01"
					},
					{
						"text": "呜……复制了什么呢……",
						"motion": "sad01"
					},
					{
						"text": "复制好了吗？要仔细确认哦。",
						"motion": "smile01"
					},
					{
						"text": "复制就复制，别吵到我就行。",
						"motion": "serious01"
					}
				],
				"visibilitychange": [
					{
						"text": "欢迎回来！我一直在等你哦！",
						"motion": "smile03"
					},
					{
						"text": "你回来了。刚才有只猫经过。",
						"motion": "smile01"
					},
					{
						"text": "呜……欢迎回来……",
						"motion": "smile02"
					},
					{
						"text": "回来啦。累不累？先休息一下吧。",
						"motion": "smile02"
					},
					{
						"text": "回来得真慢。……才没有在担心你。",
						"motion": "nod02"
					}
				]
			},
			"mouseover": [
				{
					"selector": "#waifu-tool-poppinparty-switch-model",
					"text": [
						{
							"text": "想换个人陪陪你吗？嘻！",
							"motion": "wink01"
						},
						{
							"text": "换……其他的孩子？",
							"motion": "nod01"
						},
						{
							"text": "呜……要换人吗……",
							"motion": "smile01"
						},
						{
							"text": "想换一个伙伴吗？",
							"motion": "smile01"
						},
						{
							"text": "要换？随你便。",
							"motion": "nod02"
						}
					]
				},
				{
					"selector": "#waifu-tool-poppinparty-photo",
					"text": [
						{
							"text": "拍照！要拍出闪闪发光的照片哦！",
							"motion": "smile02"
						},
						{
							"text": "照片……能把星星留下来吗？",
							"motion": "eeto01"
						},
						{
							"text": "呜……要拍照吗……好害羞……",
							"motion": "shame01"
						},
						{
							"text": "拍照吗？要摆个好看的姿势哦。",
							"motion": "smile02"
						},
						{
							"text": "拍照？……哼，快点拍。",
							"motion": "serious01"
						}
					]
				},
				{
					"selector": "#waifu-tool-poppinparty-info",
					"text": [
						{
							"text": "想知道我的事吗？那就告诉你！",
							"motion": "smile03"
						},
						{
							"text": "关于我……的事？",
							"motion": "nod01"
						},
						{
							"text": "呜……我的事……没什么特别的……",
							"motion": "sad01"
						},
						{
							"text": "想了解我吗？谢谢。",
							"motion": "smile02"
						},
						{
							"text": "关于我？……哼，才不告诉你。",
							"motion": "nod02"
						}
					]
				},
				{
					"selector": "#waifu-tool-poppinparty-quit",
					"text": [
						{
							"text": "诶——要走了吗？我会想你的！",
							"motion": "sad01"
						},
						{
							"text": "要……走了？",
							"motion": "nod01"
						},
						{
							"text": "呜……再见……",
							"motion": "bye01"
						},
						{
							"text": "要休息了吗？下次见哦。",
							"motion": "smile01"
						},
						{
							"text": "走吧走吧……哼。",
							"motion": "bye01"
						}
					]
				}
			],
			"seasons": [
				{
					"date": "01/01",
					"text": [
						{
							"text": "新年快乐！今年也要一起kirakira哦！",
							"motion": "smile01"
						},
						{
							"text": "新年……也要去看星星。",
							"motion": "nod01"
						},
						{
							"text": "新年快乐……今年也请多关照……",
							"motion": "smile01"
						},
						{
							"text": "新年快乐！今年也一起加油吧。",
							"motion": "smile02"
						},
						{
							"text": "新年……哼，还算可以吧。",
							"motion": "nod02"
						}
					]
				},
				{
					"date": "02/14",
					"text": [
						{
							"text": "情人节！收到巧克力就会心跳加速呢！",
							"motion": "smile02"
						},
						{
							"text": "巧克力……兔子能吃吗？",
							"motion": "eeto01"
						},
						{
							"text": "呜……要不要送巧克力呢……好紧张……",
							"motion": "shame01"
						},
						{
							"text": "我烤了巧克力面包，要尝尝吗？",
							"motion": "smile03"
						},
						{
							"text": "情人节什么的……和我没关系啦。",
							"motion": "serious01"
						}
					]
				},
				{
					"date": "03/14",
					"text": [
						{
							"text": "白色情人节！回礼要选什么好呢～",
							"motion": "smile03"
						},
						{
							"text": "回礼……送星星形状的东西？",
							"motion": "eeto01"
						},
						{
							"text": "呜……回礼……该送什么呢……",
							"motion": "sad01"
						},
						{
							"text": "做了曲奇当回礼，大家会喜欢吗？",
							"motion": "smile02"
						},
						{
							"text": "回礼……我才没想过呢。",
							"motion": "nod01"
						}
					]
				},
				{
					"date": "06/01-08/31",
					"text": [
						{
							"text": "夏天！烟花和海边，全都是闪闪发光的！",
							"motion": "smile01"
						},
						{
							"text": "夏天……蝉鸣，星星也更清楚。",
							"motion": "smile02"
						},
						{
							"text": "呜……夏天好热……冰淇淋……",
							"motion": "smile01"
						},
						{
							"text": "夏天要小心别中暑哦。",
							"motion": "smile02"
						},
						{
							"text": "夏天真热……不过烟花还不错。",
							"motion": "serious01"
						}
					]
				},
				{
					"date": "09/01-11/30",
					"text": [
						{
							"text": "秋天！适合看星星的季节到了！",
							"motion": "smile02"
						},
						{
							"text": "秋天的天空……很清澈。",
							"motion": "nod01"
						},
						{
							"text": "秋天……吃红薯，好幸福……",
							"motion": "smile03"
						},
						{
							"text": "秋天的落叶，像音符一样呢。",
							"motion": "smile02"
						},
						{
							"text": "秋天……还算舒服的季节吧。",
							"motion": "nod02"
						}
					]
				},
				{
					"date": "12/01-02/29",
					"text": [
						{
							"text": "冬天！一起看圣诞的星星吧！",
							"motion": "smile03"
						},
						{
							"text": "冬天……兔子们会冷吗。",
							"motion": "sad01"
						},
						{
							"text": "呜……好冷……想喝热可可……",
							"motion": "smile01"
						},
						{
							"text": "冬天要注意保暖哦。",
							"motion": "smile02"
						},
						{
							"text": "冬天真冷……哼，别感冒了。",
							"motion": "serious02"
						}
					]
				},
				{
					"date": "12/24-12/26",
					"text": [
						{
							"text": "圣诞快乐！礼物会闪闪发光吗？",
							"motion": "surprised01"
						},
						{
							"text": "圣诞……星星也会很开心吧。",
							"motion": "nod01"
						},
						{
							"text": "呜……圣诞老人会来吗……",
							"motion": "smile02"
						},
						{
							"text": "圣诞快乐！我做了圣诞蛋糕哦。",
							"motion": "smile03"
						},
						{
							"text": "圣诞节……哼，也就那样吧。",
							"motion": "nod02"
						}
					]
				},
				{
					"date": "12/31",
					"text": [
						{
							"text": "今年也辛苦了！明年继续一起kirakira吧！",
							"motion": "kime01"
						},
						{
							"text": "跨年……今年的星星，也很漂亮。",
							"motion": "smile02"
						},
						{
							"text": "今年……也谢谢大家……",
							"motion": "smile01"
						},
						{
							"text": "一年辛苦了。明年也请多关照。",
							"motion": "smile02"
						},
						{
							"text": "哼……明年也别忘了练习啊。",
							"motion": "serious01"
						}
					]
				}
			],
			"time": [
				{
					"hour": "6-7",
					"text": [
						{
							"text": "早上好！今天也是kirakira的一天！",
							"motion": "smile01"
						},
						{
							"text": "早上好……猫已经醒了吗。",
							"motion": "smile01"
						},
						{
							"text": "呜……早上好……",
							"motion": "smile01"
						},
						{
							"text": "早上好。今天也要加油哦。",
							"motion": "smile02"
						},
						{
							"text": "早……这么早起来干嘛啊。",
							"motion": "serious01"
						}
					]
				},
				{
					"hour": "8-11",
					"text": [
						{
							"text": "上午好！要不要一起练习？",
							"motion": "smile02"
						},
						{
							"text": "上午……的星星，看不见。",
							"motion": "eeto01"
						},
						{
							"text": "上午好……今天也要……努力……",
							"motion": "smile01"
						},
						{
							"text": "上午好。要注意休息哦。",
							"motion": "smile02"
						},
						{
							"text": "上午……哼，还行吧。",
							"motion": "nod01"
						}
					]
				},
				{
					"hour": "12-13",
					"text": [
						{
							"text": "午休！山吹面包配牛奶，完美！",
							"motion": "smile03"
						},
						{
							"text": "午饭……兔子在吃什么？",
							"motion": "eeto01"
						},
						{
							"text": "呜……午饭……吃面包……",
							"motion": "smile02"
						},
						{
							"text": "午饭时间。要好好吃饭哦。",
							"motion": "smile01"
						},
						{
							"text": "午饭……别来打扰我。",
							"motion": "serious02"
						}
					]
				},
				{
					"hour": "14-16",
					"text": [
						{
							"text": "下午好！继续加油练习吧！",
							"motion": "kime01"
						},
						{
							"text": "下午……云彩的形状，像兔子。",
							"motion": "smile02"
						},
						{
							"text": "下午……也想练习……",
							"motion": "smile01"
						},
						{
							"text": "下午好。要不要喝杯茶？",
							"motion": "smile02"
						},
						{
							"text": "下午……真无聊。",
							"motion": "nod02"
						}
					]
				},
				{
					"hour": "17-19",
					"text": [
						{
							"text": "傍晚！夕阳也是闪闪发光的！",
							"motion": "smile01"
						},
						{
							"text": "傍晚……星星快出来了。",
							"motion": "smile03"
						},
						{
							"text": "傍晚……要练习了……",
							"motion": "smile01"
						},
						{
							"text": "傍晚了。今天辛苦了！",
							"motion": "smile02"
						},
						{
							"text": "傍晚……啊，该去练习了。",
							"motion": "serious01"
						}
					]
				},
				{
					"hour": "20-21",
					"text": [
						{
							"text": "晚上好！星星们出来啦！",
							"motion": "smile02"
						},
						{
							"text": "晚上……星星好多。",
							"motion": "smile03"
						},
						{
							"text": "呜……晚上了……好安静……",
							"motion": "smile02"
						},
						{
							"text": "晚上好。今天也辛苦啦。",
							"motion": "smile01"
						},
						{
							"text": "晚上……哼，安静点就好。",
							"motion": "nod01"
						}
					]
				},
				{
					"hour": "22-23",
					"text": [
						{
							"text": "这么晚还不睡？明天会没精神的哦！",
							"motion": "smile04"
						},
						{
							"text": "深夜……猫头鹰在叫。",
							"motion": "eeto01"
						},
						{
							"text": "呜……该睡觉了……",
							"motion": "shame01"
						},
						{
							"text": "已经很晚了，早点休息吧。",
							"motion": "smile02"
						},
						{
							"text": "还不睡？我可不管你啊。",
							"motion": "serious02"
						}
					]
				},
				{
					"hour": "0-5",
					"text": [
						{
							"text": "哇，凌晨了！你是不是该睡了？",
							"motion": "surprised01"
						},
						{
							"text": "凌晨……星星最亮的时候。",
							"motion": "smile03"
						},
						{
							"text": "呜……好困……",
							"motion": "sleep01"
						},
						{
							"text": "这么晚还不睡，对身体不好哦。",
							"motion": "serious01"
						},
						{
							"text": "凌晨……喂，快去睡觉。",
							"motion": "angry01"
						}
					]
				}
			]
		};
		//#endregion
		//#region src/client/waifu/model.js
		const PIXI = { get Application() {
			return window.PIXI.Application;
		} };
		const Live2DModel = { get value() {
			return window.PIXI.live2d.Live2DModel;
		} };
		/**
		* 适合作为随机待机动作的 motion 组名。
		* 各角色的可用动作集不同，加载时会被过滤成该角色实际存在的集合。
		* （Poppin'Party 模型动作集：smile01-06 / nf01-05 / nnf01-05 / kime01 /
		*   sad01-02 / surprised01-03 / serious01-02 / shame01 / niyaniya01 /
		*   oowarai01 / wink01 / sing01 / nod01-02 / sleep01-02 / eeto01 / jaan01 等）
		*/
		const IDLE_MOTIONS = [
			"smile01",
			"smile02",
			"smile03",
			"smile04",
			"smile05",
			"smile06",
			"thinking01",
			"thinking02",
			"nf01",
			"nf02",
			"nnf01",
			"nnf02",
			"kandou01",
			"kime01",
			"sad01",
			"surprised01",
			"serious01",
			"shame01",
			"niya01",
			"ando01",
			"odoodo01",
			"sigh01",
			"niyaniya01",
			"oowarai01",
			"wink01",
			"sing01",
			"nod01",
			"nod02",
			"sleep01",
			"eeto01",
			"jaan01",
			"gattsu01"
		];
		var Model = class {
			constructor() {
				this.cdnPath = getConfig().cdnPath;
				this.app = new PIXI.Application({
					view: document.getElementById("live2d-poppinparty"),
					autoStart: true,
					width: 800,
					height: 800,
					backgroundAlpha: 0
				});
				this.modelList = modelList;
				this.tips = tips;
				this.model = null;
				this.modelIndex = null;
				this.modelMotions = [];
				this.modelExpressions = [];
				this.idleMotions = [];
			}
			async loadModel(modelId, modelTexturesId, message) {
				if (modelId >= this.modelList.length) modelId %= this.modelList.length;
				if (modelTexturesId >= this.modelList[modelId].length) modelTexturesId %= this.modelList[modelId].length;
				setModelId(modelId);
				setModelTexturesId(modelTexturesId);
				console.log(`Live2D Model ${modelId}-${modelTexturesId}`);
				showMessage(this, message, 4e3, 10);
				const target = this.modelList[modelId][modelTexturesId];
				const url = `${this.cdnPath}model/${target}/index.json`;
				try {
					this.modelIndex = await fetch(url).then((response) => {
						if (!response.ok) throw new Error(`HTTP ${response.status}`);
						return response.json();
					});
				} catch (error) {
					console.error(`模型加载失败: ${url}`, error);
					showMessage(this, {
						text: "呜……模型加载失败了，换个衣服试试？",
						motion: "sad01"
					}, 5e3, 10);
					return;
				}
				this.modelIndex.url = url;
				if (!this.modelIndex.motions.idle && this.modelIndex.motions.idle01) this.modelIndex.motions.idle = this.modelIndex.motions.idle01;
				if (Array.isArray(this.modelIndex.expressions) && !this.modelIndex.expressions.find((expression) => expression.name === "idle") && this.modelIndex.expressions.find((expression) => expression.name === "idle01")) this.modelIndex.expressions.push({
					name: "idle",
					file: this.modelIndex.expressions.find((expression) => expression.name === "idle01").file
				});
				this.modelMotions = Object.keys(this.modelIndex.motions || {});
				this.modelExpressions = (this.modelIndex.expressions || []).map((expression) => expression.name);
				this.idleMotions = IDLE_MOTIONS.filter((motion) => this.modelMotions.includes(motion));
				this.app.stage.removeChildren();
				try {
					this.model = await Live2DModel.value.from(this.modelIndex, { motionPreload: getConfig().preload });
				} catch (error) {
					console.error("Live2D 模型渲染初始化失败", error);
					showMessage(this, {
						text: "呜……渲染器罢工了，刷新一下试试？",
						motion: "sad01"
					}, 5e3, 10);
					return;
				}
				this.app.stage.addChild(this.model);
				this.model.scale.set(.33);
				updateMessageArray(this.tips);
			}
			/** 播放一个随机的待机动作（不弹气泡） */
			playRandomIdle() {
				if (!this.model || !this.idleMotions.length) return;
				const motion = this.idleMotions[Math.floor(Math.random() * this.idleMotions.length)];
				try {
					this.model.motion(motion);
				} catch (error) {}
			}
			/** 随机切换一个表情 */
			playRandomExpression() {
				if (!this.model || !this.modelExpressions.length) return;
				const expression = this.modelExpressions[Math.floor(Math.random() * this.modelExpressions.length)];
				try {
					this.model.expression(expression);
				} catch (error) {}
			}
			/** 让模型视线跟随屏幕坐标（canvas 空间，可超出 0~800） */
			focusAt(clientX, clientY) {
				if (!this.model) return;
				const canvas = this.app.view;
				const rect = canvas.getBoundingClientRect();
				if (rect.width === 0 || rect.height === 0) return;
				const x = (clientX - rect.left) * (canvas.width / rect.width);
				const y = (clientY - rect.top) * (canvas.height / rect.height);
				try {
					this.model.focus(x, y);
				} catch (error) {}
			}
			/** 截取当前画面为 PNG dataURL */
			capture() {
				if (!this.model) return null;
				try {
					return this.app.renderer.plugins.extract.canvas(this.app.stage).toDataURL("image/png");
				} catch (error) {
					try {
						return this.app.view.toDataURL("image/png");
					} catch (error2) {
						return null;
					}
				}
			}
		};
		//#endregion
		//#region src/client/waifu/tools.js
		const fa_circle_user = "data:image/svg+xml," + encodeURIComponent("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path d=\"M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM512 256c0 141.4-114.6 256-256 256S0 397.4 0 256S114.6 0 256 0S512 114.6 512 256zM256 272c39.8 0 72-32.2 72-72s-32.2-72-72-72s-72 32.2-72 72s32.2 72 72 72z\"/></svg>");
		const fa_camera_retro = "data:image/svg+xml," + encodeURIComponent("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path d=\"M220.6 121.2L271.1 96 448 96v96H333.2c-21.9-15.1-48.5-24-77.2-24s-55.2 8.9-77.2 24H64V128H192c9.9 0 19.7-2.3 28.6-6.8zM0 128V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H271.1c-9.9 0-19.7 2.3-28.6 6.8L192 64H160V48c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16l0 16C28.7 64 0 92.7 0 128zM344 304c0 48.6-39.4 88-88 88s-88-39.4-88-88s39.4-88 88-88s88 39.4 88 88z\"/></svg>");
		const fa_circle_info = "data:image/svg+xml," + encodeURIComponent("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path d=\"M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-144c-17.7 0-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32z\"/></svg>");
		const fa_xmark = "data:image/svg+xml," + encodeURIComponent("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 320 512\"><path d=\"M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z\"/></svg>");
		const tools = {
			"switch-model": {
				icon: fa_circle_user,
				callback: () => {}
			},
			"photo": {
				icon: fa_camera_retro,
				callback: () => {}
			},
			"info": {
				icon: fa_circle_info,
				callback: () => {
					showMessage({
						expression: () => null,
						motion: () => null
					}, {
						text: "Poppin'Party Live2D 桌宠插件 · 5 角色 × 469 套换装",
						motion: "smile01"
					}, 4e3, 10);
				}
			},
			"quit": {
				icon: fa_xmark,
				callback: () => {
					localStorage.setItem("poppinparty-waifu-display", Date.now());
					const waifu = document.getElementById("waifu-poppinparty");
					if (waifu) waifu.style.bottom = "-500px";
					setTimeout(() => {
						const toggle = document.getElementById("waifu-toggle-poppinparty");
						if (toggle) toggle.classList.add("waifu-toggle-active");
					}, 3e3);
				}
			}
		};
		//#endregion
		//#region src/client/waifu/characters.js
		/**
		* 角色元数据与模型资源名工具（Poppin'Party 版）。
		*
		* 模型目录为 `<standalone编号>_<资源id>`（如 `014_casual-2023`），编号来自
		* 独立版 BANDORI 看板娘的 STANDALONE_CHARS（kasumi=014 / tae=038 / rimi=031 /
		* saaya=034 / arisa=003）。换装面板的显示名由 textureLabel() 把资源段名翻译成
		* 中文（如 `014_live_event_41_sr` → 「活动41 SR」），目录名本身保持不变。
		*/
		const CHARACTERS = [
			{
				id: "kasumi",
				num: 14,
				name: "戸山 香澄",
				en: "Kasumi",
				color: "#e8485d"
			},
			{
				id: "tae",
				num: 38,
				name: "花園 たえ",
				en: "Tae",
				color: "#4caf50"
			},
			{
				id: "rimi",
				num: 31,
				name: "牛込 りみ",
				en: "Rimi",
				color: "#5b9bd5"
			},
			{
				id: "saaya",
				num: 34,
				name: "山吹 沙綾",
				en: "Saaya",
				color: "#f59e0b"
			},
			{
				id: "arisa",
				num: 3,
				name: "市ヶ谷 有咲",
				en: "Arisa",
				color: "#9b59b6"
			}
		];
		/**
		* 资源段名（去掉 3 位编号前缀后）→ 中文显示名规则，按顺序匹配，命中即止。
		* `$1` 等为捕获组引用；函数形式可做数值化等处理。
		*/
		const LABEL_RULES = [
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
			[/^live_default$/, "默认演出"],
			[/^live_r_(\d{4})$/, "演出R$1"],
			[/^live_r$/, "演出R"],
			[/^live_sr_(\d+)$/, "演出SR$1"],
			[/^live_ssr_(\d+)$/, "演出SSR$1"],
			[/^live_event_(\d+)_([a-z]+)$/, (m, n, r) => `活动${+n} ${r.toUpperCase()}`],
			[/^live_event_(\d+)$/, (m, n) => `活动${+n}`],
			[/^event_(\d+)_story_(\d+)$/, "活动$1剧情$2"]
		];
		/**
		* 从模型目录名中提取展示标签（中文）。
		* `014_live_event_41_sr` → 「活动41 SR」；未命中规则的段名回退原始段名。
		*/
		function textureLabel(dir) {
			const seg = dir.split("/").pop();
			const body = seg.replace(/^\d{3}_/, "");
			for (const [re, out] of LABEL_RULES) if (re.test(body)) return body.replace(re, out);
			return seg;
		}
		/** 去掉目录名末尾的中文标签，得到原始资源 id（本版本段名无中文标签，原样返回）。 */
		function stripTextureLabel(dir) {
			return dir.replace(/_\p{Script=Han}[\p{Script=Han}0-9A-Za-z]*$/u, "");
		}
		/** 由模型目录名得到平铺在 `assets/` 下的资源文件名。 */
		function textureAssetId(dir) {
			return stripTextureLabel(dir);
		}
		/**
		* 该换装是否有缩略图资源。本版本无逐套缩略图，一律返回 false（面板显示文字标签）。
		*/
		function hasTextureAsset(dir) {
			return false;
		}
		//#endregion
		//#region src/client/waifu/index.js
		const TOOL_TITLES = {
			"switch-model": "切换角色",
			"photo": "拍照",
			"info": "关于",
			"quit": "隐藏"
		};
		/** 轻量监听/定时器收集器：插件卸载时统一清理 */
		function createHooks() {
			const listeners = [];
			const intervals = [];
			return {
				on(target, event, fn) {
					target.addEventListener(event, fn);
					listeners.push([
						target,
						event,
						fn
					]);
				},
				interval(fn, ms) {
					intervals.push(setInterval(fn, ms));
				},
				stop() {
					for (const [target, event, fn] of listeners) try {
						target.removeEventListener(event, fn);
					} catch {}
					for (const id of intervals) clearInterval(id);
					listeners.length = 0;
					intervals.length = 0;
				}
			};
		}
		async function loadWidget(hooks) {
			document.body.insertAdjacentHTML("beforeend", `
    <div id="waifu-poppinparty">
      <canvas id="live2d-poppinparty" width="800" height="800"></canvas>
      <div id="waifu-tips-poppinparty"></div>
      <div id="waifu-tool-poppinparty"></div>
    </div>
    <div id="model-selection-panel-poppinparty" class="waifu-panel waifu-panel-poppinparty" style="display: none;"></div>
    <div id="texture-selection-panel-poppinparty" class="waifu-panel waifu-panel-poppinparty" style="display: none;"></div>`);
			const model = new Model();
			localStorage.removeItem("poppinparty-waifu-display");
			sessionStorage.removeItem("poppinparty-waifu-text");
			const waifu = document.getElementById("waifu-poppinparty");
			const toolBar = document.getElementById("waifu-tool-poppinparty");
			const modelPanel = document.getElementById("model-selection-panel-poppinparty");
			const texturePanel = document.getElementById("texture-selection-panel-poppinparty");
			let selectedModelIndex = null;
			for (const panel of [modelPanel, texturePanel]) panel.addEventListener("wheel", (event) => event.stopPropagation(), {
				passive: true,
				capture: true
			});
			const drag = enableDrag(waifu);
			restorePosition(waifu);
			const waifuRect = () => waifu.getBoundingClientRect();
			function openPanel(panel) {
				panel.style.display = "block";
				const pw = panel.offsetWidth, ph = panel.offsetHeight;
				const rect = waifuRect();
				let left = rect.right + 8;
				if (left + pw > window.innerWidth - 8) left = rect.left - pw - 8;
				left = Math.max(8, Math.min(left, window.innerWidth - pw - 8));
				const top = Math.max(8, Math.min(rect.top, window.innerHeight - ph - 8));
				panel.style.position = "fixed";
				panel.style.left = left + "px";
				panel.style.top = top + "px";
				panel.style.right = "auto";
				panel.style.bottom = "auto";
			}
			function closePanels() {
				modelPanel.style.display = "none";
				texturePanel.style.display = "none";
			}
			tools["switch-model"].callback = () => {
				if (modelPanel.style.display !== "none") {
					closePanels();
					return;
				}
				renderModelPanel();
				openPanel(modelPanel);
			};
			tools["photo"].callback = () => {
				const url = model.capture();
				if (!url) {
					showMessage(model, {
						text: "呜……拍照失败了，再试一次吧？",
						motion: "sad01"
					}, 4e3, 10);
					return;
				}
				const a = document.createElement("a");
				a.href = url;
				a.download = `live2d-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 19).replace(/[:T]/g, "-")}.png`;
				document.body.appendChild(a);
				a.click();
				a.remove();
				showMessage(model, {
					text: "拍好啦！这张照片，要好好珍藏哦！",
					motion: "smile01"
				}, 4e3, 10);
			};
			if (!Array.isArray(getConfig().tools)) getConfig().tools = Object.keys(tools);
			for (const tool of getConfig().tools) {
				if (!tools[tool]) continue;
				const { icon, callback } = tools[tool];
				toolBar.insertAdjacentHTML("beforeend", `<span id="waifu-tool-poppinparty-${tool}" title="${TOOL_TITLES[tool] || tool}">${decodeURIComponent(icon).replace("data:image/svg+xml,", "")}</span>`);
				document.getElementById(`waifu-tool-poppinparty-${tool}`).addEventListener("click", callback);
			}
			function renderModelPanel() {
				let html = "";
				modelList.forEach((textures, index) => {
					const char = CHARACTERS[index];
					const asset = `${getConfig().cdnPath}assets/chara_icon_${char.num}.png`;
					html += `
            <button class="model-option" data-model-index="${index}" style="--accent:${char.color}">
              <img src="${asset}" alt="${char.name}" loading="lazy">
              <span class="model-option-text">
                <span class="model-option-name">${char.name}</span>
                <span class="model-option-en">${char.en}</span>
              </span>
            </button>`;
				});
				modelPanel.innerHTML = `
            <div class="waifu-panel-header"><span>选择角色</span><button class="waifu-panel-close" aria-label="关闭">✕</button></div>
            <div class="waifu-panel-body">${html}</div>`;
			}
			function renderTexturePanel(charIndex) {
				const char = CHARACTERS[charIndex];
				const textures = modelList[charIndex];
				let html = "";
				textures.forEach((dir, index) => {
					const label = textureLabel(dir);
					const base = textureAssetId(dir);
					const asset = `${getConfig().cdnPath}assets/${base}.png`;
					if (hasTextureAsset(dir)) html += `
                <button class="texture-option" data-texture-index="${index}">
                  <img src="${asset}" alt="${label}" loading="lazy">
                  <span>${label}</span>
                </button>`;
					else html += `
                <button class="texture-option texture-option-text" data-texture-index="${index}">
                  <span>${label}</span>
                </button>`;
				});
				texturePanel.innerHTML = `
            <div class="waifu-panel-header">
              <button class="waifu-panel-back" aria-label="返回">←</button>
              <span>${char.name} · 换装</span>
              <button class="waifu-panel-close" aria-label="关闭">✕</button>
            </div>
            <div class="waifu-panel-body">${html}</div>`;
			}
			hooks.on(modelPanel, "click", async (event) => {
				if (event.target.closest(".waifu-panel-close")) {
					closePanels();
					return;
				}
				const button = event.target.closest(".model-option");
				if (!button) return;
				selectedModelIndex = parseInt(button.getAttribute("data-model-index"), 10);
				renderTexturePanel(selectedModelIndex);
				modelPanel.style.display = "none";
				openPanel(texturePanel);
			});
			hooks.on(texturePanel, "click", async (event) => {
				if (event.target.closest(".waifu-panel-close")) {
					closePanels();
					return;
				}
				if (event.target.closest(".waifu-panel-back")) {
					texturePanel.style.display = "none";
					openPanel(modelPanel);
					return;
				}
				const button = event.target.closest(".texture-option");
				if (!button) return;
				const textureIndex = parseInt(button.getAttribute("data-texture-index"), 10);
				closePanels();
				await model.loadModel(selectedModelIndex, textureIndex);
			});
			hooks.on(document, "click", (event) => {
				if (event.target.closest("#model-selection-panel-poppinparty") || event.target.closest("#texture-selection-panel-poppinparty") || event.target.closest("#waifu-tool-poppinparty") || event.target.closest("#waifu-toggle-poppinparty")) return;
				closePanels();
			});
			hooks.on(document, "keydown", (event) => {
				if (event.key === "Escape") closePanels();
			});
			registerEventListener(model, drag, hooks);
			const api = {
				loadModel: (charId, texId) => model.loadModel(charId, texId),
				getModelList: () => modelList,
				getState: () => ({
					modelId: getModelId(),
					modelTexturesId: getModelTexturesId()
				}),
				capture: () => model.capture(),
				playRandomIdle: () => model.playRandomIdle(),
				showMessage,
				debug: () => ({
					stageChildren: model.app.stage.children.length,
					modelLoaded: !!model.model,
					modelSize: model.model ? {
						w: Math.round(model.model.width),
						h: Math.round(model.model.height)
					} : null,
					appRunning: !!(model.app.ticker && model.app.ticker.started),
					canvas: model.app.view ? {
						id: model.app.view.id,
						w: model.app.view.width,
						h: model.app.view.height
					} : null,
					pixiVersion: window.PIXI && window.PIXI.VERSION
				})
			};
			window.L2D = api;
			if (getModelId() === null) resetModelState();
			await model.loadModel(getModelId(), getModelTexturesId());
			return () => {
				hooks.stop();
				clearMessageTimer();
				try {
					model.app.destroy(true);
				} catch {}
				for (const el of [
					waifu,
					modelPanel,
					texturePanel
				]) try {
					if (el && el.parentNode) el.parentNode.removeChild(el);
				} catch {}
				if (window.L2D === api) window.L2D = void 0;
			};
		}
		function enableDrag(widgetEl) {
			const drag = {
				active: false,
				moved: false,
				startX: 0,
				startY: 0,
				originX: 0,
				originY: 0
			};
			widgetEl.addEventListener("pointerdown", (event) => {
				if (event.target.closest("#waifu-tool-poppinparty") || event.target.closest(".waifu-panel-poppinparty") || event.target.closest("#waifu-toggle-poppinparty")) return;
				drag.active = true;
				drag.moved = false;
				drag.startX = event.clientX;
				drag.startY = event.clientY;
				const rect = widgetEl.getBoundingClientRect();
				drag.originX = rect.left;
				drag.originY = rect.top;
				widgetEl.classList.add("waifu-dragging");
				try {
					widgetEl.setPointerCapture(event.pointerId);
				} catch (error) {}
			});
			widgetEl.addEventListener("pointermove", (event) => {
				if (!drag.active) return;
				const dx = event.clientX - drag.startX;
				const dy = event.clientY - drag.startY;
				if (!drag.moved && Math.abs(dx) + Math.abs(dy) > 6) drag.moved = true;
				if (!drag.moved) return;
				const left = Math.min(Math.max(drag.originX + dx, -120), window.innerWidth - 40);
				const top = Math.min(Math.max(drag.originY + dy, -80), window.innerHeight - 40);
				widgetEl.style.left = left + "px";
				widgetEl.style.top = top + "px";
				widgetEl.style.right = "auto";
				widgetEl.style.bottom = "auto";
			});
			const endDrag = (event) => {
				if (!drag.active) return;
				drag.active = false;
				widgetEl.classList.remove("waifu-dragging");
				if (drag.moved) {
					const rect = widgetEl.getBoundingClientRect();
					try {
						localStorage.setItem("poppinparty-waifu-pos", JSON.stringify({
							left: rect.left,
							top: rect.top
						}));
					} catch (error) {}
				}
			};
			widgetEl.addEventListener("pointerup", endDrag);
			widgetEl.addEventListener("pointercancel", endDrag);
			return drag;
		}
		function restorePosition(widgetEl) {
			try {
				const pos = JSON.parse(localStorage.getItem("poppinparty-waifu-pos"));
				if (!pos || typeof pos.left !== "number" || typeof pos.top !== "number") return;
				const left = Math.min(Math.max(pos.left, -120), window.innerWidth - 40);
				const top = Math.min(Math.max(pos.top, -80), window.innerHeight - 40);
				widgetEl.style.left = left + "px";
				widgetEl.style.top = top + "px";
				widgetEl.style.right = "auto";
				widgetEl.style.bottom = "auto";
			} catch (error) {}
		}
		function registerEventListener(model, drag, hooks) {
			let userAction = false;
			let idleSeconds = 0;
			let lastHoverElement;
			let lastFocusTime = 0;
			hooks.on(window, "mousemove", (event) => {
				userAction = true;
				const now = Date.now();
				if (now - lastFocusTime > 50) {
					lastFocusTime = now;
					model.focusAt(event.clientX, event.clientY);
				}
			});
			hooks.on(window, "mousedown", () => userAction = true);
			hooks.on(window, "keydown", () => userAction = true);
			hooks.on(window, "scroll", () => userAction = true, true);
			hooks.interval(() => {
				if (userAction) {
					userAction = false;
					idleSeconds = 0;
					return;
				}
				idleSeconds++;
				if (idleSeconds === 18) showMessage(model, getMessageArray(), 6e3, 9);
				else if (idleSeconds > 18 && idleSeconds % 30 === 0) model.playRandomIdle();
			}, 1e3);
			hooks.on(window, "mouseover", (event) => {
				if (event.target.closest("#live2d-poppinparty")) {
					showMessage(model, getMessageArray(), 4e3, 9);
					return;
				}
				for (const { selector, text } of tips.mouseover) {
					if (!event.target.closest(selector)) continue;
					if (lastHoverElement === selector) return;
					lastHoverElement = selector;
					showMessage(model, randomSelection(text[getModelId()]), 4e3, 10);
					return;
				}
			});
			hooks.on(window, "click", (event) => {
				if (drag.moved) return;
				if (event.target.closest("#live2d-poppinparty")) {
					showMessage(model, getMessageArray(), 4e3, 9);
					return;
				}
				for (const { selector, text } of tips.mouseover) {
					if (!event.target.closest(selector)) continue;
					showMessage(model, randomSelection(text[getModelId()]), 4e3, 10);
					return;
				}
			});
			hooks.on(window, "resize", () => {
				const threshold = 160;
				const widthDiff = Math.abs(window.outerWidth - window.innerWidth);
				const heightDiff = Math.abs(window.outerHeight - window.innerHeight);
				if (widthDiff > threshold || heightDiff > threshold) showMessage(model, tips.message.console[getModelId()], 6e3, 9);
			});
			hooks.on(window, "copy", () => {
				showMessage(model, tips.message.copy[getModelId()], 6e3, 9);
			});
			hooks.on(document, "visibilitychange", () => {
				if (!document.hidden) showMessage(model, tips.message.visibilitychange[getModelId()], 6e3, 9);
			});
		}
		/**
		* 启动桌宠。返回停止函数（插件卸载时调用）：清理监听/定时器、销毁渲染器、移除 DOM。
		*/
		async function initWidget(config) {
			const hooks = createHooks();
			setConfig(config);
			document.getElementById("waifu-toggle-poppinparty")?.remove();
			document.getElementById("waifu-poppinparty")?.remove();
			document.body.insertAdjacentHTML("beforeend", `<div id="waifu-toggle-poppinparty"><span>Live2D</span></div>`);
			const toggle = document.getElementById("waifu-toggle-poppinparty");
			let stopWidget = () => {};
			const toggleStop = () => {
				hooks.stop();
				try {
					if (toggle && toggle.parentNode) toggle.parentNode.removeChild(toggle);
				} catch {}
				stopWidget();
			};
			hooks.on(toggle, "click", async () => {
				toggle.classList.remove("waifu-toggle-active");
				if (toggle.getAttribute("first-time")) {
					stopWidget = await loadWidget(hooks);
					toggle.removeAttribute("first-time");
				} else {
					localStorage.removeItem("poppinparty-waifu-display");
					const waifuEl = document.getElementById("waifu-poppinparty");
					if (waifuEl) {
						waifuEl.style.display = "";
						setTimeout(() => {
							waifuEl.style.bottom = "20px";
						}, 0);
					}
				}
			});
			if (localStorage.getItem("poppinparty-waifu-display") && Date.now() - localStorage.getItem("poppinparty-waifu-display") <= 864e5) {
				toggle.setAttribute("first-time", true);
				setTimeout(() => {
					toggle.classList.add("waifu-toggle-active");
				}, 0);
			} else stopWidget = await loadWidget(hooks);
			return toggleStop;
		}
		//#endregion
		//#region src/client/waifuCss.ts
		var waifuCss_default = "/* ============ 侧边开关（隐藏后用于唤回） ============ */\n#waifu-toggle-poppinparty {\n  background: linear-gradient(180deg, #9b8cff, #6b5ce7);\n  border-radius: 6px 6px 0 0;\n  bottom: 330px;\n  color: #fff;\n  cursor: pointer;\n  font-size: 12px;\n  left: 0;\n  margin-left: -100px;\n  padding: 6px 3px 6px 6px;\n  position: fixed;\n  transition: margin-left 1s;\n  width: 60px;\n  writing-mode: vertical-rl;\n  z-index: 998;\n  letter-spacing: 2px;\n  box-shadow: 0 2px 8px rgba(107, 92, 231, 0.35);\n}\n\n#waifu-toggle-poppinparty.waifu-toggle-active {\n  margin-left: -50px;\n}\n\n#waifu-toggle-poppinparty.waifu-toggle-active:hover {\n  margin-left: -30px;\n}\n\n/* ============ 主体容器 ============ */\n#waifu-poppinparty {\n  bottom: 20px;\n  left: -40px;\n  line-height: 0;\n  margin-bottom: 0;\n  position: fixed;\n  transform: translateY(0);\n  transition: transform 0.3s ease-in-out, bottom 3s ease-in-out;\n  z-index: 997;\n  touch-action: none; /* 拖拽时不触发页面手势 */\n}\n\n#waifu-poppinparty:not(.waifu-dragging):hover {\n  transform: translateY(-5px);\n}\n\n#waifu-poppinparty.waifu-dragging {\n  cursor: grabbing;\n  user-select: none;\n}\n\n/* ============ 气泡 ============ */\n#waifu-tips-poppinparty {\n  animation: shake 50s ease-in-out 5s infinite;\n  background: rgba(255, 255, 255, 0.92);\n  backdrop-filter: blur(8px);\n  -webkit-backdrop-filter: blur(8px);\n  border: 1px solid rgba(107, 92, 231, 0.15);\n  border-radius: 14px;\n  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.18);\n  font-size: 14px;\n  line-height: 24px;\n  margin: -30px 30px;\n  min-height: 86px;\n  opacity: 0;\n  overflow: hidden;\n  padding: 10px 12px;\n  position: absolute;\n  text-overflow: ellipsis;\n  transition: opacity 1s;\n  width: 240px;\n  word-break: break-all;\n  top: 0;\n  left: 20px;\n  pointer-events: none;\n  color: #333;\n}\n\n#waifu-tips-poppinparty::after {\n  content: \"\";\n  position: absolute;\n  left: 30px;\n  bottom: -8px;\n  width: 0;\n  height: 0;\n  border-left: 8px solid transparent;\n  border-right: 8px solid transparent;\n  border-top: 8px solid rgba(255, 255, 255, 0.92);\n  filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.08));\n}\n\n#waifu-tips-poppinparty.waifu-tips-active {\n  opacity: 1;\n  transition: opacity 0.2s;\n}\n\n#waifu-tips-poppinparty span {\n  color: #6b5ce7;\n  font-weight: 600;\n}\n\n/* ============ 画布 ============ */\n#live2d-poppinparty {\n  cursor: grab;\n  height: 400px;\n  position: relative;\n  width: 400px;\n}\n\n#live2d-poppinparty:active {\n  cursor: grabbing;\n}\n\n/* ============ 工具按钮栏 ============ */\n#waifu-tool-poppinparty {\n  background: rgba(255, 255, 255, 0.7);\n  backdrop-filter: blur(8px);\n  -webkit-backdrop-filter: blur(8px);\n  border: 1px solid rgba(0, 0, 0, 0.06);\n  border-radius: 12px;\n  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);\n  color: #aaa;\n  opacity: 0;\n  padding: 6px 4px;\n  position: absolute;\n  right: 96px;\n  top: 56px;\n  transition: opacity 0.6s;\n  z-index: 5;\n}\n\n#waifu-poppinparty:hover #waifu-tool-poppinparty,\n#waifu-tool-poppinparty:hover {\n  opacity: 1;\n}\n\n#waifu-tool-poppinparty span {\n  display: block;\n  height: 40px;\n  line-height: 40px;\n  text-align: center;\n}\n\n#waifu-tool-poppinparty svg {\n  fill: #7b8c9d;\n  cursor: pointer;\n  height: 22px;\n  vertical-align: middle;\n  transition: fill 0.3s, transform 0.3s;\n}\n\n#waifu-tool-poppinparty svg:hover {\n  fill: #6b5ce7;\n  transform: scale(1.15);\n}\n\n/* ============ 选择面板 ============ */\n.waifu-panel {\n  display: none;\n  position: fixed;\n  z-index: 999;\n  background: rgba(24, 22, 40, 0.94);\n  backdrop-filter: blur(12px);\n  -webkit-backdrop-filter: blur(12px);\n  border: 1px solid rgba(139, 124, 255, 0.25);\n  border-radius: 14px;\n  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.45);\n  color: #eee;\n  width: 300px;\n  max-height: 70vh;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n\n.waifu-panel-header {\n  align-items: center;\n  display: flex;\n  flex-shrink: 0;\n  gap: 8px;\n  justify-content: space-between;\n  padding: 10px 12px;\n  font-size: 14px;\n  font-weight: 600;\n  color: #cfc7ff;\n  border-bottom: 1px solid rgba(139, 124, 255, 0.15);\n}\n\n.waifu-panel-header .waifu-panel-back {\n  background: none;\n  border: none;\n  color: #cfc7ff;\n  cursor: pointer;\n  font-size: 16px;\n  padding: 2px 6px;\n  border-radius: 6px;\n}\n\n.waifu-panel-header .waifu-panel-back:hover {\n  background: rgba(139, 124, 255, 0.2);\n}\n\n.waifu-panel-close {\n  background: none;\n  border: none;\n  color: #9a93c4;\n  cursor: pointer;\n  font-size: 15px;\n  padding: 2px 6px;\n  border-radius: 6px;\n}\n\n.waifu-panel-close:hover {\n  background: rgba(255, 255, 255, 0.12);\n  color: #fff;\n}\n\n.waifu-panel-body {\n  flex: 1 1 auto;\n  min-height: 0;                 /* 关键：flex 子项允许收缩，否则长列表撑破 max-height 后被裁剪无法滚动 */\n  max-height: calc(70vh - 48px); /* 双保险：即使 flex 计算异常，body 本身也被限制为可滚区域 */\n  overflow-y: auto;\n  overscroll-behavior: contain;  /* 滚动不穿透到页面/后台容器 */\n  padding: 10px;\n  scrollbar-width: thin;\n  scrollbar-color: rgba(139, 124, 255, 0.4) transparent;\n}\n\n.waifu-panel-body::-webkit-scrollbar {\n  width: 6px;\n}\n\n.waifu-panel-body::-webkit-scrollbar-thumb {\n  background: rgba(139, 124, 255, 0.4);\n  border-radius: 3px;\n}\n\n.waifu-panel-body::-webkit-scrollbar-track {\n  background: transparent;\n}\n\n/* --- 角色按钮 --- */\n#model-selection-panel-poppinparty .model-option {\n  align-items: center;\n  background: rgba(255, 255, 255, 0.05);\n  border: 1px solid rgba(255, 255, 255, 0.08);\n  border-radius: 10px;\n  color: #eee;\n  cursor: pointer;\n  display: flex;\n  gap: 10px;\n  margin-bottom: 6px;\n  padding: 6px 8px;\n  text-align: left;\n  transition: background 0.25s, border-color 0.25s, transform 0.15s;\n  width: 100%;\n}\n\n#model-selection-panel-poppinparty .model-option:hover {\n  background: rgba(139, 124, 255, 0.18);\n  border-color: var(--accent, #8f7bff);\n  transform: translateX(2px);\n}\n\n#model-selection-panel-poppinparty .model-option img {\n  border-radius: 8px;\n  display: block;\n  height: 44px;\n  object-fit: cover;\n  width: 44px;\n  background: rgba(255, 255, 255, 0.08);\n}\n\n#model-selection-panel-poppinparty .model-option-text {\n  display: flex;\n  flex-direction: column;\n}\n\n#model-selection-panel-poppinparty .model-option-name {\n  font-size: 14px;\n  font-weight: 600;\n}\n\n#model-selection-panel-poppinparty .model-option-en {\n  color: #8f88b8;\n  font-size: 11px;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n}\n\n/* --- 换装按钮 --- */\n#texture-selection-panel-poppinparty .waifu-panel-body {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 6px;\n}\n\n#texture-selection-panel-poppinparty .texture-option {\n  background: rgba(255, 255, 255, 0.05);\n  border: 1px solid rgba(255, 255, 255, 0.08);\n  border-radius: 8px;\n  color: #ddd;\n  cursor: pointer;\n  font-size: 11px;\n  overflow: hidden;\n  padding: 0;\n  text-align: center;\n  transition: background 0.25s, border-color 0.25s, transform 0.15s;\n}\n\n#texture-selection-panel-poppinparty .texture-option:hover {\n  background: rgba(139, 124, 255, 0.2);\n  border-color: #8f7bff;\n  transform: translateY(-2px);\n}\n\n#texture-selection-panel-poppinparty .texture-option img {\n  aspect-ratio: 1 / 1;\n  display: block;\n  object-fit: cover;\n  width: 100%;\n  height: auto;\n  border-radius: 8px 8px 0 0;\n}\n\n#texture-selection-panel-poppinparty .texture-option span {\n  display: block;\n  padding: 4px 2px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n#texture-selection-panel-poppinparty .texture-option-text {\n  align-items: center;\n  display: flex;\n  justify-content: center;\n  min-height: 56px;\n  font-size: 12px;\n}\n\n#texture-selection-panel-poppinparty .texture-option-text span {\n  padding: 8px 4px;\n}\n\n/* ============ 摇晃动画 ============ */\n@keyframes shake {\n  2% { transform: translate(0.5px, -1.5px) rotate(-0.5deg); }\n  4% { transform: translate(0.5px, 1.5px) rotate(1.5deg); }\n  6% { transform: translate(1.5px, 1.5px) rotate(1.5deg); }\n  8% { transform: translate(2.5px, 1.5px) rotate(0.5deg); }\n  10% { transform: translate(0.5px, 2.5px) rotate(0.5deg); }\n  12% { transform: translate(1.5px, 1.5px) rotate(0.5deg); }\n  14% { transform: translate(0.5px, 0.5px) rotate(0.5deg); }\n  16% { transform: translate(-1.5px, -0.5px) rotate(1.5deg); }\n  18% { transform: translate(0.5px, 0.5px) rotate(1.5deg); }\n  20% { transform: translate(2.5px, 2.5px) rotate(1.5deg); }\n  22% { transform: translate(0.5px, -1.5px) rotate(1.5deg); }\n  24% { transform: translate(-1.5px, 1.5px) rotate(-0.5deg); }\n  26% { transform: translate(1.5px, 0.5px) rotate(1.5deg); }\n  28% { transform: translate(-0.5px, -0.5px) rotate(-0.5deg); }\n  30% { transform: translate(1.5px, -0.5px) rotate(-0.5deg); }\n  32% { transform: translate(2.5px, -1.5px) rotate(1.5deg); }\n  34% { transform: translate(2.5px, 2.5px) rotate(-0.5deg); }\n  36% { transform: translate(0.5px, -1.5px) rotate(0.5deg); }\n  38% { transform: translate(2.5px, -0.5px) rotate(-0.5deg); }\n  40% { transform: translate(-0.5px, 2.5px) rotate(0.5deg); }\n  42% { transform: translate(-1.5px, 2.5px) rotate(0.5deg); }\n  44% { transform: translate(-1.5px, 1.5px) rotate(0.5deg); }\n  46% { transform: translate(1.5px, -0.5px) rotate(-0.5deg); }\n  48% { transform: translate(2.5px, -0.5px) rotate(0.5deg); }\n  50% { transform: translate(-1.5px, 1.5px) rotate(0.5deg); }\n  52% { transform: translate(-0.5px, 1.5px) rotate(0.5deg); }\n  54% { transform: translate(-1.5px, 1.5px) rotate(0.5deg); }\n  56% { transform: translate(0.5px, 2.5px) rotate(1.5deg); }\n  58% { transform: translate(2.5px, 2.5px) rotate(0.5deg); }\n  60% { transform: translate(2.5px, -1.5px) rotate(1.5deg); }\n  62% { transform: translate(-1.5px, 0.5px) rotate(1.5deg); }\n  64% { transform: translate(-1.5px, 1.5px) rotate(1.5deg); }\n  66% { transform: translate(0.5px, 2.5px) rotate(1.5deg); }\n  68% { transform: translate(2.5px, -1.5px) rotate(1.5deg); }\n  70% { transform: translate(2.5px, 2.5px) rotate(0.5deg); }\n  72% { transform: translate(-0.5px, -1.5px) rotate(1.5deg); }\n  74% { transform: translate(-1.5px, 2.5px) rotate(1.5deg); }\n  76% { transform: translate(-1.5px, 2.5px) rotate(1.5deg); }\n  78% { transform: translate(-1.5px, 2.5px) rotate(0.5deg); }\n  80% { transform: translate(-1.5px, 0.5px) rotate(-0.5deg); }\n  82% { transform: translate(-1.5px, 0.5px) rotate(-0.5deg); }\n  84% { transform: translate(-0.5px, 0.5px) rotate(1.5deg); }\n  86% { transform: translate(2.5px, 1.5px) rotate(0.5deg); }\n  88% { transform: translate(-1.5px, 0.5px) rotate(1.5deg); }\n  90% { transform: translate(-1.5px, -0.5px) rotate(-0.5deg); }\n  92% { transform: translate(-1.5px, -1.5px) rotate(1.5deg); }\n  94% { transform: translate(0.5px, 0.5px) rotate(-0.5deg); }\n  96% { transform: translate(2.5px, -0.5px) rotate(-0.5deg); }\n  98% { transform: translate(-1.5px, -1.5px) rotate(-0.5deg); }\n  0%, 100% { transform: translate(0, 0) rotate(0); }\n}\n\n/* ============ 小屏适配 ============ */\n@media (max-width: 640px) {\n  #waifu-tips-poppinparty {\n    width: 200px;\n    font-size: 13px;\n  }\n\n  #waifu-tool-poppinparty {\n    right: 88px;\n  }\n\n  .waifu-panel {\n    width: min(300px, calc(100vw - 24px));\n    max-height: 60vh;\n  }\n\n  .waifu-panel-body {\n    max-height: calc(60vh - 48px);\n  }\n}\n";
		//#endregion
		//#region src/client/index.ts
		/** vendor 运行时脚本（host 同源路由，按依赖顺序加载）。
		*  Cubism 2.1 渲染链：live2d.min.js（框架，暴露 window.Live2D / Live2DModelWebGL）
		*  → pixi.min.js（PIXI 6）→ live2d-display.cubism2.min.js（pixi-live2d-display
		*  0.4.0 的 cubism2 版，运行时校验 window.Live2D 存在）。
		*  Cubism 2.1 不需要 live2dcubismcore.min.js（那是 Cubism 4 链的依赖）。
		*/
		const VENDOR_SCRIPTS = [
			"/pp-assets/vendor/live2d.min.js",
			"/pp-assets/vendor/pixi.min.js",
			"/pp-assets/vendor/live2d-display.cubism2.min.js"
		];
		/** 桌宠容器与面板的 z-index 覆盖（dsh GUI 上方悬浮）+ 默认放右下（避开左侧栏）。 */
		const Z_INDEX_OVERRIDE = `
#waifu-poppinparty, #waifu-toggle-poppinparty { z-index: 2147483646 !important; }
.waifu-panel { z-index: 2147483647 !important; }
#waifu-poppinparty { left: auto; right: 20px; top: auto; bottom: 20px; }
`;
		function loadScript(src) {
			return new Promise((resolve, reject) => {
				const tag = document.createElement("script");
				tag.src = src;
				tag.onload = () => resolve();
				tag.onerror = () => reject(/* @__PURE__ */ new Error(`加载 ${src} 失败`));
				document.head.appendChild(tag);
			});
		}
		/** 插件入口：注入 CSS + 按序加载运行时 + 启动桌宠；清理注册为 ctx.effect disposer。 */
		function apply(ctx) {
			ctx.effect(() => {
				const cleanup = [];
				let disposed = false;
				const stop = () => {
					if (disposed) return;
					disposed = true;
					for (const fn of cleanup) try {
						fn();
					} catch {}
					cleanup.length = 0;
				};
				const style = document.createElement("style");
				style.id = "live2d-poppinparty-css";
				style.textContent = waifuCss_default + Z_INDEX_OVERRIDE;
				document.head.appendChild(style);
				cleanup.push(() => style.remove());
				(async () => {
					for (const src of VENDOR_SCRIPTS) {
						await loadScript(src);
						if (disposed) return;
					}
					if (disposed) return;
					try {
						await initWidget({
							cdnPath: "/pp-assets/",
							preload: "IDLE",
							tools: [
								"switch-model",
								"photo",
								"info",
								"quit"
							]
						});
					} catch (error) {
						console.error("[live2d-poppinparty 桌宠启动失败", error);
					}
				})();
				return stop;
			}, "live2d-poppinparty: widget");
		}
		//#endregion
		exports.apply = apply;
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map