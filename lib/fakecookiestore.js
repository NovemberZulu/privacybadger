var FakeCookieSore = exports.FakeCookieStore = {
  cookies: {},
  updateCookies: function(){
    var self = this;
    chrome.storage.local.get('fakecookiestore', function(items){
      if(chrome.runtime.lastError || !items.fakecookiestore){
        //cookie block list has never been set so we initialize it with an empty array
        console.log("INITIALIZE FAKE COOKIE STOORE");
        chrome.storage.local.set({fakecookiestore: self.cookies});
        return;
      }
      self.cookies = items.fakecookiestore;
    });
  },
  getCookies: function(domain){
    if(this.cookies[domain]){
      return this.cookies[domain];
    } else {
      return {};
    }
  },
  setCookies: function(domain, newCookies){
    if(!this.cookies[domain]){
      this.cookies[domain] = {};
    }
    for(var i = 0; i < newCookies.length; i++){
      var cookieName = newCookies[i].name;
      this.cookies[domain][cookieName] = newCookies[i];
    }
    chrome.storage.local.set({fakecookiestore: this.cookies});
  },
  removeCookie: function(domain, name){
    if(!this.cookies[domain]){
      return;
    }
    if(!name){
      delete this.cookies[domain]
    } else {
      delete this.cookies[domain][name]
    }
    chrome.storage.local.set({fakecookiestore: this.cookies});
  }
}