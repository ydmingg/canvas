import { HistoryRouter } from "fx-route";
import { pagesHome } from 'src/components/index'
import { pagesRect } from 'src/components/1-rect'
import { pagesCircle } from 'src/components/2-circle'
import { pagesEllipse } from 'src/components/3-ellipse'
import { pagesWedge } from 'src/components/4-wedge'
import { pagesLine } from 'src/components/5-line'
import { pagesText } from 'src/components/6-text'
import { pagesStar } from 'src/components/7-star'
import { pagesRing } from 'src/components/8-ring'
import { pagesArc } from 'src/components/9-arc'
import { pagesLabel } from 'src/components/10-label'

declare let window: any

export const pages = () => { 
    let router = new HistoryRouter()

    window.Route = router;

    const routerArr = [
        { path: '/', fun: pagesHome },
        { path: '/1-rect', fun: pagesRect },
        { path: '/2-circle', fun: pagesCircle },
        { path: '/3-ellipse', fun: pagesEllipse },
        { path: '/4-wedge', fun: pagesWedge },
        { path: '/5-line', fun: pagesLine },
        { path: '/6-text', fun: pagesText },
        { path: '/7-star', fun: pagesStar },
        { path: '/8-ring', fun: pagesRing },
        { path: '/9-arc', fun: pagesArc },
        { path: '/10-label', fun: pagesLabel },
        
    ]

    // 渲染页面
    for (let i = 0; i < routerArr.length; i++) {
        router.bind(routerArr[i].path, async ()=>{ 
            routerArr[i].fun();
        })
    }

    // 初始化路由
    router.Init();
}