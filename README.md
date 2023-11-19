# studyBook

create-react-app을 사용하지 않고, react 프로젝트를 구축하기

<br/>

### 0. 개발환경 설정

-   yarn
-   react, react-dom
-   typescript
-   scss
-   webpack

</br>

```jsx
yarn init //package.json 생성

//필요 라이브러리 설치
//react
yarn add react react-dom
//typescript
yarn add -D typescript @types/react @types/react-dom
//scss
yarn add —save-dev sass-loader sass css-loader style-loader
//webpack
yarn add -D webpack webpack-cli webpack-dev-server webpack-merge html-webpack-plugin ts-loader
```

</br>

### webpack이란?

웹 어플리케이션의 규모가 커지면서 프로젝트마다 엄청난 자원의 파일들이 하나로 모여 구성된다. 이때, 파일들의 관계는 복잡하고 무겁기 때문에 브라우저가 이해하고 로드하는데 시간이 소요된다. 이 문제를 해결하기 위해 webpack이라는 모듈 번들러를 사용해 파일들의 의존성 관계를 정리 및 최적화, jsx파일을 합쳐 하나의 자바스크립트 파일로 만들어준다.

번들러: 여러개의 파일을 하나로 묶어주는 도구

</br>

**webpack 3가지로 구성**

-   webpack.config.js : webpack 관련 공통 설정

```jsx
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development", //실행모드(development_개발, production_배포_기본값, none))
    entry: "./src/index.tsx", // 번들링 시작할(최초로 import) 파일 지정
    output: {
        // 출력 (번들링된 파일명과 내보낼 경로 설정)
        filename: "[hash].js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "/",
        clean: true, //이전에 생성된 번들링은 지우기
    },
    resolve: {
        //모듈을 해석하는 방식 설정
        extensions: [".js", ".ts", ".jsx", ".tsx"], //확장자 생략
    },
    module: {
        //사용할 loader 설정
        rules: [
            //처리할 규칙
            {
                test: /\.(js|ts|tsx)$/i,
                exclude: /node_modules/, //일치하는 파일중에서 제외할 파일
                use: {
                    loader: "ts-loader",
                },
            },
            //scss
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"],
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
    ],
    devtool: "inline-source-map",
    // test
    devServer: {
        //webpack-dev-server(개발환경에서 구현한 부분 확인할 수 있게 함) 사용할 수 있게 하고, 관련설정 해줌
        static: "./dist",
        hot: true, //변경한 코드가 실시간으로 반영되게 함
        open: true, //서버가 시작되면 브라우저가 자동으로 열리게 함
    },
};
```

</br>

-   webpack.dev.js(development\_개발모드 설정)

```jsx
const { merge } = require("webpack-merge");
const config = require("./webpack.config.js");
module.exports = merge(config, {
    mode: "development",
    devtool: "eval",
    devServer: {
        host: "localhost",
        historyApiFallback: true,
        port: 3000,
    },
});
```

</br>

-   webpack.prod.js (production\_배포모드 설정)

```jsx
const { merge } = require("webpack-merge");
const config = require("./webpack.config.js");

module.exports = merge(config, {
    mode: "production",
    devtool: "hidden-source-map",
});
```

</br>
</br>

**tsconfig.json설정(ts→js 변환할 때 세부적인 설정)**

```jsx

{
    "compilerOptions": {
        "target": "es2016",
        "jsx": "react-jsx", // JSX코드의 해석형식 지정,
        "module": "esnext",
        "lib": ["dom", "dom.iterable", "esnext"],
        "strict": true,
        "allowJs": true, // JS파일을 TS파일에 불러올 수 있는지 설정
        "skipLibCheck": true,
        "esModuleInterop": true,
        "allowSyntheticDefaultImports": true,
        "forceConsistentCasingInFileNames": true,
        "noFallthroughCasesInSwitch": true,
        "moduleResolution": "node",
        "resolveJsonModule": true,
        "isolatedModules": true,

        "baseUrl": "./", // 상대 경로를 해석할 기준 경로 설정,
        "paths": {
            "@src/*": ["src/*"]
        },
        "outDir": "./dist"
    },
    "include": ["src"], // 프로젝트 내에서 컴파일할 대상 지정,
    "exclude": ["node_modules"], // 컴파일 제외 대상 지정,
    "typeRoots": ["src/types"]
}
```

</br>

**package.json에 추가**

```jsx
"scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "dev": "webpack-dev-server --config webpack.dev.js --open --hot",
        "build": "webpack --config webpack.prod.js",
        "start": "webpack --config webpack.dev.js"
    }
```

</br>
</br>

### 폴더구조

```
public/
| _index.html
src/
| _components/
|
| _sass/
|  |
|  | _abstracts/ //색상, 폰트 기본 설정, 공통으로 사용되는 디자인 변수값
|  |
|  | _base/ //기본적으로 필요한 스타일
|  |    _reset.scss
|  |    _typography.scss
|  |
|  | _components/ //ui 컴포넌트 단위별로 스타일을 정의
|  |
|  | _layout/ //레이아웃을 정의함
|  |
|  | _pages/
|  |
|  | _themes/ //다른 종류의 모드를(라이트모드, 다크모드)지원할 때 정의함
|  |
|  | _vendors/ //외부 라이브러리를 사용하는 경우, 정의함
|  |
|  | _main.scss
|  |
| _App.tsx
|
| _index.tsx
|
| _.gitignore
|
| _package.json
|
| _README.md
|
| _tsconfig.json
|
| _webpack.config.js
|
| _webpack.dev.js
|
| _webpack.prod.js
|
| _yarn.lock
```

</br>

### 1. 시작하기

`이미지 처리`

`Custom SelectBox`

### 참조
[webpack.kr](https://webpack.kr/configuration/resolve/)

[CRA없이 React 프로젝트 구축하기 (velog.io)](https://velog.io/@shyunju7/CRA%EC%97%86%EC%9D%B4-React-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EA%B5%AC%EC%B6%95%ED%95%98%EA%B8%B0)
