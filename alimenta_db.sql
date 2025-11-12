--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

-- Started on 2025-11-11 22:24:10

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
-- TOC entry 226 (class 1259 OID 16442)
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
-- TOC entry 225 (class 1259 OID 16441)
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
-- TOC entry 5061 (class 0 OID 0)
-- Dependencies: 225
-- Name: categorias_categoria_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categorias_categoria_id_seq OWNED BY public.categorias.categoria_id;


--
-- TOC entry 240 (class 1259 OID 16576)
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
-- TOC entry 239 (class 1259 OID 16575)
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
-- TOC entry 5062 (class 0 OID 0)
-- Dependencies: 239
-- Name: comentarios_comentario_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comentarios_comentario_id_seq OWNED BY public.comentarios.comentario_id;


--
-- TOC entry 232 (class 1259 OID 16496)
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
-- TOC entry 231 (class 1259 OID 16495)
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
-- TOC entry 5063 (class 0 OID 0)
-- Dependencies: 231
-- Name: etiquetas_etiqueta_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.etiquetas_etiqueta_id_seq OWNED BY public.etiquetas.etiqueta_id;


--
-- TOC entry 242 (class 1259 OID 16604)
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
-- TOC entry 241 (class 1259 OID 16603)
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
-- TOC entry 5064 (class 0 OID 0)
-- Dependencies: 241
-- Name: favoritos_favorito_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.favoritos_favorito_id_seq OWNED BY public.favoritos.favorito_id;


--
-- TOC entry 230 (class 1259 OID 16471)
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
-- TOC entry 229 (class 1259 OID 16470)
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
-- TOC entry 5065 (class 0 OID 0)
-- Dependencies: 229
-- Name: ingredientes_ingrediente_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ingredientes_ingrediente_id_seq OWNED BY public.ingredientes.ingrediente_id;


--
-- TOC entry 244 (class 1259 OID 16624)
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
-- TOC entry 243 (class 1259 OID 16623)
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
-- TOC entry 5066 (class 0 OID 0)
-- Dependencies: 243
-- Name: likes_like_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.likes_like_id_seq OWNED BY public.likes.like_id;


--
-- TOC entry 238 (class 1259 OID 16557)
-- Name: receta_etiquetas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.receta_etiquetas (
    receta_etiqueta_id integer NOT NULL,
    receta_id integer NOT NULL,
    etiqueta_id integer NOT NULL
);


ALTER TABLE public.receta_etiquetas OWNER TO postgres;

--
-- TOC entry 237 (class 1259 OID 16556)
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
-- TOC entry 5067 (class 0 OID 0)
-- Dependencies: 237
-- Name: receta_etiquetas_receta_etiqueta_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.receta_etiquetas_receta_etiqueta_id_seq OWNED BY public.receta_etiquetas.receta_etiqueta_id;


--
-- TOC entry 236 (class 1259 OID 16536)
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
-- TOC entry 235 (class 1259 OID 16535)
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
-- TOC entry 5068 (class 0 OID 0)
-- Dependencies: 235
-- Name: receta_ingredientes_receta_ingrediente_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.receta_ingredientes_receta_ingrediente_id_seq OWNED BY public.receta_ingredientes.receta_ingrediente_id;


--
-- TOC entry 234 (class 1259 OID 16510)
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
-- TOC entry 233 (class 1259 OID 16509)
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
-- TOC entry 5069 (class 0 OID 0)
-- Dependencies: 233
-- Name: recetas_receta_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.recetas_receta_id_seq OWNED BY public.recetas.receta_id;


--
-- TOC entry 228 (class 1259 OID 16456)
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
-- TOC entry 227 (class 1259 OID 16455)
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
-- TOC entry 5070 (class 0 OID 0)
-- Dependencies: 227
-- Name: usuarios_usuario_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_usuario_id_seq OWNED BY public.usuarios.usuario_id;


--
-- TOC entry 4795 (class 2604 OID 16445)
-- Name: categorias categoria_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categorias ALTER COLUMN categoria_id SET DEFAULT nextval('public.categorias_categoria_id_seq'::regclass);


--
-- TOC entry 4833 (class 2604 OID 16579)
-- Name: comentarios comentario_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comentarios ALTER COLUMN comentario_id SET DEFAULT nextval('public.comentarios_comentario_id_seq'::regclass);


--
-- TOC entry 4815 (class 2604 OID 16499)
-- Name: etiquetas etiqueta_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.etiquetas ALTER COLUMN etiqueta_id SET DEFAULT nextval('public.etiquetas_etiqueta_id_seq'::regclass);


--
-- TOC entry 4837 (class 2604 OID 16607)
-- Name: favoritos favorito_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favoritos ALTER COLUMN favorito_id SET DEFAULT nextval('public.favoritos_favorito_id_seq'::regclass);


--
-- TOC entry 4803 (class 2604 OID 16474)
-- Name: ingredientes ingrediente_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingredientes ALTER COLUMN ingrediente_id SET DEFAULT nextval('public.ingredientes_ingrediente_id_seq'::regclass);


--
-- TOC entry 4839 (class 2604 OID 16627)
-- Name: likes like_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.likes ALTER COLUMN like_id SET DEFAULT nextval('public.likes_like_id_seq'::regclass);


--
-- TOC entry 4832 (class 2604 OID 16560)
-- Name: receta_etiquetas receta_etiqueta_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.receta_etiquetas ALTER COLUMN receta_etiqueta_id SET DEFAULT nextval('public.receta_etiquetas_receta_etiqueta_id_seq'::regclass);


--
-- TOC entry 4831 (class 2604 OID 16539)
-- Name: receta_ingredientes receta_ingrediente_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.receta_ingredientes ALTER COLUMN receta_ingrediente_id SET DEFAULT nextval('public.receta_ingredientes_receta_ingrediente_id_seq'::regclass);


--
-- TOC entry 4819 (class 2604 OID 16513)
-- Name: recetas receta_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recetas ALTER COLUMN receta_id SET DEFAULT nextval('public.recetas_receta_id_seq'::regclass);


--
-- TOC entry 4799 (class 2604 OID 16459)
-- Name: usuarios usuario_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN usuario_id SET DEFAULT nextval('public.usuarios_usuario_id_seq'::regclass);


--
-- TOC entry 5037 (class 0 OID 16442)
-- Dependencies: 226
-- Data for Name: categorias; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categorias (categoria_id, nombre, descripcion, icono, activa, fecha_creacion, fecha_actualizacion) FROM stdin;
1	Frutas	Ingredientes naturales ricos en vitaminas, ideales para postres y jugos.	🍎	t	2025-11-03 21:24:24.198057	2025-11-03 21:24:24.198057
2	Verduras	Hortalizas frescas con alto contenido de fibra y minerales.	🥦	t	2025-11-03 21:24:24.198057	2025-11-03 21:24:24.198057
3	Cereales	Fuentes de energía como arroz, avena, y quinua.	🌾	t	2025-11-03 21:24:24.198057	2025-11-03 21:24:24.198057
4	Proteínas	Alimentos con alto valor proteico: carnes, legumbres y huevos.	🍗	t	2025-11-03 21:24:24.198057	2025-11-03 21:24:24.198057
5	Lácteos	Productos derivados de la leche: queso, yogurt, mantequilla.	🧀	t	2025-11-03 21:24:24.198057	2025-11-03 21:24:24.198057
6	Grasas saludables	Aceites y semillas con grasas buenas para el corazón.	🥑	t	2025-11-03 21:24:24.198057	2025-11-03 21:24:24.198057
7	Especias y condimentos	Hierbas y especias que aportan sabor y aroma.	🧂	t	2025-11-03 21:24:24.198057	2025-11-03 21:24:24.198057
8	Frutos secos y semillas	Almendras, nueces, chía y linaza, ricos en grasas saludables.	🥜	t	2025-11-03 21:24:24.198057	2025-11-03 21:24:24.198057
9	Bebidas	Jugos naturales, infusiones y bebidas sin azúcares añadidos.	🥤	t	2025-11-03 21:24:24.198057	2025-11-03 21:24:24.198057
10	Dulces y postres	Chocolate, miel, mermeladas y postres elaborados.	🍫	t	2025-11-03 21:24:24.198057	2025-11-03 21:24:24.198057
11	Panadería y pastelería	Pan, galletas, pasteles y repostería en general.	🥖	t	2025-11-03 21:24:24.198057	2025-11-03 21:24:24.198057
12	Mariscos y pescados	Pescado fresco, mariscos y frutos del mar.	🐟	t	2025-11-03 21:24:24.198057	2025-11-03 21:24:24.198057
13	Bebidas alcohólicas	Vino, cerveza y licores.	🍷	t	2025-11-03 21:24:24.198057	2025-11-03 21:24:24.198057
14	Snacks saludables	Galletas integrales, barritas energéticas y chips naturales.	🍿	t	2025-11-03 21:24:24.198057	2025-11-03 21:24:24.198057
\.


