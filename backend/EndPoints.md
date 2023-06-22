# EndPoints

Carpeta
**app/public/partner/**

### Validaciones Body (create | update | batchUpdate)

| Parámetro               | Tipo          | Descripción                                                            |
| ----------------------- | ------------- | ---------------------------------------------------------------------- | ----- | ---------- |
| `type_document_partner` | TYPE_DOCUMENT | Solo acepta "cedula"                                                   | "ruc" | "passport" |
| `dni_partner`           | string        | dni del socio, se valida de acuerdo al type_document_partner (Max 20). |
| `name_partner`          | string        | Nombre del socio (Max 50).                                             |
| `last_name_partner`     | string        | Apellido del socio (Max 50).                                           |
| `birthdate_partner`     | string        | Fecha de nacimiento, se valida el formato dd-mm-yyyy (Max 10).         |
| `city_partner`          | string        | Ciudad del socio (Max 50).                                             |
| `province_partner`      | string        | Provincia del socio (Max 256).                                         |
| `email_partner`         | string        | Email del socio, se valida que sea correcto (Max 15).                  |
| `phone_partner`         | string        | Telefono del socio (Max 20).                                           |

## create

Permite registrar a un nuevo socio, y darle un mensaje de bienvenida mediante correo electronica sí que se registró con éxito.

**http://localhost:3000/app/public/partner/create**

`POST`

### Body

```json
{
	"type_document_partner": "cedula",
	"dni_partner": "1600744443",
	"name_partner": "Angel Miguel",
	"last_name_partner": "Loor Manzano",
	"birthdate_partner": "06-10-1996",
	"city_partner": "Puyo",
	"province_partner": "Pastaza",
	"email_partner": "angelloor.dev@gmail.com",
	"phone_partner": "+593998679628"
}
```

### Success Response

Código de estado: `200 OK`

Ejemplo de respuesta:

```json
{
	"id": true,
	"code": "01-001",
	"status": 200,
	"component": "success",
	"description": "Transaction Ok!",
	"body": {
		"id_partner": "92",
		"type_document_partner": "cedula",
		"dni_partner": "1600744443",
		"name_partner": "Angel Miguel",
		"last_name_partner": "Loor Manzano",
		"birthdate_partner": "06-10-1996",
		"city_partner": "Puyo",
		"province_partner": "Pastaza",
		"email_partner": "angelloor.dev@gmail.com",
		"phone_partner": "+593998679628",
		"deleted_partner": false
	}
}
```

### Error Response

Código de estado: `400 Bad Request`

Ejemplo de respuesta:

```json
{
	"id": false,
	"code": "002-002",
	"status": 400,
	"component": "database",
	"description": "dml_partner_create_modified -> Ya existe un registro con el dni_partner 1600744443"
}
```

## queryRead

Permite traer los socios de acuerdo a la petición, por ejemplo, si se le envía \* trae a todos los socios, si despues del **/** le envía un **dni_partner** trae las coincidencias.

Por ejemplo: **http://localhost:3000/app/public/partner/queryRead/16007**

**http://localhost:3000/app/public/partner/queryRead/\***

`GET`

Ejemplo de respuesta:

### Success Response

```json
[
	{
		"id_partner": "92",
		"type_document_partner": "cedula",
		"dni_partner": "1600744443",
		"name_partner": "Angel Miguel",
		"last_name_partner": "Loor Manzano",
		"birthdate_partner": "06-10-1996",
		"city_partner": "Puyo",
		"province_partner": "Pastaza",
		"email_partner": "angelloor.dev@gmail.com",
		"phone_partner": "+593998679628",
		"deleted_partner": false
	}
]
```

## specificRead

Permite traer un socio en específico enviándole su id.

**http://localhost:3000/app/public/partner/specificRead/1**

`GET`

Ejemplo de respuesta:

### Success Response

```json
{
	"id_partner": "92",
	"type_document_partner": "cedula",
	"dni_partner": "1600744443",
	"name_partner": "Angel Miguel",
	"last_name_partner": "Loor Manzano",
	"birthdate_partner": "06-10-1996",
	"city_partner": "Puyo",
	"province_partner": "Pastaza",
	"email_partner": "angelloor.dev@gmail.com",
	"phone_partner": "+593998679628",
	"deleted_partner": false
}
```

