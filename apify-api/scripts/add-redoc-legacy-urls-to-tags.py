import ruamel.yaml
import csv
import json
from slugify import slugify
from ruamel.yaml.scalarstring import LiteralScalarString
import re
from functools import reduce

yaml = ruamel.yaml.YAML(typ='rt')
yaml.indent(mapping=2, sequence=2, offset=0)

# https://stackoverflow.com/questions/78075152/preserve-line-wrapping-in-ruamel-yaml
# needed to convert flow sclars (>-) to literal blocks (|)
#yaml.width = 10000

# https://stackoverflow.com/questions/42094599/preserving-quotes-in-ruamel-yaml
yaml.preserve_quotes = True

# non empty null
# https://stackoverflow.com/questions/57172997/yaml-dumper-outputs-blank-instead-of-null-from-none-value-how-to-make-it-output
#def my_represent_none(self, data):
#    return self.represent_scalar(u'tag:yaml.org,2002:null', u'null')
#
#yaml.representer.add_representer(type(None), my_represent_none)


# Load tags
tags_file_path = '../openapi/components/tags.yaml'
with open(tags_file_path, 'r') as file:
    tags = yaml.load(file)
    for tag in tags:
      print(tag)
      safe_tag = re.sub(r'\/', "", tag['name'])
      safe_tag = re.sub(r' ',"-", safe_tag)
      print(safe_tag)
      redoc_url = f'#tag/{safe_tag}'
      try:
          tag['x-legacy-doc-urls'].append(redoc_url)
      except KeyError:
          tag['x-legacy-doc-urls'] = [redoc_url]
    
    with open(tags_file_path, 'w') as file:
        yaml.dump(tags, file)





