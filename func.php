<?php
/**
 * Created by Mr Shen.
 * User: SSS
 * Date: 2018/6/7
 * Time: 15:25
 * 认真写好每一行代码...
 */

function telcheck($tel){
    if(preg_match("/^1[34578]{1}\d{9}$/",$tel)){
        return true;
    }else{
        return false;
    }
}