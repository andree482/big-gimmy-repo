--
-- PostgreSQL database dump
--

-- Dumped from database version 16.9 (63f4182)
-- Dumped by pg_dump version 16.9

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

ALTER TABLE IF EXISTS ONLY public.user_orders DROP CONSTRAINT IF EXISTS user_orders_user_id_users_id_fk;
ALTER TABLE IF EXISTS ONLY public.user_favorites DROP CONSTRAINT IF EXISTS user_favorites_user_id_users_id_fk;
ALTER TABLE IF EXISTS ONLY public.user_favorites DROP CONSTRAINT IF EXISTS user_favorites_product_id_products_id_fk;
ALTER TABLE IF EXISTS ONLY public.user_carts DROP CONSTRAINT IF EXISTS user_carts_user_id_users_id_fk;
ALTER TABLE IF EXISTS ONLY public.user_addresses DROP CONSTRAINT IF EXISTS user_addresses_user_id_users_id_fk;
ALTER TABLE IF EXISTS ONLY public.products DROP CONSTRAINT IF EXISTS products_group_id_product_groups_id_fk;
ALTER TABLE IF EXISTS ONLY public.products DROP CONSTRAINT IF EXISTS products_category_id_product_categories_id_fk;
ALTER TABLE IF EXISTS ONLY public.products DROP CONSTRAINT IF EXISTS products_brand_id_brands_id_fk;
ALTER TABLE IF EXISTS ONLY public.product_slug_redirects DROP CONSTRAINT IF EXISTS product_slug_redirects_product_id_fkey;
ALTER TABLE IF EXISTS ONLY public.product_sizes DROP CONSTRAINT IF EXISTS product_sizes_product_id_products_id_fk;
ALTER TABLE IF EXISTS ONLY public.product_options DROP CONSTRAINT IF EXISTS product_options_product_id_fkey;
ALTER TABLE IF EXISTS ONLY public.product_images DROP CONSTRAINT IF EXISTS product_images_product_id_products_id_fk;
ALTER TABLE IF EXISTS ONLY public.product_groups DROP CONSTRAINT IF EXISTS product_groups_category_id_product_categories_id_fk;
ALTER TABLE IF EXISTS ONLY public.product_groups DROP CONSTRAINT IF EXISTS product_groups_brand_id_brands_id_fk;
ALTER TABLE IF EXISTS ONLY public.product_availability DROP CONSTRAINT IF EXISTS product_availability_store_id_stores_id_fk;
ALTER TABLE IF EXISTS ONLY public.product_availability DROP CONSTRAINT IF EXISTS product_availability_product_id_products_id_fk;
DROP INDEX IF EXISTS public.idx_session_expire;
DROP INDEX IF EXISTS public.idx_product_slug_redirects_product_id;
DROP INDEX IF EXISTS public.idx_product_slug_redirects_old_slug_unique;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_pkey;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_email_unique;
ALTER TABLE IF EXISTS ONLY public.user_orders DROP CONSTRAINT IF EXISTS user_orders_snipcart_order_id_unique;
ALTER TABLE IF EXISTS ONLY public.user_orders DROP CONSTRAINT IF EXISTS user_orders_pkey;
ALTER TABLE IF EXISTS ONLY public.user_favorites DROP CONSTRAINT IF EXISTS user_favorites_pkey;
ALTER TABLE IF EXISTS ONLY public.user_carts DROP CONSTRAINT IF EXISTS user_carts_pkey;
ALTER TABLE IF EXISTS ONLY public.user_addresses DROP CONSTRAINT IF EXISTS user_addresses_pkey;
ALTER TABLE IF EXISTS ONLY public.stores DROP CONSTRAINT IF EXISTS stores_pkey;
ALTER TABLE IF EXISTS ONLY public.session DROP CONSTRAINT IF EXISTS session_pkey;
ALTER TABLE IF EXISTS ONLY public.products DROP CONSTRAINT IF EXISTS products_slug_unique;
ALTER TABLE IF EXISTS ONLY public.products DROP CONSTRAINT IF EXISTS products_pkey;
ALTER TABLE IF EXISTS ONLY public.product_slug_redirects DROP CONSTRAINT IF EXISTS product_slug_redirects_pkey;
ALTER TABLE IF EXISTS ONLY public.product_sizes DROP CONSTRAINT IF EXISTS product_sizes_pkey;
ALTER TABLE IF EXISTS ONLY public.product_options DROP CONSTRAINT IF EXISTS product_options_pkey;
ALTER TABLE IF EXISTS ONLY public.product_images DROP CONSTRAINT IF EXISTS product_images_pkey;
ALTER TABLE IF EXISTS ONLY public.product_groups DROP CONSTRAINT IF EXISTS product_groups_slug_unique;
ALTER TABLE IF EXISTS ONLY public.product_groups DROP CONSTRAINT IF EXISTS product_groups_pkey;
ALTER TABLE IF EXISTS ONLY public.product_categories DROP CONSTRAINT IF EXISTS product_categories_slug_unique;
ALTER TABLE IF EXISTS ONLY public.product_categories DROP CONSTRAINT IF EXISTS product_categories_pkey;
ALTER TABLE IF EXISTS ONLY public.product_categories DROP CONSTRAINT IF EXISTS product_categories_name_unique;
ALTER TABLE IF EXISTS ONLY public.product_availability DROP CONSTRAINT IF EXISTS product_availability_pkey;
ALTER TABLE IF EXISTS ONLY public.contacts DROP CONSTRAINT IF EXISTS contacts_pkey;
ALTER TABLE IF EXISTS ONLY public.brands DROP CONSTRAINT IF EXISTS brands_slug_unique;
ALTER TABLE IF EXISTS ONLY public.brands DROP CONSTRAINT IF EXISTS brands_pkey;
ALTER TABLE IF EXISTS ONLY public.brands DROP CONSTRAINT IF EXISTS brands_name_unique;
ALTER TABLE IF EXISTS ONLY drizzle.__drizzle_migrations DROP CONSTRAINT IF EXISTS __drizzle_migrations_pkey;
ALTER TABLE IF EXISTS public.users ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.user_orders ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.user_favorites ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.user_carts ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.user_addresses ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.stores ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.products ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.product_slug_redirects ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.product_sizes ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.product_options ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.product_images ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.product_groups ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.product_categories ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.product_availability ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.contacts ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.brands ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS drizzle.__drizzle_migrations ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE IF EXISTS public.users_id_seq;
DROP TABLE IF EXISTS public.users;
DROP SEQUENCE IF EXISTS public.user_orders_id_seq;
DROP TABLE IF EXISTS public.user_orders;
DROP SEQUENCE IF EXISTS public.user_favorites_id_seq;
DROP TABLE IF EXISTS public.user_favorites;
DROP SEQUENCE IF EXISTS public.user_carts_id_seq;
DROP TABLE IF EXISTS public.user_carts;
DROP SEQUENCE IF EXISTS public.user_addresses_id_seq;
DROP TABLE IF EXISTS public.user_addresses;
DROP SEQUENCE IF EXISTS public.stores_id_seq;
DROP TABLE IF EXISTS public.stores;
DROP TABLE IF EXISTS public.session;
DROP SEQUENCE IF EXISTS public.products_id_seq;
DROP TABLE IF EXISTS public.products;
DROP SEQUENCE IF EXISTS public.product_slug_redirects_id_seq;
DROP TABLE IF EXISTS public.product_slug_redirects;
DROP SEQUENCE IF EXISTS public.product_sizes_id_seq;
DROP TABLE IF EXISTS public.product_sizes;
DROP SEQUENCE IF EXISTS public.product_options_id_seq;
DROP TABLE IF EXISTS public.product_options;
DROP SEQUENCE IF EXISTS public.product_images_id_seq;
DROP TABLE IF EXISTS public.product_images;
DROP SEQUENCE IF EXISTS public.product_groups_id_seq;
DROP TABLE IF EXISTS public.product_groups;
DROP SEQUENCE IF EXISTS public.product_categories_id_seq;
DROP TABLE IF EXISTS public.product_categories;
DROP SEQUENCE IF EXISTS public.product_availability_id_seq;
DROP TABLE IF EXISTS public.product_availability;
DROP SEQUENCE IF EXISTS public.contacts_id_seq;
DROP TABLE IF EXISTS public.contacts;
DROP SEQUENCE IF EXISTS public.brands_id_seq;
DROP TABLE IF EXISTS public.brands;
DROP SEQUENCE IF EXISTS drizzle.__drizzle_migrations_id_seq;
DROP TABLE IF EXISTS drizzle.__drizzle_migrations;
DROP SCHEMA IF EXISTS drizzle;
--
-- Name: drizzle; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA drizzle;


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: __drizzle_migrations; Type: TABLE; Schema: drizzle; Owner: -
--

CREATE TABLE drizzle.__drizzle_migrations (
    id integer NOT NULL,
    hash text NOT NULL,
    created_at bigint
);


--
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE; Schema: drizzle; Owner: -
--

CREATE SEQUENCE drizzle.__drizzle_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: drizzle; Owner: -
--

ALTER SEQUENCE drizzle.__drizzle_migrations_id_seq OWNED BY drizzle.__drizzle_migrations.id;


--
-- Name: brands; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.brands (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    slug character varying(100) NOT NULL,
    description text,
    logo text,
    website text
);


--
-- Name: brands_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.brands_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: brands_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.brands_id_seq OWNED BY public.brands.id;


--
-- Name: contacts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.contacts (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    phone text,
    message text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: contacts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.contacts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: contacts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.contacts_id_seq OWNED BY public.contacts.id;


--
-- Name: product_availability; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.product_availability (
    id integer NOT NULL,
    product_id integer NOT NULL,
    store_id integer NOT NULL,
    is_available boolean DEFAULT true,
    stock_quantity integer,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: product_availability_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.product_availability_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: product_availability_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.product_availability_id_seq OWNED BY public.product_availability.id;


--
-- Name: product_categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.product_categories (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    slug character varying(100) NOT NULL,
    description text,
    image text
);


--
-- Name: product_categories_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.product_categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: product_categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.product_categories_id_seq OWNED BY public.product_categories.id;


--
-- Name: product_groups; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.product_groups (
    id integer NOT NULL,
    slug character varying(200) NOT NULL,
    name character varying(200) NOT NULL,
    brand_id integer NOT NULL,
    category_id integer NOT NULL,
    description text NOT NULL,
    long_description text,
    features json,
    how_to_use text,
    warnings text,
    special_offer_text text,
    is_new boolean DEFAULT false,
    is_best_seller boolean DEFAULT false,
    has_special_offer boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: product_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.product_groups_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: product_groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.product_groups_id_seq OWNED BY public.product_groups.id;


--
-- Name: product_images; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.product_images (
    id integer NOT NULL,
    product_id integer NOT NULL,
    src text NOT NULL,
    alt text NOT NULL,
    is_primary boolean DEFAULT false
);


--
-- Name: product_images_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.product_images_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: product_images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.product_images_id_seq OWNED BY public.product_images.id;


--
-- Name: product_options; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.product_options (
    id integer NOT NULL,
    product_id integer NOT NULL,
    flavor text,
    size text,
    price_cents integer NOT NULL,
    original_price_cents integer,
    image text,
    in_stock boolean DEFAULT true
);


--
-- Name: product_options_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.product_options_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: product_options_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.product_options_id_seq OWNED BY public.product_options.id;


--
-- Name: product_sizes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.product_sizes (
    id integer NOT NULL,
    product_id integer NOT NULL,
    value character varying(50) NOT NULL,
    unit character varying(20) NOT NULL,
    price integer NOT NULL
);


--
-- Name: product_sizes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.product_sizes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: product_sizes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.product_sizes_id_seq OWNED BY public.product_sizes.id;


--
-- Name: product_slug_redirects; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.product_slug_redirects (
    id integer NOT NULL,
    old_slug character varying(200) NOT NULL,
    new_slug character varying(200) NOT NULL,
    product_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: product_slug_redirects_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.product_slug_redirects_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: product_slug_redirects_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.product_slug_redirects_id_seq OWNED BY public.product_slug_redirects.id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products (
    id integer NOT NULL,
    slug character varying(200) NOT NULL,
    name character varying(200) NOT NULL,
    brand_id integer NOT NULL,
    category_id integer NOT NULL,
    description text NOT NULL,
    long_description text,
    features json,
    how_to_use text,
    warnings text,
    special_offer_text text,
    is_new boolean DEFAULT false,
    is_best_seller boolean DEFAULT false,
    has_special_offer boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    group_id integer,
    flavor character varying(100),
    size character varying(50),
    quantity character varying(50)
);


--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: session; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.session (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL
);


--
-- Name: stores; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.stores (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    address text NOT NULL,
    phone character varying(20) NOT NULL,
    email character varying(100),
    hours text NOT NULL,
    map_link text,
    is_new boolean DEFAULT false
);


--
-- Name: stores_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.stores_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: stores_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.stores_id_seq OWNED BY public.stores.id;


--
-- Name: user_addresses; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_addresses (
    id integer NOT NULL,
    user_id integer NOT NULL,
    street text NOT NULL,
    city text NOT NULL,
    postal_code text NOT NULL,
    province text NOT NULL,
    country text DEFAULT 'Italia'::text NOT NULL,
    is_default boolean DEFAULT false NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: user_addresses_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.user_addresses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_addresses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.user_addresses_id_seq OWNED BY public.user_addresses.id;


--
-- Name: user_carts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_carts (
    id integer NOT NULL,
    user_id integer NOT NULL,
    product_id integer NOT NULL,
    variant text NOT NULL,
    quantity integer NOT NULL,
    price integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: user_carts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.user_carts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_carts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.user_carts_id_seq OWNED BY public.user_carts.id;


--
-- Name: user_favorites; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_favorites (
    id integer NOT NULL,
    user_id integer NOT NULL,
    product_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: user_favorites_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.user_favorites_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_favorites_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.user_favorites_id_seq OWNED BY public.user_favorites.id;


--
-- Name: user_orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_orders (
    id integer NOT NULL,
    user_id integer NOT NULL,
    snipcart_order_id text NOT NULL,
    total integer NOT NULL,
    status text DEFAULT 'pending'::text NOT NULL,
    items json,
    shipping_address json,
    billing_address json,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: user_orders_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.user_orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.user_orders_id_seq OWNED BY public.user_orders.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    password text NOT NULL,
    email text NOT NULL,
    first_name text,
    last_name text,
    phone text,
    address text,
    city text,
    postal_code text,
    province text,
    country text DEFAULT 'Italia'::text,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    is_admin boolean DEFAULT false
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: __drizzle_migrations id; Type: DEFAULT; Schema: drizzle; Owner: -
--

ALTER TABLE ONLY drizzle.__drizzle_migrations ALTER COLUMN id SET DEFAULT nextval('drizzle.__drizzle_migrations_id_seq'::regclass);


--
-- Name: brands id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.brands ALTER COLUMN id SET DEFAULT nextval('public.brands_id_seq'::regclass);


--
-- Name: contacts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.contacts ALTER COLUMN id SET DEFAULT nextval('public.contacts_id_seq'::regclass);


--
-- Name: product_availability id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_availability ALTER COLUMN id SET DEFAULT nextval('public.product_availability_id_seq'::regclass);


--
-- Name: product_categories id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_categories ALTER COLUMN id SET DEFAULT nextval('public.product_categories_id_seq'::regclass);


--
-- Name: product_groups id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_groups ALTER COLUMN id SET DEFAULT nextval('public.product_groups_id_seq'::regclass);


--
-- Name: product_images id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_images ALTER COLUMN id SET DEFAULT nextval('public.product_images_id_seq'::regclass);


--
-- Name: product_options id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_options ALTER COLUMN id SET DEFAULT nextval('public.product_options_id_seq'::regclass);


--
-- Name: product_sizes id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_sizes ALTER COLUMN id SET DEFAULT nextval('public.product_sizes_id_seq'::regclass);


--
-- Name: product_slug_redirects id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_slug_redirects ALTER COLUMN id SET DEFAULT nextval('public.product_slug_redirects_id_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Name: stores id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stores ALTER COLUMN id SET DEFAULT nextval('public.stores_id_seq'::regclass);


--
-- Name: user_addresses id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_addresses ALTER COLUMN id SET DEFAULT nextval('public.user_addresses_id_seq'::regclass);


--
-- Name: user_carts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_carts ALTER COLUMN id SET DEFAULT nextval('public.user_carts_id_seq'::regclass);


--
-- Name: user_favorites id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_favorites ALTER COLUMN id SET DEFAULT nextval('public.user_favorites_id_seq'::regclass);


--
-- Name: user_orders id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_orders ALTER COLUMN id SET DEFAULT nextval('public.user_orders_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: __drizzle_migrations; Type: TABLE DATA; Schema: drizzle; Owner: -
--



--
-- Data for Name: brands; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.brands VALUES (1, '+WATT', 'watt', 'Integratori sportivi di alta qualità', NULL, NULL);
INSERT INTO public.brands VALUES (2, 'Vegetal +WATT', 'vegetal-watt', 'Linea vegana di integratori +WATT', NULL, NULL);
INSERT INTO public.brands VALUES (3, 'Advance Care', 'advance-care', NULL, NULL, NULL);
INSERT INTO public.brands VALUES (6, 'Premier', 'premier', 'Premier - Integratori alimentari di alta qualità per sportivi e fitness', NULL, NULL);
INSERT INTO public.brands VALUES (8, 'Volchem', 'mirabol', NULL, NULL, NULL);
INSERT INTO public.brands VALUES (9, 'Powerbar', 'powerbar', 'Nutrition sportiva di alta qualità per atleti', NULL, NULL);
INSERT INTO public.brands VALUES (10, 'Jamieson', 'jamieson', 'Vitamine e integratori naturali dal Canada', NULL, NULL);
INSERT INTO public.brands VALUES (11, 'WHY Sport', 'why-sport', 'Integratori italiani per lo sport', NULL, NULL);
INSERT INTO public.brands VALUES (12, '+Watt', 'plus-watt', 'Brand italiano leader negli integratori sportivi', NULL, NULL);
INSERT INTO public.brands VALUES (18, 'Epithelium', 'epithelium', 'Brand specializzato in dispositivi medici e protezioni sportive per la prevenzione e il trattamento di lesioni', NULL, NULL);
INSERT INTO public.brands VALUES (20, 'Advance Care +WATT', 'advance-care-watt', 'Linea premium Advance Care del brand +WATT per integratori di alta qualità', NULL, NULL);
INSERT INTO public.brands VALUES (21, 'ProNutrition', 'pro-nutrition', 'Brand specializzato in integratori per la nutrizione sportiva', NULL, NULL);
INSERT INTO public.brands VALUES (22, 'EthicSport', 'ethicsport', 'Brand di integratori sportivi di alta qualità', NULL, NULL);
INSERT INTO public.brands VALUES (23, 'ProLabs', 'prolabs', 'Brand specializzato in integratori sportivi di alta qualità', NULL, NULL);
INSERT INTO public.brands VALUES (25, 'Pronutrition', 'pronutrition', 'Brand specializzato in integratori alimentari per sportivi', NULL, NULL);


--
-- Data for Name: contacts; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.contacts VALUES (1, 'Test User', 'test@example.com', '123456789', 'Test message per verificare il funzionamento del form contatti', '2025-06-09 09:05:23.435006');
INSERT INTO public.contacts VALUES (2, 'andrea lucà', 'lucaandrea264@gmail.com', '377556565665', 'ciaooooooooooo', '2025-06-09 09:06:02.944933');
INSERT INTO public.contacts VALUES (3, 'sjejsj sushs', 'lucaandrea264@gmail.com', '34849169487', 'ciaooooooo', '2025-06-09 12:33:07.464214');
INSERT INTO public.contacts VALUES (4, 'andrea lica', 'lucaandrea264@gmail.com', '3770842799', 'hshsjsjajjajsjaj', '2025-06-09 16:05:07.230089');
INSERT INTO public.contacts VALUES (5, 'andrea lica', 'lucaandrea264@gmail.com', '3770842799', 'hshsjsjajjajsjaj', '2025-06-09 16:05:53.11446');
INSERT INTO public.contacts VALUES (6, 'andrea lucà', 'lucaandrea264@gmail.com', '3770842799', 'ciao, hai delle proteine?', '2025-06-23 13:41:35.256113');
INSERT INTO public.contacts VALUES (7, 'andrea lucà', 'lucaandrea264@gmail.com', '3770842799', 'ciao, hai delle proteine?', '2025-06-23 13:41:38.56991');
INSERT INTO public.contacts VALUES (8, 'andrea lucà', 'lucaandrea264@gmail.com', '3770842799', 'ciao, hai delle proteine?', '2025-06-23 13:41:48.072417');
INSERT INTO public.contacts VALUES (9, 'andrea lucà', 'lucaandrea264@gmail.com', '3770842799', 'ciao, hai delle proteine?', '2025-06-23 13:41:57.943251');
INSERT INTO public.contacts VALUES (10, 'andrea lucà', 'lucaandrea264@gmail.com', '3770842799', 'ciao, hai delle proteine?', '2025-06-23 13:42:08.62381');
INSERT INTO public.contacts VALUES (11, 'andrea lucà', 'lucaandrea264@gmail.com', '3770842799', 'ciao, hai degli amminoacidi?', '2025-06-23 13:49:22.903209');
INSERT INTO public.contacts VALUES (12, 'andrea lucà', 'lucaandrea264@gmail.com', '3770842799', 'ciao, hai degli amminoacidi?', '2025-06-23 13:52:34.836111');
INSERT INTO public.contacts VALUES (13, 'andrea lucà', 'lucaandrea264@gmail.com', '3770842799', 'ciao, hai degli amminoacidi?', '2025-06-23 13:55:08.935397');
INSERT INTO public.contacts VALUES (14, 'andrea lucà', 'lucaandrea264@gmail.com', '3770842799', 'ciao, hai degli amminoacidi?', '2025-06-23 14:04:23.797947');
INSERT INTO public.contacts VALUES (15, 'andrea lucà', 'lucaandrea264@gmail.com', '3770842799', 'ciao, hai degli amminoacidi?', '2025-06-23 14:16:42.142086');
INSERT INTO public.contacts VALUES (16, 'andrea lucà', 'lucaandrea264@gmail.com', '3770842799', 'ciao, hai degli amminoacidi?', '2025-06-23 14:20:05.058447');
INSERT INTO public.contacts VALUES (17, 'andrea lucà', 'lucaandrea264@gmail.com', '3770842799', 'ciao, hai degli amminoacidi?', '2025-06-23 14:23:17.094507');
INSERT INTO public.contacts VALUES (18, 'andrea lucà', 'lucaandrea264@gmail.com', '3770842799', 'ciao, hai degli amminoacidi?', '2025-06-23 14:25:43.230938');
INSERT INTO public.contacts VALUES (19, 'andrea lucà', 'lucaandrea264@gmail.com', '3770842799', 'ciao, hai degli amminoacidi?', '2025-06-23 14:32:03.534876');
INSERT INTO public.contacts VALUES (20, 'andrea lucà', 'lucaandrea264@gmail.com', '3770842799', 'ciao, hai degli amminoacidi?', '2025-06-23 14:38:29.192647');
INSERT INTO public.contacts VALUES (21, 'andrea lucà', 'lucaandrea264@gmail.com', '3343434343443', 'ciao! che proteine avete?', '2025-06-27 17:39:47.937101');
INSERT INTO public.contacts VALUES (22, 'andrea lucà', 'lucaandrea264@gmail.com', '3343434343443', 'ciao! che proteine avete?', '2025-06-27 17:45:48.554615');
INSERT INTO public.contacts VALUES (23, 'andrea lucà', 'lucaandrea264@gmail.com', '3343434343443', 'ciao! che proteine avete?', '2025-06-27 17:49:40.344101');
INSERT INTO public.contacts VALUES (24, 'gianfranco ', 'lucaandrea264@gmail.com', '3343434343443', 'ciao! che proteine avete?', '2025-06-27 17:51:31.072694');
INSERT INTO public.contacts VALUES (25, 'gianfranco ', 'lucaandrea264@gmail.com', '3343434343443', 'ciao! che proteine avete?', '2025-06-27 18:00:00.769905');
INSERT INTO public.contacts VALUES (26, 'franco', 'lucaandrea264@gmail.com', '3343434343443', 'ciao! che proteine avete?', '2025-06-27 18:02:16.499229');
INSERT INTO public.contacts VALUES (27, 'franco', 'lucaandrea264@gmail.com', '3343434343443', 'ciao! che proteine avete?', '2025-06-27 18:13:03.738074');
INSERT INTO public.contacts VALUES (28, 'luigi', 'lucaandrea264@gmail.com', '3343434343443', 'ciao! che proteine avete?', '2025-06-27 18:14:26.687379');
INSERT INTO public.contacts VALUES (29, 'luigi', 'lucaandrea264@gmail.com', '3343434343443', 'ciao! che proteine avete?', '2025-06-27 18:16:45.582292');
INSERT INTO public.contacts VALUES (30, 'luigi', 'lucaandrea264@gmail.com', '3343434343443', 'ciao! che proteine avete?', '2025-06-27 18:17:59.926958');
INSERT INTO public.contacts VALUES (31, 'luigi', 'lucaandrea264@gmail.com', '3343434343443', 'ciao! che proteine avete?', '2025-06-27 18:28:51.193785');
INSERT INTO public.contacts VALUES (32, 'andrea', 'lucaandrea264@gmail.com', '321321321', 'ciao, che tipi di creatina avete?', '2025-06-28 10:36:55.279133');
INSERT INTO public.contacts VALUES (33, 'andrea', 'lucaandrea264@gmail.com', '3343434343443', 'ciao! che tipi di proteine avete?
', '2025-06-28 10:38:10.596776');
INSERT INTO public.contacts VALUES (34, 'andrea', 'lucaandrea264@gmail.com', '3211231111', 'ciao, che proteine avete?', '2025-06-28 16:55:32.352956');
INSERT INTO public.contacts VALUES (35, 'andrea', 'lucaandrea264@gmail.com', '3770842799', 'ciao, che proteine avete?', '2025-06-28 16:59:11.042924');
INSERT INTO public.contacts VALUES (36, 'andrea', 'lucaandrea264@gmail.com', '3211231111', 'ciao, che creatina aveete?', '2025-06-28 17:03:51.64722');
INSERT INTO public.contacts VALUES (37, 'andrea', 'lucaandrea264@gmail.com', '32110101010', 'sdnsdbjsdnbnd', '2025-06-28 17:05:01.531581');


--
-- Data for Name: product_availability; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: product_categories; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.product_categories VALUES (1, 'Proteine', 'proteine', 'Whey, caseina e proteine vegetali di alta qualità per il recupero muscolare', NULL);
INSERT INTO public.product_categories VALUES (8, 'Alimenti Fit', 'alimenti-fit', 'Barrette proteiche ed energetiche per il supporto nutrizionale durante lo sport', NULL);
INSERT INTO public.product_categories VALUES (2, 'Aminoacidi e Creatina', 'aminoacidi-e-creatina', 'BCAA e aminoacidi essenziali per supportare la crescita muscolare e il recupero', NULL);
INSERT INTO public.product_categories VALUES (7, 'Supplementi', 'supplementi', 'Vitamine, minerali e micronutrienti per il benessere generale', NULL);
INSERT INTO public.product_categories VALUES (3, 'Pre workout/Energetici', 'pre-workout-energetici', 'Carboidrati e fonti di energia per gli allenamenti intensi', NULL);
INSERT INTO public.product_categories VALUES (6, 'Merchandising e Cosmetici', 'merchandising-e-cosmetici', 'Abbigliamento tecnico, guanti, cinture e accessori per allenarsi al meglio', NULL);
INSERT INTO public.product_categories VALUES (5, 'Dimagranti', 'dimagranti', 'Integratori brucia grassi e dimagranti', NULL);
INSERT INTO public.product_categories VALUES (23, 'Amminoacidi', 'aminoacidi', 'Prodotti per amminoacidi e recupero muscolare', NULL);
INSERT INTO public.product_categories VALUES (24, 'Creatina', 'creatina', 'Prodotti per creatina e performance muscolare', NULL);
INSERT INTO public.product_categories VALUES (25, 'Vitamine e Minerali', 'vitamine-minerali', 'Integratori vitaminici e minerali per il benessere quotidiano', '/images/categories/vitamine-minerali.jpg');
INSERT INTO public.product_categories VALUES (28, 'Massa', 'massa', 'Integratori per l''aumento della massa muscolare', NULL);
INSERT INTO public.product_categories VALUES (29, 'Accessori', 'accessori', 'Accessori per il fitness e lo sport', NULL);


--
-- Data for Name: product_groups; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.product_groups VALUES (1, 'premier-whey-protein-group', 'Premier Whey Protein', 6, 1, 'Proteine del siero Premier disponibili in diversi gusti e formati', NULL, NULL, NULL, NULL, NULL, false, false, false, '2025-06-08 19:42:19.179444');
INSERT INTO public.product_groups VALUES (2, 'mirabol-whey-94-group', 'Mirabol Whey 94', 8, 1, 'Proteine del siero Mirabol ad alta concentrazione 94% con diverse varianti', NULL, NULL, NULL, NULL, NULL, false, false, false, '2025-06-08 19:42:19.179444');
INSERT INTO public.product_groups VALUES (3, 'whey-protein-90-group', 'Whey Protein 90', 8, 1, 'Proteine del siero concentrate 90% in diversi formati e gusti', NULL, NULL, NULL, NULL, NULL, false, false, false, '2025-06-08 19:42:19.179444');
INSERT INTO public.product_groups VALUES (4, 'norincol-marine-collagen-group', 'Norincol Marine Collagen', 8, 7, 'Collagene marino idrolizzato per pelle elastica e articolazioni sane', NULL, NULL, NULL, NULL, NULL, false, false, false, '2025-06-24 16:00:15.465238');
INSERT INTO public.product_groups VALUES (5, 'sali-activator-group', 'Sali Activator 1:0,8', 1, 7, 'Sali minerali con rapporto ottimale sodio-potassio per idratazione sportiva', NULL, NULL, NULL, NULL, NULL, false, false, false, '2025-06-24 16:00:15.465238');
INSERT INTO public.product_groups VALUES (8, 'wpc-100', 'WPC 100%', 11, 1, 'Proteine concentrate del siero di latte ad elevata solubilità e digeribilità, ideali per aumentare la massa muscolare', NULL, NULL, NULL, NULL, NULL, false, false, false, '2025-06-25 22:12:41.015138');
INSERT INTO public.product_groups VALUES (9, 'perfect-100-whey', 'Perfect 100% Whey', 11, 1, 'Proteine del siero del latte di alta qualità con eccellente solubilità per atleti e sportivi', NULL, NULL, NULL, NULL, NULL, false, false, false, '2025-06-25 22:14:10.941774');
INSERT INTO public.product_groups VALUES (10, 'essential-100-whey', 'Essential 100% Whey', 11, 1, 'Proteine del siero del latte essenziali per il recupero muscolare e la crescita della massa magra', NULL, NULL, NULL, NULL, NULL, false, false, false, '2025-06-25 22:14:49.829907');
INSERT INTO public.product_groups VALUES (11, 'perfect-blend-90', 'Perfect Blend 90', 1, 1, 'Miscela proteica avanzata con 90% di proteine per massimizzare la sintesi proteica e il recupero muscolare', NULL, NULL, NULL, NULL, NULL, false, false, false, '2025-06-25 22:15:16.780627');
INSERT INTO public.product_groups VALUES (12, 'top-100-xp-cacao', 'Top 100 XP Cacao', 1, 1, 'Proteine del siero del latte di alta qualità con gusto cacao intenso, ideali per chi inizia', NULL, NULL, NULL, NULL, NULL, false, false, false, '2025-06-25 22:15:42.59249');
INSERT INTO public.product_groups VALUES (13, 'vegetal-100-protein', 'Vegetal 100% Protein', 1, 1, 'Proteine vegetali complete da fonti vegetali selezionate, ideali per vegani e vegetariani', NULL, NULL, NULL, NULL, NULL, false, false, false, '2025-06-25 22:16:12.549982');
INSERT INTO public.product_groups VALUES (14, 'hydrolyzed-100-whey', 'Hydrolyzed 100% Whey', 1, 1, 'Proteine del siero del latte idrolizzate per assorbimento rapido e massima biodisponibilità', NULL, NULL, NULL, NULL, NULL, false, false, false, '2025-06-25 22:16:37.279565');
INSERT INTO public.product_groups VALUES (16, 'power-whey-amino-support', 'Power Whey Amino Support', 23, 1, 'POWER WHEY AMINO SUPPORT è un integratore alimentare di proteine con aminoacidi, a solubilità istantanea e di ottimo gusto.', 'POWER WHEY AMINO SUPPORT è un integratore alimentare di proteine con aminoacidi, a solubilità istantanea e di ottimo gusto. POWER WHEY AMINO SUPPORT è formulato con proteine del siero di latte, proteine di elevato valore biologico. Le proteine contribuiscono alla crescita e al mantenimento della massa muscolare. Alla sua formula proteica abbiamo aggiunto L-glutammina, Creatina, aminoacidi e Vitamina B6, per renderla particolarmente indicata nell''alimentazione dello sportivo, sia di chi fa bodybuilding che altri sport. La vitamina B6 è stata inclusa per contribuire al normale metabolismo delle proteine e del glicogeno e alla riduzione della stanchezza e dell''affaticamento. POWER WHEY AMINO SUPPORT è adatto ai vegetariani.', '["Per porzione (30g): Energia 458 kJ/108 kcal", "Grassi 1,4 g", "Carboidrati 2,9 g", "Proteine 21 g", "Sale 0,16 g", "Vitamina B6 0,42 mg", "Creatina 1500 mg", "L-Lisina 2000 mg", "L-Treonina 2000 mg", "L-Glicina 2000 mg", "Glutammina 2000 mg"]', 'Assumere una porzione da 30 g (2 misurini) al giorno miscelata con 220 ml di acqua o altro liquido a scelta. Il volume di liquido aggiunto influisce sull''intensità del gusto e sulla densità del preparato, non influisce sulla digeribilità o assimilabilità. Assumere il prodotto come spuntino durante la giornata, lontano dai pasti principali, oppure dopo gli allenamenti o attività sportiva.', 'Ingredienti: Proteine del siero di LATTE concentrate [emulsionante: lecitina (contiene SOIA)]; Proteine del siero di LATTE; Mix amino support (L-Glutammina, L-Lisina, L-Treonina, L-Glicina, Creatina monoidrato); Addensante: E1200; Aromi; Sale; Edulcorante: sucralosio; Piridossina cloridrato (Vitamina B6).', NULL, false, false, false, '2025-08-04 07:27:16.353733');
INSERT INTO public.product_groups VALUES (17, 'prime-casein', 'Prime Casein', 23, 1, 'PRIME CASEIN è un integratore alimentare di proteine con edulcorante, a base di caseine micellari (da proteine del latte) particolarmente adatto agli sportivi, a solubilità istantanea.', 'PRIME CASEIN è un integratore alimentare di proteine con edulcorante, a base di caseine micellari (da proteine del latte) particolarmente adatto agli sportivi, a solubilità istantanea. Le caseine sono una fonte proteica ad alto valore biologico, hanno tempi di digestione lenti e rilasciano gradualmente gli aminoacidi contenuti. Le proteine contribuiscono alla crescita e al mantenimento della massa muscolare. La vitamina B6 contenuta nel prodotto contribuisce al normale metabolismo delle proteine e del glicogeno e alla riduzione della stanchezza e dell''affaticamento.', '["Per porzione (30g): Energia 480 KJ/112 kcal", "Grassi 0,4 g", "Carboidrati 1,1 g", "Proteine 26 g", "Sale 0,13 mg", "Vitamina B6 0,42 mg", "BCAA totali 21,30%", "L-Leucina 9,50%", "L-Isoleucina 5,20%", "L-Valina 6,60%"]', 'Assumere una porzione da 30 g (3 misurini) al giorno miscelata con 200-300 ml di acqua o altro liquido a scelta. Il volume di liquido aggiunto influisce sull''intensità del gusto e sulla densità del preparato, non influisce sulla digeribilità o assimilabilità. Assumere il prodotto durante la giornata come spuntino, lontano dai pasti principali, oppure dopo gli allenamenti o l''attività sportiva o prima di coricarsi.', 'Ingredienti: Caseine micellari da proteine del LATTE; Aromi; Sale; Edulcorante: sucralosio; Piridossina cloridrato (Vitamina B6).', NULL, false, false, false, '2025-08-04 07:27:16.353733');
INSERT INTO public.product_groups VALUES (18, 'prime-oat', 'Prime Oat', 23, 8, 'PRIME OAT - Farina di fiocchi di avena aromatizzata con edulcoranti, dall''ottimo gusto, senza zuccheri aggiunti (contiene naturalmente zuccheri).', 'PRIME OAT - Farina di fiocchi di avena aromatizzata con edulcoranti, dall''ottimo gusto, senza zuccheri aggiunti (contiene naturalmente zuccheri). PRIME OAT è ad alto contenuto di fibre e senza olio di palma, non contiene ingredienti di origine animale ed è adatto ai vegani. Una porzione di PRIME OAT fornisce 2 g di beta-glucani, che contribuiscono al mantenimento di livelli normali di colesterolo nel sangue.', '["Beta-glucani 2g per porzione", "Alto contenuto di fibre", "Senza zuccheri aggiunti", "Senza olio di palma", "Adatto ai vegani"]', 'L''effetto benefico si ottiene con l''assunzione giornaliera di 3 g di beta-glucani da avena, crusca d''avena, orzo o crusca d''orzo o da miscele di tali beta-glucani. Una dieta varia ed equilibrata e uno stile di vita sano sono importanti. Conservare in luogo asciutto e lontano da fonti di calore.', 'Adatto ai vegani. Senza olio di palma. Alto contenuto di fibre.', NULL, false, false, false, '2025-08-04 07:27:16.353733');
INSERT INTO public.product_groups VALUES (19, 'prime-whey-hydro-plus', 'Prime Whey Hydro Plus', 23, 1, 'PRIME WHEY HYDRO PLUS è un integratore alimentare di proteine del siero di latte concentrate, isolate mediante microfiltrazione a flusso incrociato e idrolizzate con edulcoranti, particolarmente adatto agli sportivi.', 'PRIME WHEY HYDRO PLUS è un integratore alimentare di proteine del siero di latte concentrate, isolate mediante microfiltrazione a flusso incrociato e idrolizzate con edulcoranti, particolarmente adatto agli sportivi. PRIME WHEY HYDRO PLUS è a base di proteine del siero di latte di altissima qualità, non denaturate e ottenute a bassa temperatura, ha solubilità istantanea ed un ottimo gusto.', '["Per porzione (30g): Energia 494 kJ/117 kcal", "Proteine 23 g", "BCAA totali 22,90%", "L-Leucina 10,60%", "Vitamina B6 0,42 mg"]', 'Assumere una porzione da 30 g (2,5 misurini) al giorno miscelata con 150-200 ml di acqua o altro liquido a scelta. Assumere il prodotto come spuntino lontano dai pasti principali, oppure dopo l''attività sportiva.', 'Ingredienti: Proteine del siero di LATTE concentrate, isolate e idrolizzate, emulsionante lecitina; Cacao in polvere; Aromi; Addensante: gomma xantano, Sale; Edulcorante: sucralosio; Piridossina cloridrato (Vitamina B6).', NULL, false, false, false, '2025-08-04 07:30:02.038222');
INSERT INTO public.product_groups VALUES (20, 'prime-wpi', 'Prime WPI', 23, 1, 'PRIME WPI è un integratore alimentare di proteine del siero di latte isolate a solubilità istantanea, con edulcorante', 'PRIME WPI è un integratore alimentare di proteine del siero di latte isolate a solubilità istantanea, con edulcorante. Le proteine del siero di latte isolate contenute in PRIME WPI sono di elevatissima purezza: con l''innovativo sistema di microfiltrazione, che opera a bassa temperatura, si ottengono purissime proteine non denaturate. PRIME WPI è arricchito con bromelina da ananas, con funzione digestiva.', '["Per porzione (30g): Energia 456 kJ/107 kcal", "Proteine 26 g", "BCAA totali 22,90%", "Bromelina 2400 GDU 30 mg", "Vitamina B6 0,42 mg"]', 'Assumere una porzione da 30 g (3 misurini) al giorno miscelata con 130-200 ml di acqua o altro liquido a scelta. Assumere il prodotto come spuntino durante la giornata, lontano dai pasti principali, oppure dopo gli allenamenti o attività sportiva.', 'Ingredienti: Purissime proteine del siero di LATTE isolate mediante ultrafiltrazione a flusso incrociato e microfiltrazione; Aromi; Addensante: gomma xantano; Sale; Edulcorante: sucralosio; Bromelina 2400 GDU; Piridossina cloridrato (Vitamina B6).', NULL, false, false, false, '2025-08-04 07:30:02.038222');
INSERT INTO public.product_groups VALUES (21, 'pure-soy-isolate', 'Pure Soy Isolate', 23, 1, 'PURE SOY ISOLATE è un integratore alimentare di proteine isolate della soia a solubilità istantanea con edulcorante, da ricostituire a bevanda.', 'PURE SOY ISOLATE è un integratore alimentare di proteine isolate della soia a solubilità istantanea con edulcorante, da ricostituire a bevanda. Per questo integratore Prolabs ha scelto un isolato di proteine di soia della massima purezza e solubilità. PURE SOY ISOLATE apporta la vitamina B12, vitamina del gruppo B di cui i vegani possono avere ridotti apporti dalla dieta. PURE SOY ISOLATE è indicato per i vegetariani e vegani.', '["Per porzione (30g): Energia 477 kJ/113 kcal", "Proteine 27 g", "Vitamina B6 0,42 mg", "Vitamina B12 1,25 mcg", "Adatto ai vegani"]', 'Aggiungere 3 misurini (30 g) di PURE SOY ISOLATE in 200 - 250 ml di acqua ed assumere una volta al giorno, lontano dai pasti principali. Ottima per essere utilizzata a colazione, a merenda, in post workout o prima di coricarsi.', 'Ingredienti: Proteine della SOIA isolate; Cacao in polvere; Aromi; Sale; Edulcorante: sucralosio; Piridossina cloridrato (vitamina B6); Cianocobalamina (vitamina B12).', NULL, false, false, false, '2025-08-04 07:30:24.624867');
INSERT INTO public.product_groups VALUES (22, 'ram-1000-bcaa', 'RAM 1000 BCAA', 23, 2, 'RAM 1000 è un integratore alimentare di aminoacidi a catena ramificata ottenuti mediante fermentazione, con vitamine B1 e B6.', 'RAM 1000 è un integratore alimentare di aminoacidi a catena ramificata ottenuti mediante fermentazione, con vitamine B1 e B6. I BCAA sono aminoacidi essenziali, l''organismo infatti non è in grado di sintetizzarli e devono pertanto essere assunti attraverso la dieta. RAM 1000 è realizzato in compresse da 1000 mg nel classico rapporto 2:1:1. Non contiene ingredienti di origine animale ed è adatto anche ai vegani.', '["Per 5 compresse: Aminoacidi a catena ramificata 5.000 mg", "L-Leucina 2.500 mg", "L-Valina 1.250 mg", "L-Isoleucina 1.250 mg", "Vit. B1 0,33 mg", "Vit. B6 0,6 mg", "Adatto ai vegani"]', 'Deglutire 5 compresse al giorno con acqua o altro liquido a scelta 30-40 minuti prima degli allenamenti o competizioni. Nelle giornate in cui non si pratica attività sportiva il prodotto può essere assunto in qualsiasi momento della giornata.', 'Ingredienti: L-Leucina; L-Isoleucina; L-Valina; Stabilizzante: cellulosa microcristallina; Antiagglomeranti: biossido di silicio, sali di magnesio degli acidi grassi (origine vegetale); Piridossina cloridrato (vit. B6); Tiamina cloridrato (vit. B1).', NULL, false, false, false, '2025-08-04 07:32:11.944963');
INSERT INTO public.product_groups VALUES (23, 'taurina-1000-mg', 'Taurina 1000mg', 23, 3, 'TAURINA 1000 è un integratore alimentare di taurina di elevata purezza, in compresse da 1000 mg.', 'TAURINA 1000 è un integratore alimentare di taurina di elevata purezza, in compresse da 1000 mg. La taurina viene attualmente considerata un amminoacido condizionatamente essenziale. La taurina ha proprietà antinfiammatorie naturali, aiuta a sostenere il recupero muscolare, la salute del cuore, degli occhi, del fegato e la funzione cerebrale. Non contiene ingredienti di origine animale ed è adatto anche ai vegani.', '["Per compressa: Taurina 1000 mg", "Proprietà antinfiammatorie naturali", "Supporta il recupero muscolare", "Adatto ai vegani"]', 'Assumere una compressa al giorno con acqua o altro liquido a scelta, in qualunque momento della giornata.', 'Ingredienti: Taurina; Stabilizzante: cellulosa microcristallina; Stabilizzante: idrossipropilmetilcellulosa; Agenti antiagglomeranti: sali di magnesio degli acidi grassi (origine vegetale), biossido di silicio.', NULL, false, false, false, '2025-08-04 07:32:13.368805');
INSERT INTO public.product_groups VALUES (24, 'thermogenic-force', 'Thermogenic Force', 23, 7, 'THERMOGENIC FORCE è un integratore alimentare coadiuvante delle diete ipocaloriche controllate per la riduzione del peso corporeo.', 'THERMOGENIC FORCE è un integratore alimentare coadiuvante delle diete ipocaloriche controllate per la riduzione del peso corporeo. Il Citrus aurantium favorisce l''equilibrio del peso corporeo e stimola il metabolismo. Il Cacao titolato in teobromina ha azione tonica, di sostegno metabolico, ha azione antiossidante e inoltre sostiene il tono dell''umore. Il caffè verde ha azione tonica, di sostegno metabolico e antiossidante. Non contiene ingredienti di origine animale ed è adatto anche ai vegani.', '["Per 2 compresse: Caffeina 200 mg", "Sinefrina 12 mg", "Teobromina 15 mg", "Acido clorogenico 67,5 mg", "L-Tirosina 360 mg", "Adatto ai vegani"]', 'Deglutire 2 compresse al giorno prima dei pasti principali o durante la giornata con acqua o altro liquido a scelta.', 'Ingredienti: Cellulosa microcristallina; L-Tirosina; Cacao e.s. tit. 6% in teobromina; Caffeina; Caffè verde estratto secco 45% acido clorogenico; Arancio amaro e.s. tit. 10% in sinefrina; Agenti antiagglomeranti: biossido di silicio, sali di magnesio degli acidi grassi.', NULL, false, false, false, '2025-08-04 07:32:25.108222');
INSERT INTO public.product_groups VALUES (25, 'total-protein-blend', 'Total Protein Blend', 23, 1, 'TOTAL PROTEIN è un integratore alimentare di proteine formulato con una combinazione di proteine a diverso tempo di assimilazione.', 'TOTAL PROTEIN è un integratore alimentare di proteine formulato con una combinazione di proteine a diverso tempo di assimilazione. Fornisce proteine di alta qualità e di alto valore biologico provenienti da sei fonti diverse: proteine totali del latte, proteine del siero di latte isolate, caseine micellari, proteine del siero di latte idrolizzate, proteine del siero di latte concentrate, proteine dell''albume d''uovo. TOTAL PROTEIN ha un gusto cremoso e delizioso ed è molto solubile.', '["Per porzione (30g): Energia 471 KJ/111 kcal", "Proteine 26 g", "BCAA totali 21,50%", "L-Leucina 9,41%", "6 fonti proteiche diverse", "Vitamina B6 0,42 mg"]', 'Assumere una porzione da 30 g (3 misurini) al giorno miscelata con 200 ml di acqua o altro liquido a scelta. Si consiglia di assumere il prodotto durante la giornata come spuntino, oppure a colazione, dopo l''attività sportiva o prima di coricarsi.', 'Ingredienti: Total protein blend (Proteine totali del LATTE, Proteine del siero di LATTE isolate, Caseine micellari da proteine del LATTE; Proteine del siero di LATTE idrolizzate, concentrate, Proteine dell''albume d''UOVO); Aromi; Sale; Edulcorante: sucralosio; Piridossina cloridrato (Vitamina B6).', NULL, false, false, false, '2025-08-04 07:33:30.755715');
INSERT INTO public.product_groups VALUES (26, 'tribulus-1000-plus', 'Tribulus 1000 Plus', 23, 7, 'TRIBULUS 1000 PLUS è un integratore alimentare di Tribulus Terrestris di elevatissima qualità, garantito estratto dal frutto.', 'TRIBULUS 1000 PLUS è un integratore alimentare di Tribulus Terrestris di elevatissima qualità, garantito estratto dal frutto, infatti solo il frutto del tribulus ha le proprietà tipiche azione tonica e di sostegno metabolico conferite a questo vegetale. Ogni compressa di TRIBULUS 1000 contiene 1000 mg di estratto di Tribulus Terrestris titolato al 90% di saponine. Non contiene ingredienti di origine animale.', '["Per compressa: Tribulus Terrestris 1000 mg", "Titolato al 90% in saponine", "Estratto dal frutto", "Azione tonica e di sostegno metabolico"]', 'Deglutire 1 compressa al giorno, in qualunque momento della giornata, con acqua o altro liquido a scelta.', 'Ingredienti: Tribulus Terrestris L. (frutto) estratto secco titolato al 90% in saponine; Stabilizzante: cellulosa microcristallina; Agenti antiagglomeranti: sali di magnesio degli acidi grassi, biossido di silicio.', NULL, false, false, false, '2025-08-04 07:33:37.226414');
INSERT INTO public.product_groups VALUES (27, 'vitamin-c-1000-mg', 'Vitamin C 1000 mg', 23, 7, 'Integratore alimentare di vitamina C', 'Integratore alimentare di vitamina C. La vitamina C contribuisce alle seguenti normali funzioni fisiologiche: la funzionalità del sistema nervoso, la funzionalità del sistema immunitario, l''assorbimento del ferro, il metabolismo energetico, la protezione delle cellule dallo stress ossidativo, la riduzione della stanchezza e dell''affaticamento, la funzionalità del sistema immunitario durante e dopo l''intenso esercizio fisico. Non contiene ingredienti di origine animale.', '["Per compressa: Vitamina C 1000 mg", "1250% VNR", "Supporta il sistema immunitario", "Protezione antiossidante", "Riduce stanchezza e affaticamento"]', 'Deglutire una compressa al giorno con acqua o altro liquido a scelta, preferibilmente al pasto principale.', 'Ingredienti: Acido L-ascorbico; emulsionante: cellulosa microcristallina; stabilizzante: idrossipropilmetilcellulosa; agenti antiagglomeranti: biossido di silicio, sali di magnesio degli acidi grassi.', NULL, false, false, false, '2025-08-04 07:33:43.599721');
INSERT INTO public.product_groups VALUES (28, 'vitamina-d3-2000-ui-prolabs', 'Vitamina D3 2000 UI', 23, 7, 'Vitamina D3 2000 UI è un integratore alimentare di vitamina D3 ad alto dosaggio.', 'Vitamina D3 2000 UI è un integratore alimentare di vitamina D3 ad alto dosaggio. Realizzato in pratiche microcompresse, facili da deglutire, che apportano 50 mcg di vitamina D3. La vitamina D3 contribuisce al normale mantenimento delle ossa, dei denti e della funzione muscolare. Inoltre supporta fisiologicamente la funzione del sistema immunitario.', '["Per microcompressa: Vitamina D3 2.000 U.I./50 mcg", "1000% VNR", "Supporta ossa e denti", "Funzione muscolare", "Sistema immunitario"]', 'Assumere una microcompressa al giorno con acqua o altra bevanda a scelta, in qualunque momento della giornata.', 'Ingredienti: Agente di carica: cellulosa microcristallina; Agenti antiagglomeranti: biossido di silicio, sali di magnesio degli acidi grassi (origine vegetale); colecalciferolo (vitamina D3).', NULL, false, false, false, '2025-08-04 07:34:38.162994');
INSERT INTO public.product_groups VALUES (29, 'viteral', 'Viteral', 23, 7, 'VITERAL è un integratore alimentare di Vitamine e Minerali completo, con Luteina e Antiossidanti.', 'VITERAL è un integratore alimentare di Vitamine e Minerali completo, con Luteina e Antiossidanti. La sua formula concentrata racchiude in una sola compressa al giorno l''apporto adeguato di vitamine, minerali a altri nutrienti utili per mantenere in buona efficienza l''organismo. Non contiene ingredienti di origine animale.', '["Completo multivitaminico e minerale", "Con Luteina e antiossidanti", "Una compressa al giorno", "Vitamine A, C, D, E, K2, gruppo B", "Minerali: Calcio, Magnesio, Zinco, Ferro, Selenio"]', 'Si consiglia l''assunzione di una compressa al giorno ai pasti.', 'Ingredienti: Sali di calcio dell''acido ortofosforico; Ossido di magnesio; Vit. C (acido L-ascorbico); Vit. E; PABA; Niacina; Proantocianidine da Uva; Fumarato ferroso; Acido Pantotenico; Vit. A; Vit. K2; Luteina; Vit. B12; Ossido di zinco; Vit. B6; Vit. B2; Vit. D; Vit. B1; Rame bisglicinato; Acido Folico; Selenito di sodio; Picolinato di cromo; Biotina; Ioduro di potassio.', NULL, false, false, false, '2025-08-04 07:34:46.036509');
INSERT INTO public.product_groups VALUES (31, 'zm-b6', 'ZM-B6', 23, 7, 'Integratore alimentare a base di zinco, magnesio e vitamina B6.', 'Integratore alimentare a base di zinco, magnesio e vitamina B6. Lo zinco contribuisce al mantenimento di normali livelli di testosterone nel sangue. Il magnesio contribuisce alla normale sintesi proteica e funzione muscolare. La vitamina B6 contribuisce a ridurre la stanchezza e l''affaticamento. ZM B6 è adatto a vegetariani e vegani.', '["Per compressa: Zinco 12,5 mg (125% VNR)", "Magnesio 188 mg (50% VNR)", "Vitamina B6 3 mg (214% VNR)", "Supporta testosterone", "Adatto a vegani"]', 'Deglutire una porzione (una compressa) al giorno 30-60 minuti prima di coricarsi, con acqua o altro liquido a scelta.', 'Ingredienti: Cellulosa microcristallina; Magnesio ossido; Magnesio citrato; Zinco gluconato; Agenti antiagglomeranti: biossido di silicio e sali di magnesio degli acidi grassi; Vit. B6 (piridossina cloridrato).', NULL, false, false, false, '2025-08-04 07:35:51.687253');
INSERT INTO public.product_groups VALUES (32, 'zmb6-tabs', 'ZMB6 Tabs', 23, 7, 'ZMB6 TABS è un integratore alimentare a base di zinco, magnesio e vitamina B6.', 'ZMB6 TABS è un integratore alimentare a base di zinco, magnesio e vitamina B6. Lo zinco contribuisce al mantenimento di normali livelli di testosterone nel sangue. Il magnesio contribuisce alla normale sintesi proteica e funzione muscolare. La vitamina B6 contribuisce a ridurre la stanchezza e l''affaticamento. ZMB6 TABS è adatto a vegetariani e vegani.', '["Per compressa: Zinco 12,5 mg (125% VNR)", "Magnesio 188 mg (50% VNR)", "Vitamina B6 3 mg (214% VNR)", "Supporta testosterone", "Adatto a vegani"]', 'Deglutire una porzione (una compressa) al giorno 30-60 minuti prima di coricarsi, con acqua o altro liquido a scelta.', 'Ingredienti: Cellulosa microcristallina; Magnesio ossido; Magnesio citrato; Zinco gluconato; Agenti antiagglomeranti: biossido di silicio, sali di magnesio degli acidi grassi; Vitamina B6 (piridossina cloridrato).', NULL, false, false, false, '2025-08-04 07:35:51.687253');
INSERT INTO public.product_groups VALUES (33, 'acido-d-aspartico', 'Acido D-Aspartico', 25, 2, 'Integratore alimentare in compresse a base di Acido Aspartico.', 'Integratore alimentare a base di Acido Aspartico, un amminoacido non essenziale naturalmente presente nel nostro organismo. L''Acido Aspartico svolge un ruolo cruciale in numerosi processi biologici ed è formulato per supportare la riduzione della fatica, favorire il mantenimento di normali funzioni neurologiche e contribuire al generale benessere energetico dell''organismo.', '["Per compressa: Acido D-Aspartico 750 mg", "Supporta funzioni neurologiche", "Riduce la fatica", "Benessere energetico"]', 'Assumere una compressa al giorno con acqua.', 'Ingredienti: Acido D-aspartico, Cellulosa microcristallina, Calcio difosfato, Antiagglomeranti: Magnesio stearato E470 (b), Mono e digliceridi degli acidi grassi E471. Può contenere tracce di latte, soia, pesce, frumento, uova e nocciole.', NULL, false, false, false, '2025-08-04 07:36:07.997003');
INSERT INTO public.product_groups VALUES (34, 'arginina-alfaketoglutarato-2000', 'Arginina Alfaketoglutarato 2000', 25, 2, 'Arginina in compresse da 1000 mg in forma alfachetoglutarato.', 'La L-arginina un aminoacido classificato semi essenziale. Integratore alimentare di Arginina AAKG, un aminoacido essenziale il cui fabbisogno aumenta notevolmente in corso di attività fisica. In versione AKG (alfaketoglutarato) diventa un ottimo pre-workout favorendo il trasporto dei nutrienti al muscolo.', '["Per 2 compresse: L-Arginina AKG 2000 mg", "Precursore ossido nitrico", "Pre-workout", "Trasporto nutrienti"]', 'Si consiglia di assumere 2 compresse al giorno con un bicchiere di acqua.', 'Ingredienti: Arginina AKG, Calcio fosfato, Cellulosa microcristallina, Antiagglomerante: Magnesio Stearato.', NULL, false, false, false, '2025-08-04 07:36:07.997003');
INSERT INTO public.product_groups VALUES (35, 'arginina-argipower-100-percent', 'Arginina Argipower 100%', 25, 2, 'Arginina Kyowa Quality in polvere aromatizzata ai frutti di bosco.', 'Integratore alimentare a base di purissima arginina Kyowa Quality in polvere aromatizzata ai frutti di bosco. L-arginina è un aminoacido classificato semi essenziale. Le funzioni biologiche includono: precursore dell''ossido nitrico, azione antiossidante, detossificazione dei residui azotati, precursore della creatina, supporto al sistema immunitario, partecipazione alla sintesi delle proteine.', '["Per misurino (2g): L-Arginina 2000 mg", "Kyowa Quality®", "Gusto frutti di bosco", "Precursore ossido nitrico", "Supporto sistema immunitario"]', 'Si consiglia di assumere il contenuto di un misurino di prodotto, pari a 2 grammi di arginina, sciolti in acqua o succo di frutta, una volta al giorno.', 'Ingredienti: L-Arginina (Kyowa Quality®), aroma, acidificante: acido citrico, colorante: polvere di barbabietola, Edulcoranti: acesulfame k e sucralosio.', NULL, false, false, false, '2025-08-04 07:36:07.997003');
INSERT INTO public.product_groups VALUES (36, 'bcaa-2-1-1-proram', 'BCAA 2:1:1 Proram', 25, 2, 'Pre/intra/post workout contrasta stanchezza favorisce il recuperio. BCAA 2.1.1 di origine vegetale con Vit B6', 'Prodotti per sportivi costituiti da un''associazione di L-Leucina, L-Isoleucina, L-Valina e Vitamina B6 destinati a tutti coloro che praticano attività fisico-sportiva molto intensa utili ad aumentare il livello di aminoacidi ramificati disponibili per l''organismo mantenendo un bilancio azotato positivo. BCAA Sport a completamento della dieta è indicato in particolare nell''alimentazione degli sportivi, nelle situazioni di accentuato catabolismo proteico come nei casi di attività muscolare intensa o di resistenza. Pro Nutrition affianca alla versione in compresse PRORAM + Vit B6 anche la versione in polvere BCAA POWDER per completare la propria gamma di BCAA ed offrire al consumatore una alternativa da utilizzare per i propri allenamenti. PRORAM POWDER è costituito da purissimi BCAA in polvere + Vit B6 aromatizzati al limone per chi preferisce assumerli con miscele proteiche, di carboidrati oppure con la propria bevanda preferita durante la giornata', '{"ingredients": "L-Leucina, L - Isoleucina, L - Valina, amido, antiagglomerante: Biossido di silicio, magnesio stearato, inulina, piridossina cloridrato", "nutritional_values": "Porzione: 5 compresse\\nPorzioni per confezione: 20\\n                Per porzione    % RDA*\\nAminoacidi Ramificati B.C.A.A.          5000 mg  \\n- di cui L-Leucina              2500 mg  \\n- di cui L-Valina               1250 mg  \\ndi cui L-Isoleucina             1250 mg  \\nVitamina B6             2 mg    100%\\n*RDA: Dosaggio Giornaliero Raccomandato"}', 'Si consiglia di assumere 5 compresse al giorno preferibimente prima o dopo lìattività fisica', NULL, NULL, false, false, false, '2025-08-04 08:18:20.178299');
INSERT INTO public.product_groups VALUES (37, 'bcaa-8-1-1', 'BCAA 8:1:1', 25, 2, 'Pre/intra/post workout in contrasta stanchezza favorisce il recuperio. BCAA 8.1.1 di origine vegetale in polvere con Vit B1 e B6', 'Prodotto in polvere a base di BCAA (L-Leucina, L-Isoleucina, L-Valina) nello straordinario rapporto 8-1-1 arricchito con le Vitamine B1 e B6. BCAA 8-1-1 È indicato per chi pratica attivitÀ fisico-sportiva intensa in quanto aumenta il livello di aminoacidi ramificati disponibili per l''organismo mantenendo un bilancio azotato positivo fornendo quindi una ottima azione energetica ed anticatabolica se assunto prima dell''allenamento che di recupero se assunto dopo l''allenamento. La Vitamina B1 e B6 intervengono positivamente sul metabolismo proteico, del glicogeno muscolare ed energetico. La Vitamina B6 contribuisce a ridurre la stanchezza e l''affaticamento che insorge durante le sessioni di allenamento mentre la B1 contribuisce alla normale funzionalità cardiaca.', '{"ingredients": "Miscela di Aminoacidi ramificati BCAA (L-Leucina, L-Isoleucina, L-Valina in rapporto 8/1/1), Maltodestrine 19 DE, Acido Citrico, Acido Tartarico, Aromi, Sodio Bicarbonato, Edulcorante: Sucralosio, Piridossina Cloridrato (Vitamina B6), Tiamina Cloridrato (Vitamina B1).", "nutritional_values": "per dose/serving 7g/2 misurini/scoops\\n\\nValori Nutrizionali per 100 g Per dose die massima di 7g %VNR*\\nVitamina/Vitamin B1 23,6 mg 1,65 mg 150\\nVitamina/Vitamin B6 30 mg 2,1 mg 150\\nL-Leucina/ L-Leucine 57 g 4000 mg\\nL-Isoleucina/ L-Isoleucine 7,1 g 500 mg\\nL-Valina/ L-Valine 7,1 g 500 mg\\n*VNR: Valori Nutritivi di Riferimento"}', 'Assumere due misurini (7 g) di prodotto al giorno sciolto in acqua prima o dopo l''attività fisica.', NULL, NULL, false, false, false, '2025-08-04 08:18:20.178299');
INSERT INTO public.product_groups VALUES (38, 'bcaa-8-1-1-peptide', 'BCAA 8:1:1 Peptide', 25, 2, 'Aminoacidi peptidi (pepform) ramificati in formula 8.1.1 da 100 cpr.', 'Integratore alimentare a base di BCAA (L-Leucina, L-isoleucina, L-valina) peptidi Pepform nel rapporto 8.1.1 ( 8 parti di leucina, 1 parte di isoleucina, 1 parte di valina). I Peptidi di bcaa Pepform sono un blend di bcaa ottenuti mediante un processo brevettato che consente di miscelare le forme libere di aminoacidi a catena ramificata ai peptidi isolati. I Bcaa sono i maggiori componenti delle proteine del muscolo. E'' indicato per chi pratica attività fisico-sportiva intensa in quanto il suddetto caso  aumenta il livello  di aminoacidi ramificati disponibili per l''organismo mantenendo un bilancio azotato positivo fornendo quindi un ottima azione energetica  ed anticatabolica se assunto prima dell''allenamento, che di recupero se assunto dopo l''allenamento. La formula dei BCAA 8.1.1 peptidi Pronutrition contiene i peptidi Pepform brevetto internazionale di garanzia e efficacia. Così come esplicato in uno studio sulla Leucina Pepform è valorizzato come la forma peptidica offre notevoli vantaggi nell''assimilazione e nella metabolizzazione dei ramificati e dimostra come l''indice PER (protein efficiency ratio) vede aumentare efficenza di trasformazione proteica.', '{"ingredients": "Miscela BCAA 8:1:1 (PepForm®: Leucina, Isoleucina, Valina), L-Leucina, Antiagglomeranti: Magnesio stearato o sali di magnesio degli acidi grassi E 470 (b), Mono e digliceridi degli acidi grassi E471, Calcio difosfato E 341 (ii), Cellulosa microcristallina E460", "nutritional_values": "Per dose/die 5 cpr\\nBCAA 2:1:1 peptidici/ BCAA 2:1:1 peptides 2000 mg\\ndi cui Leucina/ of which Leucine 1000 mg\\ndi cui Isoleucina/ of which Isoleucine 500 mg\\ndi cui Valina/ of which Valine 500 mg\\nL-Leucina/ L-Leucine 3000 mg"}', 'Si consiglia l''assunzione di 5 cpr al giorno', NULL, NULL, false, false, false, '2025-08-04 08:18:20.178299');
INSERT INTO public.product_groups VALUES (39, 'bcaa-sport-4-1-1', 'BCAA Sport 4:1:1', 25, 2, 'Aminoacidi ramificati in polvere BCAA 4.1.1 con vitamine B1 e B6', 'Prodotto in polvere a base di BCAA (L-Leucina, L-Isoleucina, L-Valina) nel rapporto 4-1-1 arricchito con le vitamine B1 e B6. BCAA 4-1-1 Sport è indicato per chi pratica attività fisico-sportiva intensa aumenta il livello di aminoacidi ramificati disponibili per l''organismo mantenendo un bilancio azotato positivo fornendo quindi una ottima azione energetica ed anticatabolica se assunto prima dell''allenamento che di recupero se assunto dopo l''allenamento. Le Vitamine B1 e B6 intervengono positivamente sul metabolismo proteico, del glicogeno muscolare ed energetico. La Vitamina B6 contribuisce a ridurre la stanchezza e l''affaticamento mentre la B1 contribuisce alla normale funzionalità cardiaca.', '{"ingredients": "Miscela di Aminoacidi ramificati BCAA (L-Leucina, L-Isoleucina, L-Valina in rapporto 4/1/1), Maltodestrine 19 DE, Acido Citrico, Acido Tartarico, Aromi, Sodio Bicarbonato, Edulcorante: Sucralosio, Piridossina Cloridrato (Vitamina B6), Tiamina Cloridrato (Vitamina B1).", "nutritional_values": "per dose/serving 7g/2 misurini\\nPer 100 g Per porzione 7g VNR*\\nVitamina B1 23,6 mg 1,65 mg 150%\\nVitamina B6 30 mg 2,1 mg 150%\\nL-Leucina 47 g 3300 mg\\nL-Isoleucina 12 g 840 mg\\nL-Valina 12 g 840 mg\\n*VNR = Valori Nutritivi di Riferimento"}', 'Assumere due misurini (7 g) di prodotto al giorno sciolto in acqua prima o dopo l''attività fisica.', NULL, NULL, false, false, false, '2025-08-04 08:18:52.215936');
INSERT INTO public.product_groups VALUES (40, 'citrullina-malato', 'Citrullina Malato', 25, 2, 'Citrullina malato 2.1 in polvere per sport di endurance ed anaerobi', 'Prodotto in polvere a base di Citrullina Malato 2:1. La citrullina è un aminoacido non essenziale normalmente sintetizzato nel fegato a partire da altri aminoacidi, in particolare dall''ornitina e dalla glutammina. Le condizioni di allenamento intenso possono richiedere un''integrazione con questo aminoacido per supportare le performance sportive. Viene utilizzata dagli sportivi che praticano sia sport di endurance che anaerobi. Negli sport di endurance la citrullina può contribuire a migliorare la resistenza muscolare e ridurre la fatica, negli sport anaerobi può supportare la forza e la potenza muscolare.', '{"ingredients": "Citrullina L-malato (2:1), maltodestrine, acidificante: acido citrico, aromi, antiagglomerante: biossido di silicio, edulcorante: sucralosio.", "nutritional_values": "per dose/serving 5g/1 misurino\\nPer 100 g Per porzione (5 g)\\nEnergia 2,8 kJ / 0,67 kcal 0,14 kJ / 0,03 kcal\\nGrassi 0 g 0 g\\ndi cui acidi grassi saturi 0 g 0 g\\nCarboidrati 0,17 g 0,008 g\\ndi cui zuccheri 0 g 0 g\\nFibre 0 g 0 g\\nProteine 0 g 0 g\\nSale 0 g 0 g\\nCitrullina L-malato (2:1) 85 g 4250 mg\\ndi cui L-citrullina 57 g 2850 mg"}', 'Si consiglia di assumere 1 misurino (5g) al giorno da sciogliere in acqua prima dell''allenamento.', NULL, NULL, false, false, false, '2025-08-04 08:18:52.215936');
INSERT INTO public.product_groups VALUES (41, 'creatina-micronizzata-100', 'Creatina Micronizzata 100%', 25, 2, 'Creatina monoidrato micronizzata ad alta purezza, 100% pura', 'Integratore alimentare a base di creatina monoidrato micronizzata, creapure quality. La creatina aumenta le prestazioni fisiche in caso di attività ripetitive, di elevata intensità e di breve durata. L''effetto benefico si ottiene con l''assunzione giornaliera di 3 g di creatina. La formulazione prevede una forma micronizzata della creatina che permette una migliore dissoluzione e quindi assimilazione del prodotto. La creatina è indicata per tutti gli sportivi praticanti discipline che richiedono sforzi brevi e intensi.', '{"ingredients": "Creatina monoidrato micronizzata (Creapure®).", "nutritional_values": "per dose/serving 3g/1 misurino\\nPer 100g Per porzione (3g)\\nEnergia 1700 kJ/400 kcal 51 kJ/12 kcal\\nGrassi 0 g 0 g\\ndi cui acidi grassi saturi 0 g 0 g\\nCarboidrati 0 g 0 g\\ndi cui zuccheri 0 g 0 g\\nProteine 100 g 3 g\\nSale 0 g 0 g\\nCreatina monoidrato 100 g 3000 mg"}', 'Si consiglia di assumere 1 misurino (3g) al giorno da sciogliere in acqua.', NULL, NULL, false, false, false, '2025-08-04 08:18:52.215936');
INSERT INTO public.product_groups VALUES (42, 'creatina-tabs-monoidrata', 'Creatina Tabs Monoidrata', 25, 2, 'Creatina monoidrato in compresse da 1g', 'Integratore alimentare a base di creatina monoidrato in compresse, per aumentare le prestazioni fisiche in caso di attività ripetitive di elevata intensità e di breve durata. L''effetto benefico si ottiene con l''assunzione giornaliera di 3 g di creatina. Le compresse offrono un formato pratico e conveniente per l''assunzione della creatina senza la necessità di mescolare polveri. Ideale per gli sportivi che praticano discipline che richiedono sforzi brevi e intensi.', '{"ingredients": "Creatina monoidrato, Cellulosa microcristallina, Stabilizzante: idrossipropilmetilcellulosa, Agenti antiagglomeranti: biossido di silicio, sali di magnesio degli acidi grassi (origine vegetale).", "nutritional_values": "per porzione (3 compresse)\\nCreatina monoidrato 3000 mg"}', 'Si consiglia di assumere 3 compresse al giorno da deglutire con acqua.', NULL, NULL, false, false, false, '2025-08-04 08:19:15.770288');
INSERT INTO public.product_groups VALUES (43, 'glutammina-sport-recovery', 'Glutammina Sport Recovery', 25, 2, 'L-Glutammina in polvere per il recupero muscolare post allenamento', 'Integratore alimentare a base di L-glutammina in polvere micronizzata. La glutammina è l''aminoacido più abbondante nel tessuto muscolare e svolge un ruolo importante nel supportare il recupero dopo l''allenamento intenso. Durante l''attività fisica intensa, i livelli di glutammina possono diminuire, rendendo utile l''integrazione per supportare il recupero muscolare. La glutammina contribuisce al mantenimento del sistema immunitario e al supporto della funzione intestinale.', '{"ingredients": "L-Glutammina.", "nutritional_values": "per dose/serving 5g/1 misurino\\nPer 100 g Per porzione (5 g)\\nEnergia 1700 kJ/400 kcal 85 kJ/20 kcal\\nGrassi 0 g 0 g\\ndi cui acidi grassi saturi 0 g 0 g\\nCarboidrati 0 g 0 g\\ndi cui zuccheri 0 g 0 g\\nProteine 100 g 5 g\\nSale 0 g 0 g\\nL-Glutammina 100 g 5000 mg"}', 'Si consiglia di assumere 1 misurino (5g) al giorno da sciogliere in acqua dopo l''allenamento.', NULL, NULL, false, false, false, '2025-08-04 08:19:15.770288');
INSERT INTO public.product_groups VALUES (44, 'glutammina-peptide', 'Glutammina Peptide', 25, 2, 'L-Glutammina Peptide in polvere per assorbimento ottimizzato', 'Integratore alimentare a base di L-glutammina peptide in polvere. I peptidi di glutammina offrono un assorbimento superiore rispetto alla glutammina libera, garantendo una migliore biodisponibilità. La glutammina è l''aminoacido più abbondante nel tessuto muscolare e svolge funzioni importanti nel recupero post-allenamento. La forma peptidica permette un assorbimento più rapido ed efficace, risultando particolarmente utile per gli sportivi che necessitano di un rapido ripristino dei livelli di glutammina dopo l''attività fisica intensa.', '{"ingredients": "L-Glutammina peptide.", "nutritional_values": "per dose/serving 5g/1 misurino\\nPer 100 g Per porzione (5 g)\\nEnergia 1650 kJ/390 kcal 82 kJ/19 kcal\\nGrassi 0 g 0 g\\ndi cui acidi grassi saturi 0 g 0 g\\nCarboidrati 2 g 0,1 g\\ndi cui zuccheri 0 g 0 g\\nProteine 95 g 4,75 g\\nSale 0,5 g 0,025 g\\nL-Glutammina (da peptidi) 95 g 4750 mg"}', 'Si consiglia di assumere 1 misurino (5g) al giorno da sciogliere in acqua dopo l''allenamento.', NULL, NULL, false, false, false, '2025-08-04 08:19:15.770288');
INSERT INTO public.product_groups VALUES (45, 'collagene-marino-acido-ialauronico', 'Collagene Marino Acido Ialuronico', 25, 7, 'Collagene marino + Sodio Ialuronato CON EDULCORANTE Integratore Alimentare', 'Integratore alimentare in polvere a base di collagene, acido ialuronico, estratti vegetali, vitamine, minerali e coenzima Q10. L''estratto di Erba di Santa Barbara invernale favorisce il drenaggio dei liquidi corporei ed il trofismo e funzionalità della pelle, mentre lo Zinco e la Biotina contribuiscono al mantenimento di una pelle normale. Inoltre lo Zinco contribuisce anche al mantenimento di unghie e capelli normali. Il Manganese contribuisce alla normale formazione di tessuti connettivi, mentre il Rame contribuisce al mantenimento di tessuti connettivi normali. L''estratto di Mirtillo Nero favorisce la funzionalità del microcircolo (pesantezza delle gambe). L''estratto di Acerola favorisce le naturali difese dell''organismo, mentre Zinco e Vitamina D contribuiscono alla normale funzione del sistema immunitario.', '{"ingredienti": "Collagene marino (da Pesce), Maltodestrine, Mirtillo Nero (Vaccinium Myrtillus – Frutti, e.s Titolato al 1% in Antocianosidi), Erba di Santa Barbara invernale (Barbarea Verna – Foglie, e.s.), Acerola (Malpighia Glabra – Frutti, e.s Titolato al 50% in Vitamina C), Acidificante: Acido Citrico, Sodio Ialuronato, Manganese Gluconato, Zinco Gluconato, Antiagglomerante: Biossido di Silicio, Coenzima Q10, Rame Gluconato, Edulcorante: Sucralosio, Biotina, Vitamina D (Colecalciferolo)."}', 'Si consiglia l''assunzione di 1 bustina al giorno sciolta in un bicchiere d''acqua.', NULL, NULL, false, false, false, '2025-08-04 08:38:06.829642');
INSERT INTO public.product_groups VALUES (46, 'omega-3-super', 'Omega 3 Super', 25, 7, 'Omega 3 da olio di pesce con EPA e DHA concentrati. Supporta funzionalità cardiaca, cerebrale e visiva.', 'Integratore alimentare a base di olio di pesce concentrato ricco in acidi grassi omega-3 EPA (acido eicosapentaenoico) e DHA (acido docosaesaenoico). Gli acidi grassi omega-3 sono essenziali per il corretto funzionamento dell''organismo e svolgono importanti funzioni biologiche. L''EPA e il DHA contribuiscono alla normale funzione cardiaca, mentre il DHA contribuisce al mantenimento della normale funzione cerebrale e della capacità visiva. Questi effetti benefici si ottengono con l''assunzione giornaliera di 250 mg di EPA e DHA.', '{"ingredienti": "Olio di pesce concentrato (EPA 18%, DHA 12%), Gelatina alimentare, Glicerina, Vitamina E (tocoferoli misti)"}', 'Assumere 1-2 perle al giorno con acqua durante i pasti.', NULL, NULL, false, false, false, '2025-08-04 08:38:06.829642');
INSERT INTO public.product_groups VALUES (47, 'vitamina-d3-k2', 'Vitamina D3+K2', 25, 7, 'Integratore di Vitamina D3 e K2 per ossa e denti normali. Supporta sistema immunitario e assorbimento calcio.', 'Integratore alimentare a base di Vitamina D3 (colecalciferolo) e Vitamina K2 (menachinone-7). La Vitamina D contribuisce al normale assorbimento/utilizzo del calcio e del fosforo, al mantenimento di ossa e denti normali, alla normale funzione muscolare e del sistema immunitario. La Vitamina K contribuisce alla normale coagulazione del sangue e al mantenimento di ossa normali. La combinazione di Vitamina D3 e K2 lavora in sinergia per ottimizzare l''utilizzo del calcio nell''organismo.', '{"ingredienti": "Cellulosa microcristallina, Vitamina D3 (colecalciferolo), Vitamina K2 (menachinone-7), Antiagglomeranti: Magnesio stearato, Biossido di silicio"}', 'Assumere 1 compressa al giorno con acqua durante i pasti.', NULL, NULL, false, false, false, '2025-08-04 08:38:06.829642');
INSERT INTO public.product_groups VALUES (48, 'egg-protein-busta', 'EGG Protein', 23, 1, 'Integratore alimentare di proteine del bianco d''uovo con edulcoranti, particolarmente adatto agli sportivi, a solubilità istantanea.', 'EGG PROTEIN è un integratore alimentare di proteine del bianco d''uovo con edulcoranti, particolarmente adatto agli sportivi, a solubilità istantanea. La vitamina B6 contribuisce al normale metabolismo delle proteine e del glicogeno e alla riduzione della stanchezza e dell''affaticamento. Le proteine dell''uovo sono una fonte proteica di elevatissima qualità, ed hanno un alto valore biologico. I tempi di digestione di queste proteine sono rapidi, quindi il rilascio degli aminoacidi contenuti è veloce.', '{"valori_nutrizionali": "Informazioni nutrizionali per porzione\n1 PORZIONE = 3 MISURINI (30g)\nEnergia 456 KJ/107 kcal\nGrassi 0,1 g\ndi cui acidi grassi saturi 0 g\nCarboidrati 1,6 g\ndi cui zuccheri 0,1 g\nProteine 25 g\nSale 0,9 g\nVitamina B6 (43% VNR) 0,6 mg\n\nInformazioni nutrizionali per 100 g\nEnergia 1524 KJ/359 kcal\nGrassi 0,2 g\ndi cui acidi grassi saturi 0,1 g\nCarboidrati 5,2 g\ndi cui zuccheri 0,3 g\nProteine 84 g\nSale 3,1 g\nVitamina B6 (43% VNR) 2 mg\n\nPROFILO AMINOACIDICO TIPICO % SULLE PROTEINE\nL-Isoleucina 5,32\nL-Leucina 8,36\nL-Valina 6,84\nL-Lisina 6,28\nL-Metionina 3,70\nL-Fenilalanina 5,80\nL-Treonina 4,46\nL-Arginina 5,70\nL-Alanina 6,08\nL-Acido Aspartico 10,80\nL-Cistina 2,66\nL-Acido Glutammico 12,93\nL-Glicina 3,42\nL-Istidina 2,28\nL-Prolina 3,80\nL-Serina 6,75\nL-Tirosina 3,90\nL-Triptofano 1,62", "ingredienti": "Proteine del bianco d''UOVO; Aromi; Addensante: gomma xantano; Sale; Edulcorante: sucralosio; Piridossina cloridrato (Vitamina B6)."}', 'Assumere una porzione da 30 g (3 misurini) al giorno miscelata con 130-150 ml di acqua. Il volume di liquido aggiunto influisce sull''intensità del gusto e sulla densità del preparato, non influisce sulla digeribilità o assimilabilità. Assumere il prodotto come spuntino durante la giornata, lontano dai pasti principali, oppure dopo gli allenamenti o attività sportiva.', NULL, NULL, false, false, false, '2025-08-04 08:57:59.656623');
INSERT INTO public.product_groups VALUES (49, 'fish-oil', 'Fish Oil', 23, 7, 'FISH OIL OMEGA 3 EPA&DHA è un integratore alimentare di acidi grassi essenziali omega 3 EPA e DHA in forma di trigliceridi.', 'FISH OIL OMEGA 3 EPA&DHA è un integratore alimentare di acidi grassi essenziali omega 3 EPA e DHA in forma di trigliceridi. L''EPA e il DHA contribuiscono alla normale funzione cardiaca (l''effetto benefico si ottiene con l''assunzione giornaliera di 250 mg di EPA e di DHA), il DHA contribuisce al mantenimento della normale funzione cerebrale e al mantenimento della normale visione (l''effetto benefico si ottiene con l''assunzione giornaliera di 250 mg di DHA).', '{"valori_nutrizionali": "Informazioni nutrizionali per porzione\n1 PORZIONE = 4 SOFTGELS\nEPA 720 mg\nDHA 480 mg\nVit. E (417% VNR) 50 mg\nEPA e DHA per 100 g di olio di pesce/of fish oil\nEPA 18 mg\nDHA 12 mg", "ingredienti": "Olio di PESCE concentrato in EPA e DHA in forma di trigliceride; Gelatina alimentare; Addensante: glicerolo; D-Alfa tocoferolo (vitamina E)."}', 'Si consiglia di assumere 4 capsule al giorno, ai pasti principali.', NULL, NULL, false, false, false, '2025-08-04 08:57:59.656623');
INSERT INTO public.product_groups VALUES (50, 'glutamina-pure', 'Glutamine Pure', 23, 2, 'Integratore alimentare di glutammina in polvere solubile senza aromi, gusto naturale.', 'Integratore alimentare di glutammina in polvere solubile senza aromi, gusto naturale. Contiene glutammina di origine vegetale da fermentazione di elevata purezza. La glutammina è un aminoacido coinvolto nel processo di recupero e rigenerazione muscolare. Non contiene ingredienti di origine animale, adatto anche ai vegani.', '{"valori_nutrizionali": "Informazioni nutrizionali per porzione\n1 PORZIONE = 1 MISURINO (5 g)\nL-Glutammina 5.000 mg", "ingredienti": "L-Glutammina; Stabilizzante: calcio fosfato."}', 'Un misurino (5 g) al giorno con acqua o altro liquido a scelta durante la giornata o dopo l''attività fisica.', NULL, NULL, false, false, false, '2025-08-04 08:57:59.656623');
INSERT INTO public.product_groups VALUES (51, 'mass-matrix', 'Mass Matrix', 23, 1, 'MASS MATRIX EXTRA è un integratore alimentare sviluppato appositamente per chi pratica Body Building e formulato per favorire l''incremento di massa e peso corporeo.', 'MASS MATRIX EXTRA è un integratore alimentare sviluppato appositamente per chi pratica Body Building e formulato per favorire l''incremento di massa e peso corporeo. Fornisce proteine con tempi di rilascio differenziati: caseine micellari, proteine del siero di latte, proteine del siero di latte isolate, proteine del siero di latte idrolizzate. Le proteine favoriscono la crescita della massa muscolare. MASS MATRIX EXTRA è formulato con maltodestrine, amido di mais ceroso e destrine cicliche altamente ramificate, carboidrati complessi ad assorbimento graduale e a rilascio differenziato di energia ai muscoli.', '{"valori_nutrizionali": "Informazioni nutrizionali per porzione\n1 PORZIONE = 5 MISURINI (100 g)\nEnergia 1585 kJ/374 kcal\nGrassi 3,9 g\ndi cui acidi grassi saturi 2,6 g\nCarboidrati 60 g\ndi cui zuccheri 8,5 g\nProteine 30 g\nSale 0,31 g\nVitamina B6 (21% VNR) 0,3 mg", "ingredienti": "Maltodestrine; Proteine del siero di LATTE concentrate; Caseine micellari; Aromi; Proteine del siero di LATTE isolate; Amido di mais ceroso; Destrine cicliche altamente ramificate; L-Glutammina; Addensante: gomma xantano; Creatina monoidrato; Sale; Edulcorante: sucralosio; Piridossina cloridrato (Vitamina B6)."}', 'Assumere una porzione da 100 g (5 misurini) al giorno miscelata con 300 ml di acqua.', NULL, NULL, false, false, false, '2025-08-04 08:57:59.656623');
INSERT INTO public.product_groups VALUES (52, 'multi-mineral', 'Multi Mineral', 23, 7, 'MULTI MINERAL è un integratore alimentare di vitamine e minerali specificatamente formulato per gli sportivi.', 'MULTI MINERAL è un integratore alimentare di vitamine e minerali specificatamente formulato per gli sportivi. Contiene vitamine del gruppo B che contribuiscono al normale metabolismo energetico e alla riduzione della stanchezza e dell''affaticamento. Il ferro contribuisce alla riduzione della stanchezza e dell''affaticamento ed al normale trasporto di ossigeno nell''organismo. Lo zinco e il selenio contribuiscono alla protezione delle cellule dallo stress ossidativo.', '{"valori_nutrizionali": "Informazioni nutrizionali per porzione\n1 PORZIONE = 2 COMPRESSE\nVitamina A (125% VNR) 1000 mcg\nVitamina D (200% VNR) 10 mcg\nVitamina E (183% VNR) 22 mg\nVitamina C (150% VNR) 120 mg\nTiamina (182% VNR) 2 mg\nRiboflavina (179% VNR) 2,5 mg\nNiacina (125% VNR) 20 mg\nVitamina B6 (179% VNR) 2,5 mg\nAcido folico (150% VNR) 300 mcg\nVitamina B12 (200% VNR) 5 mcg\nBiotina (150% VNR) 75 mcg\nAcido pantotenico (167% VNR) 10 mg\nCalcio (13% VNR) 100 mg\nFerro (107% VNR) 15 mg\nFosforo (14% VNR) 100 mg\nMagnesio (27% VNR) 100 mg\nZinco (100% VNR) 10 mg\nRame (100% VNR) 1 mg\nManganese (100% VNR) 2 mg\nSelenio (91% VNR) 50 mcg\nCromo (125% VNR) 50 mcg\nMolibdeno (100% VNR) 50 mcg\nIodio (100% VNR) 150 mcg", "ingredienti": "Agente di carica: cellulosa microcristallina; Carbonato di calcio; Carbonato di magnesio; Vitamina C (acido L-ascorbico); Vitamina E (DL-alfa tocoferil acetato); Ferro fumarato; Zinco ossido; Niacina (nicotinamide); Stabilizzante: idrossipropilmetilcellulosa; Vitamina A (retinyl acetato); Manganese solfato; Tiamina (tiamina mononitrato); Riboflavina; Vitamina B6 (piridossina cloridrato); Rame gluconato; Acido pantotenico (calcio D-pantotenato); Agenti antiagglomeranti: biossido di silicio, sali di magnesio degli acidi grassi (origine vegetale); Cromo picolinato; Acido folico (acido pteroilmonoglutamico); Selenio metionina; Biotina (D-biotina); Potassio ioduro; Molibdeno; Vitamina D (colecalciferolo); Vitamina B12 (cianocobalamina)."}', 'Assumere 2 compresse al giorno con acqua, preferibilmente ai pasti principali.', NULL, NULL, false, false, false, '2025-08-04 08:57:59.656623');
INSERT INTO public.product_groups VALUES (53, 'vitamine-mineral-complex', 'Vitamine & Mineral Complex', 23, 7, 'VITAMINE & MINERAL COMPLEX è un integratore alimentare di vitamine e minerali in compresse, senza zuccheri.', 'VITAMINE & MINERAL COMPLEX è un integratore alimentare di vitamine e minerali in compresse, senza zuccheri. Le vitamine del gruppo B contribuiscono al normale metabolismo energetico, mentre la vitamina C, il ferro, il magnesio e le vitamine del gruppo B contribuiscono alla riduzione della stanchezza e dell''affaticamento. Il ferro contribuisce al normale trasporto di ossigeno nell''organismo, mentre le vitamine A, D, C, B6, B12, l''acido folico, il ferro, il selenio e lo zinco contribuiscono alla normale funzione del sistema immunitario.', '{"valori_nutrizionali": "Informazioni nutrizionali per porzione\n1 PORZIONE = 1 COMPRESSA\nVitamina A (100% VNR) 800 mcg\nVitamina D (100% VNR) 5 mcg\nVitamina E (100% VNR) 12 mg\nVitamina C (100% VNR) 80 mg\nTiamina (100% VNR) 1,1 mg\nRiboflavina (100% VNR) 1,4 mg\nNiacina (100% VNR) 16 mg\nVitamina B6 (100% VNR) 1,4 mg\nAcido folico (100% VNR) 200 mcg\nVitamina B12 (100% VNR) 2,5 mcg\nBiotina (100% VNR) 50 mcg\nAcido pantotenico (100% VNR) 6 mg\nCalcio (10% VNR) 80 mg\nFosforo (11% VNR) 80 mg\nMagnesio (13% VNR) 50 mg\nFerro (100% VNR) 14 mg\nZinco (100% VNR) 10 mg\nRame (100% VNR) 1 mg\nManganese (100% VNR) 2 mg\nSelenio (100% VNR) 55 mcg\nCromo (100% VNR) 40 mcg\nMolibdeno (100% VNR) 50 mcg\nIodio (100% VNR) 150 mcg", "ingredienti": "Agente di carica: cellulosa microcristallina; Carbonato di calcio; Fosfato dicalcico; Carbonato di magnesio; Vitamina C (acido L-ascorbico); Vitamina E (DL-alfa tocoferil acetato); Ferro fumarato; Zinco ossido; Niacina (nicotinamide); Stabilizzante: idrossipropilmetilcellulosa; Manganese solfato; Vitamina A (retinyl acetato); Tiamina (tiamina mononitrato); Riboflavina; Vitamina B6 (piridossina cloridrato); Rame gluconato; Acido pantotenico (calcio D-pantotenato); Agenti antiagglomeranti: biossido di silicio, sali di magnesio degli acidi grassi (origine vegetale); Cromo picolinato; Acido folico (acido pteroilmonoglutamico); Selenio metionina; Biotina (D-biotina); Potassio ioduro; Molibdeno; Vitamina D (colecalciferolo); Vitamina B12 (cianocobalamina)."}', 'Assumere 1 compressa al giorno con acqua, preferibilmente ai pasti principali.', NULL, NULL, false, false, false, '2025-08-04 08:58:19.750382');
INSERT INTO public.product_groups VALUES (30, 'whey-iso-prolabs', 'Whey Iso', 23, 1, 'WHEY ISO è un integratore alimentare di proteine con aminoacidi ed edulcorante, a solubilità istantanea e di ottimo gusto.', 'WHEY ISO è un integratore alimentare di proteine con aminoacidi ed edulcorante, a solubilità istantanea e di ottimo gusto. WHEY ISO è formulato con proteine del siero di latte isolate e idrolizzate, proteine di elevato valore biologico. Alla sua formula proteica abbiamo aggiunto L-glutammina, aminoacidi e Vitamina B6, per renderla particolarmente indicata nell''alimentazione dello sportivo, sia di chi fa bodybuilding che altri sport. Le proteine contenute in WHEY ISO contribuiscono alla crescita e al mantenimento della massa muscolare, mentre la vitamina B6 contribuisce al normale metabolismo delle proteine e del glicogeno e alla riduzione della stanchezza e dell''affaticamento. WHEY ISO è adatto ai vegetariani', '["Per porzione (30g): Energia 434 kJ/102 kcal", "Proteine 24 g", "L-Glutammina 3 g", "L-Lisina 2 g", "L-Treonina 2 g", "L-Glicina 2,5 g", "Vitamina B6 0,42 mg", "Adatto ai vegetariani"]', 'Assumere una porzione da 30 g (2 misurini) al giorno miscelata con 240 ml di acqua o altro liquido a scelta. Assumere il prodotto come spuntino durante la giornata, lontano dai pasti principali, oppure dopo gli allenamenti o attività sportiva.', 'Ingredienti: Whey formula [Proteine del siero di LATTE isolate, Proteine del siero di LATTE; Proteine del siero di LATTE idrolizzate, emulsionante lecitina (contiene SOIA)]; Amino formula (L-Glutammina, L-Glicina, L-Lisina, L-Treonina); Addensante: E1200; Aromi; Sale; Edulcorante: sucralosio; Piridossina cloridrato (Vitamina B6).', NULL, false, false, false, '2025-08-04 07:34:56.001542');
INSERT INTO public.product_groups VALUES (54, 'creatine-monohydrate-premier', 'Creatine Monohydrate', 6, 2, 'CREATINE MONOHYDRATE è un integratore di creatina monoidrato micronizzata della purezza del 99,9%.', 'CREATINE MONOHYDRATE è un integratore di creatina monoidrato micronizzata della purezza del 99,9%. La creatina aumenta le prestazioni fisiche in caso di attività ripetitive, di elevata intensità e di breve durata. Gli effetti benefici si ottengono con l''assunzione giornaliera di 3 g di creatina.

La creatina è una fonte energetica del tutto naturale, contenuta nei vertebrati e anche nell''organismo umano come fosfocreatina. Viene sintetizzata dal fegato e in piccola parte dal pancreas e dai reni, a partire da tre aminoacidi: L-Arginina, Glicina e L-Metionina. Nella maggior parte dei casi (95%) viene immagazzinata nei muscoli scheletrici, sotto forma di creatina libera (40%) e come creatina-fosfato (60%). 

La creatina partecipa al rifornimento energetico necessario alle contrazioni muscolari tramite il sistema anaerobico alattacido, in sinergia con l''ATP.

CREATINE MONOHYDRATE è un prodotto privo di stimolanti, vegano, gluten free e senza coloranti.', '{"titolo":"Integratore di Creatina Monoidrato","valori_nutrizionali":{"per_dose_3g":{"creatina_monoidrato":"3 g"}},"ingredienti":"Creatina monoidrato micronizzata.","nota":"Effetti benefici si ottengono con l''assunzione giornaliera di 3 g di creatina"}', 'Sciogliere 3 g di prodotto (1 misurino) in un bicchiere d''acqua al giorno preferibilmente lontano dai pasti. All''interno della confezione è disponibile un misurino dosatore.', NULL, NULL, false, false, false, '2025-09-01 16:32:40.825315');
INSERT INTO public.product_groups VALUES (55, 'glutamine-ajinomoto-premier', 'Glutamine Ajinomoto', 6, 2, 'GLUTAMINE AJINOMOTO è un integratore alimentare di L-Glutammina pura in polvere.', 'GLUTAMINE AJINOMOTO è un integratore alimentare di L-Glutammina pura in polvere, ottenuta mediante fermentazione naturale Ajinomoto®, senza derivati animali.

La glutammina è l''amminoacido più abbondante nel plasma e nel tessuto muscolare. Durante l''esercizio fisico intenso e prolungato, la concentrazione di glutammina nel sangue e nel muscolo diminuisce sostanzialmente e può rimanere bassa per diverse ore durante il periodo di recupero.

La L-glutammina rappresenta da sola il 61% degli aminoacidi presenti nel muscolo scheletrico. Durante i periodi di intenso stress fisico, la richiesta di glutammina da parte dell''organismo supera la capacità di sintesi, con conseguente diminuzione della glutammina muscolare.

GLUTAMINE AJINOMOTO contribuisce alla sintesi proteica ed è coinvolta nella regolazione dell''equilibrio acido-base.', '{"titolo":"Integratore di L-Glutammina","valori_nutrizionali":{"per_dose_6g":{"l_glutammina":"6 g"}},"ingredienti":"L-Glutammina Ajinomoto®.","nota":"Prodotto ottenuto mediante fermentazione naturale, senza derivati animali"}', 'Assumere fino a 6 g di prodotto (1 misurino e mezzo) disciolti in un bicchiere d''acqua al giorno, preferibilmente lontano dai pasti principali. All''interno della confezione è disponibile un misurino dosatore.', NULL, NULL, false, false, false, '2025-09-01 16:32:41.022271');
INSERT INTO public.product_groups VALUES (56, 'taurine-premier', 'Taurine', 6, 2, 'TAURINE è un integratore alimentare a base di Taurina in compresse da 1000 mg.', 'TAURINE è un integratore alimentare a base di Taurina in compresse da 1000 mg. La taurina è un amminoacido non essenziale che si forma a partire dalla cisteina con l''intervento della vitamina B6.

La taurina è coinvolta nella stabilizzazione delle membrane cellulari e nella modulazione del flusso di calcio. È particolarmente concentrata nel muscolo cardiaco, nei muscoli scheletrici, nel sistema nervoso centrale e nei globuli bianchi.

Durante l''esercizio fisico intenso, i livelli di taurina possono diminuire. La supplementazione di taurina può aiutare a mantenere i livelli ottimali di questo importante aminoacido.

TAURINE è un prodotto vegano e gluten free.', '{"titolo":"Integratore di Taurina","valori_nutrizionali":{"per_compressa":{"taurina":"1000 mg"}},"ingredienti":"Taurina, Agenti di carica: cellulosa microcristallina; Stabilizzanti: sali di magnesio degli acidi grassi, biossido di silicio.","nota":"Prodotto vegano e gluten free"}', 'Assumere 1 compressa al giorno con un bicchiere d''acqua, preferibilmente ai pasti.', NULL, NULL, false, false, false, '2025-09-01 16:32:41.170475');
INSERT INTO public.product_groups VALUES (57, 'citrulline-malate-premier', 'Citrulline Malate', 6, 2, 'CITRULLINE MALATE è un integratore di L-Citrullina Malato in polvere nel rapporto 2:1.', 'CITRULLINE MALATE è un integratore di L-Citrullina Malato in polvere nel rapporto 2:1. La L-Citrullina è un aminoacido non essenziale coinvolto nel ciclo dell''urea e nella sintesi dell''ossido nitrico.

L''integrazione con citrullina malato può aiutare a migliorare le prestazioni durante l''esercizio fisico intenso. La citrullina viene convertita in arginina nell''organismo, contribuendo alla produzione di ossido nitrico.

Il malato è coinvolto nel ciclo di Krebs per la produzione di energia. La combinazione di citrullina e malato nel rapporto 2:1 offre benefici sinergici per le prestazioni sportive.

CITRULLINE MALATE è un prodotto vegano, gluten free e privo di stimolanti.', '{"titolo":"Integratore di L-Citrullina Malato","valori_nutrizionali":{"per_dose_3g":{"l_citrullina_malato_2_1":"3 g","di_cui_l_citrullina":"2 g","di_cui_malato":"1 g"}},"ingredienti":"L-Citrullina Malato (2:1).","nota":"Rapporto ottimale 2:1 per massima efficacia"}', 'Assumere 3 g di prodotto (1 misurino) sciolti in un bicchiere d''acqua 30 minuti prima dell''allenamento. All''interno della confezione è disponibile un misurino dosatore.', NULL, NULL, false, false, false, '2025-09-01 16:32:41.316893');
INSERT INTO public.product_groups VALUES (58, 'pre-workout-dynamine-premier', 'Pre-Workout Dynamine', 6, 3, 'PRE-WORKOUT DYNAMINE è un integratore pre-allenamento in polvere con Dynamine®, TeaCrine®, caffeina, beta-alanina, L-arginina e vitamine.', 'PRE-WORKOUT DYNAMINE è un integratore pre-allenamento in polvere con Dynamine®, TeaCrine®, caffeina, beta-alanina, L-arginina e vitamine del gruppo B.

Dynamine® (metilliberina) è un alcaloide purinico che si trova naturalmente nelle foglie di tè kucha. Offre energia rapida senza il crash tipico della caffeina, migliorando concentrazione e umore.

TeaCrine® (teacrina) è un alcaloide purinico che fornisce energia sostenibile e migliora la concentrazione mentale. Non crea tolleranza e ha un effetto sinergico con la caffeina.

La beta-alanina migliora la resistenza muscolare ritardando la fatica, mentre L-arginina supporta la vasodilatazione. Le vitamine del gruppo B contribuiscono al normale metabolismo energetico.', '{"titolo":"Pre-workout con Dynamine® e TeaCrine®","valori_nutrizionali":{"per_dose_15g":{"energia":"44 kcal / 188 kj","carboidrati":"9 g","di_cui_zuccheri":"7 g","dynamine":"100 mg","teacrine":"100 mg","caffeina":"200 mg","beta_alanina":"2000 mg","l_arginina":"1500 mg","vitamina_b1":"1,1 mg (100% VNR)","vitamina_b2":"1,4 mg (100% VNR)","vitamina_b6":"1,4 mg (100% VNR)","vitamina_b12":"2,5 mcg (100% VNR)"}},"ingredienti":"Destrosio, L-Arginina, Beta-Alanina, Aromi, Caffeina anidra, Acidificante: acido citrico; Dynamine® (metilliberina), TeaCrine® (teacrina), Colorante: succo di barbabietola disidratato; Edulcorante: sucralosio; Vitamine (B1, B2, B6, B12).","nota":"VNR = Valori nutritivi di riferimento. Contiene caffeina (200mg per dose). Non raccomandato per bambini e donne in gravidanza."}', 'Sciogliere 15 g di prodotto (1 misurino) in 250-300 ml d''acqua e assumere 30 minuti prima dell''allenamento. All''interno della confezione è disponibile un misurino dosatore.', NULL, NULL, false, false, false, '2025-09-01 16:32:41.457468');
INSERT INTO public.product_groups VALUES (59, 'isowhey-pro-zyme-premier', 'Isowhey Pro-Zyme', 6, 1, 'ISOWHEY PRO-ZYME è un integratore in polvere di proteine Isolate del siero di latte arricchito con DigeZyme® (complesso di enzimi digestivi).', 'ISOWHEY PRO-ZYME è un integratore in polvere di proteine Isolate del siero di latte arricchito con DigeZyme® (complesso di enzimi digestivi) e vitamine del gruppo B.

Le proteine isolate del siero di latte hanno un contenuto proteico superiore al 90% con un bassissimo contenuto di grassi e carboidrati. Sono caratterizzate da un elevato valore biologico e un profilo aminoacidico completo.

DigeZyme® è un complesso multi-enzimatico che include alfa-amilasi, proteasi neutra, cellulasi, lattasi e lipasi. Questi enzimi facilitano la digestione e l''assorbimento delle proteine, riducendo eventuali disturbi digestivi.

Le vitamine del gruppo B supportano il normale metabolismo energetico e la riduzione della stanchezza e dell''affaticamento.', '{"titolo":"Proteine Isolate con Enzimi Digestivi","valori_nutrizionali":{"per_100g":{"energia":"374 kcal / 1590 kj","grassi":"0,8 g","di_cui_saturi":"0,5 g","carboidrati":"4,2 g","di_cui_zuccheri":"4,0 g","proteine":"86 g","sale":"0,15 g","vitamina_b1":"3,8 mg","vitamina_b2":"4,9 mg","vitamina_b6":"4,9 mg","vitamina_b12":"8,8 mcg"},"per_dose_30g":{"energia":"112 kcal / 477 kj","grassi":"0,3 g","di_cui_saturi":"0,2 g","carboidrati":"1,3 g","di_cui_zuccheri":"1,2 g","proteine":"26 g","sale":"0,05 g","vitamina_b1":"1,1 mg (100% VNR)","vitamina_b2":"1,4 mg (100% VNR)","vitamina_b6":"1,4 mg (100% VNR)","vitamina_b12":"2,5 mcg (100% VNR)"}},"ingredienti":"Sieroproteine ISOLATE del LATTE, cacao magro in polvere, aromi, DigeZyme® (miscela di enzimi), edulcoranti: acesulfame K, sucralosio; vitamine del gruppo B.","nota":"VNR = Valore nutrizionale di riferimento"}', 'Assumere 30 g di prodotto (1 misurino) sciolti in 200 ml di acqua al giorno, preferibilmente dopo l''allenamento o lontano dai pasti principali. All''interno della confezione è disponibile un misurino dosatore.', NULL, NULL, false, false, false, '2025-09-01 16:32:41.605723');
INSERT INTO public.product_groups VALUES (60, 'massive-gain-xxl-premier', 'Massive Gain XXL', 6, 1, 'MASSIVE GAIN XXL è un integratore di proteine e carboidrati ad alto contenuto calorico, ideale per aumentare la massa muscolare.', 'MASSIVE GAIN XXL è un integratore di proteine e carboidrati ad alto contenuto calorico, arricchito con creatina, aminoacidi ramificati e vitamine del gruppo B.

Formulato specificamente per gli sportivi che necessitano di un elevato apporto calorico per aumentare la massa muscolare. Contiene un mix di proteine del siero di latte concentrate e caseine per un rilascio proteico graduale.

I carboidrati forniscono energia immediata per gli allenamenti intensi e favoriscono il recupero post-workout. La creatina monoidrato aumenta le prestazioni fisiche negli esercizi ripetitivi di alta intensità.

Gli aminoacidi ramificati (BCAA) supportano la sintesi proteica e riducono il catabolismo muscolare durante e dopo l''allenamento.', '{"titolo":"Mass Gainer ad Alto Contenuto Calorico","valori_nutrizionali":{"per_100g":{"energia":"380 kcal / 1615 kj","grassi":"2,8 g","di_cui_saturi":"1,8 g","carboidrati":"70 g","di_cui_zuccheri":"15 g","proteine":"20 g","sale":"0,3 g","creatina":"2 g","bcaa":"3 g","vitamina_b1":"1,1 mg","vitamina_b2":"1,4 mg","vitamina_b6":"1,4 mg","vitamina_b12":"2,5 mcg"}},"ingredienti":"Maltodestrine, Proteine del LATTE (concentrate del siero e caseine), Destrosio, Cacao magro in polvere, Aromi, Creatina monoidrato, L-Leucina, L-Valina, L-Isoleucina, Edulcoranti: acesulfame K, sucralosio; Vitamine del gruppo B.","nota":"Ad alto contenuto calorico - ideale per aumento massa muscolare"}', 'Mescolare 100 g di prodotto (2 misurini) con 400 ml di acqua o latte. Assumere 1-2 volte al giorno tra i pasti o dopo l''allenamento. All''interno della confezione è disponibile un misurino dosatore.', NULL, NULL, false, false, false, '2025-09-01 16:32:43.160448');
INSERT INTO public.product_groups VALUES (61, 'peanut-butter-premier', 'Peanut Butter', 6, 8, 'PEANUT BUTTER è una crema di arachidi 100% naturale, senza zuccheri aggiunti e senza olio di palma.', 'PEANUT BUTTER è una crema di arachidi 100% naturale, ottenuta dalla macinazione di arachidi tostate selezionate. Senza zuccheri aggiunti, senza olio di palma e senza conservanti.

Fonte naturale di proteine vegetali, grassi insaturi e vitamina E. Le arachidi sono ricche di niacina (vitamina B3), folati e magnesio, nutrienti essenziali per il metabolismo energetico.

La texture cremosa e il sapore autentico la rendono perfetta da spalmare su pane, fette biscottate o da utilizzare come ingrediente in ricette dolci e salate. Ideale per sportivi e per chi segue una dieta bilanciata.

Prodotto naturalmente privo di glutine e adatto a vegani e vegetariani.', '{"titolo":"Crema di Arachidi 100% Naturale","valori_nutrizionali":{"per_100g":{"energia":"588 kcal / 2461 kj","grassi":"49 g","di_cui_saturi":"8,2 g","carboidrati":"16 g","di_cui_zuccheri":"5,4 g","fibre":"8,1 g","proteine":"25 g","sale":"0,01 g","vitamina_e":"8,3 mg","niacina":"17,9 mg","magnesio":"168 mg"}},"ingredienti":"Arachidi tostate 100%.","nota":"Senza zuccheri aggiunti, senza olio di palma, naturalmente senza glutine"}', 'Consumare 1-2 cucchiai (20-30g) al giorno. Mescolare prima dell''uso in caso di separazione naturale degli oli. Conservare in luogo fresco e asciutto.', NULL, NULL, false, false, false, '2025-09-01 16:32:43.403382');
INSERT INTO public.product_groups VALUES (62, 'whey-concentrate-premier', 'Whey Concentrate', 6, 1, 'WHEY CONCENTRATE è un integratore di proteine concentrate del siero di latte con un contenuto proteico dell''80%.', 'WHEY CONCENTRATE è un integratore di proteine concentrate del siero di latte con un contenuto proteico dell''80%. Ottenute attraverso un processo di ultrafiltrazione che preserva la struttura delle proteine.

Le proteine del siero di latte sono caratterizzate da un elevato valore biologico e da un profilo aminoacidico completo, ricco di aminoacidi essenziali e ramificati (BCAA). Sono rapidamente assorbite e utilizzate per la sintesi proteica muscolare.

Ideali per sportivi che praticano attività fisiche intense, contribuiscono alla crescita e al mantenimento della massa muscolare. La formula è arricchita con vitamine del gruppo B che supportano il metabolismo energetico.

Prodotto facilmente digeribile, con ottima solubilità e gusto gradevole.', '{"titolo":"Proteine Concentrate del Siero di Latte","valori_nutrizionali":{"per_100g":{"energia":"381 kcal / 1620 kj","grassi":"5,2 g","di_cui_saturi":"3,4 g","carboidrati":"7,8 g","di_cui_zuccheri":"6,9 g","proteine":"78 g","sale":"0,4 g","vitamina_b1":"3,8 mg","vitamina_b2":"4,9 mg","vitamina_b6":"4,9 mg","vitamina_b12":"8,8 mcg"},"per_dose_30g":{"energia":"114 kcal / 486 kj","grassi":"1,6 g","di_cui_saturi":"1,0 g","carboidrati":"2,3 g","di_cui_zuccheri":"2,1 g","proteine":"23 g","sale":"0,1 g","vitamina_b1":"1,1 mg (100% VNR)","vitamina_b2":"1,4 mg (100% VNR)","vitamina_b6":"1,4 mg (100% VNR)","vitamina_b12":"2,5 mcg (100% VNR)"}},"ingredienti":"Proteine concentrate del siero di LATTE, cacao magro in polvere, aromi, edulcoranti: acesulfame K, sucralosio; vitamine del gruppo B (B1, B2, B6, B12).","nota":"VNR = Valore nutrizionale di riferimento. Contenuto proteico 78%"}', 'Sciogliere 30 g di prodotto (1 misurino) in 200-250 ml di acqua o latte. Assumere 1-2 volte al giorno, preferibilmente dopo l''allenamento e tra i pasti. All''interno della confezione è disponibile un misurino dosatore.', NULL, NULL, false, false, false, '2025-09-01 16:32:43.536395');
INSERT INTO public.product_groups VALUES (63, 'magnesium-chelated-premier', 'Magnesium Chelated', 6, 7, 'MAGNESIUM CHELATED è un integratore di magnesio chelato con aminoacidi per una biodisponibilità ottimale.', 'MAGNESIUM CHELATED è un integratore di magnesio chelato con aminoacidi, una forma altamente biodisponibile che garantisce un assorbimento superiore rispetto ai tradizionali sali inorganici.

Il magnesio è un minerale essenziale coinvolto in oltre 300 reazioni enzimatiche nell''organismo. Contribuisce al normale funzionamento del sistema nervoso, alla funzione muscolare normale e al mantenimento di ossa e denti normali.

La chelazione con aminoacidi protegge il magnesio dall''interferenza di altri nutrienti e facilita il trasporto attraverso la parete intestinale, migliorando significativamente l''assorbimento e riducendo i disturbi gastrointestinali.

Particolarmente utile per sportivi, in quanto il magnesio contribuisce alla riduzione della stanchezza e dell''affaticamento e supporta il normale metabolismo energetico.', '{"titolo":"Magnesio Chelato ad Alta Biodisponibilità","valori_nutrizionali":{"per_compressa":{"magnesio":"200 mg (53% VNR)"},"per_2_compresse":{"magnesio":"400 mg (107% VNR)"}},"ingredienti":"Magnesio bisglicinato chelato, Agenti di carica: cellulosa microcristallina; Stabilizzanti: sali di magnesio degli acidi grassi, biossido di silicio.","nota":"VNR = Valori nutritivi di riferimento. Forma chelata per assorbimento ottimale"}', 'Assumere 1-2 compresse al giorno con un bicchiere d''acqua, preferibilmente durante i pasti.', NULL, NULL, false, false, false, '2025-09-01 16:32:43.771652');
INSERT INTO public.product_groups VALUES (64, 'intra-pro-essential-plus-premier', 'Intra Pro Essential+', 6, 2, 'INTRA PRO ESSENTIAL + è un integratore di aminoacidi essenziali in polvere arricchito con L-istidina, quattro aminoacidi utili a supportare gli allenamenti intensi tra i quali L-glutammina, L-arginina e citrullina (Kyowa® Quality) e vitamine B6 e B2.', 'INTRA PRO ESSENTIAL + è un integratore di Aminoacidi Essenziali in polvere arricchito con L-istidina e L-glutammina, L-arginina, citrullina (Kyowa® Quality), vitamine B6 e B2.

Gli Aminoacidi Essenziali sono 8 e fanno parte dei 20 aminoacidi che partecipano alla sintesi proteica e quindi al corretto svolgimento delle funzioni dell''organismo umano. Sono definiti essenziali quegli aminoacidi che il corpo non riesce a sintetizzare in quantità sufficiente a far fronte ai propri bisogni: Fenilalanina, Isoleucina, Lisina, Leucina, Metionina, Treonina, Triptofano e Valina. La scarsità o la mancanza di un aminoacido essenziale agisce infatti come fattore limitante della sintesi proteica endogena.', '{"titolo":"Integratore di Aminoacidi","valori_nutrizionali":{"per_dose_8g":{"vitamina_b2":"1,4 mg (100% VNR)","vitamina_b6":"1,4 mg (100% VNR)","l_leucina":"1,2 g","l_glutammina":"1 g","l_lisina":"0,72 g","l_fenilalanina":"0,72 g","l_isoleucina":"0,6 g","l_valina":"0,6 g","l_treonina":"0,6 g","l_arginina_hcl":"0,5 g","l_metionina":"0,48 g","l_triptofano":"0,24 g","l_istidina":"0,24 g","citrullina":"0,24 g"}},"ingredienti":"miscela di aminoacidi (L-leucina, l-glutammina, L-lisina, L-fenilalanina, L-isoleucina, L-valina, L-treonina, l-arginina cloridrato, l-metionina, L-istidina, L-triptofano, citrullina), acido citrico, acido tartarico, aromi, sodio bicarbonato, edulcoranti: sucralosio, riboflavina (vitamina B2), cloridrato di piridossina (vitamina B6.)","nota":"*%VNR = Valori nutritivi di riferimento"}', 'Assumere fino a 8 g (due misurini rasi) al giorno con acqua.', NULL, NULL, false, false, false, '2025-09-01 16:32:43.905513');
INSERT INTO public.product_groups VALUES (65, 'bcaa-powder-8-1-1-premier', 'BCAA Powder 8:1:1', 6, 2, 'BCAA POWDER 8:1:1 è un prodotto in polvere al gusto di agrumi, a base di aminoacidi ramificati in forma libera, di purezza farmaceutica, che per il loro diverso contenuto di Leucina, stimolano la sintesi proteica favorendo un recupero più rapido e l''aumento massa, quindi indicati per il post workout. BCAA POWDER 8:1:1 è arricchito con vitamina B1, B2, B6.', 'BCAA POWDER 8:1:1 è un prodotto in polvere a base di aminoacidi ramificati in forma libera, di purezza farmaceutica, che per il loro diverso contenuto di Leucina, stimolano la sintesi proteica favorendo un recupero più rapido e l''aumento massa, quindi indicati per il post workout. BCAA POWDER 8:1:1 è arricchito con vitamine B1, B2, B6.

È scientificamente riconosciuta l''importanza dei BCAA per l''organismo, soprattutto in contesti di attività fisica e sportiva. Prima dell''allenamento forniscono energia per sostenere intensi sforzi muscolari, hanno una funzione anticatabolica, e favoriscono recupero e aumento massa.

Premier integratori si affida a materie prime di qualità per la sua formulazione di aminoacidi 8:1:1 purissimi, 100% liberi da zuccheri, glutine e lattosio, totalmente privi di carboidrati e adatti ai consumatori vegani. I BCAA Premier Integratori garantiscono migliori prestazioni e una maggiore efficacia, sia nel breve che nel lungo periodo.', '{"titolo":"Integratore BCAA e Vitamine","valori_nutrizionali":{"per_dose_5_5g":{"vitamina_b1":"1,1 mg (100% VNR)","vitamina_b2":"1,4 mg (100% VNR)","vitamina_b6":"1,4 mg (100% VNR)","l_leucina":"4 g","l_isoleucina":"0,5 g","l_valina":"0,5 g"}},"ingredienti":"L-leucina, L-isoleucina, L-valina, acido citrico, acido tartarico, aromi, sodio bicarbonato, edulcoranti: sucralosio; riboflavina (vitamina B2), cloridrato di piridossina (vitamina B6), cloridrato di tiamina (vitamina B1).","nota":"VNR = valori nutrizionali di riferimento"}', 'Assumere fino a 5,5 grammi (un misurino colmo) al giorno con acqua. All''interno della confezione è disponibile un misurino dosatore.', NULL, NULL, false, false, false, '2025-09-01 16:32:44.038208');
INSERT INTO public.product_groups VALUES (66, 'd3-k2-complex-premier', 'D3/K2 Complex', 6, 7, 'D3/K2 COMPLEX è un integratore alimentare in perle di vitamine D3 e vitamina K2. La vitamina D contribuisce al normale assorbimento/utilizzo del calcio e del fosforo e a regolare i livelli di calcio nel sangue e supporta il mantenimento di ossa e denti normali.', 'D3/K2 COMPLEX è un integratore alimentare in perle di vitamine D3 e vitamina K2. La vitamina D contribuisce al normale assorbimento/utilizzo del calcio e del fosforo e a regolare i livelli di calcio nel sangue e supporta il mantenimento di ossa e denti normali. La Vitamina K2 è essenziale per l''attivazione di proteine k-dipendenti che sono coinvolte sia nella coagulazione sanguigna che nel metabolismo osseo e nell''inibizione della calcificazione arteriosa.
D3/K2 COMPLEX è un integratore di vitamine D3 e vitamina K2 ideale per lo sportivo ad alte prestazioni.

La Vitamina D è un pro-ormone in grado di svolgere un importante ruolo a livello dei tessuti ossei. La vitamina D mostra azioni extra-scheletriche che regolano molti processi fisiologici: risposta immunitaria, salute cardiovascolare, obesità, diabete, depressione, declino cognitivo, patologie autoimmuni e alcune neoplasie.', '{"titolo":"Integratore Vitamina D3 e K2","valori_nutrizionali":{"per_dose_2_softgel":{"vitamina_d3":"50 mcg (1000% VNR)","vitamina_k2":"90 mcg (120% VNR)"}},"ingredienti":"Olio di SOIA, gelatina alimentare, glicerolo, acqua, menachinone (Vitamina K2), colecalciferolo (Vitamina D3).","nota":"VNR = Valori nutritivi di riferimento"}', 'Assumere fino a 2 perle al giorno suddivise nell''arco della giornata.', NULL, NULL, false, false, false, '2025-09-01 16:32:44.178891');
INSERT INTO public.product_groups VALUES (67, 'hard-amx-carbo-premier', 'Hard Amx Carbo', 6, 3, 'HARD AMX CARBO è un integratore alimentare in polvere di carboidrati, aminoacidi ramificati, L-glutamina, creatina, taurina, vitamine e minerali.', 'HARD AMX CARBO è un integratore alimentare in polvere di carboidrati, aminoacidi ramificati, L-glutamina, creatina, taurina, vitamine e minerali. HARD AMX CARBO è indicato per integrare l''alimentazione dello sportivo soprattutto dopo attività fisica intensa e prolungata. 

è indicato per integrare l''alimentazione soprattutto per il recupero dopo attività fisiche intense e prolungate.I carboidrati e i minerali presenti permettono di recuperare velocemente energia. I BCAA unitamente alla L-glutamina consentono il recupero svolgendo un''importante azione anticatabolica.

La creatina è coinvolta nel mantenimento delle riserve energetiche cellulari, mentre le vitamine e i minerali completano la formulazione contrastando l''azione ossidativa data dallo sforzo intenso.', '{"titolo":"Integratore Pre-Workout/Recupero","valori_nutrizionali":{"per_100g":{"energia":"1584 kj / 380 kcal","grassi":"0 g","carboidrati":"81 g","di_cui_zuccheri":"17 g","proteine":"0 g","sale":"0 g","potassio":"720 mg","magnesio":"180 mg","vitamina_c":"80 mg","vitamina_b1":"1,1 mg","vitamina_b2":"1,4 mg","vitamina_b6":"1,4 mg","vitamina_b12":"2,5 mcg","l_leucina":"5 g","l_valina":"2,5 g","l_isoleucina":"2,5 g","l_glutammina":"2 g","creatina":"2 g","taurina":"1 g"},"per_porzione_50g":{"energia":"792 kj / 190 kcal","grassi":"0 g","carboidrati":"40,5 g","di_cui_zuccheri":"8,5 g","proteine":"0 g","sale":"0 g","potassio":"360 mg (18% VNR)","magnesio":"90 mg (24% VNR)","vitamina_c":"40 mg (32% VNR)","vitamina_b1":"0,55 mg (50% VNR)","vitamina_b2":"0,7 mg (50% VNR)","vitamina_b6":"0,7 mg (50% VNR)","vitamina_b12":"1,25 mcg (50% VNR)","l_leucina":"2,5 g","l_valina":"1,25 g","l_isoleucina":"1,25 g","l_glutammina":"1 g","creatina":"1 g","taurina":"0,5 g"}},"ingredienti":"Maltodestrina, fruttosio, destrosio, acidificante: acido citrico (6%), L-leucina, acido tartarico, L-valina, L-isoleucina, L-glutammina, creatina monoidrato, potassio cloruro, aromi, taurina, coloranti (0.3%): succo di barbabietola disidratato, ossido di magnesio, acido l-ascorbico (vitamina C), sucralosio, cloridrato di piridossina (Vitamina B6), riboflavina (vitamina B2), cloridrato di tiamina (Vitamina B1), cianocobalamina (vitamina B12).","nota":"*VNR%: valori nutritivi di riferimento"}', 'Assumere 50 g di prodotto (3 misurini) in 250 ml d''acqua. All''interno della confezione è disponibile un misurino dosatore.', NULL, NULL, false, false, false, '2025-09-01 16:32:44.313033');
INSERT INTO public.product_groups VALUES (68, 'hard-wph-bv104-premier', 'Hard WPH BV104', 6, 1, 'HARD WPH BV104 è un integratore in polvere di proteine del Siero di latte Isolate Idrolizzate (predigestione enzimatica) OPTIPEP® 90 BV104.', 'HARD WPH BV104 è un integratore in polvere di proteine del Siero di latte Isolate Idrolizzate (predigestione enzimatica) OPTIPEP® 90 BV104. Il processo di predigestione (idrolisi) rende velocemente disponibili gli aminoacidi contenuti. HARD WPH BV104 ha un elevato valore biologico ed un profilo aminoacidico ottimale particolarmente ricco di aminoacidi ramificati, con un''eccellente solubilità. Arricchito con DigeZyme® (complesso di enzimi), vitamine B1, B2, B6 e B12.

HARD WPH BV104 è un integratore in polvere di proteine del latte isolate idrolizzate con un alto grado di idrolisi. Agiscono a pochi minuti dall''assunzione sul rifornimento delle riserve di glicogeno, ripristinando quelle utilizzate a scopo energetico e riparando i danni muscolari, contribuendo ad alleviare i dolori post allenamento e ottimizzando i tempi di recupero. Questo integratore, per la sua formulazione, è contraddistinto da un alto valore biologico (104) che descrive una proteina dal perfetto equilibrio amminoacidico e da un Pdcaas (Protein Digestibility Corrected Amino Acid Score) pari a 0,98 che indica una proteina considerata completa per l''uomo e in grado di fornire, dopo la digestione, il 100% degli aminoacidi essenziali necessari per una perfetta integrazione.', '{"titolo":"Integratore Proteico Idrolizzato","valori_nutrizionali":{"per_100g":{"valore_energetico":"386 kcal / 1640 kj","grassi":"2 g","di_cui_saturi":"0,5 g","carboidrati":"2 g","di_cui_zuccheri":"1,9 g","proteine":"90 g","sale":"0,2 g","vitamina_b1":"3,6 mg","vitamina_b2":"4,6 mg","vitamina_b6":"4,6 mg","vitamina_b12":"8,3 mcg"},"per_dose_30g":{"valore_energetico":"115 kcal / 492 kj","grassi":"0,6 g","di_cui_saturi":"0,3 g","carboidrati":"0,6 g","di_cui_zuccheri":"0,5 g","proteine":"27 g","sale":"60 mg","vitamina_b1":"1,1 mg (100% VNR)","vitamina_b2":"1,4 mg (100% VNR)","vitamina_b6":"1,4 mg (100% VNR)","vitamina_b12":"2,5 mcg (100% VNR)"}},"ingredienti":"Sieroproteine Idrolizzate del LATTE (Optipep® 90), cacao magro in polvere, NOCCIOLE tostate in polvere, aromi, Emulsionante: lecitina di SOIA; Digezyme® (miscela di ezimi da Aspergillus oryzae, Bacillus subtilis, Rhizopus oryzae, Trichoderma Longibrachiatum, eccipiente: maltodestrine da mais) Edulcoranti: Acelsufame K, Sucralosio; Vitamina B6 (cloridrato di piridossina), Vitamina B2 (Riboflavina), Vitamina B1 (cloridrato di tiamina), Vitamina B12 (Cianocobalamina).","nota":"VNR = valore nutrizionale di riferimento"}', 'Assumere fino a 30 g di prodotto (3 misurini) in 100 ml d''acqua al giorno lontano dai pasti principali. All''interno della confezione è presente un misurino dosatore.', NULL, NULL, false, false, false, '2025-09-01 16:32:44.446324');
INSERT INTO public.product_groups VALUES (69, 'hard-zma-xp-premier', 'Hard ZMA XP', 6, 7, 'HARD ZMA® XP è un integratore alimentare in compresse di ZMA® (zinco mono-L-metionina solfato, zinco L-aspartato, magnesio citrato, magnesio ossido, vitamina B6), arricchito con N-acetilcisteina, vitamine C-E.', 'HARD ZMA® XP è un integratore alimentare in compresse di ZMA® (zinco mono-L-metionina solfato, zinco L-aspartato, magnesio citrato, magnesio ossido, vitamina B6), arricchito con N-acetilcisteina, vitamine C-E.
Integratore alimentare di ZMA® dell''azienda americana InterHealth USA, specializzata in ricerca, sviluppo e distribuzione di ingredienti nutraceutici. HARD ZMA XP contiene esclusivamente ZMA® U.S. PATENT costituito da zinco mono-L-metionina solfato, zinco L-aspartato, magnesio citrato, magnesio ossido, vitamina B6 e arricchito con N-acetilcisteina, vitamine C ed E.

ZMA® aumenta i livelli di testosterone totale e libero, il fattore di crescita insulino-simile (IGF-1), la forza e la potenza muscolare. Il testosterone e l''IGF-1 sono inoltre coinvolti nei processi di recupero e rigenerazione muscolare.', '{"titolo":"ZMA, Vitamine e N-Acetylcisteina","valori_nutrizionali":{"per_porzione":{"porzione":"2 compresse","zma":"1,3 g","di_cui_zinco":"15 mg (150% VNR)","di_cui_magnesio":"250 mg (66,6% VNR)","di_cui_vitamina_b6":"6 mg (428% VNR)","n_acetylcisteina":"120 mg","vitamina_c":"180 mg (225% VNR)","vitamina_e":"30 mg (250% VNR)"}},"ingredienti":"ZMA® [zinco mono-L-metionina solfato, zinco L-aspartato, magnesio citrato, magnesio ossido, vitamina B6 (cloridrato di piridossina)], Vitamina C (Acido Ascorbico), N-Acetilcisteina, Vitamina E (Tocoferilacetato), Agenti antiagglomeranti: biossido di silicio, sali di magnesio degli acidi grassi; Agente di carica: cellulosa microcristallina.","nota":"VNR = valore nutrizionale di riferimento"}', 'Assumere fino a 2 compresse al giorno con acqua.', NULL, NULL, false, false, false, '2025-09-01 16:32:44.696673');
INSERT INTO public.product_groups VALUES (70, 'arginine-no-premier', 'Arginine NO', 6, 3, 'ARGININE NO è un integratore alimentare in compresse di L-Arginina (Kyowa), selenio e vitamina B6.', 'ARGININE NO è un integratore alimentare in compresse di L-Arginina (Kyowa), selenio e vitamina B6. ARGININE NO è indicato per integrare l''alimentazione dello sportivo soprattutto in caso di attività ﬁsiche intense e prolungate. ARGININE NO non contiene glutine.
ARGININE NO è un integratore alimentare in compresse di L-Arginina (Kyowa), selenio e vitamina B6. ARGININE NO è indicato per integrare l''alimentazione dello sportivo soprattutto in caso di attività ﬁsiche intense e prolungate. ARGININE NO non contiene glutine.

L''uso di Arginina in ambito sportivo è soprattutto legato al suo ruolo di antiossidante ed immunomodulante, importante soprattutto durante allenamenti particolarmente intensi e competizioni prolungate.

Non trascurabile anche il potenziale ruolo ergogenico, legato all''attività gluconeogenica dell''Arginina, e il ruolo detossificante nei confronti delle scorie azotate, solitamente più elevate negli sportivi.', '{"titolo":"Integratore Arginina e Vitamine","valori_nutrizionali":{"per_porzione":{"porzione":"3 compresse","l_arginina":"3 g","vitamina_b6":"2,1 mg (150% VNR)","selenio":"75 mcg (135% VNR)"}},"ingredienti":"L-Arginina, Stabilizzanti: biossido di silicio, sali di magnesio degli acidi grassi, Polivinilpirrolidone; Agente di carica: cellulosa microcristallina; Selenio chelato tit. 0,2%, Vitamina B6 (cloridrato di piridossina).","nota":"VNR = Valori nutritivi di riferimento"}', 'Assumere ﬁno a 3 compresse al giorno in funzione dell''entità globale dello sforzo muscolare.', NULL, NULL, false, false, false, '2025-09-01 16:32:44.829353');
INSERT INTO public.product_groups VALUES (71, 'total-egg-premier', 'Total EGG', 6, 1, 'TOTAL EGG è un integratore alimentare in polvere di proteine dell''albume d''uovo arricchito con vitamine C, E, B1, B2, B6, B12.', 'TOTAL EGG è un integratore alimentare in polvere di proteine dell''albume d''uovo arricchito con vitamine C, E, B1, B2, B6, B12. Le proteine contribuiscono alla crescita e al mantenimento della massa muscolare. Le vitamine B1, B2, B6 e B12 contribuiscono al normale metabolismo energetico.

TOTAL EGG è un prodotto per sportivi monoproteico di albume d''uovo in polvere (EUROVO) arricchito con vitamine. Il prodotto fornisce un elevato apporto proteico, presenta un elevato valore biologico ed un profilo aminoacidico ottimale. TOTAL EGG può essere considerato una fonte di proteine nobili e complete.

Le ovoalbumine rappresentano la tradizionale alternativa alle proteine del latte, infatti il loro valore biologico e l''efficienza proteica sono simili.

Le proteine d''albume d''uovo rappresentano la scelta ideale per tutti quegli sportivi che non tollerano i derivati del latte. Le ovoalbumine godono di un ottimale profilo aminoacidico, perché caratterizzato da un ottimo equilibrio tra i vari aminoacidi essenziali. Le proteine dell''albume d''uovo sono proteine intermedie, quindi possiedono un ottimo potere saziante e sono indicate in varie fasi della giornata oltre che nel post workout.', '{"titolo":"Integratore a base di Albumina d''uovo","valori_nutrizionali":{"per_100g":{"energia":"350,5 kcal / 1489,63 kj","grassi":"1 g","di_cui_saturi":"0,5 g","carboidrati":"6,0 g","di_cui_zuccheri":"3,5 g","proteine":"79 g","sale":"1,4 g","vitamina_c":"60 mg","vitamina_b1":"0,82 mg","vitamina_b2":"1,05 mg","vitamina_b6":"1,05 mg","vitamina_b12":"1,87 mcg"},"per_dose_40g":{"energia":"140 kcal / 593 kj","grassi":"0,4 g","di_cui_saturi":"0,2 g","carboidrati":"2,4 g","di_cui_zuccheri":"1,5 g","proteine":"32 g","sale":"0,6 g","vitamina_c":"24 mg (30% VNR)","vitamina_b1":"0,33 mg (30% VNR)","vitamina_b2":"0,42 mg (30% VNR)","vitamina_b6":"0,42 mg (30% VNR)","vitamina_b12":"0,75 mcg (30% VNR)"}},"ingredienti":"ALBUME D''UOVO in polvere, fruttosio, aromi, edulcoranti: Sucralosio; vitamina C (acido ascorbico), Vitamina B6 (cloridrato di piridossina), Vitamina B2 (riboflavina), Vitamina B1 (cloridrato di tiamina), Vitamina B12 (cianocobalamina).","nota":"VNR = valore nutrizionale di riferimento"}', 'Assumere fino 40 g di prodotto (4 misurini) in 250 ml d''acqua al giorno lontano dai pasti principali. All''interno della confezione è disponibile un misurino dosatore.', NULL, NULL, false, false, false, '2025-09-01 16:32:44.962862');
INSERT INTO public.product_groups VALUES (73, 'hard-eaa-8-1-premier', 'Hard EAA 8:1', 6, 2, 'HARD EAA 8:1 è un integratore di aminoacidi essenziali in compresse arricchito con L-Istidina e vitamina B2.', 'HARD EAA 8:1 è un integratore di aminoacidi essenziali in compresse arricchito con L-Istidina e vitamina B2.
EAA 8:1 FREE FORM è un integratore di Aminoacidi Essenziali in compresse arricchito con L-Istidina e Vitamina B2.

Gli Aminoacidi Essenziali sono 8 e fanno parte dei 20 aminoacidi che partecipano alla sintesi proteica e quindi al corretto svolgimento delle funzioni dell''organismo umano. Sono definiti essenziali quegli aminoacidi che il corpo non riesce a sintetizzare in quantità sufficiente a far fronte ai propri bisogni: Fenilalanina, Isoleucina, Lisina, Leucina, Metionina, Treonina, Triptofano e Valina. La scarsità o la mancanza di un aminoacido essenziale agisce infatti come fattore limitante della sintesi proteica endogena.', '["Aminoacidi essenziali nel rapporto 8:1:1","Formula avanzata con leucina potenziata","Supporta la sintesi proteica","Ideale per il recupero post-allenamento","Compresse facili da assumere"]', 'Assumere fino a 5 compresse al giorno con acqua.', NULL, NULL, false, false, false, '2025-09-01 16:32:45.332179');
INSERT INTO public.product_groups VALUES (128, 'total-energy', 'Total Energy', 6, 3, 'TOTAL ENERGY è un integratore in polvere a base di fruttosio e maltodestrine, minerali (potassio, magnesio, cromo, fosforo e calcio), vitamina C-E-B6 e L-Carnitina.', 'TOTAL ENERGY è un integratore energetico per sportivi in polvere a base di Fruttosio e Maltodestrine (zuccheri semplici a media catena), che permettono di ottenere energia immediata a lungo termine; è arricchito con L-Carnitina in grado di veicolare gli acidi grassi favorendo la produzione di energia per le cellule, preservando la massa magra e incrementando le prestazioni durante l''allenamento, vitamine (C, E, B6) e minerali (potassio, magnesio, cromo, fosforo e calcio), essenziali per il benessere complessivo del corpo.', '[{"titolo":"Integratore Energetico e di Sali Minerali","valori_nutrizionali":{"per_100g":{"valore_energetico":"1554 kj / 365 kcal","grassi":"0 g","di_cui_acidi_grassi_saturi":"0 g","carboidrati":"85 g","di_cui_zuccheri":"46 g","proteine":"0 g","sale":"0 g","calcio":"600 mg","fosforo":"600 mg","potassio":"900 mg","magnesio":"225 mg","vitamina_c":"40 mg","vitamina_e":"6,75 mg","vitamina_b6":"1,37 mg","cromo":"60 mcg","l_carnitina_l_tartrato":"250 mg"},"per_dose_40g":{"valore_energetico":"622 kj / 146 kcal","grassi":"0 g","di_cui_acidi_grassi_saturi":"0 g","carboidrati":"34 g","di_cui_zuccheri":"18,4 g","proteine":"0 g","sale":"0 g","calcio":"240 mg (30% VNR)","fosforo":"240 mg (34% VNR)","potassio":"360 mg (18% VNR)","magnesio":"90 mg (24% VNR)","vitamina_c":"16 mg (20% VNR)","vitamina_e":"2,7 mg (22,5% VNR)","vitamina_b6":"0,55 mg (39% VNR)","cromo":"24 mcg (60% VNR)","l_carnitina_l_tartrato":"100 mg"}},"ingredienti":"Maltodestrine, Fruttosio, Acidificante: acido citrico (6.26%), Calcio fosfato, Potassio citrato, Aromi, Magnesio ossido, L-Carnitina-Tartrato, Coloranti (0.3%): succo di barbabietola disidratato, betacarotene; Acido l-ascorbico (Vitamina C), DL-alfa tocoferilacetato (Vitamina E), Piridossina cloridrato (Vitamina B6), Cromo picolinato.","nota":"VNR = valori nutritivi di riferimento"}]', 'assumere 40 g di prodotto (2 misurini) in 250 ml d''acqua. All''interno della confezione è disponibile un misurino dosatore.', NULL, NULL, false, false, false, '2025-09-02 14:50:35.970131');
INSERT INTO public.product_groups VALUES (129, 'hard-staart-x-plode', 'Hard Start X-Plode', 6, 3, 'HARD START X-PLODE è un integratore alimentare in polvere di Beta Alanina, Trigliceridi a media catena MCT, Creatina (Creapure®), Citrullina, L-Arginina (Kyowa®), L-Arginina Cloridato, Taurina, Paulinia Cupana, Vitamina B6 e B12.', 'HARD START X-PLODE è un integratore alimentare in polvere di Beta Alanina, Trigliceridi a media catena MCT, Creapure®, Citrullina KYOWA, L-Arginina KYOWA, L-Arginina Cloridrato, Taurina, Paulinia Cupana, Vitamina B6 e B12. HARD START X-PLODE è un PRE WORK-OUT indicato per integrare l''alimentazione dello sportivo soprattutto in caso di attività fisiche intense e prolungate, favorendo la forza e la durata della performance.', '[{"titolo":"Integratore Pre-Workout","valori_nutrizionali":{"per_100g":{"valore_energetico":"1089,7 kj / 256,4 kcal","grassi":"10 g","di_cui_saturi":"10 g","carboidrati":"40 g","di_cui_zuccheri":"16 g","proteine":"0 g","sale":"500 mg","beta_alanina":"13,33 g","mct":"13,33 g","l_arginina":"6,66 g","citrullina":"4 g","arginina_hcl":"3,33 g","di_cui_arginina":"2,76 g","creatina_monoidrato":"9,99 g","di_cui_creatina":"8,79 g","taurina":"3,33 g","paulinia_cupana":"0,5 g","di_cui_caffeina":"125 mg","niacina":"107 mg","vitamina_b6":"9,3 mg"},"per_dose_15g":{"valore_energetico":"163,62 kj / 38,5 kcal","grassi":"1,5 g","di_cui_saturi":"1,5 g","carboidrati":"6 g","di_cui_zuccheri":"2,4 g","proteine":"0 g","sale":"75 mg","beta_alanina":"2 g","mct":"2 g","l_arginina":"1 g","citrullina":"0,6 g","arginina_hcl":"0,5 g","di_cui_arginina":"0,4 g","creatina_monoidrato":"1,5 g","di_cui_creatina":"1,32 g","taurina":"0,5 g","paulinia_cupana":"75 mg","di_cui_caffeina":"18,8 mg","niacina":"16 mg (100% VNR)","vitamina_b6":"1,4 mg (100% VNR)"}},"ingredienti":"Maltodestrine (da mais), Beta Alanina, Trigliceridi a media catena MCT, Fruttosio, L-Arginina (Kyowa®), Citrullina, Acido Citrico, Creatina monoidrato (Creapure®), L-Arginina Cloridrato, Taurina, Aroma, Acido Tartarico, Polvere di Barbabietola, Sodio Bicarbonato, Paulinia Cupana h.s.k. Semen e.s. tit. 10% Caffeina. Edulcoranti: Acelsufame K, Sucralosio; Niacina, Vitamina B6 (Piridossina Cloridrato). Prodotto e confezionato in stabilimento che utilizza anche latte, uova, soia, nocciole e loro derivati.","nota":"*VNR: valori nutrizionali di riferimento"}]', 'assumere 15 g di prodotto (20 cc del misurino graduato disponibile all''interno della confezione) con acqua 30 minuti prima dell''allenamento.', NULL, NULL, false, false, false, '2025-09-02 14:50:36.154445');
INSERT INTO public.product_groups VALUES (90, 'amino-pool-bv104-premier', 'Amino Pool BV104', 6, 1, 'AMINO POOL BV 104 è un integratore a base di proteine del siero di latte isolate idrolizzate OPTIPEP® 90 con un alto grado di idrolisi (DH8) perfetto per tutte le fasi della giornata e post allenamento.', 'AMINO POOL BV 104 è un integratore a base di proteine del siero di latte isolate idrolizzate OPTIPEP® 90 con un alto grado di idrolisi (DH8) perfetto per tutte le fasi della giornata e post allenamento. Amino Pool BV 104 sono proteine del latte isolate idrolizzate con un alto grado di idrolisi (DH8) e quindi con un maggior apporto di peptidi a basso peso molecolare rispetto alle DH4. Questo consente il più alto grado di assorbimento e l''immediata disponibilità degli amminoacidi BCAA e EAA di cui sono composte. Agiscono a pochi minuti dall''assunzione sul rifornimento delle riserve di glicogeno, rispristinando quelle utilizzate a scopo energetico e riparando i danni muscolari, contribuendo ad alleviare i dolori post allenamento e ottimizzando i tempi di recupero.', '"{\"titolo\":\"Integratore Proteico Idrolizzato in compresse\",\"valori_nutrizionali\":{\"per_100g\":{\"valore_energetico\":\"357,81 Kcal / 1520,69 Kj\",\"proteine\":\"87,38 g\",\"carboidrati\":\"0,97 g\",\"di_cui_zuccheri\":\"0,97 g\",\"grassi\":\"0,49 g\",\"di_cui_saturi\":\"0 g\",\"fibre\":\"0 g\",\"sale\":\"0,165 g\"},\"per_dose_10_compresse\":{\"valore_energetico\":\"36,85 Kcal / 156,63 Kj\",\"proteine\":\"9 g\",\"carboidrati\":\"0,1 g\",\"di_cui_zuccheri\":\"0,1 g\",\"grassi\":\"0,05 g\",\"di_cui_saturi\":\"0 g\",\"fibre\":\"0 g\",\"sale\":\"0,017 g\"}},\"ingredienti\":\"Sieroproteine Isolate Idrolizzate del LATTE (Optipep® 90 DH8); Antiagglomerante: Biossido di Silicio, Magnesio Stearato.\"}"', 'Assumere 10 compresse al giorno con acqua.', NULL, NULL, false, false, false, '2025-09-01 21:31:10.91653');
INSERT INTO public.product_groups VALUES (130, 'glutamine-pure-1000', 'Glutamine Pure 1000', 6, 2, 'GLUTAMINE PURE 1000 è un integratore alimentare di La L-Glutammina (Kyowa®) in compresse. La L-Glutammina è l''aminoacido più presente nel corpo umano, fondamentale quando il corpo è sottoposto a stress psico-fisici. Ideale nei periodi di allenamento intenso per recuperare, potenziare il sistema immunitario e ridurre i rischi di sovrallenamento.', 'GLUTAMINE PURE 1000 è un integratore alimentare di La L-Glutammina (Kyowa®) in compresse. La L-Glutammina è l''aminoacido più presente nel corpo umano, fondamentale quando il corpo è sottoposto a stress psico-fisici. Ideale nei periodi di allenamento intenso per recuperare, potenziare il sistema immunitario e ridurre i rischi di sovrallenamento. La L-Glutammina è l''aminoacido più presente nel corpo umano naturalmente prodotto dal nostro organismo, fondamentale quando il corpo è sottoposto a stress psico-fisici.', '[{"titolo":"L-Glutammina Integratore","valori_nutrizionali":{"per_porzione":{"porzione":"3 compresse","l_glutammina":"3 g"}},"ingredienti":"L-Glutammina (Kyowa®), agente di carica: cellulosa microcristallina; amido di mais, stabilizzanti: sali di magnesio degli acidi grassi, biossido di silicio."}]', 'Assumere 3 compresse al giorno.', NULL, NULL, false, false, false, '2025-09-02 14:51:37.594304');
INSERT INTO public.product_groups VALUES (131, 'high-pro-release', 'High Pro Release', 6, 1, 'HIGH PRO RELEASE è un integratore alimentare in polvere di proteine del latte (caseinato di calcio, caseina micellare, proteine del siero di latte concentrate Volactive® ed isolate cfm Volactive®), proteine isolate del pisello (Pisane®), indicato per integrare l''alimentazione dello sportivo.', 'HIGH PRO RELEASE è un integratore alimentare in polvere di proteine del latte (caseinato di calcio, caseina micellare, proteine del siero di latte concentrate Volactive® ed isolate cfm Volactive®), proteine isolate del pisello (Pisane®), indicato per integrare l''alimentazione dello sportivo. HIGH PRO RELEASE fornisce una fonte proteica bilanciata di elevata qualità con un''eccellente solubilità.', '[{"titolo":"Integratore Proteico con Enzimi","valori_nutrizionali":{"per_100g":{"energia":"1661 kj / 391 kcal","grassi":"2,5 g","di_cui_saturi":"0,5 g","carboidrati":"3 g","di_cui_zuccheri":"1,9 g","proteine":"87 g","sale":"0,7 g","vitamina_b1":"2,75 mg","vitamina_b2":"3,5 mg","vitamina_b6":"3,5 mg","vitamina_b12":"4 mcg","l_arginina":"1,5 g","citrullina":"1 g","miscela_di_enzimi_digezyme":"150 mg"},"per_dose_40g":{"valore_energetico":"664 kj / 156 kcal","grassi":"1 g","di_cui_saturi":"0,4 g","carboidrati":"1,2 g","di_cui_zuccheri":"0,8 g","proteine":"35 g","sale":"0,33 g","vitamina_b1":"1,1 mg (100% VNR)","vitamina_b2":"1,4 mg (100% VNR)","vitamina_b6":"1,4 mg (100% VNR)","vitamina_b12":"2,5 mcg (100% VNR)","l_arginina":"0,6 g","citrullina":"0,4 g","miscela_di_enzimi_digezyme":{"alpha_amilasi":"17,7 mg","proteasi":"9,3 mg","lipasi":"240 mcg","cellulasi":"4,3 mg"}}},"ingredienti":"Proteine del LATTE (caseinato di calcio, caseina micellare, sieroproteine concentrate ed isolate), proteine isolate del pisello, aromi, Emulsionante: lecitina di girasole; L-Arginina, Citrullina, DigeZyme® (miscela di ezimi da Aspergillus oryzae, Bacillus subtilis, Rhizopus oryzae, Trichoderma Longibrachiatum, eccipiente: maltodestrine da mais). Edulcoranti: Acelsufame K, Sucralosio; Vitamina B6 (Piridossina cloridrato), Vitamina B2 (Riboflavina), Vitamina B1 (cloridrato di tiamina), Vitamina B12 (Cianocobalamina).","nota":"VNR = Valori nutritivi di riferimento"}]', 'Assumere fino a 40 g di prodotto (4 misurini) in 250 ml d''acqua al giorno lontano dai pasti principali. All''interno della confezione è presente un misurino dosatore.', NULL, NULL, false, false, false, '2025-09-02 14:51:37.842712');
INSERT INTO public.product_groups VALUES (132, 'borraccia-ethicsport', 'Borraccia 600/800 ml', 22, 29, 'Borraccia da 800ml in materiale pregiato, adatta per ciclismo e MTB. Lavabile, igienica, riutilizzabile, morbida, idonea alla conservazione di alimenti.', 'Borraccia da 800ml in materiale pregiato, adatta per ciclismo e MTB. Lavabile, igienica, riutilizzabile, morbida, idonea alla conservazione di alimenti.', '[]', 'Si consiglia il lavaggio a mano.', NULL, NULL, false, false, false, '2025-09-02 14:52:47.888395');
INSERT INTO public.product_groups VALUES (133, 'sacca', 'Sacca', 22, 29, 'Esclusiva sacca con logo EthicSport in poliestere 44X33 cm', 'Sacca con logo EthicSport adatta per tutte le occasioni.', '[]', 'Si consiglia il lavaggio a mano.', NULL, NULL, false, false, false, '2025-09-02 14:52:48.133869');
INSERT INTO public.product_groups VALUES (134, 't-shirt-ethcisport-limited-edition', 'T-Shirt EthicSport Limited Edition', 22, 29, 'Esclusiva T-Shirt EthicSport in cotone di elevata qualità.', 'Esclusiva T-Shirt EthicSport in cotone di elevata qualità. E'' un articolo esclusivo indossato dai nostri atleti e dai nostri ambassador. Disponibile nelle taglie: S, M, L, XL.', '[]', '???', NULL, NULL, false, false, false, '2025-09-02 14:52:48.265987');
INSERT INTO public.product_groups VALUES (135, 'capppellino-ethicsport', 'Cappellino EthicSport', 22, 29, 'CAPPELLINO EthicSport con ricamo in 3D e dettagli sportivi', '· Cappellino EthicSport con visiera piatta · Ricamo in 3D e dettagli laterali stampati in tono su tono, per un look moderno e sportivo · Struttura a sei pannelli · Visiera a sandwich bicolore · Interno personalizzato e rifinito in arancio · Chiusura regolabile sul retro per una vestibilità perfetta · Occhielli ricamati per un''eccellente traspirazione', '[]', 'Si consiglia il lavaggio a mano.', NULL, NULL, false, false, false, '2025-09-02 14:52:48.698295');
INSERT INTO public.product_groups VALUES (136, 'ramtech-bcaa-2-1-1-ethicsport', 'Ramtech - BCAA 2:1:1', 22, 2, 'Gli amminoacidi ramificati (BCAA, Branched Chain Amino Acids) sono nutrienti essenziali che l''organismo non è in grado di produrre autonomamente e rappresentano una parte importante delle proteine muscolari.', 'Gli amminoacidi ramificati (BCAA, Branched Chain Amino Acids) sono nutrienti essenziali che l''organismo non è in grado di produrre autonomamente e rappresentano una parte importante delle proteine muscolari. Per questo sono considerati un valido supporto nutrizionale per chi svolge attività fisica.', '[{"titolo":"Integratore BCAA","valori_nutrizionali":{"per_porzione":{"porzione":"5 caps","bcaa":"5000 mg","di_cui_l_leucina":"2500 mg","di_cui_l_valina":"1250 mg","di_cui_l_isoleucina":"1250 mg","vitamina_b1":"0.83 mg (75% VNR)","vitamina_b6":"1.8 mg (129% VNR)"}},"ingredienti":"Aminoacidi a catena ramificata BCAA (L-leucina, L-valina, L-isoleucina, emulsionante lecitina), agente di carica: idrossipropilmetilcellulosa; cloridrato di pirossidina (Vitamina B6), cloridrato di tiamina (Vitamina B1).","nota":"NRV (Valore Nutritivo di Riferimento- Reg UE n.1169/2011)"}]', 'Si consiglia di assumere fino a 5 capsule al giorno, preferibilmente dopo l''allenamento o lontano dai pasti. In caso di allenamenti particolarmente lunghi o intensi, i BCAA possono essere utilizzati anche durante l''attività per sostenere l''organismo.', NULL, NULL, false, false, false, '2025-09-02 14:52:48.831694');
INSERT INTO public.product_groups VALUES (137, 'glutamine-pure-100', 'Glutamine Pure 100%', 6, 2, 'GLUTAMINE PURE 100% è un integratore alimentare di L-Glutammina (Kyowa®) in polvere.', 'GLUTAMINE PURE 100% è un integratore alimentare di L-Glutammina (Kyowa®) in polvere. La L-Glutammina è l''aminoacido più presente nel corpo umano.', '[]', 'Assumere 10 g di prodotto (1 misurino) al giorno.', NULL, NULL, false, false, false, '2025-09-02 14:54:09.688777');
INSERT INTO public.product_groups VALUES (138, 'maltodex-pure-100', 'Maltodex Pure 100%', 6, 7, 'MALTODEX PURE 100% è un integratore alimentare di maltodestrine da mais.', 'MALTODEX PURE 100% è un integratore alimentare di maltodestrine da mais. Le maltodestrine sono carboidrati complessi.', '[]', 'Assumere fino a 60 g di prodotto (3 misurini) in 250 ml d''acqua al giorno.', NULL, NULL, false, false, false, '2025-09-02 14:54:09.982338');
INSERT INTO public.product_groups VALUES (139, 'omnia-active-formula', 'OMNIA Active Formula', 22, 7, 'Integratore di vitamine e minerali ad alto dosaggio, per contrastare debilitazione e stanchezza, o per chi svolge attività fisiche intense. Utile per ricaricare l''organismo di vitamine.', 'OMNIA® Active Formula è un integratore alimentare di vitamine e minerali con fosfatidilcolina.', '[]', '1 Capsula al giorno.', NULL, NULL, false, false, false, '2025-09-02 14:54:10.121672');
INSERT INTO public.product_groups VALUES (140, 'super-hydro-plus', 'Super Hydro Tabs', 22, 3, 'Integratore alimentare idrosalino, senza zuccheri, ipotonico e zero calorie!', 'SuperHydro Tabs è un integratore alimentare idrosalino in compresse, senza zuccheri aggiunti e senza calorie.', '[]', 'Sciogliere 1 compressa in circa 500 ml di acqua. Assumere ad intervalli regolari di 15-20 minuti.', NULL, NULL, false, false, false, '2025-09-02 14:54:10.265204');
INSERT INTO public.product_groups VALUES (141, 'pre-gara-endurance', 'Pre Gara Endurance', 22, 3, 'Integratore alimentare studiato per massimizzare la resistenza.', 'Il prodotto permette di realizzare una soluzione di carboidrati complessi ed elettroliti, utile al mantenimento di prestazioni di resistenza durante l''esercizio fisico prolungato.', '[]', 'Si consiglia l''utilizzo del prodotto circa 30min. prima dell''impegno sportivo. Utilizzare 1 busta in circa 200 ml di acqua per attività di media durata.', NULL, NULL, false, false, false, '2025-09-02 14:54:10.50789');


--
-- Data for Name: product_images; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.product_images VALUES (350, 998, '/images/products/EP926741758_singolo_1751038145711.png', 'Epilact Sport Protezione Unghie', true);
INSERT INTO public.product_images VALUES (351, 999, '/images/products/EP973147061_singolo_1751038145714.png', 'PhysioStrap Ski', true);
INSERT INTO public.product_images VALUES (352, 1000, '/images/products/WSX244_singolo_1751038145715.png', 'Borraccia WHY Sport 500ml', true);
INSERT INTO public.product_images VALUES (353, 1001, '/images/products/WSX248_singolo_1751038145715.png', 'Borsone WHY Sport', true);
INSERT INTO public.product_images VALUES (354, 1002, '/images/products/WSX276_singolo_1751038145717.png', 'Sport Shaker WHY Sport', true);
INSERT INTO public.product_images VALUES (355, 1003, '/images/products/WSX368_singolo_1751038145719.png', 'Borraccia Sport 500ml', true);
INSERT INTO public.product_images VALUES (484, 1140, '/images/products/power-whey-amino-support-vaniglia.jpg', 'Power Whey Amino Support Vaniglia - Immagine prodotto', true);
INSERT INTO public.product_images VALUES (357, 1005, '/images/products/WSX179_singolo_1751038922384.png', 'Top Donna WHY Sport', true);
INSERT INTO public.product_images VALUES (358, 1006, '/images/products/WSX182_singolo_1751038922384.png', 'Short Donna WHY Sport', true);
INSERT INTO public.product_images VALUES (363, 1007, '/images/products/aminoacidi-essenziali-300g-cola-lemon.png', 'Aminoacidi Essenziali Cola Lemon 300g', true);
INSERT INTO public.product_images VALUES (360, 828, '/images/complex-carbs-advanced-ratio.webp', 'Complex Carbs Advanced Ratio', true);
INSERT INTO public.product_images VALUES (106, 633, '/images/products/08-carbo-energy-albicocca.jpg', 'Carbo Energy+ Albicocca 40g +Watt', true);
INSERT INTO public.product_images VALUES (107, 633, '/images/products/09-carbo-energy-frutti-bosco.jpg', 'Carbo Energy+ Frutti di Bosco 40g +Watt', false);
INSERT INTO public.product_images VALUES (108, 633, '/images/products/10-carbo-energy-agrumi.jpg', 'Carbo Energy+ Agrumi 40g +Watt', false);
INSERT INTO public.product_images VALUES (109, 633, '/images/products/11-carbo-energy-mela-verde.jpg', 'Carbo Energy+ Mela Verde 40g +Watt', false);
INSERT INTO public.product_images VALUES (110, 634, '/images/products/12-fruitforce-fragola.jpg', 'FruitForce Fragola 37ml +Watt', true);
INSERT INTO public.product_images VALUES (113, 637, '/images/products/16-light-protein-bar-cheesecake.jpg', 'Light PROTEIN+ Bar Cheesecake 50g Premier', true);
INSERT INTO public.product_images VALUES (114, 637, '/images/products/17-light-protein-bar-caramello.jpg', 'Light PROTEIN+ Bar Caramello 50g Premier', false);
INSERT INTO public.product_images VALUES (368, 1012, '/images/products/vpr-vegetal-protein-integratore-alimentare-di-proteine-vegetali.png', 'VPR-VEGETAL PROTEIN INTEGRATORE ALIMENTARE DI PROTEINE VEGETALI', true);
INSERT INTO public.product_images VALUES (369, 1013, '/images/products/magnesium-glycinate.png', 'MAGNESIUM GLYCINATE', true);
INSERT INTO public.product_images VALUES (370, 1014, '/images/products/thermo-master.png', 'Thermo Master', true);
INSERT INTO public.product_images VALUES (372, 1016, '/images/products/maltoshot-endurance-plus.png', 'MALTOSHOT ENDURANCE PLUS', true);
INSERT INTO public.product_images VALUES (373, 1017, '/images/products/super-dextrin-sweet.jpg', 'Super Dextrin Energy Bar', true);
INSERT INTO public.product_images VALUES (381, 1025, '/images/products/glucosamina-+-condroitina-+-msm-+-vitamina-c.png', 'Glucosamina + Condroitina + MSM + Vitamina C', true);
INSERT INTO public.product_images VALUES (382, 1026, '/images/products/starter-1000.jpg', 'Starter 1000', true);
INSERT INTO public.product_images VALUES (383, 1027, '/images/products/caffeina-suprema.png', 'Caffeina Suprema', true);
INSERT INTO public.product_images VALUES (384, 1028, '/images/products/super-dextrin-gel-pro.png', 'Super Dextrin Gel Pro', true);
INSERT INTO public.product_images VALUES (490, 1146, '/images/products/prime-casein-cioccolato.jpg', 'Prime Casein Cioccolato - Immagine prodotto', true);
INSERT INTO public.product_images VALUES (494, 1150, '/images/products/prime-oat-cioccolato.jpg', 'Prime Oat Cioccolato - Immagine prodotto', true);
INSERT INTO public.product_images VALUES (563, 1222, '/images/products/caffè-verde-te-matcha-800mg.jpg', 'Caffè Verde+Tè Matcha 800mg 60 capsule', true);
INSERT INTO public.product_images VALUES (567, 1226, '/images/products/glutatione-liposomiale.jpg', 'Glutatione Liposomiale 30 capsule', true);
INSERT INTO public.product_images VALUES (103, 631, '/images/products/03-barrettone-burro-arachidi.jpg', 'Barrettone 2.0 Burro Arachidi 70g +Watt', true);
INSERT INTO public.product_images VALUES (565, 1224, '/images/products/co-q10-forte-1000mg.jpg', 'CO-Q10 Forte 1000mg 90 capsule', true);
INSERT INTO public.product_images VALUES (399, 926, '/images/products/d-glucosio.jpg', 'D-Glucosio', true);
INSERT INTO public.product_images VALUES (566, 1225, '/images/products/depurixia-antiossidante.jpg', 'Depurixia 60 capsule', true);
INSERT INTO public.product_images VALUES (562, 1221, '/images/products/astaxantina-plus.jpg', 'Astaxantina Plus 60 capsule', true);
INSERT INTO public.product_images VALUES (112, 636, '/attached_assets/ISO-SOYA-SITO_1755522191253.png', 'Iso Soya Premier 750g', true);
INSERT INTO public.product_images VALUES (405, 932, '/images/products/pocket-carnitine.jpg', 'Pocket Carnitine', true);
INSERT INTO public.product_images VALUES (403, 929, '/images/products/hard-beta-alanine.jpg', 'Hard Beta Alanine', true);
INSERT INTO public.product_images VALUES (404, 930, '/images/products/high-bcaa-2-1-1.jpg', 'High BCAA 2:1:1', true);
INSERT INTO public.product_images VALUES (402, 928, '/images/products/glutammina-plus-polvere-authentic.jpg', 'Glutammina+ Polvere', true);
INSERT INTO public.product_images VALUES (569, 1228, '/images/products/lipoic-800-crom.jpg', 'Lipoic 800 Crom 60 capsule', true);
INSERT INTO public.product_images VALUES (570, 1229, '/images/products/lipoic-b.jpg', 'Lipoic B 90 capsule', true);
INSERT INTO public.product_images VALUES (401, 941, '/images/W331_GLUTAMMINA-PURE-500g.png', 'Glutammina Pure', true);
INSERT INTO public.product_images VALUES (406, 933, '/images/products/rm1-bcaa-8-1-1-recovery-mix.jpg', 'R.M.1 BCAA 8:1:1 Recovery Mix', true);
INSERT INTO public.product_images VALUES (366, 1011, '/images/products/eaa-pro-finale.jpg', 'EAA Pro Anguria 420g', true);
INSERT INTO public.product_images VALUES (367, 1011, '/images/products/eaa-pro-finale.jpg', 'EAA Pro Melon 420g', false);
INSERT INTO public.product_images VALUES (498, 1154, '/images/products/prime-whey-hydro-plus-cioccolato.jpg', 'Prime Whey Hydro Plus Cioccolato - Immagine prodotto', true);
INSERT INTO public.product_images VALUES (501, 1157, '/images/products/prime-wpi-vaniglia.jpg', 'Prime WPI Vaniglia - Immagine prodotto', true);
INSERT INTO public.product_images VALUES (374, 1018, '/images/products/testogen.png', 'Testogen', true);
INSERT INTO public.product_images VALUES (375, 1019, '/images/products/fluid-motion.png', 'Fluid Motion', true);
INSERT INTO public.product_images VALUES (376, 1020, '/images/products/collagene-ethicsport.png', 'Collagene', true);
INSERT INTO public.product_images VALUES (378, 1022, '/images/products/vitamina-c-1000.png', 'Vitamina C 1000', true);
INSERT INTO public.product_images VALUES (104, 632, '/images/products/06-big-bar-cocco.jpg', 'Big Bar Cocco 80g +Watt', true);
INSERT INTO public.product_images VALUES (101, 631, '/images/products/04-barrettone-cacao.jpg', 'Barrettone 2.0 Cacao 70g +Watt', true);
INSERT INTO public.product_images VALUES (102, 631, '/images/products/05-barrettone-vaniglia.jpg', 'Barrettone 2.0 Vaniglia 70g +Watt', true);
INSERT INTO public.product_images VALUES (105, 632, '/images/products/07-big-bar-cookie-nocciola.jpg', 'Big Bar Cookie Nocciola 80g +Watt', true);
INSERT INTO public.product_images VALUES (379, 1023, '/images/products/vitamina-d3-2000-iu.png', 'Vitamina D3 2000 IU', true);
INSERT INTO public.product_images VALUES (380, 1024, '/images/products/super-dextrin-pro.png', 'Super Dextrin Pro', true);
INSERT INTO public.product_images VALUES (385, 1029, '/images/products/repoxan.jpg', 'Repoxan', true);
INSERT INTO public.product_images VALUES (386, 1030, '/images/products/creatina-vector.jpg', 'Creatina Vector', true);
INSERT INTO public.product_images VALUES (503, 1159, '/images/products/pure-soy-isolate-cioccolato.jpg', 'Pure Soy Isolate Cioccolato - Immagine prodotto', true);
INSERT INTO public.product_images VALUES (407, 943, '/images/products/essenziali-zero-carb-finale.jpg', 'Essenziali Zero Carb', true);
INSERT INTO public.product_images VALUES (506, 1176, '/images/products/whey-iso-brownies.jpg', 'Whey Iso Brownies', true);
INSERT INTO public.product_images VALUES (516, 1186, '/images/products/arginina-alfaketoglutarato-2000.jpg', 'Arginina Alfaketoglutarato 2000', true);
INSERT INTO public.product_images VALUES (586, 1245, '/images/products/daa-90cpr-200ml.jpg', 'DAA Acido D-aspartico', true);
INSERT INTO public.product_images VALUES (532, 1188, '/images/products/arginina-piroglutammato-e-lisina.jpg', 'Arginina Piroglutammato e Lisina 70 capsule', true);
INSERT INTO public.product_images VALUES (533, 1189, '/images/products/beta-alanina-1000-mg.jpg', 'Beta Alanina 1000 mg 120 compresse', true);
INSERT INTO public.product_images VALUES (534, 1190, '/images/products/creatina-krealkalyn-120-cpr.jpg', 'Creatina Krealkalyn 120 compresse', true);
INSERT INTO public.product_images VALUES (515, 1185, '/images/products/acido-d-aspartico-corrected.jpg', 'Acido D-Aspartico', true);
INSERT INTO public.product_images VALUES (223, 756, '/images/products/magnesio-tripla-azione.png', 'Magnesio Tripla Azione', true);
INSERT INTO public.product_images VALUES (226, 759, '/images/products/alaform-800.png', 'Alaform 800', true);
INSERT INTO public.product_images VALUES (225, 758, '/images/products/ashwagandha-60-compresse.png', 'Ashwagandha', true);
INSERT INTO public.product_images VALUES (517, 1187, '/images/products/arginina-argipower-corrected.jpg', 'Arginina Argipower 100%', true);
INSERT INTO public.product_images VALUES (211, 744, '/images/products/2393_singolo_1750627156891.png', 'Selenio 100', true);
INSERT INTO public.product_images VALUES (212, 745, '/images/products/2847_singolo_1750627156892.png', 'Calcio Citrato + D3', true);
INSERT INTO public.product_images VALUES (213, 746, '/images/products/4622_singolo_1750627156892.png', 'Licopene', true);
INSERT INTO public.product_images VALUES (214, 747, '/images/products/4793_singolo_1750627156892.png', 'Vita-Vim Multivitaminico', true);
INSERT INTO public.product_images VALUES (215, 748, '/images/products/4883_singolo_1750627156892.png', 'Lutein Z', true);
INSERT INTO public.product_images VALUES (216, 749, '/images/products/5634_singolo_1750627156892.png', 'Spirulina', true);
INSERT INTO public.product_images VALUES (218, 751, '/images/products/7355_singolo_1750627156892.png', 'Omega-3 Select Mini', true);
INSERT INTO public.product_images VALUES (220, 753, '/images/products/7920_singolo_1750627156892.png', 'Omega-3 Extra', true);
INSERT INTO public.product_images VALUES (221, 754, '/images/products/7959_singolo_1750627156892.png', 'Vitamina C Masticabile', true);
INSERT INTO public.product_images VALUES (227, 760, '/images/products/2194_singolo.png', 'Korean Red Ginseng', true);
INSERT INTO public.product_images VALUES (229, 796, '/images/products/FIBRA WATT_Fronte_1750780343032.jpg', 'Fibra Watt - Glucomannano 60 compresse', true);
INSERT INTO public.product_images VALUES (230, 797, '/images/products/HARD-B-LIFE-COMPLEX-SITO-300x411 (1)_1750780343035.png', 'Hard B-Life Complex - Vitamine B 60 compresse', true);
INSERT INTO public.product_images VALUES (232, 799, '/images/products/HARD-DREN-SITO-300x411_1750780343036.png', 'Hard Dren 1000 - Drenante 60 compresse', true);
INSERT INTO public.product_images VALUES (233, 800, '/images/products/HARD-VITAMIN-SITO-300x411 (1)_1750780343037.png', 'Hard Vitamin Complex - Multivitaminico 90 compresse', true);
INSERT INTO public.product_images VALUES (234, 801, '/images/products/HEPAX-FORTE-300x411 (1)_1750780343037.png', 'Hepax Forte - Supporto epatico 60 compresse', true);
INSERT INTO public.product_images VALUES (235, 802, '/images/products/JOINT-FLEX-sito-300x411_1750780343038.png', 'Joint Flex D3 Plus - Articolazioni 60 compresse', true);
INSERT INTO public.product_images VALUES (242, 807, '/images/products/Omega3 EGQ 180 perle FRONTE_1750780343042.jpg', 'Omega 3 Egq - EPA DHA 180 compresse', true);
INSERT INTO public.product_images VALUES (243, 808, '/images/products/OMEGA3-XC-300x411_1750780343042.png', 'Omega 3-Xc 40/20 Gold - Concentrato 90 compresse', true);
INSERT INTO public.product_images VALUES (245, 810, '/images/products/SALI ACTIVATOR ARANCIA ROSSA_Fronte_1750780343044.jpg', 'Sali Activator 1:0,8 - Elettroliti 600g', true);
INSERT INTO public.product_images VALUES (250, 819, '/images/products/ashwagandha-2-1-300x548 (1)_1750781953158.png', 'Ashwagandha + Premier 60 compresse', true);
INSERT INTO public.product_images VALUES (251, 820, '/images/products/ASHWAGANDHA PURA_Fronte_1750781953157.jpg', 'Ashwagandha Pura +WATT 60 compresse', true);
INSERT INTO public.product_images VALUES (252, 821, '/images/products/ASTAXANTINA SOFTGEL_FRONTE_1750781953158.jpg', 'Astaxantina Softgel +WATT 60 compresse', true);
INSERT INTO public.product_images VALUES (253, 822, '/images/products/BCAA LIQUID CARBO_FRONTE_1750781953159.jpg', 'BCAA Liquid Carbo+ +WATT 30ml', true);
INSERT INTO public.product_images VALUES (255, 824, '/images/products/BCAA RIDE GEL GUSTO TUTTI I FRUTTI_Fronte_1750781953160.jpg', 'BCAA Ride Gel+ +WATT 40ml', true);
INSERT INTO public.product_images VALUES (256, 825, '/images/products/BERBERINA 60 CAPSULE_FRONTE_1750781953161.jpg', 'Berberina+ +WATT 60 compresse', true);
INSERT INTO public.product_images VALUES (258, 827, '/images/products/Collagene_Fronte_1750781953162.jpg', 'Collagene+ Silicio Stabilizzato +WATT 135g', true);
INSERT INTO public.product_images VALUES (262, 831, '/images/products/ELECTROLYTE_Limone_Fronte_1750781953163.jpg', 'Sali+ Electrolyte Pocket Minerals +WATT 40g', true);
INSERT INTO public.product_images VALUES (387, 1031, '/images/products/eaa-amminoacidi-essenziali-solubili.png', 'EAA Amminoacidi Essenziali Solubili', true);
INSERT INTO public.product_images VALUES (388, 1032, '/images/products/comfort-plus.jpg', 'Comfort Plus', true);
INSERT INTO public.product_images VALUES (522, 1165, '/images/products/taurina-1000-mg-150-compresse.jpg', 'Taurina 1000mg 150 compresse', true);
INSERT INTO public.product_images VALUES (524, 1167, '/images/products/total-protein-blend-cioccolato.jpg', 'Total Protein Blend Cioccolato', true);
INSERT INTO public.product_images VALUES (530, 1173, '/images/products/vitaminad3-2000ui-200cpr.jpg', 'Vitamina D3 2000 UI 200 compresse', true);
INSERT INTO public.product_images VALUES (531, 1174, '/images/products/viteral.jpg', 'Viteral 60 compresse', true);
INSERT INTO public.product_images VALUES (300, 953, '/images/products/W203_singolo_1751035188900.png', 'Pancake Proteico WHY Sport 1kg', true);
INSERT INTO public.product_images VALUES (301, 954, '/images/products/W236_singolo_1751035188918.png', '45 Protein Bar Wafer Nocciola 45g', true);
INSERT INTO public.product_images VALUES (302, 954, '/images/products/W237_box_1751035188919.png', '45 Protein Bar Cookies Crisp confezione 24pz', false);
INSERT INTO public.product_images VALUES (518, 1161, '/images/products/ram-1000-bcaa-100-compresse.jpg', 'RAM 1000 BCAA 100 compresse', true);
INSERT INTO public.product_images VALUES (303, 955, '/images/products/W240_75_ProteinBar_frutti_di_bosco_crisp_1751035219983.png', '75 Protein Bar Frutti di Bosco 75g', true);
INSERT INTO public.product_images VALUES (304, 955, '/images/products/W240_box_1751035219983.png', '75 Protein Bar Frutti di Bosco confezione 24pz', false);
INSERT INTO public.product_images VALUES (305, 956, '/images/products/W330_singolo_1751035294681.png', 'Crema di Arachidi Iperproteica Crunchy 350g', true);
INSERT INTO public.product_images VALUES (587, 1246, '/images/products/dextro-plus.jpg', 'Dextro Plus', true);
INSERT INTO public.product_images VALUES (588, 1247, '/images/products/eaa-tabs.jpg', 'EAA Tabs', true);
INSERT INTO public.product_images VALUES (590, 1249, '/images/products/gluta-max.jpg', 'Gluta Max', true);
INSERT INTO public.product_images VALUES (311, 959, '/images/products/LIQUID CARBO_Arancia_Fronte_1751035368933.jpg', 'Liquid Carbo+ Arancia 450ml', true);
INSERT INTO public.product_images VALUES (591, 1250, '/images/products/gluta-pep.jpg', 'Gluta Pep', true);
INSERT INTO public.product_images VALUES (592, 1251, '/images/products/hmb-1000-mg.jpg', 'HMB 1000 mg', true);
INSERT INTO public.product_images VALUES (594, 1253, '/images/products/leucine-1000.jpg', 'Leucine', true);
INSERT INTO public.product_images VALUES (604, 1263, '/images/products/glutamina-pure-250g.jpg', 'Glutamine Pure 250g', true);
INSERT INTO public.product_images VALUES (259, 828, '/images/complex-carbs-advanced-ratio.web', 'Complex Carbs Advanced Ratio +WATT 42g', true);
INSERT INTO public.product_images VALUES (607, 1266, '/images/products/mass-matrix-cioccolato-1,3kg.jpg', 'Mass Matrix Cioccolato', true);
INSERT INTO public.product_images VALUES (535, 1191, '/images/products/creatina-transport-1000-200-cpr.jpg', 'Creatina Transport 1000 200 capsule', true);
INSERT INTO public.product_images VALUES (537, 1193, '/images/products/ghanabol-active-9-90-cpr.jpg', 'Ghanabol Active 9 90 compresse', true);
INSERT INTO public.product_images VALUES (536, 1192, '/images/products/glutammina-glutpower-250-cpr.jpg', 'Glutammina Glutpower 100 compresse', true);
INSERT INTO public.product_images VALUES (538, 1194, '/images/products/hmb-3000.png', 'HMB 3000 90 compresse', true);
INSERT INTO public.product_images VALUES (539, 1195, '/images/products/leucina-1000-mg.jpg', 'Leucina 1000 mg 120 compresse', true);
INSERT INTO public.product_images VALUES (540, 1196, '/images/products/lisina.png', 'Lisina 300gr', true);
INSERT INTO public.product_images VALUES (541, 1197, '/images/products/ornitina-akg.png', 'Ornitina AKG 60 compresse', true);
INSERT INTO public.product_images VALUES (293, 871, '/images/products/perfect-100-whey-pesca-450g.png', 'Perfect 100% Whey Pesca 450g', true);
INSERT INTO public.product_images VALUES (294, 873, '/images/products/perfect-blend-90-cacao-750g.png', 'Perfect Blend 90 Cacao 750g', true);
INSERT INTO public.product_images VALUES (295, 874, '/images/products/essential-100-whey-cacao.png', 'Essential 100% Whey Vaniglia 900g', true);
INSERT INTO public.product_images VALUES (603, 1262, '/images/products/fish-oil-200-softgel.jpg', 'Fish Oil 200 softgel', true);
INSERT INTO public.product_images VALUES (523, 1166, '/images/products/thermogenic-force-120-compresse.jpg', 'Thermogenic Force 120 compresse', true);
INSERT INTO public.product_images VALUES (527, 1170, '/images/products/tribulus-1000-plus-120-compresse.jpg', 'Tribulus 1000 Plus 120 compresse', true);
INSERT INTO public.product_images VALUES (571, 1230, '/images/products/maxivit-sport.jpg', 'Maxivit Sport 60 compresse', true);
INSERT INTO public.product_images VALUES (573, 1232, '/images/products/omega-3-6-9.jpg', 'Omega 3-6-9 60 softgel', true);
INSERT INTO public.product_images VALUES (542, 1198, '/images/products/ashwagandha-forte-500-mg-new.png', 'Ashwagandha Forte 500mg 60 compresse', true);
INSERT INTO public.product_images VALUES (323, 968, '/images/products/WN043_singolo_1751035979180.png', 'Avena Farina Istantanea Cappuccino 1360g', true);
INSERT INTO public.product_images VALUES (324, 968, '/images/products/WN064_singolo_1751035979180.png', 'Avena Farina Istantanea Cacao 1360g', false);
INSERT INTO public.product_images VALUES (327, 971, '/images/products/Promeal Energetica 40g_1751036384519.jpg', 'Promeal Energetica Mandorle 40g', true);
INSERT INTO public.product_images VALUES (328, 971, '/images/products/Promeal Energetica barrette 25x40g web_1751036384521.jpg', 'Promeal Energetica Mandorle 25pz', false);
INSERT INTO public.product_images VALUES (343, 985, '/images/products/CREANIZED_CRETINA_MONOIDRATO_Fronte_1751037655150.jpg', 'Creanized Creatina Monoidrato Micronizzata', true);
INSERT INTO public.product_images VALUES (344, 986, '/images/products/CREATINA_Extra Gold_100g_Fronte_1751037655153.jpg', 'Creatina+ Extra Gold', true);
INSERT INTO public.product_images VALUES (346, 988, '/images/products/GLUCO CREATINA Compresse_Fronte_1751037744108.jpg', 'Gluco Creatina+', true);
INSERT INTO public.product_images VALUES (347, 989, '/images/products/W013_singolo_1751037744109.png', 'Creatina Platinum', true);
INSERT INTO public.product_images VALUES (348, 990, '/images/products/W026_singolo_1751037744110.png', 'Creatina Platinum 1300', true);
INSERT INTO public.product_images VALUES (349, 991, '/images/products/W166_singolo_1751037744110.png', 'Creatina 200 Mesh', true);
INSERT INTO public.product_images VALUES (558, 1217, '/images/products/glutammina-sport-recovery.jpg', 'Glutammina Sport Recovery 150g', true);
INSERT INTO public.product_images VALUES (543, 1202, '/images/products/bcaa-proram-100-cpr.jpg', 'BCAA 2:1:1 Proram 100 capsule', true);
INSERT INTO public.product_images VALUES (546, 1205, '/images/products/bcaa-8-1-1-150g-arancio.jpg', 'BCAA 8:1:1 150g Arancia', true);
INSERT INTO public.product_images VALUES (548, 1207, '/images/products/bcaa-peptide-100-cpr.jpg', 'BCAA 8:1:1 Peptide 100 compresse', true);
INSERT INTO public.product_images VALUES (550, 1209, '/images/products/bcaa-sport-4-1-1-100-cpr.jpg', 'BCAA Sport 4:1:1 150g Limone', true);
INSERT INTO public.product_images VALUES (554, 1213, '/images/products/creatina-micronizzata-200g.jpg', 'Creatina Micronizzata 100% 150g', true);
INSERT INTO public.product_images VALUES (556, 1215, '/images/products/creatina-tabs-200-cpr.jpg', 'Creatina Tabs Monoidrata 100 compresse', true);
INSERT INTO public.product_images VALUES (298, 877, '/images/products/hydrolyzed-104-dh4-black-chocolate.png', 'Hydrolyzed 100% Whey Black Chocolate 900g', true);
INSERT INTO public.product_images VALUES (296, 875, '/images/products/top-100-xp-cacao.jpg', 'Top 100 XP Cacao 250g', true);
INSERT INTO public.product_images VALUES (297, 876, '/images/products/vegetal-100-protein.png', 'Vegetal 100% Protein Cacao 750g', true);
INSERT INTO public.product_images VALUES (528, 1171, '/images/products/vitamin-c-1000-mg-90-compresse.jpg', 'Vitamin C 1000 mg 90 compresse', true);
INSERT INTO public.product_images VALUES (581, 1240, '/images/products/omega-3-super-60-perle.jpg', 'Omega 3 Super 60 perle', true);
INSERT INTO public.product_images VALUES (601, 1260, '/images/products/egg-protein-cioccolato.jpg', 'EGG Protein Cioccolato', true);
INSERT INTO public.product_images VALUES (619, 1278, '/images/citrullina-malato-175g-limone.png', 'Citrullina Malato 175g Limone', true);
INSERT INTO public.product_images VALUES (620, 1279, '/images/products/vitamins-minerals-watt.jpg', 'Vitamine & Minerals +WATT', true);
INSERT INTO public.product_images VALUES (621, 1280, '/images/products/melatonine-plus-premier.png', 'Melatonine+ Premier', true);
INSERT INTO public.product_images VALUES (623, 1281, '/images/products/i-m-collagen-corrected.jpg', 'I''M Collagen - Pronutrition', true);
INSERT INTO public.product_images VALUES (626, 1283, '/images/products/adrenaline-agrumi-why-sport.png', 'Adrenaline Agrumi Pre Workout', true);
INSERT INTO public.product_images VALUES (560, 1219, '/images/products/glutammina-peptide.jpg', 'Glutammina Peptide 5000 mg - Pronutrition', true);
INSERT INTO public.product_images VALUES (629, 1278, '/images/integratore-citrullina-malato-90-cpr.jpg', 'Citrullina Malato 90 capsule', false);
INSERT INTO public.product_images VALUES (642, 1311, '/images/products/stack-fire-boost-30b7-500x500.webp', 'Stack Fire Boost', true);
INSERT INTO public.product_images VALUES (643, 1312, '/images/products/weight-control-new-formula-9f17-500x500.webp', 'Weight Control New Formula', true);
INSERT INTO public.product_images VALUES (644, 1313, '/images/products/dima-therm-1df4-500x912.webp', 'Dima Therm', true);
INSERT INTO public.product_images VALUES (645, 1311, '/images/products/stack-fire-boost-30b7-500x500.webp', 'Stack Fire Boost', true);
INSERT INTO public.product_images VALUES (646, 1312, '/images/products/weight-control-new-formula-9f17-500x500.webp', 'Weight Control New Formula', true);
INSERT INTO public.product_images VALUES (647, 1313, '/images/products/dima-therm-1df4-500x912.webp', 'Dima Therm', true);
INSERT INTO public.product_images VALUES (648, 1314, '/images/products/kal-redux-1.png', 'Kal Redux+', true);
INSERT INTO public.product_images VALUES (649, 1315, '/images/products/hard-stack-sito-1.png', 'Hard Stack Red Hot', true);
INSERT INTO public.product_images VALUES (650, 1316, '/images/products/HARD-ACETYL-SITO.png', 'Hard Acetyl 1000', true);
INSERT INTO public.product_images VALUES (651, 1317, '/images/products/W175_alc-plus-60-cpr_singolo.png', 'ALC Plus 1000', true);
INSERT INTO public.product_images VALUES (653, 1319, '/images/products/W429_lipoic-1000-60-cpr_singolo.png', 'Lipoic 1000', true);
INSERT INTO public.product_images VALUES (654, 1320, '/images/products/W299_thermo-caffeine-90-cpr_singolo.png', 'Thermo Caffeine', true);
INSERT INTO public.product_images VALUES (655, 1321, '/images/products/W300_thermo-no-caffeine-90-cpr_singolo.png', 'Thermo NO Caffeine', true);
INSERT INTO public.product_images VALUES (656, 1322, '/images/products/W398_CLA_1000cpr_singolo.png', 'CLA 1000 WHY Sport', true);
INSERT INTO public.product_images VALUES (564, 1223, '/images/products/cla-1000.jpg', 'CLA 1000 Pronutrition', true);
INSERT INTO public.product_images VALUES (652, 1223, '/images/products/cla-1000.jpg', 'CLA 1000 Pronutrition', true);
INSERT INTO public.product_images VALUES (826, 1515, 'TOTAL-ENERGY-SITO.png', 'Total Energy Arancia 300g', true);
INSERT INTO public.product_images VALUES (827, 1516, 'HARD-START-XPLODE-SITO-1.png', 'Hard Start X-Plode Arancia 300g', true);
INSERT INTO public.product_images VALUES (828, 1517, 'GLUTAMINE-PURE-1000-SITO.png', 'Glutamine Pure 1000 150 compresse', true);
INSERT INTO public.product_images VALUES (877, 1161, '/images/products/ram-1000-bcaa-300-compresse.jp', 'RAM 1000 BCAA 300 compresse', true);
INSERT INTO public.product_images VALUES (830, 1519, 'HIGH-PRO-RELEASE-SITO.png', 'High Pro Release Caffè Latte 1kg', true);
INSERT INTO public.product_images VALUES (833, 1522, 'borraccia-600.jpeg', 'Borraccia EthicSport 600ml', true);
INSERT INTO public.product_images VALUES (729, 1395, '/images/products/ARGININE-NO-SITO.png', 'Arginine NO Unico 90 compresse', true);
INSERT INTO public.product_images VALUES (835, 1524, 'sacca.jpeg', 'Sacca EthicSport Taglia Unica', true);
INSERT INTO public.product_images VALUES (836, 1525, 'magliette-ethicsport.png', 'T-Shirt EthicSport Limited Edition S', true);
INSERT INTO public.product_images VALUES (733, 1399, '/images/products/EAA-SITO.png', 'Hard EAA 8:1 Unico 150 compresse', true);
INSERT INTO public.product_images VALUES (854, 1207, '/images/products/bcaa-peptide-200-cpr.jpg', 'BCAA 8:1:1 Peptide 200 compresse', false);
INSERT INTO public.product_images VALUES (855, 1209, '/images/products/bcaa-sport-4-1-1-200-cpr.jpg', 'BCAA Sport 4:1:1 350g Limone', false);
INSERT INTO public.product_images VALUES (856, 1213, '/images/products/creatina-micronizzata-400g.jpg', 'Creatina Micronizzata 100% 350g', false);
INSERT INTO public.product_images VALUES (857, 1215, '/images/products/creatina-tabs-400-cpr.jpg', 'Creatina Tabs Monoidrata 200 compresse', false);
INSERT INTO public.product_images VALUES (863, 1140, '/images/products/power-whey-amino-support-cioccolato.jpg', 'Power Whey Amino Support Cioccolato - Immagine prodotto', false);
INSERT INTO public.product_images VALUES (864, 1140, '/images/products/power-whey-amino-support-cioccolato-cocco.jpg', 'Power Whey Amino Support Cioccolato-Cocco - Immagine prodotto', false);
INSERT INTO public.product_images VALUES (865, 1140, '/images/products/power-whey-amino-support-cookies-cream.jpg', 'Power Whey Amino Support Cookies & Cream - Immagine prodotto', false);
INSERT INTO public.product_images VALUES (704, 1370, '/images/products/ISOWHEY-WEB-PREMIER.png', 'Isowhey Pro-Zyme Cioccolato 450g', true);
INSERT INTO public.product_images VALUES (866, 1140, '/images/products/power-whey-amino-support-fruttirossi-banana.jpg', 'Power Whey Amino Support Frutti rossi-Banana - Immagine prodotto', false);
INSERT INTO public.product_images VALUES (867, 1140, '/images/products/power-whey-amino-support-wafer-nocciola.jpg', 'Power Whey Amino Support Wafer-Nocciola - Immagine prodotto', false);
INSERT INTO public.product_images VALUES (869, 1150, '/images/products/prime-oat-biscotto.jpg', 'Prime Oat Biscotto - Immagine prodotto', false);
INSERT INTO public.product_images VALUES (876, 1161, '/images/products/ram-1000-bcaa-180-compresse.jpg', 'RAM 1000 BCAA 180 compresse', true);
INSERT INTO public.product_images VALUES (858, 1260, '/images/products/egg-protein-crema-vaniglia.jpg', 'EGG Protein Crema Vaniglia', false);
INSERT INTO public.product_images VALUES (870, 1150, '/images/products/prime-oat-cioccolato-cocco.jpg', 'Prime Oat Cioccolato-Cocco - Immagine prodotto', false);
INSERT INTO public.product_images VALUES (871, 1150, '/images/products/prime-oat-wafer-nocciola.jpg', 'Prime Oat Wafer-Nocciola - Immagine prodotto', false);
INSERT INTO public.product_images VALUES (872, 1157, '/images/products/prime-wpi-cioccolato.jpg', 'Prime WPI Cioccolato - Immagine prodotto', false);
INSERT INTO public.product_images VALUES (873, 1154, '/images/products/prime-whey-hydro-plus-cookies-cream.jpg', 'Prime Whey Hydro Plus Cookies & Cream - Immagine prodotto', false);
INSERT INTO public.product_images VALUES (874, 1154, '/images/products/prime-whey-hydro-plus-vaniglia.jpg', 'Prime Whey Hydro Plus Vaniglia - Immagine prodotto', false);
INSERT INTO public.product_images VALUES (716, 1382, '/images/products/MASSIVE-GAIN-SITO.png', 'Massive Gain XXL Cioccolato 1500g', true);
INSERT INTO public.product_images VALUES (875, 1159, '/images/products/pure-soy-isolate-wafer-nocciola.jpg', 'Pure Soy Isolate Wafer-Nocciola - Immagine prodotto', false);
INSERT INTO public.product_images VALUES (859, 1262, '/images/products/fish-oil-90-softgel.jpg', 'Fish Oil 90 softgel', false);
INSERT INTO public.product_images VALUES (718, 1384, '/images/products/burro-di-arachidi-sito.png', 'Peanut Butter Arachide 570g', true);
INSERT INTO public.product_images VALUES (724, 1390, '/images/products/SITO-D3K2.png', 'D3/K2 Complex Unico 90 perle', true);
INSERT INTO public.product_images VALUES (726, 1392, '/images/products/SITO-wph-104-premier-integratori-crema-caffe.png', 'Hard WPH BV104 Crema Caffé 750g', true);
INSERT INTO public.product_images VALUES (728, 1394, '/images/products/ZMA-SITO-PREMIERINTEGRATORI.png', 'Hard ZMA XP Unico 90 compresse', true);
INSERT INTO public.product_images VALUES (730, 1396, '/images/products/TOTAL-EGG-SITO.png', 'Total EGG Cacao 1kg', true);
INSERT INTO public.product_images VALUES (722, 1388, '/images/products/INTRA-PRO-ESSENTIAL-SITO-PREMIERINTEGRATORI.png', 'Intra Pro Essential+ Agrumi 200g', true);
INSERT INTO public.product_images VALUES (840, 1529, 'cappellino.jpeg', 'Cappellino EthicSport Taglia Unica', true);
INSERT INTO public.product_images VALUES (841, 1530, 'ramtech-bcaa.png', 'Ramtech - BCAA 2:1:1 120 capsule', true);
INSERT INTO public.product_images VALUES (842, 1531, 'GLUTAMINE-PURE-100-SITO.png', 'Glutamine Pure 100% 200g', true);
INSERT INTO public.product_images VALUES (845, 1534, 'omina-active-formula.png', 'OMNIA Active Formula 45 capsule', true);
INSERT INTO public.product_images VALUES (846, 1535, 'super-hydro-tabs-limone.png', 'Super Hydro Tabs Limone 20 compresse', true);
INSERT INTO public.product_images VALUES (848, 1537, 'pre-gara-endurance.png', 'Pre Gara Endurance 20 buste', true);
INSERT INTO public.product_images VALUES (844, 1533, 'MALTODEX-SITO.png', 'Maltodex Pure 100% 1,1kg', true);
INSERT INTO public.product_images VALUES (849, 1266, '/images/products/mass-matrix-cioccolato-2,8kg.jpg', 'Mass Matrix Cioccolato 2,8kg', false);
INSERT INTO public.product_images VALUES (850, 1266, '/images/products/mass-matrix-cioccolato-cocco-1,3kg.jpg', 'Mass Matrix Cioccolato-Cocco 1,3kg', false);
INSERT INTO public.product_images VALUES (851, 1266, '/images/products/mass-matrix-cookies-cream-1,3kg.jpg', 'Mass Matrix Cookies & Cream 1,3kg', false);
INSERT INTO public.product_images VALUES (852, 1202, '/images/products/bcaa-proram-200-cpr.jpg', 'BCAA 2:1:1 Proram 200 capsule', false);
INSERT INTO public.product_images VALUES (853, 1202, '/images/products/bcaa-proram-400-cpr.jpg', 'BCAA 2:1:1 Proram 400 capsule', false);
INSERT INTO public.product_images VALUES (860, 1263, '/images/W331_GLUTAMMINA-PURE-500g.png', 'Glutamine Pure 500g', false);
INSERT INTO public.product_images VALUES (753, 1439, 'POO-250.png', 'Amino Pool BV104 250 compresse - Immagine prodotto', true);
INSERT INTO public.product_images VALUES (861, 1263, '/images/products/glutamina-pure-1kg.jpg', 'Glutamine Pure 1kg', false);
INSERT INTO public.product_images VALUES (862, 1240, '/images/products/omega-3-super-120-perle.jpg', 'Omega 3 Super 120 perle', false);
INSERT INTO public.product_images VALUES (879, 1535, 'super-hydro-tabs-arancio.png', 'Super Hydro Tabs Arancio 20 compresse', false);
INSERT INTO public.product_images VALUES (880, 1167, '/images/products/total-protein-blend-cookies-cream.jpg', 'Total Protein Blend Cookies & Cream', false);
INSERT INTO public.product_images VALUES (881, 1167, '/images/products/total-protein-blend-vaniglia.jpg', 'Total Protein Blend Vaniglia', false);
INSERT INTO public.product_images VALUES (882, 1171, '/images/products/vitamin-c-1000-mg-240-compresse.jpg', 'Vitamin C 1000 mg 240 compresse', false);
INSERT INTO public.product_images VALUES (883, 1176, '/images/products/whey-iso-vaniglia.jpg', 'Whey Iso Vaniglia', false);
INSERT INTO public.product_images VALUES (884, 1176, '/images/products/whey-iso-cioccolato.jpg', 'Whey Iso Cioccolato', false);
INSERT INTO public.product_images VALUES (885, 1176, '/images/products/whey-iso-cioccolato-bianco.jpg', 'Whey Iso Cioccolato Bianco', false);
INSERT INTO public.product_images VALUES (886, 1176, '/images/products/whey-iso-cookies-cream.jpg', 'Whey Iso Cookies & Cream', false);
INSERT INTO public.product_images VALUES (887, 1176, '/images/products/whey-iso-crema-vaniglia.jpg', 'Whey Iso Crema Vaniglia', false);
INSERT INTO public.product_images VALUES (878, 1161, '/images/products/ram-1000-bcaa-500-compresse.jpg', 'RAM 1000 BCAA 500 compresse', true);
INSERT INTO public.product_images VALUES (888, 1176, '/images/products/whey-iso-frutti-rossi.jpg', 'Whey Iso Frutti Rossi', false);
INSERT INTO public.product_images VALUES (889, 1176, '/images/products/whey-iso-torrone-al-cioccolato.jpg', 'Whey Iso Torrone al cioccolato', false);
INSERT INTO public.product_images VALUES (890, 1439, 'POO-250.png', 'Amino Pool BV104 500 compresse', true);
INSERT INTO public.product_images VALUES (892, 828, '/images/complex-carbs-advanced-ratio.webp', 'Complex Carbs Advanced Ratio 1:0.8 600g', true);


--
-- Data for Name: product_options; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.product_options VALUES (507, 1370, 'Cioccolato', '900g', 6490, NULL, '/images/products/ISOWHEY-WEB-PREMIER.png', true);
INSERT INTO public.product_options VALUES (508, 1370, 'Cioccolato', '2kg', 13490, NULL, '/images/products/ISOWHEY-WEB-PREMIER.png', true);
INSERT INTO public.product_options VALUES (509, 1370, 'Cioccolato Bianco', '450g', 3490, NULL, '/images/products/ISOWHEY-WEB-PREMIER.png', true);
INSERT INTO public.product_options VALUES (510, 1370, 'Cioccolato Bianco', '900g', 6490, NULL, '/images/products/ISOWHEY-WEB-PREMIER.png', true);
INSERT INTO public.product_options VALUES (241, 1280, 'Unico', '90 compresse', 1899, NULL, '/images/products/melatonine-plus-premier.png', true);
INSERT INTO public.product_options VALUES (474, 828, 'Limone', '15 bustine', 2700, NULL, '/images/complex-carbs-advanced-ratio.webp', true);
INSERT INTO public.product_options VALUES (335, 1005, 'Unico', 'S', 1890, NULL, '/images/products/WSX179_singolo_1751038922384.png', true);
INSERT INTO public.product_options VALUES (499, 1531, 'Unico', '400g', 4290, NULL, '/images/new_images/GLUTAMINE-PURE-100-SITO.png', true);
INSERT INTO public.product_options VALUES (500, 1517, 'Unico', '300 compresse', 3690, NULL, '/images/new_images/GLUTAMINE-PURE-1000-SITO.png', true);
INSERT INTO public.product_options VALUES (188, 1219, 'Unico', '200 capsule', 3999, NULL, '/images/new_images/glutammina-peptide-200-cpr-integratore-con-glutammina-in-compresse.jpg', true);
INSERT INTO public.product_options VALUES (503, 1219, 'Frutti di Bosco', '300g', 4299, NULL, '/images/new_images/integratore-con-glutammina-peptide-300-g-frutti-di-bosco.jpg', true);
INSERT INTO public.product_options VALUES (506, 1519, 'Crema Vaniglia', '1kg', 5850, NULL, '/images/new_images/HIGH-PRO-RELEASE-SITO.png', true);
INSERT INTO public.product_options VALUES (505, 1519, 'Crema Cioccolato', '1kg', 5850, NULL, '/images/new_images/HIGH-PRO-RELEASE-SITO.png', true);
INSERT INTO public.product_options VALUES (559, 638, 'Banana', '750g', 4600, NULL, '/images/new_images/milk-protein-90-banana-doypack-da-750-g-83c4.webp', true);
INSERT INTO public.product_options VALUES (562, 871, 'Doppio Cioccolato', '900g', 7190, NULL, '/images/new_images/perfect-100-whey/W385_PERFECT-100-WHEY-DOPPIO-CIOCCOLATO-900g.png', true);
INSERT INTO public.product_options VALUES (565, 871, 'Neutro', '1,8kg', 12790, NULL, '/images/new_images/perfect-100-whey/W417_perfect-100-whey-18-kg-neutro_singolo-2.png', true);
INSERT INTO public.product_options VALUES (571, 871, 'Yogurt', '900g', 7190, NULL, '/images/new_images/perfect-100-whey/W454_perfect-100-whey-yogurt-900-g_singolo.png', true);
INSERT INTO public.product_options VALUES (574, 871, 'Wafer Nocciola', '900g', 7190, NULL, '/images/new_images/perfect-100-whey/W456_perfect-100-whey-wafer-nocciola-900-g_singolo.png', true);
INSERT INTO public.product_options VALUES (502, 1263, 'Unico', '1kg', 3330, NULL, '/images/new_images/glutaminepure-busta1kg_1014485729.jpg', true);
INSERT INTO public.product_options VALUES (338, 642, 'Cacao', '750g', 5500, NULL, '/images/new_images/top-eggxellent-protein-cacao-doypack-da-750-g-3f7f.webp', true);
INSERT INTO public.product_options VALUES (494, 1522, 'Unico', '800ml', 350, NULL, '/images/new_images/borraccia-800.jpg', true);
INSERT INTO public.product_options VALUES (447, 1014, 'Unico', ' 90 capsule', 3250, NULL, '/images/products/thermo-master.png', true);
INSERT INTO public.product_options VALUES (440, 1013, 'Unico', ' 90 capsule', 2190, NULL, '/images/products/magnesium-glycinate.png', true);
INSERT INTO public.product_options VALUES (489, 1439, 'Unico', '500 compresse', 5900, NULL, '/images/new_images/POO-250.png', true);
INSERT INTO public.product_options VALUES (171, 796, 'Unico', '60 compresse', 1300, NULL, '/images/products/FIBRA WATT_Fronte_1750780343032.jpg', true);
INSERT INTO public.product_options VALUES (472, 1395, 'Unico', '90 compresse ', 2490, NULL, '/images/products/ARGININE-NO-SITO.png', true);
INSERT INTO public.product_options VALUES (511, 1370, 'Crema Caffè', '2kg', 13490, NULL, '/images/products/ISOWHEY-WEB-PREMIER.png', true);
INSERT INTO public.product_options VALUES (512, 1370, 'Frutti di Bosco', '2kg', 13490, NULL, '/images/products/ISOWHEY-WEB-PREMIER.png', true);
INSERT INTO public.product_options VALUES (513, 1370, 'Frutti di Bosco', '450g', 3490, NULL, '/images/products/ISOWHEY-WEB-PREMIER.png', true);
INSERT INTO public.product_options VALUES (514, 1370, 'Crema Caffè', '900g', 6490, NULL, '/images/products/ISOWHEY-WEB-PREMIER.png', true);
INSERT INTO public.product_options VALUES (515, 1370, 'Frutti di Bosco', '900g', 6490, NULL, '/images/products/ISOWHEY-WEB-PREMIER.png', true);
INSERT INTO public.product_options VALUES (482, 948, 'Arancia', '40g', 240, NULL, NULL, true);
INSERT INTO public.product_options VALUES (516, 1370, 'Vaniglia', '2kg', 13490, NULL, '/images/products/ISOWHEY-WEB-PREMIER.png', true);
INSERT INTO public.product_options VALUES (484, 948, 'Cacao', '40g', 260, NULL, NULL, true);
INSERT INTO public.product_options VALUES (485, 986, 'Unico', '100g', 1800, NULL, '/images/products/CREATINA_Extra Gold_100g_Fronte_1751037655153.jpg', true);
INSERT INTO public.product_options VALUES (517, 1370, 'Vaniglia', '450g', 3490, NULL, '/images/products/ISOWHEY-WEB-PREMIER.png', true);
INSERT INTO public.product_options VALUES (518, 1370, 'Vaniglia', '900g', 6490, NULL, '/images/products/ISOWHEY-WEB-PREMIER.png', true);
INSERT INTO public.product_options VALUES (519, 1382, 'Cioccolato Bianco', '1500g', 5990, NULL, '/images/products/MASSIVE-GAIN-SITO.png', true);
INSERT INTO public.product_options VALUES (486, 1266, 'Cioccolato', '2,8kg', 5520, NULL, '/images/products/mass-matrix-cioccolato-2,8kg.jpg', true);
INSERT INTO public.product_options VALUES (487, 1266, 'Cioccolato-Cocco', '1,3kg', 3400, NULL, '/images/products/mass-matrix-cioccolato-cocco-1,3kg.jpg', true);
INSERT INTO public.product_options VALUES (488, 1266, 'Cookies & Cream', '1,3kg', 3400, NULL, '/images/products/mass-matrix-cookies-cream-1,3kg.jpg', true);
INSERT INTO public.product_options VALUES (490, 1202, 'Unico', '200 capsule', 3998, NULL, '/images/products/bcaa-proram-200-cpr.jpg', true);
INSERT INTO public.product_options VALUES (491, 1202, 'Unico', '400 capsule', 6890, NULL, '/images/products/bcaa-proram-400-cpr.jpg', true);
INSERT INTO public.product_options VALUES (492, 1207, 'Unico', '200 compresse', 4990, NULL, '/images/products/bcaa-peptide-200-cpr.jpg', true);
INSERT INTO public.product_options VALUES (495, 1213, 'Unico', '400g', 4899, NULL, '/images/products/creatina-micronizzata-400g.jpg', true);
INSERT INTO public.product_options VALUES (497, 1260, 'Crema Vaniglia', '750g', 3940, NULL, '/images/products/egg-protein-crema-vaniglia.jpg', true);
INSERT INTO public.product_options VALUES (498, 1262, 'Unico', '90 softgel', 1380, NULL, '/images/products/fish-oil-90-softgel.jpg', true);
INSERT INTO public.product_options VALUES (504, 1392, 'Cioccolato Nocciola', '750g', 5990, NULL, '/images/products/SITO-wph-104-premier-integratori-crema-caffe.png', true);
INSERT INTO public.product_options VALUES (521, 1140, 'Cioccolato', '1kg', 3650, NULL, '/images/products/power-whey-amino-support-cioccolato.jpg', true);
INSERT INTO public.product_options VALUES (522, 1140, 'Cioccolato-Cocco', '1kg', 3650, NULL, '/images/products/power-whey-amino-support-cioccolato-cocco.jpg', true);
INSERT INTO public.product_options VALUES (523, 1140, 'Cookies & Cream', '1kg', 3650, NULL, '/images/products/power-whey-amino-support-cookies-cream.jpg', true);
INSERT INTO public.product_options VALUES (524, 1140, 'Frutti rossi-Banana', '1kg', 3650, NULL, '/images/products/power-whey-amino-support-fruttirossi-banana.jpg', true);
INSERT INTO public.product_options VALUES (525, 1140, 'Wafer-Nocciola', '1kg', 3650, NULL, '/images/products/power-whey-amino-support-wafer-nocciola.jpg', true);
INSERT INTO public.product_options VALUES (527, 1150, 'Biscotto', '1kg', 1090, NULL, '/images/products/prime-oat-biscotto.jpg', true);
INSERT INTO public.product_options VALUES (528, 1150, 'Cioccolato-Cocco', '1kg', 1090, NULL, '/images/products/prime-oat-cioccolato-cocco.jpg', true);
INSERT INTO public.product_options VALUES (529, 1150, 'Wafer-Nocciola', '1kg', 1090, NULL, '/images/products/prime-oat-wafer-nocciola.jpg', true);
INSERT INTO public.product_options VALUES (530, 1157, 'Cioccolato', '1kg', 5680, NULL, '/images/products/prime-wpi-cioccolato.jpg', true);
INSERT INTO public.product_options VALUES (531, 1154, 'Cookies & Cream', '1kg', 5540, NULL, '/images/products/prime-whey-hydro-plus-cookies-cream.jpg', true);
INSERT INTO public.product_options VALUES (532, 1154, 'Vaniglia', '1kg', 5540, NULL, '/images/products/prime-whey-hydro-plus-vaniglia.jpg', true);
INSERT INTO public.product_options VALUES (533, 1159, 'Wafer-Nocciola', '900g', 2780, NULL, '/images/products/pure-soy-isolate-wafer-nocciola.jpg', true);
INSERT INTO public.product_options VALUES (493, 1209, 'Unico', '200 capsule', 4599, NULL, '/images/products/bcaa-sport-4-1-1-200-cpr.jpg', true);
INSERT INTO public.product_options VALUES (496, 1215, 'Unico', '400 cpr', 4899, NULL, '/images/products/creatina-tabs-400-cpr.jpg', true);
INSERT INTO public.product_options VALUES (520, 1240, 'Unico', '250 softgel', 4295, NULL, '/images/products/omega-3-super-120-perle.jpg', true);
INSERT INTO public.product_options VALUES (267, 999, 'Unico', 'S', 6850, NULL, '/images/products/EP973147061_singolo_1751038145714.png', true);
INSERT INTO public.product_options VALUES (229, 748, 'Unico', '30 capsule', 2590, NULL, '/images/products/4883_singolo_1750627156892.png', true);
INSERT INTO public.product_options VALUES (315, 749, 'Unico', '90 capsule', 3490, NULL, '/images/products/5634_singolo_1750627156892.png', true);
INSERT INTO public.product_options VALUES (71, 759, 'Unico', '90 compresse', 3490, NULL, '/images/products/alaform-800.png', true);
INSERT INTO public.product_options VALUES (83, 819, 'Unico', '60 capsule', 2000, NULL, '/images/products/ashwagandha-2-1-300x548 (1)_1750781953158.png', true);
INSERT INTO public.product_options VALUES (152, 926, 'Neutro', '1,5kg', 1899, NULL, '/images/products/d-glucosio.jpg', true);
INSERT INTO public.product_options VALUES (196, 929, 'Neutro', '180 compresse', 3199, NULL, '/images/products/hard-beta-alanine.jpg', true);
INSERT INTO public.product_options VALUES (202, 930, 'Neutro', '100 compresse', 2199, NULL, '/images/products/high-bcaa-2-1-1.jpg', true);
INSERT INTO public.product_options VALUES (118, 1003, 'Unico', '500 ml', 249, NULL, '/images/products/WSX368_singolo_1751038145719.png', true);
INSERT INTO public.product_options VALUES (146, 986, 'Unico', '350g', 5500, NULL, '/images/new_images/creatina-extragold-350-g-1786.webp', true);
INSERT INTO public.product_options VALUES (81, 924, 'Neutro', '90 capsule', 1899, NULL, NULL, true);
INSERT INTO public.product_options VALUES (170, 943, 'Tè alla Pesca', '300g', 3590, NULL, '/images/new_images/W247_Essenziali_te_alla_pesca_240g.png', true);
INSERT INTO public.product_options VALUES (169, 943, 'Mela Lime', '300g', 3590, NULL, '/images/new_images/W423_ESSENZIALI_mela-lime_240-g_2023.png', true);
INSERT INTO public.product_options VALUES (209, 877, 'Cioccolato', '900g', 7990, NULL, '/images/new_images/W430_hydrolyzed-104-dh4-ciocc.-900-g_singolo.png', true);
INSERT INTO public.product_options VALUES (563, 871, 'Cioccolato al Latte', '450g', 3990, NULL, '/images/new_images/perfect-100-whey/W446_perfect-100-whey-450-g-ciocc.-al-latte_singolo.png', true);
INSERT INTO public.product_options VALUES (566, 871, 'Cookies & Cream', '1,8kg', 12790, NULL, '/images/new_images/perfect-100-whey/W416_perfect-100-whey-18-kg-cookies-cream_singolo.png', true);
INSERT INTO public.product_options VALUES (93, 940, 'Neutro', '120 compresse', 1890, NULL, NULL, true);
INSERT INTO public.product_options VALUES (570, 871, 'Neutro', '450g', 3990, NULL, '/images/new_images/perfect-100-whey/W451_perfect-100-whey-neutro-450-g_singolo.png', true);
INSERT INTO public.product_options VALUES (575, 871, 'Banana Yogurt', '900g', 7190, NULL, '/images/new_images/perfect-100-whey/W457_perfect-100-whey-banana-yogurt-900-g_singolo.png', true);
INSERT INTO public.product_options VALUES (307, 831, 'Arancia', '18 bustine', 2340, NULL, '/images/new_images/sali-electrolyte-pocket-minerals-arancia-box-30-bustine-b8a0.webp', true);
INSERT INTO public.product_options VALUES (417, 639, 'Banana', '750g', 4100, NULL, '/images/new_images/whey-protein-80/wheyghty-protein-80-doypack-da-750-g-banana-4513.webp', true);
INSERT INTO public.product_options VALUES (579, 639, 'Cacao', '2kg', 8900, NULL, '/images/new_images/whey-protein-80/wheyghty-protein-80-2-kg-cacao-b569.webp', true);
INSERT INTO public.product_options VALUES (583, 639, 'Vaniglia', '750g', 4100, NULL, '/images/new_images/whey-protein-80/vaniglia-750g.webp', true);
INSERT INTO public.product_options VALUES (421, 640, 'Vaniglia', '750g', 5400, NULL, '/images/new_images/whey-protein-90/whey-protein-90-doypack-da-750-g-vaniglia-12f3.webp', true);
INSERT INTO public.product_options VALUES (103, 822, 'Limone', '30 bustine', 6600, NULL, '/images/new_images/bcaa-liquid-carbo-arancia-box-30-bustine-3270.webp', true);
INSERT INTO public.product_options VALUES (102, 822, 'Arancia', '30ml', 220, NULL, '/images/new_images/bcaa-liquid-carbo-limone-singola-bustina-13be.webp', true);
INSERT INTO public.product_options VALUES (320, 1017, 'Sweet', '45g - 25 pz', 7250, NULL, '/images/products/super-dextrin-sweet.jpg', true);
INSERT INTO public.product_options VALUES (109, 942, 'Neutro', '200g', 1990, NULL, NULL, true);
INSERT INTO public.product_options VALUES (119, 1001, 'Unico', 'Unico', 3490, NULL, '/images/products/WSX248_singolo_1751038145715.png', true);
INSERT INTO public.product_options VALUES (174, 634, 'Ananas', '30g', 180, NULL, '/images/new_images/fruit-force-singola-ananas-f75b.webp', true);
INSERT INTO public.product_options VALUES (588, 633, 'Mela Verde', '20 barrette', 4600, NULL, '/images/new_images/carbo-energy-mela-verde-box20barrette.webp', true);
INSERT INTO public.product_options VALUES (75, 1007, 'Unico', '300g', 4995, NULL, '/images/products/aminoacidi-essenziali-300g-cola-lemon.png', true);
INSERT INTO public.product_options VALUES (77, 920, 'Neutro', '100 capsule', 2599, NULL, NULL, true);
INSERT INTO public.product_options VALUES (76, 921, 'Neutro', '300g', 5899, NULL, NULL, true);
INSERT INTO public.product_options VALUES (110, 925, 'Arancia', '100g', 2000, NULL, '/images/new_images/bcaa-811-polvere-arancia-100-g-44fa.webp', true);
INSERT INTO public.product_options VALUES (133, 828, 'Limone', '40g', 180, NULL, '/images/complex-carbs-advanced-ratio.webp', true);
INSERT INTO public.product_options VALUES (157, 774, 'Unico', '60 compresse', 2590, NULL, NULL, true);
INSERT INTO public.product_options VALUES (92, 631, 'Burro di Arachidi', '70g', 430, NULL, '/images/products/03-barrettone-burro-arachidi.jpg', true);
INSERT INTO public.product_options VALUES (190, 941, 'Neutro', '300g', 2890, NULL, '/images/W331_GLUTAMMINA-PURE-500g.png', true);
INSERT INTO public.product_options VALUES (192, 928, 'Neutro', '500g', 1699, NULL, '/images/products/glutammina-plus-polvere-authentic.jpg', true);
INSERT INTO public.product_options VALUES (151, 951, 'Unico', '350g', 790, NULL, NULL, true);
INSERT INTO public.product_options VALUES (200, 800, 'Unico', '90 compresse', 2299, NULL, '/images/products/HARD-VITAMIN-SITO-300x411 (1)_1750780343037.png', true);
INSERT INTO public.product_options VALUES (82, 758, 'Unico', '60 compresse', 3590, NULL, '/images/products/ashwagandha-60-compresse.png', true);
INSERT INTO public.product_options VALUES (195, 797, 'Unico', '60 capsule', 1590, NULL, '/images/products/HARD-B-LIFE-COMPLEX-SITO-300x411 (1)_1750780343035.png', true);
INSERT INTO public.product_options VALUES (87, 821, 'Unico', '60 capsule', 3400, NULL, '/images/products/ASTAXANTINA SOFTGEL_FRONTE_1750781953158.jpg', true);
INSERT INTO public.product_options VALUES (85, 820, 'Unico', '60 capsule', 2400, NULL, '/images/products/ASHWAGANDHA PURA_Fronte_1750781953157.jpg', true);
INSERT INTO public.product_options VALUES (132, 827, 'Unico', '60 compresse', 3400, NULL, '/images/products/Collagene_Fronte_1750781953162.jpg', true);
INSERT INTO public.product_options VALUES (134, 985, 'Unico', '250g', 5500, NULL, '/images/products/CREANIZED_CRETINA_MONOIDRATO_Fronte_1751037655150.jpg', true);
INSERT INTO public.product_options VALUES (197, 799, 'Unico', '60 compresse', 3490, NULL, '/images/products/HARD-DREN-SITO-300x411_1750780343036.png', true);
INSERT INTO public.product_options VALUES (101, 822, 'Limone', '30ml', 220, NULL, '/images/products/BCAA LIQUID CARBO_FRONTE_1750781953159.jpg', true);
INSERT INTO public.product_options VALUES (88, 968, 'Cappuccino', '1360g', 1590, NULL, '/images/products/WN043_singolo_1751035979180.png', true);
INSERT INTO public.product_options VALUES (89, 968, 'Cacao', '1360g', 1590, NULL, '/images/products/WN064_singolo_1751035979180.png', true);
INSERT INTO public.product_options VALUES (113, 632, 'Cookie Nocciola', '80g', 419, NULL, '/images/products/07-big-bar-cookie-nocciola.jpg', true);
INSERT INTO public.product_options VALUES (201, 801, 'Unico', '60 compresse', 3300, NULL, '/images/products/HEPAX-FORTE-300x411 (1)_1750780343037.png', true);
INSERT INTO public.product_options VALUES (111, 825, 'Unico', '60 capsule', 2200, NULL, '/images/products/BERBERINA 60 CAPSULE_FRONTE_1750781953161.jpg', true);
INSERT INTO public.product_options VALUES (150, 956, 'Unico', '350g', 990, NULL, '/images/products/W330_singolo_1751035294681.png', true);
INSERT INTO public.product_options VALUES (165, 998, 'Unico', 'M', 1398, NULL, '/images/products/EP926741758_singolo_1751038145711.png', true);
INSERT INTO public.product_options VALUES (164, 998, 'Unico', 'L', 1398, NULL, '/images/products/EP926741758_singolo_1751038145711.png', true);
INSERT INTO public.product_options VALUES (312, 1006, 'Unico', 'L', 1890, NULL, '/images/products/WSX182_singolo_1751038922384.png', true);
INSERT INTO public.product_options VALUES (218, 760, 'Unico', '100 compresse', 3999, NULL, '/images/products/2194_singolo.png', true);
INSERT INTO public.product_options VALUES (234, 1016, 'Mojito-Mint', '15 pz da 50 ml', 4090, NULL, '/images/products/maltoshot-endurance-plus.png', true);
INSERT INTO public.product_options VALUES (233, 1016, 'Orange-Lemon', '15 pz da 50 ml', 4090, NULL, '/images/products/maltoshot-endurance-plus.png', true);
INSERT INTO public.product_options VALUES (261, 949, 'Biscotto Crisp', '50g', 320, NULL, NULL, true);
INSERT INTO public.product_options VALUES (268, 932, 'Neutro', '50ml', 499, NULL, '/images/products/pocket-carnitine.jpg', true);
INSERT INTO public.product_options VALUES (264, 900, 'Cacao Biscuit', '1,6kg', 5990, NULL, NULL, true);
INSERT INTO public.product_options VALUES (313, 899, 'Cacao', '320ml', 390, NULL, NULL, true);
INSERT INTO public.product_options VALUES (244, 638, 'Fragola', '750g', 4600, NULL, '/images/new_images/milk-protein-90-3ef2.webp', true);
INSERT INTO public.product_options VALUES (380, 640, 'Vaniglia', '250g', 2400, NULL, '/images/new_images/whey-protein-90/whey-protein-90-250-g-vaniglia-fa90.webp', true);
INSERT INTO public.product_options VALUES (243, 638, 'Cacao', '750g', 4600, NULL, '/images/new_images/milk-protein-90-cacao-doypack-da-750-g-fb6a.webp', true);
INSERT INTO public.product_options VALUES (260, 871, 'Pistacchio', '900g', 7190, NULL, '/images/new_images/perfect-100-whey/pitsacchio-900g.png', true);
INSERT INTO public.product_options VALUES (336, 1005, 'Unico', 'M', 1890, NULL, '/images/products/WSX179_singolo_1751038922384.png', true);
INSERT INTO public.product_options VALUES (316, 1002, 'Unico', '600 ml', 450, NULL, '/images/products/WSX276_singolo_1751038145717.png', true);
INSERT INTO public.product_options VALUES (310, 1006, 'Unico', 'S', 1890, NULL, '/images/products/WSX182_singolo_1751038922384.png', true);
INSERT INTO public.product_options VALUES (311, 1006, 'Unico', 'M', 1890, NULL, '/images/products/WSX182_singolo_1751038922384.png', true);
INSERT INTO public.product_options VALUES (213, 877, 'Cookie Cream', '900g', 7990, NULL, '/images/new_images/W432_hydrolyzed-104-dh4-cookie-cream-900-g_singolo.png', true);
INSERT INTO public.product_options VALUES (210, 877, 'Fragola-Banana', '900g', 7990, NULL, '/images/new_images/W435_hydrolyzed-104-dh4-fragola-banana-900-g_singolo.png', true);
INSERT INTO public.product_options VALUES (212, 877, 'Vaniglia', '900g', 7990, NULL, '/images/new_images/W431_hydrolyzed-104-dh4-vaniglia-900-g_singolo.png', true);
INSERT INTO public.product_options VALUES (211, 877, 'Wafer Nocciola', '900g', 7990, NULL, '/images/new_images/W433_hydrolyzed-104-dh4-wafer-nocciola-900-g_singolo.png', true);
INSERT INTO public.product_options VALUES (560, 871, 'Fior di Vaniglia', '1,8kg', 12790, NULL, '/images/new_images/perfect-100-whey/W418_PERFECT-WHEY-fior-di-vaniglia-18kg_singolo.png', true);
INSERT INTO public.product_options VALUES (567, 871, 'Neutro', '900g', 7190, NULL, '/images/new_images/perfect-100-whey/W244_PERFECT-WHEY_neutro-900g.png', true);
INSERT INTO public.product_options VALUES (569, 871, 'Fior di Vaniglia', '450g', 3990, NULL, '/images/new_images/perfect-100-whey/W447_perfect-100-whey-450-g-fior-vaniglia_singolo.png', true);
INSERT INTO public.product_options VALUES (255, 871, 'Cafféciok', '900g', 7190, NULL, '/images/new_images/perfect-100-whey/W243_PERFECT-WHEY_caffeciok-900g.png', true);
INSERT INTO public.product_options VALUES (258, 871, 'Cacao', '900g', 7190, NULL, '/images/new_images/perfect-100-whey/W241_perfect_whey_900_cacao.png', true);
INSERT INTO public.product_options VALUES (257, 871, 'Ciocococco', '900g', 7190, NULL, '/images/new_images/perfect-100-whey/W246_PERFECT-WHEY_Ciocococco_900g.png', true);
INSERT INTO public.product_options VALUES (256, 871, 'Cookies & Cream', '900g', 7190, NULL, '/images/new_images/perfect-100-whey/cookies-cream-900g.png', true);
INSERT INTO public.product_options VALUES (259, 871, 'Vaniglia', '900g', 7190, NULL, '/images/new_images/perfect-100-whey/W242_PERFECT-WHEY_vaniglia_900g.png', true);
INSERT INTO public.product_options VALUES (576, 871, 'Yogurt Pesca', '900g', 7190, NULL, '/images/new_images/perfect-100-whey/W455_perfect-100-whey-yogurt-pesca-900-g_singolo.png', true);
INSERT INTO public.product_options VALUES (263, 873, 'Banana & Vaniglia', '750g', 5990, NULL, '/images/new_images/W219_PERFECT-BLEND-BANANA-VANIGLIA-750g.png', true);
INSERT INTO public.product_options VALUES (262, 873, 'Cacao', '750g', 5990, NULL, '/images/new_images/W218_PERFECT-BLEND-CACAO-750g.png', true);
INSERT INTO public.product_options VALUES (2, 933, 'Arancia', '500g', 3000, NULL, '/images/new_images/r-m-1-bcaa-811-recovery-mix-arancia-500-g-5a36.webp', true);
INSERT INTO public.product_options VALUES (306, 831, 'Arancia', '40g', 130, NULL, '/images/new_images/sali-electrolyte-pocket-minerals-arancia-singola-bustina-9983-500x500.webp', true);
INSERT INTO public.product_options VALUES (324, 1535, 'Limone', '20 compresse', 950, NULL, '/images/new_images/superhydrotabs-limone.png', true);
INSERT INTO public.product_options VALUES (578, 642, 'Cacao', '250g', 2000, NULL, '/images/new_images/top-eggxellent-protein-cacao-250-g-e7ea.webp', true);
INSERT INTO public.product_options VALUES (340, 642, 'Crema Pasticciera', '750g', 5500, NULL, '/images/new_images/top-eggxellent-protein-crema-pasticcera-doypack-da-750-g-9c1b.webp', true);
INSERT INTO public.product_options VALUES (373, 639, 'Nocciola', '250g', 1700, NULL, '/images/new_images/whey-protein-80/wheyghty-protein-80-250-g-nocciola-c041 (1).webp', true);
INSERT INTO public.product_options VALUES (374, 639, 'Nocciola', '750g', 4100, NULL, '/images/new_images/whey-protein-80/wheyghty-protein-80-doypack-da-750-g-cocco-9322 (1).webp', true);
INSERT INTO public.product_options VALUES (581, 639, 'Nocciola', '2kg', 8900, NULL, '/images/new_images/whey-protein-80/wheyghty-protein-80-2-kg-nocciola-065d.webp', true);
INSERT INTO public.product_options VALUES (501, 1263, 'Unico', '500g', 2440, NULL, '/images/new_images/glutaminepure-busta-500g_842467101.jpg', true);
INSERT INTO public.product_options VALUES (319, 1017, 'Tasty', '45g - 25 pz', 7250, NULL, '/images/new_images/tasty-Super Dextrin Energy Bar.jpg', true);
INSERT INTO public.product_options VALUES (291, 945, 'Vaniglia', '40g', 260, NULL, '/images/new_images/680b3b835fb8e06c6cf88590.jpg', true);
INSERT INTO public.product_options VALUES (308, 762, 'Unico', '600g', 1700, NULL, NULL, true);
INSERT INTO public.product_options VALUES (292, 947, 'Cacao', '250g', 1090, NULL, NULL, true);
INSERT INTO public.product_options VALUES (293, 947, 'Gianduia', '250g', 1090, NULL, NULL, true);
INSERT INTO public.product_options VALUES (314, 898, 'Cacao', '750g', 4199, NULL, NULL, true);
INSERT INTO public.product_options VALUES (347, 897, 'Cioccolato', '700g', 3690, NULL, NULL, true);
INSERT INTO public.product_options VALUES (345, 765, 'Unico', '100 compresse', 2800, NULL, NULL, true);
INSERT INTO public.product_options VALUES (230, 773, 'Agrumi', '300g', 990, NULL, NULL, true);
INSERT INTO public.product_options VALUES (294, 780, 'Unico', '60 compresse', 3990, NULL, NULL, true);
INSERT INTO public.product_options VALUES (303, 778, 'Agrumi', '25g singoli', 250, NULL, NULL, true);
INSERT INTO public.product_options VALUES (330, 779, 'Unico', '90 capsule', 3490, NULL, NULL, true);
INSERT INTO public.product_options VALUES (349, 948, 'Arancia', '24 barrette', 5760, NULL, NULL, true);
INSERT INTO public.product_options VALUES (215, 636, 'Vaniglia', '750g', 3900, NULL, '/attached_assets/ISO-SOYA-SITO_1755522191253.png', true);
INSERT INTO public.product_options VALUES (318, 1026, 'Unico', '400g', 4190, NULL, '/images/products/starter-1000.jpg', true);
INSERT INTO public.product_options VALUES (216, 802, 'Unico', '60 compresse', 3900, NULL, '/images/products/JOINT-FLEX-sito-300x411_1750780343038.png', true);
INSERT INTO public.product_options VALUES (305, 810, 'Unico', '600g', 1990, NULL, '/images/products/SALI ACTIVATOR ARANCIA ROSSA_Fronte_1750780343044.jpg', true);
INSERT INTO public.product_options VALUES (309, 744, 'Unico', '100 compresse', 1590, NULL, '/images/products/2393_singolo_1750627156891.png', true);
INSERT INTO public.product_options VALUES (221, 746, 'Unico', '60 compresse', 2790, NULL, '/images/products/4622_singolo_1750627156892.png', true);
INSERT INTO public.product_options VALUES (251, 751, 'Unico', '200 mini softgel', 3990, NULL, '/images/products/7355_singolo_1750627156892.png', true);
INSERT INTO public.product_options VALUES (231, 756, 'Unico', '90 compresse', 2590, NULL, '/images/products/magnesio-tripla-azione.png', true);
INSERT INTO public.product_options VALUES (322, 1028, 'Limone', '60 ml - 15 pz', 4500, NULL, '/images/products/super-dextrin-gel-pro.png', true);
INSERT INTO public.product_options VALUES (222, 637, 'Caramello', '45g', 320, NULL, '/images/products/17-light-protein-bar-caramello.jpg', true);
INSERT INTO public.product_options VALUES (223, 637, 'Cheesecake', '45g', 320, NULL, '/images/products/16-light-protein-bar-cheesecake.jpg', true);
INSERT INTO public.product_options VALUES (254, 953, 'Unico', '1kg', 3490, NULL, '/images/products/W203_singolo_1751035188900.png', true);
INSERT INTO public.product_options VALUES (265, 999, 'Unico', 'M', 6850, NULL, '/images/products/EP973147061_singolo_1751038145714.png', true);
INSERT INTO public.product_options VALUES (266, 999, 'Unico', 'L', 6850, NULL, '/images/products/EP973147061_singolo_1751038145714.png', true);
INSERT INTO public.product_options VALUES (337, 1005, 'Unico', 'L', 1890, NULL, '/images/products/WSX179_singolo_1751038922384.png', true);
INSERT INTO public.product_options VALUES (402, 952, 'Cioccolato', '35g', 290, NULL, NULL, true);
INSERT INTO public.product_options VALUES (362, 952, 'Cioccolato', '24pz', 5490, NULL, NULL, true);
INSERT INTO public.product_options VALUES (403, 952, 'Cacao Cioccolato Bianco', '24pz', 5490, NULL, NULL, true);
INSERT INTO public.product_options VALUES (361, 952, 'Cacao Cioccolato Bianco', '35g', 290, NULL, NULL, true);
INSERT INTO public.product_options VALUES (572, 871, 'Yogurt', '450g', 3990, NULL, '/images/new_images/perfect-100-whey/W452_perfect-100-whey-yogurt-450-g_singolo.png', true);
INSERT INTO public.product_options VALUES (536, 1161, 'Unico', '500 compresse', 3700, NULL, '/images/products/ram-1000-bcaa-500-compresse.jpg', true);
INSERT INTO public.product_options VALUES (561, 871, 'Cioccolato', '900g', 7190, NULL, '/images/new_images/perfect-100-whey/W395-PERFECT-100-WHEY-CIOCCOLATO-900g.png', true);
INSERT INTO public.product_options VALUES (568, 871, 'Cioccolato Bianco', '900g', 7190, NULL, '/images/new_images/perfect-100-whey/W384_PERFECT-100-WHEY-CIOCCOLATO-BIANCO-900g.png', true);
INSERT INTO public.product_options VALUES (577, 871, 'Cookies & Cream', '450g', 3990, NULL, '/images/new_images/perfect-100-whey/W450_perfect-100-whey-cookies-cream-450-g_singolo.png', true);
INSERT INTO public.product_options VALUES (537, 1535, 'Arancio', '20 compresse', 950, NULL, '/images/new_images/superhydrotabs-orange.jpg', true);
INSERT INTO public.product_options VALUES (375, 639, 'Cacao', '750g', 4100, NULL, '/images/new_images/whey-protein-80/cacao.webp', true);
INSERT INTO public.product_options VALUES (339, 642, 'Crema Zabaione', '750g', 5500, NULL, '/images/new_images/top-eggxellent-protein-crema-zabaione-doypack-da-750-g-f0d3.webp', true);
INSERT INTO public.product_options VALUES (414, 639, 'Nocciola', '250g', 1700, NULL, '/images/new_images/whey-protein-80/wheyghty-protein-80-250-g-nocciola-c041.webp', true);
INSERT INTO public.product_options VALUES (419, 639, 'Cocco', '750g', 4100, NULL, '/images/new_images/whey-protein-80/wheyghty-protein-80-5fdd.webp', true);
INSERT INTO public.product_options VALUES (377, 639, 'Cappuccino', '750g', 4100, NULL, '/images/new_images/whey-protein-80/wheyghty-protein-80-doypack-da-750-g-cappuccino-8efa (1).webp', true);
INSERT INTO public.product_options VALUES (418, 639, 'Cappuccino', '750g', 4100, NULL, '/images/new_images/whey-protein-80/wheyghty-protein-80-doypack-da-750-g-cappuccino-8efa.webp', true);
INSERT INTO public.product_options VALUES (413, 639, 'Cacao', '250g', 1700, NULL, '/images/new_images/whey-protein-80/wheyghty-protein-80-250-g-cacao-bea8.webp', true);
INSERT INTO public.product_options VALUES (423, 640, 'Fior di Latte', '750g', 5400, NULL, '/images/new_images/whey-protein-90/whey-protein-90-doypack-da-750-g-fior-di-latte-07c0.webp', true);
INSERT INTO public.product_options VALUES (416, 639, 'Cacao', '750g', 4100, NULL, '/images/new_images/whey-protein-80/wheyghty-protein-80-doypack-da-750-g-cacao-b7d6 (1).webp', true);
INSERT INTO public.product_options VALUES (378, 639, 'Cocco', '750g', 4100, NULL, '/images/new_images/whey-protein-80/wheyghty-protein-80-5fdd (1).webp', true);
INSERT INTO public.product_options VALUES (415, 639, 'Nocciola', '750g', 4100, NULL, '/images/new_images/whey-protein-80/wheyghty-protein-80-doypack-da-750-g-cocco-9322.webp', true);
INSERT INTO public.product_options VALUES (372, 639, 'Cacao', '250g', 1700, NULL, '/images/new_images/whey-protein-80/wheyghty-protein-80-250-g-cacao-bea8 (1).webp', true);
INSERT INTO public.product_options VALUES (425, 640, 'Natural', '750g', 5400, NULL, '/images/new_images/whey-protein-90/whey-protein-90-doypack-da-750-g-neutro-4b62.webp', true);
INSERT INTO public.product_options VALUES (383, 640, 'Crema Nocciola', '750g', 5400, NULL, '/images/new_images/whey-protein-90/crema-nocciola-750g.webp', true);
INSERT INTO public.product_options VALUES (422, 640, 'Banana', '750g', 5400, NULL, '/images/new_images/whey-protein-90/whey-protein-90-doypack-da-750-g-banana-48ff.webp', true);
INSERT INTO public.product_options VALUES (389, 641, 'Moka', '750g', 5800, NULL, '/images/new_images/xxx-hydrolysed-protein-90-dh8-750-g-moka-0046.webp', true);
INSERT INTO public.product_options VALUES (429, 641, 'Cookie Nocciola', '750g', 5800, NULL, '/images/new_images/xxx-hydrolysed-protein-90-dh8-750-g-cookie-nocciola-1325.webp', true);
INSERT INTO public.product_options VALUES (428, 641, 'Cacao', '750g', 5800, NULL, '/images/new_images/xxx-hydrolysed-protein-90-dh8-3cec.webp', true);
INSERT INTO public.product_options VALUES (584, 945, 'Cacao', '16pz', 4160, NULL, '/images/new_images/cacao-volchem.jpg', true);
INSERT INTO public.product_options VALUES (591, 633, 'Frutti di Bosco', '20 barrette', 4600, NULL, '/images/new_images/carbo-energy-3-6e27-frutti-di-bosco.webp', true);
INSERT INTO public.product_options VALUES (589, 633, 'Agrumi', '20 barrette', 4600, NULL, '/images/new_images/carbo-energy-b672-agrumi.webp', true);
INSERT INTO public.product_options VALUES (539, 1525, 'Unico', 'L', 1990, NULL, '/images/new_images/magliette-ethic.png', true);
INSERT INTO public.product_options VALUES (540, 1525, 'Unico', 'XL', 1990, NULL, '/images/new_images/magliette-ethic.png', true);
INSERT INTO public.product_options VALUES (538, 1525, 'Unico', 'M', 1990, NULL, '/images/new_images/magliette-ethic.png', true);
INSERT INTO public.product_options VALUES (66, 954, 'Cookies Crisp', '45g', 260, NULL, '/images/new_images/W236_45_Protein_Bar_wafer_nocciola_crisp.png', true);
INSERT INTO public.product_options VALUES (351, 766, 'Unico', '60 compresse', 3300, NULL, NULL, true);
INSERT INTO public.product_options VALUES (354, 769, 'Unico', '120 perle', 1900, NULL, NULL, true);
INSERT INTO public.product_options VALUES (355, 775, 'Unico', '80 compresse', 1990, NULL, NULL, true);
INSERT INTO public.product_options VALUES (483, 948, 'Cacao', '24 barrette', 5760, NULL, NULL, true);
INSERT INTO public.product_options VALUES (481, 948, 'Albicocca', '40g', 260, NULL, NULL, true);
INSERT INTO public.product_options VALUES (390, 948, 'Albicocca', '24 barrette', 5760, NULL, NULL, true);
INSERT INTO public.product_options VALUES (541, 1167, 'Cookies & Cream', '1kg', 4730, NULL, '/images/products/total-protein-blend-cookies-cream.jpg', true);
INSERT INTO public.product_options VALUES (542, 1167, 'Vaniglia', '1kg', 4730, NULL, '/images/products/total-protein-blend-vaniglia.jpg', true);
INSERT INTO public.product_options VALUES (543, 1171, 'Unico', '240 compresse', 1770, NULL, '/images/products/vitamin-c-1000-mg-240-compresse.jpg', true);
INSERT INTO public.product_options VALUES (534, 1161, 'Unico', '180 compresse', 2700, NULL, '/images/products/ram-1000-bcaa-180-compresse.jpg', true);
INSERT INTO public.product_options VALUES (535, 1161, 'Unico', '300 compresse', 2410, NULL, '/images/products/ram-1000-bcaa-300-compresse.jpg', true);
INSERT INTO public.product_options VALUES (544, 1176, 'Vaniglia', '1kg', 4280, NULL, '/images/products/whey-iso-vaniglia.jpg', true);
INSERT INTO public.product_options VALUES (545, 1176, 'Cioccolato', '1kg', 4280, NULL, '/images/products/whey-iso-cioccolato.jpg', true);
INSERT INTO public.product_options VALUES (546, 1176, 'Cioccolato Bianco', '1kg', 4280, NULL, '/images/products/whey-iso-cioccolato-bianco.jpg', true);
INSERT INTO public.product_options VALUES (547, 1176, 'Cookies & Cream', '1kg', 3099, NULL, '/images/products/whey-iso-cookies-cream.jpg', true);
INSERT INTO public.product_options VALUES (548, 1176, 'Crema Vaniglia', '2kg', 7630, NULL, '/images/products/whey-iso-crema-vaniglia.jpg', true);
INSERT INTO public.product_options VALUES (549, 1176, 'Frutti Rossi', '1kg', 4280, NULL, '/images/products/whey-iso-frutti-rossi.jpg', true);
INSERT INTO public.product_options VALUES (550, 1176, 'Torrone al cioccolato', '1kg', 4280, NULL, '/images/products/whey-iso-torrone-al-cioccolato.jpg', true);
INSERT INTO public.product_options VALUES (245, 807, 'Unico', '180 compresse', 3400, NULL, '/images/products/Omega3 EGQ 180 perle FRONTE_1750780343042.jpg', true);
INSERT INTO public.product_options VALUES (360, 1012, 'Unico', '500g', 1990, NULL, '/images/products/vpr-vegetal-protein-integratore-alimentare-di-proteine-vegetali.png', true);
INSERT INTO public.product_options VALUES (401, 1012, 'Unico', '500g', 1990, NULL, '/images/products/vpr-vegetal-protein-integratore-alimentare-di-proteine-vegetali.png', true);
INSERT INTO public.product_options VALUES (350, 747, 'Unico', '90 compresse', 3490, NULL, '/images/products/4793_singolo_1750627156892.png', true);
INSERT INTO public.product_options VALUES (249, 808, 'Unico', '90 compresse', 3300, NULL, '/images/products/OMEGA3-XC-300x411_1750780343042.png', true);
INSERT INTO public.product_options VALUES (476, 831, 'Limone', '40g', 130, NULL, '/images/products/ELECTROLYTE_Limone_Fronte_1750781953163.jpg', true);
INSERT INTO public.product_options VALUES (65, 954, 'Cookies Crisp', '24pz', 3399, NULL, '/images/products/W237_box_1751035188919.png', true);
INSERT INTO public.product_options VALUES (452, 1370, 'Cioccolato', '450g ', 3490, NULL, '/images/products/ISOWHEY-WEB-PREMIER.png', true);
INSERT INTO public.product_options VALUES (473, 1399, 'Unico', '150 compresse ', 3600, NULL, '/images/products/EAA-SITO.png', true);
INSERT INTO public.product_options VALUES (558, 1370, 'Crema Caffè', '450g', 3490, NULL, '/images/products/ISOWHEY-WEB-PREMIER.png', true);
INSERT INTO public.product_options VALUES (359, 1174, 'Unico', '60 compresse', 1170, NULL, '/images/products/viteral.jpg', true);
INSERT INTO public.product_options VALUES (448, 1396, 'Cacao', '1kg ', 4900, NULL, '/images/products/TOTAL-EGG-SITO.png', true);
INSERT INTO public.product_options VALUES (464, 1382, 'Cioccolato', '1500g ', 5990, NULL, '/images/products/MASSIVE-GAIN-SITO.png', true);
INSERT INTO public.product_options VALUES (469, 1392, 'Crema Caffé', '750g ', 5990, NULL, '/images/products/SITO-wph-104-premier-integratori-crema-caffe.png', true);
INSERT INTO public.product_options VALUES (471, 1394, 'Unico', '90 compresse ', 3500, NULL, '/images/products/ZMA-SITO-PREMIERINTEGRATORI.png', true);
INSERT INTO public.product_options VALUES (467, 1388, 'Agrumi', '200g ', 4000, NULL, '/images/products/INTRA-PRO-ESSENTIAL-SITO-PREMIERINTEGRATORI.png', true);
INSERT INTO public.product_options VALUES (466, 1384, 'Arachide', '570g ', 1290, NULL, '/images/products/burro-di-arachidi-sito.png', true);
INSERT INTO public.product_options VALUES (68, 955, 'Frutti di Bosco', '24pz', 5490, NULL, '/images/products/W240_75_ProteinBar_frutti_di_bosco_crisp_1751035219983.png', true);
INSERT INTO public.product_options VALUES (67, 955, 'Frutti di Bosco', '75g', 390, NULL, '/images/products/W240_75_ProteinBar_frutti_di_bosco_crisp_1751035219983.png', true);
INSERT INTO public.product_options VALUES (114, 632, 'Cocco', '80g', 419, NULL, '/images/products/06-big-bar-cocco.jpg', true);
INSERT INTO public.product_options VALUES (168, 874, 'Vaniglia', '900g', 5490, NULL, '/images/products/essential-100-whey-cacao.png', true);
INSERT INTO public.product_options VALUES (208, 877, 'Black Chocolate', '900g', 7990, NULL, '/images/products/hydrolyzed-104-dh4-black-chocolate.png', true);
INSERT INTO public.product_options VALUES (104, 824, 'Tutti i Frutti', '40ml', 260, NULL, '/images/products/BCAA RIDE GEL GUSTO TUTTI I FRUTTI_Fronte_1750781953160.jpg', true);
INSERT INTO public.product_options VALUES (98, 1205, 'Arancia', '150g', 1990, NULL, '/images/products/bcaa-8-1-1-150g-arancio.jpg', true);
INSERT INTO public.product_options VALUES (162, 1260, 'Cioccolato', '750g', 3940, NULL, '/images/products/egg-protein-cioccolato.jpg', true);
INSERT INTO public.product_options VALUES (91, 631, 'Vaniglia', '70g', 430, NULL, '/images/products/05-barrettone-vaniglia.jpg', true);
INSERT INTO public.product_options VALUES (90, 631, 'Cacao', '70g', 430, NULL, '/images/products/04-barrettone-cacao.jpg', true);
INSERT INTO public.product_options VALUES (334, 875, 'Cacao', '250g', 2599, NULL, '/images/products/top-100-xp-cacao.jpg', true);
INSERT INTO public.product_options VALUES (348, 876, 'Cacao', '750g', 4190, NULL, '/images/products/vegetal-100-protein.png', true);
INSERT INTO public.product_options VALUES (227, 959, 'Arancia', '450ml', 1350, NULL, '/images/products/LIQUID CARBO_Arancia_Fronte_1751035368933.jpg', true);
INSERT INTO public.product_options VALUES (290, 971, 'Mandorle', '40g', 210, NULL, '/images/products/Promeal Energetica 40g_1751036384519.jpg', true);
INSERT INTO public.product_options VALUES (269, 1140, 'Vaniglia', '1kg', 3650, NULL, '/images/products/power-whey-amino-support-vaniglia.jpg', true);
INSERT INTO public.product_options VALUES (281, 1150, 'Cioccolato', '1kg', 1090, NULL, '/images/products/prime-oat-cioccolato.jpg', true);
INSERT INTO public.product_options VALUES (284, 1154, 'Cioccolato', 'kg', 5540, NULL, '/images/products/prime-whey-hydro-plus-cioccolato.jpg', true);
INSERT INTO public.product_options VALUES (288, 1157, 'Vaniglia', '1kg', 5680, NULL, '/images/products/prime-wpi-vaniglia.jpg', true);
INSERT INTO public.product_options VALUES (295, 1159, 'Cioccolato', '900g', 2780, NULL, '/images/products/pure-soy-isolate-cioccolato.jpg', true);
INSERT INTO public.product_options VALUES (238, 1266, 'Cioccolato', '1,3kg', 3400, NULL, '/images/products/mass-matrix-cioccolato-1,3kg.jpg', true);
INSERT INTO public.product_options VALUES (342, 1167, 'Cioccolato', '1kg', 4730, NULL, '/images/products/total-protein-blend-cioccolato.jpg', true);
INSERT INTO public.product_options VALUES (555, 1205, 'Arancia', '350g', 4199, NULL, '/images/products/bcaa-8-1-1-150g-arancio.jpg', true);
INSERT INTO public.product_options VALUES (556, 1266, 'Cookies & Cream', '2.8kg', 5520, NULL, '/images/products/mass-matrix-cookies-cream-1,3kg.jpg', true);
INSERT INTO public.product_options VALUES (364, 1176, 'Brownies', '1kg', 4280, NULL, '/images/products/whey-iso-brownies.jpg', true);
INSERT INTO public.product_options VALUES (468, 1390, 'Unico', '90 perle ', 2200, NULL, '/images/products/SITO-D3K2.png', true);
INSERT INTO public.product_options VALUES (94, 1202, 'Unico', '100 capsule', 2099, NULL, '/images/products/bcaa-proram-100-cpr.jpg', true);
INSERT INTO public.product_options VALUES (99, 1207, 'Unico', '100 compresse', 2790, NULL, '/images/products/bcaa-peptide-100-cpr.jpg', true);
INSERT INTO public.product_options VALUES (193, 1226, 'Unico', '30 capsule', 2995, NULL, '/images/products/glutatione-liposomiale.jpg', true);
INSERT INTO public.product_options VALUES (191, 1217, 'Unico', '150g', 2998, NULL, '/images/products/glutammina-sport-recovery.jpg', true);
INSERT INTO public.product_options VALUES (131, 1224, 'Unico', '90 capsule', 3599, NULL, '/images/products/co-q10-forte-1000mg.jpg', true);
INSERT INTO public.product_options VALUES (80, 1188, 'Unico', '70 capsule', 2899, NULL, '/images/products/arginina-piroglutammato-e-lisina.jpg', true);
INSERT INTO public.product_options VALUES (145, 1191, 'Unico', '200 capsule', 2995, NULL, '/images/products/creatina-transport-1000-200-cpr.jpg', true);
INSERT INTO public.product_options VALUES (139, 1213, 'Unico', '200g', 1990, NULL, '/images/products/creatina-micronizzata-200g.jpg', true);
INSERT INTO public.product_options VALUES (154, 1225, 'Unico', '60 capsule', 3199, NULL, '/images/products/depurixia-antiossidante.jpg', true);
INSERT INTO public.product_options VALUES (86, 1221, 'Unico', '60 capsule', 2490, NULL, '/images/products/astaxantina-plus.jpg', true);
INSERT INTO public.product_options VALUES (172, 1262, 'Unico', '200 softgel', 2350, NULL, '/images/products/fish-oil-200-softgel.jpg', true);
INSERT INTO public.product_options VALUES (128, 1278, 'Unico', '90 capsule', 2899, NULL, '/images/integratore-citrullina-malato-90-cpr.jpg', true);
INSERT INTO public.product_options VALUES (127, 1278, 'Unico', '175g', 2599, NULL, '/images/citrullina-malato-175g-limone.png', true);
INSERT INTO public.product_options VALUES (298, 1161, 'Unico', '100 compresse', 1870, NULL, '/images/products/ram-1000-bcaa-100-compresse.jpg', true);
INSERT INTO public.product_options VALUES (329, 1165, 'Unico', '150 compresse', 1580, NULL, '/images/products/taurina-1000-mg-150-compresse.jpg', true);
INSERT INTO public.product_options VALUES (333, 1166, 'Unico', '120 compresse', 1670, NULL, '/images/products/thermogenic-force-120-compresse.jpg', true);
INSERT INTO public.product_options VALUES (346, 1170, 'Unico', '120 compresse', 2050, NULL, '/images/products/tribulus-1000-plus-120-compresse.jpg', true);
INSERT INTO public.product_options VALUES (228, 1196, 'Unico', '300g', 2799, NULL, '/images/products/lisina.png', true);
INSERT INTO public.product_options VALUES (226, 1229, 'Unico', '90 capsule', 3598, NULL, '/images/products/lipoic-b.jpg', true);
INSERT INTO public.product_options VALUES (225, 1228, 'Unico', '60 capsule', 3598, NULL, '/images/products/lipoic-800-crom.jpg', true);
INSERT INTO public.product_options VALUES (240, 1230, 'Unico', '60 compresse', 2795, NULL, '/images/products/maxivit-sport.jpg', true);
INSERT INTO public.product_options VALUES (158, 1011, 'Anguria', '420g', 4990, NULL, '/images/new_images/aminoacidi-essenziali-420-g-anguria.png', true);
INSERT INTO public.product_options VALUES (159, 1011, 'Melon', '420g', 4990, NULL, '/images/new_images/aminoacidi-essenziali-420-g-melone.png', true);
INSERT INTO public.product_options VALUES (181, 1531, 'Unico', '200g', 2490, NULL, '/images/new_images/GLUTAMINE-PURE-100-SITO.png', true);
INSERT INTO public.product_options VALUES (183, 1517, 'Unico', '150 compresse', 2490, NULL, '/images/new_images/GLUTAMINE-PURE-1000-SITO.png', true);
INSERT INTO public.product_options VALUES (199, 1516, 'Unico', '300g', 3900, NULL, '/images/new_images/HARD-START-XPLODE-SITO-1.png', true);
INSERT INTO public.product_options VALUES (203, 1519, 'Caffé Latte', '1kg', 5850, NULL, '/images/new_images/HIGH-PRO-RELEASE-SITO.png', true);
INSERT INTO public.product_options VALUES (551, 1146, 'Cioccolato', '1kg', 4620, NULL, '/images/new_images/prime_casein-busta1kg-cioccolato.jpg', true);
INSERT INTO public.product_options VALUES (289, 971, 'Mandorle', '25pz', 5250, NULL, '/images/products/Promeal Energetica 40g_1751036384519.jpg', true);
INSERT INTO public.product_options VALUES (477, 831, 'Limone', '18 bustine', 2340, NULL, '/images/new_images/sali-electrolyte-pocket-minerals-limone-box-30-bustine-882f.webp', true);
INSERT INTO public.product_options VALUES (185, 1263, 'Unico', '250g', 1830, NULL, '/images/new_images/glutaminepure-250g-polvere-pl.jpg', true);
INSERT INTO public.product_options VALUES (106, 824, 'Tutti i Frutti', '30 bustine', 7800, NULL, '/images/new_images/bcaa-ride-gel-box-30-bustine-9649.webp', true);
INSERT INTO public.product_options VALUES (125, 633, 'Frutti di Bosco', '40g', 230, NULL, '/images/products/09-carbo-energy-frutti-bosco.jpg', true);
INSERT INTO public.product_options VALUES (175, 634, 'Fragola', '30g', 180, NULL, '/images/products/12-fruitforce-fragola.jpg', true);
INSERT INTO public.product_options VALUES (124, 633, 'Agrumi', '40g', 230, NULL, '/images/products/10-carbo-energy-agrumi.jpg', true);
INSERT INTO public.product_options VALUES (123, 633, 'Albicocca', '40g', 230, NULL, '/images/products/08-carbo-energy-albicocca.jpg', true);
INSERT INTO public.product_options VALUES (115, 1522, 'Unico', '600ml', 300, NULL, '/images/new_images/borraccia-600.jpg', true);
INSERT INTO public.product_options VALUES (126, 633, 'Mela Verde', '40g', 230, NULL, '/images/new_images/carbo-energy-mela-verde-singola-barretta-0d71.webp', true);
INSERT INTO public.product_options VALUES (122, 1529, 'Unico', 'Unico', 1990, NULL, '/images/new_images/cappellino-ethicsport.jpg', true);
INSERT INTO public.product_options VALUES (117, 1000, 'Unico', '500 ml', 490, NULL, '/images/products/WSX244_singolo_1751038145715.png', true);
INSERT INTO public.product_options VALUES (73, 1439, 'Unico', '250 compresse', 3900, NULL, '/images/new_images/POO-250.png', true);
INSERT INTO public.product_options VALUES (393, 1171, 'Unico', '90 compresse', 970, NULL, '/images/products/vitamin-c-1000-mg-90-compresse.jpg', true);
INSERT INTO public.product_options VALUES (352, 1171, 'Unico', '90 compresse', 970, NULL, '/images/products/vitamin-c-1000-mg-90-compresse.jpg', true);
INSERT INTO public.product_options VALUES (400, 1174, 'Unico', '60 compresse', 1170, NULL, '/images/products/viteral.jpg', true);
INSERT INTO public.product_options VALUES (1, 933, 'Arancia', '25g', 219, NULL, '/images/products/rm1-bcaa-8-1-1-recovery-mix.jpg', true);
INSERT INTO public.product_options VALUES (136, 991, 'Unico', '200g', 1990, NULL, '/images/products/W166_singolo_1751037744110.png', true);
INSERT INTO public.product_options VALUES (446, 1018, 'Unico', ' 120 capsule', 3450, NULL, '/images/products/testogen.png', true);
INSERT INTO public.product_options VALUES (438, 1020, 'Unico', ' 90 compresse', 2290, NULL, '/images/products/collagene-ethicsport.png', true);
INSERT INTO public.product_options VALUES (435, 1023, 'Unico', ' 60 capsule', 1290, NULL, '/images/products/vitamina-d3-2000-iu.png', true);
INSERT INTO public.product_options VALUES (436, 1024, 'Unico', ' 840g', 3590, NULL, '/images/products/super-dextrin-pro.png', true);
INSERT INTO public.product_options VALUES (444, 1019, 'Unico', ' 60 capsule', 2250, NULL, '/images/products/fluid-motion.png', true);
INSERT INTO public.product_options VALUES (434, 1025, 'Unico', ' 90 capsule', 2290, NULL, '/images/products/glucosamina-+-condroitina-+-msm-+-vitamina-c.png', true);
INSERT INTO public.product_options VALUES (441, 1022, 'Unico', ' 120 capsule', 1890, NULL, '/images/products/vitamina-c-1000.png', true);
INSERT INTO public.product_options VALUES (437, 1027, 'Unico', ' 30 capsule', 1890, NULL, '/images/products/caffeina-suprema.png', true);
INSERT INTO public.product_options VALUES (442, 1032, 'Unico', ' 250 ml', 2450, NULL, '/images/products/comfort-plus.jpg', true);
INSERT INTO public.product_options VALUES (69, 1185, 'Unico', '90 capsule', 2690, NULL, '/images/products/acido-d-aspartico-corrected.jpg', true);
INSERT INTO public.product_options VALUES (70, 1283, 'Unico', '400g', 1990, NULL, '/images/products/adrenaline-agrumi-why-sport.png', true);
INSERT INTO public.product_options VALUES (141, 989, 'unico', '300g', 3790, NULL, '/images/products/W013_singolo_1751037744109.png', true);
INSERT INTO public.product_options VALUES (177, 988, 'Arancia', '210 compresse masticabili', 2400, NULL, '/images/products/GLUCO CREATINA Compresse_Fronte_1751037744108.jpg', true);
INSERT INTO public.product_options VALUES (142, 990, 'unico', '120 compresse', 2590, NULL, '/images/products/W026_singolo_1751037744110.png', true);
INSERT INTO public.product_options VALUES (112, 1189, 'Unico', '120 capsule', 3099, NULL, '/images/products/beta-alanina-1000-mg.jpg', true);
INSERT INTO public.product_options VALUES (137, 991, 'Unico', '500g', 3990, NULL, '/images/products/W166_singolo_1751037744110.png', true);
INSERT INTO public.product_options VALUES (166, 998, 'Unico', 'S
', 1398, NULL, '/images/products/EP926741758_singolo_1751038145711.png', true);
INSERT INTO public.product_options VALUES (84, 1198, 'Unico', '60 capusle', 2490, NULL, '/images/products/ashwagandha-forte-500-mg-new.png', true);
INSERT INTO public.product_options VALUES (167, 998, 'Unico', 'XL', 1398, NULL, '/images/products/EP926741758_singolo_1751038145711.png', true);
INSERT INTO public.product_options VALUES (187, 1192, 'Unico', '250 compresse', 2199, NULL, '/images/products/glutammina-glutpower-250-cpr.jpg', true);
INSERT INTO public.product_options VALUES (79, 1187, 'Frutti di Bosco', '200gr', 3195, NULL, '/images/products/arginina-argipower-corrected.jpg', true);
INSERT INTO public.product_options VALUES (78, 1186, 'Unico', '90 capsule', 2795, NULL, '/images/products/arginina-alfaketoglutarato-2000.jpg', true);
INSERT INTO public.product_options VALUES (138, 1190, 'Unico', '120 capsule', 3999, NULL, '/images/products/creatina-krealkalyn-120-cpr.jpg', true);
INSERT INTO public.product_options VALUES (176, 1193, 'Unico', '90 capsule', 2990, NULL, '/images/products/ghanabol-active-9-90-cpr.jpg', true);
INSERT INTO public.product_options VALUES (207, 1194, 'Unico', '90 capsule', 2790, NULL, '/images/products/hmb-3000.png', true);
INSERT INTO public.product_options VALUES (129, 1223, 'Unico', '80 softgel', 2599, NULL, '/images/products/cla-1000.jpg', true);
INSERT INTO public.product_options VALUES (120, 1222, 'Unico', '30 capsule', 2295, NULL, '/images/products/caffè-verde-te-matcha-800mg.jpg', true);
INSERT INTO public.product_options VALUES (107, 1209, 'Unico', '100 capsule', 2599, NULL, '/images/products/bcaa-sport-4-1-1-100-cpr.jpg', true);
INSERT INTO public.product_options VALUES (143, 1215, 'Unico', '200 cpr', 2799, NULL, '/images/products/creatina-tabs-200-cpr.jpg', true);
INSERT INTO public.product_options VALUES (160, 1247, 'Unico', '200 compresse', 2550, NULL, '/images/products/eaa-tabs.jpg', true);
INSERT INTO public.product_options VALUES (153, 1245, 'Unico', '90 compresse', 1350, NULL, '/images/products/daa-90cpr-200ml.jpg', true);
INSERT INTO public.product_options VALUES (155, 1246, 'Naturale', '1kg', 890, NULL, '/images/products/dextro-plus.jpg', true);
INSERT INTO public.product_options VALUES (178, 1249, 'Unico', '500g', 2880, NULL, '/images/products/gluta-max.jpg', true);
INSERT INTO public.product_options VALUES (206, 1251, 'Unico', '200 compresse', 2840, NULL, '/images/products/hmb-1000-mg.jpg', true);
INSERT INTO public.product_options VALUES (179, 1250, 'Unico', '200 compresse', 2440, NULL, '/images/products/gluta-pep.jpg', true);
INSERT INTO public.product_options VALUES (198, 1315, 'Unico', '120 compresse', 4400, NULL, '/images/products/hard-stack-sito-1.png', true);
INSERT INTO public.product_options VALUES (156, 1313, 'Unico', '60 compresse', 6200, NULL, '/images/products/dima-therm-1df4-500x912.webp', true);
INSERT INTO public.product_options VALUES (194, 1316, 'Unico', '60 compresse', 3790, NULL, '/images/products/HARD-ACETYL-SITO.png', true);
INSERT INTO public.product_options VALUES (72, 1317, 'Unico', '60 capsule', 2990, NULL, '/images/products/W175_alc-plus-60-cpr_singolo.png', true);
INSERT INTO public.product_options VALUES (130, 1322, 'Unico', '90 perle', 2990, NULL, '/images/products/W398_CLA_1000cpr_singolo.png', true);
INSERT INTO public.product_options VALUES (321, 1028, 'Arancia', '60 ml - 15 pz', 4500, NULL, '/images/products/super-dextrin-gel-pro.png', true);
INSERT INTO public.product_options VALUES (219, 1195, 'Unico', '120 capsule', 1999, NULL, '/images/products/leucina-1000-mg.jpg', true);
INSERT INTO public.product_options VALUES (253, 1197, 'Unico', '60 capsule', 2699, NULL, '/images/products/ornitina-akg.png', true);
INSERT INTO public.product_options VALUES (248, 1232, 'Unico', '80 capsule', 2995, NULL, '/images/products/omega-3-6-9.jpg', true);
INSERT INTO public.product_options VALUES (246, 1240, 'Unico', '80 perle', 3099, NULL, '/images/products/omega-3-super-60-perle.jpg', true);
INSERT INTO public.product_options VALUES (220, 1253, 'Unico', '150 compresse', 1640, NULL, '/images/products/leucine-1000.jpg', true);
INSERT INTO public.product_options VALUES (214, 1281, 'Unico', '325g', 3699, NULL, '/images/products/i-m-collagen-corrected.jpg', true);
INSERT INTO public.product_options VALUES (317, 1311, 'Unico', '90 capsule vegetali', 4000, NULL, '/images/products/stack-fire-boost-30b7-500x500.webp', true);
INSERT INTO public.product_options VALUES (224, 1319, 'Unico', '60 capsule', 3590, NULL, '/images/products/W429_lipoic-1000-60-cpr_singolo.png', true);
INSERT INTO public.product_options VALUES (331, 1320, 'Unico', '90 capsule', 3590, NULL, '/images/products/W299_thermo-caffeine-90-cpr_singolo.png', true);
INSERT INTO public.product_options VALUES (332, 1321, 'Unico', '90 capsule', 3590, NULL, '/images/products/W300_thermo-no-caffeine-90-cpr_singolo.png', true);
INSERT INTO public.product_options VALUES (217, 1314, 'Unico', '60 compresse', 3300, NULL, '/images/products/kal-redux-1.png', true);
INSERT INTO public.product_options VALUES (391, 747, 'Unico', '90 compresse', 3490, NULL, '/images/products/4793_singolo_1750627156892.png', true);
INSERT INTO public.product_options VALUES (121, 745, 'Unico', '120 compresse', 3190, NULL, '/images/products/2847_singolo_1750627156892.png', true);
INSERT INTO public.product_options VALUES (397, 754, 'Unico', '330 compresse', 6490, NULL, '/images/products/7959_singolo_1750627156892.png', true);
INSERT INTO public.product_options VALUES (250, 753, 'Unico', '100 softgel', 5290, NULL, '/images/products/7920_singolo_1750627156892.png', true);
INSERT INTO public.product_options VALUES (356, 754, 'Unico', '330 compresse', 6490, NULL, '/images/products/7959_singolo_1750627156892.png', true);
INSERT INTO public.product_options VALUES (147, 986, 'Unico', '500g', 7400, NULL, '/images/new_images/creatina-extragold-500-g-4c9b.webp', true);
INSERT INTO public.product_options VALUES (149, 986, 'Unico', '100 compresse', 2500, NULL, '/images/new_images/creatina-extragold-100-compresse-d117.webp', true);
INSERT INTO public.product_options VALUES (161, 1247, 'Unico', '500 compresse', 4630, NULL, '/images/new_images/eaatabs-500cpr-1000ml_1450175203.jpg', true);
INSERT INTO public.product_options VALUES (232, 1533, 'Unico', '1,1kg', 2200, NULL, '/images/new_images/MALTODEX-SITO.png', true);
INSERT INTO public.product_options VALUES (252, 1534, 'Unico', '45 capsule', 1990, NULL, '/images/new_images/thumb.png', true);
INSERT INTO public.product_options VALUES (275, 1537, 'Unico', '20 buste', 2650, NULL, '/images/new_images/pre-gara-endruance.png', true);
INSERT INTO public.product_options VALUES (276, 1146, 'Wafer-Nocciola', '1kg', 4620, NULL, '/images/new_images/prime_casein-busta1kg-wafer-nocciola.jpg', true);
INSERT INTO public.product_options VALUES (478, 933, 'Sprint Apple', '500g', 3000, NULL, '/images/new_images/r-m-1-bcaa-811-recovery-mix-sprint-apple-500-g-f1ee.webp', true);
INSERT INTO public.product_options VALUES (302, 1530, 'Unico', '120 capsule', 2390, NULL, '/images/new_images/ramtech.jpg', true);
INSERT INTO public.product_options VALUES (304, 1524, 'Unico', 'Unica', 600, NULL, '/images/new_images/sacca.jpg', true);
INSERT INTO public.product_options VALUES (341, 1515, 'Unico', '700g', 2390, NULL, '/images/new_images/TOTAL-ENERGY-SITO.png', true);
INSERT INTO public.product_options VALUES (327, 1525, 'Unico', 'S', 1990, NULL, '/images/new_images/magliette-ethic.png', true);
INSERT INTO public.product_options VALUES (135, 991, 'Unico', '1kg', 4990, NULL, '/images/products/W166_singolo_1751037744110.png', true);
INSERT INTO public.product_options VALUES (557, 1370, 'Cioccolato Bianco', '2kg', 13490, NULL, '/images/products/ISOWHEY-WEB-PREMIER.png', true);
INSERT INTO public.product_options VALUES (439, 1030, 'Unico', ' 20 buste', 2650, NULL, '/images/products/creatina-vector.jpg', true);
INSERT INTO public.product_options VALUES (445, 1029, 'Unico', ' 30 compresse', 1650, NULL, '/images/products/repoxan.jpg', true);
INSERT INTO public.product_options VALUES (443, 1031, 'Unico', ' 300g', 3490, NULL, '/images/products/eaa-amminoacidi-essenziali-solubili.png', true);
INSERT INTO public.product_options VALUES (357, 1173, 'Unico', '200 compresse piccole', 970, NULL, '/images/products/vitaminad3-2000ui-200cpr.jpg', true);
INSERT INTO public.product_options VALUES (363, 1312, 'Unico', '60 capsule vegetali', 2800, NULL, '/images/products/weight-control-new-formula-9f17-500x500.webp', true);
INSERT INTO public.product_options VALUES (358, 1279, 'Unico', '120 compresse', 1200, NULL, '/images/products/vitamins-minerals-watt.jpg', true);
INSERT INTO public.product_options VALUES (148, 986, 'Unico', '300 compresse', 6400, NULL, '/images/new_images/creatina-extragold-300-compresse-183f.webp', true);
INSERT INTO public.product_options VALUES (564, 871, 'Cioccolato al Latte', '1,8kg', 12790, NULL, '/images/new_images/perfect-100-whey/W415_perfect-100-whey-18-kg-ciocc.-al-latte_singolo-2.png', true);
INSERT INTO public.product_options VALUES (573, 871, 'Yogurt Pesca', '450g', 3990, NULL, '/images/new_images/perfect-100-whey/W453_perfect-100-whey-yogurt-pesca-450-g_singolo.png', true);
INSERT INTO public.product_options VALUES (554, 1146, 'Vaniglia', '1kg', 4620, NULL, '/images/new_images/prime_casein-busta1kg-vaniglia_1099307337.jpg', true);
INSERT INTO public.product_options VALUES (552, 1146, 'Cioccolato-Cocco', '1kg', 4620, NULL, '/images/new_images/prime_casein-busta1kg-cioccolato-cocco.jpg', true);
INSERT INTO public.product_options VALUES (479, 933, 'Arancia', '22 bustine', 4840, NULL, '/images/new_images/r-m-1-bcaa-811-recovery-mix-arancia-box-30-bustine-30f4.webp', true);
INSERT INTO public.product_options VALUES (376, 639, 'Banana', '750g', 4100, NULL, '/images/new_images/whey-protein-80/wheyghty-protein-80-doypack-da-750-g-banana-4513.webp', true);
INSERT INTO public.product_options VALUES (580, 639, 'Vaniglia', '2kg', 8900, NULL, '/images/new_images/whey-protein-80/vaniglia-2kg.webp', true);
INSERT INTO public.product_options VALUES (582, 639, 'Fragola', '2kg', 8900, NULL, '/images/new_images/whey-protein-80/fragola-2kg.webp', true);
INSERT INTO public.product_options VALUES (384, 640, 'Cacao', '750g', 5400, NULL, '/images/new_images/whey-protein-90/whey-protein-90-doypack-da-750-g-cacao-0fa6.webp', true);
INSERT INTO public.product_options VALUES (1200, 822, 'Arancia', '30 bustine', 6600, NULL, '/images/new_images/bcaa-liquid-carbo-arancia-box-30-bustine-31ed (1).webp', true);
INSERT INTO public.product_options VALUES (585, 945, 'Cacao', '40g', 260, NULL, '/images/new_images/cacao-volchem.jpg', true);
INSERT INTO public.product_options VALUES (586, 634, 'Ananas', '24 barrette', 4320, NULL, '/images/new_images/box 24 barrette_ananas_fruitforce.webp', true);
INSERT INTO public.product_options VALUES (590, 633, 'Albicocca', '20 barrette', 4600, NULL, '/images/new_images/carbo-energy-albicocca-box-20-barrette-7f5a.webp', true);
INSERT INTO public.product_options VALUES (480, 945, 'Vaniglia', '16pz', 4160, NULL, '/images/new_images/680b3b835fb8e06c6cf88590.jpg', true);
INSERT INTO public.product_options VALUES (475, 828, 'Limone', '600g', 1800, NULL, '/images/complex-carbs-advanced-ratio.webp', true);
INSERT INTO public.product_options VALUES (242, 638, 'Vaniglia', '750g', 4600, NULL, '/images/new_images/milk-protein-90-vaniglia-doypack-da-750-g-24e3.webp', true);


--
-- Data for Name: product_sizes; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.product_sizes VALUES (563, 1140, '1', 'kg', 3650);
INSERT INTO public.product_sizes VALUES (124, 773, '300', 'g', 990);
INSERT INTO public.product_sizes VALUES (248, 954, 'Cookies Crisp', '24pz', 3999);
INSERT INTO public.product_sizes VALUES (72, 642, '750', 'g', 5499);
INSERT INTO public.product_sizes VALUES (73, 642, '750', 'g', 5499);
INSERT INTO public.product_sizes VALUES (262, 971, 'Mandorle', '40g', 2100);
INSERT INTO public.product_sizes VALUES (569, 1146, '1', 'kg', 4620);
INSERT INTO public.product_sizes VALUES (573, 1150, '1', 'kg', 1090);
INSERT INTO public.product_sizes VALUES (622, 1202, '100', 'capsule', 2099);
INSERT INTO public.product_sizes VALUES (107, 754, '330 compresse', 'conf', 6490);
INSERT INTO public.product_sizes VALUES (104, 751, '200 mini softgel', 'conf', 3990);
INSERT INTO public.product_sizes VALUES (627, 1207, '100', 'compresse', 2790);
INSERT INTO public.product_sizes VALUES (247, 954, 'Cookies Crisp', '45g', 260);
INSERT INTO public.product_sizes VALUES (258, 968, 'Cappuccino', '1360g', 1590);
INSERT INTO public.product_sizes VALUES (259, 968, 'Cacao', '1360g', 1590);
INSERT INTO public.product_sizes VALUES (227, 951, '350', 'g', 790);
INSERT INTO public.product_sizes VALUES (263, 971, 'Mandorle', '25pz', 210);
INSERT INTO public.product_sizes VALUES (213, 945, '40', 'g', 260);
INSERT INTO public.product_sizes VALUES (230, 953, '1', 'kg', 3490);
INSERT INTO public.product_sizes VALUES (111, 758, '60 compresse', 'conf', 3590);
INSERT INTO public.product_sizes VALUES (133, 797, '60', 'compresse', 1590);
INSERT INTO public.product_sizes VALUES (135, 799, '60', 'compresse', 3490);
INSERT INTO public.product_sizes VALUES (136, 800, '90', 'compresse', 2299);
INSERT INTO public.product_sizes VALUES (137, 801, '60', 'compresse', 3300);
INSERT INTO public.product_sizes VALUES (138, 802, '60', 'compresse', 3900);
INSERT INTO public.product_sizes VALUES (113, 760, '60 capsule', 'conf', 3999);
INSERT INTO public.product_sizes VALUES (142, 807, '180', 'compresse', 3400);
INSERT INTO public.product_sizes VALUES (98, 745, '120 compresse', 'conf', 3190);
INSERT INTO public.product_sizes VALUES (125, 774, '60', 'compresse', 2590);
INSERT INTO public.product_sizes VALUES (101, 748, '30 capsule', 'conf', 2590);
INSERT INTO public.product_sizes VALUES (109, 756, '90 compresse', 'conf', 2590);
INSERT INTO public.product_sizes VALUES (143, 808, '90', 'compresse', 3300);
INSERT INTO public.product_sizes VALUES (106, 753, '100 softgel', 'conf', 5290);
INSERT INTO public.product_sizes VALUES (151, 810, '600', 'g', 1990);
INSERT INTO public.product_sizes VALUES (102, 749, '90 capsule', 'conf', 3490);
INSERT INTO public.product_sizes VALUES (115, 765, '20', 'fiale', 2800);
INSERT INTO public.product_sizes VALUES (625, 1205, '150', 'g', 1990);
INSERT INTO public.product_sizes VALUES (116, 766, '60', 'compresse', 3300);
INSERT INTO public.product_sizes VALUES (132, 796, '60', 'compresse', 1300);
INSERT INTO public.product_sizes VALUES (100, 747, '90 compresse', 'conf', 3490);
INSERT INTO public.product_sizes VALUES (129, 778, '25', 'g', 250);
INSERT INTO public.product_sizes VALUES (119, 769, '120', 'perle', 1900);
INSERT INTO public.product_sizes VALUES (99, 746, '60 compresse', 'conf', 2790);
INSERT INTO public.product_sizes VALUES (639, 1219, '150', 'g', 2699);
INSERT INTO public.product_sizes VALUES (660, 1240, '60', 'perle', 2595);
INSERT INTO public.product_sizes VALUES (629, 1209, '100', 'capsule', 2299);
INSERT INTO public.product_sizes VALUES (633, 1213, '200', 'g', 1990);
INSERT INTO public.product_sizes VALUES (637, 1217, '150', 'g', 2998);
INSERT INTO public.product_sizes VALUES (701, 1280, '30', 'compresse', 1899);
INSERT INTO public.product_sizes VALUES (706, 1281, '325', 'g', 3699);
INSERT INTO public.product_sizes VALUES (635, 1215, '200', 'g', 2799);
INSERT INTO public.product_sizes VALUES (97, 744, '100 compresse', 'conf', 1590);
INSERT INTO public.product_sizes VALUES (239, 959, '450', 'ml', 1350);
INSERT INTO public.product_sizes VALUES (126, 775, '80', 'compresse', 1990);
INSERT INTO public.product_sizes VALUES (130, 779, '90', 'capsule', 3490);
INSERT INTO public.product_sizes VALUES (131, 780, '60', 'capsule', 3990);
INSERT INTO public.product_sizes VALUES (188, 873, 'Cacao', '750g', 5990);
INSERT INTO public.product_sizes VALUES (189, 873, 'Banana & Vaniglia', '750g', 5990);
INSERT INTO public.product_sizes VALUES (190, 874, 'Vaniglia', '900g', 5490);
INSERT INTO public.product_sizes VALUES (191, 875, 'Cacao', '250g', 2599);
INSERT INTO public.product_sizes VALUES (192, 876, 'Cacao', '750g', 4190);
INSERT INTO public.product_sizes VALUES (224, 948, '40', 'g', 240);
INSERT INTO public.product_sizes VALUES (225, 949, '50', 'g', 320);
INSERT INTO public.product_sizes VALUES (228, 952, '35', 'g', 290);
INSERT INTO public.product_sizes VALUES (229, 952, '24', 'pz', 5490);
INSERT INTO public.product_sizes VALUES (233, 955, '75', 'g', 390);
INSERT INTO public.product_sizes VALUES (234, 955, '24', 'pz', 5490);
INSERT INTO public.product_sizes VALUES (235, 956, '350', 'g', 990);
INSERT INTO public.product_sizes VALUES (413, 877, 'Fragola-Banana', '900g', 7990);
INSERT INTO public.product_sizes VALUES (414, 877, 'Wafer Nocciola', '900g', 7990);
INSERT INTO public.product_sizes VALUES (415, 877, 'Vaniglia', '900g', 7990);
INSERT INTO public.product_sizes VALUES (416, 877, 'Cookie Cream', '900g', 7990);
INSERT INTO public.product_sizes VALUES (405, 819, '60 capsule', 'conf', 2000);
INSERT INTO public.product_sizes VALUES (317, 871, 'Pesca', '450g', 3990);
INSERT INTO public.product_sizes VALUES (577, 1154, '1', 'kg', 5540);
INSERT INTO public.product_sizes VALUES (314, 638, 'Vaniglia', '750g', 5400);
INSERT INTO public.product_sizes VALUES (315, 638, 'Cioccolato', '750g', 5400);
INSERT INTO public.product_sizes VALUES (316, 638, 'Naturale', '750g', 5400);
INSERT INTO public.product_sizes VALUES (389, 633, 'Albicocca', '35g', 230);
INSERT INTO public.product_sizes VALUES (278, 986, '100', 'compresse', 2499);
INSERT INTO public.product_sizes VALUES (279, 986, '100', 'g', 1799);
INSERT INTO public.product_sizes VALUES (280, 986, '300', 'compresse', 6399);
INSERT INTO public.product_sizes VALUES (281, 986, '350', 'g', 5499);
INSERT INTO public.product_sizes VALUES (378, 824, 'Tutti i Frutti', '40g gel', 260);
INSERT INTO public.product_sizes VALUES (379, 824, 'Arancia', '40g gel', 260);
INSERT INTO public.product_sizes VALUES (285, 989, '300', 'g', 3790);
INSERT INTO public.product_sizes VALUES (286, 990, '120', 'compresse', 2590);
INSERT INTO public.product_sizes VALUES (287, 991, '200', 'g', 1990);
INSERT INTO public.product_sizes VALUES (288, 991, '500', 'g', 3990);
INSERT INTO public.product_sizes VALUES (298, 1001, 'Standard', 'formato', 3490);
INSERT INTO public.product_sizes VALUES (380, 824, 'Limone', '40g gel', 260);
INSERT INTO public.product_sizes VALUES (318, 871, 'Cookies & Cream', '450g', 3990);
INSERT INTO public.product_sizes VALUES (365, 928, 'Neutro', '500g', 1699);
INSERT INTO public.product_sizes VALUES (390, 633, 'Agrumi', '35g', 230);
INSERT INTO public.product_sizes VALUES (319, 871, 'Cioccolato al Latte', '450g', 3990);
INSERT INTO public.product_sizes VALUES (359, 942, 'Neutro', '200g', 1990);
INSERT INTO public.product_sizes VALUES (360, 925, 'Neutro', '150 compresse', 2000);
INSERT INTO public.product_sizes VALUES (294, 999, 'S', 'taglia', 6850);
INSERT INTO public.product_sizes VALUES (320, 871, 'Cioccolato al Latte', '900g', 6590);
INSERT INTO public.product_sizes VALUES (321, 871, 'Vaniglia', '900g', 6590);
INSERT INTO public.product_sizes VALUES (322, 871, 'Pistacchio', '900g', 6590);
INSERT INTO public.product_sizes VALUES (323, 900, 'Cacao Biscuit', '1600g', 5990);
INSERT INTO public.product_sizes VALUES (324, 898, 'Cacao', '750g', 4199);
INSERT INTO public.product_sizes VALUES (325, 897, 'Cioccolato', '700g', 3690);
INSERT INTO public.product_sizes VALUES (295, 999, 'M', 'taglia', 6850);
INSERT INTO public.product_sizes VALUES (409, 762, '20 bustine', 'conf', 1700);
INSERT INTO public.product_sizes VALUES (408, 827, '60 compresse', 'conf', 3400);
INSERT INTO public.product_sizes VALUES (420, 820, '60', 'capsule', 2400);
INSERT INTO public.product_sizes VALUES (403, 831, '40', 'g', 130);
INSERT INTO public.product_sizes VALUES (411, 828, '1kg', 'conf', 180);
INSERT INTO public.product_sizes VALUES (284, 988, '210', 'compresse', 2400);
INSERT INTO public.product_sizes VALUES (406, 825, '60 capsule', 'conf', 2200);
INSERT INTO public.product_sizes VALUES (339, 639, 'Cacao', '250g', 1699);
INSERT INTO public.product_sizes VALUES (340, 639, 'Nocciola', '250g', 1699);
INSERT INTO public.product_sizes VALUES (341, 639, 'Nocciola', '750g', 4099);
INSERT INTO public.product_sizes VALUES (342, 639, 'Cacao', '750g', 4099);
INSERT INTO public.product_sizes VALUES (343, 639, 'Banana', '750g', 4099);
INSERT INTO public.product_sizes VALUES (344, 639, 'Cappuccino', '750g', 4099);
INSERT INTO public.product_sizes VALUES (112, 759, '90 compresse', 'conf', 3490);
INSERT INTO public.product_sizes VALUES (412, 877, 'Cioccolato', '900g', 7990);
INSERT INTO public.product_sizes VALUES (74, 642, '750', 'g', 5499);
INSERT INTO public.product_sizes VALUES (345, 639, 'Cocco', '750g', 4099);
INSERT INTO public.product_sizes VALUES (346, 639, 'Cacao & Menta', '400g', 2169);
INSERT INTO public.product_sizes VALUES (347, 640, 'Vaniglia', '750g', 5399);
INSERT INTO public.product_sizes VALUES (348, 640, 'Banana', '750g', 5399);
INSERT INTO public.product_sizes VALUES (349, 640, 'Fior di Latte', '750g', 5399);
INSERT INTO public.product_sizes VALUES (350, 640, 'Crema Nocciola', '750g', 5399);
INSERT INTO public.product_sizes VALUES (351, 640, 'Natural', '750g', 5399);
INSERT INTO public.product_sizes VALUES (334, 641, 'Vaniglia', '750g', 2599);
INSERT INTO public.product_sizes VALUES (335, 641, 'Banana', '750g', 2599);
INSERT INTO public.product_sizes VALUES (336, 641, 'Fior di Latte', '750g', 2599);
INSERT INTO public.product_sizes VALUES (337, 641, 'Crema Nocciola', '750g', 2599);
INSERT INTO public.product_sizes VALUES (338, 641, 'Natural', '750g', 2599);
INSERT INTO public.product_sizes VALUES (289, 985, '250', 'g', 5500);
INSERT INTO public.product_sizes VALUES (354, 921, 'Neutro', '500g', 5899);
INSERT INTO public.product_sizes VALUES (580, 1157, '1', 'kg', 5680);
INSERT INTO public.product_sizes VALUES (357, 924, 'Neutro', '90 capsule', 1899);
INSERT INTO public.product_sizes VALUES (358, 940, 'Neutro', '120 compresse', 1890);
INSERT INTO public.product_sizes VALUES (361, 926, 'Neutro', '1kg', 1899);
INSERT INTO public.product_sizes VALUES (353, 920, 'Neutro', '120 capsule', 2599);
INSERT INTO public.product_sizes VALUES (364, 941, 'Neutro', '300g', 2890);
INSERT INTO public.product_sizes VALUES (367, 930, 'Neutro', '200 compresse', 2199);
INSERT INTO public.product_sizes VALUES (373, 943, 'Mela Lime', '300g', 3590);
INSERT INTO public.product_sizes VALUES (374, 943, 'Tè alla Pesca', '300g', 3590);
INSERT INTO public.product_sizes VALUES (387, 632, 'Cookie Nocciola', '80g', 419);
INSERT INTO public.product_sizes VALUES (388, 632, 'Cocco', '80g', 419);
INSERT INTO public.product_sizes VALUES (398, 899, 'Cacao', '330ml', 390);
INSERT INTO public.product_sizes VALUES (399, 947, 'Cacao', '250g', 1090);
INSERT INTO public.product_sizes VALUES (400, 947, 'Gianduia', '250g', 1090);
INSERT INTO public.product_sizes VALUES (375, 822, 'Frutti di Bosco', '500ml', 220);
INSERT INTO public.product_sizes VALUES (366, 929, 'Neutro', '200g', 3199);
INSERT INTO public.product_sizes VALUES (369, 932, 'Neutro', '20ml', 499);
INSERT INTO public.product_sizes VALUES (370, 933, 'Arancia', '40g gel', 219);
INSERT INTO public.product_sizes VALUES (384, 631, 'Cacao', '70g', 430);
INSERT INTO public.product_sizes VALUES (386, 631, 'Burro di Arachidi', '70g', 430);
INSERT INTO public.product_sizes VALUES (391, 633, 'Frutti di Bosco', '35g', 230);
INSERT INTO public.product_sizes VALUES (392, 633, 'Mela Verde', '35g', 230);
INSERT INTO public.product_sizes VALUES (393, 634, 'Ananas', '42g', 180);
INSERT INTO public.product_sizes VALUES (582, 1159, '900', 'g', 2780);
INSERT INTO public.product_sizes VALUES (394, 634, 'Fragola', '42g', 180);
INSERT INTO public.product_sizes VALUES (396, 637, 'Caramello', '45g', 320);
INSERT INTO public.product_sizes VALUES (397, 637, 'Cheesecake', '45g', 320);
INSERT INTO public.product_sizes VALUES (446, 1025, '', '90 capsule', 2290);
INSERT INTO public.product_sizes VALUES (404, 821, '60 capsule', 'conf', 3400);
INSERT INTO public.product_sizes VALUES (300, 1003, '500', 'ml', 249);
INSERT INTO public.product_sizes VALUES (297, 1000, '500', 'ml', 490);
INSERT INTO public.product_sizes VALUES (290, 998, 'S', 'taglia', 1398);
INSERT INTO public.product_sizes VALUES (291, 998, 'M', 'taglia', 1398);
INSERT INTO public.product_sizes VALUES (292, 998, 'L', 'taglia', 1398);
INSERT INTO public.product_sizes VALUES (293, 998, 'XL', 'taglia', 1398);
INSERT INTO public.product_sizes VALUES (296, 999, 'L', 'taglia', 6850);
INSERT INTO public.product_sizes VALUES (308, 1006, 'S', 'taglia', 1890);
INSERT INTO public.product_sizes VALUES (309, 1006, 'M', 'taglia', 1890);
INSERT INTO public.product_sizes VALUES (310, 1006, 'L', 'taglia', 1890);
INSERT INTO public.product_sizes VALUES (299, 1002, '600', 'ml', 450);
INSERT INTO public.product_sizes VALUES (305, 1005, 'S', 'taglia', 1890);
INSERT INTO public.product_sizes VALUES (306, 1005, 'M', 'taglia', 1890);
INSERT INTO public.product_sizes VALUES (307, 1005, 'L', 'taglia', 1890);
INSERT INTO public.product_sizes VALUES (421, 1007, '300', 'g', 4995);
INSERT INTO public.product_sizes VALUES (585, 1176, '1', 'kg', 4280);
INSERT INTO public.product_sizes VALUES (429, 1011, 'Anguria', '420g', 4990);
INSERT INTO public.product_sizes VALUES (430, 1011, 'Melon', '420g', 4990);
INSERT INTO public.product_sizes VALUES (594, 1185, '90', 'capsule', 2690);
INSERT INTO public.product_sizes VALUES (595, 1186, '90', 'capsule', 2795);
INSERT INTO public.product_sizes VALUES (596, 1187, '200', 'gr', 3195);
INSERT INTO public.product_sizes VALUES (418, 831, '18', 'bustine', 2340);
INSERT INTO public.product_sizes VALUES (352, 636, 'Vaniglia', '750g', 3900);
INSERT INTO public.product_sizes VALUES (376, 822, 'Arancia', '500ml', 220);
INSERT INTO public.product_sizes VALUES (377, 822, 'Limone', '500ml', 220);
INSERT INTO public.product_sizes VALUES (444, 1023, '', '60 capsule', 1290);
INSERT INTO public.product_sizes VALUES (597, 1161, '100', 'compresse', 1870);
INSERT INTO public.product_sizes VALUES (601, 1165, '150', 'compresse', 1580);
INSERT INTO public.product_sizes VALUES (431, 1012, 'Unico', '500g', 1990);
INSERT INTO public.product_sizes VALUES (609, 1173, '200', 'compresse piccole', 970);
INSERT INTO public.product_sizes VALUES (435, 1016, 'Unico', '15 pz da 50 ml', 4090);
INSERT INTO public.product_sizes VALUES (436, 1016, 'Unico', '15 pz da 50 ml', 4090);
INSERT INTO public.product_sizes VALUES (437, 1017, 'Unico', '45g - 25 pz', 7290);
INSERT INTO public.product_sizes VALUES (438, 1017, 'Unico', '45g - 25 pz', 7290);
INSERT INTO public.product_sizes VALUES (602, 1166, '120', 'compresse', 1670);
INSERT INTO public.product_sizes VALUES (713, 991, '1', 'kg', 4990);
INSERT INTO public.product_sizes VALUES (447, 1026, 'Unico', '400g', 4190);
INSERT INTO public.product_sizes VALUES (449, 1028, 'Unico', '60 ml - 15 pz', 4500);
INSERT INTO public.product_sizes VALUES (450, 1028, 'Unico', '60 ml - 15 pz', 4500);
INSERT INTO public.product_sizes VALUES (445, 1024, '', '840g', 3590);
INSERT INTO public.product_sizes VALUES (709, 1283, '400', 'g', 1990);
INSERT INTO public.product_sizes VALUES (448, 1027, '', '30 capsule', 1890);
INSERT INTO public.product_sizes VALUES (603, 1167, '1', 'kg', 4730);
INSERT INTO public.product_sizes VALUES (606, 1170, '120', 'compresse', 2050);
INSERT INTO public.product_sizes VALUES (607, 1171, '90', 'compresse', 970);
INSERT INTO public.product_sizes VALUES (610, 1174, '60', 'compresse', 1170);
INSERT INTO public.product_sizes VALUES (611, 1188, '70', 'capsule', 2899);
INSERT INTO public.product_sizes VALUES (617, 1194, '90', 'capsule', 2790);
INSERT INTO public.product_sizes VALUES (618, 1195, '120', 'capsule', 1999);
INSERT INTO public.product_sizes VALUES (619, 1196, '300', 'g', 2799);
INSERT INTO public.product_sizes VALUES (620, 1197, '60', 'capsule', 2699);
INSERT INTO public.product_sizes VALUES (641, 1221, '60', 'capsule', 2490);
INSERT INTO public.product_sizes VALUES (644, 1224, '90', 'capsule', 3599);
INSERT INTO public.product_sizes VALUES (646, 1226, '30', 'capsule', 2995);
INSERT INTO public.product_sizes VALUES (648, 1228, '60', 'capsule', 3598);
INSERT INTO public.product_sizes VALUES (649, 1229, '90', 'capsule', 3598);
INSERT INTO public.product_sizes VALUES (650, 1230, '60', 'compresse', 2795);
INSERT INTO public.product_sizes VALUES (665, 1245, '90', 'compresse', 1350);
INSERT INTO public.product_sizes VALUES (666, 1246, '1', 'kg', 890);
INSERT INTO public.product_sizes VALUES (667, 1247, '200', 'compresse', 2550);
INSERT INTO public.product_sizes VALUES (669, 1249, '500', 'g', 2880);
INSERT INTO public.product_sizes VALUES (670, 1250, '200', 'compresse', 2440);
INSERT INTO public.product_sizes VALUES (671, 1251, '200', 'compresse', 2840);
INSERT INTO public.product_sizes VALUES (673, 1253, '150', 'compresse', 1640);
INSERT INTO public.product_sizes VALUES (680, 1260, '750', 'g', 3940);
INSERT INTO public.product_sizes VALUES (682, 1262, '200', 'softgel', 2350);
INSERT INTO public.product_sizes VALUES (694, 1266, '1,3', 'kg', 3400);
INSERT INTO public.product_sizes VALUES (699, 1278, '175', 'g', 2599);
INSERT INTO public.product_sizes VALUES (615, 1192, '250', 'capsule', 2199);
INSERT INTO public.product_sizes VALUES (683, 1263, '250', 'g', 1830);
INSERT INTO public.product_sizes VALUES (441, 1020, '', '90 compresse', 2290);
INSERT INTO public.product_sizes VALUES (452, 1030, '', '20 buste', 2650);
INSERT INTO public.product_sizes VALUES (612, 1189, '120', 'capsule', 3099);
INSERT INTO public.product_sizes VALUES (710, 1278, '90', 'capsule', 2899);
INSERT INTO public.product_sizes VALUES (613, 1190, '120', 'capsule', 3999);
INSERT INTO public.product_sizes VALUES (614, 1191, '200', 'capsule', 2995);
INSERT INTO public.product_sizes VALUES (616, 1193, '90', 'capsule', 2990);
INSERT INTO public.product_sizes VALUES (711, 1247, '500', 'compresse', 4630);
INSERT INTO public.product_sizes VALUES (621, 1198, '60', 'capsule', 2490);
INSERT INTO public.product_sizes VALUES (432, 1013, '', '90 capsule', 2190);
INSERT INTO public.product_sizes VALUES (645, 1225, '60', 'capsule', 3199);
INSERT INTO public.product_sizes VALUES (385, 631, 'Vaniglia', '70g', 430);
INSERT INTO public.product_sizes VALUES (642, 1222, '30', 'capsule', 2295);
INSERT INTO public.product_sizes VALUES (443, 1022, '', '120 capsule', 1890);
INSERT INTO public.product_sizes VALUES (454, 1032, '', '250 ml', 2450);
INSERT INTO public.product_sizes VALUES (453, 1031, '', '300g', 3490);
INSERT INTO public.product_sizes VALUES (440, 1019, '', '60 capsule', 2250);
INSERT INTO public.product_sizes VALUES (652, 1232, '80', 'capsule', 2995);
INSERT INTO public.product_sizes VALUES (451, 1029, '', '30 compresse', 1650);
INSERT INTO public.product_sizes VALUES (439, 1018, '', '120 capsule', 3450);
INSERT INTO public.product_sizes VALUES (433, 1014, '', '90 capsule', 3250);
INSERT INTO public.product_sizes VALUES (700, 1279, '60', 'compresse', 1200);
INSERT INTO public.product_sizes VALUES (907, 1515, '300', 'g', 2390);
INSERT INTO public.product_sizes VALUES (908, 1516, '300', 'g', 3900);
INSERT INTO public.product_sizes VALUES (909, 1517, '150', 'compresse', 2490);
INSERT INTO public.product_sizes VALUES (722, 1311, '90', 'capsule vegetali', 4000);
INSERT INTO public.product_sizes VALUES (723, 1312, '60', 'capsule vegetali', 2800);
INSERT INTO public.product_sizes VALUES (724, 1313, '60', 'compresse', 6200);
INSERT INTO public.product_sizes VALUES (725, 1314, '60', 'compresse', 3300);
INSERT INTO public.product_sizes VALUES (726, 1315, '120', 'compresse', 4400);
INSERT INTO public.product_sizes VALUES (727, 1316, '60', 'compresse', 3790);
INSERT INTO public.product_sizes VALUES (730, 1319, '60', 'capsule', 3590);
INSERT INTO public.product_sizes VALUES (731, 1320, '90', 'capsule', 3590);
INSERT INTO public.product_sizes VALUES (732, 1321, '90', 'capsule', 3590);
INSERT INTO public.product_sizes VALUES (911, 1519, '1', 'kg', 5850);
INSERT INTO public.product_sizes VALUES (735, 1223, '80', 'softgel', 2599);
INSERT INTO public.product_sizes VALUES (734, 1322, '90', 'perle', 2990);
INSERT INTO public.product_sizes VALUES (914, 1522, '600', 'ml', 300);
INSERT INTO public.product_sizes VALUES (916, 1524, '1', 'pz', 600);
INSERT INTO public.product_sizes VALUES (917, 1525, '1', 'pz', 1990);
INSERT INTO public.product_sizes VALUES (921, 1529, '1', 'pz', 1990);
INSERT INTO public.product_sizes VALUES (923, 1531, '200', 'g', 2490);
INSERT INTO public.product_sizes VALUES (925, 1533, '1.1', 'kg', 1890);
INSERT INTO public.product_sizes VALUES (926, 1534, '45', 'capsule', 1990);
INSERT INTO public.product_sizes VALUES (927, 1535, '20', 'compresse', 950);
INSERT INTO public.product_sizes VALUES (929, 1537, '20', 'buste', 2650);
INSERT INTO public.product_sizes VALUES (810, 1396, '1kg', '', 4900);
INSERT INTO public.product_sizes VALUES (193, 877, 'Black Chocolate', '900g', 7990);
INSERT INTO public.product_sizes VALUES (728, 1317, '60', 'capsule', 2990);
INSERT INTO public.product_sizes VALUES (834, 1439, '250', 'compresse', 3900);
INSERT INTO public.product_sizes VALUES (784, 1370, '450g', '', 3490);
INSERT INTO public.product_sizes VALUES (796, 1382, '1500g', '', 5990);
INSERT INTO public.product_sizes VALUES (798, 1384, '570g', '', 1290);
INSERT INTO public.product_sizes VALUES (802, 1388, '200g', '', 4000);
INSERT INTO public.product_sizes VALUES (804, 1390, '90 perle', '', 2200);
INSERT INTO public.product_sizes VALUES (806, 1392, '750g', '', 5990);
INSERT INTO public.product_sizes VALUES (808, 1394, '90 compresse', '', 3500);
INSERT INTO public.product_sizes VALUES (809, 1395, '90 compresse', '', 2490);
INSERT INTO public.product_sizes VALUES (813, 1399, '150 compresse', '', 3600);
INSERT INTO public.product_sizes VALUES (922, 1530, '120', 'capsule', 2390);


--
-- Data for Name: product_slug_redirects; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.product_slug_redirects VALUES (4, '45-protein-bar-new', 'aaa', 954, '2025-09-26 07:30:19.21986');


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.products VALUES (796, 'fibra-watt', 'Fibra Watt', 1, 7, 'Integratore alimentare a base di glucomannano per il benessere intestinale e il controllo del peso', 'Il glucomannano è una fibra solubile estratta dal tubero di Amorphophallus konjac, nota per la sua capacità di assorbire acqua e formare un gel viscoso nello stomaco. Questa caratteristica contribuisce a: Aumentare il senso di sazietà, favorendo il controllo dell''appetito. Supportare le diete finalizzate alla perdita di peso. Favorire la regolarità intestinale e il benessere digestivo. Contribuire alla modulazione dell''assorbimento dei nutrienti, tra cui carboidrati e lipidi.', '{
    "valori_nutrizionali": {
      "dose": "1 dose = 4 capsule",
      "tabella": [
        {"componente": "Glucomannano", "quantita": "2 g"}
      ]
    },
    "ingredienti": "Glucomannano (da Amorphophallus konjac K. Koch) polvere; amido di mais, vitamina B6 (Piridossina cloridrato); agente di rivestimento: idrossipropilmetilcellulosa; stabilizzante: gomma di gellano."
  }', 'Dosi consigliate: si consiglia l''assunzione di 2 capsule, due volte al giorno, prima dei pasti principali, accompagnate da un bicchiere abbondante d''acqua.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Affinché possa raggiungere lo stomaco, il prodotto deve essere assunto con abbondante acqua. Per persone con difficoltà di deglutizione o in caso di assunzione senza un''adeguata quantità di liquidi, sussiste il rischio di soffocamento. Non assumere in concomitanza con farmaci o altri integratori. Conservare in luogo fresco e asciutto.', 'Il glucomannano è un ottimo supporto per il controllo del peso e per la regolarità intestinale, grazie alla sua capacità di aumentare il senso di sazietà e modulare l''assorbimento dei nutrienti.', false, false, false, '2025-06-24 15:59:33.777031', NULL, NULL, '60', 'compresse');
INSERT INTO public.products VALUES (1262, 'fish-oil-200-softgel', 'Fish Oil', 23, 7, 'FISH OIL OMEGA 3 EPA&DHA è un integratore alimentare di acidi grassi essenziali omega 3 EPA e DHA in forma di trigliceridi.', 'Integratore alimentare a base di olio di pesce ricco di acidi grassi omega-3 EPA e DHA. L''olio di pesce di alta qualità supporta la salute cardiovascolare, la funzione cerebrale e il benessere articolare. Gli omega-3 EPA e DHA contribuiscono al normale funzionamento del cuore, al mantenimento di normali livelli di trigliceridi nel sangue e alla normale funzione cerebrale. Particolarmente indicato per sportivi e per chi segue un''alimentazione povera di pesce.', '["**VALORI NUTRIZIONALI**", "| Componente | Per capsula |", "| --- | --- |", "| Olio di pesce omega-3 | 1000 mg |", "| - di cui EPA | 300 mg |", "| - di cui DHA | 200 mg |", "| Vitamina E | 10 mg |", "", "**INGREDIENTI**", "Olio di pesce concentrato (acidi grassi omega-3), capsula softgel (gelatina, glicerina, acqua purificata), vitamina E (alfa-tocoferolo) come antiossidante.", "", "**MODALITÀ D''USO**", "Assumere 1-2 capsule al giorno con i pasti principali per favorire l''assorbimento."]', 'Assumere 1-2 softgel al giorno durante i pasti.', 'Non superare la dose giornaliera consigliata. Tenere fuori dalla portata dei bambini di età inferiore ai 3 anni. Gli integratori non vanno intesi come sostituti di una dieta variata ed equilibrata e di un sano stile di vita. Consultare il medico in caso di gravidanza o allattamento.', NULL, false, false, false, '2025-08-04 09:01:20.926426', 49, 'Unico', '200 softgel', '200 softgel');
INSERT INTO public.products VALUES (769, 'vitamin-d3-2000-premier', 'Vitamin D3 2000', 6, 7, 'Vitamina D3 2000 UI per il benessere generale e la salute ossea. Formula Premium con olio di oliva.', 'Integratore alimentare in perle soft gel di vitamina D3. Contribuisce al normale assorbimento/utilizzo del calcio e del fosforo e a regolare i livelli di calcio nel sangue. La vitamina D contribuisce alla normale funzione del sistema immunitario e al mantenimento della normale funzione muscolare. Ideale per lo sportivo ad alte prestazioni.', '{
    "valori_nutrizionali": {
      "dose": "Per 1 softgel",
      "tabella": [
        {"componente": "Vitamina D3", "quantita": "50 mcg", "vnr": "1000%"}
      ]
    },
    "ingredienti": "Olio di SOIA, gelatina alimentare, glicerolo, colecalciferolo (Vitamina D3)."
  }', 'Assumere 1 perla al giorno con acqua.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Contiene soia. Conservare in luogo fresco e asciutto.', 'Un integratore di vitamina D3 in perle soft gel per un''assimilazione ottimale. La vitamina D3 è essenziale per l''assorbimento del calcio, la salute ossea, la funzione muscolare e il sistema immunitario. Particolarmente indicato per sportivi ad alte prestazioni che hanno maggiori esigenze nutrizionali.', false, false, false, '2025-06-24 15:32:23.192126', NULL, 'Naturale', '120 compresse', '2290');
INSERT INTO public.products VALUES (1223, 'cla-1000', 'CLA 1000', 25, 5, 'Alcune recenti ricerche indicano che l''acido linoleico coniugato svolge molteplici funzioni all''interno del nostro organismo sia sulla riduzione del grasso corporeo che sullo sviluppo della massa magra.', 'Questo prodotto non poteva mancare nella linea benessere proposta da ProNutrition. Alcune recenti ricerche indicano che l''acido linoleico coniugato svolge molteplici funzioni all''interno del nostro organismo sia sulla riduzione del grasso corporeo che sullo sviluppo della massa magra, sul potenziamento del sistema immunitario e di protezione sul sistema cardiovascolare sino ad arrivare ad una importante azione antiossidante molto utile per contrastare i danni ossidativi causati dai radicali liberi. CLA È proposto in pratiche perle di gelatina da 800 mg con un titolo di CLA puro del 80% e si consiglia di assumerlo frazionato nell''arco della giornata.', '{
    "nutritional_table": {
      "title": "Valori Nutrizionali",
      "serving_size": "4 softgel",
      "servings_per_container": "20",
      "values": [
        {"nutrient": "Valore energetico", "amount": "42.4", "unit": "Kcal", "daily_value": null},
        {"nutrient": "Proteine", "amount": "1080", "unit": "mg", "daily_value": null},
        {"nutrient": "Carboidrati", "amount": "480", "unit": "mg", "daily_value": null},
        {"nutrient": "Grassi", "amount": "4000", "unit": "mg", "daily_value": null},
        {"nutrient": "CLA (Acido Linoleico Coniugato)", "amount": "3200", "unit": "mg", "daily_value": null}
      ]
    },
    "ingredients": "Involucro in gelatina alimentare, glicerina e coloranti naturali; contenuto: olio di CLA a tenore garantito di 80% di CLA. Allergeni: Prodotto in uno stabilimento che lavora anche derivati del latte, dell''uovo, della soia, della frutta a guscio e del pesce.",
    "usage": "Si consiglia di assumere 2 softgels due volte al giorno."
  }', 'Si consiglia di assumere 2 softgels due volte al giorno.', NULL, NULL, false, false, false, '2025-08-04 08:39:10.536301', NULL, 'Unico', NULL, '80 softgel');
INSERT INTO public.products VALUES (1224, 'co-q10-forte-1000mg', 'CO-Q10 Forte 1000mg', 25, 7, 'Coenzima q10 ottenuto per fermentazione vegetale. Sostanza naturalmente presente nel nostro organismo dove svolge azione antiossidante, migliora l''efficienza fisica, la formazione di energia, azione antiaging e favorisce la protezione delle cellule dallo stress ossidativo.', 'Coenzima q10 ottenuto per fermentazione vegetale. Sostanza naturalmente presente nel nostro organismo dove svolge azione antiossidante, migliora l''efficienza fisica, la formazione di energia, azione antiaging e favorisce la protezione delle cellule dallo stress ossidativo. La concentrazione nel nostro organismo tende naturalmente a calare con l''invecchiamento o sotto stress psico fisico pertanto una sua integrazione è consigliata agli sportivi ed agli adulti.', '{
    "nutritional_table": {
      "title": "Valori Nutrizionali",
      "serving_size": "1 compressa",
      "servings_per_container": "90",
      "values": [
        {"nutrient": "Coenzima Q10", "amount": "100", "unit": "mg", "daily_value": null}
      ]
    },
    "ingredients": "Agenti di carica: Cellulosa microcristallina e Calcio Fosfato, Coenzima Q10, Antiagglomeranti: Magnesio Sterarato e Biossido di Silicio.",
    "usage": "Assumere una compressa al giorno con un bicchiere d''acqua."
  }', 'Assumere una compressa al giorno con un bicchiere d''acqua.', NULL, NULL, false, false, false, '2025-08-04 08:39:10.536301', NULL, 'Unico', NULL, '90 capsule');
INSERT INTO public.products VALUES (744, 'selenio-100-jamieson', 'Selenio 100', 10, 7, 'Selenio 100μg per la protezione antiossidante e il supporto del sistema immunitario', 'Integratore di Selenio in compresse, indicato per difendere le cellule dallo stress ossidativo e contrastare gli effetti dannosi causati dai radicali liberi.', '{
    "valori_nutrizionali": {
      "dose": "Per 1 compressa",
      "tabella": [
        {"componente": "Selenio", "quantita": "100 µg", "vnr": "182%"}
      ]
    },
    "ingredienti": "Agente di carica: cellulosa microcristallina; agente antiagglomerante: fosfato dicalcico; lievito arricchito in selenio; agenti antiagglomeranti: magnesio stearato vegetale, carbossimetilcellulosa sodica reticolata."
  }', 'Assumere 1 compressa al giorno con un bicchiere d''acqua, preferibilmente durante un pasto principale.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Conservare in luogo fresco e asciutto.', 'Il selenio è un oligoelemento essenziale presente in molte selenoproteine che svolgono ruoli cruciali nell''organismo. La sua presenza è particolarmente significativa per la difesa delle cellule dallo stress ossidativo e per il supporto delle funzioni antiossidanti naturali dell''organismo.', false, false, false, '2025-06-22 21:51:52.328907', NULL, NULL, NULL, '100 compresse');
INSERT INTO public.products VALUES (873, 'perfect-blend-90', 'Perfect Blend 90', 11, 1, 'Miscela proteica avanzata con 90% di proteine. Combinazione ottimale di siero concentrato e isolato per massima efficacia e gusto superiore.', 'Perfect Blend 90 offre una miscela avanzata di proteine da diverse fonti per un rilascio ottimale: caseinato di calcio per un rilascio lento, proteine isolate del siero del latte (Isolac®) per un assorbimento rapido, proteine idrolizzate del siero del latte (Optipep® 90 DH4) per una digestione rapida e proteine dell''uovo instant per un profilo aminoacidico completo. La formulazione è arricchita con gli enzimi bromelina e lattasi per migliorare la digeribilità.', '{"nome_prodotto":"Perfect Blend 90","valori_nutrizionali":{"per_porzione":{"descrizione":"Informazioni nutrizionali per porzione:","valori":[{"componente":"Energia","valore":"515 kJ / 123 kcal"},{"componente":"Grassi","valore":"0,4 g"},{"componente":"di cui acidi grassi saturi","valore":"0,1 g"},{"componente":"Carboidrati","valore":"0,4 g"},{"componente":"di cui zuccheri","valore":"0,4 g"},{"componente":"Fibre","valore":"0,0 g"},{"componente":"Proteine","valore":"27,3 g"},{"componente":"Sale","valore":"0,02 g"},{"componente":"Bromelina","valore":"50 mg"},{"componente":"Lattasi","valore":"675 µg"}]},"per_100g":{"descrizione":"Informazioni nutrizionali per 100g:","valori":[{"componente":"Energia","valore":"1715 kJ / 410 kcal"},{"componente":"Grassi","valore":"1,3 g"},{"componente":"di cui acidi grassi saturi","valore":"0,4 g"},{"componente":"Carboidrati","valore":"1,2 g"},{"componente":"di cui zuccheri","valore":"1,2 g"},{"componente":"Fibre","valore":"0,0 g"},{"componente":"Proteine","valore":"91 g"},{"componente":"Sale","valore":"0,06 g"},{"componente":"Bromelina","valore":"167 mg"},{"componente":"Lattasi","valore":"2250 µg"}]}},"ingredienti":"Proteine isolate della soia, proteine del siero del latte concentrate, proteine del latte concentrate, albume d''uovo in polvere, aromi, cacao magro in polvere, edulcoranti: sucralosio, acesulfame K; bromelina (da Ananas comosus Merr., stipiti), lattasi (da Aspergillus oryzae)."}', 'Assumere 30 g di prodotto (circa 1 misurino colmo) in 250 ml di acqua fredda o latte scremato, 1 volta al giorno. Questa miscela è ideale sia dopo l''allenamento per un rapido recupero che come spuntino tra i pasti per un rilascio prolungato di aminoacidi.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Conservare in luogo fresco e asciutto.', 'Ideale per chi ha problemi digestivi o intolleranza al lattosio, grazie agli enzimi bromelina e lattasi che migliorano la digeribilità. La sua miscela di proteine a rilascio differenziato la rende versatile per ogni momento della giornata.', false, true, false, '2025-06-25 22:33:29.410551', 11, NULL, NULL, NULL);
INSERT INTO public.products VALUES (756, 'magnesio-tripla-azione-jamieson', 'Magnesio Tripla Azione', 10, 7, 'Magnesio in tre forme per il supporto di sistema nervoso, muscoli e riduzione stanchezza', 'Il magnesio è un minerale essenziale per l''organismo, poiché agisce come cofattore di numerosi enzimi coinvolti nei processi metabolici. Supporta il normale funzionamento del sistema nervoso e muscolare, contribuendo inoltre a ridurre stanchezza e affaticamento. Magnesio Tripla Azione di Jamieson contiene 3 fonti di magnesio, di cui due organiche (lattato e gluconato). Può essere utile per sostenere i ritmi delle giornate più frenetiche e alleviare nervosismo, irritabilità, stanchezza.', '{
    "valori_nutrizionali": {
      "dose": "Per 1 compressa",
      "tabella": [
        {"componente": "Magnesio", "quantita": "250 mg", "vnr": "66,6"}
      ]
    },
    "ingredienti": "Complesso di magnesio: ossido di magnesio, gluconato di magnesio, magnesio lattato; agenti di carica: cellulosa microcristallina, carbossimetilcellulosa sodica reticolata; agenti antiagglomeranti: acido stearico vegetale, biossido di silicio; rivestimento compressa: agenti di rivestimento: idrossipropilcellulosa, idrossipropilmetilcellulosa; colorante: biossido di titanio."
  }', 'Assumere 1 compressa al giorno preferibilmente durante il pasto principale.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Conservare in luogo fresco e asciutto.', 'La combinazione di tre fonti di magnesio, inclusi composti organici a più alta biodisponibilità, rende questo integratore particolarmente efficace per combattere stanchezza, stress e fastidi muscolari, supportando il benessere generale.', false, false, false, '2025-06-22 21:51:54.442621', NULL, NULL, NULL, '90 compresse');
INSERT INTO public.products VALUES (765, 'triboost', 'Triboost', 1, 7, 'Integratore energetico con vitamine del gruppo B per il supporto del metabolismo energetico. Formulato con B1, B6, B12 e acido folico.', 'Integratore alimentare innovativo a base di Tribulus terrestris, Maca Andina e Zinco, formulato per sostenere la regolazione ormonale, migliorare la vitalità fisica e mentale e contribuire al mantenimento di normali livelli di testosterone nel sangue. Indicato per atleti e per il benessere generale.', '{
    "valori_nutrizionali": {
      "dose": "Per 1 dose = 5 Capsule",
      "tabella": [
        {"componente": "Tribulus terrestris", "quantita": "1.500 mg"},
        {"componente": "Maca Andina", "quantita": "1.000 mg"},
        {"componente": "Zinco Citrato", "quantita": "47,5 mg"},
        {"componente": "di cui Zinco", "quantita": "15 mg (150% VNR)"}
      ]
    },
    "ingredienti": "Tribulus (Tribulus terrestris, e.s* da frutto, tit. 90% saponine), Maca (Lepidium meyenii Walp., e.s.* da radice, tit. 2,5% β-sitosteroli), capsula (agente di rivestimento: idrossi-propil-metilcellulosa; ossido di zinco.)"
  }', 'Uso Sportivo: Assumere 5 capsule al giorno, preferibilmente distribuite tra i pasti. Vita Quotidiana: Assumere 5 capsule al giorno, distribuite durante la giornata.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Conservare in luogo fresco e asciutto.', 'Una formula sinergica che combina Tribulus terrestris titolato al 90% in saponine, Maca Andina ricca di β-sitosteroli e zinco per supportare la vitalità maschile e il benessere generale. Lo zinco contribuisce al mantenimento di normali livelli di testosterone nel sangue.', false, false, false, '2025-06-24 15:32:22.643104', NULL, 'Naturale', '20 fiale', '2490');
INSERT INTO public.products VALUES (928, 'glutammina-plus-polvere', 'Glutammina+ Polvere', 1, 2, 'L-Glutammina+ in polvere arricchita per massimizzare il recupero post-allenamento e supportare la funzione immunitaria', 'La glutammina è l''aminoacido più presente all''interno dell''organismo. Si tratta di un aminoacido semiessenziale: in circostanze normali l''organismo è in grado di sintetizzarne una quantità sufficiente ma, in caso di aumentato fabbisogno, non è in grado di far fronte alle esigenze. La L-glutammina svolge un ruolo fondamentale a sostegno del sistema immunitario: mantiene infatti integra la funzionalità del sistema gastro-intestinale, e rappresenta un substrato per la proliferazione di linfociti e macrofagi. Inoltre, è coinvolta nella sintesi di altri aminoacidi, nella gluconeogenesi, nel mantenimento dell''equilibrio acido-base e nella detossificazione dell''ammoniaca.', '{"titolo":"Glutammina+ Polvere","per_porzione":{"descrizione":"Valori nutrizionali per dose","porzione":"3 compresse","valori":[{"componente":"L-glutammina","valore":"3 g"}]},"ingredienti":"L-Glutammina."}', 'Si consiglia di sciogliere 2 misurini di prodotto (3 g) in un bicchiere d''acqua.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Conservare in luogo fresco e asciutto.', 'Questa glutammina in polvere è ottima per supportare il sistema immunitario e la salute intestinale, benefici spesso sottovalutati ma cruciali per gli atleti e per il benessere generale, specialmente durante periodi di stress.', false, false, false, '2025-06-26 14:52:33.082292', NULL, NULL, NULL, NULL);
INSERT INTO public.products VALUES (1246, 'dextro-plus', 'Dextro Plus', 23, 3, 'DEXTRO PLUS è un preparato per bevanda a base di destrosio, ideale per fornire energia immediata agli atleti di tutte le discipline sportive.', 'DEXTRO PLUS è un preparato per bevanda a base di destrosio, ideale per fornire energia immediata agli atleti di tutte le discipline sportive. DEXTRO PLUS contiene esclusivamente destrosio, senza aromi. Non contiene ingredienti di origine animale ed è adatto anche ai vegani.

Modalità d''uso: Preparare il prodotto miscelando una porzione (3 misurini = 60 g) con acqua. da 120 ml  a 500 ml.

Ingredienti: Destrosio; Stabilizzante: calcio fosfato.', '{"titolo":"Dextro Plus","descrizione":"È un preparato per bevanda a base di destrosio, ideale per fornire energia immediata agli atleti di tutte le discipline sportive. Contiene esclusivamente destrosio, senza aromi. È adatto anche ai vegani.","valori_nutrizionali":{"per_porzione":{"porzione":"60g = 3 misurini","energia":"1010 kJ / 238 kcal","grassi":"0 g","carboidrati":"59,4 g","di_cui_zuccheri":"59,4 g","proteine":"0 g","sale":"0 g"},"per_100g":{"energia":"1683 kJ / 396 kcal","grassi":"0 g","carboidrati":"99 g","di_cui_zuccheri":"99 g","proteine":"0 g","sale":"0 g"}},"ingredienti":"Destrosio; Stabilizzante: calcio fosfato."}', 'Preparare il prodotto miscelando una porzione (3 misurini = 60 g) con acqua. da 120 ml a 500 ml.', NULL, NULL, false, false, false, '2025-08-04 08:59:14.038821', NULL, NULL, NULL, NULL);
INSERT INTO public.products VALUES (828, 'complex-carbs-advanced-ratio', 'Complex Carbs Advanced Ratio 1:0.8', 1, 3, 'Carboidrati complessi con rapporto avanzato per energia sostenuta', 'Miscela bilanciata di carboidrati complessi e semplici (Vitargo®, maltodestrine, fruttosio) per il sostegno energetico durante l''attività fisica. Il rapporto glucosio:fruttosio di 1:0.8 è basato su evidenze scientifiche per un''ossidazione efficiente e un miglior comfort intestinale.', '{
    "valori_nutrizionali": {
      "dose": "Per 1 dose = 42 g",
      "tabella": [
        {"componente": "Valore energetico", "quantita": "688 kJ / 165 kcal"},
        {"componente": "Grassi", "quantita": "0 g"},
        {"componente": "di cui Acidi grassi saturi", "quantita": "0 g"},
        {"componente": "Carboidrati", "quantita": "40 g"},
        {"componente": "di cui Zuccheri", "quantita": "19 g"},
        {"componente": "Fibre", "quantita": "0 g"},
        {"componente": "Proteine", "quantita": "0 g"},
        {"componente": "Sale", "quantita": "0 g"}
      ]
    },
    "ingredienti": "Fruttosio, amilopectina* (Vitargo®), maltodestrine, aroma. *Vitargo® prodotto da / produced by SWECARB AB, Skeppsbron 11, SE-392 31 Kalmar, SWEDEN."
  }', 'SPORT: Ideale per il supporto energetico pre e intra-workout in sport di resistenza e allenamenti intensi. Sciogliere una bustina (42 g) in almeno 300 ml di acqua e consumare durante l''attività fisica.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Conservare in luogo fresco e asciutto.', 'Una miscela scientificamente formulata che combina carboidrati a rilascio rapido e graduale per un''energia sostenuta. Il rapporto glucosio:fruttosio 1:0.8 è basato su evidenze scientifiche per massimizzare l''ossidazione dei carboidrati e ridurre i disturbi gastrointestinali durante l''esercizio prolungato.', false, false, false, '2025-06-24 16:38:16.727456', NULL, 'Limone', '42g', '42');
INSERT INTO public.products VALUES (751, 'omega-3-select-mini-jamieson', 'Omega-3 Select Mini', 10, 7, 'Omega-3 concentrati EPA e DHA in capsule mini per tripla azione su cervello, cuore e occhi', 'Integratore alimentare di omega 3 (EPA e DHA). Omega-3 (EPA e DHA) ottenuti da pesce distillato molecolarmente, sottoposto ad un processo di purificazione che assicura l''eliminazione dei metalli pesanti, inclusi mercurio e piombo e i contaminanti ambientali: PCB e diossine.', '{
    "valori_nutrizionali": {
      "dose": "Per 4 perle",
      "tabella": [
        {"componente": "Olio di pesce", "quantita": "2.000 mg"},
        {"componente": "- di cui omega 3", "quantita": "1.200 mg"},
        {"componente": "EPA", "quantita": "720 mg"},
        {"componente": "DHA", "quantita": "480 mg"}
      ]
    },
    "ingredienti": "Olio di pesce distillato molecolarmente (acciughe, sardine, sgombri, aringhe). Softgel: gelatina; agente di resistenza: glicerolo."
  }', 'Assumere 4 softgels al giorno con un bicchiere d''acqua, preferibilmente ai pasti.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Non superare il livello di assunzione giornaliera supplementare di 5 g di combinazione di EPA e DHA. Conservare in luogo fresco e asciutto.', 'La purezza garantita dalla distillazione molecolare e l''eliminazione dei contaminanti rendono questo Omega-3 una scelta sicura ed efficace per il supporto cardiovascolare e cerebrale. La forma "Mini" può essere più facile da deglutire per alcuni.', false, false, false, '2025-06-22 21:51:53.573587', NULL, NULL, NULL, '200 mini softgel');
INSERT INTO public.products VALUES (990, 'creatina-platinum-1300', 'Creatina Platinum 1300', 11, 2, 'Compresse ad alto dosaggio con creatina, arginina e taurina per risultati intensivi', 'Combinazione di creatina, taurina e arginina per una carica di energia muscolare potenziata. La creatina aumenta forza e potenza, la taurina supporta il recupero muscolare riducendo l''affaticamento, e l''arginina favorisce il flusso sanguigno e l''apporto di nutrienti ai muscoli.', '{
    "valori_nutrizionali": {
      "dose": "Per porzione",
      "tabella": [
        {"componente": "Creatina monoidrato Creapure®", "quantita": "5100 mg"},
        {"componente": "di cui creatina", "quantita": "4482 mg"},
        {"componente": "Taurina", "quantita": "498 mg"},
        {"componente": "L-arginina cloridrato", "quantita": "498 mg"},
        {"componente": "di cui L-arginina", "quantita": "414 mg"}
      ]
    },
    "ingredienti": "Creatina monoidrato Creapure®; agente di carica: cellulosa microcristallina; agenti antiagglomeranti: mono- e digliceridi degli acidi grassi, polivinilpirrolidone, sali di magnesio degli acidi grassi, biossido di silicio: taurina; L-arginina cloridrato. SENZA GLUTINE."
  }', 'Per lo sportivo si consiglia di assumere 6 compresse al giorno per non oltre un mese, prima dell’attività sportiva.
', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Senza glutine. Conservare in luogo fresco e asciutto.', 'La versione concentrata della formula Platinum con 1300mg di principi attivi per compressa. Una dose elevata di creatina Creapure®, taurina e L-arginina in formato pratico per chi cerca la massima concentrazione e convenienza senza compromessi sull''efficacia.', false, false, false, '2025-06-27 16:00:57.282047', NULL, 'Neutro', '120 compresse', '30-40 dosi');
INSERT INTO public.products VALUES (943, 'essenziali-zero-carb', 'Essenziali Zero Carb', 11, 2, 'Aminoacidi essenziali WHY Sport senza carboidrati con OKG e glutammina, disponibile nei gusti Mela Lime e Tè alla Pesca in formato 240g', 'Essenziali 1300 è un integratore che offre una formula completa, comprendente tutti gli aminoacidi essenziali (EAA), noti per il loro ruolo cruciale nel supporto del benessere muscolare, OKG, glutammina e vitamina B6. L''OKG, composto dall''unione di ornitina e alfa-chetoglutarato, supporta la crescita muscolare, la performance fisica ed è coinvolto nel metabolismo energetico. La glutammina è coinvolta nella riparazione dei tessuti muscolari danneggiati, riduce il rischio di sovrallenamento e supporta il sistema immunitario. La vitamina B6 è fondamentale per il metabolismo degli aminoacidi e la sintesi proteica.', '{"titolo":"Essenziali Zero Carb","per_porzione":{"descrizione":"Valori nutrizionali per porzione","valori":[{"componente":"L-leucina","valore":"1000 mg"},{"componente":"L-valina","valore":"800 mg"},{"componente":"L-isoleucina","valore":"750 mg"},{"componente":"L-fenilalanina","valore":"650 mg"},{"componente":"L-lisina","valore":"560 mg"},{"componente":"L-treonina","valore":"550 mg"},{"componente":"L-metionina","valore":"350 mg"},{"componente":"L-triptofano","valore":"200 mg"},{"componente":"L-glutammina","valore":"100 mg"},{"componente":"OKG","valore":"100 mg"},{"componente":"Vitamina B6","valore":"1,4 mg (100% VNR)"}]},"per_100g":{"descrizione":"Valori nutrizionali per 100g/ml","valori":[{"componente":"L-leucina","valore":"16,7 g"},{"componente":"L-valina","valore":"13,3 g"},{"componente":"L-isoleucina","valore":"12,5 g"},{"componente":"L-fenilalanina","valore":"10,8 g"},{"componente":"L-lisina","valore":"9,3 g"},{"componente":"L-treonina","valore":"9,2 g"},{"componente":"L-metionina","valore":"5,8 g"},{"componente":"L-triptofano","valore":"3,3 g"},{"componente":"L-glutammina","valore":"1,7 g"},{"componente":"OKG","valore":"1,7 g"},{"componente":"Vitamina B6","valore":"23,3 mg"}]},"ingredienti":"L-leucina instant (emulsionante: lecitina di girasole); L-valina instant (emulsionante: lecitina di girasole); L-isoleucina instant (emulsionante: lecitina di girasole); L-fenilalanina; aromi; L-lisina; L-treonina; L-metionina; correttore di acidità: acido citrico; L-triptofano; L-glutammina (Kyowa Quality®); L-ornitina alfa-chetoglutarato (OKG); agente antiagglomerante: biossido di silicio; edulcorante: sucralosio; vitamina B6 (cloridrato di piridossina); edulcorante: glicosidi steviolici. SENZA GLUTINE."}', 'Le modalità d''uso specifiche non sono state fornite nel testo.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Conservare in luogo fresco e asciutto.', 'La combinazione di tutti gli EAA con OKG, glutammina e vitamina B6 rende questo integratore un supporto completo per la crescita, il recupero muscolare e il metabolismo energetico, particolarmente utile per gli atleti.', false, false, false, '2025-06-26 15:27:27.964759', NULL, NULL, NULL, NULL);
INSERT INTO public.products VALUES (930, 'high-bcaa-2-1-1', 'High BCAA 2:1:1', 6, 2, 'Aminoacidi ramificati BCAA nel rapporto 2:1:1 ad alta biodisponibilità per il recupero muscolare ottimale', 'HIGH BCAA 2:1:1 è un prodotto in compresse a base di aminoacidi ramificati in forma libera, di purezza farmaceutica, caratterizzato da una formulazione bilanciata: 2 L-Leucina, 1 L-Valina, 1 L-Isoleucina (rapporto 2:1:1) e arricchito con vitamina B6, elemento nutritivo coinvolto in tutte le fasi del metabolismo aminoacidico. È scientificamente riconosciuta l''importanza dei BCAA per l''organismo, soprattutto in contesti di attività fisica e sportiva. Prima dell''allenamento supportano l''energia muscolare, durante l''allenamento prevengono il catabolismo, e dopo l''allenamento favoriscono il recupero e la sintesi proteica.', '{
    "valori_nutrizionali": {
      "dose": "5 compresse",
      "tabella": [
        {"componente": "L-Leucina", "quantita": "2,5 g", "vnr": "-"},
        {"componente": "L-Isoleucina", "quantita": "1,25 g", "vnr": "-"},
        {"componente": "L-Valina", "quantita": "1,25 g", "vnr": "-"},
        {"componente": "Vitamina B6", "quantita": "2,4 mg", "vnr": "170%"}
      ]
    },
    "ingredienti": "L-Leucina, L-Isoleucina, L-Valina, Stabilizzanti: biossido di silicio, sali di magnesio degli acidi grassi, Amido di Mais; Agente di carica: cellulosa microcristallina; Vitamina B6 (Cloridrato di piridossina)."
  }', 'Assumere da 2 a 5 compresse al giorno, in funzione dell''entità globale dello sforzo muscolare.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Conservare in luogo fresco e asciutto.', 'La purezza farmaceutica dei BCAA e l''aggiunta di Vitamina B6 ne massimizzano l''efficacia per il supporto energetico, la prevenzione del catabolismo e il recupero muscolare.', false, false, false, '2025-06-26 14:52:33.082292', NULL, NULL, NULL, NULL);
INSERT INTO public.products VALUES (932, 'pocket-carnitine', 'Pocket Carnitine', 1, 2, 'L-Carnitina in formato pratico monoporzione per il supporto del metabolismo lipidico e energetico', 'Pocket Carnitine è un integratore in forma liquida a base di L-carnitina, ideale per supportare il metabolismo energetico durante l''attività fisica e nei percorsi di ricomposizione corporea. La sua formulazione pratica in fiala lo rende un alleato efficace per atleti di endurance e per chi desidera sfruttare i grassi come fonte di energia.', '{
    "valori_nutrizionali": {
      "dose": "1 dose = 1/3 fiala",
      "tabella": [
        {"componente": "L-carnitina", "quantita": "1.000 mg"}
      ]
    },
    "ingredienti": "Acqua, L-carnitina tartrato, L-carnitina, acidificante: acido citrico; aroma, conservante: potassio sorbato; edulcoranti: sucralosio, glicosidi steviolici (estratti da foglie di Stevia rebaudiana Bertoni)."
  }', 'Dosaggio: 1/3 fiala da assumere tal quale oppure diluita in mezzo bicchiere d''acqua. Uso sportivo: indicato prima di attività aerobiche (es. corsa, ciclismo, nuoto) o allenamenti misti. Ideale per sostenere la performance energetica. Vita quotidiana: adatto a chi segue una dieta a basso contenuto calorico o a chi desidera migliorare la gestione del peso.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Conservare in luogo fresco e asciutto.', 'La carnitina è un coadiuvante efficace per la mobilitazione dei grassi a scopo energetico, rendendo questo prodotto un valido supporto per gli allenamenti di resistenza e per il controllo del peso. La forma liquida ne facilita un''assunzione rapida.', false, false, false, '2025-06-26 15:26:24.792428', NULL, NULL, NULL, NULL);
INSERT INTO public.products VALUES (921, 'aminoacidi-essenziali-plus-polvere', 'Aminoacidi Essenziali+ Polvere', 1, 2, 'Integratore di aminoacidi essenziali in polvere per il supporto della sintesi proteica e del recupero muscolare post-allenamento', 'Questo integratore alimentare in polvere è formulato con aminoacidi essenziali di grado farmaceutico, arricchito con vitamine C, E e del gruppo B. È ideale per supportare la sintesi proteica, il recupero muscolare e la riduzione della stanchezza, specialmente per chi pratica allenamenti intensi, cerca di mantenere la massa muscolare o ha una dieta carente di aminoacidi essenziali. La sua formulazione in polvere, priva di leganti o derivati animali, assicura una biodisponibilità ottimale e un assorbimento rapido, facilitando il raggiungimento dei dosaggi terapeutici necessari per ottenere i benefici desiderati.', '{"titolo":"Aminoacidi Essenziali+ Polvere","per_porzione":{"descrizione":"Informazioni nutrizionali per 5,5g","porzione":"1 dose = 5,5 g","valori":[{"componente":"L-Leucina","valore":"1.400 mg"},{"componente":"L-Lisina Cloridrato","valore":"1.000 mg"},{"componente":"L-Valina","valore":"750 mg"},{"componente":"L-Isoleucina","valore":"750 mg"},{"componente":"L-Treonina","valore":"350 mg"},{"componente":"L-Fenilalanina","valore":"300 mg"},{"componente":"L-Metionina","valore":"200 mg"},{"componente":"L-Istidina","valore":"150 mg"},{"componente":"L-Cistina","valore":"150 mg"},{"componente":"L-Triptofano","valore":"100 mg"},{"componente":"vitamina C","valore":"500 mg (625% VNR)"},{"componente":"vitamina E","valore":"60 mg (500% VNR)"},{"componente":"Tiamina (Vitamina B1)","valore":"1,1 mg (100% VNR)"},{"componente":"Piridossina Cloridrato (Vitamina B6)","valore":"1,4 mg (100% VNR)"},{"componente":"Cianocobalamina (Vitamina B12)","valore":"2,5 µg (100% VNR)"}]},"ingredienti":"L-leucina°, L-lisina cloridrato, L-valina°, L-isoleucina°, acido L-ascorbico (vitamina C), L-treonina, L-fenilalanina°, L-metionina°, aroma, L-istidina°, L-cistina, DL-alfa tocoferile acetato (vitamina E), L-triptofano, edulcoranti: sucralosio, glicosidi steviolici da Stevia; piridossina cloridrato (vitamina B6), tiamina (vitamina B1), cianocobalamina (vitamina B12)."}', 'Uso Sportivo: assumere 5,5 g (2 misurini) disciolti in un bicchiere d''acqua dopo l''attività fisica per favorire il recupero muscolare e stimolare la sintesi proteica. Vita Quotidiana: assumere 2,75 g (1 misurino) disciolti in un bicchiere d''acqua, due volte al giorno, per integrare diete povere di aminoacidi essenziali o in caso di perdita di massa muscolare.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Conservare in luogo fresco e asciutto.', 'Ottimo per un supporto completo agli allenamenti intensi, grazie alla combinazione di aminoacidi essenziali e un ricco spettro vitaminico. La forma in polvere ne facilita l''assunzione e l''assorbimento.', false, false, false, '2025-06-26 14:52:33.082292', NULL, NULL, NULL, NULL);
INSERT INTO public.products VALUES (920, 'aminoacidi-plus', 'Aminoacidi+', 1, 2, 'Complesso di aminoacidi essenziali per il supporto della performance sportiva e del recupero muscolare', 'Aminoacidi+ è un integratore alimentare a base di aminoacidi essenziali e vitamina B6. È studiato per supportare il recupero muscolare, la sintesi proteica e la riduzione della fatica, ideale per chi svolge allenamenti intensi o necessita di integrare aminoacidi essenziali a causa di carenze dietetiche o aumentato fabbisogno. La formula è arricchita con una quantità potenziata di L-leucina, cruciale per la sintesi proteica, contribuendo a prevenire il catabolismo muscolare e a mantenere la massa muscolare. La vitamina B6 è inclusa per ottimizzare il metabolismo degli aminoacidi e per supportare il sistema nervoso e la funzione muscolare.', '{
  "valori_nutrizionali": "1 dose = 5 compresse\n\n| Valori medi | Per dose (5 compresse) |\n|-------------|------------------------|\n| Vitamina B6 | 2 mg (143% VNR) |\n| L-leucina | 1.250 mg |\n| L-isoleucina | 625 mg |\n| L-valina | 625 mg |\n| L-lisina cloridrato | 1.000 mg |\n| L-treonina | 350 mg |\n| L-istidina | 150 mg |\n| L-fenilalanina | 150 mg |\n| L-metionina | 50 mg |\n| L-triptofano | 20 mg |\n\nVNR: valore nutritivo di riferimento giornaliero (adulti) ai sensi del Reg. EU n. 1169/2011.",
  "modalita_uso": "Uso Sportivo: Per il recupero muscolare e il supporto alla sintesi proteica durante allenamenti intensi, assumere 5 compresse dopo lo sforzo, oppure 1 compressa ogni 10-12 kg di peso corporeo suddivisa tra pre e post allenamento.\n\nVita Quotidiana: Per compensare carenze proteiche o supportare il mantenimento della massa muscolare, assumere 1 compressa ogni 10–12 kg di peso corporeo, suddivisa durante la giornata.",
  "ingredienti": "Umidificante: sorbitolo; L-leucina, L-lisina cloridrato, L-valina, L-isoleucina, agente di carica: cellulosa; L-treonina, L-istidina, L-fenilalanina, agenti antiagglomeranti: E470b, E551; talco; aroma, L-metionina, edulcoranti: sucralosio, glicosidi steviolici da Stevia; L-triptofano, piridossina cloridrato (vitamina B6).",
  "avvertenze": "Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Conservare in luogo fresco e asciutto.",
  "caratteristiche": "• Presenza potenziata di L-leucina per la sintesi proteica\n• Arricchito con vitamina B6 per il metabolismo degli aminoacidi\n• Formato compressa per facilità di assunzione\n• Prevenzione del catabolismo muscolare\n• Supporto al mantenimento della massa magra"
}', 'Uso Sportivo: per il recupero muscolare e il supporto alla sintesi proteica durante allenamenti intensi, assumere 5 compresse dopo lo sforzo, oppure 1 compressa ogni 10-12 kg di peso corporeo suddivisa tra pre e post allenamento. Vita Quotidiana: per compensare carenze proteiche o supportare il mantenimento della massa muscolare, assumere 1 compressa ogni 10–12 kg di peso corporeo, suddivisa durante la giornata.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Conservare in luogo fresco e asciutto.', 'La presenza potenziata di L-leucina rende questo prodotto particolarmente efficace per il recupero e la prevenzione del catabolismo muscolare, mentre la vitamina B6 ne ottimizza il metabolismo.', false, false, false, '2025-06-26 14:52:33.082292', NULL, NULL, NULL, NULL);
INSERT INTO public.products VALUES (926, 'd-glucosio', 'D-Glucosio', 1, 2, 'D-Glucosio puro per il ripristino delle scorte energetiche muscolari post-allenamento', 'D-Glucosio è un alimento composto esclusivamente da destrosio monoidrato (glucosio) in polvere. Il glucosio è il carboidrato più semplice e immediatamente utilizzabile dall''organismo per produrre energia. Si tratta di un alimento funzionale ideale per favorire il ripristino rapido delle riserve energetiche dopo uno sforzo fisico intenso, soprattutto in attività anaerobiche o di potenza. La sua assunzione nel post-workout stimola la secrezione di insulina, facilitando il trasporto del glucosio e di altri nutrienti (come gli aminoacidi) all''interno delle cellule muscolari, supportando così i processi di recupero e sintesi proteica.', '{
    "valori_nutrizionali": {
      "dose": "1 dose = 60 g",
      "tabella": [
        {"nutriente": "Energia", "quantita": "935 kJ / 220 kcal"},
        {"nutriente": "Grassi", "quantita": "0 g"},
        {"nutriente": "- di cui saturi", "quantita": "0 g"},
        {"nutriente": "Carboidrati", "quantita": "55 g"},
        {"nutriente": "- di cui zuccheri", "quantita": "55 g"},
        {"nutriente": "Proteine", "quantita": "0 g"},
        {"nutriente": "Sale", "quantita": "0 g"}
      ]
    },
    "ingredienti": "D-glucosio monoidrato puro in polvere."
  }', 'Post-allenamento: assumere D-Glucosio dopo sforzi di elevata intensità per contribuire a ripristinare rapidamente le riserve di glicogeno muscolare. Modalità di utilizzo: sciogliere 60 g di prodotto in acqua e assumere subito dopo l''attività sportiva.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Conservare in luogo fresco e asciutto.', 'Il glucosio è un carboidrato semplice essenziale per il recupero post-allenamento, poiché ripristina rapidamente le scorte di glicogeno muscolare e favorisce l''assorbimento di altri nutrienti.', false, false, false, '2025-06-26 14:52:33.082292', NULL, NULL, NULL, NULL);
INSERT INTO public.products VALUES (797, 'hard-b-life-complex', 'Hard B-Life Complex', 6, 7, 'Complesso di vitamine del gruppo B per energia e metabolismo ottimale', 'HARD B-LIFE COMPLEX è un integratore alimentare in capsule di Vitamine del gruppo B (B1, B2, B3, B5, B6, B12). HARD B-LIFE COMPLEX non contiene glutine. Le vitamine B appartengono al gruppo delle idrosolubili non accumulabili dall''organismo e quindi da assumere quotidianamente con l''alimentazione.', '{
    "valori_nutrizionali": {
      "dose": "PER DOSE (1 CAPSULA)",
      "tabella": [
        {"componente": "Vitamina B1", "quantita": "24 mg", "vnr": "2181"},
        {"componente": "Vitamina B2", "quantita": "24 mg", "vnr": "1714"},
        {"componente": "Vitamina B3", "quantita": "32 mg", "vnr": "200"},
        {"componente": "Vitamina B5", "quantita": "18 mg", "vnr": "300"},
        {"componente": "Vitamina B6", "quantita": "8 mg", "vnr": "571"},
        {"componente": "Vitamina B12", "quantita": "30 mcg", "vnr": "1200"}
      ]
    },
    "ingredienti": "Agente di carica: cellulosa microcristallina; Niacina (Vitamina B3), Cloridrato di Tiammina (Vitamina B1), Riboflavina (Vitamina B2), Cloridrato di Piridossina (Vitamina B6), Stabilizzanti: sali di magnesio degli acidi grassi, biossido di silicio; Pantotenato di Calcio (Vitamina B5), Cianocobalammina (Vitamina B12). Ingredienti della Capsula: Gelatina."
  }', 'Assumere 1 capsula al giorno con acqua.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Non contiene glutine. Chiudere accuratamente il barattolo dopo l''uso e mantenere il prodotto in luogo fresco e asciutto.', 'Un complesso vitaminico B ad alto dosaggio è essenziale per il metabolismo energetico, la funzione nervosa e la riduzione della stanchezza. Questo integratore è particolarmente indicato per chi ha aumentato fabbisogno o carenze.', false, false, false, '2025-06-24 15:59:33.777031', NULL, NULL, '60', 'compresse');
INSERT INTO public.products VALUES (800, 'hard-vitamin-complex', 'Hard Vitamin Complex', 6, 7, 'Multivitaminico completo con 11 vitamine e 11 minerali essenziali', 'HARD VITAMIN COMPLEX è un integratore alimentare in compresse di vitamine e minerali con un alto valore nutrizionale di riferimento (VNR). Le Vitamine sono delle sostanze organiche indispensabili per garantire la normale funzione metabolica, la crescita e il benessere dell''individuo. I minerali intervengono in numerosi processi biochimici e fisiologici.', '{
    "valori_nutrizionali": {
      "dose": "PER DOSE (3 COMPRESSE)",
      "tabella": [
        {"componente": "Vitamina A", "quantita": "1,2 mg", "vnr": "150"},
        {"componente": "Vitamina C", "quantita": "120 mg", "vnr": "150"},
        {"componente": "Vitamina E", "quantita": "24 mg", "vnr": "200"},
        {"componente": "Tiammina", "quantita": "3,3 mg", "vnr": "300"},
        {"componente": "Riboflavina", "quantita": "4,2 mg", "vnr": "300"},
        {"componente": "Vitamina B6", "quantita": "4,2 mg", "vnr": "300"},
        {"componente": "Acido pantotenico", "quantita": "9 mg", "vnr": "150"},
        {"componente": "Niacina", "quantita": "24 mg", "vnr": "150"},
        {"componente": "Acido folico", "quantita": "250 mcg", "vnr": "125"},
        {"componente": "Vitamina B12", "quantita": "7,5 mcg", "vnr": "300"},
        {"componente": "Vitamina D", "quantita": "15 mcg", "vnr": "300"},
        {"componente": "Calcio", "quantita": "600 mg", "vnr": "75"},
        {"componente": "Fosforo", "quantita": "525 mg", "vnr": "75"},
        {"componente": "Magnesio", "quantita": "279 mg", "vnr": "74"},
        {"componente": "Ferro", "quantita": "10,5 mg", "vnr": "75"},
        {"componente": "Zinco", "quantita": "7,5 mcg", "vnr": "75"},
        {"componente": "Rame", "quantita": "0,75 mg", "vnr": "75"},
        {"componente": "Manganese", "quantita": "1,5 mg", "vnr": "75"},
        {"componente": "Selenio", "quantita": "39 mcg", "vnr": "71"},
        {"componente": "Cromo", "quantita": "30 mcg", "vnr": "75"},
        {"componente": "Molibdeno", "quantita": "36 mcg", "vnr": "72"},
        {"componente": "Iodio", "quantita": "150 mcg", "vnr": "100"}
      ]
    },
    "ingredienti": "Miscela di sali minerali (sali di calcio dell''acido ortofosforico, ossido di magnesio, sali di potassio dell''acido ortofosforico, fumarato ferroso, ossido di zinco, gluconato di rame, solfato di manganese, picolinato di cromo, ioduro di potassio, selenato di sodio, molibdato di ammonio), acido ascorbico (Vitamina C), acetato di DL alfatocoferolo (Vitamina E), nicotinammide (Niacina), riboflavina (Vitamina B2), cloridrato di Piridossina (Vitamina B6), cloridrato di tiamina (Vitamina B1), D-pantotenato calcio (Acido pantotenico), acetato di retinile (Vitamina A), acido folico, D-biotina (biotina), Colecalciferolo (Vitamina D), Cianocobalamina (Vitamina B12). Addensante: cellulosa microcristallina (E460)."
  }', 'Assumere fino a 3 compresse al giorno suddivise nell''arco della giornata.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Chiudere accuratamente il barattolo dopo l''uso e mantenere il prodotto in luogo fresco e asciutto lontano dalla luce solare e dalle fonti di calore.', 'Questo multivitaminico e multiminerale ad alto dosaggio è ideale per supportare il benessere generale, colmare eventuali carenze nutrizionali e sostenere le funzioni metaboliche e fisiologiche, specialmente in caso di aumentato fabbisogno.', false, false, false, '2025-06-24 15:59:33.777031', NULL, NULL, '90', 'compresse');
INSERT INTO public.products VALUES (1007, 'aminoacidi-essenziali', 'Aminoacidi Essenziali', 25, 2, 'Integratore alimentare a base di Aminoacidi essenziali (E.A.A) in forma libera addizionati di vitamina B6.', 'Integratore alimentare a base di Aminoacidi essenziali (E.A.A) in forma libera addizionati di vitamina B6. Si definiscono essenziali gli aminoacidi che non potendo essere prodotti dall''organismo devono essere necessariamente assunti con l''alimentazione e l''integrazione. Gli E.A.A. risultano fondamentali per il nostro organismo perchè aumentando la quantità di aminoacidi liberi disponibili si favorisce un bilancio azotato positivo.', '{"titolo":"Aminoacidi Essenziali","valori_nutrizionali":{"per_porzione":{"l_leucina":"1450 mg","l_lisina":"1050 mg","l_fenilalanina":"1040 mg","l_treonina":"960 mg","l_istidina":"850 mg","l_isoleucina":"725 mg","l_valina":"725 mg","l_triptofano":"280 mg","l_metionina":"110 mg","inulina":"0.9 g"},"per_100g":{"l_leucina":"14.5 g","l_lisina":"10.5 g","l_fenilalanina":"10.4 g","l_treonina":"9.6 g","l_istidina":"8.5 g","l_isoleucina":"7.25 g","l_valina":"7.25 g","l_triptofano":"2.8 g","l_metionina":"1.1 g","inulina":"9 g"}},"ingredienti":"L-Leucina, L-Lisina, L-Fenilalanina, L-Treonina, Inulina, L-Istidina, L-Isoleucina, L-Valina, Acido citrico, Acido tartarico, Aromi, L-Triptofano, Antiagglomerante: Biossido di Silicio, L-Metionina, Sodio Bicarbonato, Edulcoranti: Acesulfame K, Sucralosio, Colorante: E 155 Bruno HT."}', 'Sciogliere un misurino di prodotto (10 g) in acqua o bevanda preferita', 'Non superare la dose giornaliera consigliata. Tenere fuori dalla portata dei bambini. Consultare il medico prima dell''uso in caso di gravidanza, allattamento o patologie.', NULL, false, false, false, '2025-07-22 16:26:30.167615', NULL, 'Cola Lemon', '300g', '300g');
INSERT INTO public.products VALUES (1011, 'eaa-pro', 'EAA Pro', 25, 2, 'Gli aminoacidi sono molecole organiche composte sia da un gruppo amminico (NH2) che da un gruppo carbossilico (COOH), che, unite fra loro, tramite un legame peptidico vanno a formare la struttura primaria delle proteine.', 'Gli aminoacidi sono molecole organiche composte sia da un gruppo amminico (NH2) che da un gruppo carbossilico (COOH), che, unite fra loro, tramite un legame peptidico vanno a formare la struttura primaria delle proteine. Gli aminoacidi sono più di cento ma solamente venti sono definiti proteinogenici perché concorrono alla formazione delle proteine e quindi sono fondamentali al funzionamento del nostro organismo.', '{
  "valori_nutrizionali": "Porzione/Serving: 14 g (2 misurini)\n\nPer 100g:\nL-Leucina: 23,81 g\nL-Isoleucina: 5,95 g\nL-Valina: 5,95 g\nL-Lisina: 7,142 g\nL-Metionina: 0,53 g\nL-Fenilalanina: 1,785 g\nL-Treonina: 5 g\nL-Istidina: 0,714 g\nL-Triptofano: 0,35 g\nL-Glutammina: 17,85 g\nL-Taurina: 7,142 g\nBromelina: 1,07 g\nPapaina: 0,142 g\nCitrullina malato: 5,71 g\nVit C: 714 mg\nVit B1: 7,85 mg\nVit B6: 11,42 mg\n\nPer 14g:\nL-Leucina: 3334 mg\nL-Isoleucina: 833 mg\nL-Valina: 833 mg\nL-Lisina: 1000 mg\nL-Metionina: 75 mg\nL-Fenilalanina: 250 mg\nL-Treonina: 700 mg\nL-Istidina: 100 mg\nL-Triptofano: 50 mg\nL-Glutammina: 2500 mg\nL-Taurina: 1000 mg\nBromelina: 150 mg\nPapaina: 20 mg\nCitrullina malato: 800 mg\nVit C: 100 mg (125% VNR)\nVit B1: 1,10 mg (100% VNR)\nVit B6: 1,60 mg (114% VNR)",
  "modalita_uso": "Assumere due misurini (7g a misurino) di prodotto al giorno sciolto nell acqua. Per ottimizzare l assorbimento si consiglia di assumere possibilmente al mattino e comunque a stomaco vuoto.",
  "ingredienti": "Mix di aminoacidi a catena ramificata (L-Leucina instant, L-Isoleucina instant, L-valina instant (emulsionante: lecitina di girasole (E322))); L-glutammina; aromi; L-lisina HCl; taurina; maltodestrina; L-citrullina malato; correttore di acidità: acido citrico (E330); L-treonina; L-fenilalanina; bromelina 2500 GDU/g; acido L-ascorbico (vitamina C); L-istidina; edulcorante: sucralosio (E955); L-metionina; agente antiagglomerante: biossido di silicio (E551); L-triptofano; papaina ≥ 2,5 FIP UI/mg (contiene lattosio); piridossina cloridrato (vitamina B6); colorante: E129; tiamina cloridrato (vitamina B1).",
  "avvertenze": "Non eccedere le dosi consigliate. Gli integratori non sostituiscono una dieta variata ed equilibrata. Tenere fuori dalla portata dei bambini. Conservare in luogo fresco e asciutto.",
  "caratteristiche": "• EAA di origine vegetale senza coloranti e senza aspartame\n• Perfettamente bilanciato e solubile in acqua\n• Ottima palatabilità\n• Con enzimi digestivi Bromelina e Papaina\n• Arricchito con vitamine del gruppo B"
}', NULL, NULL, NULL, false, false, false, '2025-07-22 16:45:37.324779', NULL, 'Anguria, Melon', NULL, NULL);
INSERT INTO public.products VALUES (1226, 'glutatione-liposomiale', 'Glutatione Liposomiale', 25, 7, 'Integratore alimentare contenente 250 mg di L-glutatione in forma liposomiale potenziato con coenzima Q10 e vit E.', 'Integratore alimentare contenente 250 mg di L-glutatione in forma liposomiale potenziato con coenzima Q10 e vit E. Il glutatione è naturalmente prodotto dall'' organismo ed è costituito da un tripeptide naturale formato dagli aminoacidi L-Cisteina, Glicina ed Acido glutammico. Grazie allo zolfo e un gruppo tiolico (SH), il glutatione coopera al mantenimento dell''attività antiossidante e interviene nei processi di detossificazione epatica. Il coenzima Q10 e la vitamina E interviengono efficacemente contro lo stress ossidativo cellulare ed il benessere della pelle e dei segni dell''invecchiamento.', '{
    "nutritional_table": {
      "title": "Valori Nutrizionali",
      "serving_size": "1 capsula",
      "servings_per_container": "30",
      "values": [
        {"nutrient": "Glutatione", "amount": "250", "unit": "mg", "daily_value": null},
        {"nutrient": "Coenzima Q10", "amount": "25", "unit": "mg", "daily_value": null},
        {"nutrient": "Vitamina E", "amount": "10", "unit": "mg", "daily_value": "83%"}
      ]
    },
    "ingredients": "Glutatione Ridotto Liposomiale (Glutatione Ridotto, Fosfolipidi, Fosfatidil-Glicerolo, Olio Vegetale), Gelatina animale (Capsula), Agente di carica: Cellulosa microcristallina, Vitamina E Liposomiale (Acetato di DL-Alfa-Tocoferile, Olio vegetale), Coenzima Q10, Antiagglomerante: Biossido di Silicio.",
    "usage": "Assumere una capsula al giorno con un bicchiere d''acqua."
  }', 'Assumere una capsula al giorno con un bicchiere d''acqua', NULL, NULL, false, false, false, '2025-08-04 08:40:16.943354', NULL, 'Unico', NULL, '30 capsule');
INSERT INTO public.products VALUES (1192, 'glutammina-glutpower', 'Glutammina Glutpower', 25, 2, 'Recupero, contrasta catabolismo e stanchezza. Integratore a base di glutammina di origine vegetale.', 'Prodotto dietetico per sportivi disponibile in pratiche compresse da 1000 mg di pura L-Glutamina. La Glutamina è uno degli aminoacidi maggiormente presenti nel corpo umano e soprattutto nel tessuto muscolare dove viene particolarmente utilizzata durante intensi sforzi muscolari oppure in situazioni di stress psicofisico. Per questi motivi è molto utilizzata nella dieta degli sportivi che richiedono recupero muscolare, potenziamento del sistema immunitario e allontanamento del senso di fatica.', '{"titolo":"Glutammina Glutpower","per_porzione":{"descrizione":"Valori nutrizionali per dose giornaliera","porzione":"5 compresse","valori":[{"componente":"Glutammina","valore":"5000 mg"}]},"ingredienti":"L-Glutammina, Agenti di carica: Cellulosa microcristallina e Calcio Fosfato, Antiagglomerante: Magnesio Stearato."}', 'Assumere 5 compresse al giorno con un bicchiere d''acqua.', NULL, NULL, false, false, false, '2025-08-04 08:15:17.643588', NULL, 'Unico', NULL, '250 capsule');
INSERT INTO public.products VALUES (929, 'hard-beta-alanine', 'Hard Beta Alanine', 6, 2, 'Beta-alanina micronizzata per aumentare la resistenza muscolare e ridurre la fatica durante allenamenti intensi', 'HARD BETA ALANINE è un integratore alimentare in compresse di Beta Alanina con vitamina B6. La Beta Alanina è un precursore della Carnosina. HARD BETA ALANINE non contiene glutine. La Beta-Alanina svolge un ruolo ergogenico, in ambito sportivo, da ricondurre in parte alla sua attività antiossidante e in parte alla funzione di precursore della Carnosina, un dipeptide presente in elevate concentrazioni all''interno del muscolo scheletrico umano, in grado di tamponare l''acido lattico durante l''esercizio fisico intenso. Questo meccanismo può ritardare l''insorgenza della fatica muscolare e migliorare le prestazioni negli esercizi ad alta intensità.', '{
    "valori_nutrizionali": {
      "dose": "3 compresse",
      "tabella": [
        {"componente": "Beta-Alanina", "quantita": "3 g", "vnr": "-"},
        {"componente": "Vitamina B6", "quantita": "1,8 mg", "vnr": "130%"}
      ]
    },
    "ingredienti": "Beta Alanina, Agente di carica: cellulosa microcristallina; Stabilizzanti: biossido di silicio, sali di magnesio degli acidi grassi, Polivinilpirrolidone; Vitamina B6 (cloridrato di piridossina)."
  }', 'Assumere fino a 3 compresse al giorno con acqua.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Conservare in luogo fresco e asciutto.', 'La Beta-Alanina è un ottimo integratore per gli sportivi che cercano di migliorare la resistenza e ridurre l''affaticamento muscolare, grazie alla sua capacità di tamponare l''acido lattico.', false, false, false, '2025-06-26 14:52:33.082292', NULL, NULL, NULL, NULL);
INSERT INTO public.products VALUES (1161, 'ram-1000-bcaa', 'RAM 1000 BCAA', 23, 2, 'RAM 1000 è un integratore alimentare di aminoacidi a catena ramificata ottenuti mediante fermentazione, con vitamine B1 e B6.', 'RAM 1000 è un integratore alimentare di aminoacidi a catena ramificata ottenuti mediante fermentazione, con vitamine B1 e B6. I BCAA sono aminoacidi essenziali, l''organismo infatti non è in grado di sintetizzarli e devono pertanto essere assunti attraverso la dieta. RAM 1000 è realizzato in compresse da 1000 mg nel classico rapporto 2:1:1. Gli aminoacidi a catena ramificata sono un fondamentale supporto muscolare per gli sportivi. Se assunti prima degli allenamenti hanno funzioni principalmente energetiche ed anticataboliche. Se assunti dopo gli allenamenti favoriscono la costruzione e il ripristino della massa magra. La vitamina B1 supporta il normale metabolismo energetico e la vitamina B6 contribuisce a ridurre stanchezza, affaticamento ed al sostegno del normale metabolismo delle proteine e del glicogeno. Non contiene ingredienti di origine animale ed è adatto anche ai vegani.

Modalità d''uso: Deglutire 5 compresse al giorno con acqua o altro liquido a scelta 30-40 minuti prima degli allenamenti o competizioni. Nelle giornate in cui non si pratica attività sportiva il prodotto può essere assunto in qualsiasi momento della giornata.

Ingredienti: L-Leucina; L-Isoleucina; L-Valina; Stabilizzante: cellulosa microcristallina; Antiagglomeranti: biossido di silicio, sali di magnesio degli acidi grassi (origine vegetale); Piridossina cloridrato (vit. B6); Tiamina cloridrato (vit. B1).', '{"titolo":"RAM 1000 BCAA","per_porzione":{"descrizione":"Informazioni nutrizionali per porzione","porzione":"1 PORZIONE = 5 COMPRESSE","valori":[{"componente":"Aminoacidi a catena ramificata","valore":"5.000 mg"},{"sottocomponente":"di cui: L-Leucina","valore":"2.500 mg"},{"sottocomponente":"L-Valina","valore":"1.250 mg"},{"sottocomponente":"L-Isoleucina","valore":"1.250 mg"},{"componente":"Vit. B1","valore":"0,33 mg (30% VNR)"},{"componente":"Vit. B6","valore":"0,6 mg (43% VNR)"}]},"ingredienti":"L-Leucina; L-Isoleucina; L-Valina; Stabilizzante: cellulosa microcristallina; Antiagglomeranti: biossido di silicio, sali di magnesio degli acidi grassi (origine vegetale); Piridossina cloridrato (vit. B6); Tiamina cloridrato (vit. B1)."}', 'Deglutire 5 compresse al giorno con acqua 30-40 minuti prima degli allenamenti.', 'Ingredienti: L-Leucina; L-Isoleucina; L-Valina; Stabilizzante: cellulosa microcristallina; Antiagglomeranti; Piridossina cloridrato (vit. B6); Tiamina cloridrato (vit. B1).', NULL, false, false, false, '2025-08-04 07:32:56.089628', 22, 'Unico', '100 compresse', '100 compresse');
INSERT INTO public.products VALUES (1281, 'i-m-collagen', 'I''M Collagen', 25, 7, 'Integratore alimentare a base di collagene idrolizzato SOLUGEL ®Performa BP ad alto peso molecolare,di provenienza sostenibile,da bovini allevati all''aperto e nutriti con erba ( certificato da LIAF CONTROL).', 'I''M Collagen è un integratore innovativo che combina collagene marino idrolizzato di alta qualità con acido ialuronico e vitamina C. Il collagene marino è ottenuto da pesci selezionati attraverso un processo di idrolisi enzimatica che garantisce un''elevata biodisponibilità. L''acido ialuronico supporta l''idratazione dei tessuti, mentre la vitamina C contribuisce alla normale formazione del collagene per la normale funzione della pelle, delle cartilagini e delle ossa.', '{"titolo":"I''M COllagen","per_porzione":{"descrizione":"Valori nutrizionali per porzione","porzione":"13 g","valori":[{"componente":"Energia","valore":"43,9 Kcal / 183 Kj"},{"componente":"Proteine","valore":"9,1 g"},{"componente":"Collagene Bovino","valore":"10 g"},{"componente":"Magnesio","valore":"180 mg (48% VNR)"},{"componente":"Vitamina C","valore":"160 mg (200% VNR)"}]},"ingrediente":"Collagene marino idrolizzato (pesce), Acido ialuronico, Vitamina C (acido L-ascorbico), Aroma naturale, Edulcorante: stevia."}', 'Sciogliere il contenuto di una bustina in 200ml di acqua e assumere una volta al giorno preferibilmente a stomaco vuoto.', 'Non superare la dose giornaliera consigliata. Tenere fuori dalla portata dei bambini al di sotto dei 3 anni.', NULL, false, false, false, '2025-08-05 15:53:44.9642', NULL, 'Fior di latte', '325g', NULL);
INSERT INTO public.products VALUES (941, 'glutammina-pure', 'Glutammina Pure', 11, 2, 'Glutammina pura in polvere per il supporto del recupero muscolare e del sistema immunitario degli atleti', 'Glutammina Pure è un integratore di glutammina (Kyowa Quality®), una forma pura e altamente biodisponibile di glutammina. Questo aminoacido è predominante nel tessuto muscolare (circa il 50%) ed è coinvolto in una serie di importanti processi metabolici. La glutammina sembra essere coinvolta in diversi processi metabolici dell''organismo, svolgendo diverse funzioni benefiche. Queste includono un''azione anticatabolica per preservare la massa muscolare, un supporto energetico per le cellule del sistema immunitario, un ruolo nella sintesi proteica e nel recupero muscolare, e un sostegno alla funzione intestinale e alla salute dell''apparato digerente.', '{
    "valori_nutrizionali": {
      "tabella": [
        {"componente": "L-glutammina (Kyowa Quality®)", "per_porzione": "5 g", "vnr": ""}
      ]
    },
    "ingredienti": "L-glutammina (Kyowa Quality®). SENZA GLUTINE."
  }', 'Le modalità d''uso specifiche non sono state fornite nel testo.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Conservare in luogo fresco e asciutto.', 'La glutammina Kyowa Quality® garantisce la massima purezza e biodisponibilità, rendendo questo prodotto eccellente per il supporto al recupero muscolare, la funzione immunitaria e la protezione dallo stress ossidativo.', false, false, false, '2025-06-26 15:27:27.964759', NULL, NULL, NULL, NULL);
INSERT INTO public.products VALUES (942, 'bcaa-supreme-4-1-1', 'BCAA Supreme 4:1:1', 11, 2, 'Formula avanzata di aminoacidi ramificati BCAA Supreme nel rapporto 4:1:1 per massimizzare la sintesi proteica', 'BCAA Supreme 4:1:1 + B6 + B12 è un integratore alimentare che combina aminoacidi a catena ramificata (BCAA) in rapporto 4:1:1 (L-leucina, L-isoleucina, L-valina) con vitamine B6 e B12. I BCAA sono essenziali per gli atleti, dato che il corpo non può produrli e agiscono direttamente sulla muscolatura. Le vitamine B6 e B12 sono note per il loro ruolo nel metabolismo energetico, nella sintesi proteica e nella gestione dell''affaticamento, rendendo questo integratore un supporto completo per l''energia e il recupero.', '{"titolo":"BCAA Supreme 4:1:1","per_porzione":{"descrizione":"Valori nutrizionali per porzione","valori":[{"componente":"L-leucina","valore":"3340 mg"},{"componente":"L-isoleucina","valore":"834 mg"},{"componente":"L-valina","valore":"834 mg"},{"componente":"Vitamina B12","valore":"2,5 µg (100% VNR)"},{"componente":"Vitamina B6","valore":"1,4 mg (100% VNR)"}]},"ingredienti":"L-leucina; L-isoleucina; L-valina; agente di carica: cellulosa microcristallina, gel di cellulosa; agente antiagglomerante: idrossi-propil-cellulosa; vitamina B12 (cianocobalamina); vitamina B6 (cloridrato di piridossina). SENZA GLUTINE."}', 'Si suggerisce di assumere 1-2 porzioni al giorno, a seconda dell''intensità dell''allenamento e del fabbisogno individuale. Ottimo da assumere prima o dopo l''attività fisica per sostenere la performance e il recupero muscolare.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Conservare in luogo fresco e asciutto.', 'Il rapporto 4:1:1 di BCAA, con una maggiore concentrazione di leucina, è ideale per massimizzare la sintesi proteica e favorire la crescita muscolare, supportato dalle vitamine B per l''energia e il metabolismo.', false, false, false, '2025-06-26 15:27:27.964759', NULL, NULL, NULL, NULL);
INSERT INTO public.products VALUES (773, 'magnesio-potassio-sport', 'Magnesio Potassio Sport', 11, 7, 'Integratore di magnesio e potassio per il supporto muscolare e idro-salino. Formula specifica per sportivi.', 'Why Sport Magnesio Potassio Sport 300 gr è un Integratore Energetico con Carboidrati e Sali Minerali utile per reintegrare le perdite idrosaline dovute a intensa Sudorazione.', '{"titolo":"Magnesio Potassio Sport","per_porzione":{"descrizione":"Valori nutrizionali per porzione","valori":[{"componente":"Energia","valore":"284 kJ / 67 Kcal"},{"componente":"Carboidrati","valore":"17 g"}]},"ingredienti":"Destrosio (50%); maltodestrine DE 19 (32,2%); acidificante: acido citrico; cloruro di sodio; citrato di potassio; aroma naturale; bicarbonato di potassio; ossido di magnesio; sali di magnesio dell''acido citrico; agente antiagglomerante: biossido di silicio; edulcorante: sucralosio."}', 'Sciogliere 20 g di prodotto (pari ad un misurino) in 500 ml di acqua (una borraccia). È consigliabile bere a piccoli sorsi ad intervalli di 15-20 minuti. Per rendere la soluzione isotonica basta sciogliere 30 gr di polvere in 500 ml di acqua.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Conservare in luogo fresco e asciutto.', 'Ideale per gli sportivi e per chiunque sia soggetto a intensa sudorazione, questo integratore reintegra efficacemente sali minerali e carboidrati, supportando l''idratazione e il mantenimento dell''energia durante l''attività fisica.', false, false, false, '2025-06-24 15:32:23.789133', NULL, 'Agrumi', '300g', '990');
INSERT INTO public.products VALUES (745, 'calcio-citrato-d3-jamieson', 'Calcio Citrato + D3', 10, 7, 'Calcio Citrato con Vitamina D3 per ossa e denti forti, forma altamente biodisponibile', 'Integratore alimentare di calcio citrato e vitamina D3. Nell''organismo umano il magnesio è presente per circa il 60% nelle ossa. In sinergia con calcio e vitamina D, controlla i processi di mineralizzazione e sviluppo dell''apparato scheletrico. Calcio e magnesio, a dosi adeguate e bilanciate, agiscono sinergicamente per mantenere una fisiologica funzionalità dell''apparato cardiovascolare, muscolare e del sistema nervoso.', '{
    "valori_nutrizionali": {
      "dose": "Per porzione",
      "tabella": [
        {"componente": "Calcio", "quantita": "500 mg", "vnr": "62,5"},
        {"componente": "Vitamina D3 (colecalciferolo)", "quantita": "2,5 mcg/100 UI mg", "vnr": "50"}
      ]
    },
    "ingredienti": "Citrato di calcio; agenti di carica: cellulosa microcristallina, carbossimetilcellulosa sodica reticolata; agenti antiagglomeranti: ossido di magnesio, magnesio stearato vegetale, talco; vitamina D3 (colecalciferolo). Rivestimento compressa: idrossi-propil-metilcellulosa, talco, cera di carnauba."
  }', 'Assumere da 2 compresse al giorno, preferibilmente durante i pasti principali. Assumere qualche ora prima o dopo l''assunzione di medicinali.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Conservare in luogo fresco e asciutto.', 'Questa combinazione di calcio citrato e vitamina D3 assicura un''ottima biodisponibilità, fondamentale per la salute ossea e per supportare le funzioni muscolari e nervose, specialmente in caso di carenze o aumentato fabbisogno.', false, false, false, '2025-06-22 21:51:52.513941', NULL, NULL, NULL, '120 compresse');
INSERT INTO public.products VALUES (999, 'physiostrap-ski', 'PhysioStrap Ski', 18, 6, 'Supporto professionale per ginocchio specifico per sport invernali e sci', 'Ginocchiera Epitact Sport Physiostrap® Ski Taglia M. Un concentrato di tecnologia (meno di 70g) ideato per sport da tavola (sci, snowboard...). Il suo doppio anello di supporto in silicone brevettato EPITHELIUMFLEX®, insieme al tessuto di compressione ad alte prestazioni REFLEX, ottimizza il mantenimento della rotula e la stabilità del ginocchio. Adatto per ginocchio destro o sinistro, non scivola e non provoca fastidio. Extra fine, può essere indossato sotto l''equipaggiamento senza ingombro.', '{}', 'L''indossare il PHYSIOstrap® Ski EPITHELIUMFLEX® 03 aiuta a stabilizzare l''articolazione del ginocchio durante i movimenti di flessione-estensione ripetuti nella pratica degli sport da tavola. Aiuta anche ad alleviare le patologie rotulee (sindrome rotulea, instabilità rotulea, tendinopatia rotulea...) o i dolori generati dai postumi di traumi precedenti (distorsione, lesione ai legamenti, al menisco...).', 'Non utilizzare in caso di arterite, grave stato di varicosi, sequele di flebite o di edema (linfatico/venoso) della gamba e/o della coscia per non ostacolare la circolazione. Non utilizzare insieme a calze contenitive. Non utilizzare su una lesione cutanea.', 'Tutore ginocchio tecnologicamente avanzato con silicone brevettato EPITHELIUMFLEX® e tessuto REFLEX ad alte prestazioni. Progettato specificamente per sport da tavola (sci, snowboard), pesa meno di 70g e può essere indossato sotto l''equipaggiamento per protezione discreta ed efficace.', false, false, false, '2025-06-27 16:20:51.076554', NULL, 'Neutro', 'Varie taglie', 'Tutore singolo');
INSERT INTO public.products VALUES (959, 'liquid-carbo-plus', 'Liquid Carbo+', 1, 3, 'Bevanda energetica liquida a base di maltodestrine e fruttosio, gusto arancia per il supporto energetico immediato.', 'Formula avanzata pronta all''uso con carboidrati a rilascio rapido e graduale. Ideale per il supporto energetico durante performance sportive prolungate e di alta intensità.', '{"titolo":"Liquid Carbo Plus","quantita":"450 ml","valori_nutrizionali":{"per_dose":{"porzione":"1 dose = 100 ml","valore_energetico":"913 kJ / 215 kcal","grassi":"0 g","di_cui_acidi_grassi_saturi":"0 g","carboidrati":"54 g","di_cui_zuccheri":"33 g","fibre":"0 g","proteine":"0 g","sale":"0 g","caffeina":"32 mg"}},"ingredienti":"acqua, maltodestrine 20,7%, fruttosio 16,5%, destrosio 16,5%, acidificante: acido citrico; aroma, caffeina, conservante: sorbato di potassio."}', 'Consumare 100-120 ml in base alle esigenze dell’atleta.', '🟨 **AVVERTENZE**: Non eccedere 400mg di caffeina al giorno. Conservare in luogo fresco.', NULL, false, false, false, '2025-06-27 15:06:38.822169', NULL, 'Arancia', '450', 'ml');
INSERT INTO public.products VALUES (1003, 'borraccia-sport-500ml', 'Borraccia Sport 500ml', 11, 6, 'Borraccia sportiva compatta 500ml per idratazione ottimale durante allenamenti', 'Borraccia WHYsport con pratico tappo push-pull in morbida gomma per una chiusura ermetica. Caratterizzata da ampia apertura per facile riempimento e pulizia, superficie antiscivolo e forma ergonomica per una presa comoda. Include misurazione graduata in ml per un dosaggio preciso. Robusta e durevole, ideale per sport e fitness.', '{"caratteristiche_tecniche": {"altezza": "28 cm", "capacita": "1000 ml", "diametro": "7,4 cm", "materiale": "tappo PP5 - corpo PE"}}', 'BPA free. Si consiglia il lavaggio a mano.', 'Lavare accuratamente prima del primo utilizzo. Non adatta al lavaggio in lavastoviglie. Conservare in luogo fresco e asciutto.', 'Una borraccia sportiva professionale con tappo push-pull ergonomico e misurazione graduata per un dosaggio preciso. La superficie antiscivolo e la forma ergonomica garantiscono una presa sicura durante l''attività fisica più intensa.', false, false, false, '2025-06-27 16:20:51.076554', NULL, 'Rosso', '500ml', '1 borraccia');
INSERT INTO public.products VALUES (1001, 'borsone-why-sport', 'Borsone WHY Sport', 11, 6, 'Borsone sportivo professionale con design tecnico e compartimenti specializzati', 'Il Borsone WHYsport è un''opzione versatile e di alta qualità per la palestra, con un design unico e innovativo. Offre un ampio scomparto principale, due grandi tasche laterali (una per le scarpe), e può essere indossato comodamente come uno zaino grazie alla maniglia rinforzata. Include anche una tasca frontale con zip e una tasca superiore in rete per piccoli oggetti. Ideale per uno stile di vita attivo, si distingue per funzionalità e praticità.', '{"caratteristiche_tecniche": {"misure": "55x30x30 cm", "materiale": "poliestere"}}', 'Pulire con un panno umido e sapone neutro. Lasciare asciugare all''aria. Non lavare in lavatrice, non candeggiare, non stirare.', 'Non lavare in lavatrice. Non candeggiare. Non stirare. Lasciare sempre asciugare completamente all''aria. Conservare in luogo asciutto quando non utilizzato.', 'Un borsone multifunzionale che si trasforma in zaino per massima versatilità. Con scomparto dedicato per le scarpe, tasca in rete e design ergonomico, è l''accessorio perfetto per chi ha uno stile di vita attivo e dinamico.', false, false, false, '2025-06-27 16:20:51.076554', NULL, 'Nero/Rosso', 'Standard', '1 borsone');
INSERT INTO public.products VALUES (1002, 'sport-shaker-why-sport', 'Sport Shaker WHY Sport', 11, 6, 'Shaker professionale 600ml con sistema di miscelazione avanzato per atleti', 'Shaker WHYsport dotato di un filtro integrato rimovibile, tappo a vite con chiusura a pressione e misurazioni graduali in ml e oz. È robusto, durevole, facile da pulire e perfetto per miscelare frullati proteici senza grumi. Con questo shaker, preparare e trasportare i tuoi frullati preferiti sarà comodo e sicuro.', '{"caratteristiche_tecniche": {"altezza": "22 cm", "capacita": "600 ml", "diametro": "9,5 cm", "materiale": "PP5"}}', 'BPA&DEHP free. Si consiglia il lavaggio a mano.', 'Lavare accuratamente prima del primo utilizzo. Si consiglia il lavaggio a mano per preservare l''integrità del prodotto. Verificare sempre la chiusura del tappo. Conservare in luogo fresco e asciutto.', 'Shaker professionale con filtro integrato rimovibile per miscelare perfettamente proteine e integratori senza grumi. Le misurazioni graduate in ml e oz garantiscono dosaggi precisi, mentre i materiali BPA&DEHP free assicurano sicurezza e durata.', false, false, false, '2025-06-27 16:20:51.076554', NULL, 'Rosso', '600ml', '1 shaker');
INSERT INTO public.products VALUES (1005, 'top-donna-why-sport', 'Top Donna WHY Sport', 11, 6, 'Top sportivo da donna con supporto integrato e design tecnico professionale', 'Il Top Donna WHY Sport è il capo ideale per chi cerca comfort e supporto durante l''allenamento. Realizzato con materiali morbidi e una vestibilità che garantisce libertà di movimento, è perfetto per sessioni di fitness, yoga o attività quotidiane, offrendo traspirabilità e stile.', '{}', 'Lavare in lavatrice a 30°C con colori simili. Non candeggiare. Asciugare in asciugatrice a bassa temperatura o stendere all''aria. Non stirare. Non lavare a secco.', 'Lavare sempre con colori simili. Non superare i 30°C in lavatrice. Non candeggiare. Non stirare. Non lavare a secco.', 'Top sportivo femminile che combina comfort e supporto ottimale per ogni tipo di allenamento. I materiali morbidi e traspiranti garantiscono una vestibilità perfetta e libertà di movimento, ideale per fitness, yoga e attività quotidiane.', false, false, false, '2025-06-27 16:32:15.406194', NULL, 'Nero', 'Varie taglie', '1 top');
INSERT INTO public.products VALUES (766, 'vital-energy', 'Vital Energy', 6, 7, 'Complesso multivitaminico per energia e vitalità quotidiana. Formula completa con vitamine, minerali e estratti vegetali.', 'Integratore alimentare in compresse a base di citrullina ed estratti vegetali titolati quali: ginseng, ginkgo biloba, maca, muira puama e damiana. Gli estratti di maca, damiana, muira puama contrastano la fatica fisica e mentale, il ginkgo biloba agisce sulla memoria e le funzioni cognitive. La L-citrullina favorisce la sintesi di ossido nitrico.', '{
    "valori_nutrizionali": {
      "dose": "Per 2 compresse",
      "tabella": [
        {"componente": "Valore energetico", "quantita": "0 kcal / 0 kJ"},
        {"componente": "L-citrullina", "quantita": "1000 mg"},
        {"componente": "Maca", "quantita": "200 mg"},
        {"componente": "Muira puama", "quantita": "200 mg"},
        {"componente": "Damiana", "quantita": "200 mg"},
        {"componente": "Ginkgo biloba", "quantita": "100 mg"},
        {"componente": "Ginseng", "quantita": "20 mg"}
      ]
    },
    "ingredienti": "L-citrullina, maca (lepidium meyenii walp e.s. radice 4:1), muira puama (phycopetalum olacoides benth e.s. corteccia 4:1), damiana (turnera diffusa wild e.s. foglie 4:1), ginkgo biloba (ginkgo biloba L. foglie e.s. 3% ginsenosidi), ginseng (panax ginseng c.a.mey. radici e.s. 10 % ginsenosidi), agente di carica: cellulosa microcristallina, calcio difosfato; agente antiagglomerante: magnesio stearato."
  }', 'Assumere 2 compresse al giorno con acqua.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Conservare in luogo fresco e asciutto.', 'Una formula sinergica che combina L-citrullina per la vasodilatazione con estratti vegetali adattogeni tradizionali. La maca, damiana e muira puama contrastano la fatica fisica e mentale, mentre il ginkgo biloba supporta memoria e funzioni cognitive. Il ginseng completa la formula per un supporto energetico naturale.', false, false, false, '2025-06-24 15:32:22.800695', NULL, 'Naturale', '60 compresse', '2990');
INSERT INTO public.products VALUES (749, 'spirulina-jamieson', 'Spirulina', 10, 7, 'Spirulina pura al 100% per energia e vitalità naturale, ricostituente ricco di proteine', 'Integratore alimentare a base di spirulina, fonte di sali minerali, oligoelementi, zuccheri, enzimi, acidi grassi mono e polinsaturi e vitamine.', '{
    "valori_nutrizionali": {
      "dose": "Per porzione",
      "tabella": [
        {"componente": "Spirulina (Spirulina platensis (Gomont) Geitler)", "quantita": "1000 mg"}
      ]
    },
    "ingredienti": "Alga spirulina (Spirulina platensis (Gomont) Geitler) tallo; agenti di carica: cellulosa microcristallina, calcio difosfato; agente antiagglomerante: magnesio stearato vegetale. Capsula: idrossipropilmetilcellulosa. SENZA GLUTINE."
  }', 'Si consiglia di assumere 2 capsule una volta al giorno con un bicchiere d''acqua, preferibilmente durante i pasti principali.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Senza glutine. Conservare in luogo fresco e asciutto.', 'La spirulina è una microalga blu-verde ricca di nutrienti essenziali, tra cui proteine complete, vitamine del gruppo B, ferro, beta-carotene e clorofilla. È considerata un superfood per la sua eccezionale densità nutrizionale e le sue proprietà energizzanti e ricostituenti.', false, false, false, '2025-06-22 21:51:53.225432', NULL, NULL, NULL, '90 capsule');
INSERT INTO public.products VALUES (746, 'licopene-jamieson', 'Licopene', 10, 7, 'Licopene da pomodoro per la salute della prostata e la protezione cardiovascolare', 'Il Licopene è un carotenoide ricavato dai pomodori, indicato nei disturbi alla prostata per le sue potenti proprietà antiossidanti. Il pomodoro utilizzato in questo prodotto Jamieson non è OGM.', '{"titolo":"Licopene","per_porzione":{"descrizione":"Valori nutrizionali per 1 compressa","valori":[{"componente":"Licopene","valore":"10 mg"}]},"ingredienti":"Eccipienti: cellulosa microcristallina; calcio fosfato; gomma di cellulosa modificata; acido stearico; magnesio stearato; rivestimento: idrossipropilmetilcellulosa."}', 'Assumere 1 compressa al giorno durante il pasto principale.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Conservare in luogo fresco e asciutto.', 'Il Licopene è un antiossidante mirato, particolarmente benefico per la salute della prostata e per la protezione cellulare dai radicali liberi. L''origine non OGM garantisce la purezza del prodotto.', false, false, false, '2025-06-22 21:51:52.700375', NULL, NULL, NULL, '60 compresse');
INSERT INTO public.products VALUES (641, 'xxx-hydrolysed-protein-90', 'XXX Hydrolysed Protein 90', 1, 1, 'Proteine del siero idrolizzate con enzimi DH8, arricchite con vitamine per un assorbimento ultra-rapido', 'Il vantaggio dell''utilizzo delle proteine idrolizzate è di essere molto simili ad una miscela di aminoacidi singoli, con tuttavia un sapore più gradevole rispetto ai singoli aminoacidi generalmente piuttosto amari. Quindi, le proteine idrolizzate presentano un alto assorbimento e digeribilità, associati ad un considerevole aumento di aminoacidi liberi nel sangue in meno di mezz''ora dall''assunzione. Questo permette di offrire all''organismo, in tempo brevissimo, gli aminoacidi necessari a sostenere un anabolismo proteico spinto. Questo "anabolismo" permette di ottimizzare l''utilizzo delle proteine endogene e ridurre la proteolisi.', '{"nome_prodotto":"XXX Hydrolysed Protein 90","valori_nutrizionali":{"per_porzione":{"descrizione":"Informazioni nutrizionali per dose:","porzione":"25 g","valori":[{"componente":"Valore energetico","valore":"400 kJ / 94 kcal"},{"componente":"Grassi","valore":"0,6 g"},{"componente":"di cui saturi","valore":"0,4 g"},{"componente":"Carboidrati","valore":"0,5 g"},{"componente":"di cui zuccheri","valore":"0,5 g"},{"componente":"Proteine","valore":"21 g"},{"componente":"Sale","valore":"0,1 g"},{"componente":"Vitamina C","valore":"14 mg (18% VNR)"},{"componente":"Vitamina E","valore":"2,4 mg (20% VNR)"},{"componente":"Tiamina (Vit. B1)","valore":"0,34 mg (31% VNR)"},{"componente":"Riboflavina (Vit. B2)","valore":"0,39 mg (28% VNR)"},{"componente":"Vitamina B6","valore":"0,5 mg (34% VNR)"}]}},"ingredienti":"Proteine del siero del latte idrolizzate, cacao in polvere, aromi, addensante: carbossimetilcellulosa sodica; edulcoranti: sucralosio, acesulfame K; miscela vitaminica (acido L-ascorbico, DL-alfa tocoferolo acetato, tiamina HCl, riboflavina, piridossina HCl)."}', 'Sport: 25 grammi da sciogliere in circa 100 ml di acqua. Per l''altissima digeribilità, l''assunzione può avvenire prima, durante o dopo lo sforzo per garantire aumento o mantenimento della massa magra. Vita quotidiana: utile per diete povere di alimenti proteici o per ridurre carboidrati e grassi durante diete ipocaloriche. Dose in relazione all''effettivo fabbisogno proteico.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Conservare in luogo fresco e asciutto.', 'Grazie alla loro predigestione, queste proteine sono ideali per un assorbimento rapidissimo, perfette per il post-allenamento immediato o per un apporto aminoacidico veloce.', false, false, false, '2025-06-12 21:14:51.177875', NULL, NULL, NULL, NULL);
INSERT INTO public.products VALUES (747, 'vita-vim-multivitaminico-jamieson', 'Vita-Vim Multivitaminico', 10, 7, 'Formula multivitaminica completa per uomo e donna con 23 vitamine e minerali essenziali', 'Integratore completo che unisce vitamine e minerali essenziali per supportare il benessere generale dell''organismo. Le vitamine e i minerali presenti supportano il sistema immunitario, favoriscono il benessere delle ossa e dei muscoli, e promuovono un metabolismo energetico ottimale. Utile in caso di dieta sbilanciata, stress, stanchezza o aumento del fabbisogno nutrizionale.', '{"titolo":"Vita-Vim Multivitaminico","per_porzione":{"descrizione":"Valori nutrizionali per porzione","porzione":"1 compressa","valori":[{"componente":"Vitamine e Minerali","valore":"Include vitamine (C, B3, E, B5, B2, B6, B1, A, K1, Biotina, D3, B12) e minerali (Calcio, Fosforo, Magnesio, Ferro, Zinco, Rame, Iodio, Selenio, Cromo)."}]},"ingredienti":"Agenti di carica: calcio difosfato, cellulosa microcristallina, ossido di magnesio; vitamina C (acido L-ascorbico); cloruro di potassio; fumarato ferroso; citrato di zinco; agenti antiagglomeranti: carbossimetilcellulosa sodica reticolata, acido stearico vegetale; niacina (nicotinamide); biotina (D-biotina); gluconato di rame; selenio chelato con aminoacidi; vitamina E (acetato di D-alfa-tocoferile); agente antiagglomerante: magnesio stearato vegetale; vitamina A (acetato di retinile), vitamina B6 (cloridrato di piridossina), vitamina B1 (tiamina mononitrato), vitamina B2 (riboflavina), vitamina K (fillochinone), gluconato di manganese, vitamina D3 (colecalciferolo), cromo picolinato, molibdato di sodio, acido folico (acido pteroil-monoglutammico), vitamina B12 (cianocobalamina)."}', 'Assumere 1 compressa al giorno con un bicchiere d''acqua, preferibilmente durante un pasto principale.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Conservare in luogo fresco e asciutto.', 'Un multivitaminico completo che fornisce 23 vitamine e minerali essenziali in dosaggi bilanciati per supportare energia, sistema immunitario e benessere generale. Ideale per colmare le carenze nutrizionali della dieta moderna e supportare le esigenze dell''organismo in situazioni di stress o aumentato fabbisogno.', false, false, false, '2025-06-22 21:51:52.876765', NULL, NULL, NULL, '90 compresse');
INSERT INTO public.products VALUES (1215, 'creatina-tabs-monoidrata', 'Creatina Tabs Monoidrata', 25, 2, 'Creatina monoidrato in compresse da 1g', 'Integratore alimentare a base di creatina monoidrato in compresse, per aumentare le prestazioni fisiche in caso di attività ripetitive di elevata intensità e di breve durata. L''effetto benefico si ottiene con l''assunzione giornaliera di 3 g di creatina. Le compresse offrono un formato pratico e conveniente per l''assunzione della creatina senza la necessità di mescolare polveri. Ideale per gli sportivi che praticano discipline che richiedono sforzi brevi e intensi.', '{"ingredients": "Creatina monoidrato, Cellulosa microcristallina, Stabilizzante: idrossipropilmetilcellulosa, Agenti antiagglomeranti: biossido di silicio, sali di magnesio degli acidi grassi (origine vegetale).", "nutritional_values": "per porzione (3 compresse)\\nCreatina monoidrato 3000 mg"}', 'Si consiglia di assumere 3 compresse al giorno da deglutire con acqua.', NULL, NULL, false, false, false, '2025-08-04 08:22:28.53277', 42, 'Unico', NULL, '200g');
INSERT INTO public.products VALUES (754, 'vitamina-c-masticabile-jamieson', 'Vitamina C Masticabile', 10, 7, 'Vitamina C masticabile da 1000mg con gusto frutti misti per sistema immunitario', 'La vitamina C, o acido ascorbico, è una vitamina idrosolubile che svolge diverse funzioni importanti per l''organismo. È un forte antiossidante, protegge le cellule dai radicali liberi, contribuisce alla normale funzione del sistema immunitario e alla riduzione di stanchezza e affaticamento. Ha un ruolo nella normale formazione del collagene e contribuisce al normale metabolismo energetico e al funzionamento del sistema nervoso.', '{
    "valori_nutrizionali": {
      "dose": "Per 2 compresse",
      "tabella": [
        {"componente": "Vitamina C", "quantita": "1.000 mg", "vnr": "1.250%"}
      ]
    },
    "ingredienti": "Destrosio; vitamina C (acido L-ascorbico, L-ascorbato di sodio); aroma naturale di arancia; agente di carica: cellulosa microcristallina; agenti antiagglomeranti: acido stearico vegetale, biossido di silicio, magnesio stearato vegetale; edulcorante: sucralosio."
  }', 'Masticare 2 compresse al giorno, preferibilmente durante i pasti principali. Bambini (4-13 anni): 1 compressa masticabile al giorno. Adolescenti (14-18 anni): 1-2 compresse masticabili al giorno. Adulti: 2 compresse masticabili al giorno.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Conservare in luogo fresco e asciutto.', 'Vitamina C in compresse masticabili dal gradevole sapore di arancia, ideale per chi preferisce una forma di assunzione più pratica e gustosa. Fornisce 1000mg di vitamina C per dose con dosaggi flessibili per diverse fasce d''età.', false, false, false, '2025-06-22 21:51:54.095355', NULL, NULL, NULL, '330 compresse');
INSERT INTO public.products VALUES (760, 'korean-red-ginseng', 'Korean Red Ginseng', 10, 7, 'Ginseng rosso coreano premium per energia, vitalità e supporto del sistema immunitario', 'Integratore alimentare a base di ginseng rosso coreano della specie Panax ginseng C.A Meyer. Il Ginseng rosso coreano è utile come tonico-adattogeno e in caso di stanchezza fisica e mentale. Antiossidante.', '{
    "valori_nutrizionali": {
      "dose": "Per 2 compresse",
      "tabella": [
        {"componente": "Panax ginseng C.A Meyer, radice standardizzato al 20% in ginsenosidi totali", "quantita": "110 mg", "vnr": ""},
        {"componente": "di cui ginsenosidi totali", "quantita": "22 mg", "vnr": ""}
      ]
    },
    "ingredienti": "Agenti di carica: fosfato dicalcico, cellulosa microcristallina; ginseng rosso coreano e.s. (Panax ginseng C.A Meyer, radice) tit. 20% ginsenosidi; agenti antiagglomeranti: acido stearico vegetale, magnesio stearato vegetale, biossido di silicio; agente di carica: carbossimetilcellulosa sodica reticolata. Rivestimento compressa: idrossipropilmetilcellulosa, polietilenglicole."
  }', 'Assumere 2 compresse al giorno con un bicchiere d''acqua, preferibilmente a colazione o pranzo.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Non usare in gravidanza e durante l''allattamento. Consultare il medico in caso di ipertensione o diabete. Conservare in luogo fresco e asciutto.', 'Il Ginseng rosso coreano è un potente tonico adattogeno, ottimo per contrastare la stanchezza fisica e mentale e per un''azione antiossidante, ideale nei periodi di maggiore stress o affaticamento.', false, false, false, '2025-06-22 21:56:50.559407', NULL, NULL, NULL, '60 capsule');
INSERT INTO public.products VALUES (762, 'sali-performance-electrolyte', 'Sali+ Performance Electrolyte', 1, 7, 'Integratore di sali minerali per il supporto idro-elettrolitico durante l''attività sportiva', 'Miscela avanzata di carboidrati a rilascio differenziato, sali minerali, vitamine, aminoacidi, L-carnitina, colina, coenzima Q10 e caffeina. Offre supporto completo per idratazione, recupero elettrolitico ed energia metabolica, ideale per atleti di endurance e attività intense.', '{
    "valori_nutrizionali": {
      "dose": "Per 40 g (1 dose)",
      "tabella": [
        {"componente": "Valore energetico", "quantita": "589 kJ / 139 kcal"},
        {"componente": "Grassi", "quantita": "0 g"},
        {"componente": "di cui saturi", "quantita": "0 g"},
        {"componente": "Carboidrati", "quantita": "32 g"},
        {"componente": "di cui zuccheri", "quantita": "5,8 g"},
        {"componente": "Fibre", "quantita": "0 g"},
        {"componente": "Proteine", "quantita": "1,5 g"},
        {"componente": "Sale", "quantita": "0,61 g"},
        {"componente": "Sodio", "quantita": "244 mg"},
        {"componente": "Vitamina B6", "quantita": "0,8 mg (57% VNR)"},
        {"componente": "Vitamina C", "quantita": "60 mg (73% VNR)"},
        {"componente": "Magnesio", "quantita": "60 mg (15% VNR)"},
        {"componente": "Potassio", "quantita": "370 mg (18% VNR)"},
        {"componente": "Cloruro", "quantita": "330 mg (42% VNR)"},
        {"componente": "L-tirosina", "quantita": "0,4 g"},
        {"componente": "Glicina", "quantita": "0,4 g"},
        {"componente": "L-carnitina", "quantita": "199 mg"},
        {"componente": "Colina", "quantita": "196 mg"},
        {"componente": "Coenzima Q10", "quantita": "12 mg"},
        {"componente": "Caffeina", "quantita": "100 mg"}
      ]
    },
    "ingredienti": "Maltodestrine 77,3%, fruttosio 9,3%, Vitargo®, acidificante: acido citrico; correttore di acidità: citrato trisodico; aroma, magnesio citrato, L-tirosina, glicina, colina bitartrato, L-carnitina tartrato, agente antiagglomerante: tricalcio fosfato; potassio cloruro, caffeina, acido L-ascorbico (vitamina C), edulcoranti: glicosidi steviolici (estratti da foglie di Stevia rebaudiana Bertoni), sucralosio; coenzima Q10, piridossina HCl (vitamina B6)."
  }', 'Sciogliere 40 g (4 misurini) in 500 ml di acqua. Assumere durante l''attività fisica per favorire idratazione, reintegro dei sali minerali e supporto energetico.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Contiene caffeina (100 mg per dose): non raccomandato per bambini e donne in gravidanza o in allattamento. Conservare in luogo fresco e asciutto.', 'Una formulazione completa che unisce carboidrati a rilascio differenziato, elettroliti essenziali, aminoacidi per il recupero, L-carnitina per il metabolismo dei grassi, colina per la funzione cerebrale, coenzima Q10 per l''energia cellulare e una dose mirata di caffeina per la performance. Ideale per sport di endurance e attività intense.', false, false, false, '2025-06-24 15:29:25.99207', NULL, 'Arancia', '600g', '16.99');
INSERT INTO public.products VALUES (1249, 'gluta-max', 'Gluta Max', 23, 2, 'GLUTA MAX è un integratore alimentare di glutammina in polvere solubile senza aromi, gusto naturale.', 'GLUTA MAX è un integratore alimentare di glutammina in polvere solubile senza aromi, gusto naturale. Contiene glutammina di origine vegetale da fermentazione di purezza superiore garantita KYOWA QUALITY®. La glutammina è un aminoacido coinvolto nel processo di recupero e rigenerazione muscolare. Non contiene ingredienti di origine animale, adatto anche ai vegani.', '{"titolo":"Gluta Max","per_porzione":{"descrizione":"Valori nutrizionali per porzione","porzione":"1 misurino da 5 g","valori":[{"componente":"L-Glutammina","valore":"5.000 mg"}]},"ingredienti":"L-Glutammina (Kyowa Quality®); Stabilizzante: calcio fosfato."}', 'Un misurino (5 g) al giorno con acqua o altro liquido a scelta durante la giornata o dopo l''attività fisica.', NULL, NULL, false, false, false, '2025-08-04 08:59:49.970534', NULL, 'Naturale', '500g', '500g');
INSERT INTO public.products VALUES (1230, 'maxivit-sport', 'Maxivit Sport', 25, 7, 'MAXI VIT SPORT infatti è un integratore alimentare a base di vitamine e minerali con aggiunta dei migliori fattori ad azione antiossidante ed antinvecchiamento.', 'Integratore multivitaminico e multiminerale con aggiunta di estratti vegetali specificamente formulato per gli sportivi e per tutti coloro che praticano attività fisica intensa. La formula contiene vitamine, minerali ed estratti vegetali che contribuiscono al normale metabolismo energetico, alla riduzione della stanchezza e dell''affaticamento, alla protezione delle cellule dallo stress ossidativo e al normale funzionamento del sistema immunitario. Gli estratti di Ginseng e Guaranà offrono un supporto tonico e adattogeno, mentre la presenza di antiossidanti aiuta a contrastare lo stress ossidativo indotto dall''attività fisica intensa.', '{"ingredients": "Calcio Fosfato, Magnesio Ossido, Potassio Fosfato, Cellulosa microcristallina, Acido Ascorbico (Vitamina C), Coenzima Q10, Resveratrolo, Ferro Fumarato, Glutatione, Antiagglomerante: Magnesio Stearato, DL-Alfa-Tocoferil Acetato (Vitamina E), Niacina (Vitamina B3), Zinco Ossido, Calcio Pantotenato, Rame Gluconato, Manganese Solfato, Riboflavina (Vitamina B2), Piridossina Cloridrato (Vitamina B6), Tiammina Cloridrato (Vitamina B1), Retinile Acetato (Vitamina A), Luteina, Acido Folico, Cromo Picolinato, Potassio Ioduro, Selenito di Sodio, Biotina, Molibdato di Ammonio, Colecalciferolo (Vitamina D3), Cianocobalammina (Vitamina B12).", "nutritional_table": {"title": "Valori Nutrizionali", "values": [{"unit": "μg", "amount": "1200", "nutrient": "Vitamina A", "daily_value": "150%"}, {"unit": "mg", "amount": "120", "nutrient": "Vitamina C", "daily_value": "150%"}, {"unit": "mg", "amount": "24", "nutrient": "Vitamina E", "daily_value": "200%"}, {"unit": "mg", "amount": "3.3", "nutrient": "Vitamina B1", "daily_value": "300%"}, {"unit": "mg", "amount": "4.2", "nutrient": "Vitamina B2", "daily_value": "300%"}, {"unit": "mg", "amount": "4.2", "nutrient": "Vitamina B6", "daily_value": "300%"}, {"unit": "mg", "amount": "9", "nutrient": "Acido Pantotenico", "daily_value": "150%"}, {"unit": "mg", "amount": "24", "nutrient": "Niacina", "daily_value": "150%"}, {"unit": "μg", "amount": "250", "nutrient": "Acido Folico", "daily_value": "125%"}, {"unit": "μg", "amount": "75", "nutrient": "Biotina", "daily_value": "150%"}, {"unit": "μg", "amount": "7.5", "nutrient": "Vitamina B12", "daily_value": "300%"}, {"unit": "μg", "amount": "15", "nutrient": "Vitamina D", "daily_value": "300%"}, {"unit": "mg", "amount": "600", "nutrient": "Calcio", "daily_value": "75%"}, {"unit": "mg", "amount": "525", "nutrient": "Fosforo", "daily_value": "75%"}, {"unit": "mg", "amount": "279", "nutrient": "Magnesio", "daily_value": "74%"}, {"unit": "mg", "amount": "10.5", "nutrient": "Ferro", "daily_value": "75%"}, {"unit": "mg", "amount": "7.5", "nutrient": "Zinco", "daily_value": "75%"}, {"unit": "mg", "amount": "0.75", "nutrient": "Rame", "daily_value": "75%"}, {"unit": "mg", "amount": "1.5", "nutrient": "Manganese", "daily_value": "75%"}, {"unit": "μg", "amount": "39", "nutrient": "Selenio", "daily_value": "71%"}, {"unit": "μg", "amount": "30", "nutrient": "Cromo", "daily_value": "75%"}, {"unit": "μg", "amount": "36", "nutrient": "Molibdeno", "daily_value": "72%"}, {"unit": "μg", "amount": "150", "nutrient": "Iodio", "daily_value": "100%"}, {"unit": "mg", "amount": "60", "nutrient": "Resveratrolo", "daily_value": null}, {"unit": "mg", "amount": "75", "nutrient": "Coenzima Q10", "daily_value": null}, {"unit": "mg", "amount": "30", "nutrient": "Glutatione", "daily_value": null}, {"unit": "μg", "amount": "1000", "nutrient": "Luteina", "daily_value": null}], "serving_size": "3 compresse", "servings_per_container": "20"}}', 'Assumere 3 compresse al giorno con acqua.', NULL, NULL, false, false, false, '2025-08-04 08:40:16.943354', NULL, 'Unico', NULL, '60 compresse');
INSERT INTO public.products VALUES (1026, 'starter-1000', 'Starter 1000', 22, 3, 'Prodotto specifico per la fase pre-gara o pre-workout per sostenere attività intense e prolungate, per un''ottimale gestione della fatica e della concentrazione.', 'STARTER 1000® è un integratore specifico per la fase pre-gara o pre-workout. Apporta citrullina, arginina, beta-alanina, taurina, beetroot, creatina, caffeina, BCAA e vitamine, ingredienti molto utili per la prestazione sportiva. La caffeina (70mg/dose) contribuisce ad aumentare l''attenzione e la concentrazione. La caffeina microincapsulata (NEWCAFF®) permette inoltre un rilascio graduale per un effetto più modulato e costante. Le vitamine contribuiscono alla riduzione della stanchezza e dell''affaticamento (B12, B6, C), al normale funzionamento del sistema nervoso (B1, B12, C), permettono il fisiologico metabolismo energetico (B12, B1, B6, C,) e supportano il normale metabolismo delle proteine e del glicogeno (B6). Lo zinco contribuisce alla normale sintesi proteica.', '{"titolo":"Starter 1000","informazioni_nutrizionali":{"per_100g":{"porzione":"100 g","valore_energetico":"1610 kJ / 384 kcal","grassi":"0 g","di_cui_acidi_grassi_saturi":"0 g","carboidrati":"4.0 g","di_cui_zuccheri":"2.0 g","fibra_alimentare":"0 g","proteine":"54 g","sale":"0 g","mix_bcaa_aminoacidi":{"l_leucina":"12.5 g","l_valina":"6.25 g","l_isoleucina":"6.25 g"},"l_glutammina":"10 g","dl_citrullina_malato":"10 g","beta_alanina":"8 g","creatina_mix":{"creatina_citrato":"6.25 g","creatina_monoidrato":"1.25 g"},"arginina_mix":{"arginina_alfa_chetoglutarato":"5 g"},"taurina":"5 g","polvere_di_barbabietola_rossa":"5 g","aroma_mela":"1 g","sale_disodico_adenosina_5-trifosfato_ATP":"500 mg","caffeina_anidra":"600 mg","caffeina_naturale_da_estratto_di_te_verde":"200 mg","caffeina_anidra_aroma_arancia":"150 mg","vitamina_C":"500 mg","niacina":"55 mg","acido_pantotenico":"50 mg","vitamina_B6":"7 mg","vitamina_B12":"12.5 µg"},"per_dose_20g":{"porzione":"1 DOSE 20 g","valore_energetico":"403 kJ / 77 kcal","grassi":"0 g","di_cui_acidi_grassi_saturi":"0 g","carboidrati":"0.8 g","di_cui_zuccheri":"0.4 g","fibra_alimentare":"0 g","proteine":"11 g","sale":"0 g","mix_bcaa_aminoacidi":{"l_leucina":"2.5 g","l_valina":"1.25 g","l_isoleucina":"1.25 g"},"l_glutammina":"2 g","dl_citrullina_malato":"2 g","beta_alanina":"1.6 g","creatina_mix":{"creatina_citrato":"1.25 g","creatina_monoidrato":"0.25 g"},"arginina_mix":{"arginina_alfa_chetoglutarato":"1 g"},"taurina":"1 g","polvere_di_barbabietola_rossa":"1 g","aroma_mela":"200 mg","sale_disodico_adenosina_5-trifosfato_ATP":"100 mg","caffeina_anidra":"120 mg (32%)","caffeina_naturale_da_estratto_di_te_verde":"40 mg","caffeina_anidra_aroma_arancia":"30 mg (30%)","vitamina_C":"100 mg (125%)","niacina":"11 mg (69%)","acido_pantotenico":"10 mg (167%)","vitamina_B6":"1.4 mg (100%)","vitamina_B12":"2.5 µg (100%*)"}},"ingredienti":"Mix di carboidrati (Maltodestrine DE19, Isomaltulosio** (Palatinose®), Aminoblast® BCAA (L-leucina, L-isoleucina, L-valina), destrina ciclica altamente ramificata (Cluster Dextrin®)), Beta Alanina, Citrullina Malato, Creatina mix (Creatina monoidrato, Creatina citrato), Arginina alfa-chetoglutarato, Taurina, Barbabietola rossa (beta vulgaris l.) polvere, Trimagnesio citrato, emulsionante: esteri di saccarosio degli acidi grassi, aromi, agente antiagglomerante: biossido di silicio, acidificante: Acido malico, Acido l-ascorbico, sale bisodico di Adenosina 5''-trifosfato (atp), zinco gluconato, Caffeina microincapsulata Newcaff® (caffeina, cera candellilla, mono e digliceridi degli acidi grassi), edulcorante: Sucralosio, Caffeina anidra, vitamina B6 (piridossina cloridrato), Vitamina B1 (Tiamina cloridrato), Vitamina B12 (Metilcobalamina)."}', 'Sciogliere 1 dose (3 misurini=20 g) in 200-250 ml di acqua. Assumere 20-30 minuti circa prima dell''allenamento.', 'Mix di carboidrati (Maltodestrine DE19, Isomaltulosio (Palatinose®), Aminoblast® BCAA (L-leucina, L-isoleucina, L-valina), destrina ciclica altamente ramificata (Cluster Dextrin®)), Beta Alanina, Citrullina Malato, Creatina mix (Creatina monoidrato, Creatina citrato), Arginina alfa-chetoglutarato, Taurina, Barbabietola rossa (beta vulgaris l.) polvere.', NULL, false, false, false, '2025-07-26 07:12:26.799345', NULL, 'Arancia Rossa', '400g', NULL);
INSERT INTO public.products VALUES (1016, 'maltoshot-endurance-plus', 'MALTOSHOT ENDURANCE PLUS', 22, 3, 'Gel energetico evoluto con 5 carboidrati, beta-alanina, sodio e magnesio. Energia duratura, zero caffeina, alta tollerabilità, ottimale digeribilità.', 'MaltoShot® Endurance PLUS è un gel energetico evoluto, progettato per fornire energia duratura anche durante le prestazioni più intense. Contiene 35 g di carboidrati per dose, in rapporto 1:0.8 (glucosio:fruttosio), distribuiti tra 5 fonti a diverso indice glicemico, inclusa la ciclodestrina SusCarb®, una destrina ramificata ad alto peso molecolare. La presenza di sodio (155 mg) e beta-alanina (305 mg) arricchisce la formula, offrendo un profilo avanzato per affrontare situazioni di ad alto impegno. La consistenza è fluida, con ottima digeribilità e piacevole freschezza al gusto. È una formula di nuova generazione, ben tollerata anche in condizioni estreme. Senza caffeina.', '{"titolo":"Maltoshot Endurance Plus","valori_nutrizionali":{"per_100_ml":{"energia":"1212 kJ / 286 kcal","grassi":"0.1 g","di_cui_saturi":"0 g","carboidrati":"70 g","di_cui_zuccheri":"36 g","proteine":"0.9 g","sale":"0.78 g","magnesio":"210 mg (56% VNR*)","sodio":"310 mg","beta_alanina":"610 mg"},"per_pacchetto_50_ml":{"energia":"606 kJ / 143 kcal","grassi":"0 g","di_cui_saturi":"0 g","carboidrati":"35 g","di_cui_zuccheri":"18 g","proteine":"0.5 g","sale":"0.39 g","magnesio":"105 mg (28% VNR*)","sodio":"155 mg","beta_alanina":"305 mg"}},"ingredienti":"Acqua, maltodestrina DE19, Fruttosio, Destrosio, Maltodestrina DE6, SusCarb® (ciclodestrine ramificate), Cloruro di Magnesio, Magnesio citrato, Cloruro di sodio, Beta-Alanina, acidificante: Acido Citrico, Aroma, conservante: Sorbato di Potassio."}', 'Assumere durante l''attività fisica, anche in condizioni di sforzo prolungato. 1 pack ogni 50–70 minuti, accompagnato da un sorso d''acqua. Dose max 4 pack al giorno. Testare il prodotto prima in allenamento per identificare il corretto timing e la quantità ideale per il proprio metabolismo. Per sforzi superiori ai 90 minuti, può essere utile alternarlo a fonti solide o elettrolitiche (es. Super Dextrin Bar o SuperHydro).', 'Acqua, maltodestrina DE19, Fruttosio, Destrosio, Maltodestrina DE6, SusCarb® (ciclodestrine ramificate), Cloruro di Magnesio, Magnesio citrato, Cloruro di sodio, Beta-Alanina, acidificante: Acido Citrico, Aroma, conservante: Sorbato di Potassio.', NULL, false, false, false, '2025-07-25 22:58:31.433935', NULL, 'Mojito - Mint', '15 pz da 50 ml', NULL);
INSERT INTO public.products VALUES (775, 'vitamina-b12-1000', 'Vitamina B12 1000', 11, 7, 'Vitamina B12 ad alto dosaggio per il supporto del sistema nervoso e del metabolismo energetico. 1000mcg per compressa.', 'La vitamina B12, o cianocobalamina, è una vitamina idrosolubile del gruppo B, essenziale per molte funzioni vitali dell''organismo. Fondamentale per il corretto metabolismo energetico, riduzione di stanchezza e affaticamento, funzionamento del sistema nervoso e benessere psicologico. Coinvolta nella produzione di globuli rossi e sintesi del DNA.', '{
    "valori_nutrizionali": {
      "dose": "Per porzione",
      "tabella": [
        {"componente": "Vitamina B12", "quantita": "1000 µg", "vnr": "40000%"}
      ]
    },
    "ingredienti": "Agenti di carica: cellulosa microcristallina - gel di cellulosa, fosfato dicalcico; agenti antiagglomeranti: biossido di silicio, sali di magnesio degli acidi grassi; vitamina B12 (cianocobalamina). SENZA GLUTINE."
  }', 'Assumere 1 compressa al giorno, preferibilmente al pasto.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Senza glutine. Conservare in luogo fresco e asciutto.', 'Un integratore ad alto dosaggio di vitamina B12 (cianocobalamina) per supportare il metabolismo energetico, ridurre stanchezza e affaticamento, e mantenere la normale funzione del sistema nervoso. Essenziale per la formazione dei globuli rossi e la sintesi del DNA.', false, false, false, '2025-06-24 15:32:24.037947', NULL, 'Naturale', '80 compresse', '1990');
INSERT INTO public.products VALUES (780, 'ps200-fosfatidilserina', 'PS200 Fosfatidilserina', 11, 7, 'Fosfatidilserina 200mg per capsula per il supporto delle funzioni cognitive e la riduzione del cortisolo post-allenamento.', 'PS 200 Fosfatidilserina è un integratore alimentare a base di fosfatidilserina, un fosfolipide essenziale presente naturalmente nelle membrane cellulari, particolarmente concentrato nel cervello. La fosfatidilserina svolge un ruolo cruciale nel mantenimento della struttura e della funzionalità delle membrane cellulari ed è coinvolta nella comunicazione neuronale. È coinvolta anche nella produzione di neurotrasmettitori chiave come l''acetilcolina, la dopamina e il glutammato. In ambito sportivo, la fosfatidilserina è stata associata a una riduzione dello stress e al supporto della ripresa muscolare dopo l''attività fisica intensa e ad una migliore concentrazione, essenziale per dare il massimo in allenamenti e competizioni. PS 200 Fosfatidilserina abbina questo fosfolipide essenziale alla vitamina B12, utile per il corretto funzionamento del sistema nervoso e per la produzione di energia.', '{
    "valori_nutrizionali": {
      "dose": "Per porzione",
      "tabella": [
        {"componente": "Fosfatidilserina", "quantita": "200 mg", "vnr": "-"},
        {"componente": "Vitamina B12", "quantita": "20 µg", "vnr": "800"}
      ]
    },
    "ingredienti": "Fosfatidilserina (da soia); agenti di carica: cellulosa, fosfato dicalcico; agente di rivestimento (capsula): idrossipropilmetilcellulosa; agenti antiagglomeranti: sali di magnesio degli acidi grassi, biossido di silicio; Vitamina B12 (cianocobalamina)."
  }', 'Si consiglia l''uso di 1 capula al giorno con acqua.', NULL, 'La fosfatidilserina è un neuro-supporto cruciale per la memoria, la concentrazione e la gestione dello stress, sia nella vita quotidiana che in ambito sportivo, dove può favorire anche il recupero muscolare. L''aggiunta di Vitamina B12 ne potenzia i benefici sul sistema nervoso e l''energia.', false, false, false, '2025-06-24 15:39:45.680338', NULL, 'Naturale', '60 capsule', '3990');
INSERT INTO public.products VALUES (948, 'veggie-ciok', 'Veggie Ciok', 1, 8, 'Barretta proteica vegana alle proteine del pisello con cioccolato fondente. Disponibile nei gusti albicocca, arancia e cacao in formato da 40g.', 'Veggie Ciok è una barretta proteica 100% vegetale formulata esclusivamente con proteine del pisello, senza fonti animali o lattosio. È l’alternativa ideale per chi segue un’alimentazione vegana o per chi è intollerante al latte, offrendo un apporto proteico di qualità in un formato pratico e gustoso.
La copertura al cioccolato fondente e i gusti fruttati rendono Veggie Ciok un prodotto gradevole al palato, a differenza di molte barrette proteiche vegetali. Il profilo nutrizionale bilanciato la rende adatta sia come snack spezzafame che come supporto post-allenamento.', '{"titolo":"Veggie Ciok","valori_nutrizionali":{"per_dose":{"porzione":"1 dose = 40 g","valore_energetico":"704 kJ / 168 kcal","grassi":"6,4 g","di_cui_acidi_grassi_saturi":"3,1 g","carboidrati":"18 g","di_cui_zuccheri":"16 g","di_cui_polioli":"1,6 g","fibre":"1,2 g","proteine":"10 g","sale":"0,28 g"}},"ingredienti":"proteine del pisello 27%, sciroppo di glucosio, cioccolato fondente di copertura 25% (zucchero, pasta di cacao, burro di cacao, emulsionante: lecitina di soia; aroma naturale di vaniglia), umidificante: sorbitolo; pasta gusto albicocca 4% [albicocche, fruttosio, zucchero, correttore di acidità: acido citrico; concentrato vegetale (carota, ravanello, mela, ribes nero), aromi, stabilizzante: E440; antiossidante: acido L-ascorbico], pasta gusto cioccolato 4% (cacao, olio di semi di girasole, emulsionante: lecitina di soia; aromi), albicocche disidratate 3% (albicocche, conservante: anidride solforosa), olio di semi di girasole, sciroppo di fruttosio, emulsionante: lecitina di soia, aromi.","allergeni_tracce":"Può contenere latte, arachidi e frutta a guscio."}', 'Consumo consigliato: 1-2 barrette al giorno.
Quando assumere: Pre-allenamento, post-allenamento, spuntino o merenda.
Modalità: Consumare direttamente.
Durata: Utilizzare regolarmente come supporto alla dieta vegana.', '<div class="warning-box">
<h4>⚠️ Avvertenze</h4>
<ul>
<li>Adatto a vegani e vegetariani</li>
<li>Può contenere tracce di frutta a guscio</li>
<li>Tenere fuori dalla portata dei bambini</li>
<li>Conservare in luogo fresco e asciutto</li>
<li>Non superare la dose giornaliera consigliata</li>
</ul>
</div>', '<div class="expert-tip">
<h4>💡 Consiglio dell''Esperto</h4>
<p>Le proteine del pisello hanno un profilo aminoacidico completo simile alle caseine. Ideale post-allenamento per il recupero muscolare in versione completamente vegetale.</p>
</div>', false, false, false, '2025-06-27 14:37:12.991208', NULL, NULL, NULL, NULL);
INSERT INTO public.products VALUES (779, 'testo-xplode', 'Testo Xplode', 11, 7, 'Integratore specifico per il supporto del testosterone naturale con D-Aspartico, Tribulus e Zinco. Formula avanzata per atleti.', 'Integratore alimentare di estratti vegetali, aminoacidi, zinco e vitamina B6. Formulato per sostenere il benessere fisico e mentale, con ingredienti selezionati per favorire rilassamento mentale, rigenerazione fisica e supporto delle attività anaboliche. Contiene KSM-66 Ashwagandha®, cordyceps, maca e fieno greco, oltre alla formula ZMB6 (magnesio, zinco, vitamina B6).', '{
    "valori_nutrizionali": {
      "dose": "Per porzione",
      "tabella": [
        {"componente": "Fieno greco e.s.", "quantita": "600 mg"},
        {"componente": "L-arginina AKG", "quantita": "450 mg"},
        {"componente": "L-citrullina", "quantita": "300 mg"},
        {"componente": "Acido L-aspartico", "quantita": "250 mg"},
        {"componente": "ZMB6 formula™", "quantita": "164,2 mg"},
        {"componente": "- di cui zinco", "quantita": "10 mg (100% VNR)"},
        {"componente": "- di cui magnesio", "quantita": "150 mg (40% VNR)"},
        {"componente": "- di cui vitamina B6", "quantita": "4,2 mg (300% VNR)"},
        {"componente": "Maca e.s.", "quantita": "150 mg"},
        {"componente": "Cordyceps e.s.", "quantita": "150 mg"},
        {"componente": "- di cui acido cordiceptico", "quantita": "10,5 mg"},
        {"componente": "L-ornitina HCL", "quantita": "100 mg"},
        {"componente": "KSM-66® Ashwagandha e.s.", "quantita": "100 mg"},
        {"componente": "- di cui withanolidi", "quantita": "5,0 mg"}
      ]
    },
    "ingredienti": "Agente di carica: cellulosa microcristallina, gel di cellulosa; fieno greco (Trigonella foenum-graecum L.) e.s., semi E:D 1:4; L-arginina alfa chetoglutarato (AKG); ZMB6 formula™ (ossido di magnesio, gluconato di zinco, vitamina B6 (cloridrato di piridossina)); L-citrullina DL-malato; acido L-aspartico; maca (Lepidium meyenii Walp.) e.s. radice, E:D 1:4/6; cordyceps (Ophiocordyceps sinensis (Berk.) G.H. Sung, J.M. Sung, Hywel-Jones & Spatafora) e.s. fungo."
  }', 'Assumere 3 compresse al giorno con un bicchiere d’acqua.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Conservare in luogo fresco e asciutto.', 'Una formulazione avanzata che combina estratti vegetali adattogeni come l''Ashwagandha KSM-66® e il cordyceps con aminoacidi specifici e la formula ZMB6 per supportare il benessere fisico e mentale. Ideale per chi cerca un supporto naturale per la vitalità e il recupero.', false, false, false, '2025-06-24 15:39:45.55274', NULL, 'Naturale', '90 capsule', '3490');
INSERT INTO public.products VALUES (1251, 'hmb-1000-mg', 'HMB 1000 mg', 23, 2, 'Integratore alimentare di HMB in compresse da 1000 mg.', 'Integratore alimentare di HMB in compresse da 1000 mg. Il β-idrossi β-metil butirrato (HMB) è un metabolita dell''aminoacido Leucina, con un ruolo attivo nello stimolare la sintesi proteica. Può contrastare il catabolismo proteico, favorendo il recupero e l''incremento di massa muscolare e la forza. Non contiene ingredienti di origine animale ed è adatto anche ai vegani.', '{"titolo":"HMB 1000mg","per_porzione":{"descrizione":"Valori nutrizionali per porzione","porzione":"2 compresse","valori":[{"componente":"Calcio β-idrossi- β-metil butirato (HMB)","valore":"2.000 mg"}]},"ingredienti":"Calcio beta idrossi beta metil butirato (HMB); Agente di carica: cellulosa microcristallina; Stabilizzante: idrossipropilmetilcellulosa; Agenti antiagglomeranti: biossido di silicio e sali di magnesio degli acidi grassi (origine vegetale)."}', 'Deglutire 2 compresse al giorno con acqua o altro liquido a scelta, ai pasti oppure prima dell''attività fisica o immediatamente dopo.', NULL, NULL, false, false, false, '2025-08-04 08:59:49.970534', NULL, 'Unico', '90 compresse', '90 compresse');
INSERT INTO public.products VALUES (802, 'joint-flex-d3-plus', 'Joint Flex D3 Plus', 6, 7, 'Formula avanzata per articolazioni con vitamina D3 e collagene', 'JOINT FLEX D3 PLUS è un integratore alimentare a base di membrana d''uovo in polvere (Ovomet®), calcio da guscio d''uovo (Ovocet®), Glucosammina di origine vegetale, MSM, acido lipoico, vitamina D3. Questa la perfetta combinazione di JOINT FLEX D3 PLUS, un integratore in compresse che svolge un ruolo chiave nel promuovere la salute dei tessuti articolari, della cartilagine, delle ossa e a mantenere i denti sani.', '{
    "valori_nutrizionali": {
      "dose": "Per Dose (2 Compresse)",
      "tabella": [
        {"componente": "Ovomet®", "quantita": "400 mg", "vnr": "-"},
        {"componente": "- di cui 35% collagene", "quantita": "140 mg", "vnr": "-"},
        {"componente": "- di cui 20% elastina", "quantita": "80 mg", "vnr": "-"},
        {"componente": "- di cui 4% acido ialuronico", "quantita": "16 mg", "vnr": "-"},
        {"componente": "- di cui 2% condroitinsolfato", "quantita": "8 mg", "vnr": "-"},
        {"componente": "- di cui 2% glucosammina", "quantita": "8 mg", "vnr": "-"},
        {"componente": "Glucosammina", "quantita": "400 mg", "vnr": "-"},
        {"componente": "Ovocet®", "quantita": "400 mg", "vnr": "-"},
        {"componente": "- di cui 38% calcio", "quantita": "152 mg", "vnr": "20"},
        {"componente": "metilsulfonilmetano (MSM)", "quantita": "400 mg", "vnr": "-"},
        {"componente": "Acido lipoico", "quantita": "280 mg", "vnr": "-"},
        {"componente": "Vitamina D3", "quantita": "50 mcg", "vnr": "1000"}
      ]
    },
    "ingredienti": "Membrana d''uovo in polvere (Ovomet®), Glucosammina cloridrato vegetale, calcio carbonato da guscio d''UOVO (Ovocet®), metilsulfonilmetano (MSM), Acido lipoico, stabilizzanti: sali di magnesio degli acidi grassi, polivinilpirrolidone, biossido di silicio; agente di carica: cellulosa microcristallina; colecalciferolo (vitamina D3)."
  }', 'Assumere 2 compresse al giorno con acqua.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Non utilizzare in caso di allergia alle uova. Conservare in luogo fresco e asciutto.', 'Questo integratore offre un supporto completo per la salute articolare e ossea, combinando ingredienti chiave come la membrana d''uovo (ricca di collagene, elastina, acido ialuronico) e la Glucosammina, con l''aggiunta di Vitamina D3 per un assorbimento ottimale del calcio. Ideale per il mantenimento della mobilità e la protezione dei tessuti connettivi.', false, false, false, '2025-06-24 15:59:33.777031', NULL, NULL, '60', 'compresse');
INSERT INTO public.products VALUES (636, 'iso-soya', 'Iso Soya', 6, 1, 'Proteine isolate della soia ad alto valore biologico, ideali per diete vegane e vegetariane', 'Integratore 100% vegetale a base di proteine isolate della soia, ricco in vitamine del gruppo B, adatto a vegani, vegetariani e a chi cerca un''alternativa vegetale alle proteine del latte.', '{"nome_prodotto":"Iso Soya","valori_nutrizionali":{"per_porzione":{"descrizione":"Informazioni nutrizionali per dose:","porzione":"40 g","valori":[{"componente":"Energia","valore":"675 kJ / 159 kcal"},{"componente":"Grassi","valore":"1,4 g"},{"componente":"di cui saturi","valore":"0,3 g"},{"componente":"Carboidrati","valore":"0,6 g"},{"componente":"di cui zuccheri","valore":"0,4 g"},{"componente":"Proteine","valore":"36 g"},{"componente":"Sale","valore":"0,4 g"},{"componente":"Vitamina C","valore":"24 mg (30% VNR)"},{"componente":"Vitamina PP","valore":"4,8 mg (30% VNR)"},{"componente":"Vitamina E","valore":"3,6 mg (30% VNR)"},{"componente":"Acido pantotenico","valore":"1,8 mg (30% VNR)"},{"componente":"Vitamina B6","valore":"0,42 mg (30% VNR)"},{"componente":"Vitamina B2","valore":"0,42 mg (30% VNR)"},{"componente":"Vitamina B1","valore":"0,33 mg (30% VNR)"},{"componente":"Vitamina A","valore":"240 mcg (30% VNR)"},{"componente":"Acido folico","valore":"60 mcg (30% VNR)"},{"componente":"Vitamina H","valore":"15 mcg (30% VNR)"},{"componente":"Vitamina B12","valore":"0,75 mcg (30% VNR)"}]},"per_100g":{"descrizione":"Informazioni nutrizionali per 100g:","valori":[{"componente":"Energia","valore":"1689 kJ / 397 kcal"},{"componente":"Grassi","valore":"3,5 g"},{"componente":"di cui saturi","valore":"0,8 g"},{"componente":"Carboidrati","valore":"1,5 g"},{"componente":"di cui zuccheri","valore":"1 g"},{"componente":"Proteine","valore":"90 g"},{"componente":"Sale","valore":"1 g"},{"componente":"Vitamina C","valore":"60 mg"},{"componente":"Vitamina PP","valore":"12 mg"},{"componente":"Vitamina E","valore":"9 mg"},{"componente":"Acido pantotenico","valore":"4,5 mg"},{"componente":"Vitamina B6","valore":"1,05 mg"},{"componente":"Vitamina B2","valore":"1,05 mg"},{"componente":"Vitamina B1","valore":"0,82 mg"},{"componente":"Vitamina A","valore":"600 mcg"},{"componente":"Acido folico","valore":"150 mcg"},{"componente":"Vitamina H","valore":"37,5 mcg"},{"componente":"Vitamina B12","valore":"1,87 mcg"}]}},"ingredienti":"Proteine isolate della soia, cacao in polvere, aromi, emulsionante: lecitina di soia; miscela vitaminica (acido L-ascorbico, nicotinamide, DL-alfa tocoferolo acetato, calcio D-pantotenato, piridossina HCl, riboflavina, tiamina HCl, retinile acetato, acido folico, D-biotina, cianocobalamina); cloruro di sodio; edulcoranti: sucralosio, acesulfame K."}', 'Assumere 40 g in 300 ml d''acqua o bevanda vegetale. Una volta al giorno.', 'Non superare la dose consigliata. Gli integratori alimentari non vanno intesi come sostituti di una dieta variata ed equilibrata. Tenere lontano dalla portata dei bambini al di sotto dei 3 anni.', 'Perfetto per vegani e vegetariani. Arricchito con vitamine del gruppo B per supportare il metabolismo energetico.', false, false, false, '2025-06-10 05:31:58.321822', NULL, NULL, NULL, NULL);
INSERT INTO public.products VALUES (810, 'sali-activator-1-0-8', 'Sali Activator 1:0,8', 1, 7, 'Sali minerali con rapporto ottimale sodio-potassio per idratazione sportiva', 'Sali+ Activator è una formulazione avanzata pensata per supportare chi pratica attività fisica intensa, in particolare negli sport di resistenza e nelle discipline aerobiche prolungate. Grazie alla combinazione di carboidrati a rilascio differenziato, sali minerali essenziali, aminoacidi e vitamine, offre numerosi benefici: Reintegro rapido di sali minerali grazie al magnesio e potassio, che contribuiscono alla normale funzione muscolare e alla riduzione della fatica. Supporto energetico costante: la miscela di maltodestrine, fruttosio e Vitargo® garantisce un apporto graduale di energia senza sbalzi glicemici. Ottimizzazione del metabolismo energetico: la vitamina B6 aiuta a trasformare i nutrienti in energia disponibile per il corpo. Migliore ossigenazione muscolare: la L-Arginina favorisce la vasodilatazione, migliorando il trasporto di ossigeno e nutrienti ai muscoli. Sostegno al recupero e alla funzione immunitaria: la glutammina aiuta a contrastare il catabolismo muscolare e supporta il sistema immunitario, mentre la vitamina C svolge un''azione antiossidante, proteggendo le cellule dallo stress ossidativo.', '{
    "valori_nutrizionali": {
      "dose": "1 dose = 40 g",
      "tabella": [
        {"componente": "Valore energetico", "quantita": "598 kJ / 143 kcal"},
        {"componente": "Grassi", "quantita": "0 g"},
        {"componente": "di cui Acidi grassi saturi", "quantita": "0 g"},
        {"componente": "Carboidrati", "quantita": "34 g"},
        {"componente": "di cui: Zuccheri", "quantita": "17 g"},
        {"componente": "Fibre", "quantita": "0 g"},
        {"componente": "Proteine", "quantita": "1,4 g"},
        {"componente": "Sale", "quantita": "0,7 g"},
        {"componente": "Vitamina B6", "quantita": "1 mg (71% VNR)"},
        {"componente": "Vitamina C", "quantita": "51 mg (65% VNR)"},
        {"componente": "Magnesio", "quantita": "59 mg (16% VNR)"},
        {"componente": "Potassio", "quantita": "367 mg (18% VNR)"},
        {"componente": "Cloruro", "quantita": "333 mg (42% VNR)"},
        {"componente": "L-Arginina", "quantita": "496 mg"},
        {"componente": "L-Glutammina", "quantita": "504 mg"},
        {"componente": "Ribosio", "quantita": "496 mg"}
      ]
    },
    "ingredienti": "Maltodestrine 44%, fruttosio 38%, acidificante: acido citrico; amilopectina° 3%, correttore di acidità: citrato trisodico; potassio cloruro, aroma, arginina°°, ribosio, glutammina°°, magnesio citrato, agente antiagglomerante: calcio fosfato tribasico; barbabietola, vitamina C (acido L-ascorbico), edulcoranti: glicosidi steviolici da Stevia, sucralosio; piridossina cloridrato (vitamina B6). Può contenere sedano."
  }', 'SPORT: Sciogliere 40 g di prodotto (4 misurini) in 500 mL di acqua e agitare bene. Assumere durante l''attività fisica per mantenere il bilancio elettrolitico e supportare la performance.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Può contenere sedano. Conservare in luogo fresco e asciutto.', 'Un integratore completo per gli sportivi di resistenza, che fornisce carboidrati per un''energia prolungata, sali minerali per l''equilibrio elettrolitico, aminoacidi per il recupero e l''ossigenazione muscolare, e vitamine per ridurre la fatica e supportare il sistema immunitario.', false, false, false, '2025-06-24 15:59:33.777031', 5, NULL, NULL, NULL);
INSERT INTO public.products VALUES (949, 'perfect-bar-50', 'Perfect Bar 50%', 11, 8, 'Barretta proteica isolata con 50% di proteine e basso contenuto di zuccheri. Gusto cioccolato e latte in formato da 50g per massima sazietà.', 'Perfect Bar è una barretta con proteine isolate del siero del latte (Isolac®) e un alto contenuto proteico di 25 g su 50 g di barretta. È ideale per il post-allenamento, come spuntino tra i pasti o per diete finalizzate al dimagrimento. Un box contiene 28 barrette; per acquistarlo, aggiungere 28 barrette al carrello.

', '{"titolo":"Perfect Bar 50% - tutte le varianti","descrizione":"Perfect Bar è una barretta con proteine isolate del siero del latte (Isolac®) e un alto contenuto proteico di 25 g su 50 g di barretta. È ideale per il post-allenamento, come spuntino tra i pasti o per diete finalizzate al dimagrimento. Un box contiene 28 barrette; per acquistarlo, aggiungere 28 barrette al carrello.","valori_nutrizionali":{"per_100g":{"energia":"1718 kJ / 415 kcal","grassi":"18 g","di_cui_acidi_grassi_saturi":"10 g","carboidrati":"21,4 g","di_cui_zuccheri":"0,8 g","di_cui_polioli":"20,6 g","fibre":"4,0 g","proteine":"48 g","sale":"0,5 g"},"per_porzione":{"energia":"859 kJ / 208 kcal","grassi":"9,0 g","di_cui_acidi_grassi_saturi":"5,0 g","carboidrati":"10,7 g","di_cui_zuccheri":"0,4 g","di_cui_polioli":"10,3 g","fibre":"2,0 g","proteine":"24 g","sale":"0,3 g"}},"ingredienti":"surrogato cioccolato bianco [edulcorante: maltitolo, grassi vegetali non idrogenati (olio di cocco, burro di cacao), latte magro istantaneo, emulsionante: lecitina di girasole, sale, aromi naturali]; proteine isolate del siero del latte (Isolac®) (emulsionante: lecitina di soia); proteine del latte delattosate; estruso proteico del latte; edulcorante: sucralosio. Può contenere uova e frutta a guscio. SENZA GLUTINE. Un consumo eccessivo può avere effetti lassativi."}', 'Assumere 1-2 barrette al giorno secondo necessità.', '<div class="warning-box">
<h4>⚠️ Avvertenze</h4>
<ul>
<li>Contiene proteine del latte</li>
<li>Può contenere tracce di soia e frutta a guscio</li>
<li>Non superare la dose giornaliera consigliata</li>
<li>Tenere fuori dalla portata dei bambini</li>
<li>Conservare in luogo fresco e asciutto</li>
</ul>
</div>', '<div class="expert-tip">
<h4>💡 Consiglio dell''Esperto</h4>
<p>Le proteine isolate hanno assorbimento più rapido delle concentrate. Perfetta nel post-workout immediato quando la velocità di assimilazione è cruciale per il recupero.</p>
</div>', false, false, false, '2025-06-27 14:37:48.271975', NULL, NULL, NULL, NULL);
INSERT INTO public.products VALUES (1017, 'super-dextrin-energy-bar', 'Super Dextrin Energy Bar', 22, 3, 'Alimento studiato per chi pratica attività intense. Fornisce energia in modo rapido e duraturo, con gusto gradevole e ottima digeribilità. Facile da masticare anche durante l''attività. Gluten free.', 'SUPER DEXTRIN BAR è una barretta energetica a base di carboidrati, ideale prima e durante l''attività fisica.
La formula contiene SusCarb® (ciclodestrine ramificate), carboidrato ad alto peso molecolare noto per l''elevata solubilità e la cinetica di assorbimento modulata. Fornisce energia rapidamente, con un rilascio graduale utile per affrontare attività prolungate. Le barrette sono morbide e gradevoli al palato, con ottimo gusto e digeribilità, anche in condizioni impegnative.', '{"titolo":"Super Dextrin Energy Bar","valori_nutrizionali":{"per_100g":{"valore_energetico":"1663 kJ / 394 kcal","grassi":"8,3 g","di_cui_acidi_grassi_saturi":"1,6 g","carboidrati":"70 g","di_cui_zuccheri":"47 g","fibre":"7,3 g","proteine":"6,3 g","sale":"1,8 g"},"per_barretta_45g":{"valore_energetico":"748 kJ / 177 kcal","grassi":"3,7 g","di_cui_acidi_grassi_saturi":"0,7 g","carboidrati":"32 g","di_cui_zuccheri":"21 g","fibre":"3,3 g","proteine":"2,8 g","sale":"0,81 g"}},"ingredienti":"Pasta di datteri (datteri), crisp di riso (farina di riso, zucchero, olio di semi di girasole, sale), granella di arachidi pralinate (arachidi, zucchero), granella di mandorle, granella di nocciola confettata (nocciole, zucchero, sciroppo di glucosio) (6%), pasta di fichi secchi (5%), nocciole (4%), mandorle, zucchero, ciclodestrina SusCarb®, maltodestrina, aroma naturale, cacao in polvere, sodio ascorbato."}', 'Assumere 1 barretta circa 60–90 minuti prima dell''attività, accompagnata da acqua. Per sforzi di lunga durata: 1 barretta ogni 1,5–2 ore, sempre con liquidi.', 'Pasta di datteri (datteri), granella di arachidi pralinate (arachidi, zucchero), crisp di riso (farina di riso, zucchero, olio di semi di girasole, sale), fiocchi di avena senza glutine, arachidi, ciclodestrina Suscarb®, creme caramel (zucchero, sciroppo di glucosio, acqua, panna fresca di Isigny D.O.P., latte intero in polvere, burro salato di Isigny D.O.P., fibre alimentari, sale di Guérande IGP, aroma naturale di vaniglia) (2%), maltodestrina, zucchero, sale (0,7%), aroma naturale, cacao in polvere, sodio ascorbato. Il prodotto può contenere tracce di: sesamo, soia, latte e altra frutta a guscio.', NULL, false, false, false, '2025-07-25 23:06:59.218485', NULL, 'Sweet', '45g - 25 pz', NULL);
INSERT INTO public.products VALUES (819, 'ashwagandha-plus', 'Ashwagandha +', 6, 7, 'Integratore adattogeno naturale per il benessere mentale e fisico', 'Ashwagandha + (300 mg di estratto vegetale di Ashwagandha per capsula), integratore in capsule vegetali utile per contrastare lo stress fisico e mentale. Potenza naturale, equilibrio mentale, prestazioni sportive. Le nostre capsule di Ashwagandha forniscono 300 mg di estratto vegetale secco di Ashwagandha per capsula, coltivata secondo standard rigorosi per garantire una qualità eccezionale. Conosciuta nella tradizione ayurvedica come la "radice della vitalità", l''Ashwagandha è apprezzata per le sue proprietà adattogene che aiutano l''organismo a gestire stress e affaticamento, favorendo l''equilibrio e il benessere generale.', '{"valori_nutrizionali":{"dose":"PER DOSE (1 CAPSULA)","tabella":[{"componente":"Ashwagandha e.s.","quantita":"300 mg"}]},"ingredienti":"Estratto secco di Ashwagandha (withania somnifera (L.) Dunal); agente di carica: calcio difosfato, cellulosa microcristallina; agenti antiagglomeranti: sali di magnesio degli acidi grassi, biossido di silicio; agente di rivestimento: idrossiproprimetilcellulosa. Prodotto in stabilimento che utilizza derivati dell''uovo, del latte, della soia e frutti a guscio."}', 'Assumere 1 capsula al giorno con un bicchiere d''acqua, preferibilmente durante i pasti, per ottimizzare l''assorbimento e sfruttare al massimo i benefici dell''Ashwagandha.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Prodotto in stabilimento che utilizza derivati dell''uovo, del latte, della soia e frutti a guscio. Conservare in luogo fresco e asciutto.', 'Un valido supporto per l''equilibrio mentale e la gestione dello stress, ideale per chi cerca un adattogeno naturale per migliorare il benessere generale e le prestazioni.', false, false, false, '2025-06-24 16:37:11.023413', NULL, NULL, NULL, NULL);
INSERT INTO public.products VALUES (821, 'astaxantina-softgel', 'Astaxantina Softgel', 20, 7, 'Potente antiossidante naturale in capsule softgel', 'Astaxantina SoftGel è formulato per chi desidera contrastare lo stress ossidativo e supportare il benessere generale. L''unione sinergica di tre antiossidanti (astaxantina, vitamina C e vitamina E) aiuta a proteggere le cellule dai radicali liberi, sostenendo il sistema immunitario, la salute della pelle e del sistema cardiovascolare.', '{
    "valori_nutrizionali": {
      "dose": "1 dose = 2 capsule",
      "tabella": [
        {"componente": "Acido ascorbico (vitamina C)", "quantita": "120 mg", "vnr": "150"},
        {"componente": "DL alfa-tocoferile-acetato (vitamina E)", "quantita": "20 mg", "vnr": "166"},
        {"componente": "Astaxantina", "quantita": "8 mg", "vnr": "-"}
      ]
    },
    "ingredienti": "Olio di girasole, biomassa di Haematococcus pluvialis ricca in Astaxantina (AstaReal®), acido L-ascorbico (vitamina C), amido modificato, emulsionante: glicerolo vegetale; carragenina E407 (da alga rossa), d-alfa-tocoferolo (vitamina E), addensanti: (mono- e digliceridi di acidi grassi), diossido di silicio; emulsionante (lecitina di colza); fosfato di disodio."
  }', 'SPORT: Durante l''attività fisica intensa, i radicali liberi aumentano. L''integrazione è utile per contrastare lo stress ossidativo e favorire il recupero. Dosi consigliate: 2 capsule al giorno, nel pasto successivo all''allenamento. VITA QUOTIDIANA: Adatta a soggetti esposti a inquinanti ambientali o a periodi di stress ossidativo elevato. Dosi consigliate: 2 capsule al giorno, preferibilmente durante la colazione o il pranzo.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Conservare in luogo fresco e asciutto.', 'Questa formula sinergica di potenti antiossidanti è eccellente per la protezione cellulare e il supporto immunitario, particolarmente utile per chi pratica attività fisica intensa o vive in ambienti con elevato stress ossidativo.', false, false, false, '2025-06-24 16:37:11.023413', NULL, NULL, NULL, NULL);
INSERT INTO public.products VALUES (954, 'test-protein-bar', '45 Protein Bar', 11, 8, 'Barretta proteica da 18g di proteine con basso contenuto di zuccheri, perfetta come snack pre o post workout.', '45 Protein Bar è una barretta ad alto contenuto proteico e un basso tenore di zuccheri. Grazie alla sua composizione, che include il 40% di proteine di alta qualità provenienti da caseinato di calcio, proteine concentrate del siero del latte e proteine isolate della soia, è particolarmente indicata per coloro che desiderano aumentare o mantenere la massa muscolare durante il periodo di definizione. Gustosa e croccante, rappresenta una scelta ideale come spuntino pomeridiano o per soddisfare un attacco di fame, senza compromettere la dieta. La presenza di polioli al posto degli zuccheri tradizionali la rende perfetta per chi segue regimi alimentari controllati.', '{"titolo":"45 Protein Bar - tutti i gusti","valori_nutrizionali":{"per_100g":{"energia":"1537 kJ / 376 kcal","grassi":"13 g","di_cui_acidi_grassi_saturi":"6,8 g","carboidrati":"38 g","di_cui_zuccheri":"1,2 g","di_cui_polioli":"35 g","fibre":"1,4 g","proteine":"40 g","sale":"0,22 g"},"per_porzione":{"energia":"708 kJ / 169 kcal","grassi":"6,0 g","di_cui_acidi_grassi_saturi":"3,0 g","carboidrati":"17 g","di_cui_zuccheri":"0,5 g","di_cui_polioli":"16 g","fibre":"0,6 g","proteine":"18 g","sale":"0,10 g"}},"ingredienti":"Miscela proteica (proteine del latte, proteine concentrate del siero del latte); stabilizzante: sciroppo di maltitolo; copertura al cacao con edulcorante (15%) (edulcorante: maltitolo, grassi vegetali non idrogenati (palma, palmisito, karitè), cacao magro in polvere (2%), emulsionante: lecitina di girasole); umidificante: sciroppo di sorbitolo; collagene bovino idrolizzato; olio di semi di girasole; proteine isolate di soia; crispies proteici di soia (proteine isolate di soia)."}', 'Le modalità d''uso specifiche non sono state fornite nel testo.', 'Un consumo eccessivo può avere effetti lassativi. Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Conservare in luogo fresco e asciutto.', 'Questa barretta è un''ottima soluzione per chi cerca un elevato apporto proteico con pochi zuccheri, ideale per il mantenimento o l''aumento della massa muscolare, anche durante la definizione.', false, false, false, '2025-06-27 15:06:09.83434', NULL, 'Wafer Nocciola', '45', 'g');
INSERT INTO public.products VALUES (820, 'ashwagandha-pura-watt', 'Ashwagandha Pura', 20, 7, 'Estratto puro di Ashwagandha KSM-66 per il benessere mentale', 'Integratore alimentare a base di estratto secco di Ashwagandha KSM-66®. Tonico-adattogeno per supportare il rilassamento e il benessere mentale e le naturali difese dell''organismo. Ashwagandha Pura è un integratore a base di estratto secco di radice di Withania somnifera KSM-66®, standardizzato al 5% in withanolidi. L''Ashwagandha è tradizionalmente nota come tonico-adattogeno e viene impiegata per supportare il rilassamento, il benessere mentale e le naturali difese dell''organismo.', '{
    "valori_nutrizionali": {
      "dose": "1 dose = 2 capsule",
      "tabella": [
        {"componente": "Estratto di Ashwagandha", "quantita": "1.000 mg"},
        {"componente": "di cui withanolidi", "quantita": "50 mg"}
      ]
    },
    "ingredienti": "KSM-66® Ashwagandha° [estratto secco di ashwagandha (Withania somnifera (L.) Dunal) radice, 5% withanolidi], capsula vegetale (agente di rivestimento: idrossi-propil-metilcellulosa; stabilizzante: gomma di gellano)."
  }', 'Dosi consigliate: 1–2 capsule al giorno, preferibilmente alla sera, utile nei periodi di affaticamento mentale o fisico, oppure in caso di stress prolungato.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Conservare in luogo fresco e asciutto.', 'La standardizzazione in withanolidi garantisce l''efficacia di questo adattogeno, rendendolo ideale per chi cerca un supporto per il rilassamento, il benessere mentale e le difese naturali in periodi di stress.', false, false, false, '2025-06-24 16:37:11.023413', NULL, NULL, NULL, NULL);
INSERT INTO public.products VALUES (1028, 'super-dextrin-gel-pro', 'Super Dextrin Gel Pro', 22, 3, 'Gel energetico con carboidrati a rapporto 1:0.8 (glucosio:fruttosio) per la massima efficienza energetica durante l''attività.', 'Super Dextrin® Gel Pro è un gel energetico di nuova generazione con carboidrati in rapporto 1:0.8 (glu:fru), per massimizzare il flusso energetico. Il prodotto ha un efficace svuotamento gastrico, favorisce un elevato ingresso di carboidrati nell''organismo e permette un''ottimale distribuzione delle scorte energetiche. La speciale formula sfrutta la sinergia tra HBCD (Destrine Cicliche Altamente Ramificate = Cluster Dextrin® e SusCarb®), Maltodestrine DE6 e DE18, Palatinose™ e Fruttosio. Super Dextrin® Gel Pro è senza caffeina e non contiene glutine.', '{"titolo":"Super Dextrin Gel Pro","valori_nutrizionali":{"per_100_ml":{"valore_energetico":"318 kcal / 1328 kJ","grassi":"0.2 g","di_cui_saturi":"0 g","carboidrati":"77 g","di_cui_zuccheri":"45 g","proteine":"0.4 g","sale":"0 g"},"per_pack_60_ml":{"valore_energetico":"190 kcal / 795 kJ","grassi":"0.1 g","di_cui_saturi":"0 g","carboidrati":"46 g","di_cui_zuccheri":"27 g","proteine":"0.2 g","sale":"0 g"}},"ingredienti":"Acqua, Isomaltulosio° (Palatinose®), Fruttosio, Maltodestrine DE18, Destrina ciclica altamente ramificata (Cluster Dextrin®), Maltodestrine DE6, SusCarb® Dextrine, Succo concentrato di Limone, Acidificante: Acido Citrico; Alginato di sodio, Conservante: Sorbato di potassio; Aroma naturale (limone-lime).°L’isomaltulosio è una fonte di glucosio e di fruttosio."}', 'Durante l''attività: 1 pack ogni 1-1.5 ore, insieme a 100-150 ml di acqua.', 'Acqua, Isomaltulosio° (Palatinose®), Fruttosio, Maltodestrine DE18, Destrina ciclica altamente ramificata (Cluster Dextrin®), Maltodestrine DE6, SusCarb® Dextrine, Succo concentrato di Limone, Acidificante: Acido Citrico; Alginato di sodio, Conservante: Sorbato di potassio; Aroma naturale (limone-lime).°L''isomaltulosio è una fonte di glucosio e di fruttosio.', NULL, false, false, false, '2025-07-26 07:12:27.301384', NULL, 'Arancia', '60 ml - 15 pz', NULL);
INSERT INTO public.products VALUES (1189, 'beta-alanina-1000-mg', 'Beta Alanina 1000 mg', 25, 2, 'Integratore alimentare a base di Beta Alanina 1000 mg con istidina. Promuove la formazione di carnosina, contrasta la formazione dell''acido lattico.', 'Integratore alimentare per sportivi a base di Beta Alanina ed L-Istidina, in compresse da 1350mg. Utile per contrastare la formazione dell''acido lattico, soprattutto negli sport aerobici e di pesistica pesante, aumentando i livelli di carnosina nel muscolo. Numerosi studi hanno evidenziato infatti che la carnosina è in grado di inibire, in parte, gli effetti dell''acido lattico nei muscoli e garantire un miglioramento della performance. Aminoacido sintetizzato nel fegato, la beta alanina, con l''istidina, entrano nella composizione della carnosina (beta alanil-istidina) un dipeptide con importanti funzioni a livello muscolare. Sembra rappresentare l''agente limitante per la sintesi della carnosina, data la sua scarsa concentrazione nell''organismo. In altri termini, la somministrazione di beta alanina con istidina è un''ottima strategia per aumentare i livelli di carnosina negli organi dove questo dipeptide è presente. L''aumento di carnosina dopo somministrazione di beta alanina porta ad una esaltazione delle proprietà fisiologiche del dipeptide. Numerosi studi hanno evidenziato che la carnosina è in grado di inibire, in parte, gli effetti dell''acido lattico nei muscoli e garantire un miglioramento della performance.', '{"titolo":"Beta Alanina 1000 mg","per_porzione":{"descrizione":"Valori nutrizionali per porzione","valori":[{"componente":"Beta Alanina","valore":"3000 mg"},{"componente":"L-Istidina","valore":"240 mg"}]},"ingredienti":"Beta-Alanina (precursore della carnosina), cellulosa microcristallina, L-istidina, amido di mais pregelatinizzato, PVP, magnesio stearato vegetale, silice."}', 'Si consiglia di assumere 3 compresse al giorno con acqua.', NULL, NULL, false, false, false, '2025-08-04 08:14:27.490082', NULL, 'Unico', NULL, '120 capsule');
INSERT INTO public.products VALUES (1190, 'creatina-krealkalyn', 'Creatina Krealkalyn', 25, 2, 'Incrementa le prestazioni fisiche in caso di attività di elevata intensità, energetico formazione ATP. Contiene Kre-allkalyn original formula USA', 'Integratore alimentare di Creatina Monoidrato Kre-Alkalyn® (di proprietà della BR&D, USA). La creatina è un derivato degli aminoacidi naturalmente prodotto dall''organismo e contenuta in vari alimenti. Trasformata nella sua forma fosforilata è coinvolta nel mantenimento delle riserve energetiche cellulari. Kre-Alkalyn è un brevetto internazionale Bioceutical Research & Development Laboratory. La creatina incrementa le prestazioni fisiche in caso di attività ripetitive, di elevata intensità e di breve durata. Quindi indicata per allenamenti che prevedano serie ripetute di scatti a piedi o in bicletta, di vasche veloci a nuoto, di pesi, di balzi e quant''altro rientri nel paradigma dello sforzo breve, intenso e ripetuto. Kre-Alkalyn si avvale di una nuova tecnologia brevettata a modificazione di pH capace di far attraversare alla molecola il flusso sanguigno ed arrivare intatta al tessuto muscolare dove può esprimere tutto il suo potenziale.', '{"titolo":"Creatina Krealkalyn","per_porzione":{"descrizione":"Valori Nutrizionali","porzione":"3 capsule","porzioni_per_confezione":"40","valori":[{"componente":"Creatina (Kre-Alkalyn®)","valore":"2250 mg"}]},"ingredienti":"Creatina monoidrato (Kre-Alkalyn®), maltodestrine, magnesio stearato vegetale; capsula: gelatina."}', 'Si consiglia di assumere 4 capsule al giorno, da deglutire con acqua.', NULL, NULL, false, false, false, '2025-08-04 08:14:27.490082', NULL, 'Unico', NULL, '120 capsule');
INSERT INTO public.products VALUES (1022, 'vitamina-c-1000-ethicsport', 'Vitamina C 1000', 22, 7, 'Per il sistema immunitario, la protezione antiossidante e la formazione del collagene.', 'VITAMINA C 1000 è un integratore alimentare in capsule vegetali a base di Vitamina C (acido L-ascorbico), specificamente formulato per supportare le naturali difese dell''organismo e contribuire al benessere quotidiano. La Vitamina C è un micronutriente essenziale che svolge molteplici funzioni fisiologiche ed è particolarmente utile nei periodi di maggiore stress fisico o mentale, cambi di stagione, convalescenza o alimentazione disordinata.', '{"titolo":"Vitamina C 1000","per_porzione":{"descrizione":"Valori nutrizionali per porzione","porzione":"1 cap","valori":[{"componente":"VITAMINA C","valore":"1000 mg (1250% NRV)"}]},"ingredienti":"Acido L-ascorbico (Vitamina C), agente di carica: idrossipropilmetilcellulosa; agenti antiagglomeranti: sali di magnesio degli acidi grassi, biossido di silicio."}', 'Assumere 1 capsula al giorno, preferibilmente al pasto principale.', 'Acido L-ascorbico (Vitamina C), agente di carica: idrossipropilmetilcellulosa; agenti antiagglomeranti: sali di magnesio degli acidi grassi, biossido di silicio.', NULL, false, false, false, '2025-07-25 23:07:00.76853', NULL, 'Unico', '120 capsule', NULL);
INSERT INTO public.products VALUES (827, 'collagene-silicio-stabilizzato', 'Collagene+ Silicio Stabilizzato', 20, 7, 'Collagene idrolizzato con silicio per articolazioni e pelle', 'Integratore alimentare a base di VERISOL® (peptidi di collagene di tipo I e III), ORGONO® Living Silica (acido silicico), magnesio, vitamina C, zinco e vitamine del gruppo B. Collagene+ Silicio Stabilizzato è un integratore alimentare per il benessere di pelle, capelli, unghie, ossa e articolazioni formulato in polvere in una confezione da 30 dosi. Rigenerazione e protezione cellulare: I peptidi bioattivi di collagene stimolano la sintesi di collagene e proteggono i tessuti connettivi dagli effetti dello stress ossidativo. Con l''avanzare dell''età, il corpo produce sempre meno collagene, con una perdita significativa già a partire dai 40 anni. Collagene + Silicio Stabilizzato stimola la sintesi naturale di questa proteina strutturale, fondamentale per la tonicità e l''elasticità della pelle.', '{"valori_nutrizionali":{"dose":"1 dose = 4,5 g","tabella":[{"componente":"VERISOL® collagene idrolizzato","quantita":"3 g","vnr":"-"},{"componente":"ORGONO® Living Silica™ acido silicico","quantita":"348 mg","vnr":"-"},{"componente":"di cui Silicio","quantita":"10,4 mg","vnr":"-"},{"componente":"Magnesio","quantita":"110 mg","vnr":"29"},{"componente":"Vitamina C","quantita":"60 mg","vnr":"75"},{"componente":"Zinco","quantita":"10 mg","vnr":"100"},{"componente":"Niacina (Vitamina B3)","quantita":"8 mg","vnr":"50"},{"componente":"Acido pantotenico (Vitamina B5)","quantita":"6 mg","vnr":"100"},{"componente":"Acido folico (Vitamina B9)","quantita":"150 μg","vnr":"75"},{"componente":"Biotina (Vitamina B7)","quantita":"30 μg","vnr":"60"}]},"ingredienti":"collagene idrolizzato (VERISOL®*), magnesio lattato, acido silicico micro-incapsulato in gomma di acacia, zinco citrato, niacina (vitamina B3), acido pantotenico (vitamina B5), acido folico (vitamina B9), biotina (vitamina B7)."}', 'Dose giornaliera consigliata: 4,5 g al giorno (due misurini), preferibilmente al mattino. Utilizzo: Assumere con acqua o altra bevanda, accompagnando pasti principali.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Conservare in luogo fresco e asciutto.', 'Questa formula completa per il benessere di pelle, capelli, unghie, ossa e articolazioni, con collagene bioattivo, silicio e un mix di vitamine e minerali, è ideale per contrastare i segni dell''invecchiamento e supportare la rigenerazione cellulare.', false, false, false, '2025-06-24 16:38:16.727456', NULL, 'Neutro', '135g', '135');
INSERT INTO public.products VALUES (831, 'sali-electrolyte-pocket-minerals', 'Sali+ Electrolyte Pocket Minerals', 1, 7, 'Elettroliti in bustina con gusto Limone per idratazione ottimale', 'Sali+ Electrolyte Pocket Minerals è un integratore in polvere formulato per il reintegro di sali minerali persi con la sudorazione e per il mantenimento dell''equilibrio idrico durante l''attività fisica. Grazie alla combinazione di maltodestrine, fruttosio e Vitargo®, supporta il metabolismo energetico e favorisce una distribuzione bilanciata dell''energia nel tempo. L''aggiunta di vitamine C e B6 contribuisce alla riduzione della stanchezza e dell''affaticamento e supporta il normale funzionamento del sistema immunitario.', '{
    "valori_nutrizionali": {
      "dose": "1 dose = 40 g",
      "tabella": [
        {"componente": "Valore energetico", "quantita": "594 kJ / 140 kcal"},
        {"componente": "Grassi", "quantita": "0 g"},
        {"componente": "di cui: Acidi grassi saturi", "quantita": "0 g"},
        {"componente": "Carboidrati", "quantita": "34 g"},
        {"componente": "di cui: Zuccheri", "quantita": "6 g"},
        {"componente": "Proteine", "quantita": "0 g"},
        {"componente": "Sale", "quantita": "0,61 g"},
        {"componente": "Vitamina B6", "quantita": "1 mg (71% VNR)"},
        {"componente": "Vitamina C", "quantita": "51 mg (64% VNR)"},
        {"componente": "Magnesio", "quantita": "58 mg (16% VNR)"},
        {"componente": "Potassio", "quantita": "367 mg (18% VNR)"},
        {"componente": "Cloruro", "quantita": "333 mg (42% VNR)"}
      ]
    },
    "ingredienti": "Maltodestrine 76%, fruttosio 9%, acidificante: acido citrico; Vitargo® (amido di mais) 3%, correttore di acidità: citrato trisodico; potassio cloruro, aroma, magnesio citrato, agente antiagglomerante: tricalcium fosfato; acido L-ascorbico (vitamina C), edulcoranti: glicosidi dello steviolo (estratti da foglie di Stevia rebaudiana Bertoni), sucralosio; piridossina cloridrato (vitamina B6)."
  }', 'Durante l''attività sportiva o nei periodi di intensa sudorazione: sciogliere 1 bustina (40 g) in mezzo litro di acqua e consumare durante o dopo lo sforzo fisico. Per il mantenimento dell''idratazione e dell''equilibrio minerale: assumere una bustina secondo necessità.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Conservare in luogo fresco e asciutto.', 'Un pratico integratore in bustine, ideale per un rapido reintegro di sali minerali ed elettroliti durante e dopo l''attività fisica. La combinazione di carboidrati e vitamine B6 e C supporta l''energia e riduce la fatica, rendendolo un alleato indispensabile per l''idratazione e la performance.', false, false, false, '2025-06-24 16:49:56.558245', NULL, 'Arancia, Limone', '40g', '40');
INSERT INTO public.products VALUES (1024, 'super-dextrin-pro', 'Super Dextrin Pro', 22, 3, 'Super Dextrin PRO è un integratore energetico di nuova generazione con carboidrati a rilascio differenziato per la massima efficienza energetica.', 'Super Dextrin® Pro è un integratore alimentare energetico di nuova generazione con carboidrati in rapporto 1:0.8 (glu:fru), per massimizzare il flusso energetico. Il prodotto ha un efficace svuotamento gastrico, favorisce un elevato ingresso di carboidrati nell''organismo e permette un''ottimale distribuzione delle scorte energetiche. La speciale formula sfrutta la sinergia tra HBCD (Destrine Cicliche Altamente Ramificate = Cluster Dextrin® e SusCarb®), Maltodestrine DE6 e DE18, PalatinoseTM e Fruttosio. Super Dextrin® PRO è senza caffeina e non contiene glutine. La formula è brevettata e doping free tested*.', '{"titolo":"Super Dextrin Pro","valori_nutrizionali":{"per_100g":{"valore_energetico":"1640 Kj / 393 kcal","grassi":"0 g","di_cui_acidi_grassi_saturi":"0 g","carboidrati":"96 g","di_cui_zuccheri":"38 g","proteine":"0 g","sale":"0.03 g"},"per_porzione_60g":{"porzione":"60 g","valore_energetico":"984 kJ / 236 kcal","grassi":"0 g","di_cui_acidi_grassi_saturi":"0 g","carboidrati":"58 g","di_cui_zuccheri":"23 g","proteine":"0 g","sale":"0.02 g"}},"ingredienti":"Fruttosio, Maltodestrina DE18, Destrina ciclica altamente ramificata (SusCarb®), Isomaltulosio° (Palatinose™), Maltodestrina DE6 (Glucidex®), Destrine cicliche altamente ramificate (Cluster Dextrin®), correttore di acidità: acido citrico; aroma. °L’isomaltulosio è una fonte di glucosio e di fruttosio.","porzioni_per_confezione":14}', 'Sciogliere 60 g (circa 3 misurini) di polvere in 600 ml di acqua e assumere durante l''attività fisica. Dosare la quantità in funzione delle necessità e delle capacità digestive. L''assunzione di elevati carichi di carboidrati richiede un adeguato allenamento intestinale.', 'Fruttosio, Maltodestrina DE18, Destrina ciclica altamente ramificata (SusCarb®), Isomaltulosio° (Palatinose™), Maltodestrina DE6 (Glucidex®), Destrine cicliche altamente ramificate (Cluster Dextrin®), correttore di acidità: acido citrico; aroma. °L''isomaltulosio è una fonte di glucosio e di fruttosio.', NULL, false, false, false, '2025-07-25 23:07:01.24839', NULL, 'Unico', '840g', NULL);
INSERT INTO public.products VALUES (952, 'wafer-zero', 'Wafer Zero', 11, 8, 'Wafer proteico al 34% di proteine con ripieno al cacao e cioccolato bianco. Disponibile singolo da 35g o confezione da 24 pezzi per scorta.', 'Cialda di wafer ripiena e ricoperta, con edulcoranti.

Lasciati conquistare dalla croccantezza di una deliziosa cialda di wafer, avvolta da un vellutato strato di cioccolato e arricchita da un cuore cremoso e proteico.
Con un elevato contenuto di proteine, ricca di fibre e povera di zuccheri, è la coccola perfetta per chi cerca uno spuntino goloso ma proteico.', '{"titolo":"Wafer Zero - Cocco fondente","dettagli_prodotto":"24 pezzi","valori_nutrizionali":{"per_100g":{"energia":"2068 kJ / 498 kcal","grassi":"32 g","di_cui_acidi_grassi_saturi":"12 g","carboidrati":"17 g","di_cui_zuccheri":"4,5 g","di_cui_polioli":"5,0 g","fibre":"15 g","proteine":"30 g","sale":"0,02 g"},"per_porzione":{"porzione":"1 wafer (35 g)","energia":"724 KJ / 174 kcal","grassi":"11 g","di_cui_acidi_grassi_saturi":"4,2 g","carboidrati":"6,0 g","di_cui_zuccheri":"1,6 g","di_cui_polioli":"1,8 g","fibre":"5,3 g","proteine":"10,5 g","sale":"0,0 g"}},"ingredienti":"proteine del latte; olio di girasole alto oleico; cioccolato con edulcoranti; frutto-oligosaccaridi; cioccolato bianco con edulcorante; collagene idrolizzato; burro di cacao; latte intero in polvere; farina di riso; fecola di patate; emulsionante: lecitina di girasole; farina di cocco rapè (0,5%); amido di mais; farina di quinoa; estratto di vaniglia; aroma; edulcorante: sucralosio; agenti lievitanti: bicarbonato di sodio, bicarbonato di ammonio. Può contenere uova, frutta a guscio (pistacchi, nocciole), arachidi. SENZA GLUTINE."}', 'Consumalo come spuntino a metà mattina, nel pomeriggio o dopo l’allenamento per ricaricarti con gusto e nutrienti. Ottimo anche come dolce post pasto senza sensi di colpa!', '<div class="warning-box">
<h4>⚠️ Avvertenze</h4>
<ul>
<li>Senza glutine ma può contenere tracce</li>
<li>Contiene proteine del latte</li>
<li>Conservare in luogo fresco e asciutto</li>
<li>Proteggere da umidità per mantenere croccantezza</li>
<li>Non superare 2 wafer al giorno</li>
</ul>
</div>', '<div class="expert-tip">
<h4>💡 Consiglio dell''Esperto</h4>
<p>I wafer proteici hanno una texture unica che favorisce la masticazione lenta e aumenta la sazietà. Il formato 24 pezzi è conveniente per famiglie o per avere sempre una scorta di snack proteici sani.</p>
</div>', false, false, false, '2025-06-27 14:38:25.098545', NULL, NULL, NULL, NULL);
INSERT INTO public.products VALUES (1194, 'hmb-3000', 'HMB 3000', 25, 2, 'H-MB 3000 Integratore alimentare a base di Ca- HMB.', 'H-MB 3000 Integratore alimentare a base di Ca- HMB in compresse da 1000 mg cadauna.Il prodotto non contiene lattosio', '{"titolo":"HMB 3000","per_porzione":{"descrizione":"Valori nutrizionali per dose","porzione":"3 compresse","valori":[{"componente":"HMB","valore":"3000 mg"}]},"ingredienti":"Calcio Idrossimetilbutirrato (HMB), Agenti di carica: Cellulosa microcristallina e Calcio Difosfato, Emulsionante: Mono-Digliceridi di Acidi Grassi, Antiagglomerante: Magnesio Stearato"}', 'Assumere tre compresse al giorno con un bicchiere d''acqua.', NULL, NULL, false, false, false, '2025-08-04 08:15:17.643588', NULL, 'Unico', NULL, '90 capsule');
INSERT INTO public.products VALUES (1195, 'leucina-1000-mg', 'Leucina 1000 mg', 25, 2, 'pre/post workout anticatabolicoe recupero. Integratore a base di l-leucina di origine vegetale con Vit B6', 'Integratore alimentare a base dell''aminoacido L-Leucina e Vitamina B6. La L-Leucina rappresenta il più importante tra i BCAA e negli ultimi anni si è visto come un aumento della sua integrazione possa favorire e migliorare l''azione di recupero, anticatabolica ed energetica dello sportivo. L''aggiunta della Vitamina B6 contribuisce al normale metabolismo energetico, alla riduzione della stanchezza, dell''affaticamento ed alla regolazione dell''attività ormonale e del metabolismo delle proteine e del glicogeno. Ogni capsula apporta 1000 mg di purissima L-Leucina ed è consigliato un dosaggio da 5 capsule giornaliere da assumersi preferibilmente prima o dopo l''attività fisica.', '{"titolo":"Leucina 1000 mg","per_porzione":{"descrizione":"Valori nutrizionali per dose massima giornaliera","porzione":"5 compresse","valori":[{"componente":"Vitamina B6","valore":"1,4 mg (100% VNR)"},{"componente":"L-Leucina","valore":"5 g"}]},"ingredienti":"L-Leucina, Cellulosa microcristallina, Calcio Fosfato, Antiagglomerante: Magnesio Stearato, Piridossina Cloridrato (Vitamina B6)."}', 'Assumere 5 compresse al giorno con acqua prima dell''allenamento.', NULL, NULL, false, false, false, '2025-08-04 08:15:17.643588', NULL, 'Unico', NULL, '120 capsule');
INSERT INTO public.products VALUES (1196, 'lisina', 'Lisina', 25, 2, 'Integratore a base di lisina in polvere con lisina al 100%.', 'La lisina è un aminoacido essenziale che contribuisce alla corretta crescita muscolare. L-LISINA è un aminoacido essenziale puro con lisina al 100% in polvere. L-LISINA conteine 3000 mg di lisina per dose. La lisina contribuisce alla formazione di molte sostanze utili per il nostro organismo e contribuisce alla formazione di collagene.', '{"titolo":"Lisina","per_porzione":{"descrizione":"Valori nutrizionali per porzione","valori":[{"componente":"L-Lisina","valore":"1000 mg"}]},"ingredienti":"Lisina (Lysine)."}', 'Sciogliere un misurino (3 g) di prodotto in 150/200 ml d''acqua e bere una volta al giorno.', NULL, NULL, false, false, false, '2025-08-04 08:15:17.643588', NULL, 'Unico', NULL, '300gr');
INSERT INTO public.products VALUES (1198, 'ashwagandha-forte-500-mg', 'Ashwagandha Forte 500mg', 25, 7, 'Integratore alimentare a base di Ashwagandha.', 'L''Ashwagandha è un arbusto che cresce in medio oriente ed in africa. Il suo nome botanico è Whitania somnifera ed è anche conosciuta come ginseng indiano. I principi attivi sono conosciuti come withanolidi. Alcuni studi suggerirebbero che l''ashwagandha potrebbe aiutare a ridurre lo stress e l''ansia, migliorare la qualità del sonno e la funzione cerebrale. L''Ashwagandha è un tonico adattogeno.', '{"titolo":"Ashwagandha Forte 500mg","per_porzione":{"descrizione":"Valori nutrizionali per porzione","valori":[{"componente":"Ashwaganda","valore":"500 mg"}]},"ingredienti":"Ashwaganda (Withania Somnifera - Radice, e.s. Tit. al 1,5% in Whitanosidi), Agenti di carica: Cellulosa microcristallina e Calcio Difosfato, Antiagglomeranti: Mono-Digliceridi di Acidi Grassi e Magnesio Stearato."}', 'Assumere una compressa al giorno con un bicchiere d''acqua.', NULL, NULL, false, false, false, '2025-08-04 08:15:17.643588', NULL, 'Unico', NULL, '60 capsule');
INSERT INTO public.products VALUES (1197, 'ornitina-akg', 'Ornitina AKG', 25, 2, 'integratore alimentare di Ornitina Akg (Alfaketoglutarato).', 'L''ornitina è un aminoacido che da sostegno all''organismo per aumentare la forza e la massa magra. ORNITINA AKG contribuisce alla riduzione della massa grassa e sostiene il sistema immunitario. Contiene 2000 mg di ornitina per dose.', '{"titolo":"Ornitina AKG","per_porzione":{"descrizione":"Valori nutrizionali per dose giornaliera","porzione":"5 compresse","valori":[{"componente":"L-arginina HCI","valore":"1800 mg"},{"componente":"L-ornitina alfachetoglutarato","valore":"900 mg"},{"componente":"L-lisina HCl","valore":"350 mg"},{"componente":"L-glicina","valore":"100 mg"},{"componente":"L-triptofano","valore":"300 mg"},{"componente":"Quercetina","valore":"100 mg"},{"componente":"Acido gamma amminobutirrico","valore":"750 mg"},{"componente":"Estratto di Valeriana","valore":"50 mg"},{"sottocomponente":"di cui acido valerenico","valore":"0,21 mg"},{"componente":"Melatonina","valore":"1 mg"}]},"ingredienti":"L – arginina HCl; agente di carica: cellulosa microcristallina (E460i); L – ornitina alfachetoglutarato (OKG); acido gamma amminobutirrico (GABA); L – lisina HCl; L – triptofano; agenti antiagglomeranti: sali di magnesio degli acidi grassi (di origine vegetale) (E470b); biossido di silicio (E551); quercetina (Saphora Japonica L.,fiori); L – glicina; L – citrullina DL malato 2:1; e.s. tit. valeriana (Valeriana officinalis L., radice); melatonina."}', 'Assumere 5 compresse al giorno', NULL, NULL, false, false, false, '2025-08-04 08:15:17.643588', NULL, 'Unico', NULL, '60 capsule');
INSERT INTO public.products VALUES (1253, 'leucine-1000', 'Leucine', 23, 2, 'LEUCINE 1000 è un integratore alimentare di L-Leucina adatto ad integrare al dieta degli sportivi. Non contiene ingredienti di origine animale.', 'LEUCINE 1000 è un integratore alimentare di L-Leucina adatto ad integrare al dieta degli sportivi. Non contiene ingredienti di origine animale.', '{"titolo":"Leucina 1000 mg","per_porzione":{"descrizione":"Informazioni nutrizionali per porzione","porzione":"1 PORZIONE = 5 COMPRESSE","valori":[{"componente":"L-Leucina","valore":"5000 mg"}]},"ingredienti":"L-Leucina; Stabilizzante: Cellulosa microcristallina, Antiagglomeranti: biossido di silicio, sali di magnesio degli acidi grassi (origine vegetale)."}', 'Deglutire 5 compresse al giorno con acqua o altro liquido a scelta 30-40 minuti prima degli allenamenti o competizioni. Nelle giornate in cui non si pratica attività sportiva il prodotto può essere assunto in qualsiasi momento della giornata.', NULL, NULL, false, false, false, '2025-08-04 09:00:40.059302', NULL, 'Unico', '120 compresse', '120 compresse');
INSERT INTO public.products VALUES (1185, 'acido-d-aspartico', 'Acido D-Aspartico', 25, 7, 'Integratore alimentare in compresse a base di Acido Aspartico.', 'Integratore alimentare a base di acido D-aspartico indicato nei casi di ridotto apporto con la dieta o di aumento del fabbisogno di questo nutriente. L''acido D-aspartico è un aminoacido presente naturalmente nell''organismo umano, particolarmente concentrato nelle ghiandole endocrine e nel sistema nervoso centrale. Questo aminoacido svolge un ruolo importante nella regolazione della sintesi di alcuni ormoni e neurotrasmettitori. L''acido D-aspartico è la forma destrogira dell''acido aspartico, strutturalmente differente dal più comune L-aspartico utilizzato nella sintesi proteica. La supplementazione con acido D-aspartico può essere utile per supportare le funzioni fisiologiche dell''organismo, in particolare nei periodi di maggiore stress psico-fisico o quando l''apporto alimentare risulta insufficiente rispetto alle necessità individuali.', '["**VALORI NUTRIZIONALI**","| Componente | Per porzione (3 cpr) |","| --- | --- |","| D-Acido Aspartico | 3.000 mg |","| Acido pantotenico (25% VNR) | 1,5 mg |","| Vit. B6 (30% VNR) | 0,42 mg |","| Zinco (30% VNR) | 3 mg |","| Rame (30% VNR) | 0,3 mg |","","**INGREDIENTI**","Acido D-aspartico, Cellulosa microcristallina, Calcio difosfato, Antiagglomeranti: Magnesio stearato E470 (b), Mono e digliceridi degli acidi grassi E471.","","**MODALITÀ D''USO**","Deglutire una porzione = 3 compresse durante la giornata con acqua o altro liquido a scelta."]', 'Assumere 3 compresse al giorno con acqua.', NULL, NULL, false, false, false, '2025-08-04 07:41:24.546111', 33, 'Unico', '90 compresse', '30 porzioni');
INSERT INTO public.products VALUES (1140, 'power-whey-amino-support', 'Power Whey Amino Support', 23, 1, 'POWER WHEY AMINO SUPPORT è un integratore alimentare di proteine con aminoacidi, a solubilità istantanea e di ottimo gusto.', 'POWER WHEY AMINO SUPPORT è un integratore alimentare di proteine con aminoacidi, a solubilità istantanea e di ottimo gusto. POWER WHEY AMINO SUPPORT è formulato con proteine del siero di latte, proteine di elevato valore biologico. Le proteine contribuiscono alla crescita e al mantenimento della massa muscolare. Alla sua formula proteica abbiamo aggiunto L-glutammina, Creatina, aminoacidi e Vitamina B6, per renderla particolarmente indicata nell''alimentazione dello sportivo, sia di chi fa bodybuilding che altri sport. La vitamina B6 è stata inclusa per contribuire al normale metabolismo delle proteine e del glicogeno e alla riduzione della stanchezza e dell''affaticamento. POWER WHEY AMINO SUPPORT è adatto ai vegetariani.

Modalità d''uso: Assumere una porzione da 30 g (2 misurini) al giorno miscelata con 220 ml di acqua o altro liquido a scelta. Il volume di liquido aggiunto influisce sull''intensità del gusto e sulla densità del preparato, non influisce sulla digeribilità o assimilabilità. Assumere il prodotto come spuntino durante la giornata, lontano dai pasti principali, oppure dopo gli allenamenti o attività sportiva.

Ingredienti: Proteine del siero di LATTE concentrate [emulsionante: lecitina (contiene SOIA)]; Proteine del siero di LATTE; Mix amino support (L-Glutammina, L-Lisina, L-Treonina, L-Glicina, Creatina monoidrato); Addensante: E1200; Aromi; Sale; Edulcorante: sucralosio; Piridossina cloridrato (Vitamina B6).', '["Valori Nutrizionali per porzione:", "1 PORZIONE = 2 MISURINI COLMI (30g) ", "Valore energetico  458 kJ/108 kcal", "Grassi  1,4 g", "di cui acidi grassi saturi  1 g", "Carboidrati  2,9 g", "di cui zuccheri  2,6 g", "Proteine  21 g", "Sale  0,16 g", "Vitamina B6 (30% VNR)  0,42 mg", "Creatina  1500 mg", "L-Lisina  2000 mg", "L-Treonina  2000 mg", "L-Glicina  2000 mg", "Glutammina  2000 mg", "", "Valori Nutrizionali per 100g:", "Valore energetico  1529 kJ/361 kcal", "Grassi  4,8 g", "di cui acidi grassi saturi  3,2 g", "Carboidrati  9,5 g", "di cui zuccheri  8,5 g", "Proteine  70 g", "Sale  0,53 g", "Vitamina B6 (30% VNR)  1,4 mg", "", "VNR = valori nutritivi di riferimento"]', 'Assumere una porzione da 30 g (2 misurini) al giorno miscelata con 220 ml di acqua o altro liquido a scelta.', 'Ingredienti: Proteine del siero di LATTE concentrate [emulsionante: lecitina (contiene SOIA)]; Mix amino support; Aromi; Sale; Edulcorante: sucralosio; Piridossina cloridrato (Vitamina B6).', NULL, false, false, false, '2025-08-04 07:27:48.221421', 16, 'Vaniglia', '1kg', '1000g');
INSERT INTO public.products VALUES (947, 'protein-cream', 'Protein Cream', 6, 8, 'Crema proteica spalmabile al 50% di proteine, perfetta per dolci sani e spuntini golosi. Disponibile nei gusti cacao e gianduia in formato da 250g.', 'PROTEIN CREAM è una deliziosa crema spalmabile al gusto pistacchio con proteine vegetali senza zuccheri aggiunti. Prodotto vegano.
Crema proteica spalmabile al pistacchio per la tua colazione, i tuoi spuntini veloci e tutte le volte che vuoi gustare qualcosa di buono e sano.

PROTEIN CREAM contiene il 30% di pistacchi, proteine di origine vegetale, è priva di glutine e adatta ad una dieta vegana, con olio extra vergine di oliva.', '{"titolo":"Protein Cream","gusti":"Pistacchio","prezzo":"12,90€","descrizione":"Crema spalmabile al pistacchio, con 30% di pistacchi e proteine di origine vegetale. Priva di glutine, adatta per diete vegane e con olio extra vergine di oliva.","valori_nutrizionali":{"per_100g":{"valore_energetico":"472 kcal / 1957 kj","grassi":"31 g","di_cui_saturi":"3,7 g","carboidrati":"28 g","di_cui_zuccheri":"3 g","di_cui_polioli":"22 g","fibre":"6,9 g","proteine":"24 g","sale":"0,12 g"}},"ingredienti":"pistacchi (30%), proteine vegetali, edulcorante maltitolo, olio extra vergine di oliva, olio di semi di girasole, emulsionante: lecitina di girasole."}', 'Porzione consigliata: 20-30g.
Quando utilizzare: Colazione, spuntino, post-allenamento, dolci fit.
Modalità: Mescolare bene prima dell''uso e spalmare uniformemente.
Conservazione: In frigorifero dopo l''apertura e consumare entro 30 giorni.', '<div class="warning-box">
<h4>⚠️ Avvertenze</h4>
<ul>
<li>Conservare in luogo fresco e asciutto</li>
<li>Tenere fuori dalla portata dei bambini</li>
<li>Può contenere tracce di frutta a guscio e soia</li>
<li>Da consumare entro la data di scadenza</li>
<li>Mescolare bene prima dell''uso</li>
</ul>
</div>', '<div class="expert-tip">
<h4>💡 Consiglio dell''Esperto</h4>
<p>Ideale per la colazione proteica spalmata su pane integrale o per preparare dolci fit. Conservare in frigorifero dopo l''apertura per mantenere la consistenza ottimale.</p>
</div>', false, false, false, '2025-06-27 14:37:12.991208', NULL, NULL, NULL, NULL);
INSERT INTO public.products VALUES (1013, 'magnesium-glycinate', 'MAGNESIUM GLYCINATE', 22, 7, 'Magnesio in forma organica con eccellente tollerabilità, adatta anche per assunzioni prolungate', 'MAGNESIUM GLYCINATE® è un integratore alimentare in capsule vegetali a base di magnesio bisglicinato, una forma organica ottenuta attraverso l''unione del magnesio con l''amminoacido glicina.
Questa forma è particolarmente stabile e ben tollerata, nota per la buona assimilazione a livello intestinale e indicata anche per utilizzi prolungati. Il magnesio svolge numerose funzioni fondamentali per l''organismo: contribuisce alla riduzione della stanchezza e dell''affaticamento¹, al normale metabolismo energetico² e al normale funzionamento del sistema nervoso³. Partecipa alla normale funzione muscolare⁵, psicologica⁴, al mantenimento di ossa⁶ e denti⁷ normali, oltre a supportare l''equilibrio elettrolitico⁸.
Il prodotto è senza glutine e zuccheri aggiunti, adatto anche a diete vegane e doping free tested*.', '{"titolo":"Magnesium Glycinate","per_porzione":{"descrizione":"Valori nutrizionali per porzione","porzione":"3 caps","valori":[{"componente":"MAGNESIO","valore":"400 mg (120% NRV)"}]},"ingredienti":"Bisglicinato di magnesio (magnesio), inulina, agente di carica: idrossipropilmetilcellulosa; Agente antiagglomerante: sali di magnesio degli acidi grassi."}', 'Assumere 1 dose (3 capsule) al giorno, preferibilmente lontano dai pasti principali.', 'Bisglicinato di magnesio (magnesio), inulina, agente di carica: idrossipropilmetilcellulosa; Agente antiagglomerante: sali di magnesio degli acidi grassi', NULL, false, false, false, '2025-07-25 22:58:30.694995', NULL, 'Unico', '90 capsule', NULL);
INSERT INTO public.products VALUES (1240, 'omega-3-pro', 'Omega 3 Pro', 25, 7, 'Pure Omega 3 È un integratore dietetico in grado di apportare gli acidi grassi contenuti nell''olio di pesce, in particolare omega 3 e vitamina E naturale.', 'Integratore alimentare a base di olio di pesce concentrato ricco in acidi grassi omega-3 EPA (acido eicosapentaenoico) e DHA (acido docosaesaenoico). Gli acidi grassi omega-3 sono essenziali per il corretto funzionamento dell''organismo e svolgono importanti funzioni biologiche. L''EPA e il DHA contribuiscono alla normale funzione cardiaca, mentre il DHA contribuisce al mantenimento della normale funzione cerebrale e della capacità visiva. Questi effetti benefici si ottengono con l''assunzione giornaliera di 250 mg di EPA e DHA.', '{"titolo":"Omega 3 Super","valori_nutrizionali":{"per_porzione":{"porzione":"3 softgel","porzioni_per_confezione":82,"olio_di_pesce":"3030 mg","epa":"546 mg","dha":"363 mg","vitamina_e":"15 mg (125% VNR)"}},"ingredienti":"Olio di Pesce (da engraulis ringens/sardina), Involucro capsula (Gelatina, Umettante: Glicerina, Acqua).","nota":"*VNR: Valori Nutritivi di Riferimento"}', 'Assumere 3 softgel al giorno con un bicchiere d''acqua.', NULL, NULL, false, false, false, '2025-08-04 08:41:37.857118', 46, 'Unico', '/images/products/omega-3-super-60-perle.jpg', '60 perle');
INSERT INTO public.products VALUES (1395, 'arginine-no-premier', 'Arginine NO', 6, 2, 'ARGININE NO è un integratore alimentare in compresse di L-Arginina (Kyowa), selenio e vitamina B6.', 'ARGININE NO è un integratore alimentare in compresse di L-Arginina (Kyowa), selenio e vitamina B6. ARGININE NO è indicato per integrare l''alimentazione dello sportivo soprattutto in caso di attività ﬁsiche intense e prolungate. ARGININE NO non contiene glutine.
ARGININE NO è un integratore alimentare in compresse di L-Arginina (Kyowa), selenio e vitamina B6. ARGININE NO è indicato per integrare l''alimentazione dello sportivo soprattutto in caso di attività ﬁsiche intense e prolungate. ARGININE NO non contiene glutine.

L''uso di Arginina in ambito sportivo è soprattutto legato al suo ruolo di antiossidante ed immunomodulante, importante soprattutto durante allenamenti particolarmente intensi e competizioni prolungate.

Non trascurabile anche il potenziale ruolo ergogenico, legato all''attività gluconeogenica dell''Arginina, e il ruolo detossificante nei confronti delle scorie azotate, solitamente più elevate negli sportivi.', '{"titolo":"Integratore Arginina e Vitamine","valori_nutrizionali":{"per_porzione":{"porzione":"3 compresse","l_arginina":"3 g","vitamina_b6":"2,1 mg (150% VNR)","selenio":"75 mcg (135% VNR)"}},"ingredienti":"L-Arginina, Stabilizzanti: biossido di silicio, sali di magnesio degli acidi grassi, Polivinilpirrolidone; Agente di carica: cellulosa microcristallina; Selenio chelato tit. 0,2%, Vitamina B6 (cloridrato di piridossina).","nota":"VNR = Valori nutritivi di riferimento"}', 'Assumere ﬁno a 3 compresse al giorno in funzione dell''entità globale dello sforzo muscolare.', NULL, NULL, false, false, false, '2025-09-01 16:32:44.863361', 70, 'Unico', '90 compresse', NULL);
INSERT INTO public.products VALUES (1027, 'caffeina-suprema', 'Caffeina Suprema', 22, 7, 'Integratore alimentare a base di caffeina con estratto di galanga, taurina e vitamine. Caffeina 200mg/dose.', 'Caffeina Suprema® è un integratore alimentare dalla formula innovativa che unisce caffeina in forma libera e caffeina microincapsulata (NEWCAFF™ microcapsules) per ottenere un''ottimale distribuzione del suo effetto. La caffeina (200 mg/dose die) contribuisce ad aumentare la lucidità mentale e aiuta a migliorare la concentrazione. La formula contiene inoltre taurina, teanina, vitamine ed estratto di Galanga. EnXtra® (estratto concentrato di Alpinia Galanga), insieme alla Teanina, genera un''azione fortemente sinergica con la caffeina. Gli studi attribuiscono a questa associazione un''azione benefica su concentrazione e lucidità mentale, con un effetto costante e prolungato.', '["<table class=\"nutritional-table\">\n      <thead><tr><th>Componente</th><th>Per 1 cps</th><th>%NRV</th></tr></thead>\n      <tbody>\n        <tr><td>Caffeina</td><td>150 mg</td><td>-</td></tr>\n        <tr><td>Caffeina microincapsulata</td><td>66.64 mg</td><td>-</td></tr>\n        <tr><td>di cui caffeina</td><td>50 mg</td><td>-</td></tr>\n        <tr><td>Galanga estratto secco</td><td>150 mg</td><td>-</td></tr>\n        <tr><td>Taurina</td><td>100 mg</td><td>-</td></tr>\n        <tr><td>Teanina da estratto di tè verde</td><td>70 mg</td><td>-</td></tr>\n        <tr><td>Vitamina C</td><td>100 mg</td><td>125%</td></tr>\n        <tr><td>Tiamina (vitamina B1)</td><td>1,1 mg</td><td>100%</td></tr>\n        <tr><td>Riboflavina (vitamina B2)</td><td>1,4 mg</td><td>100%</td></tr>\n        <tr><td>Niacina</td><td>32 mg</td><td>200%</td></tr>\n      </tbody>\n    </table>"]', 'Assumere 1 cps al giorno, preferibilmente al mattino o poco prima di un''attività intensa.', 'Caffeina, galanga (alpinia galanga (l.) Willd.) Estratto secco di rizoma (EnXtra®), agente di carica: ipromellosa; acido l-ascorbico (vitamina c), taurina, maltodestrina, teanina da estratto di tè verde, caffeina microincapsulata (microcapsule NEWCAFF™).', NULL, false, false, false, '2025-07-26 07:12:27.052135', NULL, 'Unico', '30 capsule', NULL);
INSERT INTO public.products VALUES (1018, 'testogen', 'Testogen', 22, 7, 'CONTRIBUISCE AL MANTENIMENTO DI NORMALI LIVELLI DI TESTOSTERONE NEL SANGUE GRAZIE ALLA PRESENZA DI ZINCO.', 'Testogen® è un integratore alimentare di policosanoli, zinco, vitamina C e magnesio, con Tribulus terrestris (tit 60%) e polifenoli concentrati di origine naturale. La presenza di Tribulus terrestris svolge una funzione tonica e può essere utile nei casi di stanchezza fisica e mentale. Lo zinco e la vitamina C contribuiscono alla protezione delle cellule dallo stress ossidativo, mentre il magnesio e la vitamina B6 aiutano a contrastare stanchezza e affaticamento. Lo zinco inoltre contribuisce al mantenimento di normali livelli di testosterone nel sangue. Il prodotto non contiene glutine (Gluten Free) è pertanto indicato anche per soggetti celiaci o con intolleranza al glutine.', '{"titolo":"Testogen","per_porzione":{"descrizione":"Valori nutrizionali per dose","porzione":"4 caps","valori":[{"componente":"TRIBULUS TERRESTRIS, FRUTTO E.S. TIT. 60% IN SAPONINE","valore":"1000 mg"},{"componente":"VINITROXIM","valore":"70 mg"},{"sottocomponente":"DI CUI POLIFENOLI","valore":"66.5 mg"},{"componente":"POLICOSANOLI DA RISO","valore":"7.2 mg"},{"componente":"ZINCO","valore":"8 mg (80% NRV)"},{"componente":"MAGNESIO","valore":"263 mg (70% NRV)"},{"componente":"VITAMINA C","valore":"48 mg (60% NRV)"},{"componente":"VITAMINA B6","valore":"0.84 mg (60% NRV)"}]},"ingredienti":"Tribulus terrestris frutto e.s. tit. 60% saponine, Magnesio ossido, Vitamina C, Zinco gluconato, Policosanoli da riso, Vitamina B6."}', '4 capsule al giorno. Una confezione è sufficiente per un ciclo di 1 mese, ripetibile più volte durante l''anno.', 'Tribulus terrestris (Tribulus terrestris L.) frutto e.s. tit. 60% saponine; Agenti di carica: cellulosa microcrocristallina, fosfato dicalcico; Ossido di magnesio; Agenti di rivestimento: idrossi-propil-metilcellulosa, talco; Vinitrox™ [polifenoli da Vite (Vitis vinifera L.) frutto e.s.; Mela (Malus pumila Mill.) falso frutto (pomo) e.s.]; Vitamina C (acido L-ascorbico); Stabilizzanti: mono e digliceridi degli acidi grassi, idrossi-propil-metilcellulosa, polietilenglicole, glicerolo; Agenti antiagglomeranti: biossido di silicio, sali di magnesio degli acidi grassi; Gluconato di zinco; Coloranti: carbonato di calcio, ossidi e idrossidi di ferro; Policosanoli da riso; Vitamina B6 (cloridrato di piridossina).', NULL, false, false, false, '2025-07-25 23:06:59.778179', NULL, 'Unico', '120 capsule', NULL);
INSERT INTO public.products VALUES (1023, 'vitamina-d3-2000-iu', 'Vitamina D3 2000 IU', 22, 7, 'Per il mantenimento di ossa forti, una normale funzione muscolare e buone difese immunitarie.', 'La Vitamina D3 è un nutriente essenziale che contribuisce al normale assorbimento/utilizzo del calcio e del fosforo, al mantenimento di normali livelli di calcio nel sangue, al mantenimento di ossa normali, alla normale funzione del sistema immunitario e dei muscoli. Questo integratore fornisce 2000 UI (50 μg) di vitamina D3 per softgel, un dosaggio ottimale per il mantenimento di livelli adeguati nell''organismo.', '{"titolo":"Vitamina D3 2000 IU","valori_nutrizionali":{"per_softgel":{"vitamina_d":"50 μg / 2000 IU (1000% VNR)"}},"ingredienti":"Olio di girasole, gelatina, umidificanti: glicerolo; acqua purificata, colecalciferolo (Vitamina D)."}', 'Assumere 1 capsula al giorno.', 'Olio di semi di girasole, Agente di rivestimento: gelatina; Umettante: glicerolo; Vitamina D3 (colecalciferolo).', NULL, false, false, false, '2025-07-25 23:07:01.009757', NULL, 'Unico', '60 capsule', NULL);
INSERT INTO public.products VALUES (1020, 'collagene-ethicsport', 'Collagene', 22, 7, 'Collagene idrolizzato puro in compresse, facilmente dosabile e indicato per integrare selettivamente questa proteina strutturale presente nella pelle, nei tessuti connettivi e nelle cartilagini.', 'COLLAGENE® è un integratore alimentare in compresse, a base di collagene idrolizzato di origine bovina, sottoposto a un processo specifico di idrolisi enzimatica. Il collagene è una proteina naturalmente presente nell''organismo, in particolare nei tessuti connettivi, dove svolge un ruolo di componente strutturale.
L''integrazione può risultare utile in regimi alimentari controllati o in situazioni in cui l''apporto di specifici componenti proteici risulti quantitativamente o qualitativamente limitato.
La formulazione in compresse consente un dosaggio frazionabile e adatto a utilizzi ciclici o continuativi, secondo necessità individuali. Il prodotto è senza glutine, senza zuccheri aggiunti e doping free tested.', '["<table class=\"nutritional-table\">\n      <thead><tr><th>Componente</th><th>3 compresse</th></tr></thead>\n      <tbody>\n        <tr><td>Collagene idrolizzato</td><td>3000 mg</td></tr>\n      </tbody>\n    </table>"]', 'Assumere 1 dose (3 compresse) fino a due volte al giorno, con acqua. Modalità d''uso personalizzabili secondo esigenze specifiche.', 'Idrolizzato di collagene (bovino), agenti antiagglomeranti: diossido di Silicio, sali di magnesio degli acidi grassi.', NULL, false, false, false, '2025-07-25 23:07:00.282383', NULL, 'Unico', '90 compresse', NULL);
INSERT INTO public.products VALUES (1188, 'arginina-piroglutammato-e-lisina', 'Arginina Piroglutammato e Lisina', 25, 2, 'Integratore alimentare a base di arginina piroglutammato e lisina nel rapporto ottimale 2 a 1. Consigliata per il recupero e contrasta la stanchezza.', 'Integratore alimentare a base di arginina piroglutammato e lisina indicato nei casi di ridotto apporto con la dieta di questi nutrienti o di aumento del loro fabbisogno. Il prodotto può favorire la produzione di ossido nitrico, l''eliminazione delle scorie azotate durante intensi allenamenti e aumentare le naturali difese dell''organismo. Essendo costituito da una associazione di due aminoacidi, arginina piroglutammato e lisina cloridrato nel rapporto ottimale di 2 a1, risulta un prodotto molto richiesto ed utilizzato dagli sportivi di varie discipline. La L-arginina è un aminoacido semi essenziale. Le funzioni biologiche della L-arginina potrebbero essere riassunte nei seguenti punti: precursore dell''ossido nitrico, azione antiossidante, detossificazione dei residui azotati (l''arginina partecipa al ciclo dell''urea), precursore della creatina, supporta il sistema immunitario (l''arginina è coinvolta nella produzione delle cellule del sistema immunitario come i linfociti T), partecipazione alla sintesi delle proteine, il ripristino e il mantenimento dei tessuti muscolari. La lisina è un aminoacido essenziale, quindi il nostro organismo non riesce a produrlo. La lisina è indispensabile per la sintesi proteica, fondamentale per la crescita, lo sviluppo , la riparazione dei tessuti oltre che per la produzione di enzimi, ormoni e anticorpi.', '["**VALORI NUTRIZIONALI**", "| Componente | Per 100g | Per porzione (3 cps) | % RDA |", "| --- | --- | --- | --- |", "| Arginina Piroglutammato | 53,76 g | 1500 mg | - |", "| - di cui Arginina | 31,90 g | 860 mg | - |", "| Lisina Cloridrato | 26,88 g | 750 mg | - |", "| - di cui Lisina | 22,22 g | 600 mg | - |", "", "**INGREDIENTI**", "Arginina piroglutammato, Lisina cloridrato, eccipienti. amido di mais pregelatinizzato, magnesio stearato vegetale. Involucro: gelatina", "", "**MODALITÀ D''USO**", "Si consiglia di assumere 3 capsule al giorno con un bicchiere d''acqua, preferibilmente a stomaco vuoto."]', 'Si consiglia di assumere 3 capsule al giorno, con acqua.', NULL, NULL, false, false, false, '2025-08-04 08:14:27.490082', NULL, 'Unico', NULL, '70 capsule');
INSERT INTO public.products VALUES (1029, 'repoxan', 'Repoxan', 22, 7, 'Integratore alimentare di melatonina per prendere sonno rapidamente e dormire meglio, con 6 azioni combinate.', 'REPOXAN è un integratore alimentare con una formula avanzata che combina ingredienti naturali per promuovere un sonno tranquillo e migliorare il benessere mentale. Il prodotto è formulato con melatonina, magnesio, lavanda, passiflora, griffonia, camomilla, escolzia e vitamina B6 per offrire numerosi benefici a chi non ha un buon rapporto con il sonno. REPOXAN, grazie all''azione combinata dei suoi ingredienti, è studiato per aiutare a ridurre il tempo necessario per addormentarsi, per aiutare a diminuire la stanchezza e l''affaticamento anche al risveglio e per supportare una qualità del sonno ottimale.', '{"titolo":"Repoxan","valori_nutrizionali":{"per_porzione":{"porzione":"1 cpr","melatonina":"1 mg","lavanda":{"quantita":"30 mg","di_cui_o_e":"0,15 mg"},"passiflora":{"quantita":"30 mg","di_cui_flavonoidi":"0,3 mg"},"griffonia":{"quantita":"30 mg","di_cui_5_htp":"7,5 mg"},"camomilla":{"quantita":"30 mg","di_cui_apigenina":"0,225 mg"},"escolzia":{"quantita":"25 mg","di_cui_protopina":"0,25 mg"},"magnesio":"60 mg (16% VNR)","vitamina_b6":"0,7 mg (50% VNR)"}},"ingredienti":"FIZZcarrier® [edulcoloranti: mannitolo, sorbitolo, xilitolo, sucralosio; bicarbonato di potassio, acidificanti: acido malico, acido tartarico] 65%; Agente di carica: cellulosa microcristallina; Ossido di magnesio; Agenti antiagglomeranti: biossido di silicio, Sali di magnesio degli acidi grassi; Lavanda (Lavandula angustifolia Mill.) fiore e.s. tit. 0,5% o.e; Passiflora (Passiflora incarnata L.) parte aerea con fiori e.s. tit. 1% flavonoidi; Griffonia (Griffonia simplicifolia (DC.) Baill.) seme e.s. tit. 25% 5-HTP ( 5-idrossitriptofano); Camomilla (Matricaria chamomilla L.) fiore e.s. tit. 0,75% apigenina; Escolzia (Eschscholzia californica Cham.) parte aerea e.s. tit. 1% protopina; Aroma; Agente stabilizzante: Mono e digliceridi degli acidi grassi; Sali di magnesio dell’acido citrico; Melatonina; Vitamina B6 (cloridrato di piridossina).","nota":"VNR: Valori Nutritivi di Riferimento (adulti) ai sensi del Reg. UE 1169/2011"}', 'Si consiglia l''assunzione di REPOXAN circa 20-30 min prima di coricarsi, per ottenere i massimi benefici. Sciogliere in bocca. L''effetto benefico si ottiene con l''assunzione di 1mg di melatonina. Da assumere in previsione di un periodo di sonno di almeno 6 ore.', 'FIZZcarrier® [edulcoloranti: mannitolo, sorbitolo, xilitolo, sucralosio; bicarbonato di potassio, acidificanti: acido malico, acido tartarico] 65%; Agente di carica: cellulosa microcristallina; Ossido di magnesio; Lavanda (Lavandula angustifolia Mill.) fiore e.s. tit. 0,5% o.e; Passiflora (Passiflora incarnata L.) parte aerea con fiori e.s. tit. 1% flavonoidi; Griffonia (Griffonia simplicifolia (DC.) Baill.) seme e.s. tit. 25% 5-HTP; Camomilla (Matricaria chamomilla L.) fiore e.s. tit. 0,75% apigenina; Escolzia (Eschscholzia californica Cham.) parte aerea e.s. tit. 1% protopina; Melatonina; Vitamina B6 (cloridrato di piridossina).', NULL, false, false, false, '2025-07-26 07:12:27.615003', NULL, 'Unico', '30 compresse', NULL);
INSERT INTO public.products VALUES (1154, 'prime-whey-hydro-plus', 'Prime Whey Hydro Plus', 23, 1, 'PRIME WHEY HYDRO PLUS è un integratore alimentare di proteine del siero di latte concentrate, isolate mediante microfiltrazione a flusso incrociato e idrolizzate.', 'PRIME WHEY HYDRO PLUS è un integratore alimentare di proteine idrolizzate del siero di latte con aminoacidi, a solubilità istantanea e di ottimo gusto. PRIME WHEY HYDRO PLUS è formulato con proteine idrolizzate del siero di latte, proteine predigerite di elevato valore biologico e di massima assimilazione. Le proteine contribuiscono alla crescita e al mantenimento della massa muscolare.

Modalità d''uso: Assumere una porzione da 30 g (2 misurini) al giorno miscelata con 200-250 ml di acqua o altro liquido a scelta.

Ingredienti: Proteine idrolizzate del siero di LATTE; Mix amino support (L-Glutammina, L-Lisina, L-Treonina, L-Glicina, Creatina monoidrato); Aromi; Sale; Edulcorante: sucralosio.', '{"nome_prodotto":"Prime Whey Hydro Plus","valori_nutrizionali":{"per_porzione":{"descrizione":"Informazioni nutrizionali per porzione:","porzione":"30 g","valori":[{"componente":"Energia","valore":"511 kJ/121 kcal"},{"componente":"Grassi","valore":"1,9 g"},{"componente":"di cui acidi grassi saturi","valore":"1,1 g"},{"componente":"Carboidrati","valore":"1,9 g"},{"componente":"di cui zuccheri","valore":"1,7 g"},{"componente":"Proteine","valore":"24 g"},{"componente":"Sale","valore":"0,23 g"},{"componente":"Vitamina B6","valore":"0,42 mg (30% VNR)"}]},"per_100g":{"descrizione":"Informazioni nutrizionali per 100 g:","valori":[{"componente":"Energia","valore":"1702 kJ/402 kcal"},{"componente":"Grassi","valore":"6,3 g"},{"componente":"di cui acidi grassi saturi","valore":"3,6 g"},{"componente":"Carboidrati","valore":"6,4 g"},{"componente":"di cui zuccheri","valore":"5,7 g"},{"componente":"Proteine","valore":"80 g"},{"componente":"Sale","valore":"0,78 g"},{"componente":"Vitamina B6","valore":"1,4 mg"}]}},"ingredienti":"Proteine del latte concentrate, sieroproteine del latte idrolizzate, aromi, cacao in polvere, addensanti: gomma di guar, gomma di xanthan; edulcoranti: sucralosio, acesulfame K; piridossina cloridrato (Vitamina B6)."}', 'Assumere una porzione da 30 g (2,5 misurini) al giorno miscelata con 150-200 ml di acqua.', 'Ingredienti: Proteine del siero di LATTE concentrate, isolate e idrolizzate; Cacao in polvere; Aromi; Edulcorante: sucralosio; Piridossina cloridrato (Vitamina B6).', NULL, false, false, false, '2025-08-04 07:30:37.061527', 19, 'Cioccolato', '1kg', '1000g');
INSERT INTO public.products VALUES (1516, 'hard-staart-x-plode', 'Hard Start X-Plode', 6, 3, 'HARD START X-PLODE è un integratore alimentare in polvere di Beta Alanina, Trigliceridi a media catena MCT, Creatina e altri nutrienti per lo sportivo.', 'HARD START X-PLODE è un integratore alimentare in polvere di Beta Alanina, Trigliceridi a media catena MCT, Creapure®, Citrullina KYOWA, L-Arginina KYOWA, L-Arginina Cloridrato, Taurina, Paulinia Cupana, Vitamina B6 e B12.

HARD START X-PLODE è un PRE WORK-OUT indicato per integrare l''alimentazione dello sportivo soprattutto in caso di attività fisiche intense e prolungate, favorendo la forza e la durata della performance. Il prodotto svolge un''ottima azione volumizzante.

La Beta-Alanina è l''unico Beta-Aminoacido presente in natura. Con l''Istidina forma un dipeptide: la Carnosina (beta-alanyl-L-hystidine). Questo dipeptide è presente in larga misura nel tessuto muscolare e gioca un ruolo fondamentale nell''omeostasi del ph cellulare. La diminuzione della concentrazione di questo dipeptide ha come conseguenza la riduzione delle capacità muscolari e l''aumento della percezione della fatica. La supplementazione di Beta-Alanina, è in grado di influire sull''aumento dei livelli di Carnosina nel muscolo; grazie alle sue proprietà antiossidanti e tamponanti nei confronti dell''acido lattico permette di migliorare le capacità atletiche.', '{
    "titolo": "Integratore Pre-Workout",
    "valori_nutrizionali": {
      "per_100g": {
        "valore_energetico": "1089,7 kj / 256,4 kcal",
        "grassi": "10 g",
        "di_cui_saturi": "10 g",
        "carboidrati": "40 g",
        "di_cui_zuccheri": "16 g",
        "proteine": "0 g",
        "sale": "500 mg",
        "beta_alanina": "13,33 g",
        "mct": "13,33 g",
        "l_arginina": "6,66 g",
        "citrullina": "4 g",
        "arginina_hcl": "3,33 g",
        "di_cui_arginina": "2,76 g",
        "creatina_monoidrato": "9,99 g",
        "di_cui_creatina": "8,79 g",
        "taurina": "3,33 g",
        "paulinia_cupana": "0,5 g",
        "di_cui_caffeina": "125 mg",
        "niacina": "107 mg",
        "vitamina_b6": "9,3 mg"
      },
      "per_dose_15g": {
        "valore_energetico": "163,62 kj / 38,5 kcal",
        "grassi": "1,5 g",
        "di_cui_saturi": "1,5 g",
        "carboidrati": "6 g",
        "di_cui_zuccheri": "2,4 g",
        "proteine": "0 g",
        "sale": "75 mg",
        "beta_alanina": "2 g",
        "mct": "2 g",
        "l_arginina": "1 g",
        "citrullina": "0,6 g",
        "arginina_hcl": "0,5 g",
        "di_cui_arginina": "0,4 g",
        "creatina_monoidrato": "1,5 g",
        "di_cui_creatina": "1,32 g",
        "taurina": "0,5 g",
        "paulinia_cupana": "75 mg",
        "di_cui_caffeina": "18,8 mg",
        "niacina": "16 mg (100% VNR)",
        "vitamina_b6": "1,4 mg (100% VNR)"
      }
    },
    "ingredienti": "Maltodestrine (da mais), Beta Alanina, Trigliceridi a media catena MCT, Fruttosio, L-Arginina (Kyowa®), Citrullina, Acido Citrico, Creatina monoidrato (Creapure®), L-Arginina Cloridrato, Taurina, Aroma, Acido Tartarico, Polvere di Barbabietola, Sodio Bicarbonato, Paulinia Cupana h.s.k. Semen e.s. tit. 10% Caffeina. Edulcoranti: Acelsufame K, Sucralosio; Niacina, Vitamina B6 (Piridossina Cloridrato). Prodotto e confezionato in stabilimento che utilizza anche latte, uova, soia, nocciole e loro derivati.",
    "nota": "*VNR: valori nutrizionali di riferimento"
  }', 'assumere 15 g di prodotto (20 cc del misurino graduato disponibile all''interno della confezione) con acqua 30 minuti prima dell''allenamento.', NULL, NULL, false, false, false, '2025-09-02 14:50:36.187196', 129, 'Arancia', '300g', NULL);
INSERT INTO public.products VALUES (1205, 'bcaa-8-1-1', 'BCAA 8:1:1', 25, 2, 'Pre/intra/post workout in contrasta stanchezza favorisce il recuperio. BCAA 8.1.1 di origine vegetale in polvere con Vit B1 e B6', 'Prodotto in polvere a base di BCAA (L-Leucina, L-Isoleucina, L-Valina) nello straordinario rapporto 8-1-1 arricchito con le Vitamine B1 e B6. BCAA 8-1-1 È indicato per chi pratica attivitÀ fisico-sportiva intensa in quanto aumenta il livello di aminoacidi ramificati disponibili per l''organismo mantenendo un bilancio azotato positivo fornendo quindi una ottima azione energetica ed anticatabolica se assunto prima dell''allenamento che di recupero se assunto dopo l''allenamento. La Vitamina B1 e B6 intervengono positivamente sul metabolismo proteico, del glicogeno muscolare ed energetico. La Vitamina B6 contribuisce a ridurre la stanchezza e l''affaticamento che insorge durante le sessioni di allenamento mentre la B1 contribuisce alla normale funzionalità cardiaca. UTILIZZO: BCAA 8-1-1 a completamento della dieta È indicato in particolare nell''alimentazione degli sportivi,nelle situazioni di accentuato catabolismo proteico come nei casi di attività muscolare intensa o di resistenza. BCAA 8-1-1 È disponibile in due formati al gusto arancia/ limone e può essere assunto sciogliendo 2 misurini in acqua, miscele proteiche o di carboidrati o con la bevanda preferita. Può essere utilizzato prima durante o dopo l''attività fisica.', '{"titolo":"BCAA 8:1:1","per_porzione":{"descrizione":"Valori nutrizionali per dose massima giornaliera (7g)","porzione":"7g","valori":[{"componente":"Vitamina B1","valore":"1,65 mg (150% VNR)"},{"componente":"Vitamina B6","valore":"2,1 mg (150% VNR)"},{"componente":"L-Leucina","valore":"4000 mg"},{"componente":"L-Isoleucina","valore":"500 mg"},{"componente":"L-Valina","valore":"500 mg"}]},"ingredienti":"Miscela di Aminoacidi ramificati BCAA (L-Leucina, L-Isoleucina, L-Valina in rapporto 8/1/1), Maltodestrine 19 DE, Acido Citrico, Acido Tartarico, Aromi, Sodio Bicarbonato, Edulcorante: Sucralosio, Piridossina Cloridrato (Vitamina B6), Tiamina Cloridrato (Vitamina B1)."}', 'Assumere due misurini (7 g) di prodotto al giorno sciolto in acqua prima o dopo l''attività fisica.', NULL, NULL, false, false, false, '2025-08-04 08:20:55.56761', 37, 'Arancia', NULL, '150g');
INSERT INTO public.products VALUES (824, 'bcaa-ride-gel-plus', 'BCAA Ride Gel+', 1, 3, 'Gel energetico con aminoacidi ramificati, perfetto per supporto durante attività fisiche intense.', 'BCAA Ride Gel+ è un gel energetico avanzato, formulato per gli atleti di endurance. Fornisce un apporto energetico rapido e costante grazie a una combinazione di carboidrati semplici e complessi, con l''aggiunta di BCAA 8:1:1 Kyowa Quality®. La sua formulazione è priva di caffeina e bilanciata per assicurare una liberazione progressiva di energia, prevenendo picchi glicemici e cali improvvisi di rendimento.', '{
    "valori_nutrizionali": {
      "dose": "1 dose = 2 confezioni",
      "tabella": [
        {"nutriente": "Energia", "quantita": "888 kJ / 209 kcal"},
        {"nutriente": "Grassi", "quantita": "0 g"},
        {"nutriente": "- di cui saturi", "quantita": "0 g"},
        {"nutriente": "Carboidrati", "quantita": "52,2 g"},
        {"nutriente": "- di cui zuccheri", "quantita": "40,6 g"},
        {"nutriente": "Destrosio", "quantita": "24,4 g"},
        {"nutriente": "Fruttosio", "quantita": "16,2 g"},
        {"nutriente": "Proteine", "quantita": "0 g"},
        {"nutriente": "Sale", "quantita": "0 g"},
        {"nutriente": "Maltodestrine", "quantita": "8,1 g"},
        {"nutriente": "Vitargo®", "quantita": "3,5 g"},
        {"nutriente": "L-leucina", "quantita": "800 mg"},
        {"nutriente": "L-isoleucina", "quantita": "100 mg"},
        {"nutriente": "L-valina", "quantita": "100 mg"}
      ]
    },
    "ingredienti": "Acqua, glucosio, fruttosio, maltodestrine, Vitargo® (amilopectina da mais), acidificante: acido citrico; L-leucina (Kyowa Quality ®), addensante: carbossimetilcellulosa; conservante: sorbato di potassio; aroma, L-isoleucina (Kyowa Quality®), L-valina (Kyowa Quality®)."
  }', 'Ideale per il pre-workout o durante l''attività fisica per un apporto energetico immediato e costante. Si consiglia di assumere 1 o più confezioni monodose al giorno, a seconda del fabbisogno energetico e dell''intensità dell''allenamento.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Conservare in luogo fresco e asciutto.', 'L''ottimo rapporto BCAA 8:1:1 e la combinazione di carboidrati a rilascio differenziato lo rendono un gel energetico molto efficace per sostenere prestazioni di lunga durata senza cali di energia.', false, false, false, '2025-06-24 16:37:11.023413', NULL, NULL, NULL, NULL);
INSERT INTO public.products VALUES (986, 'creatina-extra-gold', 'Creatina+ Extra Gold', 1, 2, 'Formula potenziata di creatina monoidrato con magnesio per performance superiori', 'Integratore alimentare di creatina monoidrato Creapure®, nota per elevata purezza e qualità. Cruciale nel metabolismo energetico, supporta la sintesi dell''ATP, aumentando la disponibilità energetica durante sforzi intensi e di breve durata. Ideale per incrementare forza, potenza e recupero muscolare, utile per sportivi e atleti.', '{
    "valori_nutrizionali": {
      "dose": "Per 1 dose = 3 g",
      "tabella": [
        {"componente": "Creatina monoidrato", "quantita": "3 g"}
      ]
    },
    "ingredienti": "Creatina Monoidrato*. *Creapure® prodotto in EU da Alzchem Trostberg GmbH."
  }', 'SPORT: Perfetto per chi pratica attività fisiche intense e ripetute. L''assunzione continuata di creatina per almeno una settimana migliora la prestazione fisica, riducendo i tempi di recupero. Assumere 3-4 g (1-1,5 misurini o 3-4 compresse) al giorno, distribuiti prima e dopo l''allenamento. Iniziare l''assunzione 6-8 settimane prima delle competizioni importanti per i massimi benefici. Disciogliere la polvere preferibilmente in acqua oligominerale. VITA QUOTIDIANA: Indicato per chi soffre di astenia o debolezza, o per integrare diete a ridotto consumo di carne. Assumere 3 g (1 misurino o 3 compresse) durante la giornata, preferibilmente a stomaco vuoto.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Alle dosi suggerite, il prodotto non presenta controindicazioni anche per uso prolungato. A dosi elevate (oltre 15 g al giorno) e per tempi prolungati, la creatina può indurre un incremento del peso corporeo (3% ed oltre). Tale aumento è dovuto ad una idratazione del muscolo scheletrico di natura reversibile. La creatina è instabile in bevande o ambiente acido.', 'Creatina monoidrato Creapure® di grado farmaceutico, prodotta in Europa con standard qualitativi superiori. La purezza elevata garantisce efficacia massima e assenza di impurità. Include dettagliate istruzioni per l''uso sportivo e quotidiano, con protocolli specifici per la fase di carico e mantenimento.', false, false, false, '2025-06-27 16:00:57.282047', NULL, 'Neutro', 'Vari formati', 'Da 25 a 116 dosi');
INSERT INTO public.products VALUES (1217, 'glutammina-sport-recovery', 'Glutammina Sport Recovery', 25, 2, 'L-Glutammina in polvere per il recupero muscolare post allenamento', 'Integratore alimentare a base di L-glutammina in polvere micronizzata. La glutammina è l''aminoacido più abbondante nel tessuto muscolare e svolge un ruolo importante nel supportare il recupero dopo l''allenamento intenso. Durante l''attività fisica intensa, i livelli di glutammina possono diminuire, rendendo utile l''integrazione per supportare il recupero muscolare. La glutammina contribuisce al mantenimento del sistema immunitario e al supporto della funzione intestinale.', '{"titolo":"Glutammine Sport Recovery","per_porzione":{"descrizione":"Valori nutrizionali per dose","porzione":"5 g (1 misurino piatto)","valori":[{"componente":"L-Glutammina","valore":"5 g"}]},"per_100g":{"descrizione":"Valori nutrizionali per 100 g","valori":[{"componente":"L-Glutammina","valore":"99,5 g"}]},"ingredienti":"L-Glutammina (Kyowa Quality®)."}', 'Si consiglia di assumere 1 misurino (5g) al giorno da sciogliere in acqua dopo l''allenamento.', NULL, NULL, false, false, false, '2025-08-04 08:22:28.53277', 43, 'Unico', NULL, '150g');
INSERT INTO public.products VALUES (1173, 'vitamina-d3-2000-ui', 'Vitamina D3 2000 UI', 23, 7, 'Vitamina D3 2000 UI è un integratore alimentare di vitamina D3 ad alto dosaggio.', 'Vitamina D3 2000 UI è un integratore alimentare di vitamina D3 ad alto dosaggio. Realizzato in pratiche microcompresse, facili da deglutire, che apportano 50 mcg di vitamina D3. La vitamina D3 contribuisce al normale mantenimento delle ossa, dei denti e della funzione muscolare. Inoltre supporta fisiologicamente la funzione del sistema immunitario. Infine la vitamina D3 contribuisce a normali livelli di calcio nel sangue ed interviene nel processo di divisione delle cellule.

Modalità d''uso: Assumere una microcompressa al giorno con acqua o altra bevanda a scelta, in qualunque momento della giornata.

Ingredienti: Agente di carica: cellulosa microcristallina; Agenti antiagglomeranti: biossido di silicio, sali di magnesio degli acidi grassi (origine vegetale); colecalciferolo (vitamina D3).', '{"titolo":"Vitamina D3 2000 UI","per_porzione":{"descrizione":"Valori nutrizionali per porzione","valori":[{"componente":"Vitamina D3","valore":"2.000 U.I./50 mcg (1000% VNR)"}]},"ingrediente":"Agente di carica: cellulosa microcristallina; Agenti antiagglomeranti: biossido di silicio, sali di magnesio degli acidi grassi (origine vegetale); colecalciferolo (vitamina D3)."}', 'Assumere una microcompressa al giorno con acqua, in qualunque momento della giornata.', 'Ingredienti: Agente di carica: cellulosa microcristallina; Agenti antiagglomeranti: biossido di silicio, sali di magnesio degli acidi grassi; colecalciferolo (vitamina D3).', NULL, false, false, false, '2025-08-04 07:35:22.168738', 28, 'Unico', '200 compresse', '200 compresse');
INSERT INTO public.products VALUES (1263, 'glutamina-pure', 'Glutamine Pure 250g', 23, 2, 'Integratore alimentare di glutammina in polvere solubile senza aromi, gusto naturale.', 'Integratore alimentare di glutammina in polvere solubile senza aromi, gusto naturale. Contiene glutammina di origine vegetale da fermentazione di elevata purezza. La glutammina è un aminoacido coinvolto nel processo di recupero e rigenerazione muscolare.', '{"valori_nutrizionali": "Informazioni nutrizionali per porzione\n1 PORZIONE = 1 MISURINO (5 g)\nL-Glutammina 5.000 mg", "ingredienti": "L-Glutammina; Stabilizzante: calcio fosfato."}', 'Un misurino (5 g) al giorno con acqua o altro liquido a scelta durante la giornata o dopo l''attività fisica.', NULL, NULL, false, false, false, '2025-08-04 09:01:20.926426', 50, 'Unico', '250g', NULL);
INSERT INTO public.products VALUES (998, 'epilact-sport-protezione-unghie', 'Epilact Sport Protezione Unghie', 18, 6, 'Protezioni avanzate per unghie livide specificamente progettate per sportivi', 'Le protezioni per unghie livide EPITHELIUM TACT 02 sono costituite da un gel di silicone ultraresistente di 1 mm di spessore, con proprietà viscoelastiche simili a quelle dei tessuti cutanei. Permettono di ripartire le pressioni e di assorbire i micro-shock, dissipando l''energia nel gel e prevenendo così i rischi di formazione di unghie livide o vesciche. Ogni confezione contiene 2 protezioni riutilizzabili della stessa taglia.', '{}', 'MANUTENZIONE: Le protezioni sono lavabili a mano con acqua e sapone.', 'Non applicare su cute lesa. Non utilizzare senza il consiglio medico in caso di diabete e/o arterite. Conservare in luogo fresco e asciutto.', 'Dispositivi medici professionali in gel di silicone ultraresistente con proprietà viscoelastiche innovative. La tecnologia EPITHELIUM TACT 02 offre protezione superiore contro traumi ungueali e vesciche, essenziale per atleti e sportivi che praticano attività intense.', false, false, false, '2025-06-27 16:20:51.076554', NULL, 'Neutro', 'Varie taglie', 'Confezione da 2 pezzi');
INSERT INTO public.products VALUES (1146, 'prime-casein', 'Prime Casein', 23, 1, 'PRIME CASEIN è un integratore alimentare di proteine con edulcorante, a base di caseine micellari (da proteine del latte) particolarmente adatto agli sportivi, a solubilità istantanea.', 'PRIME CASEIN è un integratore alimentare di proteine con edulcorante, a base di caseine micellari (da proteine del latte) particolarmente adatto agli sportivi, a solubilità istantanea. Le caseine sono una fonte proteica ad alto valore biologico, hanno tempi di digestione lenti e rilasciano gradualmente gli aminoacidi contenuti. Le proteine contribuiscono alla crescita e al mantenimento della massa muscolare. La vitamina B6 contenuta nel prodotto contribuisce al normale metabolismo delle proteine e del glicogeno e alla riduzione della stanchezza e dell''affaticamento.

Modalità d''uso: Assumere una porzione da 30 g (3 misurini) al giorno miscelata con 200-300 ml di acqua o altro liquido a scelta. Il volume di liquido aggiunto influisce sull''intensità del gusto e sulla densità del preparato, non influisce sulla digeribilità o assimilabilità. Assumere il prodotto durante la giornata come spuntino, lontano dai pasti principali, oppure dopo gli allenamenti o l''attività sportiva o prima di coricarsi.

Ingredienti: Caseine micellari da proteine del LATTE; Aromi; Sale; Edulcorante: sucralosio; Piridossina cloridrato (Vitamina B6).', '["Valori Nutrizionali per porzione:", "1 PORZIONE = 3 MISURINI (30g) ", "Energia  480 KJ/112 kcal", "Grassi  0,4 g", "di cui acidi grassi saturi  0,3 g", "Carboidrati  1,1 g", "di cui zuccheri  0,6 g", "Proteine  26 g", "Sale  0,13 mg", "Vitamina B6 (30% VNR)  0,42 mg", "", "Valori Nutrizionali per 100g:", "Energia  1570 KJ/369 kcal", "Grassi  1,2 g", "di cui acidi grassi saturi  0,9 g", "Carboidrati  3,5 g", "di cui zuccheri  1,9 g", "Proteine  86 g", "Sale  0,43 mg", "Vitamina B6 (30% VNR)  1,4 mg", "", "PROFILO AMINOACIDICO TIPICO  % SULLE PROTEINE", "L-Isoleucina  5,20", "L-Leucina  9,50", "L-Valina  6,60", "BCAA totali  21,30", "L-Lisina  8,10", "L-Metionina  2,90", "L-Fenilalanina  5,20", "L-Treonina  4,50", "L-Arginina  3,70", "L-Alanina  3,10", "L-Acido Aspartico  7,40", "L-Cistina  0,50", "L-Acido Glutammico  22,40", "L-Glicina  1,80", "L-Istidina  2,70", "L-Prolina  10,40", "L-Serina  5,80", "L-Tirosina  5,70", "L-Triptofano  1,20", "", "VNR = valori nutritivi di riferimento"]', 'Assumere una porzione da 30 g (3 misurini) al giorno miscelata con 200-300 ml di acqua o altro liquido a scelta.', 'Ingredienti: Caseine micellari da proteine del LATTE; Aromi; Sale; Edulcorante: sucralosio; Piridossina cloridrato (Vitamina B6).', NULL, false, false, false, '2025-08-04 07:28:11.960446', 17, 'Cioccolato', '1kg', '1000g');
INSERT INTO public.products VALUES (1176, 'whey-iso', 'Whey Iso', 23, 1, 'WHEY ISO è un integratore alimentare di proteine con aminoacidi ed edulcorante, a solubilità istantanea e di ottimo gusto.', 'WHEY ISO è un integratore alimentare di proteine con aminoacidi ed edulcorante, a solubilità istantanea e di ottimo gusto. WHEY ISO è formulato con proteine del siero di latte isolate e idrolizzate, proteine di elevato valore biologico. Alla sua formula proteica abbiamo aggiunto L-glutammina, aminoacidi e Vitamina B6, per renderla particolarmente indicata nell''alimentazione dello sportivo, sia di chi fa bodybuilding che altri sport. Le proteine contenute in WHEY ISO contribuiscono alla crescita e al mantenimento della massa muscolare, mentre la vitamina B6 contribuisce al normale metabolismo delle proteine e del glicogeno e alla riduzione della stanchezza e dell''affaticamento. WHEY ISO è adatto ai vegetariani.', '{"nome_prodotto":"Whey Iso","valori_nutrizionali":{"per_porzione":{"descrizione":"Informazioni nutrizionali per porzione:","porzione":"30 g","valori":[{"componente":"Energia","valore":"434 kJ/102 kcal"},{"componente":"Grassi","valore":"0,3 g"},{"componente":"di cui acidi grassi saturi","valore":"0,2 g"},{"componente":"Carboidrati","valore":"0,9 g"},{"componente":"di cui zuccheri","valore":"0,9 g"},{"componente":"Proteine","valore":"24 g"},{"componente":"Sale","valore":"0,26 g"},{"componente":"Vitamina B6","valore":"0,42 mg (30% VNR)"},{"componente":"L-Glutammina","valore":"3 g"},{"componente":"L-Lisina","valore":"2 g"},{"componente":"L-Treonina","valore":"2 g"},{"componente":"L-Glicina","valore":"2,5 g"}]},"per_100g":{"descrizione":"Informazioni nutrizionali per 100 g:","valori":[{"componente":"Energia","valore":"1451 kJ/342 kcal"},{"componente":"Grassi","valore":"1 g"},{"componente":"di cui acidi grassi saturi","valore":"0,6 g"},{"componente":"Carboidrati","valore":"3,2 g"},{"componente":"di cui zuccheri","valore":"2,9 g"},{"componente":"Proteine","valore":"81 g"},{"componente":"Sale","valore":"0,86 g"}]}},"ingredienti":"Proteine del siero del latte isolate per microfiltrazione a flusso incrociato, cacao in polvere, aromi, L-glutammina, L-glicina, L-treonina, L-lisina, addensante: carbossimetilcellulosa sodica; edulcoranti: sucralosio, acesulfame K; piridossina cloridrato (Vitamina B6)."}', 'Assumere una porzione da 30 g (2 misurini) al giorno miscelata con 240 ml di acqua o altro liquido a scelta. Il volume di liquido aggiunto influisce sull''intensità del gusto e sulla densità del preparato, non influisce sulla digeribilità o assimilabilità. Assumere il prodotto come spuntino durante la giornata, lontano dai pasti principali, oppure dopo gli allenamenti o attività sportiva.', NULL, NULL, false, false, false, '2025-08-04 07:40:01.147812', 30, 'Brownies', '1kg', NULL);
INSERT INTO public.products VALUES (1213, 'creatina-micronizzata-100', 'Creatina Micronizzata 100%', 25, 2, 'Creatina monoidrato micronizzata ad alta purezza, 100% pura', 'Integratore alimentare a base di creatina monoidrato micronizzata, creapure quality. La creatina aumenta le prestazioni fisiche in caso di attività ripetitive, di elevata intensità e di breve durata. L''effetto benefico si ottiene con l''assunzione giornaliera di 3 g di creatina. La formulazione prevede una forma micronizzata della creatina che permette una migliore dissoluzione e quindi assimilazione del prodotto. La creatina è indicata per tutti gli sportivi praticanti discipline che richiedono sforzi brevi e intensi.', '{"titolo":"Creatina Micronizzata 100%","per_porzione":{"descrizione":"Valori nutrizionali per porzione","porzione":"3 grammi","valori":[{"componente":"Creatina Monoidrato","valore":"3000 mg"}]},"ingredienti":"Creatina monoidrato micronizzata (Creapure®)."}', 'Si consiglia di assumere 1 misurino (3g) al giorno da sciogliere in acqua.', NULL, NULL, false, false, false, '2025-08-04 08:21:47.169708', 41, 'Unico', NULL, '200g');
INSERT INTO public.products VALUES (925, 'bcaa-plus-8-1-1', 'BCAA+ 8:1:1', 1, 2, 'Aminoacidi ramificati BCAA+ nel rapporto 8:1:1 per un recupero muscolare ottimale e riduzione della fatica', 'BCAA+ 8:1:1 è un integratore di aminoacidi ramificati (Kyowa Quality®) nel rapporto potenziato 8:1:1 (L-leucina, L-isoleucina, L-valina). È specificamente formulato per stimolare la sintesi proteica e supportare la massa e il recupero muscolare, rappresentando un supporto ideale per allenamenti intensi.', '{"titolo":"BCAA+ 8:1:1","per_porzione":{"descrizione":"Valori nutrizionali per 5 g","porzione":"5 g","valori":[{"componente":"L-leucina","valore":"3,84 g"},{"componente":"L-isoleucina","valore":"0,48 g"},{"componente":"L-valina","valore":"0,48 g"},{"componente":"Vitamina B1","valore":"1,1 mg (100% VNR)"},{"componente":"Vitamina B6","valore":"1,4 mg (100% VNR)"}]},"ingredienti":"L-leucina, L-valina, L-isoleucina, aromi, acidificante: acido citrico, agente antiagglomerante: tricalcio fosfato; correttore di acidità: sodio citrato tribasico biidrato, edulcoranti: sucralosio, glicosidi steviolici (estratti da foglie di Stevia rebaudiana Bertoni), piridossina cloridrato (vitamina b6), Tiammina cloridrato (vitamina b1)."}', 'Uso Sportivo: ideale prima e dopo l''attività fisica per ridurre il catabolismo muscolare, stimolare la sintesi proteica e migliorare il recupero. Dosaggio: 1 g ogni 10 kg di peso corporeo, suddividendo tra 30 minuti prima e subito dopo l''attività fisica. Alternativa: 1 g ogni 20 kg di peso corporeo solo prima dell''allenamento, combinando con proteine nel post-workout. Vita Quotidiana: utile per chi ha difficoltà a introdurre proteine complete nella dieta.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Conservare in luogo fresco e asciutto.', 'Il rapporto 8:1:1, con l''alta concentrazione di leucina, è eccellente per massimizzare la segnalazione per la sintesi proteica, rendendo questo prodotto particolarmente efficace per la crescita muscolare e il recupero post-allenamento.', false, false, false, '2025-06-26 14:52:33.082292', NULL, NULL, NULL, NULL);
INSERT INTO public.products VALUES (1174, 'viteral', 'Viteral', 23, 7, 'VITERAL è un integratore alimentare di Vitamine e Minerali completo, con Luteina e Antiossidanti. La sua formula concentrata racchiude in una sola compressa al giorno l''apporto adeguato di vitamine, minerali a altri nutrienti utili per mantenere in buona efficienza l''organismo. Non contiene ingredienti di origine animale.', 'VITERAL è un integratore alimentare di Vitamine e Minerali completo, con Luteina e Antiossidanti. La sua formula concentrata racchiude in una sola compressa al giorno l''apporto adeguato di vitamine, minerali e altri nutrienti utili per mantenere in buona efficienza l''organismo. Formula completa che supporta il benessere generale, l''energia quotidiana e le funzioni vitali. Non contiene ingredienti di origine animale, adatto a vegetariani.', '{
    "nutritional_table": {
      "title": "Valori Nutrizionali",
      "serving_size": "1 compressa",
      "servings_per_container": "60",
      "values": [
        {"nutrient": "Vitamina D3", "amount": "5", "unit": "μg", "daily_value": "100%"},
        {"nutrient": "Vitamina A", "amount": "800", "unit": "μg", "daily_value": "100%"},
        {"nutrient": "Vitamina C", "amount": "120", "unit": "mg", "daily_value": "150%"},
        {"nutrient": "Vitamina B1", "amount": "1.65", "unit": "mg", "daily_value": "150%"},
        {"nutrient": "Vitamina B2", "amount": "2.1", "unit": "mg", "daily_value": "150%"},
        {"nutrient": "Niacina", "amount": "24", "unit": "mg", "daily_value": "150%"},
        {"nutrient": "Vitamina E", "amount": "18", "unit": "mg", "daily_value": "150%"},
        {"nutrient": "Vitamina B6", "amount": "2.11", "unit": "mg", "daily_value": "150%"},
        {"nutrient": "Acido Folico", "amount": "300", "unit": "μg", "daily_value": "150%"},
        {"nutrient": "Vitamina B12", "amount": "3.75", "unit": "μg", "daily_value": "150%"},
        {"nutrient": "Biotina", "amount": "75", "unit": "μg", "daily_value": "150%"},
        {"nutrient": "Acido Pantotenico", "amount": "9", "unit": "mg", "daily_value": "150%"},
        {"nutrient": "Vitamina K2", "amount": "15", "unit": "μg", "daily_value": "20%"},
        {"nutrient": "Selenio", "amount": "55", "unit": "μg", "daily_value": "100%"},
        {"nutrient": "Zinco", "amount": "3", "unit": "mg", "daily_value": "30%"},
        {"nutrient": "Rame", "amount": "0.3", "unit": "mg", "daily_value": "30%"},
        {"nutrient": "Calcio", "amount": "240", "unit": "mg", "daily_value": "30%"},
        {"nutrient": "Fosforo", "amount": "111", "unit": "mg", "daily_value": "16%"},
        {"nutrient": "Cromo", "amount": "12", "unit": "μg", "daily_value": "30%"},
        {"nutrient": "Manganese", "amount": "0.6", "unit": "mg", "daily_value": "30%"},
        {"nutrient": "Iodio", "amount": "45", "unit": "μg", "daily_value": "30%"},
        {"nutrient": "Ferro", "amount": "4.2", "unit": "mg", "daily_value": "30%"},
        {"nutrient": "Magnesio", "amount": "112.5", "unit": "mg", "daily_value": "30%"},
        {"nutrient": "PABA", "amount": "30", "unit": "mg", "daily_value": null},
        {"nutrient": "Proantocianidine da Uva rossa", "amount": "20", "unit": "mg", "daily_value": null},
        {"nutrient": "Luteina", "amount": "1", "unit": "mg", "daily_value": null}
      ]
    },
    "ingredients": "Sali di calcio dell''acido ortofosforico; Ossido di magnesio; Agenti di carica: cellulosa microcristallina, idrossipropilmetilcellulosa; Vit. C (acido L-ascorbico); Vit. E (DL-alfa-tocoferolo); PABA (acido paraminobenzoico); Agenti antiagglomeranti: sali di magnesio degli acidi grassi, biossido di silicio; Niacina (nicotinamide); Proantocianidine da Uva; Fumarato ferroso; Acido Pantotenico; Vit. A (acetato di retinile); Vit. K2 (menachinone); Gluconato di manganese; Tagete; Vit. B12 (cianocobalamina); Ossido di zinco; Vit. B6; Vit. B2 (riboflavina); Vit. D (colecalciferolo); Vit. B1; Rame bisglicinato; Acido Folico; Selenito di sodio; Picolinato di cromo; Biotina; Ioduro di potassio."
  }', 'Si consiglia l''assunzione di una compressa al giorno ai pasti con abbondante acqua.', 'Non superare la dose giornaliera consigliata. Tenere fuori dalla portata dei bambini di età inferiore ai 3 anni. Conservare in luogo fresco e asciutto.', NULL, false, false, false, '2025-08-04 07:35:22.168738', 29, 'Unico', '60 compresse', '60 compresse');
INSERT INTO public.products VALUES (1006, 'short-donna-why-sport', 'Short Donna WHY Sport', 11, 6, 'Short tecnici da donna con inserti riflettenti e design performance oriented', 'Gli Short Donna WHY Sport sono progettati per offrire massima libertà di movimento e traspirabilità durante l''attività fisica. Il loro design leggero e il tessuto performante assicurano comfort e freschezza anche negli allenamenti più intensi, rendendoli un capo essenziale per il tuo guardaroba sportivo.', '{}', 'Lavare in lavatrice a 30°C con colori simili. Non candeggiare. Asciugare in asciugatrice a bassa temperatura o stendere all''aria. Non stirare. Non lavare a secco.', 'Lavare sempre con colori simili. Non superare i 30°C in lavatrice. Non candeggiare. Non stirare. Non lavare a secco.', 'Short sportivi femminili che uniscono leggerezza e performance tecnica. Il tessuto traspirante e il design ergonomico garantiscono comfort e freschezza durante gli allenamenti più intensi, per massima libertà di movimento in ogni disciplina sportiva.', false, false, false, '2025-06-27 16:32:15.406194', NULL, 'Nero/Grigio', 'Varie taglie', '1 short');
INSERT INTO public.products VALUES (633, 'carbo-energy-plus', 'Carbo Energy+', 1, 8, 'Integratore energetico a base di carboidrati complessi, perfetto per sostenere prestazioni fisiche prolungate...', 'Carbo Energy+ è una barretta ideata per fornire energia rapidamente disponibile, perfetta per affrontare sforzi fisici prolungati come allenamenti, gare o attività di endurance. La sua composizione a base di sciroppo di glucosio, maltodestrina e fruttosio assicura un rilascio energetico bilanciato, utile per rifornire il muscolo e sostenere la performance. Leggera, digeribile e dal gusto fruttato, è adatta sia prima che durante l''attività sportiva. L''aggiunta di riso soffiato la rende croccante e piacevole al palato, anche in situazioni di sforzo intenso, senza appesantire.', '{
    "valori_nutrizionali": {
      "dose": "1 dose = 40 g",
      "tabella": [
        {"componente": "Energia", "quantita": "608 kJ / 144 kcal"},
        {"componente": "Grassi", "quantita": "1 g"},
        {"componente": "- di cui saturi", "quantita": "0,2 g"},
        {"componente": "Carboidrati", "quantita": "33 g"},
        {"componente": "- di cui zuccheri", "quantita": "21 g"},
        {"componente": "Fibre", "quantita": "0,3 g"},
        {"componente": "Proteine", "quantita": "0,7 g"},
        {"componente": "Sale", "quantita": "0,12 g"}
      ]
    },
    "ingredienti": "Sciroppo di glucosio, riso soffiato 23% (farina di riso 91%, zucchero, estratto di malto d''orzo – contiene glutine -, sale), maltodestrina 16%, fruttosio 5%, destrosio, emulsionante: lecitina di soia; albume d''uovo, ostie (fecola di patate, acqua, olio di semi di girasole), gelificante: pectina; aromi, acidificante: acido citrico; colorante: E100. Può contenere latte e frutta a guscio."
  }', 'Sport: prima o durante sforzi di lunga durata. Assumere 1 barretta per ogni ora di attività fisica prolungata. Vita quotidiana: come snack energetico leggero prima di un''attività fisica intensa.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Conservare in luogo fresco e asciutto. Può contenere latte e frutta a guscio.', 'Questa barretta è formulata per un rilascio energetico bilanciato, ideale per sostenere prestazioni di lunga durata grazie alla combinazione di zuccheri a rapida e lenta assimilazione.', false, false, false, '2025-06-10 05:29:12.6453', NULL, NULL, NULL, NULL);
INSERT INTO public.products VALUES (899, 'smart-protein-cacao', 'Smart Protein Cacao', 1, 8, 'Bevanda proteica pronta al consumo con proteine del siero del latte, comoda e gustosa per uno spuntino proteico veloce', 'Smart Protein è una bevanda proteica pronta da bere, formulata per supportare il recupero muscolare e il fabbisogno proteico quotidiano. Ogni bottiglietta fornisce 25 g di proteine del latte a rapido assorbimento, ideali per chi pratica sport di resistenza o desidera integrare proteine di qualità nella propria dieta.

Grazie alla sua formulazione liquida, Smart Protein è una soluzione pratica e immediata, perfetta per chi ha poco tempo e necessita di un apporto proteico rapido.', '{"titolo":"Smart Protein Cacao","valori_nutrizionali":{"per_porzione":{"porzione":"1 bottiglietta","valore_energetico":"603 kJ / 142 kcal","grassi":"1 g","di_cui_acidi_grassi_saturi":"0,58 g","carboidrati":"6,7 g","di_cui_zuccheri":"1,9 g","fibre":"2,9 g","proteine":"25 g","sale":"0,67 g"}},"ingredienti":"acqua, proteine del latte concentrate (9%) (contiene emulsionante: lecitina di soia), cacao magro in polvere, maltodestrine, addensante: polidestrosio; destrina da mais, aroma, cloruro di sodio, stabilizzante: trifosfato pentasodico; edulcoranti: acesulfame k, sucralosio; addensanti: gomma di guar, gomma di xanthan."}', 'Dosaggio: 1 bottiglia (320ml).
Quando assumere: Post-allenamento, spuntino in ufficio, colazione veloce, viaggio.
Preparazione: Agitare bene prima dell''uso. Consumare freddo.
Conservazione: A temperatura ambiente, una volta aperto consumare entro 24 ore.', '<div class="warning-box">
<h4>⚠️ Avvertenze</h4>
<ul>
<li>Non superare la dose giornaliera consigliata</li>
<li>Tenere fuori dalla portata dei bambini</li>
<li>Conservare in luogo fresco e asciutto, lontano da fonti di calore</li>
<li>Non utilizzare in caso di allergie specifiche del prodotto</li>
<li>Consultare il medico in caso di patologie particolari</li>
</ul>
</div>', '<div class="expert-tip">
<h4>💡 Consiglio dell''Esperto</h4>
<p>Le proteine liquide hanno un assorbimento più rapido rispetto alle polveri. Ideale come "primo soccorso proteico" quando non puoi preparare il tuo shake abituale. Perfetto anche come base per smoothie fatti in casa.</p>
</div>', false, false, false, '2025-06-26 13:51:52.215978', NULL, NULL, NULL, NULL);
INSERT INTO public.products VALUES (778, 'refuel-recovery', 'Refuel Recovery', 11, 3, 'Integratore post-workout per il recupero muscolare con carboidrati, proteine e elettroliti. Formula specifica per la fase di recupero.', 'Integratore alimentare post workout completo e gustoso per il recupero muscolare. Contiene tre fonti di carboidrati a assorbimento differenziato (Cluster Dextrin™, maltodestrine, isomaltulosio) per rifornire le scorte di glicogeno. Una miscela di aminoacidi (leucina, glutammina, isoleucina, valina, alanina) e HMB supporta la riparazione muscolare. La citrullina favorisce lo scambio di nutrienti, mentre magnesio, potassio e vitamine reintegrano i sali minerali persi.', '{
    "valori_nutrizionali": {
      "dose": "Per porzione",
      "tabella": [
        {"componente": "Cluster Dextrin™", "quantita": "3000 mg"},
        {"componente": "L-leucina", "quantita": "1250 mg"},
        {"componente": "L-glutammina", "quantita": "1250 mg"},
        {"componente": "L-isoleucina", "quantita": "625 mg"},
        {"componente": "L-valina", "quantita": "625 mg"},
        {"componente": "L-alanina", "quantita": "625 mg"},
        {"componente": "L-glicina", "quantita": "625 mg"},
        {"componente": "Potassio", "quantita": "300 mg", "vnr": "15%"},
        {"componente": "HMB di calcio", "quantita": "500 mg"},
        {"componente": "OKG", "quantita": "500 mg"},
        {"componente": "L-citrullina", "quantita": "500 mg"},
        {"componente": "Magnesio", "quantita": "56,2 mg", "vnr": "15%"},
        {"componente": "Vitamina C", "quantita": "80 mg", "vnr": "100%"},
        {"componente": "Vitamina E", "quantita": "12 mg", "vnr": "100%"},
        {"componente": "Beta-carotene", "quantita": "3 mg (500 µg RE)", "vnr": "62,5%"},
        {"componente": "Vitamina B6", "quantita": "1,4 mg", "vnr": "100%"},
        {"componente": "Selenio", "quantita": "25 µg", "vnr": "46%"}
      ]
    },
    "ingredienti": "Maltodestrine (32,7%); isomaltulosio (22%); Cluster Dextrin™-destrine cicliche altamente ramificate; L-leucina; L-glutammina; L-isoleucina; L-valina; L-alanina; L-glicina; carbonato di potassio; idrossimetilbutirrato di calcio (HMB); ornitina alfa-chetoglutarato (OKG); L-citrullina; citrato di magnesio; agente antiagglomerante: biossido di silicio; aroma; acidificante: acido citrico; vitamina C (acido L-ascorbico); vitamina E (acetato di DL-alfa-tocoferile); vitamina B6 (cloridrato di piridossina); beta-carotene; selenio metionina."
  }', 'Si consiglia di seguire le indicazioni riportate sulla confezione del prodotto o di consultare un professionista.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Conservare in luogo fresco e asciutto.', 'Una formula post-workout completa che combina carboidrati avanzati per il ripristino del glicogeno, aminoacidi ramificati per la sintesi proteica, HMB per la protezione muscolare, elettroliti per la reidratazione e vitamine antiossidanti. Cluster Dextrin™ garantisce un assorbimento rapido senza disturbi gastrointestinali.', false, false, false, '2025-06-24 15:39:45.426495', NULL, 'Agrumi', '25g', '250');
INSERT INTO public.products VALUES (1219, 'glutammina-peptide', 'Glutammina Peptide', 25, 2, 'L-Glutammina Peptide in polvere per assorbimento ottimizzato', 'Integratore alimentare a base di L-glutammina peptide in polvere. I peptidi di glutammina offrono un assorbimento superiore rispetto alla glutammina libera, garantendo una migliore biodisponibilità. La glutammina è l''aminoacido più abbondante nel tessuto muscolare e svolge funzioni importanti nel recupero post-allenamento. La forma peptidica permette un assorbimento più rapido ed efficace, risultando particolarmente utile per gli sportivi che necessitano di un rapido ripristino dei livelli di glutammina dopo l''attività fisica intensa.', '{"titolo":"Glutammina Peptide","per_porzione":{"descrizione":"Valori nutrizionali per dose giornaliera","porzione":"5 compresse","valori":[{"componente":"L-Glutammina Peptide","valore":"5000 mg"}]},"ingredienti":"glutammina peptide, calcio fosfato, cellulosa microcristallina, antiagglomerante: magnesio sterarato."}', 'Si consiglia di assumere 1 misurino (5g) al giorno da sciogliere in acqua dopo l''allenamento.', NULL, NULL, false, false, false, '2025-08-04 08:22:28.53277', 44, 'Unico', NULL, '150g');
INSERT INTO public.products VALUES (1171, 'vitamin-c-1000-mg', 'Vitamin C 1000 mg', 23, 7, 'Integratore alimentare di vitamina C', 'Integratore alimentare di Vitamina C ad alto dosaggio per il supporto del sistema immunitario e la protezione dallo stress ossidativo. La Vitamina C contribuisce al normale funzionamento del sistema immunitario, alla riduzione della stanchezza e dell''affaticamento, e alla normale formazione del collagene per la normale funzione di ossa, cartilagini, gengive, pelle e vasi sanguigni. Formula ad alta biodisponibilità per un assorbimento ottimale.', '{"titolo":"Vitamin C 1000 mg","per_porzione":{"descrizione":"Valori nutrizionali per porzione","porzione":"1 compressa","valori":[{"componente":"Vitamina C","valore":"1000 mg (1250% VNR)"}]},"ingredienti":"Acido L-ascorbico (vitamina C), bioflavonoidi da agrumi, cellulosa microcristallina, acido stearico, magnesio stearato, biossido di silicio."}', 'Assumere 1 compressa al giorno con acqua durante i pasti.', 'Non superare la dose giornaliera consigliata. Tenere fuori dalla portata dei bambini di età inferiore ai 3 anni. In caso di calcoli renali consultare il medico prima dell''uso.', NULL, false, false, false, '2025-08-04 07:34:17.281667', 27, 'Unico', '90 compresse', '90 compresse');
INSERT INTO public.products VALUES (989, 'creatina-platinum', 'Creatina Platinum', 11, 2, 'Creatina arricchita con arginina e taurina per performance e recupero superiori', 'Combinazione di creatina, taurina e arginina per un''energia muscolare potenziata. La creatina aumenta forza e potenza, la taurina supporta il recupero muscolare riducendo l''affaticamento, e l''arginina favorisce il flusso sanguigno e l''apporto di nutrienti ai muscoli.', '{
    "valori_nutrizionali": {
      "dose": "Per porzione",
      "tabella": [
        {"componente": "Creatina monoidrato Creapure®", "quantita": "2,5 g"},
        {"componente": "di cui creatina", "quantita": "2,2 g"},
        {"componente": "Taurina", "quantita": "250 mg"},
        {"componente": "L-arginina HCL", "quantita": "250 mg"},
        {"componente": "di cui L-arginina", "quantita": "207,5 mg"}
      ]
    },
    "ingredienti": "Creatina monoidrato Creapure®; taurina; L-arginina cloridrato (HCL). SENZA GLUTINE."
  }', 'Sciogliere 6 g di prodotto (2 misurini) in acqua ed assumere preferibilmente lontano dai pasti. Utilizzare per un massimo di 1 mese consecutivo, alternando periodi di pausa.

', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Senza glutine. Conservare in luogo fresco e asciutto.', 'Una formula sinergica che va oltre la semplice creatina: Creapure® per la massima purezza, taurina per l''idratazione cellulare e il recupero, L-arginina per migliorare il pump muscolare e la vasodilatazione. Una combinazione scientifica per performance e recupero ottimali.', false, false, false, '2025-06-27 16:00:57.282047', NULL, 'Neutro', '300g', '30 dosi');
INSERT INTO public.products VALUES (988, 'gluco-creatina', 'Gluco Creatina+', 1, 3, 'Formula innovativa con glucosio e creatina per massimizzare l''uptake muscolare', 'Integratore alimentare avanzato che combina creatina monoidrato e glucosio per supportare la prestazione muscolare, migliorare il recupero e aumentare la disponibilità di energia durante l''attività fisica intensa. La sinergia tra creatina e glucosio facilita l''assorbimento e l''utilizzo della creatina da parte del tessuto muscolare.', '{
    "valori_nutrizionali": {
      "dose": "Per 1 dose = 6 compresse",
      "tabella": [
        {"componente": "Valore energetico", "quantita": "68 kJ / 16 kcal"},
        {"componente": "Grassi", "quantita": "0 g"},
        {"componente": "di cui Acidi grassi saturi", "quantita": "0 g"},
        {"componente": "Carboidrati", "quantita": "4 g"},
        {"componente": "di cui Zuccheri", "quantita": "4 g"},
        {"componente": "Proteine", "quantita": "0 g"},
        {"componente": "Sale", "quantita": "0 g"},
        {"componente": "Creatina monoidrato*", "quantita": "3 g"}
      ]
    },
    "ingredienti": "D-glucosio, creatina monoidrato*, agenti di carica: cellulosa microcristallina, agenti antiagglomeranti: magnesio stearato, silice; aroma, edulcoranti: sucralosio, glicosidi steviolici da Stevia. * Creapure°, Alzchem, Germany."
  }', 'SPORT: Ideale per atleti che praticano attività intense e ripetute, come powerlifting, crossfit, o sprint. Assumere 6-12 compresse al giorno, suddivise tra pre e post allenamento. VITA QUOTIDIANA: Utile per integrare carenze di creatina in soggetti che seguono diete vegetariane o soffrono di debolezza muscolare. Assumere 6 compresse al giorno distribuite nell''arco della giornata.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Conservare in luogo fresco e asciutto.', 'Una formula scientificamente avanzata che sfrutta la sinergia tra creatina Creapure® e glucosio per ottimizzare l''assorbimento intracellulare. Il glucosio stimola la produzione di insulina, facilitando il trasporto della creatina nelle cellule muscolari per una maggiore efficacia.', false, false, false, '2025-06-27 16:00:57.282047', NULL, 'Arancia', '210 compresse', '35 dosi');
INSERT INTO public.products VALUES (1209, 'bcaa-sport-4-1-1', 'BCAA Sport 4:1:1', 25, 2, 'Aminoacidi ramificati in polvere BCAA 4.1.1 con vitamine B1 e B6', 'Prodotto in polvere a base di BCAA (L-Leucina, L-Isoleucina, L-Valina) nel rapporto 4-1-1 arricchito con le vitamine B1 e B6. BCAA 4-1-1 Sport è indicato per chi pratica attività fisico-sportiva intensa aumenta il livello di aminoacidi ramificati disponibili per l''organismo mantenendo un bilancio azotato positivo fornendo quindi una ottima azione energetica ed anticatabolica se assunto prima dell''allenamento che di recupero se assunto dopo l''allenamento. Le Vitamine B1 e B6 intervengono positivamente sul metabolismo proteico, del glicogeno muscolare ed energetico. La Vitamina B6 contribuisce a ridurre la stanchezza e l''affaticamento mentre la B1 contribuisce alla normale funzionalità cardiaca.', '{"titolo":"BCAA Sport 4:1:1","per_porzione":{"descrizione":"Valori nutrizionali per porzione","valori":[{"componente":"L-Leucina","valore":"3334 mg"},{"componente":"L-Isoleucina","valore":"833 mg"},{"componente":"L-Valina","valore":"833 mg"},{"componente":"Vitamina C","valore":"250 mg (312% RDA)"},{"componente":"Vitamina B","valore":"2 mg (142% RDA)"}]},"ingredienti":"L-Leucina (Kyowa Quality®), L-Isoleucina (Kyowa Quality®), L-Valina (Kyowa Quality®), Acido ascorbico (vit. C), cellulosa microcristallina, amido di mais pregelatinizzato, antiagglomeranti: biossido di silicio, magnesio stearato vegetale, piridossina cloridrato (vit. B6)."}', 'Assumere 5 compresse al giorno con acqua prima o dopo l’attività sportiva.', NULL, NULL, false, false, false, '2025-08-04 08:21:47.169708', 39, 'Limone', NULL, '100 capsule');
INSERT INTO public.products VALUES (991, 'creatina-200-mesh', 'Creatina 200 Mesh', 11, 2, 'Creatina ultrafine 200 mesh per solubilità e assorbimento superiori', 'Integratore di creatina monoidrato micronizzata. Naturalmente presente nell''organismo, la creatina fornisce energia durante la contrazione muscolare, migliora la performance sportiva, aumenta la massa muscolare e favorisce il recupero post-allenamento. Ideale per fasi pre-workout e post-workout.', '{
    "valori_nutrizionali": {
      "dose": "Per dose giornaliera",
      "tabella": [
        {"componente": "Creatina monoidrato 200 Mesh", "quantita": "3,0 g"}
      ]
    },
    "ingredienti": "Creatina monoidrato micronizzata 200 Mesh. SENZA GLUTINE."
  }', 'SPORT: Sciogliere un misurino di prodotto (3 g) una volta al giorno in almeno 100 ml di acqua, preferibilmente lontano dai pasti o 30 minuti prima di un allenamento intenso. Per gli sportivi l''apporto giornaliero può arrivare a 2 misurini al giorno (6 g) per non più di un mese consecutivo.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Senza glutine. Conservare in luogo fresco e asciutto.', 'Creatina monoidrato con tecnologia 200 Mesh per particelle ultrafini che garantiscono dissoluzione istantanea e assorbimento rapido. La micronizzazione avanzata elimina completamente i residui e migliora significativamente la biodisponibilità per risultati più veloci ed efficaci.', false, false, false, '2025-06-27 16:00:57.282047', NULL, 'Neutro', 'Vari formati', 'Da 40 a 100 dosi');
INSERT INTO public.products VALUES (1221, 'astaxantina-plus', 'Astaxantina Plus', 25, 7, 'Integratore alimentare a base di Astaxantina, composto naturale riconosciuto per la sua straordinaria capacità antiossidante, significativamente superiore a quella di altri carotenoidi come il beta-carotene e la vitamina E.', 'Integratore alimentare a base di Astaxantina, composto naturale riconosciuto per la sua straordinaria capacità antiossidante, significativamente superiore a quella di altri carotenoidi come il beta-carotene e la vitamina E. L''Astaxantina agisce neutralizzando i radicali liberi, proteggendo le cellule dallo stress ossidativo e dai danni indotti da fattori ambientali e interni. La sua particolare struttura molecolare le permette di attraversare le membrane cellulari, fornendo protezione a livello lipidico e acquoso. Questo la rende un alleato prezioso per supportare la salute della pelle, la funzionalità visiva, la performance muscolare e il benessere generale dell''organismo.', '{
    "nutritional_table": {
      "title": "Valori Nutrizionali",
      "serving_size": "1 compressa",
      "servings_per_container": "60",
      "values": [
        {"nutrient": "Astaxantina", "amount": "8", "unit": "mg", "daily_value": null}
      ]
    },
    "ingredients": "Cellulosa microcristallina, Calcio difosfato, Astaxantina (Haematococcus pluvialis Flotow) tallo 5%, Antiagglomeranti: Magnesio stearato E470 (b), Mono e digliceridi degli acidi grassi E471, Biossido di silicio E551.",
    "usage": "Assumere 1 compressa al giorno con acqua."
  }', 'Assumere 1 compressa al giorno con acqua.', NULL, NULL, false, false, false, '2025-08-04 08:39:10.536301', NULL, 'Unico', NULL, '60 capsule');
INSERT INTO public.products VALUES (933, 'rm1-bcaa-8-1-1-recovery-mix', 'R.M.1 BCAA 8:1:1 Recovery Mix', 1, 2, 'Recovery Mix con aminoacidi ramificati BCAA 8:1:1 in gel pratico per il recupero immediato post-allenamento', 'R.M.1 BCAA 8:1:1 Recovery Mix è una miscela di nutrienti formulata per favorire il recupero muscolare e il ripristino delle riserve energetiche dopo allenamenti intensi e prolungati. La sua composizione bilanciata include BCAA in rapporto 8:1:1, creatina, glutammina, taurina, carboidrati a rilascio differenziato e minerali essenziali, garantendo un recupero rapido ed efficace.', '{
    "valori_nutrizionali": {
      "dose": "1 dose = 50 g",
      "tabella": [
        {"componente": "Energia", "quantita": "768 kJ / 181 kcal", "vnr": ""},
        {"componente": "Grassi", "quantita": "0 g", "vnr": ""},
        {"componente": "- di cui saturi", "quantita": "0 g", "vnr": ""},
        {"componente": "Carboidrati", "quantita": "38 g", "vnr": ""},
        {"componente": "- di cui zuccheri", "quantita": "15 g", "vnr": ""},
        {"componente": "Fibre", "quantita": "0 g", "vnr": ""},
        {"componente": "Proteine", "quantita": "6,5 g", "vnr": ""},
        {"componente": "Sale", "quantita": "0 g", "vnr": ""},
        {"componente": "Vitamina C", "quantita": "40 mg", "vnr": "50%"},
        {"componente": "Magnesio", "quantita": "57 mg", "vnr": "15%"},
        {"componente": "Potassio", "quantita": "300 mg", "vnr": "15%"},
        {"componente": "Creatina monoidrato", "quantita": "2.000 mg", "vnr": ""},
        {"componente": "L-Glutammina", "quantita": "2.000 mg", "vnr": ""},
        {"componente": "L-leucina", "quantita": "4.000 mg", "vnr": ""},
        {"componente": "L-isoleucina", "quantita": "500 mg", "vnr": ""},
        {"componente": "L-valina", "quantita": "500 mg", "vnr": ""},
        {"componente": "Taurina", "quantita": "500 mg", "vnr": ""}
      ]
    },
    "ingredienti": "Maltodestrine, fruttosio, L-leucina (Ajinomoto), creatina monoidrato** (Creapure®), L-glutammina*, acidificante: acido citrico; L-isoleucina*, L-valina*, aroma, agente antiagglomerante: biossido di silicio; taurina, magnesio citrato, potassio cloruro, potassio fosfato bibasico, edulcoranti: sucralosio, glicosidi steviolici da Stevia; acido L-ascorbico (vitamina C). Può contenere latte, uova e soia. *Kyowa Quality® **Prodotta nella UE (Creapure®, AlzChem AG, Germany)."
  }', 'Indicato per chi pratica attività ad alta intensità con un elevato dispendio energetico. Dose consigliata: 50 g (2 misurini e mezzo o 2 bustine) disciolti in almeno 250 ml di acqua, da assumere subito dopo lo sforzo. Agitare vigorosamente per garantire la perfetta solubilità.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Conservare in luogo fresco e asciutto.', 'Questa miscela completa è un''ottima soluzione "all-in-one" per il recupero post-allenamento, fornendo un mix sinergico di aminoacidi, carboidrati e minerali essenziali per un ripristino rapido ed efficace.', false, false, false, '2025-06-26 15:26:24.792428', NULL, NULL, NULL, NULL);
INSERT INTO public.products VALUES (1159, 'pure-soy-isolate', 'Pure Soy Isolate', 23, 1, 'PURE SOY ISOLATE è un integratore alimentare di proteine isolate della soia a solubilità istantanea con edulcorante, da ricostituire a bevanda.', 'PURE SOY ISOLATE è un integratore alimentare di proteine isolate di soia con edulcorante e vitamina B12, a solubilità istantanea e di ottimo gusto. PURE SOY ISOLATE è formulato con proteine isolate di soia, proteine di origine vegetale di elevato valore biologico. Le proteine contribuiscono alla crescita e al mantenimento della massa muscolare. È ideale per vegani, vegetariani e per chiunque cerchi un''alternativa alle proteine animali.

Modalità d''uso: Assumere una porzione da 30 g (2 misurini) al giorno miscelata con 200-250 ml di acqua o altro liquido a scelta.

Ingredienti: Proteine isolate di SOIA; Aromi; Sale; Edulcorante: sucralosio; Cianocobalamina (Vitamina B12).', '{"nome_prodotto":"Pure Soy Isolate","valori_nutrizionali":{"per_porzione":{"descrizione":"Informazioni nutrizionali per porzione:","porzione":"30 g","valori":[{"componente":"Energia","valore":"465 kJ/110 kcal"},{"componente":"Grassi","valore":"0,4 g"},{"componente":"di cui acidi grassi saturi","valore":"0,1 g"},{"componente":"Carboidrati","valore":"0,5 g"},{"componente":"di cui zuccheri","valore":"0,2 g"},{"componente":"Proteine","valore":"26 g"},{"componente":"Sale","valore":"0,18 g"},{"componente":"Vitamina B6","valore":"0,42 mg (30% VNR)"},{"componente":"Vitamina B12","valore":"1,25 mcg (50% VNR)"}]},"per_100g":{"descrizione":"Informazioni nutrizionali per 100 g:","valori":[{"componente":"Energia","valore":"1573 kJ/371 kcal"},{"componente":"Grassi","valore":"1,4 g"},{"componente":"di cui acidi grassi saturi","valore":"0,3 g"},{"componente":"Carboidrati","valore":"1,5 g"},{"componente":"di cui zuccheri","valore":"0,5 g"},{"componente":"Proteine","valore":"88 g"},{"componente":"Sale","valore":"0,6 g"}]}},"ingredienti":"Proteine isolate della soia, aromi, addensante: carbossimetilcellulosa sodica; cloridrato di piridossina (Vitamina B6), cianocobalamina (Vitamina B12), edulcoranti: sucralosio, acesulfame K."}', 'Aggiungere 3 misurini (30 g) di PURE SOY ISOLATE in 200 - 250 ml di acqua ed assumere una volta al giorno, lontano dai pasti principali.', 'Ingredienti: Proteine della SOIA isolate; Cacao in polvere; Aromi; Sale; Edulcorante: sucralosio; Piridossina cloridrato (vitamina B6); Cianocobalamina (vitamina B12).', NULL, false, false, false, '2025-08-04 07:31:06.255695', 21, 'Cioccolato', '900g', '900g');
INSERT INTO public.products VALUES (1157, 'prime-wpi', 'Prime WPI', 23, 1, 'PRIME WPI è un integratore alimentare di proteine del siero di latte isolate a solubilità istantanea, con edulcorante', 'PRIME WPI è un integratore alimentare di proteine del siero del latte isolate con edulcorante e bromelina, a solubilità istantanea e di ottimo gusto. PRIME WPI è formulato con proteine isolate del siero di latte, proteine di elevato valore biologico e di massima purezza. Le proteine contribuiscono alla crescita e al mantenimento della massa muscolare. Alla sua formula proteica abbiamo aggiunto Bromelina, un enzima proteolitico che favorisce la digestione delle proteine.

Modalità d''uso: Assumere una porzione da 30 g (2 misurini) al giorno miscelata con 200-250 ml di acqua o altro liquido a scelta.

Ingredienti: Proteine del siero di LATTE isolate; Aromi; Sale; Edulcorante: sucralosio; Bromelina.', '["Valori Nutrizionali per porzione:", "1 PORZIONE = 3 MISURINI (30g) ", "Energia  456 kJ/107 kcal", "Grassi  0,1 g", "di cui acidi grassi saturi  0,1 g", "Carboidrati  0,6 g", "di cui zuccheri  0,5 g", "Proteine  26 g", "Sale  0,18 g", "Vitamina B6 (30% VNR)  0,42 mg", "Bromelina 2400 GDU  30 mg", "", "Valori Nutrizionali per 100g:", "Energia  1543 kJ/363 kcal", "Grassi  0,4 g", "di cui acidi grassi saturi  0,2 g", "Carboidrati  1,9 g", "di cui zuccheri  1,6 g", "Proteine  88 g", "Sale  0,6 g", "Vitamina B6 (30% VNR)  1,4 mg", "Bromelina 2400 GDU  100 mg", "", "PROFILO AMINOACIDICO TIPICO  % SULLE PROTEINE", "L-Isoleucina  6,40", "L-Leucina  10,60", "L-Valina  5,90", "BCAA totali  22,90", "L-Lisina  9,60", "L-Metionina  2,20", "L-Fenilalanina  3,00", "L-Treonina  6,70", "L-Arginina  2,10", "L-Alanina  5,00", "L-Acido Aspartico  11,00", "L-Cistina  2,20", "L-Acido Glutammico  18,10", "L-Glicina  1,40", "L-Istidina  1,70", "L-Prolina  5,50", "L-Serina  4,60", "L-Tirosina  2,60", "L-Triptofano  1,40", "", "VNR = valori nutritivi di riferimento"]', 'Assumere una porzione da 30 g (3 misurini) al giorno miscelata con 130-200 ml di acqua o altro liquido a scelta.', 'Ingredienti: Purissime proteine del siero di LATTE isolate; Aromi; Edulcorante: sucralosio; Bromelina 2400 GDU; Piridossina cloridrato (Vitamina B6).', NULL, false, false, false, '2025-08-04 07:30:56.093337', 20, 'Vaniglia', '1kg', '1000g');
INSERT INTO public.products VALUES (632, 'big-bar', 'Big Bar', 1, 8, 'Barretta energetica ricca di carboidrati e proteine, ideale per il supporto energetico durante attività intense...', 'Big Bar è una barretta proteica con il 30% di proteine del latte, formulata per fornire un apporto nutrizionale bilanciato in un formato pratico e gustoso. Ricoperta di cioccolato al latte, è uno snack proteico ideale per il post-allenamento o come spuntino saziante. La sua formulazione è priva di proteine del collagene idrolizzato e di grassi idrogenati.', '{
    "valori_nutrizionali": {
      "dose": "1 dose = 1 barretta",
      "tabella": [
        {"componente": "Energia", "quantita": "1.399 kJ / 333 kcal"},
        {"componente": "Grassi", "quantita": "12 g"},
        {"componente": "- di cui saturi", "quantita": "6,4 g"},
        {"componente": "Carboidrati", "quantita": "30,4 g"},
        {"componente": "- di cui zuccheri", "quantita": "12 g"},
        {"componente": "Polioli", "quantita": "1,6 g"},
        {"componente": "Fibre", "quantita": "5,2 g"},
        {"componente": "Proteine", "quantita": "24 g"},
        {"componente": "Sale", "quantita": "0,04 g"}
      ]
    },
    "ingredienti": "Proteine del latte 30%, sciroppo di glucosio, cioccolato al latte di copertura 20% (zucchero, latte intero in polvere, burro di cacao, pasta di cacao, emulsionante: lecitina di soia; aroma naturale di vaniglia), galattooligosaccaride (derivati del latte), olio di semi di girasole, cocco disidratato 3%, fruttosio, umidificante: sorbitolo; conservante: sorbato di potassio, aromi."
  }', 'Post-allenamento: fornisce un supporto proteico per il recupero muscolare. Snack proteico: ideale a metà mattina o pomeriggio per spezzare la fame. In caso di necessità nutrizionale: utile quando non si ha tempo per un pasto completo.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Conservare in luogo fresco e asciutto.', 'Con un buon bilanciamento di proteine e carboidrati, è una barretta versatile che può essere usata sia per il recupero post-allenamento che come snack energetico durante la giornata.', false, false, false, '2025-06-10 05:28:27.030893', NULL, NULL, NULL, NULL);
INSERT INTO public.products VALUES (955, '75-protein-bar', '75 Protein Bar', 11, 8, 'Barretta proteica da 30g di proteine con gusto intenso di frutti di bosco, ideale per il supporto della massa muscolare.', '75 Protein Bar è una barretta ad alto contenuto proteico e un basso tenore di zuccheri. Grazie alla sua composizione, che include il 40% di proteine di alta qualità provenienti da caseinato di calcio, proteine concentrate del siero del latte e proteine isolate della soia, è particolarmente indicata per coloro che desiderano aumentare o mantenere la massa muscolare durante il periodo di definizione. Gustosa e croccante, rappresenta una scelta ideale come spuntino pomeridiano o per soddisfare un attacco di fame, senza compromettere la dieta. La presenza di polioli al posto degli zuccheri tradizionali la rende perfetta per chi segue regimi alimentari controllati.', '{"titolo":"75 Protein Bar","valori_nutrizionali":{"per_100g_ml":{"energia":"1527 kJ / 365 kcal","grassi":"13 g","di_cui_acidi_grassi_saturi":"4,2 g","carboidrati":"34 g","di_cui_zuccheri":"1,2 g","di_cui_polioli":"32 g","fibre":"1,5 g","proteine":"40 g","sale":"0 g"},"per_porzione":{"energia":"1145 kJ / 274 kcal","grassi":"9,8 g","di_cui_acidi_grassi_saturi":"3,2 g","carboidrati":"26 g","di_cui_zuccheri":"0,9 g","di_cui_polioli":"24 g","fibre":"1,1 g","proteine":"30 g","sale":"0 g"}},"ingredienti":"miscela proteica: caseinato di calcio (latte), proteine concentrate del siero del latte; stabilizzante: maltitolo; umidificante: sorbitolo; gelatina bovina idrolizzata; copertura al cacao (9%) [edulcorante: maltitolo, grassi vegetali non idrogenati RSPO MB (palma, palmisito, karitè), cacao magro in polvere (13%), emulsionante: lecitina di girasole]; olio di girasole; proteine isolate di soia; cacao in polvere (1,7%); aromi; cacao magro in polvere (0,8%). Un consumo eccessivo può avere effetti lassativi. Può contenere uova, arachidi e frutta a guscio. SENZA GLUTINE.","nota":"*VNR: Valori Nutritivi di Riferimento"}', 'Le modalità d''uso specifiche non sono state fornite nel testo.', 'Un consumo eccessivo può avere effetti lassativi. Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Conservare in luogo fresco e asciutto.', 'Con il suo elevato contenuto proteico e il basso tenore di zuccheri, è uno spuntino strategico per il mantenimento o l''aumento della massa muscolare, senza appesantire la dieta.', false, false, false, '2025-06-27 15:06:09.83434', NULL, 'Frutti di Bosco', '75', 'g');
INSERT INTO public.products VALUES (951, 'crema-di-arachidi-peanut-butter', 'Crema di Arachidi Peanut Butter', 11, 8, 'Crema di arachidi 100% naturale con consistenza liscia e cremosa, ideale per spalmatura e preparazioni culinarie fitness', 'Crema di arachidi iperproteica WHYsport contiene arachidi pelate, tostate e macinate e proteine del latte, senza aggiunta di sali, zuccheri e conservanti. Ideale per una colazione gustosa o come snack durante la giornata per chi segue uno stile di vita sano ed equilibrato o per chi segue un regime alimentare finalizzato al dimagrimento o mantenimento del peso corporeo.', '{
    "valori_nutrizionali": {
      "tabella": [
        {"componente": "Energia", "per_100g": "2212 kJ / 529 kcal", "vnr": ""},
        {"componente": "Grassi", "per_100g": "32 g", "vnr": ""},
        {"componente": "- di cui saturi", "per_100g": "18 g", "vnr": ""},
        {"componente": "Carboidrati", "per_100g": "16 g", "vnr": ""},
        {"componente": "- di cui zuccheri", "per_100g": "4,2 g", "vnr": ""},
        {"componente": "Fibre", "per_100g": "3,3 g", "vnr": ""},
        {"componente": "Proteine", "per_100g": "50 g", "vnr": ""},
        {"componente": "Sale", "per_100g": "0,0 g", "vnr": ""}
      ]
    },
    "ingredienti": "Arachidi (75%); proteine del latte (18%); arachidi in pezzi (5%); olio di cocco. Può contenere tracce di frutta a guscio."
  }', 'Ottimo a colazione spalmato sul pane o fette biscottate ma anche come snack da consumare in qualunque momento della giornata.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Conservare in luogo fresco e asciutto. Può contenere tracce di frutta a guscio.', 'Simile alla versione Smooth ma con l''aggiunta di pezzi, questa crema di arachidi iperproteica è un''ottima scelta per chi cerca un incremento proteico senza zuccheri o conservanti aggiunti, ideale per diete controllate.', false, false, false, '2025-06-27 14:38:25.098545', NULL, NULL, NULL, NULL);
INSERT INTO public.products VALUES (956, 'crema-di-arachidi-iperproteica', 'Crema di Arachidi Iperproteica', 11, 8, 'Crema di arachidi ad alto contenuto proteico con granella croccante, ideale per arricchire colazione e spuntini.', 'Crema di Arachidi Smooth contiene arachidi pelate, tostate e macinate e proteine del latte, senza aggiunta di sali, zuccheri e conservanti. Ideale per una colazione gustosa o come snack durante la giornata per chi segue uno stile di vita sano ed equilibrato o per chi segue un regime alimentare finalizzato al dimagrimento o mantenimento del peso corporeo. Contiene ben il 50% di proteine. Disponibile anche nella variante crunchy con granella di arachidi.', '{
    "valori_nutrizionali": {
      "tabella": [
        {"componente": "Energia", "per_100g": "2212 kJ / 529 kcal", "vnr": ""},
        {"componente": "Grassi", "per_100g": "32 g", "vnr": ""},
        {"componente": "- di cui saturi", "per_100g": "18 g", "vnr": ""},
        {"componente": "Carboidrati", "per_100g": "15 g", "vnr": ""},
        {"componente": "- di cui zuccheri", "per_100g": "3,4 g", "vnr": ""},
        {"componente": "Fibre", "per_100g": "3,3 g", "vnr": ""},
        {"componente": "Proteine", "per_100g": "50 g", "vnr": ""},
        {"componente": "Sale", "per_100g": "0,0 g", "vnr": ""}
      ]
    },
    "ingredienti": "Arachidi (75%); proteine del latte (20%); olio di cocco. Può contenere frutta a guscio. SENZA GLUTINE."
  }', 'Ottimo a colazione spalmato sul pane o fette biscottate ma anche come snack da consumare in qualunque momento della giornata.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Conservare in luogo fresco e asciutto. Può contenere frutta a guscio.', 'Con un impressionante 50% di proteine, questa crema di arachidi è eccellente per aumentare l''apporto proteico in modo naturale e gustoso, ideale per la colazione o come snack durante diete per il controllo del peso.', false, false, false, '2025-06-27 15:06:09.83434', NULL, 'Crunchy', '350', 'g');
INSERT INTO public.products VALUES (637, 'light-protein-plus-bar', 'Light PROTEIN+ Bar', 1, 8, 'Barretta proteica light con 20g di proteine e solo 150 calorie, disponibile in 2 gusti gourmet', 'Light Protein+ Bar è una barretta proteica con oltre il 30% di proteine, ottenute principalmente dalle proteine del latte. La sua formulazione è studiata per fornire un elevato apporto proteico, limitando al massimo la presenza di zuccheri (solo 1 g per barretta). Questa barretta è perfetta per chi segue un''alimentazione controllata e vuole uno snack nutriente, gustoso e bilanciato. Il profilo nutrizionale equilibrato la rende ideale sia per gli sportivi che per chi desidera uno spuntino proteico durante la giornata. Grazie alla copertura di cioccolato fondente e alla combinazione di strati croccanti, Light Protein+ Bar garantisce un''esperienza gustativa appagante senza compromettere la qualità degli ingredienti.', '{
    "valori_nutrizionali": {
      "dose": "1 dose = 1 barretta",
      "tabella": [
        {"componente": "Energia", "quantita": "666 kJ / 159 kcal"},
        {"componente": "Grassi", "quantita": "6,3 g"},
        {"componente": "- di cui saturi", "quantita": "3,6 g"},
        {"componente": "Carboidrati", "quantita": "13 g"},
        {"componente": "- di cui zuccheri", "quantita": "1 g"},
        {"componente": "Polioli", "quantita": "9,4 g"},
        {"componente": "Fibre", "quantita": "5 g"},
        {"componente": "Proteine", "quantita": "14 g"},
        {"componente": "Sale", "quantita": "0,22 g"}
      ]
    },
    "ingredienti": "Proteine del latte, cioccolato fondente con edulcorante 18%, umidificante: sorbitolo; ripieno al caramello 10%, frutto-oligosaccaridi, grassi vegetali (cocco, girasole, acqua), isomalto-oligosaccaride, estrusi di soia, biscotti frollini senza zuccheri aggiunti con edulcoranti 1,3%, aromi, latte in polvere, maltodestrina, emulsionante: lecitina di soia, burro di cacao; sale, acidificante: acido citrico; conservante: sorbato di potassio; edulcorante: sucralosio."
  }', 'Dopo l''allenamento: favorisce il recupero muscolare dopo un''attività fisica intensa. Dosi consigliate: 1 barretta post-allenamento. Come snack proteico: una soluzione pratica e nutriente per spezzare la fame. Dosi consigliate: 1 barretta come spuntino a metà mattina o pomeriggio.', 'Un consumo eccessivo può avere effetti lassativi. Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Conservare in luogo fresco e asciutto. Può contenere tracce di senape, frutta a guscio e arachidi.', 'Con un alto contenuto proteico e solo 1g di zuccheri, è uno snack eccellente per chi è attento alla dieta e vuole supportare la massa muscolare senza compromettere l''apporto di zuccheri.', false, false, false, '2025-06-10 05:32:57.763233', NULL, NULL, '45', 'g');
INSERT INTO public.products VALUES (1533, 'maltodex-pure-100', 'Maltodex Pure 100%', 6, 7, 'MALTODEX PURE 100% è un integratore alimentare di maltodestrine da mais.', 'MALTODEX PURE 100% è un integratore alimentare energetico in polvere di maltodestrine utile prima, durante e dopo le attività fisiche.

è un prodotto dietetico energetico per sportivi in polvere di carboidrati costituito da Maltodestrine purissime, destrosio equivalenza 19, arricchito con vitamina B6.

Inoltre, è un carboidrato complesso, che grazie alle sue molecole fornisce energia facilmente e rapidamente utilizzabile con un rilascio energetico prolungato e regolare.

Risulta utile prima, durante e dopo le attività fisiche.', '{
    "titolo": "Integratore di Maltodestrine e Vitamina B6",
    "valori_nutrizionali": {
      "per_100g": {
        "energia": "396 kcal / 1683 kj",
        "grassi": "0 g",
        "carboidrati": "96 g",
        "di_cui_zuccheri": "6,7 g",
        "proteine": "0 g",
        "sale": "0 g",
        "vitamina_b6": "2 mg"
      },
      "per_dose_40g": {
        "energia": "158 kcal / 673 kj",
        "grassi": "0 g",
        "carboidrati": "38,4 g",
        "di_cui_zuccheri": "2,7 g",
        "proteine": "0 g",
        "sale": "0 g",
        "vitamina_b6": "0,8 mg (40% VNR)"
      }
    },
    "ingredienti": "Maltodestrine (da mais), Vitamina B6 (cloridrato di piridossina).",
    "nota": "VNR = Valori nutritivi di riferimento"
  }', 'Assumere 40 g di prodotto (2 misurini) al giorno in 250 ml d''acqua, lontano dai pasti principali. All''interno della confezione è disponibile un misurino dosatore.', NULL, NULL, false, false, false, '2025-09-02 14:54:10.016019', 138, 'Unico', '1,1kg', NULL);
INSERT INTO public.products VALUES (758, 'ashwagandha-jamieson', 'Ashwagandha', 10, 7, 'Estratto di Ashwagandha per la gestione dello stress e il supporto del benessere mentale', 'Le capsule di Jamieson Ashwagandha sono il modo più semplice per sostenere la tua risposta allo stress e aumentare l''energia. Una formula non OGM e vegetariana che contiene 6.000 mg di Ashwagandha essiccata per capsula. Supporta una maggiore resistenza alle sollecitazioni, aiuta ad aumentare naturalmente l''energia, aiuta a migliorare la memoria, tradizionalmente usato in Ayurveda come aiuto per dormire. Comode capsule vegetali, una al giorno.', '{
    "valori_nutrizionali": {
      "dose": "Per Capsula",
      "tabella": [
        {"componente": "Estratto di Ashwagandha (10:1)", "quantita": "600 mg"},
        {"componente": "equivalenti a", "quantita": "6.000 mg di erba secca"}
      ]
    },
    "ingredienti": "Estratto di Ashwagandha (10:1) 600 mg (Withania somnifera, radice) equivalenti a 6.000 mg di erba secca. Ingredienti non medicinali: Fosfato bicalcico, cellulosa idrosolubile, cellulosa, magnesio stearato vegetale, silice. NON OGM, senza sale (NaCl), amido, glutine, lattosio, coloranti, aromi o conservanti artificiali."
  }', 'Assumere 1 capsula al giorno.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini. Conservare a una temperatura compresa tra 15°C e 25°C.', 'L''Ashwagandha è un adattogeno eccellente per la gestione dello stress, il supporto energetico e cognitivo. La forma vegetale e non OGM la rende adatta a diverse esigenze dietetiche.', false, false, false, '2025-06-22 21:51:54.790851', NULL, NULL, NULL, '60 compresse');
INSERT INTO public.products VALUES (825, 'berberina-plus', 'Berberina+', 20, 7, 'Estratto di berberina per il controllo glicemico naturale', 'Berberina+ è un integratore sviluppato per supportare il metabolismo glucidico e lipidico. La berberina è un alcaloide vegetale noto per la sua azione nel controllo del glucosio ematico e nella regolazione dei lipidi, rendendolo una soluzione utile per chi segue regimi alimentari finalizzati al controllo del peso, della glicemia e del colesterolo. Berberina+ favorisce inoltre la funzione digestiva, epatica e la regolarità del transito intestinale, contribuendo anche alla normale funzionalità del sistema cardiovascolare.', '{
    "valori_nutrizionali": {
      "dose": "1 dose = 2 capsule",
      "tabella": [
        {"componente": "Berberis aristata", "quantita": "520 mg"},
        {"componente": "di cui Berberina HCl", "quantita": "500 mg"}
      ]
    },
    "ingredienti": "Berberina HCl (da Berberis aristata DC, corteccia dei rami, e.s. tit. al 97%), agente di carica: cellulosa microcristallina; capsula (agente di rivestimento: idrossi-propil-metilcellulosa, stabilizzante: gomma di gellano)."
  }', 'VITA QUOTIDIANA E SPORT: Adatta a chi segue un piano alimentare orientato al controllo del peso, dei livelli glicemici e lipidici. Utile anche in contesti sportivi, per il supporto metabolico generale. Dosi consigliate: 1 capsula a pranzo e 1 capsula a cena, da assumere poco prima o durante i pasti principali.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Consultare il medico in caso di gravidanza, allattamento, patologie o assunzione di farmaci. Conservare in luogo fresco e asciutto.', 'La berberina è un alleato prezioso per la salute metabolica, supportando il controllo di glicemia e colesterolo, oltre a promuovere la funzionalità digestiva ed epatica.', false, false, false, '2025-06-24 16:38:16.727456', NULL, 'Neutro', '60 compresse', '60');
INSERT INTO public.products VALUES (774, 'drenante-why-sport', 'Drenante', 1, 7, 'Integratore drenante a base di estratti vegetali per il benessere delle vie urinarie. Con betulla, tarassaco e tè verde.', 'Drenante è un integratore alimentare formulato per favorire il drenaggio dei liquidi corporei e supportare la normale funzionalità urinaria. Grazie alla sinergia di estratti vegetali come uva ursina, pilosella, betulla, mirtillo rosso, tè verde e orthosiphon, agisce sui ristagni di liquidi in eccesso, promuovendone l''eliminazione. La formula è arricchita con D-mannosio, noto per il suo potenziale contributo al benessere delle vie urinarie, e caffeina, che può supportare l''effetto drenante grazie alle sue moderate proprietà diuretiche.', '{
    "valori_nutrizionali": {
      "dose": "Per porzione (2 compresse)",
      "tabella": [
        {"componente": "Pilosella e.s.", "quantita": "250 mg"},
        {"componente": "da cui flavonoidi", "quantita": "1,0 mg"},
        {"componente": "Uva ursina e.s.", "quantita": "300 mg"},
        {"componente": "da cui arbutina", "quantita": "30 mg"},
        {"componente": "Betulla e.s.", "quantita": "250 mg"},
        {"componente": "da cui iperoside", "quantita": "2,5 mg"},
        {"componente": "Mirtillo rosso e.s.", "quantita": "100 mg"},
        {"componente": "da cui PAC", "quantita": "36 mg"},
        {"componente": "Te verde e.s.", "quantita": "100 mg"},
        {"componente": "da cui catechine", "quantita": "50 mg"},
        {"componente": "da cui EGCG", "quantita": "15 mg"},
        {"componente": "da cui caffeina", "quantita": "8,8 mg"},
        {"componente": "Ortosiphon e.s.", "quantita": "100 mg"},
        {"componente": "da cui sinensetina", "quantita": "0,1 mg"},
        {"componente": "D-mannosio", "quantita": "100 mg"}
      ]
    },
    "ingredienti": "Agente di carica: cellulosa microcristallina; cloruro di potassio; uva ursina (Arctostaphylos uva ursi L. Spreng., foglie) e.s. tit. 10% arbutina; pilosella (Pilosella officinarum Vaill., parti aeree fiorite) e.s. tit. 0,4% flavonoidi; betulla (Betula pendula Roth, foglie) e.s. tit. 1% iperoside; mirtillo rosso (Vaccinium macrocarpon Aiton, frutto) e.s. tit. 36% proantocianidine (PAC); tè verde (Camellia sinensis (L.) Kuntze, foglie) e.s. tit. 50% catechine, 15% epigallocatechina-3-gallato (EGCG), 8,8% caffeina; orthosiphon (Orthosiphon aristatus (Blume) Miq., foglie) e.s. tit. 0,1 % sinensetina; D-mannosio; agenti antiagglomeranti: magnesio stearato, biossido di silicio. e.s.= estratto secco; tit.= titolato. SENZA GLUTINE."
  }', 'Assumere 2 compresse al giorno con un bicchiere di acqua, preferibilmente prima dei pasti. Non assumere a stomaco vuoto. Per ottenere il massimo beneficio, è consigliabile bere un litro e mezzo di acqua nell''arco della giornata fuori dai pasti.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Contiene caffeina (8,8 mg/dose). Non raccomandato per bambini e donne in gravidanza. Conservare in luogo fresco e asciutto. SENZA GLUTINE.', 'Questo integratore è una soluzione completa per il drenaggio dei liquidi, con una miscela di estratti vegetali noti per le loro proprietà diuretiche e un supporto per la funzionalità urinaria, ideale per contrastare la ritenzione idrica.', false, false, false, '2025-06-24 15:32:23.911704', NULL, 'Naturale', '60 compresse', '2590');
INSERT INTO public.products VALUES (753, 'omega-3-extra-jamieson', 'Omega-3 Extra', 10, 7, 'Formula concentrata di omega-3 EPA e DHA senza retrogusto di pesce', 'Jamieson Omega 3 Extra è un integratore alimentare in softgel, ad alta concentrazione di acidi grassi omega 3 (EPA e DHA), derivati da olio di pesce puro e filtrato. Formulato per supportare la salute di cuore, colesterolo e funzioni cognitive, è l''alleato ideale per il tuo benessere quotidiano.', '{"valori_nutrizionali":{"dose":"Per porzione (2 softgel)","tabella":[{"componente":"Olio di pesce (acciughe, sardine e sgombri)","quantita":"2330 mg","vnr":"-"},{"componente":"di cui EPA","quantita":"840 mg","vnr":"-"},{"componente":"di cui DHA","quantita":"560 mg","vnr":"-"}]},"ingredienti":"Olio di pesce deodorizzato distillato molecolarmente (acciughe, sardine, sgombri); aroma naturale di limone. Softgel: gelatina, glicerolo."}', 'Si consiglia l''assunzione di 1-3 softgel al giorno, preferibilmente durante i pasti, salvo diversa indicazione del proprio medico o nutrizionista.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Non superare il livello di assunzione giornaliera supplementare di 5 g di combinazione di EPA e DHA. Conservare in luogo fresco e asciutto.', 'Un Omega-3 ad alta concentrazione, purificato e con aroma naturale di limone, ideale per supportare la salute cardiovascolare, il colesterolo e le funzioni cognitive, essenziale per il benessere quotidiano.', false, false, false, '2025-06-22 21:51:53.921841', NULL, NULL, NULL, '100 softgel');
INSERT INTO public.products VALUES (953, 'pancake-proteico-why-sport', 'Pancake Proteico', 11, 8, 'Mix proteico istantaneo per pancake ad alto contenuto proteico, perfetto per una colazione energetica e nutriente.', 'Formula arricchita con proteine del siero del latte e vitamine essenziali per supportare la massa muscolare e fornire energia duratura. Preparazione facile e veloce.', '{"titolo":"Pancake Proteico","valori_nutrizionali":{"per_100g":{"energia":"1497 kJ / 357 kcal","grassi":"3,4 g","di_cui_acidi_grassi_saturi":"1,3 g","carboidrati":"50 g","di_cui_zuccheri":"14 g","fibre":"3,0 g","proteine":"30 g","sale":"1,4 g","vitamina_E":"5,0 mg (21% VNR)","calcio":"789 mg (49,4% VNR)","fosforo":"500 mg (35,7% VNR)","ferro":"6,8 g (24% VNR)"}},"ingredienti":"miscela di proteine (caseine micellari (latte), proteine concentrate del siero del latte, proteine concentrate del latte); albume d''uovo; farina di avena; farina di frumento; maltodestrine; olio di girasole; aroma; bicarbonato di sodio; stabilizzante (gomma di xanthan); colorante (beta carotene); cloruro di sodio; edulcorante (sucralosio); vitamina E (acetato di DL-alfa tocoferile)."}', 'aggiungere 50 g (2 misurini rasi) a 50ml di acqua. Mescolare la pastella con la frusta o in uno shaker. Scaldare una padella antiaderente a fuoco medio, versare la pastella e cuocere per circa un minuto per lato. 
', '🟨 **AVVERTENZE**: Non adatto a bambini sotto i 3 anni. Consultare il medico in caso di gravidanza o allattamento.', NULL, false, false, false, '2025-06-27 15:06:09.83434', NULL, 'Originale', '1', 'kg');
INSERT INTO public.products VALUES (877, 'hydrolyzed-104-dh4', 'Hydrolyzed 104 DH4', 11, 1, 'Proteine idrolizzate a rapido assorbimento con 6 gusti disponibili', 'Proteine idrolizzate ad assorbimento ultra rapido, ideali nel post allenamento. Arricchite con enzimi digestivi per migliorare la tollerabilità e dolcificanti naturali per migliorare il gusto.', '{"nome_prodotto":"Hydrolyzed 104 DH4","valori_nutrizionali":{"per_porzione":{"descrizione":"Informazioni nutrizionali per porzione:","porzione":"30 g","valori":[{"componente":"Energia","valore":"474 kJ / 112 kcal"},{"componente":"Grassi","valore":"0,7 g"},{"componente":"di cui acidi grassi saturi","valore":"0,2 g"},{"componente":"Carboidrati","valore":"0,7 g"},{"componente":"di cui zuccheri","valore":"0,3 g"},{"componente":"Fibre","valore":"0,4 g"},{"componente":"Proteine","valore":"25 g"},{"componente":"Sale","valore":"0,12 g"},{"componente":"Lattasi","valore":"20 mg (2000 UL)"},{"componente":"Bromelina","valore":"15 mg"}]},"per_100g":{"descrizione":"Informazioni nutrizionali per 100g:","valori":[{"componente":"Energia","valore":"1580 kJ / 373 kcal"},{"componente":"Grassi","valore":"2,3 g"},{"componente":"di cui acidi grassi saturi","valore":"0,7 g"},{"componente":"Carboidrati","valore":"2,3 g"},{"componente":"di cui zuccheri","valore":"0,9 g"},{"componente":"Fibre","valore":"1,4 g"},{"componente":"Proteine","valore":"85 g"},{"componente":"Sale","valore":"0,4 g"},{"componente":"Lattasi","valore":"67 mg"},{"componente":"Bromelina","valore":"50 mg"}]}},"ingredienti":"Proteine del siero di latte idrolizzate, cacao magro in polvere, addensante: carbossimetilcellulosa di sodio; L-lisina, creatina monoidrato, aromi, L-citrullina, L-treonina, emulsionante: lecitina di soia; edulcoranti: sucralosio, acesulfame K; bromelina, lattasi."}', 'Assumere 30 g in 200 ml d''acqua immediatamente dopo l''allenamento.', 'Non superare la dose consigliata. Gli integratori alimentari non vanno intesi come sostituti di una dieta variata ed equilibrata. Tenere lontano dalla portata dei bambini al di sotto dei 3 anni.', 'Assorbimento ultra-rapido grazie all''idrolisi enzimatica. Perfetto per chi vuole il massimo della velocità di assimilazione post-workout.', false, false, false, '2025-06-25 22:34:53.197613', 14, NULL, NULL, NULL);
INSERT INTO public.products VALUES (985, 'creanized-creatina-monoidrato', 'Creanized Creatina Monoidrato Micronizzata', 20, 2, 'Integratore di creatina monoidrato micronizzata per massimizzare forza e potenza muscolare', 'Integratore alimentare a base di creatina monoidrato micronizzata per migliorare solubilità e assimilazione, ottimizzando le riserve energetiche muscolari. Contribuisce all''aumento delle prestazioni fisiche in esercizi brevi, intensi e ripetuti, sostiene il recupero muscolare e favorisce il mantenimento della massa muscolare.', '{
    "valori_nutrizionali": {
      "dose": "Per 1 dose = 3 g",
      "tabella": [
        {"componente": "Creatina monoidrato°", "quantita": "3 g"}
      ]
    },
    "ingredienti": "Creatina monoidrato°."
  }', 'VITA QUOTIDIANA E SPORT: 3 g di creatina (2 misurini) sciolti in 200 ml di acqua oligominerale, preferibilmente lontano dai pasti per una migliore assimilazione. Può essere assunta quotidianamente e in modo continuativo, rispettando il dosaggio consigliato.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Conservare in luogo fresco e asciutto.', 'Creatina monoidrato micronizzata per una solubilità superiore e un assorbimento ottimale. Il processo di micronizzazione migliora significativamente la dissoluzione in acqua, eliminando i residui e garantendo una distribuzione uniforme del prodotto nell''organismo.', false, false, false, '2025-06-27 16:00:57.282047', NULL, 'Neutro', '250g', '83 dosi');
INSERT INTO public.products VALUES (638, 'milk-protein-90-micellar-casein', 'Milk Protein 90 Micellar Casein', 1, 1, 'Integratore alimentare a base di caseine micellari del latte ad alto titolo proteico con l''aggiunta di vitamine.', 'WATT Milk Protein 90 è un integratore alimentare a base di caseine micellari del latte con un elevato contenuto proteico (90%) e l''aggiunta di vitamine. A differenza delle proteine del siero del latte, le caseine micellari si distinguono per la loro lentezza di assorbimento, garantendo un rilascio costante e prolungato di amminoacidi ai muscoli. Questo le rende ideali per un apporto graduale e duraturo di nutrienti.', '{"nome_prodotto":"Milk 90 Protein Micellar Casein","valori_nutrizionali":{"per_porzione":{"descrizione":"Informazioni nutrizionali per porzione:","porzione":"25 g","valori":[{"componente":"Energia","valore":"379 kj / 89 kcal"},{"componente":"Grassi","valore":"0.2 g"},{"componente":"di cui saturi","valore":"0 g"},{"componente":"Carboidrati","valore":"0.5 g"},{"componente":"di cui zuccheri","valore":"0.5 g"},{"componente":"Fibre","valore":"0 g"},{"componente":"Proteine","valore":"21 g"},{"componente":"Sale","valore":"0.02 g"},{"componente":"Vitamina C","valore":"14 mg (17% VNR)"},{"componente":"Vitamina E","valore":"2.3 mg (19% VNR)"},{"componente":"Tiamina (Vitamina B1)","valore":"0.33 mg (29% VNR)"},{"componente":"Riboflavina (Vitamina B2)","valore":"0.38 mg (26% VNR)"},{"componente":"Vitamina B6","valore":"0.47 mg (33% VNR)"}]},"per_100g":{"descrizione":"Informazioni nutrizionali per 100 g:","valori":[{"componente":"Energia","valore":"1516 kj / 357 kcal"},{"componente":"Grassi","valore":"0.9 g"},{"componente":"di cui saturi","valore":"0.4 g"},{"componente":"Carboidrati","valore":"2.1 g"},{"componente":"di cui zuccheri","valore":"2.1 g"},{"componente":"Fibre","valore":"0 g"},{"componente":"Proteine","valore":"85 g"},{"componente":"Sale","valore":"0.08 g"},{"componente":"Vitamina C","valore":"56 mg"},{"componente":"Vitamina E","valore":"9.4 mg"},{"componente":"Tiamina (Vitamina B1)","valore":"1.3 mg"},{"componente":"Riboflavina (Vitamina B2)","valore":"1.5 mg"},{"componente":"Vitamina B6","valore":"1.9 mg"}]}},"ingredienti":"Caseine del latte micellari, cacao magro in polvere, aromi, L-carnitina, stabilizzante: carbossimetilcellulosa sodica; cloruro di sodio, miscela vitaminica (acido L-ascorbico, DL-alfa tocoferolo acetato, piridossina HCl, riboflavina, tiamina HCl), edulcoranti: sucralosio, acesulfame K."}', 'Assumere 25 g di prodotto (circa 1 misurino) in 200-250 ml di acqua o latte magro. Ideale per un apporto proteico a rilascio lento, da assumere prima di dormire o tra i pasti principali.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Conservare in luogo fresco e asciutto.', 'Perfetta per chi cerca un rilascio prolungato di aminoacidi, supportando il recupero muscolare durante la notte o fornendo un senso di sazietà duraturo.', false, true, false, '2025-06-12 21:14:48.881383', NULL, NULL, NULL, NULL);
INSERT INTO public.products VALUES (1515, 'total-energy', 'Total Energy', 6, 3, 'TOTAL ENERGY è un integratore in polvere a base di fruttosio e maltodestrine, minerali e vitamine.', 'TOTAL ENERGY è un integratore energetico per sportivi in polvere a base di Fruttosio e Maltodestrine (zuccheri semplici a media catena), che permettono di ottenere energia immediata a lungo termine; è arricchito con L-Carnitina in grado di veicolare gli acidi grassi favorendo la produzione di energia per le cellule, preservando la massa magra e incrementando le prestazioni durante l''allenamento, vitamine (C, E, B6) e minerali (potassio, magnesio, cromo, fosforo e calcio), essenziali per il benessere complessivo del corpo.', '{
    "titolo": "Integratore Energetico e di Sali Minerali",
    "valori_nutrizionali": {
      "per_100g": {
        "valore_energetico": "1554 kj / 365 kcal",
        "grassi": "0 g",
        "di_cui_acidi_grassi_saturi": "0 g",
        "carboidrati": "85 g",
        "di_cui_zuccheri": "46 g",
        "proteine": "0 g",
        "sale": "0 g",
        "calcio": "600 mg",
        "fosforo": "600 mg",
        "potassio": "900 mg",
        "magnesio": "225 mg",
        "vitamina_c": "40 mg",
        "vitamina_e": "6,75 mg",
        "vitamina_b6": "1,37 mg",
        "cromo": "60 mcg",
        "l_carnitina_l_tartrato": "250 mg"
      },
      "per_dose_40g": {
        "valore_energetico": "622 kj / 146 kcal",
        "grassi": "0 g",
        "di_cui_acidi_grassi_saturi": "0 g",
        "carboidrati": "34 g",
        "di_cui_zuccheri": "18,4 g",
        "proteine": "0 g",
        "sale": "0 g",
        "calcio": "240 mg (30% VNR)",
        "fosforo": "240 mg (34% VNR)",
        "potassio": "360 mg (18% VNR)",
        "magnesio": "90 mg (24% VNR)",
        "vitamina_c": "16 mg (20% VNR)",
        "vitamina_e": "2,7 mg (22,5% VNR)",
        "vitamina_b6": "0,55 mg (39% VNR)",
        "cromo": "24 mcg (60% VNR)",
        "l_carnitina_l_tartrato": "100 mg"
      }
    },
    "ingredienti": "Maltodestrine, Fruttosio, Acidificante: acido citrico (6.26%), Calcio fosfato, Potassio citrato, Aromi, Magnesio ossido, L-Carnitina-Tartrato, Coloranti (0.3%): succo di barbabietola disidratato, betacarotene; Acido l-ascorbico (Vitamina C), DL-alfa tocoferilacetato (Vitamina E), Piridossina cloridrato (Vitamina B6), Cromo picolinato.",
    "nota": "VNR = valori nutritivi di riferimento"
  }', 'assumere 40 g di prodotto (2 misurini) in 250 ml d''acqua. All''interno della confezione è disponibile un misurino dosatore.', NULL, NULL, false, false, false, '2025-09-02 14:50:36.024903', 128, 'Arancia', '300g', NULL);
INSERT INTO public.products VALUES (1247, 'eaa-tabs', 'EAA Tabs', 23, 2, 'EAA TABS è un integratore alimentare di aminoacidi essenziali.', 'EAA TABS è un integratore alimentare di aminoacidi essenziali. Gli aminoacidi essenziali sono quelli che non possono essere sintetizzati dall''organismo e contribuiscono al soddisfacimento del fabbisogno proteico/azotato e sono importanti per il mantenimento e la costruzione di tessuto muscolare. Gli aminoacidi essenziali includono anche quelli ramificati (L-Leucina, L-Isoleucina, L-Valina) che sono presenti nella proporzione 2:1:1 e sono un fondamentale supporto muscolare per gli sportivi. La formula comprende la vitamina B6 che contribuisce a ridurre stanchezza, affaticamento ed al sostegno del normale metabolismo delle proteine e del glicogeno. EAA TABS è particolarmente indicato durante l''attività sportiva in palestra (bodybuilding e pesi) e come post workout per tutti gli sports. Può essere assunto anche durante la giornata. Non contiene ingredienti di origine animale ed è adatto anche ai vegani.

Modalità d''uso: Assumere una porzione da 5 compresse al giorno durante gli allenamenti o competizioni o immediatamente dopo. Nelle giornate in cui non si pratica attività sportiva, il prodotto può essere assunto in qualsiasi momento della giornata.

Ingredienti: L-Leucina; Stabilizzante: cellulosa microcristallina; L-Lisina; L-Fenilalanina; L-Isoleucina; L-Valina; L-Metionina; L-Treonina; L-Istidina; L-Triptofano; Stabilizzante: idrossipropilmetilcellulosa; Agenti antiagglomeranti: biossido di silicio, sali di magnesio degli acidi grassi (origine vegetale); Vitamina B6 (piridossina cloridrato).', '{"ingredienti": "L-Leucina; Stabilizzante: cellulosa microcristallina; L-Lisina; L-Fenilalanina; L-Isoleucina; L-Valina; L-Metionina; L-Treonina; L-Istidina; L-Triptofano; Stabilizzante: idrossipropilmetilcellulosa; Agenti antiagglomeranti: biossido di silicio, sali di magnesio degli acidi grassi (origine vegetale); Vitamina B6 (piridossina cloridrato).", "modalita_uso": "Assumere una porzione da 5 compresse al giorno durante gli allenamenti o competizioni o immediatamente dopo. Nelle giornate in cui non si pratica attività sportiva, il prodotto può essere assunto in qualsiasi momento della giornata.", "valori_nutrizionali": "Valori Nutrizionali per porzione\n\n1 PORZIONE = 5 COMPRESSE\n\nVitamina B6 (60% VNR)\t0,84 mg\nL-Isoleucina\t625 mg\nL-Leucina\t1250 mg\nL-Valina\t625 mg\nL-Lisina\t875 mg\nL-Metionina\t440 mg\nL-Fenilalanina\t725 mg\nL-Treonina\t440 mg\nL-Istidina\t278 mg\nL-Triptofano\t120 mg\n\nVNR: valori nutritivi di riferimento"}', 'Assumere una porzione da 5 compresse al giorno durante gli allenamenti o competizioni o immediatamente dopo. Nelle giornate in cui non si pratica attività sportiva, il prodotto può essere assunto in qualsiasi momento della giornata.', NULL, NULL, false, false, false, '2025-08-04 08:59:14.038821', NULL, 'Unico', '200 compresse', '200 compresse');
INSERT INTO public.products VALUES (1150, 'prime-oat', 'Prime Oat', 23, 8, 'PRIME OAT - Farina di fiocchi di avena aromatizzata con edulcoranti, dall''ottimo gusto, senza zuccheri aggiunti (contiene naturalmente zuccheri).', 'PRIME OAT - Farina di fiocchi di avena aromatizzata con edulcoranti, dall''ottimo gusto, senza zuccheri aggiunti (contiene naturalmente zuccheri). PRIME OAT è ad alto contenuto di fibre e senza olio di palma, non contiene ingredienti di origine animale ed è adatto ai vegani. Una porzione di PRIME OAT fornisce 2 g di beta-glucani, che contribuiscono al mantenimento di livelli normali di colesterolo nel sangue. L''effetto benefico si ottiene con l''assunzione giornaliera di 3 g di beta-glucani da avena, crusca d''avena, orzo o crusca d''orzo o da miscele di tali beta-glucani.

Modalità d''uso: Si consiglia di mescolare una porzione da 50 g (5 cucchiai) in 200 ml d''acqua.

Ingredienti: farina di fiocchi di AVENA (88%), cacao in polvere, aromi, sale, edulcorante: sucralosio.', '["Valori Nutrizionali per porzione (50g):", "1 PORZIONE = 5 CUCCHIAI (50g)", "Energia: 771 kJ/183 kcal", "Grassi: 3,8 g", "di cui acidi grassi saturi: 1 g", "Carboidrati: 28 g", "di cui zuccheri: 0,5 g", "Fibre: 5,5 g", "Proteine: 6,5 g", "Sale: 0,2 g", "Beta-glucani da avena: 2 g", "", "Valori Nutrizionali per 100g:", "Energia: 1522 kJ/362 kcal", "Grassi: 7,5 g", "di cui acidi grassi saturi: 1,9 g", "Carboidrati: 55 g", "di cui zuccheri: 1 g", "Fibre: 11 g", "Proteine: 13 g", "Sale: 0,4 g"]', 'Si consiglia di mescolare una porzione da 50 g (5 cucchiai) in 200 ml d''acqua.', 'Ingredienti: farina di fiocchi di AVENA (88%), cacao in polvere, aromi, sale, edulcorante: sucralosio.', NULL, false, false, false, '2025-08-04 07:28:49.103028', 18, 'Cioccolato', '1kg', '1000g');
INSERT INTO public.products VALUES (1165, 'taurina-1000-mg', 'Taurina 1000mg', 23, 3, 'TAURINA 1000 è un integratore alimentare di taurina di elevata purezza, in compresse da 1000 mg.', 'TAURINA 1000 è un integratore alimentare di taurina di elevata purezza, in compresse da 1000 mg. La taurina viene attualmente considerata un amminoacido condizionatamente essenziale dato che in particolari circostanze può non essere sintetizzata a velocità sufficiente per far fronte alle richieste metaboliche dell''organismo, come ad esempio in caso di stress psicofisici elevati. La taurina ha proprietà antinfiammatorie naturali, aiuta a sostenere il recupero muscolare, la salute del cuore, degli occhi, del fegato e la funzione cerebrale, può influenzare positivamente l''umore. In campo estetico viene utilizzata per ridare forza e vitalità ai capelli. La taurina contrasta il processo di invecchiamento grazie alla sua azione anti-radicali liberi. Questo prezioso aminoacido è inoltre importante per la sintesi di ossido nitrico, un potente agente vasodilatatore. L''interazione con altre molecole come caffeina e sinefrina consente di aumentare lo stato di vigilanza e di migliorare le funzioni cognitive. TAURINA 1000 Non contiene ingredienti di origine animale ed è adatto anche ai vegani.

Modalità d''uso: Assumere una compressa al giorno con acqua o altro liquido a scelta, in qualunque momento della giornata.

Ingredienti: Taurina; Stabilizzante: cellulosa microcristallina; Stabilizzante: idrossipropilmetilcellulosa; Agenti antiagglomeranti: sali di magnesio degli acidi grassi (origine vegetale), biossido di silicio.', '["Valori Nutrizionali per porzione (1 compressa):", "1 PORZIONE = 1 COMPRESSA", "Taurina: 1000 mg", "", "Ingredienti:", "Taurina, agente di carica: cellulosa microcristallina, agenti antiagglomeranti: magnesio stearato vegetale e biossido di silicio."]', 'Assumere una compressa al giorno con acqua, in qualunque momento della giornata.', 'Ingredienti: Taurina; Stabilizzante: cellulosa microcristallina; Agenti antiagglomeranti: sali di magnesio degli acidi grassi, biossido di silicio.', NULL, false, false, false, '2025-08-04 07:33:04.269992', 23, 'Unico', '150 compresse', '150 compresse');
INSERT INTO public.products VALUES (1170, 'tribulus-1000-plus', 'Tribulus 1000 Plus', 23, 7, 'TRIBULUS 1000 PLUS è un integratore di Tribulus Terrestris di elevatissima qualità, estratto dal frutto.', 'Integratore alimentare a base di estratto di Tribulus Terrestris standardizzato al 40% in saponine. Il Tribulus Terrestris è una pianta tradizionalmente utilizzata per supportare il benessere maschile, la vitalità e le prestazioni fisiche. L''estratto titolato garantisce un apporto costante di principi attivi. Formula potenziata con zinco per il normale metabolismo del testosterone e per la normale funzione riproduttiva.', '{"titolo":"Tribulus 1000 Plus","valori_nutrizionali":{"per_porzione":{"porzione":"1 compressa","tribulus_terrestris_90_in_saponine":"1000 mg"}},"ingredienti":"Tribulus Terrestris L. (frutto) estratto secco titolato al 90% in saponine; Stabilizzante: cellulosa microcristallina; Stabilizzante: idrossipropilmetilcellulosa; Agenti antiagglomeranti: sali di magnesio degli acidi grassi (origine vegetale), biossido di silicio."}', 'Assumere 2 compresse al giorno preferibilmente lontano dai pasti con abbondante acqua.', 'Non superare la dose giornaliera consigliata. Non indicato per donne in gravidanza e allattamento. Tenere fuori dalla portata dei bambini di età inferiore ai 3 anni.', NULL, false, false, false, '2025-08-04 07:34:17.281667', 26, 'Unico', '120 compresse', '120 compresse');
INSERT INTO public.products VALUES (1517, 'glutamine-pure-1000', 'Glutamine Pure 1000', 6, 2, 'GLUTAMINE PURE 1000 è un integratore alimentare di L-Glutammina (Kyowa®) in compresse.', 'GLUTAMINE PURE 1000 è un integratore alimentare di La L-Glutammina (Kyowa®) in compresse. La L-Glutammina è l''aminoacido più presente nel corpo umano, fondamentale quando il corpo è sottoposto a stress psico-fisici. Ideale nei periodi di allenamento intenso per recuperare, potenziare il sistema immunitario e ridurre i rischi di sovrallenamento.

La L-Glutammina è l''aminoacido più presente nel corpo umano naturalmente prodotto dal nostro organismo, fondamentale quando il corpo è sottoposto a stress psico-fisici. Nonostante appartenga alla categoria degli amminoacidi non essenziali, la Glutammina ricopre un ruolo fondamentale: permette di migliorare il recupero dopo qualsiasi attività fisica intensa. In contesti di stress psico-fisici l''organismo non sempre riesce a sintetizzarne a sufficienza per far fronte ai reali bisogni.

Circa il 60% di Glutammina presente nell''organismo è contenuta nel tessuto muscolare e la sua concentrazione diminuisce dopo un''attività fisica intensa e prolungata. Questo prezioso amminoacido è conosciuto soprattutto per il suo effetto anticatabolico e stimolante sulla sintesi proteica. Inoltre, la Glutammina riveste un ruolo importante nel mantenimento della normale funzione immunitaria. Rappresenta infatti il substrato energetico fondamentale per le cellule deputate alla difesa dell''organismo.', '{
    "titolo": "L-Glutammina Integratore",
    "valori_nutrizionali": {
      "per_porzione": {
        "porzione": "3 compresse",
        "l_glutammina": "3 g"
      }
    },
    "ingredienti": "L-Glutammina (Kyowa®), agente di carica: cellulosa microcristallina; amido di mais, stabilizzanti: sali di magnesio degli acidi grassi, biossido di silicio."
  }', 'Assumere 3 compresse al giorno.', NULL, NULL, false, false, false, '2025-09-02 14:51:37.629263', 130, 'Unico', '150 compresse', NULL);
INSERT INTO public.products VALUES (1283, 'adrenaline-agrumi-pre-workout', 'Adrenaline Agrumi Pre Workout', 11, 3, 'Pre workout agli agrumi con formula potenziata per energia e concentrazione', 'Adrenaline è un integratore alimentare preworkout che combina aminoacidi essenziali, creatina monoidrato, taurina e vitamina B6. La creatina supporta l''incremento di forza e resistenza muscolare. La beta-alanina contribuisce a mantenere costante l''intensità dello sforzo. Taurina, leucina e glutammina lavorano sinergicamente per recupero, resistenza e muscolatura. La vitamina B6 è cruciale nel metabolismo energetico, riducendo stanchezza e affaticamento.', '{"titolo":"Adrenaline Agrumi Pre Workout","valori_nutrizionali":{"per_porzione":{"creatina_monoidrato":"3000 mg","di_cui_creatina":"2637 mg","beta_alanina":"2000 mg","l_arginina_akg":"1000 mg","l_leucina":"1000 mg","taurina":"1000 mg","l_glutammina":"800 mg","vitamina_b6":"1,4 mg (100% VNR)"}},"ingredienti":"creatina monoidrato; beta-alanina; aroma; L-arginina alfa-chetoglutarato (AKG); L-leucina; taurina; L-glutammina; acidificante: acido citrico; agente antiagglomerante: biossido di silicio; addensante: gomma di xanthan; edulcorante: sucralosio; colorante: riboflavina; vitamina B6 (cloridrato di piridossina). Confezionato in atmosfera protettiva. SENZA GLUTINE.","nota":"*VNR: Valori Nutritivi di Riferimento"}', 'Assumere 1 misurino (16g) sciolto in 250ml di acqua fredda 20-30 minuti prima dell''allenamento.', 'Non superare la dose consigliata. Non assumere in caso di sensibilità alla caffeina. Tenere fuori dalla portata dei bambini.', NULL, false, false, false, '2025-08-06 10:15:22.035291', NULL, NULL, '400g', NULL);
INSERT INTO public.products VALUES (1019, 'fluid-motion', 'Fluid Motion', 22, 7, 'Apporta nutrienti per la regolare funzione delle cartilagini e per il mantenimento di tessuti connettivi normali.', 'FLUID MOTION® è un integratore alimentare di Glucosamina, Condrotinsolfato, Bromelina, Vitamina C, Rame e Zinco, con Acido ialuronico ed estratto estratto concentrato di curcuma di elevata qualità.
La Vitamina C contribuisce alla protezione delle cellule dallo stress ossidativo (azione antiossidante)4 e contribuisce alla normale formazione del collagene3 per la regolare funzione delle cartilagini1 e delle ossa. La Bromelina - enzima proteolitico- è associata a Glucosamina, Acido Ialuronico e Condroitinsolfato, per offrire una formulazione particolarmente completa.
FLUID MOTION® apporta anche Rame e Zinco, costituenti di coenzimi che svolgono un ruolo attivo nel fisiologico metabolismo delle cartilagini1.
Il Rame in particolare contribuisce al mantenimento di tessuti connettivi2 normali.
ll prodotto FLUID MOTION® non contiene glutine (Gluten free), è pertanto indicato anche per soggetti celiaci o con intolleranza al glutine.', '{"titolo":"Fluid Motion","valori_nutrizionali":{"per_dose":{"porzione":"2 capsule","glucosamina_solfato_2kcl":"845 mg","di_cui_glucosamina":"500 mg","condroitinsolfato":"160 mg","zinco":"7,5 mg (75% VNR**)","vitamina_c":"50 mg (63% VNR**)","acido_ialuronico":"40 mg","bromelina_2500_gdu":"30 mg","estratto_di_rizoma_di_curcuma":"25 mg","di_cui_curcuminoidi_95_percento":"23,75 mg","rame":"0,6 mg (60% VNR**)"}},"ingredienti":"Glucosamina solfato 2KCl (da crostacei) Inulina, Idrossipropilmetilcellulosa, Condroitinsolfato, Zinco Gluconato (Zinco), acido l - ascorbico (Vitamina C), Acido Ialuronico (Ialuronato di Sodio), Bromelina 2500 GDU/G, Curcuma, Diglicinato di Rame (Rame), Sali di Magnesio degli Acidi Grassi, Biossido di Silicio."}', 'Si consiglia l''assunzione di 2 capsule al giorno.', 'Glucosamina solfato 2KCl (da crostacei) Inulina, Agente di Carica: Idrossipropilmetilcellulosa; Condroitinsolfato, Zinco Gluconato (Zinco), acido l - ascorbico (Vitamina C), Acido Ialuronico (Ialuronato di Sodio), Bromelina 2500 GDU/G, Curcuma (Curcuma Longa L., Rizoma) E.S. TIT. 95% in curcuminoidi; Diglicinato di Rame (Rame), Agenti Antiagglomeranti: Sali di Magnesio degli Acidi Grassi, Biossido di Silicio.', NULL, false, false, false, '2025-07-25 23:07:00.040923', NULL, 'Unico', '60 capsule', NULL);
INSERT INTO public.products VALUES (1166, 'thermogenic-force', 'Thermogenic Force', 23, 7, 'THERMOGENIC FORCE è un integratore alimentare coadiuvante delle diete ipocaloriche controllate per la riduzione del peso corporeo.', 'Integratore alimentare termogenico avanzato formulato con estratti vegetali selezionati per supportare il metabolismo energetico. Contiene caffeina da tè verde, estratto di peperoncino (capsaicina), cromo e L-carnitina per favorire la combustione dei grassi e aumentare la termogenesi. La formula include anche estratti di Garcinia Cambogia e tè verde per un''azione sinergica sul controllo del peso corporeo.', '{
  "nutritional_table": {
    "title": "Valori Nutrizionali",
    "serving_size": "4 compresse",
    "servings_per_container": "30",
    "values": [
      {
        "nutrient": "Caffeina",
        "amount": "200",
        "unit": "mg",
        "daily_value": null
      },
      {
        "nutrient": "Estratto di Tè Verde",
        "amount": "400",
        "unit": "mg",
        "daily_value": null
      },
      {
        "nutrient": "L-Carnitina",
        "amount": "500",
        "unit": "mg",
        "daily_value": null
      },
      {
        "nutrient": "Garcinia Cambogia",
        "amount": "300",
        "unit": "mg",
        "daily_value": null
      },
      {
        "nutrient": "Cromo",
        "amount": "40",
        "unit": "μg",
        "daily_value": "100%"
      }
    ]
  },
  "ingredienti": "Caffeina anidra, Estratto di Tè Verde, L-Carnitina, Estratto di Garcinia Cambogia, Cromo picolinato."
}', 'Assumere 2 compresse al giorno preferibilmente 30 minuti prima dei pasti principali con abbondante acqua.', 'Non superare la dose giornaliera consigliata. Non assumere in gravidanza, allattamento e sotto i 18 anni. Contiene caffeina, evitare nelle 6 ore prima del riposo notturno.', NULL, false, false, false, '2025-08-04 07:33:04.269992', 24, 'Unico', '120 compresse', '120 compresse');
INSERT INTO public.products VALUES (748, 'lutein-z', 'Lutein Z', 10, 7, 'Lutein Z con luteina e zeaxantina per la protezione della vista e la salute degli occhi', 'Integratore alimentare di Tagetes erecta, fonte di luteina e zeaxantina. Luteina e zeaxantina sono due carotenoidi con spiccata azione antiossidante. Questi due carotenoidi giocano un ruolo importante nel mantenimento della normale funzione visiva: sono i due componenti più importanti dei pigmenti della macula, la zona centrale della retina. Lutein Z di Jamieson è un complesso di luteina e zeaxantina derivato dai fiori di Tagete, utile per il mantenimento della normale funzione visiva.', '{
    "valori_nutrizionali": {
      "dose": "Per 1 capsula",
      "tabella": [
        {"componente": "Luteina fiore", "quantita": "10 mg"},
        {"componente": "Zeaxantina fiore", "quantita": "500 mcg"},
        {"componente": "Ginkgo foglie e.s. 50:1", "quantita": "40 mg"},
        {"componente": "Mirtillo e.s. 4:1", "quantita": "25 mg"},
        {"componente": "Semi d''uva semi e.s. 30:1", "quantita": "25 mg"},
        {"componente": "Tè verde foglie", "quantita": "3 mg"},
        {"componente": "- di cui polifenoli", "quantita": "1,5 mg"},
        {"componente": "- di cui catechine totali", "quantita": "900 mcg"},
        {"componente": "- di cui EGCG", "quantita": "450 mcg"},
        {"componente": "- di cui caffeina", "quantita": "240 mcg"}
      ]
    },
    "ingredienti": "Estratto di tagete (Tagetes erecta L., fiori) standardizzato in luteina e zeaxantina; agenti di carica: cellulosa microcristallina, fosfato dicalcico; ginkgo e.s 50:1 (Ginkgo biloba L., foglie), mirtillo e.s 4:1 (Vaccinium myrtillus L., frutti), semi d''uva e.s 30:1 (Vitis vinifera L., semi) tit. 80% in proantocianidine; antiagglomerante: magnesio stearato vegetale; tè verde e.s 30:1 (Camellia sinensis L., foglie), tit. 50% in polifenoli, 30% in catechine totali, (15% in EGCG) 8% in caffeina."
  }', 'Assumere 1 capsula al giorno lontano dai pasti.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Non usare in gravidanza e durante l''allattamento. Consultare il medico in caso di assunzione di farmaci anticoagulanti o antiaggreganti piastrinici. Contiene caffeina (240 mcg/dose). Conservare in luogo fresco e asciutto.', 'Questo integratore è formulato per supportare la salute visiva, grazie alla combinazione di luteina e zeaxantina con potenti antiossidanti vegetali che agiscono sinergicamente per proteggere la retina e migliorare la funzione visiva.', false, false, false, '2025-06-22 21:51:53.050578', NULL, NULL, NULL, '30 capsule');
INSERT INTO public.products VALUES (1032, 'comfort-plus', 'Comfort Plus', 22, 6, 'Crema professionale con intense proprietà lenitive e antiattrito. Prodotto specifico per il soprasella del ciclista e per le zone di intensa frizione nel podista.', 'Comfort Plus è una crema antifrizione con proprietà lenitive, emollienti e antiattrito. È indicata per lo sportivo soggetto a facili arrossamenti o lesioni della cute durante l''attività sportiva. Indicata per le parti a contatto con la sella nel ciclista, per le zone di intensa frizione nel podista ed in generale per le aree soggette a trauma epidermico nell''atleta. La particolare composizione della crema protegge la pelle dalle abrasioni generate dalla ripetizione del gesto sportivo e riduce sensibilmente gli arrossamenti da sfregamento. L''alto tenore di ossido di zinco esercita un''efficace azione lenitiva e di protezione epidermica.', NULL, 'Applicare con un leggero massaggio direttamente sulla pelle, prima e dopo l''impegno sportivo.', 'Aqua, Petrolatum, Zinc oxide, Glycerin, Bisabolol, Helianthus annuus seed oil, Cocos nucifera oil, Propylene glycol, Stearic acid, Cetearyl alcohol, Cera alba, Glyceryl stearate, PEG-40 hydrogenated castor oil, Polysorbate-20, Panthenol, Betaine, Troxerutin, Ceteareth-25, acrylic acid copolymer, Inulin, Allantoin, Arginine, Niacinamide, Tocopherol, Phenoxyethanol, Imidazolidinyl urea, Parfum, Sodium hydroxide, Disodium EDTA, Methylparaben, Pentaerythrityl tetra-di-t-butyl hydroxyhydrocinnamate, Butylparaben, Ethylparaben, Propylparaben.', NULL, false, false, false, '2025-07-26 07:13:54.312968', NULL, 'Unico', '250 ml', NULL);
INSERT INTO public.products VALUES (1232, 'omega-3-6-9', 'Omega 3-6-9', 25, 7, 'Integratore alimentare che fornisce gli acidi grassi essenziali Omega 3, 6 e 9 in un rapporto bilanciato. Contribuisce al normale metabolismo lipidico e al mantenimento di livelli normali di colesterolo nel sangue. La formulazione EFA (Essential Fatty Acids) assicura un apporto ottimale di acidi grassi polinsaturi necessari per il benessere cardiovascolare.', 'Integratore alimentare a base di acidi grassi essenziali Omega 3, 6 e 9 ottenuti da oli vegetali di alta qualità. Gli acidi grassi omega-3 EPA e DHA contribuiscono alla normale funzione cardiaca, mentre il DHA contribuisce al mantenimento della normale funzione cerebrale e della capacità visiva. Gli omega-6 e omega-9 completano il profilo lipidico supportando il benessere generale dell''organismo. La formulazione bilanciata fornisce il giusto rapporto tra i diversi acidi grassi essenziali.', '{
  "titolo": "Omega 3-6-9",
  "per_porzione": {
    "descrizione": "Valori nutrizionali per porzione",
    "porzione": "4 softgel",
    "valori": [
      {
        "componente": "Olio di Pesce",
        "valore": "1328 mg"
      },
      {
        "componente": "Olio di Enagra",
        "valore": "1328 mg"
      },
      {
        "componente": "Olio di Semi di Lino",
        "valore": "1328 mg"
      },
      {
        "componente": "Vitamina E",
        "valore": "20 mg (167% VNR)"
      }
    ]
  },
  "ingredienti": "Olio di Pesce, Olio di Borragine, Olio di Lino, Involucro capsula (Gelatina, Glicerina, Acqua)."
}', 'Assumere 1-2 softgel al giorno con acqua durante i pasti.', NULL, NULL, false, false, false, '2025-08-04 08:40:16.943354', NULL, 'Unico', '/images/products/omega-3-6-9.jpg', '60 softgel');
INSERT INTO public.products VALUES (1167, 'total-protein-blend', 'Total Protein Blend', 23, 1, 'TOTAL PROTEIN è un integratore di proteine formulato con una combinazione di proteine a diverso tempo di assimilazione.', 'TOTAL PROTEIN è un integratore alimentare di proteine formulato con una combinazione di proteine a diverso tempo di assimilazione. Fornisce proteine di alta qualità e di alto valore biologico provenienti da sei fonti diverse: proteine totali del latte, proteine del siero di latte isolate, caseine micellari, proteine del siero di latte idrolizzate, proteine del siero di latte concentrate, proteine dell''albume d''uovo. Il blend proteico ha una composizione che garantisce un apporto aminoacidico equilibrato, inoltre le proteine contenute in TOTAL PROTEIN hanno tempi di digestione differenziati e rilasciano in modo graduale gli aminoacidi contenuti. Le proteine contribuiscono alla crescita e al mantenimento della massa muscolare. La vitamina B6 contenuta nel prodotto contribuisce al normale metabolismo delle proteine e del glicogeno e alla riduzione della stanchezza e dell''affaticamento. TOTAL PROTEIN ha un gusto cremoso e delizioso ed è molto solubile.

Modalità d''uso: Assumere una porzione da 30 g (3 misurini) al giorno miscelata con 200 ml di acqua o altro liquido a scelta. Il volume di liquido aggiunto influisce sull''intensità del gusto e sulla densità del preparato, non influisce sulla digeribilità o assimilabilità. Si consiglia di assumere il prodotto durante la giornata come spuntino, oppure a colazione, dopo l''attività sportiva o prima di coricarsi.

Ingredienti: Total protein blend (Proteine totali del LATTE, Proteine del siero di LATTE isolate, Caseine micellari da proteine del LATTE; Proteine del siero di LATTE idrolizzate, Proteine del siero di LATTE concentrate, Proteine dell''albume d''UOVO); Aromi; Sale; Edulcorante: sucralosio; Piridossina cloridrato (Vitamina B6).', '["Valori Nutrizionali per porzione:", "1 PORZIONE = 3 MISURINI (30g) ", "Energia  471 KJ/111 kcal", "Grassi  0,5 g", "di cui acidi grassi saturi  0,1 g", "Carboidrati  0,6 g", "di cui zuccheri  0,5 g", "Proteine  26 g", "Sale  0,18 g", "Vitamina B6 (30% VNR)  0,42 mg", "", "Valori Nutrizionali per 100g:", "Energia  1574 KJ/371 kcal", "Grassi  1,6 g", "di cui acidi grassi saturi  0,4 g", "Carboidrati  2,1 g", "di cui zuccheri  1,7 g", "Proteine  87 g", "Sale  0,6 g", "Vitamina B6  1,4 mg", "", "PROFILO AMINOACIDICO TIPICO  % SULLE PROTEINE", "L-Isoleucina  5,98", "L-Leucina  9,41", "L-Valina  6,11", "BCAA totali  21,50", "L-Lisina  7,78", "L-Metionina  2,20", "L-Fenilalanina  3,98", "L-Treonina  5,51", "L-Arginina  2,24", "L-Alanina  3,67", "L-Acido Aspartico  7,92", "L-Cistina  1,78", "L-Acido Glutammico  20,34", "L-Glicina  1,68", "L-Istidina  2,19", "L-Prolina  8,65", "L-Serina  5,09", "L-Tirosina  4,00", "L-Triptofano  1,26", "", "VNR = valori nutritivi di riferimento"]', 'Assumere una porzione da 30 g (3 misurini) al giorno miscelata con 200 ml di acqua.', 'Ingredienti: Total protein blend; Cacao in polvere; Aromi; Sale; Edulcorante: sucralosio; Piridossina cloridrato (Vitamina B6).', NULL, false, false, false, '2025-08-04 07:34:09.554926', 25, 'Cioccolato', '1kg', '1000g');
INSERT INTO public.products VALUES (1390, 'd3-k2-complex-premier', 'D3/K2 Complex', 6, 7, 'D3/K2 COMPLEX è un integratore alimentare in perle di vitamine D3 e vitamina K2. La vitamina D contribuisce al normale assorbimento/utilizzo del calcio e del fosforo e a regolare i livelli di calcio nel sangue e supporta il mantenimento di ossa e denti normali.', 'D3/K2 COMPLEX è un integratore alimentare in perle di vitamine D3 e vitamina K2. La vitamina D contribuisce al normale assorbimento/utilizzo del calcio e del fosforo e a regolare i livelli di calcio nel sangue e supporta il mantenimento di ossa e denti normali. La Vitamina K2 è essenziale per l''attivazione di proteine k-dipendenti che sono coinvolte sia nella coagulazione sanguigna che nel metabolismo osseo e nell''inibizione della calcificazione arteriosa.
D3/K2 COMPLEX è un integratore di vitamine D3 e vitamina K2 ideale per lo sportivo ad alte prestazioni.

La Vitamina D è un pro-ormone in grado di svolgere un importante ruolo a livello dei tessuti ossei. La vitamina D mostra azioni extra-scheletriche che regolano molti processi fisiologici: risposta immunitaria, salute cardiovascolare, obesità, diabete, depressione, declino cognitivo, patologie autoimmuni e alcune neoplasie.', '{"titolo":"Integratore Vitamina D3 e K2","valori_nutrizionali":{"per_dose_2_softgel":{"vitamina_d3":"50 mcg (1000% VNR)","vitamina_k2":"90 mcg (120% VNR)"}},"ingredienti":"Olio di SOIA, gelatina alimentare, glicerolo, acqua, menachinone (Vitamina K2), colecalciferolo (Vitamina D3).","nota":"VNR = Valori nutritivi di riferimento"}', 'Assumere fino a 2 perle al giorno suddivise nell''arco della giornata.', NULL, NULL, false, false, false, '2025-09-01 16:32:44.212737', 66, 'Unico', '90 perle', NULL);
INSERT INTO public.products VALUES (1245, 'daa-acido-d-aspartico', 'DAA Acido D-aspartico', 23, 2, 'DAA è un integratore alimentare in compressa formulato in particolare per integrare la dieta dell''uomo adulto. Fornisce 1000 mg di Acido D-aspartico (DAA) e zinco per il mantenimento di funzionali livelli di testosterone nel sangue e normale fertilità', 'DAA è un integratore alimentare in compressa formulato in particolare per integrare la dieta dell''uomo adulto. Fornisce 1000 mg di Acido D-aspartico (DAA) e zinco per il mantenimento di funzionali livelli di testosterone nel sangue e normale fertilità. La sua formula contiene minerali specifici come il selenio che contribuisce alla normale spermatogenesi, rame invece contribuisce al normale metabolismo energetico. L''acido pantotenico contribuisce alla normale sintesi e al normale metabolismo degli ormoni steroidei, della vitamina D e di alcuni neurotrasmettitori e concorre alla riduzione della stanchezza e dell''affaticamento. La vitamina B6 contribuisce alla regolazione dell''attività ormonale. DAA è indicato sia per gli sportivi che per non sportivi.

Modalità d''uso: Deglutire una porzione = 3 compresse durante la giornata con acqua o altro liquido a scelta.

Ingredienti: Acido D-Aspartico; Stabilizzante: cellulosa microcristallina; Stabilizzante: idrossipropilmetilcellulosa; Agenti antiagglomeranti: biossido di silicio, sali di magnesio degli acidi grassi (origine vegetale); Zinco gluconato; Rame gluconato; Acido pantotenico (calcio D-pantotenato); Vitamina B6 (piridossina cloridrato).', '{"titolo":"DAA D-aspartico","per_porzione":{"descrizione":"Valori nutrizionali per porzione","porzione":"3 compresse","valori":[{"componente":"D-Acido Aspartico","valore":"3.000 mg"},{"componente":"Acido pantotenico","valore":"1,5 mg (25% VNR)"},{"componente":"Vit. B6","valore":"0,42 mg (30% VNR)"},{"componente":"Zinco","valore":"3 mg (30% VNR)"},{"componente":"Rame","valore":"0,3 mg (30% VNR)"}]},"ingredienti":"Acido D-Aspartico; Stabilizzante: cellulosa microcristallina; Stabilizzante: idrossipropilmetilcellulosa; Agenti antiagglomeranti: biossido di silicio, sali di magnesio degli acidi grassi (origine vegetale); Zinco gluconato; Rame gluconato; Acido pantotenico (calcio D-pantotenato); Vitamina B6 (piridossina cloridrato)."}', 'Deglutire una porzione = 3 compresse durante la giornata con acqua o altro liquido a scelta.', NULL, NULL, false, false, false, '2025-08-04 08:59:14.038821', NULL, 'Unico', '90 compresse', '90 compresse');
INSERT INTO public.products VALUES (1266, 'mass-matrix-cioccolato', 'Mass Matrix', 23, 1, 'MASS MATRIX EXTRA è un integratore alimentare sviluppato appositamente per chi pratica Body Building e formulato per favorire l''incremento di massa e peso corporeo.', 'MASS MATRIX EXTRA è un integratore alimentare sviluppato appositamente per chi pratica Body Building e formulato per favorire l''incremento di massa e peso corporeo. Fornisce proteine con tempi di rilascio differenziati: caseine micellari, proteine del siero di latte, proteine del siero di latte isolate, proteine del siero di latte idrolizzate. Le proteine favoriscono la crescita della massa muscolare. MASS MATRIX EXTRA è formulato con maltodestrine, amido di mais ceroso e destrine cicliche altamente ramificate, carboidrati complessi ad assorbimento graduale e a rilascio differenziato di energia ai muscoli. La glutammina favorisce il recupero e la rigenerazione muscolare. La creatina incrementa le prestazioni fisiche in caso di attività ripetitive, di elevata intensità e di breve durata. L''effetto benefico si ottiene con l''assunzione giornaliera di 3 g di creatina. La vitamina B6 contribuisce al normale metabolismo energetico, al normale metabolismo delle proteine e del glicogeno e alla riduzione di stanchezza ed affaticamento. MASS MATRIX EXTRA è istantaneamente solubile, ha un ottimo gusto ed è adatto anche ai vegetariani.

Modalità d''uso: Assumere una porzione da 100 g (5 misurini) al giorno miscelata con 300 ml di acqua. Il volume di liquido aggiunto influisce sull''intensità del gusto e sulla densità del preparato, non influisce sulla digeribilità o assimilabilità. Si consiglia di assumere il prodotto almeno un''ora prima degli allenamenti in palestra o immediatamente dopo l''attività fisica, oppure come spuntino durante la giornata, lontano dai pasti principali.

Ingredienti: Carbo-Matrix (Maltodestrine, Amido di mais ceroso, Destrine cicliche altamente ramificate); Mass protein mix (Caseine micellari da proteine del LATTE; Proteine del siero di LATTE; Proteine del siero di LATTE isolate [emulsionante: lecitina (contiene SOIA)]; Proteine del siero di LATTE idrolizzate); Cacao in polvere; Creatina monoidrato; L-glutammina; Aromi; Sale; Edulcorante: sucralosio; Piridossina cloridrato (Vit. B6).', '["Valori Nutrizionali per porzione :", "1 PORZIONE = 5 MISURINI (100g) ", "Energia  1607 kJ/379 kcal", "Grassi  3 g", "di cui acidi grassi saturi  1 g", "Carboidrati  58 g", "di cui zuccheri  6 g", "Proteine  30 g", "Sale  0,41 g", "Vitamina B6 (30% VNR)  0,42 mg", "Creatina  3 g", "L-Glutammina  2 g", "", "Valori Nutrizionali per 100g:", "Energia  1607 kJ/379 kcal", "Grassi  3 g", "di cui acidi grassi saturi  1 g", "Carboidrati  58 g", "di cui zuccheri  6 g", "Proteine  30 g", "Sale  0,41 g", "Vitamina B6  1,4 mg", "Creatina  3 g", "L-Glutammina  2 g", "", "VNR = valori nutritivi di riferimento"]', 'Assumere una porzione da 100 g (5 misurini) al giorno miscelata con 300 ml di acqua.', NULL, NULL, false, false, false, '2025-08-04 09:02:37.034492', 51, 'Cioccolato', '1,3kg', '1,3kg');
INSERT INTO public.products VALUES (1531, 'glutamine-pure-100', 'Glutamine Pure 100%', 6, 2, 'GLUTAMINE PURE 100% è un integratore alimentare di L-Glutammina in polvere.', 'GLUTAMINE PURE 100% è un integratore alimentare in polvere di L-Glutammina (KYOWA®). La L-Glutammina ricopre un ruolo fondamentale: permette di migliorare il recupero dopo qualsiasi attività fisica intensa.

La L-Glutammina è l''aminoacido più presente nel corpo umano naturalmente prodotto dal nostro organismo, fondamentale quando il corpo è sottoposto a stress psico-fisici. Nonostante appartenga alla categoria degli amminoacidi non essenziali, la Glutammina ricopre un ruolo fondamentale: permette di migliorare il recupero dopo qualsiasi attività fisica intensa. In contesti di stress psico-fisici l''organismo non sempre riesce a sintetizzarne a sufficienza per far fronte ai reali bisogni.

Circa il 60% di Glutammina presente nell''organismo è contenuta nel tessuto muscolare e la sua concentrazione diminuisce dopo un''attività fisica intensa e prolungata. Questo prezioso amminoacido è conosciuto soprattutto per il suo effetto anticatabolico e stimolante sulla sintesi proteica. Inoltre, la Glutammina riveste un ruolo importante nel mantenimento della normale funzione immunitaria. Rappresenta infatti il substrato energetico fondamentale per le cellule deputate alla difesa dell''organismo.', '{
    "titolo": "L-Glutammina Kyowa",
    "valori_nutrizionali": {
      "per_porzione": {
        "porzione": "3 g",
        "l_glutammina": "3 g"
      }
    },
    "ingredienti": "L-Glutammina (Kyowa®)."
  }', 'Assumere 3g di prodotto (2 misurini) al giorno. All''interno della confezione è presente un misurino dosatore.', NULL, NULL, false, false, false, '2025-09-02 14:54:09.744711', 137, 'Unico', '200g', NULL);
INSERT INTO public.products VALUES (900, 'perfect-mass', 'Perfect Mass', 11, 1, 'Gainer proteico completo per l''aumento della massa muscolare con carboidrati complessi', 'MASS GAINER è un integratore alimentare ipercalorico formulato per supportare l''aumento di peso e massa muscolare negli sportivi. Contiene proteine di alta qualità, carboidrati complessi e semplici, vitamine e minerali. La formula è progettata per fornire un elevato apporto calorico in modo bilanciato, supportando la crescita muscolare e il recupero post-allenamento. Particolarmente indicato per atleti con difficoltà nell''aumento di peso o con elevato dispendio energetico.

Modalità d''uso: Mescolare 3 misurini (100 g) con 300-400 ml di latte o acqua. Assumere 1-2 porzioni al giorno tra i pasti o dopo l''allenamento.

Ingredienti: Maltodestrine; Proteine del latte; Saccarosio; Cacao in polvere; Aromi; Addensante: gomma xantano; Sale; Edulcorante: sucralosio.', '{"nome_prodotto":"Perfect Mass","valori_nutrizionali":{"per_porzione":{"descrizione":"Informazioni nutrizionali per porzione:","valori":[{"componente":"Energia","valore":"1249 kJ / 294 kcal"},{"componente":"Grassi","valore":"0,2 g"},{"componente":"di cui acidi grassi saturi","valore":"0,1 g"},{"componente":"Carboidrati","valore":"51 g"},{"componente":"di cui zuccheri","valore":"24 g"},{"componente":"Fibre","valore":"0,07 g"},{"componente":"Proteine","valore":"22 g"},{"componente":"Sale","valore":"0,07 g"},{"componente":"Potassio","valore":"318 mg (15,9% VNR)"},{"componente":"Fosforo","valore":"219 mg (31,3% VNR)"},{"componente":"Calcio","valore":"200 mg (25% VNR)"},{"componente":"Vitamina C","valore":"28 mg (35% VNR)"},{"componente":"Vitamina E","valore":"5,0 mg (42% VNR)"},{"componente":"Niacina","valore":"9,0 mg (56% VNR)"},{"componente":"Acido pantotenico","valore":"3,0 mg (50% VNR)"},{"componente":"Vitamina B6","valore":"0,9 mg (64% VNR)"},{"componente":"Riboflavina","valore":"0,9 mg (64% VNR)"},{"componente":"Tiamina","valore":"0,6 mg (54% VNR)"},{"componente":"Biotina","valore":"352 mcg (704% VNR)"},{"componente":"Acido folico","valore":"96 mcg (48% VNR)"},{"componente":"Vitamina B12","valore":"4,8 mcg (192% VNR)"},{"componente":"Bromelina","valore":"40 mg"},{"componente":"Lattasi","valore":"560 mcg"}]},"per_100g":{"descrizione":"Informazioni nutrizionali per 100g:","valori":[{"componente":"Energia","valore":"1576 kJ / 371 kcal"},{"componente":"Grassi","valore":"0,3 g"},{"componente":"di cui acidi grassi saturi","valore":"0,2 g"},{"componente":"Carboidrati","valore":"64 g"},{"componente":"di cui zuccheri","valore":"30 g"},{"componente":"Fibre","valore":"0,09 g"},{"componente":"Proteine","valore":"28 g"},{"componente":"Sale","valore":"0,09 g"},{"componente":"Potassio","valore":"398 mg"},{"componente":"Fosforo","valore":"274 mg"},{"componente":"Calcio","valore":"250 mg"},{"componente":"Vitamina C","valore":"35 mg"},{"componente":"Vitamina E","valore":"6,0 mg"},{"componente":"Niacina","valore":"11 mg"},{"componente":"Acido pantotenico","valore":"3,7 mg"},{"componente":"Vitamina B6","valore":"1,2 mg"},{"componente":"Riboflavina","valore":"1,2 mg"},{"componente":"Tiamina","valore":"0,8 mg"},{"componente":"Biotina","valore":"440 mcg"},{"componente":"Acido folico","valore":"120 mcg"},{"componente":"Vitamina B12","valore":"6,0 mcg"},{"componente":"Bromelina","valore":"50 mg"},{"componente":"Lattasi","valore":"700 mcg"}]}},"ingredienti":"Maltodestrine (da mais), proteine isolate del siero del latte (Isolac), (emulsionante: lecitina di soia), fruttosio, destrosio monoidrato, caseinato di calcio istantaneo, cacao in polvere (4%), aromi, fosfato di potassio, addensante: gomma Xanthan, agente antiagglomerante: biossido di silicio, bromelina da ananas, (ananas camosus (L.Mer. , gambo) 2500GDU/g, vitamina C (acido L-ascorbico), edulcorante: sucralosio, vitamina E (acetato di D-L-Alfa-tocoferile tit. 50%), Niacina (Nicotinamide), vitamina B5 (calcio D-pantotenato), vitamina B6 (cloroidrato di piridossina), vitamina B2 (Riboflavina), vitamina B1 (cloroidrato di tiammina), lattasi beta-galattosidasi, Biotina, acido folico (acido pteroil-monoglutammico), vitamina B12 (cianocobalamina)."}', 'Assumere una porzione (79 g) in 300-400 ml di acqua o latte, 1 volta al giorno, preferibilmente dopo l''allenamento o come sostituto di un pasto, o secondo consiglio del medico o del nutrizionista.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata ed equilibrata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Consultare il medico in caso di patologie o terapie farmacologiche. Conservare in luogo fresco e asciutto.', 'Un "mass gainer" completo per chi cerca di aumentare la massa muscolare e il peso corporeo, grazie al bilanciato apporto di proteine a rilascio differenziato, carboidrati e un ricco profilo di vitamine e minerali.', false, false, false, '2025-06-26 13:51:52.215978', NULL, NULL, NULL, NULL);
INSERT INTO public.products VALUES (897, 'vegan-isopea-90', 'Vegan Isopea 90', 6, 1, 'Proteine vegetali isolate da piselli con alto contenuto proteico, perfette per atleti vegani e intolleranti al lattosio', 'VEGAN ISOPEA 90 è un prodotto dietetico per sportivi vegetale costituito da proteine isolate del pisello PISANE®, arricchito con OXXYNEA® (miscela di 22 estratti titolati di frutta e verdura creata con l''obiettivo di agire come un potente antiossidante). Fra le proteine derivate da piante, la proteina isolata Pisane®, prodotta da Cosucra azienda Belga tra le più famose al mondo per i prodotti di origine 100% naturale a filiera certificata, possiede un profilo di aminoacidi essenziali simile a quello della caseina e vanta un''elevatissima percentuale proteica pari all'' 85%.', '{"nome_prodotto":"Vegan Isopea 90","valori_nutrizionali":{"per_porzione":{"descrizione":"Informazioni nutrizionali per porzione:","porzione":"40 g","valori":[{"componente":"Energia","valore":"646 kJ / 152 kcal"},{"componente":"Grassi","valore":"1,6 g"},{"componente":"di cui acidi grassi saturi","valore":"0,3 g"},{"componente":"Carboidrati","valore":"0,4 g"},{"componente":"di cui zuccheri","valore":"0,1 g"},{"componente":"Proteine","valore":"34 g"},{"componente":"Sale","valore":"1,5 g"},{"componente":"Oxxynea®","valore":"240 mg"}]},"per_100g":{"descrizione":"Informazioni nutrizionali per 100 g:","valori":[{"componente":"Energia","valore":"1615 kJ / 380 kcal"},{"componente":"Grassi","valore":"4 g"},{"componente":"di cui acidi grassi saturi","valore":"0,8 g"},{"componente":"Carboidrati","valore":"1 g"},{"componente":"di cui zuccheri","valore":"0,2 g"},{"componente":"Proteine","valore":"85 g"},{"componente":"Sale","valore":"3,7 g"},{"componente":"Oxxynea® (Miscela di 22 concentrati ed estratti di frutta e verdura)","valore":"600 mg"}]}},"ingredienti":"Proteine isolate del pisello, cacao in polvere, aromi, cloruro di sodio, Oxxynea® (Miscela di 22 concentrati ed estratti di frutta e verdura, maltodestrina), edulcoranti: sucralosio, acesulfame K."}', 'Assumere fino a 40 g (4 misurini) al giorno con 300/500 ml d''acqua. All''interno della confezione è disponibile un misurino dosatore.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Conservare in luogo fresco e asciutto.', 'Un''ottima scelta vegana per l''apporto proteico, arricchita con antiossidanti. Ideale per chi cerca un''integrazione proteica completa di origine vegetale.', false, false, false, '2025-06-26 13:51:52.215978', NULL, NULL, NULL, NULL);
INSERT INTO public.products VALUES (1279, 'vitamine-minerals-watt', 'Vitamine & Minerals', 1, 7, 'Complesso multivitaminico e multiminerale completo formulato per supportare il benessere generale e l''energia quotidiana.', 'Contiene vitamine essenziali del gruppo B, vitamina C, D3, E e minerali fondamentali come magnesio, zinco, ferro e selenio per supportare il metabolismo energetico e le funzioni immunitarie.', '{"titolo":"Vitamine & Minerals","per_porzione":{"descrizione":"Valori nutrizionali per porzione","porzione":"1 compressa","valori":[{"componente":"Vitamina A","valore":"1.200 µg (150% VNR)"},{"componente":"Vitamina D","valore":"12,5 µg (250% VNR)"},{"componente":"Vitamina E","valore":"30 mg (250% VNR)"},{"componente":"Vitamina K","valore":"105 µg (140% VNR)"},{"componente":"Vitamina C","valore":"200 mg (250% VNR)"},{"componente":"Tiamina (Vit. B1)","valore":"1,7 mg (150% VNR)"},{"componente":"Riboflavina (Vit. B2)","valore":"2,4 mg (171% VNR)"},{"componente":"Vitamina B6","valore":"2,8 mg (200% VNR)"},{"componente":"Vitamina B12","valore":"2,5 µg (100% VNR)"},{"componente":"Niacina","valore":"27 mg (169% VNR)"},{"componente":"Acido Folico","valore":"400 µg (200% VNR)"},{"componente":"Biotina","valore":"225 µg (450% VNR)"},{"componente":"Acido Pantotenico","valore":"9 mg (150% VNR)"},{"componente":"Calcio","valore":"150 mg (19% VNR)"},{"componente":"Magnesio","valore":"100 mg (27% VNR)"},{"componente":"Zinco","valore":"12 mg (120% VNR)"},{"componente":"Ferro","valore":"14 mg (100% VNR)"},{"componente":"Rame","valore":"1 mg (100% VNR)"},{"componente":"Iodio","valore":"150 µg (100% VNR)"},{"componente":"Manganese","valore":"2 mg (100% VNR)"},{"componente":"Molibdeno","valore":"50 µg (100% VNR)"},{"componente":"Selenio","valore":"30 µg (55% VNR)"},{"componente":"Cromo","valore":"50 µg (125% VNR)"}]},"ingrediente":"agente di carica: fosfato dicalcico; acido L-ascorbico (vitamina C), ossido di magnesio, gluconato di ferro, gluconato di zinco, DL-alfa-tocoferolo acetato (vitamina E), agenti antiagglomeranti: E471, E551, E470b; nicotinammide (niacina), lievito arricchito in selenio, acetato di retinile (vitamina A), calcio D-pantotenato (acido pantotenico), gluconato di rame, solfato di manganese, colecalciferolo (vitamina D), cloridrato di pirossidina (vitamina B6), cianocobalamina (vitamina B12), riboflavina (vitamina B2), fitomenadione (vitamina K); cloridrato di tiamina (tiamina), molibdato di sodio [molibdeno (VI)]; acido pteroil-monoglutammico (acido folico), picolinato di cromo; D-biotina (biotina), ioduro di potassio."}', 'Assumere 1 compressa al giorno con acqua, preferibilmente durante i pasti principali.', 'Non superare la dose giornaliera consigliata. Tenere fuori dalla portata dei bambini. Gli integratori non vanno intesi come sostituti di una dieta variata ed equilibrata.', NULL, false, false, false, '2025-08-05 15:41:02.642173', NULL, NULL, NULL, NULL);
INSERT INTO public.products VALUES (871, 'perfect-100-whey', 'Perfect 100% Whey', 11, 1, 'Proteine del siero isolate e concentrate di altissima qualità WHY Sport. Formula perfetta con aminoacidi essenziali per crescita muscolare ottimale e recupero veloce.', 'Perfect 100% Whey contiene esclusivamente proteine isolate del siero del latte Isolac®, riconosciute per la loro purezza e biodisponibilità. Queste proteine di alta qualità sono un valido supporto per lo sviluppo e il mantenimento della massa muscolare, offrendo un sostegno essenziale per risultati duraturi.', '{"nome_prodotto":"Perfect Whey 100%","valori_nutrizionali":{"per_porzione":{"descrizione":"Informazioni nutrizionali per porzione:","valori":[{"componente":"Energia","valore":"497 kJ / 119 kcal"},{"componente":"Grassi","valore":"0,7 g"},{"componente":"di cui acidi grassi saturi","valore":"0,5 g"},{"componente":"Carboidrati","valore":"0,8 g"},{"componente":"di cui zuccheri","valore":"0,3 g"},{"componente":"Fibre","valore":"0,6 g"},{"componente":"Proteine","valore":"27 g"},{"componente":"Sale","valore":"0,12 g"},{"componente":"Calcio","valore":"137 mg (17% VNR)"}]},"per_100g":{"descrizione":"Informazioni nutrizionali per 100g:","valori":[{"componente":"Energia","valore":"1658 kJ / 396 kcal"},{"componente":"Grassi","valore":"2,4 g"},{"componente":"di cui acidi grassi saturi","valore":"1,7 g"},{"componente":"Carboidrati","valore":"2,6 g"},{"componente":"di cui zuccheri","valore":"1,1 g"},{"componente":"Fibre","valore":"2,0 g"},{"componente":"Proteine","valore":"90 g"},{"componente":"Sale","valore":"0,4 g"},{"componente":"Calcio","valore":"458 mg"}]}},"ingredienti":"Proteine del siero del latte isolate, cacao magro in polvere, aromi, addensante: carbossimetilcellulosa di sodio; edulcoranti: sucralosio, acesulfame K; antiagglomerante: biossido di silicio."}', 'Assumere 30 g di prodotto (circa 1 misurino) in 200-250 ml di acqua fredda, 1 volta al giorno, preferibilmente dopo l''allenamento per massimizzare il recupero muscolare.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Conservare in luogo fresco e asciutto.', 'Ottima per un rapido apporto proteico post-allenamento, favorisce la sintesi proteica e il recupero. Ideale anche come spuntino proteico durante la giornata.', false, true, false, '2025-06-25 22:33:09.98373', 9, NULL, NULL, NULL);
INSERT INTO public.products VALUES (640, 'whey-protein-90', 'Whey Protein 90', 1, 1, 'Proteine del siero del latte isolate con concentrazione del 90%, perfette per atleti che cercano massima purezza e rapidità di assorbimento.', 'Whey Protein 90 è un integratore a base di proteine ISOLATE del siero del latte (ULTRA WPI 90 della VOLAC®), ottenute tramite micro-ultrafiltrazione (CFM) a bassa temperatura e pressione. Questa tecnica fisica garantisce una purezza proteica del 90% senza l''uso di agenti chimici, mantenendo un contenuto minimo di grassi, carboidrati e lattosio (meno di 0,6 g per dose). Ideale per il mantenimento e la crescita della massa muscolare, Whey Protein 90 favorisce un rapido aumento degli amminoacidi nel sangue, particolarmente efficace nelle 1-2 ore post-allenamento per stimolare la sintesi proteica muscolare.', '{"nome_prodotto":"Whey Protein 90","valori_nutrizionali":{"per_porzione":{"descrizione":"Informazioni nutrizionali per dose:","porzione":"25 g","valori":[{"componente":"Valore energetico","valore":"402 kJ / 95 kcal"},{"componente":"Grassi","valore":"0,4 g"},{"componente":"di cui saturi","valore":"0,2 g"},{"componente":"Carboidrati","valore":"0,7 g"},{"componente":"di cui zuccheri","valore":"0,6 g"},{"componente":"Proteine","valore":"22 g"},{"componente":"Sale","valore":"0,12 g"},{"componente":"Vitamina C","valore":"12 mg (15% VNR)"},{"componente":"Vitamina E","valore":"2 mg (17% VNR)"},{"componente":"Tiamina (Vit. B1)","valore":"0,32 mg (28% VNR)"},{"componente":"Riboflavina (Vit. B2)","valore":"0,37 mg (26% VNR)"},{"componente":"Vitamina B6","valore":"0,42 mg (29% VNR)"}]}},"ingredienti":"Proteine del latte (sieroproteine ottenute per micro-ultrafiltrazione (CFM)) 95,1%, cacao in polvere, aromi, edulcoranti: sucralosio, glicosidi steviolici (estratti da foglie di Stevia rebaudiana Bertoni) ; acido L-ascorbico (vitamina C), DL-alfa tocoferolo acetato (vitamina E), piridossina HCl (vitamina B6), riboflavina (vitamina B2), tiamina HCl (vitamina B1), cianocobalamina (vitamina B12). Il prodotto potrebbe contenere soia e uovo."}', 'Dosaggio: 2 misurini di prodotto (corrispondenti a 25 g) da sciogliere in 100 ml di acqua o latte magro. Uso sportivo: efficace nelle 1-2 ore post-allenamento per incrementare o mantenere la massa muscolare. Vita quotidiana: da assumere preferibilmente a colazione o come spuntino per un apporto proteico supplementare.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Conservare in luogo fresco e asciutto. Il prodotto potrebbe contenere soia e uovo.', 'Una proteina isolata purissima con minimo contenuto di grassi e carboidrati, ideale per il post-allenamento per un rapido recupero e per chi è attento alla linea.', false, false, false, '2025-06-12 21:14:50.327999', NULL, NULL, NULL, NULL);
INSERT INTO public.products VALUES (1186, 'arginina-alfaketoglutarato-2000', 'Arginina Alfaketoglutarato 2000', 25, 7, 'Arginina in compresse da 1000 mg in forma alfachetoglutarato.', 'La L-arginina un aminoacido classificato semi essenziale. Le funzioni biologiche della L-arginina potrebbero essere riassunte nei seguenti punti: precursore dell''ossido nitrico, azione antiossidante, detossificazione dei residui azotati (l''arginina partecipa al ciclo dell''urea), precursore della creatina, supporto al sistema immunitario ( l''arginina è coinvolta nella produzione delle cellule del sistema immunitario come i linfociti T), partecipazione alla sintesi delle proteine ( secondo studi l''arginina è coinvolta nella produzione delle proteine necessarie per la crescita, il ripristino e il mantenimento dei tessuti muscolari). Integratore alimentare di Arginina AAKG, un aminoacido essenziale il cui fabbisogno aumenta notevolmente in corso di attività fisica. In versione AKG (alfaketoglutarato) diventa un ottimo pre-workout favorendo il trasporto dei nutrienti al muscolo.', '{"titolo":"Arginina Alfaketoglutarato 2000","per_porzione":{"descrizione":"Valori nutrizionali per porzione","porzione":"2 compresse","valori":[{"componente":"L-Arginina AKG","valore":"2000 mg"}]},"ingredienti":"Arginina AKG, Calcio fosfato, Cellulosa microcristallina, Antiagglomerante: Magnesio Stearato."}', 'Assumere 2 compresse al giorno con acqua.', NULL, NULL, false, false, false, '2025-08-04 07:41:24.546111', 34, 'Unico', '90 capsule', NULL);
INSERT INTO public.products VALUES (874, 'essential-100-whey', 'Essential 100% Whey', 11, 1, 'Proteine essenziali WHY Sport concentrate per risultati garantiti. Formula base con purezza e qualità certificate per tutti gli atleti.', 'Essential 100% Whey è un integratore di proteine concentrate del siero del latte, arricchito con il dinamico mix Grow Factor, che comprende creatina monoidrato e L-glicina.
Le proteine concentrate del siero del latte forniscono un carico rapido di aminoacidi essenziali per supportare la sintesi proteica e promuovere la crescita muscolare.
Ideali per il post-allenamento, queste proteine lavorano instancabilmente per favorire il recupero e rafforzare la struttura dei muscoli.', '{"nome_prodotto":"Essential 100% Whey","valori_nutrizionali":{"per_porzione":{"descrizione":"Informazioni nutrizionali per porzione:","valori":[{"componente":"Energia","valore":"507 kJ / 121 kcal"},{"componente":"Grassi","valore":"2,0 g"},{"componente":"di cui acidi grassi saturi","valore":"1,3 g"},{"componente":"Carboidrati","valore":"2,2 g"},{"componente":"di cui zuccheri","valore":"1,6 g"},{"componente":"Proteine","valore":"23,4 g"},{"componente":"Sale","valore":"0,3 g"},{"componente":"Calcio","valore":"130 mg (16% VNR)"},{"componente":"Creatina monoidrato","valore":"2,1 g"}]},"per_100g":{"descrizione":"Informazioni nutrizionali per 100g:","valori":[{"componente":"Energia","valore":"1691 kJ / 404 kcal"},{"componente":"Grassi","valore":"6,5 g"},{"componente":"di cui acidi grassi saturi","valore":"4,4 g"},{"componente":"Carboidrati","valore":"7,2 g"},{"componente":"di cui zuccheri","valore":"5,4 g"},{"componente":"Fibre","valore":"2,5 g"},{"componente":"Proteine","valore":"78 g"},{"componente":"Sale","valore":"1,0 g"},{"componente":"Calcio","valore":"436 mg"},{"componente":"Creatina monoidrato","valore":"7,0 g"}]}},"ingredienti":"Proteine concentrate del siero del latte (emulsionante: lecitina di soia); Grow factor 14% (creatina monoidrato, L-glicina); cacao in polvere (6,2%); addensanti: gomma di guar, gomma di xanthan; aroma; cloruro di sodio; edulcoranti: acesulfame K, sucralosio; aroma."}', 'Assumere 30 g di prodotto (circa 1 misurino colmo) con 250 ml di acqua o latte una volta al giorno, preferibilmente dopo l''allenamento o secondo consiglio del nutrizionista.', 'Non superare la dose giornaliera consigliata. Tenere fuori dalla portata dei bambini al di sotto dei tre anni. Gli integratori non vanno intesi come sostituti di una dieta variata ed equilibrata.', 'Per un''assimilazione ottimale, assumi Essential 100% Whey entro 30 minuti dalla fine dell''allenamento e abbinalo a una fonte di carboidrati semplici.', false, false, false, '2025-06-25 22:34:53.197613', 10, NULL, NULL, NULL);
INSERT INTO public.products VALUES (1280, 'melatonine-plus', 'Melatonine+', 6, 7, 'Integratore di melatonina arricchito con estratti naturali per favorire il rilassamento e un sonno ristoratore.', 'Formula avanzata con melatonina 1mg, estratto di valeriana, passiflora e melissa per un approccio naturale al benessere del sonno e al rilassamento quotidiano.', '{"titolo":"Melatonine+","per_porzione":{"descrizione":"Valori nutrizionali per dose","porzione":"1 compressa","valori":[{"componente":"Melatonina","valore":"1 mg"}]},"ingredienti":"Escolzia californiana 4:1 e.s. (Eschscholtzia californica cham.); Passiflora 5:1 e.s. (Passiflora incarnata L.); Melissa 5:1 e.s. (Melissa officinalis L.); Tilia 10:1 e.s. (Tilia platphyllos scop.); Valeriana 5:1 e.s. (Valeriana officinalis L); Melatonina; Amido di mais; Stabilizzante: Fosfato di calcio; Agente antiagglomerante: cellulosa microcristallina; antiagglomeranti: sali di magnesio degli acidi grassi, Biossido di silicio."}', 'Assumere 1 compressa 30 minuti prima di coricarsi, con un bicchiere d''acqua.', 'Non superare la dose consigliata. Non assumere in gravidanza, allattamento o sotto i 12 anni. Può causare sonnolenza, non guidare dopo l''assunzione.', NULL, false, false, false, '2025-08-05 15:41:40.886665', NULL, NULL, NULL, NULL);
INSERT INTO public.products VALUES (1012, 'vpr-vegetal-protein-integratore-alimentare-di-proteine-vegetali', 'VPR - Vegetal Protein', 22, 1, 'Proteina vegetale completa da pisello, riso e zucca. Senza soia, con vitamina B12, ad alta digeribilità. Adatta ai vegani.', 'VPR VEGETAL PROTEIN è una proteina vegetale completa e ben tollerata, ottenuta da pisello, riso e zucca: tre fonti complementari per un profilo amminoacidico bilanciato.
Senza soia, naturalmente senza glutine né lattosio, è arricchita con Vitamina B12 e MCT da cocco, per una migliore digeribilità e un profilo nutrizionale adatto anche a chi segue una dieta vegana.
Il gusto cacao naturale, senza retrogusti vegetali, e l''ottima solubilità la rendono pratica e piacevole da assumere anche solo con acqua.', '{"nome_prodotto":"VPR Vegetal Protein - Cacao","valori_nutrizionali":{"per_porzione":{"descrizione":"Informazioni nutrizionali per porzione:","porzione":"30 g","valori":[{"componente":"Energia","valore":"480 kJ / 115 kcal"},{"componente":"Grassi","valore":"2,4 g"},{"componente":"di cui saturi","valore":"0,9 g"},{"componente":"Carboidrati","valore":"0,7 g"},{"componente":"di cui zuccheri","valore":"0 g"},{"componente":"Fibre","valore":"2,4 g"},{"componente":"Proteine","valore":"21 g"},{"componente":"Sale","valore":"0,77 g"},{"componente":"Vitamina B12","valore":"2,5 µg (100% NRV)"}]},"per_100g":{"descrizione":"Informazioni nutrizionali per 100 g:","valori":[{"componente":"Energia","valore":"1600 kJ / 383 kcal"},{"componente":"Grassi","valore":"7,9 g"},{"componente":"di cui saturi","valore":"3,0 g"},{"componente":"Carboidrati","valore":"2,3 g"},{"componente":"di cui zuccheri","valore":"0 g"},{"componente":"Fibre","valore":"7,9 g"},{"componente":"Proteine","valore":"71 g"},{"componente":"Sale","valore":"2,6 g"},{"componente":"Vitamina B12","valore":"8,33 µg"}]}},"ingredienti":"Proteine del riso, proteine del pisello, cacao in polvere (per la variante cacao), aromi, edulcoranti: sucralosio, glicosidi steviolici; miscela di vitamine e minerali (specifiche per la variante del prodotto)."}', 'Assumere 1 porzione (30g = 2 misurini) in 200–250 ml d''acqua o altra bevanda vegetale. Ideale dopo l''allenamento, a colazione o come spuntino proteico.', 'Proteine isolate di pisello, cacao 10%, proteine di semi di zucca, proteine di riso, olio MCT (70%) in polvere da olio di cocco microincapsulato con gomma arabica, aromi, edulcoranti: sucralosio e glicosidi steviolici da Stevia, addensanti: gomma di xantano e gomma arabica, sale, aromi, metilcobalamina (vitamina B12).', NULL, false, false, false, '2025-07-25 22:58:30.189744', NULL, 'Cacao', '500g', NULL);
INSERT INTO public.products VALUES (642, 'top-eggxellent-protein', 'TOP EggXellent Protein', 1, 1, 'Proteine dell''uovo isolate di altissima qualità, ultrasolubili e senza lattosio per una digestione perfetta', 'Top Eggxellent Protein è un integratore alimentare di proteine isolate da albume d''uovo, arricchito con vitamine essenziali. L''albume d''uovo rappresenta una fonte di proteine di altissimo valore biologico, con un profilo amminoacidico completo e una purezza straordinaria, privo quasi totalmente di grassi e zuccheri. Questo lo rende ideale per il mantenimento della massa muscolare, per regimi dietetici ipocalorici e per chi è intollerante al lattosio o allergico ai derivati del latte o della soia.', '["Valori Nutrizionali per porzione:", "1 PORZIONE = 30g", "Energia  460 kJ/108 kcal", "Grassi  0,8 g", "di cui acidi grassi saturi  0,5 g", "Carboidrati  1,5 g", "di cui zuccheri  1,2 g", "Proteine  24 g", "Sale  0,12 g", "", "Valori Nutrizionali per 100g:", "Energia  1533 kJ/360 kcal", "Grassi  2,7 g", "di cui acidi grassi saturi  1,7 g", "Carboidrati  5,0 g", "di cui zuccheri  4,0 g", "Proteine  80 g", "Sale  0,40 g", "", "VNR = valori nutritivi di riferimento"]', 'Uso sportivo: sciogliere 2,5 misurini (25 g) in almeno 150 ml di acqua o latte magro per atleti che vogliono garantire il mantenimento o l''aumento della massa magra con un''alternativa priva di lattosio. Vita quotidiana: per integrare proteine in una dieta povera di alimenti proteici o per ridurre l''assunzione di carboidrati e grassi. Dosaggio consigliato: 1 g/kg di peso corporeo.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Conservare in luogo fresco e asciutto. Il prodotto potrebbe contenere soia e latte.', 'Un''eccellente fonte proteica per intolleranti al lattosio o allergici ai derivati del latte, con un profilo aminoacidico completo e priva di grassi e zuccheri. Ottima per ogni esigenza dietetica.', false, false, false, '2025-06-12 21:14:51.534721', NULL, NULL, NULL, NULL);
INSERT INTO public.products VALUES (1260, 'egg-protein-cioccolato', 'EGG Protein', 23, 1, 'Integratore alimentare di proteine del bianco d''uovo con edulcoranti, particolarmente adatto agli sportivi, a solubilità istantanea.', 'EGG PROTEIN è un integratore alimentare di proteine del bianco d''uovo con edulcoranti, particolarmente adatto agli sportivi, a solubilità istantanea. La vitamina B6 contribuisce al normale metabolismo delle proteine e del glicogeno e alla riduzione della stanchezza e dell''affaticamento. Le proteine dell''uovo sono una fonte proteica di elevatissima qualità, ed hanno un alto valore biologico. I tempi di digestione di queste proteine sono rapidi, quindi il rilascio degli aminoacidi contenuti è veloce.

Modalità d''uso: Assumere una porzione da 30 g (3 misurini) al giorno miscelata con 130-150 ml di acqua. Il volume di liquido aggiunto influisce sull''intensità del gusto e sulla densità del preparato, non influisce sulla digeribilità o assimilabilità. Assumere il prodotto come spuntino durante la giornata, lontano dai pasti principali, oppure dopo gli allenamenti o attività sportiva. Preparazione nel bicchiere: Il prodotto è instant, ciò significa che non è necessario lo shaker per prepararlo. Inserire una porzione del prodotto nel bicchiere, aggiungere acqua e miscelare con un cucchiaio per alcuni secondi. Preparazione con lo shaker: portare uno shaker con voi per la palestra è il modo migliore per ottenere una efficace dose di proteine ​​subito dopo l''allenamento. Inserire una porzione del prodotto nello shaker, aggiungere acqua, coprire con il tappo e shakerare per alcuni secondi.

Ingredienti: Proteine del bianco d''UOVO; Aromi; Addensante: gomma xantano; Sale; Edulcorante: sucralosio; Piridossina cloridrato (Vitamina B6).', '{"nome_prodotto":"EGG PROTEIN","valori_nutrizionali":{"per_porzione":{"descrizione":"Informazioni nutrizionali per porzione:","porzione":"30g","valori":[{"componente":"Energia","valore":"456 kJ / 107 kcal"},{"componente":"Grassi","valore":"0,1 g"},{"componente":"di cui acidi grassi saturi","valore":"0 g"},{"componente":"Carboidrati","valore":"1,6 g"},{"componente":"di cui zuccheri","valore":"0,1 g"},{"componente":"Proteine","valore":"25 g"},{"componente":"Sale","valore":"0,9 g"},{"componente":"Vitamina B6","valore":"0,6 mg (43% VNR)"}]},"per_100g":{"descrizione":"Informazioni nutrizionali per 100 g:","valori":[{"componente":"Energia","valore":"1524 kJ / 359 kcal"},{"componente":"Grassi","valore":"0,2 g"},{"componente":"di cui acidi grassi saturi","valore":"0,1 g"},{"componente":"Carboidrati","valore":"5,2 g"},{"componente":"di cui zuccheri","valore":"0,3 g"},{"componente":"Proteine","valore":"84 g"},{"componente":"Sale","valore":"3,1 g"},{"componente":"Vitamina B6","valore":"2 mg (43% VNR)"}]}},"ingredienti":"Proteine dell''albume d''uovo in polvere, cacao in polvere, aromi, edulcoranti: sucralosio, glicosidi steviolici (estratti da foglie di Stevia rebaudiana Bertoni); cloridrato di piridossina (vitamina B6)."}', 'Assumere una porzione da 30 g (3 misurini) al giorno miscelata con 130-150 ml di acqua.', NULL, NULL, false, false, false, '2025-08-04 09:01:20.926426', 48, 'Cioccolato', '750g', '750g');
INSERT INTO public.products VALUES (971, 'promeal-energetica', 'Promeal Energetica', 8, 8, 'Barretta energetica ad alto contenuto energetico con 13 vitamine per supportare il metabolismo energetico durante gli sport di endurance.', 'Barretta energetica scientificamente formulata per sportivi che praticano discipline di resistenza. Contiene un mix bilanciato di carboidrati a rilascio rapido e graduale, arricchita con 13 vitamine essenziali per ottimizzare il metabolismo energetico e ridurre la stanchezza durante sforzi prolungati.', '{"titolo":"Promeal Energetica","valori_nutrizionali":{"per_100g":{"energia":"453 kcal / 1895 kJ","grassi":"25 g","saturi":"2,1 g","carboidrati":"48g","zuccheri":"36 g","proteine":"16 g","sale":"0,06 g","creatina_M":"500 mg","l_carnitina":"100 mg","vitamine":"varie"},"per_2_bars":{"porzione":"80 g","energia":"362 kcal / 1515 kJ","grassi":"20 g","saturi":"1,7 g","carboidrati":"38g","zuccheri":"28 g","proteine":"13 g","sale":"0,05 g","creatina_M":"400 mg","l_carnitina":"80 mg","vitamine":"varie (20% VNR)"}},"ingredienti":"Farina di mandorle, sciroppo di fruttosio-glucosio, proteine del latte, glicerina vegetale, cacao, frutta disidratata, maltodestrine di mais, albume d’ uovo, creatina monoidrato, L-carnitina tartrato, grassi vegetali non idrogenati, vitamine (C, E, Niacina, Acido Pantotenico, A, D, B6, B1, B2, Acido folico, K, biotina, B12), L- ornitina cloridrato, coloranti, aroma, magnesio carbonato, potassio cloruro, addensante: gomma arabica, ferro solfato, zinco solfato."}', '1-4 barrette al giorno, 1 per ogni ora di attività fisica.', '🟨 **AVVERTENZE**: Può contenere tracce di glutine, soia, latte e frutta a guscio.', NULL, false, false, false, '2025-06-27 15:29:21.025259', NULL, 'Mandorle', NULL, NULL);
INSERT INTO public.products VALUES (639, 'whey-protein-80', 'Whey Protein 80', 1, 1, 'Proteine del siero del latte concentrate, ideali per sostenere lo sviluppo muscolare e il recupero post-allenamento.', 'Wheyghty Protein 80 è formulato con proteine concentrate del siero del latte di alta qualità, caratterizzate da una rapida digeribilità e ottima solubilità. Queste proteine favoriscono un aumento rapido degli aminoacidi nel sangue, ottimizzando la fase anabolica post-allenamento e supportando il recupero muscolare. La composizione bilanciata con vitamine del gruppo B e vitamina C ed E rende questo integratore ideale per chi cerca un apporto proteico che favorisca la crescita e il mantenimento della massa muscolare.', '{"nome_prodotto":"Whey Protein 80","valori_nutrizionali":{"per_porzione":{"descrizione":"Informazioni nutrizionali per dose:","porzione":"25 g","valori":[{"componente":"Valore energetico","valore":"422 kJ / 100 kcal"},{"componente":"Grassi","valore":"1,7 g"},{"componente":"di cui saturi","valore":"0,6 g"},{"componente":"Carboidrati","valore":"1 g"},{"componente":"di cui zuccheri","valore":"1 g"},{"componente":"Proteine","valore":"20 g"},{"componente":"Sale","valore":"0,04 g"},{"componente":"Vitamina C","valore":"14 mg (23% VNR)"},{"componente":"Vitamina E","valore":"2,4 mg (25% VNR)"},{"componente":"Tiamina (Vit. B1)","valore":"0,37 mg (38% VNR)"},{"componente":"Riboflavina (Vit. B2)","valore":"0,51 mg (34% VNR)"},{"componente":"Vitamina B6","valore":"0,48 mg (43% VNR)"}]}},"ingredienti":"Proteine concentrate del siero del latte (emulsionante: lecitina di soia) 95%, cacao in polvere, aromi, edulcoranti: acesulfame K, sucralosio; acido L-ascorbico (vitamina C), DL-alfa tocoferolo acetato (vitamina E), tiamina HCl (vitamina B1), riboflavina (vitamina B2), piridossina HCl (vitamina B6)."}', 'Dosaggio: 2,5 misurini (circa 25 g) sciolti in 80-100 ml di acqua o latte magro. Uso sportivo: assumere entro 1-2 ore post-allenamento per massimizzare la sintesi proteica. Vita quotidiana: preferibilmente a colazione o come spuntino per supporto proteico quotidiano.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Conservare in luogo fresco e asciutto. Il prodotto potrebbe contenere soia e uovo.', 'Un''ottima proteina concentrata per il recupero e la crescita muscolare, versatile per l''uso sportivo e quotidiano, con un buon profilo vitaminico.', false, false, false, '2025-06-12 21:14:49.432903', NULL, NULL, NULL, NULL);
INSERT INTO public.products VALUES (1202, 'bcaa-2-1-1-proram', 'BCAA 2:1:1 Proram', 25, 2, 'Pre/intra/post workout contrasta stanchezza favorisce il recupero. BCAA 2.1.1 di origine vegetale con Vit B6', 'Prodotti per sportivi costituiti da un''associazione di L-Leucina, L-Isoleucina, L-Valina e Vitamina B6 destinati a tutti coloro che praticano attività fisico-sportiva molto intensa utili ad aumentare il livello di aminoacidi ramificati disponibili per l''organismo mantenendo un bilancio azotato positivo. BCAA Sport a completamento della dieta è indicato in particolare nell''alimentazione degli sportivi, nelle situazioni di accentuato catabolismo proteico come nei casi di attività muscolare intensa o di resistenza. Pro Nutrition affianca alla versione in compresse PRORAM + Vit B6 anche la versione in polvere BCAA POWDER per completare la propria gamma di BCAA ed offrire al consumatore una alternativa da utilizzare per i propri allenamenti. PRORAM POWDER è costituito da purissimi BCAA in polvere + Vit B6 aromatizzati al limone per chi preferisce assumerli con miscele proteiche, di carboidrati oppure con la propria bevanda preferita durante la giornata', '["**VALORI NUTRIZIONALI**", "", "| Componente | Per porzione (5 compresse) | % RDA* |", "|------------|----------------------------|--------|", "| Aminoacidi Ramificati B.C.A.A. | 5000 mg | - |", "| di cui L-Leucina | 2500 mg | - |", "| di cui L-Valina | 1250 mg | - |", "| di cui L-Isoleucina | 1250 mg | - |", "| Vitamina B6 | 2 mg | 100% |", "", "Porzioni per confezione: 20", "*RDA: Dosaggio Giornaliero Raccomandato", "", "**INGREDIENTI**", "L-Leucina, L - Isoleucina, L - Valina, amido, antiagglomerante: Biossido di silicio, magnesio stearato, inulina, piridossina cloridrato"]', 'Si consiglia di assumere 5 compresse al giorno preferibilmente prima o dopo l''attività fisica', NULL, NULL, false, false, false, '2025-08-04 08:19:49.170085', 36, 'Unico', NULL, '100 capsule');
INSERT INTO public.products VALUES (1222, 'caffè-verde-te-matcha', 'Caffè Verde+Tè Matcha 800 mg', 25, 7, 'Integratore alimentare a base di Caffè Verde e Tè Matcha, formulato per supportare il tuo benessere e la tua vitalità.', 'Integratore alimentare a base di Caffè Verde e Tè Matcha, formulato per supportare il tuo benessere e la tua vitalità. Il Caffè Verde agisce sul metabolismo dei carboidrati e dei lipidi, mentre il Tè Matcha favorisce la concentrazione e la lucidità mentale, offrendo al contempo un''azione tonica e di sostegno metabolico. Questa combinazione sinergica è progettata per fornire un''energia bilanciata e duratura, contribuendo alla riduzione della stanchezza e al mantenimento di un metabolismo efficiente.', '{"titolo":"CAFFÈ VERDE+TÈ MATCHA 60 CPR 800MG","per_porzione":{"descrizione":"Valori nutrizionali per 2 compresse","valori":[{"componente":"E.S. Caffè Verde","valore":"400 mg"},{"sottocomponente":"Di cui Acido Clorogenico","valore":"180 mg"}]},"ingrediente":"Cellulosa microcristallina, Calcio difosfato, E.S. Caffè verde (Coffea arabica L.) semi 45% Acido clorogenico, E.S. The verde Matcha (Camelia sinensis) foglie 4:1, Antiagglomeranti: Magnesio stearato E470 (b), Mono e digliceridi degli acidi grassi E471, Biossido di silicio E551."}', 'Assumere 2 compresse al giorno con acqua.', NULL, NULL, false, false, false, '2025-08-04 08:39:10.536301', NULL, 'Unico', NULL, '60 capsule');
INSERT INTO public.products VALUES (876, 'vegetal-100-protein', 'Vegetal 100% Protein', 11, 1, 'Proteine vegetali pure 100% naturali. Fonte proteica completa per atleti vegani e vegetariani con tutti gli aminoacidi essenziali.', 'Vegetal 100% Protein contiene proteine vegetali da riso e pisello, con aggiunta di ModCarb™, una miscela di crusca di avena senza glutine, quinoa, amaranto, grano saraceno e miglio, ed estratto di Acai, noto per le sue proprietà antiossidanti che contribuiscono a contrastare lo stress ossidativo. Le proteine del pisello e del riso di Vegetal 100% Protein costituiscono una combinazione vincente di proteine vegetali per un supporto completo alla crescita e al mantenimento della massa muscolare. Offrono un profilo aminoacidico completo, garantendo la presenza di tutti gli amminoacidi essenziali necessari per la sintesi proteica e la riparazione muscolare.', '{"nome_prodotto":"Vegetal 100% Protein","valori_nutrizionali":{"per_porzione":{"descrizione":"Informazioni nutrizionali per porzione:","valori":[{"componente":"Energia","valore":"511 kJ / 121 kcal"},{"componente":"Grassi","valore":"2,6 g"},{"componente":"di cui acidi grassi saturi","valore":"0,8 g"},{"componente":"Carboidrati","valore":"2,2 g"},{"componente":"di cui zuccheri","valore":"0,0 g"},{"componente":"Fibre","valore":"2,1 g"},{"componente":"Proteine","valore":"21 g"},{"componente":"Sale","valore":"0,9 g"},{"componente":"ModCarb®","valore":"0,6 g"},{"componente":"Acai e.s.","valore":"30 mg"}]},"per_100g":{"descrizione":"Informazioni nutrizionali per 100g:","valori":[{"componente":"Energia","valore":"1704 kJ / 404 Kcal"},{"componente":"Grassi","valore":"8,6 g"},{"componente":"di cui acidi grassi saturi","valore":"2,6 g"},{"componente":"Carboidrati","valore":"7,2 g"},{"componente":"di cui zuccheri","valore":"0,0 g"},{"componente":"Fibre","valore":"7,1 g"},{"componente":"Proteine","valore":"71 g"},{"componente":"Sale","valore":"3,3 g"},{"componente":"ModCarb®","valore":"2,0 g"},{"componente":"Acai e.s.","valore":"100 mg"}]}},"ingredienti":"Proteine concentrate di riso, proteine concentrate di pisello, proteine concentrate di girasole, ModCarb® (Crusca d''avena, quinoa, amaranto, grano saraceno, miglio), cacao in polvere, aromi, acai e.s. (Euterpe oleracea Mart., fructus), edulcoranti: sucralosio, glicosidi steviolici (estratti da foglie di Stevia rebaudiana Bertoni)."}', 'Assumere 30 g di prodotto (circa 1 misurino colmo) in 250 ml di acqua fredda, 1 volta al giorno, preferibilmente dopo l''allenamento o secondo consiglio del medico o del nutrizionista.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Conservare in luogo fresco e asciutto.', 'Una proteina vegetale completa, ideale per vegani e per chi cerca un''alternativa alle proteine animali, con l''aggiunta di ModCarb™ per un rilascio energetico bilanciato e Acai per le proprietà antiossidanti.', false, false, false, '2025-06-25 22:34:53.197613', 13, NULL, NULL, NULL);
INSERT INTO public.products VALUES (875, 'top-100-xp-cacao', 'Top 100 XP Cacao', 1, 1, 'Proteine premium +WATT con gusto intenso di cacao. Formula concentrata per performance elevate e recupero ottimale.', 'Top 100% XP è una proteina di grande qualità, povera di grassi e carboidrati. L''alto tenore proteico e la grande solubilità ne fanno un prodotto di facile utilizzo e ideale per il mantenimento della massa muscolare dopo lo sforzo fisico e per tutti coloro che hanno bisogno di un''integrazione proteica. I bassi livelli di lattosio la rendono tollerabile anche da chi dovesse soffrire di intolleranze a questo zucchero. Bromelina e papaina sono due enzimi vegetali che rendono Top 100% XP un prodotto leggero e di facile digestione.', '{"nome_prodotto":"Top 100% XP","valori_nutrizionali":{"per_porzione":{"descrizione":"Informazioni nutrizionali per porzione:","valori":[{"componente":"Valore energetico","valore":"402 kJ / 96 kcal"},{"componente":"Grassi","valore":"0,4 g"},{"componente":"di cui: Acidi grassi saturi","valore":"0,2 g"},{"componente":"Carboidrati","valore":"0,1 g"},{"componente":"di cui: Zuccheri","valore":"0,1 g"},{"componente":"Fibre","valore":"0,4 g"},{"componente":"Proteine","valore":"22 g"},{"componente":"Sale","valore":"0,12 g"},{"componente":"Vitamina C","valore":"14 mg (18% VNR)"},{"componente":"Vitamina E","valore":"2,4 mg (20% VNR)"},{"componente":"Tiamina (Vit. B1)","valore":"0,33 mg (30% VNR)"},{"componente":"Riboflavina (Vit. B2)","valore":"0,38 mg (27% VNR)"},{"componente":"Vitamina B6","valore":"0,47 mg (34% VNR)"},{"componente":"Bromelina","valore":"25 mg"},{"componente":"Papaina","valore":"25 mg"}]}},"ingredienti":"Proteine del siero del latte isolate per microfiltrazione, cacao in polvere, aromi, emulsionante: lecitina di soia; bromelina 2500 GDU/g, papaina 1500 TU/mg, miscela vitaminica (acido L-ascorbico, DL-alfa tocoferolo acetato, piridossina HCl, riboflavina, tiamina HCl), edulcoranti: sucralosio, acesulfame K."}', 'Si consiglia l''assunzione di 3 misurini (25 g) in 100 ml di acqua o latte magro.', 'Gli integratori alimentari non vanno intesi come sostituti di una dieta variata ed equilibrata ed uno stile di vita sano. L''assunzione non deve eccedere la dose giornaliera consigliata. Tenere fuori dalla portata dei bambini al di sotto dei 3 anni. Non utilizzare in gravidanza e allattamento, in caso di patologie epatiche o renali, nei bambini e comunque per periodi prolungati senza sentire il parere del medico.', 'Grazie al basso contenuto di lattosio e agli enzimi digestivi, è un''ottima scelta per chi cerca una proteina facilmente digeribile e ben tollerata, ideale per il post-allenamento o come integrazione quotidiana.', false, false, false, '2025-06-25 22:34:53.197613', 12, NULL, NULL, NULL);
INSERT INTO public.products VALUES (1278, 'citrullina-malato-175g', 'Citrullina Malato', 25, 2, 'Integratore alimentare a base di Beta Alanina 1000 mg con istidina. Promuove la formazione di carnosina, contrasta la formazione dell''acido lattico.', 'Integratore alimentare per sportivi a base di Beta Alanina ed L-Istidina, in compresse da 1350mg. Utile per contrastare la formazione dell''acido lattico, soprattutto negli sport aerobici e di pesistica pesante, aumentando i livelli di carnosina nel muscolo. Numerosi studi hanno evidenziato infatti che la carnosina è in grado di inibire, in parte, gli effetti dell''acido lattico nei muscoli e garantire un miglioramento della performance. Aminoacido sintetizzato nel fegato, la beta alanina, con l''istidina, entrano nella composizione della carnosina (beta alanil-istidina) un dipeptide con importanti funzioni a livello muscolare. Sembra rappresentare l''agente limitante per la sintesi della carnosina, data la sua scarsa concentrazione nell''organismo. In altri termini, la somministrazione di beta alanina con istidina è un''ottima strategia per aumentare i livelli di carnosina negli organi dove questo dipeptide è presente. L''aumento di carnosina dopo somministrazione di beta alanina porta ad una esaltazione delle proprietà fisiologiche del dipeptide. Numerosi studi hanno evidenziato che la carnosina è in grado di inibire, in parte, gli effetti dell''acido lattico nei muscoli e garantire un miglioramento della performance.', '{"titolo":"Citrullina Malato","per_porzione":{"descrizione":"Valori Nutrizionali per dose","porzione":"3,5 g","valori":[{"componente":"Citrullina DL Malato","valore":"3000 mg"}]},"ingredienti":"Citrullina DL malato; aroma; maltodestrina; correttore di acidità: acido citrico (E330); edulcorante: sucralosio (E955); agente antiagglomerante: biossido di silicio (E551)."}', 'Si consiglia di assumere 3,5 grammi al giorno (un misurino contiene circa 3,5 g) da sciogliere in un bicchiere di acqua.', NULL, NULL, false, false, false, '2025-08-05 08:04:18.236373', NULL, 'Limone', NULL, '175g');
INSERT INTO public.products VALUES (1250, 'gluta-pep', 'Gluta Pep', 23, 2, 'GLUTA PEP è un integratore alimentare di glutammina in forma peptidica, con vitamina B6.', 'GLUTA PEP è un integratore alimentare di glutammina in forma peptidica, con vitamina B6. La forma peptidica rende la glutammina contenuta altamente assimilabile. Il prodotto è stato sviluppato per gli sportivi, la glutammina è un aminoacido coinvolto nel processo di recupero e rigenerazione muscolare, la vitamina B6 contribuisce alla riduzione della stanchezza e dell''affaticamento e al normale metabolismo energetico. Non contiene ingredienti di origine animale, adatto anche ai vegani.', '{"titolo":"Gluta Pep","per_porzione":{"descrizione":"Valori nutrizionali per porzione","porzione":"5 compresse","valori":[{"componente":"Glutammina peptide","valore":"5.000 mg (di cui L-Glutammina: 1,5 g)"},{"componente":"Vitamina B6","valore":"2,8 mg (200% VNR)"}]},"ingredienti":"Glutammina peptide (proteine di FRUMENTO idrolizzate a tenore garantito di L-Glutammina); Stabilizzanti: cellulosa microcristallina, idrossipropilmetilcellulosa; Agenti antiagglomeranti: biossido di silicio, sali di magnesio degli acidi grassi (origine vegetale); Vitamina B6 (piridossina cloridrato)."}', 'Deglutire 5 compresse al giorno con acqua o altro liquido a scelta 30-40 minuti prima degli allenamenti o competizioni, oppure immediatamente dopo. Nelle giornate in cui non si pratica attività sportiva il prodotto può essere assunto in qualsiasi momento della giornata.', NULL, NULL, false, false, false, '2025-08-04 08:59:49.970534', NULL, 'Unico', '200 compresse', '200 compresse');
INSERT INTO public.products VALUES (1207, 'bcaa-8-1-1-peptide', 'BCAA 8:1:1 Peptide', 25, 2, 'Aminoacidi peptidi (pepform) ramificati in formula 8.1.1 da 100 cpr.', 'Integratore alimentare a base di BCAA (L-Leucina, L-isoleucina, L-valina) peptidi Pepform nel rapporto 8.1.1 ( 8 parti di leucina, 1 parte di isoleucina, 1 parte di valina). I Peptidi di bcaa Pepform sono un blend di bcaa ottenuti mediante un processo brevettato che consente di miscelare le forme libere di aminoacidi a catena ramificata ai peptidi isolati. I Bcaa sono i maggiori componenti delle proteine del muscolo. E'' indicato per chi pratica attività fisico-sportiva intensa in quanto il suddetto caso  aumenta il livello  di aminoacidi ramificati disponibili per l''organismo mantenendo un bilancio azotato positivo fornendo quindi un ottima azione energetica  ed anticatabolica se assunto prima dell''allenamento, che di recupero se assunto dopo l''allenamento. La formula dei BCAA 8.1.1 peptidi Pronutrition contiene i peptidi Pepform brevetto internazionale di garanzia e efficacia. Così come esplicato in uno studio sulla Leucina Pepform è valorizzato come la forma peptidica offre notevoli vantaggi nell''assimilazione e nella metabolizzazione dei ramificati e dimostra come l''indice PER (protein efficiency ratio) vede aumentare efficenza di trasformazione proteica.', '{"titolo":"BCAA Peptide 8:1:1","valori_nutrizionali":[{"componente":"BCAA 2:1:1 peptidici","valore":"2000 mg"},{"sottocomponente":"Di cui Leucina","valore":"1000 mg"},{"sottocomponente":"di cui Isoleucina","valore":"500 mg"},{"sottocomponente":"di cui Valina","valore":"500 mg"},{"componente":"L-Leucina","valore":"3000 mg"}],"ingredienti":"Miscela BCAA 8:1:1 (PepForm®: Leucina, Isoleucina, Valina), L-Leucina, Antiagglomeranti: Magnesio stearato o sali di magnesio degli acidi grassi E 470 (b), Mono e digliceridi degli acidi grassi E471, Calcio difosfato E 341 (ii), Cellulosa microcristallina E460"}', 'Si consiglia l''assunzione di 5 cpr al giorno', NULL, NULL, false, false, false, '2025-08-04 08:20:55.56761', 38, 'Unico', NULL, '100 compresse');
INSERT INTO public.products VALUES (924, 'arginina-plus-complex-capsule', 'Arginina+ Complex Capsule', 1, 2, 'Complesso di arginina in capsule per il supporto della vasodilatazione e delle performance atletiche', 'ARGININA+ Complex Capsule è un integratore progettato per sostenere la vasodilatazione e il trasporto di ossigeno e nutrienti ai muscoli, grazie al suo ruolo nella sintesi dell''ossido nitrico (NO). La sua formulazione combina arginina cloridrato, arginina α-chetoglutarato e arginina aspartato, tre forme ad alta biodisponibilità che assicurano un assorbimento ottimale e un effetto sinergico.', '{"titolo":"Arginina+ Complex Capsule","per_porzione":{"descrizione":"Note nutrizionali per 3 capsule","porzione":"3 capsule","valori":[{"componente":"L-arginina cloridrato","valore":"1.800 mg"},{"componente":"L-arginina α-chetoglutarato","valore":"100 mg"},{"componente":"L-arginina L-aspartato","valore":"100 mg"}]},"ingredienti":"niente"}', 'L''arginina è utile sia prima dell''allenamento per favorire il riscaldamento muscolare, sia dopo l''allenamento per il recupero e il metabolismo dell''ammoniaca. Per supporto al riscaldamento muscolare: assumere 3 capsule circa un''ora prima dell''attività fisica. Per recupero post-allenamento: assumere 3-6 capsule dopo lo sforzo (dosaggio varia in base al peso corporeo: 3 capsule per 50-60 kg, aumentando di 2 capsule ogni 10-15 kg).', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Conservare in luogo fresco e asciutto.', 'La combinazione di diverse forme di arginina massimizza la biodisponibilità e l''efficacia, rendendolo un supporto completo per la performance sportiva e il recupero.', false, false, false, '2025-06-26 14:52:33.082292', NULL, NULL, NULL, NULL);
INSERT INTO public.products VALUES (1193, 'ghanabol-active-9', 'Ghanabol Active 9', 25, 2, 'Ghanabol integratore alimentare a base di aminoacidi liberi ed estratti vegetali.', 'Ghanabol è un integratore alimentare per il potenziamento energetico e il miglioramento del recupero muscolare: Gh Anabol unisce l''arginina, l''ornitina, la citrullina, la lisina, la glicina, il triptofano, il gaba, la valeriana e la melatonina che lavorando in sinergia possono favorire la stimolazione dell''ossido nitrico, possono supportare la crescita muscolare, promuovere il benessere psicofisico e contribuiscono a migliorare il riposo notturno. Ottimizza la tua performance e accellera il tuo recupero con la potente combinazione di questi nutrienti. Ideale per sport di endurance e fitness. Gli estratti di Sophora e Valeriana hanno un''azione utile a favorire il rilassamento in caso di stress. La melatonina contribuisce alla riduzione del tempo richiesto per prendere sonno.', '{"titolo":"Ghanabol Active 9","per_porzione":{"descrizione":"Valori nutrizionali per dose","porzione":"5 compresse","valori":[{"componente":"L-arginina HCI","valore":"1800 mg"},{"componente":"L-ornitina alfachetoglutarato","valore":"900 mg"},{"componente":"L-lisina HCl","valore":"350 mg"},{"componente":"L-glicina","valore":"100 mg"},{"componente":"L-triptofano","valore":"300 mg"},{"componente":"Quercetina","valore":"100 mg"},{"componente":"Acido gamma amminobutirrico","valore":"750 mg"},{"componente":"Estratto di Valeriana","valore":"50 mg (di cui acido valerenico: 0,21 mg)"},{"componente":"Melatonina","valore":"1 mg"}]},"ingredienti":"L – arginina HCl; agente di carica: cellulosa microcristallina (E460i); L – ornitina alfachetoglutarato (OKG); acido gamma amminobutirrico (GABA); L – lisina HCl; L – triptofano; agenti antiagglomeranti: sali di magnesio degli acidi grassi (di origine vegetale) (E470b); biossido di silicio (E551); quercetina (Saphora Japonica L.,fiori); L – glicina; L – citrullina DL malato 2:1; e.s. tit. valeriana (Valeriana officinalis L., radice); melatonina."}', 'Assumere 5 compresse al giorno', NULL, NULL, false, false, false, '2025-08-04 08:15:17.643588', NULL, 'Unico', NULL, '90 capsule');
INSERT INTO public.products VALUES (1191, 'creatina-transport-1000', 'Creatina Transport 1000', 25, 2, 'Incrementa le prestazioni fisiche in caso di attività di elevata intensità, energetico formazione ATP. Integratore alimentare a base di creatina con destrosio e Vit B6', 'Integratore alimentare a base di creatina disponibile in polvere e in compresse da 1 grammo con vitamina B6. La creatina è un derivato degli aminoacidi naturalmente prodotto dall''organismo e contenuto in vari alimenti. Trasformata nella sua forma fosforilata è coinvolta nel mantenimento delle riserve energetiche cellulari. La creatina incrementa le prestazioni fisiche in caso di attività ripetitive, di elevata intensità e di breve durata ed è quindi indicata per allenamenti che prevedano serie ripetute di scatti a piedi o in bicletta, di vasche veloci a nuoto, di pesi, di balzi e quant''altro rientri nel paradigma dello sforzo breve, intenso e ripetuto. Nella versione in compresse (Creatina Transport +B6) abbiamo inserito anche la Vitamina B6 che contribuisce alla normale funzione del sistema immunitario ed il detrosio utile per veicolare il trasporto della creatina nel muscolo.', '{"titolo":"Creatina Transport 1000","per_porzione":{"descrizione":"Valori Nutrizionali","porzione":"3 compresse","porzioni_per_confezione":"66","valori":[{"componente":"Valore energetico","valore":"18 Kcal"},{"componente":"Proteine","valore":"-"},{"componente":"Carboidrati","valore":"1,06 g"},{"componente":"Grassi","valore":"0,07 g"},{"componente":"Creatina Monoidrato","valore":"3000 mg"}]},"ingredienti":"Creatina monoidrato, destrosio, cellulosa microcristallina, antiagglomeranti: magnesio stearato, piridossina cloridrato (Vitamina B6)."}', 'Si consiglia di assumere 3 compresse al giorno, da deglutire con acqua.', NULL, NULL, false, false, false, '2025-08-04 08:14:27.490082', NULL, 'Unico', NULL, '200 capsule');
INSERT INTO public.products VALUES (808, 'omega-3-xc-40-20-gold', 'Omega 3-Xc 40/20 Gold', 6, 7, 'Formula concentrata Omega-3 EPA/DHA per massima biodisponibilità', 'OMEGA 3-XC 40/20 GOLD è un integratore alimentare di acidi grassi polinsaturi da olio di pesce EPA/DHA nel rapporto 40% EPA 20% DHA. OMEGA 3-XC 40/20 GOLD contiene una bassa percentuale di acidi grassi saturi. La sua elevata qualità lo rende altamente digeribile e privo di retrogusto mantenendo intatte tutte le sue proprietà benefiche. OMEGA 3-XC 40/20 GOLD contribuisce alla normale funzione cardiaca, cerebrale e visiva e al mantenimento di livelli normali di trigliceridi nel sangue e di una buona pressione sanguigna ad effetto antinfiammatorio, con ricadute sul miglioramento del sistema immunitario.', '{"titolo":"Omega 3-Xc 40/20 Gold","per_porzione":{"descrizione":"Valori nutrizionali per dose massima","porzione":"4 softgel","valori":[{"componente":"Olio di pesce","valore":"4,8 g"},{"componente":"EPA","valore":"1,92 g"},{"componente":"DHA","valore":"0,96 g"}]},"ingredienti":"Olio di PESCE, gelatina (involucro capsula), umettante: glicerolo. Antiossidanti: estratto ricco in tocoferolo."}', 'Modalità d''uso (per la funzionalità cardiaca, cerebrale e visiva): assumere 2 perle al giorno suddivise nell''arco della giornata; Modalità d''uso (per buoni livelli di trigliceridi nel sangue): assumere 3 perle al giorno suddivise nell''arco della giornata; Modalità d''uso (per il mantenimento di una normale pressione sanguigna): assumere 4 perle al giorno suddivise nell''arco della giornata.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Non superare il livello di assunzione giornaliera supplementare di 5 g di combinazione di EPA e DHA. Conservare in luogo fresco e asciutto.', 'Un integratore di Omega-3 di alta qualità, purificato per garantire l''assenza di retrogusto, ideale per supportare la salute cardiaca, cerebrale e visiva, oltre a contribuire al controllo dei trigliceridi e alla pressione sanguigna.', false, false, false, '2025-06-24 15:59:33.777031', NULL, NULL, '90', 'compresse');
INSERT INTO public.products VALUES (968, 'avena-farina-istantanea', 'Avena Farina Istantanea', 11, 8, 'Farina di avena istantanea arricchita con proteine e fibre, ideale per preparare porridge nutrienti e gustosi per colazioni energetiche.', 'La farina di avena istantanea, grazie alle sue proprietà nutrizionali, è un alimento perfetto sia per le persone comuni che per gli sportivi. Può essere utilizzata anche per preparare prodotti da forno in aggiunta o in sostituzione della farina convenzionale oppure in addizione agli shaker proteici. Disponibile in diversi gusti, anche senza glutine.', '{"titolo":"Avena Farina Istantanea","valori_nutrizionali":{"per_100g":{"energia":"1550 kJ / 368 kcal","grassi":"7,6 g","di_cui_acidi_grassi_saturi":"2,5 g","carboidrati":"56 g","di_cui_zuccheri":"1,9 g","fibre":"12 g","di_cui_ß-glucani":"4,0 g","proteine":"13 g","sale":"0,02 g"},"per_porzione":{"energia":"775 kJ / 184 kcal","grassi":"3,8 g","di_cui_acidi_grassi_saturi":"1,3 g","carboidrati":"28 g","di_cui_zuccheri":"1,0 g","fibre":"6,0 g","di_cui_ß-glucani":"2,0 g","proteine":"6,5 g","sale":"0,01 g"}},"ingredienti":"Farina di avena (glutine), aromi, edulcorante (sucralosio)."}', 'Il prodotto può essere utilizzato tal quale, aggiungendo 50 g (due misurini colmi) a 100 ml di acqua, latte oppure yogurt. È possibile variare il quantitativo di liquido per ottenere la densità desiderata. In alternativa può essere utilizzato come ingrediente per preparare un delizioso dessert.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Conservare in luogo fresco e asciutto.', 'La farina d''avena istantanea è un''ottima fonte di carboidrati complessi e fibre, ideale per una colazione energetica o per arricchire shake e ricette, fornendo energia a rilascio lento e un buon senso di sazietà.', false, false, false, '2025-06-27 15:27:48.719796', NULL, NULL, NULL, NULL);
INSERT INTO public.products VALUES (945, 'promeal-protein-snack-38', 'Promeal Protein Snack 38%', 8, 8, 'Snack proteico croccante con 38% di proteine, arricchito con 13 vitamine. Ideale per spuntini sani e gustosi, disponibile nei gusti vaniglia e cioccolato fondente.', 'Promeal® Protein Snacks 38% è uno snack proteico delizioso a basso contenuto di zuccheri, arricchito con proteine e vitamine, che supportano:

Sviluppo della Massa Muscolare: Grazie alle proteine, favorisce la crescita della massa muscolare magra, ideale per chi pratica attività sportiva.
Mantenimento della Massa Magra: Contribuisce a mantenere la massa magra, adatto anche per diete di riduzione del peso sotto controllo medico.
Metabolismo Energetico Normale: Contiene vitamine B1, B2, B6, B12, C e niacina per un metabolismo energetico regolare.
Riduzione di Stanchezza: Le vitamine B2, B6, B12, C e acido folico aiutano a ridurre stanchezza e affaticamento.
Protezione Antiossidante: Vitamine B1, B2, B6, C ed E proteggono le cellule dallo stress ossidativo.
Salute di Pelle e Vista: La vitamina A contribuisce alla salute della pelle e al mantenimento di una vista normale.
Protezione Ossa e Cartilagini: Le vitamine D, K e C supportano la protezione delle ossa e delle cartilagini articolari.', '{"titolo":"Promeal Protein Snack 38%","variante":"16 pezzi","descrizione":"Snack proteico arricchito con proteine e vitamine per la crescita e il mantenimento della massa muscolare, supporto al metabolismo energetico, riduzione di stanchezza e affaticamento, protezione cellulare e supporto alla salute di pelle, vista, ossa e articolazioni.","valori_nutrizionali":{"per_100g":{"valore_energetico":"436 kcal / 1852 kJ","grassi":"22,6 g","di_cui_saturi":"13 g","carboidrati":"28 g","di_cui_zuccheri":"2,7 g","di_cui_polioli":"25,2 g","fibre":"4,8 g","proteine":"38 g","sale":"1,7 g","vitamine":"varie"}},"ingredienti":"cioccolato bianco, proteine di soia, maltodestrine di mais, aroma, vitamina C, magnesio carbonato, olio extravergine di oliva, olio di mais, edulcorante: sucralosio, potassio cloruro, vitamina E, niacina, ferro solfato, calcio D-pantotenato, vitamina A, zinco solfato, vitamina D, vitamina B6, vitamina K, vitamina B1, vitamina B2, acido folico, D-biotina, vitamina B12."}', '6 snacks (2 buste) al giorno, in rapporto al fabbisogno calorico e all’attività fisica.', '<div class="warning-box">
<h4>⚠️ Avvertenze</h4>
<ul>
<li>Non superare la dose giornaliera consigliata</li>
<li>Tenere fuori dalla portata dei bambini</li>
<li>Conservare in luogo fresco e asciutto</li>
<li>Adatto a vegetariani</li>
<li>Può contenere tracce di frutta a guscio</li>
</ul>
</div>', '<div class="expert-tip">
<h4>💡 Consiglio dell''Esperto</h4>
<p>Perfetto come spuntino pre-allenamento 30 minuti prima dell''attività fisica. La combinazione di proteine e vitamine fornisce energia immediata e supporto muscolare prolungato.</p>
</div>', false, false, false, '2025-06-27 14:35:30.249865', NULL, NULL, '40g', '1 snack');
INSERT INTO public.products VALUES (634, 'fruitforce', 'FruitForce', 1, 8, 'Gel energetico naturale con frutta vera, perfetto per sport di resistenza', 'Carbo Fruit Force Bar 30 gr è una Barretta Energetica ricca di Carboidrati Naturali derivati esclusivamente dalla Frutta, perfetta per fornire Energia Prolungata e per sostenere le Prestazioni Sportive più intense.', '{"titolo":"FruitForce","valori_nutrizionali":{"per_porzione":{"porzione":"1 barretta","valore_energetico":"547 kJ / 130 kcal","grassi":"6,3 g","di_cui_acidi_grassi_saturi":"0,7 g","carboidrati":"15 g","di_cui_zuccheri":"12 g","fibre":"1,8 g","proteine":"2,3 g","sale":"0,03 g"}},"ingredienti":"pasta di datteri, uvetta, anacardi 15%, mandorle 15%, pasta di fichi, ananas disidratato 5%, olio vegetale (girasole, colza), concentrato di limone, aroma naturale. Può contenere anidride solforosa, derivati del latte, glutine, soia, arachidi e frutta a guscio. Può contenere frammenti di gusci e noccioli."}', 'Sport: ideale prima o durante allenamenti e gare di resistenza.
Vita quotidiana: ottimo come spuntino sano e saziante in qualsiasi momento della giornata.
Dosi: 1 barretta (30 g) per ogni ora circa di attività fisica intensa o secondo necessità.

', 'Può contenere anidride solforosa, derivati del latte, glutine, soia, arachidi e frutta a guscio. Può contenere frammenti di gusci e noccioli. Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Conservare in luogo fresco e asciutto.', 'Con carboidrati derivati esclusivamente dalla frutta, questa barretta è ideale per un''energia naturale e prolungata, perfetta per gli sportivi che cercano un supporto energetico pulito durante l''attività intensa.', false, false, false, '2025-06-10 05:30:23.330043', NULL, NULL, '30', 'g');
INSERT INTO public.products VALUES (1187, 'arginina-argipower-100-percent', 'Arginina Argipower 100%', 25, 7, 'Arginina Kyowa Quality in polvere aromatizzata ai frutti di bosco.', 'Integratore alimentare a base di purissima arginina Kyowa Quality in polvere aromatizzata ai frutti di bosco. Il prodotto può essere indicato nei casi di ridotto apporto con la dieta di questi nutrienti o di aumento del loro fabbisogno nella dieta dello sportivo. Per questi motivi risulta un prodotto molto richiesto ed utilizzato dagli sportivi di varie discipline. L-arginina è un aminoacido classificato semi essenziale. Le funzioni biologiche della L-arginina potrebbero essere riassunte nei seguenti punti: precursore dell''ossido nitrico, azione antiossidante, detossificazione dei residui azotati (l''arginina partecipa al ciclo dell''urea), precursore della creatina, supporto al sistema immunitario ( l''arginina è coinvolta nella produzione delle cellule del sistema immunitario come i linfociti T), partecipazione alla sintesi delle proteine ( secondo studi l''arginina può essere coinvolta nella produzione delle proteine necessarie per la crescita, il ripristino e il mantenimento dei tessuti muscolari). KyowaQuality and the KQ Logo are trademarks of Kyowa Hakko Bio Co., Ltd.', '{"titolo":"Arginina Argipower 100%","per_porzione":{"descrizione":"Valori nutrizionali per porzione","porzione":"2 grammi","valori":[{"componente":"L-Arginina","valore":"2000 mg"}]},"ingredienti":"L-Arginina (Kyowa Quality®), aroma, acidificante: acido citrico, colorante: polvere di barbabietola, Edulcoranti: acesulfame k e sucralosio."}', 'Assumere 6 compresse al giorno con acqua, preferibilmente a stomaco vuoto.', NULL, NULL, false, false, false, '2025-08-04 07:41:24.546111', 35, 'Unico', '120 compresse', '20 porzioni');
INSERT INTO public.products VALUES (807, 'omega-3-egq', 'Omega 3 Egq', 1, 7, 'Acidi grassi essenziali Omega-3 di alta qualità per cuore e cervello', 'Omega 3 EGQ fornisce acidi grassi essenziali di alta qualità, concentrati grazie a un processo di distillazione molecolare che ne aumenta l''efficacia. Gli Omega-3 EPA e DHA sono fondamentali per il mantenimento della salute cardiovascolare, cerebrale e visiva. Questo integratore rappresenta una scelta ideale per chi cerca un supporto nutrizionale completo, utile anche per migliorare il recupero e le prestazioni sportive.', '{"titolo":"Omega 3 egq","valori_nutrizionali":{"per_dose":{"porzione":"8 capsule","acidi_grassi_poliinsaturi":"3,2 g","di_cui_epa":"1,27 g","di_cui_dha":"0,87 g","vitamina_e":"60 mg (500% VNR)"}},"ingredienti":"olio di pesce (tit. 60% in EPA + DHA), agente di rivestimento: gelatina alimentare, D-alfa-tocoferolo (Vitamina E), agente di resistenza: glicerolo.","nota":"VNR: valore nutritivo di riferimento giornaliero (adulti) ai sensi del Reg. EU n. 1169/2011."}', 'Dosaggio Consigliato: assumere 8 capsule al giorno, preferibilmente durante i pasti principali, accompagnate da un bicchiere d''acqua. Tempistica: ideale per un''assunzione regolare in qualsiasi momento della giornata.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Non superare il livello di assunzione giornaliera supplementare di 5 g di combinazione di EPA e DHA. Conservare in luogo fresco e asciutto.', 'Con un''alta concentrazione di EPA e DHA e l''aggiunta di Vitamina E, questo integratore di Omega-3 è eccellente per supportare la salute cardiovascolare, cerebrale e visiva, oltre a favorire il recupero e le prestazioni sportive.', false, false, false, '2025-06-24 15:59:33.777031', NULL, NULL, '180', 'compresse');
INSERT INTO public.products VALUES (1025, 'glucosamina-condroitina-msm-vitamina-c', 'Glucosamina', 22, 7, 'Integratore alimentare per il benessere articolare con glucosamina, condroitina solfato, MSM e vitamina C per supportare cartilagini e tessuti connettivi.', 'Integratore alimentare per il benessere articolare con glucosamina, condroitina solfato, MSM e vitamina C. La glucosamina è un componente fondamentale della cartilagine articolare. La condroitina solfato è una molecola che fa parte della matrice cartilaginea. L''MSM (metilsulfonilmetano) è una fonte naturale di zolfo organico. La vitamina C contribuisce alla normale formazione del collagene per la normale funzione delle cartilagini e delle ossa. La vitamina C contribuisce inoltre alla protezione delle cellule dallo stress ossidativo.', '{"titolo":"Glucosamina + Condroitina + MSM + Vitamina C","valori_nutrizionali":{"per_porzione":{"porzione":"1 capsula","glucosamina_cloridrato":"500 mg","msm":"300 mg","condroitina_solfato":"180 mg","vitamina_c":"80 mg (100% VNR)"}},"ingredienti":"Glucosamina solfato 2KCl, Metilsulfonilmetano (MSM), Agente di carica: Cellulosa microcristallina; Condroitina solfato, Acido L-ascorbico (Vitamina C), Amido, Agenti antiagglomeranti: Sali di magnesio degli acidi grassi, Biossido di silicio."}', 'Assumere 3 capsule al giorno con acqua durante i pasti principali.', 'Glucosamina cloridrato (da crostacei), MSM (metilsulfonilmetano), agente di carica: cellulosa microcristallina; condroitina solfato, agente di rivestimento: idrossipropilmetilcellulosa; acido L-ascorbico (vitamina C), agenti antiagglomeranti: sali di magnesio degli acidi grassi, biossido di silicio.', NULL, false, false, false, '2025-07-26 07:12:26.306616', NULL, 'Unico', '120 capsule', NULL);
INSERT INTO public.products VALUES (898, 'say-protein-221', 'Soy protein 221', 1, 1, 'Proteine isolate della soia con edulcoranti naturali, ricche di aminoacidi essenziali per il recupero muscolare post-allenamento', 'Soy Protein 221 è un integratore proteico 100% vegetale, ideale per chi segue una dieta vegana o cerca un''alternativa proteica alle fonti animali. Le proteine isolate della soia utilizzate sono altamente purificate, con elevata digeribilità e un valore biologico ottimale per le proteine vegetali. La formulazione è arricchita con un mix di vitamine del gruppo B, vitamina C e vitamina E, che supportano il normale metabolismo energetico e la protezione dallo stress ossidativo.', '{"nome_prodotto":"Say Protein 221","valori_nutrizionali":{"per_porzione":{"descrizione":"Informazioni nutrizionali per porzione:","porzione":"30 g","valori":[{"componente":"Valore energetico","valore":"375 kJ / 110 kcal"},{"componente":"Grassi","valore":"1,3 g"},{"componente":"di cui: Acidi grassi saturi","valore":"0,5 g"},{"componente":"Carboidrati","valore":"0,2 g"},{"componente":"di cui: Zuccheri","valore":"0 g"},{"componente":"Fibre","valore":"0,5 g"},{"componente":"Proteine","valore":"25 g"},{"componente":"Sale","valore":"0,6 g"},{"componente":"Vitamina C","valore":"17 mg (23% VNR)"},{"componente":"Vitamina E","valore":"2,9 mg (25% VNR)"},{"componente":"Tiamina (Vit. B1)","valore":"0,41 mg (38% VNR)"},{"componente":"Riboflavina (Vit. B2)","valore":"0,46 mg (34% VNR)"},{"componente":"Vitamina B6","valore":"0,58 mg (43% VNR)"}]}},"ingredienti":"Proteine del siero del latte isolate per microfiltrazione, cacao in polvere, aromi, edulcoranti: sucralosio, acesulfame K; antiagglomerante: biossido di silicio; piridossina HCl (vit. B6)."}', 'Assumere 30 g di prodotto (circa 1 misurino) in 250-300 ml di acqua, latte vegetale o bevanda preferita, 1 volta al giorno.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Conservare in luogo fresco e asciutto.', 'Perfetto per vegani e sportivi che cercano un''alternativa vegetale di alta qualità. Arricchito con vitamine antiossidanti per supportare il metabolismo energetico.', false, false, false, '2025-06-26 13:51:52.215978', NULL, NULL, NULL, NULL);
INSERT INTO public.products VALUES (940, 'bcaa-1000-b6', 'BCAA 1000+B6', 11, 2, 'Integratore di aminoacidi ramificati BCAA 1000mg con vitamina B6 per il supporto del recupero muscolare', 'BCAA 1000 + B6 è un integratore alimentare che unisce aminoacidi a catena ramificata (BCAA) in rapporto 2:1:1 (L-leucina, L-isoleucina, L-valina) e vitamina B6. I BCAA sono essenziali per gli atleti, poiché l''organismo non può produrli autonomamente e agiscono direttamente sulla muscolatura, bypassando il metabolismo epatico. La vitamina B6 è inclusa per il suo ruolo nel metabolismo energetico, nella sintesi proteica e nella gestione dell''affaticamento, rendendo questo integratore un supporto completo per l''energia e il recupero.', '{"titolo":"BCAA 1000+B6","per_porzione":{"descrizione":"Valori nutrizionali per porzione","valori":[{"componente":"L-leucina","valore":"2500 mg"},{"componente":"L-isoleucina","valore":"1250 mg"},{"componente":"L-valina","valore":"1250 mg"},{"componente":"Vitamina B6","valore":"1,4 mg (100% VNR)"}]},"ingredienti":"BCAA 2:1:1 per fermentazione (L-leucina, L.-isoleucina, L-valina); agente di carica: cellulosa microcristallina, gel di cellulosa; agente antiagglomerante: idrossi-propil-cellulosa; vitamina B6 (cloridrato di piridossina). SENZA GLUTINE."}', 'Si consiglia l''assunzione di massimo 5 compresse al giorno, preferibilmente prima o dopo l''allenamento.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Conservare in luogo fresco e asciutto.', 'I BCAA sono fondamentali per il mantenimento e la crescita muscolare. L''aggiunta di Vitamina B6 ne migliora l''assimilazione e il supporto energetico, rendendoli ideali per gli atleti.', false, false, false, '2025-06-26 15:27:27.964759', NULL, NULL, NULL, NULL);
INSERT INTO public.products VALUES (1031, 'eaa-amminoacidi-essenziali-solubili', 'EAA Amminoacidi Essenziali Solubili', 22, 2, 'EAA - Enhanced Formula - è un integratore avanzato di amminoacidi essenziali arricchito con glutammina, zinco e vitamina B6, ideale per supportare la sintesi proteica, il recupero muscolare e contrastare l''affaticamento.', 'EAA - Enhanced Formula - AMMINOACIDI ESSENZIALI solubili è un integratore di A.A. Essenziali con Glutammina, Zinco e Vitamina B6, formulato per supportare la sintesi proteica, il recupero muscolare e contrastare l''affaticamento. Grazie alla formula evoluta, senza carboidrati e gluten-free, è ideale per atleti di endurance e di forza che desiderano un''integrazione mirata ed efficace. Lo zinco contribuisce alla normale sintesi proteica, mentre la vitamina B6 contribuisce al metabolismo energetico e delle proteine, e alla riduzione della fatica. È Doping Free Tested, altamente solubile e con un piacevole gusto di limone naturale.', '{"titolo":"EAA Amminoacidi Essenziali","porzione":"14 g (2 misurini/scoops)","ingredienti_valori":{"per_100g":{"L-Leucina":"23,81 g","L-Isoleucina":"5,95 g","L-Valina":"5,95 g","L-Lisina":"7,142 g","L-Metionina":"0,53 g","L-Fenilalanina":"1,785 g","L-Treonina":"5 g","L-Istidina":"0,714 g","L-Triptofano":"0,35 g","L-Glutammina":"17,85 g","L-Taurina":"7,142 g","Bromelina":"1,07 g","Papaina":"0,142 g","Citrullina_malato":"5,71 g","Vitamina_C":"714 mg","Vitamina_B1":"7,85 mg","Vitamina_B6":"11,42 mg"},"per_porzione":{"L-Leucina":"3334 mg","L-Isoleucina":"833 mg","L-Valina":"833 mg","L-Lisina":"1000 mg","L-Metionina":"75 mg","L-Fenilalanina":"250 mg","L-Treonina":"700 mg","L-Istidina":"100 mg","L-Triptofano":"50 mg","L-Glutammina":"2500 mg","L-Taurina":"1000 mg","Bromelina":"150 mg","Papaina":"20 mg","Citrullina_malato":"800 mg","Vitamina_C":"100 mg (125% VNR)","Vitamina_B1":"1,10 mg (100% VNR)","Vitamina_B6":"1,60 mg (114% VNR)"}},"ingredienti":"Aminoacidi a catena ramificata BCAA (L-leucina, L-valina, L-isoleucina), maltodestrina, L-lisina cloridrato, aromi, L-glutammina, regolatore di acidità: acido citrico, L-treonina, L-fenilalanina, L-metionina, L-tirosina, L-arginina, L-istidina, L-triptofano, zinco picolinato (zinco), piridossina cloridrato (Vitamina B6), L-cisteina cloridrato, edulcoranti: sucralosio, acesulfame K, caroteni."}', 'Sciogliere 2/3 di misurino (4 g) in circa 200-250 ml di acqua e assumere in base alle esigenze individuali. Ideale per supportare la sintesi proteica e il recupero muscolare. Il prodotto può essere utilizzato per integrare il fabbisogno giornaliero di amminoacidi essenziali, anche se non si pratica attività fisica.', 'Aminoacidi a catena ramificata BCAA (L-leucina, L-valina, L-isoleucina), maltodestrina, L-lisina cloridrato, aromi, L-glutammina, regolatore di acidità: acido citrico; L-treonina, L-fenilalanina, L-metionina, L-tirosina, L-arginina, L-istidina, L-triptofano, zinco picolinato (zinco), piridossina cloridrato (Vitamina B6), L-cisteina cloridrato, edulcoranti: sucralosio, acesulfame K; caroteni.', NULL, false, false, false, '2025-07-26 07:13:53.936883', NULL, 'Limone', '300g', NULL);
INSERT INTO public.products VALUES (822, 'bcaa-liquid-carbo-plus', 'BCAA Liquid Carbo+', 1, 3, 'Aminoacidi ramificati liquidi con carboidrati per energia e recupero immediato durante l''allenamento.', 'BCAA Liquid Carbo+ è un integratore liquido ad azione rapida, formulato per fornire un apporto energetico immediato e sostenuto durante lo sforzo fisico, ridurre la percezione della fatica e supportare la resistenza muscolare. Combina carboidrati a rilascio differenziato (destrosio, fruttosio e maltodestrine per un rilascio graduale di glucosio), aminoacidi ramificati (BCAA), vitamina C, L-carnitina e β-alanina. Include anche caffeina per un ulteriore stimolo.', '{
    "valori_nutrizionali": {
      "dose": "1 dose = 60 ml",
      "tabella": [
        {"nutriente": "Energia", "quantita": "689 kJ / 162 kcal", "vnr": ""},
        {"nutriente": "Grassi", "quantita": "0 g", "vnr": ""},
        {"nutriente": "- di cui saturi", "quantita": "0 g", "vnr": ""},
        {"nutriente": "Carboidrati", "quantita": "39 g", "vnr": ""},
        {"nutriente": "- di cui zuccheri", "quantita": "25 g", "vnr": ""},
        {"nutriente": "Fibre", "quantita": "0 g", "vnr": ""},
        {"nutriente": "Proteine", "quantita": "1 g", "vnr": ""},
        {"nutriente": "Sale", "quantita": "0 g", "vnr": ""},
        {"nutriente": "Vitamina C", "quantita": "105 mg", "vnr": "131%"},
        {"nutriente": "L-leucina", "quantita": "500 mg", "vnr": ""},
        {"nutriente": "L-isoleucina", "quantita": "249 mg", "vnr": ""},
        {"nutriente": "L-valina", "quantita": "249 mg", "vnr": ""},
        {"nutriente": "L-carnitina", "quantita": "246 mg", "vnr": ""},
        {"nutriente": "β-alanina", "quantita": "92 mg", "vnr": ""},
        {"nutriente": "Caffeina", "quantita": "92 mg", "vnr": ""}
      ]
    },
    "ingredienti": "Acqua, maltodestrine 20,5%, fruttosio 16,4%, destrosio 16,4%, L-leucina (Kyowa Quality®), acidificante: acido citrico; L-isoleucina (Kyowa Quality®), L-valina (Kyowa Quality®), L-carnitina tartrato, acido L-ascorbico (vitamina C), conservante: potassio sorbato; caffeina, β-alanina, aroma, edulcoranti: sucralosio, glicosidi steviolici (estratti da foglie di Stevia rebaudiana Bertoni)."
  }', 'Assumere 1 fiala da 30 ml durante l''attività fisica per mantenere livelli energetici costanti e supportare il metabolismo muscolare. Per ottimizzare l''assorbimento, è consigliato diluirlo con una piccola quantità d''acqua.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Conservare in luogo fresco e asciutto.', 'La sua formulazione liquida e la combinazione di carboidrati e aminoacidi lo rendono un energy boost ideale per le sessioni di allenamento più lunghe e intense, aiutando a prevenire la fatica.', false, false, false, '2025-06-24 16:37:11.023413', NULL, NULL, NULL, NULL);
INSERT INTO public.products VALUES (631, 'barrettone-2-0', 'Barrettone 2.0', 1, 8, 'Barretta proteica con 20g di proteine, disponibile in 3 gusti deliziosi', 'Barrettone 2.0 rappresenta l''evoluzione della storica barretta proteica di +Watt. È stata formulata per offrire un prodotto nutriente, ricco di proteine e fibre, con un ridottissimo contenuto di zuccheri. A differenza di molte barrette proteiche, non è ricoperta di cioccolato o glassa, ma mantiene una consistenza morbida con l''aggiunta di fiocchi di soia per una piacevole croccantezza. Il suo profilo nutrizionale la rende perfetta sia per chi pratica sport che per chi cerca uno snack saziante e bilanciato. La presenza di glucoligosaccaridi e frutto-oligosaccaridi contribuisce al benessere intestinale, mentre le proteine del latte garantiscono un elevato valore biologico.', '{"titolo":"Barrettone 2.0","prezzo":"4,30€ per tutti i gusti","valori_nutrizionali":{"per_dose":{"porzione":"1 dose = 70 g","valore_energetico":"926 kJ / 222 kcal","grassi":"8 g","di_cui_acidi_grassi_saturi":"1,5 g","carboidrati":"9 g","di_cui_zuccheri":"1,3 g","polioli":"6 g","fibre":"14 g","proteine":"25 g","sale":"0,12 g"}},"ingredienti":"Proteine del latte, glucoligosaccaridi, stabilizzante: polidestrosio; olio di semi di girasole, umidificanti: maltitolo e sorbitolo; fruttoligosaccaridi, estrusi di soia (proteine di soia, amido di tapioca, sale), pasta di arachidi 5%, granella di arachidi 3%, cioccolato bianco con edulcorante, gelificante: pectina, emulsionanti."}', 'Dopo l''allenamento: aiuta il recupero muscolare e fornisce proteine di alta qualità. Come snack bilanciato: ideale a metà mattina o nel pomeriggio. In diete low sugar: perfetta per chi vuole limitare l''assunzione di zuccheri. Durante giornate impegnative: un''opzione pratica e nutriente per combattere la fame.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Conservare in luogo fresco e asciutto.', 'L''elevato contenuto di proteine e fibre, unito al basso tenore di zuccheri, la rende uno snack altamente funzionale per il recupero e il controllo della fame, adattabile a diverse esigenze dietetiche.', false, false, false, '2025-06-10 05:26:53.129826', NULL, NULL, NULL, NULL);
INSERT INTO public.products VALUES (1313, 'dima-therm', 'Dima Therm', 1, 5, 'DIMA THERM è un integratore con estratti vegetali brevettati per stimolare il metabolismo e supportare la riduzione della massa grassa.', 'Dima Therm è pensato per chi desidera ridurre la massa grassa e sostenere il metabolismo attraverso ingredienti naturali ad azione sinergica. La sua efficacia è supportata da studi clinici e da ingredienti brevettati, con risultati concreti nella diminuzione di peso e circonferenze corporee.', '{"titolo": "Prodotto Termogenico 3", "valori_nutrizionali": {"per_porzione": {"porzione": "2 compresse", "sinetrol_xpur": "900 mg", "fuplex": "922,5 mg", "di_cui_erba_mate": "835 mg", "di_cui_fucus": "72,5 mg", "iodio": "145 µg (97% VNR)", "pepe_nero": "15 mg", "piperina": "14 mg", "caffeina_totale": "56 mg"}}, "ingredienti": "Fuplex® 44% [erba matè (Ilex paraguariensis A. St. Hill, e.s. da foglia, tit. 4% caffeina), fucus (Fucus vesiculosus L., e.s. da tallo, tit. 0,2% iodio), pepe nero (Piper nigrum L., e.s. da frutto, tit. 95% piperina)], Sinetrol®XPur 43%, tit. 2,5% caffeina [pompelmo (Citrus paradisi Macfad, e.s. da frutto), guaranà (Paullinia cupana Kunth, e.s. da semi), arancia rossa (Citrus sinensis (L.) Osbeck, e.s. da frutto), concentrato di arancia rossa, maltodes...Truncated", "nota": "VNR: valore nutritivo di riferimento giornaliero (adulti) ai sensi del Reg. EU n. 1169/2011"}', 'Assumere 2 compresse al giorno, preferibilmente al mattino e/o a pranzo, accompagnate da un bicchiere d''acqua. Si consiglia di impiegare il prodotto nell''ambito di una dieta ipocalorica e di uno stile di vita sano.', NULL, NULL, false, false, false, '2025-08-28 13:49:04.984331', NULL, 'Unico', NULL, NULL);
INSERT INTO public.products VALUES (1312, 'weight-control-new-formula', 'Weight Control New Formula', 1, 5, 'Integratore alimentare a base di Sinetrol®XPur, Coleus, Ananas, Equiseto e Gymnema.', 'WEIGHT CONTROL NEW FORMULA è un integratore alimentare a base di estratti vegetali studiato per essere un supporto in programmi di controllo del peso, da associare a una dieta bilanciata e a un corretto stile di vita.', '{"titolo":"Prodotto Termogenico 2","valori_nutrizionali":{"per_porzione":{"porzione":"3 capsule","coleus":"480 mg","sinetrol_xpur":"210 mg","di_cui_pompelmo":"94,5 mg","di_cui_guarana":"21 mg","di_cui_arancia_dolce":"21 mg","gymnema":"150 mg","ananas":"60 mg","equiseto":"60 mg","caffeina_totale":"35 mg"}},"ingredienti":"coleus (Plectrantus barbatus Andrews e.s. da radice, tit. 20% foskholina), capsula (agente di rivestimento: idrossi-propil-metilcellulosa; stabilizzante: gomma di gellano), 21% Sinetrol®XPur tit. 2,5% caffeina [pompelmo (Citrus paradisi Macfad, e.s. da frutto), guaranà (Paullinia cupana Kunth, e.s. da semi), arancia dolce (Citrus sinensis (L.) Osbeck, e.s. da frutto), concentrato di arancia rossa, maltodestrina], amido di mais, gymnema (Gymnema sylvestre (Retz) R.Br e.s. da foglia, tit. 25% acido gymnemico), ananas (Ananas comosus (L.) Merr e.s. da gambo, tit. 0,3% bromelina), equiseto (Equisetum arvense L. e.s. da parti aeree, tit. 2,5% silicio), caffeina, agente antiagglomerante: biossido di silicio."}', 'Dosi consigliate: si consiglia l''assunzione di 3 capsule al giorno con un bicchiere d''acqua.', NULL, NULL, false, false, false, '2025-08-28 13:48:50.944911', NULL, 'Unico', NULL, NULL);
INSERT INTO public.products VALUES (1525, 't-shirt-ethcisport-limited-edition', 'T-Shirt EthicSport Limited Edition S', 22, 6, 'Esclusiva T-Shirt EthicSport in cotone di elevata qualità, taglia S.', 'Esclusiva T-Shirt EthicSport Limited Edition realizzata in cotone di elevata qualità. Design caratterizzato da colorazioni bianche e arancioni distintive con logo EthicSport ben visibile sul fronte. T-shirt dal taglio moderno e confortevole, perfetta per allenamenti, tempo libero e per mostrare il proprio stile sportivo. Tessuto traspirante e resistente che garantisce comfort durante qualsiasi attività. Prodotto in edizione limitata per veri appassionati del marchio EthicSport.', NULL, 'Si consiglia il lavaggio in lavatrice a 30°C. Non stirare direttamente sul logo.', NULL, NULL, false, false, false, '2025-09-02 14:52:48.297902', 134, 'Unico', 'S', NULL);
INSERT INTO public.products VALUES (1314, 'kal-redux-+', 'Kal Redux+', 6, 5, 'KALREDUX+ è un integratore in compresse di tirosina, teanina, vitaminaB12 ed estratti vegetali titolati quali: citrus aurantium, salice bianco, gymnema, berberis, sambuco, caffè verde, zenzero.', 'Il controllo del senso di fame riveste particolare importanza nel caso di diete ipocaloriche così come nei cambiamenti e ribilanciamenti delle proprie abitudini alimentari. Il senso di fame e la mancanza di sazietà possono insorgere non solo nei casi già descritti ma anche a causa di diversi fattori negativi come stress, mancanza di sonno, alimentazione sbilanciata. Per questo Premier ha messo a punto KAL REDUX + un integratore a base di estratti di erbe funzionali sia all''aumento del metabolismo degli zuccheri e dei grassi, che sono più velocemente trasformati in energia, sia alla diminuzione del senso di fame ansiosa dovuta a situazioni di stress.', '{"titolo": "Integratore Termogenico 4", "valori_nutrizionali": {"per_porzione": {"porzione": "3 compresse", "citrus_aurantium": "400 mg", "salice_bianco": "200 mg", "gymnema": "140 mg", "berberis": "240 mg", "sambuco": "80 mg", "zenzero": "160 mg", "tirosina": "300 mg", "caffè_verde": "400 mg", "teanina": "100 mg", "vitamina_b12": "25 mcg (1000% VNR)"}}, "ingredienti": "Citrus aurantium(Citrus aurantium L.var, amara frutto immaturo e. s. 6 % Sinefrina), Caffe Verde (Coffea Arabica L. semi e. s. 45% acidi clorogenici), agente di carica: Calcio difosfato; addensante: Cellulosa microcristallina; L-Tirosina, Gymnema (Gymnema silvestre R.BR. foglie e.s. 25% acido Gimnemico), Berberis (Berberis aristata DC. corteccia e rami e. s. 65% Berberina), Salice bianco(salix alba corteccia e. s. 3% salicilina), Antiagglomeranti; Magnesio s...Truncated", "nota": "VNR = Valori nutritivi di riferimento"}', 'Assumere fino a 3 compresse al giorno con acqua.', NULL, NULL, false, false, false, '2025-08-28 13:50:30.099029', NULL, 'Unico', NULL, NULL);
INSERT INTO public.products VALUES (1315, 'hard-stack-red-hot', 'Hard Stack Red Hot', 6, 5, 'HARD STACK RED HOT è un integratore alimentare in compresse di estratti di Citrus e Guaranà standardizzati (Sinetrol® Xpur), Capsicum Annuum titolato 2% in capsacinoidi (Capsimax®), Piper nigrum L. standardizzato al 95% in paperina (BioPerine®), Acetyl L-Carnitina, Vitamina D3, Niacina, Vitamine B1-B2-B5-B6-B12.', 'HARD STACK RED HOT è un integratore di estratti vegetali che aiuta a indurre la termogenesi, gestire l''appetito e a supportare il metabolismo per bruciare calorie grazie ad un bilanciato mix di Sinetrol® Xpur, estratto di agrumi e guaranà, Capsimax® estratto naturale ricco in capsicinoidi, BioPerine® estratto standardizzato di piper nigrum al 95% in piperina, Acetyl-L-Carnitina con un elevato contenuto di vitamine, quali: Vitamina D3, Niac...Truncated', '{"titolo": "Integratore Termogenico 5", "valori_nutrizionali": {"per_porzione": {"porzione": "2 compresse", "sinetrol": "900 mg", "di_cui_citrus_paradisi_L": "450 mg", "citrus_sinesis_L": "45 mg", "guarana": "90 mg", "caffeina": "22,5 mg", "acetyl_l_carnitina": "500 mg", "di_cui_l_carnitina": "325 mg", "capsimax": "150 mg", "bioperine": "15 mg", "niacina": "24 mg (150% VNR)", "vitamina_b1": "5 mg (455% VNR)", "vitamina_b5": "6 mg (100% VNR)", "vitamina_b6": "5 mg (357% VNR)", "vitamina_b12": "25 mcg (1000% VNR)", "vitamina_d3": "50 mcg (1000% VNR)"}}, "ingredienti": "Sinetrol® Xpur (Citrus Paradisi Macfad e.s. frutto, Citrus Sinensis (L.) Osbeck e.s. frutto, Paullinia cupana kunth e.s. semi, maltodestrina da mais), Acetyl-L-Carnitina, agente di carica: cellulosa microcristallina; Capsimax® (Capsicum Annuum var. Longum Sendtn e.s. frutto 2% Capsicinoidi), agenti antiagglomeranti: Sali di magnesio degli acidi grassi, polivinilpirrolidone, biossido di silicio; BioPerine® (Piper nigrum L. e.s. frutto 95% in paperina) Niacina (Vitamina B3), Acido Pantotenico (Vitamina B5), Cloridrato di Piridossina (Vitamina B6), Cloridrato di Tiamina (Vitamina B1), Riboflavina (vitamina B12), Colecalciferolo (vitamina D3), Cianocobalamina (Vitamina B12).", "nota": "VNR = valore nutrizionale di riferimento"}', 'Assumere 2 compresse al giorno con acqua suddivise nell''arco della giornata dopo i pasti principali o prima dell''attività fisica.', NULL, NULL, false, false, false, '2025-08-28 13:50:30.099029', NULL, 'Unico', NULL, NULL);
INSERT INTO public.products VALUES (1316, 'hard-acetyl-1000', 'Hard Acetyl 1000', 6, 5, 'HARD ACETYL 1000 è un integratore alimentare di Acetyl-L-Carnitina con Vitamine del gruppo B, Vitamina C, Vitamina E, Zinco e Magnesio.', 'HARD ACETYL 1000 è un integratore alimentare di Acetyl-L-Carnitina con vitamine del gruppo B, vitamina C, vitamina E, zinco e magnesio. La L-Carnitina permette di veicolare gli acidi grassi nelle sedi deputate alla loro utilizzazione metabolica, favorendo la produzione di energia per le cellule, preservando la massa magra e le energie per incrementare le prestazioni. La Acetyl-L-Carnitina è una sostanza naturalmente presente nei muscoli e nel cervello ed è un ottimo alleato nel controllo del peso. HARD ACETYL 1000 è potenziato in maniera significativa dalla presenza di tutte le vitamine del gruppo B, vitamina C, vitamina E e minerali, quali zinco e magnesio.', '{"titolo": "Integratore Carnitina e Vitamine", "valori_nutrizionali": {"per_porzione": {"porzione": "2 compresse", "valore_energetico": "0 kcal / 0 kj", "acetyl_l_carnitina": "2 g", "di_cui_l_carnitina": "1 g", "magnesio_ossido": "180 mg", "di_cui_magnesio": "25,92 mg (29% VNR)", "zinco_ossido": "9 mg", "di_cui_zinco": "3,24 mg (72% VNR)", "vitamina_b1": "0,66 mg (60% VNR)", "vitamina_b2": "0,84 mg (60% VNR)", "vitamina_b3": "9,6 mg (60% VNR)", "vitamina_b6": "0,84 mg (60% VNR)", "vitamina_b12": "1,6 mcg (60% VNR)", "vitamina_c": "48 mg (60% VNR)", "vitamina_e": "7,2 mg (60% VNR)"}}, "ingredienti": "Acetyl-L-Carnitina, Cellulosa Microcristallina, Polivinilpirrolidone, Magnesio Ossido, Vitamina C (Acido Ascorbico), Vitamina B3 (Niacina), Zinco ossido, Vitamina E (Alfa tocoferolo Acetato), Vitamina B2 (Riboflavina), Vitamina B6 (Piridossina), Vitamina B1 (Tiamina), Vitamina B12 (Cianocobalamina); Antiagglomeranti: Biossido di Silicio, Magnesio Stearato Vegetale.", "nota": "VNR = valore nutrizionale di riferimento"}', 'assumere 2 compresse al giorno. CONSIGLI D''USO: chiudere accuratamente il barattolo dopo l''uso e mantenere il prodotto in luogo fresco e asciutto.', NULL, NULL, false, false, false, '2025-08-28 13:50:30.099029', NULL, 'Unico', NULL, NULL);
INSERT INTO public.products VALUES (1319, 'lipoic-1000', 'Lipoic 1000', 11, 5, 'La formula unica di Lipoic 1000 è la spinta extra che potenzia la tua energia durante l''allenamento', 'La formula unica di Lipoic 1000 è la spinta extra che potenzia la tua energia durante l''allenamento, garantendo un''efficienza metabolica superiore per affrontare qualsiasi sfida sportiva. L''estratto di cannella, supporta il metabolismo dei carboidrati, fornendo un flusso costante di energia. L''acido alfa lipoico agisce come un potente catalizzatore, sostenendo la conversione ottimale degli zuccheri in carburante. Il cromo completa questa sinergia, contribuendo al normale metabolismo dei macronutrienti e mantenendo nella norma i livelli di glucosio del sangue.', '{"titolo": "Integratore Acido Alfa Lipoico e Cromo", "valori_nutrizionali": {"per_porzione": {"acido_alfa_lipoico": "1000 mg", "cannella_plv": "400 mg", "cromo": "200 µg (500% VNR)"}}, "ingredienti": "acido alfa lipoico; agenti di carica: cellulosa microcristallina, fosfati di calcio; cannella in polvere (Cinnamomum verum J. Presl, corteccia); agenti antiagglomeranti: sali di magnesio degli acidi grassi, biossido di silicio; picolinato di cromo. SENZA GLUTINE.", "nota": "*VNR: Valori Nutritivi di Riferimento"}', NULL, NULL, NULL, false, false, false, '2025-08-28 13:52:19.16386', NULL, 'Unico', NULL, NULL);
INSERT INTO public.products VALUES (1320, 'thermo-caffeine', 'Thermo Caffeine', 11, 5, 'Thermo Caffeine, aiuta ad accelerare il metabolismo dei grassi presenti nel tessuto adiposo, trasformandoli in energia utilizzabile per sostenere le tue attività quotidiane e i tuoi allenamenti intensi.', 'Sappiamo tutti quanto sia importante seguire una dieta equilibrata e praticare regolarmente attività fisica per mantenere uno stato di salute ottimale. Tuttavia, ci sono momenti in cui la natura ostinata delle adiposità localizzate rende difficile raggiungere i risultati desiderati. È qui che entra in gioco Thermo Caffeine, un prezioso alleato per coloro che cercano di raggiungere forma e definizione. Con una combinazione mirata di estratti vegetali, acido lipoico, caffeina e cromo, questo integratore alimentare è progettato per ottimizzare il tuo metabolismo, consentendoti di ottenere il massimo dai tuoi sforzi. Grazie alla sua formula avanzata, ricca di principi attivi coinvolti nel metabolismo dei macronutrienti, Thermo Caffeine, aiuta ad accelerare il metabolismo dei grassi presenti nel tessuto adiposo, trasformandoli in energia utilizzabile per sostenere le tue attività quotidiane e i tuoi allenamenti intensi. Perfetto per chi segue una dieta o si allena per ottenere una definizione muscolare impeccabile. Contiene caffeina, un aiuto in più per accelerare il metabolismo.', '{"titolo": "Integratore Termogenico 6", "valori_nutrizionali": {"per_porzione": {"gymnema_e_s": "450 mg", "da_cui_acido_gymnemico": "112,5 mg", "guarana_e_s": "250 mg", "da_cui_caffeina": "25 mg", "mate_e_s": "200 mg", "da_cui_caffeina_mate": "8,0 mg", "caffeina_totale": "200 mg", "taurina": "250 mg", "n_acetil_l_tirosina": "200 mg", "schisandra_e_s": "150 mg", "da_cui_schisandrina": "1,5 mg", "ginkgo_e_s": "50 mg", "da_cui_ginkgoflavonoidi_glicosidici": "12 mg", "da_cui_lattoni_terpenici_totali": "3,0 mg", "acido_alfa_lipoico": "50 mg", "cromo": "200 µg (500% VNR)"}}, "ingredienti": "agente di carica: cellulosa microcristallina, gel di cellulosa; gymnema (Gymnema sylvestre (Retz.) R. Br) foglie e.s. tit* 25% in acido gymnemico; guaranà (Paullinia cupana Kunth) semi e.s. tit.* 10% in caffeina; taurina; matè (Ilex paraguariensis A. St.-Hil.) foglie e.s. tit.* 4% in caffeina; N-acetil L-tirosina; caffeina; schisandra (Schisandra chinensis (Turcz.) Baill.) frutti e.s. tit.* 1% in schisandrina; gingko (Ginkgo biloba L.) foglie e.s. tit.* 24% in ginkgoflavonoidi glicosidici e 6% in lattoni terpenici totali; acido alfa lipoico; agenti antiagglomeranti: polivinilpirrolidone, biossido di silicio, sali di magnesio degli acidi grassi; picolinato di cromo. *e.s. tit. = estratto secco titolato. SENZA GLUTINE.", "nota": "*VNR: Valori Nutritivi di Riferimento"}', NULL, NULL, NULL, false, false, false, '2025-08-28 13:52:19.16386', NULL, 'Unico', NULL, NULL);
INSERT INTO public.products VALUES (1321, 'thermo-no-caffeine', 'Thermo NO Caffeine', 11, 5, 'Thermo No Caffeine aiuta ad accelerare il metabolismo dei grassi presenti nel tessuto adiposo, trasformandoli in energia utilizzabile per sostenere le tue attività quotidiane e i tuoi allenamenti intensi.', 'Sappiamo tutti quanto sia importante seguire una dieta equilibrata e praticare regolarmente attività fisica per mantenere uno stato di salute ottimale. Tuttavia, ci sono momenti in cui la natura ostinata delle adiposità localizzate rende difficile raggiungere i risultati desiderati. È qui che entra in gioco Thermo No Caffeine, un prezioso alleato per coloro che cercano di raggiungere forma e definizione. Con una combinazione mirata di estratti vegetali, carnitina, acido alfa lipoico e cromo, questo integratore alimentare è progettato per ottimizzare il tuo metabolismo, consentendoti di ottenere il massimo dai tuoi sforzi. Grazie alla sua formula avanzata, ricca di principi attivi coinvolti nel metabolismo dei macronutrienti, Thermo No Caffeine aiuta ad accelerare il metabolismo dei grassi presenti nel tessuto adiposo, trasformandoli in energia utilizzabile per sostenere le tue attività quotidiane e i tuoi allenamenti intensi. Perfetto per chi segue una dieta o si allena per ottenere una definizione muscolare impeccabile.', '{"titolo": "Integratore Termogenico 7", "valori_nutrizionali": {"per_porzione": {"l_carnitina": "150 mg", "gymnema_e_s": "150 mg", "da_cui_acido_gymnemico": "37,5 mg", "alghe_brune_e_s": "150 mg", "da_cui_fucus_vesiculosus_e_s": "120 mg", "da_cui_ascophyllum_nodosum_e_s": "30 mg", "da_cui_iodio": "150 µg (100% VNR)", "tè_verde_decaffeinato_e_s": "100 mg", "da_cui_catechine": "75 mg", "da_cui_egcg": "45 mg", "salice_bianco_e_s": "100 mg", "da_cui_salicina": "15 mg", "betulla_e_s": "100 mg", "da_cui_flavonoidi": "1,0 mg", "ginkgo_e_s": "25 mg", "da_cui_ginkgoflavonoidi_glicosidici": "6,0 mg", "da_cui_lattoni_terpenici_totali": "1,5 mg", "acido_alfa_lipoico": "25 mg", "cromo": "200 µg (500% VNR)"}}, "ingredienti": "agente di carica: cellulosa microcristallina, gel di cellulosa; L-carnitina cloridrato (HCL); gymnema (Gymnema sylvestre (Retz) R.Br.) foglie e.s. tit.* 25% in acido gymnemico; estratto secco di alga bruna standardizzato 0,1% in iodio (Fucus vesiculosus L. tallo, Ascophyllum nodosum (L.) Le Jolis tallo, ioduro di potassio); tè verde decaffeinato (Camellia sinensis (L.) Kuntze) foglie e.s. tit.* 75% in catechine e 45% in epitgallocatechina-3-gallato (EGCG); salice bianco (Salix alba L.) corteccia e.s. tit.* 15% in salicina; betulla (Betula pendula Roth, Betula pubescens Ehrh.) foglie e.s. tit.* 1% in flavonoidi; ginkgo (Ginkgo biloba L.) foglie e.s. tit.* 24% in ginkgoflavonoidi glicosidici e 6% in lattoni terpenici totali; acido alfa lipoico; agenti antiagglomeranti: polivinilpirrolidone, biossido di silicio, sali di magnesio degli acidi grassi; picolinato di cromo. *e.s. tit. = estratto secco titolato. SENZA GLUTINE.", "nota": "*VNR: Valori Nutritivi di Riferimento"}', NULL, NULL, NULL, false, false, false, '2025-08-28 13:52:19.16386', NULL, 'Unico', NULL, NULL);
INSERT INTO public.products VALUES (1311, 'stack-fire-boost', 'Stack Fire Boost', 1, 5, 'Stack Fire Boost è un integratore formulato per supportare il metabolismo e favorire la riduzione della massa grassa,', 'Integratore alimentare a base di Sinetrol®XPur, aXivite®, estratti vegetali con vitamina C, vitamina E, caffeina, L-carnitina e berberina. Contiene caffeina (200 mg / dose giornaliera). Non raccomandato per i bambini e le donne durante la gravidanza e l''allattamento. Stack Fire Boost è un integratore formulato per supportare il metabolismo e favorire la riduzione della massa grassa, specialmente se combinato con una dieta ipocalorica e attività fisica regolare. La sua composizione sfrutta meccanismi d''azione sinergici per offrirti un valido supporto nel percorso di controllo del peso.', '{"valori_nutrizionali":{"per_porzione":{"porzione":"2 capsule","caffeina_totale":"200 mg","arancio_amaro":"200 mg","di_cui_sinefrina":"12 mg","cacao":"184 mg","caffè_verde":"100 mg","l_carnitina":"100 mg","berberis_aristata":"100 mg","di_cui_berberina_hcl":"97 mg","sinetrol_xpur":"100 mg","di_cui_pompelmo":"45 mg","di_cui_guarana":"10 mg","di_cui_arancia_rossa":"10 mg","alga_bruna":"60 mg","di_cui_iodio":"120 µg (80% VNR)","axivite":"60 mg","di_cui_fenilcapsaicina":"0,6 mg","piperina":"40 mg","vitamina_c":"80 mg (100% VNR)","vitamina_e":"12 mg (100% VNR)"}},"ingredienti":"capsula vegetale (agente di rivestimento: idrossi-propil-metilcellulosa; stabilizzante: gomma di gellano), arancio amaro (Citrus aurantium var. amara L.) e.s. da frutto immaturo tit. 6% sinefrina e octopamina <0,75%), caffeina, cacao (Theobroma cacao L.) e.s. da semi tit. 6% teobromina e 1,5% caffeina, caffè verde (Coffea arabica L.) e.s. da semi tit. 45% in flavonoidi tot. espressi in ac. clorogenico, L-carnitina-L-tartrato, Berberina HCl (da Berberis aris","nota":"VNR: valore nutritivo di riferimento giornaliero (adulti) ai sensi del Reg. EU n. 1169/2011"}', 'SPORT: Stack Fire Boost è ideale per sportivi che intendono ridurre la massa grassa e raggiungere il proprio peso forma ottimale, combinando l''assunzione con attività fisica costante e diete ipocaloriche adeguate. Dosi consigliate: Assumere 2 capsule al giorno, accompagnate da un bicchiere d''acqua. VITA QUOTIDIANA: Ottimo per chi segue una dieta ipocalorica dimagrante e cerca un supporto per favorire il metabolismo e il controllo del peso corporeo nella vita di tutti i giorni. Dosi consigliate: Assumere 2 capsule al giorno, accompagnate da un bicchiere d''acqua.', NULL, NULL, false, false, false, '2025-08-28 13:48:23.091652', NULL, 'Unico', NULL, NULL);
INSERT INTO public.products VALUES (799, 'hard-dren-1000', 'Hard Dren 1000', 6, 5, 'Estratto vegetale drenante per purificare lorganismo naturalmente', 'HARD DREN 1000 è un integratore alimentare in compresse di estratti vegetali per migliorare il drenaggio dei liquidi corporei con funzioni depurative dell''organismo. HARD DREN 1000 sfrutta le preziose proprietà della Linfa di Betulla per contrastare adiposità e ristagno dei liquidi; della Pilosella dall''azione diuretica e drenante; dell''Orthosiphon o Tè di Giava ideale come depurativo e snellente; del Finocchio per l''effetto digestivo e carminativo e l''apporto di minerali; del Tarassaco per stimolare le funzionalità biliare, epatica e renale e della Verga d''oro per favorire la diuresi e per le sue proprietà astringenti e antinfiammatorie. HARD DREN è inoltre arricchito con Potassio e Magnesio, per il mantenimento dell''equilibrio salino, e Vitamine B6 e B3.', '{
    "valori_nutrizionali": {
      "dose": "PER DOSE (2 COMPRESSE)",
      "tabella": [
        {"componente": "VALORE ENERGETICO", "quantita": "0 kcal / 0 kj", "vnr": ""},
        {"componente": "Pilosella", "quantita": "333 mg", "vnr": "-"},
        {"componente": "Betulla", "quantita": "333 mg", "vnr": "-"},
        {"componente": "Verga d''oro", "quantita": "333 mg", "vnr": "-"},
        {"componente": "Ortosifon", "quantita": "333 mg", "vnr": "-"},
        {"componente": "Finocchio", "quantita": "333 mg", "vnr": "-"},
        {"componente": "Tarassaco", "quantita": "333 mg", "vnr": "-"},
        {"componente": "Potassio", "quantita": "100 mg", "vnr": "-"},
        {"componente": "Magnesio", "quantita": "56,24 mg", "vnr": "15"},
        {"componente": "Vitamina B6", "quantita": "0,84 mg", "vnr": "60"},
        {"componente": "Vitamina B3", "quantita": "9,6 mg", "vnr": "60"}
      ]
    },
    "ingredienti": "Betulla Foglia (Betula Pendula Roth e.s. 2.5% Iperoside), Pilosella Erba (Hieracium Pilosella L. e.s. 1% Vitexina), Orthosiphon Foglia (Ortosiphon Stamineus Benth e.s. 0,1% in Sinensetina), Finocchio Frutti Polvere (Faeniculum Vulgare Mill. e.s. ¼), Tarassaco Radice Polvere (Taraxacum Officinale Weber e.s. ¼), Verga D''oro Sommità Fiorite Polvere (Solidago Virga-Aurea L. e.s. ¼), Potassio Cloruro, Magnesio Carbonato, Vitamina B3 (Niacina), Vitamina B6 (Piridossina)."
  }', 'Assumere 2 compresse al giorno con acqua. CONSIGLI D''USO: chiudere accuratamente il barattolo dopo l''uso e mantenere il prodotto in luogo fresco e asciutto.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Consultare il medico in caso di gravidanza o allattamento. Non utilizzare per periodi prolungati senza consultare il medico. Conservare in luogo fresco e asciutto.', 'Un drenante completo con una sinergia di estratti vegetali ad azione depurativa e diuretica, arricchito con minerali e vitamine per supportare l''equilibrio salino. Ideale per contrastare il ristagno dei liquidi e favorire la detossificazione.', false, false, false, '2025-06-24 15:59:33.777031', NULL, NULL, '60', 'compresse');
INSERT INTO public.products VALUES (1322, 'cla-1000-why-sport', 'CLA 1000', 11, 5, 'Integratore di acido linoleico coniugato ad alta concentrazione per il controllo del peso corporeo e il sostegno della massa magra.', 'CLA 1000 di WHY Sport fornisce acido linoleico coniugato di alta qualità in capsule e perle facili da assumere. Il CLA è un acido grasso essenziale che supporta la gestione del peso corporeo, favorisce il mantenimento della massa magra e possiede proprietà antiossidanti. Formulato per atleti e persone attive che desiderano ottimizzare la composizione corporea.', '{"titolo":"Integratore CLA","valori_nutrizionali":{"per_porzione":{"acido_linoleico_coniugato":"2,4 g","di_cui_cis_9_trans_11":"1,2 g","di_cui_trans_10_cis_12":"1,2 g"}},"ingredienti":"CLA- acido linoleico coniugato 80% da olio vegetale di cartamo (Carthamus tinctorius L., semi); gelatina; agente di resistenza: glicerolo. SENZA GLUTINE.","nota":"*VNR: Valori Nutritivi di Riferimento"}', 'Assumere 1-2 capsule 2 volte al giorno prima dei pasti principali.', 'Non superare la dose giornaliera consigliata. Tenere fuori dalla portata dei bambini. Gli integratori non sostituiscono una dieta variata ed equilibrata.', NULL, false, false, false, '2025-08-28 14:25:08.234192', NULL, 'Unico', NULL, NULL);
INSERT INTO public.products VALUES (1014, 'thermo-master', 'Thermo Master', 22, 5, 'ThermoMaster® combina 10 attivi sinergici per supportare il metabolismo. Favorisce il controllo del peso durante regimi ipocalorici.', 'Integratore alimentare che può risultare un utile complemento nell''ambito di diete ipocaloriche rivolte al controllo e alla riduzione del peso². Il tè verde favorisce l''equilibrio del peso corporeo² e il drenaggio dei liquidi⁴, mentre il ginseng supporta il metabolismo dei carboidrati³ e aiuta a contrastare la stanchezza fisica e mentale5. Il cromo contribuisce al mantenimento di normali livelli di glucosio nel sangue e il green coffee offre un sostegno al metabolismo¹. Il prodotto contiene un elevato tenore di caffeina (200 mg/dose).', '["<table class=\"nutritional-table\">\n      <thead><tr><th>Componente</th><th>Per dose</th></tr></thead>\n      <tbody>\n        <tr><td>L-tirosina</td><td>600 mg</td></tr>\n        <tr><td>L-carnitina tartrato</td><td>400 mg</td></tr>\n        <tr><td>- Di cui l-carnitina</td><td>272 mg</td></tr>\n        <tr><td>Estratto di caffè verde</td><td>300 mg</td></tr>\n        <tr><td>Tè verde estratto secco</td><td>250 mg</td></tr>\n        <tr><td>Estratto di radice di zenzero</td><td>150 mg</td></tr>\n        <tr><td>Caffeina anidra</td><td>100 mg</td></tr>\n        <tr><td>Estratto di semi di mango africano</td><td>100 mg</td></tr>\n        <tr><td>Estratto di radice di panax ginseng</td><td>100 mg</td></tr>\n        <tr><td>Estratto di frutto di pepe nero</td><td>5 mg</td></tr>\n        <tr><td>Cromo</td><td>40 μg (100% NRV)</td></tr>\n      </tbody>\n    </table>"]', 'Assumere 3 capsule al giorno, preferibilmente al mattino o circa 2 ore prima dell''attività fisica', 'L-Tirosina, agente di carica: idrossipropilmetilcellulosa; L-Carnitina tartrato, estratto di chicchi di caffè verde (coffea Arabica L.) - 50% acido clorogenico e 5% caffeina, estratto di foglie di tè verde (camellia sinensis (L.) Kuntze) - 50% polifenoli, estratto di radice di zenzero (zingiber officinale rosc.) - 5% gingeroli, Caffeina anidra, estratto di semi di mango africano (irvingia gabonensis L.) Der 10:1, estratto di radice di ginseng (panax ginseng ca mey.) - 20% ginsenosidi, agente antiagglomerante: biossido di silicio; Estratto di frutto di pepe nero (piper nigrum L.) - 95% piperina, picolinato di cromo (cromo).', NULL, false, false, false, '2025-07-25 22:58:30.94187', NULL, 'Unico', '90 capsule', NULL);
INSERT INTO public.products VALUES (1228, 'lipoic-800-crom', 'Lipoic 800 Crom', 25, 5, 'Il prodotto contiene per ogni porzione Acido Lipoico 800 mg, estratto secco di corteccia di cannella 400 mg e cromo 200 mcg.', 'Il prodotto contiene per ogni porzione Acido Lipoico 800 mg, estratto secco di corteccia di cannella 400 mg e cromo 200 mcg.L''acido alfa lipoico (ALA) favorisce i processi metabolici coinvolti nella produzione energetica nella cellula convertendo glucosio ed acidi grassi in ATP svolgendo così azione energetica, antiossidante e dimagrante. La corteccia di cannella possiede azione antiossidante, favorisce la funzione digestiva e sostiene il fisiologico metabolismo dei carboidrati. Il CROMO è un minerale molto importante per l''organismo in quanto interviene positivamente sul metabolismo dei macronutrienti (carboidrati e grassi) favorendone il catabolismo a scopo energetico e contrastando il loro deposito. Nella moderna alimentazione una integrazione con il cromo è molto indicata in quanto i cibi eccessivamente raffinati che si trovano sul mercato non ne contengono la giusta quantità.Per tutti questi motivi il prodotto oltre a svolgere azione antiossidante, energetica e di controllo sui livelli di glucosio nel sangue può favorire un minore accumulo di tessuto adiposo nell''organismo. L''acido lipoico utilizzato è ricavato dal mais e contiene il 50% di isomero R ed il 50% di isomero S.', '{
    "nutritional_table": {
      "title": "Valori Nutrizionali",
      "serving_size": "2 compresse",
      "servings_per_container": "30",
      "values": [
        {"nutrient": "Acido Alfa Lipoico", "amount": "800", "unit": "mg", "daily_value": null},
        {"nutrient": "Cannella", "amount": "400", "unit": "mg", "daily_value": null},
        {"nutrient": "Cromo", "amount": "200", "unit": "μg", "daily_value": "500%"}
      ]
    },
    "ingredients": "Acido Lipoico, Agenti di carica: Cellulosa microcristallina e Calcio Fosfato, Cannella (Cinnamomum Zeylanicum – Corteccia, e.s. Tit. al 5% in Acido Cinnamico), Antiagglomerante: Magnesio Stearato, Cromo Picolinato.",
    "usage": "2 compresse al giorno da assumere con acqua."
  }', '2 compresse al giorno da assumere con acqua.', NULL, NULL, false, false, false, '2025-08-04 08:40:16.943354', NULL, 'Cannella', NULL, '60 capsule');
INSERT INTO public.products VALUES (801, 'hepax-forte', 'Hepax Forte', 6, 7, 'Integratore per la funzione epatica con estratti vegetali selezionati', 'HEPAX FORTE è un integratore alimentare in compresse di N-Acetilcisteina (NAC) e Colina, con aggiunta di estratti secchi vegetali titolati quali: cardo mariano, tarassaco, carciofo. Formulato con vitamine e sali minerali. HEPAX FORTE si avvale della sinergia dei suoi ingredienti per supportare la normale funzione epatica e depurare l''organismo.', '{
    "valori_nutrizionali": {
      "dose": "PER DOSE (2 COMPRESSE)",
      "tabella": [
        {"componente": "VALORE ENERGETICO", "quantita": "0 kcal / 0 kj", "vnr": ""},
        {"componente": "N- Acetilcisteina", "quantita": "300 mg", "vnr": "-"},
        {"componente": "Tarassaco", "quantita": "100 mg", "vnr": "-"},
        {"componente": "Cardo mariano", "quantita": "300 mg", "vnr": "-"},
        {"componente": "Colina", "quantita": "100 mg", "vnr": "-"},
        {"componente": "Carciofo", "quantita": "200 mg", "vnr": "-"},
        {"componente": "Vitamina C", "quantita": "80 mg", "vnr": "100"},
        {"componente": "Vitamina E", "quantita": "12 mg", "vnr": "100"},
        {"componente": "Vitamina B6", "quantita": "1,4 mg", "vnr": "100"},
        {"componente": "Vitamina B2", "quantita": "1,4 mg", "vnr": "100"},
        {"componente": "Zinco", "quantita": "10 mg", "vnr": "100"},
        {"componente": "Selenio", "quantita": "55 mcg", "vnr": "100"}
      ]
    },
    "ingredienti": "N-Acetil L-cisteina (NAC), cardo mariano (sylibum marianum gaertn frutti e.s. 80% silimarina), carciofo (cynara scolimus L. foglie e.s. 5% cinarina), colina, tarassaco (taraxacum officinale weber radice e.s. 2% inulina), acido l-ascorbico (vitamina C), antiagglomerante: Magnesio stearato; gluconato di zinco, acetato di dl-alfa-tocoferile (vitamina E), piridossale-5-fosfato (Vitamina B6), riboflavina-5-fosfato (vitamina B2), selenito di sodio (selenio), agente di carica: cellulosa microcristallina, calcio difosfato."
  }', 'Assumere 2 compresse al giorno con acqua. Consigli di conservazione: chiudere accuratamente il barattolo dopo l''uso e conservare il prodotto in luogo fresco e asciutto lontano dalla luce solare e dalle fonti di calore.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. Non somministrare ai bambini al di sotto dei tre anni di età. Conservare in luogo fresco e asciutto.', 'Questo integratore è una formula completa per il benessere epatico e la depurazione dell''organismo, con ingredienti sinergici che supportano la funzione del fegato e la detossificazione, arricchita con vitamine e minerali essenziali.', false, false, false, '2025-06-24 15:59:33.777031', NULL, NULL, '60', 'compresse');
INSERT INTO public.products VALUES (1229, 'lipoic-b', 'Lipoic B', 25, 5, 'Acido Alfa Lipoico (ALA) in compresse da 600mg di principio ciascuna. L''acido lipoico utilizzato è ricavato dal mais e contiene il 50% di isomero R ed il 50% di isomero S.', 'Acido Alfa Lipoico (ALA) in compresse da 600mg di principio ciascuna. L''acido lipoico utilizzato è ricavato dal mais e contiene il 50% di isomero R ed il 50% di isomero S', '{
    "nutritional_table": {
      "title": "Valori Nutrizionali",
      "serving_size": "1 compressa",
      "servings_per_container": "90",
      "values": [
        {"nutrient": "Acido Alfa Lipoico (ALA)", "amount": "600", "unit": "mg", "daily_value": null},
        {"nutrient": "Vitamina B5", "amount": "6", "unit": "mg", "daily_value": "100%"},
        {"nutrient": "Vitamina B6", "amount": "1.4", "unit": "mg", "daily_value": "100%"},
        {"nutrient": "Vitamina B2", "amount": "1.4", "unit": "mg", "daily_value": "100%"},
        {"nutrient": "Vitamina B1", "amount": "1", "unit": "mg", "daily_value": "100%"}
      ]
    },
    "ingredients": "Acido alfa lipoico, cellulosa microcristallina, calcio fosfato bibasico, vit. B5 (calcio pantotenato), vit. B6 (piridossina cloridrato), vit. B2 (riboflavina), vit. B1 (tiamina), talco, magnesio stearato vegetale, biossido di silicio.",
    "usage": "Si consiglia di assumere 1 compressa al giorno, da deglutire con acqua."
  }', 'Si consiglia di assumere 1 compressa al giorno, da deglutire con acqua.', NULL, NULL, false, false, false, '2025-08-04 08:40:16.943354', NULL, 'Unico', NULL, '90 capsule');
INSERT INTO public.products VALUES (759, 'alaform-800', 'Alaform 800', 6, 5, 'Acido alfa-lipoico ad alto dosaggio per il supporto antiossidante e metabolico', 'ALAFORM 800 è un antiossidante fondamentale costituito da acido alfa lipoico solvent free (800 mg per dose), sviluppato adattando i benefici della scienza e della ricerca al mercato del benessere e dello sport. L''ACIDO ALFA LIPOICO (ALA) svolge alcune funzioni importantissime, tra le principali: migliorare l''utilizzo dei carboidrati e stabilizzare la glicemia (potenzia l''azione dell''insulina), attivare gli enzimi che gestiscono le molecole finalizzate alla produzione di energia e quella antiossidante, in quanto agisce a stretto contatto con le vitamine C ed E per migliorare la loro efficacia nella lotta contro i radicali liberi.', '{
    "valori_nutrizionali": {
      "dose": "DOSE (2 COMPRESSE)",
      "tabella": [
        {"componente": "Acido Alfa Lipoico", "quantita": "800 mg", "vnr": "-"},
        {"componente": "Vitamina B1", "quantita": "1,1 mg", "vnr": "100"},
        {"componente": "Vitamina B6", "quantita": "1,4 mg", "vnr": "100"},
        {"componente": "Cromo Picolinato", "quantita": "200 mcg", "vnr": "-"},
        {"componente": "di cui Cromo", "quantita": "24,4 mcg", "vnr": "61"},
        {"componente": "Miscela di enzimi Digezyme®", "quantita": "150 mg", "vnr": "-"}
      ]
    },
    "ingredienti": "Acido Alfa Lipoico, addensante: cellulosa microcristallina, miscela di enzimi DigeZyme® (alfa-amilasi, proteasi, lattasi, cellulasi, lipasi), antiagglomeranti: magnesio stearato vegetale, biossido di silicio; vitamina B6 (piridossina cloridato), vitamina B1 (mononitrato di tiamina), cromo picolinato."
  }', 'Assumere 2 compresse al giorno, preferibilmente durante i pasti.', 'Non eccedere le dosi indicate. Gli integratori non sostituiscono una dieta variata. Tenere fuori dalla portata dei bambini sotto i 3 anni. In caso di uso di farmaci ipoglicemizzanti, prima dell''eventuale uso del prodotto consultare il medico. Conservare in luogo fresco e asciutto.', 'Questo integratore è un potente antiossidante, utile per la gestione della glicemia e per supportare l''efficacia di altre vitamine antiossidanti, rendendolo versatile sia per atleti che per chi cerca un supporto al benessere generale.', false, false, false, '2025-06-22 21:51:54.965035', NULL, NULL, NULL, '90 compresse');
INSERT INTO public.products VALUES (1225, 'depurixia-antiossidante', 'Depurixia', 25, 7, 'Depurixia è un depurativo, disintossicante ed antiossidante. La sua formula esclusiva contiene le migliori sostanze disponibili sul mercato a spiccata azione disintossicante, epatoprotettrice ed antiossidante: estratti vegetali (berberis, curcuma, cardo mariano), minerali (selenio) e sostanze antiossidanti e disintossicanti (coenzima Q10 e glutatione).', 'Depurixia è un depurativo, disintossicante ed antiossidante. La sua formula esclusiva contiene le migliori sostanze disponibili sul mercato a spiccata azione disintossicante, epatoprotettrice ed antiossidante: estratti vegetali (berberis, curcuma, cardo mariano), minerali (selenio) e sostanze antiossidanti e disintossicanti (coenzima Q10 e glutatione) utili per favorire le funzioni depurative, epatiche ed antiossidanti. Indicato in particolare per atleti sotto stress psico fisico, a chi segue diete iperproteiche o squilibrate e tutti coloro che intendono favorire i processi depurativi, favorire la funzione epatica e contribuire alla protezione delle cellule dallo stress ossidativo.', '{"titolo":"Depurixia","valori_nutrizionali":{"per_porzione":{"porzione":"2 compresse","cardo_mariano":"200 mg","berberis":"150 mg","curcuma":"75 mg","selenio":"17,5 mcg (32% VNR*)","n_acetilcisteina":"150 mg","glutatione":"100 mg","coenzima_q10":"25 mg"}},"ingredienti":"Agente di carica: Cellulosa microcristallina, Cardo Mariano (Silybum Marianum - Frutto, e.s. Tit. all’80% in Silimarina), Berberis (Berberis Aristata - Corteccia, e.s. Tit. all’85% in Berberina), N-Acetilcisteina, Glutatione, Curcuma (Curcuma Longa - Rizoma, e.s. Tit. al 95% in Curcuminoidi), Antiagglomerante: Magnesio Stearato, Coenzima Q10, Sodio Selenito.","nota":"*VNR: Valori Nutritivi di Riferimento"}', 'Assumere 2 compresse al giorno.', NULL, NULL, false, false, false, '2025-08-04 08:39:10.536301', NULL, 'Unico', NULL, '60 capsule');
INSERT INTO public.products VALUES (1030, 'creatina-vector', 'Creatina Vector', 22, 2, 'Integratore alimentare di creatina e vitamina C per la dieta dello sportivo, con sistema vettore.', 'La creatina viene trasformata dall''organismo in creatina fosfato, che è a sua volta utilizzata per convertire molto rapidamente ADP in ATP, ovvero fa da carrier per la "moneta con cui paghiamo l''energia". È noto che una opportuna scorta di creatina determina un miglioramento dell''intensità dell''allenamento e del recupero, in sport con componenti anaerobiche. La risposta e l''efficienza muscolare risultano pesantemente influenzate dalla presenza di creatina.', '["<table class=\"nutritional-table\">\n      <thead><tr><th>Componente</th><th>Per dose (1 bst)</th><th>%NRV</th></tr></thead>\n      <tbody>\n        <tr><td>Creatina</td><td>3000 mg</td><td>-</td></tr>\n        <tr><td>L-Arginina alfa-chetoglutarato (AAKG)</td><td>169 mg</td><td>-</td></tr>\n        <tr><td>di cui L-Arginina</td><td>11 mg</td><td>-</td></tr>\n        <tr><td>L-Arginina</td><td>89 mg</td><td>-</td></tr>\n        <tr><td>Acido L-glutammico</td><td>150 mg</td><td>-</td></tr>\n        <tr><td>Taurina</td><td>150 mg</td><td>-</td></tr>\n        <tr><td>Glicina</td><td>100 mg</td><td>-</td></tr>\n        <tr><td>L-Glutammina</td><td>50 mg</td><td>-</td></tr>\n        <tr><td>Acido lipoico</td><td>10 mg</td><td>-</td></tr>\n        <tr><td>Vitamina C</td><td>200 mg</td><td>250%</td></tr>\n        <tr><td>Potassio</td><td>644 mg</td><td>32%</td></tr>\n        <tr><td>Calcio</td><td>120 mg</td><td>15%</td></tr>\n        <tr><td>Fosforo</td><td>255 mg</td><td>36%</td></tr>\n        <tr><td>Zinco</td><td>6,3 mg</td><td>63%</td></tr>\n      </tbody>\n    </table>"]', 'Si consiglia di assumere 1 busta al giorno sciolta in circa 200 ml di acqua, preferibilmente lontano dai pasti. Per la dieta dello sportivo, durante le fasi di carico, si possono assumere fino a 2 buste al giorno (pari a 6g di creatina) per non oltre 30gg, successivamente 1 busta al giorno. Durante il periodo di integrazione con creatina è opportuno assumere molta acqua.', 'Creatina monoidrato, Fosfato dipotassico, Acidificante: acido citrico; Carbonato di calcio, Saccarosio 3,5%, Acido L-ascorbico (vitamina C), Agente antiagglomerante: biossido di silicio; L-arginina alfa-chetoglutarato, Destrosio 2,0%, Acido L-glutammico, Taurina, Aroma, Glicina, L-arginina, Gluconato di Zinco, L-glutammina, Edulcorante: sucralosio; Acido Alfa lipoico.', NULL, false, false, false, '2025-07-26 07:12:27.87572', NULL, 'Unico', '20 buste', NULL);
INSERT INTO public.products VALUES (1317, 'alc-plus-1000', 'ALC Plus 1000', 11, 5, 'ALC Plus unisce acetil-L-carnitina, caffeina e taurina per offrirti una spinta energetica naturale e duratura.', 'ALC Plus unisce acetil-L-carnitina, caffeina e taurina per offrirti una spinta energetica naturale e duratura. L''acetil-L-carnitina favorisce il trasporto degli acidi grassi nelle cellule, aiutando a convertire i grassi in energia e sostenendo la resistenza fisica. La caffeina è nota per il suo effetto stimolante, che aiuta a mantenere la concentrazione mentale e a ridurre la stanchezza, migliorando le prestazioni sia fisiche che cognitive. La taurina, invece, svolge un ruolo chiave nel supportare l''idratazione delle cellule muscolari, supportando la resistenza e l''energia, riducendo la percezione dello sforzo. La vitamina B6 è utile per il metabolismo energetico e per la riduzione di stanchezza e affaticamento. ALC Plus è particolarmente utile per gli sportivi e per coloro che cercano un sostegno naturale per affrontare le sfide quotidiane. Può essere assunto prima dell''attività fisica per massimizzare i benefici, o in caso di necessità in ogni momento della giornata per una dose extra di energia e concentrazione.', '{"titolo": "Integratore Carnitina, Taurina e Caffeina", "valori_nutrizionali": {"per_porzione": {"acetilcarnitina": "1000 mg", "taurina": "100 mg", "caffeina": "100 mg", "vitamina_b6": "1,4 mg (100% VNR)"}}, "ingredienti": "N-acetil-L-carnitina cloridrato (HCL), addensanti: idrossi-propil-metilcellulosa, idrossi-propil-cellulosa; taurina; caffeina anidra; agenti antiagglomeranti: sali di magnesio degli acidi grassi, biossido di silicio; agente di carica: cellulosa; vitamina B6 (cloridrato di piridossina). SENZA GLUTINE.", "nota": "*VNR: Valori Nutritivi di Riferimento"}', 'si consiglia l''assunzione di una compressa al giorno mezz''ora prima dell''attività sportiva.', NULL, NULL, false, false, false, '2025-08-28 13:50:30.099029', NULL, 'Unico', NULL, NULL);
INSERT INTO public.products VALUES (1370, 'isowhey-pro-zyme-premier-cioccolato-450g', 'Isowhey Pro-Zyme', 6, 1, 'ISOWHEY PRO-ZYME è un integratore in polvere di proteine Isolate del siero di latte arricchito con DigeZyme® (complesso di enzimi digestivi).', 'ISOWHEY PRO-ZYME è un integratore in polvere di proteine Isolate del siero di latte arricchito con DigeZyme® (complesso di enzimi digestivi) e vitamine del gruppo B.

Le proteine isolate del siero di latte hanno un contenuto proteico superiore al 90% con un bassissimo contenuto di grassi e carboidrati. Sono caratterizzate da un elevato valore biologico e un profilo aminoacidico completo.

DigeZyme® è un complesso multi-enzimatico che include alfa-amilasi, proteasi neutra, cellulasi, lattasi e lipasi. Questi enzimi facilitano la digestione e l''assorbimento delle proteine, riducendo eventuali disturbi digestivi.

Le vitamine del gruppo B supportano il normale metabolismo energetico e la riduzione della stanchezza e dell''affaticamento.', '{"titolo":"Proteine Isolate con Enzimi Digestivi","valori_nutrizionali":{"per_100g":{"energia":"374 kcal / 1590 kj","grassi":"0,8 g","di_cui_saturi":"0,5 g","carboidrati":"4,2 g","di_cui_zuccheri":"4,0 g","proteine":"86 g","sale":"0,15 g","vitamina_b1":"3,8 mg","vitamina_b2":"4,9 mg","vitamina_b6":"4,9 mg","vitamina_b12":"8,8 mcg"},"per_dose_30g":{"energia":"112 kcal / 477 kj","grassi":"0,3 g","di_cui_saturi":"0,2 g","carboidrati":"1,3 g","di_cui_zuccheri":"1,2 g","proteine":"26 g","sale":"0,05 g","vitamina_b1":"1,1 mg (100% VNR)","vitamina_b2":"1,4 mg (100% VNR)","vitamina_b6":"1,4 mg (100% VNR)","vitamina_b12":"2,5 mcg (100% VNR)"}},"ingredienti":"Sieroproteine ISOLATE del LATTE, cacao magro in polvere, aromi, DigeZyme® (miscela di enzimi), edulcoranti: acesulfame K, sucralosio; vitamine del gruppo B.","nota":"VNR = Valore nutrizionale di riferimento"}', 'Assumere 30 g di prodotto (1 misurino) sciolti in 200 ml di acqua al giorno, preferibilmente dopo l''allenamento o lontano dai pasti principali. All''interno della confezione è disponibile un misurino dosatore.', NULL, NULL, false, false, false, '2025-09-01 16:32:41.947548', 59, 'Cioccolato', '450g', NULL);
INSERT INTO public.products VALUES (1382, 'massive-gain-xxl-premier', 'Massive Gain XXL', 6, 1, 'MASSIVE GAIN XXL è un integratore di proteine e carboidrati ad alto contenuto calorico, ideale per aumentare la massa muscolare.', 'MASSIVE GAIN XXL è un integratore di proteine e carboidrati ad alto contenuto calorico, arricchito con creatina, aminoacidi ramificati e vitamine del gruppo B.

Formulato specificamente per gli sportivi che necessitano di un elevato apporto calorico per aumentare la massa muscolare. Contiene un mix di proteine del siero di latte concentrate e caseine per un rilascio proteico graduale.

I carboidrati forniscono energia immediata per gli allenamenti intensi e favoriscono il recupero post-workout. La creatina monoidrato aumenta le prestazioni fisiche negli esercizi ripetitivi di alta intensità.

Gli aminoacidi ramificati (BCAA) supportano la sintesi proteica e riducono il catabolismo muscolare durante e dopo l''allenamento.', '{"titolo":"Mass Gainer ad Alto Contenuto Calorico","valori_nutrizionali":{"per_100g":{"energia":"380 kcal / 1615 kj","grassi":"2,8 g","di_cui_saturi":"1,8 g","carboidrati":"70 g","di_cui_zuccheri":"15 g","proteine":"20 g","sale":"0,3 g","creatina":"2 g","bcaa":"3 g","vitamina_b1":"1,1 mg","vitamina_b2":"1,4 mg","vitamina_b6":"1,4 mg","vitamina_b12":"2,5 mcg"}},"ingredienti":"Maltodestrine, Proteine del LATTE (concentrate del siero e caseine), Destrosio, Cacao magro in polvere, Aromi, Creatina monoidrato, L-Leucina, L-Valina, L-Isoleucina, Edulcoranti: acesulfame K, sucralosio; Vitamine del gruppo B.","nota":"Ad alto contenuto calorico - ideale per aumento massa muscolare"}', 'Mescolare 100 g di prodotto (2 misurini) con 400 ml di acqua o latte. Assumere 1-2 volte al giorno tra i pasti o dopo l''allenamento. All''interno della confezione è disponibile un misurino dosatore.', NULL, NULL, false, false, false, '2025-09-01 16:32:43.202501', 60, 'Cioccolato', '1500g', NULL);
INSERT INTO public.products VALUES (1384, 'peanut-butter-premier', 'Peanut Butter', 6, 8, 'PEANUT BUTTER è una crema di arachidi 100% naturale, senza zuccheri aggiunti e senza olio di palma.', 'PEANUT BUTTER è una crema di arachidi 100% naturale, ottenuta dalla macinazione di arachidi tostate selezionate. Senza zuccheri aggiunti, senza olio di palma e senza conservanti.

Fonte naturale di proteine vegetali, grassi insaturi e vitamina E. Le arachidi sono ricche di niacina (vitamina B3), folati e magnesio, nutrienti essenziali per il metabolismo energetico.

La texture cremosa e il sapore autentico la rendono perfetta da spalmare su pane, fette biscottate o da utilizzare come ingrediente in ricette dolci e salate. Ideale per sportivi e per chi segue una dieta bilanciata.

Prodotto naturalmente privo di glutine e adatto a vegani e vegetariani.', '{"titolo":"Crema di Arachidi 100% Naturale","valori_nutrizionali":{"per_100g":{"energia":"588 kcal / 2461 kj","grassi":"49 g","di_cui_saturi":"8,2 g","carboidrati":"16 g","di_cui_zuccheri":"5,4 g","fibre":"8,1 g","proteine":"25 g","sale":"0,01 g","vitamina_e":"8,3 mg","niacina":"17,9 mg","magnesio":"168 mg"}},"ingredienti":"Arachidi tostate 100%.","nota":"Senza zuccheri aggiunti, senza olio di palma, naturalmente senza glutine"}', 'Consumare 1-2 cucchiai (20-30g) al giorno. Mescolare prima dell''uso in caso di separazione naturale degli oli. Conservare in luogo fresco e asciutto.', NULL, NULL, false, false, false, '2025-09-01 16:32:43.436769', 61, 'Arachide', '570g', NULL);
INSERT INTO public.products VALUES (1388, 'intra-pro-essential-plus-premier', 'Intra Pro Essential+', 6, 2, 'INTRA PRO ESSENTIAL + è un integratore di aminoacidi essenziali in polvere arricchito con L-istidina, quattro aminoacidi utili a supportare gli allenamenti intensi tra i quali L-glutammina, L-arginina e citrullina (Kyowa® Quality) e vitamine B6 e B2.', 'INTRA PRO ESSENTIAL + è un integratore di Aminoacidi Essenziali in polvere arricchito con L-istidina e L-glutammina, L-arginina, citrullina (Kyowa® Quality), vitamine B6 e B2.

Gli Aminoacidi Essenziali sono 8 e fanno parte dei 20 aminoacidi che partecipano alla sintesi proteica e quindi al corretto svolgimento delle funzioni dell''organismo umano. Sono definiti essenziali quegli aminoacidi che il corpo non riesce a sintetizzare in quantità sufficiente a far fronte ai propri bisogni: Fenilalanina, Isoleucina, Lisina, Leucina, Metionina, Treonina, Triptofano e Valina. La scarsità o la mancanza di un aminoacido essenziale agisce infatti come fattore limitante della sintesi proteica endogena.', '{"titolo":"Integratore di Aminoacidi","valori_nutrizionali":{"per_dose_8g":{"vitamina_b2":"1,4 mg (100% VNR)","vitamina_b6":"1,4 mg (100% VNR)","l_leucina":"1,2 g","l_glutammina":"1 g","l_lisina":"0,72 g","l_fenilalanina":"0,72 g","l_isoleucina":"0,6 g","l_valina":"0,6 g","l_treonina":"0,6 g","l_arginina_hcl":"0,5 g","l_metionina":"0,48 g","l_triptofano":"0,24 g","l_istidina":"0,24 g","citrullina":"0,24 g"}},"ingredienti":"miscela di aminoacidi (L-leucina, l-glutammina, L-lisina, L-fenilalanina, L-isoleucina, L-valina, L-treonina, l-arginina cloridrato, l-metionina, L-istidina, L-triptofano, citrullina), acido citrico, acido tartarico, aromi, sodio bicarbonato, edulcoranti: sucralosio, riboflavina (vitamina B2), cloridrato di piridossina (vitamina B6.)","nota":"*%VNR = Valori nutritivi di riferimento"}', 'Assumere fino a 8 g (due misurini rasi) al giorno con acqua.', NULL, NULL, false, false, false, '2025-09-01 16:32:43.938667', 64, 'Agrumi', '200g', NULL);
INSERT INTO public.products VALUES (1394, 'hard-zma-xp-premier', 'Hard ZMA XP', 6, 7, 'HARD ZMA® XP è un integratore alimentare in compresse di ZMA® (zinco mono-L-metionina solfato, zinco L-aspartato, magnesio citrato, magnesio ossido, vitamina B6), arricchito con N-acetilcisteina, vitamine C-E.', 'HARD ZMA® XP è un integratore alimentare in compresse di ZMA® (zinco mono-L-metionina solfato, zinco L-aspartato, magnesio citrato, magnesio ossido, vitamina B6), arricchito con N-acetilcisteina, vitamine C-E.
Integratore alimentare di ZMA® dell''azienda americana InterHealth USA, specializzata in ricerca, sviluppo e distribuzione di ingredienti nutraceutici. HARD ZMA XP contiene esclusivamente ZMA® U.S. PATENT costituito da zinco mono-L-metionina solfato, zinco L-aspartato, magnesio citrato, magnesio ossido, vitamina B6 e arricchito con N-acetilcisteina, vitamine C ed E.

ZMA® aumenta i livelli di testosterone totale e libero, il fattore di crescita insulino-simile (IGF-1), la forza e la potenza muscolare. Il testosterone e l''IGF-1 sono inoltre coinvolti nei processi di recupero e rigenerazione muscolare.', '{"titolo":"ZMA, Vitamine e N-Acetylcisteina","valori_nutrizionali":{"per_porzione":{"porzione":"2 compresse","zma":"1,3 g","di_cui_zinco":"15 mg (150% VNR)","di_cui_magnesio":"250 mg (66,6% VNR)","di_cui_vitamina_b6":"6 mg (428% VNR)","n_acetylcisteina":"120 mg","vitamina_c":"180 mg (225% VNR)","vitamina_e":"30 mg (250% VNR)"}},"ingredienti":"ZMA® [zinco mono-L-metionina solfato, zinco L-aspartato, magnesio citrato, magnesio ossido, vitamina B6 (cloridrato di piridossina)], Vitamina C (Acido Ascorbico), N-Acetilcisteina, Vitamina E (Tocoferilacetato), Agenti antiagglomeranti: biossido di silicio, sali di magnesio degli acidi grassi; Agente di carica: cellulosa microcristallina.","nota":"VNR = valore nutrizionale di riferimento"}', 'Assumere fino a 2 compresse al giorno con acqua.', NULL, NULL, false, false, false, '2025-09-01 16:32:44.731568', 69, 'Unico', '90 compresse', NULL);
INSERT INTO public.products VALUES (1392, 'hard-wph-bv104-premier', 'Hard WPH BV104', 6, 1, 'HARD WPH BV104 è un integratore in polvere di proteine del Siero di latte Isolate Idrolizzate (predigestione enzimatica) OPTIPEP® 90 BV104.', 'HARD WPH BV104 è un integratore in polvere di proteine del Siero di latte Isolate Idrolizzate (predigestione enzimatica) OPTIPEP® 90 BV104. Il processo di predigestione (idrolisi) rende velocemente disponibili gli aminoacidi contenuti. HARD WPH BV104 ha un elevato valore biologico ed un profilo aminoacidico ottimale particolarmente ricco di aminoacidi ramificati, con un''eccellente solubilità. Arricchito con DigeZyme® (complesso di enzimi), vitamine B1, B2, B6 e B12.

HARD WPH BV104 è un integratore in polvere di proteine del latte isolate idrolizzate con un alto grado di idrolisi. Agiscono a pochi minuti dall''assunzione sul rifornimento delle riserve di glicogeno, ripristinando quelle utilizzate a scopo energetico e riparando i danni muscolari, contribuendo ad alleviare i dolori post allenamento e ottimizzando i tempi di recupero. Questo integratore, per la sua formulazione, è contraddistinto da un alto valore biologico (104) che descrive una proteina dal perfetto equilibrio amminoacidico e da un Pdcaas (Protein Digestibility Corrected Amino Acid Score) pari a 0,98 che indica una proteina considerata completa per l''uomo e in grado di fornire, dopo la digestione, il 100% degli aminoacidi essenziali necessari per una perfetta integrazione.', '{"titolo":"Integratore Proteico Idrolizzato","valori_nutrizionali":{"per_100g":{"valore_energetico":"386 kcal / 1640 kj","grassi":"2 g","di_cui_saturi":"0,5 g","carboidrati":"2 g","di_cui_zuccheri":"1,9 g","proteine":"90 g","sale":"0,2 g","vitamina_b1":"3,6 mg","vitamina_b2":"4,6 mg","vitamina_b6":"4,6 mg","vitamina_b12":"8,3 mcg"},"per_dose_30g":{"valore_energetico":"115 kcal / 492 kj","grassi":"0,6 g","di_cui_saturi":"0,3 g","carboidrati":"0,6 g","di_cui_zuccheri":"0,5 g","proteine":"27 g","sale":"60 mg","vitamina_b1":"1,1 mg (100% VNR)","vitamina_b2":"1,4 mg (100% VNR)","vitamina_b6":"1,4 mg (100% VNR)","vitamina_b12":"2,5 mcg (100% VNR)"}},"ingredienti":"Sieroproteine Idrolizzate del LATTE (Optipep® 90), cacao magro in polvere, NOCCIOLE tostate in polvere, aromi, Emulsionante: lecitina di SOIA; Digezyme® (miscela di ezimi da Aspergillus oryzae, Bacillus subtilis, Rhizopus oryzae, Trichoderma Longibrachiatum, eccipiente: maltodestrine da mais) Edulcoranti: Acelsufame K, Sucralosio; Vitamina B6 (cloridrato di piridossina), Vitamina B2 (Riboflavina), Vitamina B1 (cloridrato di tiamina), Vitamina B12 (Cianocobalamina).","nota":"VNR = valore nutrizionale di riferimento"}', 'Assumere fino a 30 g di prodotto (3 misurini) in 100 ml d''acqua al giorno lontano dai pasti principali. All''interno della confezione è presente un misurino dosatore.', NULL, NULL, false, false, false, '2025-09-01 16:32:44.485605', 68, 'Crema Caffé', '750g', NULL);
INSERT INTO public.products VALUES (1399, 'hard-eaa-8-1-premier', 'Hard EAA 8:1', 6, 2, 'HARD EAA 8:1 è un integratore di aminoacidi essenziali in compresse arricchito con L-Istidina e vitamina B2.', 'HARD EAA 8:1 è un integratore di aminoacidi essenziali in compresse arricchito con L-Istidina e vitamina B2.
EAA 8:1 FREE FORM è un integratore di Aminoacidi Essenziali in compresse arricchito con L-Istidina e Vitamina B2.

Gli Aminoacidi Essenziali sono 8 e fanno parte dei 20 aminoacidi che partecipano alla sintesi proteica e quindi al corretto svolgimento delle funzioni dell''organismo umano. Sono definiti essenziali quegli aminoacidi che il corpo non riesce a sintetizzare in quantità sufficiente a far fronte ai propri bisogni: Fenilalanina, Isoleucina, Lisina, Leucina, Metionina, Treonina, Triptofano e Valina. La scarsità o la mancanza di un aminoacido essenziale agisce infatti come fattore limitante della sintesi proteica endogena.', '{"titolo":"Integratore di Aminoacidi Essenziali","valori_nutrizionali":{"per_dose_5_compresse":{"l_leucina":"1300 mg","l_isoleucina":"650 mg","l_valina":"650 mg","l_lisina":"680 mg","l_fenilalanina":"630 mg","l_treonina":"525 mg","l_metionina":"315 mg","l_triptofano":"180 mg","l_istidina":"250 mg","vitamina_b2":"7 mg (500% VNR)"}},"ingredienti":"L-Leucina, L-Lisina, L-Isoleucina, L-Valina, L-Fenilalanina, L-Treonina, agente di carica: cellulosa microcristallina; L-Metionina, L-Istidina, L-Triptofano, stabilizzanti: sali di magnesio degli acidi grassi; Riboflavina (Vitamina B2).","nota":"*VNR = Valori nutritivi di riferimento"}', 'Assumere fino a 5 compresse al giorno con acqua.', NULL, NULL, false, false, false, '2025-09-01 16:32:45.365596', 73, 'Unico', '150 compresse', NULL);
INSERT INTO public.products VALUES (1396, 'total-egg-premier', 'Total EGG', 6, 1, 'TOTAL EGG è un integratore alimentare in polvere di proteine dell''albume d''uovo arricchito con vitamine C, E, B1, B2, B6, B12.', 'TOTAL EGG è un integratore alimentare in polvere di proteine dell''albume d''uovo arricchito con vitamine C, E, B1, B2, B6, B12. Le proteine contribuiscono alla crescita e al mantenimento della massa muscolare. Le vitamine B1, B2, B6 e B12 contribuiscono al normale metabolismo energetico.

TOTAL EGG è un prodotto per sportivi monoproteico di albume d''uovo in polvere (EUROVO) arricchito con vitamine. Il prodotto fornisce un elevato apporto proteico, presenta un elevato valore biologico ed un profilo aminoacidico ottimale. TOTAL EGG può essere considerato una fonte di proteine nobili e complete.

Le ovoalbumine rappresentano la tradizionale alternativa alle proteine del latte, infatti il loro valore biologico e l''efficienza proteica sono simili.

Le proteine d''albume d''uovo rappresentano la scelta ideale per tutti quegli sportivi che non tollerano i derivati del latte. Le ovoalbumine godono di un ottimale profilo aminoacidico, perché caratterizzato da un ottimo equilibrio tra i vari aminoacidi essenziali. Le proteine dell''albume d''uovo sono proteine intermedie, quindi possiedono un ottimo potere saziante e sono indicate in varie fasi della giornata oltre che nel post workout.', '{"titolo":"Integratore a base di Albumina d''uovo","valori_nutrizionali":{"per_100g":{"energia":"350,5 kcal / 1489,63 kj","grassi":"1 g","di_cui_saturi":"0,5 g","carboidrati":"6,0 g","di_cui_zuccheri":"3,5 g","proteine":"79 g","sale":"1,4 g","vitamina_c":"60 mg","vitamina_b1":"0,82 mg","vitamina_b2":"1,05 mg","vitamina_b6":"1,05 mg","vitamina_b12":"1,87 mcg"},"per_dose_40g":{"energia":"140 kcal / 593 kj","grassi":"0,4 g","di_cui_saturi":"0,2 g","carboidrati":"2,4 g","di_cui_zuccheri":"1,5 g","proteine":"32 g","sale":"0,6 g","vitamina_c":"24 mg (30% VNR)","vitamina_b1":"0,33 mg (30% VNR)","vitamina_b2":"0,42 mg (30% VNR)","vitamina_b6":"0,42 mg (30% VNR)","vitamina_b12":"0,75 mcg (30% VNR)"}},"ingredienti":"ALBUME D''UOVO in polvere, fruttosio, aromi, edulcoranti: Sucralosio; vitamina C (acido ascorbico), Vitamina B6 (cloridrato di piridossina), Vitamina B2 (riboflavina), Vitamina B1 (cloridrato di tiamina), Vitamina B12 (cianocobalamina).","nota":"VNR = valore nutrizionale di riferimento"}', 'Assumere fino 40 g di prodotto (4 misurini) in 250 ml d''acqua al giorno lontano dai pasti principali. All''interno della confezione è disponibile un misurino dosatore.', NULL, NULL, false, false, false, '2025-09-01 16:32:44.995434', 71, 'Cacao', '1kg', NULL);
INSERT INTO public.products VALUES (1439, 'amino-pool-bv104', 'Amino Pool BV104', 6, 1, 'AMINO POOL BV 104 è un integratore a base di proteine del siero di latte isolate idrolizzate OPTIPEP® 90 con un alto grado di idrolisi (DH8) perfetto per tutte le fasi della giornata e post allenamento.', 'AMINO POOL BV 104 è un integratore a base di proteine del siero di latte isolate idrolizzate OPTIPEP® 90 con un alto grado di idrolisi (DH8) perfetto per tutte le fasi della giornata e post allenamento. Amino Pool BV 104 sono proteine del latte isolate idrolizzate con un alto grado di idrolisi (DH8) e quindi con un maggior apporto di peptidi a basso peso molecolare rispetto alle DH4. Questo consente il più alto grado di assorbimento e l''immediata disponibilità degli amminoacidi BCAA e EAA di cui sono composte. Agiscono a pochi minuti dall''assunzione sul rifornimento delle riserve di glicogeno, rispristinando quelle utilizzate a scopo energetico e riparando i danni muscolari, contribuendo ad alleviare i dolori post allenamento e ottimizzando i tempi di recupero.', '{"titolo":"Integratore Proteico Idrolizzato in compresse","valori_nutrizionali":{"per_dose_10_compresse":{"valore_energetico":"36,85 Kcal / 156,63 Kj","proteine":"9 g","carboidrati":"0,1 g","di_cui_zuccheri":"0,1 g","grassi":"0,05 g","di_cui_saturi":"0 g","fibre":"0 g","sale":"0,017 g"}},"ingredienti":"Sieroproteine Isolate Idrolizzate del LATTE (Optipep® 90 DH8); Antiagglomerante: Biossido di Silicio, Magnesio Stearato."}', 'Assumere 10 compresse al giorno con acqua.', NULL, NULL, false, false, false, '2025-09-01 21:31:10.949027', 90, 'Unico', '250 compresse', NULL);
INSERT INTO public.products VALUES (1522, 'borraccia-ethicsport', 'Borraccia 600ml', 22, 6, 'Borraccia sportiva EthicSport da 600ml in materiale pregiato.', 'Borraccia sportiva EthicSport ad alta qualità con logo caratterizzato da colorazioni bianche e arancioni distintive. Borraccia realizzata in materiale plastico di prima qualità, adatto per tutte le bevande e facilmente lavabile. La borraccia è dotata di tappo a spinta con cannuccia integrata, perfetta per sportivi che vogliono rimanere idratati durante le performance atletiche. Design moderno e funzionale che garantisce praticità e resistenza durante qualsiasi attività sportiva.', NULL, 'Si consiglia il lavaggio a mano per preservare la qualità del prodotto.', NULL, NULL, false, false, false, '2025-09-02 14:52:47.923265', 132, 'Unico', '600ml', NULL);
INSERT INTO public.products VALUES (1534, 'omnia-active-formula', 'OMNIA Active Formula', 22, 7, 'Integratore di vitamine e minerali ad alto dosaggio per sportivi attivi.', 'OMNIA® Active Formula è un integratore alimentare di vitamine e minerali con fosfatidilcolina. La formulazione apporta il 100% dei valori nutritivi (NRV) delle vitamine utili all''organismo umano e molti dei minerali coinvolti nei processi metabolici ed enzimatici. In particolare, le vitamine (C, B2, B3, B5, B6, B12) contribuiscono al corretto metabolismo energetico1 e alla riduzione della stanchezza e dell''affaticamento2. Le vitamine B2, B3, B8, A, C insieme a Ca, Mg e Zn contribuiscono al mantenimento di una pelle normale3 e di ossa normali4. Le Vitamine A, B6, B9, B12, C, D, insieme a Fe, Cu, Se, Zn contribuiscono alla normale funzione del sistema immunitario5. Infine, contribuisce alla protezione delle cellule dallo stress ossidativo6 per la presenza delle vitamine B2, C, E, insieme a Cu, Se, Zn. Il prodotto è Gluten Free, è pertanto adatto anche per soggetti celiaci o con intolleranza al glutine.', '{
    "titolo": "Integratore Multivitaminico e Multiminerale",
    "valori_nutrizionali": {
      "per_porzione": {
        "porzione": "1 capsula",
        "vitamina_a": "800 mcg (100% NRV)",
        "vitamina_d": "5,0 mcg (100% NRV)",
        "vitamina_e": "12 mg (100% NRV)",
        "vitamina_k": "75 mcg (100% NRV)",
        "vitamina_c": "80 mg (100% NRV)",
        "tiamina_b1": "1,1 mg (100% NRV)",
        "riboflavina_b2": "1,4 mg (100% NRV)",
        "niacina_b3": "16 mg (100% NRV)",
        "vitamina_b6": "1,4 mg (100% NRV)",
        "acido_folico": "200 mcg (100% NRV)",
        "vitamina_b12": "2,5 mcg (100% NRV)",
        "biotina": "50 mcg (100% NRV)",
        "acido_pantotenico_b5": "6 mg (100% NRV)",
        "calcio": "160 mg (20% NRV)",
        "magnesio": "75 mg (20% NRV)",
        "ferro": "14 mg (100% NRV)",
        "zinco": "7,5 mg (75% NRV)",
        "rame": "1 mg (100% NRV)",
        "manganese": "1,8 mg (100% NRV)",
        "selenio": "55 mcg (100% NRV)",
        "iodio": "150 mcg (100% NRV)",
        "fosfolipidi": "100 mg",
        "di_cui_fosfatidilcolina": "20 mg"
      }
    },
    "ingredienti": "Carbonato di calcio anidro, magnesio diglicinato, Agente di carica: idrossipropilmetilcellulosa; Fosfolipidi da olio di girasole in polvere (di cui 20% fosfatidilcolina), Vitamina C (acido l-ascorbico); Diglicinato ferroso, zinco picolinato, Vitamina E (acetato di dl-alfa-tocoferile), agenti antiagglomeranti: sali di magnesio degli acidi grassi, biossido di silicio; Niacina (Esanicotinato di inositolo), l-selenometionina, diglicinato di manganese, Vitamina A (acetato di retinile), Vitamina B5 (acido pantotenico), diglicinato di rame, Vitamina D (colecalciferolo), Vitamina B6 (cloridrato di piridossina), Vitamina K (fillochinone), Vitamina B2 (riboflavina), Vitamina B1 (cloridrato di tiamina), acido folico (acido pteroil monoglutammico), ioduro di potassio, Vitamina B8 (biotina), Vitamina B12 (metilcobalamina)."
  }', '1 Capsula al giorno.', NULL, NULL, false, false, false, '2025-09-02 14:54:10.157413', 139, 'Unico', '45 capsule', NULL);
INSERT INTO public.products VALUES (1530, 'ramtech-bcaa-2-1-1', 'Ramtech BCAA 2:1:1', 22, 2, 'Gli amminoacidi ramificati (BCAA) nel rapporto 2:1:1 con vitamine B1 e B6.', 'Gli amminoacidi ramificati (BCAA) nel rapporto 2:1:1 con vitamine B1 e B6. I BCAA rappresentano circa 1/3 del contenuto totale degli amminoacidi del muscolo scheletrico e non possono essere sintetizzati dal nostro organismo, per questo devono essere assunti attraverso l''alimentazione. I BCAA sono tra i primi substrati ossidati durante l''esercizio fisico, soprattutto quando si protrae nel tempo. Pertanto l''integrazione con BCAA prima e durante l''esercizio può contribuire a mantenere stabili i livelli di questi amminoacidi nel sangue.', '{
    "titolo": "BCAA con vitamine",
    "valori_nutrizionali": {
      "per_porzione_4_capsule": {
        "l_leucina": "1000 mg",
        "l_valina": "500 mg", 
        "l_isoleucina": "500 mg",
        "vitamina_b1": "1,1 mg (100% VNR)",
        "vitamina_b6": "1,4 mg (100% VNR)"
      }
    },
    "ingredienti": "L-Leucina, capsula (gelatina), L-Valina, L-Isoleucina, agenti antiagglomeranti (sali di magnesio degli acidi grassi, biossido di silicio), Vitamina B6 (Piridossina Cloridrato), Vitamina B1 (Tiamina mononitrato). Può contenere tracce di glutine, frutta a guscio e soia.",
    "nota": "VNR = Valori Nutritivi di Riferimento"
  }', 'Assumere 4 capsule al giorno, preferibilmente prima dell''allenamento.', NULL, NULL, false, false, false, '2025-09-02 14:52:48.865245', 136, 'Unico', '120 capsule', NULL);
INSERT INTO public.products VALUES (1535, 'super-hydro-plus', 'Super Hydro Tabs', 22, 3, 'Integratore alimentare idrosalino in compresse effervescenti al gusto Limone.', 'SuperHydro Tabs è un integratore alimentare idrosalino in compresse, senza zuccheri aggiunti e senza calorie1. La speciale formulazione consente un''ottimale idratazione e ottimizza l''assorbimento di acqua durante l''attività intensa. Sodio, potassio, magnesio, calcio e cloro sono elettroliti bilanciati che generano una soluzione con 487mg di sali minerali per compressa.
Le vitamine B1, B2, B6 contribuiscono alla riduzione della stanchezza e dell''affaticamento e al normale metabolismo energetico. La vitamina B1 contribuisce alla normale funzione cardiaca e la vitamina B6 contribuisce inoltre alla normale formazione dei globuli rossi.', '{
    "titolo": "Integratore Multivitaminico e Minerale",
    "valori_nutrizionali": {
      "per_100g": {
        "valore_energetico": "190 kcal / 795 kJ",
        "grassi": "0 g",
        "di_cui_saturi": "0 g",
        "carboidrati": "14 g",
        "di_cui_zuccheri": "0 g",
        "di_cui_polioli": "13 g",
        "proteine": "0 g",
        "sale": "12,9 g",
        "vitamina_b1": "13,25 mg (1205 % NRV)",
        "vitamina_b2": "16,87 mg (1205 % NRV)",
        "vitamina_b6": "16,87 mg (1205 % NRV)",
        "zinco": "120 mg (1205 % NRV)",
        "magnesio": "686,7 mg (183 % NRV)",
        "cloro": "1205 mg (145 % NRV)",
        "calcio": "1566 mg (193 % NRV)",
        "potassio": "3133 mg (157 % NRV)",
        "sodio": "5132 mg"
      },
      "per_compressa_4_15g": {
        "valore_energetico": "8 kcal / 34 kJ",
        "grassi": "0 g",
        "di_cui_saturi": "0 g",
        "carboidrati": "0,6 g",
        "di_cui_zuccheri": "0 g",
        "di_cui_polioli": "0,5 g",
        "proteine": "0 g",
        "sale": "0,53 g",
        "vitamina_b1": "0,55 mg (50 % NRV)",
        "vitamina_b2": "0,7 mg (50 % NRV)",
        "vitamina_b6": "0,7 mg (50 % NRV)",
        "zinco": "5 mg (50 % NRV)",
        "magnesio": "28,5 mg (7,6 % NRV)",
        "cloro": "50 mg (6 % NRV)",
        "calcio": "65 mg (8 % NRV)",
        "potassio": "130 mg (6,5 % NRV)",
        "sodio": "213 mg"
      }
    },
    "ingredienti": "Acido citrico, correttore di acidità: carbonato acido di sodio, agente di carica: sorbitolo, potassio carbonato acido, carbonato di calcio, carbonato di magnesio, cloruro di potassio, aroma naturale (limone), edulcorante: sucralosio, aroma naturale (arancia), citrato di zinco, riboflavina 5-fosfato sodico, piridossina cloridrato, tiamina cloridrato."
  }', 'Sciogliere 1 compressa in circa 500 ml di acqua. Assumere ad intervalli regolari di 15-20 minuti. È preferibile non superare la dose massima di 3 compresse, pari a circa 3 borracce di soluzione, a meno di casi eccezionali, come gare o allenamenti occasionali molto lunghi.', NULL, NULL, false, false, false, '2025-09-02 14:54:10.298791', 140, 'Limone', '20 compresse', NULL);
INSERT INTO public.products VALUES (1524, 'sacca-taglia-unica', 'Sacca Taglia Unica', 22, 6, 'Esclusiva sacca con logo EthicSport in poliestere 44X33 cm', 'Sacca esclusiva EthicSport realizzata in poliestere di alta qualità (dimensioni 44x33 cm). Design caratterizzato da colorazioni bianche e arancioni distintive con logo EthicSport ben visibile. Perfetta per contenere e organizzare tutto l''equipaggiamento sportivo necessario per allenamenti e competizioni. Materiale resistente e lavabile che garantisce durabilità nel tempo. Ideale per palestre, piscine e attività sportive all''aperto.', NULL, 'Si consiglia il lavaggio a mano per preservare la qualità del prodotto.', NULL, NULL, false, false, false, '2025-09-02 14:52:48.167751', 133, 'Unico', 'Taglia Unica', NULL);
INSERT INTO public.products VALUES (1529, 'capppellino-ethicsport-taglia-unica', 'Cappellino EthicSport Taglia Unica', 22, 6, 'CAPPELLINO EthicSport con ricamo in 3D e dettagli sportivi', 'Cappellino EthicSport con visiera piatta caratterizzato da design moderno e sportivo. Ricamo in 3D e dettagli laterali stampati in tono su tono per un look distintivo. Struttura a sei pannelli con visiera a sandwich bicolore e interno personalizzato rifinito in arancio. Dotato di chiusura regolabile sul retro per una vestibilità perfetta e occhielli ricamati per garantire un''eccellente traspirazione durante l''attività sportiva. Perfetto per proteggere dal sole durante allenamenti all''aperto e per completare il proprio look sportivo.', NULL, 'Si consiglia il lavaggio a mano per preservare la qualità del ricamo e dei dettagli.', NULL, NULL, false, false, false, '2025-09-02 14:52:48.731753', 135, 'Unico', 'Taglia Unica', NULL);
INSERT INTO public.products VALUES (1519, 'high-pro-release', 'High Pro Release', 6, 1, 'HIGH PRO RELEASE è un integratore alimentare in polvere di proteine del latte e del pisello.', 'HIGH PRO RELEASE è un integratore alimentare in polvere di proteine del latte (caseinato di calcio, caseina micellare, proteine del siero di latte concentrate Volactive® ed isolate cfm Volactive®), proteine isolate del pisello (Pisane®), indicato per integrare l''alimentazione dello sportivo. HIGH PRO RELEASE fornisce una fonte proteica bilanciata di elevata qualità con un''eccellente solubilità. HIGH PRO RELEASE è arricchito con DigeZyme® (complesso di enzimi: alfa-amilasi, proteasi, lattasi, cellulasi, lipasi), L-Arginina (Kyowa®), Citrullina, vitamine B1, B2, B6 e B12.

Inoltre, è una formula ben bilanciata per l''integrazione dello sportivo ad alte prestazioni, a rilascio graduale, che coniuga gli effetti delle proteine del latte a lento rilascio (caseinato di calcio DMV, caseina micellare DMV), delle proteine del siero di latte a rilascio veloce (concentrate Volactive® ed isolate cfm Volactive®) e delle proteine isolate del pisello a rilascio intermedio (Pisane®) fornendo una fonte proteica completa ad alto valore biologico ed elevata digeribilità.

Grazie alla sua particolare miscela di proteine ad azione lenta (Caseine), intermedia (proteine vegetali) e veloci (siero) favorisce la metabolizzazione sia rapida che a lungo termine di queste componenti e ha la capacità di nutrire continuamente la massa muscolare con aminoacidi indispensabili per favorire la crescita e il potenziamento muscolare a lungo termine.', '{"titolo":"Integratore Proteico con Enzimi","valori_nutrizionali":{"per_100g":{"energia":"1661 kj","valore_energetico":"391 kcal","grassi":"2,5 g","di_cui_saturi":"0,5 g","carboidrati":"3 g","di_cui_zuccheri":"1,9 g","proteine":"87 g","sale":"0,7 g","vitamina_b1":"2,75 mg","vitamina_b2":"3,5 mg","vitamina_b6":"3,5 mg","vitamina_b12":"4 mcg","l_arginina":"1,5 g","citrullina":"1 g"},"per_dose_40g":{"energia":"664 kj","valore_energetico":"156 kcal","grassi":"1 g","di_cui_saturi":"0,4 g","carboidrati":"1,2 g","di_cui_zuccheri":"0,8 g","proteine":"35 g","sale":"0,33 g","vitamina_b1":"1,1 mg (100% VNR)","vitamina_b2":"1,4 mg (100% VNR)","vitamina_b6":"1,4 mg (100% VNR)","vitamina_b12":"2,5 mcg (100% VNR)","l_arginina":"0,6 g","citrullina":"0,4 g"}},"ingredienti":"Proteine del LATTE (caseinato di calcio, caseina micellare, sieroproteine concentrate ed isolate), proteine isolate del pisello, aromi, Emulsionante: lecitina di girasole; L-Arginina, Citrullina, DigeZyme® (miscela di ezimi da Aspergillus oryzae, Bacillus subtilis, Rhizopus oryzae, Trichoderma Longibrachiatum, eccipiente: maltodestrine da mais). Edulcoranti: Acelsufame K, Sucralosio; Vitamina B6 (Piridossina cloridrato), Vitamina B2 (Riboflavina), Vitamina B1 (cloridrato di tiamina), Vitamina B12 (Cianocobalamina).","nota":"VNR = Valori nutritivi di riferimento"}', 'Assumere fino a 40 g di prodotto (4 misurini) in 250 ml d''acqua al giorno lontano dai pasti principali. All''interno della confezione è presente un misurino dosatore.', NULL, NULL, false, false, false, '2025-09-02 14:51:37.876832', 131, 'Caffè Latte', '1kg', NULL);
INSERT INTO public.products VALUES (1000, 'borraccia-why-sport-500ml', 'Borraccia in Acciaio 500 ml', 11, 6, 'Borraccia in acciaio inox 500ml con design motivazionale WHY Sport', 'La Borraccia WHY Sport da 500ml è l''alleata perfetta per la tua idratazione quotidiana e durante l''attività fisica. Realizzata con materiali resistenti e leggeri, è progettata per garantirti praticità e sicurezza ovunque tu vada.', '{}', 'Si consiglia di lavare la borraccia accuratamente prima del primo utilizzo e dopo ogni uso. Lavare a mano con acqua tiepida e sapone delicato. Non adatta al lavaggio in lavastoviglie per preservarne l''integrità. Assicurarsi che il tappo sia ben chiuso per evitare perdite.', 'Lavare prima del primo utilizzo. Non lavare in lavastoviglie. Verificare sempre la chiusura del tappo. Conservare in luogo fresco e asciutto.', 'Una borraccia sportiva versatile e affidabile, progettata per accompagnarti in ogni momento della giornata. I materiali resistenti e leggeri garantiscono durata e praticità per uno stile di vita attivo.', false, false, false, '2025-06-27 16:20:51.076554', NULL, 'Nero', '500ml', '1 borraccia');
INSERT INTO public.products VALUES (1537, 'pre-gara-endurance', 'Pre Gara Endurance', 22, 3, 'Integratore alimentare studiato per massimizzare la resistenza durante l''esercizio fisico prolungato.', 'Il prodotto permette di realizzare una soluzione di carboidrati complessi ed elettroliti, utile al mantenimento di prestazioni di resistenza durante l''esercizio fisico prolungato. Pre Gara Endurance fornisce maltodestrine a lunga catena, amminoacidi glucogenici e amminoacidi ramificati, in grado di essere metabolizzati in tempi diversi.
La presenza di vitamine (B2, B5, B6, C e Folato) coadiuva la riduzione della stanchezza e dell''affaticamento, mentre gli elettroliti presenti (Ca, Mg, K) contribuiscono alla normale funzione muscolare. Le vitamine (B1, B2, B6, C, Biotina) permettono un fisiologico metabolismo energetico e la Vit. B6 supporta il normale metabolismo delle proteine e del glicogeno. La vitamina C, al dosaggio proposto di 2 buste, contribuisce al mantenimento della normale funzione del sistema immunitario durante e dopo uno sforzo fisico intenso e protegge le cellule dallo stress ossidativo. Questo effetto benefico si ottiene con l''assunzione giornaliera di 200 mg in aggiunta all''apporto giornaliero raccomandato di vitamina C. Il prodotto non contiene glutine (Gluten Free) è pertanto indicato anche per soggetti celiaci o con intolleranza al glutine.', '{"titolo":"Integratore Pre-Workout/Energetico","valori_nutrizionali":{"per_100g":{"valore_energetico":"365 kcal","energia":"1533 kj","grassi":"0.02 g","di_cui_saturi":"0.01 g","carboidrati":"75 g","di_cui_zuccheri":"16.36 g","proteine":"0 g","sale":"1.6 g","vitamina_c":"526.3 mg (658% NRV)","vitamina_b1":"1.8 mg (165% NRV)","vitamina_b2":"2.1 mg (149% NRV)","acido_pantotenico":"7.9 mg (132% NRV)","vitamina_b6":"1.3 mg (94% NRV)","biotina":"197.4 mcg (395% NRV)","vitamina_e":"26.3 mg (219% NRV)","folato":"263.2 mcg (132% NRV)","magnesio":"186.8 mg (50% NRV)","potassio":"789.5 mg (40% NRV)","cloruro":"478.8 mg (61% NRV)","calcio":"315.8 mg (35% NRV)","creatina":"1716 mg","taurina":"658 mg","l_leucina":"1974 mg","l_isoleucina":"987 mg","l_valina":"987 mg","l_glutammina":"263 mg","glicina":"1053 mg","l_alanina":"1579 mg","l_acetilcarnitina":"132 mg","acido_l_glutammico":"526 mg","eleuterococco_e_s":"263 mg"},"per_2_buste":{"valore_energetico":"139 kcal","energia":"590 kj","grassi":"0.01 g","di_cui_saturi":"0 g","carboidrati":"28 g","di_cui_zuccheri":"6.22 g","proteine":"0 g","sale":"0.6 g","vitamina_c":"200 mg (250% NRV)","vitamina_b1":"0.7 mg (64% NRV)","vitamina_b2":"0.8 mg (57% NRV)","acido_pantotenico":"3 mg (50% NRV)","vitamina_b6":"0.5 mg (36% NRV)","biotina":"75 mcg (150% NRV)","vitamina_e":"10 mg (83% NRV)","folato":"100 mcg (50% NRV)","magnesio":"71 mg (19% NRV)","potassio":"300 mg (15% NRV)","cloruro":"181.9 mg (23% NRV)","calcio":"120 mg (15% NRV)","creatina":"652 mg","taurina":"250 mg","l_leucina":"750 mg","l_isoleucina":"375 mg","l_valina":"375 mg","l_glutammina":"100 mg","glicina":"400 mg","l_alanina":"600 mg","l_acetilcarnitina":"50 mg","acido_l_glutammico":"200 mg","eleuterococco_e_s":"100 mg"}},"ingredienti":"Maltodestrine (19DE 39% - 5DE 17%), fruttosio, correttore di acidità: acido citrico, aromi, potassio citrato, L-leucina, creatina monoidrato, L-alanina, sodio citrato, glicina, L-isoleucina, L-valina, sodio cloruro, calcio carbonato, magnesio car bonato, taurina, acido L-ascorbico (vitamina C), acido L-glutammico, L-glutammina, eleuterococco (Eleutherococcus senticosus (Rupr. Et Maxim.) Maxim) radice e.s., emulsionante: esteri di saccarosio degli acidi grassi, acetil L-carnitina cloridrato, edulcorante: sucralosio, DL-alfa-tocoferil acetato (vitamina E), colorante: betacaro tene, agente di rivestimento: idrossipropilmetilcellulosa, calcio D-pantotenato (acido pantotenico) (Vitamina B5), tiamina cloridrato (vitamina B1), piridossina cloridrato (vitamina B6), acido pteroil-monoglutammico (folato), D-biotina (vitamina H).","nota":"NRV: Valori Nutritivi di Riferimento (adulti) ai sensi del Reg. UE 1169/2011"}', 'Si consiglia l''utilizzo del prodotto circa 30min. prima dell''impegno sportivo. Utilizzare 1 busta in circa 200 ml di acqua per attività di media durata, 2 buste (in circa 400 ml di acqua) in caso di impegno fisico intenso e prolungato. Per ottimizzare l''assimilazione del prodotto, quando la temperatura esterna è particolarmente elevata, è utile bere circa 200 cc di acqua circa 10-15 minuti prima dell''inizio della prestazione.', NULL, NULL, false, false, false, '2025-09-02 14:54:10.545024', 141, 'Unico', '19g - 20 buste', NULL);


--
-- Data for Name: session; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.session VALUES ('LGyCpytFNZNZzUcO3sm6ZjNxgrz4V9yh', '{"cookie":{"originalMaxAge":2592000000,"expires":"2025-10-27T11:34:34.483Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"user":{"username":"biggimmy","authenticated":true,"loginTime":"2025-09-27T11:34:34.482Z"}}', '2025-10-27 11:37:07');
INSERT INTO public.session VALUES ('tE_iGZi54p0by4Yf1Ds9ewp4YEnOYKxl', '{"cookie":{"originalMaxAge":2592000000,"expires":"2025-10-27T10:46:39.213Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"user":{"username":"biggimmy","authenticated":true,"loginTime":"2025-09-27T10:46:39.212Z"}}', '2025-10-27 15:38:26');
INSERT INTO public.session VALUES ('SnnPnvvXWBvK8DVbyb7yMLCz8vwVOu_j', '{"cookie":{"originalMaxAge":2592000000,"expires":"2025-10-27T15:39:31.308Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"user":{"username":"biggimmy","authenticated":true,"loginTime":"2025-09-27T15:39:31.307Z"}}', '2025-10-27 16:23:51');
INSERT INTO public.session VALUES ('wzMBsw5C96QTCiGdNs52QsM-e-fKtGn-', '{"cookie":{"originalMaxAge":2592000000,"expires":"2025-10-27T11:40:18.536Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"user":{"username":"biggimmy","authenticated":true,"loginTime":"2025-09-27T11:40:18.536Z"}}', '2025-10-27 11:43:49');
INSERT INTO public.session VALUES ('vjMm4HlPg4u4EHSuccqIJCZ48g1TppsC', '{"cookie":{"originalMaxAge":2592000000,"expires":"2025-10-27T11:44:08.799Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"user":{"username":"biggimmy","authenticated":true,"loginTime":"2025-09-27T11:44:08.799Z"}}', '2025-10-27 11:44:26');
INSERT INTO public.session VALUES ('j_wuC3gEgzRBC6COYKHBcmrVWqbJwMqk', '{"cookie":{"originalMaxAge":2592000000,"expires":"2025-10-27T11:48:21.286Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"user":{"username":"andrea","authenticated":true,"loginTime":"2025-09-27T11:48:21.286Z"}}', '2025-10-27 12:17:11');
INSERT INTO public.session VALUES ('M0XlKQK8uQg9g5t9vJMnXEIoFoWwcJGJ', '{"cookie":{"originalMaxAge":2592000000,"expires":"2025-10-27T11:25:25.696Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"user":{"username":"biggimmy","authenticated":true,"loginTime":"2025-09-27T11:25:25.696Z"}}', '2025-10-27 11:30:52');
INSERT INTO public.session VALUES ('-eue9GiRfgu_Y6uNxBIUd3KHzmWGQK-p', '{"cookie":{"originalMaxAge":2592000000,"expires":"2025-10-27T10:45:09.692Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"user":{"username":"biggimmy","authenticated":true,"loginTime":"2025-09-27T10:45:09.691Z"}}', '2025-10-29 10:18:07');
INSERT INTO public.session VALUES ('efVMPn1cMrGOuxRMJ4fuO4EDm0i_ELb4', '{"cookie":{"originalMaxAge":2592000000,"expires":"2025-10-27T11:39:44.496Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"user":{"username":"biggimmy","authenticated":true,"loginTime":"2025-09-27T11:39:44.496Z"}}', '2025-10-27 11:39:52');
INSERT INTO public.session VALUES ('3dL9GFSIaQGb6frgpYxNkDYOg_U2_IQb', '{"cookie":{"originalMaxAge":2592000000,"expires":"2025-10-27T11:24:37.106Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"user":{"username":"biggimmy","authenticated":true,"loginTime":"2025-09-27T11:24:37.105Z"}}', '2025-10-27 11:25:00');


--
-- Data for Name: stores; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.stores VALUES (3, 'Sede di Torino', 'Corso Torino, 85, 10090 Buttigliera Alta TO', '3385486392', 'info@biggimmy.it', 'Lunedi-Venerdi 09:30-12:30, 15:30-19:30
Sabato 09:30-12:30', 'https://maps.app.goo.gl/6P97G3cR8YUHY9Zx7', false);
INSERT INTO public.stores VALUES (4, 'Sede di Aosta', 'Corso Saint-Martin-de-Corléans, 55, 11100 Aosta AO', '0165 086006', 'aosta@biggimmy.it', 'Lunedi-Venerdi 09-12:30, 15-19:30
Sabato 09-12:30, 15-19', 'https://maps.app.goo.gl/zTbmgiNPYLdd6QQ69', true);
INSERT INTO public.stores VALUES (5, 'Sede di Torino', 'Corso Torino, 85, 10090 Buttigliera Alta TO', '3385486392', 'info@biggimmy.it', 'Lunedi-Venerdi 09:30-12:30, 15:30-19:30
Sabato 09:30-12:30', 'https://maps.app.goo.gl/6P97G3cR8YUHY9Zx7', false);
INSERT INTO public.stores VALUES (6, 'Sede di Aosta', 'Corso Saint-Martin-de-Corléans, 55, 11100 Aosta AO', '0165 086006', 'aosta@biggimmy.it', 'Lunedi-Venerdi 09-12:30, 15-19:30
Sabato 09-12:30, 15-19', 'https://maps.app.goo.gl/zTbmgiNPYLdd6QQ69', true);
INSERT INTO public.stores VALUES (7, 'Sede di Torino', 'Corso Torino, 85, 10090 Buttigliera Alta TO', '3385486392', 'info@biggimmy.it', 'Lunedi-Venerdi 09:30-12:30, 15:30-19:30
Sabato 09:30-12:30', 'https://maps.app.goo.gl/6P97G3cR8YUHY9Zx7', false);
INSERT INTO public.stores VALUES (8, 'Sede di Aosta', 'Corso Saint-Martin-de-Corléans, 55, 11100 Aosta AO', '0165 086006', 'aosta@biggimmy.it', 'Lunedi-Venerdi 09-12:30, 15-19:30
Sabato 09-12:30, 15-19', 'https://maps.app.goo.gl/zTbmgiNPYLdd6QQ69', true);
INSERT INTO public.stores VALUES (9, 'Sede di Torino', 'Corso Torino, 85, 10090 Buttigliera Alta TO', '3385486392', 'info@biggimmy.it', 'Lunedi-Venerdi 09:30-12:30, 15:30-19:30
Sabato 09:30-12:30', 'https://maps.app.goo.gl/6P97G3cR8YUHY9Zx7', false);
INSERT INTO public.stores VALUES (10, 'Sede di Aosta', 'Corso Saint-Martin-de-Corléans, 55, 11100 Aosta AO', '0165 086006', 'aosta@biggimmy.it', 'Lunedi-Venerdi 09-12:30, 15-19:30
Sabato 09-12:30, 15-19', 'https://maps.app.goo.gl/zTbmgiNPYLdd6QQ69', true);
INSERT INTO public.stores VALUES (11, 'Sede di Torino', 'Corso Torino, 85, 10090 Buttigliera Alta TO', '3385486392', 'info@biggimmy.it', 'Lunedi-Venerdi 09:30-12:30, 15:30-19:30
Sabato 09:30-12:30', 'https://maps.app.goo.gl/6P97G3cR8YUHY9Zx7', false);
INSERT INTO public.stores VALUES (12, 'Sede di Aosta', 'Corso Saint-Martin-de-Corléans, 55, 11100 Aosta AO', '0165 086006', 'aosta@biggimmy.it', 'Lunedi-Venerdi 09-12:30, 15-19:30
Sabato 09-12:30, 15-19', 'https://maps.app.goo.gl/zTbmgiNPYLdd6QQ69', true);


--
-- Data for Name: user_addresses; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: user_carts; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.user_carts VALUES (5, 27, 871, 'Cioccolato al Latte 450g', 3, 3590, '2025-08-12 14:23:26.0585', '2025-08-12 14:31:46.876');
INSERT INTO public.user_carts VALUES (12, 29, 998, 'Neutro L', 6, 1398, '2025-08-12 15:04:38.345016', '2025-08-12 15:04:46.259');
INSERT INTO public.user_carts VALUES (13, 29, 1002, 'Rosso 600ml', 1, 450, '2025-08-12 15:04:46.827146', '2025-08-12 15:04:46.827146');
INSERT INTO public.user_carts VALUES (14, 29, 1006, 'Nero/Grigio L', 3, 1890, '2025-08-12 15:04:47.346628', '2025-08-12 15:04:47.346628');
INSERT INTO public.user_carts VALUES (18, 30, 1000, 'Nero 500ml', 22, 490, '2025-08-12 17:12:00.576581', '2025-08-12 17:12:06.842');


--
-- Data for Name: user_favorites; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: user_orders; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.user_orders VALUES (1, 1, 'order_123456', 4500, 'completed', '[{"id": "1", "name": "Whey Protein Isolate Vanilla", "quantity": 2, "price": 2500}, {"id": "2", "name": "Creatina Monoidrato", "quantity": 1, "price": 1500}]', '{"street": "Via Roma 123", "city": "Torino", "postalCode": "10100", "province": "TO"}', '{"street": "Via Roma 123", "city": "Torino", "postalCode": "10100", "province": "TO"}', '2025-08-09 21:37:22.285279', '2025-08-09 21:37:22.285279');
INSERT INTO public.user_orders VALUES (2, 7, 'order_789012', 3200, 'processing', '[{"id": "3", "name": "BCAA 2:1:1 Limone", "quantity": 1, "price": 2800}, {"id": "4", "name": "Magnesio + Potassio", "quantity": 1, "price": 400}]', '{"street": "Via Milano 45", "city": "Aosta", "postalCode": "11100", "province": "AO"}', '{"street": "Via Milano 45", "city": "Aosta", "postalCode": "11100", "province": "AO"}', '2025-08-10 21:37:22.285279', '2025-08-10 21:37:22.285279');
INSERT INTO public.user_orders VALUES (3, 8, 'order_345678', 2800, 'shipped', '[{"id": "5", "name": "Omega 3 Fish Oil", "quantity": 2, "price": 1400}]', '{"street": "Corso Venezia 78", "city": "Milano", "postalCode": "20121", "province": "MI"}', '{"street": "Corso Venezia 78", "city": "Milano", "postalCode": "20121", "province": "MI"}', '2025-08-11 18:37:22.285279', '2025-08-11 18:37:22.285279');
INSERT INTO public.user_orders VALUES (16, 7, 'order_ordered_1', 1850, 'ordered', '[{"id": "9", "name": "Pre-workout Energy", "quantity": 1, "price": 1850}]', '{"street": "Corso Dante 123", "city": "Torino", "postalCode": "10126", "province": "TO"}', '{"street": "Corso Dante 123", "city": "Torino", "postalCode": "10126", "province": "TO"}', '2025-08-11 20:57:22.783716', '2025-08-11 20:57:22.783716');
INSERT INTO public.user_orders VALUES (17, 8, 'order_ordered_2', 2100, 'ordered', '[{"id":"10","name":"EGG Protein","quantity":1,"price":2100}]', '{"street": "Via Po 77", "city": "Torino", "postalCode": "10124", "province": "TO"}', '{"street": "Via Po 77", "city": "Torino", "postalCode": "10124", "province": "TO"}', '2025-08-11 21:42:22.783716', '2025-08-11 21:42:22.783716');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'password123', 'user1@example.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'Italia', '2025-07-07 22:28:25.55778', '2025-07-07 22:28:25.55778', false);
INSERT INTO public.users VALUES (7, '$2b$10$l6kSWqB9.PAbHCRHVS/Hg.UNf05pZABARV/Gki385gTpLdwE.LFLy', 'lucaandrea264@gmail.com', 'andrea', 'lucà', '', '', '', '', '', 'Italia', '2025-07-10 13:11:25.0052', '2025-07-10 13:11:25.0052', false);
INSERT INTO public.users VALUES (8, '$2b$10$ro94oDvUdcDlrPf3RgX5EeY2WzcaXMlK53yMUuFzkODDMfvb5OnWm', 'mariorossi@gmail.com', 'mario', 'rossi', '', '', '', '', '', 'Italia', '2025-07-11 11:46:32.806611', '2025-07-11 11:46:32.806611', false);
INSERT INTO public.users VALUES (16, '$2b$10$/QAH6waMHrvhf0uf6Fai9uI48CXOhDrNS/HSByH7uJ2z67.bwB1yO', 'admin@example.it', 'Admin', 'User', NULL, NULL, NULL, NULL, NULL, 'Italia', '2025-08-11 21:51:07.621673', '2025-08-11 21:51:07.621673', true);
INSERT INTO public.users VALUES (22, '$2b$10$hashed_password', 'admin@biggimmy.it', 'Admin', 'BigGimmy', '+39 011 123 456', NULL, NULL, NULL, NULL, 'Italia', '2025-08-12 11:30:02.044675', '2025-08-12 11:30:02.044675', true);
INSERT INTO public.users VALUES (23, '$2b$10$hashed_password', 'mario.rossi@gmail.com', 'Mario', 'Rossi', '+39 333 111 2233', NULL, NULL, NULL, NULL, 'Italia', '2025-08-12 11:30:02.044675', '2025-08-12 11:30:02.044675', false);
INSERT INTO public.users VALUES (24, '$2b$10$hashed_password', 'laura.bianchi@email.it', 'Laura', 'Bianchi', '+39 347 555 7788', NULL, NULL, NULL, NULL, 'Italia', '2025-08-12 11:30:02.044675', '2025-08-12 11:30:02.044675', false);
INSERT INTO public.users VALUES (25, '$2b$10$hashed_password', 'giuseppe.verdi@outlook.it', 'Giuseppe', 'Verdi', '+39 328 999 0011', NULL, NULL, NULL, NULL, 'Italia', '2025-08-12 11:30:02.044675', '2025-08-12 11:30:02.044675', false);
INSERT INTO public.users VALUES (26, '$2b$10$hashed_password', 'anna.ferrari@libero.it', 'Anna', 'Ferrari', NULL, NULL, NULL, NULL, NULL, 'Italia', '2025-08-12 11:30:02.044675', '2025-08-12 11:30:02.044675', false);
INSERT INTO public.users VALUES (27, '$2b$10$fhxQ4PySwlXtSEldRM945eUI3QYuXHNwBxmHuT/GD5gQ0MPiZGa/.', 'frarossi89@gmail.com', 'francesco', 'rossi', '', '', '', '', '', 'Italia', '2025-08-12 14:23:15.802752', '2025-08-12 14:32:36.304', false);
INSERT INTO public.users VALUES (28, '$2b$10$TDZ21rLE0dO0UWMDVGXzHO45qzyglT2Zv0VtoZTsZ3guxvFrI.wjK', 'luirossi@email.com', 'luigi', 'rossi', '', '', '', '', '', 'Italia', '2025-08-12 14:39:47.962223', '2025-08-12 14:39:47.962223', false);
INSERT INTO public.users VALUES (29, '$2b$10$lXmoS82uyqvxoEoV/8ptBuOAd.LvDblGWFv24EJHvoR6VRX1PA1k2', 'savlatoredemarco@email.com', 'salvatore', 'de marco', '', '', '', '', '', 'Italia', '2025-08-12 15:04:36.918906', '2025-08-12 15:04:36.918906', false);
INSERT INTO public.users VALUES (30, '$2b$10$urmpAKQO3gLnbrSAobzWgOIbHCrFAPi39n6Xi1AoJvKBnL2YnGaGm', 'aledemarco@email.com', 'Alessio', 'De marco', '', '', '', '', '', 'Italia', '2025-08-12 17:11:59.190785', '2025-08-12 17:11:59.190785', false);


--
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE SET; Schema: drizzle; Owner: -
--

SELECT pg_catalog.setval('drizzle.__drizzle_migrations_id_seq', 1, false);


--
-- Name: brands_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.brands_id_seq', 25, true);


--
-- Name: contacts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.contacts_id_seq', 37, true);


--
-- Name: product_availability_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.product_availability_id_seq', 100, true);


--
-- Name: product_categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.product_categories_id_seq', 29, true);


--
-- Name: product_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.product_groups_id_seq', 141, true);


--
-- Name: product_images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.product_images_id_seq', 892, true);


--
-- Name: product_options_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.product_options_id_seq', 591, true);


--
-- Name: product_sizes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.product_sizes_id_seq', 930, true);


--
-- Name: product_slug_redirects_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.product_slug_redirects_id_seq', 4, true);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.products_id_seq', 1537, true);


--
-- Name: stores_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.stores_id_seq', 12, true);


--
-- Name: user_addresses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.user_addresses_id_seq', 1, false);


--
-- Name: user_carts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.user_carts_id_seq', 19, true);


--
-- Name: user_favorites_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.user_favorites_id_seq', 25, true);


--
-- Name: user_orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.user_orders_id_seq', 17, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 30, true);


--
-- Name: __drizzle_migrations __drizzle_migrations_pkey; Type: CONSTRAINT; Schema: drizzle; Owner: -
--

ALTER TABLE ONLY drizzle.__drizzle_migrations
    ADD CONSTRAINT __drizzle_migrations_pkey PRIMARY KEY (id);


--
-- Name: brands brands_name_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.brands
    ADD CONSTRAINT brands_name_unique UNIQUE (name);


--
-- Name: brands brands_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.brands
    ADD CONSTRAINT brands_pkey PRIMARY KEY (id);


--
-- Name: brands brands_slug_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.brands
    ADD CONSTRAINT brands_slug_unique UNIQUE (slug);


--
-- Name: contacts contacts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.contacts
    ADD CONSTRAINT contacts_pkey PRIMARY KEY (id);


--
-- Name: product_availability product_availability_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_availability
    ADD CONSTRAINT product_availability_pkey PRIMARY KEY (id);


--
-- Name: product_categories product_categories_name_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_categories
    ADD CONSTRAINT product_categories_name_unique UNIQUE (name);


--
-- Name: product_categories product_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_categories
    ADD CONSTRAINT product_categories_pkey PRIMARY KEY (id);


--
-- Name: product_categories product_categories_slug_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_categories
    ADD CONSTRAINT product_categories_slug_unique UNIQUE (slug);


--
-- Name: product_groups product_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_groups
    ADD CONSTRAINT product_groups_pkey PRIMARY KEY (id);


--
-- Name: product_groups product_groups_slug_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_groups
    ADD CONSTRAINT product_groups_slug_unique UNIQUE (slug);


--
-- Name: product_images product_images_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_images
    ADD CONSTRAINT product_images_pkey PRIMARY KEY (id);


--
-- Name: product_options product_options_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_options
    ADD CONSTRAINT product_options_pkey PRIMARY KEY (id);


--
-- Name: product_sizes product_sizes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_sizes
    ADD CONSTRAINT product_sizes_pkey PRIMARY KEY (id);


--
-- Name: product_slug_redirects product_slug_redirects_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_slug_redirects
    ADD CONSTRAINT product_slug_redirects_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: products products_slug_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_slug_unique UNIQUE (slug);


--
-- Name: session session_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);


--
-- Name: stores stores_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stores
    ADD CONSTRAINT stores_pkey PRIMARY KEY (id);


--
-- Name: user_addresses user_addresses_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_addresses
    ADD CONSTRAINT user_addresses_pkey PRIMARY KEY (id);


--
-- Name: user_carts user_carts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_carts
    ADD CONSTRAINT user_carts_pkey PRIMARY KEY (id);


--
-- Name: user_favorites user_favorites_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_favorites
    ADD CONSTRAINT user_favorites_pkey PRIMARY KEY (id);


--
-- Name: user_orders user_orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_orders
    ADD CONSTRAINT user_orders_pkey PRIMARY KEY (id);


--
-- Name: user_orders user_orders_snipcart_order_id_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_orders
    ADD CONSTRAINT user_orders_snipcart_order_id_unique UNIQUE (snipcart_order_id);


--
-- Name: users users_email_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: idx_product_slug_redirects_old_slug_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX idx_product_slug_redirects_old_slug_unique ON public.product_slug_redirects USING btree (old_slug);


--
-- Name: idx_product_slug_redirects_product_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_product_slug_redirects_product_id ON public.product_slug_redirects USING btree (product_id);


--
-- Name: idx_session_expire; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_session_expire ON public.session USING btree (expire);


--
-- Name: product_availability product_availability_product_id_products_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_availability
    ADD CONSTRAINT product_availability_product_id_products_id_fk FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- Name: product_availability product_availability_store_id_stores_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_availability
    ADD CONSTRAINT product_availability_store_id_stores_id_fk FOREIGN KEY (store_id) REFERENCES public.stores(id);


--
-- Name: product_groups product_groups_brand_id_brands_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_groups
    ADD CONSTRAINT product_groups_brand_id_brands_id_fk FOREIGN KEY (brand_id) REFERENCES public.brands(id);


--
-- Name: product_groups product_groups_category_id_product_categories_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_groups
    ADD CONSTRAINT product_groups_category_id_product_categories_id_fk FOREIGN KEY (category_id) REFERENCES public.product_categories(id);


--
-- Name: product_images product_images_product_id_products_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_images
    ADD CONSTRAINT product_images_product_id_products_id_fk FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- Name: product_options product_options_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_options
    ADD CONSTRAINT product_options_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- Name: product_sizes product_sizes_product_id_products_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_sizes
    ADD CONSTRAINT product_sizes_product_id_products_id_fk FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- Name: product_slug_redirects product_slug_redirects_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.product_slug_redirects
    ADD CONSTRAINT product_slug_redirects_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- Name: products products_brand_id_brands_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_brand_id_brands_id_fk FOREIGN KEY (brand_id) REFERENCES public.brands(id);


--
-- Name: products products_category_id_product_categories_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_category_id_product_categories_id_fk FOREIGN KEY (category_id) REFERENCES public.product_categories(id);


--
-- Name: products products_group_id_product_groups_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_group_id_product_groups_id_fk FOREIGN KEY (group_id) REFERENCES public.product_groups(id);


--
-- Name: user_addresses user_addresses_user_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_addresses
    ADD CONSTRAINT user_addresses_user_id_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: user_carts user_carts_user_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_carts
    ADD CONSTRAINT user_carts_user_id_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: user_favorites user_favorites_product_id_products_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_favorites
    ADD CONSTRAINT user_favorites_product_id_products_id_fk FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- Name: user_favorites user_favorites_user_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_favorites
    ADD CONSTRAINT user_favorites_user_id_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: user_orders user_orders_user_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_orders
    ADD CONSTRAINT user_orders_user_id_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

