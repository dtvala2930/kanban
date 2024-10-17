# Define OS-specific commands
ifeq ($(OS),Windows_NT)
    DEL = del
    RMDIR = rmdir /s /q
else
    DEL = rm -f
    RMDIR = rm -rf
endif

# Install dependencies
i: install
install:
	@make get-env

	@make check-node-version
	@echo "Running npm install"
	npm install

	@make get-credentials

# Get credentials
get-credentials: 
	npm run crypto:random-key

# Set up env
get-env:
	cp .env.example .env

# Target for checking TypeScript types
check-types:
	npm run check-types

check-node-version:
	npm run check-node-version

pull-code:
	git pull

# config git
git-config:
	git config core.autocrlf false
	git rm --cached -r .
	git reset --hard

# Initialize the project (example placeholder)

init: install

lint:
	npm run lint:fix 

# Reinstall dependencies and clean up
re-install: clean install

# Clean up package-lock.json and node_modules
clean:
	@echo "Removing package-lock.json"
	$(DEL) package-lock.json
	@echo "Removing node_modules directory"
	$(RMDIR) node_modules
