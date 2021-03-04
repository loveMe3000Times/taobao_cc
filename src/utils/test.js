// 阿里巴巴矢量图库 全选
var icons = document.querySelectorAll("span[title='添加入库']");

for(var i = 0; i < icons.length; i++){
    var item = icons[i];
    item.click();
}

console.log("选择完成！")
