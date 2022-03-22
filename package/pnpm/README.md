# pnpm

## Monorepo

```text
Monorepo是管理项目代码的一个方式，指在一个项目仓库 (repo) 中管理多个模块/包 (package)，不同于常见的每个模块建一个 repo。
├── packages
|   ├── pkg1
|   |   ├── package.json
|   ├── pkg2
|   |   ├── package.json
├── package.json
```

### 缺点

```text
monorepo 最主要的好处是统一的工作流和Code Sharing。比如我想看一个 pacakge 的代码、了解某段逻辑，不需要找它的 repo，直接就在当前 repo；当某个需求要修改多个 pacakge 时，不需要分别到各自的 repo 进行修改、测试、发版或者 npm link，直接在当前 repo 修改，统一测试、统一发版。只要搭建一套脚手架，就能管理（构建、测试、发布）多个 package。

不好的方面则主要是 repo 的体积较大。特别是，因为各个 package 理论上都是独立的，所以每个 package 都维护着自己的 dependencies，而很大的可能性，package 之间有不少相同的依赖，而这就可能使install时出现重复安装，使本来就很大的 node_modues 继续膨胀（我称这为「依赖爆炸」...）。
```

### 解决方案

```text
目前最常见的 monorepo 解决方案是 Lerna 和 yarn 的 workspaces 特性。其中，lerna 是一个独立的包，其官网的介绍是：

a tool that optimizes the workflow around managing multi-package repositories with git and npm.
上面提到的 Babel, create-react-app 等都是用 lerna 进行管理的。在项目 repo 中以lerna.json声明 packages 后，lerna 为项目提供了统一的 repo 依赖安装 (lerna bootstrap)，统一的执行 package scripts (lerna run)，统一的 npm 发版 (lerna publish) 等特性。对于「依赖爆炸」的问题，lerna 在安装依赖时提供了--hoist选项，相同的依赖，会「提升」到 repo 根目录下安装，但……太鸡肋了，lerna 直接以字符串对比 dependency 的版本号，完全相同才提升，semver 约定在这并不起作用。

具体的使用方法移步 Lerna 官网：https://lerna.js.org

而使用 yarn 作为包管理器的同学，可以在 package.json 中以 workspaces 字段声明 packages，yarn 就会以 monorepo 的方式管理 packages。相比 lerna，yarn 突出的是对依赖的管理，包括 packages 的相互依赖、packages 对第三方的依赖，yarn 会以 semver 约定来分析 dependencies 的版本，安装依赖时更快、占用体积更小；但欠缺了「统一工作流」方面的实现。

yarn 官网对 workspace的详细说明：Workspaces | Yarn

lerna 和 yarn-workspace 并不是只能选其一，大多 monorepo 即会使用 lerna 又会在 package.json 声明 workspaces。这样的话，无论你的包管理器是 npm 还是 yarn，都能发挥 monorepo 的优势；要是包管理是 yarn ，lerna 就会把依赖安装交给 yarn 处理。
```

```text
迁移 pnpm 的实践
如果想了解如何从一个完整的 yarn workspace 项目迁移到 pnpm workspace，其实也不用去专门研究 vite 或者 vue3 的 pr 是怎么迁移的，在 pnpm 官网上有一篇来自于社区的文章: Replacing Lerna + Yarn with PNPM Workspaces (地址: https://www.raulmelo.dev/blog/replacing-lerna-and-yarn-with-pnpm-workspaces)。

作者算是比较详细的介绍了如果从yarn workspace(项目基于 lerna，但区别其实不大)，迁移到 pnpm workspace 需要做的文件改动以及项目变更。大概是这样的一个流程:

替换掉脚本命令，与 yarn 相关的命令替换为: pnpm <command> 或者 pnpm run <command>

删除掉顶部 package.json 中的 yarn workspace 配置

替换掉的 workspace 配置用 pnpm-workspace.yaml 文件替代

调整 pipeline、以及 Dockfile 或者其他 CI/CD 配置文件里面的依赖安装命令

删除掉 yarn.lock 文件(这里也可以使用笔者开发完善的 pnpm import 命令来完成 yarn.lock 文件转换 /笑 )

调整构建相关的脚本(如果有 lerna 相关的 build 脚本)

添加一个 .npmrc 文件用于自定义一些 pnpm 的 CLI 行为表现(也可以不用)

感兴趣的同学可以去参考一下，或者直接和笔者进行交流也可以(笔者在字节也迁移过比较多这一类型的项目，对此也有一些经验，这里就不做过多的介绍了)。
```
