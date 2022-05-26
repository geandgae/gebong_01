"use strict";

// plug-in
const gulp = require("gulp");
const sourcemaps = require("gulp-sourcemaps"); // sourcemaps
const sass = require("gulp-sass")(require("sass")); // sass
const minificss = require("gulp-minify-css"); // css min
const uglify = require("gulp-uglify-es").default; // js min
const obfusc = require("gulp-javascript-obfuscator"); // js 난독화
const fileinclude = require("gulp-file-include"); // include
const browsersync = require("browser-sync").create(); // browsersync
const webserver = require("gulp-webserver"); //webserver

// path
const app = "./app";
const src = "/src"; // 작업폴더
const dist = "/dist"; // 산출물
const assets = "/assets";
const html = "/html";
const path_src = {
  scss : app + src + assets + "/scss",
  css : app + src + assets + "/css",
  js : app + src + assets + "/js",
  html : app + src + html,
}
const path_dist = {
  css : app + dist + assets + "/css",
  js : app + dist + assets + "/js",
  root : app + dist,
}


// webserver
gulp.task("webstart", function () {
  gulp.src(path_dist.root).pipe(
    webserver({
      livereload: true,
      open: true,
      port: 8888,
    })
  );
});


// browsersync
gulp.task("browser_sync", () => {
  return new Promise( resolve => {
    browsersync.init({
      server: {
        baseDir : path_dist.root
      },
      port: 3000
    });

    resolve();
  });
});


// html_root
gulp.task("html_root", () => {
  return new Promise( resolve => {
      gulp
      .src(path_src.html + "/index.html" )
      .pipe(fileinclude({
        prefix: "@@",
        basepath: "@file"
      }))
      .pipe(gulp.dest(path_dist.root) )
      // .pipe(browsersync.reload({stream: true}));

      resolve();
  });
});

// html_comp
gulp.task("html_comp", () => {
  return new Promise( resolve => {
      gulp
      .src(path_src.html + "/**/*.html")
      .pipe(fileinclude({
        prefix: "@@",
        basepath: "@file"
      }))
      .pipe(gulp.dest(path_dist.root) )
      // .pipe(browsersync.reload({stream: true}));

      resolve();
  });
});


// Sass
gulp.task("sass_compile", function () {
  return new Promise( resolve => {
    let options = {
      outputStyle: "expanded" // nested, expanded, compact, compressed
      // , indentType: "space" // space, tab
      // , indentWidth: 4 // 
      // , precision: 8
      // , sourceComments: true // 코멘트 제거 여부
    };

    gulp
    .src(path_src.scss + "/*.scss") // 입력 경로
    .pipe(sass(options).on("error", sass.logError)) // options
    .pipe(gulp.dest(path_src.css)) // 출력 경로
    // .pipe(browsersync.reload({stream: true}));
    
    resolve();
  });

  // return (
  //   gulp
  //   .src(path_src.scss + "/*.scss") // 입력 경로
  //   .pipe(sourcemaps.init()) // sourcemaps 초기화
  //   .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
  //   .pipe(sourcemaps.write("maps")) // sourcemaps 경로
  //   .pipe(gulp.dest(path_src.css)) // 출력 경로
  // );
});


// css min
gulp.task("css_min", function () {
  return new Promise( resolve => {
    gulp
    .src(path_src.css + "/*.css") // 입력 경로
    .pipe(sourcemaps.init()) // sourcemaps 초기화
    .pipe(minificss()) // min 생성
    .pipe(sourcemaps.write("maps")) // sourcemaps 경로
    .pipe(gulp.dest(path_dist.css)) // 출력 경로
    // .pipe(browsersync.reload({stream: true}));
    
    resolve();
  });
});


// js_uglify
gulp.task("js_uglify", function () {
  return new Promise( resolve => {
    gulp
    .src(path_src.js + "/*.js") // 입력 경로
    .pipe(sourcemaps.init())
    .pipe(uglify(/* options */)) //min
    .pipe(obfusc({
      compact: true,
      renameGlobals : true,
      unicodeEscapeSequence : true,
      splitStrings : true,
      selfDefending : true,
      controlFlowFlattening : true,
    })) // 난독화
    .pipe(sourcemaps.write("maps")) // sourcemaps 경로
    .pipe(gulp.dest(path_dist.js)) // 출력 경로
    // .pipe(browsersync.reload({stream: true}));
    
    resolve();
  });
});

