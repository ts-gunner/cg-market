
export default defineAppConfig({
    tabBar: {
        color: "#b2ebf2",
        selectedColor: "#ffffff",
        backgroundColor: "#508AB2",
        list: [
            {
                pagePath: "pages/tasks/index",
                iconPath: "images/task.png",
                selectedIconPath: "images/task-active.png",
                text: "任务清单"
            },
            {
                pagePath: "pages/shop/index",
                iconPath: "images/shop.png",
                selectedIconPath: "images/shop-active.png",
                text: "积分超市"
            },
            {
                pagePath: "pages/toolbox/index",
                iconPath: "images/toolbox.png",
                selectedIconPath: "images/toolbox-active.png",
                text: "工具箱"
            },
            {
                pagePath: "pages/mine/index",
                iconPath: "images/mine.png",
                selectedIconPath: "images/mine-active.png",
                text: "我的"
            }
        ]
    },
    entryPagePath: "pages/tasks/index",
    pages: [
        "pages/shop/index", 'pages/mine/index', "pages/tasks/index",
        "pages/taskDetail/index", "pages/toolbox/index"
    ],
    window: {
        navigationBarTitleText: '成果集市',
        navigationBarBackgroundColor: '#ffffff',
        navigationBarTextStyle: "black"
    },
    lazyCodeLoading: "requiredComponents",
    requiredBackgroundModes: []
})
