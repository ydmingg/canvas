import Swiper from 'swiper';
import { EffectCube, EffectFlip, Navigation, Autoplay, Pagination, EffectCards } from 'swiper/modules';

// 初始化效果器
Swiper.use([Navigation])
Swiper.use([Pagination])
Swiper.use([Autoplay])
// 安装模块卡片
Swiper.use([EffectCube])

// 详情
const swiper = new Swiper(".aio-product .swiper-container",{
    speed: 400,
    spaceBetween: 100,
    direction: 'horizontal',
    // direction: 'horizontal',
    autoplay:{
        delay: 1600,
        disableOnInteraction: false,
    },
    loop: true,
    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
    },
    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    
})


// 一体屏幕
import { home } from "pages/home";
import template from "template";
let coverContainer = document.querySelector("[fxtag='cover-container']") as HTMLDivElement;

template.nodeRenderFor(home.card,[
    { url: "https://book.funxdata.com/public/img/showroom2/aio-card-bg1.jpg", text: "斑铜" },
    { url: "https://book.funxdata.com/public/img/showroom2/aio-card-bg1.jpg", text: "斑铜矿斑" },
    { url: "https://book.funxdata.com/public/img/showroom2/aio-card-bg1.jpg", text: "斑铜矿斑斑铜矿斑" },
    { url: "https://book.funxdata.com/public/img/showroom2/aio-card-bg1.jpg", text: "斑铜矿" },
    { url: "https://book.funxdata.com/public/img/showroom2/aio-card-bg1.jpg", text: "斑铜矿斑斑铜矿" },
    { url: "https://book.funxdata.com/public/img/showroom2/aio-card-bg1.jpg", text: "斑铜斑" },
],coverContainer)



const swiper2 = new Swiper(".aio-cover .swiper-container:nth-of-type(1)",{
    // ef?fect: 'cards',
    // cardsEffect:{
    //     slideShadows: true,
    //     perSlideoffset: 50,
    //     perSlideRotate: 10
    // },
    effect: 'cube',
    // direction: 'vertical',
    autoplay:{
        delay: 2000,
        disableOnInteraction: false,
    },
    loop: true,
    // effect: 'cards',
    // cardsEffect: {
    //   slideShadows: true,
    //   //transformEl:'.text',
    // },

    // speed: 400,
    // spaceBetween: 100,


})