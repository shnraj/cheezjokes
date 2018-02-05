drop table if exists jokes;
create table jokes (
	id text primary key not null,
	joke text not null,
	votes num default 0
);
