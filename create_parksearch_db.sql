create database ParkSearch;

create table USERS 
(   username varchar(50) not null,
    password varchar(50) not null,
    email varchar(100),
    address varchar(100),
    constraint USERS_PK primary key (username)
);

create table PARKS 
(   id char(5) not null,
    name varchar(50) not null,
    website_link varchar(300),
    description varchar(500),
    address varchar(100) not null,
    phone char(10),
    hours varchar(100),
    photo_link varchar(300),
    constraint PARKS_PK primary key (id)
);

create table REVIEWS
(   id char(5) not null,
    username varchar(50) not null,
    park_id char(5) not null,
    review varchar(500) not null,
    constraint REVIEWS_PK primary key (id),
    constraint REVIEWS_USERS_FK foreign key (username) references USERS (username),
    constraint REVIEWS_PARKS_FK foreign key (park_id) references PARKS (id)
);

create table FEATURES
(   feature varchar(50) not null,
    park_id char(5) not null,
    constraint PARKS_FEATURES_FK foreign key (park_id) references PARKS (id),
    constraint FEATURES_PK primary key (feature, park_id)
);