import json

data = {}
data_list = {}

with open("icb10.txt", encoding="utf-8") as f:
    for line in f:
        row_elems = line.split('\t')
        elem_key = row_elems[0].strip()
        elem_data = row_elems[1].strip()
        elem_parent_key = row_elems[2].strip()

        print("Parsing %s" % elem_key)

        item = { "name": elem_data, "value": elem_key, "parent": elem_parent_key, "children": [] }
        data_list[elem_key] = item
 
        if not elem_parent_key:
        	data[elem_key] = item
        else:
        	data_list[elem_parent_key]["children"].append(item)

print(json.dumps(data))