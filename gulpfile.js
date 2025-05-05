var gulp = require("gulp");
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const colors = require('ansi-colors');
const logger = require('fancy-log');
const watchify = require('watchify');
const browserify = require('browserify');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
var flatten = require('gulp-flatten');
var newer = require('gulp-newer');
const fileinclude = require('gulp-file-include');
const template = require('gulp-template');
const size = require('gulp-size');
const path = require('path');
var browserSync = require('browser-sync').create();
const babelify = require('babelify');
const { minify } = require('terser');
var PATH_ENTRY = { src: "./src/scripts/main.ts" };
var PATH_CSS = { src: "./src/css/*.*", dist: "./dist/css/" };
var PATH_JS = { src: "./src/**/*.ts", dist: "./dist/js/" };
var PATH_JSX = { src: "src/scripts/app/**/*.tsx", dist: "./dist/js/" };
var PATH_HTML = { src: "./src/pages/*.html", dist: "./dist" };
var PATH_INDEX = { src: "./src/index.html", dist: "./dist" };
var PATH_IMG = { src: "./images/**/*.*", dist: "./dist/images" };
var PATH_public = { src: "./public/**/*.*", dist: "./dist/public" };
var PATH_assets = { src: "./assets/**/*.*", dist: "./dist/assets" };
var PATH_DIST = { src: "./dist/**/*.*", dist: "./dist/**/*.*" };

var fileBaseName = "app";
var IsPROD = process.env.NODE_ENV === 'production';
const sassOptions = {
    errLogToConsole: true,
    outputStyle: 'expanded'
};
let dir = "."
let entries = [`${dir}/src/scripts/main.js`, `${dir}/src/scripts/page_products.js`];
let dist  = `${dir}/dist/`;
let distCASS = `${dir}/dist/css/`;
let distHtml = `${dir}/dist/`;
let distJs = `${dir}/dist/js/`;

 

// Task to compile SASS
gulp.task("compileCass", function (done) {
    gulp.src(PATH_CSS.src).pipe(newer(distCASS))
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest(distCASS))
    done();
});

gulp.task("copyHtml", function (done) {
    gulp.src(PATH_HTML.src, { base: ".", dot: true }).pipe(newer(distHtml))
        .on("change", function (file) {
            console.log(file);
        })
        .pipe(template({ scripts: ['js/shared.min.js','js/page_products.min.js'] }))
        .pipe(fileinclude({
            prefix: '@@',
            basepath: "@root", // Paths relative to each HTML file
            filters: {
                log: (text) => {
                    console.log('🔍 Including:', text);
                    return text;
                }
            }
        }))
        .on('error', function (err) {
            console.error('❌ File Include Error:', err.message);
            this.emit('end');
        })
        .pipe(flatten()) //.pipe(rename({ dirname: '' }))
        .pipe(gulp.dest(distHtml));
    done();
});

gulp.task("copyIndex", function (done) {
    gulp.src(PATH_INDEX.src, { base: ".", dot: true })
        .on("change", function (file) {
            console.log(file);
        }).pipe(newer(distHtml))
        .pipe(template({ scripts: ['js/shared.min.js', 'js/main.min.js'] }))
        .pipe(fileinclude({
            prefix: '@@',
            basepath: "@root", // Paths relative to each HTML file
            filters: {
                log: (text) => {
                    console.log('🔍 Including:', text);
                    return text;
                }
            }
        }))
        .on('error', function (err) {
            console.error('❌ File Include Error:', err.message);
            this.emit('end');
        })
        .pipe(flatten())//.pipe(rename({ dirname: '' }))
        .pipe(gulp.dest(distHtml));
    done();
});
const compile_prod = (done) => {

    // Create shared bundle
         browserify()
             .require('./src/scripts/lib/httpClient.js', { expose: './src/scripts/lib/httpClient.js' })
             .require('./src/scripts/lib/lib.js', { expose: './src/scripts/lib/lib.js' })
             .transform('babelify',
                 {
                     presets: ["@babel/preset-env"],
                     plugins: ['add-module-exports']
                 })
             .bundle()
             .pipe(source("shared.min.js"))
             .pipe(buffer())
             .pipe(uglify())
             // .pipe(size())
             .pipe(gulp.dest(distJs)); 

    entries.map(entry => {
        const relativePath = path.relative(path.join(__dirname, './'), entry);
        const _name = relativePath.replace(".ts", ".js");
        var _name2 = _name.replace(/^.*[\\/]/, '');
        var _name3 = _name2.replace(".js", "");
        browserify({
            entries: [entry],
            debug: true,
            paths: [
                './node_modules',
                './src/scripts/'
            ]
        })
            .external('./src/scripts/lib/httpClient.js')
            .external('./src/scripts/lib/lib.js')
            //.ignore('rxjs') // Ignores rxjs Z
            //.transform('uglifyify', { global: true })
            .exclude('**/rxjs/internal/operators')

            .transform('babelify',
                {
                    presets: ["@babel/preset-env"],
                    plugins: ['add-module-exports']
                })

            .require('rxjs', { expose: 'rxjs' })
            .bundle()
            .pipe(source(`${_name3}.min.js`))
            .pipe(buffer())
            .pipe(uglify())
            // .pipe(size())
             .pipe(gulp.dest(distJs) ); 
    });
    done();
 
}
const compile_dev = (done) => {
    entries.map(entry => {
        const relativePath = path.relative(path.join(__dirname, './'), entry);
        const _name = relativePath.replace(".ts", ".js");
        var _name2 = _name.replace(/^.*[\\/]/, '')
        var _name3 = _name2.replace(".js", "");
        browserify({
            entries: [entry],
            debug: true,
            paths: [
                './node_modules',
                './src/scripts/'
            ]
        })  //.ignore('rxjs') // Ignores rxjs Z
      //  .transform('uglifyify', { global: true })
        .exclude('**/rxjs/internal/operators') 
      
       .transform('babelify',
                {
                    presets: ["@babel/preset-env"],
                    plugins: ['add-module-exports']
           })
       
        //.require('rxjs', { expose: 'rxjs' })
        .on('file' , function (file, id, parent) { console.log(file); })
        .on('error', function (error) { console.error(error.toString()); })
        .bundle()
            .pipe(source(`${_name3}.js`))
        .pipe(gulp.dest(distJs));

    });
    done();
}


function watchTask() {
    // gulp.watch('./images/**/*.*', gulp.series("copyImages", browserSyncReload));
    gulp.watch('./src/index.html', gulp.series("copyIndex", browserSyncReload));
    gulp.watch('./src/**/*.html', gulp.series("copyHtml", browserSyncReload));
    gulp.watch("./src/**/*.ts", gulp.series(compile_dev, compile_prod, browserSyncReload));
  
    //gulp.watch('./src/**/*.tsx', gulp.series('buildSTX'));
    gulp.watch('./src/css/*.*css', gulp.series("compileCass", browserSyncReload));

}


function browserSyncServe(done) {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        open: false,
        browser: "Google Chrome",
        //notify: true,
        port: 3000,
        notify: {
            styles: {
                top: 'auto',
                bottom: '0',
                borderRadius: '4px 0 0 0',
                opacity: .9
            }
        },
        snippetOptions: {
            rule: {
                match: /<\/body>/i,
                fn: function (snippet, match) {
                    return snippet + match;
                }
            }
        }
    });
    done();
}


async function browserSyncReload(cb) {
    browserSync.reload();
    cb();
}

gulp.task('prod', compile_prod);
gulp.task('dev', compile_dev);
gulp.task('default', gulp.parallel(compile_prod, browserSyncServe, "copyHtml", "copyIndex", watchTask));