--
-- PostgreSQL database dump
--

-- Dumped from database version 13.5 (Ubuntu 13.5-2.pgdg20.04+1)
-- Dumped by pg_dump version 13.3

-- Started on 2022-01-12 00:49:57

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
-- TOC entry 5 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- TOC entry 4056 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 203 (class 1259 OID 3716192)
-- Name: animals; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.animals (
    animalid integer NOT NULL,
    name text,
    type text,
    description text
);


--
-- TOC entry 202 (class 1259 OID 3716190)
-- Name: animals_animalid_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.animals_animalid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4057 (class 0 OID 0)
-- Dependencies: 202
-- Name: animals_animalid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.animals_animalid_seq OWNED BY public.animals.animalid;


--
-- TOC entry 209 (class 1259 OID 3716252)
-- Name: basestations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.basestations (
    stationid integer NOT NULL,
    name text,
    location point,
    description text
);


--
-- TOC entry 208 (class 1259 OID 3716250)
-- Name: basestations_stationid_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.basestations_stationid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4058 (class 0 OID 0)
-- Dependencies: 208
-- Name: basestations_stationid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.basestations_stationid_seq OWNED BY public.basestations.stationid;


--
-- TOC entry 213 (class 1259 OID 3716292)
-- Name: logs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.logs (
    logid integer NOT NULL,
    entry text,
    "timestamp" timestamp without time zone DEFAULT now() NOT NULL,
    uid integer
);


--
-- TOC entry 212 (class 1259 OID 3716290)
-- Name: logs_logid_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.logs_logid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4059 (class 0 OID 0)
-- Dependencies: 212
-- Name: logs_logid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.logs_logid_seq OWNED BY public.logs.logid;


--
-- TOC entry 205 (class 1259 OID 3716207)
-- Name: permissions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.permissions (
    permsid integer NOT NULL,
    type text,
    uid integer NOT NULL
);


--
-- TOC entry 204 (class 1259 OID 3716205)
-- Name: permissions_permsid_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.permissions_permsid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4060 (class 0 OID 0)
-- Dependencies: 204
-- Name: permissions_permsid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.permissions_permsid_seq OWNED BY public.permissions.permsid;


--
-- TOC entry 211 (class 1259 OID 3716269)
-- Name: pings; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pings (
    pingid integer NOT NULL,
    "timestamp" timestamp without time zone DEFAULT now() NOT NULL,
    trackerid integer NOT NULL,
    stationid integer NOT NULL,
    location point NOT NULL
);


--
-- TOC entry 210 (class 1259 OID 3716267)
-- Name: pings_pingid_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.pings_pingid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4061 (class 0 OID 0)
-- Dependencies: 210
-- Name: pings_pingid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.pings_pingid_seq OWNED BY public.pings.pingid;


--
-- TOC entry 207 (class 1259 OID 3716230)
-- Name: trackers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.trackers (
    trackerid integer NOT NULL,
    uuid text NOT NULL,
    animalid integer
);


--
-- TOC entry 206 (class 1259 OID 3716228)
-- Name: trackers_trackerid_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.trackers_trackerid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4062 (class 0 OID 0)
-- Dependencies: 206
-- Name: trackers_trackerid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.trackers_trackerid_seq OWNED BY public.trackers.trackerid;


--
-- TOC entry 201 (class 1259 OID 3716172)
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    uid integer NOT NULL,
    username text,
    password_hash text,
    first_name text,
    last_name text
);


--
-- TOC entry 200 (class 1259 OID 3716170)
-- Name: users_uid_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_uid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4063 (class 0 OID 0)
-- Dependencies: 200
-- Name: users_uid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_uid_seq OWNED BY public.users.uid;


--
-- TOC entry 3880 (class 2604 OID 3716195)
-- Name: animals animalid; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.animals ALTER COLUMN animalid SET DEFAULT nextval('public.animals_animalid_seq'::regclass);


--
-- TOC entry 3883 (class 2604 OID 3716255)
-- Name: basestations stationid; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.basestations ALTER COLUMN stationid SET DEFAULT nextval('public.basestations_stationid_seq'::regclass);


--
-- TOC entry 3886 (class 2604 OID 3716295)
-- Name: logs logid; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.logs ALTER COLUMN logid SET DEFAULT nextval('public.logs_logid_seq'::regclass);


--
-- TOC entry 3881 (class 2604 OID 3716210)
-- Name: permissions permsid; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.permissions ALTER COLUMN permsid SET DEFAULT nextval('public.permissions_permsid_seq'::regclass);


--
-- TOC entry 3884 (class 2604 OID 3716272)
-- Name: pings pingid; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pings ALTER COLUMN pingid SET DEFAULT nextval('public.pings_pingid_seq'::regclass);


