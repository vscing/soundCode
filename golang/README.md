# golang

## go 命令
- go build 编译得到的可执行文件会保存在执行编译命令的当前目录下
- go build -o 名字.exe 还可以使用-o参数来指定编译后可执行文件的名字

## package xxx
- 声明 xxx 包，表明当前是一个可执行程序
- 只有main包有main函数。且项目只有唯一的main函数

## import
- import是包的导入语法
- 展现形式有两种
- 引入前加_ 代表只执行fmt包的init函数
```go
package main

import "fmt"

//import (
//	"fmt"
//)

// 引入前加_ 代表只执行fmt包的init函数
//import _ "fmt" 
//import (
//	_ "fmt"
//)

// 只有main包有main函数。且项目只有唯一的main函数。
func main() {
	fmt.Println("hello word")
}
```

## init和main

- 1 init函数是用于程序执行前做包的初始化的函数，比如初始化包里的变量等

  2 每个包可以拥有多个init函数

  3 包的每个源文件也可以拥有多个init函数

  4 同一个包中多个init函数的执行顺序go语言没有明确的定义(说明)

  5 不同包的init函数按照包导入的依赖关系决定该初始化函数的执行顺序

  6 init函数不能被其他函数调用，而是在main函数执行之前，自动被调用
- Go语言程序的默认入口函数(主函数)：func main()
   函数体用｛｝一对括号包裹。
- 相同点：
  两个函数在定义时不能有任何的参数和返回值，且Go程序自动调用。
- 不同点：
  init可以应用于任意包中，且可以重复定义多个。
  main函数只能用于main包中，且只能定义一个。