--
-- TOC entry 5051 (class 0 OID 16576)
-- Dependencies: 240
-- Data for Name: comentarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comentarios (comentario_id, receta_id, usuario_id, contenido, calificacion, activo, fecha_creacion, fecha_actualizacion, padre_comentario_id) FROM stdin;
\.


--
-- TOC entry 5043 (class 0 OID 16496)
-- Dependencies: 232
-- Data for Name: etiquetas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.etiquetas (etiqueta_id, nombre, color, descripcion, activa, fecha_creacion) FROM stdin;
13	Pollo	#6B7280	\N	t	2025-11-11 20:15:42.333
14	Sano	#6B7280	\N	t	2025-11-11 20:15:42.35
15	Fit	#6B7280	\N	t	2025-11-11 20:15:42.355
16	Proteína	#6B7280	\N	t	2025-11-11 20:15:42.362
\.


--
-- TOC entry 5053 (class 0 OID 16604)
-- Dependencies: 242
-- Data for Name: favoritos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.favoritos (favorito_id, usuario_id, receta_id, fecha_creacion) FROM stdin;
\.


--
-- TOC entry 5041 (class 0 OID 16471)
-- Dependencies: 230
-- Data for Name: ingredientes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ingredientes (ingrediente_id, nombre, descripcion, unidad, cantidad_base, calorias, proteinas, carbohidratos, grasas, fibra, azucares, sodio, vitaminas, minerales, categoria_id, imagen, activo, fecha_creacion, fecha_actualizacion) FROM stdin;
1	Manzana roja	Fruta dulce y jugosa, rica en fibra y vitamina C.	g	100	52.00	0.30	14.00	0.20	2.40	10.00	1.00	{"vitamina_a": "54IU", "vitamina_c": "4.6mg"}	{"hierro": "0.1mg", "potasio": "107mg"}	1	https://res.cloudinary.com/dujumgran/image/upload/v1762909247/imagen_2025-11-11_200045804_nmmora.png	t	2025-11-03 21:24:40.837904	2025-11-03 21:24:40.837904
2	Espinaca fresca	Verdura de hojas verdes con alto contenido de hierro y antioxidantes.	g	100	23.00	2.90	3.60	0.40	2.20	0.40	79.00	{"vitamina_a": "469µg", "vitamina_c": "28mg"}	{"calcio": "99mg", "hierro": "2.7mg"}	2	https://res.cloudinary.com/dujumgran/image/upload/v1762909744/espinaca_fresca_th5aez.jpg	t	2025-11-03 21:24:40.837904	2025-11-03 21:24:40.837904
3	Pechuga de pollo	Fuente magra de proteína animal, ideal para dietas fitness.	g	100	165.00	31.00	0.00	3.60	0.00	0.00	74.00	{"vitamina_b6": "0.6mg"}	{"fosforo": "210mg", "selenio": "27µg"}	4	https://res.cloudinary.com/dujumgran/image/upload/v1762909744/pechuga_de_pollo_wnu1kj.jpg	t	2025-11-03 21:24:40.837904	2025-11-03 21:24:40.837904
4	Avena en hojuelas	Cereal integral con alto contenido de fibra soluble y carbohidratos complejos.	g	100	389.00	16.90	66.30	6.90	10.60	0.00	2.00	{"vitamina_b1": "0.76mg"}	{"hierro": "4.7mg", "magnesio": "177mg"}	3	https://res.cloudinary.com/dujumgran/image/upload/v1762909744/avena_en_hojuelas_n8gzo5.jpg	t	2025-11-03 21:24:40.837904	2025-11-03 21:24:40.837904
5	Aceite de oliva virgen	Grasa saludable con alto contenido de ácidos grasos monoinsaturados.	ml	100	884.00	0.00	0.00	100.00	0.00	0.00	2.00	{"vitamina_e": "14mg"}	{"hierro": "0.6mg"}	6	https://res.cloudinary.com/dujumgran/image/upload/v1762909743/aceite_de_oliva_virgen_cidd2u.webp	t	2025-11-03 21:24:40.837904	2025-11-03 21:24:40.837904
6	Plátano maduro	Fruta tropical rica en potasio y energía natural.	g	100	89.00	1.10	22.80	0.30	2.60	12.20	1.00	{"vitamina_c": "8.7mg", "vitamina_b6": "0.4mg"}	{"potasio": "358mg", "magnesio": "27mg"}	1	https://res.cloudinary.com/dujumgran/image/upload/v1762912403/ingredientes/w9s0qqub9gujdqg0nsww.jpg	t	2025-11-12 01:53:25.398	2025-11-12 01:53:25.398
7	Fresa fresca	Fruta roja dulce con alto contenido de vitamina C.	g	100	32.00	0.70	7.70	0.30	2.00	4.90	1.00	{"folato": "24mcg", "vitamina_c": "58.8mg"}	{"potasio": "153mg", "manganeso": "0.4mg"}	1	https://res.cloudinary.com/dujumgran/image/upload/v1762912404/ingredientes/fb6wweyjoltvwylnsrqe.jpg	t	2025-11-12 01:53:26.275	2025-11-12 01:53:26.275
8	Naranja	Cítrico refrescante rico en vitamina C y fibra.	g	100	47.00	0.90	11.80	0.10	2.40	9.40	0.00	{"vitamina_a": "225IU", "vitamina_c": "53.2mg"}	{"calcio": "40mg", "potasio": "181mg"}	1	https://res.cloudinary.com/dujumgran/image/upload/v1762912404/ingredientes/g2hmpigndkssq7xhlj8n.jpg	t	2025-11-12 01:53:27.219	2025-11-12 01:53:27.219
9	Mango	Fruta tropical jugosa con sabor dulce y exótico.	g	100	60.00	0.80	15.00	0.40	1.60	13.70	1.00	{"vitamina_a": "1082IU", "vitamina_c": "36.4mg"}	{"potasio": "168mg", "magnesio": "10mg"}	1	https://res.cloudinary.com/dujumgran/image/upload/v1762912405/ingredientes/lj7birqpk1eix0vfy0lg.png	t	2025-11-12 01:53:29.396	2025-11-12 01:53:29.396
10	Piña	Fruta tropical con bromelina y sabor ácido-dulce.	g	100	50.00	0.50	13.10	0.10	1.40	9.90	1.00	{"vitamina_c": "47.8mg", "vitamina_b1": "0.1mg"}	{"potasio": "109mg", "manganeso": "0.9mg"}	1	https://res.cloudinary.com/dujumgran/image/upload/v1762912588/ingredientes/vg1ax8ximubaxor4zo5p.jpg	t	2025-11-12 01:56:30.36	2025-11-12 01:56:30.36
11	Brócoli	Vegetal verde crucífero rico en vitamina C y K.	g	100	34.00	2.80	6.60	0.40	2.60	1.70	33.00	{"vitamina_c": "89.2mg", "vitamina_k": "101.6mcg"}	{"calcio": "47mg", "hierro": "0.7mg"}	2	https://res.cloudinary.com/dujumgran/image/upload/v1762913557/ingredientes/fegvfe71ibv35rlb0k3r.jpg	t	2025-11-12 02:12:39.509	2025-11-12 02:12:39.509
12	Zanahoria	Raíz naranja crujiente rica en beta-caroteno.	g	100	41.00	0.90	9.60	0.20	2.80	4.70	69.00	{"vitamina_a": "16706IU", "vitamina_k": "13.2mcg"}	{"calcio": "33mg", "potasio": "320mg"}	2	https://res.cloudinary.com/dujumgran/image/upload/v1762913558/ingredientes/vsfexlxzon3hmqycc9u4.jpg	t	2025-11-12 02:12:40.766	2025-11-12 02:12:40.766
13	Tomate	Fruto rojo jugoso rico en licopeno y antioxidantes.	g	100	18.00	0.90	3.90	0.20	1.20	2.60	5.00	{"vitamina_a": "833IU", "vitamina_c": "13.7mg"}	{"potasio": "237mg", "fósforo": "24mg"}	2	https://res.cloudinary.com/dujumgran/image/upload/v1762913560/ingredientes/d2oewh6gt7iydjuatbjb.png	t	2025-11-12 02:12:42.647	2025-11-12 02:12:42.647
14	Lechuga romana	Hoja verde crujiente ideal para ensaladas frescas.	g	100	17.00	1.20	3.30	0.30	2.10	1.20	8.00	{"vitamina_a": "8710IU", "vitamina_k": "102.5mcg"}	{"calcio": "33mg", "hierro": "1mg"}	2	https://res.cloudinary.com/dujumgran/image/upload/v1762913561/ingredientes/jgbcqyftzgwjh6rj5xkb.jpg	t	2025-11-12 02:12:45.186	2025-11-12 02:12:45.186
15	Pepino	Vegetal verde refrescante con alto contenido de agua.	g	100	15.00	0.70	3.60	0.10	0.50	1.70	2.00	{"vitamina_c": "2.8mg", "vitamina_k": "16.4mcg"}	{"potasio": "147mg", "magnesio": "13mg"}	2	https://res.cloudinary.com/dujumgran/image/upload/v1762913563/ingredientes/r0kwvqwpjlp98j6jep95.jpg	t	2025-11-12 02:12:45.824	2025-11-12 02:12:45.824
16	Arroz integral	Grano entero nutritivo con fibra y minerales.	g	100	370.00	7.90	77.20	2.90	3.50	0.90	7.00	{"vitamina_b1": "0.4mg", "vitamina_b6": "0.5mg"}	{"magnesio": "143mg", "manganeso": "3.7mg"}	3	https://res.cloudinary.com/dujumgran/image/upload/v1762913869/ingredientes/wtlqjzc75m3mlgo3izof.jpg	t	2025-11-12 02:17:52.17	2025-11-12 02:17:52.17
17	Quinoa	Pseudocereal andino con proteína completa.	g	100	368.00	14.10	64.20	6.10	7.00	0.00	5.00	{"folato": "184mcg", "vitamina_b2": "0.3mg"}	{"magnesio": "197mg", "manganeso": "2mg"}	3	https://res.cloudinary.com/dujumgran/image/upload/v1762913871/ingredientes/rygdwced5oduvzoadr6o.jpg	t	2025-11-12 02:17:53.442	2025-11-12 02:17:53.442
18	Pasta integral	Pasta de trigo entero con más fibra que la regular.	g	100	348.00	13.40	72.20	2.50	9.20	2.70	13.00	{"vitamina_b1": "0.4mg", "vitamina_b3": "5mg"}	{"fósforo": "258mg", "manganeso": "3.1mg"}	3	https://res.cloudinary.com/dujumgran/image/upload/v1762913872/ingredientes/wr16vtye4khvuf0tupgg.jpg	t	2025-11-12 02:17:54.395	2025-11-12 02:17:54.395
19	Pan de centeno	Pan oscuro denso con sabor característico.	g	100	259.00	8.50	48.30	3.30	5.80	3.90	603.00	{"folato": "70mcg", "vitamina_b1": "0.4mg"}	{"hierro": "2.8mg", "magnesio": "40mg"}	3	https://res.cloudinary.com/dujumgran/image/upload/v1762913872/ingredientes/qasadzpxylreiusjvbng.jpg	t	2025-11-12 02:17:55.287	2025-11-12 02:17:55.287
20	Cebada perlada	Grano versátil con textura masticable y nutritiva.	g	100	352.00	9.90	77.70	1.20	15.60	0.80	9.00	{"folato": "23mcg", "vitamina_b3": "4.6mg"}	{"selenio": "37.7mcg", "manganeso": "1.9mg"}	3	https://res.cloudinary.com/dujumgran/image/upload/v1762913873/ingredientes/cngcwsxnltuvfaaaaxvb.jpg	t	2025-11-12 02:17:56.224	2025-11-12 02:17:56.224
21	Carne de res magra	Carne roja con alto contenido proteico y hierro hemo.	g	100	250.00	26.00	0.00	15.00	0.00	0.00	72.00	{"vitamina_b6": "0.5mg", "vitamina_b12": "2.6mcg"}	{"zinc": "6.3mg", "hierro": "2.6mg"}	4	https://res.cloudinary.com/dujumgran/image/upload/v1762914089/ingredientes/kmp7ijz03ms8vkcridlo.jpg	t	2025-11-12 02:21:31.94	2025-11-12 02:21:31.94
22	Huevo entero	Alimento completo con proteína de alto valor biológico.	g	100	155.00	13.00	1.10	11.00	0.00	1.10	124.00	{"vitamina_d": "2mcg", "vitamina_b12": "0.9mcg"}	{"selenio": "30.7mcg", "fósforo": "198mg"}	4	https://res.cloudinary.com/dujumgran/image/upload/v1762914090/ingredientes/mx6yyyogytiinba26z4q.png	t	2025-11-12 02:21:32.69	2025-11-12 02:21:32.69
23	Pavo molido	Carne blanca magra baja en grasa y alta en proteína.	g	100	189.00	20.40	0.00	11.20	0.00	0.00	67.00	{"vitamina_b3": "6.4mg", "vitamina_b6": "0.5mg"}	{"zinc": "2.4mg", "selenio": "27.5mcg"}	4	https://res.cloudinary.com/dujumgran/image/upload/v1762914091/ingredientes/yoq07gelzjzust3atpov.jpg	t	2025-11-12 02:21:33.621	2025-11-12 02:21:33.621
24	Lentejas	Legumbre rica en proteína vegetal, hierro y fibra.	g	100	116.00	9.00	20.10	0.40	7.90	1.80	2.00	{"folato": "181mcg", "vitamina_b1": "0.2mg"}	{"hierro": "3.3mg", "magnesio": "36mg"}	4	https://res.cloudinary.com/dujumgran/image/upload/v1762914092/ingredientes/bxt2lpr2epu6uinhzjsw.png	t	2025-11-12 02:21:34.857	2025-11-12 02:21:34.857
25	Garbanzos	Legumbre versátil con proteína y carbohidratos complejos.	g	100	164.00	8.90	27.40	2.60	7.60	4.80	7.00	{"folato": "172mcg", "vitamina_b6": "0.1mg"}	{"fósforo": "168mg", "manganeso": "1mg"}	4	https://res.cloudinary.com/dujumgran/image/upload/v1762914093/ingredientes/gsbpgggkoewlhgzux06h.jpg	t	2025-11-12 02:21:35.814	2025-11-12 02:21:35.814
26	Yogur griego natural	Yogur cremoso con alto contenido de proteína.	g	100	97.00	10.20	3.60	4.80	0.00	3.60	36.00	{"vitamina_b2": "0.2mg", "vitamina_b12": "0.8mcg"}	{"calcio": "110mg", "fósforo": "135mg"}	5	https://res.cloudinary.com/dujumgran/image/upload/v1762914335/ingredientes/gsasthkd6yoo4rfrdebc.jpg	t	2025-11-12 02:25:38.169	2025-11-12 02:25:38.169
27	Queso mozzarella	Queso suave italiano bajo en calorías y versátil.	g	100	280.00	28.00	3.10	17.00	0.00	1.20	373.00	{"vitamina_a": "676IU", "vitamina_b12": "2.3mcg"}	{"calcio": "505mg", "fósforo": "354mg"}	5	https://res.cloudinary.com/dujumgran/image/upload/v1762914336/ingredientes/gondh4tnmquugsa4rjln.jpg	t	2025-11-12 02:25:39.093	2025-11-12 02:25:39.093
28	Leche entera	Leche completa con grasa natural y nutrientes.	ml	100	61.00	3.20	4.80	3.30	0.00	5.10	43.00	{"vitamina_d": "1.3mcg", "vitamina_b12": "0.5mcg"}	{"calcio": "113mg", "fósforo": "84mg"}	5	https://res.cloudinary.com/dujumgran/image/upload/v1762914337/ingredientes/n7ujyn8tfgapysqshmzy.png	t	2025-11-12 02:25:39.743	2025-11-12 02:25:39.743
29	Queso parmesano	Queso duro italiano intenso con umami pronunciado.	g	100	431.00	38.00	4.10	29.00	0.00	0.90	1602.00	{"vitamina_a": "701IU", "vitamina_b12": "1.4mcg"}	{"calcio": "1184mg", "fósforo": "694mg"}	5	https://res.cloudinary.com/dujumgran/image/upload/v1762914339/ingredientes/gomfgzogypeibc9nasnx.png	t	2025-11-12 02:25:42.66	2025-11-12 02:25:42.66
30	Kéfir	Bebida láctea fermentada con probióticos beneficiosos.	ml	100	41.00	3.30	4.50	1.00	0.00	4.50	40.00	{"vitamina_k2": "1mcg", "vitamina_b12": "0.5mcg"}	{"calcio": "120mg", "magnesio": "12mg"}	5	https://res.cloudinary.com/dujumgran/image/upload/v1762914341/ingredientes/azctbudd1vmqa2rfb5l6.png	t	2025-11-12 02:25:43.865	2025-11-12 02:25:43.865
31	Queso cottage	Queso fresco grumoso bajo en grasa y alto en proteína.	g	100	98.00	11.10	3.40	4.30	0.00	2.70	364.00	{"vitamina_b2": "0.2mg", "vitamina_b12": "0.4mcg"}	{"calcio": "83mg", "selenio": "9mcg"}	5	https://res.cloudinary.com/dujumgran/image/upload/v1762914400/ingredientes/u1xzolmzq0ni2g5hfxqa.png	t	2025-11-12 02:26:44.248	2025-11-12 02:26:44.248
32	Aguacate	Fruto cremoso rico en grasas monoinsaturadas saludables.	g	100	160.00	2.00	8.50	14.70	6.70	0.70	7.00	{"folato": "81mcg", "vitamina_k": "21mcg"}	{"potasio": "485mg", "magnesio": "29mg"}	6	https://res.cloudinary.com/dujumgran/image/upload/v1762914586/ingredientes/jcza3vut2qmrzshbando.png	t	2025-11-12 02:29:49.725	2025-11-12 02:29:49.725
33	Aceite de coco	Aceite tropical con triglicéridos de cadena media.	ml	100	862.00	0.00	0.00	100.00	0.00	0.00	0.00	{"vitamina_e": "0.1mg", "vitamina_k": "0.5mcg"}	{"hierro": "0.05mg"}	6	https://res.cloudinary.com/dujumgran/image/upload/v1762914588/ingredientes/jnrmqg3x6es2tcwyd2dp.png	t	2025-11-12 02:29:52.253	2025-11-12 02:29:52.253
34	Aceite de aguacate	Aceite prensado con alto punto de humo ideal para cocinar.	ml	100	884.00	0.00	0.00	100.00	0.00	0.00	0.00	{"vitamina_e": "12.6mg"}	{"potasio": "0mg"}	6	https://res.cloudinary.com/dujumgran/image/upload/v1762914590/ingredientes/pek8knthk4wstzibzgl5.png	t	2025-11-12 02:29:54.036	2025-11-12 02:29:54.036
35	Mantequilla de maní	Pasta cremosa de cacahuates con proteína y grasas.	g	100	588.00	25.00	20.00	50.00	6.00	9.00	17.00	{"vitamina_e": "8.3mg", "vitamina_b3": "13.4mg"}	{"fósforo": "358mg", "magnesio": "168mg"}	6	https://res.cloudinary.com/dujumgran/image/upload/v1762914592/ingredientes/l76u3tqh9ska79gzz27o.png	t	2025-11-12 02:29:55.129	2025-11-12 02:29:55.129
36	Aceite de linaza	Aceite vegetal rico en omega-3 ALA.	ml	100	884.00	0.00	0.00	100.00	0.00	0.00	0.00	{"vitamina_e": "17.5mg", "vitamina_k": "9.3mcg"}	{}	6	https://res.cloudinary.com/dujumgran/image/upload/v1762914593/ingredientes/j0k1shpd329dfhvxcgtb.png	t	2025-11-12 02:29:56.885	2025-11-12 02:29:56.885
37	Cúrcuma en polvo	Especia dorada con curcumina y propiedades antiinflamatorias.	g	100	354.00	7.80	64.90	9.90	21.10	3.20	38.00	{"vitamina_c": "25.9mg", "vitamina_b6": "1.8mg"}	{"hierro": "41.4mg", "manganeso": "7.8mg"}	7	https://res.cloudinary.com/dujumgran/image/upload/v1762914779/ingredientes/hepicawmakaazvrdtye9.png	t	2025-11-12 02:33:03.251	2025-11-12 02:33:03.251
38	Jengibre fresco	Raíz picante aromática con gingerol beneficioso.	g	100	80.00	1.80	17.80	0.80	2.00	1.70	13.00	{"vitamina_c": "5mg", "vitamina_b6": "0.2mg"}	{"potasio": "415mg", "magnesio": "43mg"}	7	https://res.cloudinary.com/dujumgran/image/upload/v1762914782/ingredientes/yqglejqo1szw2wgnsblm.png	t	2025-11-12 02:33:05.179	2025-11-12 02:33:05.179
39	Canela molida	Especia dulce aromática con propiedades antioxidantes.	g	100	247.00	4.00	80.60	1.20	53.10	2.20	10.00	{"vitamina_c": "3.8mg", "vitamina_k": "31.2mcg"}	{"calcio": "1002mg", "hierro": "8.3mg"}	7	https://res.cloudinary.com/dujumgran/image/upload/v1762914783/ingredientes/bncrdrpbsakev2l6kx88.png	t	2025-11-12 02:33:06.203	2025-11-12 02:33:06.203
40	Orégano seco	Hierba mediterránea aromática rica en antioxidantes.	g	100	265.00	9.00	68.90	4.30	42.50	4.10	25.00	{"vitamina_e": "18.3mg", "vitamina_k": "621.7mcg"}	{"calcio": "1597mg", "hierro": "36.8mg"}	7	https://res.cloudinary.com/dujumgran/image/upload/v1762914784/ingredientes/bf8nruld55b7xo3qhufk.png	t	2025-11-12 02:33:08.227	2025-11-12 02:33:08.227
41	Pimienta negra molida	Especia picante universal con piperina estimulante.	g	100	251.00	10.40	63.90	3.30	25.30	0.60	20.00	{"vitamina_c": "0mg", "vitamina_k": "163.7mcg"}	{"hierro": "9.7mg", "manganeso": "12.8mg"}	7	https://res.cloudinary.com/dujumgran/image/upload/v1762914786/ingredientes/fhhkbv13xsqctvw3xau4.jpg	t	2025-11-12 02:33:09.155	2025-11-12 02:33:09.155
42	Comino molido	Especia terrosa cálida esencial en muchas cocinas.	g	100	375.00	17.80	44.20	22.30	10.50	2.20	168.00	{"vitamina_a": "1270IU", "vitamina_c": "7.7mg"}	{"calcio": "931mg", "hierro": "66.4mg"}	7	https://res.cloudinary.com/dujumgran/image/upload/v1762914787/ingredientes/nldu1rmxvrvilb0agyuw.png	t	2025-11-12 02:33:09.997	2025-11-12 02:33:09.997
43	Almendras	Fruto seco crujiente rico en vitamina E y magnesio.	g	100	579.00	21.20	21.60	49.90	12.50	4.40	1.00	{"vitamina_e": "25.6mg", "vitamina_b2": "1.1mg"}	{"calcio": "269mg", "magnesio": "270mg"}	8	https://res.cloudinary.com/dujumgran/image/upload/v1762915966/ingredientes/vcxbka5qhbov4ivscpsg.png	t	2025-11-12 02:52:50.123	2025-11-12 02:52:50.123
44	Nueces	Fruto seco con forma de cerebro rico en omega-3.	g	100	654.00	15.20	13.70	65.20	6.70	2.60	2.00	{"folato": "98mcg", "vitamina_b6": "0.5mg"}	{"cobre": "1.6mg", "manganeso": "3.4mg"}	8	https://res.cloudinary.com/dujumgran/image/upload/v1762915968/ingredientes/anmtvlxs2zn2jcxxueqn.png	t	2025-11-12 02:52:51.179	2025-11-12 02:52:51.179
45	Semillas de chía	Semillas pequeñas con omega-3 y fibra abundante.	g	100	486.00	16.50	42.10	30.70	34.40	0.00	16.00	{"vitamina_b1": "0.6mg", "vitamina_b3": "8.8mg"}	{"calcio": "631mg", "manganeso": "2.7mg"}	8	https://res.cloudinary.com/dujumgran/image/upload/v1762915969/ingredientes/dhw0vl5edpib1le87a2a.png	t	2025-11-12 02:52:53.117	2025-11-12 02:52:53.117
46	Semillas de girasol	Semillas nutritivas ricas en vitamina E y selenio.	g	100	584.00	20.80	20.00	51.50	8.60	2.60	9.00	{"vitamina_e": "35.2mg", "vitamina_b1": "1.5mg"}	{"selenio": "53mcg", "fósforo": "660mg"}	8	https://res.cloudinary.com/dujumgran/image/upload/v1762915971/ingredientes/hrnripiamhxkci5orrfr.png	t	2025-11-12 02:52:55.289	2025-11-12 02:52:55.289
47	Anacardos	Fruto seco cremoso con forma de riñón.	g	100	553.00	18.20	30.20	43.80	3.30	5.90	12.00	{"vitamina_k": "34.1mcg", "vitamina_b6": "0.4mg"}	{"zinc": "5.8mg", "magnesio": "292mg"}	8	https://res.cloudinary.com/dujumgran/image/upload/v1762915973/ingredientes/ylhnp5rmzsfzyge72ha8.png	t	2025-11-12 02:52:57.974	2025-11-12 02:52:57.974
48	Pistachos	Fruto seco verde con cáscara y sabor distintivo.	g	100	560.00	20.20	27.20	45.30	10.60	7.70	1.00	{"vitamina_b1": "0.9mg", "vitamina_b6": "1.7mg"}	{"cobre": "1.3mg", "fósforo": "490mg"}	8	https://res.cloudinary.com/dujumgran/image/upload/v1762915976/ingredientes/y4yompax1bi45xoragdl.png	t	2025-11-12 02:53:00.344	2025-11-12 02:53:00.344
49	Té verde	Infusión con catequinas antioxidantes y cafeína suave.	ml	100	1.00	0.00	0.00	0.00	0.00	0.00	1.00	{"vitamina_c": "0mg", "vitamina_b2": "0.01mg"}	{"potasio": "8mg", "manganeso": "0.2mg"}	9	https://res.cloudinary.com/dujumgran/image/upload/v1762916258/ingredientes/h6xezw041woxtgaaey1n.png	t	2025-11-12 02:57:41.902	2025-11-12 02:57:41.902
50	Café negro	Bebida estimulante con cafeína y antioxidantes.	ml	100	2.00	0.30	0.00	0.00	0.00	0.00	2.00	{"vitamina_b2": "0.01mg", "vitamina_b3": "0.5mg"}	{"potasio": "49mg", "magnesio": "3mg"}	9	https://res.cloudinary.com/dujumgran/image/upload/v1762916260/ingredientes/fxrxrbt63uzjxrue6vv7.png	t	2025-11-12 02:57:44.466	2025-11-12 02:57:44.466
51	Jugo de naranja natural	Zumo cítrico fresco rico en vitamina C.	ml	100	45.00	0.70	10.40	0.20	0.20	8.40	1.00	{"folato": "30mcg", "vitamina_c": "50mg"}	{"potasio": "200mg", "magnesio": "11mg"}	9	https://res.cloudinary.com/dujumgran/image/upload/v1762916263/ingredientes/uxyeotrwxtnye4eujlx3.png	t	2025-11-12 02:57:48.182	2025-11-12 02:57:48.182
52	Agua de coco	Bebida natural hidratante con electrolitos.	ml	100	19.00	0.70	3.70	0.20	1.10	2.60	105.00	{"folato": "3mcg", "vitamina_c": "2.4mg"}	{"potasio": "250mg", "magnesio": "25mg"}	9	https://res.cloudinary.com/dujumgran/image/upload/v1762916266/ingredientes/n75t7j4az0njs0xrijgn.jpg	t	2025-11-12 02:57:49.248	2025-11-12 02:57:49.248
53	Kombucha	Té fermentado probiótico con sabor ácido efervescente.	ml	100	30.00	0.00	7.00	0.00	0.00	2.00	10.00	{"vitamina_c": "0.5mg", "vitamina_b12": "0.2mcg"}	{"potasio": "25mg"}	9	https://res.cloudinary.com/dujumgran/image/upload/v1762916268/ingredientes/pky8t2ohht74rupyypgg.jpg	t	2025-11-12 02:57:50.783	2025-11-12 02:57:50.783
54	Leche dorada	Bebida de cúrcuma y leche con especias antiinflamatorias.	ml	100	65.00	3.30	6.50	3.50	0.20	5.80	44.00	{"vitamina_d": "1.2mcg", "vitamina_b12": "0.5mcg"}	{"calcio": "120mg", "potasio": "150mg"}	9	https://res.cloudinary.com/dujumgran/image/upload/v1762916269/ingredientes/n85b10jqwssquhjdeacv.png	t	2025-11-12 02:57:52.011	2025-11-12 02:57:52.012
55	Chocolate negro	Dulce con alto contenido de cacao y antioxidantes.	g	100	546.00	7.80	61.00	31.00	7.00	48.00	24.00	{"vitamina_e": "0.9mg"}	{"hierro": "11.9mg", "magnesio": "228mg"}	10	https://res.cloudinary.com/dujumgran/image/upload/v1762916622/ingredientes/vmtueu872dfmmaept91m.png	t	2025-11-12 03:03:47.264	2025-11-12 03:03:47.264
56	Miel de abeja	Endulzante natural con antioxidantes y enzimas.	g	100	304.00	0.30	82.40	0.00	0.20	82.10	4.00	{"vitamina_c": "0.5mg", "vitamina_b2": "0.04mg"}	{"calcio": "6mg", "potasio": "52mg"}	10	https://res.cloudinary.com/dujumgran/image/upload/v1762916625/ingredientes/eauhk6xed2bi6xcibd4a.jpg	t	2025-11-12 03:03:48.36	2025-11-12 03:03:48.36
57	Jarabe de arce	Sirope natural de árbol con sabor característico.	ml	100	260.00	0.00	67.00	0.10	0.00	60.00	12.00	{"vitamina_b2": "1.3mg", "vitamina_b5": "0.04mg"}	{"zinc": "4.2mg", "manganeso": "3.3mg"}	10	https://res.cloudinary.com/dujumgran/image/upload/v1762916626/ingredientes/c2djccghynfek341ckin.png	t	2025-11-12 03:03:50.265	2025-11-12 03:03:50.265
58	Dátiles Medjool	Fruta seca dulce natural con fibra y potasio.	g	100	277.00	1.80	75.00	0.20	6.70	66.50	1.00	{"vitamina_k": "2.7mcg", "vitamina_b6": "0.2mg"}	{"potasio": "696mg", "magnesio": "54mg"}	10	https://res.cloudinary.com/dujumgran/image/upload/v1762916628/ingredientes/dwgygkdirj1r7ukvlqki.png	t	2025-11-12 03:03:53.136	2025-11-12 03:03:53.136
59	Helado de vainilla	Postre lácteo congelado cremoso y dulce.	g	100	207.00	3.50	23.60	11.00	0.70	21.20	80.00	{"vitamina_a": "464IU", "vitamina_b12": "0.5mcg"}	{"calcio": "128mg", "fósforo": "105mg"}	10	https://res.cloudinary.com/dujumgran/image/upload/v1762916631/ingredientes/oxn2r9xmm96opeeuosxe.png	t	2025-11-12 03:03:54.937	2025-11-12 03:03:54.937
60	Chocolate con leche	Chocolate dulce suave con leche añadida.	g	100	535.00	7.60	59.40	29.70	3.40	51.50	79.00	{"vitamina_a": "195IU", "vitamina_b2": "0.3mg"}	{"calcio": "189mg", "magnesio": "63mg"}	10	https://res.cloudinary.com/dujumgran/image/upload/v1762916633/ingredientes/jcirhfzcszpelysp3nyo.jpg	t	2025-11-12 03:03:55.834	2025-11-12 03:03:55.834
61	Pan integral	Pan de grano entero con fibra y nutrientes.	g	100	247.00	13.00	41.00	3.40	7.00	6.00	400.00	{"folato": "40mcg", "vitamina_b1": "0.4mg"}	{"hierro": "3.6mg", "magnesio": "75mg"}	11	https://res.cloudinary.com/dujumgran/image/upload/v1762916909/ingredientes/exm5ykjfd650sixugytb.jpg	t	2025-11-12 03:08:32.327	2025-11-12 03:08:32.327
62	Croissant	Bollería francesa hojaldrada mantecosa y crujiente.	g	100	406.00	8.20	45.80	21.00	2.60	11.30	477.00	{"vitamina_a": "656IU", "vitamina_b1": "0.4mg"}	{"calcio": "37mg", "hierro": "2.4mg"}	11	https://res.cloudinary.com/dujumgran/image/upload/v1762916911/ingredientes/j5rx6phpjwfo0my9yjuk.png	t	2025-11-12 03:08:33.812	2025-11-12 03:08:33.812
63	Bagel	Pan circular hervido y horneado con textura densa.	g	100	257.00	10.10	50.90	1.70	2.30	8.90	475.00	{"folato": "120mcg", "vitamina_b1": "0.5mg"}	{"hierro": "3.8mg", "selenio": "32mcg"}	11	https://res.cloudinary.com/dujumgran/image/upload/v1762916912/ingredientes/rzlcndxbnewk30xybtv8.png	t	2025-11-12 03:08:36.102	2025-11-12 03:08:36.102
64	Muffin de arándanos	Panecillo dulce esponjoso con bayas frescas.	g	100	367.00	5.30	51.60	15.80	1.60	27.40	387.00	{"vitamina_a": "289IU", "vitamina_e": "1.4mg"}	{"calcio": "76mg", "hierro": "1.8mg"}	11	https://res.cloudinary.com/dujumgran/image/upload/v1762916914/ingredientes/von7etac1ttpfounoqzu.png	t	2025-11-12 03:08:39.335	2025-11-12 03:08:39.335
65	Pan de pita	Pan plano mediterráneo con bolsillo interior.	g	100	275.00	9.10	55.70	1.20	2.20	1.90	536.00	{"vitamina_b1": "0.5mg", "vitamina_b3": "4mg"}	{"hierro": "2.7mg", "magnesio": "26mg"}	11	https://res.cloudinary.com/dujumgran/image/upload/v1762916917/ingredientes/uyaxqi1e6hjtia34exhp.png	t	2025-11-12 03:08:41.31	2025-11-12 03:08:41.31
66	Galletas de avena	Galletas crujientes con fibra de avena integral.	g	100	450.00	6.30	68.20	17.30	4.00	30.50	320.00	{"vitamina_e": "1.2mg", "vitamina_b1": "0.3mg"}	{"hierro": "2.6mg", "magnesio": "45mg"}	11	https://res.cloudinary.com/dujumgran/image/upload/v1762916919/ingredientes/greuqpgvsl2lsszggn19.png	t	2025-11-12 03:08:42.279	2025-11-12 03:08:42.279
67	Salmón fresco	Pescado graso rico en omega-3 y proteína de calidad.	g	100	208.00	20.40	0.00	13.40	0.00	0.00	59.00	{"vitamina_d": "11mcg", "vitamina_b12": "3.2mcg"}	{"selenio": "36.5mcg", "fósforo": "200mg"}	12	https://res.cloudinary.com/dujumgran/image/upload/v1762917187/ingredientes/qqph3guowix6hmrjdcpg.png	t	2025-11-12 03:13:10.903	2025-11-12 03:13:10.903
68	Atún fresco	Pescado magro con alto contenido proteico y omega-3.	g	100	144.00	23.30	0.00	4.90	0.00	0.00	39.00	{"vitamina_d": "3.8mcg", "vitamina_b3": "8.7mg"}	{"selenio": "36.5mcg", "magnesio": "50mg"}	12	https://res.cloudinary.com/dujumgran/image/upload/v1762917189/ingredientes/hjdbko1p1yf3awic04at.png	t	2025-11-12 03:13:12.171	2025-11-12 03:13:12.171
69	Camarones	Mariscos bajos en calorías y altos en proteína.	g	100	99.00	24.00	0.20	0.30	0.00	0.00	111.00	{"vitamina_e": "1.1mg", "vitamina_b12": "1.1mcg"}	{"selenio": "38mcg", "fósforo": "244mg"}	12	https://res.cloudinary.com/dujumgran/image/upload/v1762917190/ingredientes/crcjjv30xuctmlsgchqz.png	t	2025-11-12 03:13:14.267	2025-11-12 03:13:14.267
70	Bacalao	Pescado blanco magro con textura firme y delicada.	g	100	82.00	17.80	0.00	0.70	0.00	0.00	54.00	{"vitamina_b6": "0.2mg", "vitamina_b12": "0.9mcg"}	{"selenio": "33.1mcg", "fósforo": "203mg"}	12	https://res.cloudinary.com/dujumgran/image/upload/v1762917192/ingredientes/hj1yhc0k1ji8bop59uf7.png	t	2025-11-12 03:13:15.27	2025-11-12 03:13:15.27
71	Mejillones	Moluscos bivalvos ricos en hierro y vitamina B12.	g	100	86.00	11.90	3.70	2.20	0.00	0.00	369.00	{"vitamina_c": "8mg", "vitamina_b12": "16mcg"}	{"hierro": "3.9mg", "selenio": "44.8mcg"}	12	https://res.cloudinary.com/dujumgran/image/upload/v1762917193/ingredientes/a2cxszm2aumg4b9gmc08.png	t	2025-11-12 03:13:19.863	2025-11-12 03:13:19.863
72	Pulpo	Cefalópodo con textura firme y sabor marino suave.	g	100	82.00	14.90	2.20	1.00	0.00	0.00	230.00	{"vitamina_b3": "2.1mg", "vitamina_b12": "20mcg"}	{"cobre": "0.4mg", "selenio": "44.8mcg"}	12	https://res.cloudinary.com/dujumgran/image/upload/v1762917198/ingredientes/xjvyflvw9phvxggqa69b.jpg	t	2025-11-12 03:13:20.743	2025-11-12 03:13:20.743
73	Vino tinto	Bebida fermentada de uva con resveratrol antioxidante.	ml	100	85.00	0.10	2.60	0.00	0.00	0.60	4.00	{"vitamina_k": "0.3mcg"}	{"hierro": "0.5mg", "potasio": "127mg"}	13	https://res.cloudinary.com/dujumgran/image/upload/v1762917422/ingredientes/lq81ah3gvewowmrroqpu.png	t	2025-11-12 03:17:05.906	2025-11-12 03:17:05.906
74	Cerveza rubia	Bebida fermentada de malta con lúpulo.	ml	100	43.00	0.50	3.60	0.00	0.00	0.00	4.00	{"folato": "6mcg", "vitamina_b3": "0.5mg"}	{"potasio": "27mg", "magnesio": "6mg"}	13	https://res.cloudinary.com/dujumgran/image/upload/v1762917424/ingredientes/aagqk454ltfnnpp6h3ts.jpg	t	2025-11-12 03:17:07.389	2025-11-12 03:17:07.389
75	Vodka	Destilado neutro puro sin carbohidratos.	ml	100	231.00	0.00	0.00	0.00	0.00	0.00	1.00	{}	{"potasio": "1mg"}	13	https://res.cloudinary.com/dujumgran/image/upload/v1762917425/ingredientes/jyj0s8anpkjs8tougtlt.png	t	2025-11-12 03:17:09.461	2025-11-12 03:17:09.461
76	Whisky	Destilado de grano envejecido en barrica de roble.	ml	100	250.00	0.00	0.00	0.00	0.00	0.00	1.00	{"vitamina_b3": "0.01mg"}	{"potasio": "2mg"}	13	https://res.cloudinary.com/dujumgran/image/upload/v1762917428/ingredientes/iuw1xh4v2ap3fxxuxjzu.png	t	2025-11-12 03:17:10.486	2025-11-12 03:17:10.486
77	Vino blanco	Vino ligero refrescante de uvas blancas o verdes.	ml	100	82.00	0.10	2.60	0.00	0.00	1.40	5.00	{"vitamina_b2": "0.01mg"}	{"potasio": "71mg", "magnesio": "10mg"}	13	https://res.cloudinary.com/dujumgran/image/upload/v1762917429/ingredientes/enlcsdrgaaanwbn0owgh.png	t	2025-11-12 03:17:11.36	2025-11-12 03:17:11.36
78	Ron	Destilado dulce de caña de azúcar o melaza.	ml	100	231.00	0.00	0.00	0.00	0.00	0.00	1.00	{}	{"potasio": "2mg"}	13	https://res.cloudinary.com/dujumgran/image/upload/v1762917429/ingredientes/th5xnuc8kjhqlsbvgscq.png	t	2025-11-12 03:17:13.948	2025-11-12 03:17:13.949
79	Palomitas de maíz caseras	Snack integral bajo en calorías sin mantequilla.	g	100	387.00	13.00	77.80	4.50	14.50	0.90	8.00	{"vitamina_b3": "2.3mg", "vitamina_b6": "0.2mg"}	{"magnesio": "151mg", "manganeso": "1.1mg"}	14	https://res.cloudinary.com/dujumgran/image/upload/v1762917642/ingredientes/wplkrp6b2om93ybgs0ju.png	t	2025-11-12 03:20:46.343	2025-11-12 03:20:46.343
80	Chips de kale	Hojas de col rizada crujientes horneadas.	g	100	430.00	18.00	37.00	24.00	15.00	9.60	1590.00	{"vitamina_a": "41500IU", "vitamina_k": "2940mcg"}	{"calcio": "625mg", "hierro": "6.3mg"}	14	https://res.cloudinary.com/dujumgran/image/upload/v1762917645/ingredientes/palpywxjaec9h5mpkbef.png	t	2025-11-12 03:20:50.297	2025-11-12 03:20:50.297
81	Hummus	Paté cremoso de garbanzos y tahini mediterráneo.	g	100	166.00	7.90	14.30	9.60	6.00	0.30	379.00	{"folato": "59mcg", "vitamina_b6": "0.2mg"}	{"hierro": "2.4mg", "magnesio": "71mg"}	14	https://res.cloudinary.com/dujumgran/image/upload/v1762917651/ingredientes/vmixzlluwkhwxdfwtcf8.png	t	2025-11-12 03:20:55.348	2025-11-12 03:20:55.348
82	Edamame tostado	Soya verde crujiente alta en proteína y fibra.	g	100	449.00	35.20	27.60	22.30	15.20	6.50	890.00	{"folato": "385mcg", "vitamina_k": "33mcg"}	{"calcio": "197mg", "hierro": "9mg"}	14	https://res.cloudinary.com/dujumgran/image/upload/v1762917655/ingredientes/ceyueigy0iquyinj7ymv.png	t	2025-11-12 03:20:59.59	2025-11-12 03:20:59.59
83	Chips de plátano	Rodajas crujientes de plátano deshidratado.	g	100	519.00	2.30	58.40	33.60	7.70	35.30	6.00	{"vitamina_a": "1127IU", "vitamina_c": "7.8mg"}	{"potasio": "536mg", "magnesio": "76mg"}	14	https://res.cloudinary.com/dujumgran/image/upload/v1762917658/ingredientes/wamqoflnx7tzz9ismutw.png	t	2025-11-12 03:21:00.216	2025-11-12 03:21:00.216
84	Bastones de zanahoria	Palitos crudos crujientes bajos en calorías.	g	100	41.00	0.90	9.60	0.20	2.80	4.70	69.00	{"vitamina_a": "16706IU", "vitamina_k": "13.2mcg"}	{"calcio": "33mg", "potasio": "320mg"}	14	https://res.cloudinary.com/dujumgran/image/upload/v1762917739/ingredientes/xxnxbz5kos2pa25brcla.jpg	t	2025-11-12 03:22:22.025	2025-11-12 03:22:22.025
\.


