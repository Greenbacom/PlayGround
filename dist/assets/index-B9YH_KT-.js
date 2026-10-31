(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ll="187",Su=0,Yl=1,yu=2,Zr=1,ph=2,Ws=3,zi=0,Mn=1,Le=2,Bi=0,Ys=1,He=2,Kl=3,$l=4,bu=5,hs=100,wu=101,Eu=102,Tu=103,Au=104,Ru=200,Cu=201,Pu=202,Lu=203,mh=204,gh=205,Du=206,Iu=207,Nu=208,Uu=209,Fu=210,Ou=211,Bu=212,zu=213,ku=214,ho=0,uo=1,fo=2,js=3,po=4,mo=5,go=6,_o=7,_h=0,Gu=1,Hu=2,ci=0,cl=1,hl=2,ul=3,Sa=4,dl=5,fl=6,pl=7,xh=300,Ms=301,tr=302,Ra=303,Ca=304,ra=1e3,oi=1001,xo=1002,en=1003,Vu=1004,mr=1005,En=1006,Pa=1007,Mi=1008,Dn=1009,vh=1010,Mh=1011,er=1012,ml=1013,Qn=1014,Vn=1015,An=1016,gl=1017,_l=1018,Ss=1020,Sh=35902,yh=35899,bh=1021,wh=1022,Jn=1023,bi=1026,Si=1027,xl=1028,vl=1029,ki=1030,Ml=1031,Sl=1033,Jr=33776,Qr=33777,jr=33778,ta=33779,vo=35840,Mo=35841,So=35842,yo=35843,bo=36196,wo=37492,Eo=37496,To=37488,Ao=37489,aa=37490,Ro=37491,Co=37808,Po=37809,Lo=37810,Do=37811,Io=37812,No=37813,Uo=37814,Fo=37815,Oo=37816,Bo=37817,zo=37818,ko=37819,Go=37820,Ho=37821,Vo=36492,Wo=36494,Xo=36495,qo=36283,Yo=36284,oa=36285,Ko=36286,Wu=3200,$o=0,Xu=1,vi="",tn="srgb",la="srgb-linear",ca="linear",Me="srgb",La=7680,qu=519,Yu=512,Ku=513,$u=514,Eh=515,Zu=516,Ju=517,Th=518,Ah=519,Rh=35044,Ch=35048,Zl="300 es",Wn=2e3,nr=2001;function Qu(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function ha(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function ju(){const i=ha("canvas");return i.style.display="block",i}const Jl={};function ua(...i){const t="THREE."+i.shift();console.log(t,...i)}function Ph(i){const t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){const e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Gt(...i){i=Ph(i);const t="THREE."+i.shift();{const e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function de(...i){i=Ph(i);const t="THREE."+i.shift();{const e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function ms(...i){const t=i.join(" ");t in Jl||(Jl[t]=!0,Gt(...i))}function td(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const ed={[ho]:ho,[fo]:go,[po]:po,[js]:mo,[uo]:uo,[go]:fo,[_o]:_o,[mo]:js};class Hi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const s=n[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const an=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Ql=1234567;const Ks=Math.PI/180,ir=180/Math.PI;function wi(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(an[i&255]+an[i>>8&255]+an[i>>16&255]+an[i>>24&255]+"-"+an[t&255]+an[t>>8&255]+"-"+an[t>>16&15|64]+an[t>>24&255]+"-"+an[e&63|128]+an[e>>8&255]+"-"+an[e>>16&255]+an[e>>24&255]+an[n&255]+an[n>>8&255]+an[n>>16&255]+an[n>>24&255]).toLowerCase()}function ee(i,t,e){return Math.max(t,Math.min(e,i))}function yl(i,t){return(i%t+t)%t}function nd(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function id(i,t,e){return i!==t?(e-i)/(t-i):0}function $s(i,t,e){return(1-e)*i+e*t}function sd(i,t,e,n){return $s(i,t,1-Math.exp(-e*n))}function rd(i,t=1){return t-Math.abs(yl(i,t*2)-t)}function ad(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function od(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function ld(i,t){return i+Math.floor(Math.random()*(t-i+1))}function cd(i,t){return i+Math.random()*(t-i)}function hd(i){return i*(.5-Math.random())}function ud(i){i!==void 0&&(Ql=i);let t=Ql+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function dd(i){return i*Ks}function fd(i){return i*ir}function pd(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function md(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Lh(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function gd(i,t,e,n,s){const r=Math.cos,a=Math.sin,l=r(e/2),o=a(e/2),c=r((t+n)/2),h=a((t+n)/2),d=r((t-n)/2),u=a((t-n)/2),f=r((n-t)/2),_=a((n-t)/2);switch(s){case"XYX":i.set(l*h,o*d,o*u,l*c);break;case"YZY":i.set(o*u,l*h,o*d,l*c);break;case"ZXZ":i.set(o*d,o*u,l*h,l*c);break;case"XZX":i.set(l*h,o*_,o*f,l*c);break;case"YXY":i.set(o*f,l*h,o*_,l*c);break;case"ZYZ":i.set(o*_,o*f,l*h,l*c);break;default:Gt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function ya(i){switch(i.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function bl(i,t){if(t.constructor===Float32Array)return i;const e=ya(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(i/e,-1)}function wl(i,t){if(t.constructor===Float32Array)return i;const e=ya(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(i*e)}const Da={DEG2RAD:Ks,RAD2DEG:ir,generateUUID:wi,clamp:ee,euclideanModulo:yl,mapLinear:nd,inverseLerp:id,lerp:$s,damp:sd,pingpong:rd,smoothstep:ad,smootherstep:od,randInt:ld,randFloat:cd,randFloatSpread:hd,seededRandom:ud,degToRad:dd,radToDeg:fd,isPowerOfTwo:pd,ceilPowerOfTwo:md,floorPowerOfTwo:Lh,setQuaternionFromProperEuler:gd,normalize:wl,denormalize:bl},Bl=class Bl{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=ee(this.x,t.x,e.x),this.y=ee(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=ee(this.x,t,e),this.y=ee(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ee(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(ee(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Bl.prototype.isVector2=!0;let Ct=Bl;class Xn{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,l){let o=n[s+0],c=n[s+1],h=n[s+2],d=n[s+3],u=r[a+0],f=r[a+1],_=r[a+2],x=r[a+3];if(d!==x||o!==u||c!==f||h!==_){let m=o*u+c*f+h*_+d*x;m<0&&(u=-u,f=-f,_=-_,x=-x,m=-m);let p=1-l;if(m<.9995){const M=Math.acos(m),E=Math.sin(M);p=Math.sin(p*M)/E,l=Math.sin(l*M)/E,o=o*p+u*l,c=c*p+f*l,h=h*p+_*l,d=d*p+x*l}else{o=o*p+u*l,c=c*p+f*l,h=h*p+_*l,d=d*p+x*l;const M=1/Math.sqrt(o*o+c*c+h*h+d*d);o*=M,c*=M,h*=M,d*=M}}t[e]=o,t[e+1]=c,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,s,r,a){const l=n[s],o=n[s+1],c=n[s+2],h=n[s+3],d=r[a],u=r[a+1],f=r[a+2],_=r[a+3];return t[e]=l*_+h*d+o*f-c*u,t[e+1]=o*_+h*u+c*d-l*f,t[e+2]=c*_+h*f+l*u-o*d,t[e+3]=h*_-l*d-o*u-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,a=t._order,l=Math.cos,o=Math.sin,c=l(n/2),h=l(s/2),d=l(r/2),u=o(n/2),f=o(s/2),_=o(r/2);switch(a){case"XYZ":this._x=u*h*d+c*f*_,this._y=c*f*d-u*h*_,this._z=c*h*_+u*f*d,this._w=c*h*d-u*f*_;break;case"YXZ":this._x=u*h*d+c*f*_,this._y=c*f*d-u*h*_,this._z=c*h*_-u*f*d,this._w=c*h*d+u*f*_;break;case"ZXY":this._x=u*h*d-c*f*_,this._y=c*f*d+u*h*_,this._z=c*h*_+u*f*d,this._w=c*h*d-u*f*_;break;case"ZYX":this._x=u*h*d-c*f*_,this._y=c*f*d+u*h*_,this._z=c*h*_-u*f*d,this._w=c*h*d+u*f*_;break;case"YZX":this._x=u*h*d+c*f*_,this._y=c*f*d+u*h*_,this._z=c*h*_-u*f*d,this._w=c*h*d-u*f*_;break;case"XZY":this._x=u*h*d-c*f*_,this._y=c*f*d-u*h*_,this._z=c*h*_+u*f*d,this._w=c*h*d+u*f*_;break;default:Gt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],l=e[5],o=e[9],c=e[2],h=e[6],d=e[10],u=n+l+d;if(u>0){const f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-o)*f,this._y=(r-c)*f,this._z=(a-s)*f}else if(n>l&&n>d){const f=2*Math.sqrt(1+n-l-d);this._w=(h-o)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+c)/f}else if(l>d){const f=2*Math.sqrt(1+l-n-d);this._w=(r-c)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(o+h)/f}else{const f=2*Math.sqrt(1+d-n-l);this._w=(a-s)/f,this._x=(r+c)/f,this._y=(o+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ee(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,a=t._w,l=e._x,o=e._y,c=e._z,h=e._w;return this._x=n*h+a*l+s*c-r*o,this._y=s*h+a*o+r*l-n*c,this._z=r*h+a*c+n*o-s*l,this._w=a*h-n*l-s*o-r*c,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,l=this.dot(t);l<0&&(n=-n,s=-s,r=-r,a=-a,l=-l);let o=1-e;if(l<.9995){const c=Math.acos(l),h=Math.sin(c);o=Math.sin(o*c)/h,e=Math.sin(e*c)/h,this._x=this._x*o+n*e,this._y=this._y*o+s*e,this._z=this._z*o+r*e,this._w=this._w*o+a*e,this._onChangeCallback()}else this._x=this._x*o+n*e,this._y=this._y*o+s*e,this._z=this._z*o+r*e,this._w=this._w*o+a*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const zl=class zl{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(jl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(jl.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,l=t.z,o=t.w,c=2*(a*s-l*n),h=2*(l*e-r*s),d=2*(r*n-a*e);return this.x=e+o*c+a*d-l*h,this.y=n+o*h+l*c-r*d,this.z=s+o*d+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=ee(this.x,t.x,e.x),this.y=ee(this.y,t.y,e.y),this.z=ee(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=ee(this.x,t,e),this.y=ee(this.y,t,e),this.z=ee(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ee(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,a=e.x,l=e.y,o=e.z;return this.x=s*o-r*l,this.y=r*a-n*o,this.z=n*l-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Ia.copy(this).projectOnVector(t),this.sub(Ia)}reflect(t){return this.sub(Ia.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(ee(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};zl.prototype.isVector3=!0;let C=zl;const Ia=new C,jl=new Xn,kl=class kl{constructor(t,e,n,s,r,a,l,o,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,l,o,c)}set(t,e,n,s,r,a,l,o,c){const h=this.elements;return h[0]=t,h[1]=s,h[2]=l,h[3]=e,h[4]=r,h[5]=o,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],l=n[3],o=n[6],c=n[1],h=n[4],d=n[7],u=n[2],f=n[5],_=n[8],x=s[0],m=s[3],p=s[6],M=s[1],E=s[4],b=s[7],A=s[2],w=s[5],g=s[8];return r[0]=a*x+l*M+o*A,r[3]=a*m+l*E+o*w,r[6]=a*p+l*b+o*g,r[1]=c*x+h*M+d*A,r[4]=c*m+h*E+d*w,r[7]=c*p+h*b+d*g,r[2]=u*x+f*M+_*A,r[5]=u*m+f*E+_*w,r[8]=u*p+f*b+_*g,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],l=t[5],o=t[6],c=t[7],h=t[8];return e*a*h-e*l*c-n*r*h+n*l*o+s*r*c-s*a*o}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],l=t[5],o=t[6],c=t[7],h=t[8],d=h*a-l*c,u=l*o-h*r,f=c*r-a*o,_=e*d+n*u+s*f;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/_;return t[0]=d*x,t[1]=(s*c-h*n)*x,t[2]=(l*n-s*a)*x,t[3]=u*x,t[4]=(h*e-s*o)*x,t[5]=(s*r-l*e)*x,t[6]=f*x,t[7]=(n*o-c*e)*x,t[8]=(a*e-n*r)*x,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,l){const o=Math.cos(r),c=Math.sin(r);return this.set(n*o,n*c,-n*(o*a+c*l)+a+t,-s*c,s*o,-s*(-c*a+o*l)+l+e,0,0,1),this}scale(t,e){return ms("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Na.makeScale(t,e)),this}rotate(t){return ms("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Na.makeRotation(-t)),this}translate(t,e){return ms("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Na.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};kl.prototype.isMatrix3=!0;let Xt=kl;const Na=new Xt,tc=new Xt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ec=new Xt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function _d(){const i={enabled:!0,workingColorSpace:la,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Me&&(s.r=hi(s.r),s.g=hi(s.g),s.b=hi(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Me&&(s.r=gs(s.r),s.g=gs(s.g),s.b=gs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===vi?ca:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[a].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[la]:{primaries:t,whitePoint:n,transfer:ca,toXYZ:tc,fromXYZ:ec,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:tn},outputColorSpaceConfig:{drawingBufferColorSpace:tn}},[tn]:{primaries:t,whitePoint:n,transfer:Me,toXYZ:tc,fromXYZ:ec,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:tn}}}),i}const re=_d();function hi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function gs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Xi;class xd{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Xi===void 0&&(Xi=ha("canvas")),Xi.width=t.width,Xi.height=t.height;const s=Xi.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=Xi}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=ha("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=hi(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(hi(e[n]/255)*255):e[n]=hi(e[n]);return{data:e,width:t.width,height:t.height}}else return Gt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let vd=0;class El{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:vd++}),this.uuid=wi(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width||0,e.height||0,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,l=s.length;a<l;a++)s[a].isDataTexture?r.push(Ua(s[a].image)):r.push(Ua(s[a]))}else r=Ua(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function Ua(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?xd.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Gt("Texture: Unable to serialize Texture."),{})}let Md=0;const Fa=new C;class hn extends Hi{constructor(t=hn.DEFAULT_IMAGE,e=hn.DEFAULT_MAPPING,n=oi,s=oi,r=En,a=Mi,l=Jn,o=Dn,c=hn.DEFAULT_ANISOTROPY,h=vi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Md++}),this.uuid=wi(),this.name="",this.source=new El(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=l,this.internalFormat=null,this.type=o,this.offset=new Ct(0,0),this.repeat=new Ct(1,1),this.center=new Ct(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Xt,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(Fa).x}get height(){return this.source.getSize(Fa).y}get depth(){return this.source.getSize(Fa).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.mipmapsAutoUpdate=t.mipmapsAutoUpdate,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isPMREMTexture=t.isPMREMTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){Gt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Gt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==xh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ra:t.x=t.x-Math.floor(t.x);break;case oi:t.x=t.x<0?0:1;break;case xo:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ra:t.y=t.y-Math.floor(t.y);break;case oi:t.y=t.y<0?0:1;break;case xo:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}hn.DEFAULT_IMAGE=null;hn.DEFAULT_MAPPING=xh;hn.DEFAULT_ANISOTROPY=1;const Gl=class Gl{constructor(t=0,e=0,n=0,s=1){this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const o=t.elements,c=o[0],h=o[4],d=o[8],u=o[1],f=o[5],_=o[9],x=o[2],m=o[6],p=o[10];if(Math.abs(h-u)<.01&&Math.abs(d-x)<.01&&Math.abs(_-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+x)<.1&&Math.abs(_+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const E=(c+1)/2,b=(f+1)/2,A=(p+1)/2,w=(h+u)/4,g=(d+x)/4,y=(_+m)/4;return E>b&&E>A?E<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(E),s=w/n,r=g/n):b>A?b<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(b),n=w/s,r=y/s):A<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(A),n=g/r,s=y/r),this.set(n,s,r,e),this}let M=Math.sqrt((m-_)*(m-_)+(d-x)*(d-x)+(u-h)*(u-h));return Math.abs(M)<.001&&(M=1),this.x=(m-_)/M,this.y=(d-x)/M,this.z=(u-h)/M,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=ee(this.x,t.x,e.x),this.y=ee(this.y,t.y,e.y),this.z=ee(this.z,t.z,e.z),this.w=ee(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=ee(this.x,t,e),this.y=ee(this.y,t,e),this.z=ee(this.z,t,e),this.w=ee(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ee(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Gl.prototype.isVector4=!0;let De=Gl;class Sd extends Hi{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:En,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new De(0,0,t,e),this.scissorTest=!1,this.viewport=new De(0,0,t,e),this.textures=[];const s=n.count;for(let r=0;r<s;r++)this.textures[r]=new hn({width:t,height:e,depth:n.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){const e={minFilter:En,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.mipmapsAutoUpdate!==void 0&&(e.mipmapsAutoUpdate=t.mipmapsAutoUpdate),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new El(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){const e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;else this.depthTexture=null;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Rn extends Sd{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Dh extends hn{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=en,this.minFilter=en,this.wrapR=oi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class yd extends hn{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=en,this.minFilter=en,this.wrapR=oi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}}const Ma=class Ma{constructor(t,e,n,s,r,a,l,o,c,h,d,u,f,_,x,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,l,o,c,h,d,u,f,_,x,m)}set(t,e,n,s,r,a,l,o,c,h,d,u,f,_,x,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=l,p[13]=o,p[2]=c,p[6]=h,p[10]=d,p[14]=u,p[3]=f,p[7]=_,p[11]=x,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ma().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();const e=this.elements,n=t.elements,s=1/qi.setFromMatrixColumn(t,0).length(),r=1/qi.setFromMatrixColumn(t,1).length(),a=1/qi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),l=Math.sin(n),o=Math.cos(s),c=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){const u=a*h,f=a*d,_=l*h,x=l*d;e[0]=o*h,e[4]=-o*d,e[8]=c,e[1]=f+_*c,e[5]=u-x*c,e[9]=-l*o,e[2]=x-u*c,e[6]=_+f*c,e[10]=a*o}else if(t.order==="YXZ"){const u=o*h,f=o*d,_=c*h,x=c*d;e[0]=u+x*l,e[4]=_*l-f,e[8]=a*c,e[1]=a*d,e[5]=a*h,e[9]=-l,e[2]=f*l-_,e[6]=x+u*l,e[10]=a*o}else if(t.order==="ZXY"){const u=o*h,f=o*d,_=c*h,x=c*d;e[0]=u-x*l,e[4]=-a*d,e[8]=_+f*l,e[1]=f+_*l,e[5]=a*h,e[9]=x-u*l,e[2]=-a*c,e[6]=l,e[10]=a*o}else if(t.order==="ZYX"){const u=a*h,f=a*d,_=l*h,x=l*d;e[0]=o*h,e[4]=_*c-f,e[8]=u*c+x,e[1]=o*d,e[5]=x*c+u,e[9]=f*c-_,e[2]=-c,e[6]=l*o,e[10]=a*o}else if(t.order==="YZX"){const u=a*o,f=a*c,_=l*o,x=l*c;e[0]=o*h,e[4]=x-u*d,e[8]=_*d+f,e[1]=d,e[5]=a*h,e[9]=-l*h,e[2]=-c*h,e[6]=f*d+_,e[10]=u-x*d}else if(t.order==="XZY"){const u=a*o,f=a*c,_=l*o,x=l*c;e[0]=o*h,e[4]=-d,e[8]=c*h,e[1]=u*d+x,e[5]=a*h,e[9]=f*d-_,e[2]=_*d-f,e[6]=l*h,e[10]=x*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(bd,t,wd)}lookAt(t,e,n){const s=this.elements;return Cn.subVectors(t,e),Cn.lengthSq()===0&&(Cn.z=1),Cn.normalize(),fi.crossVectors(n,Cn),fi.lengthSq()===0&&(Math.abs(n.z)===1?Cn.x+=1e-4:Cn.z+=1e-4,Cn.normalize(),fi.crossVectors(n,Cn)),fi.normalize(),gr.crossVectors(Cn,fi),s[0]=fi.x,s[4]=gr.x,s[8]=Cn.x,s[1]=fi.y,s[5]=gr.y,s[9]=Cn.y,s[2]=fi.z,s[6]=gr.z,s[10]=Cn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],l=n[4],o=n[8],c=n[12],h=n[1],d=n[5],u=n[9],f=n[13],_=n[2],x=n[6],m=n[10],p=n[14],M=n[3],E=n[7],b=n[11],A=n[15],w=s[0],g=s[4],y=s[8],L=s[12],P=s[1],N=s[5],F=s[9],W=s[13],I=s[2],G=s[6],K=s[10],k=s[14],nt=s[3],V=s[7],Q=s[11],j=s[15];return r[0]=a*w+l*P+o*I+c*nt,r[4]=a*g+l*N+o*G+c*V,r[8]=a*y+l*F+o*K+c*Q,r[12]=a*L+l*W+o*k+c*j,r[1]=h*w+d*P+u*I+f*nt,r[5]=h*g+d*N+u*G+f*V,r[9]=h*y+d*F+u*K+f*Q,r[13]=h*L+d*W+u*k+f*j,r[2]=_*w+x*P+m*I+p*nt,r[6]=_*g+x*N+m*G+p*V,r[10]=_*y+x*F+m*K+p*Q,r[14]=_*L+x*W+m*k+p*j,r[3]=M*w+E*P+b*I+A*nt,r[7]=M*g+E*N+b*G+A*V,r[11]=M*y+E*F+b*K+A*Q,r[15]=M*L+E*W+b*k+A*j,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],l=t[5],o=t[9],c=t[13],h=t[2],d=t[6],u=t[10],f=t[14],_=t[3],x=t[7],m=t[11],p=t[15],M=o*f-c*u,E=l*f-c*d,b=l*u-o*d,A=a*f-c*h,w=a*u-o*h,g=a*d-l*h;return e*(x*M-m*E+p*b)-n*(_*M-m*A+p*w)+s*(_*E-x*A+p*g)-r*(_*b-x*w+m*g)}determinantAffine(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[1],a=t[5],l=t[9],o=t[2],c=t[6],h=t[10];return e*(a*h-l*c)-n*(r*h-l*o)+s*(r*c-a*o)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],l=t[5],o=t[6],c=t[7],h=t[8],d=t[9],u=t[10],f=t[11],_=t[12],x=t[13],m=t[14],p=t[15],M=e*l-n*a,E=e*o-s*a,b=e*c-r*a,A=n*o-s*l,w=n*c-r*l,g=s*c-r*o,y=h*x-d*_,L=h*m-u*_,P=h*p-f*_,N=d*m-u*x,F=d*p-f*x,W=u*p-f*m,I=M*W-E*F+b*N+A*P-w*L+g*y;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const G=1/I;return t[0]=(l*W-o*F+c*N)*G,t[1]=(s*F-n*W-r*N)*G,t[2]=(x*g-m*w+p*A)*G,t[3]=(u*w-d*g-f*A)*G,t[4]=(o*P-a*W-c*L)*G,t[5]=(e*W-s*P+r*L)*G,t[6]=(m*b-_*g-p*E)*G,t[7]=(h*g-u*b+f*E)*G,t[8]=(a*F-l*P+c*y)*G,t[9]=(n*P-e*F-r*y)*G,t[10]=(_*w-x*b+p*M)*G,t[11]=(d*b-h*w-f*M)*G,t[12]=(l*L-a*N-o*y)*G,t[13]=(e*N-n*L+s*y)*G,t[14]=(x*E-_*A-m*M)*G,t[15]=(h*A-d*E+u*M)*G,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,l=t.y,o=t.z,c=r*a,h=r*l;return this.set(c*a+n,c*l-s*o,c*o+s*l,0,c*l+s*o,h*l+n,h*o-s*a,0,c*o-s*l,h*o+s*a,r*o*o+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,a=e._y,l=e._z,o=e._w,c=r+r,h=a+a,d=l+l,u=r*c,f=r*h,_=r*d,x=a*h,m=a*d,p=l*d,M=o*c,E=o*h,b=o*d,A=n.x,w=n.y,g=n.z;return s[0]=(1-(x+p))*A,s[1]=(f+b)*A,s[2]=(_-E)*A,s[3]=0,s[4]=(f-b)*w,s[5]=(1-(u+p))*w,s[6]=(m+M)*w,s[7]=0,s[8]=(_+E)*g,s[9]=(m-M)*g,s[10]=(1-(u+x))*g,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];const r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let a=qi.set(s[0],s[1],s[2]).length();const l=qi.set(s[4],s[5],s[6]).length(),o=qi.set(s[8],s[9],s[10]).length();r<0&&(a=-a),Bn.copy(this);const c=1/a,h=1/l,d=1/o;return Bn.elements[0]*=c,Bn.elements[1]*=c,Bn.elements[2]*=c,Bn.elements[4]*=h,Bn.elements[5]*=h,Bn.elements[6]*=h,Bn.elements[8]*=d,Bn.elements[9]*=d,Bn.elements[10]*=d,e.setFromRotationMatrix(Bn),n.x=a,n.y=l,n.z=o,this}makePerspective(t,e,n,s,r,a,l=Wn,o=!1){const c=this.elements,h=2*r/(e-t),d=2*r/(n-s),u=(e+t)/(e-t),f=(n+s)/(n-s);let _,x;if(o)_=r/(a-r),x=a*r/(a-r);else if(l===Wn)_=-(a+r)/(a-r),x=-2*a*r/(a-r);else if(l===nr)_=-a/(a-r),x=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+l);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=_,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,a,l=Wn,o=!1){const c=this.elements,h=2/(e-t),d=2/(n-s),u=-(e+t)/(e-t),f=-(n+s)/(n-s);let _,x;if(o)_=1/(a-r),x=a/(a-r);else if(l===Wn)_=-2/(a-r),x=-(a+r)/(a-r);else if(l===nr)_=-1/(a-r),x=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+l);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=_,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}};Ma.prototype.isMatrix4=!0;let le=Ma;const qi=new C,Bn=new le,bd=new C(0,0,0),wd=new C(1,1,1),fi=new C,gr=new C,Cn=new C,nc=new le,ic=new Xn;class Fn{constructor(t=0,e=0,n=0,s=Fn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],a=s[4],l=s[8],o=s[1],c=s[5],h=s[9],d=s[2],u=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(ee(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ee(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(l,f),this._z=Math.atan2(o,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(ee(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(o,r));break;case"ZYX":this._y=Math.asin(-ee(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(o,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(ee(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(l,f));break;case"XZY":this._z=Math.asin(-ee(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(l,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Gt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return nc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(nc,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return ic.setFromEuler(this),this.setFromQuaternion(ic,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Fn.DEFAULT_ORDER="XYZ";class Tl{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Ed=0;const sc=new C,Yi=new Xn,ei=new le,_r=new C,Ds=new C,Td=new C,Ad=new Xn,rc=new C(1,0,0),ac=new C(0,1,0),oc=new C(0,0,1),lc={type:"added"},Rd={type:"removed"},Ki={type:"childadded",child:null},Oa={type:"childremoved",child:null};class ke extends Hi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ed++}),this.uuid=wi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ke.DEFAULT_UP.clone();const t=new C,e=new Fn,n=new Xn,s=new C(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new le},normalMatrix:{value:new Xt}}),this.matrix=new le,this.matrixWorld=new le,this.matrixAutoUpdate=ke.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ke.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Tl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Yi.setFromAxisAngle(t,e),this.quaternion.multiply(Yi),this}rotateOnWorldAxis(t,e){return Yi.setFromAxisAngle(t,e),this.quaternion.premultiply(Yi),this}rotateX(t){return this.rotateOnAxis(rc,t)}rotateY(t){return this.rotateOnAxis(ac,t)}rotateZ(t){return this.rotateOnAxis(oc,t)}translateOnAxis(t,e){return sc.copy(t).applyQuaternion(this.quaternion),this.position.add(sc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(rc,t)}translateY(t){return this.translateOnAxis(ac,t)}translateZ(t){return this.translateOnAxis(oc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(ei.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?_r.copy(t):_r.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Ds.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ei.lookAt(Ds,_r,this.up):ei.lookAt(_r,Ds,this.up),this.quaternion.setFromRotationMatrix(ei),s&&(ei.extractRotation(s.matrixWorld),Yi.setFromRotationMatrix(ei),this.quaternion.premultiply(Yi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(de("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(lc),Ki.child=t,this.dispatchEvent(Ki),Ki.child=null):de("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Rd),Oa.child=t,this.dispatchEvent(Oa),Oa.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),ei.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),ei.multiply(t.parent.matrixWorld)),t.applyMatrix4(ei),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(lc),Ki.child=t,this.dispatchEvent(Ki),Ki.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ds,t,Td),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ds,Ad,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){const s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){const r=this.children;for(let a=0,l=r.length;a<l;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(l=>({...l,boundingBox:l.boundingBox?l.boundingBox.toJSON():void 0,boundingSphere:l.boundingSphere?l.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(l=>({...l})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(l,o){return l[o.uuid]===void 0&&(l[o.uuid]=o.toJSON(t)),o.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const l=this.geometry.parameters;if(l!==void 0&&l.shapes!==void 0){const o=l.shapes;if(Array.isArray(o))for(let c=0,h=o.length;c<h;c++){const d=o[c];r(t.shapes,d)}else r(t.shapes,o)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const l=[];for(let o=0,c=this.material.length;o<c;o++)l.push(r(t.materials,this.material[o]));s.material=l}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let l=0;l<this.children.length;l++)s.children.push(this.children[l].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let l=0;l<this.animations.length;l++){const o=this.animations[l];s.animations.push(r(t.animations,o))}}if(e){const l=a(t.geometries),o=a(t.materials),c=a(t.textures),h=a(t.images),d=a(t.shapes),u=a(t.skeletons),f=a(t.animations),_=a(t.nodes);l.length>0&&(n.geometries=l),o.length>0&&(n.materials=o),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),_.length>0&&(n.nodes=_)}return n.object=s,n;function a(l){const o=[];for(const c in l){const h=l[c];delete h.metadata,o.push(h)}return o}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}ke.DEFAULT_UP=new C(0,1,0);ke.DEFAULT_MATRIX_AUTO_UPDATE=!0;ke.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Se extends ke{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Cd={type:"move"};class Ba{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Se,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Se,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new C,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new C),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Se,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new C,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new C,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null;const l=this._targetRay,o=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const x of t.hand.values()){const m=e.getJointPose(x,n),p=this._getHandJoint(c,x);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.quaternion,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,_=.005;c.inputState.pinching&&u>f+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=f-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else o!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,o.eventsEnabled&&o.dispatchEvent({type:"gripUpdated",data:t,target:this})));l!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.quaternion,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,this.dispatchEvent(Cd)))}return l!==null&&(l.visible=s!==null),o!==null&&(o.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Se;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const Ih={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},pi={h:0,s:0,l:0},xr={h:0,s:0,l:0};function za(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Dt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=tn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,re.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=re.workingColorSpace){return this.r=t,this.g=e,this.b=n,re.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=re.workingColorSpace){if(t=yl(t,1),e=ee(e,0,1),n=ee(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=za(a,r,t+1/3),this.g=za(a,r,t),this.b=za(a,r,t-1/3)}return re.colorSpaceToWorking(this,s),this}setStyle(t,e=tn){function n(r){r!==void 0&&parseFloat(r)<1&&Gt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],l=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(l))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(l))return n(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,e);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(l))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Gt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);Gt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=tn){const n=Ih[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Gt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=hi(t.r),this.g=hi(t.g),this.b=hi(t.b),this}copyLinearToSRGB(t){return this.r=gs(t.r),this.g=gs(t.g),this.b=gs(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=tn){return re.workingToColorSpace(on.copy(this),t),Math.round(ee(on.r*255,0,255))*65536+Math.round(ee(on.g*255,0,255))*256+Math.round(ee(on.b*255,0,255))}getHexString(t=tn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=re.workingColorSpace){re.workingToColorSpace(on.copy(this),e);const n=on.r,s=on.g,r=on.b,a=Math.max(n,s,r),l=Math.min(n,s,r);let o,c;const h=(l+a)/2;if(l===a)o=0,c=0;else{const d=a-l;switch(c=h<=.5?d/(a+l):d/(2-a-l),a){case n:o=(s-r)/d+(s<r?6:0);break;case s:o=(r-n)/d+2;break;case r:o=(n-s)/d+4;break}o/=6}return t.h=o,t.s=c,t.l=h,t}getRGB(t,e=re.workingColorSpace){return re.workingToColorSpace(on.copy(this),e),t.r=on.r,t.g=on.g,t.b=on.b,t}getStyle(t=tn){re.workingToColorSpace(on.copy(this),t);const e=on.r,n=on.g,s=on.b;return t!==tn?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(pi),this.setHSL(pi.h+t,pi.s+e,pi.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(pi),t.getHSL(xr);const n=$s(pi.h,xr.h,e),s=$s(pi.s,xr.s,e),r=$s(pi.l,xr.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const on=new Dt;Dt.NAMES=Ih;class Al{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new Dt(t),this.density=e}clone(){return new Al(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Pd extends ke{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Fn,this.environmentIntensity=1,this.environmentRotation=new Fn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),this.background=t.background!==null?t.background.clone():null,this.environment=t.environment!==null?t.environment.clone():null,this.fog=t.fog!==null?t.fog.clone():null,this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),this.overrideMaterial=t.overrideMaterial!==null?t.overrideMaterial.clone():null,this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}}const zn=new C,ni=new C,ka=new C,ii=new C,$i=new C,Zi=new C,cc=new C,Ga=new C,Ha=new C,Va=new C,Wa=new De,Xa=new De,qa=new De;class Un{constructor(t=new C,e=new C,n=new C){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),zn.subVectors(t,e),s.cross(zn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){zn.subVectors(s,e),ni.subVectors(n,e),ka.subVectors(t,e);const a=zn.dot(zn),l=zn.dot(ni),o=zn.dot(ka),c=ni.dot(ni),h=ni.dot(ka),d=a*c-l*l;if(d===0)return r.set(0,0,0),null;const u=1/d,f=(c*o-l*h)*u,_=(a*h-l*o)*u;return r.set(1-f-_,_,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,ii)===null?!1:ii.x>=0&&ii.y>=0&&ii.x+ii.y<=1}static getInterpolation(t,e,n,s,r,a,l,o){return this.getBarycoord(t,e,n,s,ii)===null?(o.x=0,o.y=0,"z"in o&&(o.z=0),"w"in o&&(o.w=0),null):(o.setScalar(0),o.addScaledVector(r,ii.x),o.addScaledVector(a,ii.y),o.addScaledVector(l,ii.z),o)}static getInterpolatedAttribute(t,e,n,s,r,a){return Wa.setScalar(0),Xa.setScalar(0),qa.setScalar(0),Wa.fromBufferAttribute(t,e),Xa.fromBufferAttribute(t,n),qa.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(Wa,r.x),a.addScaledVector(Xa,r.y),a.addScaledVector(qa,r.z),a}static isFrontFacing(t,e,n,s){return zn.subVectors(n,e),ni.subVectors(t,e),zn.cross(ni).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return zn.subVectors(this.c,this.b),ni.subVectors(this.a,this.b),zn.cross(ni).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Un.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Un.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return Un.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return Un.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Un.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let a,l;$i.subVectors(s,n),Zi.subVectors(r,n),Ga.subVectors(t,n);const o=$i.dot(Ga),c=Zi.dot(Ga);if(o<=0&&c<=0)return e.copy(n);Ha.subVectors(t,s);const h=$i.dot(Ha),d=Zi.dot(Ha);if(h>=0&&d<=h)return e.copy(s);const u=o*d-h*c;if(u<=0&&o>=0&&h<=0&&o-h>0)return a=o/(o-h),e.copy(n).addScaledVector($i,a);Va.subVectors(t,r);const f=$i.dot(Va),_=Zi.dot(Va);if(_>=0&&f<=_)return e.copy(r);const x=f*c-o*_;if(x<=0&&c>=0&&_<=0)return l=c/(c-_),e.copy(n).addScaledVector(Zi,l);const m=h*_-f*d;if(m<=0&&d-h>=0&&f-_>=0)return cc.subVectors(r,s),l=(d-h)/(d-h+(f-_)),e.copy(s).addScaledVector(cc,l);const p=1/(m+x+u);return a=x*p,l=u*p,e.copy(n).addScaledVector($i,a).addScaledVector(Zi,l)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class Vi{constructor(t=new C(1/0,1/0,1/0),e=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(kn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(kn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=kn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0&&t.isBatchedMesh!==!0)for(let a=0,l=r.count;a<l;a++)t.isMesh===!0?t.getVertexPosition(a,kn):kn.fromBufferAttribute(r,a),kn.applyMatrix4(t.matrixWorld),this.expandByPoint(kn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),vr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),vr.copy(n.boundingBox)),vr.applyMatrix4(t.matrixWorld),this.union(vr)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,kn),kn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Is),Mr.subVectors(this.max,Is),Ji.subVectors(t.a,Is),Qi.subVectors(t.b,Is),ji.subVectors(t.c,Is),mi.subVectors(Qi,Ji),gi.subVectors(ji,Qi),Li.subVectors(Ji,ji);let e=[0,-mi.z,mi.y,0,-gi.z,gi.y,0,-Li.z,Li.y,mi.z,0,-mi.x,gi.z,0,-gi.x,Li.z,0,-Li.x,-mi.y,mi.x,0,-gi.y,gi.x,0,-Li.y,Li.x,0];return!Ya(e,Ji,Qi,ji,Mr)||(e=[1,0,0,0,1,0,0,0,1],!Ya(e,Ji,Qi,ji,Mr))?!1:(Sr.crossVectors(mi,gi),e=[Sr.x,Sr.y,Sr.z],Ya(e,Ji,Qi,ji,Mr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,kn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(kn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(si[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),si[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),si[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),si[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),si[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),si[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),si[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),si[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(si),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const si=[new C,new C,new C,new C,new C,new C,new C,new C],kn=new C,vr=new Vi,Ji=new C,Qi=new C,ji=new C,mi=new C,gi=new C,Li=new C,Is=new C,Mr=new C,Sr=new C,Di=new C;function Ya(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Di.fromArray(i,r);const l=s.x*Math.abs(Di.x)+s.y*Math.abs(Di.y)+s.z*Math.abs(Di.z),o=t.dot(Di),c=e.dot(Di),h=n.dot(Di);if(Math.max(-Math.max(o,c,h),Math.min(o,c,h))>l)return!1}return!0}const Be=new C,yr=new Ct;let Ld=0;class un extends Hi{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Ld++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Rh,this.updateRanges=[],this.gpuType=Vn,this.version=0,this._normalizationScale=t!==void 0?ya(t):void 0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this._normalizationScale=t._normalizationScale,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)yr.fromBufferAttribute(this,e),yr.applyMatrix3(t),this.setXY(e,yr.x,yr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Be.fromBufferAttribute(this,e),Be.applyMatrix3(t),this.setXYZ(e,Be.x,Be.y,Be.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Be.fromBufferAttribute(this,e),Be.applyMatrix4(t),this.setXYZ(e,Be.x,Be.y,Be.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Be.fromBufferAttribute(this,e),Be.applyNormalMatrix(t),this.setXYZ(e,Be.x,Be.y,Be.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Be.fromBufferAttribute(this,e),Be.transformDirection(t),this.setXYZ(e,Be.x,Be.y,Be.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=this._denormalize(n)),n}setComponent(t,e,n){return this.normalized&&(n=this._normalize(n)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=this._denormalize(e)),e}setX(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=this._denormalize(e)),e}setY(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=this._denormalize(e)),e}setZ(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=this._denormalize(e)),e}setW(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n),s=this._normalize(s)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n),s=this._normalize(s),r=this._normalize(r)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(t){const e=this._normalizationScale;return e!==void 0?Math.max(t/e,-1):bl(t,this.array)}_normalize(t){const e=this._normalizationScale;return e!==void 0?Math.round(t*e):wl(t,this.array)}}class Nh extends un{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Uh extends un{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class ce extends un{constructor(t,e,n){super(new Float32Array(t),e,n)}}const Dd=new Vi,Ns=new C,Ka=new C;class Ei{constructor(t=new C,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Dd.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ns.subVectors(t,this.center);const e=Ns.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Ns,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Ka.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ns.copy(t.center).add(Ka)),this.expandByPoint(Ns.copy(t.center).sub(Ka))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let Id=0;const In=new le,$a=new ke,ts=new C,Pn=new Vi,Us=new Vi,Ke=new C;class Ae extends Hi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Id++}),this.uuid=wi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Qu(t)?Uh:Nh)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Xt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return In.makeRotationFromQuaternion(t),this.applyMatrix4(In),this}rotateX(t){return In.makeRotationX(t),this.applyMatrix4(In),this}rotateY(t){return In.makeRotationY(t),this.applyMatrix4(In),this}rotateZ(t){return In.makeRotationZ(t),this.applyMatrix4(In),this}translate(t,e,n){return In.makeTranslation(t,e,n),this.applyMatrix4(In),this}scale(t,e,n){return In.makeScale(t,e,n),this.applyMatrix4(In),this}lookAt(t){return $a.lookAt(t),$a.updateMatrix(),this.applyMatrix4($a.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ts).negate(),this.translate(ts.x,ts.y,ts.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new ce(n,3))}else{const n=Math.min(t.length,e.count);for(let s=0;s<n;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Gt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Vi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){de("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];Pn.setFromBufferAttribute(r),this.morphTargetsRelative?(Ke.addVectors(this.boundingBox.min,Pn.min),this.boundingBox.expandByPoint(Ke),Ke.addVectors(this.boundingBox.max,Pn.max),this.boundingBox.expandByPoint(Ke)):(this.boundingBox.expandByPoint(Pn.min),this.boundingBox.expandByPoint(Pn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&de('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ei);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){de("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new C,1/0);return}if(t){const n=this.boundingSphere.center;if(Pn.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const l=e[r];Us.setFromBufferAttribute(l),this.morphTargetsRelative?(Ke.addVectors(Pn.min,Us.min),Pn.expandByPoint(Ke),Ke.addVectors(Pn.max,Us.max),Pn.expandByPoint(Ke)):(Pn.expandByPoint(Us.min),Pn.expandByPoint(Us.max))}Pn.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)Ke.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Ke));if(e)for(let r=0,a=e.length;r<a;r++){const l=e[r],o=this.morphTargetsRelative;for(let c=0,h=l.count;c<h;c++)Ke.fromBufferAttribute(l,c),o&&(ts.fromBufferAttribute(t,c),Ke.add(ts)),s=Math.max(s,n.distanceToSquared(Ke))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&de('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){de("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new un(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const l=[],o=[],c=new Uint8Array(n.count);for(let L=0;L<n.count;L++)l[L]=new C,o[L]=new C;const h=new C,d=new C,u=new C,f=new Ct,_=new Ct,x=new Ct,m=new C,p=new C;function M(L,P,N){c[L]=c[P]=c[N]=1,h.fromBufferAttribute(n,L),d.fromBufferAttribute(n,P),u.fromBufferAttribute(n,N),f.fromBufferAttribute(r,L),_.fromBufferAttribute(r,P),x.fromBufferAttribute(r,N),d.sub(h),u.sub(h),_.sub(f),x.sub(f);const F=1/(_.x*x.y-x.x*_.y);isFinite(F)&&(m.copy(d).multiplyScalar(x.y).addScaledVector(u,-_.y).multiplyScalar(F),p.copy(u).multiplyScalar(_.x).addScaledVector(d,-x.x).multiplyScalar(F),l[L].add(m),l[P].add(m),l[N].add(m),o[L].add(p),o[P].add(p),o[N].add(p))}let E=this.groups;E.length===0&&(E=[{start:0,count:t.count}]);for(let L=0,P=E.length;L<P;++L){const N=E[L],F=N.start,W=N.count;for(let I=F,G=F+W;I<G;I+=3)M(t.getX(I+0),t.getX(I+1),t.getX(I+2))}const b=new C,A=new C,w=new C,g=new C;function y(L){w.fromBufferAttribute(s,L),g.copy(w);const P=l[L];b.copy(P),b.sub(w.multiplyScalar(w.dot(P))).normalize(),A.crossVectors(g,P);const F=A.dot(o[L])<0?-1:1;a.setXYZW(L,b.x,b.y,b.z,F)}for(let L=0,P=n.count;L<P;++L)c[L]&&y(L);this._transformed=!0}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new un(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);const s=new C,r=new C,a=new C,l=new C,o=new C,c=new C,h=new C,d=new C;if(t)for(let u=0,f=t.count;u<f;u+=3){const _=t.getX(u+0),x=t.getX(u+1),m=t.getX(u+2);s.fromBufferAttribute(e,_),r.fromBufferAttribute(e,x),a.fromBufferAttribute(e,m),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),l.fromBufferAttribute(n,_),o.fromBufferAttribute(n,x),c.fromBufferAttribute(n,m),l.add(h),o.add(h),c.add(h),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(x,o.x,o.y,o.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,f=e.count;u<f;u+=3)s.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),a.fromBufferAttribute(e,u+2),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ke.fromBufferAttribute(t,e),Ke.normalize(),t.setXYZ(e,Ke.x,Ke.y,Ke.z)}toNonIndexed(){function t(l,o){const c=l.array,h=l.itemSize,d=l.normalized,u=new c.constructor(o.length*h);let f=0,_=0;for(let x=0,m=o.length;x<m;x++){l.isInterleavedBufferAttribute?f=o[x]*l.data.stride+l.offset:f=o[x]*h;for(let p=0;p<h;p++)u[_++]=c[f++]}return new un(u,h,d)}if(this.index===null)return Gt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Ae,n=this.index.array,s=this.attributes;for(const l in s){const o=s[l],c=t(o,n);e.setAttribute(l,c)}const r=this.morphAttributes;for(const l in r){const o=[],c=r[l];for(let h=0,d=c.length;h<d;h++){const u=c[h],f=t(u,n);o.push(f)}e.morphAttributes[l]=o}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let l=0,o=a.length;l<o;l++){const c=a[l];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const o=this.parameters;for(const c in o)o[c]!==void 0&&(t[c]=o[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const o in n){const c=n[o];t.data.attributes[o]=c.toJSON(t.data)}const s={};let r=!1;for(const o in this.morphAttributes){const c=this.morphAttributes[o],h=[];for(let d=0,u=c.length;d<u;d++){const f=c[d];h.push(f.toJSON(t.data))}h.length>0&&(s[o]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const l=this.boundingSphere;return l!==null&&(t.data.boundingSphere=l.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const s=t.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],d=r[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,h=a.length;c<h;c++){const d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}const l=t.boundingBox;l!==null&&(this.boundingBox=l.clone());const o=t.boundingSphere;return o!==null&&(this.boundingSphere=o.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Nd{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Rh,this.updateRanges=[],this.version=0,this.uuid=wi()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={});const e=hc(this.array);t.arrayBuffers[e]===void 0&&(t.arrayBuffers[e]=this.array.slice(0).buffer);const n=new this.array.constructor(t.arrayBuffers[e]),s=new this.constructor(n,this.stride);return s.setUsage(this.usage),s}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){t.arrayBuffers===void 0&&(t.arrayBuffers={});const e=hc(this.array);t.arrayBuffers[e]===void 0&&(t.arrayBuffers[e]=Array.from(new Uint32Array(this.array.slice(0).buffer)));const n={uuid:this.uuid,buffer:e,type:this.array.constructor.name,stride:this.stride};return n.usage=this.usage,n}}function hc(i){return i.buffer._uuid===void 0&&(i.buffer._uuid=wi()),i.byteOffset===0&&i.byteLength===i.buffer.byteLength?i.buffer._uuid:i.buffer._uuid+":"+i.byteOffset+":"+i.byteLength}const _n=new C;class da{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s,this._normalizationScale=t!==void 0?ya(t.array):void 0}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)_n.fromBufferAttribute(this,e),_n.applyMatrix4(t),this.setXYZ(e,_n.x,_n.y,_n.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)_n.fromBufferAttribute(this,e),_n.applyNormalMatrix(t),this.setXYZ(e,_n.x,_n.y,_n.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)_n.fromBufferAttribute(this,e),_n.transformDirection(t),this.setXYZ(e,_n.x,_n.y,_n.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=this._denormalize(n)),n}setComponent(t,e,n){return this.normalized&&(n=this._normalize(n)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=this._normalize(e)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=this._normalize(e)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=this._normalize(e)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=this._normalize(e)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=this._denormalize(e)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=this._denormalize(e)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=this._denormalize(e)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=this._denormalize(e)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=this._normalize(e),n=this._normalize(n)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=this._normalize(e),n=this._normalize(n),s=this._normalize(s)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=this._normalize(e),n=this._normalize(n),s=this._normalize(s),r=this._normalize(r)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){ua("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new un(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new da(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){ua("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}_denormalize(t){const e=this._normalizationScale;return e!==void 0?Math.max(t/e,-1):bl(t,this.data.array)}_normalize(t){const e=this._normalizationScale;return e!==void 0?Math.round(t*e):wl(t,this.data.array)}}const Za=new C,Ud=new C,Fd=new Xt;class xi{constructor(t=new C(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=Za.subVectors(n,e).cross(Ud.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){const s=t.delta(Za),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const a=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(s,a)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Fd.getNormalMatrix(t),s=this.coplanarPoint(Za).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}}let Od=0;class Ti extends Hi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Od++}),this.uuid=wi(),this.name="",this.type="Material",this.blending=Ys,this.side=zi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=mh,this.blendDst=gh,this.blendEquation=hs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Dt(0,0,0),this.blendAlpha=0,this.depthFunc=js,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=qu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=La,this.stencilZFail=La,this.stencilZPass=La,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){Gt(`Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Gt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(t).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const l in r){const o=r[l];delete o.metadata,a.push(o)}return a}if(e){const r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Dt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.diffuseRoughness!==void 0&&(this.diffuseRoughness=t.diffuseRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessMinimum),t.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=t.iridescenceThicknessMaximum),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=t.iridescenceThicknessRange[1]),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new xi().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Ct().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ct().fromArray(t.clearcoatNormalScale)),t.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=e[t.diffuseRoughnessMap]||null),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class Gi extends Ti{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Dt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let es;const Fs=new C,ns=new C,is=new C,ss=new Ct,Os=new Ct,Fh=new le,br=new C,Bs=new C,wr=new C,uc=new Ct,Ja=new Ct,dc=new Ct;class ys extends ke{constructor(t=new Gi){if(super(),this.isSprite=!0,this.type="Sprite",es===void 0){es=new Ae;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Nd(e,5);es.setIndex([0,1,2,0,2,3]),es.setAttribute("position",new da(n,3,0,!1)),es.setAttribute("uv",new da(n,2,3,!1))}this.geometry=es,this.material=t,this.center=new Ct(.5,.5),this.count=1}intersectsFrustum(t){return t.intersectsSprite(this)}raycast(t,e){t.camera===null&&de('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),ns.setFromMatrixScale(this.matrixWorld),Fh.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),is.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ns.multiplyScalar(-is.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const a=this.center;Er(br.set(-.5,-.5,0),is,a,ns,s,r),Er(Bs.set(.5,-.5,0),is,a,ns,s,r),Er(wr.set(.5,.5,0),is,a,ns,s,r),uc.set(0,0),Ja.set(1,0),dc.set(1,1);let l=t.ray.intersectTriangle(br,Bs,wr,!1,Fs);if(l===null&&(Er(Bs.set(-.5,.5,0),is,a,ns,s,r),Ja.set(0,1),l=t.ray.intersectTriangle(br,wr,Bs,!1,Fs),l===null))return;const o=t.ray.origin.distanceTo(Fs);o<t.near||o>t.far||e.push({distance:o,point:Fs.clone(),uv:Un.getInterpolation(Fs,br,Bs,wr,uc,Ja,dc,new Ct),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}toJSON(t){const e=super.toJSON(t);return e.object.center=this.center.toArray(),e}}function Er(i,t,e,n,s,r){ss.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(Os.x=r*ss.x-s*ss.y,Os.y=s*ss.x+r*ss.y):Os.copy(ss),i.copy(t),i.x+=Os.x,i.y+=Os.y,i.applyMatrix4(Fh)}const ri=new C,Qa=new C,Tr=new C,Ar=new C;class ba{constructor(t=new C,e=new C(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,ri)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=ri.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(ri.copy(this.origin).addScaledVector(this.direction,e),ri.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Qa.copy(t).add(e).multiplyScalar(.5),Tr.copy(e).sub(t).normalize(),Ar.copy(this.origin).sub(Qa);const r=t.distanceTo(e)*.5,a=-this.direction.dot(Tr),l=Ar.dot(this.direction),o=-Ar.dot(Tr),c=Ar.lengthSq(),h=Math.abs(1-a*a);let d,u,f,_;if(h>0)if(d=a*o-l,u=a*l-o,_=r*h,d>=0)if(u>=-_)if(u<=_){const x=1/h;d*=x,u*=x,f=d*(d+a*u+2*l)+u*(a*d+u+2*o)+c}else u=r,d=Math.max(0,-(a*u+l)),f=-d*d+u*(u+2*o)+c;else u=-r,d=Math.max(0,-(a*u+l)),f=-d*d+u*(u+2*o)+c;else u<=-_?(d=Math.max(0,-(-a*r+l)),u=d>0?-r:Math.min(Math.max(-r,-o),r),f=-d*d+u*(u+2*o)+c):u<=_?(d=0,u=Math.min(Math.max(-r,-o),r),f=u*(u+2*o)+c):(d=Math.max(0,-(a*r+l)),u=d>0?r:Math.min(Math.max(-r,-o),r),f=-d*d+u*(u+2*o)+c);else u=a>0?-r:r,d=Math.max(0,-(a*u+l)),f=-d*d+u*(u+2*o)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(Qa).addScaledVector(Tr,u),f}intersectSphere(t,e){if(t.radius<0)return null;ri.subVectors(t.center,this.origin);const n=ri.dot(this.direction),s=ri.dot(ri)-n*n,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),l=n-a,o=n+a;return o<0?null:l<0?this.at(o,e):this.at(l,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,l,o;const c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(t.min.x-u.x)*c,s=(t.max.x-u.x)*c):(n=(t.max.x-u.x)*c,s=(t.min.x-u.x)*c),h>=0?(r=(t.min.y-u.y)*h,a=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,a=(t.min.y-u.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),d>=0?(l=(t.min.z-u.z)*d,o=(t.max.z-u.z)*d):(l=(t.max.z-u.z)*d,o=(t.min.z-u.z)*d),n>o||l>s)||((l>n||n!==n)&&(n=l),(o<s||s!==s)&&(s=o),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,ri)!==null}intersectTriangle(t,e,n,s,r){const a=this.origin,l=this.direction,o=l.x,c=l.y,h=l.z,d=t.x-a.x,u=t.y-a.y,f=t.z-a.z,_=e.x-a.x,x=e.y-a.y,m=e.z-a.z,p=n.x-a.x,M=n.y-a.y,E=n.z-a.z,b=Math.abs(o),A=Math.abs(c),w=Math.abs(h);let g,y,L,P,N,F,W,I,G,K,k,nt;if(b>=A&&b>=w?(L=o,F=d,G=_,nt=p,o>=0?(g=c,y=h,P=u,N=f,W=x,I=m,K=M,k=E):(g=h,y=c,P=f,N=u,W=m,I=x,K=E,k=M)):A>=w?(L=c,F=u,G=x,nt=M,c>=0?(g=h,y=o,P=f,N=d,W=m,I=_,K=E,k=p):(g=o,y=h,P=d,N=f,W=_,I=m,K=p,k=E)):(L=h,F=f,G=m,nt=E,h>=0?(g=o,y=c,P=d,N=u,W=_,I=x,K=p,k=M):(g=c,y=o,P=u,N=d,W=x,I=_,K=M,k=p)),L===0)return null;const V=g/L,Q=y/L,j=1/L,bt=P-V*F,zt=N-Q*F,Z=W-V*G,_t=I-Q*G,St=K-V*nt,It=k-Q*nt,dt=St*_t-It*Z,Vt=bt*It-zt*St,Ie=Z*zt-_t*bt;if(s){if(dt<0||Vt<0||Ie<0)return null}else if((dt<0||Vt<0||Ie<0)&&(dt>0||Vt>0||Ie>0))return null;const Nt=dt+Vt+Ie;if(Nt===0)return null;const he=j*(dt*F+Vt*G+Ie*nt);return(Nt>0?he<0:he>0)?null:this.at(he/Nt,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ye extends Ti{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Dt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Fn,this.combine=_h,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const fc=new le,Ii=new ba,Rr=new Ei,pc=new C,Cr=new C,Pr=new C,Lr=new C,ja=new C,Dr=new C,mc=new C,Ir=new C;class et extends ke{constructor(t=new Ae,e=new ye){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const l=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const l=this.morphTargetInfluences;if(r&&l){Dr.set(0,0,0);for(let o=0,c=r.length;o<c;o++){const h=l[o],d=r[o];h!==0&&(ja.fromBufferAttribute(d,t),a?Dr.addScaledVector(ja,h):Dr.addScaledVector(ja.sub(e),h))}e.add(Dr)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Rr.copy(n.boundingSphere),Rr.applyMatrix4(r),Ii.copy(t.ray).recast(t.near),!(Rr.containsPoint(Ii.origin)===!1&&(Ii.intersectSphere(Rr,pc)===null||Ii.origin.distanceToSquared(pc)>(t.far-t.near)**2))&&(fc.copy(r).invert(),Ii.copy(t.ray).applyMatrix4(fc),!(n.boundingBox!==null&&Ii.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Ii)))}_computeIntersections(t,e,n){let s;const r=this.geometry,a=this.material,l=r.index,o=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(l!==null)if(Array.isArray(a))for(let _=0,x=u.length;_<x;_++){const m=u[_],p=a[m.materialIndex],M=Math.max(m.start,f.start),E=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let b=M,A=E;b<A;b+=3){const w=l.getX(b),g=l.getX(b+1),y=l.getX(b+2);s=Nr(this,p,t,n,c,h,d,w,g,y),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const _=Math.max(0,f.start),x=Math.min(l.count,f.start+f.count);for(let m=_,p=x;m<p;m+=3){const M=l.getX(m),E=l.getX(m+1),b=l.getX(m+2);s=Nr(this,a,t,n,c,h,d,M,E,b),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(o!==void 0)if(Array.isArray(a))for(let _=0,x=u.length;_<x;_++){const m=u[_],p=a[m.materialIndex],M=Math.max(m.start,f.start),E=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let b=M,A=E;b<A;b+=3){const w=b,g=b+1,y=b+2;s=Nr(this,p,t,n,c,h,d,w,g,y),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const _=Math.max(0,f.start),x=Math.min(o.count,f.start+f.count);for(let m=_,p=x;m<p;m+=3){const M=m,E=m+1,b=m+2;s=Nr(this,a,t,n,c,h,d,M,E,b),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function Bd(i,t,e,n,s,r,a,l){let o;if(t.side===Mn?o=n.intersectTriangle(a,r,s,!0,l):o=n.intersectTriangle(s,r,a,t.side===zi,l),o===null)return null;Ir.copy(l),Ir.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Ir);return c<e.near||c>e.far?null:{distance:c,point:Ir.clone(),object:i}}function Nr(i,t,e,n,s,r,a,l,o,c){i.getVertexPosition(l,Cr),i.getVertexPosition(o,Pr),i.getVertexPosition(c,Lr);const h=Bd(i,t,e,n,Cr,Pr,Lr,mc);if(h){const d=new C;Un.getBarycoord(mc,Cr,Pr,Lr,d),s&&(h.uv=Un.getInterpolatedAttribute(s,l,o,c,d,new Ct)),r&&(h.uv1=Un.getInterpolatedAttribute(r,l,o,c,d,new Ct)),a&&(h.normal=Un.getInterpolatedAttribute(a,l,o,c,d,new C),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a:l,b:o,c,normal:new C,materialIndex:0};Un.getNormal(Cr,Pr,Lr,u.normal),h.face=u,h.barycoord=d}return h}class Oh extends hn{constructor(t=null,e=1,n=1,s,r,a,l,o,c=en,h=en,d,u){super(null,a,l,o,c,h,s,r,d,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class gc extends un{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const rs=new le,_c=new le,Ur=[],xc=new Vi,zd=new le,zs=new et,ks=new Ei;class Bh extends et{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new gc(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,zd)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Vi),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,rs),xc.copy(t.boundingBox).applyMatrix4(rs),this.boundingBox.union(xc)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ei),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,rs),ks.copy(t.boundingSphere).applyMatrix4(rs),this.boundingSphere.union(ks)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),this.morphTexture=t.morphTexture!==null?t.morphTexture.clone():null,this.instanceColor=t.instanceColor!==null?t.instanceColor.clone():null,this.count=t.count,this.boundingBox=t.boundingBox!==null?t.boundingBox.clone():null,this.boundingSphere=t.boundingSphere!==null?t.boundingSphere.clone():null,this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=t*r+1;for(let l=0;l<n.length;l++)n[l]=s[a+l]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(zs.geometry=this.geometry,zs.material=this.material,zs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ks.copy(this.boundingSphere),ks.applyMatrix4(n),t.ray.intersectsSphere(ks)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,rs),_c.multiplyMatrices(n,rs),zs.matrixWorld=_c,zs.raycast(t,Ur);for(let a=0,l=Ur.length;a<l;a++){const o=Ur[a];o.instanceId=r,o.object=this,e.push(o)}Ur.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new gc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Oh(new Float32Array(s*this.count),s,this.count,xl,Vn));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const l=this.geometry.morphTargetsRelative?1:1-a,o=s*t;return r[o]=l,r.set(n,o+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Ni=new Ei,kd=new Ct(.5,.5),Fr=new C;class sr{constructor(t=new xi,e=new xi,n=new xi,s=new xi,r=new xi,a=new xi){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){const l=this.planes;return l[0].copy(t),l[1].copy(e),l[2].copy(n),l[3].copy(s),l[4].copy(r),l[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Wn,n=!1){const s=this.planes,r=t.elements,a=r[0],l=r[1],o=r[2],c=r[3],h=r[4],d=r[5],u=r[6],f=r[7],_=r[8],x=r[9],m=r[10],p=r[11],M=r[12],E=r[13],b=r[14],A=r[15];if(s[0].setComponents(c-a,f-h,p-_,A-M).normalize(),s[1].setComponents(c+a,f+h,p+_,A+M).normalize(),s[2].setComponents(c+l,f+d,p+x,A+E).normalize(),s[3].setComponents(c-l,f-d,p-x,A-E).normalize(),n)s[4].setComponents(o,u,m,b).normalize(),s[5].setComponents(c-o,f-u,p-m,A-b).normalize();else if(s[4].setComponents(c-o,f-u,p-m,A-b).normalize(),e===Wn)s[5].setComponents(c+o,f+u,p+m,A+b).normalize();else if(e===nr)s[5].setComponents(o,u,m,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ni.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Ni.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ni)}intersectsSprite(t){Ni.center.set(0,0,0);const e=kd.distanceTo(t.center);return Ni.radius=.7071067811865476+e,Ni.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ni)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(Fr.x=s.normal.x>0?t.max.x:t.min.x,Fr.y=s.normal.y>0?t.max.y:t.min.y,Fr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Fr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}const vc=new le;class Rl{constructor(){this.coordinateSystem=Wn,this._frustums=[],this._count=0}setFromArrayCamera(t){const e=t.cameras,n=this._frustums;for(let s=0;s<e.length;s++){const r=e[s];vc.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[s]===void 0&&(n[s]=new sr),n[s].setFromProjectionMatrix(vc,r.coordinateSystem,r.reversedDepth)}return this._count=e.length,this}getFrustum(t){return this._frustums[t]}intersectsObject(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsObject(t))return!0;return!1}intersectsSprite(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSprite(t))return!0;return!1}intersectsSphere(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSphere(t))return!0;return!1}intersectsBox(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsBox(t))return!0;return!1}containsPoint(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].containsPoint(t))return!0;return!1}copy(t){this.coordinateSystem=t.coordinateSystem;const e=this._frustums,n=t._frustums;for(let s=0;s<t._count;s++)e[s]===void 0&&(e[s]=new sr),e[s].copy(n[s]);return this._count=t._count,this}clone(){return new Rl().copy(this)}}class Cl extends Ti{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Dt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const fa=new C,pa=new C,Mc=new le,Gs=new ba,Or=new Ei,to=new C,Sc=new C;class zh extends ke{constructor(t=new Ae,e=new Cl){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)fa.fromBufferAttribute(e,s-1),pa.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=fa.distanceTo(pa);t.setAttribute("lineDistance",new ce(n,1))}else Gt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Or.copy(n.boundingSphere),Or.applyMatrix4(s),Or.radius+=r,t.ray.intersectsSphere(Or)===!1)return;Mc.copy(s).invert(),Gs.copy(t.ray).applyMatrix4(Mc);const l=r/((this.scale.x+this.scale.y+this.scale.z)/3),o=l*l,c=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){const f=Math.max(0,a.start),_=Math.min(h.count,a.start+a.count);for(let x=f,m=_-1;x<m;x+=c){const p=h.getX(x),M=h.getX(x+1),E=Br(this,t,Gs,o,p,M,x);E&&e.push(E)}if(this.isLineLoop){const x=h.getX(_-1),m=h.getX(f),p=Br(this,t,Gs,o,x,m,_-1);p&&e.push(p)}}else{const f=Math.max(0,a.start),_=Math.min(u.count,a.start+a.count);for(let x=f,m=_-1;x<m;x+=c){const p=Br(this,t,Gs,o,x,x+1,x);p&&e.push(p)}if(this.isLineLoop){const x=Br(this,t,Gs,o,_-1,f,_-1);x&&e.push(x)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const l=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=r}}}}}function Br(i,t,e,n,s,r,a){const l=i.geometry.attributes.position;if(fa.fromBufferAttribute(l,s),pa.fromBufferAttribute(l,r),e.distanceSqToSegment(fa,pa,to,Sc)>n)return;to.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(to);if(!(c<t.near||c>t.far))return{distance:c,point:Sc.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}class rr extends Ti{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Dt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const yc=new le,Zo=new ba,zr=new Ei,kr=new C;class ma extends ke{constructor(t=new Ae,e=new rr){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),zr.copy(n.boundingSphere),zr.applyMatrix4(s),zr.radius+=r,t.ray.intersectsSphere(zr)===!1)return;yc.copy(s).invert(),Zo.copy(t.ray).applyMatrix4(yc);const l=r/((this.scale.x+this.scale.y+this.scale.z)/3),o=l*l,c=n.index,d=n.attributes.position;if(c!==null){const u=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let _=u,x=f;_<x;_++){const m=c.getX(_);kr.fromBufferAttribute(d,m),bc(kr,m,o,s,t,e,this)}}else{const u=Math.max(0,a.start),f=Math.min(d.count,a.start+a.count);for(let _=u,x=f;_<x;_++)kr.fromBufferAttribute(d,_),bc(kr,_,o,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const l=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=r}}}}}function bc(i,t,e,n,s,r,a){const l=Zo.distanceSqToPoint(i);if(l<e){const o=new C;Zo.closestPointToPoint(i,o),o.applyMatrix4(n);const c=s.ray.origin.distanceTo(o);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(l),point:o,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}class kh extends hn{constructor(t=[],e=Ms,n,s,r,a,l,o,c,h){super(t,e,n,s,r,a,l,o,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class wa extends hn{constructor(t,e,n,s,r,a,l,o,c){super(t,e,n,s,r,a,l,o,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class bs extends hn{constructor(t,e,n=Qn,s,r,a,l=en,o=en,c,h=bi,d=1){if(h!==bi&&h!==Si)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:t,height:e,depth:d};super(u,s,r,a,l,o,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new El(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}}class Gh extends bs{constructor(t,e=Qn,n=Ms,s,r,a=en,l=en,o,c=bi){const h={width:t,height:t,depth:1},d=[h,h,h,h,h,h];super(t,t,e,n,s,r,a,l,o,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class Hh extends hn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class ae extends Ae{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const l=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const o=[],c=[],h=[],d=[];let u=0,f=0;_("z","y","x",-1,-1,n,e,t,a,r,0),_("z","y","x",1,-1,n,e,-t,a,r,1),_("x","z","y",1,1,t,n,e,s,a,2),_("x","z","y",1,-1,t,n,-e,s,a,3),_("x","y","z",1,-1,t,e,n,s,r,4),_("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(o),this.setAttribute("position",new ce(c,3)),this.setAttribute("normal",new ce(h,3)),this.setAttribute("uv",new ce(d,2));function _(x,m,p,M,E,b,A,w,g,y,L){const P=b/g,N=A/y,F=b/2,W=A/2,I=w/2,G=g+1,K=y+1;let k=0,nt=0;const V=new C;for(let Q=0;Q<K;Q++){const j=Q*N-W;for(let bt=0;bt<G;bt++){const zt=bt*P-F;V[x]=zt*M,V[m]=j*E,V[p]=I,c.push(V.x,V.y,V.z),V[x]=0,V[m]=0,V[p]=w>0?1:-1,h.push(V.x,V.y,V.z),d.push(bt/g),d.push(1-Q/y),k+=1}}for(let Q=0;Q<y;Q++)for(let j=0;j<g;j++){const bt=u+j+G*Q,zt=u+j+G*(Q+1),Z=u+(j+1)+G*(Q+1),_t=u+(j+1)+G*Q;o.push(bt,zt,_t),o.push(zt,Z,_t),nt+=6}l.addGroup(f,nt,L),f+=nt,u+=k}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ae(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class Pl extends Ae{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const r=[],a=[],l=[],o=[],c=new C,h=new Ct;a.push(0,0,0),l.push(0,0,1),o.push(.5,.5);for(let d=0,u=3;d<=e;d++,u+=3){const f=n+d/e*s;c.x=t*Math.cos(f),c.y=t*Math.sin(f),a.push(c.x,c.y,c.z),l.push(0,0,1),h.x=(a[u]/t+1)/2,h.y=(a[u+1]/t+1)/2,o.push(h.x,h.y)}for(let d=1;d<=e;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new ce(a,3)),this.setAttribute("normal",new ce(l,3)),this.setAttribute("uv",new ce(o,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Pl(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Pe extends Ae{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,l=0,o=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:l,thetaLength:o};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],d=[],u=[],f=[];let _=0;const x=[],m=n/2;let p=0;M(),a===!1&&(t>0&&E(!0),e>0&&E(!1)),this.setIndex(h),this.setAttribute("position",new ce(d,3)),this.setAttribute("normal",new ce(u,3)),this.setAttribute("uv",new ce(f,2));function M(){const b=new C,A=new C;let w=0;const g=(e-t)/n;for(let y=0;y<=r;y++){const L=[],P=y/r,N=P*(e-t)+t;for(let F=0;F<=s;F++){const W=F/s,I=W*o+l,G=Math.sin(I),K=Math.cos(I);A.x=N*G,A.y=-P*n+m,A.z=N*K,d.push(A.x,A.y,A.z),b.set(G,g,K).normalize(),u.push(b.x,b.y,b.z),f.push(W,1-P),L.push(_++)}x.push(L)}for(let y=0;y<s;y++)for(let L=0;L<r;L++){const P=x[L][y],N=x[L+1][y],F=x[L+1][y+1],W=x[L][y+1];(t>0||L!==0)&&(h.push(P,N,W),w+=3),(e>0||L!==r-1)&&(h.push(N,F,W),w+=3)}c.addGroup(p,w,0),p+=w}function E(b){const A=_,w=new Ct,g=new C;let y=0;const L=b===!0?t:e,P=b===!0?1:-1;for(let F=1;F<=s;F++)d.push(0,m*P,0),u.push(0,P,0),f.push(.5,.5),_++;const N=_;for(let F=0;F<=s;F++){const I=F/s*o+l,G=Math.cos(I),K=Math.sin(I);g.x=L*K,g.y=m*P,g.z=L*G,d.push(g.x,g.y,g.z),u.push(0,P,0),w.x=G*.5+.5,w.y=K*.5*P+.5,f.push(w.x,w.y),_++}for(let F=0;F<s;F++){const W=A+F,I=N+F;b===!0?h.push(I,I+1,W):h.push(I+1,I,W),y+=3}c.addGroup(p,y,b===!0?1:2),p+=y}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Pe(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Wi extends Pe{constructor(t=1,e=1,n=32,s=1,r=!1,a=0,l=Math.PI*2){super(0,t,e,n,s,r,a,l),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:l}}static fromJSON(t){return new Wi(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Ll extends Ae{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};const r=[],a=[];l(s),c(n),h(),this.setAttribute("position",new ce(r,3)),this.setAttribute("normal",new ce(r.slice(),3)),this.setAttribute("uv",new ce(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function l(M){const E=new C,b=new C,A=new C;for(let w=0;w<e.length;w+=3)f(e[w+0],E),f(e[w+1],b),f(e[w+2],A),o(E,b,A,M)}function o(M,E,b,A){const w=A+1,g=[];for(let y=0;y<=w;y++){g[y]=[];const L=M.clone().lerp(b,y/w),P=E.clone().lerp(b,y/w),N=w-y;for(let F=0;F<=N;F++)F===0&&y===w?g[y][F]=L:g[y][F]=L.clone().lerp(P,F/N)}for(let y=0;y<w;y++)for(let L=0;L<2*(w-y)-1;L++){const P=Math.floor(L/2);L%2===0?(u(g[y][P+1]),u(g[y+1][P]),u(g[y][P])):(u(g[y][P+1]),u(g[y+1][P+1]),u(g[y+1][P]))}}function c(M){const E=new C;for(let b=0;b<r.length;b+=3)E.x=r[b+0],E.y=r[b+1],E.z=r[b+2],E.normalize().multiplyScalar(M),r[b+0]=E.x,r[b+1]=E.y,r[b+2]=E.z}function h(){const M=new C;for(let E=0;E<r.length;E+=3){M.x=r[E+0],M.y=r[E+1],M.z=r[E+2];const b=m(M)/2/Math.PI+.5,A=p(M)/Math.PI+.5;a.push(b,1-A)}_(),d()}function d(){for(let M=0;M<a.length;M+=6){const E=a[M+0],b=a[M+2],A=a[M+4],w=Math.max(E,b,A),g=Math.min(E,b,A);w>.9&&g<.1&&(E<.2&&(a[M+0]+=1),b<.2&&(a[M+2]+=1),A<.2&&(a[M+4]+=1))}}function u(M){r.push(M.x,M.y,M.z)}function f(M,E){const b=M*3;E.x=t[b+0],E.y=t[b+1],E.z=t[b+2]}function _(){const M=new C,E=new C,b=new C,A=new C,w=new Ct,g=new Ct,y=new Ct;for(let L=0,P=0;L<r.length;L+=9,P+=6){M.set(r[L+0],r[L+1],r[L+2]),E.set(r[L+3],r[L+4],r[L+5]),b.set(r[L+6],r[L+7],r[L+8]),w.set(a[P+0],a[P+1]),g.set(a[P+2],a[P+3]),y.set(a[P+4],a[P+5]),A.copy(M).add(E).add(b).divideScalar(3);const N=m(A);x(w,P+0,M,N),x(g,P+2,E,N),x(y,P+4,b,N)}}function x(M,E,b,A){A<0&&M.x===1&&(a[E]=M.x-1),b.x===0&&b.z===0&&(a[E]=A/2/Math.PI+.5)}function m(M){return Math.atan2(M.z,-M.x)}function p(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ll(t.vertices,t.indices,t.radius,t.detail)}}class ws extends Ll{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new ws(t.radius,t.detail)}}class cn extends Ae{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,a=e/2,l=Math.floor(n),o=Math.floor(s),c=l+1,h=o+1,d=t/l,u=e/o,f=[],_=[],x=[],m=[];for(let p=0;p<h;p++){const M=p*u-a;for(let E=0;E<c;E++){const b=E*d-r;_.push(b,-M,0),x.push(0,0,1),m.push(E/l),m.push(1-p/o)}}for(let p=0;p<o;p++)for(let M=0;M<l;M++){const E=M+c*p,b=M+c*(p+1),A=M+1+c*(p+1),w=M+1+c*p;f.push(E,b,w),f.push(b,A,w)}this.setIndex(f),this.setAttribute("position",new ce(_,3)),this.setAttribute("normal",new ce(x,3)),this.setAttribute("uv",new ce(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new cn(t.width,t.height,t.widthSegments,t.heightSegments)}}class _s extends Ae{constructor(t=.5,e=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);const l=[],o=[],c=[],h=[];let d=t;const u=(e-t)/s,f=new C,_=new Ct;for(let x=0;x<=s;x++){for(let m=0;m<=n;m++){const p=r+m/n*a;f.x=d*Math.cos(p),f.y=d*Math.sin(p),o.push(f.x,f.y,f.z),c.push(0,0,1),_.x=(f.x/e+1)/2,_.y=(f.y/e+1)/2,h.push(_.x,_.y)}d+=u}for(let x=0;x<s;x++){const m=x*(n+1);for(let p=0;p<n;p++){const M=p+m,E=M,b=M+n+1,A=M+n+2,w=M+1;l.push(E,b,w),l.push(b,A,w)}}this.setIndex(l),this.setAttribute("position",new ce(o,3)),this.setAttribute("normal",new ce(c,3)),this.setAttribute("uv",new ce(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new _s(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Tn extends Ae{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,l=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:l},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const o=Math.min(a+l,Math.PI);let c=0;const h=[],d=new C,u=new C,f=[],_=[],x=[],m=[];for(let p=0;p<=n;p++){const M=[],E=p/n,b=a+E*l,A=t*Math.cos(b),w=Math.sqrt(t*t-A*A);let g=0;p===0&&a===0?g=.5/e:p===n&&o===Math.PI&&(g=-.5/e);for(let y=0;y<=e;y++){const L=y/e,P=s+L*r;d.x=-w*Math.cos(P),d.y=A,d.z=w*Math.sin(P),_.push(d.x,d.y,d.z),u.copy(d).normalize(),x.push(u.x,u.y,u.z),m.push(L+g,1-E),M.push(c++)}h.push(M)}for(let p=0;p<n;p++)for(let M=0;M<e;M++){const E=h[p][M+1],b=h[p][M],A=h[p+1][M],w=h[p+1][M+1];(p!==0||a>0)&&f.push(E,b,w),(p!==n-1||o<Math.PI)&&f.push(b,A,w)}this.setIndex(f),this.setAttribute("position",new ce(_,3)),this.setAttribute("normal",new ce(x,3)),this.setAttribute("uv",new ce(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Tn(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class li extends Ae{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2,a=0,l=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r,thetaStart:a,thetaLength:l},n=Math.floor(n),s=Math.floor(s);const o=[],c=[],h=[],d=[],u=new C,f=new C,_=new C;for(let x=0;x<=n;x++){const m=a+x/n*l;for(let p=0;p<=s;p++){const M=p/s*r;f.x=(t+e*Math.cos(m))*Math.cos(M),f.y=(t+e*Math.cos(m))*Math.sin(M),f.z=e*Math.sin(m),c.push(f.x,f.y,f.z),u.x=t*Math.cos(M),u.y=t*Math.sin(M),_.subVectors(f,u).normalize(),h.push(_.x,_.y,_.z),d.push(p/s),d.push(x/n)}}for(let x=1;x<=n;x++)for(let m=1;m<=s;m++){const p=(s+1)*x+m-1,M=(s+1)*(x-1)+m-1,E=(s+1)*(x-1)+m,b=(s+1)*x+m;o.push(p,M,b),o.push(M,E,b)}this.setIndex(o),this.setAttribute("position",new ce(c,3)),this.setAttribute("normal",new ce(h,3)),this.setAttribute("uv",new ce(d,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new li(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}}function Es(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];if(wc(s))s.isRenderTargetTexture?(Gt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone();else if(Array.isArray(s))if(wc(s[0])){const r=[];for(let a=0,l=s.length;a<l;a++)r[a]=s[a].clone();t[e][n]=r}else t[e][n]=s.slice();else t[e][n]=s}}return t}function xn(i){const t={};for(let e=0;e<i.length;e++){const n=Es(i[e]);for(const s in n)t[s]=n[s]}return t}function wc(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Gd(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Vh(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:re.workingColorSpace}const ar={clone:Es,merge:xn};var Hd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Vd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class vn extends Ti{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Hd,this.fragmentShader=Vd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Es(t.uniforms),this.uniformsGroups=Gd(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(const n in t.uniforms){const s=t.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=e[s.value]||null;break;case"c":this.uniforms[n].value=new Dt().setHex(s.value);break;case"v2":this.uniforms[n].value=new Ct().fromArray(s.value);break;case"v3":this.uniforms[n].value=new C().fromArray(s.value);break;case"v4":this.uniforms[n].value=new De().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Xt().fromArray(s.value);break;case"m4":this.uniforms[n].value=new le().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(const n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}}class Wh extends vn{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class yt extends Ti{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Dt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Dt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=$o,this.normalScale=new Ct(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Fn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Wd extends yt{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Ct(1,1),this.clearcoatNormalMap=null,this.diffuseRoughnessMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ee(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessMinimum=100,this.iridescenceThicknessMaximum=400,this.iridescenceThicknessMap=null,this.sheenColor=new Dt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Dt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Dt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._diffuseRoughness=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get diffuseRoughness(){return this._diffuseRoughness}set diffuseRoughness(t){this._diffuseRoughness>0!=t>0&&this.version++,this._diffuseRoughness=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(t){this._retroreflectivity>0!=t>0&&this.version++,this._retroreflectivity=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}get iridescenceThicknessRange(){return ms('MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".'),[this.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum]}set iridescenceThicknessRange(t){ms('MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".'),this.iridescenceThicknessMinimum=t[0],this.iridescenceThicknessMaximum=t[1]}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.diffuseRoughness=t.diffuseRoughness,this.diffuseRoughnessMap=t.diffuseRoughnessMap,this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessMinimum=t.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum=t.iridescenceThicknessMaximum,this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.retroreflectivity=t.retroreflectivity,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class Xd extends Ti{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Wu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class qd extends Ti{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Dl extends ke{static registerNode(t){this.prototype._lightNode=t}constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Dt(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}}class Yd extends Dl{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ke.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Dt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){const e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}}const eo=new le,Ec=new C,Tc=new C;class Xh{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ct(512,512),this.mapType=Dn,this.map=null,this.mapPass=null,this.matrix=new le,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new sr,this._frameExtents=new Ct(1,1),this._viewportCount=1,this._viewports=[new De(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera;Ec.setFromMatrixPosition(t.matrixWorld),e.position.copy(Ec),Tc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Tc),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,s){eo.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(eo,t.coordinateSystem,t.reversedDepth);const r=this._frameExtents,a=s?s.z/r.x:1,l=s?s.w/r.y:1,o=s?s.x/r.x:0,c=s?s.y/r.y:0;t.coordinateSystem===nr||t.reversedDepth?e.set(.5*a,0,0,.5*a+o,0,.5*l,0,.5*l+c,0,0,1,0,0,0,0,1):e.set(.5*a,0,0,.5*a+o,0,.5*l,0,.5*l+c,0,0,.5,.5,0,0,0,1),e.multiply(eo)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.mapType=t.mapType,this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.mapType=this.mapType,t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Gr=new C,Hr=new Xn,Yn=new C;class qh extends ke{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new le,this.projectionMatrix=new le,this.projectionMatrixInverse=new le,this.coordinateSystem=Wn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Gr,Hr,Yn),Yn.x===1&&Yn.y===1&&Yn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Gr,Hr,Yn.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(Gr,Hr,Yn),Yn.x===1&&Yn.y===1&&Yn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Gr,Hr,Yn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const _i=new C,Ac=new Ct,Rc=new Ct;class Nn extends qh{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=ir*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Ks*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ir*2*Math.atan(Math.tan(Ks*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){_i.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(_i.x,_i.y).multiplyScalar(-t/_i.z),_i.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(_i.x,_i.y).multiplyScalar(-t/_i.z)}getViewSize(t,e){return this.getViewBounds(t,Ac,Rc),e.subVectors(Rc,Ac)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Ks*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const o=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/o,e-=a.offsetY*n/c,s*=a.width/o,n*=a.height/c}const l=this.filmOffset;l!==0&&(r+=t*l/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}class Kd extends Xh{constructor(){super(new Nn(90,1,.5,500)),this.isPointLightShadow=!0}}class cr extends Dl{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Kd}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.distance=this.distance,e.object.decay=this.decay,e.object.shadow=this.shadow.toJSON(),e}}class Il extends qh{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,a=n+t,l=s+e,o=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,l-=h*this.view.offsetY,o=l-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,l,o,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class $d extends Xh{constructor(){super(new Il(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class no extends Dl{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ke.DEFAULT_UP),this.updateMatrix(),this.target=new ke,this.shadow=new $d}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}}const as=-90,os=1;class Jo extends ke{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Nn(as,os,t,e);s.layers=this.layers,this.add(s);const r=new Nn(as,os,t,e);r.layers=this.layers,this.add(r);const a=new Nn(as,os,t,e);a.layers=this.layers,this.add(a);const l=new Nn(as,os,t,e);l.layers=this.layers,this.add(l);const o=new Nn(as,os,t,e);o.layers=this.layers,this.add(o);const c=new Nn(as,os,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,l,o]=e;for(const c of e)this.remove(c);if(t===Wn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),l.up.set(0,1,0),l.lookAt(0,0,1),o.up.set(0,1,0),o.lookAt(0,0,-1);else if(t===nr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),l.up.set(0,-1,0),l.lookAt(0,0,1),o.up.set(0,-1,0),o.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,l,o,c,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),_=t.xr.enabled;t.xr.enabled=!1;const x=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let m=!1;t.isWebGLRenderer===!0?m=t.state.buffers.depth.getReversed():m=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,2,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(n,3,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,4,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),n.texture.mipmapsAutoUpdate=x,t.setRenderTarget(n,5,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(d,u,f),t.xr.enabled=_,n.texture.needsPMREMUpdate=!0}}class Zd extends Nn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t,this.perCameraFrustumCulled=!1}}class Jd{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(t){this._document=t,t.hidden!==void 0&&(this._pageVisibilityHandler=Qd.bind(this),t.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(t){return this._timescale=t,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(t){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(t!==void 0?t:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function Qd(){this._document.hidden===!1&&this.reset()}const Cc=new le;class jd{constructor(t,e,n=0,s=1/0){this.ray=new ba(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new Tl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,e.projectionMatrix.elements[14]).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):de("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Cc.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Cc),this}intersectObject(t,e=!0,n=[]){return Qo(t,this,n,e),n.sort(Pc),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)Qo(t[s],this,n,e);return n.sort(Pc),n}}function Pc(i,t){return i.distance-t.distance}function Qo(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,l=r.length;a<l;a++)Qo(r[a],t,e,!0)}}const Hl=class Hl{constructor(t,e,n,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,s){const r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=s,this}};Hl.prototype.isMatrix2=!0;let Lc=Hl;function Dc(i,t,e,n){const s=tf(n);switch(e){case bh:return i*t;case xl:return i*t/s.components*s.byteLength;case vl:return i*t/s.components*s.byteLength;case ki:return i*t*2/s.components*s.byteLength;case Ml:return i*t*2/s.components*s.byteLength;case wh:return i*t*3/s.components*s.byteLength;case Jn:return i*t*4/s.components*s.byteLength;case Sl:return i*t*4/s.components*s.byteLength;case Jr:case Qr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case jr:case ta:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Mo:case yo:return Math.max(i,16)*Math.max(t,8)/4;case vo:case So:return Math.max(i,8)*Math.max(t,8)/2;case bo:case wo:case To:case Ao:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Eo:case aa:case Ro:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Co:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Po:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Lo:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Do:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Io:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case No:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Uo:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Fo:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Oo:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Bo:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case zo:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case ko:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Go:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Ho:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Vo:case Wo:case Xo:return Math.ceil(i/4)*Math.ceil(t/4)*16;case qo:case Yo:return Math.ceil(i/4)*Math.ceil(t/4)*8;case oa:case Ko:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function tf(i){switch(i){case Dn:case vh:return{byteLength:1,components:1};case er:case Mh:case An:return{byteLength:2,components:1};case gl:case _l:return{byteLength:2,components:4};case Qn:case ml:case Vn:return{byteLength:4,components:1};case Sh:case yh:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ll}}));typeof window<"u"&&(window.__THREE__?Gt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ll);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Yh(){let i=null,t=!1,e=null,n=null;function s(r,a){n=i.requestAnimationFrame(s),e(r,a)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function ef(i){const t=new WeakMap;function e(l,o){const c=l.array,h=l.usage,d=c.byteLength,u=i.createBuffer();i.bindBuffer(o,u),i.bufferData(o,c,h),l.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)l.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:l.version,size:d}}function n(l,o,c){const h=o.array,d=o.updateRanges;if(i.bindBuffer(c,l),d.length===0)i.bufferSubData(c,0,h);else{d.sort((f,_)=>f.start-_.start);let u=0;for(let f=1;f<d.length;f++){const _=d[u],x=d[f];x.start<=_.start+_.count+1?_.count=Math.max(_.count,x.start+x.count-_.start):(++u,d[u]=x)}d.length=u+1;for(let f=0,_=d.length;f<_;f++){const x=d[f];i.bufferSubData(c,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}o.clearUpdateRanges()}o.onUploadCallback()}function s(l){return l.isInterleavedBufferAttribute&&(l=l.data),t.get(l)}function r(l){l.isInterleavedBufferAttribute&&(l=l.data);const o=t.get(l);o&&(i.deleteBuffer(o.buffer),t.delete(l))}function a(l,o){if(l.isInterleavedBufferAttribute&&(l=l.data),l.isGLBufferAttribute){const h=t.get(l);(!h||h.version<l.version)&&t.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}const c=t.get(l);if(c===void 0)t.set(l,e(l,o));else if(c.version<l.version){if(c.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,l,o),c.version=l.version}}return{get:s,remove:r,update:a}}var nf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,sf=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,rf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,af=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,of=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,lf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,cf=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,hf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,uf=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,df=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,ff=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,pf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,mf=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,gf=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,_f=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,xf=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,vf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Mf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Sf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,yf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,bf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,wf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Ef=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Tf=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Af=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,Rf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Cf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Pf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Lf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Df="gl_FragColor = linearToOutputTexel( gl_FragColor );",If=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Nf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Uf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,Ff=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Of=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Bf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,zf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,kf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Gf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Hf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Vf=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Wf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Xf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,qf=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Yf=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Kf=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,$f=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Zf=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Jf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Qf=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,jf=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,tp=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,ep=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,np=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,ip=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,sp=`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,rp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ap=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,op=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,lp=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,cp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,hp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,up=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,dp=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,fp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,pp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,mp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,gp=`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,_p=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,xp=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,vp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Mp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Sp=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,yp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,bp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,wp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Ep=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Tp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Ap=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Rp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Cp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Pp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Lp=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Dp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Ip=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Np=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Up=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Fp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Op=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Bp=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,zp=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,kp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Gp=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Hp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Vp=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Wp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Xp=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,qp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Yp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Kp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,$p=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Zp=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Jp=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Qp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,jp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,tm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,em=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const nm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,im=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,rm=`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,am=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,om=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,lm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,cm=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,hm=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,um=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,dm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,fm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,pm=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,mm=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,gm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,_m=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,xm=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,vm=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Mm=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Sm=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ym=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,bm=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,wm=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Em=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Tm=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Am=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Rm=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Cm=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Pm=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Lm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Dm=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Im=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Nm=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Um=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,jt={alphahash_fragment:nf,alphahash_pars_fragment:sf,alphamap_fragment:rf,alphamap_pars_fragment:af,alphatest_fragment:of,alphatest_pars_fragment:lf,aomap_fragment:cf,aomap_pars_fragment:hf,batching_pars_vertex:uf,batching_vertex:df,begin_vertex:ff,beginnormal_vertex:pf,bsdfs:mf,iridescence_fragment:gf,bumpmap_pars_fragment:_f,clipping_planes_fragment:xf,clipping_planes_pars_fragment:vf,clipping_planes_pars_vertex:Mf,clipping_planes_vertex:Sf,color_fragment:yf,color_pars_fragment:bf,color_pars_vertex:wf,color_vertex:Ef,common:Tf,defaultnormal_vertex:Af,displacementmap_pars_vertex:Rf,displacementmap_vertex:Cf,emissivemap_fragment:Pf,emissivemap_pars_fragment:Lf,colorspace_fragment:Df,colorspace_pars_fragment:If,envmap_fragment:Nf,envmap_common_pars_fragment:Uf,envmap_pars_fragment:Ff,envmap_pars_vertex:Of,envmap_physical_pars_fragment:Kf,envmap_vertex:Bf,fog_vertex:zf,fog_pars_vertex:kf,fog_fragment:Gf,fog_pars_fragment:Hf,gradientmap_pars_fragment:Vf,lightmap_pars_fragment:Wf,lights_lambert_fragment:Xf,lights_lambert_pars_fragment:qf,lights_pars_begin:Yf,lights_toon_fragment:$f,lights_toon_pars_fragment:Zf,lights_phong_fragment:Jf,lights_phong_pars_fragment:Qf,lights_physical_fragment:jf,lights_physical_pars_fragment:tp,lights_fragment_begin:ep,lights_fragment_maps:np,lights_fragment_end:ip,lightprobes_pars_fragment:sp,logdepthbuf_fragment:rp,logdepthbuf_pars_fragment:ap,logdepthbuf_pars_vertex:op,logdepthbuf_vertex:lp,map_fragment:cp,map_pars_fragment:hp,map_particle_fragment:up,map_particle_pars_fragment:dp,metalnessmap_fragment:fp,metalnessmap_pars_fragment:pp,morphinstance_vertex:mp,morphcolor_vertex:gp,morphnormal_vertex:_p,morphtarget_pars_vertex:xp,morphtarget_vertex:vp,normal_fragment_begin:Mp,normal_fragment_maps:Sp,normal_pars_fragment:yp,normal_pars_vertex:bp,normal_vertex:wp,normalmap_pars_fragment:Ep,clearcoat_normal_fragment_begin:Tp,clearcoat_normal_fragment_maps:Ap,clearcoat_pars_fragment:Rp,iridescence_pars_fragment:Cp,opaque_fragment:Pp,packing:Lp,premultiplied_alpha_fragment:Dp,project_vertex:Ip,dithering_fragment:Np,dithering_pars_fragment:Up,roughnessmap_fragment:Fp,roughnessmap_pars_fragment:Op,shadowmap_pars_fragment:Bp,shadowmap_pars_vertex:zp,shadowmap_vertex:kp,shadowmask_pars_fragment:Gp,skinbase_vertex:Hp,skinning_pars_vertex:Vp,skinning_vertex:Wp,skinnormal_vertex:Xp,specularmap_fragment:qp,specularmap_pars_fragment:Yp,tonemapping_fragment:Kp,tonemapping_pars_fragment:$p,transmission_fragment:Zp,transmission_pars_fragment:Jp,uv_pars_fragment:Qp,uv_pars_vertex:jp,uv_vertex:tm,worldpos_vertex:em,background_vert:nm,background_frag:im,backgroundCube_vert:sm,backgroundCube_frag:rm,cube_vert:am,cube_frag:om,depth_vert:lm,depth_frag:cm,distance_vert:hm,distance_frag:um,equirect_vert:dm,equirect_frag:fm,linedashed_vert:pm,linedashed_frag:mm,meshbasic_vert:gm,meshbasic_frag:_m,meshlambert_vert:xm,meshlambert_frag:vm,meshmatcap_vert:Mm,meshmatcap_frag:Sm,meshnormal_vert:ym,meshnormal_frag:bm,meshphong_vert:wm,meshphong_frag:Em,meshphysical_vert:Tm,meshphysical_frag:Am,meshtoon_vert:Rm,meshtoon_frag:Cm,points_vert:Pm,points_frag:Lm,shadow_vert:Dm,shadow_frag:Im,sprite_vert:Nm,sprite_frag:Um},xt={common:{diffuse:{value:new Dt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Xt},alphaMap:{value:null},alphaMapTransform:{value:new Xt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Xt}},envmap:{envMap:{value:null},envMapRotation:{value:new Xt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Xt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Xt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Xt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Xt},normalScale:{value:new Ct(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Xt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Xt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Xt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Xt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Dt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new Dt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Xt},alphaTest:{value:0},uvTransform:{value:new Xt}},sprite:{diffuse:{value:new Dt(16777215)},opacity:{value:1},center:{value:new Ct(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Xt},alphaMap:{value:null},alphaMapTransform:{value:new Xt},alphaTest:{value:0}}},$n={basic:{uniforms:xn([xt.common,xt.specularmap,xt.envmap,xt.aomap,xt.lightmap,xt.fog]),vertexShader:jt.meshbasic_vert,fragmentShader:jt.meshbasic_frag},lambert:{uniforms:xn([xt.common,xt.specularmap,xt.envmap,xt.aomap,xt.lightmap,xt.emissivemap,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.fog,xt.lights,{emissive:{value:new Dt(0)},envMapIntensity:{value:1}}]),vertexShader:jt.meshlambert_vert,fragmentShader:jt.meshlambert_frag},phong:{uniforms:xn([xt.common,xt.specularmap,xt.envmap,xt.aomap,xt.lightmap,xt.emissivemap,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.fog,xt.lights,{emissive:{value:new Dt(0)},specular:{value:new Dt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:jt.meshphong_vert,fragmentShader:jt.meshphong_frag},standard:{uniforms:xn([xt.common,xt.envmap,xt.aomap,xt.lightmap,xt.emissivemap,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.roughnessmap,xt.metalnessmap,xt.fog,xt.lights,{emissive:{value:new Dt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:jt.meshphysical_vert,fragmentShader:jt.meshphysical_frag},toon:{uniforms:xn([xt.common,xt.aomap,xt.lightmap,xt.emissivemap,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.gradientmap,xt.fog,xt.lights,{emissive:{value:new Dt(0)}}]),vertexShader:jt.meshtoon_vert,fragmentShader:jt.meshtoon_frag},matcap:{uniforms:xn([xt.common,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.fog,{matcap:{value:null}}]),vertexShader:jt.meshmatcap_vert,fragmentShader:jt.meshmatcap_frag},points:{uniforms:xn([xt.points,xt.fog]),vertexShader:jt.points_vert,fragmentShader:jt.points_frag},dashed:{uniforms:xn([xt.common,xt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:jt.linedashed_vert,fragmentShader:jt.linedashed_frag},depth:{uniforms:xn([xt.common,xt.displacementmap]),vertexShader:jt.depth_vert,fragmentShader:jt.depth_frag},normal:{uniforms:xn([xt.common,xt.bumpmap,xt.normalmap,xt.displacementmap,{opacity:{value:1}}]),vertexShader:jt.meshnormal_vert,fragmentShader:jt.meshnormal_frag},sprite:{uniforms:xn([xt.sprite,xt.fog]),vertexShader:jt.sprite_vert,fragmentShader:jt.sprite_frag},background:{uniforms:{uvTransform:{value:new Xt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:jt.background_vert,fragmentShader:jt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Xt}},vertexShader:jt.backgroundCube_vert,fragmentShader:jt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:jt.cube_vert,fragmentShader:jt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:jt.equirect_vert,fragmentShader:jt.equirect_frag},distance:{uniforms:xn([xt.common,xt.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:jt.distance_vert,fragmentShader:jt.distance_frag},shadow:{uniforms:xn([xt.lights,xt.fog,{color:{value:new Dt(0)},opacity:{value:1}}]),vertexShader:jt.shadow_vert,fragmentShader:jt.shadow_frag}};$n.physical={uniforms:xn([$n.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Xt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Xt},clearcoatNormalScale:{value:new Ct(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Xt},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new Xt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Xt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Xt},sheen:{value:0},sheenColor:{value:new Dt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Xt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Xt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Xt},transmissionSamplerSize:{value:new Ct},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Xt},attenuationDistance:{value:0},attenuationColor:{value:new Dt(0)},specularColor:{value:new Dt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Xt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Xt},anisotropyVector:{value:new Ct},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Xt}}]),vertexShader:jt.meshphysical_vert,fragmentShader:jt.meshphysical_frag};const Vr={r:0,b:0,g:0},Fm=new le,Kh=new Xt;Kh.set(-1,0,0,0,1,0,0,0,1);function Om(i,t,e,n,s,r){const a=new Dt(0);let l=s===!0?0:1,o,c,h=null,d=0,u=null;function f(M){let E=M.isScene===!0?M.background:null;if(E&&E.isTexture){const b=M.backgroundBlurriness>0;E=t.get(E,b)}return E}function _(M){let E=!1;const b=f(M);b===null?m(a,l):b&&b.isColor&&(m(b,1),E=!0);const A=i.xr.getEnvironmentBlendMode();A==="additive"?e.buffers.color.setClear(0,0,0,1,r):A==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||E)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function x(M,E){const b=f(E);b&&b.isCubeTexture?(c===void 0&&(c=new et(new ae(1,1,1),new vn({name:"BackgroundCubeMaterial",uniforms:Es($n.backgroundCube.uniforms),vertexShader:$n.backgroundCube.vertexShader,fragmentShader:$n.backgroundCube.fragmentShader,side:Mn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(A,w,g){this.matrixWorld.copyPosition(g.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=b,c.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Fm.makeRotationFromEuler(E.backgroundRotation)).transpose(),b.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Kh),c.material.toneMapped=re.getTransfer(b.colorSpace)!==Me,(h!==b||d!==b.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,h=b,d=b.version,u=i.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null)):b&&b.isTexture&&(o===void 0&&(o=new et(new cn(2,2),new vn({name:"BackgroundMaterial",uniforms:Es($n.background.uniforms),vertexShader:$n.background.vertexShader,fragmentShader:$n.background.fragmentShader,side:zi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),o.geometry.deleteAttribute("normal"),Object.defineProperty(o.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(o)),o.material.uniforms.t2D.value=b,o.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,o.material.toneMapped=re.getTransfer(b.colorSpace)!==Me,b.matrixAutoUpdate===!0&&b.updateMatrix(),o.material.uniforms.uvTransform.value.copy(b.matrix),(h!==b||d!==b.version||u!==i.toneMapping)&&(o.material.needsUpdate=!0,h=b,d=b.version,u=i.toneMapping),o.layers.enableAll(),M.unshift(o,o.geometry,o.material,0,0,null))}function m(M,E){M.getRGB(Vr,Vh(i)),e.buffers.color.setClear(Vr.r,Vr.g,Vr.b,E,r)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),o!==void 0&&(o.geometry.dispose(),o.material.dispose(),o=void 0)}return{getClearColor:function(){return a},setClearColor:function(M,E=1){a.set(M),l=E,m(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(M){l=M,m(a,l)},render:_,addToRenderList:x,dispose:p}}function Bm(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null);let r=s,a=!1;function l(N,F,W,I,G){let K=!1;const k=d(N,I,W,F);r!==k&&(r=k,c(r.object)),K=f(N,I,W,G),K&&_(N,I,W,G),G!==null&&t.update(G,i.ELEMENT_ARRAY_BUFFER),(K||a)&&(a=!1,b(N,F,W,I),G!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(G).buffer))}function o(){return i.createVertexArray()}function c(N){return i.bindVertexArray(N)}function h(N){return i.deleteVertexArray(N)}function d(N,F,W,I){const G=I.wireframe===!0;let K=n[F.id];K===void 0&&(K={},n[F.id]=K);const k=N.isInstancedMesh===!0?N.id:0;let nt=K[k];nt===void 0&&(nt={},K[k]=nt);let V=nt[W.id];V===void 0&&(V={},nt[W.id]=V);let Q=V[G];return Q===void 0&&(Q=u(o()),V[G]=Q),Q}function u(N){const F=[],W=[],I=[];for(let G=0;G<e;G++)F[G]=0,W[G]=0,I[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:W,attributeDivisors:I,object:N,attributes:{},index:null}}function f(N,F,W,I){const G=r.attributes,K=F.attributes;let k=0;const nt=W.getAttributes();for(const V in nt)if(nt[V].location>=0){const j=G[V];let bt=K[V];if(bt===void 0&&(V==="instanceMatrix"&&N.instanceMatrix&&(bt=N.instanceMatrix),V==="instanceColor"&&N.instanceColor&&(bt=N.instanceColor)),j===void 0||j.attribute!==bt||bt&&j.data!==bt.data)return!0;k++}return r.attributesNum!==k||r.index!==I}function _(N,F,W,I){const G={},K=F.attributes;let k=0;const nt=W.getAttributes();for(const V in nt)if(nt[V].location>=0){let j=K[V];j===void 0&&(V==="instanceMatrix"&&N.instanceMatrix&&(j=N.instanceMatrix),V==="instanceColor"&&N.instanceColor&&(j=N.instanceColor));const bt={};bt.attribute=j,j&&j.data&&(bt.data=j.data),G[V]=bt,k++}r.attributes=G,r.attributesNum=k,r.index=I}function x(){const N=r.newAttributes;for(let F=0,W=N.length;F<W;F++)N[F]=0}function m(N){p(N,0)}function p(N,F){const W=r.newAttributes,I=r.enabledAttributes,G=r.attributeDivisors;W[N]=1,I[N]===0&&(i.enableVertexAttribArray(N),I[N]=1),G[N]!==F&&(i.vertexAttribDivisor(N,F),G[N]=F)}function M(){const N=r.newAttributes,F=r.enabledAttributes;for(let W=0,I=F.length;W<I;W++)F[W]!==N[W]&&(i.disableVertexAttribArray(W),F[W]=0)}function E(N,F,W,I,G,K,k){k===!0?i.vertexAttribIPointer(N,F,W,G,K):i.vertexAttribPointer(N,F,W,I,G,K)}function b(N,F,W,I){x();const G=I.attributes,K=W.getAttributes(),k=F.defaultAttributeValues;for(const nt in K){const V=K[nt];if(V.location>=0){let Q=G[nt];if(Q===void 0&&(nt==="instanceMatrix"&&N.instanceMatrix&&(Q=N.instanceMatrix),nt==="instanceColor"&&N.instanceColor&&(Q=N.instanceColor)),Q!==void 0){const j=Q.normalized,bt=Q.itemSize,zt=t.get(Q);if(zt===void 0)continue;const Z=zt.buffer,_t=zt.type,St=zt.bytesPerElement,It=_t===i.INT||_t===i.UNSIGNED_INT||Q.gpuType===ml;if(Q.isInterleavedBufferAttribute){const dt=Q.data,Vt=dt.isInterleavedBuffer===!0?dt.stride:dt.itemSize,Ie=Q.offset;if(dt.isInstancedInterleavedBuffer||dt.isInstancedBufferAttribute){for(let Nt=0;Nt<V.locationSize;Nt++)p(V.location+Nt,dt.meshPerAttribute);N.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=dt.meshPerAttribute*dt.count)}else for(let Nt=0;Nt<V.locationSize;Nt++)m(V.location+Nt);i.bindBuffer(i.ARRAY_BUFFER,Z);for(let Nt=0;Nt<V.locationSize;Nt++)E(V.location+Nt,bt/V.locationSize,_t,j,Vt*St,(Ie+bt/V.locationSize*Nt)*St,It)}else{if(Q.isInstancedBufferAttribute){for(let dt=0;dt<V.locationSize;dt++)p(V.location+dt,Q.meshPerAttribute);N.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let dt=0;dt<V.locationSize;dt++)m(V.location+dt);i.bindBuffer(i.ARRAY_BUFFER,Z);for(let dt=0;dt<V.locationSize;dt++)E(V.location+dt,bt/V.locationSize,_t,j,bt*St,bt/V.locationSize*dt*St,It)}}else if(k!==void 0){const j=k[nt];if(j!==void 0)switch(j.length){case 2:i.vertexAttrib2fv(V.location,j);break;case 3:i.vertexAttrib3fv(V.location,j);break;case 4:i.vertexAttrib4fv(V.location,j);break;default:i.vertexAttrib1fv(V.location,j)}}}}M()}function A(){L();for(const N in n){const F=n[N];for(const W in F){const I=F[W];for(const G in I){const K=I[G];for(const k in K)h(K[k].object),delete K[k];delete I[G]}}delete n[N]}}function w(N){if(n[N.id]===void 0)return;const F=n[N.id];for(const W in F){const I=F[W];for(const G in I){const K=I[G];for(const k in K)h(K[k].object),delete K[k];delete I[G]}}delete n[N.id]}function g(N){for(const F in n){const W=n[F];for(const I in W){const G=W[I];if(G[N.id]===void 0)continue;const K=G[N.id];for(const k in K)h(K[k].object),delete K[k];delete G[N.id]}}}function y(N){for(const F in n){const W=n[F],I=N.isInstancedMesh===!0?N.id:0,G=W[I];if(G!==void 0){for(const K in G){const k=G[K];for(const nt in k)h(k[nt].object),delete k[nt];delete G[K]}delete W[I],Object.keys(W).length===0&&delete n[F]}}}function L(){P(),a=!0,r!==s&&(r=s,c(r.object))}function P(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:l,reset:L,resetDefaultState:P,dispose:A,releaseStatesOfGeometry:w,releaseStatesOfObject:y,releaseStatesOfProgram:g,initAttributes:x,enableAttribute:m,disableUnusedAttributes:M}}function zm(i,t,e){let n;function s(o){n=o}function r(o,c){i.drawArrays(n,o,c),e.update(c,n,1)}function a(o,c,h){h!==0&&(i.drawArraysInstanced(n,o,c,h),e.update(c,n,h))}function l(o,c,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,o,0,c,0,h);let u=0;for(let f=0;f<h;f++)u+=c[f];e.update(u,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=l}function km(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const g=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(g.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(g){return!(g!==Jn&&n.convert(g)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function l(g){const y=g===An&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(g!==Dn&&g!==Vn&&!y&&n.convert(g)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function o(g){if(g==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";g="mediump"}return g==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=o(c);h!==c&&(Gt("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const d=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),u=e.logarithmicDepthBuffer===!0&&d===!1;e.reversedDepthBuffer===!0&&d===!1&&Gt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),e.logarithmicDepthBuffer===!0&&d===!0&&Gt("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");const f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),E=i.getParameter(i.MAX_VARYING_VECTORS),b=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),A=i.getParameter(i.MAX_SAMPLES),w=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:o,textureFormatReadable:a,textureTypeReadable:l,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:_,maxTextureSize:x,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:M,maxVaryings:E,maxFragmentUniforms:b,maxSamples:A,samples:w}}function Gm(i){const t=this;let e=null,n=0,s=!1,r=!1;const a=new xi,l=new Xt,o={value:null,needsUpdate:!1};this.uniform=o,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const f=d.length!==0||u||n!==0||s;return s=u,n=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,f){const _=d.clippingPlanes,x=d.clipIntersection,m=d.clipShadows,p=i.get(d);if(!s||_===null||_.length===0||r&&!m)r?h(null):c();else{const M=r?0:n,E=M*4;let b=p.clippingState||null;o.value=b,b=h(_,u,E,f);for(let A=0;A!==E;++A)b[A]=e[A];p.clippingState=b,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=M}};function c(){o.value!==e&&(o.value=e,o.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,u,f,_){const x=d!==null?d.length:0;let m=null;if(x!==0){if(m=o.value,_!==!0||m===null){const p=f+x*4,M=u.matrixWorldInverse;l.getNormalMatrix(M),(m===null||m.length<p)&&(m=new Float32Array(p));for(let E=0,b=f;E!==x;++E,b+=4)a.copy(d[E]).applyMatrix4(M,l),a.normal.toArray(m,b),m[b+3]=a.constant}o.value=m,o.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,m}}class Nl extends Rn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new kh(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new ae(5,5,5),r=new vn({name:"CubemapFromEquirect",uniforms:Es(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Mn,blending:Bi});r.uniforms.tEquirect.value=e;const a=new et(s,r),l=e.minFilter;return e.minFilter===Mi&&(e.minFilter=En),new Jo(1,10,this).update(t,a),e.minFilter=l,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}}const Ic=256,Hm=3,Vm=20,$h=256,Zh=16,Wm=3,Xm=new C,qm=new Dt;class ga{constructor(t){this._renderer=t,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new Jo(1,10,null),this._boxMesh=new et(new ae(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){const{size:a=256,position:l=Xm}=r,o=this._renderer;this._setSize(a);const c=this._allocateTarget(),h=this._getSourceTarget(!0);e>0&&(h.texture.mipmapsAutoUpdate=!1);const d=o.autoClear,u=o.autoClearColor,f=o.autoClearDepth,_=o.autoClearStencil,x=t.background;o.autoClear=!0,o.autoClearColor=!0,o.autoClearDepth=!0,o.autoClearStencil=!0,x===null&&(t.background=o.getClearColor(qm));const m=new Jo(n,s,h);return m.position.copy(l),m.update(o,t),o.autoClear=d,o.autoClearColor=u,o.autoClearDepth=f,o.autoClearStencil=_,t.background=x,e>0&&(h.texture.mipmapsAutoUpdate=!0,this._blur(c,e)),this._applyPMREM(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Fc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Uc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(t,e){return e>0?1-Math.sqrt(1-t/e):0}_setSize(t){this._cubeSize=Math.max(Ic,Lh(t))}_fromTexture(t,e){t.mapping===Ms||t.mapping===tr?this._setSize(t.image.length===0?Ic:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4);const n=e||this._allocateTarget();return this._textureToCubemap(t),this._applyPMREM(n),n}_allocateTarget(){const t=this._cubeSize,e=Nc(t,!1,!1),n=Math.log2(t)-Hm;for(let s=0;s<=n;s++)e.texture.mipmaps.push({width:t>>s,height:t>>s});return e.texture.name="PMREM",e.texture.isPMREMTexture=!0,e}_getSourceTarget(t=!1){const e=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==e||t&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=Nc(e,!0,t)),this._sourceTarget}_compileMaterial(t){this._boxMesh.material=t,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(t,e,n){const s=this._boxMesh,r=this._cubeCamera;s.material=n,r.renderTarget=t,r.activeMipmapLevel=e;const a=t.width>>e;t.viewport.set(0,0,a,a),r.update(this._renderer,s),t.viewport.set(0,0,t.width,t.height)}_textureToCubemap(t){let e;t.mapping===Ms||t.mapping===tr?(this._cubemapMaterial===null&&(this._cubemapMaterial=Fc()),e=this._cubemapMaterial,e.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=Uc()),e=this._equirectMaterial),e.uniforms.envMap.value=t,this._renderCube(this._getSourceTarget(),0,e)}_applyPMREM(t){this._ggxMaterial===null&&(this._ggxMaterial=Ym(),this._integrationMaterial=Km());const e=this._cubeSize,n=t.texture.mipmaps.length-1,s=this._ggxMaterial.uniforms;s.envMap.value=this._sourceTarget.texture;const r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(e/Zh);for(let a=0;a<=n;a++){const l=ga.lodToRoughness(a,n);if(a>n-Wm)r.roughness.value=l,this._renderCube(t,a,this._integrationMaterial);else{const o=l>0?Math.log2(e)+.5*Math.log2(6/($h*Math.pow(l,4)))+.5:0;s.roughness.value=l,s.lodBias.value=o,this._renderCube(t,a,this._ggxMaterial)}}}_blur(t,e){this._blurMaterial===null&&(this._blurMaterial=$m());const n=this._blurMaterial,s=n.uniforms,r=this._sourceTarget;s.sigma.value=Math.min(e,Math.PI)/Math.SQRT2,s.envMap.value=r.texture,this._renderCube(t,0,n),s.envMap.value=t.texture,this._renderCube(r,0,n)}}function Nc(i,t,e){return new Nl(i,{minFilter:Mi,generateMipmaps:t,type:An,colorSpace:la,depthBuffer:e})}function hr(i,t,e){return new vn({name:i,uniforms:t,vertexShader:jt.cube_vert,fragmentShader:e,side:Mn,blending:Bi,depthTest:!1,depthWrite:!1})}function Ym(){return hr("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${$h}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function Km(){return hr("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:Zh}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function $m(){return hr("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${Vm}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function Uc(){return hr("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function Fc(){return hr("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function Zm(i){let t=new WeakMap,e=new WeakMap,n=null;function s(u,f=!1){return u==null?null:f?a(u):r(u)}function r(u){if(u&&u.isTexture){const f=u.mapping;if(f===Ra||f===Ca)if(t.has(u)){const _=t.get(u).texture;return l(_,u.mapping)}else{const _=u.image;if(_&&_.height>0){const x=new Nl(_.height);return x.fromEquirectangularTexture(i,u),t.set(u,x),u.addEventListener("dispose",c),l(x.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture&&u.isPMREMTexture!==!0){const f=u.mapping,_=f===Ra||f===Ca,x=f===Ms||f===tr;if(_||x){let m=e.get(u);const p=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==p)return n===null&&(n=new ga(i)),m=_?n.fromEquirectangular(u,m):n.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,e.set(u,m),m.texture;if(m!==void 0)return m.texture;{const M=u.image;return _&&M&&M.height>0||x&&M&&o(M)?(n===null&&(n=new ga(i)),m=_?n.fromEquirectangular(u):n.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,e.set(u,m),u.addEventListener("dispose",h),m.texture):null}}}return u}function l(u,f){return f===Ra?u.mapping=Ms:f===Ca&&(u.mapping=tr),u}function o(u){let f=0;const _=6;for(let x=0;x<_;x++)u[x]!==void 0&&f++;return f===_}function c(u){const f=u.target;f.removeEventListener("dispose",c);const _=t.get(f);_!==void 0&&(t.delete(f),_.dispose())}function h(u){const f=u.target;f.removeEventListener("dispose",h);const _=e.get(f);_!==void 0&&(e.delete(f),_.dispose())}function d(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:d}}function Jm(i){const t={};function e(n){if(t[n]!==void 0)return t[n];const s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&ms("WebGLRenderer: "+n+" extension not supported."),s}}}function Qm(i,t,e,n){const s={},r=new WeakMap,a=new FinalizationRegistry(_=>delete s[_]);function l(_){o(_.target)}function o(_){_.index!==null&&t.remove(_.index);for(const m in _.attributes)t.remove(_.attributes[m]);_.removeEventListener("dispose",l),delete s[_.id],a.unregister(_);const x=r.get(_);x&&(t.remove(x),r.delete(_)),n.releaseStatesOfGeometry(_),_.isInstancedBufferGeometry===!0&&delete _._maxInstanceCount,e.memory.geometries--}function c(_,x){return s[x.id]!==void 0||(x.addEventListener("dispose",l),s[x.id]=new WeakRef(x),a.register(x,x.id,x),e.memory.geometries++),x}function h(_){const x=_.attributes;for(const m in x)t.update(x[m],i.ARRAY_BUFFER)}function d(_){const x=_.index,m=_.attributes.position;let p=0;if(m===void 0)return;const M=x!==null?x.array.length:m.array.length/3-1,E=m.count>=65535?Uh:Nh,b=new E(Math.ceil(M/3)*6,1),A=b.array;if(x!==null){const g=x.array;p=x.version;for(let y=0,L=0;y<M;y+=3){const P=g[y+0],N=g[y+1],F=g[y+2];A[L++]=P,A[L++]=N,A[L++]=N,A[L++]=F,A[L++]=F,A[L++]=P}}else{p=m.version;for(let g=0,y=0;g<M;g+=3){const L=g+0,P=g+1,N=g+2;A[y++]=L,A[y++]=P,A[y++]=P,A[y++]=N,A[y++]=N,A[y++]=L}}b.version=p;const w=r.get(_);w&&t.remove(w),r.set(_,b)}function u(_){const x=r.get(_);if(x){const m=_.index;m!==null&&x.version<m.version&&d(_)}else d(_);return r.get(_)}function f(){for(const _ in s){const x=s[_].deref();x!==void 0&&o(x)}}return{get:c,update:h,getWireframeAttribute:u,dispose:f}}function jm(i,t,e){let n;function s(d){n=d}let r,a;function l(d){r=d.type,a=d.bytesPerElement}function o(d,u){i.drawElements(n,u,r,d*a),e.update(u,n,1)}function c(d,u,f){f!==0&&(i.drawElementsInstanced(n,u,r,d*a,f),e.update(u,n,f))}function h(d,u,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,d,0,f);let x=0;for(let m=0;m<f;m++)x+=u[m];e.update(x,n,1)}this.setMode=s,this.setIndex=l,this.render=o,this.renderInstances=c,this.renderMultiDraw=h}function t0(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,l){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=l*(r/3);break;case i.LINES:e.lines+=l*(r/2);break;case i.LINE_STRIP:e.lines+=l*(r-1);break;case i.LINE_LOOP:e.lines+=l*r;break;case i.POINTS:e.points+=l*r;break;default:de("WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function e0(i,t,e){const n=new WeakMap,s=new De;function r(a,l,o){const c=a.morphTargetInfluences,h=l.morphAttributes.position||l.morphAttributes.normal||l.morphAttributes.color,d=h!==void 0?h.length:0;let u=n.get(l);if(u===void 0||u.count!==d){let P=function(){y.dispose(),n.delete(l),l.removeEventListener("dispose",P)};var f=P;u!==void 0&&u.texture.dispose();const _=l.morphAttributes.position!==void 0,x=l.morphAttributes.normal!==void 0,m=l.morphAttributes.color!==void 0,p=l.morphAttributes.position||[],M=l.morphAttributes.normal||[],E=l.morphAttributes.color||[];let b=0;_===!0&&(b=1),x===!0&&(b=2),m===!0&&(b=3);let A=l.attributes.position.count*b,w=1;A>t.maxTextureSize&&(w=Math.ceil(A/t.maxTextureSize),A=t.maxTextureSize);const g=new Float32Array(A*w*4*d),y=new Dh(g,A,w,d);y.type=Vn,y.needsUpdate=!0;const L=b*4;for(let N=0;N<d;N++){const F=p[N],W=M[N],I=E[N],G=A*w*4*N;for(let K=0;K<F.count;K++){const k=K*L;_===!0&&(s.fromBufferAttribute(F,K),g[G+k+0]=s.x,g[G+k+1]=s.y,g[G+k+2]=s.z,g[G+k+3]=0),x===!0&&(s.fromBufferAttribute(W,K),g[G+k+4]=s.x,g[G+k+5]=s.y,g[G+k+6]=s.z,g[G+k+7]=0),m===!0&&(s.fromBufferAttribute(I,K),g[G+k+8]=s.x,g[G+k+9]=s.y,g[G+k+10]=s.z,g[G+k+11]=I.itemSize===4?s.w:1)}}u={count:d,texture:y,size:new Ct(A,w)},n.set(l,u),l.addEventListener("dispose",P)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)o.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let _=0;for(let m=0;m<c.length;m++)_+=c[m];const x=l.morphTargetsRelative?1:1-_;o.getUniforms().setValue(i,"morphTargetBaseInfluence",x),o.getUniforms().setValue(i,"morphTargetInfluences",c)}o.getUniforms().setValue(i,"morphTargetsTexture",u.texture,e),o.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function n0(i,t,e,n,s){let r=new WeakMap;function a(c){const h=s.render.frame,d=c.geometry,u=t.get(c,d);if(r.get(u)!==h&&(t.update(u),r.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),r.get(c)!==h&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){const f=c.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return u}function l(){r=new WeakMap}function o(c){const h=c.target;h.removeEventListener("dispose",o),n.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:a,dispose:l}}const i0={[cl]:"LINEAR_TONE_MAPPING",[hl]:"REINHARD_TONE_MAPPING",[ul]:"CINEON_TONE_MAPPING",[Sa]:"ACES_FILMIC_TONE_MAPPING",[fl]:"AGX_TONE_MAPPING",[pl]:"NEUTRAL_TONE_MAPPING",[dl]:"CUSTOM_TONE_MAPPING"};function s0(i,t,e,n,s,r){const a=new Rn(t,e,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let l=null,o=null,c=null;const h=new Ae;h.setAttribute("position",new ce([-1,3,0,-1,-1,0,3,-1,0],3)),h.setAttribute("uv",new ce([0,2,0,0,2,0],2));const d=new Wh({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),u=new et(h,d),f=new Il(-1,1,1,-1,0,1);let _=null,x=null,m=!1,p,M=null,E=[],b=!1;this.setSize=function(A,w){a.setSize(A,w),l!==null&&l.setSize(A,w),o!==null&&o.setSize(A,w);for(let g=0;g<E.length;g++){const y=E[g];y.setSize&&y.setSize(A,w)}},this.setEffects=function(A){E=A,b=E.length>0&&E[0].isRenderPass===!0;const w=a.width,g=a.height;E.length>0&&l===null&&(l=new Rn(w,g,{type:An,depthBuffer:!1,stencilBuffer:!1}),o=new Rn(w,g,{type:An,depthBuffer:!1,stencilBuffer:!1}));const y=s===!0&&E.some(L=>L.needsDepthTexture===!0);y!==(a.depthTexture!==null)&&(y===!0&&c===null&&(c=new bs(w,g),r===!0&&(c.format=Si,c.type=Ss)),a.dispose(),a.depthTexture=y?c:null,a.resolveDepthBuffer=y,a.storeMultisampledDepthBuffer=y);for(let L=0;L<E.length;L++){const P=E[L];P.setSize&&P.setSize(w,g),y&&P.needsDepthTexture===!0&&P.setDepthTexture&&P.setDepthTexture(c)}},this.begin=function(A,w){if(m||A.toneMapping===ci&&E.length===0)return!1;if(M=w,w!==null){const g=w.width,y=w.height;(a.width!==g||a.height!==y)&&this.setSize(g,y)}return b===!1&&A.setRenderTarget(a),p=A.toneMapping,A.toneMapping=ci,!0},this.hasRenderPass=function(){return b},this.end=function(A,w){A.toneMapping=p,m=!0;let g=a,y=l;for(let L=0;L<E.length;L++){const P=E[L];P.enabled!==!1&&(P.render(A,y,g,w),P.needsSwap!==!1&&(g=y,y=y===l?o:l))}if(_!==A.outputColorSpace||x!==A.toneMapping){_=A.outputColorSpace,x=A.toneMapping,d.defines={},re.getTransfer(_)===Me&&(d.defines.SRGB_TRANSFER="");const L=i0[x];L&&(d.defines[L]=""),d.needsUpdate=!0}d.uniforms.tDiffuse.value=g.texture,A.setRenderTarget(M),A.render(u,f),M=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){a.dispose(),l!==null&&l.dispose(),o!==null&&o.dispose(),h.dispose(),d.dispose()}}const Jh=new hn,Qh=new bs(1,1),jh=new Gh(1),tu=new Dh,eu=new yd,nu=new kh,Oc=[],Bc=[],zc=new Float32Array(16),kc=new Float32Array(9),Gc=new Float32Array(4);function Rs(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=Oc[s];if(r===void 0&&(r=new Float32Array(s),Oc[s]=r),t!==0){n.toArray(r,0);for(let a=1,l=0;a!==t;++a)l+=e,i[a].toArray(r,l)}return r}function Ve(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function We(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Ea(i,t){let e=Bc[t];e===void 0&&(e=new Int32Array(t),Bc[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function r0(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function a0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ve(e,t))return;i.uniform2fv(this.addr,t),We(e,t)}}function o0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ve(e,t))return;i.uniform3fv(this.addr,t),We(e,t)}}function l0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ve(e,t))return;i.uniform4fv(this.addr,t),We(e,t)}}function c0(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ve(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),We(e,t)}else{if(Ve(e,n))return;Gc.set(n),i.uniformMatrix2fv(this.addr,!1,Gc),We(e,n)}}function h0(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ve(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),We(e,t)}else{if(Ve(e,n))return;kc.set(n),i.uniformMatrix3fv(this.addr,!1,kc),We(e,n)}}function u0(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ve(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),We(e,t)}else{if(Ve(e,n))return;zc.set(n),i.uniformMatrix4fv(this.addr,!1,zc),We(e,n)}}function d0(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function f0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ve(e,t))return;i.uniform2iv(this.addr,t),We(e,t)}}function p0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ve(e,t))return;i.uniform3iv(this.addr,t),We(e,t)}}function m0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ve(e,t))return;i.uniform4iv(this.addr,t),We(e,t)}}function g0(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function _0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ve(e,t))return;i.uniform2uiv(this.addr,t),We(e,t)}}function x0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ve(e,t))return;i.uniform3uiv(this.addr,t),We(e,t)}}function v0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ve(e,t))return;i.uniform4uiv(this.addr,t),We(e,t)}}function Ta(i){return i.version===0&&(i.compareFunction=Ah,i.needsUpdate=!0),i}function M0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?r=Ta(Qh):r=Jh,e.setTexture2D(t||r,s)}function S0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||eu,s)}function y0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_CUBE_SHADOW?r=Ta(jh):r=nu,e.setTextureCube(t||r,s)}function b0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||tu,s)}function w0(i){switch(i){case 5126:return r0;case 35664:return a0;case 35665:return o0;case 35666:return l0;case 35674:return c0;case 35675:return h0;case 35676:return u0;case 5124:case 35670:return d0;case 35667:case 35671:return f0;case 35668:case 35672:return p0;case 35669:case 35673:return m0;case 5125:return g0;case 36294:return _0;case 36295:return x0;case 36296:return v0;case 35678:case 36198:case 36298:case 36306:case 35682:return M0;case 35679:case 36299:case 36307:return S0;case 35680:case 36300:case 36308:case 36293:return y0;case 36289:case 36303:case 36311:case 36292:return b0}}function E0(i,t){i.uniform1fv(this.addr,t)}function T0(i,t){const e=Rs(t,this.size,2);i.uniform2fv(this.addr,e)}function A0(i,t){const e=Rs(t,this.size,3);i.uniform3fv(this.addr,e)}function R0(i,t){const e=Rs(t,this.size,4);i.uniform4fv(this.addr,e)}function C0(i,t){const e=Rs(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function P0(i,t){const e=Rs(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function L0(i,t){const e=Rs(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function D0(i,t){i.uniform1iv(this.addr,t)}function I0(i,t){i.uniform2iv(this.addr,t)}function N0(i,t){i.uniform3iv(this.addr,t)}function U0(i,t){i.uniform4iv(this.addr,t)}function F0(i,t){i.uniform1uiv(this.addr,t)}function O0(i,t){i.uniform2uiv(this.addr,t)}function B0(i,t){i.uniform3uiv(this.addr,t)}function z0(i,t){i.uniform4uiv(this.addr,t)}function k0(i,t,e){const n=this.cache,s=t.length,r=Ea(e,s);Ve(n,r)||(i.uniform1iv(this.addr,r),We(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=Ta(Qh):a=Jh;for(let l=0;l!==s;++l)e.setTexture2D(t[l]||a,r[l])}function G0(i,t,e){const n=this.cache,s=t.length,r=Ea(e,s);Ve(n,r)||(i.uniform1iv(this.addr,r),We(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||eu,r[a])}function H0(i,t,e){const n=this.cache,s=t.length,r=Ea(e,s);Ve(n,r)||(i.uniform1iv(this.addr,r),We(n,r));let a;this.type===i.SAMPLER_CUBE_SHADOW?a=Ta(jh):a=nu;for(let l=0;l!==s;++l)e.setTextureCube(t[l]||a,r[l])}function V0(i,t,e){const n=this.cache,s=t.length,r=Ea(e,s);Ve(n,r)||(i.uniform1iv(this.addr,r),We(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||tu,r[a])}function W0(i){switch(i){case 5126:return E0;case 35664:return T0;case 35665:return A0;case 35666:return R0;case 35674:return C0;case 35675:return P0;case 35676:return L0;case 5124:case 35670:return D0;case 35667:case 35671:return I0;case 35668:case 35672:return N0;case 35669:case 35673:return U0;case 5125:return F0;case 36294:return O0;case 36295:return B0;case 36296:return z0;case 35678:case 36198:case 36298:case 36306:case 35682:return k0;case 35679:case 36299:case 36307:return G0;case 35680:case 36300:case 36308:case 36293:return H0;case 36289:case 36303:case 36311:case 36292:return V0}}class X0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=w0(e.type)}}class q0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=W0(e.type)}}class Y0{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const l=s[r];l.setValue(t,e[l.id],n)}}}const io=/(\w+)(\])?(\[|\.)?/g;function Hc(i,t){i.seq.push(t),i.map[t.id]=t}function K0(i,t,e){const n=i.name,s=n.length;for(io.lastIndex=0;;){const r=io.exec(n),a=io.lastIndex;let l=r[1];const o=r[2]==="]",c=r[3];if(o&&(l=l|0),c===void 0||c==="["&&a+2===s){Hc(e,c===void 0?new X0(l,i,t):new q0(l,i,t));break}else{let d=e.map[l];d===void 0&&(d=new Y0(l),Hc(e,d)),e=d}}}class ea{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const l=t.getActiveUniform(e,a),o=t.getUniformLocation(e,l.name);K0(l,o,this)}const s=[],r=[];for(const a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){const l=e[r],o=n[l.id];o.needsUpdate!==!1&&l.setValue(t,o.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in e&&n.push(a)}return n}}function Vc(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const $0=37297;let Z0=0;function J0(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){const l=a+1;n.push(`${l===t?">":" "} ${l}: ${e[a]}`)}return n.join(`
`)}const Wc=new Xt;function Q0(i){re._getMatrix(Wc,re.workingColorSpace,i);const t=`mat3( ${Wc.elements.map(e=>e.toFixed(4))} )`;switch(re.getTransfer(i)){case ca:return[t,"LinearTransferOETF"];case Me:return[t,"sRGBTransferOETF"];default:return Gt("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Xc(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const l=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+J0(i.getShaderSource(t),l)}else return r}function j0(i,t){const e=Q0(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( ${e[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}const tg={[cl]:"Linear",[hl]:"Reinhard",[ul]:"Cineon",[Sa]:"ACESFilmic",[fl]:"AgX",[pl]:"Neutral",[dl]:"Custom"};function eg(i,t){const e=tg[t];return e===void 0?(Gt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Wr=new C;function ng(){re.getLuminanceCoefficients(Wr);const i=Wr.x.toFixed(4),t=Wr.y.toFixed(4),e=Wr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function ig(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Xs).join(`
`)}function sg(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function rg(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),a=r.name;let l=1;r.type===i.FLOAT_MAT2&&(l=2),r.type===i.FLOAT_MAT3&&(l=3),r.type===i.FLOAT_MAT4&&(l=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:l}}return e}function Xs(i){return i!==""}function qc(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,t.numLightProbeGrids)}function Yc(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const ag=/^[ \t]*#include +<([\w\d./]+)>/gm;function jo(i){return i.replace(ag,og)}function og(i,t){const e=jt[t];if(e===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">");return jo(e)}const lg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Kc(i){return i.replace(lg,cg)}function cg(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function $c(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}const hg={[Zr]:"SHADOWMAP_TYPE_PCF",[Ws]:"SHADOWMAP_TYPE_VSM"};function ug(i){return hg[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const dg={[tr]:"ENVMAP_MODE_REFRACTION"};function fg(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":dg[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const pg={[_h]:"ENVMAP_BLENDING_MULTIPLY",[Gu]:"ENVMAP_BLENDING_MIX",[Hu]:"ENVMAP_BLENDING_ADD"};function mg(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":pg[i.combine]||"ENVMAP_BLENDING_NONE"}function gg(i,t,e,n){const s=i.getContext(),r=e.defines;let a=e.vertexShader,l=e.fragmentShader;const o=ug(e),c=e.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",h=fg(e),d=mg(e),u=ig(e),f=sg(r),_=s.createProgram();let x,m,p=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(x=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f].filter(Xs).join(`
`),x.length>0&&(x+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f].filter(Xs).join(`
`),m.length>0&&(m+=`
`)):(x=[$c(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+e.diffuseRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+o:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Xs).join(`
`),m=[$c(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",e.envMapPMREM?"#define ENVMAP_MAX_LOD "+e.envMapMaxLod+".0":"",e.envMapPMREM?"#define ENVMAP_SIZE "+e.envMapSize+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+o:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==ci?"#define TONE_MAPPING":"",e.toneMapping!==ci?jt.tonemapping_pars_fragment:"",e.toneMapping!==ci?eg("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",jt.colorspace_pars_fragment,j0("linearToOutputTexel",e.outputColorSpace),ng(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Xs).join(`
`)),a=jo(a),a=qc(a,e),a=Yc(a,e),l=jo(l),l=qc(l,e),l=Yc(l,e),a=Kc(a),l=Kc(l),e.isRawShaderMaterial!==!0&&(p=`#version 300 es
`,x=[u,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+x,m=["#define varying in",e.glslVersion===Zl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Zl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const M=p+x+a,E=p+m+l,b=Vc(s,s.VERTEX_SHADER,M),A=Vc(s,s.FRAGMENT_SHADER,E);s.attachShader(_,b),s.attachShader(_,A),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function w(P){if(i.debug.checkShaderErrors){const N=s.getProgramInfoLog(_)||"",F=s.getShaderInfoLog(b)||"",W=s.getShaderInfoLog(A)||"",I=N.trim(),G=F.trim(),K=W.trim();let k=!0,nt=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(k=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,b,A);else{const V=Xc(s,b,"vertex"),Q=Xc(s,A,"fragment");de("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+I+`
`+V+`
`+Q)}else I!==""?Gt("WebGLProgram: Program Info Log:",I):(G===""||K==="")&&(nt=!1);nt&&(P.diagnostics={runnable:k,programLog:I,vertexShader:{log:G,prefix:x},fragmentShader:{log:K,prefix:m}})}s.deleteShader(b),s.deleteShader(A),g=new ea(s,_),y=rg(s,_)}let g;this.getUniforms=function(){return g===void 0&&w(this),g};let y;this.getAttributes=function(){return y===void 0&&w(this),y};let L=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return L===!1&&(L=s.getProgramParameter(_,$0)),L},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Z0++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=b,this.fragmentShader=A,this}let _g=0;class xg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){const s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new vg(t),e.set(t,n)),n}}class vg{constructor(t){this.id=_g++,this.code=t,this.usedTimes=0}}function Mg(i){return i===ki||i===aa||i===oa}function Sg(i,t,e,n,s,r){const a=new Tl,l=new xg,o=new Set,c=[],h=new Map,d=n.logarithmicDepthBuffer,u={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function f(g){return o.add(g),g===0?"uv":`uv${g}`}function _(g,y,L,P,N,F){const W=P.fog,I=N.geometry,G=g.isMeshStandardMaterial||g.isMeshLambertMaterial||g.isMeshPhongMaterial?P.environment:null,K=g.isMeshStandardMaterial||g.isMeshLambertMaterial&&!g.envMap||g.isMeshPhongMaterial&&!g.envMap,k=t.get(g.envMap||G,K),nt=u[g.type];let V=n.precision;g.precision!==null&&(V=n.getMaxPrecision(g.precision),V!==g.precision&&Gt("WebGLProgram.getParameters:",g.precision,"not supported, using",V,"instead."));const Q=I.morphAttributes.position||I.morphAttributes.normal||I.morphAttributes.color,j=Q!==void 0?Q.length:0;let bt=0;I.morphAttributes.position!==void 0&&(bt=1),I.morphAttributes.normal!==void 0&&(bt=2),I.morphAttributes.color!==void 0&&(bt=3);let zt,Z,_t,St;if(nt){const gt=$n[nt];zt=gt.vertexShader,Z=gt.fragmentShader}else{zt=g.vertexShader,Z=g.fragmentShader;const gt=l.getVertexShaderStage(g),ge=l.getFragmentShaderStage(g);l.update(g,gt,ge),_t=gt.id,St=ge.id}const It=i.getRenderTarget(),dt=i.state.buffers.depth.getReversed(),Vt=N.isInstancedMesh===!0,Ie=N.isBatchedMesh===!0,Nt=!!g.map,he=!!g.matcap,xe=!!k,Jt=xe&&k.isPMREMTexture===!0,Re=!!g.aoMap,Ne=!!g.lightMap,Xe=!!g.bumpMap&&g.wireframe===!1,be=!!g.normalMap,fn=!!g.displacementMap,Fe=!!g.emissiveMap,yn=!!g.metalnessMap,pn=!!g.roughnessMap,Je=g.anisotropy>0,U=g.clearcoat>0,bn=g.diffuseRoughness>0,ve=g.dispersion>0,Ee=g.retroreflectivity>0,mt=g.iridescence>0,Ue=g.sheen>0,Pt=g.transmission>0,Ft=Je&&!!g.anisotropyMap,T=U&&!!g.clearcoatMap,v=U&&!!g.clearcoatNormalMap,O=U&&!!g.clearcoatRoughnessMap,tt=bn&&!!g.diffuseRoughnessMap,J=mt&&!!g.iridescenceMap,at=mt&&!!g.iridescenceThicknessMap,ht=Ue&&!!g.sheenColorMap,q=Ue&&!!g.sheenRoughnessMap,Y=!!g.specularMap,lt=!!g.specularColorMap,R=!!g.specularIntensityMap,$=Pt&&!!g.transmissionMap,X=Pt&&!!g.thicknessMap,ut=!!g.gradientMap,rt=!!g.alphaMap,ot=g.alphaTest>0,At=!!g.alphaHash,Kt=!!g.extensions;let st=ci;g.toneMapped&&(It===null||It.isXRRenderTarget===!0)&&(st=i.toneMapping);const Lt=Jt?k.isCompressedCubeTexture?k.image[0].mipmaps:k.mipmaps:null,Wt={shaderID:nt,shaderType:g.type,shaderName:g.name,vertexShader:zt,fragmentShader:Z,defines:g.defines,customVertexShaderID:_t,customFragmentShaderID:St,isRawShaderMaterial:g.isRawShaderMaterial===!0,glslVersion:g.glslVersion,precision:V,batching:Ie,batchingColor:Ie&&N._colorsTexture!==null,instancing:Vt,instancingColor:Vt&&N.instanceColor!==null,instancingMorph:Vt&&N.morphTexture!==null,outputColorSpace:It===null?i.outputColorSpace:It.isXRRenderTarget===!0?It.texture.colorSpace:re.workingColorSpace,alphaToCoverage:!!g.alphaToCoverage,map:Nt,matcap:he,envMap:xe,envMapMode:xe&&k.mapping,envMapPMREM:Jt,envMapMaxLod:Jt?Lt.length-1:null,envMapSize:Jt?Lt[0].width:null,aoMap:Re,lightMap:Ne,bumpMap:Xe,normalMap:be,displacementMap:fn,emissiveMap:Fe,normalMapObjectSpace:be&&g.normalMapType===Xu,normalMapTangentSpace:be&&g.normalMapType===$o,packedNormalMap:be&&g.normalMapType===$o&&Mg(g.normalMap.format),metalnessMap:yn,roughnessMap:pn,anisotropy:Je,anisotropyMap:Ft,clearcoat:U,clearcoatMap:T,clearcoatNormalMap:v,clearcoatRoughnessMap:O,diffuseRoughness:bn,diffuseRoughnessMap:tt,dispersion:ve,retroreflection:Ee,iridescence:mt,iridescenceMap:J,iridescenceThicknessMap:at,sheen:Ue,sheenColorMap:ht,sheenRoughnessMap:q,specularMap:Y,specularColorMap:lt,specularIntensityMap:R,transmission:Pt,transmissionMap:$,thicknessMap:X,gradientMap:ut,opaque:g.transparent===!1&&g.blending===Ys&&g.alphaToCoverage===!1,alphaMap:rt,alphaTest:ot,alphaHash:At,combine:g.combine,mapUv:Nt&&f(g.map.channel),aoMapUv:Re&&f(g.aoMap.channel),lightMapUv:Ne&&f(g.lightMap.channel),bumpMapUv:Xe&&f(g.bumpMap.channel),normalMapUv:be&&f(g.normalMap.channel),displacementMapUv:fn&&f(g.displacementMap.channel),emissiveMapUv:Fe&&f(g.emissiveMap.channel),metalnessMapUv:yn&&f(g.metalnessMap.channel),roughnessMapUv:pn&&f(g.roughnessMap.channel),anisotropyMapUv:Ft&&f(g.anisotropyMap.channel),clearcoatMapUv:T&&f(g.clearcoatMap.channel),clearcoatNormalMapUv:v&&f(g.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:O&&f(g.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:tt&&f(g.diffuseRoughnessMap.channel),iridescenceMapUv:J&&f(g.iridescenceMap.channel),iridescenceThicknessMapUv:at&&f(g.iridescenceThicknessMap.channel),sheenColorMapUv:ht&&f(g.sheenColorMap.channel),sheenRoughnessMapUv:q&&f(g.sheenRoughnessMap.channel),specularMapUv:Y&&f(g.specularMap.channel),specularColorMapUv:lt&&f(g.specularColorMap.channel),specularIntensityMapUv:R&&f(g.specularIntensityMap.channel),transmissionMapUv:$&&f(g.transmissionMap.channel),thicknessMapUv:X&&f(g.thicknessMap.channel),alphaMapUv:rt&&f(g.alphaMap.channel),vertexTangents:!!I.attributes.tangent&&(be||Je),vertexNormals:!!I.attributes.normal,vertexColors:g.vertexColors,vertexAlphas:g.vertexColors===!0&&!!I.attributes.color&&I.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!I.attributes.uv&&(Nt||rt),fog:!!W,useFog:g.fog===!0,fogExp2:!!W&&W.isFogExp2,flatShading:g.wireframe===!1&&(g.flatShading===!0||I.attributes.normal===void 0&&be===!1&&(g.isMeshLambertMaterial||g.isMeshPhongMaterial||g.isMeshStandardMaterial||g.isMeshPhysicalMaterial)),sizeAttenuation:g.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:dt,skinning:N.isSkinnedMesh===!0,hasPositionAttribute:I.attributes.position!==void 0,morphTargets:I.morphAttributes.position!==void 0,morphNormals:I.morphAttributes.normal!==void 0,morphColors:I.morphAttributes.color!==void 0,morphTargetsCount:j,morphTextureStride:bt,numSunLights:y.sun.length,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numSunLightShadows:y.sunShadowMap.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numLightProbeGrids:F.filter(gt=>gt.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:g.dithering,shadowMapEnabled:i.shadowMap.enabled&&L.length>0,shadowMapType:i.shadowMap.type,toneMapping:st,decodeVideoTexture:Nt&&g.map.isVideoTexture===!0&&re.getTransfer(g.map.colorSpace)===Me,decodeVideoTextureEmissive:Fe&&g.emissiveMap.isVideoTexture===!0&&re.getTransfer(g.emissiveMap.colorSpace)===Me,premultipliedAlpha:g.premultipliedAlpha,doubleSided:g.side===Le,flipSided:g.side===Mn,useDepthPacking:g.depthPacking>=0,depthPacking:g.depthPacking||0,index0AttributeName:g.index0AttributeName,extensionClipCullDistance:Kt&&g.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Kt&&g.extensions.multiDraw===!0||Ie)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:g.customProgramCacheKey()};return Wt.vertexUv1s=o.has(1),Wt.vertexUv2s=o.has(2),Wt.vertexUv3s=o.has(3),o.clear(),Wt}function x(g){const y=[];if(g.shaderID?y.push(g.shaderID):(y.push(g.customVertexShaderID),y.push(g.customFragmentShaderID)),g.defines!==void 0)for(const L in g.defines)y.push(L),y.push(g.defines[L]);return g.isRawShaderMaterial===!1&&(m(y,g),p(y,g),y.push(i.outputColorSpace)),y.push(g.customProgramCacheKey),y.join()}function m(g,y){g.push(y.precision),g.push(y.outputColorSpace),g.push(y.envMapMode),g.push(y.envMapPMREM),g.push(y.envMapMaxLod),g.push(y.envMapSize),g.push(y.mapUv),g.push(y.alphaMapUv),g.push(y.lightMapUv),g.push(y.aoMapUv),g.push(y.bumpMapUv),g.push(y.normalMapUv),g.push(y.displacementMapUv),g.push(y.emissiveMapUv),g.push(y.metalnessMapUv),g.push(y.roughnessMapUv),g.push(y.anisotropyMapUv),g.push(y.clearcoatMapUv),g.push(y.clearcoatNormalMapUv),g.push(y.clearcoatRoughnessMapUv),g.push(y.diffuseRoughnessMapUv),g.push(y.iridescenceMapUv),g.push(y.iridescenceThicknessMapUv),g.push(y.sheenColorMapUv),g.push(y.sheenRoughnessMapUv),g.push(y.specularMapUv),g.push(y.specularColorMapUv),g.push(y.specularIntensityMapUv),g.push(y.transmissionMapUv),g.push(y.thicknessMapUv),g.push(y.combine),g.push(y.fogExp2),g.push(y.sizeAttenuation),g.push(y.morphTargetsCount),g.push(y.numSunLights),g.push(y.numDirLights),g.push(y.numPointLights),g.push(y.numSpotLights),g.push(y.numSpotLightMaps),g.push(y.numHemiLights),g.push(y.numRectAreaLights),g.push(y.numSunLightShadows),g.push(y.numDirLightShadows),g.push(y.numPointLightShadows),g.push(y.numSpotLightShadows),g.push(y.numSpotLightShadowsWithMaps),g.push(y.numLightProbes),g.push(y.numLightProbeGrids),g.push(y.shadowMapType),g.push(y.toneMapping),g.push(y.numClippingPlanes),g.push(y.numClipIntersection),g.push(y.depthPacking)}function p(g,y){a.disableAll(),y.instancing&&a.enable(0),y.instancingColor&&a.enable(1),y.instancingMorph&&a.enable(2),y.matcap&&a.enable(3),y.envMap&&a.enable(4),y.normalMapObjectSpace&&a.enable(5),y.normalMapTangentSpace&&a.enable(6),y.clearcoat&&a.enable(7),y.iridescence&&a.enable(8),y.alphaTest&&a.enable(9),y.vertexColors&&a.enable(10),y.vertexAlphas&&a.enable(11),y.vertexUv1s&&a.enable(12),y.vertexUv2s&&a.enable(13),y.vertexUv3s&&a.enable(14),y.vertexTangents&&a.enable(15),y.anisotropy&&a.enable(16),y.alphaHash&&a.enable(17),y.batching&&a.enable(18),y.dispersion&&a.enable(19),y.retroreflection&&a.enable(24),y.diffuseRoughness&&a.enable(25),y.batchingColor&&a.enable(20),y.gradientMap&&a.enable(21),y.packedNormalMap&&a.enable(22),y.vertexNormals&&a.enable(23),g.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.reversedDepthBuffer&&a.enable(4),y.skinning&&a.enable(5),y.morphTargets&&a.enable(6),y.morphNormals&&a.enable(7),y.morphColors&&a.enable(8),y.premultipliedAlpha&&a.enable(9),y.shadowMapEnabled&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.decodeVideoTextureEmissive&&a.enable(20),y.alphaToCoverage&&a.enable(21),y.numLightProbeGrids>0&&a.enable(22),y.hasPositionAttribute&&a.enable(23),g.push(a.mask)}function M(g){const y=u[g.type];let L;if(y){const P=$n[y];L=ar.clone(P.uniforms)}else L=g.uniforms;return L}function E(g,y){let L=h.get(y);return L!==void 0?++L.usedTimes:(L=new gg(i,y,g,s),c.push(L),h.set(y,L)),L}function b(g){if(--g.usedTimes===0){const y=c.indexOf(g);c[y]=c[c.length-1],c.pop(),h.delete(g.cacheKey),g.destroy()}}function A(g){l.remove(g)}function w(){l.dispose()}return{getParameters:_,getProgramCacheKey:x,getUniforms:M,acquireProgram:E,releaseProgram:b,releaseShaderCache:A,programs:c,dispose:w}}function yg(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let l=i.get(a);return l===void 0&&(l={},i.set(a,l)),l}function n(a){i.delete(a)}function s(a,l,o){i.get(a)[l]=o}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function bg(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function Zc(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Jc(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function l(u,f,_,x,m,p){let M=i[t];return M===void 0?(M={id:u.id,object:u,geometry:f,material:_,materialVariant:a(u),groupOrder:x,renderOrder:u.renderOrder,z:m,group:p},i[t]=M):(M.id=u.id,M.object=u,M.geometry=f,M.material=_,M.materialVariant=a(u),M.groupOrder=x,M.renderOrder=u.renderOrder,M.z=m,M.group=p),t++,M}function o(u,f,_,x,m,p,M){M.reversedDepth===!0&&(m=-m);const E=l(u,f,_,x,m,p);_.transmission>0?n.push(E):_.transparent===!0?s.push(E):e.push(E)}function c(u,f,_,x,m,p){const M=l(u,f,_,x,m,p);_.transmission>0?n.unshift(M):_.transparent===!0?s.unshift(M):e.unshift(M)}function h(u,f){e.length>1&&e.sort(u||bg),n.length>1&&n.sort(f||Zc),s.length>1&&s.sort(f||Zc)}function d(){for(let u=t,f=i.length;u<f;u++){const _=i[u];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:o,unshift:c,finish:d,sort:h}}function wg(){let i=new WeakMap;function t(n,s){const r=i.get(n);let a;return r===void 0?(a=new Jc,i.set(n,[a])):s>=r.length?(a=new Jc,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function Eg(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new C,color:new Dt};break;case"SpotLight":e={position:new C,direction:new C,color:new Dt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new C,color:new Dt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new C,skyColor:new Dt,groundColor:new Dt};break;case"RectAreaLight":e={color:new Dt,position:new C,halfWidth:new C,halfHeight:new C};break}return i[t.id]=e,e}}}function Tg(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ct};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ct};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ct,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let Ag=0;function Rg(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function Cg(i){const t=new Eg,e=Tg(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new C);const s=new C,r=new le,a=new le;function l(c){let h=0,d=0,u=0;for(let F=0;F<9;F++)n.probe[F].set(0,0,0);let f=0,_=0,x=0,m=0,p=0,M=0,E=0,b=0,A=0,w=0,g=0,y=0,L=0,P=0;c.sort(Rg);for(let F=0,W=c.length;F<W;F++){const I=c[F],G=I.color,K=I.intensity,k=I.distance;let nt=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===ki?nt=I.shadow.map.texture:nt=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)h+=G.r*K,d+=G.g*K,u+=G.b*K;else if(I.isLightProbe){for(let V=0;V<9;V++)n.probe[V].addScaledVector(I.sh.coefficients[V],K);P++}else if(I.isSunLight){const V=t.get(I);if(V.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const Q=I.shadow,j=e.get(I);j.shadowIntensity=Q.intensity,j.shadowBias=Q.bias,j.shadowNormalBias=Q.normalBias,j.shadowRadius=Q.radius,j.shadowMapSize.copy(Q.mapSize).multiply(Q.getFrameExtents()),n.sunShadow[_]=j,n.sunShadowMap[_]=nt;const bt=Q.getViewportCount();for(let zt=0;zt<bt;zt++)n.sunShadowMatrix[x+zt]=Q.getMatrix(zt),n.sunShadowCascade[x+zt]=Q._cascadeData[zt];x+=bt,_++}n.sun[f]=V,f++}else if(I.isDirectionalLight){const V=t.get(I);if(V.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const Q=I.shadow,j=e.get(I);j.shadowIntensity=Q.intensity,j.shadowBias=Q.bias,j.shadowNormalBias=Q.normalBias,j.shadowRadius=Q.radius,j.shadowMapSize=Q.mapSize,n.directionalShadow[m]=j,n.directionalShadowMap[m]=nt,n.directionalShadowMatrix[m]=I.shadow.matrix,A++}n.directional[m]=V,m++}else if(I.isSpotLight){const V=t.get(I);V.position.setFromMatrixPosition(I.matrixWorld),V.color.copy(G).multiplyScalar(K),V.distance=k,V.coneCos=Math.cos(I.angle),V.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),V.decay=I.decay,n.spot[M]=V;const Q=I.shadow;if(I.map&&(n.spotLightMap[y]=I.map,y++,Q.updateMatrices(I),I.castShadow&&L++),n.spotLightMatrix[M]=Q.matrix,I.castShadow){const j=e.get(I);j.shadowIntensity=Q.intensity,j.shadowBias=Q.bias,j.shadowNormalBias=Q.normalBias,j.shadowRadius=Q.radius,j.shadowMapSize=Q.mapSize,n.spotShadow[M]=j,n.spotShadowMap[M]=nt,g++}M++}else if(I.isRectAreaLight){const V=t.get(I);V.color.copy(G).multiplyScalar(K),V.halfWidth.set(I.width*.5,0,0),V.halfHeight.set(0,I.height*.5,0),n.rectArea[E]=V,E++}else if(I.isPointLight){const V=t.get(I);if(V.color.copy(I.color).multiplyScalar(I.intensity),V.distance=I.distance,V.decay=I.decay,I.castShadow){const Q=I.shadow,j=e.get(I);j.shadowIntensity=Q.intensity,j.shadowBias=Q.bias,j.shadowNormalBias=Q.normalBias,j.shadowRadius=Q.radius,j.shadowMapSize=Q.mapSize,j.shadowCameraNear=Q.camera.near,j.shadowCameraFar=Q.camera.far,n.pointShadow[p]=j,n.pointShadowMap[p]=nt,n.pointShadowMatrix[p]=I.shadow.matrix,w++}n.point[p]=V,p++}else if(I.isHemisphereLight){const V=t.get(I);V.skyColor.copy(I.color).multiplyScalar(K),V.groundColor.copy(I.groundColor).multiplyScalar(K),n.hemi[b]=V,b++}}E>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=xt.LTC_FLOAT_1,n.rectAreaLTC2=xt.LTC_FLOAT_2):(n.rectAreaLTC1=xt.LTC_HALF_1,n.rectAreaLTC2=xt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;const N=n.hash;(N.sunLength!==f||N.directionalLength!==m||N.pointLength!==p||N.spotLength!==M||N.rectAreaLength!==E||N.hemiLength!==b||N.numSunShadows!==_||N.numDirectionalShadows!==A||N.numPointShadows!==w||N.numSpotShadows!==g||N.numSpotMaps!==y||N.numLightProbes!==P)&&(n.sun.length=f,n.directional.length=m,n.spot.length=M,n.rectArea.length=E,n.point.length=p,n.hemi.length=b,n.sunShadow.length=_,n.sunShadowMap.length=_,n.sunShadowMatrix.length=x,n.sunShadowCascade.length=x,n.directionalShadow.length=A,n.directionalShadowMap.length=A,n.directionalShadowMatrix.length=A,n.pointShadow.length=w,n.pointShadowMap.length=w,n.pointShadowMatrix.length=w,n.spotShadow.length=g,n.spotShadowMap.length=g,n.spotLightMatrix.length=g+y-L,n.spotLightMap.length=y,n.numSpotLightShadowsWithMaps=L,n.numLightProbes=P,N.sunLength=f,N.directionalLength=m,N.pointLength=p,N.spotLength=M,N.rectAreaLength=E,N.hemiLength=b,N.numSunShadows=_,N.numDirectionalShadows=A,N.numPointShadows=w,N.numSpotShadows=g,N.numSpotMaps=y,N.numLightProbes=P,n.version=Ag++)}function o(c,h){let d=0,u=0,f=0,_=0,x=0,m=0;const p=h.matrixWorldInverse;for(let M=0,E=c.length;M<E;M++){const b=c[M];if(b.isSunLight){const A=n.sun[d];A.direction.setFromMatrixPosition(b.matrixWorld),A.direction.transformDirection(p),d++}else if(b.isDirectionalLight){const A=n.directional[u];A.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),A.direction.sub(s),A.direction.transformDirection(p),u++}else if(b.isSpotLight){const A=n.spot[_];A.position.setFromMatrixPosition(b.matrixWorld),A.position.applyMatrix4(p),A.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),A.direction.sub(s),A.direction.transformDirection(p),_++}else if(b.isRectAreaLight){const A=n.rectArea[x];A.position.setFromMatrixPosition(b.matrixWorld),A.position.applyMatrix4(p),a.identity(),r.copy(b.matrixWorld),r.premultiply(p),a.extractRotation(r),A.halfWidth.set(b.width*.5,0,0),A.halfHeight.set(0,b.height*.5,0),A.halfWidth.applyMatrix4(a),A.halfHeight.applyMatrix4(a),x++}else if(b.isPointLight){const A=n.point[f];A.position.setFromMatrixPosition(b.matrixWorld),A.position.applyMatrix4(p),f++}else if(b.isHemisphereLight){const A=n.hemi[m];A.direction.setFromMatrixPosition(b.matrixWorld),A.direction.transformDirection(p),m++}}}return{setup:l,setupView:o,state:n}}function Qc(i){const t=new Cg(i),e=[],n=[],s=[];function r(d){h.camera=d,e.length=0,n.length=0,s.length=0}function a(d){d.isLightProbeGrid?s.push(d):e.push(d)}function l(d){n.push(d)}function o(){t.setup(e),s.sort((d,u)=>d.priority-u.priority||d.id-u.id)}function c(d){t.setupView(e,d)}const h={lightsArray:e,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:h,setupLights:o,setupLightsView:c,pushLight:a,pushShadow:l}}function Pg(i){let t=new WeakMap;function e(s,r=0){const a=t.get(s);let l;return a===void 0?(l=new Qc(i),t.set(s,[l])):r>=a.length?(l=new Qc(i),a.push(l)):l=a[r],l}function n(){t=new WeakMap}return{get:e,dispose:n}}const Lg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Dg=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Ig=[new C(1,0,0),new C(-1,0,0),new C(0,1,0),new C(0,-1,0),new C(0,0,1),new C(0,0,-1)],Ng=[new C(0,-1,0),new C(0,-1,0),new C(0,0,1),new C(0,0,-1),new C(0,-1,0),new C(0,-1,0)],jc=new le,Hs=new C,so=new C;function Ug(i,t,e){let n=new sr;const s=new Ct,r=new Ct,a=new De,l=new Xd,o=new qd,c={},h=e.maxTextureSize,d={[zi]:Mn,[Mn]:zi,[Le]:Le},u=new vn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ct},radius:{value:4}},vertexShader:Lg,fragmentShader:Dg}),f=u.clone();f.defines.HORIZONTAL_PASS=1;const _=new Ae;_.setAttribute("position",new un(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new et(_,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Zr;let p=this.type;this.render=function(w,g,y){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;this.type===ph&&(Gt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Zr);const L=i.getRenderTarget(),P=i.getActiveCubeFace(),N=i.getActiveMipmapLevel(),F=i.state;F.setBlending(Bi),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const W=p!==this.type;W&&g.traverse(function(I){I.material&&(Array.isArray(I.material)?I.material.forEach(G=>G.needsUpdate=!0):I.material.needsUpdate=!0)});for(let I=0,G=w.length;I<G;I++){const K=w[I],k=K.shadow;if(k===void 0){Gt("WebGLShadowMap:",K,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;s.copy(k.mapSize);const nt=k.getFrameExtents();s.multiply(nt),r.copy(k.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/nt.x),s.x=r.x*nt.x,k.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/nt.y),s.y=r.y*nt.y,k.mapSize.y=r.y));const V=i.state.buffers.depth.getReversed();if(k.camera._reversedDepth=V,k.map===null||W===!0){if(k.map!==null&&(k.map.depthTexture!==null&&(k.map.depthTexture.dispose(),k.map.depthTexture=null),k.map.dispose()),this.type===Ws){if(K.isPointLight){Gt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}k.map=new Rn(s.x,s.y,{format:ki,type:An,minFilter:En,magFilter:En,generateMipmaps:!1}),k.map.texture.name=K.name+".shadowMap",k.map.depthTexture=new bs(s.x,s.y,Vn),k.map.depthTexture.name=K.name+".shadowMapDepth",k.map.depthTexture.format=bi,k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=en,k.map.depthTexture.magFilter=en}else K.isPointLight?(k.map=new Nl(s.x),k.map.depthTexture=new Gh(s.x,Qn)):(k.map=new Rn(s.x,s.y),k.map.depthTexture=new bs(s.x,s.y,Qn)),k.map.depthTexture.name=K.name+".shadowMap",k.map.depthTexture.format=bi,this.type===Zr?(k.map.depthTexture.compareFunction=V?Th:Eh,k.map.depthTexture.minFilter=En,k.map.depthTexture.magFilter=En):(k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=en,k.map.depthTexture.magFilter=en);k.camera.updateProjectionMatrix()}k.map.isWebGLCubeRenderTarget!==!0&&(k.map.width!==s.x||k.map.height!==s.y)&&k.map.setSize(s.x,s.y);const Q=k.map.isWebGLCubeRenderTarget?6:k.getViewportCount();K.isPointLight!==!0&&k.updateMatrices(K,y);const j=(k.camera.layers.mask&4294967294)!==0?k.camera.layers:y.layers;for(let bt=0;bt<Q;bt++){const zt=k.getCamera(bt);if(K.isPointLight){const Z=k.camera,_t=k.matrix,St=K.distance||Z.far;St!==Z.far&&(Z.far=St,Z.updateProjectionMatrix()),Hs.setFromMatrixPosition(K.matrixWorld),Z.position.copy(Hs),so.copy(Z.position),so.add(Ig[bt]),Z.up.copy(Ng[bt]),Z.lookAt(so),Z.updateMatrixWorld(),_t.makeTranslation(-Hs.x,-Hs.y,-Hs.z),jc.multiplyMatrices(Z.projectionMatrix,Z.matrixWorldInverse),k._frustum.setFromProjectionMatrix(jc,Z.coordinateSystem,Z.reversedDepth)}if(k.map.isWebGLCubeRenderTarget)i.setRenderTarget(k.map,bt),i.clear();else{bt===0&&(i.setRenderTarget(k.map),i.clear());const Z=k.getViewport(bt);a.set(r.x*Z.x,r.y*Z.y,r.x*Z.z,r.y*Z.w),F.viewport(a)}n=k.getFrustum(bt),b(g,y,zt,K,j,this.type)}k.isPointLightShadow!==!0&&this.type===Ws&&M(k,y),k.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(L,P,N)};function M(w,g){const y=t.update(x);u.defines.VSM_SAMPLES!==w.blurSamples&&(u.defines.VSM_SAMPLES=w.blurSamples,f.defines.VSM_SAMPLES=w.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),w.mapPass===null?w.mapPass=new Rn(s.x,s.y,{format:ki,type:An}):(w.mapPass.width!==w.map.width||w.mapPass.height!==w.map.height)&&w.mapPass.setSize(w.map.width,w.map.height),u.uniforms.shadow_pass.value=w.map.depthTexture,u.uniforms.resolution.value.set(w.map.width,w.map.height),u.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(g,null,y,u,x,null),f.uniforms.shadow_pass.value=w.mapPass.texture,f.uniforms.resolution.value.set(w.map.width,w.map.height),f.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(g,null,y,f,x,null)}function E(w,g,y,L){let P=null;const N=y.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(N!==void 0)P=N;else if(P=y.isPointLight===!0?o:l,i.localClippingEnabled&&g.clipShadows===!0&&Array.isArray(g.clippingPlanes)&&g.clippingPlanes.length!==0||g.displacementMap&&g.displacementScale!==0||g.alphaMap&&g.alphaTest>0||g.map&&g.alphaTest>0||g.alphaToCoverage===!0){const F=P.uuid,W=g.uuid;let I=c[F];I===void 0&&(I={},c[F]=I);let G=I[W];G===void 0&&(G=P.clone(),I[W]=G,g.addEventListener("dispose",A)),P=G}if(P.visible=g.visible,P.wireframe=g.wireframe,L===Ws?P.side=g.shadowSide!==null?g.shadowSide:g.side:P.side=g.shadowSide!==null?g.shadowSide:d[g.side],P.alphaMap=g.alphaMap,P.alphaTest=g.alphaToCoverage===!0?.5:g.alphaTest,P.map=g.map,P.clipShadows=g.clipShadows,P.clippingPlanes=g.clippingPlanes,P.clipIntersection=g.clipIntersection,P.displacementMap=g.displacementMap,P.displacementScale=g.displacementScale,P.displacementBias=g.displacementBias,P.wireframeLinewidth=g.wireframeLinewidth,P.linewidth=g.linewidth,y.isPointLight===!0&&P.isMeshDistanceMaterial===!0){const F=i.properties.get(P);F.light=y}return P}function b(w,g,y,L,P,N){if(w.visible===!1)return;if(w.layers.test(P)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&N===Ws)&&(!w.frustumCulled||w.intersectsFrustum(n))){w.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,w.matrixWorld);const I=t.update(w),G=w.material;if(Array.isArray(G)){const K=I.groups;for(let k=0,nt=K.length;k<nt;k++){const V=K[k],Q=G[V.materialIndex];if(Q&&Q.visible){const j=E(w,Q,L,N);w.onBeforeShadow(i,w,g,y,I,j,V),i.renderBufferDirect(y,null,I,j,w,V),w.onAfterShadow(i,w,g,y,I,j,V)}}}else if(G.visible){const K=E(w,G,L,N);w.onBeforeShadow(i,w,g,y,I,K,null),i.renderBufferDirect(y,null,I,K,w,null),w.onAfterShadow(i,w,g,y,I,K,null)}}const W=w.children;for(let I=0,G=W.length;I<G;I++)b(W[I],g,y,L,P,N)}function A(w){w.target.removeEventListener("dispose",A);for(const y in c){const L=c[y],P=w.target.uuid;P in L&&(L[P].dispose(),delete L[P])}}}function Fg(i,t){function e(){let R=!1;const $=new De;let X=null;const ut=new De(0,0,0,0);return{setMask:function(rt){X!==rt&&!R&&(i.colorMask(rt,rt,rt,rt),X=rt)},setLocked:function(rt){R=rt},setClear:function(rt,ot,At,Kt,st){st===!0&&(rt*=Kt,ot*=Kt,At*=Kt),$.set(rt,ot,At,Kt),ut.equals($)===!1&&(i.clearColor(rt,ot,At,Kt),ut.copy($))},reset:function(){R=!1,X=null,ut.set(-1,0,0,0)}}}function n(){let R=!1,$=!1,X=null,ut=null,rt=null;return{setReversed:function(ot){if($!==ot){const At=t.get("EXT_clip_control");ot?At.clipControlEXT(At.LOWER_LEFT_EXT,At.ZERO_TO_ONE_EXT):At.clipControlEXT(At.LOWER_LEFT_EXT,At.NEGATIVE_ONE_TO_ONE_EXT),$=ot;const Kt=rt;rt=null,this.setClear(Kt)}},getReversed:function(){return $},setTest:function(ot){ot?dt(i.DEPTH_TEST):Vt(i.DEPTH_TEST)},setMask:function(ot){X!==ot&&!R&&(i.depthMask(ot),X=ot)},setFunc:function(ot){if($&&(ot=ed[ot]),ut!==ot){switch(ot){case ho:i.depthFunc(i.NEVER);break;case uo:i.depthFunc(i.ALWAYS);break;case fo:i.depthFunc(i.LESS);break;case js:i.depthFunc(i.LEQUAL);break;case po:i.depthFunc(i.EQUAL);break;case mo:i.depthFunc(i.GEQUAL);break;case go:i.depthFunc(i.GREATER);break;case _o:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ut=ot}},setLocked:function(ot){R=ot},setClear:function(ot){rt!==ot&&(rt=ot,$&&(ot=1-ot),i.clearDepth(ot))},reset:function(){R=!1,X=null,ut=null,rt=null,$=!1}}}function s(){let R=!1,$=null,X=null,ut=null,rt=null,ot=null,At=null,Kt=null,st=null;return{setTest:function(Lt){R||(Lt?dt(i.STENCIL_TEST):Vt(i.STENCIL_TEST))},setMask:function(Lt){$!==Lt&&!R&&(i.stencilMask(Lt),$=Lt)},setFunc:function(Lt,Wt,gt){(X!==Lt||ut!==Wt||rt!==gt)&&(i.stencilFunc(Lt,Wt,gt),X=Lt,ut=Wt,rt=gt)},setOp:function(Lt,Wt,gt){(ot!==Lt||At!==Wt||Kt!==gt)&&(i.stencilOp(Lt,Wt,gt),ot=Lt,At=Wt,Kt=gt)},setLocked:function(Lt){R=Lt},setClear:function(Lt){st!==Lt&&(i.clearStencil(Lt),st=Lt)},reset:function(){R=!1,$=null,X=null,ut=null,rt=null,ot=null,At=null,Kt=null,st=null}}}const r=new e,a=new n,l=new s;let o={};const c=new WeakMap;let h={},d={},u={},f=new WeakMap,_=[],x=null,m=!1,p=null,M=null,E=null,b=null,A=null,w=null,g=null,y=new Dt(0,0,0),L=0,P=!1,N=null,F=null,W=null,I=null,G=null;const K=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let k=!1,nt=0;const V=i.getParameter(i.VERSION);V.indexOf("WebGL")!==-1?(nt=parseFloat(/^WebGL (\d)/.exec(V)[1]),k=nt>=1):V.indexOf("OpenGL ES")!==-1&&(nt=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),k=nt>=2);let Q=null,j={};const bt=i.getParameter(i.SCISSOR_BOX),zt=i.getParameter(i.VIEWPORT),Z=new De().fromArray(bt),_t=new De().fromArray(zt);function St(R,$,X,ut){const rt=new Uint8Array(4),ot=i.createTexture();i.bindTexture(R,ot),i.texParameteri(R,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(R,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let At=0;At<X;At++)R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY?i.texImage3D($,0,i.RGBA,1,1,ut,0,i.RGBA,i.UNSIGNED_BYTE,rt):i.texImage2D($+At,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,rt);return ot}const It={};It[i.TEXTURE_2D]=St(i.TEXTURE_2D,i.TEXTURE_2D,1),It[i.TEXTURE_CUBE_MAP]=St(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),It[i.TEXTURE_2D_ARRAY]=St(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),It[i.TEXTURE_3D]=St(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),l.setClear(0),dt(i.DEPTH_TEST),a.setFunc(js),Xe(!1),be(Yl),dt(i.CULL_FACE),Re(Bi);function dt(R){h[R]!==!0&&(i.enable(R),h[R]=!0)}function Vt(R){h[R]!==!1&&(i.disable(R),h[R]=!1)}function Ie(R,$){return u[R]!==$?(i.bindFramebuffer(R,$),u[R]=$,R===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=$),R===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=$),!0):!1}function Nt(R,$){let X=_,ut=!1;if(R){X=f.get($),X===void 0&&(X=[],f.set($,X));const rt=R.textures;if(X.length!==rt.length||X[0]!==i.COLOR_ATTACHMENT0){for(let ot=0,At=rt.length;ot<At;ot++)X[ot]=i.COLOR_ATTACHMENT0+ot;X.length=rt.length,ut=!0}}else X[0]!==i.BACK&&(X[0]=i.BACK,ut=!0);ut&&i.drawBuffers(X)}function he(R){return x!==R?(i.useProgram(R),x=R,!0):!1}const xe={[hs]:i.FUNC_ADD,[wu]:i.FUNC_SUBTRACT,[Eu]:i.FUNC_REVERSE_SUBTRACT};xe[Tu]=i.MIN,xe[Au]=i.MAX;const Jt={[Ru]:i.ZERO,[Cu]:i.ONE,[Pu]:i.SRC_COLOR,[mh]:i.SRC_ALPHA,[Fu]:i.SRC_ALPHA_SATURATE,[Nu]:i.DST_COLOR,[Du]:i.DST_ALPHA,[Lu]:i.ONE_MINUS_SRC_COLOR,[gh]:i.ONE_MINUS_SRC_ALPHA,[Uu]:i.ONE_MINUS_DST_COLOR,[Iu]:i.ONE_MINUS_DST_ALPHA,[Ou]:i.CONSTANT_COLOR,[Bu]:i.ONE_MINUS_CONSTANT_COLOR,[zu]:i.CONSTANT_ALPHA,[ku]:i.ONE_MINUS_CONSTANT_ALPHA};function Re(R,$,X,ut,rt,ot,At,Kt,st,Lt){if(R===Bi){m===!0&&(Vt(i.BLEND),m=!1);return}if(m===!1&&(dt(i.BLEND),m=!0),R!==bu){if(R!==p||Lt!==P){if((M!==hs||A!==hs)&&(i.blendEquation(i.FUNC_ADD),M=hs,A=hs),Lt)switch(R){case Ys:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case He:i.blendFunc(i.ONE,i.ONE);break;case Kl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case $l:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:de("WebGLState: Invalid blending: ",R);break}else switch(R){case Ys:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case He:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Kl:de("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case $l:de("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:de("WebGLState: Invalid blending: ",R);break}E=null,b=null,w=null,g=null,y.set(0,0,0),L=0,p=R,P=Lt}return}rt=rt||$,ot=ot||X,At=At||ut,($!==M||rt!==A)&&(i.blendEquationSeparate(xe[$],xe[rt]),M=$,A=rt),(X!==E||ut!==b||ot!==w||At!==g)&&(i.blendFuncSeparate(Jt[X],Jt[ut],Jt[ot],Jt[At]),E=X,b=ut,w=ot,g=At),(Kt.equals(y)===!1||st!==L)&&(i.blendColor(Kt.r,Kt.g,Kt.b,st),y.copy(Kt),L=st),p=R,P=!1}function Ne(R,$){R.side===Le?Vt(i.CULL_FACE):dt(i.CULL_FACE);let X=R.side===Mn;$&&(X=!X),Xe(X),R.blending===Ys&&R.transparent===!1?Re(Bi):Re(R.blending,R.blendEquation,R.blendSrc,R.blendDst,R.blendEquationAlpha,R.blendSrcAlpha,R.blendDstAlpha,R.blendColor,R.blendAlpha,R.premultipliedAlpha),a.setFunc(R.depthFunc),a.setTest(R.depthTest),a.setMask(R.depthWrite),r.setMask(R.colorWrite);const ut=R.stencilWrite;l.setTest(ut),ut&&(l.setMask(R.stencilWriteMask),l.setFunc(R.stencilFunc,R.stencilRef,R.stencilFuncMask),l.setOp(R.stencilFail,R.stencilZFail,R.stencilZPass)),Fe(R.polygonOffset,R.polygonOffsetFactor,R.polygonOffsetUnits),R.alphaToCoverage===!0?dt(i.SAMPLE_ALPHA_TO_COVERAGE):Vt(i.SAMPLE_ALPHA_TO_COVERAGE)}function Xe(R){N!==R&&(R?i.frontFace(i.CW):i.frontFace(i.CCW),N=R)}function be(R){R!==Su?(dt(i.CULL_FACE),R!==F&&(R===Yl?i.cullFace(i.BACK):R===yu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Vt(i.CULL_FACE),F=R}function fn(R){R!==W&&(k&&i.lineWidth(R),W=R)}function Fe(R,$,X){R?(dt(i.POLYGON_OFFSET_FILL),(I!==$||G!==X)&&(I=$,G=X,a.getReversed()&&($=-$,X=-X),i.polygonOffset($,X))):Vt(i.POLYGON_OFFSET_FILL)}function yn(R){R?dt(i.SCISSOR_TEST):Vt(i.SCISSOR_TEST)}function pn(R){R===void 0&&(R=i.TEXTURE0+K-1),Q!==R&&(i.activeTexture(R),Q=R)}function Je(R,$,X){X===void 0&&(Q===null?X=i.TEXTURE0+K-1:X=Q);let ut=j[X];ut===void 0&&(ut={type:void 0,texture:void 0},j[X]=ut),(ut.type!==R||ut.texture!==$)&&(Q!==X&&(i.activeTexture(X),Q=X),i.bindTexture(R,$||It[R]),ut.type=R,ut.texture=$)}function U(){const R=j[Q];R!==void 0&&R.type!==void 0&&(i.bindTexture(R.type,null),R.type=void 0,R.texture=void 0)}function bn(){try{i.compressedTexImage2D(...arguments)}catch(R){de("WebGLState:",R)}}function ve(){try{i.compressedTexImage3D(...arguments)}catch(R){de("WebGLState:",R)}}function Ee(){try{i.texSubImage2D(...arguments)}catch(R){de("WebGLState:",R)}}function mt(){try{i.texSubImage3D(...arguments)}catch(R){de("WebGLState:",R)}}function Ue(){try{i.compressedTexSubImage2D(...arguments)}catch(R){de("WebGLState:",R)}}function Pt(){try{i.compressedTexSubImage3D(...arguments)}catch(R){de("WebGLState:",R)}}function Ft(){try{i.texStorage2D(...arguments)}catch(R){de("WebGLState:",R)}}function T(){try{i.texStorage3D(...arguments)}catch(R){de("WebGLState:",R)}}function v(){try{i.texImage2D(...arguments)}catch(R){de("WebGLState:",R)}}function O(){try{i.texImage3D(...arguments)}catch(R){de("WebGLState:",R)}}function tt(R){return d[R]!==void 0?d[R]:i.getParameter(R)}function J(R,$){d[R]!==$&&(i.pixelStorei(R,$),d[R]=$)}function at(R){Z.equals(R)===!1&&(i.scissor(R.x,R.y,R.z,R.w),Z.copy(R))}function ht(R){_t.equals(R)===!1&&(i.viewport(R.x,R.y,R.z,R.w),_t.copy(R))}function q(R,$){let X=c.get($);X===void 0&&(X=new WeakMap,c.set($,X));let ut=X.get(R);ut===void 0&&(ut=i.getUniformBlockIndex($,R.name),i.uniformBlockBinding($,ut,ut),X.set(R,ut))}function Y(R,$,X){const rt=c.get($).get(R);o[rt]!==X&&(i.bindBufferBase(i.UNIFORM_BUFFER,rt,X),o[rt]=X)}function lt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},d={},Q=null,j={},u={},o={},f=new WeakMap,_=[],x=null,m=!1,p=null,M=null,E=null,b=null,A=null,w=null,g=null,y=new Dt(0,0,0),L=0,P=!1,N=null,F=null,W=null,I=null,G=null,Z.set(0,0,i.canvas.width,i.canvas.height),_t.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),l.reset()}return{buffers:{color:r,depth:a,stencil:l},enable:dt,disable:Vt,bindFramebuffer:Ie,drawBuffers:Nt,useProgram:he,setBlending:Re,setMaterial:Ne,setFlipSided:Xe,setCullFace:be,setLineWidth:fn,setPolygonOffset:Fe,setScissorTest:yn,activeTexture:pn,bindTexture:Je,unbindTexture:U,compressedTexImage2D:bn,compressedTexImage3D:ve,texImage2D:v,texImage3D:O,pixelStorei:J,getParameter:tt,updateUBOMapping:q,uniformBlockBinding:Y,texStorage2D:Ft,texStorage3D:T,texSubImage2D:Ee,texSubImage3D:mt,compressedTexSubImage2D:Ue,compressedTexSubImage3D:Pt,scissor:at,viewport:ht,reset:lt}}function Og(i,t,e,n,s,r,a){const l=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,o=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ct,h=new WeakMap,d=new Set;let u;const f=new WeakMap,_=new Set,x=new FinalizationRegistry(T=>_.delete(T));let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(T,v){return m?new OffscreenCanvas(T,v):ha("canvas")}function M(T,v,O){let tt=1;const J=Ft(T);if((J.width>O||J.height>O)&&(tt=O/Math.max(J.width,J.height)),tt<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const at=Math.floor(tt*J.width),ht=Math.floor(tt*J.height);u===void 0&&(u=p(at,ht));const q=v?p(at,ht):u;return q.width=at,q.height=ht,q.getContext("2d").drawImage(T,0,0,at,ht),Gt("WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+at+"x"+ht+")."),q}else return"data"in T&&Gt("WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),T;return T}function E(T){return T.generateMipmaps}function b(T){i.generateMipmap(T)}function A(T){return T.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?i.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function w(T,v,O,tt,J,at=!1){if(T!==null){if(i[T]!==void 0)return i[T];Gt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let ht;tt&&(ht=t.get("EXT_texture_norm16"),ht||Gt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let q=v;if(v===i.RED&&(O===i.FLOAT&&(q=i.R32F),O===i.HALF_FLOAT&&(q=i.R16F),O===i.UNSIGNED_BYTE&&(q=i.R8),O===i.UNSIGNED_SHORT&&ht&&(q=ht.R16_EXT),O===i.SHORT&&ht&&(q=ht.R16_SNORM_EXT)),v===i.RED_INTEGER&&(O===i.UNSIGNED_BYTE&&(q=i.R8UI),O===i.UNSIGNED_SHORT&&(q=i.R16UI),O===i.UNSIGNED_INT&&(q=i.R32UI),O===i.BYTE&&(q=i.R8I),O===i.SHORT&&(q=i.R16I),O===i.INT&&(q=i.R32I)),v===i.RG&&(O===i.FLOAT&&(q=i.RG32F),O===i.HALF_FLOAT&&(q=i.RG16F),O===i.UNSIGNED_BYTE&&(q=i.RG8),O===i.UNSIGNED_SHORT&&ht&&(q=ht.RG16_EXT),O===i.SHORT&&ht&&(q=ht.RG16_SNORM_EXT)),v===i.RG_INTEGER&&(O===i.UNSIGNED_BYTE&&(q=i.RG8UI),O===i.UNSIGNED_SHORT&&(q=i.RG16UI),O===i.UNSIGNED_INT&&(q=i.RG32UI),O===i.BYTE&&(q=i.RG8I),O===i.SHORT&&(q=i.RG16I),O===i.INT&&(q=i.RG32I)),v===i.RGB_INTEGER&&(O===i.UNSIGNED_BYTE&&(q=i.RGB8UI),O===i.UNSIGNED_SHORT&&(q=i.RGB16UI),O===i.UNSIGNED_INT&&(q=i.RGB32UI),O===i.BYTE&&(q=i.RGB8I),O===i.SHORT&&(q=i.RGB16I),O===i.INT&&(q=i.RGB32I)),v===i.RGBA_INTEGER&&(O===i.UNSIGNED_BYTE&&(q=i.RGBA8UI),O===i.UNSIGNED_SHORT&&(q=i.RGBA16UI),O===i.UNSIGNED_INT&&(q=i.RGBA32UI),O===i.BYTE&&(q=i.RGBA8I),O===i.SHORT&&(q=i.RGBA16I),O===i.INT&&(q=i.RGBA32I)),v===i.RGB&&(O===i.UNSIGNED_SHORT&&ht&&(q=ht.RGB16_EXT),O===i.SHORT&&ht&&(q=ht.RGB16_SNORM_EXT),O===i.UNSIGNED_INT_5_9_9_9_REV&&(q=i.RGB9_E5),O===i.UNSIGNED_INT_10F_11F_11F_REV&&(q=i.R11F_G11F_B10F)),v===i.RGBA){const Y=at?ca:re.getTransfer(J);O===i.FLOAT&&(q=i.RGBA32F),O===i.HALF_FLOAT&&(q=i.RGBA16F),O===i.UNSIGNED_BYTE&&(q=Y===Me?i.SRGB8_ALPHA8:i.RGBA8),O===i.UNSIGNED_SHORT&&ht&&(q=ht.RGBA16_EXT),O===i.SHORT&&ht&&(q=ht.RGBA16_SNORM_EXT),O===i.UNSIGNED_SHORT_4_4_4_4&&(q=i.RGBA4),O===i.UNSIGNED_SHORT_5_5_5_1&&(q=i.RGB5_A1)}return(q===i.R16F||q===i.R32F||q===i.RG16F||q===i.RG32F||q===i.RGBA16F||q===i.RGBA32F)&&t.get("EXT_color_buffer_float"),q}function g(T,v){let O;return T?v===null||v===Qn||v===Ss?O=i.DEPTH24_STENCIL8:v===Vn?O=i.DEPTH32F_STENCIL8:v===er&&(O=i.DEPTH24_STENCIL8,Gt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Qn||v===Ss?O=i.DEPTH_COMPONENT24:v===Vn?O=i.DEPTH_COMPONENT32F:v===er&&(O=i.DEPTH_COMPONENT16),O}function y(T,v){return E(T)===!0||T.isFramebufferTexture&&T.minFilter!==en&&T.minFilter!==En?Math.log2(Math.max(v.width,v.height))+1:T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?v.mipmaps.length:1}function L(T){const v=new WeakRef(T);n.get(T).__ref=v,_.add(v),x.register(T,v,v)}function P(T){const v=n.get(T).__ref;v!==void 0&&(_.delete(v),x.unregister(v))}function N(T){W(T.target)}function F(T){I(T.target)}function W(T){T.removeEventListener("dispose",N),P(T),K(T),T.isVideoTexture&&h.delete(T),T.isHTMLTexture&&d.delete(T)}function I(T){T.removeEventListener("dispose",F),P(T),nt(T)}function G(){for(const T of _){const v=T.deref();v!==void 0&&(v.isRenderTarget===!0?I(v):W(v))}_.clear(),d.clear()}function K(T){const v=n.get(T);if(v.__webglInit===void 0)return;const O=T.source,tt=f.get(O);if(tt){const J=tt[v.__cacheKey];J.usedTimes--,J.usedTimes===0&&k(T),Object.keys(tt).length===0&&f.delete(O)}n.remove(T)}function k(T){const v=n.get(T);i.deleteTexture(v.__webglTexture);const O=T.source,tt=f.get(O);delete tt[v.__cacheKey],a.memory.textures--}function nt(T){const v=n.get(T);v.__depthDisposeCallback&&v.__depthDisposeCallback();const O=T.depthTexture;if(O&&O.renderTarget===T&&W(O),T.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(v.__webglFramebuffer[J]))for(let at=0;at<v.__webglFramebuffer[J].length;at++)i.deleteFramebuffer(v.__webglFramebuffer[J][at]);else i.deleteFramebuffer(v.__webglFramebuffer[J]);v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer[J])}else{if(Array.isArray(v.__webglFramebuffer))for(let J=0;J<v.__webglFramebuffer.length;J++)i.deleteFramebuffer(v.__webglFramebuffer[J]);else i.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&i.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let J=0;J<v.__webglColorRenderbuffer.length;J++)v.__webglColorRenderbuffer[J]&&i.deleteRenderbuffer(v.__webglColorRenderbuffer[J]);v.__webglDepthRenderbuffer&&i.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const tt=T.textures;for(let J=0,at=tt.length;J<at;J++){const ht=n.get(tt[J]);ht.__webglTexture&&(i.deleteTexture(ht.__webglTexture),a.memory.textures--),n.remove(tt[J])}n.remove(T)}let V=0;function Q(){V=0}function j(){return V}function bt(T){V=T}function zt(){const T=V;return T>=s.maxTextures&&Gt("WebGLTextures: Trying to use "+(T+1)+" texture units while this GPU supports only "+s.maxTextures),V+=1,T}function Z(T){const v=[];return v.push(T.wrapS),v.push(T.wrapT),v.push(T.wrapR||0),v.push(T.magFilter),v.push(T.minFilter),v.push(T.anisotropy),v.push(T.internalFormat),v.push(T.format),v.push(T.type),v.push(T.generateMipmaps),v.push(T.mipmapsAutoUpdate),v.push(T.premultiplyAlpha),v.push(T.flipY),v.push(T.unpackAlignment),v.push(T.colorSpace),v.join()}function _t(T,v){const O=n.get(T);if(T.isVideoTexture&&Ue(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&O.__version!==T.version){const tt=T.image;if(tt===null)Gt("WebGLRenderer: Texture marked for update but no image data found.");else if(tt.complete===!1)Gt("WebGLRenderer: Texture marked for update but image is incomplete");else{Ne(O,T,v);return}}else T.isExternalTexture&&(O.__webglTexture=T.sourceTexture?T.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,O.__webglTexture,i.TEXTURE0+v)}function St(T,v){const O=n.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&O.__version!==T.version){Ne(O,T,v);return}else T.isExternalTexture&&(O.__webglTexture=T.sourceTexture?T.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,O.__webglTexture,i.TEXTURE0+v)}function It(T,v){const O=n.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&O.__version!==T.version){Ne(O,T,v);return}e.bindTexture(i.TEXTURE_3D,O.__webglTexture,i.TEXTURE0+v)}function dt(T,v){const O=n.get(T);if(T.version>0&&O.__version!==T.version){Xe(O,T,v);return}e.bindTexture(i.TEXTURE_CUBE_MAP,O.__webglTexture,i.TEXTURE0+v)}const Vt={[ra]:i.REPEAT,[oi]:i.CLAMP_TO_EDGE,[xo]:i.MIRRORED_REPEAT},Ie={[en]:i.NEAREST,[Vu]:i.NEAREST_MIPMAP_NEAREST,[mr]:i.NEAREST_MIPMAP_LINEAR,[En]:i.LINEAR,[Pa]:i.LINEAR_MIPMAP_NEAREST,[Mi]:i.LINEAR_MIPMAP_LINEAR},Nt={[Yu]:i.NEVER,[Ah]:i.ALWAYS,[Ku]:i.LESS,[Eh]:i.LEQUAL,[$u]:i.EQUAL,[Th]:i.GEQUAL,[Zu]:i.GREATER,[Ju]:i.NOTEQUAL};function he(T,v){if(v.type===Vn&&t.has("OES_texture_float_linear")===!1&&(v.magFilter===En||v.magFilter===Pa||v.magFilter===mr||v.magFilter===Mi||v.minFilter===En||v.minFilter===Pa||v.minFilter===mr||v.minFilter===Mi)&&Gt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(T,i.TEXTURE_WRAP_S,Vt[v.wrapS]),i.texParameteri(T,i.TEXTURE_WRAP_T,Vt[v.wrapT]),(T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY)&&i.texParameteri(T,i.TEXTURE_WRAP_R,Vt[v.wrapR]),i.texParameteri(T,i.TEXTURE_MAG_FILTER,Ie[v.magFilter]),i.texParameteri(T,i.TEXTURE_MIN_FILTER,Ie[v.minFilter]),v.compareFunction&&(i.texParameteri(T,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(T,i.TEXTURE_COMPARE_FUNC,Nt[v.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===en||v.minFilter!==mr&&v.minFilter!==Mi||v.type===Vn&&t.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){const O=t.get("EXT_texture_filter_anisotropic");i.texParameterf(T,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function xe(T,v){let O=!1;T.__webglInit===void 0&&(T.__webglInit=!0,v.addEventListener("dispose",N),L(v));const tt=v.source;let J=f.get(tt);J===void 0&&(J={},f.set(tt,J));const at=Z(v);if(at!==T.__cacheKey){J[at]===void 0&&(J[at]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,O=!0),J[at].usedTimes++;const ht=J[T.__cacheKey];ht!==void 0&&(J[T.__cacheKey].usedTimes--,ht.usedTimes===0&&k(v)),T.__cacheKey=at,T.__webglTexture=J[at].texture}return O}function Jt(T,v,O){return Math.floor(Math.floor(T/O)/v)}function Re(T,v,O,tt){const at=T.updateRanges;if(at.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,v.width,v.height,O,tt,v.data);else{at.sort((R,$)=>R.start-$.start);let ht=0;for(let R=1;R<at.length;R++){const $=at[ht],X=at[R],ut=$.start+$.count,rt=Jt(X.start,v.width,4),ot=Jt($.start,v.width,4);X.start<=ut+1&&rt===ot&&Jt(X.start+X.count-1,v.width,4)===rt?$.count=Math.max($.count,X.start+X.count-$.start):(++ht,at[ht]=X)}at.length=ht+1;const q=e.getParameter(i.UNPACK_ROW_LENGTH),Y=e.getParameter(i.UNPACK_SKIP_PIXELS),lt=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,v.width);for(let R=0,$=at.length;R<$;R++){const X=at[R],ut=Math.floor(X.start/4),rt=Math.ceil(X.count/4),ot=ut%v.width,At=Math.floor(ut/v.width),Kt=rt,st=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,ot),e.pixelStorei(i.UNPACK_SKIP_ROWS,At),e.texSubImage2D(i.TEXTURE_2D,0,ot,At,Kt,st,O,tt,v.data)}T.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,q),e.pixelStorei(i.UNPACK_SKIP_PIXELS,Y),e.pixelStorei(i.UNPACK_SKIP_ROWS,lt)}}function Ne(T,v,O){let tt=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(tt=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(tt=i.TEXTURE_3D);const J=xe(T,v),at=v.source;e.bindTexture(tt,T.__webglTexture,i.TEXTURE0+O);const ht=n.get(at);if(at.version!==ht.__version||J===!0){if(e.activeTexture(i.TEXTURE0+O),(typeof ImageBitmap<"u"&&v.image instanceof ImageBitmap)===!1){const st=re.getPrimaries(re.workingColorSpace),Lt=v.colorSpace===vi?null:re.getPrimaries(v.colorSpace),Wt=v.colorSpace===vi||st===Lt?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Wt)}e.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment);let Y=M(v.image,!1,s.maxTextureSize);Y=Pt(v,Y);const lt=r.convert(v.format,v.colorSpace),R=r.convert(v.type);let $=w(v.internalFormat,lt,R,v.normalized,v.colorSpace,v.isVideoTexture);he(tt,v);let X;const ut=v.mipmaps,rt=v.isVideoTexture!==!0,ot=ht.__version===void 0||J===!0,At=at.dataReady,Kt=y(v,Y);if(v.isDepthTexture)$=g(v.format===Si,v.type),ot&&(rt?e.texStorage2D(i.TEXTURE_2D,1,$,Y.width,Y.height):e.texImage2D(i.TEXTURE_2D,0,$,Y.width,Y.height,0,lt,R,null));else if(v.isDataTexture)if(ut.length>0){rt&&ot&&e.texStorage2D(i.TEXTURE_2D,Kt,$,ut[0].width,ut[0].height);for(let st=0,Lt=ut.length;st<Lt;st++)X=ut[st],rt?At&&e.texSubImage2D(i.TEXTURE_2D,st,0,0,X.width,X.height,lt,R,X.data):e.texImage2D(i.TEXTURE_2D,st,$,X.width,X.height,0,lt,R,X.data);v.generateMipmaps=!1}else rt?(ot&&e.texStorage2D(i.TEXTURE_2D,Kt,$,Y.width,Y.height),At&&Re(v,Y,lt,R)):e.texImage2D(i.TEXTURE_2D,0,$,Y.width,Y.height,0,lt,R,Y.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){rt&&ot&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Kt,$,ut[0].width,ut[0].height,Y.depth);for(let st=0,Lt=ut.length;st<Lt;st++)if(X=ut[st],v.format!==Jn)if(lt!==null)if(rt){if(At)if(v.layerUpdates.size>0){const Wt=Dc(X.width,X.height,v.format,v.type);for(const gt of v.layerUpdates){const ge=X.data.subarray(gt*Wt/X.data.BYTES_PER_ELEMENT,(gt+1)*Wt/X.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,st,0,0,gt,X.width,X.height,1,lt,ge)}}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,st,0,0,0,X.width,X.height,Y.depth,lt,X.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,st,$,X.width,X.height,Y.depth,0,X.data,0,0);else Gt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else rt?At&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,st,0,0,0,X.width,X.height,Y.depth,lt,R,X.data):e.texImage3D(i.TEXTURE_2D_ARRAY,st,$,X.width,X.height,Y.depth,0,lt,R,X.data);v.layerUpdates.size>0&&v.clearLayerUpdates()}else{rt&&ot&&e.texStorage2D(i.TEXTURE_2D,Kt,$,ut[0].width,ut[0].height);for(let st=0,Lt=ut.length;st<Lt;st++)X=ut[st],v.format!==Jn?lt!==null?rt?At&&e.compressedTexSubImage2D(i.TEXTURE_2D,st,0,0,X.width,X.height,lt,X.data):e.compressedTexImage2D(i.TEXTURE_2D,st,$,X.width,X.height,0,X.data):Gt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):rt?At&&e.texSubImage2D(i.TEXTURE_2D,st,0,0,X.width,X.height,lt,R,X.data):e.texImage2D(i.TEXTURE_2D,st,$,X.width,X.height,0,lt,R,X.data)}else if(v.isDataArrayTexture)if(rt){if(ot&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Kt,$,Y.width,Y.height,Y.depth),At)if(v.layerUpdates.size>0){const st=Dc(Y.width,Y.height,v.format,v.type);for(const Lt of v.layerUpdates){const Wt=Y.data.subarray(Lt*st/Y.data.BYTES_PER_ELEMENT,(Lt+1)*st/Y.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Lt,Y.width,Y.height,1,lt,R,Wt)}v.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,Y.width,Y.height,Y.depth,lt,R,Y.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,$,Y.width,Y.height,Y.depth,0,lt,R,Y.data);else if(v.isData3DTexture)rt?(ot&&e.texStorage3D(i.TEXTURE_3D,Kt,$,Y.width,Y.height,Y.depth),At&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,Y.width,Y.height,Y.depth,lt,R,Y.data)):e.texImage3D(i.TEXTURE_3D,0,$,Y.width,Y.height,Y.depth,0,lt,R,Y.data);else if(v.isFramebufferTexture){if(ot)if(rt)e.texStorage2D(i.TEXTURE_2D,Kt,$,Y.width,Y.height);else{let st=Y.width,Lt=Y.height;for(let Wt=0;Wt<Kt;Wt++)e.texImage2D(i.TEXTURE_2D,Wt,$,st,Lt,0,lt,R,null),st>>=1,Lt>>=1}}else if(v.isHTMLTexture){if("texElementImage2D"in i){const st=i.canvas;if(st.hasAttribute("layoutsubtree")||st.setAttribute("layoutsubtree","true"),Y.parentNode!==st){st.appendChild(Y),d.add(v),st.onpaint=Lt=>{const Wt=Lt.changedElements;for(const gt of d)Wt.includes(gt.image)&&(gt.needsUpdate=!0)},st.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,Y);else{const Wt=i.RGBA,gt=i.RGBA,ge=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Wt,gt,ge,Y)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(ut.length>0){if(rt&&ot){const st=Ft(ut[0]);e.texStorage2D(i.TEXTURE_2D,Kt,$,st.width,st.height)}for(let st=0,Lt=ut.length;st<Lt;st++)X=ut[st],rt?At&&e.texSubImage2D(i.TEXTURE_2D,st,0,0,lt,R,X):e.texImage2D(i.TEXTURE_2D,st,$,lt,R,X);v.generateMipmaps=!1}else if(rt){if(ot){const st=Ft(Y);e.texStorage2D(i.TEXTURE_2D,Kt,$,st.width,st.height)}At&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,lt,R,Y)}else e.texImage2D(i.TEXTURE_2D,0,$,lt,R,Y);E(v)&&v.mipmapsAutoUpdate===!0&&b(tt),ht.__version=at.version,v.onUpdate&&v.onUpdate(v)}T.__version=v.version}function Xe(T,v,O){if(v.image.length!==6)return;const tt=xe(T,v),J=v.source;e.bindTexture(i.TEXTURE_CUBE_MAP,T.__webglTexture,i.TEXTURE0+O);const at=n.get(J);if(J.version!==at.__version||tt===!0){e.activeTexture(i.TEXTURE0+O);const ht=re.getPrimaries(re.workingColorSpace),q=v.colorSpace===vi?null:re.getPrimaries(v.colorSpace),Y=v.colorSpace===vi||ht===q?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Y);const lt=v.isCompressedTexture||v.image[0].isCompressedTexture,R=v.image[0]&&v.image[0].isDataTexture,$=[];for(let gt=0;gt<6;gt++)!lt&&!R?$[gt]=M(v.image[gt],!0,s.maxCubemapSize):$[gt]=R?v.image[gt].image:v.image[gt],$[gt]=Pt(v,$[gt]);const X=$[0],ut=r.convert(v.format,v.colorSpace),rt=r.convert(v.type);let ot=w(v.internalFormat,ut,rt,v.normalized,v.colorSpace);const At=v.isVideoTexture!==!0,Kt=at.__version===void 0||tt===!0,st=J.dataReady;let Lt=y(v,X);he(i.TEXTURE_CUBE_MAP,v);let Wt;if(v.isDepthTexture){if(ot=g(v.format===Si,v.type),Kt)if(At)e.texStorage2D(i.TEXTURE_CUBE_MAP,1,ot,X.width,X.height);else for(let gt=0;gt<6;gt++)e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,ot,X.width,X.height,0,ut,rt,null)}else if(lt){At&&Kt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,Lt,ot,X.width,X.height);for(let gt=0;gt<6;gt++){Wt=$[gt].mipmaps;for(let ge=0;ge<Wt.length;ge++){const it=Wt[ge];v.format!==Jn?ut!==null?At?st&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,ge,0,0,it.width,it.height,ut,it.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,ge,ot,it.width,it.height,0,it.data):Gt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):At?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,ge,0,0,it.width,it.height,ut,rt,it.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,ge,ot,it.width,it.height,0,ut,rt,it.data)}}}else{if(Wt=v.mipmaps,At&&Kt){Wt.length>0&&Lt++;const gt=Ft($[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,Lt,ot,gt.width,gt.height)}for(let gt=0;gt<6;gt++)if(R){At?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,0,0,$[gt].width,$[gt].height,ut,rt,$[gt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,ot,$[gt].width,$[gt].height,0,ut,rt,$[gt].data);for(let ge=0;ge<Wt.length;ge++){const Mt=Wt[ge].image[gt].image;At?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,ge+1,0,0,Mt.width,Mt.height,ut,rt,Mt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,ge+1,ot,Mt.width,Mt.height,0,ut,rt,Mt.data)}}else{At?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,0,0,ut,rt,$[gt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,ot,ut,rt,$[gt]);for(let ge=0;ge<Wt.length;ge++){const it=Wt[ge];At?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,ge+1,0,0,ut,rt,it.image[gt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,ge+1,ot,ut,rt,it.image[gt])}}}E(v)&&v.mipmapsAutoUpdate===!0&&b(i.TEXTURE_CUBE_MAP),at.__version=J.version,v.onUpdate&&v.onUpdate(v)}T.__version=v.version}function be(T,v,O,tt,J,at){const ht=r.convert(O.format,O.colorSpace),q=r.convert(O.type),Y=w(O.internalFormat,ht,q,O.normalized,O.colorSpace),lt=n.get(v),R=n.get(O);if(R.__renderTarget=v,!lt.__hasExternalTextures){const $=Math.max(1,v.width>>at),X=Math.max(1,v.height>>at);J===i.TEXTURE_3D||J===i.TEXTURE_2D_ARRAY?e.texImage3D(J,at,Y,$,X,v.depth,0,ht,q,null):e.texImage2D(J,at,Y,$,X,0,ht,q,null)}e.bindFramebuffer(i.FRAMEBUFFER,T),mt(v)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,tt,J,R.__webglTexture,0,Ee(v)):(J===i.TEXTURE_2D||J>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,tt,J,R.__webglTexture,at),e.bindFramebuffer(i.FRAMEBUFFER,null)}function fn(T,v,O){if(i.bindRenderbuffer(i.RENDERBUFFER,T),v.depthBuffer){const tt=v.depthTexture,J=tt&&tt.isDepthTexture?tt.type:null,at=g(v.stencilBuffer,J),ht=v.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;mt(v)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ee(v),at,v.width,v.height):O?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ee(v),at,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,at,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ht,i.RENDERBUFFER,T)}else{const tt=v.textures;for(let J=0;J<tt.length;J++){const at=tt[J],ht=r.convert(at.format,at.colorSpace),q=r.convert(at.type),Y=w(at.internalFormat,ht,q,at.normalized,at.colorSpace);mt(v)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ee(v),Y,v.width,v.height):O?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ee(v),Y,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,Y,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Fe(T,v,O){const tt=v.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,T),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const J=n.get(v.depthTexture);J.__renderTarget=v;const at=tt?v.depthTexture.image[0]:v.depthTexture.image;(!J.__webglTexture||at.width!==v.width||at.height!==v.height)&&(at.width=v.width,at.height=v.height,v.depthTexture.needsUpdate=!0),tt?dt(v.depthTexture,0):_t(v.depthTexture,0);const ht=J.__webglTexture,q=Ee(v),Y=tt?i.TEXTURE_CUBE_MAP_POSITIVE_X+O:i.TEXTURE_2D,lt=v.depthTexture.format===Si?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(v.depthTexture.format===bi)mt(v)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,lt,Y,ht,0,q):i.framebufferTexture2D(i.FRAMEBUFFER,lt,Y,ht,0);else if(v.depthTexture.format===Si)mt(v)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,lt,Y,ht,0,q):i.framebufferTexture2D(i.FRAMEBUFFER,lt,Y,ht,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function yn(T){const v=n.get(T),O=T.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==T.depthTexture){const tt=T.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),tt){const J=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,tt.removeEventListener("dispose",J)};tt.addEventListener("dispose",J),v.__depthDisposeCallback=J}v.__boundDepthTexture=tt}if(T.depthTexture&&!v.__autoAllocateDepthBuffer)if(O)for(let tt=0;tt<6;tt++)Fe(v.__webglFramebuffer[tt],T,tt);else T.texture.mipmaps.length>0?Fe(v.__webglFramebuffer[0],T,0):Fe(v.__webglFramebuffer,T,0);else if(O){v.__webglDepthbuffer=[];for(let tt=0;tt<6;tt++)if(e.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[tt]),v.__webglDepthbuffer[tt]===void 0)v.__webglDepthbuffer[tt]=i.createRenderbuffer(),fn(v.__webglDepthbuffer[tt],T,!1);else{const J=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,at=v.__webglDepthbuffer[tt];i.bindRenderbuffer(i.RENDERBUFFER,at),i.framebufferRenderbuffer(i.FRAMEBUFFER,J,i.RENDERBUFFER,at)}}else if(T.texture.mipmaps.length>0?e.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=i.createRenderbuffer(),fn(v.__webglDepthbuffer,T,!1);else{const J=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,at=v.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,at),i.framebufferRenderbuffer(i.FRAMEBUFFER,J,i.RENDERBUFFER,at)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function pn(T,v,O){const tt=n.get(T);v!==void 0&&be(tt.__webglFramebuffer,T,T.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),O!==void 0&&yn(T)}function Je(T){const v=T.texture,O=n.get(T),tt=n.get(v);T.addEventListener("dispose",F),L(T);const J=T.textures,at=T.isWebGLCubeRenderTarget===!0,ht=J.length>1;if(ht||(tt.__webglTexture===void 0&&(tt.__webglTexture=i.createTexture()),tt.__version=v.version,a.memory.textures++),at){O.__webglFramebuffer=[];for(let q=0;q<6;q++)if(v.mipmaps.length>0){O.__webglFramebuffer[q]=[];for(let Y=0;Y<v.mipmaps.length;Y++)O.__webglFramebuffer[q][Y]=i.createFramebuffer()}else O.__webglFramebuffer[q]=i.createFramebuffer()}else{if(v.mipmaps.length>0){O.__webglFramebuffer=[];for(let q=0;q<v.mipmaps.length;q++)O.__webglFramebuffer[q]=i.createFramebuffer()}else O.__webglFramebuffer=i.createFramebuffer();if(ht)for(let q=0,Y=J.length;q<Y;q++){const lt=n.get(J[q]);lt.__webglTexture===void 0&&(lt.__webglTexture=i.createTexture(),a.memory.textures++)}if(T.samples>0&&mt(T)===!1){O.__webglMultisampledFramebuffer=i.createFramebuffer(),O.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let q=0;q<J.length;q++){const Y=J[q];O.__webglColorRenderbuffer[q]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,O.__webglColorRenderbuffer[q]);const lt=r.convert(Y.format,Y.colorSpace),R=r.convert(Y.type),$=w(Y.internalFormat,lt,R,Y.normalized,Y.colorSpace,T.isXRRenderTarget===!0),X=Ee(T);i.renderbufferStorageMultisample(i.RENDERBUFFER,X,$,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+q,i.RENDERBUFFER,O.__webglColorRenderbuffer[q])}i.bindRenderbuffer(i.RENDERBUFFER,null),T.depthBuffer&&(O.__webglDepthRenderbuffer=i.createRenderbuffer(),fn(O.__webglDepthRenderbuffer,T,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(at){e.bindTexture(i.TEXTURE_CUBE_MAP,tt.__webglTexture),he(i.TEXTURE_CUBE_MAP,v);for(let q=0;q<6;q++)if(v.mipmaps.length>0)for(let Y=0;Y<v.mipmaps.length;Y++)be(O.__webglFramebuffer[q][Y],T,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+q,Y);else be(O.__webglFramebuffer[q],T,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+q,0);E(v)?b(i.TEXTURE_CUBE_MAP):v.mipmaps.length>0&&i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_MAX_LEVEL,v.mipmaps.length-1),e.unbindTexture()}else if(ht){for(let q=0,Y=J.length;q<Y;q++){const lt=J[q],R=n.get(lt);let $=i.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&($=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture($,R.__webglTexture),he($,lt),be(O.__webglFramebuffer,T,lt,i.COLOR_ATTACHMENT0+q,$,0),E(lt)&&b($)}e.unbindTexture()}else{let q=i.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(q=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(q,tt.__webglTexture),he(q,v),v.mipmaps.length>0)for(let Y=0;Y<v.mipmaps.length;Y++)be(O.__webglFramebuffer[Y],T,v,i.COLOR_ATTACHMENT0,q,Y);else be(O.__webglFramebuffer,T,v,i.COLOR_ATTACHMENT0,q,0);E(v)?b(q):v.mipmaps.length>0&&i.texParameteri(q,i.TEXTURE_MAX_LEVEL,v.mipmaps.length-1),e.unbindTexture()}T.depthBuffer&&yn(T)}function U(T){const v=T.textures;for(let O=0,tt=v.length;O<tt;O++){const J=v[O];if(E(J)&&J.mipmapsAutoUpdate===!0){const at=A(T),ht=n.get(J).__webglTexture;e.bindTexture(at,ht),b(at),e.unbindTexture()}}}const bn=[];function ve(T){if(T.samples>0){if(mt(T)===!1){const v=T.textures,O=T.width,tt=T.height;let J=i.COLOR_BUFFER_BIT;const at=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ht=n.get(T),q=v.length>1;if(q)for(let lt=0;lt<v.length;lt++)e.bindFramebuffer(i.FRAMEBUFFER,ht.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+lt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,ht.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+lt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,ht.__webglMultisampledFramebuffer),T.texture.mipmaps.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ht.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ht.__webglFramebuffer);for(let lt=0;lt<v.length;lt++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(J|=i.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(J|=i.STENCIL_BUFFER_BIT)),q){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ht.__webglColorRenderbuffer[lt]);const R=n.get(v[lt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,R,0)}i.blitFramebuffer(0,0,O,tt,0,0,O,tt,J,i.NEAREST),o===!0&&(bn.length=0,bn.push(i.COLOR_ATTACHMENT0+lt),T.depthBuffer&&T.storeMultisampledDepthBuffer===!1&&bn.push(at),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,bn))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),q)for(let lt=0;lt<v.length;lt++){e.bindFramebuffer(i.FRAMEBUFFER,ht.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+lt,i.RENDERBUFFER,ht.__webglColorRenderbuffer[lt]);const R=n.get(v[lt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,ht.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+lt,i.TEXTURE_2D,R,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ht.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.storeMultisampledDepthBuffer===!1&&o){const v=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[v])}}}function Ee(T){return Math.min(s.maxSamples,T.samples)}function mt(T){const v=n.get(T);return T.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function Ue(T){const v=a.render.frame;h.get(T)!==v&&(h.set(T,v),T.update())}function Pt(T,v){const O=T.colorSpace,tt=T.format,J=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||O!==la&&O!==vi&&(re.getTransfer(O)===Me?(tt!==Jn||J!==Dn)&&Gt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):de("WebGLTextures: Unsupported texture color space:",O)),v}function Ft(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(c.width=T.naturalWidth||T.width,c.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(c.width=T.displayWidth,c.height=T.displayHeight):(c.width=T.width,c.height=T.height),c}this.allocateTextureUnit=zt,this.resetTextureUnits=Q,this.getTextureUnits=j,this.setTextureUnits=bt,this.setTexture2D=_t,this.setTexture2DArray=St,this.setTexture3D=It,this.setTextureCube=dt,this.rebindTextures=pn,this.setupRenderTarget=Je,this.updateRenderTargetMipmap=U,this.updateMultisampleRenderTarget=ve,this.setupDepthRenderbuffer=yn,this.setupFrameBufferTexture=be,this.useMultisampledRTT=mt,this.dispose=G}function Bg(i,t){function e(n,s=vi){let r;const a=re.getTransfer(s);if(n===Dn)return i.UNSIGNED_BYTE;if(n===gl)return i.UNSIGNED_SHORT_4_4_4_4;if(n===_l)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Sh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===yh)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===vh)return i.BYTE;if(n===Mh)return i.SHORT;if(n===er)return i.UNSIGNED_SHORT;if(n===ml)return i.INT;if(n===Qn)return i.UNSIGNED_INT;if(n===Vn)return i.FLOAT;if(n===An)return i.HALF_FLOAT;if(n===bh)return i.ALPHA;if(n===wh)return i.RGB;if(n===Jn)return i.RGBA;if(n===bi)return i.DEPTH_COMPONENT;if(n===Si)return i.DEPTH_STENCIL;if(n===xl)return i.RED;if(n===vl)return i.RED_INTEGER;if(n===ki)return i.RG;if(n===Ml)return i.RG_INTEGER;if(n===Sl)return i.RGBA_INTEGER;if(n===Jr||n===Qr||n===jr||n===ta)if(a===Me)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Jr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Qr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===jr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ta)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Jr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Qr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===jr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ta)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===vo||n===Mo||n===So||n===yo)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===vo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Mo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===So)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===yo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===bo||n===wo||n===Eo||n===To||n===Ao||n===aa||n===Ro)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===bo||n===wo)return a===Me?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Eo)return a===Me?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===To)return r.COMPRESSED_R11_EAC;if(n===Ao)return r.COMPRESSED_SIGNED_R11_EAC;if(n===aa)return r.COMPRESSED_RG11_EAC;if(n===Ro)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Co||n===Po||n===Lo||n===Do||n===Io||n===No||n===Uo||n===Fo||n===Oo||n===Bo||n===zo||n===ko||n===Go||n===Ho)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Co)return a===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Po)return a===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Lo)return a===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Do)return a===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Io)return a===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===No)return a===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Uo)return a===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Fo)return a===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Oo)return a===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Bo)return a===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===zo)return a===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ko)return a===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Go)return a===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ho)return a===Me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Vo||n===Wo||n===Xo)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Vo)return a===Me?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Wo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Xo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===qo||n===Yo||n===oa||n===Ko)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===qo)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Yo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===oa)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ko)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ss?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const zg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,kg=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Gg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new Hh(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new vn({vertexShader:zg,fragmentShader:kg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new et(new cn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Hg extends Hi{constructor(t,e){super();const n=this;let s=null,r=1,a=null,l="local-floor",o=1,c=null,h=null,d=null,u=null,f=null,_=null;const x=typeof XRWebGLBinding<"u",m=new Gg,p={},M=e.getContextAttributes();let E=null,b=null;const A=[],w=[],g=new Ct;let y=null,L=null;const P=new Nn;P.viewport=new De;const N=new Nn;N.viewport=new De;const F=[P,N],W=new Zd;let I=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let _t=A[Z];return _t===void 0&&(_t=new Ba,A[Z]=_t),_t.getTargetRaySpace()},this.getControllerGrip=function(Z){let _t=A[Z];return _t===void 0&&(_t=new Ba,A[Z]=_t),_t.getGripSpace()},this.getHand=function(Z){let _t=A[Z];return _t===void 0&&(_t=new Ba,A[Z]=_t),_t.getHandSpace()};function K(Z){const _t=w.indexOf(Z.inputSource);if(_t===-1)return;const St=A[_t];St!==void 0&&(St.update(Z.inputSource,Z.frame,c||a),St.dispatchEvent({type:Z.type,data:Z.inputSource}))}function k(){s.removeEventListener("select",K),s.removeEventListener("selectstart",K),s.removeEventListener("selectend",K),s.removeEventListener("squeeze",K),s.removeEventListener("squeezestart",K),s.removeEventListener("squeezeend",K),s.removeEventListener("end",k),s.removeEventListener("inputsourceschange",nt);for(let Z=0;Z<A.length;Z++){const _t=w[Z];_t!==null&&(w[Z]=null,A[Z].disconnect(_t))}I=null,G=null,m.reset();for(const Z in p)delete p[Z];if(t.setRenderTarget(E),f=null,u=null,d=null,s=null,b=null,zt.stop(),n.isPresenting=!1,t.setPixelRatio(y),t.setSize(g.width,g.height,!1),L!==null){const Z=L.camera;Z.fov=L.fov,Z.zoom=L.zoom,Z.updateProjectionMatrix(),L=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){r=Z,n.isPresenting===!0&&Gt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){l=Z,n.isPresenting===!0&&Gt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Z){c=Z},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d===null&&x&&(d=new XRWebGLBinding(s,e)),d},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(Z){if(s=Z,s!==null){if(E=t.getRenderTarget(),s.addEventListener("select",K),s.addEventListener("selectstart",K),s.addEventListener("selectend",K),s.addEventListener("squeeze",K),s.addEventListener("squeezestart",K),s.addEventListener("squeezeend",K),s.addEventListener("end",k),s.addEventListener("inputsourceschange",nt),M.xrCompatible!==!0&&await e.makeXRCompatible(),y=t.getPixelRatio(),t.getSize(g),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let St=null,It=null,dt=null;M.depth&&(dt=M.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,St=M.stencil?Si:bi,It=M.stencil?Ss:Qn);const Vt={colorFormat:e.RGBA8,depthFormat:dt,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer(Vt),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),b=new Rn(u.textureWidth,u.textureHeight,{format:Jn,type:Dn,depthTexture:new bs(u.textureWidth,u.textureHeight,It,void 0,void 0,void 0,void 0,void 0,void 0,St),stencilBuffer:M.stencil,colorSpace:t.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{const St={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,St),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),b=new Rn(f.framebufferWidth,f.framebufferHeight,{format:Jn,type:Dn,colorSpace:t.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(o),c=null,a=await s.requestReferenceSpace(l),zt.setContext(s),zt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function nt(Z){for(let _t=0;_t<Z.removed.length;_t++){const St=Z.removed[_t],It=w.indexOf(St);It>=0&&(w[It]=null,A[It].disconnect(St))}for(let _t=0;_t<Z.added.length;_t++){const St=Z.added[_t];let It=w.indexOf(St);if(It===-1){for(let Vt=0;Vt<A.length;Vt++)if(Vt>=w.length){w.push(St),It=Vt;break}else if(w[Vt]===null){w[Vt]=St,It=Vt;break}if(It===-1)break}const dt=A[It];dt&&dt.connect(St)}}function V(Z,_t){_t===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(_t.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(s===null)return;let _t=Z.near,St=Z.far;m.texture!==null&&(m.depthNear>0&&(_t=m.depthNear),m.depthFar>0&&(St=m.depthFar)),W.near=N.near=P.near=_t,W.far=N.far=P.far=St,(I!==W.near||G!==W.far)&&(s.updateRenderState({depthNear:W.near,depthFar:W.far}),I=W.near,G=W.far),W.layers.mask=Z.layers.mask|6,P.layers.mask=W.layers.mask&-5,N.layers.mask=W.layers.mask&-3;const It=Z.parent,dt=W.cameras;V(W,It);for(let Vt=0;Vt<dt.length;Vt++)V(dt[Vt],It);W.projectionMatrix.copy(P.projectionMatrix),W.projectionMatrixInverse.copy(P.projectionMatrixInverse),L===null&&Z.isPerspectiveCamera&&(L={camera:Z,fov:Z.fov,zoom:Z.zoom}),Q(Z,W,It)};function Q(Z,_t,St){St===null?Z.matrix.copy(_t.matrixWorld):(Z.matrix.copy(St.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(_t.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(_t.projectionMatrix),Z.projectionMatrixInverse.copy(_t.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=ir*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return W},this.getFoveation=function(){if(!(u===null&&f===null))return o},this.setFoveation=function(Z){o=Z,u!==null&&(u.fixedFoveation=Z),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Z)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(W)},this.getCameraTexture=function(Z){return p[Z]};let j=null;function bt(Z,_t){if(h=_t.getViewerPose(c||a),_=_t,h!==null){const St=h.views;f!==null&&(t.setRenderTargetFramebuffer(b,f.framebuffer),t.setRenderTarget(b));let It=!1;St.length!==W.cameras.length&&(W.cameras.length=0,It=!0);for(let Nt=0;Nt<St.length;Nt++){const he=St[Nt];let xe=null;if(f!==null)xe=f.getViewport(he);else{const Re=d.getViewSubImage(u,he);xe=Re.viewport,Nt===0&&(t.setRenderTargetTextures(b,Re.colorTexture,Re.depthStencilTexture),t.setRenderTarget(b))}let Jt=F[Nt];Jt===void 0&&(Jt=new Nn,Jt.layers.enable(Nt),Jt.viewport=new De,F[Nt]=Jt),Jt.matrix.fromArray(he.transform.matrix),Jt.matrix.decompose(Jt.position,Jt.quaternion,Jt.scale),Jt.projectionMatrix.fromArray(he.projectionMatrix),Jt.projectionMatrixInverse.copy(Jt.projectionMatrix).invert(),Jt.viewport.set(xe.x,xe.y,xe.width,xe.height),Nt===0&&(W.matrix.copy(Jt.matrix),W.matrix.decompose(W.position,W.quaternion,W.scale)),It===!0&&W.cameras.push(Jt)}const dt=s.enabledFeatures;if(dt&&dt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&x){d=n.getBinding();const Nt=d.getDepthInformation(St[0]);Nt&&Nt.isValid&&Nt.texture&&m.init(Nt,s.renderState)}if(dt&&dt.includes("camera-access")&&x){t.state.unbindTexture(),d=n.getBinding();for(let Nt=0;Nt<St.length;Nt++){const he=St[Nt].camera;if(he){let xe=p[he];xe||(xe=new Hh,p[he]=xe);const Jt=d.getCameraImage(he);xe.sourceTexture=Jt}}}}for(let St=0;St<A.length;St++){const It=w[St],dt=A[St];It!==null&&dt!==void 0&&dt.update(It,_t,c||a)}j&&j(Z,_t),_t.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:_t}),_=null}const zt=new Yh;zt.setAnimationLoop(bt),this.setAnimationLoop=function(Z){j=Z},this.dispose=function(){}}}const Vg=new le,iu=new Xt;iu.set(-1,0,0,0,1,0,0,0,1);function Wg(i,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Vh(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,M,E,b){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(m,p):p.isMeshLambertMaterial?(r(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(m,p),d(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(m,p),u(m,p),p.isMeshPhysicalMaterial&&f(m,p,b)):p.isMeshMatcapMaterial?(r(m,p),_(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),x(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&l(m,p)):p.isPointsMaterial?o(m,p,M,E):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Mn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Mn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const M=t.get(p),E=M.envMap,b=M.envMapRotation;E&&(m.envMap.value=E,m.envMapRotation.value.setFromMatrix4(Vg.makeRotationFromEuler(b)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(iu),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function l(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function o(m,p,M,E){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*M,m.scale.value=E*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,M){m.ior.value=p.ior,p.diffuseRoughness>0&&(m.diffuseRoughness.value=p.diffuseRoughness,p.diffuseRoughnessMap&&(m.diffuseRoughnessMap.value=p.diffuseRoughnessMap,e(p.diffuseRoughnessMap,m.diffuseRoughnessMapTransform))),p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Mn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.retroreflectivity>0&&(m.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessMinimum,m.iridescenceThicknessMaximum.value=p.iridescenceThicknessMaximum,p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,p){p.matcap&&(m.matcap.value=p.matcap)}function x(m,p){const M=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Xg(i,t,e,n){let s={},r={};function a(M,E){const b=E.program;n.uniformBlockBinding(M,b,s[M.id])}function l(M,E){let b=s[M.id];b===void 0&&(_(M),b=o(M),s[M.id]=b,M.addEventListener("dispose",m));const A=E.program;n.updateUBOMapping(M,A);const w=t.render.frame;r[M.id]!==w&&(c(M),r[M.id]=w)}function o(M){const E=i.createBuffer(),b=M.__size,A=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,E),i.bufferData(i.UNIFORM_BUFFER,b,A),i.bindBuffer(i.UNIFORM_BUFFER,null),E}function c(M){const E=s[M.id],b=M.uniforms,A=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,E);for(let w=0,g=b.length;w<g;w++){const y=b[w];if(Array.isArray(y))for(let L=0,P=y.length;L<P;L++)h(y[L],w,L,A);else h(y,w,0,A)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function h(M,E,b,A){if(u(M,E,b,A)===!0){const w=M.__offset,g=M.value;if(Array.isArray(g)){let y=0;for(let L=0;L<g.length;L++){const P=g[L],N=x(P,!0);d(P,M.__data,y),y+=N.storage/Float32Array.BYTES_PER_ELEMENT}}else d(g,M.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,w,M.__data)}}function d(M,E,b){typeof M=="number"||typeof M=="boolean"?E[b]=M:M.isMatrix3?(E[b]=M.elements[0],E[b+1]=M.elements[1],E[b+2]=M.elements[2],E[b+3]=0,E[b+4]=M.elements[3],E[b+5]=M.elements[4],E[b+6]=M.elements[5],E[b+7]=0,E[b+8]=M.elements[6],E[b+9]=M.elements[7],E[b+10]=M.elements[8],E[b+11]=0):ArrayBuffer.isView(M)?E.set(M.subarray(0,E.length-b),b):M.toArray(E,b)}function u(M,E,b,A){const w=M.value,g=E+"_"+b;if(Array.isArray(w)){A[g]===void 0&&(A[g]=[]);const y=A[g];let L=!1;for(let P=0;P<w.length;P++)f(w[P],y,P)===!0&&(L=!0);return L}return f(w,A,g)}function f(M,E,b){if(E[b]===void 0)return typeof M=="number"||typeof M=="boolean"?E[b]=M:ArrayBuffer.isView(M)?E[b]=M.slice():E[b]=M.clone(),!0;{const A=E[b];if(typeof M=="number"||typeof M=="boolean"){if(A!==M)return E[b]=M,!0}else{if(ArrayBuffer.isView(M))return!0;if(A.equals(M)===!1)return A.copy(M),!0}}return!1}function _(M){const E=M.uniforms;let b=0;const A=16;for(let g=0,y=E.length;g<y;g++){const L=Array.isArray(E[g])?E[g]:[E[g]];for(let P=0,N=L.length;P<N;P++){const F=L[P],W=Array.isArray(F.value)?F.value:[F.value],I=Array.isArray(E[g])||Array.isArray(F.value);let G=b;for(let k=0,nt=W.length;k<nt;k++){const V=W[k],Q=x(V,I),j=b%A,bt=j%Q.boundary,zt=j+bt;b+=bt,zt!==0&&A-zt<Q.storage&&(b+=A-zt),k===0&&(G=b),b+=Q.storage}const K=F.type==="int"?Int32Array:F.type==="uint"?Uint32Array:Float32Array;F.__data=new K((b-G)/Float32Array.BYTES_PER_ELEMENT),F.__offset=G}}const w=b%A;return w>0&&(b+=A-w),M.__size=b,M.__cache={},this}function x(M,E){const b={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(b.boundary=4,b.storage=4):M.isVector2?(b.boundary=8,b.storage=8):M.isVector3||M.isColor?(b.boundary=16,b.storage=12):M.isVector4?(b.boundary=16,b.storage=16):M.isMatrix3?(b.boundary=16,b.storage=48):M.isMatrix4?(b.boundary=16,b.storage=64):M.isTexture?Gt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(M)?(b.boundary=16,b.storage=M.byteLength):Gt("WebGLRenderer: Unsupported uniform value type.",M),E===!0&&(b.boundary=16,b.storage=Math.ceil(b.storage/16)*16),b}function m(M){const E=M.target;E.removeEventListener("dispose",m),i.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function p(){for(const M in s)i.deleteBuffer(s[M]);s={},r={}}return{bind:a,update:l,dispose:p}}const qg=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Kn=null;function Yg(){return Kn===null&&(Kn=new Oh(qg,16,16,ki,An),Kn.name="DFG_LUT",Kn.minFilter=En,Kn.magFilter=En,Kn.wrapS=oi,Kn.wrapT=oi,Kn.generateMipmaps=!1,Kn.needsUpdate=!0),Kn}class Kg{constructor(t={}){const{canvas:e=ju(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:l=!1,premultipliedAlpha:o=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:f=Dn}=t;this.isWebGLRenderer=!0;let _;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=n.getContextAttributes().alpha}else _=a;const x=f,m=new Set([Sl,Ml,vl]),p=new Set([Dn,Qn,er,Ss,gl,_l]),M=new Uint32Array(4),E=new Int32Array(4),b={textures:[],min:[],max:[],resolution:[]};let A=null,w=null;const g=[],y=[];let L=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ci,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const P=this;let N=!1,F=null,W=null,I=null,G=null;this._outputColorSpace=tn;let K=0,k=0,nt=null,V=-1,Q=null;const j=new De,bt=new De;let zt=null;const Z=new Dt(0);let _t=0,St=e.width,It=e.height,dt=1,Vt=null,Ie=null;const Nt=new De(0,0,St,It),he=new De(0,0,St,It);let xe=!1;const Jt=new sr,Re=new Rl;let Ne=!1,Xe=!1;const be=new le,fn=new C,Fe=new De,yn={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let pn=!1;function Je(){return nt===null?dt:1}let U=n;function bn(S,D){return e.getContext(S,D)}let ve,Ee,mt,Ue,Pt,Ft,T,v,O,tt,J,at,ht,q,Y,lt,R,$,X,ut,rt,ot,At;try{const S={alpha:!0,depth:s,stencil:r,antialias:l,premultipliedAlpha:o,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${ll}`),e.addEventListener("webglcontextlost",Lt,!1),e.addEventListener("webglcontextrestored",Wt,!1),e.addEventListener("webglcontextcreationerror",gt,!1),U===null){const D="webgl2";if(U=bn(D,S),U===null)throw bn(D)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Kt()}catch(S){throw e.removeEventListener("webglcontextlost",Lt,!1),e.removeEventListener("webglcontextrestored",Wt,!1),e.removeEventListener("webglcontextcreationerror",gt,!1),de("WebGLRenderer: "+S.message),S}function Kt(){ve=new Jm(U),ve.init(),rt=new Bg(U,ve),Ee=new km(U,ve,t,rt),mt=new Fg(U,ve),Ee.reversedDepthBuffer&&u&&mt.buffers.depth.setReversed(!0),W=U.createFramebuffer(),I=U.createFramebuffer(),G=U.createFramebuffer(),Ue=new t0(U),Pt=new yg,Ft=new Og(U,ve,mt,Pt,Ee,rt,Ue),T=new Zm(P),v=new ef(U),ot=new Bm(U,v),O=new Qm(U,v,Ue,ot),tt=new n0(U,O,v,ot,Ue),$=new e0(U,Ee,Ft),Y=new Gm(Pt),J=new Sg(P,T,ve,Ee,ot,Y),at=new Wg(P,Pt),ht=new wg,q=new Pg(ve),R=new Om(P,T,mt,tt,_,o),lt=new Ug(P,tt,Ee),At=new Xg(U,Ue,Ee,mt),X=new zm(U,ve,Ue),ut=new jm(U,ve,Ue),Ue.programs=J.programs,P.capabilities=Ee,P.extensions=ve,P.properties=Pt,P.renderLists=ht,P.shadowMap=lt,P.state=mt,P.info=Ue}x!==Dn&&(L=new s0(x,e.width,e.height,l,s,r));const st=new Hg(P,U);this.xr=st,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const S=ve.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=ve.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return dt},this.setPixelRatio=function(S){S!==void 0&&(dt=S,this.setSize(St,It,!1))},this.getSize=function(S){return S.set(St,It)},this.setSize=function(S,D,H=!0){if(st.isPresenting){Gt("WebGLRenderer: Can't change size while VR device is presenting.");return}St=S,It=D,e.width=Math.floor(S*dt),e.height=Math.floor(D*dt),H===!0&&(e.style.width=S+"px",e.style.height=D+"px"),L!==null&&L.setSize(e.width,e.height),this.setViewport(0,0,S,D)},this.getDrawingBufferSize=function(S){return S.set(St*dt,It*dt).floor()},this.setDrawingBufferSize=function(S,D,H){St=S,It=D,dt=H,e.width=Math.floor(S*H),e.height=Math.floor(D*H),this.setViewport(0,0,S,D)},this.setEffects=function(S){if(x===Dn){de("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(S){for(let D=0;D<S.length;D++)if(S[D].isOutputPass===!0){Gt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}L.setEffects(S||[])},this.getCurrentViewport=function(S){return S.copy(j)},this.getViewport=function(S){return S.copy(Nt)},this.setViewport=function(S,D,H,B){S.isVector4?Nt.set(S.x,S.y,S.z,S.w):Nt.set(S,D,H,B),mt.viewport(j.copy(Nt).multiplyScalar(Je()).round())},this.getScissor=function(S){return S.copy(he)},this.setScissor=function(S,D,H,B){S.isVector4?he.set(S.x,S.y,S.z,S.w):he.set(S,D,H,B),mt.scissor(bt.copy(he).multiplyScalar(Je()).round())},this.getScissorTest=function(){return xe},this.setScissorTest=function(S){mt.setScissorTest(xe=S)},this.setOpaqueSort=function(S){Vt=S},this.setTransparentSort=function(S){Ie=S},this.getClearColor=function(S){return S.copy(R.getClearColor())},this.setClearColor=function(){R.setClearColor(...arguments)},this.getClearAlpha=function(){return R.getClearAlpha()},this.setClearAlpha=function(){R.setClearAlpha(...arguments)},this.clear=function(S=!0,D=!0,H=!0){let B=0;if(S){let z=!1;if(nt!==null){const pt=nt.texture.format;z=m.has(pt)}if(z){const pt=nt.texture.type,wt=p.has(pt),ft=R.getClearColor(),vt=R.getClearAlpha(),Rt=ft.r,qt=ft.g,ie=ft.b;wt?(M[0]=Rt,M[1]=qt,M[2]=ie,M[3]=vt,U.clearBufferuiv(U.COLOR,0,M)):(E[0]=Rt,E[1]=qt,E[2]=ie,E[3]=vt,U.clearBufferiv(U.COLOR,0,E))}else B|=U.COLOR_BUFFER_BIT}D&&(B|=U.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),H&&(B|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),B!==0&&U.clear(B)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(S){S.setRenderer(this),F=S},this.dispose=function(){e.removeEventListener("webglcontextlost",Lt,!1),e.removeEventListener("webglcontextrestored",Wt,!1),e.removeEventListener("webglcontextcreationerror",gt,!1),R.dispose(),ht.dispose(),q.dispose(),Ft.dispose(),Pt.dispose(),T.dispose(),tt.dispose(),O.dispose(),ot.dispose(),At.dispose(),J.dispose(),st.dispose(),st.removeEventListener("sessionstart",Ut),st.removeEventListener("sessionend",Ge),Qt.stop()};function Lt(S){S.preventDefault(),ua("WebGLRenderer: Context Lost."),N=!0}function Wt(){ua("WebGLRenderer: Context Restored."),N=!1;const S=Ue.autoReset,D=lt.enabled,H=lt.autoUpdate,B=lt.needsUpdate,z=lt.type;Kt(),Ue.autoReset=S,lt.enabled=D,lt.autoUpdate=H,lt.needsUpdate=B,lt.type=z}function gt(S){de("WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function ge(S){const D=S.target;D.removeEventListener("dispose",ge),it(D)}function it(S){Mt(S),Pt.remove(S)}function Mt(S){const D=Pt.get(S).programs;D!==void 0&&(D.forEach(function(H){J.releaseProgram(H)}),S.isShaderMaterial&&J.releaseShaderCache(S))}this.renderBufferDirect=function(S,D,H,B,z,pt){D===null&&(D=yn);const wt=z.isMesh&&z.matrixWorld.determinantAffine()<0,ft=xu(S,D,H,B,z);mt.setMaterial(B,wt);let vt=H.index,Rt=1;if(B.wireframe===!0){if(vt=O.getWireframeAttribute(H),vt===void 0)return;Rt=2}const qt=H.drawRange,ie=H.attributes.position;let Et=qt.start*Rt,se=(qt.start+qt.count)*Rt;pt!==null&&(Et=Math.max(Et,pt.start*Rt),se=Math.min(se,(pt.start+pt.count)*Rt)),vt!==null?(Et=Math.max(Et,0),se=Math.min(se,vt.count)):ie!=null&&(Et=Math.max(Et,0),se=Math.min(se,ie.count));const Oe=se-Et;if(Oe<0||Oe===1/0)return;ot.setup(z,B,ft,H,vt);let Te,we=X;if(vt!==null&&(Te=v.get(vt),we=ut,we.setIndex(Te)),z.isMesh)B.wireframe===!0?(mt.setLineWidth(B.wireframeLinewidth*Je()),we.setMode(U.LINES)):we.setMode(U.TRIANGLES);else if(z.isLine){let sn=B.linewidth;sn===void 0&&(sn=1),mt.setLineWidth(sn*Je()),z.isLineSegments?we.setMode(U.LINES):z.isLineLoop?we.setMode(U.LINE_LOOP):we.setMode(U.LINE_STRIP)}else z.isPoints?we.setMode(U.POINTS):z.isSprite&&we.setMode(U.TRIANGLES);if(z.isBatchedMesh)if(ve.get("WEBGL_multi_draw"))we.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else{const sn=z._multiDrawStarts,Tt=z._multiDrawCounts,gn=z._multiDrawCount,_e=vt?v.get(vt).bytesPerElement:1,Ci=Pt.get(B).currentProgram.getUniforms();for(let rn=0;rn<gn;rn++)Ci.setValue(U,"_gl_DrawID",rn),we.render(sn[rn]/_e,Tt[rn])}else if(z.isInstancedMesh)we.renderInstances(Et,Oe,z.count);else if(H.isInstancedBufferGeometry){const sn=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,Tt=Math.min(H.instanceCount,sn);we.renderInstances(Et,Oe,Tt)}else we.render(Et,Oe)};function Ht(S,D,H,B){F!==null&&S.isNodeMaterial&&F.setObject(B,S),Ne===!0&&Y.setState(S,H,!1),S.transparent===!0&&S.side===Le&&S.forceSinglePass===!1?(S.side=Mn,S.needsUpdate=!0,Ri(S,D,B),S.side=zi,S.needsUpdate=!0,Ri(S,D,B),S.side=Le):Ri(S,D,B)}this.compile=function(S,D,H=null){H===null&&(H=S),F!==null&&F.renderStart(S,D,H),w=q.get(H),w.init(D),y.push(w),H.traverseVisible(function(z){z.isLight&&z.layers.test(D.layers)&&(w.pushLight(z),z.castShadow&&w.pushShadow(z))}),S!==H&&S.traverseVisible(function(z){z.isLight&&z.layers.test(D.layers)&&(w.pushLight(z),z.castShadow&&w.pushShadow(z))}),w.setupLights(),F!==null&&F.updateLights(w.state.lightsArray),Xe=this.localClippingEnabled,Ne=Y.init(this.clippingPlanes,Xe),Ne===!0&&Y.setGlobalState(this.clippingPlanes,D),F!==null&&lt.render(w.state.shadowsArray,H,D);const B=new Set;return S.traverse(function(z){if(!(z.isMesh||z.isPoints||z.isLine||z.isSprite))return;const pt=z.material;if(pt)if(Array.isArray(pt))for(let wt=0;wt<pt.length;wt++){const ft=pt[wt];Ht(ft,H,D,z),B.add(ft)}else Ht(pt,H,D,z),B.add(pt)}),w=y.pop(),F!==null&&F.renderEnd(),B},this.compileAsync=function(S,D,H=null){const B=this.compile(S,D,H);return new Promise(z=>{function pt(){if(B.forEach(function(wt){const vt=Pt.get(wt).currentProgram;(vt===void 0||vt.isReady())&&B.delete(wt)}),B.size===0){z(S);return}setTimeout(pt,10)}ve.get("KHR_parallel_shader_compile")!==null?pt():setTimeout(pt,10)})};let kt=null;function fe(S){kt&&kt(S)}function Ut(){Qt.stop()}function Ge(){Qt.start()}const Qt=new Yh;Qt.setAnimationLoop(fe),typeof self<"u"&&Qt.setContext(self),this.setAnimationLoop=function(S){kt=S,st.setAnimationLoop(S),S===null?Qt.stop():Qt.start()},st.addEventListener("sessionstart",Ut),st.addEventListener("sessionend",Ge),this.render=function(S,D){if(D!==void 0&&D.isCamera!==!0){de("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(N===!0)return;F!==null&&F.renderStart(S,D);const H=st.enabled===!0&&st.isPresenting===!0,B=L!==null&&(nt===null||H)&&L.begin(P,nt);if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),st.enabled===!0&&st.isPresenting===!0&&(L===null||L.isCompositing()===!1)&&(st.cameraAutoUpdate===!0&&st.updateCamera(D),D=st.getCamera()),S.isScene===!0&&S.onBeforeRender(P,S,D,nt),w=q.get(S,y.length),w.init(D),w.state.textureUnits=Ft.getTextureUnits(),y.push(w),be.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),D.isArrayCamera?Re.setFromArrayCamera(D):Jt.setFromProjectionMatrix(be,Wn,D.reversedDepth),Xe=this.localClippingEnabled,Ne=Y.init(this.clippingPlanes,Xe),A=ht.get(S,g.length),A.init(),g.push(A),this.info.render.frame++,st.enabled===!0&&st.isPresenting===!0){const wt=P.xr.getDepthSensingMesh();wt!==null&&wn(wt,D,-1/0,P.sortObjects)}wn(S,D,0,P.sortObjects),A.finish(),F!==null&&F.updateLights(w.state.lightsArray),P.sortObjects===!0&&A.sort(Vt,Ie),pn=st.enabled===!1||st.isPresenting===!1||st.hasDepthSensing()===!1,pn&&R.addToRenderList(A,S),this.info.autoReset===!0&&this.info.reset(),Ne===!0&&Y.beginShadows();const z=w.state.shadowsArray;if(lt.render(z,S,D),Ne===!0&&Y.endShadows(),(B&&L.hasRenderPass())===!1){const wt=A.opaque,ft=A.transmissive;if(w.setupLights(),D.isArrayCamera){const vt=D.cameras;if(ft.length>0)for(let Rt=0,qt=vt.length;Rt<qt;Rt++){const ie=vt[Rt];qe(wt,ft,S,ie)}pn&&R.render(S);for(let Rt=0,qt=vt.length;Rt<qt;Rt++){const ie=vt[Rt];mn(A,S,ie,ie.viewport)}}else ft.length>0&&qe(wt,ft,S,D),pn&&R.render(S),mn(A,S,D)}nt!==null&&k===0&&(Ft.updateMultisampleRenderTarget(nt),Ft.updateRenderTargetMipmap(nt)),B&&L.end(P),S.isScene===!0&&S.onAfterRender(P,S,D),ot.resetDefaultState(),V=-1,Q=null,y.pop(),y.length>0?(w=y[y.length-1],Ft.setTextureUnits(w.state.textureUnits),Ne===!0&&Y.setGlobalState(P.clippingPlanes,w.state.camera)):w=null,g.pop(),g.length>0?A=g[g.length-1]:A=null,F!==null&&F.renderEnd()};function wn(S,D,H,B){if(S.visible===!1)return;if(S.layers.test(D.layers)){if(S.isGroup)H=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(D);else if(S.isLight)w.pushLight(S),S.castShadow&&w.pushShadow(S);else if(S.isSprite){const wt=D.isArrayCamera?Re:Jt;if(!S.frustumCulled||S.intersectsFrustum(wt)){B&&Fe.setFromMatrixPosition(S.matrixWorld).applyMatrix4(be);const ft=tt.update(S),vt=S.material;vt.visible&&A.push(S,ft,vt,H,Fe.z,null,D)}}else if(S.isMesh||S.isLine||S.isPoints){const wt=D.isArrayCamera?Re:Jt;if(!S.frustumCulled||S.intersectsFrustum(wt)){const ft=tt.update(S),vt=S.material;if(B&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Fe.copy(S.boundingSphere.center)):(ft.boundingSphere===null&&ft.computeBoundingSphere(),Fe.copy(ft.boundingSphere.center)),Fe.applyMatrix4(S.matrixWorld).applyMatrix4(be)),Array.isArray(vt)){const Rt=ft.groups;for(let qt=0,ie=Rt.length;qt<ie;qt++){const Et=Rt[qt],se=vt[Et.materialIndex];se&&se.visible&&A.push(S,ft,se,H,Fe.z,Et,D)}}else vt.visible&&A.push(S,ft,vt,H,Fe.z,null,D)}}}const pt=S.children;for(let wt=0,ft=pt.length;wt<ft;wt++)wn(pt[wt],D,H,B)}function mn(S,D,H,B){const{opaque:z,transmissive:pt,transparent:wt}=S;w.setupLightsView(H),Ne===!0&&Y.setGlobalState(P.clippingPlanes,H),B&&mt.viewport(j.copy(B)),z.length>0&&nn(z,D,H),pt.length>0&&nn(pt,D,H),wt.length>0&&nn(wt,D,H),mt.buffers.depth.setTest(!0),mt.buffers.depth.setMask(!0),mt.buffers.color.setMask(!0),mt.setPolygonOffset(!1)}function qe(S,D,H,B){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[B.id]===void 0){const Et=ve.has("EXT_color_buffer_half_float")||ve.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[B.id]=new Rn(1,1,{generateMipmaps:!0,type:Et?An:Dn,minFilter:Mi,samples:Math.max(4,Ee.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:re.workingColorSpace})}const pt=w.state.transmissionRenderTarget[B.id],wt=B.viewport||j;pt.setSize(wt.z*P.transmissionResolutionScale,wt.w*P.transmissionResolutionScale);const ft=P.getRenderTarget(),vt=P.getActiveCubeFace(),Rt=P.getActiveMipmapLevel();P.setRenderTarget(pt),P.getClearColor(Z),_t=P.getClearAlpha(),_t<1&&P.setClearColor(16777215,.5),P.clear(),pn&&R.render(H);const qt=P.toneMapping;P.toneMapping=ci;const ie=B.viewport;if(B.viewport!==void 0&&(B.viewport=void 0),w.setupLightsView(B),Ne===!0&&Y.setGlobalState(P.clippingPlanes,B),nn(S,H,B),Ft.updateMultisampleRenderTarget(pt),Ft.updateRenderTargetMipmap(pt),ve.has("WEBGL_multisampled_render_to_texture")===!1){let Et=!1;for(let se=0,Oe=D.length;se<Oe;se++){const Te=D[se],{object:we,geometry:sn,material:Tt,group:gn}=Te;if(Tt.side===Le&&we.layers.test(B.layers)){const _e=Tt.side;Tt.side=Mn,Tt.needsUpdate=!0,qn(we,H,B,sn,Tt,gn),Tt.side=_e,Tt.needsUpdate=!0,Et=!0}}Et===!0&&(Ft.updateMultisampleRenderTarget(pt),Ft.updateRenderTargetMipmap(pt))}P.setRenderTarget(ft,vt,Rt),P.setClearColor(Z,_t),ie!==void 0&&(B.viewport=ie),P.toneMapping=qt}function nn(S,D,H){const B=D.isScene===!0?D.overrideMaterial:null;for(let z=0,pt=S.length;z<pt;z++){const wt=S[z],{object:ft,geometry:vt,group:Rt}=wt;let qt=wt.material;qt.allowOverride===!0&&B!==null&&(qt=B),ft.layers.test(H.layers)&&qn(ft,D,H,vt,qt,Rt)}}function qn(S,D,H,B,z,pt){F!==null&&z.isNodeMaterial&&F.setObject(S,z),S.onBeforeRender(P,D,H,B,z,pt),S.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),z.onBeforeRender(P,D,H,B,S,pt),z.transparent===!0&&z.side===Le&&z.forceSinglePass===!1?(z.side=Mn,z.needsUpdate=!0,P.renderBufferDirect(H,D,B,z,S,pt),z.side=zi,z.needsUpdate=!0,P.renderBufferDirect(H,D,B,z,S,pt),z.side=Le):P.renderBufferDirect(H,D,B,z,S,pt),S.onAfterRender(P,D,H,B,z,pt)}function Ai(S){let D=0;for(const H of S)H.texture!==null&&D++;return D}function Ri(S,D,H){D.isScene!==!0&&(D=yn);const B=Pt.get(S),z=w.state.lights,pt=w.state.shadowsArray,wt=z.state.version,ft=J.getParameters(S,z.state,pt,D,H,w.state.lightProbeGridArray),vt=J.getProgramCacheKey(ft);let Rt=B.programs;B.environment=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?D.environment:null,B.fog=D.fog;const qt=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap;B.envMap=T.get(S.envMap||B.environment,qt),B.envMapRotation=B.environment!==null&&S.envMap===null?D.environmentRotation:S.envMapRotation,Rt===void 0&&(S.addEventListener("dispose",ge),Rt=new Map,B.programs=Rt,B.programVariants=new Map);let ie=Rt.get(vt);if(ie!==void 0){if(B.currentProgram===ie&&B.lightsStateVersion===wt)return Wl(S,ft),ie}else ft.uniforms=J.getUniforms(S),F!==null&&S.isNodeMaterial&&F.build(S,H,ft),S.onBeforeCompile(ft,P),ie=J.acquireProgram(ft,vt),Rt.set(vt,ie),B.uniforms=ft.uniforms;const Et=B.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Et.clippingPlanes=Y.uniform),Wl(S,ft),B.needsLights=Mu(S),B.lightsStateVersion=wt,B.needsLights&&(Et.ambientLightColor.value=z.state.ambient,Et.lightProbe.value=z.state.probe,Et.sunLights.value=z.state.sun,Et.sunLightShadows.value=z.state.sunShadow,Et.directionalLights.value=z.state.directional,Et.directionalLightShadows.value=z.state.directionalShadow,Et.spotLights.value=z.state.spot,Et.spotLightShadows.value=z.state.spotShadow,Et.rectAreaLights.value=z.state.rectArea,Et.ltc_1.value=z.state.rectAreaLTC1,Et.ltc_2.value=z.state.rectAreaLTC2,Et.pointLights.value=z.state.point,Et.pointLightShadows.value=z.state.pointShadow,Et.hemisphereLights.value=z.state.hemi,Et.sunShadowMatrix.value=z.state.sunShadowMatrix,Et.sunShadowCascade.value=z.state.sunShadowCascade,Et.directionalShadowMatrix.value=z.state.directionalShadowMatrix,Et.spotLightMatrix.value=z.state.spotLightMatrix,Et.spotLightMap.value=z.state.spotLightMap,Et.pointShadowMatrix.value=z.state.pointShadowMatrix),B.numLightProbeGrids=Ai(w.state.lightProbeGridArray),B.currentProgram=ie,B.uniformsList=null,ie}function _u(S,D,H,B,z){const pt=Pt.get(S),wt=pt.currentProgram.id+","+B+","+z;let ft=pt.programVariants.get(wt);return ft===void 0?(ft=Ri(S,D,H),pt.programVariants.set(wt,ft)):(pt.currentProgram=ft,pt.uniformsList=null,pt.outputColorSpace=B,pt.toneMapping=z),ft}function Vl(S){if(S.uniformsList===null){const D=S.currentProgram.getUniforms();S.uniformsList=ea.seqWithValue(D.seq,S.uniforms)}return S.uniformsList}function Wl(S,D){const H=Pt.get(S);H.outputColorSpace=D.outputColorSpace,H.batching=D.batching,H.batchingColor=D.batchingColor,H.instancing=D.instancing,H.instancingColor=D.instancingColor,H.instancingMorph=D.instancingMorph,H.skinning=D.skinning,H.morphTargets=D.morphTargets,H.morphNormals=D.morphNormals,H.morphColors=D.morphColors,H.morphTargetsCount=D.morphTargetsCount,H.numClippingPlanes=D.numClippingPlanes,H.numIntersection=D.numClipIntersection,H.vertexAlphas=D.vertexAlphas,H.vertexTangents=D.vertexTangents,H.toneMapping=D.toneMapping}function xu(S,D,H,B,z){D.isScene!==!0&&(D=yn),Ft.resetTextureUnits();const pt=D.fog,wt=B.isMeshStandardMaterial||B.isMeshLambertMaterial||B.isMeshPhongMaterial?D.environment:null,ft=nt===null?P.outputColorSpace:nt.isXRRenderTarget===!0?nt.texture.colorSpace:re.workingColorSpace,vt=B.isMeshStandardMaterial||B.isMeshLambertMaterial&&!B.envMap||B.isMeshPhongMaterial&&!B.envMap,Rt=T.get(B.envMap||wt,vt),qt=B.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,ie=!!H.attributes.tangent&&(!!B.normalMap||B.anisotropy>0),Et=!!H.morphAttributes.position,se=!!H.morphAttributes.normal,Oe=!!H.morphAttributes.color;let Te=ci;B.toneMapped&&(nt===null||nt.isXRRenderTarget===!0)&&(Te=P.toneMapping);const we=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,sn=we!==void 0?we.length:0,Tt=Pt.get(B),gn=w.state.lights;if(Ne===!0&&(Xe===!0||S!==Q)){const Ce=S===Q&&B.id===V;Y.setState(B,S,Ce)}let _e=!1,Ci=!1;B.version===Tt.__version?Tt.needsLights&&Tt.lightsStateVersion!==gn.state.version||z.isBatchedMesh&&Tt.batching===!1||!z.isBatchedMesh&&Tt.batching===!0||z.isBatchedMesh&&Tt.batchingColor===!0&&z._colorsTexture===null||z.isBatchedMesh&&Tt.batchingColor===!1&&z._colorsTexture!==null||z.isInstancedMesh&&Tt.instancing===!1||!z.isInstancedMesh&&Tt.instancing===!0||z.isSkinnedMesh&&Tt.skinning===!1||!z.isSkinnedMesh&&Tt.skinning===!0||z.isInstancedMesh&&Tt.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&Tt.instancingColor===!1&&z.instanceColor!==null||z.isInstancedMesh&&Tt.instancingMorph===!0&&z.morphTexture===null||z.isInstancedMesh&&Tt.instancingMorph===!1&&z.morphTexture!==null||Tt.envMap!==Rt||B.fog===!0&&Tt.fog!==pt||Tt.numClippingPlanes!==void 0&&(Tt.numClippingPlanes!==Y.numPlanes||Tt.numIntersection!==Y.numIntersection)||Tt.vertexAlphas!==qt||Tt.vertexTangents!==ie||Tt.morphTargets!==Et||Tt.morphNormals!==se||Tt.morphColors!==Oe||Tt.morphTargetsCount!==sn||Tt.numLightProbeGrids!==Ai(w.state.lightProbeGridArray)?_e=!0:(Tt.outputColorSpace!==ft||Tt.toneMapping!==Te)&&(Ci=!0):(_e=!0,Tt.__version=B.version);let rn=Tt.currentProgram;(_e===!0||Ci===!0)&&(rn=Ci===!0?_u(B,D,z,ft,Te):Ri(B,D,z),F&&B.isNodeMaterial&&F.onUpdateProgram(B,rn,Tt));let pr=!1,di=!1,Pi=!1;const ue=rn.getUniforms(),Qe=Tt.uniforms;if(mt.useProgram(rn.program)&&(pr=!0,di=!0,Pi=!0),B.id!==V&&(V=B.id,di=!0),pr||Q!==S){mt.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),ue.setValue(U,"projectionMatrix",S.projectionMatrix),ue.setValue(U,"viewMatrix",S.matrixWorldInverse);const Ye=ue.map.cameraPosition;Ye!==void 0&&Ye.setValue(U,fn.setFromMatrixPosition(S.matrixWorld)),Ee.logarithmicDepthBuffer&&ue.setValue(U,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshLambertMaterial||B.isMeshBasicMaterial||B.isMeshStandardMaterial||B.isShaderMaterial)&&ue.setValue(U,"isOrthographic",S.isOrthographicCamera===!0),Q!==S&&(Q=S,di=!0,Pi=!0)}if(Tt.needsLights&&(gn.state.sunShadowMap.length>0&&ue.setValue(U,"sunShadowMap",gn.state.sunShadowMap,Ft),gn.state.directionalShadowMap.length>0&&ue.setValue(U,"directionalShadowMap",gn.state.directionalShadowMap,Ft),gn.state.spotShadowMap.length>0&&ue.setValue(U,"spotShadowMap",gn.state.spotShadowMap,Ft),gn.state.pointShadowMap.length>0&&ue.setValue(U,"pointShadowMap",gn.state.pointShadowMap,Ft)),z.isSkinnedMesh){ue.setOptional(U,z,"bindMatrix"),ue.setOptional(U,z,"bindMatrixInverse");const Ce=z.skeleton;Ce&&(Ce.boneTexture===null&&Ce.computeBoneTexture(),ue.setValue(U,"boneTexture",Ce.boneTexture,Ft))}z.isBatchedMesh&&(ue.setOptional(U,z,"batchingTexture"),ue.setValue(U,"batchingTexture",z._matricesTexture,Ft),ue.setOptional(U,z,"batchingIdTexture"),ue.setValue(U,"batchingIdTexture",z._indirectTexture,Ft),ue.setOptional(U,z,"batchingColorTexture"),z._colorsTexture!==null&&ue.setValue(U,"batchingColorTexture",z._colorsTexture,Ft));const On=H.morphAttributes;if((On.position!==void 0||On.normal!==void 0||On.color!==void 0)&&$.update(z,H,rn),(di||Tt.receiveShadow!==z.receiveShadow)&&(Tt.receiveShadow=z.receiveShadow,ue.setValue(U,"receiveShadow",z.receiveShadow)),(B.isMeshStandardMaterial||B.isMeshLambertMaterial||B.isMeshPhongMaterial)&&B.envMap===null&&D.environment!==null&&(Qe.envMapIntensity.value=D.environmentIntensity),Qe.dfgLUT!==void 0&&(Qe.dfgLUT.value=Yg()),di){if(ue.setValue(U,"toneMappingExposure",P.toneMappingExposure),Tt.needsLights&&vu(Qe,Pi),pt&&B.fog===!0&&at.refreshFogUniforms(Qe,pt),at.refreshMaterialUniforms(Qe,B,dt,It,w.state.transmissionRenderTarget[S.id]),Tt.needsLights&&Tt.numLightProbeGrids>0){const Ce=b;let Ye=0;for(const ti of w.state.lightProbeGridArray)ti.texture!==null&&(Ce.textures[Ye]=ti.texture,Ce.min[Ye]=ti.boundingBox.min,Ce.max[Ye]=ti.boundingBox.max,Ce.resolution[Ye]=ti.resolution,Ye++);for(const ti in Ce)Ce[ti].length=Ye;Qe.probesSH.value=Ce.textures,Qe.probesMin.value=Ce.min,Qe.probesMax.value=Ce.max,Qe.probesResolution.value=Ce.resolution}ea.upload(U,Vl(Tt),Qe,Ft)}if(B.isShaderMaterial&&B.uniformsNeedUpdate===!0&&(ea.upload(U,Vl(Tt),Qe,Ft),B.uniformsNeedUpdate=!1),B.isSpriteMaterial&&ue.setValue(U,"center",z.center),ue.setValue(U,"modelViewMatrix",z.modelViewMatrix),ue.setValue(U,"normalMatrix",z.normalMatrix),ue.setValue(U,"modelMatrix",z.matrixWorld),B.uniformsGroups!==void 0){const Ce=B.uniformsGroups;for(let Ye=0,ti=Ce.length;Ye<ti;Ye++){const ql=Ce[Ye];At.update(ql,rn),At.bind(ql,rn)}}return rn}function vu(S,D){S.ambientLightColor.needsUpdate=D,S.lightProbe.needsUpdate=D,S.sunLights.needsUpdate=D,S.sunLightShadows.needsUpdate=D,S.directionalLights.needsUpdate=D,S.directionalLightShadows.needsUpdate=D,S.pointLights.needsUpdate=D,S.pointLightShadows.needsUpdate=D,S.spotLights.needsUpdate=D,S.spotLightShadows.needsUpdate=D,S.rectAreaLights.needsUpdate=D,S.hemisphereLights.needsUpdate=D}function Mu(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return K},this.getActiveMipmapLevel=function(){return k},this.getRenderTarget=function(){return nt},this.setRenderTargetTextures=function(S,D,H){const B=Pt.get(S);B.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,B.__autoAllocateDepthBuffer===!1&&(B.__useRenderToTexture=!1),Pt.get(S.texture).__webglTexture=D,Pt.get(S.depthTexture).__webglTexture=B.__autoAllocateDepthBuffer?void 0:H,B.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,D){const H=Pt.get(S);H.__webglFramebuffer=D,H.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(S,D=0,H=0){nt=S,K=D,k=H;let B=null,z=!1,pt=!1;if(S){const ft=Pt.get(S);if(ft.__useDefaultFramebuffer!==void 0){mt.bindFramebuffer(U.FRAMEBUFFER,ft.__webglFramebuffer),j.copy(S.viewport),bt.copy(S.scissor),zt=S.scissorTest,mt.viewport(j),mt.scissor(bt),mt.setScissorTest(zt),V=-1;return}else if(ft.__webglFramebuffer===void 0)Ft.setupRenderTarget(S);else if(ft.__hasExternalTextures)Ft.rebindTextures(S,Pt.get(S.texture).__webglTexture,Pt.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const qt=S.depthTexture;if(ft.__boundDepthTexture!==qt){if(qt!==null&&Pt.has(qt)&&(S.width!==qt.image.width||S.height!==qt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Ft.setupDepthRenderbuffer(S)}}const vt=S.texture;(vt.isData3DTexture||vt.isDataArrayTexture||vt.isCompressedArrayTexture)&&(pt=!0);const Rt=Pt.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Rt[D])?B=Rt[D][H]:B=Rt[D],z=!0):S.samples>0&&Ft.useMultisampledRTT(S)===!1?B=Pt.get(S).__webglMultisampledFramebuffer:Array.isArray(Rt)?B=Rt[H]:B=Rt,j.copy(S.viewport),bt.copy(S.scissor),zt=S.scissorTest}else j.copy(Nt).multiplyScalar(dt).floor(),bt.copy(he).multiplyScalar(dt).floor(),zt=xe;if(H!==0&&(B=W),mt.bindFramebuffer(U.FRAMEBUFFER,B)&&mt.drawBuffers(S,B),mt.viewport(j),mt.scissor(bt),mt.setScissorTest(zt),z){const ft=Pt.get(S.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+D,ft.__webglTexture,H)}else if(pt){const ft=D;for(let vt=0;vt<S.textures.length;vt++){const Rt=Pt.get(S.textures[vt]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+vt,Rt.__webglTexture,H,ft)}}else if(S!==null&&H!==0){const ft=Pt.get(S.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,ft.__webglTexture,H)}V=-1};function Xl(S){const D=Pt.get(S);return(D.__readFormat!==S.format||D.__readType!==S.type)&&(D.__readFormat=S.format,D.__readType=S.type,D.__formatReadable=Ee.textureFormatReadable(S.format),D.__typeReadable=Ee.textureTypeReadable(S.type)),D}this.readRenderTargetPixels=function(S,D,H,B,z,pt,wt,ft=0){if(!(S&&S.isWebGLRenderTarget)){de("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let vt=Pt.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&wt!==void 0&&(vt=vt[wt],Array.isArray(vt)&&(vt=vt[0])),vt){mt.bindFramebuffer(U.FRAMEBUFFER,vt);try{const Rt=S.textures[ft],qt=Rt.format,ie=Rt.type;S.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+ft);const Et=Xl(Rt);if(Et.__formatReadable===!1){de("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Et.__typeReadable===!1){de("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=S.width-B&&H>=0&&H<=S.height-z&&U.readPixels(D,H,B,z,rt.convert(qt),rt.convert(ie),pt)}finally{const Rt=nt!==null?Pt.get(nt).__webglFramebuffer:null;mt.bindFramebuffer(U.FRAMEBUFFER,Rt)}}},this.readRenderTargetPixelsAsync=async function(S,D,H,B,z,pt,wt,ft=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let vt=Pt.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&wt!==void 0&&(vt=vt[wt],Array.isArray(vt)&&(vt=vt[0])),vt)if(D>=0&&D<=S.width-B&&H>=0&&H<=S.height-z){mt.bindFramebuffer(U.FRAMEBUFFER,vt);const Rt=S.textures[ft],qt=Rt.format,ie=Rt.type;S.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+ft);const Et=Xl(Rt);if(Et.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Et.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const se=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,se),U.bufferData(U.PIXEL_PACK_BUFFER,pt.byteLength,U.STREAM_READ),U.readPixels(D,H,B,z,rt.convert(qt),rt.convert(ie),0),U.bindBuffer(U.PIXEL_PACK_BUFFER,null);const Oe=nt!==null?Pt.get(nt).__webglFramebuffer:null;mt.bindFramebuffer(U.FRAMEBUFFER,Oe);const Te=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await td(U,Te,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,se),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,pt),U.bindBuffer(U.PIXEL_PACK_BUFFER,null),U.deleteBuffer(se),U.deleteSync(Te),pt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,D=null,H=0){const B=Math.pow(2,-H),z=Math.floor(S.image.width*B),pt=Math.floor(S.image.height*B),wt=D!==null?D.x:0,ft=D!==null?D.y:0;Ft.setTexture2D(S,0),U.copyTexSubImage2D(U.TEXTURE_2D,H,0,0,wt,ft,z,pt),mt.unbindTexture()},this.copyTextureToTexture=function(S,D,H=null,B=null,z=0,pt=0){let wt,ft,vt,Rt,qt,ie,Et,se,Oe;const Te=S.isCompressedTexture?S.mipmaps[pt]:S.image;if(H!==null)wt=H.max.x-H.min.x,ft=H.max.y-H.min.y,vt=H.isBox3?H.max.z-H.min.z:1,Rt=H.min.x,qt=H.min.y,ie=H.isBox3?H.min.z:0;else{const ue=Math.pow(2,-z);wt=Math.floor(Te.width*ue),ft=Math.floor(Te.height*ue),S.isDataArrayTexture?vt=Te.depth:S.isData3DTexture?vt=Math.floor(Te.depth*ue):vt=1,Rt=0,qt=0,ie=0}B!==null?(Et=B.x,se=B.y,Oe=B.z):(Et=0,se=0,Oe=0);const we=rt.convert(D.format),sn=rt.convert(D.type);let Tt;D.isData3DTexture?(Ft.setTexture3D(D,0),Tt=U.TEXTURE_3D):D.isDataArrayTexture||D.isCompressedArrayTexture?(Ft.setTexture2DArray(D,0),Tt=U.TEXTURE_2D_ARRAY):(Ft.setTexture2D(D,0),Tt=U.TEXTURE_2D),mt.activeTexture(U.TEXTURE0),mt.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,D.flipY),mt.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),mt.pixelStorei(U.UNPACK_ALIGNMENT,D.unpackAlignment);const gn=mt.getParameter(U.UNPACK_ROW_LENGTH),_e=mt.getParameter(U.UNPACK_IMAGE_HEIGHT),Ci=mt.getParameter(U.UNPACK_SKIP_PIXELS),rn=mt.getParameter(U.UNPACK_SKIP_ROWS),pr=mt.getParameter(U.UNPACK_SKIP_IMAGES);mt.pixelStorei(U.UNPACK_ROW_LENGTH,Te.width),mt.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Te.height),mt.pixelStorei(U.UNPACK_SKIP_PIXELS,Rt),mt.pixelStorei(U.UNPACK_SKIP_ROWS,qt),mt.pixelStorei(U.UNPACK_SKIP_IMAGES,ie);const di=S.isDataArrayTexture||S.isData3DTexture,Pi=D.isDataArrayTexture||D.isData3DTexture;if(S.isDepthTexture){const ue=Pt.get(S),Qe=Pt.get(D),On=Pt.get(ue.__renderTarget),Ce=Pt.get(Qe.__renderTarget);mt.bindFramebuffer(U.READ_FRAMEBUFFER,On.__webglFramebuffer),mt.bindFramebuffer(U.DRAW_FRAMEBUFFER,Ce.__webglFramebuffer);for(let Ye=0;Ye<vt;Ye++)di&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Pt.get(S).__webglTexture,z,ie+Ye),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Pt.get(D).__webglTexture,pt,Oe+Ye)),U.blitFramebuffer(Rt,qt,Rt+wt,qt+ft,Et,se,Et+wt,se+ft,U.DEPTH_BUFFER_BIT,U.NEAREST);mt.bindFramebuffer(U.READ_FRAMEBUFFER,null),mt.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(z!==0||S.isRenderTargetTexture||Pt.has(S)){const ue=Pt.get(S),Qe=Pt.get(D);mt.bindFramebuffer(U.READ_FRAMEBUFFER,I),mt.bindFramebuffer(U.DRAW_FRAMEBUFFER,G);for(let On=0;On<vt;On++)di?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,ue.__webglTexture,z,ie+On):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,ue.__webglTexture,z),Pi?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Qe.__webglTexture,pt,Oe+On):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Qe.__webglTexture,pt),z!==0?U.blitFramebuffer(Rt,qt,Rt+wt,qt+ft,Et,se,Et+wt,se+ft,U.COLOR_BUFFER_BIT,U.NEAREST):Pi?U.copyTexSubImage3D(Tt,pt,Et,se,Oe+On,Rt,qt,wt,ft):U.copyTexSubImage2D(Tt,pt,Et,se,Rt,qt,wt,ft);mt.bindFramebuffer(U.READ_FRAMEBUFFER,null),mt.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else Pi?S.isDataTexture||S.isData3DTexture?U.texSubImage3D(Tt,pt,Et,se,Oe,wt,ft,vt,we,sn,Te.data):D.isCompressedArrayTexture?U.compressedTexSubImage3D(Tt,pt,Et,se,Oe,wt,ft,vt,we,Te.data):U.texSubImage3D(Tt,pt,Et,se,Oe,wt,ft,vt,we,sn,Te):S.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,pt,Et,se,wt,ft,we,sn,Te.data):S.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,pt,Et,se,Te.width,Te.height,we,Te.data):U.texSubImage2D(U.TEXTURE_2D,pt,Et,se,wt,ft,we,sn,Te);mt.pixelStorei(U.UNPACK_ROW_LENGTH,gn),mt.pixelStorei(U.UNPACK_IMAGE_HEIGHT,_e),mt.pixelStorei(U.UNPACK_SKIP_PIXELS,Ci),mt.pixelStorei(U.UNPACK_SKIP_ROWS,rn),mt.pixelStorei(U.UNPACK_SKIP_IMAGES,pr),pt===0&&D.generateMipmaps===!0&&D.mipmapsAutoUpdate===!0&&U.generateMipmap(Tt),mt.unbindTexture()},this.initRenderTarget=function(S){Pt.get(S).__webglFramebuffer===void 0&&Ft.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?Ft.setTextureCube(S,0):S.isData3DTexture?Ft.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?Ft.setTexture2DArray(S,0):Ft.setTexture2D(S,0),mt.unbindTexture()},this.resetState=function(){K=0,k=0,nt=null,mt.reset(),ot.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Wn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=re._getDrawingBufferColorSpace(t),e.unpackColorSpace=re._getUnpackColorSpace()}}const na={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class Cs{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const $g=new Il(-1,1,1,-1,0,1);class Zg extends Ae{constructor(){super(),this.setAttribute("position",new ce([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new ce([0,2,0,0,2,0],2))}}const Jg=new Zg;class Ul{constructor(t){this._mesh=new et(Jg,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,$g)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class su extends Cs{constructor(t,e="tDiffuse"){super(),this.textureID=e,this.uniforms=null,this.material=null,t instanceof vn?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=ar.clone(t.uniforms),this.material=new vn({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this._fsQuad=new Ul(this.material)}render(t,e,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class th extends Cs{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,n){const s=t.getContext(),r=t.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,l;this.inverse?(a=0,l=1):(a=1,l=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,a,4294967295),r.buffers.stencil.setClear(l),r.buffers.stencil.setLocked(!0),t.setRenderTarget(n),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}}class Qg extends Cs{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class jg{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){const n=t.getSize(new Ct);this._width=n.width,this._height=n.height,e=new Rn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:An}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new su(na),this.copyPass.material.blending=Bi,this.timer=new Jd}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){this.timer.update(),t===void 0&&(t=this.timer.getDelta());const e=this.renderer.getRenderTarget();let n=!1;for(let s=0,r=this.passes.length;s<r;s++){const a=this.passes[s];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),a.render(this.renderer,this.writeBuffer,this.readBuffer,t,n),a.needsSwap){if(n){const l=this.renderer.getContext(),o=this.renderer.state.buffers.stencil;o.setFunc(l.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),o.setFunc(l.EQUAL,1,4294967295)}this.swapBuffers()}th!==void 0&&(a instanceof th?n=!0:a instanceof Qg&&(n=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new Ct);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const n=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(n,s),this.renderTarget2.setSize(n,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,s)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class t_ extends Cs{constructor(t,e,n=null,s=null,r=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=n,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new Dt}render(t,e,n){const s=t.autoClear;t.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(r=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),t.autoClear=s}}const e_={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Dt(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class Ts extends Cs{constructor(t,e=1,n,s){super(),this.strength=e,this.radius=n,this.threshold=s,this.resolution=t!==void 0?new Ct(t.x,t.y):new Ct(256,256),this.clearColor=new Dt(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new Rn(r,a,{type:An,depthBuffer:!1}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){const d=new Rn(r,a,{type:An,depthBuffer:!1});d.texture.name="UnrealBloomPass.h"+h,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);const u=new Rn(r,a,{type:An,depthBuffer:!1});u.texture.name="UnrealBloomPass.v"+h,u.texture.generateMipmaps=!1,this.renderTargetsVertical.push(u),r=Math.round(r/2),a=Math.round(a/2)}const l=e_;this.highPassUniforms=ar.clone(l.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new vn({uniforms:this.highPassUniforms,vertexShader:l.vertexShader,fragmentShader:l.fragmentShader}),this.separableBlurMaterials=[];const o=[6,10,14,18,22];r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(o[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new Ct(1/r,1/a),r=Math.round(r/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new C(1,1,1),new C(1,1,1),new C(1,1,1),new C(1,1,1),new C(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=ar.clone(na.uniforms),this.blendMaterial=new vn({uniforms:this.copyUniforms,vertexShader:na.vertexShader,fragmentShader:na.fragmentShader,premultipliedAlpha:!0,blending:He,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new Dt,this._oldClearAlpha=1,this._basic=new ye,this._fsQuad=new Ul(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(t,e){let n=Math.round(t/2),s=Math.round(e/2);this.renderTargetBright.setSize(n,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,s),this.renderTargetsVertical[r].setSize(n,s),this.separableBlurMaterials[r].uniforms.invSize.value=new Ct(1/n,1/s),n=Math.round(n/2),s=Math.round(s/2)}render(t,e,n,s,r){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();const a=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),r&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=n.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let l=this.renderTargetBright;for(let o=0;o<this.nMips;o++)this._fsQuad.material=this.separableBlurMaterials[o],this.separableBlurMaterials[o].uniforms.colorTexture.value=l.texture,this.separableBlurMaterials[o].uniforms.direction.value=Ts.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[o]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[o].uniforms.colorTexture.value=this.renderTargetsHorizontal[o].texture,this.separableBlurMaterials[o].uniforms.direction.value=Ts.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[o]),t.clear(),this._fsQuad.render(t),l=this.renderTargetsVertical[o];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(n),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=a}_getSeparableBlurMaterial(t){const e=[],n=t/3;for(let a=0;a<t;a++)e.push(.39894*Math.exp(-.5*a*a/(n*n))/n);const s=[],r=[];for(let a=1;a<t;a+=2){const l=e[a],o=a+1<t?e[a+1]:0,c=l+o;s.push((a*l+(a+1)*o)/c),r.push(c)}return new vn({defines:{KERNEL_PAIRS:s.length},uniforms:{colorTexture:{value:null},invSize:{value:new Ct(.5,.5)},direction:{value:new Ct(.5,.5)},centerWeight:{value:e[0]},gaussianOffsets:{value:s},gaussianWeights:{value:r}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float centerWeight;
				uniform float gaussianOffsets[KERNEL_PAIRS];
				uniform float gaussianWeights[KERNEL_PAIRS];

				void main() {

					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * centerWeight;

					for ( int i = 0; i < KERNEL_PAIRS; i ++ ) {

						vec2 uvOffset = direction * invSize * gaussianOffsets[ i ];
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * gaussianWeights[ i ];

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(t){return new vn({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}}Ts.BlurDirectionX=new Ct(1,0);Ts.BlurDirectionY=new Ct(0,1);const Xr={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class n_ extends Cs{constructor(){super(),this.isOutputPass=!0,this.uniforms=ar.clone(Xr.uniforms),this.material=new Wh({name:Xr.name,uniforms:this.uniforms,vertexShader:Xr.vertexShader,fragmentShader:Xr.fragmentShader}),this._fsQuad=new Ul(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},re.getTransfer(this._outputColorSpace)===Me&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===cl?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===hl?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===ul?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Sa?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===fl?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===pl?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===dl&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}function xs(i,t=!1){const e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},a={},l=i[0].morphTargetsRelative,o=new Ae;o.morphTargetsRelative=l;let c=0;for(let h=0;h<i.length;++h){const d=i[h];let u=0,f=0;if(e!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const _ in d.attributes){if(!n.has(_))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+_+'" attribute exists among all geometries, or in none of them.'),null;r[_]===void 0&&(r[_]=[]),r[_].push(d.attributes[_]),u++}if(u!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(l!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const _ in d.morphAttributes){if(!s.has(_))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;if(d.morphAttributes[_].length!==i[0].morphAttributes[_].length)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have the same number of morph targets for the "'+_+'" morph attribute.'),null;a[_]===void 0&&(a[_]=[]),a[_].push(d.morphAttributes[_]),f++}if(f!==s.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of morph attributes."),null;if(t){let _;if(e)_=d.index.count;else if(d.attributes.position!==void 0)_=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;o.addGroup(c,_,h),c+=_}}if(e){let h=0;const d=[];for(let u=0;u<i.length;++u){const f=i[u].index;for(let _=0;_<f.count;++_)d.push(f.getX(_)+h);h+=i[u].attributes.position.count}o.setIndex(d)}for(const h in r){const d=eh(r[h]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;o.setAttribute(h,d)}for(const h in a){const d=a[h][0].length;if(d!==0){o.morphAttributes=o.morphAttributes||{},o.morphAttributes[h]=[];for(let u=0;u<d;++u){const f=[];for(let x=0;x<a[h].length;++x)f.push(a[h][x][u]);const _=eh(f);if(!_)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;o.morphAttributes[h].push(_)}}}return o}function eh(i){let t,e,n,s=-1,r=0;for(let c=0;c<i.length;++c){const h=i[c];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}const a=new t(r),l=new un(a,e,n);let o=0;for(let c=0;c<i.length;++c){const h=i[c];if(h.isInterleavedBufferAttribute){const d=o/e;for(let u=0,f=h.count;u<f;u++)for(let _=0;_<e;_++){const x=h.getComponent(u,_);l.setComponent(u+d,_,x)}}else a.set(h.array,o);o+=h.count*e}return s!==void 0&&(l.gpuType=s),l}const $e=Math.PI*2;function i_(i){let t=i>>>0;return function(){t|=0,t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function Ps(i,t){const e=document.createElement("canvas");return e.width=i,e.height=t,{c:e,x:e.getContext("2d")}}function Ls(i,{repeat:t=[1,1],srgb:e=!0}={}){const n=new wa(i);return n.wrapS=n.wrapT=ra,n.repeat.set(t[0],t[1]),n.anisotropy=8,e&&(n.colorSpace=tn),n.needsUpdate=!0,n}function ia(){const{c:i,x:t}=Ps(128,128),e=t.createRadialGradient(64,64,0,64,64,62);return e.addColorStop(0,"rgba(255,255,255,1)"),e.addColorStop(.18,"rgba(255,255,255,0.85)"),e.addColorStop(.5,"rgba(255,255,255,0.2)"),e.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=e,t.fillRect(0,0,128,128),Ls(i,{srgb:!1})}function s_(){const{c:t,x:e}=Ps(512,512);e.fillStyle="#e7ddc6",e.fillRect(0,0,512,512);for(let r=0;r<2200;r++){const a=Math.random()*22;e.fillStyle=`rgba(${70+a},${62+a},${48+a},${.025+Math.random()*.04})`,e.fillRect(Math.random()*512,Math.random()*512,1.4,1.4)}const n="#241f17";function s(r,a,l,o,c){e.strokeStyle=n,e.lineWidth=l,e.lineCap="butt";for(const h of[-512,0,512]){e.beginPath();for(let d=0;d<=512;d+=3){const u=r+h+Math.sin(d/512*$e*c+o)*a;d===0?e.moveTo(d,u):e.lineTo(d,u)}e.stroke()}}s(104,30,42,0,1),s(104,30,10,1.35,2),s(300,24,36,Math.PI,1),s(300,24,9,Math.PI+1.2,2),e.strokeStyle="rgba(20,17,14,0.16)",e.lineWidth=1.2;for(let r=0;r<=8;r++)e.beginPath(),e.moveTo(0,512/8*r),e.lineTo(512,512/8*r),e.stroke(),e.beginPath(),e.moveTo(512/8*r,0),e.lineTo(512/8*r,512),e.stroke();return Ls(t,{repeat:[14,13]})}function r_(){const{c:i,x:t}=Ps(256,256);t.fillStyle="#b9a078",t.fillRect(0,0,256,256);for(let e=0;e<3200;e++){const n=Math.random();t.fillStyle=n>.6?`rgba(90,72,48,${.06+Math.random()*.15})`:`rgba(255,240,205,${.05+Math.random()*.16})`,t.fillRect(Math.random()*256,Math.random()*256,1,1)}return Ls(i,{repeat:[22,22]})}function a_(){const{c:i,x:t}=Ps(256,256);t.fillStyle="#2b2c27",t.fillRect(0,0,256,256);for(let e=0;e<5e3;e++){const n=Math.random()*40;t.fillStyle=`rgba(${n+20},${n+20},${n+17},${.12+Math.random()*.2})`,t.fillRect(Math.random()*256,Math.random()*256,1.2,1.2)}return t.strokeStyle="rgba(230,220,190,0.15)",t.lineWidth=2,t.setLineDash([14,18]),t.beginPath(),t.moveTo(128,0),t.lineTo(128,256),t.stroke(),Ls(i,{repeat:[3,12]})}function o_(){const{c:e,x:n}=Ps(1024,512),s=n.createLinearGradient(0,0,1024,512);s.addColorStop(0,"#12231d"),s.addColorStop(.55,"#1b2e28"),s.addColorStop(1,"#101d19"),n.fillStyle=s,n.fillRect(0,0,1024,512);for(let l=0;l<2600;l++)n.fillStyle=`rgba(255,255,255,${Math.random()*.035})`,n.beginPath(),n.arc(Math.random()*1024,Math.random()*512,Math.random()*1.8,0,$e),n.fill();const r=n.createRadialGradient(215,210,10,215,210,150);r.addColorStop(0,"#ffe08a"),r.addColorStop(.55,"#ffb703"),r.addColorStop(1,"rgba(255,93,58,0)"),n.fillStyle=r,n.beginPath(),n.arc(215,210,150,0,$e),n.fill(),n.strokeStyle="#ffb703",n.lineWidth=10,n.beginPath(),n.arc(215,210,118,0,$e),n.stroke(),n.save(),n.translate(640,270),n.fillStyle="#0a100d",n.beginPath(),n.ellipse(0,0,112,86,-.25,0,$e),n.fill(),n.beginPath(),n.arc(80,-80,58,0,$e),n.fill(),n.beginPath(),n.moveTo(122,-100),n.quadraticCurveTo(225,-78,180,-24),n.quadraticCurveTo(142,-20,120,-52),n.closePath(),n.fillStyle="#ff8a1f",n.fill(),n.beginPath(),n.moveTo(130,-98),n.quadraticCurveTo(192,-86,174,-48),n.quadraticCurveTo(148,-50,130,-68),n.closePath(),n.fillStyle="#ffd166",n.fill(),n.fillStyle="#f4ecd8",n.beginPath(),n.arc(88,-94,17,0,$e),n.fill(),n.fillStyle="#0a100d",n.beginPath(),n.arc(91,-96,8,0,$e),n.fill(),n.fillStyle="rgba(39,224,184,0.9)",n.beginPath(),n.ellipse(10,4,60,46,-.25,0,$e),n.fill(),n.restore(),n.strokeStyle="#27e0b8",n.lineWidth=8,n.lineCap="round";for(let l=0;l<4;l++){n.beginPath();const o=396+l*22;n.moveTo(400,o),n.bezierCurveTo(470,o-26,530,o+24,600,o),n.bezierCurveTo(670,o-26,730,o+24,800,o),n.strokeStyle=l%2?"#ff5d3a":"#27e0b8",n.stroke()}n.save(),n.translate(72,372),n.rotate(-.045),n.font='900 82px "Arial Black", Impact, sans-serif',n.fillStyle="#f4ecd8",n.shadowColor="rgba(255,183,3,0.7)",n.shadowBlur=22,n.fillText("A PRAÇA",0,0),n.fillStyle="#ffb703",n.fillText("RESISTE",0,78),n.restore(),n.save(),n.translate(770,90),n.rotate(.12),n.font='italic 700 54px "Arial Black", Impact, sans-serif',n.fillStyle="rgba(39,224,184,0.9)",n.fillText("BRASA",0,0),n.font="600 20px Arial, sans-serif",n.fillStyle="rgba(244,236,216,0.6)",n.fillText("PRAÇA DO SOL · 2126",4,30),n.restore();const a=["#ffb703","#ff5d3a","#27e0b8","#f4ecd8"];for(let l=0;l<26;l++)n.fillStyle=a[l%a.length],n.globalAlpha=.25+Math.random()*.5,n.beginPath(),n.arc(Math.random()*1024,Math.random()*512,Math.random()*9,0,$e),n.fill();return n.globalAlpha=1,Ls(e)}function l_(i,t="#ffb703",e=""){const{c:r,x:a}=Ps(1024,256);a.clearRect(0,0,1024,256),a.textAlign="center",a.textBaseline="middle";const l=o=>{a.shadowColor=t,a.shadowBlur=34,a.fillStyle=o,a.font='900 112px "Arial Black", Impact, sans-serif',a.fillText(i,1024/2,e?104:128),e&&(a.shadowBlur=16,a.font="600 28px Arial, sans-serif",a.fillText(e,1024/2,190))};return l(t),l("#fff8e0"),a.shadowBlur=0,Ls(r)}function tl(i,t,e=1){const n=ia(),s=new Gi({map:n,color:i,transparent:!0,opacity:e,blending:He,depthWrite:!1,toneMapped:!1}),r=new ys(s);return r.scale.set(t,t,1),r}const c_=`
  varying vec3 vWorld;
  void main() {
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorld = wp.xyz;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`,h_=`
  precision highp float;
  varying vec3 vWorld;
  uniform vec3 uSun;
  uniform float uTime;

  float hash(vec3 p) {
    p = fract(p * 0.3183099 + 0.1);
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }
  float noise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(hash(i), hash(i + vec3(1,0,0)), f.x),
          mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
      mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
          mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z);
  }
  float fbm(vec3 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p *= 2.03;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec3 dir = normalize(vWorld - cameraPosition);
    float h = clamp(dir.y, -0.12, 1.0);
    float up = smoothstep(-0.02, 0.55, h);
    float horizon = smoothstep(0.0, 0.22, h);

    vec3 low = vec3(0.98, 0.43, 0.22);
    vec3 mid = vec3(0.85, 0.29, 0.28);
    vec3 high = vec3(0.16, 0.11, 0.24);
    vec3 top = vec3(0.025, 0.075, 0.105);

    vec3 col = mix(low, mid, smoothstep(0.0, 0.24, h));
    col = mix(col, high, smoothstep(0.18, 0.5, h));
    col = mix(col, top, smoothstep(0.45, 0.95, h));
    col = mix(col, vec3(0.52, 0.26, 0.26), (1.0 - horizon) * 0.32);

    // sun
    float sd = max(dot(dir, uSun), 0.0);
    float disc = smoothstep(0.99965, 0.9999, sd);
    float glow = pow(sd, 22.0) * 0.55 + pow(sd, 4.0) * 0.13;
    vec3 sunCol = mix(vec3(1.0, 0.55, 0.2), vec3(1.0, 0.93, 0.72), disc);
    col += sunCol * glow;
    col += vec3(1.0, 0.9, 0.68) * disc * 1.15;

    // clouds near horizon
    float cloudMask = smoothstep(-0.02, 0.08, dir.y) * (1.0 - smoothstep(0.28, 0.6, dir.y));
    vec3 cp = vec3(dir.x * 2.4, dir.y * 5.5, dir.z * 2.4);
    cp.x += uTime * 0.0035;
    float cl = fbm(cp + vec3(0.0, 0.0, 1.0));
    cl = smoothstep(0.48, 0.72, cl);
    vec3 cloudCol = mix(vec3(0.27, 0.14, 0.21), vec3(1.0, 0.54, 0.3), pow(sd, 2.0));
    cloudCol = mix(cloudCol, vec3(0.78, 0.42, 0.34), horizon * 0.4);
    col = mix(col, cloudCol, cl * cloudMask * 0.92);

    // thin high clouds
    float hi = fbm(vec3(dir.x * 4.5, dir.y * 10.0 + 2.0, dir.z * 4.5));
    hi = smoothstep(0.6, 0.8, hi) * smoothstep(0.18, 0.45, dir.y) * (1.0 - smoothstep(0.65, 0.95, dir.y));
    col += vec3(0.8, 0.42, 0.43) * hi * 0.18;

    // stars
    vec3 sp = dir * 260.0;
    float star = step(0.9975, hash(floor(sp)));
    star *= smoothstep(0.22, 0.7, dir.y);
    col += vec3(0.9, 0.95, 1.0) * star * 0.75;

    // haze over ocean
    col = mix(col, vec3(0.62, 0.3, 0.24), (1.0 - smoothstep(-0.03, 0.06, h)) * 0.45);

    gl_FragColor = vec4(col, 1.0);
  }
`,u_=`
  varying vec3 vWorld;
  void main() {
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorld = wp.xyz;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`,d_=`
  precision highp float;
  varying vec3 vWorld;
  uniform float uTime;
  uniform vec3 uSun;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  void main() {
    vec2 p = vWorld.xz;
    float t = uTime;
    float w = sin(p.x * 0.34 + t * 0.55) * 0.5
            + sin(p.y * 0.52 - t * 0.72) * 0.28
            + sin((p.x + p.y) * 0.19 + t * 0.31) * 0.22;
    float w2 = sin(p.x * 1.6 - p.y * 0.8 + t * 1.15)
             + sin(p.y * 1.9 + p.x * 0.6 - t * 0.9);
    w += w2 * 0.05;

    vec3 deep = vec3(0.015, 0.13, 0.16);
    vec3 shallow = vec3(0.06, 0.36, 0.37);
    vec3 col = mix(deep, shallow, smoothstep(-0.5, 0.8, w));

    // warm horizon glow, stronger toward the sun side (west)
    float dist = length(cameraPosition - vWorld);
    float horizon = smoothstep(30.0, 340.0, dist);
    col = mix(col, vec3(0.47, 0.27, 0.26), horizon * 0.62);
    col += vec3(0.85, 0.38, 0.18) * pow(horizon, 3.0) * 0.35;

    // sun path on the water
    float sunPath = exp(-pow((vWorld.z - 24.0) * 0.018, 2.0)) * smoothstep(-30.0, -260.0, vWorld.x);
    float sparkleN = noise(p * 0.9 + vec2(t * 0.35, -t * 0.2));
    float sparkle = pow(sparkleN, 9.0) * sunPath * (0.45 + 0.55 * sin(t * 2.0 + p.x));
    col += vec3(1.0, 0.63, 0.28) * sunPath * 0.3;
    col += vec3(1.0, 0.86, 0.55) * sparkle * 1.6;

    // shore foam
    float shore = smoothstep(-25.6, -27.6, vWorld.x);
    float foam = sin(vWorld.x * 4.0 + sin(vWorld.z * 0.6 + t * 0.7) * 1.8 + t * 1.3);
    foam = smoothstep(0.82, 1.0, foam) * shore;
    col = mix(col, vec3(0.92, 0.86, 0.72), foam * 0.65);

    gl_FragColor = vec4(col, 1.0);
  }
`;function f_(i,t){const e=new Tn(420,48,32),n=new vn({vertexShader:c_,fragmentShader:h_,side:Mn,depthWrite:!1,fog:!1,uniforms:{uSun:{value:t.clone()},uTime:{value:0}}}),s=new et(e,n);return s.frustumCulled=!1,s.renderOrder=-10,i.add(s),n}function p_(i,t){const e=new cn(340,520,1,1),n=new vn({vertexShader:u_,fragmentShader:d_,fog:!1,uniforms:{uTime:{value:0},uSun:{value:t.clone()}}}),s=new et(e,n);return s.rotation.x=-Math.PI/2,s.position.set(-195,-.38,-25),i.add(s),n}function sa(i,{text:t,sub:e,color:n,x:s,y:r,z:a,w:l,h:o,rotY:c=0}){const h=l_(t,n,e),d=new ye({map:h,transparent:!0,depthWrite:!1,toneMapped:!1,side:Le}),u=new et(new cn(l,o),d);return u.position.set(s,r,a),u.rotation.y=c,i.add(u),u}function m_(){const t=[],e=[],n=[];for(let r=0;r<=5;r++){const a=r/5,l=Math.sin(a*Math.PI)*.42+.03,o=-a*a*2.25+a*.35,c=a*3.4;if(t.push(-l,o,c,l,o,c),e.push(0,a,1,a),r<5){const h=r*2;n.push(h,h+1,h+2,h+1,h+3,h+2)}}const s=new Ae;return s.setAttribute("position",new ce(t,3)),s.setAttribute("uv",new ce(e,2)),s.setIndex(n),s.computeVertexNormals(),s}const g_=m_();function __(i=1,t=3042111){const e=new Se,n=new yt({color:5981744,roughness:.95}),s=7;let r=0,a=0;const l=new C(.5,0,-.35);for(let _=0;_<s;_++){const x=_/s,m=1.3*i,p=(.26-x*.1)*i,M=(.23-x*.1)*i,E=new et(new Pe(M,p,m*1.03,7),n);r=l.x*x*x*i,a=l.z*x*x*i,E.position.set(r,_*m+m/2,a),E.rotation.z=-l.x*.06,e.add(E)}const o=new Se;o.position.set(l.x*i,s*1.3*i,l.z*i);const c=new yt({color:t,roughness:.75,side:Le,emissive:666136,emissiveIntensity:.4}),h=[];for(let _=0;_<9;_++){const x=g_.clone();x.scale(i*1.05,i*1.05,i*1.05),x.rotateX(_%3*.1-.1),x.rotateY(_/9*$e+.2),h.push(x)}const d=new et(xs(h),c);d.castShadow=!0,o.add(d);const u=new Tn(.11*i,6,5),f=new yt({color:4930079,roughness:.9});for(let _=0;_<4;_++){const x=new et(u,f),m=_/4*$e;x.position.set(Math.cos(m)*.23*i,-.14*i,Math.sin(m)*.23*i),o.add(x)}return e.add(o),e.userData.crown=o,e}function Vs(i,t,e,n,s,r,a){const l=new Se,o=[],c=1.1;for(let M=0;M<=20;M++){const E=M/20;o.push(new C(e.x+(n.x-e.x)*E,s-Math.sin(E*Math.PI)*c,e.z+(n.z-e.z)*E))}const h=new zh(new Ae().setFromPoints(o),new Cl({color:7035976,transparent:!0,opacity:.8}));l.add(h);const d=[],u=[],f=[],_=[],x=new Dt;for(let M=0;M<r;M++){const E=(M+.5)/r,b=new C(e.x+(n.x-e.x)*E,s-Math.sin(E*Math.PI)*c,e.z+(n.z-e.z)*E);x.set(a[M%a.length]);const A=.28,w=[[-A/2,0,0],[A/2,0,0],[0,-.5,0]];for(const g of w)d.push(b.x+g[0],b.y+g[1],b.z+g[2]),u.push(x.r,x.g,x.b),f.push(b.x+g[0],b.y+g[1],b.z+g[2]),_.push(E*6+(e.z+n.z)*.1)}const m=new Ae;m.setAttribute("position",new ce(d,3)),m.setAttribute("color",new ce(u,3));const p=new et(m,new ye({vertexColors:!0,side:Le,toneMapped:!1}));return l.add(p),i.add(l),{group:l,mesh:p,base:f,phase:_}}const Gn=[14245691,2792847,15317321,6065592,13204623,6986062,14388037,4161400];function qr(i,t,{x:e,z:n,w:s,h:r,d:a,rotY:l=0,color:o,windows:c=8,balcony:h=!1,neon:d=!1}){const u=new Se;u.position.set(e,0,n),u.rotation.y=l;const f=new yt({color:o,roughness:.88,metalness:.03}),_=new et(new ae(s,r,a),f);_.position.y=r/2,_.castShadow=!0,_.receiveShadow=!0,u.add(_);const x=new yt({color:15129796,roughness:.8}),m=new et(new ae(s*1.04,.22,a*1.04),x);m.position.y=r+.11,m.castShadow=!0,u.add(m);const p=[],M=[],E=Math.max(2,Math.floor(s/2.2)),b=Math.max(1,Math.floor(r/2.6)),A=a/2+.02;for(let w=0;w<b;w++)for(let g=0;g<E;g++){if(t()<.18)continue;const y=.65,L=.9,P=-s/2+1+g*(s-2)/Math.max(1,E-1),N=1.35+w*(r-2.4)/Math.max(1,b-1),F=new cn(y,L);F.translate(P,N,A),t()<.52?M.push(F):p.push(F)}if(M.length){const w=new et(xs(M),new ye({color:16763504,toneMapped:!1}));u.add(w)}if(p.length){const w=new et(xs(p),new ye({color:1845803,toneMapped:!1}));u.add(w)}if(t()<.65){const w=new et(new Pe(.55,.55,1.1,8),new yt({color:4943738,roughness:.6,metalness:.3}));w.position.set((t()-.5)*s*.5,r+.68,(t()-.5)*a*.4),u.add(w)}if(t()<.55){const w=new et(new Pe(.03,.05,2.2,5),new yt({color:2829096,roughness:.7}));w.position.set((t()-.5)*s*.6,r+1.1,0),u.add(w)}if(h){const w=new et(new ae(s*.82,.12,.8),new yt({color:14208952,roughness:.9}));w.position.set(0,r*.55,a/2+.35),u.add(w);const g=new et(new ae(s*.82,.55,.06),new yt({color:3685429,roughness:.8,transparent:!0,opacity:.75}));g.position.set(0,r*.55+.35,a/2+.72),u.add(g)}return i.add(u),u}function Yr(i,t,e,n=4.6){const s=new Se;s.position.set(t,0,e);const r=new yt({color:2042663,roughness:.55,metalness:.5}),a=new et(new Pe(.06,.1,n,8),r);a.position.y=n/2,a.castShadow=!0,s.add(a);const l=new et(new Pe(.04,.04,.6,6),r);l.rotation.z=Math.PI/2,l.position.set(.25,n-.08,0),s.add(l);const o=new ye({color:16765578,toneMapped:!1}),c=new et(new Tn(.14,8,6),o);c.position.set(.5,n-.2,0),s.add(c);const h=tl(16757086,1.9,.5);h.position.copy(c.position),s.add(h);const d=new cr(16757867,13,16,2);return d.position.set(.5,n-.3,0),s.add(d),i.add(s),s}function x_(i,t,e=1.05,n=0){const s=new Se;s.position.set(i,0,t),s.rotation.y=n;const r=new yt({color:9071165,roughness:.93}),a=new yt({color:4141344,roughness:.9}),l=new et(new ae(e,e,e),r);l.position.y=e/2,l.castShadow=!0,l.receiveShadow=!0,s.add(l);const o=new et(new ae(e*1.02,e*.09,e*1.02),a);o.position.y=e*.25,s.add(o);const c=o.clone();return c.position.y=e*.75,s.add(c),s}function el(i,t,e,n=16758531){const s=new Se;s.position.set(t,0,e);const r=new et(new Pe(.04,.05,2.9,6),new yt({color:14142900,roughness:.6}));r.position.y=1.45,s.add(r);const a=new et(new Wi(1.7,.65,12,1,!0),new yt({color:n,roughness:.75,side:Le}));a.position.y=2.85,a.castShadow=!0,s.add(a);const l=new et(new Tn(.07,6,5),new ye({color:16051416}));return l.position.y=3.2,s.add(l),i.add(s),s}function v_(i){const t=new Se;t.position.set(15.5,0,11.5),t.rotation.y=-.55;const e=new yt({color:7162927,roughness:.9}),n=new et(new ae(2.4,1.15,1.1),e);n.position.y=.85,n.castShadow=!0,t.add(n);const s=new et(new ae(2.55,.1,1.25),new yt({color:15655622,roughness:.7}));s.position.y=1.45,s.castShadow=!0,t.add(s);const r=new Pe(.3,.3,.12,10),a=new yt({color:1776408,roughness:.9});for(const c of[-.8,.8]){const h=new et(r,a);h.rotation.z=Math.PI/2,h.position.set(c,.32,.56),t.add(h)}const l=new yt({color:3968854,roughness:.3,metalness:.1});for(let c=0;c<4;c++){const h=new et(new Pe(.07,.07,.3,6),l);h.position.set(-.6+c*.4,1.65,.1),t.add(h)}sa(t,{text:"AÇAÍ",sub:"DO ZÉ · GELADO",color:"#27e0b8",x:0,y:2.25,z:.05,w:2.4,h:.8});const o=new et(new Pe(.03,.03,1,5),new yt({color:4207914}));return o.position.set(0,1.95,0),t.add(o),i.add(t),el(i,15.5,11.5,2792847).position.set(15.5,0,11.5),t}function M_(i,t,{mobile:e=!1}={}){const n=i_(2126),s=new Se;i.add(s);const r=new C(-.8,.115,-.44).normalize();i.fog=new Al(2892585,.0062);const a=f_(i,r),l=p_(i,r),o=new Yd(16752227,1324075,1.05);i.add(o);const c=new no(16758903,3.1);c.position.copy(r).multiplyScalar(90),c.castShadow=!0,c.shadow.mapSize.set(e?1024:2048,e?1024:2048),c.shadow.camera.left=-40,c.shadow.camera.right=40,c.shadow.camera.top=42,c.shadow.camera.bottom=-32,c.shadow.camera.near=20,c.shadow.camera.far=190,c.shadow.bias=-8e-4,c.shadow.normalBias=.035,c.target.position.set(0,0,-4),i.add(c),i.add(c.target);const h=new no(4159638,.75);h.position.set(40,20,30),i.add(h);const d=new no(16747100,.55);d.position.set(-60,8,-20),i.add(d);const u=new et(new cn(50,46),new yt({map:s_(),roughness:.93,color:16777215}));u.rotation.x=-Math.PI/2,u.position.set(0,.02,-1),u.receiveShadow=!0,s.add(u);const f=new yt({color:10391410,roughness:.9}),_=new ae(52,.24,2);for(const[it,Mt]of[[-25,0],[23,0]]){const Ht=new et(_,f);Ht.position.set(0,.1,it),Ht.rotation.y=Mt,Ht.receiveShadow=!0,s.add(Ht)}const x=new et(new ae(2,.24,48),f);x.position.set(25,.1,-1),s.add(x);const m=new et(new cn(34,140),new yt({map:r_(),roughness:1,color:14205594}));m.rotation.x=-Math.PI/2,m.position.set(-40,-.04,-8),m.receiveShadow=!0,s.add(m);const p=new et(new cn(2.6,80),new yt({map:a_(),roughness:.92}));p.rotation.x=-Math.PI/2,p.position.set(-25.3,.03,-4),s.add(p);const M=new yt({color:1520943,roughness:1,flatShading:!0}),E=new yt({color:1978165,roughness:1,flatShading:!0});function b(it,Mt,Ht){const kt=new Pe(it*.035,it,Mt,20,8,!1);kt.translate(0,Mt/2,0);const fe=kt.attributes.position;for(let Ut=0;Ut<fe.count;Ut++){const Ge=fe.getX(Ut),Qt=fe.getY(Ut),wn=fe.getZ(Ut),mn=Math.min(1,Math.max(0,Qt/Mt)),qe=Math.atan2(wn,Ge),nn=1+Math.sin(qe*3+Ht)*.12+Math.sin(qe*5.7+Ht*1.7)*.055+Math.sin(qe*10.3+Ht*2.3)*.025,qn=1+(1-mn)*.16,Ai=Ge*nn*qn+Math.sin(Ht)*(1-mn)*it*.09+Math.sin(mn*7+Ht)*it*.018,Ri=wn*nn*qn+Math.cos(Ht*1.3)*(1-mn)*it*.09+Math.cos(mn*5+Ht)*it*.018;fe.setXYZ(Ut,Ai,Qt,Ri)}return kt.computeVertexNormals(),kt}function A(it,Mt,Ht,kt,fe=M,Ut=1){const Ge=n()*$e,Qt=new Se,wn=new et(b(Ht,kt,Ge),fe);Qt.add(wn);const mn=1+Math.floor(n()*2);for(let qe=0;qe<mn;qe++){const nn=Ht*(.42+n()*.3),qn=kt*(.42+n()*.34),Ai=new et(b(nn,qn,Ge+1.7+qe*2.1),fe);Ai.position.set((n()-.5)*Ht*1.25,0,(n()-.5)*Ht*.9),Qt.add(Ai)}return Qt.position.set(it,-1,Mt),Qt.scale.x=Ut,Qt.rotation.y=n()*$e,Qt.traverse(qe=>{qe.isMesh&&(qe.castShadow=!1,qe.receiveShadow=!1)}),s.add(Qt),Qt}A(-55,-165,55,55,M,1.3),A(-120,-210,75,70,E,1.25),A(45,-195,65,48,E,1.5),A(135,-230,85,62,E,1.3),A(-210,-195,80,55,E,1.1),A(-38,-125,26,52,M,1);const w=new yt({color:14210761,emissive:8747876,emissiveIntensity:.5,roughness:.8}),g=new Se;g.position.set(-38,49.6,-125);const y=new et(new Pe(1.2,2,8.5,7),w);y.position.y=4.2,g.add(y);const L=new et(new ae(14,.9,1),w);L.position.y=7.8,g.add(L);const P=new et(new Tn(1.1,8,6),w);P.position.y=9,g.add(P);const N=new et(new ae(3.2,2.2,3.2),M);N.position.y=-.5,g.add(N),g.rotation.y=.25,s.add(g);const F=new yt({color:1451809,roughness:1});for(let it=0;it<18;it++){const Mt=4+n()*9,Ht=3+n()*18,kt=new et(new ae(Mt,Ht,4+n()*6),F);if(kt.position.set(-110+n()*250,Ht/2-1,-95-n()*55),s.add(kt),n()<.35){const fe=new et(new cn(Mt*.7,Ht*.55),new ye({color:16757598,transparent:!0,opacity:.12,toneMapped:!1}));fe.position.set(kt.position.x,Ht*.55,kt.position.z+2.6),s.add(fe)}}const W=new et(new Tn(38,16,8,0,$e,0,Math.PI/2),new yt({color:1849898,roughness:1,flatShading:!0}));W.scale.set(1.5,.38,.75),W.position.set(14,-3,-55),s.add(W);for(let it=0;it<14;it++){const Mt=3.2+n()*3.2,Ht=3.5+n()*6,kt=3+n()*2.5,fe=it%3,Ut=-20+it%7*6.2+n()*2,Ge=-34-fe*7-n()*3,Qt=fe*2.4,wn=new et(new ae(Mt,Ht,kt),new yt({color:Gn[it%Gn.length],roughness:.93}));wn.position.set(Ut,Qt+Ht/2,Ge),wn.rotation.y=(n()-.5)*.2,s.add(wn);const mn=new et(new ae(Mt*1.05,.16,kt*1.05),new yt({color:14602934,roughness:.9}));mn.position.set(Ut,Qt+Ht+.08,Ge),s.add(mn);const qe=1+Math.floor(n()*3);for(let nn=0;nn<qe;nn++){const qn=new et(new cn(.4,.55),new ye({color:n()<.5?16761963:10479570,toneMapped:!1}));qn.position.set(Ut+(n()-.5)*Mt*.6,Qt+1.2+n()*(Ht-2),Ge+kt/2+.06),s.add(qn)}}const I=new yt({color:9273450,roughness:.95});for(let it=0;it<9;it++){const Mt=new et(new ae(1.8,.24,.8),I);Mt.position.set(-4+it*.55,.15+it*.34,-32-it*.55),s.add(Mt)}const G=[{x:-17,z:-27,w:7.5,h:10.5,d:5.5,color:Gn[0]},{x:-8,z:-28.5,w:6.2,h:7.2,d:5,color:Gn[2]},{x:1,z:-27.5,w:6.8,h:12,d:5.5,color:Gn[3]},{x:10,z:-28.3,w:7.2,h:8.6,d:5,color:Gn[1]},{x:19,z:-27,w:6.6,h:11.2,d:5.5,color:Gn[4]}];for(const it of G)qr(s,n,{...it,windows:10,balcony:n()<.5});for(let it=0;it<3;it++)qr(s,n,{x:30.5,z:1+it*9,w:5,h:7+n()*4,d:6.5,rotY:Math.PI/2,color:Gn[(it+3)%Gn.length],windows:6});qr(s,n,{x:29,z:20,w:6,h:9,d:5,rotY:Math.PI/2,color:Gn[6],windows:5}),qr(s,n,{x:-27.5,z:20.5,w:5,h:8,d:5,color:Gn[5],windows:4}),sa(s,{text:"PRAÇA DO SOL",sub:"COMUNIDADE · DESDE 2041",color:"#ffb703",x:1,y:7.6,z:-24.6,w:10,h:2.5}),sa(s,{text:"BRASA",color:"#ff5d3a",x:26.8,y:6.5,z:5,w:5,h:1.7,rotY:-Math.PI/2}),sa(s,{text:"SAMBAR",sub:"RÁDIO COMUNITÁRIA 87.5",color:"#27e0b8",x:-17,y:4.8,z:-24.4,w:5.5,h:1.4});const K=new yt({color:2765615,roughness:.95}),k=new et(new ae(.4,4.6,13),K);k.position.set(24.2,2.3,6),k.receiveShadow=!0,s.add(k);const nt=new et(new cn(12.4,4.2),new yt({map:o_(),roughness:.9}));nt.rotation.y=-Math.PI/2,nt.position.set(23.97,2.35,6),s.add(nt);const V=new Se;V.position.set(0,0,-7.5);const Q=new yt({color:1712928,roughness:.55,metalness:.35}),j=new et(new Pe(3.4,3.7,.42,32),Q);j.position.y=.21,j.castShadow=!0,j.receiveShadow=!0,V.add(j);const bt=new et(new _s(3.44,3.62,48),new ye({color:2613432,transparent:!0,opacity:.65,side:Le,toneMapped:!1}));bt.rotation.x=-Math.PI/2,bt.position.y=.44,V.add(bt);const zt=new et(new _s(2.9,2.95,48),new ye({color:16758531,transparent:!0,opacity:.4,side:Le,toneMapped:!1}));zt.rotation.x=-Math.PI/2,zt.position.y=.45,V.add(zt);const Z=new yt({color:1054228,roughness:.7,metalness:.2}),_t=new yt({color:3752766,roughness:.6,metalness:.3,emissive:726804});for(const it of[-2.65,2.65]){const Mt=new Se;Mt.position.set(it,.43,.1);for(let Ht=0;Ht<3;Ht++){const kt=new et(new ae(.95,1.25,.8),Z);kt.position.y=.63+Ht*1.3,kt.castShadow=!0,Mt.add(kt);const fe=new et(new Pe(.28,.33,.1,16),_t);fe.rotation.x=Math.PI/2,fe.position.set(0,.64+Ht*1.3,.43),Mt.add(fe);const Ut=fe.clone();Ut.scale.set(.55,1,.55),Ut.position.z=.46,Mt.add(Ut)}V.add(Mt)}const St=new et(new ae(2.2,.95,.75),Z);St.position.set(0,.9,.15),St.castShadow=!0,V.add(St);const It=new et(new ae(2.3,.06,.8),new yt({color:2613432,emissive:1010517,emissiveIntensity:1.4,roughness:.35}));It.position.set(0,1.4,.15),V.add(It);const dt=new Se;dt.position.set(0,2.05,-.1);const Vt=new et(new Pe(.5,.8,.9,12),new yt({color:2898484,roughness:.4,metalness:.6}));Vt.position.y=-.45,dt.add(Vt);const Ie=new Wd({color:7733216,emissive:2613432,emissiveIntensity:1.15,roughness:.18,metalness:.1,transmission:0,toneMapped:!0}),Nt=new et(new ws(.58,2),Ie);dt.add(Nt);const he=new et(new ws(.3,1),new ye({color:6091471,toneMapped:!0}));dt.add(he);const xe=new ye({color:2613432,transparent:!0,opacity:.75,side:Le,toneMapped:!1}),Jt=new et(new li(1.02,.018,6,64),xe);Jt.rotation.x=Math.PI/2.2,dt.add(Jt);const Re=new et(new li(1.32,.012,6,64),xe.clone());Re.material.color.set(16758531),Re.material.opacity=.55,Re.rotation.set(Math.PI/3,.4,0),dt.add(Re);const Ne=tl(2613432,2.4,.32);dt.add(Ne);const Xe=new cr(2613432,14,18,2);Xe.position.set(0,.6,0),dt.add(Xe),V.add(dt);const be=new et(new Pe(.18,1.4,5.5,20,1,!0),new ye({color:2613432,transparent:!0,opacity:.075,blending:He,side:Le,depthWrite:!1,toneMapped:!1}));be.position.set(0,2.7,-.1),V.add(be),s.add(V);const fn=new et(new _s(3.8,4.4,64),new ye({color:2613432,transparent:!0,opacity:.16,side:Le,blending:He,toneMapped:!1}));fn.rotation.x=-Math.PI/2,fn.position.set(0,.05,-7.5),s.add(fn);const Fe=new yt({color:13144639,roughness:.7}),yn=new yt({color:15787984,roughness:.6});for(let it=0;it<3;it++){const Mt=new Se,Ht=new et(new Pe(.36,.3,.85,12),Fe);Ht.position.y=.43,Mt.add(Ht);const kt=new et(new Pl(.32,12),yn);kt.rotation.x=-Math.PI/2,kt.position.y=.86,Mt.add(kt),Mt.position.set(-4.6+it*.9,0,-4.8),Mt.rotation.z=.08,s.add(Mt)}const pn=[{x:-9,z:1.5,r:.75,s:1.2,rot:.2},{x:8.5,z:.5,r:.7,s:1.1,rot:-.3},{x:-13,z:9,r:.7,s:1,rot:.5},{x:11,z:9.5,r:.8,s:1.3,rot:.1},{x:-3.5,z:15,r:.65,s:.9,rot:.8},{x:3.5,z:-14.5,r:.7,s:1.1,rot:-.2},{x:-17,z:-12,r:.75,s:1.2,rot:.4},{x:16,z:-12,r:.7,s:1,rot:.6}];for(const it of pn)s.add(x_(it.x,it.z,it.s,it.rot));const Je=pn.map(it=>({type:"circle",x:it.x,z:it.z,r:it.r}));Je.push({type:"circle",x:0,z:-7.5,r:3.75}),v_(s),Je.push({type:"circle",x:15.5,z:11.5,r:1.6}),Yr(s,-20.5,18,4.4),Yr(s,20.5,18,4.4),Yr(s,-20.5,-18,4.6),Yr(s,20.5,-18,4.6);const U=[],bn=[[-22,16,1.05],[-22,7,.9],[-22.5,-3,1.15],[-22,-15,.95],[22,17.5,1],[22.5,-16,1.1],[-19,-21,.85],[19.8,6,.78],[23,24,1],[-24.5,26,.9]];for(const[it,Mt,Ht]of bn){const kt=__(Ht,3108160);kt.position.set(it,0,Mt),kt.rotation.y=n()*$e,kt.traverse(fe=>{fe.isMesh&&(fe.castShadow=!0)}),s.add(kt),U.push(kt),Je.push({type:"circle",x:it,z:Mt,r:.35})}const ve=new Se;ve.position.set(-27.5,0,8),ve.rotation.y=Math.PI/2;const Ee=new yt({color:14142900,roughness:.6});for(const it of[-2.2,2.2]){const Mt=new et(new Pe(.045,.045,2.3,6),Ee);Mt.position.set(it,1.15,0),ve.add(Mt)}const mt=new ye({color:15261641,wireframe:!0,transparent:!0,opacity:.25}),Ue=new et(new cn(4.4,.8,14,3),mt);Ue.position.y=1.8,ve.add(Ue),s.add(ve),el(s,-32,-2,16735546),el(s,-34,14,16758531);const Pt=[],Ft=[16758531,2613432,16735546,16051416,6065592,14257062];Pt.push(Vs(s,n,new C(-21,0,3),new C(21,0,3),6.2,22,Ft)),Pt.push(Vs(s,n,new C(-21,0,-12),new C(21,0,-12),6.6,22,Ft)),Pt.push(Vs(s,n,new C(-17,0,18),new C(17,0,18),5.4,18,Ft)),Pt.push(Vs(s,n,new C(-20,0,-2),new C(-20,0,14),5.8,10,Ft)),Pt.push(Vs(s,n,new C(20,0,-2),new C(20,0,14),5.8,10,Ft));const T=new yt({color:7295797,roughness:.9}),v=new yt({color:2304550,roughness:.7,metalness:.4});function O(it,Mt,Ht=0){const kt=new Se;kt.position.set(it,0,Mt),kt.rotation.y=Ht;const fe=new et(new ae(2.2,.12,.55),T);fe.position.y=.52,fe.castShadow=!0,kt.add(fe);const Ut=new et(new ae(2.2,.5,.09),T);Ut.position.set(0,.82,-.24),kt.add(Ut);for(const Ge of[-.85,.85]){const Qt=new et(new ae(.09,.5,.46),v);Qt.position.set(Ge,.26,0),kt.add(Qt)}s.add(kt)}O(-6,20,0),O(6,20,0),O(-21,10.5,Math.PI/2),O(21,1,-Math.PI/2);const tt=new Se,J=new et(new Tn(.5,8,6),new yt({color:1844001,roughness:.6}));J.scale.set(1.6,.8,.8),tt.add(J);const at=new et(new Tn(.09,6,4),new ye({color:16726831,toneMapped:!1}));at.position.set(0,-.2,.5),tt.add(at);const ht=tl(16726831,2,.8);ht.position.copy(at.position),tt.add(ht),tt.position.set(-60,32,-80),s.add(tt);const q=e?160:280,Y=new Float32Array(q*3),lt=new Float32Array(q),R=new Float32Array(q);for(let it=0;it<q;it++)Y[it*3]=(n()-.5)*56,Y[it*3+1]=.4+n()*9,Y[it*3+2]=-20+n()*48,lt[it]=n()*$e,R[it]=.15+n()*.5;const $=new Ae;$.setAttribute("position",new un(Y,3));const X=new rr({map:ia(),color:16761963,size:.07,transparent:!0,opacity:.55,blending:He,depthWrite:!1,sizeAttenuation:!0,toneMapped:!1}),ut=new ma($,X);s.add(ut);const rt=e?50:90,ot=new Float32Array(rt*3);for(let it=0;it<rt;it++){const Mt=n()*$e,Ht=1+n()*5;ot[it*3]=Math.cos(Mt)*Ht,ot[it*3+1]=.2+n()*4.5,ot[it*3+2]=-7.5+Math.sin(Mt)*Ht}const At=new Ae;At.setAttribute("position",new un(ot,3));const Kt=new rr({map:ia(),color:2613432,size:.06,transparent:!0,opacity:.34,blending:He,depthWrite:!1,sizeAttenuation:!0,toneMapped:!1}),st=new ma(At,Kt);s.add(st);const Lt=new Gi({map:ia(),color:16767392,transparent:!0,opacity:.35,blending:He,depthWrite:!1,toneMapped:!1}),Wt=new ys(Lt);Wt.position.set(55,65,-160),Wt.scale.set(16,16,1),i.add(Wt);const gt={minX:-23.5,maxX:23.5,minZ:-18.5,maxZ:21.5};function ge(it,Mt){a.uniforms.uTime.value=Mt,l.uniforms.uTime.value=Mt,Nt.rotation.y+=it*.6,Nt.rotation.x+=it*.18,he.rotation.y-=it*1.2,he.rotation.z+=it*.7,Jt.rotation.z+=it*.5,Re.rotation.z-=it*.35,Re.rotation.x=Math.PI/3+Math.sin(Mt*.4)*.18;const Ht=1+Math.sin(Mt*1.7)*.045;Ne.scale.setScalar(2.4*Ht),Xe.intensity=13+Math.sin(Mt*2.1)*2,be.material.opacity=.04+Math.sin(Mt*1.2)*.012;for(const Ut of Pt){const Ge=Ut.mesh.geometry.attributes.position.array;for(let Qt=0;Qt<Ut.base.length/3;Qt++){const wn=Ut.base[Qt*3],mn=Ut.base[Qt*3+1],qe=Ut.base[Qt*3+2],nn=Ut.phase[Qt];Ge[Qt*3]=wn+Math.sin(Mt*1.6+nn)*.09,Ge[Qt*3+1]=mn+Math.sin(Mt*1.1+nn*1.3)*.05,Ge[Qt*3+2]=qe+Math.cos(Mt*1.3+nn)*.05}Ut.mesh.geometry.attributes.position.needsUpdate=!0}for(let Ut=0;Ut<U.length;Ut++){const Qt=U[Ut].userData.crown;Qt&&(Qt.rotation.z=Math.sin(Mt*.8+Ut)*.035,Qt.rotation.x=Math.cos(Mt*.65+Ut*1.7)*.028)}const kt=$.attributes.position.array;for(let Ut=0;Ut<q;Ut++)kt[Ut*3+1]+=R[Ut]*it*.35,kt[Ut*3]+=Math.sin(Mt*.35+lt[Ut])*it*.11,kt[Ut*3+1]>10.5&&(kt[Ut*3+1]=.3,kt[Ut*3]=(Math.random()-.5)*56,kt[Ut*3+2]=-20+Math.random()*48);$.attributes.position.needsUpdate=!0,X.opacity=.65+Math.sin(Mt*2.2)*.15;const fe=At.attributes.position.array;for(let Ut=0;Ut<rt;Ut++)fe[Ut*3+1]+=it*(.3+Ut%5*.06),fe[Ut*3+1]>5.2&&(fe[Ut*3+1]=.2);At.attributes.position.needsUpdate=!0,Kt.opacity=.45+Math.sin(Mt*3.1)*.2,tt.position.x=-60+Math.sin(Mt*.06)*45,tt.position.z=-80+Math.cos(Mt*.05)*25,tt.position.y=30+Math.sin(Mt*.3)*2,at.material.color.setHex(Math.sin(Mt*5)>0?16726831:2883456),ht.material.color.copy(at.material.color),bt.material.opacity=.5+Math.sin(Mt*2)*.18,fn.material.opacity=.12+Math.sin(Mt*1.4)*.05}return{root:s,update:ge,bounds:gt,obstacles:Je,core:{group:dt,orb:Nt,position:new C(0,2.55,-7.6)},sun:c,sky:a,ocean:l,stage:V}}const S_=Math.PI*2,ln=(i,t,e)=>Math.max(t,Math.min(e,i)),ai=(i,t,e)=>i+(t-i)*e,Ui={rifle:{id:"rifle",name:"SACI-15",type:"FUZIL · AUTOMÁTICO",damage:24,headMult:2.1,rpm:620,mag:30,spread:.0075,pellets:1,reloadTime:1.55,auto:!0,kick:.011,bloom:.0028,maxBloom:.022,tracer:16765286},shotgun:{id:"shotgun",name:"BOTO-12",type:"ESPINGARDA · CURTA",damage:15,headMult:1.6,rpm:78,mag:6,spread:.048,pellets:8,reloadTime:2.25,auto:!1,kick:.045,bloom:.008,maxBloom:.03,tracer:16752222}};function me(i,t,e,n,s=0,r=0,a=0){const l=new et(new ae(i,t,e),n);return l.position.set(s,r,a),l}function Zs(i,t,e,n,s=0,r=0,a=0,l=10){const o=new et(new Pe(i,t,e,l),n);return o.rotation.x=Math.PI/2,o.position.set(s,r,a),o}function y_(){const i=new Se,t=new yt({color:1646621,roughness:.48,metalness:.5}),e=new yt({color:2902578,roughness:.62,metalness:.15}),n=new yt({color:11569742,roughness:.66,metalness:.12}),s=new yt({color:14248485,roughness:.5,metalness:.2}),r=new yt({color:790542,roughness:.5,metalness:.4}),a=new yt({color:7174001,roughness:.32,metalness:.8});i.add(me(.095,.115,.5,t,0,0,-.08)),i.add(me(.105,.035,.34,e,0,.068,-.13)),i.add(Zs(.02,.022,.42,a,0,.012,-.52,10)),i.add(Zs(.034,.034,.09,r,0,.012,-.75,10)),i.add(Zs(.026,.026,.05,s,0,.012,-.7,8)),i.add(me(.083,.075,.31,e,0,-.004,-.34)),i.add(me(.088,.02,.3,s,0,-.043,-.34));for(let A=0;A<3;A++)i.add(me(.09,.012,.018,r,0,.024,-.46+A*.07));i.add(me(.082,.09,.24,n,0,-.015,.25)),i.add(me(.072,.06,.1,r,0,0,.38)),i.add(me(.05,.15,.075,r,0,-.105,.09));const l=me(.06,.2,.085,e,0,-.135,-.03);l.rotation.x=-.18,i.add(l),i.add(me(.03,.032,.13,r,0,.021,.04));const o=me(.055,.035,.11,r,0,.104,-.11);i.add(o);const c=new et(new li(.031,.006,5,14),a);c.position.set(0,.15,-.11),c.rotation.y=Math.PI/2,c.rotation.z=0,i.add(c);const h=new et(new Tn(.0065,6,5),new ye({color:16735546,toneMapped:!1}));h.position.set(.007,.15,-.11),i.add(h),i.add(me(.012,.045,.09,s,-.055,.02,-.2)),i.add(me(.012,.03,.03,e,.055,.02,-.2));const d=new yt({color:2763558,roughness:.8}),u=new yt({color:9198397,roughness:.7}),f=new yt({color:3360826,roughness:.85}),_=me(.085,.095,.11,d,.012,-.13,.1);_.rotation.x=-.25,i.add(_),i.add(me(.095,.13,.12,f,.06,-.21,.23));const x=me(.085,.08,.13,d,-.006,-.06,-.36);x.rotation.x=.12,i.add(x),i.add(me(.09,.1,.16,u,-.03,-.115,-.45)),i.add(me(.1,.12,.2,f,-.09,-.19,-.47));const m=new Se,p=new ye({color:16761963,transparent:!0,opacity:0,blending:He,depthWrite:!1,side:Le,toneMapped:!1}),M=new et(new Wi(.075,.26,6,1,!0),p);M.rotation.x=-Math.PI/2,M.position.z=-.12,m.add(M);const E=new et(new cn(.24,.24),p);E.position.z=-.02,m.add(E),m.position.set(0,.012,-.8),i.add(m);const b=new cr(16754237,0,5,2);return b.position.set(0,.02,-.85),i.add(b),i.userData={flash:m,flashMat:p,light:b,kind:"rifle"},i}function b_(){const i=new Se,t=new yt({color:1989464,roughness:.42,metalness:.55}),e=new yt({color:1317657,roughness:.5,metalness:.45}),n=new yt({color:8212267,roughness:.7,metalness:.05}),s=new yt({color:14248485,roughness:.5,metalness:.2}),r=new yt({color:8029568,roughness:.3,metalness:.85});i.add(me(.105,.115,.4,t,0,0,-.04)),i.add(me(.11,.04,.3,s,0,.066,-.1)),i.add(Zs(.031,.031,.52,r,-.028,.035,-.48,12)),i.add(Zs(.031,.031,.52,r,.028,.035,-.48,12)),i.add(me(.105,.06,.32,t,0,-.03,-.3)),i.add(me(.07,.26,.24,n,0,-.03,.27)),i.add(me(.078,.13,.06,n,0,-.17,.34)),i.add(me(.08,.07,.34,n,0,-.02,.14)),i.add(me(.055,.15,.08,e,0,-.1,-.14)),i.add(me(.11,.06,.22,n,0,-.07,-.27)),i.add(me(.012,.022,.34,e,0,.062,-.44));const a=new et(new Tn(.012,6,5),new ye({color:16758531,toneMapped:!1}));a.position.set(0,.08,-.7),i.add(a);const l=new yt({color:2763558,roughness:.8}),o=new yt({color:9198397,roughness:.7}),c=new yt({color:3360826,roughness:.85}),h=me(.09,.1,.12,l,.01,-.1,.15);h.rotation.x=-.15,i.add(h),i.add(me(.1,.13,.18,c,.07,-.2,.27)),i.add(me(.09,.08,.14,l,-.005,-.09,-.33)),i.add(me(.09,.1,.16,o,-.035,-.14,-.42)),i.add(me(.1,.12,.2,c,-.09,-.2,-.46));const d=new Se,u=new ye({color:16757086,transparent:!0,opacity:0,blending:He,depthWrite:!1,side:Le,toneMapped:!1}),f=new et(new Wi(.12,.34,7,1,!0),u);f.rotation.x=-Math.PI/2,f.position.z=-.14,d.add(f);const _=new et(new cn(.34,.34),u);_.position.z=-.02,d.add(_),d.position.set(0,.035,-.78),i.add(d);const x=new cr(16751165,0,6,2);return x.position.set(0,.04,-.85),i.add(x),i.userData={flash:d,flashMat:u,light:x,kind:"shotgun"},i}class w_{constructor(t,e,n,{mobile:s=!1,audio:r,input:a}){this.camera=t,this.scene=e,this.world=n,this.mobile=s,this.audio=r,this.input=a,this.position=new C(0,0,13),this.velocity=new C,this.yaw=0,this.pitch=0,this.eyeHeight=1.7,this.radius=.38,this.health=100,this.maxHealth=100,this.dead=!1,this.alive=!1,this.weapons={rifle:{...Ui.rifle,ammo:Ui.rifle.mag,reloading:!1,reloadT:0,cooldown:0},shotgun:{...Ui.shotgun,ammo:Ui.shotgun.mag,reloading:!1,reloadT:0,cooldown:0}},this.current="rifle",this.switching=0,this.pendingWeapon=null,this.bloom=0,this.triggerDown=!1,this.lastDamageTime=-99,this.recoil=0,this.recoilPitch=0,this.kickPitch=0,this.shake=0,this.bobPhase=0,this.dashTime=0,this.dashCooldown=0,this.dashDir=new C,this.fovBase=s?72:68,this.fovCurrent=this.fovBase,this.aimKick=0,this.stepDistance=0,this.weaponKick=0,this.hitPulse=0,this.flashTimer=0,this.time=0,this.camera.rotation.order="YXZ",this.camera.fov=this.fovBase,this.camera.near=.045,this.camera.updateProjectionMatrix(),this.viewRoot=new Se,this.viewRoot.position.set(.32,-.3,-.7),this.viewRoot.rotation.set(.02,-.04,0),this.viewRoot.scale.setScalar(.94),t.add(this.viewRoot),this.rifleModel=y_(),this.shotgunModel=b_(),this.rifleModel.position.set(0,0,0),this.shotgunModel.position.set(0,0,0),this.shotgunModel.visible=!1,this.viewRoot.add(this.rifleModel),this.viewRoot.add(this.shotgunModel),this.viewLight=new cr(16761994,3.6,4,2),this.viewLight.position.set(.05,.35,-.2),t.add(this.viewLight),this.onShoot=null,this.onStep=null,this.onDeath=null,this.onDamage=null,this.hudState=null,this.state={ammo:30,mag:30,weapon:"rifle",name:Ui.rifle.name,type:Ui.rifle.type,reloading:!1,reloadProgress:0,health:100,bloom:0,dashCooldown:0}}reset(){this.position.set(0,0,13),this.velocity.set(0,0,0),this.yaw=0,this.pitch=-.015,this.health=this.maxHealth,this.dead=!1,this.alive=!0,this.bloom=0,this.triggerDown=!1,this.lastDamageTime=-99,this.recoil=0,this.recoilPitch=0,this.kickPitch=0,this.shake=0,this.dashTime=0,this.dashCooldown=0,this.fovCurrent=this.fovBase,this.current="rifle",this.switching=0,this.pendingWeapon=null;for(const t of Object.keys(this.weapons))this.weapons[t].ammo=Ui[t].mag,this.weapons[t].reloading=!1,this.weapons[t].reloadT=0,this.weapons[t].cooldown=0;this.rifleModel.visible=!0,this.shotgunModel.visible=!1,this.viewRoot.position.set(.32,-.3,-.7),this.camera.position.set(this.position.x,this.eyeHeight,this.position.z),this.camera.rotation.set(this.pitch,this.yaw,0),this.syncModel()}get weapon(){return this.weapons[this.current]}get dir(){const t=new C(0,0,-1);return t.applyEuler(new Fn(this.pitch,this.yaw,0,"YXZ")),t}syncModel(){this.rifleModel.visible=this.current==="rifle",this.shotgunModel.visible=this.current==="shotgun"}addLook(t,e){this.yaw-=t,this.pitch-=e,this.pitch=ln(this.pitch,-1.32,1.32),this.pitch>1.25&&(this.pitch=1.25),this.yaw>Math.PI&&(this.yaw-=Math.PI*2),this.yaw<-Math.PI&&(this.yaw+=Math.PI*2)}tryDash(){if(this.dashCooldown>0||this.dead)return!1;const t=this.input.getMove(),e=new C(-Math.sin(this.yaw),0,-Math.cos(this.yaw)),n=new C(Math.cos(this.yaw),0,-Math.sin(this.yaw));return Math.abs(t.x)+Math.abs(t.y)>.1?this.dashDir.copy(e).multiplyScalar(t.y).addScaledVector(n,t.x).normalize():this.dashDir.copy(e),this.dashTime=.22,this.dashCooldown=3.6,this.shake=Math.max(this.shake,.18),this.audio?.dash(),this.input.haptic?.(18),!0}startReload(t=!1){const e=this.weapon;return e.reloading||e.ammo>=e.mag||this.dead?!1:(e.reloading=!0,e.reloadT=0,this.audio?.reload(0),setTimeout(()=>this.audio?.reload(1),e.reloadTime*400),setTimeout(()=>this.audio?.reload(2),e.reloadTime*780),!0)}switchWeapon(t){if(this.switching>0&&this.pendingWeapon===null)return;let e=t||(this.current==="rifle"?"shotgun":"rifle");e===this.current||!this.weapons[e]||(this.pendingWeapon=e,this.switching=.42,this.audio?.swap(),this.weapon.reloading=!1)}finishSwitch(){this.pendingWeapon&&(this.current=this.pendingWeapon,this.pendingWeapon=null,this.syncModel(),this.bloom=0)}takeDamage(t,e){this.dead||!this.alive||this.time-this.lastDamageTime<.18||(this.health=Math.max(0,this.health-t),this.lastDamageTime=this.time,this.shake=Math.max(this.shake,.24),this.aimKick=1,this.audio?.playerHit(),this.input.haptic?.([18,30,12]),this.onDamage?.(t,e),this.health<=0&&(this.dead=!0,this.alive=!1,this.firing=!1,this.onDeath?.()))}heal(t){this.health=Math.min(this.maxHealth,this.health+t)}update(t,e){this.time=e;const n=this.input,s=n.consumeLook();if(this.alive&&this.addLook(s.x,s.y),!this.alive){this.updateWeapon(t,e,0);return}const r=n.consumeActions();r.dash&&this.tryDash(),r.reload&&this.startReload(),r.swap&&this.switchWeapon();const a=n.getMove(),l=(a.sprint?7:5.15)*(this.weapon.reloading?.82:1),o=new C(-Math.sin(this.yaw),0,-Math.cos(this.yaw)),c=new C(Math.cos(this.yaw),0,-Math.sin(this.yaw)),h=new C;h.addScaledVector(o,a.y),h.addScaledVector(c,a.x),h.lengthSq()>1&&h.normalize(),h.multiplyScalar(l);const d=14;if(this.velocity.x=ai(this.velocity.x,h.x,ln(d*t,0,1)),this.velocity.z=ai(this.velocity.z,h.z,ln(d*t,0,1)),this.dashTime>0){this.dashTime-=t;const L=17*(.45+Math.max(this.dashTime/.22,0)*.55);this.velocity.x=this.dashDir.x*L,this.velocity.z=this.dashDir.z*L}this.dashCooldown=Math.max(0,this.dashCooldown-t);const u=this.position.x,f=this.position.z;this.position.x+=this.velocity.x*t,this.position.z+=this.velocity.z*t,this.resolveCollisions();const _=Math.hypot(this.position.x-u,this.position.z-f);this.stepDistance+=_,this.stepDistance>2.35&&a.magnitude>.15&&(this.stepDistance=0,this.onStep?.(this.position)),e-this.lastDamageTime>5.2&&this.health<this.maxHealth&&(this.health=Math.min(this.maxHealth,this.health+t*9));const x=n.firing&&!this.weapon.reloading&&this.switching<=0&&this.weapon.ammo>0,m=this.weapon;m.cooldown=Math.max(0,m.cooldown-t),m.auto?x&&m.cooldown<=0&&this.fire():(x&&!this.triggerDown&&m.cooldown<=0&&this.fire(),n.firing&&m.ammo===0&&!this.triggerDown&&this.audio?.empty()),this.triggerDown=n.firing,n.firing&&m.ammo===0&&!m.reloading?(this.autoReloadTimer=(this.autoReloadTimer||0)+t,this.autoReloadTimer>.35&&(this.autoReloadTimer=0,this.startReload(!0))):this.autoReloadTimer=0;for(const y of Object.keys(this.weapons)){const L=this.weapons[y];L.reloading&&(L.reloadT+=t,L.reloadT>=L.reloadTime&&(L.reloading=!1,L.reloadT=0,L.ammo=L.mag,this.current===y&&this.audio?.reload(2)))}this.switching>0&&(this.switching-=t,this.switching<=.21&&this.pendingWeapon&&this.finishSwitch()),this.bloom=Math.max(0,this.bloom-t*.045),this.recoil=ai(this.recoil,0,ln(t*9,0,1)),this.recoilPitch=ai(this.recoilPitch,0,ln(t*10,0,1)),this.kickPitch=ai(this.kickPitch,0,ln(t*12,0,1)),this.shake=ai(this.shake,0,ln(t*7,0,1)),this.aimKick=ai(this.aimKick,0,ln(t*4,0,1)),this.weaponKick=ai(this.weaponKick,0,ln(t*11,0,1));const p=ln(Math.hypot(this.velocity.x,this.velocity.z)/6,0,1);p>.04&&(this.bobPhase+=t*(8+p*3));const M=Math.sin(this.bobPhase*2)*.022*p,E=Math.cos(this.bobPhase)*.018*p,b=Math.sin(e*1.3)*.0035,A=(Math.random()-.5)*this.shake*.05,w=(Math.random()-.5)*this.shake*.05;this.camera.position.set(this.position.x+E*.35+A,this.eyeHeight+M+b+w-this.aimKick*.045,this.position.z),this.camera.rotation.set(this.pitch+this.recoilPitch+this.kickPitch*.4,this.yaw+Math.sin(this.bobPhase)*.0016*p,Math.sin(this.bobPhase)*.0012*p+A*.2);const g=this.fovBase+(this.dashTime>0?9:0)+this.aimKick*2.5;this.fovCurrent=ai(this.fovCurrent,g,ln(t*8,0,1)),Math.abs(this.camera.fov-this.fovCurrent)>.01&&(this.camera.fov=this.fovCurrent,this.camera.updateProjectionMatrix()),this.updateWeapon(t,e,p),this.updateState()}updateWeapon(t,e,n){const s=this.weapon,r=this.current==="rifle"?this.rifleModel:this.shotgunModel,a=[this.rifleModel,this.shotgunModel],l=Math.sin(this.bobPhase)*.012*n,o=Math.cos(this.bobPhase*2)*.008*n,c=s.reloading?Math.sin(ln(s.reloadT/s.reloadTime,0,1)*Math.PI):0,h=this.switching>0?Math.sin(ln((.42-this.switching)/.42,0,1)*Math.PI):0,d=Math.sin(e*1.4)*.003;this.viewRoot.position.set(.32+l*.7,-.3+o+d-c*.16-h*.18,-.7+this.recoil*.11),this.viewRoot.rotation.set(.02-this.recoil*.13+c*.4+h*.5,-.04+Math.sin(e*.7)*.002,c*.12),this.flashTimer=Math.max(0,this.flashTimer-t);for(const u of a){const f=u.userData;if(!f)continue;const _=u===r&&this.flashTimer>0;f.flashMat.opacity=_?.95:0,f.light.intensity=_?28*(this.flashTimer/.055):0,f.flash.visible=_,_&&(f.flash.rotation.z=Math.random()*S_,f.flash.scale.setScalar(.8+Math.random()*.5))}if(this.switching>.21){const u=this.current==="rifle"?this.rifleModel:this.shotgunModel;u.visible=!0}}fire(){const t=this.weapon;t.ammo--;const e=60/t.rpm;t.cooldown=e,this.bloom=Math.min(t.maxBloom,this.bloom+t.bloom),this.weaponKick=1,this.flashTimer=.055,this.recoil=Math.min(1.8,this.recoil+1),this.recoilPitch+=t.kick*(this.mobile?.7:1),this.kickPitch+=t.kick*.7,this.shake=Math.max(this.shake,t.id==="shotgun"?.16:.055),this.audio?.shoot(t.id),this.input.haptic?.(t.id==="shotgun"?22:7);const n=t.spread+this.bloom,s=this.camera.position.clone(),r=new C(.16,-.12,-.8);r.applyEuler(new Fn(this.pitch,this.yaw,0,"YXZ")),r.add(this.camera.position),this.onShoot?.({weapon:t,spread:n,origin:s,muzzle:r}),this.updateState()}resolveCollisions(){const t=this.world.bounds;this.position.x=ln(this.position.x,t.minX+this.radius,t.maxX-this.radius),this.position.z=ln(this.position.z,t.minZ+this.radius,t.maxZ-this.radius);for(const e of this.world.obstacles){if(e.type!=="circle")continue;const n=this.position.x-e.x,s=this.position.z-e.z,r=e.r+this.radius,a=n*n+s*s;if(a<r*r&&a>1e-4){const l=Math.sqrt(a);this.position.x=e.x+n/l*r,this.position.z=e.z+s/l*r}}}updateState(){const t=this.weapon,e=this.state;e.ammo=t.ammo,e.mag=t.mag,e.weapon=this.current,e.name=t.name,e.type=t.type,e.reloading=t.reloading,e.reloadProgress=t.reloading?ln(t.reloadT/t.reloadTime,0,1):0,e.health=this.health,e.bloom=this.bloom,e.dashCooldown=this.dashCooldown}getMuzzleWorld(){return this.camera.localToWorld(new C(.16,-.1,-.85))}}const ds=Math.PI*2,ro=(i,t,e)=>Math.max(t,Math.min(e,i)),je=(i,t)=>i+Math.random()*(t-i),E_={vespa:{name:"VESPA",hp:52,speed:4.1,radius:.78,scale:.92,altitude:[3.4,6.2],orbit:[6,10],fireMin:2.4,fireMax:3.8,projectileDamage:8,coreDamage:3,color:16742965,eye:16758531,score:100},urubu:{name:"URUBU",hp:118,speed:2.5,radius:1,scale:1.22,altitude:[3,5.6],orbit:[7.5,12],fireMin:1.9,fireMax:3,projectileDamage:13,coreDamage:6,color:16726831,eye:16731453,score:250},colosso:{name:"COLOSSO",hp:2100,speed:1.35,radius:2.9,scale:3.1,altitude:[4.6,6.4],orbit:[8.5,11.5],fireMin:1.2,fireMax:2,projectileDamage:18,coreDamage:12,color:16728870,eye:16765286,score:5e3,boss:!0}};let Kr=null;function nh(){if(Kr)return Kr;const i=[],t=new ws(.44,1);t.scale(1.1,.72,1.25),i.push(t);const e=new Wi(.19,.5,6);e.rotateX(Math.PI/2),e.translate(0,0,.46),i.push(e);for(const h of[-1,1]){const d=new ae(.85,.08,.14);d.translate(h*.5,.05,0),i.push(d);const u=new Pe(.18,.18,.17,8);u.translate(h*.87,.03,0),i.push(u);const f=new ae(.05,.3,.36);f.translate(h*.36,-.16,-.12),i.push(f)}const n=new ae(.28,.09,.5);n.translate(0,.29,-.06),i.push(n);const s=xs(i.map(h=>h.index?h.toNonIndexed():h)),r=[],a=new Tn(.47,8,5,0,ds,0,Math.PI/2);a.scale(1.1,.45,1.2),a.translate(0,.18,0),r.push(a);for(const h of[-1,1]){const d=new ae(.7,.11,.36);d.rotateZ(h*.12),d.translate(h*.46,-.1,0),r.push(d)}const l=xs(r.map(h=>h.index?h.toNonIndexed():h)),o=[];for(let h=0;h<3;h++){const d=new ae(.55,.022,.09);d.rotateY(h/3*ds),d.translate(0,0,0),o.push(d)}const c=xs(o.map(h=>h.index?h.toNonIndexed():h));return Kr={chassis:s,armor:l,blades:c},Kr}class T_{constructor(t,e,n,{audio:s,onKill:r,onCoreHit:a,onPlayerHit:l,onSpawn:o}={}){this.scene=t,this.world=e,this.effects=n,this.audio=s,this.onKill=r,this.onCoreHit=a,this.onPlayerHit=l,this.onSpawn=o,this.enemies=[],this.projectiles=[],this.boss=null,this.time=0,this.projectileMesh=this.makeProjectilePool()}makeProjectilePool(){const t=new ws(.16,1),e=new ye({color:16777215,toneMapped:!1,transparent:!0,opacity:.95}),n=new Bh(t,e,96);n.instanceMatrix.setUsage(Ch),n.frustumCulled=!1,n.count=96;const s=new le().makeScale(0,0,0);for(let c=0;c<96;c++)n.setMatrixAt(c,s);const r=new Dt(1,.3,.15);for(let c=0;c<96;c++)n.setColorAt(c,r);this.scene.add(n);const a=new Float32Array(288),l=new Ae;l.setAttribute("position",new un(a,3));const o=new rr({color:16742965,size:.42,map:this.pointTexture(),transparent:!0,opacity:.6,blending:He,depthWrite:!1,sizeAttenuation:!0,toneMapped:!1});return this.glowPoints=new ma(l,o),this.glowPoints.frustumCulled=!1,this.scene.add(this.glowPoints),this._glowPositions=a,n}pointTexture(){if(this._pt)return this._pt;const t=document.createElement("canvas");t.width=t.height=64;const e=t.getContext("2d"),n=e.createRadialGradient(32,32,0,32,32,31);return n.addColorStop(0,"rgba(255,255,255,1)"),n.addColorStop(.25,"rgba(255,200,120,0.8)"),n.addColorStop(.6,"rgba(255,90,40,0.22)"),n.addColorStop(1,"rgba(255,40,20,0)"),e.fillStyle=n,e.fillRect(0,0,64,64),this._pt=new wa(t),this._pt.colorSpace=tn,this._pt}spawn(t,e=null){const n=E_[t];if(!n)return null;const s=nh(),r=new Se,a=n.scale;r.scale.setScalar(a);const l=new yt({color:1844258,roughness:.35,metalness:.72,emissive:329735,emissiveIntensity:1}),o=new yt({color:n.color,roughness:.38,metalness:.55,emissive:n.color,emissiveIntensity:.22}),c=new ye({color:n.eye,toneMapped:!1}),h=new ye({color:n.color,transparent:!0,opacity:.7,toneMapped:!1,side:Le}),d=new et(s.chassis,l);d.castShadow=!0,r.add(d);const u=new et(s.armor,o);u.castShadow=!0,r.add(u);const f=[];for(const w of[-1,1]){const g=new Se;g.position.set(w*.87,.13,0);const y=new et(s.blades,new yt({color:2304809,roughness:.3,metalness:.8,transparent:!0,opacity:.8}));g.add(y);const L=new et(new li(.3,.018,4,20),h.clone());L.rotation.x=Math.PI/2,g.add(L),r.add(g),f.push(g)}const _=new et(new Tn(.125,8,6),c);_.position.set(0,.02,.48),r.add(_);const x=new ys(new Gi({map:this.pointTexture(),color:n.eye,transparent:!0,opacity:.85,blending:He,depthWrite:!1,toneMapped:!1}));x.scale.set(.5,.5,1),x.position.copy(_.position),r.add(x);const m=new et(new li(.74,.012,4,36),h);m.rotation.x=Math.PI/2.3,r.add(m);const p=new et(new li(.92,.008,4,36),h.clone());p.rotation.set(Math.PI/2,.3,.4),p.material.opacity=.32,r.add(p);const M=new ys(new Gi({map:this.pointTexture(),color:n.color,transparent:!0,opacity:.4,blending:He,depthWrite:!1,toneMapped:!1}));if(M.scale.set(1.6,1.6,1),M.position.y=-.2,r.add(M),n.boss){const w=new et(new li(1.6,.04,5,48),new ye({color:16758531,transparent:!0,opacity:.55,toneMapped:!1}));w.rotation.x=Math.PI/2,r.add(w),r.userData.bossRing=w;const g=new et(new Wi(.5,1.2,5),new yt({color:13738301,metalness:.7,roughness:.3,emissive:4860416}));g.position.y=.68,g.rotation.z=Math.PI,r.add(g)}let E;if(e)E=e.clone();else{const w=Math.random()*ds,g=30+Math.random()*8;E=new C(Math.cos(w)*g,je(7,13),-3+Math.sin(w)*g),n.boss&&E.set(0,9.5,-27)}r.position.copy(E);const b=Math.atan2(E.x,E.z),A={type:t,def:n,group:r,position:r.position,hp:n.hp,maxHp:n.hp,scale:a,radius:n.radius,hitRadius:n.radius*.85,orbitAngle:b+Math.PI,orbitRadius:je(n.orbit[0],n.orbit[1]),altitude:je(n.altitude[0],n.altitude[1]),speed:n.speed,fireTimer:je(1.4,2.6),charge:0,charging:!1,flash:0,dead:!1,targetPlayer:!1,retargetTimer:je(.6,1.8),phase:Math.random()*ds,bank:0,eye:_,eyeGlow:x,eyeMat:c,bodyMat:l,armorMat:o,ringMat:h,halo:m,halo2:p,rotors:f,underGlow:M,bossRing:r.userData.bossRing||null,burstTimer:je(3.5,5.5),tail:0,name:n.name};return r.userData.enemy=A,this.scene.add(r),this.enemies.push(A),n.boss&&(this.boss=A),this.effects?.spawnPortal(E,n.color),this.onSpawn?.(A),A}update(t,e,n){this.time=e;for(let s=this.enemies.length-1;s>=0;s--){const r=this.enemies[s];this.updateEnemy(r,t,e,n)}this.updateProjectiles(t,n)}updateEnemy(t,e,n,s){const r=this.world.core.position,a=t.def;if(t.flash>0?(t.flash=Math.max(0,t.flash-e*6),t.armorMat.emissiveIntensity=.22+t.flash*3.2,t.bodyMat.emissive.setHex(16777215),t.bodyMat.emissiveIntensity=t.flash*1.6):(t.bodyMat.emissiveIntensity=1,t.bodyMat.emissive.setHex(329735)),t.retargetTimer-=e,t.retargetTimer<=0){t.retargetTimer=je(1.2,2.4);const E=s.position.distanceTo(t.position);t.targetPlayer=E<25&&Math.random()<(a.boss?.5:.62)}t.orbitAngle+=e*(a.boss?.12:.22+(t.type==="vespa"?.08:0));const l=r.x+Math.cos(t.orbitAngle)*t.orbitRadius,o=r.z+Math.sin(t.orbitAngle)*t.orbitRadius,c=Math.sin(n*1.25+t.phase)*.55,h=t.altitude+c,d=l-t.position.x,u=h-t.position.y,f=o-t.position.z,_=Math.hypot(d,u,f);if(_>.2){const E=t.speed*(t.charging?.5:1),b=Math.min(_,E*e);t.position.x+=d/_*b,t.position.y+=u/_*b,t.position.z+=f/_*b,t.bank=ro(d/Math.max(_,.1)*-.4,-.35,.35)}t.group.rotation.z=t.bank*.8,t.group.rotation.x=-.05+Math.sin(n*1.6+t.phase)*.03;const x=t.targetPlayer?s.camera.position:r,m=x.x-t.position.x,p=x.z-t.position.z,M=Math.atan2(m,p);t.group.rotation.y=this.lerpAngle(t.group.rotation.y,M,ro(e*3.2,0,1));for(const E of t.rotors)E.rotation.y+=e*(t.type==="colosso"?11:26);t.halo.rotation.z+=e*1.5,t.halo2.rotation.y+=e*2.1,t.eyeGlow.material.opacity=.7+Math.sin(n*4+t.phase)*.18+(t.charging?.3:0),t.eye.scale.setScalar(1+(t.charging?Math.sin(n*40)*.15+.2:0)),t.bossRing&&(t.bossRing.rotation.z+=e*.6,t.bossRing.material.opacity=.35+Math.sin(n*1.7)*.15),t.underGlow.material.opacity=.3+Math.sin(n*2.2+t.phase)*.09,t.fireTimer-=e,t.charging?(t.charge-=e,t.charge<=0&&(t.charging=!1,this.fireAt(t,s),t.fireTimer=je(a.fireMin,a.fireMax))):t.fireTimer<=0&&(t.position.distanceTo(r)<26?(t.charging=!0,t.charge=a.boss?.45:.5):t.fireTimer=.5),a.boss&&(t.burstTimer-=e,t.burstTimer<=0&&(t.burstTimer=t.hp/t.maxHp<.5?3.8:5.5,this.bossBurst(t,s)))}lerpAngle(t,e,n){let s=e-t;for(;s>Math.PI;)s-=ds;for(;s<-Math.PI;)s+=ds;return t+s*n}fireAt(t,e){const n=t.def,s=t.targetPlayer&&e.alive,r=s?e.camera.position.clone():this.world.core.position.clone();s?(r.x+=je(-.8,.8),r.y+=je(-.35,.35),r.z+=je(-.8,.8)):(r.x+=je(-.7,.7),r.y+=je(-.5,.5),r.z+=je(-.7,.7));const a=new C;t.eye.getWorldPosition(a);const l=r.sub(a).normalize(),o=n.boss?15:s?13.5:11.5;this.spawnProjectile(a,l,o,n.projectileDamage,n.coreDamage,s,t.type==="colosso"),this.effects?.spawnMuzzle(a,n.color,1.1),this.audio?.shoot("enemy")}bossBurst(t,e){const n=new C;t.eye.getWorldPosition(n);const s=9;for(let r=0;r<s;r++){const l=(e.alive?e.camera.position.clone().add(new C(je(-3.4,3.4),je(-1.2,1.6),je(-3.4,3.4))):this.world.core.position.clone()).sub(n).normalize();this.spawnProjectile(n.clone(),l,9.5,10,4,!0,!0)}this.effects?.spawnMuzzle(n,16735546,3),this.audio?.explosion(!1)}spawnProjectile(t,e,n,s,r,a,l=!1){this.projectiles.length>=90||this.projectiles.push({pos:t.clone(),vel:e.clone().multiplyScalar(n),life:4.5,playerDmg:s,coreDmg:r,targetPlayer:a,big:l,color:a?16726831:16747050})}updateProjectiles(t,e){const n=this.world.core.position,s=new le,r=new Xn,a=new C,l=new C,o=this._glowPositions;let c=0;for(let h=this.projectiles.length-1;h>=0;h--){const d=this.projectiles[h];d.life-=t,d.pos.addScaledVector(d.vel,t);let u=!1;if(d.targetPlayer&&e.alive){const m=d.pos.x-e.camera.position.x,p=d.pos.y-e.camera.position.y,M=d.pos.z-e.camera.position.z;m*m+p*p+M*M<.72*.72&&(this.onPlayerHit?.(d.playerDmg,d.pos.clone()),this.effects?.spawnImpact(d.pos,16735546,.6),u=!0)}const f=d.pos.x-n.x,_=d.pos.y-n.y,x=d.pos.z-n.z;!u&&f*f+_*_+x*x<1.25*1.25&&(this.onCoreHit?.(d.coreDmg),this.effects?.spawnImpact(d.pos,2613432,1.2),this.audio?.coreHit(),u=!0),!u&&d.pos.y<.15&&(this.effects?.spawnImpact(d.pos,16747050,.5),u=!0),(u||d.life<=0)&&this.projectiles.splice(h,1)}for(let h=0;h<96;h++)if(h<this.projectiles.length){const d=this.projectiles[h];l.copy(d.pos),r.identity();const u=d.big?1.7:1;a.set(u,u,u),s.compose(l,r,a),this.projectileMesh.setMatrixAt(h,s);const f=new Dt(d.color);this.projectileMesh.setColorAt(h,f),o[c*3]=d.pos.x,o[c*3+1]=d.pos.y,o[c*3+2]=d.pos.z,c++}else s.makeScale(0,0,0),this.projectileMesh.setMatrixAt(h,s);for(let h=c;h<96;h++)o[h*3]=0,o[h*3+1]=-100,o[h*3+2]=0;this.projectileMesh.instanceMatrix.needsUpdate=!0,this.projectileMesh.instanceColor&&(this.projectileMesh.instanceColor.needsUpdate=!0),this.glowPoints.geometry.attributes.position.needsUpdate=!0}raycast(t,e=120){let n=null,s=1/0,r=null;const a=new C;for(const c of this.enemies){if(c.dead)continue;const h=new Ei(c.position,c.hitRadius),d=t.intersectSphere(h,a);if(d){const u=d.distanceTo(t.origin);u<s&&u<e&&(s=u,n=c,r=d.clone())}}if(!n)return null;const l=n.position.y+n.scale*.28,o=r.y>l;return{enemy:n,point:r,distance:s,isHead:o}}findAimAssist(t,e,n=.045){let s=null,r=n;const a=new C;for(const c of this.enemies){if(c.dead||(a.copy(c.position).sub(t),a.length()>70))continue;a.normalize();const d=ro(a.dot(e),-1,1),u=Math.acos(d);u<r&&(r=u,s=c)}if(!s)return null;const o=s.position.clone().sub(t).normalize();return{enemy:s,direction:o}}damage(t,e,n=!1,s=null){if(!t||t.dead)return{killed:!1};const r=n?t.def.headMult||1.8:1,a=e*r;return t.hp-=a,t.flash=1,this.effects?.spawnSparks(s||t.position,n?16765286:16758531,n?14:7),t.hp<=0?(this.kill(t,n,s),{killed:!0,damage:a,enemy:t}):{killed:!1,damage:a,enemy:t}}kill(t,e,n){if(t.dead)return;t.dead=!0;const s=this.enemies.indexOf(t);s>=0&&this.enemies.splice(s,1),this.scene.remove(t.group),this.effects?.spawnExplosion(t.position.clone(),t.def.color,t.type==="colosso"?3.4:1.3,t.type==="colosso"),this.audio?.explosion(t.type==="colosso"),this.boss===t&&(this.boss=null);const r=nh(),a=new Set([r.chassis,r.armor,r.blades]);t.group.traverse(l=>{if(!l.isMesh&&!l.isSprite)return;l.geometry&&!a.has(l.geometry)&&l.geometry.dispose?.();const o=Array.isArray(l.material)?l.material:[l.material];for(const c of o)c&&!c.userData?.shared&&c.dispose?.()}),this.onKill?.(t,e,n)}clear(){for(const t of[...this.enemies])this.scene.remove(t.group);this.enemies.length=0,this.projectiles.length=0,this.boss=null}dispose(){this.clear(),this.projectileMesh.geometry.dispose(),this.projectileMesh.material.dispose(),this.glowPoints.geometry.dispose(),this.glowPoints.material.dispose()}}const pe=(i,t)=>i+Math.random()*(t-i);function ih(i="rgba(255,255,255,1)",t="rgba(255,190,100,0.5)",e="rgba(255,80,30,0)",n=128){const s=document.createElement("canvas");s.width=s.height=n;const r=s.getContext("2d"),a=r.createRadialGradient(n/2,n/2,0,n/2,n/2,n/2);a.addColorStop(0,i),a.addColorStop(.32,t),a.addColorStop(1,e),r.fillStyle=a,r.fillRect(0,0,n,n);const l=new wa(s);return l.colorSpace=tn,l}function A_(){const i=document.createElement("canvas");i.width=i.height=128;const t=i.getContext("2d"),e=t.createRadialGradient(64,64,2,64,64,62);e.addColorStop(0,"rgba(70,62,58,0.55)"),e.addColorStop(.5,"rgba(50,45,42,0.3)"),e.addColorStop(1,"rgba(30,28,26,0)"),t.fillStyle=e,t.fillRect(0,0,128,128);for(let s=0;s<16;s++){const r=20+Math.random()*88,a=20+Math.random()*88,l=8+Math.random()*26,o=t.createRadialGradient(r,a,0,r,a,l);o.addColorStop(0,"rgba(95,85,78,0.14)"),o.addColorStop(1,"rgba(40,38,35,0)"),t.fillStyle=o,t.beginPath(),t.arc(r,a,l,0,Math.PI*2),t.fill()}const n=new wa(i);return n.colorSpace=tn,n}class R_{constructor(t,e){this.scene=t,this.camera=e,this.glowTex=ih(),this.cloudTex=A_(),this.flashTex=ih("rgba(255,255,255,1)","rgba(255,220,160,0.55)","rgba(255,130,40,0)",64),this.maxSparks=520,this.sparks=[];const n=new Float32Array(this.maxSparks*3),s=new Float32Array(this.maxSparks*3);for(let f=0;f<this.maxSparks;f++)n[f*3+1]=-100,this.sparks.push({active:!1,pos:new C,vel:new C,life:0,maxLife:1,drag:.9});const r=new Ae;r.setAttribute("position",new un(n,3)),r.setAttribute("color",new un(s,3));const a=new rr({map:this.glowTex,size:.13,vertexColors:!0,transparent:!0,opacity:1,blending:He,depthWrite:!1,sizeAttenuation:!0,toneMapped:!1});this.sparkPoints=new ma(r,a),this.sparkPoints.frustumCulled=!1,this.scene.add(this.sparkPoints),this.sparkPositions=n,this.sparkColors=s,this.sparkCursor=0,this.maxDebris=100;const l=new ae(.12,.12,.12),o=new yt({color:9079684,roughness:.6,metalness:.3});this.debrisMesh=new Bh(l,o,this.maxDebris),this.debrisMesh.instanceMatrix.setUsage(Ch),this.debrisMesh.frustumCulled=!1,this.debris=[];const c=new le().makeScale(0,0,0);for(let f=0;f<this.maxDebris;f++)this.debris.push({active:!1,pos:new C,vel:new C,rot:new Fn,rotVel:new C,life:0,scale:1}),this.debrisMesh.setMatrixAt(f,c),this.debrisMesh.setColorAt(f,new Dt(10066329));this.scene.add(this.debrisMesh),this.tracers=[];for(let f=0;f<28;f++){const _=new Ae;_.setAttribute("position",new un(new Float32Array(6),3));const x=new Cl({color:16765286,transparent:!0,opacity:0,blending:He,depthWrite:!1,toneMapped:!1}),m=new zh(_,x);m.frustumCulled=!1,this.scene.add(m),this.tracers.push({line:m,life:0,maxLife:.12,active:!1})}this.tracerCursor=0,this.flashes=[];for(let f=0;f<30;f++){const _=new Gi({map:this.flashTex,color:16758531,transparent:!0,opacity:0,blending:He,depthWrite:!1,toneMapped:!1}),x=new ys(_);x.visible=!1,this.scene.add(x),this.flashes.push({sprite:x,life:0,maxLife:.2,from:1,to:4,active:!1})}this.flashCursor=0,this.smokes=[];for(let f=0;f<18;f++){const _=new Gi({map:this.cloudTex,color:3880755,transparent:!0,opacity:0,depthWrite:!1,toneMapped:!0}),x=new ys(_);x.visible=!1,this.scene.add(x),this.smokes.push({sprite:x,life:0,maxLife:1.4,active:!1,drift:new C})}this.smokeCursor=0,this.rings=[];const h=new _s(.82,1,48);for(let f=0;f<18;f++){const _=new ye({color:16758531,transparent:!0,opacity:0,side:Le,blending:He,depthWrite:!1,toneMapped:!1}),x=new et(h,_);x.visible=!1,this.scene.add(x),this.rings.push({mesh:x,life:0,maxLife:.5,from:.4,to:3,active:!1,flat:!1,rise:0})}this.ringCursor=0,this.portals=[];const d=new ye({color:16739125,transparent:!0,opacity:0,blending:He,depthWrite:!1,side:Le,toneMapped:!1}),u=new Pe(.25,1.3,8,18,1,!0);for(let f=0;f<8;f++){const _=new et(u,d.clone());_.visible=!1,this.scene.add(_),this.portals.push({mesh:_,life:0,maxLife:.85,active:!1})}this.portalCursor=0}spawnTracer(t,e,n=16765286){const s=this.tracers[this.tracerCursor];this.tracerCursor=(this.tracerCursor+1)%this.tracers.length;const r=s.line.geometry.attributes.position.array;r[0]=t.x,r[1]=t.y,r[2]=t.z,r[3]=e.x,r[4]=e.y,r[5]=e.z,s.line.geometry.attributes.position.needsUpdate=!0,s.line.material.color.setHex(n),s.line.material.opacity=.85,s.line.visible=!0,s.life=.09,s.maxLife=.09,s.active=!0}spawnSparks(t,e=16758531,n=8){const s=new Dt(e);for(let r=0;r<n;r++){const a=this.sparkCursor;this.sparkCursor=(this.sparkCursor+1)%this.maxSparks;const l=this.sparks[a];l.active=!0,l.pos.copy(t),l.vel.set(pe(-3,3),pe(-.5,3.5),pe(-3,3)),l.life=pe(.18,.5),l.maxLife=l.life,l.drag=pe(1.5,4);const o=s.clone().offsetHSL(pe(-.03,.03),pe(-.1,.1),pe(-.1,.15));this.sparkColors[a*3]=o.r,this.sparkColors[a*3+1]=o.g,this.sparkColors[a*3+2]=o.b,this.sparkPositions[a*3]=t.x,this.sparkPositions[a*3+1]=t.y,this.sparkPositions[a*3+2]=t.z}this.sparkPoints.geometry.attributes.color.needsUpdate=!0}spawnFlash(t,e=16758531,n=2,s=.18){const r=this.flashes[this.flashCursor];this.flashCursor=(this.flashCursor+1)%this.flashes.length,r.sprite.visible=!0,r.sprite.position.copy(t),r.sprite.material.color.setHex(e),r.sprite.material.opacity=1,r.sprite.scale.setScalar(n*.4),r.life=s,r.maxLife=s,r.from=n*.3,r.to=n,r.active=!0}spawnSmoke(t,e=2,n=1.5){const s=this.smokes[this.smokeCursor];this.smokeCursor=(this.smokeCursor+1)%this.smokes.length,s.sprite.visible=!0,s.sprite.position.copy(t),s.sprite.material.opacity=.45,s.sprite.scale.setScalar(e),s.life=n,s.maxLife=n,s.drift.set(pe(-.4,.4),pe(.4,1),pe(-.4,.4)),s.active=!0}spawnRing(t,e=16758531,{flat:n=!1,from:s=.4,to:r=4,life:a=.55,rise:l=0,opacity:o=.8}={}){const c=this.rings[this.ringCursor];this.ringCursor=(this.ringCursor+1)%this.rings.length,c.mesh.visible=!0,c.mesh.position.copy(t),c.mesh.material.color.setHex(e),c.mesh.material.opacity=o,c.mesh.scale.setScalar(s),c.mesh.rotation.set(n?-Math.PI/2:0,0,0),n||c.mesh.lookAt(this.camera.position),c.life=a,c.maxLife=a,c.from=s,c.to=r,c.flat=n,c.rise=l,c.active=!0}spawnPortal(t,e=16739125){const n=this.portals[this.portalCursor];this.portalCursor=(this.portalCursor+1)%this.portals.length,n.mesh.visible=!0,n.mesh.position.set(t.x,Math.max(4,t.y),t.z),n.mesh.material.color.setHex(e),n.mesh.material.opacity=.22,n.mesh.scale.setScalar(.4),n.life=.85,n.maxLife=.85,n.active=!0,this.spawnRing(new C(t.x,.08,t.z),e,{flat:!0,from:.2,to:2.8,life:.9,opacity:.45}),this.spawnFlash(new C(t.x,t.y,t.z),e,3.2,.45)}spawnMuzzle(t,e=16758531,n=1){this.spawnFlash(t,e,1.4*n,.09),this.spawnSparks(t,e,Math.ceil(3*n))}spawnImpact(t,e=16758531,n=1){this.spawnFlash(t,e,1.8*n,.16),this.spawnSparks(t,e,Math.round(10*n)),this.spawnRing(t,e,{flat:!1,from:.1,to:1.6*n,life:.28,opacity:.7})}spawnDebris(t,e,n,s,r=1){const a=new Dt(e);for(let l=0;l<n;l++){const o=this.debris.find(h=>!h.active);if(!o)return;o.active=!0,o.pos.copy(t),o.pos.x+=pe(-.5,.5)*r,o.pos.y+=pe(-.5,.5)*r,o.pos.z+=pe(-.5,.5)*r,o.vel.set(pe(-1,1),pe(.3,1.4),pe(-1,1)).normalize().multiplyScalar(pe(2,7)*s),o.rot.set(pe(0,6),pe(0,6),pe(0,6)),o.rotVel.set(pe(-8,8),pe(-8,8),pe(-8,8)),o.life=pe(.9,1.8),o.scale=pe(.5,1.5)*r;const c=a.clone().offsetHSL(0,-.15,pe(-.25,.05));this.debrisMesh.setColorAt(this.debris.indexOf(o),c)}this.debrisMesh.instanceColor&&(this.debrisMesh.instanceColor.needsUpdate=!0)}spawnExplosion(t,e=16735546,n=1,s=!1){this.spawnFlash(t,e,s?10:4.2*n,s?.6:.32),this.spawnSparks(t,e,s?90:26),this.spawnSparks(t,16765286,s?40:12),this.spawnRing(t,e,{flat:!1,from:.4,to:s?13:4.2*n,life:s?.85:.5,opacity:.85}),this.spawnRing(new C(t.x,.08,t.z),16765286,{flat:!0,from:.5,to:s?12:4*n,life:.7,opacity:.5}),this.spawnDebris(t,e,s?34:12,s?2.2:1,s?2.3:1);const r=s?7:2;for(let a=0;a<r;a++){const l=t.clone().add(new C(pe(-1,1)*n,pe(-.3,.8)*n,pe(-1,1)*n));this.spawnSmoke(l,(s?4.5:1.7)*pe(.7,1.2),pe(1.1,2.2))}}update(t,e){let n=!1;for(let o=0;o<this.maxSparks;o++){const c=this.sparks[o];if(c.active){if(c.life-=t,c.life<=0){c.active=!1,this.sparkPositions[o*3+1]=-100,n=!0;continue}c.vel.y-=9.5*t,c.vel.multiplyScalar(1-c.drag*t),c.pos.addScaledVector(c.vel,t),c.pos.y<.03&&(c.pos.y=.03,c.vel.y*=-.35,c.vel.x*=.7,c.vel.z*=.7),this.sparkPositions[o*3]=c.pos.x,this.sparkPositions[o*3+1]=c.pos.y,this.sparkPositions[o*3+2]=c.pos.z,n=!0}}n&&(this.sparkPoints.geometry.attributes.position.needsUpdate=!0);let s=!1;const r=new le,a=new Xn,l=new C;for(let o=0;o<this.maxDebris;o++){const c=this.debris[o];if(c.active){if(c.life-=t,c.life<=0){c.active=!1,r.makeScale(0,0,0),this.debrisMesh.setMatrixAt(o,r),s=!0;continue}c.vel.y-=13*t,c.pos.addScaledVector(c.vel,t),c.pos.y<.08&&(c.pos.y=.08,c.vel.y*=-.32,c.vel.x*=.72,c.vel.z*=.72,c.rotVel.multiplyScalar(.7)),c.rot.x+=c.rotVel.x*t,c.rot.y+=c.rotVel.y*t,c.rot.z+=c.rotVel.z*t,a.setFromEuler(c.rot),l.setScalar(c.scale),r.compose(c.pos,a,l),this.debrisMesh.setMatrixAt(o,r),s=!0}}s&&(this.debrisMesh.instanceMatrix.needsUpdate=!0);for(const o of this.tracers)o.active&&(o.life-=t,o.line.material.opacity=Math.max(0,o.life/o.maxLife)*.85,o.life<=0&&(o.active=!1,o.line.visible=!1));for(const o of this.flashes){if(!o.active)continue;o.life-=t;const c=Math.max(0,o.life/o.maxLife);o.sprite.material.opacity=c;const h=o.from+(o.to-o.from)*(1-c);o.sprite.scale.setScalar(h),o.life<=0&&(o.active=!1,o.sprite.visible=!1)}for(const o of this.smokes){if(!o.active)continue;o.life-=t;const c=Math.max(0,o.life/o.maxLife);o.sprite.material.opacity=c*.4,o.sprite.scale.setScalar(o.sprite.scale.x+t*1.1),o.sprite.position.addScaledVector(o.drift,t),o.life<=0&&(o.active=!1,o.sprite.visible=!1)}for(const o of this.rings){if(!o.active)continue;o.life-=t;const c=1-Math.max(0,o.life/o.maxLife),h=o.from+(o.to-o.from)*c;o.mesh.scale.setScalar(h),o.mesh.material.opacity=(1-c)*.85,o.rise&&(o.mesh.position.y+=o.rise*t),o.life<=0&&(o.active=!1,o.mesh.visible=!1)}for(const o of this.portals){if(!o.active)continue;o.life-=t;const c=Math.max(0,o.life/o.maxLife);o.mesh.material.opacity=c*.25,o.mesh.scale.set(.5+(1-c)*.9,1,.5+(1-c)*.9),o.life<=0&&(o.active=!1,o.mesh.visible=!1)}}}class C_{constructor(){this.ctx=null,this.enabled=!0,this.started=!1,this.musicOn=!1,this.intensity=0,this.nextNoteTime=0,this.step=0,this.timer=null,this.master=null,this.musicGain=null,this.sfxGain=null,this.ambienceGain=null,this.noiseBuffer=null}init(){if(this.ctx){this.ctx.state==="suspended"&&this.ctx.resume();return}const t=window.AudioContext||window.webkitAudioContext;t&&(this.ctx=new t,this.master=this.ctx.createGain(),this.master.gain.value=.75,this.master.connect(this.ctx.destination),this.musicGain=this.ctx.createGain(),this.musicGain.gain.value=0,this.musicGain.connect(this.master),this.sfxGain=this.ctx.createGain(),this.sfxGain.gain.value=.9,this.sfxGain.connect(this.master),this.ambienceGain=this.ctx.createGain(),this.ambienceGain.gain.value=0,this.ambienceGain.connect(this.master),this.noiseBuffer=this.makeNoise(2.5),this.startAmbience(),this.started=!0)}makeNoise(t){const e=Math.floor(this.ctx.sampleRate*t),n=this.ctx.createBuffer(1,e,this.ctx.sampleRate),s=n.getChannelData(0);for(let r=0;r<e;r++)s[r]=Math.random()*2-1;return n}setEnabled(t){this.enabled=t,this.ctx&&this.master.gain.setTargetAtTime(t?.75:0,this.ctx.currentTime,.05)}startAmbience(){if(!this.ctx)return;const t=this.ctx,e=t.createBufferSource();e.buffer=this.noiseBuffer,e.loop=!0;const n=t.createBiquadFilter();n.type="lowpass",n.frequency.value=520;const s=t.createBiquadFilter();s.type="highpass",s.frequency.value=120;const r=t.createGain();r.gain.value=.12;const a=t.createOscillator();a.frequency.value=.13;const l=t.createGain();l.gain.value=.055,a.connect(l),l.connect(r.gain),e.connect(s),s.connect(n),n.connect(r),r.connect(this.ambienceGain),e.start(),a.start(),this.ambienceGain.gain.setTargetAtTime(.7,t.currentTime,1.4)}now(){return this.ctx?this.ctx.currentTime:0}noiseBurst({dur:t=.12,vol:e=.2,type:n="bandpass",freq:s=1600,q:r=.9,decay:a=.08,pan:l=0}){if(!this.ctx||!this.enabled)return;const o=this.ctx,c=o.currentTime,h=o.createBufferSource();h.buffer=this.noiseBuffer,h.playbackRate.value=.9+Math.random()*.2;const d=o.createBiquadFilter();d.type=n,d.frequency.setValueAtTime(s,c),d.frequency.exponentialRampToValueAtTime(Math.max(60,s*.35),c+a),d.Q.value=r;const u=o.createGain();u.gain.setValueAtTime(e,c),u.gain.exponentialRampToValueAtTime(.001,c+t);const f=o.createStereoPanner?o.createStereoPanner():null;f?(f.pan.value=l,h.connect(d).connect(u).connect(f).connect(this.sfxGain)):h.connect(d).connect(u).connect(this.sfxGain),h.start(c),h.stop(c+t+.02)}tone({freq:t=440,dur:e=.2,vol:n=.12,type:s="sine",slide:r=0,delay:a=0,pan:l=0,attack:o=.005}){if(!this.ctx||!this.enabled)return;const c=this.ctx,h=c.currentTime+a,d=c.createOscillator();d.type=s,d.frequency.setValueAtTime(t,h),r&&d.frequency.exponentialRampToValueAtTime(Math.max(20,t+r),h+e);const u=c.createGain();u.gain.setValueAtTime(0,h),u.gain.linearRampToValueAtTime(n,h+o),u.gain.exponentialRampToValueAtTime(.001,h+e);const f=c.createStereoPanner?c.createStereoPanner():null;f?(f.pan.value=l,d.connect(u).connect(f).connect(this.sfxGain)):d.connect(u).connect(this.sfxGain),d.start(h),d.stop(h+e+.03)}shoot(t="rifle"){this.ctx&&(t==="shotgun"?(this.noiseBurst({dur:.34,vol:.42,type:"lowpass",freq:2400,q:.6,decay:.26}),this.tone({freq:92,slide:-55,dur:.28,vol:.28,type:"triangle"}),this.noiseBurst({dur:.5,vol:.1,type:"highpass",freq:3e3,q:.5,decay:.4})):(this.noiseBurst({dur:.09,vol:.22,type:"bandpass",freq:2200,q:.7,decay:.06}),this.tone({freq:148,slide:-90,dur:.11,vol:.23,type:"square"}),this.noiseBurst({dur:.18,vol:.06,type:"highpass",freq:4200,q:.5,decay:.15})))}hit(t=!1){this.tone({freq:t?1500:1050,slide:260,dur:.07,vol:.09,type:"sine"}),t&&this.tone({freq:2200,dur:.05,vol:.05,delay:.02,type:"triangle"})}kill(){this.noiseBurst({dur:.42,vol:.24,type:"lowpass",freq:900,q:.7,decay:.3}),this.tone({freq:380,slide:-300,dur:.32,vol:.13,type:"sawtooth"}),this.tone({freq:900,slide:500,dur:.12,vol:.05,type:"sine",delay:.03})}explosion(t=!1){this.noiseBurst({dur:t?1:.55,vol:t?.42:.25,type:"lowpass",freq:t?1200:900,q:.5,decay:t?.8:.4}),this.tone({freq:t?66:110,slide:-45,dur:t?.8:.4,vol:t?.35:.18,type:"sine"})}reload(t=0){const e=[620,900,1350][t]||800;this.noiseBurst({dur:.06,vol:.11,type:"bandpass",freq:e,q:2.2,decay:.04}),this.tone({freq:e,slide:-120,dur:.05,vol:.05,type:"square"})}empty(){this.noiseBurst({dur:.05,vol:.08,type:"highpass",freq:2500,q:1.2,decay:.03})}swap(){this.noiseBurst({dur:.08,vol:.09,type:"bandpass",freq:1200,q:1.4,decay:.05}),this.tone({freq:300,slide:400,dur:.1,vol:.05,type:"triangle"})}dash(){this.noiseBurst({dur:.34,vol:.2,type:"bandpass",freq:900,q:.6,decay:.3}),this.tone({freq:180,slide:360,dur:.25,vol:.07,type:"sine"})}coreHit(){this.tone({freq:74,slide:-24,dur:.5,vol:.28,type:"sine"}),this.tone({freq:310,slide:-80,dur:.3,vol:.06,type:"triangle"}),this.noiseBurst({dur:.25,vol:.1,type:"lowpass",freq:460,q:1,decay:.2})}playerHit(){this.noiseBurst({dur:.3,vol:.24,type:"lowpass",freq:700,q:.8,decay:.18}),this.tone({freq:120,slide:-60,dur:.3,vol:.16,type:"sawtooth"})}waveHorn(t=!1){if(!this.ctx)return;const e=t?110:146.83;this.tone({freq:e,dur:t?1.2:.8,vol:.13,type:"sawtooth",attack:.15}),this.tone({freq:e*1.5,dur:t?1.2:.8,vol:.09,type:"triangle",attack:.15}),this.tone({freq:e*2,dur:t?1.25:.85,vol:.035,type:"sine",attack:.2}),t&&this.noiseBurst({dur:1.4,vol:.09,type:"lowpass",freq:300,q:.6,decay:1.2})}waveClear(){[523.25,659.25,783.99,1046.5].forEach((e,n)=>{this.tone({freq:e,dur:.55,vol:.09,type:"triangle",delay:n*.08}),this.tone({freq:e*2,dur:.4,vol:.025,type:"sine",delay:n*.08+.01})})}victory(){[392,523.25,659.25,783.99,1046.5,1318.5].forEach((e,n)=>{this.tone({freq:e,dur:1.1,vol:.11,type:"triangle",delay:n*.12}),this.tone({freq:e*.5,dur:1.2,vol:.05,type:"sine",delay:n*.12})}),this.noiseBurst({dur:1.2,vol:.07,type:"highpass",freq:4e3,q:.5,decay:1})}fail(){[220,174.61,146.83,110].forEach((t,e)=>{this.tone({freq:t,dur:1,vol:.12,type:"sawtooth",delay:e*.17})}),this.noiseBurst({dur:1.6,vol:.12,type:"lowpass",freq:400,q:.4,decay:1.4})}ui(){this.tone({freq:880,slide:120,dur:.06,vol:.035,type:"sine"})}pickup(){this.tone({freq:660,slide:440,dur:.28,vol:.08,type:"triangle"}),this.tone({freq:990,slide:300,dur:.2,vol:.04,type:"sine",delay:.05})}setMusic(t){this.musicOn=t,this.ctx&&(this.musicGain.gain.setTargetAtTime(t?.9:0,this.ctx.currentTime,.8),t&&!this.timer&&(this.step=0,this.nextNoteTime=this.ctx.currentTime+.15,this.timer=setInterval(()=>this.schedule(),60)),!t&&this.timer&&(clearInterval(this.timer),this.timer=null))}setIntensity(t){this.intensity=Math.max(0,Math.min(1,t))}schedule(){if(!this.ctx||!this.musicOn)return;const t=this.ctx,n=60/94/4;for(;this.nextNoteTime<t.currentTime+.18;)this.playStep(this.step,this.nextNoteTime,n),this.nextNoteTime+=n,this.step=(this.step+1)%64}playStep(t,e,n){const s=this.ctx,r=this.intensity,a=t%16,l=Math.floor(t/16);if(a===0||a===8||r>.45&&a===11){const c=s.createOscillator();c.type="sine",c.frequency.setValueAtTime(130,e),c.frequency.exponentialRampToValueAtTime(48,e+.16);const h=s.createGain();h.gain.setValueAtTime(.3,e),h.gain.exponentialRampToValueAtTime(.001,e+.3),c.connect(h).connect(this.musicGain),c.start(e),c.stop(e+.32)}if(a%2===1||r>.5){const c=s.createBufferSource();c.buffer=this.noiseBuffer;const h=s.createBiquadFilter();h.type="highpass",h.frequency.value=5500;const d=s.createGain(),u=a%4===3?.05:.022;d.gain.setValueAtTime(u*(.6+r*.7),e),d.gain.exponentialRampToValueAtTime(.001,e+.06),c.connect(h).connect(d).connect(this.musicGain),c.start(e),c.stop(e+.08)}if([0,0,1,0,0,1,0,0,0,1,0,1,0,0,1,0][a]&&(r>.15||a===2||a===10)){const c=s.createOscillator();c.type="sine",c.frequency.value=a%8===2?1180:880;const h=s.createGain();h.gain.setValueAtTime(.035*(.5+r),e),h.gain.exponentialRampToValueAtTime(.001,e+.18),c.connect(h).connect(this.musicGain),c.start(e),c.stop(e+.2)}if(l%2===0&&(a===0||a===6||a===10)){const c=s.createOscillator();c.type="triangle";const h=[196,174.61,220,146.83][l%4];c.frequency.setValueAtTime(h*2,e),c.frequency.exponentialRampToValueAtTime(h,e+.22);const d=s.createGain();d.gain.setValueAtTime(.001,e),d.gain.linearRampToValueAtTime(.035,e+.01),d.gain.exponentialRampToValueAtTime(.001,e+.5),c.connect(d).connect(this.musicGain),c.start(e),c.stop(e+.52)}if(t===0||t===32){const c=t===0?[146.83,220,293.66]:[130.81,196,261.63];for(const h of c){const d=s.createOscillator();d.type="sawtooth",d.frequency.value=h;const u=s.createBiquadFilter();u.type="lowpass",u.frequency.value=620;const f=s.createGain();f.gain.setValueAtTime(.001,e),f.gain.linearRampToValueAtTime(.012,e+.9),f.gain.linearRampToValueAtTime(.001,e+3.4),d.connect(u).connect(f).connect(this.musicGain),d.start(e),d.stop(e+3.5)}}}}const ru=()=>new URLSearchParams(location.search).has("touch")?!0:window.matchMedia?.("(pointer: coarse)").matches||navigator.maxTouchPoints>0&&window.innerWidth<1200||"ontouchstart"in window,sh=(i,t,e)=>Math.max(t,Math.min(e,i)),P_=new C(0,0,1),rh=new Fn,L_=new Xn,D_=new Xn(-Math.sqrt(.5),0,0,Math.sqrt(.5)),ah=new Xn,ls=new C;function I_(i,t,e,n,s){return rh.set(t,i,-e,"YXZ"),s.setFromEuler(rh),s.multiply(D_),s.multiply(L_.setFromAxisAngle(P_,-n)),s}class N_{constructor({canvas:t,joystick:e,joystickKnob:n,fireBtn:s,reloadBtn:r,swapBtn:a,dashBtn:l,onPause:o,onAction:c,canLock:h}){this.canvas=t,this.joystickEl=e,this.joystickKnob=n,this.fireBtn=s,this.reloadBtn=r,this.swapBtn=a,this.dashBtn=l,this.onPause=o,this.onAction=c,this.canLock=h,this.touch=ru(),this.active=!1,this.firing=!1,this.keys=new Set,this.lookX=0,this.lookY=0,this.moveX=0,this.moveY=0,this.joystickValue={x:0,y:0},this.sensitivity=1,this.invertY=!1,this.haptics=!0,this.desktopLocked=!1,this.lookPointerId=null,this.lastLook={x:0,y:0},this.joyPointerId=null,this.joyStart={x:0,y:0},this.joyRadius=46,this.actions={dash:!1,reload:!1,swap:!1},this.tiltEnabled=!1,this.tiltSupported=typeof DeviceOrientationEvent<"u",this.tiltPermission="unknown",this.tiltSensitivity=1,this.tiltPrimed=!1,this.tiltLastForward=new C(0,0,-1),this.tiltFwd=new C,this.tiltDeltaFrames=0,this.tiltEventSeen=!1,this._bind()}_bind(){window.addEventListener("keydown",e=>this._onKeyDown(e)),window.addEventListener("keyup",e=>this._onKeyUp(e)),window.addEventListener("blur",()=>{this.keys.clear(),this.firing=!1,this.moveX=this.moveY=0,this.joystickValue.x=this.joystickValue.y=0,this._resetKnob(),this.fireBtn?.classList.remove("pressed")}),this.canvas.addEventListener("pointerdown",e=>this._onCanvasDown(e)),window.addEventListener("pointermove",e=>this._onPointerMove(e)),window.addEventListener("pointerup",e=>this._onPointerUp(e)),window.addEventListener("pointercancel",e=>this._onPointerUp(e)),this.canvas.addEventListener("contextmenu",e=>e.preventDefault()),document.addEventListener("pointerlockchange",()=>{this.desktopLocked=document.pointerLockElement===this.canvas,this.desktopLocked||(this.firing=!1),this.onAction?.("lockchange",this.desktopLocked)}),document.addEventListener("pointerlockerror",()=>this.onAction?.("lockerror")),this.joystickEl&&(this.joystickEl.addEventListener("pointerdown",e=>this._onJoystickDown(e)),this.joystickEl.addEventListener("pointermove",e=>this._onJoystickMove(e)),this.joystickEl.addEventListener("pointerup",e=>this._onJoystickUp(e)),this.joystickEl.addEventListener("pointercancel",e=>this._onJoystickUp(e))),this._bindHoldButton(this.fireBtn,()=>{this.firing=!0,this.fireBtn.classList.add("pressed")},()=>{this.firing=!1,this.fireBtn.classList.remove("pressed")}),this._bindTapButton(this.reloadBtn,"reload"),this._bindTapButton(this.swapBtn,"swap"),this._bindTapButton(this.dashBtn,"dash");const t=e=>this._onOrientation(e);this._orientationHandler=t}_onKeyDown(t){const e=t.key.toLowerCase();if(["w","a","s","d","arrowup","arrowdown","arrowleft","arrowright"," "].includes(e)&&t.preventDefault(),!t.repeat&&(this.keys.add(e),!!this.active)){if(e==="escape"||e==="p"){this.onPause?.();return}e==="r"&&(this.actions.reload=!0),e==="q"&&(this.actions.swap=!0),(e==="e"||e===" ")&&(this.actions.dash=!0),(e==="1"||e==="2")&&this.onAction?.("weapon",Number(e)-1),e==="m"&&this.onAction?.("mute")}}_onKeyUp(t){this.keys.delete(t.key.toLowerCase())}_onCanvasDown(t){if(this.active){if(t.pointerType==="mouse"){if(!this.desktopLocked){this.canLock?.()&&this.canvas.requestPointerLock?.();return}t.button===0&&(this.firing=!0);return}if(this.lookPointerId===null){this.lookPointerId=t.pointerId,this.lastLook.x=t.clientX,this.lastLook.y=t.clientY;try{this.canvas.setPointerCapture(t.pointerId)}catch{}}}}_onPointerMove(t){if(t.pointerType==="mouse"){if(!this.active||!this.desktopLocked)return;const e=.0021*this.sensitivity;this.lookX+=t.movementX*e,this.lookY+=t.movementY*e*(this.invertY?-1:1);return}if(t.pointerId===this.lookPointerId){const e=t.clientX-this.lastLook.x,n=t.clientY-this.lastLook.y;this.lastLook.x=t.clientX,this.lastLook.y=t.clientY;const s=.0042*this.sensitivity;this.lookX+=e*s,this.lookY+=n*s*(this.invertY?-1:1)}}_onPointerUp(t){if(t.pointerType==="mouse"){t.button===0&&(this.firing=!1);return}t.pointerId===this.lookPointerId&&(this.lookPointerId=null)}_onJoystickDown(t){if(!this.active||this.joyPointerId!==null)return;t.preventDefault(),this.joyPointerId=t.pointerId;const e=this.joystickEl.getBoundingClientRect();this.joyStart.x=e.left+e.width/2,this.joyStart.y=e.top+e.height/2,this.joyRadius=e.width*.38,this.joystickEl.classList.add("active");try{this.joystickEl.setPointerCapture(t.pointerId)}catch{}this._updateJoystick(t.clientX,t.clientY)}_onJoystickMove(t){t.pointerId===this.joyPointerId&&(t.preventDefault(),this._updateJoystick(t.clientX,t.clientY))}_onJoystickUp(t){t.pointerId===this.joyPointerId&&(this.joyPointerId=null,this.joystickValue.x=0,this.joystickValue.y=0,this.moveX=0,this.moveY=0,this.joystickEl.classList.remove("active"),this._resetKnob())}_updateJoystick(t,e){const n=t-this.joyStart.x,s=e-this.joyStart.y,r=Math.hypot(n,s),a=this.joyRadius,l=Math.min(r,a),o=r>0?n/r*(l/a):0,c=r>0?s/r*(l/a):0;this.joystickValue.x=o,this.joystickValue.y=c,this.moveX=o,this.moveY=-c,this.joystickKnob&&(this.joystickKnob.style.transform=`translate(calc(-50% + ${o*a}px), calc(-50% + ${c*a}px))`),Math.hypot(o,c)>.95&&this.haptics&&navigator.vibrate?.(4)}_resetKnob(){this.joystickKnob&&(this.joystickKnob.style.transform="translate(-50%, -50%)")}_bindHoldButton(t,e,n){if(!t)return;t.addEventListener("pointerdown",r=>{if(this.active){r.preventDefault();try{t.setPointerCapture(r.pointerId)}catch{}e()}});const s=r=>{r?.preventDefault?.(),n()};t.addEventListener("pointerup",s),t.addEventListener("pointercancel",s),t.addEventListener("lostpointercapture",n)}_bindTapButton(t,e){t&&t.addEventListener("pointerdown",n=>{this.active&&(n.preventDefault(),this.actions[e]=!0,t.classList.add("pressed"),setTimeout(()=>t.classList.remove("pressed"),110))})}setActive(t){this.active=t,t||(this.firing=!1,this.keys.clear(),this.moveX=this.moveY=0,this.joystickValue.x=this.joystickValue.y=0,this._resetKnob(),this.fireBtn?.classList.remove("pressed"),document.pointerLockElement===this.canvas&&document.exitPointerLock?.())}getMove(){let t=this.moveX,e=this.moveY;const n=this.keys;(n.has("w")||n.has("arrowup"))&&(e+=1),(n.has("s")||n.has("arrowdown"))&&(e-=1),(n.has("d")||n.has("arrowright"))&&(t+=1),(n.has("a")||n.has("arrowleft"))&&(t-=1);const s=Math.hypot(t,e);return s>1&&(t/=s,e/=s),{x:t,y:e,magnitude:Math.min(1,s),sprint:n.has("shift")||s>.94}}consumeLook(){const t={x:this.lookX,y:this.lookY};return this.lookX=0,this.lookY=0,t}consumeActions(){const t={...this.actions};return this.actions.dash=!1,this.actions.reload=!1,this.actions.swap=!1,t}requestLock(){this.touch||this.canvas.requestPointerLock?.()}async requestTiltPermission(){if(!this.tiltSupported)return this.tiltPermission="unsupported",!1;try{if(typeof DeviceOrientationEvent.requestPermission=="function"){const t=await DeviceOrientationEvent.requestPermission();return this.tiltPermission=t,t==="granted"}return this.tiltPermission="granted",!0}catch{return this.tiltPermission="denied",!1}}async enableTilt(t){return t?await this.requestTiltPermission()?(this.tiltEnabled=!0,this.tiltPrimed=!1,this.tiltDeltaFrames=0,this.tiltEventSeen=!1,window.addEventListener("deviceorientation",this._orientationHandler,!0),{ok:!0}):(this.tiltEnabled=!1,{ok:!1,reason:this.tiltPermission}):(this.tiltEnabled=!1,window.removeEventListener("deviceorientation",this._orientationHandler,!0),{ok:!0})}calibrateTilt(){this.tiltPrimed=!1}_onOrientation(t){if(!this.tiltEnabled||t.alpha===null||t.beta===null||t.gamma===null)return;this.tiltEventSeen=!0;const e=(screen.orientation?.angle??window.orientation??0)*(Math.PI/180);if(I_(Da.degToRad(t.alpha),Da.degToRad(t.beta),Da.degToRad(t.gamma),e,ah),ls.set(0,0,-1).applyQuaternion(ah),!this.tiltPrimed){this.tiltLastForward.copy(ls),this.tiltPrimed=!0;return}const n=Math.atan2(-ls.x,-ls.z),s=Math.atan2(-this.tiltLastForward.x,-this.tiltLastForward.z),r=Math.asin(sh(ls.y,-1,1)),a=Math.asin(sh(this.tiltLastForward.y,-1,1));let l=n-s;l>Math.PI&&(l-=Math.PI*2),l<-Math.PI&&(l+=Math.PI*2);let o=r-a;if(Math.abs(l)<.25&&Math.abs(o)<.25){const c=1.15*this.tiltSensitivity;this.lookX+=l*c,this.lookY+=o*c*(this.invertY?-1:1)}this.tiltLastForward.copy(ls)}haptic(t){if(this.haptics)try{navigator.vibrate?.(t)}catch{}}setHaptics(t){this.haptics=t}}const U_=[{text:"N",deg:0,major:!0},{text:"NE",deg:45},{text:"L",deg:90},{text:"SE",deg:135},{text:"S",deg:180,major:!0},{text:"SO",deg:225},{text:"O",deg:270},{text:"NO",deg:315}],Bt=i=>document.getElementById(i),oh=i=>Math.round(i).toLocaleString("pt-BR");class F_{constructor(){this.r={hud:Bt("hud"),coreHpText:Bt("coreHpText"),coreBar:Bt("coreBar"),coreBarWrap:document.querySelector(".core-bar"),waveLabel:Bt("waveLabel"),enemyCount:Bt("enemyCount"),scoreValue:Bt("scoreValue"),comboValue:Bt("comboValue"),crosshair:Bt("crosshair"),hitMarker:Bt("hitMarker"),radar:Bt("radar"),compass:Bt("compassStrip"),healthText:Bt("healthText"),healthBar:Bt("healthBar"),healthWrap:document.querySelector(".health-bar"),dashState:Bt("dashState"),tiltBadge:Bt("tiltBadge"),weaponName:Bt("weaponName"),weaponType:Bt("weaponType"),ammoValue:Bt("ammoValue"),ammoReserve:Bt("ammoReserve"),ammoPips:Bt("ammoPips"),ammoWrap:document.querySelector(".ammo"),reloadBar:Bt("reloadBar"),killfeed:Bt("killfeed"),scorePops:Bt("scorePops"),statusToast:Bt("statusToast"),permissionToast:Bt("permissionToast"),waveBanner:Bt("waveBanner"),wbKicker:Bt("wbKicker"),wbTitle:Bt("wbTitle"),wbSub:Bt("wbSub"),tutorial:Bt("tutorial"),tutorialTitle:Bt("tutorialTitle"),tutorialText:Bt("tutorialText"),interactHint:Bt("interactHint"),damageDir:Bt("damageDir"),damageFlash:Bt("damageFlash"),healFlash:Bt("healFlash"),targetTag:Bt("targetTag"),bossBar:Bt("bossBar"),bossBarFill:Bt("bossBarFill"),bossHpText:Bt("bossHpText")},this.last={},this.radarCtx=this.r.radar?.getContext("2d"),this.radarAccum=0,this.compassSpans=[],this.feedItems=[],this.bannerTimer=null,this.toastTimer=null,this.permTimer=null,this.tutorialTimer=null,this.hitTimer=null,this.damageTimer=null,this.pipMag=-1,this.buildCompass(),this.buildAmmoPips(30)}buildCompass(){if(this.r.compass){this.r.compass.innerHTML="";for(let t=0;t<3;t++)for(const e of U_){const n=document.createElement("span");n.textContent=e.text,n.dataset.deg=String(e.deg+t*360),e.major&&n.classList.add("major"),this.r.compass.appendChild(n),this.compassSpans.push(n)}}}setHudVisible(t){this.r.hud?.classList.toggle("hidden",!t)}updateCompass(t){if(!this.compassSpans.length)return;const e=-t*180/Math.PI%360;for(const n of this.compassSpans){const a=((Number(n.dataset.deg)-e+540)%360-180)*1.05;n.style.left=`calc(50% + ${a}px)`,n.style.opacity=Math.abs(a)>150?"0":String(1-Math.abs(a)/175)}}buildAmmoPips(t){if(!(!this.r.ammoPips||t===this.pipMag)){this.pipMag=t,this.r.ammoPips.innerHTML="";for(let e=0;e<t;e++){const n=document.createElement("i");this.r.ammoPips.appendChild(n)}this.pips=[...this.r.ammoPips.children]}}set(t,{core:e=1,wave:n=1,totalWaves:s=5,enemies:r=0,score:a=0,combo:l=0,boss:o=null,target:c=null}={}){const h=this.r,d=this.last;if(t.health!==d.health){const u=Math.max(0,t.health);h.healthText&&(h.healthText.textContent=String(Math.round(u))),h.healthBar&&(h.healthBar.style.width=`${Math.max(0,u)}%`),h.healthWrap&&h.healthWrap.classList.toggle("low",u<35),u<d.health&&this.flashHeal(-1),d.health=u}if(h.weaponName&&t.name!==d.name&&(h.weaponName.textContent=t.name,h.weaponType.textContent=t.type,this.buildAmmoPips(t.mag),d.name=t.name),t.ammo!==d.ammo){if(h.ammoValue&&(h.ammoValue.textContent=String(t.ammo)),this.pips)for(let u=0;u<this.pips.length;u++)this.pips[u].classList.toggle("spent",u>=t.ammo);if(h.ammoWrap&&h.ammoWrap.classList.toggle("low",t.ammo<=Math.ceil(t.mag*.25)),h.interactHint){const u=t.ammo===0&&!t.reloading;h.interactHint.textContent=u?"SEM MUNIÇÃO · RECARREGUE":"",h.interactHint.classList.toggle("show",u)}d.ammo=t.ammo}if(t.reloading!==d.reloading&&(h.crosshair?.classList.toggle("reloading",t.reloading),d.reloading=t.reloading),h.reloadBar&&(h.reloadBar.style.width=`${(t.reloadProgress||0)*100}%`),t.dashCooldown!==d.dashCooldown){const u=t.dashCooldown<=0;h.dashState&&(h.dashState.textContent=u?"IMPULSO PRONTO":`IMPULSO ${t.dashCooldown.toFixed(1)}s`,h.dashState.classList.toggle("ready",u)),d.dashCooldown=t.dashCooldown}if(e!==d.core){const u=Math.max(0,Math.min(1,e));h.coreHpText&&(h.coreHpText.textContent=`${Math.round(u*100)}%`),h.coreBar&&(h.coreBar.style.width=`${u*100}%`),h.coreBarWrap&&(h.coreBarWrap.classList.toggle("warn",u<=.55&&u>.25),h.coreBarWrap.classList.toggle("crit",u<=.25)),d.core=e}if((n!==d.wave||s!==d.totalWaves)&&(h.waveLabel&&(h.waveLabel.textContent=`ONDA ${n} / ${s}`),d.wave=n,d.totalWaves=s),r!==d.enemies&&(h.enemyCount&&(h.enemyCount.textContent=`${r} HOSTIS`),d.enemies=r),a!==d.score&&(h.scoreValue&&(h.scoreValue.textContent=oh(a)),d.score=a),l!==d.combo&&(h.comboValue&&(h.comboValue.textContent=l>1?`COMBO ×${l}`:"",h.comboValue.classList.toggle("on",l>1)),d.combo=l),o){const u=Math.max(0,o.hp/o.maxHp);h.bossBar?.classList.remove("hidden"),h.bossBarFill&&(h.bossBarFill.style.width=`${u*100}%`),h.bossHpText&&(h.bossHpText.textContent=`${Math.round(u*100)}%`)}else h.bossBar?.classList.add("hidden");this.setTarget(c),this.updateCompass(t.yaw||0),this.setCrosshairBloom(t.bloom||0)}setCrosshairBloom(t){if(!this.r.crosshair)return;const e=7+Math.min(20,t*600);this.r.crosshair.style.setProperty("--gap",`${e}px`)}setTarget(t){const e=this.r.crosshair,n=this.r.targetTag;if(e)if(t){if(e.classList.add("enemy"),n){const s=t.type==="colosso";n.textContent=s?"COLOSSO · ALVO CRÍTICO":`${t.name} · ${Math.round(t.hp)} HP`,n.classList.add("show")}}else e.classList.remove("enemy"),n&&n.classList.remove("show")}hitmarker(t=!1,e=!1){const n=this.r.hitMarker;n&&(n.classList.remove("show","kill"),n.offsetWidth,n.classList.add("show"),t&&n.classList.add("kill"),clearTimeout(this.hitTimer),this.hitTimer=setTimeout(()=>n.classList.remove("show","kill"),160))}damage(t,e){const n=this.r.damageFlash;n&&(n.style.opacity=Math.min(.9,.28+e/70),clearTimeout(this.damageTimer),this.damageTimer=setTimeout(()=>n.style.opacity="0",130));const s=this.r.damageDir;s&&t!==null&&(s.style.transform=`translate(-50%, -50%) rotate(${t}rad)`,s.classList.add("show"),setTimeout(()=>s.classList.remove("show"),420))}flashHeal(t){if(t<0)return;const e=this.r.healFlash;e&&(e.style.opacity="0.55",setTimeout(()=>e.style.opacity="0",320))}feed(t,{teal:e=!1,points:n=null}={}){const s=this.r.killfeed;if(!s)return;const r=document.createElement("div");r.className="feed-item"+(e?" teal":""),r.innerHTML=n?`${t} <b>+${n}</b>`:t,s.appendChild(r),this.feedItems.push(r),this.feedItems.length>4&&this.feedItems.shift()?.remove(),setTimeout(()=>{r.classList.add("out"),setTimeout(()=>{r.remove(),this.feedItems=this.feedItems.filter(a=>a!==r)},400)},2600)}popScore(t,e,n,s=!1){const r=this.r.scorePops;if(!r)return;const a=t.clone().project(e);if(a.z>1||a.z<-1)return;const l=(a.x*.5+.5)*100,o=(-a.y*.5+.5)*100;if(l<2||l>98||o<2||o>98)return;const c=document.createElement("div");c.className="score-pop"+(s?" head":""),c.textContent=n,c.style.left=`${l}%`,c.style.top=`${o}%`,r.appendChild(c),setTimeout(()=>c.remove(),880)}waveBanner(t,e,n,{boss:s=!1,duration:r=2200}={}){const a=this.r.waveBanner;a&&(this.r.wbKicker.textContent=t,this.r.wbTitle.textContent=e,this.r.wbSub.textContent=n,a.classList.toggle("boss",s),a.classList.add("show"),clearTimeout(this.bannerTimer),this.bannerTimer=setTimeout(()=>a.classList.remove("show"),r))}tutorial(t,e,n=6e3){const s=this.r.tutorial;s&&(this.r.tutorialTitle.textContent=t,this.r.tutorialText.textContent=e,s.classList.add("show"),clearTimeout(this.tutorialTimer),n>0&&(this.tutorialTimer=setTimeout(()=>s.classList.remove("show"),n)))}hideTutorial(){this.r.tutorial?.classList.remove("show")}toast(t,{error:e=!1,duration:n=2600,permission:s=!1}={}){const r=s?this.r.permissionToast:this.r.statusToast;if(!r)return;r.textContent=t,r.classList.toggle("error",e),r.classList.add("show");const a=s?"permTimer":"toastTimer";clearTimeout(this[a]),this[a]=setTimeout(()=>r.classList.remove("show"),n)}setTilt(t){this.r.tiltBadge&&(this.r.tiltBadge.textContent=t?"TILT ON":"TILT OFF",this.r.tiltBadge.classList.toggle("on",t))}drawRadar(t,e,n,s,r){const a=this.radarCtx;if(!a||(this.radarAccum+=1,this.radarAccum%3!==0))return;const l=220,o=l/2;a.clearRect(0,0,l,l),a.save(),a.beginPath(),a.arc(o,o,o-4,0,Math.PI*2),a.clip();const c=a.createRadialGradient(o,o,8,o,o,o);c.addColorStop(0,"rgba(10,48,36,0.55)"),c.addColorStop(1,"rgba(3,18,13,0.25)"),a.fillStyle=c,a.fillRect(0,0,l,l),a.strokeStyle="rgba(39,224,184,0.14)",a.lineWidth=1;for(const A of[.33,.66,.98])a.beginPath(),a.arc(o,o,(o-6)*A,0,Math.PI*2),a.stroke();a.strokeStyle="rgba(39,224,184,0.1)",a.beginPath(),a.moveTo(o,8),a.lineTo(o,l-8),a.moveTo(8,o),a.lineTo(l-8,o),a.stroke();const h=r*1.15%(Math.PI*2),d=a.createConicGradient?a.createConicGradient(h,o,o):null;d&&(d.addColorStop(0,"rgba(39,224,184,0.26)"),d.addColorStop(.12,"rgba(39,224,184,0)"),d.addColorStop(1,"rgba(39,224,184,0)"),a.fillStyle=d,a.beginPath(),a.arc(o,o,o-6,0,Math.PI*2),a.fill());const u=-s,f=Math.sin(u),_=Math.cos(u),x=(o-14)/32,m=(A,w)=>{const g=A*_-w*f,y=A*f+w*_;return{x:o+g*x,y:o-y*x}},p=m(n.x-t.x,n.z-t.z);a.save(),a.translate(p.x,p.y),a.rotate(Math.PI/4),a.fillStyle="rgba(39,224,184,0.9)",a.shadowColor="#27e0b8",a.shadowBlur=8,a.fillRect(-3,-3,6,6),a.restore();for(const A of e){let w=A.position.x-t.x,g=A.position.z-t.z;const y=m(w,g),L=y.x-o,P=y.y-o,N=Math.hypot(L,P),F=o-9,W=N>F?F/N:1,I=o+L*W,G=o+P*W,K=A.type==="colosso";a.fillStyle=K?"rgba(255,183,3,1)":"rgba(255,93,58,0.95)",a.shadowColor=K?"#ffb703":"#ff5d3a",a.shadowBlur=K?12:6,a.beginPath(),a.arc(I,G,K?4.5:2.6,0,Math.PI*2),a.fill()}a.shadowBlur=0,a.fillStyle="#f4ecd8",a.beginPath(),a.moveTo(o,o-6),a.lineTo(o-4.5,o+5),a.lineTo(o+4.5,o+5),a.closePath(),a.fill();const M=-u,E=o+Math.sin(M)*(o-12),b=o-Math.cos(M)*(o-12);a.fillStyle="rgba(255,183,3,0.8)",a.font='600 11px "Barlow Condensed", Arial',a.textAlign="center",a.textBaseline="middle",a.fillText("N",E,b),a.restore()}showEnd({victory:t,score:e,waves:n,kills:s,accuracy:r}){const a=Bt("gameover"),l=a?.querySelector(".end-panel");a&&(l?.classList.toggle("victory",t),Bt("endKicker").textContent=t?"PRAÇA PRESERVADA":"SINAL PERDIDO",Bt("endTitle").innerHTML=t?"A PRAÇA<br /><em>continua acesa.</em>":"A PRAÇA<br /><em>escureceu.</em>",Bt("endCopy").textContent=t?"O Colosso caiu. O Núcleo pulsa, o samba volta e a comunidade respira. Você segurou a noite.":"O Núcleo foi silenciado. Mas a maré sempre volta — e a praça vai precisar de você outra vez.",Bt("endScore").textContent=oh(e),Bt("endWaves").textContent=String(n),Bt("endKills").textContent=String(s),Bt("endAcc").textContent=`${Math.round(r)}%`,a.classList.remove("hidden"))}hideEnd(){Bt("gameover")?.classList.add("hidden")}reset(){this.last={},this.feedItems.forEach(t=>t.remove()),this.feedItems=[],this.r.killfeed?.replaceChildren(),this.r.scorePops?.replaceChildren(),this.r.waveBanner?.classList.remove("show"),this.r.interactHint?.classList.remove("show"),this.r.crosshair?.classList.remove("enemy","reloading"),this.r.targetTag?.classList.remove("show"),this.r.bossBar?.classList.add("hidden"),this.hideEnd()}}const au=[{title:"PRIMEIRA MARÉ",sub:"VESPAS NA PRAÇA",list:[["vespa",5],["urubu",1]],gap:[.65,1.15]},{title:"VENTO SUL",sub:"URUBUS NO CÉU",list:[["vespa",6],["urubu",2]],gap:[.55,1]},{title:"CORO DE AÇO",sub:"ENXAME ABERTO",list:[["vespa",8],["urubu",3]],gap:[.45,.85]},{title:"NOITE QUENTE",sub:"A PRAÇA RESPONDE",list:[["vespa",9],["urubu",3],["vespa",3]],gap:[.4,.75]},{title:"COLOSSO",sub:"A ÚLTIMA LUZ",list:[["colosso",1],["vespa",4]],gap:[.8,1.3],boss:!0}],_a=au.length,ur=100,Fl=new URLSearchParams(location.search),ui=ru(),O_=Fl.get("quality")==="high",B_=Fl.get("play")==="1",Ot=i=>document.getElementById(i),ou=(i,t,e)=>Math.max(t,Math.min(e,i)),z_=(i,t)=>i+Math.random()*(t-i),lu=()=>performance.now()/1e3,cu=Ot("scene"),lh=Ot("loading"),xa=document.querySelector(".loading-track i"),dr=Ot("menu"),As=Ot("pause"),nl=Ot("how"),Aa=Ot("countdown"),ao=Ot("cdValue");ui&&document.body.classList.add("touch-mode");Fl.has("touch")&&document.body.classList.add("touch-mode");const dn=new Kg({canvas:cu,antialias:!ui,powerPreference:"high-performance",alpha:!1,stencil:!1}),hu=ui?1.55:1.8;dn.setPixelRatio(Math.min(window.devicePixelRatio||1,hu));dn.setSize(window.innerWidth,window.innerHeight,!1);dn.outputColorSpace=tn;dn.toneMapping=Sa;dn.toneMappingExposure=1.02;dn.shadowMap.enabled=!0;dn.shadowMap.type=ph;dn.info.autoReset=!0;const Fi=new Pd,Ze=new Nn(60,window.innerWidth/window.innerHeight,.045,650);Ze.rotation.order="YXZ";Fi.add(Ze);const k_={uniforms:{tDiffuse:{value:null},uTime:{value:0},uVignette:{value:.4},uGrain:{value:.013},uAberration:{value:.0012}},vertexShader:`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,fragmentShader:`
    precision highp float;
    varying vec2 vUv;
    uniform sampler2D tDiffuse;
    uniform float uTime;
    uniform float uVignette;
    uniform float uGrain;
    uniform float uAberration;

    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
    }

    void main() {
      vec2 uv = vUv;
      vec2 c = uv - 0.5;
      float r2 = dot(c, c);
      float ab = uAberration * (0.35 + r2 * 2.4);
      vec3 col;
      col.r = texture2D(tDiffuse, uv + c * ab).r;
      col.g = texture2D(tDiffuse, uv).g;
      col.b = texture2D(tDiffuse, uv - c * ab).b;

      // subtle cinematic grade: cool shadows, warm highs
      float l = dot(col, vec3(0.299, 0.587, 0.114));
      col = mix(col, col * vec3(0.93, 1.015, 1.02), (1.0 - smoothstep(0.0, 0.45, l)) * 0.55);
      col = mix(col, col * vec3(1.045, 1.0, 0.94), smoothstep(0.45, 1.0, l) * 0.4);
      col = mix(vec3(l), col, 1.06);

      // vignette
      float vignette = smoothstep(0.85, 0.22, r2 * 1.75);
      col *= mix(1.0, vignette, uVignette);

      // grain / dither
      float n = hash(uv * 1400.0 + fract(uTime) * 71.0);
      col += (n - 0.5) * uGrain;

      gl_FragColor = vec4(max(col, 0.0), 1.0);
    }
  `},jn=new jg(dn);jn.setPixelRatio(dn.getPixelRatio());jn.setSize(window.innerWidth,window.innerHeight);const G_=new t_(Fi,Ze);jn.addPass(G_);const va=new Ts(new Ct(window.innerWidth,window.innerHeight),ui?.3:.34,.45,.92);jn.addPass(va);const uu=new su(k_);jn.addPass(uu);const H_=new n_;jn.addPass(H_);const Zt=new C_,$t=new F_;let Ln=null,Yt=null,Hn=null,Sn=null,ne=null,te="loading",Js="playing",vs=!1,ze=0,or=performance.now()/1e3,qs=0,il="",sl=!1,oo=0,$r=0,ch=0,fs=0,lr=0;const ct={wave:0,score:0,kills:0,shots:0,hits:0,combo:0,lastKill:-99,coreHealth:ur,spawnQueue:[],spawnTimer:0,waveActive:!1,intermission:0,clearTimer:0,running:!1,startTime:0},hh=new jd,V_=new Dt(2613432),uh=new Dt(16730666),W_=new Dt(16753978),cs=new Dt,oe={sensitivity:1,tiltSens:1,tilt:!1,sound:!0,haptics:!0,invert:!1};let Qs=0;try{const i=localStorage.getItem("brasa.settings.v1");i&&Object.assign(oe,JSON.parse(i)),Qs=Number(localStorage.getItem("brasa.best.v1")||0)||0}catch{}function Zn(){try{localStorage.setItem("brasa.settings.v1",JSON.stringify(oe))}catch{}}function Ol(){const i=Ot("bestScore");i&&(i.textContent=String(Qs).padStart(6,"0"))}Ol();xa&&(xa.style.width="8%");$t.setHudVisible(!1);function us(i,t){xa&&(xa.style.width=`${i}%`);const e=document.querySelector(".loading-copy");e&&t&&(e.textContent=t)}function X_(i){console.error(i),us(100,"FALHA AO ACENDER A PRAÇA");const t=document.querySelector(".loading-copy");t&&(t.textContent="SEU NAVEGADOR NÃO CONSEGUIU INICIAR O WEBGL. ATUALIZE E TENTE NOVAMENTE.",t.style.color="#ff9a86",t.style.maxWidth="70vw",t.style.textAlign="center",t.style.lineHeight="1.6")}function ps(){ne&&(ne.sensitivity=oe.sensitivity,ne.tiltSensitivity=oe.tiltSens,ne.invertY=oe.invert,ne.haptics=oe.haptics),Zt&&Zt.setEnabled(oe.sound);const i=Ot("sensVal"),t=Ot("tiltSensVal");i&&(i.textContent=`${oe.sensitivity.toFixed(2)}×`),t&&(t.textContent=`${oe.tiltSens.toFixed(2)}×`);const e=Ot("sensInput"),n=Ot("tiltSensInput");e&&(e.value=oe.sensitivity),n&&(n.value=oe.tiltSens),Oi(Ot("pauseSound"),oe.sound),Oi(Ot("pauseHaptics"),oe.haptics),Oi(Ot("pauseInvert"),oe.invert),Oi(Ot("pauseTilt"),ne?.tiltEnabled||!1),yi()}function Oi(i,t){i&&i.setAttribute("aria-pressed",t?"true":"false")}function yi(){const i=!!ne?.tiltEnabled;Oi(Ot("menuTilt"),i),Oi(Ot("pauseTilt"),i);const t=Ot("menuTiltNote");t&&(ne?.tiltSupported?ne?.tiltPermission==="denied"?t.textContent="Permissão negada nas configurações":i?t.textContent="Ativo · incline para mirar":t.textContent="Opcional · giroscópio":t.textContent="Indisponível neste aparelho"),$t.setTilt(i)}async function lo(i){if(!ne)return;if(!(typeof i=="boolean"?i:!ne.tiltEnabled)){await ne.enableTilt(!1),oe.tilt=!1,Zn(),yi(),$t.toast("MIRADA POR INCLINAÇÃO DESLIGADA");return}const e=await ne.enableTilt(!0);if(!e.ok){oe.tilt=!1,Zn(),yi(),e.reason==="unsupported"?$t.toast("GIROSCÓPIO INDISPONÍVEL NESTE APARELHO",{error:!0,duration:3200}):$t.toast("PERMISSÃO DE MOVIMENTO NEGADA · AJUSTES DO NAVEGADOR",{error:!0,duration:3800});return}oe.tilt=!0,Zn(),Zt.init(),ne.calibrateTilt(),yi(),$t.toast("INCLINAÇÃO ATIVA · INCLINE O APARELHO PARA MIRAR",{duration:3400}),Zt.ui(),setTimeout(()=>{ne.tiltEnabled&&!ne.tiltEventSeen&&(ne.enableTilt(!1),oe.tilt=!1,Zn(),yi(),$t.toast("NENHUM SENSOR DE MOVIMENTO DETECTADO",{error:!0,duration:3200}))},1600)}function du(){oe.sound=!oe.sound,Zt.setEnabled(oe.sound),Zn(),ps(),oe.sound&&Zt.ui(),$t.toast(oe.sound?"ÁUDIO LIGADO":"ÁUDIO SILENCIADO")}function q_(i){const t=1.15+Math.sin(i*.05)*.38,e=17.5;Ze.position.set(-2.2+Math.cos(t)*e,4.55+Math.sin(i*.17)*.32,-7.2+Math.sin(t)*e),Ze.lookAt(-3.2,2.35,-7.2),Ze.fov!==58&&(Ze.fov=58,Ze.updateProjectionMatrix()),Ze.rotation.z=Math.sin(i*.1)*.003}async function Y_(){us(18,"ESCULPINDO A PRAÇA DO SOL"),await new Promise(i=>setTimeout(i,80)),Ln=M_(Fi,dn,{mobile:ui}),us(46,"ACENDENDO O NÚCLEO"),await new Promise(i=>setTimeout(i,60)),Hn=new R_(Fi,Ze),us(62,"CALIBRANDO OS DRONES"),ne=new N_({canvas:cu,joystick:Ot("joystick"),joystickKnob:Ot("joyKnob"),fireBtn:Ot("btnFire"),reloadBtn:Ot("btnReload"),swapBtn:Ot("btnSwap"),dashBtn:Ot("btnDash"),onPause:()=>al(),onAction:(i,t)=>$_(i,t),canLock:()=>te==="playing"}),ui&&(ne.touch=!0),Yt=new w_(Ze,Fi,Ln,{mobile:ui,audio:Zt,input:ne}),Yt.viewRoot.visible=!1,Yt.viewLight.visible=!1,Yt.onShoot=j_,Yt.onDamage=(i,t)=>{const e=t?ix(t):0;$t.damage(e,i)},Yt.onDeath=()=>{(te==="playing"||te==="countdown")&&fr(!1)},Yt.onStep=()=>{Zt?.noiseBurst({dur:.06,vol:.035,type:"lowpass",freq:460,q:.8,decay:.05})},Sn=new T_(Fi,Ln,Hn,{audio:Zt,onKill:tx,onCoreHit:ex,onPlayerHit:nx,onSpawn:()=>{}}),us(82,"ENSaiando O SAMBA"),ps(),yi(),oe.tilt&&Oi(Ot("menuTilt"),!1),K_(),us(100,"PRAÇA PRONTA"),await new Promise(i=>setTimeout(i,350)),lh.classList.add("done"),setTimeout(()=>lh.classList.add("hidden"),750),dr.classList.remove("hidden"),te="menu",$t.setHudVisible(!1),B_&&setTimeout(()=>rl(),500),or=performance.now()/1e3,window.__BRASA__={scene:Fi,camera:Ze,player:Yt,world:Ln,enemies:Sn,effects:Hn,game:ct,getState:()=>te,hud:$t},requestAnimationFrame(mu)}function K_(){Ot("playBtn")?.addEventListener("click",()=>{Zt.init(),Zt.ui(),oe.tilt&&!ne.tiltEnabled&&lo(!0),rl()}),Ot("howBtn")?.addEventListener("click",()=>{Zt.init(),Zt.ui(),nl.classList.remove("hidden")}),Ot("howClose")?.addEventListener("click",()=>{Zt.ui(),nl.classList.add("hidden")}),Ot("settingsBtn")?.addEventListener("click",()=>{Zt.init(),Zt.ui(),vs=!0,Js=te,Ot("resumeBtn").querySelector(".btn-label").textContent="VOLTAR",As.classList.remove("hidden")}),Ot("menuTilt")?.addEventListener("pointerdown",t=>t.stopPropagation()),Ot("menuTilt")?.addEventListener("click",()=>{Zt.init(),lo()}),Ot("pauseTilt")?.addEventListener("click",()=>lo()),Ot("pauseSound")?.addEventListener("click",()=>du()),Ot("pauseHaptics")?.addEventListener("click",()=>{oe.haptics=!oe.haptics,Zn(),ps(),Zt.ui()}),Ot("pauseInvert")?.addEventListener("click",()=>{oe.invert=!oe.invert,Zn(),ps(),Zt.ui()}),Ot("sensInput")?.addEventListener("input",t=>{oe.sensitivity=Number(t.target.value),Zn(),ps()}),Ot("tiltSensInput")?.addEventListener("input",t=>{oe.tiltSens=Number(t.target.value),Zn(),ps()}),Ot("btnPause")?.addEventListener("click",()=>al()),Ot("btnFullscreen")?.addEventListener("click",()=>ox()),Ot("resumeBtn")?.addEventListener("click",()=>pu()),Ot("quitBtn")?.addEventListener("click",()=>{if(As.classList.add("hidden"),vs){vs=!1,dr.classList.remove("hidden"),te="menu",Ot("resumeBtn").querySelector(".btn-label").textContent="VOLTAR AO COMBATE";return}dh()}),Ot("retryBtn")?.addEventListener("click",()=>{$t.hideEnd(),rl()}),Ot("menuBtn")?.addEventListener("click",()=>dh()),document.addEventListener("visibilitychange",()=>{document.hidden&&(te==="playing"||te==="countdown")&&al()});const i=async()=>{window.removeEventListener("pointerdown",i),window.removeEventListener("keydown",i);let t=null;oe.tilt&&!ne.tiltEnabled&&(t=await ne.enableTilt(!0)),Zt.init(),t&&(t.ok?(ne.calibrateTilt(),yi()):(oe.tilt=!1,Zn(),yi()))};window.addEventListener("pointerdown",i,{once:!0}),window.addEventListener("keydown",i,{once:!0}),document.addEventListener("pointerdown",t=>{Zt.started&&t.target.closest("button")&&Zt.ui()}),window.addEventListener("resize",ol),window.addEventListener("orientationchange",()=>setTimeout(ol,250))}function $_(i,t){if(i==="weapon"){if(te!=="playing"||!Yt)return;Yt.switchWeapon(t===0?"rifle":"shotgun")}else i==="mute"?du():i==="lockchange"?!t&&te==="playing"&&!ne.touch&&$t.toast("CLIQUE NA PRAÇA PARA MIRAR",{duration:2600}):i==="lockerror"&&$t.toast("CLIQUE NOVAMENTE PARA TRAVAR O MOUSE",{duration:2200})}async function rl(){Zt.init(),Zt.setEnabled(oe.sound),Zt.setMusic(!0),Zt.setIntensity(.12),$t.reset(),$t.setHudVisible(!0),$t.hideTutorial(),dr.classList.add("hidden"),nl.classList.add("hidden"),As.classList.add("hidden"),Aa.classList.remove("hidden"),Ot("gameover").classList.add("hidden"),Yt.reset(),Yt.viewRoot.visible=!0,Yt.viewLight.visible=!0,Yt.alive=!0,Sn.clear(),ct.wave=0,ct.score=0,ct.kills=0,ct.shots=0,ct.hits=0,ct.combo=0,ct.lastKill=-99,ct.coreHealth=ur,ct.spawnQueue=[],ct.spawnTimer=0,ct.waveActive=!1,ct.intermission=0,ct.clearTimer=0,ct.running=!1,ct.startTime=lu(),fs=0,lr=0,qs=3.6,il="",te="countdown",ne.setActive(!1),ui?(gu(),ax()):ne.requestLock(),$t.setTilt(ne.tiltEnabled),$t.updateCompass(0),$t.tutorial("MISSÃO",ui?"Joystick para mover · Arraste para mirar · Segure FOGO":"WASD mover · Mouse mirar · Clique atirar · R recarregar",6500)}function fu(i){const t=au[i-1];if(!t)return;ct.wave=i,ct.waveActive=!0,ct.spawnQueue=[],ct.spawnTimer=0,ct.intermission=0,ct.clearTimer=0;let e=i===1?1.1:.9;for(const[n,s]of t.list)for(let r=0;r<s;r++)ct.spawnQueue.push({type:n,delay:e}),e+=z_(t.gap[0],t.gap[1]);t.boss&&(ct.spawnQueue.sort((n,s)=>n.type==="colosso"?-1:s.type==="colosso"?1:0),ct.spawnQueue[0].delay=.7),ct.running=!0,$t.waveBanner(`ONDA 0${i}`,t.title,t.sub,{boss:t.boss,duration:2600}),Zt.waveHorn(!!t.boss),Zt.setIntensity(ou(.16+i*.16,0,.95)),t.boss?($t.feed("ALERTA: <b>COLOSSO</b> NA PRAÇA",{teal:!1}),setTimeout(()=>$t.toast("COLOSSO DETECTADO · MIRE NO OLHO",{error:!0,duration:3600}),800)):$t.toast(`ONDA ${i} · ${t.sub}`,{duration:2200})}function Z_(i){if(ct.spawnQueue.length)for(ct.spawnTimer+=i;ct.spawnQueue.length&&ct.spawnQueue[0].delay<=ct.spawnTimer;){const t=ct.spawnQueue.shift(),e=t.type==="colosso"?new C(0,10.5,-29):null;Sn.spawn(t.type,e)}}function J_(i){te==="playing"&&(ct.waveActive?(Z_(i),ct.spawnQueue.length+Sn.enemies.length===0&&ct.spawnQueue.length===0?(ct.clearTimer+=i,ct.clearTimer>1.4&&Q_()):ct.clearTimer=0):ct.intermission>0&&(ct.intermission-=i,ct.intermission<=0&&fu(ct.wave+1)))}function Q_(){ct.waveActive=!1,ct.clearTimer=0;const i=400*ct.wave;ct.score+=i;const t=Math.min(ur,ct.coreHealth+8),e=Math.round(t-ct.coreHealth);if(ct.coreHealth=t,Yt.heal(24),$t.flashHeal(1),$t.feed(`ONDA ${ct.wave} LIMPA <b>+${i}</b>`,{teal:!0}),e>0&&$t.toast(`NÚCLEO ESTABILIZADO · +${e}%`,{duration:2200}),Zt.waveClear(),ct.wave>=_a){setTimeout(()=>fr(!0),800);return}ct.intermission=5.8,$t.waveBanner("PRAÇA SEGURA","ONDA LIMPA","PRÓXIMA EM 5s",{duration:3400}),Zt.setMusic(!0),Zt.setIntensity(ou(.1+ct.wave*.12,0,.8))}function fr(i){if(te==="over")return;te="over",ne.setActive(!1),Yt.alive=!1,Zt.setMusic(!1),i?Zt.victory():Zt.fail();const t=ct.shots>0?ct.hits/ct.shots*100:0,e=i?_a:Math.max(0,ct.wave-(ct.waveActive?1:0));if(ct.score>Qs){Qs=ct.score;try{localStorage.setItem("brasa.best.v1",String(Qs))}catch{}Ol()}$t.showEnd({victory:i,score:ct.score,waves:i?_a:e,kills:ct.kills,accuracy:t}),Sn.clear(),Aa.classList.add("hidden")}function al(){te==="playing"||te==="countdown"?(Js=te,te="paused",vs=!1,ne.setActive(!1),Zt.setMusic(!1),Ot("resumeBtn").querySelector(".btn-label").textContent="VOLTAR AO COMBATE",As.classList.remove("hidden"),document.pointerLockElement&&document.exitPointerLock?.()):te==="paused"&&pu()}function pu(){if(As.classList.add("hidden"),vs&&(vs=!1,te=Js==="menu"?"menu":Js,te==="menu")){dr.classList.remove("hidden"),Ot("resumeBtn").querySelector(".btn-label").textContent="VOLTAR AO COMBATE";return}te=Js,(te==="playing"||te==="countdown")&&(ne.setActive(!0),Zt.setMusic(!0),ne.touch||ne.requestLock()),or=performance.now()/1e3}function dh(){te="menu",As.classList.add("hidden"),Aa.classList.add("hidden"),dr.classList.remove("hidden"),Ot("gameover").classList.add("hidden"),$t.setHudVisible(!1),$t.reset(),ne.setActive(!1),Zt.setMusic(!1),Zt.setIntensity(0),Yt.alive=!1,Yt.viewRoot.visible=!1,Yt.viewLight.visible=!1,Sn.clear(),ct.waveActive=!1,ct.spawnQueue=[],ct.intermission=0,Ze.fov=58,Ze.updateProjectionMatrix(),Ol()}function j_({weapon:i,spread:t,origin:e,muzzle:n}){if(te!=="playing")return;ct.shots++;const s=Yt.dir.clone();if(ne.touch){const o=Sn.findAimAssist(e,s,.05);o&&s.copy(o.direction)}let r=!1,a=!1;const l=i.pellets;for(let o=0;o<l;o++){const c=s.clone();c.x+=(Math.random()-.5)*t*2,c.y+=(Math.random()-.5)*t*2,c.z+=(Math.random()-.5)*t*2,c.normalize(),hh.set(e,c);const h=Sn.raycast(hh.ray,130);let d;if(h){r=!0;const u=Sn.damage(h.enemy,i.damage,h.isHead,h.point);Hn.spawnImpact(h.point,h.isHead?16765286:16756060,h.isHead?1.15:.8),d=h.point,u.killed?a=a||h.isHead:h.isHead&&(a=!0),$t.hitmarker(u.killed,h.isHead),Zt.hit(h.isHead)}else{let u=75;c.y<-.001&&(u=Math.min(u,(e.y-.05)/-c.y)),d=e.clone().addScaledVector(c,u)}Hn.spawnTracer(n,d,i.tracer),o===0&&Hn.spawnMuzzle(n,i.tracer,i.id==="shotgun"?1.5:.7)}r&&ct.hits++}function tx(i,t){const e=lu();e-ct.lastKill<3.4?ct.combo++:ct.combo=1,ct.lastKill=e,ct.kills++;const n=1+Math.max(0,ct.combo-1)*.18,s=Math.round(i.def.score*n*(t?1.5:1));ct.score+=s;const r=i.def.name,a=t?"TIRO NA CABEÇA":"DESATIVADO",l=i.type==="colosso"?"<b>COLOSSO</b> DESTRUÍDO":`${r} ${a}`;$t.feed(l,{teal:i.type==="colosso",points:s});const o=i.position.clone();o.y+=i.scale*.6,$t.popScore(o,Ze,`+${s}`,t),t&&$t.hitmarker(!0,!0),i.type==="colosso"?($t.waveBanner("ALVO NEUTRALIZADO","COLOSSO CAIU","A PRAÇA RESISTE",{duration:3e3}),$t.toast("COLOSSO DESTRUÍDO · +5000",{duration:3e3}),Yt.shake=Math.max(Yt.shake,.65)):Yt.shake=Math.max(Yt.shake,.05),ne.haptic?.(i.type==="colosso"?[40,60,30,60,80]:[12,22,10])}function ex(i){te==="playing"&&(ct.coreHealth=Math.max(0,ct.coreHealth-i),fs=1,Yt.shake=Math.max(Yt.shake,.18),lr<=0&&($t.toast("NÚCLEO SOB ATAQUE",{error:!0,duration:1400}),lr=4.5),ct.coreHealth<=0&&fr(!1))}function nx(i,t){te!=="playing"||!Yt.alive||(Yt.takeDamage(i,t),Yt.health<=0&&fr(!1))}function ix(i){const t=i.x-Yt.position.x,e=i.z-Yt.position.z,n=Yt.yaw,s=Math.cos(n),r=-Math.sin(n),a=-Math.sin(n),l=-Math.cos(n),o=t*s+e*r,c=t*a+e*l;return Math.atan2(o,c)}function sx(i){if(qs-=i,qs<=0){Aa.classList.add("hidden"),te="playing",ne.setActive(!0),fu(1),or=performance.now()/1e3;return}const t=Math.ceil(qs-.55);let e;qs>.55?e=String(Math.max(1,t)):e="JÁ",e!==il&&(il=e,ao.textContent=e,ao.animate&&ao.animate([{transform:"scale(1.32)",opacity:.4},{transform:"scale(1)",opacity:1}],{duration:320,easing:"cubic-bezier(.2,.8,.2,1)"}),e!=="JÁ"&&Zt.ui())}function mu(){requestAnimationFrame(mu);const i=performance.now()/1e3;let t=i-or;or=i,t>.1&&(t=.1),t<0&&(t=0),ze+=t,uu.uniforms.uTime.value=ze,Ln&&(te==="menu"||te==="loading"?(q_(ze),Ln.update(t,ze),Hn?.update(t,ze)):te==="paused"?(Ln.update(t,ze),Hn?.update(t,ze)):te==="countdown"?(sx(t),Ln.update(t,ze),Hn?.update(t,ze),Yt&&Yt.update(t,ze),co(t),$t.set(Yt.state,fh())):te==="playing"?(Ln.update(t,ze),Hn.update(t,ze),Yt.update(t,ze),Sn.update(t,ze,Yt),J_(t),co(t),lr=Math.max(0,lr-t),ze-ct.lastKill>3.4&&ct.combo!==0&&(ct.combo=0),Yt.health<=0&&te==="playing"&&fr(!1),$t.set(Yt.state,fh()),$t.drawRadar(Yt.position,Sn.enemies,Ln.core.position,Yt.yaw,ze),rx(t)):te==="over"&&(Ln.update(t,ze),Hn.update(t,ze),Yt?.updateWeapon(t,ze,0),co(t)),jn.render())}function fh(){let i=null;if((te==="playing"||te==="countdown")&&Yt?.alive){const t=Sn.findAimAssist(Ze.position,Yt.dir,.055);t&&(i=t.enemy)}return{core:ct.coreHealth/ur,wave:Math.max(1,ct.wave),totalWaves:_a,enemies:ct.spawnQueue.length+(Sn?.enemies.length||0),score:ct.score,combo:ct.combo,boss:Sn?.boss||null,target:i}}function co(i){if(fs=Math.max(0,fs-i*1.6),!Ln)return;const t=Ln.core.orb.material,e=ct.coreHealth/ur,n=.5+Math.sin(ze*(e<.3?6:2.2))*.5;cs.copy(V_),e<.55&&cs.lerp(W_,(.55-e)/.55),e<.25&&cs.lerp(uh,(.25-e)/.25),cs.lerp(uh,fs*.8),t.emissive.copy(cs),t.emissiveIntensity=2+fs*4+(e<.3?n*1.2:0),t.color.copy(cs).lerp(new Dt(16777215),.35)}function rx(i){if(!O_&&(ch+=i,oo+=i,$r++,$r>=90)){const t=$r/oo;!sl&&t<42&&ch>4&&(sl=!0,va.strength=.32,dn.setPixelRatio(Math.min(window.devicePixelRatio||1,1.15)),jn.setPixelRatio(dn.getPixelRatio()),ol(),$t.toast("QUALIDADE AJUSTADA PARA MANTER O RITMO",{duration:2400})),oo=0,$r=0}}function ol(){const i=window.innerWidth,t=window.innerHeight;Ze.aspect=i/t,Ze.updateProjectionMatrix(),dn.setSize(i,t,!1),sl||dn.setPixelRatio(Math.min(window.devicePixelRatio||1,hu)),jn.setPixelRatio(dn.getPixelRatio()),jn.setSize(i,t),va&&va.setSize(i,t)}async function gu(){try{!document.fullscreenElement&&document.documentElement.requestFullscreen&&await document.documentElement.requestFullscreen({navigationUI:"hide"})}catch{}}async function ax(){try{screen.orientation?.lock&&await screen.orientation.lock("landscape")}catch{}}function ox(){document.fullscreenElement?document.exitFullscreen?.().catch?.(()=>{}):gu(),Zt.ui()}Y_().catch(X_);
