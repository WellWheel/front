
if (annyang) {
    annyang.setLanguage('fr-FR');
    console.log("annyang");

  var commandsFr = {
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

    'valider' : function () {
        document.querySelector('form').submit();
    },

    'click *button' : function (word) {
      console.log( "WOORRRDD : " + word)
      var link = document.querySelector('a[data-content*="' + word + '"]');

      console.log('a[data-content*="' + word + '"]')
      console.log(link)
      window.location.href = link.getAttribute("href");
    } ,
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
    }
  };

  // Add our commands to annyang
  annyang.addCommands(commandsFr);

  // Start listening. You can call this here, or attach this call to an event, button, etc.
  annyang.start();
}