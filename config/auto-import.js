/*
 * File: auto-import.js
 * Author: insane (luojie@doctorwork.com)
 * Last: insane (luojie@doctorwork.com>) 
 * Date: 2018-04-Su 09:05:42
 * Copyright 2018 - 2018 © Doctorwork
 */

function appendImport(autoImport, fileContent) {
    return (
        `import ${autoImport.import} from '${autoImport.from}';\n` + fileContent
    );
}

function containsImportUsage(autoImport, fileContent) {
    return fileContent.search(autoImport.search || autoImport.import) != -1;
}

function isNotDefinitionFile(autoImport, file) {
    return fileName(autoImport.from) != file;
}

function isNotImportedManually(autoImport, fileContent) {
    return fileContent.search(`import ${autoImport.import} from`) == -1;
}

function fileName(path) {
    return path.split('/').pop();
}

exports.loader = function loaderFactory(input) {
    return function loader(source) {
        var currentFileName = fileName(this.resourcePath);

        input.forEach(autoImport => {
            if (
                isNotDefinitionFile(autoImport, currentFileName) &&
                isNotImportedManually(autoImport, source) &&
                containsImportUsage(autoImport, source)
            ) {
                source = appendImport(autoImport, source);
            }
        });

        this.cacheable();
        return source;
    };
};
