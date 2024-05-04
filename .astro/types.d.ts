declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"2021": {
"tech-issue-1/index.md": {
	id: "tech-issue-1/index.md";
  slug: "tech-issue-1";
  body: string;
  collection: "2021";
  data: any
} & { render(): Render[".md"] };
"优化搜索网站的颜色/index.md": {
	id: "优化搜索网站的颜色/index.md";
  slug: "优化搜索网站的颜色";
  body: string;
  collection: "2021";
  data: any
} & { render(): Render[".md"] };
"博客再次重启及优化/index.md": {
	id: "博客再次重启及优化/index.md";
  slug: "博客再次重启及优化";
  body: string;
  collection: "2021";
  data: any
} & { render(): Render[".md"] };
};
"2022": {
"tech-issue-2/index.md": {
	id: "tech-issue-2/index.md";
  slug: "tech-issue-2";
  body: string;
  collection: "2022";
  data: any
} & { render(): Render[".md"] };
};
"2024": {
"tech-issue-3/index.md": {
	id: "tech-issue-3/index.md";
  slug: "tech-issue-3";
  body: string;
  collection: "2024";
  data: any
} & { render(): Render[".md"] };
};
"archived": {
"个人作品/[个人作品]Chrome扩展 My Webrequest.md": {
	id: "个人作品/[个人作品]Chrome扩展 My Webrequest.md";
  slug: "个人作品/个人作品chrome扩展-my-webrequest";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"个人作品/[个人作品]书签分割线 & 特殊符号大全.md": {
	id: "个人作品/[个人作品]书签分割线 & 特殊符号大全.md";
  slug: "个人作品/个人作品书签分割线--特殊符号大全";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"个人作品/[个人作品]图片格式转换小工具—Picture Format Converter.md": {
	id: "个人作品/[个人作品]图片格式转换小工具—Picture Format Converter.md";
  slug: "个人作品/个人作品图片格式转换小工具picture-format-converter";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"个人作品/[个人作品]文本上下翻转工具-TextUpsideDown.md": {
	id: "个人作品/[个人作品]文本上下翻转工具-TextUpsideDown.md";
  slug: "个人作品/个人作品文本上下翻转工具-textupsidedown";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"个人作品/[个人作品]综合搜索.md": {
	id: "个人作品/[个人作品]综合搜索.md";
  slug: "个人作品/个人作品综合搜索";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"个人文字/[哲思]〇 序言——关于《苏菲的世界》.md": {
	id: "个人文字/[哲思]〇 序言——关于《苏菲的世界》.md";
  slug: "个人文字/哲思〇-序言关于苏菲的世界";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"个人文字/[哲思]一 你是谁——关于自我.md": {
	id: "个人文字/[哲思]一 你是谁——关于自我.md";
  slug: "个人文字/哲思一-你是谁关于自我";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"个人文字/[哲思]二 世界从哪里来——关于世界.md": {
	id: "个人文字/[哲思]二 世界从哪里来——关于世界.md";
  slug: "个人文字/哲思二-世界从哪里来关于世界";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"个人文字/[随笔]七月的雨.md": {
	id: "个人文字/[随笔]七月的雨.md";
  slug: "个人文字/随笔七月的雨";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"个人文字/[随笔]六月的课程设计.md": {
	id: "个人文字/[随笔]六月的课程设计.md";
  slug: "个人文字/随笔六月的课程设计";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"个人文字/[随笔]回家啦.md": {
	id: "个人文字/[随笔]回家啦.md";
  slug: "个人文字/随笔回家啦";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"凌乱/[搞笑]为什么不应该在网上随便公布自己的照片.md": {
	id: "凌乱/[搞笑]为什么不应该在网上随便公布自己的照片.md";
  slug: "凌乱/搞笑为什么不应该在网上随便公布自己的照片";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"凌乱/[搞笑]为何你应该假装自己是一个电脑白痴.md": {
	id: "凌乱/[搞笑]为何你应该假装自己是一个电脑白痴.md";
  slug: "凌乱/搞笑为何你应该假装自己是一个电脑白痴";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"凌乱/[搞笑]程序猿装B指南.md": {
	id: "凌乱/[搞笑]程序猿装B指南.md";
  slug: "凌乱/搞笑程序猿装b指南";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"凌乱/[电影&音乐]《哆啦a梦：大雄的人鱼大海战》及其主题曲.md": {
	id: "凌乱/[电影&音乐]《哆啦a梦：大雄的人鱼大海战》及其主题曲.md";
  slug: "凌乱/电影音乐哆啦a梦大雄的人鱼大海战及其主题曲";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"凌乱/[电影]《苏菲的世界》电影观看地址.md": {
	id: "凌乱/[电影]《苏菲的世界》电影观看地址.md";
  slug: "凌乱/电影苏菲的世界电影观看地址";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"凌乱/[电影]夏日私语.md": {
	id: "凌乱/[电影]夏日私语.md";
  slug: "凌乱/电影夏日私语";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"凌乱/[视频]全球十大感人广告.md": {
	id: "凌乱/[视频]全球十大感人广告.md";
  slug: "凌乱/视频全球十大感人广告";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"凌乱/[音乐&电影]宫崎骏—《借东西的小人阿莉埃蒂》及其主题曲.md": {
	id: "凌乱/[音乐&电影]宫崎骏—《借东西的小人阿莉埃蒂》及其主题曲.md";
  slug: "凌乱/音乐电影宫崎骏借东西的小人阿莉埃蒂及其主题曲";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"天籁之音/[音乐]Alison Krauss —《When you say nothing at all》.md": {
	id: "天籁之音/[音乐]Alison Krauss —《When you say nothing at all》.md";
  slug: "天籁之音/音乐alison-krauss-when-you-say-nothing-at-all";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"天籁之音/[音乐]Aspidistrafly —《Red toe nails》.md": {
	id: "天籁之音/[音乐]Aspidistrafly —《Red toe nails》.md";
  slug: "天籁之音/音乐aspidistrafly-red-toe-nails";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"天籁之音/[音乐]Canon In D Major—你不得不听的世界名曲.md": {
	id: "天籁之音/[音乐]Canon In D Major—你不得不听的世界名曲.md";
  slug: "天籁之音/音乐canon-in-d-major你不得不听的世界名曲";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"天籁之音/[音乐]仓本裕基—《Lake Louise II》.md": {
	id: "天籁之音/[音乐]仓本裕基—《Lake Louise II》.md";
  slug: "天籁之音/音乐仓本裕基lake-louise-ii";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"天籁之音/[音乐]全素妍—《Perhaps Love》.md": {
	id: "天籁之音/[音乐]全素妍—《Perhaps Love》.md";
  slug: "天籁之音/音乐全素妍perhaps-love";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"天籁之音/[音乐]冯曦妤 — 《不做你的情人》.md": {
	id: "天籁之音/[音乐]冯曦妤 — 《不做你的情人》.md";
  slug: "天籁之音/音乐冯曦妤--不做你的情人";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"天籁之音/[音乐]有里知花 —《I Cry》.md": {
	id: "天籁之音/[音乐]有里知花 —《I Cry》.md";
  slug: "天籁之音/音乐有里知花-i-cry";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"天籁之音/[音乐]有里知花—《泪的物语》.md": {
	id: "天籁之音/[音乐]有里知花—《泪的物语》.md";
  slug: "天籁之音/音乐有里知花泪的物语";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"天籁之音/[音乐]李闰珉 —《River flows in you》（含曲谱）.md": {
	id: "天籁之音/[音乐]李闰珉 —《River flows in you》（含曲谱）.md";
  slug: "天籁之音/音乐李闰珉-river-flows-in-you含曲谱";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"天籁之音/[音乐]梦的朵雅-《Sous Les Branches》.md": {
	id: "天籁之音/[音乐]梦的朵雅-《Sous Les Branches》.md";
  slug: "天籁之音/音乐梦的朵雅-sous-les-branches";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"天籁之音/[音乐]熊木杏里 —《七月の友だち》.md": {
	id: "天籁之音/[音乐]熊木杏里 —《七月の友だち》.md";
  slug: "天籁之音/音乐熊木杏里-七月の友だち";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"天籁之音/[音乐]理查德•克莱德曼—《水边的阿迪丽娜》《爱的纪念》.md": {
	id: "天籁之音/[音乐]理查德•克莱德曼—《水边的阿迪丽娜》《爱的纪念》.md";
  slug: "天籁之音/音乐理查德克莱德曼水边的阿迪丽娜爱的纪念";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"天籁之音/[音乐]经典插曲:麻枝准的《夏影》和久石让的《Summer》(有曲谱).md": {
	id: "天籁之音/[音乐]经典插曲:麻枝准的《夏影》和久石让的《Summer》(有曲谱).md";
  slug: "天籁之音/音乐经典插曲麻枝准的夏影和久石让的summer有曲谱";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"天籁之音/[音乐]许慧欣 —《爱情抗体》.md": {
	id: "天籁之音/[音乐]许慧欣 —《爱情抗体》.md";
  slug: "天籁之音/音乐许慧欣-爱情抗体";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"天籁之音/[音乐]郭蘅祈 —《你是我一首唱不完的歌》.md": {
	id: "天籁之音/[音乐]郭蘅祈 —《你是我一首唱不完的歌》.md";
  slug: "天籁之音/音乐郭蘅祈-你是我一首唱不完的歌";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"天籁之音/[音乐]雅尼—《和兰花在一起》.md": {
	id: "天籁之音/[音乐]雅尼—《和兰花在一起》.md";
  slug: "天籁之音/音乐雅尼和兰花在一起";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"天籁之音/[音乐]顺子 —《Dear friend》.md": {
	id: "天籁之音/[音乐]顺子 —《Dear friend》.md";
  slug: "天籁之音/音乐顺子-dear-friend";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"思想/[思想]为什么要有大学.md": {
	id: "思想/[思想]为什么要有大学.md";
  slug: "思想/思想为什么要有大学";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"我的相册/[图片]pon的美少女 插画欣赏.md": {
	id: "我的相册/[图片]pon的美少女 插画欣赏.md";
  slug: "我的相册/图片pon的美少女-插画欣赏";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"我的相册/[图片]我们曾经也是小孩子.md": {
	id: "我的相册/[图片]我们曾经也是小孩子.md";
  slug: "我的相册/图片我们曾经也是小孩子";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"散文/[散文]淡淡的心情.md": {
	id: "散文/[散文]淡淡的心情.md";
  slug: "散文/散文淡淡的心情";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"电脑·软件/[Win7主题]清爽简洁的soft7 2.0（含主题安装教程）.md": {
	id: "电脑·软件/[Win7主题]清爽简洁的soft7 2.0（含主题安装教程）.md";
  slug: "电脑软件/win7主题清爽简洁的soft7-20含主题安装教程";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"电脑·软件/[图标包]Win7图标包Gnome Colors.md": {
	id: "电脑·软件/[图标包]Win7图标包Gnome Colors.md";
  slug: "电脑软件/图标包win7图标包gnome-colors";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"电脑·软件/[小应用]有道网页翻译2.0.md": {
	id: "电脑·软件/[小应用]有道网页翻译2.0.md";
  slug: "电脑软件/小应用有道网页翻译20";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"电脑·软件/[小应用]谷歌在线语音搜索.md": {
	id: "电脑·软件/[小应用]谷歌在线语音搜索.md";
  slug: "电脑软件/小应用谷歌在线语音搜索";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"电脑·软件/[小应用]谷歌浏览器扩展—语音输入.md": {
	id: "电脑·软件/[小应用]谷歌浏览器扩展—语音输入.md";
  slug: "电脑软件/小应用谷歌浏览器扩展语音输入";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"电脑·软件/[小应用]谷歌浏览器扩展推荐.md": {
	id: "电脑·软件/[小应用]谷歌浏览器扩展推荐.md";
  slug: "电脑软件/小应用谷歌浏览器扩展推荐";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"电脑·软件/[技巧]无需扩展，使用谷歌浏览器下载在线影音.md": {
	id: "电脑·软件/[技巧]无需扩展，使用谷歌浏览器下载在线影音.md";
  slug: "电脑软件/技巧无需扩展使用谷歌浏览器下载在线影音";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"电脑·软件/[技巧]谷歌浏览器之高级设置(让谷歌浏览器也能打开手机网页).md": {
	id: "电脑·软件/[技巧]谷歌浏览器之高级设置(让谷歌浏览器也能打开手机网页).md";
  slug: "电脑软件/技巧谷歌浏览器之高级设置让谷歌浏览器也能打开手机网页";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"电脑·软件/[技巧]谷歌非过滤搜索以及相关搜索技巧.md": {
	id: "电脑·软件/[技巧]谷歌非过滤搜索以及相关搜索技巧.md";
  slug: "电脑软件/技巧谷歌非过滤搜索以及相关搜索技巧";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"电脑·软件/[技巧]面对墙的各种策略.md": {
	id: "电脑·软件/[技巧]面对墙的各种策略.md";
  slug: "电脑软件/技巧面对墙的各种策略";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"电脑·软件/[软件]Microsoft软件&服务大搜罗.md": {
	id: "电脑·软件/[软件]Microsoft软件&服务大搜罗.md";
  slug: "电脑软件/软件microsoft软件服务大搜罗";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"电脑·软件/[软件]iDown—可以下载在线影音的万能下载器(已更新).md": {
	id: "电脑·软件/[软件]iDown—可以下载在线影音的万能下载器(已更新).md";
  slug: "电脑软件/软件idown可以下载在线影音的万能下载器已更新";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"电脑·软件/[软件]另类音乐播放器Airplay及相关软件.md": {
	id: "电脑·软件/[软件]另类音乐播放器Airplay及相关软件.md";
  slug: "电脑软件/软件另类音乐播放器airplay及相关软件";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"电脑·软件/[软件]将U盘打造成一个便携的软件平台.md": {
	id: "电脑·软件/[软件]将U盘打造成一个便携的软件平台.md";
  slug: "电脑软件/软件将u盘打造成一个便携的软件平台";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"电脑·软件/[软件]戒网助手—Freedom.md": {
	id: "电脑·软件/[软件]戒网助手—Freedom.md";
  slug: "电脑软件/软件戒网助手freedom";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"电脑·软件/[软件]福昕pdf阅读器5.0(英文版)，有福利.md": {
	id: "电脑·软件/[软件]福昕pdf阅读器5.0(英文版)，有福利.md";
  slug: "电脑软件/软件福昕pdf阅读器50英文版有福利";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"电脑·软件/[软件]谷歌浏览器之各个版本下载.md": {
	id: "电脑·软件/[软件]谷歌浏览器之各个版本下载.md";
  slug: "电脑软件/软件谷歌浏览器之各个版本下载";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"电脑·软件/[软件]迅雷7优化精简版，突破高速通道限制（含VC库文件下载）.md": {
	id: "电脑·软件/[软件]迅雷7优化精简版，突破高速通道限制（含VC库文件下载）.md";
  slug: "电脑软件/软件迅雷7优化精简版突破高速通道限制含vc库文件下载";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"知识分享/[学习笔记]关于字体及字符的小思考.md": {
	id: "知识分享/[学习笔记]关于字体及字符的小思考.md";
  slug: "知识分享/学习笔记关于字体及字符的小思考";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"知识分享/[学习笔记]博客重启更新.md": {
	id: "知识分享/[学习笔记]博客重启更新.md";
  slug: "知识分享/学习笔记博客重启更新";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"知识分享/[学习笔记]在浏览器中控制百度网盘播放速度.md": {
	id: "知识分享/[学习笔记]在浏览器中控制百度网盘播放速度.md";
  slug: "知识分享/学习笔记在浏览器中控制百度网盘播放速度";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"知识分享/[学习笔记]如何获取图片上某个像素点的颜色值.md": {
	id: "知识分享/[学习笔记]如何获取图片上某个像素点的颜色值.md";
  slug: "知识分享/学习笔记如何获取图片上某个像素点的颜色值";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"童话/[童话]王尔德—《快乐王子》.md": {
	id: "童话/[童话]王尔德—《快乐王子》.md";
  slug: "童话/童话王尔德快乐王子";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"童话/[童话]王尔德—《打鱼人和他的灵魂》(缩写版).md": {
	id: "童话/[童话]王尔德—《打鱼人和他的灵魂》(缩写版).md";
  slug: "童话/童话王尔德打鱼人和他的灵魂缩写版";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"箴言/[箴言]心如兰花.md": {
	id: "箴言/[箴言]心如兰花.md";
  slug: "箴言/箴言心如兰花";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"网站建设/[建站]Wordpress for 新浪SAE 免插件实现评论邮件提醒.md": {
	id: "网站建设/[建站]Wordpress for 新浪SAE 免插件实现评论邮件提醒.md";
  slug: "网站建设/建站wordpress-for-新浪sae-免插件实现评论邮件提醒";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"网站建设/[建站]blog.cd博客绑定.tk域名并使用DnsPod解析域名教程.md": {
	id: "网站建设/[建站]blog.cd博客绑定.tk域名并使用DnsPod解析域名教程.md";
  slug: "网站建设/建站blogcd博客绑定tk域名并使用dnspod解析域名教程";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"网站建设/[建站]为自己的网站在Chrome中添加语音输入.md": {
	id: "网站建设/[建站]为自己的网站在Chrome中添加语音输入.md";
  slug: "网站建设/建站为自己的网站在chrome中添加语音输入";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"网站建设/[建站]博客域名已重定向至blog.evecalm.com.md": {
	id: "网站建设/[建站]博客域名已重定向至blog.evecalm.com.md";
  slug: "网站建设/建站博客域名已重定向至blogevecalmcom";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"网站建设/[建站]博客网站减少垃圾留言的简单办法.md": {
	id: "网站建设/[建站]博客网站减少垃圾留言的简单办法.md";
  slug: "网站建设/建站博客网站减少垃圾留言的简单办法";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"网站建设/[建站]网站免费备案教程.md": {
	id: "网站建设/[建站]网站免费备案教程.md";
  slug: "网站建设/建站网站免费备案教程";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"网站建设/[建站]网站建设之主机-一元精品主机.md": {
	id: "网站建设/[建站]网站建设之主机-一元精品主机.md";
  slug: "网站建设/建站网站建设之主机-一元精品主机";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"网站建设/[建站]网站建设之域名申请.md": {
	id: "网站建设/[建站]网站建设之域名申请.md";
  slug: "网站建设/建站网站建设之域名申请";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"网站建设/[建站]网站迁移至新浪SAE.md": {
	id: "网站建设/[建站]网站迁移至新浪SAE.md";
  slug: "网站建设/建站网站迁移至新浪sae";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"网站建设/[建站]自定义微博来源，巧用微博增加网站流量.md": {
	id: "网站建设/[建站]自定义微博来源，巧用微博增加网站流量.md";
  slug: "网站建设/建站自定义微博来源巧用微博增加网站流量";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"美文欣赏/[诗]关于《夏末》小诗两首.md": {
	id: "美文欣赏/[诗]关于《夏末》小诗两首.md";
  slug: "美文欣赏/诗关于夏末小诗两首";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"美文欣赏/[诗]关于爱--莎士比亚.md": {
	id: "美文欣赏/[诗]关于爱--莎士比亚.md";
  slug: "美文欣赏/诗关于爱--莎士比亚";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"美文欣赏/[诗]如果生命只是一抹尘埃.md": {
	id: "美文欣赏/[诗]如果生命只是一抹尘埃.md";
  slug: "美文欣赏/诗如果生命只是一抹尘埃";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"美文欣赏/[诗]流浪的理想.md": {
	id: "美文欣赏/[诗]流浪的理想.md";
  slug: "美文欣赏/诗流浪的理想";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
"美文欣赏/[诗]雪莱—《致——》.md": {
	id: "美文欣赏/[诗]雪莱—《致——》.md";
  slug: "美文欣赏/诗雪莱致";
  body: string;
  collection: "archived";
  data: any
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = never;
}
