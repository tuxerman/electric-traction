// Shared SVG helpers and the side-elevation drawings, used by the Layout (static) and Power flow (animated) pages.
const NS="http://www.w3.org/2000/svg";
const el=(n,a)=>{const e=document.createElementNS(NS,n);for(const k in a)e.setAttribute(k,a[k]);return e};
const txt=(svg,x,y,s,o={})=>{const t=el("text",{x,y,"text-anchor":o.a||"middle",fill:o.fill||"var(--ink)","font-family":o.f||"var(--body)","font-size":o.size||12,"font-weight":o.w||400});t.textContent=s;svg.append(t);return t};
function side(svg,cfg){
  const defs=el("defs",{});const m=el("marker",{id:"ah"+cfg.k,viewBox:"0 0 10 10",refX:"7",refY:"5",markerWidth:"4",markerHeight:"4",orient:"auto"});
  m.append(el("path",{d:"M1 1L9 5L1 9z",style:"fill:var(--power)"}));defs.append(m);svg.append(defs);
  // quiet structure (body, cabs, bogies, rail) so the equipment and the flow lines carry the colour
  svg.append(el("line",{x1:10,y1:276,x2:890,y2:276,stroke:"var(--line)","stroke-width":2}));
  svg.append(el("rect",{x:20,y:80,width:860,height:120,rx:12,fill:"var(--bg)",stroke:"var(--line)","stroke-width":1.5}));
  for(const x of [100,800])svg.append(el("line",{x1:x,y1:84,x2:x,y2:196,stroke:"var(--line)"}));
  txt(svg,60,145,"Cab 1",{fill:"var(--muted)",f:"var(--mono)"});txt(svg,840,145,"Cab 2",{fill:"var(--muted)",f:"var(--mono)"});
  for(const px of [230,670]){
    svg.append(el("polyline",{points:`${px-28},80 ${px},50 ${px+28},80`,fill:"none",stroke:"var(--muted)","stroke-width":2}));
    svg.append(el("line",{x1:px-22,y1:46,x2:px+22,y2:46,stroke:"var(--muted)","stroke-width":3,"stroke-linecap":"round"}));
    txt(svg,px,32,"Pantograph",{fill:"var(--muted)"});
  }
  for(const [x0] of [[cfg.b1],[cfg.b2]]){
    svg.append(el("rect",{x:x0,y:206,width:200,height:46,rx:6,fill:"none",stroke:"var(--line)","stroke-dasharray":"5 5","stroke-width":1.5}));
    for(const i of [0,1,2])svg.append(el("circle",{cx:x0+35+i*65,cy:259,r:15,fill:"var(--paper)",stroke:"var(--line)","stroke-width":2}));
    txt(svg,x0+100,226,cfg.motorLabel,{size:13,w:600,fill:"var(--muted)"});
  }
  // grey boxes: equipment off the traction path. Name lines in the body font, the IR code (in brackets) in mono.
  for(const g of cfg.grey){
    svg.append(el("rect",{x:g.x,y:96,width:g.w,height:60,rx:6,fill:"var(--grey-bg)"}));
    const sz=cfg.greySize,lh=sz+2;
    g.l.forEach((l,i,a)=>txt(svg,g.x+g.w/2,126+sz/2-1+(i-(a.length-1)/2)*lh,l,{size:sz,fill:"var(--muted)",f:l[0]==="("?"var(--mono)":"var(--body)"}));
  }
  for(const it of cfg.items){
    svg.append(el("rect",{x:it.x,y:it.y,width:it.w,height:it.h,rx:6,fill:it.off?"none":`var(--${it.cat}-bg)`,stroke:it.off?"var(--muted)":`var(--${it.cat})`,"stroke-width":it.off?1.2:1.5,"stroke-dasharray":it.off?"5 5":"none"}));
    if(it.small)it.lines.forEach((l,i,arr)=>txt(svg,it.x+it.w/2,it.y+it.h/2+4+(i-(arr.length-1)/2)*11,l,{size:9,w:i?400:600,fill:i?"var(--muted)":"var(--ink)",f:l[0]==="("?"var(--mono)":"var(--body)"}));
    else (it.lines||[it.t]).forEach((l,i,arr)=>txt(svg,it.x+it.w/2,it.y+it.h/2+5+(i-(arr.length-1)/2)*15,l,{size:i?11:13,w:i?400:600,fill:i?"var(--muted)":"var(--ink)"}));
    if(it.above)txt(svg,it.x+it.w/2,it.y-8,it.above,{fill:"var(--muted)"});
  }
  if(!cfg.flows)return cfg;
  // coach (hotel) supply runs whether motoring or braking, so it is drawn outside the mode groups
  if(cfg.hotelFlows){
    const hm=el("marker",{id:"ahh"+cfg.k,viewBox:"0 0 10 10",refX:"7",refY:"5",markerWidth:"4",markerHeight:"4",orient:"auto"});
    hm.append(el("path",{d:"M1 1L9 5L1 9z",style:"fill:var(--hotel)"}));defs.append(hm);
    const g=el("g",{});
    for(const p of cfg.hotelFlows)g.append(el("polyline",{points:p.map(q=>q.join(",")).join(" "),class:"flow hot","marker-end":`url(#ahh${cfg.k})`}));
    for(const n of cfg.hotelNotes)txt(g,n[0],n[1],n[2],{fill:"var(--hotel)",w:600,size:12,a:n[3]});
    svg.append(g);
  }
  for(const md of ["motor","brake"]){
    const g=el("g",{"data-flow":md});
    for(const p of cfg.flows[md])g.append(el("polyline",{points:p.map(q=>q.join(",")).join(" "),class:"flow","marker-end":`url(#ah${cfg.k})`}));
    for(const n of cfg.notes[md]||[])txt(g,n[0],n[1],n[2],{fill:"var(--power)",w:600,size:12});
    svg.append(g);cfg.groups=cfg.groups||{};cfg.groups[md]=g;
  }
  return cfg;
}
const rev=a=>[...a].reverse();
const S7flows=[[[245,62],[432,62]],[[450,74],[450,202]],[[384,204],[384,190]],[[516,204],[516,190]],[[310,172],[250,172],[250,203]],[[582,172],[650,172],[650,203]]];
const cfg7=k=>({k,b1:100,b2:600,motorLabel:"3 induction motors",
  greySize:9,
  grey:[{x:116,w:56,l:["Control","cubicle","(SB1)"]},{x:176,w:56,l:["Aux","converter","(BUR1)"]},{x:236,w:56,l:["Air","compressor","(CP)"]},
        {x:590,w:42,l:["Cooling","unit"]},{x:702,w:46,l:["Aux","converter","(BUR2)"]},{x:751,w:44,l:["Control","cubicle","(SB2)"]}],
  items:[{x:435,y:52,w:30,h:22,cat:"ctrl",t:"",above:"Main breaker (VCB)"},
         {x:310,y:96,w:120,h:90,cat:"power",lines:["Traction","converter (SR1)"]},
         {x:462,y:96,w:120,h:90,cat:"power",lines:["Traction","converter (SR2)"]},
         {x:635,y:96,w:64,h:60,cat:"hotel",lines:["Hotel","load conv.","(HLC 1+2)"],small:true},
         {x:330,y:206,w:240,h:40,off:true,cat:"power",lines:["Main transformer","under floor, no taps"]}],
  flows:{motor:S7flows,brake:S7flows.map(rev)},
  notes:{brake:[[340,74,"back to the 25 kV line"]]},
  // hotel winding (in the transformer) -> hotel load converters -> IV coupler at the loco end
  hotelFlows:[[[566,204],[566,192],[667,192],[667,160]],[[667,94],[667,88],[876,88],[876,186],[891,186]]],
  hotelNotes:[[870,74,"to the coaches",'end']]});
