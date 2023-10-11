import comment from "./init";

// 创建
const creat = () => { 
    const textData = document.querySelectorAll("#Text li input") as unknown as HTMLInputElement;
    const textBtn = document.querySelector("#Text li.list.row.justify-end button") as HTMLButtonElement;
    const app = document.querySelector("#app") as HTMLDivElement;


    function dateFormat() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        return `${month}月${day}日，${hours}:${minutes}`;
    }
    
    // 更新数据
    textBtn.addEventListener("click", () => { 
        // 获取参数
        let url = textData[0].value
        let name = textData[1].value
        let content = textData[2].value

        // Canvas渲染评论组件
        comment({
            node: app,
            url: url,
            name: name,
            time: dateFormat(),
            content: content
        });
        
    })
    
    
    

    

}


export default {
    creat
};