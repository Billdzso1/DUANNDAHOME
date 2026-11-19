--
-- PostgreSQL database dump
--

\restrict wdHyoABT9z5pylqvsb1fy2onetR4nwe4TEpxpFMOkeJdThNkKCLQgRoNXakSP5M

-- Dumped from database version 18.7
-- Dumped by pg_dump version 18.7

-- Started on 2026-11-18 11:04:30

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
-- TOC entry 224 (class 1259 OID 24614)
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    name character varying(150) NOT NULL,
    type character varying(20) NOT NULL,
    description text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT categories_type_check CHECK (((type)::text = ANY ((ARRAY['income'::character varying, 'expense'::character varying])::text[])))
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 24613)
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categories_id_seq OWNER TO postgres;

--
-- TOC entry 5086 (class 0 OID 0)
-- Dependencies: 223
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- TOC entry 228 (class 1259 OID 24645)
-- Name: customers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.customers (
    id integer NOT NULL,
    full_name character varying(150) NOT NULL,
    phone character varying(20),
    email character varying(150),
    address text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.customers OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 24644)
-- Name: customers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.customers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.customers_id_seq OWNER TO postgres;

--
-- TOC entry 5087 (class 0 OID 0)
-- Dependencies: 227
-- Name: customers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.customers_id_seq OWNED BY public.customers.id;


--
-- TOC entry 220 (class 1259 OID 24578)
-- Name: departments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.departments (
    id integer NOT NULL,
    name character varying(150) NOT NULL,
    description text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.departments OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 24577)
-- Name: departments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.departments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.departments_id_seq OWNER TO postgres;

--
-- TOC entry 5088 (class 0 OID 0)
-- Dependencies: 219
-- Name: departments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.departments_id_seq OWNED BY public.departments.id;


--
-- TOC entry 226 (class 1259 OID 24628)
-- Name: properties; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.properties (
    id integer NOT NULL,
    name character varying(150) NOT NULL,
    address text NOT NULL,
    property_type character varying(50),
    price numeric(15,2) DEFAULT 0 NOT NULL,
    status character varying(30) DEFAULT 'available'::character varying,
    description text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT properties_price_check CHECK ((price >= (0)::numeric))
);


ALTER TABLE public.properties OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 24627)
-- Name: properties_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.properties_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.properties_id_seq OWNER TO postgres;

--
-- TOC entry 5089 (class 0 OID 0)
-- Dependencies: 225
-- Name: properties_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.properties_id_seq OWNED BY public.properties.id;


--
-- TOC entry 230 (class 1259 OID 24657)
-- Name: transactions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transactions (
    id integer NOT NULL,
    user_id integer NOT NULL,
    category_id integer NOT NULL,
    property_id integer,
    customer_id integer,
    amount numeric(15,2) NOT NULL,
    description text,
    transaction_date date DEFAULT CURRENT_DATE NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT transactions_amount_check CHECK ((amount > (0)::numeric))
);


ALTER TABLE public.transactions OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 24656)
-- Name: transactions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.transactions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.transactions_id_seq OWNER TO postgres;

--
-- TOC entry 5090 (class 0 OID 0)
-- Dependencies: 229
-- Name: transactions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.transactions_id_seq OWNED BY public.transactions.id;


--
-- TOC entry 222 (class 1259 OID 24592)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    full_name character varying(150) NOT NULL,
    email character varying(150) NOT NULL,
    password character varying(255) NOT NULL,
    phone character varying(20),
    department_id integer,
    role character varying(30) DEFAULT 'employee'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 24591)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 5091 (class 0 OID 0)
-- Dependencies: 221
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 4886 (class 2604 OID 24617)
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- TOC entry 4892 (class 2604 OID 24648)
-- Name: customers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers ALTER COLUMN id SET DEFAULT nextval('public.customers_id_seq'::regclass);


--
-- TOC entry 4881 (class 2604 OID 24581)
-- Name: departments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departments ALTER COLUMN id SET DEFAULT nextval('public.departments_id_seq'::regclass);


--
-- TOC entry 4888 (class 2604 OID 24631)
-- Name: properties id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.properties ALTER COLUMN id SET DEFAULT nextval('public.properties_id_seq'::regclass);


