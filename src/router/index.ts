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
import { pagesRegularPolygon } from 'src/components/11-regularPolygon'
import { pagesArrow } from 'src/components/12-arrow'
import { pagesImage } from 'src/components/13-image'
import { pagesAnimation } from 'src/components/14-animation'
import { pagesShowHide } from 'src/components/15-showHide'
import { pagesKeyEvents } from 'src/components/16-keyEvents'
import { pagesGroup } from 'src/components/17-group'
import { pagesTransformer } from 'src/components/18-transformer'
import { pagesWheel } from 'src/components/19-wheel'
import { pagesPreview } from 'src/components/20-preview'
import { pagesAdvanced } from 'src/components/advanced/index'

declare let window: any

export const pages = () => { 
    // let router = new HistoryRouter()

    // window.Route = router;

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
        { path: '/11-regularPolygon', fun: pagesRegularPolygon },
        { path: '/12-arrow', fun: pagesArrow },
        { path: '/13-image', fun: pagesImage },
        { path: '/14-animation', fun: pagesAnimation },
        { path: '/15-showHide', fun: pagesShowHide },
        { path: '/16-keyEvents', fun: pagesKeyEvents },
        { path: '/17-group', fun: pagesGroup },
        { path: '/18-transformer', fun: pagesTransformer },
        { path: '/19-wheel', fun: pagesWheel },
        { path: '/20-preview', fun: pagesPreview },
        { path: '/advanced/index', fun: pagesAdvanced },
        
    ]

    // 渲染页面
    for (let i = 0; i < routerArr.length; i++) {
        // router.bind(routerArr[i].path, async ()=>{ 
        //     routerArr[i].fun();
        // })
    }

    // 初始化路由
    // router.Init();
    pagesRect();

}

