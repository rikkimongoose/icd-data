import json, codecs

data = {}
data_list = {}

with open("icb10.txt", 'r', encoding="utf-8") as f:
    for line in f:
        row_elems = line.split('\t')
        elem_key = row_elems[0].strip()
        elem_data = row_elems[1].strip()
        elem_parent_key = row_elems[2].strip()
        if not elem_data: continue
        item = { "name": elem_data, "value": elem_key, "parent": elem_parent_key, "children": [] }
        data_list[elem_key] = item

for key, item in data_list.items():
    parent = item["parent"]
    del item["parent"]
    if not parent or parent == "NULL":
        data[key] = item
    else:
        data_list[parent]["children"].append(item)

with codecs.open('workfile.json', 'w', 'utf8') as f:
	json.dump(data, f, ensure_ascii=False)