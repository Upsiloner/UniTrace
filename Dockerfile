# 使用官方 Node.js 镜像作为基础镜像
FROM node:18.19.1 as builder
ENV NODE_ENV=production

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 pnpm-lock.yaml 到工作目录
COPY package.json pnpm-lock.yaml ./

# 安装 pnpm
RUN npm config set registry https://registry.npmmirror.com
RUN npm install -g pnpm

# 使用 pnpm 安装依赖
RUN pnpm install

# 复制项目的所有文件到工作目录
COPY . .

# 构建项目
RUN pnpm run build

# 暴露 Nuxt 3 默认的端口
EXPOSE 3000

# 启动 Nuxt 3 应用
CMD ["pnpm", "start"]
