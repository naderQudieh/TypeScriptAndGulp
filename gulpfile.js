var gulp = require("gulp");
var gulpif = require('gulp-if');
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var tsify = require("tsify");
//import   imagemin   from 'gulp-imagemin';
//const imagemin = require("gulp-imagemin");
var sourcemaps = require("gulp-sourcemaps");
var babelify = require("babelify");
const uglify = require("gulp-uglify");
const fileinclude = require('gulp-file-include');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util'); 
var clean = require('gulp-clean');
const sass = require('gulp-sass')(require('sass'));
//const minifyHTML = require('gulp-minify-html');
//const imagemin = require('gulp-imagemin');
notify = require('gulp-notify');

const tsc = require("gulp-typescript");
const tsProject = tsc.createProject('tsconfig.json');
var buffer = require("vinyl-buffer");
const babel = require('gulp-babel');
const rename = require('gulp-rename');
var browserSync = require('browser-sync').create();
var flatten = require('gulp-flatten');
const path = require('path');


// File Paths
var PATH_CSS = { src: "./src/css/*.*", dist: "./dist/css/" };
var PATH_JS = { src: "./src/**/*.ts", dist: "./dist/js/" };
var PATH_HTML = { src: "./src/**/*.html", dist: "./dist" };
var PATH_IMG = { src: "./images/**/*.*", dist: "./dist/images" };
var PATH_public = { src: "./public/**/*.*", dist: "./dist/public" };
var PATH_assets = { src: "./assets/**/*.*", dist: "./dist/assets" };
var env = "Dev";
 
// Error Handling
var gulp_src = gulp.src;
gulp.src = function () {
    return gulp_src.apply(gulp, arguments)
        .pipe(plumber(function (error) {
            // Output an error message
            gutil.log(gutil.colors.red('Error (' + error.plugin + '): ' + error.message));
            // emit the end event, to properly end the task
            this.emit('end');
        })
        );
};
//image task
gulp.task('copyImages', function () {
    gulp.src("images/*.*")
       // .pipe(newer(outputDir + 'images'))
        
        .pipe(gulp.dest('./dist/images'))
        .pipe(plumber())
        .pipe(notify({ message: "Images tasks have been completed!" }));
});

// HTML Processing (Includes)
gulp.task("copyHtml", function () {
    return gulp
        .src("src/pages/*.html",  { base: ".", dot: true })
        .on("change", function (file) {
            console.log(file);
        })
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
        .pipe(gulp.dest("dist"));
});

gulp.task("copyIndex", function () {
    return gulp
        .src("src/*.html", { base: ".", dot: true })
        .on("change", function (file) {
            console.log(file);
        })
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
        .pipe(gulp.dest("dist"));
});

 

// Task to compile SASS
gulp.task("compileCass", function () {
    return gulp.src('src/css/*.scss')
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

// Task to compile SASS
gulp.task("compileCss", function () {
    return gulp.src('src/css/*.css')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

 
// Provide `once: true` to restrict reloading to once per stream
gulp.task('templates', function () {
    return gulp.src('*.jade')
        .pipe(jade())
        .pipe(gulp.dest('app'))
        .pipe(bs.stream({ once: true }));
});




 
// process JS files and return the stream.
gulp.task('compileTS', function () {
    return gulp.src([PATH_JS.src])
        .pipe(browserify())
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task("compile-ts", function () {
    return tsProject.src().pipe(tsProject()).js.pipe(gulp.dest("dist/js"));
});

// Task to clean the dist directory
gulp.task("cleanfiles", function () {
    return gulp.src("./dist/**/*.*").pipe(clean());
});

// Task to transpile JavaScript files with Babel
gulp.task("transpile-js", function () {
    return gulp.src("src/js/**/*.js").pipe(babel()).pipe(gulp.dest("dist/js"));
    // .pipe(browserSync.stream());
});



function bundle() {
    return browserify({
        basedir: ".",
        debug: true,
        entries: ["src/main.ts"],
        cache: {},
        packageCache: {},
    })
        .plugin(tsify)
        .transform("babelify")
        .bundle()
        .pipe(source("bundle.js"))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(terser())
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest("dist"));

}
// Styles
//gulp.task('styles', function () {
//    return gulp.src(CSS_PATH.src)
//        .pipe(sass())
//        .pipe(autoprefixer('last 2 versions'))
//        .pipe(sourcemaps.init())
//        .pipe(gulp.dest(CSS_PATH.dist))
//        .pipe(cleanCSS())
//        .pipe(sourcemaps.write())
//        .pipe(concat("main.css", { newLine: "" }))
//        .pipe(gulp.dest(CSS_PATH.dist))
//        .pipe(browserSync.reload({ stream: true }))
//});
//gulp.task('minify:css', function () {
//    return gulp.src('dist/styles/**/*.css')
//        .pipe($.minifyCss())
//        .pipe(gulp.dest('dist/styles'))
//        .pipe($.size());
//});
// process JS files and return the stream.
gulp.task('compileOneBundle', function () {

    return browserify({
        basedir: ".",
        debug: true,
        entries: ["src/main.ts"],
        cache: {},
        packageCache: {},
    }).on('file', function (file, id, parent) {
        console.log(file);
    })
        .plugin(tsify)
        .bundle()
        .pipe(source("js/bundle.js"))
        .pipe(gulp.dest("dist"));

});
function bundleScripts() {
    return gulp.src(["./src/**/*.ts"])
        .on('data', function (file) {
            const relativePath = path.relative(path.join(__dirname, './'), file.path);
            const _name = relativePath.replace(".ts", ".js");
            var _name2 = _name.replace(/^.*[\\/]/, '')
            const b = browserify({
                entries: [file.path],
                cache: {},
                packageCache: {},
                //  plugin: [watchify]
            })
                .plugin(tsify)
                .on('error', function (error) {
                    console.error(error.message);
                    this.emit('end');
                });

            function rebundle() {
                return b.transform("babelify").bundle()
                    .pipe(source(relativePath))
                    .pipe(buffer())
                    // .pipe(sourcemaps.init({ loadMaps: true }))
                    // .pipe(sourcemaps.write('.'))
                    .pipe(rename(_name2)) // Rename the file here
                    .pipe(gulp.dest("dist/js"))
                    .pipe(browserSync.stream());
            }

            b.on('update', rebundle);
            return rebundle();
        });
}

function browserSyncServe(done) {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        open: false,
        browser: "Google Chrome",
        notify: true,
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

function browserSyncReload(done) {
    browserSync.reload();
    done();
}

async function buildAndReload() {
    await includeHTML();

    browserSyncReload();
}
function watchTask() {
    gulp.watch('./images/**/*.*', gulp.series("copyImages", browserSyncReload));
    gulp.watch('*.html', gulp.series("copyHtml", browserSyncReload));
    gulp.watch('./src/**/*.html', gulp.series("copyHtml", browserSyncReload));
    gulp.watch("./src/**/*.ts", gulp.series(bundleScripts, browserSyncReload));
    gulp.watch('./src/css/*.scss', gulp.series("compileCass", browserSyncReload));
    gulp.watch('./src/css/*.css', gulp.series("compileCss", browserSyncReload));
}


gulp.task('clean', gulp.series('cleanfiles'));
gulp.task('default', gulp.parallel(bundleScripts, browserSyncServe,'compileCss','compileCass','copyImages','copyIndex', 'copyHtml', watchTask));