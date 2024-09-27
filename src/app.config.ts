
export default defineAppConfig({
    tabBar: {
        color: "#b2ebf2",
        selectedColor: "#ffffff",
        backgroundColor: "#009688",
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
                selectedIconPath: "images/shop.png",
                text: "积分超市"
            },
            {
                pagePath: "pages/home/index",
                iconPath: "images/mine.png",
                selectedIconPath: "images/mine.png",
                text: "我的"
            }
        ]
    },
    entryPagePath: "pages/tasks/index",
    pages: [
        "pages/shop/index", 'pages/home/index', "pages/tasks/index",
        "pages/taskDetail/index"
    ],
    window: {
        navigationBarTitleText: '成果集市',
        navigationBarBackgroundColor: '#ffffff',
        navigationBarTextStyle: "black"
    },
    lazyCodeLoading: "requiredComponents",
    requiredBackgroundModes: []
})
