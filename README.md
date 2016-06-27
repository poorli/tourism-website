# 旅游网站运行说明

### 环境配置

#### 安装node
去官网下载安装即可

#### 下载依赖
进入myapp目录
运行 npm install

#### 安装mongodb
1.下载并安装mongodb

注意安装目录在配置环境变量时需要

2.启动mongodb
window环境下需要配置环境变量mongod，mongod.exe执行文件在mongobd安装目录的bin下面

项目所需数据文件在 myapp/moudles/export-data目录下 

运行 mongod --dbpath 项目所需数据文件目录 （--dbpath 为指定数据库的目录）
	
#### 导入数据库
运行 mongorestore 项目所需数据文件目录

mongodb数据导入可参考(http://www.jb51.net/article/52498.html)

### 运行项目
在myapp下运行npm start

### note：
有问题可以尝试自己找资料解决，不行的话可以问我