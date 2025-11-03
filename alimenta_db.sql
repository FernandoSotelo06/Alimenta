--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

-- Started on 2025-11-02 22:22:44

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 218 (class 1259 OID 16442)
-- Name: categorias; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categorias (
    categoria_id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    descripcion text,
    icono text,
    activa boolean DEFAULT true,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.categorias OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16441)
-- Name: categorias_categoria_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categorias_categoria_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categorias_categoria_id_seq OWNER TO postgres;

--
-- TOC entry 5053 (class 0 OID 0)
-- Dependencies: 217
-- Name: categorias_categoria_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categorias_categoria_id_seq OWNED BY public.categorias.categoria_id;


--
-- TOC entry 232 (class 1259 OID 16576)
-- Name: comentarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comentarios (
    comentario_id integer NOT NULL,
    receta_id integer NOT NULL,
    usuario_id integer NOT NULL,
    contenido text NOT NULL,
    calificacion integer,
    activo boolean DEFAULT true,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    padre_comentario_id integer,
    CONSTRAINT comentarios_calificacion_check CHECK (((calificacion >= 1) AND (calificacion <= 5)))
);


ALTER TABLE public.comentarios OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 16575)
-- Name: comentarios_comentario_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comentarios_comentario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.comentarios_comentario_id_seq OWNER TO postgres;

--
-- TOC entry 5054 (class 0 OID 0)
-- Dependencies: 231
-- Name: comentarios_comentario_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comentarios_comentario_id_seq OWNED BY public.comentarios.comentario_id;


--
-- TOC entry 224 (class 1259 OID 16496)
-- Name: etiquetas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.etiquetas (
    etiqueta_id integer NOT NULL,
    nombre character varying(50) NOT NULL,
    color character varying(7) DEFAULT '#6B7280'::character varying,
    descripcion text,
    activa boolean DEFAULT true,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.etiquetas OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16495)
-- Name: etiquetas_etiqueta_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.etiquetas_etiqueta_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.etiquetas_etiqueta_id_seq OWNER TO postgres;

--
-- TOC entry 5055 (class 0 OID 0)
-- Dependencies: 223
-- Name: etiquetas_etiqueta_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.etiquetas_etiqueta_id_seq OWNED BY public.etiquetas.etiqueta_id;


--
-- TOC entry 234 (class 1259 OID 16604)
-- Name: favoritos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.favoritos (
    favorito_id integer NOT NULL,
    usuario_id integer NOT NULL,
    receta_id integer NOT NULL,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.favoritos OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 16603)
-- Name: favoritos_favorito_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.favoritos_favorito_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.favoritos_favorito_id_seq OWNER TO postgres;

--
-- TOC entry 5056 (class 0 OID 0)
-- Dependencies: 233
-- Name: favoritos_favorito_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.favoritos_favorito_id_seq OWNED BY public.favoritos.favorito_id;


--
-- TOC entry 222 (class 1259 OID 16471)
-- Name: ingredientes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ingredientes (
    ingrediente_id integer NOT NULL,
    nombre character varying(200) NOT NULL,
    descripcion text,
    unidad character varying(50),
    cantidad_base integer DEFAULT 100,
    calorias numeric(8,2) DEFAULT 0,
    proteinas numeric(8,2) DEFAULT 0,
    carbohidratos numeric(8,2) DEFAULT 0,
    grasas numeric(8,2) DEFAULT 0,
    fibra numeric(8,2) DEFAULT 0,
    azucares numeric(8,2) DEFAULT 0,
    sodio numeric(8,2) DEFAULT 0,
    vitaminas jsonb,
    minerales jsonb,
    categoria_id integer,
    imagen character varying(255),
    activo boolean DEFAULT true,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.ingredientes OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16470)
-- Name: ingredientes_ingrediente_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ingredientes_ingrediente_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ingredientes_ingrediente_id_seq OWNER TO postgres;

--
-- TOC entry 5057 (class 0 OID 0)
-- Dependencies: 221
-- Name: ingredientes_ingrediente_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ingredientes_ingrediente_id_seq OWNED BY public.ingredientes.ingrediente_id;


--
-- TOC entry 236 (class 1259 OID 16624)
-- Name: likes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.likes (
    like_id integer NOT NULL,
    usuario_id integer NOT NULL,
    receta_id integer NOT NULL,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.likes OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 16623)
-- Name: likes_like_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.likes_like_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.likes_like_id_seq OWNER TO postgres;

--
-- TOC entry 5058 (class 0 OID 0)
-- Dependencies: 235
-- Name: likes_like_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.likes_like_id_seq OWNED BY public.likes.like_id;