// fileinclude
// gulp.task("fileinclude", function() {
//   gulp.src([path_assets.html + "/*.html", path_assets.inc + "/*.html"])
//   // gulp.src([path_assets.html + "**/*.html"])
//     .pipe(fileinclude({
//       prefix: "@@",
//       basepath: "@file"
//     }))
//     .pipe(gulp.dest(app));
// });


// watch
// gulp.task("watch", function () {
//   // gulp.watch([app + "/**/*"], reload);
//   gulp.watch(path_assets.scss + "/*.scss", gulp.series("sass_compile"));
//   gulp.watch(path_assets.css +"/*.css", gulp.series("css_min"));
//   gulp.watch(path_assets.js + "/*.js", gulp.series("js_uglify"));
//   gulp.watch(path_assets.html + "/*.html", gulp.series("fileinclude"));
//   gulp.watch(path_assets.inc + "/*.html", gulp.series("fileinclude"));
// });

gulp.task("watch", () => {
  return new Promise( resolve => {
    gulp.watch(path_src.html + "/index.html", gulp.series("html_root"));
    gulp.watch(path_src.html + "/**/*.html", gulp.series("html_comp"));
    gulp.watch(path_src.scss + "/*.scss", gulp.series("sass_compile"));
    gulp.watch(path_src.css +"/*.css", gulp.series("css_min"));
    gulp.watch(path_src.js + "/*.js", gulp.series("js_uglify"));

    resolve();
  });
});


// start
gulp.task(
  "start", 
  gulp.parallel(
    "html_root",
    "html_comp",
    "sass_compile", 
    "css_min", 
    "js_uglify", 
    // "browser_sync",
    "webstart",
    "watch"
  )
);

















// webserver
// gulp.task("webstart", function () {
//   gulp.src(app).pipe(
//     webserver({
//       livereload: true,
//       open: true,
//       port: 8888,
//     })
//   );
// });

// const gulp = require("gulp");
// const fileinclude = require("gulp-file-include");
// const sass = require("gulp-sass")(require("sass"));
// const connect = require("gulp-connect");
// const webserver = require("gulp-webserver");
// // const test = require('gulp-spritesmith');
// const cleanCss = require("gulp-clean-css");
// const cssnano = require("gulp-cssnano");
// const uglify = require("gulp-uglify-es").default;
// const obfusc = require("gulp-javascript-obfuscator");
// const concat = require("gulp-concat");
// const sourcemaps = require("gulp-sourcemaps");

// /** * ==============================+ * 경로들을 담을 객체 생성 * ==============================+ */ 
// // var src = "project/src";
// // var dist = "project/dist";
// // var paths = { js: src + "/js/**/*.js", scss: src + "/sass/**/*.scss" };

// // html파일 인클루드
// gulp.task("fileinclude", async function () {
//   gulp
//     .src(["./app/src/index.html", "./app/src/sub/*.html"], { base: "./" })
//     .pipe(
//       fileinclude({
//         prefix: "@@",
//         basepath: "@file",
//       })
//     )
//     .pipe(gulp.dest("./"));
// });

// // Sass
// gulp.task("sass", async function () {
//   return (
//     gulp
//       .src("./app/src/scss/*.scss") // 입력 경로
//       .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
//       // .pipe(sass().on("error", sass.logError))
//       // .pipe(cleanCSS())
//       .pipe(gulp.dest("./app/src/css"))
//   ); // 출력 경로
// });

// // 일반 컴파일
// // gulp.task('sass', function () {
// //   return gulp
// //     .src('./src/scss/*.scss')  // 입력 경로
// //     .pipe(sass().on('error', sass.logError))
// //     .pipe(gulp.dest('./dist/css'));  // 출력 경로
// // });

// // css_nano
// gulp.task("css_nano", function () {
//   return gulp
//     .src("./app/src/css/*.css") // 입력 경로
//     .pipe(sourcemaps.init())
//     .pipe(cssnano())
//     // .pipe(sourcemaps.write()) // inline
//     .pipe(sourcemaps.write("../../maps")) // file
//     .pipe(gulp.dest("./app/src/css/min")); // 출력 경로
//     // ./app/src/**/*.css
// });

// // clean css
// gulp.task("clean", function () {
//   return gulp
//     .src("./app/src/scss/*.scss")
//     .pipe(concat("style.css"))
//     .pipe(cleanCss({ compatibiliy: "ie8" }));
// });

// // watch
// gulp.task("watch", function () {
//   gulp.watch("./app/src/scss/*.scss", gulp.series("sass"));
// });

