const {
	Menu,
	BrowserWindow
} = require('electron')

var template = [
    {
        label:'菜单',
        submenu:[
            {
                label:'文字变手写',
                //主要代码--------------start
                click:()=>{
                    win = new BrowserWindow({
                        width:1200,
                        height:1000,
                        webPreferences:{ nodeIntegration:true}
                    })
                    win.loadFile('./othermodel/handwriting/index.html')
                    win.on('closed',()=>{
                        win = null
                    })

                }
                //主要代码----------------end
            },
            {label:'待开发'}
        ]

    },
    {
        label:'软件',
        submenu:[
            {label:'待开发'},
            {label:'待开发'}
        ]
    }
]

var m = Menu.buildFromTemplate(template)

Menu.setApplicationMenu(m)