console.log('loaded script.js');

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let _krok = document.getElementById('krok');
let _kat = document.getElementById('kat');
let _aksjomat = document.getElementById('aksjomat');
let _regula = document.getElementById('regula');
let _x = document.getElementById('x');
let _y = document.getElementById('y');
let _iteracje = document.getElementById('iteracje');

let length=50;
let angle=0;
let angleDelta=Math.PI/2;
let x=250;
let y=250;
let stos = []

let plus=()=>{
    angle+=angleDelta;
}
let minus=()=>{
    angle-=angleDelta;
}
let drawLine=()=>{
    let yd = length * Math.sin(angle);
    let xd = length * Math.cos(angle);
    ctx.lineTo(x+xd, y+yd);
    x+=xd;
    y+=yd;
}
let move=()=>{
    let yd = length * Math.sin(angle);
    let xd = length * Math.cos(angle);
    x+=xd;
    y+=yd;
}
let addToStack=()=>{
    let object = {
        x,
        y,
        angle
    }
    stos.push(object);
}
let removeFromStack=()=>{
    let object = stos[stos.length-1];
    x=object.x;
    y=object.y;
    ctx.moveTo(x, y);
    angle=object.angle;
    stos.pop();
}

let rysuj=()=>{
    if(_krok.value == '') _krok.value = '50';
    if(_kat.value == '') _kat.value = '120';
    if(_x.value == '') _x.value = '100';
    if(_y.value == '') _y.value = '100';
    if(_iteracje.value == '') _iteracje.value = '2';
    
    
    let aksjomat = _aksjomat.value;
    commands = aksjomat;
    let rule = _regula.value;
    rule = rule.replace(/\s/g, '');
    rule = rule.split(',');
    length=parseFloat(_krok.value);
    angle=0;
    angleDelta=parseFloat(_kat.value)/180*Math.PI;
    x=parseFloat(_x.value);
    y=parseFloat(_y.value);
    let iterations = parseInt(_iteracje.value);

    let letters='';
    let rules_list=[];
    for(r of rule){
        letters+=r[0];
        rules_list.push(r.slice(2, r.length));
    }
    
    for(let i=0;i<iterations;i++){
        let new_commands = '';
        for(let c of commands){
            let added=false;
            for(let j in letters){
                if(letters[j]==c){
                    new_commands+=rules_list[j];
                    added=true;
                    break;
                }
            }
            if(!added) new_commands+=c;
        }
        commands=new_commands;
    }
    
    ctx.fillStyle="white";
    ctx.fillRect(0,0, 500, 500);
    ctx.strokeStyle='orange';
    ctx.beginPath();
    ctx.moveTo(x, y);
    for(c of commands){
        if      (c=='F') drawLine();
        else if (c=='+') plus();
        else if (c=='-') minus();
        else if (c=='f') move();
        else if (c=='[') addToStack();
        else if (c==']') removeFromStack();
    }
    
    ctx.stroke();    
}
rysuj();
_krok.oninput = (e)=>{
    document.getElementById('krok_text').innerHTML = _krok.value+'px';
    rysuj();
}
_kat.oninput = (e)=>{
    document.getElementById('kat_text').innerHTML = _kat.value+'°';    
    rysuj();
}
_x.oninput = (e)=>{
    document.getElementById('x_text').innerHTML = _x.value+'px';
    rysuj();
}
_y.oninput = (e)=>{
    document.getElementById('y_text').innerHTML = _y.value+'px';    
    rysuj();
}
_iteracje.oninput = (e)=>{
    document.getElementById('iteracje_text').innerHTML = _iteracje.value;    
    rysuj();
}

let krok_plus=()=>{_krok.value++; _krok.oninput();}
let krok_minus=()=>{_krok.value--; _krok.oninput();}
let kat_plus=()=>{_kat.value=(parseFloat(_kat.value)+0.5); _kat.oninput();}
let kat_minus=()=>{_kat.value-=0.5; _kat.oninput();}
let x_plus=()=>{_x.value++; _x.oninput();}
let x_minus=()=>{_x.value--; _x.oninput();}
let y_plus=()=>{_y.value++; _y.oninput();}
let y_minus=()=>{_y.value--; _y.oninput();}
let iteracje_plus=()=>{_iteracje.value++; _iteracje.oninput();}
let iteracje_minus=()=>{_iteracje.value--; _iteracje.oninput();}
