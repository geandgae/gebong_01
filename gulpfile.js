"use strict";

// plug-in
const gulp = require("gulp");
const sourcemaps = require("gulp-sourcemaps");

// path
const app = "./app";
const assets = "/assets";
const dist = "/dist";
const path_assets = {
  scss : app + assets +"/scss",
  css : app + assets +"/css",
  js : app + assets +"/js",
}
const path_dist = {
  css : app + dist +"/css",
  js : app + dist +"/js",
}


// start
gulp.task("start", async function(){
  console.log(assets);
  console.log(dist);
  console.log(path_assets);
  console.log(path_dist);
});
// gulp.task("start", gulp.parallel("watch", "webstart", "css_nano", "uglify"));

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
