import { Request, Response } from 'express';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

async function getFakeCaptcha(req: Request, res: Response) {
  await waitTime(2000);
  return res.json('captcha-xxx');
}

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env;

/**
 * 当前用户的权限，如果为空代表没登录
 * current user access， if is '', user need login
 * 如果是 pro 的预览，默认是有权限的
 */
let access = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site' ? 'admin' : '';

const getAccess = () => {
  return access;
};

// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
  // 支持值为 Object 和 Array
  'GET /api/currentUser': (req: Request, res: Response) => {
    if (!getAccess()) {
      res.status(401).send({
        data: {
          isLogin: false,
        },
        errorCode: '401',
        errorMessage: '请先登录！',
        success: true,
      });
      return;
    }
    res.send({
      name: 'Serati Ma',
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      userid: '00000001',
      email: 'antdesign@alipay.com',
      signature: '海纳百川，有容乃大',
      title: '交互专家',
      group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
      tags: [
        {
          key: '0',
          label: '很有想法的',
        },
        {
          key: '1',
          label: '专注设计',
        },
        {
          key: '2',
          label: '辣~',
        },
        {
          key: '3',
          label: '大长腿',
        },
        {
          key: '4',
          label: '川妹子',
        },
        {
          key: '5',
          label: '海纳百川',
        },
      ],
      notifyCount: 12,
      unreadCount: 11,
      country: 'China',
      access: getAccess(),
      geographic: {
        province: {
          label: '浙江省',
          key: '330000',
        },
        city: {
          label: '杭州市',
          key: '330100',
        },
      },
      address: '西湖区工专路 77 号',
      phone: '0752-268888888',
    });
  },
  // GET POST 可省略
