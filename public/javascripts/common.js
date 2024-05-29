let cursor = document.querySelector(".cursor" );
document.querySelector('main').addEventListener('mousemove' , function(dets){
    // console.log(dets)
    cursor.style.left = dets.x + "px";
    cursor.style.top = dets.y + "px";
})

