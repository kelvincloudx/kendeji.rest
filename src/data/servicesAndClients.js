export const verifiedServices = [
  {
    title: '标准化通用协议规范',
    desc: '兼容主流开源协议栈（如 Shadowsocks、VMess、Trojan 等标准格式），拒绝私有封闭黑盒，确保跨设备客户端生态的高兼容性。'
  },
  {
    title: '灵活月付与清晰重置',
    desc: '全系套餐均支持纯粹按月付费，每月按期重置流量配额。拒绝长期捆绑销售，计费与账单周期公开明晰，试错门槛极低。'
  },
  {
    title: '独立安全凭证与一键重置',
    desc: '每位用户享有独立的订阅 Token 密钥，与用户中心强关联。支持在后台随时一键重置订阅链接，彻底斩断潜在泄露风险。'
  },
  {
    title: '全平台客户端生态支持',
    desc: '提供标准订阅格式输出，完美适配 Windows、Android、macOS、iOS 等全平台开源分流工具，支持智能规则与全局代理。'
  },
  {
    title: '标准化工单技术支持',
    desc: '遇到线路调整、网络握手异常或计费查询时，通过服务商用户中心工单系统提交申请，由后台运维专员统一排查响应。'
  },
  {
    title: '透明使用规则与数据保护',
    desc: '不夸大承诺所谓“100%绝对匿名”，遵守网络工程技术规律，如实公布套餐流量额度与使用规范。'
  }
];

export const clientPlatforms = [
  {
    platform: 'Windows',
    icon: 'windows',
    recommendedApps: ['Clash Verge Rev', 'Clash Party', 'Sing-box Windows'],
    compatibilityNotes: '建议运行在 Windows 10/11 64位系统。如需接管命令行及不支持系统代理的软件，可在客户端中开启 TUN 虚拟网卡模式。',
    steps: [
      '从官方 GitHub Release 获取最新安装包并完成安装；',
      '登录肯の基机场后台，复制专属于您的 Clash 订阅链接；',
      '进入客户端“订阅/配置”界面，粘贴链接并点击“拉取/更新”；',
      '切换至“代理”面板选择目标节点，开启“系统代理”开关即可生效。'
    ]
  },
  {
    platform: 'Android 安卓',
    icon: 'android',
    recommendedApps: ['Clash Meta for Android', 'Sing-box Android', 'v2rayNG'],
    compatibilityNotes: '建议 Android 8.0 及以上版本。首次启动时系统会请求建立 VPN 隧道权限，请点击“允许/确定”。在省电策略中建议关闭电池优化以防后台休眠。',
    steps: [
      '安装官方开源 APK 安装包并授予基础网络权限；',
      '在手机浏览器登录服务商后台，点击“一键导入”或手动复制订阅 URL；',
      '在客户端“配置/配置文件”中粘贴订阅并完成下载；',
      '在主界面启动代理开关，在节点列表中切换至所需区域。'
    ]
  },
  {
    platform: 'iOS / iPadOS',
    icon: 'apple',
    recommendedApps: ['Shadowrocket (小火箭)', 'Sing-box', 'Stash', 'Quantumult X'],
    compatibilityNotes: '受 App Store 区域政策限制，客户端通常需要在非国区 Apple ID（如美区、日区、港区）登录 App Store 下载安装。',
    steps: [
      '使用海外 Apple ID 登录 App Store 下载 Shadowrocket 或 Sing-box；',
      '进入肯の基机场后台，复制订阅链接或在手机端直接扫描二维码；',
      '在客户端点击“+”添加配置，类型选择“Subscribe/URL”，粘贴链接并保存；',
      '点击开启首行连接开关，系统弹出“添加 VPN 配置”时使用 Face ID 或密码确认。'
    ]
  }
];
