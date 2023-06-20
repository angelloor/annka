--
-- PostgreSQL database dump
--

-- Dumped from database version 13.8
-- Dumped by pg_dump version 13.8

-- Started on 2023-06-18 16:28:49

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 630 (class 1247 OID 17559)
-- Name: TYPE_DOCUMENT; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."TYPE_DOCUMENT" AS ENUM (
    'cedula',
    'ruc',
    'passport'
);


ALTER TYPE public."TYPE_DOCUMENT" OWNER TO postgres;

--
-- TOC entry 216 (class 1255 OID 17685)
-- Name: dml_partner_create(public."TYPE_DOCUMENT", character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.dml_partner_create(_type_document_partner public."TYPE_DOCUMENT", _dni_partner character varying, _name_partner character varying, _last_name_partner character varying, _birthdate_partner character varying, _city_partner character varying, _province_partner character varying, _email_partner character varying, _phone_partner character varying) RETURNS numeric
    LANGUAGE plpgsql
    AS $$
			DECLARE
				_COUNT NUMERIC;
				_COUNT_ATT NUMERIC;
				_RETURNING NUMERIC;
				_CURRENT_ID NUMERIC;
				_X RECORD;
				_EXCEPTION TEXT DEFAULT 'Internal Error';
			BEGIN
				-- Obtenemos el la secuencia para el siguiente registro
				_CURRENT_ID = (select nextval('public.serial_partner')-1);
				-- Verificamos que la secuencia no se este utilizando
				_COUNT = (select count(*) from public.view_partner t where t.id_partner = _CURRENT_ID);
				IF (_COUNT = 0) THEN
					-- Verificamos que no exista otro registro con el mismo DNI_PARTNER
					_COUNT_ATT = (select count(*) from public.view_partner t where t.dni_partner = _dni_partner);
					IF (_COUNT_ATT = 0) THEN 
						-- Ingresamos el registro
						FOR _X IN INSERT INTO public.partner(id_partner, type_document_partner, dni_partner, name_partner, last_name_partner, birthdate_partner, city_partner, province_partner, email_partner, phone_partner, deleted_partner) VALUES (_CURRENT_ID, _type_document_partner, _dni_partner, _name_partner, _last_name_partner, _birthdate_partner, _city_partner, _province_partner, _email_partner, _phone_partner, false) RETURNING id_partner LOOP
							_RETURNING = _X.id_partner;
						END LOOP;

						IF (_RETURNING >= 1) THEN
							RETURN _RETURNING;
						ELSE
							_EXCEPTION = 'Ocurrió un error al insertar el registro';
							RAISE EXCEPTION '%',_EXCEPTION USING DETAIL = '_database';
						END IF;
					ELSE
						_EXCEPTION = 'Ya existe un registro con el dni_partner '||_dni_partner||'';
						RAISE EXCEPTION '%',_EXCEPTION USING DETAIL = '_database';
					END IF;
				ELSE
					_EXCEPTION = 'El registro con id '||_CURRENT_ID||' ya se encuentra registrado';
					RAISE EXCEPTION '%',_EXCEPTION USING DETAIL = '_database';
				END IF;
				exception when others then 
					-- RAISE NOTICE '%', SQLERRM;
					IF (_CURRENT_ID >= 1) THEN
						EXECUTE 'select setval(''public.serial_partner'', '||_CURRENT_ID||')';
					END IF;
					IF (_EXCEPTION = 'Internal Error') THEN
						RAISE EXCEPTION '%',SQLERRM USING DETAIL = '_database';
					ELSE
						RAISE EXCEPTION '%',_EXCEPTION USING DETAIL = '_database';
					END IF;
			END;
			
$$;


ALTER FUNCTION public.dml_partner_create(_type_document_partner public."TYPE_DOCUMENT", _dni_partner character varying, _name_partner character varying, _last_name_partner character varying, _birthdate_partner character varying, _city_partner character varying, _province_partner character varying, _email_partner character varying, _phone_partner character varying) OWNER TO postgres;

--
-- TOC entry 217 (class 1255 OID 17684)
-- Name: dml_partner_create_modified(public."TYPE_DOCUMENT", character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.dml_partner_create_modified(_type_document_partner public."TYPE_DOCUMENT", _dni_partner character varying, _name_partner character varying, _last_name_partner character varying, _birthdate_partner character varying, _city_partner character varying, _province_partner character varying, _email_partner character varying, _phone_partner character varying) RETURNS TABLE(id_partner numeric, type_document_partner public."TYPE_DOCUMENT", dni_partner character varying, name_partner character varying, last_name_partner character varying, birthdate_partner character varying, city_partner character varying, province_partner character varying, email_partner character varying, phone_partner character varying, deleted_partner boolean)
    LANGUAGE plpgsql
    AS $$
DECLARE
	_ID_PARTNER NUMERIC;
	_EXCEPTION CHARACTER VARYING DEFAULT 'Internal Error';
BEGIN
	-- Esta funcion sirve para resolver el problema de ambiguedad que no permite hacerlo todo la funcionalidad en una misma funcion.
	-- Ingresamos el registo
	_ID_PARTNER = (select * from public.dml_partner_create(_type_document_partner, _dni_partner, _name_partner, _last_name_partner, _birthdate_partner, _city_partner, _province_partner, _email_partner, _phone_partner));
	-- Comprobamos que se hayan registrado, y devolvemos el registro ingresado
	IF (_ID_PARTNER >= 1) THEN
		RETURN QUERY select * from public.view_partner vp 
			where vp.id_partner = _ID_PARTNER;
	ELSE
		_EXCEPTION = 'Ocurrió un error al ingresar partner';
		RAISE EXCEPTION '%',_EXCEPTION USING DETAIL = '_database';
	END IF;
	exception when others then 
		-- RAISE NOTICE '%', SQLERRM;
		IF (_EXCEPTION = 'Internal Error') THEN
			RAISE EXCEPTION '%', 'dml_partner_create_modified -> '||SQLERRM||'' USING DETAIL = '_database';
		ELSE
			RAISE EXCEPTION '%',_EXCEPTION USING DETAIL = '_database';
		END IF;
END;
$$;


ALTER FUNCTION public.dml_partner_create_modified(_type_document_partner public."TYPE_DOCUMENT", _dni_partner character varying, _name_partner character varying, _last_name_partner character varying, _birthdate_partner character varying, _city_partner character varying, _province_partner character varying, _email_partner character varying, _phone_partner character varying) OWNER TO postgres;

--
-- TOC entry 218 (class 1255 OID 17672)
-- Name: dml_partner_delete(numeric); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.dml_partner_delete(_id_partner numeric) RETURNS boolean
    LANGUAGE plpgsql
    AS $$
			 DECLARE
				_COUNT NUMERIC;
				_COUNT_DELETED NUMERIC;
				_RETURNING NUMERIC;
				_X RECORD;
				_EXCEPTION TEXT DEFAULT 'Internal Error';
			 BEGIN
			 	-- Verificamos que el registro exista
			 	_COUNT = (select count(*) from public.view_partner t where t.id_partner = _id_partner);
					
				IF (_COUNT = 1) THEN
					_COUNT_DELETED = (select count(*) from public.view_partner t where t.id_partner = _id_partner and deleted_partner = true); 
					-- Verificamos si el registro esta eliminado
					IF (_COUNT_DELETED = 0) THEN 
						-- "Eliminamos" el registro
						FOR _X IN UPDATE public.partner SET deleted_partner = true WHERE id_partner = _id_partner RETURNING id_partner LOOP
							_RETURNING = _X.id_partner;
						END LOOP;
						
						IF (_RETURNING >= 1) THEN
							RETURN true;
						ELSE
							_EXCEPTION = 'Ocurrió un error al eliminar el registro';
							RAISE EXCEPTION '%',_EXCEPTION USING DETAIL = '_database';
						END IF;
					ELSE
						_EXCEPTION = 'EL registro ya se encuentra eliminado';
						RAISE EXCEPTION '%',_EXCEPTION USING DETAIL = '_database';
					END IF;
				ELSE
					_EXCEPTION = 'El registro con id '||_id_partner||' no se encuentra registrado';
					RAISE EXCEPTION '%',_EXCEPTION USING DETAIL = '_database';
				END IF;
				exception when others then 
					-- RAISE NOTICE '%', SQLERRM;
					IF (_EXCEPTION = 'Internal Error') THEN
						RAISE EXCEPTION '%',SQLERRM USING DETAIL = '_database';
					ELSE
						RAISE EXCEPTION '%',_EXCEPTION USING DETAIL = '_database';
					END IF;
			 END;
			 
$$;


ALTER FUNCTION public.dml_partner_delete(_id_partner numeric) OWNER TO postgres;

--
-- TOC entry 214 (class 1255 OID 17673)
-- Name: dml_partner_update(numeric, public."TYPE_DOCUMENT", character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.dml_partner_update(_id_partner numeric, _type_document_partner public."TYPE_DOCUMENT", _dni_partner character varying, _name_partner character varying, _last_name_partner character varying, _birthdate_partner character varying, _city_partner character varying, _province_partner character varying, _email_partner character varying, _phone_partner character varying) RETURNS boolean
    LANGUAGE plpgsql
    AS $$
			 DECLARE
				_COUNT NUMERIC;
				_COUNT_ATT NUMERIC;
				_COUNT_DELETED NUMERIC;
				_RETURNING NUMERIC;
				_X RECORD;
				_EXCEPTION TEXT DEFAULT 'Internal Error';
			 BEGIN
			 	-- Verificamos que el registro exista para su actualización
				_COUNT = (select count(*) from public.view_partner t where t.id_partner = _id_partner);
				
				IF (_COUNT = 1) THEN
					_COUNT_DELETED = (select count(*) from public.view_partner t where t.id_partner = _id_partner and deleted_partner = true); 
					-- Verificamos que el registro no se encuentre eliminado
					IF (_COUNT_DELETED = 0) THEN
						_COUNT_ATT = (select count(*) from public.view_partner t where t.dni_partner = _dni_partner and t.id_partner != _id_partner);
						-- Verificamos que no exista otro registro con el mismo DNI_PARTNER
						IF (_COUNT_ATT = 0) THEN 
							-- Actualizamos el registro
							FOR _X IN UPDATE public.partner SET type_document_partner = _type_document_partner, dni_partner = _dni_partner, name_partner = _name_partner, last_name_partner = _last_name_partner, birthdate_partner = _birthdate_partner, city_partner = _city_partner, province_partner = _province_partner, email_partner = _email_partner, phone_partner = _phone_partner WHERE id_partner = _id_partner RETURNING id_partner LOOP
								_RETURNING = _X.id_partner;
							END LOOP;

							IF (_RETURNING >= 1) THEN
								RETURN true;
							ELSE
								_EXCEPTION = 'Ocurrió un error al actualizar el registro';
								RAISE EXCEPTION '%',_EXCEPTION USING DETAIL = '_database';
							END IF;
						ELSE
							_EXCEPTION = 'Ya existe un registro con el dni_partner '||_dni_partner||'';
							RAISE EXCEPTION '%',_EXCEPTION USING DETAIL = '_database';
						END IF;
					ELSE 
						_EXCEPTION = 'EL registro se encuentra eliminado';
						RAISE EXCEPTION '%',_EXCEPTION USING DETAIL = '_database';
					END IF;
				ELSE
					_EXCEPTION = 'El registro con id '||_id_partner||' no se encuentra registrado';
					RAISE EXCEPTION '%',_EXCEPTION USING DETAIL = '_database';
				END IF;
				exception when others then 
					-- RAISE NOTICE '%', SQLERRM;
					IF (_EXCEPTION = 'Internal Error') THEN
						RAISE EXCEPTION '%',SQLERRM USING DETAIL = '_database';
					ELSE
						RAISE EXCEPTION '%',_EXCEPTION USING DETAIL = '_database';
					END IF;
			 END;
			 
$$;


ALTER FUNCTION public.dml_partner_update(_id_partner numeric, _type_document_partner public."TYPE_DOCUMENT", _dni_partner character varying, _name_partner character varying, _last_name_partner character varying, _birthdate_partner character varying, _city_partner character varying, _province_partner character varying, _email_partner character varying, _phone_partner character varying) OWNER TO postgres;

--
-- TOC entry 215 (class 1255 OID 17686)
-- Name: dml_partner_update_modified(numeric, public."TYPE_DOCUMENT", character varying, character varying, character varying, character varying, character varying, character varying, character varying, character varying); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.dml_partner_update_modified(_id_partner numeric, _type_document_partner public."TYPE_DOCUMENT", _dni_partner character varying, _name_partner character varying, _last_name_partner character varying, _birthdate_partner character varying, _city_partner character varying, _province_partner character varying, _email_partner character varying, _phone_partner character varying) RETURNS TABLE(id_partner numeric, type_document_partner public."TYPE_DOCUMENT", dni_partner character varying, name_partner character varying, last_name_partner character varying, birthdate_partner character varying, city_partner character varying, province_partner character varying, email_partner character varying, phone_partner character varying, deleted_partner boolean)
    LANGUAGE plpgsql
    AS $$
DECLARE
 	_STATUS_QUERY BOOLEAN;
	_EXCEPTION CHARACTER VARYING DEFAULT 'Internal Error';
BEGIN
	-- Esta funcion sirve para resolver el problema de ambiguedad que no permite hacerlo todo la funcionalidad en una misma funcion.
	-- Realizamos la actualización
 	_STATUS_QUERY = (select * from public.dml_partner_update(_id_partner, _type_document_partner, _dni_partner, _name_partner, _last_name_partner, _birthdate_partner, _city_partner, _province_partner, _email_partner, _phone_partner));
	-- Comprobamos que se haya actualizado, y devolvemos el registro actualizado
 	IF (_STATUS_QUERY) THEN
		RETURN QUERY select * from public.view_partner vp 
			where vp.id_partner = _id_partner;
	ELSE
		_EXCEPTION = 'Ocurrió un error al actualizar partner';
		RAISE EXCEPTION '%',_EXCEPTION USING DETAIL = '_database';
	END IF;
	exception when others then 
		-- RAISE NOTICE '%', SQLERRM;
		IF (_EXCEPTION = 'Internal Error') THEN
			RAISE EXCEPTION '%', 'dml_partner_update_modified -> '||SQLERRM||'' USING DETAIL = '_database';
		ELSE
			RAISE EXCEPTION '%',_EXCEPTION USING DETAIL = '_database';
		END IF;
END;
$$;


ALTER FUNCTION public.dml_partner_update_modified(_id_partner numeric, _type_document_partner public."TYPE_DOCUMENT", _dni_partner character varying, _name_partner character varying, _last_name_partner character varying, _birthdate_partner character varying, _city_partner character varying, _province_partner character varying, _email_partner character varying, _phone_partner character varying) OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 200 (class 1259 OID 17565)
-- Name: partner; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.partner (
    id_partner numeric(10,0),
    type_document_partner public."TYPE_DOCUMENT",
    dni_partner character varying(20),
    name_partner character varying(50),
    last_name_partner character varying(50),
    birthdate_partner character varying(10),
    city_partner character varying(50),
    province_partner character varying(50),
    email_partner character varying(256),
    phone_partner character varying(15),
    deleted_partner boolean
);


ALTER TABLE public.partner OWNER TO postgres;

--
-- TOC entry 201 (class 1259 OID 17662)
-- Name: serial_partner; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.serial_partner
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 9999999999
    CACHE 1;


ALTER TABLE public.serial_partner OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 17680)
-- Name: view_partner; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.view_partner AS
 SELECT t.id_partner,
    t.type_document_partner,
    t.dni_partner,
    t.name_partner,
    t.last_name_partner,
    t.birthdate_partner,
    t.city_partner,
    t.province_partner,
    t.email_partner,
    t.phone_partner,
    t.deleted_partner
   FROM public.partner t
  WHERE (t.deleted_partner = false)
  ORDER BY t.id_partner DESC;


ALTER TABLE public.view_partner OWNER TO postgres;

--
-- TOC entry 3001 (class 0 OID 0)
-- Dependencies: 201
-- Name: serial_partner; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.serial_partner', 1, true);


-- Completed on 2023-06-18 16:28:50

--
-- PostgreSQL database dump complete
--