--
-- TOC entry 230 (class 1259 OID 16557)
-- Name: receta_etiquetas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.receta_etiquetas (
    receta_etiqueta_id integer NOT NULL,
    receta_id integer NOT NULL,
    etiqueta_id integer NOT NULL
);


ALTER TABLE public.receta_etiquetas OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 16556)
-- Name: receta_etiquetas_receta_etiqueta_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.receta_etiquetas_receta_etiqueta_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.receta_etiquetas_receta_etiqueta_id_seq OWNER TO postgres;

--
-- TOC entry 5059 (class 0 OID 0)
-- Dependencies: 229
-- Name: receta_etiquetas_receta_etiqueta_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.receta_etiquetas_receta_etiqueta_id_seq OWNED BY public.receta_etiquetas.receta_etiqueta_id;


--
-- TOC entry 228 (class 1259 OID 16536)
-- Name: receta_ingredientes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.receta_ingredientes (
    receta_ingrediente_id integer NOT NULL,
    receta_id integer NOT NULL,
    ingrediente_id integer NOT NULL,
    cantidad numeric(10,2) NOT NULL,
    unidad character varying(50),
    notas text
);


ALTER TABLE public.receta_ingredientes OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16535)
-- Name: receta_ingredientes_receta_ingrediente_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.receta_ingredientes_receta_ingrediente_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.receta_ingredientes_receta_ingrediente_id_seq OWNER TO postgres;

--
-- TOC entry 5060 (class 0 OID 0)
-- Dependencies: 227
-- Name: receta_ingredientes_receta_ingrediente_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.receta_ingredientes_receta_ingrediente_id_seq OWNED BY public.receta_ingredientes.receta_ingrediente_id;


--
-- TOC entry 226 (class 1259 OID 16510)
-- Name: recetas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.recetas (
    receta_id integer NOT NULL,
    usuario_id integer NOT NULL,
    titulo character varying(200) NOT NULL,
    descripcion text,
    instrucciones jsonb NOT NULL,
    tiempo_preparacion integer,
    porciones integer DEFAULT 1,
    dificultad character varying(20) DEFAULT 'fácil'::character varying,
    imagen_principal character varying(255),
    galeria_imagenes jsonb,
    video_url character varying(255),
    activa boolean DEFAULT true,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    total_calorias numeric(10,2) DEFAULT 0,
    total_proteinas numeric(10,2) DEFAULT 0,
    total_carbohidratos numeric(10,2) DEFAULT 0,
    total_grasas numeric(10,2) DEFAULT 0,
    total_fibra numeric(10,2) DEFAULT 0,
    calificacion_promedio numeric(3,2) DEFAULT 0,
    CONSTRAINT recetas_dificultad_check CHECK (((dificultad)::text = ANY ((ARRAY['fácil'::character varying, 'intermedio'::character varying, 'difícil'::character varying])::text[])))
);


ALTER TABLE public.recetas OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16509)
-- Name: recetas_receta_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.recetas_receta_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.recetas_receta_id_seq OWNER TO postgres;

--
-- TOC entry 5061 (class 0 OID 0)
-- Dependencies: 225
-- Name: recetas_receta_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.recetas_receta_id_seq OWNED BY public.recetas.receta_id;


--
-- TOC entry 220 (class 1259 OID 16456)
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    usuario_id integer NOT NULL,
    nombre character varying(150) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    rol character varying(20) DEFAULT 'user'::character varying,
    activo boolean DEFAULT true,
    avatar text,
    fecha_registro timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT usuarios_rol_check CHECK (((rol)::text = ANY ((ARRAY['user'::character varying, 'admin'::character varying])::text[])))
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16455)
-- Name: usuarios_usuario_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_usuario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_usuario_id_seq OWNER TO postgres;

--
-- TOC entry 5062 (class 0 OID 0)
-- Dependencies: 219
-- Name: usuarios_usuario_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_usuario_id_seq OWNED BY public.usuarios.usuario_id;


--
-- TOC entry 4787 (class 2604 OID 16445)
-- Name: categorias categoria_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categorias ALTER COLUMN categoria_id SET DEFAULT nextval('public.categorias_categoria_id_seq'::regclass);


--
-- TOC entry 4825 (class 2604 OID 16579)
-- Name: comentarios comentario_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comentarios ALTER COLUMN comentario_id SET DEFAULT nextval('public.comentarios_comentario_id_seq'::regclass);


--
-- TOC entry 4807 (class 2604 OID 16499)
-- Name: etiquetas etiqueta_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.etiquetas ALTER COLUMN etiqueta_id SET DEFAULT nextval('public.etiquetas_etiqueta_id_seq'::regclass);


