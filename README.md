# 旅游网站运行说明
所有运行命令都在项目根目录下

### 环境配置

#### 安装node
去官网下载安装即可

#### 下载依赖
进入myapp目录
运行 npm install

#### 安装mongodb
1.下载并安装mongodb

注意安装目录在配置环境变量时需要

###启动mongodb
2.启动mongodb
window环境下需要配置环境变量mongod，mongod.exe执行文件在mongobd安装目录的bin下面

运行 npm run mongodb
	
#### 导入数据库
运行 npm run mongorestore

### 运行项目
在myapp下运行npm start

### note：
有问题可以尝试自己找资料解决，不行的话可以问我