--
-- TOC entry 5055 (class 0 OID 16624)
-- Dependencies: 244
-- Data for Name: likes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.likes (like_id, usuario_id, receta_id, fecha_creacion) FROM stdin;
6	1	10	2025-11-12 00:33:37.434
\.


--
-- TOC entry 5049 (class 0 OID 16557)
-- Dependencies: 238
-- Data for Name: receta_etiquetas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.receta_etiquetas (receta_etiqueta_id, receta_id, etiqueta_id) FROM stdin;
3	10	13
4	10	14
5	10	15
6	10	16
\.


--
-- TOC entry 5047 (class 0 OID 16536)
-- Dependencies: 236
-- Data for Name: receta_ingredientes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.receta_ingredientes (receta_ingrediente_id, receta_id, ingrediente_id, cantidad, unidad, notas) FROM stdin;
39	10	5	200.00	ml	\N
40	10	1	100.00	g	\N
41	10	3	300.00	g	\N
\.


--
-- TOC entry 5045 (class 0 OID 16510)
-- Dependencies: 234
-- Data for Name: recetas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.recetas (receta_id, usuario_id, titulo, descripcion, instrucciones, tiempo_preparacion, porciones, dificultad, imagen_principal, galeria_imagenes, video_url, activa, fecha_creacion, fecha_actualizacion, total_calorias, total_proteinas, total_carbohidratos, total_grasas, total_fibra, calificacion_promedio) FROM stdin;
10	1	Ensalada de prueba	Hola, esta es la descripcion	"[\\"Corta la manzana\\",\\"Cocina el pollo\\",\\"Corta el pollo\\",\\"Mezcla en un bowl\\",\\"Echa aceite  y sal al gusto\\"]"	20	1	intermedio	https://res.cloudinary.com/dujumgran/image/upload/v1762892140/recipes/znp3rcjtk65aegq21pr5.jpg	\N	\N	t	2025-11-11 20:15:42.194	2025-11-11 20:15:42.194	1101.00	31.30	14.00	103.80	2.40	0.00
\.


