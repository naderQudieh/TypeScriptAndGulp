//Load gulp
var gulp = require('gulp');

//Load gulp plugins
var uglify = require('gulp-uglify'); //minify
var rename = require('gulp-rename'); //renaming to min
var spsave = require('gulp-spsave'); //upload to SharePoint
var tslint = require('gulp-tslint');
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");

gulp.task('lint-ts', function () {
    return gulp.src('./Scripts/ts/*.ts')
        .pipe(tslint({
            formatter: "verbose"
        }))
        .pipe(tslint.report());
});

gulp.task('browserify', ['lint-ts'], function () {
    return browserify({
        entries: ['./scripts/ts/app.ts']
    })
        .plugin(tsify)
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('./Output/'));
});

gulp.task('minify-js', ['browserify'], function () {
    return gulp.src("./Output/app.js")
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest("./Output"))
});

gulp.task('upload-to-sp', ['minify-js'], function () {
    return gulp.src("./Output/*.js")
        .pipe(spsave({
            username: "user@tenant.onmicrosoft.com",
            password: "tenant",
            siteUrl: "https://tenant.sharepoint.com/sites/pub/",
            folder: "Style Library/My Folder",
            checkin: true,
            checkinType: 1
        }));
});

gulp.task('watch-ts-upload-to-sp', function () {
    return gulp.watch("./Scripts/**/*.ts", ['upload-to-sp']);
});