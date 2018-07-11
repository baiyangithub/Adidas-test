$(function(){
    //点击后删除cookie提示
    $(".banner-close").on("click",function(){
        $(".banner-fixed-bottom").remove();
    })
    //点击后删除外部广告栏
    $(".icon-article-close").on("click",function(){
        $(".article-top").remove();
    })
    // 二级菜单
    $(".extention").nav();



    // 全屏轮播图
    function FullScreenBanner(banner_selector,options){
        // console.log(1)
        // console.log(base_ele);
        this.init(banner_selector,options);    
    }
    FullScreenBanner.prototype = {
        constructor:FullScreenBanner,
        init:function(banner_selector,options){
            // 当前显示的内容
            this.index = 0;
            // 主体元素选择
            this.bannerWrapper = $(banner_selector);
            // console.log(this.bannerWrapper);
            // 判断是否有动画模式
            this.direction = options.direction ? options.direction : "scroll";
            // 具体元素获取
            this.bannerItem = this.bannerWrapper.children(".article-banner-item");
            // 元素数量
            this.bannerNum = this.bannerItem.length;

            // 判断是否有分页传入
            this.pagination = $(options.pagination ? options.pagination.el : "")
            if(this.pagination.length !== 0){
                for(var i = 0; i < this.bannerNum;i++){
                    var $a = $("<a></a>");
                    this.pagination.append($a);
                    if(i == this.index){
                        $a.addClass("is-active");                  
                    }
                }
                // 获取所有分页元素
                this.paginationItem = this.pagination.children();
                this.paginationItem.on("click.changeIndex",{"turn":"toIndex"},$.proxy(this.change_index,this));
                this.paginationItem.on("click.animation",$.proxy(this.animation,this))
            }

            // 按钮元素获取
            if(typeof options.navigation == "object"){
                // console.log(1)
                this.btnPrev = $(options.navigation.prevEl);
                this.btnNext = $(options.navigation.nextEl);
                this.btnPrev
                .on("click",{"turn":"prev"},$.proxy(this.change_index,this))
                .on("click",$.proxy(this.animation,this));
                this.btnNext
                .on("click",{"turn":"next"},$.proxy(this.change_index,this))
                .on("click",$.proxy(this.animation,this))
            }


        },
        change_index:function(event){
            if(this.animation.moving){
                return;
            }
            // console.log(event.data);
            var turnList = {
                "toIndex":function(){
                    this.prev = this.index;
                    this.index = $(event.target).index();
                    // console.log($(event.target).index())
                }.bind(this),
                "prev":function(){
                    this.prev = this.index;
                    if(this.index == 0){
                        this.index = this.bannerNum - 1;
                    }else{
                        this.index --;
                    }
                    // console.log(this.prev,this.index);
                }.bind(this),
                "next":function(){
                    this.prev = this.index;
                    if(this.index == this.bannerNum - 1){
                        this.index = 0;
                    }else{
                        this.index ++;
                    }
                    // console.log(this.prev)
                }.bind(this)
            }

            if(!(typeof turnList[event.data.turn] == "function")) return 0;
            turnList[event.data.turn]();
        },
        animation:function(event){
            if(this.animation.moving){
                return;
            }
            if(this.prev == this.index) return ;
            var animationList = {
                "scroll":function(){
                    this.bannerItem
                    .stop()
                    .css({
                        zIndex : 0
                    })
                    .eq(this.prev)
                    .css({
                        zIndex : 2
                    })
                    .end()
                    .eq(this.index)
                    .css({
                        zIndex : 2
                    })
                    // 判断左右
                    if(this.prev > this.index){

                        // 向左 图片向右边走
                        if(this.prev == 3 && this.index == 0){
                            console.log(1)
                            this.bannerItem.eq(this.prev)
                            .animate({
                                left:-this.bannerItem.outerWidth()
                            },function(){this.animation.moving = false}.bind(this))
                            .end()
                            .eq(this.index)
                            .css({
                                left:this.bannerItem.outerWidth()
                            })
                            .animate({
                                left:0
                            },function(){this.animation.moving = false}.bind(this))
                        }else{ 
                            this.bannerItem.eq(this.prev)
                            .animate({
                                left:this.bannerItem.outerWidth()
                            },function(){this.animation.moving = false}.bind(this))
                            .end()
                            .eq(this.index)
                            .css({
                                left:-this.bannerItem.outerWidth()
                            })
                            .animate({
                                left:0
                            },function(){this.animation.moving = false}.bind(this))
                            // console.log("You")
                        }
                    }else{
                        // 向右 图片向左边走
                        if(this.prev == 0 && this.index == 3){
                            this.bannerItem.eq(this.prev)
                            .animate({
                                left:this.bannerItem.outerWidth()
                            },function(){this.animation.moving = false}.bind(this))
                            .end()
                            .eq(this.index)
                            .css({
                                left:-this.bannerItem.outerWidth()
                            })
                            .animate({
                                left:0
                            },function(){this.animation.moving = false}.bind(this))
                        }else{
                            this.bannerItem.eq(this.prev)
                            .animate({
                                left:-this.bannerItem.outerWidth()
                            },function(){this.animation.moving = false}.bind(this))
                            .end()
                            .eq(this.index)
                            .css({
                                left:this.bannerItem.outerWidth()
                            })
                            .animate({
                                left:0
                            },function(){this.animation.moving = false}.bind(this))
                        }   
                    }
                }.bind(this)


            }
            this.animation.moving = true;
            animationList[this.direction]();
            // 分页标签变换
            this.pagination
            .children()
            .eq(this.index)
            .addClass("is-active")
            .siblings()
            .removeClass("is-active")
        }
    }
    new FullScreenBanner(".article-banner-wrapper",{
        navigation: {
            nextEl: '.article-button-next',
            prevEl: '.article-button-prev',
                    },
        pagination:{
            el:".article-banner-pagination"
                    },
        direction:"scroll",
        loop:true
    })

    // 宽度变换 轮播图高度变换
    // $(window).resize(function(){
    //     $("..article-banner-wrapper")
    //     .css({
    //         height:$("..article-banner-wrapper").outerHeight() - 1
    //     });
    //     console.log($("..article-banner-wrapper").outerHeight())
    // })

})