--
-- TOC entry 5039 (class 0 OID 16456)
-- Dependencies: 228
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (usuario_id, nombre, email, password, rol, activo, avatar, fecha_registro) FROM stdin;
1	Demo	demo@demo.com	$2b$10$YeLug8OvlVqk8qkGKbNtpeqiKQpRx8lJ11iTQi2WGwxsQ03rgp/EW	user	t	\N	2025-11-10 02:30:32.654
\.


--
-- TOC entry 5071 (class 0 OID 0)
-- Dependencies: 225
-- Name: categorias_categoria_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categorias_categoria_id_seq', 7, true);


--
-- TOC entry 5072 (class 0 OID 0)
-- Dependencies: 239
-- Name: comentarios_comentario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comentarios_comentario_id_seq', 1, false);


--
-- TOC entry 5073 (class 0 OID 0)
-- Dependencies: 231
-- Name: etiquetas_etiqueta_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.etiquetas_etiqueta_id_seq', 16, true);


--
-- TOC entry 5074 (class 0 OID 0)
-- Dependencies: 241
-- Name: favoritos_favorito_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.favoritos_favorito_id_seq', 1, false);


--
-- TOC entry 5075 (class 0 OID 0)
-- Dependencies: 229
-- Name: ingredientes_ingrediente_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ingredientes_ingrediente_id_seq', 84, true);


