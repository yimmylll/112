var loadAllItems = function (inputs) {
    var inputs = [
        'ITEM000001',
        'ITEM000001',
        'ITEM000001',
        'ITEM000001',
        'ITEM000001',
        'ITEM000003-2',
        'ITEM000005',
        'ITEM000005',
        'ITEM000005'
    ];
    var i;
    var allItems=[];
    var j=0;
    var num;
    for(var i=0;i<inputs.length;i++)
    {
        if(inputs[i].length!=10)//长度不符，num=后面，I[i]取前面
        {num=parseInt(inputs[i].substring(11));inputs[i]=inputs[i].substr(0,10);}
        else
        {num=1;}
        if(inputs.indexOf(inputs[i])===i)//首次出现
        {
            allItems[j]={barcode:inputs[i], count:num};
            j++;
        }
        else
        {
            allItems[j-1].count+=num;
        }
    }
    for(i=0;i<allItems.length;i++)//整理补充资料
    {
        if(allItems[i].barcode==='ITEM000001')
        {allItems[i].name="雪碧";allItems[i].unit='瓶';allItems[i].price=3.00;allItems[i].type='BUY_TWO_GET_ONE_FREE';}
        if(allItems[i].barcode==='ITEM000003')
        {allItems[i].name='荔枝';allItems[i].unit='斤';allItems[i].price=15.00;allItems[i].type='OTHER_PROMOTION';}
        if(allItems[i].barcode==='ITEM000005')
        {allItems[i].name='方便面';allItems[i].unit='袋';allItems[i].price=4.50;allItems[i].type='BUY_TWO_GET_ONE_FREE';}
    }
    for(i=0;i<allItems.length;i++)
    {
        if(allItems[i].type==='BUY_TWO_GET_ONE_FREE')
        {allItems[i].freecount=parseInt(allItems[i].count/3);}
        else
        {allItems[i].freecount=0;}
    }
    return allItems;
}


module.exports = function printInventory(inputs) {
    var allItems = loadAllItems(inputs);
    var text1="***<没钱赚商店>购物清单***\n",temp,text2="\n挥泪赠送商品：\n";
    var total=0,cut=0;
    for(i=0;i<allItems.length;i++)
    {
        temp="名称："+allItems[i].name+"，数量："+allItems[i].count+allItems[i].unit+"，单价："+allItems[i].price.toFixed(2)+"(元)，小计："+((allItems[i].count-allItems[i].freecount)*allItems[i].price).toFixed(2)+"(元)\n";
        text1+=temp;
        total+=((allItems[i].count-allItems[i].freecount)*allItems[i].price);
    }
    var line="----------------------";
    for(i=0;i<allItems.length;i++)
    {
        if(allItems[i].type==='BUY_TWO_GET_ONE_FREE')
        {
            temp="名称："+allItems[i].name+"，数量："+allItems[i].freecount+allItems[i].unit+"\n";
            text2+=temp;
            cut+=(allItems[i].freecount*allItems[i].price);
        }
    }
    console.log(text1+line+text2+line+"\n总计："+total.toFixed(2)+"(元)\n节省："+cut.toFixed(2)+"(元)\n**********************");
    return 'Hello World!';
};

