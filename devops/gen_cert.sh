#i!bin/bash
cd /home/devops/proxy
docker-compose down
sudo certbot certonly --standalone -d pgadmin.stud-rd.io -d www.pgadmin.stud-rd.io
sudo certbot certonly --standalone -d stud-rd.io -d www.stud-rd.io
sudo certbot certonly --standalone -d ysiyou-api.stud-rd.io -d www.ysiyou-api.stud-rd.io
sudo certbot certonly --standalone -d jerome.stud-rd.io -d www.jerome.stud-rd.io
sudo certbot certonly --standalone -d ysiyou-app.stud-rd.io -d www.ysiyou-app.stud-rd.io
sudo certbot certonly --standalone -d ysiyou-io.stud-rd.io -d www.ysiyou-io.stud-rd.io
sudo certbot certonly --standalone -d ind-stock-app.stud-rd.io -d www.ind-stock-app.stud-rd.io
sudo certbot certonly --standalone -d ind-stock-api.stud-rd.io -d www.ind-stock-api.stud-rd.io
docker-compose up -d
