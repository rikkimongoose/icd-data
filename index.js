'use strict'

import {ICD_JSON, ICD_CODES} from 'data/icd-data';

function isCode(code) {
    return ICD_CODES.find(re => re.exec(code)) !== undefined;
}

function findInTree(tree, searchCode, searchText){
    let i = element.children.length;
    while (i--){
        if (element.name.includes(searchText)
         || element.value == searchCode){
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
        if (element.name.includes(searchText)
         || element.value == searchCode){
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
        let dataSource = ICD_DATA[icdVersion][locale];
        let result = findInTree(dataSource, searchCode.replace("X", ""), searchText);
        func && func(result)
        return result;
    }

    filter(options, func) {
        let options = options || {};
        let searchCode = options.code || options.text || "";
        let searchText = options.text || "";
        let dataSource = ICD_JSON;

        var results = [];
        filterInTree(dataSource, searchCode.replace("X", ""), searchText, results);

        func && func(results)
        return results;
    }

    isIcdCode(code) {
        return isCode(code);
    }
}