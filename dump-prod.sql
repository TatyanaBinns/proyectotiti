--
-- PostgreSQL database dump
--

-- Dumped from database version 13.6 (Ubuntu 13.6-1.pgdg20.04+1)
-- Dumped by pg_dump version 13.3

-- Started on 2022-03-10 19:45:05

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
-- TOC entry 4060 (class 0 OID 0)
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
-- TOC entry 4061 (class 0 OID 0)
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
    description text,
    stationuuid text
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
-- TOC entry 4062 (class 0 OID 0)
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
-- TOC entry 4063 (class 0 OID 0)
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
-- TOC entry 4064 (class 0 OID 0)
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
    trackeruuid text NOT NULL,
    stationuuid text NOT NULL,
    location point NOT NULL,
    velocity real
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
-- TOC entry 4065 (class 0 OID 0)
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
    animalid integer,
    trackeruuid text NOT NULL
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
-- TOC entry 4066 (class 0 OID 0)
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
    last_name text,
    email text
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
-- TOC entry 4067 (class 0 OID 0)
-- Dependencies: 200
-- Name: users_uid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_uid_seq OWNED BY public.users.uid;


--
-- TOC entry 3881 (class 2604 OID 3716195)
-- Name: animals animalid; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.animals ALTER COLUMN animalid SET DEFAULT nextval('public.animals_animalid_seq'::regclass);


--
-- TOC entry 3884 (class 2604 OID 3716255)
-- Name: basestations stationid; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.basestations ALTER COLUMN stationid SET DEFAULT nextval('public.basestations_stationid_seq'::regclass);


--
-- TOC entry 3887 (class 2604 OID 3716295)
-- Name: logs logid; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.logs ALTER COLUMN logid SET DEFAULT nextval('public.logs_logid_seq'::regclass);


--
-- TOC entry 3882 (class 2604 OID 3716210)
-- Name: permissions permsid; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.permissions ALTER COLUMN permsid SET DEFAULT nextval('public.permissions_permsid_seq'::regclass);


--
-- TOC entry 3885 (class 2604 OID 3716272)
-- Name: pings pingid; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pings ALTER COLUMN pingid SET DEFAULT nextval('public.pings_pingid_seq'::regclass);


--
-- TOC entry 3883 (class 2604 OID 3716233)
-- Name: trackers trackerid; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.trackers ALTER COLUMN trackerid SET DEFAULT nextval('public.trackers_trackerid_seq'::regclass);


--
-- TOC entry 3880 (class 2604 OID 3716175)
-- Name: users uid; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN uid SET DEFAULT nextval('public.users_uid_seq'::regclass);


--
-- TOC entry 4044 (class 0 OID 3716192)
-- Dependencies: 203
-- Data for Name: animals; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.animals (animalid, name, type, description) FROM stdin;
\.


--
-- TOC entry 4050 (class 0 OID 3716252)
-- Dependencies: 209
-- Data for Name: basestations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.basestations (stationid, name, location, description, stationuuid) FROM stdin;
1	UnknownStation	(28.600673933160543,-81.19702573512788)	Unknown Base Station ID#$1	42
\.


