<?php
$conn=mysqli_connect("127.0.0.1",'root','',"userbase",3306);
$sql="set names utf8";
mysqli_query($conn,$sql);

@$uname=$_REQUEST['uname'];
@$upwd=$_REQUEST['upwd'];

$sql="insert into usertable values(default,'$uname','$upwd');";

// echo $sql;
$res=mysqli_query($conn,$sql);
// echo $res;
if($res){
    // 注册成功
    echo "1";
}else{
    // 注册失败
    echo "0";
}
