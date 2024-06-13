"use strict";

// plug-in
const gulp = require("gulp");
const fileinclude = require("gulp-file-include");
const terser = require("gulp-terser"); // min
const obfusc = require("gulp-javascript-obfuscator"); // 난독화
const sass = require("gulp-dart-sass");
const cleanCSS = require("gulp-clean-css");
const fs = require("fs-extra");
const browserSync = require("browser-sync").create();


// path
const src = "./app/src";
const dist = "./dist";
const assets = "/assets";
const html = "/html";
const pathSrc = {
  root: src,
  scss: `${src + assets}/scss`,
  css: `${src + assets}/css`,
  fonts: `${src + assets}/fonts`,
  js: `${src + assets}/js`,
  images: `${src + assets}/images`,
  html: src + html,
};
const pathDist = {
  root: dist,
  css: `${dist + assets}/css`,
  fonts: `${dist + assets}/fonts`,
  images: `${dist + assets}/images`,
  js: `${dist + assets}/js`,
  html: dist + html,
};


// dist 폴더를 삭제하는 task 정의
gulp.task("clean", function () {
  return import("del").then((del) => {
    return del.deleteAsync([pathDist.root]);
  });
});

// HTML 파일 인클루드
gulp.task("fileinclude", function () {
  return gulp
    .src([
      pathSrc.root + "/**/*.html", // 불러올 파일의 위치
      "!" + pathSrc.html + "/inc/**/*.html", // include 위치
    ])
    .pipe(fileinclude({
      prefix: "@@",
      basepath: "@file",
      context: {
        assets: "/assets",
        html: "/html"
      }
    }))
    .pipe(gulp.dest(pathDist.root))
    .pipe(browserSync.stream());
});

// JavaScript 파일 병합 및 난독화
gulp.task("scripts", function () {
  // js 난독화
  const jsTask = gulp
    .src(pathSrc.js + "/*.js")
    // min 파일 생성
    // .pipe(terser())
    // 난독화
    .pipe(obfusc())
    .pipe(gulp.dest(pathDist.js))
    .pipe(browserSync.stream());

  // JSON 파일 복사
  const jsonTask = gulp
    .src(pathSrc.js + "/*.json")
    .pipe(gulp.dest(pathDist.js))
    .pipe(browserSync.stream());

  return Promise.all([jsTask, jsonTask]);
});

// SCSS 컴파일 작업
gulp.task("sass", function() {
  return gulp.src(pathSrc.scss + "/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(cleanCSS())
    .pipe(gulp.dest(pathDist.css))
    .pipe(browserSync.stream());
});

// 폰트 파일 복사
gulp.task("fonts", function() {
  return fs.copy(pathSrc.fonts, pathDist.fonts)
    .then(() => {
      console.log("Fonts copied successfully!");
    })
    .catch(err => {
      console.error("Error copying fonts:", err);
    });
});

// 이미지 파일 복사
gulp.task("images", function() {
  return fs.copy(pathSrc.images, pathDist.images)
    .then(() => {
      console.log("Images copied successfully!");
    })
    .catch(err => {
      console.error("Error copying images:", err);
    });
});

// server
gulp.task("server", function () {
  browserSync.init({
    server: {
      baseDir: pathDist.root
    }
  });
  // watch
  gulp.watch(pathSrc.html + "/**/*.html", gulp.series("fileinclude"));
  gulp.watch(pathSrc.js + "/**/*", gulp.series("scripts"));
  gulp.watch(pathSrc.scss + "/**/*", gulp.series("sass"));
});

// gulp start
gulp.task("default", gulp.series("clean", "fileinclude", "sass", "scripts", "fonts", "images", "server"));
