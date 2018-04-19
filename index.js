'use strict'

import ICD_JSON from 'data/icd10-ru';
const ICD_VERSION = '10';

const ICD_CODES = {
    ICD_10 : {
        REG_CODE_BLOCK : /^([A-Z]\d\d)\-([A-Z]\d\d)$/i,
        REG_CODE_ELEM : /^([A-Z]\d\d)(\.[X\d])*$/i
    }
}

function isCode(code) {
     return REG_CODE_ROOT.exec(code),
         || REG_CODE_ELEM.exec(code);
}

function findInTree(tree, searchCode, searchText){
    let i = element.children.length;
    while (i--){
        if (element.name.includes(searchText)
         || element.value.includes(searchText)){
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
         || element.value.includes(searchText)){
            results.push(element);
        }
        let children = element.children;
        if (children && children.length) {
            filterInTree(children, matchingTitle, results);
        }
    }
}

export default Icd {
    find(options) {
        let options = options || {};
        let searchCode = options.code || options.text || "";
        let searchText = options.text || "";
        let dataSource = ICD_DATA[icdVersion][locale];

        return findInTree(dataSource, searchCode, searchText);
    }

    filter(options) {
        let options = options || {};
        let searchCode = options.code || options.text || "";
        let searchText = options.text || "";
        let dataSource = ICD_JSON;

        var results = [];
        filterInTree(dataSource, searchCode, searchText, results);

        return results;
    }

    isIcdCode(code) {
        return isCode(code);
    }
}