'use strict';
const OPEN_FLAG = 1;
const CLOSE_FLAG = 0;

let flag = CLOSE_FLAG;



//const menu_container = document.querySelector('.menu_container');
 $(function(){
    $('#menu_btn').click(function () {
        if(flag == CLOSE_FLAG){
            $('.menu_container').addClass('open');
            flag = OPEN_FLAG;
        }else if(flag == OPEN_FLAG){
            $('.menu_container').removeClass('open');
            flag = CLOSE_FLAG;
        }
    });
}) ;

function changestatus() {
    let post_status =document.getElementById('post-status');
    let status = document.getElementById('status').checked;
    if(status === true) post_status.submit();
}





