'use strict';
const form=document.querySelector('#details'), preview=document.querySelector('#signature'), status=document.querySelector('#status');
const ids=['name','title','email','phone','division'];
const divisions=['','WASTE Advisers','GEMS Innovation Hub','Mustard','Bicycle Cheese','Green Wheels','Honey Bean','Green Energy'];
const divisionLabel=d=>divisions.includes(d.division)&&d.division?d.division:'Green Economies Made Simple';

const logoSpecs={waste:{file:'division-waste.png',width:150,height:86},hub:{file:'division-hub.png',width:150,height:80},bicycle:{file:'division-bicycle.png',width:150,height:75},honey:{file:'division-honey.png',width:100,height:100}};
const logoMapping={'WASTE Advisers':'waste','GEMS Innovation Hub':'hub','Mustard':'bicycle','Bicycle Cheese':'bicycle','Green Wheels':'hub','Honey Bean':'honey','Green Energy':'hub'};
const divisionLogo=d=>logoSpecs[logoMapping[d.division]]||null;
const socialNames=['linkedin','facebook','youtube'];
const socialLabels={linkedin:'LinkedIn',facebook:'Facebook',youtube:'YouTube'};

const websites=[{label:'wasteadvisersmw.org',url:'https://www.wasteadvisersmw.org/'},{label:'greeneconomiesmadesimple.org',url:'https://www.greeneconomiesmadesimple.org/'},{label:'mustardlimited.com',url:'https://mustardlimited.com/'}];
const links={web:'https://www.wasteadvisersmw.org/',linkedin:'https://www.linkedin.com/company/waste-advisers-malawi/',facebook:'https://www.facebook.com/WASTEAdvisersMW',youtube:'https://www.youtube.com/@wasteadvisers2525'};
const escapeHtml=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const getDetails=()=>Object.fromEntries(ids.map(id=>[id,document.getElementById(id).value.trim()]));
const asset=name=>new URL('assets/'+name,location.href).href;
const img=(name,w,h,alt='')=>`<img src="${escapeHtml(asset(name))}" width="${w}" height="${h}" alt="${escapeHtml(alt)}" style="width:${w}px;height:${h}px;border:0;vertical-align:middle;">`;
const a=(label,url,color='#006632')=>`<a href="${escapeHtml(url)}" style="color:${color};text-decoration:none;">${label}</a>`;
function signatureHtml(d){
 const logo=divisionLogo(d),width=logo?1000:900;
 const row=(icon,label,url)=>`<tr><td width="24" style="width:24px;vertical-align:middle;">${img(icon+'-icon.png',16,16,icon)}</td><td style="font-family:Arial;font-size:12px;line-height:23px;">${a(escapeHtml(label),url,icon==='web'?'#006632':'#39463f')}</td></tr>`;
 const address=`<tr><td colspan="2" style="padding-top:0;font-family:Arial;font-size:12px;line-height:19px;color:#52635a;"><span style="font-size:17px;line-height:26px;font-weight:bold;color:#666666;white-space:nowrap;">GEMS/WASTE Advisers</span><br><span style="font-weight:bold;">PO Box 2504, Chigumula,<br>Blantyre, Malawi</span><br><span style="font-size:10px;color:#697c70;">Reg: COYR-RE7175A CG158</span></td></tr>`;
 const bottomLinks=`<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>${socialNames.map(n=>`<td valign="middle" height="18" style="vertical-align:middle;height:18px;padding-right:5px;line-height:0;">${a(img(n+'-black.png',18,18).replace('vertical-align:middle;','display:block;'),links[n],'#111111')}</td><td valign="middle" height="18" style="vertical-align:middle;height:18px;font-family:Arial;font-size:11px;line-height:14px;white-space:nowrap;padding-right:14px;">${a(socialLabels[n],links[n],'#111111')}</td>`).join('')}${websites.map((w,i)=>`<td valign="middle" height="18" style="vertical-align:middle;height:18px;font-family:Arial;font-size:11px;line-height:14px;white-space:nowrap;padding-right:${i<2?14:0}px;">${a(w.label,w.url)}</td>`).join('')}</tr></table>`;
 return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="${width}" style="width:${width}px;font-family:Arial,Helvetica,sans-serif;color:#39463f;"><tr><td width="220" valign="middle" style="width:220px;padding-right:20px;">${a(img('gems-logo.png',220,90,'GEMS Group'),links.web)}</td><td width="245" valign="top" style="width:245px;border-left:2px solid #ed921f;padding:0 20px;"><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td style="font-family:Arial;font-size:20px;line-height:26px;font-weight:bold;color:#006632;">${escapeHtml(d.name||'Your name')}</td></tr><tr><td style="font-family:Arial;font-size:12px;line-height:19px;font-weight:bold;color:#52635a;padding-top:4px;">${escapeHtml(d.title||'Your job title')}</td></tr><tr><td style="font-family:Arial;font-size:11px;line-height:17px;font-weight:normal;color:#006632;padding-top:5px;">${escapeHtml(divisionLabel(d))}</td></tr><tr><td style="padding-top:8px;"><table role="presentation" cellpadding="0" cellspacing="0" border="0">${row('email',d.email||'your.name@wasteadvisersmw.org','mailto:'+d.email)}${d.phone?row('phone',d.phone,'tel:'+d.phone.replace(/[^+\d]/g,'')):''}</table></td></tr></table></td><td width="260" valign="top" style="width:260px;border-left:1px solid #dce6df;padding:0 8px 0 16px;"><table role="presentation" cellpadding="0" cellspacing="0" border="0" style="font-family:Arial;">${address}</table></td>${logo?`<td width="170" align="center" valign="top" style="width:170px;border-left:1px solid #dce6df;padding-left:20px;">${img(logo.file,logo.width,logo.height,d.division)}</td>`:''}</tr><tr><td colspan="${logo?4:3}" align="right" style="padding-top:14px;"><table role="presentation" cellpadding="0" cellspacing="0" border="0" width="${width}" style="width:${width}px;border-top:1px solid #dce6df;"><tr><td align="right" style="padding-top:10px;">${bottomLinks}</td></tr></table></td></tr></table>`;
}

function render(){preview.innerHTML=signatureHtml(getDetails());}
function message(s,error=false,success=false){status.textContent=s;status.classList.toggle('error',error);status.classList.toggle('success',success&&Boolean(s));status.hidden=!s;const copyButton=document.querySelector('#copy');copyButton.classList.toggle('copied',success);copyButton.textContent=success?'✓ Copied!':'Copy signature';}
function valid(){if(!form.reportValidity())return false;const d=getDetails();if(!d.name||!d.title||!d.email){message('Please enter your name, job title and work email.',true);return false;}return true;}
form.addEventListener('input',()=>{render();message('Preview updated. Ready when you are.');});form.addEventListener('submit',e=>e.preventDefault());
document.querySelector('#copy').addEventListener('click',async()=>{
 if(!valid())return;
 const d=getDetails(),html=signatureHtml(d),plain=[d.name,d.title,divisionLabel(d),d.phone,d.email,...websites.map(w=>w.label),'GEMS/WASTE Advisers','PO Box 2504, Chigumula, Blantyre, Malawi','Reg: COYR-RE7175A CG158'].filter(Boolean).join('\n');
 try{
  if(navigator.clipboard?.write&&window.ClipboardItem){await navigator.clipboard.write([new ClipboardItem({'text/html':new Blob([html],{type:'text/html'}),'text/plain':new Blob([plain],{type:'text/plain'})})]);}
  else{const selection=window.getSelection(),range=document.createRange();range.selectNodeContents(preview);selection.removeAllRanges();selection.addRange(range);const copied=document.execCommand('copy');selection.removeAllRanges();if(!copied)throw Error('clipboard');}
  message('',false,true);
 }catch{message('Your browser blocked copying. Use Download for Word, or select the preview and copy it manually.',true);}
});
function rtfText(s){return String(s).split('').map(c=>c==='\\'?'\\\\':c==='{'?'\\{':c==='}'?'\\}':c==='\n'?'\\line ':c.charCodeAt(0)>127?'\\u'+(c.charCodeAt(0)>32767?c.charCodeAt(0)-65536:c.charCodeAt(0))+'?':c).join('');}
const rtfLink=(label,url)=>`{\\field{\\*\\fldinst HYPERLINK "${rtfText(url.replace(/["\r\n]/g,''))}"}{\\fldrslt{\\cf1 ${rtfText(label)}}}}`;
async function buildRtf(d){
 const logo=divisionLogo(d);
 const names=['gems-logo.png',...['phone','email'].map(n=>n+'-icon.png'),...socialNames.map(n=>n+'-black.png'),...(logo?[logo.file]:[])];
 const entries=await Promise.all(names.map(async n=>{const response=await fetch(asset(n));if(!response.ok)throw Error('image');const data=new Uint8Array(await response.arrayBuffer());return[n,Array.from(data,b=>b.toString(16).padStart(2,'0')).join('')];}));
 const images=Object.fromEntries(entries);
 const pic=(n,w,h)=>`{\\pict\\pngblip\\picwgoal${w}\\pichgoal${h} ${images[n]} }`;
 const contact=(icon,label,url)=>`\\pard\\intbl\\cf2\\b0\\fs18 ${pic(icon+'-icon.png',240,240)} ${rtfLink(label,url)}\\par `;
 const websiteLinks=websites.map(w=>rtfLink(w.label,w.url)).join('     ');
 const footerCells=[330,1250,1580,2600,2930,3800,6200,9800,12500];
 const footerRow=String.raw`\trowd\trgaph60\trleft0 ${footerCells.map(x=>String.raw`\clvertalc\cellx${x}`).join('')} ${socialNames.map(n=>String.raw`\pard\intbl\sb0\sa0\cf5\b0\fs16 ${pic(n+'-black.png',270,270)}\cell\pard\intbl\sb0\sa0\cf5\b0\fs16 ${rtfLink(socialLabels[n],links[n]).replace('\\cf1','\\cf5')}\cell`).join('')}${websites.map(w=>String.raw`\pard\intbl\sb0\sa0\cf1\b0\fs16 ${rtfLink(w.label,w.url)}\cell`).join('')}\row\pard\par`;

 return `{\\rtf1\\ansi\\deff0{\\fonttbl{\\f0 Arial;}}{\\colortbl;\\red0\\green102\\blue50;\\red57\\green70\\blue63;\\red237\\green146\\blue31;\\red220\\green230\\blue223;\\red0\\green0\\blue0;\\red102\\green102\\blue102;}\\paperw${logo?17000:14000}\\paperh5400\\margl480\\margr480\\margt480\\margb480\\viewkind4\\uc1\\f0\\fs18\\cf2
\\trowd\\trgaph180\\trleft0\\clvertalc\\cellx3600\\clvertalt\\clbrdrl\\brdrs\\brdrw20\\brdrcf3\\cellx8100\\clvertalt\\clbrdrl\\brdrs\\brdrw5\\brdrcf4\\cellx12500${logo?'\\clvertalt\\clbrdrl\\brdrs\\brdrw5\\brdrcf4\\cellx15500':''}
\\pard\\intbl ${pic('gems-logo.png',3300,1350)}\\cell
\\pard\\intbl\\cf1\\b\\fs30 ${rtfText(d.name)}\\par\\pard\\intbl\\cf2\\b\\fs18 ${rtfText(d.title)}\\par\\pard\\intbl\\cf1\\b0\\fs16 ${rtfText(divisionLabel(d))}\\par ${contact('email',d.email,'mailto:'+d.email)}${d.phone?contact('phone',d.phone,'tel:'+d.phone.replace(/[^+\d]/g,'')):''}\\cell
\\pard\\intbl\\sb0\\cf6\\b\\fs26 GEMS/WASTE Advisers\\par\\pard\\intbl\\sb0\\cf2\\b\\fs18 PO Box 2504, Chigumula,\\par Blantyre, Malawi\\par\\b0\\fs14 Reg: COYR-RE7175A CG158\\cell${logo?'\\pard\\intbl\\qc '+pic(logo.file,logo.width*15,logo.height*15)+'\\cell':''}\\row\\pard\\fs2\\par ${footerRow}}`;
}

