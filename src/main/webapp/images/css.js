(function () {
    var scripts = document.getElementsByTagName('script'),
        test, path, i, ln, scriptSrc, match, params, paramString;
    var pLn = 0;
    for (i = 0, ln = scripts.length; i < ln; i++) {
        scriptSrc = scripts[i].src;

        match = scriptSrc.match(/css\.js/);
        paramString = scriptSrc.split('?')[1];
        if (match) {
            if (paramString) {
                pLn = paramString.length + 1;
            }
            //取得问号后面的值
            path = scriptSrc.substring(0, scriptSrc.length - match[0].length - pLn);
            break;
        }
    }
    if (pLn > 0) {
        params = paramString.split('=')[1].split('_');
        pLn = params.length;
        for (var j = 0; j < pLn; j++) {
            document.write('<link rel="stylesheet" type="text/css" href="' + path + params[j] + '/' + params[j] + '.css" />');
        }
    }
    //扩展window方法，用于自定义载入css文件
    window.cssPath = path;
    window.loadCSS = function (files) {
        if (files) {
            var cssFiles = files.split('_');
            var cLn = cssFiles.length;
            for (var i = 0; i < cLn; i++) {
                document.write('<link rel="stylesheet" type="text/css" href="' + window.cssPath + cssFiles[i] + '/' + cssFiles[i] + '.css" />');
            }
        }
    }
})();