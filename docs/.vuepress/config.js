const path = require('path')
module.exports = {
    base: '/bykj/',
    title: '彪阳科技任职历程',
    description: '随便写写',
    head: [
        ['link', { rel: 'icon', href: '/imgs/logo.png', type: 'image/png' }]
    ],
    themeConfig: {
        lastUpdated: 'Last Updated',
        nav: [
            { text: '主页', link: '/' },
            { text: '时间节点', link: '/time/' }
        ],
        sidebarDepth: 2,
        sidebar: [
            {
                title: '组件库',
                collapsable: false,
                children: [
                    '/components/cButton',
                    '/components/cInput',
                ]
            },
            {
                title: '保时捷-react',
                collapsable: false,
                children: [
                    '/baoshijie/directory',
                    '/baoshijie/alert'
                ]
            },
            {
                title: '宾利-小程序',
                collapsable: false,
                children: [
                    '/binli/directory',
                    '/binli/plop',
                    '/binli/api',
                    '/binli/call'
                ]
            },
            {
                title: '问题调研',
                collapsable: false,
                children: [
                    '/other/cordova',
                    '/other/qywx'
                ]
            }
        ]
    },
    scss: {
        includePaths: [path.join(__dirname, '../../styles')]
    },
    markdown: {
        lineNumbers: true
    }
}