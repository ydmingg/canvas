import template from "template";
import { tplHome } from "pages/tplHome";
import { tplList } from "pages/tplList";

// 声明any的window对象
declare let window: any

export const pagesHome = () => { 
  //渲染index的DOM
  const oApp = document.querySelector("#app") as HTMLDivElement;
  template.nodeRender(tplHome.index, {}, oApp)
  //创建数组对象
  const data = [
    {
      title: '矩形【rect】',
      path: '/1-rect',
      coverUrl: 'http://192.168.5.235:8060/src/assets/1.png',
    },
    {
      title: '圆【circle】',
      path: '/2-circle',
      coverUrl: 'http://192.168.5.235:8060/src/assets/2.png',
    },
    {
      title: '椭圆【ellipse】',
      path: '/3-ellipse',
      coverUrl: 'http://192.168.5.235:8060/src/assets/3.png',
    },
    {
      title: '楔形【wedge】',
      path: '/4-wedge',
      coverUrl: 'http://192.168.5.235:8060/src/assets/4.png',
    },
    {
      title: '线【line】',
      path: '/5-line',
      coverUrl: 'http://192.168.5.235:8060/src/assets/5.png',
    },
    {
      title: '文本【text】',
      path: '/6-text',
      coverUrl: 'http://192.168.5.235:8060/src/assets/6.png',
    },
    {
      title: '星星【star】',
      path: '/7-star',
      coverUrl: 'http://192.168.5.235:8060/src/assets/7.png',
    },
    {
      title: '环形【ring】',
      path: '/8-ring',
      coverUrl: 'http://192.168.5.235:8060/src/assets/8.png',
    },
    {
      title: '弧形【arc】',
      path: '/9-arc',
      coverUrl: 'http://192.168.5.235:8060/src/assets/9.png',
    },
    {
      title: '标签【label】',
      path: '/10-label',
      coverUrl: 'http://192.168.5.235:8060/src/assets/10.png',
    },
    {
      title: '多边形【regularPolygon】',
      path: '/11-regularPolygon',
      coverUrl: 'http://192.168.5.235:8060/src/assets/11.png',
    },
    {
      title: '箭头【arrow】',
      path: '/12-arrow',
      coverUrl: 'http://192.168.5.235:8060/src/assets/12.png',
    },
    {
      title: '图片【image】',
      path: '/13-image',
      coverUrl: 'http://192.168.5.235:8060/src/assets/13.png',
    },
    {
      title: '动画【animation】',
      path: '/14-animation',
      coverUrl: 'http://192.168.5.235:8060/src/assets/14.png',
    },
    {
      title: '展示隐藏【show Hide】',
      path: '/15-showHide',
      coverUrl: 'http://192.168.5.235:8060/src/assets/15.png',
    },
    {
      title: '键盘事件【keyEvents】',
      path: '/16-keyEvents',
      coverUrl: 'http://192.168.5.235:8060/src/assets/16.png',
    },
    {
      title: '组【group】',
      path: '/17-group',
      coverUrl: 'http://192.168.5.235:8060/src/assets/17.png',
    },
    {
      title: '变压器、框选【transformer】',
      path: '/18-transformer',
      coverUrl: 'http://192.168.5.235:8060/src/assets/18.png',
    },
    {
      title: '画布滚动缩放【wheel】',
      path: '/19-wheel',
      coverUrl: 'http://192.168.5.235:8060/src/assets/19.png',
    },
    {
      title: '窗口预览【preview】',
      path: '/20-preview',
      coverUrl: 'http://192.168.5.235:8060/src/assets/20.png',
    },
    {
      title: '项目实战',
      path: '/advanced/index',
      coverUrl: 'http://192.168.5.235:8060/src/assets/0.png',
    },
  ]
  // 渲染列表
  const oList = oApp.querySelector('[fxtag="list"]') as HTMLElement
  template.nodeRenderFor(tplList.tplHome, data, oList)

  //页面跳转
  let listItem = document.querySelectorAll('[fxtag="list_item"]') as NodeListOf<HTMLElement>
  for (let i = 0; i < data.length; i++) {
    listItem[i].addEventListener('click', (e) => { 
      history.pushState('','',`${listItem[i].dataset.url}`)
    })
    
  }

}