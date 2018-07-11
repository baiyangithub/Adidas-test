<?php
$conn=mysqli_connect("127.0.0.1",'root','',"userbase",3306);
$sql="set names utf8";
mysqli_query($conn,$sql);

@$uname=$_REQUEST['uname'];
@$upwd=$_REQUEST['upwd'];

$sql="select uid from usertable where uname='$uname' and upwd ='$upwd'" ;
$res=mysqli_query($conn,$sql);
$res=mysqli_fetch_row($res);
if(count($res)!=0){
    // 登录成功
    echo "1";
}else{
    // 登录失败
    echo "0";    
}
// echo json_encode(count($res));

