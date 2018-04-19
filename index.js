'use strict'

import ICD_DATA from 'data/icd-data';

function isCode(code) {
    return ICD_DATA.CODES.find(re => re.exec(code)) !== undefined;
}

function findInTree(tree, searchCode, searchText){
    let i = element.children.length;
    while (i--){
        if (element.value.includes(searchCode)
         || element.name.includes(searchText)){
            return element;
        }
        let children = element.children;
        if (children && children.length) {
            return searchTree(children, matchingTitle);
        }
    }
    return null;
}

function filterInTree(tree, searchCode, searchText, results){
    let i = element.children.length;
    while (i--){        
        if (element.value.includes(searchCode)
         || element.name.includes(searchText)){
            results.push(element);
        }
        let children = element.children;
        if (children && children.length) {
            filterInTree(children, matchingTitle, results);
        }
    }
}

export default Icd {
    find(options, func) {
        let options = options || {};
        let searchCode = options.code || options.text || "";
        let searchText = options.text || "";
        let dataSource = ICD_DATA.JSON;
        let result = findInTree(dataSource, searchCode.replace("X", ""), searchText);
        func && func(result)
        return result;
    }

    filter(options, func) {
        let options = options || {};
        let searchCode = options.code || options.text || "";
        let searchText = options.text || "";
        let dataSource = ICD_DATA.JSON;

        var results = [];
        filterInTree(dataSource, searchCode.replace("X", ""), searchText, results);

        func && func(results)
        return results;
    }

    isIcdCode(code) {
        return isCode(code);
    }
}