// Firebase helper (compat) - init once
window.FirebaseRTDB = (function(){
  let inited=false, app=null, auth=null, db=null, user=null;
  async function init(){
    if(inited) return { app, auth, db, user };
    if(!window.FIREBASE_CONFIG) throw new Error("FIREBASE_CONFIG_MISSING");
    const cfg = window.FIREBASE_CONFIG;
    app = firebase.initializeApp(cfg);
    auth = firebase.auth();
    db = firebase.database(window.FIREBASE_DB_URL);
    user = await auth.signInAnonymously().then(r=>r.user);
    inited=true;
    return { app, auth, db, user };
  }
  return { init };
})();