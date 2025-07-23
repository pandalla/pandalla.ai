# 🚀 Pandalla.AI 部署指南

本文档说明如何使用提供的shell脚本来部署和管理Pandalla.AI应用。

## 📋 可用脚本

### 1. `dev-start.sh` - 本地开发环境
**用途**: 不使用Docker，直接运行Next.js开发服务器

**特性**:
- ✅ 自动检测并安装依赖
- ✅ 端口冲突自动处理（从3000开始递增）
- ✅ 自动停止已存在的开发服务器
- ✅ 构建检查，确保代码无错误
- ✅ 彩色日志输出
- ✅ 优雅的信号处理

**使用方法**:
```bash
./dev-start.sh
```

### 2. `docker-stop.sh` - 停止Docker服务
**用途**: 停止所有相关的Docker容器和服务

**特性**:
- ✅ 停止Docker Compose服务
- ✅ 清理项目相关容器
- ✅ 清理Next.js相关容器
- ✅ 可选的资源清理
- ✅ 显示当前Docker状态

**使用方法**:
```bash
./docker-stop.sh
```

### 3. `docker-deploy.sh` - Docker生产部署
**用途**: 使用Docker Compose部署生产环境

**特性**:
- ✅ 完整的环境检查
- ✅ 端口冲突自动处理（从8001开始递增）
- ✅ 自动停止现有服务
- ✅ 无缓存构建镜像
- ✅ 健康检查和状态监控
- ✅ 实时日志查看选项

**使用方法**:
```bash
./docker-deploy.sh
```

## 🔧 端口管理

所有脚本都包含智能端口管理：

- **开发环境**: 默认端口3000，冲突时自动递增到3001, 3002...
- **生产环境**: 默认端口8001，冲突时自动递增到8002, 8003...

## 📖 使用场景

### 场景1: 开发调试
```bash
# 启动开发环境
./dev-start.sh

# 当你完成开发后，按 Ctrl+C 停止
```

### 场景2: 生产部署
```bash
# 部署到生产环境
./docker-deploy.sh

# 如需停止服务
./docker-stop.sh
```

### 场景3: 从开发切换到生产
```bash
# 1. 停止开发服务器 (Ctrl+C)
# 2. 部署生产环境
./docker-deploy.sh
```

### 场景4: 更新部署
```bash
# 停止现有服务
./docker-stop.sh

# 重新部署
./docker-deploy.sh
```

## 🛠️ 故障排除

### 常见问题

**Q: 脚本提示权限错误**
```bash
chmod +x *.sh
```

**Q: 端口被占用**
脚本会自动处理端口冲突，使用下一个可用端口。

**Q: Docker构建失败**
```bash
# 清理Docker缓存
docker system prune -f
./docker-deploy.sh
```

**Q: 开发服务器无法启动**
```bash
# 检查Node.js版本
node --version  # 建议 >= 18.0.0

# 清理node_modules
rm -rf node_modules package-lock.json
npm install
./dev-start.sh
```

### 日志查看

**开发环境日志**:
开发服务器会直接在终端显示日志

**生产环境日志**:
```bash
# 查看实时日志
docker-compose logs -f

# 查看特定服务日志
docker-compose logs -f nextjs-app

# 查看最近的日志
docker-compose logs --tail=100
```

### 性能监控

**查看容器状态**:
```bash
docker-compose ps
```

**查看资源使用**:
```bash
docker stats
```

**查看系统使用**:
```bash
docker system df
```

## 🔒 安全注意事项

1. **生产环境**使用环境变量管理敏感配置
2. **防火墙**确保只开放必要端口
3. **SSL/TLS**在生产环境中配置HTTPS
4. **定期更新**保持依赖项最新

## 📝 环境变量

你可以创建 `.env` 文件来配置环境变量：

```bash
# .env 文件示例
NODE_ENV=production
PORT=3000
DATABASE_URL=your_database_url
API_KEY=your_api_key
```

## 🚨 紧急操作

**立即停止所有服务**:
```bash
# 停止开发服务器
pkill -f "next dev"

# 停止Docker服务
./docker-stop.sh

# 紧急停止所有Docker容器
docker stop $(docker ps -q)
```

**完全清理**:
```bash
# 清理所有Docker资源
docker system prune -a --volumes -f

# 清理node_modules
rm -rf node_modules package-lock.json
```

## 📞 获取帮助

如果遇到问题：

1. 查看脚本输出的彩色日志信息
2. 检查 `docker-compose logs` 的详细日志
3. 确认所有依赖都已正确安装
4. 检查端口是否被其他应用占用

---

**Happy Coding!** 🎉