// Firebase helper (compat) - init once (auth opcional)
// Si tu dominio no está autorizado en Firebase Auth, igual funciona con reglas abiertas.
window.FirebaseRTDB = (function(){
  let inited=false, app=null, auth=null, db=null, user=null;

  async function init(){
    if(inited) return { app, auth, db, user };
    if(!window.FIREBASE_CONFIG) throw new Error("FIREBASE_CONFIG_MISSING");

    const cfg = window.FIREBASE_CONFIG;
    app = firebase.initializeApp(cfg);
    db = firebase.database();

    // Auth anónimo (opcional). Si falla por "unauthorized-domain", seguimos igual.
    try{
      auth = firebase.auth();
      user = await auth.signInAnonymously().then(r=>r.user);
    }catch(e){
      console.warn("Auth anónimo no disponible (se continúa sin auth):", e?.code || e);
      user = null;
    }

    inited=true;
    return { app, auth, db, user };
  }

  return { init };
})();