--
-- TOC entry 4829 (class 2604 OID 16607)
-- Name: favoritos favorito_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favoritos ALTER COLUMN favorito_id SET DEFAULT nextval('public.favoritos_favorito_id_seq'::regclass);


--
-- TOC entry 4795 (class 2604 OID 16474)
-- Name: ingredientes ingrediente_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingredientes ALTER COLUMN ingrediente_id SET DEFAULT nextval('public.ingredientes_ingrediente_id_seq'::regclass);


--
-- TOC entry 4831 (class 2604 OID 16627)
-- Name: likes like_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.likes ALTER COLUMN like_id SET DEFAULT nextval('public.likes_like_id_seq'::regclass);


--
-- TOC entry 4824 (class 2604 OID 16560)
-- Name: receta_etiquetas receta_etiqueta_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.receta_etiquetas ALTER COLUMN receta_etiqueta_id SET DEFAULT nextval('public.receta_etiquetas_receta_etiqueta_id_seq'::regclass);


--
-- TOC entry 4823 (class 2604 OID 16539)
-- Name: receta_ingredientes receta_ingrediente_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.receta_ingredientes ALTER COLUMN receta_ingrediente_id SET DEFAULT nextval('public.receta_ingredientes_receta_ingrediente_id_seq'::regclass);


--
-- TOC entry 4811 (class 2604 OID 16513)
-- Name: recetas receta_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recetas ALTER COLUMN receta_id SET DEFAULT nextval('public.recetas_receta_id_seq'::regclass);


--
-- TOC entry 4791 (class 2604 OID 16459)
-- Name: usuarios usuario_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN usuario_id SET DEFAULT nextval('public.usuarios_usuario_id_seq'::regclass);


--
-- TOC entry 5029 (class 0 OID 16442)
-- Dependencies: 218
-- Data for Name: categorias; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categorias (categoria_id, nombre, descripcion, icono, activa, fecha_creacion, fecha_actualizacion) FROM stdin;
\.


--
-- TOC entry 5043 (class 0 OID 16576)
-- Dependencies: 232
-- Data for Name: comentarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comentarios (comentario_id, receta_id, usuario_id, contenido, calificacion, activo, fecha_creacion, fecha_actualizacion, padre_comentario_id) FROM stdin;
\.


--
-- TOC entry 5035 (class 0 OID 16496)
-- Dependencies: 224
-- Data for Name: etiquetas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.etiquetas (etiqueta_id, nombre, color, descripcion, activa, fecha_creacion) FROM stdin;
\.


--
-- TOC entry 5045 (class 0 OID 16604)
-- Dependencies: 234
-- Data for Name: favoritos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.favoritos (favorito_id, usuario_id, receta_id, fecha_creacion) FROM stdin;
\.


--
-- TOC entry 5033 (class 0 OID 16471)
-- Dependencies: 222
-- Data for Name: ingredientes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ingredientes (ingrediente_id, nombre, descripcion, unidad, cantidad_base, calorias, proteinas, carbohidratos, grasas, fibra, azucares, sodio, vitaminas, minerales, categoria_id, imagen, activo, fecha_creacion, fecha_actualizacion) FROM stdin;
\.


--
-- TOC entry 5047 (class 0 OID 16624)
-- Dependencies: 236
-- Data for Name: likes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.likes (like_id, usuario_id, receta_id, fecha_creacion) FROM stdin;
\.


--
-- TOC entry 5041 (class 0 OID 16557)
-- Dependencies: 230
-- Data for Name: receta_etiquetas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.receta_etiquetas (receta_etiqueta_id, receta_id, etiqueta_id) FROM stdin;
\.


--
-- TOC entry 5039 (class 0 OID 16536)
-- Dependencies: 228
-- Data for Name: receta_ingredientes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.receta_ingredientes (receta_ingrediente_id, receta_id, ingrediente_id, cantidad, unidad, notas) FROM stdin;
\.


--
-- TOC entry 5037 (class 0 OID 16510)
-- Dependencies: 226
-- Data for Name: recetas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.recetas (receta_id, usuario_id, titulo, descripcion, instrucciones, tiempo_preparacion, porciones, dificultad, imagen_principal, galeria_imagenes, video_url, activa, fecha_creacion, fecha_actualizacion, total_calorias, total_proteinas, total_carbohidratos, total_grasas, total_fibra, calificacion_promedio) FROM stdin;
\.


--
-- TOC entry 5031 (class 0 OID 16456)
-- Dependencies: 220
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (usuario_id, nombre, email, password, rol, activo, avatar, fecha_registro) FROM stdin;
\.


