var nombre_apellidos="";
var edad=0;
var localidad="";
var telefono="";
var email="";
var db="";
var id="";
var ultimos=0;

var inicia = {

initialize: function(){

        //Generamos el conector
        db=window.openDatabase("miniCRM_DB","1.0","Base de datos miniCRM",2*1024*1024);
        this.cargaDB();
    },
    cargaDB:function () {
        console.log("Cargamos la base de datos");

        db.transaction(this.mostrarDB,this.mostrarDBError);
    },
    mostrarDB:function(tx){
        //PASO 5 || Muestra los detalles del elemento de la lista clickado.
    	id=window.localStorage.getItem("user_id");

        var sql="SELECT * FROM contactos WHERE id='"+id+"';";
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
                        nombre_apellidos=fila.nombre_apellidos;
                        edad=fila.edad;
                        localidad=fila.localidad;
                        telefono=fila.telefono;
                        email=fila.email;
                        ultimos=fila.ultimos;
                        //Aquí actualizaría automaticamente el html
                        console.log("ROW "+i+" nombre: "+fila.nombre_apellidos);
                        $("#nombre_apellidos").append(nombre_apellidos);
                        $("#edad").append(edad);
                        $("#localidad").append(localidad);
                        $("#telefono").append(telefono);
                        $("#correo").append(email);
                        //PASO 5
                        $("#ultimos").append(ultimos);
                    }
                }
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

inicia.initialize();