--
-- TOC entry 5076 (class 0 OID 0)
-- Dependencies: 243
-- Name: likes_like_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.likes_like_id_seq', 6, true);


--
-- TOC entry 5077 (class 0 OID 0)
-- Dependencies: 237
-- Name: receta_etiquetas_receta_etiqueta_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.receta_etiquetas_receta_etiqueta_id_seq', 6, true);


--
-- TOC entry 5078 (class 0 OID 0)
-- Dependencies: 235
-- Name: receta_ingredientes_receta_ingrediente_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.receta_ingredientes_receta_ingrediente_id_seq', 48, true);


--
-- TOC entry 5079 (class 0 OID 0)
-- Dependencies: 233
-- Name: recetas_receta_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.recetas_receta_id_seq', 12, true);


--
-- TOC entry 5080 (class 0 OID 0)
-- Dependencies: 227
-- Name: usuarios_usuario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_usuario_id_seq', 1, true);


--
-- TOC entry 4845 (class 2606 OID 16454)
-- Name: categorias categorias_nombre_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categorias
    ADD CONSTRAINT categorias_nombre_key UNIQUE (nombre);


--
-- TOC entry 4847 (class 2606 OID 16452)
-- Name: categorias categorias_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categorias
    ADD CONSTRAINT categorias_pkey PRIMARY KEY (categoria_id);


