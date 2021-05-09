var basket = 
        [
            {id:'A',quantity:13,price:20,point:10},
            {id:'B',quantity:100,price:20,point:10},
            {id:'C',quantity:11,price:20,point:10},
            {id:'D',quantity:10,price:20,point:10}
        ];
var newBasket = [];
var newList = [];
var pro = 
    [
        {
            id:'P001',
            name:'set 7',
            conditions:[
                    {id:'A',quantity:4},
                    {id:'B',quantity:10}
                ],
            price:500,
            point:50
        },{
            id:'P002',
            name:'set 5',
            conditions:[{id:'B',quantity:10}],
            price:500,
            point:50
        },
        {
            id:'P003',
            name:'set A',
            conditions:[
                    {id:'C',quantity:5},
                    {id:'D',quantity:5}
                ],
            price:500,
            point:50
        }
    ];


function checkPromotion(itemList,promotions){
    
    for(i in promotions){
        let promotion = promotions[i];
        let conditions = promotions[i].conditions;
        //let countCondition = conditions.length;
        let resultCondition = true;
        for(j in conditions){
            let condition = conditions[j]; 
            //console.log(condition);
            // ตรวจสอบ Promotion แล้วเทียบก่อนว่า จำนวนและสินค้าตรงตาม set promotion รึเปล่า
            for(i in itemList){
                let item = itemList[i];
                if(item.id === condition.id){
                    if(item.quantity >= condition.quantity ){
                        resultCondition = resultCondition && true;
                    }else{
                        resultCondition = resultCondition && false;
                    }
                }
            }
        }
        // เมื่อทุกอย่างถูกต้อง ก็จับ set เข้า newList และลดจำนวนสินค้าใน basket
        if(resultCondition){
            let obj;
            if(newList.length>0){
                let obj = newList.find( item => item.id ===promotion.id);
                if(obj != undefined){
                    obj.quantity +=1;
                }else{
                    obj = {
                        id:promotion.id,
                        quantity:1,
                        point:promotion.point,
                        price:promotion.price
                        //,conditions:promotion.conditions
                    }
                    newList.push(obj);
                }
            }else{
                obj = {
                    id:promotion.id,
                    quantity:1,
                    point:promotion.point,
                    price:promotion.price
                    //,conditions:promotion.conditions
                }
                newList.push(obj);
            }

            for(i in conditions){
                let condition = conditions[i];
                let item = itemList.find(item => item.id === condition.id);
                item.quantity -= condition.quantity;
            }
            checkPromotion(itemList,promotions);    // Resursive function จะได้ไม่งง
        }
    }
    return newList;
}
function removeItem(itemList){
    let newBasket = [];
    for(i in itemList){
        let item = itemList[i];
        if(item.quantity > 0){
            newBasket.push(item);
        }
    }
    return newBasket;
}

let AA = checkPromotion(basket,pro);
console.log("=========================================");
console.log("Set Promotion :");
console.log(AA);
console.log("=========================================");
console.log(removeItem(basket));