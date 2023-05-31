# 技术栈

Tauri + React + Typescript + jest

尽量完善单元测试吧。。


## 推荐的IDE组合

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)


# 打包
你可以针对Apple Silicon、基于Intel的Mac电脑或通用macOS二进制文件编译你的应用程序。默认情况下，CLI会构建一个针对你的机器架构的二进制文件。如果你想针对不同的目标进行编译，你必须首先通过运行
```
rustup target add aarch64-apple-darwin
```
或
```
rustup target add x86_64-apple-darwin
```
为该目标安装缺少的rust目标，然后你可以使用`--target`标志编译你的应用程序：
- `tauri build --target aarch64-apple-darwin` apple芯片的mac
- `tauri build --target x86_64-apple-darwin` Intel芯片的mac.