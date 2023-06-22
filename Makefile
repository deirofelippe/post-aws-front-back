user_data = '{"nome":"Teste nome","data":"16/06/2023","cpf":"111.222.333-44","telefone":"21912345678","email":"teste@gmail.com","senha":"teste"}'

login_data = '{"email":"teste@gmail.com","senha":"teste"}'

local_url = http://localhost:8000
prod_url = http://18.231.40.15:8000
url = $(local_url)
backend_path = ./codigo/backend
env_path = $(backend_path)/.env
compose_path = ./codigo/backend/docker-compose.yaml

curl-create:
	 curl -X POST -d $(user_data) -H 'Content-Type: application/json' $(url)/user

curl-login:
	 curl -X POST -d $(login_data) -H 'Content-Type: application/json' $(url)/login

dk-init-config:
	@echo "creating docker database volume..."
	@docker volume create --name=database_mysql5
	@cp -vf $(backend_path)/.env.local $(backend_path)/.env
	@echo "init docker compose..."
	@docker compose -f $(compose_path) --env-file $(env_path).local up -d
	@echo "sleeping 5s..."
	@sleep 5
	@echo "creating database..."
	@docker compose -f $(compose_path) exec banco mysql -u root -proot -v -e 'source /scripts/banco.sql'
	@echo "install node packages..."
	@docker compose -f $(compose_path) exec node ash -c 'npm ci && npm run dev'

dk-up:
	@cp -vf $(backend_path)/.env.local $(backend_path)/.env
	@docker compose -f $(compose_path) --env-file $(env_path).local up -d
	@docker compose -f $(compose_path) exec node ash -c 'npm run dev'

dk-open-db:
	docker compose -f $(compose_path) exec banco bash

dk-open-node:
	docker compose -f $(compose_path) exec node ash

dk-up-aws:
	@cp -vf $(backend_path)/.env.aws $(backend_path)/.env
	@docker compose -f $(compose_path) --env-file $(env_path).aws up

dk-rm:
	docker container rm -f node banco phpmyadmin