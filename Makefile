VERSION=0.0.1
REPOSITORY=luisbrito
NODEJS=${REPOSITORY}/node:16

GREEN=\033[0;32m
NO_COLOR=\033[0m

default:
	@echo "Hello!"
	@echo "${GREEN}build => build containers (run only once at first time) ${NO_COLOR}"
	@echo " "
	@echo "${GREEN}For developers:${NO_COLOR}"
	@echo "up => Start the dev environment"
	@echo "teardown => Stop all containers and remove them"
	@echo "install => Install project dependencies"
	@echo "tests => Run tests"
	@echo "clean => Remove project dependencies"
	@echo " "
	@echo "${GREEN}For admin's:${NO_COLOR}"
	@echo "login => Log in to container repository"
	@echo "build => Build the base container"
	@echo "publish => Publish the base container"
	@echo "server.console => Run server container console"
	@echo "assistant.console => Run assistant container console"

# Application commands

clean:
	docker-compose run --rm --user=1000 assistant rm -fr node_modules .pm2 .pm2-dev
	@echo "Dependency directory removed, run "make install" to install them again"

install:
	docker-compose run --rm --user=1000 assistant npm install

tests:
	docker-compose run --rm --user=1000 assistant npm run test

up:
	docker-compose run --rm --user=1000 assistant npm install
	docker-compose up api

teardown:
	docker-compose down

# Sysadmin commands

build: base.build

publish: base.publish

base.build:
	docker build --no-cache -t ${NODEJS} -f Dockerfile .

base.publish:
	docker push ${NODEJS}

base.console:
	docker run --rm --user=1000 -it ${NODEJS} sh

server.console:
	docker-compose run --rm --user=1000 api sh

assistant.console:
	docker-compose run --rm --user=1000 assistant sh

login:
	@echo "Authenticating on container repository"
	docker login --username=${REPOSITORY}
