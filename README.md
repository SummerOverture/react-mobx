### 注意事项 ###
+ 1: 全局安装webpack和webpack-dev-server。
+ 2: dev-back需要较高版本的node。
+ 3: 在windows下可能会有问题，目前已经解决掉已经已经发现的两个问题。

### 开始
项目分为前后端，前端使用webpack-dev-server 端口为9011。
后端使用express提供数据，开发环境中前端所有请求将会被转发至9010端口。

 `预备`
- npm install -g webpack webpack-dev-server
- yarn

 `开发：`
- npm run dev-front
- npm run dev-back

 `build`：
- npm run build:report
- npm run pro-back

#### 就&nbsp;酱
