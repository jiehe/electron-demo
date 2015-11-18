
##安装依赖包
cnpm install


## 自动编译
babel ./app/jsx --out-dir=./app/js -w

## 构建gui
electron .


##编译gui
npm run-script package