(function(){
  function uuid(){
    const a = crypto.getRandomValues(new Uint8Array(16));
    a[6]=(a[6]&0x0f)|0x40; a[8]=(a[8]&0x3f)|0x80;
    const h=[...a].map(b=>b.toString(16).padStart(2,'0')).join('');
    return `${h.slice(0,8)}-${h.slice(8,12)}-${h.slice(12,16)}-${h.slice(16,20)}-${h.slice(20)}`;
  }
  function fmt(ms){ if(ms==null) return ''; try{return new Date(ms).toLocaleString();}catch{return String(ms);} }
  function mapLink(lat,lng){ if(lat==null||lng==null) return null; return `https://www.google.com/maps?q=${lat},${lng}`; }
  function clamp(s,max=60){ const x=String(s||'').trim(); if(!x) return ''; return x.length>max?x.slice(0,max):x; }
  window.ArrivedUtils={uuid,fmt,mapLink,clamp};
})();
