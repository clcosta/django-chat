PY3 = python
APP = 
DJ_HOST = 0.0.0.0
DJ_PORT = 8000
## Roda o servidor, verifica o codigo antes,  realiza as migracoes e depois colocando o server no ar.
.PHONY: all
all: check migrate run ## 
	@make check
	@make migrate
	@make run

## Roda o check do django pra verificar se tem algum erro
.PHONY: check
check: ## 
	$(PY3) manage.py check

## Roda o makemigrations do django e o migrate
.PHONY: migrate
migrate: migrations ## 
	$(PY3) manage.py migrate

.PHONY: migrations
migrations:
	$(PY3) manage.py makemigrations $(APP)

## Somente roda o servidor sem fazer nenhuma checagem antes
.PHONY: run
run: ##
	$(PY3) manage.py runserver $(DJ_HOST):$(DJ_PORT)

.PHONY: help
help:
	@printf "Comandos do make\n"

	@awk '{ \
			if ($$0 ~ /^.PHONY: [a-zA-Z\-\_0-9]+$$/) { \
				helpCommand = substr($$0, index($$0, ":") + 2); \
				if (helpMessage) { \
					printf "\033[36m%-20s\033[0m %s\n", \
						helpCommand, helpMessage; \
					helpMessage = ""; \
				} \
			} else if ($$0 ~ /^[a-zA-Z\-\_0-9.]+:/) { \
				helpCommand = substr($$0, 0, index($$0, ":")); \
				if (helpMessage) { \
					printf "\033[36m%-20s\033[0m %s\n", \
						helpCommand, helpMessage; \
					helpMessage = ""; \
				} \
			} else if ($$0 ~ /^##/) { \
				if (helpMessage) { \
					helpMessage = helpMessage"\n                     "substr($$0, 3); \
				} else { \
					helpMessage = substr($$0, 3); \
				} \
			} else { \
				if (helpMessage) { \
					print "\n                     "helpMessage"\n" \
				} \
				helpMessage = ""; \
			} \
		}' \
		$(MAKEFILE_LIST)