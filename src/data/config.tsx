export const load_mode = "online"

export const IMAGE_URL = {
    "study": "https://pic.imgdb.cn/item/66f5847cf21886ccc0337d8e.png",
    "add": "https://pic.imgdb.cn/item/670e8530d29ded1a8c62318e.png",
    "monkey": "https://pic.imgdb.cn/item/66f584d4f21886ccc033d91a.png",
    "housework": "https://pic.imgdb.cn/item/66f66e75f21886ccc0f4977c.png",
    "sport": "https://pic.imgdb.cn/item/66f66ec3f21886ccc0f4d9f7.png",
    "achieve_icon": "https://pic.imgdb.cn/item/67089147d29ded1a8c59aa71.png",
    "sport_icon": "https://pic.imgdb.cn/item/670894a7d29ded1a8c5d58ea.png",
    "housework_icon": "https://pic.imgdb.cn/item/67089574d29ded1a8c5e5de5.png",
    "study_icon": "https://pic.imgdb.cn/item/670895b6d29ded1a8c5e9763.png",
    "setting_icon": "https://pic.imgdb.cn/item/670e866cd29ded1a8c6366ab.png",
    "exchange_record_icon": "https://pic.imgdb.cn/item/670e9361d29ded1a8c6f958d.png",
    "task_record_icon": "https://pic.imgdb.cn/item/670e9563d29ded1a8c714f2b.png",
    "coming_soon":"https://pic.imgdb.cn/item/670fde6cd29ded1a8c682f82.webp",
    "housework_badge": "https://pic.imgdb.cn/item/6714ad48d29ded1a8c67be10.png",
    "study_badge": "https://pic.imgdb.cn/item/6714ad48d29ded1a8c67be34.png",
    "sport_badge": "https://pic.imgdb.cn/item/6714ad48d29ded1a8c67be44.png",
    "omission": "https://pic.imgdb.cn/item/6714b0c8d29ded1a8c701915.png",
    "AI_brain": "https://pic.imgdb.cn/item/6714b4d0d29ded1a8c76875a.png",
    "calculator": "https://pic.imgdb.cn/item/6714b526d29ded1a8c76d3df.png",
    "common_tool": "https://pic.imgdb.cn/item/6714b5c5d29ded1a8c77659b.png",
    "translation": "https://pic.imgdb.cn/item/6714bbcfd29ded1a8c814953.png",
    "gold": "https://pic.imgdb.cn/item/671508f9d29ded1a8c0bd320.png",
    "cookbook": "https://pic.imgdb.cn/item/6730c5efd29ded1a8ca026ce.png",
    "not_auth": "https://pic.imgdb.cn/item/6718f46dd29ded1a8cf1d6a2.png",  // 未登录头像
    "un-login": "https://pic.imgdb.cn/item/672cd0a9d29ded1a8c526258.png",  // 未登录页面插画
    "shop_manage_icon": "https://pic.imgdb.cn/item/67376561d29ded1a8cd9362d.png",
    "rule_manage_icon": "https://pic.imgdb.cn/item/673800ecd29ded1a8c3f4b3c.png"
}

export const COMMON_ROUTER = [
    {
        key: "exchange_record",
        label: "兑换记录",
        icon: IMAGE_URL["exchange_record_icon"]
    },
    {
        key: "task_record",
        label: "任务记录",
        icon: IMAGE_URL["task_record_icon"]
    },
    {
        key: "shop_manage",
        label: "商品管理",
        icon: IMAGE_URL["shop_manage_icon"]
    },
    {
        key: "game_rule",
        label: "游戏规则",
        icon: IMAGE_URL["rule_manage_icon"]
    },
 
]

export const MAX_UPLOAD_COUNT = 5

export const CATEGORY = [
    {
        key: "study",
        label: "学习",
        description: "每日打卡学习，获取积分",
        img: IMAGE_URL["study"],
        point: 0.2
    },
    {
        key: "housework",
        label: "家务",
        description: "帮助父母分担家务，获取积分",
        img: IMAGE_URL["housework"],
        point: 0.2
    },
    {
        key: "sport",
        label: "运动",
        description: "每日打卡运动，提高自身免疫力",
        img: IMAGE_URL["sport"],
        point: 0.2
    }
]

export const theme = {
    "primary1": "#508AB2"
}


// 成就列表渲染的个数
export const ACHIEVEMENT_AVALIABLE_COUNT = 5

export const taskTabData = [
    {
        key: 0,
        label: "任务类别",
        keyName: "category"
    },
    {
        key: 1,
        label: "待审核",
        keyName: "approval"
    },
    {
        key: 2,
        label: "已完成",
        keyName: "done"
    },
    {
        key: 3,
        label: "审核失败",
        keyName: "fail"
    }
]

export const workerRole = "monkey"
export const monitorRole = "monitor"