// // 런타임 중 파일 감시
// // gulp.task('sass:watch', function () {
// //   gulp.watch('./src/scss/*.scss', ['sass']);  // 입력 경로와 파일 변경 감지 시 실행할 Actions(Task Name)
// // });

// // gulp 서버
// gulp.task("connect", function () {
//   connect.server({
//     root: "./app/src",
//     livereload: true,
//     port: 8001,
//   });
// });

// gulp.task("html", function () {
//   gulp.src("./app/src/*.html").pipe(connect.reload());
// });

// gulp.task("watch2", function () {
//   gulp.watch(["./app/src/*.html"], gulp.series("html")); // html 리로드
//   gulp.watch(["./app/scss/*.scss"], gulp.series("sass")); // sass 자동 컴파일
// });

// // gulp 서버2
// gulp.task("webstart", function () {
//   gulp.src("./app/src").pipe(
//     webserver({
//       livereload: true,
//       open: true,
//       port: 8888,
//     })
//   );
// });

// // uglify
// gulp.task("uglify", function () {
//   return (
//     gulp
//       // .src("./app/src/js/*.js", {sourcemaps: true}) // 입력 경로
//       .src("./app/src/js/*.js") // 입력 경로
//       .pipe(sourcemaps.init())
//       .pipe(uglify())
      
//       // .pipe(
//       //   uglify({
//       //     mangle: true,
//       //     preserveComments: "some", //all some
//       //   })
//       // )
//       .pipe(obfusc({
//         compact: true,
//         renameGlobals : true,
//         unicodeEscapeSequence : true,
//         splitStrings : true,
//         selfDefending : true,
//         controlFlowFlattening : true,
//       }))
//       // .pipe(sourcemaps.write()) // inline
//       .pipe(sourcemaps.write("../../maps")) // file
//       .pipe(gulp.dest("./app/src/js/dist"))
//   ); // 출력 경로
// });

// // gulp.task("concat", function () {
// //   return gulp
// //     .src(paths.css.src, { sourcemaps:  true })
// //     .pipe(sass(options.scss).on('error', sass.logError))
// //     .pipe(concat('all.css')) // <<<- 이렇게 추가^^
// //     .pipe(dest(paths.css.dest, { sourcemaps:  true }))
// // })


// // start
// gulp.task("start", gulp.parallel("watch", "webstart", "css_nano", "uglify"));

// // image sprite
// // gulp.task('sprite', function(){
// //   var spriteData = gulp.src('./sp_img/*.jpg')
// //   .pipe(smith({
// //       imgName: 'sp_all.jpg',
// //       padding: 4,
// //       cssName: 'sp_all.css'
// //   }));
// //   spriteData.img.pipe(gulp.dest('./app/src/img'));
// //   spriteData.css.pipe(gulp.dest('./app/src/css'));
// // });

// // gulp.task('start', gulp.series(['connect', 'watch']));
// // gulp.task('start', gulp.series(['sass:watch']));
// // gulp.task('start', gulp.series(['sprite']));
// // gulp.task('start', gulp.series(['watch', 'webserver']));
// // gulp.task('start', gulp.series("webserver"));
// // exports.start = series(webserver, parallel(watch));

// // const start = gulp.series(webserver, gulp.parallel(watch));
// // exports.start = start;

// // const { series, src, dest } = require('gulp');
// // function javascript(done) {
// //   done();
// // }
// // function css() {
// //   return src('src/css/*.css')
// //     .pipe(dest('build/css'));
// // }
// // exports.build = series(javascript, css);

// // 자세한 옵션은 "https://github.com/sass/node-sass#options" 에서 확인 필요.
// // var sass_opt = {
// // 	/**
// // 	  * outputStyle (Type : String  , Default : nested)
// // 	  * CSS의 컴파일 결과 코드스타일 지정
// // 	  * Values : nested, expanded, compact, compressed
// // 	*/
// // 	outputStyle:"nested",
// // 	/**
// // 	  * indentType (>= v3.0.0 , Type : String , Default : space)
// // 	  * 컴파일 된 CSS의 "들여쓰기" 의 타입
// // 	  * Values : space , tab
// // 	*/
// // 	indentType:"space",
// // 	/**
// // 	  * indentWidth (>= v3.0.0, Type : Integer , Default : 2)
// // 	  * 컴파일 된 CSS의 "들여쓰기" 의 갯수
// // 	*/
// // 	indentWidth:2,
// // 	/**
// // 	 * precision (Type :  Integer , Default : 5)
// // 	 * 컴파일 된 CSS의 소수점 자리수.
// // 	*/
// // 	precision:5,
// // 	/**
// // 	 * sourceComments (Type : Boolean , Default : false)
// // 	 * 컴파일 된 CSS에 원본소스의 위치와 줄수 주석표시.
// // 	*/
// // 	sourceComments:false
// // }

