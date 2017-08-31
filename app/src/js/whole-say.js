
if (annyang) {
    annyang.setLanguage('fr-FR');
    console.log("annyang");

  var commandsFr = {
    'retour' : function() {
      console.log(document.referrer);
      window.location.href = document.referrer;
    },
    'ouvrir': function() {
        document.querySelector('body').className += "open";
    },

    'fermer': function() {
        document.querySelector('body').classList.remove("open");
        document.querySelector('body').removeAttribute("class");
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

  // Start listening. You can call this here, or attach this call to an event, button, etc.
  annyang.start({ continuous: false });
}
