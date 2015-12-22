/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var cargarDB = {
    db:"",
    initialize: function(){

        //Generamos el conector
        this.db=window.openDatabase("miniCRM_DB","1.0","Base de datos miniCRM",2*1024*1024);
        this.cargaDB();
    },
    cargaDB:function () {
        console.log("Cargamos la base de datos");

        this.db.transaction(this.mostrarDB,this.mostrarDBError);
    },
    mostrarDB:function(tx){
        var sql="SELECT * FROM contactos;";
        console.log("Lanzamos la consulta");
        tx.executeSql(
            sql,
            [],
            //Función de resultado OK
            function(tx,result){
                console.log("Se ha producido la consulta con exito");
                if(result.rows.length>0){
                    for(var i=0;i<result.rows.length;i++){
                        var fila=result.rows.item(i);
                        //Aquí actualizaría automaticamente el html
                        console.log("ROW "+i+" nombre: "+fila.nombre_apellidos);
                        $("#lista ul").append("<li id='"+fila.id+"' class='listaUsers'><a href='detalles.html' data-ajax='false'><img src='./img/cristoph.png' ><div align='center'>"+fila.nombre_apellidos+"</div><div class='profesionLista' align='center'>"+fila.localidad+"</div></a></li>").listview('refresh');
                    }
                }
                //Guardamos la id en el LocalStorage
                $(document).ready(
                    function(){
                        $('.listaUsers').click(
                            function(){
                                var id=$(this).attr("id");
                                window.localStorage.setItem("user_id",id);
                            }
                        );
                    }
                );
            },


            //Función de error
            function(tx,error){
                this.mostrarDBError(error);
            }
        );
    },
    mostrarDBError:function(err){
        console.log("Se ha producido un error en la creacion de la base de datos: "+error.code);
        console.log("Mensaje de error: "+err.message);
    }
 };



var confDB = {
    existe_db:"",
    db:"",
    initialize: function(){
        //Variable existe db;
        this.existe_db=window.localStorage.getItem("existe_db");
        //Comprobamos si existe existe_db
        if (this.existe_db==null) {
            console.log("No existe Base de datos");

            //Creamos un enlace con la base de datos
            this.db=window.openDatabase("miniCRM_DB","1.0","Base de datos miniCRM",2*1024*1024);

            this.createDB();
        }else{
            //Creada
            console.log("Base de datos ya existe");
            cargarDB.initialize();
        }
    },

    //Creamos Base de Datos
    createDB:function () {
        console.log("Creamos la base de datos");

        this.db.transaction(this.createLocalDB,this.createDBError,this.createDBSucc);
    },

    createLocalDB:function(tx){
        tx.executeSql("DROP TABLE IF EXISTS contactos");

        var sql="CREATE TABLE IF NOT EXISTS contactos("+
                "id INTEGER PRIMARY KEY AUTOINCREMENT,"+
                "nombre_apellidos VARCHAR(256),"+
                "edad INT(10),"+
                "localidad VARCHAR(100),"+
                "telefono VARCHAR(15),"+
                "email VARCHAR(256),"+
                "ultimos INTEGER(1) not null CHECK (ultimos >=0 AND ultimos <=1));";

        tx.executeSql(sql);

        //Insertamos datos
        sql="INSERT INTO contactos(nombre_apellidos,edad,localidad,telefono,email)"+
                " VALUES('Cristoph Waltz','49','Austria','633233322','Cristoph@gmail.com',1);";

        tx.executeSql(sql);

        sql="INSERT INTO contactos(nombre_apellidos,edad,localidad,telefono,email)"+
                " VALUES('Quentin Tarantino','39','EEUU','63455434','quentin@gmail.com',0);";

        tx.executeSql(sql);

        sql="INSERT INTO contactos(nombre_apellidos,edad,localidad,telefono,email)"+
                " VALUES('Bryan Cranstron','59','EEUU','63455434','cranstron@gmail.com',1);";

        tx.executeSql(sql);

        sql="INSERT INTO contactos(nombre_apellidos,edad,localidad,telefono,email)"+
                " VALUES('Chuck Norris','59','EEUU','63455434','norris@gmail.com',0);";

        tx.executeSql(sql);
    },
    createDBError:function(err){
        console.log("Se ha producido un error en la creacion de la base de datos: "+error.code);
    },
    createDBSucc:function(){
        console.log("Se ha generado la base de datos con exito");
        window.localStorage.setItem("existe_db",1);
        cargarDB.initialize();
    }

};


var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        /*var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        console.log('Received Event: ' + id);*/

        confDB.initialize();
    }
};

app.initialize();
