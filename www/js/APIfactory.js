angular.module('App').factory("APIfactory", function($cordovaOauth, $firebaseObject, $filter, $localStorage, $location,$http,$ionicPopup, $firebaseObject, $firebaseArray, Auth, FURL, Utils){


    var ref = new Firebase(FURL);
    var playersRef = ref.child('profile').child($localStorage.userkey).child("player");
    var eventsRef = ref.child('profile').child($localStorage.userkey).child("event");

    var interfaz = {};

    //JUGADORES
    interfaz.getJugadores = function(){
        var jugadores = $firebaseArray(playersRef);
        return jugadores;
    };

    interfaz.getNombreJugador = function(idJugador){
        var nameRef = ref.child('profile').child($localStorage.userkey).child("player").child(idJugador).child("name");
        var playerName;
        nameRef.on("value", function(snapshot) {
          playerName = snapshot.val();
        }, function (errorObject) {
          console.log("The read failed: " + errorObject.code);
        });
        return playerName;
    };

    interfaz.getFotoJugador = function(idJugador){
        var nameRef = ref.child('profile').child($localStorage.userkey).child("player").child(idJugador).child("photo");
        var playerPhoto;
        nameRef.on("value", function(snapshot) {
          playerPhoto = snapshot.val();
        }, function (errorObject) {
          console.log("The read failed: " + errorObject.code);
        });
        return playerPhoto;
    };

    interfaz.pushJugador = function(jugador){
        var userRef = ref.child('profile').child($localStorage.userkey).child("player");
        userRef.push({
            name: jugador.name,
            position: jugador.position,
            dorsal: jugador.dorsal,
            date: $filter('date')(jugador.fecha, "dd-MM-yyyy"),
            age: jugador.edad,
            condition: jugador.condition,
            photo: jugador.photo
        });
    };

    interfaz.updateJugador = function(jugador, idJugador){
        var playerRef = ref.child('profile').child($localStorage.userkey).child("player").child(idJugador);
        playerRef.update({
            name: jugador.name,
            position: jugador.position,
            dorsal: jugador.dorsal,
            date: $filter('date')(jugador.fecha, "dd-MM-yyyy"),
            condition: jugador.condition
        });
    };

    interfaz.updateJugador = function(jugador, idJugador){
        var playerRef = ref.child('profile').child($localStorage.userkey).child("player").child(idJugador);
        playerRef.update({
            name: jugador.name,
            position: jugador.position,
            dorsal: jugador.dorsal,
            date: $filter('date')(jugador.fecha, "dd-MM-yyyy"),
            condition: jugador.condition
        });
    };

    interfaz.updateCondicion = function(jugador, idJugador){
        var playerRef = ref.child('profile').child($localStorage.userkey).child("player").child(idJugador);
        playerRef.update({
            condition: jugador.condition
        });
    };

    interfaz.deleteJugador = function(jugador){
        var ID = jugador.$id;
        var playerRef = ref.child('profile').child($localStorage.userkey).child("player").child(ID);
        
        playerRef.remove();

        var alertPopup = $ionicPopup.alert({
            title: 'Jugador borrado',
        }); 
    };


    //ALINEACIONES
    interfaz.getLineup = function(idLineup){
        var lineupRef = ref.child('profile').child($localStorage.userkey).child("lineups").child(idLineup);
        var lineup;
        lineupRef.on("value", function(snapshot) {
          lineup = snapshot.val();
        }, function (errorObject) {
          console.log("The read failed: " + errorObject.code);
        });
        return lineup;
    };

    interfaz.pushAlineacion = function(alineacion){
        var userRef = ref.child('profile').child($localStorage.userkey).child("lineups");
        userRef.push({
            name: alineacion.name,
            description: alineacion.description
        });
    };
    interfaz.updateLineup = function(idLineup, formation, players){
        var userRef = ref.child('profile').child($localStorage.userkey).child("lineups").child(idLineup);
        userRef.update({
            formation: formation,
            players: players
        });
    };
    interfaz.deleteLineup = function(lineup){
        var ID = lineup.$id;
        var lineupRef = ref.child('profile').child($localStorage.userkey).child("lineups").child(ID);
        
        lineupRef.remove();

        var alertPopup = $ionicPopup.alert({
            title: 'Alineación borrada',
        }); 
    };
    //ESTRATEGIAS
    interfaz.pushEstrategia = function(estrategia){
        var userRef = ref.child('profile').child($localStorage.userkey).child("strategies");
        userRef.push({
            name: estrategia.name,
            description: estrategia.description
        });
    };
    interfaz.deleteStrategy = function(strategy){
        var ID = strategy.$id;
        var strategyRef = ref.child('profile').child($localStorage.userkey).child("strategies").child(ID);
        
        strategyRef.remove();

        var alertPopup = $ionicPopup.alert({
            title: 'Estrategia borrada',
        }); 
    };

    //EVENTOS
    interfaz.getEventos = function(){
        var eventos = $firebaseArray(eventsRef);
        return eventos;
    };

    interfaz.updateMatch = function(idEvent){
        var eventRef = ref.child('profile').child($localStorage.userkey).child("event").child(idEvent);
        eventRef.update({
            finished: true,
        });
    };

    interfaz.updateMatchGoals = function(idEvent, g1, g2){
        var eventRef = ref.child('profile').child($localStorage.userkey).child("event").child(idEvent);
        eventRef.update({
            teamGoals: g1,
            rivalGoals: g2
        });

        var alertPopup = $ionicPopup.alert({
            title: 'Marcador guardado',
        }); 
    };

    interfaz.updateMatchResult = function(idEvent, g1, g2){
        var eventRef = ref.child('profile').child($localStorage.userkey).child("event").child(idEvent);
        var resultado;
        if(g1 > g2)
            resultado = 'Victoria';
        else if(g1 < g2)
            resultado = 'Derrota';
        else if(g1 == g2)
            resultado = 'Empate';

        eventRef.update({
            result: resultado
        });

    };

    interfaz.getTeamGoals = function(idEvent){
        var goalsRef = ref.child('profile').child($localStorage.userkey).child("event").child(idEvent).child("teamGoals");
        var teamGoals;
        goalsRef.on("value", function(snapshot) {
          teamGoals = snapshot.val();
        }, function (errorObject) {
          console.log("The read failed: " + errorObject.code);
        });
        return teamGoals;
    };

    interfaz.getRivalGoals = function(idEvent){
        var goalsRef = ref.child('profile').child($localStorage.userkey).child("event").child(idEvent).child("rivalGoals");
        var rivalGoals;
        goalsRef.on("value", function(snapshot) {
          rivalGoals = snapshot.val();
        }, function (errorObject) {
          console.log("The read failed: " + errorObject.code);
        });
        return rivalGoals;
    };



    interfaz.pushEvento = function(evento){
        var userRef = ref.child('profile').child($localStorage.userkey).child("event");
        var diaSemana = $filter('date')(evento.day, "EEEE");
        diaSemana = translatedayWeek(diaSemana);
        mes = $filter('date')(evento.day, "MMMM");
        var year = $filter('date')(evento.day, "yyyy");
        mes = translatedayMonth(mes);

        if(evento.type == 'Partido'){
            userRef.push({
                name: evento.name,
                type: evento.type,
                rival: evento.rival,
                place: evento.place,
                date: $filter('date')(evento.day, "dd-MM-yyyy"),
                month: $filter('date')(evento.day, "M"),
                dayMonth: mes,
                dayWeek: diaSemana,
                year: year,
                monthWord: $filter('date')(evento.day, "MMMM"),
                dayNumber: $filter('date')(evento.day, "d"),
                hourStart: $filter('date')(evento.hour, "H:mm"),
                finished: false,
                teamGoals: 0,
                rivalGoals: 0,
                result: ''
            });
        }
        else if(evento.type == 'Entrenamiento'){
            console.log('push entrenamiento');
            userRef.push({
                name: evento.name,
                type: evento.type,
                place: evento.placeTraining,
                date: $filter('date')(evento.day, "dd-MM-yyyy"),
                month: $filter('date')(evento.day, "M"),
                monthWord: $filter('date')(evento.day, "MMMM"),
                dayMonth: mes,
                dayWeek:  diaSemana,
                year: year,
                dayNumber: $filter('date')(evento.day, "d"),
                hourStart: $filter('date')(evento.hourStart, "H:mm"),
                hourEnd: $filter('date')(evento.hourEnd, "H:mm"),
            }); 
        }
    };
    
    interfaz.deleteEvento = function(evento){
        var ID = evento.$id;
        var eventRef = ref.child('profile').child($localStorage.userkey).child("event").child(ID);
        
        eventRef.remove();

        var alertPopup = $ionicPopup.alert({
            title: 'Evento borrado',
        }); 
    };

    return interfaz;
});













