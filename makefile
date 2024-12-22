# =============================================================================
# NX Strap Development Makefile
# =============================================================================

.PHONY: help install clean dev test lint build serve-all e2e testsuite storybook build-storybook

# Default target when just running 'make'
.DEFAULT_GOAL := help

# Colors for terminal output
BLUE := \033[36m
GREEN := \033[32m
YELLOW := \033[33m
RESET := \033[0m

# Help command to list all available targets
help: ## Show this help
	@echo "$(BLUE)NX Strap Development Commands:$(RESET)"
	@echo "$(GREEN)make install$(RESET)    - Install all dependencies"
	@echo "$(GREEN)make clean$(RESET)      - Clean build artifacts and dependencies"
	@echo "$(GREEN)make dev$(RESET)        - Start development servers"
	@echo "$(GREEN)make test$(RESET)       - Run all tests"
	@echo "$(GREEN)make lint$(RESET)       - Run linting"
	@echo "$(GREEN)make build$(RESET)      - Build all applications"
	@echo "$(GREEN)make serve-all$(RESET)  - Serve all applications"
	@echo "$(GREEN)make e2e$(RESET)        - Run end-to-end tests"
	@echo "$(GREEN)make testsuite$(RESET)  - Run all test jobs (test, lint, e2e)"
	@echo "$(GREEN)make storybook$(RESET)  - Start Storybook development server"
	@echo "$(GREEN)make build-storybook$(RESET)  - Build Storybook for production"

# Install dependencies
install: ## Install all dependencies
	@echo "$(BLUE)Installing dependencies...$(RESET)"
	pnpm install

# Clean build artifacts and dependencies
clean: ## Clean build artifacts and dependencies
	@echo "$(BLUE)Cleaning project...$(RESET)"
	rm -rf node_modules
	rm -rf dist
	rm -rf .next
	rm -rf out
	pnpm exec nx reset

# Start development servers
dev: ## Start development servers
	@echo "$(BLUE)Starting development servers...$(RESET)"
	pnpm exec nx run-many --target=serve --projects=diabetus,ApiGateway --parallel=2

# Run all tests
test: ## Run all tests
	@echo "$(BLUE)Running tests...$(RESET)"
	pnpm exec nx run-many --target=test --all

# Run linting
lint: ## Run linting
	@echo "$(BLUE)Running linting...$(RESET)"
	pnpm exec nx run-many --target=lint --all

# Build all applications
build: ## Build all applications
	@echo "$(BLUE)Building all applications...$(RESET)"
	pnpm exec nx run-many --target=build --all

# Serve all applications
serve-all: ## Serve all applications
	@echo "$(BLUE)Serving all applications...$(RESET)"
	pnpm exec nx run-many --target=serve --all --parallel=2

# Run end-to-end tests
e2e: ## Run end-to-end tests
	@echo "$(BLUE)Running end-to-end tests...$(RESET)"
	pnpm exec nx run-many --target=e2e --projects=diabetus-e2e,api-gateway-e2e

# Run all test jobs
testsuite: test lint e2e ## Run all test jobs
	@echo "$(BLUE)Running complete test suite...$(RESET)"
	@echo "$(YELLOW)Step 1/3: Running unit tests$(RESET)"
	@make test
	@echo "$(YELLOW)Step 2/3: Running linting$(RESET)"
	@make lint
	@echo "$(YELLOW)Step 3/3: Running end-to-end tests$(RESET)"
	@make e2e
	@echo "$(GREEN)Test suite completed!$(RESET)"

# Start Storybook development server
storybook: ## Start Storybook development server
	pnpm exec nx storybook UI-Shared

# Build Storybook for production
build-storybook: ## Build Storybook for production
	pnpm exec nx build-storybook UI-Shared
