// import { stringify } from "querystring";
// ???
$(function(){
    // 二级菜单JS调用
    $(".extention").nav();
    function AddCar(url,main_selector){
        if(!url || !main_selector) return;
        this.url = url;
        this.main_ele = $(main_selector);
        this.init();
    }
    AddCar.prototype = {
        constructor:AddCar,
        init:function(){
            this.load_data()
            .then(function(res){
                // console.log(res.goods)
                this.json = res.goods;
                this.render();
                // 更改页面select框中的物品数量
                this.changeNum();
                this.del = $(".goods-del");
                this.del.on("click.del",$.proxy(this.del_goods,this));
            }.bind(this));
            // 购物车标签数字
            this.carNum = $(".header-cart").find("#icon-item-count");
            this.carNum.html(this.getSum());
            // 获取登录成功的用户名
            this.useName = $(".loginName");
            this.useName.html(this.getUser());
        },
        load_data:function(){
            this.opt = {
                url : this.url
            }
            return $.ajax(this.opt);
        },
        render:function(){
            // console.log(this.BuyId)
            this.cookieId = $.cookie("addShopCar");
            // console.log(cookieId);
            this.cookieArray = JSON.parse(this.cookieId);
            // console.log(this.cookieArray)
            // 双重遍历添加商品详情
            this.cart = "";
            this.totalAll = 0;
            this.numAll = 0;
            $.each(this.cookieArray,function(index,item){
                $.each(this.json,function(index1,item1){
                    // console.log(item,item1);
                    if(item.GoodsId == item1.goods_id){
                        // console.log(item);
                        this.Cart = item;
                        this.BuyId = item1;
                        // 单价价格
                        this.price = Number(this.BuyId.price);
                        // 商品数量
                        this.GdNum = Number(this.Cart.num);
                        // 所有商品总数
                        this.numAll += this.GdNum;
                        // 总价
                        this.total = this.price * this.GdNum;
                        // 所有商品总价
                        this.totalAll += this.total;
                        // 选择框数量设置
                        this.cart   += `   <div class="cart-list-item">
                                            <div class="list-item-product-info">
                                                <!-- 选定 -->
                                                <div class="form-checkbox on">
                                                    <label>
                                                        <i class="icon icon-checked"></i>                                              
                                                    </label>
                                                </div>
                                                <!-- 详情 -->
                                                <div class="product-info-content">
                                                    <div class="product-img">
                                                        <a href="" target="_blank">
                                                            <img src=${this.BuyId.images} alt="">
                                                        </a>
                                                    </div>
                                                    <div class="product-info">
                                                        <p>
                                                            <a href="" target="_blank">${this.BuyId.goods_name}</a>
                                                            <span class="info-code">AC8582</span>
                                                        </p>
                                                        <div class="info-describe">
                                                            <p>颜色：
                                                                <span>${this.BuyId.color}</span>
                                                            </p>
                                                            <p class="info-size">尺码：
                                                                <span>4½</span>
                                                            </p>
                                                            <div class="info-price-num">
                                                                <p>¥${this.BuyId.price}</p>
                                                                <div class="info-num-select select-box">
                                                                    <div class="dropdown none block-sm">
                                                                        <select data-id="${this.BuyId.goods_id}"> 
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
                                                        <div class="product-operate clear">
                                                            <ul class="clear">
                                                                <li class="operate-edit">
                                                                    <a >编辑</a>
                                                                </li>
                                                                <li class="operate-delete">
                                                                    <a class="goods-del" data-id="${this.BuyId.goods_id}">删除</a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div class="info-subtotal">
                                                            <p>¥${this.total}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>`

                    }
                }.bind(this))
            }.bind(this))
            this.main_ele.find(".cart-product-list")
            .eq(0).html(this.cart);
            // console.log(this.total)
            // 渲染右侧结算栏
            this.priceRight = `<div class="cart-order-summary">
                                <div class="cart-order-num">
                                    订单摘要：
                                    <span>共 ${this.getSum()} 件</span>
                                </div>
                                <div class="cart-total-price clear">
                                    <div class="product-price clear">
                                        <p>商品金额</p>
                                        <p>¥${this.totalAll}.00</p>
                                    </div>
                                    <div class="coupon-price clear">
                                        <p>优惠金额</p>
                                        <p>-¥0.00</p>
                                    </div>
                                    <div class="product-total clear">
                                        <p>商品总计</p>
                                        <p>¥${this.totalAll}.00</p>
                                    </div>
                                </div>
                                <a class="btn btn-gradient-blue btn-have-arrow">
                                    <span>结算</span>
                                </a>
                            </div>`
            // this.
            this.main_ele.find(".shopping-cart-right")
            .eq(0).html(this.priceRight+this.main_ele.find(".shopping-cart-right")
            .eq(0).html());
            // 左侧title
            this.numTitle = `<div class="cart-title">
                                <h3>您的购物袋<span>共 ${this.numAll} 件</span></h3>
                                <a href="index.html">继续购物</a>
                            </div>`
            this.main_ele.find("#scl")
            .html(this.numTitle + this.main_ele.find("#scl").html());
            this.selAll = `<p class="cart-selected-num">
                                <span>（</span> 
                                <a href="javascript:void(0);">已选中${this.numAll}件</a> 
                                <span class="m-selected-info"></span>
                                <span>）</span>
                            </p>`
            this.main_ele.find(".cart-product-select-all")
            .eq(0).html(this.main_ele.find(".cart-product-select-all").eq(0).html()+this.selAll)
        },
        changeNum:function(){
            for(let i = 0;i < this.cookieArray.length;i++){
                var fixNum = this.cookieArray[i].num;
                $("select").eq(i).val(fixNum);
            }
        },
        del_goods:function(event){
            var target = event.target || event.srcElement;
            var delId = $(target).attr("data-id");
            $.each(this.cookieArray,function(index,item){
                if(item.GoodsId == delId){
                    // console.log(item)
                    this.delItem = item;
                }
            }.bind(this))
            this.cookieArray.splice($.inArray(this.delItem,this.cookieArray),1);
            console.log(this.cookieArray); 
            $.cookie("addShopCar",JSON.stringify(this.cookieArray));
            // 刷新页面
            window.location.reload();        
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
        },
        getUser:function(){
            if($.cookie("username") == null) return;
            var usernameString = $.cookie("username");
            if(usernameString){
                var usernameArray = JSON.parse(usernameString);
                $.each(usernameArray,function(index,item){
                    this.login = item;
                }.bind(this))
                // console.log(this.login.username)
                return this.login.username;
            }
        }

    }

    new AddCar("http://127.0.0.1/Adidas/JSON/goods.json","#container");
})