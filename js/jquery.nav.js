;
+function($){
    $.fn.nav = function(){
        // console.log(this)
        // console.log($(this))
        this
        .on("mouseenter",function(){
            $(this)
            .children(".sub-menu")
            .stop()
            .stop()
            .slideDown()
            .end()
            .siblings()
            .children(".sub-menu")
            .stop()
            .slideUp() 
        })
        .on("mouseleave",function(){
            $(this)
            .children(".sub-menu")
            .stop()
            .slideUp()
        })
        // console.log($(this).children(".sub-menu"))
    }
}(jQuery)
// 二级菜单插件
// 使用方法：$(".extention").nav();