--
-- TOC entry 5063 (class 0 OID 0)
-- Dependencies: 217
-- Name: categorias_categoria_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categorias_categoria_id_seq', 1, false);


--
-- TOC entry 5064 (class 0 OID 0)
-- Dependencies: 231
-- Name: comentarios_comentario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comentarios_comentario_id_seq', 1, false);


--
-- TOC entry 5065 (class 0 OID 0)
-- Dependencies: 223
-- Name: etiquetas_etiqueta_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.etiquetas_etiqueta_id_seq', 1, false);


--
-- TOC entry 5066 (class 0 OID 0)
-- Dependencies: 233
-- Name: favoritos_favorito_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.favoritos_favorito_id_seq', 1, false);


--
-- TOC entry 5067 (class 0 OID 0)
-- Dependencies: 221
-- Name: ingredientes_ingrediente_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ingredientes_ingrediente_id_seq', 1, false);


--
-- TOC entry 5068 (class 0 OID 0)
-- Dependencies: 235
-- Name: likes_like_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.likes_like_id_seq', 1, false);


--
-- TOC entry 5069 (class 0 OID 0)
-- Dependencies: 229
-- Name: receta_etiquetas_receta_etiqueta_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.receta_etiquetas_receta_etiqueta_id_seq', 1, false);


--
-- TOC entry 5070 (class 0 OID 0)
-- Dependencies: 227
-- Name: receta_ingredientes_receta_ingrediente_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.receta_ingredientes_receta_ingrediente_id_seq', 1, false);


--
-- TOC entry 5071 (class 0 OID 0)
-- Dependencies: 225
-- Name: recetas_receta_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.recetas_receta_id_seq', 1, false);


--
-- TOC entry 5072 (class 0 OID 0)
-- Dependencies: 219
-- Name: usuarios_usuario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_usuario_id_seq', 1, false);


--
-- TOC entry 4837 (class 2606 OID 16454)
-- Name: categorias categorias_nombre_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categorias
    ADD CONSTRAINT categorias_nombre_key UNIQUE (nombre);


--
-- TOC entry 4839 (class 2606 OID 16452)
-- Name: categorias categorias_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categorias
    ADD CONSTRAINT categorias_pkey PRIMARY KEY (categoria_id);


--
-- TOC entry 4861 (class 2606 OID 16587)
-- Name: comentarios comentarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comentarios
    ADD CONSTRAINT comentarios_pkey PRIMARY KEY (comentario_id);


--
-- TOC entry 4847 (class 2606 OID 16508)
-- Name: etiquetas etiquetas_nombre_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.etiquetas
    ADD CONSTRAINT etiquetas_nombre_key UNIQUE (nombre);


--
-- TOC entry 4849 (class 2606 OID 16506)
-- Name: etiquetas etiquetas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.etiquetas
    ADD CONSTRAINT etiquetas_pkey PRIMARY KEY (etiqueta_id);


--
-- TOC entry 4863 (class 2606 OID 16610)
-- Name: favoritos favoritos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favoritos
    ADD CONSTRAINT favoritos_pkey PRIMARY KEY (favorito_id);


--
-- TOC entry 4865 (class 2606 OID 16612)
-- Name: favoritos favoritos_usuario_id_receta_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favoritos
    ADD CONSTRAINT favoritos_usuario_id_receta_id_key UNIQUE (usuario_id, receta_id);


--
-- TOC entry 4845 (class 2606 OID 16489)
-- Name: ingredientes ingredientes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingredientes
    ADD CONSTRAINT ingredientes_pkey PRIMARY KEY (ingrediente_id);


--
-- TOC entry 4867 (class 2606 OID 16630)
-- Name: likes likes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_pkey PRIMARY KEY (like_id);


--
-- TOC entry 4869 (class 2606 OID 16632)
-- Name: likes likes_usuario_id_receta_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_usuario_id_receta_id_key UNIQUE (usuario_id, receta_id);


--
-- TOC entry 4857 (class 2606 OID 16562)
-- Name: receta_etiquetas receta_etiquetas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.receta_etiquetas
    ADD CONSTRAINT receta_etiquetas_pkey PRIMARY KEY (receta_etiqueta_id);


--
-- TOC entry 4859 (class 2606 OID 16564)
-- Name: receta_etiquetas receta_etiquetas_receta_id_etiqueta_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.receta_etiquetas
    ADD CONSTRAINT receta_etiquetas_receta_id_etiqueta_id_key UNIQUE (receta_id, etiqueta_id);


--
-- TOC entry 4853 (class 2606 OID 16543)
-- Name: receta_ingredientes receta_ingredientes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.receta_ingredientes
    ADD CONSTRAINT receta_ingredientes_pkey PRIMARY KEY (receta_ingrediente_id);


