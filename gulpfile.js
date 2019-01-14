/**
 * Gulpfile setup
 * @since 1.0.0
 * @author Patrick Hladun @patrickhladun
 * @package Sandbox Starter
 *
 * https://gist.github.com/demisx/beef93591edc1521330a
 */
const gulp         = require('gulp');

const autoprefixer = require('gulp-autoprefixer');
const browserSync  = require('browser-sync');
const changed      = require('gulp-changed');
const concat       = require('gulp-concat');
const del          = require('del');
const sass         = require('gulp-sass');
const sourcemaps   = require('gulp-sourcemaps');
const uglify       = require('gulp-uglify');

const reload       = browserSync.reload;

const paths = {
    styles: {
        sass: 'src/sass/style.scss',
        src: 'src/sass/**/*.scss',
        dest: 'project/assets/css/'
    },
    scripts: {
        src: 'src/js/*.js',
        dest: 'project/assets/js/'
    }
};

const options = {
    autoprefixer : {
        browsers : ['last 2 versions', '> 5%', 'Firefox ESR']
    },
    browserSync : {
        server: {
            baseDir: 'project/'
        },
        files: [
            '/assets/css/style.css'
        ],
        tunnel: true
    }
};

gulp.task('clean:styles', () => {
    return del(paths.styles.dest);
});
gulp.task('clean:scripts', () => {
    return del(paths.scripts.dest);
});
gulp.task('clean', gulp.parallel('clean:styles', 'clean:scripts'));

gulp.task('build:styles', () => {
    return gulp
        .src(paths.styles.sass)
        .pipe(sourcemaps.init())
        .pipe(autoprefixer(options.autoprefixer.browsers)) // todo:: fix the problem with two slash comments not getting compailed
        .pipe(sass({outputStyle:'compressed'}))
        .pipe(changed(paths.styles.dest))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('build:scripts', () => {
    return gulp
        .src(paths.scripts.src)
        .pipe(sourcemaps.init())
        .pipe(concat('scripts.js', {newLine:'\n;'}))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.scripts.dest));
});

gulp.task('build', gulp.parallel('build:styles', 'build:scripts'));

gulp.task('watch:code', () => {
    gulp.watch('./**/*.html').on('change', reload);
    gulp.watch(paths.scripts.src, gulp.parallel('build:scripts')).on('change', reload);
});

gulp.task('watch:styles', () => {
    gulp.watch(paths.styles.src, gulp.series('clean:styles', 'build:styles'));
});

// Watch Style files and reload on change
gulp.task('watch', gulp.parallel('watch:code', 'watch:styles'));

// Browser Sync Task
gulp.task('browserSync', () => {
    browserSync.init(options.browserSync);
});

gulp.task( 'default',
    gulp.series(
        'build',
        gulp.parallel(
            'watch',
            'browserSync')
    )
);