--
-- TOC entry 3882 (class 2604 OID 3716233)
-- Name: trackers trackerid; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.trackers ALTER COLUMN trackerid SET DEFAULT nextval('public.trackers_trackerid_seq'::regclass);


--
-- TOC entry 3879 (class 2604 OID 3716175)
-- Name: users uid; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN uid SET DEFAULT nextval('public.users_uid_seq'::regclass);


--
-- TOC entry 4040 (class 0 OID 3716192)
-- Dependencies: 203
-- Data for Name: animals; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 4046 (class 0 OID 3716252)
-- Dependencies: 209
-- Data for Name: basestations; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 4050 (class 0 OID 3716292)
-- Dependencies: 213
-- Data for Name: logs; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 4042 (class 0 OID 3716207)
-- Dependencies: 205
-- Data for Name: permissions; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 4048 (class 0 OID 3716269)
-- Dependencies: 211
-- Data for Name: pings; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 4044 (class 0 OID 3716230)
-- Dependencies: 207
-- Data for Name: trackers; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 4038 (class 0 OID 3716172)
-- Dependencies: 201
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 4064 (class 0 OID 0)
-- Dependencies: 202
-- Name: animals_animalid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.animals_animalid_seq', 1, false);


--
-- TOC entry 4065 (class 0 OID 0)
-- Dependencies: 208
-- Name: basestations_stationid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.basestations_stationid_seq', 1, false);


--
-- TOC entry 4066 (class 0 OID 0)
-- Dependencies: 212
-- Name: logs_logid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.logs_logid_seq', 1, false);


--
-- TOC entry 4067 (class 0 OID 0)
-- Dependencies: 204
-- Name: permissions_permsid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.permissions_permsid_seq', 1, false);


--
-- TOC entry 4068 (class 0 OID 0)
-- Dependencies: 210
-- Name: pings_pingid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.pings_pingid_seq', 1, false);


--
-- TOC entry 4069 (class 0 OID 0)
-- Dependencies: 206
-- Name: trackers_trackerid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.trackers_trackerid_seq', 1, false);


--
-- TOC entry 4070 (class 0 OID 0)
-- Dependencies: 200
-- Name: users_uid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_uid_seq', 1, false);


--
-- TOC entry 3891 (class 2606 OID 3716200)
-- Name: animals animals_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.animals
    ADD CONSTRAINT animals_pk PRIMARY KEY (animalid);


--
-- TOC entry 3897 (class 2606 OID 3716260)
-- Name: basestations basestations_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.basestations
    ADD CONSTRAINT basestations_pk PRIMARY KEY (stationid);


--
-- TOC entry 3901 (class 2606 OID 3716301)
-- Name: logs logs_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.logs
    ADD CONSTRAINT logs_pk PRIMARY KEY (logid);


--
-- TOC entry 3893 (class 2606 OID 3716215)
-- Name: permissions permissions_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT permissions_pk PRIMARY KEY (permsid);


--
-- TOC entry 3899 (class 2606 OID 3716275)
-- Name: pings pings_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pings
    ADD CONSTRAINT pings_pk PRIMARY KEY (pingid);


--
-- TOC entry 3895 (class 2606 OID 3716238)
-- Name: trackers trackers_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.trackers
    ADD CONSTRAINT trackers_pk PRIMARY KEY (trackerid);


--
-- TOC entry 3889 (class 2606 OID 3716180)
-- Name: users users_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY (uid);


--
-- TOC entry 3906 (class 2606 OID 3716302)
-- Name: logs logs_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.logs
    ADD CONSTRAINT logs_fk FOREIGN KEY (uid) REFERENCES public.users(uid);


--
-- TOC entry 3902 (class 2606 OID 3716216)
-- Name: permissions permissions_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT permissions_fk FOREIGN KEY (uid) REFERENCES public.users(uid) ON DELETE CASCADE;


--
-- TOC entry 3904 (class 2606 OID 3716276)
-- Name: pings pings_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pings
    ADD CONSTRAINT pings_fk FOREIGN KEY (trackerid) REFERENCES public.trackers(trackerid);


--
-- TOC entry 3905 (class 2606 OID 3716281)
-- Name: pings pings_fk_1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pings
    ADD CONSTRAINT pings_fk_1 FOREIGN KEY (stationid) REFERENCES public.basestations(stationid);


--
-- TOC entry 3903 (class 2606 OID 3716239)
-- Name: trackers trackers_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.trackers
    ADD CONSTRAINT trackers_fk FOREIGN KEY (animalid) REFERENCES public.animals(animalid);


-- Completed on 2022-01-12 00:50:05

--
-- PostgreSQL database dump complete
--

