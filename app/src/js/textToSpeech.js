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
      }
    }
    return WellWhellVal;
})(document);
