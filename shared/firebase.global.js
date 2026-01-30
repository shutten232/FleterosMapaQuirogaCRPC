(function(){
  function getConfig(){
    const c=window.FIREBASE_CONFIG;
    if(!c||!c.apiKey||!c.databaseURL) throw new Error('FIREBASE_CONFIG_MISSING');
    return c;
  }
  window.ArrivedFirebase={getConfig};
})();
