var gulp = require("gulp");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var tsify = require("tsify");
var sourcemaps = require("gulp-sourcemaps");
var babelify = require("babelify");
const uglify = require("gulp-uglify");

const tsc = require("gulp-typescript");
const tsProject = tsc.createProject('tsconfig.json', {
    noImplicitAny: true,
    //"target": "es6",
    "target": "es2015",
    "module": "commonjs",
    "moduleResolution": "node",
    //out: 'output.js'
});
var buffer = require("vinyl-buffer");
const babel = require('gulp-babel');
const rename = require('gulp-rename');
var browserSync = require('browser-sync').create();
var flatten = require('gulp-flatten');
const path = require('path');

gulp.task("copyHtml", function () {
    return gulp.src("./src/pages/*.html").on("change", function (file) {
        console.log(file);
    }).pipe(gulp.dest("dist"));
});
gulp.task("copyIndex", function () {
    return gulp.src("*.html").pipe(gulp.dest("dist"));
});

// Compile SASS & auto-inject into browsers
gulp.task('sass', function () {
    return gulp.src('scss/styles.scss')
        .pipe(sass({ includePaths: ['scss'] }))
        .pipe(gulp.dest('css'))
        .pipe(bs.stream());
});

// Provide `once: true` to restrict reloading to once per stream
gulp.task('templates', function () {
    return gulp.src('*.jade')
        .pipe(jade())
        .pipe(gulp.dest('app'))
        .pipe(bs.stream({ once: true }));
});

// Provide a filter to stop unwanted files from being reloaded
gulp.task('less', function () {
    return gulp.src('*.less')
        .pipe(less())
        .pipe(gulp.dest('css'))
        .pipe(bs.stream({ match: "**/*.css" }));
});

// Task to compile SASS
gulp.task("compile-sass", function () {
    return gulp
        .src("src/scss/styles.scss")
        .pipe(sass.sync().on("error", sass.logError))
        .pipe(gulp.dest("dist/css"));
    // .pipe(browserSync.stream());
});
gulp.task("minify-css", function () {
    return gulp
        .src("dist/css/*.css")
        .pipe(cleanCSS())
        .pipe(gulp.dest("dist/css"));
});

// process JS files and return the stream.
gulp.task('compileTS', function () {
    return gulp.src(["src/**/*@(.ts|.js)"])
        .pipe(browserify())
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task("compile-ts", function () {
    return tsProject.src().pipe(tsProject()).js.pipe(gulp.dest("dist/js"));
});
// Task to clean the dist directory
gulp.task("clean", function () {
    return gulp.src("dist/*").pipe(clean());
});
// Task to transpile JavaScript files with Babel
gulp.task("transpile-js", function () {
    return gulp.src("src/js/**/*.js").pipe(babel()).pipe(gulp.dest("dist/js"));
    // .pipe(browserSync.stream());
});

// Task to copy EJS files to dist folder
gulp.task("copy-ejs", function () {
    return gulp.src("src/views/**/*.ejs").pipe(gulp.dest("dist/views"));
});
function compile2() {
    return tsProject.src(["src/**/*@(.ts|.js)"])
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .pipe(babel())
        .pipe(gulp.dest('dist/js'));
};

function compile() {
    const tsProject = tsc.createProject("tsconfig.json")
    const srcDir = "./src"
    const outDir = "./dist"
    const tsResult = gulp
        .src(["src/**/*@(.ts|.js)"])
        .pipe(sourcemaps.init())
        .pipe(tsProject())

    const tsStream = tsResult.js
        .pipe(babel())
        .pipe(rename({
            dirname: '',
            //  suffix: '.min'
        }))
        .pipe(gulp.dest('dist/js'));
}

function bundle() {
    return watchedBrowserify
        .transform("babelify", {
            presets: ["es2015"],
            extensions: [".ts"]
        })
        .bundle()
        .pipe(source("bundle.js"))
        .pipe(buffer())
        .pipe(sourceMaps.init({ loadMaps: true }))
        .pipe(uglify())
        .pipe(sourceMaps.write("./"))
        .pipe(gulp.dest("dist"))
}

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
                return b.transform(babelify).bundle()
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
        port: 3000
    });
    done();
}

function browserSyncReload(done) {
    browserSync.reload();
    done();
}

function watchTask() {
    gulp.watch('*.html', gulp.series("copyIndex", browserSyncReload));
    gulp.watch('./src/**/*.html', gulp.series("copyHtml", browserSyncReload));
    gulp.watch("./src/**/*.ts", gulp.series(compile, browserSyncReload));
}



gulp.task('default', gulp.parallel(compile, browserSyncServe, watchTask));