
if (annyang) {
    annyang.setLanguage('fr-FR');
    console.log("annyang");

  var commandsFr = {
    'connard': function() {
      console.log('coucou');
      document.body.style.backgroundImage = "url('http://www.memegen.fr/wp-content/uploads/2016/10/1950s-Middle-Finger.jpg')";
      document.getElementById('page-wrapper').style.display = "none";
    },
    'rince moi les yeux': function() {
      console.log('coucou');
      document.body.style.backgroundImage = "url('https://i0.wp.com/public.avionsdechasse.org/images/sources/2016/10/20161028183607_4.jpg')";
      document.getElementById('page-wrapper').style.display = "none";
    },
    'pardon': function() {
      console.log('coucou');
      document.body.style.backgroundImage = "url('../../image/dashboard/wall3.jpg')";
      document.getElementById('page-wrapper').style.display = "block";
    },
    'merci madame': function() {
      console.log('coucou');
      document.body.style.backgroundImage = "url('../../image/dashboard/wall3.jpg')";
      document.getElementById('page-wrapper').style.display = "block";
    },
    'retour' : function() {
      console.log(document.referrer);
      window.location.href = document.referrer;
    },
    'ouvrir': function() {
        document.querySelector('.burger-bubble').className += " open-nav";
        document.querySelector('.menu-toggle-tend').click();
    },

    'fermer': function() {
        document.querySelector('.burger-bubble').classList.remove("open-nav");
        document.querySelector('.menu-toggle-tend').click();
    },

    'titre playlist': function () {
        document.querySelector('input[name="name"]').focus();
    },

    'écrire *word' : function (word) {
        document.activeElement.value = "";
        document.activeElement.value = word;
    },
    'météo' : function () {
      WellWhell.test();
    },
    'météo aujourd\'hui' : function () {
      WellWhell.meteoAjourdhui();
    },
    'météo *word' : function (word) {
      var elts = document.querySelector('[data-content*="' + word + '"]');
      console.log(elts);
      if(typeof elts !== "undefined")
      {
        elementsInfo = elts.parentNode;
          console.log(childrenInfo);
      }
      else {
        console.log("rien n'est trouvé");
      }
      console.log(elementsInfo);
      WellWhell.meteoSemaine(elementsInfo);
    },

    'valider' : function () {
        document.querySelector('form').submit();
    },

    'lire *word' : function (word) {
      console.log( "WOORRRDD : " + word)
      var elts = document.querySelectorAll('[data-content*="' + word + '"]');

      console.log('[data-content*="' + word + '"]')
      console.log(elts)

      if (elts.length > 0) {
        for (var i = 0; i < elts.length; i++) {
          console.log(elts[i].outerText)
          WellWhell.lireTitrePlaylist(elts[i].outerText);
        }
      } else {
          console.log("Rien est trouvé")
      }
    },

    'clique *button' : function (word) {
      console.log( "WOORRRDD : " + word)
      var link = document.querySelector('a[data-content*="' + word + '"]');

      console.log('a[data-content*="' + word + '"]')
      console.log(link)
      if(typeof link !== 'undefined' && link !== null)
        window.location.href = link.getAttribute("href");
    },

    'go *word' : function (word) {
        if (word === 'trajet') {
          window.location.href = '/trajet/';
        }
        else if (word === 'accueil') {
          window.location.href = '/Accueil/';
        }
        else if (word === 'météo') {
          window.location.href = '/meteo/';
        }
        else if (word === 'playlist') {
          window.location.href = '/spotify/playlists/';
        }
        else if (word === 'article') {
          window.location.href = '/vos-articles/';
        }
        else if (word === 'visite') {
          window.location.href = '/vos-visites/';
        }
    },
    'lecture': function () {
      console.log('lecture');
      var frame = document.getElementById('lecteur');
      console.log(frame);
      console.log(frame.contentWindow.document);
      // frame.contentWindow.postMessage('lecture','*');
      frame.contentWindow.document.getElementById("play-button").click();
    }
  };

  // Add our commands to annyang
  annyang.addCommands(commandsFr);
  annyang.start({ continuous: false });
  
  // Start listening. You can call this here, or attach this call to an event, button, etc.
  // annyang.start({ continuous: false });
}