// // gulp.task('sass', function () {
// //   return gulp.src('./src/scss/**/*.scss')
// //     .pipe(sass(sass_opt).on('error', sass.logError))
// //     .pipe(gulp.dest('./src/'));
// // });





// 참고

// // plug-in 연결
// const gulp = require("gulp");                   // gulp 연결
// const Fiber = require('fibers');                // dart sass 이용시 gulp-sass와 세트 플러그인
// const dartSass = require('dart-sass');          // dart-sass 연결(기본)
// const scss = require('gulp-sass');              // gulp-sass 연결(기본)
// const sourcemaps = require('gulp-sourcemaps');  // css.map 파일 생성용
// const minificss = require('gulp-minify-css');   // css 압축
// const autoprefixer = require('autoprefixer');   // 고려할 브라우저 버전 설정
// const postCss = require('gulp-postcss');        // 설정한 브라우저에 버전에 맞춰 css 컴파일
// const rename = require('gulp-rename');          // 파일 이름 변경

// // autoprefixer 옵션: 브라우저 버전 지정
// const apfBrwsowsers = [
//   'ie > 0', 'chrome > 0', 'firefox > 0'  // 브라우저의 모든 버전 적용
//   //'last 2 versions'                    // 최신 브라우저 기준 하위 2개의 버전까지 적용
// ];

// // 소스 파일 경로
// const src = './src';
// const dist = './dist';
// const assets = '/assets';
// // 작업폴더 경로 ('src'에서 작업한 것을)
// const PATH = {
//   HTML: src + '/html',
//   ASSETS: {
//     CSS: src + assets + '/css',
//     FONTS: src + assets + '/fonts',
//     IMAGES: src + assets + '/images',
//     JS: src + assets + '/js',
//     LIB: src + assets + '/lib',
//   }
// }
// // 산출물 경로 ('dist'에 생성한다.)
// const DEST_PATH = {
//   HTML: dist,
//   ASSETS: {
//     CSS: dist + assets +'/css',
//     FONTS: dist + assets +'/fonts',
//     IMAGES: dist + assets +'/images',
//     JS: dist + assets +'/js',
//     LIB: dist + assets + '/lib',
//   }
// };

// // scss 컴파일
// gulp.task('scss:compile', () => {
//   return new Promise(resolve => {
//     const options = {
//       //scss 옵션 정의
//       scss : {
//         outputStyle: "expanded",  // 컴파일 스타일: nested(default), expanded, compact, compressed
//         indentType: "space",      // 들여쓰기 스타일: space(default), tab
//         indentWidth: 2,           // 들여쓰기 칸 수 (Default : 2)
//         precision: 8,             // 컴파일 된 CSS 의 소수점 자리수 (Type : Integer , Default : 5)
//         sourceComments: true,     // 코멘트 제거 여부 (Default : false)
//         compiler: dartSass,       // 컴파일 도구
//         fiber: Fiber,             // 컴파일 오버해드 방지
//       },
//     };
//     gulp.src( PATH.ASSETS.CSS + '/*.scss' )                   // 컴파일 대상 scss파일 찾기
//       // *.css 생성
//       .pipe( sourcemaps.init() )                              // 소스맵 작성
//       .pipe( scss(options.scss).on('error', scss.logError) )  // scss 옵션 적용, scss 작성시 watch가 멈추지 않도록 logError 설정
//       .pipe( postCss(options.postcss) )                       // 하위 브라우저 고려
//       .pipe( sourcemaps.write() )                             // 소스맵 적용
//       .pipe( gulp.dest(DEST_PATH.ASSETS.CSS) )                // 컴파일 후 css파일이 생성될 목적지 설정
//       // *.min.css 생성
//       .pipe( minificss() )                                    // 컴파일된 css 압축
//       .pipe( rename({ suffix: '.min' }) )                     // 압축파일 *.min.css 생성
//       .pipe( sourcemaps.write() )                             // 소스맵 적용
//       .pipe( gulp.dest(DEST_PATH.ASSETS.CSS) )                // 컴파일 후 css파일이 생성될 목적지 설정
//     resolve();
//   });
// });

// // default : 실행
// gulp.task( 'default', gulp.series(['scss:compile']));