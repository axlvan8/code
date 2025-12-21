



try{
var r;
//test.js
var bullets=[];
var g;
var d;
var u;
var hurt=0;
var dead=0;
var timer=0;
var reload=0;
var mouse=[false,false,false,false,0,0,0];
const player = {
    x: 0,
    y: 0,
    xvel: 0,
    yvel: 0,
    hp: 100,
    dead: false,
    dir: 1,
    hurtTimer: 0
    
};

var shoot=0;
var x=0;
var y=0;
var xvel=0;
var yvel=0;
var Dir1;
var ba = 0;
var pReload=0;
var controls=[false,false,true,false,false,false,true,false,0,0,"down arrow","s","up arrow",0,"left arrow","a","d"];
var phpa = 0;
var deadNOW=0;
var mphpa=66.5;
var speed;
var differ;
var hgj;
var groundhit=[0,-75,512,80];
var animate=0;
var mx;
var my;
var i2;
var tg;
var collide;
var ground;
var up;
var down;
var i1;
var rsfdsfds;
var uigjhghh;
var fddfddgh;
var jghjgkgh;
var mdown=false;
var yujhf=false;
var q=false;
var space=false;
var fg=0;

var vdd=["anguye7540","testtest"];
const canvas=document.getElementById('canvas');
const ctx=canvas.getContext('2d');

var costumes1={
    idle:new Image(),
    run:new Image(),
    hg:new Image()
};
costumes1.idle.src='Drawing-7.sketchpad.png';
canvas.addEventListener('mousemove', (e)=>{
    const rect=canvas.getBoundingClientRect();
    mx=e.clientX-rect.left;
    my=e.clientY-rect.top;
})
window.addEventListener('keydown',(e)=>{
    if(e.key==(controls[((i1*2)+9)])||e==(controls[((i1*2)+10)])){
        yujhf=true;
    }
    if(e.key=="q"||e=="Q"){
        q=true;
    }
    if(e.key==" "||e=="Space"||e=="space"){
        space=true;
    }
})
window.addEventListener('keyup',(e)=>{
    if(e.key==(controls[((i1*2)+9)])||e==(controls[((i1*2)+10)])){
        yujhf=false;
    }
     if(e.key=="q"||e=="Q"){
        q=false;
    }
        if(e.key==" "||e=="Space"||e=="space"){
        space=false;
    }
})
window.addEventListener('mousedown',()=>{
    mdown=true;
    
})
window.addEventListener('mouseup',()=>{
    mdown=false;
    
})
timer=0;
setInterval(function(){
    timer+=1;
},1000)


function t(argb1, argb2, percent) {
    const lerp = (a, b, p) => Math.round(a + (b - a) * (p / 100));

    const r1 = (argb1 >> 16) & 0xFF;
    const g1 = (argb1 >> 8) & 0xFF;
    const b1 = argb1 & 0xFF;

    const r2 = (argb2 >> 16) & 0xFF;
    const g2 = (argb2 >> 8) & 0xFF;
    const b2 = argb2 & 0xFF;

    const r = lerp(r1, r2, percent);
    const g = lerp(g1, g2, percent);
    const b = lerp(b1, b2, percent);

    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
}


function pLayer(){
    hurt-=1;
    if((2<timer)&&(dead==0)){
        cm()
        if(((reload<1)&&(mouse[3]==false))&&(mouse[4]==true)){
            broadcast("shoot")
            Cb((x+(xvel*0.5)),(y+4),Dir1,0,(10+(ba/0.1)*4))
            pReload=reload;
        }
    }else{
        controls[9]=0;
        controls[10]=0;
    }
    if(phpa<0){
        deadNOW+=1;
        if(deadNOW==1){
            yvel=8;
        }

    }else{
        phpa+=0.03;
        if(mphpa<=phpa){
            phpa=mphpa;
        }
    }
    pReload-=1;
    xvel+=(controls[9]*speed);
    xvel=(xvel*0.875);
    if(yvel<0){
        yvel=(yvel-(1.25+(controls[1]*0.5)))
    }else{
        yvel=(yvel-(0.5+(controls[1]*0.5)))
    }
    x+=xvel;
    differscroll(x,0,groundhit.c)
    x=differ;
    y+=yvel;
    animate+=xvel*0.1;
    if(!controls[9]==0){
        Dir1=controls[9];
    }
    if(!(mx==0)){
        Dir1=(mx/Math.abs(mx));
    }
    if(0<phpa){
        cis(x,((y+5.5)+(yvel*0.5)),8,(11+Math.abs(yvel*1)),false)
        if(ground){
            y=(y-(5.5+(yvel*-0.5)))

        }
    }
}
function broadcast(msg){
    if(msg=="shoot"){
        SHOOT();
    }
    if(msg=="draw"){
        draw();
    }
}

var animationTimer=0;
var fire={color};
function draw(){
    fire.color=((Math.sin(animationTimer*360)+1)*5)
}
function SHOOT(){

}
function differscroll(x1,x2,scroll){
    differ=((((((x1-x2)+(scroll/2))%scroll)+scroll)%scroll)-(scroll/2));
}
function spct(a1,r1,g1,b1){
    ctx.strokeStyle=(((a1*16777216)+(r1*65536))+((g1*256)+256))
}
function cis(x1,y1,w1,h1,up1){
    y=y1;
    i2=0;
    tg=0;
    for(i2=0;i2<groundhit.length;i2+=4){
        sqcollide(x1,y1,w1,h1,groundhit[(i2+1)],groundhit[(i2+2)],groundhit[(i2+3)],groundhit[(i2+4)]);
        if(collide){
            ground = true;
            if(up1){
                y=((h1/2)+groundhit[i2+2]+(groundhit[i2+4]/2))
            }
        }
        
    }

}
function sqcollide(x1,y1,x2,y2,x3,y3,x4,y4){
    collide=((Math.abs(x1-x3)<((x2/2)+(x4/2)))&&((Math.abs(y1-y3))<(y2/2)+(y4/2)));
}
function Cb(x1,y1,xvel1,yvel1,d1){
    bullets.push(x1);
    bullets.push(y1);
    bullets.push(xvel1);
    bullets.push(yvel1);
    bullets.push(0);
    bullets.push(d1);
}
function cm(m1){
    if(!m1){
        
        for(var i=0;i<4;i++){
            controls[i+4]=controls[i];
            controls[1]=yujhf;
            yujhf=false;
            
        }
        controls[9]=(controls[4]-controls[3]);
        controls[10]=(controls[2]-controls[1]);
    }else{
        controls[9]=((mx/Math.abs(mx))*mdown);
        controls[10]=((my/Math.abs(my))*mdown);
    }
}
var sdj=0;
var game=true;
var ff;
var rff;
var bhas;
var sandbox;
function init(){
    pLayer()
    rsfdsfds=timer;
    uigjhghh=0;
    fddfddgh=1;
    jghjgkgh=q;
    broadcast("reset");
    broadcast("init");
    broadcast("post");
    update()
}
function update(){
    setInterval(() => {
        upd()
        //dt
    }, 1000);
}
function upd(){
    inp()
    if(game){
        if(fddfddgh==1){
            rff=(ff);
            fddfddgh=0;
            broadcast("pu");
            broadcast(1);
            if(rff>0){
                broadcast(2);
                broadcast(3);
            }
            broadcast("ppu");
            ctx.clearRect(0,0,canvas.width,canvas.height);
            broadcast("draw");
            broadcast("gui");
            if(sandbox==1){
                if(bhas){
                    broadcast("sbuttons");
                }
            }
        }
    }
}
function inp(){
    if(mdown){
        if(fg==0){
            fg=1;
        }else{
            fg=2;
        }

    }else{
        if(fg>0){
            hgj=0;
        }
        fg=0
    }
    if(space){
        if(sdj==0){
            sdj=1;
        }else{
            sdj=2;
        }
    }else{
        sdj=0;
    }
}
var save=0;
var po=0;
var pause=0;
var skj=[];
var cells=[];
function saveData(data) {
    save=(save+data)+";";
    saveData2(data)
}
function saveData2(data){
    if(data==(data+"")&&!(Math.abs(data)=="infinity")){
        po=((((((data+po)+0.47)*6601)%999907)+999907)%999907)
    }
}

function setup(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    cells=[];
    for(var yhg=0;yhg<391;yhg++){
        cells.push("empty");
    }
    setInterval(function(){
        if(pause==0){
            
            skj=[];
            for(var hgf=0;hgf<391;hgf++){
                skj.push("n")
            }
            x=-220;
            y=-160;

        }
    },1000)
}
}catch(teer){
    alert(teer);
}
//new.js
function render3d(repeat,x1,y1,d1){
    
}