--
-- TOC entry 4869 (class 2606 OID 16587)
-- Name: comentarios comentarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comentarios
    ADD CONSTRAINT comentarios_pkey PRIMARY KEY (comentario_id);


--
-- TOC entry 4855 (class 2606 OID 16508)
-- Name: etiquetas etiquetas_nombre_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.etiquetas
    ADD CONSTRAINT etiquetas_nombre_key UNIQUE (nombre);


--
-- TOC entry 4857 (class 2606 OID 16506)
-- Name: etiquetas etiquetas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.etiquetas
    ADD CONSTRAINT etiquetas_pkey PRIMARY KEY (etiqueta_id);


--
-- TOC entry 4871 (class 2606 OID 16610)
-- Name: favoritos favoritos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favoritos
    ADD CONSTRAINT favoritos_pkey PRIMARY KEY (favorito_id);


--
-- TOC entry 4873 (class 2606 OID 16612)
-- Name: favoritos favoritos_usuario_id_receta_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favoritos
    ADD CONSTRAINT favoritos_usuario_id_receta_id_key UNIQUE (usuario_id, receta_id);


--
-- TOC entry 4853 (class 2606 OID 16489)
-- Name: ingredientes ingredientes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingredientes
    ADD CONSTRAINT ingredientes_pkey PRIMARY KEY (ingrediente_id);


