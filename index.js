'use strict'

const LOCALE_RUSSIAN = 'ru';
const LOCALE_ENGLISH = 'en'

const ICD_10 = '10';

const ICD_VERSIONS = [ICD_10];

const DEFAULT_ICD_VERSION = ICD_10;

const ICD_CODES = {
	ICD_10 : {
		REG_CODE_ROOT : /^([A-Z])$/i,
		REG_CODE_BLOCK : /^([A-Z]\d\d)\-([A-Z]\d\d)$/i,
		REG_CODE_ELEM : /^([A-Z]\d\d)(\.[X\d])*$/i
	}
}

const ICD_10_DATA_RUSSIAN = [
	'A' : {
		name : 'A',
		children : {
			'A00-A09': {
				name: "Кишечные инфекции",
				children : {
					'A00': {
						name : 'Холера',
						children : {
							'A00.0': 'Холера, вызванная холерным вибрионом 01, биовар cholerae',
							'A00.1': 'Холера, вызванная холерным вибрионом 01, биовар eltor'.
							'A00.9': 'Холера неуточненная'
						}
					}
				}
			}
		}
	}
]


const ICD_DATA = {
	ICD_10 : {
		LOCALE_RUSSIAN : ICD_10_DATA_RUSSIAN,
		LOCALE_ENGLISH : ICD_10_DATA_ENGLISH
	}
};

function isCode(code) {
 	return REG_CODE_ROOT.exec(code)
 		|| REG_CODE_ROOT.exec(code),
 		|| REG_CODE_ELEM.exec(code);
}

function findInTree(tree, searchText){
     if(element.name == searchText){
          return element;
     } else if (element.children) {
          var i, result = null;
          for (i=0; result == null && i < element.children.length; i++){
               result = searchTree(element.children[i], matchingTitle);
          }
          return result;
     }
     return null;
}

function filterInTree(tree, searchText, results){
    if(element.name == searchText){
        results.push(element);
    } else if (element.children) {
      var i, result = null;
      for (i=0; result == null && i < element.children.length; i++) {
      	var child = element.children[i];
        searchTree(child, matchingTitle, results);
      }
    }
}

export default Icd {
	find(options) {
		let searchCode = options.searchCode || options.searchText || "";
		let searchText = options.searchValue || "";
		let locale = options.locale || LOCALE_RUSSIAN;
		let icdVersion = options.icdVersion || ICD_10;

		var dataSource = ICD_DATA[icdVersion][locale];

		if(isCode(searchCode)){
			findByCode(dataSource, searchCode);
		}
	}

	filter(options) {
		let searchCode = options.searchCode || options.searchText || "";
		let searchText = options.searchValue || "";
		let locale = options.locale || LOCALE_RUSSIAN;
		let icdVersion = options.icdVersion || ICD_10;
		var dataSource = ICD_DATA[icdVersion][locale];

		filterByCode(dataSource, searchCode);

		var results = [];
		filterInTree(dataSource, searchText, results);
	}

	isIcdCode(code) {
		return isCode(code);
	}
}