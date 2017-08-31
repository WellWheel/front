var WellWhell = (function(document){
  responsiveVoice.setDefaultVoice("French Female");
    var WellWhellVal = {
      lireMeteo: function(){
        console.log("lireMeteo");
        console.log(  document.querySelector("#playMeteo"));
        document.getElementById("playMeteo").addEventListener('click',function(e){
          alert(e.target.value + "degré")
          responsiveVoice.speak("Il fait " + e.target.value );
        })
      },
      test: function(){
        var val = document.getElementById("playMeteo").value;
        console.log(val);
        responsiveVoice.speak("Il fait " + val );
      },
      lireTitrePlaylist: function(titrePlaylist) {
        responsiveVoice.speak(titrePlaylist);
      },
      meteoAjourdhui: function() {
        var temp = document.getElementById("meteo").innerHTML;
        var description = document.getElementById("description").innerHTML;
        var tempMin = document.getElementById("tempMin").innerHTML;
        var tempMax = document.getElementById("tempMax").innerHTML;
        var city = document.getElementById("city").innerHTML;

        responsiveVoice.speak("aujourd'hui à " + city + description + " la température sera de " + temp + " la température minimal sera de " + tempMin + " la température maximal " + tempMax);
      },
      meteoSemaine: function(elt) {
        var description = elt.querySelector("#description").innerHTML;
        var tempMin = elt.querySelector("#tempMin").innerHTML;
        var tempMax = elt.querySelector("#tempMax").innerHTML;

        responsiveVoice.speak(description + " la température minimal sera de " + tempMin + " la température maximal " + tempMax);
      },
    }
    return WellWhellVal;
})(document);
