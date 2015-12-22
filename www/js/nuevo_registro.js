var nombre_apellidos="";
var edad=0;
var localidad="";
var telefono="";
var email="";
var db="";


function insertarDatos(tx){
	sql="INSERT INTO contactos(nombre_apellidos,edad,localidad,telefono,email)"+
        "VALUES('"+nombre_apellidos+"','"+edad+"','"+localidad+"','"+telefono+"','"+email+"');";

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
						nombre_apellidos=$("#nombre_apellidos").val();
						edad=$("#edad").val();
						localidad=$("#localidad").val();
						telefono=$("#telefono").val();
						email=$("#email").val();

						//Conexión con base de datos
						db=window.openDatabase("miniCRM_DB","1.0","Base de datos miniCRM",2*1024*1024);
						db.transaction(
								insertarDatos,mostrarDBErrorSalvar
							);
					}
);