--
-- TOC entry 4054 (class 0 OID 3716292)
-- Dependencies: 213
-- Data for Name: logs; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.logs (logid, entry, "timestamp", uid) FROM stdin;
3	{"body":{}}	2022-01-23 22:01:24.393964	1
4	{"body":{}}	2022-01-23 22:01:56.752608	1
5	{"body":{}}	2022-01-23 22:02:45.090936	1
6	{"raw":"","body":{}}	2022-01-23 22:05:32.608163	1
7	{"raw":"","body":{},"query":{"foo":"bar"}}	2022-01-23 22:06:38.147241	1
8	{"raw":"","body":{},"query":{"foo":"bar","fred":"joe"}}	2022-01-23 22:07:24.786046	1
9	{"body":{"postdata":"test","curl":"yestotally"},"query":{}}	2022-01-23 22:16:36.873615	1
10	{"body":{"postdata":"test","curl":"yestotally"},"query":{}}	2022-01-23 22:17:46.957367	1
11	{\n    "body": {},\n    "query": {}\n}	2022-01-24 21:36:49.491761	1
12	{\n    "body": {},\n    "query": {}\n}	2022-01-24 21:36:53.142112	1
13	{\n    "body": {},\n    "query": {}\n}	2022-01-27 00:39:56.266478	1
14	{\n    "body": {},\n    "query": {}\n}	2022-01-27 00:43:29.011088	1
15	{\n    "body": {},\n    "query": {}\n}	2022-01-30 02:11:37.383089	1
16	{\n    "body": {},\n    "query": {}\n}	2022-02-12 22:33:55.351118	1
17	{\n    "body": "I'm random data!",\n    "query": {}\n}	2022-02-12 22:34:26.53904	1
18	{\n    "body": {},\n    "query": {}\n}	2022-02-13 00:58:06.278368	1
19	{\n    "body": {},\n    "query": {\n        "message": "thingie"\n    }\n}	2022-02-14 01:25:42.417949	1
20	{\n    "body": {},\n    "query": {\n        "message": ""\n    }\n}	2022-02-14 01:27:03.860384	1
21	{\n    "body": {},\n    "query": {\n        "message": ""\n    }\n}	2022-02-14 01:29:19.572723	1
22	{\n    "body": {},\n    "query": {}\n}	2022-02-14 02:32:09.095879	1
23	{\n    "body": {},\n    "query": {\n        "message": "1234567890.0987654321"\n    }\n}	2022-02-17 05:14:53.081676	1
24	{\n    "body": {},\n    "query": {\n        "food": "pizza"\n    }\n}	2022-02-17 05:19:07.636232	1
25	{\n    "body": {},\n    "query": {\n        "d": "28.6024by81.2001at3.2fromUUID1"\n    }\n}	2022-02-17 05:19:40.061468	1
26	{\n    "body": {},\n    "query": {\n        "d": "28.6024by81.2001at3.2fromUUID1"\n    }\n}	2022-02-17 05:58:23.921659	1
27	{\n    "body": {},\n    "query": {}\n}	2022-02-17 06:05:05.912911	1
28	{\n    "body": {},\n    "query": {}\n}	2022-02-17 06:05:46.863963	1
29	{\n    "body": {},\n    "query": {\n        "d": "28.6024by81.2001at3.2fromUUID1"\n    }\n}	2022-02-17 17:55:01.888783	1
30	{\n    "body": {},\n    "query": {\n        "28.45N87.98Wtrackera": ""\n    }\n}	2022-02-18 00:10:48.052934	1
31	{\n    "body": {},\n    "query": {\n        "28.45N87.98Wtrackera": ""\n    }\n}	2022-02-18 00:14:56.638745	1
32	{\n    "body": {},\n    "query": {}\n}	2022-02-19 00:55:47.39677	1
33	{\n    "body": {},\n    "query": {\n        "Hellostringworkspleasetextindiscord": ""\n    }\n}	2022-03-04 16:11:22.002313	1
\.


--
-- TOC entry 4046 (class 0 OID 3716207)
-- Dependencies: 205
-- Data for Name: permissions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.permissions (permsid, type, uid) FROM stdin;
\.


--
-- TOC entry 4052 (class 0 OID 3716269)
-- Dependencies: 211
-- Data for Name: pings; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.pings (pingid, "timestamp", trackeruuid, stationuuid, location, velocity) FROM stdin;
2	2022-01-23 06:00:17.320129	4242	42	(28.365349,81.125664)	0.39
3	2022-01-23 06:07:18.606817	4242	42	(28.365349,81.125664)	0.39
4	2022-01-23 06:15:42.903916	4242	42	(28.365349,81.125664)	0.39
5	2022-01-23 22:01:24.5447	4242	42	(28.365349,81.125664)	0.39
6	2022-01-23 22:01:56.901324	4242	42	(28.365349,81.125664)	0.39
7	2022-01-23 22:02:45.236906	4242	42	(28.365349,81.125664)	0.39
8	2022-01-23 22:05:32.759903	4242	42	(28.365349,81.125664)	0.39
9	2022-01-23 22:06:38.294733	4242	42	(28.365349,81.125664)	0.39
10	2022-01-23 22:07:24.9408	4242	42	(28.365349,81.125664)	0.39
11	2022-01-23 22:16:37.030572	4242	42	(28.365349,81.125664)	0.39
12	2022-01-23 22:17:47.108117	4242	42	(28.365349,81.125664)	0.39
13	2022-01-24 21:36:49.513759	4242	42	(28.365349,81.125664)	0.39
14	2022-01-24 21:36:53.147848	4242	42	(28.365349,81.125664)	0.39
15	2022-01-27 00:39:56.296174	4242	42	(28.365349,81.125664)	0.39
16	2022-01-27 00:43:29.015972	4242	42	(28.365349,81.125664)	0.39
17	2022-01-30 02:11:37.420683	4242	42	(28.365349,81.125664)	0.39
18	2022-02-12 22:33:55.382495	4242	42	(28.365349,81.125664)	0.39
19	2022-02-12 22:34:26.544466	4242	42	(28.365349,81.125664)	0.39
20	2022-02-13 00:58:06.288198	4242	42	(28.365349,81.125664)	0.39
21	2022-02-14 01:25:42.447809	4242	42	(28.365349,81.125664)	0.39
22	2022-02-14 01:27:03.869489	4242	42	(28.365349,81.125664)	0.39
23	2022-02-14 01:29:19.580591	4242	42	(28.365349,81.125664)	0.39
24	2022-02-14 02:32:09.106135	4242	42	(28.365349,81.125664)	0.39
25	2022-02-17 05:14:53.113022	4242	42	(28.365349,81.125664)	0.39
26	2022-02-17 05:19:07.641767	4242	42	(28.365349,81.125664)	0.39
27	2022-02-17 05:19:40.066522	4242	42	(28.365349,81.125664)	0.39
28	2022-02-17 05:58:23.931222	4242	42	(28.365349,81.125664)	0.39
29	2022-02-17 06:05:05.920171	4242	42	(28.365349,81.125664)	0.39
30	2022-02-17 06:05:46.868504	4242	42	(28.365349,81.125664)	0.39
31	2022-02-17 17:55:01.900152	4242	42	(28.365349,81.125664)	0.39
32	2022-02-18 00:10:48.061559	4242	42	(28.365349,81.125664)	0.39
33	2022-02-18 00:14:56.646121	4242	42	(28.365349,81.125664)	0.39
34	2022-02-19 00:55:47.408026	4242	42	(28.365349,81.125664)	0.39
35	2022-03-04 16:11:22.056554	4242	42	(28.365349,81.125664)	0.39
\.


