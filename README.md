# 快速开始



**chatgpt-server**是一个集成chatGPT的`token`获取和基于`token`或`api-key`的chatGPT内容生成服务，它基于Nest.js开发。



### 开发OR测试

#### 第一步：安装依赖

```shell
npm i
```



#### 第二步：运行

```shell
npm run start:dev
```



### 目录说明

```
src
├── app.controller.spec.ts
├── app.controller.ts
├── app.module.ts
├── app.service.ts
├── core //全局服务
│   ├── filter
│   │   └── http-exception //异常处理
│   │       ├── http-exception.filter.spec.ts
│   │       └── http-exception.filter.ts
│   ├── interceptor //拦截器
│   │   └── response
│   │       ├── response.interceptor.spec.ts
│   │       └── response.interceptor.ts
│   └── utils //工具类
│       └── dynamicImport.ts
├── get-token //token获取服务
│   ├── get-token.controller.spec.ts
│   ├── get-token.controller.ts
│   ├── get-token.dto.ts
│   ├── get-token.interface.ts
│   ├── get-token.module.ts
│   ├── get-token.service.spec.ts
│   └── get-token.service.ts
├── gpt-main //chatGPT内容生成服务
│   ├── gpt-main.controller.spec.ts
│   ├── gpt-main.controller.ts
│   ├── gpt-main.dto.ts
│   ├── gpt-main.interface.ts
│   ├── gpt-main.module.ts
│   ├── gpt-main.service.spec.ts
│   └── gpt-main.service.ts
└── main.ts


```



### 接口说明



#### 接口地址

| 接口地址              | 用途                 | 请求方式 |
| --------------------- | -------------------- | -------- |
| /api                  | Swagger接口页        | -        |
| /api/v1/gpt/getInfo   | chatGPT内容生成      | POST     |
| /api/v1/token/getInfo | chatGPT验证token获取 | GET      |



#### 参数说明

1. `/api/v1/gpt/getInfo`：请求方式：`POST` 请求体格式：`JSON`

| 字段名 | 值类型 | 有效值   | 必传 | 说明                                                         |
| ------ | ------ | -------- | ---- | ------------------------------------------------------------ |
| mode   | String | "1"、"2" | true | 生成模式，1使用api-key请求chatGPT生成，2使用token代理方式请求 |
| type   | String | "1"      | true | 内容回传类型，1为默认类型                                    |
| opts   | Object | 视下文   | true | 生成时必要参数                                               |

`opts`有效值：

| 字段名          | 值类型  | 必传  | 说明                                                         |
| --------------- | ------- | ----- | ------------------------------------------------------------ |
| key             | String  | true  | api-key或token，传哪个视`mode`的值，切勿传错                 |
| content         | String  | true  | 问题内容                                                     |
| isFollow        | Boolean | true  | 是否跟随历史消息，默认值`false`                              |
| parentMessageId | String  | false | 跟随历史消息的id，当`isFollow`为`true`时必传                 |
| opts            | Object  | false | 其他参数，详见：https://github.com/transitive-bullshit/chatgpt-api    该参数会合并`new ChatGPTAPI`时传入的参数 |

2. `/api/v1/token/getInfo`：请求方式`GET` 请求体格式：Query-Param

| 字段名   | 值类型 | 必传 | 说明                             |
| -------- | ------ | ---- | -------------------------------- |
| type     | String | true | 类型，1为获取token，2为刷新token |
| email    | String | true | openAI账号邮箱                   |
| password | String | true | 密码                             |



### 提供支持的库

感谢以下库提供核心服务的支持：

- [transitive-bullshit/chatgpt-api](https://github.com/transitive-bullshit/chatgpt-api)
- [allanoricil/chat-gpt-authenticator](https://github.com/AllanOricil/chat-gpt-authenticator)



### 构建和部署

> 可参考Nest.js项目的构建部署方式，以下为作者提供简单的方式
>

#### 1、构建

```shell
npm run build
```



#### 2、部署

1. 拷贝你的项目文件（包括dist产出目录）至服务器部署目录，且必须使用除了中国大陆和中国香港之外的服务器部署。

2. 项目下执行：

   ```shell
   npm install --production
   ```

3. 运行：

   ```shell
   npm run start:prod
   ```



### LICENSE

MIT



------



### 项目可能有不足之处，但满足使用，建议有能力的朋友可二次开发

#### 欢迎对本项目提出意见和建议，本人会采纳学习的

##### 有问题可联系email：trk12138@outlook.com