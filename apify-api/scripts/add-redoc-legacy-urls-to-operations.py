import ruamel.yaml
import csv
import json
from slugify import slugify
from ruamel.yaml.scalarstring import LiteralScalarString
import re
from functools import reduce

yaml = ruamel.yaml.YAML(typ='rt')
yaml.indent(mapping=2, sequence=4, offset=2)

# https://stackoverflow.com/questions/78075152/preserve-line-wrapping-in-ruamel-yaml
# needed to convert flow scalars (>-) to literal blocks (|)
yaml.width = 10000

# https://stackoverflow.com/questions/42094599/preserving-quotes-in-ruamel-yaml
yaml.preserve_quotes = True

# non empty null
# https://stackoverflow.com/questions/57172997/yaml-dumper-outputs-blank-instead-of-null-from-none-value-how-to-make-it-output
def my_represent_none(self, data):
    return self.represent_scalar(u'tag:yaml.org,2002:null', u'null')

yaml.representer.add_representer(type(None), my_represent_none)

# Path to the root openapi.yaml file
openapi_file_path = '../openapi/openapi.yaml'

# Get all paths from root openapi.yaml file and create operationId for each path.
with open(openapi_file_path, 'r') as file:
    openapi_yaml = yaml.load(file)

# Load tags
#tags_file_path = '../openapi/components/tags.yaml'
#with open(tags_file_path, 'r') as file:
#    tags = yaml.load(file)


# Update each path with custom logic
for path, ref in openapi_yaml.get('paths').items():
    print(f'Working with path: {path}')

    # Get the yaml file for the path and parse it
    path_path = '../openapi/' + ref.get('$ref')
    with open(path_path, 'r') as file:
        path_yaml = yaml.load(file)

    # For each method in path do the following
    for method, operation in path_yaml.items():
        print(f'Method: {method}')
        
        #tag = next(item for item in tags if item["name"] == operation['tags'][0])
        #print(tag)
        
        safe_tag = re.sub(r'\/', "", operation['tags'][0])
        safe_tag = re.sub(r' ',"-", safe_tag)
        print(safe_tag)
        redoc_url = f'https://docs.apify.com/api/v2#tag/{safe_tag}/operation/{operation['operationId']}'
        operation['x-legacy-doc-urls'].append(redoc_url)

    with open(path_path, 'w') as file:
        yaml.dump(path_yaml, file)

