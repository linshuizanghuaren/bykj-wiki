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
            { text: '信息', link: '/info/' }
        ],
        sidebarDepth: 2,
        sidebar: [
            {
                title: '组件库',
                collapsable: false,
                children: [
                    '/components/mini',
                    '/components/file',
                    '/components/color',
                    '/components/icon',
                    '/components/input',
                    '/components/button',
                    '/components/loading',
                    '/components/alert',
                    '/components/tab',
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
                    '/binli/call',
                    '/binli/error',
                    '/binli/npm'
                ]
            },
            {
                title: '问题调研',
                collapsable: false,
                children: [
                    '/other/cordova',
                    '/other/qywx'
                ]
            },
            {
                title: 'l2l',
                collapsable: false,
                children: [
                    '/l2l/umi',
                    '/l2l/dva'
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