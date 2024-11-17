// const PREFIX_URL = "http://localhost:8443"
const PREFIX_URL = "http://119.29.235.186:8443"

export const routes = {
    login: `${PREFIX_URL}/user/wechat/login`,
    saveProfile: `${PREFIX_URL}/user/wechat/save_profile`,
    getUserProfile: `${PREFIX_URL}/user/wechat/get_user_info`,
    addTask: `${PREFIX_URL}/task/wechat/add_task`,
    uploadAttachment: `${PREFIX_URL}/files/wechat/upload_attachment`,
    getTaskList: `${PREFIX_URL}/task/wechat/get_tasks`,
    getTaskObject: `${PREFIX_URL}/task/wechat/get_task`,
    getShopProfile: `${PREFIX_URL}/shop/wechat/get_shop_profile`,
    getWorkerRecord: `${PREFIX_URL}/task/wechat/get_worker_record`,
    auditTask: `${PREFIX_URL}/task/wechat/audit_task`,
}