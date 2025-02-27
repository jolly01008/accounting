# 基於官方 MongoDB 映像
FROM mongo:latest

# 安装 mongo 客户端
# RUN apt-get update && apt-get install -y mongodb-clients


# 將初始化腳本複製到容器中
# 這些腳本會在 MongoDB 啟動時自動執行
COPY ./mongo-scripts/ /docker-entrypoint-initdb.d/