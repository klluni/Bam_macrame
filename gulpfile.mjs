import gulp from 'gulp';
import browserSync from 'browser-sync';
import sass from 'gulp-sass';
import *as dartSass from 'sass';
import cleanCSS from 'gulp-clean-css';
import autoprefixer from 'gulp-autoprefixer';
import rename from 'gulp-rename';

// Инициализация Sass с Dart Sass
const sassCompiler = sass(dartSass);

// Создаем объект browserSync
const bs = browserSync.create();

// Задача для обработки стилей
const styles = () => {
    return gulp.src('src/sass/**/*.+(scss|sass)')
        .pipe(sassCompiler({ outputStyle: 'compressed' }).on('error', sassCompiler.logError))
        .pipe(rename({ suffix: '.min', prefix: '' }))
        .pipe(autoprefixer())
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('src/css'))
        .pipe(bs.stream());
};

// Задача для запуска локального сервера
const startServe = () => {
    bs.init({
        server: {
            baseDir: 'src',
        },
    });

    gulp.watch('src/*.html').on('change', bs.reload);
};

// Задача для наблюдения за изменениями в файлах
const watch = () => {
    gulp.watch('src/sass/**/*.+(scss|sass)', styles);
};

// Задача по умолчанию
const defaultTask = gulp.parallel(watch, startServe, styles);

// Экспортируем задачи
export { startServe, styles, watch, defaultTask as default };