--
-- TOC entry 4875 (class 2606 OID 16630)
-- Name: likes likes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_pkey PRIMARY KEY (like_id);


--
-- TOC entry 4877 (class 2606 OID 16632)
-- Name: likes likes_usuario_id_receta_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_usuario_id_receta_id_key UNIQUE (usuario_id, receta_id);


--
-- TOC entry 4865 (class 2606 OID 16562)
-- Name: receta_etiquetas receta_etiquetas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.receta_etiquetas
    ADD CONSTRAINT receta_etiquetas_pkey PRIMARY KEY (receta_etiqueta_id);


--
-- TOC entry 4867 (class 2606 OID 16564)
-- Name: receta_etiquetas receta_etiquetas_receta_id_etiqueta_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.receta_etiquetas
    ADD CONSTRAINT receta_etiquetas_receta_id_etiqueta_id_key UNIQUE (receta_id, etiqueta_id);


--
-- TOC entry 4861 (class 2606 OID 16543)
-- Name: receta_ingredientes receta_ingredientes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.receta_ingredientes
    ADD CONSTRAINT receta_ingredientes_pkey PRIMARY KEY (receta_ingrediente_id);


--
-- TOC entry 4863 (class 2606 OID 16545)
-- Name: receta_ingredientes receta_ingredientes_receta_id_ingrediente_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.receta_ingredientes
    ADD CONSTRAINT receta_ingredientes_receta_id_ingrediente_id_key UNIQUE (receta_id, ingrediente_id);