## update

Permite actualizar un socio.

**http://localhost:3000/app/public/partner/update**

`UPDATE`

### Body

```json
{
	"id_partner": 11,
	"type_document_partner": "cedula",
	"dni_partner": "1600744443",
	"name_partner": "Angel Miguel",
	"last_name_partner": "Loor Manzano",
	"birthdate_partner": "06-10-1996",
	"city_partner": "Puyo",
	"province_partner": "Pastaza",
	"email_partner": "angelloor.dev@gmail.com",
	"phone_partner": "+593998679628"
}
```

### Success Response

Código de estado: `200 OK`

Ejemplo de respuesta:

```json
{
	"id": true,
	"code": "01-001",
	"status": 200,
	"component": "success",
	"description": "Transaction Ok!",
	"body": {
		"id_partner": "92",
		"type_document_partner": "cedula",
		"dni_partner": "1600744443",
		"name_partner": "Angel Miguel",
		"last_name_partner": "Loor Manzano",
		"birthdate_partner": "06-10-1996",
		"city_partner": "Puyo",
		"province_partner": "Pastaza",
		"email_partner": "angelloor.dev@gmail.com",
		"phone_partner": "+593998679628",
		"deleted_partner": false
	}
}
```

### Error Response

Código de estado: `400 Bad Request`

Ejemplo de respuesta:

```json
{
	"id": false,
	"code": "03-004",
	"status": 400,
	"component": "validations",
	"description": "El dni 1600744441 no paso la validación de la Cedula o Ruc, por favor verifique los datos ingresados"
}
```

## delete

Permite actualizar un socio.

**http://localhost:3000/app/public/partner/delete?id_partner=8**

`DELETE`

### Parámetros de la solicitud

| Parámetro    | Tipo   | Descripción              |
| ------------ | ------ | ------------------------ |
| `id_partner` | string | Id del socio a eliminar. |

### Success Response

Código de estado: `200 OK`

Ejemplo de respuesta:

```json
{
	"id": true,
	"code": "01-001",
	"status": 200,
	"component": "success",
	"description": "Transaction Ok!",
	"body": true
}
```

### Error Response

Código de estado: `400 Bad Request`

Ejemplo de respuesta:

```json
{
	"id": false,
	"code": "002-002",
	"status": 400,
	"component": "database",
	"description": "El registro con id 92 no se encuentra registrado"
}
```

## batchUpdate

Permite actualizar los socios mediante un CSV.

**http://localhost:3000/app/public/partner/batchUpdate**

`POST`

### Body (form-data)

| Parámetro | Tipo | Descripción                   |
| --------- | ---- | ----------------------------- |
| `csv`     | File | Archivo CSV (./partners.csv). |

### Success Response

Código de estado: `200 OK`

Aqui se muestra como el EndPoint devuelve un [] que tiene status 400 y que también devuelve los socios ingresados como objetos, es debido a que el API mediante consideración del desarrollador decidió que sea así, podia haberse implementado de otra forma, pero debido a que no se obtuvo criterios al respecto se implementó de la siguiente manera, el API validara que todos los campos sean correctos para que se pueda ingresar el socio, caso contrario no.

Ejemplo de respuesta:

```json
{
	"id": true,
	"code": "01-001",
	"status": 200,
	"component": "success",
	"description": "Transaction Ok!",
	"body": [
		{
			"id": false,
			"code": "03-004",
			"status": 400,
			"component": "validations",
			"description": "El dni 1234567890 no paso la validación de la Cedula o Ruc, por favor verifique los datos ingresados"
		},
		{
			"id_partner": "96",
			"type_document_partner": "passport",
			"dni_partner": "1234567883",
			"name_partner": "Carla",
			"last_name_partner": "Fernandez Jimenez",
			"birthdate_partner": "17-04-1987",
			"city_partner": "Manta",
			"province_partner": "Manabí",
			"email_partner": "angelloor.dev@gmail.com",
			"phone_partner": "+593899999999",
			"deleted_partner": false
		}
	]
}
```
