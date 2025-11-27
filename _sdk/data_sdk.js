(function(){
  // Data SDK that forwards calls to remote API if API_URL is configured,
  // otherwise acts as a local no-op (returns success).
  window.dataSdk = {
    _handler: null,
    init: async function(handler){
      this._handler = handler || null;
      // If remote API is available, we can optionally fetch initial data
      if (window.API_URL) {
        try {
          const resp = await fetch(window.API_URL + '?action=list');
          if (resp && resp.ok) {
            const json = await resp.json();
            return { isOk: true, data: json };
          }
        } catch(e) { console.warn('dataSdk.init remote list failed', e); }
      }
      return { isOk: true };
    },
    create: async function(item){
      if (window.API_URL && typeof fetch === 'function') {
        try {
          const resp = await fetch(window.API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'create', data: item })
          });
          return { isOk: !!(resp && resp.ok), status: resp && resp.status };
        } catch(e) { console.warn('dataSdk.create error', e); return { isOk: false }; }
      }
      return { isOk: true };
    },
    delete: async function(item){
      if (window.API_URL && typeof fetch === 'function') {
        try {
          const resp = await fetch(window.API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'delete', data: item })
          });
          return { isOk: !!(resp && resp.ok), status: resp && resp.status };
        } catch(e) { console.warn('dataSdk.delete error', e); return { isOk: false }; }
      }
      return { isOk: true };
    },
    list: async function(){
      if (window.API_URL && typeof fetch === 'function') {
        try {
          const resp = await fetch(window.API_URL + '?action=list');
          if (resp && resp.ok) { const json = await resp.json(); return { isOk: true, data: json }; }
        } catch(e) { console.warn('dataSdk.list error', e); }
        return { isOk: false, data: [] };
      }
      return { isOk:true, data: [] };
    }
  };
})();
