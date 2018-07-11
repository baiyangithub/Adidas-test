{/* <li class="grid">
    <a>
        <span>5</span>
    </a>
</li> */}

$(function(){


    // 二级菜单JS调用
    $(".extention").nav();
    // 渲染界面
    function Juventus(url,main_selector){
        if(!url || !main_selector) return;
        this.url = url;
        this.main_ele = $(main_selector);
        this.init(); 
        // this.thumbNail = this.main_ele.
        // console.log(this.main_ele)
        
    }
    Juventus.prototype = {
        constructor:Juventus,
        init(){
            this.load_data()
            .then(function(res){
                // console.log(res.list);
                this.json = res.goods;
                this.render_page();
            }.bind(this));
            // console.log(this.main)
            this.main_ele
            .on("click",".thumbnail",$.proxy(this.dataId,this));
            this.carNum = $(".header-cart").find("#icon-item-count");
            this.carNum.html(this.getSum());
            // this.render_page();
        },
        load_data(){
            this.opt = {
                url:this.url,
                // dataType:"jsonp",
            };
            return $.ajax(this.opt);
        },
        render_page(){
            this.html = "";
            this.json.forEach(function(item){
                this.html += `<div class="list-item">
                <div class="thumbnail" data-id="${item.goods_id}">
                    <div class="goods-img">
                        <a class="img-href" href="goods_detail.html">
                            <img src=${item.images} style="opacity: 1;">
                        </a>
                        <div class="badge">
                            <div>
                                <a class="icon-new-label product-icon-label">NEW</a>
                            </div>
                        </div>
                    </div>
                    <div class="goods-box">
                        <a  href="goods_detail.html">
                            <span class="goods-name">${item.goods_name}</span>
                            <span class="goods-subtitle">${item.classify}</span>
                        </a>
                        <div class="goods-bottom">
                            <span class="goods-price price-single">¥${item.price}</span>
                        </div>
                    </div>
                </div>
            </div>`
            }.bind(this)) 
            this.main_ele.html(this.html);
        },
        dataId(event){
            var target = event.target || event.srcElement;
            target = $(target).parents(".thumbnail");
            // console.log(target)
            // 获取每个商品thumbnail盒子对应的data-id
            var goodsId = $(target).attr("data-id");
            console.log(goodsId)
                var dataIdArray = [
                    {
                        id:goodsId
                    }
                ]
                console.log(JSON.stringify(dataIdArray))
                $.cookie("dataId",JSON.stringify(dataIdArray))
        },
        getSum:function(){
            var addShopCarString = $.cookie("addShopCar");
            // console.log(addShopCarString);
            if(addShopCarString){
                var addShopCarArray = JSON.parse(addShopCarString);
                var sum = 0;
                addShopCarArray.forEach(function(item){
                    // console.log(item);
                    sum += Number(item.num);
                })
                return sum;
            }
            return 0;
        }
    }
    new Juventus("http://127.0.0.1/Adidas/JSON/goods.json",".goods-con")
    
    
    // 尺码插入
    function Size(){
        var $sizeUl = $(".filter-size");
        var sizeArray = [5,92,98,104,110,116,128,140,152,164,"XS","S","M","L","XL","2XL","OSFM","NS",3739,4042,4345];
        var sizeList = "";
        for(let i = 0;i < 21;i++){
            sizeList += `<li class="grid">
            <a>
                <span>${sizeArray[i]}</span>
            </a>
        </li>`
        }
        // console.log(sizeList);
         $sizeUl.append(sizeList);
    }
    new Size(); 

    
})