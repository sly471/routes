drop table if exists trucks;
drop table if exists dropoffs;

CREATE TABLE trucks (
    id          INT UNSIGNED NOT NULL,
    latitude    FLOAT NOT NULL,
    longitude   FLOAT NOT NULL,
    maxload     INT NOT NULL,
    currentload INT NOT NULL,
    routeWeight INT NOT NULL,
    routeMile   FLOAT NOT NULL,
    routeColor  VARCHAR(10) NOT NULL
);

CREATE TABLE dropoffs (
    id        INT UNSIGNED NOT NULL,
    name      VARCHAR(30) NOT NULL,
    latitude  VARCHAR(20) NOT NULL,
    longitude VARCHAR(20) NOT NULL,
    dpload    INT NOT NULL,
    weight    INT NOT NULL,
    route     INT
);


insert into trucks values (1,-66.0699,18.4483, 50, 0, 0, 0, "0xff0000");
insert into trucks values (2,-66.6134,18.0112, 23, 0, 0, 0, "0x00ff00");
insert into trucks values (3,-65.6564,18.3161, 41, 0, 0, 0, "0x0000ff");
insert into trucks values (4,-67.1409,18.2003, 35, 0, 0, 0, "0xf0000f");
insert into trucks values (5,-65.9573,18.3817, 51, 0, 0, 0, "0x0f00f0");
insert into trucks values (6,-66.0347,18.2313, 89, 0, 0, 0, "0xf0f0f0");

insert into dropoffs values (1, "dp01", 18.160004971207684, -66.53447148240036, 9, -1, 0); 
insert into dropoffs values (2, "dp02", 18.179535839584663, -66.65392809882180, 1, -1, 0); 
insert into dropoffs values (3, "dp03", 18.187638915363223, -67.13454040818877, 3, -1, 0); 
insert into dropoffs values (4, "dp04", 18.003018896324330, -65.92035688741342, 7, -1, 0); 
insert into dropoffs values (5, "dp05", 18.328019320754315, -65.73804709759875, 5, -1, 0); 
insert into dropoffs values (6, "dp06", 18.330284447592938, -66.01589488896154, 5, -1, 0); 
insert into dropoffs values (7, "dp07", 18.183649444245000, -66.09338754910438, 9, -1, 0); 
insert into dropoffs values (8, "dp08", 18.300164113713663, -66.14924409206635, 8, -1, 0); 
insert into dropoffs values (9, "dp09", 18.378813097733854, -65.85797003681914, 9, -1, 0); 
insert into dropoffs values (10, "dp10", 18.121064383342280, -66.40141713110165, 8, -1, 0); 
insert into dropoffs values (11, "dp11", 18.017176534932350, -65.87604953558149, 7, -1, 0); 
insert into dropoffs values (12, "dp12", 18.011683846124537, -65.75803641409550, 4, -1, 0); 
insert into dropoffs values (13, "dp13", 18.365166567964476, -66.40944679273161, 3, -1, 0); 
insert into dropoffs values (14, "dp14", 17.996756615620324, -66.49823437248355, 1, -1, 0); 
insert into dropoffs values (15, "dp15", 18.072378034591970, -66.33230874229976, 3, -1, 0); 
insert into dropoffs values (16, "dp16", 18.376754018996650, -66.00626533192153, 5, -1, 0); 
insert into dropoffs values (17, "dp17", 18.152651772659420, -66.11213712185574, 6, -1, 0); 
insert into dropoffs values (18, "dp18", 18.121179099882003, -66.08554782655044, 1, -1, 0); 
insert into dropoffs values (19, "dp19", 18.043281372942275, -65.82449778386537, 7, -1, 0); 
insert into dropoffs values (20, "dp20", 18.077961332600900, -66.76740483736950, 3, -1, 0); 
insert into dropoffs values (21, "dp21", 18.351474510217106, -66.54298906660739, 6, -1, 0); 
insert into dropoffs values (22, "dp22", 18.175999401481320, -65.97495818937813, 9, -1, 0); 
insert into dropoffs values (23, "dp23", 18.107299131339737, -65.91832846193466, 1, -1, 0); 
insert into dropoffs values (24, "dp24", 18.080489749396670, -65.81991015506944, 5, -1, 0); 
insert into dropoffs values (25, "dp25", 18.248595070732115, -66.33269480362624, 9, -1, 0); 
