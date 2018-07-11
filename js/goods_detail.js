
$(function(){
    // goods-list-render内渲染
    function GoodsImgList(url,main_selector){
        if(!url || !main_selector)  return;
        this.url = url;
        this.main_ele = $(main_selector);
        this.init(); 
    }
    GoodsImgList.prototype = {
        consturctor:GoodsImgList,
        init(){
            this.load_data()
            .then(function(res){
                // console.log(res.thumbnail);
                this.json = res.thumbnail;
                this.render_img();
            }.bind(this))
        },
        load_data(){
            this.opt = {
                url:this.url
            }
            return $.ajax(this.opt);
        },
        render_img(){
            this.html="";
            this.json.forEach(function(item){  
                this.html += `<li>
                                    <div class="scroll-background-image">
                                        <a>
                                            <img src=${item.images} alt="" width="500" height="500">
                                        </a>
                                    </div>
                                    <div class="product-label">
                                        <div class="badge float-clearfix">
                                            <div>
                                                <a class="icon-new-label product-icon-label">NEW</a>
                                            </div>
                                        </div>	
                                    </div>
                                </li>`
            }.bind(this));
            this.main_ele.html(this.html);
        }
    }
    new GoodsImgList("http://127.0.0.1/Adidas/JSON/goods-thumbnail.json",".goods-list-render")

    // swiper-wrapper中渲染
    function GoodsSmallImg(url,main_selector){
        if(!url || !main_selector) return;
        this.url = url;
        this.main_ele = $(main_selector);
        this.init();
    }
    GoodsSmallImg.prototype = {
        consturctor:GoodsSmallImg,
        init(){
            this.load_data()
            .then(function(res){
                // console.log(res.thumbnail);
                this.json = res.thumbnail;
                this.render_img();
            }.bind(this))
        },
        load_data(){
            this.opt = {
                url:this.url
            }
            return $.ajax(this.opt);
        },
        render_img(){
            this.html = "";
            this.json.forEach(function(item){
                // console.log(item);
                this.html +=`<li class="swiper-slide" style="height: 10%;">
                                <div class="scroll-background-image">
                                    <a>
                                        <img src=${item.small_img} width="52" height="52" alt="">
                                        <div></div>
                                    </a>
                                </div>
                            </li>`
            }.bind(this))
            this.main_ele.html(this.html);
        }
    }
    new GoodsSmallImg("http://127.0.0.1/Adidas/JSON/goods-thumbnail.json",".swiper-wrapper");
    
    function ShopCart(url,main_selector){
        if(!url || !main_selector) return;
        this.url = url;
        this.main_ele = $(main_selector);
        this.init();
    }
    ShopCart.prototype = {
        consturctor:ShopCart,
        init:function(){
            this.load_data()
            .then(function(res){
                // console.log(res.goods)
                // console.log($.cookie("dataId"));
                this.json = res.goods;
                var cookieId = $.cookie("dataId");
                var cookieIdArray = JSON.parse(cookieId);
                // console.log(cookieIdArray);
                // console.log(res.goods);
                // 双重遍历
                $.each(cookieIdArray,function(index,item){
                    $.each(this.json,function(index1,item1){
                        if(item.id == item1.goods_id){
                            // console.log(item1);
                            this.sameId = item1;
                        }
                    }.bind(this))
                }.bind(this))
                // console.log(this.a)
                this.render()
                // 点击开启/关闭size选择框
                this.size = $(".dropdown").eq(0);
                // console.log(this.size);
                this.size.on("click",$.proxy(this.sizeList,this));
            }.bind(this));
            
            this.carNum = $(".header-cart").find("#icon-item-count");
            this.carNum.html(this.getSum());
            this.main_ele.on("click.addCar",".btn-addCar",$.proxy(this.addCar,this));
            this.main_ele.on("click.changeNum",".btn-addCar",$.proxy(this.changeNum,this));
            // console.log(this.carNum)
        },
        load_data:function(){
            var opt = {
                url : this.url
            }
            return $.ajax(this.url)
        },
        render:function(){
            // console.log(this.sameId)
            // 渲染title
            this.li = `<li>${this.sameId.goods_name}</li>`;
            this.main_ele.find(".list-inline")
            .eq(0).html(this.main_ele.find(".list-inline")
            .eq(0).html()+this.li)
            // console.log(this.main_ele.find(".list-inline")

            // 渲染右侧详情列表
            this.msg = `<div class="right-message"> 
                        <!-- 款式介绍 -->
                        <div class="msg-tit">
                            <div class="goods-tit">     
				                ${this.sameId.classify                                }
                            </div>
                            <h3>${this.sameId.goods_name}</h3>
                            <span class="goods-price">¥${this.sameId.price}</span>
                            <div class="login-text">
                                <p></p>
                            </div>
                        </div>
                        <!-- 颜色 -->
                        <div class="msg-color">
                            <h3>${this.sameId.color}</h3>
                            <ul class="clear">
                                <li data-id="1" class="is-active">
                                    <a href="">
                                        <img src=${this.sameId.images} alt="" style="opacity: 1;">
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <!-- 尺码及购买 -->
                        <div class="size-box">
                            <div class="size-info">
                                <div class="size-table">
                                    <p class="events-size-chart">尺码表</p>
                                </div>
                                <div class="size-num clear">
                                    <!-- 选择尺码框 -->
                                    <div class="select-size">
                                        <div class="dropdown">
                                            <a class="btn">
                                                <span class="dropdown-text">
                                                    选择尺码
                                                </span>
                                                <span class="dropdown-icon">
                                                    <i class="icon icon-caret"></i>
                                                </span>
                                            </a>
                                            <!-- 点击后出现尺码 -->
                                            <div class="size-list" style="display: none;">
                                                <div class="viewport">
                                                    <div class="overview clear">
                                                        <ul class="clear">
                                                            <li ipi="469654" size="XS" dispalysize="XS">
                                                                <a>XS</a>
                                                            </li>
                                                            <li ipi="469665" size="S" dispalysize="S">
                                                                <a>S</a>
                                                            </li>
                                                            <li ipi="469666" size="M" dispalysize="M">
                                                                <a>M</a>
                                                            </li>
                                                            <li ipi="469667" size="L" dispalysize="L">
                                                                <a>L</a>
                                                            </li>
                                                            <li ipi="469668" size="XL" dispalysize="XL">
                                                                <a>XL</a>
                                                            </li>
                                                            <li ipi="469669" size="2XL" dispalysize="2XL">
                                                                <a>2XL</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>  
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 选择数量框 -->
                                    <div class="select-num">
                                            <div class="dropdown1 block-sm">
                                                <select id="select">
                                                    <option value="999" selected="selected">请选择</option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                    <option value="6">6</option>
                                                    <option value="7">7</option>
                                                    <option value="8">8</option>
                                                    <option value="9">9</option>
                                                    <option value="10">10</option>
                                                </select>
                                            </div>
                                    </div>
                                </div>
                            </div>
                            <div class="show">
                                <a class="btn-buy">
                                    <span>立即购买</span>
                                </a>
                                <a class="btn-addCar" data-id=${this.sameId.goods_id}>
                                    加入购物袋
                                </a>
                                <div class="free-freight">
                                    <a class="e-free-freight-btn">
                                        <i class="icon icon-free-freight"></i>
                                        <span>该商品免运费</span>
                                    </a>
                                </div>
                                <div class="price-explain"> 
                                    <span>价格说明：上文显示的划线价格系该商品的建议零售价（而非法律意义上的原价），仅供您参考。</span> 
                                </div>
                            </div>
                        </div>
                        <div class="share-us clear">
                            <div>
                                <i class="icon icon-weibo"></i>
                            </div>
                            <div class="wechat">
                                <i class="icon icon-weixin"></i>
                            </div>
                            <!-- 移上显示二维码 -->
                            <div class="wechat-code-box">
                                <div>
                                    <img src="images/QRcode.png">
                                </div>
                                <p>扫一扫分享链接</p>
                            </div>
                        </div>
                    </div>`;
            this.main_ele.find(".detail-right")
            .eq(0).html(this.msg);
            // 渲染大图
            this.big_img =`<li>
                                <div class="scroll-background-image">
                                    <a>
                                        <img src=${this.sameId.largeimg} alt="" width="500" height="500">
                                    </a>
                                </div>
                                <div class="product-label">
                                    <div class="badge float-clearfix">
                                        <div>
                                            <a class="icon-new-label product-icon-label">NEW</a>
                                        </div>
                                    </div>	
                                </div>
                            </li>`
            this.main_ele.find(".goods-list-render")
            .eq(0).html(this.big_img);

        },
        sizeList:function(){
            this.size
            .children(".size-list")
            .toggle()
            .end()
            .toggleClass("is-open");
            $(".icon-caret")
            .eq(0)
            .toggleClass("icon-caret-on")
        },
        addCar:function(event){
            var target = event.target || event.srcElement;
            // console.log(target);
            var goodsIdCar = $(target).attr("data-id");
            // console.log(goodsIdCar)
            // 获取按钮的data-id
            var selNum = $("#select").val();

            if(selNum == 999) return;
            // console.log(Number($("#select").val()))
            if(!$.cookie("addShopCar")){
                var addShopCarArray = [
                    {
                        GoodsId : goodsIdCar,
                        num : selNum
                    }
                ] 
                $.cookie("addShopCar",JSON.stringify(addShopCarArray));
                return 0;
            }

            var addShopCarString = $.cookie("addShopCar");
            var addShopCarArray = JSON.parse(addShopCarString);
            // console.log(addShopCarArray);
            var hasItem = false;
            addShopCarArray.forEach(function(item){
                // console.log(item.num);
                // 遍历购物车数组，如果有当前项，自增
                if(item.GoodsId == goodsIdCar){
                    // console.log(typeof Number(selNum));
                    item.num = Number(item.num) + Number(selNum);
                    item.num = String(item.num);
                    hasItem = true;
                }
                // console.log(item)
            })
            if(!hasItem){
                var item = {
                    GoodsId:goodsIdCar,
                    num:selNum
                }
                addShopCarArray.push(item);
            }
            $.cookie("addShopCar",JSON.stringify(addShopCarArray));
            console.log(addShopCarArray);
        },
        changeNum:function(){
            this.carNum.html(this.getSum());
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
    new ShopCart("http://127.0.0.1/Adidas/JSON/goods.json","#wrapper")

    // Magnifier
    
    // 鼠标移上出现二维码
    $(".wechat").eq(0).on("mouseenter",function(){
        $(".wechat-code-box")
        .fadeToggle("normal","linear")
    })
    // 鼠标移出隐藏二维码
    $(".wechat").eq(0).on("mouseleave",function(){
        $(".wechat-code-box")
        .fadeToggle("normal","linear")
    })
})