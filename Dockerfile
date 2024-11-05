FROM node:18.17.0 as build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


# 生产阶段
FROM node:18.17.0

WORKDIR /app

# 从构建阶段复制必要的文件
COPY --from=build-stage /app/package*.json ./
COPY --from=build-stage /app/.next ./.next
COPY --from=build-stage /app/public ./public
COPY --from=build-stage /app/next.config.js ./

# 只安装生产环境依赖
RUN npm install --only=production

# 暴露端口
EXPOSE 3000

# 启动应用
CMD ["npm", "start"]