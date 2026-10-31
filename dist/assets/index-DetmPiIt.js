(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const Ha="187",Lc=0,Eo=1,Ic=2,Ys=1,Dc=2,ns=3,oi=0,Ve=1,on=2,Ni=0,ss=1,he=2,wo=3,To=4,Nc=5,Ii=100,Uc=101,Fc=102,Oc=103,Bc=104,zc=200,kc=201,Gc=202,Hc=203,Pl=204,Ll=205,Vc=206,Wc=207,Xc=208,qc=209,Yc=210,Kc=211,Zc=212,$c=213,Jc=214,jr=0,ta=1,ea=2,rs=3,na=4,ia=5,sa=6,ra=7,Va=0,Qc=1,jc=2,Nn=0,Il=1,Dl=2,Nl=3,Wa=4,Ul=5,Fl=6,Ol=7,Bl=300,Oi=301,as=302,Mr=303,Sr=304,os=1e3,Dn=1001,aa=1002,Ie=1003,th=1004,ms=1005,Xe=1006,yr=1007,Kn=1008,$e=1009,zl=1010,kl=1011,ls=1012,Xa=1013,wn=1014,mn=1015,Tn=1016,qa=1017,Ya=1018,Bi=1020,Gl=35902,Hl=35899,Vl=1021,Wl=1022,bn=1023,Jn=1026,Zn=1027,Ka=1028,Za=1029,li=1030,$a=1031,Ja=1033,Ks=33776,Zs=33777,$s=33778,Js=33779,oa=35840,la=35841,ca=35842,ha=35843,ua=36196,da=37492,fa=37496,pa=37488,ma=37489,tr=37490,ga=37491,_a=37808,xa=37809,va=37810,Ma=37811,Sa=37812,ya=37813,ba=37814,Ea=37815,wa=37816,Ta=37817,Aa=37818,Ra=37819,Ca=37820,Pa=37821,La=36492,Ia=36494,Da=36495,Na=36283,Ua=36284,er=36285,Fa=36286,eh=3200,nr=0,nh=1,Yn="",He="srgb",ir="srgb-linear",sr="linear",ne="srgb",br=7680,ih=519,sh=512,rh=513,ah=514,Xl=515,oh=516,lh=517,ql=518,Yl=519,Kl=35044,Ao="300 es",gn=2e3,cs=2001;function ch(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function rr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function hh(){const i=rr("canvas");return i.style.display="block",i}const Ro={};function ar(...i){const t="THREE."+i.shift();console.log(t,...i)}function Zl(i){const t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){const e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Dt(...i){i=Zl(i);const t="THREE."+i.shift();{const e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function jt(...i){i=Zl(i);const t="THREE."+i.shift();{const e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function Qs(...i){const t=i.join(" ");t in Ro||(Ro[t]=!0,Dt(...i))}function uh(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const dh={[jr]:jr,[ea]:sa,[na]:na,[rs]:ia,[ta]:ta,[sa]:ea,[ra]:ra,[ia]:rs};class hi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const s=n[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const Ue=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Er=Math.PI/180,Oa=180/Math.PI;function ui(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ue[i&255]+Ue[i>>8&255]+Ue[i>>16&255]+Ue[i>>24&255]+"-"+Ue[t&255]+Ue[t>>8&255]+"-"+Ue[t>>16&15|64]+Ue[t>>24&255]+"-"+Ue[e&63|128]+Ue[e>>8&255]+"-"+Ue[e>>16&255]+Ue[e>>24&255]+Ue[n&255]+Ue[n>>8&255]+Ue[n>>16&255]+Ue[n>>24&255]).toLowerCase()}function $t(i,t,e){return Math.max(t,Math.min(e,i))}function fh(i,t){return(i%t+t)%t}function wr(i,t,e){return(1-e)*i+e*t}function ph(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function dr(i){switch(i.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function $l(i,t){if(t.constructor===Float32Array)return i;const e=dr(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(i/e,-1)}function Jl(i,t){if(t.constructor===Float32Array)return i;const e=dr(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(i*e)}const lo=class lo{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=$t(this.x,t.x,e.x),this.y=$t(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=$t(this.x,t,e),this.y=$t(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar($t(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos($t(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};lo.prototype.isVector2=!0;let Ut=lo;class xn{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let c=n[s+0],l=n[s+1],d=n[s+2],u=n[s+3],h=r[a+0],m=r[a+1],_=r[a+2],x=r[a+3];if(u!==x||c!==h||l!==m||d!==_){let p=c*h+l*m+d*_+u*x;p<0&&(h=-h,m=-m,_=-_,x=-x,p=-p);let f=1-o;if(p<.9995){const v=Math.acos(p),E=Math.sin(v);f=Math.sin(f*v)/E,o=Math.sin(o*v)/E,c=c*f+h*o,l=l*f+m*o,d=d*f+_*o,u=u*f+x*o}else{c=c*f+h*o,l=l*f+m*o,d=d*f+_*o,u=u*f+x*o;const v=1/Math.sqrt(c*c+l*l+d*d+u*u);c*=v,l*=v,d*=v,u*=v}}t[e]=c,t[e+1]=l,t[e+2]=d,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,a){const o=n[s],c=n[s+1],l=n[s+2],d=n[s+3],u=r[a],h=r[a+1],m=r[a+2],_=r[a+3];return t[e]=o*_+d*u+c*m-l*h,t[e+1]=c*_+d*h+l*u-o*m,t[e+2]=l*_+d*m+o*h-c*u,t[e+3]=d*_-o*u-c*h-l*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,c=Math.sin,l=o(n/2),d=o(s/2),u=o(r/2),h=c(n/2),m=c(s/2),_=c(r/2);switch(a){case"XYZ":this._x=h*d*u+l*m*_,this._y=l*m*u-h*d*_,this._z=l*d*_+h*m*u,this._w=l*d*u-h*m*_;break;case"YXZ":this._x=h*d*u+l*m*_,this._y=l*m*u-h*d*_,this._z=l*d*_-h*m*u,this._w=l*d*u+h*m*_;break;case"ZXY":this._x=h*d*u-l*m*_,this._y=l*m*u+h*d*_,this._z=l*d*_+h*m*u,this._w=l*d*u-h*m*_;break;case"ZYX":this._x=h*d*u-l*m*_,this._y=l*m*u+h*d*_,this._z=l*d*_-h*m*u,this._w=l*d*u+h*m*_;break;case"YZX":this._x=h*d*u+l*m*_,this._y=l*m*u+h*d*_,this._z=l*d*_-h*m*u,this._w=l*d*u-h*m*_;break;case"XZY":this._x=h*d*u-l*m*_,this._y=l*m*u-h*d*_,this._z=l*d*_+h*m*u,this._w=l*d*u+h*m*_;break;default:Dt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],c=e[9],l=e[2],d=e[6],u=e[10],h=n+o+u;if(h>0){const m=.5/Math.sqrt(h+1);this._w=.25/m,this._x=(d-c)*m,this._y=(r-l)*m,this._z=(a-s)*m}else if(n>o&&n>u){const m=2*Math.sqrt(1+n-o-u);this._w=(d-c)/m,this._x=.25*m,this._y=(s+a)/m,this._z=(r+l)/m}else if(o>u){const m=2*Math.sqrt(1+o-n-u);this._w=(r-l)/m,this._x=(s+a)/m,this._y=.25*m,this._z=(c+d)/m}else{const m=2*Math.sqrt(1+u-n-o);this._w=(a-s)/m,this._x=(r+l)/m,this._y=(c+d)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs($t(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,c=e._y,l=e._z,d=e._w;return this._x=n*d+a*o+s*l-r*c,this._y=s*d+a*c+r*o-n*l,this._z=r*d+a*l+n*c-s*o,this._w=a*d-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let c=1-e;if(o<.9995){const l=Math.acos(o),d=Math.sin(l);c=Math.sin(c*l)/d,e=Math.sin(e*l)/d,this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+a*e,this._onChangeCallback()}else this._x=this._x*c+n*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+a*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const co=class co{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Co.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Co.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,c=t.w,l=2*(a*s-o*n),d=2*(o*e-r*s),u=2*(r*n-a*e);return this.x=e+c*l+a*u-o*d,this.y=n+c*d+o*l-r*u,this.z=s+c*u+r*d-a*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=$t(this.x,t.x,e.x),this.y=$t(this.y,t.y,e.y),this.z=$t(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=$t(this.x,t,e),this.y=$t(this.y,t,e),this.z=$t(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar($t(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,c=e.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Tr.copy(this).projectOnVector(t),this.sub(Tr)}reflect(t){return this.sub(Tr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos($t(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};co.prototype.isVector3=!0;let C=co;const Tr=new C,Co=new xn,ho=class ho{constructor(t,e,n,s,r,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,c,l)}set(t,e,n,s,r,a,o,c,l){const d=this.elements;return d[0]=t,d[1]=s,d[2]=o,d[3]=e,d[4]=r,d[5]=c,d[6]=n,d[7]=a,d[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],d=n[4],u=n[7],h=n[2],m=n[5],_=n[8],x=s[0],p=s[3],f=s[6],v=s[1],E=s[4],y=s[7],w=s[2],A=s[5],g=s[8];return r[0]=a*x+o*v+c*w,r[3]=a*p+o*E+c*A,r[6]=a*f+o*y+c*g,r[1]=l*x+d*v+u*w,r[4]=l*p+d*E+u*A,r[7]=l*f+d*y+u*g,r[2]=h*x+m*v+_*w,r[5]=h*p+m*E+_*A,r[8]=h*f+m*y+_*g,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],d=t[8];return e*a*d-e*o*l-n*r*d+n*o*c+s*r*l-s*a*c}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],d=t[8],u=d*a-o*l,h=o*c-d*r,m=l*r-a*c,_=e*u+n*h+s*m;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/_;return t[0]=u*x,t[1]=(s*l-d*n)*x,t[2]=(o*n-s*a)*x,t[3]=h*x,t[4]=(d*e-s*c)*x,t[5]=(s*r-o*e)*x,t[6]=m*x,t[7]=(n*c-l*e)*x,t[8]=(a*e-n*r)*x,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+t,-s*l,s*c,-s*(-l*a+c*o)+o+e,0,0,1),this}scale(t,e){return Qs("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Ar.makeScale(t,e)),this}rotate(t){return Qs("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Ar.makeRotation(-t)),this}translate(t,e){return Qs("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Ar.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};ho.prototype.isMatrix3=!0;let Bt=ho;const Ar=new Bt,Po=new Bt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Lo=new Bt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function mh(){const i={enabled:!0,workingColorSpace:ir,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===ne&&(s.r=Un(s.r),s.g=Un(s.g),s.b=Un(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ne&&(s.r=Ui(s.r),s.g=Ui(s.g),s.b=Ui(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Yn?sr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[a].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[ir]:{primaries:t,whitePoint:n,transfer:sr,toXYZ:Po,fromXYZ:Lo,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:He},outputColorSpaceConfig:{drawingBufferColorSpace:He}},[He]:{primaries:t,whitePoint:n,transfer:ne,toXYZ:Po,fromXYZ:Lo,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:He}}}),i}const Zt=mh();function Un(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ui(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let fi;class gh{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{fi===void 0&&(fi=rr("canvas")),fi.width=t.width,fi.height=t.height;const s=fi.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=fi}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=rr("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Un(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Un(e[n]/255)*255):e[n]=Un(e[n]);return{data:e,width:t.width,height:t.height}}else return Dt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let _h=0;class Qa{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:_h++}),this.uuid=ui(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width||0,e.height||0,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Rr(s[a].image)):r.push(Rr(s[a]))}else r=Rr(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function Rr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?gh.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Dt("Texture: Unable to serialize Texture."),{})}let xh=0;const Cr=new C;class Be extends hi{constructor(t=Be.DEFAULT_IMAGE,e=Be.DEFAULT_MAPPING,n=Dn,s=Dn,r=Xe,a=Kn,o=bn,c=$e,l=Be.DEFAULT_ANISOTROPY,d=Yn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:xh++}),this.uuid=ui(),this.name="",this.source=new Qa(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Ut(0,0),this.repeat=new Ut(1,1),this.center=new Ut(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Bt,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(Cr).x}get height(){return this.source.getSize(Cr).y}get depth(){return this.source.getSize(Cr).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.mipmapsAutoUpdate=t.mipmapsAutoUpdate,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isPMREMTexture=t.isPMREMTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){Dt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Dt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Bl)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case os:t.x=t.x-Math.floor(t.x);break;case Dn:t.x=t.x<0?0:1;break;case aa:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case os:t.y=t.y-Math.floor(t.y);break;case Dn:t.y=t.y<0?0:1;break;case aa:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Be.DEFAULT_IMAGE=null;Be.DEFAULT_MAPPING=Bl;Be.DEFAULT_ANISOTROPY=1;const uo=class uo{constructor(t=0,e=0,n=0,s=1){this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const c=t.elements,l=c[0],d=c[4],u=c[8],h=c[1],m=c[5],_=c[9],x=c[2],p=c[6],f=c[10];if(Math.abs(d-h)<.01&&Math.abs(u-x)<.01&&Math.abs(_-p)<.01){if(Math.abs(d+h)<.1&&Math.abs(u+x)<.1&&Math.abs(_+p)<.1&&Math.abs(l+m+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const E=(l+1)/2,y=(m+1)/2,w=(f+1)/2,A=(d+h)/4,g=(u+x)/4,b=(_+p)/4;return E>y&&E>w?E<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(E),s=A/n,r=g/n):y>w?y<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),n=A/s,r=b/s):w<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(w),n=g/r,s=b/r),this.set(n,s,r,e),this}let v=Math.sqrt((p-_)*(p-_)+(u-x)*(u-x)+(h-d)*(h-d));return Math.abs(v)<.001&&(v=1),this.x=(p-_)/v,this.y=(u-x)/v,this.z=(h-d)/v,this.w=Math.acos((l+m+f-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=$t(this.x,t.x,e.x),this.y=$t(this.y,t.y,e.y),this.z=$t(this.z,t.z,e.z),this.w=$t(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=$t(this.x,t,e),this.y=$t(this.y,t,e),this.z=$t(this.z,t,e),this.w=$t(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar($t(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};uo.prototype.isVector4=!0;let pe=uo;class vh extends hi{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Xe,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new pe(0,0,t,e),this.scissorTest=!1,this.viewport=new pe(0,0,t,e),this.textures=[];const s=n.count;for(let r=0;r<s;r++)this.textures[r]=new Be({width:t,height:e,depth:n.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){const e={minFilter:Xe,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.mipmapsAutoUpdate!==void 0&&(e.mipmapsAutoUpdate=t.mipmapsAutoUpdate),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new Qa(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){const e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;else this.depthTexture=null;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class En extends vh{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Ql extends Be{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ie,this.minFilter=Ie,this.wrapR=Dn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Mh extends Be{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ie,this.minFilter=Ie,this.wrapR=Dn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}}const ur=class ur{constructor(t,e,n,s,r,a,o,c,l,d,u,h,m,_,x,p){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,c,l,d,u,h,m,_,x,p)}set(t,e,n,s,r,a,o,c,l,d,u,h,m,_,x,p){const f=this.elements;return f[0]=t,f[4]=e,f[8]=n,f[12]=s,f[1]=r,f[5]=a,f[9]=o,f[13]=c,f[2]=l,f[6]=d,f[10]=u,f[14]=h,f[3]=m,f[7]=_,f[11]=x,f[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ur().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();const e=this.elements,n=t.elements,s=1/pi.setFromMatrixColumn(t,0).length(),r=1/pi.setFromMatrixColumn(t,1).length(),a=1/pi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),d=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const h=a*d,m=a*u,_=o*d,x=o*u;e[0]=c*d,e[4]=-c*u,e[8]=l,e[1]=m+_*l,e[5]=h-x*l,e[9]=-o*c,e[2]=x-h*l,e[6]=_+m*l,e[10]=a*c}else if(t.order==="YXZ"){const h=c*d,m=c*u,_=l*d,x=l*u;e[0]=h+x*o,e[4]=_*o-m,e[8]=a*l,e[1]=a*u,e[5]=a*d,e[9]=-o,e[2]=m*o-_,e[6]=x+h*o,e[10]=a*c}else if(t.order==="ZXY"){const h=c*d,m=c*u,_=l*d,x=l*u;e[0]=h-x*o,e[4]=-a*u,e[8]=_+m*o,e[1]=m+_*o,e[5]=a*d,e[9]=x-h*o,e[2]=-a*l,e[6]=o,e[10]=a*c}else if(t.order==="ZYX"){const h=a*d,m=a*u,_=o*d,x=o*u;e[0]=c*d,e[4]=_*l-m,e[8]=h*l+x,e[1]=c*u,e[5]=x*l+h,e[9]=m*l-_,e[2]=-l,e[6]=o*c,e[10]=a*c}else if(t.order==="YZX"){const h=a*c,m=a*l,_=o*c,x=o*l;e[0]=c*d,e[4]=x-h*u,e[8]=_*u+m,e[1]=u,e[5]=a*d,e[9]=-o*d,e[2]=-l*d,e[6]=m*u+_,e[10]=h-x*u}else if(t.order==="XZY"){const h=a*c,m=a*l,_=o*c,x=o*l;e[0]=c*d,e[4]=-u,e[8]=l*d,e[1]=h*u+x,e[5]=a*d,e[9]=m*u-_,e[2]=_*u-m,e[6]=o*d,e[10]=x*u+h}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Sh,t,yh)}lookAt(t,e,n){const s=this.elements;return Ye.subVectors(t,e),Ye.lengthSq()===0&&(Ye.z=1),Ye.normalize(),Gn.crossVectors(n,Ye),Gn.lengthSq()===0&&(Math.abs(n.z)===1?Ye.x+=1e-4:Ye.z+=1e-4,Ye.normalize(),Gn.crossVectors(n,Ye)),Gn.normalize(),gs.crossVectors(Ye,Gn),s[0]=Gn.x,s[4]=gs.x,s[8]=Ye.x,s[1]=Gn.y,s[5]=gs.y,s[9]=Ye.y,s[2]=Gn.z,s[6]=gs.z,s[10]=Ye.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],d=n[1],u=n[5],h=n[9],m=n[13],_=n[2],x=n[6],p=n[10],f=n[14],v=n[3],E=n[7],y=n[11],w=n[15],A=s[0],g=s[4],b=s[8],N=s[12],R=s[1],L=s[5],U=s[9],G=s[13],I=s[2],H=s[6],Z=s[10],z=s[14],et=s[3],V=s[7],j=s[11],tt=s[15];return r[0]=a*A+o*R+c*I+l*et,r[4]=a*g+o*L+c*H+l*V,r[8]=a*b+o*U+c*Z+l*j,r[12]=a*N+o*G+c*z+l*tt,r[1]=d*A+u*R+h*I+m*et,r[5]=d*g+u*L+h*H+m*V,r[9]=d*b+u*U+h*Z+m*j,r[13]=d*N+u*G+h*z+m*tt,r[2]=_*A+x*R+p*I+f*et,r[6]=_*g+x*L+p*H+f*V,r[10]=_*b+x*U+p*Z+f*j,r[14]=_*N+x*G+p*z+f*tt,r[3]=v*A+E*R+y*I+w*et,r[7]=v*g+E*L+y*H+w*V,r[11]=v*b+E*U+y*Z+w*j,r[15]=v*N+E*G+y*z+w*tt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],c=t[9],l=t[13],d=t[2],u=t[6],h=t[10],m=t[14],_=t[3],x=t[7],p=t[11],f=t[15],v=c*m-l*h,E=o*m-l*u,y=o*h-c*u,w=a*m-l*d,A=a*h-c*d,g=a*u-o*d;return e*(x*v-p*E+f*y)-n*(_*v-p*w+f*A)+s*(_*E-x*w+f*g)-r*(_*y-x*A+p*g)}determinantAffine(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[1],a=t[5],o=t[9],c=t[2],l=t[6],d=t[10];return e*(a*d-o*l)-n*(r*d-o*c)+s*(r*l-a*c)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],d=t[8],u=t[9],h=t[10],m=t[11],_=t[12],x=t[13],p=t[14],f=t[15],v=e*o-n*a,E=e*c-s*a,y=e*l-r*a,w=n*c-s*o,A=n*l-r*o,g=s*l-r*c,b=d*x-u*_,N=d*p-h*_,R=d*f-m*_,L=u*p-h*x,U=u*f-m*x,G=h*f-m*p,I=v*G-E*U+y*L+w*R-A*N+g*b;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const H=1/I;return t[0]=(o*G-c*U+l*L)*H,t[1]=(s*U-n*G-r*L)*H,t[2]=(x*g-p*A+f*w)*H,t[3]=(h*A-u*g-m*w)*H,t[4]=(c*R-a*G-l*N)*H,t[5]=(e*G-s*R+r*N)*H,t[6]=(p*y-_*g-f*E)*H,t[7]=(d*g-h*y+m*E)*H,t[8]=(a*U-o*R+l*b)*H,t[9]=(n*R-e*U-r*b)*H,t[10]=(_*A-x*y+f*v)*H,t[11]=(u*y-d*A-m*v)*H,t[12]=(o*N-a*L-c*b)*H,t[13]=(e*L-n*N+s*b)*H,t[14]=(x*E-_*w-p*v)*H,t[15]=(d*w-u*E+h*v)*H,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,c=t.z,l=r*a,d=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,d*o+n,d*c-s*a,0,l*c-s*o,d*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,a=e._y,o=e._z,c=e._w,l=r+r,d=a+a,u=o+o,h=r*l,m=r*d,_=r*u,x=a*d,p=a*u,f=o*u,v=c*l,E=c*d,y=c*u,w=n.x,A=n.y,g=n.z;return s[0]=(1-(x+f))*w,s[1]=(m+y)*w,s[2]=(_-E)*w,s[3]=0,s[4]=(m-y)*A,s[5]=(1-(h+f))*A,s[6]=(p+v)*A,s[7]=0,s[8]=(_+E)*g,s[9]=(p-v)*g,s[10]=(1-(h+x))*g,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];const r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let a=pi.set(s[0],s[1],s[2]).length();const o=pi.set(s[4],s[5],s[6]).length(),c=pi.set(s[8],s[9],s[10]).length();r<0&&(a=-a),un.copy(this);const l=1/a,d=1/o,u=1/c;return un.elements[0]*=l,un.elements[1]*=l,un.elements[2]*=l,un.elements[4]*=d,un.elements[5]*=d,un.elements[6]*=d,un.elements[8]*=u,un.elements[9]*=u,un.elements[10]*=u,e.setFromRotationMatrix(un),n.x=a,n.y=o,n.z=c,this}makePerspective(t,e,n,s,r,a,o=gn,c=!1){const l=this.elements,d=2*r/(e-t),u=2*r/(n-s),h=(e+t)/(e-t),m=(n+s)/(n-s);let _,x;if(c)_=r/(a-r),x=a*r/(a-r);else if(o===gn)_=-(a+r)/(a-r),x=-2*a*r/(a-r);else if(o===cs)_=-a/(a-r),x=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=d,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=u,l[9]=m,l[13]=0,l[2]=0,l[6]=0,l[10]=_,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=gn,c=!1){const l=this.elements,d=2/(e-t),u=2/(n-s),h=-(e+t)/(e-t),m=-(n+s)/(n-s);let _,x;if(c)_=1/(a-r),x=a/(a-r);else if(o===gn)_=-2/(a-r),x=-(a+r)/(a-r);else if(o===cs)_=-1/(a-r),x=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=d,l[4]=0,l[8]=0,l[12]=h,l[1]=0,l[5]=u,l[9]=0,l[13]=m,l[2]=0,l[6]=0,l[10]=_,l[14]=x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}};ur.prototype.isMatrix4=!0;let Qt=ur;const pi=new C,un=new Qt,Sh=new C(0,0,0),yh=new C(1,1,1),Gn=new C,gs=new C,Ye=new C,Io=new Qt,Do=new xn;class cn{constructor(t=0,e=0,n=0,s=cn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],d=s[9],u=s[2],h=s[6],m=s[10];switch(e){case"XYZ":this._y=Math.asin($t(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,m),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-$t(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin($t(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-u,m),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-$t(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(h,m),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin($t(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-d,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-$t(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-d,m),this._y=0);break;default:Dt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Io.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Io,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Do.setFromEuler(this),this.setFromQuaternion(Do,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}cn.DEFAULT_ORDER="XYZ";class jl{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let bh=0;const No=new C,mi=new xn,Rn=new Qt,_s=new C,Wi=new C,Eh=new C,wh=new xn,Uo=new C(1,0,0),Fo=new C(0,1,0),Oo=new C(0,0,1),Bo={type:"added"},Th={type:"removed"},gi={type:"childadded",child:null},Pr={type:"childremoved",child:null};class ge extends hi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:bh++}),this.uuid=ui(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ge.DEFAULT_UP.clone();const t=new C,e=new cn,n=new xn,s=new C(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Qt},normalMatrix:{value:new Bt}}),this.matrix=new Qt,this.matrixWorld=new Qt,this.matrixAutoUpdate=ge.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ge.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new jl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return mi.setFromAxisAngle(t,e),this.quaternion.multiply(mi),this}rotateOnWorldAxis(t,e){return mi.setFromAxisAngle(t,e),this.quaternion.premultiply(mi),this}rotateX(t){return this.rotateOnAxis(Uo,t)}rotateY(t){return this.rotateOnAxis(Fo,t)}rotateZ(t){return this.rotateOnAxis(Oo,t)}translateOnAxis(t,e){return No.copy(t).applyQuaternion(this.quaternion),this.position.add(No.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Uo,t)}translateY(t){return this.translateOnAxis(Fo,t)}translateZ(t){return this.translateOnAxis(Oo,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Rn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?_s.copy(t):_s.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Wi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Rn.lookAt(Wi,_s,this.up):Rn.lookAt(_s,Wi,this.up),this.quaternion.setFromRotationMatrix(Rn),s&&(Rn.extractRotation(s.matrixWorld),mi.setFromRotationMatrix(Rn),this.quaternion.premultiply(mi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(jt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Bo),gi.child=t,this.dispatchEvent(gi),gi.child=null):jt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Th),Pr.child=t,this.dispatchEvent(Pr),Pr.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Rn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Rn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Rn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Bo),gi.child=t,this.dispatchEvent(gi),gi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Wi,t,Eh),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Wi,wh,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){const s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,d=c.length;l<d;l++){const u=c[l];r(t.shapes,u)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(t.materials,this.material[c]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(r(t.animations,c))}}if(e){const o=a(t.geometries),c=a(t.materials),l=a(t.textures),d=a(t.images),u=a(t.shapes),h=a(t.skeletons),m=a(t.animations),_=a(t.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),d.length>0&&(n.images=d),u.length>0&&(n.shapes=u),h.length>0&&(n.skeletons=h),m.length>0&&(n.animations=m),_.length>0&&(n.nodes=_)}return n.object=s,n;function a(o){const c=[];for(const l in o){const d=o[l];delete d.metadata,c.push(d)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}ge.DEFAULT_UP=new C(0,1,0);ge.DEFAULT_MATRIX_AUTO_UPDATE=!0;ge.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class re extends ge{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Ah={type:"move"};class Lr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new re,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new re,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new C,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new C),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new re,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new C,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new C,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){a=!0;for(const x of t.hand.values()){const p=e.getJointPose(x,n),f=this._getHandJoint(l,x);p!==null&&(f.matrix.fromArray(p.transform.matrix),f.matrix.decompose(f.position,f.quaternion,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=p.radius),f.visible=p!==null}const d=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],h=d.position.distanceTo(u.position),m=.02,_=.005;l.inputState.pinching&&h>m+_?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&h<=m-_&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.quaternion,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Ah)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new re;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const tc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Hn={h:0,s:0,l:0},xs={h:0,s:0,l:0};function Ir(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Nt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=He){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Zt.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=Zt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Zt.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=Zt.workingColorSpace){if(t=fh(t,1),e=$t(e,0,1),n=$t(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=Ir(a,r,t+1/3),this.g=Ir(a,r,t),this.b=Ir(a,r,t-1/3)}return Zt.colorSpaceToWorking(this,s),this}setStyle(t,e=He){function n(r){r!==void 0&&parseFloat(r)<1&&Dt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,e);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Dt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);Dt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=He){const n=tc[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Dt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Un(t.r),this.g=Un(t.g),this.b=Un(t.b),this}copyLinearToSRGB(t){return this.r=Ui(t.r),this.g=Ui(t.g),this.b=Ui(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=He){return Zt.workingToColorSpace(Fe.copy(this),t),Math.round($t(Fe.r*255,0,255))*65536+Math.round($t(Fe.g*255,0,255))*256+Math.round($t(Fe.b*255,0,255))}getHexString(t=He){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Zt.workingColorSpace){Zt.workingToColorSpace(Fe.copy(this),e);const n=Fe.r,s=Fe.g,r=Fe.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let c,l;const d=(o+a)/2;if(o===a)c=0,l=0;else{const u=a-o;switch(l=d<=.5?u/(a+o):u/(2-a-o),a){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=d,t}getRGB(t,e=Zt.workingColorSpace){return Zt.workingToColorSpace(Fe.copy(this),e),t.r=Fe.r,t.g=Fe.g,t.b=Fe.b,t}getStyle(t=He){Zt.workingToColorSpace(Fe.copy(this),t);const e=Fe.r,n=Fe.g,s=Fe.b;return t!==He?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Hn),this.setHSL(Hn.h+t,Hn.s+e,Hn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Hn),t.getHSL(xs);const n=wr(Hn.h,xs.h,e),s=wr(Hn.s,xs.s,e),r=wr(Hn.l,xs.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Fe=new Nt;Nt.NAMES=tc;class ja{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new Nt(t),this.density=e}clone(){return new ja(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Rh extends ge{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new cn,this.environmentIntensity=1,this.environmentRotation=new cn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),this.background=t.background!==null?t.background.clone():null,this.environment=t.environment!==null?t.environment.clone():null,this.fog=t.fog!==null?t.fog.clone():null,this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),this.overrideMaterial=t.overrideMaterial!==null?t.overrideMaterial.clone():null,this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}}const dn=new C,Cn=new C,Dr=new C,Pn=new C,_i=new C,xi=new C,zo=new C,Nr=new C,Ur=new C,Fr=new C,Or=new pe,Br=new pe,zr=new pe;class ln{constructor(t=new C,e=new C,n=new C){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),dn.subVectors(t,e),s.cross(dn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){dn.subVectors(s,e),Cn.subVectors(n,e),Dr.subVectors(t,e);const a=dn.dot(dn),o=dn.dot(Cn),c=dn.dot(Dr),l=Cn.dot(Cn),d=Cn.dot(Dr),u=a*l-o*o;if(u===0)return r.set(0,0,0),null;const h=1/u,m=(l*c-o*d)*h,_=(a*d-o*c)*h;return r.set(1-m-_,_,m)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Pn)===null?!1:Pn.x>=0&&Pn.y>=0&&Pn.x+Pn.y<=1}static getInterpolation(t,e,n,s,r,a,o,c){return this.getBarycoord(t,e,n,s,Pn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Pn.x),c.addScaledVector(a,Pn.y),c.addScaledVector(o,Pn.z),c)}static getInterpolatedAttribute(t,e,n,s,r,a){return Or.setScalar(0),Br.setScalar(0),zr.setScalar(0),Or.fromBufferAttribute(t,e),Br.fromBufferAttribute(t,n),zr.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(Or,r.x),a.addScaledVector(Br,r.y),a.addScaledVector(zr,r.z),a}static isFrontFacing(t,e,n,s){return dn.subVectors(n,e),Cn.subVectors(t,e),dn.cross(Cn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return dn.subVectors(this.c,this.b),Cn.subVectors(this.a,this.b),dn.cross(Cn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return ln.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return ln.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return ln.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return ln.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return ln.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let a,o;_i.subVectors(s,n),xi.subVectors(r,n),Nr.subVectors(t,n);const c=_i.dot(Nr),l=xi.dot(Nr);if(c<=0&&l<=0)return e.copy(n);Ur.subVectors(t,s);const d=_i.dot(Ur),u=xi.dot(Ur);if(d>=0&&u<=d)return e.copy(s);const h=c*u-d*l;if(h<=0&&c>=0&&d<=0&&c-d>0)return a=c/(c-d),e.copy(n).addScaledVector(_i,a);Fr.subVectors(t,r);const m=_i.dot(Fr),_=xi.dot(Fr);if(_>=0&&m<=_)return e.copy(r);const x=m*l-c*_;if(x<=0&&l>=0&&_<=0)return o=l/(l-_),e.copy(n).addScaledVector(xi,o);const p=d*_-m*u;if(p<=0&&u-d>=0&&m-_>=0)return zo.subVectors(r,s),o=(u-d)/(u-d+(m-_)),e.copy(s).addScaledVector(zo,o);const f=1/(p+x+h);return a=x*f,o=h*f,e.copy(n).addScaledVector(_i,a).addScaledVector(xi,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class di{constructor(t=new C(1/0,1/0,1/0),e=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(fn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(fn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=fn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0&&t.isBatchedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,fn):fn.fromBufferAttribute(r,a),fn.applyMatrix4(t.matrixWorld),this.expandByPoint(fn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),vs.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),vs.copy(n.boundingBox)),vs.applyMatrix4(t.matrixWorld),this.union(vs)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,fn),fn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Xi),Ms.subVectors(this.max,Xi),vi.subVectors(t.a,Xi),Mi.subVectors(t.b,Xi),Si.subVectors(t.c,Xi),Vn.subVectors(Mi,vi),Wn.subVectors(Si,Mi),ii.subVectors(vi,Si);let e=[0,-Vn.z,Vn.y,0,-Wn.z,Wn.y,0,-ii.z,ii.y,Vn.z,0,-Vn.x,Wn.z,0,-Wn.x,ii.z,0,-ii.x,-Vn.y,Vn.x,0,-Wn.y,Wn.x,0,-ii.y,ii.x,0];return!kr(e,vi,Mi,Si,Ms)||(e=[1,0,0,0,1,0,0,0,1],!kr(e,vi,Mi,Si,Ms))?!1:(Ss.crossVectors(Vn,Wn),e=[Ss.x,Ss.y,Ss.z],kr(e,vi,Mi,Si,Ms))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,fn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(fn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Ln[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ln[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ln[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ln[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ln[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ln[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ln[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ln[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ln),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Ln=[new C,new C,new C,new C,new C,new C,new C,new C],fn=new C,vs=new di,vi=new C,Mi=new C,Si=new C,Vn=new C,Wn=new C,ii=new C,Xi=new C,Ms=new C,Ss=new C,si=new C;function kr(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){si.fromArray(i,r);const o=s.x*Math.abs(si.x)+s.y*Math.abs(si.y)+s.z*Math.abs(si.z),c=t.dot(si),l=e.dot(si),d=n.dot(si);if(Math.max(-Math.max(c,l,d),Math.min(c,l,d))>o)return!1}return!0}const ve=new C,ys=new Ut;let Ch=0;class qe extends hi{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Ch++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Kl,this.updateRanges=[],this.gpuType=mn,this.version=0,this._normalizationScale=t!==void 0?dr(t):void 0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this._normalizationScale=t._normalizationScale,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)ys.fromBufferAttribute(this,e),ys.applyMatrix3(t),this.setXY(e,ys.x,ys.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.applyMatrix3(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.applyMatrix4(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.applyNormalMatrix(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.transformDirection(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=this._denormalize(n)),n}setComponent(t,e,n){return this.normalized&&(n=this._normalize(n)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=this._denormalize(e)),e}setX(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=this._denormalize(e)),e}setY(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=this._denormalize(e)),e}setZ(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=this._denormalize(e)),e}setW(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n),s=this._normalize(s)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n),s=this._normalize(s),r=this._normalize(r)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(t){const e=this._normalizationScale;return e!==void 0?Math.max(t/e,-1):$l(t,this.array)}_normalize(t){const e=this._normalizationScale;return e!==void 0?Math.round(t*e):Jl(t,this.array)}}class ec extends qe{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class nc extends qe{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class oe extends qe{constructor(t,e,n){super(new Float32Array(t),e,n)}}const Ph=new di,qi=new C,Gr=new C;class Qn{constructor(t=new C,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Ph.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;qi.subVectors(t,this.center);const e=qi.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(qi,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Gr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(qi.copy(t.center).add(Gr)),this.expandByPoint(qi.copy(t.center).sub(Gr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let Lh=0;const nn=new Qt,Hr=new ge,yi=new C,Ke=new di,Yi=new di,Ce=new C;class _e extends hi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Lh++}),this.uuid=ui(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(ch(t)?nc:ec)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Bt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return nn.makeRotationFromQuaternion(t),this.applyMatrix4(nn),this}rotateX(t){return nn.makeRotationX(t),this.applyMatrix4(nn),this}rotateY(t){return nn.makeRotationY(t),this.applyMatrix4(nn),this}rotateZ(t){return nn.makeRotationZ(t),this.applyMatrix4(nn),this}translate(t,e,n){return nn.makeTranslation(t,e,n),this.applyMatrix4(nn),this}scale(t,e,n){return nn.makeScale(t,e,n),this.applyMatrix4(nn),this}lookAt(t){return Hr.lookAt(t),Hr.updateMatrix(),this.applyMatrix4(Hr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(yi).negate(),this.translate(yi.x,yi.y,yi.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new oe(n,3))}else{const n=Math.min(t.length,e.count);for(let s=0;s<n;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Dt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new di);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){jt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];Ke.setFromBufferAttribute(r),this.morphTargetsRelative?(Ce.addVectors(this.boundingBox.min,Ke.min),this.boundingBox.expandByPoint(Ce),Ce.addVectors(this.boundingBox.max,Ke.max),this.boundingBox.expandByPoint(Ce)):(this.boundingBox.expandByPoint(Ke.min),this.boundingBox.expandByPoint(Ke.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&jt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Qn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){jt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new C,1/0);return}if(t){const n=this.boundingSphere.center;if(Ke.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];Yi.setFromBufferAttribute(o),this.morphTargetsRelative?(Ce.addVectors(Ke.min,Yi.min),Ke.expandByPoint(Ce),Ce.addVectors(Ke.max,Yi.max),Ke.expandByPoint(Ce)):(Ke.expandByPoint(Yi.min),Ke.expandByPoint(Yi.max))}Ke.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)Ce.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Ce));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],c=this.morphTargetsRelative;for(let l=0,d=o.count;l<d;l++)Ce.fromBufferAttribute(o,l),c&&(yi.fromBufferAttribute(t,l),Ce.add(yi)),s=Math.max(s,n.distanceToSquared(Ce))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&jt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){jt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new qe(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const o=[],c=[],l=new Uint8Array(n.count);for(let N=0;N<n.count;N++)o[N]=new C,c[N]=new C;const d=new C,u=new C,h=new C,m=new Ut,_=new Ut,x=new Ut,p=new C,f=new C;function v(N,R,L){l[N]=l[R]=l[L]=1,d.fromBufferAttribute(n,N),u.fromBufferAttribute(n,R),h.fromBufferAttribute(n,L),m.fromBufferAttribute(r,N),_.fromBufferAttribute(r,R),x.fromBufferAttribute(r,L),u.sub(d),h.sub(d),_.sub(m),x.sub(m);const U=1/(_.x*x.y-x.x*_.y);isFinite(U)&&(p.copy(u).multiplyScalar(x.y).addScaledVector(h,-_.y).multiplyScalar(U),f.copy(h).multiplyScalar(_.x).addScaledVector(u,-x.x).multiplyScalar(U),o[N].add(p),o[R].add(p),o[L].add(p),c[N].add(f),c[R].add(f),c[L].add(f))}let E=this.groups;E.length===0&&(E=[{start:0,count:t.count}]);for(let N=0,R=E.length;N<R;++N){const L=E[N],U=L.start,G=L.count;for(let I=U,H=U+G;I<H;I+=3)v(t.getX(I+0),t.getX(I+1),t.getX(I+2))}const y=new C,w=new C,A=new C,g=new C;function b(N){A.fromBufferAttribute(s,N),g.copy(A);const R=o[N];y.copy(R),y.sub(A.multiplyScalar(A.dot(R))).normalize(),w.crossVectors(g,R);const U=w.dot(c[N])<0?-1:1;a.setXYZW(N,y.x,y.y,y.z,U)}for(let N=0,R=n.count;N<R;++N)l[N]&&b(N);this._transformed=!0}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new qe(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let h=0,m=n.count;h<m;h++)n.setXYZ(h,0,0,0);const s=new C,r=new C,a=new C,o=new C,c=new C,l=new C,d=new C,u=new C;if(t)for(let h=0,m=t.count;h<m;h+=3){const _=t.getX(h+0),x=t.getX(h+1),p=t.getX(h+2);s.fromBufferAttribute(e,_),r.fromBufferAttribute(e,x),a.fromBufferAttribute(e,p),d.subVectors(a,r),u.subVectors(s,r),d.cross(u),o.fromBufferAttribute(n,_),c.fromBufferAttribute(n,x),l.fromBufferAttribute(n,p),o.add(d),c.add(d),l.add(d),n.setXYZ(_,o.x,o.y,o.z),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(p,l.x,l.y,l.z)}else for(let h=0,m=e.count;h<m;h+=3)s.fromBufferAttribute(e,h+0),r.fromBufferAttribute(e,h+1),a.fromBufferAttribute(e,h+2),d.subVectors(a,r),u.subVectors(s,r),d.cross(u),n.setXYZ(h+0,d.x,d.y,d.z),n.setXYZ(h+1,d.x,d.y,d.z),n.setXYZ(h+2,d.x,d.y,d.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ce.fromBufferAttribute(t,e),Ce.normalize(),t.setXYZ(e,Ce.x,Ce.y,Ce.z)}toNonIndexed(){function t(o,c){const l=o.array,d=o.itemSize,u=o.normalized,h=new l.constructor(c.length*d);let m=0,_=0;for(let x=0,p=c.length;x<p;x++){o.isInterleavedBufferAttribute?m=c[x]*o.data.stride+o.offset:m=c[x]*d;for(let f=0;f<d;f++)h[_++]=l[m++]}return new qe(h,d,u)}if(this.index===null)return Dt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new _e,n=this.index.array,s=this.attributes;for(const o in s){const c=s[o],l=t(c,n);e.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let d=0,u=l.length;d<u;d++){const h=l[d],m=t(h,n);c.push(m)}e.morphAttributes[o]=c}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],d=[];for(let u=0,h=l.length;u<h;u++){const m=l[u];d.push(m.toJSON(t.data))}d.length>0&&(s[c]=d,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const s=t.attributes;for(const l in s){const d=s[l];this.setAttribute(l,d.clone(e))}const r=t.morphAttributes;for(const l in r){const d=[],u=r[l];for(let h=0,m=u.length;h<m;h++)d.push(u[h].clone(e));this.morphAttributes[l]=d}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let l=0,d=a.length;l<d;l++){const u=a[l];this.addGroup(u.start,u.count,u.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ih{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Kl,this.updateRanges=[],this.version=0,this.uuid=ui()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={});const e=ko(this.array);t.arrayBuffers[e]===void 0&&(t.arrayBuffers[e]=this.array.slice(0).buffer);const n=new this.array.constructor(t.arrayBuffers[e]),s=new this.constructor(n,this.stride);return s.setUsage(this.usage),s}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){t.arrayBuffers===void 0&&(t.arrayBuffers={});const e=ko(this.array);t.arrayBuffers[e]===void 0&&(t.arrayBuffers[e]=Array.from(new Uint32Array(this.array.slice(0).buffer)));const n={uuid:this.uuid,buffer:e,type:this.array.constructor.name,stride:this.stride};return n.usage=this.usage,n}}function ko(i){return i.buffer._uuid===void 0&&(i.buffer._uuid=ui()),i.byteOffset===0&&i.byteLength===i.buffer.byteLength?i.buffer._uuid:i.buffer._uuid+":"+i.byteOffset+":"+i.byteLength}const ke=new C;class or{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s,this._normalizationScale=t!==void 0?dr(t.array):void 0}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)ke.fromBufferAttribute(this,e),ke.applyMatrix4(t),this.setXYZ(e,ke.x,ke.y,ke.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ke.fromBufferAttribute(this,e),ke.applyNormalMatrix(t),this.setXYZ(e,ke.x,ke.y,ke.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ke.fromBufferAttribute(this,e),ke.transformDirection(t),this.setXYZ(e,ke.x,ke.y,ke.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=this._denormalize(n)),n}setComponent(t,e,n){return this.normalized&&(n=this._normalize(n)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=this._normalize(e)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=this._normalize(e)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=this._normalize(e)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=this._normalize(e)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=this._denormalize(e)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=this._denormalize(e)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=this._denormalize(e)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=this._denormalize(e)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=this._normalize(e),n=this._normalize(n)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=this._normalize(e),n=this._normalize(n),s=this._normalize(s)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=this._normalize(e),n=this._normalize(n),s=this._normalize(s),r=this._normalize(r)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){ar("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new qe(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new or(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){ar("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}_denormalize(t){const e=this._normalizationScale;return e!==void 0?Math.max(t/e,-1):$l(t,this.data.array)}_normalize(t){const e=this._normalizationScale;return e!==void 0?Math.round(t*e):Jl(t,this.data.array)}}const Vr=new C,Dh=new C,Nh=new Bt;class qn{constructor(t=new C(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=Vr.subVectors(n,e).cross(Dh.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){const s=t.delta(Vr),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const a=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(s,a)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Nh.getNormalMatrix(t),s=this.coplanarPoint(Vr).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}}let Uh=0;class Bn extends hi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Uh++}),this.uuid=ui(),this.name="",this.type="Material",this.blending=ss,this.side=oi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Pl,this.blendDst=Ll,this.blendEquation=Ii,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Nt(0,0,0),this.blendAlpha=0,this.depthFunc=rs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ih,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=br,this.stencilZFail=br,this.stencilZPass=br,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){Dt(`Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Dt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(t).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(e){const r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Nt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.diffuseRoughness!==void 0&&(this.diffuseRoughness=t.diffuseRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessMinimum),t.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=t.iridescenceThicknessMaximum),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=t.iridescenceThicknessRange[1]),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new qn().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Ut().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ut().fromArray(t.clearcoatNormalScale)),t.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=e[t.diffuseRoughnessMap]||null),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class _n extends Bn{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Nt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let bi;const Ki=new C,Ei=new C,wi=new C,Ti=new Ut,Zi=new Ut,ic=new Qt,bs=new C,$i=new C,Es=new C,Go=new Ut,Wr=new Ut,Ho=new Ut;class rn extends ge{constructor(t=new _n){if(super(),this.isSprite=!0,this.type="Sprite",bi===void 0){bi=new _e;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Ih(e,5);bi.setIndex([0,1,2,0,2,3]),bi.setAttribute("position",new or(n,3,0,!1)),bi.setAttribute("uv",new or(n,2,3,!1))}this.geometry=bi,this.material=t,this.center=new Ut(.5,.5),this.count=1}intersectsFrustum(t){return t.intersectsSprite(this)}raycast(t,e){t.camera===null&&jt('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Ei.setFromMatrixScale(this.matrixWorld),ic.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),wi.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ei.multiplyScalar(-wi.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const a=this.center;ws(bs.set(-.5,-.5,0),wi,a,Ei,s,r),ws($i.set(.5,-.5,0),wi,a,Ei,s,r),ws(Es.set(.5,.5,0),wi,a,Ei,s,r),Go.set(0,0),Wr.set(1,0),Ho.set(1,1);let o=t.ray.intersectTriangle(bs,$i,Es,!1,Ki);if(o===null&&(ws($i.set(-.5,.5,0),wi,a,Ei,s,r),Wr.set(0,1),o=t.ray.intersectTriangle(bs,Es,$i,!1,Ki),o===null))return;const c=t.ray.origin.distanceTo(Ki);c<t.near||c>t.far||e.push({distance:c,point:Ki.clone(),uv:ln.getInterpolation(Ki,bs,$i,Es,Go,Wr,Ho,new Ut),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}toJSON(t){const e=super.toJSON(t);return e.object.center=this.center.toArray(),e}}function ws(i,t,e,n,s,r){Ti.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(Zi.x=r*Ti.x-s*Ti.y,Zi.y=s*Ti.x+r*Ti.y):Zi.copy(Ti),i.copy(t),i.x+=Zi.x,i.y+=Zi.y,i.applyMatrix4(ic)}const In=new C,Xr=new C,Ts=new C,As=new C;class fr{constructor(t=new C,e=new C(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,In)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=In.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(In.copy(this.origin).addScaledVector(this.direction,e),In.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Xr.copy(t).add(e).multiplyScalar(.5),Ts.copy(e).sub(t).normalize(),As.copy(this.origin).sub(Xr);const r=t.distanceTo(e)*.5,a=-this.direction.dot(Ts),o=As.dot(this.direction),c=-As.dot(Ts),l=As.lengthSq(),d=Math.abs(1-a*a);let u,h,m,_;if(d>0)if(u=a*c-o,h=a*o-c,_=r*d,u>=0)if(h>=-_)if(h<=_){const x=1/d;u*=x,h*=x,m=u*(u+a*h+2*o)+h*(a*u+h+2*c)+l}else h=r,u=Math.max(0,-(a*h+o)),m=-u*u+h*(h+2*c)+l;else h=-r,u=Math.max(0,-(a*h+o)),m=-u*u+h*(h+2*c)+l;else h<=-_?(u=Math.max(0,-(-a*r+o)),h=u>0?-r:Math.min(Math.max(-r,-c),r),m=-u*u+h*(h+2*c)+l):h<=_?(u=0,h=Math.min(Math.max(-r,-c),r),m=h*(h+2*c)+l):(u=Math.max(0,-(a*r+o)),h=u>0?r:Math.min(Math.max(-r,-c),r),m=-u*u+h*(h+2*c)+l);else h=a>0?-r:r,u=Math.max(0,-(a*h+o)),m=-u*u+h*(h+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Xr).addScaledVector(Ts,h),m}intersectSphere(t,e){if(t.radius<0)return null;In.subVectors(t.center,this.origin);const n=In.dot(this.direction),s=In.dot(In)-n*n,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,c;const l=1/this.direction.x,d=1/this.direction.y,u=1/this.direction.z,h=this.origin;return l>=0?(n=(t.min.x-h.x)*l,s=(t.max.x-h.x)*l):(n=(t.max.x-h.x)*l,s=(t.min.x-h.x)*l),d>=0?(r=(t.min.y-h.y)*d,a=(t.max.y-h.y)*d):(r=(t.max.y-h.y)*d,a=(t.min.y-h.y)*d),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(t.min.z-h.z)*u,c=(t.max.z-h.z)*u):(o=(t.max.z-h.z)*u,c=(t.min.z-h.z)*u),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,In)!==null}intersectTriangle(t,e,n,s,r){const a=this.origin,o=this.direction,c=o.x,l=o.y,d=o.z,u=t.x-a.x,h=t.y-a.y,m=t.z-a.z,_=e.x-a.x,x=e.y-a.y,p=e.z-a.z,f=n.x-a.x,v=n.y-a.y,E=n.z-a.z,y=Math.abs(c),w=Math.abs(l),A=Math.abs(d);let g,b,N,R,L,U,G,I,H,Z,z,et;if(y>=w&&y>=A?(N=c,U=u,H=_,et=f,c>=0?(g=l,b=d,R=h,L=m,G=x,I=p,Z=v,z=E):(g=d,b=l,R=m,L=h,G=p,I=x,Z=E,z=v)):w>=A?(N=l,U=h,H=x,et=v,l>=0?(g=d,b=c,R=m,L=u,G=p,I=_,Z=E,z=f):(g=c,b=d,R=u,L=m,G=_,I=p,Z=f,z=E)):(N=d,U=m,H=p,et=E,d>=0?(g=c,b=l,R=u,L=h,G=_,I=x,Z=f,z=v):(g=l,b=c,R=h,L=u,G=x,I=_,Z=v,z=f)),N===0)return null;const V=g/N,j=b/N,tt=1/N,Mt=R-V*U,Lt=L-j*U,Y=G-V*H,ut=I-j*H,xt=Z-V*et,Tt=z-j*et,nt=xt*ut-Tt*Y,St=Mt*Tt-Lt*xt,Vt=Y*Lt-ut*Mt;if(s){if(nt<0||St<0||Vt<0)return null}else if((nt<0||St<0||Vt<0)&&(nt>0||St>0||Vt>0))return null;const wt=nt+St+Vt;if(wt===0)return null;const Yt=tt*(nt*U+St*H+Vt*et);return(wt>0?Yt<0:Yt>0)?null:this.at(Yt/wt,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Oe extends Bn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Nt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new cn,this.combine=Va,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Vo=new Qt,ri=new fr,Rs=new Qn,Wo=new C,Cs=new C,Ps=new C,Ls=new C,qr=new C,Is=new C,Xo=new C,Ds=new C;class at extends ge{constructor(t=new _e,e=new Oe){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){Is.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const d=o[c],u=r[c];d!==0&&(qr.fromBufferAttribute(u,t),a?Is.addScaledVector(qr,d):Is.addScaledVector(qr.sub(e),d))}e.add(Is)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Rs.copy(n.boundingSphere),Rs.applyMatrix4(r),ri.copy(t.ray).recast(t.near),!(Rs.containsPoint(ri.origin)===!1&&(ri.intersectSphere(Rs,Wo)===null||ri.origin.distanceToSquared(Wo)>(t.far-t.near)**2))&&(Vo.copy(r).invert(),ri.copy(t.ray).applyMatrix4(Vo),!(n.boundingBox!==null&&ri.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ri)))}_computeIntersections(t,e,n){let s;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,d=r.attributes.uv1,u=r.attributes.normal,h=r.groups,m=r.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,x=h.length;_<x;_++){const p=h[_],f=a[p.materialIndex],v=Math.max(p.start,m.start),E=Math.min(o.count,Math.min(p.start+p.count,m.start+m.count));for(let y=v,w=E;y<w;y+=3){const A=o.getX(y),g=o.getX(y+1),b=o.getX(y+2);s=Ns(this,f,t,n,l,d,u,A,g,b),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{const _=Math.max(0,m.start),x=Math.min(o.count,m.start+m.count);for(let p=_,f=x;p<f;p+=3){const v=o.getX(p),E=o.getX(p+1),y=o.getX(p+2);s=Ns(this,a,t,n,l,d,u,v,E,y),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let _=0,x=h.length;_<x;_++){const p=h[_],f=a[p.materialIndex],v=Math.max(p.start,m.start),E=Math.min(c.count,Math.min(p.start+p.count,m.start+m.count));for(let y=v,w=E;y<w;y+=3){const A=y,g=y+1,b=y+2;s=Ns(this,f,t,n,l,d,u,A,g,b),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{const _=Math.max(0,m.start),x=Math.min(c.count,m.start+m.count);for(let p=_,f=x;p<f;p+=3){const v=p,E=p+1,y=p+2;s=Ns(this,a,t,n,l,d,u,v,E,y),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}}}function Fh(i,t,e,n,s,r,a,o){let c;if(t.side===Ve?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,t.side===oi,o),c===null)return null;Ds.copy(o),Ds.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(Ds);return l<e.near||l>e.far?null:{distance:l,point:Ds.clone(),object:i}}function Ns(i,t,e,n,s,r,a,o,c,l){i.getVertexPosition(o,Cs),i.getVertexPosition(c,Ps),i.getVertexPosition(l,Ls);const d=Fh(i,t,e,n,Cs,Ps,Ls,Xo);if(d){const u=new C;ln.getBarycoord(Xo,Cs,Ps,Ls,u),s&&(d.uv=ln.getInterpolatedAttribute(s,o,c,l,u,new Ut)),r&&(d.uv1=ln.getInterpolatedAttribute(r,o,c,l,u,new Ut)),a&&(d.normal=ln.getInterpolatedAttribute(a,o,c,l,u,new C),d.normal.dot(n.direction)>0&&d.normal.multiplyScalar(-1));const h={a:o,b:c,c:l,normal:new C,materialIndex:0};ln.getNormal(Cs,Ps,Ls,h.normal),d.face=h,d.barycoord=u}return d}class sc extends Be{constructor(t=null,e=1,n=1,s,r,a,o,c,l=Ie,d=Ie,u,h){super(null,a,o,c,l,d,s,r,u,h),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class qo extends qe{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Ai=new Qt,Yo=new Qt,Us=[],Ko=new di,Oh=new Qt,Ji=new at,Qi=new Qn;class $n extends at{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new qo(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Oh)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new di),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ai),Ko.copy(t.boundingBox).applyMatrix4(Ai),this.boundingBox.union(Ko)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Qn),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ai),Qi.copy(t.boundingSphere).applyMatrix4(Ai),this.boundingSphere.union(Qi)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),this.morphTexture=t.morphTexture!==null?t.morphTexture.clone():null,this.instanceColor=t.instanceColor!==null?t.instanceColor.clone():null,this.count=t.count,this.boundingBox=t.boundingBox!==null?t.boundingBox.clone():null,this.boundingSphere=t.boundingSphere!==null?t.boundingSphere.clone():null,this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=t*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(Ji.geometry=this.geometry,Ji.material=this.material,Ji.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Qi.copy(this.boundingSphere),Qi.applyMatrix4(n),t.ray.intersectsSphere(Qi)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ai),Yo.multiplyMatrices(n,Ai),Ji.matrixWorld=Yo,Ji.raycast(t,Us);for(let a=0,o=Us.length;a<o;a++){const c=Us[a];c.instanceId=r,c.object=this,e.push(c)}Us.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new qo(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new sc(new Float32Array(s*this.count),s,this.count,Ka,mn));const r=this.morphTexture.source.data.data;let a=0;for(let l=0;l<n.length;l++)a+=n[l];const o=this.geometry.morphTargetsRelative?1:1-a,c=s*t;return r[c]=o,r.set(n,c+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const ai=new Qn,Bh=new Ut(.5,.5),Fs=new C;class hs{constructor(t=new qn,e=new qn,n=new qn,s=new qn,r=new qn,a=new qn){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=gn,n=!1){const s=this.planes,r=t.elements,a=r[0],o=r[1],c=r[2],l=r[3],d=r[4],u=r[5],h=r[6],m=r[7],_=r[8],x=r[9],p=r[10],f=r[11],v=r[12],E=r[13],y=r[14],w=r[15];if(s[0].setComponents(l-a,m-d,f-_,w-v).normalize(),s[1].setComponents(l+a,m+d,f+_,w+v).normalize(),s[2].setComponents(l+o,m+u,f+x,w+E).normalize(),s[3].setComponents(l-o,m-u,f-x,w-E).normalize(),n)s[4].setComponents(c,h,p,y).normalize(),s[5].setComponents(l-c,m-h,f-p,w-y).normalize();else if(s[4].setComponents(l-c,m-h,f-p,w-y).normalize(),e===gn)s[5].setComponents(l+c,m+h,f+p,w+y).normalize();else if(e===cs)s[5].setComponents(c,h,p,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ai.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ai.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ai)}intersectsSprite(t){ai.center.set(0,0,0);const e=Bh.distanceTo(t.center);return ai.radius=.7071067811865476+e,ai.applyMatrix4(t.matrixWorld),this.intersectsSphere(ai)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(Fs.x=s.normal.x>0?t.max.x:t.min.x,Fs.y=s.normal.y>0?t.max.y:t.min.y,Fs.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Fs)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}const Zo=new Qt;class to{constructor(){this.coordinateSystem=gn,this._frustums=[],this._count=0}setFromArrayCamera(t){const e=t.cameras,n=this._frustums;for(let s=0;s<e.length;s++){const r=e[s];Zo.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[s]===void 0&&(n[s]=new hs),n[s].setFromProjectionMatrix(Zo,r.coordinateSystem,r.reversedDepth)}return this._count=e.length,this}getFrustum(t){return this._frustums[t]}intersectsObject(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsObject(t))return!0;return!1}intersectsSprite(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSprite(t))return!0;return!1}intersectsSphere(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSphere(t))return!0;return!1}intersectsBox(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsBox(t))return!0;return!1}containsPoint(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].containsPoint(t))return!0;return!1}copy(t){this.coordinateSystem=t.coordinateSystem;const e=this._frustums,n=t._frustums;for(let s=0;s<t._count;s++)e[s]===void 0&&(e[s]=new hs),e[s].copy(n[s]);return this._count=t._count,this}clone(){return new to().copy(this)}}class pr extends Bn{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Nt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const lr=new C,cr=new C,$o=new Qt,ji=new fr,Os=new Qn,Yr=new C,Jo=new C;class eo extends ge{constructor(t=new _e,e=new pr){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)lr.fromBufferAttribute(e,s-1),cr.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=lr.distanceTo(cr);t.setAttribute("lineDistance",new oe(n,1))}else Dt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Os.copy(n.boundingSphere),Os.applyMatrix4(s),Os.radius+=r,t.ray.intersectsSphere(Os)===!1)return;$o.copy(s).invert(),ji.copy(t.ray).applyMatrix4($o);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,d=n.index,h=n.attributes.position;if(d!==null){const m=Math.max(0,a.start),_=Math.min(d.count,a.start+a.count);for(let x=m,p=_-1;x<p;x+=l){const f=d.getX(x),v=d.getX(x+1),E=Bs(this,t,ji,c,f,v,x);E&&e.push(E)}if(this.isLineLoop){const x=d.getX(_-1),p=d.getX(m),f=Bs(this,t,ji,c,x,p,_-1);f&&e.push(f)}}else{const m=Math.max(0,a.start),_=Math.min(h.count,a.start+a.count);for(let x=m,p=_-1;x<p;x+=l){const f=Bs(this,t,ji,c,x,x+1,x);f&&e.push(f)}if(this.isLineLoop){const x=Bs(this,t,ji,c,_-1,m,_-1);x&&e.push(x)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Bs(i,t,e,n,s,r,a){const o=i.geometry.attributes.position;if(lr.fromBufferAttribute(o,s),cr.fromBufferAttribute(o,r),e.distanceSqToSegment(lr,cr,Yr,Jo)>n)return;Yr.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(Yr);if(!(l<t.near||l>t.far))return{distance:l,point:Jo.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}class no extends Bn{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Nt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Qo=new Qt,Ba=new fr,zs=new Qn,ks=new C;class io extends ge{constructor(t=new _e,e=new no){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),zs.copy(n.boundingSphere),zs.applyMatrix4(s),zs.radius+=r,t.ray.intersectsSphere(zs)===!1)return;Qo.copy(s).invert(),Ba.copy(t.ray).applyMatrix4(Qo);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,u=n.attributes.position;if(l!==null){const h=Math.max(0,a.start),m=Math.min(l.count,a.start+a.count);for(let _=h,x=m;_<x;_++){const p=l.getX(_);ks.fromBufferAttribute(u,p),jo(ks,p,c,s,t,e,this)}}else{const h=Math.max(0,a.start),m=Math.min(u.count,a.start+a.count);for(let _=h,x=m;_<x;_++)ks.fromBufferAttribute(u,_),jo(ks,_,c,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function jo(i,t,e,n,s,r,a){const o=Ba.distanceSqToPoint(i);if(o<e){const c=new C;Ba.closestPointToPoint(i,c),c.applyMatrix4(n);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}class rc extends Be{constructor(t=[],e=Oi,n,s,r,a,o,c,l,d){super(t,e,n,s,r,a,o,c,l,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class ac extends Be{constructor(t,e,n,s,r,a,o,c,l){super(t,e,n,s,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class zi extends Be{constructor(t,e,n=wn,s,r,a,o=Ie,c=Ie,l,d=Jn,u=1){if(d!==Jn&&d!==Zn)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:t,height:e,depth:u};super(h,s,r,a,o,c,d,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Qa(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}}class oc extends zi{constructor(t,e=wn,n=Oi,s,r,a=Ie,o=Ie,c,l=Jn){const d={width:t,height:t,depth:1},u=[d,d,d,d,d,d];super(t,t,e,n,s,r,a,o,c,l),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class lc extends Be{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class ae extends _e{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],d=[],u=[];let h=0,m=0;_("z","y","x",-1,-1,n,e,t,a,r,0),_("z","y","x",1,-1,n,e,-t,a,r,1),_("x","z","y",1,1,t,n,e,s,a,2),_("x","z","y",1,-1,t,n,-e,s,a,3),_("x","y","z",1,-1,t,e,n,s,r,4),_("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new oe(l,3)),this.setAttribute("normal",new oe(d,3)),this.setAttribute("uv",new oe(u,2));function _(x,p,f,v,E,y,w,A,g,b,N){const R=y/g,L=w/b,U=y/2,G=w/2,I=A/2,H=g+1,Z=b+1;let z=0,et=0;const V=new C;for(let j=0;j<Z;j++){const tt=j*L-G;for(let Mt=0;Mt<H;Mt++){const Lt=Mt*R-U;V[x]=Lt*v,V[p]=tt*E,V[f]=I,l.push(V.x,V.y,V.z),V[x]=0,V[p]=0,V[f]=A>0?1:-1,d.push(V.x,V.y,V.z),u.push(Mt/g),u.push(1-j/b),z+=1}}for(let j=0;j<b;j++)for(let tt=0;tt<g;tt++){const Mt=h+tt+H*j,Lt=h+tt+H*(j+1),Y=h+(tt+1)+H*(j+1),ut=h+(tt+1)+H*j;c.push(Mt,Lt,ut),c.push(Lt,Y,ut),et+=6}o.addGroup(m,et,N),m+=et,h+=z}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ae(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class Me extends _e{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const d=[],u=[],h=[],m=[];let _=0;const x=[],p=n/2;let f=0;v(),a===!1&&(t>0&&E(!0),e>0&&E(!1)),this.setIndex(d),this.setAttribute("position",new oe(u,3)),this.setAttribute("normal",new oe(h,3)),this.setAttribute("uv",new oe(m,2));function v(){const y=new C,w=new C;let A=0;const g=(e-t)/n;for(let b=0;b<=r;b++){const N=[],R=b/r,L=R*(e-t)+t;for(let U=0;U<=s;U++){const G=U/s,I=G*c+o,H=Math.sin(I),Z=Math.cos(I);w.x=L*H,w.y=-R*n+p,w.z=L*Z,u.push(w.x,w.y,w.z),y.set(H,g,Z).normalize(),h.push(y.x,y.y,y.z),m.push(G,1-R),N.push(_++)}x.push(N)}for(let b=0;b<s;b++)for(let N=0;N<r;N++){const R=x[N][b],L=x[N+1][b],U=x[N+1][b+1],G=x[N][b+1];(t>0||N!==0)&&(d.push(R,L,G),A+=3),(e>0||N!==r-1)&&(d.push(L,U,G),A+=3)}l.addGroup(f,A,0),f+=A}function E(y){const w=_,A=new Ut,g=new C;let b=0;const N=y===!0?t:e,R=y===!0?1:-1;for(let U=1;U<=s;U++)u.push(0,p*R,0),h.push(0,R,0),m.push(.5,.5),_++;const L=_;for(let U=0;U<=s;U++){const I=U/s*c+o,H=Math.cos(I),Z=Math.sin(I);g.x=N*Z,g.y=p*R,g.z=N*H,u.push(g.x,g.y,g.z),h.push(0,R,0),A.x=H*.5+.5,A.y=Z*.5*R+.5,m.push(A.x,A.y),_++}for(let U=0;U<s;U++){const G=w+U,I=L+U;y===!0?d.push(I,I+1,G):d.push(I+1,I,G),b+=3}l.addGroup(f,b,y===!0?1:2),f+=b}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Me(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class us extends Me{constructor(t=1,e=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new us(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class so extends _e{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};const r=[],a=[];o(s),l(n),d(),this.setAttribute("position",new oe(r,3)),this.setAttribute("normal",new oe(r.slice(),3)),this.setAttribute("uv",new oe(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(v){const E=new C,y=new C,w=new C;for(let A=0;A<e.length;A+=3)m(e[A+0],E),m(e[A+1],y),m(e[A+2],w),c(E,y,w,v)}function c(v,E,y,w){const A=w+1,g=[];for(let b=0;b<=A;b++){g[b]=[];const N=v.clone().lerp(y,b/A),R=E.clone().lerp(y,b/A),L=A-b;for(let U=0;U<=L;U++)U===0&&b===A?g[b][U]=N:g[b][U]=N.clone().lerp(R,U/L)}for(let b=0;b<A;b++)for(let N=0;N<2*(A-b)-1;N++){const R=Math.floor(N/2);N%2===0?(h(g[b][R+1]),h(g[b+1][R]),h(g[b][R])):(h(g[b][R+1]),h(g[b+1][R+1]),h(g[b+1][R]))}}function l(v){const E=new C;for(let y=0;y<r.length;y+=3)E.x=r[y+0],E.y=r[y+1],E.z=r[y+2],E.normalize().multiplyScalar(v),r[y+0]=E.x,r[y+1]=E.y,r[y+2]=E.z}function d(){const v=new C;for(let E=0;E<r.length;E+=3){v.x=r[E+0],v.y=r[E+1],v.z=r[E+2];const y=p(v)/2/Math.PI+.5,w=f(v)/Math.PI+.5;a.push(y,1-w)}_(),u()}function u(){for(let v=0;v<a.length;v+=6){const E=a[v+0],y=a[v+2],w=a[v+4],A=Math.max(E,y,w),g=Math.min(E,y,w);A>.9&&g<.1&&(E<.2&&(a[v+0]+=1),y<.2&&(a[v+2]+=1),w<.2&&(a[v+4]+=1))}}function h(v){r.push(v.x,v.y,v.z)}function m(v,E){const y=v*3;E.x=t[y+0],E.y=t[y+1],E.z=t[y+2]}function _(){const v=new C,E=new C,y=new C,w=new C,A=new Ut,g=new Ut,b=new Ut;for(let N=0,R=0;N<r.length;N+=9,R+=6){v.set(r[N+0],r[N+1],r[N+2]),E.set(r[N+3],r[N+4],r[N+5]),y.set(r[N+6],r[N+7],r[N+8]),A.set(a[R+0],a[R+1]),g.set(a[R+2],a[R+3]),b.set(a[R+4],a[R+5]),w.copy(v).add(E).add(y).divideScalar(3);const L=p(w);x(A,R+0,v,L),x(g,R+2,E,L),x(b,R+4,y,L)}}function x(v,E,y,w){w<0&&v.x===1&&(a[E]=v.x-1),y.x===0&&y.z===0&&(a[E]=w/2/Math.PI+.5)}function p(v){return Math.atan2(v.z,-v.x)}function f(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new so(t.vertices,t.indices,t.radius,t.detail)}}class ro extends so{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new ro(t.radius,t.detail)}}class Je extends _e{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,a=e/2,o=Math.floor(n),c=Math.floor(s),l=o+1,d=c+1,u=t/o,h=e/c,m=[],_=[],x=[],p=[];for(let f=0;f<d;f++){const v=f*h-a;for(let E=0;E<l;E++){const y=E*u-r;_.push(y,-v,0),x.push(0,0,1),p.push(E/o),p.push(1-f/c)}}for(let f=0;f<c;f++)for(let v=0;v<o;v++){const E=v+l*f,y=v+l*(f+1),w=v+1+l*(f+1),A=v+1+l*f;m.push(E,y,A),m.push(y,w,A)}this.setIndex(m),this.setAttribute("position",new oe(_,3)),this.setAttribute("normal",new oe(x,3)),this.setAttribute("uv",new oe(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Je(t.width,t.height,t.widthSegments,t.heightSegments)}}class Se extends _e{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(a+o,Math.PI);let l=0;const d=[],u=new C,h=new C,m=[],_=[],x=[],p=[];for(let f=0;f<=n;f++){const v=[],E=f/n,y=a+E*o,w=t*Math.cos(y),A=Math.sqrt(t*t-w*w);let g=0;f===0&&a===0?g=.5/e:f===n&&c===Math.PI&&(g=-.5/e);for(let b=0;b<=e;b++){const N=b/e,R=s+N*r;u.x=-A*Math.cos(R),u.y=w,u.z=A*Math.sin(R),_.push(u.x,u.y,u.z),h.copy(u).normalize(),x.push(h.x,h.y,h.z),p.push(N+g,1-E),v.push(l++)}d.push(v)}for(let f=0;f<n;f++)for(let v=0;v<e;v++){const E=d[f][v+1],y=d[f][v],w=d[f+1][v],A=d[f+1][v+1];(f!==0||a>0)&&m.push(E,y,A),(f!==n-1||c<Math.PI)&&m.push(y,w,A)}this.setIndex(m),this.setAttribute("position",new oe(_,3)),this.setAttribute("normal",new oe(x,3)),this.setAttribute("uv",new oe(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Se(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class ki extends _e{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r,thetaStart:a,thetaLength:o},n=Math.floor(n),s=Math.floor(s);const c=[],l=[],d=[],u=[],h=new C,m=new C,_=new C;for(let x=0;x<=n;x++){const p=a+x/n*o;for(let f=0;f<=s;f++){const v=f/s*r;m.x=(t+e*Math.cos(p))*Math.cos(v),m.y=(t+e*Math.cos(p))*Math.sin(v),m.z=e*Math.sin(p),l.push(m.x,m.y,m.z),h.x=t*Math.cos(v),h.y=t*Math.sin(v),_.subVectors(m,h).normalize(),d.push(_.x,_.y,_.z),u.push(f/s),u.push(x/n)}}for(let x=1;x<=n;x++)for(let p=1;p<=s;p++){const f=(s+1)*x+p-1,v=(s+1)*(x-1)+p-1,E=(s+1)*(x-1)+p,y=(s+1)*x+p;c.push(f,v,y),c.push(v,E,y)}this.setIndex(c),this.setAttribute("position",new oe(l,3)),this.setAttribute("normal",new oe(d,3)),this.setAttribute("uv",new oe(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ki(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}}function Gi(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];if(tl(s))s.isRenderTargetTexture?(Dt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone();else if(Array.isArray(s))if(tl(s[0])){const r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();t[e][n]=r}else t[e][n]=s.slice();else t[e][n]=s}}return t}function Ge(i){const t={};for(let e=0;e<i.length;e++){const n=Gi(i[e]);for(const s in n)t[s]=n[s]}return t}function tl(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function zh(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function cc(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Zt.workingColorSpace}const kh={clone:Gi,merge:Ge};var Gh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Hh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class On extends Bn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Gh,this.fragmentShader=Hh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Gi(t.uniforms),this.uniformsGroups=zh(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(const n in t.uniforms){const s=t.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=e[s.value]||null;break;case"c":this.uniforms[n].value=new Nt().setHex(s.value);break;case"v2":this.uniforms[n].value=new Ut().fromArray(s.value);break;case"v3":this.uniforms[n].value=new C().fromArray(s.value);break;case"v4":this.uniforms[n].value=new pe().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Bt().fromArray(s.value);break;case"m4":this.uniforms[n].value=new Qt().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(const n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}}class Vh extends On{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class It extends Bn{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Nt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Nt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=nr,this.normalScale=new Ut(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new cn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Fn extends Bn{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Nt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Nt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=nr,this.normalScale=new Ut(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new cn,this.combine=Va,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Wh extends Bn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=eh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Xh extends Bn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class ao extends ge{static registerNode(t){this.prototype._lightNode=t}constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Nt(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}}class qh extends ao{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ge.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Nt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){const e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}}const Kr=new Qt,el=new C,nl=new C;class hc{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ut(512,512),this.mapType=$e,this.map=null,this.mapPass=null,this.matrix=new Qt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new hs,this._frameExtents=new Ut(1,1),this._viewportCount=1,this._viewports=[new pe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera;el.setFromMatrixPosition(t.matrixWorld),e.position.copy(el),nl.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(nl),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,s){Kr.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(Kr,t.coordinateSystem,t.reversedDepth);const r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,c=s?s.x/r.x:0,l=s?s.y/r.y:0;t.coordinateSystem===cs||t.reversedDepth?e.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,1,0,0,0,0,1):e.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,.5,.5,0,0,0,1),e.multiply(Kr)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.mapType=t.mapType,this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.mapType=this.mapType,t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Gs=new C,Hs=new xn,Mn=new C;class uc extends ge{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Qt,this.projectionMatrix=new Qt,this.projectionMatrixInverse=new Qt,this.coordinateSystem=gn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Gs,Hs,Mn),Mn.x===1&&Mn.y===1&&Mn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Gs,Hs,Mn.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(Gs,Hs,Mn),Mn.x===1&&Mn.y===1&&Mn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Gs,Hs,Mn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Xn=new C,il=new Ut,sl=new Ut;class an extends uc{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Oa*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Er*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Oa*2*Math.atan(Math.tan(Er*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Xn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Xn.x,Xn.y).multiplyScalar(-t/Xn.z),Xn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Xn.x,Xn.y).multiplyScalar(-t/Xn.z)}getViewSize(t,e){return this.getViewBounds(t,il,sl),e.subVectors(sl,il)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Er*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,e-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}class Yh extends hc{constructor(){super(new an(90,1,.5,500)),this.isPointLightShadow=!0}}class Di extends ao{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Yh}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.distance=this.distance,e.object.decay=this.decay,e.object.shadow=this.shadow.toJSON(),e}}class dc extends uc{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=d*this.view.offsetY,c=o-d*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class Kh extends hc{constructor(){super(new dc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class rl extends ao{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ge.DEFAULT_UP),this.updateMatrix(),this.target=new ge,this.shadow=new Kh}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}}const Ri=-90,Ci=1;class za extends ge{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new an(Ri,Ci,t,e);s.layers=this.layers,this.add(s);const r=new an(Ri,Ci,t,e);r.layers=this.layers,this.add(r);const a=new an(Ri,Ci,t,e);a.layers=this.layers,this.add(a);const o=new an(Ri,Ci,t,e);o.layers=this.layers,this.add(o);const c=new an(Ri,Ci,t,e);c.layers=this.layers,this.add(c);const l=new an(Ri,Ci,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,c]=e;for(const l of e)this.remove(l);if(t===gn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===cs)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,d]=this.children,u=t.getRenderTarget(),h=t.getActiveCubeFace(),m=t.getActiveMipmapLevel(),_=t.xr.enabled;t.xr.enabled=!1;const x=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let p=!1;t.isWebGLRenderer===!0?p=t.state.buffers.depth.getReversed():p=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,2,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,3,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),t.setRenderTarget(n,4,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),n.texture.mipmapsAutoUpdate=x,t.setRenderTarget(n,5,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(e,d),t.setRenderTarget(u,h,m),t.xr.enabled=_,n.texture.needsPMREMUpdate=!0}}class Zh extends an{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t,this.perCameraFrustumCulled=!1}}class $h{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,Dt("Clock: This module has been deprecated. Please use THREE.Timer instead.")}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=performance.now();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function al(i,t,e,n){const s=Jh(n);switch(e){case Vl:return i*t;case Ka:return i*t/s.components*s.byteLength;case Za:return i*t/s.components*s.byteLength;case li:return i*t*2/s.components*s.byteLength;case $a:return i*t*2/s.components*s.byteLength;case Wl:return i*t*3/s.components*s.byteLength;case bn:return i*t*4/s.components*s.byteLength;case Ja:return i*t*4/s.components*s.byteLength;case Ks:case Zs:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case $s:case Js:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case la:case ha:return Math.max(i,16)*Math.max(t,8)/4;case oa:case ca:return Math.max(i,8)*Math.max(t,8)/2;case ua:case da:case pa:case ma:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case fa:case tr:case ga:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case _a:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case xa:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case va:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Ma:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Sa:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case ya:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case ba:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Ea:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case wa:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Ta:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Aa:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Ra:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Ca:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Pa:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case La:case Ia:case Da:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Na:case Ua:return Math.ceil(i/4)*Math.ceil(t/4)*8;case er:case Fa:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Jh(i){switch(i){case $e:case zl:return{byteLength:1,components:1};case ls:case kl:case Tn:return{byteLength:2,components:1};case qa:case Ya:return{byteLength:2,components:4};case wn:case Xa:case mn:return{byteLength:4,components:1};case Gl:case Hl:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ha}}));typeof window<"u"&&(window.__THREE__?Dt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ha);function fc(){let i=null,t=!1,e=null,n=null;function s(r,a){n=i.requestAnimationFrame(s),e(r,a)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Qh(i){const t=new WeakMap;function e(o,c){const l=o.array,d=o.usage,u=l.byteLength,h=i.createBuffer();i.bindBuffer(c,h),i.bufferData(c,l,d),o.onUploadCallback();let m;if(l instanceof Float32Array)m=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)m=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?m=i.HALF_FLOAT:m=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)m=i.SHORT;else if(l instanceof Uint32Array)m=i.UNSIGNED_INT;else if(l instanceof Int32Array)m=i.INT;else if(l instanceof Int8Array)m=i.BYTE;else if(l instanceof Uint8Array)m=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)m=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:h,type:m,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,c,l){const d=c.array,u=c.updateRanges;if(i.bindBuffer(l,o),u.length===0)i.bufferSubData(l,0,d);else{u.sort((m,_)=>m.start-_.start);let h=0;for(let m=1;m<u.length;m++){const _=u[h],x=u[m];x.start<=_.start+_.count+1?_.count=Math.max(_.count,x.start+x.count-_.start):(++h,u[h]=x)}u.length=h+1;for(let m=0,_=u.length;m<_;m++){const x=u[m];i.bufferSubData(l,x.start*d.BYTES_PER_ELEMENT,d,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=t.get(o);c&&(i.deleteBuffer(c.buffer),t.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const d=t.get(o);(!d||d.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=t.get(o);if(l===void 0)t.set(o,e(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var jh=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,tu=`#ifdef USE_ALPHAHASH
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
#endif`,eu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,nu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,iu=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,su=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,ru=`#ifdef USE_AOMAP
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
#endif`,au=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ou=`#ifdef USE_BATCHING
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
#endif`,lu=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,cu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,hu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,uu=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,du=`#ifdef USE_IRIDESCENCE
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
#endif`,fu=`#ifdef USE_BUMPMAP
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
#endif`,pu=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,mu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,gu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,_u=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,xu=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,vu=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Mu=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Su=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,yu=`#define PI 3.141592653589793
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
} // validated`,bu=`vec3 transformedNormal = objectNormal;
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
#endif`,Eu=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,wu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Tu=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Au=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Ru="gl_FragColor = linearToOutputTexel( gl_FragColor );",Cu=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Pu=`#ifdef USE_ENVMAP
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
#endif`,Lu=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,Iu=`#ifdef USE_ENVMAP
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
#endif`,Du=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Nu=`#ifdef USE_ENVMAP
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
#endif`,Uu=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Fu=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Ou=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Bu=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,zu=`#ifdef USE_GRADIENTMAP
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
}`,ku=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Gu=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Hu=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Vu=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Wu=`#ifdef USE_ENVMAP
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
#endif`,Xu=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,qu=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Yu=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Ku=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Zu=`PhysicalMaterial material;
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
#endif`,$u=`uniform sampler2D dfgLUT;
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
}`,Ju=`
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
#endif`,Qu=`#if defined( RE_IndirectDiffuse )
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
#endif`,ju=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,td=`#if NUM_LIGHT_PROBE_GRIDS > 0
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
#endif`,ed=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,nd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,id=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,sd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,rd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ad=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,od=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,ld=`#if defined( USE_POINTS_UV )
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
#endif`,cd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,hd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,ud=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,dd=`#if defined( USE_MORPHCOLORS )
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
#endif`,fd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,pd=`#ifdef USE_MORPHTARGETS
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
#endif`,md=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,gd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,_d=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,xd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,vd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Md=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Sd=`#ifdef USE_NORMALMAP
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
#endif`,yd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,bd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Ed=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,wd=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Td=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ad=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Rd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Cd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Pd=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Ld=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Id=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Dd=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Nd=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Ud=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Fd=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Od=`float getShadowMask() {
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
}`,Bd=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,zd=`#ifdef USE_SKINNING
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
#endif`,kd=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Gd=`#ifdef USE_SKINNING
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
#endif`,Hd=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Vd=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Wd=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Xd=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,qd=`#ifdef USE_TRANSMISSION
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
#endif`,Yd=`#ifdef USE_TRANSMISSION
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
#endif`,Kd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Zd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,$d=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Jd=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Qd=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,jd=`uniform sampler2D t2D;
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
}`,tf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ef=`uniform float backgroundBlurriness;
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
}`,nf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,sf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,rf=`#include <common>
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
}`,af=`#if DEPTH_PACKING == 3200
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
}`,of=`#define DISTANCE
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
}`,lf=`#define DISTANCE
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
}`,cf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,hf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,uf=`uniform float scale;
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
}`,df=`uniform vec3 diffuse;
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
}`,ff=`#include <common>
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
}`,pf=`uniform vec3 diffuse;
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
}`,mf=`#define LAMBERT
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
}`,gf=`#define LAMBERT
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
}`,_f=`#define MATCAP
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
}`,xf=`#define MATCAP
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
}`,vf=`#define NORMAL
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
}`,Mf=`#define NORMAL
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
}`,Sf=`#define PHONG
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
}`,yf=`#define PHONG
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
}`,bf=`#define STANDARD
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
}`,Ef=`#define STANDARD
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
}`,wf=`#define TOON
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
}`,Tf=`#define TOON
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
}`,Af=`uniform float size;
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
}`,Rf=`uniform vec3 diffuse;
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
}`,Cf=`#include <common>
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
}`,Pf=`uniform vec3 color;
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
}`,Lf=`uniform float rotation;
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
}`,If=`uniform vec3 diffuse;
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
}`,Ht={alphahash_fragment:jh,alphahash_pars_fragment:tu,alphamap_fragment:eu,alphamap_pars_fragment:nu,alphatest_fragment:iu,alphatest_pars_fragment:su,aomap_fragment:ru,aomap_pars_fragment:au,batching_pars_vertex:ou,batching_vertex:lu,begin_vertex:cu,beginnormal_vertex:hu,bsdfs:uu,iridescence_fragment:du,bumpmap_pars_fragment:fu,clipping_planes_fragment:pu,clipping_planes_pars_fragment:mu,clipping_planes_pars_vertex:gu,clipping_planes_vertex:_u,color_fragment:xu,color_pars_fragment:vu,color_pars_vertex:Mu,color_vertex:Su,common:yu,defaultnormal_vertex:bu,displacementmap_pars_vertex:Eu,displacementmap_vertex:wu,emissivemap_fragment:Tu,emissivemap_pars_fragment:Au,colorspace_fragment:Ru,colorspace_pars_fragment:Cu,envmap_fragment:Pu,envmap_common_pars_fragment:Lu,envmap_pars_fragment:Iu,envmap_pars_vertex:Du,envmap_physical_pars_fragment:Wu,envmap_vertex:Nu,fog_vertex:Uu,fog_pars_vertex:Fu,fog_fragment:Ou,fog_pars_fragment:Bu,gradientmap_pars_fragment:zu,lightmap_pars_fragment:ku,lights_lambert_fragment:Gu,lights_lambert_pars_fragment:Hu,lights_pars_begin:Vu,lights_toon_fragment:Xu,lights_toon_pars_fragment:qu,lights_phong_fragment:Yu,lights_phong_pars_fragment:Ku,lights_physical_fragment:Zu,lights_physical_pars_fragment:$u,lights_fragment_begin:Ju,lights_fragment_maps:Qu,lights_fragment_end:ju,lightprobes_pars_fragment:td,logdepthbuf_fragment:ed,logdepthbuf_pars_fragment:nd,logdepthbuf_pars_vertex:id,logdepthbuf_vertex:sd,map_fragment:rd,map_pars_fragment:ad,map_particle_fragment:od,map_particle_pars_fragment:ld,metalnessmap_fragment:cd,metalnessmap_pars_fragment:hd,morphinstance_vertex:ud,morphcolor_vertex:dd,morphnormal_vertex:fd,morphtarget_pars_vertex:pd,morphtarget_vertex:md,normal_fragment_begin:gd,normal_fragment_maps:_d,normal_pars_fragment:xd,normal_pars_vertex:vd,normal_vertex:Md,normalmap_pars_fragment:Sd,clearcoat_normal_fragment_begin:yd,clearcoat_normal_fragment_maps:bd,clearcoat_pars_fragment:Ed,iridescence_pars_fragment:wd,opaque_fragment:Td,packing:Ad,premultiplied_alpha_fragment:Rd,project_vertex:Cd,dithering_fragment:Pd,dithering_pars_fragment:Ld,roughnessmap_fragment:Id,roughnessmap_pars_fragment:Dd,shadowmap_pars_fragment:Nd,shadowmap_pars_vertex:Ud,shadowmap_vertex:Fd,shadowmask_pars_fragment:Od,skinbase_vertex:Bd,skinning_pars_vertex:zd,skinning_vertex:kd,skinnormal_vertex:Gd,specularmap_fragment:Hd,specularmap_pars_fragment:Vd,tonemapping_fragment:Wd,tonemapping_pars_fragment:Xd,transmission_fragment:qd,transmission_pars_fragment:Yd,uv_pars_fragment:Kd,uv_pars_vertex:Zd,uv_vertex:$d,worldpos_vertex:Jd,background_vert:Qd,background_frag:jd,backgroundCube_vert:tf,backgroundCube_frag:ef,cube_vert:nf,cube_frag:sf,depth_vert:rf,depth_frag:af,distance_vert:of,distance_frag:lf,equirect_vert:cf,equirect_frag:hf,linedashed_vert:uf,linedashed_frag:df,meshbasic_vert:ff,meshbasic_frag:pf,meshlambert_vert:mf,meshlambert_frag:gf,meshmatcap_vert:_f,meshmatcap_frag:xf,meshnormal_vert:vf,meshnormal_frag:Mf,meshphong_vert:Sf,meshphong_frag:yf,meshphysical_vert:bf,meshphysical_frag:Ef,meshtoon_vert:wf,meshtoon_frag:Tf,points_vert:Af,points_frag:Rf,shadow_vert:Cf,shadow_frag:Pf,sprite_vert:Lf,sprite_frag:If},_t={common:{diffuse:{value:new Nt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Bt},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Bt}},envmap:{envMap:{value:null},envMapRotation:{value:new Bt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Bt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Bt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Bt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Bt},normalScale:{value:new Ut(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Bt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Bt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Bt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Bt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Nt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new Nt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0},uvTransform:{value:new Bt}},sprite:{diffuse:{value:new Nt(16777215)},opacity:{value:1},center:{value:new Ut(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Bt},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0}}},yn={basic:{uniforms:Ge([_t.common,_t.specularmap,_t.envmap,_t.aomap,_t.lightmap,_t.fog]),vertexShader:Ht.meshbasic_vert,fragmentShader:Ht.meshbasic_frag},lambert:{uniforms:Ge([_t.common,_t.specularmap,_t.envmap,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.fog,_t.lights,{emissive:{value:new Nt(0)},envMapIntensity:{value:1}}]),vertexShader:Ht.meshlambert_vert,fragmentShader:Ht.meshlambert_frag},phong:{uniforms:Ge([_t.common,_t.specularmap,_t.envmap,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.fog,_t.lights,{emissive:{value:new Nt(0)},specular:{value:new Nt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ht.meshphong_vert,fragmentShader:Ht.meshphong_frag},standard:{uniforms:Ge([_t.common,_t.envmap,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.roughnessmap,_t.metalnessmap,_t.fog,_t.lights,{emissive:{value:new Nt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ht.meshphysical_vert,fragmentShader:Ht.meshphysical_frag},toon:{uniforms:Ge([_t.common,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.gradientmap,_t.fog,_t.lights,{emissive:{value:new Nt(0)}}]),vertexShader:Ht.meshtoon_vert,fragmentShader:Ht.meshtoon_frag},matcap:{uniforms:Ge([_t.common,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.fog,{matcap:{value:null}}]),vertexShader:Ht.meshmatcap_vert,fragmentShader:Ht.meshmatcap_frag},points:{uniforms:Ge([_t.points,_t.fog]),vertexShader:Ht.points_vert,fragmentShader:Ht.points_frag},dashed:{uniforms:Ge([_t.common,_t.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ht.linedashed_vert,fragmentShader:Ht.linedashed_frag},depth:{uniforms:Ge([_t.common,_t.displacementmap]),vertexShader:Ht.depth_vert,fragmentShader:Ht.depth_frag},normal:{uniforms:Ge([_t.common,_t.bumpmap,_t.normalmap,_t.displacementmap,{opacity:{value:1}}]),vertexShader:Ht.meshnormal_vert,fragmentShader:Ht.meshnormal_frag},sprite:{uniforms:Ge([_t.sprite,_t.fog]),vertexShader:Ht.sprite_vert,fragmentShader:Ht.sprite_frag},background:{uniforms:{uvTransform:{value:new Bt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ht.background_vert,fragmentShader:Ht.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Bt}},vertexShader:Ht.backgroundCube_vert,fragmentShader:Ht.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ht.cube_vert,fragmentShader:Ht.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ht.equirect_vert,fragmentShader:Ht.equirect_frag},distance:{uniforms:Ge([_t.common,_t.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ht.distance_vert,fragmentShader:Ht.distance_frag},shadow:{uniforms:Ge([_t.lights,_t.fog,{color:{value:new Nt(0)},opacity:{value:1}}]),vertexShader:Ht.shadow_vert,fragmentShader:Ht.shadow_frag}};yn.physical={uniforms:Ge([yn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Bt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Bt},clearcoatNormalScale:{value:new Ut(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Bt},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new Bt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Bt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Bt},sheen:{value:0},sheenColor:{value:new Nt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Bt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Bt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Bt},transmissionSamplerSize:{value:new Ut},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Bt},attenuationDistance:{value:0},attenuationColor:{value:new Nt(0)},specularColor:{value:new Nt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Bt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Bt},anisotropyVector:{value:new Ut},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Bt}}]),vertexShader:Ht.meshphysical_vert,fragmentShader:Ht.meshphysical_frag};const Vs={r:0,b:0,g:0},Df=new Qt,pc=new Bt;pc.set(-1,0,0,0,1,0,0,0,1);function Nf(i,t,e,n,s,r){const a=new Nt(0);let o=s===!0?0:1,c,l,d=null,u=0,h=null;function m(v){let E=v.isScene===!0?v.background:null;if(E&&E.isTexture){const y=v.backgroundBlurriness>0;E=t.get(E,y)}return E}function _(v){let E=!1;const y=m(v);y===null?p(a,o):y&&y.isColor&&(p(y,1),E=!0);const w=i.xr.getEnvironmentBlendMode();w==="additive"?e.buffers.color.setClear(0,0,0,1,r):w==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||E)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function x(v,E){const y=m(E);y&&y.isCubeTexture?(l===void 0&&(l=new at(new ae(1,1,1),new On({name:"BackgroundCubeMaterial",uniforms:Gi(yn.backgroundCube.uniforms),vertexShader:yn.backgroundCube.vertexShader,fragmentShader:yn.backgroundCube.fragmentShader,side:Ve,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(w,A,g){this.matrixWorld.copyPosition(g.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=y,l.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Df.makeRotationFromEuler(E.backgroundRotation)).transpose(),y.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(pc),l.material.toneMapped=Zt.getTransfer(y.colorSpace)!==ne,(d!==y||u!==y.version||h!==i.toneMapping)&&(l.material.needsUpdate=!0,d=y,u=y.version,h=i.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new at(new Je(2,2),new On({name:"BackgroundMaterial",uniforms:Gi(yn.background.uniforms),vertexShader:yn.background.vertexShader,fragmentShader:yn.background.fragmentShader,side:oi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.toneMapped=Zt.getTransfer(y.colorSpace)!==ne,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(d!==y||u!==y.version||h!==i.toneMapping)&&(c.material.needsUpdate=!0,d=y,u=y.version,h=i.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null))}function p(v,E){v.getRGB(Vs,cc(i)),e.buffers.color.setClear(Vs.r,Vs.g,Vs.b,E,r)}function f(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(v,E=1){a.set(v),o=E,p(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(v){o=v,p(a,o)},render:_,addToRenderList:x,dispose:f}}function Uf(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=h(null);let r=s,a=!1;function o(L,U,G,I,H){let Z=!1;const z=u(L,I,G,U);r!==z&&(r=z,l(r.object)),Z=m(L,I,G,H),Z&&_(L,I,G,H),H!==null&&t.update(H,i.ELEMENT_ARRAY_BUFFER),(Z||a)&&(a=!1,y(L,U,G,I),H!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(H).buffer))}function c(){return i.createVertexArray()}function l(L){return i.bindVertexArray(L)}function d(L){return i.deleteVertexArray(L)}function u(L,U,G,I){const H=I.wireframe===!0;let Z=n[U.id];Z===void 0&&(Z={},n[U.id]=Z);const z=L.isInstancedMesh===!0?L.id:0;let et=Z[z];et===void 0&&(et={},Z[z]=et);let V=et[G.id];V===void 0&&(V={},et[G.id]=V);let j=V[H];return j===void 0&&(j=h(c()),V[H]=j),j}function h(L){const U=[],G=[],I=[];for(let H=0;H<e;H++)U[H]=0,G[H]=0,I[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:G,attributeDivisors:I,object:L,attributes:{},index:null}}function m(L,U,G,I){const H=r.attributes,Z=U.attributes;let z=0;const et=G.getAttributes();for(const V in et)if(et[V].location>=0){const tt=H[V];let Mt=Z[V];if(Mt===void 0&&(V==="instanceMatrix"&&L.instanceMatrix&&(Mt=L.instanceMatrix),V==="instanceColor"&&L.instanceColor&&(Mt=L.instanceColor)),tt===void 0||tt.attribute!==Mt||Mt&&tt.data!==Mt.data)return!0;z++}return r.attributesNum!==z||r.index!==I}function _(L,U,G,I){const H={},Z=U.attributes;let z=0;const et=G.getAttributes();for(const V in et)if(et[V].location>=0){let tt=Z[V];tt===void 0&&(V==="instanceMatrix"&&L.instanceMatrix&&(tt=L.instanceMatrix),V==="instanceColor"&&L.instanceColor&&(tt=L.instanceColor));const Mt={};Mt.attribute=tt,tt&&tt.data&&(Mt.data=tt.data),H[V]=Mt,z++}r.attributes=H,r.attributesNum=z,r.index=I}function x(){const L=r.newAttributes;for(let U=0,G=L.length;U<G;U++)L[U]=0}function p(L){f(L,0)}function f(L,U){const G=r.newAttributes,I=r.enabledAttributes,H=r.attributeDivisors;G[L]=1,I[L]===0&&(i.enableVertexAttribArray(L),I[L]=1),H[L]!==U&&(i.vertexAttribDivisor(L,U),H[L]=U)}function v(){const L=r.newAttributes,U=r.enabledAttributes;for(let G=0,I=U.length;G<I;G++)U[G]!==L[G]&&(i.disableVertexAttribArray(G),U[G]=0)}function E(L,U,G,I,H,Z,z){z===!0?i.vertexAttribIPointer(L,U,G,H,Z):i.vertexAttribPointer(L,U,G,I,H,Z)}function y(L,U,G,I){x();const H=I.attributes,Z=G.getAttributes(),z=U.defaultAttributeValues;for(const et in Z){const V=Z[et];if(V.location>=0){let j=H[et];if(j===void 0&&(et==="instanceMatrix"&&L.instanceMatrix&&(j=L.instanceMatrix),et==="instanceColor"&&L.instanceColor&&(j=L.instanceColor)),j!==void 0){const tt=j.normalized,Mt=j.itemSize,Lt=t.get(j);if(Lt===void 0)continue;const Y=Lt.buffer,ut=Lt.type,xt=Lt.bytesPerElement,Tt=ut===i.INT||ut===i.UNSIGNED_INT||j.gpuType===Xa;if(j.isInterleavedBufferAttribute){const nt=j.data,St=nt.isInterleavedBuffer===!0?nt.stride:nt.itemSize,Vt=j.offset;if(nt.isInstancedInterleavedBuffer||nt.isInstancedBufferAttribute){for(let wt=0;wt<V.locationSize;wt++)f(V.location+wt,nt.meshPerAttribute);L.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=nt.meshPerAttribute*nt.count)}else for(let wt=0;wt<V.locationSize;wt++)p(V.location+wt);i.bindBuffer(i.ARRAY_BUFFER,Y);for(let wt=0;wt<V.locationSize;wt++)E(V.location+wt,Mt/V.locationSize,ut,tt,St*xt,(Vt+Mt/V.locationSize*wt)*xt,Tt)}else{if(j.isInstancedBufferAttribute){for(let nt=0;nt<V.locationSize;nt++)f(V.location+nt,j.meshPerAttribute);L.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let nt=0;nt<V.locationSize;nt++)p(V.location+nt);i.bindBuffer(i.ARRAY_BUFFER,Y);for(let nt=0;nt<V.locationSize;nt++)E(V.location+nt,Mt/V.locationSize,ut,tt,Mt*xt,Mt/V.locationSize*nt*xt,Tt)}}else if(z!==void 0){const tt=z[et];if(tt!==void 0)switch(tt.length){case 2:i.vertexAttrib2fv(V.location,tt);break;case 3:i.vertexAttrib3fv(V.location,tt);break;case 4:i.vertexAttrib4fv(V.location,tt);break;default:i.vertexAttrib1fv(V.location,tt)}}}}v()}function w(){N();for(const L in n){const U=n[L];for(const G in U){const I=U[G];for(const H in I){const Z=I[H];for(const z in Z)d(Z[z].object),delete Z[z];delete I[H]}}delete n[L]}}function A(L){if(n[L.id]===void 0)return;const U=n[L.id];for(const G in U){const I=U[G];for(const H in I){const Z=I[H];for(const z in Z)d(Z[z].object),delete Z[z];delete I[H]}}delete n[L.id]}function g(L){for(const U in n){const G=n[U];for(const I in G){const H=G[I];if(H[L.id]===void 0)continue;const Z=H[L.id];for(const z in Z)d(Z[z].object),delete Z[z];delete H[L.id]}}}function b(L){for(const U in n){const G=n[U],I=L.isInstancedMesh===!0?L.id:0,H=G[I];if(H!==void 0){for(const Z in H){const z=H[Z];for(const et in z)d(z[et].object),delete z[et];delete H[Z]}delete G[I],Object.keys(G).length===0&&delete n[U]}}}function N(){R(),a=!0,r!==s&&(r=s,l(r.object))}function R(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:N,resetDefaultState:R,dispose:w,releaseStatesOfGeometry:A,releaseStatesOfObject:b,releaseStatesOfProgram:g,initAttributes:x,enableAttribute:p,disableUnusedAttributes:v}}function Ff(i,t,e){let n;function s(c){n=c}function r(c,l){i.drawArrays(n,c,l),e.update(l,n,1)}function a(c,l,d){d!==0&&(i.drawArraysInstanced(n,c,l,d),e.update(l,n,d))}function o(c,l,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,d);let h=0;for(let m=0;m<d;m++)h+=l[m];e.update(h,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function Of(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const g=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(g.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(g){return!(g!==bn&&n.convert(g)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(g){const b=g===Tn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(g!==$e&&g!==mn&&!b&&n.convert(g)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function c(g){if(g==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";g="mediump"}return g==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const d=c(l);d!==l&&(Dt("WebGLRenderer:",l,"not supported, using",d,"instead."),l=d);const u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),h=e.logarithmicDepthBuffer===!0&&u===!1;e.reversedDepthBuffer===!0&&u===!1&&Dt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),e.logarithmicDepthBuffer===!0&&u===!0&&Dt("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");const m=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),p=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),v=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),E=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),w=i.getParameter(i.MAX_SAMPLES),A=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:h,reversedDepthBuffer:u,maxTextures:m,maxVertexTextures:_,maxTextureSize:x,maxCubemapSize:p,maxAttributes:f,maxVertexUniforms:v,maxVaryings:E,maxFragmentUniforms:y,maxSamples:w,samples:A}}function Bf(i){const t=this;let e=null,n=0,s=!1,r=!1;const a=new qn,o=new Bt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,h){const m=u.length!==0||h||n!==0||s;return s=h,n=u.length,m},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,h){e=d(u,h,0)},this.setState=function(u,h,m){const _=u.clippingPlanes,x=u.clipIntersection,p=u.clipShadows,f=i.get(u);if(!s||_===null||_.length===0||r&&!p)r?d(null):l();else{const v=r?0:n,E=v*4;let y=f.clippingState||null;c.value=y,y=d(_,h,E,m);for(let w=0;w!==E;++w)y[w]=e[w];f.clippingState=y,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=v}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function d(u,h,m,_){const x=u!==null?u.length:0;let p=null;if(x!==0){if(p=c.value,_!==!0||p===null){const f=m+x*4,v=h.matrixWorldInverse;o.getNormalMatrix(v),(p===null||p.length<f)&&(p=new Float32Array(f));for(let E=0,y=m;E!==x;++E,y+=4)a.copy(u[E]).applyMatrix4(v,o),a.normal.toArray(p,y),p[y+3]=a.constant}c.value=p,c.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,p}}class oo extends En{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new rc(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new ae(5,5,5),r=new On({name:"CubemapFromEquirect",uniforms:Gi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ve,blending:Ni});r.uniforms.tEquirect.value=e;const a=new at(s,r),o=e.minFilter;return e.minFilter===Kn&&(e.minFilter=Xe),new za(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}}const ol=256,zf=3,kf=20,mc=256,gc=16,Gf=3,Hf=new C,Vf=new Nt;class hr{constructor(t){this._renderer=t,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new za(1,10,null),this._boxMesh=new at(new ae(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){const{size:a=256,position:o=Hf}=r,c=this._renderer;this._setSize(a);const l=this._allocateTarget(),d=this._getSourceTarget(!0);e>0&&(d.texture.mipmapsAutoUpdate=!1);const u=c.autoClear,h=c.autoClearColor,m=c.autoClearDepth,_=c.autoClearStencil,x=t.background;c.autoClear=!0,c.autoClearColor=!0,c.autoClearDepth=!0,c.autoClearStencil=!0,x===null&&(t.background=c.getClearColor(Vf));const p=new za(n,s,d);return p.position.copy(o),p.update(c,t),c.autoClear=u,c.autoClearColor=h,c.autoClearDepth=m,c.autoClearStencil=_,t.background=x,e>0&&(d.texture.mipmapsAutoUpdate=!0,this._blur(l,e)),this._applyPMREM(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=hl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=cl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(t,e){return e>0?1-Math.sqrt(1-t/e):0}_setSize(t){this._cubeSize=Math.max(ol,ph(t))}_fromTexture(t,e){t.mapping===Oi||t.mapping===as?this._setSize(t.image.length===0?ol:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4);const n=e||this._allocateTarget();return this._textureToCubemap(t),this._applyPMREM(n),n}_allocateTarget(){const t=this._cubeSize,e=ll(t,!1,!1),n=Math.log2(t)-zf;for(let s=0;s<=n;s++)e.texture.mipmaps.push({width:t>>s,height:t>>s});return e.texture.name="PMREM",e.texture.isPMREMTexture=!0,e}_getSourceTarget(t=!1){const e=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==e||t&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=ll(e,!0,t)),this._sourceTarget}_compileMaterial(t){this._boxMesh.material=t,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(t,e,n){const s=this._boxMesh,r=this._cubeCamera;s.material=n,r.renderTarget=t,r.activeMipmapLevel=e;const a=t.width>>e;t.viewport.set(0,0,a,a),r.update(this._renderer,s),t.viewport.set(0,0,t.width,t.height)}_textureToCubemap(t){let e;t.mapping===Oi||t.mapping===as?(this._cubemapMaterial===null&&(this._cubemapMaterial=hl()),e=this._cubemapMaterial,e.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=cl()),e=this._equirectMaterial),e.uniforms.envMap.value=t,this._renderCube(this._getSourceTarget(),0,e)}_applyPMREM(t){this._ggxMaterial===null&&(this._ggxMaterial=Wf(),this._integrationMaterial=Xf());const e=this._cubeSize,n=t.texture.mipmaps.length-1,s=this._ggxMaterial.uniforms;s.envMap.value=this._sourceTarget.texture;const r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(e/gc);for(let a=0;a<=n;a++){const o=hr.lodToRoughness(a,n);if(a>n-Gf)r.roughness.value=o,this._renderCube(t,a,this._integrationMaterial);else{const c=o>0?Math.log2(e)+.5*Math.log2(6/(mc*Math.pow(o,4)))+.5:0;s.roughness.value=o,s.lodBias.value=c,this._renderCube(t,a,this._ggxMaterial)}}}_blur(t,e){this._blurMaterial===null&&(this._blurMaterial=qf());const n=this._blurMaterial,s=n.uniforms,r=this._sourceTarget;s.sigma.value=Math.min(e,Math.PI)/Math.SQRT2,s.envMap.value=r.texture,this._renderCube(t,0,n),s.envMap.value=t.texture,this._renderCube(r,0,n)}}function ll(i,t,e){return new oo(i,{minFilter:Kn,generateMipmaps:t,type:Tn,colorSpace:ir,depthBuffer:e})}function ds(i,t,e){return new On({name:i,uniforms:t,vertexShader:Ht.cube_vert,fragmentShader:e,side:Ve,blending:Ni,depthTest:!1,depthWrite:!1})}function Wf(){return ds("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${mc}u

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
	`)}function Xf(){return ds("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:gc}},`

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
	`)}function qf(){return ds("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${kf}
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
	`)}function cl(){return ds("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

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
	`)}function hl(){return ds("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function Yf(i){let t=new WeakMap,e=new WeakMap,n=null;function s(h,m=!1){return h==null?null:m?a(h):r(h)}function r(h){if(h&&h.isTexture){const m=h.mapping;if(m===Mr||m===Sr)if(t.has(h)){const _=t.get(h).texture;return o(_,h.mapping)}else{const _=h.image;if(_&&_.height>0){const x=new oo(_.height);return x.fromEquirectangularTexture(i,h),t.set(h,x),h.addEventListener("dispose",l),o(x.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture&&h.isPMREMTexture!==!0){const m=h.mapping,_=m===Mr||m===Sr,x=m===Oi||m===as;if(_||x){let p=e.get(h);const f=p!==void 0?p.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==f)return n===null&&(n=new hr(i)),p=_?n.fromEquirectangular(h,p):n.fromCubemap(h,p),p.texture.pmremVersion=h.pmremVersion,e.set(h,p),p.texture;if(p!==void 0)return p.texture;{const v=h.image;return _&&v&&v.height>0||x&&v&&c(v)?(n===null&&(n=new hr(i)),p=_?n.fromEquirectangular(h):n.fromCubemap(h),p.texture.pmremVersion=h.pmremVersion,e.set(h,p),h.addEventListener("dispose",d),p.texture):null}}}return h}function o(h,m){return m===Mr?h.mapping=Oi:m===Sr&&(h.mapping=as),h}function c(h){let m=0;const _=6;for(let x=0;x<_;x++)h[x]!==void 0&&m++;return m===_}function l(h){const m=h.target;m.removeEventListener("dispose",l);const _=t.get(m);_!==void 0&&(t.delete(m),_.dispose())}function d(h){const m=h.target;m.removeEventListener("dispose",d);const _=e.get(m);_!==void 0&&(e.delete(m),_.dispose())}function u(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:u}}function Kf(i){const t={};function e(n){if(t[n]!==void 0)return t[n];const s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&Qs("WebGLRenderer: "+n+" extension not supported."),s}}}function Zf(i,t,e,n){const s={},r=new WeakMap,a=new FinalizationRegistry(_=>delete s[_]);function o(_){c(_.target)}function c(_){_.index!==null&&t.remove(_.index);for(const p in _.attributes)t.remove(_.attributes[p]);_.removeEventListener("dispose",o),delete s[_.id],a.unregister(_);const x=r.get(_);x&&(t.remove(x),r.delete(_)),n.releaseStatesOfGeometry(_),_.isInstancedBufferGeometry===!0&&delete _._maxInstanceCount,e.memory.geometries--}function l(_,x){return s[x.id]!==void 0||(x.addEventListener("dispose",o),s[x.id]=new WeakRef(x),a.register(x,x.id,x),e.memory.geometries++),x}function d(_){const x=_.attributes;for(const p in x)t.update(x[p],i.ARRAY_BUFFER)}function u(_){const x=_.index,p=_.attributes.position;let f=0;if(p===void 0)return;const v=x!==null?x.array.length:p.array.length/3-1,E=p.count>=65535?nc:ec,y=new E(Math.ceil(v/3)*6,1),w=y.array;if(x!==null){const g=x.array;f=x.version;for(let b=0,N=0;b<v;b+=3){const R=g[b+0],L=g[b+1],U=g[b+2];w[N++]=R,w[N++]=L,w[N++]=L,w[N++]=U,w[N++]=U,w[N++]=R}}else{f=p.version;for(let g=0,b=0;g<v;g+=3){const N=g+0,R=g+1,L=g+2;w[b++]=N,w[b++]=R,w[b++]=R,w[b++]=L,w[b++]=L,w[b++]=N}}y.version=f;const A=r.get(_);A&&t.remove(A),r.set(_,y)}function h(_){const x=r.get(_);if(x){const p=_.index;p!==null&&x.version<p.version&&u(_)}else u(_);return r.get(_)}function m(){for(const _ in s){const x=s[_].deref();x!==void 0&&c(x)}}return{get:l,update:d,getWireframeAttribute:h,dispose:m}}function $f(i,t,e){let n;function s(u){n=u}let r,a;function o(u){r=u.type,a=u.bytesPerElement}function c(u,h){i.drawElements(n,h,r,u*a),e.update(h,n,1)}function l(u,h,m){m!==0&&(i.drawElementsInstanced(n,h,r,u*a,m),e.update(h,n,m))}function d(u,h,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,h,0,r,u,0,m);let x=0;for(let p=0;p<m;p++)x+=h[p];e.update(x,n,1)}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=d}function Jf(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:jt("WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Qf(i,t,e){const n=new WeakMap,s=new pe;function r(a,o,c){const l=a.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=d!==void 0?d.length:0;let h=n.get(o);if(h===void 0||h.count!==u){let R=function(){b.dispose(),n.delete(o),o.removeEventListener("dispose",R)};var m=R;h!==void 0&&h.texture.dispose();const _=o.morphAttributes.position!==void 0,x=o.morphAttributes.normal!==void 0,p=o.morphAttributes.color!==void 0,f=o.morphAttributes.position||[],v=o.morphAttributes.normal||[],E=o.morphAttributes.color||[];let y=0;_===!0&&(y=1),x===!0&&(y=2),p===!0&&(y=3);let w=o.attributes.position.count*y,A=1;w>t.maxTextureSize&&(A=Math.ceil(w/t.maxTextureSize),w=t.maxTextureSize);const g=new Float32Array(w*A*4*u),b=new Ql(g,w,A,u);b.type=mn,b.needsUpdate=!0;const N=y*4;for(let L=0;L<u;L++){const U=f[L],G=v[L],I=E[L],H=w*A*4*L;for(let Z=0;Z<U.count;Z++){const z=Z*N;_===!0&&(s.fromBufferAttribute(U,Z),g[H+z+0]=s.x,g[H+z+1]=s.y,g[H+z+2]=s.z,g[H+z+3]=0),x===!0&&(s.fromBufferAttribute(G,Z),g[H+z+4]=s.x,g[H+z+5]=s.y,g[H+z+6]=s.z,g[H+z+7]=0),p===!0&&(s.fromBufferAttribute(I,Z),g[H+z+8]=s.x,g[H+z+9]=s.y,g[H+z+10]=s.z,g[H+z+11]=I.itemSize===4?s.w:1)}}h={count:u,texture:b,size:new Ut(w,A)},n.set(o,h),o.addEventListener("dispose",R)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let _=0;for(let p=0;p<l.length;p++)_+=l[p];const x=o.morphTargetsRelative?1:1-_;c.getUniforms().setValue(i,"morphTargetBaseInfluence",x),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",h.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:r}}function jf(i,t,e,n,s){let r=new WeakMap;function a(l){const d=s.render.frame,u=l.geometry,h=t.get(l,u);if(r.get(h)!==d&&(t.update(h),r.set(h,d)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==d&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,d))),l.isSkinnedMesh){const m=l.skeleton;r.get(m)!==d&&(m.update(),r.set(m,d))}return h}function o(){r=new WeakMap}function c(l){const d=l.target;d.removeEventListener("dispose",c),n.releaseStatesOfObject(d),e.remove(d.instanceMatrix),d.instanceColor!==null&&e.remove(d.instanceColor)}return{update:a,dispose:o}}const tp={[Il]:"LINEAR_TONE_MAPPING",[Dl]:"REINHARD_TONE_MAPPING",[Nl]:"CINEON_TONE_MAPPING",[Wa]:"ACES_FILMIC_TONE_MAPPING",[Fl]:"AGX_TONE_MAPPING",[Ol]:"NEUTRAL_TONE_MAPPING",[Ul]:"CUSTOM_TONE_MAPPING"};function ep(i,t,e,n,s,r){const a=new En(t,e,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,c=null,l=null;const d=new _e;d.setAttribute("position",new oe([-1,3,0,-1,-1,0,3,-1,0],3)),d.setAttribute("uv",new oe([0,2,0,0,2,0],2));const u=new Vh({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),h=new at(d,u),m=new dc(-1,1,1,-1,0,1);let _=null,x=null,p=!1,f,v=null,E=[],y=!1;this.setSize=function(w,A){a.setSize(w,A),o!==null&&o.setSize(w,A),c!==null&&c.setSize(w,A);for(let g=0;g<E.length;g++){const b=E[g];b.setSize&&b.setSize(w,A)}},this.setEffects=function(w){E=w,y=E.length>0&&E[0].isRenderPass===!0;const A=a.width,g=a.height;E.length>0&&o===null&&(o=new En(A,g,{type:Tn,depthBuffer:!1,stencilBuffer:!1}),c=new En(A,g,{type:Tn,depthBuffer:!1,stencilBuffer:!1}));const b=s===!0&&E.some(N=>N.needsDepthTexture===!0);b!==(a.depthTexture!==null)&&(b===!0&&l===null&&(l=new zi(A,g),r===!0&&(l.format=Zn,l.type=Bi)),a.dispose(),a.depthTexture=b?l:null,a.resolveDepthBuffer=b,a.storeMultisampledDepthBuffer=b);for(let N=0;N<E.length;N++){const R=E[N];R.setSize&&R.setSize(A,g),b&&R.needsDepthTexture===!0&&R.setDepthTexture&&R.setDepthTexture(l)}},this.begin=function(w,A){if(p||w.toneMapping===Nn&&E.length===0)return!1;if(v=A,A!==null){const g=A.width,b=A.height;(a.width!==g||a.height!==b)&&this.setSize(g,b)}return y===!1&&w.setRenderTarget(a),f=w.toneMapping,w.toneMapping=Nn,!0},this.hasRenderPass=function(){return y},this.end=function(w,A){w.toneMapping=f,p=!0;let g=a,b=o;for(let N=0;N<E.length;N++){const R=E[N];R.enabled!==!1&&(R.render(w,b,g,A),R.needsSwap!==!1&&(g=b,b=b===o?c:o))}if(_!==w.outputColorSpace||x!==w.toneMapping){_=w.outputColorSpace,x=w.toneMapping,u.defines={},Zt.getTransfer(_)===ne&&(u.defines.SRGB_TRANSFER="");const N=tp[x];N&&(u.defines[N]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=g.texture,w.setRenderTarget(v),w.render(h,m),v=null,p=!1},this.isCompositing=function(){return p},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),c!==null&&c.dispose(),d.dispose(),u.dispose()}}const _c=new Be,xc=new zi(1,1),vc=new oc(1),Mc=new Ql,Sc=new Mh,yc=new rc,ul=[],dl=[],fl=new Float32Array(16),pl=new Float32Array(9),ml=new Float32Array(4);function Hi(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=ul[s];if(r===void 0&&(r=new Float32Array(s),ul[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function Ee(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function we(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function mr(i,t){let e=dl[t];e===void 0&&(e=new Int32Array(t),dl[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function np(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function ip(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ee(e,t))return;i.uniform2fv(this.addr,t),we(e,t)}}function sp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ee(e,t))return;i.uniform3fv(this.addr,t),we(e,t)}}function rp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ee(e,t))return;i.uniform4fv(this.addr,t),we(e,t)}}function ap(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ee(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),we(e,t)}else{if(Ee(e,n))return;ml.set(n),i.uniformMatrix2fv(this.addr,!1,ml),we(e,n)}}function op(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ee(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),we(e,t)}else{if(Ee(e,n))return;pl.set(n),i.uniformMatrix3fv(this.addr,!1,pl),we(e,n)}}function lp(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ee(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),we(e,t)}else{if(Ee(e,n))return;fl.set(n),i.uniformMatrix4fv(this.addr,!1,fl),we(e,n)}}function cp(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function hp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ee(e,t))return;i.uniform2iv(this.addr,t),we(e,t)}}function up(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ee(e,t))return;i.uniform3iv(this.addr,t),we(e,t)}}function dp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ee(e,t))return;i.uniform4iv(this.addr,t),we(e,t)}}function fp(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function pp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ee(e,t))return;i.uniform2uiv(this.addr,t),we(e,t)}}function mp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ee(e,t))return;i.uniform3uiv(this.addr,t),we(e,t)}}function gp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ee(e,t))return;i.uniform4uiv(this.addr,t),we(e,t)}}function gr(i){return i.version===0&&(i.compareFunction=Yl,i.needsUpdate=!0),i}function _p(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?r=gr(xc):r=_c,e.setTexture2D(t||r,s)}function xp(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Sc,s)}function vp(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_CUBE_SHADOW?r=gr(vc):r=yc,e.setTextureCube(t||r,s)}function Mp(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Mc,s)}function Sp(i){switch(i){case 5126:return np;case 35664:return ip;case 35665:return sp;case 35666:return rp;case 35674:return ap;case 35675:return op;case 35676:return lp;case 5124:case 35670:return cp;case 35667:case 35671:return hp;case 35668:case 35672:return up;case 35669:case 35673:return dp;case 5125:return fp;case 36294:return pp;case 36295:return mp;case 36296:return gp;case 35678:case 36198:case 36298:case 36306:case 35682:return _p;case 35679:case 36299:case 36307:return xp;case 35680:case 36300:case 36308:case 36293:return vp;case 36289:case 36303:case 36311:case 36292:return Mp}}function yp(i,t){i.uniform1fv(this.addr,t)}function bp(i,t){const e=Hi(t,this.size,2);i.uniform2fv(this.addr,e)}function Ep(i,t){const e=Hi(t,this.size,3);i.uniform3fv(this.addr,e)}function wp(i,t){const e=Hi(t,this.size,4);i.uniform4fv(this.addr,e)}function Tp(i,t){const e=Hi(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Ap(i,t){const e=Hi(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Rp(i,t){const e=Hi(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Cp(i,t){i.uniform1iv(this.addr,t)}function Pp(i,t){i.uniform2iv(this.addr,t)}function Lp(i,t){i.uniform3iv(this.addr,t)}function Ip(i,t){i.uniform4iv(this.addr,t)}function Dp(i,t){i.uniform1uiv(this.addr,t)}function Np(i,t){i.uniform2uiv(this.addr,t)}function Up(i,t){i.uniform3uiv(this.addr,t)}function Fp(i,t){i.uniform4uiv(this.addr,t)}function Op(i,t,e){const n=this.cache,s=t.length,r=mr(e,s);Ee(n,r)||(i.uniform1iv(this.addr,r),we(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=gr(xc):a=_c;for(let o=0;o!==s;++o)e.setTexture2D(t[o]||a,r[o])}function Bp(i,t,e){const n=this.cache,s=t.length,r=mr(e,s);Ee(n,r)||(i.uniform1iv(this.addr,r),we(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||Sc,r[a])}function zp(i,t,e){const n=this.cache,s=t.length,r=mr(e,s);Ee(n,r)||(i.uniform1iv(this.addr,r),we(n,r));let a;this.type===i.SAMPLER_CUBE_SHADOW?a=gr(vc):a=yc;for(let o=0;o!==s;++o)e.setTextureCube(t[o]||a,r[o])}function kp(i,t,e){const n=this.cache,s=t.length,r=mr(e,s);Ee(n,r)||(i.uniform1iv(this.addr,r),we(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||Mc,r[a])}function Gp(i){switch(i){case 5126:return yp;case 35664:return bp;case 35665:return Ep;case 35666:return wp;case 35674:return Tp;case 35675:return Ap;case 35676:return Rp;case 5124:case 35670:return Cp;case 35667:case 35671:return Pp;case 35668:case 35672:return Lp;case 35669:case 35673:return Ip;case 5125:return Dp;case 36294:return Np;case 36295:return Up;case 36296:return Fp;case 35678:case 36198:case 36298:case 36306:case 35682:return Op;case 35679:case 36299:case 36307:return Bp;case 35680:case 36300:case 36308:case 36293:return zp;case 36289:case 36303:case 36311:case 36292:return kp}}class Hp{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Sp(e.type)}}class Vp{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Gp(e.type)}}class Wp{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,e[o.id],n)}}}const Zr=/(\w+)(\])?(\[|\.)?/g;function gl(i,t){i.seq.push(t),i.map[t.id]=t}function Xp(i,t,e){const n=i.name,s=n.length;for(Zr.lastIndex=0;;){const r=Zr.exec(n),a=Zr.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){gl(e,l===void 0?new Hp(o,i,t):new Vp(o,i,t));break}else{let u=e.map[o];u===void 0&&(u=new Wp(o),gl(e,u)),e=u}}}class js{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=t.getActiveUniform(e,a),c=t.getUniformLocation(e,o.name);Xp(o,c,this)}const s=[],r=[];for(const a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){const o=e[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(t,c.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in e&&n.push(a)}return n}}function _l(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const qp=37297;let Yp=0;function Kp(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const xl=new Bt;function Zp(i){Zt._getMatrix(xl,Zt.workingColorSpace,i);const t=`mat3( ${xl.elements.map(e=>e.toFixed(4))} )`;switch(Zt.getTransfer(i)){case sr:return[t,"LinearTransferOETF"];case ne:return[t,"sRGBTransferOETF"];default:return Dt("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function vl(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+Kp(i.getShaderSource(t),o)}else return r}function $p(i,t){const e=Zp(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( ${e[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}const Jp={[Il]:"Linear",[Dl]:"Reinhard",[Nl]:"Cineon",[Wa]:"ACESFilmic",[Fl]:"AgX",[Ol]:"Neutral",[Ul]:"Custom"};function Qp(i,t){const e=Jp[t];return e===void 0?(Dt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Ws=new C;function jp(){Zt.getLuminanceCoefficients(Ws);const i=Ws.x.toFixed(4),t=Ws.y.toFixed(4),e=Ws.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function tm(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(is).join(`
`)}function em(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function nm(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function is(i){return i!==""}function Ml(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,t.numLightProbeGrids)}function Sl(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const im=/^[ \t]*#include +<([\w\d./]+)>/gm;function ka(i){return i.replace(im,sm)}function sm(i,t){const e=Ht[t];if(e===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">");return ka(e)}const rm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function yl(i){return i.replace(rm,am)}function am(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function bl(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}const om={[Ys]:"SHADOWMAP_TYPE_PCF",[ns]:"SHADOWMAP_TYPE_VSM"};function lm(i){return om[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const cm={[as]:"ENVMAP_MODE_REFRACTION"};function hm(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":cm[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const um={[Va]:"ENVMAP_BLENDING_MULTIPLY",[Qc]:"ENVMAP_BLENDING_MIX",[jc]:"ENVMAP_BLENDING_ADD"};function dm(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":um[i.combine]||"ENVMAP_BLENDING_NONE"}function fm(i,t,e,n){const s=i.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const c=lm(e),l=e.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",d=hm(e),u=dm(e),h=tm(e),m=em(r),_=s.createProgram();let x,p,f=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(x=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(is).join(`
`),x.length>0&&(x+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(is).join(`
`),p.length>0&&(p+=`
`)):(x=[bl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+d:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+e.diffuseRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(is).join(`
`),p=[bl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+d:"",e.envMap?"#define "+u:"",e.envMapPMREM?"#define ENVMAP_MAX_LOD "+e.envMapMaxLod+".0":"",e.envMapPMREM?"#define ENVMAP_SIZE "+e.envMapSize+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Nn?"#define TONE_MAPPING":"",e.toneMapping!==Nn?Ht.tonemapping_pars_fragment:"",e.toneMapping!==Nn?Qp("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Ht.colorspace_pars_fragment,$p("linearToOutputTexel",e.outputColorSpace),jp(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(is).join(`
`)),a=ka(a),a=Ml(a,e),a=Sl(a,e),o=ka(o),o=Ml(o,e),o=Sl(o,e),a=yl(a),o=yl(o),e.isRawShaderMaterial!==!0&&(f=`#version 300 es
`,x=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+x,p=["#define varying in",e.glslVersion===Ao?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Ao?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const v=f+x+a,E=f+p+o,y=_l(s,s.VERTEX_SHADER,v),w=_l(s,s.FRAGMENT_SHADER,E);s.attachShader(_,y),s.attachShader(_,w),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function A(R){if(i.debug.checkShaderErrors){const L=s.getProgramInfoLog(_)||"",U=s.getShaderInfoLog(y)||"",G=s.getShaderInfoLog(w)||"",I=L.trim(),H=U.trim(),Z=G.trim();let z=!0,et=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(z=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,y,w);else{const V=vl(s,y,"vertex"),j=vl(s,w,"fragment");jt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+I+`
`+V+`
`+j)}else I!==""?Dt("WebGLProgram: Program Info Log:",I):(H===""||Z==="")&&(et=!1);et&&(R.diagnostics={runnable:z,programLog:I,vertexShader:{log:H,prefix:x},fragmentShader:{log:Z,prefix:p}})}s.deleteShader(y),s.deleteShader(w),g=new js(s,_),b=nm(s,_)}let g;this.getUniforms=function(){return g===void 0&&A(this),g};let b;this.getAttributes=function(){return b===void 0&&A(this),b};let N=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return N===!1&&(N=s.getProgramParameter(_,qp)),N},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Yp++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=y,this.fragmentShader=w,this}let pm=0;class mm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){const s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new gm(t),e.set(t,n)),n}}class gm{constructor(t){this.id=pm++,this.code=t,this.usedTimes=0}}function _m(i){return i===li||i===tr||i===er}function xm(i,t,e,n,s,r){const a=new jl,o=new mm,c=new Set,l=[],d=new Map,u=n.logarithmicDepthBuffer,h={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(g){return c.add(g),g===0?"uv":`uv${g}`}function _(g,b,N,R,L,U){const G=R.fog,I=L.geometry,H=g.isMeshStandardMaterial||g.isMeshLambertMaterial||g.isMeshPhongMaterial?R.environment:null,Z=g.isMeshStandardMaterial||g.isMeshLambertMaterial&&!g.envMap||g.isMeshPhongMaterial&&!g.envMap,z=t.get(g.envMap||H,Z),et=h[g.type];let V=n.precision;g.precision!==null&&(V=n.getMaxPrecision(g.precision),V!==g.precision&&Dt("WebGLProgram.getParameters:",g.precision,"not supported, using",V,"instead."));const j=I.morphAttributes.position||I.morphAttributes.normal||I.morphAttributes.color,tt=j!==void 0?j.length:0;let Mt=0;I.morphAttributes.position!==void 0&&(Mt=1),I.morphAttributes.normal!==void 0&&(Mt=2),I.morphAttributes.color!==void 0&&(Mt=3);let Lt,Y,ut,xt;if(et){const gt=yn[et];Lt=gt.vertexShader,Y=gt.fragmentShader}else{Lt=g.vertexShader,Y=g.fragmentShader;const gt=o.getVertexShaderStage(g),ee=o.getFragmentShaderStage(g);o.update(g,gt,ee),ut=gt.id,xt=ee.id}const Tt=i.getRenderTarget(),nt=i.state.buffers.depth.getReversed(),St=L.isInstancedMesh===!0,Vt=L.isBatchedMesh===!0,wt=!!g.map,Yt=!!g.matcap,Kt=!!z,Wt=Kt&&z.isPMREMTexture===!0,Pe=!!g.aoMap,ye=!!g.lightMap,We=!!g.bumpMap&&g.wireframe===!1,de=!!g.normalMap,vn=!!g.displacementMap,Te=!!g.emissiveMap,Qe=!!g.metalnessMap,je=!!g.roughnessMap,tn=g.anisotropy>0,F=g.clearcoat>0,en=g.diffuseRoughness>0,le=g.dispersion>0,ce=g.retroreflectivity>0,mt=g.iridescence>0,be=g.sheen>0,Pt=g.transmission>0,Ft=tn&&!!g.anisotropyMap,T=F&&!!g.clearcoatMap,M=F&&!!g.clearcoatNormalMap,B=F&&!!g.clearcoatRoughnessMap,it=en&&!!g.diffuseRoughnessMap,Q=mt&&!!g.iridescenceMap,ot=mt&&!!g.iridescenceThicknessMap,ft=be&&!!g.sheenColorMap,K=be&&!!g.sheenRoughnessMap,$=!!g.specularMap,ct=!!g.specularColorMap,P=!!g.specularIntensityMap,J=Pt&&!!g.transmissionMap,q=Pt&&!!g.thicknessMap,ht=!!g.gradientMap,rt=!!g.alphaMap,lt=g.alphaTest>0,Rt=!!g.alphaHash,Gt=!!g.extensions;let st=Nn;g.toneMapped&&(Tt===null||Tt.isXRRenderTarget===!0)&&(st=i.toneMapping);const Ct=Wt?z.isCompressedCubeTexture?z.image[0].mipmaps:z.mipmaps:null,kt={shaderID:et,shaderType:g.type,shaderName:g.name,vertexShader:Lt,fragmentShader:Y,defines:g.defines,customVertexShaderID:ut,customFragmentShaderID:xt,isRawShaderMaterial:g.isRawShaderMaterial===!0,glslVersion:g.glslVersion,precision:V,batching:Vt,batchingColor:Vt&&L._colorsTexture!==null,instancing:St,instancingColor:St&&L.instanceColor!==null,instancingMorph:St&&L.morphTexture!==null,outputColorSpace:Tt===null?i.outputColorSpace:Tt.isXRRenderTarget===!0?Tt.texture.colorSpace:Zt.workingColorSpace,alphaToCoverage:!!g.alphaToCoverage,map:wt,matcap:Yt,envMap:Kt,envMapMode:Kt&&z.mapping,envMapPMREM:Wt,envMapMaxLod:Wt?Ct.length-1:null,envMapSize:Wt?Ct[0].width:null,aoMap:Pe,lightMap:ye,bumpMap:We,normalMap:de,displacementMap:vn,emissiveMap:Te,normalMapObjectSpace:de&&g.normalMapType===nh,normalMapTangentSpace:de&&g.normalMapType===nr,packedNormalMap:de&&g.normalMapType===nr&&_m(g.normalMap.format),metalnessMap:Qe,roughnessMap:je,anisotropy:tn,anisotropyMap:Ft,clearcoat:F,clearcoatMap:T,clearcoatNormalMap:M,clearcoatRoughnessMap:B,diffuseRoughness:en,diffuseRoughnessMap:it,dispersion:le,retroreflection:ce,iridescence:mt,iridescenceMap:Q,iridescenceThicknessMap:ot,sheen:be,sheenColorMap:ft,sheenRoughnessMap:K,specularMap:$,specularColorMap:ct,specularIntensityMap:P,transmission:Pt,transmissionMap:J,thicknessMap:q,gradientMap:ht,opaque:g.transparent===!1&&g.blending===ss&&g.alphaToCoverage===!1,alphaMap:rt,alphaTest:lt,alphaHash:Rt,combine:g.combine,mapUv:wt&&m(g.map.channel),aoMapUv:Pe&&m(g.aoMap.channel),lightMapUv:ye&&m(g.lightMap.channel),bumpMapUv:We&&m(g.bumpMap.channel),normalMapUv:de&&m(g.normalMap.channel),displacementMapUv:vn&&m(g.displacementMap.channel),emissiveMapUv:Te&&m(g.emissiveMap.channel),metalnessMapUv:Qe&&m(g.metalnessMap.channel),roughnessMapUv:je&&m(g.roughnessMap.channel),anisotropyMapUv:Ft&&m(g.anisotropyMap.channel),clearcoatMapUv:T&&m(g.clearcoatMap.channel),clearcoatNormalMapUv:M&&m(g.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:B&&m(g.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:it&&m(g.diffuseRoughnessMap.channel),iridescenceMapUv:Q&&m(g.iridescenceMap.channel),iridescenceThicknessMapUv:ot&&m(g.iridescenceThicknessMap.channel),sheenColorMapUv:ft&&m(g.sheenColorMap.channel),sheenRoughnessMapUv:K&&m(g.sheenRoughnessMap.channel),specularMapUv:$&&m(g.specularMap.channel),specularColorMapUv:ct&&m(g.specularColorMap.channel),specularIntensityMapUv:P&&m(g.specularIntensityMap.channel),transmissionMapUv:J&&m(g.transmissionMap.channel),thicknessMapUv:q&&m(g.thicknessMap.channel),alphaMapUv:rt&&m(g.alphaMap.channel),vertexTangents:!!I.attributes.tangent&&(de||tn),vertexNormals:!!I.attributes.normal,vertexColors:g.vertexColors,vertexAlphas:g.vertexColors===!0&&!!I.attributes.color&&I.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!I.attributes.uv&&(wt||rt),fog:!!G,useFog:g.fog===!0,fogExp2:!!G&&G.isFogExp2,flatShading:g.wireframe===!1&&(g.flatShading===!0||I.attributes.normal===void 0&&de===!1&&(g.isMeshLambertMaterial||g.isMeshPhongMaterial||g.isMeshStandardMaterial||g.isMeshPhysicalMaterial)),sizeAttenuation:g.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:nt,skinning:L.isSkinnedMesh===!0,hasPositionAttribute:I.attributes.position!==void 0,morphTargets:I.morphAttributes.position!==void 0,morphNormals:I.morphAttributes.normal!==void 0,morphColors:I.morphAttributes.color!==void 0,morphTargetsCount:tt,morphTextureStride:Mt,numSunLights:b.sun.length,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numSunLightShadows:b.sunShadowMap.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numLightProbeGrids:U.filter(gt=>gt.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:g.dithering,shadowMapEnabled:i.shadowMap.enabled&&N.length>0,shadowMapType:i.shadowMap.type,toneMapping:st,decodeVideoTexture:wt&&g.map.isVideoTexture===!0&&Zt.getTransfer(g.map.colorSpace)===ne,decodeVideoTextureEmissive:Te&&g.emissiveMap.isVideoTexture===!0&&Zt.getTransfer(g.emissiveMap.colorSpace)===ne,premultipliedAlpha:g.premultipliedAlpha,doubleSided:g.side===on,flipSided:g.side===Ve,useDepthPacking:g.depthPacking>=0,depthPacking:g.depthPacking||0,index0AttributeName:g.index0AttributeName,extensionClipCullDistance:Gt&&g.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Gt&&g.extensions.multiDraw===!0||Vt)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:g.customProgramCacheKey()};return kt.vertexUv1s=c.has(1),kt.vertexUv2s=c.has(2),kt.vertexUv3s=c.has(3),c.clear(),kt}function x(g){const b=[];if(g.shaderID?b.push(g.shaderID):(b.push(g.customVertexShaderID),b.push(g.customFragmentShaderID)),g.defines!==void 0)for(const N in g.defines)b.push(N),b.push(g.defines[N]);return g.isRawShaderMaterial===!1&&(p(b,g),f(b,g),b.push(i.outputColorSpace)),b.push(g.customProgramCacheKey),b.join()}function p(g,b){g.push(b.precision),g.push(b.outputColorSpace),g.push(b.envMapMode),g.push(b.envMapPMREM),g.push(b.envMapMaxLod),g.push(b.envMapSize),g.push(b.mapUv),g.push(b.alphaMapUv),g.push(b.lightMapUv),g.push(b.aoMapUv),g.push(b.bumpMapUv),g.push(b.normalMapUv),g.push(b.displacementMapUv),g.push(b.emissiveMapUv),g.push(b.metalnessMapUv),g.push(b.roughnessMapUv),g.push(b.anisotropyMapUv),g.push(b.clearcoatMapUv),g.push(b.clearcoatNormalMapUv),g.push(b.clearcoatRoughnessMapUv),g.push(b.diffuseRoughnessMapUv),g.push(b.iridescenceMapUv),g.push(b.iridescenceThicknessMapUv),g.push(b.sheenColorMapUv),g.push(b.sheenRoughnessMapUv),g.push(b.specularMapUv),g.push(b.specularColorMapUv),g.push(b.specularIntensityMapUv),g.push(b.transmissionMapUv),g.push(b.thicknessMapUv),g.push(b.combine),g.push(b.fogExp2),g.push(b.sizeAttenuation),g.push(b.morphTargetsCount),g.push(b.numSunLights),g.push(b.numDirLights),g.push(b.numPointLights),g.push(b.numSpotLights),g.push(b.numSpotLightMaps),g.push(b.numHemiLights),g.push(b.numRectAreaLights),g.push(b.numSunLightShadows),g.push(b.numDirLightShadows),g.push(b.numPointLightShadows),g.push(b.numSpotLightShadows),g.push(b.numSpotLightShadowsWithMaps),g.push(b.numLightProbes),g.push(b.numLightProbeGrids),g.push(b.shadowMapType),g.push(b.toneMapping),g.push(b.numClippingPlanes),g.push(b.numClipIntersection),g.push(b.depthPacking)}function f(g,b){a.disableAll(),b.instancing&&a.enable(0),b.instancingColor&&a.enable(1),b.instancingMorph&&a.enable(2),b.matcap&&a.enable(3),b.envMap&&a.enable(4),b.normalMapObjectSpace&&a.enable(5),b.normalMapTangentSpace&&a.enable(6),b.clearcoat&&a.enable(7),b.iridescence&&a.enable(8),b.alphaTest&&a.enable(9),b.vertexColors&&a.enable(10),b.vertexAlphas&&a.enable(11),b.vertexUv1s&&a.enable(12),b.vertexUv2s&&a.enable(13),b.vertexUv3s&&a.enable(14),b.vertexTangents&&a.enable(15),b.anisotropy&&a.enable(16),b.alphaHash&&a.enable(17),b.batching&&a.enable(18),b.dispersion&&a.enable(19),b.retroreflection&&a.enable(24),b.diffuseRoughness&&a.enable(25),b.batchingColor&&a.enable(20),b.gradientMap&&a.enable(21),b.packedNormalMap&&a.enable(22),b.vertexNormals&&a.enable(23),g.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.reversedDepthBuffer&&a.enable(4),b.skinning&&a.enable(5),b.morphTargets&&a.enable(6),b.morphNormals&&a.enable(7),b.morphColors&&a.enable(8),b.premultipliedAlpha&&a.enable(9),b.shadowMapEnabled&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),b.decodeVideoTextureEmissive&&a.enable(20),b.alphaToCoverage&&a.enable(21),b.numLightProbeGrids>0&&a.enable(22),b.hasPositionAttribute&&a.enable(23),g.push(a.mask)}function v(g){const b=h[g.type];let N;if(b){const R=yn[b];N=kh.clone(R.uniforms)}else N=g.uniforms;return N}function E(g,b){let N=d.get(b);return N!==void 0?++N.usedTimes:(N=new fm(i,b,g,s),l.push(N),d.set(b,N)),N}function y(g){if(--g.usedTimes===0){const b=l.indexOf(g);l[b]=l[l.length-1],l.pop(),d.delete(g.cacheKey),g.destroy()}}function w(g){o.remove(g)}function A(){o.dispose()}return{getParameters:_,getProgramCacheKey:x,getUniforms:v,acquireProgram:E,releaseProgram:y,releaseShaderCache:w,programs:l,dispose:A}}function vm(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,c){i.get(a)[o]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function Mm(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function El(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function wl(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(h){let m=0;return h.isInstancedMesh&&(m+=2),h.isSkinnedMesh&&(m+=1),m}function o(h,m,_,x,p,f){let v=i[t];return v===void 0?(v={id:h.id,object:h,geometry:m,material:_,materialVariant:a(h),groupOrder:x,renderOrder:h.renderOrder,z:p,group:f},i[t]=v):(v.id=h.id,v.object=h,v.geometry=m,v.material=_,v.materialVariant=a(h),v.groupOrder=x,v.renderOrder=h.renderOrder,v.z=p,v.group=f),t++,v}function c(h,m,_,x,p,f,v){v.reversedDepth===!0&&(p=-p);const E=o(h,m,_,x,p,f);_.transmission>0?n.push(E):_.transparent===!0?s.push(E):e.push(E)}function l(h,m,_,x,p,f){const v=o(h,m,_,x,p,f);_.transmission>0?n.unshift(v):_.transparent===!0?s.unshift(v):e.unshift(v)}function d(h,m){e.length>1&&e.sort(h||Mm),n.length>1&&n.sort(m||El),s.length>1&&s.sort(m||El)}function u(){for(let h=t,m=i.length;h<m;h++){const _=i[h];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:c,unshift:l,finish:u,sort:d}}function Sm(){let i=new WeakMap;function t(n,s){const r=i.get(n);let a;return r===void 0?(a=new wl,i.set(n,[a])):s>=r.length?(a=new wl,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function ym(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new C,color:new Nt};break;case"SpotLight":e={position:new C,direction:new C,color:new Nt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new C,color:new Nt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new C,skyColor:new Nt,groundColor:new Nt};break;case"RectAreaLight":e={color:new Nt,position:new C,halfWidth:new C,halfHeight:new C};break}return i[t.id]=e,e}}}function bm(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ut};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ut};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ut,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let Em=0;function wm(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function Tm(i){const t=new ym,e=bm(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new C);const s=new C,r=new Qt,a=new Qt;function o(l){let d=0,u=0,h=0;for(let U=0;U<9;U++)n.probe[U].set(0,0,0);let m=0,_=0,x=0,p=0,f=0,v=0,E=0,y=0,w=0,A=0,g=0,b=0,N=0,R=0;l.sort(wm);for(let U=0,G=l.length;U<G;U++){const I=l[U],H=I.color,Z=I.intensity,z=I.distance;let et=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===li?et=I.shadow.map.texture:et=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)d+=H.r*Z,u+=H.g*Z,h+=H.b*Z;else if(I.isLightProbe){for(let V=0;V<9;V++)n.probe[V].addScaledVector(I.sh.coefficients[V],Z);R++}else if(I.isSunLight){const V=t.get(I);if(V.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const j=I.shadow,tt=e.get(I);tt.shadowIntensity=j.intensity,tt.shadowBias=j.bias,tt.shadowNormalBias=j.normalBias,tt.shadowRadius=j.radius,tt.shadowMapSize.copy(j.mapSize).multiply(j.getFrameExtents()),n.sunShadow[_]=tt,n.sunShadowMap[_]=et;const Mt=j.getViewportCount();for(let Lt=0;Lt<Mt;Lt++)n.sunShadowMatrix[x+Lt]=j.getMatrix(Lt),n.sunShadowCascade[x+Lt]=j._cascadeData[Lt];x+=Mt,_++}n.sun[m]=V,m++}else if(I.isDirectionalLight){const V=t.get(I);if(V.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const j=I.shadow,tt=e.get(I);tt.shadowIntensity=j.intensity,tt.shadowBias=j.bias,tt.shadowNormalBias=j.normalBias,tt.shadowRadius=j.radius,tt.shadowMapSize=j.mapSize,n.directionalShadow[p]=tt,n.directionalShadowMap[p]=et,n.directionalShadowMatrix[p]=I.shadow.matrix,w++}n.directional[p]=V,p++}else if(I.isSpotLight){const V=t.get(I);V.position.setFromMatrixPosition(I.matrixWorld),V.color.copy(H).multiplyScalar(Z),V.distance=z,V.coneCos=Math.cos(I.angle),V.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),V.decay=I.decay,n.spot[v]=V;const j=I.shadow;if(I.map&&(n.spotLightMap[b]=I.map,b++,j.updateMatrices(I),I.castShadow&&N++),n.spotLightMatrix[v]=j.matrix,I.castShadow){const tt=e.get(I);tt.shadowIntensity=j.intensity,tt.shadowBias=j.bias,tt.shadowNormalBias=j.normalBias,tt.shadowRadius=j.radius,tt.shadowMapSize=j.mapSize,n.spotShadow[v]=tt,n.spotShadowMap[v]=et,g++}v++}else if(I.isRectAreaLight){const V=t.get(I);V.color.copy(H).multiplyScalar(Z),V.halfWidth.set(I.width*.5,0,0),V.halfHeight.set(0,I.height*.5,0),n.rectArea[E]=V,E++}else if(I.isPointLight){const V=t.get(I);if(V.color.copy(I.color).multiplyScalar(I.intensity),V.distance=I.distance,V.decay=I.decay,I.castShadow){const j=I.shadow,tt=e.get(I);tt.shadowIntensity=j.intensity,tt.shadowBias=j.bias,tt.shadowNormalBias=j.normalBias,tt.shadowRadius=j.radius,tt.shadowMapSize=j.mapSize,tt.shadowCameraNear=j.camera.near,tt.shadowCameraFar=j.camera.far,n.pointShadow[f]=tt,n.pointShadowMap[f]=et,n.pointShadowMatrix[f]=I.shadow.matrix,A++}n.point[f]=V,f++}else if(I.isHemisphereLight){const V=t.get(I);V.skyColor.copy(I.color).multiplyScalar(Z),V.groundColor.copy(I.groundColor).multiplyScalar(Z),n.hemi[y]=V,y++}}E>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=_t.LTC_FLOAT_1,n.rectAreaLTC2=_t.LTC_FLOAT_2):(n.rectAreaLTC1=_t.LTC_HALF_1,n.rectAreaLTC2=_t.LTC_HALF_2)),n.ambient[0]=d,n.ambient[1]=u,n.ambient[2]=h;const L=n.hash;(L.sunLength!==m||L.directionalLength!==p||L.pointLength!==f||L.spotLength!==v||L.rectAreaLength!==E||L.hemiLength!==y||L.numSunShadows!==_||L.numDirectionalShadows!==w||L.numPointShadows!==A||L.numSpotShadows!==g||L.numSpotMaps!==b||L.numLightProbes!==R)&&(n.sun.length=m,n.directional.length=p,n.spot.length=v,n.rectArea.length=E,n.point.length=f,n.hemi.length=y,n.sunShadow.length=_,n.sunShadowMap.length=_,n.sunShadowMatrix.length=x,n.sunShadowCascade.length=x,n.directionalShadow.length=w,n.directionalShadowMap.length=w,n.directionalShadowMatrix.length=w,n.pointShadow.length=A,n.pointShadowMap.length=A,n.pointShadowMatrix.length=A,n.spotShadow.length=g,n.spotShadowMap.length=g,n.spotLightMatrix.length=g+b-N,n.spotLightMap.length=b,n.numSpotLightShadowsWithMaps=N,n.numLightProbes=R,L.sunLength=m,L.directionalLength=p,L.pointLength=f,L.spotLength=v,L.rectAreaLength=E,L.hemiLength=y,L.numSunShadows=_,L.numDirectionalShadows=w,L.numPointShadows=A,L.numSpotShadows=g,L.numSpotMaps=b,L.numLightProbes=R,n.version=Em++)}function c(l,d){let u=0,h=0,m=0,_=0,x=0,p=0;const f=d.matrixWorldInverse;for(let v=0,E=l.length;v<E;v++){const y=l[v];if(y.isSunLight){const w=n.sun[u];w.direction.setFromMatrixPosition(y.matrixWorld),w.direction.transformDirection(f),u++}else if(y.isDirectionalLight){const w=n.directional[h];w.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(f),h++}else if(y.isSpotLight){const w=n.spot[_];w.position.setFromMatrixPosition(y.matrixWorld),w.position.applyMatrix4(f),w.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(f),_++}else if(y.isRectAreaLight){const w=n.rectArea[x];w.position.setFromMatrixPosition(y.matrixWorld),w.position.applyMatrix4(f),a.identity(),r.copy(y.matrixWorld),r.premultiply(f),a.extractRotation(r),w.halfWidth.set(y.width*.5,0,0),w.halfHeight.set(0,y.height*.5,0),w.halfWidth.applyMatrix4(a),w.halfHeight.applyMatrix4(a),x++}else if(y.isPointLight){const w=n.point[m];w.position.setFromMatrixPosition(y.matrixWorld),w.position.applyMatrix4(f),m++}else if(y.isHemisphereLight){const w=n.hemi[p];w.direction.setFromMatrixPosition(y.matrixWorld),w.direction.transformDirection(f),p++}}}return{setup:o,setupView:c,state:n}}function Tl(i){const t=new Tm(i),e=[],n=[],s=[];function r(u){d.camera=u,e.length=0,n.length=0,s.length=0}function a(u){u.isLightProbeGrid?s.push(u):e.push(u)}function o(u){n.push(u)}function c(){t.setup(e),s.sort((u,h)=>u.priority-h.priority||u.id-h.id)}function l(u){t.setupView(e,u)}const d={lightsArray:e,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:c,setupLightsView:l,pushLight:a,pushShadow:o}}function Am(i){let t=new WeakMap;function e(s,r=0){const a=t.get(s);let o;return a===void 0?(o=new Tl(i),t.set(s,[o])):r>=a.length?(o=new Tl(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}const Rm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Cm=`uniform sampler2D shadow_pass;
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
}`,Pm=[new C(1,0,0),new C(-1,0,0),new C(0,1,0),new C(0,-1,0),new C(0,0,1),new C(0,0,-1)],Lm=[new C(0,-1,0),new C(0,-1,0),new C(0,0,1),new C(0,0,-1),new C(0,-1,0),new C(0,-1,0)],Al=new Qt,ts=new C,$r=new C;function Im(i,t,e){let n=new hs;const s=new Ut,r=new Ut,a=new pe,o=new Wh,c=new Xh,l={},d=e.maxTextureSize,u={[oi]:Ve,[Ve]:oi,[on]:on},h=new On({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ut},radius:{value:4}},vertexShader:Rm,fragmentShader:Cm}),m=h.clone();m.defines.HORIZONTAL_PASS=1;const _=new _e;_.setAttribute("position",new qe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new at(_,h),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ys;let f=this.type;this.render=function(A,g,b){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||A.length===0)return;this.type===Dc&&(Dt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Ys);const N=i.getRenderTarget(),R=i.getActiveCubeFace(),L=i.getActiveMipmapLevel(),U=i.state;U.setBlending(Ni),U.buffers.depth.getReversed()===!0?U.buffers.color.setClear(0,0,0,0):U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const G=f!==this.type;G&&g.traverse(function(I){I.material&&(Array.isArray(I.material)?I.material.forEach(H=>H.needsUpdate=!0):I.material.needsUpdate=!0)});for(let I=0,H=A.length;I<H;I++){const Z=A[I],z=Z.shadow;if(z===void 0){Dt("WebGLShadowMap:",Z,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;s.copy(z.mapSize);const et=z.getFrameExtents();s.multiply(et),r.copy(z.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(r.x=Math.floor(d/et.x),s.x=r.x*et.x,z.mapSize.x=r.x),s.y>d&&(r.y=Math.floor(d/et.y),s.y=r.y*et.y,z.mapSize.y=r.y));const V=i.state.buffers.depth.getReversed();if(z.camera._reversedDepth=V,z.map===null||G===!0){if(z.map!==null&&(z.map.depthTexture!==null&&(z.map.depthTexture.dispose(),z.map.depthTexture=null),z.map.dispose()),this.type===ns){if(Z.isPointLight){Dt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}z.map=new En(s.x,s.y,{format:li,type:Tn,minFilter:Xe,magFilter:Xe,generateMipmaps:!1}),z.map.texture.name=Z.name+".shadowMap",z.map.depthTexture=new zi(s.x,s.y,mn),z.map.depthTexture.name=Z.name+".shadowMapDepth",z.map.depthTexture.format=Jn,z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=Ie,z.map.depthTexture.magFilter=Ie}else Z.isPointLight?(z.map=new oo(s.x),z.map.depthTexture=new oc(s.x,wn)):(z.map=new En(s.x,s.y),z.map.depthTexture=new zi(s.x,s.y,wn)),z.map.depthTexture.name=Z.name+".shadowMap",z.map.depthTexture.format=Jn,this.type===Ys?(z.map.depthTexture.compareFunction=V?ql:Xl,z.map.depthTexture.minFilter=Xe,z.map.depthTexture.magFilter=Xe):(z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=Ie,z.map.depthTexture.magFilter=Ie);z.camera.updateProjectionMatrix()}z.map.isWebGLCubeRenderTarget!==!0&&(z.map.width!==s.x||z.map.height!==s.y)&&z.map.setSize(s.x,s.y);const j=z.map.isWebGLCubeRenderTarget?6:z.getViewportCount();Z.isPointLight!==!0&&z.updateMatrices(Z,b);const tt=(z.camera.layers.mask&4294967294)!==0?z.camera.layers:b.layers;for(let Mt=0;Mt<j;Mt++){const Lt=z.getCamera(Mt);if(Z.isPointLight){const Y=z.camera,ut=z.matrix,xt=Z.distance||Y.far;xt!==Y.far&&(Y.far=xt,Y.updateProjectionMatrix()),ts.setFromMatrixPosition(Z.matrixWorld),Y.position.copy(ts),$r.copy(Y.position),$r.add(Pm[Mt]),Y.up.copy(Lm[Mt]),Y.lookAt($r),Y.updateMatrixWorld(),ut.makeTranslation(-ts.x,-ts.y,-ts.z),Al.multiplyMatrices(Y.projectionMatrix,Y.matrixWorldInverse),z._frustum.setFromProjectionMatrix(Al,Y.coordinateSystem,Y.reversedDepth)}if(z.map.isWebGLCubeRenderTarget)i.setRenderTarget(z.map,Mt),i.clear();else{Mt===0&&(i.setRenderTarget(z.map),i.clear());const Y=z.getViewport(Mt);a.set(r.x*Y.x,r.y*Y.y,r.x*Y.z,r.y*Y.w),U.viewport(a)}n=z.getFrustum(Mt),y(g,b,Lt,Z,tt,this.type)}z.isPointLightShadow!==!0&&this.type===ns&&v(z,b),z.needsUpdate=!1}f=this.type,p.needsUpdate=!1,i.setRenderTarget(N,R,L)};function v(A,g){const b=t.update(x);h.defines.VSM_SAMPLES!==A.blurSamples&&(h.defines.VSM_SAMPLES=A.blurSamples,m.defines.VSM_SAMPLES=A.blurSamples,h.needsUpdate=!0,m.needsUpdate=!0),A.mapPass===null?A.mapPass=new En(s.x,s.y,{format:li,type:Tn}):(A.mapPass.width!==A.map.width||A.mapPass.height!==A.map.height)&&A.mapPass.setSize(A.map.width,A.map.height),h.uniforms.shadow_pass.value=A.map.depthTexture,h.uniforms.resolution.value.set(A.map.width,A.map.height),h.uniforms.radius.value=A.radius,i.setRenderTarget(A.mapPass),i.clear(),i.renderBufferDirect(g,null,b,h,x,null),m.uniforms.shadow_pass.value=A.mapPass.texture,m.uniforms.resolution.value.set(A.map.width,A.map.height),m.uniforms.radius.value=A.radius,i.setRenderTarget(A.map),i.clear(),i.renderBufferDirect(g,null,b,m,x,null)}function E(A,g,b,N){let R=null;const L=b.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(L!==void 0)R=L;else if(R=b.isPointLight===!0?c:o,i.localClippingEnabled&&g.clipShadows===!0&&Array.isArray(g.clippingPlanes)&&g.clippingPlanes.length!==0||g.displacementMap&&g.displacementScale!==0||g.alphaMap&&g.alphaTest>0||g.map&&g.alphaTest>0||g.alphaToCoverage===!0){const U=R.uuid,G=g.uuid;let I=l[U];I===void 0&&(I={},l[U]=I);let H=I[G];H===void 0&&(H=R.clone(),I[G]=H,g.addEventListener("dispose",w)),R=H}if(R.visible=g.visible,R.wireframe=g.wireframe,N===ns?R.side=g.shadowSide!==null?g.shadowSide:g.side:R.side=g.shadowSide!==null?g.shadowSide:u[g.side],R.alphaMap=g.alphaMap,R.alphaTest=g.alphaToCoverage===!0?.5:g.alphaTest,R.map=g.map,R.clipShadows=g.clipShadows,R.clippingPlanes=g.clippingPlanes,R.clipIntersection=g.clipIntersection,R.displacementMap=g.displacementMap,R.displacementScale=g.displacementScale,R.displacementBias=g.displacementBias,R.wireframeLinewidth=g.wireframeLinewidth,R.linewidth=g.linewidth,b.isPointLight===!0&&R.isMeshDistanceMaterial===!0){const U=i.properties.get(R);U.light=b}return R}function y(A,g,b,N,R,L){if(A.visible===!1)return;if(A.layers.test(R)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&L===ns)&&(!A.frustumCulled||A.intersectsFrustum(n))){A.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,A.matrixWorld);const I=t.update(A),H=A.material;if(Array.isArray(H)){const Z=I.groups;for(let z=0,et=Z.length;z<et;z++){const V=Z[z],j=H[V.materialIndex];if(j&&j.visible){const tt=E(A,j,N,L);A.onBeforeShadow(i,A,g,b,I,tt,V),i.renderBufferDirect(b,null,I,tt,A,V),A.onAfterShadow(i,A,g,b,I,tt,V)}}}else if(H.visible){const Z=E(A,H,N,L);A.onBeforeShadow(i,A,g,b,I,Z,null),i.renderBufferDirect(b,null,I,Z,A,null),A.onAfterShadow(i,A,g,b,I,Z,null)}}const G=A.children;for(let I=0,H=G.length;I<H;I++)y(G[I],g,b,N,R,L)}function w(A){A.target.removeEventListener("dispose",w);for(const b in l){const N=l[b],R=A.target.uuid;R in N&&(N[R].dispose(),delete N[R])}}}function Dm(i,t){function e(){let P=!1;const J=new pe;let q=null;const ht=new pe(0,0,0,0);return{setMask:function(rt){q!==rt&&!P&&(i.colorMask(rt,rt,rt,rt),q=rt)},setLocked:function(rt){P=rt},setClear:function(rt,lt,Rt,Gt,st){st===!0&&(rt*=Gt,lt*=Gt,Rt*=Gt),J.set(rt,lt,Rt,Gt),ht.equals(J)===!1&&(i.clearColor(rt,lt,Rt,Gt),ht.copy(J))},reset:function(){P=!1,q=null,ht.set(-1,0,0,0)}}}function n(){let P=!1,J=!1,q=null,ht=null,rt=null;return{setReversed:function(lt){if(J!==lt){const Rt=t.get("EXT_clip_control");lt?Rt.clipControlEXT(Rt.LOWER_LEFT_EXT,Rt.ZERO_TO_ONE_EXT):Rt.clipControlEXT(Rt.LOWER_LEFT_EXT,Rt.NEGATIVE_ONE_TO_ONE_EXT),J=lt;const Gt=rt;rt=null,this.setClear(Gt)}},getReversed:function(){return J},setTest:function(lt){lt?nt(i.DEPTH_TEST):St(i.DEPTH_TEST)},setMask:function(lt){q!==lt&&!P&&(i.depthMask(lt),q=lt)},setFunc:function(lt){if(J&&(lt=dh[lt]),ht!==lt){switch(lt){case jr:i.depthFunc(i.NEVER);break;case ta:i.depthFunc(i.ALWAYS);break;case ea:i.depthFunc(i.LESS);break;case rs:i.depthFunc(i.LEQUAL);break;case na:i.depthFunc(i.EQUAL);break;case ia:i.depthFunc(i.GEQUAL);break;case sa:i.depthFunc(i.GREATER);break;case ra:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ht=lt}},setLocked:function(lt){P=lt},setClear:function(lt){rt!==lt&&(rt=lt,J&&(lt=1-lt),i.clearDepth(lt))},reset:function(){P=!1,q=null,ht=null,rt=null,J=!1}}}function s(){let P=!1,J=null,q=null,ht=null,rt=null,lt=null,Rt=null,Gt=null,st=null;return{setTest:function(Ct){P||(Ct?nt(i.STENCIL_TEST):St(i.STENCIL_TEST))},setMask:function(Ct){J!==Ct&&!P&&(i.stencilMask(Ct),J=Ct)},setFunc:function(Ct,kt,gt){(q!==Ct||ht!==kt||rt!==gt)&&(i.stencilFunc(Ct,kt,gt),q=Ct,ht=kt,rt=gt)},setOp:function(Ct,kt,gt){(lt!==Ct||Rt!==kt||Gt!==gt)&&(i.stencilOp(Ct,kt,gt),lt=Ct,Rt=kt,Gt=gt)},setLocked:function(Ct){P=Ct},setClear:function(Ct){st!==Ct&&(i.clearStencil(Ct),st=Ct)},reset:function(){P=!1,J=null,q=null,ht=null,rt=null,lt=null,Rt=null,Gt=null,st=null}}}const r=new e,a=new n,o=new s;let c={};const l=new WeakMap;let d={},u={},h={},m=new WeakMap,_=[],x=null,p=!1,f=null,v=null,E=null,y=null,w=null,A=null,g=null,b=new Nt(0,0,0),N=0,R=!1,L=null,U=null,G=null,I=null,H=null;const Z=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let z=!1,et=0;const V=i.getParameter(i.VERSION);V.indexOf("WebGL")!==-1?(et=parseFloat(/^WebGL (\d)/.exec(V)[1]),z=et>=1):V.indexOf("OpenGL ES")!==-1&&(et=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),z=et>=2);let j=null,tt={};const Mt=i.getParameter(i.SCISSOR_BOX),Lt=i.getParameter(i.VIEWPORT),Y=new pe().fromArray(Mt),ut=new pe().fromArray(Lt);function xt(P,J,q,ht){const rt=new Uint8Array(4),lt=i.createTexture();i.bindTexture(P,lt),i.texParameteri(P,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(P,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Rt=0;Rt<q;Rt++)P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY?i.texImage3D(J,0,i.RGBA,1,1,ht,0,i.RGBA,i.UNSIGNED_BYTE,rt):i.texImage2D(J+Rt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,rt);return lt}const Tt={};Tt[i.TEXTURE_2D]=xt(i.TEXTURE_2D,i.TEXTURE_2D,1),Tt[i.TEXTURE_CUBE_MAP]=xt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Tt[i.TEXTURE_2D_ARRAY]=xt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Tt[i.TEXTURE_3D]=xt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),nt(i.DEPTH_TEST),a.setFunc(rs),We(!1),de(Eo),nt(i.CULL_FACE),Pe(Ni);function nt(P){d[P]!==!0&&(i.enable(P),d[P]=!0)}function St(P){d[P]!==!1&&(i.disable(P),d[P]=!1)}function Vt(P,J){return h[P]!==J?(i.bindFramebuffer(P,J),h[P]=J,P===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=J),P===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=J),!0):!1}function wt(P,J){let q=_,ht=!1;if(P){q=m.get(J),q===void 0&&(q=[],m.set(J,q));const rt=P.textures;if(q.length!==rt.length||q[0]!==i.COLOR_ATTACHMENT0){for(let lt=0,Rt=rt.length;lt<Rt;lt++)q[lt]=i.COLOR_ATTACHMENT0+lt;q.length=rt.length,ht=!0}}else q[0]!==i.BACK&&(q[0]=i.BACK,ht=!0);ht&&i.drawBuffers(q)}function Yt(P){return x!==P?(i.useProgram(P),x=P,!0):!1}const Kt={[Ii]:i.FUNC_ADD,[Uc]:i.FUNC_SUBTRACT,[Fc]:i.FUNC_REVERSE_SUBTRACT};Kt[Oc]=i.MIN,Kt[Bc]=i.MAX;const Wt={[zc]:i.ZERO,[kc]:i.ONE,[Gc]:i.SRC_COLOR,[Pl]:i.SRC_ALPHA,[Yc]:i.SRC_ALPHA_SATURATE,[Xc]:i.DST_COLOR,[Vc]:i.DST_ALPHA,[Hc]:i.ONE_MINUS_SRC_COLOR,[Ll]:i.ONE_MINUS_SRC_ALPHA,[qc]:i.ONE_MINUS_DST_COLOR,[Wc]:i.ONE_MINUS_DST_ALPHA,[Kc]:i.CONSTANT_COLOR,[Zc]:i.ONE_MINUS_CONSTANT_COLOR,[$c]:i.CONSTANT_ALPHA,[Jc]:i.ONE_MINUS_CONSTANT_ALPHA};function Pe(P,J,q,ht,rt,lt,Rt,Gt,st,Ct){if(P===Ni){p===!0&&(St(i.BLEND),p=!1);return}if(p===!1&&(nt(i.BLEND),p=!0),P!==Nc){if(P!==f||Ct!==R){if((v!==Ii||w!==Ii)&&(i.blendEquation(i.FUNC_ADD),v=Ii,w=Ii),Ct)switch(P){case ss:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case he:i.blendFunc(i.ONE,i.ONE);break;case wo:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case To:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:jt("WebGLState: Invalid blending: ",P);break}else switch(P){case ss:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case he:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case wo:jt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case To:jt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:jt("WebGLState: Invalid blending: ",P);break}E=null,y=null,A=null,g=null,b.set(0,0,0),N=0,f=P,R=Ct}return}rt=rt||J,lt=lt||q,Rt=Rt||ht,(J!==v||rt!==w)&&(i.blendEquationSeparate(Kt[J],Kt[rt]),v=J,w=rt),(q!==E||ht!==y||lt!==A||Rt!==g)&&(i.blendFuncSeparate(Wt[q],Wt[ht],Wt[lt],Wt[Rt]),E=q,y=ht,A=lt,g=Rt),(Gt.equals(b)===!1||st!==N)&&(i.blendColor(Gt.r,Gt.g,Gt.b,st),b.copy(Gt),N=st),f=P,R=!1}function ye(P,J){P.side===on?St(i.CULL_FACE):nt(i.CULL_FACE);let q=P.side===Ve;J&&(q=!q),We(q),P.blending===ss&&P.transparent===!1?Pe(Ni):Pe(P.blending,P.blendEquation,P.blendSrc,P.blendDst,P.blendEquationAlpha,P.blendSrcAlpha,P.blendDstAlpha,P.blendColor,P.blendAlpha,P.premultipliedAlpha),a.setFunc(P.depthFunc),a.setTest(P.depthTest),a.setMask(P.depthWrite),r.setMask(P.colorWrite);const ht=P.stencilWrite;o.setTest(ht),ht&&(o.setMask(P.stencilWriteMask),o.setFunc(P.stencilFunc,P.stencilRef,P.stencilFuncMask),o.setOp(P.stencilFail,P.stencilZFail,P.stencilZPass)),Te(P.polygonOffset,P.polygonOffsetFactor,P.polygonOffsetUnits),P.alphaToCoverage===!0?nt(i.SAMPLE_ALPHA_TO_COVERAGE):St(i.SAMPLE_ALPHA_TO_COVERAGE)}function We(P){L!==P&&(P?i.frontFace(i.CW):i.frontFace(i.CCW),L=P)}function de(P){P!==Lc?(nt(i.CULL_FACE),P!==U&&(P===Eo?i.cullFace(i.BACK):P===Ic?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):St(i.CULL_FACE),U=P}function vn(P){P!==G&&(z&&i.lineWidth(P),G=P)}function Te(P,J,q){P?(nt(i.POLYGON_OFFSET_FILL),(I!==J||H!==q)&&(I=J,H=q,a.getReversed()&&(J=-J,q=-q),i.polygonOffset(J,q))):St(i.POLYGON_OFFSET_FILL)}function Qe(P){P?nt(i.SCISSOR_TEST):St(i.SCISSOR_TEST)}function je(P){P===void 0&&(P=i.TEXTURE0+Z-1),j!==P&&(i.activeTexture(P),j=P)}function tn(P,J,q){q===void 0&&(j===null?q=i.TEXTURE0+Z-1:q=j);let ht=tt[q];ht===void 0&&(ht={type:void 0,texture:void 0},tt[q]=ht),(ht.type!==P||ht.texture!==J)&&(j!==q&&(i.activeTexture(q),j=q),i.bindTexture(P,J||Tt[P]),ht.type=P,ht.texture=J)}function F(){const P=tt[j];P!==void 0&&P.type!==void 0&&(i.bindTexture(P.type,null),P.type=void 0,P.texture=void 0)}function en(){try{i.compressedTexImage2D(...arguments)}catch(P){jt("WebGLState:",P)}}function le(){try{i.compressedTexImage3D(...arguments)}catch(P){jt("WebGLState:",P)}}function ce(){try{i.texSubImage2D(...arguments)}catch(P){jt("WebGLState:",P)}}function mt(){try{i.texSubImage3D(...arguments)}catch(P){jt("WebGLState:",P)}}function be(){try{i.compressedTexSubImage2D(...arguments)}catch(P){jt("WebGLState:",P)}}function Pt(){try{i.compressedTexSubImage3D(...arguments)}catch(P){jt("WebGLState:",P)}}function Ft(){try{i.texStorage2D(...arguments)}catch(P){jt("WebGLState:",P)}}function T(){try{i.texStorage3D(...arguments)}catch(P){jt("WebGLState:",P)}}function M(){try{i.texImage2D(...arguments)}catch(P){jt("WebGLState:",P)}}function B(){try{i.texImage3D(...arguments)}catch(P){jt("WebGLState:",P)}}function it(P){return u[P]!==void 0?u[P]:i.getParameter(P)}function Q(P,J){u[P]!==J&&(i.pixelStorei(P,J),u[P]=J)}function ot(P){Y.equals(P)===!1&&(i.scissor(P.x,P.y,P.z,P.w),Y.copy(P))}function ft(P){ut.equals(P)===!1&&(i.viewport(P.x,P.y,P.z,P.w),ut.copy(P))}function K(P,J){let q=l.get(J);q===void 0&&(q=new WeakMap,l.set(J,q));let ht=q.get(P);ht===void 0&&(ht=i.getUniformBlockIndex(J,P.name),i.uniformBlockBinding(J,ht,ht),q.set(P,ht))}function $(P,J,q){const rt=l.get(J).get(P);c[rt]!==q&&(i.bindBufferBase(i.UNIFORM_BUFFER,rt,q),c[rt]=q)}function ct(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),d={},u={},j=null,tt={},h={},c={},m=new WeakMap,_=[],x=null,p=!1,f=null,v=null,E=null,y=null,w=null,A=null,g=null,b=new Nt(0,0,0),N=0,R=!1,L=null,U=null,G=null,I=null,H=null,Y.set(0,0,i.canvas.width,i.canvas.height),ut.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:nt,disable:St,bindFramebuffer:Vt,drawBuffers:wt,useProgram:Yt,setBlending:Pe,setMaterial:ye,setFlipSided:We,setCullFace:de,setLineWidth:vn,setPolygonOffset:Te,setScissorTest:Qe,activeTexture:je,bindTexture:tn,unbindTexture:F,compressedTexImage2D:en,compressedTexImage3D:le,texImage2D:M,texImage3D:B,pixelStorei:Q,getParameter:it,updateUBOMapping:K,uniformBlockBinding:$,texStorage2D:Ft,texStorage3D:T,texSubImage2D:ce,texSubImage3D:mt,compressedTexSubImage2D:be,compressedTexSubImage3D:Pt,scissor:ot,viewport:ft,reset:ct}}function Nm(i,t,e,n,s,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Ut,d=new WeakMap,u=new Set;let h;const m=new WeakMap,_=new Set,x=new FinalizationRegistry(T=>_.delete(T));let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function f(T,M){return p?new OffscreenCanvas(T,M):rr("canvas")}function v(T,M,B){let it=1;const Q=Ft(T);if((Q.width>B||Q.height>B)&&(it=B/Math.max(Q.width,Q.height)),it<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const ot=Math.floor(it*Q.width),ft=Math.floor(it*Q.height);h===void 0&&(h=f(ot,ft));const K=M?f(ot,ft):h;return K.width=ot,K.height=ft,K.getContext("2d").drawImage(T,0,0,ot,ft),Dt("WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+ot+"x"+ft+")."),K}else return"data"in T&&Dt("WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),T;return T}function E(T){return T.generateMipmaps}function y(T){i.generateMipmap(T)}function w(T){return T.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?i.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function A(T,M,B,it,Q,ot=!1){if(T!==null){if(i[T]!==void 0)return i[T];Dt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let ft;it&&(ft=t.get("EXT_texture_norm16"),ft||Dt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let K=M;if(M===i.RED&&(B===i.FLOAT&&(K=i.R32F),B===i.HALF_FLOAT&&(K=i.R16F),B===i.UNSIGNED_BYTE&&(K=i.R8),B===i.UNSIGNED_SHORT&&ft&&(K=ft.R16_EXT),B===i.SHORT&&ft&&(K=ft.R16_SNORM_EXT)),M===i.RED_INTEGER&&(B===i.UNSIGNED_BYTE&&(K=i.R8UI),B===i.UNSIGNED_SHORT&&(K=i.R16UI),B===i.UNSIGNED_INT&&(K=i.R32UI),B===i.BYTE&&(K=i.R8I),B===i.SHORT&&(K=i.R16I),B===i.INT&&(K=i.R32I)),M===i.RG&&(B===i.FLOAT&&(K=i.RG32F),B===i.HALF_FLOAT&&(K=i.RG16F),B===i.UNSIGNED_BYTE&&(K=i.RG8),B===i.UNSIGNED_SHORT&&ft&&(K=ft.RG16_EXT),B===i.SHORT&&ft&&(K=ft.RG16_SNORM_EXT)),M===i.RG_INTEGER&&(B===i.UNSIGNED_BYTE&&(K=i.RG8UI),B===i.UNSIGNED_SHORT&&(K=i.RG16UI),B===i.UNSIGNED_INT&&(K=i.RG32UI),B===i.BYTE&&(K=i.RG8I),B===i.SHORT&&(K=i.RG16I),B===i.INT&&(K=i.RG32I)),M===i.RGB_INTEGER&&(B===i.UNSIGNED_BYTE&&(K=i.RGB8UI),B===i.UNSIGNED_SHORT&&(K=i.RGB16UI),B===i.UNSIGNED_INT&&(K=i.RGB32UI),B===i.BYTE&&(K=i.RGB8I),B===i.SHORT&&(K=i.RGB16I),B===i.INT&&(K=i.RGB32I)),M===i.RGBA_INTEGER&&(B===i.UNSIGNED_BYTE&&(K=i.RGBA8UI),B===i.UNSIGNED_SHORT&&(K=i.RGBA16UI),B===i.UNSIGNED_INT&&(K=i.RGBA32UI),B===i.BYTE&&(K=i.RGBA8I),B===i.SHORT&&(K=i.RGBA16I),B===i.INT&&(K=i.RGBA32I)),M===i.RGB&&(B===i.UNSIGNED_SHORT&&ft&&(K=ft.RGB16_EXT),B===i.SHORT&&ft&&(K=ft.RGB16_SNORM_EXT),B===i.UNSIGNED_INT_5_9_9_9_REV&&(K=i.RGB9_E5),B===i.UNSIGNED_INT_10F_11F_11F_REV&&(K=i.R11F_G11F_B10F)),M===i.RGBA){const $=ot?sr:Zt.getTransfer(Q);B===i.FLOAT&&(K=i.RGBA32F),B===i.HALF_FLOAT&&(K=i.RGBA16F),B===i.UNSIGNED_BYTE&&(K=$===ne?i.SRGB8_ALPHA8:i.RGBA8),B===i.UNSIGNED_SHORT&&ft&&(K=ft.RGBA16_EXT),B===i.SHORT&&ft&&(K=ft.RGBA16_SNORM_EXT),B===i.UNSIGNED_SHORT_4_4_4_4&&(K=i.RGBA4),B===i.UNSIGNED_SHORT_5_5_5_1&&(K=i.RGB5_A1)}return(K===i.R16F||K===i.R32F||K===i.RG16F||K===i.RG32F||K===i.RGBA16F||K===i.RGBA32F)&&t.get("EXT_color_buffer_float"),K}function g(T,M){let B;return T?M===null||M===wn||M===Bi?B=i.DEPTH24_STENCIL8:M===mn?B=i.DEPTH32F_STENCIL8:M===ls&&(B=i.DEPTH24_STENCIL8,Dt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===wn||M===Bi?B=i.DEPTH_COMPONENT24:M===mn?B=i.DEPTH_COMPONENT32F:M===ls&&(B=i.DEPTH_COMPONENT16),B}function b(T,M){return E(T)===!0||T.isFramebufferTexture&&T.minFilter!==Ie&&T.minFilter!==Xe?Math.log2(Math.max(M.width,M.height))+1:T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?M.mipmaps.length:1}function N(T){const M=new WeakRef(T);n.get(T).__ref=M,_.add(M),x.register(T,M,M)}function R(T){const M=n.get(T).__ref;M!==void 0&&(_.delete(M),x.unregister(M))}function L(T){G(T.target)}function U(T){I(T.target)}function G(T){T.removeEventListener("dispose",L),R(T),Z(T),T.isVideoTexture&&d.delete(T),T.isHTMLTexture&&u.delete(T)}function I(T){T.removeEventListener("dispose",U),R(T),et(T)}function H(){for(const T of _){const M=T.deref();M!==void 0&&(M.isRenderTarget===!0?I(M):G(M))}_.clear(),u.clear()}function Z(T){const M=n.get(T);if(M.__webglInit===void 0)return;const B=T.source,it=m.get(B);if(it){const Q=it[M.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&z(T),Object.keys(it).length===0&&m.delete(B)}n.remove(T)}function z(T){const M=n.get(T);i.deleteTexture(M.__webglTexture);const B=T.source,it=m.get(B);delete it[M.__cacheKey],a.memory.textures--}function et(T){const M=n.get(T);M.__depthDisposeCallback&&M.__depthDisposeCallback();const B=T.depthTexture;if(B&&B.renderTarget===T&&G(B),T.isWebGLCubeRenderTarget)for(let Q=0;Q<6;Q++){if(Array.isArray(M.__webglFramebuffer[Q]))for(let ot=0;ot<M.__webglFramebuffer[Q].length;ot++)i.deleteFramebuffer(M.__webglFramebuffer[Q][ot]);else i.deleteFramebuffer(M.__webglFramebuffer[Q]);M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer[Q])}else{if(Array.isArray(M.__webglFramebuffer))for(let Q=0;Q<M.__webglFramebuffer.length;Q++)i.deleteFramebuffer(M.__webglFramebuffer[Q]);else i.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&i.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let Q=0;Q<M.__webglColorRenderbuffer.length;Q++)M.__webglColorRenderbuffer[Q]&&i.deleteRenderbuffer(M.__webglColorRenderbuffer[Q]);M.__webglDepthRenderbuffer&&i.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const it=T.textures;for(let Q=0,ot=it.length;Q<ot;Q++){const ft=n.get(it[Q]);ft.__webglTexture&&(i.deleteTexture(ft.__webglTexture),a.memory.textures--),n.remove(it[Q])}n.remove(T)}let V=0;function j(){V=0}function tt(){return V}function Mt(T){V=T}function Lt(){const T=V;return T>=s.maxTextures&&Dt("WebGLTextures: Trying to use "+(T+1)+" texture units while this GPU supports only "+s.maxTextures),V+=1,T}function Y(T){const M=[];return M.push(T.wrapS),M.push(T.wrapT),M.push(T.wrapR||0),M.push(T.magFilter),M.push(T.minFilter),M.push(T.anisotropy),M.push(T.internalFormat),M.push(T.format),M.push(T.type),M.push(T.generateMipmaps),M.push(T.mipmapsAutoUpdate),M.push(T.premultiplyAlpha),M.push(T.flipY),M.push(T.unpackAlignment),M.push(T.colorSpace),M.join()}function ut(T,M){const B=n.get(T);if(T.isVideoTexture&&be(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&B.__version!==T.version){const it=T.image;if(it===null)Dt("WebGLRenderer: Texture marked for update but no image data found.");else if(it.complete===!1)Dt("WebGLRenderer: Texture marked for update but image is incomplete");else{ye(B,T,M);return}}else T.isExternalTexture&&(B.__webglTexture=T.sourceTexture?T.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,B.__webglTexture,i.TEXTURE0+M)}function xt(T,M){const B=n.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&B.__version!==T.version){ye(B,T,M);return}else T.isExternalTexture&&(B.__webglTexture=T.sourceTexture?T.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,B.__webglTexture,i.TEXTURE0+M)}function Tt(T,M){const B=n.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&B.__version!==T.version){ye(B,T,M);return}e.bindTexture(i.TEXTURE_3D,B.__webglTexture,i.TEXTURE0+M)}function nt(T,M){const B=n.get(T);if(T.version>0&&B.__version!==T.version){We(B,T,M);return}e.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture,i.TEXTURE0+M)}const St={[os]:i.REPEAT,[Dn]:i.CLAMP_TO_EDGE,[aa]:i.MIRRORED_REPEAT},Vt={[Ie]:i.NEAREST,[th]:i.NEAREST_MIPMAP_NEAREST,[ms]:i.NEAREST_MIPMAP_LINEAR,[Xe]:i.LINEAR,[yr]:i.LINEAR_MIPMAP_NEAREST,[Kn]:i.LINEAR_MIPMAP_LINEAR},wt={[sh]:i.NEVER,[Yl]:i.ALWAYS,[rh]:i.LESS,[Xl]:i.LEQUAL,[ah]:i.EQUAL,[ql]:i.GEQUAL,[oh]:i.GREATER,[lh]:i.NOTEQUAL};function Yt(T,M){if(M.type===mn&&t.has("OES_texture_float_linear")===!1&&(M.magFilter===Xe||M.magFilter===yr||M.magFilter===ms||M.magFilter===Kn||M.minFilter===Xe||M.minFilter===yr||M.minFilter===ms||M.minFilter===Kn)&&Dt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(T,i.TEXTURE_WRAP_S,St[M.wrapS]),i.texParameteri(T,i.TEXTURE_WRAP_T,St[M.wrapT]),(T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY)&&i.texParameteri(T,i.TEXTURE_WRAP_R,St[M.wrapR]),i.texParameteri(T,i.TEXTURE_MAG_FILTER,Vt[M.magFilter]),i.texParameteri(T,i.TEXTURE_MIN_FILTER,Vt[M.minFilter]),M.compareFunction&&(i.texParameteri(T,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(T,i.TEXTURE_COMPARE_FUNC,wt[M.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Ie||M.minFilter!==ms&&M.minFilter!==Kn||M.type===mn&&t.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){const B=t.get("EXT_texture_filter_anisotropic");i.texParameterf(T,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,s.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function Kt(T,M){let B=!1;T.__webglInit===void 0&&(T.__webglInit=!0,M.addEventListener("dispose",L),N(M));const it=M.source;let Q=m.get(it);Q===void 0&&(Q={},m.set(it,Q));const ot=Y(M);if(ot!==T.__cacheKey){Q[ot]===void 0&&(Q[ot]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,B=!0),Q[ot].usedTimes++;const ft=Q[T.__cacheKey];ft!==void 0&&(Q[T.__cacheKey].usedTimes--,ft.usedTimes===0&&z(M)),T.__cacheKey=ot,T.__webglTexture=Q[ot].texture}return B}function Wt(T,M,B){return Math.floor(Math.floor(T/B)/M)}function Pe(T,M,B,it){const ot=T.updateRanges;if(ot.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,M.width,M.height,B,it,M.data);else{ot.sort((P,J)=>P.start-J.start);let ft=0;for(let P=1;P<ot.length;P++){const J=ot[ft],q=ot[P],ht=J.start+J.count,rt=Wt(q.start,M.width,4),lt=Wt(J.start,M.width,4);q.start<=ht+1&&rt===lt&&Wt(q.start+q.count-1,M.width,4)===rt?J.count=Math.max(J.count,q.start+q.count-J.start):(++ft,ot[ft]=q)}ot.length=ft+1;const K=e.getParameter(i.UNPACK_ROW_LENGTH),$=e.getParameter(i.UNPACK_SKIP_PIXELS),ct=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,M.width);for(let P=0,J=ot.length;P<J;P++){const q=ot[P],ht=Math.floor(q.start/4),rt=Math.ceil(q.count/4),lt=ht%M.width,Rt=Math.floor(ht/M.width),Gt=rt,st=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,lt),e.pixelStorei(i.UNPACK_SKIP_ROWS,Rt),e.texSubImage2D(i.TEXTURE_2D,0,lt,Rt,Gt,st,B,it,M.data)}T.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,K),e.pixelStorei(i.UNPACK_SKIP_PIXELS,$),e.pixelStorei(i.UNPACK_SKIP_ROWS,ct)}}function ye(T,M,B){let it=i.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(it=i.TEXTURE_2D_ARRAY),M.isData3DTexture&&(it=i.TEXTURE_3D);const Q=Kt(T,M),ot=M.source;e.bindTexture(it,T.__webglTexture,i.TEXTURE0+B);const ft=n.get(ot);if(ot.version!==ft.__version||Q===!0){if(e.activeTexture(i.TEXTURE0+B),(typeof ImageBitmap<"u"&&M.image instanceof ImageBitmap)===!1){const st=Zt.getPrimaries(Zt.workingColorSpace),Ct=M.colorSpace===Yn?null:Zt.getPrimaries(M.colorSpace),kt=M.colorSpace===Yn||st===Ct?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,kt)}e.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment);let $=v(M.image,!1,s.maxTextureSize);$=Pt(M,$);const ct=r.convert(M.format,M.colorSpace),P=r.convert(M.type);let J=A(M.internalFormat,ct,P,M.normalized,M.colorSpace,M.isVideoTexture);Yt(it,M);let q;const ht=M.mipmaps,rt=M.isVideoTexture!==!0,lt=ft.__version===void 0||Q===!0,Rt=ot.dataReady,Gt=b(M,$);if(M.isDepthTexture)J=g(M.format===Zn,M.type),lt&&(rt?e.texStorage2D(i.TEXTURE_2D,1,J,$.width,$.height):e.texImage2D(i.TEXTURE_2D,0,J,$.width,$.height,0,ct,P,null));else if(M.isDataTexture)if(ht.length>0){rt&&lt&&e.texStorage2D(i.TEXTURE_2D,Gt,J,ht[0].width,ht[0].height);for(let st=0,Ct=ht.length;st<Ct;st++)q=ht[st],rt?Rt&&e.texSubImage2D(i.TEXTURE_2D,st,0,0,q.width,q.height,ct,P,q.data):e.texImage2D(i.TEXTURE_2D,st,J,q.width,q.height,0,ct,P,q.data);M.generateMipmaps=!1}else rt?(lt&&e.texStorage2D(i.TEXTURE_2D,Gt,J,$.width,$.height),Rt&&Pe(M,$,ct,P)):e.texImage2D(i.TEXTURE_2D,0,J,$.width,$.height,0,ct,P,$.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){rt&&lt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Gt,J,ht[0].width,ht[0].height,$.depth);for(let st=0,Ct=ht.length;st<Ct;st++)if(q=ht[st],M.format!==bn)if(ct!==null)if(rt){if(Rt)if(M.layerUpdates.size>0){const kt=al(q.width,q.height,M.format,M.type);for(const gt of M.layerUpdates){const ee=q.data.subarray(gt*kt/q.data.BYTES_PER_ELEMENT,(gt+1)*kt/q.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,st,0,0,gt,q.width,q.height,1,ct,ee)}}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,st,0,0,0,q.width,q.height,$.depth,ct,q.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,st,J,q.width,q.height,$.depth,0,q.data,0,0);else Dt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else rt?Rt&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,st,0,0,0,q.width,q.height,$.depth,ct,P,q.data):e.texImage3D(i.TEXTURE_2D_ARRAY,st,J,q.width,q.height,$.depth,0,ct,P,q.data);M.layerUpdates.size>0&&M.clearLayerUpdates()}else{rt&&lt&&e.texStorage2D(i.TEXTURE_2D,Gt,J,ht[0].width,ht[0].height);for(let st=0,Ct=ht.length;st<Ct;st++)q=ht[st],M.format!==bn?ct!==null?rt?Rt&&e.compressedTexSubImage2D(i.TEXTURE_2D,st,0,0,q.width,q.height,ct,q.data):e.compressedTexImage2D(i.TEXTURE_2D,st,J,q.width,q.height,0,q.data):Dt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):rt?Rt&&e.texSubImage2D(i.TEXTURE_2D,st,0,0,q.width,q.height,ct,P,q.data):e.texImage2D(i.TEXTURE_2D,st,J,q.width,q.height,0,ct,P,q.data)}else if(M.isDataArrayTexture)if(rt){if(lt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Gt,J,$.width,$.height,$.depth),Rt)if(M.layerUpdates.size>0){const st=al($.width,$.height,M.format,M.type);for(const Ct of M.layerUpdates){const kt=$.data.subarray(Ct*st/$.data.BYTES_PER_ELEMENT,(Ct+1)*st/$.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Ct,$.width,$.height,1,ct,P,kt)}M.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,$.width,$.height,$.depth,ct,P,$.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,J,$.width,$.height,$.depth,0,ct,P,$.data);else if(M.isData3DTexture)rt?(lt&&e.texStorage3D(i.TEXTURE_3D,Gt,J,$.width,$.height,$.depth),Rt&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,$.width,$.height,$.depth,ct,P,$.data)):e.texImage3D(i.TEXTURE_3D,0,J,$.width,$.height,$.depth,0,ct,P,$.data);else if(M.isFramebufferTexture){if(lt)if(rt)e.texStorage2D(i.TEXTURE_2D,Gt,J,$.width,$.height);else{let st=$.width,Ct=$.height;for(let kt=0;kt<Gt;kt++)e.texImage2D(i.TEXTURE_2D,kt,J,st,Ct,0,ct,P,null),st>>=1,Ct>>=1}}else if(M.isHTMLTexture){if("texElementImage2D"in i){const st=i.canvas;if(st.hasAttribute("layoutsubtree")||st.setAttribute("layoutsubtree","true"),$.parentNode!==st){st.appendChild($),u.add(M),st.onpaint=Ct=>{const kt=Ct.changedElements;for(const gt of u)kt.includes(gt.image)&&(gt.needsUpdate=!0)},st.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,$);else{const kt=i.RGBA,gt=i.RGBA,ee=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,kt,gt,ee,$)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(ht.length>0){if(rt&&lt){const st=Ft(ht[0]);e.texStorage2D(i.TEXTURE_2D,Gt,J,st.width,st.height)}for(let st=0,Ct=ht.length;st<Ct;st++)q=ht[st],rt?Rt&&e.texSubImage2D(i.TEXTURE_2D,st,0,0,ct,P,q):e.texImage2D(i.TEXTURE_2D,st,J,ct,P,q);M.generateMipmaps=!1}else if(rt){if(lt){const st=Ft($);e.texStorage2D(i.TEXTURE_2D,Gt,J,st.width,st.height)}Rt&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,ct,P,$)}else e.texImage2D(i.TEXTURE_2D,0,J,ct,P,$);E(M)&&M.mipmapsAutoUpdate===!0&&y(it),ft.__version=ot.version,M.onUpdate&&M.onUpdate(M)}T.__version=M.version}function We(T,M,B){if(M.image.length!==6)return;const it=Kt(T,M),Q=M.source;e.bindTexture(i.TEXTURE_CUBE_MAP,T.__webglTexture,i.TEXTURE0+B);const ot=n.get(Q);if(Q.version!==ot.__version||it===!0){e.activeTexture(i.TEXTURE0+B);const ft=Zt.getPrimaries(Zt.workingColorSpace),K=M.colorSpace===Yn?null:Zt.getPrimaries(M.colorSpace),$=M.colorSpace===Yn||ft===K?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,$);const ct=M.isCompressedTexture||M.image[0].isCompressedTexture,P=M.image[0]&&M.image[0].isDataTexture,J=[];for(let gt=0;gt<6;gt++)!ct&&!P?J[gt]=v(M.image[gt],!0,s.maxCubemapSize):J[gt]=P?M.image[gt].image:M.image[gt],J[gt]=Pt(M,J[gt]);const q=J[0],ht=r.convert(M.format,M.colorSpace),rt=r.convert(M.type);let lt=A(M.internalFormat,ht,rt,M.normalized,M.colorSpace);const Rt=M.isVideoTexture!==!0,Gt=ot.__version===void 0||it===!0,st=Q.dataReady;let Ct=b(M,q);Yt(i.TEXTURE_CUBE_MAP,M);let kt;if(M.isDepthTexture){if(lt=g(M.format===Zn,M.type),Gt)if(Rt)e.texStorage2D(i.TEXTURE_CUBE_MAP,1,lt,q.width,q.height);else for(let gt=0;gt<6;gt++)e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,lt,q.width,q.height,0,ht,rt,null)}else if(ct){Rt&&Gt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,Ct,lt,q.width,q.height);for(let gt=0;gt<6;gt++){kt=J[gt].mipmaps;for(let ee=0;ee<kt.length;ee++){const Ae=kt[ee];M.format!==bn?ht!==null?Rt?st&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,ee,0,0,Ae.width,Ae.height,ht,Ae.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,ee,lt,Ae.width,Ae.height,0,Ae.data):Dt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Rt?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,ee,0,0,Ae.width,Ae.height,ht,rt,Ae.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,ee,lt,Ae.width,Ae.height,0,ht,rt,Ae.data)}}}else{if(kt=M.mipmaps,Rt&&Gt){kt.length>0&&Ct++;const gt=Ft(J[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,Ct,lt,gt.width,gt.height)}for(let gt=0;gt<6;gt++)if(P){Rt?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,0,0,J[gt].width,J[gt].height,ht,rt,J[gt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,lt,J[gt].width,J[gt].height,0,ht,rt,J[gt].data);for(let ee=0;ee<kt.length;ee++){const zn=kt[ee].image[gt].image;Rt?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,ee+1,0,0,zn.width,zn.height,ht,rt,zn.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,ee+1,lt,zn.width,zn.height,0,ht,rt,zn.data)}}else{Rt?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,0,0,ht,rt,J[gt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,lt,ht,rt,J[gt]);for(let ee=0;ee<kt.length;ee++){const Ae=kt[ee];Rt?st&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,ee+1,0,0,ht,rt,Ae.image[gt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+gt,ee+1,lt,ht,rt,Ae.image[gt])}}}E(M)&&M.mipmapsAutoUpdate===!0&&y(i.TEXTURE_CUBE_MAP),ot.__version=Q.version,M.onUpdate&&M.onUpdate(M)}T.__version=M.version}function de(T,M,B,it,Q,ot){const ft=r.convert(B.format,B.colorSpace),K=r.convert(B.type),$=A(B.internalFormat,ft,K,B.normalized,B.colorSpace),ct=n.get(M),P=n.get(B);if(P.__renderTarget=M,!ct.__hasExternalTextures){const J=Math.max(1,M.width>>ot),q=Math.max(1,M.height>>ot);Q===i.TEXTURE_3D||Q===i.TEXTURE_2D_ARRAY?e.texImage3D(Q,ot,$,J,q,M.depth,0,ft,K,null):e.texImage2D(Q,ot,$,J,q,0,ft,K,null)}e.bindFramebuffer(i.FRAMEBUFFER,T),mt(M)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,it,Q,P.__webglTexture,0,ce(M)):(Q===i.TEXTURE_2D||Q>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,it,Q,P.__webglTexture,ot),e.bindFramebuffer(i.FRAMEBUFFER,null)}function vn(T,M,B){if(i.bindRenderbuffer(i.RENDERBUFFER,T),M.depthBuffer){const it=M.depthTexture,Q=it&&it.isDepthTexture?it.type:null,ot=g(M.stencilBuffer,Q),ft=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;mt(M)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ce(M),ot,M.width,M.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,ce(M),ot,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,ot,M.width,M.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ft,i.RENDERBUFFER,T)}else{const it=M.textures;for(let Q=0;Q<it.length;Q++){const ot=it[Q],ft=r.convert(ot.format,ot.colorSpace),K=r.convert(ot.type),$=A(ot.internalFormat,ft,K,ot.normalized,ot.colorSpace);mt(M)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ce(M),$,M.width,M.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,ce(M),$,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,$,M.width,M.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Te(T,M,B){const it=M.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,T),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const Q=n.get(M.depthTexture);Q.__renderTarget=M;const ot=it?M.depthTexture.image[0]:M.depthTexture.image;(!Q.__webglTexture||ot.width!==M.width||ot.height!==M.height)&&(ot.width=M.width,ot.height=M.height,M.depthTexture.needsUpdate=!0),it?nt(M.depthTexture,0):ut(M.depthTexture,0);const ft=Q.__webglTexture,K=ce(M),$=it?i.TEXTURE_CUBE_MAP_POSITIVE_X+B:i.TEXTURE_2D,ct=M.depthTexture.format===Zn?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(M.depthTexture.format===Jn)mt(M)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ct,$,ft,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,ct,$,ft,0);else if(M.depthTexture.format===Zn)mt(M)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ct,$,ft,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,ct,$,ft,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Qe(T){const M=n.get(T),B=T.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==T.depthTexture){const it=T.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),it){const Q=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,it.removeEventListener("dispose",Q)};it.addEventListener("dispose",Q),M.__depthDisposeCallback=Q}M.__boundDepthTexture=it}if(T.depthTexture&&!M.__autoAllocateDepthBuffer)if(B)for(let it=0;it<6;it++)Te(M.__webglFramebuffer[it],T,it);else T.texture.mipmaps.length>0?Te(M.__webglFramebuffer[0],T,0):Te(M.__webglFramebuffer,T,0);else if(B){M.__webglDepthbuffer=[];for(let it=0;it<6;it++)if(e.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer[it]),M.__webglDepthbuffer[it]===void 0)M.__webglDepthbuffer[it]=i.createRenderbuffer(),vn(M.__webglDepthbuffer[it],T,!1);else{const Q=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ot=M.__webglDepthbuffer[it];i.bindRenderbuffer(i.RENDERBUFFER,ot),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,ot)}}else if(T.texture.mipmaps.length>0?e.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=i.createRenderbuffer(),vn(M.__webglDepthbuffer,T,!1);else{const Q=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ot=M.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ot),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,ot)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function je(T,M,B){const it=n.get(T);M!==void 0&&de(it.__webglFramebuffer,T,T.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),B!==void 0&&Qe(T)}function tn(T){const M=T.texture,B=n.get(T),it=n.get(M);T.addEventListener("dispose",U),N(T);const Q=T.textures,ot=T.isWebGLCubeRenderTarget===!0,ft=Q.length>1;if(ft||(it.__webglTexture===void 0&&(it.__webglTexture=i.createTexture()),it.__version=M.version,a.memory.textures++),ot){B.__webglFramebuffer=[];for(let K=0;K<6;K++)if(M.mipmaps.length>0){B.__webglFramebuffer[K]=[];for(let $=0;$<M.mipmaps.length;$++)B.__webglFramebuffer[K][$]=i.createFramebuffer()}else B.__webglFramebuffer[K]=i.createFramebuffer()}else{if(M.mipmaps.length>0){B.__webglFramebuffer=[];for(let K=0;K<M.mipmaps.length;K++)B.__webglFramebuffer[K]=i.createFramebuffer()}else B.__webglFramebuffer=i.createFramebuffer();if(ft)for(let K=0,$=Q.length;K<$;K++){const ct=n.get(Q[K]);ct.__webglTexture===void 0&&(ct.__webglTexture=i.createTexture(),a.memory.textures++)}if(T.samples>0&&mt(T)===!1){B.__webglMultisampledFramebuffer=i.createFramebuffer(),B.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let K=0;K<Q.length;K++){const $=Q[K];B.__webglColorRenderbuffer[K]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,B.__webglColorRenderbuffer[K]);const ct=r.convert($.format,$.colorSpace),P=r.convert($.type),J=A($.internalFormat,ct,P,$.normalized,$.colorSpace,T.isXRRenderTarget===!0),q=ce(T);i.renderbufferStorageMultisample(i.RENDERBUFFER,q,J,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+K,i.RENDERBUFFER,B.__webglColorRenderbuffer[K])}i.bindRenderbuffer(i.RENDERBUFFER,null),T.depthBuffer&&(B.__webglDepthRenderbuffer=i.createRenderbuffer(),vn(B.__webglDepthRenderbuffer,T,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ot){e.bindTexture(i.TEXTURE_CUBE_MAP,it.__webglTexture),Yt(i.TEXTURE_CUBE_MAP,M);for(let K=0;K<6;K++)if(M.mipmaps.length>0)for(let $=0;$<M.mipmaps.length;$++)de(B.__webglFramebuffer[K][$],T,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+K,$);else de(B.__webglFramebuffer[K],T,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0);E(M)?y(i.TEXTURE_CUBE_MAP):M.mipmaps.length>0&&i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_MAX_LEVEL,M.mipmaps.length-1),e.unbindTexture()}else if(ft){for(let K=0,$=Q.length;K<$;K++){const ct=Q[K],P=n.get(ct);let J=i.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(J=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(J,P.__webglTexture),Yt(J,ct),de(B.__webglFramebuffer,T,ct,i.COLOR_ATTACHMENT0+K,J,0),E(ct)&&y(J)}e.unbindTexture()}else{let K=i.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(K=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(K,it.__webglTexture),Yt(K,M),M.mipmaps.length>0)for(let $=0;$<M.mipmaps.length;$++)de(B.__webglFramebuffer[$],T,M,i.COLOR_ATTACHMENT0,K,$);else de(B.__webglFramebuffer,T,M,i.COLOR_ATTACHMENT0,K,0);E(M)?y(K):M.mipmaps.length>0&&i.texParameteri(K,i.TEXTURE_MAX_LEVEL,M.mipmaps.length-1),e.unbindTexture()}T.depthBuffer&&Qe(T)}function F(T){const M=T.textures;for(let B=0,it=M.length;B<it;B++){const Q=M[B];if(E(Q)&&Q.mipmapsAutoUpdate===!0){const ot=w(T),ft=n.get(Q).__webglTexture;e.bindTexture(ot,ft),y(ot),e.unbindTexture()}}}const en=[];function le(T){if(T.samples>0){if(mt(T)===!1){const M=T.textures,B=T.width,it=T.height;let Q=i.COLOR_BUFFER_BIT;const ot=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ft=n.get(T),K=M.length>1;if(K)for(let ct=0;ct<M.length;ct++)e.bindFramebuffer(i.FRAMEBUFFER,ft.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ct,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,ft.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ct,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,ft.__webglMultisampledFramebuffer),T.texture.mipmaps.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ft.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ft.__webglFramebuffer);for(let ct=0;ct<M.length;ct++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(Q|=i.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(Q|=i.STENCIL_BUFFER_BIT)),K){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ft.__webglColorRenderbuffer[ct]);const P=n.get(M[ct]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,P,0)}i.blitFramebuffer(0,0,B,it,0,0,B,it,Q,i.NEAREST),c===!0&&(en.length=0,en.push(i.COLOR_ATTACHMENT0+ct),T.depthBuffer&&T.storeMultisampledDepthBuffer===!1&&en.push(ot),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,en))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),K)for(let ct=0;ct<M.length;ct++){e.bindFramebuffer(i.FRAMEBUFFER,ft.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ct,i.RENDERBUFFER,ft.__webglColorRenderbuffer[ct]);const P=n.get(M[ct]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,ft.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ct,i.TEXTURE_2D,P,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ft.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.storeMultisampledDepthBuffer===!1&&c){const M=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[M])}}}function ce(T){return Math.min(s.maxSamples,T.samples)}function mt(T){const M=n.get(T);return T.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function be(T){const M=a.render.frame;d.get(T)!==M&&(d.set(T,M),T.update())}function Pt(T,M){const B=T.colorSpace,it=T.format,Q=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||B!==ir&&B!==Yn&&(Zt.getTransfer(B)===ne?(it!==bn||Q!==$e)&&Dt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):jt("WebGLTextures: Unsupported texture color space:",B)),M}function Ft(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(l.width=T.naturalWidth||T.width,l.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(l.width=T.displayWidth,l.height=T.displayHeight):(l.width=T.width,l.height=T.height),l}this.allocateTextureUnit=Lt,this.resetTextureUnits=j,this.getTextureUnits=tt,this.setTextureUnits=Mt,this.setTexture2D=ut,this.setTexture2DArray=xt,this.setTexture3D=Tt,this.setTextureCube=nt,this.rebindTextures=je,this.setupRenderTarget=tn,this.updateRenderTargetMipmap=F,this.updateMultisampleRenderTarget=le,this.setupDepthRenderbuffer=Qe,this.setupFrameBufferTexture=de,this.useMultisampledRTT=mt,this.dispose=H}function Um(i,t){function e(n,s=Yn){let r;const a=Zt.getTransfer(s);if(n===$e)return i.UNSIGNED_BYTE;if(n===qa)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Ya)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Gl)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Hl)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===zl)return i.BYTE;if(n===kl)return i.SHORT;if(n===ls)return i.UNSIGNED_SHORT;if(n===Xa)return i.INT;if(n===wn)return i.UNSIGNED_INT;if(n===mn)return i.FLOAT;if(n===Tn)return i.HALF_FLOAT;if(n===Vl)return i.ALPHA;if(n===Wl)return i.RGB;if(n===bn)return i.RGBA;if(n===Jn)return i.DEPTH_COMPONENT;if(n===Zn)return i.DEPTH_STENCIL;if(n===Ka)return i.RED;if(n===Za)return i.RED_INTEGER;if(n===li)return i.RG;if(n===$a)return i.RG_INTEGER;if(n===Ja)return i.RGBA_INTEGER;if(n===Ks||n===Zs||n===$s||n===Js)if(a===ne)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Ks)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Zs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===$s)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Js)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Ks)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Zs)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===$s)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Js)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===oa||n===la||n===ca||n===ha)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===oa)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===la)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ca)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ha)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ua||n===da||n===fa||n===pa||n===ma||n===tr||n===ga)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===ua||n===da)return a===ne?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===fa)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===pa)return r.COMPRESSED_R11_EAC;if(n===ma)return r.COMPRESSED_SIGNED_R11_EAC;if(n===tr)return r.COMPRESSED_RG11_EAC;if(n===ga)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===_a||n===xa||n===va||n===Ma||n===Sa||n===ya||n===ba||n===Ea||n===wa||n===Ta||n===Aa||n===Ra||n===Ca||n===Pa)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===_a)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===xa)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===va)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ma)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Sa)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ya)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ba)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ea)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===wa)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ta)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Aa)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ra)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ca)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Pa)return a===ne?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===La||n===Ia||n===Da)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===La)return a===ne?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Ia)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Da)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Na||n===Ua||n===er||n===Fa)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Na)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Ua)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===er)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Fa)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Bi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const Fm=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Om=`
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

}`;class Bm{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new lc(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new On({vertexShader:Fm,fragmentShader:Om,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new at(new Je(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class zm extends hi{constructor(t,e){super();const n=this;let s=null,r=1,a=null,o="local-floor",c=1,l=null,d=null,u=null,h=null,m=null,_=null;const x=typeof XRWebGLBinding<"u",p=new Bm,f={},v=e.getContextAttributes();let E=null,y=null;const w=[],A=[],g=new Ut;let b=null,N=null;const R=new an;R.viewport=new pe;const L=new an;L.viewport=new pe;const U=[R,L],G=new Zh;let I=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let ut=w[Y];return ut===void 0&&(ut=new Lr,w[Y]=ut),ut.getTargetRaySpace()},this.getControllerGrip=function(Y){let ut=w[Y];return ut===void 0&&(ut=new Lr,w[Y]=ut),ut.getGripSpace()},this.getHand=function(Y){let ut=w[Y];return ut===void 0&&(ut=new Lr,w[Y]=ut),ut.getHandSpace()};function Z(Y){const ut=A.indexOf(Y.inputSource);if(ut===-1)return;const xt=w[ut];xt!==void 0&&(xt.update(Y.inputSource,Y.frame,l||a),xt.dispatchEvent({type:Y.type,data:Y.inputSource}))}function z(){s.removeEventListener("select",Z),s.removeEventListener("selectstart",Z),s.removeEventListener("selectend",Z),s.removeEventListener("squeeze",Z),s.removeEventListener("squeezestart",Z),s.removeEventListener("squeezeend",Z),s.removeEventListener("end",z),s.removeEventListener("inputsourceschange",et);for(let Y=0;Y<w.length;Y++){const ut=A[Y];ut!==null&&(A[Y]=null,w[Y].disconnect(ut))}I=null,H=null,p.reset();for(const Y in f)delete f[Y];if(t.setRenderTarget(E),m=null,h=null,u=null,s=null,y=null,Lt.stop(),n.isPresenting=!1,t.setPixelRatio(b),t.setSize(g.width,g.height,!1),N!==null){const Y=N.camera;Y.fov=N.fov,Y.zoom=N.zoom,Y.updateProjectionMatrix(),N=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,n.isPresenting===!0&&Dt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){o=Y,n.isPresenting===!0&&Dt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(Y){l=Y},this.getBaseLayer=function(){return h!==null?h:m},this.getBinding=function(){return u===null&&x&&(u=new XRWebGLBinding(s,e)),u},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(Y){if(s=Y,s!==null){if(E=t.getRenderTarget(),s.addEventListener("select",Z),s.addEventListener("selectstart",Z),s.addEventListener("selectend",Z),s.addEventListener("squeeze",Z),s.addEventListener("squeezestart",Z),s.addEventListener("squeezeend",Z),s.addEventListener("end",z),s.addEventListener("inputsourceschange",et),v.xrCompatible!==!0&&await e.makeXRCompatible(),b=t.getPixelRatio(),t.getSize(g),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let xt=null,Tt=null,nt=null;v.depth&&(nt=v.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,xt=v.stencil?Zn:Jn,Tt=v.stencil?Bi:wn);const St={colorFormat:e.RGBA8,depthFormat:nt,scaleFactor:r};u=this.getBinding(),h=u.createProjectionLayer(St),s.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),y=new En(h.textureWidth,h.textureHeight,{format:bn,type:$e,depthTexture:new zi(h.textureWidth,h.textureHeight,Tt,void 0,void 0,void 0,void 0,void 0,void 0,xt),stencilBuffer:v.stencil,colorSpace:t.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}else{const xt={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(s,e,xt),s.updateRenderState({baseLayer:m}),t.setPixelRatio(1),t.setSize(m.framebufferWidth,m.framebufferHeight,!1),y=new En(m.framebufferWidth,m.framebufferHeight,{format:bn,type:$e,colorSpace:t.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1,storeMultisampledDepthBuffer:m.ignoreDepthValues===!1,storeMultisampledStencilBuffer:m.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),Lt.setContext(s),Lt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function et(Y){for(let ut=0;ut<Y.removed.length;ut++){const xt=Y.removed[ut],Tt=A.indexOf(xt);Tt>=0&&(A[Tt]=null,w[Tt].disconnect(xt))}for(let ut=0;ut<Y.added.length;ut++){const xt=Y.added[ut];let Tt=A.indexOf(xt);if(Tt===-1){for(let St=0;St<w.length;St++)if(St>=A.length){A.push(xt),Tt=St;break}else if(A[St]===null){A[St]=xt,Tt=St;break}if(Tt===-1)break}const nt=w[Tt];nt&&nt.connect(xt)}}function V(Y,ut){ut===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(ut.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(s===null)return;let ut=Y.near,xt=Y.far;p.texture!==null&&(p.depthNear>0&&(ut=p.depthNear),p.depthFar>0&&(xt=p.depthFar)),G.near=L.near=R.near=ut,G.far=L.far=R.far=xt,(I!==G.near||H!==G.far)&&(s.updateRenderState({depthNear:G.near,depthFar:G.far}),I=G.near,H=G.far),G.layers.mask=Y.layers.mask|6,R.layers.mask=G.layers.mask&-5,L.layers.mask=G.layers.mask&-3;const Tt=Y.parent,nt=G.cameras;V(G,Tt);for(let St=0;St<nt.length;St++)V(nt[St],Tt);G.projectionMatrix.copy(R.projectionMatrix),G.projectionMatrixInverse.copy(R.projectionMatrixInverse),N===null&&Y.isPerspectiveCamera&&(N={camera:Y,fov:Y.fov,zoom:Y.zoom}),j(Y,G,Tt)};function j(Y,ut,xt){xt===null?Y.matrix.copy(ut.matrixWorld):(Y.matrix.copy(xt.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(ut.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(ut.projectionMatrix),Y.projectionMatrixInverse.copy(ut.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=Oa*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return G},this.getFoveation=function(){if(!(h===null&&m===null))return c},this.setFoveation=function(Y){c=Y,h!==null&&(h.fixedFoveation=Y),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=Y)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(G)},this.getCameraTexture=function(Y){return f[Y]};let tt=null;function Mt(Y,ut){if(d=ut.getViewerPose(l||a),_=ut,d!==null){const xt=d.views;m!==null&&(t.setRenderTargetFramebuffer(y,m.framebuffer),t.setRenderTarget(y));let Tt=!1;xt.length!==G.cameras.length&&(G.cameras.length=0,Tt=!0);for(let wt=0;wt<xt.length;wt++){const Yt=xt[wt];let Kt=null;if(m!==null)Kt=m.getViewport(Yt);else{const Pe=u.getViewSubImage(h,Yt);Kt=Pe.viewport,wt===0&&(t.setRenderTargetTextures(y,Pe.colorTexture,Pe.depthStencilTexture),t.setRenderTarget(y))}let Wt=U[wt];Wt===void 0&&(Wt=new an,Wt.layers.enable(wt),Wt.viewport=new pe,U[wt]=Wt),Wt.matrix.fromArray(Yt.transform.matrix),Wt.matrix.decompose(Wt.position,Wt.quaternion,Wt.scale),Wt.projectionMatrix.fromArray(Yt.projectionMatrix),Wt.projectionMatrixInverse.copy(Wt.projectionMatrix).invert(),Wt.viewport.set(Kt.x,Kt.y,Kt.width,Kt.height),wt===0&&(G.matrix.copy(Wt.matrix),G.matrix.decompose(G.position,G.quaternion,G.scale)),Tt===!0&&G.cameras.push(Wt)}const nt=s.enabledFeatures;if(nt&&nt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&x){u=n.getBinding();const wt=u.getDepthInformation(xt[0]);wt&&wt.isValid&&wt.texture&&p.init(wt,s.renderState)}if(nt&&nt.includes("camera-access")&&x){t.state.unbindTexture(),u=n.getBinding();for(let wt=0;wt<xt.length;wt++){const Yt=xt[wt].camera;if(Yt){let Kt=f[Yt];Kt||(Kt=new lc,f[Yt]=Kt);const Wt=u.getCameraImage(Yt);Kt.sourceTexture=Wt}}}}for(let xt=0;xt<w.length;xt++){const Tt=A[xt],nt=w[xt];Tt!==null&&nt!==void 0&&nt.update(Tt,ut,l||a)}tt&&tt(Y,ut),ut.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ut}),_=null}const Lt=new fc;Lt.setAnimationLoop(Mt),this.setAnimationLoop=function(Y){tt=Y},this.dispose=function(){}}}const km=new Qt,bc=new Bt;bc.set(-1,0,0,0,1,0,0,0,1);function Gm(i,t){function e(p,f){p.matrixAutoUpdate===!0&&p.updateMatrix(),f.value.copy(p.matrix)}function n(p,f){f.color.getRGB(p.fogColor.value,cc(i)),f.isFog?(p.fogNear.value=f.near,p.fogFar.value=f.far):f.isFogExp2&&(p.fogDensity.value=f.density)}function s(p,f,v,E,y){f.isNodeMaterial?f.uniformsNeedUpdate=!1:f.isMeshBasicMaterial?r(p,f):f.isMeshLambertMaterial?(r(p,f),f.envMap&&(p.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(r(p,f),u(p,f)):f.isMeshPhongMaterial?(r(p,f),d(p,f),f.envMap&&(p.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(r(p,f),h(p,f),f.isMeshPhysicalMaterial&&m(p,f,y)):f.isMeshMatcapMaterial?(r(p,f),_(p,f)):f.isMeshDepthMaterial?r(p,f):f.isMeshDistanceMaterial?(r(p,f),x(p,f)):f.isMeshNormalMaterial?r(p,f):f.isLineBasicMaterial?(a(p,f),f.isLineDashedMaterial&&o(p,f)):f.isPointsMaterial?c(p,f,v,E):f.isSpriteMaterial?l(p,f):f.isShadowMaterial?(p.color.value.copy(f.color),p.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(p,f){p.opacity.value=f.opacity,f.color&&p.diffuse.value.copy(f.color),f.emissive&&p.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(p.map.value=f.map,e(f.map,p.mapTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,e(f.alphaMap,p.alphaMapTransform)),f.bumpMap&&(p.bumpMap.value=f.bumpMap,e(f.bumpMap,p.bumpMapTransform),p.bumpScale.value=f.bumpScale,f.side===Ve&&(p.bumpScale.value*=-1)),f.normalMap&&(p.normalMap.value=f.normalMap,e(f.normalMap,p.normalMapTransform),p.normalScale.value.copy(f.normalScale),f.side===Ve&&p.normalScale.value.negate()),f.displacementMap&&(p.displacementMap.value=f.displacementMap,e(f.displacementMap,p.displacementMapTransform),p.displacementScale.value=f.displacementScale,p.displacementBias.value=f.displacementBias),f.emissiveMap&&(p.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,p.emissiveMapTransform)),f.specularMap&&(p.specularMap.value=f.specularMap,e(f.specularMap,p.specularMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest);const v=t.get(f),E=v.envMap,y=v.envMapRotation;E&&(p.envMap.value=E,p.envMapRotation.value.setFromMatrix4(km.makeRotationFromEuler(y)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&p.envMapRotation.value.premultiply(bc),p.reflectivity.value=f.reflectivity,p.ior.value=f.ior,p.refractionRatio.value=f.refractionRatio),f.lightMap&&(p.lightMap.value=f.lightMap,p.lightMapIntensity.value=f.lightMapIntensity,e(f.lightMap,p.lightMapTransform)),f.aoMap&&(p.aoMap.value=f.aoMap,p.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,p.aoMapTransform))}function a(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,f.map&&(p.map.value=f.map,e(f.map,p.mapTransform))}function o(p,f){p.dashSize.value=f.dashSize,p.totalSize.value=f.dashSize+f.gapSize,p.scale.value=f.scale}function c(p,f,v,E){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.size.value=f.size*v,p.scale.value=E*.5,f.map&&(p.map.value=f.map,e(f.map,p.uvTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,e(f.alphaMap,p.alphaMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest)}function l(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.rotation.value=f.rotation,f.map&&(p.map.value=f.map,e(f.map,p.mapTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,e(f.alphaMap,p.alphaMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest)}function d(p,f){p.specular.value.copy(f.specular),p.shininess.value=Math.max(f.shininess,1e-4)}function u(p,f){f.gradientMap&&(p.gradientMap.value=f.gradientMap)}function h(p,f){p.metalness.value=f.metalness,f.metalnessMap&&(p.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,p.metalnessMapTransform)),p.roughness.value=f.roughness,f.roughnessMap&&(p.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,p.roughnessMapTransform)),f.envMap&&(p.envMapIntensity.value=f.envMapIntensity)}function m(p,f,v){p.ior.value=f.ior,f.diffuseRoughness>0&&(p.diffuseRoughness.value=f.diffuseRoughness,f.diffuseRoughnessMap&&(p.diffuseRoughnessMap.value=f.diffuseRoughnessMap,e(f.diffuseRoughnessMap,p.diffuseRoughnessMapTransform))),f.sheen>0&&(p.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),p.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(p.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,p.sheenColorMapTransform)),f.sheenRoughnessMap&&(p.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,p.sheenRoughnessMapTransform))),f.clearcoat>0&&(p.clearcoat.value=f.clearcoat,p.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(p.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,p.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(p.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Ve&&p.clearcoatNormalScale.value.negate())),f.dispersion>0&&(p.dispersion.value=f.dispersion),f.retroreflectivity>0&&(p.retroreflectivity.value=f.retroreflectivity),f.iridescence>0&&(p.iridescence.value=f.iridescence,p.iridescenceIOR.value=f.iridescenceIOR,p.iridescenceThicknessMinimum.value=f.iridescenceThicknessMinimum,p.iridescenceThicknessMaximum.value=f.iridescenceThicknessMaximum,f.iridescenceMap&&(p.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,p.iridescenceMapTransform)),f.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),f.transmission>0&&(p.transmission.value=f.transmission,p.transmissionSamplerMap.value=v.texture,p.transmissionSamplerSize.value.set(v.width,v.height),f.transmissionMap&&(p.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,p.transmissionMapTransform)),p.thickness.value=f.thickness,f.thicknessMap&&(p.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=f.attenuationDistance,p.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(p.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(p.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=f.specularIntensity,p.specularColor.value.copy(f.specularColor),f.specularColorMap&&(p.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,p.specularColorMapTransform)),f.specularIntensityMap&&(p.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,p.specularIntensityMapTransform))}function _(p,f){f.matcap&&(p.matcap.value=f.matcap)}function x(p,f){const v=t.get(f).light;p.referencePosition.value.setFromMatrixPosition(v.matrixWorld),p.nearDistance.value=v.shadow.camera.near,p.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Hm(i,t,e,n){let s={},r={};function a(v,E){const y=E.program;n.uniformBlockBinding(v,y,s[v.id])}function o(v,E){let y=s[v.id];y===void 0&&(_(v),y=c(v),s[v.id]=y,v.addEventListener("dispose",p));const w=E.program;n.updateUBOMapping(v,w);const A=t.render.frame;r[v.id]!==A&&(l(v),r[v.id]=A)}function c(v){const E=i.createBuffer(),y=v.__size,w=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,E),i.bufferData(i.UNIFORM_BUFFER,y,w),i.bindBuffer(i.UNIFORM_BUFFER,null),E}function l(v){const E=s[v.id],y=v.uniforms,w=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,E);for(let A=0,g=y.length;A<g;A++){const b=y[A];if(Array.isArray(b))for(let N=0,R=b.length;N<R;N++)d(b[N],A,N,w);else d(b,A,0,w)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(v,E,y,w){if(h(v,E,y,w)===!0){const A=v.__offset,g=v.value;if(Array.isArray(g)){let b=0;for(let N=0;N<g.length;N++){const R=g[N],L=x(R,!0);u(R,v.__data,b),b+=L.storage/Float32Array.BYTES_PER_ELEMENT}}else u(g,v.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,A,v.__data)}}function u(v,E,y){typeof v=="number"||typeof v=="boolean"?E[y]=v:v.isMatrix3?(E[y]=v.elements[0],E[y+1]=v.elements[1],E[y+2]=v.elements[2],E[y+3]=0,E[y+4]=v.elements[3],E[y+5]=v.elements[4],E[y+6]=v.elements[5],E[y+7]=0,E[y+8]=v.elements[6],E[y+9]=v.elements[7],E[y+10]=v.elements[8],E[y+11]=0):ArrayBuffer.isView(v)?E.set(v.subarray(0,E.length-y),y):v.toArray(E,y)}function h(v,E,y,w){const A=v.value,g=E+"_"+y;if(Array.isArray(A)){w[g]===void 0&&(w[g]=[]);const b=w[g];let N=!1;for(let R=0;R<A.length;R++)m(A[R],b,R)===!0&&(N=!0);return N}return m(A,w,g)}function m(v,E,y){if(E[y]===void 0)return typeof v=="number"||typeof v=="boolean"?E[y]=v:ArrayBuffer.isView(v)?E[y]=v.slice():E[y]=v.clone(),!0;{const w=E[y];if(typeof v=="number"||typeof v=="boolean"){if(w!==v)return E[y]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(w.equals(v)===!1)return w.copy(v),!0}}return!1}function _(v){const E=v.uniforms;let y=0;const w=16;for(let g=0,b=E.length;g<b;g++){const N=Array.isArray(E[g])?E[g]:[E[g]];for(let R=0,L=N.length;R<L;R++){const U=N[R],G=Array.isArray(U.value)?U.value:[U.value],I=Array.isArray(E[g])||Array.isArray(U.value);let H=y;for(let z=0,et=G.length;z<et;z++){const V=G[z],j=x(V,I),tt=y%w,Mt=tt%j.boundary,Lt=tt+Mt;y+=Mt,Lt!==0&&w-Lt<j.storage&&(y+=w-Lt),z===0&&(H=y),y+=j.storage}const Z=U.type==="int"?Int32Array:U.type==="uint"?Uint32Array:Float32Array;U.__data=new Z((y-H)/Float32Array.BYTES_PER_ELEMENT),U.__offset=H}}const A=y%w;return A>0&&(y+=w-A),v.__size=y,v.__cache={},this}function x(v,E){const y={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(y.boundary=4,y.storage=4):v.isVector2?(y.boundary=8,y.storage=8):v.isVector3||v.isColor?(y.boundary=16,y.storage=12):v.isVector4?(y.boundary=16,y.storage=16):v.isMatrix3?(y.boundary=16,y.storage=48):v.isMatrix4?(y.boundary=16,y.storage=64):v.isTexture?Dt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(y.boundary=16,y.storage=v.byteLength):Dt("WebGLRenderer: Unsupported uniform value type.",v),E===!0&&(y.boundary=16,y.storage=Math.ceil(y.storage/16)*16),y}function p(v){const E=v.target;E.removeEventListener("dispose",p),i.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function f(){for(const v in s)i.deleteBuffer(s[v]);s={},r={}}return{bind:a,update:o,dispose:f}}const Vm=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Sn=null;function Wm(){return Sn===null&&(Sn=new sc(Vm,16,16,li,Tn),Sn.name="DFG_LUT",Sn.minFilter=Xe,Sn.magFilter=Xe,Sn.wrapS=Dn,Sn.wrapT=Dn,Sn.generateMipmaps=!1,Sn.needsUpdate=!0),Sn}class Xm{constructor(t={}){const{canvas:e=hh(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:h=!1,outputBufferType:m=$e}=t;this.isWebGLRenderer=!0;let _;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=n.getContextAttributes().alpha}else _=a;const x=m,p=new Set([Ja,$a,Za]),f=new Set([$e,wn,ls,Bi,qa,Ya]),v=new Uint32Array(4),E=new Int32Array(4),y={textures:[],min:[],max:[],resolution:[]};let w=null,A=null;const g=[],b=[];let N=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Nn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const R=this;let L=!1,U=null,G=null,I=null,H=null;this._outputColorSpace=He;let Z=0,z=0,et=null,V=-1,j=null;const tt=new pe,Mt=new pe;let Lt=null;const Y=new Nt(0);let ut=0,xt=e.width,Tt=e.height,nt=1,St=null,Vt=null;const wt=new pe(0,0,xt,Tt),Yt=new pe(0,0,xt,Tt);let Kt=!1;const Wt=new hs,Pe=new to;let ye=!1,We=!1;const de=new Qt,vn=new C,Te=new pe,Qe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let je=!1;function tn(){return et===null?nt:1}let F=n;function en(S,D){return e.getContext(S,D)}let le,ce,mt,be,Pt,Ft,T,M,B,it,Q,ot,ft,K,$,ct,P,J,q,ht,rt,lt,Rt;try{const S={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:d,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Ha}`),e.addEventListener("webglcontextlost",Ct,!1),e.addEventListener("webglcontextrestored",kt,!1),e.addEventListener("webglcontextcreationerror",gt,!1),F===null){const D="webgl2";if(F=en(D,S),F===null)throw en(D)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Gt()}catch(S){throw e.removeEventListener("webglcontextlost",Ct,!1),e.removeEventListener("webglcontextrestored",kt,!1),e.removeEventListener("webglcontextcreationerror",gt,!1),jt("WebGLRenderer: "+S.message),S}function Gt(){le=new Kf(F),le.init(),rt=new Um(F,le),ce=new Of(F,le,t,rt),mt=new Dm(F,le),ce.reversedDepthBuffer&&h&&mt.buffers.depth.setReversed(!0),G=F.createFramebuffer(),I=F.createFramebuffer(),H=F.createFramebuffer(),be=new Jf(F),Pt=new vm,Ft=new Nm(F,le,mt,Pt,ce,rt,be),T=new Yf(R),M=new Qh(F),lt=new Uf(F,M),B=new Zf(F,M,be,lt),it=new jf(F,B,M,lt,be),J=new Qf(F,ce,Ft),$=new Bf(Pt),Q=new xm(R,T,le,ce,lt,$),ot=new Gm(R,Pt),ft=new Sm,K=new Am(le),P=new Nf(R,T,mt,it,_,c),ct=new Im(R,it,ce),Rt=new Hm(F,be,ce,mt),q=new Ff(F,le,be),ht=new $f(F,le,be),be.programs=Q.programs,R.capabilities=ce,R.extensions=le,R.properties=Pt,R.renderLists=ft,R.shadowMap=ct,R.state=mt,R.info=be}x!==$e&&(N=new ep(x,e.width,e.height,o,s,r));const st=new zm(R,F);this.xr=st,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){const S=le.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=le.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return nt},this.setPixelRatio=function(S){S!==void 0&&(nt=S,this.setSize(xt,Tt,!1))},this.getSize=function(S){return S.set(xt,Tt)},this.setSize=function(S,D,W=!0){if(st.isPresenting){Dt("WebGLRenderer: Can't change size while VR device is presenting.");return}xt=S,Tt=D,e.width=Math.floor(S*nt),e.height=Math.floor(D*nt),W===!0&&(e.style.width=S+"px",e.style.height=D+"px"),N!==null&&N.setSize(e.width,e.height),this.setViewport(0,0,S,D)},this.getDrawingBufferSize=function(S){return S.set(xt*nt,Tt*nt).floor()},this.setDrawingBufferSize=function(S,D,W){xt=S,Tt=D,nt=W,e.width=Math.floor(S*W),e.height=Math.floor(D*W),this.setViewport(0,0,S,D)},this.setEffects=function(S){if(x===$e){jt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(S){for(let D=0;D<S.length;D++)if(S[D].isOutputPass===!0){Dt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}N.setEffects(S||[])},this.getCurrentViewport=function(S){return S.copy(tt)},this.getViewport=function(S){return S.copy(wt)},this.setViewport=function(S,D,W,O){S.isVector4?wt.set(S.x,S.y,S.z,S.w):wt.set(S,D,W,O),mt.viewport(tt.copy(wt).multiplyScalar(tn()).round())},this.getScissor=function(S){return S.copy(Yt)},this.setScissor=function(S,D,W,O){S.isVector4?Yt.set(S.x,S.y,S.z,S.w):Yt.set(S,D,W,O),mt.scissor(Mt.copy(Yt).multiplyScalar(tn()).round())},this.getScissorTest=function(){return Kt},this.setScissorTest=function(S){mt.setScissorTest(Kt=S)},this.setOpaqueSort=function(S){St=S},this.setTransparentSort=function(S){Vt=S},this.getClearColor=function(S){return S.copy(P.getClearColor())},this.setClearColor=function(){P.setClearColor(...arguments)},this.getClearAlpha=function(){return P.getClearAlpha()},this.setClearAlpha=function(){P.setClearAlpha(...arguments)},this.clear=function(S=!0,D=!0,W=!0){let O=0;if(S){let k=!1;if(et!==null){const pt=et.texture.format;k=p.has(pt)}if(k){const pt=et.texture.type,yt=f.has(pt),dt=P.getClearColor(),vt=P.getClearAlpha(),At=dt.r,zt=dt.g,Xt=dt.b;yt?(v[0]=At,v[1]=zt,v[2]=Xt,v[3]=vt,F.clearBufferuiv(F.COLOR,0,v)):(E[0]=At,E[1]=zt,E[2]=Xt,E[3]=vt,F.clearBufferiv(F.COLOR,0,E))}else O|=F.COLOR_BUFFER_BIT}D&&(O|=F.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),W&&(O|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O!==0&&F.clear(O)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(S){S.setRenderer(this),U=S},this.dispose=function(){e.removeEventListener("webglcontextlost",Ct,!1),e.removeEventListener("webglcontextrestored",kt,!1),e.removeEventListener("webglcontextcreationerror",gt,!1),P.dispose(),ft.dispose(),K.dispose(),Ft.dispose(),Pt.dispose(),T.dispose(),it.dispose(),B.dispose(),lt.dispose(),Rt.dispose(),Q.dispose(),st.dispose(),st.removeEventListener("sessionstart",po),st.removeEventListener("sessionend",mo),ti.stop()};function Ct(S){S.preventDefault(),ar("WebGLRenderer: Context Lost."),L=!0}function kt(){ar("WebGLRenderer: Context Restored."),L=!1;const S=be.autoReset,D=ct.enabled,W=ct.autoUpdate,O=ct.needsUpdate,k=ct.type;Gt(),be.autoReset=S,ct.enabled=D,ct.autoUpdate=W,ct.needsUpdate=O,ct.type=k}function gt(S){jt("WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function ee(S){const D=S.target;D.removeEventListener("dispose",ee),Ae(D)}function Ae(S){zn(S),Pt.remove(S)}function zn(S){const D=Pt.get(S).programs;D!==void 0&&(D.forEach(function(W){Q.releaseProgram(W)}),S.isShaderMaterial&&Q.releaseShaderCache(S))}this.renderBufferDirect=function(S,D,W,O,k,pt){D===null&&(D=Qe);const yt=k.isMesh&&k.matrixWorld.determinantAffine()<0,dt=Rc(S,D,W,O,k);mt.setMaterial(O,yt);let vt=W.index,At=1;if(O.wireframe===!0){if(vt=B.getWireframeAttribute(W),vt===void 0)return;At=2}const zt=W.drawRange,Xt=W.attributes.position;let bt=zt.start*At,qt=(zt.start+zt.count)*At;pt!==null&&(bt=Math.max(bt,pt.start*At),qt=Math.min(qt,(pt.start+pt.count)*At)),vt!==null?(bt=Math.max(bt,0),qt=Math.min(qt,vt.count)):Xt!=null&&(bt=Math.max(bt,0),qt=Math.min(qt,Xt.count));const xe=qt-bt;if(xe<0||xe===1/0)return;lt.setup(k,O,dt,W,vt);let se,ie=q;if(vt!==null&&(se=M.get(vt),ie=ht,ie.setIndex(se)),k.isMesh)O.wireframe===!0?(mt.setLineWidth(O.wireframeLinewidth*tn()),ie.setMode(F.LINES)):ie.setMode(F.TRIANGLES);else if(k.isLine){let De=O.linewidth;De===void 0&&(De=1),mt.setLineWidth(De*tn()),k.isLineSegments?ie.setMode(F.LINES):k.isLineLoop?ie.setMode(F.LINE_LOOP):ie.setMode(F.LINE_STRIP)}else k.isPoints?ie.setMode(F.POINTS):k.isSprite&&ie.setMode(F.TRIANGLES);if(k.isBatchedMesh)if(le.get("WEBGL_multi_draw"))ie.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{const De=k._multiDrawStarts,Et=k._multiDrawCounts,ze=k._multiDrawCount,te=vt?M.get(vt).bytesPerElement:1,ei=Pt.get(O).currentProgram.getUniforms();for(let Ne=0;Ne<ze;Ne++)ei.setValue(F,"_gl_DrawID",Ne),ie.render(De[Ne]/te,Et[Ne])}else if(k.isInstancedMesh)ie.renderInstances(bt,xe,k.count);else if(W.isInstancedBufferGeometry){const De=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,Et=Math.min(W.instanceCount,De);ie.renderInstances(bt,xe,Et)}else ie.render(bt,xe)};function fo(S,D,W,O){U!==null&&S.isNodeMaterial&&U.setObject(O,S),ye===!0&&$.setState(S,W,!1),S.transparent===!0&&S.side===on&&S.forceSinglePass===!1?(S.side=Ve,S.needsUpdate=!0,Vi(S,D,O),S.side=oi,S.needsUpdate=!0,Vi(S,D,O),S.side=on):Vi(S,D,O)}this.compile=function(S,D,W=null){W===null&&(W=S),U!==null&&U.renderStart(S,D,W),A=K.get(W),A.init(D),b.push(A),W.traverseVisible(function(k){k.isLight&&k.layers.test(D.layers)&&(A.pushLight(k),k.castShadow&&A.pushShadow(k))}),S!==W&&S.traverseVisible(function(k){k.isLight&&k.layers.test(D.layers)&&(A.pushLight(k),k.castShadow&&A.pushShadow(k))}),A.setupLights(),U!==null&&U.updateLights(A.state.lightsArray),We=this.localClippingEnabled,ye=$.init(this.clippingPlanes,We),ye===!0&&$.setGlobalState(this.clippingPlanes,D),U!==null&&ct.render(A.state.shadowsArray,W,D);const O=new Set;return S.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;const pt=k.material;if(pt)if(Array.isArray(pt))for(let yt=0;yt<pt.length;yt++){const dt=pt[yt];fo(dt,W,D,k),O.add(dt)}else fo(pt,W,D,k),O.add(pt)}),A=b.pop(),U!==null&&U.renderEnd(),O},this.compileAsync=function(S,D,W=null){const O=this.compile(S,D,W);return new Promise(k=>{function pt(){if(O.forEach(function(yt){const vt=Pt.get(yt).currentProgram;(vt===void 0||vt.isReady())&&O.delete(yt)}),O.size===0){k(S);return}setTimeout(pt,10)}le.get("KHR_parallel_shader_compile")!==null?pt():setTimeout(pt,10)})};let xr=null;function Tc(S){xr&&xr(S)}function po(){ti.stop()}function mo(){ti.start()}const ti=new fc;ti.setAnimationLoop(Tc),typeof self<"u"&&ti.setContext(self),this.setAnimationLoop=function(S){xr=S,st.setAnimationLoop(S),S===null?ti.stop():ti.start()},st.addEventListener("sessionstart",po),st.addEventListener("sessionend",mo),this.render=function(S,D){if(D!==void 0&&D.isCamera!==!0){jt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;U!==null&&U.renderStart(S,D);const W=st.enabled===!0&&st.isPresenting===!0,O=N!==null&&(et===null||W)&&N.begin(R,et);if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),st.enabled===!0&&st.isPresenting===!0&&(N===null||N.isCompositing()===!1)&&(st.cameraAutoUpdate===!0&&st.updateCamera(D),D=st.getCamera()),S.isScene===!0&&S.onBeforeRender(R,S,D,et),A=K.get(S,b.length),A.init(D),A.state.textureUnits=Ft.getTextureUnits(),b.push(A),de.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),D.isArrayCamera?Pe.setFromArrayCamera(D):Wt.setFromProjectionMatrix(de,gn,D.reversedDepth),We=this.localClippingEnabled,ye=$.init(this.clippingPlanes,We),w=ft.get(S,g.length),w.init(),g.push(w),this.info.render.frame++,st.enabled===!0&&st.isPresenting===!0){const yt=R.xr.getDepthSensingMesh();yt!==null&&vr(yt,D,-1/0,R.sortObjects)}vr(S,D,0,R.sortObjects),w.finish(),U!==null&&U.updateLights(A.state.lightsArray),R.sortObjects===!0&&w.sort(St,Vt),je=st.enabled===!1||st.isPresenting===!1||st.hasDepthSensing()===!1,je&&P.addToRenderList(w,S),this.info.autoReset===!0&&this.info.reset(),ye===!0&&$.beginShadows();const k=A.state.shadowsArray;if(ct.render(k,S,D),ye===!0&&$.endShadows(),(O&&N.hasRenderPass())===!1){const yt=w.opaque,dt=w.transmissive;if(A.setupLights(),D.isArrayCamera){const vt=D.cameras;if(dt.length>0)for(let At=0,zt=vt.length;At<zt;At++){const Xt=vt[At];_o(yt,dt,S,Xt)}je&&P.render(S);for(let At=0,zt=vt.length;At<zt;At++){const Xt=vt[At];go(w,S,Xt,Xt.viewport)}}else dt.length>0&&_o(yt,dt,S,D),je&&P.render(S),go(w,S,D)}et!==null&&z===0&&(Ft.updateMultisampleRenderTarget(et),Ft.updateRenderTargetMipmap(et)),O&&N.end(R),S.isScene===!0&&S.onAfterRender(R,S,D),lt.resetDefaultState(),V=-1,j=null,b.pop(),b.length>0?(A=b[b.length-1],Ft.setTextureUnits(A.state.textureUnits),ye===!0&&$.setGlobalState(R.clippingPlanes,A.state.camera)):A=null,g.pop(),g.length>0?w=g[g.length-1]:w=null,U!==null&&U.renderEnd()};function vr(S,D,W,O){if(S.visible===!1)return;if(S.layers.test(D.layers)){if(S.isGroup)W=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(D);else if(S.isLight)A.pushLight(S),S.castShadow&&A.pushShadow(S);else if(S.isSprite){const yt=D.isArrayCamera?Pe:Wt;if(!S.frustumCulled||S.intersectsFrustum(yt)){O&&Te.setFromMatrixPosition(S.matrixWorld).applyMatrix4(de);const dt=it.update(S),vt=S.material;vt.visible&&w.push(S,dt,vt,W,Te.z,null,D)}}else if(S.isMesh||S.isLine||S.isPoints){const yt=D.isArrayCamera?Pe:Wt;if(!S.frustumCulled||S.intersectsFrustum(yt)){const dt=it.update(S),vt=S.material;if(O&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Te.copy(S.boundingSphere.center)):(dt.boundingSphere===null&&dt.computeBoundingSphere(),Te.copy(dt.boundingSphere.center)),Te.applyMatrix4(S.matrixWorld).applyMatrix4(de)),Array.isArray(vt)){const At=dt.groups;for(let zt=0,Xt=At.length;zt<Xt;zt++){const bt=At[zt],qt=vt[bt.materialIndex];qt&&qt.visible&&w.push(S,dt,qt,W,Te.z,bt,D)}}else vt.visible&&w.push(S,dt,vt,W,Te.z,null,D)}}}const pt=S.children;for(let yt=0,dt=pt.length;yt<dt;yt++)vr(pt[yt],D,W,O)}function go(S,D,W,O){const{opaque:k,transmissive:pt,transparent:yt}=S;A.setupLightsView(W),ye===!0&&$.setGlobalState(R.clippingPlanes,W),O&&mt.viewport(tt.copy(O)),k.length>0&&fs(k,D,W),pt.length>0&&fs(pt,D,W),yt.length>0&&fs(yt,D,W),mt.buffers.depth.setTest(!0),mt.buffers.depth.setMask(!0),mt.buffers.color.setMask(!0),mt.setPolygonOffset(!1)}function _o(S,D,W,O){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;if(A.state.transmissionRenderTarget[O.id]===void 0){const bt=le.has("EXT_color_buffer_half_float")||le.has("EXT_color_buffer_float");A.state.transmissionRenderTarget[O.id]=new En(1,1,{generateMipmaps:!0,type:bt?Tn:$e,minFilter:Kn,samples:Math.max(4,ce.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Zt.workingColorSpace})}const pt=A.state.transmissionRenderTarget[O.id],yt=O.viewport||tt;pt.setSize(yt.z*R.transmissionResolutionScale,yt.w*R.transmissionResolutionScale);const dt=R.getRenderTarget(),vt=R.getActiveCubeFace(),At=R.getActiveMipmapLevel();R.setRenderTarget(pt),R.getClearColor(Y),ut=R.getClearAlpha(),ut<1&&R.setClearColor(16777215,.5),R.clear(),je&&P.render(W);const zt=R.toneMapping;R.toneMapping=Nn;const Xt=O.viewport;if(O.viewport!==void 0&&(O.viewport=void 0),A.setupLightsView(O),ye===!0&&$.setGlobalState(R.clippingPlanes,O),fs(S,W,O),Ft.updateMultisampleRenderTarget(pt),Ft.updateRenderTargetMipmap(pt),le.has("WEBGL_multisampled_render_to_texture")===!1){let bt=!1;for(let qt=0,xe=D.length;qt<xe;qt++){const se=D[qt],{object:ie,geometry:De,material:Et,group:ze}=se;if(Et.side===on&&ie.layers.test(O.layers)){const te=Et.side;Et.side=Ve,Et.needsUpdate=!0,xo(ie,W,O,De,Et,ze),Et.side=te,Et.needsUpdate=!0,bt=!0}}bt===!0&&(Ft.updateMultisampleRenderTarget(pt),Ft.updateRenderTargetMipmap(pt))}R.setRenderTarget(dt,vt,At),R.setClearColor(Y,ut),Xt!==void 0&&(O.viewport=Xt),R.toneMapping=zt}function fs(S,D,W){const O=D.isScene===!0?D.overrideMaterial:null;for(let k=0,pt=S.length;k<pt;k++){const yt=S[k],{object:dt,geometry:vt,group:At}=yt;let zt=yt.material;zt.allowOverride===!0&&O!==null&&(zt=O),dt.layers.test(W.layers)&&xo(dt,D,W,vt,zt,At)}}function xo(S,D,W,O,k,pt){U!==null&&k.isNodeMaterial&&U.setObject(S,k),S.onBeforeRender(R,D,W,O,k,pt),S.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),k.onBeforeRender(R,D,W,O,S,pt),k.transparent===!0&&k.side===on&&k.forceSinglePass===!1?(k.side=Ve,k.needsUpdate=!0,R.renderBufferDirect(W,D,O,k,S,pt),k.side=oi,k.needsUpdate=!0,R.renderBufferDirect(W,D,O,k,S,pt),k.side=on):R.renderBufferDirect(W,D,O,k,S,pt),S.onAfterRender(R,D,W,O,k,pt)}function vo(S){let D=0;for(const W of S)W.texture!==null&&D++;return D}function Vi(S,D,W){D.isScene!==!0&&(D=Qe);const O=Pt.get(S),k=A.state.lights,pt=A.state.shadowsArray,yt=k.state.version,dt=Q.getParameters(S,k.state,pt,D,W,A.state.lightProbeGridArray),vt=Q.getProgramCacheKey(dt);let At=O.programs;O.environment=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?D.environment:null,O.fog=D.fog;const zt=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap;O.envMap=T.get(S.envMap||O.environment,zt),O.envMapRotation=O.environment!==null&&S.envMap===null?D.environmentRotation:S.envMapRotation,At===void 0&&(S.addEventListener("dispose",ee),At=new Map,O.programs=At,O.programVariants=new Map);let Xt=At.get(vt);if(Xt!==void 0){if(O.currentProgram===Xt&&O.lightsStateVersion===yt)return So(S,dt),Xt}else dt.uniforms=Q.getUniforms(S),U!==null&&S.isNodeMaterial&&U.build(S,W,dt),S.onBeforeCompile(dt,R),Xt=Q.acquireProgram(dt,vt),At.set(vt,Xt),O.uniforms=dt.uniforms;const bt=O.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(bt.clippingPlanes=$.uniform),So(S,dt),O.needsLights=Pc(S),O.lightsStateVersion=yt,O.needsLights&&(bt.ambientLightColor.value=k.state.ambient,bt.lightProbe.value=k.state.probe,bt.sunLights.value=k.state.sun,bt.sunLightShadows.value=k.state.sunShadow,bt.directionalLights.value=k.state.directional,bt.directionalLightShadows.value=k.state.directionalShadow,bt.spotLights.value=k.state.spot,bt.spotLightShadows.value=k.state.spotShadow,bt.rectAreaLights.value=k.state.rectArea,bt.ltc_1.value=k.state.rectAreaLTC1,bt.ltc_2.value=k.state.rectAreaLTC2,bt.pointLights.value=k.state.point,bt.pointLightShadows.value=k.state.pointShadow,bt.hemisphereLights.value=k.state.hemi,bt.sunShadowMatrix.value=k.state.sunShadowMatrix,bt.sunShadowCascade.value=k.state.sunShadowCascade,bt.directionalShadowMatrix.value=k.state.directionalShadowMatrix,bt.spotLightMatrix.value=k.state.spotLightMatrix,bt.spotLightMap.value=k.state.spotLightMap,bt.pointShadowMatrix.value=k.state.pointShadowMatrix),O.numLightProbeGrids=vo(A.state.lightProbeGridArray),O.currentProgram=Xt,O.uniformsList=null,Xt}function Ac(S,D,W,O,k){const pt=Pt.get(S),yt=pt.currentProgram.id+","+O+","+k;let dt=pt.programVariants.get(yt);return dt===void 0?(dt=Vi(S,D,W),pt.programVariants.set(yt,dt)):(pt.currentProgram=dt,pt.uniformsList=null,pt.outputColorSpace=O,pt.toneMapping=k),dt}function Mo(S){if(S.uniformsList===null){const D=S.currentProgram.getUniforms();S.uniformsList=js.seqWithValue(D.seq,S.uniforms)}return S.uniformsList}function So(S,D){const W=Pt.get(S);W.outputColorSpace=D.outputColorSpace,W.batching=D.batching,W.batchingColor=D.batchingColor,W.instancing=D.instancing,W.instancingColor=D.instancingColor,W.instancingMorph=D.instancingMorph,W.skinning=D.skinning,W.morphTargets=D.morphTargets,W.morphNormals=D.morphNormals,W.morphColors=D.morphColors,W.morphTargetsCount=D.morphTargetsCount,W.numClippingPlanes=D.numClippingPlanes,W.numIntersection=D.numClipIntersection,W.vertexAlphas=D.vertexAlphas,W.vertexTangents=D.vertexTangents,W.toneMapping=D.toneMapping}function Rc(S,D,W,O,k){D.isScene!==!0&&(D=Qe),Ft.resetTextureUnits();const pt=D.fog,yt=O.isMeshStandardMaterial||O.isMeshLambertMaterial||O.isMeshPhongMaterial?D.environment:null,dt=et===null?R.outputColorSpace:et.isXRRenderTarget===!0?et.texture.colorSpace:Zt.workingColorSpace,vt=O.isMeshStandardMaterial||O.isMeshLambertMaterial&&!O.envMap||O.isMeshPhongMaterial&&!O.envMap,At=T.get(O.envMap||yt,vt),zt=O.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,Xt=!!W.attributes.tangent&&(!!O.normalMap||O.anisotropy>0),bt=!!W.morphAttributes.position,qt=!!W.morphAttributes.normal,xe=!!W.morphAttributes.color;let se=Nn;O.toneMapped&&(et===null||et.isXRRenderTarget===!0)&&(se=R.toneMapping);const ie=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,De=ie!==void 0?ie.length:0,Et=Pt.get(O),ze=A.state.lights;if(ye===!0&&(We===!0||S!==j)){const fe=S===j&&O.id===V;$.setState(O,S,fe)}let te=!1,ei=!1;O.version===Et.__version?Et.needsLights&&Et.lightsStateVersion!==ze.state.version||k.isBatchedMesh&&Et.batching===!1||!k.isBatchedMesh&&Et.batching===!0||k.isBatchedMesh&&Et.batchingColor===!0&&k._colorsTexture===null||k.isBatchedMesh&&Et.batchingColor===!1&&k._colorsTexture!==null||k.isInstancedMesh&&Et.instancing===!1||!k.isInstancedMesh&&Et.instancing===!0||k.isSkinnedMesh&&Et.skinning===!1||!k.isSkinnedMesh&&Et.skinning===!0||k.isInstancedMesh&&Et.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&Et.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&Et.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&Et.instancingMorph===!1&&k.morphTexture!==null||Et.envMap!==At||O.fog===!0&&Et.fog!==pt||Et.numClippingPlanes!==void 0&&(Et.numClippingPlanes!==$.numPlanes||Et.numIntersection!==$.numIntersection)||Et.vertexAlphas!==zt||Et.vertexTangents!==Xt||Et.morphTargets!==bt||Et.morphNormals!==qt||Et.morphColors!==xe||Et.morphTargetsCount!==De||Et.numLightProbeGrids!==vo(A.state.lightProbeGridArray)?te=!0:(Et.outputColorSpace!==dt||Et.toneMapping!==se)&&(ei=!0):(te=!0,Et.__version=O.version);let Ne=Et.currentProgram;(te===!0||ei===!0)&&(Ne=ei===!0?Ac(O,D,k,dt,se):Vi(O,D,k),U&&O.isNodeMaterial&&U.onUpdateProgram(O,Ne,Et));let ps=!1,kn=!1,ni=!1;const Jt=Ne.getUniforms(),Le=Et.uniforms;if(mt.useProgram(Ne.program)&&(ps=!0,kn=!0,ni=!0),O.id!==V&&(V=O.id,kn=!0),ps||j!==S){mt.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),Jt.setValue(F,"projectionMatrix",S.projectionMatrix),Jt.setValue(F,"viewMatrix",S.matrixWorldInverse);const Re=Jt.map.cameraPosition;Re!==void 0&&Re.setValue(F,vn.setFromMatrixPosition(S.matrixWorld)),ce.logarithmicDepthBuffer&&Jt.setValue(F,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(O.isMeshPhongMaterial||O.isMeshToonMaterial||O.isMeshLambertMaterial||O.isMeshBasicMaterial||O.isMeshStandardMaterial||O.isShaderMaterial)&&Jt.setValue(F,"isOrthographic",S.isOrthographicCamera===!0),j!==S&&(j=S,kn=!0,ni=!0)}if(Et.needsLights&&(ze.state.sunShadowMap.length>0&&Jt.setValue(F,"sunShadowMap",ze.state.sunShadowMap,Ft),ze.state.directionalShadowMap.length>0&&Jt.setValue(F,"directionalShadowMap",ze.state.directionalShadowMap,Ft),ze.state.spotShadowMap.length>0&&Jt.setValue(F,"spotShadowMap",ze.state.spotShadowMap,Ft),ze.state.pointShadowMap.length>0&&Jt.setValue(F,"pointShadowMap",ze.state.pointShadowMap,Ft)),k.isSkinnedMesh){Jt.setOptional(F,k,"bindMatrix"),Jt.setOptional(F,k,"bindMatrixInverse");const fe=k.skeleton;fe&&(fe.boneTexture===null&&fe.computeBoneTexture(),Jt.setValue(F,"boneTexture",fe.boneTexture,Ft))}k.isBatchedMesh&&(Jt.setOptional(F,k,"batchingTexture"),Jt.setValue(F,"batchingTexture",k._matricesTexture,Ft),Jt.setOptional(F,k,"batchingIdTexture"),Jt.setValue(F,"batchingIdTexture",k._indirectTexture,Ft),Jt.setOptional(F,k,"batchingColorTexture"),k._colorsTexture!==null&&Jt.setValue(F,"batchingColorTexture",k._colorsTexture,Ft));const hn=W.morphAttributes;if((hn.position!==void 0||hn.normal!==void 0||hn.color!==void 0)&&J.update(k,W,Ne),(kn||Et.receiveShadow!==k.receiveShadow)&&(Et.receiveShadow=k.receiveShadow,Jt.setValue(F,"receiveShadow",k.receiveShadow)),(O.isMeshStandardMaterial||O.isMeshLambertMaterial||O.isMeshPhongMaterial)&&O.envMap===null&&D.environment!==null&&(Le.envMapIntensity.value=D.environmentIntensity),Le.dfgLUT!==void 0&&(Le.dfgLUT.value=Wm()),kn){if(Jt.setValue(F,"toneMappingExposure",R.toneMappingExposure),Et.needsLights&&Cc(Le,ni),pt&&O.fog===!0&&ot.refreshFogUniforms(Le,pt),ot.refreshMaterialUniforms(Le,O,nt,Tt,A.state.transmissionRenderTarget[S.id]),Et.needsLights&&Et.numLightProbeGrids>0){const fe=y;let Re=0;for(const An of A.state.lightProbeGridArray)An.texture!==null&&(fe.textures[Re]=An.texture,fe.min[Re]=An.boundingBox.min,fe.max[Re]=An.boundingBox.max,fe.resolution[Re]=An.resolution,Re++);for(const An in fe)fe[An].length=Re;Le.probesSH.value=fe.textures,Le.probesMin.value=fe.min,Le.probesMax.value=fe.max,Le.probesResolution.value=fe.resolution}js.upload(F,Mo(Et),Le,Ft)}if(O.isShaderMaterial&&O.uniformsNeedUpdate===!0&&(js.upload(F,Mo(Et),Le,Ft),O.uniformsNeedUpdate=!1),O.isSpriteMaterial&&Jt.setValue(F,"center",k.center),Jt.setValue(F,"modelViewMatrix",k.modelViewMatrix),Jt.setValue(F,"normalMatrix",k.normalMatrix),Jt.setValue(F,"modelMatrix",k.matrixWorld),O.uniformsGroups!==void 0){const fe=O.uniformsGroups;for(let Re=0,An=fe.length;Re<An;Re++){const bo=fe[Re];Rt.update(bo,Ne),Rt.bind(bo,Ne)}}return Ne}function Cc(S,D){S.ambientLightColor.needsUpdate=D,S.lightProbe.needsUpdate=D,S.sunLights.needsUpdate=D,S.sunLightShadows.needsUpdate=D,S.directionalLights.needsUpdate=D,S.directionalLightShadows.needsUpdate=D,S.pointLights.needsUpdate=D,S.pointLightShadows.needsUpdate=D,S.spotLights.needsUpdate=D,S.spotLightShadows.needsUpdate=D,S.rectAreaLights.needsUpdate=D,S.hemisphereLights.needsUpdate=D}function Pc(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return Z},this.getActiveMipmapLevel=function(){return z},this.getRenderTarget=function(){return et},this.setRenderTargetTextures=function(S,D,W){const O=Pt.get(S);O.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,O.__autoAllocateDepthBuffer===!1&&(O.__useRenderToTexture=!1),Pt.get(S.texture).__webglTexture=D,Pt.get(S.depthTexture).__webglTexture=O.__autoAllocateDepthBuffer?void 0:W,O.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,D){const W=Pt.get(S);W.__webglFramebuffer=D,W.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(S,D=0,W=0){et=S,Z=D,z=W;let O=null,k=!1,pt=!1;if(S){const dt=Pt.get(S);if(dt.__useDefaultFramebuffer!==void 0){mt.bindFramebuffer(F.FRAMEBUFFER,dt.__webglFramebuffer),tt.copy(S.viewport),Mt.copy(S.scissor),Lt=S.scissorTest,mt.viewport(tt),mt.scissor(Mt),mt.setScissorTest(Lt),V=-1;return}else if(dt.__webglFramebuffer===void 0)Ft.setupRenderTarget(S);else if(dt.__hasExternalTextures)Ft.rebindTextures(S,Pt.get(S.texture).__webglTexture,Pt.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const zt=S.depthTexture;if(dt.__boundDepthTexture!==zt){if(zt!==null&&Pt.has(zt)&&(S.width!==zt.image.width||S.height!==zt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Ft.setupDepthRenderbuffer(S)}}const vt=S.texture;(vt.isData3DTexture||vt.isDataArrayTexture||vt.isCompressedArrayTexture)&&(pt=!0);const At=Pt.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(At[D])?O=At[D][W]:O=At[D],k=!0):S.samples>0&&Ft.useMultisampledRTT(S)===!1?O=Pt.get(S).__webglMultisampledFramebuffer:Array.isArray(At)?O=At[W]:O=At,tt.copy(S.viewport),Mt.copy(S.scissor),Lt=S.scissorTest}else tt.copy(wt).multiplyScalar(nt).floor(),Mt.copy(Yt).multiplyScalar(nt).floor(),Lt=Kt;if(W!==0&&(O=G),mt.bindFramebuffer(F.FRAMEBUFFER,O)&&mt.drawBuffers(S,O),mt.viewport(tt),mt.scissor(Mt),mt.setScissorTest(Lt),k){const dt=Pt.get(S.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+D,dt.__webglTexture,W)}else if(pt){const dt=D;for(let vt=0;vt<S.textures.length;vt++){const At=Pt.get(S.textures[vt]);F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0+vt,At.__webglTexture,W,dt)}}else if(S!==null&&W!==0){const dt=Pt.get(S.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,dt.__webglTexture,W)}V=-1};function yo(S){const D=Pt.get(S);return(D.__readFormat!==S.format||D.__readType!==S.type)&&(D.__readFormat=S.format,D.__readType=S.type,D.__formatReadable=ce.textureFormatReadable(S.format),D.__typeReadable=ce.textureTypeReadable(S.type)),D}this.readRenderTargetPixels=function(S,D,W,O,k,pt,yt,dt=0){if(!(S&&S.isWebGLRenderTarget)){jt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let vt=Pt.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&yt!==void 0&&(vt=vt[yt],Array.isArray(vt)&&(vt=vt[0])),vt){mt.bindFramebuffer(F.FRAMEBUFFER,vt);try{const At=S.textures[dt],zt=At.format,Xt=At.type;S.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+dt);const bt=yo(At);if(bt.__formatReadable===!1){jt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(bt.__typeReadable===!1){jt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=S.width-O&&W>=0&&W<=S.height-k&&F.readPixels(D,W,O,k,rt.convert(zt),rt.convert(Xt),pt)}finally{const At=et!==null?Pt.get(et).__webglFramebuffer:null;mt.bindFramebuffer(F.FRAMEBUFFER,At)}}},this.readRenderTargetPixelsAsync=async function(S,D,W,O,k,pt,yt,dt=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let vt=Pt.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&yt!==void 0&&(vt=vt[yt],Array.isArray(vt)&&(vt=vt[0])),vt)if(D>=0&&D<=S.width-O&&W>=0&&W<=S.height-k){mt.bindFramebuffer(F.FRAMEBUFFER,vt);const At=S.textures[dt],zt=At.format,Xt=At.type;S.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+dt);const bt=yo(At);if(bt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(bt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const qt=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,qt),F.bufferData(F.PIXEL_PACK_BUFFER,pt.byteLength,F.STREAM_READ),F.readPixels(D,W,O,k,rt.convert(zt),rt.convert(Xt),0),F.bindBuffer(F.PIXEL_PACK_BUFFER,null);const xe=et!==null?Pt.get(et).__webglFramebuffer:null;mt.bindFramebuffer(F.FRAMEBUFFER,xe);const se=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await uh(F,se,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,qt),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,pt),F.bindBuffer(F.PIXEL_PACK_BUFFER,null),F.deleteBuffer(qt),F.deleteSync(se),pt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,D=null,W=0){const O=Math.pow(2,-W),k=Math.floor(S.image.width*O),pt=Math.floor(S.image.height*O),yt=D!==null?D.x:0,dt=D!==null?D.y:0;Ft.setTexture2D(S,0),F.copyTexSubImage2D(F.TEXTURE_2D,W,0,0,yt,dt,k,pt),mt.unbindTexture()},this.copyTextureToTexture=function(S,D,W=null,O=null,k=0,pt=0){let yt,dt,vt,At,zt,Xt,bt,qt,xe;const se=S.isCompressedTexture?S.mipmaps[pt]:S.image;if(W!==null)yt=W.max.x-W.min.x,dt=W.max.y-W.min.y,vt=W.isBox3?W.max.z-W.min.z:1,At=W.min.x,zt=W.min.y,Xt=W.isBox3?W.min.z:0;else{const Jt=Math.pow(2,-k);yt=Math.floor(se.width*Jt),dt=Math.floor(se.height*Jt),S.isDataArrayTexture?vt=se.depth:S.isData3DTexture?vt=Math.floor(se.depth*Jt):vt=1,At=0,zt=0,Xt=0}O!==null?(bt=O.x,qt=O.y,xe=O.z):(bt=0,qt=0,xe=0);const ie=rt.convert(D.format),De=rt.convert(D.type);let Et;D.isData3DTexture?(Ft.setTexture3D(D,0),Et=F.TEXTURE_3D):D.isDataArrayTexture||D.isCompressedArrayTexture?(Ft.setTexture2DArray(D,0),Et=F.TEXTURE_2D_ARRAY):(Ft.setTexture2D(D,0),Et=F.TEXTURE_2D),mt.activeTexture(F.TEXTURE0),mt.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,D.flipY),mt.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),mt.pixelStorei(F.UNPACK_ALIGNMENT,D.unpackAlignment);const ze=mt.getParameter(F.UNPACK_ROW_LENGTH),te=mt.getParameter(F.UNPACK_IMAGE_HEIGHT),ei=mt.getParameter(F.UNPACK_SKIP_PIXELS),Ne=mt.getParameter(F.UNPACK_SKIP_ROWS),ps=mt.getParameter(F.UNPACK_SKIP_IMAGES);mt.pixelStorei(F.UNPACK_ROW_LENGTH,se.width),mt.pixelStorei(F.UNPACK_IMAGE_HEIGHT,se.height),mt.pixelStorei(F.UNPACK_SKIP_PIXELS,At),mt.pixelStorei(F.UNPACK_SKIP_ROWS,zt),mt.pixelStorei(F.UNPACK_SKIP_IMAGES,Xt);const kn=S.isDataArrayTexture||S.isData3DTexture,ni=D.isDataArrayTexture||D.isData3DTexture;if(S.isDepthTexture){const Jt=Pt.get(S),Le=Pt.get(D),hn=Pt.get(Jt.__renderTarget),fe=Pt.get(Le.__renderTarget);mt.bindFramebuffer(F.READ_FRAMEBUFFER,hn.__webglFramebuffer),mt.bindFramebuffer(F.DRAW_FRAMEBUFFER,fe.__webglFramebuffer);for(let Re=0;Re<vt;Re++)kn&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Pt.get(S).__webglTexture,k,Xt+Re),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Pt.get(D).__webglTexture,pt,xe+Re)),F.blitFramebuffer(At,zt,At+yt,zt+dt,bt,qt,bt+yt,qt+dt,F.DEPTH_BUFFER_BIT,F.NEAREST);mt.bindFramebuffer(F.READ_FRAMEBUFFER,null),mt.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(k!==0||S.isRenderTargetTexture||Pt.has(S)){const Jt=Pt.get(S),Le=Pt.get(D);mt.bindFramebuffer(F.READ_FRAMEBUFFER,I),mt.bindFramebuffer(F.DRAW_FRAMEBUFFER,H);for(let hn=0;hn<vt;hn++)kn?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Jt.__webglTexture,k,Xt+hn):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,Jt.__webglTexture,k),ni?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Le.__webglTexture,pt,xe+hn):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,Le.__webglTexture,pt),k!==0?F.blitFramebuffer(At,zt,At+yt,zt+dt,bt,qt,bt+yt,qt+dt,F.COLOR_BUFFER_BIT,F.NEAREST):ni?F.copyTexSubImage3D(Et,pt,bt,qt,xe+hn,At,zt,yt,dt):F.copyTexSubImage2D(Et,pt,bt,qt,At,zt,yt,dt);mt.bindFramebuffer(F.READ_FRAMEBUFFER,null),mt.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else ni?S.isDataTexture||S.isData3DTexture?F.texSubImage3D(Et,pt,bt,qt,xe,yt,dt,vt,ie,De,se.data):D.isCompressedArrayTexture?F.compressedTexSubImage3D(Et,pt,bt,qt,xe,yt,dt,vt,ie,se.data):F.texSubImage3D(Et,pt,bt,qt,xe,yt,dt,vt,ie,De,se):S.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,pt,bt,qt,yt,dt,ie,De,se.data):S.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,pt,bt,qt,se.width,se.height,ie,se.data):F.texSubImage2D(F.TEXTURE_2D,pt,bt,qt,yt,dt,ie,De,se);mt.pixelStorei(F.UNPACK_ROW_LENGTH,ze),mt.pixelStorei(F.UNPACK_IMAGE_HEIGHT,te),mt.pixelStorei(F.UNPACK_SKIP_PIXELS,ei),mt.pixelStorei(F.UNPACK_SKIP_ROWS,Ne),mt.pixelStorei(F.UNPACK_SKIP_IMAGES,ps),pt===0&&D.generateMipmaps===!0&&D.mipmapsAutoUpdate===!0&&F.generateMipmap(Et),mt.unbindTexture()},this.initRenderTarget=function(S){Pt.get(S).__webglFramebuffer===void 0&&Ft.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?Ft.setTextureCube(S,0):S.isData3DTexture?Ft.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?Ft.setTexture2DArray(S,0):Ft.setTexture2D(S,0),mt.unbindTexture()},this.resetState=function(){Z=0,z=0,et=null,mt.reset(),lt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return gn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=Zt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Zt._getUnpackColorSpace()}}const me=(i,t,e)=>Math.min(e,Math.max(t,i)),Ec=(i,t,e)=>i+(t-i)*e,pn=(i,t,e,n)=>Ec(i,t,1-Math.exp(-e*n)),X=(i=0,t=1)=>i+Math.random()*(t-i),Ga=(i,t)=>Math.floor(X(i,t+1)),_r=i=>i[Math.floor(Math.random()*i.length)],ue=Math.PI*2;function jn(i,t,e,{repeat:n=null,srgb:s=!0}={}){const r=document.createElement("canvas");r.width=i,r.height=t;const a=r.getContext("2d");e(a,i,t);const o=new ac(r);return s&&(o.colorSpace=He),o.anisotropy=4,n&&(o.wrapS=os,o.wrapT=os,o.repeat.set(n[0],n[1])),o.needsUpdate=!0,o}function ci(i="rgba(255,255,255,1)",t="rgba(255,255,255,0)",e=64){return jn(e,e,(n,s,r)=>{const a=n.createRadialGradient(s/2,r/2,0,s/2,r/2,s/2);a.addColorStop(0,i),a.addColorStop(.25,i),a.addColorStop(1,t),n.fillStyle=a,n.fillRect(0,0,s,r)})}const Xs=[{wall:"#d9776d",trim:"#f2c9a4",win:"#ffcc7a"},{wall:"#5fa8a0",trim:"#e7d9b7",win:"#ffd58a"},{wall:"#e0b155",trim:"#7a4a3a",win:"#ffe3a1"},{wall:"#7d8fc9",trim:"#e8dcc4",win:"#ffcf7d"},{wall:"#b56a9e",trim:"#f0cdb2",win:"#ffd98f"},{wall:"#c96f4f",trim:"#f4dfc0",win:"#ffd07a"},{wall:"#6e9e6b",trim:"#ecd9b8",win:"#ffe1a4"},{wall:"#a3585c",trim:"#e9cfae",win:"#ffcf86"}];function Jr(i,t){const e=Math.sin(i*127.1+t*311.7)*43758.5453;return e-Math.floor(e)}function qm(i,t){return jn(256,256,(e,n,s)=>{e.fillStyle=i.wall,e.fillRect(0,0,n,s);for(let u=0;u<42;u++){const h=X(0,n);e.globalAlpha=X(.02,.08),e.fillStyle=u%3?"#241a20":"#ffffff",e.fillRect(h,0,X(1,7),X(s*.3,s))}e.globalAlpha=1,e.strokeStyle="rgba(30,10,20,.08)",e.lineWidth=1;for(let u=0;u<s;u+=14)e.beginPath(),e.moveTo(0,u),e.lineTo(n,u),e.stroke();const r=3,a=4,o=18,c=14,l=(n-o*2)/r,d=(s-c*2)/a;for(let u=0;u<a;u++)for(let h=0;h<r;h++){const m=o+h*l+l*.18,_=c+u*d+d*.14,x=l*.58,p=d*.56,f=Jr(h+t*7,u+t*3)>.42;if(e.fillStyle="rgba(22,12,26,.72)",e.fillRect(m-3,_-3,x+6,p+6),f){const v=e.createLinearGradient(m,_,m,_+p);v.addColorStop(0,i.win),v.addColorStop(1,"#e88a3e"),e.fillStyle=v}else e.fillStyle="#2a1e33";e.fillRect(m,_,x,p),f&&(e.fillStyle="rgba(255,255,255,.25)",e.fillRect(m+2,_+2,x-4,2)),e.strokeStyle="rgba(20,10,18,.55)",e.lineWidth=1.5,e.strokeRect(m,_,x,p),e.beginPath(),e.moveTo(m+x/2,_),e.lineTo(m+x/2,_+p),e.stroke(),Jr(h+9,u+t)>.8&&(e.fillStyle=["#ffbf3c","#38e08a","#8b5cf6"][Math.floor(Jr(h,u)*3)],e.fillRect(m+1,_+p+4,x-2,3))}e.fillStyle=i.trim,e.fillRect(0,0,n,7),e.fillStyle="rgba(0,0,0,.22)",e.fillRect(0,7,n,2)})}function wc(){return jn(512,512,(i,t,e)=>{const n=i.createLinearGradient(0,0,t,e);n.addColorStop(0,"#7d6a5e"),n.addColorStop(.5,"#6d5a4f"),n.addColorStop(1,"#796457"),i.fillStyle=n,i.fillRect(0,0,t,e);for(let s=0;s<900;s++){i.globalAlpha=X(.02,.1),i.fillStyle=_r(["#2e2220","#b9a58f","#5a463a","#8f9c72"]);const r=X(1,5);i.fillRect(X(0,t),X(0,e),r,r)}i.globalAlpha=1,i.strokeStyle="rgba(35,22,20,.5)",i.lineWidth=3;for(let s=0;s<=t;s+=64)i.beginPath(),i.moveTo(s,0),i.lineTo(s,e),i.stroke();for(let s=0;s<=e;s+=64)i.beginPath(),i.moveTo(0,s),i.lineTo(t,s),i.stroke();i.strokeStyle="rgba(255,240,220,.07)",i.lineWidth=1;for(let s=2;s<=t;s+=64)i.beginPath(),i.moveTo(s,0),i.lineTo(s,e),i.stroke();for(let s=0;s<18;s++)i.globalAlpha=X(.05,.16),i.fillStyle="#3f5a35",i.beginPath(),i.ellipse(X(0,t),X(0,e),X(8,42),X(6,24),X(0,ue),0,ue),i.fill();i.globalAlpha=1},{repeat:[5,4]})}function Ym(){return jn(1024,384,(i,t,e)=>{const n=i.createLinearGradient(0,0,0,e);n.addColorStop(0,"#243b4a"),n.addColorStop(1,"#16222e"),i.fillStyle=n,i.fillRect(0,0,t,e),i.fillStyle="#ffb03a",i.beginPath(),i.arc(820,120,78,0,ue),i.fill(),i.strokeStyle="rgba(255,176,58,.55)",i.lineWidth=10;for(let s=0;s<12;s++){const r=s/12*ue;i.beginPath(),i.moveTo(820+Math.cos(r)*100,120+Math.sin(r)*100),i.lineTo(820+Math.cos(r)*150,120+Math.sin(r)*150),i.stroke()}i.fillStyle="#101822",i.beginPath(),i.moveTo(0,300),i.quadraticCurveTo(180,190,360,300),i.quadraticCurveTo(560,210,760,320),i.quadraticCurveTo(900,250,1024,330),i.lineTo(1024,e),i.lineTo(0,e),i.closePath(),i.fill(),i.save(),i.translate(58,196),i.rotate(-.03),i.font='900 96px "Arial Black", Impact, sans-serif',i.lineWidth=12,i.strokeStyle="#0d141c",i.strokeText("MORRO",0,0),i.fillStyle="#ffe9c9",i.fillText("MORRO",0,0),i.font='900 96px "Arial Black", Impact, sans-serif',i.strokeText("VIVO",34,92),i.fillStyle="#ffbf3c",i.fillText("VIVO",34,92),i.restore();for(let s=0;s<26;s++)i.globalAlpha=X(.05,.2),i.fillStyle=_r(["#38e08a","#ff4d5e","#8b5cf6","#ffbf3c"]),i.beginPath(),i.arc(X(0,t),X(0,e),X(2,16),0,ue),i.fill();i.globalAlpha=1,i.save(),i.translate(660,318),i.rotate(-.06),i.font='italic 700 30px "Arial", sans-serif',i.fillStyle="rgba(255,255,255,.5)",i.fillText("salve, quebrada",0,0),i.restore()})}function Rl(i,t,e=""){return jn(512,256,(n,s,r)=>{n.clearRect(0,0,s,r),n.textAlign="center",n.textBaseline="middle",n.font='900 84px "Arial Black", Impact, sans-serif',n.shadowColor=t,n.shadowBlur=40,n.fillStyle=t,n.fillText(i,s/2,e?r/2-18:r/2),n.shadowBlur=16,n.fillStyle="#fff6e8",n.fillText(i,s/2,e?r/2-18:r/2),e&&(n.font='700 30px "Arial", sans-serif',n.shadowBlur=22,n.fillStyle=t,n.fillText(e,s/2,r/2+62))})}function Km(){return jn(128,256,(i,t,e)=>{i.clearRect(0,0,t,e),i.translate(t/2,0);const n=i.createLinearGradient(0,0,0,e);n.addColorStop(0,"#3f8f4b"),n.addColorStop(1,"#1f5b31"),i.fillStyle=n,i.beginPath(),i.moveTo(0,0),i.quadraticCurveTo(38,60,26,140),i.quadraticCurveTo(16,210,0,256),i.quadraticCurveTo(-16,210,-26,140),i.quadraticCurveTo(-38,60,0,0),i.fill(),i.globalCompositeOperation="destination-out";for(let s=0;s<16;s++){const r=30+s*13,a=8+s*1.6;i.beginPath(),i.ellipse(-a,r,6,10,-.5,0,ue),i.fill(),i.beginPath(),i.ellipse(a,r,6,10,.5,0,ue),i.fill()}i.globalCompositeOperation="source-over",i.strokeStyle="rgba(150,220,150,.22)",i.lineWidth=2,i.beginPath(),i.moveTo(0,10),i.lineTo(0,250),i.stroke()})}function Zm(){const i=new Se(460,32,20),t={uTime:{value:0},uSun:{value:new C(-.42,.14,-.9).normalize()}},e=new On({side:Ve,depthWrite:!1,fog:!1,uniforms:t,vertexShader:`
      varying vec3 vDir;
      void main() {
        vDir = normalize(position);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      uniform float uTime;
      uniform vec3 uSun;
      varying vec3 vDir;

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
      float fbm(vec2 p) {
        float v = 0.0;
        float amp = 0.55;
        for (int i = 0; i < 3; i++) {
          v += noise(p) * amp;
          p *= 2.03;
          amp *= 0.5;
        }
        return v;
      }
      void main() {
        vec3 d = normalize(vDir);
        float h = d.y;
        vec3 zenith = vec3(0.045, 0.028, 0.105);
        vec3 mid = vec3(0.23, 0.085, 0.26);
        vec3 horizon = vec3(0.98, 0.40, 0.27);
        vec3 col = mix(horizon, mid, smoothstep(-0.02, 0.26, h));
        col = mix(col, zenith, smoothstep(0.22, 0.72, h));

        float sd = max(dot(d, normalize(uSun)), 0.0);
        col += vec3(1.0, 0.48, 0.2) * pow(sd, 7.0) * 0.5;
        col += vec3(1.0, 0.86, 0.62) * pow(sd, 420.0) * 1.8;

        vec2 cuv = d.xz / max(0.12, d.y + 0.24);
        float cl = fbm(cuv * 1.35 + vec2(uTime * 0.01, uTime * 0.004));
        float band = smoothstep(0.0, 0.22, h) * (1.0 - smoothstep(0.28, 0.6, h));
        col += vec3(1.0, 0.42, 0.32) * cl * band * 0.38;

        float starSeed = hash(floor(d.xz * 340.0) + floor(d.y * 210.0));
        float stars = step(0.9975, starSeed) * smoothstep(0.34, 0.72, h);
        col += vec3(0.75, 0.82, 1.0) * stars * 0.9;

        gl_FragColor = vec4(col, 1.0);
      }
    `}),n=new at(i,e);return n.frustumCulled=!1,n.renderOrder=-10,{mesh:n,uniforms:t}}function $m(){const i=new re,t=new It({color:16181192,emissive:16769712,emissiveIntensity:.55,roughness:.85}),e=new at(new Me(2.6,3.2,3.4,8),t);e.position.y=1.7,i.add(e);const n=new at(new Me(.9,1.6,8.6,8),t);n.position.y=7.6,i.add(n);const s=new at(new Me(.95,1.05,4.4,8),t);s.position.y=13.6,i.add(s);const r=new at(new Se(.95,10,8),t);r.position.y=16.6,i.add(r);const a=new at(new ae(13.5,.72,.9),t);a.position.y=15.2,i.add(a);const o=new rn(new _n({map:ci("rgba(255,231,180,0.9)","rgba(255,170,80,0)"),blending:he,depthWrite:!1,transparent:!0,opacity:.55}));return o.scale.set(26,26,1),o.position.set(0,15.4,1),i.add(o),i}function Jm(){const i=new re,t=new It({color:9067580,roughness:.92}),e=new It({color:5912614,roughness:.9}),n=new It({color:1182732,roughness:.4}),s=new It({color:722952,roughness:.2}),r=new at(new Se(.56,16,12),t);r.scale.set(1,.82,1.55),r.position.set(0,.66,0),i.add(r);const a=new at(new Me(.3,.4,.5,10),t);a.position.set(0,.95,.62),a.rotation.x=.4,i.add(a);const o=new at(new Se(.31,14,10),t);o.scale.set(1,1.05,1.2),o.position.set(0,1.11,.9),i.add(o);const c=new at(new ae(.3,.24,.26),e);c.position.set(0,1.02,1.14),i.add(c);const l=new at(new ae(.16,.08,.06),n);l.position.set(0,1.09,1.27),i.add(l);for(const u of[-1,1]){const h=new at(new Se(.09,8,6),e);h.scale.set(.7,1,1.2),h.position.set(u*.19,1.36,.83),i.add(h);const m=new at(new Se(.055,8,6),s);m.position.set(u*.2,1.19,1.02),i.add(m)}const d=[];for(const[u,h]of[[-.32,.34],[.32,.34],[-.32,-.38],[.32,-.38]]){const m=new at(new Me(.1,.09,.42,6),e);m.position.set(u,.21,h),i.add(m),d.push(m)}return i.userData.legs=d,i.userData.head=o,i}function Qm(i){const t=[{x:-11.4,z:-8.6,s:.55,indoors:!0},{x:11.8,z:7.2,s:.5,indoors:!0},{x:-24,z:-18,s:1.5},{x:28,z:-26,s:1.35},{x:15,z:30,s:1.2},{x:-38,z:12,s:1.6},{x:48,z:-10,s:1.7}],e=new Me(.11,.2,4.5,6,4);e.translate(0,2.25,0);const n=new Fn({color:6178099}),s=new $n(e,n,t.length),r=new Je(1.5,3.4);r.translate(0,1.7,0);const a=new Fn({map:Km(),transparent:!0,alphaTest:.4,side:on,color:12576432}),o=9,c=new $n(r,a,t.length*o),l=new Qt,d=new xn,u=new cn,h=new C,m=new C;let _=0;t.forEach((x,p)=>{const f=x.indoors?0:-8-x.s*2.5,v=x.indoors?x.s*.9:x.s;u.set(X(-.08,.08),X(0,ue),X(-.06,.06)),d.setFromEuler(u),h.set(x.x,f,x.z),m.set(v,v*X(.95,1.15),v),l.compose(h,d,m),s.setMatrixAt(p,l);for(let E=0;E<o;E++){const y=E/o*ue+X(-.2,.2),w=X(.5,1.2);u.set(w,y,0,"YXZ"),d.setFromEuler(u),h.set(x.x+Math.sin(y)*.15*v,f+4.45*v,x.z+Math.cos(y)*.15*v),m.set(v*X(.85,1.05),v*X(.9,1.15),v),l.compose(h,d,m),c.setMatrixAt(_++,l)}}),s.instanceMatrix.needsUpdate=!0,c.instanceMatrix.needsUpdate=!0,s.castShadow=!1,i.add(s,c)}function jm(i){const t=new re,e=Xs.map((R,L)=>new Fn({map:qm(R,L)})),n=new Fn({map:wc(),color:10127996}),s=new Je(1,1),r=[],a=new Me(.55,.55,1.2,10),o=new Fn({color:4159656}),c=[],l=new Je(.34,.5),d=new Oe({color:16777215,transparent:!0,opacity:.95}),u=[],h=new ae(1,1,1),m=Xs.map(()=>[]),_=new Qt,x=new xn,p=new xn,f=new xn().setFromAxisAngle(new C(1,0,0),-Math.PI/2),v=new C,E=new C,y=new cn,w=({angle:R,radius:L,topY:U,w:G,d:I,h:H,palette:Z})=>{const z=Math.sin(R)*L,et=Math.cos(R)*L,V=X(-.3,.3);if(p.setFromEuler(y.set(0,V,0)),_.compose(v.set(z,U-H/2,et),p,E.set(G,H,I)),m[Z].push(_.clone()),x.copy(p).multiply(f),_.compose(v.set(z,U+.02,et),x,E.set(G*1.03,I*1.03,1)),r.push(_.clone()),Math.random()<.55&&L<70&&c.push({x:z+X(-G*.25,G*.25),y:U+.62,z:et+X(-I*.25,I*.25),s:X(.6,1.1)}),Math.random()<.75){const j=Ga(2,5),tt=Math.floor(X(0,4));for(let Mt=0;Mt<j;Mt++){const Lt=X(-H*.8,-H*.06),Y=X(-.34,.34);let ut=0,xt=0,Tt=V;tt===0?(ut=G/2+.03,xt=Y*I,Tt=V+Math.PI/2):tt===1?(ut=-G/2-.03,xt=Y*I,Tt=V-Math.PI/2):tt===2?(ut=Y*G,xt=I/2+.03,Tt=V):(ut=Y*G,xt=-I/2-.03,Tt=V+Math.PI),u.push({x:z+ut*Math.cos(V)+xt*Math.sin(V),y:U+Lt,z:et-ut*Math.sin(V)+xt*Math.cos(V),ry:Tt,color:_r([16764026,16757596,16769953,10476031])})}}};for(let R=0;R<92;R++){const L=X(0,ue),U=24+Math.pow(Math.random(),.6)*78,G=(U-24)/78,I=R%11===0&&U>52?X(4,9):0,H=1.2-G*11+X(-1.8,1.6)+I;w({angle:L,radius:U,topY:H,w:X(3.2,7.2)*(1+G*1.6),d:X(3.2,7.2)*(1+G*1.6),h:X(4,15),palette:R%Xs.length})}for(let R=0;R<22;R++){const L=X(0,ue),U=X(19,28);w({angle:L,radius:U,topY:X(-3.2,1.4),w:X(3,6),d:X(3,6),h:X(5,11),palette:Ga(0,Xs.length-1)})}m.forEach((R,L)=>{if(!R.length)return;const U=new $n(h,e[L],R.length);R.forEach((G,I)=>U.setMatrixAt(I,G)),U.instanceMatrix.needsUpdate=!0,U.frustumCulled=!1,t.add(U)});const A=new $n(s,n,r.length);r.forEach((R,L)=>A.setMatrixAt(L,R)),A.instanceMatrix.needsUpdate=!0,A.frustumCulled=!1,t.add(A);const g=new $n(a,o,c.length);c.forEach((R,L)=>{x.identity(),v.set(R.x,R.y,R.z),E.set(R.s,R.s,R.s),_.compose(v,x,E),g.setMatrixAt(L,_)}),g.instanceMatrix.needsUpdate=!0,t.add(g);const b=new $n(l,d,u.length),N=new Nt;return u.forEach((R,L)=>{x.setFromEuler(y.set(0,R.ry,0)),v.set(R.x+Math.sin(R.ry)*.001,R.y,R.z+Math.cos(R.ry)*.001),E.set(1,1,1),_.compose(v,x,E),b.setMatrixAt(L,_),b.setColorAt(L,N.setHex(R.color))}),b.instanceMatrix.needsUpdate=!0,b.instanceColor&&(b.instanceColor.needsUpdate=!0),t.add(b),i.add(t),t}function t0(i){const t=new re,e=new Fn({color:2758454}),n=new Fn({color:1904681});[{x:-80,y:-22,z:-150,sx:110,sy:52,sz:70,mat:e},{x:80,y:-26,z:-175,sx:130,sy:60,sz:80,mat:n},{x:0,y:-30,z:-220,sx:220,sy:80,sz:90,mat:n},{x:-30,y:-18,z:-120,sx:55,sy:30,sz:45,mat:e}].forEach(m=>{const _=new at(new Se(1,20,12),m.mat);_.position.set(m.x,m.y,m.z),_.scale.set(m.sx,m.sy,m.sz),t.add(_)});const r=$m();r.position.set(-36,3,-104),r.scale.setScalar(1.5),t.add(r);const a=new Fn({color:3087421}),o=new at(new Se(1,22,16),a);o.position.set(52,-4,-106),o.scale.set(19,27,17),t.add(o);const c=new at(new Se(1,18,12),a);c.position.set(73,-9,-102),c.scale.set(12,17,11),t.add(c);const l=new pr({color:1707556}),d=new _e().setFromPoints([new C(52,22,-106),new C(73,7,-102)]);t.add(new eo(d,l));const u=new at(new Je(900,620),new It({color:1380393,roughness:.22,metalness:.75}));u.rotation.x=-Math.PI/2,u.position.set(0,-27,-140),t.add(u);const h=new at(new Je(26,150),new Oe({map:ci("rgba(255,190,110,0.85)","rgba(255,120,60,0)",128),blending:he,transparent:!0,depthWrite:!1,opacity:.5}));return h.rotation.x=-Math.PI/2,h.position.set(-48,-26.9,-150),t.add(h),i.add(t),{group:t,christ:r}}function e0(i){const t=new re,e=wc(),n=new It({map:e,roughness:.92,metalness:.02}),s=new It({color:9270888,roughness:.95});new It({color:11569776,roughness:.9}),new It({color:14272685,roughness:.9});const r=26,a=20,o=new at(new ae(r,1.4,a),[s,s,n,s,s,s]);o.position.y=-.7,t.add(o);const c=new It({color:10123875,roughness:.94}),l=new It({color:14732208,roughness:.85}),d=(nt,St,Vt,wt)=>{const Yt=new at(new ae(nt,.95,St),c);Yt.position.set(Vt,.47,wt),t.add(Yt);const Kt=new at(new ae(nt+.08,.1,St+.08),l);Kt.position.set(Vt,.985,wt),t.add(Kt)};d(r,.4,0,-a/2+.2),d(r,.4,0,a/2-.2),d(.4,a-.8,-r/2+.2,0),d(.4,a-.8,r/2-.2,0);const u=new at(new ae(11,3.1,.3),new It({color:1780536,roughness:.9}));u.position.set(-3.5,1.55,9.1),t.add(u);const h=new at(new Je(10.8,2.9),new It({map:Ym(),roughness:.86}));h.position.set(-3.5,1.58,8.93),h.rotation.y=Math.PI,t.add(h);const m=new Oe({map:Rl("SALVE","#38e08a","moradores"),transparent:!0,depthWrite:!1,blending:he,opacity:.9}),_=new at(new Je(2.4,1.2),m);_.position.set(-3.5,4,8.88),_.rotation.y=Math.PI,t.add(_);const x=new re;x.position.set(-10.1,0,4),x.rotation.y=.55;const p=new at(new ae(2.6,.95,1.25),new It({color:6110508,roughness:.9}));p.position.y=.47,x.add(p);const f=new at(new ae(2.9,.1,1.5),new It({color:14268815,roughness:.8}));f.position.y=1,x.add(f);const v=new It({color:3811874,roughness:.9});for(const nt of[-1.25,1.25])for(const St of[-.6,.6]){const Vt=new at(new ae(.08,2.5,.08),v);Vt.position.set(nt,1.25,St),x.add(Vt)}const E=new at(new ae(3.1,.08,1.9),new It({color:8141549,roughness:.7}));E.position.set(0,2.5,.1),E.rotation.x=-.08,x.add(E);const y=new at(new Je(2.4,1.2),new Oe({map:Rl("AÇAÍ","#c084fc","do zé"),transparent:!0,depthWrite:!1,blending:he}));y.position.set(0,3.1,.6),x.add(y);const w=new Di(11032055,9,9,2);w.position.set(0,2.1,.2),x.add(w);const A=new at(new ae(.6,.5,.42),new It({color:3107839,roughness:.6}));A.position.set(1.6,.25,.4),x.add(A),t.add(x);const g=new re;g.position.set(9.6,0,-6.2);const b=new It({color:3108784,roughness:.55,metalness:.15}),N=new at(new Me(1.1,1.1,2.1,16),b);N.position.y=1.4,g.add(N);const R=new at(new Me(1.14,1.14,.16,16),new It({color:1985920,roughness:.6}));R.position.y=2.5,g.add(R);for(const nt of[-.7,.7])for(const St of[-.7,.7]){const Vt=new at(new ae(.1,.45,.1),new It({color:5594982,roughness:.8}));Vt.position.set(nt,.22,St),g.add(Vt)}t.add(g);const L=new re;L.position.set(8.6,0,6.4),L.rotation.y=-.5;const U=new It({color:8015923,roughness:.85});for(let nt=0;nt<3;nt++){const St=new at(new ae(2.4,.08,.18),U);St.position.set(0,.45,-.2+nt*.2),L.add(St)}for(const nt of[-1,1]){const St=new at(new ae(.1,.45,.5),new It({color:3811874}));St.position.set(nt,.22,0),L.add(St)}t.add(L);const G=new re;G.position.set(-8.3,0,-2.3),G.rotation.y=.5;const I=new It({color:2366508,roughness:.82}),H=new at(new ae(1.15,1.7,.62),I);H.position.y=.85,G.add(H);const Z=new It({color:920084,roughness:.95}),z=new It({color:9133302,emissive:8141549,emissiveIntensity:2.1,roughness:.3});for(const[nt,St]of[[.42,.34],[1.3,.23]]){const Vt=new at(new Me(St,St*.72,.08,20),Z);Vt.rotation.x=Math.PI/2,Vt.position.set(0,nt,.32),G.add(Vt);const wt=new at(new ki(St+.045,.025,8,28),z);wt.position.set(0,nt,.36),G.add(wt)}const et=new Di(9133302,5,7,2);et.position.set(0,1.1,.7),G.add(et),t.add(G);const V=new It({color:11822143,roughness:.9}),j=new Fn({color:3631930});[[-11.6,-9],[-11.8,-8.2],[11.7,2.2],[11.6,3],[-11.7,8.6]].forEach(([nt,St],Vt)=>{const wt=new at(new Me(.24,.18,.4,8),V);wt.position.set(nt,.2,St),t.add(wt);for(let Yt=0;Yt<4;Yt++){const Kt=new at(new us(.1,X(.5,.8),4),j);Kt.position.set(nt+X(-.12,.12),.55+X(0,.15),St+X(-.1,.1)),Kt.rotation.z=X(-.5,.5),Kt.rotation.x=X(-.35,.35),t.add(Kt)}});const Mt=Jm();Mt.position.set(7.4,0,-2.6),Mt.rotation.y=-2.2,Mt.scale.setScalar(1.15),t.add(Mt);const Lt=n0();t.add(Lt.group);const Y=new It({color:4009768,roughness:.9});[[-12.2,-9.2],[12.2,-9.2],[-12.2,9.2],[12.2,9.2]].forEach(([nt,St])=>{const Vt=new at(new Me(.06,.08,4.8,6),Y);Vt.position.set(nt,2.4,St),t.add(Vt);const wt=new at(new Se(.1,6,6),new Oe({color:16765066}));wt.position.set(nt,4.82,St),t.add(wt)});const xt=new Di(16754784,8,20,2);xt.position.set(-6,4,6),t.add(xt);const Tt=new Di(5995519,6,26,2);return Tt.position.set(4,3.4,-9),t.add(Tt),i.add(t),{group:t,capivara:Mt,bunting:Lt,stand:x,tank:g,mural:u}}function n0(){const i=new re,t=[[new C(-12.2,4.7,-9.2),new C(12.2,5.2,-1.5),.7],[new C(-12.2,5.1,5.4),new C(12.2,4.6,8.6),.55],[new C(-12.2,4.9,9.2),new C(7,4.6,-8.8),.9]],e=[16765514,3727498,16735340,9133302,16774108,5220607],n=new _e;n.setAttribute("position",new oe([-.16,0,0,.16,0,0,0,-.34,0],3)),n.computeVertexNormals();const s=new Oe({side:on,vertexColors:!1}),r=[],a=[],o=[],c=new Qt,l=new xn,d=new cn,u=new C,h=new C(1,1,1);t.forEach(([f,v,E],y)=>{const w=[];for(let N=0;N<=26;N++){const R=N/26,L=new C().lerpVectors(f,v,R);if(L.y-=Math.sin(Math.PI*R)*E,w.push(L),N%2===0){a.push(L.x,L.y-.06,L.z);const U=new Nt(e[(N+y)%e.length]);o.push(U.r,U.g,U.b)}}const g=new _e().setFromPoints(w);i.add(new eo(g,new pr({color:1708832,transparent:!0,opacity:.8})));const b=22;for(let N=0;N<b;N++){const R=(N+.5)/b,L=new C().lerpVectors(f,v,R);L.y-=Math.sin(Math.PI*R)*E,u.set(L.x,L.y-.02,L.z),d.set(X(-.1,.1),X(-.25,.25),X(-.08,.08)),l.setFromEuler(d),c.compose(u,l,h),r.push({matrix:c.clone(),color:e[(N+y)%e.length]})}});const m=new $n(n,s,r.length),_=new Nt;r.forEach((f,v)=>{m.setMatrixAt(v,f.matrix),m.setColorAt(v,_.setHex(f.color))}),m.instanceMatrix.needsUpdate=!0,m.instanceColor&&(m.instanceColor.needsUpdate=!0),i.add(m);const x=new _e;x.setAttribute("position",new oe(a,3)),x.setAttribute("color",new oe(o,3));const p=new io(x,new no({size:.16,map:ci("rgba(255,240,200,1)","rgba(255,180,80,0)"),vertexColors:!0,transparent:!0,depthWrite:!1,blending:he,sizeAttenuation:!0}));return i.add(p),{group:i,lights:p}}function i0(i){const e=new Float32Array(360),n=new Float32Array(120),s=new Float32Array(120);for(let c=0;c<120;c++)e[c*3]=X(-16,16),e[c*3+1]=X(.5,8),e[c*3+2]=X(-12,12),n[c]=X(.06,.3),s[c]=X(0,ue);const r=new _e;r.setAttribute("position",new qe(e,3));const a=new no({size:.09,map:ci("rgba(255,190,110,0.95)","rgba(255,120,40,0)"),transparent:!0,opacity:.75,depthWrite:!1,blending:he,color:16761466}),o=new io(r,a);return i.add(o),{points:o,positions:e,speeds:n,seeds:s,count:120}}function s0(i,t){i.fog=new ja(2626868,.0072);const e=Zm();i.add(e.mesh);const n=new qh(16751210,2363954,1.25);i.add(n);const s=new rl(16753256,2.1);s.position.set(-42,30,-50),i.add(s);const r=new rl(8359167,.65);r.position.set(28,18,34),i.add(r);const a=jm(i),o=t0(i),c=e0(i);Qm(i);const l=i0(i),d=new re,u=new rn(new _n({map:ci("rgba(168,85,247,0.55)","rgba(120,60,220,0)"),blending:he,depthWrite:!1,transparent:!0}));u.scale.set(9,9,1),u.position.set(-10.1,2.3,4),d.add(u);const h=new rn(new _n({map:ci("rgba(255,170,90,0.35)","rgba(255,120,50,0)"),blending:he,depthWrite:!1,transparent:!0}));h.scale.set(24,24,1),h.position.set(-2,6,4),d.add(h),i.add(d);const m=c.capivara.position.y;let _=0,x=0;const p=[];for(let f=0;f<8;f++){const v=f/8*ue+.2;p.push(new C(Math.sin(v)*X(17,23),X(2.8,6.5),Math.cos(v)*X(14,20)))}return p.push(new C(0,7.5,-20)),p.push(new C(-20,5.2,4)),p.push(new C(21,4.6,2)),{rooftop:c,city:a,landmarks:o,sky:e,ambience:l,spawnPoints:p,obstacles:[{x:-10.1,z:4,r:1.9},{x:-8.3,z:-2.3,r:.95},{x:9.6,z:-6.2,r:1.6},{x:8.6,z:6.4,r:1.2},{x:-3.5,z:9.1,r:1.2}],capivaraHop(){_=1.3},update(f){x+=f,e.uniforms.uTime.value=x;const v=l.points.geometry.attributes.position;for(let w=0;w<l.count;w++){const A=w*3+1;v.array[A]+=l.speeds[w]*f,v.array[w*3]+=Math.sin(x*.4+l.seeds[w])*f*.18,v.array[A]>9.5&&(v.array[A]=.4,v.array[w*3]=X(-16,16),v.array[w*3+2]=X(-12,12))}v.needsUpdate=!0;const E=c.capivara;E.position.y=m+Math.abs(Math.sin(x*1.4))*.02+_*.35,E.rotation.y=-2.2+Math.sin(x*.35)*.16;const y=E.userData.head;y&&(y.position.y=1.11+Math.sin(x*.8)*.03),_>0&&(_=Math.max(0,_-f*2.4)),c.bunting.lights.material.opacity=.82+Math.sin(x*3.1)*.08+Math.sin(x*7.7)*.03,h.material.opacity=.26+Math.sin(x*1.3)*.03}}}const Qr=.14;class r0{constructor({canvas:t,stickZone:e,stickBase:n,stickKnob:s,lookZone:r,fireBtn:a,dashBtn:o,onDash:c,onPause:l}){this.canvas=t,this.stickZone=e,this.stickBase=n,this.stickKnob=s,this.lookZone=r,this.fireBtn=a,this.dashBtn=o,this.onDash=c,this.onPause=l,this.move={x:0,y:0},this.lookDelta={x:0,y:0},this.firing=!1,this.enabled=!1,this.sensitivity=Number(localStorage.getItem("morrovivo.sens")||1),this.keys=new Set,this.isTouch=window.matchMedia("(pointer: coarse)").matches,this._stickId=null,this._stickOrigin={x:0,y:0},this._lookId=null,this._lookLast={x:0,y:0},this._stickRect=null,this.tilt=new a0,this._bind()}_bind(){const t=this.stickZone;t.addEventListener("pointerdown",l=>{if(!this.enabled||this._stickId!==null)return;l.preventDefault(),this._stickId=l.pointerId;const d=t.getBoundingClientRect();this._stickRect=d,this._stickOrigin.x=l.clientX-d.left,this._stickOrigin.y=l.clientY-d.top,this.stickBase.classList.remove("hidden"),this.stickBase.style.left=`${this._stickOrigin.x}px`,this.stickBase.style.top=`${this._stickOrigin.y}px`,this._updateStick(l.clientX-d.left,l.clientY-d.top),t.classList.add("active");try{t.setPointerCapture?.(l.pointerId)}catch{}}),t.addEventListener("pointermove",l=>{l.pointerId!==this._stickId||!this._stickRect||(l.preventDefault(),this._updateStick(l.clientX-this._stickRect.left,l.clientY-this._stickRect.top))});const e=l=>{l.pointerId===this._stickId&&(this._stickId=null,this.move.x=0,this.move.y=0,this.stickBase.classList.add("hidden"),t.classList.remove("active"))};t.addEventListener("pointerup",e),t.addEventListener("pointercancel",e),t.addEventListener("pointerleave",l=>{l.pointerId===this._stickId&&e(l)});const n=this.lookZone;n.addEventListener("pointerdown",l=>{if(!(!this.enabled||this._lookId!==null)){l.preventDefault(),this._lookId=l.pointerId,this._lookLast.x=l.clientX,this._lookLast.y=l.clientY;try{n.setPointerCapture?.(l.pointerId)}catch{}l.pointerType==="mouse"&&l.button===0&&(this.firing=!0)}}),n.addEventListener("pointermove",l=>{if(l.pointerId!==this._lookId)return;l.preventDefault();const d=l.clientX-this._lookLast.x,u=l.clientY-this._lookLast.y;this._lookLast.x=l.clientX,this._lookLast.y=l.clientY;const h=.0042*this.sensitivity;this.lookDelta.x+=d*h,this.lookDelta.y+=u*h});const s=l=>{l.pointerId===this._lookId&&(this._lookId=null,l.pointerType==="mouse"&&(this.firing=!1))};n.addEventListener("pointerup",s),n.addEventListener("pointercancel",s),n.addEventListener("contextmenu",l=>l.preventDefault());const r=this.fireBtn,a=l=>{if(this.enabled){l.preventDefault();try{r.setPointerCapture?.(l.pointerId)}catch{}this.firing=!0,r.classList.add("firing")}},o=()=>{this.firing=!1,r.classList.remove("firing")};r.addEventListener("pointerdown",a),r.addEventListener("pointerup",o),r.addEventListener("pointercancel",o),r.addEventListener("pointerleave",o);const c=this.dashBtn;c.addEventListener("pointerdown",l=>{if(this.enabled){l.preventDefault();try{c.setPointerCapture?.(l.pointerId)}catch{}this.onDash?.()}}),window.addEventListener("keydown",l=>{l.repeat||(this.keys.add(l.code),["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Space"].includes(l.code)&&l.preventDefault(),l.code==="Space"&&this.onDash?.(),(l.code==="KeyP"||l.code==="Escape")&&this.onPause?.())}),window.addEventListener("keyup",l=>this.keys.delete(l.code)),window.addEventListener("blur",()=>{this.keys.clear(),this.firing=!1,this._stickId=null,this._lookId=null,this.move.x=0,this.move.y=0,this.stickBase.classList.add("hidden")})}_updateStick(t,e){const n=t-this._stickOrigin.x,s=e-this._stickOrigin.y,r=Math.hypot(n,s),a=42,o=r>a?a/r:1,c=n*o,l=s*o;this.stickKnob.style.transform=`translate(${c}px, ${l}px)`;let d=c/a,u=-l/a;const h=Math.hypot(d,u);if(h<Qr){this.move.x=0,this.move.y=0;return}const m=(h-Qr)/(1-Qr)/h;this.move.x=me(d*m,-1,1),this.move.y=me(u*m,-1,1)}setEnabled(t){this.enabled=t,t||(this.firing=!1,this.move.x=0,this.move.y=0,this._stickId=null,this._lookId=null,this.stickBase.classList.add("hidden"),this.fireBtn.classList.remove("firing"))}consumeLook(){const t={x:this.lookDelta.x,y:this.lookDelta.y};return this.lookDelta.x=0,this.lookDelta.y=0,t}update(t){let e=0,n=0;if((this.keys.has("KeyW")||this.keys.has("ArrowUp"))&&(n+=1),(this.keys.has("KeyS")||this.keys.has("ArrowDown"))&&(n-=1),(this.keys.has("KeyD")||this.keys.has("ArrowRight"))&&(e+=1),(this.keys.has("KeyA")||this.keys.has("ArrowLeft"))&&(e-=1),e||n){const s=Math.hypot(e,n);this.move.x=e/s,this.move.y=n/s}else this._stickId===null&&(this.move.x=0,this.move.y=0);this.tilt.update(t)}setSensitivity(t){this.sensitivity=t,localStorage.setItem("morrovivo.sens",String(t))}}class a0{constructor(){this.enabled=!1,this.available=!1,this.neutral=null,this.raw=null,this.offset={x:0,y:0},this.target={x:0,y:0},this._gotEvent=!1,this._handler=this._onOrientation.bind(this),this._permission=null,this.orientationAngle=0}get needsPermission(){return typeof DeviceOrientationEvent<"u"&&typeof DeviceOrientationEvent.requestPermission=="function"}async enable(){if(this.enabled)return{ok:!0,reason:"already"};if(typeof window>"u"||!("DeviceOrientationEvent"in window))return{ok:!1,reason:"unsupported"};if(this.needsPermission)try{if(this._permission=await DeviceOrientationEvent.requestPermission(),this._permission!=="granted")return{ok:!1,reason:"denied"}}catch{return{ok:!1,reason:"denied"}}return this._gotEvent=!1,this.enabled=!0,this.neutral=null,this.orientationAngle=this._screenAngle(),window.addEventListener("deviceorientation",this._handler,!0),await new Promise(e=>{let n=0;const s=setInterval(()=>{n+=100,this._gotEvent?(clearInterval(s),e(!0)):n>=2200&&(clearInterval(s),e(!1))},100)})?(this.available=!0,{ok:!0,reason:"ok"}):(this.disable(),{ok:!1,reason:"nosensor"})}disable(){this.enabled=!1,this.available=!1,this.offset.x=0,this.offset.y=0,this.target.x=0,this.target.y=0,window.removeEventListener("deviceorientation",this._handler,!0)}calibrate(){this.raw&&(this.neutral={beta:this.raw.beta,gamma:this.raw.gamma},this.target.x=0,this.target.y=0,this.offset.x=0,this.offset.y=0,this.orientationAngle=this._screenAngle())}_screenAngle(){return screen.orientation&&typeof screen.orientation.angle=="number"?screen.orientation.angle:typeof window.orientation=="number"?window.orientation:0}_onOrientation(t){typeof t.beta!="number"||typeof t.gamma!="number"||t.beta===null||t.gamma===null||(this.raw={beta:t.beta,gamma:t.gamma},this._gotEvent=!0,this.neutral||(this.neutral={beta:t.beta,gamma:t.gamma}))}update(t){if(!this.enabled||!this.raw||!this.neutral){this.offset.x=pn(this.offset.x,0,10,t),this.offset.y=pn(this.offset.y,0,10,t);return}const e=this.raw.beta-this.neutral.beta,n=this.raw.gamma-this.neutral.gamma;let s,r;const a=this.orientationAngle;a===90?(s=-e,r=n):a===180?(s=-n,r=-e):a===270?(s=e,r=-n):(s=n,r=e);const o=1.6;s=Math.abs(s)<o?0:s-Math.sign(s)*o,r=Math.abs(r)<o?0:r-Math.sign(r)*o,this.target.x=me(s*.0125,-.5,.5),this.target.y=me(r*.009,-.34,.34),this.offset.x=pn(this.offset.x,this.target.x,11,t),this.offset.y=pn(this.offset.y,this.target.y,11,t)}}const es=new C;function sn(i,t,e,n,s,r){const a=2*Math.PI*s/4,o=Math.max(r-2*s,0),c=Math.PI/4;es.copy(t),es[n]=0,es.normalize();const l=.5*a/(a+o),d=1-es.angleTo(i)/c;return Math.sign(es[e])===1?d*l:o/(a+o)+l+l*(1-d)}class Fi extends ae{constructor(t=1,e=1,n=1,s=2,r=.1){const a=s*2+1;if(r=Math.min(t/2,e/2,n/2,r),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:t,height:e,depth:n,segments:s,radius:r},a===1)return;const o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;const c=new C,l=new C,d=new C(t,e,n).divideScalar(2).subScalar(r),u=this.attributes.position.array,h=this.attributes.normal.array,m=this.attributes.uv.array,_=u.length/6,x=new C,p=.5/a;for(let f=0,v=0;f<u.length;f+=3,v+=2)switch(c.fromArray(u,f),l.copy(c),l.x-=Math.sign(l.x)*p,l.y-=Math.sign(l.y)*p,l.z-=Math.sign(l.z)*p,l.normalize(),u[f+0]=d.x*Math.sign(c.x)+l.x*r,u[f+1]=d.y*Math.sign(c.y)+l.y*r,u[f+2]=d.z*Math.sign(c.z)+l.z*r,h[f+0]=l.x,h[f+1]=l.y,h[f+2]=l.z,Math.floor(f/_)){case 0:x.set(1,0,0),m[v+0]=sn(x,l,"z","y",r,n),m[v+1]=1-sn(x,l,"y","z",r,e);break;case 1:x.set(-1,0,0),m[v+0]=1-sn(x,l,"z","y",r,n),m[v+1]=1-sn(x,l,"y","z",r,e);break;case 2:x.set(0,1,0),m[v+0]=1-sn(x,l,"x","z",r,t),m[v+1]=sn(x,l,"z","x",r,n);break;case 3:x.set(0,-1,0),m[v+0]=1-sn(x,l,"x","z",r,t),m[v+1]=1-sn(x,l,"z","x",r,n);break;case 4:x.set(0,0,1),m[v+0]=1-sn(x,l,"x","y",r,t),m[v+1]=1-sn(x,l,"y","x",r,e);break;case 5:x.set(0,0,-1),m[v+0]=sn(x,l,"x","y",r,t),m[v+1]=1-sn(x,l,"y","x",r,e);break}}static fromJSON(t){return new Fi(t.width,t.height,t.depth,t.segments,t.radius)}}function o0(){return jn(128,128,(i,t,e)=>{i.clearRect(0,0,t,e),i.fillStyle="#f6e6c8",i.beginPath(),i.arc(t/2,e/2,58,0,Math.PI*2),i.fill(),i.strokeStyle="#2a1b2e",i.lineWidth=5,i.stroke(),i.fillStyle="#8a5c3c",i.beginPath(),i.ellipse(64,70,33,29,0,0,Math.PI*2),i.fill(),i.beginPath(),i.ellipse(44,40,10,15,-.4,0,Math.PI*2),i.ellipse(84,40,10,15,.4,0,Math.PI*2),i.fill(),i.fillStyle="#6a442c",i.beginPath(),i.ellipse(64,84,18,14,0,0,Math.PI*2),i.fill(),i.fillStyle="#120c0c",i.beginPath(),i.arc(51,66,4,0,Math.PI*2),i.arc(77,66,4,0,Math.PI*2),i.fill(),i.fillStyle="#2a1b2e",i.beginPath(),i.ellipse(64,82,7,5,0,0,Math.PI*2),i.fill(),i.font="900 13px Arial",i.fillStyle="#2a1b2e",i.textAlign="center",i.fillText("MV",64,116)})}class l0{constructor(t,e){this.camera=t,this.audio=e,this.time=0,this.heat=0,this.overheated=!1,this.nextShot=0,this.recoil=0,this.flash=0,this.overcharge=0,this.base=new C(.265,-.235,-.5),this.group=new re,this.group.position.copy(this.base),t.add(this.group);const n=new It({color:7028656,roughness:.32,metalness:.55}),s=new It({color:2825021,roughness:.45,metalness:.4}),r=new It({color:15917766,roughness:.6,metalness:.15}),a=new It({color:9106943,emissive:3725055,emissiveIntensity:2.2,roughness:.3}),o=new at(new Fi(.15,.17,.42,4,.045),n);o.position.set(0,0,-.12),this.group.add(o);const c=new at(new Fi(.155,.09,.26,4,.035),r);c.position.set(0,.045,-.08),this.group.add(c);const l=new at(new Me(.052,.058,.3,12),s);l.rotation.x=Math.PI/2,l.position.set(0,-.005,-.44),this.group.add(l);for(let y=0;y<2;y++){const w=new at(new ki(.066,.011,8,20),a);w.position.set(0,-.005,-.36-y*.09),this.group.add(w)}const d=new at(new Me(.075,.065,.05,12),s);d.rotation.x=Math.PI/2,d.position.set(0,-.005,-.59),this.group.add(d);const u=new at(new Fi(.09,.2,.11,3,.03),s);u.position.set(0,-.15,.01),u.rotation.x=-.24,this.group.add(u);const h=new at(new ki(.055,.012,6,14,Math.PI),r);h.position.set(0,-.1,-.09),h.rotation.set(0,0,Math.PI),this.group.add(h);const m=new at(new Se(.085,14,8,0,Math.PI*2,0,Math.PI/2),new It({color:3871824,roughness:.5,metalness:.2}));m.rotation.x=Math.PI,m.position.set(0,.1,-.16),m.scale.y=.55,this.group.add(m);const _=new at(new Se(.078,14,8,0,Math.PI*2,0,Math.PI/2),new It({color:8141549,emissive:5972406,emissiveIntensity:.7,roughness:.35}));_.rotation.x=Math.PI,_.position.set(0,.108,-.16),_.scale.y=.42,this.group.add(_);const x=new Se(.015,6,5),p=new Oe({color:14202110}),f=new $n(x,p,9),v=new Qt;for(let y=0;y<9;y++){const w=y/9*Math.PI*2,A=y===8?0:.05;v.makeTranslation(Math.cos(w)*A,.125,-.16+Math.sin(w)*A),f.setMatrixAt(y,v)}f.instanceMatrix.needsUpdate=!0,this.group.add(f),this.vents=[];for(const y of[-.078,.078]){const w=new at(new ae(.008,.11,.2),new It({color:16747069,emissive:16731418,emissiveIntensity:.2,roughness:.4}));w.position.set(y,0,-.18),this.group.add(w),this.vents.push(w)}const E=new at(new Je(.085,.085),new Oe({map:o0(),transparent:!0}));E.position.set(.079,.02,-.09),E.rotation.y=Math.PI/2,this.group.add(E),this.muzzlePos=new ge,this.muzzlePos.position.set(0,-.005,-.63),this.group.add(this.muzzlePos),this.flashSprite=new rn(new _n({map:ci("rgba(220,190,255,1)","rgba(140,80,255,0)"),blending:he,depthWrite:!1,transparent:!0,opacity:0})),this.flashSprite.scale.set(.34,.34,1),this.flashSprite.position.copy(this.muzzlePos.position),this.group.add(this.flashSprite),this.muzzleLight=new Di(12093439,0,5,2),this.muzzleLight.position.copy(this.muzzlePos.position),this.group.add(this.muzzleLight)}setViewport(t){if(t<.85)this.base.set(.145,-.3,-.66),this.group.scale.setScalar(.46);else if(t<1.35){const e=(t-.85)/.5;this.base.set(.145+.085*e,-.3+.055*e,-.66+.09*e),this.group.scale.setScalar(.46+.2*e)}else this.base.set(.235,-.245,-.57),this.group.scale.setScalar(.68);this.group.rotation.set(0,.035,0)}get firingRate(){return this.overcharge>0?.062:.105}tryFire(t){return this.overheated||t<this.nextShot?!1:(this.nextShot=t+this.firingRate,this.heat=Math.min(100,this.heat+(this.overcharge>0?4.5:7.2)),this.recoil=Math.min(1.5,this.recoil+1),this.flash=1,this.heat>=100&&(this.overheated=!0,this.heat=100,this.audio?.overheat()),!0)}setOvercharge(t){this.overcharge=Math.max(this.overcharge,t)}update(t,e=0,n=!1){this.time+=t,this.overcharge=Math.max(0,this.overcharge-t),this.overheated?(this.heat=Math.max(0,this.heat-34*t),this.heat<=22&&(this.overheated=!1)):this.heat=Math.max(0,this.heat-(n?3:19)*t),this.recoil=pn(this.recoil,0,13,t),this.flash=Math.max(0,this.flash-t*15);const s=this.time,r=me(e,0,1),a=Math.sin(s*8.6)*.011*r+Math.sin(s*1.4)*.0022,o=Math.abs(Math.cos(s*8.6))*.012*r+Math.sin(s*1.9)*.0025;this.group.position.set(this.base.x+a+this.recoil*.006,this.base.y+o-this.recoil*.012,this.base.z+this.recoil*.045),this.group.rotation.set(-this.recoil*.075-o*.4,.035-a*.6,Math.sin(s*1.1)*.006-a*.8);const c=this.heat/100,l=this.overheated?16726832:this.overcharge>0?12616956:16742959,d=this.overheated?2.8:.15+c*1.6;this.vents.forEach(u=>{u.material.emissive.setHex(l),u.material.emissiveIntensity=d}),this.flashSprite.material.opacity=this.flash*.9,this.flashSprite.material.color.setHex(this.overcharge>0?15324671:14471423),this.flashSprite.scale.setScalar(.28+this.flash*.16+X(-.02,.02)),this.flashSprite.material.rotation=X(0,Math.PI),this.muzzleLight.intensity=this.flash*(this.overcharge>0?9:6),this.muzzleLight.color.setHex(this.overcharge>0?14202110:12093439);for(const u of this.vents)u.material.color.setHex(this.overheated?16739162:4860515)}reset(){this.heat=0,this.overheated=!1,this.nextShot=0,this.recoil=0,this.flash=0,this.overcharge=0}muzzleWorld(t=new C){return this.muzzlePos.getWorldPosition(t)}}class c0{constructor(t){this.scene=t,this.max=1e3,this.cursor=0,this.positions=new Float32Array(this.max*3),this.colors=new Float32Array(this.max*3),this.sizes=new Float32Array(this.max),this.alphas=new Float32Array(this.max),this.vel=new Float32Array(this.max*3),this.life=new Float32Array(this.max),this.maxLife=new Float32Array(this.max),this.gravity=new Float32Array(this.max),this.drag=new Float32Array(this.max),this.baseSize=new Float32Array(this.max),this.geometry=new _e,this.geometry.setAttribute("position",new qe(this.positions,3)),this.geometry.setAttribute("aColor",new qe(this.colors,3)),this.geometry.setAttribute("aSize",new qe(this.sizes,1)),this.geometry.setAttribute("aAlpha",new qe(this.alphas,1));const e=new On({transparent:!0,depthWrite:!1,blending:he,vertexShader:`
        attribute vec3 aColor;
        attribute float aSize;
        attribute float aAlpha;
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          vColor = aColor;
          vAlpha = aAlpha;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = aSize * (330.0 / max(0.5, -mv.z));
          gl_Position = projectionMatrix * mv;
        }
      `,fragmentShader:`
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          vec2 c = gl_PointCoord - 0.5;
          float d = length(c);
          if (d > 0.5) discard;
          float fall = smoothstep(0.5, 0.05, d);
          gl_FragColor = vec4(vColor, vAlpha * fall);
        }
      `});this.points=new io(this.geometry,e),this.points.frustumCulled=!1,this.points.renderOrder=5,t.add(this.points);const n=jn(128,128,(r,a,o)=>{r.clearRect(0,0,a,o),r.strokeStyle="rgba(255,255,255,1)",r.lineWidth=7,r.shadowColor="rgba(255,255,255,1)",r.shadowBlur=14,r.beginPath(),r.arc(a/2,o/2,44,0,Math.PI*2),r.stroke();const c=r.createRadialGradient(a/2,o/2,30,a/2,o/2,60);c.addColorStop(0,"rgba(255,255,255,0.22)"),c.addColorStop(1,"rgba(255,255,255,0)"),r.fillStyle=c,r.beginPath(),r.arc(a/2,o/2,60,0,Math.PI*2),r.fill()});this.rings=[];for(let r=0;r<14;r++){const a=new rn(new _n({map:n,blending:he,depthWrite:!1,transparent:!0,opacity:0}));a.visible=!1,a.renderOrder=4,t.add(a),this.rings.push({sprite:a,life:0,maxLife:.5,size:1,color:new Nt})}this.ringCursor=0,this.tracers=[];const s=new pr({color:12616956,transparent:!0,opacity:.9,blending:he,depthWrite:!1});for(let r=0;r<26;r++){const a=new _e().setFromPoints([new C,new C]),o=new eo(a,s.clone());o.visible=!1,o.frustumCulled=!1,t.add(o),this.tracers.push({line:o,life:0,maxLife:.08})}this.tracerCursor=0,this.time=0}_emit(t,e,n,s,r,a,o,c,l,d=-6,u=2.4){const h=this.cursor;this.cursor=(this.cursor+1)%this.max,this.positions[h*3]=t,this.positions[h*3+1]=e,this.positions[h*3+2]=n,this.colors[h*3]=s.r,this.colors[h*3+1]=s.g,this.colors[h*3+2]=s.b,this.sizes[h]=r,this.baseSize[h]=r,this.alphas[h]=1,this.vel[h*3]=o,this.vel[h*3+1]=c,this.vel[h*3+2]=l,this.life[h]=a,this.maxLife[h]=a,this.gravity[h]=d,this.drag[h]=u}burst(t,e=16760636,n=14,{speed:s=5,size:r=.14,life:a=.7,gravity:o=-7,spread:c=1,drag:l=2}={}){const d=new Nt(e),u=d.clone().multiplyScalar(1.5);for(let h=0;h<n;h++){const m=X(0,Math.PI*2),_=Math.acos(X(-1,1)),x=X(s*.25,s),p=Math.random()>.5?d:u;this._emit(t.x+X(-.08,.08)*c,t.y+X(-.08,.08)*c,t.z+X(-.08,.08)*c,p,r*X(.7,1.6),a*X(.6,1.2),Math.sin(_)*Math.cos(m)*x,Math.cos(_)*x,Math.sin(_)*Math.sin(m)*x,o,l)}}spark(t,e=null,n=16771529,s=7){const r=new Nt(n);for(let a=0;a<s;a++){const o=e?new C(e.x+X(-.7,.7),e.y+X(-.7,.7),e.z+X(-.7,.7)).normalize():new C(X(-1,1),X(-1,1),X(-1,1)).normalize(),c=X(2,7);this._emit(t.x,t.y,t.z,r,X(.05,.12),X(.18,.42),o.x*c,o.y*c,o.z*c,-9,3)}}trail(t,e=16747069,n=.1){const s=new Nt(e);this._emit(t.x+X(-.05,.05),t.y+X(-.05,.05),t.z+X(-.05,.05),s,n,X(.2,.4),X(-.3,.3),X(-.1,.5),X(-.3,.3),1.5,2)}ring(t,e=16760636,n=4,s=.5){const r=this.rings[this.ringCursor];this.ringCursor=(this.ringCursor+1)%this.rings.length,r.sprite.position.copy(t),r.sprite.material.color.set(e),r.sprite.material.opacity=.95,r.sprite.scale.setScalar(n*.4),r.sprite.visible=!0,r.life=s,r.maxLife=s,r.size=n}tracer(t,e,n=12616956){const s=this.tracers[this.tracerCursor];this.tracerCursor=(this.tracerCursor+1)%this.tracers.length;const r=s.line.geometry.attributes.position;r.setXYZ(0,t.x,t.y,t.z),r.setXYZ(1,e.x,e.y,e.z),r.needsUpdate=!0,s.line.material.color.set(n),s.line.material.opacity=.95,s.line.visible=!0,s.life=s.maxLife}update(t){this.time+=t;for(let e=0;e<this.max;e++){if(this.life[e]<=0){this.alphas[e]=0;continue}if(this.life[e]-=t,this.life[e]<=0){this.alphas[e]=0;continue}const n=1-this.drag[e]*t;this.vel[e*3]*=Math.max(.02,n),this.vel[e*3+1]=this.vel[e*3+1]*Math.max(.02,n)+this.gravity[e]*t,this.vel[e*3+2]*=Math.max(.02,n),this.positions[e*3]+=this.vel[e*3]*t,this.positions[e*3+1]+=this.vel[e*3+1]*t,this.positions[e*3+2]+=this.vel[e*3+2]*t;const s=this.life[e]/this.maxLife[e];this.alphas[e]=me(s*1.6,0,1),this.sizes[e]=this.baseSize[e]*(.5+s*.7)}this.geometry.attributes.position.needsUpdate=!0,this.geometry.attributes.aColor.needsUpdate=!0,this.geometry.attributes.aSize.needsUpdate=!0,this.geometry.attributes.aAlpha.needsUpdate=!0;for(const e of this.rings){if(e.life<=0)continue;e.life-=t;const n=me(1-e.life/e.maxLife,0,1);e.sprite.scale.setScalar(e.size*(.35+n*.9)),e.sprite.material.opacity=(1-n)*.9,e.life<=0&&(e.sprite.visible=!1)}for(const e of this.tracers)e.life<=0||(e.life-=t,e.line.material.opacity=me(e.life/e.maxLife,0,1),e.life<=0&&(e.line.visible=!1))}reset(){this.life.fill(0),this.alphas.fill(0),this.geometry.attributes.aAlpha.needsUpdate=!0;for(const t of this.rings)t.life=0,t.sprite.visible=!1;for(const t of this.tracers)t.life=0,t.line.visible=!1}}class h0{constructor(t,e,n){this.scene=t,this.audio=e,this.hooks=n,this.fx=new c0(t),this.enemies=[],this.projectiles=[],this.boss=null,this.time=0,this.ray=new fr,this.tmp=new C,this.tmp2=new C,this._buildShared(),this._buildProjectilePool()}_buildShared(){this.geo={sphere:new Se(1,14,12),lowSphere:new Se(1,10,8),cone:new us(1,1,10),cylinder:new Me(1,1,1,8),torus:new ki(1,.06,6,22),icosa:new ro(1,1),box:new ae(1,1,1),rounded:new Fi(1,1,1,3,.14)},this.mat={saciBody:new It({color:2891586,roughness:.5,metalness:.25,emissive:2363960,emissiveIntensity:.95}),saciHat:new It({color:16726832,roughness:.45,emissive:16720917,emissiveIntensity:1.55}),eye:new Oe({color:11139071}),vortex:new Oe({color:16742973,transparent:!0,opacity:.16,blending:he,depthWrite:!1,side:on}),ring:new Oe({color:16751165,transparent:!0,opacity:.55,blending:he,depthWrite:!1}),flame:new Oe({color:16747055,transparent:!0,opacity:.9,blending:he,depthWrite:!1}),muleBody:new It({color:1839136,roughness:.62,metalness:.18}),muleLeg:new It({color:2758440,roughness:.7}),bossBody:new It({color:16742943,emissive:16731392,emissiveIntensity:1.3,roughness:.35,metalness:.2}),bossAud:new It({color:3727615,emissive:47359,emissiveIntensity:1.6,roughness:.3}),bossEye:new Oe({color:16773800}),handStick:new It({color:3875861,roughness:.9}),cap:new It({color:16726832,emissive:10031104,emissiveIntensity:.8,roughness:.5}),wood:new It({color:7031341,roughness:.9}),lightGlow:new _n({map:this._glowTexture(),blending:he,depthWrite:!1,transparent:!0,opacity:.8}),projOrange:new Oe({color:16765066,transparent:!0,blending:he,depthWrite:!1}),projRed:new Oe({color:16738893,transparent:!0,blending:he,depthWrite:!1})},this.geo.vortex=new us(1,1,12,1,!0)}_glowTexture(){const t=document.createElement("canvas");t.width=t.height=64;const e=t.getContext("2d"),n=e.createRadialGradient(32,32,0,32,32,32);n.addColorStop(0,"rgba(255,255,255,1)"),n.addColorStop(.25,"rgba(255,220,160,0.9)"),n.addColorStop(1,"rgba(255,120,40,0)"),e.fillStyle=n,e.fillRect(0,0,64,64);const s=new ac(t);return s.colorSpace=He,s}_buildProjectilePool(){const t=this.mat.lightGlow.map;for(let e=0;e<36;e++){const n=new re,s=new at(new Se(.16,10,8),this.mat.projOrange),r=new rn(new _n({map:t,blending:he,depthWrite:!1,transparent:!0,opacity:.85}));r.scale.set(1.2,1.2,1),n.add(s,r),n.visible=!1,this.scene.add(n),this.projectiles.push({group:n,core:s,glow:r,active:!1,vel:new C,life:0,radius:.35,damage:10,kind:"saci"})}}_makeSaci(t){const e=new re,n=new re;e.add(n);const s=new at(this.geo.sphere,this.mat.saciBody);s.scale.set(.44,.56,.44),s.position.y=.1,n.add(s);const r=new at(this.geo.cone,this.mat.saciHat);r.scale.set(.3,.52,.3),r.position.y=.62,r.rotation.z=X(-.1,.1),n.add(r);const a=new at(this.geo.sphere,this.mat.eye);a.scale.setScalar(.1),a.position.set(0,.2,.37),n.add(a);const o=new at(this.geo.torus,this.mat.ring);o.scale.setScalar(.95),o.rotation.x=Math.PI/2,o.position.y=-.1,n.add(o);const c=new at(this.geo.vortex,this.mat.vortex);c.scale.set(.75,1.9,.75),c.position.y=-.85,c.rotation.y=X(0,ue),n.add(c);const l=new at(this.geo.vortex,this.mat.vortex);l.scale.set(.5,1.2,.5),l.position.y=-.3,l.rotation.set(Math.PI,X(0,ue),0),n.add(l);const d=new rn(this.mat.lightGlow.clone());d.material.opacity=0,d.scale.set(2,2,1),n.add(d);const u=new rn(new _n({map:this.mat.lightGlow.map,blending:he,depthWrite:!1,transparent:!0,opacity:.6}));return u.scale.set(3.1,3.1,1),u.position.y=.15,n.add(u),e.scale.setScalar(.05),this.scene.add(e),{type:"saci",root:e,visual:n,hitGlow:d,eye:a,eyeRing:o,vortex:c,vortex2:l,glow:u,hp:26+t*5,maxHp:26+t*5,radius:.95,score:100,wave:t,phase:X(0,ue),orbitDir:Math.random()>.5?1:-1,fireTimer:X(1.8,3.6),windup:0,contactCd:0,spawnT:0,dead:!1,flash:0,bobSeed:X(0,ue),aim:new C}}_makeMula(t){const e=new re,n=new re;e.add(n);const s=new at(this.geo.rounded,this.mat.muleBody);s.scale.set(.72,.58,1.5),s.position.y=.05,n.add(s);const r=[];for(let d=0;d<7;d++){const u=new at(this.geo.cone,this.mat.flame);u.scale.set(X(.18,.3),X(.5,.95),X(.18,.3)),u.position.set(X(-.2,.2),X(.3,.55),.9-d*.28),u.rotation.x=X(-.2,.2),n.add(u),r.push(u)}const a=new at(this.geo.cone,this.mat.flame);a.scale.set(.34,1.3,.34),a.position.set(0,.55,.95),a.rotation.x=-.5,n.add(a),r.push(a);const o=[];for(const[d,u]of[[-.42,.55],[.42,.55],[-.42,-.55],[.42,-.55]]){const h=new at(this.geo.cylinder,this.mat.muleLeg);h.scale.set(.09,.55,.09),h.position.set(d,-.45,u),n.add(h),o.push({mesh:h,phase:u>0?0:Math.PI})}const c=new rn(this.mat.lightGlow.clone());c.material.opacity=0,c.scale.set(3,3,1),n.add(c);const l=new rn(new _n({map:this.mat.lightGlow.map,blending:he,depthWrite:!1,transparent:!0,opacity:.7}));return l.scale.set(4.2,4.2,1),l.position.y=.35,n.add(l),e.scale.setScalar(.05),this.scene.add(e),{type:"mula",root:e,visual:n,hitGlow:c,mane:r,legs:o,glow:l,hp:85+t*12,maxHp:85+t*12,radius:1.25,score:220,wave:t,phase:X(0,ue),orbitDir:Math.random()>.5?1:-1,fireTimer:0,windup:0,contactCd:0,spawnT:0,dead:!1,flash:0,bobSeed:X(0,ue),dir:new C(X(-1,1),0,X(-1,1)).normalize(),trailTimer:0,aim:new C}}_makeBoss(t){const e=new re,n=new re;e.add(n);const s=new at(this.geo.icosa,this.mat.bossBody);s.scale.set(1.35,1.1,1.7),n.add(s);const r=new at(this.geo.rounded,this.mat.bossAud);r.scale.set(.85,.34,.9),r.position.set(0,-.5,.85),n.add(r);const a=new at(this.geo.sphere,this.mat.bossEye);a.scale.setScalar(.35),a.position.set(0,-.22,1.35),n.add(a);const o=[];for(const x of[-.55,.55]){const p=new at(this.geo.sphere,this.mat.bossAud);p.scale.set(.2,.16,.12),p.position.set(x,.28,1.35),n.add(p),o.push(p)}const c=[];for(const x of[-.85,.85]){const p=new at(this.geo.cone,this.mat.bossAud);p.scale.set(.22,1.1,.22),p.position.set(x,.95,.3),p.rotation.z=x<0?.45:-.45,n.add(p),c.push(p)}const l=new Di(16738842,22,22,2);l.position.y=.4,n.add(l);const d=new rn(this.mat.lightGlow.clone());d.material.opacity=0,d.scale.set(8,8,1),n.add(d);const u=new C(0,5,-14),h=[],m=15;for(let x=0;x<m;x++){const p=new at(this.geo.icosa,x%3===0?this.mat.bossAud:this.mat.bossBody),f=1.05*(1-x/m*.55);if(p.scale.setScalar(f),p.position.set(u.x,u.y,u.z+(x+1)*1.6),this.scene.add(p),h.push(p),x%2===0){const v=new at(this.geo.cone,this.mat.bossAud);v.scale.set(.2,.8,.2),v.position.set(0,.9,0),p.add(v)}}e.position.copy(u),this.scene.add(e);const _=560+t*520;return{type:"boss",root:e,visual:n,head:n,segments:h,eyes:o,mouth:a,horns:c,hitGlow:d,light:l,hp:_,maxHp:_,radius:2,score:2500+t*900,wave:t,phase:0,orbitDir:1,fireTimer:2.6,windup:0,contactCd:0,spawnT:0,dead:!1,flash:0,bobSeed:0,trail:[],segPositions:h.map(()=>new C(0,5,-14)),aim:new C,bossIndex:t}}spawnSaci(t,e){const n=this._makeSaci(t);return n.root.position.copy(e),n.root.rotation.y=X(0,ue),this.enemies.push(n),this.fx.ring(e,16742973,2.2,.4),n}spawnMula(t,e){const n=this._makeMula(t);return n.root.position.copy(e),this.enemies.push(n),this.fx.ring(e,16731418,3.2,.5),n}spawnBoss(t,e){if(this.boss)return null;const n=this._makeBoss(t);return n.root.position.copy(e),n.segments.forEach((s,r)=>{s.position.set(e.x,e.y,e.z+(r+1)*1.6),n.segPositions[r].copy(s.position)}),this.boss=n,this.enemies.push(n),this.audio?.bossRoar(),this.fx.ring(e,16731418,8,.9),n}spawnProjectile(t,e,{speed:n=12,damage:s=9,kind:r="saci",spread:a=0}={}){const o=this.projectiles.find(l=>!l.active);if(!o)return null;o.active=!0,o.group.visible=!0,o.group.position.copy(t),o.vel.copy(e).sub(t).normalize(),a&&(o.vel.x+=X(-a,a),o.vel.y+=X(-a,a)*.6,o.vel.z+=X(-a,a),o.vel.normalize()),o.vel.multiplyScalar(n),o.life=7,o.damage=s,o.kind=r,o.radius=r==="boss"?.5:.34;const c=r==="boss";return o.core.material=c?this.mat.projRed:this.mat.projOrange,o.core.scale.setScalar(c?1.5:1),o.glow.scale.setScalar(c?2.6:1.5),o.glow.material.color.setHex(c?16742943:16761978),o}raycast(t,e,n=80){this.ray.origin.copy(t),this.ray.direction.copy(e).normalize();let s=null,r=n;const a=new Qn,o=new C;for(const c of this.enemies){if(c.dead)continue;const l=(c.type==="boss",c.root.position);a.set(l,c.radius);const d=this.ray.intersectSphere(a,new C);if(!d)continue;const u=d.distanceTo(t);u<r&&(r=u,s={enemy:c,point:d.clone(),distance:u},o.copy(d))}return s}bestAssistTarget(t,e,n=.12){const s=Math.cos(n);let r=null,a=s;for(const o of this.enemies){if(o.dead)continue;const c=this.tmp.copy(o.root.position).sub(t),l=c.length();if(l<1.5||l>70)continue;c.normalize();const d=c.dot(e);d>a&&(a=d,r=o)}return r}damage(t,e,n,s=!1){return t.dead?!1:(t.hp-=e,t.flash=1,t.hitGlow&&(t.hitGlow.material.opacity=.9),this.fx.spark(n,new C(0,.6,0),16765601,6),t.hp<=0?(this._kill(t,n),!0):!1)}_kill(t,e){t.dead=!0;const n=t.root.position.clone();t.type==="boss"?(this.boss=null,this.audio?.kill(!0),this.fx.burst(n,16742943,90,{speed:14,size:.5,life:1.4,gravity:-1.5}),this.fx.burst(n,3727615,45,{speed:11,size:.3,life:1.1,gravity:-1.5}),this.fx.ring(n,16753981,16,1.1),this.fx.ring(n,3727615,9,.8),t.segments.forEach((r,a)=>{setTimeout(()=>{const o=r.position.clone();this.fx.burst(o,a%3===0?3727615:16742943,16,{speed:8,size:.3,life:.8}),this.fx.ring(o,16747055,3.4,.45)},a*45)})):t.type==="mula"?(this.audio?.kill(!0),this.fx.burst(n,16734746,36,{speed:9,size:.3,life:1}),this.fx.ring(n,16734746,5,.5)):(this.audio?.kill(!1),this.fx.burst(n,16738877,24,{speed:7,size:.18,life:.75}),this.fx.burst(n,16765066,10,{speed:5,size:.12,life:.5}),this.fx.ring(n,16742973,2.6,.4)),this.hooks?.onKill?.(t,n),this._removeEnemy(t)}_removeEnemy(t){const e=this.enemies.indexOf(t);e>=0&&this.enemies.splice(e,1),t.type==="boss"&&t.segments.forEach(n=>this.scene.remove(n)),this.scene.remove(t.root)}update(t,e,n,s){this.time=e,this.fx.update(t);for(const r of this.enemies){if(r.dead)continue;r.spawnT+=t,r.flash=Math.max(0,r.flash-t*6),r.hitGlow&&(r.hitGlow.material.opacity=r.flash*.85);const a=me(r.spawnT/.45,0,1),o=a*a*(3-2*a);r.type!=="boss"&&r.root.scale.setScalar(.05+o*.95),r.type==="saci"?this._updateSaci(r,t,e,n,s):r.type==="mula"?this._updateMula(r,t,e,n,s):this._updateBoss(r,t,e,n,s),r.aim.copy(r.root.position).add(this.tmp2.set(0,.2,0))}this._updateProjectiles(t,n,s)}_updateSaci(t,e,n,s,r){const a=this.tmp.set(Math.sin(n*.55*t.orbitDir+t.phase)*6.5,0,Math.cos(n*.55*t.orbitDir+t.phase)*6.5),o=this.tmp2.copy(s).add(a);o.y=2.4+Math.sin(n*1.1+t.bobSeed)*.7;const c=1-Math.exp(-1.2*e);t.root.position.lerp(o,c);const l=s.x-t.root.position.x,d=s.z-t.root.position.z;t.root.rotation.y=Math.atan2(l,d),t.visual.position.y=Math.sin(n*2.4+t.bobSeed)*.14,t.visual.rotation.z=Math.sin(n*1.7+t.bobSeed)*.08,t.eyeRing.rotation.z+=e*4.5,t.vortex.rotation.y+=e*5.2,t.vortex2.rotation.y-=e*7,t.glow.material.opacity=.28+Math.sin(n*6+t.phase)*.1;const u=.075+(t.windup>0?Math.min(.09,t.windup*.2):0);if(t.eye.scale.setScalar(u),t.fireTimer-=e,t.fireTimer<=0&&(t.windup+=e,t.windup>.5)){t.windup=0,t.fireTimer=X(2.4,3.9)-Math.min(1.1,t.wave*.05);const h=t.root.position.clone().add(new C(0,.15,0)),m=r.clone();this.spawnProjectile(h,m,{speed:11.5+t.wave*.15,damage:9,kind:"saci",spread:.04}),this.audio?.enemyShot()}}_updateMula(t,e,n,s,r){const a=this.tmp.copy(s).setY(1.35).sub(t.root.position);a.y=0;const o=a.length();a.normalize();const c=6.6+Math.min(3.2,t.wave*.16);o<2.2?a.multiplyScalar(-.55):a.multiplyScalar(1),t.dir.lerp(a,1-Math.exp(-2.2*e)).normalize();const l=Math.sin(n*1.4+t.bobSeed)*.25;t.root.position.addScaledVector(t.dir,c*e),t.root.position.y=1.35+Math.sin(n*3+t.bobSeed)*.1;const d=Math.atan2(t.dir.x,t.dir.z)+l*.04;if(t.root.rotation.y=d,t.visual.rotation.z=Math.sin(n*9+t.bobSeed)*.06,t.visual.position.y=Math.abs(Math.sin(n*8.5+t.bobSeed))*.12,t.legs.forEach(({mesh:h,phase:m})=>{h.rotation.x=Math.sin(n*9+m)*.7}),t.mane.forEach((h,m)=>{const _=.8+Math.sin(n*12+m*1.8)*.25;h.scale.y=(m===t.mane.length-1?1.3:.7)*_,h.material.opacity=.7+Math.sin(n*9+m)*.2}),t.glow.material.opacity=.55+Math.sin(n*8)*.15,t.trailTimer-=e,t.trailTimer<=0&&(t.trailTimer=.035,this.fx.trail(t.root.position.clone().add(new C(X(-.3,.3),X(0,.8),X(-.5,.5))),16742954,.13)),t.contactCd=Math.max(0,t.contactCd-e),o<1.85&&t.contactCd<=0){t.contactCd=1.4,this.hooks?.damagePlayer?.(16,t),this.fx.burst(t.root.position,16731418,20,{speed:6,size:.2,life:.5});const h=this.tmp.copy(t.root.position).sub(s).setY(0);h.lengthSq()<1e-4&&h.set(1,0,0),h.normalize().multiplyScalar(2.6),t.root.position.add(h)}const u=Math.hypot(t.root.position.x,t.root.position.z);u>26&&(t.root.position.x*=26/u,t.root.position.z*=26/u)}_updateBoss(t,e,n,s,r){t.root.scale.setScalar(1);const a=n*.42,o=10.5+Math.sin(a*1.3)*3.2,c=this.tmp.set(Math.cos(a*t.orbitDir)*o,4.4+Math.sin(a*2.1)*1.4,Math.sin(a*t.orbitDir)*o*.85),l=Math.sin(n*.37)>.82?me((Math.sin(n*.37)-.82)/.18,0,1):0;l>0&&c.lerp(this.tmp2.copy(s).setY(s.y+3.2),l*.75);const d=1-Math.exp(-1.8*e);t.root.position.lerp(c,d),t.trail.unshift(t.root.position.clone()),t.trail.length>220&&(t.trail.length=220);const u=6;t.segments.forEach((_,x)=>{const p=t.trail[Math.min(t.trail.length-1,(x+1)*u)]||t.root.position,f=this.tmp2.copy(p),v=Math.sin(n*2.2-x*.55)*.55;f.x+=v*.4,f.y+=v,t.segPositions[x].lerp(f,1-Math.exp(-14*e)),_.position.copy(t.segPositions[x]),_.rotation.x+=e*.6,_.rotation.y+=e*.4,_.scale.setScalar(1.05*(1-x/t.segments.length*.55))});const h=s.x-t.root.position.x,m=s.z-t.root.position.z;if(t.root.rotation.y=Math.atan2(h,m),t.root.rotation.z=Math.sin(n*1.3)*.12,t.visual.rotation.x=Math.sin(n*1.7)*.06,t.eyes.forEach(_=>{_.scale.x=.2+Math.sin(n*5)*.03}),t.horns.forEach((_,x)=>{_.rotation.z=(x===0?.45:-.45)+Math.sin(n*2+x)*.08}),t.mouth.scale.setScalar(.32+Math.sin(n*3)*.04+t.windup*.9),t.light.intensity=14+Math.sin(n*5)*4+t.windup*20,t.fireTimer-=e,t.fireTimer<=0&&(t.windup+=e,t.windup>.55)){t.windup=0;const _=t.hp/t.maxHp<.5;t.fireTimer=_?1.5:2.2;const x=_?5:3,p=t.root.position.clone().add(new C(0,0,0)),f=r.clone();for(let v=0;v<x;v++){const E=(v-(x-1)/2)*.06;this.spawnProjectile(p,f,{speed:13.5,damage:11,kind:"boss",spread:0});const y=this.projectiles.filter(w=>w.active).slice(-1)[0];if(y){const w=new C(-f.z,0,f.x).normalize();y.vel.addScaledVector(w,E*30)}}this.audio?.enemyShot(),this.fx.burst(p,16742943,18,{speed:5,size:.3,life:.4})}}_updateProjectiles(t,e,n){this.tmp.copy(e).setY(e.y);for(const s of this.projectiles){if(!s.active)continue;s.life-=t,s.group.position.addScaledVector(s.vel,t),s.group.rotation.y+=t*5;const r=1+Math.sin(this.time*20+s.life)*.15;s.core.scale.setScalar((s.kind==="boss"?1.5:1)*r),s.glow.material.opacity=.6+Math.sin(this.time*18+s.life)*.25,Math.random()<.6&&this.fx.trail(s.group.position,s.kind==="boss"?16734746:16753981,s.kind==="boss"?.14:.09);const a=s.group.position.x-e.x,o=s.group.position.z-e.z,c=s.group.position.y-(e.y+1);if(Math.sqrt(a*a+o*o+c*c)<.75){this._endProjectile(s),this.hooks?.damagePlayer?.(s.damage,s);continue}(s.group.position.y<.15||s.life<=0)&&(s.group.position.y<.4&&this.fx.burst(s.group.position,16742954,8,{speed:2.5,size:.12,life:.35}),this._endProjectile(s))}}_endProjectile(t){t.active=!1,t.group.visible=!1}clearProjectiles(){this.projectiles.forEach(t=>this._endProjectile(t))}reset(){for(const t of this.enemies.slice())t.type==="boss"&&t.segments.forEach(e=>this.scene.remove(e)),this.scene.remove(t.root);this.enemies.length=0,this.boss=null,this.clearProjectiles(),this.fx.reset()}get bossHp(){return this.boss?this.boss.hp/this.boss.maxHp:0}}const u0=128,d0=60/u0/4;class f0{constructor(){this.ctx=null,this.started=!1,this.enabled=localStorage.getItem("morrovivo.sound")!=="off",this.intensity=1,this.step=0,this.nextStepTime=0,this._noise=null}init(){if(this.ctx){this.ctx.state==="suspended"&&this.ctx.resume();return}const t=window.AudioContext||window.webkitAudioContext;if(!t)return;const e=this.ctx=new t;this.master=e.createGain(),this.master.gain.value=this.enabled?.85:0;const n=e.createDynamicsCompressor();n.threshold.value=-14,n.knee.value=22,n.ratio.value=6,n.attack.value=.004,n.release.value=.22,this.master.connect(n).connect(e.destination),this.musicBus=e.createGain(),this.musicBus.gain.value=.42,this.musicBus.connect(this.master),this.sfxBus=e.createGain(),this.sfxBus.gain.value=.8,this.sfxBus.connect(this.master),this.reverb=e.createConvolver(),this.reverb.buffer=this._impulse(1.9,2.6),this.reverbGain=e.createGain(),this.reverbGain.gain.value=.26,this.reverb.connect(this.reverbGain).connect(this.musicBus),this._noise=this._noiseBuffer(1.2),this.started=!0,this.nextStepTime=e.currentTime+.08,this.step=0}_noiseBuffer(t){const e=this.ctx,n=e.createBuffer(1,e.sampleRate*t,e.sampleRate),s=n.getChannelData(0);for(let r=0;r<s.length;r++)s[r]=X(-1,1);return n}_impulse(t,e){const n=this.ctx,s=Math.floor(n.sampleRate*t),r=n.createBuffer(2,s,n.sampleRate);for(let a=0;a<2;a++){const o=r.getChannelData(a);for(let c=0;c<s;c++)o[c]=(Math.random()*2-1)*Math.pow(1-c/s,e)}return r}setEnabled(t){this.enabled=t,localStorage.setItem("morrovivo.sound",t?"on":"off"),this.ctx&&this.master.gain.setTargetAtTime(t?.85:0,this.ctx.currentTime,.08)}setIntensity(t){this.intensity=t}update(){if(!this.ctx||!this.enabled)return;const t=this.ctx.currentTime;this.nextStepTime<t-.4&&(this.nextStepTime=t+.05);let e=0;for(;this.nextStepTime<t+.16&&e++<8;)this._scheduleStep(this.step,this.nextStepTime),this.step=(this.step+1)%32,this.nextStepTime+=d0}_scheduleStep(t,e){const n=Math.floor(t/16),s=t%16,r=this.intensity;if((n===0?[0,3,6,8,11,14]:[0,2,6,8,10,14]).includes(s)&&this._kick(e,s===0?1:.72),(s===4||s===12)&&this._clap(e,.42+Math.min(.3,r*.07)),s%2===0&&this._shaker(e,.08+(s%4===0?.04:0)),r>2.2&&s%2===1&&this._shaker(e,.045),[2,7,10,15].includes(s)&&this._agogo(e,s%8===2?1050:780,.1),r>2.6&&s===13&&this._agogo(e,1310,.08),(s===8||s===0)&&this._surdo(e,.35),r>1.35){const o=n===0?[0,3,6,10,12]:[0,3,7,10,14];if(o.includes(s)){const c=n===0?[55,55,65.4,73.4,82.4]:[55,65.4,73.4,82.4,65.4],l=o.indexOf(s);this._bass(e,c[l],.2)}}s===0&&n===0&&this._pad(e,[110,130.81,164.81,196],3.2),r>2.8&&s===0&&n===1&&this._pad(e+1.8,[98,130.81,146.83,196],1.6)}_kick(t,e=1){const n=this.ctx,s=n.createOscillator(),r=n.createGain();s.type="sine",s.frequency.setValueAtTime(150,t),s.frequency.exponentialRampToValueAtTime(43,t+.12),r.gain.setValueAtTime(.9*e,t),r.gain.exponentialRampToValueAtTime(.001,t+.24),s.connect(r).connect(this.musicBus),s.start(t),s.stop(t+.26);const a=n.createBufferSource();a.buffer=this._noise;const o=n.createBiquadFilter();o.type="highpass",o.frequency.value=1800;const c=n.createGain();c.gain.setValueAtTime(.16*e,t),c.gain.exponentialRampToValueAtTime(.001,t+.03),a.connect(o).connect(c).connect(this.musicBus),a.start(t,X(0,.5),.04)}_clap(t,e=.5){const n=this.ctx;for(let s=0;s<3;s++){const r=n.createBufferSource();r.buffer=this._noise;const a=n.createBiquadFilter();a.type="bandpass",a.frequency.value=1150+s*220,a.Q.value=1.4;const o=n.createGain(),c=t+s*.012;o.gain.setValueAtTime(.001,c),o.gain.linearRampToValueAtTime(e*.55,c+.004),o.gain.exponentialRampToValueAtTime(.001,c+.11),r.connect(a).connect(o).connect(this.musicBus),o.connect(this.reverb),r.start(c,X(0,.4),.14)}}_shaker(t,e=.08){const n=this.ctx,s=n.createBufferSource();s.buffer=this._noise;const r=n.createBiquadFilter();r.type="highpass",r.frequency.value=6500;const a=n.createGain();a.gain.setValueAtTime(.001,t),a.gain.linearRampToValueAtTime(e,t+.008),a.gain.exponentialRampToValueAtTime(5e-4,t+.055),s.connect(r).connect(a).connect(this.musicBus),s.start(t,X(0,.6),.07)}_agogo(t,e,n){const s=this.ctx,r=s.createGain();r.gain.setValueAtTime(1e-4,t),r.gain.linearRampToValueAtTime(n,t+.005),r.gain.exponentialRampToValueAtTime(1e-4,t+.3);const a=s.createOscillator();a.type="triangle",a.frequency.value=e;const o=s.createOscillator();o.type="sine",o.frequency.value=e*1.47;const c=s.createGain();c.gain.value=.35,a.connect(r),o.connect(c).connect(r),r.connect(this.musicBus),r.connect(this.reverb),a.start(t),o.start(t),a.stop(t+.32),o.stop(t+.32)}_surdo(t,e){const n=this.ctx,s=n.createOscillator(),r=n.createGain();s.type="sine",s.frequency.setValueAtTime(92,t),s.frequency.exponentialRampToValueAtTime(58,t+.25),r.gain.setValueAtTime(e,t),r.gain.exponentialRampToValueAtTime(.001,t+.4),s.connect(r).connect(this.musicBus),s.start(t),s.stop(t+.42)}_bass(t,e,n){const s=this.ctx,r=s.createOscillator();r.type="sawtooth",r.frequency.value=e;const a=s.createBiquadFilter();a.type="lowpass",a.frequency.setValueAtTime(720,t),a.frequency.exponentialRampToValueAtTime(180,t+.22),a.Q.value=5;const o=s.createGain();o.gain.setValueAtTime(.001,t),o.gain.linearRampToValueAtTime(n,t+.015),o.gain.exponentialRampToValueAtTime(.001,t+.26),r.connect(a).connect(o).connect(this.musicBus),r.start(t),r.stop(t+.28)}_pad(t,e,n=2){const s=this.ctx,r=s.createGain();r.gain.setValueAtTime(1e-4,t),r.gain.linearRampToValueAtTime(.035,t+.5),r.gain.setValueAtTime(.035,t+n*.55),r.gain.exponentialRampToValueAtTime(1e-4,t+n),e.forEach((a,o)=>{const c=s.createOscillator();c.type=o%2?"sine":"triangle",c.frequency.value=a,c.detune.value=(o-1.5)*7,c.connect(r),c.start(t),c.stop(t+n+.05)}),r.connect(this.musicBus),r.connect(this.reverb)}_env(t,e=.3,n=.005){const s=this.ctx,r=s.createGain(),a=s.currentTime;return r.gain.setValueAtTime(1e-4,a),r.gain.linearRampToValueAtTime(e,a+n),r.gain.exponentialRampToValueAtTime(1e-4,a+t),r.connect(this.sfxBus),{g:r,t:a}}_tone(t,e,n,s,r,{filter:a=null,detune:o=0}={}){if(!this.ctx)return;const c=this.ctx,{g:l,t:d}=this._env(s,r),u=c.createOscillator();if(u.type=t,u.detune.value=o,u.frequency.setValueAtTime(e,d),n!==e&&u.frequency.exponentialRampToValueAtTime(Math.max(20,n),d+s*.85),a){const h=c.createBiquadFilter();h.type=a.type||"lowpass",h.frequency.value=a.freq,h.Q.value=a.q??1,u.connect(h).connect(l)}else u.connect(l);u.start(d),u.stop(d+s+.02)}_noiseBurst(t,e,{type:n="highpass",freq:s=1200,sweep:r=null,q:a=1}={}){if(!this.ctx)return;const o=this.ctx,{g:c,t:l}=this._env(t,e,.003),d=o.createBufferSource();d.buffer=this._noise;const u=o.createBiquadFilter();u.type=n,u.frequency.setValueAtTime(s,l),r&&u.frequency.exponentialRampToValueAtTime(Math.max(40,r),l+t),u.Q.value=a,d.connect(u).connect(c),d.start(l,X(0,.5),t+.05)}shoot(){this.ctx&&(this._tone("square",420,110,.075,.12,{filter:{type:"lowpass",freq:2400}}),this._noiseBurst(.05,.06,{freq:2600,sweep:900}))}overheat(){this._noiseBurst(.55,.18,{type:"bandpass",freq:2400,sweep:420,q:.8}),this._tone("sawtooth",180,60,.5,.1)}hit(t=!1){this._tone("triangle",t?1500:980,t?900:700,.05,.07)}kill(t=!1){this._tone("sawtooth",t?380:520,70,t?.5:.24,t?.2:.12,{filter:{type:"lowpass",freq:1800}}),this._noiseBurst(t?.5:.22,t?.24:.12,{freq:1800,sweep:200}),t&&this._tone("sine",90,40,.7,.3)}damage(){this._tone("sine",130,50,.28,.32),this._noiseBurst(.18,.16,{type:"lowpass",freq:900})}dash(){this._noiseBurst(.22,.14,{type:"bandpass",freq:500,sweep:2600,q:.9})}pickup(t=!1){const e=t?392:523.25;(t?[e,e*1.25,e*1.5,e*2]:[e,e*1.5]).forEach((s,r)=>{setTimeout(()=>{this.ctx&&this._tone("triangle",s,s,.14,.12)},r*55)})}waveStart(t=1){[0,.14,.28].forEach((e,n)=>{setTimeout(()=>{this.ctx&&(this._tone("triangle",660*(1+n*.26),660*(1+n*.26),.18,.12),this._tone("sine",1320*(1+n*.26),1320*(1+n*.26),.1,.05))},e*1e3)})}bossRoar(){this.ctx&&(this._tone("sawtooth",74,34,1.1,.32,{filter:{type:"lowpass",freq:420}}),this._tone("square",111,48,1,.12,{filter:{type:"lowpass",freq:600}}),this._noiseBurst(1,.2,{type:"bandpass",freq:320,sweep:90,q:.7}))}gameOver(){[220,196,164.81,130.81].forEach((t,e)=>{setTimeout(()=>{this.ctx&&this._tone("triangle",t,t*.99,.8,.12)},e*170)})}click(){this._tone("sine",660,520,.05,.06)}enemyShot(){this._tone("square",300,180,.09,.035,{filter:{type:"lowpass",freq:1200}})}}const Ot=i=>document.getElementById(i);class p0{constructor(){this.el={hud:Ot("hud"),menu:Ot("menu"),pause:Ot("pause"),gameover:Ot("gameover"),help:Ot("help"),health:document.querySelector(".hud-health"),healthFill:Ot("healthFill"),healthGhost:Ot("healthGhost"),healthNum:Ot("healthNum"),waveLabel:Ot("waveLabel"),waveSub:Ot("waveSub"),scoreNum:Ot("scoreNum"),bossBar:Ot("bossBar"),bossFill:Ot("bossFill"),bossHp:Ot("bossHp"),crosshair:Ot("crosshair"),hitmarker:Ot("hitmarker"),combo:Ot("combo"),comboNum:Ot("comboNum"),waveBanner:Ot("waveBanner"),toast:Ot("toast"),damageVignette:Ot("damageVignette"),healVignette:Ot("healVignette"),fireBtn:Ot("fireBtn"),heatRing:Ot("heatRing"),dashCd:Ot("dashCd"),dashBtn:Ot("dashBtn"),tiltChip:Ot("tiltChip"),tiltState:Ot("tiltState"),tiltHint:Ot("tiltHint"),tiltToggle:Ot("tiltToggle"),pauseTiltBtn:Ot("pauseTiltBtn"),soundToggle:Ot("soundToggle"),soundState:Ot("soundState"),pauseSoundBtn:Ot("pauseSoundBtn"),bestLine:Ot("bestLine"),pauseWave:Ot("pauseWave"),pauseScore:Ot("pauseScore"),pauseKills:Ot("pauseKills"),goWave:Ot("goWave"),goScore:Ot("goScore"),goKills:Ot("goKills"),goSub:Ot("goSub"),recordLine:Ot("recordLine"),boot:Ot("boot"),rotateToast:Ot("rotateToast"),scoreLayer:null},this.best=Number(localStorage.getItem("morrovivo.best")||0),this._toastTimer=0,this._hitTimer=0,this._comboTimer=0;const t=document.createElement("div");t.className="score-layer",this.el.hud.appendChild(t),this.el.scoreLayer=t,this.setBest(this.best),this.updateSoundLabel(!0)}hideBoot(){this.el.boot.classList.add("done"),setTimeout(()=>this.el.boot.remove(),900)}hideAllScreens(){for(const t of["menu","pause","gameover","help"])this.el[t].classList.add("hidden"),this.el[t].setAttribute("aria-hidden","true")}showMenu(){this.hideAllScreens(),this.el.menu.classList.remove("hidden"),this.el.menu.setAttribute("aria-hidden","false"),this.el.hud.classList.add("hidden"),this.el.hud.setAttribute("aria-hidden","true"),this.el.rotateToast.classList.add("hidden"),this.setBest(this.best)}showHud(){this.el.hud.classList.remove("hidden"),this.el.hud.setAttribute("aria-hidden","false"),this.el.rotateToast.classList.add("hidden")}showPause(t){this.el.pause.classList.remove("hidden"),this.el.pause.setAttribute("aria-hidden","false"),this.el.pauseWave.textContent=String(t.wave).padStart(2,"0"),this.el.pauseScore.textContent=this.format(t.score),this.el.pauseKills.textContent=t.kills}hidePause(){this.el.pause.classList.add("hidden"),this.el.pause.setAttribute("aria-hidden","true")}showHelp(){this.el.help.classList.remove("hidden"),this.el.help.setAttribute("aria-hidden","false")}hideHelp(){this.el.help.classList.add("hidden"),this.el.help.setAttribute("aria-hidden","true")}showGameOver(t){this.hideAllScreens(),this.el.hud.classList.add("hidden"),this.el.gameover.classList.remove("hidden"),this.el.gameover.setAttribute("aria-hidden","false"),this.el.goWave.textContent=String(t.wave).padStart(2,"0"),this.el.goScore.textContent=this.format(t.score),this.el.goKills.textContent=t.kills,t.score>this.best?(this.best=t.score,localStorage.setItem("morrovivo.best",String(this.best)),this.el.goSub.textContent="Novo recorde. O morro inteiro viu."):this.el.goSub.textContent="Mas o morro lembra de quem lutou.",this.el.recordLine.textContent=`RECORDE PESSOAL: ${this.format(this.best)}`,this.setBest(this.best),this.el.combo.classList.remove("on")}setBest(t){this.best=t,this.el.bestLine.innerHTML=`RECORDE <b>${this.format(t)}</b>`}format(t){return Math.round(t).toLocaleString("pt-BR")}setHealth(t,e=100){const n=me(t/e,0,1);this.el.healthFill.style.transform=`scaleX(${n})`,this.el.healthGhost.style.transform=`scaleX(${n})`,this.el.healthNum.textContent=Math.ceil(t),this.el.health.classList.toggle("low",n<.3)}setWave(t,e=""){this.el.waveLabel.textContent=`ONDA ${String(t).padStart(2,"0")}`,this.el.waveSub.textContent=e||(t%5===0?"BOITATÁ À VISTA":"DEFENDA O MORRO")}setScore(t){this.el.scoreNum.textContent=this.format(t)}banner(t,e=""){const n=this.el.waveBanner;n.innerHTML=`${t}${e?`<small>${e}</small>`:""}`,n.classList.remove("show"),n.offsetWidth,n.classList.add("show")}toast(t,e=1800){const n=this.el.toast;n.textContent=t,n.classList.add("show"),clearTimeout(this._toastTimer),this._toastTimer=setTimeout(()=>n.classList.remove("show"),e)}combo(t,e){if(t<=1){this.el.combo.classList.remove("on");return}this.el.comboNum.textContent=`x${t}`,this.el.combo.classList.add("on"),this.el.combo.classList.remove("pop"),this.el.combo.offsetWidth,this.el.combo.classList.add("pop"),clearTimeout(this._comboTimer),this._comboTimer=setTimeout(()=>this.el.combo.classList.remove("on"),2600)}hideCombo(){this.el.combo.classList.remove("on")}hit(t=!1){const e=this.el.hitmarker;e.classList.remove("show","kill"),e.offsetWidth,e.classList.add("show"),t&&e.classList.add("kill"),clearTimeout(this._hitTimer),this._hitTimer=setTimeout(()=>e.classList.remove("show","kill"),220)}setHeat(t,e){this.el.fireBtn.style.setProperty("--heat",String(Math.round(me(t,0,100)))),this.el.fireBtn.classList.toggle("overheated",!!e),this.el.crosshair.classList.toggle("overheat",!!e),this.el.crosshair.classList.toggle("hot",t>65&&!e)}setDash(t){this.el.dashCd.style.height=`${Math.round(me(t,0,1)*100)}%`,this.el.dashBtn.classList.toggle("ready",t<=.001)}setBoss(t){if(t===null){this.el.bossBar.classList.add("hidden");return}this.el.bossBar.classList.remove("hidden");const e=me(t,0,1);this.el.bossFill.style.transform=`scaleX(${e})`,this.el.bossHp.textContent=`${Math.ceil(e*100)}%`,this.el.bossBar.classList.toggle("low",e<.35)}damage(){const t=this.el.damageVignette;t.style.opacity="1",clearTimeout(this._dmgTimer),this._dmgTimer=setTimeout(()=>{t.style.opacity="0"},220)}heal(){const t=this.el.healVignette;t.style.opacity="1",clearTimeout(this._healTimer),this._healTimer=setTimeout(()=>{t.style.opacity="0"},420)}pop(t,e,n,s="#ffbf3c",r=!1){const a=document.createElement("div");a.className=`score-pop${r?" big":""}`,a.textContent=t,a.style.left=`${e}px`,a.style.top=`${n}px`,a.style.color=s,this.el.scoreLayer.appendChild(a),setTimeout(()=>a.remove(),900)}setTiltActive(t){this.el.tiltChip.classList.toggle("hidden",!t)}updateTiltLabel(t,e=""){this.el.tiltState.textContent=t?"ON":"OFF",this.el.tiltToggle.setAttribute("aria-pressed",t?"true":"false"),this.el.pauseTiltBtn.innerHTML=`Inclinação: <b>${t?"ON":"OFF"}</b>`,t?(this.el.tiltHint.className="tilt-hint ok",this.el.tiltHint.textContent="Inclinação ativa. Mire virando o aparelho — recalibre na pausa se precisar."):(this.el.tiltHint.className="tilt-hint",e==="denied"?this.el.tiltHint.textContent="Permissão de movimento negada. Sem problema: o toque continua valendo.":e==="nosensor"?this.el.tiltHint.textContent="Nenhum sensor de movimento respondeu. Jogue no toque.":e==="unsupported"?this.el.tiltHint.textContent="Este navegador não oferece sensor de inclinação. Jogue no toque.":e==="error"?this.el.tiltHint.textContent="Não foi possível ativar o sensor. Jogue no toque.":this.el.tiltHint.textContent="A inclinação é opcional — no iPhone o navegador pede permissão.")}updateSoundLabel(t){this.el.soundState.textContent=t?"ON":"OFF",this.el.soundToggle.setAttribute("aria-pressed",t?"true":"false"),this.el.pauseSoundBtn.innerHTML=`Som: <b>${t?"ON":"OFF"}</b>`}showRotateHint(){window.innerHeight>window.innerWidth&&(this.el.rotateToast.classList.remove("hidden"),setTimeout(()=>this.el.rotateToast.classList.add("hidden"),5200))}}const Pi=1.66,Ze=100,qs={x:11.2,z:8.6},Li=new C(0,0,6.4);class m0{constructor(t){this.canvas=t,this.ui=new p0,this.audio=new f0,this.state="boot",this.time=0,this.dt=0,this.tmpVector=new C,this.renderer=new Xm({canvas:t,antialias:window.devicePixelRatio<2,powerPreference:"high-performance",alpha:!1,stencil:!1}),this.pixelCap=window.matchMedia("(pointer: coarse)").matches?1.6:2,this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,this.pixelCap)),this.renderer.setSize(window.innerWidth,window.innerHeight,!1),this.renderer.outputColorSpace=He,this.renderer.toneMapping=Wa,this.renderer.toneMappingExposure=1.08,this.scene=new Rh,this.camera=new an(72,window.innerWidth/window.innerHeight,.05,700),this.camera.rotation.order="YXZ",this.scene.add(this.camera),this.world=s0(this.scene,this.renderer),this.weapon=new l0(this.camera,this.audio),this.weapon.group.visible=!1,this.enemies=new h0(this.scene,this.audio,{damagePlayer:(e,n)=>this.hurt(e,n),onKill:(e,n)=>this.onKill(e,n)}),this.controls=new r0({canvas:t,stickZone:document.getElementById("stickZone"),stickBase:document.getElementById("stickBase"),stickKnob:document.getElementById("stickKnob"),lookZone:document.getElementById("lookZone"),fireBtn:document.getElementById("fireBtn"),dashBtn:document.getElementById("dashBtn"),onDash:()=>this.tryDash(),onPause:()=>this.togglePause()}),this.player={pos:Li.clone(),vel:new C,yaw:0,pitch:-.03,hp:Ze,invuln:0,dashTime:0,dashCd:0,dashDir:new C,walkPhase:0,moveAmount:0,shake:0},this.cameraBase=new C,this.cameraPos=new C(Li.x,Pi,Li.z),this.threatLayer=document.getElementById("threats"),this.threatEls=[];for(let e=0;e<6;e++){const n=document.createElement("div");n.className="threat",n.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 3.5 18 12 8 20.5" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',this.threatLayer.appendChild(n),this.threatEls.push(n)}this._threatFwd=new C,this._threatRight=new C,this._threatTmp=new C,this.score=0,this.kills=0,this.wave=0,this.combo=0,this.comboTimer=0,this.multiplier=1,this.pending=[],this.spawnTimer=0,this.intermission=0,this.stateTimer=0,this.dying=!1,this.pickups=[],this.menuTime=0,this.intro=null,this.fov=72,this.quality=1,this.weapon.setViewport(window.innerWidth/window.innerHeight),this.fpsSamples=[],this.lowFpsTime=0,this.ui.setHealth(Ze,Ze),this.ui.setScore(0),this.ui.updateSoundLabel(this.audio.enabled),this._bindUI(),this._bindResize(),this.state="menu",this.weapon.group.visible=!1,this.ui.showMenu(),this.setMenuCamera(0),this.clock=new $h,this._loop=this._loop.bind(this),requestAnimationFrame(this._loop),window.__MORRO__=this}_bindUI(){document.getElementById("startBtn").addEventListener("click",()=>this.startRun()),document.getElementById("againBtn").addEventListener("click",()=>this.startRun()),document.getElementById("resumeBtn").addEventListener("click",()=>this.resume()),document.getElementById("pauseBtn").addEventListener("click",()=>this.togglePause()),document.getElementById("restartBtn").addEventListener("click",()=>this.startRun()),document.getElementById("quitBtn").addEventListener("click",()=>this.backToMenu()),document.getElementById("menuBtn").addEventListener("click",()=>this.backToMenu()),document.getElementById("helpBtn").addEventListener("click",()=>{this.audio.init(),this.audio.click(),this.ui.showHelp()}),document.getElementById("helpClose").addEventListener("click",()=>this.ui.hideHelp()),document.getElementById("helpPlay").addEventListener("click",()=>{this.ui.hideHelp(),this.startRun()}),document.getElementById("tiltToggle").addEventListener("click",()=>this.toggleTilt()),document.getElementById("pauseTiltBtn").addEventListener("click",()=>this.toggleTilt()),document.getElementById("recalBtn").addEventListener("click",()=>{this.controls.tilt.calibrate(),this.audio.click(),this.ui.toast("Inclinação recalibrada")}),document.getElementById("soundToggle").addEventListener("click",()=>this.toggleSound()),document.getElementById("pauseSoundBtn").addEventListener("click",()=>this.toggleSound()),document.getElementById("rotateClose").addEventListener("click",()=>this.ui.el.rotateToast.classList.add("hidden")),document.addEventListener("visibilitychange",()=>{document.hidden&&(this.state==="playing"||this.state==="intro")&&this.togglePause()}),window.addEventListener("blur",()=>{this.state==="playing"&&this.togglePause()})}_bindResize(){window.addEventListener("resize",()=>{const t=window.innerWidth,e=window.innerHeight;this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,this.pixelCap)*this.quality),this.renderer.setSize(t,e,!1),this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.weapon.setViewport(t/e)})}async toggleTilt(){if(this.audio.init(),this.controls.tilt.enabled){this.controls.tilt.disable(),this.ui.updateTiltLabel(!1),this.ui.setTiltActive(!1),this.ui.toast("Inclinação desligada");return}this.ui.updateTiltLabel(!1),this.ui.el.tiltHint.textContent="Aguardando o sensor…";try{const t=await this.controls.tilt.enable();t.ok?(this.ui.updateTiltLabel(!0),this.ui.setTiltActive(this.state==="playing"||this.state==="intro"),this.audio.click(),this.ui.toast("Inclinação ativa — vire o aparelho para mirar")):this.ui.updateTiltLabel(!1,t.reason)}catch{this.ui.updateTiltLabel(!1,"error")}}toggleSound(){this.audio.init(),this.audio.setEnabled(!this.audio.enabled),this.ui.updateSoundLabel(this.audio.enabled),this.audio.click()}setMenuCamera(t){const e=this.camera,n=7.8+Math.sin(t*.05)*1.5,s=3.9+Math.sin(t*.12)*.2,r=7.9+Math.cos(t*.05)*1;e.position.set(n,s,r);const a=this.tmpVector.set(-3.4+Math.sin(t*.04)*1.4,2.35+Math.sin(t*.09)*.18,-5.2);e.lookAt(a),this.fov=64,e.fov=64,e.updateProjectionMatrix()}startRun(){this.audio.init(),this.audio.setEnabled(this.audio.enabled),this.audio.update();try{document.fullscreenEnabled&&!document.fullscreenElement&&this.controls.isTouch&&document.documentElement.requestFullscreen?.().catch(()=>{})}catch{}this.resetRun(),this._clearThreats(),this.ui.hideAllScreens(),this.ui.showHud(),this.weapon.group.visible=!0,this.intro={pos:this.camera.position.clone(),yaw:this._yawFromCamera(),pitch:this.camera.rotation.x,t:0,duration:.5},this.state="intro",this.stateTimer=0,this.controls.setEnabled(!0),this.audio.setIntensity(1.2),this.audio.waveStart(1),this.ui.banner("BEM-VINDO AO MORRO","DEFENDA O TERRITÓRIO"),this.ui.setBoss(null),this.ui.updateTiltLabel(this.controls.tilt.enabled),this.ui.setTiltActive(this.controls.tilt.enabled),this.ui.hideCombo(),this.ui.setHeat(0,!1),this.ui.setDash(0);const t=this.controls.isTouch||window.innerWidth<820;this.ui.toast(t?"Arraste para olhar · segure AÇAÍ para atirar":"WASD para andar · mouse para mirar · clique para atirar",4200),window.innerHeight>window.innerWidth&&this.controls.isTouch&&this.ui.showRotateHint()}resetRun(){this.score=0,this.kills=0,this.wave=0,this.combo=0,this.comboTimer=0,this.multiplier=1,this.pending=[],this.intermission=0,this.spawnTimer=0,this.dying=!1,this.player.pos.copy(Li),this.player.vel.set(0,0,0),this.player.yaw=0,this.player.pitch=-.03,this.player.hp=Ze,this.player.invuln=.6,this.player.dashTime=0,this.player.dashCd=0,this.player.shake=0,this.player.walkPhase=0,this.player.moveAmount=0,this.cameraPos.set(Li.x,Pi,Li.z),this.camera.fov=72,this.camera.updateProjectionMatrix(),this.fov=72,this.weapon.reset(),this.enemies.reset(),this._clearPickups(),this.ui.setHealth(Ze,Ze),this.ui.setScore(0),this.ui.setWave(1),this.ui.setBoss(null),this.ui.setHeat(0,!1),this.ui.setDash(0),this.ui.hideCombo(),this.audio.setIntensity(1.2)}_yawFromCamera(){const t=new C;return this.camera.getWorldDirection(t),Math.atan2(-t.x,-t.z)}backToMenu(){this.state="menu",this.controls.setEnabled(!1),this.controls.tilt.available=this.controls.tilt.enabled,this.enemies.reset(),this._clearPickups(),this._clearThreats(),this.weapon.group.visible=!1,this.ui.showMenu(),this.ui.setTiltActive(!1),this.audio.setIntensity(1),this.setMenuCamera(this.menuTime)}togglePause(){this.state==="playing"||this.state==="intro"?(this.pausedFrom=this.state,this.state="paused",this._clearThreats(),this.controls.setEnabled(!1),this.ui.showPause({wave:this.wave||1,score:this.score,kills:this.kills}),this.audio.click()):this.state==="paused"&&this.resume()}resume(){this.state==="paused"&&(this.state=this.pausedFrom||"playing",this.controls.setEnabled(!0),this.ui.hidePause(),this.audio.click())}tryDash(){if(this.state!=="playing"&&this.state!=="intro")return;const t=this.player;if(t.dashCd>0||t.dashTime>0)return;const e=this.controls.move,n=new C;if(Math.abs(e.x)+Math.abs(e.y)>.15){const s=new C(-Math.sin(t.yaw),0,-Math.cos(t.yaw)),r=new C(Math.cos(t.yaw),0,-Math.sin(t.yaw));n.addScaledVector(s,e.y).addScaledVector(r,e.x)}else n.set(-Math.sin(t.yaw),0,-Math.cos(t.yaw));n.lengthSq()<.001&&n.set(0,0,-1),t.dashDir.copy(n.normalize()),t.dashTime=.18,t.dashCd=2.3,t.invuln=Math.max(t.invuln,.32),this.audio.dash(),this.player.shake=Math.max(this.player.shake,.25),this.enemies.fx.burst(this.cameraPos.clone().setY(.6),3727498,14,{speed:4,size:.12,life:.4,gravity:0})}hurt(t,e){if(this.state!=="playing")return;const n=this.player;n.invuln>0||this.dying||(n.hp-=t,n.invuln=.42,n.shake=Math.min(1,n.shake+.55),this.audio.damage(),this.ui.damage(),this.ui.setHealth(Math.max(0,n.hp),Ze),this.combo=0,this.multiplier=1,this.comboTimer=0,this.ui.hideCombo(),n.hp<=0&&this.die())}die(){this.dying||(this.dying=!0,this.state="dying",this.controls.setEnabled(!1),this._clearThreats(),this.stateTimer=0,this.audio.gameOver(),this.audio.setIntensity(1),this.ui.setHealth(0,Ze),this.ui.setBoss(null),this.ui.banner("O MORRO CHORA","MAS NÃO SE ENTREGA"),this.ui.hideCombo())}onKill(t,e){this.kills+=1,this.combo+=1,this.comboTimer=3.2,this.multiplier=Math.min(6,1+Math.floor(this.combo/3));const n=Math.round(t.score*this.multiplier);if(this.score+=n,this.ui.setScore(this.score),this.ui.combo(this.multiplier),this.ui.hit(!0),this._popupAt(e,`+${n}`,t.type==="boss"?"#ff9a2e":"#ffe6b0",t.type==="boss"),t.type==="boss")this.ui.banner("BOITATÁ CAÍDO","O MORRO RESPIRA"),this.ui.setBoss(null),this.spawnPickup("heal",this._safeDrop(e)),this.spawnPickup("acai",this._safeDrop(this._safeDrop(e),1.4)),this.audio.setIntensity(2.4);else{const s=Math.random();s<.1?this.spawnPickup("heal",this._safeDrop(e)):s<.16&&this.spawnPickup("acai",this._safeDrop(e))}this.world.capivaraHop()}_safeDrop(t,e=0){const n=me(t.x+X(-e-.6,e+.6),-10.2,qs.x-1),s=me(t.z+X(-e-.6,e+.6),-8.6+1,qs.z-1);return new C(n,.7,s)}_popupAt(t,e,n,s=!1){const r=t.clone().project(this.camera);if(r.z>1)return;const a=(r.x*.5+.5)*window.innerWidth,o=(-r.y*.5+.5)*window.innerHeight;this.ui.pop(e,a,o,n,s)}spawnPickup(t,e){const n=new re;n.position.copy(e);const s=new rn(new _n({map:this.enemies.mat.lightGlow.map,color:t==="heal"?3727498:12616956,blending:he,depthWrite:!1,transparent:!0,opacity:.85}));s.scale.set(2.2,2.2,1),n.add(s);let r;if(t==="heal"){const a=new re,o=new at(new Me(.13,.13,.42,12),new It({color:1483594,roughness:.3,metalness:.5,emissive:1014325,emissiveIntensity:.5})),c=new at(new Me(.135,.135,.13,12),new It({color:16765952,roughness:.4,metalness:.2,emissive:11767552,emissiveIntensity:.6}));a.add(o,c),r=a}else{const a=new at(new Se(.2,14,8,0,ue,0,Math.PI/2),new It({color:3871824,roughness:.5}));a.rotation.x=Math.PI;const o=new at(new Se(.18,14,8,0,ue,0,Math.PI/2),new It({color:9133302,emissive:7153881,emissiveIntensity:.9,roughness:.3}));o.rotation.x=Math.PI,o.position.y=.02,r=new re,r.add(a,o)}r.position.y=0,n.add(r),this.scene.add(n),this.pickups.push({kind:t,group:n,mesh:r,life:20,bob:X(0,ue),collected:!1})}_clearPickups(){for(const t of this.pickups)this.scene.remove(t.group);this.pickups.length=0}_updatePickups(t,e){for(let n=this.pickups.length-1;n>=0;n--){const s=this.pickups[n];s.life-=t,s.group.rotation.y+=t*1.6,s.mesh.rotation.y+=t*2.2,s.group.position.y=.75+Math.sin(e*2.4+s.bob)*.12;const r=s.group.position.x-this.player.pos.x,a=s.group.position.z-this.player.pos.z,o=Math.hypot(r,a);if(o<3.2){const c=(3.2-o)/3.2;s.group.position.x-=r*c*t*4,s.group.position.z-=a*c*t*4}if(o<.85&&Math.abs(s.group.position.y-1.1)<1.2){this.collectPickup(s),this.scene.remove(s.group),this.pickups.splice(n,1);continue}s.life<=0&&(this.scene.remove(s.group),this.pickups.splice(n,1))}}collectPickup(t){t.kind==="heal"?(this.player.hp=Math.min(Ze,this.player.hp+30),this.ui.setHealth(this.player.hp,Ze),this.ui.heal(),this.ui.toast("GUARANÁ +30 DE VIDA",1400),this.audio.pickup(!1)):(this.weapon.setOvercharge(9),this.ui.toast("AÇAÍ TURBINADO — CANO FRIO POR 9s",1900),this.audio.pickup(!0),this.player.shake=Math.max(this.player.shake,.15))}startWave(t){if(this.wave=t,this.ui.setWave(t,t%5===0?"BOITATÁ DESPERTO":"DEFENDA O MORRO"),this.audio.waveStart(t),this.audio.setIntensity(t%5===0?3:t>=6?2.5:t>=3?2:1.3),this.pending=[],t%5===0){const e=Math.floor(t/5);this.pending.push({type:"boss"});const n=2+e;for(let s=0;s<n;s++)this.pending.push({type:"saci",delay:1.4+s*.5});this.ui.banner("BOITATÁ","A SERPENTE DE FOGO DESPERTOU")}else{const e=3+Math.round(t*1.25),n=t>=3?Math.min(4,Math.floor((t-1)/2)):0;for(let s=0;s<e;s++)this.pending.push({type:"saci"});for(let s=0;s<n;s++)this.pending.push({type:"mula"});for(let s=this.pending.length-1;s>0;s--){const r=Ga(0,s);[this.pending[s],this.pending[r]]=[this.pending[r],this.pending[s]]}if(this.pending[0]?.type==="mula"){const s=this.pending.findIndex(r=>r.type==="saci");s>0&&([this.pending[0],this.pending[s]]=[this.pending[s],this.pending[0]])}this.ui.banner(`ONDA ${String(t).padStart(2,"0")}`,n?"SACIS E MULAS À VISTA":"SACIS À VISTA")}this.spawnTimer=t===1?.9:1.15,this.intermission=0,this.waveSpawned=0,this.waveTotal=this.pending.length,t===1&&this.pending.length>0&&this.spawnFromPlan(this.pending.shift())}spawnFromPlan(t){const e=this.world.spawnPoints;if(t.type==="boss"){const n=new C(0,5.6,-17);this.enemies.spawnBoss(Math.floor(this.wave/5),n),this.ui.setBoss(1);return}if(this.enemies.enemies.length>=10)return!1;if(t.type==="mula"){const n=X(0,ue),s=new C(Math.sin(n)*X(16,21),1.6+X(0,2.5),Math.cos(n)*X(14,19));this.enemies.spawnMula(this.wave,s)}else{let n;this.wave===1&&this.waveSpawned===0?n=new C(X(-1.4,1.4),3.9,-12.5):(n=_r(e).clone(),n.x+=X(-2.5,2.5),n.z+=X(-2.5,2.5)),this.enemies.spawnSaci(this.wave,n)}return this.waveSpawned++,!0}_updateWaves(t){if(this.intermission>0){this.intermission-=t;const e=Math.ceil(this.intermission);this.ui.el.waveSub.textContent=`PRÓXIMA EM ${e}`,this.intermission<=0&&this.startWave(this.wave+1);return}if(this.spawnTimer-=t,this.pending.length>0&&this.spawnTimer<=0){const e=this.pending[0];e.type==="boss"||this.enemies.enemies.length<10?(this.pending.shift(),this.spawnFromPlan(e),this.spawnTimer=e.type==="boss"?1.6:X(.55,1.25)):this.spawnTimer=.4}this.pending.length===0&&this.enemies.enemies.length===0&&this.state==="playing"&&(this.intermission=5,this.ui.banner("ONDA LIMPA","RESPIRE. O MORRO É SEU."),this.ui.hideCombo(),this.audio.setIntensity(1.4),this.combo=0,this.multiplier=1,this.world.capivaraHop(),this.player.hp<Ze&&(this.player.hp=Math.min(Ze,this.player.hp+10),this.ui.setHealth(this.player.hp,Ze),this.ui.heal()),this.spawnPickup("heal",this._safeDrop(new C(this.player.pos.x,.7,this.player.pos.z),2)))}_updatePlayer(t){const e=this.player,n=this.controls;if(n.update(t),this.state==="playing"||this.state==="intro"){const p=n.consumeLook();e.yaw-=p.x,e.pitch=me(e.pitch-p.y,-1.25,1.15)}const s=n.tilt,r=e.yaw-s.offset.x,a=me(e.pitch+s.offset.y,-1.3,1.25);e.invuln=Math.max(0,e.invuln-t),e.dashCd=Math.max(0,e.dashCd-t),e.dashTime=Math.max(0,e.dashTime-t),e.shake=Math.max(0,e.shake-t*2.4);const o=n.move,c=Math.min(1,Math.hypot(o.x,o.y));e.moveAmount=pn(e.moveAmount,c,10,t);const l=this.tmpVector.set(-Math.sin(e.yaw),0,-Math.cos(e.yaw)),d=new C(Math.cos(e.yaw),0,-Math.sin(e.yaw)),u=new C;u.addScaledVector(l,o.y).addScaledVector(d,o.x),u.lengthSq()>1&&u.normalize(),u.multiplyScalar(5.1),e.dashTime>0?(u.copy(e.dashDir).multiplyScalar(19),e.walkPhase+=t*22):c>.05&&(e.walkPhase+=t*(6+c*6)),e.vel.x=pn(e.vel.x,u.x,12,t),e.vel.z=pn(e.vel.z,u.z,12,t),e.pos.x+=e.vel.x*t,e.pos.z+=e.vel.z*t,e.pos.x=me(e.pos.x,-11.2,qs.x),e.pos.z=me(e.pos.z,-8.6,qs.z);for(const p of this.world.obstacles){const f=e.pos.x-p.x,v=e.pos.z-p.z,E=Math.hypot(f,v),y=p.r+.35;if(E<y&&E>1e-4){const w=(y-E)/E;e.pos.x+=f*w,e.pos.z+=v*w}}const m=Math.sin(e.walkPhase)*.028*e.moveAmount+Math.sin(this.time*1.3)*.004,_=Math.cos(e.walkPhase*.5)*.01*e.moveAmount;if(this.cameraPos.set(e.pos.x,Pi+m+(e.dashTime>0?-.06:0),e.pos.z),this.cameraPos.x+=Math.cos(r)*_,this.cameraPos.z-=Math.sin(r)*_,e.shake>.001){const p=e.shake*e.shake*.16;this.cameraPos.x+=X(-p,p),this.cameraPos.y+=X(-p,p)*.6,this.cameraPos.z+=X(-p,p)}this.camera.position.copy(this.cameraPos),this.camera.rotation.set(a+e.shake*.01*X(-1,1),r+e.shake*.012*X(-1,1),0,"YXZ");const x=e.dashTime>0?79:72;this.fov=pn(this.fov,x,8,t),Math.abs(this.camera.fov-this.fov)>.01&&(this.camera.fov=this.fov,this.camera.updateProjectionMatrix())}_tryFire(){if(this.state!=="playing"||!this.controls.firing)return;const t=this.time;if(!this.weapon.tryFire(t))return;this.audio.shoot();const e=this.camera.position.clone(),n=new C;this.camera.getWorldDirection(n);let s=null;if(this.controls.isTouch?s=this.enemies.bestAssistTarget(e,n,.15):s=this.enemies.bestAssistTarget(e,n,.08),s){const c=s.root.position.clone();s.type==="boss"&&(c.y+=.2),n.copy(c).sub(e).normalize()}const r=this.enemies.raycast(e,n,90),a=this.weapon.muzzleWorld(new C);let o;if(r){o=r.point;const c=this.enemies.damage(r.enemy,12,r.point);this.audio.hit(!1),this.ui.hit(c),this.enemies.fx.burst(r.point,this.weapon.overcharge>0?12616956:16765066,7,{speed:3,size:.1,life:.3,gravity:0})}else o=e.clone().addScaledVector(n,55),this.enemies.fx.spark(o,null,9133302,3);this.enemies.fx.tracer(a,o,this.weapon.overcharge>0?14202110:12616956),this.player.shake=Math.max(this.player.shake,.06)}_updateCombo(t){this.comboTimer>0&&(this.comboTimer-=t,this.comboTimer<=0&&(this.combo=0,this.multiplier=1,this.ui.hideCombo()))}_updateHud(){this.ui.setHeat(this.weapon.heat,this.weapon.overheated),this.ui.setDash(this.player.dashCd>0?this.player.dashCd/2.3:0),this.enemies.boss?this.ui.setBoss(this.enemies.bossHp):!this.ui.el.bossBar.classList.contains("hidden")&&!this.enemies.boss&&this.ui.setBoss(null),this._updateThreats()}_clearThreats(){for(const t of this.threatEls)t.classList.remove("on","boss","pulse")}_updateThreats(){const t=this.camera;t.updateMatrixWorld();const e=this._threatFwd.set(0,0,-1).applyQuaternion(t.quaternion);e.y=0,e.lengthSq()<1e-4?e.set(0,0,-1):e.normalize();const n=this._threatRight.set(-e.z,0,e.x),s=this.enemies.enemies.filter(a=>!a.dead&&a.root.visible).map(a=>({e:a,d:a.root.position.distanceToSquared(t.position)})).sort((a,o)=>a.d-o.d);let r=0;for(const{e:a}of s){if(r>=this.threatEls.length)break;const o=this._threatTmp.copy(a.root.position);o.y+=a.type==="boss"?1.4:.25;const c=o.x-t.position.x,l=o.z-t.position.z,d=c*e.x+l*e.z,u=o.project(t);if(d>.4&&u.z<1&&Math.abs(u.x)<.86&&Math.abs(u.y)<.78)continue;let m,_;if(d>.4&&u.z<1){m=u.x,_=u.y;const f=Math.max(Math.abs(m)/.9,Math.abs(_)/.8,1);m/=f,_/=f}else{const f=Math.atan2(c*n.x+l*n.z,d);let v=Math.sin(f),E=-Math.cos(f);const y=Math.max(Math.abs(v)/.92,Math.abs(E)/.82,1);v/=y,E/=y,m=v,_=-E}const x=Math.atan2(-_,m),p=this.threatEls[r++];p.classList.add("on"),p.classList.toggle("boss",a.type==="boss"),p.classList.toggle("pulse",a.type==="boss"||a.windup>.12),p.style.left=`${((m*.5+.5)*100).toFixed(2)}%`,p.style.top=`${((-_*.5+.5)*100).toFixed(2)}%`,p.style.transform=`translate(-50%, -50%) rotate(${x}rad)`}for(let a=r;a<this.threatEls.length;a++)this.threatEls[a].classList.remove("on","boss","pulse")}update(t){if(this.time+=t,this.state==="playing"||this.state==="intro"||this.state,this.state==="menu"){this.menuTime+=t,this.world.update(t),this.setMenuCamera(this.menuTime),this.enemies.update(t,this.time,this.player.pos,this.cameraPos);return}if(this.state!=="paused"){if(this.world.update(t),this.state==="intro"){this._updatePlayer(t),this.intro.t+=this.dtRaw||t;const e=me(this.intro.t/this.intro.duration,0,1),n=e*e*(3-2*e),s=new C(this.player.pos.x,Pi,this.player.pos.z);this.camera.position.lerpVectors(this.intro.pos,s,n);const r=this.player.yaw,a=this.intro.yaw+(r-this.intro.yaw)*n,o=this.intro.pitch+(this.player.pitch-this.intro.pitch)*n;this.camera.rotation.set(o,a,0,"YXZ"),this.fov=Ec(this.fov,72,n),this.camera.fov=this.fov,this.camera.updateProjectionMatrix(),this.weapon.group.visible=n>.55,this.ui.setHeat(this.weapon.heat,this.weapon.overheated),e>=1&&(this.state="playing",this.startWave(1)),this.enemies.update(t,this.time,this.player.pos,new C(this.player.pos.x,Pi,this.player.pos.z)),this.weapon.update(t,this.player.moveAmount,!1),this.enemies.fx.update(t);return}if(this.state==="dying"){this.stateTimer+=t,this.player.shake=Math.max(0,this.player.shake-t),this.camera.position.y=pn(this.camera.position.y,.7,2.2,t),this.camera.rotation.z=pn(this.camera.rotation.z,.32,2.4,t),this.enemies.update(t*.35,this.time,this.player.pos,this.cameraPos),this.weapon.update(t,0,!1),this.stateTimer>1.5&&(this.state="gameover",this.enemies.reset(),this.ui.showGameOver({wave:this.wave,score:this.score,kills:this.kills}),this.weapon.group.visible=!1);return}this._updatePlayer(t),this._tryFire(),this.weapon.update(t,this.player.moveAmount,this.controls.firing),this.enemies.update(t,this.time,this.player.pos,new C(this.player.pos.x,Pi,this.player.pos.z)),this._updatePickups(t,this.time),this._updateWaves(t),this._updateCombo(t),this._updateHud(),this.controls.tilt.enabled&&this.ui.setTiltActive(!0)}}render(){this.renderer.render(this.scene,this.camera)}_loop(){requestAnimationFrame(this._loop);const t=this.clock.getDelta();this.dtRaw=Math.min(t,.5);const e=Math.min(t,.05);this.dt=e,this._trackQuality(t),this.audio.update();try{this.update(e),this.render()}catch(n){console.error(n)}}_trackQuality(t){if(!t||(this.fpsSamples.push(1/t),this.fpsSamples.length>90&&this.fpsSamples.shift(),this.qualityTimer=(this.qualityTimer||0)+t,this.qualityTimer<3))return;this.qualityTimer=0;const e=this.fpsSamples.reduce((n,s)=>n+s,0)/this.fpsSamples.length;e<42&&this.quality>.65?(this.quality=Math.max(.65,this.quality*.85),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,this.pixelCap)*this.quality),this.renderer.setSize(window.innerWidth,window.innerHeight,!1)):e>57&&this.quality<1&&(this.quality=Math.min(1,this.quality+.1),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,this.pixelCap)*this.quality),this.renderer.setSize(window.innerWidth,window.innerHeight,!1))}}function Cl(){const i=document.getElementById("game");try{new m0(i).ui.hideBoot(),document.getElementById("boot")?.classList.add("done")}catch(t){console.error(t);const e=document.getElementById("boot");e&&(e.innerHTML='<div class="boot-logo">SEM SINAL</div><p style="max-width:280px;text-align:center;font-size:12px;color:#cdbbdd;line-height:1.6">Este navegador não conseguiu abrir o WebGL. Tente atualizar ou usar outro aparelho.</p>')}}document.readyState==="complete"||document.readyState==="interactive"?Cl():window.addEventListener("DOMContentLoaded",Cl);