//Traducir días de la semana
function translatedayWeek(diaSemana){
            if(diaSemana =='Monday')
                diaSemana = 'Lunes';
            else if(diaSemana =='Tuesday')
                diaSemana = 'Martes';
            else if(diaSemana =='Wednesday')
                diaSemana = 'Miércoles';
            else if(diaSemana =='Thursday')
                diaSemana = 'Jueves';
            else if(diaSemana =='Friday')
                diaSemana = 'Viernes';
            else if(diaSemana =='Saturday')
                diaSemana = 'Sábado';
            else if(diaSemana =='Sunday')
                diaSemana = 'Domingo';
            
            return diaSemana;
}

function translatedayMonth(mes){
            if(mes =='January')
                mes = 'Enero';
            else if(mes =='February')
                mes = 'Febrero';
            else if(mes =='March')
                mes = 'Marzo';
            else if(mes =='April')
                mes = 'Abril';
            else if(mes =='May')
                mes = 'Mayo';
            else if(mes =='June')
                mes = 'Junio';
            else if(mes =='July')
                mes = 'Julio';
            else if(mes =='August')
                mes = 'Agosto';
            else if(mes =='September')
                mes = 'Septiembre';
            else if(mes =='October')
                mes = 'Octubre';
            else if(mes =='November')
                mes = 'Noviembre';
            else if(mes =='December')
                mes = 'Diciembre';
            
            return mes;
}