const S4mot=[[[245,62],[296,62]],[[344,62],[450,62],[450,88]],[[380,150],[364,150]],[[520,150],[536,150]],[[332,183],[332,203]],[[568,183],[568,203]],[[300,226],[284,226]],[[600,226],[616,226]]];
const cfg4=k=>({k,b1:80,b2:620,motorLabel:"3 DC series motors",
  greySize:10,
  grey:[{x:116,w:64,l:["Air","compressor","(CP)"]},{x:186,w:70,l:["Motor","blower 1","(MVMT1)"]},
        {x:650,w:70,l:["Motor","blower 2","(MVMT2)"]},{x:726,w:60,l:["Arno","converter"]}],
  items:[{x:298,y:52,w:44,h:22,cat:"ctrl",t:"",above:"Main breaker (DJ)"},
         {x:520,y:50,w:120,h:30,cat:"power",lines:["Brake resistors"]},
         {x:380,y:90,w:140,h:106,cat:"power",lines:["Transformer","+ tap changer"]},
         {x:298,y:110,w:62,h:70,cat:"power",lines:["Silicon","rectifier 1"]},
         {x:540,y:110,w:62,h:70,cat:"power",lines:["Silicon","rectifier 2"]},
         {x:300,y:206,w:82,h:40,off:true,cat:"power",lines:["Smoothing","reactor (SL)"]},
         {x:518,y:206,w:82,h:40,off:true,cat:"power",lines:["Smoothing","reactor (SL)"]}],
  flows:{motor:S4mot,brake:[[[268,203],[268,86],[536,86],[536,83]],[[630,203],[630,84]]]},
  notes:{brake:[[580,40,"heat to the air"]]}});