//   'GET /api/users': [
//     {
//       key: '1',
//       name: 'John Brown',
//       age: 32,
//       address: 'New York No. 1 Lake Park',
//     },
//     {
//       key: '2',
//       name: 'Jim Green',
//       age: 42,
//       address: 'London No. 1 Lake Park',
//     },
//     {
//       key: '3',
//       name: 'Joe Black',
//       age: 32,
//       address: 'Sidney No. 1 Lake Park',
//     },
//   ],
'GET /api/users': {
    code: 0,
    data: {
      data: [
        { id: '1', customerId: 1, customerName: '上海尚房信息科技有限公司', businessLineName: '上海营销中心', area: '江苏省,苏州市,姑苏区', areaCode: ['china', 'shanghai', 'baoshan'], serviceStatus: '1', serviceStatusName: '待接受', productName: '微盟商城 - 正式版', productId: '123456', freezeStatusName: '未冻结', lastOpenTime: 1604287510493, afterSaleTime: '2020-10-13 18:00:00', serviceStartTime: '2020年10月13日', serviceEndTime: '2020年12月13日', assignToServiceTime: '2020-10-13 18:00:00', buildTaskStartTime: '2020-10-13 18:00:00', buildTaskEndTime: '2020-10-13 18:00:00', serviceDays: '100', lastAssignTime: '2020-10-13 18:00:00', countReject: 100, rejectReason: '驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回', deliveryConsultantNo: 'wentao.hou', deliveryConsultantName: '侯文涛', buildOperatorNo: 'wentao.hou', buildOperatorName: '侯文涛', saleNo: 'wentao.hou', saleName: '侯文涛', orderItemId: 'a1', taskId: 'task1' },
        { id: '2', customerId: 2, customerName: '上海尚房信息科技有限公司', businessLineName: '上海营销中心', area: '江苏省,苏州市,姑苏区', areaCode: ['china', 'shanghai', 'baoshan'], serviceStatus: '2', serviceStatusName: '待搭建', productName: '微盟商城 - 正式版', productId: '123456', freezeStatusName: '未冻结', lastOpenTime: 1604287510493, afterSaleTime: '2020-10-13 18:00:00', serviceStartTime: '2020年10月13日', serviceEndTime: '2020年12月13日', assignToServiceTime: '2020-10-13 18:00:00', buildTaskStartTime: '2020-10-13 18:00:00', buildTaskEndTime: '2020-10-13 18:00:00', serviceDays: '100', lastAssignTime: '2020-10-13 18:00:00', countReject: 100, rejectReason: '驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回', deliveryConsultantNo: 'wentao.hou', deliveryConsultantName: '侯文涛', buildOperatorNo: 'wentao.hou', buildOperatorName: '侯文涛', saleNo: 'wentao.hou', saleName: '侯文涛', orderItemId: 'a2', taskId: 'task2' },
        { id: '3', customerId: 3, customerName: '上海尚房信息科技有限公司', businessLineName: '上海营销中心', area: '江苏省,苏州市,姑苏区', areaCode: ['china', 'shanghai', 'baoshan'], serviceStatus: '3', serviceStatusName: '搭建中', productName: '微盟商城 - 正式版', productId: '123456', freezeStatusName: '未冻结', lastOpenTime: 1604287510493, afterSaleTime: '2020-10-13 18:00:00', serviceStartTime: '2020年10月13日', serviceEndTime: '2020年12月13日', assignToServiceTime: '2020-10-13 18:00:00', buildTaskStartTime: '2020-10-13 18:00:00', buildTaskEndTime: '2020-10-13 18:00:00', serviceDays: '100', lastAssignTime: '2020-10-13 18:00:00', countReject: 100, rejectReason: '驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回', deliveryConsultantNo: 'wentao.hou', deliveryConsultantName: '侯文涛', buildOperatorNo: 'wentao.hou', buildOperatorName: '侯文涛', saleNo: 'wentao.hou', saleName: '侯文涛', orderItemId: 'a3', taskId: 'task3' },
        { id: '4', customerId: 4, customerName: '上海尚房信息科技有限公司', businessLineName: '上海营销中心', area: '江苏省,苏州市,姑苏区', areaCode: ['china', 'shanghai', 'baoshan'], serviceStatus: '4', serviceStatusName: '待确认', productName: '微盟商城 - 正式版', productId: '123456', freezeStatusName: '未冻结', lastOpenTime: 1604287510493, afterSaleTime: '2020-10-13 18:00:00', serviceStartTime: '2020年10月13日', serviceEndTime: '2020年12月13日', assignToServiceTime: '2020-10-13 18:00:00', buildTaskStartTime: '2020-10-13 18:00:00', buildTaskEndTime: '2020-10-13 18:00:00', serviceDays: '100', lastAssignTime: '2020-10-13 18:00:00', countReject: 100, rejectReason: '驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回', deliveryConsultantNo: 'wentao.hou', deliveryConsultantName: '侯文涛', buildOperatorNo: 'wentao.hou', buildOperatorName: '侯文涛', saleNo: 'wentao.hou', saleName: '侯文涛', orderItemId: 'a4', taskId: 'task4' },
        { id: '5', customerId: 5, customerName: '上海尚房信息科技有限公司', businessLineName: '上海营销中心', area: '江苏省,苏州市,姑苏区', areaCode: ['china', 'shanghai', 'baoshan'], serviceStatus: '5', serviceStatusName: '待上线', productName: '微盟商城 - 正式版', productId: '123456', freezeStatusName: '未冻结', lastOpenTime: 1604287510493, afterSaleTime: '2020-10-13 18:00:00', serviceStartTime: '2020年10月13日', serviceEndTime: '2020年12月13日', assignToServiceTime: '2020-10-13 18:00:00', buildTaskStartTime: '2020-10-13 18:00:00', buildTaskEndTime: '2020-10-13 18:00:00', serviceDays: '100', lastAssignTime: '2020-10-13 18:00:00', countReject: 100, rejectReason: '驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回', deliveryConsultantNo: 'wentao.hou', deliveryConsultantName: '侯文涛', buildOperatorNo: 'wentao.hou', buildOperatorName: '侯文涛', saleNo: 'wentao.hou', saleName: '侯文涛', orderItemId: 'a5', taskId: 'task5' },
        { id: '6', customerId: 6, customerName: '上海尚房信息科技有限公司', businessLineName: '上海营销中心', area: '江苏省,苏州市,姑苏区', areaCode: ['china', 'shanghai', 'baoshan'], serviceStatus: '6', serviceStatusName: '验收驳回', productName: '微盟商城 - 正式版', productId: '123456', freezeStatusName: '未冻结', lastOpenTime: 1604287510493, afterSaleTime: '2020-10-13 18:00:00', serviceStartTime: '2020年10月13日', serviceEndTime: '2020年12月13日', assignToServiceTime: '2020-10-13 18:00:00', buildTaskStartTime: '2020-10-13 18:00:00', buildTaskEndTime: '2020-10-13 18:00:00', serviceDays: '100', lastAssignTime: '2020-10-13 18:00:00', countReject: 100, rejectReason: '驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回', deliveryConsultantNo: 'wentao.hou', deliveryConsultantName: '侯文涛', buildOperatorNo: 'wentao.hou', buildOperatorName: '侯文涛', saleNo: 'wentao.hou', saleName: '侯文涛', orderItemId: 'a6', taskId: 'task6' },
        { id: '7', customerId: 7, customerName: '上海尚房信息科技有限公司', businessLineName: '上海营销中心', area: '江苏省,苏州市,姑苏区', areaCode: ['china', 'shanghai', 'baoshan'], serviceStatus: '1', serviceStatusName: '待接受', productName: '微盟商城 - 正式版', productId: '123456', freezeStatusName: '未冻结', lastOpenTime: 1604287510493, afterSaleTime: '2020-10-13 18:00:00', serviceStartTime: '2020年10月13日', serviceEndTime: '2020年12月13日', assignToServiceTime: '2020-10-13 18:00:00', buildTaskStartTime: '2020-10-13 18:00:00', buildTaskEndTime: '2020-10-13 18:00:00', serviceDays: '100', lastAssignTime: '2020-10-13 18:00:00', countReject: 100, rejectReason: '驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回', deliveryConsultantNo: 'wentao.hou', deliveryConsultantName: '侯文涛', buildOperatorNo: 'wentao.hou', buildOperatorName: '侯文涛', saleNo: 'wentao.hou', saleName: '侯文涛', orderItemId: 'a1', taskId: 'task1' },
        { id: '8', customerId: 8, customerName: '上海尚房信息科技有限公司', businessLineName: '上海营销中心', area: '江苏省,苏州市,姑苏区', areaCode: ['china', 'shanghai', 'baoshan'], serviceStatus: '2', serviceStatusName: '待搭建', productName: '微盟商城 - 正式版', productId: '123456', freezeStatusName: '未冻结', lastOpenTime: 1604287510493, afterSaleTime: '2020-10-13 18:00:00', serviceStartTime: '2020年10月13日', serviceEndTime: '2020年12月13日', assignToServiceTime: '2020-10-13 18:00:00', buildTaskStartTime: '2020-10-13 18:00:00', buildTaskEndTime: '2020-10-13 18:00:00', serviceDays: '100', lastAssignTime: '2020-10-13 18:00:00', countReject: 100, rejectReason: '驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回', deliveryConsultantNo: 'wentao.hou', deliveryConsultantName: '侯文涛', buildOperatorNo: 'wentao.hou', buildOperatorName: '侯文涛', saleNo: 'wentao.hou', saleName: '侯文涛', orderItemId: 'a2', taskId: 'task2' },
        { id: '9', customerId: 9, customerName: '上海尚房信息科技有限公司', businessLineName: '上海营销中心', area: '江苏省,苏州市,姑苏区', areaCode: ['china', 'shanghai', 'baoshan'], serviceStatus: '3', serviceStatusName: '搭建中', productName: '微盟商城 - 正式版', productId: '123456', freezeStatusName: '未冻结', lastOpenTime: 1604287510493, afterSaleTime: '2020-10-13 18:00:00', serviceStartTime: '2020年10月13日', serviceEndTime: '2020年12月13日', assignToServiceTime: '2020-10-13 18:00:00', buildTaskStartTime: '2020-10-13 18:00:00', buildTaskEndTime: '2020-10-13 18:00:00', serviceDays: '100', lastAssignTime: '2020-10-13 18:00:00', countReject: 100, rejectReason: '驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回', deliveryConsultantNo: 'wentao.hou', deliveryConsultantName: '侯文涛', buildOperatorNo: 'wentao.hou', buildOperatorName: '侯文涛', saleNo: 'wentao.hou', saleName: '侯文涛', orderItemId: 'a3', taskId: 'task3' },
        { id: '10', customerId: 10, customerName: '上海尚房信息科技有限公司', businessLineName: '上海营销中心', area: '江苏省,苏州市,姑苏区', areaCode: ['china', 'shanghai', 'baoshan'], serviceStatus: '4', serviceStatusName: '待确认', productName: '微盟商城 - 正式版', productId: '123456', freezeStatusName: '未冻结', lastOpenTime: 1604287510493, afterSaleTime: '2020-10-13 18:00:00', serviceStartTime: '2020年10月13日', serviceEndTime: '2020年12月13日', assignToServiceTime: '2020-10-13 18:00:00', buildTaskStartTime: '2020-10-13 18:00:00', buildTaskEndTime: '2020-10-13 18:00:00', serviceDays: '100', lastAssignTime: '2020-10-13 18:00:00', countReject: 100, rejectReason: '驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回', deliveryConsultantNo: 'wentao.hou', deliveryConsultantName: '侯文涛', buildOperatorNo: 'wentao.hou', buildOperatorName: '侯文涛', saleNo: 'wentao.hou', saleName: '侯文涛', orderItemId: 'a4', taskId: 'task4' },
        { id: '11', customerId: 11, customerName: '上海尚房信息科技有限公司', businessLineName: '上海营销中心', area: '江苏省,苏州市,姑苏区', areaCode: ['china', 'shanghai', 'baoshan'], serviceStatus: '5', serviceStatusName: '待上线', productName: '微盟商城 - 正式版', productId: '123456', freezeStatusName: '未冻结', lastOpenTime: 1604287510493, afterSaleTime: '2020-10-13 18:00:00', serviceStartTime: '2020年10月13日', serviceEndTime: '2020年12月13日', assignToServiceTime: '2020-10-13 18:00:00', buildTaskStartTime: '2020-10-13 18:00:00', buildTaskEndTime: '2020-10-13 18:00:00', serviceDays: '100', lastAssignTime: '2020-10-13 18:00:00', countReject: 100, rejectReason: '驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回', deliveryConsultantNo: 'wentao.hou', deliveryConsultantName: '侯文涛', buildOperatorNo: 'wentao.hou', buildOperatorName: '侯文涛', saleNo: 'wentao.hou', saleName: '侯文涛', orderItemId: 'a5', taskId: 'task5' },
        { id: '12', customerId: 12, customerName: '上海尚房信息科技有限公司', businessLineName: '上海营销中心', area: '江苏省,苏州市,姑苏区', areaCode: ['china', 'shanghai', 'baoshan'], serviceStatus: '6', serviceStatusName: '验收驳回', productName: '微盟商城 - 正式版', productId: '123456', freezeStatusName: '未冻结', lastOpenTime: 1604287510493, afterSaleTime: '2020-10-13 18:00:00', serviceStartTime: '2020年10月13日', serviceEndTime: '2020年12月13日', assignToServiceTime: '2020-10-13 18:00:00', buildTaskStartTime: '2020-10-13 18:00:00', buildTaskEndTime: '2020-10-13 18:00:00', serviceDays: '100', lastAssignTime: '2020-10-13 18:00:00', countReject: 100, rejectReason: '驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回', deliveryConsultantNo: 'wentao.hou', deliveryConsultantName: '侯文涛', buildOperatorNo: 'wentao.hou', buildOperatorName: '侯文涛', saleNo: 'wentao.hou', saleName: '侯文涛', orderItemId: 'a6', taskId: 'task6' },
        { id: '13', customerId: 13, customerName: '上海尚房信息科技有限公司', businessLineName: '上海营销中心', area: '江苏省,苏州市,姑苏区', areaCode: ['china', 'shanghai', 'baoshan'], serviceStatus: '1', serviceStatusName: '待接受', productName: '微盟商城 - 正式版', productId: '123456', freezeStatusName: '未冻结', lastOpenTime: 1604287510493, afterSaleTime: '2020-10-13 18:00:00', serviceStartTime: '2020年10月13日', serviceEndTime: '2020年12月13日', assignToServiceTime: '2020-10-13 18:00:00', buildTaskStartTime: '2020-10-13 18:00:00', buildTaskEndTime: '2020-10-13 18:00:00', serviceDays: '100', lastAssignTime: '2020-10-13 18:00:00', countReject: 100, rejectReason: '驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回', deliveryConsultantNo: 'wentao.hou', deliveryConsultantName: '侯文涛', buildOperatorNo: 'wentao.hou', buildOperatorName: '侯文涛', saleNo: 'wentao.hou', saleName: '侯文涛', orderItemId: 'a1', taskId: 'task1' },
        { id: '14', customerId: 14, customerName: '上海尚房信息科技有限公司', businessLineName: '上海营销中心', area: '江苏省,苏州市,姑苏区', areaCode: ['china', 'shanghai', 'baoshan'], serviceStatus: '2', serviceStatusName: '待搭建', productName: '微盟商城 - 正式版', productId: '123456', freezeStatusName: '未冻结', lastOpenTime: 1604287510493, afterSaleTime: '2020-10-13 18:00:00', serviceStartTime: '2020年10月13日', serviceEndTime: '2020年12月13日', assignToServiceTime: '2020-10-13 18:00:00', buildTaskStartTime: '2020-10-13 18:00:00', buildTaskEndTime: '2020-10-13 18:00:00', serviceDays: '100', lastAssignTime: '2020-10-13 18:00:00', countReject: 100, rejectReason: '驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回', deliveryConsultantNo: 'wentao.hou', deliveryConsultantName: '侯文涛', buildOperatorNo: 'wentao.hou', buildOperatorName: '侯文涛', saleNo: 'wentao.hou', saleName: '侯文涛', orderItemId: 'a2', taskId: 'task2' },
        { id: '15', customerId: 15, customerName: '上海尚房信息科技有限公司', businessLineName: '上海营销中心', area: '江苏省,苏州市,姑苏区', areaCode: ['china', 'shanghai', 'baoshan'], serviceStatus: '3', serviceStatusName: '搭建中', productName: '微盟商城 - 正式版', productId: '123456', freezeStatusName: '未冻结', lastOpenTime: 1604287510493, afterSaleTime: '2020-10-13 18:00:00', serviceStartTime: '2020年10月13日', serviceEndTime: '2020年12月13日', assignToServiceTime: '2020-10-13 18:00:00', buildTaskStartTime: '2020-10-13 18:00:00', buildTaskEndTime: '2020-10-13 18:00:00', serviceDays: '100', lastAssignTime: '2020-10-13 18:00:00', countReject: 100, rejectReason: '驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回', deliveryConsultantNo: 'wentao.hou', deliveryConsultantName: '侯文涛', buildOperatorNo: 'wentao.hou', buildOperatorName: '侯文涛', saleNo: 'wentao.hou', saleName: '侯文涛', orderItemId: 'a3', taskId: 'task3' },
        { id: '16', customerId: 16, customerName: '上海尚房信息科技有限公司', businessLineName: '上海营销中心', area: '江苏省,苏州市,姑苏区', areaCode: ['china', 'shanghai', 'baoshan'], serviceStatus: '4', serviceStatusName: '待确认', productName: '微盟商城 - 正式版', productId: '123456', freezeStatusName: '未冻结', lastOpenTime: 1604287510493, afterSaleTime: '2020-10-13 18:00:00', serviceStartTime: '2020年10月13日', serviceEndTime: '2020年12月13日', assignToServiceTime: '2020-10-13 18:00:00', buildTaskStartTime: '2020-10-13 18:00:00', buildTaskEndTime: '2020-10-13 18:00:00', serviceDays: '100', lastAssignTime: '2020-10-13 18:00:00', countReject: 100, rejectReason: '驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回', deliveryConsultantNo: 'wentao.hou', deliveryConsultantName: '侯文涛', buildOperatorNo: 'wentao.hou', buildOperatorName: '侯文涛', saleNo: 'wentao.hou', saleName: '侯文涛', orderItemId: 'a4', taskId: 'task4' },
        { id: '17', customerId: 17, customerName: '上海尚房信息科技有限公司', businessLineName: '上海营销中心', area: '江苏省,苏州市,姑苏区', areaCode: ['china', 'shanghai', 'baoshan'], serviceStatus: '5', serviceStatusName: '待上线', productName: '微盟商城 - 正式版', productId: '123456', freezeStatusName: '未冻结', lastOpenTime: 1604287510493, afterSaleTime: '2020-10-13 18:00:00', serviceStartTime: '2020年10月13日', serviceEndTime: '2020年12月13日', assignToServiceTime: '2020-10-13 18:00:00', buildTaskStartTime: '2020-10-13 18:00:00', buildTaskEndTime: '2020-10-13 18:00:00', serviceDays: '100', lastAssignTime: '2020-10-13 18:00:00', countReject: 100, rejectReason: '驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回', deliveryConsultantNo: 'wentao.hou', deliveryConsultantName: '侯文涛', buildOperatorNo: 'wentao.hou', buildOperatorName: '侯文涛', saleNo: 'wentao.hou', saleName: '侯文涛', orderItemId: 'a5', taskId: 'task5' },
        { id: '18', customerId: 18, customerName: '上海尚房信息科技有限公司', businessLineName: '上海营销中心', area: '江苏省,苏州市,姑苏区', areaCode: ['china', 'shanghai', 'baoshan'], serviceStatus: '6', serviceStatusName: '验收驳回', productName: '微盟商城 - 正式版', productId: '123456', freezeStatusName: '未冻结', lastOpenTime: 1604287510493, afterSaleTime: '2020-10-13 18:00:00', serviceStartTime: '2020年10月13日', serviceEndTime: '2020年12月13日', assignToServiceTime: '2020-10-13 18:00:00', buildTaskStartTime: '2020-10-13 18:00:00', buildTaskEndTime: '2020-10-13 18:00:00', serviceDays: '100', lastAssignTime: '2020-10-13 18:00:00', countReject: 100, rejectReason: '驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回', deliveryConsultantNo: 'wentao.hou', deliveryConsultantName: '侯文涛', buildOperatorNo: 'wentao.hou', buildOperatorName: '侯文涛', saleNo: 'wentao.hou', saleName: '侯文涛', orderItemId: 'a6', taskId: 'task6' },
        { id: '19', customerId: 19, customerName: '上海尚房信息科技有限公司', businessLineName: '上海营销中心', area: '江苏省,苏州市,姑苏区', areaCode: ['china', 'shanghai', 'baoshan'], serviceStatus: '1', serviceStatusName: '待接受', productName: '微盟商城 - 正式版', productId: '123456', freezeStatusName: '未冻结', lastOpenTime: 1604287510493, afterSaleTime: '2020-10-13 18:00:00', serviceStartTime: '2020年10月13日', serviceEndTime: '2020年12月13日', assignToServiceTime: '2020-10-13 18:00:00', buildTaskStartTime: '2020-10-13 18:00:00', buildTaskEndTime: '2020-10-13 18:00:00', serviceDays: '100', lastAssignTime: '2020-10-13 18:00:00', countReject: 100, rejectReason: '驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回', deliveryConsultantNo: 'wentao.hou', deliveryConsultantName: '侯文涛', buildOperatorNo: 'wentao.hou', buildOperatorName: '侯文涛', saleNo: 'wentao.hou', saleName: '侯文涛', orderItemId: 'a1', taskId: 'task1' },
        { id: '20', customerId: 20, customerName: '上海尚房信息科技有限公司', businessLineName: '上海营销中心', area: '江苏省,苏州市,姑苏区', areaCode: ['china', 'shanghai', 'baoshan'], serviceStatus: '2', serviceStatusName: '待搭建', productName: '微盟商城 - 正式版', productId: '123456', freezeStatusName: '未冻结', lastOpenTime: 1604287510493, afterSaleTime: '2020-10-13 18:00:00', serviceStartTime: '2020年10月13日', serviceEndTime: '2020年12月13日', assignToServiceTime: '2020-10-13 18:00:00', buildTaskStartTime: '2020-10-13 18:00:00', buildTaskEndTime: '2020-10-13 18:00:00', serviceDays: '100', lastAssignTime: '2020-10-13 18:00:00', countReject: 100, rejectReason: '驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回', deliveryConsultantNo: 'wentao.hou', deliveryConsultantName: '侯文涛', buildOperatorNo: 'wentao.hou', buildOperatorName: '侯文涛', saleNo: 'wentao.hou', saleName: '侯文涛', orderItemId: 'a2', taskId: 'task2' },
        { id: '21', customerId: 21, customerName: '上海尚房信息科技有限公司', businessLineName: '上海营销中心', area: '江苏省,苏州市,姑苏区', areaCode: ['china', 'shanghai', 'baoshan'], serviceStatus: '3', serviceStatusName: '搭建中', productName: '微盟商城 - 正式版', productId: '123456', freezeStatusName: '未冻结', lastOpenTime: 1604287510493, afterSaleTime: '2020-10-13 18:00:00', serviceStartTime: '2020年10月13日', serviceEndTime: '2020年12月13日', assignToServiceTime: '2020-10-13 18:00:00', buildTaskStartTime: '2020-10-13 18:00:00', buildTaskEndTime: '2020-10-13 18:00:00', serviceDays: '100', lastAssignTime: '2020-10-13 18:00:00', countReject: 100, rejectReason: '驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回', deliveryConsultantNo: 'wentao.hou', deliveryConsultantName: '侯文涛', buildOperatorNo: 'wentao.hou', buildOperatorName: '侯文涛', saleNo: 'wentao.hou', saleName: '侯文涛', orderItemId: 'a3', taskId: 'task3' },
        { id: '22', customerId: 22, customerName: '上海尚房信息科技有限公司', businessLineName: '上海营销中心', area: '江苏省,苏州市,姑苏区', areaCode: ['china', 'shanghai', 'baoshan'], serviceStatus: '4', serviceStatusName: '待确认', productName: '微盟商城 - 正式版', productId: '123456', freezeStatusName: '未冻结', lastOpenTime: 1604287510493, afterSaleTime: '2020-10-13 18:00:00', serviceStartTime: '2020年10月13日', serviceEndTime: '2020年12月13日', assignToServiceTime: '2020-10-13 18:00:00', buildTaskStartTime: '2020-10-13 18:00:00', buildTaskEndTime: '2020-10-13 18:00:00', serviceDays: '100', lastAssignTime: '2020-10-13 18:00:00', countReject: 100, rejectReason: '驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回', deliveryConsultantNo: 'wentao.hou', deliveryConsultantName: '侯文涛', buildOperatorNo: 'wentao.hou', buildOperatorName: '侯文涛', saleNo: 'wentao.hou', saleName: '侯文涛', orderItemId: 'a4', taskId: 'task4' },
        { id: '23', customerId: 23, customerName: '上海尚房信息科技有限公司', businessLineName: '上海营销中心', area: '江苏省,苏州市,姑苏区', areaCode: ['china', 'shanghai', 'baoshan'], serviceStatus: '5', serviceStatusName: '待上线', productName: '微盟商城 - 正式版', productId: '123456', freezeStatusName: '未冻结', lastOpenTime: 1604287510493, afterSaleTime: '2020-10-13 18:00:00', serviceStartTime: '2020年10月13日', serviceEndTime: '2020年12月13日', assignToServiceTime: '2020-10-13 18:00:00', buildTaskStartTime: '2020-10-13 18:00:00', buildTaskEndTime: '2020-10-13 18:00:00', serviceDays: '100', lastAssignTime: '2020-10-13 18:00:00', countReject: 100, rejectReason: '驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回', deliveryConsultantNo: 'wentao.hou', deliveryConsultantName: '侯文涛', buildOperatorNo: 'wentao.hou', buildOperatorName: '侯文涛', saleNo: 'wentao.hou', saleName: '侯文涛', orderItemId: 'a5', taskId: 'task5' },
        { id: '24', customerId: 24, customerName: '上海尚房信息科技有限公司', businessLineName: '上海营销中心', area: '江苏省,苏州市,姑苏区', areaCode: ['china', 'shanghai', 'baoshan'], serviceStatus: '6', serviceStatusName: '验收驳回', productName: '微盟商城 - 正式版', productId: '123456', freezeStatusName: '未冻结', lastOpenTime: 1604287510493, afterSaleTime: '2020-10-13 18:00:00', serviceStartTime: '2020年10月13日', serviceEndTime: '2020年12月13日', assignToServiceTime: '2020-10-13 18:00:00', buildTaskStartTime: '2020-10-13 18:00:00', buildTaskEndTime: '2020-10-13 18:00:00', serviceDays: '100', lastAssignTime: '2020-10-13 18:00:00', countReject: 100, rejectReason: '驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回', deliveryConsultantNo: 'wentao.hou', deliveryConsultantName: '侯文涛', buildOperatorNo: 'wentao.hou', buildOperatorName: '侯文涛', saleNo: 'wentao.hou', saleName: '侯文涛', orderItemId: 'a6', taskId: 'task6' },
        { id: '25', customerId: 25, customerName: '上海尚房信息科技有限公司', businessLineName: '上海营销中心', area: '江苏省,苏州市,姑苏区', areaCode: ['china', 'shanghai', 'baoshan'], serviceStatus: '1', serviceStatusName: '待接受', productName: '微盟商城 - 正式版', productId: '123456', freezeStatusName: '未冻结', lastOpenTime: 1604287510493, afterSaleTime: '2020-10-13 18:00:00', serviceStartTime: '2020年10月13日', serviceEndTime: '2020年12月13日', assignToServiceTime: '2020-10-13 18:00:00', buildTaskStartTime: '2020-10-13 18:00:00', buildTaskEndTime: '2020-10-13 18:00:00', serviceDays: '100', lastAssignTime: '2020-10-13 18:00:00', countReject: 100, rejectReason: '驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回', deliveryConsultantNo: 'wentao.hou', deliveryConsultantName: '侯文涛', buildOperatorNo: 'wentao.hou', buildOperatorName: '侯文涛', saleNo: 'wentao.hou', saleName: '侯文涛', orderItemId: 'a1', taskId: 'task1' },
        { id: '26', customerId: 26, customerName: '上海尚房信息科技有限公司', businessLineName: '上海营销中心', area: '江苏省,苏州市,姑苏区', areaCode: ['china', 'shanghai', 'baoshan'], serviceStatus: '2', serviceStatusName: '待搭建', productName: '微盟商城 - 正式版', productId: '123456', freezeStatusName: '未冻结', lastOpenTime: 1604287510493, afterSaleTime: '2020-10-13 18:00:00', serviceStartTime: '2020年10月13日', serviceEndTime: '2020年12月13日', assignToServiceTime: '2020-10-13 18:00:00', buildTaskStartTime: '2020-10-13 18:00:00', buildTaskEndTime: '2020-10-13 18:00:00', serviceDays: '100', lastAssignTime: '2020-10-13 18:00:00', countReject: 100, rejectReason: '驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回', deliveryConsultantNo: 'wentao.hou', deliveryConsultantName: '侯文涛', buildOperatorNo: 'wentao.hou', buildOperatorName: '侯文涛', saleNo: 'wentao.hou', saleName: '侯文涛', orderItemId: 'a2', taskId: 'task2' },
        { id: '27', customerId: 27, customerName: '上海尚房信息科技有限公司', businessLineName: '上海营销中心', area: '江苏省,苏州市,姑苏区', areaCode: ['china', 'shanghai', 'baoshan'], serviceStatus: '3', serviceStatusName: '搭建中', productName: '微盟商城 - 正式版', productId: '123456', freezeStatusName: '未冻结', lastOpenTime: 1604287510493, afterSaleTime: '2020-10-13 18:00:00', serviceStartTime: '2020年10月13日', serviceEndTime: '2020年12月13日', assignToServiceTime: '2020-10-13 18:00:00', buildTaskStartTime: '2020-10-13 18:00:00', buildTaskEndTime: '2020-10-13 18:00:00', serviceDays: '100', lastAssignTime: '2020-10-13 18:00:00', countReject: 100, rejectReason: '驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回', deliveryConsultantNo: 'wentao.hou', deliveryConsultantName: '侯文涛', buildOperatorNo: 'wentao.hou', buildOperatorName: '侯文涛', saleNo: 'wentao.hou', saleName: '侯文涛', orderItemId: 'a3', taskId: 'task3' },
        { id: '28', customerId: 28, customerName: '上海尚房信息科技有限公司', businessLineName: '上海营销中心', area: '江苏省,苏州市,姑苏区', areaCode: ['china', 'shanghai', 'baoshan'], serviceStatus: '4', serviceStatusName: '待确认', productName: '微盟商城 - 正式版', productId: '123456', freezeStatusName: '未冻结', lastOpenTime: 1604287510493, afterSaleTime: '2020-10-13 18:00:00', serviceStartTime: '2020年10月13日', serviceEndTime: '2020年12月13日', assignToServiceTime: '2020-10-13 18:00:00', buildTaskStartTime: '2020-10-13 18:00:00', buildTaskEndTime: '2020-10-13 18:00:00', serviceDays: '100', lastAssignTime: '2020-10-13 18:00:00', countReject: 100, rejectReason: '驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回', deliveryConsultantNo: 'wentao.hou', deliveryConsultantName: '侯文涛', buildOperatorNo: 'wentao.hou', buildOperatorName: '侯文涛', saleNo: 'wentao.hou', saleName: '侯文涛', orderItemId: 'a4', taskId: 'task4' },
        { id: '29', customerId: 29, customerName: '上海尚房信息科技有限公司', businessLineName: '上海营销中心', area: '江苏省,苏州市,姑苏区', areaCode: ['china', 'shanghai', 'baoshan'], serviceStatus: '5', serviceStatusName: '待上线', productName: '微盟商城 - 正式版', productId: '123456', freezeStatusName: '未冻结', lastOpenTime: 1604287510493, afterSaleTime: '2020-10-13 18:00:00', serviceStartTime: '2020年10月13日', serviceEndTime: '2020年12月13日', assignToServiceTime: '2020-10-13 18:00:00', buildTaskStartTime: '2020-10-13 18:00:00', buildTaskEndTime: '2020-10-13 18:00:00', serviceDays: '100', lastAssignTime: '2020-10-13 18:00:00', countReject: 100, rejectReason: '驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回', deliveryConsultantNo: 'wentao.hou', deliveryConsultantName: '侯文涛', buildOperatorNo: 'wentao.hou', buildOperatorName: '侯文涛', saleNo: 'wentao.hou', saleName: '侯文涛', orderItemId: 'a5', taskId: 'task5' },
        { id: '30', customerId: 30, customerName: '上海尚房信息科技有限公司', businessLineName: '上海营销中心', area: '江苏省,苏州市,姑苏区', areaCode: ['china', 'shanghai', 'baoshan'], serviceStatus: '6', serviceStatusName: '验收驳回', productName: '微盟商城 - 正式版', productId: '123456', freezeStatusName: '未冻结', lastOpenTime: 1604287510493, afterSaleTime: '2020-10-13 18:00:00', serviceStartTime: '2020年10月13日', serviceEndTime: '2020年12月13日', assignToServiceTime: '2020-10-13 18:00:00', buildTaskStartTime: '2020-10-13 18:00:00', buildTaskEndTime: '2020-10-13 18:00:00', serviceDays: '100', lastAssignTime: '2020-10-13 18:00:00', countReject: 100, rejectReason: '驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回驳回', deliveryConsultantNo: 'wentao.hou', deliveryConsultantName: '侯文涛', buildOperatorNo: 'wentao.hou', buildOperatorName: '侯文涛', saleNo: 'wentao.hou', saleName: '侯文涛', orderItemId: 'a6', taskId: 'task6' },
        { id: '31', customerId: 31, customerName: null, businessLineName: null, area: null, areaCode: ['china', 'shanghai', 'baoshan'], serviceStatus: null, serviceStatusName: null, productName: null, freezeStatusName: null, lastOpenTime: null, afterSaleTime: null, serviceStartTime: null, serviceEndTime: null, assignToServiceTime: null, buildTaskStartTime: null, buildTaskEndTime: null, serviceDays: null, lastAssignTime: null, countReject: null, rejectReason: null, deliveryConsultantNo: null, deliveryConsultantName: null, buildOperatorNo: null, buildOperatorName: null, saleNo: null, saleName: null, orderItemId: 'a7', taskId: 'task7' },
        { id: '32', customerId: 32, customerName: undefined, businessLineName: undefined, area: undefined, areaCode: ['china', 'shanghai', 'baoshan'], serviceStatus: undefined, serviceStatusName: undefined, productName: undefined, freezeStatusName: undefined, lastOpenTime: undefined, afterSaleTime: undefined, serviceStartTime: undefined, serviceEndTime: undefined, assignToServiceTime: undefined, buildTaskStartTime: undefined, buildTaskEndTime: undefined, serviceDays: undefined, lastAssignTime: undefined, countReject: undefined, rejectReason: undefined, deliveryConsultantNo: undefined, deliveryConsultantName: undefined, buildOperatorNo: undefined, buildOperatorName: undefined, saleNo: undefined, saleName: undefined, orderItemId: 'a8', taskId: 'task8' },
      ],
      pagination: {
        page: 1,
        pageCount: 1,
        pageSize: 10,
        totalCount: 100,
      },
    },
  },
  'POST /api/login/account': async (req: Request, res: Response) => {
    const { password, username, type } = req.body;
    await waitTime(2000);
    if (password === 'ant.design' && username === 'admin') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
      });
      access = 'admin';
      return;
    }
    if (password === 'ant.design' && username === 'user') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'user',
      });
      access = 'user';
      return;
    }
    if (type === 'mobile') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
      });
      access = 'admin';
      return;
    }

    res.send({
      status: 'error',
      type,
      currentAuthority: 'guest',
    });
    access = 'guest';
  },
  'GET /api/login/outLogin': (req: Request, res: Response) => {
    access = '';
    res.send({ data: {}, success: true });
  },
  'POST /api/register': (req: Request, res: Response) => {
    res.send({ status: 'ok', currentAuthority: 'user', success: true });
  },
  'GET /api/500': (req: Request, res: Response) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req: Request, res: Response) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req: Request, res: Response) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req: Request, res: Response) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },

  'GET  /api/login/captcha': getFakeCaptcha,
};
