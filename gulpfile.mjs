import gulp from 'gulp';
import browserSync from 'browser-sync';
import * as sass from 'sass'; // Импортируем sass напрямую
import gulpSass from 'gulp-sass'; // Импортируем gulp-sass
import cleanCSS from 'gulp-clean-css';
import autoprefixer from 'gulp-autoprefixer';
import rename from 'gulp-rename';

// Создаем компилятор SASS
const sassCompiler = gulpSass(sass);

// Задача для запуска локального сервера
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: 'src'
        }
    });

    gulp.watch('src/*.html').on('change', browserSync.reload);
});

// Задача для обработки стилей
gulp.task('styles', function() {
    return gulp.src('src/sass/**/*.+(scss|sass)')
        .pipe(sassCompiler({ outputStyle: 'compressed' }).on('error', sassCompiler.logError))
        .pipe(rename({ suffix: '.min', prefix: '' }))
        .pipe(autoprefixer())
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.stream());
});

// Задача для наблюдения за изменениями в файлах
gulp.task('watch', function() {
    gulp.watch('src/sass/**/*.+(scss|sass)', gulp.parallel('styles'));
});

// Задача по умолчанию
gulp.task('default', gulp.parallel('watch', 'server', 'styles'));