--
-- TOC entry 4894 (class 2604 OID 24660)
-- Name: transactions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions ALTER COLUMN id SET DEFAULT nextval('public.transactions_id_seq'::regclass);


--
-- TOC entry 4883 (class 2604 OID 24595)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 5074 (class 0 OID 24614)
-- Dependencies: 224
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categories (id, name, type, description, created_at) FROM stdin;
1	Tiền thuê phòng	income	Thu tiền cho thuê phòng	2026-11-18 10:28:18.998854
2	Tiền thuê nhà	income	Thu tiền cho thuê nhà	2026-11-18 10:28:18.998854
3	Tiền điện	expense	Chi phí tiền điện	2026-11-18 10:28:18.998854
4	Tiền nước	expense	Chi phí tiền nước	2026-11-18 10:28:18.998854
5	Chi phí sửa chữa	expense	Chi phí bảo trì và sửa chữa	2026-11-18 10:28:18.998854
6	Chi phí quản lý	expense	Chi phí quản lý bất động sản	2026-11-18 10:28:18.998854
\.


--
-- TOC entry 5078 (class 0 OID 24645)
-- Dependencies: 228
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.customers (id, full_name, phone, email, address, created_at) FROM stdin;
1	Nguyễn Văn An	0912345678	vana@gmail.com	Thủ Đức, TP. Hồ Chí Minh	2026-11-18 10:34:53.176738
2	Trần Thị Bình	0923456789	thibinh@gmail.com	Bình Thạnh, TP. Hồ Chí Minh	2026-11-18 10:34:53.176738
3	Lê Hoàng Nam	0934567890	hoangnam@gmail.com	Quận 9, TP. Hồ Chí Minh	2026-11-18 10:34:53.176738
4	Phạm Minh Tuấn	0945678901	minhtuan@gmail.com	Gò Vấp, TP. Hồ Chí Minh	2026-11-18 10:34:53.176738
\.


--
-- TOC entry 5070 (class 0 OID 24578)
-- Dependencies: 220
-- Data for Name: departments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.departments (id, name, description, created_at) FROM stdin;
1	Ban Giám đốc	Quản lý và điều hành công ty	2026-11-18 10:22:21.073908
2	Phòng Kế toán	Quản lý thu chi và tài chính	2026-11-18 10:22:21.073908
3	Phòng Kinh doanh	Quản lý hoạt động kinh doanh	2026-11-18 10:22:21.073908
4	Phòng Quản lý bất động sản	Quản lý nhà và phòng cho thuê	2026-11-18 10:22:21.073908
\.


--
-- TOC entry 5076 (class 0 OID 24628)
-- Dependencies: 226
-- Data for Name: properties; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.properties (id, name, address, property_type, price, status, description, created_at) FROM stdin;
1	Phòng trọ A01	Thủ Đức, TP. Hồ Chí Minh	room	2500000.00	rented	Phòng trọ có đầy đủ tiện nghi	2026-11-18 10:33:32.86932
2	Phòng trọ A02	Thủ Đức, TP. Hồ Chí Minh	room	3000000.00	available	Phòng trọ mới, có ban công	2026-11-18 10:33:32.86932
3	Nhà nguyên căn B01	Quận 9, TP. Hồ Chí Minh	house	8000000.00	rented	Nhà nguyên căn 2 tầng	2026-11-18 10:33:32.86932
4	Phòng trọ C01	Bình Thạnh, TP. Hồ Chí Minh	room	3500000.00	available	Phòng rộng, gần trung tâm	2026-11-18 10:33:32.86932
\.


--
-- TOC entry 5080 (class 0 OID 24657)
-- Dependencies: 230
-- Data for Name: transactions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.transactions (id, user_id, category_id, property_id, customer_id, amount, description, transaction_date, created_at, updated_at) FROM stdin;
1	1	1	1	1	2500000.00	Thu tien thue phong A01	2026-11-01	2026-11-18 10:52:27.021027	2026-11-18 10:52:27.021027
2	2	2	3	3	8000000.00	Thu tien thue nha B01	2026-11-03	2026-11-18 10:52:27.021027	2026-11-18 10:52:27.021027
3	1	1	2	2	3000000.00	Thu tien thue phong A02	2026-11-05	2026-11-18 10:52:27.021027	2026-11-18 10:52:27.021027
4	2	3	1	\N	500000.00	Chi tien dien phong A01	2026-11-06	2026-11-18 10:52:27.021027	2026-11-18 10:52:27.021027
5	3	4	3	\N	300000.00	Chi tien nuoc nha B01	2026-11-07	2026-11-18 10:52:27.021027	2026-11-18 10:52:27.021027
6	4	5	2	\N	1000000.00	Chi phi sua chua phong A02	2026-11-08	2026-11-18 10:52:27.021027	2026-11-18 10:52:27.021027
7	1	6	\N	\N	700000.00	Chi phi quan ly	2026-11-10	2026-11-18 10:52:27.021027	2026-11-18 10:52:27.021027
\.