--
-- TOC entry 4855 (class 2606 OID 16545)
-- Name: receta_ingredientes receta_ingredientes_receta_id_ingrediente_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.receta_ingredientes
    ADD CONSTRAINT receta_ingredientes_receta_id_ingrediente_id_key UNIQUE (receta_id, ingrediente_id);


--
-- TOC entry 4851 (class 2606 OID 16529)
-- Name: recetas recetas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recetas
    ADD CONSTRAINT recetas_pkey PRIMARY KEY (receta_id);


--
-- TOC entry 4841 (class 2606 OID 16469)
-- Name: usuarios usuarios_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_email_key UNIQUE (email);


--
-- TOC entry 4843 (class 2606 OID 16467)
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (usuario_id);


--
-- TOC entry 4876 (class 2606 OID 16598)
-- Name: comentarios comentarios_padre_comentario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comentarios
    ADD CONSTRAINT comentarios_padre_comentario_id_fkey FOREIGN KEY (padre_comentario_id) REFERENCES public.comentarios(comentario_id) ON DELETE CASCADE;


--
-- TOC entry 4877 (class 2606 OID 16588)
-- Name: comentarios comentarios_receta_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comentarios
    ADD CONSTRAINT comentarios_receta_id_fkey FOREIGN KEY (receta_id) REFERENCES public.recetas(receta_id) ON DELETE CASCADE;


--
-- TOC entry 4878 (class 2606 OID 16593)
-- Name: comentarios comentarios_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comentarios
    ADD CONSTRAINT comentarios_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(usuario_id) ON DELETE CASCADE;


--
-- TOC entry 4879 (class 2606 OID 16618)
-- Name: favoritos favoritos_receta_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favoritos
    ADD CONSTRAINT favoritos_receta_id_fkey FOREIGN KEY (receta_id) REFERENCES public.recetas(receta_id) ON DELETE CASCADE;


--
-- TOC entry 4880 (class 2606 OID 16613)
-- Name: favoritos favoritos_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favoritos
    ADD CONSTRAINT favoritos_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(usuario_id) ON DELETE CASCADE;


--
-- TOC entry 4870 (class 2606 OID 16490)
-- Name: ingredientes ingredientes_categoria_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingredientes
    ADD CONSTRAINT ingredientes_categoria_id_fkey FOREIGN KEY (categoria_id) REFERENCES public.categorias(categoria_id) ON DELETE SET NULL;


--
-- TOC entry 4881 (class 2606 OID 16638)
-- Name: likes likes_receta_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_receta_id_fkey FOREIGN KEY (receta_id) REFERENCES public.recetas(receta_id) ON DELETE CASCADE;


--
-- TOC entry 4882 (class 2606 OID 16633)
-- Name: likes likes_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(usuario_id) ON DELETE CASCADE;


--
-- TOC entry 4874 (class 2606 OID 16570)
-- Name: receta_etiquetas receta_etiquetas_etiqueta_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.receta_etiquetas
    ADD CONSTRAINT receta_etiquetas_etiqueta_id_fkey FOREIGN KEY (etiqueta_id) REFERENCES public.etiquetas(etiqueta_id) ON DELETE CASCADE;


--
-- TOC entry 4875 (class 2606 OID 16565)
-- Name: receta_etiquetas receta_etiquetas_receta_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.receta_etiquetas
    ADD CONSTRAINT receta_etiquetas_receta_id_fkey FOREIGN KEY (receta_id) REFERENCES public.recetas(receta_id) ON DELETE CASCADE;


--
-- TOC entry 4872 (class 2606 OID 16551)
-- Name: receta_ingredientes receta_ingredientes_ingrediente_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.receta_ingredientes
    ADD CONSTRAINT receta_ingredientes_ingrediente_id_fkey FOREIGN KEY (ingrediente_id) REFERENCES public.ingredientes(ingrediente_id) ON DELETE CASCADE;


--
-- TOC entry 4873 (class 2606 OID 16546)
-- Name: receta_ingredientes receta_ingredientes_receta_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.receta_ingredientes
    ADD CONSTRAINT receta_ingredientes_receta_id_fkey FOREIGN KEY (receta_id) REFERENCES public.recetas(receta_id) ON DELETE CASCADE;


--
-- TOC entry 4871 (class 2606 OID 16530)
-- Name: recetas recetas_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recetas
    ADD CONSTRAINT recetas_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(usuario_id) ON DELETE CASCADE;


-- Completed on 2025-11-02 22:22:44

--
-- PostgreSQL database dump complete
--

