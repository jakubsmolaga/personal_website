let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let ile_kat=3;
let iterations=50*50*20;
let points=[];
for(let angle=0,i=0;i<ile_kat;i++){
    angle+=2*Math.PI/ile_kat;
    points.push( [250 + Math.cos(angle)*200, 250 + Math.sin(angle)*200] );
}
for(point of points)
    ctx.fillRect(point[0], point[1], 1, 1);

let x=Math.random()*500;
let y=Math.random()*500;

let f=()=>{
    let point = points[Math.floor(Math.random()*points.length)];
    x=(x+point[0])/2;
    y=(y+point[1])/2;
    ctx.fillRect(x, y, 1, 1);
}
for(let i=0;i<iterations;i++)
    f();

document.getElementById('ile_kat').oninput=(e)=>{
    ile_kat=document.getElementById('ile_kat').value;
    document.getElementById('ile_kat_text').innerHTML=ile_kat;
    points=[];
    for(let angle=0,i=0;i<ile_kat;i++){
        angle+=2*Math.PI/ile_kat;
        points.push( [250 + Math.cos(angle)*200, 250 + Math.sin(angle)*200] );
    }
    ctx.fillStyle='white';
    ctx.fillRect(0,0,500,500);
    ctx.fillStyle='black';
    
    for(let i=0;i<iterations;i++)
        f();
}

document.getElementById('iteracje').oninput=(e)=>{
    iterations=document.getElementById('iteracje').value;
    iterations=iterations*iterations*20;
    document.getElementById('iteracje_text').innerHTML=iterations;
    ctx.fillStyle='white';
    ctx.fillRect(0,0,500,500);
    ctx.fillStyle='black';
    
    for(let i=0;i<iterations;i++)
        f();
}