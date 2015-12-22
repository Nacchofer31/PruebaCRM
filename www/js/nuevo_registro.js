var nombre_apellidos="";
var edad=0;
var localidad="";
var telefono="";
var email="";
var db="";
var ultimos="";

var contador = 0;

var actualizarContador = {
	initialize: function () {
			this.db = window.openDatabase("miniCRM_DB","1.0","Base de datos miniCRM",2*1024*1024);
			this.loadDB();
	},
	loadDB: function () {
        this.db.transaction(this.actualizarCont, this.actualizarError);
    },
	actualizarCont: function (tx) {
      var sql = "SELECT * FROM contactos where ultims = 1;";
      tx.executeSql(sql, [], function (tx, result) {
          if (result.rows.length >= 0) {
              contador = result.rows.length;
							console.log("El contador está a: "+contador+".");
          }
      },

			function (tx, error) {
          this.showDBError(error);
      });
    },
    actualizarError: function (err) {
        console.log("Error: " + err.code + " // " + err.message);
    }
};

function insertarDatos(tx){
	sql="INSERT INTO contactos(nombre_apellidos, edad, localidad, telefono, email, ultimos)"+
        "VALUES('"+nombre_apellidos+"','"+edad+"','"+localidad+"','"+telefono+"','"+email+"','"+ultimos+");";

    tx.executeSql(sql);
    console.log("ROW INSERT: "+sql);
};

function mostrarDBErrorSalvar(err){
	console.log("Se ha proucido un error en la búsqueda de la base de datos: "+err.code);
	console.log("MENSAJE DE ERROR: "+err.message);
};

$("#registrar").click(
					function(event){
						console.log("NUEVO ELEMENTO");
						if(ultimos == 1 & contador > 2){
							console.log("Se han llegado al máximo de contactos ultimos");
							alert("No se pueden ingresar más de 3 contactos últimos.");
						}else{
							console.log("Agregando contacto...");
						actualizarContador.initialize();
						nombre_apellidos=$("#nombre_apellidos").val();
						edad=$("#edad").val();
						localidad=$("#localidad").val();
						telefono=$("#telefono").val();
						email=$("#email").val();
						ultimos=$("#ultimos").val();

						//Conexión con base de datos
						db=window.openDatabase("miniCRM_DB","1.0","Base de datos miniCRM",2*1024*1024);
						db.transaction(
								insertarDatos,mostrarDBErrorSalvar
							);
						}
					}
);