document.querySelector('#download').addEventListener('click',async()=>{if(!valid())return;const button=document.querySelector('#download');button.disabled=true;message('Preparing your signature with embedded images…');try{const d=getDetails(),rtf=await buildRtf(d);const url=URL.createObjectURL(new Blob([rtf],{type:'application/rtf'}));const el=document.createElement('a');el.href=url;el.download='GEMS-'+d.name.replace(/[^a-zA-Z0-9]+/g,'-')+'-Signature.rtf';document.body.appendChild(el);el.click();el.remove();setTimeout(()=>URL.revokeObjectURL(url),60000);message('Downloaded. Open in Microsoft Word, press Ctrl+A then Ctrl+C, and paste into Outlook with Keep Source Formatting.');}catch{message('The images could not be loaded. Please check your connection and try downloading again.',true);}finally{button.disabled=false;}});
if(document.modelContext?.registerTool){const lifecycle=new AbortController();try{Promise.resolve(document.modelContext.registerTool({name:'configure_signature',description:'Set the employee details and update the visible GEMS signature preview. Does not copy or download.',inputSchema:{type:'object',properties:Object.fromEntries(ids.map(id=>[id,id==='division'?{type:'string',enum:divisions}:{type:'string',maxLength:id==='email'?150:110}])),required:['name','title','email'],additionalProperties:false},annotations:{readOnlyHint:false},execute(input){if(!input||typeof input!=='object'||Object.keys(input).some(k=>!ids.includes(k)))throw Error('Invalid details');for(const id of ['name','title','email'])if(typeof input[id]!=='string'||!input[id].trim())throw Error('Required details missing');for(const id of ids)if(input[id]!==undefined&&(typeof input[id]!=='string'||input[id].length>document.getElementById(id).maxLength))throw Error('Invalid field');if(input.division!==undefined&&!divisions.includes(input.division))throw Error('Invalid division');if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email))throw Error('Invalid email');for(const id of ids)document.getElementById(id).value=input[id]||'';render();message('Preview updated.');return{status:'preview_updated',details:getDetails()};}},{signal:lifecycle.signal})).catch(()=>{});}catch{}window.addEventListener('pagehide',()=>lifecycle.abort(),{once:true});}
render();









