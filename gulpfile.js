let projectFolder = "dist";
let sourceFolder = "src";

let fs = require('fs'); // file system

const path = {
    build: {
        html: projectFolder + "/",
        css: projectFolder + "/css/",
        js: projectFolder + "/js/",
        img: projectFolder + "/images/",
        fonts: projectFolder + "/fonts/"
    },
    src: {
        html: [
            sourceFolder + "/*.html",
            "!" + sourceFolder + "/_*.html"
        ],
        css: sourceFolder + "/scss/style.scss",
        cssAll: sourceFolder + "/scss/",
        js: sourceFolder + "/js/script.js",
        img: sourceFolder + "/images/**/*.+(png|jpg|jpeg|gif|ico|svg|webp)",
        fonts: sourceFolder + "/fonts/*.ttf",
        fontsAll: sourceFolder + "/fonts/"
    },
    watch: {
        html: sourceFolder + "/**/*.html",
        css: sourceFolder + "/scss/**/*.scss",
        js: sourceFolder + "/js/**/*.js",
        img: sourceFolder + "/images/**/*.+(png|jpg|jpeg|gif|ico|svg|webp)"
    },
    clean: "./" + projectFolder + "/"
};

const { src, dest } = require("gulp"),
    gulp = require("gulp"),
    babel = require("gulp-babel"),
    browsersync = require("browser-sync").create(),
    fileinclude = require("gulp-file-include"),
    del = require("del"),
    scss = require("gulp-sass")(require("sass")),
    autoprefixer = require("gulp-autoprefixer"),
    groupmedia = require("gulp-group-css-media-queries"),
    cleancss = require("gulp-clean-css"),
    uglify = require("gulp-uglify-es").default,
    rename = require("gulp-rename"),
    imagemin = require("gulp-imagemin"),
    webp = require("gulp-webp"),
    webphtml = require("gulp-webp-html"),
    webpcss = require("gulp-webpcss"),
    svgsprite = require("gulp-svg-sprite"),
    ttf2woff = require("gulp-ttf2woff"),
    ttf2woff2 = require("gulp-ttf2woff2"),
    fonter = require("gulp-fonter");

function browserSync() {
    browsersync.init({
        server: {
            baseDir: "./" + projectFolder + "/"
        },
        // browser: 'firefox',
        // browser: 'chrome',   // 'Cannot GET /' -> works after reload page
        port: 3000,
        notify: false
    });
}

function html() {
    return src(path.src.html)
        .pipe(fileinclude())
        .pipe(webphtml())
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream());
}

function css() {
    return src(path.src.css)
        .pipe(
            scss({
                //outputStyle: "compressed"
                outputStyle: "expanded"
            })
                .on("error", scss.logError)
        )
        .pipe(
            autoprefixer({
                overrideBrowserslist: [
                    "last 100 versions"
                ],
                browsers: [
                    'Android >= 4',
                    'Chrome >= 20',
                    'Firefox >= 24',
                    'Explorer >= 11',
                    'iOS >= 6',
                    'Opera >= 12',
                    'Safari >= 6',
                ],
                cascade: true
            })
        )
        .pipe(groupmedia())
        .pipe(
            webpcss({
                // baseClass:'.webp',
                webpClass: '.webp',
                noWebpClass: '.no-webp',
                replace_from: /\.(png|jpg|jpeg)/,
                replace_to: '.webp',
            })
        )
        .pipe(dest(path.build.css))
        .pipe(cleancss())
        .pipe(
            rename({
                extname: ".min.css"
            })
        )
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream());
}

function js() {
    return src(path.src.js)
        .pipe(fileinclude())
        .pipe(
            babel({
                presets: [
                    // ['@babel/env']
                    ['@babel/preset-env', { modules: false }]
                    // ['es2015', {modules: false}]
                ]
            })
        )
        .pipe(dest(path.build.js))
        .pipe(uglify())
        .pipe(
            rename({
                extname: ".min.js"
            })
        )
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream());
}

function images() {
    return src(path.src.img)
        .pipe(
            webp({
                quality: 80
            })
        )
        .pipe(dest(path.build.img))
        .pipe(src(path.src.img))
        .pipe(
            imagemin({
                progressive: true,
                svgoPlugins: [{ removeViewBox: false }],
                interlaced: true,
                optimizationLevel: 3
            })
        )
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream());
}

function fonts() {
    src(path.src.fonts)
        .pipe(ttf2woff())
        .pipe(dest(path.build.fonts))
    return src(path.src.fonts)
        .pipe(ttf2woff2())
        .pipe(dest(path.build.fonts));
}

// run 'gulp otf2ttf' in terminal BEFORE 'gulp' or 'gulp build'
gulp.task('otf2ttf', function () {
    return gulp.src([path.src.fontsAll + "./*.otf"])
        .pipe(
            fonter({
                formats: ['ttf']
            })
        )
        .pipe(dest(path.src.fontsAll));
});

// after 'gulp' in terminal -> run 'gulp svgsprite' in NEW terminal
gulp.task('svgsprite', function () {
    return gulp.src([sourceFolder + "/iconsprite/*.svg"])
        .pipe(
            svgsprite({
                mode: {
                    stack: {
                        sprite: "../icons/icons.svg",   //sprite file name
                        example: true
                    }
                }
            })
        )
        .pipe(dest(path.build.img));
});

// for lazy dev -> autoprint font-face mixin
function fontsStyle() {
    let fileContent = fs.readFileSync(path.src.cssAll + './fonts.scss');
    if (fileContent == '') {
        fs.writeFile(path.src.cssAll + './fonts.scss', '', cb);
        return fs.readdir(path.build.fonts, function (err, items) {
            if (items) {
                let c_fontname;
                for (let i = 0; i < items.length; i++) {
                    let fontname = items[i].split('.');
                    fontname = fontname[0];
                    if (c_fontname != fontname) {
                        fs.appendFile(
                            path.src.cssAll + './fonts.scss',
                            '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb
                        );
                    }
                    c_fontname = fontname;
                }
            }
        })
    }
}
function cb() { }

function watchFiles() {
    gulp.watch([path.watch.html], html),
    gulp.watch([path.watch.css], css),
    gulp.watch([path.watch.js], js),
    gulp.watch([path.watch.img], images);
}

function clean() {
    return del(path.clean);
}

// let build = gulp.series(clean, gulp.parallel(js, css, html, images, fonts), fontsStyle);
let build = gulp.series(clean, gulp.parallel(js, css, html, images, fonts));
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.fontsStyle = fontsStyle;
exports.js = js;
exports.css = css;
exports.html = html;
exports.images = images;
exports.fonts = fonts;
exports.build = build;
exports.watch = watch;
exports.default = watch;
// exports.default = build;