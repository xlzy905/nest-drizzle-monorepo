# Nest Monorepo Starter Template

## 项目说明

这是一个用于快速启动monorepo项目的模板。

## 项目结构

- packages/app-admin-api：API
- packages/app-api：API
- packages/database：db模块
- packages/shared：共享模块（工具库...）

## 技术栈

Service: `NestJs、drizzle-orm、postgres`
Lint/Format: `biome`

## 开始使用

1. 运行 `pnpm install` 安装依赖
2. 使用 `pnpm run build:pre` 预编译
3. 使用 `pnpm run docker:up` 启动docker pg数据库
4. 使用`pnpm --filter app-api run start:dev` 启动app-api服务
5. 用 `pnpm --filter app-admin-api run start:dev` 启动 app-admin-api服务
