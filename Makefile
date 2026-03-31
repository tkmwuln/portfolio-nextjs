
# Portfolio Website Development Makefile

# Default target
.DEFAULT_GOAL := help

# Node / Next.js commands
NPM := npm
NEXT := npx next

# ──────────────────────────────────────────────────────────────────────────────
# Development commands
# ──────────────────────────────────────────────────────────────────────────────

dev: ## Start local development server
	@$(NPM) run dev

dev-turbo: ## Start dev server with Turbopack
	@$(NPM) run dev -- --turbo

build: ## Build production bundle
	@$(NPM) run build

start: ## Start production server (requires build first)
	@$(NPM) run start

clean: ## Clean build artifacts and cache
	@rm -rf .next
	@rm -rf node_modules/.cache
	@echo "✓ Cleaned build cache"

# ──────────────────────────────────────────────────────────────────────────────
# Code quality
# ──────────────────────────────────────────────────────────────────────────────

lint: ## Run ESLint
	@$(NPM) run lint

lint-fix: ## Run ESLint with auto fix
	@$(NPM) run lint -- --fix

typecheck: ## Run TypeScript type checking
	@npx tsc --noEmit

check: lint typecheck ## Run all code checks (lint + typecheck)

# ──────────────────────────────────────────────────────────────────────────────
# Database / Prisma
# ──────────────────────────────────────────────────────────────────────────────

db-push: ## Push schema changes to database
	@npx prisma db push

db-generate: ## Generate Prisma client
	@npx prisma generate

db-studio: ## Open Prisma Studio database browser
	@npx prisma studio

db-seed: ## Seed database with portfolio projects (via Prisma)
	@npx tsx scripts/seed-projects.ts

db-seed-sample: ## Seed database with sample data (dev only)
	@node add-sample-data.js

# ──────────────────────────────────────────────────────────────────────────────
# Dependencies
# ──────────────────────────────────────────────────────────────────────────────

install: ## Install project dependencies
	@$(NPM) install

update: ## Update all dependencies
	@$(NPM) update

outdated: ## List outdated dependencies
	@$(NPM) outdated

reset: clean ## Full reset: remove node_modules and reinstall
	@rm -rf node_modules
	@rm -f package-lock.json
	@$(NPM) install
	@echo "✓ Full reset complete"

# ──────────────────────────────────────────────────────────────────────────────
# Help
# ──────────────────────────────────────────────────────────────────────────────

help: ## Show this help message
	@echo "Portfolio Website Makefile"
	@echo "──────────────────────────────────────────────────────────────────"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'
	@echo ""
	@echo "Usage: make [command]"

.PHONY: dev dev-turbo build start clean lint lint-fix typecheck check db-push db-generate db-studio db-seed db-seed-sample install update outdated reset help