--
-- TOC entry 4859 (class 2606 OID 16529)
-- Name: recetas recetas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recetas
    ADD CONSTRAINT recetas_pkey PRIMARY KEY (receta_id);


--
-- TOC entry 4849 (class 2606 OID 16469)
-- Name: usuarios usuarios_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_email_key UNIQUE (email);


--
-- TOC entry 4851 (class 2606 OID 16467)
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (usuario_id);


--
-- TOC entry 4884 (class 2606 OID 16598)
-- Name: comentarios comentarios_padre_comentario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comentarios
    ADD CONSTRAINT comentarios_padre_comentario_id_fkey FOREIGN KEY (padre_comentario_id) REFERENCES public.comentarios(comentario_id) ON DELETE CASCADE;


--
-- TOC entry 4885 (class 2606 OID 16588)
-- Name: comentarios comentarios_receta_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comentarios
    ADD CONSTRAINT comentarios_receta_id_fkey FOREIGN KEY (receta_id) REFERENCES public.recetas(receta_id) ON DELETE CASCADE;


--
-- TOC entry 4886 (class 2606 OID 16593)
-- Name: comentarios comentarios_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comentarios
    ADD CONSTRAINT comentarios_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(usuario_id) ON DELETE CASCADE;


--
-- TOC entry 4887 (class 2606 OID 16618)
-- Name: favoritos favoritos_receta_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favoritos
    ADD CONSTRAINT favoritos_receta_id_fkey FOREIGN KEY (receta_id) REFERENCES public.recetas(receta_id) ON DELETE CASCADE;


--
-- TOC entry 4888 (class 2606 OID 16613)
-- Name: favoritos favoritos_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favoritos
    ADD CONSTRAINT favoritos_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(usuario_id) ON DELETE CASCADE;


--
-- TOC entry 4878 (class 2606 OID 16490)
-- Name: ingredientes ingredientes_categoria_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingredientes
    ADD CONSTRAINT ingredientes_categoria_id_fkey FOREIGN KEY (categoria_id) REFERENCES public.categorias(categoria_id) ON DELETE SET NULL;


--
-- TOC entry 4889 (class 2606 OID 16638)
-- Name: likes likes_receta_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_receta_id_fkey FOREIGN KEY (receta_id) REFERENCES public.recetas(receta_id) ON DELETE CASCADE;


--
-- TOC entry 4890 (class 2606 OID 16633)
-- Name: likes likes_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(usuario_id) ON DELETE CASCADE;


--
-- TOC entry 4882 (class 2606 OID 16570)
-- Name: receta_etiquetas receta_etiquetas_etiqueta_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.receta_etiquetas
    ADD CONSTRAINT receta_etiquetas_etiqueta_id_fkey FOREIGN KEY (etiqueta_id) REFERENCES public.etiquetas(etiqueta_id) ON DELETE CASCADE;


--
-- TOC entry 4883 (class 2606 OID 16565)
-- Name: receta_etiquetas receta_etiquetas_receta_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.receta_etiquetas
    ADD CONSTRAINT receta_etiquetas_receta_id_fkey FOREIGN KEY (receta_id) REFERENCES public.recetas(receta_id) ON DELETE CASCADE;


--
-- TOC entry 4880 (class 2606 OID 16551)
-- Name: receta_ingredientes receta_ingredientes_ingrediente_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.receta_ingredientes
    ADD CONSTRAINT receta_ingredientes_ingrediente_id_fkey FOREIGN KEY (ingrediente_id) REFERENCES public.ingredientes(ingrediente_id) ON DELETE CASCADE;


--
-- TOC entry 4881 (class 2606 OID 16546)
-- Name: receta_ingredientes receta_ingredientes_receta_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.receta_ingredientes
    ADD CONSTRAINT receta_ingredientes_receta_id_fkey FOREIGN KEY (receta_id) REFERENCES public.recetas(receta_id) ON DELETE CASCADE;


--
-- TOC entry 4879 (class 2606 OID 16530)
-- Name: recetas recetas_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recetas
    ADD CONSTRAINT recetas_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(usuario_id) ON DELETE CASCADE;


-- Completed on 2025-11-11 22:24:11

--
-- PostgreSQL database dump complete
--