--
-- TOC entry 5072 (class 0 OID 24592)
-- Dependencies: 222
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, full_name, email, password, phone, department_id, role, created_at) FROM stdin;
1	Nguyễn Hoàng Tuấn Anh	tuananh@ndahome.com	demo_hash_001	0900000001	1	admin	2026-11-18 10:47:27.972173
2	Trần Phú Vinh	phuvinh@ndahome.com	demo_hash_002	0900000002	2	employee	2026-11-18 10:47:27.972173
3	Nguyễn Văn Duy	vanduy@ndahome.com	demo_hash_003	0900000003	3	employee	2026-11-18 10:47:27.972173
4	Vũ Tuyết Minh	tuyetminh@ndahome.com	demo_hash_004	0900000004	4	employee	2026-11-18 10:47:27.972173
\.


--
-- TOC entry 5092 (class 0 OID 0)
-- Dependencies: 223
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categories_id_seq', 6, true);


--
-- TOC entry 5093 (class 0 OID 0)
-- Dependencies: 227
-- Name: customers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.customers_id_seq', 4, true);


--
-- TOC entry 5094 (class 0 OID 0)
-- Dependencies: 219
-- Name: departments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.departments_id_seq', 4, true);


--
-- TOC entry 5095 (class 0 OID 0)
-- Dependencies: 225
-- Name: properties_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.properties_id_seq', 4, true);


--
-- TOC entry 5096 (class 0 OID 0)
-- Dependencies: 229
-- Name: transactions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.transactions_id_seq', 7, true);


--
-- TOC entry 5097 (class 0 OID 0)
-- Dependencies: 221
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 9, true);


--
-- TOC entry 4910 (class 2606 OID 24626)
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- TOC entry 4914 (class 2606 OID 24655)
-- Name: customers customers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (id);


--
-- TOC entry 4902 (class 2606 OID 24590)
-- Name: departments departments_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departments
    ADD CONSTRAINT departments_name_key UNIQUE (name);


--
-- TOC entry 4904 (class 2606 OID 24588)
-- Name: departments departments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.departments
    ADD CONSTRAINT departments_pkey PRIMARY KEY (id);


--
-- TOC entry 4912 (class 2606 OID 24643)
-- Name: properties properties_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.properties
    ADD CONSTRAINT properties_pkey PRIMARY KEY (id);


--
-- TOC entry 4916 (class 2606 OID 24673)
-- Name: transactions transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (id);


--
-- TOC entry 4906 (class 2606 OID 24607)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 4908 (class 2606 OID 24605)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4918 (class 2606 OID 24679)
-- Name: transactions transactions_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id) ON DELETE RESTRICT;


--
-- TOC entry 4919 (class 2606 OID 24689)
-- Name: transactions transactions_customer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(id) ON DELETE SET NULL;


--
-- TOC entry 4920 (class 2606 OID 24684)
-- Name: transactions transactions_property_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_property_id_fkey FOREIGN KEY (property_id) REFERENCES public.properties(id) ON DELETE SET NULL;


--
-- TOC entry 4921 (class 2606 OID 24674)
-- Name: transactions transactions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE RESTRICT;


--
-- TOC entry 4917 (class 2606 OID 24608)
-- Name: users users_department_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_department_id_fkey FOREIGN KEY (department_id) REFERENCES public.departments(id) ON DELETE SET NULL;


-- Completed on 2026-11-18 11:04:31

--
-- PostgreSQL database dump complete
--

\unrestrict wdHyoABT9z5pylqvsb1fy2onetR4nwe4TEpxpFMOkeJdThNkKCLQgRoNXakSP5M