--
-- TOC entry 4048 (class 0 OID 3716230)
-- Dependencies: 207
-- Data for Name: trackers; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.trackers (trackerid, animalid, trackeruuid) FROM stdin;
2	-1	4242
\.


--
-- TOC entry 4042 (class 0 OID 3716172)
-- Dependencies: 201
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (uid, username, password_hash, first_name, last_name, email) FROM stdin;
1	systemuser		System	User	\N
\.


--
-- TOC entry 4068 (class 0 OID 0)
-- Dependencies: 202
-- Name: animals_animalid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.animals_animalid_seq', 1, false);


--
-- TOC entry 4069 (class 0 OID 0)
-- Dependencies: 208
-- Name: basestations_stationid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.basestations_stationid_seq', 36, true);


--
-- TOC entry 4070 (class 0 OID 0)
-- Dependencies: 212
-- Name: logs_logid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.logs_logid_seq', 33, true);


--
-- TOC entry 4071 (class 0 OID 0)
-- Dependencies: 204
-- Name: permissions_permsid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.permissions_permsid_seq', 1, false);


--
-- TOC entry 4072 (class 0 OID 0)
-- Dependencies: 210
-- Name: pings_pingid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.pings_pingid_seq', 35, true);


--
-- TOC entry 4073 (class 0 OID 0)
-- Dependencies: 206
-- Name: trackers_trackerid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.trackers_trackerid_seq', 36, true);


--
-- TOC entry 4074 (class 0 OID 0)
-- Dependencies: 200
-- Name: users_uid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_uid_seq', 1, true);


--
-- TOC entry 3892 (class 2606 OID 3716200)
-- Name: animals animals_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.animals
    ADD CONSTRAINT animals_pk PRIMARY KEY (animalid);


--
-- TOC entry 3900 (class 2606 OID 3716260)
-- Name: basestations basestations_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.basestations
    ADD CONSTRAINT basestations_pk PRIMARY KEY (stationid);


--
-- TOC entry 3902 (class 2606 OID 3799470)
-- Name: basestations basestations_un; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.basestations
    ADD CONSTRAINT basestations_un UNIQUE (stationuuid);


--
-- TOC entry 3906 (class 2606 OID 3716301)
-- Name: logs logs_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.logs
    ADD CONSTRAINT logs_pk PRIMARY KEY (logid);


--
-- TOC entry 3894 (class 2606 OID 3716215)
-- Name: permissions permissions_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT permissions_pk PRIMARY KEY (permsid);


--
-- TOC entry 3904 (class 2606 OID 3716275)
-- Name: pings pings_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pings
    ADD CONSTRAINT pings_pk PRIMARY KEY (pingid);


--
-- TOC entry 3896 (class 2606 OID 3716238)
-- Name: trackers trackers_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.trackers
    ADD CONSTRAINT trackers_pk PRIMARY KEY (trackerid);


--
-- TOC entry 3898 (class 2606 OID 3799488)
-- Name: trackers trackers_un; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.trackers
    ADD CONSTRAINT trackers_un UNIQUE (trackeruuid);


--
-- TOC entry 3890 (class 2606 OID 3716180)
-- Name: users users_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY (uid);


--
-- TOC entry 3910 (class 2606 OID 3716302)
-- Name: logs logs_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.logs
    ADD CONSTRAINT logs_fk FOREIGN KEY (uid) REFERENCES public.users(uid);


--
-- TOC entry 3907 (class 2606 OID 3716216)
-- Name: permissions permissions_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT permissions_fk FOREIGN KEY (uid) REFERENCES public.users(uid) ON DELETE CASCADE;


--
-- TOC entry 3909 (class 2606 OID 3799489)
-- Name: pings pings_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pings
    ADD CONSTRAINT pings_fk FOREIGN KEY (trackeruuid) REFERENCES public.trackers(trackeruuid);


--
-- TOC entry 3908 (class 2606 OID 3799472)
-- Name: pings pings_fk_2; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pings
    ADD CONSTRAINT pings_fk_2 FOREIGN KEY (stationuuid) REFERENCES public.basestations(stationuuid);


-- Completed on 2022-03-10 19:45:12

--
-- PostgreSQL database dump complete
--

