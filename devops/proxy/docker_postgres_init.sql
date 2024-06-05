create database jehan_crossfit;
create user jehan_crossfit_user with password 'P@ssword' login connection limit -1 superuser;
grant all privileges on database jehan_crossfit to jehan_crossfit_user;

create database ysiyou;
create user ysiyou_user with password 'P@ssword' login connection limit -1 superuser;
grant all privileges on database ysiyou to ysiyou_user;

create database studerdio;
create user studerdio_user with password 'P@ssword' login connection limit -1 superuser;
grant all on database studerdio to studerdio_user;

create database gestion_stock_indm;
create user gsindm_admin with password 'P@ssword' login connection limit -1 superuser;
grant all on database gestion_stock_indm to gsindm_admin;